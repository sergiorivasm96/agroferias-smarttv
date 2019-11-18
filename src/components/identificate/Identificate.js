import React from "react";
import FirebaseConection from "../../services/firebase-connection.js";

//Usando API: http://goqr.me/api/

class Identificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            televisor: JSON.parse(localStorage.getItem("localTelevisor")),
        };

        this.firebaseConnection = new FirebaseConection();
        this.firebaseConnection.init();
    }

    componentDidMount() {
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
                <div style={divCentradoStyle}>
                  <div>Esperando autenticación</div>
                </div>
            </div>
        )
    }
}

const divGrandeStyle = {
    width: '100%',
    height: '83vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const divCentradoStyle = {
    textAlign: 'center',
    width: '50%'
}

const QRStyle = {
    margin: 'auto'
}

export default Identificate;
