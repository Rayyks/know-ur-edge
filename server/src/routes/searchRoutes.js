const express = require("express");
const { searchEverything } = require("../controllers/SEACRHCONTROLLER/index");
const authMiddleware = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Search everything (auth optional depending on your setup)
router.get("/", authMiddleware, checkBlacklist, searchEverything);

module.exports = router;
