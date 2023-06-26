const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
// TODO
// updateThought,
// addReaction,
// removeReaction,

const thoughtController = {

  // Get all thoughts
  // route: /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
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
      res.json(user);
      if (!user) {
        console.log("No user found with userId on URL")
      };
      console.log(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get a single thought
  // route: /api/thoughts/:thoughtId  
  async getSingleThought(req, res) {
    try {
      const thoughtToGet = req.params.thoughtId;
      console.log(`getting thought ${thoughtToGet}`);

      const thought = await Thought.findOne({ _id: thoughtToGet });
      res.json(thought);
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
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId }, {new: true});
      if (!thought) {
        console.log("No thought id was found to remove");
      }
      res.json(thought);

    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // async getStudents(req, res) {
  //   try {
  //     const students = await Student.find();

  //     const studentObj = {
  //       students,
  //       headCount: await headCount(),
  //     };

  //     res.json(studentObj);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // },
  // // Get a single student
  // async getSingleStudent(req, res) {
  //   try {
  //     const student = await Student.findOne({ _id: req.params.studentId })
  //       .select('-__v');

  //     if (!student) {
  //       return res.status(404).json({ message: 'No student with that ID' })
  //     }

  //     res.json({
  //       student,
  //       grade: await grade(req.params.studentId),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // },
  // // create a new student
  // async createStudent(req, res) {
  //   try {
  //     const student = await Student.create(req.body);
  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // // Delete a student and remove them from the course
  // async deleteStudent(req, res) {
  //   try {
  //     const student = await Student.findOneAndRemove({ _id: req.params.studentId });

  //     if (!student) {
  //       return res.status(404).json({ message: 'No such student exists' });
  //     }

  //     const course = await Course.findOneAndUpdate(
  //       { students: req.params.studentId },
  //       { $pull: { students: req.params.studentId } },
  //       { new: true }
  //     );

  //     if (!course) {
  //       return res.status(404).json({
  //         message: 'Student deleted, but no courses found',
  //       });
  //     }

  //     res.json({ message: 'Student successfully deleted' });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // },

  // // Add an assignment to a student
  // async addAssignment(req, res) {
  //   console.log('You are adding an assignment');
  //   console.log(req.body);

  //   try {
  //     const student = await Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!student) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No student found with that ID :(' });
  //     }

  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // // Remove assignment from a student
  // async removeAssignment(req, res) {
  //   try {
  //     const student = await Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!student) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No student found with that ID :(' });
  //     }

  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

}
module.exports = thoughtController
