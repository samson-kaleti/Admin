require("dotenv").config();
const express = require("express");
const http = require("http");
const sequelize = require("./config/db.js");
// const swaggerDocument = require("./swagger/swagger.json");
const { swaggerSpecs } = require("./swagger/swagger");
const vendorRoutes = require("./routes/vendor.route.js");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/auth.route.js");
const planRoutes = require("./routes/plan.route.js");
const orderRoutes = require("./routes/order.route.js");
const vendorauthRoutes = require("./routes/vendorauth.route.js") 
const ProductRoutes = require("./routes/product.route.js") 
const CustomerRoutes = require("./routes/customer.route.js")
const vendoruserRoutes = require("./routes/vendoruser.route.js");
const storeRoutes = require('./routes/store.route.js');
const cartRoutes = require("./routes/cart.route.js");
const saleschannelRoutes = require("./routes/saleschannel.route.js");
const app = express();
const cors = require('cors')
app.use(
  cors({
    origin: "http://localhost:7009", // Adjust based on your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};
// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth",authRoutes);
app.use("/api",planRoutes);
app.use("/api/vendor", vendorauthRoutes) 
app.use("/api", vendoruserRoutes);
app.use("/api/products" ,ProductRoutes ) 
app.use("/api/customer",CustomerRoutes)
app.use('/api/stores', storeRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/saleschannels', saleschannelRoutes)
startServer();
