var lambdaFunction = require('./index');
var functionHandler = 'handler';

var event ={
  "version": "1.0",
  "session": {
    "new": false,
    "sessionId": "amzn1.echo-api.session.123456789012",
    "application": {
      "applicationId": "amzn1.ask.skill.987654321"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.testUser"
    }
  },
  "context": {
    "AudioPlayer": {
      "playerActivity": "IDLE"
    },
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.987654321"
      },
      "user": {
        "userId": "amzn1.ask.account.testUser"
      },
      "device": {
        "supportedInterfaces": {
          "AudioPlayer": {}
        }
      }
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "amzn1.echo-api.request.1234",
    "timestamp": "2016-10-27T21:06:28Z",
    "locale": "en-US",
    "intent": {
      "name": "AWSPugInfoIntent",
      "slots": {}
    }
  }
};
var context = {};

function callback(error, data){
	console.log(error);
	console.log(data);
}

lambdaFunction[functionHandler](event, context, callback);