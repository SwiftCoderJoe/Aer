module.exports = (client, db, msg) => {
  const config = require(`${process.cwd()}/config/config.json`);

  console.log(`Logged in as ${client.user.tag}!`)

  var guilds = Array.from(client.guilds.cache.array())
  console.log(`DATABASE_CHECK: Running startup database check...`)
  // Iterate through each guild, and then through every member of every guild
  for (guild of guilds) {
    guild.members.fetch().then(guildMembersFetched => {let guildMembers = Array.from(guildMembersFetched.array())

    console.log(`DATABASE_CHECK: Checking guild ${guildMembers[0].guild}...`)

    // Iterate through each user
    for (guildUser of guildMembers) {

      console.log(`DATABASE_CHECK: Checking user ${guildUser} from guild ${guildUser.guild}...`)

      // Don't add bots to DB
      if (guildUser.user.bot) continue;

      var key = `g${guildUser.guild.id}u${guildUser.user.id}`

      // Insert a new user if they don't already exist

      let stmt = db.prepare(`INSERT OR IGNORE INTO users (key) VALUES ("${key}")`)
      let changes = stmt.run()

      // If they didn't exist, log it and add default data
      if (changes.changes === 1) {

        console.log(`DATABASE_CHECK: User ${guildUser} has been inserted with key ${key}. Adding default data...`)
        addDefaultData(key, guildUser.id, guildMembers.guild);

      } else {
        // If they do exist, audit their entry
        auditUser(key, guildUser)
      }
    }
  });
    
  }

  console.log(`DATABASE_CHECK: DB check complete.`)

  
  function addDefaultData (key, UId, UGuild) {
    let sql = db.prepare(`UPDATE users SET user = "${UId}", guild = ${UGuild}, points = 0, level = 0, lastPointMsg = 0, warntimes = 0 WHERE key = "${key}";`)
    sql.run()
  }
  
  function auditUser (key, guildUser) {
    // Get all user data
    let stmt = db.prepare(`SELECT * FROM users WHERE key = "${key}";`)
    const userData = stmt.get()
  
    // Compute level
    const curLevel = Math.floor(
      parseFloat(config[guildUser.guild.id].points.difficulty)
      *
      Math.sqrt(userData.points)
    )
  
    console.log(`DATABASE_CHECK: Starting audit for user ${guildUser} of ${guildUser.guild}: points = ${userData.points}, actual level = ${userData.level}, computed level = ${curLevel}, lastPointMsg = ${userData.lastSent}, warns = ${userData.warnTimes}`);
  
    // If computed level != actual level, update it
    if (userData.level != curLevel) {
      console.log("Found incorrect level. Fixing...")
      stmt = db.prepare(`UPDATE users SET level = ${curLevel} WHERE key = "${key}"`)
      stmt.run();
    }
  }
}

// let stmt = db.prepare(`INSERT OR IGNORE INTO users (key) SELECT (${key}) WHERE NOT EXISTS (SELECT 1 FROM users WHERE key = "${key}");`)
// db.run(`INSERT INTO users(key) VALUES(${guildUser.id}, ${guild.id}, 0, 0, 0, 0) WHERE NOT EXISTS(SELECT 1 FROM users WHERE key="${key}")`, [key]
// console.log(`user ${guildUser.id} is already in the db. Skipping...`);
