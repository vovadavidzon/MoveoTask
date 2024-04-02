const express = require("express");
const router = express.Router();
const { findCodeBlock } = require("../Controllers/codeBlockController");

router.get("/:codeBlockId", findCodeBlock);

module.exports = router;
