// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import Macro from './Macro.entity';

@Entity({ name: 'guilds' })
export default class Guild extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true, nullable: false, name: 'guild_id' })
  public guildId?: string;

  @OneToMany(() => Macro, (m) => m.guild)
  public macros?: Promise<Macro[]>;
}
