import chalk from "chalk";

const info = (text: string, lead = "info"): void =>
  console.log(`${chalk.blue(lead)} ${chalk.gray("=>")} ${text}`);

const error = (text: string, lead = "error"): void =>
  console.log(`${chalk.red(lead)} ${chalk.gray("=>")} ${text}`);

const warn = (text: string, lead = "warn"): void =>
  console.log(`${chalk.yellow(lead)} ${chalk.gray("=>")} ${text}`);

const debug = (text: string, lead = "debug"): void | null =>
  process.env.NODE_ENV !== "production"
    ? console.log(`${chalk.grey(lead)} ${chalk.gray("=>")} ${text}`)
    : null;

export { info, error, warn, debug };
