const { DataTypes } = require('sequelize');
const db = require('../db'); // Đảm bảo rằng bạn đã cấu hình kết nối sequelize
const User = require('./user'); // Import mô hình User
const Product = require('./product'); // Import mô hình Product

const Payment = db.define('Payment', {
  paymentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',  // Khóa ngoại liên kết đến userId trong bảng users
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'productId', // Khóa ngoại liên kết đến productId trong bảng products
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'payments',
  timestamps: false,  // Không sử dụng createdAt và updatedAt tự động
});

module.exports = Payment;
