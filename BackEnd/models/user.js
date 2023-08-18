const Sequelize=require('sequelize');
const db = require("../config/database");


//This line defines a Sequelize model named "User" that corresponds 
//to the "mydata" table in the database.

const User = db.define('mydata', {
  selling: {           
    type: Sequelize.INTEGER,
    allowNull: false,    //It is marked as allowNull: false, which means it cannot be empty.
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;