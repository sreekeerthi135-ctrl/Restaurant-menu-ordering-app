const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restaurant_app';

const seedData = [
  { name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 249, category: 'Pizza', imageUrl: '' },
  { name: 'Farmhouse Pizza', description: 'Loaded with veggies', price: 329, category: 'Pizza', imageUrl: '' },
  { name: 'Veg Burger', description: 'Crispy patty with lettuce', price: 149, category: 'Burgers', imageUrl: '' },
  { name: 'Paneer Tikka', description: 'Spicy grilled paneer', price: 199, category: 'Starters', imageUrl: '' },
  { name: 'Masala Fries', description: 'Spiced french fries', price: 99, category: 'Sides', imageUrl: '' },
  { name: 'Cold Coffee', description: 'Chilled coffee with ice cream', price: 129, category: 'Beverages', imageUrl: '' }
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(seedData);
    console.log('Seed data inserted');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
