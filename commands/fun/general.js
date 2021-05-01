const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `general`,
      aliases: [],
      group: `fun`,
      memberName: `general`,
      description: `aer general`,
      guildOnly: true,
      examples: [`general`],
      args: []
    })
  }
  run (msg) {
    try {
        msg.channel.send("https://tenor.com/view/discord-staff-staff-gif-19225864")
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}