var mysql = require('mysql');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var dbConnection = mysql.createConnection({
  user: "root",
  password: "plantlife",
  database: "chat"
});

dbConnection.connect();

var handlePost = function(request, response) {

  var body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });

  request.on('end', function(){
    var data = JSON.parse(body);

    var query = dbConnection.query('INSERT INTO messages SET ?', {username: data.username, message: data.message}, function(err, res){
      if (err){
        console.log(err);
      }
    });

    response.writeHead(201, headers);
    response.end();
  });
};

var handleGet = function(request, response){
  var urls = "http://127.0.0.1:8080/classes/";


  var query = dbConnection.query('SELECT * FROM messages', function(err, res){
    if (err){
      console.log(err);
    }
    res.reverse();
    response.writeHead(200, headers);
    response.end(JSON.stringify(res));
  });
};


var handleRequest = function(request, response) {
  if (request.method === 'POST') {
    handlePost(request, response);
  } else if (request.method === 'GET') {
    handleGet(request, response);
  } else {
    response.writeHead(200, headers);
    response.end();
  }
};

exports.handleRequest = handleRequest;