module.exports = function(app, db) {
	//Login get request
	app.get('/login', function(req, res){
		//If logged in get them to home.
		if(req.session.username){
			res.redirect('/home');
			return;
		}
		//Render login
		res.render('login')
	});

	//Logout.
	app.get('/logout', function(req, res){
	    delete req.session.username;
	    res.redirect('/login');
	});

	//Register post request
	app.post('/register', function(req, res){
		//Check if user exist
		db.users.find({
			'username': req.body.username
		}, function(err, docs){
			if(docs[0]){
				res.render('login', {'err': 'User already exists.'})
			} else {
				//If not continue
				cont();
			}
		});

		function cont(){
			//Make an object for their user.
			var obj = {
				'username': req.body.username,
				'password': req.body.password,
				'votes': [],
				'videos': []
			}
			db.users.insert(obj, function(err){
				//Tell them to login.
			    res.render('login', {err: 'You were registered successfully! Please login.'})
			});
		};
	});

	//Login post request
	app.post('/login', function(req, res){
		if(req.session.username){
			res.redirect('/home');
		}
		var user = req.body.username;
		var pass = req.body.password;
		//Find if they exist
		db.users.find({
			'username': user,
			'password': pass
		}, function(err, docs){
			if(err != null) {
				console.log(err); 
				return;
			}
			//If not tell them they got something wrong.
			if(!docs[0]){
				res.render('login', {'err': 'Incorrect Username or Password'}); return;
			} else {
				//Otherwise redirect them to their home.
				req.session.username = user;
				res.redirect('/');
			}
		});
	});
};