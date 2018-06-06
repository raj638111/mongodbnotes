
const assert = require('assert');
const User = require('../src/user');

// 6_35
describe('Updating records', () => {
	let joe;
	
	beforeEach((done) => {
		joe = new User({name: 'Joe', likes: 0});
		joe.save()
			.then(() => done());
	});
	
	// 6_37 
	function assertName(operation, done){ // operation here is a Promise
		operation
			.then(() => User.find({})) // Find all the users. {} denotes no specific criteria(ie we get all the records)
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});		
	}
	
	// 6_36, 6_37
	it('Model Instance set & save', (done) => {
		joe.set('name', 'Alex'); // This only updates the memory instance not the mongo record
		assertName(joe.save(), done); // joe.save saves to mongo db
	});
	
	
	// 6_37
	it('Model Instance update', (done) => {
		// update() updates the record in mongodb which has the joe's(instance) id
		assertName(joe.update({name: 'Alex'}), done);
	});
	
	// 6_38
	it('A model class update all records with specific criteria', (done) => {
		assertName(
			// 1st arg: Search criteria
			// 2nd arg: The value we are going to set
			User.update({name: 'Joe'}, {name: 'Alex'}),
			done
		);
	});
	
	//6_38
	it('A model class can find one record with specific criteria & do the update', (done) => {
		assertName(
			User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
			done
		);
	});
	
	//6_38
	it('A model class can find one record with a specific id & do the update', (done) => {
		assertName(
			User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
			done
		);		
	});
	
	//6-39, 6-40
	//**Inefficient: When updating many records that match a specific criteria, it is inefficient
	//and error prone, if we find & load all the records into server & then we do the update
	//for each records. This can be overcome by using ***Update operators which basically
	//instructions we send directly to mongo db & the instruction act on each of the record
	//we want to update
	//Example operators: $inc, $mul etc...
	//	https://docs.mongodb.com/manual/reference/operator/update/
	it("Update likes of all records that meet specific criteria using `inc` operator", (done) => {
		// Update likes by 10
		User.update({name: 'Joe'}, {$inc: {likes: 10}})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user.likes === 10);
				done();
			});
	});
	
	
	
	
	
})