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
      examples: [`leaderboard`]
    })
  }
  run (msg) {
    try {
      const Database = require(`better-sqlite3`)
      const db = new Database(`${process.cwd()}/db/Data.db`, { /* verbose: console.log */ })

      let sql = db.prepare(`SELECT DISTINCT points points, level level, user user FROM users WHERE guild = ${msg.guild.id} ORDER BY points;`)

      var sorted = sql.all()
      /* const filtered = this.client.data
        .filter(p => p.guild === msg.guild.id)
        .array();
      const sorted = filtered.sort((a, b) => b.points - a.points); */
      console.log(sorted)
      sorted.reverse()
      const top10 = sorted.splice(0, 10)
      const embed = new MessageEmbed()
        .setTitle(`Leaderboard`)
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setDescription(`Our top 10 points leaders!`)
        .setColor(randomHexColor())
      for (const data of top10) {
        console.log(data.user)
        embed.addField(
          this.client.users.cache.get(data.user).tag,
          `**${data.points}** points (level **${data.level}**)`,
          true
        )
      }
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
