import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
import axios from "axios";

const quote: Command = {
  name: "quote",
  description: "Quotess.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    const result = await axios.get(
      "https://api.api-ninjas.com/v1/quotes?category=computers",
      {
        headers: { "X-Api-Key": process.env.NINJAS_API_KEY },
      }
    );

    herta.sendMessage(
      message.from,
      `
${result.data[0].quote}
   
_-${result.data[0].author}_`
    );
  },
};

export default quote;
