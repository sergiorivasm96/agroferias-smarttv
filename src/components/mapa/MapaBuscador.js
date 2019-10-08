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
        };
    }

    onChange = input => {
        this.setState({
            input: input
        });
        console.log("Input changed", input);
    };

    onKeyPress = button => {
        console.log("Button pressed", button);

        if (button === "{enter}"){
            this.buscar();
        }
    };

    buscar = () => {
        var text = document.getElementsByTagName('input')[0].value;
        console.log(`se está buscando ${text}`);
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
                     <MapaListaResultado></MapaListaResultado>
                </div>
            </div>
        )
    }
}
  
export default MapaBuscador;