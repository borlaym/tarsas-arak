import * as express from 'express';
import fetch from 'node-fetch';
import * as cors from 'cors';
const app = express();
app.use(cors());

app.get('/szellemlovas/:query', (req, res) => {
	fetch(`https://www.szellemlovas.hu/tarsasjatekok/index.php?r=webboltTermekValtozat/index&termek_nev=${req.params.query}`)
		.then(r => r.text())
		.then(r => res.send(r));
})

app.get('/gemklub/:query', (req, res) => {
	fetch(`https://www.gemklub.hu/catalogsearch/result/?cat=0&q=${req.params.query}`)
		.then(r => r.text())
		.then(r => res.send(r));
})

app.get('/reflexshop/:query', (req, res) => {
	fetch(`https://reflexshop.hu/index.php?route=product/list&keyword=${req.params.query}`)
		.then(r => r.text())
		.then(r => res.send(r));
})

app.get('/metagame/:query', (req, res) => {
	fetch(`https://metagames.hu/webshop?kereses=${req.params.query}`)
		.then(r => r.text())
		.then(r => res.send(r));
})

app.listen(3001, () => console.log('listening on 3001'));
