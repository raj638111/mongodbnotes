
const assert = require('assert');
const User = require('../src/user');

// 7-41, 7-42
describe('Validating records', () => {
	
	//7-42
	it('Requires a user name', () => {
		const user = new User({name: undefined}); //** undefined is a good way to specify nothing
		// Result will validation result of all different properties that went wrong
		// validateSync(): is different from validate() in that validate() is asynchronous &
		//	validateSync() is synchronous
		const validationResult = user.validateSync();
		// This statement  can also be written in ES6 like (which reduce the verbose little bit)
		//	const {message} = validationResult.error.name
		const message = validationResult.errors.name.message;
		assert(message === 'Name is required.')
	});
	
	//7-43
	it('Requires a user name longer than 2 characters', () => {
		const user = new User({name: 'Al'});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert(message === 'Name must be longer than 2 characters.')
	})
	
	//7-44
	it('Disallows invalid record from being saved/inserted', (done) => {
		const user = new User({name: 'Al'});
		user.save()
			//Note: catch() is used to catch failures 
			.catch(validationResult => {
				const {message} = validationResult.errors.name;
				assert(message === 'Name must be longer than 2 characters.');
				done();
			});
	});
	
});