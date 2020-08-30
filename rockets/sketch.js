function setup() {
    createCanvas(400, 400, WEBGL);
  frameRate(60);
  noFill();
}

var xTranslate = 0;
var yTranslate = 0;
var zoom = 1;
function draw() {
  background(255);
  push();
  scale(zoom);
  rotateX(yTranslate);
  rotateY(-xTranslate);
  box(50);
  pop();
  
  //TODO: Can remove from prod (rem)
  push();
  rotateX(frameCount * -0.008);
  rotateY(frameCount * -0.0051);
  box(20);
  pop();
  // end (rem)
}

var mouseScale = 0.02;
function mouseDragged() {
  xTranslate += (pmouseX - mouseX) * mouseScale;
  yTranslate += (pmouseY - mouseY) * mouseScale;
}

var scrollScale = 0.02;
function mouseWheel(event) {
  zoom /= 1 + (event.delta * scrollScale);
  mouseScale = 0.02 / zoom;
  return false;
}