import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {Link, Route} from 'react-router-dom'
import MapaBuscador from './MapaBuscador.js'

class BotonBuscar extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        return(
            <Link to="/mapas/buscador" className='link-mapa-buscador'>
                <button className='item-focusable' style={{borderRadius: '100%', width:'50px', height:'50px', backgroundColor:'#ed217c'}} >
                    <FontAwesomeIcon icon={faSearch} size='2x' />
                </button>
          
            </Link>
        )
    }
}
export default BotonBuscar;