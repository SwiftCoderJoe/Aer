import { Command } from "discord.js-commando";

export default class SpamCommand extends Command {
  constructor (client) {
    super(client, {
      name: `spam`,
      group: `fun`,
      memberName: `spam`,
      description: `Spams someone nine times ;).`,
      examples: [`spam @user#0000`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to spam?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { user }) {
    try {
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
      msg.channel.send(`spam to ${user}`)
    } catch (e) {
      msg.reply(
        `An error has occured. Try waiting for a moment before retrying. Error: (${e})`
      )
    }
  }
}
