import React from 'react'
import '../styles/Keyboard.css'
import {Link} from 'react-router-dom'


class MapaResultado extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    // componentDidMount(){
        
    // }
    render (){
 
        let data = Array.from(this.props.resultado)
        return(
                <div className='resultado-container' style={styleFeriaList}>
                    {data.map((resultado) => (
                        <Link to={{
                            pathname: `/mapas/buscador/${resultado.idTienda}`
                            }}  style={{ textDecoration: 'none', color:'inherit' }} key={'key-' + resultado.idProducto} onClick={localStorage.setItem('resultadoBusqueda', JSON.stringify(resultado))}>
                               
                            <div className='item-focusable resultado item' key={'resultado-' + resultado.idProducto} tabIndex="0"  style={styleFeriaCard}>
                                
                                <div className={"resultado-body" + resultado.idProducto}>
                                </div>
                                <div>{resultado.nombre}</div>
                            </div>
                            </Link>
                    ))}
                </div>
        )
    }
}
  
export default MapaResultado;

const styleFeriaList ={
    // marginLeft:'5%',
    marginRight: '10%',
    whiteSpace: 'nowrap',
    overflow: 'auto',
    flexBasis: '25%',
    flexGrow: '1',
    height: '350px'
}

const styleFeriaCard = {
    width: '100%',
    height: '40px',  
    marginRight: '10%',
    verticalAllign: 'middle',
    paddingTop: '3%',
    // lineHeight: '40px',
    fontSize: '30px'
}