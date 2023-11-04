import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
import axios from "axios";

const sticker: Command = {
  name: "translate",
  aliases: ["trl", "terjemah"],
  description: "Google translate.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    // !translate -s en -t es -m Hello World
    const params: string[] = [];

    const splittedMessage = message.body.split("-");
    splittedMessage.shift();
    splittedMessage.forEach((element) => {
      params.push(element.split(" ")[1]);
    });

    const encodedParams: URLSearchParams = new URLSearchParams();
    encodedParams.set("source", params[0]);
    encodedParams.set("target", params[1]);
    encodedParams.set("q", params[2]);

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "27adfd066emsh1d102846246a34ep109c86jsnee4af015711f",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      message.reply(response.data);
    } catch (error) {
      message.reply(error as string);
    }
  },
};

export default sticker;
