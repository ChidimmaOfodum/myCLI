import { usageFunction } from "./options.js";
import { countries } from "./countries.js";
import { args } from "./options.js";

const options = args
  .usage("$0", "", usageFunction)

  .option("-list", {
    alias: "list",
    describe: "Lists available languages a user can translate to",
    demandOption: false,
  })

  .option("l", {
    alias: "language",
    type: "string",
    describe: "Language to be translated to",
    demandOption: false,
  })

  .option("s", {
    alias: "sentence",
    describe: "Sentence to be translated",
    type: "string",
    demandOption: false,
  }).argv;


if (options.list) {
  let result = "";
  for (let country in countries) {
    result = result + "\n" + country;
  }
  console.log(
    boxen(chalk.green(result), {
      padding: 1,
      width: 25,
      borderColor: "green",
      dimBorder: true,
    })
  );
}

if (options.language) {
  if (!options.sentence) {
    console.log(new Error("A sentence to translate is required"));
  } else {
    for (let country in countries) {
      if (options.language.toLowerCase() === country.toLowerCase()) {
        let countryCode = countries[country];
        const url = `https://api.mymemory.translated.net/get?q=${options.sentence}&langpair=en|${countryCode}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const { responseData } = data;

            let translatedText = responseData.translatedText;
            translatedText = chalk.green(
              `${options.sentence}\n \n${translatedText}`
            );

            console.log(
              boxen(translatedText, {
                padding: 1,
                borderColor: "green",
                dimBorder: true,
              })
            );
          });
      }
    }
  }
}
