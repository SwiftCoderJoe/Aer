const Database = require('better-sqlite3')
const { CommandoClient } = require(`discord.js-commando`)
const token = require(`${process.cwd()}/config/token.json`)

const path = require(`path`)

// discord stuff
// const Discord = require('discord.js')
// const discordclient = new Discord.Client()

// fs stuff
var fs = require(`fs`)

// commando stuff
const client = new CommandoClient({
  commandPrefix: `aer`,
  unknownCommandResponse: true,
  owner: `289158192955392001`,
  disableEveryone: true
})

client.registry
  .registerDefaultTypes()
  .registerGroups([
    [`main`, `"Main" commands.`],
    [`points`, `Various commands related to the points system.`],
    // [`pc`, `General stuff about computers.`],
    // [`economy`, `Economy related commands.`],
    // [`animals`, `All sorts of animal related commands.`],
    //[`fun`, `Very fun commands ;)`],
    /* [`mods`, `Moderation related commands.`], */
    // [`owner`, `Owner-only commands.`],
    //[`info`, `Informative commands.`],
    //[`userdata`, `Shows data about a particular user.`],
    [`moderation`, `Moderation related commands.`],
    [`bot`, `Commands that allow you to manipulate the bot without the command line.`]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, `commands`))

/* let db = new sqlite3.Database(`${fsd}db/Data.db`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the data database.');
}); */

const db = new Database(`./db/Data.db`, { /* verbose: console.log */ })

const sql = db.prepare(`CREATE TABLE IF NOT EXISTS users (
      key TEXT PRIMARY KEY,
      user TEXT,
      guild TEXT,
      points INTEGER,
      level INTEGER,
      lastPointMsg INTEGER,
      warntimes INTEGER);`)
sql.run()

fs.readdir(`./events/`, (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith(`.js`)) return
    const event = require(`./events/${file}`)
    let eventName = file.split(`.`)[0]
    client.on(eventName, event.bind(null, client, db))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

client.login(token.token);

