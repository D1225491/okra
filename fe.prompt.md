在 app.js 中，使用 sqlite3 來操作資料庫，並開啟位置在 db/sqlite.db 的資料庫，需要確認是否成功打開資料庫。不要用匯入 db.js的方式。,
在 app.js 中，撰寫 /api/prices 路由，使用 SQL 來查詢 okra_price table 所有的的資料，回傳 json 格式的資料就好。,
在 app.js 中，撰寫 post /api/insert 路由，使用 SQLite 新增一筆資料 (year, month, price)，okra_price 中，回傳文字的訊息，不要 json。