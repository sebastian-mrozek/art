/// <reference path="./p5.d/p5.global-mode.d.ts" />

let WIDTH = 800,
  HEIGHT = 600,
  ONE = 100,
  HALF = ONE / 2,
  BACKGROUND_COLOR = "#000f",
  FOREGROUND_COLOR = "#ffff";

let START = 1,
  MIDDLE = 0,
  END = -1;

function setup() {
  calculateCanvasSize();
  randomizeColors();
  createCanvas(WIDTH, HEIGHT);
  noStroke();
  // noLoop();
  frameRate(0.5);
}

function calculateCanvasSize() {
  WIDTH = windowWidth * 0.9;
  HEIGHT = windowHeight * 0.8;
}

function randomizeColors() {
  BACKGROUND_COLOR = getRandomColor(DARK);
  FOREGROUND_COLOR = getRandomColor(LIGHT);
}

function draw() {
  // ONE = randomInt(5, 10) * 12;
  // HALF = ONE / 2;
  randomizeColors();
  background(BACKGROUND_COLOR);

  let rows = HEIGHT / HALF;
  let cols = WIDTH / ONE;
  fill(FOREGROUND_COLOR);

  for (var row = 0; row < rows; row++) {
    drawStripe(row);
    if (row > 0 && row < rows - 1) {
      let column = isEven(row) ? randomInt(1, cols / 2 - 4) : randomInt(cols / 2 + 2, cols - 2);
      drawKoru(row, column, END);
      let middleCount = randomInt(0, 3);
      for (var m = 1; m <= middleCount; m++) {
        drawKoru(row, column + m, MIDDLE);
      }
      drawKoru(row, column + middleCount + 1, START);
    }
  }
}

function drawKoru(row, column, mode) {
  let foregroundColor = getForegroundColor(row);
  let backgroundColor = getBackgroundColor(row);
  clearBg(row, column, mode, backgroundColor);
  drawCircle(row, column, foregroundColor);
}

function clearBg(row, column, mode, color) {
  let position = getClearRectPos(row, column, mode);
  let size = getClearRectSize(mode);
  fill(color);
  rect(position.x, position.y, size.x, size.y);
}

function getClearRectPos(row, column, mode) {
  var x, y;
  if (mode == END) {
    x = column * ONE + HALF;
  } else if (mode == START || mode == MIDDLE) {
    x = column * ONE;
  }
  y = row * HALF + 1;
  return createVector(x, y);
}

function getClearRectSize(mode) {
  let width = mode == MIDDLE ? ONE : HALF;
  return createVector(width + 1, HALF);
}

function drawCircle(row, column, color) {
  let x = column * ONE + HALF;
  let y = row * HALF;
  fill(color);
  ellipse(x, y, ONE, ONE);
}

function drawStripe(row) {
  let color = getForegroundColor(row);
  fill(color);
  rect(0, row * HALF, WIDTH, HALF);
}

function getForegroundColor(row) {
  return isEven(row) ? FOREGROUND_COLOR : BACKGROUND_COLOR;
}

function getBackgroundColor(row) {
  return isEven(row) ? BACKGROUND_COLOR : FOREGROUND_COLOR;
}

function isEven(i) {
  return i % 2 == 0;
}

function randomInt(from, to) {
  return round(random(from, to));
}

const LIGHT = 1,
  DARK = 0;

function getRandomColor(mode) {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const random = Math.random();
    const bit = ((mode ? 8 : 0) + random * 8) | 0;
    color += bit.toString(16);
  }
  return color;
}

function windowResized() {
  calculateCanvasSize();
  resizeCanvas(WIDTH, HEIGHT);
}
