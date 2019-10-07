import React from 'react'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import '../styles/Keyboard.css'


class MapaBuscador extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            layoutName: "default",
            input: ""
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

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
    };

    handleShift = () => {
        let layoutName = this.state.layoutName;

        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default"
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
            <div>
                <input
                    value={this.state.input}
                    placeholder={"Tap on the virtual keyboard to start"}
                    onChange={e => this.onChangeInput(e)}
                />
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
                />
            </div>
        )
    }
}
  
export default MapaBuscador;