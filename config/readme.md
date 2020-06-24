# config.json

## What is it?

`config.json` is the configuration file for Aer. It allows you to configure how Aer works, and what it does.

## How do I use it?

*NOTE: this document assumes you have developer mode turned on in Discord. If this is not enabled, follow [this guide](https://www.discordia.me/en/developer-mode).*

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

This documentation will walk you through how to configure each category.

### levelUpRoles

LevelUpRoles allows the bot to add roles when users reach a certain level. 

It is configured like this:

    "levelUpRoles" : {
        "1" : "725356277634695349"
        "10" : "559846717676322837"
    }

As you can see, on the left side of each value, you can change the number inside the quotes to define at which level you want the bot to add the role. On the right side of each value, you can change the number inside the quotes to define the ID of the role that you want the bot to add. You can get this ID by right-clicking on the role in discord and clicking "Copy ID".