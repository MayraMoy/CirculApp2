// models/Chat.js - Versión Mejorada
const mongoose = require('mongoose');

// Esquema para archivos adjuntos
const attachmentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'document', 'audio', 'video'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  filename: String,
  size: Number,
  mimetype: String,
  publicId: String // Para Cloudinary
});

// Esquema para reacciones a mensajes
const reactionSchema = new mongoose.Schema({
  emoji: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Esquema mejorado para mensajes
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    maxlength: [2000, 'El mensaje no puede exceder 2000 caracteres']
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'document', 'audio', 'video', 'system', 'transaction_update', 'location'],
    default: 'text'
  },
  attachments: [attachmentSchema],
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  reactions: [reactionSchema],
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message' // Referencia al mensaje al que se responde
  },
  editedAt: Date,
  deletedAt: Date,
  isDeleted: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  systemData: {
    type: mongoose.Schema.Types.Mixed // Para mensajes del sistema
  }
}, {
  timestamps: true
});

// Índices para mensajes
messageSchema.index({ sender: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ messageType: 1 });

// Esquema mejorado para chat
const chatSchema = new mongoose.Schema({
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['participant', 'admin'],
      default: 'participant'
    },
    nickname: String,
    lastSeen: Date,
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  }],
  chatType: {
    type: String,
    enum: ['direct', 'group', 'product_inquiry'],
    default: 'product_inquiry'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  messages: [messageSchema],
  lastMessage: {
    content: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: Date,
    messageType: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  title: String, // Para chats grupales
  description: String,
  avatar: String, // Para chats grupales
  settings: {
    allowFileSharing: {
      type: Boolean,
      default: true
    },
    allowLocationSharing: {
      type: Boolean,
      default: true
    },
    messageRetention: {
      type: Number,
      default: 0 // 0 = sin límite, número = días
    },
    autoDeleteAfter: {
      type: Number,
      default: 0 // 0 = nunca, número = días
    }
  },
  pinnedMessages: [{
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    },
    pinnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    pinnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  mutedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    mutedUntil: Date
  }],
  tags: [String], // Para organizar chats
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  closedAt: Date,
  closedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  closeReason: String
}, {
  timestamps: true
});

// Índices para chat
chatSchema.index({ 'participants.user': 1 });
chatSchema.index({ product: 1 });
chatSchema.index({ transaction: 1 });
chatSchema.index({ chatType: 1 });
chatSchema.index({ isActive: 1, isArchived: 1 });
chatSchema.index({ 'lastMessage.timestamp': -1 });
chatSchema.index({ createdAt: -1 });

// Métodos del esquema
chatSchema.methods.addParticipant = function(userId, role = 'participant') {
  const existingParticipant = this.participants.find(p => p.user.toString() === userId.toString());
  if (!existingParticipant) {
    this.participants.push({
      user: userId,
      role,
      joinedAt: new Date()
    });
  }
  return this.save();
};

chatSchema.methods.removeParticipant = function(userId) {
  this.participants = this.participants.filter(p => p.user.toString() !== userId.toString());
  return this.save();
};

chatSchema.methods.getUnreadCount = function(userId) {
  const participant = this.participants.find(p => p.user.toString() === userId.toString());
  if (!participant) return 0;
  
  const lastSeen = participant.lastSeen || participant.joinedAt;
  return this.messages.filter(m => 
    m.createdAt > lastSeen && 
    m.sender.toString() !== userId.toString() &&
    !m.isDeleted
  ).length;
};

chatSchema.methods.markAsRead = function(userId) {
  const participant = this.participants.find(p => p.user.toString() === userId.toString());
  if (participant) {
    participant.lastSeen = new Date();
    return this.save();
  }
};

chatSchema.methods.isParticipant = function(userId) {
  return this.participants.some(p => p.user.toString() === userId.toString());
};

chatSchema.methods.canUserWrite = function(userId) {
  if (!this.isActive) return false;
  return this.isParticipant(userId);
};

// Middleware para actualizar lastMessage
chatSchema.pre('save', function(next) {
  if (this.messages && this.messages.length > 0) {
    const lastMsg = this.messages[this.messages.length - 1];
    if (lastMsg && !lastMsg.isDeleted) {
      this.lastMessage = {
        content: lastMsg.content || (lastMsg.messageType === 'image' ? '📷 Imagen' : 
                 lastMsg.messageType === 'document' ? '📄 Documento' :
                 lastMsg.messageType === 'audio' ? '🎵 Audio' :
                 lastMsg.messageType === 'video' ? '🎥 Video' :
                 lastMsg.messageType === 'location' ? '📍 Ubicación' : 'Mensaje'),
        sender: lastMsg.sender,
        timestamp: lastMsg.createdAt,
        messageType: lastMsg.messageType
      };
    }
  }
  next();
});

// Virtual para obtener participantes activos
chatSchema.virtual('activeParticipants').get(function() {
  return this.participants.filter(p => {
    // Considerar activo si ha estado activo en las últimas 24 horas
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return !p.lastSeen || p.lastSeen > oneDayAgo;
  }).length;
});

// Método estático para buscar chats
chatSchema.statics.findByParticipant = function(userId, options = {}) {
  const query = {
    'participants.user': userId,
    isActive: true
  };
  
  if (options.type) query.chatType = options.type;
  if (options.archived !== undefined) query.isArchived = options.archived;
  
  return this.find(query);
};

module.exports = mongoose.model('Chat', chatSchema);