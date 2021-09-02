
const express = require("express");
const app = express();
const mysql = require("mysql");

const Product = require("./produtoentity");
const Compra = require("./compraentity");

const Sequelize = require ('sequelize');
const handlebars = require('express-handlebars');
const sequelize = new Sequelize(require("./configdatabase"));
const cors = require("cors");

app.use(cors());
app.use(express.json());

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(error){
    console.log("Erro na conexão "+error);
})

//CRUD PRODUTOS

app.post('/produto', async (req, res)=>{
    const {nome, descricao, preco} = req.body;
    const newProduct = Product.create({nome, descricao, preco});

    res.status(200).json(Product)
})

app.get('/listarproduto',async (req, res)=>{
    var retorno = await (Product.findAll());
    console.log(retorno);

    res.status(200).json(retorno);
} )

app.delete('/deleteproduto/:id',async (req, res)=>{
    console.log("sucesso delete")
    var retorno = await(Product.destroy({
        where:{id: req.params.id}
    }));
    res.status(200).json(retorno);
} )

app.put('/updateproduto/:id', async (req, res)=>{
    const {nome, descricao, preco} = req.body;
    const id = req.params.id;
    const newProduct = await Product.findByPk(id);
    newProduct.nome = nome;
    newProduct.descricao = descricao;
    newProduct.preco = preco;
    
    await Product.update({nome, descricao, preco}, {
        where: {id: req.params.id}
    } )

    res.status(200).json(newProduct);
})

//CRUD COMPRAS
app.post('/compra', async (req, res)=>{
    const {total, tipo_pagamento, status, id_produto} = req.body;
    const newCompra = Compra.create({total, tipo_pagamento, status, id_produto});

    res.status(200).json(Compra)
})

app.get('/listarcompra', async (req, res)=>{
    var retorno = await (Compra.findAll());
    console.log(retorno);

    res.status(200).json(retorno); 
})

app.delete('/deletecompra/:id',async (req, res)=>{
    console.log("sucesso delete")
    var retorno = await(Compra.destroy({
        where:{id: req.params.id}
    }));
    res.status(200).json(retorno);
} )

app.put('/updatecompra/:id', async (req, res)=>{
    const {total, tipo_pagamento, status, id_produto} = req.body;
    const id = req.params.id;
    const newCompra = await Compra.findByPk(id);
    newCompra.total = total;
    newCompra.tipo_pagamento = tipo_pagamento;
    newCompra.status = status;
    newCompra.id_produto = id_produto;
    
    await Compra.update({total, tipo_pagamento, status, id_produto }, {
        where: {id: req.params.id}
    } )

    res.status(200).json(newCompra);
})



app.listen(3001, ()=>{
    console.log("ta rodando chefe na porta 3001");
});