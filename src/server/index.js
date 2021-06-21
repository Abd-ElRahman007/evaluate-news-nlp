
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

const projectData = {
    application_key: process.env.API_KEY
};

//* declare the dotenv.
const dotenv = require('dotenv');
dotenv.config();

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
    //res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});

app.post('/theUrl', function (req, res) {
    projectData.url = req.body.url;
    projectData.apiUrl = req.body.apiUrl;
});

const dataInfo = async (baseUrl, key, url) => {
    const data = await fetch(`${baseUrl}${key}${url}&lang=en`);
    try {
        const jsonData = await fetch(data.json());
        let textArticle = '';
        for (const i of jsonData.sentence_list) {
            let text = jsonData.sentence_list[i].text;
            textArticle = textArticle + ' ' + text;
        }
        const finalData = {
            agreement: jsonData.agreement,
            confidence: jsonData.confidence,
            irony: jsonData.irony,
            model: jsonData.model,
            articleText: textArticle
        };
        return finalData;
    } catch (error) {
        console.log('error', error);
    }
};
dataInfo(projectData.apiUrl, projectData.application_key, projectData.url);
app.get('/nlpData', (res, req) => {
    res.send();
});

