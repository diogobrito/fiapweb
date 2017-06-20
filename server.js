const express = require('express');
var app = express();

app.use(express.static(path.join(_dirname, 'dist')));

app.get("*", function (req, res) {
    res.status(404).send({ error: 'API Not Found' });
});
app.listen(process.env.PORT || 3000, function () {
    console.log('Escutando na porta 3000');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/contato', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.status(200).json({ success: true });
});

const fs = require('fs');
const path = require('path');
const dbFolder = _dirname + '/db';
const contatosDbPath = dbFolder + '/contatos.json';

// se a pasta db não existir, ele cria
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
}

// se o arquivo  não existe, retorna JSON array vazio
// se existe, retorna JSON array com todos os contatos
var tryRead = function (path, callback) {
    fs.readFile(path, 'utf8', function (err, contatos) {
        if (err) return callback([]);
        var contatosJSON = [];
        try {
            contatosJSON = JSON.parse(contatos);
        } catch (error) { }
        return callback(contatosJSON);
    })
}

app.post('/api/contato', function (req, res) {
    // Le os contatos já gravados
    tryRead(contatosDbPath, function (contatos) {
        // incluir novo contato
        contatos.push(req.body);
        // escreve arquivo com o contato novo
        fs.writeFile(contatosDbPath, JSON.stringify(contatos), function(err){
            if(err){
                res.status(500).json({ error: 'Opa, detectamos um erro! Tente novamente mais tarde'});
                return;
            }
            //envia http code 200 e json com {success : true}
            res.status(200).json({ success: true });
        });
    }); 
});
