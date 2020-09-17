const { Command } = require(`discord.js-commando`)

module.exports = class warnsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `warn`,
      aliases: [],
      group: `moderation`,
      memberName: `warn`,
      description: `Warns a specific user.`,
      guildOnly: true,
      examples: [`warn @user#0000 ALL CAPS TYPING`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to warn?`,
          type: `user`
        },
        {
          key: `reason`,
          prompt: `For what reason is this user being warned?`,
          type: `string` 
        }

      ]
    })
  }
  run (msg, { user, reason }) {
    try {
      const Database = require(`better-sqlite3`)

      const config = require(`${process.cwd()}/config/config.json`)
      var strongRoles = config[msg.guild.id].moderation.modRoles
      let guildMembers = msg.guild.members 
      let callMember = guildMembers.cache.get(msg.author.id)
      let callMemberRoles = Array.from(callMember.roles.cache.array())

      const db = new Database(`${process.cwd()}/db/Data.db`, { /* verbose: console.log */ })
      const key = `g${msg.guild.id}u${user.id}`
      const stmt = db.prepare(`UPDATE users SET warntimes = warntimes + 1 WHERE key = "${key}";`)
      stmt.run()

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
        msg.say(`User ${user.username} was warned successfully.`)
        const channel = msg.guild.channels.cache.find(ch => ch.name === 'logs')
        if (channel) {
          const stmt = db.prepare(`SELECT warntimes FROM users WHERE key = "${key}";`)
          const newWarns = stmt.get()
          channel.send(`${msg.author} warned user: ${user.username}.\nReason: ${reason}\nNew warnTimes value: ${newWarns.warntimes}`)
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
