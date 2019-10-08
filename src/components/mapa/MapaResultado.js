import React from 'react'

class MapaResultado extends React.Component{
    render (){
        
        return(
            <div>
               Usted quiere encontrar las tiendas que tengan {this.props.idProducto} como id
            </div>
        )
    }
}
  
export default MapaResultado;