module.exports = (client, db, member) => {
    const guild = member.guild.id
    const UID = member.id
    const key = `g${guild}u${UID}`
    // Remove user from database
    const sql = db.prepare(`DELETE FROM users WHERE key = "${key}"`)
    let changes = sql.run()

    if (changes.changes === 1) {
        console.log(`Successfully removed the defunct user ${UID} from ${guild}`)
    }

}