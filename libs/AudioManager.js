const voiceMap = new Map()

module.exports = {
    play,
    stop
}


async function play(channel, media, volume) {

    // Join the VC if the bot isn't already in it.
    if (voiceMap.get(channel) == undefined) {
        voiceMap.set(channel, await channel.join())
        voiceMap.get(channel).on(`disconnect`, () => {
            voiceMap.set(channel, undefined)
        })
    }

    // Play the song
    let dispatcher = voiceMap.get(channel).play(media)
    dispatcher.setVolume(volume)

    dispatcher.on(`finish`, () => {
        voiceMap.get(channel).disconnect()
    })
}

async function stop(channel) {
    let connection = voiceMap.get(channel)

    if (connection != undefined) {
        connection.disconnect()
    }
}

async function debug(channel, msg) {
    msg.reply(voiceMap.get(channel))
}