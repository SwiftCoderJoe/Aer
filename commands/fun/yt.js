const { Command } = require(`discord.js-commando`)
const { MessageEmbed, Message } = require('discord.js') 
const ytdl = require('ytdl-core');
const AudioManager = require(`./../../libs/AudioManager.js`)

module.exports = class YTVCCommand extends Command {
  constructor (client) {
    super(client, {
      name: `yt`,
      aliases: [],
      group: `fun`,
      memberName: `yt`,
      description: `play a youtube video`,
      guildOnly: true,
      examples: [`aer yt [link]`],
      args: [
          {
              key: `link`,
              prompt: `What YouTube video would you like to play?`,
              type: `string`
          }
      ]
    })
  }
  async run (msg, { link } ) {
    try {
        if (msg.member.voice.channel) {
            // Join the voice call
            AudioManager.play(msg.member.voice.channel, ytdl(link, { filter: `audioonly`}), 1)
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