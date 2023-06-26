const { User, Thought } = require('../models')

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
                res.status(404).json({ message: "No user found with this id" });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //router.route(':userId/friends/:friendId').post(addFriend);
    //127.0.0.1:3001/api/users/64948a3008bfc8674bbc013a/friends/64948a4008bfc8674bbc013c
    async addFriend (req, res) {
        try {
            const singleUser = req.params.userId;
            const idToAdd = req.params.friendId;
            console.log(`updating friend id ${idToAdd} for user ${singleUser}`);
            const user = await User.findOneAndUpdate(
                { _id: singleUser },
                { $push: {friends: idToAdd}},
                { new : true}   
            );
            console.log ("FRIEND UPDATED");
            if (!user) {
              res.status(404).json({ message: "No user found with this id"})
            }
            //console.log (res );
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //router.route(':userId/friends/:friendId').post(addFriend);
    async removeFriend (req, res) {
        try {
            console.log ("Remove friend");

            const singleUser = req.params.userId;
            const idToRemove = req.params.friendId;
            console.log(`removing friend id ${idToRemove} for user ${singleUser}`);
            const user = await User.findOneAndUpdate(
                { _id: singleUser },
                { $pull: {friends: idToRemove}},
                { new : true}   
            );
            console.log ("Friend REMOVED");
            if (!user) {
              res.status(404).json({ message: "No user found with this id"})
            }
            //console.log (res );
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = userController
