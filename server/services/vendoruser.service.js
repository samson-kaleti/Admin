const bcrypt = require("bcryptjs");
const { VendorUser } = require("../models/vendoruser.model");
const { Vendor } = require("../models/vendoruser.model");

class VendorUserService {
  // Create a new VendorUser
  async createVendorUser(data) {
    if (!data.email || !data.password || !data.role) {
      throw new Error("Email, password, and role are required");
    }

    const existingUser = await VendorUser.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
      ...data,
      password: hashedPassword,
    };

    const vendorUser = await VendorUser.create(newUser);

    return vendorUser;
  }

  // Update VendorUser details
  async updateVendorUser(id, data) {
    const user = await VendorUser.findByPk(id);
    if (!user) {
      throw new Error(`VendorUser with id ${id} not found`);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(data);

    return user;
  }

  // Retrieve VendorUser by ID
  async getVendorUserById(id) {
    const user = await VendorUser.findByPk(id);
    if (!user) {
      throw new Error(`VendorUser with id ${id} not found`);
    }

    return user;
  }

  // Delete VendorUser by ID
  async deleteVendorUser(id) {
    const user = await VendorUser.findByPk(id);
    if (!user) {
      throw new Error(`VendorUser with id ${id} not found`);
    }

    await user.destroy();
    return { message: "User deleted successfully" };
  }

  // Retrieve all users for a specific vendor
  async getUsersByVendor(vendorId) {
    const users = await VendorUser.findAll({
      where: { vendorId },
    });

    return users;
  }
}

module.exports = new VendorUserService();
