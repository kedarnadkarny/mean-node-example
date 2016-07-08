var express 		 = require('express'),
	app				 = express();
	bodyParser		 = require('body-parser');
	mongoose		 = require('mongoose');
	meetupsControler = require('./server/controllers/meetups-controller');
	loginControler = require('./server/controllers/server.loginController');

    var jwt = require('express-jwt');

mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser());

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});

app.get('/login', function (req, res) {
	res.sendFile(__dirname + '/client/views/login.html');
});

app.get('/navbar', function (req, res) {
    res.sendFile(__dirname + '/client/views/navbar.html');
});

app.use('/assets/css', express.static(__dirname + '/assets/css'));
app.use('/assets/js', express.static(__dirname + '/assets/js'));
app.use('/js', express.static(__dirname + '/client/js'));

var secret = {
    secretToken: "SECRET"
};

//REST API
app.get('/api/meetups', meetupsControler.list);
app.post('/api/meetups', meetupsControler.create, jwt({secret: secret.secretToken}));
app.post('/api/meetups/:id', meetupsControler.delete);
app.get('/api/meetups/:id', meetupsControler.getOne);
app.post('/api/meetups/update/:name/:id', meetupsControler.update);

/** Login API **/
app.post('/api/login/:email/:password', loginControler.login, jwt({secret: secret.secretToken}));
app.post('/api/delete/:id', loginControler.logout);


app.listen(3000, function() {
	console.log("I'm Listening...");
});