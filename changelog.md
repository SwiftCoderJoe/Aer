# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adapted to my personal feelings because theres a lot of stuff that I am too lazy to document.
Most recent changes are located at the top.

## [1.9.0]

### Info:
    - "The 'we fixed the bug we thought we fixed multiple times but this time we actually fixed it!' update"

### Added:
    - Ability to change welcome message
    - Ability to change welcome channel
    - removeWarn command
    - setWarns command

### Fixed:
    - Major levels bug (the one where new people wouldn't get added to db)
    - Compatibility with new Discord bot requirements

## [1.8.0]

### Info: 
    - "The 'you can warn people now' update"

### Added:
    - Warn command
    - Numbering on the leaderboard command

### Fixed:
    - MAJOR FIX bot crash on GuildMemberAdd for slow computers
    
## [1.7.0]

### Info:
    - "The update update"

### Added:
    - Update command
    - Restart command
    - modRoles config functionality

### Fixed:
    - Needlessly difficult levels
    
## [1.6.0]

### Info:
    - "The deployment update"
    - This update aims to make it easier to deploy Aer in real situations, specifically through pm2.

### Added:
    - PM2 ecosystem file

### Fixed:
    - "help" command crash

## [1.5.2]

### Info: 
    - Yet another maintenance update for 1.5
    - Not really a maintenance update, adds a feature

### Added:
    - allowBadWords functionality in the config file
    - todo.md to track what I need to do in the future

### Fized:
    - Broken dependency

## [1.5.1]

### Info:
    - I guess I didn't check the last update much when I posted it
    - I am dumb
    - I forgot the readme

### Added:
    - Readme and changelog documentation for 1.5.0 and 1.5.1 updates

### Fixed:
    - Database error when someone leaves a guild
    - Generally made code easier to understand
    - Made logs easier to understand
    - Rank command broke when you tried to view your own rank
    - Changed database key values so there is no possibility of key conflict

## [1.5.0]

### Info:
    - "The levels update"
    - Updates some engines the code runs on, adds some levels commands and functionality.

### Changed
    - Node.js to v12
    - Node to 13.14.0

### Added:
    - "rank" command, allows you to view your rank in terms of points in the guild
    - "levelroles", allow you to set the bot to give roles when a user reaches a specific level
    - Points "infochannel", which allows you to specify where the bot will send level up messages and other messages based on points

### Fixed:
    - Meaningless error on startup

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
