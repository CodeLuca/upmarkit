module.exports = function(app, db) {
	//Get request to view a video
	app.get('/view/:id', function(req, res) {
		//Get the video data.
		db.videos.find({
			'id': req.params.id
		}, function(err, docs) {
			res.render('view', {
				'data': docs[0]
			});
		});
	});
};