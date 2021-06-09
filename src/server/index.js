const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

const Data = {
    application_key: process.env.API_KEY,
    lang: "en",
};


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});

app.get('/api_key', function (req, res) {
    res.send(Data);
});

