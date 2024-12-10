require("dotenv").config(); 
const express = require("express");
const cors = require("cors"); 
const http = require("http"); 
const sequelize = require('./config/db.js'); 

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
  
  startServer();