import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
import jokes from "../data/jokes.json";

const lawak: Command = {
  name: "lawak",
  description: "Candaan bahasa indo.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    herta.sendMessage(
      message.from,
      jokes[Math.floor(Math.random() * jokes.length)]
    );
  },
};

export default lawak;
