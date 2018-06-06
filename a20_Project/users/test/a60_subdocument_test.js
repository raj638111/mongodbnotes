const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('Can create subdocument', (done) => {
		const joe = new User({
			name: 'Joe', 
			posts: [{title: 'PostTitle'}]
			// Note: In Mongo, it is also possible to arbitrarily add new properties with out the need to add 
			//	that property in Schema (in this case User schema). The schema do not enforce 
			//  any specific property in the Model 8-47-6-55
		
		});
		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(user.posts[0].title === 'PostTitle');
				done();
			});
	});
	
	it("Can add subdocuments to an existing record", (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [] // 8_48_05_05 specifying empty array helps someone to 
					  // understand we want this field to be empty
		});
		joe.save()
			.then(() => User.findOne({name: 'Joe'})) // when User.findOne is not enclosed in {}, 
													 // then it is implicit return statement( promise 
													 // is returned here #8_48_7_16
			.then((user) => {
				// Add an element to existing array
				user.posts.push({title: 'New Post'});
				return user.save(); //Return a promise that can be used to for chaining
			})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
				done();
			})
	}); 
	
	
	it("Can remove an existing sub document", (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{title: 'New Title'}]
		});
		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				const post = user.posts[0];
				post.remove(); // Different from removing the record (ex: user.remove()) which is a direct 
							   // database operation. This one only removes the element from the local
							   // user object. we would need to save this operation 8_49_4_53
				return user.save();
			})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			});
	})
	
	
});