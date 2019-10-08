import React from 'react'
import MapaLugar from '../mapa/MapaLugar.js';

class ElegirTv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            televisores: [
                {
                    idTelevisor: 1,
                    posicion_x: 460 / 1200,
                    posicion_y: 200 / 382
                },
                {
                    idTelevisor: 2,
                    posicion_x: 750 / 1200,
                    posicion_y: 200 / 382
                }
            ],
            popUpVisible: false,
            televisorModal: {}
        };
        this.imagen = 'https://i.imgur.com/6emyLTi.jpg';
        this.anchoImagen = 1200;
        this.altoImagen = 382;
    }

    handlerClick(televisor) {
        this.setState({ televisorModal: televisor, popUpVisible: true });
        localStorage.setItem("localTelevisor", JSON.stringify(televisor));
        setTimeout(() => {
            this.setState({ popUpVisible: false });
            window.location = '/mapas';
        }, 3000);
    }

    render() {
        console.log("Usted quiere ubicar los televisores de la feria" + this.props.idFeria + " como id")
        return (
            <div>
                <h1> Seleccione el televisor que está usando: </h1>
                <div
                    id="divGrande"
                    style={{
                        backgroundImage: 'url(' + this.imagen + ')',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        width: this.anchoImagen.toString() + 'px',
                        height: this.altoImagen.toString() + 'px',
                        margin: 'auto',
                        marginTop: '0px'
                    }}
                >
                    {this.state.televisores.map(televisor => (
                        <div
                            className="item-focusable"
                            style={{
                                left: televisor.posicion_x * this.anchoImagen,
                                position: 'absolute',
                                top: televisor.posicion_y * this.altoImagen
                            }}
                            onClick={() => this.handlerClick(televisor)}
                            key={'televisor-' + televisor.idTelevisor}
                        >
                            <MapaLugar></MapaLugar>
                        </div>
                    ))}
                </div>
                <div
                    className="modal-mapa"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: "35%",
                        height: "30%",
                        zIndex: 10,
                        backgroundColor: "#e6428b",
                        padding: "20px",
                        fontSize: "18px",
                        lineHeight: "25px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff"
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                >
                    <p> Usted eligió el televisor {this.state.televisorModal.idTelevisor}</p>
                </div>
            </div>
        )
    }
}

export default ElegirTv;