const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
//   addFriend,
//   removeFriend,
} = require('../../controllers/userController');

// Create a User - Get all users
// route: /api/users
router.route('/').get(getUsers).post(createUser);


// Get - Delete - Update a User 
// route: /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// Add Friend & 
// Remove Friend
// route: /api/users/:userId/friends/:friendId
//router.route(':userId/friends/:friendId').post(addFriend);
//.delete(removeFriend);


module.exports = router;
