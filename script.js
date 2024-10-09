const saveBtn = document.querySelector('#savebtn');
const radiusValue = document.querySelector('#radiusvalue');
const mycanvas = document.querySelector('#mycanvas');
const colorsBar = document.querySelector('#colorsbar');
const colors = ["red", "blue", "green", "yellow", "cyan", "brown", "gray", "magenta", "lightgreen", "black", "pink"];
const mycontext = mycanvas.getContext('2d');
let radius = retrieve('radius', Number.parseInt(radiusValue.innerText));
let selectedColor = retrieve('color', 'black');
let isDrawable = false;


colors.forEach((color) => {
    let child = document.createElement('div');
    child.style.backgroundColor = color;
    child.className = 'colors';
    child.addEventListener('click', selectColor);
    if (color == selectedColor) {
        child.classList.add('active');
    }
    colorsBar.appendChild(child);
});


mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;
mycontext.fillStyle = selectedColor;
radiusValue.innerHTML = radius;


mycanvas.addEventListener('mousedown', enableDrawing);
mycanvas.addEventListener('mousemove', drawCircle);
mycanvas.addEventListener('mouseup', disableDrawing)
saveBtn.addEventListener('click', save);






function selectColor() {
    selectedColor = this.style.backgroundColor;
    mycontext.fillStyle = selectedColor;
    for (let child of colorsBar.children) {
        child.classList.remove('active');
    }
    this.classList.add('active');
    persist('color', selectedColor);
}


function enableDrawing() {
    isDrawable = true;
}
function disableDrawing() {
    isDrawable = false;
}

function drawCircle(e) {
    if (isDrawable) {
        mycontext.beginPath();
        mycontext.arc(e.clientX, e.clientY, radius, 0, 2 * Math.PI, true);
        mycontext.fill();
        mycontext.closePath();
    }
}


function increaseRadius() {
    radius = Math.min(50, ++radius);
    radiusValue.innerText = radius;
    persist('radius', radius);
}
function decreaseRadius() {
    radius = Math.max(10, --radius);
    radiusValue.innerText = radius;
    persist('radius', radius);
}

function persist(key, value) {
    localStorage.setItem(key, value);
}
function retrieve(key, fallback) {
    let result = localStorage.getItem(key);
    return result == null ? fallback : result;
}

function save() {
    let imageURL = mycanvas.toDataURL("/img.jpg");
    let anchor = this.children[0];
    anchor.href = imageURL;
}