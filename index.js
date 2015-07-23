//Require Express.js
var express = require('express'),
app = express();

//Require Body-Parser
var bodyParser = require('body-parser');

//Require Express Sessions
var session = require('express-session')

//Require Express Handlebars
var expressHbs = require('express-handlebars');

//Require everything MongoDB Related.
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/upmarkit', ['users', 'videos']);

//Enable Handlebars & set default layout
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

//Setup budyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Categories
var categories = [
	'Autos and Vehicles',
	'Comedy',
	'Education',
	'Gaming',
	'Howto & Style',
	'Music',
	'News & Politics',
	'Nonprofits & Activism',
	'Pets & Animals',
	'Science & Technology',
	'Sports',
	'Travel & Events',
	'Film & Animation'
]

//Enable Express-Sessions with this secret to encrypt:
app.use(session({secret: '871238971AIHLJS'}));

//Serve all files in the FrontEnd Directory.
app.use(express.static(__dirname + '/views'));

//Require all of the Node files needed:
require('./backend/users')(app, db);
require('./backend/creation')(app, db);
require('./backend/view')(app, db);
require('./backend/routes')(app, db, categories);
require('./backend/vote')(app, db);

//Start the server up!
var port = 3000;
app.listen(port);
console.log('Listening on port: ' + port);