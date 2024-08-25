import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'root', 'Pa$$w0rd', {
    host: 'localhost',
    dialect: 'mysql',
    //loggin: false
})

export default db;