import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1606636897973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
            {'name':'id',type:'int', isGenerated:true,isPrimary:true,generationStrategy:'increment'},
            {name:'username',type:'varchar'},
            {name:'passwordDigest', type:'varchar'},
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.dropTable('users')
  }
}
