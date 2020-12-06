const { Command } = require(`discord.js-commando`)
const { exec } = require("child_process");

module.exports = class RestartCommand extends Command {
  constructor (client) {
    super(client, {
      name: `restart`,
      group: `bot`,
      memberName: `restart`,
      description: `Restarts the bot with PM2.`,
      guildOnly: true,
      examples: [`restart`],
      args: [
        {
          key: `confirm`,
          prompt: `Restarting the bot will make the bot unavailable for a short time. Are you sure you want to do this? Reply with yes if you are sure.`,
          type: `string`
        },
      ]
    })
  }
  run (msg, { confirm }) {
    try {
      const config = require(`${process.cwd()}/config/config.json`)
      var strongRoles = config[msg.guild.id].moderation.modRoles //members that can unban users
      let guildMembers = msg.guild.members //the members of the guild in a Collection
      let callMember = guildMembers.cache.get(msg.author.id) //The guildMember who called the Unban command
      let callMemberRoles = Array.from(callMember.roles.cache.array()) //The roles of the guildMember who called the Unban command

      if (!(confirm.toLowerCase() === "yes")) {
        msg.reply(`Stopping command...`)
        return
      }

      var canRestart = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of callMemberRoles) {
          if (role.id === requiredRole) {
            canRestart= true
            return true
          }
        }
        return false
      })

      if (!canRestart) {
        msg.reply(`You cannot restart this bot.`)
        return
      }

      msg.reply(`Restarting...`)

      exec(`sh ${process.cwd()}/scripts/restart.sh`, (error, stdout, stderr) => {
        if (error) {
          msg.reply(`An error has occured. Try waiting for a moment before retrying. Error: (${error.message})`)
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          msg.reply(`An error has occured. Try waiting for a moment before retrying. Error: (${stderr})`)
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
        
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
