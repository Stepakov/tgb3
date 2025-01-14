import {Sequelize} from "sequelize";

export default new Sequelize(
    'telega_bot',
    'root',
    'root',
    {
        host: '192.168.203.136',
        port: 5432,
        dialect: 'postgres'
    }
)