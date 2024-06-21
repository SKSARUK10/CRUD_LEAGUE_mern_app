// league.controller.js
const League = require("../models/model");

exports.getLeagues = async (req, res) => {
  const leagues = await League.find();
  res.json(leagues);
};

exports.createLeague = async (req, res) => {
  const { title, description, owner } = req.body;
  const newLeague = new League({ title, description, owner, members: [] });
  await newLeague.save();
  res.json(newLeague);
};

exports.updateLeague = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedLeague = await League.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  res.json(updatedLeague);
};

exports.deleteLeague = async (req, res) => {
  const { id } = req.params;
  await League.findByIdAndDelete(id);
  res.json({ message: `League with id ${id} deleted successfully` });
};

//inviting post
// Invite a member to a league
exports.inviteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const league = await League.findById(id);

    // Check if league exists
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    // Add the member email to the league's members array
    league.members.push(email);
    await league.save();
    res.json(league);
  } catch (error) {
    console.error("Error inviting member to league:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
