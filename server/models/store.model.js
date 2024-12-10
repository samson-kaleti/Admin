// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// // Models for related entities
// const User = require('./user.model')
// const Product = require('./product.model');
// const Vendor = require('./vendormodel');
// const Order = require("./order.model"); 
// const crypto = require("crypto");

// // Utility function to generate a custom ID
// const generateEntityId = (prefix) => {
//   return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
// };

// // Store Model
// const Store = sequelize.define(
//   "Store",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },
//     store_type: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     publishableapikey: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     store_url: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     vendor_id: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//   },
//   {
//     tableName: "store", // Matches the database table name
//     timestamps: false, // Disable Sequelize's automatic timestamps 


//     hooks: {
//         beforeCreate: (store) => {
//           // Generate custom ID before creating the record
//           if (!store.id) {
//             store.id = generateEntityId("store");
//           }
//         },
//       },
//   }
// );

// // Define Relationships

// // One-to-Many: Store -> User
// Store.hasMany(User, {
//   foreignKey: "store_id", // Foreign key in User table
//   as: "members", // Alias for accessing related users
// });
// User.belongsTo(Store, {
//   foreignKey: "store_id",
//   as: "store",
// });

// // One-to-Many: Store -> Product
// Store.hasMany(Product, {
//   foreignKey: "store_id", // Foreign key in Product table
//   as: "products", // Alias for accessing related products
// });
// Product.belongsTo(Store, {
//   foreignKey: "store_id",
//   as: "store",
// });

// // Many-to-One: Store -> Vendor
// Store.belongsTo(Vendor, {
//   foreignKey: "vendor_id", // Foreign key in Store table
//   as: "vendor", // Alias for accessing related vendor
// });
// Vendor.hasMany(Store, {
//   foreignKey: "vendor_id", // Foreign key in Store table
//   as: "stores",
// });

// // One-to-Many: Store -> Order
// Store.hasMany(Order, {
//   foreignKey: "store_id", // Foreign key in Order table
//   as: "orders", // Alias for accessing related orders
// });
// Order.belongsTo(Store, {
//   foreignKey: "store_id",
//   as: "store",
// });

// module.exports = Store;
