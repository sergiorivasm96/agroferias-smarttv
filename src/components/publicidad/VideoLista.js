import React from 'react'
// import './styles/ScrollableList.css'
import VideoListaItem from './VideoListaItem'

class VideoLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            idTiendaSeleccionada: null
        }
    }

    componentWillMount() {
        this.idTiendaSeleccionada = localStorage.getItem("idFeria");
        if (this.state.idTiendaSeleccionada == null) {
            alert("Por favor, seleccione una feria en configuración.");
            window.location.pathname = "/configuracion";
            return;
        }
    }

    componentDidMount() {
        if (localStorage.getItem("idFeria")) {
            fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/publicidad/${this.state.idTiendaSeleccionada}/playlist`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    this.setState({ videoList: data })
                    //   console.log(this.state.videoList)
                })
                .catch(console.log)
        }

    }

    render() {
        return (
            <div>
                <div className="menu-wrapper">
                    <div className="menu .keyboard-row" style={{ overflow: 'hidden', paddingLeft: '15%'}} >
                        <VideoListaItem videoList={this.state.videoList} cambioVideoList={this.props.cambioVideoList}></VideoListaItem>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoLista;