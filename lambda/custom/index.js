/* eslint-disable  func-names */
/* eslint-disable  no-console */

var rp = require('request-promise');
const striptags = require("striptags");
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to AWS Pug, you can ask what the next meetup is about, or ask "What is AWS Pug?"';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};
const AWSPugInfoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AWSPugInfoIntent';
  },
  //make this async if you plan to enable api call for meetup description
  handle(handlerInput) {
    let speechText = 'Welcome to the AWS Portsmouth User Group! This group is open to anyone interested in learning more about Amazon Web Services. We are a community of users, developers and business professionals meeting to share ideas and learn from each other and from leading figures in the AWS technology space. Our aim is to become an important resource for technical and business professionals who want to stay up to speed with developments in AWS Cloud and related technologies. We generally have one or two presentations per Meetup. When two presentations are scheduled, each usually go about 30 to 40 minutes with Q and A.'
  //use this code if you plan to enable api call for meetup description
   // try {
    //   speechText = await awsPugInfo();
    // }
    // catch (err) {}
    console.log("------------------------");
    console.log(speechText)
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('AWS PUG Info', speechText)
      .getResponse();
    //Use below if you enable api call for meetup description
    // return handlerInput.responseBuilder
    //   .speak(speechText.speechOutput)
    //   .withSimpleCard('AWS PUG Info', speechText.text)
    //   .getResponse();
  }
};
const UpcomingEventsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'UpcomingEventsIntent';
  },
  async handle(handlerInput) {
    let speechText;
    try {
      speechText = await nextEventLookup();
    }
    catch (err) {}
    console.log("------------------------");
    console.log(speechText)
    return handlerInput.responseBuilder
      .speak(speechText.speechOutput)
      .withSimpleCard('Upcoming AWS PUG Meetups', speechText.text)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

function nextEventLookup() {
  let url = 'https://www.meetup.com/awspug/events/';
  let tmpSpeechText;
  var options = {
    method: 'GET',
    url: 'https://api.meetup.com/awspug/events',
    qs: {
      sign: 'true',
      'photo-host': 'public',
      page: '1',
      status: 'upcoming'
    }
  };
  return rp(options)
    .then(function(body) {
      let jsonResponse = JSON.parse(body);
      let description = jsonResponse[0]['description'];
      let local_date = jsonResponse[0]['local_date'];
      let local_time = jsonResponse[0]['local_time'];
      let venue = jsonResponse[0]['venue'];
      let venue_name = venue['name'];
      let venue_city = venue['city'];
      let venue_address_1 = venue['address_1'];
      let venue_state = venue['state'];
      let venue_zip = venue['zip'];
      let id = jsonResponse[0]['id']
      url = url + id;

      tmpSpeechText = "The next AWS Pug Meetup is " + local_date +
        " at " + local_time +
        ". The meetup has the following description...: " + description + ". " +
        "It is at " + venue_name + " in " + venue_city + ", " + venue_state + ".";

      return { "speechOutput": striptags(tmpSpeechText), "text": striptags(tmpSpeechText) + " For more info visit " + url };

    })
    .catch(function(err) {
      //// API call failed...
      tmpSpeechText = 'Sorry, there was an error looking up future AWS Portsmouth User Group events. Check out your Alexa app for more info.';
      return { "speechOutput": tmpSpeechText, "text": tmpSpeechText + " For more info visit " + url };
    });
};

function awsPugInfo() {
  //this is a mess because meetup api returns html tags and sanitized html which alexa cant read back
  //hard coded for now
  let url = 'https://www.meetup.com/awspug/'

  var options = {
    method: 'GET',
    url: 'https://api.meetup.com/awspug',
    qs: {
      sign: 'true',
      'photo-host': 'public'
    }
  };
  return rp(options)
    .then(function(body) {
      let jsonResponse = JSON.parse(body);
      let description = jsonResponse['description'];

      console.log(description);
      description = striptags(description)
      console.log(striptags(description))
      description = description.replace("/&nbsp;/g","");
      description = description.replace("/&amp;/g","");
      description = description.replace("Q&amp;A.&nbsp;","Q & A");


      console.log(description)
      return { "speechOutput": striptags(description), "text": +striptags(description) + " For more info visit " + url };

    })
    .catch(function(err) {
      return { "speechOutput": "Sorry, there was an error looking up info about AWS Portsmouth User Group. Check out your Alexa app for more info.", "text": "There was an error getting that info. Checkout our meetup page to learn more at " + url };
    });
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    UpcomingEventsIntentHandler,
    AWSPugInfoIntentHandler,
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
