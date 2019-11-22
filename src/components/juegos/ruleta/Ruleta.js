import React from 'react';
import SpinOn from './spin_on.png'
import SpinOff from './spin_off.png'
import '../../styles/Configuracion.css'
import Tick from './tick.mp3'
import AfroWoman from './african-woman.png'
import BotonOpcion from '../../identificate/BotonOpcion.js'

/* Extraido de http://jsbin.com/qefada/11/edit?html,css,js,output */

var items_ruleta = []
var ruleta_unica = []
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
        var nuevaRuleta = [];

        items_ruleta.map((item, index) => {
            item.orden = index + 1;
            totalRepeticiones += item.num_repeticiones;
            for (let j = 0; j < item.num_repeticiones; j++)
                nuevaRuleta.push(item);
        });
        items_ruleta = shuffle(nuevaRuleta);

        let idsUnicos = [];
        items_ruleta.map((item => {
            if (!idsUnicos.includes(item.orden)) {
                idsUnicos.push(item.orden);
                ruleta_unica.push(item);
            }
        }));
        ruleta_unica = ruleta_unica.sort((a, b) => a.orden - b.orden);

        var slices = items_ruleta.length;
        console.log("Slices: " + slices)
        var sliceDeg;

        var width = canvas.width; // size
        var center = width / 2;      // center
        var distanciaText = width / 2 * -1;

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
            let numRads = size / 360 * 2 * Math.PI;
            console.log("numRads = " + size)

            ctx.save();
            if (deg < 0) deg += 360;
            let x = 150 * Math.cos(deg2rad(deg + size / 12));
            let y = 150 * Math.sin(deg2rad(deg + size / 12));
            ctx.translate(center + x, center + y);
            //ctx.translate(300, 200);
            ctx.rotate(deg2rad(deg + 90));
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            let stringFont = 'bold ' + ((size > 100) ? 100 : (size)).toString() + 'px sans-serif';
            ctx.font = stringFont;
            //ctx.fillText(text, 0, distanciaText + 60);
            ctx.fillText(text, 0, 0);
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
            sliceDeg = 360 / slices;
            for (var i = 0; i < slices; i++) {
                let indexColor = i % color.length;
                drawSlice(deg, color[indexColor]);
                drawText(deg + sliceDeg / 2, items_ruleta[i].orden, sliceDeg);
                deg += sliceDeg;
            }
            drawBorder(width / 2 - 5);
            drawTriangle(width);
        }

        function anim() {
            if (items_ruleta === null || items_ruleta.length === 0)
                return;
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
                recibirPremio(items_ruleta[ai].nombre, parseFloat(items_ruleta[ai].nombre) == 0.0 ? 0 : 1); //1 ganar 0 perder
                iniciarRuleta();
            }

            drawImg();
            window.requestAnimationFrame(anim);
        }

        function obtenerIndex(grado) {
            if (grado < 0) grado += 360;
            let currDeg = 0;
            for (let i = 0; i < items_ruleta.length; i++) {
                currDeg += 360 / items_ruleta.length;
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
                    <div style={styleBoton}><BotonOpcion id="spin" texto='STOP' funClick={detenerRuleta} ></BotonOpcion></div>
                    {/*  <img id={"spin"} src={SpinOn} className="item-focusable spinBtn" onClick={detenerRuleta}></img> */}
                </div>
                <div className="column2" style={styleColumn}>
                    <span style={titleStyle}>Premios:</span>
                    <ul>
                        {ruleta_unica.map((item, index) => {
                            return <li style={{ listStyleType: "none" }}>
                                <div style={numberStyle}>{item.orden ? item.orden : ''}</div>
                                <span style={spanStyle}>&nbsp;&nbsp;{parseFloat(item.nombre) == 0.0 ? 'NADA' : "S/. " + item.nombre}</span>
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

function recibirPremio(texto, resultado) {
    localStorage.setItem('resultadoPremio', resultado);
    localStorage.setItem('mensajePremio', texto);
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

const titleStyle = {
    fontFamily: "\"Josefin Sans\", sans-serif",
    fontSize: "20px",
    fontFamily: "\"Josefin Sans\", sans-serif",
    textTransform: "uppercase",
    fontWeight: "700",
    wordWrap: 'break-word',
    lineHeight: '45px',
    color: 'rgb(237, 33, 124)'
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

const styleBoton = {
    marginLeft: '50%'
}

/* Algoritmo de Fisher-Yates (aka Knuth) */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
