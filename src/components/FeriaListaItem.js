import React from 'react'

class ScrollableListItem extends React.Component{

  cambioFeria(feria){
    this.props.cambioFeria(feria);
  }
    render (){
        return(
            <div  style={styleFeriaList}>
            {this.props.ferias.map((feria) => (
              <div className='item-focusable feria item' key={'feria-' + feria.idFeria} onClick={()=>this.cambioFeria(feria)} tabIndex="0"  style={styleFeriaCard}>
                <div className={"feria-body" + feria.idFeria}>
                  <img src={feria.logo} style={{width: '150px', height: '150px'}} alt = ""></img>
                </div>
                <div>{feria.nombre}</div>
              </div>
            ))}
          </div>
        )
    }
}
  
export default ScrollableListItem;

const styleFeriaList ={
    display: 'flex', 
    marginLeft:'10%',
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