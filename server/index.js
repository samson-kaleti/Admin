require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const sequelize = require("./config/db.js");
const swaggerDocument = require("./swagger/swagger.json");
const vendorRoutes = require("./routes/vendor.route.js");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/auth.route.js");
const planRoutes = require("./routes/plan.route.js");
const orderRoutes = require("./routes/order.route.js");
const vendorauthRoutes = require("./routes/vendorauth.route.js") 
const ProductRoutes = require("./routes/product.route.js") 
const CustomerRoutes = require("./routes/customer.route.js")
const vendorUserRoutes = require("./routes/vendoruser.route.js");
const app = express();

app.use(cors());
app.use(express.json());

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth",authRoutes);
app.use("/api",planRoutes);
app.use("/api/vendor", vendorauthRoutes) 
app.use("/api", vendorUserRoutes);
app.use("/api/vendor" ,ProductRoutes ) 
app.use("/api/vendor",CustomerRoutes)

startServer();
