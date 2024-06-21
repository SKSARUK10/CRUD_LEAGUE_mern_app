const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  title: String,
  description: String,
  members: [String],
  owner: String,
});

module.exports = mongoose.model("League", leagueSchema);
