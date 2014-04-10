var express = require ('express');
var http = require ('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();
//route for hashtag
var hashtag = require('./routes/hashtag'); //add this in the top dependencies
//database setup
var mongoose = require ('mongoose');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/instagramexample');
//configures the template engine
app.engine ('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.bodyParser());

//routes
app.get('/', function (req, res) {
			res.render('index');
});

app.get('/hashtag', function (req,res) {
	res.render('hashtag');
})
app.post('/hashtag', hashtag.getHashtag); //add this with routes
app.post ('/save', hashtag.saveFavorites);


//set environment ports and start application
app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' +
app.get ('port'));
});