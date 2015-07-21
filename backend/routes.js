module.exports = function(app, db, categories) {
	//Index file path serves index.html
	app.get('/', function(req, res){
		//Algorithm Logic.
		db.videos.find(function(err, docs){
				display(docs);
		});

		function display(docs) {
			var obj = {};
			for(i = 0; i < categories.length; i++) {
				var current = [];
				for (var o = 0; o < docs.length; o++) {
					if(docs[o].category == categories[i]) {
						current.push(docs[o]);
					}
				};
				obj[categories[i]] = current;
			}
			var l;
			if(req.session.username){
				l = 'Logout';
			} else {
				l = 'Login';
			}
			res.render('index', {
				'l': '<a href="/' + l + '" class="link"><li class="element e">' + l + '</li></a>',
				'obj': docs
			});
		}
	});

	app.get('/cat/:category', function(req, res){
		var category = req.params.category
		//Algorithm Logic.
		db.videos.find(function(err, docs){
				display(docs);
		});

		function display(docs) {
			var obj = {};
			for(i = 0; i < categories.length; i++) {
				var current = [];
				for (var o = 0; o < docs.length; o++) {
					if(docs[o].category == categories[i]) {
						current.push(docs[o]);
					}
				};
				obj[categories[i]] = current;
			}
			console.log(obj);
			var l;
			if(req.session.username){
				l = 'Logout';
			} else {
				l = 'Login';
			}
			// console.log(obj);
			res.render('index', {
				'l': '<a href="/' + l + '" class="link"><li class="element e">' + l + '</li></a>',
				'obj': obj[category],
				'docs': docs
			});
		}
	});
};