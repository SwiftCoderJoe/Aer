const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 

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
            // Join the voice call
            const connection = await msg.member.voice.channel.join()

            // Get death dispatcher
            const dispatcher = connection.play(`${process.cwd()}/audio/doing.ogg`)

            dispatcher.on(`finish`, () => {
                console.log(`Finished.`)
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