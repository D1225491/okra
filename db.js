const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, 'sqlite.db');

// 確保 db 目錄存在
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

// 開啟資料庫
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法開啟資料庫:', err.message);
    } else {
        console.log('成功開啟資料庫');
        initTable();
    }
});

// 建立 okra_price table 並插入資料
function initTable() {
    db.run(`CREATE TABLE IF NOT EXISTS okra_price (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER NOT NULL,
        month INTEGER NOT NULL,
        price REAL NOT NULL
    )`, [], (err) => {
        if (err) {
            console.error('建立 table 失敗:', err.message);
        } else {
            insertData();
        }
    });
}

// 插入資料
function insertData() {
    const data = [
        [2020, 6, 49.21],[2020, 7, 49.94],[2020, 8, 62.18],[2020, 9, 47.14],[2020, 10, 38.84],[2020, 11, 40.21],[2020, 12, 60.92],
        [2021, 1, 111.48],[2021, 2, 87.44],[2021, 3, 61.22],[2021, 4, 51.93],[2021, 5, 40.41],[2021, 6, 61.63],[2021, 7, 55.13],[2021, 8, 95.58],
        [2021, 9, 48.83],[2021, 10, 53.01],[2021, 11, 42.48],[2021, 12, 42.53],[2022, 1, 87.53],[2022, 2, 89.22],[2022, 3, 98.93],[2022, 4, 67.86],[2022, 5, 55.09],[2022, 6, 47.88],[2022, 7, 43.09],[2022, 8, 49.83],[2022, 9, 62.65],[2022, 10, 51.69],[2022, 11, 36.91],[2022, 12, 61.35],
        [2023, 1, 88.2],[2023, 2, 86.75],[2023, 3, 75.05],[2023, 4, 57.1],[2023, 5, 47.89],[2023, 6, 38.42],[2023, 7, 54.17],[2023, 8, 75.14],[2023, 9, 71.78],[2023, 10, 65.47],[2023, 11, 45.4],[2023, 12, 44.53],
        [2024, 1, 64.85],[2024, 2, 55.11],[2024, 3, 68.83],[2024, 4, 54.74],[2024, 5, 54.56],[2024, 6, 36.58],[2024, 7, 48.21],[2024, 8, 67.77],[2024, 9, 54.78],[2024, 10, 66.58],[2024, 11, 65.03],[2024, 12, 64.88],
        [2025, 1, 92.67],[2025, 2, 103.24],[2025, 3, 78.62],[2025, 4, 58.02],[2025, 5, 41.43],[2025, 6, 23.28]
    ];
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO okra_price (year, month, price) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM okra_price WHERE year = ? AND month = ?)');
        data.forEach(([year, month, price]) => {
            stmt.run(year, month, price, year, month);
        });
        stmt.finalize();
    });
}

module.exports = db;

