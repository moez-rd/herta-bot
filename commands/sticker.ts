import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";

const sticker: Command = {
  name: "sticker",
  aliases: ["stiker"],
  description: "Buat stiker pake gambar.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    if ([process.env.CHAT_KIYOWO, process.env.CHAT_NGODINGVARENG].includes(message.from)) {
      message.reply("Stiker tidak dapat dibuat di grup ini:(");
      return;
    }

    const media = await message.downloadMedia();
    message.reply(media, undefined, { sendMediaAsSticker: true });
  },
};

export default sticker;
