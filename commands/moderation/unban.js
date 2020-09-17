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
      const config = require(`${process.cwd()}/config/config.json`)
      var strongRoles = config[msg.guild.id].moderation.modRoles //members that can unban users
      let guildMembers = msg.guild.members //the members of the guild in a Collection
      let callMember = guildMembers.cache.get(msg.author.id) //The guildMember who called the Unban command
      let callMemberRoles = Array.from(callMember.roles.cache.array()) //The roles of the guildMember who called the Unban command
      
      // Check to make sure the user calling the command has the needed permissions
      var canUnban = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of callMemberRoles) {
          if (role.id === requiredRole) {
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
      var userBanned
      let bannedUsers = [] // It makes me define it first for some reason
      msg.guild.fetchBans().then(bans => {
        userBanned = bans.has(user.id)
        
        // Perform final checks
        if (!userBanned) {
          // If the user is not banned, do not try to unban him.
          msg.reply(`This user is not already banned.`)
        } else {
          // Actually unban the user 
          user.createDM().then(banDM => banDM.send(`Congratulations! You were unbanned from ${msg.guild} by ${msg.author} for the reason "${reason}".`))
          msg.guild.members.unban(user, reason)
          msg.reply(`Successfully unbanned user ${user}`)
          console.log(`^ If there is an error here, that is okay, because the bot cannot DM the user. We keep this command just in case someone has another server with the bot.`)
        }
      })

      //We are done!
      
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
