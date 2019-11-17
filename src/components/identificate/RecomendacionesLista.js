import React from 'react'
import ItemLista from './RecomendacionesListaItem'

class RecomendacionesLista extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            recomendaciones: [],
            idFeriaSeleccionada: localStorage.getItem("idFeria"),
            idUsuario: localStorage.getItem("idUsuario")
        }
    }
  
    componentDidMount() { 
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/pedido/recomendaciones/usuario/${this.state.idUsuario}?idFeria=${this.state.idFeriaSeleccionada}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ recomendaciones: data })
          console.log(this.state.recomendaciones)
        })
        .catch(console.log)
    }

    render (){
        return(
            <div>
                <div className="menu-wrapper">
                    <div className="menu .keyboard-row" style={{overflow: 'hidden'}} >
                        <ItemLista recomendaciones={this.state.recomendaciones} cambioProducto={this.props.cambioProducto}></ItemLista>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default RecomendacionesLista;