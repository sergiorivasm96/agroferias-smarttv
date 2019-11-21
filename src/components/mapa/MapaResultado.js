import React from 'react'
import MapaLugar from './MapaLugar.js'
import UbicacionActual from './UbicacionActual.js'


class MapaResultado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpVisible: false,
            popUpTVVisible: false,
            tienda: '',
            imagen: ''
        };
        this.anchoImagen = 1000;
        this.altoImagen = 350;
        this.factor = { x: 15 / 1200, y: 30 / 382 };
        this.televisor = null;
        this.idTiendaProducto = null;
    }

    componentDidMount() {
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tienda/perfil/${this.props.idTienda}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ tienda: data })
                console.log(data);
                fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/${localStorage.getItem("idFeria")}/imagen`)
                    .then(res => res.json())
                    .then((data) => {
                        console.log("Imagen es ")
                        console.log(data.urlImagen);
                        this.setState({ imagen: data.urlImagen })
                    })
                    .catch(console.log)
            })
            .catch(console.log)
    }

    handlerClick(tienda) {
        this.setState({ tiendaModal: tienda, popUpVisible: true });
        setTimeout(() => {
            this.setState({ popUpVisible: false });
        }, 3000);
    }

    handlerClickTV() {
        const texto2 = 'Usted se encuentra aquí';
        this.setState({ texto: texto2, popUpTVVisible: true }, () => {
            setTimeout(() => {
                this.setState({
                    popUpTVVisible: false
                });
            }, 3000);
        });
    }

    render() {
        let productoBuscado = JSON.parse(localStorage.getItem('resultadoBusqueda'));
        return (
            <div>
                <h1 style={{ paddingLeft: '70px' }}>En las siguientes tiendas puede encontrar el producto: </h1>
                <h1 style={{ paddingLeft: '70px' }}>
                    {productoBuscado.nombre}
                </h1>
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
                    }}>
                    <div
                        className="item-focusable mapaLugar"
                        style={{
                            left: (this.state.tienda.posicion_x - this.factor.x) * this.anchoImagen,
                            position: 'absolute',
                            border: 'solid black 3px',
                            backgroundColor: '#ed217c',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            top: (this.state.tienda.posicion_y - this.factor.y) * this.altoImagen
                        }}
                        onClick={() => this.handlerClick(this.state.tienda)}>
                        <MapaLugar></MapaLugar>
                    </div>
                    <UbicacionActual
                        anchoImagen={this.anchoImagen}
                        altoImagen={this.altoImagen}
                        customClickEvent={this.handlerClickTV.bind(this)}>
                    </UbicacionActual>

                </div>
                {/* Modal para tiendas */}
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
                        backgroundColor: "black",
                        border: 'solid #ed217c 7px',
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
                    <p style={{ fontWeight: "bold" }}>{(this.state.tienda.empresa == null) ? '' : (this.state.tienda.empresa.nombreComercial)}</p>
                    <p>{this.state.tienda.descripcion}</p>
                </div>
                {/* Modal para televisores */}
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
                        height: "20%",
                        zIndex: 10,
                        backgroundColor: "black",
                        border: 'solid #ed217c 7px',
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff"
                    }}
                    data-attribute={!this.state.popUpTVVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpTVVisible ? 'hidden' : ''}
                >  <p style={{ fontWeight: "bold", fontSize: '50px', marginTop: 'auto' }}>{this.state.texto}</p></div>
            </div>
        )
    }
}

export default MapaResultado;