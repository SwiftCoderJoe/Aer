const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 

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
            // Join the voice call
            const connection = await msg.member.voice.channel.join()

            // Get fart dispatcher
            const dispatcher = connection.play(`${process.cwd()}/audio/fart.ogg`)

            dispatcher.on(`finish`, () => {
                connection.disconnect()
            })
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