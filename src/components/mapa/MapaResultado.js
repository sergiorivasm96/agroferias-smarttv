import React from 'react'

class MapaResultado extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
      
    }
   
    render (){
        
        return(
            <div>
               Usted quiere encontrar las tiendas que tengan {this.props.idProducto} como id
            </div>
        )
    }
}
  
export default MapaResultado;