const { Command } = require(`discord.js-commando`)

module.exports = class UnbanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `unban`,
      group: `moderation`,
      memberName: `unban`,
      description: `Unans selected user with selected reason.`,
      guildOnly: true,
      examples: [`unban @user#0000 a reason`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to unban?`,
          type: `user`
        },
        {
          key: `reason`,
          prompt: `For what reason is this person being unbanned?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { user, reason }) {
    try {
      var strongRoles = [`moderator`, `admin`] //members that can unban users
      let guildMembers = msg.guild.members //the members of the guild in a Collection
      let callMember = guildMembers.get(msg.author.id) //The guildMember who called the Unban command
      let callMemberRoles = Array.from(callMember.roles.values()) //The roles of the guildMember who called the Unban command
      
      // Check to make sure the user calling the command has the needed permissions
      var canUnban = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role in callMemberRoles) {
          if (callMemberRoles[role] === requiredRole) {
            canUnban = true
            return true
          }
        }
        return false
      })

      // Reply if the user calling the command does not have the required permissions.
      if (!canUnban) {
        msg.reply(`You don't have enough permissions to unban users.`)
        return
      }

      // Check to make sure the user being unbanned is actually already banned
      let userBanned = false // It makes me define it first for some reason
      msg.guild.fetchBans().then(bans => userBanned = bans.has(user.id))
  
      // Perform final checks
      if (!userBanned) {
        // If the user is not banned, do not try to unban him.
        msg.reply(`This user is not already banned.`)
      } else {
        // Actually ubban the user
        const banDM = user.createDM()
        banDM.send(`Congratulations! You were unbanned from ${msg.guild} by ${msg.author} for the reason "${reason}".`)
        msg.guild.unban(user, reason)
      }
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
