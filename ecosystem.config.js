module.exports = {
  apps : [{
    name: "aer-production",
    script: 'dbt.js',
    watch: false,
    env: {
      BOT_TOKEN: "ur token here"
    },
    log_file: "log.txt",
    time: true,
    post_update: ["yarn"]
  }],
};
