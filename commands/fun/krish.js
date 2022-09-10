const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `krish`,
      aliases: [],
      group: `fun`,
      memberName: `krish`,
      description: `aer krish`,
      guildOnly: true,
      examples: [`krish`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {
            AudioManager.play(msg.member.voice.channel, `${process.cwd()}/audio/krish.ogg`, 1)
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