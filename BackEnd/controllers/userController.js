const User = require('../models/user');   //used to interact with database

// Get all users
//that handles the retrieval of user data
exports.getmydata = async (req, res) => {
  try {
    
    const mydata = await User.findAll();//method used to retrive all user data from thedatabase
    res.json(mydata);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new user
//this function is responsible for creating a new user
exports.createUser = async (req, res) => {
  const selling = req.body.selling ;
  const product = req.body.product;

  try {
    const newUser = await User.create({ selling:selling,product:product});
  //User.create:-method is used to insert a new user into the database with provided data
    res.json(newUser);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: 'Server Error' });//500 internal server error response
  }
};

// Delete a user
//This function handles the deletion of a user by their ID.
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  //req.params is an object that contains the parameters extracted from the URL of the 
  //incoming HTTP request.
//These parameters are typically used in dynamic routes where parts of the URL can change, 
//such as when you're dealing with route patterns that include placeholders.
  try {
    const user = await User.findByPk(id);
  //The User.findByPk(id) method is used to find a user by their primary key (ID) in the database.
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
//If a user is found, the destroy() method is called on the user instance to remove 
//it from the database.
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });//500 internal server error response
  }
};