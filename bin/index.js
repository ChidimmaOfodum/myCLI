#!/usr/bin/env node
import yargs from "yargs";
import chalk from "chalk";
import boxen from "boxen";
import { hideBin } from "yargs/helpers";

const args = yargs(hideBin(process.argv));

function usageFunction(yargs) {

  if (!(args.argv.language || args.argv.sentence || args.argv.list)) {
    const pink = chalk.hex("#FF007f");
    const usage = pink(`Usage: mycli -l <language> -s<sentence>`);

    let description = chalk.green(
      `Translates a sentence to a specific language`
    );
    description = boxen(description, { padding: 1, borderColor: "green" });

    const message = `\n${usage} \n \n${description} \n \n \n`;
    console.log(message);
    console.log(yargs.parse("--help"))
  }
}

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
  })
  
  .argv;

const countries = {
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Portuguese: "pt",
  Russian: "ru",
  Chinese: "zh",
  Japanese: "ja",
  Korean: "ko",
  Arabic: "ar",
  Hindi: "hi",
  Bengali: "bn",
  Punjabi: "pa",
  Malay: "ms",
  Thai: "th",
  Vietnamese: "vi",
  Indonesian: "id",
};

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
        .then(data => {
          const {responseData} = data

           let translatedText = responseData.translatedText
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
        })
      }
    }
  }
}

