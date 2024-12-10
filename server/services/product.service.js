const Product = require("../models/product.model")


class ProductService{
    async list(){
        return await Product.findAll()

    }
} 

module.exports = new ProductService();