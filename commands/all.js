
const { Constants } = require("eris");

const label = "all";

const generator = (msg, args) => {
  const authorPerms = msg.member.permissions.allow;
  const { administrator, manageGuild, banMembers } = Constants.Permissions;
  if (!(authorPerms & administrator)
    && !(authorPerms & manageGuild)
    && !(authorPerms & banMembers)) {
    return "You don't have permission to use this command. You need administrator or manage server or ban members permissions.";
  }
  if (args.length === 0) {
    return "You need to specify users to ban.";
  }
  const bot = msg.channel.client;
  let banCount = 0;
  let failCount = 0;
  bot.createMessage(msg.channel.id, `mass banning ${args.length} users, please wait...`)
    .then(message => {
      args.forEach(arg => {
        bot.banGuildMember(msg.channel.guild.id, arg, 0, `massbanned by ${msg.author.username}#${msg.author.discriminator} (${msg.author.id}) at ${new Date()}`)
          .then(() => {
            banCount++;
            message.edit(`${message.content} Progress: ${banCount + failCount}/${args.length}`);
            if (banCount + failCount === args.length) {
              message.edit(`mass banned ${banCount} users successfully. ${failCount} failed.`);
            }
          })
          .catch(err => {
            failCount++;
            bot.createMessage(msg.channel.id, `Failed to ban ${arg}, due to error: ${err.message}`);
            console.error(err);
          });
      });
    }).catch(console.error);
}

const options = {
  description: "massbans a list",
  fullDescription: "massbans a list",
  caseInsensitive: true,
  aliases: ["massban", "mass"],
  usage: "<user_id1> <user_id2> <user_id3> ...",
  hidden: false
}

const all = { label, generator, options };

module.exports = all;
