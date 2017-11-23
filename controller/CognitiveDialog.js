var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/02c062ba-e8bf-42c3-86f2-dfd56cb2785d/url?iterationId=bc7ec1a4-f69c-450d-8efa-d5b6690d0ae5',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '60b7c5c219ec4d8395e592511ffab18b'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}