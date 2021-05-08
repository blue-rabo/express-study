'use strict';

import $ from 'jquery';

// id="block"が設定されたdiv要素を取得
const block = $('#block');
// id="scaling-button"が設定されたbutton要素を取得
const scalingButton = $('#scaling-button');
// id="moving-button"が設定されたbutton要素を取得
const movingButton = $('#moving-button');
// loadavg というidが設定された段落要素を表すjQueryオブジェクトを取得
const loadavg = $('#loadavg');

scalingButton.on('click', () => {
  // 2秒かけて四角の高さと幅を200ptにし、その後2秒かけて100ptに戻すというアニメーションを実装
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

movingButton.on('click', () => {
  // 四角形が0.5秒間 かけて右に移動し、 その後1秒かけて戻ってくるアニメーションを実装
  block.animate({ 'marginLeft': '500px' }, 500);
  block.animate({ 'marginLeft': '20px' }, 1000);
});

// 第二引数に与えられた整数のミリ秒間隔で、第一引数で渡された関数を実行
setInterval(() => {
  // '/server-status'というパスになにもデータを渡さずアクセス
  $.get('/server-status', {}, (data) => {
    // dataのプロパティのloadavgの配列取得して文字列に変換し段落の内部のテキストとして設定
    loadavg.text(data.loadavg.toString());
  });
}, 1000);