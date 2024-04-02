const CodeBlockModel = require("../Models/CodeBlockModel");

const findCodeBlock = async (req, res) => {
  const { codeBlockId } = req.params;

  try {
    const result = await CodeBlockModel.findOne({
      _id: codeBlockId,
    });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

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
