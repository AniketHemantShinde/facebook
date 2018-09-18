const Page = require('../models/pages');

exports.postNewPage = (req, res) => {
  let {
    name,
    category,
    profileurl,
    coverurl,
    users,
    createdOn
  } = req.body;

  var page = new Page({
    name,
    category,
    profileurl,
    coverurl,
    users,
    createdOn
  });
  page.save().then((page) => {
    console.log('Added successfully');
    res.json({
      message: "Added successfully",
      status: 200
    });
  }).catch(function(err) {
    if (err) {
      console.log(err);
      res.json({
        message: 'Server error',
        status: 500
      });
    }
  });
};

exports.getAllPages = (req, res) => {
  var query = Page.find();
  if (req.query.name) {
    query.where({ title: req.query.name });
  }
  query.select('name -_id');
  query.limit(req.query.limit || 10);
  query.exec((error, pages) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (pages) {
      res.json({
        data: pages,
        message: "All episodes fetched",
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

exports.getPageById = (req, res) => {
  Page.findById(req.params.id, (err, pages) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (pages) {
      res.json({
        data: pages,
        message: "Page data fetched successfully",
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

exports.updatePageById = (req, res) => {
  console.log(req.body);
  const {
    name,
    category,
    profileurl,
    coverurl,
    users
  } = req.body;
  Page.update({
    _id: req.params.id
  }, {
    name,
    category,
    profileurl,
    coverurl,
    users
  }, {}, (error, page) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(episode);
  });
};

exports.deletePageById  = (req, res) => {
  Page.findOneAndDelete({
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