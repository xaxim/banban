
const label = "isbanned";
const description = "Check if a user is banned.";

const generator = async (msg, args) => {
  if (args.length < 1) {
    return "Please provide a user to check if they are banned.";
  }
  try {
    const userid = Number(args[0]);
    if (!userid) {
      return "Please provide a valid user id.";
    }
    const bans = await msg.channel.client.getGuildBans(msg.guildID);
    const isBanned = bans.find(ban => ban.user.id === args[0]);
    if (isBanned) {
      return { content: `${args[0]}`, embed: { description: `<@${args[0]}> is banned. Reason: ${isBanned.reason}` } };
    }
    return { content: `${args[0]}`, embed: { description: `<@${args[0]}> is not banned.` } };
  } catch (e) {
    return e.message;
  }
}

const options = {
  description,
  fullDescription: description,
  caseInsensitive: true,
  usage: "<user id>",
  aliases: ["isban", "is"],
  hidden: false
}

const isbanned = { label, generator, options };

module.exports = isbanned;
