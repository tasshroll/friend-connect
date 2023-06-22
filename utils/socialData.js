// socialData.js contains values for names, thoughts, and emails
// that are randomly used to seed our database

const names = [
    'Aaran Champ',
    'Sally Snell',
    'Amy Johnson',
    'Liz Arnold',
    'Ada Mitchell',
    'Justin Thompson',
    'James Holmes',
    'April Rue',
    'Arian Rue',
    'Anddrew Reich',
    'Haisley Jones',
    'Efua Abrahms',
    'Sam Peets',
    'Davey Jones',
    'Ralph Waldo Emmerson',
    'Louis Stevenson',
    'Lisa Brown',
    'Kristen Shell',
    'Lindsay Townsen',
    'Paula Kross',
];

const thoughts = [
    'Decision Trackers are awesome',
    'Find My Phone is a useful app',
    'Learn Piano is not very good for learning Piano',
    'Starbase Defender is a great game, I love it',
    'Tower Defense is okay',
    'Monopoly Money is better than real money IMO',
    'Movie trailers are just the best parts of a movie distilled into 90 seconds',
    'Hello world, this is a comment',
    'Social media is a big waste of time',
    'Notes is my most used app',
    'Messages is open on my computer 24/7',
    'Email is open on my computer',
    'Compass is never opened',
    'Firefox is great for privacy',
    'I like to watch Netflix',
    'Denver is a great city to visit',
    'Mac has terrific Mac and Cheese',
    'Temps will reach above 100 this weekend',
    'Labs make great dogs',
    'Mt Evans is a great mountain to hike',
];

const reactions = [
    'Agree',
    'Like',
    'Spot On',
    'Truth',
    'I\'m not sure about this',
    'Alright!',
];

const emails = [
    'aa@gmail.com',
    'bb@gmail.com',
    'cc@gmail.com',
    'dd@gmail.com',
    'ee@gmail.com',
    'ff@gmail.com',
    'gg@gmail.com',
    'hh@gmail.com',
    'ii@gmail.com',
    'jj@gmail.com',
    'kk@gmail.com',
    'll@gmail.com',
    'mm@gmail.com',
    'nn@gmail.com',
    'oo@gmail.com',
    'pp@gmail.com',
    'qq@gmail.com',
    'rr@gmail.com',
    'tt@gmail.com',
];

// not used
const lorum = [
    'lorem',
    'imsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'curabitur',
    'vel',
    'hendrerit',
    'libero',
    'eleifend',
    'blandit',
    'nunc',
    'ornare',
    'odio',
    'ut',
    'orci',
    'gravida',
    'imperdiet',
    'nullam',
    'purus',
    'lacinia',
    'a',
    'pretium',
    'quis',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random name
const getRandomName = () =>
    `${getRandomArrItem(names)}`;

// Get random reactions
const getRandomReactions = (int) => {
    result = [];
    for (let i=0; i<int; i++) {
        result.push (
            getRandomArrItem(reactions)  
        )
    }
    return result;
}

// Gets a random email
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// Creates a thought object with a user's name, an array of (int) thoughts, and an array of 2 reactions
const getRandomThoughts = (nameStr, int) => {
    const results = [];
    for (let i=0; i <int ; i++) {
        results.push({
            thoughtText : getRandomArrItem(thoughts),
            userName: nameStr,
            reactions: getRandomReactions(2),
        })
    }
    return results;
};


// Export the functions for use in seed.js
module.exports = {
    getRandomName,
    getRandomThoughts,
    getRandomEmail,
}; 

