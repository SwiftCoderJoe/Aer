const { Command } = require(`discord.js-commando`);

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: `ban`,
      group: `moderation`,
      memberName: `ban`,
      description: `Bans selected user with selected reason.`,
      guildOnly: true,
      examples: [`ban @user#0000 a reason`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to ban?`,
          type: `user`
        },
        {
          key: `reason`,
          prompt: `For what reason is this person being banned?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { user, reason }) {
    try {
      //console.log(`user: ${user}`);
      //console.log(`reason: ${reason}`);
      let guildMembers = Array.from(msg.guild.members.values());
      let banMember = guildMembers[msg.author.id]
      let banMemberRoles = Array.from(banMember.roles.values());
      let bannedMember = guildMembers[user.id]
      let bannedMemberRoles = Array.from(bannedMember.roles.values());
      if (banMem)
      const banDM = user.createDM()
      banDM.send(`You were banned from ${msg.guild} by ${msg.author} for the reason "${reason}".`);
      msg.guild.ban(user, reason);
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      );
    }
  }
}
