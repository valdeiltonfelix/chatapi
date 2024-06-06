const http      = require('http');
const url       = require('url');
const processos = require("./processos.js");
const express   = require('express');
var bodyParser = require('body-parser');
const login = require("./validation/validation.js");
const app = express();
const port = 3035;
var urlencodedParser = bodyParser.urlencoded({ extended: true })



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})

 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

app.get('/', (req, res) => {
  res.send('Bem vindo a minha api do chat maxone')
})
app.post('/login' , urlencodedParser,processos.getUsersLogiPassword);
app.get('/usersid/:id'            , urlencodedParser,processos.getUsersId);
app.get('/users'                  , urlencodedParser,processos.getUsers);
app.post('/addusers'              , urlencodedParser,login.loginValidator,processos.addUsers);
app.put('/updateusers/:id'        , urlencodedParser,login.loginValidator,processos.updateUser);
app.delete('/deleteeusers/:id'    , urlencodedParser,processos.deleteUsers);

  //res.sendFile(__dirname + '/static/index.html');


