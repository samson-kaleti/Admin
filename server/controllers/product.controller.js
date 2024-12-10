const ProductService = require('../services/product.service') 

// Get all plans
const listProducts = async (req, res) => {
    try {
      const plans = await ProductService.list();
      res.status(200).json(plans);
    } catch (error) {
      console.error("Error in listProducts:", error.message);
      res.status(500).json({ error: error.message });
    }
  }; 


  module.exports = {
    listProducts,
  };