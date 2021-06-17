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
} from 'typeorm';
import Macro from './Macro.entity';

@Entity({ name: 'macros_responses' })
export default class MacroResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Macro, (m) => m.id)
  @JoinColumn({ name: 'macro_id' })
  public macro?: Promise<Macro>;

  @Column({ length: '255', nullable: false })
  public content?: string;
}
