const express = require("express");
const router = express.Router();

// Login and Register routes
router.get("/health", function (_req, res) {
  return res.json({
    health: "ok",
  });
});

module.exports = router;
