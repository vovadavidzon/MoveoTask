const CodeBlockModel = require("../Models/CodeBlockModel");

const findAllCodeBlocks = async (req, res) => {
  try {
    const result = await CodeBlockModel.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { findCodeBlock, findAllCodeBlocks };
