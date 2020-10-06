# voice-translator-bot

Voice recognition and translation bot, which is developed by MERN stack, the most famous composition while developing backend and frontend. 

The aim of this project is for learning MERN stack and integrating it with Azure cognitive service.

## The Features

* Channel Searching
* Channel Selection
* Send an inquiry and Response from Bot
* UI & Toggle Button (Mic Button)
* Blue colored scroll bar & Auto Scrolling
* API (Express & MongoDB)
* Integrate with Azure Cognitive Service (Speech to Text)
* Integrate with Azure Cognitive Service (Translate (ja->en))

```bash
npm install
yarn install

nodemon app
yarn start

npm install 'module_name'
yarn add 'module_name'
```
+ Please install moesif origin & cors changer of chrome extension.
+ Please config proper values in 'front-react/src/components/Constants.js'
+ Pleas install MongoDB, then creating the sample data using creatFakeData.js.

![preview](https://github.com/kimtth/voice-translator-bot/blob/master/references/screenshot.gif?raw=true)

## MongoDB Tips

### Add field to all documents
db.channels.update({},{$set : { "owner" : true}} , false, true);

### Rename the exists document

db.user.update({}, {$rename:{"Id":"userId"}}, false, true);

db.user.update({}, {$rename:{"name":"username"}}, false, true);

db.channels.update({},{$set : { "password" : "1234"}} , false, true);

### Transaction
session = db.getMongo().startSession()

session.startTransaction({ readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } } );

or

session.startTransaction()


session.commitTransaction()

session.abortTransaction() 
