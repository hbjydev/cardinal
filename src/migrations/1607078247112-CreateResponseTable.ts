import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn} from "typeorm";

export class CreateResponseTable1607078247112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'macros_responses',
      columns: [
        { name: 'id', isPrimary: true, isGenerated: true, type: 'integer' },
        { name: 'macro_id', type: 'integer' },
        { name: 'content', type: 'character varying', length: '1000' },
      ]
    });

    await queryRunner.createTable(table);
    await queryRunner.createForeignKey('macros_responses', new TableForeignKey({
      columnNames: [ 'macro_id' ],
      referencedColumnNames: [ 'id' ],
      referencedTableName: 'macros',
      onDelete: 'CASCADE'
    }));

    await queryRunner.dropColumn('macros', 'content');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'macros',
      new TableColumn({ name: 'content', type: 'character varying', length: '1000' })
    );

    await queryRunner.dropTable('macros_responses', true, true, true);
  }
}
