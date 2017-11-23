var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');
var cognitive = require('./controller/CognitiveDialog');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "46e3ac97-1cd6-47d4-9eee-ab6439284719",
    appPassword: "fnggbDXZN28#!klEOI092(|"
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
    
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});
    
// This line will call the function in your LuisDialog.js file
luis.startDialog(bot);