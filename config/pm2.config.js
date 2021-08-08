module.exports = {
  apps : [{
    name: "aer-production",
    script: 'dbt.js',
    watch: false,
    time: true
  }],
};
