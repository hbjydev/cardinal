import chalk from 'chalk';

const info = (text: string, lead = 'info') =>
  console.log(`${chalk.blue(lead)} ${chalk.gray('=>')} ${text}`);

const error = (text: string, lead = 'error') =>
  console.log(`${chalk.red(lead)} ${chalk.gray('=>')} ${text}`);

const warn = (text: string, lead = 'warn') =>
  console.log(`${chalk.yellow(lead)} ${chalk.gray('=>')} ${text}`);

export { info, error, warn };
