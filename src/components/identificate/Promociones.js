import React from 'react'
import ListaPromociones from './PromocionesLista'
import '../styles/Configuracion.css'

class Promociones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpVisible: false,
            tiendaSeleccionada: '',
            texto: "",
            empresa: '',
            link: null
        }
        this.cambioProducto = this.cambioProducto.bind(this);
    }


    cambioProducto(producto) {
        localStorage.setItem('resultadoBusqueda', JSON.stringify(producto))
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tienda/perfil/${producto.idTienda}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ tiendaSeleccionada: data })
                this.setState({
                    link: this.state.tiendaSeleccionada.empresa.direccionWeb,
                    empresa: this.state.tiendaSeleccionada.empresa.nombreComercial
                })
                /* console.log(this.state.tiendaSeleccionada)
                const texto = `Visite la tienda ${this.state.tiendaSeleccionada.empresa.nombreComercial} en http://agroferias-cliente.s3-website.us-east-2.amazonaws.com/, pedidos al por mayor al número ${this.state.tiendaSeleccionada.empresa.celular} y al correo ${this.state.tiendaSeleccionada.empresa.email}`
                this.setState({ popUpVisible: true, texto: texto })
                setTimeout(() => {
                    this.setState({ popUpVisible: false });
                }, 3000); */

            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <div style={{
                    fontSize: '30px',
                    marginTop: '2%',
                    marginLeft: '2%',
                    color: '#ed217c'
                }}>
                    PROMOCIONES
                </div>
                <ListaPromociones cambioProducto={this.cambioProducto}></ListaPromociones>
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
                        fontSize: "40px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff"
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                >
                    <p style={{ fontWeight: "bold", fontSize: '20px', marginTop: '20px' }}>{this.state.texto} </p>

                </div>

                <div style={{
                    fontSize: '30px',
                    marginTop: '2%',
                    marginLeft: '2%',
                    color: '#ed217c'
                }}>
                    {this.state.link ?
                        <div><span>Somos</span> <span style={{ fontWeight: 'bold' }}>{this.state.empresa}</span><span>, encuentrenos usando el siguiente código:</span></div>
                        :
                        'Seleccione una para más información'}
                </div>
                {this.state.link ?
                    <img style={{
                        margin: 'auto',
                        display: 'block',
                        marginTop: '2%'
                    }}
                        src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.state.link}>

                    </img>
                    :
                    ''
                }

            </div>
        )
    }
}

export default Promociones;
