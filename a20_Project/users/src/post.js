
//8-46
// Best practice: As this is not a model, it could be a good practice to name this file as post_schema.js 8-46

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: String
});

module.exports = PostSchema; 

