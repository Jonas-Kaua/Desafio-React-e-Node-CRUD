const Sequelize = require("sequelize");
const sequelize = new Sequelize(require("./configdatabase"));


const Compra = sequelize.define('compra',{
    total:{
        type : Sequelize.DOUBLE,
        defaultValue: 0
    },
    tipo_pagamento: {
        type : Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    id_produto: {
        type: Sequelize.INTEGER,
        references:{
            model: 'produtos',
            key: 'id',
            onDelete: 'cascate',
            onUpdate: 'cascates'
        }
    }
});

module.exports = Compra;