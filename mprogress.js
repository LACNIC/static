(function(){"use strict";var t={extend:function(t,e){if(e=JSON.parse(JSON.stringify(e)),"string"==typeof t)return e;var s,r;for(var s in t)r=t[s],t.hasOwnProperty(s)&&void 0!==r&&(e[s]=r);return e},queue:function(){function t(){var s=e.shift();s&&s(t)}var e=[];return function(s){e.push(s),1==e.length&&t()}}(),setcss:function(){function t(t){return t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(t,e){return e.toUpperCase()})}function e(t){var e=document.body.style;if(t in e)return t;for(var s,r=i.length,n=t.charAt(0).toUpperCase()+t.slice(1);r--;)if(s=i[r]+n,s in e)return s;return t}function s(s){return s=t(s),n[s]||(n[s]=e(s))}function r(t,e,r){e=s(e),t.style[e]=r}var i=["Webkit","O","Moz","ms"],n={};return function(t,e){var s,i,n=arguments;if(2==n.length)for(s in e)i=e[s],void 0!==i&&e.hasOwnProperty(s)&&r(t,s,i);else r(t,n[1],n[2])}}(),clamp:function(t,e,s){return t<e?e:t>s?s:t},toBarPerc:function(t){return 100*(-1+t)},hasClass:function(e,s){var r="string"==typeof e?e:t.classList(e);return r.indexOf(" "+s+" ")>=0},addClass:function(e,s){var r=t.classList(e),i=r+s;t.hasClass(r,s)||(e.className=i.substring(1))},removeClass:function(e,s){var r,i=t.classList(e);t.hasClass(e,s)&&(r=i.replace(" "+s+" "," "),e.className=r.substring(1,r.length-1))},showEl:function(e){t.setcss(e,{display:"block"})},hideEl:function(e){t.setcss(e,{display:"none"})},classList:function(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")},removeElement:function(t){t&&t.parentNode&&t.parentNode.removeChild(t)}},e=t;!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.Mprogress=e()}("undefined"!=typeof window?window:this,function(){var t={template:1,parent:"body",start:!1,minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800},s="99",r=500,i=1500,n='[role="mpbar"]',o='[role="bufferBar"]',a='[role="dashed"]',u={determinate:'<div class="deter-bar" role="mpbar1"><div class="peg"></div></div><div class="bar-bg"></div>',buffer:'<div class="deter-bar" role="mpbar2"><div class="peg"></div></div><div class="buffer-bg" role="bufferBar"></div><div class="mp-ui-dashed" role="dashed"></div>',indeterminate:'<div class="indeter-bar" role="mpbar3"></div><div class="bar-bg"></div>',query:'<div class="query-bar" role="mpbar4"><div class="peg"></div></div><div class="bar-bg"></div>'},l={},f=function(s){var r=e.extend(s,t),i=r.parent+r.template,n=l[i]||"";return n||(n=new d(r),l[i]=n),"string"==typeof s&&"function"==typeof n[s]?n[s]():r.start&&n.start(),n},d=function(t){this.options=t||{},this.status=null,this.bufferStatus=null};return d.prototype={version:"0.1.0",constructor:d,start:function(){function t(){setTimeout(function(){s.status&&(s._trickle(),t())},s.options.trickleSpeed)}if(this.status||this._isBufferStyle()||this.set(0),this._isIndeterminateStyle()||this._isQueryStyle())return this;var s=this;if(this._isBufferStyle()&&!this.bufferStatus){var i=this._render(),n=i.querySelector(a),o=i.querySelector(this._getCurrSelector());e.hideEl(o),e.hideEl(n),this.setBuffer(0).setBuffer(1),setTimeout(function(){e.showEl(n),e.showEl(o),s.set(0).setBuffer(0)},r)}return this.options.trickle&&t(),this},end:function(t){if(!t&&!this.status)return this;var s=this,n=this.options.speed,o=this._getRenderedId();if(this._isBufferStyle()&&t)return this.set(0).set(1);if(this._isIndeterminateStyle())return!this._isRendered()&&t&&(this.set(0),o=this._getRenderedId(),n=r),e.setcss(o,{transition:"none",opacity:1}),o.offsetWidth,setTimeout(function(){e.setcss(o,{transition:"all "+n+"ms linear",opacity:0}),setTimeout(function(){s._remove()},n)},n),this;if(this._isQueryStyle()){if(this._isRendered()){var a=o.querySelector(this._getCurrSelector());return e.addClass(a,"end"),setTimeout(function(){s._remove()},i),this}if(t)return this.set(0),o=this._getRenderedId(),setTimeout(function(){s._remove()},i),this}return this.inc(.3+.5*Math.random()).set(1)},set:function(t){return t=e.clamp(t,this.options.minimum,1),this.status=1===t?null:t,this._setProgress(this._getCurrSelector(),t),this},setBuffer:function(t){return t=e.clamp(t,this.options.minimum,1),this.bufferStatus=1===t?null:t,this._setProgress(o,t),this},inc:function(t){var e=this.status,s=this.bufferStatus;return e?(e=this._getRandomNum(e,t),this._isBufferStyle()&&(s=this._getRandomNum(s>e?s:e+.1,t),this.setBuffer(s)),this.set(e)):this.start()},_trickle:function(){return this.inc(Math.random()*this.options.trickleRate)},_render:function(t){if(this._isRendered())return this._getRenderedId();var s,r=document.createElement("div"),i=this._getCurrTemplate()||"",n=document.querySelector(this.options.parent);if(r.id=this._getRenderedId(!0),r.className="ui-mprogress",r.innerHTML=i,!this._isIndeterminateStyle()&&!this._isQueryStyle()){t||(s=!this._isStarted());var a=r.querySelector(this._getCurrSelector()),u=s?"-100":e.toBarPerc(this.status||0);if(e.setcss(a,{transition:"all 0 linear",transform:"translate3d("+u+"%,0,0)"}),this._isBufferStyle()){var l=r.querySelector(o),f=s?"-100":e.toBarPerc(this.bufferStatus||0);e.setcss(l,{transition:"all 0 linear",transform:"translate3d("+f+"%,0,0)"})}}return n!=document.body&&e.addClass(n,"mprogress-custom-parent"),n.appendChild(r),r},_remove:function(){var t=this._getRenderedId(),s=document.querySelector(this.options.parent);if(s){s!=document.body&&e.removeClass(s,"mprogress-custom-parent");var r=this.options.parent+this.options.template;l[r]&&(l[r]=null),t&&(this.status=null,this.bufferStatus=null,e.removeElement(t))}},_setProgress:function(t,s){var r=this._render(),i=r.querySelector(t),n=this.options.speed,o=this.options.easing,a=this;return r.offsetWidth,this._isIndeterminateStyle()||this._isQueryStyle()?this:void e.queue(function(t){""===a.options.positionUsing&&(a.options.positionUsing=a._getPositioningCSS()),e.setcss(i,a._barPositionCSS(s,n,o)),1===s?(e.setcss(r,{transition:"none",opacity:1}),r.offsetWidth,setTimeout(function(){e.setcss(r,{transition:"all "+n+"ms linear",opacity:0}),setTimeout(function(){a._remove(),t()},n)},n)):setTimeout(t,n)})},_getCurrSelector:function(){var t=this._getCurrTplId();return t!==s?'[role="mpbar'+t+'"]':n},_isStarted:function(){return"number"==typeof this.status},_getRandomNum:function(t,s){return"number"!=typeof s&&(s=(1-t)*e.clamp(Math.random()*t,.1,.95)),t=e.clamp(t+s,0,.994)},_isRendered:function(){return!!this._getRenderedId()},_getRenderedId:function(t){var e=this._getCurrTplId(),s="mprogress"+e,r=this.options.parent.match(/([a-zA-Z0-9]+)/gi).join("-"),s=[r,"mprogress",e].join("-");return t?s:document.getElementById(s)},_isBufferStyle:function(){return 2===this._getCurrTplId()},_isIndeterminateStyle:function(){return 3===this._getCurrTplId()},_isQueryStyle:function(){return 4===this._getCurrTplId()},_getCurrTplId:function(){var t=~~this.options.template||1;return"number"==typeof t?t:s},_getCurrTemplate:function(){var t,e=this.options.template||1,s=["determinate","buffer","indeterminate","query"];return"number"==typeof~~e?(t=s[e-1],u[t]||""):"string"==typeof e?template:void 0},_getPositioningCSS:function(){var t=document.body.style,e="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return e+"Perspective"in t?"translate3d":e+"Transform"in t?"translate":"margin"},_barPositionCSS:function(t,s,r){var i;return i="translate3d"===this.options.positionUsing?{transform:"translate3d("+e.toBarPerc(t)+"%,0,0)"}:"translate"===this.options.positionUsing?{transform:"translate("+e.toBarPerc(t)+"%,0)"}:{"margin-left":e.toBarPerc(t)+"%"},i.transition="all "+s+"ms "+r,i}},function(){var t=0,e=0;d.prototype.promise=function(s){if(!s||"resolved"==s.state())return this;var r=this;return 0==e&&r.start(),t++,e++,s.always(function(){e--,0==e?(t=0,r.end()):r.set((t-e)/t)}),this}}(),f})}).call(this);
