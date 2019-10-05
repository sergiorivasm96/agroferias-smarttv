import React from 'react'
import ScrollableList from './SrollableList';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTv} from '@fortawesome/free-solid-svg-icons'


class Configuracion extends React.Component{
    // constructor(props) {
    //     super(props);
    // }

    render (){
        return(
            <div>
                <div style={{fontSize: '50px', paddingTop: '5%'}}>
                    Feria actual
                </div>
                <ScrollableList></ScrollableList>   
                <div style={{fontSize: '50px', paddingTop: '5%'}}>
                    Posición del televisor en el mapa
                </div>
                <div>
                    <button style={buttonStyle} className='item-focusable'>
                        <FontAwesomeIcon icon={faTv} size='6x' />
                    </button>
                </div>
            
                
            </div>
            
        )
    }
}

const buttonStyle={
    background: '#ed217c',
    textAlign:'center',
    borderRadius: 10,
    width: 120,
    height: 120,
    color: 'white',
    fondWeight: 'bold',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '40%',
    marginTop: '2%'
}
  
export default Configuracion;