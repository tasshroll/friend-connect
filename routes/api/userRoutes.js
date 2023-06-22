const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
//   updateUser,
  deleteUser,
//   addFriend,
//   removeFriend,
} = require('../../controllers/userController');

// Get All Users & 
// Create a User
// route: /api/users
router.route('/').get(getUsers).post(createUser);


// Get Single User & 
// Delete Single User
// route: /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
//.delete(deleteUser).post(updateUser);

// Add Friend & 
// Remove Friend
// // route: /api/users/:userId/friends/:friendId
// router.route(':userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
