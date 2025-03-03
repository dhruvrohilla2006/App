const { GoogleGenerativeAI } = require("@google/generative-ai");
const { response } = require("express");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



const Gemimi = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  return response;
};
module.exports = Gemimi;
