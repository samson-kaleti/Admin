const AuthService = require("../services/auth.service");
const authService = new AuthService();

const signup = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    const result = await authService.signup({ email, first_name, last_name, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
