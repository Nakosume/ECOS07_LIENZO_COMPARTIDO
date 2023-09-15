const socket = io()

let size = 20;
let r = 0;
let g = 0;
let b = 0;
let col = 0;
let id = 0;

let elements = [];
let cursors = []

function setup() {
  createCanvas(400, 400);
  color = createColorPicker("green");
  r = int(Math.random() * 255)
  g = int(Math.random() * 255)
  b = int(Math.random() * 255)
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
    r: r,
    g: g,
    b: b,
    col: color.value(),
    size
  }

  console.log("color: ", color.value())

  socket.emit('send-element', element)
}

function mouseDragged() {
  const element = {
    x: mouseX,
    y: mouseY,
    r: r,
    g: g,
    b: b,
    col: color.value(),
    size,
    id: id
  }

  console.log("color: ", color.value())

  socket.emit('send-cursor', element)
}

socket.on('element-received',(element)=>{
  console.log("element-received: ",element)
  elements.push(element)
})

socket.on('cursor-received',(element)=>{
  //console.log("element-received: ",element)
  let cursorIndex=cursors.findIndex((index)=>element.id==getItem.id)
  if(cursorIndex!=-1){
    cursors[cursorIndex]=element
  }else{
    cursors.push(element)
  }
})