import React from 'react'
// import './styles/ScrollableList.css'
import VideoListaItem from './VideoListaItem'

class FeriaLista extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            videoList: []
        }
    }
  
    componentDidMount() { 
        this.idTiendaSeleccionada = localStorage.getItem("idFeria");
        if (localStorage.getItem("idFeria")) {
            fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/publicidad/${idTiendaSeleccionada}/playlist`)
            .then(res => res.json())
            .then((data) => {
              this.setState({ videoList: data })
            //   console.log(this.state.videoList)
            })
            .catch(console.log)
        }
      
    }

    render (){
        return(
            <div>
                <div className="menu-wrapper">
                    <div className="menu .keyboard-row" style={{overflow: 'hidden'}} >
                        <VideoListaItem videoList={this.state.videoList} cambioVideoList={this.props.cambioVideoList}></FeriaListaItem>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default FeriaLista;