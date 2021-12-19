
const label = "invite";

const generator = (msg, args) => {

  return {
    embed: {
      description: "Invite link: https://discord.com/oauth2/authorize?client_id=921855309629247498&permissions=388164&scope=bot\n"
        + "Source code: https://github.com/xaxim/banban",
    }
  };
}

const options = {
  description: "displays invite and source code links",
  fullDescription: "displays invite and source code links",
  caseInsensitive: true,
  aliases: ["inv", "info"],
  hidden: false
}

const invite = { label, generator, options };

module.exports = invite;