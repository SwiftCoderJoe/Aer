### Not Scheduled

* config file:
	* Add strongroles
	* customize welcome channel and message
* Leveling:
	* Config toggle for only one level reward at once
	* Rank rewards
* Readme:
	* Add Installation
* Automod:
	* more audit log events
	* repeated text (store last 2 messages in db)
	* excessive caps (>70%)
	* add clearWarns command
	* ignore bots toggle
	* autoban and tempban 
		* cron jobs? Scheduled async commands?
		* option to keep leveling data
		* data moves to other db for tempban, stores when supposed to be readded
		* On startup scans all tempbans and recreates async/cron jobs (if cron delete cron jobs on shutdown, will not cover for crash..!)
	* automated actions
		* Specific number of warns results in tempban
		* specific number of warns in specific time?
* Misc:
	* Add guildmemberremoved message
		* This will also trigger for people who are banned, good? bad?
	* Add !update, !restart commands
	* Figure out a way to push updates to specific channel? possibly not through bot, possibly through Aer discord server
		* Finish Aer discord server?
