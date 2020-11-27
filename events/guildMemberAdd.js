module.exports = (client, db, member) => {
  const config = require(`${process.cwd()}/config/config.json`)

  // MARK: Welcome message

  // Look for member info channel
  const channel = member.guild.channels.cache.get(config[member.guild.id].members.infoChannel)
  // If it exists, send a message
  if (channel) {
    var welcomeText = config[member.guild.id].members.memberAddMessage.replace(/%USER%/gmi, member).replace(/%GUILDNAME%/gmi, `**${member.guild}**`)

    channel.send(welcomeText);
  }

  // MARK: Database add

  // Insert a new database entry if it doesn't already exist
  var key = `g${member.guild.id}u${member.id}`
  let stmt = db.prepare(`INSERT OR IGNORE INTO users (key) VALUES ("${key}")`)
  let changes = stmt.run()
  if (changes.changes === 1) {
    console.log(`A new user has been inserted with key ${key}. Adding default data...`)
    // Add default data to user
    let sql = db.prepare(`UPDATE users SET user = "${member.id}", guild = ${member.guild.id}, points = 0, level = 0, lastPointMsg = 0, warntimes = 0 WHERE key = "${key}";`)
    sql.run()
  }
}
