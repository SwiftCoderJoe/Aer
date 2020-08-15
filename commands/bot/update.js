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
          prompt: `NOTE: Updaing the bot will make the bot unavailable for a short time. NOTE: This command will update and restart the bot regardless of if there is an update available. Are you sure you want to do this? Reply with yes if you are sure.`,
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
          msg.reply(`A JS error has occured. Try waiting for a moment before retrying. Error: (${error.message})`)
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          msg.reply(`An STDERR error has occured. Try waiting for a moment before retrying. Error: (${stderr})`)
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
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
      });
        
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
