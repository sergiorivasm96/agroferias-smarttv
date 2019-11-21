import React from 'react'

class BotonOpcion extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let { mostrar } = this.props;
        let estiloDisplay;
        if (mostrar) {
            estiloDisplay = {
                width: '200px',
                height: '50px',
                backgroundColor: '#ed217c',
                marginTop: '2%',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center !important',
                display: mostrar
            }
        } else {
            estiloDisplay = {
                width: '200px',
                height: '50px',
                backgroundColor: '#ed217c',
                marginTop: '2%',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center !important'
            }
        }

        return (
            <div style={{ textAlign: 'center' }}>
                <button id={this.props.id} className='item-focusable' style={estiloDisplay}
                    onClick={this.props.funClick} >
                    {this.props.texto}
                </button>
            </div>

        )
    }
}
export default BotonOpcion;