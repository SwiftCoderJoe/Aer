const { Command } = require(`discord.js-commando`)

module.exports = class warnsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `warns`,
      aliases: [`warntimes`, `timeswarned`],
      group: `moderation`,
      memberName: `warns`,
      description: `Shows how many times a specific user has been warned.`,
      guildOnly: true,
      examples: [`warns @user#0000`],
      args: [
        {
          key: `user`,
          prompt: `Who's warns would you like to see?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { user }) {
    try {
      const Database = require(`better-sqlite3`)
      const db = new Database(`${process.cwd()}/db/Data.db`, { /* verbose: console.log */ })
      const key = `g${msg.guild.id}u${user.id}`
      const stmt = db.prepare(`SELECT warntimes FROM users WHERE key = "${key}";`)
      const warns = stmt.get()
      msg.say(`User ${user.username} has been warned ${warns.warntimes} times.`)
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}
