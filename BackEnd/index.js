const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const gemini = require("./Functions/Gemini");
const { generateIdeaPrompt } = require("./Prompts/Prompts");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/prompt", async (req, res) => {
  const { category, role, experienceLevel, difficulty } = req.body;

  try {
    const final = generateIdeaPrompt(category, role, experienceLevel, difficulty);
    const result = await gemini(final);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Server Started");
});

app.listen(PORT, () => {
  console.log("WE are Listing at " + PORT);
});
