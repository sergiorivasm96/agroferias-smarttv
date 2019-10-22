import React from 'react';
import '../styles/Configuracion.css'
import VideoLista from './VideoLista'


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
                <VideoLista cambioVideoList={this.cambioVideoList}></VideoLista>
            </div>
        )
    }
}

export default Publicidad;