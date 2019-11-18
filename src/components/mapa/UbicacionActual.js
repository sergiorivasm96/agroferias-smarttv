import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStreetView} from '@fortawesome/free-solid-svg-icons'

class UbicacionActual extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        let tvLocal = JSON.parse(localStorage.getItem('localTelevisor'));
        return(
            <div
                className="item-focusable seleccionarTV"
                style={{
                    left: tvLocal.posicion_X * this.props.anchoImagen,
                    position: 'absolute',
                    top: tvLocal.posicion_Y * this.props.altoImagen,
                    borderRadius: '50%',
                    border: 'solid black 3px'
                }}
                onClick={this.props.customClickEvent}
                >
                <FontAwesomeIcon icon={faStreetView} size='2x'/>
             </div>
        )
    }
}
  
export default UbicacionActual;