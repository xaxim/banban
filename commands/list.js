
const { Constants } = require("eris");

const label = "list";

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const generator = (msg, args) => {
  const authorPerms = msg.member.permissions.allow;
  const { administrator, manageGuild, banMembers } = Constants.Permissions;
  if (!(authorPerms & administrator)
    && !(authorPerms & manageGuild)
    && !(authorPerms & banMembers)) {
    return "You don't have permission to use this command. You need administrator or manage server or ban members permissions.";
  }
  const filter = args.length > 0 ? args.join(" ") : false;
  msg.channel.client.getGuildBans(msg.guildID)
    .then(bans => {
      const filtered = filter ? bans.filter(ban => ban.reason?.includes(filter)) : bans;
      msg.channel.client.createMessage(msg.channel.id, `listing ${filtered.length} bans ${filter ? `filter active: "${filter}"` : "(full server ban list)"}`);
      [...chunks(filtered, 50)].forEach((chunk, index, all) => {
        const embed = {
          title: `Ban List ・ ${msg.channel.guild.name} ・ ${index + 1}/${all.length}`,
          description: chunk.map(ban => ban.user.id).join(" ")
        };
        msg.channel.client.createMessage(msg.channel.id, { embed });
      });
    })
    .catch(console.error);
}

const options = {
  description: "generates a ban list",
  fullDescription: "generates a ban list",
  caseInsensitive: true,
  usage: "<filter>",
  aliases: ["ls"],
  hidden: false
}

const list = { label, generator, options };

module.exports = list;