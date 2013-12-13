define([ "jquery", "app/weatherReport"],function ($, WeatherReport) {
		
	var init = function(){
		var formData = $("#getWeatherReportForm").serialize();
		var weatherReport1 = new WeatherReport();
		weatherReport1.retriveReportTo(formData.w, $("#WeatherReportContainer1"))
		$("#refreshBtn").click(function(event){ 
			event.preventDefault();
			var formData1 = $("#getWeatherReportForm").serialize();
			weatherReport1.retriveReportTo(formData.w, $("#WeatherReportContainer1"));
		});
		
		var weatherReport2 = new WeatherReport();
		weatherReport2.model.setUrl("forecastrss_2442047.xml");
		weatherReport2.retriveReportTo(formData.w, $("#WeatherReportContainer2"));
	}
	
	return {
		init : init
	}
});

