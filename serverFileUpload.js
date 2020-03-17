const express = require('express');
const formidable = require('formidable');
const moment = require('moment');
const app = express();

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Origin",req.headers.origin);
    res.header("Access-Control-Allow-Methods","OPTIONS,GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers","Content-Type,Authorization");

    next();
});

app.post('/upload', (req, res, next) => {
    const form = formidable({ multiples: false });

    form.parse(req);

    // capture event 'fileBegin' and change file path
    // https://www.npmjs.com/package/formidable

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/public/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        res.send(`${file.name} is uploaded`);
    });

    next();

});

app.post('/savetext', (req, res, next) => {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }

        var fs = require("fs");

        const filename = "textFile"+moment().format('YYYYMMDDhmmss')+".txt";

        var writeStream = fs.createWriteStream("./public/uploads/"+filename);
        writeStream.write(fields.textdata);
        writeStream.end();

        res.send('/uploads/'+filename);

    });


    next();

});

app.listen(3001, () => {
    console.log('Server listening on http://localhost:3001 ...');
});