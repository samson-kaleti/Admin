const Vendor = require("../models/vendor.model");
const Address = require("../models/address.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateEntityId = (prefix) => {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
};

class VendorService {
  async getAllVendors() {
    return await Vendor.findAll({ include: ["address"] });
  }

  async getVendorById(id) {
    const vendor = await Vendor.findByPk(id, { include: ["address"] });
    if (!vendor) {
      throw new Error("Vendor not found.");
    }
    return vendor;
  }

  async createVendor(data) {
    const existingVendor = await Vendor.findOne({ where: { contact_email: data.contact_email } });
    if (existingVendor) {
      throw new Error("Vendor with this email already exists.");
    }

    const vendorId = generateEntityId("vendor");
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const vendorData = {
      id: vendorId,
      ...data,
      password: hashedPassword,
    };

    const vendor = await Vendor.create(vendorData);

    if (data.vendorAddressData) {
      const vendorAddress = {
        id: generateEntityId("address"),
        vendor_id: vendor.id,
        ...data.vendorAddressData,
      };
      await Address.create(vendorAddress);
    }

    if (data.registrationAddressData) {
      const registrationAddress = {
        id: generateEntityId("address"),
        vendor_id: vendor.id,
        ...data.registrationAddressData,
      };
      await Address.create(registrationAddress);
    }

    return this.getVendorById(vendor.id); // Fetch complete vendor details with addresses
  }

  async updateVendor(id, data) {
    const vendor = await this.getVendorById(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await vendor.update(data);

    // Update or create vendor address
    if (data.vendorAddressData) {
      const vendorAddress = await Address.findOne({ where: { vendor_id: id } });
      if (vendorAddress) {
        await vendorAddress.update(data.vendorAddressData);
      } else {
        await Address.create({ id: generateEntityId("address"), vendor_id: id, ...data.vendorAddressData });
      }
    }

    return this.getVendorById(id);
  }

  async deleteVendor(id) {
    const vendor = await this.getVendorById(id);
    return await vendor.destroy({ force: true });
  }
}

module.exports = new VendorService();
