const { Op } = require("sequelize");
const Product = require("../models/product")
const { faker } = require('@faker-js/faker');

const createProduct = async(req,res)=>{
    
    await Product.create({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    })

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
    //             await Product.bulkCreate(products);  // Bulk insert all products into the database
    //             console.log(`${i + 1} products inserted successfully!`);
    //         } catch (error) {
    //             console.error('Error inserting products:', error);
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
    //         console.error('Error inserting products:', error);
    //     }
    // }
}

const getProducts = async(req,res)=>{
    const products = await Product.findAll({
        attributes:["productName","price","stock","productId"],
        where:{
        productName:{
            [Op.like]:`${req.params.key}%`
        }
    }})
    
    return res.json(products)
}

const getProductDetail = async(req, res) => {
    const product = await Product.findByPk(req.params.id)
    if (!product) return res.status(404).send("Product not found")
    return res.json(product)
}

module.exports = {createProduct,getProducts,getProductDetail}