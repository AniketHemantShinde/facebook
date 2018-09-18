const mongoose = require('mongoose')

var PageSchema = new mongoose.Schema({
    name: String,
    category: String,
    profileurl: String,
    coverurl: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    createdOn: { type: Date, default: Date.now}
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;