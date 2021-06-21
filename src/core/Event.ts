// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { ClientEvents } from 'discord.js';
import { Cardinal } from './index';

type MaybePromise<T> = T | Promise<T>;

export default abstract class Event<T extends keyof ClientEvents> {
  public event!: T;

  public description!: string;

  public constructor(protected cardinal: Cardinal) {}

  public abstract run(...params: ClientEvents[T]): MaybePromise<void>;
}
