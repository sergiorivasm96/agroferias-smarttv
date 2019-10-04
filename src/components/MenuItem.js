import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link} from 'react-router-dom'

const spanStyle = {
  fontSize: '40px',
  width: '280px'
}

const divStyle = {
  display: 'inline-block',
  textAlign: 'center',
  textDecorationLine : 'none'
}

function MenuItem(props) {
    return (
      <Link to={props.link} style={{ color: 'black' }} className="item-focusable">
        <div className='MenuItem' style={divStyle}>
          <div style={spanStyle}>{props.name}</div>
          <FontAwesomeIcon icon={props.icon} size='6x'/>
        </div>
      </Link>
      
    );
}
  
export default MenuItem;
  