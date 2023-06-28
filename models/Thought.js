const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// model to create individual documents to contain thought properties
// This model is referenced by the User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function () {
                return this._doc.createdAt.toLocaleString();
            }
        },
        username: {
            type: String,
            required: true,
        },
        // These are replies to user's thoughts
        // It is an array off nested subdocuments
        reactions: [reactionSchema],
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

// Virtual property `reactionCount` retreives the length 
// of the thoughts 'reactions' array field on query
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
