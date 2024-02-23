const bcrypt = require('bcrypt');

const saltRounds = 10;

// Hash function
const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Compare password function
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};