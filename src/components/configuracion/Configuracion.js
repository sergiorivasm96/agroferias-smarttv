import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTv} from '@fortawesome/free-solid-svg-icons'
import FeriaLista from './FeriaLista'
import {Link} from 'react-router-dom'

class Configuracion extends React.Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            feriaActual:'',
            popUpVisible: false,
            texto: '',
            feriaSeleccionada: false
        }
        this.cambioFeria = this.cambioFeria.bind(this);
        this.seleccionarTelevisorSinFeria = this.seleccionarTelevisorSinFeria.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    cambioFeria(feria){
        const texto = 'se ha cambiado la feria'
        this.setState({ feriaActual: feria, texto: texto, popUpVisible:true, feriaSeleccionada:true}, () => {
            console.log(this.state.feriaActual);
            setTimeout(() => {
                this.setState({ popUpVisible: false
               });
              }, 3000);
          });   
    }

    seleccionarTelevisorSinFeria(){
        console.log('debe seleccionar feria', this.state.feriaSeleccionada)
        const texto2 = 'debe seleccionar una feria primero'
        this.setState({ texto: texto2, popUpVisible:true}, () => {
            setTimeout(() => {
                this.setState({ popUpVisible: false
             });
              }, 3000);
          });   
    }

    render (){
        let button;
        let textoFeria;
        console.log(this.state.feriaSeleccionada)
        if(this.state.feriaSeleccionada){
            console.log('feria seleccionada')
            button  =   <Link to={{
                            pathname: `/configuracion/${this.state.feriaActual.idFeria}`}}  style={{ textDecoration: 'none', color:'inherit' }}>
                            <button style={buttonStyle} className='item-focusable'>  <FontAwesomeIcon icon={faTv} size='6x' />  </button>        
                        </Link>
            textoFeria = 'Feria seleccionada: ' + this.state.feriaActual.nombre         
        }else{
            console.log('feria sin seleccionar')
            button  =  <button style={buttonStyle} className='item-focusable' onClick={this.seleccionarTelevisorSinFeria}>  <FontAwesomeIcon icon={faTv} size='6x' />  </button>
            textoFeria = 'Seleccione una feria: '  
        }
        
        return(
            <div>
                <div style={{fontSize: '50px', paddingTop: '2%'}}>
                    {textoFeria}
                </div>
                <FeriaLista cambioFeria={this.cambioFeria}></FeriaLista>   
                <div style={{fontSize: '50px', paddingTop: '5%'}}>
                    Posición del televisor en el mapa
                </div>
            {button}
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
   
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff"
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                    >
                    <p style={{fontWeight: "bold", fontSize:'50px'}}>{this.state.texto}</p> 
                </div>
            </div>  
        )
    }
}

const buttonStyle={
    background: '#ed217c',
    textAlign:'center',
    borderRadius: 10,
    width: 120,
    height: 120,
    color: 'white',
    fondWeight: 'bold',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '40%',
    marginTop: '2%'
}

  
export default Configuracion;