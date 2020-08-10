module.exports = (client, db, member) => {

  // MARK: Welcome message

  // Look for "new-members" channel
  const channel = member.guild.channels.cache.find(ch => ch.name === 'new-members')
  // If it doesn't exist, skip
  if (!channel) return
  // Send welcome message
  channel.send(`Welcome to the server, ${member}`);

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
