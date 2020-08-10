# Aer
> The very cool Discord bot.

Aer is an open source, free to use bot that you can build on to create your own experiences.

## Installation
TBW

## Release History
This section only shows the 3 most recent releases. To see the full changelog, visit ``changelog.md``.

* 1.5.0
    * Add "Rank" command
    * Updated Node.js to v12
    * Level rewards!
* 1.4.0
    * Add ``readme.md``.
* 1.3.0
    * Add levelUpRoles and a configuration file to go with it.

## Meta

[Twitter](https://twitter.com/SwiftCoderJoe) -- @SwiftCoderJoe  
[GitHub](https://github.com/SwiftCoderJoe) -- SwiftCoderJoe  
Distributed under the GNU GPLv3 license. See ``LICENSE`` for more information.

## Contributing

1. Fork it (<https://github.com/SwiftCoderJoe/Aer/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Todo

1. Fix an issue where if someone gets banned, their entries still exist in db, and therefore there is a crash when doing the leaderboard command. FIX: remove that user's db entry on ban. Possibly save their db values in case of unban?
2. The above issue also applies if a user (member) leaves the guild in any other way (manual ban, leaves server, etc.) FIX: possibly use guildmemberremove event which may or may not be called EVERY member that leaves, even if it is banned
2. The keys for the db are being taken literally: userid MINUS guildid. POSSIBLE FIX: replace the - with a . ? This will fix it, however I'm not sre how large of numbers the DB can store. You may need to change the type in the database from a number and instead save it as a string.