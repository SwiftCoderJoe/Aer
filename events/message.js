module.exports = (client, db, msg) => {
  let path = `/Users/Kids/Documents/GitHub/dbt-beta/`

  const multiSearch = require(`./libs/multiSearch.js`)
  const removeFirstMention = require(`./libs/multiSearch.js`)

  var d = new Date()

  if (msg.author.bot) return


  if (msg.mentions.users.first()) {
    var msgNoMention = removeFirstMention(msg)

    switch (msgNoMention) {
      case 'GP is gay?': {
        var resp = isGayResponses[Math.floor(Math.random() * isGayResponses.length)];
        msg.reply(resp)
      }
    }
  }
}

var isGayResponses = [`So gay, the rainbows are jealous.`,`He is taken, don't bother.`,`Are you asking for a friend?`]