
var path = require('path');

//* declare express
const express = require('express');
const fetch = require('node-fetch');

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
app.use(cors());

//* declare the dotenv.
const dotenv = require('dotenv');
dotenv.config();

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
    //res.sendFile(path.resolve('src/client/views/index.html'));
});
app.post('/theUrl', async function (req, res) {
    const url = req.body.url;
    const key = process.env.API_KEY;
    console.log({
        key,
        url
    });
    const data = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&url=${url}&lang=en`);
    try {
        const jsonData = await data.json();
        const finalData = {
            agreement: jsonData.agreement,
            confidence: jsonData.confidence,
            irony: jsonData.irony,
            model: jsonData.model
        };
        console.log(finalData);
        res.send(finalData);
    } catch (error) {
        console.log('error', error);
    }
});
// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
