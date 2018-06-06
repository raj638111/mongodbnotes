
const assert = require('assert');
const User = require('../src/user');

// 6_32
describe('Deleting a User', () => {
	let joe;
	
	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	});
	
	// 6_32
	it('model instance remove', (done) => {
		joe.remove()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
		});
		
	});
	
	// 6_33
	it('class method remove', (done) => {
		// Remove a ***bunch of records with some given criteria
		User.remove({name: 'Joe'})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
		});		
	});
	
	
	// 6_34
	it('class method findOneAndRemove', (done) => {
		// Find a specific record by some criteria & remove it
		User.findOneAndRemove({name: 'Joe'})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
		});				
	});
	
	
	// 6_35
	it('class method findByIdAndRemove', (done) => {
		// Find a specific record by Id & remove it
		User.findByIdAndRemove(joe._id)
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
		});				
	});	
	
}); 