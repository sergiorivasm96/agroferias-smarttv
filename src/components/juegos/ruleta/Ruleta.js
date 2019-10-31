import React from 'react';
/* Extraido de http://jsbin.com/qefada/11/edit?html,css,js,output */

const premios = [
    {
        id: 1,
        etiqueta: "PAPA",
        descripcion: "1kg de papa"
    },
    {
        id: 2,
        etiqueta: "CAMOTE",
        descripcion: "1kg de camote"
    },
    {
        id: 3,
        etiqueta: "QUINUA",
        descripcion: "1kg de quinua"
    },
    {
        id: 4,
        etiqueta: "50% DESC",
        descripcion: "50% de descuento en tu próxima compra"
    },
    {
        id: 5,
        etiqueta: "AUTO 0KM",
        descripcion: "Un auto 0 kilómetros"
    }
]

var isStopped = false;

class Ruleta extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }

        var color = ['#FF5733', '#33FF36', '#3364FF', '#33FFE6', '#FC33FF', '#FF336E', "#FCFF33", "#FFC133"];
        var label = ['1 kg de papa', '200', '50', '100', '5', '500', '0', "jPOT"];
        var slices = premios.length;
        var sliceDeg = 360 / slices;
        var deg = rand(0, 360);
        var speed = 0;
        var slowDownRand = 0;
        var width = canvas.width; // size
        var center = width / 2;      // center

        var lock = false;

        function deg2rad(deg) {
            return deg * Math.PI / 180;
        }

        function drawSlice(deg, color) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(center, center);
            ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
            ctx.lineTo(center, center);
            ctx.fill();
        }

        function drawText(deg, text) {
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(deg2rad(deg));
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText(text, 130, 10);
            ctx.restore();
        }

        function drawImg() {
            ctx.clearRect(0, 0, width, width);
            for (var i = 0; i < slices; i++) {
                drawSlice(deg, color[i]);
                drawText(deg + sliceDeg / 2, premios[i].etiqueta);
                deg += sliceDeg;
            }
            drawTriangle();
        }

        function drawTriangle() {
            ctx.beginPath();
            ctx.moveTo(130, 0);
            ctx.lineTo(170, 0);
            ctx.lineTo(150, 20);
            ctx.closePath();

            ctx.lineWidth = 10;
            ctx.strokeStyle = '#666666';
            ctx.stroke();

            ctx.fillStyle = "#FFCC00";
            ctx.fill();
        }

        (function anim() {
            deg += speed;
            deg %= 360;

            // Increment speed
            if (!isStopped && speed < 3) {
                speed = speed + 1 * 0.1;
            }
            // Decrement Speed
            if (isStopped) {
                if (!lock) {
                    lock = true;
                    slowDownRand = rand(0.994, 0.998);
                }
                speed = speed > 0.2 ? speed *= slowDownRand : 0;
            }
            // Stopped!
            if (lock && !speed) {
                var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
                ai = (slices + ai) % slices; // Fix negative index
                return alert("Ganaste:\n" + premios[ai].descripcion); // Get Array Item from end Degree
            }

            drawImg();
            window.requestAnimationFrame(anim);
        }());

        document.getElementById("spin").addEventListener("mousedown", function () {
            isStopped = true;
        }, false);

    }

    render() {

        return (
            <div>
                <div style={divStyle}>
                    <canvas ref="canvas" style={{ display: 'inline' }} width={300} height={300}></canvas>
                    <button id="spin" className="item-focusable" onClick={() => { isStopped = true }} >Stop!</button>
                </div>
            </div>
        );
    }
}

const divStyle = {
    display: 'inline - block',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: '5%'
}

export default Ruleta;