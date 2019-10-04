import React from 'react'
import * as gtv from "@arxis/gtvzone";

class Mapeo extends React.Component{
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
    //   selectedItem.trigger('click');
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

}

export default Mapeo;