CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int(3) NOT NULL AUTO_INCREMENT,
  username varchar(20),
  time timestamp,
  message text(400),
  PRIMARY KEY (id)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
