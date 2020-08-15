module.exports = {
  apps : [{
    name: "aer-production",
    script: 'dbt.js',
    watch: false,
    log_file: "log.txt",
    time: true
  }],
};
