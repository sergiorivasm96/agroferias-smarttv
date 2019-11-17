import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faTv } from '@fortawesome/free-solid-svg-icons'

import './Mapa.css'

class MapaLugar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let icono
        if (this.props.televisor) {
            return (
                <div style={{

                    /* marginLeft: '-10px' */
                }}
                    name={this.props.name} id="place">
                    <span style={{
                        marginLeft: '4px',
                        marginTop: '6px',
                        fontSize: '10pt',
                        display: 'inline-block'
                    }}>
                        <FontAwesomeIcon icon={faTv} size='2x' />
                    </span>

                </div>
            )
        } else {
            icono = <FontAwesomeIcon icon={faMapMarkerAlt} size='2x' />
            return (
                <div style={{

                    /* marginLeft: '-10px' */
                }}
                    name={this.props.name} id="place">
                    <span style={{
                        marginLeft: '7px',
                        marginTop: '3px',
                        display: 'inline-block'
                    }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size='2x' />
                    </span>

                </div>
            )
        }
    }
}
export default MapaLugar;