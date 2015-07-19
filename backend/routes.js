module.exports = function(app, db) {
	//Index file path serves index.html
	app.get('/', function(req, res){
		if(req.session.username){
			res.render('index', {'l': '<a href="/logout" class="link"><li class="element e">Logout</li></a>'});
		} else {
			res.render('index', {'l': '<a href="/login" class="link"><li class="element e">Login</li></a>'});
		}
	});
};