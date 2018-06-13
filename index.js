const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

app.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
    //Read json file
    var fs = require("fs");
    var content = '';
    switch (req.body.result.parameters["rating"]) {
        case "1":
            content = fs.readFileSync("testData.1.json");
            break;
        case "2":
            content = fs.readFileSync("testData.2.json");
            break;
        default:
            content = fs.readFileSync("testData.json");
            break;
    }

    var jsonContent = JSON.parse(content)

    //Persist this in some database
    //Send out an email that new feedback has come in
    res.status(200).json({
        speech: jsonContent.speech,
        displayText: jsonContent.displayText,
        source: jsonContent.source
    });
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});