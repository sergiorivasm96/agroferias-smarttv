import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class BotonLogout extends React.Component {
    render() {
        return (
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
                }} onClick={this.props.funClick}>
                    <FontAwesomeIcon className='img-lupa' icon={faSignOutAlt} size='2x' />
                </button>
        )
    }
}
export default BotonLogout;