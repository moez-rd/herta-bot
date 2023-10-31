import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";

const hello: Command = {
  name: "hello",
  aliases: ["hai", "hi", "halo", "hola", "hey", "hei", "p"],
  description: "Greetings.",
  prefix: false,
  action: (herta: Client, message: WAWebJS.Message) => {
    if (message.body !== hello.name && !hello.aliases?.includes(message.body)) {
      return;
    }

    message.reply(`${message.body} juga:)`);
  },
};

export default hello;
