const http = require("http");
const express = require("express");
const path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
const ClientCapability = require("twilio").jwt.ClientCapability;
const VoiceResponse = require("twilio").twiml.VoiceResponse;
var YOUR_TWILIO_NUMBER = '<my-twilio-num>';
var crmclient = require('zcrmsdk');

const app = express();

app.use(express.static("public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);


app.get("/test", (req, res) => {
    console.log("ROOT INVOKED");
    res.render("serverclient.ejs");
});

app.get("/token", (req, res) => {

    console.log(" TOKEN INVOKED ");

    var accountSid = "";
    var authToken = "";

    // put your Twilio Application Sid here
    const appSid = "";

    const capability = new ClientCapability({
        accountSid: accountSid,
        authToken: authToken
    });
    capability.addScope(
        new ClientCapability.OutgoingClientScope({ applicationSid: appSid })
    );
    capability.addScope(new ClientCapability.IncomingClientScope("joey"));
    const token = capability.toJwt();

    res.set("Content-Type", "application/jwt");
    res.send(token);
});


app.get("/updateScreen", (req, res) => {

    console.log(" UPDATE SCREEN RECEIVED ");
    res.send("<b> Screen Updated </b>");
});


app.post("/voice", (req, res) => {
    console.log(" VOICE INVOKED  NOW  .........");

    var phoneNumber = req.body.To;
    console.log("To is .......", req.body.To);
    console.log("From is .......", req.body.From);
    console.log("CallerId is ....", req.body.callerId);
    console.log("Direction is .......", req.body.Direction);
    console.log("FromCity is .......", req.body.FromCity);
    console.log("ToCity is .......", req.body.ToCity);
    console.log(req.body);


    //   var callerId = YOUR_TWILIO_NUMBER;
    var MyVoiceResponse = new VoiceResponse();

    var dial = MyVoiceResponse.dial({
        callerId: YOUR_TWILIO_NUMBER,
        answerOnBridge: true,
        record: "record-from-answer-dual"
            //  recordingStatusCallback: "/recording-events",
            // recordingStatusCallbackEvent: "completed"
    });

    if (phoneNumber != '') {
        console.log("calling client with phoneNumber " + phoneNumber);
        dial.number(phoneNumber);
    } else {
        console.log("calling joey .........+++++++++++");
	//This is the magic
        dial.client("joey");

    }


    // MyVoiceResponse.say("67890 MickeyMouse Chchota Bheem ABC!");
    // res.set("Content-Type", "text/xml");
    res.send(MyVoiceResponse.toString());


});

app.post("/recording-events", (req, res) => {
    console.log(" RECORDING EVENTS INVOKED ");
    console.log("RecordingUrl --- ", req.body.RecordingUrl);
    console.log("RecordingDuration ---", req.body.RecordingDuration);
    console.log("RecordingSid ---", req.body.RecordingSid);
});


http.createServer(app).listen(1337, "127.0.0.1");

console.log("Twilio Client app server running at http://127.0.0.1:1337/token/");
