// scripts/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/circulapp');
    console.log('Conectado a MongoDB');

    // Limpiar base de datos
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Base de datos limpiada');

    // Crear usuario administrador (Comuna)
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      name: 'Comuna Charbonier',
      email: 'admin@charbonier.gob.ar',
      password: adminPassword,
      userType: 'comuna',
      location: {
        address: 'Plaza Central, Charbonier, Córdoba',
        coordinates: { lat: -31.4201, lng: -64.1888 },
        city: 'Charbonier',
        province: 'Córdoba'
      },
      isVerified: true
    });
    await admin.save();

    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length + 1} usuarios creados`);

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} productos creados`);

  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;