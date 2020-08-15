module.exports = (client, db, msg) => {

  if (msg.author.bot) return
  if (!msg.guild) return

  const multiSearch = require(`${process.cwd()}/libs/multiSearch.js`)
  const removeFirstMention = require(`${process.cwd()}/libs/removeFirstMention.js`)
  const config = require(`${process.cwd()}/config/config.json`)
  const guild = msg.guild.id
  var d = new Date()

  const key = `g${msg.guild.id}u${msg.author.id}`

  /*
  --Data Table--
  client.data.ensure(key, {
  user: msg.author.id,
  guild: msg.guild.id,
  points: 0,
  level: 1,
  lastPointMsg: 0,
  warntimes: 0
  });
  */

  const stmt = db.prepare(`SELECT * FROM users WHERE key = "${key}";`)
  let userData = stmt.get()

  let badWords = [`fuck`, `shit`, `ass`, `bitch`, `nigger`]

  if (!config[guild].moderation.allowSwearWords) {
    if (multiSearch.multiSearchFor(msg, badWords)) {
      msg.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}, due to LANGUAGE`))
        .catch(console.error)
      msg.reply(`Why so salty? No bad language in ${msg.guild}.`)
      let sql = db.prepare(`UPDATE users SET warnTimes = ${userData.warntimes + 1} WHERE key = "${key}";`)
      sql.run()
      const channel = msg.guild.channels.cache.find(ch => ch.name === 'logs')
      if (channel) {
        channel.send(`warned user: ${msg.author.username} due to LANGUAGE. New warnTimes value: ${userData.warntimes + 1}`)
      }
    }
  }

  let timeSent = d.getTime()

  if (userData.lastPointMsg < (timeSent - 60000)) {
    let sql = db.prepare(`UPDATE users SET points = ${userData.points + 1} WHERE key = "${key}"`)
    sql.run()
    sql = db.prepare(`UPDATE users SET lastPointMsg = ${timeSent} WHERE key = "${key}"`)
    sql.run()
  }

  const curLevel = Math.floor(
    0.25 * Math.sqrt(userData.points)
  )

  console.log(`User ${msg.author.username} now has ${userData.points} points. Level ${curLevel} expected, level ${userData.level}, lastSent = ${userData.lastPointMsg}`)

  if (userData.level < curLevel) {

    if (config[guild].points.infoChannel === "") {
      msg.reply(`you've leveled up to level **${curLevel}**!`)
    } else {
      client.guilds.cache.get(guild).channels.cache.get(config[guild].points.infoChannel).send(`${msg.author}, you've leveled up to level **${curLevel}**!`)
    }

    let sql = db.prepare(`UPDATE users SET level = ${curLevel} WHERE key = "${key}";`)
    sql.run()

    

    if (config[guild].points.levelUpRoles.hasOwnProperty(curLevel.toString())) {
      msg.member.roles.add(msg.member.guild.roles.cache.get(config[guild].points.levelUpRoles[curLevel.toString()]))

      if (config[guild].points.infoChannel === "") {
        msg.reply(`you've been given the role **${msg.member.guild.roles.cache.get(config[guild].points.levelUpRoles[curLevel.toString()]).name}** because you leveled up to level **${curLevel}**!`)
      } else {
        client.guilds.cache.get(guild).channels.cache.get(config[guild].points.infoChannel).send(`${msg.author}, you've been given the role **${msg.member.guild.roles.cache.get(config[guild].points.levelUpRoles[curLevel.toString()]).name}** because you leveled up to level **${curLevel}**!`)
      }
      
    }
  }
}
