module.exports = (client, db, msg) => {

  let path = `/Users/Kids/Documents/GitHub/dbt-beta/`

  const multiSearch = require(`${path}libs/multiSearch.js`);

  var d = new Date();

  if (msg.author.bot) return;

  const key = `${msg.guild.id}-${msg.author.id}`;

  /*
  --Data Table--
  client.data.ensure(key, {
  user: msg.author.id,
  guild: msg.guild.id,
  points: 0,
  level: 1,
  lastPointMsg: 0,
  warnTimes: 0
  });
  */

  const stmt = db.prepare(`SELECT * FROM users WHERE key = ${key};`)
  userData = stmt.get();
  console.log(userData);

  let badWords = [`fuck`, `shit`, `ass`, `bitch`];

  if (multiSearch.multiSearchFor(msg, badWords)) {
    msg.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}, due to LANGUAGE`))
    .catch(console.error);
    msg.reply(`Why so salty? No bad language in ${msg.guild}`);
    sql = db.prepare(`UPDATE users SET warnTimes = ${userData.warnTimes + 1} WHERE key = ${key}`)
    sql.run();
    const channel = msg.guild.channels.find(ch => ch.name === 'logs');
    if (channel) {
      channel.send(`warned user: ${msg.author.username} due to LANGUAGE. New warnTimes value: ${userData.warnTimes + 1}`);
    }
  }

  let timeSent = d.getTime();

  if (prevTime < (timeSent - 60000)) {
    let sql = db.prepare(`UPDATE users SET points = ${userData.points + 1} WHERE key = ${key}`)
    sql.run()
    sql = db.prepare(`UPDATE users SET lastPointMsg = ${timeSent} WHERE key = ${key}`)
    sql.run()
  }

  const curLevel = Math.floor(
    0.25 * Math.sqrt(userData.points)
  );

  console.log(`User ${msg.author.username} now has ${userData.points} points. Level ${curLevel} expected, level ${userData.level}, lastSent = ${userData.lastPointMsg}`);

  if (oldLevel < curLevel) {
    msg.reply(`You've leveled up to level **${curLevel}**!`);
    const newLevel = Math.floor(0.25 * Math.sqrt(userPoints)) //=== 0 ? 1 : Math.floor(0.25 * Math.sqrt(userPoints))
    sql = db.prepare(`UPDATE users SET level = ${curLevel} WHERE key = ${key};`)
    sql.run();
  }


};
