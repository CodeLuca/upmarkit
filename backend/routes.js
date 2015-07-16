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
};