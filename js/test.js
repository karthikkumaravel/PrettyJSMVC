// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'socketio': {
      exports: 'io'
    }
  },
  paths: {
    socketio: 'vendor/socket.io',
  }
});
 
define([
  'socketio'
], function( $, Backbone, io ) {
 
      var socket = io.connect('http://weather.yahooapis.com/forecastrss?w=2502265');
      socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
        });
 
 
      //Ready to write Backbone Models and Socket.io communication protocol in here :)
 
 
});