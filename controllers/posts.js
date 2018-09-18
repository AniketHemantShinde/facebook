const Post = require('../models/posts');

exports.postNewPost = (req, res) => {
  let {
    message,
    photourl,
    videourl,
    createdAt,
    updatedAt
  } = req.body;

  var post = new Post({
    message,
    photourl,
    videourl,
    createdAt,
    updatedAt
  });
  post.save().then((post) => {
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


exports.getAllPosts = (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (posts) {
      res.json({
        data: posts,
        message: "All shots fetched",
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

exports.getPostById = (req, res) => {
  Post.findById(req.params.id, (err, posts) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (posts) {
      res.json({
        data: posts,
        message: "Shot data fetched successfully",
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

exports.updatePostById = (req, res) => {
  console.log(req.body);
  const {
    message,
    photourl,
    videourl
  } = req.body;
  Post.update({
    _id: req.params.id
  }, {
    message,
    photourl,
    videourl
  }, {}, (error, post) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(post);
  });
};

exports.deletePostById  = (req, res) => {
  Post.findOneAndDelete({
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