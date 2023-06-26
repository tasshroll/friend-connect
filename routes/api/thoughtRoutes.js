const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  // updateThought,
  removeThought,
  // addReaction,
  // removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(removeThought);
//.put(updateThought);

// /api/thoughts/:thoughtId/reactions
//router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
