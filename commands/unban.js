const { Constants} = require("eris");

const label = "unban";
const description = "Unbans a user";

const generator = async (msg, args) => {
  const authorPerms = msg.member.permissions.allow;
  const { administrator, manageGuild, banMembers } = Constants.Permissions;
  if (!(authorPerms & administrator)
    && !(authorPerms & manageGuild)
    && !(authorPerms & banMembers)) {
    return "You don't have permission to use this command. You need administrator or manage server or ban members permissions.";
  }
  if (args.length < 1) {
    return "Please provide a user to unban";
  }
  try {
    const userid = Number(args[0]);
    if (!userid) {
      return "Please provide a valid user id.";
    }
    const bans = await msg.channel.client.getGuildBans(msg.guildID);
    const foundBan = bans.find(ban => ban.user.id === args[0]);
    await msg.channel.client.unbanGuildMember(msg.channel.guild.id, args[0], `unbanned by ${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`);

    if (!foundBan) {
      return { content: `${args[0]}`, embed: { description: `<@${args[0]}> is not banned.` } };
    }
    return { content: `${args[0]}`, embed: { description: `<@${args[0]}> is no longer banned.\nPrevious ban reason: ${foundBan.reason}` } };
  } catch (e) {
    return e.message;
  }
}

const options = {
  description,
  fullDescription: description,
  caseInsensitive: true,
  usage: "<user id>",
  hidden: false
}

const unban = { label, generator, options };

module.exports = unban;
