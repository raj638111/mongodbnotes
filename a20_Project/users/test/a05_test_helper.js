// require is similar to import. Here we are including the mongoose package #6-16
// and assigning it to the variable name `mongoose`
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Use the ES6 promise implmentation. others are q, bluebird #6_26

// before is called by Mocha only once before running a test suite #6_26
// There is no need to create database `users_test` beforehand. When
// connection is established & we try to save a record, new database will
// be created by mongoose+mongodb #6-16
// Note: This is an async call
before((done) => {
	console.log("Creating database connection (async)")
	mongoose.connect('mongodb://localhost/users_test');
	// Register call backs
	mongoose.connection
		// Watch for an event called `open` one time
		.once('open', () => { 
			console.log('DB connection created successfully. Good to go');
			done();
		})
		// `error` is another event
		.on('error', (error) => {
			console.warn('Warning', error);
		})
	console.log("after connect async call");	
})



// This callback will be called before each test is executed in a test suite #6_23
// Note: This method is part of mocha
beforeEach((done) => {
	// Note: drop is an async operation. so we would need to wait in the test case
	// 	for the the drop to complete. or else we will have race condition #6_24
	//  ?? : Our collection name is 'user' ; but we are using users.drop. why? 
	/*mongoose.connection.collections.users.drop(() => {
		// This callback gets executed only after all the records are successfully dropped from
		// users collection
		console.log('All the records have been deleted successfully')
		// By returning done we are making sure the async call to drop the records from the
		// collection is complete before we execute the test case
		done();
	}); */
	// 9_58 Note: This is sequential & is going to take some time (Can be refactored by using loop)
	// ** Note: Mongoose converts all upper case into lower case. so `blogPosts` should be `blogposts` 9_59_1_00
	const {users, blogposts, comments} = mongoose.connection.collections;
	users.drop(() => {
		blogposts.drop(() => {
			comments.drop(() => {
				done();
			});
		});
	});
	
	
});
