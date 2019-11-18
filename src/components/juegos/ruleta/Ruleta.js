import React from 'react';
import SpinOn from './spin_on.png'
import SpinOff from './spin_off.png'
import '../../styles/Configuracion.css'
import Tick from './tick.mp3'
import AfroWoman from './african-woman.png'
import BotonOpcion from '../../identificate/BotonOpcion.js'

/* Extraido de http://jsbin.com/qefada/11/edit?html,css,js,output */

var items_ruleta = []
var ruletaInicial = true;

var isStopped = false;
var reproduciendoTick = false;

class Ruleta extends React.Component {
    constructor(props) {
        super(props);
    }

    crearRuleta() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        var color = ['#E83E31', '#EEDB03', '#01A275', '#03A4FF', '#1C55DA', '#24057C', "#A36B50", "#302F34"];
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
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;

            ctx.moveTo(center, center);
            ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
            ctx.lineTo(center, center);
            ctx.fill();
            ctx.stroke();
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

        function drawTriangle(width) {
            ctx.beginPath();
            ctx.moveTo(width / 2 - 20, 0);
            ctx.lineTo(width / 2 + 20, 0);
            ctx.lineTo(width / 2, 20);
            ctx.closePath();

            ctx.lineWidth = 10;
            ctx.strokeStyle = '#666666';
            ctx.stroke();

            ctx.fillStyle = "#FFCC00";
            ctx.fill();
        }

        function drawBorder(radius) {
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'yellow';
            ctx.arc(center, center, radius, 0, 2 * Math.PI, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
            ctx.arc(center, center, radius - 5, 0, 2 * Math.PI, false);
            ctx.stroke();
        }

        function drawImg() {
            ctx.clearRect(0, 0, width, width);
            for (var i = 0; i < slices; i++) {
                items_ruleta[i].tamano = 360 * items_ruleta[i].num_repeticiones / totalRepeticiones;
                sliceDeg = items_ruleta[i].tamano;
                drawSlice(deg, color[i] === null ? 'blue' : color[i]);
                drawText(deg + sliceDeg / 2, i + 1, sliceDeg);
                deg += sliceDeg;
            }
            drawBorder(width / 2 - 5);
            drawTriangle(width);
        }

        function anim() {
            if (items_ruleta === null || items_ruleta.length === 0)
                return;
            if (!reproduciendoTick) {
                reproducirTick(speed);
            }

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
                mostrarMensaje("Ganaste:\n" + items_ruleta[ai].nombre, items_ruleta[ai].urlImage); // Get Array Item from end Degree
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
            //alert("Por favor, seleccione primero un televisor.");
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
                ruletaInicial = false;
                this.crearRuleta();
                this.forceUpdate();
            })
            .catch((err) => {
                console.log(err);
                ruletaInicial = false;
            })
    }



    render() {
        console.log("Rendering...")
        if (items_ruleta === null || items_ruleta.length === 0 && ruletaInicial === false) {
            return (
                <div style={{ fontSize: '30px' }}>El juego no está implementado</div>
            )
        }

        return (
            <div id="ruleta" className="row" style={{ marginTop: '3%' }}>
                <div className="column1" style={divStyle}>
                    <img style={{ filter: "graystyle(0%)", opacity: "1" }} src={AfroWoman}></img>
                    <canvas ref="canvas" style={{ display: 'inline' }} width={400} height={400}></canvas>
                    <BotonOpcion id="spin" texto='STOP' funClick={detenerRuleta} ></BotonOpcion>
                    {/*  <img id={"spin"} src={SpinOn} className="item-focusable spinBtn" onClick={detenerRuleta}></img> */}
                </div>
                <div className="column2" style={styleColumn}>
                    <span style={spanStyle}>Premios:</span>
                    <ul>
                        {items_ruleta.map((item, index) => {
                            return <li style={{ listStyleType: "none" }}>
                                <div style={numberStyle}>{index + 1}</div>
                                <span style={spanStyle}>{"   " + item.nombre}</span>
                            </li>
                        })}
                    </ul>
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

function mostrarMensaje(texto, imagen) {
    localStorage.setItem('mensajePremio', texto);
    localStorage.setItem('imagenPremio', imagen);
    window.location.pathname = '/premio';
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
    document.getElementById("spin").onclick = detenerRuleta;
    document.getElementById("spin").disabled = false;
    document.getElementById("spin").style.opacity = 1;
}

function detenerRuleta() {
    isStopped = true;
    document.getElementById("spin").onclick = iniciarRuleta;
    document.getElementById("spin").disabled = true;
    document.getElementById("spin").style.opacity = 0.5;
}

const divStyle = {
    display: 'inline - block',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: '5%',
    float: 'left',
    width: '63%'
}

const styleColumn = {
    marginTop: '3%',
    float: 'right',
    width: '37%'
}

const spanStyle = {
    fontFamily: "\"Josefin Sans\", sans-serif",
    fontSize: "20px",
    fontFamily: "\"Josefin Sans\", sans-serif",
    textTransform: "uppercase",
    fontWeight: "700",
    wordWrap: 'break-word',
    lineHeight: '45px'
}

const numberStyle = {
    display: 'inline',
    backgroundColor: "#662974",
    borderRadius: '50%',
    color: 'white',
    fontSize: "18px",
    textAlign: 'center',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    padding: '8px',
    border: '2px solid rgb(237, 33, 124)'
}