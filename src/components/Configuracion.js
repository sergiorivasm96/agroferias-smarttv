import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTv} from '@fortawesome/free-solid-svg-icons'
import Mapeo from './Mapeo.js'
import FeriaLista from './FeriaLista'

class Configuracion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            feriaActual:''
        }
        this.mapeo = new Mapeo();
        this.cambioFeria = this.cambioFeria.bind(this);
    }

    componentDidMount(){
        // this.mapeo.createZone('.configuracion');
    }

    componentWillUnmount(){
        // this.mapeo.removeZone('.configuracion');
        // console.log('zone destroyed');
    }

    cambioFeria(feria){
        this.setState({ feriaActual: feria}, () => {
            console.log(this.state.feriaActual);
          });   
    }

    render (){
        return(
            <div>
                <div style={{fontSize: '50px', paddingTop: '5%'}}>
                    Feria actual
                </div>
                <FeriaLista cambioFeria={this.cambioFeria}></FeriaLista>   
                <div style={{fontSize: '50px', paddingTop: '5%'}}>
                    Posición del televisor en el mapa
                </div>
                <div>
                    <button style={buttonStyle} className='item-focusable'>
                        <FontAwesomeIcon icon={faTv} size='6x' />
                    </button>
                </div>
            </div>  
        )
    }
}

const buttonStyle={
    background: '#ed217c',
    textAlign:'center',
    borderRadius: 10,
    width: 120,
    height: 120,
    color: 'white',
    fondWeight: 'bold',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '40%',
    marginTop: '2%'
}
  
export default Configuracion;