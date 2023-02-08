const Eris = require("eris");
const commands = require("./commands");

const EMOJI_SERVER_LOG_CHANNEL = "921995856088027146";

const bot = new Eris.CommandClient(
  process.env.BOT_TOKEN,
  {
    intents: [
      "allNonPrivileged",
      "guildMembers",
    ],
    restMode: true,
    defaultImageFormat: "png"
  },
  {
    description: "BanBan",
    owner: "carlosxaxim#9000",
    prefix: ["banban ", "Banban ", "BANBAN "],
  });

commands.forEach(cmd => {
  const commandRegistered = bot.registerCommand(cmd.label, cmd.generator, cmd.options);
  if (cmd.subcommands) {
    cmd.subcommands.forEach(subcmd => {
      commandRegistered.registerSubcommand(subcmd.label, subcmd.generator, subcmd.options);
    })
  }
});

let sessionCount = 0;
bot.on("ready", async () => {
  const startSessionLog = `Session ${sessionCount++} of ${bot.user.username}#${bot.user.discriminator} started at ${new Date()} ` +
    `in ${process.env.NODE_ENV} environment ` +
    `in ${bot.guilds.size} guilds: \n` +
    Array.from(bot.guilds.values())
      .map(guild => guild.name)
      .join("\n");
  console.log(startSessionLog);
});

bot.on("guildCreate", guild => {
  console.log(`Joined guild ${guild.name}`);  
  bot.createMessage(EMOJI_SERVER_LOG_CHANNEL, `Joined server ${guild.name}`);
});

bot.on("guildDelete", guild => {
  console.log(`Left guild ${guild.name}`);
  bot.createMessage(EMOJI_SERVER_LOG_CHANNEL, `Left server ${guild.name}`);
});

bot.on("error", (err, id) => {
  if (err.message !== "Connection reset by peer") {
    console.log("Error Event catched: " + err.message);
    console.error(err);
  }
});

bot.connect();
