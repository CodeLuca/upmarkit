module.exports = function(app, db) {
	//Index file path serves index.html
	app.get('/', function(req, res){
		//Algorithm Logic.
		db.videos.find(function(err, docs){
			display(docs)
		});

		function display(docs) {
			var l;
			if(req.session.username){
				l = 'Logout';
			} else {
				l = 'Login';
			}
				res.render('index', {
					'l': '<a href="/' + l + '" class="link"><li class="element e">' + l + '</li></a>',
					'videos': docs
				});
		}
	});
};