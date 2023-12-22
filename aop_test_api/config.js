const knex = require('knex');

const config = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'db_aop_test',
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};

const knexInstance = knex(config);

module.exports = {
    ...config,
    knexInstance: knexInstance
};
