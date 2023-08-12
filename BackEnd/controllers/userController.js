const User = require('../models/user');

// Get all users
exports.getmydata = async (req, res) => {
  try {
    const mydata = await User.findAll();
    res.json(mydata);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a user
exports.createUser = async (req, res) => {
  const selling = req.body.selling;
  const product = req.body.product;

  try {
    const newUser = await User.create({ selling:selling,product:product});
    res.json(newUser);
  } catch (error) {
    console.log("errooorr");
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};