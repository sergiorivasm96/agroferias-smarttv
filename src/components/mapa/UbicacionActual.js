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
                className="item-focusable"
                style={{
                    left: tvLocal.posicion_x * this.props.anchoImagen,
                    position: 'absolute',
                    top: tvLocal.posicion_y * this.props.altoImagen
                }}
                onClick={this.props.customClickEvent}
                >
                <FontAwesomeIcon icon={faStreetView} size='2x'/>
             </div>
        )
    }
}
  
export default UbicacionActual;