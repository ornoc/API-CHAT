const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, nick: user.nick }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.checkToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return false;
  }
};


