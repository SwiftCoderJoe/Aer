module.exports = (client, db, msg) => {
  const multiSearch = require(`${process.cwd()}/libs/multiSearch.js`)
  const removeFirstMention = require(`${process.cwd()}/libs/removeFirstMention.js`)

  var d = new Date()

  if (msg.author.bot) return


  if (msg.mentions.users.first()) {
    var msgNoMention = removeFirstMention.removeFirstMention(msg.content)

    switch (msgNoMention.toLowerCase()) {
      case 'gp is gay?': {
        console.log(`gayResp`)
        var resp = isGayResponses[Math.floor(Math.random() * isGayResponses.length)];
        msg.reply(resp)
      }
      default: {
        console.log(msgNoMention.toLowerCase())
      }
    }
  } else {



    if (msg.content.startsWith(`yes or no`)) {
      var resp = yesno[Math.floor(Math.random() * yesno.length)];
      msg.reply(resp)
    } else {



      switch (msg.content.toLowerCase()) {
        case `GP tell me a joke`: {
          var resp = jokes[Math.floor(Math.random() * jokes.length)];
          msg.reply(resp)
        }
      }
    }
  }

}

var isGayResponses = [`So gay, the rainbows are jealous.`,`He is taken, don't bother.`,`Are you asking for a friend?`]
var jokes = [`What's red and bad for your teeth? A brick.`, 
  `I was going to tell a dead baby joke. But I decided to abort.`,
  `Why does Dr. Pepper come in a bottle? His wife is dead.`,
  `Why does Helen Keller hate porcupines? They're painful to look at.`,
  `Why can't orphans play basketball? They don't know where home is.`,
  `Give a man a match, and he'll be warm for a few hours. Set a man on fire, and he will be warm for the rest of his life.`,
  `I asked a pretty, young homeless woman if I could take her home. She smiled at me and said yes. The look on her face soon changed, however, when I walked off with her cardboard box.`]
  var yesno = [`yes`,`no`]