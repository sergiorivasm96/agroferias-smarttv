import React from 'react'

//Usando API: http://goqr.me/api/

class Identificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigoQR: 'abcdefghij'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            window.location.pathname = "/Perfil";
        }, 5000);
    }

    render() {


        return (
            <div style={divGrandeStyle}>
                <div style={divCentradoStyle}>
                    <h1>Por favor, escanea el código QR desde nuestra app:</h1>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.state.codigoQR}`} style={QRStyle} alt=''></img>

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