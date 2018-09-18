const mongoose = require('mongoose')

var groupSchema = new mongoose.Schema({
    name: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    privacy: String,
    createdBy: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

