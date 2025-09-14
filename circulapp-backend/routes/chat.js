// routes/chat.js - Versión Mejorada
const express = require('express');
const mongoose = require('mongoose');
const { body, query, validationResult } = require('express-validator');
const Chat = require('../models/Chat');
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('../middleware/upload');

const router = express.Router();

// Obtener lista de chats del usuario con filtros avanzados
router.get('/', [
  query('type').optional().isIn(['direct', 'group', 'product_inquiry']),
  query('archived').optional().isBoolean(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isLength({ max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Construir query
    const query = {
      'participants.user': req.user.userId,
      isActive: true
    };

    if (req.query.type) query.chatType = req.query.type;
    if (req.query.archived !== undefined) query.isArchived = req.query.archived === 'true';

    // Búsqueda por texto
    let aggregationPipeline = [
      { $match: query }
    ];

    if (req.query.search) {
      aggregationPipeline.push({
        $match: {
          $or: [
            { title: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } },
            { 'lastMessage.content': { $regex: req.query.search, $options: 'i' } }
          ]
        }
      });
    }

    aggregationPipeline.push(
      {
        $lookup: {
          from: 'users',
          localField: 'participants.user',
          foreignField: '_id',
          as: 'participantUsers'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'productData'
        }
      },
      {
        $addFields: {
          unreadCount: {
            $size: {
              $filter: {
                input: '$messages',
                cond: {
                  $and: [
                    { $ne: ['$$this.sender', new mongoose.Types.ObjectId(req.user.userId)] },
                    { $ne: ['$$this.isDeleted', true] },
                    { $gte: ['$$this.createdAt', {
                      $ifNull: [
                        {
                          $arrayElemAt: [
                            '$participants.lastSeen',
                            { $indexOfArray: ['$participants.user', new mongoose.Types.ObjectId(req.user.userId)] }
                          ]
                        },
                        '$createdAt'
                      ]
                    }] }
                  ]
                }
              }
            }
          },
          lastActivity: { $max: ['$lastMessage.timestamp', '$updatedAt'] }
        }
      },
      { $sort: { lastActivity: -1 } },
      { $skip: skip },
      { $limit: limit }
    );

    const chats = await Chat.aggregate(aggregationPipeline);

    // Formatear respuesta
    const formattedChats = chats.map(chat => ({
      ...chat,
      participants: chat.participantUsers.map(user => ({
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          isOnline: false // Esto se puede implementar con Socket.IO
        },
        ...chat.participants.find(p => p.user.toString() === user._id.toString())
      })),
      product: chat.productData[0] || null
    }));

    const total = await Chat.countDocuments(query);

    res.json({
      chats: formattedChats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error obteniendo chats:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Iniciar o obtener chat existente
router.post('/start', [
  body('productId').optional().isMongoId().withMessage('ID de producto inválido'),
  body('userId').optional().isMongoId().withMessage('ID de usuario inválido'),
  body('message').optional().trim().isLength({ min: 1, max: 2000 }).withMessage('Mensaje inválido'),
  body('chatType').optional().isIn(['direct', 'group', 'product_inquiry'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, userId, message, chatType = 'product_inquiry' } = req.body;
    let chat;
    let otherUserId;

    if (productId) {
      // Chat sobre un producto
      const product = await Product.findById(productId).populate('owner');
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (product.owner._id.toString() === req.user.userId) {
        return res.status(400).json({ message: 'No puedes chatear contigo mismo' });
      }

      otherUserId = product.owner._id;

      // Buscar chat existente para este producto
      chat = await Chat.findOne({
        'participants.user': { $all: [req.user.userId, otherUserId] },
        product: productId,
        isActive: true
      });
    } else if (userId) {
      // Chat directo
      if (userId === req.user.userId) {
        return res.status(400).json({ message: 'No puedes chatear contigo mismo' });
      }

      const otherUser = await User.findById(userId);
      if (!otherUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      otherUserId = userId;

      // Buscar chat directo existente
      chat = await Chat.findOne({
        'participants.user': { $all: [req.user.userId, otherUserId] },
        chatType: 'direct',
        isActive: true
      });
    } else {
      return res.status(400).json({ message: 'Debes proporcionar productId o userId' });
    }

    // Crear nuevo chat si no existe
    if (!chat) {
      chat = new Chat({
        participants: [
          { user: req.user.userId, role: 'participant' },
          { user: otherUserId, role: 'participant' }
        ],
        chatType,
        product: productId || undefined,
        isActive: true
      });
    }

    // Agregar mensaje inicial si se proporciona
    if (message) {
      const newMessage = {
        sender: req.user.userId,
        content: message,
        messageType: 'text'
      };

      chat.messages.push(newMessage);
    }

    await chat.save();

    // Poblar datos completos
    const populatedChat = await Chat.findById(chat._id)
      .populate({
        path: 'participants.user',
        select: 'name avatar email reputation'
      })
      .populate('product', 'title images status category')
      .populate({
        path: 'messages.sender',
        select: 'name avatar'
      });

    res.status(201).json({
      message: chat.isNew ? 'Chat creado exitosamente' : 'Chat encontrado',
      chat: populatedChat
    });
  } catch (error) {
    console.error('Error iniciando chat:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener mensajes de un chat con paginación
router.get('/:chatId/messages', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('before').optional().isISO8601().withMessage('Fecha before inválida'),
  query('after').optional().isISO8601().withMessage('Fecha after inválida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Filtros de fecha
    let dateFilter = {};
    if (req.query.before) dateFilter.$lt = new Date(req.query.before);
    if (req.query.after) dateFilter.$gt = new Date(req.query.after);

    // Obtener mensajes con paginación
    const pipeline = [
      { $match: { _id: chat._id } },
      { $unwind: '$messages' },
      { $match: { 'messages.isDeleted': { $ne: true } } }
    ];

    if (Object.keys(dateFilter).length > 0) {
      pipeline.push({ $match: { 'messages.createdAt': dateFilter } });
    }

    pipeline.push(
      { $sort: { 'messages.createdAt': -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'messages.sender',
          foreignField: '_id',
          as: 'senderData'
        }
      },
      {
        $addFields: {
          'messages.sender': {
            $arrayElemAt: [
              {
                $map: {
                  input: '$senderData',
                  as: 'sender',
                  in: {
                    _id: '$$sender._id',
                    name: '$$sender.name',
                    avatar: '$$sender.avatar'
                  }
                }
              },
              0
            ]
          }
        }
      },
      { $replaceRoot: { newRoot: '$messages' } }
    );

    const messages = await Chat.aggregate(pipeline);

    // Marcar chat como leído
    await chat.markAsRead(req.user.userId);

    // Contar mensajes totales
    const totalMessages = chat.messages.filter(m => !m.isDeleted).length;

    res.json({
      messages: messages.reverse(), // Ordenar cronológicamente para mostrar
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalMessages / limit),
        totalItems: totalMessages,
        hasNext: page < Math.ceil(totalMessages / limit),
        hasPrev: page > 1
      },
      chatInfo: {
        _id: chat._id,
        title: chat.title,
        chatType: chat.chatType,
        participantCount: chat.participants.length
      }
    });
  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Enviar mensaje (incluyendo archivos)
router.post('/:chatId/messages', upload.array('attachments', 5), [
  body('content').optional().trim().isLength({ max: 2000 }).withMessage('Contenido muy largo'),
  body('messageType').optional().isIn(['text', 'image', 'document', 'audio', 'video', 'location']),
  body('replyTo').optional().isMongoId().withMessage('ID de mensaje inválido'),
  body('location.latitude').optional().isFloat().withMessage('Latitud inválida'),
  body('location.longitude').optional().isFloat().withMessage('Longitud inválida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    if (!chat.canUserWrite(req.user.userId)) {
      return res.status(403).json({ message: 'No tienes permisos para escribir en este chat' });
    }

    const { content, messageType = 'text', replyTo, location } = req.body;

    // Validar que hay contenido o archivos
    if (!content && !req.files?.length && messageType !== 'location') {
      return res.status(400).json({ message: 'El mensaje debe tener contenido o archivos adjuntos' });
    }

    // Crear mensaje
    const newMessage = {
      sender: req.user.userId,
      content: content || '',
      messageType,
      replyTo: replyTo || undefined,
      location: messageType === 'location' ? location : undefined,
      attachments: []
    };

    // Procesar archivos adjuntos
    if (req.files && req.files.length > 0) {
      newMessage.attachments = req.files.map(file => ({
        type: file.mimetype.startsWith('image/') ? 'image' :
              file.mimetype.startsWith('video/') ? 'video' :
              file.mimetype.startsWith('audio/') ? 'audio' : 'document',
        url: file.path,
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        publicId: file.filename
      }));
    }

    chat.messages.push(newMessage);
    await chat.save();

    // Obtener el mensaje poblado
    const populatedMessage = await Chat.findById(chat._id)
      .populate({
        path: 'messages.sender',
        select: 'name avatar'
      })
      .select('messages')
      .slice('messages', -1);

    const messageToSend = populatedMessage.messages[0];

    res.status(201).json({
      message: 'Mensaje enviado exitosamente',
      newMessage: messageToSend
    });
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Editar mensaje
router.put('/:chatId/messages/:messageId', [
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Contenido inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    const message = chat.messages.id(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    if (message.sender.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Solo puedes editar tus propios mensajes' });
    }

    // Verificar que el mensaje no sea muy antiguo (ejemplo: máximo 24 horas)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (message.createdAt < oneDayAgo) {
      return res.status(400).json({ message: 'No puedes editar mensajes de más de 24 horas' });
    }

    message.content = req.body.content;
    message.editedAt = new Date();

    await chat.save();

    res.json({
      message: 'Mensaje editado exitosamente',
      editedMessage: message
    });
  } catch (error) {
    console.error('Error editando mensaje:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar mensaje
router.delete('/:chatId/messages/:messageId', async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    const message = chat.messages.id(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    if (message.sender.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Solo puedes eliminar tus propios mensajes' });
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    message.content = ''; // Limpiar contenido

    await chat.save();

    res.json({ message: 'Mensaje eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando mensaje:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Reaccionar a mensaje
router.post('/:chatId/messages/:messageId/react', [
  body('emoji').isLength({ min: 1, max: 10 }).withMessage('Emoji inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    const message = chat.messages.id(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    const { emoji } = req.body;

    // Buscar reacción existente del usuario
    const existingReaction = message.reactions.find(r => 
      r.user.toString() === req.user.userId && r.emoji === emoji
    );

    if (existingReaction) {
      // Quitar reacción si ya existe
      message.reactions.pull(existingReaction._id);
    } else {
      // Agregar nueva reacción
      message.reactions.push({
        emoji,
        user: req.user.userId
      });
    }

    await chat.save();

    res.json({
      message: existingReaction ? 'Reacción eliminada' : 'Reacción agregada',
      reactions: message.reactions
    });
  } catch (error) {
    console.error('Error reaccionando a mensaje:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Marcar chat como leído
router.put('/:chatId/read', async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    await chat.markAsRead(req.user.userId);

    res.json({ message: 'Chat marcado como leído' });
  } catch (error) {
    console.error('Error marcando chat como leído:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Archivar o desarchivar chat
router.put('/:chatId/archive', [
  body('archive').isBoolean().withMessage('El campo archive es requerido y debe ser booleano')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      'participants.user': req.user.userId
    });
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }
    chat.isArchived = req.body.archive;
    await chat.save();
    res.json({ message: `Chat ${req.body.archive ? 'archivado' : 'desarchivado'} exitosamente` });
  } catch (error) {
    console.error('Error archivando/desarchivando chat:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
