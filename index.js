const express = require("express");
const app = express();


// Informando para o Express que usaremos o EJS para  view engine
app.set('view engine', 'ejs');
// Informando que usaremos arquivos estáticos
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("index",)
});


// Informando a porta que irá rodar a aplicação
app.listen(3030, ()=>{
    console.log("App rodando");
});