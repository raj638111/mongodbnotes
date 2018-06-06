
// 9_57_1_50
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', () => {
	
	let joe, blogPost, comment;
	
	beforeEach((done) => { // 9_59
		joe = new User({name: 'Joe'});
		blogPost = new BlogPost({title: 'My title', content: 'This is content'});
		comment = new Comment({content: 'Good post'});
		
		joe.blogPosts.push(blogPost); // Push is used when adding element to collection 9_59_7_0 
		blogPost.comments.push(comment);
		comment.user = joe;
		
		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});
	
	it('Saves a relation b/w a user & blogpost', (done) => { //9_60
		User.findOne({name: 'Joe'})
			.populate('blogPosts')
			.then((user) => {
				console.log("user => " + user);
				assert(user.blogPosts[0].title === 'My title');
				done();
			}); 
	});
	
	it('Saves a full relation graph (user -> blogpost -> comment -> user)', (done) => { 
		User.findOne({name: 'Joe'})
			.populate({ // populate() is a Modifier
				path: 'blogPosts',
				populate: {
					path: 'comments',  
					model: 'comment', // Nested association require Model name 9_62_4_30
					populate: {
						path: 'user',
						model: 'user'
					}
				}
			})
			.then((user) => {
				console.log("Full graph -> " + user.blogPosts[0].comments);
				assert(user.name === 'Joe');
				assert(user.blogPosts[0].title === 'My title');
				assert(user.blogPosts[0].comments[0].content === 'Good post');
				assert(user.blogPosts[0].comments[0].user.name === 'Joe');
				done();
			})
	});	
	
});