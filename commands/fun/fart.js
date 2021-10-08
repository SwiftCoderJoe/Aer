const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class FartVCCommand extends Command {
  constructor (client) {
    super(client, {
      name: `fart`,
      aliases: [],
      group: `fun`,
      memberName: `fart`,
      description: `aer fart`,
      guildOnly: true,
      examples: [`fart`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {

            AudioManager.play(msg.member.voice.channel, `${process.cwd()}/audio/fart.ogg`, 1)

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