// Creates a new user & saves it to db (Done using mocha)
const assert = require('assert');

// This basically import the 'User' class/model we have exported in the file ../src/user.js
const User = require('../src/user');

describe('Creating records', () => { // 
	it('saves a user', (done) => {
		const joe = new  User({name: 'Joe'});
		// Saves the User instance to mongo database we have initialized using the test_helper.js
		// Note: joe.save returns a Promise
		joe.save() // async
			.then(() => { 
				//isNew will be true if joe is not saved to Mongodb
				//		will be false if joe is saved to Mongodb
				assert(!joe.isNew);
				done()
			});
	});
});

// npm run test