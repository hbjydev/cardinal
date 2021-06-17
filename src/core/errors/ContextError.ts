// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

export default class ContextError implements Error {
  public name = 'ContextError';
  public message: string;

  public constructor(required: 'guild' | 'DM') {
    this.message = `This command can only be run in a ${required} context.`;
  }
}
