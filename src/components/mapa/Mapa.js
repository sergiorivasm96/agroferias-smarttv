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
}
export default Mapa;