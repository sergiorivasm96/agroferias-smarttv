import React from 'react'
import MapaLugar from '../mapa/MapaLugar.js';

import '../mapa/Mapa.css'

var ImagenError = 'https://www.elegantthemes.com/blog/wp-content/uploads/2016/03/500-internal-server-error-featured-image-1.png';

class ElegirTv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            televisores: [],
            popUpTVVisible: false,
            televisorModal: {},
            imagen: '',
            texto: '',
            popUpVisible: false
        };
        this.anchoImagen = 1000;
        this.altoImagen = 350;
        this.factor = { x: 15 / 1200, y: 30 / 382 };
    }

    componentWillMount() {
        let idFeria = localStorage.getItem("idFeria");
        if (idFeria == null) {
            alert("Por favor, seleccione una feria en configuración.");
            window.location.pathname = "/configuracion";
        }
    }

    componentDidMount() {
        let idFeria = localStorage.getItem('idFeria');
        console.log("did")
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/${idFeria}/televisor`)
            .then(res => res.json())
            .then((data) => {
                let habilitados = data.filter((x) => x.habilitado === 1);
                console.log(habilitados)
                this.setState({ televisores: habilitados })
                if (habilitados === null || habilitados.length === 0) this.mostrarAlerta("No existen televisores en la agroferia.");
                console.log(this.state.televisores);
                fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/${localStorage.getItem("idFeria")}/imagen`)
                    .then(res => res.json())
                    .then((data) => {
                        console.log("Imagen es ")
                        console.log(data.urlImagen);
                        if (data === null || data.urlImagen === null) this.setState({ imagen: ImagenError })
                        else this.setState({ imagen: data.urlImagen })
                    })
                    .catch(console.log)
            })
            .catch(console.log)
    }

    handlerClick(televisor) {
        this.setState({ televisorModal: televisor, popUpTVVisible: true });
        localStorage.setItem("localTelevisor", JSON.stringify(televisor));
        setTimeout(() => {
            this.setState({ popUpTVVisible: false });
        }, 3000);
    }

    mostrarAlerta(mensaje) {
        this.setState({ texto: mensaje, popUpVisible: true });
    }

    render() {
        if (this.state.televisores === null || this.state.televisores.length === 0) {
            this.state.televisores = []
        }

        let textoEncabezado;
        let televisorGuardado = JSON.parse(localStorage.getItem('localTelevisor'));

        if (televisorGuardado) {
            textoEncabezado = <h1 style={{ paddingLeft: '90px' }}> Se ha seleccionado el SmarTV con código: {televisorGuardado.idTelevisor} </h1>
        } else {
            textoEncabezado = <h1 style={{ paddingLeft: '90px' }}> Seleccione el televisor que está usando: </h1>
        }

        return (
            <div>
                {textoEncabezado}
                <div
                    id="divGrande"
                    style={{
                        backgroundImage: 'url(' + this.state.imagen + ')',
                        width: '1000px',
                        height: '350px',
                        backgroundSize: '100% 100%',
                        position: 'relative',
                        marginLeft: '4%',
                        marginTop: '5%'
                    }}
                >
                    {this.state.televisores.map(televisor => (
                        <div key={`tv-${televisor.idTelevisor}`}>
                            <div style={{
                                fontSize: '40px',
                                left: (televisor.posicion_X - this.factor.x) * this.anchoImagen + 10,
                                position: 'absolute',
                                top: (televisor.posicion_Y - this.factor.y) * this.altoImagen - 60,
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                border: '3px solid white',
                                textAlign: 'center',
                                color: 'black',
                                backgroundColor: '#ed217c'
                            }}>
                                {televisor.idTelevisor}
                            </div>
                            <div className="item-focusable seleccionarTV"
                                style={{
                                    left: (televisor.posicion_X - this.factor.x) * this.anchoImagen,
                                    position: 'absolute',
                                    top: (televisor.posicion_Y - this.factor.y) * this.altoImagen,
                                    border: 'solid black 3px',
                                    backgroundColor: '#ed217c',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px'
                                }}
                                onClick={() => this.handlerClick(televisor)}
                                key={'televisor-' + televisor.idTelevisor}
                            >
                                <MapaLugar name={'tv-' + televisor.idTelevisor} televisor={true}></MapaLugar>
                            </div>
                        </div>

                    ))}
                </div>

                {/* Modal para televisores */}
                <div
                    className="modal-mapa"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: "20%",
                        height: "20%",
                        zIndex: 10,
                        backgroundColor: "black",
                        fontSize: "40px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff",
                        verticalAlign: 'middle',
                        textAlign: 'center',
                        border: 'solid #ed217c 7px'
                    }}
                    data-attribute={!this.state.popUpTVVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpTVVisible ? 'hidden' : ''}
                >
                    <p style={{
                        marginTop: '11px'
                    }}>
                        Usted eligió el televisor {this.state.televisorModal.idTelevisor}
                    </p>
                </div>

                {/* Modal para alertas */}
                <div
                    className="modal modal-mapa"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: "45%",
                        height: "42%",
                        zIndex: 10,
                        backgroundColor: "black",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff",
                        textAlign: 'center',
                        border: 'solid #ed217c 7px'
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                >
                    <p style={{ fontWeight: "bold", fontSize: '70px', wordBreak: 'break-word', marginTop: '5%' }}>{this.state.texto}</p>
                </div>

            </div>
        )
    }
}

export default ElegirTv;