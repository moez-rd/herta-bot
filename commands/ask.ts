import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ask: Command = {
  name: "ask",
  aliases: ["tanya", "nanya", "gemini"],
  description: "Tanya Gemini.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    const waitMessages = ["Tunggu yaa...", "Tunggu...", "Wait...", "Bentar yaa"]

    message.reply(waitMessages[Math.floor(Math.random() * waitMessages.length)])

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = message.body.substr(message.body.indexOf(" ") + 1)

    let text: string = ""

    try {
      if (message.hasMedia) {
        const media = await message.downloadMedia();
  
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
          prompt,
          { inlineData: { data: media.data, mimeType: 'image/jpeg' } }
        ]);
  
        const response = await result.response;
        text = response.text();
  
      } else {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
  
        const response = await result.response;
        text = response.text();
      }
    } catch (error) {
      message.reply("GoogleGenerativeAI Error: Terdapat kesalahan/konten diblokir:(")
    }

    message.reply(text);

  },
};

export default ask;
