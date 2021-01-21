!function(t){var e={};function n(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports=function(t,e,n,a,i,s){var r,o=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(r=t,o=t.default);var c,u="function"==typeof o?o.options:o;if(e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId=i),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=c):a&&(c=a),c){var d=u.functional,f=d?u.render:u.beforeCreate;d?(u._injectStyles=c,u.render=function(t,e){return c.call(e),f(t,e)}):u.beforeCreate=f?[].concat(f,c):[c]}return{esModule:r,exports:o,options:u}}},function(t,e,n){n(2),t.exports=n(20)},function(t,e,n){Nova.booting(function(t,e,a){e.addRoutes([{name:"nova-translation-manager",path:"/translation-manager",component:n(3)}]),t.config.devtools=!0})},function(t,e,n){var a=n(0)(n(4),n(19),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(5),i=n.n(a),s=n(16),r=n.n(s),o=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],a=!0,i=!1,s=void 0;try{for(var r,o=t[Symbol.iterator]();!(a=(r=o.next()).done)&&(n.push(r.value),!e||n.length!==e);a=!0);}catch(t){i=!0,s=t}finally{try{!a&&o.return&&o.return()}finally{if(i)throw s}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function l(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}e.default={components:{"editable-input":i.a,"checkbox-input":r.a},props:{resourceName:{type:String,default:"translation"},singularName:{type:String,default:"translation"}},data:function(){return{initialLoading:!0,translations:null,search:null,groups:[],locales:[],field:null,value:null,config:[],selected:{locales:[],groups:[]},onlyMissing:!1}},computed:{filteredTranslations:function(){var t=this;return this.translations&&this.translations.filter(function(e){var n=e.translations,a=e.updated;return!t.onlyMissing||a||Object.keys(n).length<t.locales.length}).filter(function(e){var n=e.translations;return!t.selected.locales.lentgh||!!t.selected.locales.find(function(t){return!n[t]})}).filter(function(e){var n=e.group;return!t.selected.groups.length||t.selected.groups.includes(t.normalizeGroup(n))}).filter(this.filterGroup).filter(function(e){if(e){var n=e.key,a=e.translations;if(t.search){var i=t.selected.locales.length?t.selected.locales:t.locales.map(function(t){return t.locale});return n.toLowerCase().includes(t.search.toLowerCase())||i.find(function(e){return a[e]&&a[e].toLowerCase&&a[e].toLowerCase().includes(t.search.toLowerCase())})}return!0}})},onlyMissingTranslations:function(){return this.translations.filter(function(t){var e=t.translations;return Object.keys(e).length<3})}},created:function(){this.getTranslations()},methods:{toggleGroups:function(t){this.toggle("groups",t)},toggleLocales:function(t){this.toggle("locales",t)},toggle:function(t,e){"string"!=typeof e?this.selected[t].length===this[t].length?this.selected[t]=[]:this.selected[t]=this[t].map(function(t){return t.locale?t.locale:t}).sort():this.selected[t].includes(e)?this.selected[t]=this.selected[t].filter(function(t){return t!==e}):this.selected[t]=[].concat(l(this.selected[t]),[e]).sort()},normalizeGroup:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").split("/")[0]},filterGroup:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.group?"single"!==this.normalizeGroup(t.group):"single"!==this.normalizeGroup(t)},getTranslations:function(){var t=this;Nova.request().get("/nova-vendor/translation-manager/translations/",{params:{group:this.group,search:this.search}}).then(function(e){var n=e.data,a=n.groups,i=n.languages,s=n.config,r=n.translations;t.groups=a.map(t.normalizeGroup).filter(t.filterGroup).reduce(function(t,e){return t.includes(e)?t:[].concat(l(t),[e])},[]),t.locales=i,t.config=s,t.translations=r&&r.data}).then(!this.selected.locales.length&&this.toggleLocales).then(!this.selected.groups.length&&this.toggleGroups).then(function(){t.initialLoading=!1})},updateTranslations:function(t){var e=this.field.split("_"),n=o(e,2),a=n[0],i=n[1];this.$set(this.translations.find(function(t){return t.id===a}).translations,i,t.value),this.$set(this.translations.find(function(t){return t.id===a}),"updated",i),this.cancel()},submit:function(t){var e=this;t&&t.value?Nova.request().put("/nova-vendor/translation-manager/translations/",t).then(function(){return e.updateTranslations(t)}).catch(function(){e.$toasted.show("Something went wrong!",{type:"error"})}):(this.field=null,this.$toasted.show("A translation string is required",{type:"error"}))},cancel:function(){this.field=null}}}},function(t,e,n){var a=n(0)(n(11),n(15),!1,function(t){n(6)},"data-v-142a1470",null);t.exports=a.exports},function(t,e,n){var a=n(7);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(9)("5a255698",a,!0,{})},function(t,e,n){(t.exports=n(8)(!1)).push([t.i,"@-webkit-keyframes update-data-v-142a1470{0%{background-color:#fff}25%{background-color:#afa}to{background-color:#fff}}@keyframes update-data-v-142a1470{0%{background-color:#fff}25%{background-color:#afa}to{background-color:#fff}}.editable-input[data-v-142a1470]{background-color:#fff}.value>svg[data-v-142a1470]{opacity:0;-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.5s;transition-duration:.5s}.value:hover>svg[data-v-142a1470]{opacity:1}.updated[data-v-142a1470]{-webkit-animation-name:update-data-v-142a1470;animation-name:update-data-v-142a1470;-webkit-animation-duration:2s;animation-duration:2s}",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",a=t[3];if(!a)return n;if(e&&"function"==typeof btoa){var i=(r=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),s=a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"});return[n].concat(s).concat([i]).join("\n")}var r;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},i=0;i<this.length;i++){var s=this[i][0];"number"==typeof s&&(a[s]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&a[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(t,e,n){var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=n(10),s={},r=a&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,c=!1,u=function(){},d=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(t){for(var e=0;e<t.length;e++){var n=t[e],a=s[n.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](n.parts[i]);for(;i<n.parts.length;i++)a.parts.push(v(n.parts[i]));a.parts.length>n.parts.length&&(a.parts.length=n.parts.length)}else{var r=[];for(i=0;i<n.parts.length;i++)r.push(v(n.parts[i]));s[n.id]={id:n.id,refs:1,parts:r}}}}function g(){var t=document.createElement("style");return t.type="text/css",r.appendChild(t),t}function v(t){var e,n,a=document.querySelector("style["+f+'~="'+t.id+'"]');if(a){if(c)return u;a.parentNode.removeChild(a)}if(p){var i=l++;a=o||(o=g()),e=_.bind(null,a,i,!1),n=_.bind(null,a,i,!0)}else a=g(),e=function(t,e){var n=e.css,a=e.media,i=e.sourceMap;a&&t.setAttribute("media",a);d.ssrId&&t.setAttribute(f,e.id);i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,a),n=function(){a.parentNode.removeChild(a)};return e(t),function(a){if(a){if(a.css===t.css&&a.media===t.media&&a.sourceMap===t.sourceMap)return;e(t=a)}else n()}}t.exports=function(t,e,n,a){c=n,d=a||{};var r=i(t,e);return h(r),function(e){for(var n=[],a=0;a<r.length;a++){var o=r[a];(l=s[o.id]).refs--,n.push(l)}e?h(r=i(t,e)):r=[];for(a=0;a<n.length;a++){var l;if(0===(l=n[a]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete s[l.id]}}}};var m,b=(m=[],function(t,e){return m[t]=e,m.filter(Boolean).join("\n")});function _(t,e,n,a){var i=n?"":a.css;if(t.styleSheet)t.styleSheet.cssText=b(e,i);else{var s=document.createTextNode(i),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(s,r[e]):t.appendChild(s)}}},function(t,e){t.exports=function(t,e){for(var n=[],a={},i=0;i<e.length;i++){var s=e[i],r=s[0],o={id:t+":"+i,css:s[1],media:s[2],sourceMap:s[3]};a[r]?a[r].parts.push(o):n.push(a[r]={id:r,parts:[o]})}return n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(12),i=n.n(a);e.default={components:{"editable-input-field":i.a},props:{editing:{type:Boolean,default:!1},locale:{type:String,default:""},translation:{type:Object,default:null},config:{type:Object,default:null}},computed:{value:function(){return this.translation&&this.translation.translations?this.translation.translations[this.locale]:""},name:function(){return this.translation&&this.translation.id?this.translation.id+"_"+this.locale:""},translationKey:function(){return this.translation?this.translation.key:""},group:function(){return this.translation?this.translation.group:""}},methods:{handleEdit:function(){this.$emit("toggle")},handleSave:function(t){this.$emit("submit",{group:this.group,locale:this.locale,key:this.translationKey,value:t})},handleCancel:function(){this.$emit("cancel")}}}},function(t,e,n){var a=n(0)(n(13),n(14),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:String,default:""},placeholder:{type:String,default:""},config:{type:Object,default:null},disabled:{type:Boolean,default:!1}},data:function(){return{input:""}},mounted:function(){"trix"!==this.config.editor?this.$refs.input.select():this.input=this.value},methods:{initialize:function(){this.$refs.theEditor.editor.insertHTML(this.value),this.disabled&&this.$refs.theEditor.setAttribute("contenteditable",!1)},handleChange:function(){this.input=this.$refs.theEditor.value},handleFileAccept:function(t){t.preventDefault()},handleAddFile:function(t){this.$emit("file-add",t)},handleRemoveFile:function(t){this.$emit("file-remove",t)},save:function(){this.$emit("save",this.input)},cancel:function(){this.$emit("cancel")}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editable-input-field"},["trix"===t.config.editor?n("trix-editor",{ref:"theEditor",staticClass:"trix-content",attrs:{value:t.value,placeholder:t.placeholder},on:{keydown:function(t){t.stopPropagation()},"trix-change":t.handleChange,"trix-initialize":t.initialize,"trix-attachment-add":t.handleAddFile,"trix-attachment-remove":t.handleRemoveFile,"trix-file-accept":t.handleFileAccept}}):"textarea"===t.config.editor?n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],ref:"input",staticClass:"w-full form-control form-input form-input-bordered",attrs:{type:"text"},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],ref:"input",staticClass:"w-full form-control form-input form-input-bordered",attrs:{type:"text"},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}}),t._v(" "),n("div",{staticClass:"flex justify-end items-center my-3"},[n("button",{staticClass:"btn btn-link dim cursor-pointer text-80 mr-6",attrs:{type:"button"},on:{click:t.cancel}},[n("span",[t._v("\n                "+t._s(t.__("cancel"))+"\n            ")])]),t._v(" "),n("button",{staticClass:"btn btn-default btn-primary inline-flex items-center relative",attrs:{type:"button"},on:{click:t.save}},[n("span",[t._v("\n                "+t._s(t.__("save"))+"\n            ")])])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{ref:"input",staticClass:"block",class:{"editable-input my-1 px-3 py-1 rounded-lg":t.editing},attrs:{for:t.name,tabindex:"0"},on:{focus:t.handleEdit}},[t.editing?n("span",{staticClass:"block my-1 leading-tight text-80"},[t._v("\n    "+t._s(t.locale.toUpperCase())+" - "+t._s(t.translationKey)+"\n  ")]):t._e(),t._v(" "),t.editing?n("editable-input-field",{staticClass:"w-full",attrs:{value:t.value,config:t.config,type:"text"},on:{save:t.handleSave,cancel:t.handleCancel}}):n("div",{staticClass:"flex p-1 transition duration-500 cursor-pointer value hover:bg-gray-100",class:{updated:t.translation.updated&&t.translation.updated===t.locale}},[n("div",{staticClass:"w-2/12 uppercase"},[t._v("\n      "+t._s(t.locale)+"\n    ")]),t._v(" "),n("div",{staticClass:"w-10/12"},[t.value?[n("button",{staticClass:"flex items-baseline text-blue-500 hover:underline",on:{click:t.handleEdit}},[n("span",{staticClass:"text-left"},[t._v("\n            "+t._s(t.value.slice(0,100).replace(/<\/?[^>]+>/gi," ")+"...")+"\n          ")])])]:[n("button",{staticClass:"flex text-blue-500 underline",on:{click:t.handleEdit}},[n("span",{staticClass:"pr-3 text-left"},[n("icon",{attrs:{type:"add"}})],1),t._v(" "),n("span",{staticClass:"text-left"},[t._v("\n            "+t._s(t.__("add translation"))+"\n          ")])])]],2),t._v(" "),n("icon",{staticClass:"ml-2 text-blue-500",attrs:{type:"edit"}})],1)],1)},staticRenderFns:[]}},function(t,e,n){var a=n(0)(n(17),n(18),!1,null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{checked:{type:Boolean,default:!1},value:{type:String,default:null},text:{type:String,default:null},onToggle:{type:Function,default:null}},methods:{handleToggle:function(){this.onToggle(this.value)}}}},function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("checkbox-with-label",{attrs:{checked:this.checked},on:{input:this.handleToggle}},[this._v("\n    "+this._s(this.text)+"\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("loading-view",{attrs:{loading:t.initialLoading}},[n("heading",{staticClass:"mb-3",attrs:{level:1}},[t._v("\n    "+t._s(t.__("Translations"))+"\n  ")]),t._v(" "),n("div",{staticClass:"flex"},[n("div",{staticClass:"relative mb-6 h-9 flex-no-shrink"},[n("icon",{staticClass:"absolute ml-3 search-icon-center text-70",attrs:{type:"search"}}),t._v(" "),n("label",{attrs:{for:"search"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"shadow appearance-none form-search w-search pl-search",attrs:{placeholder:t.__("Search text"),type:"search",name:"search"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})])],1),t._v(" "),n("checkbox-with-label",{staticClass:"mb-6 ml-3",attrs:{checked:t.onlyMissing},on:{input:function(e){t.onlyMissing=!t.onlyMissing}}},[t._v("\n      "+t._s(t.__("Only show missing translations"))+"\n    ")]),t._v(" "),n("div",{staticClass:"ml-auto"},[n("dropdown",{staticClass:"mb-6 rounded bg-30 hover:bg-40"},[n("dropdown-trigger",{staticClass:"px-3"},[t._v("\n          "+t._s(t.__("Select group"))+"\n        ")]),t._v(" "),n("dropdown-menu",{attrs:{slot:"menu",direction:"rtl",width:"250"},slot:"menu"},[n("div",{staticClass:"p-4"},[n("ul",{staticClass:"list-reset"},[n("li",{staticClass:"flex items-center mb-4"},[n("checkbox-with-label",{attrs:{checked:t.selected.groups.length===t.groups.length},on:{input:t.toggleGroups}},[t._v("\n                  "+t._s(t.__("Select All"))+"\n                ")])],1),t._v(" "),t._l(t.groups,function(e){return n("li",{key:e,staticClass:"flex items-center mb-4"},[n("checkbox-input",{attrs:{value:e,text:e,checked:t.selected.groups.includes(e),"on-toggle":t.toggleGroups}})],1)})],2)])])],1)],1),t._v(" "),n("div",{staticClass:"ml-2"},[n("dropdown",{staticClass:"mb-6 rounded bg-30 hover:bg-40"},[n("dropdown-trigger",{staticClass:"px-3"},[t._v("\n          "+t._s(t.__("Select languages"))+"\n        ")]),t._v(" "),n("dropdown-menu",{attrs:{slot:"menu",direction:"rtl",width:"250"},slot:"menu"},[n("div",{staticClass:"p-4"},[n("ul",{staticClass:"list-reset"},[n("li",{staticClass:"flex items-center mb-4"},[n("checkbox-with-label",{attrs:{checked:t.selected.locales.length===t.locales.length},on:{input:t.toggleLocales}},[t._v("\n                  "+t._s(t.__("Select All"))+"\n                ")])],1),t._v(" "),t._l(t.locales,function(e){return n("li",{key:e.locale,staticClass:"flex items-center mb-4"},[n("checkbox-input",{attrs:{value:e.locale,text:e.language,checked:t.selected.locales.includes(e.locale),"on-toggle":t.toggleLocales}})],1)})],2)])])],1)],1)],1),t._v(" "),t.filteredTranslations?t._l(t.filteredTranslations,function(e){return n("card",{key:e.id,staticClass:"px-4 py-2 my-2"},[n("div",{staticClass:"flex mr-6 font-bold no-underline border-b text-90"},[n("div",{staticClass:"w-2/12"},[t._v("\n          "+t._s(e.group.toUpperCase())+"\n        ")]),t._v(" "),n("div",{staticClass:"w-10/12"},[t._v("\n          "+t._s(e.key)+"\n        ")])]),t._v(" "),t.selected.locales.length?n("div",{staticClass:"my-3"},t._l(t.selected.locales.map(function(t){return t}).sort(),function(a){return n("editable-input",{key:a,attrs:{locale:a,translation:e,editing:t.field===e.id+"_"+a,config:t.config},on:{toggle:function(n){t.field=e.id+"_"+a},submit:t.submit,cancel:t.cancel}})}),1):n("div",{staticClass:"my-3"},t._l(t.locales.map(function(t){return t.locale}).sort(),function(a){return n("editable-input",{key:a,attrs:{locale:a,translation:e,editing:t.field===e.id+"_"+a},on:{toggle:function(n){t.field=e.id+"_"+a},submit:t.submit,cancel:t.cancel}})}),1)])}):t._e()],2)},staticRenderFns:[]}},function(t,e){}]);