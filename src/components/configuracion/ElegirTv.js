import React from 'react'
import MapaLugar from '../mapa/MapaLugar.js';

class ElegirTv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            televisores: [],
            popUpVisible: false,
            televisorModal: {}
        };
        this.imagen = 'https://i.imgur.com/6emyLTi.jpg';
        this.anchoImagen = 1000;
        this.altoImagen = 350;
        this.factor = { x: 15 / this.anchoImagen, y: 30 / this.altoImagen };
    }

    componentDidMount(){
        let idFeria = localStorage.getItem('idFeria')
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/${idFeria}/televisor`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ televisores: data })
          console.log(this.state.televisores)
        })
        .catch(console.log)
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
            textoEncabezado = <h1 style={{paddingLeft: '90px'}}> Se ha seleccionado el SmarTV con código: {televisorGuardado.idTelevisor} </h1>
        } else {
            textoEncabezado = <h1 style={{paddingLeft: '90px'}}> Seleccione el televisor que está usando: </h1>
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
                                    left: (televisor.posicion_X - this.factor.x) * this.anchoImagen ,
                                    position: 'absolute',
                                    top: (televisor.posicion_Y - this.factor.y) * this.altoImagen ,
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
                                    left: (televisor.posicion_X - this.factor.x) * this.anchoImagen,
                                    position: 'absolute',
                                    top: (televisor.posicion_Y - this.factor.y) * this.altoImagen
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