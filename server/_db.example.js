const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'welbex',
    password: 'password',
    port: 5432,
})
module.exports = {pool}
