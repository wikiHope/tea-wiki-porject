const User = require('../models/user')
const { hashPassword } = require('../utils/password')

exports.register = async (req, res) => {
  const userData = req.body;

  try {
    // Check user already exists
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { userName: userData.userName }],
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu e-posta adresi veya kullanıcı adı zaten kullanılıyor.' });
    }

    // Create and add new user
    userData.password = await hashPassword(userData.password)
    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ success: true, message: 'Kullanıcı başarıyla kaydedildi.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};