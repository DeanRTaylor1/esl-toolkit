import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { ChatCompletionRequestMessage } from "openai/dist/api";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  res.status(200).json({ message: "Hello World" });
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { model, messages, temperature } = req.body;

  let data = await makeOpenAIChatRequest(model, messages, temperature);

  res.status(200).json({ message: data });
};

const makeOpenAIChatRequest = async (
  model: string,
  messages: ChatCompletionRequestMessage[],
  temperature: number
) => {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: model,
    messages: messages,
    temperature: temperature,
  });
  console.log(completion.data);
  return completion.data.choices[0].message;
};
