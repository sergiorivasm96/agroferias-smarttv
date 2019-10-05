import React from 'react'
import ScrollableList from './SrollableList';


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
            </div>
            
        )
    }
}
  
export default Configuracion;