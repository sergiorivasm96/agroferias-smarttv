(window["webpackJsonpagroferias-smarttv"]=window["webpackJsonpagroferias-smarttv"]||[]).push([[0],{112:function(e,t,a){},113:function(e,t,a){},119:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(73),r=a.n(o),l=a(3),c=a(4),s=a(6),u=a(5),p=a(7),d=a(17),m=a(19),h=a(22),f=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(){}},{key:"render",value:function(){return i.a.createElement(h.b,{to:this.props.link,onClick:this.handleClick,className:"MenuItem item-focusable",style:g},i.a.createElement(m.a,{icon:this.props.icon,size:"2x"}),i.a.createElement("div",{style:b},this.props.name))}}]),t}(i.a.Component),b={fontSize:"25px",width:"230px",textTransform:"uppercase",paddingTop:"10px"},g={display:"inline-block",textAlign:"center",textDecorationLine:"none",color:"#7D1242"},v=f,y=a(25),x=a(76),E=(a(112),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{marginTop:"4%"}},i.a.createElement(x.Player,{src:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",fluid:!1,autoPlay:!0,width:"100%",height:"100%",className:"Player"}))}}]),t}(i.a.Component)),k=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e;return e=this.props.televisor?i.a.createElement(m.a,{icon:d.f,size:"2x"}):i.a.createElement(m.a,{icon:d.c,size:"2x"}),i.a.createElement("div",{id:"place"},e)}}]),t}(i.a.Component),j=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement(h.b,{to:"/mapas/buscador",className:"link-mapa-buscador"},i.a.createElement("button",{className:"item-focusable",style:{borderRadius:"100%",width:"50px",height:"50px",backgroundColor:"#ed217c",float:"right",marginRight:"30px",marginTop:"30px"}},i.a.createElement(m.a,{icon:d.d,size:"2x"})))}}]),t}(i.a.Component),O=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=JSON.parse(localStorage.getItem("localTelevisor"));return i.a.createElement("div",{className:"item-focusable",style:{left:e.posicion_X*this.props.anchoImagen,position:"absolute",top:e.posicion_Y*this.props.altoImagen},onClick:this.props.customClickEvent},i.a.createElement(m.a,{icon:d.e,size:"2x"}))}}]),t}(i.a.Component),S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={popUpVisible:!1,popUpTVVisible:!1,tiendaModal:{},imagen:null},a.anchoImagen=1e3,a.altoImagen=350,a.factor={x:.0125,y:30/382},a.televisor=null,a.idTiendaSeleccionada=null,a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=localStorage.getItem("idFeria"),t=localStorage.getItem("localTelevisor");null==e?(alert("Por favor, seleccione una feria en configuraci\xf3n."),window.location.pathname="/configuracion"):null==t&&(alert("Por favor, seleccione un televisor en configuraci\xf3n."),window.location.pathname="/configuracion")}},{key:"componentDidMount",value:function(){var e=this;this.idTiendaSeleccionada=localStorage.getItem("idFeria"),localStorage.getItem("idFeria")&&fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tiendas/feria/".concat(localStorage.getItem("idFeria"))).then((function(e){return e.json()})).then((function(t){e.setState({tiendas:t.filter((function(e){return 0===e.tipoTienda}))}),fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/".concat(localStorage.getItem("idFeria"),"/imagen")).then((function(e){return e.json()})).then((function(t){console.log("Imagen es "),console.log(t.urlImagen),e.setState({imagen:t.urlImagen})})).catch(console.log)})).catch(console.log)}},{key:"handlerClick",value:function(e){var t=this;this.setState({tiendaModal:e,popUpVisible:!0}),setTimeout((function(){t.setState({popUpVisible:!1})}),3e3)}},{key:"handlerClickTV",value:function(){var e=this;this.setState({texto:"Usted se encuentra aqu\xed",popUpTVVisible:!0},(function(){setTimeout((function(){e.setState({popUpTVVisible:!1})}),3e3)}))}},{key:"render",value:function(){var e=this;return null==this.state.tiendas?null:(console.log("Feria = "+this.idTiendaSeleccionada),console.log(this.state.tiendas),i.a.createElement("div",null,i.a.createElement(j,null),i.a.createElement("div",{id:"divGrande",style:{backgroundImage:"url("+this.state.imagen+")",width:"1000px",height:"350px",backgroundSize:"100% 100%",position:"relative",marginLeft:"4%",marginTop:"5%"}},this.state.tiendas.map((function(t,a){return i.a.createElement("div",{className:"item-focusable",style:{left:(t.posicion_x-e.factor.x)*e.anchoImagen,position:"absolute",top:(t.posicion_y-e.factor.y)*e.altoImagen},onClick:function(){return e.handlerClick(t)},key:"tienda-"+t.idTienda},i.a.createElement(k,null))})),i.a.createElement(O,{anchoImagen:this.anchoImagen,altoImagen:this.altoImagen,customClickEvent:this.handlerClickTV.bind(this)})),i.a.createElement("div",{className:"modal-mapa",style:{position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",width:"35%",height:"30%",zIndex:10,backgroundColor:"#e6428b",padding:"20px",fontSize:"18px",lineHeight:"25px",borderRadius:"20px",boxShadow:"0px 0px 6px #ccc",color:"#fff"},"data-attribute":this.state.popUpVisible?"":"hidden",hidden:this.state.popUpVisible?"":"hidden"},i.a.createElement("p",{style:{fontWeight:"bold"}},null==this.state.tiendaModal.empresa?"":this.state.tiendaModal.empresa.nombreComercial),i.a.createElement("p",null,this.state.tiendaModal.descripcion)),i.a.createElement("div",{className:"modal-tv",style:{position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",width:"35%",height:"20%",zIndex:10,backgroundColor:"#e6428b",padding:"20px",fontSize:"18px",borderRadius:"20px",boxShadow:"0px 0px 6px #ccc",color:"#fff"},"data-attribute":this.state.popUpTVVisible?"":"hidden",hidden:this.state.popUpTVVisible?"":"hidden"},i.a.createElement("p",{style:{fontWeight:"bold",fontSize:"50px",marginTop:"auto"}},this.state.texto))))}}]),t}(i.a.Component),I=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,"Identificate")}}]),t}(i.a.Component),w=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,"Publicidad")}}]),t}(i.a.Component),T=a(26),C=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"cambioFeria",value:function(e){this.props.cambioFeria(e)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{style:V},this.props.ferias.map((function(t){return i.a.createElement("div",{className:"item-focusable feria item",key:"feria-"+t.idFeria,onClick:function(){return e.cambioFeria(t)},tabIndex:"0",style:F},i.a.createElement("div",null,i.a.createElement("img",{src:t.logo,style:{width:"150px",height:"150px"},alt:""})),i.a.createElement("div",{className:"feria-text",style:{fontWeight:"bold"}},t.nombre))})))}}]),t}(i.a.Component),V={display:"flex",marginTop:"5%",marginRight:"10%",whiteSpace:"nowrap",overflow:"auto",flexBasis:"25%",flexGrow:"1"},F={textAlign:"center",width:"100% !important",height:"100% !important",marginRight:"10%"},z=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={ferias:[]},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/ferias").then((function(e){return e.json()})).then((function(t){e.setState({ferias:t})})).catch(console.log)}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"menu-wrapper"},i.a.createElement("div",{className:"menu .keyboard-row",style:{overflow:"hidden"}},i.a.createElement(C,{ferias:this.state.ferias,cambioFeria:this.props.cambioFeria}))))}}]),t}(i.a.Component),N=(a(113),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e)))._isMounted=!1,a.state={idFeriaActual:localStorage.getItem("idFeria"),textoFeriaActual:"",popUpVisible:!1,nombreFeriaActual:localStorage.getItem("nombreFeria"),feriaSeleccionada:!1},a.cambioFeria=a.cambioFeria.bind(Object(T.a)(a)),a.seleccionarTelevisorSinFeria=a.seleccionarTelevisorSinFeria.bind(Object(T.a)(a)),a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"cambioFeria",value:function(e){var t=this,a="Ha seleccionado la feria "+e.nombre;localStorage.setItem("idFeria",e.idFeria),localStorage.setItem("nombreFeria",e.nombre),localStorage.removeItem("localTelevisor"),this.setState({idFeriaActual:e.idFeria,texto:a,popUpVisible:!0,feriaSeleccionada:!0,nombreFeriaActual:e.nombre},(function(){setTimeout((function(){t.setState({popUpVisible:!1})}),3e3)}))}},{key:"seleccionarTelevisorSinFeria",value:function(){var e=this;this.setState({texto:"Debe seleccionar una feria primero",popUpVisible:!0},(function(){setTimeout((function(){e.setState({popUpVisible:!1})}),3e3)}))}},{key:"render",value:function(){var e,t;return localStorage.getItem("idFeria")?(e=i.a.createElement(h.b,{to:{pathname:"/configuracion/".concat(this.state.idFeriaActual)}},i.a.createElement("button",{style:U,className:"item-focusable btn-elegir-tv"},"  ",i.a.createElement(m.a,{icon:d.f,size:"6x"}),"  ")),t="Feria seleccionada: "+this.state.nombreFeriaActual):(e=i.a.createElement("button",{style:U,className:"item-focusable",onClick:this.seleccionarTelevisorSinFeria},"  ",i.a.createElement(m.a,{icon:d.f,size:"6x"}),"  "),t="Seleccione una feria: "),i.a.createElement("div",{style:{paddingLeft:"90px"}},i.a.createElement("div",{style:{fontSize:"40px",paddingTop:"2%"}},t),i.a.createElement(z,{cambioFeria:this.cambioFeria}),i.a.createElement("div",{style:{fontSize:"40px",paddingTop:"5%"}},"Posici\xf3n del televisor en el mapa"),e,i.a.createElement("div",{className:"modal-mapa",style:{position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",width:"35%",height:"35%",zIndex:10,backgroundColor:"#e6428b",padding:"20px",fontSize:"18px",borderRadius:"20px",boxShadow:"0px 0px 6px #ccc",color:"#fff"},"data-attribute":this.state.popUpVisible?"":"hidden",hidden:this.state.popUpVisible?"":"hidden"},i.a.createElement("p",{style:{fontWeight:"bold",fontSize:"50px",marginTop:"20px"}},this.state.texto)))}}]),t}(i.a.Component)),U={textAlign:"center",borderRadius:10,width:120,height:120,color:"white",fondWeight:"bold",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"40%",marginTop:"2%"},M=N,P=a(78),D=a.n(P),R=(a(72),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=Array.from(this.props.resultado);return i.a.createElement("div",{className:"resultado-container",style:B},e.map((function(e){return i.a.createElement(h.b,{to:{pathname:"/mapas/buscador/".concat(e.idTienda)},style:{textDecoration:"none",color:"inherit"},key:"key-"+e.idProducto,onClick:localStorage.setItem("resultadoBusqueda",JSON.stringify(e))},i.a.createElement("div",{className:"item-focusable resultado item",key:"resultado-"+e.idProducto,tabIndex:"0",style:A},i.a.createElement("div",{className:"resultado-body"+e.idProducto}),i.a.createElement("div",null,e.nombre)))})))}}]),t}(i.a.Component)),B={marginRight:"10%",whiteSpace:"nowrap",overflow:"auto",flexBasis:"25%",flexGrow:"1",height:"350px"},A={width:"100%",height:"40px",marginRight:"10%",verticalAllign:"middle",paddingTop:"3%",fontSize:"30px"},K=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("div",{className:"lista-resultados",style:{overflow:"hidden",marginLeft:"42%",width:"100%"}},i.a.createElement(R,{resultado:this.props.resultado}))))}}]),t}(i.a.Component),L=(a(114),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e){a.setState({input:e})},a.onKeyPress=function(e){a.setState({seHaBuscadoAlgo:!0}),"{enter}"===e&&a.buscar()},a.buscar=function(){a.setState({pressedButton:!0});var e=document.getElementsByTagName("input")[0].value,t=Object(T.a)(a);fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/producto/obtenerProductos/".concat(localStorage.getItem("idFeria")),{method:"POST",headers:{"content-type":"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return t.setState({resultado:!1,data:[]}),console.log(e),[]})).then((function(e){return t.setState({data:e}),e})).catch((function(e){return t.setState({resultado:!1,data:[]}),console.log(e),[]}))},a.onChangeInput=function(e){var t=e.target.value;a.setState({input:t},(function(){a.keyboard.setInput(t)}))},a.state={layoutName:"default",input:"",data:"",resultado:"true",pressedButton:"false"},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t=this;return""===this.state.input&&(e=i.a.createElement("div",{style:{marginLeft:"43%",width:"100%"}},"Ingrese su producto y luego presione la lupa para buscar")),!0===this.state.pressedButton?(0===this.state.data.length?(console.log("vacio"),e=i.a.createElement("div",{style:{marginLeft:"43%",width:"100%"}},"No hay resultados para su b\xfasqueda")):(console.log(this.state.data),e=i.a.createElement(K,{resultado:this.state.data})),""===this.state.input&&this.setState({pressedButton:!1})):e=i.a.createElement("div",{style:{marginLeft:"43%",width:"100%"}},"Ingrese su producto y luego presione la lupa para buscar"),i.a.createElement("div",{style:{display:"flex"}},i.a.createElement(D.a,{keyboardRef:function(e){return t.keyboard=e},onChange:function(e){return t.onChange(e)},onKeyPress:function(e){return t.onKeyPress(e)},theme:"hg-theme-default hg-layout-default myTheme",layoutName:this.state.layoutName,useMouseEvents:!0,onClick:function(e){return t.onChange(e)},layout:{default:["q w e r t y u i o p","a s d f g h j k l","z x c v b n m","{bksp} {space} {enter}"]},buttonTheme:[{class:"item-focusable",buttons:"q w e r t y u i o p a s d f g h j k l z x c v b n m {space} {bksp} {enter}"}],display:{"{bksp}":"\u232b","{enter}":"\ud83d\udd0e"}}),i.a.createElement("div",null,i.a.createElement("input",{value:this.state.input,placeholder:"Escribe un producto para buscar",onChange:function(e){return t.onChangeInput(e)}}),e))}}]),t}(i.a.Component)),_=a(43),W=[],Z=function(){function e(t){Object(l.a)(this,e),this.generalKeymapping={13:function(e,t){return e.click(),{status:"selected"}},40:function(e,t){return{status:"none"}},37:function(e,t){return{status:"none"}},38:function(e,t){return{status:"none"}},39:function(e,t){return{status:"none"}}},this.globalKeyMappingController=new _.jq.KeyController,this.globalKeyMappingController.start()}return Object(c.a)(e,[{key:"zone",value:function(e,t,a,n,i,o){try{for(var r in this.generalKeymapping)n[r]||(n[r]=this.generalKeymapping[r]);return this[t]&&this.globalKeyMappingController.removeBehaviorZone(this[t]),this[t]=this.createNewKeyBehaviorZone(a,n,i,o),-1===W.indexOf(e)&&W.push(e),this.globalKeyMappingController.addBehaviorZone(this[t],!0,W,!0),this}catch(l){return console.log("ocurrio erro en mapeo",l),null}}},{key:"removeZone",value:function(e){var t=this[e];t&&this.globalKeyMappingController.removeBehaviorZone(t)}},{key:"createNewKeyBehaviorZone",value:function(e,t,a,n){return new _.jq.KeyBehaviorZone({containerSelector:e,navSelectors:n&&n.itemRow||{itemRow:".keyboard-row",itemParent:".keyboard-parent",item:".item-focusable",itemPage:null},selectionClasses:{basic:"focused-item",hasData:"focused-item"},saveRowPosition:!1,keyMapping:t,actions:a||{},useGeometry:!0})}},{key:"createZone",value:function(e){this.zone("HOME_LAYER","homeZone",e,{},{})}}]),e}(),q=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={popUpVisible:!1,popUpTVVisible:!1,tienda:"",imagen:""},a.anchoImagen=1e3,a.altoImagen=350,a.factor={x:.0125,y:30/382},a.televisor=null,a.idTiendaProducto=null,a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/tienda/perfil/".concat(this.props.idTienda)).then((function(e){return e.json()})).then((function(t){e.setState({tienda:t}),console.log(t),fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/".concat(localStorage.getItem("idFeria"),"/imagen")).then((function(e){return e.json()})).then((function(t){console.log("Imagen es "),console.log(t.urlImagen),e.setState({imagen:t.urlImagen})})).catch(console.log)})).catch(console.log)}},{key:"handlerClick",value:function(e){var t=this;this.setState({tiendaModal:e,popUpVisible:!0}),setTimeout((function(){t.setState({popUpVisible:!1})}),3e3)}},{key:"handlerClickTV",value:function(){var e=this;this.setState({texto:"Usted se encuentra aqu\xed",popUpTVVisible:!0},(function(){setTimeout((function(){e.setState({popUpTVVisible:!1})}),3e3)}))}},{key:"render",value:function(){var e=this,t=JSON.parse(localStorage.getItem("resultadoBusqueda"));return i.a.createElement("div",null,i.a.createElement("h1",{style:{paddingLeft:"90px"}},"En las siguientes tiendas puede encontrar el producto: ",t.nombre),i.a.createElement("div",{id:"divGrande",style:{backgroundImage:"url("+this.state.imagen+")",width:"1000px",height:"350px",backgroundSize:"100% 100%",position:"relative",marginLeft:"4%",marginTop:"5%"}},i.a.createElement("div",{className:"item-focusable",style:{left:(this.state.tienda.posicion_x-this.factor.x)*this.anchoImagen,position:"absolute",top:(this.state.tienda.posicion_y-this.factor.y)*this.altoImagen},onClick:function(){return e.handlerClick(e.state.tienda)}},i.a.createElement(k,null)),i.a.createElement(O,{anchoImagen:this.anchoImagen,altoImagen:this.altoImagen,customClickEvent:this.handlerClickTV.bind(this)})),i.a.createElement("div",{className:"modal-mapa",style:{position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",width:"35%",height:"30%",zIndex:10,backgroundColor:"#e6428b",padding:"20px",fontSize:"18px",lineHeight:"25px",borderRadius:"20px",boxShadow:"0px 0px 6px #ccc",color:"#fff"},"data-attribute":this.state.popUpVisible?"":"hidden",hidden:this.state.popUpVisible?"":"hidden"},i.a.createElement("p",{style:{fontWeight:"bold"}},null==this.state.tienda.empresa?"":this.state.tienda.empresa.nombreComercial),i.a.createElement("p",null,this.state.tienda.descripcion)),i.a.createElement("div",{className:"modal-tv",style:{position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",width:"35%",height:"20%",zIndex:10,backgroundColor:"#e6428b",padding:"20px",fontSize:"18px",borderRadius:"20px",boxShadow:"0px 0px 6px #ccc",color:"#fff"},"data-attribute":this.state.popUpTVVisible?"":"hidden",hidden:this.state.popUpTVVisible?"":"hidden"},"  ",i.a.createElement("p",{style:{fontWeight:"bold",fontSize:"50px",marginTop:"auto"}},this.state.texto)))}}]),t}(i.a.Component),J=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={televisores:[],popUpVisible:!1,televisorModal:{},imagen:""},a.anchoImagen=1e3,a.altoImagen=350,a.factor={x:.0125,y:30/382},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){null==localStorage.getItem("idFeria")&&(alert("Por favor, seleccione una feria en configuraci\xf3n."),window.location.pathname="/configuracion")}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("idFeria");fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/".concat(t,"/televisor")).then((function(e){return e.json()})).then((function(t){console.log(t.filter((function(e){return 1===e.habilitado}))),e.setState({televisores:t.filter((function(e){return 1===e.habilitado}))}),console.log(e.state.televisores),fetch("https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/mapa/".concat(localStorage.getItem("idFeria"),"/imagen")).then((function(e){return e.json()})).then((function(t){console.log("Imagen es "),console.log(t.urlImagen),e.setState({imagen:t.urlImagen})})).catch(console.log)})).catch(console.log)}},{key:"handlerClick",value:function(e){var t=this;this.setState({televisorModal:e,popUpVisible:!0}),localStorage.setItem("localTelevisor",JSON.stringify(e)),setTimeout((function(){t.setState({popUpVisible:!1})}),3e3)}},{key:"render",value:function(){var e,t=this,a=JSON.parse(localStorage.getItem("localTelevisor"));return e=a?i.a.createElement("h1",{style:{paddingLeft:"90px"}}," Se ha seleccionado el SmarTV con c\xf3digo: ",a.idTelevisor," "):i.a.createElement("h1",{style:{paddingLeft:"90px"}}," Seleccione el televisor que est\xe1 usando: "),i.a.createElement("div",null,e,i.a.createElement("div",{id:"divGrande",style:{backgroundImage:"url("+this.state.imagen+")",width:"1000px",height:"350px",backgroundSize:"100% 100%",position:"relative",marginLeft:"4%",marginTop:"5%"}},this.state.televisores.map((function(e){return i.a.createElement("div",{key:"tv-".concat(e.idTelevisor)},i.a.createElement("div",{style:{fontSize:"40px",left:(e.posicion_X-t.factor.x)*t.anchoImagen+10,position:"absolute",top:(e.posicion_Y-t.factor.y)*t.altoImagen-60,borderRadius:"50%",width:"50px",height:"50px",border:"3px solid black",textAlign:"center"}},e.idTelevisor),i.a.createElement("div",{className:"item-focusable",style:{left:(e.posicion_X-t.factor.x)*t.anchoImagen,position:"absolute",top:(e.posicion_Y-t.factor.y)*t.altoImagen},onClick:function(){return t.handlerClick(e)},key:"televisor-"+e.idTelevisor},i.a.createElement(k,{televisor:!0})))}))),i.a.createElement("div",{className:"modal-mapa",style:{position:"absolute",left:0,right:0,top:0,bottom:0,margin:"auto",width:"35%",height:"30%",zIndex:10,backgroundColor:"#e6428b",padding:"20px",fontSize:"40px",borderRadius:"20px",boxShadow:"0px 0px 6px #ccc",color:"#fff"},"data-attribute":this.state.popUpVisible?"":"hidden",hidden:this.state.popUpVisible?"":"hidden"},i.a.createElement("p",null," Usted eligi\xf3 el televisor ",this.state.televisorModal.idTelevisor)))}}]),t}(i.a.Component),G={background:"#ed217c",paddingLeft:"12%",paddingTop:"15px",paddingBottom:"15px"},H=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).mapeo=new Z,a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.mapeo.createZone(".main-menu")}},{key:"componentWillUnmount",value:function(){this.mapeo.removeZone(".main-menu")}},{key:"render",value:function(){return i.a.createElement(h.a,null,i.a.createElement("div",{className:"main-menu"},i.a.createElement("div",{className:"App"},i.a.createElement("div",{display:"block",style:G,className:"keyboard-row menu-rosado"},i.a.createElement(v,{name:"Identif\xedcate",icon:d.g,link:"/identificate"}),i.a.createElement(v,{name:"Mapa",icon:d.b,link:"/mapas"}),i.a.createElement(v,{name:"Publicidad",icon:d.h,link:"/publicidad"}),i.a.createElement(v,{name:"Configuraci\xf3n",icon:d.a,link:"/configuracion"}))),i.a.createElement(y.c,null,i.a.createElement(y.a,{exact:!0,path:"/identificate"},i.a.createElement(I,null)),i.a.createElement(y.a,{exact:!0,path:"/mapas"},i.a.createElement(S,null)),i.a.createElement(y.a,{exact:!0,path:"/publicidad"},i.a.createElement(w,null)),i.a.createElement(y.a,{exact:!0,path:"/configuracion"},i.a.createElement(M,null)),i.a.createElement(y.a,{exact:!0,path:"/"},i.a.createElement(E,null)),i.a.createElement(y.a,{exact:!0,path:"/mapas/buscador"},i.a.createElement(L,null)),i.a.createElement(y.a,{exact:!0,path:"/mapas/buscador/:idTienda",render:function(e){var t=e.match;return i.a.createElement(q,{idTienda:t.params.idTienda})}}),i.a.createElement(y.a,{exact:!0,path:"/configuracion/:idFeria",render:function(e){var t=e.match;return i.a.createElement(J,{idFeria:t.params.idFeria})}}))))}}]),t}(i.a.Component);r.a.render(i.a.createElement(H,null),document.getElementById("root"))},72:function(e,t,a){},79:function(e,t,a){e.exports=a(119)}},[[79,1,2]]]);
//# sourceMappingURL=main.7e3cf0d9.chunk.js.map