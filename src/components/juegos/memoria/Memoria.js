import React from 'react'
import './Memoria.css'

class Memoria extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //frameworks: ['angular2', 'vue', 'react', 'grunt', 'phantomjs', 'ember', 'babel', 'ionic', 'gulp', 'meteor', 'yeoman', 'yarn', 'nodejs', 'bower', 'browserify'],
            frameworks: [],
            duplicatedFrameworks: [],
            randomizedFrameworks: [],
            finalizedFrameworks: [],
            openedFrameworks: []
        }
        //this.start()
    }

    handleClick(name, index) {
        if (this.state.openedFrameworks.length === 2) {
            setTimeout(() => {
                this.check()
            }, 750)
        } else {
            let framework = {
                name,
                index
            }
            let finalizedFrameworks = this.state.finalizedFrameworks
            let frameworks = this.state.openedFrameworks
            finalizedFrameworks[index].close = false
            frameworks.push(framework)
            this.setState({
                openedFrameworks: frameworks,
                finalizedFrameworks: finalizedFrameworks
            })
            if (this.state.openedFrameworks.length === 2) {
                setTimeout(() => {
                    this.check()
                }, 750)
            }
        }
    }

    check() {
        let finalizedFrameworks = this.state.finalizedFrameworks
        if ((this.state.openedFrameworks[0].name === this.state.openedFrameworks[1].name) && (this.state.openedFrameworks[0].index !== this.state.openedFrameworks[1].index)) {
            finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true
            finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true
        } else {
            finalizedFrameworks[this.state.openedFrameworks[0].index].close = true
            finalizedFrameworks[this.state.openedFrameworks[1].index].close = true
        }
        this.setState({
            finalizedFrameworks,
            openedFrameworks: []
        })
    }

    start(items) {
        this.state.frameworks = []
        for (let i = 0; i < items.length; i++) {
            this.state.frameworks.push(items[i].urlImage);
        }

        console.log("Imagenes: " + this.state.frameworks)
        let finalizedFrameworks = [];
        this.state.duplicatedFrameworks = this.state.frameworks.concat(this.state.frameworks)
        this.state.randomizedFrameworks = this.shuffle(this.state.duplicatedFrameworks)
        this.state.randomizedFrameworks.map((name, index) => {
            finalizedFrameworks.push({
                name,
                close: true,
                complete: false,
                fail: false
            })
        })
        this.state.finalizedFrameworks = finalizedFrameworks
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array
    }

    componentDidMount() {

        let localTelevisor = JSON.parse(localStorage.getItem("localTelevisor"));
        if (localTelevisor === null) {
            alert("Por favor, seleccione primero un televisor.");
            window.location.pathname = "/configuracion";
        }
        console.log("Mi tele es: " + localTelevisor.idTelevisor)
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/memoria/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data.items_memoria);
                this.start(data.items_memoria);
                this.forceUpdate();
            })
            .catch(console.log)
    }

    render() {
        console.log("Rendering...")
        return (
            <div id="app">
                <div className="playground">
                    {
                        this.state.finalizedFrameworks.map((framework, index) => {
                            return <Card framework={framework.name} click={() => { this.handleClick(framework.name, index) }} close={framework.close} complete={framework.complete} key={index} />
                        })
                    }
                </div>
            </div>
        )
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    clicked(framework) {
        this.props.click(framework)
    }
    render() {
        return (
            <div className={" card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
                <div className="item-focusable front">
                    ?
                </div>
                <div className="item-focusable back">
                    <img src={this.props.framework} width={70} height={70} />
                </div>
            </div>
        )
    }
}

export default Memoria;