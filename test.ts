const axios = require("axios");

const doit = async () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("q", "Hello, world!");
  encodedParams.set("target", "es");
  encodedParams.set("source", "en");

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
    console.log(response.data.data.translations[0].translatedText);
  } catch (error) {
    console.error(error);
  }
};

doit();
