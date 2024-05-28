// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
const { isInt } = require("validator");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { isDecimal: true },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { isInt: true },
            defaultValue: 10,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: { model: "category", key: "id" },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "product",
    }
);

module.exports = Product;
