const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')

module.exports = class dadjokeCommand extends Command {
  constructor (client) {
    super(client, {
      name: `dadjoke`,
      aliases: [],
      group: `fun`,
      memberName: `dadjoke`,
      description: `aer dadjoke`,
      guildOnly: true,
      examples: [`dadjoke`],
      args: []
    })
  }
  run (msg) {
    try {
        // If this message is a reply to another message, do something special.
        // WARN: This should be updated to use msg.interactions when we update to v13.
        if (msg.reference != undefined) {

            // First, fetch the initial message. If the message is not in the same channel (announcement channels), then the command will fall back to the catch and fail silently (intended).
            msg.channel.messages.fetch(msg.reference.messageID)
            .then(message => {
                // First, look for i'm, im, I am, etc.
                var matchLocation = message.content.match(/I('| a|)m[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]? /mi)

                if (matchLocation != null) {

                    // If a match is found, pull out the rest of the message.
                    var jokeSubstring = message.content.substring(matchLocation.index + matchLocation[0].length)

                    // Reply with the joke.
                    message.reply(`Hey ${jokeSubstring}, I'm Aer.`)
                }
            })
            .catch(console.error)
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