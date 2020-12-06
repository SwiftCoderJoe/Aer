module.exports = (client, db, msg) => {

  if (msg.author.bot) return
  if (!msg.guild) return


  // This is done to make the recursive setTimeout easier to understand
  messageFunction(0)

  function messageFunction(tryNum) {

    const multiSearch = require(`${process.cwd()}/libs/multiSearch.js`)
    const removeFirstMention = require(`${process.cwd()}/libs/removeFirstMention.js`)
    const config = require(`${process.cwd()}/config/config.json`)
    const guild = msg.guild.id
    var d = new Date()
  
    const key = `g${msg.guild.id}u${msg.author.id}`

    // Get required DB info, if it isn't ready yet, retry in  
  
    const stmt = db.prepare(`SELECT * FROM users WHERE key = "${key}";`)
    const userData = stmt.get()

    if (userData === undefined) {
  
      // If the third try fails, log the error and move on.
      if (tryNum === 3) {
        console.log(`ERROR: after trying 3 times, DB info was not yet ready. RECOMMENDATION: Restart bot or audit DB.`)
        return
      }
  
      // If this isn't the third try, try again in 200ms and log it.
      console.log(`WARNING: DB info was not yet ready for the message event. This is due to a race condition, it is safe to ignore this error.`)
      tryNum = tryNum + 1
      setTimeout(messageFunction, 500, tryNum)
      return
    }
  
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
  
  
    const badWords = [`fuck`, `shit`, `ass`, `bitch`, `nigger`]
  
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
  
    const timeSent = d.getTime()
  
    if (userData.lastPointMsg < (timeSent - 60000)) {
      let sql = db.prepare(`UPDATE users SET points = ${userData.points + 1} WHERE key = "${key}"`)
      sql.run()
      sql = db.prepare(`UPDATE users SET lastPointMsg = ${timeSent} WHERE key = "${key}"`)
      sql.run()
    }
  
    const curLevel = Math.floor(
      parseFloat(config[guild].points.difficulty)
      *
      Math.sqrt(userData.points)
    )
  
    console.log(`User ${msg.author.username} now has ${userData.points} points. Level ${curLevel} expected, level ${userData.level}, lastSent = ${userData.lastPointMsg}`)
  
    if (userData.level != curLevel) {
  
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

}

