const SalesChannel = require('../models/saleschannel.model');

class SalesChannelService {
  async createSalesChannel(data) {
    if (!data.vendor_id) {
      throw new Error('Vendor ID is required to create a Sales Channel.');
    }

    return await SalesChannel.create(data);
  }

  async getSalesChannelById(salesChannelId) {
    const salesChannel = await SalesChannel.findByPk(salesChannelId);
    if (!salesChannel) throw new Error(`Sales Channel with ID ${salesChannelId} not found.`);
    return salesChannel;
  }

  async updateSalesChannel(salesChannelId, updates) {
    const salesChannel = await this.getSalesChannelById(salesChannelId);
    return await salesChannel.update(updates);
  }

  async deleteSalesChannel(salesChannelId) {
    const salesChannel = await this.getSalesChannelById(salesChannelId);
    await salesChannel.destroy(); // Permanently deletes the record
  }

  async listSalesChannelsByVendor(vendorId) {
    if (!vendorId) {
      throw new Error('Vendor ID is required to fetch sales channels.');
    }
    return await SalesChannel.findAll({ where: { vendor_id: vendorId } });
  }
}

module.exports = new SalesChannelService();
