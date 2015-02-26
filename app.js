var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/comments.json', function(request, response) {
  var comments = [
    {"author": "Pete Hunt", "text": "This is one comment"},
    {"author": "Jordan Walke", "text": "This is *another* comment"}
  ];

  response.json(comments);
});


app.listen(8080, function() {
  console.log('Listening');
});
