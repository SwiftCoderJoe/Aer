const sqlite3 = require('sqlite3').verbose();
const { CommandoClient } = require(`discord.js-commando`);
﻿const fsd = "/Users/Kids/Documents/GitHub/dbt-beta/"
const path = require(`path`);

//discord stuff
const Discord = require('discord.js');
const discordclient = new Discord.Client();

//fs stuff
var fs = require("fs");

//commando stuff
const client = new CommandoClient({
  commandPrefix: "dbt",
  unknownCommandResponse: true,
  owner: "@289158192955392001",
  disableEveryone: true
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    [`main`, `"Main" commands.`],
    [`points`, `Various commands related to the points system.`],
    //[`pc`, `General stuff about computers.`],
    //[`economy`, `Economy related commands.`],
    //[`animals`, `All sorts of animal related commands.`],
    [`fun`, `Very fun commands ;)`],
    /*[`mods`, `Moderation related commands.`],*/
    //[`owner`, `Owner-only commands.`],
    [`info`, `Informative commands.`],
    [`userdata`, `Shows data about a particular user.`]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, `commands`));

let db = new sqlite3.Database(`${fsd}db/Data.db`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the data database.');
});

var sql = `CREATE TABLE IF NOT EXISTS users (
      key TEXT PRIMARY KEY,
      user TEXT,
      guild TEXT,
      points INTEGER,
      level INTEGER,
      lastPointMsg INTEGER,
      warntimes INTEGER)`;
db.run(sql);


fs.readdir(`${fsd}events/`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`${fsd}events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client, db));
    delete require.cache[require.resolve(`${fsd}events/${file}`)];
  });
});

client.login('NTQyNDYxOTI3NDk1MDQxMDM0.DzuWjg.g0tHJ_lM5e0fWF9QxNHECS0yNiA');
