import React from 'react'
import MapaLugar from './MapaLugar.js'
import BotonBuscar from './BotonBuscar'
import UbicacionActual from './UbicacionActual.js'
// import Modal from '../utilitarios/Modal'

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpVisible: false,
      popUpTVVisible: false,
      tiendaModal: {},
      imagen: null
    };
    this.anchoImagen = 1000;
    this.altoImagen = 350;
    this.factor = { x: 15 / 1200, y: 30 / 382 };
    this.televisor = null;
    this.idTiendaSeleccionada = null;
  }

  componentWillMount() {
    let idFeria = localStorage.getItem("idFeria");
    let televisorLocal = localStorage.getItem("localTelevisor");
    if (idFeria == null) {
      alert("Por favor, seleccione una feria en configuración.");
      window.location.pathname = "/configuracion";
    } else if (televisorLocal == null) {
      alert("Por favor, seleccione un televisor en configuración.");
      window.location.pathname = "/configuracion";
    }
  }

  componentDidMount() {
    this.idTiendaSeleccionada = localStorage.getItem("idFeria");
    if (localStorage.getItem("idFeria")) {
      fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tiendas/feria/${localStorage.getItem("idFeria")}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ tiendas: data.filter((x) => x.tipoTienda ===0) })
          // this.setState({ tiendas: data });
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
    if (this.state.tiendas == null) {
      return null;
    };
    console.log("Feria = " + this.idTiendaSeleccionada);
    console.log(this.state.tiendas)
    return (
      <div>
        <BotonBuscar></BotonBuscar>
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

          {this.state.tiendas.map((tienda, i) => {
            // if ( tienda.posicion_x == null || tienda.posicion_y == null) return null;
            return <div
              className="item-focusable"
              style={{
                left: (tienda.posicion_x - this.factor.x) * this.anchoImagen,
                position: 'absolute',
                top: (tienda.posicion_y - this.factor.y) * this.altoImagen
              }}
              onClick={() => this.handlerClick(tienda)}
              key={'tienda-' + tienda.idTienda}>
              <MapaLugar></MapaLugar>
            </div>
          })}
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
        >
          <p style={{ fontWeight: "bold", fontSize: '50px', marginTop: 'auto' }}>{this.state.texto}</p>
        </div>


      </div>

    );
  }
}
export default Mapa;
