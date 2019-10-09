import React from 'react'
// import './styles/ScrollableList.css'
import MapaListaResultadoItem from './MapaListaResultadoItem.js'

class MapaListaResultado extends React.Component{


    componentDidMount() { 
   
    }

    render (){
        // console.log("Guardando productos");
        // console.log(this.props)
        localStorage.setItem("localProductos", JSON.stringify(this.props.resultado));
        return(
            <div>
                <div >
                    <div className="lista-resultados" style={{overflow: 'hidden', marginLeft:'42%', width:'100%'}} >
                        <MapaListaResultadoItem resultado={this.props.resultado}></MapaListaResultadoItem>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default MapaListaResultado;
