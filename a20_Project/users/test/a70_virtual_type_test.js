
const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
	
	it('Post count return number of posts', (done) => { // 8_50
		const joe = new User({
			name: 'Joe',
			posts: [{title: 'PostTitle'}]
		});
		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(joe.postCount === 1);
				done();
			});
		
	});
	
});