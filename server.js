
var express = require('express'),
	proxy = require('express-http-proxy'),
	app = express();

var api = function(path){
	return proxy('everest.unige.ch:8000', {
		forwardPath: function(req, res){
			return path + String(req.url).replace(/^\//, '');
		}
	});
};

var file = function(path, type){
	return function(req, res){
		res.sendFile(__dirname + path, type ? {headers: {'Content-Type': type}} : {});
	};
}

app.use('/static/data/images/', api('/static/data/images/'));
app.use('/static', express.static('static'));

app.use('/position', api('/position'));
app.use('/element', api('/element'));
app.use('/fasta', api('/fasta'));
app.use('/bed', api('/bed'));

app.get('/', file('/index.html'));

app.listen(process.env.PORT || 80);