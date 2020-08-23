import { ClientEvents } from 'discord.js';
import Cardinal from './Cardinal';

type MaybePromise<T> = T | Promise<T>;

export default abstract class Event<T extends keyof ClientEvents> {
  public event!: T;

  public description!: string;

  public constructor(protected cardinal: Cardinal) {}

  public abstract run(...params: ClientEvents[T]): MaybePromise<void>;
}
