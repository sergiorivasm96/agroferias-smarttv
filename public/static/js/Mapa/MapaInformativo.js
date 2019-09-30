var canvas = document.getElementById('canvasMapa')
var context = canvas.getContext('2d');

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;


base_image = new Image(1300, 382);
base_image.src = '../static/imagenes/Mapa/mapa-feria.jpeg';

window.onload = function () {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = base_image.height + 500;

    let anchoImg = base_image.width * 0.8;
    let altoImg = base_image.height * 0.8;

    console.log("Canvas size = " + canvas.width.toString() + " X " + canvas.height.toString())
    
    //Imagen del mapa
    context.drawImage(base_image, 0, 100, anchoImg, altoImg);
    
    //Texto
    context.font = "30px Arial";
    context.fillStyle = "red";
    context.fillText("Usted está aquí", 525, 40);

    //Flecha
    context.beginPath();
    canvas_arrow(context, 525, 45, anchoImg / 2 + 10, 45 + 100 + altoImg/2 - 10);
    context.strokeStyle = "#ff0000";
    context.stroke();
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.lineWidth = 3;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

