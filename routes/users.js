var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // 文字列をレスポンスとして設定
  res.send('respond with a resource');
});

module.exports = router;
