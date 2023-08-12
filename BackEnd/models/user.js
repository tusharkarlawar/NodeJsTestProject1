const Sequelize=require('sequelize');
const db = require("../config/database");

const User = db.define('mydata', {
    selling: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;