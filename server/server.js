const express = require("express");
const path = require('path')
const fs = require('fs')
const util = require('util')
const cors = require('cors')
const app = express();
const jsonParser = express.json();
const config = require('./config')

const db = require("./_db");

const readFile = util.promisify(fs.readFile)

app.use(cors());

const BUILD_DIR = path.join(__dirname, '../build');

app.use(express.static(BUILD_DIR));

app.post('/api/get_table_data', jsonParser, async function (req, res){
    try {
        db.query('SELECT date, name, count, distance FROM table_data', (err, result) => {
            if (err)  throw new Error(err)
            res.json({success: 1, data: result.rows})
        })

    } catch (e) {
        console.error('/api/get_table_data Error:', e)
        res.json({success: 0, error: e})
    }
})


app.use(async (req, res)=> {
    const html = await readFile(path.join(__dirname, '../build/index.html'), 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
})


app.listen(config.http.port, function () {
    console.log('server run at port', config.http.port)
});