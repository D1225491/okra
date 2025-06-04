1. 在 index.html 中，用 get 呼叫 /api/prices api ，最下方用 table 顯示 okra_price 所有資料,
2. 在 index.html 中，產生 可以輸入 年分 月份 價錢 (year, month, price) 的表單，不使用 action,
3. 在 index.html 中，將上面表單的資料，透過 fetch async await 來發送 POST 請求到 /api/insert ，並在成功後，用 p 顯示伺服器回傳的【純文字】訊息，不是 json