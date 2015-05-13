import qs = require('querystring');
import express = require('express');
import router = require('./modules/Router');

var app:express.Express = express();
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/myTest.html');
});

app.get('/clear', function (req, res) {
    var r : router.Router = new router.Router();
    r.clearData(res);
});

app.get('/values', function (req, res) {
    var r : router.Router= new router.Router();
    r.showData(res);
});

app.post('/inbound', function (req, res) {
    var requestBody = '';
    req.on('data', function (data) {
        requestBody += data;
    });
    req.on('end', function () {
        var formData = qs.parse(requestBody);
        var r : router.Router = new router.Router();
        r.submitData(formData, res);
    });
});

app.listen(8080, "0.0.0.0");
