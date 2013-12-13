// Set up the paths for the application.
requirejs.config({
    paths: {
        "modernizr": "vendor/modernizr-2.6.2.min",
		"jquery": "vendor/jquery-1.10.2.min",
		"socketio": "vendor/socket.io-client",
		"domReady" : "plugins/domReady",
		"jTemplate" : "plugins/jquery.tmpl.min",
		"text" : "plugins/text"
    }, 
	
	map: {
		"*": "jquery-private",
		"jquery-private" : {"jquery": "jquery"}
	},
	
	 shim: {
        'jTemplate': {
			deps: ["jquery"],
            exports: 'jTemplate'
        },
        'socketio': {
           exports: 'io'
        }
    }
});

requirejs(["domReady!", "app/main"], function( domReady, app_main){
	app_main.init();
});