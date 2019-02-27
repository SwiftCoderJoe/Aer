module.exports = {
  multiIncrement: function (key, column, incVal, db) {
    oldVal = db.run(`SELECT ${column} FROM users WHERE key = ${key};`);
    newVal = oldVal = + incVal;
    db.run(`UPDATE users SET ${column} = ${newVal} WHERE key = ${key};`);
  }
  dbIntoDict: function (column, table, db) {
    let sql = `SELECT DISTINCT Name name FROM playlists
           ORDER BY name`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.name);
      });
    });
  }
};
