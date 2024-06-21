// BUILD YOUR SERVER HERE
const express = require('express');
const User = require("./users/model");

// const { getId } = require('./users/model')

const server = express();

// let users = initializeUsers();

server.use(express.json());

// let id = 0;
// let getId = () => ++id;

server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `Error fetching users: ${err.message}`});
  }
});

server.post('/api/users', async (req, res) => {
 try {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ message: "provide name and bio"});
  } 
    const newUser = await User.insert({ name, bio });
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Error creating user: ${err.message}`});
  }
});


server.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "does not exist" });
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json({
      message: `Error fetching user ${req.params.id} : ${err.message}`,
    });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.remove(id);

    if (!deletedUser) {
      res.status(404).json({ message: "does not exist"});
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ message: `Error deleting user: ${err.message}`});
  }
})

server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { name, bio } = req.body;

    if (!name || !bio) {
      return res.status(400).json({ message: "provide name and bio" });
    } 
      const updatedUser = await User.update(id, { name, bio });

      if (!updatedUser) {
        return res.status(404).json({message: "user does not exist"})
      } 
      res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({message: `Error updating user ${err.message}`});
  }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
