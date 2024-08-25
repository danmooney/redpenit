/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{R:()=>P});const e=document.getElementById("imageCanvas"),n=document.getElementById("notification");var r,o;function i(t,e,o){n.textContent=t,n.className="notification ".concat(e," ").concat(o," show"),r&&clearTimeout(r),r=setTimeout((function(){n.classList.remove("show")}),3e3)}function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function c(){c=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function d(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var i=e&&e.prototype instanceof w?e:w,a=Object.create(i.prototype),c=new S(r||[]);return o(a,"_invoke",{value:R(t,n,c)}),a}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var p="suspendedStart",v="suspendedYield",g="executing",y="completed",m={};function w(){}function L(){}function b(){}var E={};d(E,u,(function(){return this}));var x=Object.getPrototypeOf,k=x&&x(x(_([])));k&&k!==n&&r.call(k,u)&&(E=k);var D=b.prototype=w.prototype=Object.create(E);function I(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function n(o,i,c,u){var l=h(t[o],t,i);if("throw"!==l.type){var s=l.arg,d=s.value;return d&&"object"==a(d)&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(d).then((function(t){s.value=t,c(s)}),(function(t){return n("throw",t,c,u)}))}u(l.arg)}var i;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}})}function R(e,n,r){var o=p;return function(i,a){if(o===g)throw Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:t,done:!0}}for(r.method=i,r.arg=a;;){var c=r.delegate;if(c){var u=P(c,r);if(u){if(u===m)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===p)throw o=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=g;var l=h(e,n,r);if("normal"===l.type){if(o=r.done?y:v,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=y,r.method="throw",r.arg=l.arg)}}}function P(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,P(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var i=h(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,m;var a=i.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,m):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function _(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}throw new TypeError(a(e)+" is not iterable")}return L.prototype=b,o(D,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:L,configurable:!0}),L.displayName=d(b,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===L||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,d(t,s,"GeneratorFunction")),t.prototype=Object.create(D),t},e.awrap=function(t){return{__await:t}},I(O.prototype),d(O.prototype,l,(function(){return this})),e.AsyncIterator=O,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new O(f(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},I(D),d(D,s,"Generator"),d(D,u,(function(){return this})),d(D,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=_,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(j),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:_(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),m}},e}function u(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){u(i,r,o,a,c,"next",t)}function c(t){u(i,r,o,a,c,"throw",t)}a(void 0)}))}}function s(t){o=t}function d(){return o}document.getElementById("copyBtn").addEventListener("click",l(c().mark((function t(){var n,r,o;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=e.toDataURL("image/png"),t.next=4,fetch(n);case 4:return r=t.sent,t.next=7,r.blob();case 7:return o=t.sent,t.next=10,navigator.clipboard.write([new ClipboardItem({"image/png":o})]);case 10:i("Image copied to clipboard.","success","bottom"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.error("Error copying image to clipboard: ",t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,13]])}))));const f=document.getElementById("imageFileInput");var h=e.height;function p(t){var n=window.innerWidth,r=window.innerHeight,o=Math.min(n/t.width,r/t.height,1),i=e.getContext("2d");i.clearRect(0,0,e.width,e.height);var a=t.width*o,c=t.height*o;e.width=a,e.height=Math.min(c,h),i.drawImage(t,0,0,a,c)}f.addEventListener("change",(function(t){if(t.target.files[0].type.startsWith("image/")){var e=new FileReader;e.onload=function(t){var e=new Image;e.onload=function(){s(e),p(e)},e.src=t.target.result},e.readAsDataURL(t.target.files[0]),setTimeout((function(){return t.target.value=""}),0)}else i("Please upload a valid image file.","error","top")}),!1),document.getElementById("uploadBtn").addEventListener("click",(function(){f.click()})),document.addEventListener("paste",(function(t){for(var e=t.clipboardData.items,n=0;n<e.length;n++)if(-1!==e[n].type.indexOf("image")){var r=e[n].getAsFile(),o=new FileReader;o.onload=function(t){var e=new Image;e.onload=function(){s(e),p(e)},e.src=t.target.result},o.readAsDataURL(r)}}));const v=document.getElementById("downloadBtn");var g="";f.addEventListener("change",(function(){f.files.length>0&&(g=f.files[0].name)})),v.addEventListener("click",(function(){var t=e.toDataURL("image/png").replace("image/png","image/octet-stream"),n="redpenit-",r=".png";if(g){var o=g.substring(g.lastIndexOf("."));n+=g.substring(0,g.lastIndexOf(".")),r=o}else n+=Date.now().toString();n.length+r.length>255&&(n=n.substring(0,255-r.length)),n+=r;var i=document.createElement("a");i.download=n,i.href=t,i.click()})),document.body.addEventListener("dragover",(function(t){t.preventDefault(),t.dataTransfer.dropEffect="copy"}),!1),document.body.addEventListener("dragenter",(function(t){t.preventDefault(),document.body.classList.add("drag-over")}),!1),document.body.addEventListener("dragleave",(function(t){t.preventDefault(),0===t.clientX&&0===t.clientY&&document.body.classList.remove("drag-over")}),!1),document.body.addEventListener("drop",(function(t){t.preventDefault(),document.body.classList.remove("drag-over");var e=t.dataTransfer.files;if(e.length>0&&e[0].type.match("image.*")){var n=new FileReader;n.onload=function(t){var e=new Image;e.onload=function(){s(e),p(e)},e.src=t.target.result},n.readAsDataURL(e[0])}}),!1);var y=!1,m=!1,w=0,L=e.getContext("2d"),b=[];function E(t){w=t.touches.length,R(),D(t)}function x(t){w>1||(t.preventDefault(),0===b.length&&e.toDataURL()===P&&(m=!0),y=!0,L.strokeStyle="red",L.fillStyle="red",L.lineWidth=2,L.beginPath(),b.push(e.toDataURL()))}function k(t){if(y){t.preventDefault(),m&&(L.clearRect(0,0,e.width,e.height),m=!1);var n=e.getBoundingClientRect(),r=t.touches?t.touches[0].clientX-n.left:t.offsetX,o=t.touches?t.touches[0].clientY-n.top:t.offsetY;L.lineTo(r,o),L.stroke()}}function D(t){w>1||(t.preventDefault(),y&&(L.stroke(),L.closePath(),y=!1),w=0)}function I(){if(b.length>0){var t=b.pop(),n=new Image;n.onload=function(){L.clearRect(0,0,e.width,e.height),L.drawImage(n,0,0)},n.src=t}else i("No more actions to undo.","info","top")}e.addEventListener("mousedown",x),e.addEventListener("mousemove",k),e.addEventListener("mouseup",D),e.addEventListener("mouseout",D),e.addEventListener("touchstart",(function(t){w=t.touches.length,R(),setTimeout((function(){w>1||x(t)}))})),e.addEventListener("touchmove",(function(t){w=t.touches.length,R(),w>1||(t.preventDefault(),k(t))})),e.addEventListener("touchend",E),e.addEventListener("touchcancel",E),document.getElementById("undoBtn").addEventListener("click",I),document.addEventListener("keydown",(function(t){var e=navigator.platform.toUpperCase().indexOf("MAC")>=0,n=e&&t.metaKey&&"z"===t.key||!e&&t.ctrlKey&&"z"===t.key,r=e&&t.metaKey&&"s"===t.key||!e&&t.ctrlKey&&"s"===t.key;n&&(t.preventDefault(),I()),r&&(t.preventDefault(),v.click())}));var O=document.createElement("div");function R(){O.textContent="Touch Points: ".concat(w)}O.id="touchPointsDisplay",O.style.position="fixed",O.style.bottom="10px",O.style.right="10px",O.style.backgroundColor="rgba(0, 0, 0, 0.5)",O.style.color="white",O.style.padding="5px 10px",O.style.borderRadius="5px",document.body.appendChild(O);var P,T=1,j=e.height;e.addEventListener("wheel",(function(t){var n=d();n&&function(t,n){n.preventDefault();var r=Math.sign(n.deltaY);T*=1-.1*r,T=Math.max(T,.1);var o=e.getContext("2d");o.clearRect(0,0,e.width,e.height);var i=t.width*T,a=t.height*T;e.width=i,e.height=Math.min(a,j),o.drawImage(t,0,0,i,a)}(n,t)})),document.addEventListener("DOMContentLoaded",(function(){var t=e.getContext("2d"),n="Drag & Drop, Upload, or Paste an Image",r=.8*e.width,o=20;do{t.font="".concat(o,"px Arial"),o--}while(t.measureText(n).width>r);t.textAlign="center",t.fillStyle="black",t.fillText(n,e.width/2,e.height/2),console.log("Application initialized"),P=e.toDataURL()}))})();