const { Sequelize } = require("sequelize");

// Cấu hình kết nối
const db = new Sequelize("Architecture", "root", "root", {
    host: "localhost",
    port: 3307,
    dialect: "mysql", // Có thể là 'postgres', 'sqlite', 'mssql'
    logging: false, // Tắt log query (tuỳ chọn)
});

(async () => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = db;
