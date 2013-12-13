define([ "jquery","app/model","app/view"],function ($, Model, View) {
		
		
		
	return function(obj){
		var that = this;
		
		
		var weatherReportModel = new Model({
					url: "forecastrss.xml",
					
					dataHandlerXML : function(xml){
						var that = this;
						var data = {};
						["location", "wind", "image", "forecast"].forEach(function(item){
							itemDom = xml.find(item);
							if(itemDom.length>1){
								data[item] = [];
								itemDom.each(function(index, itemDomSingle){
									data[item].push(that.getNodeData(itemDomSingle));
								});
							}else{
								data[item] = that.getNodeData(itemDom);
							}
						});
						return data;
					}
			});
			
		var weatherReportView = new View(weatherReportModel);
		weatherReportView.extend({
			render : function(element){
				var data = this.getModel().get();
				 
				var viewFragment = element;
				
				if(data !== null){
					
					$("#weatherReportTemplate").tmpl(data).appendTo(viewFragment);
					
					$("#weatherReportForeCasteItem").template('weatherReportForeCasteItems');
					if(data.forecast && data.forecast instanceof Array ){
						data.forecast.forEach(function(e){
							if(e.attr){
								$(".weather-report-container",viewFragment).append($.tmpl('weatherReportForeCasteItems', e.attr));
							}
						});
					}
				}
				return viewFragment;
			},
			
			renderError : function(element){
				var viewFragment = element;
				$("#weatherReportErrorResponse").tmpl().appendTo(viewFragment);
				return viewFragment;
			}
		})
		
		that.model = weatherReportModel;
		that.view = weatherReportView;
		
		that.retriveReportTo = function(w, element){
		
			element.jquery || (element = $(element));
			that.model.set({w: w});
			var deferredObj = that.model.fetch();
			
			deferredObj.done(
			  function( ) {
				(that.view.render(element));
			  }
			);
			deferredObj.fail(function(){
				(that.view.renderError(element));
			});
		}
		
		
		that.extend = function(obj){
			for( i in obj){
				that[i]=obj[i]
			}
		}
	}
});