//set up var equal to functions
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var calcResult = require('./calculator'); //get calculator module
var sum = '';

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.listen(3000, function(){
  console.log("on port running: ", 3000);
});

//base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  // send back index.html as response
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

//receive data, use in calc module
app.post('/dataToCalc', function (req, res){
  console.log('in post calc route');
  
  setTimeout(function(){ //setting timer to delay calculation results on dom
  sum = calcResult(req.body.x,req.body.y,req.body.type);
  console.log(sum);
  res.sendStatus(200);
  }, 3000);
});

//respond to client get request
app.get('/results', function (req, res){
  console.log ('/results hit');
//calcResults (calc total) send to /sum
  var responseObj = ({
    totalSum: sum
  });
  res.send(responseObj); //send responseObj to /results
  console.log(responseObj);
});
