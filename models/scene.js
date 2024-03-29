var mongoose = require("mongoose");

var SceneSchema = new mongoose.Schema({
  uuid: String,
  data: String,
  name: String,
  isModel: Boolean,
  privilege: String,
  newestVersion: Number
});

SceneSchema.statics.findByUuid = function(uuid, callback) {
  this.find({'uuid': uuid}, callback);
};

SceneSchema.statics.saveScene = function(scene, callback) {

};

SceneSchema.statics.getScene = function(uuid, callback) {
	
};

SceneSchema.statics.getAllScenes = function(callback) {
  this.find(callback);
};

var Scene = mongoose.model('Scene', SceneSchema);

module.exports = Scene;
