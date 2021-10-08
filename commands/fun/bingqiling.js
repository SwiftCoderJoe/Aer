const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `bingqiling`,
      aliases: [`bql`],
      group: `fun`,
      memberName: `binqiling`,
      description: `aer bingqiling`,
      guildOnly: true,
      examples: [`binqiling`],
      args: []
    })
  }
  async run (msg) {
    try {
        if (msg.member.voice.channel) {
            // Join the voice call
            const connection = await msg.member.voice.channel.join()

            // Get death dispatcher
            const dispatcher = connection.play(`${process.cwd()}/audio/bql.ogg`)

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