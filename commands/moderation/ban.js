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
      // console.log(`user: ${user}`);
      // console.log(`reason: ${reason}`);
      var strongRoles = [`moderator`, `admin`]
      let guildMembers = msg.guild.members
      let banMember = msg.guild.members.get(msg.author.id)
      let banMemberRoles = Array.from(banMember.roles.values())
      let bannedMember = guildMembers.get(user.id)
      let bannedMemberRoles = Array.from(bannedMember.roles.values())
      
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
        msg.reply(`This would normally ban someone`)
        // const banDM = user.createDM()
        // banDM.send(`You were banned from ${msg.guild} by ${msg.author} for the reason "${reason}".`)
        // msg.guild.ban(user, reason)
      } 
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
