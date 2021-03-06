import React from 'react'

class ScrollableListItem extends React.Component{

  cambioProducto(producto){
    this.props.cambioProducto(producto);
  }
    render (){
        return(
            <div style={styleRecomendacionesList} className='lista'>
            {this.props.recomendaciones.map((producto) => (
              <div
                  className='item-focusable feria configuration item'
                  key={'producto-' + producto.idProducto}
                  name={'producto-' + producto.idProducto}
                  onClick={()=>this.cambioProducto(producto)}
                  tabIndex="0"
                  style={styleProductoCard}>
                <div >
                  <img src={producto.imagen} style={{width: '150px', height: '150px'}} alt = ""></img>
                </div>
                <div className={"producto-text"} style={{fontWeight: 'bold'}}>{producto.nombre}</div>
                </div>
            ))}
          </div>
        )
    }
}
  
export default ScrollableListItem;

const styleRecomendacionesList ={
    display: 'flex', 
    marginTop: '5%',
    marginRight: '10%',
    marginLeft: '10%',
    whiteSpace: 'nowrap',
    overflow: 'auto',
    flexBasis: '25%',
    flexGrow: '1',
    overflow: 'hidden'
}

const styleProductoCard = {
    textAlign: 'center',
    width: '100% !important',
    height: '100% !important',
    marginRight: '10%'
}