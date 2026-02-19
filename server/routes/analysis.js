const express = require("express");
const User = require("../models/User");
const OpenAI = require("openai");

const router = express.Router();
const openai = new OpenAI({
  apiKey: "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"
});


function classify(mark) {
  if (mark <= 40) return "weak";
  if (mark <= 70) return "average";
  return "strong";
}

router.post("/analyze", async (req, res) => {
  const { userId, marks } = req.body;

  const result = {};
  for (let subject in marks) {
    result[subject] = classify(marks[subject]);
  }

  const prompt = `
Student marks: ${JSON.stringify(marks)}

Give:
1. Study roadmap
2. Tests for each subject based on level
3. Job suggestions with salary
`;

  const ai = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const user = await User.findById(userId);
  user.marks = marks;
  user.progress.push(Math.random() * 100);
  await user.save();

  res.json({
    levels: result,
    ai: ai.choices[0].message.content
  });
});

router.get("/progress/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user.progress);
});

module.exports = router;
