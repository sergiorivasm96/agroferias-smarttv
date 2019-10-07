import React from 'react'

class BotonAtras extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a style={botonAtrasStyle} href={'#'}> <i className='fas fa-arrow-left'></i> </a>
        )
    }
}
const botonAtrasStyle = {
    marginLeft: '1%',
    marginTop: '1%'
}

class BotonBuscar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a style={botonBuscarStyle} href={'#'}> <i className='fas fa-search'></i> </a>
        )
    }
}
const botonBuscarStyle = {
    marginLeft: '91%',
    marginTop: '1%'
}

const fasStyle = {
    color: 'white',
    fontSize: '30px',
    marginLeft: '-2px',
    marginTop: '2px',
}

export const BotonAtras;
export const BotonBuscar;