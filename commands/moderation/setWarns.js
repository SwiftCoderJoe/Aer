const { Command } = require(`discord.js-commando`)

module.exports = class SetWarnsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `setwarns`,
      aliases: [],
      group: `moderation`,
      memberName: `setwarns`,
      description: `Sets the WarnTimes for a specific user.`,
      guildOnly: true,
      examples: [`setWarns @user#0000 0`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to warn?`,
          type: `user`
        },
        {
          key: `number`,
          prompt: `What should the Warns be set to?`,
          type: `integer` 
        }

      ]
    })
  }
  run (msg, { user, number }) {
    try {
      // Constants
      const Database = require(`better-sqlite3`)
      const config = require(`${process.cwd()}/config/config.json`)
      const strongRoles = config[msg.guild.id].moderation.modRoles
      const guildMembers = msg.guild.members 
      // This is done to specifically get the guildMember
      const callMember = guildMembers.cache.get(msg.author.id)
      const callMemberRoles = Array.from(callMember.roles.cache.array())
      const db = new Database(`${process.cwd()}/db/Data.db`, { /* verbose: console.log */ })
      const key = `g${msg.guild.id}u${user.id}`

      // Check if permissions work
      var canWarn = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of callMemberRoles) {
          if (role.id === requiredRole) {
            canWarn = true
            return true
          }
        }
        return false
      })


      if (canWarn) {
        // Carry out warn
        const stmt = db.prepare(`UPDATE users SET warntimes = ${number} WHERE key = "${key}";`)
        stmt.run()

        // Reply
        msg.say(`Warns for ${user.username} were successfully changed.`)

        // Log
        const channel = msg.guild.channels.cache.find(ch => ch.name === 'logs')
        if (channel) {
          const stmt = db.prepare(`SELECT warntimes FROM users WHERE key = "${key}";`)
          const newWarns = stmt.get()
          channel.send(`${msg.author} changed Warntimes value for user: ${user.username}.\nNew warnTimes value: ${newWarns.warntimes}`)
        }

      } else {

        msg.say(`You cannot warn this user.`)

      }
      
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}
