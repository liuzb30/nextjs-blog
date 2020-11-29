import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createComments1606637981459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name:'comments',
            columns:[
                {name:'id', type:'int', isPrimary:true,isGenerated:true, generationStrategy:'increment'},
                {name:'userId',type:'int'},
                {name:'postId',type:'int'},
                {name:'content',type:'text'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('comments')
    }

}
