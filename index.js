//       ***  imports  ***                
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connection = require('./database/database')


const Pergunta = require("./database/Pergunta");

// *************

//       ***  database  ***    
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    })
    .catch(() => {
        console.log(msgErro);
    })
//    *****************

// Informando para o Express que usaremos o EJS para  view engine
app.set('view engine', 'ejs');
// Informando que usaremos arquivos estáticos
app.use(express.static('public'));

// estrututra que decodifica os dados enviados do formulario para usar no back-end
app.use(bodyParser.urlencoded({extended: false}));
// Permite leitura de arquivos json
app.use(bodyParser.json());




//       ***  Rotas  ***    

app.get("/", (req, res) => {
    res.render("index",)
});

// rota que recebe os dados do formulario
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});




//       ***  Informando a porta que a aplicação ira rodar  ***    
app.listen(3030, ()=>{
    console.log("App rodando");
});

