const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

class AuthService {
  // Signup logic
  async signup(data) {
    const { email, first_name, last_name, password } = data;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email is already registered.");
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ email, first_name, last_name, password_hash });

    // Generate a JWT token
    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  // Login logic
  async login(data) {
    const { email, password } = data;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    // Generate a JWT token
    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  }
}

module.exports = AuthService;