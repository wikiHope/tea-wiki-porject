const { generateAccessToken } = require('../utils/auth')
const { comparePassword } = require('../utils/password')
const User = require('../models/user')

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({userName})

    // check user not falsy and password is correct
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre'})
    }

    const access_token = generateAccessToken({ userId: user._id})
    res.status(200).send({success: true, user, access_token: access_token});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}