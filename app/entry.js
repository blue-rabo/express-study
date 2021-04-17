'use strict';

import $ from 'jquery';

// id="block"が設定されたdiv要素を取得
const block = $('#block');
// id="scaling-button"が設定されたbutton要素を取得
const scalingButton = $('#scaling-button');
// id="moving-button"が設定されたbutton要素を取得
const movingButton = $('#moving-button');

scalingButton.on('click', () => {
  // 2秒かけて四角の高さと幅を200ptにし、その後2秒かけて100ptに戻すというアニメーションを実装
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

movingButton.on('click', () => {
  // 四角形が 0.5 秒間 かけて右に移動し、 その後 1 秒かけて戻ってくるアニメーションを実装
  block.animate({ 'marginLeft': '500px' }, 500);
  block.animate({ 'marginLeft': '20px' }, 1000);
});