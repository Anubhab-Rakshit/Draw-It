const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let paint_name="painting.png"
let painting = false;
let tool = 'pen';
let color = '#000';
let color_bg='#ffffff'
let history = [];

window.addEventListener("resize" , () => {
    document.getElementById("canvas").style.height="80vh"
    canvas.width=window.innerWidth
})  


function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    if (tool === 'pen') {
        ctx.strokeStyle = color;
        ctx.globalCompositeOperation = 'source-over';
    } else if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('pen').addEventListener('click', () => tool = 'pen');
document.getElementById('eraser').addEventListener('click', () => tool = 'eraser');

document.getElementById('colorChooser').addEventListener('change', (e) => {
    color = e.target.value;
});

document.getElementById('colorChooser_bg').addEventListener('change', (e) => {
    color_bg = e.target.value;
    ctx.fillStyle=color_bg
    ctx.fillRect(0,0,canvas.width,canvas.height)
});



document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = [];
});

document.getElementById('undo').addEventListener('click', () => {
    if (history.length > 0) {
        ctx.putImageData(history.pop(), 0, 0);
    }
});

document.getElementById('save').addEventListener('click', () => {
    showPrompt()
    
});
function saving_image(name){
    const link=document.createElement("a")
    link.download = name+".png"
    link.href = canvas.toDataURL();
    link.click();
}
function showPrompt() {
    document.getElementById('prompt-overlay').style.display = 'flex';
}

function submitPrompt() {
    var inputValue = document.getElementById('prompt-input').value;
    if  (inputValue.length>0) {
        paint_name=inputValue   
        saving_image(paint_name)
    }
    else{
        window.alert("Please enter a name")
    }
    
}

function closePrompt() {
    document.getElementById('prompt-overlay').style.display = 'none';
}