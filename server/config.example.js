const config = {
    http: {
        port: 8810,
        singleSession: true,
    },
    database: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'Welbex',
        multipleStatements: true,
        timezone: 'Z',
    },
}

module.exports = config;