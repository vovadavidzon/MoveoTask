const express = require("express");
const router = express.Router();
const {
  findCodeBlock,
  findAllCodeBlocks,
} = require("../Controllers/codeBlockController");

router.get("/:codeBlockId", findCodeBlock);
router.get("/", findAllCodeBlocks);

module.exports = router;
