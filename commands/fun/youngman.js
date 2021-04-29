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
      msg.reply("youngman")
      msg.channel.send("https://media.discordapp.net/attachments/724009203072761876/758293460255506462/image0_31-1.gif")
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}