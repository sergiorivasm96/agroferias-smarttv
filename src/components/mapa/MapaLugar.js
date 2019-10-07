import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'

class MapaLugar extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        return(
            <div id="place">
                <FontAwesomeIcon icon={faMapMarkerAlt} size='2x'/>
            </div>
        )
    }
}
export default MapaLugar;