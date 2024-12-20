const { Op } = require("sequelize");
const Product = require("../models/product");
const { faker } = require("@faker-js/faker");
const { createClient } = require("redis");
const redisClient = createClient();
redisClient.connect().catch(console.error);

const createProduct = async (req, res) => {
    // await Product.create({
    //     productName: req.body.productName,
    //     description: req.body.description,
    //     price: req.body.price,
    //     stock: req.body.stock,
    // });
    // const products = [];
    // const batchSize = 500; // Số sản phẩm mỗi lần chèn
    // const totalRecords = 5000; // Tổng số sản phẩm cần tạo
    // for (let i = 0; i < totalRecords; i++) {
    //     const product = {
    //         productName: faker.commerce.productName(),
    //         description: faker.commerce.productDescription(),
    //         price: parseFloat(faker.commerce.price()),
    //         stock: faker.number.int({ min: 1, max: 100 }),
    //     };
    //     products.push(product);
    //     // Nếu đã đủ batchSize thì insert vào DB
    //     if (products.length === batchSize) {
    //         try {
    //             await Product.bulkCreate(products); // Bulk insert all products into the database
    //             console.log(`${i + 1} products inserted successfully!`);
    //         } catch (error) {
    //             console.error("Error inserting products:", error);
    //         }
    //         // Reset mảng để chuẩn bị cho batch tiếp theo
    //         products.length = 0;
    //     }
    // }
    // // Nếu còn sản phẩm nào chưa được chèn (số lượng không chia hết cho batchSize)
    // if (products.length > 0) {
    //     try {
    //         await Product.bulkCreate(products);
    //         console.log(`${totalRecords} products have been created successfully!`);
    //     } catch (error) {
    //         console.error("Error inserting products:", error);
    //     }
    // }
};

const getProducts = async (req, res) => {
    try {
        const searchKey = req.params.key.trim();
        const cacheKey = `products:${searchKey}`;

        // const keys = await redisClient.keys("*");
        // if (keys.length === 0) {
        //     return res.status(200).json({ message: "No data found in cache." });
        // }

        // const values = await redisClient.mGet(keys);

        // const result1 = values.map((value) => JSON.parse(value));
        // console.log(result1);

        const cachedProducts = await redisClient.get(cacheKey);

        if (cachedProducts) {
            console.log("Cache hit for:", searchKey);
            return res.json(JSON.parse(cachedProducts));
        }

        console.log("abc");

        const products = await Product.findAll({
            attributes: ["productName", "price", "stock", "productId"],
            where: {
                productName: {
                    [Op.like]: `${searchKey}%`,
                },
            },
        });

        if (products.length === 0) {
            console.log("No products found for:", searchKey);
            return res.status(404).json({ message: "No products found" });
        }

        await redisClient.setEx(cacheKey, 1, JSON.stringify(products));
        console.log("object");
        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProductDetail = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    return res.json(product);
};

module.exports = { createProduct, getProducts, getProductDetail };
