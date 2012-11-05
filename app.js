
/**
 * Module dependencies.
 *
 *app.get('/', routes.index);
 *app.get('/users', user.list);
 */

var express = require('express')
  , routes = require('./routes')
  , TaskList = require('./routes/tasklist')
  , http = require('http')
  , path = require('path');

var app = express();
app.use(require('connect').bodyParser());
var taskList = new TaskList('mongodb://swampuser:yuc4insteadof2@ds041157.mongolab.com:41157/swampdb');
app.get('/', taskList.showTasks.bind(taskList));
app.post('/addtask', taskList.addTask.bind(taskList));
app.post('/completetask', taskList.completeTask.bind(taskList));

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
  app.use(express.errorHandler());
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
