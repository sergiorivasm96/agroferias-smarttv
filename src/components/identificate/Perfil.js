import React from 'react'
import BotonOpcion from './BotonOpcion'

class Perfil extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nombre: 'Carlos',
                apellidos: 'Vargas Rioja',
                url_photo: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png'
            }
        }
    }

    componentDidMount(){

    }

    handlerClickPromociones(){
        console.log('promociones')
    }
  
    handlerClickJuegos(){
        console.log('juegos')
        window.location.pathname = "/juegos"
    }

    handlerClickRecomendaciones(){
        console.log('recomendaciones')
    }

    render (){
        return(
            <div>
                <div style={{ paddingTop:'3%', paddingLeft:'25%' }}>
                    <img src={this.state.usuario.url_photo} style={{float: "left", width:'150px', height: '150px'}} alt=''></img>
                    <h1 style={{fontSize:'42px', paddingTop: '2%'}}>Bienvenido {this.state.usuario.nombre} {this.state.usuario.apellidos} </h1>
                </div>
                <div style={{marginLeft: '25%', marginTop: '10%', fontSize: '30px', textAlign: 'center', width:'50%'}}>
                    ¿Buscas nuevos productos? Presiona aquí para ver las recomendaciones y ofertas que tenemos para ti
                </div>
                <BotonOpcion texto='RECOMENDACIONES' funClick={this.handlerClickRecomendaciones}></BotonOpcion>
                <BotonOpcion texto='PROMOCIONES' funClick={this.handlerClickPromociones}></BotonOpcion>
                <BotonOpcion texto='JUEGOS' funClick={this.handlerClickJuegos}></BotonOpcion>
                
            </div>
        )
    }
}
  
export default Perfil;
