
const { Constants } = require("eris");

const label = "masskick";

const generator = (msg, args) => {
  const authorPerms = msg.member.permissions.allow;
  const { administrator, manageGuild, kickMembers } = Constants.Permissions;
  if (!(authorPerms & administrator)
    && !(authorPerms & manageGuild)
    && !(authorPerms & kickMembers)) {
    return "You don't have permission to use this command. You need administrator or manage server or kick members permissions.";
  }
  if (args.length === 0) {
    return "You need to specify users to kick.";
  }
  const bot = msg.channel.client;
  let kickCount = 0;
  let failCount = 0;
  bot.createMessage(msg.channel.id, `mass kicking ${args.length} users, please wait...`)
    .then(message => {
      args.forEach(arg => {
        bot.kickGuildMember(msg.channel.guild.id, arg, `masskicked by ${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`)
          .then(() => {
            kickCount++;
            message.edit(`${message.content} Progress: ${kickCount + failCount}/${args.length}`);
            if (kickCount + failCount === args.length) {
              message.edit(`mass kicked ${kickCount} users successfully. ${failCount} failed.`);
            }
          })
          .catch(err => {
            failCount++;
            bot.createMessage(msg.channel.id, `Failed to kick ${arg}, due to error: ${err.message}`);
            console.error(err);
          });
      });
    }).catch(console.error);
}

const options = {
  description: "masskicks a list",
  fullDescription: "masskicks a list",
  caseInsensitive: true,
  aliases: ["kickall"],
  usage: "<user_id1> <user_id2> <user_id3> ...",
  hidden: false
}

const masskick = { label, generator, options };

module.exports = masskick;