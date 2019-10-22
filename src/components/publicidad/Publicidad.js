import React from 'react';
import '../styles/Configuracion.css'
import VideoLista from './VideoLista'


class Publicidad extends React.Component {
    constructor(props) {
        super(props);
    }

    cambioVideoList(videoList){
        //console.log(videoList);
        //alert(videoList.urlPlaylist);
        window.location.pathname = "/playvideo";
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