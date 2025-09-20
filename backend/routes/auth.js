const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Registro de usuario
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('phone').optional().isMobilePhone('es-AR').withMessage('Teléfono inválido')
], async (req, res) => {
  try {
    console.log('📝 Registration attempt:', {
      email: req.body.email,
      name: req.body.name,
      userType: req.body.userType
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, location, userType } = req.body;

    // Verificar si el usuario ya existe
    console.log('🔍 Checking if user exists...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists:', email);
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    console.log('👤 Creating new user...');
    const user = new User({
      name,
      email,
      password,
      phone,
      location,
      userType: userType || 'individual'
    });

    console.log('💾 Saving user to database...');
    const savedUser = await user.save();
    console.log('✅ User saved successfully:', savedUser._id);

    // Generar JWT
    console.log('🔑 Generating JWT token...');
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    console.log('✅ Registration successful for:', email);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: savedUser.toJSON(),
      token
    });

  } catch (error) {
    console.error('💥 Registration error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        message: `Ya existe un usuario con este ${field}`
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Error de validación',
        errors: messages
      });
    }

    // Generic error
    res.status(500).json({
      message: 'Error interno del servidor',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

// Inicio de sesión
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener perfil del usuario autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
