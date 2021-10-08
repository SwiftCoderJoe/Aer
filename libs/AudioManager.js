const voiceMap = new Map()

module.exports = {
    play,
    stop
}


async function play(channel, media, volume) {

    // Join the VC if the bot isn't already in it.
    if (voiceMap.get(channel) == undefined) {
        voiceMap.set(channel, await channel.join())
    }

    // Play the song
    let dispatcher = voiceMap.get(channel).play(media)
    dispatcher.setVolume(volume)

    dispatcher.on(`finish`, () => {
        voiceMap.get(channel).disconnect()
        voiceMap.set(channel, undefined)
    })
}

async function stop(channel) {
    let connection = voiceMap.get(channel)

    if (connection != undefined) {
        connection.disconnect()
        voiceMap.set(channel, undefined)
    }
}