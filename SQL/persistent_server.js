var mysql = require('mysql');
var http = require("http");
var requestHandler = require("../chat_server_and_client/request-handler.js");
var ip = "127.0.0.1";
var port = 8080;
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




var server = http.createServer(requestHandler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
//dbConnection.end();


//WE KNOW:

//database is set up.
//chat client/server is hooked up and available for testing.

//1. once we think the database is hooked up - test it.