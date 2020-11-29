import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPosts1606637719637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name:'posts',
            columns:[
                {name:'id',isGenerated:true, generationStrategy:'increment',isPrimary:true,type:'int'},
                {name:'title',type:'varchar'},
                {name:'content',type:'text'},
                {name:'authorId',type:'int'}

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('posts')
    }

}
