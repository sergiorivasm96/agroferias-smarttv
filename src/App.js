import React from 'react'
import Home from './components/Home.js'
import {faCog, faMap, faUser, faVideo} from '@fortawesome/free-solid-svg-icons'
import MenuItem from './components/MenuItem.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Mapa from './components/Mapa.js'
import Identificate from './components/Identificate.js'
import Publicidad from './components/Publicidad.js'
import Configuracion from './components/Configuracion.js'
import * as gtv from "@arxis/gtvzone";

const menuStyle = {
    background: '#ed217c',
    paddingLeft: '5%'
}

class App extends React.Component {
  globalKeyMappingController;
  constructor(props) {
    super(props);
    this.globalKeyMappingController = new gtv.jq.KeyController();
    this.globalKeyMappingController.start();
  }


  generalKeymapping = {
    13: function(selectedItem, newSelected) {
      // con esto disparamos una accion que está implementado un poco mas abajo en Click
      const nativeSelectectItem = selectedItem[0];
      nativeSelectectItem.click();
      // selectedItem.trigger('click');
      return {
        status: 'selected' // este debe estar siempre, solo varia cuando se quiere hacer cosas especiales que no se harán para este proyecto
      };
    },
     40: function _(selectedItem, newSelected) {
      // down
      return {
        status: 'none'
      };
    },
    37: function _(selectedItem, newSelected) {
      // left
      return {
        status: 'none'
      };
    },
    38: function _(selectedItem, newSelected) {
      // up
      return {
        status: 'none'
      };
    },
    39: function _(selectedItem, newSelected) {
      // right
      return {
        status: 'none'
      };
    },
  };


  createNewKeyBehaviorZone(
    selector,
    keyMapping,
    actionMapping,
    navSelectors
  ) {
    return new gtv.jq.KeyBehaviorZone({
      containerSelector: selector,
      navSelectors: (navSelectors && navSelectors.itemRow) || {
        itemRow: '.keyboard-row',
        itemParent: '.keyboard-parent',
        item: '.item-focusable',
        itemPage: null
      },
      selectionClasses: {
        basic: 'focused-item',
        hasData: 'focused-item'
      },
      saveRowPosition: false,
      keyMapping: keyMapping,
      actions: actionMapping || {},
      useGeometry: true
    });
  }

  componentDidMount() {
   const _zone =this.createNewKeyBehaviorZone(".MainMenu",this.generalKeymapping)
  this.globalKeyMappingController.addBehaviorZone(
    _zone,
    true,
    ['HOME_LAYER']
  );
  }
  render() {
    return (
      <BrowserRouter>
      <div>
            <div className = 'App'>
              <div className = 'MainMenu' display='block' style={menuStyle}>
                    <MenuItem name = 'Identifícate' icon = {faUser} link="/identificate"></MenuItem>
                    <MenuItem name='Mapa' icon={faMap} link="/mapas"></MenuItem>
                    <MenuItem name='Publicidad' icon={faVideo} link="/publicidad"></MenuItem>
                    <MenuItem name = 'Configuración' icon = {faCog} link="/configuracion"></MenuItem>
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
