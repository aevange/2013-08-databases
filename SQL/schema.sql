CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int(5), username varchar(20), time timestamp, message text(400)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
