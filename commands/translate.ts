import WAWebJS, { Client } from "whatsapp-web.js";
import { Command } from "../types/command";
import axios from "axios";

const sticker: Command = {
  name: "translate",
  aliases: ["trl", "terjemah"],
  description: "Google translate.",
  action: async (herta: Client, message: WAWebJS.Message) => {
    // !translate -s en -t es -m Hello World
    type ParamsType = { s: string; t: string; q: string };

    const params: ParamsType = {
      s: "",
      t: "",
      q: "",
    };

    const splittedMessage = message.body.split("-");
    splittedMessage.shift();
    splittedMessage.forEach((element) => {
      const [key, ...value] = element.split(" ");
      params[key as keyof ParamsType] = value.join(" ");
    });

    const encodedParams: URLSearchParams = new URLSearchParams();
    encodedParams.set("source", params.s);
    encodedParams.set("target", params.t);
    encodedParams.set("q", params.q);

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

    const response = await axios.request(options);
    message.reply(`
*Terjemahan:*

${response.data.data.translations[0].translatedText}
    `);
  },
};

export default sticker;
