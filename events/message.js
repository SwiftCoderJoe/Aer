module.exports = (client, msg, db) => {

  let path = `/Users/Kids/Documents/GitHub/dbt-beta/`

  const multiSearch = require(`${path}libs/multiSearch.js`);
  const sqliteTools = require(`${path}libs/sqliteTools.js`);

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

  let badWords = [`fuck`, `shit`, `ass`, `bitch`];

  if (multiSearch.multiSearchFor(msg, badWords)) {
    msg.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}, due to LANGUAGE`))
    .catch(console.error);
    msg.reply(`Why so salty? No bad language in ${msg.guild}`);
    var sql = `SELECT PlaylistId id,
                  Name name
           FROM playlists
           WHERE PlaylistId  = ?`;
    let playlistId = 1;

    // first row only
    var previousWarned = db.get(sql, [playlistId], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        return row.warntimes
        ? console.log("warns increased for user") : console.log(`No user found with the key`);
      });
    sql = `UPDATE users SET warnTimes = ${previousWarned + 1} key = ${key} `
    db.run(sql)
    const channel = msg.guild.channels.find(ch => ch.name === 'logs');
    if (channel) {
      channel.send(`warned user: ${msg.author.username} due to LANGUAGE`);
    }
  }

  let timeSent = d.getTime();
  let prevTime = db.run(`SELECT lastPointMsg FROM users WHERE key = ${key};`);

  if (prevTime < (timeSent - 60000)) {
    sqliteTools.multiIncrement(key, `points`, 1, db);
    db.run(`UPDATE users SET lastPointMsg = ${timeSent} WHERE key = ${key};`)
    //client.data.set(key, timeSent, 'lastPointMsg');
  }

  const userPoints = db.run(`SELECT points FROM users WHERE key = ${key};`);

  const curLevel = Math.floor(
    0.25 * Math.sqrt(userPoints)
  );
  const oldLevel = db.run(`SELECT level FROM users WHERE key = ${key};`);

  console.log(`User ${msg.author.username} now has ${userPoints} points. Level ${curLevel} expected, level ${oldLevel}, lastSent = ${prevTime}`);

  if (oldLevel < curLevel) {
    msg.reply(`You've leveled up to level **${curLevel}**!`);
    const newLevel = Math.floor(0.25 * Math.sqrt(userPoints))) //=== 0 ? 1 : Math.floor(0.25 * Math.sqrt(userPoints))
    db.run(`UPDATE users SET level = ${curLevel} WHERE key = ${key};`);
  }


  );

};
