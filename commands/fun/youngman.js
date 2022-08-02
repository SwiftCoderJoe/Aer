const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `youngman`,
      aliases: [`ym`],
      group: `fun`,
      memberName: `youngman`,
      description: `aer youngman`,
      guildOnly: true,
      examples: [`youngman`],
      args: []
    })
  }
  run (msg) {
    try {
      console.log(msg.guild.id)
      switch(msg.guild.id) {
        // HQ
        case `702241230225932292`:
        case `894710836134834263`:
          msg.reply("youngman")
          msg.channel.send("https://media.discordapp.net/attachments/894710836650725397/995509893039665173/ym.gif")
          break;

        // People Talking
        case `716011492071440505`:
          break;

        // Do nothing everywhere else
        default:
          console.log("default")
          break;
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