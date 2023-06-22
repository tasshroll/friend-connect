const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            // array of nested documents created with the reactionsSchema
            reactions: [reactionSchema],
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);


// Create a virtual property `reactionCount` that retreives the length 
// of the thoughts 'reactions' array field on query
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        //TODO will this return array length?
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
