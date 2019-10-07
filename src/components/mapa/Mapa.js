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
                    "descripcion": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl",
                    "posicionX": 460,
                    "posicionY": 150
                },
                {
                    "idTienda": 2,
                    "nombre": "Tienda 2",
                    "descripcion": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl",
                    "posicionX": 420,
                    "posicionY": 250
                },
                {
                    "idTienda": 3,
                    "nombre": "Tienda 3",
                    "descripcion": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl",
                    "posicionX": 760,
                    "posicionY": 150
                },
                {
                    "idTienda": 4,
                    "nombre": "Tienda 4",
                    "descripcion": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl",
                    "posicionX": 950,
                    "posicionY": 150
                },
                {
                    "idTienda": 5,
                    "nombre": "Tienda 5",
                    "descripcion": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl",
                    "posicionX": 825,
                    "posicionY": 320
                },
            
            ],
            popUpVisible: false
        }
    }

    handlerClick(tienda)
    {
        alert(`${tienda.nombre}: ${tienda.descripcion}`);
        console.log(`${tienda.nombre}: ${tienda.descripcion}`);
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