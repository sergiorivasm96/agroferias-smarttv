import * as gtv from '@arxis/gtvzone';
// import React from 'react';

const layer = [];
class Mapeo {
  globalKeyMappingController;
  constructor(props) {
    // super(props);
    this.globalKeyMappingController = new gtv.jq.KeyController();
    this.globalKeyMappingController.start();
  }

  generalKeymapping = {
    13: function(selectedItem, newSelected) {
      selectedItem.click();
      return {
        status: 'selected' //este debe estar siempre, solo varia cuando se quiere hacer cosas especiales que no se harán para este proyecto
      };
    },
    40: function _(selectedItem, newSelected) {
      // down
      return { status: 'none' };
    },
    37: function _(selectedItem, newSelected) {
      // left
      return { status: 'none' };
    },
    38: function _(selectedItem, newSelected) {
      // up
      return { status: 'none' };
    },
    39: function _(selectedItem, newSelected) {
      // right
      return { status: 'none' };
    },
    8: function _(selectedItem, newSelected) {
      window.history.back();
    }
  };

  zone(name, _zone, selector, keyMapping, actionMapping, navSelectors) {
    try {
      for (const key in this.generalKeymapping) {
        if (!keyMapping[key]) {
          keyMapping[key] = this.generalKeymapping[key];
        }
      }
      if (this[_zone]) {
        this.globalKeyMappingController.removeBehaviorZone(this[_zone]);
      }
      this[_zone] = this.createNewKeyBehaviorZone(
        selector,
        keyMapping,
        actionMapping,
        navSelectors
      );
      // eslint-disable-next-line no-undef
      if (layer.indexOf(name) === -1) {
        // eslint-disable-next-line no-undef
        layer.push(name);
      }

      this.globalKeyMappingController.addBehaviorZone(
        this[_zone],
        true,
        // eslint-disable-next-line no-undef
        layer,
        true
      );
      return this;
    } catch (e) {
      console.log('ocurrio erro en mapeo',e);
      return null;
    }
  }

  removeZone(zoneName) {
    const l = this[zoneName];
    // eslint-disable-next-line no-unused-expressions
    l ? this.globalKeyMappingController.removeBehaviorZone(l) : null;
  }

  createNewKeyBehaviorZone(selector, keyMapping, actionMapping, navSelectors) {
    return new gtv.jq.KeyBehaviorZone({
      containerSelector: selector,
      navSelectors: (navSelectors && navSelectors.itemRow) || {
        itemRow: '.keyboard-row',
        itemParent: '.keyboard-parent',
        item: '.item-focusable',
        itemPage: null
      },
      selectionClasses: { basic: 'focused-item', hasData: 'focused-item' },
      saveRowPosition: false,
      keyMapping: keyMapping,
      actions: actionMapping || {},
      useGeometry: true
    });
  }

  createZone(selector) {
    this.zone('HOME_LAYER','homeZone', selector, {}, {});
  }
}

export default Mapeo;
