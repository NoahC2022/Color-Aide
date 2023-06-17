const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
 console.log("Test");
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0.5,
    prompt: prompt,
  });

  res.send(completion.data.choices[0].text);
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
