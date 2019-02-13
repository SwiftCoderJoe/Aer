const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require('discord.js');
let randomHexColor = require(`random-hex-color`);

module.exports = class LeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: `leaderboard`,
      aliases: [`lb`, `leaders`, `top10`, `top`],
      group: `points`,
      memberName: `leaderboard`,
      description: `Shows the top ten users with the most points.`,
      guildOnly: true,
      examples: [`leaderboard`]
    });
  }
  run(msg) {
    try {
      const filtered = this.client.data
        .filter(p => p.guild === msg.guild.id)
        .array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, 10);
      const embed = new RichEmbed()
        .setTitle(`Leaderboard`)
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setDescription(`Our top 10 points leaders!`)
        .setColor(randomHexColor());
      for (const data of top10) {
        embed.addField(
          this.client.users.get(data.user).tag,
          `**${data.points}** points (level **${data.level}**)`,
          true
        );
      }
      msg.say({ embed });
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      );
    }
  }
}
