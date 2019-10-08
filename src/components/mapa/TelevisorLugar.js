import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStreetView} from '@fortawesome/free-solid-svg-icons'

class TelevisorLugar extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        return(
            <div id="place">
                <FontAwesomeIcon icon={faStreetView} size='2x'/>
            </div>
        )
    }
}
export default TelevisorLugar;