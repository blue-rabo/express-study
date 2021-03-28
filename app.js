'use strict';

// Expressで使用するnpmモジュール
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet  = require('helmet');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

// Client ID と Client Secret を設定
var GITHUB_CLIENT_ID = 'Client ID(仮)';
var GITHUB_CLIENT_SECRET = 'Client Secret(仮)';

// 認証されたユーザー情報をシリアライズして保存
passport.serializeUser(function (user, done) {
  done(null, user);
});

// シリアライズされたデータをデシリアライズ(元に戻す)
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  // GitHubのOAuthを使用するために必要な情報を設定
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/github/callback'
},
  function (accessToken, refreshToken, profile, done) {
    // 認証後に実行する情報を設定
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// 認証してない場合実行される関数
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Routerオブジェクトのモジュール
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

// デバッグ用のログを出力するプログラム
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

//  Application オブジェクトをexpressのモジュールを利用して生成
var app = express();

// Applicationの設定
// テンプレートファイルがviewsディレクトリにあることを設定
app.set('views', path.join(__dirname, 'views'));
// テンプレートエンジンがpugであることを設定
app.set('view engine', 'pug');

// アプリケーションに必要な処理の組込
// 標準的なセキュリティ対策
app.use(helmet());
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

// express-session と passport でセッションを利用する設定
// セッション ID を作成されるときに利用される秘密鍵の文字列の設定、 セッションを必ずストアに保存しない設定、セッションが初期化されてなくてもストアに保存しない設定
app.use(session({ secret: '秘密鍵(仮)', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// ルーティング設定
app.use('/', indexRouter);
app.use('/users', ensureAuthenticated ,usersRouter);
app.use('/photos', photosRouter);
app.use('/photos/:title', photosRouter);

// GitHubログインをするためのURL
app.get('/auth/github',
  // 認可される権限の範囲の設定
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
});

// GitHubログインした後に帰ってくるURL
app.get('/auth/github/callback',
  // ログインに失敗した際に遷移するURL
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // トップページに遷移
    res.redirect('/');
});

// /login に GET でアクセスした際にログインページを描写
app.get('/login', function (req, res) {
  res.render('login');
});

// /logout に GET でアクセスがあった時にトップページにリダイレクト
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// 存在しないパスへのアクセスがあった際のエラーハンドラ
app.use(function(req, res, next) {
  next(createError(404));
});

// エラーハンドラ
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 開発環境の場合はerr、本番環境の場合は空を設定
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // エラーページを出力
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
