require("dotenv").config(); 
const express = require("express");
const cors = require("cors"); 
const http = require("http"); 
const sequelize = require('./config/db.js'); 
const swaggerDocument = require("./swagger/swagger.json")
const vendorRoutes = require("./routes/vendorRoutes.js")
const swaggerUi = require("swagger-ui-express"); 
const authRoutes  = require("./routes/auth.route.js")

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
      // API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/vendors", vendorRoutes);
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
  }; 

  app.use("/api/auth",authRoutes)
  
  startServer();