const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class DoingVCCommand extends Command {
  constructor (client) {
    super(client, {
      name: `doing`,
      aliases: [],
      group: `fun`,
      memberName: `doing`,
      description: `aer doing`,
      guildOnly: true,
      examples: [`doing`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {

            AudioManager.play(msg.member.voice.channel, `${process.cwd()}/audio/doing.ogg`, 1)

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