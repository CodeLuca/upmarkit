module.exports = function(app, db) {
  //Add Video Get request
  app.get('/addVideo', function(req, res) {
    //Check they are logged in
    if (!req.session.username) {
      res.redirect('/login');
      return;
    }
    //Render addVideo page.
    res.render('addVideo');
  });
  //AddVideo Post Request.
  app.post('/addVideo', function(req, res) {
    console.log(req.data);
    console.log(req.body);
    console.log(req);
    //Check logged in
    if (!req.session.username) {
      res.redirect('/login');
      return;
    }
    //Check if video exists
    db.videos.find({
      'id': req.body.id
    }, function(err, body) {
      //Check if the ID exists
      if (body[0]) {
        res.send('Video already exists');
        return;
      } else {
        addToDB();
      }
    });

    function addToDB() {
      //Get today's date.
      var d = new Date();
      var n = d.toDateString();

      //Create object for the db.
      var obj = {
        'title': req.body.title,
        'category': req.body.category,
        'id': req.body.id,
        'ratings': [],
        'average': 0,
        'uploadDate': n,
        'user': req.session.username,
        'link': req.body.link,
      }
      console.log(obj);
      //Redirect them to home
      res.send('200');
      //Add to db
      db.videos.insert(obj);
    }
  });
}