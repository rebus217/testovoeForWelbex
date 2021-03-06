const { Pool } = require('pg')
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'welbex2',
    password: 'password',
    port: 5432,
})



module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}