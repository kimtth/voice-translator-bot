// require("dotenv").config({ path: './.env' });
// //require("dotenv").config({ path: '../.env' }); //for debugging node translate
// //const fetch = require("node-fetch");
// const request = require('request');

// var key_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
// if (!process.env[key_var]) {
//     throw new Error('Please set/export the following environment variable: ' + key_var);
// }
// var subscriptionKey = process.env[key_var];
// var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
// if (!process.env[endpoint_var]) {
//     throw new Error('Please set/export the following environment variable: ' + endpoint_var);
// }
// var endpoint = process.env[endpoint_var];
// var region_var = 'TRANSLATOR_TEXT_REGION_AKA_LOCATION';
// if (!process.env[region_var]) {
//     throw new Error('Please set/export the following environment variable: ' + region_var);
// }
// var region = process.env[region_var];

// function translateText(str_text, from, to){
//     //https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en,ko
//     let URL = endpoint + 'translate?api-version=3.0&from=' + from + '&to=' + to + '&profanityAction=Marked';
//     let arrOfObj = [{ Text: str_text }];
//     let rtnStr = ''

//     let options = {
//         method: 'POST',
//         url: URL,
//         headers: {
//           'Ocp-Apim-Subscription-Key': subscriptionKey,
//           'Ocp-Apim-Subscription-Region': region,
//           'Content-type': 'application/json',
//         },
//         body: arrOfObj,
//         json: true,
//     };

//     request.post(options, function(err, res, body){
//         console.log(JSON.stringify(body));
//         rtnStr = body[0].translations[0].text;
//         console.log(rtnStr);
//         //return JSON.stringify(body, null, 4);
//     });

//     return rtnStr;
// };


// //translateText("hello", "en", "ja");
// module.exports = translateText


//     /*
//     fetch(URL, {
//         method: 'post',
//         headers: {
//             'Ocp-Apim-Subscription-Key': subscriptionKey,
//             'Ocp-Apim-Subscription-Region': region,
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(arrOfObj)
//     })
//     .then(res => Promise.all([res.status, res.json()]))
//     .then(([status, jsonData]) => {
//         console.log(jsonData[0].translations[0].text);
//     })
//     .catch((error) => {
//         console.log('error: ' + error);
//     });
//     */