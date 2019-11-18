import React from 'react'
import BotonOpcion from './BotonOpcion'
import BotonLogout from './BotonLogout'

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nombre: '',
                apellidos: '',
                url_photo: null
            }
        }
    }

    componentDidMount() {
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/usuario/cliente/${localStorage.getItem("idUsuario")}`)
            .then(res => res.json())
            .then((data) => {
                console.log("Usuario es ")
                console.log(data);
                let usuarioPerfil = {
                    nombre: data.nombres,
                    apellidos: data.apellidoPaterno + " " + data.apellidoMaterno,
                    url_photo: data.foto
                }
                this.setState({ usuario: usuarioPerfil })
            })
            .catch(console.log)
    }

    handlerClickPromociones() {
        console.log('promociones')
        window.location.pathname = "/promociones"
    }

    handlerClickJuegos() {
        console.log('juegos')
        window.location.pathname = "/juegos"
    }

    handlerClickRecomendaciones() {
        console.log('recomendaciones')
        window.location.pathname = "/recomendaciones"
    }

    handerClickLogout(){
        console.log('logout')
        localStorage.removeItem('idUsuario')
        window.location.pathname = "/identificate"
    }

    render() {
        let photo = this.state.usuario.url_photo === null || this.state.usuario.url_photo === ""? 'https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png' : this.state.usuario.url_photo;
        return (
            <div>
                <BotonLogout funClick={this.handerClickLogout}></BotonLogout>
                <div style={{ paddingTop: '3%', paddingLeft: '25%' }}>
                    <img src={photo} style={{ float: "left", width: '150px', height: '150px' }} alt=''></img>
                    <h1 style={{ fontSize: '42px', paddingTop: '2%' }}>Bienvenido {this.state.usuario.nombre} {this.state.usuario.apellidos} </h1>
                </div>
                <div style={{ marginLeft: '25%', marginTop: '10%', fontSize: '30px', textAlign: 'center', width: '50%' }}>
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
