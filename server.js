//set up var equal to functions
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
//get a module by using require()
var calcResult = require('./calculator');
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
  // all the work
  sum = calcResult(req.body.x,req.body.y, req.body.type);
  // console.log(calcResult(req.body.x,req.body.y, req.body.type));
  console.log(sum);
  res.sendStatus(200);
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
