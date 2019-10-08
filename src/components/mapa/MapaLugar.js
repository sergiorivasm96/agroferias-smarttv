import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faTv} from '@fortawesome/free-solid-svg-icons'

class MapaLugar extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        let icono
        if(this.props.televisor){
            icono = <FontAwesomeIcon icon={faTv} size='2x'/>
        } else{
            icono = <FontAwesomeIcon icon={faMapMarkerAlt} size='2x'/>
        }
        return(
            <div id="place">
                {icono}
            </div>
        )
    }
}
export default MapaLugar;