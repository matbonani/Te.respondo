//       ***  imports  ***                
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connection = require('./database/database')

const Pergunta = require("./database/Pergunta");

const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({ 
        raw: true, 
        order:[
        ['id', 'DESC'] // ASC = Crescente
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

// rota que recebe os dados do formulario
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

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){   // pergunta encontrada
            
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
        }else{                        // pergunta não encontrada
            res.redirect("/");
        }
    });
})


app.post("/responder", (req, res ) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});


//       ***  Informando a porta que a aplicação ira rodar  ***    
app.listen(3030, ()=>{
    console.log("App rodando");
});

