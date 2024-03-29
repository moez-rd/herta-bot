import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";

const ping: Command = {
  name: "ping",
  description: "pong.",
  action: (herta: Client, message: WAWebJS.Message) => {
    message.reply("pong");
  },
};

export default ping;
