import axios from "axios";

const doit = async () => {
  type ParamsType = { s: string; t: string; q: string };

  const params: ParamsType = {
    s: "",
    t: "",
    q: "",
  };

  const splittedMessage = "!translate -s en -t es -q hello world".split("-");
  splittedMessage.shift();
  splittedMessage.forEach((element) => {
    const [key, ...value] = element.split(" ");
    params[key as keyof ParamsType] = value.join(" ").trim();
  });

  const encodedParams: URLSearchParams = new URLSearchParams();
  encodedParams.set("q", params.q);
  encodedParams.set("target", params.t);
  encodedParams.set("source", params.s);

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

  console.log(options);
  const response = await axios.request(options);
  console.log(`
  *Terjemahan:*

  ${response.data.data.translations[0].translatedText}
      `);
};

doit();
