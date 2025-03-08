const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const gemini = require("./Functions/Gemini");
const {
  generateIdeaPrompt,
  gererateFullPlanPrompt,
  gererateFullPlanPrompt2,
} = require("./Prompts/Prompts");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/prompt", async (req, res) => {
  const { category, role, experienceLevel, difficulty } = req.body;

  // console.log({ category, role, experienceLevel, difficulty });
  try {
    const final = generateIdeaPrompt(
      category,
      role,
      experienceLevel,
      difficulty
    );
    const result = await gemini(final);

    const cleanedResponse = result.replace(/```json|```/g, "").trim();

    try {
      const jsonData = JSON.parse(cleanedResponse);
      // console.log(jsonData); // Now it's valid JSON
      res.status(200).send(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send({ message: "Error parsing JSON" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Message: error });
  }
});

app.post("/fullplan", async (req, res) => {
  const preResponse = req.body;

  try {
    const final = await gererateFullPlanPrompt2(preResponse);
    const result = await gemini(final);
    const cleanedResponse = result.replace(/```json|```/g, "").trim();

    try {
      const jsonData = JSON.parse(cleanedResponse);
      // console.log(jsonData); // Now it's valid JSON
      res.status(200).send(jsonData);
    } catch (error) {
      console.error("Message Error parsing JSON:", error);
      res.status(400).send("Error parsing JSON");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Server Started");
});

app.listen(PORT, () => {
  console.log(`WE are Listing at   http://localhost:${PORT}`);
});
