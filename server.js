
var express = require('express'),
	proxy = require('express-http-proxy'),
	app = express();

var file = function(path, type){
	return function(req, res){
		res.sendFile(__dirname + path, type ? {headers: {'Content-Type': type}} : {});
	};
}

app.use('/static', express.static('static'));
app.get('/', file('/index.html'));

app.listen(process.env.PORT || 80);