import React from 'react';
import '../styles/Configuracion.css'
import VideoLista from './VideoLista'


class Publicidad extends React.Component {

    cambioVideoList(videoList){
        //console.log(videoList);
        //alert(videoList.urlPlaylist);
        //window.location.pathname = "/playvideo";
        localStorage.setItem('codigoVideo', videoList.urlPlaylist);
    }

    render() {
        return (
            <div style={{marginTop: '8%'}}>
                <VideoLista cambioVideoList={this.cambioVideoList}></VideoLista>
            </div>
        )
    }
}

export default Publicidad;