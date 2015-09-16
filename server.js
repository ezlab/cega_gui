
var express = require('express'),
	proxy = require('express-http-proxy'),
	app = express();

var routes = ['/position', '/element', '/fasta', '/bed', '/fastalign', '/block', '/karyotype'];

app.use('/static', express.static('static', {maxAge: '1h'}));

app.get(routes, proxy('cega.ezlab.org'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 80);