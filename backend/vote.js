module.exports = function(app, db) {
//Get Number of Stars
	app.get('/getStars/:id', function(req, res){
		if(!req.session.username) {
			res.send("0");
			return;
		}
		db.users.find({
			'username': req.session.username
		}, function(err, docs) {
			docs[0].votes.forEach(function(item) {
				if(item.id == req.params.id) {
					res.send(item.amount);
				}
			});
		});
	});
//Get request to vote
	app.get('/vote/:id/:number', function(req, res) {
		//Check if logged in
		if(!req.session.username) {
			//If not tell them.
			res.send('redirect');
			return;
		}
		//Check if they have already voted for this before.
		db.users.find({
			"username": req.session.username,
			'votes': {
				$elemMatch: {
					'id': req.params.id
				}
			}
		}, function(err, docs){
			if(!docs[0]) {
				console.log('!')
				//If not add to the User's Votes array
				//And also add to the Video's Votes array
				addToArray();
			} else {
				//If the person wants to re-vote.
				correct();
			}
		});

		function correct() {
			var current, old;
			//Get the current vote list
			db.users.find({
				'username': req.session.username
			}, function(err, docs) {
				current = docs[0];
				// Find the object containing the video's id.
				current.votes.forEach(function(item){
					//Check that's the one.
					if(item.id == req.params.id) {
						old = item.amount;
						item.amount = req.params.number;
					}
	 			});
	 			//Add that back to their object.
	 			//TODO: make this more efficient with just Mongo queries.
	 			db.users.update({
	 				'username': req.session.username
	 			}, {
	 				$set: {
	 					'votes': current['votes']
	 				}
	 			});
	 			var newArray = [];
	 			//Find the videos
	 			db.videos.find({
	 				'id': req.params.id
	 			}, function(err, docs) {
	 				for(var i = 0; i < docs[0].ratings.length; i++) {
	 					if(docs[0].ratings[i].user == req.session.username) {
	 						docs[0].ratings[i].amount = req.params.number;
	 						newArray = docs[0].ratings;
	 					}
	 				}
	 				set();
	 			});

	 			function set(){
		 			db.videos.update({
		 				'id': req.params.id
		 			}, {
		 				$set: {
		 					'ratings': newArray
		 				}
		 			}, function(err, docs) {
						update();
		 			});
	 			}
			});
		}

		function addToArray() {
			var obj = {
						"id": req.params.id,
						"amount": req.params.number
					}
			//Adding to Users votes array
			db.users.update({
				"username": req.session.username
			}, {
				$push: {
					"votes": obj
				}
			});
			//Add to video's Votes array.
			db.videos.update({
				"id": req.params.id
			}, {
				$push: {
					"ratings": {
						'user': req.session.username,
						'amount': req.params.number
					}
				}
			}, function(err, docs) {
				update();
			});
		}

		function update() {
		//Update average.
		db.videos.find({
			'id': req.params.id
		}, function(err, docs) {
			var count = 0;
			docs[0].ratings.forEach(function(data) {
				count = count + Number(data.amount);
			});
			console.log('count: ' + count)
			console.log('length: ' + docs[0].ratings.length);
			var average = (count / docs[0].ratings.length);
			db.videos.update({
				'id': req.params.id
			}, {
				$set: {
					'average': average
				}
			}, function(err, data) {
				// res.send();	
			});
		});
		}
	});
}