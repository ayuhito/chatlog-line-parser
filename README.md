# Chatlog Line Parser

A chatlog parser that can take inputs from Discord, Skype, Slack and more!

## Purpose

Chatlogs on applications such as Discord are difficult to export and share. This parser takes in such inputs and returns them as a message object.

A typical log would look this:

```
Kram10/12/2019
Why do you code???
LotusLast Sunday at 8:46 PM
Coding is fun
Sort of
KramYesterday at 8:46 PM
Youre always ranting about it...
LotusToday at 8:46 PM
Shhh I have my moments
```

Which should be parsed into message objects such as this:

```javascript
[
  {
    username: "Kram",
    timeStamp: "10/12/2019",
    currentMessage: "Why do you code???"
  },
  {
    username: "Lotus",
    timeStamp: "Last Sunday at 8:46 PM",
    currentMessage: "Coding is fun"
  },
  {
    username: "Lotus",
    timeStamp: "Last Sunday at 8:46 PM",
    currentMessage: "Sort of"
  },
  {
    username: "Kram",
    timeStamp: "Yesterday at 8:46 PM",
    currentMessage: "Youre always ranting about it..."
  },
  {
    username: "Lotus",
    timeStamp: "Today at 8:46 PM",
    currentMessage: "Shhh I have my moments"
  }
];
```

##Installation
You can download this package from npm - https://www.npmjs.com/package/chatlog-line-parser

```
npm i chatlog-line-parser
```

##Usage

Simply call the function with an input:

```javascript
const chatlogLineParser = require("chatlog-line-parser");

let chatlog = chatlogLineParser.parse(
  "LotusLast Sunday at 8:46 PM\n" +
    "Coding is fun\n" +
    "KramYesterday at 8:46 PM\n" +
    "Youre always ranting about it..."
);

//Or you can feed the parser with an existing Array

let chatlog = chatlogLineParser.parse([
  "LotusLast Sunday at 8:46 PM",
  "Coding is fun",
  "KramYesterday at 8:46 PM",
  "Youre always ranting about it..."
]);

console.log(chatlog);
```
