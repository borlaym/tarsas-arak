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

app.listen(3001, () => console.log('listening on 3001'));
