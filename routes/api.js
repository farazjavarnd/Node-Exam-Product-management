const express = require("express");
const router = express.Router();
const fs = require("fs");

const hostname = fs.readFileSync("/etc/hostname", "utf8").trim();

// Login and Register routes
router.get("/health", function (_req, res) {
  return res.json({
    health: "ok",
    container: hostname,
  });
});

module.exports = router;
