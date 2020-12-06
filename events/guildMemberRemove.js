module.exports = (client, db, member) => {
  const guild = member.guild.id
  const UID = member.id
  const key = `g${guild}u${UID}`

  const config = require(`${process.cwd()}/config/config.json`)

  // Look for member info channel
  const channel = member.guild.channels.cache.get(config[member.guild.id].members.infoChannel)
  // If it exists, send a message
  if (channel) {
    var welcomeText = config[member.guild.id].members.memberRemoveMessage.replace(/%USER%/gmi, member).replace(/%GUILDNAME%/gmi, `**${member.guild}**`)

    channel.send(welcomeText);
  }

  // Remove user from database
  const sql = db.prepare(`DELETE FROM users WHERE key = "${key}"`)
  let changes = sql.run()

  if (changes.changes === 1) {
    console.log(`Successfully removed the defunct user ${UID} from ${guild}`)
  }

}