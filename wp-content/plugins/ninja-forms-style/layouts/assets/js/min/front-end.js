!function(){var e,t,i;!function(n){function o(e,t){return M.call(e,t)}function l(e,t){var i,n,o,l,r,s,c,f,d,a,u,h=t&&t.split("/"),m=v.map,p=m&&m["*"]||{};if(e&&"."===e.charAt(0))if(t){for(e=e.split("/"),r=e.length-1,v.nodeIdCompat&&b.test(e[r])&&(e[r]=e[r].replace(b,"")),e=h.slice(0,h.length-1).concat(e),d=0;d<e.length;d+=1)if(u=e[d],"."===u)e.splice(d,1),d-=1;else if(".."===u){if(1===d&&(".."===e[2]||".."===e[0]))break;d>0&&(e.splice(d-1,2),d-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((h||p)&&m){for(i=e.split("/"),d=i.length;d>0;d-=1){if(n=i.slice(0,d).join("/"),h)for(a=h.length;a>0;a-=1)if(o=m[h.slice(0,a).join("/")],o&&(o=o[n])){l=o,s=d;break}if(l)break;!c&&p&&p[n]&&(c=p[n],f=d)}!l&&c&&(l=c,s=f),l&&(i.splice(0,s,l),e=i.join("/"))}return e}function r(e,t){return function(){var i=y.call(arguments,0);return"string"!=typeof i[0]&&1===i.length&&i.push(null),h.apply(n,i.concat([e,t]))}}function s(e){return function(t){return l(t,e)}}function c(e){return function(t){g[e]=t}}function f(e){if(o(w,e)){var t=w[e];delete w[e],C[e]=!0,u.apply(n,t)}if(!o(g,e)&&!o(C,e))throw new Error("No "+e);return g[e]}function d(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function a(e){return function(){return v&&v.config&&v.config[e]||{}}}var u,h,m,p,g={},w={},v={},C={},M=Object.prototype.hasOwnProperty,y=[].slice,b=/\.js$/;m=function(e,t){var i,n=d(e),o=n[0];return e=n[1],o&&(o=l(o,t),i=f(o)),o?e=i&&i.normalize?i.normalize(e,s(t)):l(e,t):(e=l(e,t),n=d(e),o=n[0],e=n[1],o&&(i=f(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:i}},p={require:function(e){return r(e)},exports:function(e){var t=g[e];return"undefined"!=typeof t?t:g[e]={}},module:function(e){return{id:e,uri:"",exports:g[e],config:a(e)}}},u=function(e,t,i,l){var s,d,a,u,h,v,M=[],y=typeof i;if(l=l||e,"undefined"===y||"function"===y){for(t=!t.length&&i.length?["require","exports","module"]:t,h=0;h<t.length;h+=1)if(u=m(t[h],l),d=u.f,"require"===d)M[h]=p.require(e);else if("exports"===d)M[h]=p.exports(e),v=!0;else if("module"===d)s=M[h]=p.module(e);else if(o(g,d)||o(w,d)||o(C,d))M[h]=f(d);else{if(!u.p)throw new Error(e+" missing "+d);u.p.load(u.n,r(l,!0),c(d),{}),M[h]=g[d]}a=i?i.apply(g[e],M):void 0,e&&(s&&s.exports!==n&&s.exports!==g[e]?g[e]=s.exports:a===n&&v||(g[e]=a))}else e&&(g[e]=i)},e=t=h=function(e,t,i,o,l){if("string"==typeof e)return p[e]?p[e](t):f(m(e,t).f);if(!e.splice){if(v=e,v.deps&&h(v.deps,v.callback),!t)return;t.splice?(e=t,t=i,i=null):e=n}return t=t||function(){},"function"==typeof i&&(i=o,o=l),o?u(n,e,t,i):setTimeout(function(){u(n,e,t,i)},4),h},h.config=function(e){return h(e)},e._defined=g,i=function(e,t,i){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(i=t,t=[]),o(g,e)||o(w,e)||(w[e]=[e,t,i])},i.amd={jQuery:!0}}(),i("../lib/almond",function(){}),i("views/cellComposite",[],function(){var e=Marionette.CompositeView.extend({template:"#nf-tmpl-cell",className:"nf-cell",getChildView:function(){return n.channel("views").request("get:fieldLayout")},initialize:function(){this.collection=this.model.get("fields"),jQuery(this.el).css("width",this.model.get("width")+"%")},onRender:function(){0==this.collection.length&&jQuery(this.el).html("&nbsp;")},attachHtml:function(e,t){jQuery(e.el).find("nf-fields").append(t.el)}});return e}),i("views/rowComposite",["views/cellComposite"],function(e){var t=Marionette.CompositeView.extend({template:"#nf-tmpl-row",childView:e,className:"nf-row",initialize:function(){this.collection=this.model.get("cells")},onAttach:function(){1<this.collection.length&&jQuery(this.el).closest(".nf-form-wrap").addClass("nf-multi-cell")},attachHtml:function(e,t){jQuery(e.el).find("nf-cells").append(t.el)}});return t}),i("views/rowCollection",["views/rowComposite"],function(e){var t=Marionette.CollectionView.extend({tagName:"nf-rows-wrap",childView:e});return t}),i("models/cellFieldCollection",[],function(){var e=Backbone.Collection.extend({comparator:"order",initialize:function(e,t){this.cellModel=t.cellModel,_.each(e,function(e){e.set("cellcid",this.cellModel.cid,{silent:!0})},this),this.listenTo(this.cellModel.collection.rowModel.collection,"validate:fields",this.validateFields),this.listenTo(this.cellModel.collection.rowModel.collection,"show:fields",this.showFields),this.listenTo(this.cellModel.collection.rowModel.collection,"hide:fields",this.hideFields);var i=this.cellModel.collection.formModel.get("fields");i.on("reset",this.resetCollection,this)},validateFields:function(){_.each(this.models,function(e){n.channel("submit").trigger("validate:field",e)},this)},showFields:function(){this.invoke("set",{visible:!0})},hideFields:function(){this.invoke("set",{visible:!1})},resetCollection:function(e){var t=[];_.each(this.models,function(i){"submit"!=i.get("type")?t.push(e.findWhere({key:i.get("key")})):t.push(i)}),this.reset(t)}});return e}),i("models/cellModel",["models/cellFieldCollection"],function(e){var t=Backbone.Model.extend({initialize:function(){var t=this.collection.formModel.get("fields"),i=[];_.each(this.get("fields"),function(e){if("undefined"==typeof t.get(e)){var n=t.findWhere({key:e});"undefined"!=typeof n&&i.push(n)}else i.push(t.get(e))}),this.set("fields",new e(i,{cellModel:this})),this.listenTo(this.get("fields"),"change:errors",this.triggerErrors)},triggerErrors:function(e){this.collection.trigger("change:errors",e)}});return t}),i("models/cellCollection",["models/cellModel"],function(e){var t=Backbone.Collection.extend({model:e,comparator:"order",initialize:function(e,t){this.rowModel=t.rowModel,this.formModel=t.formModel}});return t}),i("models/rowModel",["models/cellCollection"],function(e){var t=Backbone.Model.extend({initialize:function(){this.set("cells",new e(this.get("cells"),{rowModel:this,formModel:this.collection.formModel})),this.listenTo(this.get("cells"),"change:errors",this.triggerErrors)},triggerErrors:function(e){this.collection.trigger("change:errors",e)}});return t}),i("models/rowCollection",["models/rowModel"],function(e){var t=Backbone.Collection.extend({model:e,comparator:"order",initialize:function(e,t){this.formModel=t.formModel},validateFields:function(){this.trigger("validate:fields",this)},showFields:function(){this.trigger("show:fields",this)},hideFields:function(){this.trigger("hide:fields",this)}});return t}),i("controllers/formContentFilters",["views/rowCollection","models/rowCollection"],function(e,t){var i=Marionette.Object.extend({initialize:function(){n.channel("formContent").request("add:viewFilter",this.getFormContentView,4),n.channel("formContent").request("add:loadFilter",this.formContentLoad,4),n.channel("fieldContents").request("add:viewFilter",this.getFormContentView,4),n.channel("fieldContents").request("add:loadFilter",this.formContentLoad,4)},getFormContentView:function(t){return e},formContentLoad:function(e,i,o,l){if(!0==e instanceof t)return e;var r=n.channel("formContent").request("get:loadFilters"),s="undefined"!=typeof r[1]?!0:!1;!s&&_.isArray(e)&&0!=_.isArray(e).length&&"undefined"!=typeof _.first(e)&&"part"==_.first(e).type&&(e=_.flatten(_.pluck(e,"formContentData"))),o=o||!1,l=l||!1;var c=[];return _.isArray(e)&&0!=e.length&&"undefined"==typeof e[0].cells?_.each(e,function(e,t){c.push({order:t,cells:[{order:0,fields:[e],width:"100"}]})}):c=_.isEmpty(c)&&"undefined"!=typeof nfLayouts&&!s?nfLayouts.rows:e,new t(c,{formModel:i})}});return i}),i("controllers/loadControllers",["controllers/formContentFilters"],function(e){var t=Marionette.Object.extend({initialize:function(){new e}});return t});var n=Backbone.Radio;t(["controllers/loadControllers"],function(e){var t=Marionette.Application.extend({initialize:function(e){this.listenTo(n.channel("form"),"before:filterData",this.loadControllers)},loadControllers:function(t){new e}}),i=new t;i.start()}),i("main",function(){})}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=front-end.js.map
