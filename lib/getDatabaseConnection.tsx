import 'reflect-metadata'
import {createConnection, getConnection, getConnectionManager} from "typeorm";
import config from 'ormconfig.json'
import {Post} from "../src/entity/Post";
import {User} from "../src/entity/User";
import {Comment} from '../src/entity/Comment';

const create = async ()=>{
    // @ts-ignore()
    return createConnection({
        ...config,
        entities:[Post,User, Comment]
    })
}


export const getDatabaseConnection = async()=>{
    const manager = getConnectionManager()
    if(manager.has('default')){
        await manager.get('default').close()
    }
    return await create()
}
