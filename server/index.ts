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
app.get('/deltavision/:query', (req, res) => {
	fetch(`http://www.deltavision.hu/catalogsearch/result/?q=${req.params.query}`)
		.then(r => r.text())
		.then(r => res.send(r));
})
app.get('/tarsasjatekdiszkont/:query', (req, res) => {
	fetch(`https://www.tarsasjatekdiszkont.hu/shop_search.php?search=${req.params.query}`)
		.then(r => r.text())
		.then(r => res.send(r));
})
const port = process.env.PORT || 3001
app.listen(port, () => console.log('listening on ' + port));
