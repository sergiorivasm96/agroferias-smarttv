import React from 'react'

class BotonTexto extends React.Component{
    // constructor(props) {
    //     super(props);
    // }

    
    render (){
        return(
            <button style={buttonStyle}>
                {this.props.texto}
            </button>
        )
    }
}

const buttonStyle = {
    background: '#ed217c',
    textAlign:'center',
    borderRadius: 10,
    width: 120,
    height: 60,
    color: 'white',
    fondWeight: 'bold',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '45%'
}
  
export default BotonTexto;