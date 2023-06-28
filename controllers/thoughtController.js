const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


const thoughtController = {

  // Get all thoughts
  // route: /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create a thought
  // route: /api/thoughts
  async createThought(req, res) {
    try {
      console.log("Creating Thought");
      const thought = await Thought.create(req.body);
      if (!thought) {
        console.log("Could not create thought in DB")
      }
      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought } },
      );
      return res.json(user);
      if (!user) {
        console.log("No user found with userId on URL")
      };
      console.log(user);
    } catch (err) {
      console.log(err);
      
      return res.status(500).json(err);
    }
  },
  // update thought
  // route: api/routes/:thoughtId
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!thought) {
        console.log("thought id not found");
      }
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single thought
  // route: /api/thoughts/:thoughtId  
  async getSingleThought(req, res) {
    try {
      const thoughtToGet = req.params.thoughtId;
      console.log(`getting thought ${thoughtToGet}`);

      const thought = await Thought.findOne({ _id: thoughtToGet });
      return res.json(thought);
      if (!thought) {
        console.log("That thought id was not found")
      };
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // delete a thought
  // route /api/thoughts/:thoughtId
  async removeThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId }, { new: true });
      if (!thought) {
        console.log("No thought id was found to remove");
      }
      return res.json(thought);

    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // add Reaction
  // route: api/thoughts/:thoughtId/reactions
  async addReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;

      const thought = await Thought.findOne({ _id: thoughtId });
      console.log(thought);
      if (!thought) {
        res.status(404).json({ message: "Thought id not found"});
      };
      const reaction = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true },
      )
      return res.json(reaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  },


  // remove reaction
  // route: api/thoughts/:thoughtId/reactions/:reactionId
  async removeReaction(req, res) {
    try {
      console.log("Removivng");
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        {new: true}
      )

      if (!reaction) {
        res.status(404).json({ message: 'Thought ID not found'});
      };

      return res.json(reaction);

    } catch (err) {
      return res.status(500).json(err);
    }
  }

}
module.exports = thoughtController
