var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(function(req, res, next) {
  console.log('Request!');
  next();
});

var comments = [
  {"author": "Pete Hunt", "text": "This is one comment"},
  {"author": "Jordan Walk", "text": "This is *another* comment"}
];

app.get('/comments.json', function(request, response) {
  response.json(comments);
});

app.post('/comments.json', bodyParser.json(), function(request, response) {
  var newComment = request.body;
  comments.push(newComment);
  response.sendStatus(201);
});

app.listen(8080, function() {
  console.log('Listening');
});
