const { User } = require('../models')

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
            const users = await User.find();

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
    }
}


module.exports = userController