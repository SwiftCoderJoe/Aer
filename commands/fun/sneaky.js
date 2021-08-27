const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')

module.exports = class youngmanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `sneaky`,
      aliases: ['s'],
      group: `fun`,
      memberName: `sneaky`,
      description: `aer sneaky`,
      guildOnly: true,
      examples: [`sneaky`],
      args: []
    })
  }
  run (msg) {
    try {
        msg.guild.members.fetch(msg.author.id)
            .then(guildmember => guildmember.roles.add('721592018257838141'))
            .catch(console.error)
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}