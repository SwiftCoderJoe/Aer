const { Command } = require(`discord.js-commando`);

module.exports = class warnsCommand extends Command {
  constructor(client) {
    super(client, {
      name: `timeswarned`,
      aliases: [`warntimes`, `warns`],
      group: `userdata`,
      memberName: `timeswarned`,
      description: `Shows how many times a specific user has been warned.`,
      guildOnly: true,
      examples: [`timeswarned @user#0000`],
      args: [
        {
          key: `user`,
          prompt: `Who's warns would you like to see?`,
          type: `user`
        },
      ]
    });
  }
  run(msg, { user } ) {
    try {
      const key = `${msg.guild.id}-${user.id}`;
      msg.say(`User ${user.username} has been warned ${msg.author.data.get(key, `warnTimes`)}`);
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${
          e
        })`
      );
    }
  }
}
