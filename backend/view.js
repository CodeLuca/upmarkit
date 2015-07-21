module.exports = function(app, db) {
	app.get('/view/:id', function(req, res) {
		db.videos.find({
			'id': req.params.id
		}, function(err, docs){
			res.render('view', {
				'data': docs[0]
			});
		});
	});
}