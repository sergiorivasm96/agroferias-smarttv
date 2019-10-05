import React from 'react'
import ScrollableList from './SrollableList';
import BotonTexto from './BotonTexto.js'


class Configuracion extends React.Component{
    // constructor(props) {
    //     super(props);
    // }

    render (){
        return(
            <div>
                <h3>
                    Lista de ferias:
                </h3>
                <ScrollableList></ScrollableList>   
                <div>
                <BotonTexto texto='Posiciona tu televisor' className='boton-texto'></BotonTexto>
                </div>
                
            </div>
            
        )
    }
}
  
export default Configuracion;