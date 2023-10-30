import WAWebJS, { Client } from "whatsapp-web.js";

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  prefix?: boolean;
  action: (herta: Client, message: WAWebJS.Message) => void;
}
