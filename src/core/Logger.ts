import chalk from 'chalk';

const info = (text: string, lead = 'info') => console.log(`${chalk.blue(lead)} ${chalk.gray('=>')} ${text}`);

const error = (text: string, lead = 'error') => console.log(`${chalk.red(lead)} ${chalk.gray('=>')} ${text}`);

const warn = (text: string, lead = 'warn') => console.log(`${chalk.yellow(lead)} ${chalk.gray('=>')} ${text}`);

const debug = (text: string, lead = 'debug') => (process.env.NODE_ENV !== 'production'
  ? console.log(`${chalk.grey(lead)} ${chalk.gray('=>')} ${text}`)
  : null);

export {
  info, error, warn, debug,
};
