import React from 'react'
import MapaLugar from './MapaLugar.js'
import BotonBuscar from './BotonBuscar'
import MapaImg from './mapa.jpeg'

class Mapa extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            tiendas: [
                {
                    "idTienda": 1,
                    "nombre": "Tienda 1",
                    "posicionX": 510,
                    "posicionY": 200
                },
                {
                    "idTienda": 2,
                    "nombre": "Tienda 2",
                    "posicionX": 450,
                    "posicionY": 330
                },
                {
                    "idTienda": 3,
                    "nombre": "Tienda 3",
                    "posicionX": 775,
                    "posicionY": 200
                },
                {
                    "idTienda": 4,
                    "nombre": "Tienda 4",
                    "posicionX": 985,
                    "posicionY": 206
                },
                {
                    "idTienda": 5,
                    "nombre": "Tienda 5",
                    "posicionX": 825,
                    "posicionY": 340
                },
            
            ]
        }
    }

    handlerClick(tienda)
    {
        console.log('diste click en ' + tienda.nombre)
    }

    render (){
        return(
            <div>
                <BotonBuscar></BotonBuscar>
                <div  id='divGrande' style={{backgroundImage: "url(" + MapaImg + ")", position:'relative', width:'1000px', height:'450px', marginLeft: '4%'}}>
                    {this.state.tiendas.map((tienda) => (
                        <div className='item-focusable' style={{left:tienda.posicionX, position:'absolute', top:tienda.posicionY}} onClick={()=>this.handlerClick(tienda)} key={'tienda-' + tienda.idTienda} >
                        <MapaLugar></MapaLugar>
                    </div>
                    ))}
                </div>
            </div>
           
        )
    }
    state = {
        image: null
    };
    componentDidMount() {
        this.updateCanvas();
        document.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(e) {
        e.stopPropagation();
        // console.log(e.nativeEvent.offsetX);
        // console.log(e.nativeEvent.offsetY);
    }

    updateCanvas() {
        var base_image = new Image();
        base_image.src = '/images/feria.jpeg';
        const context = this.refs.canvas.getContext('2d');
        var canvas = context.canvas;


        let anchoImg = base_image.width * 0.8; //1300
        let altoImg = base_image.height * 0.8; //382

        base_image.onload = function () {
            let posx = canvas.width / 2 - anchoImg / 2;
            let posy = canvas.height / 2 - altoImg / 2 + 20;

            context.drawImage(base_image, posx, posy, anchoImg, altoImg);
            //Texto
            context.font = "30px Arial";
            context.fillStyle = "red";
            context.fillText("Usted está aquí", 525, 40);
            //Flecha
            context.beginPath();
            canvas_arrow(context, 530, 45, posx + anchoImg / 2, posy + altoImg / 2);
            context.strokeStyle = "#ff0000";
            context.stroke();

            for (let i = 0; i < tiendas.length; i++) {
                let color = (i < colors.length) ? colors[i] : defaultColor;
                dibujarIcono(context, tiendas[i].posicionX, tiendas[i].posicionY, color);
            }

        }
    }
    render() {
        return (
            <canvas style={canvasStyle} ref="canvas" onClick={this.handleClick.bind(this)} width={1300} height={450} />
        );
    }
}

function dibujarIcono(context, x, y, color) {
    context.fillStyle = color;
    context.font = '40px FontAwesome';
    context.fillText('\uf041', x, y);

}

const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple']
const defaultColor = 'white';

var tiendas = [
    {
        "idTienda": 1,
        "posicionX": 510,
        "posicionY": 200
    },
    {
        "idTienda": 2,
        "posicionX": 450,
        "posicionY": 330
    },
    {
        "idTienda": 3,
        "posicionX": 775,
        "posicionY": 200
    },
    {
        "idTienda": 4,
        "posicionX": 985,
        "posicionY": 206
    },
    {
        "idTienda": 5,
        "posicionX": 825,
        "posicionY": 340
    },

]

const canvasStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto'
}

function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;


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

export default Mapa;