// 9_56
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{	// This is a configuration object 9_57_1_52 // Note: Here we are making reference
	  			// to another collection (this is different from nesting the
	  			// document(posts field) that we did in `User` Model
    type: Schema.Types.ObjectId, // Type of `ObjectId` indicates reference to another collection 9_57_2_21
    ref: 'comment' 	// This is specific to mongoose (not MongoDB) to identify the collection 9_57_2_30
    				// and is not stored in MongoDB
    				// The `ref` gets matched up against the Model definition 9_57_3_8
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
