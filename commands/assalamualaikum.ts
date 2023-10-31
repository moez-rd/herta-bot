import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";

const assalamualaikum: Command = {
  name: "assalamualaikum",
  aliases: ["samlekom", "slmkm"],
  description: "hehe.",
  prefix: false,
  action: (herta: Client, message: WAWebJS.Message) => {
    message.reply("Waalaikumsalam");
  },
};

export default assalamualaikum;
