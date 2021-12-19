
const label = "invite";

const generator = (msg, args) => {
  return "https://discord.com/oauth2/authorize?client_id=921855309629247498&permissions=388164&scope=bot";
}

const options = {
  description: "displays invite link",
  fullDescription: "displays invite link",
  caseInsensitive: true,
  aliases: ["inv"],
  hidden: false
}

const invite = { label, generator, options };

module.exports = invite;