const express = require("express");
const router = express.Router();
const { findAllCodeBlocks } = require("../Controllers/codeBlockController");

router.get("/", findAllCodeBlocks);

module.exports = router;
