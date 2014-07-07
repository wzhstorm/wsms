/*global CreateObject, UpdateState, UpdateStructure, editor*/
var ExecuteOperation = (function () {
	"use strict";

	var removedObject = {};
	/*
	* return true if success
	* return false if failed
	*/
	function createObject(op){
		var object = null;
		//add primary object
		if(op.primary){
			CreateObject.addPrimary(op.uuid, op.primary);
		}
		//add from asset
		if(op.asset){
			CreateObject.addFromAsset(op);
		}
		//add from file
		if(op.file){
			CreateObject.addFromFile(op);
		}
		//clone object
		if(op.object){
			object = editor.getObjectByUuid(op.object);
			if(!object){
				return false;
			}			
			CreateObject.cloneObject(op.uuid, object);
		}
		return true;
	}

	/*
	* return true if success
	* return false if failed
	*/
	function updateState(op){
		var target = editor.getObjectByUuid(op.uuid);
		if(target){
			UpdateState.updateObject(target, op.key, op.after);
			return true;
		}

		target = editor.getMaterial(op.uuid);
		if(target){
			UpdateState.updateMaterial(target, op.key, op.after);
			return true;
		}

		target = editor.getGeometry(op.uuid);
		if(target){
			UpdateState.updateGeometry(target, op.key, op.after);
			return true;
		}
		return false;
	}

	/*
	* return true if success
	* return false if failed
	*/
	function updateStruct(op){
		var object = null, parent = null;

		switch(op.method){
			case "remove":
				object = editor.getObjectByUuid(op.uuid);
				if(!object){
					return false;
				}
				removedObject[object.uuid] = object;
				UpdateStructure.remove(object);
			break;
			case "parent":
				object = editor.getObjectByUuid(op.uuid);
				parent = editor.getObjectByUuid(op.toParent);
				if(!(object&&parent)){
					return false;
				}
				UpdateStructure.parent(object, parent);
			break;
			default:
			break;
		}
		return true;
	}
	function getRemovedObject(uuid){
		if(removedObject[uuid]){
			return removedObject[uuid];
		}
	}	

	return {
		createObject: createObject,
		updateState: updateState,
		updateStruct: updateStruct,
		getRemovedObject: getRemovedObject
	};
})();