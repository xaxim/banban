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

let sessions = 0;
bot.on("ready", () => {
  sessions++;
  const startSessionLog = `Session ${sessions} of ${bot.user.username}#${bot.user.discriminator} started at ${new Date()} ` +
    `in ${process.env.NODE_ENV} environment ` +
    `in ${bot.guilds.size} guilds:`;
  const serverList = Array.from(bot.guilds.values())
    .sort((a, b) => b.memberCount - a.memberCount)
    .map((guild, index) => `${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(index + 1)} • Owner: ${guild.ownerID} • [${new Intl.NumberFormat('pt-BR').format(guild.memberCount)}] ${guild.name}`)
    .join("\n");
  console.log(startSessionLog);
  if (sessions === 1) {
    console.log(serverList);
  }
});

bot.on("guildCreate", guild => {
  console.log(`Joined guild ${guild.name}`);  
  bot.createMessage(EMOJI_SERVER_LOG_CHANNEL, `[${bot.user.username}#${bot.user.discriminator}] Joined server owned by ${guild.ownerID} • ${guild.name} [${new Intl.NumberFormat('pt-BR').format(guild.memberCount)}]`);
});

bot.on("guildDelete", guild => {
  console.log(`Left guild ${guild.name}`);
  bot.createMessage(EMOJI_SERVER_LOG_CHANNEL, `[${bot.user.username}#${bot.user.discriminator}] Left server owned by ${guild.ownerID} • ${guild.name} [${new Intl.NumberFormat('pt-BR').format(guild.memberCount)}]`);
});

bot.on("error", (err, id) => {
  if (err.message !== "Connection reset by peer") {
    console.log(`[${bot.user.username}#${bot.user.discriminator}] Error Event on shard ${id}: ${err.message}`);
    console.error(err);
  }
});

bot.connect();
