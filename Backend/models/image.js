const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    imagePath: String
  });
  
  const Image = mongoose.model('User', userSchema);

  module.exports = Image;