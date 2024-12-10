const Customer = require("../models/customer.model")

class CustomerService {
    async list(){
        return await Customer.findAll()
    }
} 


module.exports = new CustomerService();