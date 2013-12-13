define([ "jquery","jTemplate"],function ($) {
	
	
	
	return function(model){
		var that = this;
		that.__model = null;
		that.setModel = function(model){
			that.__model = model;
		}
		
		that.getModel = function(){
			return that.__model;
		}
		
		
		
		
		that.extend = function(obj){
			for( i in obj){
				that[i]=obj[i]
			}
		}
		that.setModel(model);
	}
});