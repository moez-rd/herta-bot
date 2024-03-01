import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ask: Command = {
  name: "ask",
  aliases: ["tanya", "nanya", "gemini"],
  description: "Tanya Gemini.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    message.reply("Tunggu yaa..")

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(message.body.substr(message.body.indexOf(" ") + 1));
    const response = await result.response;
    const text = response.text();

    message.reply(text);
  },
};

export default ask;
