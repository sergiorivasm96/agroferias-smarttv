import React from 'react'
import ItemLista from './PromocionesListaItem'

class PromocionesLista extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            promociones: [],
            idFeriaSeleccionada: localStorage.getItem("idFeria"),
            idUsuario: localStorage.getItem("idUsuario")
        }
    }
  
    componentDidMount() { 
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/productos/feria_promociones/${this.state.idFeriaSeleccionada}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ promociones: data.filter((x) => x.porcDescuento > 0) })
          console.log(this.state.promociones)
        })
        .catch(console.log)
    }

    render (){
        return(
            <div>
                <div className="menu-wrapper">
                    <div className="menu .keyboard-row" style={{overflow: 'hidden'}} >
                        {(this.state.promociones === null || this.state.promociones.length === 0) ?
                            <div style={{ fontSize: '30px' }}>No existen promociones disponibles</div>
                            :
                            <ItemLista promociones={this.state.promociones} cambioProducto={this.props.cambioProducto}></ItemLista>
                        }    
                    </div>
                </div>
            </div>
        )
    }
}
  
export default PromocionesLista;