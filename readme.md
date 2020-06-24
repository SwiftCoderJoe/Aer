# Aer
> The very cool Discord bot.

Aer is an open source, free to use bot that you can build on to create your own experiences.

## Installation
TBW

## Release History
This section only shows the 4 most recent releases. To see the full changelog, visit ``changelog.md``.

* 1.1.0
    * Add ban and unban commands. SPOILER ALERT: they do not work.
* 1.2.0
    * Fix ban and unban commands, and make many under-tho-hood changes that will help this bot run faster.
* 1.3.0
    * Add levelUpRoles and a configuration file to go with it.
* 1.4.0
    * Add ``readme.md``.

## Meta

[Twitter](https://twitter.com/SwiftCoderJoe)  
[GitHub](https://github.com/SwiftCoderJoe)  
Distributed under the GNU GPLv3 license. See ``LICENSE`` for more information.

## Contributing

1. Fork it (<https://github.com/SwiftCoderJoe/Aer/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Todo

1. Fix an issue where if someone gets banned, their entries still exist in db, and therefore there is a crash when doing the leaderboard command. FIX: remove that user's db entry on ban. Possibly save their db values in case of unban?
2. The keys for the db are being taken literally: userid MINUS guildid. POSSIBLE FIX: replace the - with a . ? This will fix it, however I'm not sre how large of numbers the DB can store. You may need to change the type in the database from a number and instead save it as a string.