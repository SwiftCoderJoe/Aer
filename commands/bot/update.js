const { Command } = require(`discord.js-commando`)
const { exec } = require("child_process");

module.exports = class BanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `update`,
      group: `bot`,
      memberName: `update`,
      description: `Updates the bot to the latest remote Git version, then restarts it.`,
      guildOnly: true,
      examples: [`update`],
      args: [
        {
          key: `confirm`,
          prompt: `Updaing the bot will make the bot unavailable for a short time. Are you sure you want to do this? Reply with yes if you are sure.`,
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

      var canUpdate = false
      strongRoles.some(function (requiredRole, _index1) {
        for (let role of callMemberRoles) {
          if (role.id === requiredRole) {
            canUpdate= true
            return true
          }
        }
        return false
      })

      if (!canUpdate) {
        msg.reply(`You cannot update this bot.`)
        return
      }

      msg.reply(`Updating...`)

      exec(`sh ${process.cwd()}/scripts/update.sh`, (error, stdout, stderr) => {
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
        if (stdout === "Already up to date.\n") {
            msg.reply(`The bot is already up to date with the newest commit on this git branch.`)
        } else {
            msg.reply(`Git pull returned a value that was not "Already up to date.". Restarting...`)

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
              
        }
      });
        
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
