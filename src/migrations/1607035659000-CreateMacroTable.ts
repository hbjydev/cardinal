// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMacroTable1607035659000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'macros',
      columns: [
        { name: 'id', isPrimary: true, isGenerated: true, type: 'integer' },
        { name: 'guild_id', type: 'integer' },
        { name: 'name', type: 'character varying', length: '24' },
        { name: 'content', type: 'character varying', length: '1000' },
      ],
    });

    await queryRunner.createTable(table);
    await queryRunner.createForeignKey(
      'macros',
      new TableForeignKey({
        columnNames: ['guild_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'guilds',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('macros', true, true, true);
  }
}
