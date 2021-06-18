const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 

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
        console.log(`Fired`)
        console.log(msg.member.voice)

        if (msg.member.voice.channel) {
            console.log(`Made it here`)

            // Join the voice call
            const connection = await msg.member.voice.channel.join()

            // Get death dispatcher
            const dispatcher = connection.play(`${process.cwd()}/audio/death.mp3`)
            dispatcher.setVolume(0.05)

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