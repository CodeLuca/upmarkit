module.exports = function(app, db) {
//Get request to vote
	app.get('/vote/:id/:number', function(req, res) {
		//Check if logged in
		if(!req.session.username) {
			//If not tell them.
			res.send('Please login in order to vote.');
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
			var current;
			//Get the current vote list
			db.users.find({
				'username': req.session.username
			}, function(err, docs) {
				current = docs[0];
				// Find the object containing the video's id.
				current.votes.forEach(function(item){
					//Check that's the one.
					if(item.id == req.params.id) {
						item.amount = req.params.number
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
			});
		}

		function addToArray() {
			//Adding to Users votes array
			db.users.update({
				"username": req.session.username
			}, {
				$push: {
					"votes": {
						"id": req.params.id,
						"amount": req.params.number
					}
				}
			});
			//Add to video's Votes array.
			db.videos.update({
				"id": req.params.id
			}, {
				$push: {
					"ratings": req.params.number
				}
			})
		}
	});
}