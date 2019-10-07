import React from 'react';
import MapaLugar from './MapaLugar.js';
import BotonBuscar from './BotonBuscar';
import MapaImg from './mapa.jpeg';

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiendas: [
        {
          idTienda: 1,
          nombre: 'Tienda 1',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicionX: 460,
          posicionY: 150
        },
        {
          idTienda: 2,
          nombre: 'Tienda 2',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicionX: 420,
          posicionY: 250
        },
        {
          idTienda: 3,
          nombre: 'Tienda 3',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicionX: 760,
          posicionY: 150
        },
        {
          idTienda: 4,
          nombre: 'Tienda 4',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicionX: 950,
          posicionY: 150
        },
        {
          idTienda: 5,
          nombre: 'Tienda 5',
          descripcion:
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec efficitur dolor vitae lobortis varius. Curabitur fermentum leo a eros posuere placerat. Aenean tempor ex lorem, non faucibus diam efficitur a. Etiam vitae imperdiet velit. Curabitur nec cursus orci. Nam nec ex nisl',
          posicionX: 825,
          posicionY: 320
        }
      ],
      popUpVisible: false,
      tiendaModal: {}
    };
  }

  handlerClick(tienda) {
    this.setState({ tiendaModal: tienda, popUpVisible: true });
    setTimeout(() => {
      this.setState({ popUpVisible: false });
    }, 10000);
  }

  render() {
    return (
      <div>
        <BotonBuscar></BotonBuscar>
        <div
          id="divGrande"
          style={{
            backgroundImage: 'url(' + MapaImg + ')',
            position: 'relative',
            width: '1000px',
            height: '450px',
            marginLeft: '4%'
          }}
        >
          {this.state.tiendas.map(tienda => (
            <div
              className="item-focusable"
              style={{
                left: tienda.posicionX,
                position: 'absolute',
                top: tienda.posicionY
              }}
              onClick={() => this.handlerClick(tienda)}
              key={'tienda-' + tienda.idTienda}
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
          <p style={{fontWeight: "bold"}}>{this.state.tiendaModal.nombre}</p> 
          <p>{this.state.tiendaModal.descripcion}</p>
        </div>
      </div>
    );
  }
}
export default Mapa;
