import { Sequelize } from 'sequelize';

const db = new Sequelize('node-rest-server-bd', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;