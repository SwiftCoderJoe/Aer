module.exports = (client, db, msg) => {

  function addDefaultData (UId, UGuild) {
    let key = `g${UGuild}u${UId}`
    let sql = db.prepare(`UPDATE users SET user = "${UId}", guild = ${UGuild}, points = 0, level = 0, lastPointMsg = 0, warntimes = 0 WHERE key = "${key}";`)
    sql.run()
  }

  console.log(`Logged in as ${client.user.tag}!`)

  var guilds = Array.from(client.guilds.cache.array())
  console.log(`DATABASE_CHECK: Running startup database check...`)
  // Iterate through each guild, and then through every member of every guild
  for (guild of guilds) {
    guild.members.fetch().then(guildMembersFetched => {let guildMembers = Array.from(guildMembersFetched.array())

    console.log(`DATABASE_CHECK: Checking guild ${guild}...`)

    for (guildUser of guildMembers) {

      console.log(`DATABASE_CHECK: Checking user ${guildUser} from guild ${guild}...`)

      if (guildUser.user.bot) continue;

      var key = `g${guild.id}u${guildUser.user.id}`

      // Insert a new user if they don't already exist

      let stmt = db.prepare(`INSERT OR IGNORE INTO users (key) VALUES ("${key}")`)
      let changes = stmt.run()

      // If they didn't exist, log it and add default data
      if (changes.changes === 1) {
        console.log(`DATABASE_CHECK: User ${guildUser} has been inserted with key ${key}. Adding default data...`)
        addDefaultData(guildUser.user.id, guild.id)
      }
    }
  });
    
  }

  console.log(`DATABASE_CHECK: DB check complete.`)
}
// let stmt = db.prepare(`INSERT OR IGNORE INTO users (key) SELECT (${key}) WHERE NOT EXISTS (SELECT 1 FROM users WHERE key = "${key}");`)
// db.run(`INSERT INTO users(key) VALUES(${guildUser.id}, ${guild.id}, 0, 0, 0, 0) WHERE NOT EXISTS(SELECT 1 FROM users WHERE key="${key}")`, [key]
// console.log(`user ${guildUser.id} is already in the db. Skipping...`);
