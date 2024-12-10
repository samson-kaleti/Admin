const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Import UUID generator
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING, // Set as STRING since UUIDs are strings
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "user",
    timestamps: false,
    hooks: {
      beforeCreate: (user) => {
        // Generate a UUID if `id` is not already set
        if (!user.id) {
          user.id = uuidv4();
        }
      },
    },
  }
);

// Synchronize the model with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized!");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error.message);
  });

module.exports = User;
