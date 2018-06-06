const mongoose = require('mongoose'); // #6-18
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
	name: { // 7-42
		type: String,
		validate: { // 7-43
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [true, 'Name is required.'] // 7-42
	},
	//postCount: Number, //6-39 -- Commented on 8_51 in order to make this field as virtual type
	//List of posts
	//8-45,8-46 Note: A schema/resource that is added/embedded to an existing schema/model is called as subdocument in mongoose
	//	In this case PostSchema is a subdocument
	//	Here we can say 'User' model is a document & PostSchema as subdocument	
	posts: [PostSchema],
	likes: Number, // 8_53
	blogPosts: [{ // 9_58
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

// 8_51 - virtual type 
// Note: Here we are using function() keyword instead of fat arrow function( ie () => {} )
//		 When function() is used, this refers to the instance of the user model
//		 Whereas when fat arrow function is used, this refers to this file 
//		 whereas fat arrow function refers to this file 8_52_6_0
UserSchema.virtual('postCount').get(function() {
	return this.posts.length; //8_52_05_40 
	
});


// 10_64 - Middleware
// A middlware is associated with a Model. Each model can have their own middleware #10_64_1_45
// - Remove BlogPost associated with the user, before the user is removed
// - `next` is make the asynchronous call(BlogPost.remove in this case) synchronous #10_65_
//	  	`next` calls any successive middleware if registered. If none, then the user record 
//	 	will be deleted
UserSchema.pre('remove', function(next){
	// this === joe (as we ar using fuction() keyword & not fat arrow function)
	const BlogPost = mongoose.model('blogPost'); // Note**: Do not use `require('./BlogPost')`(in the header) to import
												 //		   the BlogPost model that can cause cyclical load 10_64_2_50
	BlogPost.remove({_id: {$in: this.blogPosts}})//$in is a Query operator 10_65_2_50
			.then(() => next());
});


// Couple of things happen here
// 1. Mongoose checks for collection 'user' in mongo. If not available, asks Mongo to create one
// 2. `user` is the collection name (Something fishy here. this is referred to as Model in class 9_57/9_58
// 3. `User` can be referred as User class or model
// 4. A mongoose model has 1 - 1 relationship with a collection in mongo db 8-45
const User = mongoose.model('user', UserSchema);

// Make the User class as module so that it can be used by other files inside the same project
module.exports = User;
