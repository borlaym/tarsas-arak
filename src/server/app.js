"use strict";
exports.__esModule = true;
var express = require("express");
var node_fetch_1 = require("node-fetch");
var cors = require("cors");
var app = express();
app.use(cors());
app.get('/szellemlovas', function (req, res) {
    node_fetch_1["default"]('https://www.szellemlovas.hu/tarsasjatekok/index.php?r=webboltTermekValtozat/index&termek_nev=scythe')
        .then(function (r) { return r.text(); })
        .then(function (r) { return res.send(r); });
});
app.listen(3001, function () { return console.log('listening on 3001'); });
