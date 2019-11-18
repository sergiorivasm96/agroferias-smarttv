import React from "react";
import FirebaseConection from "../../services/firebase-connection.js";
import BotonOpcion from '../identificate/BotonOpcion'

//Usando API: http://goqr.me/api/

class Identificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            televisor: JSON.parse(localStorage.getItem("localTelevisor")),
        };
        this.handlerClickLogin = this.handlerClickLogin.bind(this)
        this.firebaseConnection = new FirebaseConection();
        this.firebaseConnection.init();
    }

    componentDidMount() {

    }

    handlerClickLogin(){
        let id = this.state.televisor.idTelevisor
        let tvid = `tv-${id}`;
        console.log('tvid')
        const sessionRef = this.firebaseConnection.database.ref(`sessiones/${tvid}`);
        sessionRef.on("value", (snapshot)=> {
            console.log(" el valor es ", snapshot.val());
            localStorage.setItem('idUsuario', snapshot.val())
            window.location.pathname = "/Perfil";
          });
    }

    render() {
        return (
            <div style={divGrandeStyle}>
                <img src='https://static.wixstatic.com/media/ca3438_2cc551f6cabf476084231941597fab24~mv2_d_1250_1559_s_2.png/v1/fit/w_2500,h_1330,al_c/ca3438_2cc551f6cabf476084231941597fab24~mv2_d_1250_1559_s_2.png'
                    height='230px'
                    width='180px' style={{display:'block', marginLeft:'auto', marginRight:'auto'}}></img>
                <h1 style={{textAlign: 'center'}}>
                    Bienvenido al sistema de agroferias campesinas
                </h1>
                <div style ={{textAlign:'center'}}>
                    <BotonOpcion texto='INGRESA CON EL ÚLTIMO USUARIO RECONOCIDO' funClick={this.handlerClickLogin}></BotonOpcion>
                </div>
                
            </div>
        )
    }
}

const divGrandeStyle = {
    marginTop: '5%',
    // marginRight: '8%',
    // marginLeft: '0%!important ' 
  
    // width: '100%',
    // height: '83vh',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // // marginLeft: '2% !important'
}

export default Identificate;
