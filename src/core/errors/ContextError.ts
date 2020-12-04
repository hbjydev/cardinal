export default class ContextError implements Error {
  public name = 'ContextError';
  public message: string;

  public constructor(required: ('guild' | 'DM')) {
    this.message = `This command can only be run in a ${required} context.`;
  }
}
