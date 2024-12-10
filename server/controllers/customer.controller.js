const customerService = require("../services/customer.service"); 

    // Get all customers
    const getAllCustomers = async (req, res) => {
        try {
            const customers = await customerService.list();
            res.status(200).json({ success: true, customers });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    module.exports = {
        getAllCustomers,
    };

