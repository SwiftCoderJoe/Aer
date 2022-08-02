const { Command } = require(`discord.js-commando`)

module.exports = class TTSCommand extends Command {
  constructor (client) {
    super(client, {
        name: `tts`,
        aliases: [],
        group: `moderation`,
        memberName: `tts`,
        description: `tts The fitnessgram pacer test is a multistage aerobic capacity test`,
        guildOnly: true,
        examples: [`general`],
        args: [
            {
                key: `ttsContent`,
                prompt: `What would you like to send?`,
                type: `string` 
            }
        ]
    })
  }
  run (msg, {ttsContent}) {
    try {
        if (msg.guild.id == 702241230225932292 || msg.guild.id == 894710836134834263) {
            var ttsWords = ttsContent.split(` `)

            var finalMessages = []
            var workingString = ""

            for (var word of ttsWords) {
                if ((workingString.length + word.length) < 200) {
                    workingString = workingString + " " + word
                } else {
                    finalMessages.push(workingString)
                    workingString = word
                }
            }

            finalMessages.push(workingString)

            for (var message of finalMessages) {
                msg.channel.send(message, {tts: true})
            }
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