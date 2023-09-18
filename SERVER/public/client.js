const socket = io()

let size;
let col = 0;
let id = 0;
let slider

let elements = [];
let cursors = []

function setup() {
  createCanvas(400, 400);
  color = createColorPicker("green");
  slider = createSlider(0, 40, 20);
  id = int(random() * 1000)
  //console.log("id: ", id)
}

function draw() {
  background(220);
  noStroke();

  //draw from elements list
  elements.forEach((element) => {
    fill(element.col);
    ellipse(element.x, element.y, element.size, element.size);
  })

  //draw from cursors list
  cursors.forEach((element) => {
    fill(element.col),
      ellipse(element.x, element.y, element.size, element.size)
  })
}

function mousePressed() {
  const element = {
    x: mouseX,
    y: mouseY,
    col: color.value(),
    size: slider.value(),
  }

  socket.emit('send-element', element)
}

function mouseDragged() {
  const element = {
    x: mouseX,
    y: mouseY,
    col: color.value(),
    size: slider.value(),
    id: id
  }

  socket.emit('send-cursor', element)
}

socket.on('element-received', (element) => {
  //console.log("element-received: ",element)
  elements.push(element)
})

socket.on('cursor-received', (element) => {
  //console.log("element-received: ",element)
  let cursorIndex = cursors.findIndex((index) => element.id == getItem.id)
  if (cursorIndex != -1) {
    cursors[cursorIndex] = element
  } else {
    cursors.push(element)
  }
})