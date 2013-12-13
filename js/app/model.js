define([ "jquery"],function ($) {

	var copy = function(xml){
		var data = this.dataHandlerXML(xml);
		this.set(data);
	};

	var getNodeData = function(itemDom){
		var data = {}
		data = getAllChildInMap(itemDom);
		data['attr'] = getAllAttrInMap(itemDom);
		return data;
	};
	
	var getAllAttrInMap = function(element){
		var domElement;
		if(element.jquery){
			domElement = element.get(0);
		} else if(element.nodeType){
			domElement = element;
		} else {
			return null;
		}
		var attrMap = {};
		var attrList = Array.prototype.slice.call(domElement.attributes).forEach(function(item){
			attrMap[item.name] = item.value;
		});
		return attrMap;
	}
	
	var getAllChildInMap = function(element){
		var domElement;
		if(element.jquery){
			domElement = element;
		} else if(element.nodeType){
			domElement = $(element);
		} else {
			return null;
		}
		var childMap = {};
		var childList = domElement.children();
		
		if(childList.length){
			childList.each(function(i, e){
				childMap[e.nodeName]= getAllChildInMap(e);
			});
		}else{
			if($.trim(domElement.text())!=""){
				childMap["content"] = domElement.text();
			}
		}
		
		return childMap;
	}
	
	var fetchData = function (url, data, success, error){
		fetchDataByAJAXinSameDomain(url, data, success, error);
	};
	
	var fetchDataByAJAXinSameDomain = function (url, data, success, error){
		$.ajax(url,{
			data: data,
			dataType : "xml",
			type : "GET",
			success : success,
			error : error
		});
	};
	
	var fetch = function(){
			this.createDeferred();
			
			if(this.url){
				var data = this.get();
				fetchData(this.url, data, this.__success, this.__error);
			}
			
			return this.getDeferred();
		};
	
	return function(obj){
		var that = this;
		that.__data = {};
		that.set = function(data){
			if(typeof data ==="object" && !(data instanceof Array) ){
				for(var i in data){
					that.__data[i] = data[i];
				}
			} 
		}
		
		that.get = function(){
			if(arguments.length == 0){
				return that.__data;
			}else if(typeof arguments[1] === "string"){
				if(that.__data[arguments[1]]){
					return that.__data[arguments[1]];
				} else {
					return null;
				}
			}
		}
		
		that.url = null;
		that.getUrl = function(){
			return that.url;
		}
		that.setUrl = function(url){
			if(typeof that.url === "string"){
				that.url = url;
			}
		}
		
		that.__dfd = null;
		that.createDeferred = function(){
			that.__dfd = $.Deferred();
		};
		
		that.resolveDeferred = function(){
		
			that.__dfd.resolve();
		};
		
		that.rejectDeferred = function(){
			that.__dfd.reject();
		};
		
		that.getDeferred = function(){
			return that.__dfd;
		}
		
		that.__success = function(responsedata){
		
			var xml = $(responsedata);
				that.copy(xml);
				
			that.resolveDeferred();
		}
		
		that.__error = function(){
			that.rejectDeferred();
		}
		
		that.fetch = fetch;
		that.getNodeData = getNodeData;
		that.copy = copy;
		
		that.extend = function(obj){
			for( i in obj){
				that[i]=obj[i]
			}
		}
		that.extend(obj);
	}
});