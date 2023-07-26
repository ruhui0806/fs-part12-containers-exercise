const express = require("express");
const router = express.Router();
const configs = require("../util/config");

const redis = require("../redis");
let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const result = await redis.getAsync("added_todos");
  if (!result || isNaN(result)) {
    return res.json({ added_todos: 0 });
  }
  res.json({ added_todos: parseInt(result) });
});

module.exports = router;
