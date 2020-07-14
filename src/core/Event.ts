import Cardinal from "./Cardinal";

export default class Event {
  public event!: string;
  public description!: string;

  public cardinal: Cardinal;

  public constructor (cardinal: Cardinal) {
    this.cardinal = cardinal;
  }

  public async run(...params: unknown[]): Promise<void> {}
}

