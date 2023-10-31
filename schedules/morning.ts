import { DateTime } from "luxon";
import { config } from "../config";
import { Client, MessageMedia } from "whatsapp-web.js";

export const morning = (herta: Client) => {
  const media = MessageMedia.fromFilePath("./media/morning.jpg");

  setInterval(() => {
    const now = DateTime.now()
      .setZone(config.TIMEZONE)
      .toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET);

    if (
      now ===
      DateTime.fromISO("2023-10-30T06:00:00", {
        zone: config.TIMEZONE,
      }).toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET)
    ) {
      herta.sendMessage(process.env.CHAT_DIGITALIZM || "", media);
    }
  }, 1000);
};
