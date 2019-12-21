module.exports = (client, db, msg) => {

  console.log(`Logged in as ${client.user.tag}!`)

}
// db.run(`INSERT INTO users(key) VALUES(${guildUser.id}, ${guild.id}, 0, 0, 0, 0) WHERE NOT EXISTS(SELECT 1 FROM users WHERE key="${key}")`, [key]
// console.log(`user ${guildUser.id} is already in the db. Skipping...`);
