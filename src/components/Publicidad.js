import React from 'react'
import image from '../images/ejemplo.jpeg'

class Publicidad extends React.Component{
    constructor(props) {
        super(props);
    }
    render (){
        return(
            <div>Publicidad
                <img src={image}></img>
            </div>
        )
    }
}
  
export default Publicidad;