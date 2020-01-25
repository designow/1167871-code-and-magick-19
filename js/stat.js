'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 10;
var FONT_SIZE = 16;
var FONT_NAME = 'PT Mono';
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var YOUR_COLOR = 'rgba(255, 0, 0, 1)';
var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
var CLOUD_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR_2 = 'rgba(255, 255, 255, 1)';
var BAR_HEIGHT = 150;
var LEGEND_HEIGHT = CLOUD_Y + GAP + FONT_GAP * 2 + FONT_SIZE;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderHistogram = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + GAP * 2) + LEGEND_HEIGHT + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - FONT_GAP);
    ctx.fillStyle = (players[i] === 'Вы') ? YOUR_COLOR : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%,  50%)';
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + GAP * 2) + LEGEND_HEIGHT + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_COLOR);
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR_2);
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_SIZE + 'px ' + FONT_NAME;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_SIZE);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_SIZE * 2);
  renderHistogram(ctx, players, times);
};


