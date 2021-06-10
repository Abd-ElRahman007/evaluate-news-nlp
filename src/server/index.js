const dotenv = require('dotenv');
dotenv.config();
var path = require('path');

//* declare express
const express = require('express');

//* start the instance of the app
const app = express();
app.use(express.static('dist'));

//* require bodyParser
const bodyParser = require('body-parser');

//* set bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//* require cors
const cors = require('cors');
app.use(cors);


console.log(__dirname);

const key = { application_key: process.env.API_KEY };


app.get('/', function (req, res) {
    //res.sendFile(path.resolve('dist/index.html'));
    res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});

app.get('/api_key', function (req, res) {
    res.send(key);
});

