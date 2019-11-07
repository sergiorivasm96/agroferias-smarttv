import React from 'react';
import SpinOn from './spin_on.png'
import SpinOff from './spin_off.png'
import '../../styles/Configuracion.css'
import Tick from './tick.mp3'
import { throwStatement } from '@babel/types';
/* Extraido de http://jsbin.com/qefada/11/edit?html,css,js,output */

/* var items_ruleta = [
    {
        id: 1,
        nombre: "PAPA",
        num_repeticiones: 1
    },
    {
        id: 2,
        nombre: "CAMOTE",
        num_repeticiones: 2
    },
    {
        id: 3,
        nombre: "QUINUA",
        num_repeticiones: 3
    },
    {
        id: 4,
        nombre: "50% DESC",
        num_repeticiones: 4
    },
    {
        id: 5,
        nombre: "AUTO 0KM",
        num_repeticiones: 5
    }
] */

var items_ruleta = []

var isStopped = false;
var reproduciendoTick = false;

class Ruleta extends React.Component {
    constructor(props) {
        super(props);
    }

    crearRuleta() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        var color = ['#FF5733', '#33FF36', '#3364FF', '#33FFE6', '#FC33FF', '#FF336E', "#FCFF33", "#FFC133"];
        var totalRepeticiones = 0;
        items_ruleta.map(item => { totalRepeticiones += item.num_repeticiones });
        var slices = items_ruleta.length;
        console.log("Silices: " + slices)
        var sliceDeg;

        var width = canvas.width; // size
        var center = width / 2;      // center

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

        function drawText(deg, text, size) {
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(deg2rad(deg));
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            let stringFont = 'bold ' + ((size > 100) ? 100 : (size / 1.2)).toString() + 'px sans-serif';
            ctx.font = stringFont;
            ctx.fillText(text, 130, 10);
            ctx.restore();
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

        function drawImg() {
            ctx.clearRect(0, 0, width, width);
            for (var i = 0; i < slices; i++) {
                items_ruleta[i].tamano = 360 * items_ruleta[i].num_repeticiones / totalRepeticiones;
                sliceDeg = items_ruleta[i].tamano;
                drawSlice(deg, color[i]);
                drawText(deg + sliceDeg / 2, items_ruleta[i].id, sliceDeg);
                deg += sliceDeg;
            }
            drawTriangle();
        }

        function anim() {
            /* if (!reproduciendoTick) {
                reproducirTick(speed);
            } */

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
                lock = false;
                //var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
                //ai = (slices + ai) % slices; // Fix negative index
                var ai = Math.floor(obtenerIndex(((360 - deg - 90) % 360)));
                console.log("Ganaste: " + items_ruleta[ai].id);
                alert("Ganaste:\n" + items_ruleta[ai].nombre); // Get Array Item from end Degree
                iniciarRuleta();
            }

            drawImg();
            window.requestAnimationFrame(anim);
        }

        function obtenerIndex(grado) {
            if (grado < 0) grado += 360;
            let currDeg = 0;
            for (let i = 0; i < items_ruleta.length; i++) {
                currDeg += items_ruleta[i].tamano;
                if (grado < currDeg) {
                    console.log("Grado: " + grado);
                    return i;
                }
            }
            return -1;
        }
        window.requestAnimationFrame(anim);
    }

    componentDidMount() {
        let localTelevisor = JSON.parse(localStorage.getItem("localTelevisor"));
        if (localTelevisor === null) {
            alert("Por favor, seleccione primero un televisor.");
            window.location.pathname = "/configuracion";
        }
        console.log("Mi tele es: " + localTelevisor.idTelevisor)

        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/ruleta/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                console.log("Ruleta es ")
                console.log(data.items_ruleta);
                items_ruleta = data.items_ruleta;
                this.crearRuleta();
            })
            .catch(console.log)
    }



    render() {
        console.log("Rendering...")
        return (
            <div>
                <div style={divStyle}>
                    <img style={{ filter: "graystyle(0%)", opacity: "1" }} src={"https://cdn4.vectorstock.com/i/thumb-large/55/28/african-woman-presenting-something-cartoon-vector-12365528.jpg"}></img>
                    <canvas ref="canvas" style={{ display: 'inline' }} width={300} height={300}></canvas>
                    <img id={"spin"} src={SpinOn} className="item-focusable spinBtn" onClick={detenerRuleta}></img>
                </div>
            </div>
        );
    }
}

var audio = new Audio(Tick);
export default Ruleta;

function reproducirTick(velocidad) {
    if (velocidad <= 0.2 || (1000 / velocidad) > 1000) return;
    reproduciendoTick = true;
    console.log(1000 / velocidad)
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        reproduciendoTick = false;
    }, 1000 / velocidad);
}

var deg = rand(0, 360);
var speed = 0;
var slowDownRand = 0;
var lock = false;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function iniciarRuleta() {
    console.log("Inicio");
    isStopped = false;
    speed = 0;
    slowDownRand = 0;
    document.getElementById("spin").src = SpinOn;
    document.getElementById("spin").onclick = detenerRuleta;
}

function detenerRuleta() {
    isStopped = true;
    document.getElementById("spin").src = SpinOff;
    document.getElementById("spin").onclick = iniciarRuleta;
}

const divStyle = {
    display: 'inline - block',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: '5%'
}

