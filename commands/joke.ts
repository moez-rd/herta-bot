import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
import axios from "axios";

const joke: Command = {
  name: "joke",
  description: "Candaan.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    const result = await axios.get(
      "https://api.api-ninjas.com/v1/jokes?limit=1",
      {
        headers: { "X-Api-Key": process.env.NINJAS_API_KEY },
      }
    );

    herta.sendMessage(message.from, result.data[0].joke);
  },
};

export default joke;
