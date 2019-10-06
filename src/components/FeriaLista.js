import React from 'react'
// import './styles/ScrollableList.css'
import FeriaListaItem from './FeriaListaItem'

class FeriaLista extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ferias: 
            [
            ]
        }
        console.log(this.props)
    }
  
    componentDidMount() { 
        fetch('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/ferias')
        .then(res => res.json())
        .then((data) => {
          this.setState({ ferias: data })
        //   console.log(this.state.ferias)
        })
        .catch(console.log)
    }

    render (){
        return(
            <div>
                <div className="menu-wrapper">
                    <div className="menu .keyboard-row" style={{overflow: 'hidden'}} >
                        <FeriaListaItem ferias={this.state.ferias} cambioFeria={this.props.cambioFeria}></FeriaListaItem>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default FeriaLista;