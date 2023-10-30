import WAWebJS, { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { config } from "./config";
import { Command } from "./types/command";
import { readdir } from "fs/promises";
import dotenv from "dotenv";
import { morning } from "./schedules/morning";

dotenv.config();

async function readCommands() {
  const commands = new Map<String, Command>();

  const files = await readdir("./commands");

  files.forEach((file) => {
    const command = require(`./commands/${file}`);
    commands.set(file.split(".")[0], command.default);
  });

  return commands;
}

async function connect() {
  const commands = readCommands();

  const herta: Client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });

  herta.initialize();

  herta.on("qr", (qr: string) => {
    qrcode.generate(qr, { small: true });
  });

  herta.on("ready", () => {
    console.log("Herta is ready🚀");

    morning(herta);
  });

  herta.on("disconnected", async (reason) => {
    console.log("Disconnect ", reason);
    connect();
  });

  herta.on("message", async (message: WAWebJS.Message) => {
    if (message.body.toLowerCase().startsWith(`${config.PREFIX}help`)) {
      let response = "*=== HERTA COMMANDS ===*\n\n";
      (await commands).forEach((command) => {
        response += `*[${config.PREFIX}${command.name}`;

        command.aliases?.forEach((alias) => {
          response += `|${config.PREFIX}${alias}`;
        });

        response += "]*\n";
        response += `- ${command.description}\n\n`;
      });

      message.reply(response);
    }

    (await commands).forEach(async (command) => {
      let withPrefix = command.prefix ?? true;

      let commandMatch =
        message.body
          .toLowerCase()
          .startsWith(`${withPrefix ? config.PREFIX : ""}${command.name}`) ||
        command.aliases
          ?.map((alias) => {
            return message.body
              .toLowerCase()
              .startsWith(`${withPrefix ? config.PREFIX : ""}${alias}`);
          })
          .includes(true);

      if (commandMatch) {
        (await command).action(herta, message);
      }
    });
  });

  return herta;
}

connect();
