# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adapted to my personal feelings because theres a lot of stuff that I am too lazy to document.
Most recent changes are located at the top.

## [1.4.0]

### Info:
    - "The documentation update"
    - This update adds documentation files and brings CHANGELOG up to date

### Changed:
    - Changed CHANGELOG to changelog.md
    - Updated changelog so that it is actually up-to-date

### Added:
    - readme.md (config file)
    - readme.md

## [1.3.0]

### Info: 
    - This update might have some bugs (uh oh) but I'm releasing it because it works fine from my testing. Report any bugs to me please. This update changes A TON of things under the hood to help this bot run faster, and it also adds the levelUpRoles functionality.

### Added:
    - levelUpRoles functionality
    - config.json
    - Bump discord.js and discord.js-commando
    - Fix security issue.

## [1.2.0]

### Info: 
    - This change is quite useful. I will hopefully add more moderation commands in the future

### Added:
    - Added ban command
    - Added unban command

### Depreciated:
    - Spam command, forgot to delete it.

## [1.1.0]

### Info:
    - Oh my god. How is this not a major change? This took me so long. Appreciate it. This change didn't add very many features available to users, however makes an insane amount of changes under the hood. OH MY GOSH ITS FINALLY DONE.

### Changed:
    -Realize Enmap sucks
    -Switch to sqlite3
    -Realize SQLite sucks but you spent too many hours learning it so you can't switch to something else.
    -Spend way too many hours implementing SQLite
    -Realize that SQLite can't even do what I'm trying to accomplish
    -Switch to better-sqlite3
    -Spend awhile learning better-SQLite
    -Integrate better-SQLite
    -IT WORKS!!!!
    
### Added:
    -dbt warns command (shows the number of previous infractions or "warns")
    -added logs for previous warns
    
### Depreciated:
    -Spam command. It will be deleted in the next update.

-----------

## [1.0.0]

### Added:
    -Literally everything. Do you even need more?
    -Node.js
    -Enmaps to track points
    -Points and levels system
    -Points only add once per minute to try and prevent spamming
    - dbt lb command
    - dbt ping command
    - dbt help command
    - dbt spam command