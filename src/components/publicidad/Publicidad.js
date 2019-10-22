import React from 'react';
import '../styles/Configuracion.css'
import FeriaLista from './VideoLista'


class Publicidad extends React.Component {
    constructor(props) {
        super(props);
    }

    cambioVideoList(videoList){
        //acá se llama a la vista donde se muestra el videolist
    }

    render() {
        return (
            <div>
                <FeriaLista cambioVideoList={this.cambioVideoList}></FeriaLista>
            </div>
        )
    }
}

export default Publicidad;