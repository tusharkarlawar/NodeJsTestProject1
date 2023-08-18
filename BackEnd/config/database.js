const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce_table', 'root', 'Tushar@9921', {
  host: 'localhost',
  dialect: 'mysql',     //The dialect property defines the type of 
                        //database being used. In this case, 'mysql' is used as the value.
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


testConnection();

module.exports=sequelize;