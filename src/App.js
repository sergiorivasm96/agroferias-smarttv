import React from 'react'
import {faCog, faMap, faUser, faVideo} from '@fortawesome/free-solid-svg-icons'
import MenuItem from './components/home/MenuItem.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home/Home.js'
import Mapa from './components/mapa/Mapa.js'
import Identificate from './components/identificate/Identificate.js'
import Publicidad from './components/publicidad/Publicidad.js'
import Configuracion from './components/configuracion/Configuracion.js'
import MapaBuscador from './components/mapa/MapaBuscador.js'
import Mapeo from './components/mapeo/Mapeo.js'



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
              <div  display='block' style={menuStyle} className="keyboard-row menu-rosado">
                    <MenuItem name='Identifícate' icon={faUser} link="/identificate"></MenuItem>
                    <MenuItem name='Mapa' icon={faMap} link="/mapas" ></MenuItem>
                    <MenuItem name='Publicidad' icon={faVideo} link="/publicidad" ></MenuItem>
                    <MenuItem name='Configuración' icon={faCog} link="/configuracion" ></MenuItem>
              </div> 
            </div>

        <Switch>
          <Route exact path="/identificate">
            <Identificate />
          </Route>
          <Route exact path="/mapas">
            <Mapa />
          </Route>
          <Route exact path="/publicidad">
            <Publicidad />
          </Route>
          <Route exact path="/configuracion">
            <Configuracion />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mapas/buscador">
                    <MapaBuscador />
          </Route>
       
        </Switch>

      </div>
      
    </BrowserRouter>
    );
  }
}

export default App;
