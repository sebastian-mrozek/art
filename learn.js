/// <reference path="./p5.d/p5.global-mode.d.ts" />

let WIDTH = 800,
  HEIGHT = 600;

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

let speed = 1000;

function draw() {
  noStroke();
  fill("#aaaa");
  rect(0, 0, 100, 100);
  fill("#3fa2");
  ellipse(50, 50, 100, 100);
  // for (i = 0; i < speed; i++) drawMovingEllipse();
}

let x = 0;
let y = 0;

function drawMovingEllipse() {
  ellipse(x, y, random(80, 120), random(80, 120));
  x = (x + random(-5, 7)) % width;
  y = (y + random(-6, 9)) % height;
  randomFill();
}

function drawEllipsesMouseClick() {
  if (isDrawing()) {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(random255(), random255(), random255(), random255());
    }
    ellipse(mouseX, mouseY, 80, 80);
  }
}

function randomFill() {
  var r = random255(),
    g = random255(),
    b = random255();
  let t = random(10, 100);
  fill(r, g, b, 100);
  stroke(0, 0, 0, 250);
}

function random255() {
  return random(0, 255);
}

function isDrawing() {
  return true;
}
