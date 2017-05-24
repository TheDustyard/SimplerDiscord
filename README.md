<div align="center">
  <br />
  <p>
    <!--<a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>-->
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/simpler-discord" align="center" style="width:100%">
      <img src="https://img.shields.io/npm/v/simpler-discord.svg?maxAge=3600" alt="NPM version" />
      <img src="https://img.shields.io/npm/dt/simpler-discord.svg?maxAge=3600" alt="NPM downloads" />
    </a>
    <a href="https://codeclimate.com/github/DusterTheFirst/SimplerDiscord"><img src="https://codeclimate.com/github/DusterTheFirst/SimplerDiscord/badges/gpa.svg"/></a>
    <a href="https://codeclimate.com/github/DusterTheFirst/SimplerDiscord"><img src="https://codeclimate.com/github/DusterTheFirst/SimplerDiscord/badges/issue_count.svg" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/simpler-discord/"><img src="https://nodei.co/npm/simpler-discord.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

![gif](https://cdn.discordapp.com/attachments/313657969994891264/316976357517033472/not_from_a_net.gif)

# Installation

# DOCS ARE OUT OF DATE, PLEASE MESSAGE DusterTheFirst#4191 ON DISCORD FOR HELP

## Use NPM
```npm install simpler-discord```

# Emoji

```js
var emoji = new SimplerDiscord.Emoji("god").toString();
```

# Mentions

```js
var mention = new SimplerDiscord.Mention(guild, "DusterTheFirst", "user").toString();
var mention = new SimplerDiscord.Mention(guild, "general", "channel").toString();
```
Where guild is the guild to get the mention in

# Commands

#### Create a command handler
```javascript
const SimplerDiscord = require("Simpler-Discord");

var Commands = new SimplerDiscord.CommandHandler("[command-prefix]");
```

#### Create A Command
```js
var PingCommand = new SimplerDiscord.Command("ping", null, "Ping the bot", Ping);
var CombineCommand = new SimplerDiscord.Command("combine", ["first", "second"], "Combine the two strings", Combine);
```
The first value in the constructor is the command name,
The second value is the arguments, set it as null for none, 
The third value is the commands' description, and lastly
The fourth value is the method to call

```js
function Ping(mesage, args, handler) {
    message.channel.send("pong");
}

function Combine(mesage, args, handler) {
    message.channel.send(args[0] + args[1]);
}
```
The command methods should take 3 parameters,
The message sent, 
The arguments (if you specified them above),
And the command handler that called it

#### Regester Your Commands
```js
Commands.AddCommand(PingCommand, "Utility Commands");
Commands.AddCommand(CombineCommand, "Utility Commands");
```
The first value is the command to add,
The second value is the catagory it should be in in the help command (optional)

#### Call Your Commands
```js
client.on('message', msg => {
    Commands.Handle(msg);
});
```
In your message event, add the handle method, and you will be done :)

EXAMPLE: 
```js
const Discord = require("discord.js");
const settings = require('./setting.json');
const SimplerDiscord = require("Simpler-Discord");

const client = new Discord.Client();

var Commands = new SimplerDiscord.CommandHandler("!");

var PingCommand = new SimplerDiscord.Command("ping", null, "Ping the bot", Ping);
var CombineCommand = new SimplerDiscord.Command("combine", ["first", "second"], "Combine the two strings", Combine);

Commands.AddCommand(PingCommand, "Utility Commands");
Commands.AddCommand(CombineCommand, "Utility Commands");

function Ping(mesage, args, handler) {
    message.channel.send("pong");
}

function Combine(mesage, args, handler) {
    message.channel.send(args[0] + args[1]);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    Commands.Handle(msg);
});

client.login(settings.token);
```
