// User Model for Social App using Mongoose
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // must match a valid email address
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "needs to be a valid email",
            ],
        },  
        // reference to Thought model that contains user's thoughts    
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // array of user's friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            // Getter & Virtual functions are included with the response
            // when the User document is converted to JSON  
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// `friendCount` is a virtual property that tracks the # of friends per user
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    })

// Initialize the User model
const User = model('User', userSchema);
module.exports = User;