#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const args = yargs(hideBin(process.argv));



export function usageFunction(yargs) {

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









