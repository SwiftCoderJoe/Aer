module.exports = (client, msg) => {

  const Enmap = require(`enmap`);
  client.points = new Enmap({
    name: `points`
  });

  var d = new Date();

  if (msg.author.bot) return;

  (async function() {
    await client.points.defer;
    const key = `${msg.guild.id}-${msg.author.id}`;

    client.points.ensure(key, {
      user: msg.author.id,
      guild: msg.guild.id,
      points: 0,
      level: 1,
      lastPointMsg: 0
    });

    var timeSent = d.getTime();

    if (client.points.get(key, 'lastPointMsg') < (timeSent - 60000)) {
      client.points.inc(key, `points`);
      client.points.set(key, timeSent, 'lastPointMsg');
    }

    const curLevel = Math.floor(
      0.25 * Math.sqrt(client.points.get(key, `points`))
    );

    console.log(`User ${msg.author} now has ${client.points.get(key, 'points')} points. Level ${curLevel} expected, level ${client.points.get(key, 'level')}, lastSent = ${client.points.get(key, 'lastPointMsg')}`);

    if (client.points.get(key, `level`) < curLevel) {
      msg.reply(`You've leveled up to level **${curLevel}**!`);
      client.points.set(key, curLevel, `level`);
    }
    client.points.set(
      key,
      Math.floor(0.25 * Math.sqrt(client.points.get(key, `points`))) === 0
      ? 1
      : Math.floor(0.25 * Math.sqrt(client.points.get(key, `points`))),
      `level`
    );
  })();

};
