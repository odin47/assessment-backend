const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require("fs");
const bodyParser = require('body-parser');


const app = express();
withUpload = fileUpload({ createParentPath: true });

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
  });
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(withUpload);
  

// ROUTES
app.get('/', (req, res) => res.send('OK'));

app.post('/upload',   (req, res) => {
    // console.log(req.files.file.data);
    fs.writeFile('data.txt', req.files.file.data, (err) => {
        if(err) {
            res.status(500).send('Error Uploading File'); 

        }
        res.status(200).send('Success');  
    });
});

app.get('/list', (req, res) => {
     const rawdata = fs.readFileSync('data.txt');
    res.send({
        result: rawdata.toString()
    });
});

app.listen(8000, () => {
    console.log('Listining.........8000');
});
