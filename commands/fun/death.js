const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class DeathVCCommand extends Command {
  constructor (client) {
    super(client, {
      name: `death`,
      aliases: [],
      group: `fun`,
      memberName: `death`,
      description: `aer death`,
      guildOnly: true,
      examples: [`death`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {

            AudioManager.play(msg.member.voice.channel, `${process.cwd()}/audio/death.ogg`, 0.05)

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