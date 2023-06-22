const connection = require('../config/connection');

// Import collection documents and JS files to interact with them
const { Thought, User } = require('../models');
const { getRandomName, getRandomEmail, getRandomThoughts } = require('./socialData');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users')
  }

  // Create empty array to hold the users
  var users = [];

  // Loop 20 times -- add people to the users array
  for (let i = 0; i < 20; i++) {

    // Get a random name, email and 3 random thoughts
    const userName = getRandomName();
    const email = getRandomEmail();
    const thoughts = getRandomThoughts(fullName, 3);

    users.push({
      userName,
      email,
      thoughts,
      // friends, // how to do this??? Its an array of ids referencing the user model.
    });

  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // get the _id mongoose creates for each user and store in array
  const idList = await User.collection.find(_id);

  // add 3 random friends - by id - for each user 
  // ensure that user isn't friends with themself
  for (let i = 0; i < users.length; i++) {
    let results = [];

    for (let i = 0; i < 3; i++) {
      friendId = getRandomArr(idList)
      if (friendId != users._id) {
        results.push(friendId);
      }
    }
    // add the friend results array to the current user
    await User.collection.insertOne(
      {friends: results,}
    )
  }

  // Log out the seed data to indicate what should appear in the database
  // wont show friends
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
