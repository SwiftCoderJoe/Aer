const { Command } = require(`discord.js-commando`)

module.exports = class BanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `ban`,
      group: `moderation`,
      memberName: `ban`,
      description: `Bans selected user with selected reason.`,
      guildOnly: true,
      examples: [`ban @user#0000 a reason`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to ban?`,
          type: `user`
        },
        {
          key: `reason`,
          prompt: `For what reason is this person being banned?`,
          type: `string`
        },
        {
          key: `daysToDelete`,
          prompt: `How many days of this person's messages should be deleted?`,
          type: `integer`
          //default: 0
        }
      ]
    })
  }
  run (msg, { user, reason, daysToDelete }) {
    try {
      var strongRoles = [`moderator`, `admin`] //Roles that can ban, and also cannot be banned. Only one is required for it to take effect on that user.
      let guildMembers = msg.guild.members //members of the guild in a Collection
      let callMember = msg.guild.members.cache.get(msg.author.id) //The GuildMember that called the Ban command
      let callMemberRoles = Array.from(callMember.roles.cache.array()) //GuildMember Roles
      let targetMember = guildMembers.cache.get(user.id) // The GuildMember being banned
      let targetMemberRoles = Array.from(targetMember.roles.cache.values()) // The GuildMember Roles
      
      // Check to make sure the user that called the Ban command has the required strongRoles
      var canBan = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of callMemberRoles) { 
          if (role.name === requiredRole) {
            canBan = true
            return true
          }
        }
        return false
      })

      if (!canBan) {
        msg.reply(`You don't have enough permissions to ban users.`)
        return
      }

      // Check to make sure that the user being banned doesn't have any strongRoles
      let cannotBanTarget = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of targetMemberRoles) {
          if (role.name === requiredRole) {
            cannotBanTarget = true
            return true
          }
        }
        return false
      })

      if (cannotBanTarget) {
        msg.reply(`This user cannot be banned.`)
      } else {
        // Actually ban the user
        user.createDM().then(banDM => banDM.send(`You were banned from ${msg.guild} by ${msg.author} for the reason "${reason}".`))
        //targetMember.kick()
        msg.guild.members.ban(user, daysToDelete, reason)
        msg.reply(`Successfully banned user ${user}`)
      } 
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
