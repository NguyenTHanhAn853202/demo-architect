const { DataTypes } = require('sequelize');
const db = require('../db'); // Đảm bảo rằng bạn đã cấu hình kết nối sequelize

const User = db.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Email duy nhất
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,  // Không sử dụng createdAt và updatedAt tự động
});

module.exports = User;
