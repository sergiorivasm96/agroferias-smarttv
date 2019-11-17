import 'core-js/library';
import "core-js/shim";
import 'cross-fetch/polyfill';
import React from 'react'
import { faCog, faMap, faUser, faVideo } from '@fortawesome/free-solid-svg-icons'
import MenuItem from './components/home/MenuItem.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/home/Home.js'
import Mapa from './components/mapa/Mapa.js'
import Identificate from './components/identificate/Identificate.js'
import Perfil from './components/identificate/Perfil.js'
import Publicidad from './components/publicidad/Publicidad.js'
import Configuracion from './components/configuracion/Configuracion.js'
import MapaBuscador from './components/mapa/MapaBuscador.js'
import Mapeo from './components/mapeo/Mapeo.js'
import MapaResultado from './components/mapa/MapaResultado.js'
import ElegirTV from './components/configuracion/ElegirTv.js'
import PlayVideo from './components/publicidad/PlayVideo.js'
import Ruleta from './components/juegos/ruleta/Ruleta.js'
import Memoria from './components/juegos/memoria/Memoria.js'
import Trivia from './components/juegos/trivia/Trivia.js'
import Juegos from './components/juegos/Juegos.js'
import Premios from './components/juegos/Premios'
import Promociones from './components/identificate/Promociones.js'
import Recomendaciones from './components/identificate/Recomendaciones'


const menuStyle = {
  background: '#ed217c',
  paddingLeft: '12%',
  paddingTop: '15px',
  paddingBottom: '15px'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.mapeo = new Mapeo();
  }

  componentDidMount() {
    this.mapeo.createZone('.main-menu');
  }

  componentWillUnmount() {
    this.mapeo.removeZone('.main-menu');
  }

  render() {
    return (
      <BrowserRouter>
        <div className='main-menu' id='menuSuperior'>
          <div className='App'>
            <div display='block' style={menuStyle} className="keyboard-row menu-rosado">
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
            <Route exact path="/mapas/buscador/:idTienda" render={({ match }) => <MapaResultado idTienda={match.params.idTienda} />} >

            </Route>
            <Route exact path="/configuracion/:idFeria" render={({ match }) => <ElegirTV idFeria={match.params.idFeria} />} >
            </Route>

            <Route exact path="/playvideo/:codigo" render={({ match }) => <PlayVideo codigo={match.params.codigo} />} >
              <PlayVideo />
            </Route>

            <Route exact path="/perfil">
              <Perfil />
            </Route>

            <Route exact path="/juegos">
              <Juegos />
            </Route>

            <Route exact path="/juegos/ruleta">
              <Ruleta />
            </Route>

            <Route exact path="/juegos/memoria">
              <Memoria />
            </Route>

            <Route exact path="/juegos/trivia">
              <Trivia />
            </Route>

            <Route exact path="/recomendaciones">
              <Recomendaciones />
            </Route>

            <Route exact path="/promociones">
              <Promociones />
            </Route>

            <Route exact path="/premio">
              <Premios />
            </Route>

          </Switch>

        </div>

      </BrowserRouter>
    );
  }
}

export default App;
