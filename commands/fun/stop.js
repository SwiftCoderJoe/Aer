const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class YTVCCommand extends Command {
  constructor (client) {
    super(client, {
      name: `stop`,
      aliases: [],
      group: `fun`,
      memberName: `stop`,
      description: `Stops any music currently playing`,
      guildOnly: true,
      examples: [`aer stop`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {
            // Join the voice call
            AudioManager.stop(msg.member.voice.channel)
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