// User Model for Social App
const { Schema, model } = require('mongoose');
const { INTEGER } = require('sequelize');

// TODO Make seed data in Json format
// username: 'Sally Shell',
// email: 'ss@gmail.com',
// thoughts: [
//   { 
//     _id : 3,
//   }
// ],
// friends: [{ 2 }]

// var validateEmail = function (email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
//};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            // TODO trimmed, ???
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // must match a valid email address
            match: [/.+@.+\..+/, 'needs to be in email format']

        },
        thoughts: [
            // ###### TODO  FIX this reference: Array of _id values referencing the THOUGHT model
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // array of _id values referencing the USER model (self reference)     
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

    },
    {
        toJSON: {
            getters: true,
            // Virtuals will be included with our response, overriding the default behavior
            virtuals: true,
        },
        id: false,
    }
);

// TODO Fix this virtual
// Create a virtual property `friendCount` that tracks the # of friends per user
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    })
 


// TODO Need help getting this right

// Initialize our User model
const User = model('User', userSchema);
module.exports = User;