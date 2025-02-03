import { Sequelize } from 'sequelize'

const db = new Sequelize('node', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true // ver queries sql por consola
});

export default db;