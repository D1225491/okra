var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, 'sqlite.db');

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法開啟資料庫:', err.message);
    } else {
        console.log('成功開啟資料庫');
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 查詢所有價格資料
app.get('/api/prices', (req, res) => {
    db.all('SELECT * FROM okra_price', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// 查詢功能：根據 year、month、price（可選）查詢
app.post('/api/search', (req, res) => {
    const { year, month, price } = req.body;
    if (!year || !month) {
        res.status(400).json({ error: '缺少必要欄位' });
        return;
    }
    let sql = 'SELECT * FROM okra_price WHERE year = ? AND month = ?';
    const params = [year, month];
    if (price) {
        sql += ' AND price = ?';
        params.push(price);
    }
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = app;
