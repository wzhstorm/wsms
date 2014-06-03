"use strict";
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var rc = require('./routes/revisionControl');
var am = require('./routes/assetManage');
var http = require('http');
var path = require('path');
var db = require('./models/db');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.post('/saveScene', routes.saveScene);
app.get('/loadScene', routes.loadScene);
app.get('/getAllScenes', routes.getAllScenes);

app.post('/addImgAsset', am.addImgAsset);
app.get('/getImgAsset', am.getImgAsset);
app.post('/updateImgAsset', am.updateImgAsset);
app.get('/listImgAssets', am.listImgAssets);
app.get('/removeImgAsset', am.removeImgAsset);
app.post('/addGeoAsset', am.addGeoAsset);
app.get('/getGeoAsset', am.getGeoAsset);
app.post('/updateGeoAsset', am.updateGeoAsset);
app.get('/listGeoAssets', am.listGeoAssets);
app.post('/removeGeoAsset', am.removeGeoAsset);

app.post('/addDirectory', am.addDirectory);
app.post('/removeDirectory', am.removeDirectory);
app.post('/listDirectory', am.listDirectory);
app.post('/updateDirectory', am.updateDirectory);
app.post('/getDirectoryTree', am.getDirectoryTree);

app.get('/getAllVersions', rc.getAllVersions);
app.get('/retrieve', rc.retrieve);
app.post('/commit', rc.commit);
app.get('/merge', rc.merge);
app.post('/removeVersion', rc.removeVersion);
app.get('/checkout', rc.checkout);
app.post('/addBranch', rc.addBranch);
app.post('/removeBranch', rc.removeBranch);
app.get('/getBranches', rc.getBranches);
app.post('/addTag', rc.addTag);
app.post('/removeTag', rc.removeTag);
app.get('/getTags', rc.getTags);
app.get('/getRHG', rc.getVersionHistory);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
