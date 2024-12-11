const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto"); // Used for generating unique IDs

// Function to generate a custom ID
const generateEntityId = (prefix) => {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
};

// Define the `Store` model
const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.STRING(250), // Use STRING to store the custom ID
      primaryKey: true,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    default_currency_code: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    swap_link_template: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    payment_link_template: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    invite_link_template: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    store_type: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    publishable_api_key: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    store_url: {
      type: DataTypes.STRING(452),
      allowNull: true,
    },
    vendor_id: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    default_sales_channel_id: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    default_location_id: {
        type: DataTypes.STRING(120),
        allowNull: true,
    }
  },
  {
    tableName: "store", // Use existing table name
    timestamps: true, // Enable created_at and updated_at
    underscored: true, // Use snake_case for column names
    paranoid: true, // Enable deleted_at for soft deletes
    hooks: {
      // Generate the ID before creating a record
      beforeCreate: (store) => {
        store.id = generateEntityId("store");
      },
    },
  }
);

module.exports = Store;
