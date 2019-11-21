import React from 'react'

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpVisible: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                popUpVisible: false
            });
        }, 3000);
    }

    render() {
        return <div
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
                backgroundColor: "black",
                border: 'solid #ed217c 7px',
                padding: "20px",
                fontSize: "18px",
                lineHeight: "25px",
                borderRadius: "20px",
                boxShadow: "0px 0px 6px #ccc",
                color: "#fff"
            }}
            data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
            hidden={!this.state.popUpVisible ? 'hidden' : ''}
        >
            <p style={{ fontWeight: "bold" }}>{this.props.titulo}</p>
            <p>{this.props.titulo}</p>
        </div>
    }
}