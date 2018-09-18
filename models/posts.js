const mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    message: String,
    photourl: String,
    videourl: String,
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;