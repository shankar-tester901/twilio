# This will help folks build their own Twilio integration using the Zoho Developer CRM available from https://www.zoho.com/developer/

Note: Twilio supports HTTPS only and that too it has issues if there are any redirects. So its best that your application is directly accessible online. Behind firewalls this solution will not work , it will have issues as most firewalls block UDP packets. You will then need to make 'holes' in your firewall ;-)

1. Create your Twilio acct. Load some money ;-).
2. Purchase a number with incoming and outgoing facility.
3. Go to the Programmable Voice section.
4. Create a TwiML App
5. Set the Voice -> Request URL as the url that you will be exposing in the Widget  
<img src="images/Screenshot%202019-06-28%20at%204.44.57%20PM.png" width="550" height="350">


6. Go to the Number that you have purchased and configure it similarly
<img src="images/Screenshot%202019-06-28%20at%204.58.37%20PM.png" width="550" height="350">






1. Set up the Widget inside the Vertical CRM 
2. Pls replace the variable values as per your Twilio Account
3. Run the Server app ... this location is what you need to give in the Widget configuration
4. Run the support caller app. This will make the inbound call. When the call comes inbound, the widget will change its color to notify you. Receive the call and get talking!

5. DO NOT FORGET TO PUBLISH your app. It will then be available worldwide with your brand and price.

Thanks

