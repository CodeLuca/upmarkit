module.exports = function(app, db) {
	//Home get request.
	app.get('/home', function(req, res){
		//Check if they have logged in.
		if(!req.session.username){
			res.redirect('/login');
			return;
		}
		res.render('home', {
			'user': req.session.username
		});
	});
	//Index file path serves index.html
	app.get('/', function(req, res){
		if(req.session.username){
			res.render('index', {'l': '<a href="/logout" class="link"><li class="element e">Logout</li></a>'});
		} else {
			res.render('index', {'l': '<a href="/login" class="link"><li class="element e">Login</li></a>'});
		}
	});
};