module.exports = {
  apps: [{
    name: 'banban',
    script: 'index.js',
    log_file: 'banban-dev.log',
    watch: "**/*.js",
    time: false,
    env: {
      NODE_ENV: "development",
      BOT_TOKEN: "-your development bot token here-"
    }
  }]
};
