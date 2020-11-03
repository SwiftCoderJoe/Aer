const { Command } = require(`discord.js-commando`)

module.exports = class RemoveWarnsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `removewarn`,
      aliases: [],
      group: `moderation`,
      memberName: `removewarn`,
      description: `Removes a warn for a specific user.`,
      guildOnly: true,
      examples: [`removeWarn @user#0000`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to remove warn from?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { user }) {
    try {
      // Constants
      const Database = require(`better-sqlite3`)
      const config = require(`${process.cwd()}/config/config.json`)
      var strongRoles = config[msg.guild.id].moderation.modRoles
      let guildMembers = msg.guild.members 
      let callMember = guildMembers.cache.get(msg.author.id)
      let callMemberRoles = Array.from(callMember.roles.cache.array())
      const key = `g${msg.guild.id}u${user.id}`
      const db = new Database(`${process.cwd()}/db/Data.db`, { /* verbose: console.log */ })

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
        // Carry out removewarn
        const stmt = db.prepare(`UPDATE users SET warntimes = warntimes - 1 WHERE key = "${key}";`)
        stmt.run()

        // Reply
        msg.say(`A warn was successfully removed from ${user.username}.`)
        const channel = msg.guild.channels.cache.find(ch => ch.name === 'logs')

        // Log
        if (channel) {
          const stmt = db.prepare(`SELECT warntimes FROM users WHERE key = "${key}";`)
          const newWarns = stmt.get()
          channel.send(`${msg.author} removed a warn from user: ${user.username}.\nNew warnTimes value: ${newWarns.warntimes}`)
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
