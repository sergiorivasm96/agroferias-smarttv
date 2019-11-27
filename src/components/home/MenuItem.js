import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link} from 'react-router-dom'

class MenuItem extends React.Component {
  // constructor(props) {
  //   super(props); 
  // }

  handleClick() {
  }

  render (){
    return(
      <Link
        to={this.props.link}
        name={this.props.name.toString()+"Open"}
        onClick={this.handleClick}
        className='MenuItem item-focusable'
        style={divStyle}>
          <FontAwesomeIcon icon={this.props.icon} size='2x'/>
          <div style={spanStyle}>{this.props.name}</div>
      </Link>
    )
  }
}

const spanStyle = {
  fontSize: '25px',
  width: '230px',
  textTransform: 'uppercase',
  paddingTop: '10px'
}

const divStyle = {
  display: 'inline-block',
  textAlign: 'center',
  textDecorationLine : 'none',
  color: '#7D1242',
  textDecoration : 'none',
}
  
export default MenuItem;
  