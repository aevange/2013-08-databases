/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var storage = [];

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var handlePost = function(request, response) {
  var body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });

  request.on('end', function(){
    var test = JSON.parse(body);
    storage.unshift(test);
    response.writeHead(201);
    response.end();
  });
};

var handleGet = function(request, response){
  var urls = "http://127.0.0.1:8080/classes/";

  if (request.uri === urls + "messages" || request.url === urls + "room1") {
    console.log(request);
    response.writeHead(200);
  } else {
    response.writeHead(404);
  }
  response.end(JSON.stringify(storage.slice(0)));
};


var handleRequest = function(request, response) {
  var statusCode = 404;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);

  if (request.method === 'POST') {
    handlePost(request, response);
  } else if (request.method === 'GET') {
    handleGet(request, response);
  } else {
    response.end();
  }
};

exports.handleRequest = handleRequest;