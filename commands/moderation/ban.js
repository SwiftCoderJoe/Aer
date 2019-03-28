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
        }
      ]
    })
  }
  run (msg, { user, reason }) {
    try {
      var strongRoles = [`moderator`, `admin`] //Roles that can ban, and also cannot be banned. Only one is required for it to take effect on that user.
      let guildMembers = msg.guild.members //members of the guild
      let banMember = msg.guild.members.get(msg.author.id) //The GuildMember that called the Ban command
      let banMemberRoles = Array.from(banMember.roles.values()) //GuildMember Roles
      let bannedMember = guildMembers.get(user.id) // The GuildMember being banned
      let bannedMemberRoles = Array.from(bannedMember.roles.values()) // The GuildMember Roles
      
      // Check to make sure the user that called the Ban command has the required strongRoles
      var canBan = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role in banMemberRoles) {
          if (role.name === requiredRole.name) {
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
      let cannotBan = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role in bannedMemberRoles) {
          if (role.name === requiredRole.name) {
            cannotBan = true
            return true
          }
        }
        return false
      })

      if (cannotBan) {
        msg.reply(`This user cannot be banned.`)
      } else {
        // Actually ban the user
        const banDM = user.createDM()
        banDM.send(`You were banned from ${msg.guild} by ${msg.author} for the reason "${reason}".`)
        msg.guild.ban(user, reason)
      } 
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
