var storage = []; //END GOAL: USE MYSQL instead of this variable

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var handlePost = function(request, response) {

  var body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });

  request.on('end', function(){
    var test = JSON.parse(body);

    storage.unshift(test);
    response.writeHead(201, headers);
    response.end();
  });
};

var handleGet = function(request, response){
  var urls = "http://127.0.0.1:8080/classes/";

  // if (request.uri === urls + "messages" || request.url === urls + "room1") {
  //   console.log(request);
  //   response.writeHead(200);
  // } else {
  //   response.writeHead(404, headers);
  // }
  response.writeHead(200, headers);
  response.end(JSON.stringify(storage.slice(0)));
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