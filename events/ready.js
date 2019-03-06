module.exports = (client, db, msg) => {

  function addDefaultData(UId, UGuild) {
    let key = `${UGuild}-${UId}`;
    let sql = db.prepare(`UPDATE users SET user = "${UId}", guild = ${UGuild}, points = 0, level = 0, lastPointMsg = 0, warntimes = 0 WHERE key = ${key};`);
    sql.run();
  }

  console.log(`Logged in as ${client.user.tag}!`);

  var guilds = Array.from(client.guilds.values());
  console.log(guilds.length);
  console.log(`running db check`);
  for(var j = 0; j < guilds.length; j++) {
    console.log(j);
    let guild = guilds[j];
    let guildMembers = Array.from(guild.members.values());
    for(var i = 0; i < guildMembers.length; i++) {
      console.log(i);
      let guildUser = guildMembers[i];
      if (guildUser.user.bot) return;
      var key = `${guild.id}-${guildUser.user.id}`;
      let stmt = db.prepare(`INSERT OR IGNORE INTO users (key) SELECT (${key}) WHERE NOT EXISTS (SELECT 1 FROM users WHERE key = "${key}");`);
      let changes = stmt.run()
      if (changes.changes == 1) {
        console.log(`A new user has been inserted with key ${key}`);
        addDefaultData(guildUser.user.id, guild.id);
      }
    }
  }

};
//db.run(`INSERT INTO users(key) VALUES(${guildUser.id}, ${guild.id}, 0, 0, 0, 0) WHERE NOT EXISTS(SELECT 1 FROM users WHERE key="${key}")`, [key]
//console.log(`user ${guildUser.id} is already in the db. Skipping...`);
