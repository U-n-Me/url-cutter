var db = require('./DBServices');

var router = function(app){
  
  // shorts the url
  app.get('/short/:url*' ,function(req, res){
    var url = req.url.substr(7);
    if(!validURL(url))
      res.json({'err': "invalid url"});
    else{      
      var id = db.putURL(url);
      res.json({'original url': url, 'short url': 'https://'+process.env.PROJECT_DOMAIN + '.glitch.me/expand/'+id});
    }
  });
  
  // checks if given url is in db, if yes redirect to it
  app.get('/expand/:id', function(req, res){
    var url = db.getURL(req.params.id);
    if(url === '__err__')
      res.send('<h1>Requested url wasn\'t shorted using our service</h1>');
    else
      res.send(url+' : ' + req.params.id);
  });
}


function validURL(url) {
    // Checks to see if it is an actual url
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }

exports.router = router;