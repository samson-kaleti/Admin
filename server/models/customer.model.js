const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming the sequelize instance is defined here 
const crypto = require("crypto");


const generateEntityId = (prefix) => {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
};

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures that the email is unique
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  billing_address_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  has_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  vendor_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'customer', 
  timestamps: false,    

  hooks: {
    beforeCreate: (user) => {
      if (!user.id) {
        user.id = generateEntityId("customer");
      }
    },
  },
});

module.exports = Customer;
