
const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', () => {
	
	let joe, blogPost;
	
	beforeEach((done) => { // 10_66_1_40
		joe = new User({name: 'Joe'});
		blogPost = new BlogPost({title: 'My title', content: 'This is content'});
		
		joe.blogPosts.push(blogPost); // Push is used when adding element to collection 9_59_7_0 
		
		Promise.all([joe.save(), blogPost.save()])
			.then(() => done());
	});
	
	it('user cleanup dangling blogPost on remove', (done) => { // 10_66_3_0
		joe.remove()
			.then(() => BlogPost.count()) // Get count from BlogPost collection 
			.then((count) => {
				assert(count === 0);
				done();
			});
	});
	
});

