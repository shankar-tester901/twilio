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


app.get("/out-test", (req, res) => {
    console.log("ROOT INVOKED FOR CALLING CUSTOMER SUPPORT");
    res.render("support-client.ejs");
});

app.get("/token", (req, res) => {

    console.log(" TOKEN INVOKED for calling customer support ");

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


http.createServer(app).listen(2000, "127.0.0.1");
console.log("CUSTOMER SUPPORT CALLING CLIENT");
console.log("Twilio Client app server running at http://127.0.0.1:2000/test/");
