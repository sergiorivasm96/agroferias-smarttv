import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class BotonLogout extends React.Component {
    render() {
        return (
            <Link to="#" className='link-logout'>
                <button className='item-focusable btn-buscar' style={{
                    borderRadius: '100%',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#ed217c',
                    color: 'white',
                    float: 'right',
                    marginRight: '30px',
                    marginTop: '5px',
                    border: 'solid black 3px'
                }} >
                    <FontAwesomeIcon className='img-lupa' icon={faSignOutAlt} size='2x' />
                </button>

            </Link>
        )
    }
}
export default BotonLogout;