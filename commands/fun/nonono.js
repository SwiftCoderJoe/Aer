const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `nononono`,
      aliases: [`no`],
      group: `fun`,
      memberName: `nononono`,
      description: `aer nononono`,
      guildOnly: true,
      examples: [`nononono`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {
            AudioManager.play(msg.member.voice.channel, `${process.cwd()}/audio/reggie.ogg`, 1)
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