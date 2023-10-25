const mongoose = require("mongoose");

const defaultModelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    remarks: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const defaultModel = mongoose.model("test", defaultModelSchema, "test"); //appending collection name to prevent pluarlize

module.exports = defaultModel;
