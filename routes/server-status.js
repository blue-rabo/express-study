'use strict';
 
const express = require('express');
const router = express.Router();
// osモジュール ロードアベレージを取得するために使用
const os = require('os');

router.get('/', (req, res, next) => {
  // 受け取ったオブジェクトをJSONの形式でレスポンスを返す関数
  res.json({ loadavg: os.loadavg() });
});

module.exports = router;