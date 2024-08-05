const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

app.use(bodyParser.json());

const db = require("./db.json");
app.get("/produtos", function (req, res) {
  var produtos = db.produtos;
  res.json(produtos);
});

app.get("/produtos/:id", function (req, res) {
  const _id = req.params.id;
  const lista_produtos = db.produtos;
  const produto = lista_produtos.find((produto) => produto.id == _id);
  produto ? res.send(produto) : res.status(404).send({ error: "not found" });
});

app.post("/produtos", function (req, res) {
  //pegar inf do novo produto do body
  const dados = req.body;
  //verificar se as informações nome e preço foram enviadas
  if (!dados.nome || !dados.preco) {
    res.status(406).send({ error: "nome e preço devem ser informados" });
  }
  const _id = uuidv4();
  dados.id = _id;

  //lista_produtos = db.produtos;
  lista_produtos.push(dados);
  fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if (err) {
      res.status(500).send({ error: "erro no servidor" });
    }
  });

  res.status(204).send();
});

app.post("/produtos/:id", function (req, res) {
  //pegar inf do produto do body
  const _id = req.params.id;
  const lista_produtos = db.produtos;
  const produto = lista_produtos.find((produto) => produto.id == _id);
  //pegar esse produto altera
  const alteracao = produto.splice();
});

//verificar campo que foi alterado

//atualizar esse campo no db

app.get("/produtos/:id/");
app.listen(5050);
