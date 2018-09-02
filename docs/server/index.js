"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var node_fetch_1 = require("node-fetch");
var cors = require("cors");
var app = express();
app.use(cors());
app.get('/szellemlovas/:query', function (req, res) {
    node_fetch_1.default("https://www.szellemlovas.hu/tarsasjatekok/index.php?r=webboltTermekValtozat/index&termek_nev=" + req.params.query)
        .then(function (r) { return r.text(); })
        .then(function (r) { return res.send(r); });
});
app.get('/gemklub/:query', function (req, res) {
    node_fetch_1.default("https://www.gemklub.hu/catalogsearch/result/?cat=0&q=" + req.params.query)
        .then(function (r) { return r.text(); })
        .then(function (r) { return res.send(r); });
});
app.get('/reflexshop/:query', function (req, res) {
    node_fetch_1.default("https://reflexshop.hu/index.php?route=product/list&keyword=" + req.params.query)
        .then(function (r) { return r.text(); })
        .then(function (r) { return res.send(r); });
});
app.get('/metagame/:query', function (req, res) {
    node_fetch_1.default("https://metagames.hu/webshop?kereses=" + req.params.query)
        .then(function (r) { return r.text(); })
        .then(function (r) { return res.send(r); });
});
var port = process.env.PORT || 3001;
app.listen(port, function () { return console.log('listening on ' + port); });