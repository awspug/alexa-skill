# AWS Pug Alexa Skill

AWS Pug is an Alexa skill back-ended by a node Lambda. 

## Installation

You will need the AWS CLI configured with a user profile
You will need an Amazon Developer Account
You will need an AWS Account

Install Dependancies:

```bash
cd lambda/custom && npm install
```
## Current Functionality
### UpcomingEventsIntent
    Hits the meetup API for future events and reads back the next event
### AWSPugInfoIntent
    Hard coded description of AWS PUG is read back, text from Meetup Description

## Testing
You can use nextEvent_test.js and AWSPugInfo_test.js as test events in the AWS console to test each intent. If you would like to test locally, you can use invoker.js and update the event to the intent JSON you would like to test. 

## Deploying

Use the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) to deploy.

Navigate to the project root and run: 
```bash
ask deploy
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update skill.json description and readme with added functionality 
Please make sure to update tests as appropriate.

## Beta Testing
If you would like to enable this skill without publishing your own copy, please email plankey5@aol.com with the email address you use with your Alexa devie and you will be added as a beta tester. 
