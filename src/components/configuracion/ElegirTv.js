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
                },
                {
                    idTelevisor: 3,
                    posicion_x: 900 / 1200,
                    posicion_y: 100 / 382
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
        }, 3000);
    }

    render() {      
        let textoEncabezado
        let televisorGuardado =  JSON.parse(localStorage.getItem('localTelevisor')); 
      
        if (televisorGuardado) {
            textoEncabezado = <h1> Se ha seleccionado el SmarTV con código: {televisorGuardado.idTelevisor} </h1>
        } else {
            textoEncabezado = <h1> Seleccione el televisor que está usando: </h1>
        }

        return (
            <div>
                {textoEncabezado}
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
                        <div  key= {`tv-${televisor.idTelevisor}`}>
                            <div style={{
                                    fontSize: '40px', 
                                    position: 'absolute',
                                    left: televisor.posicion_x * this.anchoImagen + 10,
                                    top: televisor.posicion_y * this.altoImagen - 60,
                                    borderRadius: '50%',
                                    width:'50px',
                                    height: '50px',
                                    border: '3px solid black',
                                    textAlign: 'center'
                                   
                                    }}>
                                {televisor.idTelevisor}
                            </div> 
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
                            
                                <MapaLugar televisor={true}></MapaLugar>
                            </div>
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
                        fontSize: "40px",
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