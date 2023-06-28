// Functions used to interact with the User model.
// These functions: Create a user, Get all users, get single user by ID, Delete a user, update a user,
// Add a friend, remove a friend
//const { User, Thought } = require('../models')
const { User } = require('../models');


const userController = {
    // Create a User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get All Users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate("thoughts");
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get single User by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a User
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update a User
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with this id" });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Add a Friend
    // route ':userId/friends/:friendId'
    async addFriend (req, res) {
        try {
            const singleUser = req.params.userId;
            const idToAdd = req.params.friendId;
            const user = await User.findOneAndUpdate(
                { _id: singleUser },
                { $push: {friends: idToAdd}},
                { new : true}   
            );
            if (!user) {
              res.status(404).json({ message: "No user found with this id"})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Remove a Friend
    // route ':userId/friends/:friendId'
        async removeFriend (req, res) {
        try {
            const singleUser = req.params.userId;
            const idToRemove = req.params.friendId;
            const user = await User.findOneAndUpdate(
                { _id: singleUser },
                { $pull: {friends: idToRemove}},
                { new : true}   
            );
            if (!user) {
              res.status(404).json({ message: "No user found with this id"})
            }
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = userController
