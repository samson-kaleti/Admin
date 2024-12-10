const Vendor = require("../models/vendormodel");
const crypto = require("crypto"); // Used for generating unique IDs
const generateEntityId = (prefix) => {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
};
class VendorService {
  async getAllVendors() {
    return await Vendor.findAll();
  }

  async getVendorById(id) {
    const vendor = await Vendor.findByPk(id);
    if (!vendor) {
      throw new Error("Vendor not found.");
    }
    return vendor;
  }

  async createVendor(data) {
    // Business logic to prevent duplicate email
    console.log("VENDOR DATA: " + JSON.stringify(data));
    const existingVendor = await Vendor.findOne({ where: { contact_email: data.contact_email } });
    if (existingVendor) {
      throw new Error("Vendor with this email already exists.");
    }
    const id = generateEntityId("vendor")
    const vendorData = {id, ...data}
    // Create the vendor
    return await Vendor.create(vendorData);
  }

  async updateVendor(id, data) {
    const vendor = await this.getVendorById(id);
    return await vendor.update(data);
  }

  async deleteVendor(id) {
    const vendor = await this.getVendorById(id);
    return await vendor.destroy();
  }
}

module.exports = new VendorService();
