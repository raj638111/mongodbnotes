
const assert = require('assert');
const User = require('../src/user')

describe('Reading users out of the database', () => {
	let joe;
	
	beforeEach((done) => {
		// Note: A new user like here is automatically assigned an ID property by mongoose #6_29
		// So believe mongoose is confident it is able to create a unique ID for the record in collection
		joe = new User({name: 'Joe'})
		joe.save()
			.then(() => {
				console.log("New record inserted")
				done()
			});
	});
	
	it('finds all users with the name of joe', (done) => { // 6_28, 6_29 
		User.find({name: 'Joe'})
			.then((users) => {
				console.log("Users -> " + users);
				console.log("User -> " + users[0]._id)
				console.log("Joe -> " + joe._id)
				// This does not work as in _id is encapsulated with ObjectId and
				// so not a string
				//assert(users[0]._id === joe._id); // 6_29
				assert(users[0]._id.toString === joe._id.toString);
				done();
			});
	}); 
	
	it('find a user with a particular id', (done) => { // 6_31
		User.findOne({_id: joe._id})
			.then((user) => {
				assert(user.name == 'Joe');
				done();
			});
	});
});

// npm run test