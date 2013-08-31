var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "plantlife");

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Messages = sequelize.define('Messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
Messages.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  //THIS GOES IN POST
  var newMessage = Messages.build({username: data.username, message: data.message});
  newMessage.save().success(function() {

      /* This callback function is called once saving succeeds. */

      // Retrieve objects from the database:
      //SOMETHING LIKES THIS IN GET
    Messages.findAll().success(function(res) {
      // This function is called back with an array of matches.
      //response.end(JSON.stringify(res))
    });
  });
});

obj.save
obj.create
obj.findAll
obj.find