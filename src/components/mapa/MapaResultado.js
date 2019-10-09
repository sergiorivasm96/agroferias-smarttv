import React from 'react'
import MapaLugar from './MapaLugar.js'
import UbicacionActual from './UbicacionActual.js'


class MapaResultado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiendasMock: [
                {
                    idTienda: 1,
                    nombre: 'Tienda 1',
                    descripcion:
                        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
                    posicion_x: 460 / 1200,
                    posicion_y: 150 / 382
                },
                {
                    idTienda: 3,
                    nombre: 'Tienda 3',
                    descripcion:
                        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
                    posicion_x: 760 / 1200,
                    posicion_y: 150 / 382
                },
                {
                    idTienda: 5,
                    nombre: 'Tienda 5',
                    descripcion:
                        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
                    posicion_x: 825 / 1200,
                    posicion_y: 320 / 382
                }
            ],
            popUpVisible: false,
            popUpTVVisible: false,
            tienda: ''
        };
        this.imagen = 'https://i.imgur.com/6emyLTi.jpg';
        this.anchoImagen = 1200;
        this.altoImagen = 382;
        this.televisor = null;
        this.idTiendaProducto = null;
    }

    componentDidMount() {
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tienda/perfil/${this.props.idTienda}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ tienda: data })
          console.log(data)
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
               <h1>En las siguientes tiendas puede encontrar el producto: {productoBuscado.nombre}</h1> 
                <div
                    id="divGrande"
                    style={{
                        backgroundImage: 'url(' + this.imagen + ')',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        width: this.anchoImagen.toString() + 'px',
                        height: this.altoImagen.toString() + 'px',
                        marginLeft: '4%'
                    }}>
                    <div
                        className="item-focusable"
                        style={{
                            // left: this.state.tienda.posicion_x * this.anchoImagen,
                            // top: this.state.tienda.posicion_y * this.altoImagen
                            position: 'absolute',
                            left: this.state.tiendasMock[0].posicion_x * this.anchoImagen,
                            top: this.state.tiendasMock[0].posicion_y * this.altoImagen
                        }}
                        onClick={() => this.handlerClick(this.state.tienda)}>
                        <MapaLugar></MapaLugar>
                    </div>
                    <UbicacionActual 
                        anchoImagen = {this.anchoImagen} 
                        altoImagen ={this.altoImagen} 
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
                        backgroundColor: "#e6428b",
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