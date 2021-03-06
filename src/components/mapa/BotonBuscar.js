import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class BotonBuscar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <Link to="/mapas/buscador" className='link-mapa-buscador'>
                <button className='item-focusable btn-buscar' style={{
                    borderRadius: '100%',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#ed217c',
                    color: 'white',
                    float: 'right',
                    marginRight: '30px',
                    marginTop: '-100px',
                    border: 'solid black 3px'
                }} >
                    <FontAwesomeIcon className='img-lupa' icon={faSearch} size='2x' />
                </button>

            </Link>
        )
    }
}
export default BotonBuscar;