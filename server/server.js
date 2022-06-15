const express = require("express");
const path = require('path')
const fs = require('fs')
const util = require('util')
const cors = require('cors')
const app = express();
const jsonParser = express.json();
const config = require('./config')

const {pool} = require("./_db");

const readFile = util.promisify(fs.readFile)

app.use(cors());


// const newUser = async (params) => {
//     const {login, password} = params
//
//     await singleQuery(`INSERT INTO tpc_watcher (login, password, lastupdated, created)
//     VALUES( ?, SHA2(?, 0), ?, ?)`, [login, password, new Date().toISOString(), new Date().toISOString()]);
// };

const BUILD_DIR = path.join(__dirname, '../build');

app.use(express.static(BUILD_DIR));

app.get('/api/battles', jsonParser, async function (req, res) {
    try {
        // const squads = await GetBattles()
        res.json({success: 1})
    } catch (e) {
        console.error('error /api/battles', e)
        res.sendStatus(400).json({success: 0, error: e});
    }
})
app.post('/api/get_table_data', jsonParser, async function (req, res){
    try{
        let result = await pool.query(`
    SELECT
    date, 
    name,
    count,
    distance
    FROM table_data
    `, (err, res) => {
            if (err) throw new Error(err)
            pool.end()
        })
        res.json({success: 1, data: result.rows})
    } catch (e){
        console.error('/api/get_table_data Error:', e)
    }
})


// app.use(async (req, res)=> {
//     const html = await readFile(path.join(__dirname, '../build/index.html'), 'utf-8')
//     res.setHeader('Content-Type', 'text/html')
//     res.send(html)
// })


app.listen(config.http.port, function () {
    console.log('server run at port', config.http.port)
});