import React from 'react'
import MapaLugar from './MapaLugar.js';

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
            tiendaModal: {}
        };
        this.imagen = 'https://i.imgur.com/6emyLTi.jpg';
        this.anchoImagen = 1200;
        this.altoImagen = 382;
        this.televisor = null;
        this.idTiendaProducto = null;
    }

    componentWillMount() {
        let localProductos = JSON.parse(localStorage.getItem("localProductos"));
        this.setState({
            productos: localProductos,
        });
        //this.state.productos = localProductos;
        //Buscamos el nombre del producto
        localProductos.forEach((producto) => {
            if (this.props.idProducto == producto.idProducto && localStorage.getItem("idFeria")) {
                console.log("Buscando en feria " + localStorage.getItem("idFeria") + " el producto " + producto.nombre.split(' ')[0])
                fetch('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/producto/' + '1'
                    + '/' + 'leche')
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        this.idTiendaProducto = data[0].idTienda;
                        fetch('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tiendas/feria/' + '1')
                            .then(res => res.json())
                            .then((data) => {
                                console.log(data);
                                this.setState({ tiendas: data });
                            })
                            .catch(console.log)
                    })
                    .catch(console.log)
            }
        })
    }

    handlerClick(tienda) {
        this.setState({ tiendaModal: tienda, popUpVisible: true });
        setTimeout(() => {
            this.setState({ popUpVisible: false });
        }, 3000);
    }

    render() {
        if (this.state.productos == null || this.state.tiendas == null) {
            console.log("safo");
            return null;
        };
        console.log("Usted quiere encontrar las tiendas que tengan vendan el producto con id " + this.props.idProducto);
        return (
            <div>
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
                    }}
                >
                    {this.state.tiendas.filter(tienda => {
                        //console.log('Comparando ' + this.idTiendaProducto + " y " + tienda.idTienda);
                        return (this.idTiendaProducto == tienda.idTienda) ? true : false;
                    }).map((tienda, i) => (
                        <div
                            className="item-focusable"
                            style={{
                                left: this.state.tiendasMock[i].posicion_x * this.anchoImagen,
                                position: 'absolute',
                                top: this.state.tiendasMock[i].posicion_y * this.altoImagen
                            }}
                            onClick={() => this.handlerClick(tienda)}
                            key={'tienda-' + tienda.idTienda}
                        >
                            <MapaLugar></MapaLugar>
                        </div>
                    ))}
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
                    <p style={{ fontWeight: "bold" }}>{(this.state.tiendaModal.empresa == null) ? '' : (this.state.tiendaModal.empresa.nombreComercial)}</p>
                    <p>{this.state.tiendaModal.descripcion}</p>
                </div>
            </div>
        )
    }
}

export default MapaResultado;