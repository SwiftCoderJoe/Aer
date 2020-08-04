const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require('discord.js')
let randomHexColor = require(`random-hex-color`)

module.exports = class RankCommand extends Command {
  constructor (client) {
    super(client, {
      name: `rank`,
      aliases: [`r`],
      group: `points`,
      memberName: `rank`,
      description: `Shows your rank in this server.`,
      guildOnly: true,
      examples: [`rank @SwiftCoderJoe#8510`],
      args: [
        {
          key: `user`,
          prompt: `Who's rank would you like to see?`,
          type: `user`,
          default: ``
        }
      ]
    })
  }
  run (msg, { user }) {
    try {
      const Database = require(`better-sqlite3`)
      const db = new Database(`${process.cwd()}/db/Data.db`, { /* verbose: console.log */ })

      let sql = db.prepare(`SELECT DISTINCT points points, level level, user user FROM users WHERE guild = ${msg.guild.id} ORDER BY points;`)

      var sorted = sql.all()
      /* const filtered = this.client.data
        .filter(p => p.guild === msg.guild.id)
        .array();
      const sorted = filtered.sort((a, b) => b.points - a.points); */
      sorted.reverse()
      var rankUser
      var userRank = 0
      if (user === ``) {
        user = msg.author.id
      }
      for (rankUser of sorted) {
        userRank++
        if (rankUser.user === user) {
          break
        }
      } 
      console.log(user)
      const embed = new MessageEmbed()
        .setTitle(`**Rank ${userRank}**`)
        .setAuthor(`${user.username}#${user.discriminator}`, this.client.user.avatarURL)
        .setDescription(`**${rankUser.points}** points (level **${rankUser.level}**)`)
        .setColor(randomHexColor())
      msg.say(embed)
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      )
    }
  }
}
