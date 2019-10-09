import React from 'react'
// import './styles/ScrollableList.css'
import MapaListaResultadoItem from './MapaListaResultadoItem.js'

class MapaListaResultado extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            resultado:[
                {
                    "idProducto": "01",
                    "nombre": "papa roja"
                },
                {
                    "idProducto": "02",
                    "nombre": "papa negra"
                },
                {
                    "idProducto": "03",
                    "nombre": "papa quemada"
                },
                {
                    "idProducto": "04",
                    "nombre": "papa frita"
                },
                {
                    "idProducto": "05",
                    "nombre": "papa amarilla"
                },
                {
                    "idProducto": "06",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "07",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "08",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "09",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "10",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "11",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "12",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "13",
                    "nombre": "papa marron"
                },
                {
                    "idProducto": "14",
                    "nombre": "papa marron"
                }
            ]
        }
    }
  
    componentWillMount(){
        console.log("Guardando productos");
        localStorage.setItem("localProductos", JSON.stringify(this.state.resultado));
    }

    componentDidMount() { 
        // fetch('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/ferias')
        // .then(res => res.json())
        // .then((data) => {
        //   this.setState({ ferias: data })
        // //   console.log(this.state.ferias)
        // })
        // .catch(console.log)
    }

    render (){
        return(
            <div>
                <div >
                    <div className="lista-resultados" style={{overflow: 'hidden', marginLeft:'42%', width:'100%'}} >
                        <MapaListaResultadoItem ferias={this.state.resultado}></MapaListaResultadoItem>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default MapaListaResultado;
