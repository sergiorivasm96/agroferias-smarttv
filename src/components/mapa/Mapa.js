import React from 'react';
import MapaLugar from './MapaLugar.js';
import TelevisorLugar from './TelevisorLugar.js';
import BotonBuscar from './BotonBuscar';

class Mapa extends React.Component {
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
          idTienda: 2,
          nombre: 'Tienda 2',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicion_x: 420 / 1200,
          posicion_y: 250 / 382
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
          idTienda: 4,
          nombre: 'Tienda 4',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicion_x: 950 / 1200,
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
      popUpTVVisible: false,
      tiendaModal: {},
      imagen: null
    };
    //this.imagen = 'https://i.imgur.com/6emyLTi.jpg';
    this.anchoImagen = 1200;
    this.altoImagen = 382;
    this.televisor = null;
  }

  componentWillMount() {
    console.log("Montar")
    if (localStorage.getItem("idFeria")) {
      fetch('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tiendas/feria/' + localStorage.getItem("idFeria"))
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ tiendas: data });
          fetch('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/' + '1' + "/imagen")
            .then(res => res.json())
            .then((data) => {
              console.log("Imagen es ")
              console.log(data.urlImagen);
              this.setState({imagen : data.urlImagen})
            })
            .catch(console.log)

        })
        .catch(console.log)
    }
  }

  handlerClick(tienda) {
    console.log("Se setea la tienda");
    console.log(tienda);
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
    console.log("Rendering");
    console.log(this.state.tiendas)
    if (this.state.tiendas == null) {
      console.log("safo");
      return null;
    };
    return (
      <div>
        <BotonBuscar></BotonBuscar>
        <div
          id="divGrande"
          style={{
            backgroundImage: 'url(' + this.state.imagen + ')',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            width: this.anchoImagen.toString() + 'px',
            height: this.altoImagen.toString() + 'px',
            marginLeft: '4%'
          }}
        >
          {this.state.tiendas.map((tienda, i) => {
            if (i > 5) i = 5; //para el mock
            return <div
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
          })}

          {this.state.televisores.filter(televisor => {
            let localTV = localStorage.getItem("localTelevisor");
            if (localTV == null)
              return false;
            else {
              this.televisor = JSON.parse(localTV);
              return (this.televisor.idTelevisor === televisor.idTelevisor) ? true : false;
            }
          }).map(televisor => {
            return <div
              className="item-focusable"
              style={{
                left: televisor.posicion_x * this.anchoImagen,
                position: 'absolute',
                top: televisor.posicion_y * this.altoImagen
              }}
              onClick={() => this.handlerClickTV()}
              key={'televisor-' + televisor.idTelevisor}
            >
              <TelevisorLugar></TelevisorLugar>
            </div>
          }

          )}
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
