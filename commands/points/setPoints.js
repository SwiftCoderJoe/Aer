const { Command } = require(`discord.js-commando`)

module.exports = class SetPointsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `setpoints`,
      aliases: [],
      group: `points`,
      memberName: `setpoints`,
      description: `Sets the points for a specific user.`,
      guildOnly: true,
      examples: [`setpoints @user#0000 0`],
      args: [
        {
          key: `user`,
          prompt: `Which user's points should be set?`,
          type: `user`
        },
        {
          key: `number`,
          prompt: `What should the points value be set to?`,
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
      var canSetPoints = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of callMemberRoles) {
          if (role.id === requiredRole) {
            canSetPoints = true
            return true
          }
        }
        return false
      })


      if (canSetPoints) {
        // Carry out warn
        const stmt = db.prepare(`UPDATE users SET points = ${number} WHERE key = "${key}";`)
        stmt.run()

        // Reply
        msg.say(`Points for ${user.username} were successfully changed. Level will update when the user sends a message.`)

        // Log
        const channel = msg.guild.channels.cache.find(ch => ch.name === 'logs')
        if (channel) {
          const stmt = db.prepare(`SELECT points FROM users WHERE key = "${key}";`)
          const newPoints = stmt.get()
          channel.send(`${msg.author} changed points value for user: ${user.username}.\nNew points value: ${newPoints.points}`)
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
