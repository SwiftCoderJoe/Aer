module.exports = (client, db, msg) => {
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
      var key = `${guild.id}-${guildUser.user.id}`;
      db.run(`INSERT INTO users (key) SELECT (${key}) WHERE NOT EXISTS (SELECT 1 FROM users WHERE key = "${key}");`, function(err) {
        if (err) {
          return console.log(err.message + `This is most likely because the user already exists in the Users db.`);
        }
        console.log(`A new user has been inserted with key ${this.lastID}`);
        addDefaultData(guildUser.user.id, guild.id);
      });
    }
  }

  addDefaultData: function (UId, UGuild) {
    let key = `${UGuild}-${UId}`;
    let sql = `UPDATE users SET user = "${key}", guild = ${UGuild}, 0, 0, 0, 0 WHERE id = id_value;`
    db.run(sql, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Default values have now been added to ${this.changes}.`)
    });
  }
};
//db.run(`INSERT INTO users(key) VALUES(${guildUser.id}, ${guild.id}, 0, 0, 0, 0) WHERE NOT EXISTS(SELECT 1 FROM users WHERE key="${key}")`, [key]
//console.log(`user ${guildUser.id} is already in the db. Skipping...`);
