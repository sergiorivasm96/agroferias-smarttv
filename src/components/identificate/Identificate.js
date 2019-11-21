import React from "react";
import FirebaseConection from "../../services/firebase-connection.js";
import BotonOpcion from '../identificate/BotonOpcion'

//Usando API: http://goqr.me/api/

class Identificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            televisor: JSON.parse(localStorage.getItem("localTelevisor")),
            idFeria: localStorage.getItem('idFeria'),
            popUpVisible: false
        };
        this.handlerClickLogin = this.handlerClickLogin.bind(this)
        this.firebaseConnection = new FirebaseConection();
        this.firebaseConnection.init();
    }

    componentDidMount() {
        if (this.state.televisor === null || this.state.idFeria === null) {
            window.location.pathname = "/configuracion"
        }
    }

    handlerClickLogin() {
        let id = this.state.televisor.idTelevisor
        let tvid = `tv-${id}`;
        console.log('tvid')
        const sessionRef = this.firebaseConnection.database.ref(`sessiones/${tvid}`);
        sessionRef.on("value", (snapshot) => {
            console.log(" el valor es ", snapshot.val());
            if (snapshot.val()) {
                localStorage.setItem('idUsuario', snapshot.val())
                window.location.pathname = "/Perfil";
            } else {
                console.log('entro')
                this.setState({ popUpVisible: true });
                console.log(this.state.popUpVisible)
                setTimeout(() => {
                    this.setState({ popUpVisible: false });
                }, 3000);
            }
        });
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: '5%' }}>
                    <img src='https://static.wixstatic.com/media/ca3438_2cc551f6cabf476084231941597fab24~mv2_d_1250_1559_s_2.png/v1/fit/w_2500,h_1330,al_c/ca3438_2cc551f6cabf476084231941597fab24~mv2_d_1250_1559_s_2.png'
                        height='230px'
                        width='180px' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}></img>
                    <h1 style={{ textAlign: 'center' }}>
                        Bienvenido al sistema de agroferias campesinas
                    </h1>
                    <div style={{ textAlign: 'center' }}>
                        <BotonOpcion texto='INGRESA CON EL ÚLTIMO USUARIO RECONOCIDO' funClick={this.handlerClickLogin}></BotonOpcion>
                    </div>
                </div>
                <div
                    className="modal-tv"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: "35%",
                        height: "25%",
                        zIndex: 10,
                        backgroundColor: "black",
                        border: 'solid #ed217c 7px',
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff",
                        verticalAlign: 'middle',
                        paddingTop: '5px'
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                >
                    <p style={{ fontWeight: "bold", fontSize: '50px', marginTop: 'auto' }}>Aún no se ha reconocido a un cliente</p>
                </div>
            </div>
        )
    }
}

export default Identificate;
