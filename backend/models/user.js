const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Kullanıcı adı zorunludur'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-posta adresi zorunludur'],
    unique: true,
    lowecase: true,
    trim: true
  },
  password:{
    type: String,
    required: [true, 'Parola zorunludur'],
    minLength: 6
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User