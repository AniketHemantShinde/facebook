var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const userController = require('./controllers/users');
const groupController = require('./controllers/groups');
const postController = require('./controllers/posts');
const pageController = require('./controllers/pages');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/facebook');
mongoose.connection.on('error',function(){
    console.log('error in mongo connection');
})
mongoose.connection.on('open',function(){
    console.log('connected to mongo');
})


app.post('/api/v1/users', userController.postNewUser);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.getUserById);
app.put('/api/v1/users/:id', userController.updateUserById);
app.delete('/api/v1/users/:id', userController.deleteUserById);

app.post('/api/v1/groups', groupController.postNewGroup);
app.get('/api/v1/groups', groupController.getAllGroups);
app.get('/api/v1/groups/:id', groupController.getGroupById);
app.put('/api/v1/groups/:id', groupController.updateGroupById);
app.delete('/api/v1/groups/:id', groupController.deleteGroupById);

app.post('/api/v1/posts', postController.postNewPost);
app.get('/api/v1/posts', postController.getAllPosts);
app.get('/api/v1/posts/:id', postController.getPostById);
app.put('/api/v1/posts/:id', postController.updatePostById);
app.delete('/api/v1/posts/:id', postController.deletePostById);


app.post('/api/v1/pages', pageController.postNewPage);
app.get('/api/v1/pages', pageController.getAllPages);
app.get('/api/v1/pages/:id', pageController.getPageById);
app.put('/api/v1/pages/:id', pageController.updatePageById);
app.delete('/api/v1/pages/:id', pageController.deletePageById);


app.set('port', 5000);
app.listen(app.get('port'), function () {
    console.log('the server is working');
});
module.exports = app;
