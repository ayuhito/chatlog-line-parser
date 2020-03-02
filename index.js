"use strict";

class chatlogLineParser {
  //Begin the whole process of receiving the input and return a parsed format.
  static parse(logFile) {
    const parser = new chatlogLineParser();

    let messages = [];
    let currentMessage;

    //Ternary operator (condition ? exprIfTrue : exprIfFalse).
    const lines = Array.isArray(logFile) ? logFile : logFile.split(/\r?\n/);
    lines.forEach(line => {
      currentMessage = parser.process(line);
      if (currentMessage) {
        messages.push(currentMessage);
      }
    });

    return messages;
  }

  process(line) {
    let sortLine;

    //Identify username and timestamp line
    sortLine = sortUserTimeBool(line);
    if (sortLine) {
      this.username = sortLine.username;
      this.timeStamp = sortLine.timeStamp;
      this.irc = sortLine.irc;
    }

    //Identify if it is an actual message, then package it away.
    if (!sortLine || this.irc) {
      this.currentMessage;
      if (this.irc) {
        this.currentMessage = line.substring(
          line.indexOf("]") + this.username.length + 4,
          line.length
        );
      }
      this.messages = {
        username: this.username,
        timeStamp: this.timeStamp,
        currentMessage: this.currentMessage
      };

      return this.messages;
    }
  }
}

module.exports = chatlogLineParser;

//Try to match a Discord username+timestamp format. Example : LotusYesterday at 10:38 PM, LotusToday at 7:24 AM, LotusLast Friday at 10:26 AM, Lotus07/24/2019
function sortUserTimeBool(line) {
  const ddmmyyReg = /((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;
  const daytimeReg = /(?=Last|Yesterday|Today)(.*)|((([0]?[1-9]|1[0-2])(:|\.)[0-5][0-9]((:|\.)[0-5][0-9])?( )?(AM|am|aM|Am|PM|pm|pM|Pm))|(([0]?[0-9]|1[0-9]|2[0-3])(:|\.)[0-5][0-9]((:|\.)[0-5][0-9])?))$/;
  const IRCReg = /^([[0-9]{1,2}:[0-9][0-9].*?)\]/;
  const telegramReg = null;

  let irc = false;

  let sorted = line.match(ddmmyyReg);
  if (!sorted) {
    sorted = line.match(daytimeReg);
  }
  if (!sorted) {
    irc = true;
    sorted = line.match(IRCReg);
  }

  let username;
  if (sorted && sorted.length) {
    username = line.substring(0, line.length - sorted[0].length);
  }

  if (sorted && irc) {
    username = line.substring(sorted[0].length + 1, line.indexOf(": "));
    sorted[0] = sorted[0].replace(/[\[\]]/g, "");
  }

  //Ternary operator but Prettier doing weird stuff with formatting.
  return !sorted
    ? null
    : {
        username: String(username),
        timeStamp: String(sorted[0]),
        irc: Boolean(irc)
      };
}

console.log(
  chatlogLineParser.parse(
    "9:17 PM] justis: <3 I'm kidding.\n[9:17 PM] justis: Knock yourself out.\n[9:17 PM] Lotus: I just looked at the regex and reallly, what other sort of regex am I gonna use lol"
  )
);
