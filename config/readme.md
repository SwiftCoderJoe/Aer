# config.json

## What is it?

`config.json` is the configuration file for Aer. It allows you to configure how Aer works, and what it does.

## How do I use it?

*NOTE: this document assumes you have developer mode turned on in Discord. If this is not enabled, follow [this guide](https://www.discordia.me/en/developer-mode).*
*NOTE: if you want to use this file, you should probably know how to use JSON.*

Later, we would love to add a way to configure the bot directly from Discord. Until then, you must configure this file manually. Luckily, it is very easy.

The configuration file is split into multiple categories, as shown below.

    {
        "category 1" : {
            "thing 1" : "value 1",
            "thing 2" : "value 2"
        },
        "category 2" : {
            "thing 1" : "value 1",
            "thing 2" : "value 2"
        }
    }

The lowest level category is the guild (server). You can configure this bot to behave differently in different guilds. Replace the default guild ID, so that your file looks like this:

    {
        "yourGuildIDHere" : {
            "data" : "blah, blah, blah..."
        },
        "secondGuildIDIfYouHaveOne" : {
            "data" : "blah, blah, blah..."
        }
    }

If your bot is in multiple servers, you can add another Guild ID to the config file as shown above. Once you have inputted each Guild ID you want, you will be able to configure each category within each Guild/Server. This documentation will walk you through how to configure each category.

## points

Each of these values correspond to things relating to the points system.

### difficulty

This value signifies how hard it is to level up. The closer it is to zero, the harder it is to level up, and the higher it is, the easier it is to level up. 1 is recommended. It is not recommended to go higher than 1.

It is configured like this:

    "difficulty" : "0.25"

As you can see, decimals are allowed.

### infoChannel

This value will signify the channel you want points info to be sent in. This info includes level up notifications and level up role add (see: levelUpRoles) notifications.

It is configured like this:

    "infoChannel" : "717379525708873788"

Leave this value blank if you would like to send notifications in the channel that they happen in. On the left of the value is the key value. Do not change this from "infoChannel". On the right of this value, input the ID of the channel of which you would like points info messages to be sent to. You can get this ID by right-clicking a channel in a server.


### levelUpRoles

LevelUpRoles allows the bot to add roles when users reach a certain level. 

It is configured like this:

    "levelUpRoles" : {
        "1" : "725356277634695349",
        "10" : "559846717676322837"
    }

On the left side of each value, you can change the number inside the quotes to define at which level you want the bot to add the role. On the right side of each value, you can change the number inside the quotes to define the ID of the role that you want the bot to add. You can get this ID by right-clicking on the role in discord and clicking "Copy ID". You must use commas between each value.

## moderation

This category contains values relating to Aer's automatic moderation system.

### allowSwearWords

AllowSwearWords is a boolean value. If set to true, the bot will not remove messages containing swear words. If set to false, the bot will remove all messages sent with swears. You do not need quotes around the values true or false. For example:

    "moderation" : {
        allowSwearWords : false
    }

## members

This category contains values relating to users and their actions.

### infoChannel

This value will signify the channel you want member info to be sent to. This info includes when users join a server, and will have more functionality soon.

It is configured like this:

    "infoChannel" : "717379525708873788"

On the right of this value, input the ID of the channel of which you would like member info messages to be sent to. You can get this ID by right-clicking a channel in a server.

### memberAddMessage

This value tells the bot what it should say when a new member joins the server.

It is configured like this:

    "memberAddMessage" : "Welcome to %GUILDNAME%, %USER%!"

The value on the right is the message the bot will send. You can use these keys to input special values:

* %GUILDNAME% -- Shows the name of the guild (server) in bold.
* %USER% -- Username (this WILL ping the user!).

### memberRemoveMessage

This value tells the bot what it should say when a member leaves a server. This can be triggered by any number of things, including bans and kicks.

It is configured like this:

    "memberRemoveMessage" : "%USER% has had enough and is leaving."

You can use these keys to input special values:

* %GUILDNAME% -- The name of the guild (server) in bold.
* %USER% -- Username (this WILL ping the user!).