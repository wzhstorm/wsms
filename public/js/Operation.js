/*global THREE*/
var Operation = (function(){
	"use strict";
	var CREATE = 0;
	var UPDATE_STATE = 1;
	var UPDATE_STRUCT = 2;
	
	//copy all the property of a to b
	function copy(a, b){
		for(var property in a){
			if(a.hasOwnProperty(property)){
				b[property] = a[property];
			}
		}
	}

	//build the state of operation UPDATE_STATE
	function buildState(op, target, key){
		if(target[key].clone){
			op.before = target[key].clone();
			op.after = target[key].clone();
		}else{
			op.before = clone(target[key]);
			op.after = clone(target[key]);
		}

		function clone(value){
			var result;

			switch(typeof value){
				case "number":
				case "string":
				case "boolean":
					result = value;
					break;
				case "object":
					result = JSON.parse(JSON.stringify(value));
					break;
				default:
				break;
			}
			return result;
		}
	}	

	function Operation(type, options){

		switch(type){
			case CREATE:
				this.type = CREATE;
				copy(options, this);
				this.uuid = THREE.Math.generateUUID();
			break;
			case UPDATE_STATE:
				this.type = UPDATE_STATE;
				if(options&&options.key&&options.target){
					this.key = options.key;
					this.uuid = options.target.uuid;
					buildState(this, options.target, options.key);
				}
			break;
			case UPDATE_STRUCT:
				this.type = UPDATE_STRUCT;
				copy(options, this);
			break;
			default:
			break;
		}
	}
	Operation.prototype = {
		getUndo: function(){
			var newOp = null;
			switch(this.type){
				case Operation.CREATE:
					break;
				case Operation.UPDATE_STATE:
					newOp = makeUndoState(this);
					break;
				case Operation.UPDATE_STRUCT:
					break;
				default:
					break;			
			}

			return newOp;

			//the method depends on the value type
			function makeUndoState(op){
				var newOp = null;

				switch(op.key){
					case "position":
					case "rotation":
					case "scale":
						newOp = JSON.parse(JSON.stringify(op));

						newOp.before = op.after.clone();
						newOp.after = op.before.clone();
					break;
				}

				return newOp;
			}			
		}
	};

	Operation.CREATE = CREATE;
	Operation.UPDATE_STATE = UPDATE_STATE;
	Operation.UPDATE_STRUCT = UPDATE_STRUCT;

	return Operation;
}());