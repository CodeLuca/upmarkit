module.exports = function(app, db) {
	app.get('/addVideo', function(req, res){
		// if(!req.session.username){
		// 	res.redirect('/login');
		// 	return;
		// }
		res.render('addVideo');
	});
}