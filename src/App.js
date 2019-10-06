import React from 'react'
import Home from './components/Home.js'
import {faCog, faMap, faUser, faVideo} from '@fortawesome/free-solid-svg-icons'
import MenuItem from './components/MenuItem.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Mapa from './components/Mapa.js'
import Identificate from './components/Identificate.js'
import Publicidad from './components/Publicidad.js'
import Configuracion from './components/Configuracion.js'
import Mapeo from './components/Mapeo.js'

const menuStyle = {
    background: '#ed217c',
    paddingLeft: '5%'
}

class App extends React.Component {
    constructor(props) {
    super(props);
    this.mapeo = new Mapeo();
  }

  componentDidMount() {
    this.mapeo.createZone('.main-menu');
    console.log("zone created")
  }

  componentWillUnmount(){
    this.mapeo.removeZone('.main-menu');
    console.log('zone destroyed');
}

  render() {
    return (
      <BrowserRouter>
      <div className='main-menu'>
            <div className='App'>
              <div  display='block' style={menuStyle} className="keyboard-row">
                    <MenuItem name='Identifícate' icon={faUser} link="/identificate"></MenuItem>
                    <MenuItem name='Mapa' icon={faMap} link="/mapas" ></MenuItem>
                    <MenuItem name='Publicidad' icon={faVideo} link="/publicidad" ></MenuItem>
                    <MenuItem name='Configuración' icon={faCog} link="/configuracion" ></MenuItem>
              </div> 
            </div>

        <Switch>
          <Route path="/identificate">
            <Identificate />
          </Route>
          <Route path="/mapas">
            <Mapa />
          </Route>
          <Route path="/publicidad">
            <Publicidad />
          </Route>
          <Route path="/configuracion">
            <Configuracion />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
      
    </BrowserRouter>
    );
  }
}

export default App;
