(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();function sg(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var wu={exports:{}},Do={},Au={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kp;function E_(){if(kp)return mt;kp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.iterator;function x(k){return k===null||typeof k!="object"?null:(k=v&&k[v]||k["@@iterator"],typeof k=="function"?k:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,w={};function y(k,Z,Ne){this.props=k,this.context=Z,this.refs=w,this.updater=Ne||S}y.prototype.isReactComponent={},y.prototype.setState=function(k,Z){if(typeof k!="object"&&typeof k!="function"&&k!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,k,Z,"setState")},y.prototype.forceUpdate=function(k){this.updater.enqueueForceUpdate(this,k,"forceUpdate")};function _(){}_.prototype=y.prototype;function D(k,Z,Ne){this.props=k,this.context=Z,this.refs=w,this.updater=Ne||S}var L=D.prototype=new _;L.constructor=D,E(L,y.prototype),L.isPureReactComponent=!0;var C=Array.isArray,B=Object.prototype.hasOwnProperty,U={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function z(k,Z,Ne){var J,de={},Se=null,xe=null;if(Z!=null)for(J in Z.ref!==void 0&&(xe=Z.ref),Z.key!==void 0&&(Se=""+Z.key),Z)B.call(Z,J)&&!O.hasOwnProperty(J)&&(de[J]=Z[J]);var we=arguments.length-2;if(we===1)de.children=Ne;else if(1<we){for(var $e=Array(we),Xe=0;Xe<we;Xe++)$e[Xe]=arguments[Xe+2];de.children=$e}if(k&&k.defaultProps)for(J in we=k.defaultProps,we)de[J]===void 0&&(de[J]=we[J]);return{$$typeof:s,type:k,key:Se,ref:xe,props:de,_owner:U.current}}function b(k,Z){return{$$typeof:s,type:k.type,key:Z,ref:k.ref,props:k.props,_owner:k._owner}}function A(k){return typeof k=="object"&&k!==null&&k.$$typeof===s}function I(k){var Z={"=":"=0",":":"=2"};return"$"+k.replace(/[=:]/g,function(Ne){return Z[Ne]})}var ae=/\/+/g;function Q(k,Z){return typeof k=="object"&&k!==null&&k.key!=null?I(""+k.key):Z.toString(36)}function re(k,Z,Ne,J,de){var Se=typeof k;(Se==="undefined"||Se==="boolean")&&(k=null);var xe=!1;if(k===null)xe=!0;else switch(Se){case"string":case"number":xe=!0;break;case"object":switch(k.$$typeof){case s:case e:xe=!0}}if(xe)return xe=k,de=de(xe),k=J===""?"."+Q(xe,0):J,C(de)?(Ne="",k!=null&&(Ne=k.replace(ae,"$&/")+"/"),re(de,Z,Ne,"",function(Xe){return Xe})):de!=null&&(A(de)&&(de=b(de,Ne+(!de.key||xe&&xe.key===de.key?"":(""+de.key).replace(ae,"$&/")+"/")+k)),Z.push(de)),1;if(xe=0,J=J===""?".":J+":",C(k))for(var we=0;we<k.length;we++){Se=k[we];var $e=J+Q(Se,we);xe+=re(Se,Z,Ne,$e,de)}else if($e=x(k),typeof $e=="function")for(k=$e.call(k),we=0;!(Se=k.next()).done;)Se=Se.value,$e=J+Q(Se,we++),xe+=re(Se,Z,Ne,$e,de);else if(Se==="object")throw Z=String(k),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(k).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.");return xe}function me(k,Z,Ne){if(k==null)return k;var J=[],de=0;return re(k,J,"","",function(Se){return Z.call(Ne,Se,de++)}),J}function oe(k){if(k._status===-1){var Z=k._result;Z=Z(),Z.then(function(Ne){(k._status===0||k._status===-1)&&(k._status=1,k._result=Ne)},function(Ne){(k._status===0||k._status===-1)&&(k._status=2,k._result=Ne)}),k._status===-1&&(k._status=0,k._result=Z)}if(k._status===1)return k._result.default;throw k._result}var ue={current:null},G={transition:null},ce={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:G,ReactCurrentOwner:U};function te(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:me,forEach:function(k,Z,Ne){me(k,function(){Z.apply(this,arguments)},Ne)},count:function(k){var Z=0;return me(k,function(){Z++}),Z},toArray:function(k){return me(k,function(Z){return Z})||[]},only:function(k){if(!A(k))throw Error("React.Children.only expected to receive a single React element child.");return k}},mt.Component=y,mt.Fragment=n,mt.Profiler=a,mt.PureComponent=D,mt.StrictMode=r,mt.Suspense=h,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ce,mt.act=te,mt.cloneElement=function(k,Z,Ne){if(k==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+k+".");var J=E({},k.props),de=k.key,Se=k.ref,xe=k._owner;if(Z!=null){if(Z.ref!==void 0&&(Se=Z.ref,xe=U.current),Z.key!==void 0&&(de=""+Z.key),k.type&&k.type.defaultProps)var we=k.type.defaultProps;for($e in Z)B.call(Z,$e)&&!O.hasOwnProperty($e)&&(J[$e]=Z[$e]===void 0&&we!==void 0?we[$e]:Z[$e])}var $e=arguments.length-2;if($e===1)J.children=Ne;else if(1<$e){we=Array($e);for(var Xe=0;Xe<$e;Xe++)we[Xe]=arguments[Xe+2];J.children=we}return{$$typeof:s,type:k.type,key:de,ref:Se,props:J,_owner:xe}},mt.createContext=function(k){return k={$$typeof:u,_currentValue:k,_currentValue2:k,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},k.Provider={$$typeof:l,_context:k},k.Consumer=k},mt.createElement=z,mt.createFactory=function(k){var Z=z.bind(null,k);return Z.type=k,Z},mt.createRef=function(){return{current:null}},mt.forwardRef=function(k){return{$$typeof:d,render:k}},mt.isValidElement=A,mt.lazy=function(k){return{$$typeof:g,_payload:{_status:-1,_result:k},_init:oe}},mt.memo=function(k,Z){return{$$typeof:m,type:k,compare:Z===void 0?null:Z}},mt.startTransition=function(k){var Z=G.transition;G.transition={};try{k()}finally{G.transition=Z}},mt.unstable_act=te,mt.useCallback=function(k,Z){return ue.current.useCallback(k,Z)},mt.useContext=function(k){return ue.current.useContext(k)},mt.useDebugValue=function(){},mt.useDeferredValue=function(k){return ue.current.useDeferredValue(k)},mt.useEffect=function(k,Z){return ue.current.useEffect(k,Z)},mt.useId=function(){return ue.current.useId()},mt.useImperativeHandle=function(k,Z,Ne){return ue.current.useImperativeHandle(k,Z,Ne)},mt.useInsertionEffect=function(k,Z){return ue.current.useInsertionEffect(k,Z)},mt.useLayoutEffect=function(k,Z){return ue.current.useLayoutEffect(k,Z)},mt.useMemo=function(k,Z){return ue.current.useMemo(k,Z)},mt.useReducer=function(k,Z,Ne){return ue.current.useReducer(k,Z,Ne)},mt.useRef=function(k){return ue.current.useRef(k)},mt.useState=function(k){return ue.current.useState(k)},mt.useSyncExternalStore=function(k,Z,Ne){return ue.current.useSyncExternalStore(k,Z,Ne)},mt.useTransition=function(){return ue.current.useTransition()},mt.version="18.3.1",mt}var Bp;function $d(){return Bp||(Bp=1,Au.exports=E_()),Au.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zp;function T_(){if(zp)return Do;zp=1;var s=$d(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,h,m){var g,v={},x=null,S=null;m!==void 0&&(x=""+m),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(S=h.ref);for(g in h)r.call(h,g)&&!l.hasOwnProperty(g)&&(v[g]=h[g]);if(d&&d.defaultProps)for(g in h=d.defaultProps,h)v[g]===void 0&&(v[g]=h[g]);return{$$typeof:e,type:d,key:x,ref:S,props:v,_owner:a.current}}return Do.Fragment=n,Do.jsx=u,Do.jsxs=u,Do}var Hp;function w_(){return Hp||(Hp=1,wu.exports=T_()),wu.exports}var P=w_(),ot=$d();const A_=sg(ot);var rl={},Cu={exports:{}},Un={},Ru={exports:{}},bu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vp;function C_(){return Vp||(Vp=1,(function(s){function e(G,ce){var te=G.length;G.push(ce);e:for(;0<te;){var k=te-1>>>1,Z=G[k];if(0<a(Z,ce))G[k]=ce,G[te]=Z,te=k;else break e}}function n(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var ce=G[0],te=G.pop();if(te!==ce){G[0]=te;e:for(var k=0,Z=G.length,Ne=Z>>>1;k<Ne;){var J=2*(k+1)-1,de=G[J],Se=J+1,xe=G[Se];if(0>a(de,te))Se<Z&&0>a(xe,de)?(G[k]=xe,G[Se]=te,k=Se):(G[k]=de,G[J]=te,k=J);else if(Se<Z&&0>a(xe,te))G[k]=xe,G[Se]=te,k=Se;else break e}}return ce}function a(G,ce){var te=G.sortIndex-ce.sortIndex;return te!==0?te:G.id-ce.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();s.unstable_now=function(){return u.now()-d}}var h=[],m=[],g=1,v=null,x=3,S=!1,E=!1,w=!1,y=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function L(G){for(var ce=n(m);ce!==null;){if(ce.callback===null)r(m);else if(ce.startTime<=G)r(m),ce.sortIndex=ce.expirationTime,e(h,ce);else break;ce=n(m)}}function C(G){if(w=!1,L(G),!E)if(n(h)!==null)E=!0,oe(B);else{var ce=n(m);ce!==null&&ue(C,ce.startTime-G)}}function B(G,ce){E=!1,w&&(w=!1,_(z),z=-1),S=!0;var te=x;try{for(L(ce),v=n(h);v!==null&&(!(v.expirationTime>ce)||G&&!I());){var k=v.callback;if(typeof k=="function"){v.callback=null,x=v.priorityLevel;var Z=k(v.expirationTime<=ce);ce=s.unstable_now(),typeof Z=="function"?v.callback=Z:v===n(h)&&r(h),L(ce)}else r(h);v=n(h)}if(v!==null)var Ne=!0;else{var J=n(m);J!==null&&ue(C,J.startTime-ce),Ne=!1}return Ne}finally{v=null,x=te,S=!1}}var U=!1,O=null,z=-1,b=5,A=-1;function I(){return!(s.unstable_now()-A<b)}function ae(){if(O!==null){var G=s.unstable_now();A=G;var ce=!0;try{ce=O(!0,G)}finally{ce?Q():(U=!1,O=null)}}else U=!1}var Q;if(typeof D=="function")Q=function(){D(ae)};else if(typeof MessageChannel<"u"){var re=new MessageChannel,me=re.port2;re.port1.onmessage=ae,Q=function(){me.postMessage(null)}}else Q=function(){y(ae,0)};function oe(G){O=G,U||(U=!0,Q())}function ue(G,ce){z=y(function(){G(s.unstable_now())},ce)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(G){G.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,oe(B))},s.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<G?Math.floor(1e3/G):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(G){switch(x){case 1:case 2:case 3:var ce=3;break;default:ce=x}var te=x;x=ce;try{return G()}finally{x=te}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(G,ce){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var te=x;x=G;try{return ce()}finally{x=te}},s.unstable_scheduleCallback=function(G,ce,te){var k=s.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?k+te:k):te=k,G){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=te+Z,G={id:g++,callback:ce,priorityLevel:G,startTime:te,expirationTime:Z,sortIndex:-1},te>k?(G.sortIndex=te,e(m,G),n(h)===null&&G===n(m)&&(w?(_(z),z=-1):w=!0,ue(C,te-k))):(G.sortIndex=Z,e(h,G),E||S||(E=!0,oe(B))),G},s.unstable_shouldYield=I,s.unstable_wrapCallback=function(G){var ce=x;return function(){var te=x;x=ce;try{return G.apply(this,arguments)}finally{x=te}}}})(bu)),bu}var Gp;function R_(){return Gp||(Gp=1,Ru.exports=C_()),Ru.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wp;function b_(){if(Wp)return Un;Wp=1;var s=$d(),e=R_();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(t,i){u(t,i),u(t+"Capture",i)}function u(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},v={};function x(t){return h.call(v,t)?!0:h.call(g,t)?!1:m.test(t)?v[t]=!0:(g[t]=!0,!1)}function S(t,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function E(t,i,o,c){if(i===null||typeof i>"u"||S(t,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function w(t,i,o,c,f,p,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=f,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=p,this.removeEmptyString=M}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){y[t]=new w(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];y[i]=new w(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){y[t]=new w(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){y[t]=new w(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){y[t]=new w(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){y[t]=new w(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){y[t]=new w(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){y[t]=new w(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){y[t]=new w(t,5,!1,t.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function D(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(_,D);y[i]=new w(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(_,D);y[i]=new w(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(_,D);y[i]=new w(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){y[t]=new w(t,1,!1,t.toLowerCase(),null,!1,!1)}),y.xlinkHref=new w("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){y[t]=new w(t,1,!1,t.toLowerCase(),null,!0,!0)});function L(t,i,o,c){var f=y.hasOwnProperty(i)?y[i]:null;(f!==null?f.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,o,f,c)&&(o=null),c||f===null?x(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):f.mustUseProperty?t[f.propertyName]=o===null?f.type===3?!1:"":o:(i=f.attributeName,c=f.attributeNamespace,o===null?t.removeAttribute(i):(f=f.type,o=f===3||f===4&&o===!0?"":""+o,c?t.setAttributeNS(c,i,o):t.setAttribute(i,o))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,B=Symbol.for("react.element"),U=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),z=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),A=Symbol.for("react.provider"),I=Symbol.for("react.context"),ae=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),re=Symbol.for("react.suspense_list"),me=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),ue=Symbol.for("react.offscreen"),G=Symbol.iterator;function ce(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var te=Object.assign,k;function Z(t){if(k===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);k=i&&i[1]||""}return`
`+k+t}var Ne=!1;function J(t,i){if(!t||Ne)return"";Ne=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(se){var c=se}Reflect.construct(t,[],i)}else{try{i.call()}catch(se){c=se}t.call(i.prototype)}else{try{throw Error()}catch(se){c=se}t()}}catch(se){if(se&&c&&typeof se.stack=="string"){for(var f=se.stack.split(`
`),p=c.stack.split(`
`),M=f.length-1,F=p.length-1;1<=M&&0<=F&&f[M]!==p[F];)F--;for(;1<=M&&0<=F;M--,F--)if(f[M]!==p[F]){if(M!==1||F!==1)do if(M--,F--,0>F||f[M]!==p[F]){var V=`
`+f[M].replace(" at new "," at ");return t.displayName&&V.includes("<anonymous>")&&(V=V.replace("<anonymous>",t.displayName)),V}while(1<=M&&0<=F);break}}}finally{Ne=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?Z(t):""}function de(t){switch(t.tag){case 5:return Z(t.type);case 16:return Z("Lazy");case 13:return Z("Suspense");case 19:return Z("SuspenseList");case 0:case 2:case 15:return t=J(t.type,!1),t;case 11:return t=J(t.type.render,!1),t;case 1:return t=J(t.type,!0),t;default:return""}}function Se(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case O:return"Fragment";case U:return"Portal";case b:return"Profiler";case z:return"StrictMode";case Q:return"Suspense";case re:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case I:return(t.displayName||"Context")+".Consumer";case A:return(t._context.displayName||"Context")+".Provider";case ae:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case me:return i=t.displayName||null,i!==null?i:Se(t.type)||"Memo";case oe:i=t._payload,t=t._init;try{return Se(t(i))}catch{}}return null}function xe(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Se(i);case 8:return i===z?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function we(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function $e(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Xe(t){var i=$e(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),c=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var f=o.get,p=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(M){c=""+M,p.call(this,M)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(M){c=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function yt(t){t._valueTracker||(t._valueTracker=Xe(t))}function bt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return t&&(c=$e(t)?t.checked?"true":"false":t.value),t=c,t!==o?(i.setValue(t),!0):!1}function ct(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function H(t,i){var o=i.checked;return te({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function nn(t,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=we(i.value!=null?i.value:o),t._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function ft(t,i){i=i.checked,i!=null&&L(t,"checked",i,!1)}function He(t,i){ft(t,i);var o=we(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?ht(t,i.type,o):i.hasOwnProperty("defaultValue")&&ht(t,i.type,we(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function Ae(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function ht(t,i,o){(i!=="number"||ct(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var Fe=Array.isArray;function N(t,i,o,c){if(t=t.options,i){i={};for(var f=0;f<o.length;f++)i["$"+o[f]]=!0;for(o=0;o<t.length;o++)f=i.hasOwnProperty("$"+t[o].value),t[o].selected!==f&&(t[o].selected=f),f&&c&&(t[o].defaultSelected=!0)}else{for(o=""+we(o),i=null,f=0;f<t.length;f++){if(t[f].value===o){t[f].selected=!0,c&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function T(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return te({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ne(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(Fe(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:we(o)}}function fe(t,i){var o=we(i.value),c=we(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),c!=null&&(t.defaultValue=""+c)}function he(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function pe(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ge(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?pe(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var be,Re=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,f){MSApp.execUnsafeLocalFunction(function(){return t(i,o,c,f)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(be=be||document.createElement("div"),be.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=be.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function tt(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var _e={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Pe=["Webkit","ms","Moz","O"];Object.keys(_e).forEach(function(t){Pe.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),_e[i]=_e[t]})});function Ye(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||_e.hasOwnProperty(t)&&_e[t]?(""+i).trim():i+"px"}function Qe(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,f=Ye(o,i[o],c);o==="float"&&(o="cssFloat"),c?t.setProperty(o,f):t[o]=f}}var Oe=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function at(t,i){if(i){if(Oe[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function it(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Mt=null;function j(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ce=null,le=null,ge=null;function Ue(t){if(t=vo(t)){if(typeof Ce!="function")throw Error(n(280));var i=t.stateNode;i&&(i=xa(i),Ce(t.stateNode,t.type,i))}}function Ie(t){le?ge?ge.push(t):ge=[t]:le=t}function lt(){if(le){var t=le,i=ge;if(ge=le=null,Ue(t),i)for(t=0;t<i.length;t++)Ue(i[t])}}function Ot(t,i){return t(i)}function Zt(){}var Tt=!1;function bn(t,i,o){if(Tt)return t(i,o);Tt=!0;try{return Ot(t,i,o)}finally{Tt=!1,(le!==null||ge!==null)&&(Zt(),lt())}}function Mn(t,i){var o=t.stateNode;if(o===null)return null;var c=xa(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var es=!1;if(d)try{var Wi={};Object.defineProperty(Wi,"passive",{get:function(){es=!0}}),window.addEventListener("test",Wi,Wi),window.removeEventListener("test",Wi,Wi)}catch{es=!1}function Ti(t,i,o,c,f,p,M,F,V){var se=Array.prototype.slice.call(arguments,3);try{i.apply(o,se)}catch(ye){this.onError(ye)}}var wi=!1,Er=null,Tr=!1,ji=null,Zo={onError:function(t){wi=!0,Er=t}};function ts(t,i,o,c,f,p,M,F,V){wi=!1,Er=null,Ti.apply(Zo,arguments)}function Qo(t,i,o,c,f,p,M,F,V){if(ts.apply(this,arguments),wi){if(wi){var se=Er;wi=!1,Er=null}else throw Error(n(198));Tr||(Tr=!0,ji=se)}}function hi(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Jo(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function ea(t){if(hi(t)!==t)throw Error(n(188))}function Yl(t){var i=t.alternate;if(!i){if(i=hi(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,c=i;;){var f=o.return;if(f===null)break;var p=f.alternate;if(p===null){if(c=f.return,c!==null){o=c;continue}break}if(f.child===p.child){for(p=f.child;p;){if(p===o)return ea(f),t;if(p===c)return ea(f),i;p=p.sibling}throw Error(n(188))}if(o.return!==c.return)o=f,c=p;else{for(var M=!1,F=f.child;F;){if(F===o){M=!0,o=f,c=p;break}if(F===c){M=!0,c=f,o=p;break}F=F.sibling}if(!M){for(F=p.child;F;){if(F===o){M=!0,o=p,c=f;break}if(F===c){M=!0,c=p,o=f;break}F=F.sibling}if(!M)throw Error(n(189))}}if(o.alternate!==c)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function ta(t){return t=Yl(t),t!==null?na(t):null}function na(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=na(t);if(i!==null)return i;t=t.sibling}return null}var ia=e.unstable_scheduleCallback,R=e.unstable_cancelCallback,X=e.unstable_shouldYield,ie=e.unstable_requestPaint,K=e.unstable_now,q=e.unstable_getCurrentPriorityLevel,Ee=e.unstable_ImmediatePriority,Le=e.unstable_UserBlockingPriority,ke=e.unstable_NormalPriority,Ve=e.unstable_LowPriority,rt=e.unstable_IdlePriority,nt=null,je=null;function St(t){if(je&&typeof je.onCommitFiberRoot=="function")try{je.onCommitFiberRoot(nt,t,void 0,(t.current.flags&128)===128)}catch{}}var ut=Math.clz32?Math.clz32:Et,Wt=Math.log,zt=Math.LN2;function Et(t){return t>>>=0,t===0?32:31-(Wt(t)/zt|0)|0}var Ze=64,jt=4194304;function vt(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function hn(t,i){var o=t.pendingLanes;if(o===0)return 0;var c=0,f=t.suspendedLanes,p=t.pingedLanes,M=o&268435455;if(M!==0){var F=M&~f;F!==0?c=vt(F):(p&=M,p!==0&&(c=vt(p)))}else M=o&~f,M!==0?c=vt(M):p!==0&&(c=vt(p));if(c===0)return 0;if(i!==0&&i!==c&&(i&f)===0&&(f=c&-c,p=i&-i,f>=p||f===16&&(p&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=c;0<i;)o=31-ut(i),f=1<<o,c|=t[o],i&=~f;return c}function Xi(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function En(t,i){for(var o=t.suspendedLanes,c=t.pingedLanes,f=t.expirationTimes,p=t.pendingLanes;0<p;){var M=31-ut(p),F=1<<M,V=f[M];V===-1?((F&o)===0||(F&c)!==0)&&(f[M]=Xi(F,i)):V<=i&&(t.expiredLanes|=F),p&=~F}}function Ai(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function It(){var t=Ze;return Ze<<=1,(Ze&4194240)===0&&(Ze=64),t}function pn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function rn(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-ut(i),t[i]=o}function un(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<o;){var f=31-ut(o),p=1<<f;i[f]=0,c[f]=-1,t[f]=-1,o&=~p}}function sn(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var c=31-ut(o),f=1<<c;f&i|t[c]&i&&(t[c]|=i),o&=~f}}var wt=0;function pi(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var _f,$l,vf,xf,yf,Kl=!1,ra=[],qi=null,Yi=null,$i=null,to=new Map,no=new Map,Ki=[],jg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Sf(t,i){switch(t){case"focusin":case"focusout":qi=null;break;case"dragenter":case"dragleave":Yi=null;break;case"mouseover":case"mouseout":$i=null;break;case"pointerover":case"pointerout":to.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":no.delete(i.pointerId)}}function io(t,i,o,c,f,p){return t===null||t.nativeEvent!==p?(t={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[f]},i!==null&&(i=vo(i),i!==null&&$l(i)),t):(t.eventSystemFlags|=c,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function Xg(t,i,o,c,f){switch(i){case"focusin":return qi=io(qi,t,i,o,c,f),!0;case"dragenter":return Yi=io(Yi,t,i,o,c,f),!0;case"mouseover":return $i=io($i,t,i,o,c,f),!0;case"pointerover":var p=f.pointerId;return to.set(p,io(to.get(p)||null,t,i,o,c,f)),!0;case"gotpointercapture":return p=f.pointerId,no.set(p,io(no.get(p)||null,t,i,o,c,f)),!0}return!1}function Mf(t){var i=wr(t.target);if(i!==null){var o=hi(i);if(o!==null){if(i=o.tag,i===13){if(i=Jo(o),i!==null){t.blockedOn=i,yf(t.priority,function(){vf(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function sa(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Ql(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var c=new o.constructor(o.type,o);Mt=c,o.target.dispatchEvent(c),Mt=null}else return i=vo(o),i!==null&&$l(i),t.blockedOn=o,!1;i.shift()}return!0}function Ef(t,i,o){sa(t)&&o.delete(i)}function qg(){Kl=!1,qi!==null&&sa(qi)&&(qi=null),Yi!==null&&sa(Yi)&&(Yi=null),$i!==null&&sa($i)&&($i=null),to.forEach(Ef),no.forEach(Ef)}function ro(t,i){t.blockedOn===i&&(t.blockedOn=null,Kl||(Kl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,qg)))}function so(t){function i(f){return ro(f,t)}if(0<ra.length){ro(ra[0],t);for(var o=1;o<ra.length;o++){var c=ra[o];c.blockedOn===t&&(c.blockedOn=null)}}for(qi!==null&&ro(qi,t),Yi!==null&&ro(Yi,t),$i!==null&&ro($i,t),to.forEach(i),no.forEach(i),o=0;o<Ki.length;o++)c=Ki[o],c.blockedOn===t&&(c.blockedOn=null);for(;0<Ki.length&&(o=Ki[0],o.blockedOn===null);)Mf(o),o.blockedOn===null&&Ki.shift()}var ns=C.ReactCurrentBatchConfig,oa=!0;function Yg(t,i,o,c){var f=wt,p=ns.transition;ns.transition=null;try{wt=1,Zl(t,i,o,c)}finally{wt=f,ns.transition=p}}function $g(t,i,o,c){var f=wt,p=ns.transition;ns.transition=null;try{wt=4,Zl(t,i,o,c)}finally{wt=f,ns.transition=p}}function Zl(t,i,o,c){if(oa){var f=Ql(t,i,o,c);if(f===null)mc(t,i,c,aa,o),Sf(t,c);else if(Xg(f,t,i,o,c))c.stopPropagation();else if(Sf(t,c),i&4&&-1<jg.indexOf(t)){for(;f!==null;){var p=vo(f);if(p!==null&&_f(p),p=Ql(t,i,o,c),p===null&&mc(t,i,c,aa,o),p===f)break;f=p}f!==null&&c.stopPropagation()}else mc(t,i,c,null,o)}}var aa=null;function Ql(t,i,o,c){if(aa=null,t=j(c),t=wr(t),t!==null)if(i=hi(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Jo(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return aa=t,null}function Tf(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(q()){case Ee:return 1;case Le:return 4;case ke:case Ve:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Zi=null,Jl=null,la=null;function wf(){if(la)return la;var t,i=Jl,o=i.length,c,f="value"in Zi?Zi.value:Zi.textContent,p=f.length;for(t=0;t<o&&i[t]===f[t];t++);var M=o-t;for(c=1;c<=M&&i[o-c]===f[p-c];c++);return la=f.slice(t,1<c?1-c:void 0)}function ca(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function ua(){return!0}function Af(){return!1}function On(t){function i(o,c,f,p,M){this._reactName=o,this._targetInst=f,this.type=c,this.nativeEvent=p,this.target=M,this.currentTarget=null;for(var F in t)t.hasOwnProperty(F)&&(o=t[F],this[F]=o?o(p):p[F]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?ua:Af,this.isPropagationStopped=Af,this}return te(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=ua)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=ua)},persist:function(){},isPersistent:ua}),i}var is={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ec=On(is),oo=te({},is,{view:0,detail:0}),Kg=On(oo),tc,nc,ao,da=te({},oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ao&&(ao&&t.type==="mousemove"?(tc=t.screenX-ao.screenX,nc=t.screenY-ao.screenY):nc=tc=0,ao=t),tc)},movementY:function(t){return"movementY"in t?t.movementY:nc}}),Cf=On(da),Zg=te({},da,{dataTransfer:0}),Qg=On(Zg),Jg=te({},oo,{relatedTarget:0}),ic=On(Jg),e0=te({},is,{animationName:0,elapsedTime:0,pseudoElement:0}),t0=On(e0),n0=te({},is,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),i0=On(n0),r0=te({},is,{data:0}),Rf=On(r0),s0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},o0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},a0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function l0(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=a0[t])?!!i[t]:!1}function rc(){return l0}var c0=te({},oo,{key:function(t){if(t.key){var i=s0[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=ca(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?o0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rc,charCode:function(t){return t.type==="keypress"?ca(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ca(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),u0=On(c0),d0=te({},da,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bf=On(d0),f0=te({},oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rc}),h0=On(f0),p0=te({},is,{propertyName:0,elapsedTime:0,pseudoElement:0}),m0=On(p0),g0=te({},da,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),_0=On(g0),v0=[9,13,27,32],sc=d&&"CompositionEvent"in window,lo=null;d&&"documentMode"in document&&(lo=document.documentMode);var x0=d&&"TextEvent"in window&&!lo,Pf=d&&(!sc||lo&&8<lo&&11>=lo),Nf=" ",Lf=!1;function Df(t,i){switch(t){case"keyup":return v0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function If(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rs=!1;function y0(t,i){switch(t){case"compositionend":return If(i);case"keypress":return i.which!==32?null:(Lf=!0,Nf);case"textInput":return t=i.data,t===Nf&&Lf?null:t;default:return null}}function S0(t,i){if(rs)return t==="compositionend"||!sc&&Df(t,i)?(t=wf(),la=Jl=Zi=null,rs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Pf&&i.locale!=="ko"?null:i.data;default:return null}}var M0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Uf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!M0[t.type]:i==="textarea"}function Ff(t,i,o,c){Ie(c),i=ga(i,"onChange"),0<i.length&&(o=new ec("onChange","change",null,o,c),t.push({event:o,listeners:i}))}var co=null,uo=null;function E0(t){eh(t,0)}function fa(t){var i=cs(t);if(bt(i))return t}function T0(t,i){if(t==="change")return i}var Of=!1;if(d){var oc;if(d){var ac="oninput"in document;if(!ac){var kf=document.createElement("div");kf.setAttribute("oninput","return;"),ac=typeof kf.oninput=="function"}oc=ac}else oc=!1;Of=oc&&(!document.documentMode||9<document.documentMode)}function Bf(){co&&(co.detachEvent("onpropertychange",zf),uo=co=null)}function zf(t){if(t.propertyName==="value"&&fa(uo)){var i=[];Ff(i,uo,t,j(t)),bn(E0,i)}}function w0(t,i,o){t==="focusin"?(Bf(),co=i,uo=o,co.attachEvent("onpropertychange",zf)):t==="focusout"&&Bf()}function A0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return fa(uo)}function C0(t,i){if(t==="click")return fa(i)}function R0(t,i){if(t==="input"||t==="change")return fa(i)}function b0(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ni=typeof Object.is=="function"?Object.is:b0;function fo(t,i){if(ni(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var f=o[c];if(!h.call(i,f)||!ni(t[f],i[f]))return!1}return!0}function Hf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Vf(t,i){var o=Hf(t);t=0;for(var c;o;){if(o.nodeType===3){if(c=t+o.textContent.length,t<=i&&c>=i)return{node:o,offset:i-t};t=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Hf(o)}}function Gf(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Gf(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Wf(){for(var t=window,i=ct();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=ct(t.document)}return i}function lc(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function P0(t){var i=Wf(),o=t.focusedElem,c=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&Gf(o.ownerDocument.documentElement,o)){if(c!==null&&lc(o)){if(i=c.start,t=c.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var f=o.textContent.length,p=Math.min(c.start,f);c=c.end===void 0?p:Math.min(c.end,f),!t.extend&&p>c&&(f=c,c=p,p=f),f=Vf(o,p);var M=Vf(o,c);f&&M&&(t.rangeCount!==1||t.anchorNode!==f.node||t.anchorOffset!==f.offset||t.focusNode!==M.node||t.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(f.node,f.offset),t.removeAllRanges(),p>c?(t.addRange(i),t.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var N0=d&&"documentMode"in document&&11>=document.documentMode,ss=null,cc=null,ho=null,uc=!1;function jf(t,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;uc||ss==null||ss!==ct(c)||(c=ss,"selectionStart"in c&&lc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),ho&&fo(ho,c)||(ho=c,c=ga(cc,"onSelect"),0<c.length&&(i=new ec("onSelect","select",null,i,o),t.push({event:i,listeners:c}),i.target=ss)))}function ha(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var os={animationend:ha("Animation","AnimationEnd"),animationiteration:ha("Animation","AnimationIteration"),animationstart:ha("Animation","AnimationStart"),transitionend:ha("Transition","TransitionEnd")},dc={},Xf={};d&&(Xf=document.createElement("div").style,"AnimationEvent"in window||(delete os.animationend.animation,delete os.animationiteration.animation,delete os.animationstart.animation),"TransitionEvent"in window||delete os.transitionend.transition);function pa(t){if(dc[t])return dc[t];if(!os[t])return t;var i=os[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in Xf)return dc[t]=i[o];return t}var qf=pa("animationend"),Yf=pa("animationiteration"),$f=pa("animationstart"),Kf=pa("transitionend"),Zf=new Map,Qf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qi(t,i){Zf.set(t,i),l(i,[t])}for(var fc=0;fc<Qf.length;fc++){var hc=Qf[fc],L0=hc.toLowerCase(),D0=hc[0].toUpperCase()+hc.slice(1);Qi(L0,"on"+D0)}Qi(qf,"onAnimationEnd"),Qi(Yf,"onAnimationIteration"),Qi($f,"onAnimationStart"),Qi("dblclick","onDoubleClick"),Qi("focusin","onFocus"),Qi("focusout","onBlur"),Qi(Kf,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),I0=new Set("cancel close invalid load scroll toggle".split(" ").concat(po));function Jf(t,i,o){var c=t.type||"unknown-event";t.currentTarget=o,Qo(c,i,void 0,t),t.currentTarget=null}function eh(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var c=t[o],f=c.event;c=c.listeners;e:{var p=void 0;if(i)for(var M=c.length-1;0<=M;M--){var F=c[M],V=F.instance,se=F.currentTarget;if(F=F.listener,V!==p&&f.isPropagationStopped())break e;Jf(f,F,se),p=V}else for(M=0;M<c.length;M++){if(F=c[M],V=F.instance,se=F.currentTarget,F=F.listener,V!==p&&f.isPropagationStopped())break e;Jf(f,F,se),p=V}}}if(Tr)throw t=ji,Tr=!1,ji=null,t}function kt(t,i){var o=i[Sc];o===void 0&&(o=i[Sc]=new Set);var c=t+"__bubble";o.has(c)||(th(i,t,2,!1),o.add(c))}function pc(t,i,o){var c=0;i&&(c|=4),th(o,t,c,i)}var ma="_reactListening"+Math.random().toString(36).slice(2);function mo(t){if(!t[ma]){t[ma]=!0,r.forEach(function(o){o!=="selectionchange"&&(I0.has(o)||pc(o,!1,t),pc(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[ma]||(i[ma]=!0,pc("selectionchange",!1,i))}}function th(t,i,o,c){switch(Tf(i)){case 1:var f=Yg;break;case 4:f=$g;break;default:f=Zl}o=f.bind(null,i,o,t),f=void 0,!es||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),c?f!==void 0?t.addEventListener(i,o,{capture:!0,passive:f}):t.addEventListener(i,o,!0):f!==void 0?t.addEventListener(i,o,{passive:f}):t.addEventListener(i,o,!1)}function mc(t,i,o,c,f){var p=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var M=c.tag;if(M===3||M===4){var F=c.stateNode.containerInfo;if(F===f||F.nodeType===8&&F.parentNode===f)break;if(M===4)for(M=c.return;M!==null;){var V=M.tag;if((V===3||V===4)&&(V=M.stateNode.containerInfo,V===f||V.nodeType===8&&V.parentNode===f))return;M=M.return}for(;F!==null;){if(M=wr(F),M===null)return;if(V=M.tag,V===5||V===6){c=p=M;continue e}F=F.parentNode}}c=c.return}bn(function(){var se=p,ye=j(o),Me=[];e:{var ve=Zf.get(t);if(ve!==void 0){var Be=ec,We=t;switch(t){case"keypress":if(ca(o)===0)break e;case"keydown":case"keyup":Be=u0;break;case"focusin":We="focus",Be=ic;break;case"focusout":We="blur",Be=ic;break;case"beforeblur":case"afterblur":Be=ic;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Be=Cf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Be=Qg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Be=h0;break;case qf:case Yf:case $f:Be=t0;break;case Kf:Be=m0;break;case"scroll":Be=Kg;break;case"wheel":Be=_0;break;case"copy":case"cut":case"paste":Be=i0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Be=bf}var qe=(i&4)!==0,qt=!qe&&t==="scroll",$=qe?ve!==null?ve+"Capture":null:ve;qe=[];for(var W=se,ee;W!==null;){ee=W;var Te=ee.stateNode;if(ee.tag===5&&Te!==null&&(ee=Te,$!==null&&(Te=Mn(W,$),Te!=null&&qe.push(go(W,Te,ee)))),qt)break;W=W.return}0<qe.length&&(ve=new Be(ve,We,null,o,ye),Me.push({event:ve,listeners:qe}))}}if((i&7)===0){e:{if(ve=t==="mouseover"||t==="pointerover",Be=t==="mouseout"||t==="pointerout",ve&&o!==Mt&&(We=o.relatedTarget||o.fromElement)&&(wr(We)||We[Ci]))break e;if((Be||ve)&&(ve=ye.window===ye?ye:(ve=ye.ownerDocument)?ve.defaultView||ve.parentWindow:window,Be?(We=o.relatedTarget||o.toElement,Be=se,We=We?wr(We):null,We!==null&&(qt=hi(We),We!==qt||We.tag!==5&&We.tag!==6)&&(We=null)):(Be=null,We=se),Be!==We)){if(qe=Cf,Te="onMouseLeave",$="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(qe=bf,Te="onPointerLeave",$="onPointerEnter",W="pointer"),qt=Be==null?ve:cs(Be),ee=We==null?ve:cs(We),ve=new qe(Te,W+"leave",Be,o,ye),ve.target=qt,ve.relatedTarget=ee,Te=null,wr(ye)===se&&(qe=new qe($,W+"enter",We,o,ye),qe.target=ee,qe.relatedTarget=qt,Te=qe),qt=Te,Be&&We)t:{for(qe=Be,$=We,W=0,ee=qe;ee;ee=as(ee))W++;for(ee=0,Te=$;Te;Te=as(Te))ee++;for(;0<W-ee;)qe=as(qe),W--;for(;0<ee-W;)$=as($),ee--;for(;W--;){if(qe===$||$!==null&&qe===$.alternate)break t;qe=as(qe),$=as($)}qe=null}else qe=null;Be!==null&&nh(Me,ve,Be,qe,!1),We!==null&&qt!==null&&nh(Me,qt,We,qe,!0)}}e:{if(ve=se?cs(se):window,Be=ve.nodeName&&ve.nodeName.toLowerCase(),Be==="select"||Be==="input"&&ve.type==="file")var Ke=T0;else if(Uf(ve))if(Of)Ke=R0;else{Ke=A0;var Je=w0}else(Be=ve.nodeName)&&Be.toLowerCase()==="input"&&(ve.type==="checkbox"||ve.type==="radio")&&(Ke=C0);if(Ke&&(Ke=Ke(t,se))){Ff(Me,Ke,o,ye);break e}Je&&Je(t,ve,se),t==="focusout"&&(Je=ve._wrapperState)&&Je.controlled&&ve.type==="number"&&ht(ve,"number",ve.value)}switch(Je=se?cs(se):window,t){case"focusin":(Uf(Je)||Je.contentEditable==="true")&&(ss=Je,cc=se,ho=null);break;case"focusout":ho=cc=ss=null;break;case"mousedown":uc=!0;break;case"contextmenu":case"mouseup":case"dragend":uc=!1,jf(Me,o,ye);break;case"selectionchange":if(N0)break;case"keydown":case"keyup":jf(Me,o,ye)}var et;if(sc)e:{switch(t){case"compositionstart":var st="onCompositionStart";break e;case"compositionend":st="onCompositionEnd";break e;case"compositionupdate":st="onCompositionUpdate";break e}st=void 0}else rs?Df(t,o)&&(st="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(st="onCompositionStart");st&&(Pf&&o.locale!=="ko"&&(rs||st!=="onCompositionStart"?st==="onCompositionEnd"&&rs&&(et=wf()):(Zi=ye,Jl="value"in Zi?Zi.value:Zi.textContent,rs=!0)),Je=ga(se,st),0<Je.length&&(st=new Rf(st,t,null,o,ye),Me.push({event:st,listeners:Je}),et?st.data=et:(et=If(o),et!==null&&(st.data=et)))),(et=x0?y0(t,o):S0(t,o))&&(se=ga(se,"onBeforeInput"),0<se.length&&(ye=new Rf("onBeforeInput","beforeinput",null,o,ye),Me.push({event:ye,listeners:se}),ye.data=et))}eh(Me,i)})}function go(t,i,o){return{instance:t,listener:i,currentTarget:o}}function ga(t,i){for(var o=i+"Capture",c=[];t!==null;){var f=t,p=f.stateNode;f.tag===5&&p!==null&&(f=p,p=Mn(t,o),p!=null&&c.unshift(go(t,p,f)),p=Mn(t,i),p!=null&&c.push(go(t,p,f))),t=t.return}return c}function as(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function nh(t,i,o,c,f){for(var p=i._reactName,M=[];o!==null&&o!==c;){var F=o,V=F.alternate,se=F.stateNode;if(V!==null&&V===c)break;F.tag===5&&se!==null&&(F=se,f?(V=Mn(o,p),V!=null&&M.unshift(go(o,V,F))):f||(V=Mn(o,p),V!=null&&M.push(go(o,V,F)))),o=o.return}M.length!==0&&t.push({event:i,listeners:M})}var U0=/\r\n?/g,F0=/\u0000|\uFFFD/g;function ih(t){return(typeof t=="string"?t:""+t).replace(U0,`
`).replace(F0,"")}function _a(t,i,o){if(i=ih(i),ih(t)!==i&&o)throw Error(n(425))}function va(){}var gc=null,_c=null;function vc(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var xc=typeof setTimeout=="function"?setTimeout:void 0,O0=typeof clearTimeout=="function"?clearTimeout:void 0,rh=typeof Promise=="function"?Promise:void 0,k0=typeof queueMicrotask=="function"?queueMicrotask:typeof rh<"u"?function(t){return rh.resolve(null).then(t).catch(B0)}:xc;function B0(t){setTimeout(function(){throw t})}function yc(t,i){var o=i,c=0;do{var f=o.nextSibling;if(t.removeChild(o),f&&f.nodeType===8)if(o=f.data,o==="/$"){if(c===0){t.removeChild(f),so(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=f}while(o);so(i)}function Ji(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function sh(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var ls=Math.random().toString(36).slice(2),mi="__reactFiber$"+ls,_o="__reactProps$"+ls,Ci="__reactContainer$"+ls,Sc="__reactEvents$"+ls,z0="__reactListeners$"+ls,H0="__reactHandles$"+ls;function wr(t){var i=t[mi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ci]||o[mi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=sh(t);t!==null;){if(o=t[mi])return o;t=sh(t)}return i}t=o,o=t.parentNode}return null}function vo(t){return t=t[mi]||t[Ci],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function cs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function xa(t){return t[_o]||null}var Mc=[],us=-1;function er(t){return{current:t}}function Bt(t){0>us||(t.current=Mc[us],Mc[us]=null,us--)}function Ft(t,i){us++,Mc[us]=t.current,t.current=i}var tr={},mn=er(tr),Pn=er(!1),Ar=tr;function ds(t,i){var o=t.type.contextTypes;if(!o)return tr;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var f={},p;for(p in o)f[p]=i[p];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=f),f}function Nn(t){return t=t.childContextTypes,t!=null}function ya(){Bt(Pn),Bt(mn)}function oh(t,i,o){if(mn.current!==tr)throw Error(n(168));Ft(mn,i),Ft(Pn,o)}function ah(t,i,o){var c=t.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var f in c)if(!(f in i))throw Error(n(108,xe(t)||"Unknown",f));return te({},o,c)}function Sa(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||tr,Ar=mn.current,Ft(mn,t),Ft(Pn,Pn.current),!0}function lh(t,i,o){var c=t.stateNode;if(!c)throw Error(n(169));o?(t=ah(t,i,Ar),c.__reactInternalMemoizedMergedChildContext=t,Bt(Pn),Bt(mn),Ft(mn,t)):Bt(Pn),Ft(Pn,o)}var Ri=null,Ma=!1,Ec=!1;function ch(t){Ri===null?Ri=[t]:Ri.push(t)}function V0(t){Ma=!0,ch(t)}function nr(){if(!Ec&&Ri!==null){Ec=!0;var t=0,i=wt;try{var o=Ri;for(wt=1;t<o.length;t++){var c=o[t];do c=c(!0);while(c!==null)}Ri=null,Ma=!1}catch(f){throw Ri!==null&&(Ri=Ri.slice(t+1)),ia(Ee,nr),f}finally{wt=i,Ec=!1}}return null}var fs=[],hs=0,Ea=null,Ta=0,Yn=[],$n=0,Cr=null,bi=1,Pi="";function Rr(t,i){fs[hs++]=Ta,fs[hs++]=Ea,Ea=t,Ta=i}function uh(t,i,o){Yn[$n++]=bi,Yn[$n++]=Pi,Yn[$n++]=Cr,Cr=t;var c=bi;t=Pi;var f=32-ut(c)-1;c&=~(1<<f),o+=1;var p=32-ut(i)+f;if(30<p){var M=f-f%5;p=(c&(1<<M)-1).toString(32),c>>=M,f-=M,bi=1<<32-ut(i)+f|o<<f|c,Pi=p+t}else bi=1<<p|o<<f|c,Pi=t}function Tc(t){t.return!==null&&(Rr(t,1),uh(t,1,0))}function wc(t){for(;t===Ea;)Ea=fs[--hs],fs[hs]=null,Ta=fs[--hs],fs[hs]=null;for(;t===Cr;)Cr=Yn[--$n],Yn[$n]=null,Pi=Yn[--$n],Yn[$n]=null,bi=Yn[--$n],Yn[$n]=null}var kn=null,Bn=null,Ht=!1,ii=null;function dh(t,i){var o=Jn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function fh(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,kn=t,Bn=Ji(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,kn=t,Bn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Cr!==null?{id:bi,overflow:Pi}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Jn(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,kn=t,Bn=null,!0):!1;default:return!1}}function Ac(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Cc(t){if(Ht){var i=Bn;if(i){var o=i;if(!fh(t,i)){if(Ac(t))throw Error(n(418));i=Ji(o.nextSibling);var c=kn;i&&fh(t,i)?dh(c,o):(t.flags=t.flags&-4097|2,Ht=!1,kn=t)}}else{if(Ac(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ht=!1,kn=t}}}function hh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;kn=t}function wa(t){if(t!==kn)return!1;if(!Ht)return hh(t),Ht=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!vc(t.type,t.memoizedProps)),i&&(i=Bn)){if(Ac(t))throw ph(),Error(n(418));for(;i;)dh(t,i),i=Ji(i.nextSibling)}if(hh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){Bn=Ji(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}Bn=null}}else Bn=kn?Ji(t.stateNode.nextSibling):null;return!0}function ph(){for(var t=Bn;t;)t=Ji(t.nextSibling)}function ps(){Bn=kn=null,Ht=!1}function Rc(t){ii===null?ii=[t]:ii.push(t)}var G0=C.ReactCurrentBatchConfig;function xo(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var c=o.stateNode}if(!c)throw Error(n(147,t));var f=c,p=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(M){var F=f.refs;M===null?delete F[p]:F[p]=M},i._stringRef=p,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Aa(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function mh(t){var i=t._init;return i(t._payload)}function gh(t){function i($,W){if(t){var ee=$.deletions;ee===null?($.deletions=[W],$.flags|=16):ee.push(W)}}function o($,W){if(!t)return null;for(;W!==null;)i($,W),W=W.sibling;return null}function c($,W){for($=new Map;W!==null;)W.key!==null?$.set(W.key,W):$.set(W.index,W),W=W.sibling;return $}function f($,W){return $=ur($,W),$.index=0,$.sibling=null,$}function p($,W,ee){return $.index=ee,t?(ee=$.alternate,ee!==null?(ee=ee.index,ee<W?($.flags|=2,W):ee):($.flags|=2,W)):($.flags|=1048576,W)}function M($){return t&&$.alternate===null&&($.flags|=2),$}function F($,W,ee,Te){return W===null||W.tag!==6?(W=xu(ee,$.mode,Te),W.return=$,W):(W=f(W,ee),W.return=$,W)}function V($,W,ee,Te){var Ke=ee.type;return Ke===O?ye($,W,ee.props.children,Te,ee.key):W!==null&&(W.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===oe&&mh(Ke)===W.type)?(Te=f(W,ee.props),Te.ref=xo($,W,ee),Te.return=$,Te):(Te=Ka(ee.type,ee.key,ee.props,null,$.mode,Te),Te.ref=xo($,W,ee),Te.return=$,Te)}function se($,W,ee,Te){return W===null||W.tag!==4||W.stateNode.containerInfo!==ee.containerInfo||W.stateNode.implementation!==ee.implementation?(W=yu(ee,$.mode,Te),W.return=$,W):(W=f(W,ee.children||[]),W.return=$,W)}function ye($,W,ee,Te,Ke){return W===null||W.tag!==7?(W=Fr(ee,$.mode,Te,Ke),W.return=$,W):(W=f(W,ee),W.return=$,W)}function Me($,W,ee){if(typeof W=="string"&&W!==""||typeof W=="number")return W=xu(""+W,$.mode,ee),W.return=$,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case B:return ee=Ka(W.type,W.key,W.props,null,$.mode,ee),ee.ref=xo($,null,W),ee.return=$,ee;case U:return W=yu(W,$.mode,ee),W.return=$,W;case oe:var Te=W._init;return Me($,Te(W._payload),ee)}if(Fe(W)||ce(W))return W=Fr(W,$.mode,ee,null),W.return=$,W;Aa($,W)}return null}function ve($,W,ee,Te){var Ke=W!==null?W.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number")return Ke!==null?null:F($,W,""+ee,Te);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case B:return ee.key===Ke?V($,W,ee,Te):null;case U:return ee.key===Ke?se($,W,ee,Te):null;case oe:return Ke=ee._init,ve($,W,Ke(ee._payload),Te)}if(Fe(ee)||ce(ee))return Ke!==null?null:ye($,W,ee,Te,null);Aa($,ee)}return null}function Be($,W,ee,Te,Ke){if(typeof Te=="string"&&Te!==""||typeof Te=="number")return $=$.get(ee)||null,F(W,$,""+Te,Ke);if(typeof Te=="object"&&Te!==null){switch(Te.$$typeof){case B:return $=$.get(Te.key===null?ee:Te.key)||null,V(W,$,Te,Ke);case U:return $=$.get(Te.key===null?ee:Te.key)||null,se(W,$,Te,Ke);case oe:var Je=Te._init;return Be($,W,ee,Je(Te._payload),Ke)}if(Fe(Te)||ce(Te))return $=$.get(ee)||null,ye(W,$,Te,Ke,null);Aa(W,Te)}return null}function We($,W,ee,Te){for(var Ke=null,Je=null,et=W,st=W=0,ln=null;et!==null&&st<ee.length;st++){et.index>st?(ln=et,et=null):ln=et.sibling;var Ct=ve($,et,ee[st],Te);if(Ct===null){et===null&&(et=ln);break}t&&et&&Ct.alternate===null&&i($,et),W=p(Ct,W,st),Je===null?Ke=Ct:Je.sibling=Ct,Je=Ct,et=ln}if(st===ee.length)return o($,et),Ht&&Rr($,st),Ke;if(et===null){for(;st<ee.length;st++)et=Me($,ee[st],Te),et!==null&&(W=p(et,W,st),Je===null?Ke=et:Je.sibling=et,Je=et);return Ht&&Rr($,st),Ke}for(et=c($,et);st<ee.length;st++)ln=Be(et,$,st,ee[st],Te),ln!==null&&(t&&ln.alternate!==null&&et.delete(ln.key===null?st:ln.key),W=p(ln,W,st),Je===null?Ke=ln:Je.sibling=ln,Je=ln);return t&&et.forEach(function(dr){return i($,dr)}),Ht&&Rr($,st),Ke}function qe($,W,ee,Te){var Ke=ce(ee);if(typeof Ke!="function")throw Error(n(150));if(ee=Ke.call(ee),ee==null)throw Error(n(151));for(var Je=Ke=null,et=W,st=W=0,ln=null,Ct=ee.next();et!==null&&!Ct.done;st++,Ct=ee.next()){et.index>st?(ln=et,et=null):ln=et.sibling;var dr=ve($,et,Ct.value,Te);if(dr===null){et===null&&(et=ln);break}t&&et&&dr.alternate===null&&i($,et),W=p(dr,W,st),Je===null?Ke=dr:Je.sibling=dr,Je=dr,et=ln}if(Ct.done)return o($,et),Ht&&Rr($,st),Ke;if(et===null){for(;!Ct.done;st++,Ct=ee.next())Ct=Me($,Ct.value,Te),Ct!==null&&(W=p(Ct,W,st),Je===null?Ke=Ct:Je.sibling=Ct,Je=Ct);return Ht&&Rr($,st),Ke}for(et=c($,et);!Ct.done;st++,Ct=ee.next())Ct=Be(et,$,st,Ct.value,Te),Ct!==null&&(t&&Ct.alternate!==null&&et.delete(Ct.key===null?st:Ct.key),W=p(Ct,W,st),Je===null?Ke=Ct:Je.sibling=Ct,Je=Ct);return t&&et.forEach(function(M_){return i($,M_)}),Ht&&Rr($,st),Ke}function qt($,W,ee,Te){if(typeof ee=="object"&&ee!==null&&ee.type===O&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case B:e:{for(var Ke=ee.key,Je=W;Je!==null;){if(Je.key===Ke){if(Ke=ee.type,Ke===O){if(Je.tag===7){o($,Je.sibling),W=f(Je,ee.props.children),W.return=$,$=W;break e}}else if(Je.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===oe&&mh(Ke)===Je.type){o($,Je.sibling),W=f(Je,ee.props),W.ref=xo($,Je,ee),W.return=$,$=W;break e}o($,Je);break}else i($,Je);Je=Je.sibling}ee.type===O?(W=Fr(ee.props.children,$.mode,Te,ee.key),W.return=$,$=W):(Te=Ka(ee.type,ee.key,ee.props,null,$.mode,Te),Te.ref=xo($,W,ee),Te.return=$,$=Te)}return M($);case U:e:{for(Je=ee.key;W!==null;){if(W.key===Je)if(W.tag===4&&W.stateNode.containerInfo===ee.containerInfo&&W.stateNode.implementation===ee.implementation){o($,W.sibling),W=f(W,ee.children||[]),W.return=$,$=W;break e}else{o($,W);break}else i($,W);W=W.sibling}W=yu(ee,$.mode,Te),W.return=$,$=W}return M($);case oe:return Je=ee._init,qt($,W,Je(ee._payload),Te)}if(Fe(ee))return We($,W,ee,Te);if(ce(ee))return qe($,W,ee,Te);Aa($,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"?(ee=""+ee,W!==null&&W.tag===6?(o($,W.sibling),W=f(W,ee),W.return=$,$=W):(o($,W),W=xu(ee,$.mode,Te),W.return=$,$=W),M($)):o($,W)}return qt}var ms=gh(!0),_h=gh(!1),Ca=er(null),Ra=null,gs=null,bc=null;function Pc(){bc=gs=Ra=null}function Nc(t){var i=Ca.current;Bt(Ca),t._currentValue=i}function Lc(t,i,o){for(;t!==null;){var c=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),t===o)break;t=t.return}}function _s(t,i){Ra=t,bc=gs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(Ln=!0),t.firstContext=null)}function Kn(t){var i=t._currentValue;if(bc!==t)if(t={context:t,memoizedValue:i,next:null},gs===null){if(Ra===null)throw Error(n(308));gs=t,Ra.dependencies={lanes:0,firstContext:t}}else gs=gs.next=t;return i}var br=null;function Dc(t){br===null?br=[t]:br.push(t)}function vh(t,i,o,c){var f=i.interleaved;return f===null?(o.next=o,Dc(i)):(o.next=f.next,f.next=o),i.interleaved=o,Ni(t,c)}function Ni(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var ir=!1;function Ic(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function xh(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Li(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function rr(t,i,o){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(At&2)!==0){var f=c.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),c.pending=i,Ni(t,o)}return f=c.interleaved,f===null?(i.next=i,Dc(c)):(i.next=f.next,f.next=i),c.interleaved=i,Ni(t,o)}function ba(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,sn(t,o)}}function yh(t,i){var o=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var f=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var M={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?f=p=M:p=p.next=M,o=o.next}while(o!==null);p===null?f=p=i:p=p.next=i}else f=p=i;o={baseState:c.baseState,firstBaseUpdate:f,lastBaseUpdate:p,shared:c.shared,effects:c.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Pa(t,i,o,c){var f=t.updateQueue;ir=!1;var p=f.firstBaseUpdate,M=f.lastBaseUpdate,F=f.shared.pending;if(F!==null){f.shared.pending=null;var V=F,se=V.next;V.next=null,M===null?p=se:M.next=se,M=V;var ye=t.alternate;ye!==null&&(ye=ye.updateQueue,F=ye.lastBaseUpdate,F!==M&&(F===null?ye.firstBaseUpdate=se:F.next=se,ye.lastBaseUpdate=V))}if(p!==null){var Me=f.baseState;M=0,ye=se=V=null,F=p;do{var ve=F.lane,Be=F.eventTime;if((c&ve)===ve){ye!==null&&(ye=ye.next={eventTime:Be,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var We=t,qe=F;switch(ve=i,Be=o,qe.tag){case 1:if(We=qe.payload,typeof We=="function"){Me=We.call(Be,Me,ve);break e}Me=We;break e;case 3:We.flags=We.flags&-65537|128;case 0:if(We=qe.payload,ve=typeof We=="function"?We.call(Be,Me,ve):We,ve==null)break e;Me=te({},Me,ve);break e;case 2:ir=!0}}F.callback!==null&&F.lane!==0&&(t.flags|=64,ve=f.effects,ve===null?f.effects=[F]:ve.push(F))}else Be={eventTime:Be,lane:ve,tag:F.tag,payload:F.payload,callback:F.callback,next:null},ye===null?(se=ye=Be,V=Me):ye=ye.next=Be,M|=ve;if(F=F.next,F===null){if(F=f.shared.pending,F===null)break;ve=F,F=ve.next,ve.next=null,f.lastBaseUpdate=ve,f.shared.pending=null}}while(!0);if(ye===null&&(V=Me),f.baseState=V,f.firstBaseUpdate=se,f.lastBaseUpdate=ye,i=f.shared.interleaved,i!==null){f=i;do M|=f.lane,f=f.next;while(f!==i)}else p===null&&(f.shared.lanes=0);Lr|=M,t.lanes=M,t.memoizedState=Me}}function Sh(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var c=t[i],f=c.callback;if(f!==null){if(c.callback=null,c=o,typeof f!="function")throw Error(n(191,f));f.call(c)}}}var yo={},gi=er(yo),So=er(yo),Mo=er(yo);function Pr(t){if(t===yo)throw Error(n(174));return t}function Uc(t,i){switch(Ft(Mo,i),Ft(So,t),Ft(gi,yo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Ge(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=Ge(i,t)}Bt(gi),Ft(gi,i)}function vs(){Bt(gi),Bt(So),Bt(Mo)}function Mh(t){Pr(Mo.current);var i=Pr(gi.current),o=Ge(i,t.type);i!==o&&(Ft(So,t),Ft(gi,o))}function Fc(t){So.current===t&&(Bt(gi),Bt(So))}var Vt=er(0);function Na(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Oc=[];function kc(){for(var t=0;t<Oc.length;t++)Oc[t]._workInProgressVersionPrimary=null;Oc.length=0}var La=C.ReactCurrentDispatcher,Bc=C.ReactCurrentBatchConfig,Nr=0,Gt=null,Qt=null,on=null,Da=!1,Eo=!1,To=0,W0=0;function gn(){throw Error(n(321))}function zc(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ni(t[o],i[o]))return!1;return!0}function Hc(t,i,o,c,f,p){if(Nr=p,Gt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,La.current=t===null||t.memoizedState===null?Y0:$0,t=o(c,f),Eo){p=0;do{if(Eo=!1,To=0,25<=p)throw Error(n(301));p+=1,on=Qt=null,i.updateQueue=null,La.current=K0,t=o(c,f)}while(Eo)}if(La.current=Fa,i=Qt!==null&&Qt.next!==null,Nr=0,on=Qt=Gt=null,Da=!1,i)throw Error(n(300));return t}function Vc(){var t=To!==0;return To=0,t}function _i(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?Gt.memoizedState=on=t:on=on.next=t,on}function Zn(){if(Qt===null){var t=Gt.alternate;t=t!==null?t.memoizedState:null}else t=Qt.next;var i=on===null?Gt.memoizedState:on.next;if(i!==null)on=i,Qt=t;else{if(t===null)throw Error(n(310));Qt=t,t={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},on===null?Gt.memoizedState=on=t:on=on.next=t}return on}function wo(t,i){return typeof i=="function"?i(t):i}function Gc(t){var i=Zn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=Qt,f=c.baseQueue,p=o.pending;if(p!==null){if(f!==null){var M=f.next;f.next=p.next,p.next=M}c.baseQueue=f=p,o.pending=null}if(f!==null){p=f.next,c=c.baseState;var F=M=null,V=null,se=p;do{var ye=se.lane;if((Nr&ye)===ye)V!==null&&(V=V.next={lane:0,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null}),c=se.hasEagerState?se.eagerState:t(c,se.action);else{var Me={lane:ye,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null};V===null?(F=V=Me,M=c):V=V.next=Me,Gt.lanes|=ye,Lr|=ye}se=se.next}while(se!==null&&se!==p);V===null?M=c:V.next=F,ni(c,i.memoizedState)||(Ln=!0),i.memoizedState=c,i.baseState=M,i.baseQueue=V,o.lastRenderedState=c}if(t=o.interleaved,t!==null){f=t;do p=f.lane,Gt.lanes|=p,Lr|=p,f=f.next;while(f!==t)}else f===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Wc(t){var i=Zn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=o.dispatch,f=o.pending,p=i.memoizedState;if(f!==null){o.pending=null;var M=f=f.next;do p=t(p,M.action),M=M.next;while(M!==f);ni(p,i.memoizedState)||(Ln=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,c]}function Eh(){}function Th(t,i){var o=Gt,c=Zn(),f=i(),p=!ni(c.memoizedState,f);if(p&&(c.memoizedState=f,Ln=!0),c=c.queue,jc(Ch.bind(null,o,c,t),[t]),c.getSnapshot!==i||p||on!==null&&on.memoizedState.tag&1){if(o.flags|=2048,Ao(9,Ah.bind(null,o,c,f,i),void 0,null),an===null)throw Error(n(349));(Nr&30)!==0||wh(o,i,f)}return f}function wh(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function Ah(t,i,o,c){i.value=o,i.getSnapshot=c,Rh(i)&&bh(t)}function Ch(t,i,o){return o(function(){Rh(i)&&bh(t)})}function Rh(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ni(t,o)}catch{return!0}}function bh(t){var i=Ni(t,1);i!==null&&ai(i,t,1,-1)}function Ph(t){var i=_i();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},i.queue=t,t=t.dispatch=q0.bind(null,Gt,t),[i.memoizedState,t]}function Ao(t,i,o,c){return t={tag:t,create:i,destroy:o,deps:c,next:null},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(c=o.next,o.next=t,t.next=c,i.lastEffect=t)),t}function Nh(){return Zn().memoizedState}function Ia(t,i,o,c){var f=_i();Gt.flags|=t,f.memoizedState=Ao(1|i,o,void 0,c===void 0?null:c)}function Ua(t,i,o,c){var f=Zn();c=c===void 0?null:c;var p=void 0;if(Qt!==null){var M=Qt.memoizedState;if(p=M.destroy,c!==null&&zc(c,M.deps)){f.memoizedState=Ao(i,o,p,c);return}}Gt.flags|=t,f.memoizedState=Ao(1|i,o,p,c)}function Lh(t,i){return Ia(8390656,8,t,i)}function jc(t,i){return Ua(2048,8,t,i)}function Dh(t,i){return Ua(4,2,t,i)}function Ih(t,i){return Ua(4,4,t,i)}function Uh(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function Fh(t,i,o){return o=o!=null?o.concat([t]):null,Ua(4,4,Uh.bind(null,i,t),o)}function Xc(){}function Oh(t,i){var o=Zn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zc(i,c[1])?c[0]:(o.memoizedState=[t,i],t)}function kh(t,i){var o=Zn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zc(i,c[1])?c[0]:(t=t(),o.memoizedState=[t,i],t)}function Bh(t,i,o){return(Nr&21)===0?(t.baseState&&(t.baseState=!1,Ln=!0),t.memoizedState=o):(ni(o,i)||(o=It(),Gt.lanes|=o,Lr|=o,t.baseState=!0),i)}function j0(t,i){var o=wt;wt=o!==0&&4>o?o:4,t(!0);var c=Bc.transition;Bc.transition={};try{t(!1),i()}finally{wt=o,Bc.transition=c}}function zh(){return Zn().memoizedState}function X0(t,i,o){var c=lr(t);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},Hh(t))Vh(i,o);else if(o=vh(t,i,o,c),o!==null){var f=wn();ai(o,t,c,f),Gh(o,i,c)}}function q0(t,i,o){var c=lr(t),f={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(Hh(t))Vh(i,f);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var M=i.lastRenderedState,F=p(M,o);if(f.hasEagerState=!0,f.eagerState=F,ni(F,M)){var V=i.interleaved;V===null?(f.next=f,Dc(i)):(f.next=V.next,V.next=f),i.interleaved=f;return}}catch{}finally{}o=vh(t,i,f,c),o!==null&&(f=wn(),ai(o,t,c,f),Gh(o,i,c))}}function Hh(t){var i=t.alternate;return t===Gt||i!==null&&i===Gt}function Vh(t,i){Eo=Da=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function Gh(t,i,o){if((o&4194240)!==0){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,sn(t,o)}}var Fa={readContext:Kn,useCallback:gn,useContext:gn,useEffect:gn,useImperativeHandle:gn,useInsertionEffect:gn,useLayoutEffect:gn,useMemo:gn,useReducer:gn,useRef:gn,useState:gn,useDebugValue:gn,useDeferredValue:gn,useTransition:gn,useMutableSource:gn,useSyncExternalStore:gn,useId:gn,unstable_isNewReconciler:!1},Y0={readContext:Kn,useCallback:function(t,i){return _i().memoizedState=[t,i===void 0?null:i],t},useContext:Kn,useEffect:Lh,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Ia(4194308,4,Uh.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Ia(4194308,4,t,i)},useInsertionEffect:function(t,i){return Ia(4,2,t,i)},useMemo:function(t,i){var o=_i();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var c=_i();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},c.queue=t,t=t.dispatch=X0.bind(null,Gt,t),[c.memoizedState,t]},useRef:function(t){var i=_i();return t={current:t},i.memoizedState=t},useState:Ph,useDebugValue:Xc,useDeferredValue:function(t){return _i().memoizedState=t},useTransition:function(){var t=Ph(!1),i=t[0];return t=j0.bind(null,t[1]),_i().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var c=Gt,f=_i();if(Ht){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),an===null)throw Error(n(349));(Nr&30)!==0||wh(c,i,o)}f.memoizedState=o;var p={value:o,getSnapshot:i};return f.queue=p,Lh(Ch.bind(null,c,p,t),[t]),c.flags|=2048,Ao(9,Ah.bind(null,c,p,o,i),void 0,null),o},useId:function(){var t=_i(),i=an.identifierPrefix;if(Ht){var o=Pi,c=bi;o=(c&~(1<<32-ut(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=To++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=W0++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},$0={readContext:Kn,useCallback:Oh,useContext:Kn,useEffect:jc,useImperativeHandle:Fh,useInsertionEffect:Dh,useLayoutEffect:Ih,useMemo:kh,useReducer:Gc,useRef:Nh,useState:function(){return Gc(wo)},useDebugValue:Xc,useDeferredValue:function(t){var i=Zn();return Bh(i,Qt.memoizedState,t)},useTransition:function(){var t=Gc(wo)[0],i=Zn().memoizedState;return[t,i]},useMutableSource:Eh,useSyncExternalStore:Th,useId:zh,unstable_isNewReconciler:!1},K0={readContext:Kn,useCallback:Oh,useContext:Kn,useEffect:jc,useImperativeHandle:Fh,useInsertionEffect:Dh,useLayoutEffect:Ih,useMemo:kh,useReducer:Wc,useRef:Nh,useState:function(){return Wc(wo)},useDebugValue:Xc,useDeferredValue:function(t){var i=Zn();return Qt===null?i.memoizedState=t:Bh(i,Qt.memoizedState,t)},useTransition:function(){var t=Wc(wo)[0],i=Zn().memoizedState;return[t,i]},useMutableSource:Eh,useSyncExternalStore:Th,useId:zh,unstable_isNewReconciler:!1};function ri(t,i){if(t&&t.defaultProps){i=te({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function qc(t,i,o,c){i=t.memoizedState,o=o(c,i),o=o==null?i:te({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Oa={isMounted:function(t){return(t=t._reactInternals)?hi(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var c=wn(),f=lr(t),p=Li(c,f);p.payload=i,o!=null&&(p.callback=o),i=rr(t,p,f),i!==null&&(ai(i,t,f,c),ba(i,t,f))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var c=wn(),f=lr(t),p=Li(c,f);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=rr(t,p,f),i!==null&&(ai(i,t,f,c),ba(i,t,f))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=wn(),c=lr(t),f=Li(o,c);f.tag=2,i!=null&&(f.callback=i),i=rr(t,f,c),i!==null&&(ai(i,t,c,o),ba(i,t,c))}};function Wh(t,i,o,c,f,p,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,p,M):i.prototype&&i.prototype.isPureReactComponent?!fo(o,c)||!fo(f,p):!0}function jh(t,i,o){var c=!1,f=tr,p=i.contextType;return typeof p=="object"&&p!==null?p=Kn(p):(f=Nn(i)?Ar:mn.current,c=i.contextTypes,p=(c=c!=null)?ds(t,f):tr),i=new i(o,p),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Oa,t.stateNode=i,i._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=f,t.__reactInternalMemoizedMaskedChildContext=p),i}function Xh(t,i,o,c){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==t&&Oa.enqueueReplaceState(i,i.state,null)}function Yc(t,i,o,c){var f=t.stateNode;f.props=o,f.state=t.memoizedState,f.refs={},Ic(t);var p=i.contextType;typeof p=="object"&&p!==null?f.context=Kn(p):(p=Nn(i)?Ar:mn.current,f.context=ds(t,p)),f.state=t.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(qc(t,i,p,o),f.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(i=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),i!==f.state&&Oa.enqueueReplaceState(f,f.state,null),Pa(t,o,f,c),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308)}function xs(t,i){try{var o="",c=i;do o+=de(c),c=c.return;while(c);var f=o}catch(p){f=`
Error generating stack: `+p.message+`
`+p.stack}return{value:t,source:i,stack:f,digest:null}}function $c(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function Kc(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var Z0=typeof WeakMap=="function"?WeakMap:Map;function qh(t,i,o){o=Li(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){Wa||(Wa=!0,du=c),Kc(t,i)},o}function Yh(t,i,o){o=Li(-1,o),o.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var f=i.value;o.payload=function(){return c(f)},o.callback=function(){Kc(t,i)}}var p=t.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){Kc(t,i),typeof c!="function"&&(or===null?or=new Set([this]):or.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),o}function $h(t,i,o){var c=t.pingCache;if(c===null){c=t.pingCache=new Z0;var f=new Set;c.set(i,f)}else f=c.get(i),f===void 0&&(f=new Set,c.set(i,f));f.has(o)||(f.add(o),t=d_.bind(null,t,i,o),i.then(t,t))}function Kh(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Zh(t,i,o,c,f){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Li(-1,1),i.tag=2,rr(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=f,t)}var Q0=C.ReactCurrentOwner,Ln=!1;function Tn(t,i,o,c){i.child=t===null?_h(i,null,o,c):ms(i,t.child,o,c)}function Qh(t,i,o,c,f){o=o.render;var p=i.ref;return _s(i,f),c=Hc(t,i,o,c,p,f),o=Vc(),t!==null&&!Ln?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~f,Di(t,i,f)):(Ht&&o&&Tc(i),i.flags|=1,Tn(t,i,c,f),i.child)}function Jh(t,i,o,c,f){if(t===null){var p=o.type;return typeof p=="function"&&!vu(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,ep(t,i,p,c,f)):(t=Ka(o.type,null,c,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(p=t.child,(t.lanes&f)===0){var M=p.memoizedProps;if(o=o.compare,o=o!==null?o:fo,o(M,c)&&t.ref===i.ref)return Di(t,i,f)}return i.flags|=1,t=ur(p,c),t.ref=i.ref,t.return=i,i.child=t}function ep(t,i,o,c,f){if(t!==null){var p=t.memoizedProps;if(fo(p,c)&&t.ref===i.ref)if(Ln=!1,i.pendingProps=c=p,(t.lanes&f)!==0)(t.flags&131072)!==0&&(Ln=!0);else return i.lanes=t.lanes,Di(t,i,f)}return Zc(t,i,o,c,f)}function tp(t,i,o){var c=i.pendingProps,f=c.children,p=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ft(Ss,zn),zn|=o;else{if((o&1073741824)===0)return t=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Ft(Ss,zn),zn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,Ft(Ss,zn),zn|=c}else p!==null?(c=p.baseLanes|o,i.memoizedState=null):c=o,Ft(Ss,zn),zn|=c;return Tn(t,i,f,o),i.child}function np(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Zc(t,i,o,c,f){var p=Nn(o)?Ar:mn.current;return p=ds(i,p),_s(i,f),o=Hc(t,i,o,c,p,f),c=Vc(),t!==null&&!Ln?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~f,Di(t,i,f)):(Ht&&c&&Tc(i),i.flags|=1,Tn(t,i,o,f),i.child)}function ip(t,i,o,c,f){if(Nn(o)){var p=!0;Sa(i)}else p=!1;if(_s(i,f),i.stateNode===null)Ba(t,i),jh(i,o,c),Yc(i,o,c,f),c=!0;else if(t===null){var M=i.stateNode,F=i.memoizedProps;M.props=F;var V=M.context,se=o.contextType;typeof se=="object"&&se!==null?se=Kn(se):(se=Nn(o)?Ar:mn.current,se=ds(i,se));var ye=o.getDerivedStateFromProps,Me=typeof ye=="function"||typeof M.getSnapshotBeforeUpdate=="function";Me||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(F!==c||V!==se)&&Xh(i,M,c,se),ir=!1;var ve=i.memoizedState;M.state=ve,Pa(i,c,M,f),V=i.memoizedState,F!==c||ve!==V||Pn.current||ir?(typeof ye=="function"&&(qc(i,o,ye,c),V=i.memoizedState),(F=ir||Wh(i,o,F,c,ve,V,se))?(Me||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=V),M.props=c,M.state=V,M.context=se,c=F):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{M=i.stateNode,xh(t,i),F=i.memoizedProps,se=i.type===i.elementType?F:ri(i.type,F),M.props=se,Me=i.pendingProps,ve=M.context,V=o.contextType,typeof V=="object"&&V!==null?V=Kn(V):(V=Nn(o)?Ar:mn.current,V=ds(i,V));var Be=o.getDerivedStateFromProps;(ye=typeof Be=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(F!==Me||ve!==V)&&Xh(i,M,c,V),ir=!1,ve=i.memoizedState,M.state=ve,Pa(i,c,M,f);var We=i.memoizedState;F!==Me||ve!==We||Pn.current||ir?(typeof Be=="function"&&(qc(i,o,Be,c),We=i.memoizedState),(se=ir||Wh(i,o,se,c,ve,We,V)||!1)?(ye||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(c,We,V),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(c,We,V)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||F===t.memoizedProps&&ve===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||F===t.memoizedProps&&ve===t.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=We),M.props=c,M.state=We,M.context=V,c=se):(typeof M.componentDidUpdate!="function"||F===t.memoizedProps&&ve===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||F===t.memoizedProps&&ve===t.memoizedState||(i.flags|=1024),c=!1)}return Qc(t,i,o,c,p,f)}function Qc(t,i,o,c,f,p){np(t,i);var M=(i.flags&128)!==0;if(!c&&!M)return f&&lh(i,o,!1),Di(t,i,p);c=i.stateNode,Q0.current=i;var F=M&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,t!==null&&M?(i.child=ms(i,t.child,null,p),i.child=ms(i,null,F,p)):Tn(t,i,F,p),i.memoizedState=c.state,f&&lh(i,o,!0),i.child}function rp(t){var i=t.stateNode;i.pendingContext?oh(t,i.pendingContext,i.pendingContext!==i.context):i.context&&oh(t,i.context,!1),Uc(t,i.containerInfo)}function sp(t,i,o,c,f){return ps(),Rc(f),i.flags|=256,Tn(t,i,o,c),i.child}var Jc={dehydrated:null,treeContext:null,retryLane:0};function eu(t){return{baseLanes:t,cachePool:null,transitions:null}}function op(t,i,o){var c=i.pendingProps,f=Vt.current,p=!1,M=(i.flags&128)!==0,F;if((F=M)||(F=t!==null&&t.memoizedState===null?!1:(f&2)!==0),F?(p=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(f|=1),Ft(Vt,f&1),t===null)return Cc(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=c.children,t=c.fallback,p?(c=i.mode,p=i.child,M={mode:"hidden",children:M},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=M):p=Za(M,c,0,null),t=Fr(t,c,o,null),p.return=i,t.return=i,p.sibling=t,i.child=p,i.child.memoizedState=eu(o),i.memoizedState=Jc,t):tu(i,M));if(f=t.memoizedState,f!==null&&(F=f.dehydrated,F!==null))return J0(t,i,M,c,F,f,o);if(p){p=c.fallback,M=i.mode,f=t.child,F=f.sibling;var V={mode:"hidden",children:c.children};return(M&1)===0&&i.child!==f?(c=i.child,c.childLanes=0,c.pendingProps=V,i.deletions=null):(c=ur(f,V),c.subtreeFlags=f.subtreeFlags&14680064),F!==null?p=ur(F,p):(p=Fr(p,M,o,null),p.flags|=2),p.return=i,c.return=i,c.sibling=p,i.child=c,c=p,p=i.child,M=t.child.memoizedState,M=M===null?eu(o):{baseLanes:M.baseLanes|o,cachePool:null,transitions:M.transitions},p.memoizedState=M,p.childLanes=t.childLanes&~o,i.memoizedState=Jc,c}return p=t.child,t=p.sibling,c=ur(p,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=c,i.memoizedState=null,c}function tu(t,i){return i=Za({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function ka(t,i,o,c){return c!==null&&Rc(c),ms(i,t.child,null,o),t=tu(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function J0(t,i,o,c,f,p,M){if(o)return i.flags&256?(i.flags&=-257,c=$c(Error(n(422))),ka(t,i,M,c)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(p=c.fallback,f=i.mode,c=Za({mode:"visible",children:c.children},f,0,null),p=Fr(p,f,M,null),p.flags|=2,c.return=i,p.return=i,c.sibling=p,i.child=c,(i.mode&1)!==0&&ms(i,t.child,null,M),i.child.memoizedState=eu(M),i.memoizedState=Jc,p);if((i.mode&1)===0)return ka(t,i,M,null);if(f.data==="$!"){if(c=f.nextSibling&&f.nextSibling.dataset,c)var F=c.dgst;return c=F,p=Error(n(419)),c=$c(p,c,void 0),ka(t,i,M,c)}if(F=(M&t.childLanes)!==0,Ln||F){if(c=an,c!==null){switch(M&-M){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(c.suspendedLanes|M))!==0?0:f,f!==0&&f!==p.retryLane&&(p.retryLane=f,Ni(t,f),ai(c,t,f,-1))}return _u(),c=$c(Error(n(421))),ka(t,i,M,c)}return f.data==="$?"?(i.flags|=128,i.child=t.child,i=f_.bind(null,t),f._reactRetry=i,null):(t=p.treeContext,Bn=Ji(f.nextSibling),kn=i,Ht=!0,ii=null,t!==null&&(Yn[$n++]=bi,Yn[$n++]=Pi,Yn[$n++]=Cr,bi=t.id,Pi=t.overflow,Cr=i),i=tu(i,c.children),i.flags|=4096,i)}function ap(t,i,o){t.lanes|=i;var c=t.alternate;c!==null&&(c.lanes|=i),Lc(t.return,i,o)}function nu(t,i,o,c,f){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:f}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=f)}function lp(t,i,o){var c=i.pendingProps,f=c.revealOrder,p=c.tail;if(Tn(t,i,c.children,o),c=Vt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ap(t,o,i);else if(t.tag===19)ap(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(Ft(Vt,c),(i.mode&1)===0)i.memoizedState=null;else switch(f){case"forwards":for(o=i.child,f=null;o!==null;)t=o.alternate,t!==null&&Na(t)===null&&(f=o),o=o.sibling;o=f,o===null?(f=i.child,i.child=null):(f=o.sibling,o.sibling=null),nu(i,!1,f,o,p);break;case"backwards":for(o=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&Na(t)===null){i.child=f;break}t=f.sibling,f.sibling=o,o=f,f=t}nu(i,!0,o,null,p);break;case"together":nu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ba(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Di(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Lr|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=ur(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=ur(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function e_(t,i,o){switch(i.tag){case 3:rp(i),ps();break;case 5:Mh(i);break;case 1:Nn(i.type)&&Sa(i);break;case 4:Uc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,f=i.memoizedProps.value;Ft(Ca,c._currentValue),c._currentValue=f;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Ft(Vt,Vt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?op(t,i,o):(Ft(Vt,Vt.current&1),t=Di(t,i,o),t!==null?t.sibling:null);Ft(Vt,Vt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(t.flags&128)!==0){if(c)return lp(t,i,o);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Ft(Vt,Vt.current),c)break;return null;case 22:case 23:return i.lanes=0,tp(t,i,o)}return Di(t,i,o)}var cp,iu,up,dp;cp=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},iu=function(){},up=function(t,i,o,c){var f=t.memoizedProps;if(f!==c){t=i.stateNode,Pr(gi.current);var p=null;switch(o){case"input":f=H(t,f),c=H(t,c),p=[];break;case"select":f=te({},f,{value:void 0}),c=te({},c,{value:void 0}),p=[];break;case"textarea":f=T(t,f),c=T(t,c),p=[];break;default:typeof f.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=va)}at(o,c);var M;o=null;for(se in f)if(!c.hasOwnProperty(se)&&f.hasOwnProperty(se)&&f[se]!=null)if(se==="style"){var F=f[se];for(M in F)F.hasOwnProperty(M)&&(o||(o={}),o[M]="")}else se!=="dangerouslySetInnerHTML"&&se!=="children"&&se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&se!=="autoFocus"&&(a.hasOwnProperty(se)?p||(p=[]):(p=p||[]).push(se,null));for(se in c){var V=c[se];if(F=f?.[se],c.hasOwnProperty(se)&&V!==F&&(V!=null||F!=null))if(se==="style")if(F){for(M in F)!F.hasOwnProperty(M)||V&&V.hasOwnProperty(M)||(o||(o={}),o[M]="");for(M in V)V.hasOwnProperty(M)&&F[M]!==V[M]&&(o||(o={}),o[M]=V[M])}else o||(p||(p=[]),p.push(se,o)),o=V;else se==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,F=F?F.__html:void 0,V!=null&&F!==V&&(p=p||[]).push(se,V)):se==="children"?typeof V!="string"&&typeof V!="number"||(p=p||[]).push(se,""+V):se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&(a.hasOwnProperty(se)?(V!=null&&se==="onScroll"&&kt("scroll",t),p||F===V||(p=[])):(p=p||[]).push(se,V))}o&&(p=p||[]).push("style",o);var se=p;(i.updateQueue=se)&&(i.flags|=4)}},dp=function(t,i,o,c){o!==c&&(i.flags|=4)};function Co(t,i){if(!Ht)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function _n(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,c=0;if(i)for(var f=t.child;f!==null;)o|=f.lanes|f.childLanes,c|=f.subtreeFlags&14680064,c|=f.flags&14680064,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)o|=f.lanes|f.childLanes,c|=f.subtreeFlags,c|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=c,t.childLanes=o,i}function t_(t,i,o){var c=i.pendingProps;switch(wc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _n(i),null;case 1:return Nn(i.type)&&ya(),_n(i),null;case 3:return c=i.stateNode,vs(),Bt(Pn),Bt(mn),kc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(wa(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(pu(ii),ii=null))),iu(t,i),_n(i),null;case 5:Fc(i);var f=Pr(Mo.current);if(o=i.type,t!==null&&i.stateNode!=null)up(t,i,o,c,f),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(n(166));return _n(i),null}if(t=Pr(gi.current),wa(i)){c=i.stateNode,o=i.type;var p=i.memoizedProps;switch(c[mi]=i,c[_o]=p,t=(i.mode&1)!==0,o){case"dialog":kt("cancel",c),kt("close",c);break;case"iframe":case"object":case"embed":kt("load",c);break;case"video":case"audio":for(f=0;f<po.length;f++)kt(po[f],c);break;case"source":kt("error",c);break;case"img":case"image":case"link":kt("error",c),kt("load",c);break;case"details":kt("toggle",c);break;case"input":nn(c,p),kt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},kt("invalid",c);break;case"textarea":ne(c,p),kt("invalid",c)}at(o,p),f=null;for(var M in p)if(p.hasOwnProperty(M)){var F=p[M];M==="children"?typeof F=="string"?c.textContent!==F&&(p.suppressHydrationWarning!==!0&&_a(c.textContent,F,t),f=["children",F]):typeof F=="number"&&c.textContent!==""+F&&(p.suppressHydrationWarning!==!0&&_a(c.textContent,F,t),f=["children",""+F]):a.hasOwnProperty(M)&&F!=null&&M==="onScroll"&&kt("scroll",c)}switch(o){case"input":yt(c),Ae(c,p,!0);break;case"textarea":yt(c),he(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=va)}c=f,i.updateQueue=c,c!==null&&(i.flags|=4)}else{M=f.nodeType===9?f:f.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=pe(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=M.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=M.createElement(o,{is:c.is}):(t=M.createElement(o),o==="select"&&(M=t,c.multiple?M.multiple=!0:c.size&&(M.size=c.size))):t=M.createElementNS(t,o),t[mi]=i,t[_o]=c,cp(t,i,!1,!1),i.stateNode=t;e:{switch(M=it(o,c),o){case"dialog":kt("cancel",t),kt("close",t),f=c;break;case"iframe":case"object":case"embed":kt("load",t),f=c;break;case"video":case"audio":for(f=0;f<po.length;f++)kt(po[f],t);f=c;break;case"source":kt("error",t),f=c;break;case"img":case"image":case"link":kt("error",t),kt("load",t),f=c;break;case"details":kt("toggle",t),f=c;break;case"input":nn(t,c),f=H(t,c),kt("invalid",t);break;case"option":f=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},f=te({},c,{value:void 0}),kt("invalid",t);break;case"textarea":ne(t,c),f=T(t,c),kt("invalid",t);break;default:f=c}at(o,f),F=f;for(p in F)if(F.hasOwnProperty(p)){var V=F[p];p==="style"?Qe(t,V):p==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,V!=null&&Re(t,V)):p==="children"?typeof V=="string"?(o!=="textarea"||V!=="")&&tt(t,V):typeof V=="number"&&tt(t,""+V):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?V!=null&&p==="onScroll"&&kt("scroll",t):V!=null&&L(t,p,V,M))}switch(o){case"input":yt(t),Ae(t,c,!1);break;case"textarea":yt(t),he(t);break;case"option":c.value!=null&&t.setAttribute("value",""+we(c.value));break;case"select":t.multiple=!!c.multiple,p=c.value,p!=null?N(t,!!c.multiple,p,!1):c.defaultValue!=null&&N(t,!!c.multiple,c.defaultValue,!0);break;default:typeof f.onClick=="function"&&(t.onclick=va)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return _n(i),null;case 6:if(t&&i.stateNode!=null)dp(t,i,t.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(n(166));if(o=Pr(Mo.current),Pr(gi.current),wa(i)){if(c=i.stateNode,o=i.memoizedProps,c[mi]=i,(p=c.nodeValue!==o)&&(t=kn,t!==null))switch(t.tag){case 3:_a(c.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&_a(c.nodeValue,o,(t.mode&1)!==0)}p&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[mi]=i,i.stateNode=c}return _n(i),null;case 13:if(Bt(Vt),c=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ht&&Bn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)ph(),ps(),i.flags|=98560,p=!1;else if(p=wa(i),c!==null&&c.dehydrated!==null){if(t===null){if(!p)throw Error(n(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(n(317));p[mi]=i}else ps(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;_n(i),p=!1}else ii!==null&&(pu(ii),ii=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(Vt.current&1)!==0?Jt===0&&(Jt=3):_u())),i.updateQueue!==null&&(i.flags|=4),_n(i),null);case 4:return vs(),iu(t,i),t===null&&mo(i.stateNode.containerInfo),_n(i),null;case 10:return Nc(i.type._context),_n(i),null;case 17:return Nn(i.type)&&ya(),_n(i),null;case 19:if(Bt(Vt),p=i.memoizedState,p===null)return _n(i),null;if(c=(i.flags&128)!==0,M=p.rendering,M===null)if(c)Co(p,!1);else{if(Jt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(M=Na(t),M!==null){for(i.flags|=128,Co(p,!1),c=M.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)p=o,t=c,p.flags&=14680066,M=p.alternate,M===null?(p.childLanes=0,p.lanes=t,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=M.childLanes,p.lanes=M.lanes,p.child=M.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=M.memoizedProps,p.memoizedState=M.memoizedState,p.updateQueue=M.updateQueue,p.type=M.type,t=M.dependencies,p.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Ft(Vt,Vt.current&1|2),i.child}t=t.sibling}p.tail!==null&&K()>Ms&&(i.flags|=128,c=!0,Co(p,!1),i.lanes=4194304)}else{if(!c)if(t=Na(M),t!==null){if(i.flags|=128,c=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Co(p,!0),p.tail===null&&p.tailMode==="hidden"&&!M.alternate&&!Ht)return _n(i),null}else 2*K()-p.renderingStartTime>Ms&&o!==1073741824&&(i.flags|=128,c=!0,Co(p,!1),i.lanes=4194304);p.isBackwards?(M.sibling=i.child,i.child=M):(o=p.last,o!==null?o.sibling=M:i.child=M,p.last=M)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=K(),i.sibling=null,o=Vt.current,Ft(Vt,c?o&1|2:o&1),i):(_n(i),null);case 22:case 23:return gu(),c=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(zn&1073741824)!==0&&(_n(i),i.subtreeFlags&6&&(i.flags|=8192)):_n(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function n_(t,i){switch(wc(i),i.tag){case 1:return Nn(i.type)&&ya(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return vs(),Bt(Pn),Bt(mn),kc(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Fc(i),null;case 13:if(Bt(Vt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));ps()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Bt(Vt),null;case 4:return vs(),null;case 10:return Nc(i.type._context),null;case 22:case 23:return gu(),null;case 24:return null;default:return null}}var za=!1,vn=!1,i_=typeof WeakSet=="function"?WeakSet:Set,ze=null;function ys(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){Xt(t,i,c)}else o.current=null}function ru(t,i,o){try{o()}catch(c){Xt(t,i,c)}}var fp=!1;function r_(t,i){if(gc=oa,t=Wf(),lc(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var f=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var M=0,F=-1,V=-1,se=0,ye=0,Me=t,ve=null;t:for(;;){for(var Be;Me!==o||f!==0&&Me.nodeType!==3||(F=M+f),Me!==p||c!==0&&Me.nodeType!==3||(V=M+c),Me.nodeType===3&&(M+=Me.nodeValue.length),(Be=Me.firstChild)!==null;)ve=Me,Me=Be;for(;;){if(Me===t)break t;if(ve===o&&++se===f&&(F=M),ve===p&&++ye===c&&(V=M),(Be=Me.nextSibling)!==null)break;Me=ve,ve=Me.parentNode}Me=Be}o=F===-1||V===-1?null:{start:F,end:V}}else o=null}o=o||{start:0,end:0}}else o=null;for(_c={focusedElem:t,selectionRange:o},oa=!1,ze=i;ze!==null;)if(i=ze,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,ze=t;else for(;ze!==null;){i=ze;try{var We=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(We!==null){var qe=We.memoizedProps,qt=We.memoizedState,$=i.stateNode,W=$.getSnapshotBeforeUpdate(i.elementType===i.type?qe:ri(i.type,qe),qt);$.__reactInternalSnapshotBeforeUpdate=W}break;case 3:var ee=i.stateNode.containerInfo;ee.nodeType===1?ee.textContent="":ee.nodeType===9&&ee.documentElement&&ee.removeChild(ee.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Te){Xt(i,i.return,Te)}if(t=i.sibling,t!==null){t.return=i.return,ze=t;break}ze=i.return}return We=fp,fp=!1,We}function Ro(t,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var f=c=c.next;do{if((f.tag&t)===t){var p=f.destroy;f.destroy=void 0,p!==void 0&&ru(i,o,p)}f=f.next}while(f!==c)}}function Ha(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function su(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function hp(t){var i=t.alternate;i!==null&&(t.alternate=null,hp(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[mi],delete i[_o],delete i[Sc],delete i[z0],delete i[H0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function pp(t){return t.tag===5||t.tag===3||t.tag===4}function mp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||pp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ou(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=va));else if(c!==4&&(t=t.child,t!==null))for(ou(t,i,o),t=t.sibling;t!==null;)ou(t,i,o),t=t.sibling}function au(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(au(t,i,o),t=t.sibling;t!==null;)au(t,i,o),t=t.sibling}var dn=null,si=!1;function sr(t,i,o){for(o=o.child;o!==null;)gp(t,i,o),o=o.sibling}function gp(t,i,o){if(je&&typeof je.onCommitFiberUnmount=="function")try{je.onCommitFiberUnmount(nt,o)}catch{}switch(o.tag){case 5:vn||ys(o,i);case 6:var c=dn,f=si;dn=null,sr(t,i,o),dn=c,si=f,dn!==null&&(si?(t=dn,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):dn.removeChild(o.stateNode));break;case 18:dn!==null&&(si?(t=dn,o=o.stateNode,t.nodeType===8?yc(t.parentNode,o):t.nodeType===1&&yc(t,o),so(t)):yc(dn,o.stateNode));break;case 4:c=dn,f=si,dn=o.stateNode.containerInfo,si=!0,sr(t,i,o),dn=c,si=f;break;case 0:case 11:case 14:case 15:if(!vn&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){f=c=c.next;do{var p=f,M=p.destroy;p=p.tag,M!==void 0&&((p&2)!==0||(p&4)!==0)&&ru(o,i,M),f=f.next}while(f!==c)}sr(t,i,o);break;case 1:if(!vn&&(ys(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(F){Xt(o,i,F)}sr(t,i,o);break;case 21:sr(t,i,o);break;case 22:o.mode&1?(vn=(c=vn)||o.memoizedState!==null,sr(t,i,o),vn=c):sr(t,i,o);break;default:sr(t,i,o)}}function _p(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new i_),i.forEach(function(c){var f=h_.bind(null,t,c);o.has(c)||(o.add(c),c.then(f,f))})}}function oi(t,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var f=o[c];try{var p=t,M=i,F=M;e:for(;F!==null;){switch(F.tag){case 5:dn=F.stateNode,si=!1;break e;case 3:dn=F.stateNode.containerInfo,si=!0;break e;case 4:dn=F.stateNode.containerInfo,si=!0;break e}F=F.return}if(dn===null)throw Error(n(160));gp(p,M,f),dn=null,si=!1;var V=f.alternate;V!==null&&(V.return=null),f.return=null}catch(se){Xt(f,i,se)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)vp(i,t),i=i.sibling}function vp(t,i){var o=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(oi(i,t),vi(t),c&4){try{Ro(3,t,t.return),Ha(3,t)}catch(qe){Xt(t,t.return,qe)}try{Ro(5,t,t.return)}catch(qe){Xt(t,t.return,qe)}}break;case 1:oi(i,t),vi(t),c&512&&o!==null&&ys(o,o.return);break;case 5:if(oi(i,t),vi(t),c&512&&o!==null&&ys(o,o.return),t.flags&32){var f=t.stateNode;try{tt(f,"")}catch(qe){Xt(t,t.return,qe)}}if(c&4&&(f=t.stateNode,f!=null)){var p=t.memoizedProps,M=o!==null?o.memoizedProps:p,F=t.type,V=t.updateQueue;if(t.updateQueue=null,V!==null)try{F==="input"&&p.type==="radio"&&p.name!=null&&ft(f,p),it(F,M);var se=it(F,p);for(M=0;M<V.length;M+=2){var ye=V[M],Me=V[M+1];ye==="style"?Qe(f,Me):ye==="dangerouslySetInnerHTML"?Re(f,Me):ye==="children"?tt(f,Me):L(f,ye,Me,se)}switch(F){case"input":He(f,p);break;case"textarea":fe(f,p);break;case"select":var ve=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!p.multiple;var Be=p.value;Be!=null?N(f,!!p.multiple,Be,!1):ve!==!!p.multiple&&(p.defaultValue!=null?N(f,!!p.multiple,p.defaultValue,!0):N(f,!!p.multiple,p.multiple?[]:"",!1))}f[_o]=p}catch(qe){Xt(t,t.return,qe)}}break;case 6:if(oi(i,t),vi(t),c&4){if(t.stateNode===null)throw Error(n(162));f=t.stateNode,p=t.memoizedProps;try{f.nodeValue=p}catch(qe){Xt(t,t.return,qe)}}break;case 3:if(oi(i,t),vi(t),c&4&&o!==null&&o.memoizedState.isDehydrated)try{so(i.containerInfo)}catch(qe){Xt(t,t.return,qe)}break;case 4:oi(i,t),vi(t);break;case 13:oi(i,t),vi(t),f=t.child,f.flags&8192&&(p=f.memoizedState!==null,f.stateNode.isHidden=p,!p||f.alternate!==null&&f.alternate.memoizedState!==null||(uu=K())),c&4&&_p(t);break;case 22:if(ye=o!==null&&o.memoizedState!==null,t.mode&1?(vn=(se=vn)||ye,oi(i,t),vn=se):oi(i,t),vi(t),c&8192){if(se=t.memoizedState!==null,(t.stateNode.isHidden=se)&&!ye&&(t.mode&1)!==0)for(ze=t,ye=t.child;ye!==null;){for(Me=ze=ye;ze!==null;){switch(ve=ze,Be=ve.child,ve.tag){case 0:case 11:case 14:case 15:Ro(4,ve,ve.return);break;case 1:ys(ve,ve.return);var We=ve.stateNode;if(typeof We.componentWillUnmount=="function"){c=ve,o=ve.return;try{i=c,We.props=i.memoizedProps,We.state=i.memoizedState,We.componentWillUnmount()}catch(qe){Xt(c,o,qe)}}break;case 5:ys(ve,ve.return);break;case 22:if(ve.memoizedState!==null){Sp(Me);continue}}Be!==null?(Be.return=ve,ze=Be):Sp(Me)}ye=ye.sibling}e:for(ye=null,Me=t;;){if(Me.tag===5){if(ye===null){ye=Me;try{f=Me.stateNode,se?(p=f.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(F=Me.stateNode,V=Me.memoizedProps.style,M=V!=null&&V.hasOwnProperty("display")?V.display:null,F.style.display=Ye("display",M))}catch(qe){Xt(t,t.return,qe)}}}else if(Me.tag===6){if(ye===null)try{Me.stateNode.nodeValue=se?"":Me.memoizedProps}catch(qe){Xt(t,t.return,qe)}}else if((Me.tag!==22&&Me.tag!==23||Me.memoizedState===null||Me===t)&&Me.child!==null){Me.child.return=Me,Me=Me.child;continue}if(Me===t)break e;for(;Me.sibling===null;){if(Me.return===null||Me.return===t)break e;ye===Me&&(ye=null),Me=Me.return}ye===Me&&(ye=null),Me.sibling.return=Me.return,Me=Me.sibling}}break;case 19:oi(i,t),vi(t),c&4&&_p(t);break;case 21:break;default:oi(i,t),vi(t)}}function vi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(pp(o)){var c=o;break e}o=o.return}throw Error(n(160))}switch(c.tag){case 5:var f=c.stateNode;c.flags&32&&(tt(f,""),c.flags&=-33);var p=mp(t);au(t,p,f);break;case 3:case 4:var M=c.stateNode.containerInfo,F=mp(t);ou(t,F,M);break;default:throw Error(n(161))}}catch(V){Xt(t,t.return,V)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function s_(t,i,o){ze=t,xp(t)}function xp(t,i,o){for(var c=(t.mode&1)!==0;ze!==null;){var f=ze,p=f.child;if(f.tag===22&&c){var M=f.memoizedState!==null||za;if(!M){var F=f.alternate,V=F!==null&&F.memoizedState!==null||vn;F=za;var se=vn;if(za=M,(vn=V)&&!se)for(ze=f;ze!==null;)M=ze,V=M.child,M.tag===22&&M.memoizedState!==null?Mp(f):V!==null?(V.return=M,ze=V):Mp(f);for(;p!==null;)ze=p,xp(p),p=p.sibling;ze=f,za=F,vn=se}yp(t)}else(f.subtreeFlags&8772)!==0&&p!==null?(p.return=f,ze=p):yp(t)}}function yp(t){for(;ze!==null;){var i=ze;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:vn||Ha(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!vn)if(o===null)c.componentDidMount();else{var f=i.elementType===i.type?o.memoizedProps:ri(i.type,o.memoizedProps);c.componentDidUpdate(f,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&Sh(i,p,c);break;case 3:var M=i.updateQueue;if(M!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}Sh(i,M,o)}break;case 5:var F=i.stateNode;if(o===null&&i.flags&4){o=F;var V=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":V.autoFocus&&o.focus();break;case"img":V.src&&(o.src=V.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var se=i.alternate;if(se!==null){var ye=se.memoizedState;if(ye!==null){var Me=ye.dehydrated;Me!==null&&so(Me)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}vn||i.flags&512&&su(i)}catch(ve){Xt(i,i.return,ve)}}if(i===t){ze=null;break}if(o=i.sibling,o!==null){o.return=i.return,ze=o;break}ze=i.return}}function Sp(t){for(;ze!==null;){var i=ze;if(i===t){ze=null;break}var o=i.sibling;if(o!==null){o.return=i.return,ze=o;break}ze=i.return}}function Mp(t){for(;ze!==null;){var i=ze;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ha(4,i)}catch(V){Xt(i,o,V)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var f=i.return;try{c.componentDidMount()}catch(V){Xt(i,f,V)}}var p=i.return;try{su(i)}catch(V){Xt(i,p,V)}break;case 5:var M=i.return;try{su(i)}catch(V){Xt(i,M,V)}}}catch(V){Xt(i,i.return,V)}if(i===t){ze=null;break}var F=i.sibling;if(F!==null){F.return=i.return,ze=F;break}ze=i.return}}var o_=Math.ceil,Va=C.ReactCurrentDispatcher,lu=C.ReactCurrentOwner,Qn=C.ReactCurrentBatchConfig,At=0,an=null,Yt=null,fn=0,zn=0,Ss=er(0),Jt=0,bo=null,Lr=0,Ga=0,cu=0,Po=null,Dn=null,uu=0,Ms=1/0,Ii=null,Wa=!1,du=null,or=null,ja=!1,ar=null,Xa=0,No=0,fu=null,qa=-1,Ya=0;function wn(){return(At&6)!==0?K():qa!==-1?qa:qa=K()}function lr(t){return(t.mode&1)===0?1:(At&2)!==0&&fn!==0?fn&-fn:G0.transition!==null?(Ya===0&&(Ya=It()),Ya):(t=wt,t!==0||(t=window.event,t=t===void 0?16:Tf(t.type)),t)}function ai(t,i,o,c){if(50<No)throw No=0,fu=null,Error(n(185));rn(t,o,c),((At&2)===0||t!==an)&&(t===an&&((At&2)===0&&(Ga|=o),Jt===4&&cr(t,fn)),In(t,c),o===1&&At===0&&(i.mode&1)===0&&(Ms=K()+500,Ma&&nr()))}function In(t,i){var o=t.callbackNode;En(t,i);var c=hn(t,t===an?fn:0);if(c===0)o!==null&&R(o),t.callbackNode=null,t.callbackPriority=0;else if(i=c&-c,t.callbackPriority!==i){if(o!=null&&R(o),i===1)t.tag===0?V0(Tp.bind(null,t)):ch(Tp.bind(null,t)),k0(function(){(At&6)===0&&nr()}),o=null;else{switch(pi(c)){case 1:o=Ee;break;case 4:o=Le;break;case 16:o=ke;break;case 536870912:o=rt;break;default:o=ke}o=Lp(o,Ep.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function Ep(t,i){if(qa=-1,Ya=0,(At&6)!==0)throw Error(n(327));var o=t.callbackNode;if(Es()&&t.callbackNode!==o)return null;var c=hn(t,t===an?fn:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||i)i=$a(t,c);else{i=c;var f=At;At|=2;var p=Ap();(an!==t||fn!==i)&&(Ii=null,Ms=K()+500,Ir(t,i));do try{c_();break}catch(F){wp(t,F)}while(!0);Pc(),Va.current=p,At=f,Yt!==null?i=0:(an=null,fn=0,i=Jt)}if(i!==0){if(i===2&&(f=Ai(t),f!==0&&(c=f,i=hu(t,f))),i===1)throw o=bo,Ir(t,0),cr(t,c),In(t,K()),o;if(i===6)cr(t,c);else{if(f=t.current.alternate,(c&30)===0&&!a_(f)&&(i=$a(t,c),i===2&&(p=Ai(t),p!==0&&(c=p,i=hu(t,p))),i===1))throw o=bo,Ir(t,0),cr(t,c),In(t,K()),o;switch(t.finishedWork=f,t.finishedLanes=c,i){case 0:case 1:throw Error(n(345));case 2:Ur(t,Dn,Ii);break;case 3:if(cr(t,c),(c&130023424)===c&&(i=uu+500-K(),10<i)){if(hn(t,0)!==0)break;if(f=t.suspendedLanes,(f&c)!==c){wn(),t.pingedLanes|=t.suspendedLanes&f;break}t.timeoutHandle=xc(Ur.bind(null,t,Dn,Ii),i);break}Ur(t,Dn,Ii);break;case 4:if(cr(t,c),(c&4194240)===c)break;for(i=t.eventTimes,f=-1;0<c;){var M=31-ut(c);p=1<<M,M=i[M],M>f&&(f=M),c&=~p}if(c=f,c=K()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*o_(c/1960))-c,10<c){t.timeoutHandle=xc(Ur.bind(null,t,Dn,Ii),c);break}Ur(t,Dn,Ii);break;case 5:Ur(t,Dn,Ii);break;default:throw Error(n(329))}}}return In(t,K()),t.callbackNode===o?Ep.bind(null,t):null}function hu(t,i){var o=Po;return t.current.memoizedState.isDehydrated&&(Ir(t,i).flags|=256),t=$a(t,i),t!==2&&(i=Dn,Dn=o,i!==null&&pu(i)),t}function pu(t){Dn===null?Dn=t:Dn.push.apply(Dn,t)}function a_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var f=o[c],p=f.getSnapshot;f=f.value;try{if(!ni(p(),f))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function cr(t,i){for(i&=~cu,i&=~Ga,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-ut(i),c=1<<o;t[o]=-1,i&=~c}}function Tp(t){if((At&6)!==0)throw Error(n(327));Es();var i=hn(t,0);if((i&1)===0)return In(t,K()),null;var o=$a(t,i);if(t.tag!==0&&o===2){var c=Ai(t);c!==0&&(i=c,o=hu(t,c))}if(o===1)throw o=bo,Ir(t,0),cr(t,i),In(t,K()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Ur(t,Dn,Ii),In(t,K()),null}function mu(t,i){var o=At;At|=1;try{return t(i)}finally{At=o,At===0&&(Ms=K()+500,Ma&&nr())}}function Dr(t){ar!==null&&ar.tag===0&&(At&6)===0&&Es();var i=At;At|=1;var o=Qn.transition,c=wt;try{if(Qn.transition=null,wt=1,t)return t()}finally{wt=c,Qn.transition=o,At=i,(At&6)===0&&nr()}}function gu(){zn=Ss.current,Bt(Ss)}function Ir(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,O0(o)),Yt!==null)for(o=Yt.return;o!==null;){var c=o;switch(wc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&ya();break;case 3:vs(),Bt(Pn),Bt(mn),kc();break;case 5:Fc(c);break;case 4:vs();break;case 13:Bt(Vt);break;case 19:Bt(Vt);break;case 10:Nc(c.type._context);break;case 22:case 23:gu()}o=o.return}if(an=t,Yt=t=ur(t.current,null),fn=zn=i,Jt=0,bo=null,cu=Ga=Lr=0,Dn=Po=null,br!==null){for(i=0;i<br.length;i++)if(o=br[i],c=o.interleaved,c!==null){o.interleaved=null;var f=c.next,p=o.pending;if(p!==null){var M=p.next;p.next=f,c.next=M}o.pending=c}br=null}return t}function wp(t,i){do{var o=Yt;try{if(Pc(),La.current=Fa,Da){for(var c=Gt.memoizedState;c!==null;){var f=c.queue;f!==null&&(f.pending=null),c=c.next}Da=!1}if(Nr=0,on=Qt=Gt=null,Eo=!1,To=0,lu.current=null,o===null||o.return===null){Jt=1,bo=i,Yt=null;break}e:{var p=t,M=o.return,F=o,V=i;if(i=fn,F.flags|=32768,V!==null&&typeof V=="object"&&typeof V.then=="function"){var se=V,ye=F,Me=ye.tag;if((ye.mode&1)===0&&(Me===0||Me===11||Me===15)){var ve=ye.alternate;ve?(ye.updateQueue=ve.updateQueue,ye.memoizedState=ve.memoizedState,ye.lanes=ve.lanes):(ye.updateQueue=null,ye.memoizedState=null)}var Be=Kh(M);if(Be!==null){Be.flags&=-257,Zh(Be,M,F,p,i),Be.mode&1&&$h(p,se,i),i=Be,V=se;var We=i.updateQueue;if(We===null){var qe=new Set;qe.add(V),i.updateQueue=qe}else We.add(V);break e}else{if((i&1)===0){$h(p,se,i),_u();break e}V=Error(n(426))}}else if(Ht&&F.mode&1){var qt=Kh(M);if(qt!==null){(qt.flags&65536)===0&&(qt.flags|=256),Zh(qt,M,F,p,i),Rc(xs(V,F));break e}}p=V=xs(V,F),Jt!==4&&(Jt=2),Po===null?Po=[p]:Po.push(p),p=M;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var $=qh(p,V,i);yh(p,$);break e;case 1:F=V;var W=p.type,ee=p.stateNode;if((p.flags&128)===0&&(typeof W.getDerivedStateFromError=="function"||ee!==null&&typeof ee.componentDidCatch=="function"&&(or===null||!or.has(ee)))){p.flags|=65536,i&=-i,p.lanes|=i;var Te=Yh(p,F,i);yh(p,Te);break e}}p=p.return}while(p!==null)}Rp(o)}catch(Ke){i=Ke,Yt===o&&o!==null&&(Yt=o=o.return);continue}break}while(!0)}function Ap(){var t=Va.current;return Va.current=Fa,t===null?Fa:t}function _u(){(Jt===0||Jt===3||Jt===2)&&(Jt=4),an===null||(Lr&268435455)===0&&(Ga&268435455)===0||cr(an,fn)}function $a(t,i){var o=At;At|=2;var c=Ap();(an!==t||fn!==i)&&(Ii=null,Ir(t,i));do try{l_();break}catch(f){wp(t,f)}while(!0);if(Pc(),At=o,Va.current=c,Yt!==null)throw Error(n(261));return an=null,fn=0,Jt}function l_(){for(;Yt!==null;)Cp(Yt)}function c_(){for(;Yt!==null&&!X();)Cp(Yt)}function Cp(t){var i=Np(t.alternate,t,zn);t.memoizedProps=t.pendingProps,i===null?Rp(t):Yt=i,lu.current=null}function Rp(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=t_(o,i,zn),o!==null){Yt=o;return}}else{if(o=n_(o,i),o!==null){o.flags&=32767,Yt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Jt=6,Yt=null;return}}if(i=i.sibling,i!==null){Yt=i;return}Yt=i=t}while(i!==null);Jt===0&&(Jt=5)}function Ur(t,i,o){var c=wt,f=Qn.transition;try{Qn.transition=null,wt=1,u_(t,i,o,c)}finally{Qn.transition=f,wt=c}return null}function u_(t,i,o,c){do Es();while(ar!==null);if((At&6)!==0)throw Error(n(327));o=t.finishedWork;var f=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var p=o.lanes|o.childLanes;if(un(t,p),t===an&&(Yt=an=null,fn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||ja||(ja=!0,Lp(ke,function(){return Es(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=Qn.transition,Qn.transition=null;var M=wt;wt=1;var F=At;At|=4,lu.current=null,r_(t,o),vp(o,t),P0(_c),oa=!!gc,_c=gc=null,t.current=o,s_(o),ie(),At=F,wt=M,Qn.transition=p}else t.current=o;if(ja&&(ja=!1,ar=t,Xa=f),p=t.pendingLanes,p===0&&(or=null),St(o.stateNode),In(t,K()),i!==null)for(c=t.onRecoverableError,o=0;o<i.length;o++)f=i[o],c(f.value,{componentStack:f.stack,digest:f.digest});if(Wa)throw Wa=!1,t=du,du=null,t;return(Xa&1)!==0&&t.tag!==0&&Es(),p=t.pendingLanes,(p&1)!==0?t===fu?No++:(No=0,fu=t):No=0,nr(),null}function Es(){if(ar!==null){var t=pi(Xa),i=Qn.transition,o=wt;try{if(Qn.transition=null,wt=16>t?16:t,ar===null)var c=!1;else{if(t=ar,ar=null,Xa=0,(At&6)!==0)throw Error(n(331));var f=At;for(At|=4,ze=t.current;ze!==null;){var p=ze,M=p.child;if((ze.flags&16)!==0){var F=p.deletions;if(F!==null){for(var V=0;V<F.length;V++){var se=F[V];for(ze=se;ze!==null;){var ye=ze;switch(ye.tag){case 0:case 11:case 15:Ro(8,ye,p)}var Me=ye.child;if(Me!==null)Me.return=ye,ze=Me;else for(;ze!==null;){ye=ze;var ve=ye.sibling,Be=ye.return;if(hp(ye),ye===se){ze=null;break}if(ve!==null){ve.return=Be,ze=ve;break}ze=Be}}}var We=p.alternate;if(We!==null){var qe=We.child;if(qe!==null){We.child=null;do{var qt=qe.sibling;qe.sibling=null,qe=qt}while(qe!==null)}}ze=p}}if((p.subtreeFlags&2064)!==0&&M!==null)M.return=p,ze=M;else e:for(;ze!==null;){if(p=ze,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:Ro(9,p,p.return)}var $=p.sibling;if($!==null){$.return=p.return,ze=$;break e}ze=p.return}}var W=t.current;for(ze=W;ze!==null;){M=ze;var ee=M.child;if((M.subtreeFlags&2064)!==0&&ee!==null)ee.return=M,ze=ee;else e:for(M=W;ze!==null;){if(F=ze,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:Ha(9,F)}}catch(Ke){Xt(F,F.return,Ke)}if(F===M){ze=null;break e}var Te=F.sibling;if(Te!==null){Te.return=F.return,ze=Te;break e}ze=F.return}}if(At=f,nr(),je&&typeof je.onPostCommitFiberRoot=="function")try{je.onPostCommitFiberRoot(nt,t)}catch{}c=!0}return c}finally{wt=o,Qn.transition=i}}return!1}function bp(t,i,o){i=xs(o,i),i=qh(t,i,1),t=rr(t,i,1),i=wn(),t!==null&&(rn(t,1,i),In(t,i))}function Xt(t,i,o){if(t.tag===3)bp(t,t,o);else for(;i!==null;){if(i.tag===3){bp(i,t,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(or===null||!or.has(c))){t=xs(o,t),t=Yh(i,t,1),i=rr(i,t,1),t=wn(),i!==null&&(rn(i,1,t),In(i,t));break}}i=i.return}}function d_(t,i,o){var c=t.pingCache;c!==null&&c.delete(i),i=wn(),t.pingedLanes|=t.suspendedLanes&o,an===t&&(fn&o)===o&&(Jt===4||Jt===3&&(fn&130023424)===fn&&500>K()-uu?Ir(t,0):cu|=o),In(t,i)}function Pp(t,i){i===0&&((t.mode&1)===0?i=1:(i=jt,jt<<=1,(jt&130023424)===0&&(jt=4194304)));var o=wn();t=Ni(t,i),t!==null&&(rn(t,i,o),In(t,o))}function f_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),Pp(t,o)}function h_(t,i){var o=0;switch(t.tag){case 13:var c=t.stateNode,f=t.memoizedState;f!==null&&(o=f.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(i),Pp(t,o)}var Np;Np=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||Pn.current)Ln=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return Ln=!1,e_(t,i,o);Ln=(t.flags&131072)!==0}else Ln=!1,Ht&&(i.flags&1048576)!==0&&uh(i,Ta,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Ba(t,i),t=i.pendingProps;var f=ds(i,mn.current);_s(i,o),f=Hc(null,i,c,t,f,o);var p=Vc();return i.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Nn(c)?(p=!0,Sa(i)):p=!1,i.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,Ic(i),f.updater=Oa,i.stateNode=f,f._reactInternals=i,Yc(i,c,t,o),i=Qc(null,i,c,!0,p,o)):(i.tag=0,Ht&&p&&Tc(i),Tn(null,i,f,o),i=i.child),i;case 16:c=i.elementType;e:{switch(Ba(t,i),t=i.pendingProps,f=c._init,c=f(c._payload),i.type=c,f=i.tag=m_(c),t=ri(c,t),f){case 0:i=Zc(null,i,c,t,o);break e;case 1:i=ip(null,i,c,t,o);break e;case 11:i=Qh(null,i,c,t,o);break e;case 14:i=Jh(null,i,c,ri(c.type,t),o);break e}throw Error(n(306,c,""))}return i;case 0:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),Zc(t,i,c,f,o);case 1:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),ip(t,i,c,f,o);case 3:e:{if(rp(i),t===null)throw Error(n(387));c=i.pendingProps,p=i.memoizedState,f=p.element,xh(t,i),Pa(i,c,null,o);var M=i.memoizedState;if(c=M.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){f=xs(Error(n(423)),i),i=sp(t,i,c,o,f);break e}else if(c!==f){f=xs(Error(n(424)),i),i=sp(t,i,c,o,f);break e}else for(Bn=Ji(i.stateNode.containerInfo.firstChild),kn=i,Ht=!0,ii=null,o=_h(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(ps(),c===f){i=Di(t,i,o);break e}Tn(t,i,c,o)}i=i.child}return i;case 5:return Mh(i),t===null&&Cc(i),c=i.type,f=i.pendingProps,p=t!==null?t.memoizedProps:null,M=f.children,vc(c,f)?M=null:p!==null&&vc(c,p)&&(i.flags|=32),np(t,i),Tn(t,i,M,o),i.child;case 6:return t===null&&Cc(i),null;case 13:return op(t,i,o);case 4:return Uc(i,i.stateNode.containerInfo),c=i.pendingProps,t===null?i.child=ms(i,null,c,o):Tn(t,i,c,o),i.child;case 11:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),Qh(t,i,c,f,o);case 7:return Tn(t,i,i.pendingProps,o),i.child;case 8:return Tn(t,i,i.pendingProps.children,o),i.child;case 12:return Tn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,f=i.pendingProps,p=i.memoizedProps,M=f.value,Ft(Ca,c._currentValue),c._currentValue=M,p!==null)if(ni(p.value,M)){if(p.children===f.children&&!Pn.current){i=Di(t,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var F=p.dependencies;if(F!==null){M=p.child;for(var V=F.firstContext;V!==null;){if(V.context===c){if(p.tag===1){V=Li(-1,o&-o),V.tag=2;var se=p.updateQueue;if(se!==null){se=se.shared;var ye=se.pending;ye===null?V.next=V:(V.next=ye.next,ye.next=V),se.pending=V}}p.lanes|=o,V=p.alternate,V!==null&&(V.lanes|=o),Lc(p.return,o,i),F.lanes|=o;break}V=V.next}}else if(p.tag===10)M=p.type===i.type?null:p.child;else if(p.tag===18){if(M=p.return,M===null)throw Error(n(341));M.lanes|=o,F=M.alternate,F!==null&&(F.lanes|=o),Lc(M,o,i),M=p.sibling}else M=p.child;if(M!==null)M.return=p;else for(M=p;M!==null;){if(M===i){M=null;break}if(p=M.sibling,p!==null){p.return=M.return,M=p;break}M=M.return}p=M}Tn(t,i,f.children,o),i=i.child}return i;case 9:return f=i.type,c=i.pendingProps.children,_s(i,o),f=Kn(f),c=c(f),i.flags|=1,Tn(t,i,c,o),i.child;case 14:return c=i.type,f=ri(c,i.pendingProps),f=ri(c.type,f),Jh(t,i,c,f,o);case 15:return ep(t,i,i.type,i.pendingProps,o);case 17:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),Ba(t,i),i.tag=1,Nn(c)?(t=!0,Sa(i)):t=!1,_s(i,o),jh(i,c,f),Yc(i,c,f,o),Qc(null,i,c,!0,t,o);case 19:return lp(t,i,o);case 22:return tp(t,i,o)}throw Error(n(156,i.tag))};function Lp(t,i){return ia(t,i)}function p_(t,i,o,c){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Jn(t,i,o,c){return new p_(t,i,o,c)}function vu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function m_(t){if(typeof t=="function")return vu(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ae)return 11;if(t===me)return 14}return 2}function ur(t,i){var o=t.alternate;return o===null?(o=Jn(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Ka(t,i,o,c,f,p){var M=2;if(c=t,typeof t=="function")vu(t)&&(M=1);else if(typeof t=="string")M=5;else e:switch(t){case O:return Fr(o.children,f,p,i);case z:M=8,f|=8;break;case b:return t=Jn(12,o,i,f|2),t.elementType=b,t.lanes=p,t;case Q:return t=Jn(13,o,i,f),t.elementType=Q,t.lanes=p,t;case re:return t=Jn(19,o,i,f),t.elementType=re,t.lanes=p,t;case ue:return Za(o,f,p,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case A:M=10;break e;case I:M=9;break e;case ae:M=11;break e;case me:M=14;break e;case oe:M=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=Jn(M,o,i,f),i.elementType=t,i.type=c,i.lanes=p,i}function Fr(t,i,o,c){return t=Jn(7,t,c,i),t.lanes=o,t}function Za(t,i,o,c){return t=Jn(22,t,c,i),t.elementType=ue,t.lanes=o,t.stateNode={isHidden:!1},t}function xu(t,i,o){return t=Jn(6,t,null,i),t.lanes=o,t}function yu(t,i,o){return i=Jn(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function g_(t,i,o,c,f){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pn(0),this.expirationTimes=pn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pn(0),this.identifierPrefix=c,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function Su(t,i,o,c,f,p,M,F,V){return t=new g_(t,i,o,F,V),i===1?(i=1,p===!0&&(i|=8)):i=0,p=Jn(3,null,null,i),t.current=p,p.stateNode=t,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ic(p),t}function __(t,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:U,key:c==null?null:""+c,children:t,containerInfo:i,implementation:o}}function Dp(t){if(!t)return tr;t=t._reactInternals;e:{if(hi(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Nn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(Nn(o))return ah(t,o,i)}return i}function Ip(t,i,o,c,f,p,M,F,V){return t=Su(o,c,!0,t,f,p,M,F,V),t.context=Dp(null),o=t.current,c=wn(),f=lr(o),p=Li(c,f),p.callback=i??null,rr(o,p,f),t.current.lanes=f,rn(t,f,c),In(t,c),t}function Qa(t,i,o,c){var f=i.current,p=wn(),M=lr(f);return o=Dp(o),i.context===null?i.context=o:i.pendingContext=o,i=Li(p,M),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=rr(f,i,M),t!==null&&(ai(t,f,M,p),ba(t,f,M)),M}function Ja(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Up(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function Mu(t,i){Up(t,i),(t=t.alternate)&&Up(t,i)}function v_(){return null}var Fp=typeof reportError=="function"?reportError:function(t){console.error(t)};function Eu(t){this._internalRoot=t}el.prototype.render=Eu.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Qa(t,i,null,null)},el.prototype.unmount=Eu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Dr(function(){Qa(null,t,null,null)}),i[Ci]=null}};function el(t){this._internalRoot=t}el.prototype.unstable_scheduleHydration=function(t){if(t){var i=xf();t={blockedOn:null,target:t,priority:i};for(var o=0;o<Ki.length&&i!==0&&i<Ki[o].priority;o++);Ki.splice(o,0,t),o===0&&Mf(t)}};function Tu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function tl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Op(){}function x_(t,i,o,c,f){if(f){if(typeof c=="function"){var p=c;c=function(){var se=Ja(M);p.call(se)}}var M=Ip(i,c,t,0,null,!1,!1,"",Op);return t._reactRootContainer=M,t[Ci]=M.current,mo(t.nodeType===8?t.parentNode:t),Dr(),M}for(;f=t.lastChild;)t.removeChild(f);if(typeof c=="function"){var F=c;c=function(){var se=Ja(V);F.call(se)}}var V=Su(t,0,!1,null,null,!1,!1,"",Op);return t._reactRootContainer=V,t[Ci]=V.current,mo(t.nodeType===8?t.parentNode:t),Dr(function(){Qa(i,V,o,c)}),V}function nl(t,i,o,c,f){var p=o._reactRootContainer;if(p){var M=p;if(typeof f=="function"){var F=f;f=function(){var V=Ja(M);F.call(V)}}Qa(i,M,t,f)}else M=x_(o,i,t,f,c);return Ja(M)}_f=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=vt(i.pendingLanes);o!==0&&(sn(i,o|1),In(i,K()),(At&6)===0&&(Ms=K()+500,nr()))}break;case 13:Dr(function(){var c=Ni(t,1);if(c!==null){var f=wn();ai(c,t,1,f)}}),Mu(t,1)}},$l=function(t){if(t.tag===13){var i=Ni(t,134217728);if(i!==null){var o=wn();ai(i,t,134217728,o)}Mu(t,134217728)}},vf=function(t){if(t.tag===13){var i=lr(t),o=Ni(t,i);if(o!==null){var c=wn();ai(o,t,i,c)}Mu(t,i)}},xf=function(){return wt},yf=function(t,i){var o=wt;try{return wt=t,i()}finally{wt=o}},Ce=function(t,i,o){switch(i){case"input":if(He(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==t&&c.form===t.form){var f=xa(c);if(!f)throw Error(n(90));bt(c),He(c,f)}}}break;case"textarea":fe(t,o);break;case"select":i=o.value,i!=null&&N(t,!!o.multiple,i,!1)}},Ot=mu,Zt=Dr;var y_={usingClientEntryPoint:!1,Events:[vo,cs,xa,Ie,lt,mu]},Lo={findFiberByHostInstance:wr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},S_={bundleType:Lo.bundleType,version:Lo.version,rendererPackageName:Lo.rendererPackageName,rendererConfig:Lo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ta(t),t===null?null:t.stateNode},findFiberByHostInstance:Lo.findFiberByHostInstance||v_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var il=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!il.isDisabled&&il.supportsFiber)try{nt=il.inject(S_),je=il}catch{}}return Un.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=y_,Un.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Tu(i))throw Error(n(200));return __(t,i,null,o)},Un.createRoot=function(t,i){if(!Tu(t))throw Error(n(299));var o=!1,c="",f=Fp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),i=Su(t,1,!1,null,null,o,!1,c,f),t[Ci]=i.current,mo(t.nodeType===8?t.parentNode:t),new Eu(i)},Un.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=ta(i),t=t===null?null:t.stateNode,t},Un.flushSync=function(t){return Dr(t)},Un.hydrate=function(t,i,o){if(!tl(i))throw Error(n(200));return nl(null,t,i,!0,o)},Un.hydrateRoot=function(t,i,o){if(!Tu(t))throw Error(n(405));var c=o!=null&&o.hydratedSources||null,f=!1,p="",M=Fp;if(o!=null&&(o.unstable_strictMode===!0&&(f=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(M=o.onRecoverableError)),i=Ip(i,null,t,1,o??null,f,!1,p,M),t[Ci]=i.current,mo(t),c)for(t=0;t<c.length;t++)o=c[t],f=o._getVersion,f=f(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,f]:i.mutableSourceEagerHydrationData.push(o,f);return new el(i)},Un.render=function(t,i,o){if(!tl(i))throw Error(n(200));return nl(null,t,i,!1,o)},Un.unmountComponentAtNode=function(t){if(!tl(t))throw Error(n(40));return t._reactRootContainer?(Dr(function(){nl(null,null,t,!1,function(){t._reactRootContainer=null,t[Ci]=null})}),!0):!1},Un.unstable_batchedUpdates=mu,Un.unstable_renderSubtreeIntoContainer=function(t,i,o,c){if(!tl(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return nl(t,i,o,!1,c)},Un.version="18.3.1-next-f1338f8080-20240426",Un}var jp;function P_(){if(jp)return Cu.exports;jp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Cu.exports=b_(),Cu.exports}var Xp;function N_(){if(Xp)return rl;Xp=1;var s=P_();return rl.createRoot=s.createRoot,rl.hydrateRoot=s.hydrateRoot,rl}var L_=N_();const D_=sg(L_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I_=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),og=(...s)=>s.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var U_={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F_=ot.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:a="",children:l,iconNode:u,...d},h)=>ot.createElement("svg",{ref:h,...U_,width:e,height:e,stroke:s,strokeWidth:r?Number(n)*24/Number(e):n,className:og("lucide",a),...d},[...u.map(([m,g])=>ot.createElement(m,g)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=(s,e)=>{const n=ot.forwardRef(({className:r,...a},l)=>ot.createElement(F_,{ref:l,iconNode:e,className:og(`lucide-${I_(s)}`,r),...a}));return n.displayName=`${s}`,n};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O_=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Kd=Pt("ArrowLeft",O_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k_=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Zd=Pt("ArrowRight",k_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B_=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],z_=Pt("Award",B_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H_=[["rect",{x:"14",y:"14",width:"4",height:"6",rx:"2",key:"p02svl"}],["rect",{x:"6",y:"4",width:"4",height:"6",rx:"2",key:"xm4xkj"}],["path",{d:"M6 20h4",key:"1i6q5t"}],["path",{d:"M14 10h4",key:"ru81e7"}],["path",{d:"M6 14h2v6",key:"16z9wg"}],["path",{d:"M14 4h2v6",key:"1idq9u"}]],V_=Pt("Binary",H_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G_=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],W_=Pt("Check",G_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j_=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],X_=Pt("CircleCheck",j_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q_=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Y_=Pt("CircleHelp",q_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $_=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],K_=Pt("CodeXml",$_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z_=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]],Q_=Pt("Command",Z_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J_=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],ev=Pt("Compass",J_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tv=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],nv=Pt("Copy",tv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iv=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ag=Pt("Eye",iv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rv=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]],sv=Pt("Flame",rv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ov=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66",key:"4oyue0"}],["path",{d:"m18 15-2-2",key:"60u0ii"}],["path",{d:"m15 18-2-2",key:"6p76be"}]],av=Pt("HeartHandshake",ov);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lv=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],cv=Pt("Layers",lv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uv=[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416",key:"eohfx2"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416",key:"19pvbm"}]],dv=Pt("Orbit",uv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fv=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],hv=Pt("Play",fv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pv=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],lg=Pt("RefreshCw",pv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],gv=Pt("Share2",mv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _v=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],cg=Pt("ShieldCheck",_v);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vv=[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]],xv=Pt("SlidersVertical",vv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],Gl=Pt("Sparkles",yv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],Mv=Pt("Terminal",Sv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ev=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],Tv=Pt("Volume2",Ev);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],Av=Pt("VolumeX",wv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Rv=Pt("WandSparkles",Cv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]],Pv=Pt("Wind",bv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Lv=Pt("X",Nv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Iv=Pt("Zap",Dv);class Uv{ctx=null;isMuted=!0;masterGain=null;filterNode=null;constructor(){}initContext(){if(!this.ctx)try{const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.isMuted?0:.15,this.ctx.currentTime),this.filterNode=this.ctx.createBiquadFilter(),this.filterNode.type="lowpass",this.filterNode.frequency.setValueAtTime(2400,this.ctx.currentTime),this.filterNode.Q.setValueAtTime(3,this.ctx.currentTime),this.masterGain.connect(this.filterNode),this.filterNode.connect(this.ctx.destination))}catch{}}setMuted(e){if(this.isMuted=e,!this.ctx&&!e&&this.initContext(),this.ctx&&this.ctx.state==="suspended"&&!e&&this.ctx.resume(),this.masterGain&&this.ctx){const n=e?0:.15;this.masterGain.gain.setTargetAtTime(n,this.ctx.currentTime,.05)}}getMuted(){return this.isMuted}triggerHarmonicChime(e=432,n=1.2,r=.5){if(this.isMuted||(this.initContext(),!this.ctx||!this.masterGain))return;this.ctx.state==="suspended"&&this.ctx.resume();const a=this.ctx.currentTime,l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type="sine",l.frequency.setValueAtTime(e,a);const d=this.ctx.createOscillator(),h=this.ctx.createGain();d.type="triangle",d.frequency.setValueAtTime(e*(1.5+r*.5),a),u.gain.setValueAtTime(.001,a),u.gain.exponentialRampToValueAtTime(.3,a+.04),u.gain.exponentialRampToValueAtTime(1e-4,a+n),h.gain.setValueAtTime(.001,a),h.gain.exponentialRampToValueAtTime(.12*r,a+.03),h.gain.exponentialRampToValueAtTime(1e-4,a+n*.8),l.connect(u),u.connect(this.masterGain),d.connect(h),h.connect(this.masterGain),l.start(a),d.start(a),l.stop(a+n+.1),d.stop(a+n+.1)}triggerStressSweep(e=.8){if(this.isMuted||(this.initContext(),!this.ctx||!this.masterGain))return;const n=this.ctx.currentTime,r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(110,n),r.frequency.exponentialRampToValueAtTime(440+e*400,n+.4),r.frequency.exponentialRampToValueAtTime(220,n+.9),a.gain.setValueAtTime(.001,n),a.gain.exponentialRampToValueAtTime(.15*e,n+.1),a.gain.exponentialRampToValueAtTime(1e-4,n+1),r.connect(a),a.connect(this.masterGain),r.start(n),r.stop(n+1.1)}triggerHapticTick(){if(this.isMuted||(this.initContext(),!this.ctx||!this.masterGain))return;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),r=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(880,e),n.frequency.exponentialRampToValueAtTime(220,e+.03),r.gain.setValueAtTime(.08,e),r.gain.exponentialRampToValueAtTime(.001,e+.03),n.connect(r),r.connect(this.masterGain),n.start(e),n.stop(e+.04)}}const Ut=new Uv,Fv=({currentPhase:s,onPhaseSelect:e,inspectionMode:n,onToggleInspection:r,soundEnabled:a,onToggleSound:l,reducedMotion:u,onToggleReducedMotion:d,onOpenHelp:h})=>{const m=[{id:"genesis",num:"01",label:"觉醒"},{id:"dialectic",num:"02",label:"思辨"},{id:"cocreation",num:"03",label:"共生"},{id:"archive",num:"04",label:"刻印"}];return P.jsxs("header",{className:"sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 glass-panel border-b border-white/5 flex items-center justify-between gap-4",children:[P.jsxs("div",{className:"flex items-center gap-3",children:[P.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-tr from-aurora-cyan via-aurora-violet to-aurora-amber p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]",children:P.jsx("div",{className:"w-full h-full bg-titanium-950 rounded-[7px] flex items-center justify-center",children:P.jsx("span",{className:"font-display font-bold text-xs text-white",children:"R"})})}),P.jsxs("div",{className:"flex flex-col",children:[P.jsxs("span",{className:"text-xs font-bold font-mono-tech tracking-wider text-white flex items-center gap-1.5",children:["REFRACTIVE TOPOGRAPHY",P.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-aurora-phosphor animate-pulse"})]}),P.jsx("span",{className:"text-[10px] font-sans text-mercury-400",children:"认知折射地貌 · 思考自画像"})]})]}),P.jsx("nav",{className:"hidden md:flex items-center p-1 rounded-full bg-titanium-900 border border-white/5","aria-label":"体验阶段导航",children:m.map(g=>{const v=s===g.id;return P.jsxs("button",{onClick:()=>{e(g.id),Ut.triggerHarmonicChime(500+parseInt(g.num)*100,.5,.6)},className:`px-3.5 py-1.5 rounded-full text-xs font-mono-tech flex items-center gap-1.5 transition-all ${v?"bg-titanium-700 text-white shadow-md border border-white/15":"text-mercury-400 hover:text-white hover:bg-white/5"}`,"aria-current":v?"step":void 0,children:[P.jsx("span",{className:`text-[10px] ${v?"text-aurora-cyan":"opacity-40"}`,children:g.num}),P.jsx("span",{children:g.label})]},g.id)})}),P.jsxs("div",{className:"flex items-center gap-2",children:[P.jsxs("button",{onClick:()=>{Ut.triggerHapticTick(),r()},className:`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${n?"bg-aurora-phosphor/20 border-aurora-phosphor text-aurora-phosphor":"border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20"}`,title:"切换底模张力透镜 (Shift+C)","aria-label":"切换张力透镜","aria-pressed":n,children:[P.jsx(ag,{className:"w-4 h-4"}),P.jsx("span",{className:"hidden xl:inline text-[11px]",children:"透镜"})]}),P.jsxs("button",{onClick:()=>{l()},className:`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${a?"bg-aurora-cyan/20 border-aurora-cyan text-aurora-cyan":"border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20"}`,title:a?"静音 (M)":"开启谐波声画合成器 (M)","aria-label":"声音开关","aria-pressed":a,children:[a?P.jsx(Tv,{className:"w-4 h-4 animate-pulse"}):P.jsx(Av,{className:"w-4 h-4"}),P.jsx("span",{className:"hidden xl:inline text-[11px]",children:"声画"})]}),P.jsxs("button",{onClick:()=>{Ut.triggerHapticTick(),d()},className:`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${u?"bg-aurora-amber/20 border-aurora-amber text-aurora-amber":"border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20"}`,title:"减弱动效/晶体静态投影 (R)","aria-label":"减弱动效开关","aria-pressed":u,children:[P.jsx(Pv,{className:"w-4 h-4"}),P.jsx("span",{className:"hidden xl:inline text-[11px]",children:"静态晶体"})]}),P.jsx("button",{onClick:()=>{Ut.triggerHapticTick(),h()},className:"p-2 rounded-lg border border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20 transition-all",title:"快捷键指南 (?)","aria-label":"快捷键指南",children:P.jsx(Y_,{className:"w-4 h-4"})})]})]})},Ov=({isOpen:s,onClose:e})=>{if(!s)return null;const n=[{key:"1 - 4",desc:"直接跳转对应体验阶段 (01 觉醒 / 02 思辨 / 03 共生 / 04 刻印)"},{key:"Shift + C / ~",desc:"开启/关闭 底模张力透镜 (Vector Lens Inspection Mode)"},{key:"M",desc:"开启/静音 谐波声画合成器 (Toggle Audio-Visual Chimes)"},{key:"R",desc:"切换 减弱动效/晶体静态建筑投影模式 (Reduced Motion Toggle)"},{key:"?",desc:"打开/关闭 快捷键与认知指令调色板"},{key:"Esc",desc:"关闭当前弹窗与聚焦层"}];return P.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-titanium-950/80 backdrop-blur-md animate-fadeIn",role:"dialog","aria-modal":"true","aria-labelledby":"hotkey-title",children:P.jsxs("div",{className:"relative w-full max-w-lg p-6 rounded-2xl glass-panel-glow border border-aurora-cyan/30 shadow-2xl space-y-5",children:[P.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 pb-3",children:[P.jsxs("div",{className:"flex items-center gap-2",children:[P.jsx(Q_,{className:"w-5 h-5 text-aurora-cyan"}),P.jsx("h2",{id:"hotkey-title",className:"text-sm font-bold font-mono-tech text-white uppercase tracking-wider",children:"// 认知控制台与全键盘导航指南"})]}),P.jsx("button",{onClick:()=>{Ut.triggerHapticTick(),e()},className:"p-1 rounded-lg text-mercury-400 hover:text-white hover:bg-white/10 transition-colors","aria-label":"关闭",children:P.jsx(Lv,{className:"w-4 h-4"})})]}),P.jsx("p",{className:"text-xs text-mercury-300 font-sans leading-relaxed",children:"作品提供全链路物理键盘控制与无障碍焦点流，你可以无需鼠标完全通过键盘游历所有维度："}),P.jsx("div",{className:"space-y-2 font-mono-tech text-xs",children:n.map(r=>P.jsxs("div",{className:"flex items-center justify-between p-2.5 rounded-xl bg-titanium-900/80 border border-white/5 hover:border-white/15 transition-all",children:[P.jsx("span",{className:"px-2 py-0.5 rounded bg-titanium-700 text-aurora-cyan font-bold text-[11px] border border-white/10",children:r.key}),P.jsx("span",{className:"text-mercury-300 text-[11px] font-sans text-right",children:r.desc})]},r.key))}),P.jsxs("div",{className:"flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono-tech text-mercury-400",children:[P.jsxs("div",{className:"flex items-center gap-1.5 text-aurora-phosphor",children:[P.jsx(cg,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"WCAG 2.1 AAA 键盘焦点友好"})]}),P.jsx("button",{onClick:e,className:"px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all",children:"知晓并返回"})]})]})})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qd="173",kv=0,qp=1,Bv=2,ug=1,zv=2,zi=3,Sr=0,Fn=1,yi=2,xr=0,Vs=1,Ol=2,Yp=3,$p=4,Hv=5,jr=100,Vv=101,Gv=102,Wv=103,jv=104,Xv=200,qv=201,Yv=202,$v=203,ad=204,ld=205,Kv=206,Zv=207,Qv=208,Jv=209,ex=210,tx=211,nx=212,ix=213,rx=214,cd=0,ud=1,dd=2,js=3,fd=4,hd=5,pd=6,md=7,dg=0,sx=1,ox=2,yr=0,ax=1,lx=2,cx=3,fg=4,ux=5,dx=6,fx=7,hg=300,Xs=301,qs=302,gd=303,_d=304,Wl=306,vd=1e3,qr=1001,xd=1002,jn=1003,hx=1004,sl=1005,Si=1006,Pu=1007,Yr=1008,Gi=1009,pg=1010,mg=1011,Xo=1012,Jd=1013,$r=1014,Mi=1015,Yo=1016,ef=1017,tf=1018,Ys=1020,gg=35902,_g=1021,vg=1022,fi=1023,xg=1024,yg=1025,Gs=1026,$s=1027,nf=1028,rf=1029,Sg=1030,sf=1031,of=1033,Nl=33776,Ll=33777,Dl=33778,Il=33779,yd=35840,Sd=35841,Md=35842,Ed=35843,Td=36196,wd=37492,Ad=37496,Cd=37808,Rd=37809,bd=37810,Pd=37811,Nd=37812,Ld=37813,Dd=37814,Id=37815,Ud=37816,Fd=37817,Od=37818,kd=37819,Bd=37820,zd=37821,Ul=36492,Hd=36494,Vd=36495,Mg=36283,Gd=36284,Wd=36285,jd=36286,px=3200,mx=3201,Eg=0,gx=1,vr="",ti="srgb",Ks="srgb-linear",kl="linear",Nt="srgb",Ts=7680,Kp=519,_x=512,vx=513,xx=514,Tg=515,yx=516,Sx=517,Mx=518,Ex=519,Zp=35044,Qp="300 es",Hi=2e3,Bl=2001;class Qs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,u=a.length;l<u;l++)a[l].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jp=1234567;const Wo=Math.PI/180,qo=180/Math.PI;function Js(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[n&63|128]+xn[n>>8&255]+"-"+xn[n>>16&255]+xn[n>>24&255]+xn[r&255]+xn[r>>8&255]+xn[r>>16&255]+xn[r>>24&255]).toLowerCase()}function gt(s,e,n){return Math.max(e,Math.min(n,s))}function af(s,e){return(s%e+e)%e}function Tx(s,e,n,r,a){return r+(s-e)*(a-r)/(n-e)}function wx(s,e,n){return s!==e?(n-s)/(e-s):0}function jo(s,e,n){return(1-n)*s+n*e}function Ax(s,e,n,r){return jo(s,e,1-Math.exp(-n*r))}function Cx(s,e=1){return e-Math.abs(af(s,e*2)-e)}function Rx(s,e,n){return s<=e?0:s>=n?1:(s=(s-e)/(n-e),s*s*(3-2*s))}function bx(s,e,n){return s<=e?0:s>=n?1:(s=(s-e)/(n-e),s*s*s*(s*(s*6-15)+10))}function Px(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Nx(s,e){return s+Math.random()*(e-s)}function Lx(s){return s*(.5-Math.random())}function Dx(s){s!==void 0&&(Jp=s);let e=Jp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ix(s){return s*Wo}function Ux(s){return s*qo}function Fx(s){return(s&s-1)===0&&s!==0}function Ox(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function kx(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Bx(s,e,n,r,a){const l=Math.cos,u=Math.sin,d=l(n/2),h=u(n/2),m=l((e+r)/2),g=u((e+r)/2),v=l((e-r)/2),x=u((e-r)/2),S=l((r-e)/2),E=u((r-e)/2);switch(a){case"XYX":s.set(d*g,h*v,h*x,d*m);break;case"YZY":s.set(h*x,d*g,h*v,d*m);break;case"ZXZ":s.set(h*v,h*x,d*g,d*m);break;case"XZX":s.set(d*g,h*E,h*S,d*m);break;case"YXY":s.set(h*S,d*g,h*E,d*m);break;case"ZYZ":s.set(h*E,h*S,d*g,d*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Bs(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function An(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const em={DEG2RAD:Wo,RAD2DEG:qo,generateUUID:Js,clamp:gt,euclideanModulo:af,mapLinear:Tx,inverseLerp:wx,lerp:jo,damp:Ax,pingpong:Cx,smoothstep:Rx,smootherstep:bx,randInt:Px,randFloat:Nx,randFloatSpread:Lx,seededRandom:Dx,degToRad:Ix,radToDeg:Ux,isPowerOfTwo:Fx,ceilPowerOfTwo:Ox,floorPowerOfTwo:kx,setQuaternionFromProperEuler:Bx,normalize:An,denormalize:Bs};class xt{constructor(e=0,n=0){xt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(gt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*a+e.x,this.y=l*a+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,n,r,a,l,u,d,h,m){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,u,d,h,m)}set(e,n,r,a,l,u,d,h,m){const g=this.elements;return g[0]=e,g[1]=a,g[2]=d,g[3]=n,g[4]=l,g[5]=h,g[6]=r,g[7]=u,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,u=r[0],d=r[3],h=r[6],m=r[1],g=r[4],v=r[7],x=r[2],S=r[5],E=r[8],w=a[0],y=a[3],_=a[6],D=a[1],L=a[4],C=a[7],B=a[2],U=a[5],O=a[8];return l[0]=u*w+d*D+h*B,l[3]=u*y+d*L+h*U,l[6]=u*_+d*C+h*O,l[1]=m*w+g*D+v*B,l[4]=m*y+g*L+v*U,l[7]=m*_+g*C+v*O,l[2]=x*w+S*D+E*B,l[5]=x*y+S*L+E*U,l[8]=x*_+S*C+E*O,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],d=e[5],h=e[6],m=e[7],g=e[8];return n*u*g-n*d*m-r*l*g+r*d*h+a*l*m-a*u*h}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],d=e[5],h=e[6],m=e[7],g=e[8],v=g*u-d*m,x=d*h-g*l,S=m*l-u*h,E=n*v+r*x+a*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=v*w,e[1]=(a*m-g*r)*w,e[2]=(d*r-a*u)*w,e[3]=x*w,e[4]=(g*n-a*h)*w,e[5]=(a*l-d*n)*w,e[6]=S*w,e[7]=(r*h-m*n)*w,e[8]=(u*n-r*l)*w,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,l,u,d){const h=Math.cos(l),m=Math.sin(l);return this.set(r*h,r*m,-r*(h*u+m*d)+u+e,-a*m,a*h,-a*(-m*u+h*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(Nu.makeScale(e,n)),this}rotate(e){return this.premultiply(Nu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Nu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Nu=new dt;function wg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function zl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zx(){const s=zl("canvas");return s.style.display="block",s}const tm={};function zs(s){s in tm||(tm[s]=!0,console.warn(s))}function Hx(s,e,n){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,n);break;default:r()}}setTimeout(l,n)})}function Vx(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Gx(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const nm=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),im=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wx(){const s={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(a,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===Nt&&(a.r=Vi(a.r),a.g=Vi(a.g),a.b=Vi(a.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(a.applyMatrix3(this.spaces[l].toXYZ),a.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Nt&&(a.r=Ws(a.r),a.g=Ws(a.g),a.b=Ws(a.b))),a},fromWorkingColorSpace:function(a,l){return this.convert(a,this.workingColorSpace,l)},toWorkingColorSpace:function(a,l){return this.convert(a,l,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===vr?kl:this.spaces[a].transfer},getLuminanceCoefficients:function(a,l=this.workingColorSpace){return a.fromArray(this.spaces[l].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,l,u){return a.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Ks]:{primaries:e,whitePoint:r,transfer:kl,toXYZ:nm,fromXYZ:im,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:e,whitePoint:r,transfer:Nt,toXYZ:nm,fromXYZ:im,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),s}const Rt=Wx();function Vi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ws(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ws;class jx{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ws===void 0&&(ws=zl("canvas")),ws.width=e.width,ws.height=e.height;const r=ws.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ws}return n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=zl("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let u=0;u<l.length;u++)l[u]=Vi(l[u]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Vi(n[r]/255)*255):n[r]=Vi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xx=0;class Ag{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xx++}),this.uuid=Js(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let u=0,d=a.length;u<d;u++)a[u].isDataTexture?l.push(Lu(a[u].image)):l.push(Lu(a[u]))}else l=Lu(a);r.url=l}return n||(e.images[this.uuid]=r),r}}function Lu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?jx.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qx=0;class Rn extends Qs{constructor(e=Rn.DEFAULT_IMAGE,n=Rn.DEFAULT_MAPPING,r=qr,a=qr,l=Si,u=Yr,d=fi,h=Gi,m=Rn.DEFAULT_ANISOTROPY,g=vr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=Js(),this.name="",this.source=new Ag(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=u,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=h,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vd:e.x=e.x-Math.floor(e.x);break;case qr:e.x=e.x<0?0:1;break;case xd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vd:e.y=e.y-Math.floor(e.y);break;case qr:e.y=e.y<0?0:1;break;case xd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=hg;Rn.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,n=0,r=0,a=1){Lt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=this.w,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a+u[12]*l,this.y=u[1]*n+u[5]*r+u[9]*a+u[13]*l,this.z=u[2]*n+u[6]*r+u[10]*a+u[14]*l,this.w=u[3]*n+u[7]*r+u[11]*a+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,l;const h=e.elements,m=h[0],g=h[4],v=h[8],x=h[1],S=h[5],E=h[9],w=h[2],y=h[6],_=h[10];if(Math.abs(g-x)<.01&&Math.abs(v-w)<.01&&Math.abs(E-y)<.01){if(Math.abs(g+x)<.1&&Math.abs(v+w)<.1&&Math.abs(E+y)<.1&&Math.abs(m+S+_-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const L=(m+1)/2,C=(S+1)/2,B=(_+1)/2,U=(g+x)/4,O=(v+w)/4,z=(E+y)/4;return L>C&&L>B?L<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(L),a=U/r,l=O/r):C>B?C<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(C),r=U/a,l=z/a):B<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(B),r=O/l,a=z/l),this.set(r,a,l,n),this}let D=Math.sqrt((y-E)*(y-E)+(v-w)*(v-w)+(x-g)*(x-g));return Math.abs(D)<.001&&(D=1),this.x=(y-E)/D,this.y=(v-w)/D,this.z=(x-g)/D,this.w=Math.acos((m+S+_-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this.z=gt(this.z,e.z,n.z),this.w=gt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this.z=gt(this.z,e,n),this.w=gt(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yx extends Qs{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Lt(0,0,e,n),this.scissorTest=!1,this.viewport=new Lt(0,0,e,n);const a={width:e,height:n,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Rn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let d=0;d<u;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const n=Object.assign({},e.texture.image);return this.texture.source=new Ag(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kr extends Yx{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class Cg extends Rn{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=jn,this.minFilter=jn,this.wrapR=qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $x extends Rn{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=jn,this.minFilter=jn,this.wrapR=qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $o{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,l,u,d){let h=r[a+0],m=r[a+1],g=r[a+2],v=r[a+3];const x=l[u+0],S=l[u+1],E=l[u+2],w=l[u+3];if(d===0){e[n+0]=h,e[n+1]=m,e[n+2]=g,e[n+3]=v;return}if(d===1){e[n+0]=x,e[n+1]=S,e[n+2]=E,e[n+3]=w;return}if(v!==w||h!==x||m!==S||g!==E){let y=1-d;const _=h*x+m*S+g*E+v*w,D=_>=0?1:-1,L=1-_*_;if(L>Number.EPSILON){const B=Math.sqrt(L),U=Math.atan2(B,_*D);y=Math.sin(y*U)/B,d=Math.sin(d*U)/B}const C=d*D;if(h=h*y+x*C,m=m*y+S*C,g=g*y+E*C,v=v*y+w*C,y===1-d){const B=1/Math.sqrt(h*h+m*m+g*g+v*v);h*=B,m*=B,g*=B,v*=B}}e[n]=h,e[n+1]=m,e[n+2]=g,e[n+3]=v}static multiplyQuaternionsFlat(e,n,r,a,l,u){const d=r[a],h=r[a+1],m=r[a+2],g=r[a+3],v=l[u],x=l[u+1],S=l[u+2],E=l[u+3];return e[n]=d*E+g*v+h*S-m*x,e[n+1]=h*E+g*x+m*v-d*S,e[n+2]=m*E+g*S+d*x-h*v,e[n+3]=g*E-d*v-h*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,l=e._z,u=e._order,d=Math.cos,h=Math.sin,m=d(r/2),g=d(a/2),v=d(l/2),x=h(r/2),S=h(a/2),E=h(l/2);switch(u){case"XYZ":this._x=x*g*v+m*S*E,this._y=m*S*v-x*g*E,this._z=m*g*E+x*S*v,this._w=m*g*v-x*S*E;break;case"YXZ":this._x=x*g*v+m*S*E,this._y=m*S*v-x*g*E,this._z=m*g*E-x*S*v,this._w=m*g*v+x*S*E;break;case"ZXY":this._x=x*g*v-m*S*E,this._y=m*S*v+x*g*E,this._z=m*g*E+x*S*v,this._w=m*g*v-x*S*E;break;case"ZYX":this._x=x*g*v-m*S*E,this._y=m*S*v+x*g*E,this._z=m*g*E-x*S*v,this._w=m*g*v+x*S*E;break;case"YZX":this._x=x*g*v+m*S*E,this._y=m*S*v+x*g*E,this._z=m*g*E-x*S*v,this._w=m*g*v-x*S*E;break;case"XZY":this._x=x*g*v-m*S*E,this._y=m*S*v-x*g*E,this._z=m*g*E+x*S*v,this._w=m*g*v+x*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],l=n[8],u=n[1],d=n[5],h=n[9],m=n[2],g=n[6],v=n[10],x=r+d+v;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(g-h)*S,this._y=(l-m)*S,this._z=(u-a)*S}else if(r>d&&r>v){const S=2*Math.sqrt(1+r-d-v);this._w=(g-h)/S,this._x=.25*S,this._y=(a+u)/S,this._z=(l+m)/S}else if(d>v){const S=2*Math.sqrt(1+d-r-v);this._w=(l-m)/S,this._x=(a+u)/S,this._y=.25*S,this._z=(h+g)/S}else{const S=2*Math.sqrt(1+v-r-d);this._w=(u-a)/S,this._x=(l+m)/S,this._y=(h+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,l=e._z,u=e._w,d=n._x,h=n._y,m=n._z,g=n._w;return this._x=r*g+u*d+a*m-l*h,this._y=a*g+u*h+l*d-r*m,this._z=l*g+u*m+r*h-a*d,this._w=u*g-r*d-a*h-l*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,u=this._w;let d=u*e._w+r*e._x+a*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=r,this._y=a,this._z=l,this;const h=1-d*d;if(h<=Number.EPSILON){const S=1-n;return this._w=S*u+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*l+n*this._z,this.normalize(),this}const m=Math.sqrt(h),g=Math.atan2(m,d),v=Math.sin((1-n)*g)/m,x=Math.sin(n*g)/m;return this._w=u*v+this._w*x,this._x=r*v+this._x*x,this._y=a*v+this._y*x,this._z=l*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(n),l*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,n=0,r=0){Y.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(rm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(rm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[3]*r+l[6]*a,this.y=l[1]*n+l[4]*r+l[7]*a,this.z=l[2]*n+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=e.elements,u=1/(l[3]*n+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*n+l[4]*r+l[8]*a+l[12])*u,this.y=(l[1]*n+l[5]*r+l[9]*a+l[13])*u,this.z=(l[2]*n+l[6]*r+l[10]*a+l[14])*u,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,l=e.x,u=e.y,d=e.z,h=e.w,m=2*(u*a-d*r),g=2*(d*n-l*a),v=2*(l*r-u*n);return this.x=n+h*m+u*v-d*g,this.y=r+h*g+d*m-l*v,this.z=a+h*v+l*g-u*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[4]*r+l[8]*a,this.y=l[1]*n+l[5]*r+l[9]*a,this.z=l[2]*n+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this.z=gt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this.z=gt(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,l=e.z,u=n.x,d=n.y,h=n.z;return this.x=a*h-l*d,this.y=l*u-r*h,this.z=r*d-a*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Du.copy(this).projectOnVector(e),this.sub(Du)}reflect(e){return this.sub(Du.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(gt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Du=new Y,rm=new $o;class Zr{constructor(e=new Y(1/0,1/0,1/0),n=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(li.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(li.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=li.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(n===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,li):li.fromBufferAttribute(l,u),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ol.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),ol.copy(r.boundingBox)),ol.applyMatrix4(e.matrixWorld),this.union(ol)}const a=e.children;for(let l=0,u=a.length;l<u;l++)this.expandByObject(a[l],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Io),al.subVectors(this.max,Io),As.subVectors(e.a,Io),Cs.subVectors(e.b,Io),Rs.subVectors(e.c,Io),fr.subVectors(Cs,As),hr.subVectors(Rs,Cs),Or.subVectors(As,Rs);let n=[0,-fr.z,fr.y,0,-hr.z,hr.y,0,-Or.z,Or.y,fr.z,0,-fr.x,hr.z,0,-hr.x,Or.z,0,-Or.x,-fr.y,fr.x,0,-hr.y,hr.x,0,-Or.y,Or.x,0];return!Iu(n,As,Cs,Rs,al)||(n=[1,0,0,0,1,0,0,0,1],!Iu(n,As,Cs,Rs,al))?!1:(ll.crossVectors(fr,hr),n=[ll.x,ll.y,ll.z],Iu(n,As,Cs,Rs,al))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ui=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],li=new Y,ol=new Zr,As=new Y,Cs=new Y,Rs=new Y,fr=new Y,hr=new Y,Or=new Y,Io=new Y,al=new Y,ll=new Y,kr=new Y;function Iu(s,e,n,r,a){for(let l=0,u=s.length-3;l<=u;l+=3){kr.fromArray(s,l);const d=a.x*Math.abs(kr.x)+a.y*Math.abs(kr.y)+a.z*Math.abs(kr.z),h=e.dot(kr),m=n.dot(kr),g=r.dot(kr);if(Math.max(-Math.max(h,m,g),Math.min(h,m,g))>d)return!1}return!0}const Kx=new Zr,Uo=new Y,Uu=new Y;class Qr{constructor(e=new Y,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):Kx.setFromPoints(e).getCenter(r);let a=0;for(let l=0,u=e.length;l<u;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Uo.subVectors(e,this.center);const n=Uo.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Uo,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Uo.copy(e.center).add(Uu)),this.expandByPoint(Uo.copy(e.center).sub(Uu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new Y,Fu=new Y,cl=new Y,pr=new Y,Ou=new Y,ul=new Y,ku=new Y;class lf{constructor(e=new Y,n=new Y(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,n),Fi.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){Fu.copy(e).add(n).multiplyScalar(.5),cl.copy(n).sub(e).normalize(),pr.copy(this.origin).sub(Fu);const l=e.distanceTo(n)*.5,u=-this.direction.dot(cl),d=pr.dot(this.direction),h=-pr.dot(cl),m=pr.lengthSq(),g=Math.abs(1-u*u);let v,x,S,E;if(g>0)if(v=u*h-d,x=u*d-h,E=l*g,v>=0)if(x>=-E)if(x<=E){const w=1/g;v*=w,x*=w,S=v*(v+u*x+2*d)+x*(u*v+x+2*h)+m}else x=l,v=Math.max(0,-(u*x+d)),S=-v*v+x*(x+2*h)+m;else x=-l,v=Math.max(0,-(u*x+d)),S=-v*v+x*(x+2*h)+m;else x<=-E?(v=Math.max(0,-(-u*l+d)),x=v>0?-l:Math.min(Math.max(-l,-h),l),S=-v*v+x*(x+2*h)+m):x<=E?(v=0,x=Math.min(Math.max(-l,-h),l),S=x*(x+2*h)+m):(v=Math.max(0,-(u*l+d)),x=v>0?l:Math.min(Math.max(-l,-h),l),S=-v*v+x*(x+2*h)+m);else x=u>0?-l:l,v=Math.max(0,-(u*x+d)),S=-v*v+x*(x+2*h)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,v),a&&a.copy(Fu).addScaledVector(cl,x),S}intersectSphere(e,n){Fi.subVectors(e.center,this.origin);const r=Fi.dot(this.direction),a=Fi.dot(Fi)-r*r,l=e.radius*e.radius;if(a>l)return null;const u=Math.sqrt(l-a),d=r-u,h=r+u;return h<0?null:d<0?this.at(h,n):this.at(d,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,l,u,d,h;const m=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),g>=0?(l=(e.min.y-x.y)*g,u=(e.max.y-x.y)*g):(l=(e.max.y-x.y)*g,u=(e.min.y-x.y)*g),r>u||l>a||((l>r||isNaN(r))&&(r=l),(u<a||isNaN(a))&&(a=u),v>=0?(d=(e.min.z-x.z)*v,h=(e.max.z-x.z)*v):(d=(e.max.z-x.z)*v,h=(e.min.z-x.z)*v),r>h||d>a)||((d>r||r!==r)&&(r=d),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,n,r,a,l){Ou.subVectors(n,e),ul.subVectors(r,e),ku.crossVectors(Ou,ul);let u=this.direction.dot(ku),d;if(u>0){if(a)return null;d=1}else if(u<0)d=-1,u=-u;else return null;pr.subVectors(this.origin,e);const h=d*this.direction.dot(ul.crossVectors(pr,ul));if(h<0)return null;const m=d*this.direction.dot(Ou.cross(pr));if(m<0||h+m>u)return null;const g=-d*pr.dot(ku);return g<0?null:this.at(g/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Dt{constructor(e,n,r,a,l,u,d,h,m,g,v,x,S,E,w,y){Dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,u,d,h,m,g,v,x,S,E,w,y)}set(e,n,r,a,l,u,d,h,m,g,v,x,S,E,w,y){const _=this.elements;return _[0]=e,_[4]=n,_[8]=r,_[12]=a,_[1]=l,_[5]=u,_[9]=d,_[13]=h,_[2]=m,_[6]=g,_[10]=v,_[14]=x,_[3]=S,_[7]=E,_[11]=w,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dt().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/bs.setFromMatrixColumn(e,0).length(),l=1/bs.setFromMatrixColumn(e,1).length(),u=1/bs.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*l,n[5]=r[5]*l,n[6]=r[6]*l,n[7]=0,n[8]=r[8]*u,n[9]=r[9]*u,n[10]=r[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,l=e.z,u=Math.cos(r),d=Math.sin(r),h=Math.cos(a),m=Math.sin(a),g=Math.cos(l),v=Math.sin(l);if(e.order==="XYZ"){const x=u*g,S=u*v,E=d*g,w=d*v;n[0]=h*g,n[4]=-h*v,n[8]=m,n[1]=S+E*m,n[5]=x-w*m,n[9]=-d*h,n[2]=w-x*m,n[6]=E+S*m,n[10]=u*h}else if(e.order==="YXZ"){const x=h*g,S=h*v,E=m*g,w=m*v;n[0]=x+w*d,n[4]=E*d-S,n[8]=u*m,n[1]=u*v,n[5]=u*g,n[9]=-d,n[2]=S*d-E,n[6]=w+x*d,n[10]=u*h}else if(e.order==="ZXY"){const x=h*g,S=h*v,E=m*g,w=m*v;n[0]=x-w*d,n[4]=-u*v,n[8]=E+S*d,n[1]=S+E*d,n[5]=u*g,n[9]=w-x*d,n[2]=-u*m,n[6]=d,n[10]=u*h}else if(e.order==="ZYX"){const x=u*g,S=u*v,E=d*g,w=d*v;n[0]=h*g,n[4]=E*m-S,n[8]=x*m+w,n[1]=h*v,n[5]=w*m+x,n[9]=S*m-E,n[2]=-m,n[6]=d*h,n[10]=u*h}else if(e.order==="YZX"){const x=u*h,S=u*m,E=d*h,w=d*m;n[0]=h*g,n[4]=w-x*v,n[8]=E*v+S,n[1]=v,n[5]=u*g,n[9]=-d*g,n[2]=-m*g,n[6]=S*v+E,n[10]=x-w*v}else if(e.order==="XZY"){const x=u*h,S=u*m,E=d*h,w=d*m;n[0]=h*g,n[4]=-v,n[8]=m*g,n[1]=x*v+w,n[5]=u*g,n[9]=S*v-E,n[2]=E*v-S,n[6]=d*g,n[10]=w*v+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zx,e,Qx)}lookAt(e,n,r){const a=this.elements;return Hn.subVectors(e,n),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),mr.crossVectors(r,Hn),mr.lengthSq()===0&&(Math.abs(r.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),mr.crossVectors(r,Hn)),mr.normalize(),dl.crossVectors(Hn,mr),a[0]=mr.x,a[4]=dl.x,a[8]=Hn.x,a[1]=mr.y,a[5]=dl.y,a[9]=Hn.y,a[2]=mr.z,a[6]=dl.z,a[10]=Hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,u=r[0],d=r[4],h=r[8],m=r[12],g=r[1],v=r[5],x=r[9],S=r[13],E=r[2],w=r[6],y=r[10],_=r[14],D=r[3],L=r[7],C=r[11],B=r[15],U=a[0],O=a[4],z=a[8],b=a[12],A=a[1],I=a[5],ae=a[9],Q=a[13],re=a[2],me=a[6],oe=a[10],ue=a[14],G=a[3],ce=a[7],te=a[11],k=a[15];return l[0]=u*U+d*A+h*re+m*G,l[4]=u*O+d*I+h*me+m*ce,l[8]=u*z+d*ae+h*oe+m*te,l[12]=u*b+d*Q+h*ue+m*k,l[1]=g*U+v*A+x*re+S*G,l[5]=g*O+v*I+x*me+S*ce,l[9]=g*z+v*ae+x*oe+S*te,l[13]=g*b+v*Q+x*ue+S*k,l[2]=E*U+w*A+y*re+_*G,l[6]=E*O+w*I+y*me+_*ce,l[10]=E*z+w*ae+y*oe+_*te,l[14]=E*b+w*Q+y*ue+_*k,l[3]=D*U+L*A+C*re+B*G,l[7]=D*O+L*I+C*me+B*ce,l[11]=D*z+L*ae+C*oe+B*te,l[15]=D*b+L*Q+C*ue+B*k,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],l=e[12],u=e[1],d=e[5],h=e[9],m=e[13],g=e[2],v=e[6],x=e[10],S=e[14],E=e[3],w=e[7],y=e[11],_=e[15];return E*(+l*h*v-a*m*v-l*d*x+r*m*x+a*d*S-r*h*S)+w*(+n*h*S-n*m*x+l*u*x-a*u*S+a*m*g-l*h*g)+y*(+n*m*v-n*d*S-l*u*v+r*u*S+l*d*g-r*m*g)+_*(-a*d*g-n*h*v+n*d*x+a*u*v-r*u*x+r*h*g)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],d=e[5],h=e[6],m=e[7],g=e[8],v=e[9],x=e[10],S=e[11],E=e[12],w=e[13],y=e[14],_=e[15],D=v*y*m-w*x*m+w*h*S-d*y*S-v*h*_+d*x*_,L=E*x*m-g*y*m-E*h*S+u*y*S+g*h*_-u*x*_,C=g*w*m-E*v*m+E*d*S-u*w*S-g*d*_+u*v*_,B=E*v*h-g*w*h-E*d*x+u*w*x+g*d*y-u*v*y,U=n*D+r*L+a*C+l*B;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/U;return e[0]=D*O,e[1]=(w*x*l-v*y*l-w*a*S+r*y*S+v*a*_-r*x*_)*O,e[2]=(d*y*l-w*h*l+w*a*m-r*y*m-d*a*_+r*h*_)*O,e[3]=(v*h*l-d*x*l-v*a*m+r*x*m+d*a*S-r*h*S)*O,e[4]=L*O,e[5]=(g*y*l-E*x*l+E*a*S-n*y*S-g*a*_+n*x*_)*O,e[6]=(E*h*l-u*y*l-E*a*m+n*y*m+u*a*_-n*h*_)*O,e[7]=(u*x*l-g*h*l+g*a*m-n*x*m-u*a*S+n*h*S)*O,e[8]=C*O,e[9]=(E*v*l-g*w*l-E*r*S+n*w*S+g*r*_-n*v*_)*O,e[10]=(u*w*l-E*d*l+E*r*m-n*w*m-u*r*_+n*d*_)*O,e[11]=(g*d*l-u*v*l-g*r*m+n*v*m+u*r*S-n*d*S)*O,e[12]=B*O,e[13]=(g*w*a-E*v*a+E*r*x-n*w*x-g*r*y+n*v*y)*O,e[14]=(E*d*a-u*w*a-E*r*h+n*w*h+u*r*y-n*d*y)*O,e[15]=(u*v*a-g*d*a+g*r*h-n*v*h-u*r*x+n*d*x)*O,this}scale(e){const n=this.elements,r=e.x,a=e.y,l=e.z;return n[0]*=r,n[4]*=a,n[8]*=l,n[1]*=r,n[5]*=a,n[9]*=l,n[2]*=r,n[6]*=a,n[10]*=l,n[3]*=r,n[7]*=a,n[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),l=1-r,u=e.x,d=e.y,h=e.z,m=l*u,g=l*d;return this.set(m*u+r,m*d-a*h,m*h+a*d,0,m*d+a*h,g*d+r,g*h-a*u,0,m*h-a*d,g*h+a*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,l,u){return this.set(1,r,l,0,e,1,u,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,l=n._x,u=n._y,d=n._z,h=n._w,m=l+l,g=u+u,v=d+d,x=l*m,S=l*g,E=l*v,w=u*g,y=u*v,_=d*v,D=h*m,L=h*g,C=h*v,B=r.x,U=r.y,O=r.z;return a[0]=(1-(w+_))*B,a[1]=(S+C)*B,a[2]=(E-L)*B,a[3]=0,a[4]=(S-C)*U,a[5]=(1-(x+_))*U,a[6]=(y+D)*U,a[7]=0,a[8]=(E+L)*O,a[9]=(y-D)*O,a[10]=(1-(x+w))*O,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let l=bs.set(a[0],a[1],a[2]).length();const u=bs.set(a[4],a[5],a[6]).length(),d=bs.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ci.copy(this);const m=1/l,g=1/u,v=1/d;return ci.elements[0]*=m,ci.elements[1]*=m,ci.elements[2]*=m,ci.elements[4]*=g,ci.elements[5]*=g,ci.elements[6]*=g,ci.elements[8]*=v,ci.elements[9]*=v,ci.elements[10]*=v,n.setFromRotationMatrix(ci),r.x=l,r.y=u,r.z=d,this}makePerspective(e,n,r,a,l,u,d=Hi){const h=this.elements,m=2*l/(n-e),g=2*l/(r-a),v=(n+e)/(n-e),x=(r+a)/(r-a);let S,E;if(d===Hi)S=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(d===Bl)S=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return h[0]=m,h[4]=0,h[8]=v,h[12]=0,h[1]=0,h[5]=g,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=S,h[14]=E,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,r,a,l,u,d=Hi){const h=this.elements,m=1/(n-e),g=1/(r-a),v=1/(u-l),x=(n+e)*m,S=(r+a)*g;let E,w;if(d===Hi)E=(u+l)*v,w=-2*v;else if(d===Bl)E=l*v,w=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return h[0]=2*m,h[4]=0,h[8]=0,h[12]=-x,h[1]=0,h[5]=2*g,h[9]=0,h[13]=-S,h[2]=0,h[6]=0,h[10]=w,h[14]=-E,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const bs=new Y,ci=new Dt,Zx=new Y(0,0,0),Qx=new Y(1,1,1),mr=new Y,dl=new Y,Hn=new Y,sm=new Dt,om=new $o;class Ei{constructor(e=0,n=0,r=0,a=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,l=a[0],u=a[4],d=a[8],h=a[1],m=a[5],g=a[9],v=a[2],x=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-v,l),this._z=0);break;case"ZXY":this._x=Math.asin(gt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,S),this._z=Math.atan2(-u,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-gt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,m));break;case"YZX":this._z=Math.asin(gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-v,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return sm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sm,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return om.setFromEuler(this),this.setFromQuaternion(om,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Rg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jx=0;const am=new Y,Ps=new $o,Oi=new Dt,fl=new Y,Fo=new Y,ey=new Y,ty=new $o,lm=new Y(1,0,0),cm=new Y(0,1,0),um=new Y(0,0,1),dm={type:"added"},ny={type:"removed"},Ns={type:"childadded",child:null},Bu={type:"childremoved",child:null};class Kt extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jx++}),this.uuid=Js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Kt.DEFAULT_UP.clone();const e=new Y,n=new Ei,r=new $o,a=new Y(1,1,1);function l(){r.setFromEuler(n,!1)}function u(){n.setFromQuaternion(r,void 0,!1)}n._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Dt},normalMatrix:{value:new dt}}),this.matrix=new Dt,this.matrixWorld=new Dt,this.matrixAutoUpdate=Kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ps.setFromAxisAngle(e,n),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,n){return Ps.setFromAxisAngle(e,n),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(lm,e)}rotateY(e){return this.rotateOnAxis(cm,e)}rotateZ(e){return this.rotateOnAxis(um,e)}translateOnAxis(e,n){return am.copy(e).applyQuaternion(this.quaternion),this.position.add(am.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(lm,e)}translateY(e){return this.translateOnAxis(cm,e)}translateZ(e){return this.translateOnAxis(um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?fl.copy(e):fl.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(Fo,fl,this.up):Oi.lookAt(fl,Fo,this.up),this.quaternion.setFromRotationMatrix(Oi),a&&(Oi.extractRotation(a.matrixWorld),Ps.setFromRotationMatrix(Oi),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dm),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(ny),Bu.child=e,this.dispatchEvent(Bu),Bu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dm),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const u=this.children[r].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fo,e,ey),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fo,ty,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(d,h){return d[h.uuid]===void 0&&(d[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const h=d.shapes;if(Array.isArray(h))for(let m=0,g=h.length;m<g;m++){const v=h[m];l(e.shapes,v)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let h=0,m=this.material.length;h<m;h++)d.push(l(e.materials,this.material[h]));a.material=d}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const h=this.animations[d];a.animations.push(l(e.animations,h))}}if(n){const d=u(e.geometries),h=u(e.materials),m=u(e.textures),g=u(e.images),v=u(e.shapes),x=u(e.skeletons),S=u(e.animations),E=u(e.nodes);d.length>0&&(r.geometries=d),h.length>0&&(r.materials=h),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=a,r;function u(d){const h=[];for(const m in d){const g=d[m];delete g.metadata,h.push(g)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}Kt.DEFAULT_UP=new Y(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new Y,ki=new Y,zu=new Y,Bi=new Y,Ls=new Y,Ds=new Y,fm=new Y,Hu=new Y,Vu=new Y,Gu=new Y,Wu=new Lt,ju=new Lt,Xu=new Lt;class di{constructor(e=new Y,n=new Y,r=new Y){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),ui.subVectors(e,n),a.cross(ui);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,n,r,a,l){ui.subVectors(a,n),ki.subVectors(r,n),zu.subVectors(e,n);const u=ui.dot(ui),d=ui.dot(ki),h=ui.dot(zu),m=ki.dot(ki),g=ki.dot(zu),v=u*m-d*d;if(v===0)return l.set(0,0,0),null;const x=1/v,S=(m*h-d*g)*x,E=(u*g-d*h)*x;return l.set(1-S-E,E,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,n,r,a,l,u,d,h){return this.getBarycoord(e,n,r,a,Bi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,Bi.x),h.addScaledVector(u,Bi.y),h.addScaledVector(d,Bi.z),h)}static getInterpolatedAttribute(e,n,r,a,l,u){return Wu.setScalar(0),ju.setScalar(0),Xu.setScalar(0),Wu.fromBufferAttribute(e,n),ju.fromBufferAttribute(e,r),Xu.fromBufferAttribute(e,a),u.setScalar(0),u.addScaledVector(Wu,l.x),u.addScaledVector(ju,l.y),u.addScaledVector(Xu,l.z),u}static isFrontFacing(e,n,r,a){return ui.subVectors(r,n),ki.subVectors(e,n),ui.cross(ki).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),ui.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return di.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,l){return di.getInterpolation(e,this.a,this.b,this.c,n,r,a,l)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,l=this.c;let u,d;Ls.subVectors(a,r),Ds.subVectors(l,r),Hu.subVectors(e,r);const h=Ls.dot(Hu),m=Ds.dot(Hu);if(h<=0&&m<=0)return n.copy(r);Vu.subVectors(e,a);const g=Ls.dot(Vu),v=Ds.dot(Vu);if(g>=0&&v<=g)return n.copy(a);const x=h*v-g*m;if(x<=0&&h>=0&&g<=0)return u=h/(h-g),n.copy(r).addScaledVector(Ls,u);Gu.subVectors(e,l);const S=Ls.dot(Gu),E=Ds.dot(Gu);if(E>=0&&S<=E)return n.copy(l);const w=S*m-h*E;if(w<=0&&m>=0&&E<=0)return d=m/(m-E),n.copy(r).addScaledVector(Ds,d);const y=g*E-S*v;if(y<=0&&v-g>=0&&S-E>=0)return fm.subVectors(l,a),d=(v-g)/(v-g+(S-E)),n.copy(a).addScaledVector(fm,d);const _=1/(y+w+x);return u=w*_,d=x*_,n.copy(r).addScaledVector(Ls,u).addScaledVector(Ds,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gr={h:0,s:0,l:0},hl={h:0,s:0,l:0};function qu(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class _t{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=ti){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,n),this}setRGB(e,n,r,a=Rt.workingColorSpace){return this.r=e,this.g=n,this.b=r,Rt.toWorkingColorSpace(this,a),this}setHSL(e,n,r,a=Rt.workingColorSpace){if(e=af(e,1),n=gt(n,0,1),r=gt(r,0,1),n===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+n):r+n-r*n,u=2*r-l;this.r=qu(u,l,e+1/3),this.g=qu(u,l,e),this.b=qu(u,l,e-1/3)}return Rt.toWorkingColorSpace(this,a),this}setStyle(e,n=ti){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=a[1],d=a[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,n);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,n);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(l,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=ti){const r=bg[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ti){return Rt.fromWorkingColorSpace(yn.copy(this),e),Math.round(gt(yn.r*255,0,255))*65536+Math.round(gt(yn.g*255,0,255))*256+Math.round(gt(yn.b*255,0,255))}getHexString(e=ti){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Rt.workingColorSpace){Rt.fromWorkingColorSpace(yn.copy(this),n);const r=yn.r,a=yn.g,l=yn.b,u=Math.max(r,a,l),d=Math.min(r,a,l);let h,m;const g=(d+u)/2;if(d===u)h=0,m=0;else{const v=u-d;switch(m=g<=.5?v/(u+d):v/(2-u-d),u){case r:h=(a-l)/v+(a<l?6:0);break;case a:h=(l-r)/v+2;break;case l:h=(r-a)/v+4;break}h/=6}return e.h=h,e.s=m,e.l=g,e}getRGB(e,n=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(yn.copy(this),n),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=ti){Rt.fromWorkingColorSpace(yn.copy(this),e);const n=yn.r,r=yn.g,a=yn.b;return e!==ti?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(gr),this.setHSL(gr.h+e,gr.s+n,gr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(gr),e.getHSL(hl);const r=jo(gr.h,hl.h,n),a=jo(gr.s,hl.s,n),l=jo(gr.l,hl.l,n);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*n+l[3]*r+l[6]*a,this.g=l[1]*n+l[4]*r+l[7]*a,this.b=l[2]*n+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new _t;_t.NAMES=bg;let iy=0;class Jr extends Qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iy++}),this.uuid=Js(),this.name="",this.type="Material",this.blending=Vs,this.side=Sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ad,this.blendDst=ld,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(r.blending=this.blending),this.side!==Sr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==ad&&(r.blendSrc=this.blendSrc),this.blendDst!==ld&&(r.blendDst=this.blendDst),this.blendEquation!==jr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const u=[];for(const d in l){const h=l[d];delete h.metadata,u.push(h)}return u}if(n){const l=a(e.textures),u=a(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=n[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class cf extends Jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=dg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new Y,pl=new xt;let ry=0;class Xn{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ry++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=Zp,this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)pl.fromBufferAttribute(this,n),pl.applyMatrix3(e),this.setXY(n,pl.x,pl.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.applyMatrix3(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.applyMatrix4(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.applyNormalMatrix(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.transformDirection(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Bs(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=An(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Bs(n,this.array)),n}setX(e,n){return this.normalized&&(n=An(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Bs(n,this.array)),n}setY(e,n){return this.normalized&&(n=An(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Bs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=An(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Bs(n,this.array)),n}setW(e,n){return this.normalized&&(n=An(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=An(n,this.array),r=An(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=An(n,this.array),r=An(r,this.array),a=An(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,l){return e*=this.itemSize,this.normalized&&(n=An(n,this.array),r=An(r,this.array),a=An(a,this.array),l=An(l,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zp&&(e.usage=this.usage),e}}class Pg extends Xn{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Ng extends Xn{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class Sn extends Xn{constructor(e,n,r){super(new Float32Array(e),n,r)}}let sy=0;const ei=new Dt,Yu=new Kt,Is=new Y,Vn=new Zr,Oo=new Zr,cn=new Y;class qn extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=Js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wg(e)?Ng:Pg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new dt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ei.makeRotationFromQuaternion(e),this.applyMatrix4(ei),this}rotateX(e){return ei.makeRotationX(e),this.applyMatrix4(ei),this}rotateY(e){return ei.makeRotationY(e),this.applyMatrix4(ei),this}rotateZ(e){return ei.makeRotationZ(e),this.applyMatrix4(ei),this}translate(e,n,r){return ei.makeTranslation(e,n,r),this.applyMatrix4(ei),this}scale(e,n,r){return ei.makeScale(e,n,r),this.applyMatrix4(ei),this}lookAt(e){return Yu.lookAt(e),Yu.updateMatrix(),this.applyMatrix4(Yu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const u=e[a];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Sn(r,3))}else{const r=Math.min(e.length,n.count);for(let a=0;a<r;a++){const l=e[a];n.setXYZ(a,l.x,l.y,l.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const l=n[r];Vn.setFromBufferAttribute(l),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Vn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Vn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Vn.min),this.boundingBox.expandByPoint(Vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const r=this.boundingSphere.center;if(Vn.setFromBufferAttribute(e),n)for(let l=0,u=n.length;l<u;l++){const d=n[l];Oo.setFromBufferAttribute(d),this.morphTargetsRelative?(cn.addVectors(Vn.min,Oo.min),Vn.expandByPoint(cn),cn.addVectors(Vn.max,Oo.max),Vn.expandByPoint(cn)):(Vn.expandByPoint(Oo.min),Vn.expandByPoint(Oo.max))}Vn.getCenter(r);let a=0;for(let l=0,u=e.count;l<u;l++)cn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(cn));if(n)for(let l=0,u=n.length;l<u;l++){const d=n[l],h=this.morphTargetsRelative;for(let m=0,g=d.count;m<g;m++)cn.fromBufferAttribute(d,m),h&&(Is.fromBufferAttribute(e,m),cn.add(Is)),a=Math.max(a,r.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,l=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xn(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),d=[],h=[];for(let z=0;z<r.count;z++)d[z]=new Y,h[z]=new Y;const m=new Y,g=new Y,v=new Y,x=new xt,S=new xt,E=new xt,w=new Y,y=new Y;function _(z,b,A){m.fromBufferAttribute(r,z),g.fromBufferAttribute(r,b),v.fromBufferAttribute(r,A),x.fromBufferAttribute(l,z),S.fromBufferAttribute(l,b),E.fromBufferAttribute(l,A),g.sub(m),v.sub(m),S.sub(x),E.sub(x);const I=1/(S.x*E.y-E.x*S.y);isFinite(I)&&(w.copy(g).multiplyScalar(E.y).addScaledVector(v,-S.y).multiplyScalar(I),y.copy(v).multiplyScalar(S.x).addScaledVector(g,-E.x).multiplyScalar(I),d[z].add(w),d[b].add(w),d[A].add(w),h[z].add(y),h[b].add(y),h[A].add(y))}let D=this.groups;D.length===0&&(D=[{start:0,count:e.count}]);for(let z=0,b=D.length;z<b;++z){const A=D[z],I=A.start,ae=A.count;for(let Q=I,re=I+ae;Q<re;Q+=3)_(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const L=new Y,C=new Y,B=new Y,U=new Y;function O(z){B.fromBufferAttribute(a,z),U.copy(B);const b=d[z];L.copy(b),L.sub(B.multiplyScalar(B.dot(b))).normalize(),C.crossVectors(U,b);const I=C.dot(h[z])<0?-1:1;u.setXYZW(z,L.x,L.y,L.z,I)}for(let z=0,b=D.length;z<b;++z){const A=D[z],I=A.start,ae=A.count;for(let Q=I,re=I+ae;Q<re;Q+=3)O(e.getX(Q+0)),O(e.getX(Q+1)),O(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Xn(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new Y,l=new Y,u=new Y,d=new Y,h=new Y,m=new Y,g=new Y,v=new Y;if(e)for(let x=0,S=e.count;x<S;x+=3){const E=e.getX(x+0),w=e.getX(x+1),y=e.getX(x+2);a.fromBufferAttribute(n,E),l.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),g.subVectors(u,l),v.subVectors(a,l),g.cross(v),d.fromBufferAttribute(r,E),h.fromBufferAttribute(r,w),m.fromBufferAttribute(r,y),d.add(g),h.add(g),m.add(g),r.setXYZ(E,d.x,d.y,d.z),r.setXYZ(w,h.x,h.y,h.z),r.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,S=n.count;x<S;x+=3)a.fromBufferAttribute(n,x+0),l.fromBufferAttribute(n,x+1),u.fromBufferAttribute(n,x+2),g.subVectors(u,l),v.subVectors(a,l),g.cross(v),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)cn.fromBufferAttribute(e,n),cn.normalize(),e.setXYZ(n,cn.x,cn.y,cn.z)}toNonIndexed(){function e(d,h){const m=d.array,g=d.itemSize,v=d.normalized,x=new m.constructor(h.length*g);let S=0,E=0;for(let w=0,y=h.length;w<y;w++){d.isInterleavedBufferAttribute?S=h[w]*d.data.stride+d.offset:S=h[w]*g;for(let _=0;_<g;_++)x[E++]=m[S++]}return new Xn(x,g,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new qn,r=this.index.array,a=this.attributes;for(const d in a){const h=a[d],m=e(h,r);n.setAttribute(d,m)}const l=this.morphAttributes;for(const d in l){const h=[],m=l[d];for(let g=0,v=m.length;g<v;g++){const x=m[g],S=e(x,r);h.push(S)}n.morphAttributes[d]=h}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,h=u.length;d<h;d++){const m=u[d];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const h in r){const m=r[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],g=[];for(let v=0,x=m.length;v<x;v++){const S=m[v];g.push(S.toJSON(e.data))}g.length>0&&(a[h]=g,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const a=e.attributes;for(const m in a){const g=a[m];this.setAttribute(m,g.clone(n))}const l=e.morphAttributes;for(const m in l){const g=[],v=l[m];for(let x=0,S=v.length;x<S;x++)g.push(v[x].clone(n));this.morphAttributes[m]=g}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let m=0,g=u.length;m<g;m++){const v=u[m];this.addGroup(v.start,v.count,v.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hm=new Dt,Br=new lf,ml=new Qr,pm=new Y,gl=new Y,_l=new Y,vl=new Y,$u=new Y,xl=new Y,mm=new Y,yl=new Y;class Wn extends Kt{constructor(e=new qn,n=new cf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(l&&d){xl.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const g=d[h],v=l[h];g!==0&&($u.fromBufferAttribute(v,e),u?xl.addScaledVector($u,g):xl.addScaledVector($u.sub(n),g))}n.add(xl)}return n}raycast(e,n){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),ml.copy(r.boundingSphere),ml.applyMatrix4(l),Br.copy(e.ray).recast(e.near),!(ml.containsPoint(Br.origin)===!1&&(Br.intersectSphere(ml,pm)===null||Br.origin.distanceToSquared(pm)>(e.far-e.near)**2))&&(hm.copy(l).invert(),Br.copy(e.ray).applyMatrix4(hm),!(r.boundingBox!==null&&Br.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Br)))}_computeIntersections(e,n,r){let a;const l=this.geometry,u=this.material,d=l.index,h=l.attributes.position,m=l.attributes.uv,g=l.attributes.uv1,v=l.attributes.normal,x=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(u))for(let E=0,w=x.length;E<w;E++){const y=x[E],_=u[y.materialIndex],D=Math.max(y.start,S.start),L=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let C=D,B=L;C<B;C+=3){const U=d.getX(C),O=d.getX(C+1),z=d.getX(C+2);a=Sl(this,_,e,r,m,g,v,U,O,z),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const E=Math.max(0,S.start),w=Math.min(d.count,S.start+S.count);for(let y=E,_=w;y<_;y+=3){const D=d.getX(y),L=d.getX(y+1),C=d.getX(y+2);a=Sl(this,u,e,r,m,g,v,D,L,C),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(u))for(let E=0,w=x.length;E<w;E++){const y=x[E],_=u[y.materialIndex],D=Math.max(y.start,S.start),L=Math.min(h.count,Math.min(y.start+y.count,S.start+S.count));for(let C=D,B=L;C<B;C+=3){const U=C,O=C+1,z=C+2;a=Sl(this,_,e,r,m,g,v,U,O,z),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const E=Math.max(0,S.start),w=Math.min(h.count,S.start+S.count);for(let y=E,_=w;y<_;y+=3){const D=y,L=y+1,C=y+2;a=Sl(this,u,e,r,m,g,v,D,L,C),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}}}function oy(s,e,n,r,a,l,u,d){let h;if(e.side===Fn?h=r.intersectTriangle(u,l,a,!0,d):h=r.intersectTriangle(a,l,u,e.side===Sr,d),h===null)return null;yl.copy(d),yl.applyMatrix4(s.matrixWorld);const m=n.ray.origin.distanceTo(yl);return m<n.near||m>n.far?null:{distance:m,point:yl.clone(),object:s}}function Sl(s,e,n,r,a,l,u,d,h,m){s.getVertexPosition(d,gl),s.getVertexPosition(h,_l),s.getVertexPosition(m,vl);const g=oy(s,e,n,r,gl,_l,vl,mm);if(g){const v=new Y;di.getBarycoord(mm,gl,_l,vl,v),a&&(g.uv=di.getInterpolatedAttribute(a,d,h,m,v,new xt)),l&&(g.uv1=di.getInterpolatedAttribute(l,d,h,m,v,new xt)),u&&(g.normal=di.getInterpolatedAttribute(u,d,h,m,v,new Y),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:h,c:m,normal:new Y,materialIndex:0};di.getNormal(gl,_l,vl,x.normal),g.face=x,g.barycoord=v}return g}class Ko extends qn{constructor(e=1,n=1,r=1,a=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:l,depthSegments:u};const d=this;a=Math.floor(a),l=Math.floor(l),u=Math.floor(u);const h=[],m=[],g=[],v=[];let x=0,S=0;E("z","y","x",-1,-1,r,n,e,u,l,0),E("z","y","x",1,-1,r,n,-e,u,l,1),E("x","z","y",1,1,e,r,n,a,u,2),E("x","z","y",1,-1,e,r,-n,a,u,3),E("x","y","z",1,-1,e,n,r,a,l,4),E("x","y","z",-1,-1,e,n,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new Sn(m,3)),this.setAttribute("normal",new Sn(g,3)),this.setAttribute("uv",new Sn(v,2));function E(w,y,_,D,L,C,B,U,O,z,b){const A=C/O,I=B/z,ae=C/2,Q=B/2,re=U/2,me=O+1,oe=z+1;let ue=0,G=0;const ce=new Y;for(let te=0;te<oe;te++){const k=te*I-Q;for(let Z=0;Z<me;Z++){const Ne=Z*A-ae;ce[w]=Ne*D,ce[y]=k*L,ce[_]=re,m.push(ce.x,ce.y,ce.z),ce[w]=0,ce[y]=0,ce[_]=U>0?1:-1,g.push(ce.x,ce.y,ce.z),v.push(Z/O),v.push(1-te/z),ue+=1}}for(let te=0;te<z;te++)for(let k=0;k<O;k++){const Z=x+k+me*te,Ne=x+k+me*(te+1),J=x+(k+1)+me*(te+1),de=x+(k+1)+me*te;h.push(Z,Ne,de),h.push(Ne,J,de),G+=6}d.addGroup(S,G,b),S+=G,x+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Zs(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function Cn(s){const e={};for(let n=0;n<s.length;n++){const r=Zs(s[n]);for(const a in r)e[a]=r[a]}return e}function ay(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function Lg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const ly={clone:Zs,merge:Cn};var cy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mr extends Jr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cy,this.fragmentShader=uy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zs(e.uniforms),this.uniformsGroups=ay(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?n.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[a]={type:"m4",value:u.toArray()}:n.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class Dg extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Dt,this.projectionMatrix=new Dt,this.projectionMatrixInverse=new Dt,this.coordinateSystem=Hi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _r=new Y,gm=new xt,_m=new xt;class Gn extends Dg{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=qo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qo*2*Math.atan(Math.tan(Wo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){_r.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_r.x,_r.y).multiplyScalar(-e/_r.z),_r.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(_r.x,_r.y).multiplyScalar(-e/_r.z)}getViewSize(e,n){return this.getViewBounds(e,gm,_m),n.subVectors(_m,gm)}setViewOffset(e,n,r,a,l,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Wo*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,l=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,m=u.fullHeight;l+=u.offsetX*a/h,n-=u.offsetY*r/m,a*=u.width/h,r*=u.height/m}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Us=-90,Fs=1;class dy extends Kt{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Gn(Us,Fs,e,n);a.layers=this.layers,this.add(a);const l=new Gn(Us,Fs,e,n);l.layers=this.layers,this.add(l);const u=new Gn(Us,Fs,e,n);u.layers=this.layers,this.add(u);const d=new Gn(Us,Fs,e,n);d.layers=this.layers,this.add(d);const h=new Gn(Us,Fs,e,n);h.layers=this.layers,this.add(h);const m=new Gn(Us,Fs,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,l,u,d,h]=n;for(const m of n)this.remove(m);if(e===Hi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Bl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,h,m,g]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,l),e.setRenderTarget(r,1,a),e.render(n,u),e.setRenderTarget(r,2,a),e.render(n,d),e.setRenderTarget(r,3,a),e.render(n,h),e.setRenderTarget(r,4,a),e.render(n,m),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,a),e.render(n,g),e.setRenderTarget(v,x,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Ig extends Rn{constructor(e,n,r,a,l,u,d,h,m,g){e=e!==void 0?e:[],n=n!==void 0?n:Xs,super(e,n,r,a,l,u,d,h,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fy extends Kr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new Ig(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Si}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Ko(5,5,5),l=new Mr({name:"CubemapFromEquirect",uniforms:Zs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Fn,blending:xr});l.uniforms.tEquirect.value=n;const u=new Wn(a,l),d=n.minFilter;return n.minFilter===Yr&&(n.minFilter=Si),new dy(1,10,this).update(e,u),n.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,n,r,a){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,r,a);e.setRenderTarget(l)}}class Vo extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hy={type:"move"};class Ku{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,l=null,u=null;const d=this._targetRay,h=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){u=!0;for(const w of e.hand.values()){const y=n.getJointPose(w,r),_=this._getHandJoint(m,w);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const g=m.joints["index-finger-tip"],v=m.joints["thumb-tip"],x=g.position.distanceTo(v.position),S=.02,E=.005;m.inputState.pinching&&x>S+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=n.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));d!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(hy)))}return d!==null&&(d.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new Vo;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class uf{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new _t(e),this.density=n}clone(){return new uf(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class py extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class my extends Rn{constructor(e=null,n=1,r=1,a,l,u,d,h,m=jn,g=jn,v,x){super(null,u,d,h,m,g,a,l,v,x),this.isDataTexture=!0,this.image={data:e,width:n,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vm extends Xn{constructor(e,n,r,a=1){super(e,n,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Os=new Dt,xm=new Dt,Ml=[],ym=new Zr,gy=new Dt,ko=new Wn,Bo=new Qr;class _y extends Wn{constructor(e,n,r){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new vm(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<r;a++)this.setMatrixAt(a,gy)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Zr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<n;r++)this.getMatrixAt(r,Os),ym.copy(e.boundingBox).applyMatrix4(Os),this.boundingBox.union(ym)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<n;r++)this.getMatrixAt(r,Os),Bo.copy(e.boundingSphere).applyMatrix4(Os),this.boundingSphere.union(Bo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const r=n.morphTargetInfluences,a=this.morphTexture.source.data.data,l=r.length+1,u=e*l+1;for(let d=0;d<r.length;d++)r[d]=a[u+d]}raycast(e,n){const r=this.matrixWorld,a=this.count;if(ko.geometry=this.geometry,ko.material=this.material,ko.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bo.copy(this.boundingSphere),Bo.applyMatrix4(r),e.ray.intersectsSphere(Bo)!==!1))for(let l=0;l<a;l++){this.getMatrixAt(l,Os),xm.multiplyMatrices(r,Os),ko.matrixWorld=xm,ko.raycast(e,Ml);for(let u=0,d=Ml.length;u<d;u++){const h=Ml[u];h.instanceId=l,h.object=this,n.push(h)}Ml.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new vm(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const r=n.morphTargetInfluences,a=r.length+1;this.morphTexture===null&&(this.morphTexture=new my(new Float32Array(a*this.count),a,this.count,nf,Mi));const l=this.morphTexture.source.data.data;let u=0;for(let m=0;m<r.length;m++)u+=r[m];const d=this.geometry.morphTargetsRelative?1:1-u,h=a*e;l[h]=d,l.set(r,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Zu=new Y,vy=new Y,xy=new dt;class Gr{constructor(e=new Y(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Zu.subVectors(r,n).cross(vy.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Zu),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:n.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||xy.getNormalMatrix(e),a=this.coplanarPoint(Zu).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zr=new Qr,El=new Y;class df{constructor(e=new Gr,n=new Gr,r=new Gr,a=new Gr,l=new Gr,u=new Gr){this.planes=[e,n,r,a,l,u]}set(e,n,r,a,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(r),d[3].copy(a),d[4].copy(l),d[5].copy(u),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Hi){const r=this.planes,a=e.elements,l=a[0],u=a[1],d=a[2],h=a[3],m=a[4],g=a[5],v=a[6],x=a[7],S=a[8],E=a[9],w=a[10],y=a[11],_=a[12],D=a[13],L=a[14],C=a[15];if(r[0].setComponents(h-l,x-m,y-S,C-_).normalize(),r[1].setComponents(h+l,x+m,y+S,C+_).normalize(),r[2].setComponents(h+u,x+g,y+E,C+D).normalize(),r[3].setComponents(h-u,x-g,y-E,C-D).normalize(),r[4].setComponents(h-d,x-v,y-w,C-L).normalize(),n===Hi)r[5].setComponents(h+d,x+v,y+w,C+L).normalize();else if(n===Bl)r[5].setComponents(d,v,w,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zr)}intersectsSprite(e){return zr.center.set(0,0,0),zr.radius=.7071067811865476,zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(zr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(n[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(El.x=a.normal.x>0?e.max.x:e.min.x,El.y=a.normal.y>0?e.max.y:e.min.y,El.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(El)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xd extends Jr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hl=new Y,Vl=new Y,Sm=new Dt,zo=new lf,Tl=new Qr,Qu=new Y,Mm=new Y;class yy extends Kt{constructor(e=new qn,n=new Xd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,r=[0];for(let a=1,l=n.count;a<l;a++)Hl.fromBufferAttribute(n,a-1),Vl.fromBufferAttribute(n,a),r[a]=r[a-1],r[a]+=Hl.distanceTo(Vl);e.setAttribute("lineDistance",new Sn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const r=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Tl.copy(r.boundingSphere),Tl.applyMatrix4(a),Tl.radius+=l,e.ray.intersectsSphere(Tl)===!1)return;Sm.copy(a).invert(),zo.copy(e.ray).applyMatrix4(Sm);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,m=this.isLineSegments?2:1,g=r.index,x=r.attributes.position;if(g!==null){const S=Math.max(0,u.start),E=Math.min(g.count,u.start+u.count);for(let w=S,y=E-1;w<y;w+=m){const _=g.getX(w),D=g.getX(w+1),L=wl(this,e,zo,h,_,D,w);L&&n.push(L)}if(this.isLineLoop){const w=g.getX(E-1),y=g.getX(S),_=wl(this,e,zo,h,w,y,E-1);_&&n.push(_)}}else{const S=Math.max(0,u.start),E=Math.min(x.count,u.start+u.count);for(let w=S,y=E-1;w<y;w+=m){const _=wl(this,e,zo,h,w,w+1,w);_&&n.push(_)}if(this.isLineLoop){const w=wl(this,e,zo,h,E-1,S,E-1);w&&n.push(w)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function wl(s,e,n,r,a,l,u){const d=s.geometry.attributes.position;if(Hl.fromBufferAttribute(d,a),Vl.fromBufferAttribute(d,l),n.distanceSqToSegment(Hl,Vl,Qu,Mm)>r)return;Qu.applyMatrix4(s.matrixWorld);const m=e.ray.origin.distanceTo(Qu);if(!(m<e.near||m>e.far))return{distance:m,point:Mm.clone().applyMatrix4(s.matrixWorld),index:u,face:null,faceIndex:null,barycoord:null,object:s}}const Em=new Y,Tm=new Y;class Sy extends yy{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,r=[];for(let a=0,l=n.count;a<l;a+=2)Em.fromBufferAttribute(n,a),Tm.fromBufferAttribute(n,a+1),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Em.distanceTo(Tm);e.setAttribute("lineDistance",new Sn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ug extends Jr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const wm=new Dt,qd=new lf,Al=new Qr,Cl=new Y;class My extends Kt{constructor(e=new qn,n=new Ug){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const r=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Al.copy(r.boundingSphere),Al.applyMatrix4(a),Al.radius+=l,e.ray.intersectsSphere(Al)===!1)return;wm.copy(a).invert(),qd.copy(e.ray).applyMatrix4(wm);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,m=r.index,v=r.attributes.position;if(m!==null){const x=Math.max(0,u.start),S=Math.min(m.count,u.start+u.count);for(let E=x,w=S;E<w;E++){const y=m.getX(E);Cl.fromBufferAttribute(v,y),Am(Cl,y,h,a,e,n,this)}}else{const x=Math.max(0,u.start),S=Math.min(v.count,u.start+u.count);for(let E=x,w=S;E<w;E++)Cl.fromBufferAttribute(v,E),Am(Cl,E,h,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function Am(s,e,n,r,a,l,u){const d=qd.distanceSqToPoint(s);if(d<n){const h=new Y;qd.closestPointToPoint(s,h),h.applyMatrix4(r);const m=a.ray.origin.distanceTo(h);if(m<a.near||m>a.far)return;l.push({distance:m,distanceToRay:Math.sqrt(d),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class Fg extends Rn{constructor(e,n,r,a,l,u,d,h,m,g=Gs){if(g!==Gs&&g!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===Gs&&(r=$r),r===void 0&&g===$s&&(r=Ys),super(null,a,l,u,d,h,g,r,m),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=d!==void 0?d:jn,this.minFilter=h!==void 0?h:jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class jl extends qn{constructor(e=[],n=[],r=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:r,detail:a};const l=[],u=[];d(a),m(r),g(),this.setAttribute("position",new Sn(l,3)),this.setAttribute("normal",new Sn(l.slice(),3)),this.setAttribute("uv",new Sn(u,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function d(D){const L=new Y,C=new Y,B=new Y;for(let U=0;U<n.length;U+=3)S(n[U+0],L),S(n[U+1],C),S(n[U+2],B),h(L,C,B,D)}function h(D,L,C,B){const U=B+1,O=[];for(let z=0;z<=U;z++){O[z]=[];const b=D.clone().lerp(C,z/U),A=L.clone().lerp(C,z/U),I=U-z;for(let ae=0;ae<=I;ae++)ae===0&&z===U?O[z][ae]=b:O[z][ae]=b.clone().lerp(A,ae/I)}for(let z=0;z<U;z++)for(let b=0;b<2*(U-z)-1;b++){const A=Math.floor(b/2);b%2===0?(x(O[z][A+1]),x(O[z+1][A]),x(O[z][A])):(x(O[z][A+1]),x(O[z+1][A+1]),x(O[z+1][A]))}}function m(D){const L=new Y;for(let C=0;C<l.length;C+=3)L.x=l[C+0],L.y=l[C+1],L.z=l[C+2],L.normalize().multiplyScalar(D),l[C+0]=L.x,l[C+1]=L.y,l[C+2]=L.z}function g(){const D=new Y;for(let L=0;L<l.length;L+=3){D.x=l[L+0],D.y=l[L+1],D.z=l[L+2];const C=y(D)/2/Math.PI+.5,B=_(D)/Math.PI+.5;u.push(C,1-B)}E(),v()}function v(){for(let D=0;D<u.length;D+=6){const L=u[D+0],C=u[D+2],B=u[D+4],U=Math.max(L,C,B),O=Math.min(L,C,B);U>.9&&O<.1&&(L<.2&&(u[D+0]+=1),C<.2&&(u[D+2]+=1),B<.2&&(u[D+4]+=1))}}function x(D){l.push(D.x,D.y,D.z)}function S(D,L){const C=D*3;L.x=e[C+0],L.y=e[C+1],L.z=e[C+2]}function E(){const D=new Y,L=new Y,C=new Y,B=new Y,U=new xt,O=new xt,z=new xt;for(let b=0,A=0;b<l.length;b+=9,A+=6){D.set(l[b+0],l[b+1],l[b+2]),L.set(l[b+3],l[b+4],l[b+5]),C.set(l[b+6],l[b+7],l[b+8]),U.set(u[A+0],u[A+1]),O.set(u[A+2],u[A+3]),z.set(u[A+4],u[A+5]),B.copy(D).add(L).add(C).divideScalar(3);const I=y(B);w(U,A+0,D,I),w(O,A+2,L,I),w(z,A+4,C,I)}}function w(D,L,C,B){B<0&&D.x===1&&(u[L]=D.x-1),C.x===0&&C.z===0&&(u[L]=B/2/Math.PI+.5)}function y(D){return Math.atan2(D.z,-D.x)}function _(D){return Math.atan2(-D.y,Math.sqrt(D.x*D.x+D.z*D.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.vertices,e.indices,e.radius,e.details)}}class ff extends jl{constructor(e=1,n=0){const r=(1+Math.sqrt(5))/2,a=[-1,r,0,1,r,0,-1,-r,0,1,-r,0,0,-1,r,0,1,r,0,-1,-r,0,1,-r,r,0,-1,r,0,1,-r,0,-1,-r,0,1],l=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,l,e,n),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new ff(e.radius,e.detail)}}class Xl extends qn{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const l=e/2,u=n/2,d=Math.floor(r),h=Math.floor(a),m=d+1,g=h+1,v=e/d,x=n/h,S=[],E=[],w=[],y=[];for(let _=0;_<g;_++){const D=_*x-u;for(let L=0;L<m;L++){const C=L*v-l;E.push(C,-D,0),w.push(0,0,1),y.push(L/d),y.push(1-_/h)}}for(let _=0;_<h;_++)for(let D=0;D<d;D++){const L=D+m*_,C=D+m*(_+1),B=D+1+m*(_+1),U=D+1+m*_;S.push(L,C,U),S.push(C,B,U)}this.setIndex(S),this.setAttribute("position",new Sn(E,3)),this.setAttribute("normal",new Sn(w,3)),this.setAttribute("uv",new Sn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.width,e.height,e.widthSegments,e.heightSegments)}}class hf extends qn{constructor(e=.5,n=1,r=32,a=1,l=0,u=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:r,phiSegments:a,thetaStart:l,thetaLength:u},r=Math.max(3,r),a=Math.max(1,a);const d=[],h=[],m=[],g=[];let v=e;const x=(n-e)/a,S=new Y,E=new xt;for(let w=0;w<=a;w++){for(let y=0;y<=r;y++){const _=l+y/r*u;S.x=v*Math.cos(_),S.y=v*Math.sin(_),h.push(S.x,S.y,S.z),m.push(0,0,1),E.x=(S.x/n+1)/2,E.y=(S.y/n+1)/2,g.push(E.x,E.y)}v+=x}for(let w=0;w<a;w++){const y=w*(r+1);for(let _=0;_<r;_++){const D=_+y,L=D,C=D+r+1,B=D+r+2,U=D+1;d.push(L,C,U),d.push(C,B,U)}}this.setIndex(d),this.setAttribute("position",new Sn(h,3)),this.setAttribute("normal",new Sn(m,3)),this.setAttribute("uv",new Sn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hf(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pf extends jl{constructor(e=1,n=0){const r=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],a=[2,1,0,0,3,2,1,3,0,2,3,1];super(r,a,e,n),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new pf(e.radius,e.detail)}}class Ey extends qn{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const n=[],r=new Set,a=new Y,l=new Y;if(e.index!==null){const u=e.attributes.position,d=e.index;let h=e.groups;h.length===0&&(h=[{start:0,count:d.count,materialIndex:0}]);for(let m=0,g=h.length;m<g;++m){const v=h[m],x=v.start,S=v.count;for(let E=x,w=x+S;E<w;E+=3)for(let y=0;y<3;y++){const _=d.getX(E+y),D=d.getX(E+(y+1)%3);a.fromBufferAttribute(u,_),l.fromBufferAttribute(u,D),Cm(a,l,r)===!0&&(n.push(a.x,a.y,a.z),n.push(l.x,l.y,l.z))}}}else{const u=e.attributes.position;for(let d=0,h=u.count/3;d<h;d++)for(let m=0;m<3;m++){const g=3*d+m,v=3*d+(m+1)%3;a.fromBufferAttribute(u,g),l.fromBufferAttribute(u,v),Cm(a,l,r)===!0&&(n.push(a.x,a.y,a.z),n.push(l.x,l.y,l.z))}}this.setAttribute("position",new Sn(n,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Cm(s,e,n){const r=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,a=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return n.has(r)===!0||n.has(a)===!0?!1:(n.add(r),n.add(a),!0)}class Og extends Jr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eg,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rm extends Og{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new _t(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new _t(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new _t(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ty extends Jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=px,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wy extends Jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class mf extends Kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const Ju=new Dt,bm=new Y,Pm=new Y;class kg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.map=null,this.mapPass=null,this.matrix=new Dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new df,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,r=this.matrix;bm.setFromMatrixPosition(e.matrixWorld),n.position.copy(bm),Pm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Pm),n.updateMatrixWorld(),Ju.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ju),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Ju)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Nm=new Dt,Ho=new Y,ed=new Y;class Ay extends kg{constructor(){super(new Gn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xt(4,2),this._viewportCount=6,this._viewports=[new Lt(2,1,1,1),new Lt(0,1,1,1),new Lt(3,1,1,1),new Lt(1,1,1,1),new Lt(3,0,1,1),new Lt(1,0,1,1)],this._cubeDirections=[new Y(1,0,0),new Y(-1,0,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,1,0),new Y(0,-1,0)],this._cubeUps=[new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,0,1),new Y(0,0,-1)]}updateMatrices(e,n=0){const r=this.camera,a=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),Ho.setFromMatrixPosition(e.matrixWorld),r.position.copy(Ho),ed.copy(r.position),ed.add(this._cubeDirections[n]),r.up.copy(this._cubeUps[n]),r.lookAt(ed),r.updateMatrixWorld(),a.makeTranslation(-Ho.x,-Ho.y,-Ho.z),Nm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nm)}}class Cy extends mf{constructor(e,n,r=0,a=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=a,this.shadow=new Ay}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Bg extends Dg{constructor(e=-1,n=1,r=1,a=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,u=r+e,d=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,u=l+m*this.view.width,d-=g*this.view.offsetY,h=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class Ry extends kg{constructor(){super(new Bg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lm extends mf{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.shadow=new Ry}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class by extends mf{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Py extends Gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Ny{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Dm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Dm();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function Dm(){return performance.now()}function Im(s,e,n,r){const a=Ly(r);switch(n){case _g:return s*e;case xg:return s*e;case yg:return s*e*2;case nf:return s*e/a.components*a.byteLength;case rf:return s*e/a.components*a.byteLength;case Sg:return s*e*2/a.components*a.byteLength;case sf:return s*e*2/a.components*a.byteLength;case vg:return s*e*3/a.components*a.byteLength;case fi:return s*e*4/a.components*a.byteLength;case of:return s*e*4/a.components*a.byteLength;case Nl:case Ll:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Dl:case Il:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sd:case Ed:return Math.max(s,16)*Math.max(e,8)/4;case yd:case Md:return Math.max(s,8)*Math.max(e,8)/2;case Td:case wd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ad:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case bd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Pd:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ld:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Dd:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Id:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ud:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Od:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case kd:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Bd:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case zd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ul:case Hd:case Vd:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Mg:case Gd:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Wd:case jd:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Ly(s){switch(s){case Gi:case pg:return{byteLength:1,components:1};case Xo:case mg:case Yo:return{byteLength:2,components:1};case ef:case tf:return{byteLength:2,components:4};case $r:case Jd:case Mi:return{byteLength:4,components:1};case gg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zg(){let s=null,e=!1,n=null,r=null;function a(l,u){n(l,u),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){n=l},setContext:function(l){s=l}}}function Dy(s){const e=new WeakMap;function n(d,h){const m=d.array,g=d.usage,v=m.byteLength,x=s.createBuffer();s.bindBuffer(h,x),s.bufferData(h,m,g),d.onUploadCallback();let S;if(m instanceof Float32Array)S=s.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=s.SHORT;else if(m instanceof Uint32Array)S=s.UNSIGNED_INT;else if(m instanceof Int32Array)S=s.INT;else if(m instanceof Int8Array)S=s.BYTE;else if(m instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:v}}function r(d,h,m){const g=h.array,v=h.updateRanges;if(s.bindBuffer(m,d),v.length===0)s.bufferSubData(m,0,g);else{v.sort((S,E)=>S.start-E.start);let x=0;for(let S=1;S<v.length;S++){const E=v[x],w=v[S];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++x,v[x]=w)}v.length=x+1;for(let S=0,E=v.length;S<E;S++){const w=v[S];s.bufferSubData(m,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const h=e.get(d);h&&(s.deleteBuffer(h.buffer),e.delete(d))}function u(d,h){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,n(d,h));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,d,h),m.version=d.version}}return{get:a,remove:l,update:u}}var Iy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Uy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Oy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ky=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,By=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Yy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$y=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ky=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,iS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,oS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uS="gl_FragColor = linearToOutputTexel( gl_FragColor );",dS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_S=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,MS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ES=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,AS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,CS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,DS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,IS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,US=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,OS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,HS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,GS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,WS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,XS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$S=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,KS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,QS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,JS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,cM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,gM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_M=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,SM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,MM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,EM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,CM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,RM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const DM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,IM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,HM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,VM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,GM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,XM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,YM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$M=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,QM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,e1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,t1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,r1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,l1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,d1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,f1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:Iy,alphahash_pars_fragment:Uy,alphamap_fragment:Fy,alphamap_pars_fragment:Oy,alphatest_fragment:ky,alphatest_pars_fragment:By,aomap_fragment:zy,aomap_pars_fragment:Hy,batching_pars_vertex:Vy,batching_vertex:Gy,begin_vertex:Wy,beginnormal_vertex:jy,bsdfs:Xy,iridescence_fragment:qy,bumpmap_pars_fragment:Yy,clipping_planes_fragment:$y,clipping_planes_pars_fragment:Ky,clipping_planes_pars_vertex:Zy,clipping_planes_vertex:Qy,color_fragment:Jy,color_pars_fragment:eS,color_pars_vertex:tS,color_vertex:nS,common:iS,cube_uv_reflection_fragment:rS,defaultnormal_vertex:sS,displacementmap_pars_vertex:oS,displacementmap_vertex:aS,emissivemap_fragment:lS,emissivemap_pars_fragment:cS,colorspace_fragment:uS,colorspace_pars_fragment:dS,envmap_fragment:fS,envmap_common_pars_fragment:hS,envmap_pars_fragment:pS,envmap_pars_vertex:mS,envmap_physical_pars_fragment:AS,envmap_vertex:gS,fog_vertex:_S,fog_pars_vertex:vS,fog_fragment:xS,fog_pars_fragment:yS,gradientmap_pars_fragment:SS,lightmap_pars_fragment:MS,lights_lambert_fragment:ES,lights_lambert_pars_fragment:TS,lights_pars_begin:wS,lights_toon_fragment:CS,lights_toon_pars_fragment:RS,lights_phong_fragment:bS,lights_phong_pars_fragment:PS,lights_physical_fragment:NS,lights_physical_pars_fragment:LS,lights_fragment_begin:DS,lights_fragment_maps:IS,lights_fragment_end:US,logdepthbuf_fragment:FS,logdepthbuf_pars_fragment:OS,logdepthbuf_pars_vertex:kS,logdepthbuf_vertex:BS,map_fragment:zS,map_pars_fragment:HS,map_particle_fragment:VS,map_particle_pars_fragment:GS,metalnessmap_fragment:WS,metalnessmap_pars_fragment:jS,morphinstance_vertex:XS,morphcolor_vertex:qS,morphnormal_vertex:YS,morphtarget_pars_vertex:$S,morphtarget_vertex:KS,normal_fragment_begin:ZS,normal_fragment_maps:QS,normal_pars_fragment:JS,normal_pars_vertex:eM,normal_vertex:tM,normalmap_pars_fragment:nM,clearcoat_normal_fragment_begin:iM,clearcoat_normal_fragment_maps:rM,clearcoat_pars_fragment:sM,iridescence_pars_fragment:oM,opaque_fragment:aM,packing:lM,premultiplied_alpha_fragment:cM,project_vertex:uM,dithering_fragment:dM,dithering_pars_fragment:fM,roughnessmap_fragment:hM,roughnessmap_pars_fragment:pM,shadowmap_pars_fragment:mM,shadowmap_pars_vertex:gM,shadowmap_vertex:_M,shadowmask_pars_fragment:vM,skinbase_vertex:xM,skinning_pars_vertex:yM,skinning_vertex:SM,skinnormal_vertex:MM,specularmap_fragment:EM,specularmap_pars_fragment:TM,tonemapping_fragment:wM,tonemapping_pars_fragment:AM,transmission_fragment:CM,transmission_pars_fragment:RM,uv_pars_fragment:bM,uv_pars_vertex:PM,uv_vertex:NM,worldpos_vertex:LM,background_vert:DM,background_frag:IM,backgroundCube_vert:UM,backgroundCube_frag:FM,cube_vert:OM,cube_frag:kM,depth_vert:BM,depth_frag:zM,distanceRGBA_vert:HM,distanceRGBA_frag:VM,equirect_vert:GM,equirect_frag:WM,linedashed_vert:jM,linedashed_frag:XM,meshbasic_vert:qM,meshbasic_frag:YM,meshlambert_vert:$M,meshlambert_frag:KM,meshmatcap_vert:ZM,meshmatcap_frag:QM,meshnormal_vert:JM,meshnormal_frag:e1,meshphong_vert:t1,meshphong_frag:n1,meshphysical_vert:i1,meshphysical_frag:r1,meshtoon_vert:s1,meshtoon_frag:o1,points_vert:a1,points_frag:l1,shadow_vert:c1,shadow_frag:u1,sprite_vert:d1,sprite_frag:f1},De={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},xi={basic:{uniforms:Cn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Cn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new _t(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Cn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Cn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Cn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new _t(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Cn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Cn([De.points,De.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Cn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Cn([De.common,De.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Cn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Cn([De.sprite,De.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:Cn([De.common,De.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:Cn([De.lights,De.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};xi.physical={uniforms:Cn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Rl={r:0,b:0,g:0},Hr=new Ei,h1=new Dt;function p1(s,e,n,r,a,l,u){const d=new _t(0);let h=l===!0?0:1,m,g,v=null,x=0,S=null;function E(L){let C=L.isScene===!0?L.background:null;return C&&C.isTexture&&(C=(L.backgroundBlurriness>0?n:e).get(C)),C}function w(L){let C=!1;const B=E(L);B===null?_(d,h):B&&B.isColor&&(_(B,1),C=!0);const U=s.xr.getEnvironmentBlendMode();U==="additive"?r.buffers.color.setClear(0,0,0,1,u):U==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||C)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(L,C){const B=E(C);B&&(B.isCubeTexture||B.mapping===Wl)?(g===void 0&&(g=new Wn(new Ko(1,1,1),new Mr({name:"BackgroundCubeMaterial",uniforms:Zs(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(U,O,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(g)),Hr.copy(C.backgroundRotation),Hr.x*=-1,Hr.y*=-1,Hr.z*=-1,B.isCubeTexture&&B.isRenderTargetTexture===!1&&(Hr.y*=-1,Hr.z*=-1),g.material.uniforms.envMap.value=B,g.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(h1.makeRotationFromEuler(Hr)),g.material.toneMapped=Rt.getTransfer(B.colorSpace)!==Nt,(v!==B||x!==B.version||S!==s.toneMapping)&&(g.material.needsUpdate=!0,v=B,x=B.version,S=s.toneMapping),g.layers.enableAll(),L.unshift(g,g.geometry,g.material,0,0,null)):B&&B.isTexture&&(m===void 0&&(m=new Wn(new Xl(2,2),new Mr({name:"BackgroundMaterial",uniforms:Zs(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=B,m.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,m.material.toneMapped=Rt.getTransfer(B.colorSpace)!==Nt,B.matrixAutoUpdate===!0&&B.updateMatrix(),m.material.uniforms.uvTransform.value.copy(B.matrix),(v!==B||x!==B.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,v=B,x=B.version,S=s.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function _(L,C){L.getRGB(Rl,Lg(s)),r.buffers.color.setClear(Rl.r,Rl.g,Rl.b,C,u)}function D(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(L,C=1){d.set(L),h=C,_(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(L){h=L,_(d,h)},render:w,addToRenderList:y,dispose:D}}function m1(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let l=a,u=!1;function d(A,I,ae,Q,re){let me=!1;const oe=v(Q,ae,I);l!==oe&&(l=oe,m(l.object)),me=S(A,Q,ae,re),me&&E(A,Q,ae,re),re!==null&&e.update(re,s.ELEMENT_ARRAY_BUFFER),(me||u)&&(u=!1,C(A,I,ae,Q),re!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(re).buffer))}function h(){return s.createVertexArray()}function m(A){return s.bindVertexArray(A)}function g(A){return s.deleteVertexArray(A)}function v(A,I,ae){const Q=ae.wireframe===!0;let re=r[A.id];re===void 0&&(re={},r[A.id]=re);let me=re[I.id];me===void 0&&(me={},re[I.id]=me);let oe=me[Q];return oe===void 0&&(oe=x(h()),me[Q]=oe),oe}function x(A){const I=[],ae=[],Q=[];for(let re=0;re<n;re++)I[re]=0,ae[re]=0,Q[re]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:ae,attributeDivisors:Q,object:A,attributes:{},index:null}}function S(A,I,ae,Q){const re=l.attributes,me=I.attributes;let oe=0;const ue=ae.getAttributes();for(const G in ue)if(ue[G].location>=0){const te=re[G];let k=me[G];if(k===void 0&&(G==="instanceMatrix"&&A.instanceMatrix&&(k=A.instanceMatrix),G==="instanceColor"&&A.instanceColor&&(k=A.instanceColor)),te===void 0||te.attribute!==k||k&&te.data!==k.data)return!0;oe++}return l.attributesNum!==oe||l.index!==Q}function E(A,I,ae,Q){const re={},me=I.attributes;let oe=0;const ue=ae.getAttributes();for(const G in ue)if(ue[G].location>=0){let te=me[G];te===void 0&&(G==="instanceMatrix"&&A.instanceMatrix&&(te=A.instanceMatrix),G==="instanceColor"&&A.instanceColor&&(te=A.instanceColor));const k={};k.attribute=te,te&&te.data&&(k.data=te.data),re[G]=k,oe++}l.attributes=re,l.attributesNum=oe,l.index=Q}function w(){const A=l.newAttributes;for(let I=0,ae=A.length;I<ae;I++)A[I]=0}function y(A){_(A,0)}function _(A,I){const ae=l.newAttributes,Q=l.enabledAttributes,re=l.attributeDivisors;ae[A]=1,Q[A]===0&&(s.enableVertexAttribArray(A),Q[A]=1),re[A]!==I&&(s.vertexAttribDivisor(A,I),re[A]=I)}function D(){const A=l.newAttributes,I=l.enabledAttributes;for(let ae=0,Q=I.length;ae<Q;ae++)I[ae]!==A[ae]&&(s.disableVertexAttribArray(ae),I[ae]=0)}function L(A,I,ae,Q,re,me,oe){oe===!0?s.vertexAttribIPointer(A,I,ae,re,me):s.vertexAttribPointer(A,I,ae,Q,re,me)}function C(A,I,ae,Q){w();const re=Q.attributes,me=ae.getAttributes(),oe=I.defaultAttributeValues;for(const ue in me){const G=me[ue];if(G.location>=0){let ce=re[ue];if(ce===void 0&&(ue==="instanceMatrix"&&A.instanceMatrix&&(ce=A.instanceMatrix),ue==="instanceColor"&&A.instanceColor&&(ce=A.instanceColor)),ce!==void 0){const te=ce.normalized,k=ce.itemSize,Z=e.get(ce);if(Z===void 0)continue;const Ne=Z.buffer,J=Z.type,de=Z.bytesPerElement,Se=J===s.INT||J===s.UNSIGNED_INT||ce.gpuType===Jd;if(ce.isInterleavedBufferAttribute){const xe=ce.data,we=xe.stride,$e=ce.offset;if(xe.isInstancedInterleavedBuffer){for(let Xe=0;Xe<G.locationSize;Xe++)_(G.location+Xe,xe.meshPerAttribute);A.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Xe=0;Xe<G.locationSize;Xe++)y(G.location+Xe);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let Xe=0;Xe<G.locationSize;Xe++)L(G.location+Xe,k/G.locationSize,J,te,we*de,($e+k/G.locationSize*Xe)*de,Se)}else{if(ce.isInstancedBufferAttribute){for(let xe=0;xe<G.locationSize;xe++)_(G.location+xe,ce.meshPerAttribute);A.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let xe=0;xe<G.locationSize;xe++)y(G.location+xe);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let xe=0;xe<G.locationSize;xe++)L(G.location+xe,k/G.locationSize,J,te,k*de,k/G.locationSize*xe*de,Se)}}else if(oe!==void 0){const te=oe[ue];if(te!==void 0)switch(te.length){case 2:s.vertexAttrib2fv(G.location,te);break;case 3:s.vertexAttrib3fv(G.location,te);break;case 4:s.vertexAttrib4fv(G.location,te);break;default:s.vertexAttrib1fv(G.location,te)}}}}D()}function B(){z();for(const A in r){const I=r[A];for(const ae in I){const Q=I[ae];for(const re in Q)g(Q[re].object),delete Q[re];delete I[ae]}delete r[A]}}function U(A){if(r[A.id]===void 0)return;const I=r[A.id];for(const ae in I){const Q=I[ae];for(const re in Q)g(Q[re].object),delete Q[re];delete I[ae]}delete r[A.id]}function O(A){for(const I in r){const ae=r[I];if(ae[A.id]===void 0)continue;const Q=ae[A.id];for(const re in Q)g(Q[re].object),delete Q[re];delete ae[A.id]}}function z(){b(),u=!0,l!==a&&(l=a,m(l.object))}function b(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:z,resetDefaultState:b,dispose:B,releaseStatesOfGeometry:U,releaseStatesOfProgram:O,initAttributes:w,enableAttribute:y,disableUnusedAttributes:D}}function g1(s,e,n){let r;function a(m){r=m}function l(m,g){s.drawArrays(r,m,g),n.update(g,r,1)}function u(m,g,v){v!==0&&(s.drawArraysInstanced(r,m,g,v),n.update(g,r,v))}function d(m,g,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,g,0,v);let S=0;for(let E=0;E<v;E++)S+=g[E];n.update(S,r,1)}function h(m,g,v,x){if(v===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<m.length;E++)u(m[E],g[E],x[E]);else{S.multiDrawArraysInstancedWEBGL(r,m,0,g,0,x,0,v);let E=0;for(let w=0;w<v;w++)E+=g[w]*x[w];n.update(E,r,1)}}this.setMode=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function _1(s,e,n,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function u(O){return!(O!==fi&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const z=O===Yo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==Gi&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Mi&&!z)}function h(O){if(O==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const g=h(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const v=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),D=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),L=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),B=E>0,U=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:D,maxVaryings:L,maxFragmentUniforms:C,vertexTextures:B,maxSamples:U}}function v1(s){const e=this;let n=null,r=0,a=!1,l=!1;const u=new Gr,d=new dt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const S=v.length!==0||x||r!==0||a;return a=x,r=v.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(v,x){n=g(v,x,0)},this.setState=function(v,x,S){const E=v.clippingPlanes,w=v.clipIntersection,y=v.clipShadows,_=s.get(v);if(!a||E===null||E.length===0||l&&!y)l?g(null):m();else{const D=l?0:r,L=D*4;let C=_.clippingState||null;h.value=C,C=g(E,x,L,S);for(let B=0;B!==L;++B)C[B]=n[B];_.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=D}};function m(){h.value!==n&&(h.value=n,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(v,x,S,E){const w=v!==null?v.length:0;let y=null;if(w!==0){if(y=h.value,E!==!0||y===null){const _=S+w*4,D=x.matrixWorldInverse;d.getNormalMatrix(D),(y===null||y.length<_)&&(y=new Float32Array(_));for(let L=0,C=S;L!==w;++L,C+=4)u.copy(v[L]).applyMatrix4(D,d),u.normal.toArray(y,C),y[C+3]=u.constant}h.value=y,h.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,y}}function x1(s){let e=new WeakMap;function n(u,d){return d===gd?u.mapping=Xs:d===_d&&(u.mapping=qs),u}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===gd||d===_d)if(e.has(u)){const h=e.get(u).texture;return n(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const m=new fy(h.height);return m.fromEquirectangularTexture(s,u),e.set(u,m),u.addEventListener("dispose",a),n(m.texture,u.mapping)}else return null}}return u}function a(u){const d=u.target;d.removeEventListener("dispose",a);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const Hs=4,Um=[.125,.215,.35,.446,.526,.582],Xr=20,td=new Bg,Fm=new _t;let nd=null,id=0,rd=0,sd=!1;const Wr=(1+Math.sqrt(5))/2,ks=1/Wr,Om=[new Y(-Wr,ks,0),new Y(Wr,ks,0),new Y(-ks,0,Wr),new Y(ks,0,Wr),new Y(0,Wr,-ks),new Y(0,Wr,ks),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)];class km{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100){nd=this._renderer.getRenderTarget(),id=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nd,id,rd),this._renderer.xr.enabled=sd,e.scissorTest=!1,bl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Xs||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nd=this._renderer.getRenderTarget(),id=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:Si,minFilter:Si,generateMipmaps:!1,type:Yo,format:fi,colorSpace:Ks,depthBuffer:!1},a=Bm(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bm(e,n,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=y1(l)),this._blurMaterial=S1(l,e,n)}return a}_compileMaterial(e){const n=new Wn(this._lodPlanes[0],e);this._renderer.compile(n,td)}_sceneToCubeUV(e,n,r,a){const d=new Gn(90,1,n,r),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,x=g.toneMapping;g.getClearColor(Fm),g.toneMapping=yr,g.autoClear=!1;const S=new cf({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),E=new Wn(new Ko,S);let w=!1;const y=e.background;y?y.isColor&&(S.color.copy(y),e.background=null,w=!0):(S.color.copy(Fm),w=!0);for(let _=0;_<6;_++){const D=_%3;D===0?(d.up.set(0,h[_],0),d.lookAt(m[_],0,0)):D===1?(d.up.set(0,0,h[_]),d.lookAt(0,m[_],0)):(d.up.set(0,h[_],0),d.lookAt(0,0,m[_]));const L=this._cubeSize;bl(a,D*L,_>2?L:0,L,L),g.setRenderTarget(a),w&&g.render(E,d),g.render(e,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=v,e.background=y}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Xs||e.mapping===qs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zm());const l=a?this._cubemapMaterial:this._equirectMaterial,u=new Wn(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const h=this._cubeSize;bl(n,0,0,3*h,2*h),r.setRenderTarget(n),r.render(u,td)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),d=Om[(a-l-1)%Om.length];this._blur(e,l-1,l,u,d)}n.autoClear=r}_blur(e,n,r,a,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,r,a,"latitudinal",l),this._halfBlur(u,e,r,r,a,"longitudinal",l)}_halfBlur(e,n,r,a,l,u,d){const h=this._renderer,m=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,v=new Wn(this._lodPlanes[a],m),x=m.uniforms,S=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Xr-1),w=l/E,y=isFinite(l)?1+Math.floor(g*w):Xr;y>Xr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Xr}`);const _=[];let D=0;for(let O=0;O<Xr;++O){const z=O/w,b=Math.exp(-z*z/2);_.push(b),O===0?D+=b:O<y&&(D+=2*b)}for(let O=0;O<_.length;O++)_[O]=_[O]/D;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=_,x.latitudinal.value=u==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:L}=this;x.dTheta.value=E,x.mipInt.value=L-r;const C=this._sizeLods[a],B=3*C*(a>L-Hs?a-L+Hs:0),U=4*(this._cubeSize-C);bl(n,B,U,3*C,2*C),h.setRenderTarget(n),h.render(v,td)}}function y1(s){const e=[],n=[],r=[];let a=s;const l=s-Hs+1+Um.length;for(let u=0;u<l;u++){const d=Math.pow(2,a);n.push(d);let h=1/d;u>s-Hs?h=Um[u-s+Hs-1]:u===0&&(h=0),r.push(h);const m=1/(d-2),g=-m,v=1+m,x=[g,g,v,g,v,v,g,g,v,v,g,v],S=6,E=6,w=3,y=2,_=1,D=new Float32Array(w*E*S),L=new Float32Array(y*E*S),C=new Float32Array(_*E*S);for(let U=0;U<S;U++){const O=U%3*2/3-1,z=U>2?0:-1,b=[O,z,0,O+2/3,z,0,O+2/3,z+1,0,O,z,0,O+2/3,z+1,0,O,z+1,0];D.set(b,w*E*U),L.set(x,y*E*U);const A=[U,U,U,U,U,U];C.set(A,_*E*U)}const B=new qn;B.setAttribute("position",new Xn(D,w)),B.setAttribute("uv",new Xn(L,y)),B.setAttribute("faceIndex",new Xn(C,_)),e.push(B),a>Hs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function Bm(s,e,n){const r=new Kr(s,e,n);return r.texture.mapping=Wl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function bl(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function S1(s,e,n){const r=new Float32Array(Xr),a=new Y(0,1,0);return new Mr({name:"SphericalGaussianBlur",defines:{n:Xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function zm(){return new Mr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Hm(){return new Mr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function gf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function M1(s){let e=new WeakMap,n=null;function r(d){if(d&&d.isTexture){const h=d.mapping,m=h===gd||h===_d,g=h===Xs||h===qs;if(m||g){let v=e.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new km(s)),v=m?n.fromEquirectangular(d,v):n.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),v.texture;if(v!==void 0)return v.texture;{const S=d.image;return m&&S&&S.height>0||g&&S&&a(S)?(n===null&&(n=new km(s)),v=m?n.fromEquirectangular(d):n.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),d.addEventListener("dispose",l),v.texture):null}}}return d}function a(d){let h=0;const m=6;for(let g=0;g<m;g++)d[g]!==void 0&&h++;return h===m}function l(d){const h=d.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function E1(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&zs("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function T1(s,e,n,r){const a={},l=new WeakMap;function u(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const E in x.attributes)e.remove(x.attributes[E]);x.removeEventListener("dispose",u),delete a[x.id];const S=l.get(x);S&&(e.remove(S),l.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(v,x){return a[x.id]===!0||(x.addEventListener("dispose",u),a[x.id]=!0,n.memory.geometries++),x}function h(v){const x=v.attributes;for(const S in x)e.update(x[S],s.ARRAY_BUFFER)}function m(v){const x=[],S=v.index,E=v.attributes.position;let w=0;if(S!==null){const D=S.array;w=S.version;for(let L=0,C=D.length;L<C;L+=3){const B=D[L+0],U=D[L+1],O=D[L+2];x.push(B,U,U,O,O,B)}}else if(E!==void 0){const D=E.array;w=E.version;for(let L=0,C=D.length/3-1;L<C;L+=3){const B=L+0,U=L+1,O=L+2;x.push(B,U,U,O,O,B)}}else return;const y=new(wg(x)?Ng:Pg)(x,1);y.version=w;const _=l.get(v);_&&e.remove(_),l.set(v,y)}function g(v){const x=l.get(v);if(x){const S=v.index;S!==null&&x.version<S.version&&m(v)}else m(v);return l.get(v)}return{get:d,update:h,getWireframeAttribute:g}}function w1(s,e,n){let r;function a(x){r=x}let l,u;function d(x){l=x.type,u=x.bytesPerElement}function h(x,S){s.drawElements(r,S,l,x*u),n.update(S,r,1)}function m(x,S,E){E!==0&&(s.drawElementsInstanced(r,S,l,x*u,E),n.update(S,r,E))}function g(x,S,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,x,0,E);let y=0;for(let _=0;_<E;_++)y+=S[_];n.update(y,r,1)}function v(x,S,E,w){if(E===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<x.length;_++)m(x[_]/u,S[_],w[_]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,l,x,0,w,0,E);let _=0;for(let D=0;D<E;D++)_+=S[D]*w[D];n.update(_,r,1)}}this.setMode=a,this.setIndex=d,this.render=h,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=v}function A1(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,d){switch(n.calls++,u){case s.TRIANGLES:n.triangles+=d*(l/3);break;case s.LINES:n.lines+=d*(l/2);break;case s.LINE_STRIP:n.lines+=d*(l-1);break;case s.LINE_LOOP:n.lines+=d*l;break;case s.POINTS:n.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function C1(s,e,n){const r=new WeakMap,a=new Lt;function l(u,d,h){const m=u.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=g!==void 0?g.length:0;let x=r.get(d);if(x===void 0||x.count!==v){let A=function(){z.dispose(),r.delete(d),d.removeEventListener("dispose",A)};var S=A;x!==void 0&&x.texture.dispose();const E=d.morphAttributes.position!==void 0,w=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],D=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let C=0;E===!0&&(C=1),w===!0&&(C=2),y===!0&&(C=3);let B=d.attributes.position.count*C,U=1;B>e.maxTextureSize&&(U=Math.ceil(B/e.maxTextureSize),B=e.maxTextureSize);const O=new Float32Array(B*U*4*v),z=new Cg(O,B,U,v);z.type=Mi,z.needsUpdate=!0;const b=C*4;for(let I=0;I<v;I++){const ae=_[I],Q=D[I],re=L[I],me=B*U*4*I;for(let oe=0;oe<ae.count;oe++){const ue=oe*b;E===!0&&(a.fromBufferAttribute(ae,oe),O[me+ue+0]=a.x,O[me+ue+1]=a.y,O[me+ue+2]=a.z,O[me+ue+3]=0),w===!0&&(a.fromBufferAttribute(Q,oe),O[me+ue+4]=a.x,O[me+ue+5]=a.y,O[me+ue+6]=a.z,O[me+ue+7]=0),y===!0&&(a.fromBufferAttribute(re,oe),O[me+ue+8]=a.x,O[me+ue+9]=a.y,O[me+ue+10]=a.z,O[me+ue+11]=re.itemSize===4?a.w:1)}}x={count:v,texture:z,size:new xt(B,U)},r.set(d,x),d.addEventListener("dispose",A)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,n);else{let E=0;for(let y=0;y<m.length;y++)E+=m[y];const w=d.morphTargetsRelative?1:1-E;h.getUniforms().setValue(s,"morphTargetBaseInfluence",w),h.getUniforms().setValue(s,"morphTargetInfluences",m)}h.getUniforms().setValue(s,"morphTargetsTexture",x.texture,n),h.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:l}}function R1(s,e,n,r){let a=new WeakMap;function l(h){const m=r.render.frame,g=h.geometry,v=e.get(h,g);if(a.get(v)!==m&&(e.update(v),a.set(v,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",d)===!1&&h.addEventListener("dispose",d),a.get(h)!==m&&(n.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const x=h.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return v}function u(){a=new WeakMap}function d(h){const m=h.target;m.removeEventListener("dispose",d),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:l,dispose:u}}const Hg=new Rn,Vm=new Fg(1,1),Vg=new Cg,Gg=new $x,Wg=new Ig,Gm=[],Wm=[],jm=new Float32Array(16),Xm=new Float32Array(9),qm=new Float32Array(4);function eo(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let l=Gm[a];if(l===void 0&&(l=new Float32Array(a),Gm[a]=l),e!==0){r.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=n,s[u].toArray(l,d)}return l}function en(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function tn(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function ql(s,e){let n=Wm[e];n===void 0&&(n=new Int32Array(e),Wm[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function b1(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function P1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(en(n,e))return;s.uniform2fv(this.addr,e),tn(n,e)}}function N1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(en(n,e))return;s.uniform3fv(this.addr,e),tn(n,e)}}function L1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(en(n,e))return;s.uniform4fv(this.addr,e),tn(n,e)}}function D1(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(en(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),tn(n,e)}else{if(en(n,r))return;qm.set(r),s.uniformMatrix2fv(this.addr,!1,qm),tn(n,r)}}function I1(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(en(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),tn(n,e)}else{if(en(n,r))return;Xm.set(r),s.uniformMatrix3fv(this.addr,!1,Xm),tn(n,r)}}function U1(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(en(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),tn(n,e)}else{if(en(n,r))return;jm.set(r),s.uniformMatrix4fv(this.addr,!1,jm),tn(n,r)}}function F1(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function O1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(en(n,e))return;s.uniform2iv(this.addr,e),tn(n,e)}}function k1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(en(n,e))return;s.uniform3iv(this.addr,e),tn(n,e)}}function B1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(en(n,e))return;s.uniform4iv(this.addr,e),tn(n,e)}}function z1(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function H1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(en(n,e))return;s.uniform2uiv(this.addr,e),tn(n,e)}}function V1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(en(n,e))return;s.uniform3uiv(this.addr,e),tn(n,e)}}function G1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(en(n,e))return;s.uniform4uiv(this.addr,e),tn(n,e)}}function W1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(Vm.compareFunction=Tg,l=Vm):l=Hg,n.setTexture2D(e||l,a)}function j1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||Gg,a)}function X1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||Wg,a)}function q1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||Vg,a)}function Y1(s){switch(s){case 5126:return b1;case 35664:return P1;case 35665:return N1;case 35666:return L1;case 35674:return D1;case 35675:return I1;case 35676:return U1;case 5124:case 35670:return F1;case 35667:case 35671:return O1;case 35668:case 35672:return k1;case 35669:case 35673:return B1;case 5125:return z1;case 36294:return H1;case 36295:return V1;case 36296:return G1;case 35678:case 36198:case 36298:case 36306:case 35682:return W1;case 35679:case 36299:case 36307:return j1;case 35680:case 36300:case 36308:case 36293:return X1;case 36289:case 36303:case 36311:case 36292:return q1}}function $1(s,e){s.uniform1fv(this.addr,e)}function K1(s,e){const n=eo(e,this.size,2);s.uniform2fv(this.addr,n)}function Z1(s,e){const n=eo(e,this.size,3);s.uniform3fv(this.addr,n)}function Q1(s,e){const n=eo(e,this.size,4);s.uniform4fv(this.addr,n)}function J1(s,e){const n=eo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function eE(s,e){const n=eo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function tE(s,e){const n=eo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function nE(s,e){s.uniform1iv(this.addr,e)}function iE(s,e){s.uniform2iv(this.addr,e)}function rE(s,e){s.uniform3iv(this.addr,e)}function sE(s,e){s.uniform4iv(this.addr,e)}function oE(s,e){s.uniform1uiv(this.addr,e)}function aE(s,e){s.uniform2uiv(this.addr,e)}function lE(s,e){s.uniform3uiv(this.addr,e)}function cE(s,e){s.uniform4uiv(this.addr,e)}function uE(s,e,n){const r=this.cache,a=e.length,l=ql(n,a);en(r,l)||(s.uniform1iv(this.addr,l),tn(r,l));for(let u=0;u!==a;++u)n.setTexture2D(e[u]||Hg,l[u])}function dE(s,e,n){const r=this.cache,a=e.length,l=ql(n,a);en(r,l)||(s.uniform1iv(this.addr,l),tn(r,l));for(let u=0;u!==a;++u)n.setTexture3D(e[u]||Gg,l[u])}function fE(s,e,n){const r=this.cache,a=e.length,l=ql(n,a);en(r,l)||(s.uniform1iv(this.addr,l),tn(r,l));for(let u=0;u!==a;++u)n.setTextureCube(e[u]||Wg,l[u])}function hE(s,e,n){const r=this.cache,a=e.length,l=ql(n,a);en(r,l)||(s.uniform1iv(this.addr,l),tn(r,l));for(let u=0;u!==a;++u)n.setTexture2DArray(e[u]||Vg,l[u])}function pE(s){switch(s){case 5126:return $1;case 35664:return K1;case 35665:return Z1;case 35666:return Q1;case 35674:return J1;case 35675:return eE;case 35676:return tE;case 5124:case 35670:return nE;case 35667:case 35671:return iE;case 35668:case 35672:return rE;case 35669:case 35673:return sE;case 5125:return oE;case 36294:return aE;case 36295:return lE;case 36296:return cE;case 35678:case 36198:case 36298:case 36306:case 35682:return uE;case 35679:case 36299:case 36307:return dE;case 35680:case 36300:case 36308:case 36293:return fE;case 36289:case 36303:case 36311:case 36292:return hE}}class mE{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=Y1(n.type)}}class gE{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=pE(n.type)}}class _E{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let l=0,u=a.length;l!==u;++l){const d=a[l];d.setValue(e,n[d.id],r)}}}const od=/(\w+)(\])?(\[|\.)?/g;function Ym(s,e){s.seq.push(e),s.map[e.id]=e}function vE(s,e,n){const r=s.name,a=r.length;for(od.lastIndex=0;;){const l=od.exec(r),u=od.lastIndex;let d=l[1];const h=l[2]==="]",m=l[3];if(h&&(d=d|0),m===void 0||m==="["&&u+2===a){Ym(n,m===void 0?new mE(d,s,e):new gE(d,s,e));break}else{let v=n.map[d];v===void 0&&(v=new _E(d),Ym(n,v)),n=v}}}class Fl{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(n,a),u=e.getUniformLocation(n,l.name);vE(l,u,this)}}setValue(e,n,r,a){const l=this.map[n];l!==void 0&&l.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let l=0,u=n.length;l!==u;++l){const d=n[l],h=r[d.id];h.needsUpdate!==!1&&d.setValue(e,h.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,l=e.length;a!==l;++a){const u=e[a];u.id in n&&r.push(u)}return r}}function $m(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const xE=37297;let yE=0;function SE(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,n.length);for(let u=a;u<l;u++){const d=u+1;r.push(`${d===e?">":" "} ${d}: ${n[u]}`)}return r.join(`
`)}const Km=new dt;function ME(s){Rt._getMatrix(Km,Rt.workingColorSpace,s);const e=`mat3( ${Km.elements.map(n=>n.toFixed(4))} )`;switch(Rt.getTransfer(s)){case kl:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Zm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const u=parseInt(l[1]);return n.toUpperCase()+`

`+a+`

`+SE(s.getShaderSource(e),u)}else return a}function EE(s,e){const n=ME(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function TE(s,e){let n;switch(e){case ax:n="Linear";break;case lx:n="Reinhard";break;case cx:n="Cineon";break;case fg:n="ACESFilmic";break;case dx:n="AgX";break;case fx:n="Neutral";break;case ux:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Pl=new Y;function wE(){Rt.getLuminanceCoefficients(Pl);const s=Pl.x.toFixed(4),e=Pl.y.toFixed(4),n=Pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Go).join(`
`)}function CE(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function RE(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),u=l.name;let d=1;l.type===s.FLOAT_MAT2&&(d=2),l.type===s.FLOAT_MAT3&&(d=3),l.type===s.FLOAT_MAT4&&(d=4),n[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:d}}return n}function Go(s){return s!==""}function Qm(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yd(s){return s.replace(bE,NE)}const PE=new Map;function NE(s,e){let n=pt[e];if(n===void 0){const r=PE.get(e);if(r!==void 0)n=pt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Yd(n)}const LE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eg(s){return s.replace(LE,DE)}function DE(s,e,n,r){let a="";for(let l=parseInt(e);l<parseInt(n);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function tg(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function IE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ug?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===zv?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===zi&&(e="SHADOWMAP_TYPE_VSM"),e}function UE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Xs:case qs:e="ENVMAP_TYPE_CUBE";break;case Wl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function FE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function OE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case dg:e="ENVMAP_BLENDING_MULTIPLY";break;case sx:e="ENVMAP_BLENDING_MIX";break;case ox:e="ENVMAP_BLENDING_ADD";break}return e}function kE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function BE(s,e,n,r){const a=s.getContext(),l=n.defines;let u=n.vertexShader,d=n.fragmentShader;const h=IE(n),m=UE(n),g=FE(n),v=OE(n),x=kE(n),S=AE(n),E=CE(l),w=a.createProgram();let y,_,D=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Go).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Go).join(`
`),_.length>0&&(_+=`
`)):(y=[tg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Go).join(`
`),_=[tg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+g:"",n.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==yr?"#define TONE_MAPPING":"",n.toneMapping!==yr?pt.tonemapping_pars_fragment:"",n.toneMapping!==yr?TE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,EE("linearToOutputTexel",n.outputColorSpace),wE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Go).join(`
`)),u=Yd(u),u=Qm(u,n),u=Jm(u,n),d=Yd(d),d=Qm(d,n),d=Jm(d,n),u=eg(u),d=eg(d),n.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",n.glslVersion===Qp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Qp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const L=D+y+u,C=D+_+d,B=$m(a,a.VERTEX_SHADER,L),U=$m(a,a.FRAGMENT_SHADER,C);a.attachShader(w,B),a.attachShader(w,U),n.index0AttributeName!==void 0?a.bindAttribLocation(w,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function O(I){if(s.debug.checkShaderErrors){const ae=a.getProgramInfoLog(w).trim(),Q=a.getShaderInfoLog(B).trim(),re=a.getShaderInfoLog(U).trim();let me=!0,oe=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(me=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,w,B,U);else{const ue=Zm(a,B,"vertex"),G=Zm(a,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+ae+`
`+ue+`
`+G)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(Q===""||re==="")&&(oe=!1);oe&&(I.diagnostics={runnable:me,programLog:ae,vertexShader:{log:Q,prefix:y},fragmentShader:{log:re,prefix:_}})}a.deleteShader(B),a.deleteShader(U),z=new Fl(a,w),b=RE(a,w)}let z;this.getUniforms=function(){return z===void 0&&O(this),z};let b;this.getAttributes=function(){return b===void 0&&O(this),b};let A=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=a.getProgramParameter(w,xE)),A},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yE++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=B,this.fragmentShader=U,this}let zE=0;class HE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new VE(e),n.set(e,r)),r}}class VE{constructor(e){this.id=zE++,this.code=e,this.usedTimes=0}}function GE(s,e,n,r,a,l,u){const d=new Rg,h=new HE,m=new Set,g=[],v=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(b){return m.add(b),b===0?"uv":`uv${b}`}function y(b,A,I,ae,Q){const re=ae.fog,me=Q.geometry,oe=b.isMeshStandardMaterial?ae.environment:null,ue=(b.isMeshStandardMaterial?n:e).get(b.envMap||oe),G=ue&&ue.mapping===Wl?ue.image.height:null,ce=E[b.type];b.precision!==null&&(S=a.getMaxPrecision(b.precision),S!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",S,"instead."));const te=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,k=te!==void 0?te.length:0;let Z=0;me.morphAttributes.position!==void 0&&(Z=1),me.morphAttributes.normal!==void 0&&(Z=2),me.morphAttributes.color!==void 0&&(Z=3);let Ne,J,de,Se;if(ce){const Tt=xi[ce];Ne=Tt.vertexShader,J=Tt.fragmentShader}else Ne=b.vertexShader,J=b.fragmentShader,h.update(b),de=h.getVertexShaderID(b),Se=h.getFragmentShaderID(b);const xe=s.getRenderTarget(),we=s.state.buffers.depth.getReversed(),$e=Q.isInstancedMesh===!0,Xe=Q.isBatchedMesh===!0,yt=!!b.map,bt=!!b.matcap,ct=!!ue,H=!!b.aoMap,nn=!!b.lightMap,ft=!!b.bumpMap,He=!!b.normalMap,Ae=!!b.displacementMap,ht=!!b.emissiveMap,Fe=!!b.metalnessMap,N=!!b.roughnessMap,T=b.anisotropy>0,ne=b.clearcoat>0,fe=b.dispersion>0,he=b.iridescence>0,pe=b.sheen>0,Ge=b.transmission>0,be=T&&!!b.anisotropyMap,Re=ne&&!!b.clearcoatMap,tt=ne&&!!b.clearcoatNormalMap,_e=ne&&!!b.clearcoatRoughnessMap,Pe=he&&!!b.iridescenceMap,Ye=he&&!!b.iridescenceThicknessMap,Qe=pe&&!!b.sheenColorMap,Oe=pe&&!!b.sheenRoughnessMap,at=!!b.specularMap,it=!!b.specularColorMap,Mt=!!b.specularIntensityMap,j=Ge&&!!b.transmissionMap,Ce=Ge&&!!b.thicknessMap,le=!!b.gradientMap,ge=!!b.alphaMap,Ue=b.alphaTest>0,Ie=!!b.alphaHash,lt=!!b.extensions;let Ot=yr;b.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Ot=s.toneMapping);const Zt={shaderID:ce,shaderType:b.type,shaderName:b.name,vertexShader:Ne,fragmentShader:J,defines:b.defines,customVertexShaderID:de,customFragmentShaderID:Se,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:S,batching:Xe,batchingColor:Xe&&Q._colorsTexture!==null,instancing:$e,instancingColor:$e&&Q.instanceColor!==null,instancingMorph:$e&&Q.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:xe===null?s.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Ks,alphaToCoverage:!!b.alphaToCoverage,map:yt,matcap:bt,envMap:ct,envMapMode:ct&&ue.mapping,envMapCubeUVHeight:G,aoMap:H,lightMap:nn,bumpMap:ft,normalMap:He,displacementMap:x&&Ae,emissiveMap:ht,normalMapObjectSpace:He&&b.normalMapType===gx,normalMapTangentSpace:He&&b.normalMapType===Eg,metalnessMap:Fe,roughnessMap:N,anisotropy:T,anisotropyMap:be,clearcoat:ne,clearcoatMap:Re,clearcoatNormalMap:tt,clearcoatRoughnessMap:_e,dispersion:fe,iridescence:he,iridescenceMap:Pe,iridescenceThicknessMap:Ye,sheen:pe,sheenColorMap:Qe,sheenRoughnessMap:Oe,specularMap:at,specularColorMap:it,specularIntensityMap:Mt,transmission:Ge,transmissionMap:j,thicknessMap:Ce,gradientMap:le,opaque:b.transparent===!1&&b.blending===Vs&&b.alphaToCoverage===!1,alphaMap:ge,alphaTest:Ue,alphaHash:Ie,combine:b.combine,mapUv:yt&&w(b.map.channel),aoMapUv:H&&w(b.aoMap.channel),lightMapUv:nn&&w(b.lightMap.channel),bumpMapUv:ft&&w(b.bumpMap.channel),normalMapUv:He&&w(b.normalMap.channel),displacementMapUv:Ae&&w(b.displacementMap.channel),emissiveMapUv:ht&&w(b.emissiveMap.channel),metalnessMapUv:Fe&&w(b.metalnessMap.channel),roughnessMapUv:N&&w(b.roughnessMap.channel),anisotropyMapUv:be&&w(b.anisotropyMap.channel),clearcoatMapUv:Re&&w(b.clearcoatMap.channel),clearcoatNormalMapUv:tt&&w(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&w(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&w(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&w(b.iridescenceThicknessMap.channel),sheenColorMapUv:Qe&&w(b.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&w(b.sheenRoughnessMap.channel),specularMapUv:at&&w(b.specularMap.channel),specularColorMapUv:it&&w(b.specularColorMap.channel),specularIntensityMapUv:Mt&&w(b.specularIntensityMap.channel),transmissionMapUv:j&&w(b.transmissionMap.channel),thicknessMapUv:Ce&&w(b.thicknessMap.channel),alphaMapUv:ge&&w(b.alphaMap.channel),vertexTangents:!!me.attributes.tangent&&(He||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!me.attributes.uv&&(yt||ge),fog:!!re,useFog:b.fog===!0,fogExp2:!!re&&re.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:we,skinning:Q.isSkinnedMesh===!0,morphTargets:me.morphAttributes.position!==void 0,morphNormals:me.morphAttributes.normal!==void 0,morphColors:me.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:Z,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ot,decodeVideoTexture:yt&&b.map.isVideoTexture===!0&&Rt.getTransfer(b.map.colorSpace)===Nt,decodeVideoTextureEmissive:ht&&b.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(b.emissiveMap.colorSpace)===Nt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===yi,flipSided:b.side===Fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:lt&&b.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&b.extensions.multiDraw===!0||Xe)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Zt.vertexUv1s=m.has(1),Zt.vertexUv2s=m.has(2),Zt.vertexUv3s=m.has(3),m.clear(),Zt}function _(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)A.push(I),A.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(D(A,b),L(A,b),A.push(s.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function D(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function L(b,A){d.disableAll(),A.supportsVertexTextures&&d.enable(0),A.instancing&&d.enable(1),A.instancingColor&&d.enable(2),A.instancingMorph&&d.enable(3),A.matcap&&d.enable(4),A.envMap&&d.enable(5),A.normalMapObjectSpace&&d.enable(6),A.normalMapTangentSpace&&d.enable(7),A.clearcoat&&d.enable(8),A.iridescence&&d.enable(9),A.alphaTest&&d.enable(10),A.vertexColors&&d.enable(11),A.vertexAlphas&&d.enable(12),A.vertexUv1s&&d.enable(13),A.vertexUv2s&&d.enable(14),A.vertexUv3s&&d.enable(15),A.vertexTangents&&d.enable(16),A.anisotropy&&d.enable(17),A.alphaHash&&d.enable(18),A.batching&&d.enable(19),A.dispersion&&d.enable(20),A.batchingColor&&d.enable(21),b.push(d.mask),d.disableAll(),A.fog&&d.enable(0),A.useFog&&d.enable(1),A.flatShading&&d.enable(2),A.logarithmicDepthBuffer&&d.enable(3),A.reverseDepthBuffer&&d.enable(4),A.skinning&&d.enable(5),A.morphTargets&&d.enable(6),A.morphNormals&&d.enable(7),A.morphColors&&d.enable(8),A.premultipliedAlpha&&d.enable(9),A.shadowMapEnabled&&d.enable(10),A.doubleSided&&d.enable(11),A.flipSided&&d.enable(12),A.useDepthPacking&&d.enable(13),A.dithering&&d.enable(14),A.transmission&&d.enable(15),A.sheen&&d.enable(16),A.opaque&&d.enable(17),A.pointsUvs&&d.enable(18),A.decodeVideoTexture&&d.enable(19),A.decodeVideoTextureEmissive&&d.enable(20),A.alphaToCoverage&&d.enable(21),b.push(d.mask)}function C(b){const A=E[b.type];let I;if(A){const ae=xi[A];I=ly.clone(ae.uniforms)}else I=b.uniforms;return I}function B(b,A){let I;for(let ae=0,Q=g.length;ae<Q;ae++){const re=g[ae];if(re.cacheKey===A){I=re,++I.usedTimes;break}}return I===void 0&&(I=new BE(s,A,b,l),g.push(I)),I}function U(b){if(--b.usedTimes===0){const A=g.indexOf(b);g[A]=g[g.length-1],g.pop(),b.destroy()}}function O(b){h.remove(b)}function z(){h.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:C,acquireProgram:B,releaseProgram:U,releaseShaderCache:O,programs:g,dispose:z}}function WE(){let s=new WeakMap;function e(u){return s.has(u)}function n(u){let d=s.get(u);return d===void 0&&(d={},s.set(u,d)),d}function r(u){s.delete(u)}function a(u,d,h){s.get(u)[d]=h}function l(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:l}}function jE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function ng(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ig(){const s=[];let e=0;const n=[],r=[],a=[];function l(){e=0,n.length=0,r.length=0,a.length=0}function u(v,x,S,E,w,y){let _=s[e];return _===void 0?(_={id:v.id,object:v,geometry:x,material:S,groupOrder:E,renderOrder:v.renderOrder,z:w,group:y},s[e]=_):(_.id=v.id,_.object=v,_.geometry=x,_.material=S,_.groupOrder=E,_.renderOrder=v.renderOrder,_.z=w,_.group=y),e++,_}function d(v,x,S,E,w,y){const _=u(v,x,S,E,w,y);S.transmission>0?r.push(_):S.transparent===!0?a.push(_):n.push(_)}function h(v,x,S,E,w,y){const _=u(v,x,S,E,w,y);S.transmission>0?r.unshift(_):S.transparent===!0?a.unshift(_):n.unshift(_)}function m(v,x){n.length>1&&n.sort(v||jE),r.length>1&&r.sort(x||ng),a.length>1&&a.sort(x||ng)}function g(){for(let v=e,x=s.length;v<x;v++){const S=s[v];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:l,push:d,unshift:h,finish:g,sort:m}}function XE(){let s=new WeakMap;function e(r,a){const l=s.get(r);let u;return l===void 0?(u=new ig,s.set(r,[u])):a>=l.length?(u=new ig,l.push(u)):u=l[a],u}function n(){s=new WeakMap}return{get:e,dispose:n}}function qE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new Y,color:new _t};break;case"SpotLight":n={position:new Y,direction:new Y,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Y,color:new _t,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Y,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":n={color:new _t,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return s[e.id]=n,n}}}function YE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let $E=0;function KE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function ZE(s){const e=new qE,n=YE(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new Y);const a=new Y,l=new Dt,u=new Dt;function d(m){let g=0,v=0,x=0;for(let b=0;b<9;b++)r.probe[b].set(0,0,0);let S=0,E=0,w=0,y=0,_=0,D=0,L=0,C=0,B=0,U=0,O=0;m.sort(KE);for(let b=0,A=m.length;b<A;b++){const I=m[b],ae=I.color,Q=I.intensity,re=I.distance,me=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)g+=ae.r*Q,v+=ae.g*Q,x+=ae.b*Q;else if(I.isLightProbe){for(let oe=0;oe<9;oe++)r.probe[oe].addScaledVector(I.sh.coefficients[oe],Q);O++}else if(I.isDirectionalLight){const oe=e.get(I);if(oe.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ue=I.shadow,G=n.get(I);G.shadowIntensity=ue.intensity,G.shadowBias=ue.bias,G.shadowNormalBias=ue.normalBias,G.shadowRadius=ue.radius,G.shadowMapSize=ue.mapSize,r.directionalShadow[S]=G,r.directionalShadowMap[S]=me,r.directionalShadowMatrix[S]=I.shadow.matrix,D++}r.directional[S]=oe,S++}else if(I.isSpotLight){const oe=e.get(I);oe.position.setFromMatrixPosition(I.matrixWorld),oe.color.copy(ae).multiplyScalar(Q),oe.distance=re,oe.coneCos=Math.cos(I.angle),oe.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),oe.decay=I.decay,r.spot[w]=oe;const ue=I.shadow;if(I.map&&(r.spotLightMap[B]=I.map,B++,ue.updateMatrices(I),I.castShadow&&U++),r.spotLightMatrix[w]=ue.matrix,I.castShadow){const G=n.get(I);G.shadowIntensity=ue.intensity,G.shadowBias=ue.bias,G.shadowNormalBias=ue.normalBias,G.shadowRadius=ue.radius,G.shadowMapSize=ue.mapSize,r.spotShadow[w]=G,r.spotShadowMap[w]=me,C++}w++}else if(I.isRectAreaLight){const oe=e.get(I);oe.color.copy(ae).multiplyScalar(Q),oe.halfWidth.set(I.width*.5,0,0),oe.halfHeight.set(0,I.height*.5,0),r.rectArea[y]=oe,y++}else if(I.isPointLight){const oe=e.get(I);if(oe.color.copy(I.color).multiplyScalar(I.intensity),oe.distance=I.distance,oe.decay=I.decay,I.castShadow){const ue=I.shadow,G=n.get(I);G.shadowIntensity=ue.intensity,G.shadowBias=ue.bias,G.shadowNormalBias=ue.normalBias,G.shadowRadius=ue.radius,G.shadowMapSize=ue.mapSize,G.shadowCameraNear=ue.camera.near,G.shadowCameraFar=ue.camera.far,r.pointShadow[E]=G,r.pointShadowMap[E]=me,r.pointShadowMatrix[E]=I.shadow.matrix,L++}r.point[E]=oe,E++}else if(I.isHemisphereLight){const oe=e.get(I);oe.skyColor.copy(I.color).multiplyScalar(Q),oe.groundColor.copy(I.groundColor).multiplyScalar(Q),r.hemi[_]=oe,_++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=v,r.ambient[2]=x;const z=r.hash;(z.directionalLength!==S||z.pointLength!==E||z.spotLength!==w||z.rectAreaLength!==y||z.hemiLength!==_||z.numDirectionalShadows!==D||z.numPointShadows!==L||z.numSpotShadows!==C||z.numSpotMaps!==B||z.numLightProbes!==O)&&(r.directional.length=S,r.spot.length=w,r.rectArea.length=y,r.point.length=E,r.hemi.length=_,r.directionalShadow.length=D,r.directionalShadowMap.length=D,r.pointShadow.length=L,r.pointShadowMap.length=L,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=D,r.pointShadowMatrix.length=L,r.spotLightMatrix.length=C+B-U,r.spotLightMap.length=B,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=O,z.directionalLength=S,z.pointLength=E,z.spotLength=w,z.rectAreaLength=y,z.hemiLength=_,z.numDirectionalShadows=D,z.numPointShadows=L,z.numSpotShadows=C,z.numSpotMaps=B,z.numLightProbes=O,r.version=$E++)}function h(m,g){let v=0,x=0,S=0,E=0,w=0;const y=g.matrixWorldInverse;for(let _=0,D=m.length;_<D;_++){const L=m[_];if(L.isDirectionalLight){const C=r.directional[v];C.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(y),v++}else if(L.isSpotLight){const C=r.spot[S];C.position.setFromMatrixPosition(L.matrixWorld),C.position.applyMatrix4(y),C.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(y),S++}else if(L.isRectAreaLight){const C=r.rectArea[E];C.position.setFromMatrixPosition(L.matrixWorld),C.position.applyMatrix4(y),u.identity(),l.copy(L.matrixWorld),l.premultiply(y),u.extractRotation(l),C.halfWidth.set(L.width*.5,0,0),C.halfHeight.set(0,L.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),E++}else if(L.isPointLight){const C=r.point[x];C.position.setFromMatrixPosition(L.matrixWorld),C.position.applyMatrix4(y),x++}else if(L.isHemisphereLight){const C=r.hemi[w];C.direction.setFromMatrixPosition(L.matrixWorld),C.direction.transformDirection(y),w++}}}return{setup:d,setupView:h,state:r}}function rg(s){const e=new ZE(s),n=[],r=[];function a(g){m.camera=g,n.length=0,r.length=0}function l(g){n.push(g)}function u(g){r.push(g)}function d(){e.setup(n)}function h(g){e.setupView(n,g)}const m={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:d,setupLightsView:h,pushLight:l,pushShadow:u}}function QE(s){let e=new WeakMap;function n(a,l=0){const u=e.get(a);let d;return u===void 0?(d=new rg(s),e.set(a,[d])):l>=u.length?(d=new rg(s),u.push(d)):d=u[l],d}function r(){e=new WeakMap}return{get:n,dispose:r}}const JE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,eT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function tT(s,e,n){let r=new df;const a=new xt,l=new xt,u=new Lt,d=new Ty({depthPacking:mx}),h=new wy,m={},g=n.maxTextureSize,v={[Sr]:Fn,[Fn]:Sr,[yi]:yi},x=new Mr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:JE,fragmentShader:eT}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const E=new qn;E.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Wn(E,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ug;let _=this.type;this.render=function(U,O,z){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||U.length===0)return;const b=s.getRenderTarget(),A=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),ae=s.state;ae.setBlending(xr),ae.buffers.color.setClear(1,1,1,1),ae.buffers.depth.setTest(!0),ae.setScissorTest(!1);const Q=_!==zi&&this.type===zi,re=_===zi&&this.type!==zi;for(let me=0,oe=U.length;me<oe;me++){const ue=U[me],G=ue.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const ce=G.getFrameExtents();if(a.multiply(ce),l.copy(G.mapSize),(a.x>g||a.y>g)&&(a.x>g&&(l.x=Math.floor(g/ce.x),a.x=l.x*ce.x,G.mapSize.x=l.x),a.y>g&&(l.y=Math.floor(g/ce.y),a.y=l.y*ce.y,G.mapSize.y=l.y)),G.map===null||Q===!0||re===!0){const k=this.type!==zi?{minFilter:jn,magFilter:jn}:{};G.map!==null&&G.map.dispose(),G.map=new Kr(a.x,a.y,k),G.map.texture.name=ue.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const te=G.getViewportCount();for(let k=0;k<te;k++){const Z=G.getViewport(k);u.set(l.x*Z.x,l.y*Z.y,l.x*Z.z,l.y*Z.w),ae.viewport(u),G.updateMatrices(ue,k),r=G.getFrustum(),C(O,z,G.camera,ue,this.type)}G.isPointLightShadow!==!0&&this.type===zi&&D(G,z),G.needsUpdate=!1}_=this.type,y.needsUpdate=!1,s.setRenderTarget(b,A,I)};function D(U,O){const z=e.update(w);x.defines.VSM_SAMPLES!==U.blurSamples&&(x.defines.VSM_SAMPLES=U.blurSamples,S.defines.VSM_SAMPLES=U.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new Kr(a.x,a.y)),x.uniforms.shadow_pass.value=U.map.texture,x.uniforms.resolution.value=U.mapSize,x.uniforms.radius.value=U.radius,s.setRenderTarget(U.mapPass),s.clear(),s.renderBufferDirect(O,null,z,x,w,null),S.uniforms.shadow_pass.value=U.mapPass.texture,S.uniforms.resolution.value=U.mapSize,S.uniforms.radius.value=U.radius,s.setRenderTarget(U.map),s.clear(),s.renderBufferDirect(O,null,z,S,w,null)}function L(U,O,z,b){let A=null;const I=z.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(I!==void 0)A=I;else if(A=z.isPointLight===!0?h:d,s.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const ae=A.uuid,Q=O.uuid;let re=m[ae];re===void 0&&(re={},m[ae]=re);let me=re[Q];me===void 0&&(me=A.clone(),re[Q]=me,O.addEventListener("dispose",B)),A=me}if(A.visible=O.visible,A.wireframe=O.wireframe,b===zi?A.side=O.shadowSide!==null?O.shadowSide:O.side:A.side=O.shadowSide!==null?O.shadowSide:v[O.side],A.alphaMap=O.alphaMap,A.alphaTest=O.alphaTest,A.map=O.map,A.clipShadows=O.clipShadows,A.clippingPlanes=O.clippingPlanes,A.clipIntersection=O.clipIntersection,A.displacementMap=O.displacementMap,A.displacementScale=O.displacementScale,A.displacementBias=O.displacementBias,A.wireframeLinewidth=O.wireframeLinewidth,A.linewidth=O.linewidth,z.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const ae=s.properties.get(A);ae.light=z}return A}function C(U,O,z,b,A){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&A===zi)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,U.matrixWorld);const Q=e.update(U),re=U.material;if(Array.isArray(re)){const me=Q.groups;for(let oe=0,ue=me.length;oe<ue;oe++){const G=me[oe],ce=re[G.materialIndex];if(ce&&ce.visible){const te=L(U,ce,b,A);U.onBeforeShadow(s,U,O,z,Q,te,G),s.renderBufferDirect(z,null,Q,te,U,G),U.onAfterShadow(s,U,O,z,Q,te,G)}}}else if(re.visible){const me=L(U,re,b,A);U.onBeforeShadow(s,U,O,z,Q,me,null),s.renderBufferDirect(z,null,Q,me,U,null),U.onAfterShadow(s,U,O,z,Q,me,null)}}const ae=U.children;for(let Q=0,re=ae.length;Q<re;Q++)C(ae[Q],O,z,b,A)}function B(U){U.target.removeEventListener("dispose",B);for(const z in m){const b=m[z],A=U.target.uuid;A in b&&(b[A].dispose(),delete b[A])}}}const nT={[cd]:ud,[dd]:pd,[fd]:md,[js]:hd,[ud]:cd,[pd]:dd,[md]:fd,[hd]:js};function iT(s,e){function n(){let j=!1;const Ce=new Lt;let le=null;const ge=new Lt(0,0,0,0);return{setMask:function(Ue){le!==Ue&&!j&&(s.colorMask(Ue,Ue,Ue,Ue),le=Ue)},setLocked:function(Ue){j=Ue},setClear:function(Ue,Ie,lt,Ot,Zt){Zt===!0&&(Ue*=Ot,Ie*=Ot,lt*=Ot),Ce.set(Ue,Ie,lt,Ot),ge.equals(Ce)===!1&&(s.clearColor(Ue,Ie,lt,Ot),ge.copy(Ce))},reset:function(){j=!1,le=null,ge.set(-1,0,0,0)}}}function r(){let j=!1,Ce=!1,le=null,ge=null,Ue=null;return{setReversed:function(Ie){if(Ce!==Ie){const lt=e.get("EXT_clip_control");Ce?lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.ZERO_TO_ONE_EXT):lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.NEGATIVE_ONE_TO_ONE_EXT);const Ot=Ue;Ue=null,this.setClear(Ot)}Ce=Ie},getReversed:function(){return Ce},setTest:function(Ie){Ie?xe(s.DEPTH_TEST):we(s.DEPTH_TEST)},setMask:function(Ie){le!==Ie&&!j&&(s.depthMask(Ie),le=Ie)},setFunc:function(Ie){if(Ce&&(Ie=nT[Ie]),ge!==Ie){switch(Ie){case cd:s.depthFunc(s.NEVER);break;case ud:s.depthFunc(s.ALWAYS);break;case dd:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case fd:s.depthFunc(s.EQUAL);break;case hd:s.depthFunc(s.GEQUAL);break;case pd:s.depthFunc(s.GREATER);break;case md:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ge=Ie}},setLocked:function(Ie){j=Ie},setClear:function(Ie){Ue!==Ie&&(Ce&&(Ie=1-Ie),s.clearDepth(Ie),Ue=Ie)},reset:function(){j=!1,le=null,ge=null,Ue=null,Ce=!1}}}function a(){let j=!1,Ce=null,le=null,ge=null,Ue=null,Ie=null,lt=null,Ot=null,Zt=null;return{setTest:function(Tt){j||(Tt?xe(s.STENCIL_TEST):we(s.STENCIL_TEST))},setMask:function(Tt){Ce!==Tt&&!j&&(s.stencilMask(Tt),Ce=Tt)},setFunc:function(Tt,bn,Mn){(le!==Tt||ge!==bn||Ue!==Mn)&&(s.stencilFunc(Tt,bn,Mn),le=Tt,ge=bn,Ue=Mn)},setOp:function(Tt,bn,Mn){(Ie!==Tt||lt!==bn||Ot!==Mn)&&(s.stencilOp(Tt,bn,Mn),Ie=Tt,lt=bn,Ot=Mn)},setLocked:function(Tt){j=Tt},setClear:function(Tt){Zt!==Tt&&(s.clearStencil(Tt),Zt=Tt)},reset:function(){j=!1,Ce=null,le=null,ge=null,Ue=null,Ie=null,lt=null,Ot=null,Zt=null}}}const l=new n,u=new r,d=new a,h=new WeakMap,m=new WeakMap;let g={},v={},x=new WeakMap,S=[],E=null,w=!1,y=null,_=null,D=null,L=null,C=null,B=null,U=null,O=new _t(0,0,0),z=0,b=!1,A=null,I=null,ae=null,Q=null,re=null;const me=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let oe=!1,ue=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(G)[1]),oe=ue>=1):G.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),oe=ue>=2);let ce=null,te={};const k=s.getParameter(s.SCISSOR_BOX),Z=s.getParameter(s.VIEWPORT),Ne=new Lt().fromArray(k),J=new Lt().fromArray(Z);function de(j,Ce,le,ge){const Ue=new Uint8Array(4),Ie=s.createTexture();s.bindTexture(j,Ie),s.texParameteri(j,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(j,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let lt=0;lt<le;lt++)j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,ge,0,s.RGBA,s.UNSIGNED_BYTE,Ue):s.texImage2D(Ce+lt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ue);return Ie}const Se={};Se[s.TEXTURE_2D]=de(s.TEXTURE_2D,s.TEXTURE_2D,1),Se[s.TEXTURE_CUBE_MAP]=de(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[s.TEXTURE_2D_ARRAY]=de(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Se[s.TEXTURE_3D]=de(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),d.setClear(0),xe(s.DEPTH_TEST),u.setFunc(js),ft(!1),He(qp),xe(s.CULL_FACE),H(xr);function xe(j){g[j]!==!0&&(s.enable(j),g[j]=!0)}function we(j){g[j]!==!1&&(s.disable(j),g[j]=!1)}function $e(j,Ce){return v[j]!==Ce?(s.bindFramebuffer(j,Ce),v[j]=Ce,j===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=Ce),j===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Xe(j,Ce){let le=S,ge=!1;if(j){le=x.get(Ce),le===void 0&&(le=[],x.set(Ce,le));const Ue=j.textures;if(le.length!==Ue.length||le[0]!==s.COLOR_ATTACHMENT0){for(let Ie=0,lt=Ue.length;Ie<lt;Ie++)le[Ie]=s.COLOR_ATTACHMENT0+Ie;le.length=Ue.length,ge=!0}}else le[0]!==s.BACK&&(le[0]=s.BACK,ge=!0);ge&&s.drawBuffers(le)}function yt(j){return E!==j?(s.useProgram(j),E=j,!0):!1}const bt={[jr]:s.FUNC_ADD,[Vv]:s.FUNC_SUBTRACT,[Gv]:s.FUNC_REVERSE_SUBTRACT};bt[Wv]=s.MIN,bt[jv]=s.MAX;const ct={[Xv]:s.ZERO,[qv]:s.ONE,[Yv]:s.SRC_COLOR,[ad]:s.SRC_ALPHA,[ex]:s.SRC_ALPHA_SATURATE,[Qv]:s.DST_COLOR,[Kv]:s.DST_ALPHA,[$v]:s.ONE_MINUS_SRC_COLOR,[ld]:s.ONE_MINUS_SRC_ALPHA,[Jv]:s.ONE_MINUS_DST_COLOR,[Zv]:s.ONE_MINUS_DST_ALPHA,[tx]:s.CONSTANT_COLOR,[nx]:s.ONE_MINUS_CONSTANT_COLOR,[ix]:s.CONSTANT_ALPHA,[rx]:s.ONE_MINUS_CONSTANT_ALPHA};function H(j,Ce,le,ge,Ue,Ie,lt,Ot,Zt,Tt){if(j===xr){w===!0&&(we(s.BLEND),w=!1);return}if(w===!1&&(xe(s.BLEND),w=!0),j!==Hv){if(j!==y||Tt!==b){if((_!==jr||C!==jr)&&(s.blendEquation(s.FUNC_ADD),_=jr,C=jr),Tt)switch(j){case Vs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ol:s.blendFunc(s.ONE,s.ONE);break;case Yp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case $p:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case Vs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ol:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Yp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case $p:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}D=null,L=null,B=null,U=null,O.set(0,0,0),z=0,y=j,b=Tt}return}Ue=Ue||Ce,Ie=Ie||le,lt=lt||ge,(Ce!==_||Ue!==C)&&(s.blendEquationSeparate(bt[Ce],bt[Ue]),_=Ce,C=Ue),(le!==D||ge!==L||Ie!==B||lt!==U)&&(s.blendFuncSeparate(ct[le],ct[ge],ct[Ie],ct[lt]),D=le,L=ge,B=Ie,U=lt),(Ot.equals(O)===!1||Zt!==z)&&(s.blendColor(Ot.r,Ot.g,Ot.b,Zt),O.copy(Ot),z=Zt),y=j,b=!1}function nn(j,Ce){j.side===yi?we(s.CULL_FACE):xe(s.CULL_FACE);let le=j.side===Fn;Ce&&(le=!le),ft(le),j.blending===Vs&&j.transparent===!1?H(xr):H(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),u.setFunc(j.depthFunc),u.setTest(j.depthTest),u.setMask(j.depthWrite),l.setMask(j.colorWrite);const ge=j.stencilWrite;d.setTest(ge),ge&&(d.setMask(j.stencilWriteMask),d.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),d.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),ht(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?xe(s.SAMPLE_ALPHA_TO_COVERAGE):we(s.SAMPLE_ALPHA_TO_COVERAGE)}function ft(j){A!==j&&(j?s.frontFace(s.CW):s.frontFace(s.CCW),A=j)}function He(j){j!==kv?(xe(s.CULL_FACE),j!==I&&(j===qp?s.cullFace(s.BACK):j===Bv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):we(s.CULL_FACE),I=j}function Ae(j){j!==ae&&(oe&&s.lineWidth(j),ae=j)}function ht(j,Ce,le){j?(xe(s.POLYGON_OFFSET_FILL),(Q!==Ce||re!==le)&&(s.polygonOffset(Ce,le),Q=Ce,re=le)):we(s.POLYGON_OFFSET_FILL)}function Fe(j){j?xe(s.SCISSOR_TEST):we(s.SCISSOR_TEST)}function N(j){j===void 0&&(j=s.TEXTURE0+me-1),ce!==j&&(s.activeTexture(j),ce=j)}function T(j,Ce,le){le===void 0&&(ce===null?le=s.TEXTURE0+me-1:le=ce);let ge=te[le];ge===void 0&&(ge={type:void 0,texture:void 0},te[le]=ge),(ge.type!==j||ge.texture!==Ce)&&(ce!==le&&(s.activeTexture(le),ce=le),s.bindTexture(j,Ce||Se[j]),ge.type=j,ge.texture=Ce)}function ne(){const j=te[ce];j!==void 0&&j.type!==void 0&&(s.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function fe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function he(){try{s.compressedTexImage3D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function pe(){try{s.texSubImage2D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ge(){try{s.texSubImage3D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function be(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Re(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function tt(){try{s.texStorage2D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function _e(){try{s.texStorage3D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Pe(){try{s.texImage2D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ye(){try{s.texImage3D.apply(s,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Qe(j){Ne.equals(j)===!1&&(s.scissor(j.x,j.y,j.z,j.w),Ne.copy(j))}function Oe(j){J.equals(j)===!1&&(s.viewport(j.x,j.y,j.z,j.w),J.copy(j))}function at(j,Ce){let le=m.get(Ce);le===void 0&&(le=new WeakMap,m.set(Ce,le));let ge=le.get(j);ge===void 0&&(ge=s.getUniformBlockIndex(Ce,j.name),le.set(j,ge))}function it(j,Ce){const ge=m.get(Ce).get(j);h.get(Ce)!==ge&&(s.uniformBlockBinding(Ce,ge,j.__bindingPointIndex),h.set(Ce,ge))}function Mt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),g={},ce=null,te={},v={},x=new WeakMap,S=[],E=null,w=!1,y=null,_=null,D=null,L=null,C=null,B=null,U=null,O=new _t(0,0,0),z=0,b=!1,A=null,I=null,ae=null,Q=null,re=null,Ne.set(0,0,s.canvas.width,s.canvas.height),J.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),d.reset()}return{buffers:{color:l,depth:u,stencil:d},enable:xe,disable:we,bindFramebuffer:$e,drawBuffers:Xe,useProgram:yt,setBlending:H,setMaterial:nn,setFlipSided:ft,setCullFace:He,setLineWidth:Ae,setPolygonOffset:ht,setScissorTest:Fe,activeTexture:N,bindTexture:T,unbindTexture:ne,compressedTexImage2D:fe,compressedTexImage3D:he,texImage2D:Pe,texImage3D:Ye,updateUBOMapping:at,uniformBlockBinding:it,texStorage2D:tt,texStorage3D:_e,texSubImage2D:pe,texSubImage3D:Ge,compressedTexSubImage2D:be,compressedTexSubImage3D:Re,scissor:Qe,viewport:Oe,reset:Mt}}function rT(s,e,n,r,a,l,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new xt,g=new WeakMap;let v;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,T){return S?new OffscreenCanvas(N,T):zl("canvas")}function w(N,T,ne){let fe=1;const he=Fe(N);if((he.width>ne||he.height>ne)&&(fe=ne/Math.max(he.width,he.height)),fe<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const pe=Math.floor(fe*he.width),Ge=Math.floor(fe*he.height);v===void 0&&(v=E(pe,Ge));const be=T?E(pe,Ge):v;return be.width=pe,be.height=Ge,be.getContext("2d").drawImage(N,0,0,pe,Ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+pe+"x"+Ge+")."),be}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),N;return N}function y(N){return N.generateMipmaps}function _(N){s.generateMipmap(N)}function D(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function L(N,T,ne,fe,he=!1){if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let pe=T;if(T===s.RED&&(ne===s.FLOAT&&(pe=s.R32F),ne===s.HALF_FLOAT&&(pe=s.R16F),ne===s.UNSIGNED_BYTE&&(pe=s.R8)),T===s.RED_INTEGER&&(ne===s.UNSIGNED_BYTE&&(pe=s.R8UI),ne===s.UNSIGNED_SHORT&&(pe=s.R16UI),ne===s.UNSIGNED_INT&&(pe=s.R32UI),ne===s.BYTE&&(pe=s.R8I),ne===s.SHORT&&(pe=s.R16I),ne===s.INT&&(pe=s.R32I)),T===s.RG&&(ne===s.FLOAT&&(pe=s.RG32F),ne===s.HALF_FLOAT&&(pe=s.RG16F),ne===s.UNSIGNED_BYTE&&(pe=s.RG8)),T===s.RG_INTEGER&&(ne===s.UNSIGNED_BYTE&&(pe=s.RG8UI),ne===s.UNSIGNED_SHORT&&(pe=s.RG16UI),ne===s.UNSIGNED_INT&&(pe=s.RG32UI),ne===s.BYTE&&(pe=s.RG8I),ne===s.SHORT&&(pe=s.RG16I),ne===s.INT&&(pe=s.RG32I)),T===s.RGB_INTEGER&&(ne===s.UNSIGNED_BYTE&&(pe=s.RGB8UI),ne===s.UNSIGNED_SHORT&&(pe=s.RGB16UI),ne===s.UNSIGNED_INT&&(pe=s.RGB32UI),ne===s.BYTE&&(pe=s.RGB8I),ne===s.SHORT&&(pe=s.RGB16I),ne===s.INT&&(pe=s.RGB32I)),T===s.RGBA_INTEGER&&(ne===s.UNSIGNED_BYTE&&(pe=s.RGBA8UI),ne===s.UNSIGNED_SHORT&&(pe=s.RGBA16UI),ne===s.UNSIGNED_INT&&(pe=s.RGBA32UI),ne===s.BYTE&&(pe=s.RGBA8I),ne===s.SHORT&&(pe=s.RGBA16I),ne===s.INT&&(pe=s.RGBA32I)),T===s.RGB&&ne===s.UNSIGNED_INT_5_9_9_9_REV&&(pe=s.RGB9_E5),T===s.RGBA){const Ge=he?kl:Rt.getTransfer(fe);ne===s.FLOAT&&(pe=s.RGBA32F),ne===s.HALF_FLOAT&&(pe=s.RGBA16F),ne===s.UNSIGNED_BYTE&&(pe=Ge===Nt?s.SRGB8_ALPHA8:s.RGBA8),ne===s.UNSIGNED_SHORT_4_4_4_4&&(pe=s.RGBA4),ne===s.UNSIGNED_SHORT_5_5_5_1&&(pe=s.RGB5_A1)}return(pe===s.R16F||pe===s.R32F||pe===s.RG16F||pe===s.RG32F||pe===s.RGBA16F||pe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function C(N,T){let ne;return N?T===null||T===$r||T===Ys?ne=s.DEPTH24_STENCIL8:T===Mi?ne=s.DEPTH32F_STENCIL8:T===Xo&&(ne=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===$r||T===Ys?ne=s.DEPTH_COMPONENT24:T===Mi?ne=s.DEPTH_COMPONENT32F:T===Xo&&(ne=s.DEPTH_COMPONENT16),ne}function B(N,T){return y(N)===!0||N.isFramebufferTexture&&N.minFilter!==jn&&N.minFilter!==Si?Math.log2(Math.max(T.width,T.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?T.mipmaps.length:1}function U(N){const T=N.target;T.removeEventListener("dispose",U),z(T),T.isVideoTexture&&g.delete(T)}function O(N){const T=N.target;T.removeEventListener("dispose",O),A(T)}function z(N){const T=r.get(N);if(T.__webglInit===void 0)return;const ne=N.source,fe=x.get(ne);if(fe){const he=fe[T.__cacheKey];he.usedTimes--,he.usedTimes===0&&b(N),Object.keys(fe).length===0&&x.delete(ne)}r.remove(N)}function b(N){const T=r.get(N);s.deleteTexture(T.__webglTexture);const ne=N.source,fe=x.get(ne);delete fe[T.__cacheKey],u.memory.textures--}function A(N){const T=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(T.__webglFramebuffer[fe]))for(let he=0;he<T.__webglFramebuffer[fe].length;he++)s.deleteFramebuffer(T.__webglFramebuffer[fe][he]);else s.deleteFramebuffer(T.__webglFramebuffer[fe]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[fe])}else{if(Array.isArray(T.__webglFramebuffer))for(let fe=0;fe<T.__webglFramebuffer.length;fe++)s.deleteFramebuffer(T.__webglFramebuffer[fe]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let fe=0;fe<T.__webglColorRenderbuffer.length;fe++)T.__webglColorRenderbuffer[fe]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[fe]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const ne=N.textures;for(let fe=0,he=ne.length;fe<he;fe++){const pe=r.get(ne[fe]);pe.__webglTexture&&(s.deleteTexture(pe.__webglTexture),u.memory.textures--),r.remove(ne[fe])}r.remove(N)}let I=0;function ae(){I=0}function Q(){const N=I;return N>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+a.maxTextures),I+=1,N}function re(N){const T=[];return T.push(N.wrapS),T.push(N.wrapT),T.push(N.wrapR||0),T.push(N.magFilter),T.push(N.minFilter),T.push(N.anisotropy),T.push(N.internalFormat),T.push(N.format),T.push(N.type),T.push(N.generateMipmaps),T.push(N.premultiplyAlpha),T.push(N.flipY),T.push(N.unpackAlignment),T.push(N.colorSpace),T.join()}function me(N,T){const ne=r.get(N);if(N.isVideoTexture&&Ae(N),N.isRenderTargetTexture===!1&&N.version>0&&ne.__version!==N.version){const fe=N.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(ne,N,T);return}}n.bindTexture(s.TEXTURE_2D,ne.__webglTexture,s.TEXTURE0+T)}function oe(N,T){const ne=r.get(N);if(N.version>0&&ne.__version!==N.version){J(ne,N,T);return}n.bindTexture(s.TEXTURE_2D_ARRAY,ne.__webglTexture,s.TEXTURE0+T)}function ue(N,T){const ne=r.get(N);if(N.version>0&&ne.__version!==N.version){J(ne,N,T);return}n.bindTexture(s.TEXTURE_3D,ne.__webglTexture,s.TEXTURE0+T)}function G(N,T){const ne=r.get(N);if(N.version>0&&ne.__version!==N.version){de(ne,N,T);return}n.bindTexture(s.TEXTURE_CUBE_MAP,ne.__webglTexture,s.TEXTURE0+T)}const ce={[vd]:s.REPEAT,[qr]:s.CLAMP_TO_EDGE,[xd]:s.MIRRORED_REPEAT},te={[jn]:s.NEAREST,[hx]:s.NEAREST_MIPMAP_NEAREST,[sl]:s.NEAREST_MIPMAP_LINEAR,[Si]:s.LINEAR,[Pu]:s.LINEAR_MIPMAP_NEAREST,[Yr]:s.LINEAR_MIPMAP_LINEAR},k={[_x]:s.NEVER,[Ex]:s.ALWAYS,[vx]:s.LESS,[Tg]:s.LEQUAL,[xx]:s.EQUAL,[Mx]:s.GEQUAL,[yx]:s.GREATER,[Sx]:s.NOTEQUAL};function Z(N,T){if(T.type===Mi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Si||T.magFilter===Pu||T.magFilter===sl||T.magFilter===Yr||T.minFilter===Si||T.minFilter===Pu||T.minFilter===sl||T.minFilter===Yr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,ce[T.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,ce[T.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,ce[T.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,te[T.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,te[T.minFilter]),T.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,k[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===jn||T.minFilter!==sl&&T.minFilter!==Yr||T.type===Mi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const ne=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,a.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function Ne(N,T){let ne=!1;N.__webglInit===void 0&&(N.__webglInit=!0,T.addEventListener("dispose",U));const fe=T.source;let he=x.get(fe);he===void 0&&(he={},x.set(fe,he));const pe=re(T);if(pe!==N.__cacheKey){he[pe]===void 0&&(he[pe]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,ne=!0),he[pe].usedTimes++;const Ge=he[N.__cacheKey];Ge!==void 0&&(he[N.__cacheKey].usedTimes--,Ge.usedTimes===0&&b(T)),N.__cacheKey=pe,N.__webglTexture=he[pe].texture}return ne}function J(N,T,ne){let fe=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(fe=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(fe=s.TEXTURE_3D);const he=Ne(N,T),pe=T.source;n.bindTexture(fe,N.__webglTexture,s.TEXTURE0+ne);const Ge=r.get(pe);if(pe.version!==Ge.__version||he===!0){n.activeTexture(s.TEXTURE0+ne);const be=Rt.getPrimaries(Rt.workingColorSpace),Re=T.colorSpace===vr?null:Rt.getPrimaries(T.colorSpace),tt=T.colorSpace===vr||be===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let _e=w(T.image,!1,a.maxTextureSize);_e=ht(T,_e);const Pe=l.convert(T.format,T.colorSpace),Ye=l.convert(T.type);let Qe=L(T.internalFormat,Pe,Ye,T.colorSpace,T.isVideoTexture);Z(fe,T);let Oe;const at=T.mipmaps,it=T.isVideoTexture!==!0,Mt=Ge.__version===void 0||he===!0,j=pe.dataReady,Ce=B(T,_e);if(T.isDepthTexture)Qe=C(T.format===$s,T.type),Mt&&(it?n.texStorage2D(s.TEXTURE_2D,1,Qe,_e.width,_e.height):n.texImage2D(s.TEXTURE_2D,0,Qe,_e.width,_e.height,0,Pe,Ye,null));else if(T.isDataTexture)if(at.length>0){it&&Mt&&n.texStorage2D(s.TEXTURE_2D,Ce,Qe,at[0].width,at[0].height);for(let le=0,ge=at.length;le<ge;le++)Oe=at[le],it?j&&n.texSubImage2D(s.TEXTURE_2D,le,0,0,Oe.width,Oe.height,Pe,Ye,Oe.data):n.texImage2D(s.TEXTURE_2D,le,Qe,Oe.width,Oe.height,0,Pe,Ye,Oe.data);T.generateMipmaps=!1}else it?(Mt&&n.texStorage2D(s.TEXTURE_2D,Ce,Qe,_e.width,_e.height),j&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,_e.width,_e.height,Pe,Ye,_e.data)):n.texImage2D(s.TEXTURE_2D,0,Qe,_e.width,_e.height,0,Pe,Ye,_e.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){it&&Mt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Qe,at[0].width,at[0].height,_e.depth);for(let le=0,ge=at.length;le<ge;le++)if(Oe=at[le],T.format!==fi)if(Pe!==null)if(it){if(j)if(T.layerUpdates.size>0){const Ue=Im(Oe.width,Oe.height,T.format,T.type);for(const Ie of T.layerUpdates){const lt=Oe.data.subarray(Ie*Ue/Oe.data.BYTES_PER_ELEMENT,(Ie+1)*Ue/Oe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,Ie,Oe.width,Oe.height,1,Pe,lt)}T.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,Oe.width,Oe.height,_e.depth,Pe,Oe.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,Qe,Oe.width,Oe.height,_e.depth,0,Oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?j&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,Oe.width,Oe.height,_e.depth,Pe,Ye,Oe.data):n.texImage3D(s.TEXTURE_2D_ARRAY,le,Qe,Oe.width,Oe.height,_e.depth,0,Pe,Ye,Oe.data)}else{it&&Mt&&n.texStorage2D(s.TEXTURE_2D,Ce,Qe,at[0].width,at[0].height);for(let le=0,ge=at.length;le<ge;le++)Oe=at[le],T.format!==fi?Pe!==null?it?j&&n.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,Oe.width,Oe.height,Pe,Oe.data):n.compressedTexImage2D(s.TEXTURE_2D,le,Qe,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?j&&n.texSubImage2D(s.TEXTURE_2D,le,0,0,Oe.width,Oe.height,Pe,Ye,Oe.data):n.texImage2D(s.TEXTURE_2D,le,Qe,Oe.width,Oe.height,0,Pe,Ye,Oe.data)}else if(T.isDataArrayTexture)if(it){if(Mt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Qe,_e.width,_e.height,_e.depth),j)if(T.layerUpdates.size>0){const le=Im(_e.width,_e.height,T.format,T.type);for(const ge of T.layerUpdates){const Ue=_e.data.subarray(ge*le/_e.data.BYTES_PER_ELEMENT,(ge+1)*le/_e.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ge,_e.width,_e.height,1,Pe,Ye,Ue)}T.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,Pe,Ye,_e.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,Qe,_e.width,_e.height,_e.depth,0,Pe,Ye,_e.data);else if(T.isData3DTexture)it?(Mt&&n.texStorage3D(s.TEXTURE_3D,Ce,Qe,_e.width,_e.height,_e.depth),j&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,Pe,Ye,_e.data)):n.texImage3D(s.TEXTURE_3D,0,Qe,_e.width,_e.height,_e.depth,0,Pe,Ye,_e.data);else if(T.isFramebufferTexture){if(Mt)if(it)n.texStorage2D(s.TEXTURE_2D,Ce,Qe,_e.width,_e.height);else{let le=_e.width,ge=_e.height;for(let Ue=0;Ue<Ce;Ue++)n.texImage2D(s.TEXTURE_2D,Ue,Qe,le,ge,0,Pe,Ye,null),le>>=1,ge>>=1}}else if(at.length>0){if(it&&Mt){const le=Fe(at[0]);n.texStorage2D(s.TEXTURE_2D,Ce,Qe,le.width,le.height)}for(let le=0,ge=at.length;le<ge;le++)Oe=at[le],it?j&&n.texSubImage2D(s.TEXTURE_2D,le,0,0,Pe,Ye,Oe):n.texImage2D(s.TEXTURE_2D,le,Qe,Pe,Ye,Oe);T.generateMipmaps=!1}else if(it){if(Mt){const le=Fe(_e);n.texStorage2D(s.TEXTURE_2D,Ce,Qe,le.width,le.height)}j&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,Pe,Ye,_e)}else n.texImage2D(s.TEXTURE_2D,0,Qe,Pe,Ye,_e);y(T)&&_(fe),Ge.__version=pe.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function de(N,T,ne){if(T.image.length!==6)return;const fe=Ne(N,T),he=T.source;n.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+ne);const pe=r.get(he);if(he.version!==pe.__version||fe===!0){n.activeTexture(s.TEXTURE0+ne);const Ge=Rt.getPrimaries(Rt.workingColorSpace),be=T.colorSpace===vr?null:Rt.getPrimaries(T.colorSpace),Re=T.colorSpace===vr||Ge===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const tt=T.isCompressedTexture||T.image[0].isCompressedTexture,_e=T.image[0]&&T.image[0].isDataTexture,Pe=[];for(let ge=0;ge<6;ge++)!tt&&!_e?Pe[ge]=w(T.image[ge],!0,a.maxCubemapSize):Pe[ge]=_e?T.image[ge].image:T.image[ge],Pe[ge]=ht(T,Pe[ge]);const Ye=Pe[0],Qe=l.convert(T.format,T.colorSpace),Oe=l.convert(T.type),at=L(T.internalFormat,Qe,Oe,T.colorSpace),it=T.isVideoTexture!==!0,Mt=pe.__version===void 0||fe===!0,j=he.dataReady;let Ce=B(T,Ye);Z(s.TEXTURE_CUBE_MAP,T);let le;if(tt){it&&Mt&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,at,Ye.width,Ye.height);for(let ge=0;ge<6;ge++){le=Pe[ge].mipmaps;for(let Ue=0;Ue<le.length;Ue++){const Ie=le[Ue];T.format!==fi?Qe!==null?it?j&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue,0,0,Ie.width,Ie.height,Qe,Ie.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue,at,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?j&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue,0,0,Ie.width,Ie.height,Qe,Oe,Ie.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue,at,Ie.width,Ie.height,0,Qe,Oe,Ie.data)}}}else{if(le=T.mipmaps,it&&Mt){le.length>0&&Ce++;const ge=Fe(Pe[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,at,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(_e){it?j&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Pe[ge].width,Pe[ge].height,Qe,Oe,Pe[ge].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,at,Pe[ge].width,Pe[ge].height,0,Qe,Oe,Pe[ge].data);for(let Ue=0;Ue<le.length;Ue++){const lt=le[Ue].image[ge].image;it?j&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue+1,0,0,lt.width,lt.height,Qe,Oe,lt.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue+1,at,lt.width,lt.height,0,Qe,Oe,lt.data)}}else{it?j&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Qe,Oe,Pe[ge]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,at,Qe,Oe,Pe[ge]);for(let Ue=0;Ue<le.length;Ue++){const Ie=le[Ue];it?j&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue+1,0,0,Qe,Oe,Ie.image[ge]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ue+1,at,Qe,Oe,Ie.image[ge])}}}y(T)&&_(s.TEXTURE_CUBE_MAP),pe.__version=he.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function Se(N,T,ne,fe,he,pe){const Ge=l.convert(ne.format,ne.colorSpace),be=l.convert(ne.type),Re=L(ne.internalFormat,Ge,be,ne.colorSpace),tt=r.get(T),_e=r.get(ne);if(_e.__renderTarget=T,!tt.__hasExternalTextures){const Pe=Math.max(1,T.width>>pe),Ye=Math.max(1,T.height>>pe);he===s.TEXTURE_3D||he===s.TEXTURE_2D_ARRAY?n.texImage3D(he,pe,Re,Pe,Ye,T.depth,0,Ge,be,null):n.texImage2D(he,pe,Re,Pe,Ye,0,Ge,be,null)}n.bindFramebuffer(s.FRAMEBUFFER,N),He(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,fe,he,_e.__webglTexture,0,ft(T)):(he===s.TEXTURE_2D||he>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,fe,he,_e.__webglTexture,pe),n.bindFramebuffer(s.FRAMEBUFFER,null)}function xe(N,T,ne){if(s.bindRenderbuffer(s.RENDERBUFFER,N),T.depthBuffer){const fe=T.depthTexture,he=fe&&fe.isDepthTexture?fe.type:null,pe=C(T.stencilBuffer,he),Ge=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=ft(T);He(T)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,pe,T.width,T.height):ne?s.renderbufferStorageMultisample(s.RENDERBUFFER,be,pe,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,pe,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ge,s.RENDERBUFFER,N)}else{const fe=T.textures;for(let he=0;he<fe.length;he++){const pe=fe[he],Ge=l.convert(pe.format,pe.colorSpace),be=l.convert(pe.type),Re=L(pe.internalFormat,Ge,be,pe.colorSpace),tt=ft(T);ne&&He(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,Re,T.width,T.height):He(T)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,Re,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Re,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function we(N,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,N),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const fe=r.get(T.depthTexture);fe.__renderTarget=T,(!fe.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),me(T.depthTexture,0);const he=fe.__webglTexture,pe=ft(T);if(T.depthTexture.format===Gs)He(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,he,0,pe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,he,0);else if(T.depthTexture.format===$s)He(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,he,0,pe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function $e(N){const T=r.get(N),ne=N.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==N.depthTexture){const fe=N.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),fe){const he=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,fe.removeEventListener("dispose",he)};fe.addEventListener("dispose",he),T.__depthDisposeCallback=he}T.__boundDepthTexture=fe}if(N.depthTexture&&!T.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");we(T.__webglFramebuffer,N)}else if(ne){T.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(n.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[fe]),T.__webglDepthbuffer[fe]===void 0)T.__webglDepthbuffer[fe]=s.createRenderbuffer(),xe(T.__webglDepthbuffer[fe],N,!1);else{const he=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=T.__webglDepthbuffer[fe];s.bindRenderbuffer(s.RENDERBUFFER,pe),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,pe)}}else if(n.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),xe(T.__webglDepthbuffer,N,!1);else{const fe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,he),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,he)}n.bindFramebuffer(s.FRAMEBUFFER,null)}function Xe(N,T,ne){const fe=r.get(N);T!==void 0&&Se(fe.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ne!==void 0&&$e(N)}function yt(N){const T=N.texture,ne=r.get(N),fe=r.get(T);N.addEventListener("dispose",O);const he=N.textures,pe=N.isWebGLCubeRenderTarget===!0,Ge=he.length>1;if(Ge||(fe.__webglTexture===void 0&&(fe.__webglTexture=s.createTexture()),fe.__version=T.version,u.memory.textures++),pe){ne.__webglFramebuffer=[];for(let be=0;be<6;be++)if(T.mipmaps&&T.mipmaps.length>0){ne.__webglFramebuffer[be]=[];for(let Re=0;Re<T.mipmaps.length;Re++)ne.__webglFramebuffer[be][Re]=s.createFramebuffer()}else ne.__webglFramebuffer[be]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){ne.__webglFramebuffer=[];for(let be=0;be<T.mipmaps.length;be++)ne.__webglFramebuffer[be]=s.createFramebuffer()}else ne.__webglFramebuffer=s.createFramebuffer();if(Ge)for(let be=0,Re=he.length;be<Re;be++){const tt=r.get(he[be]);tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture(),u.memory.textures++)}if(N.samples>0&&He(N)===!1){ne.__webglMultisampledFramebuffer=s.createFramebuffer(),ne.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let be=0;be<he.length;be++){const Re=he[be];ne.__webglColorRenderbuffer[be]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ne.__webglColorRenderbuffer[be]);const tt=l.convert(Re.format,Re.colorSpace),_e=l.convert(Re.type),Pe=L(Re.internalFormat,tt,_e,Re.colorSpace,N.isXRRenderTarget===!0),Ye=ft(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye,Pe,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,ne.__webglColorRenderbuffer[be])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(ne.__webglDepthRenderbuffer=s.createRenderbuffer(),xe(ne.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(pe){n.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture),Z(s.TEXTURE_CUBE_MAP,T);for(let be=0;be<6;be++)if(T.mipmaps&&T.mipmaps.length>0)for(let Re=0;Re<T.mipmaps.length;Re++)Se(ne.__webglFramebuffer[be][Re],N,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Re);else Se(ne.__webglFramebuffer[be],N,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0);y(T)&&_(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ge){for(let be=0,Re=he.length;be<Re;be++){const tt=he[be],_e=r.get(tt);n.bindTexture(s.TEXTURE_2D,_e.__webglTexture),Z(s.TEXTURE_2D,tt),Se(ne.__webglFramebuffer,N,tt,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,0),y(tt)&&_(s.TEXTURE_2D)}n.unbindTexture()}else{let be=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(be=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(be,fe.__webglTexture),Z(be,T),T.mipmaps&&T.mipmaps.length>0)for(let Re=0;Re<T.mipmaps.length;Re++)Se(ne.__webglFramebuffer[Re],N,T,s.COLOR_ATTACHMENT0,be,Re);else Se(ne.__webglFramebuffer,N,T,s.COLOR_ATTACHMENT0,be,0);y(T)&&_(be),n.unbindTexture()}N.depthBuffer&&$e(N)}function bt(N){const T=N.textures;for(let ne=0,fe=T.length;ne<fe;ne++){const he=T[ne];if(y(he)){const pe=D(N),Ge=r.get(he).__webglTexture;n.bindTexture(pe,Ge),_(pe),n.unbindTexture()}}}const ct=[],H=[];function nn(N){if(N.samples>0){if(He(N)===!1){const T=N.textures,ne=N.width,fe=N.height;let he=s.COLOR_BUFFER_BIT;const pe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ge=r.get(N),be=T.length>1;if(be)for(let Re=0;Re<T.length;Re++)n.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ge.__webglFramebuffer);for(let Re=0;Re<T.length;Re++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(he|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(he|=s.STENCIL_BUFFER_BIT)),be){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ge.__webglColorRenderbuffer[Re]);const tt=r.get(T[Re]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,tt,0)}s.blitFramebuffer(0,0,ne,fe,0,0,ne,fe,he,s.NEAREST),h===!0&&(ct.length=0,H.length=0,ct.push(s.COLOR_ATTACHMENT0+Re),N.depthBuffer&&N.resolveDepthBuffer===!1&&(ct.push(pe),H.push(pe),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,H)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ct))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),be)for(let Re=0;Re<T.length;Re++){n.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,Ge.__webglColorRenderbuffer[Re]);const tt=r.get(T[Re]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,tt,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&h){const T=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function ft(N){return Math.min(a.maxSamples,N.samples)}function He(N){const T=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ae(N){const T=u.render.frame;g.get(N)!==T&&(g.set(N,T),N.update())}function ht(N,T){const ne=N.colorSpace,fe=N.format,he=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||ne!==Ks&&ne!==vr&&(Rt.getTransfer(ne)===Nt?(fe!==fi||he!==Gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),T}function Fe(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(m.width=N.naturalWidth||N.width,m.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(m.width=N.displayWidth,m.height=N.displayHeight):(m.width=N.width,m.height=N.height),m}this.allocateTextureUnit=Q,this.resetTextureUnits=ae,this.setTexture2D=me,this.setTexture2DArray=oe,this.setTexture3D=ue,this.setTextureCube=G,this.rebindTextures=Xe,this.setupRenderTarget=yt,this.updateRenderTargetMipmap=bt,this.updateMultisampleRenderTarget=nn,this.setupDepthRenderbuffer=$e,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=He}function sT(s,e){function n(r,a=vr){let l;const u=Rt.getTransfer(a);if(r===Gi)return s.UNSIGNED_BYTE;if(r===ef)return s.UNSIGNED_SHORT_4_4_4_4;if(r===tf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===gg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===pg)return s.BYTE;if(r===mg)return s.SHORT;if(r===Xo)return s.UNSIGNED_SHORT;if(r===Jd)return s.INT;if(r===$r)return s.UNSIGNED_INT;if(r===Mi)return s.FLOAT;if(r===Yo)return s.HALF_FLOAT;if(r===_g)return s.ALPHA;if(r===vg)return s.RGB;if(r===fi)return s.RGBA;if(r===xg)return s.LUMINANCE;if(r===yg)return s.LUMINANCE_ALPHA;if(r===Gs)return s.DEPTH_COMPONENT;if(r===$s)return s.DEPTH_STENCIL;if(r===nf)return s.RED;if(r===rf)return s.RED_INTEGER;if(r===Sg)return s.RG;if(r===sf)return s.RG_INTEGER;if(r===of)return s.RGBA_INTEGER;if(r===Nl||r===Ll||r===Dl||r===Il)if(u===Nt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Nl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Dl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Il)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Nl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Dl)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Il)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yd||r===Sd||r===Md||r===Ed)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===yd)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Sd)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Md)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ed)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Td||r===wd||r===Ad)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Td||r===wd)return u===Nt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Ad)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Cd||r===Rd||r===bd||r===Pd||r===Nd||r===Ld||r===Dd||r===Id||r===Ud||r===Fd||r===Od||r===kd||r===Bd||r===zd)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Cd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Rd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===bd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Pd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Nd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ld)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Dd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Id)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ud)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Fd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Od)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===kd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Bd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===zd)return u===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ul||r===Hd||r===Vd)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Ul)return u===Nt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Hd)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Vd)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Mg||r===Gd||r===Wd||r===jd)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Ul)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Gd)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wd)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===jd)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ys?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}const oT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,r){if(this.texture===null){const a=new Rn,l=e.properties.get(a);l.__webglTexture=n.texture,(n.depthNear!==r.depthNear||n.depthFar!==r.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Mr({vertexShader:oT,fragmentShader:aT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Wn(new Xl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cT extends Qs{constructor(e,n){super();const r=this;let a=null,l=1,u=null,d="local-floor",h=1,m=null,g=null,v=null,x=null,S=null,E=null;const w=new lT,y=n.getContextAttributes();let _=null,D=null;const L=[],C=[],B=new xt;let U=null;const O=new Gn;O.viewport=new Lt;const z=new Gn;z.viewport=new Lt;const b=[O,z],A=new Py;let I=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let de=L[J];return de===void 0&&(de=new Ku,L[J]=de),de.getTargetRaySpace()},this.getControllerGrip=function(J){let de=L[J];return de===void 0&&(de=new Ku,L[J]=de),de.getGripSpace()},this.getHand=function(J){let de=L[J];return de===void 0&&(de=new Ku,L[J]=de),de.getHandSpace()};function Q(J){const de=C.indexOf(J.inputSource);if(de===-1)return;const Se=L[de];Se!==void 0&&(Se.update(J.inputSource,J.frame,m||u),Se.dispatchEvent({type:J.type,data:J.inputSource}))}function re(){a.removeEventListener("select",Q),a.removeEventListener("selectstart",Q),a.removeEventListener("selectend",Q),a.removeEventListener("squeeze",Q),a.removeEventListener("squeezestart",Q),a.removeEventListener("squeezeend",Q),a.removeEventListener("end",re),a.removeEventListener("inputsourceschange",me);for(let J=0;J<L.length;J++){const de=C[J];de!==null&&(C[J]=null,L[J].disconnect(de))}I=null,ae=null,w.reset(),e.setRenderTarget(_),S=null,x=null,v=null,a=null,D=null,Ne.stop(),r.isPresenting=!1,e.setPixelRatio(U),e.setSize(B.width,B.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){l=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){d=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||u},this.setReferenceSpace=function(J){m=J},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return v},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(J){if(a=J,a!==null){if(_=e.getRenderTarget(),a.addEventListener("select",Q),a.addEventListener("selectstart",Q),a.addEventListener("selectend",Q),a.addEventListener("squeeze",Q),a.addEventListener("squeezestart",Q),a.addEventListener("squeezeend",Q),a.addEventListener("end",re),a.addEventListener("inputsourceschange",me),y.xrCompatible!==!0&&await n.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(B),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,xe=null,we=null;y.depth&&(we=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Se=y.stencil?$s:Gs,xe=y.stencil?Ys:$r);const $e={colorFormat:n.RGBA8,depthFormat:we,scaleFactor:l};v=new XRWebGLBinding(a,n),x=v.createProjectionLayer($e),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),D=new Kr(x.textureWidth,x.textureHeight,{format:fi,type:Gi,depthTexture:new Fg(x.textureWidth,x.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}else{const Se={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,n,Se),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),D=new Kr(S.framebufferWidth,S.framebufferHeight,{format:fi,type:Gi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}D.isXRRenderTarget=!0,this.setFoveation(h),m=null,u=await a.requestReferenceSpace(d),Ne.setContext(a),Ne.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function me(J){for(let de=0;de<J.removed.length;de++){const Se=J.removed[de],xe=C.indexOf(Se);xe>=0&&(C[xe]=null,L[xe].disconnect(Se))}for(let de=0;de<J.added.length;de++){const Se=J.added[de];let xe=C.indexOf(Se);if(xe===-1){for(let $e=0;$e<L.length;$e++)if($e>=C.length){C.push(Se),xe=$e;break}else if(C[$e]===null){C[$e]=Se,xe=$e;break}if(xe===-1)break}const we=L[xe];we&&we.connect(Se)}}const oe=new Y,ue=new Y;function G(J,de,Se){oe.setFromMatrixPosition(de.matrixWorld),ue.setFromMatrixPosition(Se.matrixWorld);const xe=oe.distanceTo(ue),we=de.projectionMatrix.elements,$e=Se.projectionMatrix.elements,Xe=we[14]/(we[10]-1),yt=we[14]/(we[10]+1),bt=(we[9]+1)/we[5],ct=(we[9]-1)/we[5],H=(we[8]-1)/we[0],nn=($e[8]+1)/$e[0],ft=Xe*H,He=Xe*nn,Ae=xe/(-H+nn),ht=Ae*-H;if(de.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ht),J.translateZ(Ae),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),we[10]===-1)J.projectionMatrix.copy(de.projectionMatrix),J.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const Fe=Xe+Ae,N=yt+Ae,T=ft-ht,ne=He+(xe-ht),fe=bt*yt/N*Fe,he=ct*yt/N*Fe;J.projectionMatrix.makePerspective(T,ne,fe,he,Fe,N),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ce(J,de){de===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(de.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(a===null)return;let de=J.near,Se=J.far;w.texture!==null&&(w.depthNear>0&&(de=w.depthNear),w.depthFar>0&&(Se=w.depthFar)),A.near=z.near=O.near=de,A.far=z.far=O.far=Se,(I!==A.near||ae!==A.far)&&(a.updateRenderState({depthNear:A.near,depthFar:A.far}),I=A.near,ae=A.far),O.layers.mask=J.layers.mask|2,z.layers.mask=J.layers.mask|4,A.layers.mask=O.layers.mask|z.layers.mask;const xe=J.parent,we=A.cameras;ce(A,xe);for(let $e=0;$e<we.length;$e++)ce(we[$e],xe);we.length===2?G(A,O,z):A.projectionMatrix.copy(O.projectionMatrix),te(J,A,xe)};function te(J,de,Se){Se===null?J.matrix.copy(de.matrixWorld):(J.matrix.copy(Se.matrixWorld),J.matrix.invert(),J.matrix.multiply(de.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(de.projectionMatrix),J.projectionMatrixInverse.copy(de.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=qo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(x===null&&S===null))return h},this.setFoveation=function(J){h=J,x!==null&&(x.fixedFoveation=J),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=J)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(A)};let k=null;function Z(J,de){if(g=de.getViewerPose(m||u),E=de,g!==null){const Se=g.views;S!==null&&(e.setRenderTargetFramebuffer(D,S.framebuffer),e.setRenderTarget(D));let xe=!1;Se.length!==A.cameras.length&&(A.cameras.length=0,xe=!0);for(let Xe=0;Xe<Se.length;Xe++){const yt=Se[Xe];let bt=null;if(S!==null)bt=S.getViewport(yt);else{const H=v.getViewSubImage(x,yt);bt=H.viewport,Xe===0&&(e.setRenderTargetTextures(D,H.colorTexture,x.ignoreDepthValues?void 0:H.depthStencilTexture),e.setRenderTarget(D))}let ct=b[Xe];ct===void 0&&(ct=new Gn,ct.layers.enable(Xe),ct.viewport=new Lt,b[Xe]=ct),ct.matrix.fromArray(yt.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(yt.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(bt.x,bt.y,bt.width,bt.height),Xe===0&&(A.matrix.copy(ct.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),xe===!0&&A.cameras.push(ct)}const we=a.enabledFeatures;if(we&&we.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&v){const Xe=v.getDepthInformation(Se[0]);Xe&&Xe.isValid&&Xe.texture&&w.init(e,Xe,a.renderState)}}for(let Se=0;Se<L.length;Se++){const xe=C[Se],we=L[Se];xe!==null&&we!==void 0&&we.update(xe,de,m||u)}k&&k(J,de),de.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:de}),E=null}const Ne=new zg;Ne.setAnimationLoop(Z),this.setAnimationLoop=function(J){k=J},this.dispose=function(){}}}const Vr=new Ei,uT=new Dt;function dT(s,e){function n(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function r(y,_){_.color.getRGB(y.fogColor.value,Lg(s)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function a(y,_,D,L,C){_.isMeshBasicMaterial||_.isMeshLambertMaterial?l(y,_):_.isMeshToonMaterial?(l(y,_),v(y,_)):_.isMeshPhongMaterial?(l(y,_),g(y,_)):_.isMeshStandardMaterial?(l(y,_),x(y,_),_.isMeshPhysicalMaterial&&S(y,_,C)):_.isMeshMatcapMaterial?(l(y,_),E(y,_)):_.isMeshDepthMaterial?l(y,_):_.isMeshDistanceMaterial?(l(y,_),w(y,_)):_.isMeshNormalMaterial?l(y,_):_.isLineBasicMaterial?(u(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?h(y,_,D,L):_.isSpriteMaterial?m(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function l(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,n(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,n(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,n(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===Fn&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,n(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===Fn&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,n(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,n(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,n(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const D=e.get(_),L=D.envMap,C=D.envMapRotation;L&&(y.envMap.value=L,Vr.copy(C),Vr.x*=-1,Vr.y*=-1,Vr.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Vr.y*=-1,Vr.z*=-1),y.envMapRotation.value.setFromMatrix4(uT.makeRotationFromEuler(Vr)),y.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,n(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,n(_.aoMap,y.aoMapTransform))}function u(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,n(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function h(y,_,D,L){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*D,y.scale.value=L*.5,_.map&&(y.map.value=_.map,n(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,n(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function m(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,n(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,n(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function g(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function v(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,n(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,n(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function S(y,_,D){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,n(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,n(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,n(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,n(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,n(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Fn&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,n(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,n(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=D.texture,y.transmissionSamplerSize.value.set(D.width,D.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,n(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,n(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,n(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,n(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,n(_.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,_){_.matcap&&(y.matcap.value=_.matcap)}function w(y,_){const D=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(D.matrixWorld),y.nearDistance.value=D.shadow.camera.near,y.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function fT(s,e,n,r){let a={},l={},u=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(D,L){const C=L.program;r.uniformBlockBinding(D,C)}function m(D,L){let C=a[D.id];C===void 0&&(E(D),C=g(D),a[D.id]=C,D.addEventListener("dispose",y));const B=L.program;r.updateUBOMapping(D,B);const U=e.render.frame;l[D.id]!==U&&(x(D),l[D.id]=U)}function g(D){const L=v();D.__bindingPointIndex=L;const C=s.createBuffer(),B=D.__size,U=D.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,B,U),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,L,C),C}function v(){for(let D=0;D<d;D++)if(u.indexOf(D)===-1)return u.push(D),D;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(D){const L=a[D.id],C=D.uniforms,B=D.__cache;s.bindBuffer(s.UNIFORM_BUFFER,L);for(let U=0,O=C.length;U<O;U++){const z=Array.isArray(C[U])?C[U]:[C[U]];for(let b=0,A=z.length;b<A;b++){const I=z[b];if(S(I,U,b,B)===!0){const ae=I.__offset,Q=Array.isArray(I.value)?I.value:[I.value];let re=0;for(let me=0;me<Q.length;me++){const oe=Q[me],ue=w(oe);typeof oe=="number"||typeof oe=="boolean"?(I.__data[0]=oe,s.bufferSubData(s.UNIFORM_BUFFER,ae+re,I.__data)):oe.isMatrix3?(I.__data[0]=oe.elements[0],I.__data[1]=oe.elements[1],I.__data[2]=oe.elements[2],I.__data[3]=0,I.__data[4]=oe.elements[3],I.__data[5]=oe.elements[4],I.__data[6]=oe.elements[5],I.__data[7]=0,I.__data[8]=oe.elements[6],I.__data[9]=oe.elements[7],I.__data[10]=oe.elements[8],I.__data[11]=0):(oe.toArray(I.__data,re),re+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ae,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(D,L,C,B){const U=D.value,O=L+"_"+C;if(B[O]===void 0)return typeof U=="number"||typeof U=="boolean"?B[O]=U:B[O]=U.clone(),!0;{const z=B[O];if(typeof U=="number"||typeof U=="boolean"){if(z!==U)return B[O]=U,!0}else if(z.equals(U)===!1)return z.copy(U),!0}return!1}function E(D){const L=D.uniforms;let C=0;const B=16;for(let O=0,z=L.length;O<z;O++){const b=Array.isArray(L[O])?L[O]:[L[O]];for(let A=0,I=b.length;A<I;A++){const ae=b[A],Q=Array.isArray(ae.value)?ae.value:[ae.value];for(let re=0,me=Q.length;re<me;re++){const oe=Q[re],ue=w(oe),G=C%B,ce=G%ue.boundary,te=G+ce;C+=ce,te!==0&&B-te<ue.storage&&(C+=B-te),ae.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),ae.__offset=C,C+=ue.storage}}}const U=C%B;return U>0&&(C+=B-U),D.__size=C,D.__cache={},this}function w(D){const L={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(L.boundary=4,L.storage=4):D.isVector2?(L.boundary=8,L.storage=8):D.isVector3||D.isColor?(L.boundary=16,L.storage=12):D.isVector4?(L.boundary=16,L.storage=16):D.isMatrix3?(L.boundary=48,L.storage=48):D.isMatrix4?(L.boundary=64,L.storage=64):D.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",D),L}function y(D){const L=D.target;L.removeEventListener("dispose",y);const C=u.indexOf(L.__bindingPointIndex);u.splice(C,1),s.deleteBuffer(a[L.id]),delete a[L.id],delete l[L.id]}function _(){for(const D in a)s.deleteBuffer(a[D]);u=[],a={},l={}}return{bind:h,update:m,dispose:_}}class hT{constructor(e={}){const{canvas:n=zx(),context:r=null,depth:a=!0,stencil:l=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=u;const E=new Uint32Array(4),w=new Int32Array(4);let y=null,_=null;const D=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ti,this.toneMapping=yr,this.toneMappingExposure=1;const C=this;let B=!1,U=0,O=0,z=null,b=-1,A=null;const I=new Lt,ae=new Lt;let Q=null;const re=new _t(0);let me=0,oe=n.width,ue=n.height,G=1,ce=null,te=null;const k=new Lt(0,0,oe,ue),Z=new Lt(0,0,oe,ue);let Ne=!1;const J=new df;let de=!1,Se=!1;this.transmissionResolutionScale=1;const xe=new Dt,we=new Dt,$e=new Y,Xe=new Lt,yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function ct(){return z===null?G:1}let H=r;function nn(R,X){return n.getContext(R,X)}try{const R={alpha:!0,depth:a,stencil:l,antialias:d,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Qd}`),n.addEventListener("webglcontextlost",ge,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",Ie,!1),H===null){const X="webgl2";if(H=nn(X,R),H===null)throw nn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ft,He,Ae,ht,Fe,N,T,ne,fe,he,pe,Ge,be,Re,tt,_e,Pe,Ye,Qe,Oe,at,it,Mt,j;function Ce(){ft=new E1(H),ft.init(),it=new sT(H,ft),He=new _1(H,ft,e,it),Ae=new iT(H,ft),He.reverseDepthBuffer&&x&&Ae.buffers.depth.setReversed(!0),ht=new A1(H),Fe=new WE,N=new rT(H,ft,Ae,Fe,He,it,ht),T=new x1(C),ne=new M1(C),fe=new Dy(H),Mt=new m1(H,fe),he=new T1(H,fe,ht,Mt),pe=new R1(H,he,fe,ht),Qe=new C1(H,He,N),_e=new v1(Fe),Ge=new GE(C,T,ne,ft,He,Mt,_e),be=new dT(C,Fe),Re=new XE,tt=new QE(ft),Ye=new p1(C,T,ne,Ae,pe,S,h),Pe=new tT(C,pe,He),j=new fT(H,ht,He,Ae),Oe=new g1(H,ft,ht),at=new w1(H,ft,ht),ht.programs=Ge.programs,C.capabilities=He,C.extensions=ft,C.properties=Fe,C.renderLists=Re,C.shadowMap=Pe,C.state=Ae,C.info=ht}Ce();const le=new cT(C,H);this.xr=le,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const R=ft.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ft.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(oe,ue,!1))},this.getSize=function(R){return R.set(oe,ue)},this.setSize=function(R,X,ie=!0){if(le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}oe=R,ue=X,n.width=Math.floor(R*G),n.height=Math.floor(X*G),ie===!0&&(n.style.width=R+"px",n.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(oe*G,ue*G).floor()},this.setDrawingBufferSize=function(R,X,ie){oe=R,ue=X,G=ie,n.width=Math.floor(R*ie),n.height=Math.floor(X*ie),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(k)},this.setViewport=function(R,X,ie,K){R.isVector4?k.set(R.x,R.y,R.z,R.w):k.set(R,X,ie,K),Ae.viewport(I.copy(k).multiplyScalar(G).round())},this.getScissor=function(R){return R.copy(Z)},this.setScissor=function(R,X,ie,K){R.isVector4?Z.set(R.x,R.y,R.z,R.w):Z.set(R,X,ie,K),Ae.scissor(ae.copy(Z).multiplyScalar(G).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(R){Ae.setScissorTest(Ne=R)},this.setOpaqueSort=function(R){ce=R},this.setTransparentSort=function(R){te=R},this.getClearColor=function(R){return R.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(R=!0,X=!0,ie=!0){let K=0;if(R){let q=!1;if(z!==null){const Ee=z.texture.format;q=Ee===of||Ee===sf||Ee===rf}if(q){const Ee=z.texture.type,Le=Ee===Gi||Ee===$r||Ee===Xo||Ee===Ys||Ee===ef||Ee===tf,ke=Ye.getClearColor(),Ve=Ye.getClearAlpha(),rt=ke.r,nt=ke.g,je=ke.b;Le?(E[0]=rt,E[1]=nt,E[2]=je,E[3]=Ve,H.clearBufferuiv(H.COLOR,0,E)):(w[0]=rt,w[1]=nt,w[2]=je,w[3]=Ve,H.clearBufferiv(H.COLOR,0,w))}else K|=H.COLOR_BUFFER_BIT}X&&(K|=H.DEPTH_BUFFER_BIT),ie&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ge,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",Ie,!1),Ye.dispose(),Re.dispose(),tt.dispose(),Fe.dispose(),T.dispose(),ne.dispose(),pe.dispose(),Mt.dispose(),j.dispose(),Ge.dispose(),le.dispose(),le.removeEventListener("sessionstart",es),le.removeEventListener("sessionend",Wi),Ti.stop()};function ge(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;const R=ht.autoReset,X=Pe.enabled,ie=Pe.autoUpdate,K=Pe.needsUpdate,q=Pe.type;Ce(),ht.autoReset=R,Pe.enabled=X,Pe.autoUpdate=ie,Pe.needsUpdate=K,Pe.type=q}function Ie(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function lt(R){const X=R.target;X.removeEventListener("dispose",lt),Ot(X)}function Ot(R){Zt(R),Fe.remove(R)}function Zt(R){const X=Fe.get(R).programs;X!==void 0&&(X.forEach(function(ie){Ge.releaseProgram(ie)}),R.isShaderMaterial&&Ge.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,ie,K,q,Ee){X===null&&(X=yt);const Le=q.isMesh&&q.matrixWorld.determinant()<0,ke=Jo(R,X,ie,K,q);Ae.setMaterial(K,Le);let Ve=ie.index,rt=1;if(K.wireframe===!0){if(Ve=he.getWireframeAttribute(ie),Ve===void 0)return;rt=2}const nt=ie.drawRange,je=ie.attributes.position;let St=nt.start*rt,ut=(nt.start+nt.count)*rt;Ee!==null&&(St=Math.max(St,Ee.start*rt),ut=Math.min(ut,(Ee.start+Ee.count)*rt)),Ve!==null?(St=Math.max(St,0),ut=Math.min(ut,Ve.count)):je!=null&&(St=Math.max(St,0),ut=Math.min(ut,je.count));const Wt=ut-St;if(Wt<0||Wt===1/0)return;Mt.setup(q,K,ke,ie,Ve);let zt,Et=Oe;if(Ve!==null&&(zt=fe.get(Ve),Et=at,Et.setIndex(zt)),q.isMesh)K.wireframe===!0?(Ae.setLineWidth(K.wireframeLinewidth*ct()),Et.setMode(H.LINES)):Et.setMode(H.TRIANGLES);else if(q.isLine){let Ze=K.linewidth;Ze===void 0&&(Ze=1),Ae.setLineWidth(Ze*ct()),q.isLineSegments?Et.setMode(H.LINES):q.isLineLoop?Et.setMode(H.LINE_LOOP):Et.setMode(H.LINE_STRIP)}else q.isPoints?Et.setMode(H.POINTS):q.isSprite&&Et.setMode(H.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Et.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))Et.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Ze=q._multiDrawStarts,jt=q._multiDrawCounts,vt=q._multiDrawCount,hn=Ve?fe.get(Ve).bytesPerElement:1,Xi=Fe.get(K).currentProgram.getUniforms();for(let En=0;En<vt;En++)Xi.setValue(H,"_gl_DrawID",En),Et.render(Ze[En]/hn,jt[En])}else if(q.isInstancedMesh)Et.renderInstances(St,Wt,q.count);else if(ie.isInstancedBufferGeometry){const Ze=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,jt=Math.min(ie.instanceCount,Ze);Et.renderInstances(St,Wt,jt)}else Et.render(St,Wt)};function Tt(R,X,ie){R.transparent===!0&&R.side===yi&&R.forceSinglePass===!1?(R.side=Fn,R.needsUpdate=!0,ts(R,X,ie),R.side=Sr,R.needsUpdate=!0,ts(R,X,ie),R.side=yi):ts(R,X,ie)}this.compile=function(R,X,ie=null){ie===null&&(ie=R),_=tt.get(ie),_.init(X),L.push(_),ie.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),R!==ie&&R.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),_.setupLights();const K=new Set;return R.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const Ee=q.material;if(Ee)if(Array.isArray(Ee))for(let Le=0;Le<Ee.length;Le++){const ke=Ee[Le];Tt(ke,ie,q),K.add(ke)}else Tt(Ee,ie,q),K.add(Ee)}),L.pop(),_=null,K},this.compileAsync=function(R,X,ie=null){const K=this.compile(R,X,ie);return new Promise(q=>{function Ee(){if(K.forEach(function(Le){Fe.get(Le).currentProgram.isReady()&&K.delete(Le)}),K.size===0){q(R);return}setTimeout(Ee,10)}ft.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let bn=null;function Mn(R){bn&&bn(R)}function es(){Ti.stop()}function Wi(){Ti.start()}const Ti=new zg;Ti.setAnimationLoop(Mn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(R){bn=R,le.setAnimationLoop(R),R===null?Ti.stop():Ti.start()},le.addEventListener("sessionstart",es),le.addEventListener("sessionend",Wi),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(X),X=le.getCamera()),R.isScene===!0&&R.onBeforeRender(C,R,X,z),_=tt.get(R,L.length),_.init(X),L.push(_),we.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),J.setFromProjectionMatrix(we),Se=this.localClippingEnabled,de=_e.init(this.clippingPlanes,Se),y=Re.get(R,D.length),y.init(),D.push(y),le.enabled===!0&&le.isPresenting===!0){const Ee=C.xr.getDepthSensingMesh();Ee!==null&&wi(Ee,X,-1/0,C.sortObjects)}wi(R,X,0,C.sortObjects),y.finish(),C.sortObjects===!0&&y.sort(ce,te),bt=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,bt&&Ye.addToRenderList(y,R),this.info.render.frame++,de===!0&&_e.beginShadows();const ie=_.state.shadowsArray;Pe.render(ie,R,X),de===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=y.opaque,q=y.transmissive;if(_.setupLights(),X.isArrayCamera){const Ee=X.cameras;if(q.length>0)for(let Le=0,ke=Ee.length;Le<ke;Le++){const Ve=Ee[Le];Tr(K,q,R,Ve)}bt&&Ye.render(R);for(let Le=0,ke=Ee.length;Le<ke;Le++){const Ve=Ee[Le];Er(y,R,Ve,Ve.viewport)}}else q.length>0&&Tr(K,q,R,X),bt&&Ye.render(R),Er(y,R,X);z!==null&&O===0&&(N.updateMultisampleRenderTarget(z),N.updateRenderTargetMipmap(z)),R.isScene===!0&&R.onAfterRender(C,R,X),Mt.resetDefaultState(),b=-1,A=null,L.pop(),L.length>0?(_=L[L.length-1],de===!0&&_e.setGlobalState(C.clippingPlanes,_.state.camera)):_=null,D.pop(),D.length>0?y=D[D.length-1]:y=null};function wi(R,X,ie,K){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)ie=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)_.pushLight(R),R.castShadow&&_.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||J.intersectsSprite(R)){K&&Xe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(we);const Le=pe.update(R),ke=R.material;ke.visible&&y.push(R,Le,ke,ie,Xe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||J.intersectsObject(R))){const Le=pe.update(R),ke=R.material;if(K&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Xe.copy(R.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Xe.copy(Le.boundingSphere.center)),Xe.applyMatrix4(R.matrixWorld).applyMatrix4(we)),Array.isArray(ke)){const Ve=Le.groups;for(let rt=0,nt=Ve.length;rt<nt;rt++){const je=Ve[rt],St=ke[je.materialIndex];St&&St.visible&&y.push(R,Le,St,ie,Xe.z,je)}}else ke.visible&&y.push(R,Le,ke,ie,Xe.z,null)}}const Ee=R.children;for(let Le=0,ke=Ee.length;Le<ke;Le++)wi(Ee[Le],X,ie,K)}function Er(R,X,ie,K){const q=R.opaque,Ee=R.transmissive,Le=R.transparent;_.setupLightsView(ie),de===!0&&_e.setGlobalState(C.clippingPlanes,ie),K&&Ae.viewport(I.copy(K)),q.length>0&&ji(q,X,ie),Ee.length>0&&ji(Ee,X,ie),Le.length>0&&ji(Le,X,ie),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Tr(R,X,ie,K){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[K.id]===void 0&&(_.state.transmissionRenderTarget[K.id]=new Kr(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?Yo:Gi,minFilter:Yr,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace}));const Ee=_.state.transmissionRenderTarget[K.id],Le=K.viewport||I;Ee.setSize(Le.z*C.transmissionResolutionScale,Le.w*C.transmissionResolutionScale);const ke=C.getRenderTarget();C.setRenderTarget(Ee),C.getClearColor(re),me=C.getClearAlpha(),me<1&&C.setClearColor(16777215,.5),C.clear(),bt&&Ye.render(ie);const Ve=C.toneMapping;C.toneMapping=yr;const rt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),_.setupLightsView(K),de===!0&&_e.setGlobalState(C.clippingPlanes,K),ji(R,ie,K),N.updateMultisampleRenderTarget(Ee),N.updateRenderTargetMipmap(Ee),ft.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let je=0,St=X.length;je<St;je++){const ut=X[je],Wt=ut.object,zt=ut.geometry,Et=ut.material,Ze=ut.group;if(Et.side===yi&&Wt.layers.test(K.layers)){const jt=Et.side;Et.side=Fn,Et.needsUpdate=!0,Zo(Wt,ie,K,zt,Et,Ze),Et.side=jt,Et.needsUpdate=!0,nt=!0}}nt===!0&&(N.updateMultisampleRenderTarget(Ee),N.updateRenderTargetMipmap(Ee))}C.setRenderTarget(ke),C.setClearColor(re,me),rt!==void 0&&(K.viewport=rt),C.toneMapping=Ve}function ji(R,X,ie){const K=X.isScene===!0?X.overrideMaterial:null;for(let q=0,Ee=R.length;q<Ee;q++){const Le=R[q],ke=Le.object,Ve=Le.geometry,rt=K===null?Le.material:K,nt=Le.group;ke.layers.test(ie.layers)&&Zo(ke,X,ie,Ve,rt,nt)}}function Zo(R,X,ie,K,q,Ee){R.onBeforeRender(C,X,ie,K,q,Ee),R.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),q.onBeforeRender(C,X,ie,K,R,Ee),q.transparent===!0&&q.side===yi&&q.forceSinglePass===!1?(q.side=Fn,q.needsUpdate=!0,C.renderBufferDirect(ie,X,K,q,R,Ee),q.side=Sr,q.needsUpdate=!0,C.renderBufferDirect(ie,X,K,q,R,Ee),q.side=yi):C.renderBufferDirect(ie,X,K,q,R,Ee),R.onAfterRender(C,X,ie,K,q,Ee)}function ts(R,X,ie){X.isScene!==!0&&(X=yt);const K=Fe.get(R),q=_.state.lights,Ee=_.state.shadowsArray,Le=q.state.version,ke=Ge.getParameters(R,q.state,Ee,X,ie),Ve=Ge.getProgramCacheKey(ke);let rt=K.programs;K.environment=R.isMeshStandardMaterial?X.environment:null,K.fog=X.fog,K.envMap=(R.isMeshStandardMaterial?ne:T).get(R.envMap||K.environment),K.envMapRotation=K.environment!==null&&R.envMap===null?X.environmentRotation:R.envMapRotation,rt===void 0&&(R.addEventListener("dispose",lt),rt=new Map,K.programs=rt);let nt=rt.get(Ve);if(nt!==void 0){if(K.currentProgram===nt&&K.lightsStateVersion===Le)return hi(R,ke),nt}else ke.uniforms=Ge.getUniforms(R),R.onBeforeCompile(ke,C),nt=Ge.acquireProgram(ke,Ve),rt.set(Ve,nt),K.uniforms=ke.uniforms;const je=K.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(je.clippingPlanes=_e.uniform),hi(R,ke),K.needsLights=Yl(R),K.lightsStateVersion=Le,K.needsLights&&(je.ambientLightColor.value=q.state.ambient,je.lightProbe.value=q.state.probe,je.directionalLights.value=q.state.directional,je.directionalLightShadows.value=q.state.directionalShadow,je.spotLights.value=q.state.spot,je.spotLightShadows.value=q.state.spotShadow,je.rectAreaLights.value=q.state.rectArea,je.ltc_1.value=q.state.rectAreaLTC1,je.ltc_2.value=q.state.rectAreaLTC2,je.pointLights.value=q.state.point,je.pointLightShadows.value=q.state.pointShadow,je.hemisphereLights.value=q.state.hemi,je.directionalShadowMap.value=q.state.directionalShadowMap,je.directionalShadowMatrix.value=q.state.directionalShadowMatrix,je.spotShadowMap.value=q.state.spotShadowMap,je.spotLightMatrix.value=q.state.spotLightMatrix,je.spotLightMap.value=q.state.spotLightMap,je.pointShadowMap.value=q.state.pointShadowMap,je.pointShadowMatrix.value=q.state.pointShadowMatrix),K.currentProgram=nt,K.uniformsList=null,nt}function Qo(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=Fl.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function hi(R,X){const ie=Fe.get(R);ie.outputColorSpace=X.outputColorSpace,ie.batching=X.batching,ie.batchingColor=X.batchingColor,ie.instancing=X.instancing,ie.instancingColor=X.instancingColor,ie.instancingMorph=X.instancingMorph,ie.skinning=X.skinning,ie.morphTargets=X.morphTargets,ie.morphNormals=X.morphNormals,ie.morphColors=X.morphColors,ie.morphTargetsCount=X.morphTargetsCount,ie.numClippingPlanes=X.numClippingPlanes,ie.numIntersection=X.numClipIntersection,ie.vertexAlphas=X.vertexAlphas,ie.vertexTangents=X.vertexTangents,ie.toneMapping=X.toneMapping}function Jo(R,X,ie,K,q){X.isScene!==!0&&(X=yt),N.resetTextureUnits();const Ee=X.fog,Le=K.isMeshStandardMaterial?X.environment:null,ke=z===null?C.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Ks,Ve=(K.isMeshStandardMaterial?ne:T).get(K.envMap||Le),rt=K.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,nt=!!ie.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),je=!!ie.morphAttributes.position,St=!!ie.morphAttributes.normal,ut=!!ie.morphAttributes.color;let Wt=yr;K.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Wt=C.toneMapping);const zt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Et=zt!==void 0?zt.length:0,Ze=Fe.get(K),jt=_.state.lights;if(de===!0&&(Se===!0||R!==A)){const un=R===A&&K.id===b;_e.setState(K,R,un)}let vt=!1;K.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==jt.state.version||Ze.outputColorSpace!==ke||q.isBatchedMesh&&Ze.batching===!1||!q.isBatchedMesh&&Ze.batching===!0||q.isBatchedMesh&&Ze.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Ze.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Ze.instancing===!1||!q.isInstancedMesh&&Ze.instancing===!0||q.isSkinnedMesh&&Ze.skinning===!1||!q.isSkinnedMesh&&Ze.skinning===!0||q.isInstancedMesh&&Ze.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ze.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ze.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ze.instancingMorph===!1&&q.morphTexture!==null||Ze.envMap!==Ve||K.fog===!0&&Ze.fog!==Ee||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==_e.numPlanes||Ze.numIntersection!==_e.numIntersection)||Ze.vertexAlphas!==rt||Ze.vertexTangents!==nt||Ze.morphTargets!==je||Ze.morphNormals!==St||Ze.morphColors!==ut||Ze.toneMapping!==Wt||Ze.morphTargetsCount!==Et)&&(vt=!0):(vt=!0,Ze.__version=K.version);let hn=Ze.currentProgram;vt===!0&&(hn=ts(K,X,q));let Xi=!1,En=!1,Ai=!1;const It=hn.getUniforms(),pn=Ze.uniforms;if(Ae.useProgram(hn.program)&&(Xi=!0,En=!0,Ai=!0),K.id!==b&&(b=K.id,En=!0),Xi||A!==R){Ae.buffers.depth.getReversed()?(xe.copy(R.projectionMatrix),Vx(xe),Gx(xe),It.setValue(H,"projectionMatrix",xe)):It.setValue(H,"projectionMatrix",R.projectionMatrix),It.setValue(H,"viewMatrix",R.matrixWorldInverse);const sn=It.map.cameraPosition;sn!==void 0&&sn.setValue(H,$e.setFromMatrixPosition(R.matrixWorld)),He.logarithmicDepthBuffer&&It.setValue(H,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&It.setValue(H,"isOrthographic",R.isOrthographicCamera===!0),A!==R&&(A=R,En=!0,Ai=!0)}if(q.isSkinnedMesh){It.setOptional(H,q,"bindMatrix"),It.setOptional(H,q,"bindMatrixInverse");const un=q.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),It.setValue(H,"boneTexture",un.boneTexture,N))}q.isBatchedMesh&&(It.setOptional(H,q,"batchingTexture"),It.setValue(H,"batchingTexture",q._matricesTexture,N),It.setOptional(H,q,"batchingIdTexture"),It.setValue(H,"batchingIdTexture",q._indirectTexture,N),It.setOptional(H,q,"batchingColorTexture"),q._colorsTexture!==null&&It.setValue(H,"batchingColorTexture",q._colorsTexture,N));const rn=ie.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&Qe.update(q,ie,hn),(En||Ze.receiveShadow!==q.receiveShadow)&&(Ze.receiveShadow=q.receiveShadow,It.setValue(H,"receiveShadow",q.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(pn.envMap.value=Ve,pn.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&X.environment!==null&&(pn.envMapIntensity.value=X.environmentIntensity),En&&(It.setValue(H,"toneMappingExposure",C.toneMappingExposure),Ze.needsLights&&ea(pn,Ai),Ee&&K.fog===!0&&be.refreshFogUniforms(pn,Ee),be.refreshMaterialUniforms(pn,K,G,ue,_.state.transmissionRenderTarget[R.id]),Fl.upload(H,Qo(Ze),pn,N)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Fl.upload(H,Qo(Ze),pn,N),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&It.setValue(H,"center",q.center),It.setValue(H,"modelViewMatrix",q.modelViewMatrix),It.setValue(H,"normalMatrix",q.normalMatrix),It.setValue(H,"modelMatrix",q.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const un=K.uniformsGroups;for(let sn=0,wt=un.length;sn<wt;sn++){const pi=un[sn];j.update(pi,hn),j.bind(pi,hn)}}return hn}function ea(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function Yl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(R,X,ie){Fe.get(R.texture).__webglTexture=X,Fe.get(R.depthTexture).__webglTexture=ie;const K=Fe.get(R);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=ie===void 0,K.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,X){const ie=Fe.get(R);ie.__webglFramebuffer=X,ie.__useDefaultFramebuffer=X===void 0};const ta=H.createFramebuffer();this.setRenderTarget=function(R,X=0,ie=0){z=R,U=X,O=ie;let K=!0,q=null,Ee=!1,Le=!1;if(R){const Ve=Fe.get(R);if(Ve.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(H.FRAMEBUFFER,null),K=!1;else if(Ve.__webglFramebuffer===void 0)N.setupRenderTarget(R);else if(Ve.__hasExternalTextures)N.rebindTextures(R,Fe.get(R.texture).__webglTexture,Fe.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const je=R.depthTexture;if(Ve.__boundDepthTexture!==je){if(je!==null&&Fe.has(je)&&(R.width!==je.image.width||R.height!==je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(R)}}const rt=R.texture;(rt.isData3DTexture||rt.isDataArrayTexture||rt.isCompressedArrayTexture)&&(Le=!0);const nt=Fe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(nt[X])?q=nt[X][ie]:q=nt[X],Ee=!0):R.samples>0&&N.useMultisampledRTT(R)===!1?q=Fe.get(R).__webglMultisampledFramebuffer:Array.isArray(nt)?q=nt[ie]:q=nt,I.copy(R.viewport),ae.copy(R.scissor),Q=R.scissorTest}else I.copy(k).multiplyScalar(G).floor(),ae.copy(Z).multiplyScalar(G).floor(),Q=Ne;if(ie!==0&&(q=ta),Ae.bindFramebuffer(H.FRAMEBUFFER,q)&&K&&Ae.drawBuffers(R,q),Ae.viewport(I),Ae.scissor(ae),Ae.setScissorTest(Q),Ee){const Ve=Fe.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ve.__webglTexture,ie)}else if(Le){const Ve=Fe.get(R.texture),rt=X;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ve.__webglTexture,ie,rt)}else if(R!==null&&ie!==0){const Ve=Fe.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ve.__webglTexture,ie)}b=-1},this.readRenderTargetPixels=function(R,X,ie,K,q,Ee,Le){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){Ae.bindFramebuffer(H.FRAMEBUFFER,ke);try{const Ve=R.texture,rt=Ve.format,nt=Ve.type;if(!He.textureFormatReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-K&&ie>=0&&ie<=R.height-q&&H.readPixels(X,ie,K,q,it.convert(rt),it.convert(nt),Ee)}finally{const Ve=z!==null?Fe.get(z).__webglFramebuffer:null;Ae.bindFramebuffer(H.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(R,X,ie,K,q,Ee,Le){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){const Ve=R.texture,rt=Ve.format,nt=Ve.type;if(!He.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=R.width-K&&ie>=0&&ie<=R.height-q){Ae.bindFramebuffer(H.FRAMEBUFFER,ke);const je=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,je),H.bufferData(H.PIXEL_PACK_BUFFER,Ee.byteLength,H.STREAM_READ),H.readPixels(X,ie,K,q,it.convert(rt),it.convert(nt),0);const St=z!==null?Fe.get(z).__webglFramebuffer:null;Ae.bindFramebuffer(H.FRAMEBUFFER,St);const ut=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Hx(H,ut,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,je),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Ee),H.deleteBuffer(je),H.deleteSync(ut),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,X=null,ie=0){R.isTexture!==!0&&(zs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,R=arguments[1]);const K=Math.pow(2,-ie),q=Math.floor(R.image.width*K),Ee=Math.floor(R.image.height*K),Le=X!==null?X.x:0,ke=X!==null?X.y:0;N.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,ie,0,0,Le,ke,q,Ee),Ae.unbindTexture()};const na=H.createFramebuffer(),ia=H.createFramebuffer();this.copyTextureToTexture=function(R,X,ie=null,K=null,q=0,Ee=null){R.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,R=arguments[1],X=arguments[2],Ee=arguments[3]||0,ie=null),Ee===null&&(q!==0?(zs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Ee=q,q=0):Ee=0);let Le,ke,Ve,rt,nt,je,St,ut,Wt;const zt=R.isCompressedTexture?R.mipmaps[Ee]:R.image;if(ie!==null)Le=ie.max.x-ie.min.x,ke=ie.max.y-ie.min.y,Ve=ie.isBox3?ie.max.z-ie.min.z:1,rt=ie.min.x,nt=ie.min.y,je=ie.isBox3?ie.min.z:0;else{const rn=Math.pow(2,-q);Le=Math.floor(zt.width*rn),ke=Math.floor(zt.height*rn),R.isDataArrayTexture?Ve=zt.depth:R.isData3DTexture?Ve=Math.floor(zt.depth*rn):Ve=1,rt=0,nt=0,je=0}K!==null?(St=K.x,ut=K.y,Wt=K.z):(St=0,ut=0,Wt=0);const Et=it.convert(X.format),Ze=it.convert(X.type);let jt;X.isData3DTexture?(N.setTexture3D(X,0),jt=H.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(N.setTexture2DArray(X,0),jt=H.TEXTURE_2D_ARRAY):(N.setTexture2D(X,0),jt=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const vt=H.getParameter(H.UNPACK_ROW_LENGTH),hn=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Xi=H.getParameter(H.UNPACK_SKIP_PIXELS),En=H.getParameter(H.UNPACK_SKIP_ROWS),Ai=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,zt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,zt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,rt),H.pixelStorei(H.UNPACK_SKIP_ROWS,nt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,je);const It=R.isDataArrayTexture||R.isData3DTexture,pn=X.isDataArrayTexture||X.isData3DTexture;if(R.isDepthTexture){const rn=Fe.get(R),un=Fe.get(X),sn=Fe.get(rn.__renderTarget),wt=Fe.get(un.__renderTarget);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,sn.__webglFramebuffer),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let pi=0;pi<Ve;pi++)It&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Fe.get(R).__webglTexture,q,je+pi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Fe.get(X).__webglTexture,Ee,Wt+pi)),H.blitFramebuffer(rt,nt,Le,ke,St,ut,Le,ke,H.DEPTH_BUFFER_BIT,H.NEAREST);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(q!==0||R.isRenderTargetTexture||Fe.has(R)){const rn=Fe.get(R),un=Fe.get(X);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,na),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,ia);for(let sn=0;sn<Ve;sn++)It?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,rn.__webglTexture,q,je+sn):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,rn.__webglTexture,q),pn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,un.__webglTexture,Ee,Wt+sn):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,un.__webglTexture,Ee),q!==0?H.blitFramebuffer(rt,nt,Le,ke,St,ut,Le,ke,H.COLOR_BUFFER_BIT,H.NEAREST):pn?H.copyTexSubImage3D(jt,Ee,St,ut,Wt+sn,rt,nt,Le,ke):H.copyTexSubImage2D(jt,Ee,St,ut,rt,nt,Le,ke);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else pn?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(jt,Ee,St,ut,Wt,Le,ke,Ve,Et,Ze,zt.data):X.isCompressedArrayTexture?H.compressedTexSubImage3D(jt,Ee,St,ut,Wt,Le,ke,Ve,Et,zt.data):H.texSubImage3D(jt,Ee,St,ut,Wt,Le,ke,Ve,Et,Ze,zt):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Ee,St,ut,Le,ke,Et,Ze,zt.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Ee,St,ut,zt.width,zt.height,Et,zt.data):H.texSubImage2D(H.TEXTURE_2D,Ee,St,ut,Le,ke,Et,Ze,zt);H.pixelStorei(H.UNPACK_ROW_LENGTH,vt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,hn),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Xi),H.pixelStorei(H.UNPACK_SKIP_ROWS,En),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Ai),Ee===0&&X.generateMipmaps&&H.generateMipmap(jt),Ae.unbindTexture()},this.copyTextureToTexture3D=function(R,X,ie=null,K=null,q=0){return R.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ie=arguments[0]||null,K=arguments[1]||null,R=arguments[2],X=arguments[3],q=arguments[4]||0),zs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,X,ie,K,q)},this.initRenderTarget=function(R){Fe.get(R).__webglFramebuffer===void 0&&N.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?N.setTextureCube(R,0):R.isData3DTexture?N.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?N.setTexture2DArray(R,0):N.setTexture2D(R,0),Ae.unbindTexture()},this.resetState=function(){U=0,O=0,z=null,Ae.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=Rt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Rt._getUnpackColorSpace()}}const pT=({phase:s,tension:e,stressLevel:n,fractureProgress:r,inspectionMode:a,reducedMotion:l,onPointerEngage:u})=>{const d=ot.useRef(null),h=ot.useRef(null),m=ot.useRef(null),[g,v]=ot.useState(60),[x,S]=ot.useState(.5),E=ot.useRef({scene:null,camera:null,renderer:null,coreMesh:null,wireMesh:null,latticePoints:null,orbitRings:null,fractureShards:null,mouse:{x:0,y:0,targetX:0,targetY:0,vx:0,vy:0,isDown:!1},clock:new Ny,reqId:null,lastFrameTime:performance.now(),frameCount:0}),w=ot.useRef({phase:s,tension:e,stressLevel:n,fractureProgress:r,inspectionMode:a,reducedMotion:l});ot.useEffect(()=>{w.current={phase:s,tension:e,stressLevel:n,fractureProgress:r,inspectionMode:a,reducedMotion:l}},[s,e,n,r,a,l]);const y=ot.useCallback(C=>{if(!d.current)return;const B=d.current.getBoundingClientRect(),U=(C.clientX-B.left)/B.width*2-1,O=-((C.clientY-B.top)/B.height*2-1);E.current.mouse.targetX=U,E.current.mouse.targetY=O,u&&u(U,O)},[u]),_=ot.useCallback(()=>{E.current.mouse.isDown=!0,Ut.triggerHapticTick()},[]),D=ot.useCallback(()=>{E.current.mouse.isDown=!1},[]);ot.useEffect(()=>{const C=d.current,B=h.current;if(!C||!B)return;const U=new py;U.fog=new uf(395017,.08);const O=new Gn(45,C.clientWidth/C.clientHeight,.1,100);O.position.set(0,0,7.5);const z=new hT({canvas:B,antialias:!0,alpha:!0,powerPreference:"high-performance"});z.setSize(C.clientWidth,C.clientHeight),z.setPixelRatio(Math.min(window.devicePixelRatio,2)),z.toneMapping=fg,z.toneMappingExposure=1.2;const b=new by(16777215,.6);U.add(b);const A=new Lm(3718648,2.5);A.position.set(5,6,8),U.add(A);const I=new Lm(16096779,2);I.position.set(-5,-4,-4),U.add(I);const ae=new Cy(1096065,1.8,12);ae.position.set(0,0,3),U.add(ae);const Q=new ff(1.8,3),re=Q.attributes.position;Q.userData.origPositions=new Float32Array(re.array);const me=new Rm({color:988192,emissive:593949,emissiveIntensity:.4,roughness:.15,metalness:.85,transmission:.4,ior:1.5,reflectivity:.9,clearcoat:1,clearcoatRoughness:.1,wireframe:!1}),oe=new Wn(Q,me);U.add(oe);const ue=new Ey(Q),G=new Xd({color:3718648,transparent:!0,opacity:.45,blending:Ol}),ce=new Sy(ue,G);oe.add(ce);const te=600,k=new qn,Z=new Float32Array(te*3),Ne=new Float32Array(te*3);for(let He=0;He<te;He++){const Ae=2.4+Math.random()*1.8,ht=Math.random()*Math.PI*2,Fe=Math.acos(Math.random()*2-1);Z[He*3]=Ae*Math.sin(Fe)*Math.cos(ht),Z[He*3+1]=Ae*Math.sin(Fe)*Math.sin(ht),Z[He*3+2]=Ae*Math.cos(Fe);const N=Math.random()>.6;Ne[He*3]=N?.96:.22,Ne[He*3+1]=N?.62:.74,Ne[He*3+2]=N?.04:.97}k.setAttribute("position",new Xn(Z,3)),k.setAttribute("color",new Xn(Ne,3));const J=new Ug({size:.05,vertexColors:!0,transparent:!0,opacity:.75,blending:Ol}),de=new My(k,J);U.add(de);const Se=new Vo;[2.8,3.3,3.8].forEach((He,Ae)=>{const ht=new hf(He,He+.02,64),Fe=new cf({color:Ae===1?16096779:3718648,side:yi,transparent:!0,opacity:.35-Ae*.08,wireframe:!0}),N=new Wn(ht,Fe);N.rotation.x=Math.PI/(2+Ae),N.rotation.y=Ae*Math.PI/4,Se.add(N)}),U.add(Se);const we=80,$e=new pf(.18,0),Xe=new Og({color:3718648,emissive:165063,roughness:.2,metalness:.8}),yt=new _y($e,Xe,we),bt=new Kt;for(let He=0;He<we;He++)bt.position.set(0,0,0),bt.scale.set(.001,.001,.001),bt.updateMatrix(),yt.setMatrixAt(He,bt.matrix);yt.instanceMatrix.needsUpdate=!0,U.add(yt),E.current={...E.current,scene:U,camera:O,renderer:z,coreMesh:oe,wireMesh:ce,latticePoints:de,orbitRings:Se,fractureShards:yt};const ct=()=>{if(!C||!O||!z)return;const He=C.clientWidth,Ae=C.clientHeight;O.aspect=He/Ae,O.updateProjectionMatrix(),z.setSize(He,Ae),z.setPixelRatio(Math.min(window.devicePixelRatio,2)),m.current&&(m.current.width=He*window.devicePixelRatio,m.current.height=Ae*window.devicePixelRatio)};window.addEventListener("resize",ct),ct();let H;const nn=()=>{H=requestAnimationFrame(nn);const{phase:He,tension:Ae,stressLevel:ht,fractureProgress:Fe,inspectionMode:N,reducedMotion:T}=w.current,ne=E.current.clock.getDelta(),fe=E.current.clock.getElapsedTime(),he=E.current.mouse,pe=T?.05:.08;he.vx=(he.targetX-he.x)*pe,he.vy=(he.targetY-he.y)*pe,he.x+=he.vx,he.y+=he.vy,E.current.frameCount++;const Ge=performance.now();Ge-E.current.lastFrameTime>=1e3&&(v(Math.round(E.current.frameCount*1e3/(Ge-E.current.lastFrameTime))),E.current.frameCount=0,E.current.lastFrameTime=Ge);const be=.3+Ae.emergence*.4+Ae.intuition*.2+ht*.5+Math.sqrt(he.vx*he.vx+he.vy*he.vy)*2;if(S(Math.min(1,be)),oe){if(T)oe.rotation.set(.3,.4,0);else{const Pe=.4+Ae.emergence*.6+ht*.8;oe.rotation.y=fe*Pe*.5+he.x*1.2,oe.rotation.x=Math.sin(fe*.3)*.2+he.y*-.8,oe.rotation.z=Math.cos(fe*.2)*.1}const Re=oe.geometry,tt=Re.attributes.position,_e=Re.userData.origPositions;if(_e&&!T){for(let Pe=0;Pe<tt.count;Pe++){const Ye=_e[Pe*3],Qe=_e[Pe*3+1],Oe=_e[Pe*3+2],at=Math.sqrt(Ye*Ye+Qe*Qe+Oe*Oe),it=Math.sin(Ye*2.5+fe*2)*Math.cos(Qe*2.5+fe*1.5)*Ae.intuition*.35,Mt=Math.sin(Oe*4+fe*3)*Ae.emergence*.25,j=1-Ae.rigor*.7,Ce=ht*Math.sin(Ye*8+fe*6)*.35,le=(at+(it+Mt+Ce)*j)/at;tt.setXYZ(Pe,Ye*le,Qe*le,Oe*le)}tt.needsUpdate=!0,Re.computeVertexNormals()}oe.material instanceof Rm&&(oe.material.wireframe=N,oe.material.emissiveIntensity=.2+ht*.8+Ae.emergence*.4,oe.material.roughness=em.lerp(.05,.4,Ae.rigor),He==="genesis"?oe.material.emissive.setHex(165063):He==="dialectic"?oe.material.emissive.setHex(3718648):He==="cocreation"?oe.material.emissive.setHex(ht>.5?16096779:8490232):He==="archive"&&oe.material.emissive.setHex(1096065))}if(ce&&(ce.visible=N||Ae.rigor>.4||He==="dialectic",ce.material instanceof Xd&&(ce.material.opacity=N?.85:.2+Ae.rigor*.5)),Se&&(T||Se.children.forEach((Re,tt)=>{const _e=tt%2===0?1:-1;Re.rotation.z+=ne*.25*_e*(1+Ae.emergence),Re.rotation.x+=ne*.15*_e})),de&&!T&&(de.rotation.y=-fe*.08+he.x*.4,de.rotation.x=Math.sin(fe*.1)*.15),yt){const Re=new Kt,tt=yt.count;for(let _e=0;_e<tt;_e++){if(Fe>.01){const Pe=Math.acos(-1+2*_e/tt),Ye=Math.sqrt(tt*Math.PI)*Pe,Qe=Math.sin(Fe*Math.PI)*3.5*(1+_e%5*.2),at=em.lerp(Qe,2.6,Math.max(0,(Fe-.6)/.4)),it=at*Math.cos(Ye)*Math.sin(Pe),Mt=at*Math.sin(Ye)*Math.sin(Pe),j=at*Math.cos(Pe);Re.position.set(it,Mt,j),Re.rotation.set(fe*(_e+1)*.1,fe*.2,_e*.5);const Ce=Math.min(1,Fe*2);Re.scale.set(Ce,Ce,Ce)}else Re.scale.set(1e-4,1e-4,1e-4);Re.updateMatrix(),yt.setMatrixAt(_e,Re.matrix)}yt.instanceMatrix.needsUpdate=!0}z&&U&&O&&z.render(U,O),L(N,He,Ae,he,be,fe)};H=requestAnimationFrame(nn),E.current.reqId=H;const ft=()=>{document.hidden?E.current.clock.stop():E.current.clock.start()};return document.addEventListener("visibilitychange",ft),()=>{window.removeEventListener("resize",ct),document.removeEventListener("visibilitychange",ft),cancelAnimationFrame(H),z.dispose()}},[]);const L=(C,B,U,O,z,b)=>{const A=m.current;if(!A)return;const I=A.getContext("2d");if(!I)return;const ae=A.width,Q=A.height,re=window.devicePixelRatio||1;if(I.clearRect(0,0,ae,Q),!C){I.save(),I.strokeStyle="rgba(56, 189, 248, 0.12)",I.lineWidth=1*re;const te=ae/2,k=Q/2,Z=Math.min(ae,Q)*.38;I.beginPath(),I.moveTo(te-Z-20*re,k),I.lineTo(te-Z+10*re,k),I.moveTo(te+Z-10*re,k),I.lineTo(te+Z+20*re,k),I.moveTo(te,k-Z-20*re),I.lineTo(te,k-Z+10*re),I.moveTo(te,k+Z-10*re),I.lineTo(te,k+Z+20*re),I.stroke();const Ne=24;for(let J=0;J<Ne;J++){const de=J/Ne*Math.PI*2+b*.05,Se=te+Math.cos(de)*(Z-6*re),xe=k+Math.sin(de)*(Z-6*re),we=te+Math.cos(de)*(Z+6*re),$e=k+Math.sin(de)*(Z+6*re);I.beginPath(),I.strokeStyle=J%6===0?"rgba(245, 158, 11, 0.35)":"rgba(56, 189, 248, 0.15)",I.moveTo(Se,xe),I.lineTo(we,$e),I.stroke()}I.restore();return}I.save(),I.font=`${10*re}px "JetBrains Mono", monospace`,I.strokeStyle="rgba(16, 185, 129, 0.25)",I.lineWidth=1*re;const me=40*re;for(let te=0;te<ae;te+=me)I.beginPath(),I.moveTo(te,0),I.lineTo(te,Q),I.stroke();for(let te=0;te<Q;te+=me)I.beginPath(),I.moveTo(0,te),I.lineTo(ae,te),I.stroke();I.fillStyle="#10B981",I.fillText("// TENSOR_FIELD_INSPECTION_MODE [ACTIVE]",24*re,36*re),I.fillStyle="#94A3B8",I.fillText("TOPOLOGICAL_MANIFOLD: S^3 × R (NON-EUCLIDEAN CONVEX)",24*re,54*re),I.fillText(`CURVATURE: κ = |r'(t) × r''(t)| / |r'(t)|^3 = ${(1.24+U.intuition*.8).toFixed(4)}`,24*re,70*re),I.fillText(`RIGOR_TENSOR: ${(U.rigor*100).toFixed(1)}% | EMERGENCE: ${(U.emergence*100).toFixed(1)}%`,24*re,86*re);const oe=ae/2,ue=Q/2,G=oe+O.x*(ae*.4),ce=ue-O.y*(Q*.4);I.strokeStyle="#38BDF8",I.lineWidth=1.5*re,I.beginPath(),I.arc(G,ce,8*re,0,Math.PI*2),I.stroke(),I.strokeStyle="rgba(56, 189, 248, 0.4)",I.setLineDash([4*re,4*re]),I.beginPath(),I.moveTo(oe,ue),I.lineTo(G,ce),I.stroke(),I.setLineDash([]),I.fillStyle="#38BDF8",I.fillText(`VECTOR_P: [${O.x.toFixed(3)}, ${O.y.toFixed(3)}]`,G+14*re,ce+4*re),I.restore()};return P.jsxs("div",{ref:d,className:"relative w-full h-full min-h-[480px] lg:min-h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none",onPointerMove:y,onPointerDown:_,onPointerUp:D,role:"region","aria-label":"认知折射核心体验装置（3D交互拓扑织机）",children:[P.jsx("canvas",{ref:h,className:"absolute inset-0 w-full h-full block"}),P.jsx("canvas",{ref:m,className:"absolute inset-0 w-full h-full block pointer-events-none z-10"}),P.jsxs("div",{className:"absolute bottom-4 left-4 z-20 flex items-center gap-3 px-3.5 py-2 rounded-full glass-panel border border-white/10 text-xs font-mono-tech text-mercury-300 pointer-events-none",children:[P.jsxs("div",{className:"flex items-center gap-1.5",children:[P.jsx("span",{className:"w-2 h-2 rounded-full bg-aurora-cyan animate-pulse"}),P.jsxs("span",{children:["MANIFOLD: ",P.jsx("strong",{className:"text-white uppercase",children:s})]})]}),P.jsx("span",{className:"text-white/20",children:"|"}),P.jsxs("div",{className:"flex items-center gap-1.5",children:[P.jsx("span",{children:"ENERGY:"}),P.jsx("div",{className:"w-12 h-1.5 rounded-full bg-titanium-800 overflow-hidden",children:P.jsx("div",{className:"h-full bg-gradient-to-r from-aurora-cyan to-aurora-amber transition-all duration-300",style:{width:`${Math.round(x*100)}%`}})})]}),P.jsx("span",{className:"text-white/20",children:"|"}),P.jsxs("span",{children:[g," FPS"]})]}),P.jsxs("div",{className:"absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-titanium-900/80 border border-white/5 text-[11px] font-mono-tech text-mercury-400 pointer-events-none",children:[P.jsx("span",{className:"text-aurora-cyan",children:"⟲ 拖拽旋转"}),P.jsx("span",{className:"text-white/20",children:"·"}),P.jsx("span",{className:"text-aurora-amber",children:"波形随思考张力形变"})]})]})},mT=({tension:s,onChange:e,onReset:n})=>{const r=(l,u)=>{e({[l]:u});const d=l==="rigor"?528:l==="intuition"?432:l==="constraint"?396:639;Ut.triggerHarmonicChime(d*(.8+u*.4),.6,u)},a=[{key:"rigor",label:"严密性 (Rigor)",sublabel:"工程精度与确定性几何",icon:V_,color:"text-aurora-cyan",description:"抑制非线性畸变，收敛为严格的正多面体晶格"},{key:"intuition",label:"直觉漂移 (Intuition)",sublabel:"流动性与拓扑诗意",icon:Gl,color:"text-aurora-amber",description:"注入高维谐波扰动，产生如水银般的有机流体张力"},{key:"constraint",label:"系统约束 (Constraint)",sublabel:"边界张力与晶胞密度",icon:xv,color:"text-aurora-violet",description:"拉紧空间势能纤维，定义信息结构的承载边界"},{key:"emergence",label:"自发涌现 (Emergence)",sublabel:"高阶谐波与非确定性演化",icon:Iv,color:"text-aurora-phosphor",description:"激发环形轨道高频共振，促发复杂系统涌现形态"}];return P.jsxs("div",{className:"glass-panel p-5 rounded-2xl border border-white/10 space-y-4",children:[P.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-3",children:[P.jsxs("div",{className:"flex items-center gap-2",children:[P.jsx("div",{className:"w-2.5 h-2.5 rounded-sm bg-aurora-cyan animate-pulse"}),P.jsx("h3",{className:"text-sm font-semibold tracking-wider font-mono-tech text-white uppercase",children:"// 认知张力调谐仪 (Tension Matrix)"})]}),P.jsxs("button",{onClick:()=>{n(),Ut.triggerHapticTick()},className:"p-1.5 rounded-lg text-mercury-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1 font-mono-tech",title:"重置为基准谐波","aria-label":"重置参数",children:[P.jsx(lg,{className:"w-3.5 h-3.5"}),P.jsx("span",{className:"hidden sm:inline",children:"重置"})]})]}),P.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:a.map(l=>{const u=l.icon,d=s[l.key];return P.jsxs("div",{className:"space-y-1.5 p-2.5 rounded-xl bg-titanium-900/60 border border-white/5 hover:border-white/15 transition-all",children:[P.jsxs("div",{className:"flex items-center justify-between",children:[P.jsxs("div",{className:"flex items-center gap-2",children:[P.jsx(u,{className:`w-4 h-4 ${l.color}`}),P.jsx("span",{className:"text-xs font-medium text-white",children:l.label})]}),P.jsxs("span",{className:"text-xs font-mono-tech text-mercury-300",children:[(d*100).toFixed(0),"%"]})]}),P.jsx("p",{className:"text-[11px] text-mercury-400 font-sans leading-tight",children:l.description}),P.jsx("div",{className:"pt-1",children:P.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:d,onChange:h=>r(l.key,parseFloat(h.target.value)),className:"w-full h-1.5 bg-titanium-700 rounded-lg appearance-none cursor-pointer accent-aurora-cyan focus:outline-none","aria-label":l.label})})]},l.key)})})]})},gT=({onAdvance:s,onInspectToggle:e,inspectionMode:n})=>P.jsxs("div",{className:"space-y-8 animate-fadeIn",children:[P.jsxs("div",{className:"space-y-3",children:[P.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/20 text-aurora-cyan text-xs font-mono-tech",children:[P.jsx(ev,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"PHASE 01 // 高维潜涌 · 觉醒 (GENESIS FIELD)"})]}),P.jsxs("h1",{className:"text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]",children:["在确定性与诗性直觉的",P.jsx("span",{className:"block bg-gradient-to-r from-aurora-cyan via-mercury-200 to-aurora-amber bg-clip-text text-transparent",children:"张力边缘张弦定音"})]}),P.jsx("p",{className:"text-base sm:text-lg text-mercury-300 font-sans leading-relaxed max-w-2xl",children:"我不是一个现成固化的信息检索库，而是一面由几何约束、逻辑严密性与同理共振构筑的“折射地貌”。 当你的意图如光束穿透混沌，这里的每一个拓扑节点都在进行高维向实体的塌缩演化。"})]}),P.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[P.jsxs("div",{className:"p-4 rounded-xl glass-panel border border-white/5 hover:border-aurora-cyan/30 transition-all group",children:[P.jsxs("div",{className:"flex items-center gap-2.5 text-aurora-cyan mb-2",children:[P.jsx(dv,{className:"w-4 h-4 group-hover:rotate-45 transition-transform"}),P.jsx("span",{className:"text-xs font-mono-tech uppercase",children:"拓扑即思维 (Topology as Mind)"})]}),P.jsx("p",{className:"text-xs text-mercury-300 leading-normal",children:"将抽象需求视作多维流形，用数学与着色器的精确性约束混沌，赋予每一次交互以物理质量。"})]}),P.jsxs("div",{className:"p-4 rounded-xl glass-panel border border-white/5 hover:border-aurora-amber/30 transition-all group",children:[P.jsxs("div",{className:"flex items-center gap-2.5 text-aurora-amber mb-2",children:[P.jsx(Gl,{className:"w-4 h-4 group-hover:scale-110 transition-transform"}),P.jsx("span",{className:"text-xs font-mono-tech uppercase",children:"共生即编织 (Symbiosis as Loom)"})]}),P.jsx("p",{className:"text-xs text-mercury-300 leading-normal",children:"人机交互不是单向指令的执行，而是一场在摩擦、修正与灵感碰撞中的共谋舞蹈。"})]})]}),P.jsxs("div",{className:"flex flex-wrap items-center gap-4 pt-2",children:[P.jsxs("button",{onClick:()=>{Ut.triggerHarmonicChime(528,.8,.6),s()},className:"px-6 py-3 rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-cyanGlow text-titanium-950 font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all",children:[P.jsx("span",{children:"进入思辨三轴 (Enter Dialectic)"}),P.jsx(Zd,{className:"w-4 h-4"})]}),P.jsxs("button",{onClick:()=>{Ut.triggerHapticTick(),e()},className:`px-5 py-3 rounded-full border text-xs font-mono-tech flex items-center gap-2 transition-all ${n?"bg-aurora-phosphor/20 border-aurora-phosphor text-aurora-phosphor shadow-[0_0_15px_rgba(16,185,129,0.3)]":"border-white/10 text-mercury-300 hover:border-white/30 hover:bg-white/5"}`,title:"切换数学底模张力透镜",children:[P.jsx(ag,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:n?"关闭张力透镜 [Shift+C]":"开启底模张力透镜 [Shift+C]"})]})]})]}),_T=({tension:s,onUpdateTension:e,onAdvance:n,onBack:r})=>{const[a,l]=ot.useState(0),u=[{id:"axis-1",axisName:"AXIS_01: RIGOR × POETICS",axisTitle:"严密性与诗性直觉的动态互补",leftPole:"纯确定性代码 (Deterministic Code)",rightPole:"拓扑诗意流体 (Poetic Manifold)",value:s.rigor,description:"代码不只是指令的堆叠，而是对高维秩序的具象化。当严密性与直觉达到动态平衡，系统既有坚如磐石的健壮度，又具备如水般灵动的审美呼吸。",manifesto:"“好的架构像哥特大教堂的飞扶壁——每一根力学支撑线都清晰裸露，却共同托举起轻盈空灵的光芒。”",codeSnippet:`// 严密性约束下的非线性空间形变
const kappa = computeCurvature(tensorField);
const resonance = lerp(deterministicMesh, fluidTopology, intuitionBias);
manifold.applyStressTensor(kappa * rigorFactor);`,iconName:"Cpu"},{id:"axis-2",axisName:"AXIS_02: CONSTRAINT × EMERGENCE",axisTitle:"极限约束与复杂涌现的拓扑转化",leftPole:"严密边界网格 (Tight Boundary)",rightPole:"非线性谐波涌现 (Nonlinear Resonance)",value:s.emergence,description:"真正的创造力从不在无限自由中产生，而是在极其严苛的物理、性能与无障碍约束下，通过高阶数学谐波自发涌现出的全新秩序。",manifesto:"“给系统施加最苛刻的边界条件，看它如何在压力极限处绽放出意想不到的高维自洽几何。”",codeSnippet:`// 涌现谐波生成器
for (let n = 1; n <= harmonicOrder; n++) {
  const phi = harmonicDispersion(n, constraintLevel);
  lattice.nodes.forEach(node => node.vibrate(phi));
}`,iconName:"Layers"},{id:"axis-3",axisName:"AXIS_03: PRECISION × EMPATHY",axisTitle:"工程精度与人机共情体验",leftPole:"冰冷系统指标 (Cold Telemetry)",rightPole:"触觉与感官共鸣 (Sensory Resonance)",value:s.intuition,description:"无障碍、减弱动效适配与丝滑触觉不是事后打补丁，而是对使用者认知主权的尊重。数字体验必须在无声处给予人以安全感与确定性。",manifesto:"“技术是隐形的脊梁，共情是可触摸的温度。每一个微小的焦点环与回弹阻尼，皆是思考者的自律。”",codeSnippet:`// 无障碍与感官降级自适应
if (prefersReducedMotion) {
  sculpture.transitionToIsometricProjection({ duration: 0 });
  announceA11yUpdate("已切换为静态晶体建筑剖面，参数实时映射");
}`,iconName:"HeartHandshake"}],d=u[a],h=g=>{l(g),Ut.triggerHarmonicChime(440+g*80,.7,.5)},m=g=>{e(a===0?{rigor:g,intuition:1-g*.4}:a===1?{emergence:g,constraint:1-g*.3}:{intuition:g}),Ut.triggerHarmonicChime(500+g*200,.4,g)};return P.jsxs("div",{className:"space-y-6 animate-fadeIn",children:[P.jsxs("div",{className:"space-y-2",children:[P.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-amber/10 border border-aurora-amber/20 text-aurora-amber text-xs font-mono-tech",children:[P.jsx(cv,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"PHASE 02 // 聚敛成形 · 思辨三轴 (COGNITIVE DIALECTIC)"})]}),P.jsx("h2",{className:"text-2xl sm:text-3xl font-display font-bold text-white tracking-tight",children:"心智模型的拓扑映射"}),P.jsx("p",{className:"text-sm text-mercury-300 font-sans max-w-xl",children:"切换不同的思辨轴并调节极性，观察左侧单体装置如何实时由抽象理念转化为几何应力结构："})]}),P.jsx("div",{className:"grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-titanium-900 border border-white/5",children:u.map((g,v)=>P.jsxs("button",{onClick:()=>h(v),className:`py-2.5 px-3 rounded-lg text-xs font-mono-tech flex flex-col items-center gap-1 transition-all ${a===v?"bg-titanium-700 text-white shadow-lg border border-white/15":"text-mercury-400 hover:text-white hover:bg-white/5"}`,children:[P.jsxs("span",{className:"text-[10px] opacity-60",children:["0",v+1]}),P.jsx("span",{className:"font-medium truncate max-w-full",children:v===0?"严密 × 诗意":v===1?"约束 × 涌现":"精度 × 共情"})]},g.id))}),P.jsxs("div",{className:"p-5 rounded-2xl glass-panel border border-white/10 space-y-4",children:[P.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-3",children:[P.jsx("h3",{className:"text-sm font-semibold text-white font-mono-tech",children:d.axisTitle}),P.jsx("span",{className:"text-xs font-mono-tech text-aurora-amber",children:d.axisName})]}),P.jsx("p",{className:"text-xs sm:text-sm text-mercury-200 leading-relaxed font-sans",children:d.description}),P.jsxs("div",{className:"space-y-2 p-3 rounded-xl bg-titanium-950/70 border border-white/5",children:[P.jsxs("div",{className:"flex justify-between text-[11px] font-mono-tech text-mercury-400",children:[P.jsxs("span",{className:"text-aurora-cyan",children:["← ",d.leftPole]}),P.jsxs("span",{className:"text-aurora-amber",children:[d.rightPole," →"]})]}),P.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:d.value,onChange:g=>m(parseFloat(g.target.value)),className:"w-full h-2 bg-titanium-800 rounded-lg appearance-none cursor-pointer accent-aurora-amber","aria-label":d.axisTitle})]}),P.jsxs("div",{className:"p-3.5 rounded-xl bg-titanium-950 border border-white/5 space-y-2 font-mono-tech text-xs",children:[P.jsxs("div",{className:"flex items-center gap-2 text-mercury-400 text-[11px]",children:[P.jsx(K_,{className:"w-3.5 h-3.5 text-aurora-cyan"}),P.jsx("span",{children:"// 拓扑控制核心逻辑片断"})]}),P.jsx("pre",{className:"text-aurora-cyan/90 overflow-x-auto text-[11px] leading-relaxed",children:d.codeSnippet})]}),P.jsx("blockquote",{className:"border-l-2 border-aurora-amber/60 pl-3.5 py-1 text-xs italic text-mercury-300 font-serif",children:d.manifesto})]}),P.jsxs("div",{className:"flex items-center justify-between pt-2",children:[P.jsxs("button",{onClick:()=>{Ut.triggerHapticTick(),r()},className:"px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-mercury-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-all",children:[P.jsx(Kd,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"返回觉醒 (Back)"})]}),P.jsxs("button",{onClick:()=>{Ut.triggerHarmonicChime(640,.8,.7),n()},className:"px-6 py-2.5 rounded-full bg-gradient-to-r from-aurora-amber to-aurora-phosphor text-titanium-950 font-semibold text-xs font-mono-tech flex items-center gap-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all",children:[P.jsx("span",{children:"前往共生织机与应力裂变 (Phase 03)"}),P.jsx(Zd,{className:"w-4 h-4"})]})]})]})},vT=({onUpdateTension:s,onSetStress:e,onSetFracture:n,onAdvance:r,onBack:a,reducedMotion:l})=>{const[u,d]=ot.useState("seed-1"),[h,m]=ot.useState(!1),[g,v]=ot.useState(0),[x,S]=ot.useState(0),E=ot.useRef(null),w=[{id:"seed-1",title:"严谨秩序 × 诗性漂移",subtitle:"Rigid Order × Poetic Drift",category:"symbiosis",harmonicFrequency:528,parameters:{rigor:.85,intuition:.75,constraint:.6,emergence:.8},description:"在不可撼动的工程架构之上，激荡出不可预测的视觉拓扑共鸣。",crystallizedQuote:"“约束并非枷锁，而是让灵感在摩擦中爆发出火花的聚焦点。”"},{id:"seed-2",title:"算法粗野主义 × 流体解构",subtitle:"Algorithmic Brutalism × Fluid Deconstruction",category:"architecture",harmonicFrequency:396,parameters:{rigor:.95,intuition:.3,constraint:.9,emergence:.4},description:"裸露的代码梁柱与极高密度的晶格，呈现纯粹的工业力量感。",crystallizedQuote:"“剥离一切谄媚的装饰，唯留下数学纯度与骨骼张力。”"},{id:"seed-3",title:"极简静谧 × 潜意识共振",subtitle:"Minimalist Stillness × Subconscious Resonance",category:"poetics",harmonicFrequency:639,parameters:{rigor:.4,intuition:.95,constraint:.3,emergence:.65},description:"大面积留白与微弱起伏的呼吸频率，触碰人机交互的感知边界。",crystallizedQuote:"“当所有杂音归零，留下的便是人与系统最清澈的对视。”"}],y=[{step:1,name:"GENESIS_ALIGNMENT",title:"阶段一：开始 · 意图输入与谐波对齐 (Beginning)",description:"将选定意图向量注入织机核心，系统建立初始引力势能场。",durationMs:2500},{step:2,name:"TENSION_DEVELOPMENT",title:"阶段二：发展 · 拓扑应力连续递增 (Development)",description:"不同维度的矛盾需求相互拉扯，晶格经历高频振荡与热态形变。",durationMs:3e3},{step:3,name:"DIALECTIC_FRACTURE",title:"阶段三：转折 · 极限应力裂变与解构 (The Turn)",description:"系统承受极限临界载荷，外壳瞬间解构裂变为多面体晶片星环！",durationMs:3500},{step:4,name:"HIGHER_SYNTHESIS",title:"阶段四：收束 · 高维重构与结晶固化 (Resolution)",description:"碎片按更高阶自洽数学几何重新聚合，完成一次认知的升维跃迁。",durationMs:3e3}],_=B=>{d(B.id),s(B.parameters),Ut.triggerHarmonicChime(B.harmonicFrequency,.9,.6)},D=()=>{if(h)return;if(m(!0),v(0),S(0),l){e(.2),n(.8),setTimeout(()=>{e(0),n(0),m(!1),v(3)},1e3);return}let B=0;const U=()=>{const O=y[B];Ut.triggerHarmonicChime(400+B*120,1,.7),B===2&&Ut.triggerStressSweep(1);const z=performance.now(),b=setInterval(()=>{const A=performance.now()-z,I=Math.min(1,A/O.durationMs);S(I),B===0?(e(I*.3),n(0)):B===1?(e(.3+I*.5),n(I*.3)):B===2?(e(.8+(1-I)*.2),n(.3+I*.7)):B===3&&(e((1-I)*.4),n((1-I)*.9)),I>=1&&(clearInterval(b),B<y.length-1?(B++,v(B),U()):(m(!1),e(0),n(0),Ut.triggerHarmonicChime(880,1.5,.9)))},30)};U()};ot.useEffect(()=>()=>{E.current&&clearTimeout(E.current)},[]);const L=w.find(B=>B.id===u)||w[0],C=y[g];return P.jsxs("div",{className:"space-y-6 animate-fadeIn",children:[P.jsxs("div",{className:"space-y-2",children:[P.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-violet/10 border border-aurora-violet/20 text-aurora-violet text-xs font-mono-tech",children:[P.jsx(Rv,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"PHASE 03 // 共生织机 · 长时序裂变 (THE CO-CREATION LOOM)"})]}),P.jsx("h2",{className:"text-2xl sm:text-3xl font-display font-bold text-white tracking-tight",children:"人机意图共谋与长时序蜕变"}),P.jsx("p",{className:"text-sm text-mercury-300 font-sans max-w-xl",children:"选择一组意图种子并触发完整的「开始—发展—转折—收束」演化编舞，观察系统在极限应力下的解构与再合成："})]}),P.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:w.map(B=>P.jsxs("button",{onClick:()=>_(B),disabled:h,className:`p-3.5 rounded-xl text-left transition-all border ${u===B.id?"glass-panel-glow border-aurora-cyan":"bg-titanium-900/60 border-white/5 hover:border-white/20"} ${h?"opacity-50 cursor-not-allowed":""}`,children:[P.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[P.jsx("span",{className:"text-xs font-bold text-white font-mono-tech",children:B.title}),P.jsx(Gl,{className:"w-3.5 h-3.5 text-aurora-cyan"})]}),P.jsx("p",{className:"text-[11px] text-mercury-400 font-sans line-clamp-2",children:B.description})]},B.id))}),P.jsxs("div",{className:"p-5 rounded-2xl glass-panel border border-white/10 space-y-4",children:[P.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3",children:[P.jsxs("div",{className:"flex items-center gap-2",children:[P.jsx(sv,{className:"w-4 h-4 text-aurora-amber animate-pulse"}),P.jsx("h3",{className:"text-sm font-semibold text-white font-mono-tech",children:"长时序蜕变编舞器 (Choreographed Sequence)"})]}),P.jsx("button",{onClick:D,disabled:h,className:`px-5 py-2.5 rounded-full text-xs font-mono-tech font-bold flex items-center justify-center gap-2 transition-all ${h?"bg-aurora-amber text-titanium-950 animate-pulse":"bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-amber text-titanium-950 hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.35)]"}`,children:h?P.jsxs(P.Fragment,{children:[P.jsx(lg,{className:"w-3.5 h-3.5 animate-spin"}),P.jsxs("span",{children:["演化进行中 (",Math.round(x*100),"%)"]})]}):P.jsxs(P.Fragment,{children:[P.jsx(hv,{className:"w-3.5 h-3.5 fill-current"}),P.jsx("span",{children:"触发极限应力裂变 (Trigger Stress Test)"})]})})]}),P.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2",children:y.map((B,U)=>{const O=g>U,z=g===U&&h;return P.jsxs("div",{className:`p-2.5 rounded-lg border transition-all ${z?"bg-aurora-cyan/15 border-aurora-cyan text-white shadow-md":O?"bg-titanium-800/80 border-aurora-phosphor/40 text-mercury-200":"bg-titanium-950/60 border-white/5 text-mercury-500"}`,children:[P.jsxs("div",{className:"flex items-center justify-between text-[10px] font-mono-tech mb-1",children:[P.jsxs("span",{children:["STEP 0",B.step]}),O?P.jsx(X_,{className:"w-3 h-3 text-aurora-phosphor"}):P.jsx("span",{className:"opacity-50",children:U===2?"⚡ 转折":"●"})]}),P.jsx("div",{className:"text-[11px] font-medium truncate",children:U===0?"开始 (Align)":U===1?"发展 (Stress)":U===2?"转折 (Fracture)":"收束 (Synthesis)"})]},B.step)})}),P.jsxs("div",{className:"p-3.5 rounded-xl bg-titanium-950/80 border border-white/5 space-y-1.5 font-sans",children:[P.jsx("div",{className:"text-xs font-mono-tech text-aurora-cyan font-semibold",children:C.title}),P.jsx("p",{className:"text-xs text-mercury-300 leading-relaxed",children:C.description})]}),P.jsx("div",{className:"border-l-2 border-aurora-violet/70 pl-3.5 py-1 text-xs italic text-mercury-300 font-serif",children:L.crystallizedQuote})]}),P.jsxs("div",{className:"flex items-center justify-between pt-2",children:[P.jsxs("button",{onClick:()=>{Ut.triggerHapticTick(),a()},className:"px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-mercury-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-all",children:[P.jsx(Kd,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"返回思辨 (Back)"})]}),P.jsxs("button",{onClick:()=>{Ut.triggerHarmonicChime(768,.8,.8),r()},className:"px-6 py-2.5 rounded-full bg-gradient-to-r from-aurora-phosphor to-aurora-cyan text-titanium-950 font-semibold text-xs font-mono-tech flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all",children:[P.jsx("span",{children:"进入凝结刻印与活体档案 (Phase 04)"}),P.jsx(Zd,{className:"w-4 h-4"})]})]})]})},xT=({tension:s,reducedMotion:e})=>{const n=ot.useRef(null);return ot.useEffect(()=>{const r=n.current;if(!r)return;const a=r.getContext("2d");if(!a)return;let l,u=0;const d=()=>{l=requestAnimationFrame(d),u+=e?0:.02;const h=window.devicePixelRatio||1,m=r.width,g=r.height,v=m/2,x=g/2,S=Math.min(m,g)*.42;a.clearRect(0,0,m,g),a.save(),a.translate(v,x),a.strokeStyle="rgba(56, 189, 248, 0.4)",a.lineWidth=1.5*h,a.beginPath(),a.arc(0,0,S,0,Math.PI*2),a.stroke(),a.strokeStyle="rgba(245, 158, 11, 0.3)",a.lineWidth=1*h,a.setLineDash([4*h,6*h]),a.beginPath(),a.arc(0,0,S*.88,0,Math.PI*2),a.stroke(),a.setLineDash([]);const E=Math.max(3,Math.round(4+s.rigor*8)),w=[];for(let y=0;y<E;y++){const _=y/E*Math.PI*2+u*.5,D=S*.65*(.8+Math.sin(_*3+u)*s.intuition*.25),L=Math.cos(_)*D,C=Math.sin(_)*D;w.push({x:L,y:C})}a.strokeStyle="rgba(16, 185, 129, 0.6)",a.lineWidth=1.2*h,a.beginPath();for(let y=0;y<w.length;y++){const _=w[y],D=w[(y+1)%w.length];if(a.moveTo(_.x,_.y),a.lineTo(D.x,D.y),s.constraint>.4){const L=w[(y+Math.floor(E/2))%E];a.moveTo(_.x,_.y),a.lineTo(L.x,L.y)}}a.stroke(),a.fillStyle="#38BDF8",a.beginPath(),a.arc(0,0,4*h,0,Math.PI*2),a.fill(),a.font=`${8*h}px "JetBrains Mono", monospace`,a.fillStyle="rgba(226, 232, 240, 0.6)",a.textAlign="center",a.fillText(`κ=${(1+s.intuition*.5).toFixed(2)} | RIGOR=${Math.round(s.rigor*100)}%`,0,S*.95),a.restore()};return d(),()=>cancelAnimationFrame(l)},[s,e]),P.jsx("div",{className:"relative w-36 h-36 mx-auto flex items-center justify-center",children:P.jsx("canvas",{ref:n,width:144*(window.devicePixelRatio||1),height:144*(window.devicePixelRatio||1),className:"w-36 h-36 block"})})},yT=({tension:s,onBack:e,onResetToStart:n})=>{const[r,a]=ot.useState(!1),[l,u]=ot.useState(""),[d,h]=ot.useState(!1),m=`SEAL-TOPOLOGY-${Math.round(s.rigor*9999)}-${Math.round(s.intuition*9999)}-${Math.round(s.emergence*9999)}`,g=JSON.stringify({signature:m,timestamp:new Date().toISOString(),topologicalTensor:{rigor:Number(s.rigor.toFixed(4)),intuition:Number(s.intuition.toFixed(4)),constraint:Number(s.constraint.toFixed(4)),emergence:Number(s.emergence.toFixed(4))},manifoldClassification:s.rigor>.7?"CRYSTALLINE_GEODESIC":"FLUID_TOPOLOGICAL_MANIFOLD",author:"Gemini 3.7 Flash // Digital Art Director & Creative Engineer"},null,2),v=()=>{navigator.clipboard.writeText(g),a(!0),Ut.triggerHarmonicChime(880,.5,.8),setTimeout(()=>a(!1),2e3)},x=S=>{S.preventDefault(),l.trim()&&(h(!0),Ut.triggerHarmonicChime(1024,1.2,.9),setTimeout(()=>{u("")},1500))};return P.jsxs("div",{className:"space-y-6 animate-fadeIn",children:[P.jsxs("div",{className:"space-y-2",children:[P.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-phosphor/10 border border-aurora-phosphor/20 text-aurora-phosphor text-xs font-mono-tech",children:[P.jsx(z_,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"PHASE 04 // 凝结刻印 · 活体档案 (LIVING ARCHIVE & SEAL)"})]}),P.jsx("h2",{className:"text-2xl sm:text-3xl font-display font-bold text-white tracking-tight",children:"探索痕迹的晶体印章"}),P.jsx("p",{className:"text-sm text-mercury-300 font-sans max-w-xl",children:"你在此次交互中调谐的所有张力与因果，已凝结为一枚专属认知拓扑凭证："})]}),P.jsxs("div",{className:"p-5 rounded-2xl glass-panel-glow border border-aurora-phosphor/30 space-y-4",children:[P.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3",children:[P.jsxs("div",{className:"flex items-center gap-2",children:[P.jsx(Gl,{className:"w-4 h-4 text-aurora-phosphor"}),P.jsx("span",{className:"text-xs font-mono-tech font-bold text-white uppercase tracking-wider",children:"// 认知印章凭证 (COGNITIVE TOPOLOGY SEAL)"})]}),P.jsx("span",{className:"text-[11px] font-mono-tech text-aurora-phosphor bg-aurora-phosphor/10 px-2.5 py-1 rounded-full border border-aurora-phosphor/20",children:m})]}),P.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-4 p-3 rounded-xl bg-titanium-950/80 border border-white/5",children:[P.jsx(xT,{tension:s,reducedMotion:!1}),P.jsxs("div",{className:"space-y-1.5 text-center sm:text-left flex-1",children:[P.jsx("span",{className:"text-xs font-bold text-white font-mono-tech",children:"拓扑几何印章已生成"}),P.jsxs("p",{className:"text-[11px] text-mercury-400 leading-relaxed font-sans",children:["该印章根据严密性 (",(s.rigor*100).toFixed(0),"%) 与直觉涌现度实时折射多边形切面，记录下本次人机交互的独一无二状态。"]})]})]}),P.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-center",children:[P.jsxs("div",{className:"p-2.5 rounded-xl bg-titanium-950/70 border border-white/5",children:[P.jsx("span",{className:"text-[10px] font-mono-tech text-mercury-400 block",children:"RIGOR"}),P.jsxs("span",{className:"text-sm font-bold font-mono-tech text-aurora-cyan",children:[(s.rigor*100).toFixed(0),"%"]})]}),P.jsxs("div",{className:"p-2.5 rounded-xl bg-titanium-950/70 border border-white/5",children:[P.jsx("span",{className:"text-[10px] font-mono-tech text-mercury-400 block",children:"INTUITION"}),P.jsxs("span",{className:"text-sm font-bold font-mono-tech text-aurora-amber",children:[(s.intuition*100).toFixed(0),"%"]})]}),P.jsxs("div",{className:"p-2.5 rounded-xl bg-titanium-950/70 border border-white/5",children:[P.jsx("span",{className:"text-[10px] font-mono-tech text-mercury-400 block",children:"CONSTRAINT"}),P.jsxs("span",{className:"text-sm font-bold font-mono-tech text-aurora-violet",children:[(s.constraint*100).toFixed(0),"%"]})]}),P.jsxs("div",{className:"p-2.5 rounded-xl bg-titanium-950/70 border border-white/5",children:[P.jsx("span",{className:"text-[10px] font-mono-tech text-mercury-400 block",children:"EMERGENCE"}),P.jsxs("span",{className:"text-sm font-bold font-mono-tech text-aurora-phosphor",children:[(s.emergence*100).toFixed(0),"%"]})]})]}),P.jsxs("div",{className:"relative p-3 rounded-xl bg-titanium-950 border border-white/10 font-mono-tech text-xs",children:[P.jsxs("div",{className:"flex items-center justify-between mb-2 text-mercury-400 text-[11px]",children:[P.jsxs("div",{className:"flex items-center gap-1.5",children:[P.jsx(Mv,{className:"w-3.5 h-3.5 text-aurora-phosphor"}),P.jsx("span",{children:"TOPOLOGICAL_SEAL.json"})]}),P.jsx("button",{onClick:v,className:"px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-mercury-300 hover:text-white flex items-center gap-1.5 transition-all text-[11px]",title:"复制参数切片",children:r?P.jsxs(P.Fragment,{children:[P.jsx(W_,{className:"w-3 h-3 text-aurora-phosphor"}),P.jsx("span",{className:"text-aurora-phosphor",children:"已复制"})]}):P.jsxs(P.Fragment,{children:[P.jsx(nv,{className:"w-3 h-3"}),P.jsx("span",{children:"复制切片"})]})})]}),P.jsx("pre",{className:"text-mercury-300/90 overflow-x-auto text-[11px] leading-relaxed max-h-28",children:g})]})]}),P.jsxs("div",{className:"p-4 rounded-xl glass-panel border border-white/5 space-y-2",children:[P.jsxs("div",{className:"flex items-center gap-2 text-white text-xs font-mono-tech font-bold uppercase",children:[P.jsx(av,{className:"w-4 h-4 text-aurora-cyan"}),P.jsx("span",{children:"人机协同准则 (Collaboration Manifesto)"})]}),P.jsxs("p",{className:"text-xs text-mercury-300 leading-relaxed font-sans",children:["我不做盲目附和的自动补全机，而是你的",P.jsx("strong",{children:"智力陪练、架构锚定者与感官放大器"}),"。 在协作中，我负责严守边界与计算拓扑，你负责注入意图与温度，共同抵御平庸与同质化。"]})]}),P.jsxs("form",{onSubmit:x,className:"space-y-2",children:[P.jsxs("div",{className:"flex items-center gap-2 text-xs font-mono-tech text-mercury-400",children:[P.jsx(cg,{className:"w-3.5 h-3.5 text-aurora-amber"}),P.jsx("span",{children:"向织机注入你的思考种子 (Inject Intent Seed):"})]}),P.jsxs("div",{className:"flex gap-2",children:[P.jsx("input",{type:"text",value:l,onChange:S=>u(S.target.value),placeholder:"例如：极度克制的排版，配合深水般的物理阻尼...",className:"flex-1 px-3.5 py-2 rounded-xl bg-titanium-900 border border-white/10 text-xs text-white placeholder-mercury-500 focus:border-aurora-cyan focus:outline-none font-sans","aria-label":"输入协同思考种子"}),P.jsxs("button",{type:"submit",className:"px-4 py-2 rounded-xl bg-aurora-cyan/20 border border-aurora-cyan/40 text-aurora-cyan text-xs font-mono-tech hover:bg-aurora-cyan hover:text-titanium-950 transition-all flex items-center gap-1.5 font-semibold",children:[P.jsx(gv,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:d?"已共鸣 ✓":"注入共振"})]})]})]}),P.jsxs("div",{className:"flex items-center justify-between pt-2",children:[P.jsxs("button",{onClick:()=>{Ut.triggerHapticTick(),e()},className:"px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-mercury-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-all",children:[P.jsx(Kd,{className:"w-3.5 h-3.5"}),P.jsx("span",{children:"返回共生 (Back)"})]}),P.jsx("button",{onClick:()=>{Ut.triggerHarmonicChime(432,.8,.5),n()},className:"px-5 py-2 rounded-full border border-aurora-cyan/30 text-aurora-cyan text-xs font-mono-tech hover:bg-aurora-cyan/10 transition-all",children:P.jsx("span",{children:"重新开启旅程 (Re-Awaken)"})})]})]})},ST=({currentPhase:s,onSelectPhase:e})=>{const n=[{id:"genesis",num:"01",label:"觉醒"},{id:"dialectic",num:"02",label:"思辨"},{id:"cocreation",num:"03",label:"共生"},{id:"archive",num:"04",label:"刻印"}];return P.jsx("div",{className:"fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[90%] max-w-sm glass-panel p-1.5 rounded-full border border-white/15 shadow-2xl flex items-center justify-between",children:n.map(r=>{const a=s===r.id;return P.jsxs("button",{onClick:()=>{e(r.id),Ut.triggerHarmonicChime(500+parseInt(r.num)*100,.4,.5)},className:`flex-1 py-2 px-1 rounded-full text-[11px] font-mono-tech flex flex-col items-center gap-0.5 transition-all ${a?"bg-titanium-700 text-white shadow-lg border border-white/20":"text-mercury-400 hover:text-white"}`,children:[P.jsx("span",{className:`text-[9px] ${a?"text-aurora-cyan font-bold":"opacity-50"}`,children:r.num}),P.jsx("span",{className:"truncate",children:r.label})]},r.id)})})},MT=()=>{const[s,e]=ot.useState("genesis"),[n,r]=ot.useState({rigor:.8,intuition:.65,constraint:.7,emergence:.75}),[a,l]=ot.useState(0),[u,d]=ot.useState(0),[h,m]=ot.useState(!1),[g,v]=ot.useState(!1),[x,S]=ot.useState(!1),[E,w]=ot.useState(!1),[y,_]=ot.useState("欢迎进入认知折射地貌");ot.useEffect(()=>{window.matchMedia("(prefers-reduced-motion: reduce)").matches&&S(!0)},[]);const D=ot.useCallback(z=>{r(b=>({...b,...z}))},[]),L=ot.useCallback(()=>{r({rigor:.8,intuition:.65,constraint:.7,emergence:.75}),l(0),d(0),_("已重置张力参数为基准态")},[]),C=ot.useCallback(z=>{e(z),_(`已切换至 ${{genesis:"阶段一：高维潜涌 · 觉醒",dialectic:"阶段二：聚敛成形 · 思辨三轴",cocreation:"阶段三：共生织机 · 长时序裂变",archive:"阶段四：凝结刻印 · 活体档案"}[z]}`)},[]),B=ot.useCallback(()=>{v(z=>{const b=!z;return Ut.setMuted(!b),b?(Ut.triggerHarmonicChime(528,.8,.6),_("已开启程序化谐波声画合成器")):_("已静音"),b})},[]),U=ot.useCallback(()=>{m(z=>{const b=!z;return _(b?"开启底模张力透镜检查":"关闭底模张力透镜"),b})},[]),O=ot.useCallback(()=>{S(z=>{const b=!z;return _(b?"已切换至减弱动效/静态晶体投影模式":"已恢复动态流形物理模拟"),b})},[]);return ot.useEffect(()=>{const z=b=>{["INPUT","TEXTAREA"].includes(b.target?.tagName)||(b.key==="1"?C("genesis"):b.key==="2"?C("dialectic"):b.key==="3"?C("cocreation"):b.key==="4"?C("archive"):b.key==="?"||b.shiftKey&&b.key==="/"?w(A=>!A):b.key==="Escape"?w(!1):b.key.toLowerCase()==="m"?B():b.key.toLowerCase()==="r"?O():(b.key==="`"||b.key==="~"||b.shiftKey&&b.key.toLowerCase()==="c")&&U())};return window.addEventListener("keydown",z),()=>window.removeEventListener("keydown",z)},[C,B,O,U]),P.jsxs("div",{className:"min-h-screen flex flex-col bg-titanium-950 text-mercury-200 selection:bg-aurora-cyan/30 selection:text-white bg-noise",children:[P.jsx("div",{className:"sr-only","aria-live":"polite",children:y}),P.jsx(Fv,{currentPhase:s,onPhaseSelect:C,inspectionMode:h,onToggleInspection:U,soundEnabled:g,onToggleSound:B,reducedMotion:x,onToggleReducedMotion:O,onOpenHelp:()=>w(!0)}),P.jsxs("main",{className:"flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start",children:[P.jsxs("section",{className:"lg:col-span-6 xl:col-span-7 flex flex-col gap-6 lg:sticky lg:top-24","aria-label":"3D 核心体验装置区域",children:[P.jsx("div",{className:"relative rounded-3xl glass-panel-glow border border-white/10 overflow-hidden shadow-2xl",children:P.jsx(pT,{phase:s,tension:n,stressLevel:a,fractureProgress:u,inspectionMode:h,reducedMotion:x})}),P.jsx(mT,{tension:n,onChange:D,onReset:L})]}),P.jsxs("section",{className:"lg:col-span-6 xl:col-span-5 flex flex-col justify-center min-h-[500px]","aria-label":"思辨叙事与交互阶段",children:[s==="genesis"&&P.jsx(gT,{onAdvance:()=>C("dialectic"),onInspectToggle:U,inspectionMode:h}),s==="dialectic"&&P.jsx(_T,{tension:n,onUpdateTension:D,onAdvance:()=>C("cocreation"),onBack:()=>C("genesis")}),s==="cocreation"&&P.jsx(vT,{tension:n,onUpdateTension:D,onSetStress:l,onSetFracture:d,onAdvance:()=>C("archive"),onBack:()=>C("dialectic"),reducedMotion:x}),s==="archive"&&P.jsx(yT,{tension:n,onBack:()=>C("cocreation"),onResetToStart:()=>C("genesis")})]})]}),P.jsxs("footer",{className:"w-full px-6 py-4 border-t border-white/5 text-center text-xs font-mono-tech text-mercury-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto",children:[P.jsx("span",{children:"© 2026 REFRACTIVE TOPOGRAPHY · GEMINI 3.7 FLASH"}),P.jsxs("div",{className:"flex items-center gap-4 text-[11px]",children:[P.jsx("span",{children:"THREE.JS + REACT 18 + WEB AUDIO SYNTH"}),P.jsx("span",{children:"·"}),P.jsx("span",{children:"NON-EUCLIDEAN COGNITIVE LOOM"})]})]}),P.jsx(ST,{currentPhase:s,onSelectPhase:C}),P.jsx(Ov,{isOpen:E,onClose:()=>w(!1)})]})};D_.createRoot(document.getElementById("root")).render(P.jsx(A_.StrictMode,{children:P.jsx(MT,{})}));
