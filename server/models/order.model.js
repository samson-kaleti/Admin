const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    vendor_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    store_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "archived", "canceled", "requires_action"),
      allowNull: false,
      defaultValue: "pending",
    },
    total_amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    line_items: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    public_api_key: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "order", // Use the actual table name in the database
    timestamps: true, // Enable created_at and updated_at
    underscored: true, // Use snake_case for column names
    paranoid: true, // Enable soft deletes with deleted_at
  }
);

module.exports = Order;
