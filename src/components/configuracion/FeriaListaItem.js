import React from 'react'

var imagenDefecto = 'https://static.wixstatic.com/media/ca3438_d19b292fe67d48a9850302656b8968cb~mv2.jpg/v1/fill/w_190,h_190,al_c,q_80,usm_0.66_1.00_0.01/Untitled.jpg';

class ScrollableListItem extends React.Component {

  cambioFeria(feria) {
    this.props.cambioFeria(feria);
  }
  render() {
    console.log(this.props.ferias)
    return (
      <div style={styleFeriaList}>
        {this.props.ferias.map((feria) => (
          <div
            className='item-focusable feria configuration item'
            key={'feria-' + feria.idFeria}
            name={'feria-' + feria.idFeria}
            onClick={() => this.cambioFeria(feria)}
            tabIndex="0"
            style={styleFeriaCard}>
            <div >
              <img src={feria.logo ? feria.logo : imagenDefecto} style={{ width: '150px', height: '150px' }} alt=""></img>
            </div>
            <div className={"feria-text"} style={{ fontWeight: 'bold' }}>{feria.nombre}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default ScrollableListItem;

const styleFeriaList = {
  display: 'flex',
  marginTop: '5%',
  marginRight: '10%',
  whiteSpace: 'nowrap',
  overflow: 'auto',
  flexBasis: '25%',
  flexGrow: '1'
}

const styleFeriaCard = {
  textAlign: 'center',
  width: '100% !important',
  height: '100% !important',
  marginRight: '10%'
}