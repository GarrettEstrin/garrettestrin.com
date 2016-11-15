var angle = 0
var img;
function setup(){
  var canvas = createCanvas(300,200, WEBGL)
  img = loadImage('https://garrettestrin.github.io/connect_four/logo.png')
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('b');
}

function draw(){
  texture(img)
  rotateX(radians(angle))
  rotateY(radians(angle))
  rotateZ(radians(angle))
  box(500,500,500)
  angle += .3
}
