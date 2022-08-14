const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();

app.use(express.json())

let products = [];

fs.readFile('products.json',"utf-8" ,(err, data) => {
    if(err) console.log(err);
    else products = JSON.parse(data);
});

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
    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID()
    };

    products.push(product);

    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Arquivo salvo com sucesso")
        }
    });

    return res.json(product);
});

app.get("/products", (req, res) => {
    return res.json(products);
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find(product => product.id === id);

    return res.json(product);
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        /**
         * Rest Operator -> pega todos, exceto name e price
         */
        ...products[productIndex],
        name,
        price
    };


    return res.json({ message: "Product updated" });
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    return res.json({ message: "Product deleted" });
})

app.listen(4002, () => console.log("O servidor está rodando na porta 4002"));

