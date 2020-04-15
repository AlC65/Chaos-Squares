let w, h, inc;
let board;
let func;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  func = checkerbrd;
  background(0);
  frameRate(35);
  strokeWeight(3);
  inc = 50;
  h = floor(height / inc) * inc;
  w = floor(width / inc) * inc;
  board = createImage(h, h);
  board.loadPixels();
  let yellow = 0xffff00;
  let blue = 0x0000ff;
  for (let i = 0; i < h; ++i)
    for (let j = 0; j < h; ++j) {
      let colour = (floor(i / inc) + floor(j / inc)) % 2 ? yellow : blue;
      let index = (j * h + i) * 4;
      if (colour == yellow) {
        board.pixels[index + 0] = 255;
        board.pixels[index + 1] = 255;
        board.pixels[index + 2] = 0;
        board.pixels[index + 3] = 255;
      }
      else {
        board.pixels[index + 0] = 0;
        board.pixels[index + 1] = 0;
        board.pixels[index + 2] = 255;
        board.pixels[index + 3] = 255;
      }
    }
  board.updatePixels();
}
function draw() {
  translate(round((w - h) / 2), 10);
  func();
}
function keyPressed() {
  if (key == '9') func = checkerbrd
  else
    drawShape(key);
}
function checkerbrd() {
  background(0);
  image(board, 0, 0);
}
function drawSierpinski() {
  for (let i = 0; i < 200; ++i)
    sierpinski();
}
function drawShape(key) {
  if (key == '1')
    func = drawSquare1;
  else if (key == '2')
    func = drawSquare2;
  else if (key == '3')
    func = drawSquare3;
  else if (key == '4')
    func = drawSquare4;
  else if (key == '5')
    func = drawSierpinski;

}
function drawSquare2() {
  for (let i = 0; i < 110; ++i)
    squr2(0, 0, h, h);
}
function drawSquare3() {
  for (let i = 0; i < 150; ++i)
    squr3(0, 0, h, h);
}
function drawSquare4() {
  for (let i = 0; i < 150; ++i)
    squr4(0, 0, h, h);
}
function drawSquare1() {
  for (let i = 0; i < 110; ++i)
    squr1(0, 0, h, h);
}
function midpoint(p1, p2) {
  let a = createVector(floor((p1.x + p2.x) / 2), floor((p1.y + p2.y) / 2));
  return a;
}
function setColour(x, y) {
  let colour = board.pixels[(y * h + x) * 4];
  if (colour == 255)
    stroke('blue');
  else
    stroke('yellow');
}
function sierpinski() {
  if (typeof sierpinski.sierpnt == 'undefined')
    sierpinski.sierpnt = createVector(h / 2, h / 2);
  let corners = [createVector(0, h), createVector(h / 2, 0), createVector(h, h)];
  sierpinski.sierpnt = midpoint(sierpinski.sierpnt, random(corners));
  setColour(sierpinski.sierpnt.x, sierpinski.sierpnt.y);
  point(sierpinski.sierpnt.x, sierpinski.sierpnt.y);
}
function squr2(x0, y0, xwide, ytop) {
  if (typeof squr2.mid2 == 'undefined' && typeof squr2.prevcorner2 == 'undefined') {
    squr2.prevcorner2 = -10;
    squr2.mid2 = createVector(floor(h / 2), floor(h / 2));
  }
  let intcorners = [0, 1, 2, 3]
  let corners = [createVector(x0, y0), createVector(xwide, y0), createVector(xwide, ytop), createVector(x0, ytop)];
  let intcorner = random(intcorners);
  let anticlockwise = (squr2.prevcorner2 - intcorner == 1) || (squr2.prevcorner2 - intcorner == -3);
  if (!anticlockwise) {
    squr2.mid2 = midpoint(corners[intcorner], squr2.mid2);
    setColour(squr2.mid2.x, squr2.mid2.y);
    point(squr2.mid2.x, squr2.mid2.y);
    squr2.prevcorner2 = intcorner;
  }
}
function squr1(x0, y0, xwide, ytop) {
  if (typeof squr1.mid1 == 'undefined' && typeof squr1.prevcorner1 == 'undefined') {
    squr1.prevcorner1 = createVector(-1, -1);
    squr1.mid1 = createVector(floor(h / 2), floor(h / 3));
  }
  let corners = [createVector(x0, y0), createVector(xwide, y0), createVector(xwide, ytop), createVector(x0, ytop)];
  let corner = random(corners);
  if (!corner.equals(squr1.prevcorner1)) {
    squr1.mid1 = midpoint(corner, squr1.mid1);
    setColour(squr1.mid1.x, squr1.mid1.y);
    point(squr1.mid1.x, squr1.mid1.y);
    squr1.prevcorner1 = corner.copy();
  }
}
function squr3(x0, y0, xwide, ytop) {
  if (typeof squr3.mid3 == 'undefined' && typeof squr3.prevcorner3 == 'undefined') {
    squr3.prevcorner3 = [-1, -2];
    squr3.mid3 = createVector(floor(h / 2), floor(h / 2));
  }
  let intcorners = [0, 1, 2, 3]
  let corners = [createVector(x0, y0), createVector(xwide, y0), createVector(xwide, ytop), createVector(x0, ytop)];
  let intcorner = random(intcorners);
  let neighbours = abs(intcorner - squr3.prevcorner3[1]);
  neighbours = (neighbours == 1 || neighbours == 3);
  if (!(neighbours && (squr3.prevcorner3[0] === squr3.prevcorner3[1]))) {
    squr3.mid3 = midpoint(corners[intcorner], squr3.mid3);
    setColour(squr3.mid3.x, squr3.mid3.y);
    point(squr3.mid3.x, squr3.mid3.y);
    squr3.prevcorner3[0] = squr3.prevcorner3[1];
    squr3.prevcorner3[1] = intcorner;
  }
}
function squr4(x0, y0, xwide, ytop) {
  if (typeof squr4.mid4 == 'undefined' && typeof squr4.prevcorner4 == 'undefined') {
    squr4.prevcorner4 = -1;
    squr4.mid4 = createVector(floor(h / 2), floor(h / 4));
  }
  let intcorners = [0, 1, 2, 3]
  let corners = [createVector(x0, y0), createVector(xwide, y0), createVector(xwide, ytop), createVector(x0, ytop)];
  let intcorner = random(intcorners);

  if ((intcorner === squr4.prevcorner4) || !(intcorner % 2 === squr4.prevcorner4 % 2)) {
    squr4.mid4 = midpoint(corners[intcorner], squr4.mid4);
    setColour(squr4.mid4.x, squr4.mid4.y);
    point(squr4.mid4.x, squr4.mid4.y);
    squr4.prevcorner4 = intcorner;
  }
}