import React from 'react'
// import './styles/ScrollableList.css'
import VideoListaItem from './VideoListaItem'

class VideoLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            idFeriaSeleccionada: localStorage.getItem("idFeria")
        }
    }

    componentDidMount() {
        if (this.state.idFeriaSeleccionada) {
            fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/publicidad/${this.state.idFeriaSeleccionada}/playlist`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    this.setState({ videoList: data.filter((x) => x.habilitado === 1) })
                    console.log('filtrado:')
                    console.log(this.state.videoList)
                })
                .catch(console.log)
        } else {
            alert("Por favor, seleccione una feria en configuración.");
            window.location.pathname = "/configuracion";
            return;
        }
    }

    render() {
        return (
            <div>
                <div className="menu-wrapper" id="lista-videos" >
                    <div className="menu .keyboard-row" style={{ overflow: 'hidden', paddingLeft: '15%' }} >
                        {(this.state.videoList === null || this.state.videoList.length === 0) ?
                            <div style={{ fontSize: '30px' }}>No existen videos</div>
                            :
                            <VideoListaItem videoList={this.state.videoList} cambioVideoList={this.props.cambioVideoList}></VideoListaItem>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default VideoLista;