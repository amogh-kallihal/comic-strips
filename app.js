const express = require('express');
const app = express();

//register for view engine
app.set('view engine', 'ejs');
//set the public folder where css files are present
app.use(express.static(__dirname + '/public'));
// parse html forms
app.use(express.urlencoded({ extended : true }));

var router = express.Router();
var request = require('request');
var url ='https://xkcd.com/1/info.0.json';
var currentData = {};
var prev, next;

//when the app loads
app.get('/', (req, res) => {
    request({
        url: url,
        json: true
      }, function (error, response, body) {
            var contentType = response.headers['content-type'];
            if (!error && response.statusCode === 200) {
                // res.send(body); // Print the json response
                currentData = body;
                if (body.num === 1){
                        prev = true;
                }
                else {
                    prev = false;
                }
                if (body.num === 2327){
                    next = true;
                }
                else {
                    next = false;
                }
                res.render('index', {data : body, prev : prev, next: next});
            }
      });
});

// when Next button is clicked
app.get('/next', function (req, res) {
    let id = currentData.num + 1;
    url = 'https://xkcd.com/'+id+'/info.0.json';
    request({
        url: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            currentData = body;
            if (body.num === 1 ){
                prev = true;
           }
           else {
               prev = false;
           }
           if (body.num === 2327){
            next = true;
            }
            else {
                next = false;
            }
        //    res.send(currentData);
            res.render('index', {data : body, prev: prev, next: next});
        }
        var disable;
      });
});
  
// when Previous button is clicked
app.get('/prev', function (req, res) {
    let id = currentData.num - 1;
    url = 'https://xkcd.com/'+id+'/info.0.json';
    request({
        url: url,
        json: true
      }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (body.num === 1){
                    prev = true;
               }
               else {
                   prev = false;
               }
               if (body.num === 2327){
                next = true;
                }
                else {
                    next = false;
                }
                res.render('index', {data : body, prev: prev, next: next});
                currentData = body;
            }
            if (error) {
                console.log('error');
                res.send(body);
            } 
      });
});

// when random is passed in the browser url
app.get('/ran', (req, res)=>{
    // res.send(req.params.id);
    var num = Math.floor(Math.random() * (2327 - 1 + 1)) + 1;
    url = 'https://xkcd.com/'+num+'/info.0.json';
    request({
        url: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // res.send(body); // Print the json response
            currentData = body;
            if (currentData.num === 1){
                prev = true;
           }
           else {
               prev = false;
           }
           if (body.num === 2327){
            next = true;
            }
            else {
                next = false;
            }
            res.render('index', {data : body, prev: prev, next: next});
        }
      });
});

//when id is passed in the browser url
app.get('/:id', (req, res)=>{
    // res.send(req.params.id);
    url = 'https://xkcd.com/'+req.params.id+'/info.0.json';
    request({
        url: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // res.send(body); // Print the json response
            currentData = body;
            if (body.num === 1){
                prev = true;
           }
           else {
               prev = false;
           }
           if (body.num === 2327){
            next = true;
            }
            else {
                next = false;
            }
            res.render('index', {data : body, prev: prev, next: next});
        }
      });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
