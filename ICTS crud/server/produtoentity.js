const Sequelize = require("sequelize");
const sequelize = new Sequelize(require("./configdatabase"));



const Product = sequelize.define('produto',{
    nome:{
        type : Sequelize.STRING
    },
    descricao: {
        type : Sequelize.TEXT
    },
    preco: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
});

module.exports = Product;