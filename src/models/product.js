const { DataTypes } = require('sequelize');
const db = require('../db'); // Đảm bảo rằng bạn đã cấu hình kết nối sequelize

const Product = db.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  }
}, {
  tableName: 'products',
  timestamps: false,  // Không sử dụng createdAt và updatedAt tự động
});

module.exports = Product;
