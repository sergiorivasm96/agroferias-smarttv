import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link} from 'react-router-dom'

class MenuItem extends React.Component {
  // constructor(props) {
  //   super(props); 
  // }

  handleClick() {
    console.log('The link was clicked.');
  }

  render (){
    return(
      <Link to={this.props.link} onClick={this.handleClick} className='MenuItem item-focusable' style={divStyle}>
        <div style={spanStyle}>{this.props.name}</div>
        <FontAwesomeIcon icon={this.props.icon} size='3x'/>
      </Link>
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
  