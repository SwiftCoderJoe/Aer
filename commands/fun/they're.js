const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `they're`,
      aliases: [],
      group: `fun`,
      memberName: `they're`,
      description: `aer they're`,
      guildOnly: true,
      examples: [`they're`],
      args: []
    })
  }
  run (msg) {
    try {
        msg.channel.send("https://tenor.com/view/memes-meme-ironic-explosion-gif-18934104")
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}