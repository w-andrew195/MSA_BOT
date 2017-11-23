var request = require('request'); 

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/130d23ca-c315-4438-8e63-62a6ad4b8109/url?iterationId=de24ac4e-686a-4b5d-9b2c-729e31dd041d',
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