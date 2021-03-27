'use strict';

// Expressで使用するnpmモジュール
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// helmet モジュール
var helmet  = require('helmet');

// Routerオブジェクトのモジュール
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

// debug モジュール
const debug = require('debug');
// module:infoをログ出力
const debugInfo = debug('module:info');
setInterval(() => {
  debugInfo('some information.');
}, 1000);
// module:errorをログ出力
const debugError = debug('module:error');
setInterval(() => {
  debugError('some error.');
}, 1000);

var app = express();

// 標準的なセキュリティ対策
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ログを出すための logger を使う設定
app.use(logger('dev'));
// json 形式を解釈したり作成するための json を使う設定
app.use(express.json());
// URL をエンコードしたりデコードするための urlencoded を使う設定
app.use(express.urlencoded({ extended: false }));
// Cookie を解釈したり作成するための cookieParser を使う設定
app.use(cookieParser());
// 静的なファイルを public というディレクトリにするという設定
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング設定
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);
app.use('/photos/:title', photosRouter);

// catch 404 and forward to error handler
// 存在しないパスへのアクセスがあった際の処理
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// エラー処理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 開発環境の場合はerr、本番環境の場合はerrを出力しないよう設定
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // エラーページを出力
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
