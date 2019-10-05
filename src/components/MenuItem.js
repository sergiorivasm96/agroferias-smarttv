import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link} from 'react-router-dom'

class MenuItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }


  render (){
    return(
      <div className='MenuItem item-focusable url-redirect' style={divStyle}>
        <Link to={this.props.link}> </Link>
        <div style={spanStyle}>{this.props.name}</div>
        <FontAwesomeIcon icon={this.props.icon} size='6x'/>
      </div>
    )
  }
}

const spanStyle = {
  fontSize: '40px',
  width: '230px'
}

const divStyle = {
  display: 'inline-block',
  textAlign: 'center',
  textDecorationLine : 'none',
  color: 'white'
}
  
export default MenuItem;
  