module.exports = (client, msg) => {

  let path = `/Users/Kids/Documents/GitHub/dbt-beta/`

  const multiSearch = require(`${path}libs/multiSearch.js`);

  const Enmap = require(`enmap`);
  client.data = new Enmap({
    name: `data`
  });

  var d = new Date();

  if (msg.author.bot) return;

  (async function() {

    await client.data.defer;
    const key = `${msg.guild.id}-${msg.author.id}`;

    client.data.ensure(key, {
      user: msg.author.id,
      guild: msg.guild.id,
      points: 0,
      level: 1,
      lastPointMsg: 0,
      warnTimes: 0
    });

    let badWords = [`fuck`, `shit`, `ass`, `bitch`];

    if (multiSearch.multiSearchFor(msg, badWords)) {
      msg.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}, due to LANGUAGE`))
        .catch(console.error);
      msg.reply(`Why so salty? No bad language in ${msg.guild}`);
      client.data.inc(key, `warnTimes`);
      const channel = msg.guild.channels.find(ch => ch.name === 'logs');
      if (channel) {
        channel.send(`warned user: ${msg.author.username} due to LANGUAGE`);
      }
    }

    var timeSent = d.getTime();

    if (client.data.get(key, 'lastPointMsg') < (timeSent - 60000)) {
      client.data.inc(key, `points`);
      client.data.set(key, timeSent, 'lastPointMsg');
    }

    const curLevel = Math.floor(
      0.25 * Math.sqrt(client.data.get(key, `points`))
    );

    console.log(`User ${msg.author.username} now has ${client.data.get(key, 'points')} points. Level ${curLevel} expected, level ${client.data.get(key, 'level')}, lastSent = ${client.points.get(key, 'lastPointMsg')}`);

    if (client.data.get(key, `level`) < curLevel) {
      msg.reply(`You've leveled up to level **${curLevel}**!`);
      client.data.set(key, curLevel, `level`);
    }
    client.data.set(
      key,
      Math.floor(0.25 * Math.sqrt(client.data.get(key, `points`))) === 0
      ? 1
      : Math.floor(0.25 * Math.sqrt(client.data.get(key, `points`))),
      `level`
    );
  })();

};
