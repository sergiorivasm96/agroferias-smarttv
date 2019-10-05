import * as gtv from '@arxis/gtvzone';
import React from 'react'
class Mapeo extends React.Component {
    globalKeyMappingController;
    constructor(props) {
        super(props);
        this.globalKeyMappingController = new gtv.jq.KeyController();
        this.globalKeyMappingController.start();
    }

    generalKeymapping = {
        13: function(selectedItem, newSelected) {
            if(selectedItem.hasClass('url-redirect')){
              window.location.href=(selectedItem.attr('href')||selectedItem.find('a').attr('href'));
            }
            //   selectedItem.trigger('click');//con esto disparamos una accion que está implementado un poco mas abajo en Click
              selectedItem.click();
            return {
              status: 'selected'//este debe estar siempre, solo varia cuando se quiere hacer cosas especiales que no se harán para este proyecto
            };
          },  
        40:
            function _(selectedItem, newSelected) {
            // down
            return {status: 'none'};
            },
        37:
            function _(selectedItem, newSelected) {
            // left
            return {status: 'none'};
            },
        38:
            function _(selectedItem, newSelected) {
            // up
            return {status: 'none'};
            },
        39:
            function _(selectedItem, newSelected) {
            // right
            return {status: 'none'};
            },
    };

    createNewKeyBehaviorZone(selector, keyMapping, actionMapping, navSelectors) {
        return new gtv.jq.KeyBehaviorZone({
            containerSelector: selector,
            navSelectors: (navSelectors && navSelectors.itemRow) || {
                itemRow: '.keyboard-row',
                itemParent: '.keyboard-parent',
                item: '.item-focusable',
                itemPage: null
            },
            selectionClasses: {basic: 'focused-item', hasData: 'focused-item'},
            saveRowPosition: false,
            keyMapping: keyMapping,
            actions: {
                click: function (el) {
                }
            },
            useGeometry: true
        });
    }

    createZone(var1) {
        const _zone = this.createNewKeyBehaviorZone(var1, this.generalKeymapping);
        this.globalKeyMappingController.addBehaviorZone(_zone, true, ['HOME_LAYER']);
    }
}

export default Mapeo;