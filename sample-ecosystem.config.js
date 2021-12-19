module.exports = {
  apps: [{
    name: 'banban',
    script: 'index.js',
    log_file: 'banban.log',
    watch: false,
    time: true,
    env: {
      NODE_ENV: "production",
      BOT_TOKEN: "-your production bot token here-"
    }
  }]
};
