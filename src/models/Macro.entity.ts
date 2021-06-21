// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Guild from './Guild.entity';
import MacroResponse from './MacroResponse.entity';

@Entity({ name: 'macros' })
export default class Macro extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Guild, (g) => g.id)
  @JoinColumn({ name: 'guild_id' })
  public guild?: Promise<Guild>;

  @Column({ length: '24', nullable: false })
  public name?: string;

  @OneToMany(() => MacroResponse, (r) => r.macro)
  public responses?: Promise<MacroResponse[]>;
}
