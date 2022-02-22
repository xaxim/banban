const list = require("./list");
const all = require("./all");
const invite = require("./invite");
const masskick = require("./masskick");
const isbanned = require("./isbanned");
const unban = require("./unban");

const commands = [
  list,
  all,
  invite,
  masskick,
  isbanned,
  unban
];

module.exports = commands
