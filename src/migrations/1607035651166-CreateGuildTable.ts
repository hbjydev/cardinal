// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGuildTable1607035651166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'guilds',
      columns: [
        { name: 'id', isPrimary: true, isGenerated: true, type: 'integer' },
        { name: 'guild_id', type: 'character varying', isUnique: true },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('guilds', true, true, true);
  }
}
