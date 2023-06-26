// User Model for Social App
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
    
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