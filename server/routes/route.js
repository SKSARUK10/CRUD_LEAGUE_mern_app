// league.route.js
const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/controllers");

router.get("/leagues", leagueController.getLeagues);
router.post("/leagues", leagueController.createLeague);
router.put("/leagues/:id", leagueController.updateLeague);
router.delete("/leagues/:id", leagueController.deleteLeague);
router.post("/leagues/:id/invite", leagueController.createLeague);

module.exports = router;
