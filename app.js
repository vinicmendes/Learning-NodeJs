const express = require('express');
const { randomUUID } = require('crypto');

const app = express();

app.use(express.json())

const products = [];


/**
 * POST -> INSERIR DADO
 * GET -> BUSCAR DADOS
 * PUT -> ATUALIZAR DADOS
 * DELETE -> DELETAR DADOS 
 */

/**
 * Body -> Enviar dados para a aplicação
 * Params -> Identificar recursos Ex: /users/id
 * Query -> Consultar recursos Ex: /users?id=31231243143
 */

app.post("/products", (req, res) => {
    const {name,price} = req.body;
    
    const product = {
        name,
        price,
        id: randomUUID()
    };

    products.push(product);

    return res.json(product);
});

app.get("/products", (req, res) => {
    return res.json(products);
});

app.listen(4002, () => console.log("O servidor está rodando na porta 4002"));

