// const request = require('request');
// const url ='https://xkcd.com/1/info.0.json';
// request({ url:url }, (error,response) => {
//     console.log(response.body); 
// });
// request('https://jsonplaceholder.typicode.com/todos/1', { json: true }, (err, res, body) => {
//   if (err) { 
//       return console.log(err); 
//   }
//   console.log(body.id);
//   console.log(body.title);
// });

const express = require('express');
const app = express();

// var bodyParser = require('body-parser');

var router = express.Router();
var request = require('request');
var url ='https://xkcd.com/1/info.0.json';
var currentData = {};
//register for view engine
app.set('view engine', 'ejs');

// parse html forms
// app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.urlencoded({ extended : true }));

//when the app loads
app.get('/', (req, res) => {
    // res.send('Welcome to XKCD Comic World !!!'); 
    //res.redirect(url);
    request({
        url: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // res.send(body); // Print the json response
            currentData = body;
            res.render('index', {data : body});
            // currentData = body;
        }
      });
    //res.render('index');
});

// when Next button is clicked
app.post('/next', function (req, res) {
    // res.send('this is next page');
    let id = currentData.num + 1;
    url = 'https://xkcd.com/'+id+'/info.0.json';
    request({
        url: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // res.send(body); // Print the json response
            currentData = body;
            res.render('index', {data : body});
            // currentData = body;
        }
      });
});
  
// when Previous button is clicked
app.post('/prev', function (req, res) {
    // console.log(req.body.todo + " is added to bottom of the list.");
    // res.redirect('/');
    let id = currentData.num - 1;
    url = 'https://xkcd.com/'+id+'/info.0.json';
    request({
        url: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // res.send(body); // Print the json response
            currentData = body;
            res.render('index', {data : body});
            // currentData = body;
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
            res.send(body); // Print the json response
            // currentData = body;
            // res.render('index', {data : body});
        }
      });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
