const Group = require('../models/groups');

exports.postNewGroup = (req, res) => {
  let {
    name,
    category,
    profileurl,
    coverurl,
    users,
    createdOn
  } = req.body;

  var group = new Group({
    name,
    category,
    profileurl,
    coverurl,
    users,
    createdOn
  });
  group.save().then((group) => {
    console.log('Added successfully');
    res.json({
      message: "Added successfully",
      status: 200
    });
  }).catch(function (err) {
    if (err) {
      console.log(err);
      res.json({
        message: 'Server error',
        status: 500
      });
    }
  });
};

exports.getAllGroups = (req, res) => {
  var query = Group.find()
  if (req.query.name) {
    query.where({ title: req.query.name });
  }
  query.select('name -_id');
  query.limit(req.query.limit || 10);
  query.exec((error, groups) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (groups) {
      res.json({
        data: groups,
        message: "All groups fetched",
        status: 200
      });
    } else {
      res.json({
        message: "No data found",
        status: 200
      });
    }
  });
};

exports.getGroupById = (req, res) => {
  Group.findById(req.params.id, (err, groups) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (groups) {
      res.json({
        data: groups,
        message: "Group data fetched successfully",
        status: 200
      });
    } else {
      res.json({
        message: "No data found",
        status: 200
      });
    }
  });
};

exports.updateGroupById = (req, res) => {
  console.log(req.body);
  const {
    name,
    category,
    profileurl,
    coverurl,
    users
  } = req.body;
  Group.update({
    _id: req.params.id
  }, {
    name,
    category,
    profileurl,
    coverurl,
    users
  }, {}, (error, group) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(group);
  });
};

exports.deleteGroupById  = (req, res) => {
  Group.findOneAndDelete({
    _id: req.params.id
  }, (error, deleteId) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    res.json({
      message: "Deleted successfully"
    });
  });
};