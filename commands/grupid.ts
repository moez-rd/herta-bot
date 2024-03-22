import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";

const sticker: Command = {
  name: "groupid",
  description: "Ambil id grup.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    const chat = (await message.getChat()) as any;

    if (!chat.isGroup) {
        message.reply("Maaf ini bukan grup:(");
        return
    }

    message.reply(message.from);
  },
};

export default sticker;
