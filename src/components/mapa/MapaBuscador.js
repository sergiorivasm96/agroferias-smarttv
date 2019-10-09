import React from 'react'
import Keyboard from "react-simple-keyboard";
import MapaListaResultado from './MapaListaResultado.js'

import "react-simple-keyboard/build/css/index.css";
import '../styles/Keyboard.css'

class MapaBuscador extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            layoutName: "default",
            input: "",
            data: ""
        };
    }

    onChange = input => {
        this.setState({
            input: input
        });
    };

    onKeyPress = button => {
        if (button === "{enter}"){
            this.buscar();
        }
    };

    buscar = () => {
        var text = document.getElementsByTagName('input')[0].value;
        let currentComponent = this
        console.log(`se está buscando ${text}`);
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/producto/obtenerProductos/${localStorage.getItem('idFeria')}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: text
        }).then(function(response) {
            return response.json();
          })
          .then(function(data) {
            currentComponent.setState({
                data: data
            })
          });
    };





    onChangeInput = event => {
        let input = event.target.value;
        this.setState({
                input: input
            },
            () => {
                this.keyboard.setInput(input);
            }
        );
    };
    render (){
        return(
            <div style={{display:'flex'}}>
                <Keyboard
                    keyboardRef={r => (this.keyboard = r)}
                    onChange={input => this.onChange(input)}
                    onKeyPress={button => this.onKeyPress(button)}
                    theme={"hg-theme-default hg-layout-default myTheme"}
                    layoutName={this.state.layoutName}
                    useMouseEvents={true}
                    onClick={input => this.onChange(input)}
                    layout={{
                        default: [
                        "q w e r t y u i o p",
                        "a s d f g h j k l",
                        "z x c v b n m",
                        "{bksp} {space} {enter}"
                        ]
                    }}
                    buttonTheme={[
                        {
                        class: "item-focusable",
                        buttons: "q w e r t y u i o p a s d f g h j k l z x c v b n m {space} {bksp} {enter}"
                        }
                    ]}
                    display={{
                        '{bksp}': '⌫',
                        '{enter}': '🔎'
                      }}
                />

            <div>
                    <input
                        value={this.state.input}
                        placeholder={"Escribe un producto para buscar"}
                        onChange={e => this.onChangeInput(e)}
                    />
                     <MapaListaResultado resultado={this.state.data}></MapaListaResultado>
                </div>
            </div>
        )
    }
}
  
export default MapaBuscador;