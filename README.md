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

## Deploying

Use the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) to deploy.
```bash
ask deploy
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
