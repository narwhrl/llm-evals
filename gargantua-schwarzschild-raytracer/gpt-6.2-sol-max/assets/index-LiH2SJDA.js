(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(a){if(a.ep)return;a.ep=!0;const u=n(a);fetch(a.href,u)}})();var pc={exports:{}},Lo={},mc={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp;function G_(){if(Sp)return mt;Sp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=v&&N[v]||N["@@iterator"],typeof N=="function"?N:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,A={};function y(N,re,xe){this.props=N,this.context=re,this.refs=A,this.updater=xe||S}y.prototype.isReactComponent={},y.prototype.setState=function(N,re){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,re,"setState")},y.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function g(){}g.prototype=y.prototype;function F(N,re,xe){this.props=N,this.context=re,this.refs=A,this.updater=xe||S}var L=F.prototype=new g;L.constructor=F,w(L,y.prototype),L.isPureReactComponent=!0;var b=Array.isArray,H=Object.prototype.hasOwnProperty,z={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function q(N,re,xe){var be,pe={},$=null,Z=null;if(re!=null)for(be in re.ref!==void 0&&(Z=re.ref),re.key!==void 0&&($=""+re.key),re)H.call(re,be)&&!k.hasOwnProperty(be)&&(pe[be]=re[be]);var _e=arguments.length-2;if(_e===1)pe.children=xe;else if(1<_e){for(var Ie=Array(_e),ke=0;ke<_e;ke++)Ie[ke]=arguments[ke+2];pe.children=Ie}if(N&&N.defaultProps)for(be in _e=N.defaultProps,_e)pe[be]===void 0&&(pe[be]=_e[be]);return{$$typeof:s,type:N,key:$,ref:Z,props:pe,_owner:z.current}}function R(N,re){return{$$typeof:s,type:N.type,key:re,ref:N.ref,props:N.props,_owner:N._owner}}function C(N){return typeof N=="object"&&N!==null&&N.$$typeof===s}function B(N){var re={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(xe){return re[xe]})}var ne=/\/+/g;function X(N,re){return typeof N=="object"&&N!==null&&N.key!=null?B(""+N.key):re.toString(36)}function j(N,re,xe,be,pe){var $=typeof N;($==="undefined"||$==="boolean")&&(N=null);var Z=!1;if(N===null)Z=!0;else switch($){case"string":case"number":Z=!0;break;case"object":switch(N.$$typeof){case s:case e:Z=!0}}if(Z)return Z=N,pe=pe(Z),N=be===""?"."+X(Z,0):be,b(pe)?(xe="",N!=null&&(xe=N.replace(ne,"$&/")+"/"),j(pe,re,xe,"",function(ke){return ke})):pe!=null&&(C(pe)&&(pe=R(pe,xe+(!pe.key||Z&&Z.key===pe.key?"":(""+pe.key).replace(ne,"$&/")+"/")+N)),re.push(pe)),1;if(Z=0,be=be===""?".":be+":",b(N))for(var _e=0;_e<N.length;_e++){$=N[_e];var Ie=be+X($,_e);Z+=j($,re,xe,Ie,pe)}else if(Ie=x(N),typeof Ie=="function")for(N=Ie.call(N),_e=0;!($=N.next()).done;)$=$.value,Ie=be+X($,_e++),Z+=j($,re,xe,Ie,pe);else if($==="object")throw re=String(N),Error("Objects are not valid as a React child (found: "+(re==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":re)+"). If you meant to render a collection of children, use an array instead.");return Z}function te(N,re,xe){if(N==null)return N;var be=[],pe=0;return j(N,be,"","",function($){return re.call(xe,$,pe++)}),be}function le(N){if(N._status===-1){var re=N._result;re=re(),re.then(function(xe){(N._status===0||N._status===-1)&&(N._status=1,N._result=xe)},function(xe){(N._status===0||N._status===-1)&&(N._status=2,N._result=xe)}),N._status===-1&&(N._status=0,N._result=re)}if(N._status===1)return N._result.default;throw N._result}var fe={current:null},U={transition:null},ue={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:U,ReactCurrentOwner:z};function ae(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:te,forEach:function(N,re,xe){te(N,function(){re.apply(this,arguments)},xe)},count:function(N){var re=0;return te(N,function(){re++}),re},toArray:function(N){return te(N,function(re){return re})||[]},only:function(N){if(!C(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},mt.Component=y,mt.Fragment=n,mt.Profiler=a,mt.PureComponent=F,mt.StrictMode=r,mt.Suspense=m,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ue,mt.act=ae,mt.cloneElement=function(N,re,xe){if(N==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+N+".");var be=w({},N.props),pe=N.key,$=N.ref,Z=N._owner;if(re!=null){if(re.ref!==void 0&&($=re.ref,Z=z.current),re.key!==void 0&&(pe=""+re.key),N.type&&N.type.defaultProps)var _e=N.type.defaultProps;for(Ie in re)H.call(re,Ie)&&!k.hasOwnProperty(Ie)&&(be[Ie]=re[Ie]===void 0&&_e!==void 0?_e[Ie]:re[Ie])}var Ie=arguments.length-2;if(Ie===1)be.children=xe;else if(1<Ie){_e=Array(Ie);for(var ke=0;ke<Ie;ke++)_e[ke]=arguments[ke+2];be.children=_e}return{$$typeof:s,type:N.type,key:pe,ref:$,props:be,_owner:Z}},mt.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},N.Provider={$$typeof:u,_context:N},N.Consumer=N},mt.createElement=q,mt.createFactory=function(N){var re=q.bind(null,N);return re.type=N,re},mt.createRef=function(){return{current:null}},mt.forwardRef=function(N){return{$$typeof:d,render:N}},mt.isValidElement=C,mt.lazy=function(N){return{$$typeof:_,_payload:{_status:-1,_result:N},_init:le}},mt.memo=function(N,re){return{$$typeof:p,type:N,compare:re===void 0?null:re}},mt.startTransition=function(N){var re=U.transition;U.transition={};try{N()}finally{U.transition=re}},mt.unstable_act=ae,mt.useCallback=function(N,re){return fe.current.useCallback(N,re)},mt.useContext=function(N){return fe.current.useContext(N)},mt.useDebugValue=function(){},mt.useDeferredValue=function(N){return fe.current.useDeferredValue(N)},mt.useEffect=function(N,re){return fe.current.useEffect(N,re)},mt.useId=function(){return fe.current.useId()},mt.useImperativeHandle=function(N,re,xe){return fe.current.useImperativeHandle(N,re,xe)},mt.useInsertionEffect=function(N,re){return fe.current.useInsertionEffect(N,re)},mt.useLayoutEffect=function(N,re){return fe.current.useLayoutEffect(N,re)},mt.useMemo=function(N,re){return fe.current.useMemo(N,re)},mt.useReducer=function(N,re,xe){return fe.current.useReducer(N,re,xe)},mt.useRef=function(N){return fe.current.useRef(N)},mt.useState=function(N){return fe.current.useState(N)},mt.useSyncExternalStore=function(N,re,xe){return fe.current.useSyncExternalStore(N,re,xe)},mt.useTransition=function(){return fe.current.useTransition()},mt.version="18.3.1",mt}var Ep;function Bf(){return Ep||(Ep=1,mc.exports=G_()),mc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mp;function W_(){if(Mp)return Lo;Mp=1;var s=Bf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function f(d,m,p){var _,v={},x=null,S=null;p!==void 0&&(x=""+p),m.key!==void 0&&(x=""+m.key),m.ref!==void 0&&(S=m.ref);for(_ in m)r.call(m,_)&&!u.hasOwnProperty(_)&&(v[_]=m[_]);if(d&&d.defaultProps)for(_ in m=d.defaultProps,m)v[_]===void 0&&(v[_]=m[_]);return{$$typeof:e,type:d,key:x,ref:S,props:v,_owner:a.current}}return Lo.Fragment=n,Lo.jsx=f,Lo.jsxs=f,Lo}var Tp;function X_(){return Tp||(Tp=1,pc.exports=W_()),pc.exports}var Re=X_(),tl={},gc={exports:{}},Dn={},_c={exports:{}},vc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wp;function j_(){return wp||(wp=1,(function(s){function e(U,ue){var ae=U.length;U.push(ue);e:for(;0<ae;){var N=ae-1>>>1,re=U[N];if(0<a(re,ue))U[N]=ue,U[ae]=re,ae=N;else break e}}function n(U){return U.length===0?null:U[0]}function r(U){if(U.length===0)return null;var ue=U[0],ae=U.pop();if(ae!==ue){U[0]=ae;e:for(var N=0,re=U.length,xe=re>>>1;N<xe;){var be=2*(N+1)-1,pe=U[be],$=be+1,Z=U[$];if(0>a(pe,ae))$<re&&0>a(Z,pe)?(U[N]=Z,U[$]=ae,N=$):(U[N]=pe,U[be]=ae,N=be);else if($<re&&0>a(Z,ae))U[N]=Z,U[$]=ae,N=$;else break e}}return ue}function a(U,ue){var ae=U.sortIndex-ue.sortIndex;return ae!==0?ae:U.id-ue.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;s.unstable_now=function(){return u.now()}}else{var f=Date,d=f.now();s.unstable_now=function(){return f.now()-d}}var m=[],p=[],_=1,v=null,x=3,S=!1,w=!1,A=!1,y=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function L(U){for(var ue=n(p);ue!==null;){if(ue.callback===null)r(p);else if(ue.startTime<=U)r(p),ue.sortIndex=ue.expirationTime,e(m,ue);else break;ue=n(p)}}function b(U){if(A=!1,L(U),!w)if(n(m)!==null)w=!0,le(H);else{var ue=n(p);ue!==null&&fe(b,ue.startTime-U)}}function H(U,ue){w=!1,A&&(A=!1,g(q),q=-1),S=!0;var ae=x;try{for(L(ue),v=n(m);v!==null&&(!(v.expirationTime>ue)||U&&!B());){var N=v.callback;if(typeof N=="function"){v.callback=null,x=v.priorityLevel;var re=N(v.expirationTime<=ue);ue=s.unstable_now(),typeof re=="function"?v.callback=re:v===n(m)&&r(m),L(ue)}else r(m);v=n(m)}if(v!==null)var xe=!0;else{var be=n(p);be!==null&&fe(b,be.startTime-ue),xe=!1}return xe}finally{v=null,x=ae,S=!1}}var z=!1,k=null,q=-1,R=5,C=-1;function B(){return!(s.unstable_now()-C<R)}function ne(){if(k!==null){var U=s.unstable_now();C=U;var ue=!0;try{ue=k(!0,U)}finally{ue?X():(z=!1,k=null)}}else z=!1}var X;if(typeof F=="function")X=function(){F(ne)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,te=j.port2;j.port1.onmessage=ne,X=function(){te.postMessage(null)}}else X=function(){y(ne,0)};function le(U){k=U,z||(z=!0,X())}function fe(U,ue){q=y(function(){U(s.unstable_now())},ue)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(U){U.callback=null},s.unstable_continueExecution=function(){w||S||(w=!0,le(H))},s.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<U?Math.floor(1e3/U):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return n(m)},s.unstable_next=function(U){switch(x){case 1:case 2:case 3:var ue=3;break;default:ue=x}var ae=x;x=ue;try{return U()}finally{x=ae}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(U,ue){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var ae=x;x=U;try{return ue()}finally{x=ae}},s.unstable_scheduleCallback=function(U,ue,ae){var N=s.unstable_now();switch(typeof ae=="object"&&ae!==null?(ae=ae.delay,ae=typeof ae=="number"&&0<ae?N+ae:N):ae=N,U){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=ae+re,U={id:_++,callback:ue,priorityLevel:U,startTime:ae,expirationTime:re,sortIndex:-1},ae>N?(U.sortIndex=ae,e(p,U),n(m)===null&&U===n(p)&&(A?(g(q),q=-1):A=!0,fe(b,ae-N))):(U.sortIndex=re,e(m,U),w||S||(w=!0,le(H))),U},s.unstable_shouldYield=B,s.unstable_wrapCallback=function(U){var ue=x;return function(){var ae=x;x=ue;try{return U.apply(this,arguments)}finally{x=ae}}}})(vc)),vc}var Ap;function Y_(){return Ap||(Ap=1,_c.exports=j_()),_c.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rp;function q_(){if(Rp)return Dn;Rp=1;var s=Bf(),e=Y_();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function u(t,i){f(t,i),f(t+"Capture",i)}function f(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),m=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},v={};function x(t){return m.call(v,t)?!0:m.call(_,t)?!1:p.test(t)?v[t]=!0:(_[t]=!0,!1)}function S(t,i,o,l){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return l?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function w(t,i,o,l){if(i===null||typeof i>"u"||S(t,i,o,l))return!0;if(l)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function A(t,i,o,l,c,h,E){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=l,this.attributeNamespace=c,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=h,this.removeEmptyString=E}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){y[t]=new A(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];y[i]=new A(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){y[t]=new A(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){y[t]=new A(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){y[t]=new A(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){y[t]=new A(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){y[t]=new A(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){y[t]=new A(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){y[t]=new A(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function F(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,F);y[i]=new A(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,F);y[i]=new A(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,F);y[i]=new A(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){y[t]=new A(t,1,!1,t.toLowerCase(),null,!1,!1)}),y.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){y[t]=new A(t,1,!1,t.toLowerCase(),null,!0,!0)});function L(t,i,o,l){var c=y.hasOwnProperty(i)?y[i]:null;(c!==null?c.type!==0:l||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(w(i,o,c,l)&&(o=null),l||c===null?x(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):c.mustUseProperty?t[c.propertyName]=o===null?c.type===3?!1:"":o:(i=c.attributeName,l=c.attributeNamespace,o===null?t.removeAttribute(i):(c=c.type,o=c===3||c===4&&o===!0?"":""+o,l?t.setAttributeNS(l,i,o):t.setAttribute(i,o))))}var b=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,H=Symbol.for("react.element"),z=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),B=Symbol.for("react.context"),ne=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),te=Symbol.for("react.memo"),le=Symbol.for("react.lazy"),fe=Symbol.for("react.offscreen"),U=Symbol.iterator;function ue(t){return t===null||typeof t!="object"?null:(t=U&&t[U]||t["@@iterator"],typeof t=="function"?t:null)}var ae=Object.assign,N;function re(t){if(N===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);N=i&&i[1]||""}return`
`+N+t}var xe=!1;function be(t,i){if(!t||xe)return"";xe=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ie){var l=ie}Reflect.construct(t,[],i)}else{try{i.call()}catch(ie){l=ie}t.call(i.prototype)}else{try{throw Error()}catch(ie){l=ie}t()}}catch(ie){if(ie&&l&&typeof ie.stack=="string"){for(var c=ie.stack.split(`
`),h=l.stack.split(`
`),E=c.length-1,D=h.length-1;1<=E&&0<=D&&c[E]!==h[D];)D--;for(;1<=E&&0<=D;E--,D--)if(c[E]!==h[D]){if(E!==1||D!==1)do if(E--,D--,0>D||c[E]!==h[D]){var O=`
`+c[E].replace(" at new "," at ");return t.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",t.displayName)),O}while(1<=E&&0<=D);break}}}finally{xe=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?re(t):""}function pe(t){switch(t.tag){case 5:return re(t.type);case 16:return re("Lazy");case 13:return re("Suspense");case 19:return re("SuspenseList");case 0:case 2:case 15:return t=be(t.type,!1),t;case 11:return t=be(t.type.render,!1),t;case 1:return t=be(t.type,!0),t;default:return""}}function $(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case k:return"Fragment";case z:return"Portal";case R:return"Profiler";case q:return"StrictMode";case X:return"Suspense";case j:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case B:return(t.displayName||"Context")+".Consumer";case C:return(t._context.displayName||"Context")+".Provider";case ne:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case te:return i=t.displayName||null,i!==null?i:$(t.type)||"Memo";case le:i=t._payload,t=t._init;try{return $(t(i))}catch{}}return null}function Z(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $(i);case 8:return i===q?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function _e(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ie(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function ke(t){var i=Ie(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),l=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,h=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return c.call(this)},set:function(E){l=""+E,h.call(this,E)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return l},setValue:function(E){l=""+E},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function pt(t){t._valueTracker||(t._valueTracker=ke(t))}function $t(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),l="";return t&&(l=Ie(t)?t.checked?"true":"false":t.value),t=l,t!==o?(i.setValue(t),!0):!1}function I(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Rt(t,i){var o=i.checked;return ae({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function ut(t,i){var o=i.defaultValue==null?"":i.defaultValue,l=i.checked!=null?i.checked:i.defaultChecked;o=_e(i.value!=null?i.value:o),t._wrapperState={initialChecked:l,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function nt(t,i){i=i.checked,i!=null&&L(t,"checked",i,!1)}function Ge(t,i){nt(t,i);var o=_e(i.value),l=i.type;if(o!=null)l==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(l==="submit"||l==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?We(t,i.type,o):i.hasOwnProperty("defaultValue")&&We(t,i.type,_e(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function Lt(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var l=i.type;if(!(l!=="submit"&&l!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function We(t,i,o){(i!=="number"||I(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var at=Array.isArray;function Ot(t,i,o,l){if(t=t.options,i){i={};for(var c=0;c<o.length;c++)i["$"+o[c]]=!0;for(o=0;o<t.length;o++)c=i.hasOwnProperty("$"+t[o].value),t[o].selected!==c&&(t[o].selected=c),c&&l&&(t[o].defaultSelected=!0)}else{for(o=""+_e(o),i=null,c=0;c<t.length;c++){if(t[c].value===o){t[c].selected=!0,l&&(t[c].defaultSelected=!0);return}i!==null||t[c].disabled||(i=t[c])}i!==null&&(i.selected=!0)}}function kt(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return ae({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function P(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(at(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:_e(o)}}function M(t,i){var o=_e(i.value),l=_e(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),l!=null&&(t.defaultValue=""+l)}function Q(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function de(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ge(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?de(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ce,Ke=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,l,c){MSApp.execUnsafeLocalFunction(function(){return t(i,o,l,c)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(ce=ce||document.createElement("div"),ce.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=ce.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function Ae(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var Be={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$e=["Webkit","ms","Moz","O"];Object.keys(Be).forEach(function(t){$e.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),Be[i]=Be[t]})});function Te(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Be.hasOwnProperty(t)&&Be[t]?(""+i).trim():i+"px"}function Ne(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var l=o.indexOf("--")===0,c=Te(o,i[o],l);o==="float"&&(o="cssFloat"),l?t.setProperty(o,c):t[o]=c}}var it=ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ye(t,i){if(i){if(it[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function Pe(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ct=null;function V(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ee=null,Ce=null,Ue=null;function Se(t){if(t=_o(t)){if(typeof Ee!="function")throw Error(n(280));var i=t.stateNode;i&&(i=ga(i),Ee(t.stateNode,t.type,i))}}function he(t){Ce?Ue?Ue.push(t):Ue=[t]:Ce=t}function Xe(){if(Ce){var t=Ce,i=Ue;if(Ue=Ce=null,Se(t),i)for(t=0;t<i.length;t++)Se(i[t])}}function lt(t,i){return t(i)}function wt(){}var xt=!1;function Wn(t,i,o){if(xt)return t(i,o);xt=!0;try{return lt(t,i,o)}finally{xt=!1,(Ce!==null||Ue!==null)&&(wt(),Xe())}}function fn(t,i){var o=t.stateNode;if(o===null)return null;var l=ga(o);if(l===null)return null;o=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var ts=!1;if(d)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){ts=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{ts=!1}function Js(t,i,o,l,c,h,E,D,O){var ie=Array.prototype.slice.call(arguments,3);try{i.apply(o,ie)}catch(ve){this.onError(ve)}}var Wi=!1,Mr=null,Ei=!1,ns=null,is={onError:function(t){Wi=!0,Mr=t}};function Ko(t,i,o,l,c,h,E,D,O){Wi=!1,Mr=null,Js.apply(is,arguments)}function $o(t,i,o,l,c,h,E,D,O){if(Ko.apply(this,arguments),Wi){if(Wi){var ie=Mr;Wi=!1,Mr=null}else throw Error(n(198));Ei||(Ei=!0,ns=ie)}}function Mi(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Zo(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function Qo(t){if(Mi(t)!==t)throw Error(n(188))}function Ol(t){var i=t.alternate;if(!i){if(i=Mi(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,l=i;;){var c=o.return;if(c===null)break;var h=c.alternate;if(h===null){if(l=c.return,l!==null){o=l;continue}break}if(c.child===h.child){for(h=c.child;h;){if(h===o)return Qo(c),t;if(h===l)return Qo(c),i;h=h.sibling}throw Error(n(188))}if(o.return!==l.return)o=c,l=h;else{for(var E=!1,D=c.child;D;){if(D===o){E=!0,o=c,l=h;break}if(D===l){E=!0,l=c,o=h;break}D=D.sibling}if(!E){for(D=h.child;D;){if(D===o){E=!0,o=h,l=c;break}if(D===l){E=!0,l=h,o=c;break}D=D.sibling}if(!E)throw Error(n(189))}}if(o.alternate!==l)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function Jo(t){return t=Ol(t),t!==null?ea(t):null}function ea(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=ea(t);if(i!==null)return i;t=t.sibling}return null}var T=e.unstable_scheduleCallback,Y=e.unstable_cancelCallback,se=e.unstable_shouldYield,oe=e.unstable_requestPaint,W=e.unstable_now,Me=e.unstable_getCurrentPriorityLevel,De=e.unstable_ImmediatePriority,He=e.unstable_UserBlockingPriority,Fe=e.unstable_NormalPriority,tt=e.unstable_LowPriority,rt=e.unstable_IdlePriority,Ze=null,st=null;function Tt(t){if(st&&typeof st.onCommitFiberRoot=="function")try{st.onCommitFiberRoot(Ze,t,void 0,(t.current.flags&128)===128)}catch{}}var yt=Math.clz32?Math.clz32:Qe,Nt=Math.log,At=Math.LN2;function Qe(t){return t>>>=0,t===0?32:31-(Nt(t)/At|0)|0}var Ct=64,_t=4194304;function Zt(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Jn(t,i){var o=t.pendingLanes;if(o===0)return 0;var l=0,c=t.suspendedLanes,h=t.pingedLanes,E=o&268435455;if(E!==0){var D=E&~c;D!==0?l=Zt(D):(h&=E,h!==0&&(l=Zt(h)))}else E=o&~c,E!==0?l=Zt(E):h!==0&&(l=Zt(h));if(l===0)return 0;if(i!==0&&i!==l&&(i&c)===0&&(c=l&-l,h=i&-i,c>=h||c===16&&(h&4194240)!==0))return i;if((l&4)!==0&&(l|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=l;0<i;)o=31-yt(i),c=1<<o,l|=t[o],i&=~c;return l}function yn(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tr(t,i){for(var o=t.suspendedLanes,l=t.pingedLanes,c=t.expirationTimes,h=t.pendingLanes;0<h;){var E=31-yt(h),D=1<<E,O=c[E];O===-1?((D&o)===0||(D&l)!==0)&&(c[E]=yn(D,i)):O<=i&&(t.expiredLanes|=D),h&=~D}}function It(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Sn(){var t=Ct;return Ct<<=1,(Ct&4194240)===0&&(Ct=64),t}function dn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function Xt(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-yt(i),t[i]=o}function hn(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var l=t.eventTimes;for(t=t.expirationTimes;0<o;){var c=31-yt(o),h=1<<c;i[c]=0,l[c]=-1,t[c]=-1,o&=~h}}function wr(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var l=31-yt(o),c=1<<l;c&i|t[l]&i&&(t[l]|=i),o&=~c}}var vt=0;function Jf(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var ed,kl,td,nd,id,zl=!1,ta=[],Xi=null,ji=null,Yi=null,eo=new Map,to=new Map,qi=[],fg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rd(t,i){switch(t){case"focusin":case"focusout":Xi=null;break;case"dragenter":case"dragleave":ji=null;break;case"mouseover":case"mouseout":Yi=null;break;case"pointerover":case"pointerout":eo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":to.delete(i.pointerId)}}function no(t,i,o,l,c,h){return t===null||t.nativeEvent!==h?(t={blockedOn:i,domEventName:o,eventSystemFlags:l,nativeEvent:h,targetContainers:[c]},i!==null&&(i=_o(i),i!==null&&kl(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,c!==null&&i.indexOf(c)===-1&&i.push(c),t)}function dg(t,i,o,l,c){switch(i){case"focusin":return Xi=no(Xi,t,i,o,l,c),!0;case"dragenter":return ji=no(ji,t,i,o,l,c),!0;case"mouseover":return Yi=no(Yi,t,i,o,l,c),!0;case"pointerover":var h=c.pointerId;return eo.set(h,no(eo.get(h)||null,t,i,o,l,c)),!0;case"gotpointercapture":return h=c.pointerId,to.set(h,no(to.get(h)||null,t,i,o,l,c)),!0}return!1}function sd(t){var i=Ar(t.target);if(i!==null){var o=Mi(i);if(o!==null){if(i=o.tag,i===13){if(i=Zo(o),i!==null){t.blockedOn=i,id(t.priority,function(){td(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function na(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Hl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var l=new o.constructor(o.type,o);ct=l,o.target.dispatchEvent(l),ct=null}else return i=_o(o),i!==null&&kl(i),t.blockedOn=o,!1;i.shift()}return!0}function od(t,i,o){na(t)&&o.delete(i)}function hg(){zl=!1,Xi!==null&&na(Xi)&&(Xi=null),ji!==null&&na(ji)&&(ji=null),Yi!==null&&na(Yi)&&(Yi=null),eo.forEach(od),to.forEach(od)}function io(t,i){t.blockedOn===i&&(t.blockedOn=null,zl||(zl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,hg)))}function ro(t){function i(c){return io(c,t)}if(0<ta.length){io(ta[0],t);for(var o=1;o<ta.length;o++){var l=ta[o];l.blockedOn===t&&(l.blockedOn=null)}}for(Xi!==null&&io(Xi,t),ji!==null&&io(ji,t),Yi!==null&&io(Yi,t),eo.forEach(i),to.forEach(i),o=0;o<qi.length;o++)l=qi[o],l.blockedOn===t&&(l.blockedOn=null);for(;0<qi.length&&(o=qi[0],o.blockedOn===null);)sd(o),o.blockedOn===null&&qi.shift()}var rs=b.ReactCurrentBatchConfig,ia=!0;function pg(t,i,o,l){var c=vt,h=rs.transition;rs.transition=null;try{vt=1,Bl(t,i,o,l)}finally{vt=c,rs.transition=h}}function mg(t,i,o,l){var c=vt,h=rs.transition;rs.transition=null;try{vt=4,Bl(t,i,o,l)}finally{vt=c,rs.transition=h}}function Bl(t,i,o,l){if(ia){var c=Hl(t,i,o,l);if(c===null)ru(t,i,l,ra,o),rd(t,l);else if(dg(c,t,i,o,l))l.stopPropagation();else if(rd(t,l),i&4&&-1<fg.indexOf(t)){for(;c!==null;){var h=_o(c);if(h!==null&&ed(h),h=Hl(t,i,o,l),h===null&&ru(t,i,l,ra,o),h===c)break;c=h}c!==null&&l.stopPropagation()}else ru(t,i,l,null,o)}}var ra=null;function Hl(t,i,o,l){if(ra=null,t=V(l),t=Ar(t),t!==null)if(i=Mi(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Zo(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return ra=t,null}function ad(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Me()){case De:return 1;case He:return 4;case Fe:case tt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Ki=null,Vl=null,sa=null;function ld(){if(sa)return sa;var t,i=Vl,o=i.length,l,c="value"in Ki?Ki.value:Ki.textContent,h=c.length;for(t=0;t<o&&i[t]===c[t];t++);var E=o-t;for(l=1;l<=E&&i[o-l]===c[h-l];l++);return sa=c.slice(t,1<l?1-l:void 0)}function oa(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function aa(){return!0}function ud(){return!1}function Fn(t){function i(o,l,c,h,E){this._reactName=o,this._targetInst=c,this.type=l,this.nativeEvent=h,this.target=E,this.currentTarget=null;for(var D in t)t.hasOwnProperty(D)&&(o=t[D],this[D]=o?o(h):h[D]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?aa:ud,this.isPropagationStopped=ud,this}return ae(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=aa)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=aa)},persist:function(){},isPersistent:aa}),i}var ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gl=Fn(ss),so=ae({},ss,{view:0,detail:0}),gg=Fn(so),Wl,Xl,oo,la=ae({},so,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Yl,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==oo&&(oo&&t.type==="mousemove"?(Wl=t.screenX-oo.screenX,Xl=t.screenY-oo.screenY):Xl=Wl=0,oo=t),Wl)},movementY:function(t){return"movementY"in t?t.movementY:Xl}}),cd=Fn(la),_g=ae({},la,{dataTransfer:0}),vg=Fn(_g),xg=ae({},so,{relatedTarget:0}),jl=Fn(xg),yg=ae({},ss,{animationName:0,elapsedTime:0,pseudoElement:0}),Sg=Fn(yg),Eg=ae({},ss,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Mg=Fn(Eg),Tg=ae({},ss,{data:0}),fd=Fn(Tg),wg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ag={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Rg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cg(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Rg[t])?!!i[t]:!1}function Yl(){return Cg}var bg=ae({},so,{key:function(t){if(t.key){var i=wg[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=oa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ag[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Yl,charCode:function(t){return t.type==="keypress"?oa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?oa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Pg=Fn(bg),Dg=ae({},la,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dd=Fn(Dg),Lg=ae({},so,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Yl}),Ng=Fn(Lg),Ig=ae({},ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ug=Fn(Ig),Fg=ae({},la,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Og=Fn(Fg),kg=[9,13,27,32],ql=d&&"CompositionEvent"in window,ao=null;d&&"documentMode"in document&&(ao=document.documentMode);var zg=d&&"TextEvent"in window&&!ao,hd=d&&(!ql||ao&&8<ao&&11>=ao),pd=" ",md=!1;function gd(t,i){switch(t){case"keyup":return kg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _d(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var os=!1;function Bg(t,i){switch(t){case"compositionend":return _d(i);case"keypress":return i.which!==32?null:(md=!0,pd);case"textInput":return t=i.data,t===pd&&md?null:t;default:return null}}function Hg(t,i){if(os)return t==="compositionend"||!ql&&gd(t,i)?(t=ld(),sa=Vl=Ki=null,os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return hd&&i.locale!=="ko"?null:i.data;default:return null}}var Vg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vd(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Vg[t.type]:i==="textarea"}function xd(t,i,o,l){he(l),i=ha(i,"onChange"),0<i.length&&(o=new Gl("onChange","change",null,o,l),t.push({event:o,listeners:i}))}var lo=null,uo=null;function Gg(t){Od(t,0)}function ua(t){var i=fs(t);if($t(i))return t}function Wg(t,i){if(t==="change")return i}var yd=!1;if(d){var Kl;if(d){var $l="oninput"in document;if(!$l){var Sd=document.createElement("div");Sd.setAttribute("oninput","return;"),$l=typeof Sd.oninput=="function"}Kl=$l}else Kl=!1;yd=Kl&&(!document.documentMode||9<document.documentMode)}function Ed(){lo&&(lo.detachEvent("onpropertychange",Md),uo=lo=null)}function Md(t){if(t.propertyName==="value"&&ua(uo)){var i=[];xd(i,uo,t,V(t)),Wn(Gg,i)}}function Xg(t,i,o){t==="focusin"?(Ed(),lo=i,uo=o,lo.attachEvent("onpropertychange",Md)):t==="focusout"&&Ed()}function jg(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ua(uo)}function Yg(t,i){if(t==="click")return ua(i)}function qg(t,i){if(t==="input"||t==="change")return ua(i)}function Kg(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ei=typeof Object.is=="function"?Object.is:Kg;function co(t,i){if(ei(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),l=Object.keys(i);if(o.length!==l.length)return!1;for(l=0;l<o.length;l++){var c=o[l];if(!m.call(i,c)||!ei(t[c],i[c]))return!1}return!0}function Td(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function wd(t,i){var o=Td(t);t=0;for(var l;o;){if(o.nodeType===3){if(l=t+o.textContent.length,t<=i&&l>=i)return{node:o,offset:i-t};t=l}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Td(o)}}function Ad(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Ad(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Rd(){for(var t=window,i=I();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=I(t.document)}return i}function Zl(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function $g(t){var i=Rd(),o=t.focusedElem,l=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&Ad(o.ownerDocument.documentElement,o)){if(l!==null&&Zl(o)){if(i=l.start,t=l.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var c=o.textContent.length,h=Math.min(l.start,c);l=l.end===void 0?h:Math.min(l.end,c),!t.extend&&h>l&&(c=l,l=h,h=c),c=wd(o,h);var E=wd(o,l);c&&E&&(t.rangeCount!==1||t.anchorNode!==c.node||t.anchorOffset!==c.offset||t.focusNode!==E.node||t.focusOffset!==E.offset)&&(i=i.createRange(),i.setStart(c.node,c.offset),t.removeAllRanges(),h>l?(t.addRange(i),t.extend(E.node,E.offset)):(i.setEnd(E.node,E.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Zg=d&&"documentMode"in document&&11>=document.documentMode,as=null,Ql=null,fo=null,Jl=!1;function Cd(t,i,o){var l=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Jl||as==null||as!==I(l)||(l=as,"selectionStart"in l&&Zl(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),fo&&co(fo,l)||(fo=l,l=ha(Ql,"onSelect"),0<l.length&&(i=new Gl("onSelect","select",null,i,o),t.push({event:i,listeners:l}),i.target=as)))}function ca(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var ls={animationend:ca("Animation","AnimationEnd"),animationiteration:ca("Animation","AnimationIteration"),animationstart:ca("Animation","AnimationStart"),transitionend:ca("Transition","TransitionEnd")},eu={},bd={};d&&(bd=document.createElement("div").style,"AnimationEvent"in window||(delete ls.animationend.animation,delete ls.animationiteration.animation,delete ls.animationstart.animation),"TransitionEvent"in window||delete ls.transitionend.transition);function fa(t){if(eu[t])return eu[t];if(!ls[t])return t;var i=ls[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in bd)return eu[t]=i[o];return t}var Pd=fa("animationend"),Dd=fa("animationiteration"),Ld=fa("animationstart"),Nd=fa("transitionend"),Id=new Map,Ud="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $i(t,i){Id.set(t,i),u(i,[t])}for(var tu=0;tu<Ud.length;tu++){var nu=Ud[tu],Qg=nu.toLowerCase(),Jg=nu[0].toUpperCase()+nu.slice(1);$i(Qg,"on"+Jg)}$i(Pd,"onAnimationEnd"),$i(Dd,"onAnimationIteration"),$i(Ld,"onAnimationStart"),$i("dblclick","onDoubleClick"),$i("focusin","onFocus"),$i("focusout","onBlur"),$i(Nd,"onTransitionEnd"),f("onMouseEnter",["mouseout","mouseover"]),f("onMouseLeave",["mouseout","mouseover"]),f("onPointerEnter",["pointerout","pointerover"]),f("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),e_=new Set("cancel close invalid load scroll toggle".split(" ").concat(ho));function Fd(t,i,o){var l=t.type||"unknown-event";t.currentTarget=o,$o(l,i,void 0,t),t.currentTarget=null}function Od(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var l=t[o],c=l.event;l=l.listeners;e:{var h=void 0;if(i)for(var E=l.length-1;0<=E;E--){var D=l[E],O=D.instance,ie=D.currentTarget;if(D=D.listener,O!==h&&c.isPropagationStopped())break e;Fd(c,D,ie),h=O}else for(E=0;E<l.length;E++){if(D=l[E],O=D.instance,ie=D.currentTarget,D=D.listener,O!==h&&c.isPropagationStopped())break e;Fd(c,D,ie),h=O}}}if(Ei)throw t=ns,Ei=!1,ns=null,t}function zt(t,i){var o=i[cu];o===void 0&&(o=i[cu]=new Set);var l=t+"__bubble";o.has(l)||(kd(i,t,2,!1),o.add(l))}function iu(t,i,o){var l=0;i&&(l|=4),kd(o,t,l,i)}var da="_reactListening"+Math.random().toString(36).slice(2);function po(t){if(!t[da]){t[da]=!0,r.forEach(function(o){o!=="selectionchange"&&(e_.has(o)||iu(o,!1,t),iu(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[da]||(i[da]=!0,iu("selectionchange",!1,i))}}function kd(t,i,o,l){switch(ad(i)){case 1:var c=pg;break;case 4:c=mg;break;default:c=Bl}o=c.bind(null,i,o,t),c=void 0,!ts||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(c=!0),l?c!==void 0?t.addEventListener(i,o,{capture:!0,passive:c}):t.addEventListener(i,o,!0):c!==void 0?t.addEventListener(i,o,{passive:c}):t.addEventListener(i,o,!1)}function ru(t,i,o,l,c){var h=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var E=l.tag;if(E===3||E===4){var D=l.stateNode.containerInfo;if(D===c||D.nodeType===8&&D.parentNode===c)break;if(E===4)for(E=l.return;E!==null;){var O=E.tag;if((O===3||O===4)&&(O=E.stateNode.containerInfo,O===c||O.nodeType===8&&O.parentNode===c))return;E=E.return}for(;D!==null;){if(E=Ar(D),E===null)return;if(O=E.tag,O===5||O===6){l=h=E;continue e}D=D.parentNode}}l=l.return}Wn(function(){var ie=h,ve=V(o),ye=[];e:{var me=Id.get(t);if(me!==void 0){var Oe=Gl,Ve=t;switch(t){case"keypress":if(oa(o)===0)break e;case"keydown":case"keyup":Oe=Pg;break;case"focusin":Ve="focus",Oe=jl;break;case"focusout":Ve="blur",Oe=jl;break;case"beforeblur":case"afterblur":Oe=jl;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Oe=cd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Oe=vg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Oe=Ng;break;case Pd:case Dd:case Ld:Oe=Sg;break;case Nd:Oe=Ug;break;case"scroll":Oe=gg;break;case"wheel":Oe=Og;break;case"copy":case"cut":case"paste":Oe=Mg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Oe=dd}var je=(i&4)!==0,jt=!je&&t==="scroll",K=je?me!==null?me+"Capture":null:me;je=[];for(var G=ie,J;G!==null;){J=G;var we=J.stateNode;if(J.tag===5&&we!==null&&(J=we,K!==null&&(we=fn(G,K),we!=null&&je.push(mo(G,we,J)))),jt)break;G=G.return}0<je.length&&(me=new Oe(me,Ve,null,o,ve),ye.push({event:me,listeners:je}))}}if((i&7)===0){e:{if(me=t==="mouseover"||t==="pointerover",Oe=t==="mouseout"||t==="pointerout",me&&o!==ct&&(Ve=o.relatedTarget||o.fromElement)&&(Ar(Ve)||Ve[Ti]))break e;if((Oe||me)&&(me=ve.window===ve?ve:(me=ve.ownerDocument)?me.defaultView||me.parentWindow:window,Oe?(Ve=o.relatedTarget||o.toElement,Oe=ie,Ve=Ve?Ar(Ve):null,Ve!==null&&(jt=Mi(Ve),Ve!==jt||Ve.tag!==5&&Ve.tag!==6)&&(Ve=null)):(Oe=null,Ve=ie),Oe!==Ve)){if(je=cd,we="onMouseLeave",K="onMouseEnter",G="mouse",(t==="pointerout"||t==="pointerover")&&(je=dd,we="onPointerLeave",K="onPointerEnter",G="pointer"),jt=Oe==null?me:fs(Oe),J=Ve==null?me:fs(Ve),me=new je(we,G+"leave",Oe,o,ve),me.target=jt,me.relatedTarget=J,we=null,Ar(ve)===ie&&(je=new je(K,G+"enter",Ve,o,ve),je.target=J,je.relatedTarget=jt,we=je),jt=we,Oe&&Ve)t:{for(je=Oe,K=Ve,G=0,J=je;J;J=us(J))G++;for(J=0,we=K;we;we=us(we))J++;for(;0<G-J;)je=us(je),G--;for(;0<J-G;)K=us(K),J--;for(;G--;){if(je===K||K!==null&&je===K.alternate)break t;je=us(je),K=us(K)}je=null}else je=null;Oe!==null&&zd(ye,me,Oe,je,!1),Ve!==null&&jt!==null&&zd(ye,jt,Ve,je,!0)}}e:{if(me=ie?fs(ie):window,Oe=me.nodeName&&me.nodeName.toLowerCase(),Oe==="select"||Oe==="input"&&me.type==="file")var qe=Wg;else if(vd(me))if(yd)qe=qg;else{qe=jg;var Je=Xg}else(Oe=me.nodeName)&&Oe.toLowerCase()==="input"&&(me.type==="checkbox"||me.type==="radio")&&(qe=Yg);if(qe&&(qe=qe(t,ie))){xd(ye,qe,o,ve);break e}Je&&Je(t,me,ie),t==="focusout"&&(Je=me._wrapperState)&&Je.controlled&&me.type==="number"&&We(me,"number",me.value)}switch(Je=ie?fs(ie):window,t){case"focusin":(vd(Je)||Je.contentEditable==="true")&&(as=Je,Ql=ie,fo=null);break;case"focusout":fo=Ql=as=null;break;case"mousedown":Jl=!0;break;case"contextmenu":case"mouseup":case"dragend":Jl=!1,Cd(ye,o,ve);break;case"selectionchange":if(Zg)break;case"keydown":case"keyup":Cd(ye,o,ve)}var et;if(ql)e:{switch(t){case"compositionstart":var ot="onCompositionStart";break e;case"compositionend":ot="onCompositionEnd";break e;case"compositionupdate":ot="onCompositionUpdate";break e}ot=void 0}else os?gd(t,o)&&(ot="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(ot="onCompositionStart");ot&&(hd&&o.locale!=="ko"&&(os||ot!=="onCompositionStart"?ot==="onCompositionEnd"&&os&&(et=ld()):(Ki=ve,Vl="value"in Ki?Ki.value:Ki.textContent,os=!0)),Je=ha(ie,ot),0<Je.length&&(ot=new fd(ot,t,null,o,ve),ye.push({event:ot,listeners:Je}),et?ot.data=et:(et=_d(o),et!==null&&(ot.data=et)))),(et=zg?Bg(t,o):Hg(t,o))&&(ie=ha(ie,"onBeforeInput"),0<ie.length&&(ve=new fd("onBeforeInput","beforeinput",null,o,ve),ye.push({event:ve,listeners:ie}),ve.data=et))}Od(ye,i)})}function mo(t,i,o){return{instance:t,listener:i,currentTarget:o}}function ha(t,i){for(var o=i+"Capture",l=[];t!==null;){var c=t,h=c.stateNode;c.tag===5&&h!==null&&(c=h,h=fn(t,o),h!=null&&l.unshift(mo(t,h,c)),h=fn(t,i),h!=null&&l.push(mo(t,h,c))),t=t.return}return l}function us(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function zd(t,i,o,l,c){for(var h=i._reactName,E=[];o!==null&&o!==l;){var D=o,O=D.alternate,ie=D.stateNode;if(O!==null&&O===l)break;D.tag===5&&ie!==null&&(D=ie,c?(O=fn(o,h),O!=null&&E.unshift(mo(o,O,D))):c||(O=fn(o,h),O!=null&&E.push(mo(o,O,D)))),o=o.return}E.length!==0&&t.push({event:i,listeners:E})}var t_=/\r\n?/g,n_=/\u0000|\uFFFD/g;function Bd(t){return(typeof t=="string"?t:""+t).replace(t_,`
`).replace(n_,"")}function pa(t,i,o){if(i=Bd(i),Bd(t)!==i&&o)throw Error(n(425))}function ma(){}var su=null,ou=null;function au(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var lu=typeof setTimeout=="function"?setTimeout:void 0,i_=typeof clearTimeout=="function"?clearTimeout:void 0,Hd=typeof Promise=="function"?Promise:void 0,r_=typeof queueMicrotask=="function"?queueMicrotask:typeof Hd<"u"?function(t){return Hd.resolve(null).then(t).catch(s_)}:lu;function s_(t){setTimeout(function(){throw t})}function uu(t,i){var o=i,l=0;do{var c=o.nextSibling;if(t.removeChild(o),c&&c.nodeType===8)if(o=c.data,o==="/$"){if(l===0){t.removeChild(c),ro(i);return}l--}else o!=="$"&&o!=="$?"&&o!=="$!"||l++;o=c}while(o);ro(i)}function Zi(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function Vd(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var cs=Math.random().toString(36).slice(2),hi="__reactFiber$"+cs,go="__reactProps$"+cs,Ti="__reactContainer$"+cs,cu="__reactEvents$"+cs,o_="__reactListeners$"+cs,a_="__reactHandles$"+cs;function Ar(t){var i=t[hi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ti]||o[hi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=Vd(t);t!==null;){if(o=t[hi])return o;t=Vd(t)}return i}t=o,o=t.parentNode}return null}function _o(t){return t=t[hi]||t[Ti],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function fs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function ga(t){return t[go]||null}var fu=[],ds=-1;function Qi(t){return{current:t}}function Bt(t){0>ds||(t.current=fu[ds],fu[ds]=null,ds--)}function Ft(t,i){ds++,fu[ds]=t.current,t.current=i}var Ji={},pn=Qi(Ji),An=Qi(!1),Rr=Ji;function hs(t,i){var o=t.type.contextTypes;if(!o)return Ji;var l=t.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===i)return l.__reactInternalMemoizedMaskedChildContext;var c={},h;for(h in o)c[h]=i[h];return l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=c),c}function Rn(t){return t=t.childContextTypes,t!=null}function _a(){Bt(An),Bt(pn)}function Gd(t,i,o){if(pn.current!==Ji)throw Error(n(168));Ft(pn,i),Ft(An,o)}function Wd(t,i,o){var l=t.stateNode;if(i=i.childContextTypes,typeof l.getChildContext!="function")return o;l=l.getChildContext();for(var c in l)if(!(c in i))throw Error(n(108,Z(t)||"Unknown",c));return ae({},o,l)}function va(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ji,Rr=pn.current,Ft(pn,t),Ft(An,An.current),!0}function Xd(t,i,o){var l=t.stateNode;if(!l)throw Error(n(169));o?(t=Wd(t,i,Rr),l.__reactInternalMemoizedMergedChildContext=t,Bt(An),Bt(pn),Ft(pn,t)):Bt(An),Ft(An,o)}var wi=null,xa=!1,du=!1;function jd(t){wi===null?wi=[t]:wi.push(t)}function l_(t){xa=!0,jd(t)}function er(){if(!du&&wi!==null){du=!0;var t=0,i=vt;try{var o=wi;for(vt=1;t<o.length;t++){var l=o[t];do l=l(!0);while(l!==null)}wi=null,xa=!1}catch(c){throw wi!==null&&(wi=wi.slice(t+1)),T(De,er),c}finally{vt=i,du=!1}}return null}var ps=[],ms=0,ya=null,Sa=0,Xn=[],jn=0,Cr=null,Ai=1,Ri="";function br(t,i){ps[ms++]=Sa,ps[ms++]=ya,ya=t,Sa=i}function Yd(t,i,o){Xn[jn++]=Ai,Xn[jn++]=Ri,Xn[jn++]=Cr,Cr=t;var l=Ai;t=Ri;var c=32-yt(l)-1;l&=~(1<<c),o+=1;var h=32-yt(i)+c;if(30<h){var E=c-c%5;h=(l&(1<<E)-1).toString(32),l>>=E,c-=E,Ai=1<<32-yt(i)+c|o<<c|l,Ri=h+t}else Ai=1<<h|o<<c|l,Ri=t}function hu(t){t.return!==null&&(br(t,1),Yd(t,1,0))}function pu(t){for(;t===ya;)ya=ps[--ms],ps[ms]=null,Sa=ps[--ms],ps[ms]=null;for(;t===Cr;)Cr=Xn[--jn],Xn[jn]=null,Ri=Xn[--jn],Xn[jn]=null,Ai=Xn[--jn],Xn[jn]=null}var On=null,kn=null,Ht=!1,ti=null;function qd(t,i){var o=$n(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function Kd(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,On=t,kn=Zi(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,On=t,kn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Cr!==null?{id:Ai,overflow:Ri}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=$n(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,On=t,kn=null,!0):!1;default:return!1}}function mu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function gu(t){if(Ht){var i=kn;if(i){var o=i;if(!Kd(t,i)){if(mu(t))throw Error(n(418));i=Zi(o.nextSibling);var l=On;i&&Kd(t,i)?qd(l,o):(t.flags=t.flags&-4097|2,Ht=!1,On=t)}}else{if(mu(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ht=!1,On=t}}}function $d(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;On=t}function Ea(t){if(t!==On)return!1;if(!Ht)return $d(t),Ht=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!au(t.type,t.memoizedProps)),i&&(i=kn)){if(mu(t))throw Zd(),Error(n(418));for(;i;)qd(t,i),i=Zi(i.nextSibling)}if($d(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){kn=Zi(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}kn=null}}else kn=On?Zi(t.stateNode.nextSibling):null;return!0}function Zd(){for(var t=kn;t;)t=Zi(t.nextSibling)}function gs(){kn=On=null,Ht=!1}function _u(t){ti===null?ti=[t]:ti.push(t)}var u_=b.ReactCurrentBatchConfig;function vo(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var l=o.stateNode}if(!l)throw Error(n(147,t));var c=l,h=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===h?i.ref:(i=function(E){var D=c.refs;E===null?delete D[h]:D[h]=E},i._stringRef=h,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Ma(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function Qd(t){var i=t._init;return i(t._payload)}function Jd(t){function i(K,G){if(t){var J=K.deletions;J===null?(K.deletions=[G],K.flags|=16):J.push(G)}}function o(K,G){if(!t)return null;for(;G!==null;)i(K,G),G=G.sibling;return null}function l(K,G){for(K=new Map;G!==null;)G.key!==null?K.set(G.key,G):K.set(G.index,G),G=G.sibling;return K}function c(K,G){return K=lr(K,G),K.index=0,K.sibling=null,K}function h(K,G,J){return K.index=J,t?(J=K.alternate,J!==null?(J=J.index,J<G?(K.flags|=2,G):J):(K.flags|=2,G)):(K.flags|=1048576,G)}function E(K){return t&&K.alternate===null&&(K.flags|=2),K}function D(K,G,J,we){return G===null||G.tag!==6?(G=lc(J,K.mode,we),G.return=K,G):(G=c(G,J),G.return=K,G)}function O(K,G,J,we){var qe=J.type;return qe===k?ve(K,G,J.props.children,we,J.key):G!==null&&(G.elementType===qe||typeof qe=="object"&&qe!==null&&qe.$$typeof===le&&Qd(qe)===G.type)?(we=c(G,J.props),we.ref=vo(K,G,J),we.return=K,we):(we=Ya(J.type,J.key,J.props,null,K.mode,we),we.ref=vo(K,G,J),we.return=K,we)}function ie(K,G,J,we){return G===null||G.tag!==4||G.stateNode.containerInfo!==J.containerInfo||G.stateNode.implementation!==J.implementation?(G=uc(J,K.mode,we),G.return=K,G):(G=c(G,J.children||[]),G.return=K,G)}function ve(K,G,J,we,qe){return G===null||G.tag!==7?(G=Or(J,K.mode,we,qe),G.return=K,G):(G=c(G,J),G.return=K,G)}function ye(K,G,J){if(typeof G=="string"&&G!==""||typeof G=="number")return G=lc(""+G,K.mode,J),G.return=K,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case H:return J=Ya(G.type,G.key,G.props,null,K.mode,J),J.ref=vo(K,null,G),J.return=K,J;case z:return G=uc(G,K.mode,J),G.return=K,G;case le:var we=G._init;return ye(K,we(G._payload),J)}if(at(G)||ue(G))return G=Or(G,K.mode,J,null),G.return=K,G;Ma(K,G)}return null}function me(K,G,J,we){var qe=G!==null?G.key:null;if(typeof J=="string"&&J!==""||typeof J=="number")return qe!==null?null:D(K,G,""+J,we);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case H:return J.key===qe?O(K,G,J,we):null;case z:return J.key===qe?ie(K,G,J,we):null;case le:return qe=J._init,me(K,G,qe(J._payload),we)}if(at(J)||ue(J))return qe!==null?null:ve(K,G,J,we,null);Ma(K,J)}return null}function Oe(K,G,J,we,qe){if(typeof we=="string"&&we!==""||typeof we=="number")return K=K.get(J)||null,D(G,K,""+we,qe);if(typeof we=="object"&&we!==null){switch(we.$$typeof){case H:return K=K.get(we.key===null?J:we.key)||null,O(G,K,we,qe);case z:return K=K.get(we.key===null?J:we.key)||null,ie(G,K,we,qe);case le:var Je=we._init;return Oe(K,G,J,Je(we._payload),qe)}if(at(we)||ue(we))return K=K.get(J)||null,ve(G,K,we,qe,null);Ma(G,we)}return null}function Ve(K,G,J,we){for(var qe=null,Je=null,et=G,ot=G=0,an=null;et!==null&&ot<J.length;ot++){et.index>ot?(an=et,et=null):an=et.sibling;var Et=me(K,et,J[ot],we);if(Et===null){et===null&&(et=an);break}t&&et&&Et.alternate===null&&i(K,et),G=h(Et,G,ot),Je===null?qe=Et:Je.sibling=Et,Je=Et,et=an}if(ot===J.length)return o(K,et),Ht&&br(K,ot),qe;if(et===null){for(;ot<J.length;ot++)et=ye(K,J[ot],we),et!==null&&(G=h(et,G,ot),Je===null?qe=et:Je.sibling=et,Je=et);return Ht&&br(K,ot),qe}for(et=l(K,et);ot<J.length;ot++)an=Oe(et,K,ot,J[ot],we),an!==null&&(t&&an.alternate!==null&&et.delete(an.key===null?ot:an.key),G=h(an,G,ot),Je===null?qe=an:Je.sibling=an,Je=an);return t&&et.forEach(function(ur){return i(K,ur)}),Ht&&br(K,ot),qe}function je(K,G,J,we){var qe=ue(J);if(typeof qe!="function")throw Error(n(150));if(J=qe.call(J),J==null)throw Error(n(151));for(var Je=qe=null,et=G,ot=G=0,an=null,Et=J.next();et!==null&&!Et.done;ot++,Et=J.next()){et.index>ot?(an=et,et=null):an=et.sibling;var ur=me(K,et,Et.value,we);if(ur===null){et===null&&(et=an);break}t&&et&&ur.alternate===null&&i(K,et),G=h(ur,G,ot),Je===null?qe=ur:Je.sibling=ur,Je=ur,et=an}if(Et.done)return o(K,et),Ht&&br(K,ot),qe;if(et===null){for(;!Et.done;ot++,Et=J.next())Et=ye(K,Et.value,we),Et!==null&&(G=h(Et,G,ot),Je===null?qe=Et:Je.sibling=Et,Je=Et);return Ht&&br(K,ot),qe}for(et=l(K,et);!Et.done;ot++,Et=J.next())Et=Oe(et,K,ot,Et.value,we),Et!==null&&(t&&Et.alternate!==null&&et.delete(Et.key===null?ot:Et.key),G=h(Et,G,ot),Je===null?qe=Et:Je.sibling=Et,Je=Et);return t&&et.forEach(function(V_){return i(K,V_)}),Ht&&br(K,ot),qe}function jt(K,G,J,we){if(typeof J=="object"&&J!==null&&J.type===k&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case H:e:{for(var qe=J.key,Je=G;Je!==null;){if(Je.key===qe){if(qe=J.type,qe===k){if(Je.tag===7){o(K,Je.sibling),G=c(Je,J.props.children),G.return=K,K=G;break e}}else if(Je.elementType===qe||typeof qe=="object"&&qe!==null&&qe.$$typeof===le&&Qd(qe)===Je.type){o(K,Je.sibling),G=c(Je,J.props),G.ref=vo(K,Je,J),G.return=K,K=G;break e}o(K,Je);break}else i(K,Je);Je=Je.sibling}J.type===k?(G=Or(J.props.children,K.mode,we,J.key),G.return=K,K=G):(we=Ya(J.type,J.key,J.props,null,K.mode,we),we.ref=vo(K,G,J),we.return=K,K=we)}return E(K);case z:e:{for(Je=J.key;G!==null;){if(G.key===Je)if(G.tag===4&&G.stateNode.containerInfo===J.containerInfo&&G.stateNode.implementation===J.implementation){o(K,G.sibling),G=c(G,J.children||[]),G.return=K,K=G;break e}else{o(K,G);break}else i(K,G);G=G.sibling}G=uc(J,K.mode,we),G.return=K,K=G}return E(K);case le:return Je=J._init,jt(K,G,Je(J._payload),we)}if(at(J))return Ve(K,G,J,we);if(ue(J))return je(K,G,J,we);Ma(K,J)}return typeof J=="string"&&J!==""||typeof J=="number"?(J=""+J,G!==null&&G.tag===6?(o(K,G.sibling),G=c(G,J),G.return=K,K=G):(o(K,G),G=lc(J,K.mode,we),G.return=K,K=G),E(K)):o(K,G)}return jt}var _s=Jd(!0),eh=Jd(!1),Ta=Qi(null),wa=null,vs=null,vu=null;function xu(){vu=vs=wa=null}function yu(t){var i=Ta.current;Bt(Ta),t._currentValue=i}function Su(t,i,o){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===o)break;t=t.return}}function xs(t,i){wa=t,vu=vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(Cn=!0),t.firstContext=null)}function Yn(t){var i=t._currentValue;if(vu!==t)if(t={context:t,memoizedValue:i,next:null},vs===null){if(wa===null)throw Error(n(308));vs=t,wa.dependencies={lanes:0,firstContext:t}}else vs=vs.next=t;return i}var Pr=null;function Eu(t){Pr===null?Pr=[t]:Pr.push(t)}function th(t,i,o,l){var c=i.interleaved;return c===null?(o.next=o,Eu(i)):(o.next=c.next,c.next=o),i.interleaved=o,Ci(t,l)}function Ci(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var tr=!1;function Mu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function nh(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function bi(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function nr(t,i,o){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(St&2)!==0){var c=l.pending;return c===null?i.next=i:(i.next=c.next,c.next=i),l.pending=i,Ci(t,o)}return c=l.interleaved,c===null?(i.next=i,Eu(l)):(i.next=c.next,c.next=i),l.interleaved=i,Ci(t,o)}function Aa(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,wr(t,o)}}function ih(t,i){var o=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,o===l)){var c=null,h=null;if(o=o.firstBaseUpdate,o!==null){do{var E={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};h===null?c=h=E:h=h.next=E,o=o.next}while(o!==null);h===null?c=h=i:h=h.next=i}else c=h=i;o={baseState:l.baseState,firstBaseUpdate:c,lastBaseUpdate:h,shared:l.shared,effects:l.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Ra(t,i,o,l){var c=t.updateQueue;tr=!1;var h=c.firstBaseUpdate,E=c.lastBaseUpdate,D=c.shared.pending;if(D!==null){c.shared.pending=null;var O=D,ie=O.next;O.next=null,E===null?h=ie:E.next=ie,E=O;var ve=t.alternate;ve!==null&&(ve=ve.updateQueue,D=ve.lastBaseUpdate,D!==E&&(D===null?ve.firstBaseUpdate=ie:D.next=ie,ve.lastBaseUpdate=O))}if(h!==null){var ye=c.baseState;E=0,ve=ie=O=null,D=h;do{var me=D.lane,Oe=D.eventTime;if((l&me)===me){ve!==null&&(ve=ve.next={eventTime:Oe,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var Ve=t,je=D;switch(me=i,Oe=o,je.tag){case 1:if(Ve=je.payload,typeof Ve=="function"){ye=Ve.call(Oe,ye,me);break e}ye=Ve;break e;case 3:Ve.flags=Ve.flags&-65537|128;case 0:if(Ve=je.payload,me=typeof Ve=="function"?Ve.call(Oe,ye,me):Ve,me==null)break e;ye=ae({},ye,me);break e;case 2:tr=!0}}D.callback!==null&&D.lane!==0&&(t.flags|=64,me=c.effects,me===null?c.effects=[D]:me.push(D))}else Oe={eventTime:Oe,lane:me,tag:D.tag,payload:D.payload,callback:D.callback,next:null},ve===null?(ie=ve=Oe,O=ye):ve=ve.next=Oe,E|=me;if(D=D.next,D===null){if(D=c.shared.pending,D===null)break;me=D,D=me.next,me.next=null,c.lastBaseUpdate=me,c.shared.pending=null}}while(!0);if(ve===null&&(O=ye),c.baseState=O,c.firstBaseUpdate=ie,c.lastBaseUpdate=ve,i=c.shared.interleaved,i!==null){c=i;do E|=c.lane,c=c.next;while(c!==i)}else h===null&&(c.shared.lanes=0);Nr|=E,t.lanes=E,t.memoizedState=ye}}function rh(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var l=t[i],c=l.callback;if(c!==null){if(l.callback=null,l=o,typeof c!="function")throw Error(n(191,c));c.call(l)}}}var xo={},pi=Qi(xo),yo=Qi(xo),So=Qi(xo);function Dr(t){if(t===xo)throw Error(n(174));return t}function Tu(t,i){switch(Ft(So,i),Ft(yo,t),Ft(pi,xo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:ge(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=ge(i,t)}Bt(pi),Ft(pi,i)}function ys(){Bt(pi),Bt(yo),Bt(So)}function sh(t){Dr(So.current);var i=Dr(pi.current),o=ge(i,t.type);i!==o&&(Ft(yo,t),Ft(pi,o))}function wu(t){yo.current===t&&(Bt(pi),Bt(yo))}var Vt=Qi(0);function Ca(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Au=[];function Ru(){for(var t=0;t<Au.length;t++)Au[t]._workInProgressVersionPrimary=null;Au.length=0}var ba=b.ReactCurrentDispatcher,Cu=b.ReactCurrentBatchConfig,Lr=0,Gt=null,Qt=null,sn=null,Pa=!1,Eo=!1,Mo=0,c_=0;function mn(){throw Error(n(321))}function bu(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ei(t[o],i[o]))return!1;return!0}function Pu(t,i,o,l,c,h){if(Lr=h,Gt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,ba.current=t===null||t.memoizedState===null?p_:m_,t=o(l,c),Eo){h=0;do{if(Eo=!1,Mo=0,25<=h)throw Error(n(301));h+=1,sn=Qt=null,i.updateQueue=null,ba.current=g_,t=o(l,c)}while(Eo)}if(ba.current=Na,i=Qt!==null&&Qt.next!==null,Lr=0,sn=Qt=Gt=null,Pa=!1,i)throw Error(n(300));return t}function Du(){var t=Mo!==0;return Mo=0,t}function mi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return sn===null?Gt.memoizedState=sn=t:sn=sn.next=t,sn}function qn(){if(Qt===null){var t=Gt.alternate;t=t!==null?t.memoizedState:null}else t=Qt.next;var i=sn===null?Gt.memoizedState:sn.next;if(i!==null)sn=i,Qt=t;else{if(t===null)throw Error(n(310));Qt=t,t={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},sn===null?Gt.memoizedState=sn=t:sn=sn.next=t}return sn}function To(t,i){return typeof i=="function"?i(t):i}function Lu(t){var i=qn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=Qt,c=l.baseQueue,h=o.pending;if(h!==null){if(c!==null){var E=c.next;c.next=h.next,h.next=E}l.baseQueue=c=h,o.pending=null}if(c!==null){h=c.next,l=l.baseState;var D=E=null,O=null,ie=h;do{var ve=ie.lane;if((Lr&ve)===ve)O!==null&&(O=O.next={lane:0,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null}),l=ie.hasEagerState?ie.eagerState:t(l,ie.action);else{var ye={lane:ve,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null};O===null?(D=O=ye,E=l):O=O.next=ye,Gt.lanes|=ve,Nr|=ve}ie=ie.next}while(ie!==null&&ie!==h);O===null?E=l:O.next=D,ei(l,i.memoizedState)||(Cn=!0),i.memoizedState=l,i.baseState=E,i.baseQueue=O,o.lastRenderedState=l}if(t=o.interleaved,t!==null){c=t;do h=c.lane,Gt.lanes|=h,Nr|=h,c=c.next;while(c!==t)}else c===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Nu(t){var i=qn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=o.dispatch,c=o.pending,h=i.memoizedState;if(c!==null){o.pending=null;var E=c=c.next;do h=t(h,E.action),E=E.next;while(E!==c);ei(h,i.memoizedState)||(Cn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),o.lastRenderedState=h}return[h,l]}function oh(){}function ah(t,i){var o=Gt,l=qn(),c=i(),h=!ei(l.memoizedState,c);if(h&&(l.memoizedState=c,Cn=!0),l=l.queue,Iu(ch.bind(null,o,l,t),[t]),l.getSnapshot!==i||h||sn!==null&&sn.memoizedState.tag&1){if(o.flags|=2048,wo(9,uh.bind(null,o,l,c,i),void 0,null),on===null)throw Error(n(349));(Lr&30)!==0||lh(o,i,c)}return c}function lh(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function uh(t,i,o,l){i.value=o,i.getSnapshot=l,fh(i)&&dh(t)}function ch(t,i,o){return o(function(){fh(i)&&dh(t)})}function fh(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ei(t,o)}catch{return!0}}function dh(t){var i=Ci(t,1);i!==null&&si(i,t,1,-1)}function hh(t){var i=mi();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:To,lastRenderedState:t},i.queue=t,t=t.dispatch=h_.bind(null,Gt,t),[i.memoizedState,t]}function wo(t,i,o,l){return t={tag:t,create:i,destroy:o,deps:l,next:null},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(l=o.next,o.next=t,t.next=l,i.lastEffect=t)),t}function ph(){return qn().memoizedState}function Da(t,i,o,l){var c=mi();Gt.flags|=t,c.memoizedState=wo(1|i,o,void 0,l===void 0?null:l)}function La(t,i,o,l){var c=qn();l=l===void 0?null:l;var h=void 0;if(Qt!==null){var E=Qt.memoizedState;if(h=E.destroy,l!==null&&bu(l,E.deps)){c.memoizedState=wo(i,o,h,l);return}}Gt.flags|=t,c.memoizedState=wo(1|i,o,h,l)}function mh(t,i){return Da(8390656,8,t,i)}function Iu(t,i){return La(2048,8,t,i)}function gh(t,i){return La(4,2,t,i)}function _h(t,i){return La(4,4,t,i)}function vh(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function xh(t,i,o){return o=o!=null?o.concat([t]):null,La(4,4,vh.bind(null,i,t),o)}function Uu(){}function yh(t,i){var o=qn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&bu(i,l[1])?l[0]:(o.memoizedState=[t,i],t)}function Sh(t,i){var o=qn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&bu(i,l[1])?l[0]:(t=t(),o.memoizedState=[t,i],t)}function Eh(t,i,o){return(Lr&21)===0?(t.baseState&&(t.baseState=!1,Cn=!0),t.memoizedState=o):(ei(o,i)||(o=Sn(),Gt.lanes|=o,Nr|=o,t.baseState=!0),i)}function f_(t,i){var o=vt;vt=o!==0&&4>o?o:4,t(!0);var l=Cu.transition;Cu.transition={};try{t(!1),i()}finally{vt=o,Cu.transition=l}}function Mh(){return qn().memoizedState}function d_(t,i,o){var l=or(t);if(o={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null},Th(t))wh(i,o);else if(o=th(t,i,o,l),o!==null){var c=Mn();si(o,t,l,c),Ah(o,i,l)}}function h_(t,i,o){var l=or(t),c={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null};if(Th(t))wh(i,c);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var E=i.lastRenderedState,D=h(E,o);if(c.hasEagerState=!0,c.eagerState=D,ei(D,E)){var O=i.interleaved;O===null?(c.next=c,Eu(i)):(c.next=O.next,O.next=c),i.interleaved=c;return}}catch{}finally{}o=th(t,i,c,l),o!==null&&(c=Mn(),si(o,t,l,c),Ah(o,i,l))}}function Th(t){var i=t.alternate;return t===Gt||i!==null&&i===Gt}function wh(t,i){Eo=Pa=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function Ah(t,i,o){if((o&4194240)!==0){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,wr(t,o)}}var Na={readContext:Yn,useCallback:mn,useContext:mn,useEffect:mn,useImperativeHandle:mn,useInsertionEffect:mn,useLayoutEffect:mn,useMemo:mn,useReducer:mn,useRef:mn,useState:mn,useDebugValue:mn,useDeferredValue:mn,useTransition:mn,useMutableSource:mn,useSyncExternalStore:mn,useId:mn,unstable_isNewReconciler:!1},p_={readContext:Yn,useCallback:function(t,i){return mi().memoizedState=[t,i===void 0?null:i],t},useContext:Yn,useEffect:mh,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Da(4194308,4,vh.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Da(4194308,4,t,i)},useInsertionEffect:function(t,i){return Da(4,2,t,i)},useMemo:function(t,i){var o=mi();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var l=mi();return i=o!==void 0?o(i):i,l.memoizedState=l.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},l.queue=t,t=t.dispatch=d_.bind(null,Gt,t),[l.memoizedState,t]},useRef:function(t){var i=mi();return t={current:t},i.memoizedState=t},useState:hh,useDebugValue:Uu,useDeferredValue:function(t){return mi().memoizedState=t},useTransition:function(){var t=hh(!1),i=t[0];return t=f_.bind(null,t[1]),mi().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var l=Gt,c=mi();if(Ht){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),on===null)throw Error(n(349));(Lr&30)!==0||lh(l,i,o)}c.memoizedState=o;var h={value:o,getSnapshot:i};return c.queue=h,mh(ch.bind(null,l,h,t),[t]),l.flags|=2048,wo(9,uh.bind(null,l,h,o,i),void 0,null),o},useId:function(){var t=mi(),i=on.identifierPrefix;if(Ht){var o=Ri,l=Ai;o=(l&~(1<<32-yt(l)-1)).toString(32)+o,i=":"+i+"R"+o,o=Mo++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=c_++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},m_={readContext:Yn,useCallback:yh,useContext:Yn,useEffect:Iu,useImperativeHandle:xh,useInsertionEffect:gh,useLayoutEffect:_h,useMemo:Sh,useReducer:Lu,useRef:ph,useState:function(){return Lu(To)},useDebugValue:Uu,useDeferredValue:function(t){var i=qn();return Eh(i,Qt.memoizedState,t)},useTransition:function(){var t=Lu(To)[0],i=qn().memoizedState;return[t,i]},useMutableSource:oh,useSyncExternalStore:ah,useId:Mh,unstable_isNewReconciler:!1},g_={readContext:Yn,useCallback:yh,useContext:Yn,useEffect:Iu,useImperativeHandle:xh,useInsertionEffect:gh,useLayoutEffect:_h,useMemo:Sh,useReducer:Nu,useRef:ph,useState:function(){return Nu(To)},useDebugValue:Uu,useDeferredValue:function(t){var i=qn();return Qt===null?i.memoizedState=t:Eh(i,Qt.memoizedState,t)},useTransition:function(){var t=Nu(To)[0],i=qn().memoizedState;return[t,i]},useMutableSource:oh,useSyncExternalStore:ah,useId:Mh,unstable_isNewReconciler:!1};function ni(t,i){if(t&&t.defaultProps){i=ae({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Fu(t,i,o,l){i=t.memoizedState,o=o(l,i),o=o==null?i:ae({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Ia={isMounted:function(t){return(t=t._reactInternals)?Mi(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var l=Mn(),c=or(t),h=bi(l,c);h.payload=i,o!=null&&(h.callback=o),i=nr(t,h,c),i!==null&&(si(i,t,c,l),Aa(i,t,c))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var l=Mn(),c=or(t),h=bi(l,c);h.tag=1,h.payload=i,o!=null&&(h.callback=o),i=nr(t,h,c),i!==null&&(si(i,t,c,l),Aa(i,t,c))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=Mn(),l=or(t),c=bi(o,l);c.tag=2,i!=null&&(c.callback=i),i=nr(t,c,l),i!==null&&(si(i,t,l,o),Aa(i,t,l))}};function Rh(t,i,o,l,c,h,E){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,h,E):i.prototype&&i.prototype.isPureReactComponent?!co(o,l)||!co(c,h):!0}function Ch(t,i,o){var l=!1,c=Ji,h=i.contextType;return typeof h=="object"&&h!==null?h=Yn(h):(c=Rn(i)?Rr:pn.current,l=i.contextTypes,h=(l=l!=null)?hs(t,c):Ji),i=new i(o,h),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ia,t.stateNode=i,i._reactInternals=t,l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=c,t.__reactInternalMemoizedMaskedChildContext=h),i}function bh(t,i,o,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,l),i.state!==t&&Ia.enqueueReplaceState(i,i.state,null)}function Ou(t,i,o,l){var c=t.stateNode;c.props=o,c.state=t.memoizedState,c.refs={},Mu(t);var h=i.contextType;typeof h=="object"&&h!==null?c.context=Yn(h):(h=Rn(i)?Rr:pn.current,c.context=hs(t,h)),c.state=t.memoizedState,h=i.getDerivedStateFromProps,typeof h=="function"&&(Fu(t,i,h,o),c.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(i=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),i!==c.state&&Ia.enqueueReplaceState(c,c.state,null),Ra(t,o,c,l),c.state=t.memoizedState),typeof c.componentDidMount=="function"&&(t.flags|=4194308)}function Ss(t,i){try{var o="",l=i;do o+=pe(l),l=l.return;while(l);var c=o}catch(h){c=`
Error generating stack: `+h.message+`
`+h.stack}return{value:t,source:i,stack:c,digest:null}}function ku(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function zu(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var __=typeof WeakMap=="function"?WeakMap:Map;function Ph(t,i,o){o=bi(-1,o),o.tag=3,o.payload={element:null};var l=i.value;return o.callback=function(){Ha||(Ha=!0,ec=l),zu(t,i)},o}function Dh(t,i,o){o=bi(-1,o),o.tag=3;var l=t.type.getDerivedStateFromError;if(typeof l=="function"){var c=i.value;o.payload=function(){return l(c)},o.callback=function(){zu(t,i)}}var h=t.stateNode;return h!==null&&typeof h.componentDidCatch=="function"&&(o.callback=function(){zu(t,i),typeof l!="function"&&(rr===null?rr=new Set([this]):rr.add(this));var E=i.stack;this.componentDidCatch(i.value,{componentStack:E!==null?E:""})}),o}function Lh(t,i,o){var l=t.pingCache;if(l===null){l=t.pingCache=new __;var c=new Set;l.set(i,c)}else c=l.get(i),c===void 0&&(c=new Set,l.set(i,c));c.has(o)||(c.add(o),t=D_.bind(null,t,i,o),i.then(t,t))}function Nh(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Ih(t,i,o,l,c){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=bi(-1,1),i.tag=2,nr(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=c,t)}var v_=b.ReactCurrentOwner,Cn=!1;function En(t,i,o,l){i.child=t===null?eh(i,null,o,l):_s(i,t.child,o,l)}function Uh(t,i,o,l,c){o=o.render;var h=i.ref;return xs(i,c),l=Pu(t,i,o,l,h,c),o=Du(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~c,Pi(t,i,c)):(Ht&&o&&hu(i),i.flags|=1,En(t,i,l,c),i.child)}function Fh(t,i,o,l,c){if(t===null){var h=o.type;return typeof h=="function"&&!ac(h)&&h.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=h,Oh(t,i,h,l,c)):(t=Ya(o.type,null,l,i,i.mode,c),t.ref=i.ref,t.return=i,i.child=t)}if(h=t.child,(t.lanes&c)===0){var E=h.memoizedProps;if(o=o.compare,o=o!==null?o:co,o(E,l)&&t.ref===i.ref)return Pi(t,i,c)}return i.flags|=1,t=lr(h,l),t.ref=i.ref,t.return=i,i.child=t}function Oh(t,i,o,l,c){if(t!==null){var h=t.memoizedProps;if(co(h,l)&&t.ref===i.ref)if(Cn=!1,i.pendingProps=l=h,(t.lanes&c)!==0)(t.flags&131072)!==0&&(Cn=!0);else return i.lanes=t.lanes,Pi(t,i,c)}return Bu(t,i,o,l,c)}function kh(t,i,o){var l=i.pendingProps,c=l.children,h=t!==null?t.memoizedState:null;if(l.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ft(Ms,zn),zn|=o;else{if((o&1073741824)===0)return t=h!==null?h.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Ft(Ms,zn),zn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=h!==null?h.baseLanes:o,Ft(Ms,zn),zn|=l}else h!==null?(l=h.baseLanes|o,i.memoizedState=null):l=o,Ft(Ms,zn),zn|=l;return En(t,i,c,o),i.child}function zh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Bu(t,i,o,l,c){var h=Rn(o)?Rr:pn.current;return h=hs(i,h),xs(i,c),o=Pu(t,i,o,l,h,c),l=Du(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~c,Pi(t,i,c)):(Ht&&l&&hu(i),i.flags|=1,En(t,i,o,c),i.child)}function Bh(t,i,o,l,c){if(Rn(o)){var h=!0;va(i)}else h=!1;if(xs(i,c),i.stateNode===null)Fa(t,i),Ch(i,o,l),Ou(i,o,l,c),l=!0;else if(t===null){var E=i.stateNode,D=i.memoizedProps;E.props=D;var O=E.context,ie=o.contextType;typeof ie=="object"&&ie!==null?ie=Yn(ie):(ie=Rn(o)?Rr:pn.current,ie=hs(i,ie));var ve=o.getDerivedStateFromProps,ye=typeof ve=="function"||typeof E.getSnapshotBeforeUpdate=="function";ye||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(D!==l||O!==ie)&&bh(i,E,l,ie),tr=!1;var me=i.memoizedState;E.state=me,Ra(i,l,E,c),O=i.memoizedState,D!==l||me!==O||An.current||tr?(typeof ve=="function"&&(Fu(i,o,ve,l),O=i.memoizedState),(D=tr||Rh(i,o,D,l,me,O,ie))?(ye||typeof E.UNSAFE_componentWillMount!="function"&&typeof E.componentWillMount!="function"||(typeof E.componentWillMount=="function"&&E.componentWillMount(),typeof E.UNSAFE_componentWillMount=="function"&&E.UNSAFE_componentWillMount()),typeof E.componentDidMount=="function"&&(i.flags|=4194308)):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=O),E.props=l,E.state=O,E.context=ie,l=D):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{E=i.stateNode,nh(t,i),D=i.memoizedProps,ie=i.type===i.elementType?D:ni(i.type,D),E.props=ie,ye=i.pendingProps,me=E.context,O=o.contextType,typeof O=="object"&&O!==null?O=Yn(O):(O=Rn(o)?Rr:pn.current,O=hs(i,O));var Oe=o.getDerivedStateFromProps;(ve=typeof Oe=="function"||typeof E.getSnapshotBeforeUpdate=="function")||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(D!==ye||me!==O)&&bh(i,E,l,O),tr=!1,me=i.memoizedState,E.state=me,Ra(i,l,E,c);var Ve=i.memoizedState;D!==ye||me!==Ve||An.current||tr?(typeof Oe=="function"&&(Fu(i,o,Oe,l),Ve=i.memoizedState),(ie=tr||Rh(i,o,ie,l,me,Ve,O)||!1)?(ve||typeof E.UNSAFE_componentWillUpdate!="function"&&typeof E.componentWillUpdate!="function"||(typeof E.componentWillUpdate=="function"&&E.componentWillUpdate(l,Ve,O),typeof E.UNSAFE_componentWillUpdate=="function"&&E.UNSAFE_componentWillUpdate(l,Ve,O)),typeof E.componentDidUpdate=="function"&&(i.flags|=4),typeof E.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof E.componentDidUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=Ve),E.props=l,E.state=Ve,E.context=O,l=ie):(typeof E.componentDidUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=1024),l=!1)}return Hu(t,i,o,l,h,c)}function Hu(t,i,o,l,c,h){zh(t,i);var E=(i.flags&128)!==0;if(!l&&!E)return c&&Xd(i,o,!1),Pi(t,i,h);l=i.stateNode,v_.current=i;var D=E&&typeof o.getDerivedStateFromError!="function"?null:l.render();return i.flags|=1,t!==null&&E?(i.child=_s(i,t.child,null,h),i.child=_s(i,null,D,h)):En(t,i,D,h),i.memoizedState=l.state,c&&Xd(i,o,!0),i.child}function Hh(t){var i=t.stateNode;i.pendingContext?Gd(t,i.pendingContext,i.pendingContext!==i.context):i.context&&Gd(t,i.context,!1),Tu(t,i.containerInfo)}function Vh(t,i,o,l,c){return gs(),_u(c),i.flags|=256,En(t,i,o,l),i.child}var Vu={dehydrated:null,treeContext:null,retryLane:0};function Gu(t){return{baseLanes:t,cachePool:null,transitions:null}}function Gh(t,i,o){var l=i.pendingProps,c=Vt.current,h=!1,E=(i.flags&128)!==0,D;if((D=E)||(D=t!==null&&t.memoizedState===null?!1:(c&2)!==0),D?(h=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(c|=1),Ft(Vt,c&1),t===null)return gu(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(E=l.children,t=l.fallback,h?(l=i.mode,h=i.child,E={mode:"hidden",children:E},(l&1)===0&&h!==null?(h.childLanes=0,h.pendingProps=E):h=qa(E,l,0,null),t=Or(t,l,o,null),h.return=i,t.return=i,h.sibling=t,i.child=h,i.child.memoizedState=Gu(o),i.memoizedState=Vu,t):Wu(i,E));if(c=t.memoizedState,c!==null&&(D=c.dehydrated,D!==null))return x_(t,i,E,l,D,c,o);if(h){h=l.fallback,E=i.mode,c=t.child,D=c.sibling;var O={mode:"hidden",children:l.children};return(E&1)===0&&i.child!==c?(l=i.child,l.childLanes=0,l.pendingProps=O,i.deletions=null):(l=lr(c,O),l.subtreeFlags=c.subtreeFlags&14680064),D!==null?h=lr(D,h):(h=Or(h,E,o,null),h.flags|=2),h.return=i,l.return=i,l.sibling=h,i.child=l,l=h,h=i.child,E=t.child.memoizedState,E=E===null?Gu(o):{baseLanes:E.baseLanes|o,cachePool:null,transitions:E.transitions},h.memoizedState=E,h.childLanes=t.childLanes&~o,i.memoizedState=Vu,l}return h=t.child,t=h.sibling,l=lr(h,{mode:"visible",children:l.children}),(i.mode&1)===0&&(l.lanes=o),l.return=i,l.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=l,i.memoizedState=null,l}function Wu(t,i){return i=qa({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Ua(t,i,o,l){return l!==null&&_u(l),_s(i,t.child,null,o),t=Wu(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function x_(t,i,o,l,c,h,E){if(o)return i.flags&256?(i.flags&=-257,l=ku(Error(n(422))),Ua(t,i,E,l)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(h=l.fallback,c=i.mode,l=qa({mode:"visible",children:l.children},c,0,null),h=Or(h,c,E,null),h.flags|=2,l.return=i,h.return=i,l.sibling=h,i.child=l,(i.mode&1)!==0&&_s(i,t.child,null,E),i.child.memoizedState=Gu(E),i.memoizedState=Vu,h);if((i.mode&1)===0)return Ua(t,i,E,null);if(c.data==="$!"){if(l=c.nextSibling&&c.nextSibling.dataset,l)var D=l.dgst;return l=D,h=Error(n(419)),l=ku(h,l,void 0),Ua(t,i,E,l)}if(D=(E&t.childLanes)!==0,Cn||D){if(l=on,l!==null){switch(E&-E){case 4:c=2;break;case 16:c=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:c=32;break;case 536870912:c=268435456;break;default:c=0}c=(c&(l.suspendedLanes|E))!==0?0:c,c!==0&&c!==h.retryLane&&(h.retryLane=c,Ci(t,c),si(l,t,c,-1))}return oc(),l=ku(Error(n(421))),Ua(t,i,E,l)}return c.data==="$?"?(i.flags|=128,i.child=t.child,i=L_.bind(null,t),c._reactRetry=i,null):(t=h.treeContext,kn=Zi(c.nextSibling),On=i,Ht=!0,ti=null,t!==null&&(Xn[jn++]=Ai,Xn[jn++]=Ri,Xn[jn++]=Cr,Ai=t.id,Ri=t.overflow,Cr=i),i=Wu(i,l.children),i.flags|=4096,i)}function Wh(t,i,o){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),Su(t.return,i,o)}function Xu(t,i,o,l,c){var h=t.memoizedState;h===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:o,tailMode:c}:(h.isBackwards=i,h.rendering=null,h.renderingStartTime=0,h.last=l,h.tail=o,h.tailMode=c)}function Xh(t,i,o){var l=i.pendingProps,c=l.revealOrder,h=l.tail;if(En(t,i,l.children,o),l=Vt.current,(l&2)!==0)l=l&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Wh(t,o,i);else if(t.tag===19)Wh(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}l&=1}if(Ft(Vt,l),(i.mode&1)===0)i.memoizedState=null;else switch(c){case"forwards":for(o=i.child,c=null;o!==null;)t=o.alternate,t!==null&&Ca(t)===null&&(c=o),o=o.sibling;o=c,o===null?(c=i.child,i.child=null):(c=o.sibling,o.sibling=null),Xu(i,!1,c,o,h);break;case"backwards":for(o=null,c=i.child,i.child=null;c!==null;){if(t=c.alternate,t!==null&&Ca(t)===null){i.child=c;break}t=c.sibling,c.sibling=o,o=c,c=t}Xu(i,!0,o,null,h);break;case"together":Xu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Fa(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Pi(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Nr|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=lr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=lr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function y_(t,i,o){switch(i.tag){case 3:Hh(i),gs();break;case 5:sh(i);break;case 1:Rn(i.type)&&va(i);break;case 4:Tu(i,i.stateNode.containerInfo);break;case 10:var l=i.type._context,c=i.memoizedProps.value;Ft(Ta,l._currentValue),l._currentValue=c;break;case 13:if(l=i.memoizedState,l!==null)return l.dehydrated!==null?(Ft(Vt,Vt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Gh(t,i,o):(Ft(Vt,Vt.current&1),t=Pi(t,i,o),t!==null?t.sibling:null);Ft(Vt,Vt.current&1);break;case 19:if(l=(o&i.childLanes)!==0,(t.flags&128)!==0){if(l)return Xh(t,i,o);i.flags|=128}if(c=i.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Ft(Vt,Vt.current),l)break;return null;case 22:case 23:return i.lanes=0,kh(t,i,o)}return Pi(t,i,o)}var jh,ju,Yh,qh;jh=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},ju=function(){},Yh=function(t,i,o,l){var c=t.memoizedProps;if(c!==l){t=i.stateNode,Dr(pi.current);var h=null;switch(o){case"input":c=Rt(t,c),l=Rt(t,l),h=[];break;case"select":c=ae({},c,{value:void 0}),l=ae({},l,{value:void 0}),h=[];break;case"textarea":c=kt(t,c),l=kt(t,l),h=[];break;default:typeof c.onClick!="function"&&typeof l.onClick=="function"&&(t.onclick=ma)}Ye(o,l);var E;o=null;for(ie in c)if(!l.hasOwnProperty(ie)&&c.hasOwnProperty(ie)&&c[ie]!=null)if(ie==="style"){var D=c[ie];for(E in D)D.hasOwnProperty(E)&&(o||(o={}),o[E]="")}else ie!=="dangerouslySetInnerHTML"&&ie!=="children"&&ie!=="suppressContentEditableWarning"&&ie!=="suppressHydrationWarning"&&ie!=="autoFocus"&&(a.hasOwnProperty(ie)?h||(h=[]):(h=h||[]).push(ie,null));for(ie in l){var O=l[ie];if(D=c!=null?c[ie]:void 0,l.hasOwnProperty(ie)&&O!==D&&(O!=null||D!=null))if(ie==="style")if(D){for(E in D)!D.hasOwnProperty(E)||O&&O.hasOwnProperty(E)||(o||(o={}),o[E]="");for(E in O)O.hasOwnProperty(E)&&D[E]!==O[E]&&(o||(o={}),o[E]=O[E])}else o||(h||(h=[]),h.push(ie,o)),o=O;else ie==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,D=D?D.__html:void 0,O!=null&&D!==O&&(h=h||[]).push(ie,O)):ie==="children"?typeof O!="string"&&typeof O!="number"||(h=h||[]).push(ie,""+O):ie!=="suppressContentEditableWarning"&&ie!=="suppressHydrationWarning"&&(a.hasOwnProperty(ie)?(O!=null&&ie==="onScroll"&&zt("scroll",t),h||D===O||(h=[])):(h=h||[]).push(ie,O))}o&&(h=h||[]).push("style",o);var ie=h;(i.updateQueue=ie)&&(i.flags|=4)}},qh=function(t,i,o,l){o!==l&&(i.flags|=4)};function Ao(t,i){if(!Ht)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var l=null;o!==null;)o.alternate!==null&&(l=o),o=o.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function gn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,l=0;if(i)for(var c=t.child;c!==null;)o|=c.lanes|c.childLanes,l|=c.subtreeFlags&14680064,l|=c.flags&14680064,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)o|=c.lanes|c.childLanes,l|=c.subtreeFlags,l|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=l,t.childLanes=o,i}function S_(t,i,o){var l=i.pendingProps;switch(pu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gn(i),null;case 1:return Rn(i.type)&&_a(),gn(i),null;case 3:return l=i.stateNode,ys(),Bt(An),Bt(pn),Ru(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(t===null||t.child===null)&&(Ea(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ti!==null&&(ic(ti),ti=null))),ju(t,i),gn(i),null;case 5:wu(i);var c=Dr(So.current);if(o=i.type,t!==null&&i.stateNode!=null)Yh(t,i,o,l,c),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!l){if(i.stateNode===null)throw Error(n(166));return gn(i),null}if(t=Dr(pi.current),Ea(i)){l=i.stateNode,o=i.type;var h=i.memoizedProps;switch(l[hi]=i,l[go]=h,t=(i.mode&1)!==0,o){case"dialog":zt("cancel",l),zt("close",l);break;case"iframe":case"object":case"embed":zt("load",l);break;case"video":case"audio":for(c=0;c<ho.length;c++)zt(ho[c],l);break;case"source":zt("error",l);break;case"img":case"image":case"link":zt("error",l),zt("load",l);break;case"details":zt("toggle",l);break;case"input":ut(l,h),zt("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!h.multiple},zt("invalid",l);break;case"textarea":P(l,h),zt("invalid",l)}Ye(o,h),c=null;for(var E in h)if(h.hasOwnProperty(E)){var D=h[E];E==="children"?typeof D=="string"?l.textContent!==D&&(h.suppressHydrationWarning!==!0&&pa(l.textContent,D,t),c=["children",D]):typeof D=="number"&&l.textContent!==""+D&&(h.suppressHydrationWarning!==!0&&pa(l.textContent,D,t),c=["children",""+D]):a.hasOwnProperty(E)&&D!=null&&E==="onScroll"&&zt("scroll",l)}switch(o){case"input":pt(l),Lt(l,h,!0);break;case"textarea":pt(l),Q(l);break;case"select":case"option":break;default:typeof h.onClick=="function"&&(l.onclick=ma)}l=c,i.updateQueue=l,l!==null&&(i.flags|=4)}else{E=c.nodeType===9?c:c.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=de(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=E.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof l.is=="string"?t=E.createElement(o,{is:l.is}):(t=E.createElement(o),o==="select"&&(E=t,l.multiple?E.multiple=!0:l.size&&(E.size=l.size))):t=E.createElementNS(t,o),t[hi]=i,t[go]=l,jh(t,i,!1,!1),i.stateNode=t;e:{switch(E=Pe(o,l),o){case"dialog":zt("cancel",t),zt("close",t),c=l;break;case"iframe":case"object":case"embed":zt("load",t),c=l;break;case"video":case"audio":for(c=0;c<ho.length;c++)zt(ho[c],t);c=l;break;case"source":zt("error",t),c=l;break;case"img":case"image":case"link":zt("error",t),zt("load",t),c=l;break;case"details":zt("toggle",t),c=l;break;case"input":ut(t,l),c=Rt(t,l),zt("invalid",t);break;case"option":c=l;break;case"select":t._wrapperState={wasMultiple:!!l.multiple},c=ae({},l,{value:void 0}),zt("invalid",t);break;case"textarea":P(t,l),c=kt(t,l),zt("invalid",t);break;default:c=l}Ye(o,c),D=c;for(h in D)if(D.hasOwnProperty(h)){var O=D[h];h==="style"?Ne(t,O):h==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,O!=null&&Ke(t,O)):h==="children"?typeof O=="string"?(o!=="textarea"||O!=="")&&Ae(t,O):typeof O=="number"&&Ae(t,""+O):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(a.hasOwnProperty(h)?O!=null&&h==="onScroll"&&zt("scroll",t):O!=null&&L(t,h,O,E))}switch(o){case"input":pt(t),Lt(t,l,!1);break;case"textarea":pt(t),Q(t);break;case"option":l.value!=null&&t.setAttribute("value",""+_e(l.value));break;case"select":t.multiple=!!l.multiple,h=l.value,h!=null?Ot(t,!!l.multiple,h,!1):l.defaultValue!=null&&Ot(t,!!l.multiple,l.defaultValue,!0);break;default:typeof c.onClick=="function"&&(t.onclick=ma)}switch(o){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return gn(i),null;case 6:if(t&&i.stateNode!=null)qh(t,i,t.memoizedProps,l);else{if(typeof l!="string"&&i.stateNode===null)throw Error(n(166));if(o=Dr(So.current),Dr(pi.current),Ea(i)){if(l=i.stateNode,o=i.memoizedProps,l[hi]=i,(h=l.nodeValue!==o)&&(t=On,t!==null))switch(t.tag){case 3:pa(l.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&pa(l.nodeValue,o,(t.mode&1)!==0)}h&&(i.flags|=4)}else l=(o.nodeType===9?o:o.ownerDocument).createTextNode(l),l[hi]=i,i.stateNode=l}return gn(i),null;case 13:if(Bt(Vt),l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ht&&kn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Zd(),gs(),i.flags|=98560,h=!1;else if(h=Ea(i),l!==null&&l.dehydrated!==null){if(t===null){if(!h)throw Error(n(318));if(h=i.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(n(317));h[hi]=i}else gs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;gn(i),h=!1}else ti!==null&&(ic(ti),ti=null),h=!0;if(!h)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(l=l!==null,l!==(t!==null&&t.memoizedState!==null)&&l&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(Vt.current&1)!==0?Jt===0&&(Jt=3):oc())),i.updateQueue!==null&&(i.flags|=4),gn(i),null);case 4:return ys(),ju(t,i),t===null&&po(i.stateNode.containerInfo),gn(i),null;case 10:return yu(i.type._context),gn(i),null;case 17:return Rn(i.type)&&_a(),gn(i),null;case 19:if(Bt(Vt),h=i.memoizedState,h===null)return gn(i),null;if(l=(i.flags&128)!==0,E=h.rendering,E===null)if(l)Ao(h,!1);else{if(Jt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(E=Ca(t),E!==null){for(i.flags|=128,Ao(h,!1),l=E.updateQueue,l!==null&&(i.updateQueue=l,i.flags|=4),i.subtreeFlags=0,l=o,o=i.child;o!==null;)h=o,t=l,h.flags&=14680066,E=h.alternate,E===null?(h.childLanes=0,h.lanes=t,h.child=null,h.subtreeFlags=0,h.memoizedProps=null,h.memoizedState=null,h.updateQueue=null,h.dependencies=null,h.stateNode=null):(h.childLanes=E.childLanes,h.lanes=E.lanes,h.child=E.child,h.subtreeFlags=0,h.deletions=null,h.memoizedProps=E.memoizedProps,h.memoizedState=E.memoizedState,h.updateQueue=E.updateQueue,h.type=E.type,t=E.dependencies,h.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Ft(Vt,Vt.current&1|2),i.child}t=t.sibling}h.tail!==null&&W()>Ts&&(i.flags|=128,l=!0,Ao(h,!1),i.lanes=4194304)}else{if(!l)if(t=Ca(E),t!==null){if(i.flags|=128,l=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Ao(h,!0),h.tail===null&&h.tailMode==="hidden"&&!E.alternate&&!Ht)return gn(i),null}else 2*W()-h.renderingStartTime>Ts&&o!==1073741824&&(i.flags|=128,l=!0,Ao(h,!1),i.lanes=4194304);h.isBackwards?(E.sibling=i.child,i.child=E):(o=h.last,o!==null?o.sibling=E:i.child=E,h.last=E)}return h.tail!==null?(i=h.tail,h.rendering=i,h.tail=i.sibling,h.renderingStartTime=W(),i.sibling=null,o=Vt.current,Ft(Vt,l?o&1|2:o&1),i):(gn(i),null);case 22:case 23:return sc(),l=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==l&&(i.flags|=8192),l&&(i.mode&1)!==0?(zn&1073741824)!==0&&(gn(i),i.subtreeFlags&6&&(i.flags|=8192)):gn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function E_(t,i){switch(pu(i),i.tag){case 1:return Rn(i.type)&&_a(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ys(),Bt(An),Bt(pn),Ru(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return wu(i),null;case 13:if(Bt(Vt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));gs()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Bt(Vt),null;case 4:return ys(),null;case 10:return yu(i.type._context),null;case 22:case 23:return sc(),null;case 24:return null;default:return null}}var Oa=!1,_n=!1,M_=typeof WeakSet=="function"?WeakSet:Set,ze=null;function Es(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(l){Wt(t,i,l)}else o.current=null}function Yu(t,i,o){try{o()}catch(l){Wt(t,i,l)}}var Kh=!1;function T_(t,i){if(su=ia,t=Rd(),Zl(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var l=o.getSelection&&o.getSelection();if(l&&l.rangeCount!==0){o=l.anchorNode;var c=l.anchorOffset,h=l.focusNode;l=l.focusOffset;try{o.nodeType,h.nodeType}catch{o=null;break e}var E=0,D=-1,O=-1,ie=0,ve=0,ye=t,me=null;t:for(;;){for(var Oe;ye!==o||c!==0&&ye.nodeType!==3||(D=E+c),ye!==h||l!==0&&ye.nodeType!==3||(O=E+l),ye.nodeType===3&&(E+=ye.nodeValue.length),(Oe=ye.firstChild)!==null;)me=ye,ye=Oe;for(;;){if(ye===t)break t;if(me===o&&++ie===c&&(D=E),me===h&&++ve===l&&(O=E),(Oe=ye.nextSibling)!==null)break;ye=me,me=ye.parentNode}ye=Oe}o=D===-1||O===-1?null:{start:D,end:O}}else o=null}o=o||{start:0,end:0}}else o=null;for(ou={focusedElem:t,selectionRange:o},ia=!1,ze=i;ze!==null;)if(i=ze,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,ze=t;else for(;ze!==null;){i=ze;try{var Ve=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ve!==null){var je=Ve.memoizedProps,jt=Ve.memoizedState,K=i.stateNode,G=K.getSnapshotBeforeUpdate(i.elementType===i.type?je:ni(i.type,je),jt);K.__reactInternalSnapshotBeforeUpdate=G}break;case 3:var J=i.stateNode.containerInfo;J.nodeType===1?J.textContent="":J.nodeType===9&&J.documentElement&&J.removeChild(J.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(we){Wt(i,i.return,we)}if(t=i.sibling,t!==null){t.return=i.return,ze=t;break}ze=i.return}return Ve=Kh,Kh=!1,Ve}function Ro(t,i,o){var l=i.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var c=l=l.next;do{if((c.tag&t)===t){var h=c.destroy;c.destroy=void 0,h!==void 0&&Yu(i,o,h)}c=c.next}while(c!==l)}}function ka(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var l=o.create;o.destroy=l()}o=o.next}while(o!==i)}}function qu(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function $h(t){var i=t.alternate;i!==null&&(t.alternate=null,$h(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[hi],delete i[go],delete i[cu],delete i[o_],delete i[a_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Zh(t){return t.tag===5||t.tag===3||t.tag===4}function Qh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Zh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ku(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ma));else if(l!==4&&(t=t.child,t!==null))for(Ku(t,i,o),t=t.sibling;t!==null;)Ku(t,i,o),t=t.sibling}function $u(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(l!==4&&(t=t.child,t!==null))for($u(t,i,o),t=t.sibling;t!==null;)$u(t,i,o),t=t.sibling}var un=null,ii=!1;function ir(t,i,o){for(o=o.child;o!==null;)Jh(t,i,o),o=o.sibling}function Jh(t,i,o){if(st&&typeof st.onCommitFiberUnmount=="function")try{st.onCommitFiberUnmount(Ze,o)}catch{}switch(o.tag){case 5:_n||Es(o,i);case 6:var l=un,c=ii;un=null,ir(t,i,o),un=l,ii=c,un!==null&&(ii?(t=un,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):un.removeChild(o.stateNode));break;case 18:un!==null&&(ii?(t=un,o=o.stateNode,t.nodeType===8?uu(t.parentNode,o):t.nodeType===1&&uu(t,o),ro(t)):uu(un,o.stateNode));break;case 4:l=un,c=ii,un=o.stateNode.containerInfo,ii=!0,ir(t,i,o),un=l,ii=c;break;case 0:case 11:case 14:case 15:if(!_n&&(l=o.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){c=l=l.next;do{var h=c,E=h.destroy;h=h.tag,E!==void 0&&((h&2)!==0||(h&4)!==0)&&Yu(o,i,E),c=c.next}while(c!==l)}ir(t,i,o);break;case 1:if(!_n&&(Es(o,i),l=o.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=o.memoizedProps,l.state=o.memoizedState,l.componentWillUnmount()}catch(D){Wt(o,i,D)}ir(t,i,o);break;case 21:ir(t,i,o);break;case 22:o.mode&1?(_n=(l=_n)||o.memoizedState!==null,ir(t,i,o),_n=l):ir(t,i,o);break;default:ir(t,i,o)}}function ep(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new M_),i.forEach(function(l){var c=N_.bind(null,t,l);o.has(l)||(o.add(l),l.then(c,c))})}}function ri(t,i){var o=i.deletions;if(o!==null)for(var l=0;l<o.length;l++){var c=o[l];try{var h=t,E=i,D=E;e:for(;D!==null;){switch(D.tag){case 5:un=D.stateNode,ii=!1;break e;case 3:un=D.stateNode.containerInfo,ii=!0;break e;case 4:un=D.stateNode.containerInfo,ii=!0;break e}D=D.return}if(un===null)throw Error(n(160));Jh(h,E,c),un=null,ii=!1;var O=c.alternate;O!==null&&(O.return=null),c.return=null}catch(ie){Wt(c,i,ie)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)tp(i,t),i=i.sibling}function tp(t,i){var o=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ri(i,t),gi(t),l&4){try{Ro(3,t,t.return),ka(3,t)}catch(je){Wt(t,t.return,je)}try{Ro(5,t,t.return)}catch(je){Wt(t,t.return,je)}}break;case 1:ri(i,t),gi(t),l&512&&o!==null&&Es(o,o.return);break;case 5:if(ri(i,t),gi(t),l&512&&o!==null&&Es(o,o.return),t.flags&32){var c=t.stateNode;try{Ae(c,"")}catch(je){Wt(t,t.return,je)}}if(l&4&&(c=t.stateNode,c!=null)){var h=t.memoizedProps,E=o!==null?o.memoizedProps:h,D=t.type,O=t.updateQueue;if(t.updateQueue=null,O!==null)try{D==="input"&&h.type==="radio"&&h.name!=null&&nt(c,h),Pe(D,E);var ie=Pe(D,h);for(E=0;E<O.length;E+=2){var ve=O[E],ye=O[E+1];ve==="style"?Ne(c,ye):ve==="dangerouslySetInnerHTML"?Ke(c,ye):ve==="children"?Ae(c,ye):L(c,ve,ye,ie)}switch(D){case"input":Ge(c,h);break;case"textarea":M(c,h);break;case"select":var me=c._wrapperState.wasMultiple;c._wrapperState.wasMultiple=!!h.multiple;var Oe=h.value;Oe!=null?Ot(c,!!h.multiple,Oe,!1):me!==!!h.multiple&&(h.defaultValue!=null?Ot(c,!!h.multiple,h.defaultValue,!0):Ot(c,!!h.multiple,h.multiple?[]:"",!1))}c[go]=h}catch(je){Wt(t,t.return,je)}}break;case 6:if(ri(i,t),gi(t),l&4){if(t.stateNode===null)throw Error(n(162));c=t.stateNode,h=t.memoizedProps;try{c.nodeValue=h}catch(je){Wt(t,t.return,je)}}break;case 3:if(ri(i,t),gi(t),l&4&&o!==null&&o.memoizedState.isDehydrated)try{ro(i.containerInfo)}catch(je){Wt(t,t.return,je)}break;case 4:ri(i,t),gi(t);break;case 13:ri(i,t),gi(t),c=t.child,c.flags&8192&&(h=c.memoizedState!==null,c.stateNode.isHidden=h,!h||c.alternate!==null&&c.alternate.memoizedState!==null||(Ju=W())),l&4&&ep(t);break;case 22:if(ve=o!==null&&o.memoizedState!==null,t.mode&1?(_n=(ie=_n)||ve,ri(i,t),_n=ie):ri(i,t),gi(t),l&8192){if(ie=t.memoizedState!==null,(t.stateNode.isHidden=ie)&&!ve&&(t.mode&1)!==0)for(ze=t,ve=t.child;ve!==null;){for(ye=ze=ve;ze!==null;){switch(me=ze,Oe=me.child,me.tag){case 0:case 11:case 14:case 15:Ro(4,me,me.return);break;case 1:Es(me,me.return);var Ve=me.stateNode;if(typeof Ve.componentWillUnmount=="function"){l=me,o=me.return;try{i=l,Ve.props=i.memoizedProps,Ve.state=i.memoizedState,Ve.componentWillUnmount()}catch(je){Wt(l,o,je)}}break;case 5:Es(me,me.return);break;case 22:if(me.memoizedState!==null){rp(ye);continue}}Oe!==null?(Oe.return=me,ze=Oe):rp(ye)}ve=ve.sibling}e:for(ve=null,ye=t;;){if(ye.tag===5){if(ve===null){ve=ye;try{c=ye.stateNode,ie?(h=c.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none"):(D=ye.stateNode,O=ye.memoizedProps.style,E=O!=null&&O.hasOwnProperty("display")?O.display:null,D.style.display=Te("display",E))}catch(je){Wt(t,t.return,je)}}}else if(ye.tag===6){if(ve===null)try{ye.stateNode.nodeValue=ie?"":ye.memoizedProps}catch(je){Wt(t,t.return,je)}}else if((ye.tag!==22&&ye.tag!==23||ye.memoizedState===null||ye===t)&&ye.child!==null){ye.child.return=ye,ye=ye.child;continue}if(ye===t)break e;for(;ye.sibling===null;){if(ye.return===null||ye.return===t)break e;ve===ye&&(ve=null),ye=ye.return}ve===ye&&(ve=null),ye.sibling.return=ye.return,ye=ye.sibling}}break;case 19:ri(i,t),gi(t),l&4&&ep(t);break;case 21:break;default:ri(i,t),gi(t)}}function gi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(Zh(o)){var l=o;break e}o=o.return}throw Error(n(160))}switch(l.tag){case 5:var c=l.stateNode;l.flags&32&&(Ae(c,""),l.flags&=-33);var h=Qh(t);$u(t,h,c);break;case 3:case 4:var E=l.stateNode.containerInfo,D=Qh(t);Ku(t,D,E);break;default:throw Error(n(161))}}catch(O){Wt(t,t.return,O)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function w_(t,i,o){ze=t,np(t)}function np(t,i,o){for(var l=(t.mode&1)!==0;ze!==null;){var c=ze,h=c.child;if(c.tag===22&&l){var E=c.memoizedState!==null||Oa;if(!E){var D=c.alternate,O=D!==null&&D.memoizedState!==null||_n;D=Oa;var ie=_n;if(Oa=E,(_n=O)&&!ie)for(ze=c;ze!==null;)E=ze,O=E.child,E.tag===22&&E.memoizedState!==null?sp(c):O!==null?(O.return=E,ze=O):sp(c);for(;h!==null;)ze=h,np(h),h=h.sibling;ze=c,Oa=D,_n=ie}ip(t)}else(c.subtreeFlags&8772)!==0&&h!==null?(h.return=c,ze=h):ip(t)}}function ip(t){for(;ze!==null;){var i=ze;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:_n||ka(5,i);break;case 1:var l=i.stateNode;if(i.flags&4&&!_n)if(o===null)l.componentDidMount();else{var c=i.elementType===i.type?o.memoizedProps:ni(i.type,o.memoizedProps);l.componentDidUpdate(c,o.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var h=i.updateQueue;h!==null&&rh(i,h,l);break;case 3:var E=i.updateQueue;if(E!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}rh(i,E,o)}break;case 5:var D=i.stateNode;if(o===null&&i.flags&4){o=D;var O=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":O.autoFocus&&o.focus();break;case"img":O.src&&(o.src=O.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ie=i.alternate;if(ie!==null){var ve=ie.memoizedState;if(ve!==null){var ye=ve.dehydrated;ye!==null&&ro(ye)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}_n||i.flags&512&&qu(i)}catch(me){Wt(i,i.return,me)}}if(i===t){ze=null;break}if(o=i.sibling,o!==null){o.return=i.return,ze=o;break}ze=i.return}}function rp(t){for(;ze!==null;){var i=ze;if(i===t){ze=null;break}var o=i.sibling;if(o!==null){o.return=i.return,ze=o;break}ze=i.return}}function sp(t){for(;ze!==null;){var i=ze;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{ka(4,i)}catch(O){Wt(i,o,O)}break;case 1:var l=i.stateNode;if(typeof l.componentDidMount=="function"){var c=i.return;try{l.componentDidMount()}catch(O){Wt(i,c,O)}}var h=i.return;try{qu(i)}catch(O){Wt(i,h,O)}break;case 5:var E=i.return;try{qu(i)}catch(O){Wt(i,E,O)}}}catch(O){Wt(i,i.return,O)}if(i===t){ze=null;break}var D=i.sibling;if(D!==null){D.return=i.return,ze=D;break}ze=i.return}}var A_=Math.ceil,za=b.ReactCurrentDispatcher,Zu=b.ReactCurrentOwner,Kn=b.ReactCurrentBatchConfig,St=0,on=null,qt=null,cn=0,zn=0,Ms=Qi(0),Jt=0,Co=null,Nr=0,Ba=0,Qu=0,bo=null,bn=null,Ju=0,Ts=1/0,Di=null,Ha=!1,ec=null,rr=null,Va=!1,sr=null,Ga=0,Po=0,tc=null,Wa=-1,Xa=0;function Mn(){return(St&6)!==0?W():Wa!==-1?Wa:Wa=W()}function or(t){return(t.mode&1)===0?1:(St&2)!==0&&cn!==0?cn&-cn:u_.transition!==null?(Xa===0&&(Xa=Sn()),Xa):(t=vt,t!==0||(t=window.event,t=t===void 0?16:ad(t.type)),t)}function si(t,i,o,l){if(50<Po)throw Po=0,tc=null,Error(n(185));Xt(t,o,l),((St&2)===0||t!==on)&&(t===on&&((St&2)===0&&(Ba|=o),Jt===4&&ar(t,cn)),Pn(t,l),o===1&&St===0&&(i.mode&1)===0&&(Ts=W()+500,xa&&er()))}function Pn(t,i){var o=t.callbackNode;Tr(t,i);var l=Jn(t,t===on?cn:0);if(l===0)o!==null&&Y(o),t.callbackNode=null,t.callbackPriority=0;else if(i=l&-l,t.callbackPriority!==i){if(o!=null&&Y(o),i===1)t.tag===0?l_(ap.bind(null,t)):jd(ap.bind(null,t)),r_(function(){(St&6)===0&&er()}),o=null;else{switch(Jf(l)){case 1:o=De;break;case 4:o=He;break;case 16:o=Fe;break;case 536870912:o=rt;break;default:o=Fe}o=mp(o,op.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function op(t,i){if(Wa=-1,Xa=0,(St&6)!==0)throw Error(n(327));var o=t.callbackNode;if(ws()&&t.callbackNode!==o)return null;var l=Jn(t,t===on?cn:0);if(l===0)return null;if((l&30)!==0||(l&t.expiredLanes)!==0||i)i=ja(t,l);else{i=l;var c=St;St|=2;var h=up();(on!==t||cn!==i)&&(Di=null,Ts=W()+500,Ur(t,i));do try{b_();break}catch(D){lp(t,D)}while(!0);xu(),za.current=h,St=c,qt!==null?i=0:(on=null,cn=0,i=Jt)}if(i!==0){if(i===2&&(c=It(t),c!==0&&(l=c,i=nc(t,c))),i===1)throw o=Co,Ur(t,0),ar(t,l),Pn(t,W()),o;if(i===6)ar(t,l);else{if(c=t.current.alternate,(l&30)===0&&!R_(c)&&(i=ja(t,l),i===2&&(h=It(t),h!==0&&(l=h,i=nc(t,h))),i===1))throw o=Co,Ur(t,0),ar(t,l),Pn(t,W()),o;switch(t.finishedWork=c,t.finishedLanes=l,i){case 0:case 1:throw Error(n(345));case 2:Fr(t,bn,Di);break;case 3:if(ar(t,l),(l&130023424)===l&&(i=Ju+500-W(),10<i)){if(Jn(t,0)!==0)break;if(c=t.suspendedLanes,(c&l)!==l){Mn(),t.pingedLanes|=t.suspendedLanes&c;break}t.timeoutHandle=lu(Fr.bind(null,t,bn,Di),i);break}Fr(t,bn,Di);break;case 4:if(ar(t,l),(l&4194240)===l)break;for(i=t.eventTimes,c=-1;0<l;){var E=31-yt(l);h=1<<E,E=i[E],E>c&&(c=E),l&=~h}if(l=c,l=W()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*A_(l/1960))-l,10<l){t.timeoutHandle=lu(Fr.bind(null,t,bn,Di),l);break}Fr(t,bn,Di);break;case 5:Fr(t,bn,Di);break;default:throw Error(n(329))}}}return Pn(t,W()),t.callbackNode===o?op.bind(null,t):null}function nc(t,i){var o=bo;return t.current.memoizedState.isDehydrated&&(Ur(t,i).flags|=256),t=ja(t,i),t!==2&&(i=bn,bn=o,i!==null&&ic(i)),t}function ic(t){bn===null?bn=t:bn.push.apply(bn,t)}function R_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var l=0;l<o.length;l++){var c=o[l],h=c.getSnapshot;c=c.value;try{if(!ei(h(),c))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ar(t,i){for(i&=~Qu,i&=~Ba,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-yt(i),l=1<<o;t[o]=-1,i&=~l}}function ap(t){if((St&6)!==0)throw Error(n(327));ws();var i=Jn(t,0);if((i&1)===0)return Pn(t,W()),null;var o=ja(t,i);if(t.tag!==0&&o===2){var l=It(t);l!==0&&(i=l,o=nc(t,l))}if(o===1)throw o=Co,Ur(t,0),ar(t,i),Pn(t,W()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Fr(t,bn,Di),Pn(t,W()),null}function rc(t,i){var o=St;St|=1;try{return t(i)}finally{St=o,St===0&&(Ts=W()+500,xa&&er())}}function Ir(t){sr!==null&&sr.tag===0&&(St&6)===0&&ws();var i=St;St|=1;var o=Kn.transition,l=vt;try{if(Kn.transition=null,vt=1,t)return t()}finally{vt=l,Kn.transition=o,St=i,(St&6)===0&&er()}}function sc(){zn=Ms.current,Bt(Ms)}function Ur(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,i_(o)),qt!==null)for(o=qt.return;o!==null;){var l=o;switch(pu(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&_a();break;case 3:ys(),Bt(An),Bt(pn),Ru();break;case 5:wu(l);break;case 4:ys();break;case 13:Bt(Vt);break;case 19:Bt(Vt);break;case 10:yu(l.type._context);break;case 22:case 23:sc()}o=o.return}if(on=t,qt=t=lr(t.current,null),cn=zn=i,Jt=0,Co=null,Qu=Ba=Nr=0,bn=bo=null,Pr!==null){for(i=0;i<Pr.length;i++)if(o=Pr[i],l=o.interleaved,l!==null){o.interleaved=null;var c=l.next,h=o.pending;if(h!==null){var E=h.next;h.next=c,l.next=E}o.pending=l}Pr=null}return t}function lp(t,i){do{var o=qt;try{if(xu(),ba.current=Na,Pa){for(var l=Gt.memoizedState;l!==null;){var c=l.queue;c!==null&&(c.pending=null),l=l.next}Pa=!1}if(Lr=0,sn=Qt=Gt=null,Eo=!1,Mo=0,Zu.current=null,o===null||o.return===null){Jt=1,Co=i,qt=null;break}e:{var h=t,E=o.return,D=o,O=i;if(i=cn,D.flags|=32768,O!==null&&typeof O=="object"&&typeof O.then=="function"){var ie=O,ve=D,ye=ve.tag;if((ve.mode&1)===0&&(ye===0||ye===11||ye===15)){var me=ve.alternate;me?(ve.updateQueue=me.updateQueue,ve.memoizedState=me.memoizedState,ve.lanes=me.lanes):(ve.updateQueue=null,ve.memoizedState=null)}var Oe=Nh(E);if(Oe!==null){Oe.flags&=-257,Ih(Oe,E,D,h,i),Oe.mode&1&&Lh(h,ie,i),i=Oe,O=ie;var Ve=i.updateQueue;if(Ve===null){var je=new Set;je.add(O),i.updateQueue=je}else Ve.add(O);break e}else{if((i&1)===0){Lh(h,ie,i),oc();break e}O=Error(n(426))}}else if(Ht&&D.mode&1){var jt=Nh(E);if(jt!==null){(jt.flags&65536)===0&&(jt.flags|=256),Ih(jt,E,D,h,i),_u(Ss(O,D));break e}}h=O=Ss(O,D),Jt!==4&&(Jt=2),bo===null?bo=[h]:bo.push(h),h=E;do{switch(h.tag){case 3:h.flags|=65536,i&=-i,h.lanes|=i;var K=Ph(h,O,i);ih(h,K);break e;case 1:D=O;var G=h.type,J=h.stateNode;if((h.flags&128)===0&&(typeof G.getDerivedStateFromError=="function"||J!==null&&typeof J.componentDidCatch=="function"&&(rr===null||!rr.has(J)))){h.flags|=65536,i&=-i,h.lanes|=i;var we=Dh(h,D,i);ih(h,we);break e}}h=h.return}while(h!==null)}fp(o)}catch(qe){i=qe,qt===o&&o!==null&&(qt=o=o.return);continue}break}while(!0)}function up(){var t=za.current;return za.current=Na,t===null?Na:t}function oc(){(Jt===0||Jt===3||Jt===2)&&(Jt=4),on===null||(Nr&268435455)===0&&(Ba&268435455)===0||ar(on,cn)}function ja(t,i){var o=St;St|=2;var l=up();(on!==t||cn!==i)&&(Di=null,Ur(t,i));do try{C_();break}catch(c){lp(t,c)}while(!0);if(xu(),St=o,za.current=l,qt!==null)throw Error(n(261));return on=null,cn=0,Jt}function C_(){for(;qt!==null;)cp(qt)}function b_(){for(;qt!==null&&!se();)cp(qt)}function cp(t){var i=pp(t.alternate,t,zn);t.memoizedProps=t.pendingProps,i===null?fp(t):qt=i,Zu.current=null}function fp(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=S_(o,i,zn),o!==null){qt=o;return}}else{if(o=E_(o,i),o!==null){o.flags&=32767,qt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Jt=6,qt=null;return}}if(i=i.sibling,i!==null){qt=i;return}qt=i=t}while(i!==null);Jt===0&&(Jt=5)}function Fr(t,i,o){var l=vt,c=Kn.transition;try{Kn.transition=null,vt=1,P_(t,i,o,l)}finally{Kn.transition=c,vt=l}return null}function P_(t,i,o,l){do ws();while(sr!==null);if((St&6)!==0)throw Error(n(327));o=t.finishedWork;var c=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var h=o.lanes|o.childLanes;if(hn(t,h),t===on&&(qt=on=null,cn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Va||(Va=!0,mp(Fe,function(){return ws(),null})),h=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||h){h=Kn.transition,Kn.transition=null;var E=vt;vt=1;var D=St;St|=4,Zu.current=null,T_(t,o),tp(o,t),$g(ou),ia=!!su,ou=su=null,t.current=o,w_(o),oe(),St=D,vt=E,Kn.transition=h}else t.current=o;if(Va&&(Va=!1,sr=t,Ga=c),h=t.pendingLanes,h===0&&(rr=null),Tt(o.stateNode),Pn(t,W()),i!==null)for(l=t.onRecoverableError,o=0;o<i.length;o++)c=i[o],l(c.value,{componentStack:c.stack,digest:c.digest});if(Ha)throw Ha=!1,t=ec,ec=null,t;return(Ga&1)!==0&&t.tag!==0&&ws(),h=t.pendingLanes,(h&1)!==0?t===tc?Po++:(Po=0,tc=t):Po=0,er(),null}function ws(){if(sr!==null){var t=Jf(Ga),i=Kn.transition,o=vt;try{if(Kn.transition=null,vt=16>t?16:t,sr===null)var l=!1;else{if(t=sr,sr=null,Ga=0,(St&6)!==0)throw Error(n(331));var c=St;for(St|=4,ze=t.current;ze!==null;){var h=ze,E=h.child;if((ze.flags&16)!==0){var D=h.deletions;if(D!==null){for(var O=0;O<D.length;O++){var ie=D[O];for(ze=ie;ze!==null;){var ve=ze;switch(ve.tag){case 0:case 11:case 15:Ro(8,ve,h)}var ye=ve.child;if(ye!==null)ye.return=ve,ze=ye;else for(;ze!==null;){ve=ze;var me=ve.sibling,Oe=ve.return;if($h(ve),ve===ie){ze=null;break}if(me!==null){me.return=Oe,ze=me;break}ze=Oe}}}var Ve=h.alternate;if(Ve!==null){var je=Ve.child;if(je!==null){Ve.child=null;do{var jt=je.sibling;je.sibling=null,je=jt}while(je!==null)}}ze=h}}if((h.subtreeFlags&2064)!==0&&E!==null)E.return=h,ze=E;else e:for(;ze!==null;){if(h=ze,(h.flags&2048)!==0)switch(h.tag){case 0:case 11:case 15:Ro(9,h,h.return)}var K=h.sibling;if(K!==null){K.return=h.return,ze=K;break e}ze=h.return}}var G=t.current;for(ze=G;ze!==null;){E=ze;var J=E.child;if((E.subtreeFlags&2064)!==0&&J!==null)J.return=E,ze=J;else e:for(E=G;ze!==null;){if(D=ze,(D.flags&2048)!==0)try{switch(D.tag){case 0:case 11:case 15:ka(9,D)}}catch(qe){Wt(D,D.return,qe)}if(D===E){ze=null;break e}var we=D.sibling;if(we!==null){we.return=D.return,ze=we;break e}ze=D.return}}if(St=c,er(),st&&typeof st.onPostCommitFiberRoot=="function")try{st.onPostCommitFiberRoot(Ze,t)}catch{}l=!0}return l}finally{vt=o,Kn.transition=i}}return!1}function dp(t,i,o){i=Ss(o,i),i=Ph(t,i,1),t=nr(t,i,1),i=Mn(),t!==null&&(Xt(t,1,i),Pn(t,i))}function Wt(t,i,o){if(t.tag===3)dp(t,t,o);else for(;i!==null;){if(i.tag===3){dp(i,t,o);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(rr===null||!rr.has(l))){t=Ss(o,t),t=Dh(i,t,1),i=nr(i,t,1),t=Mn(),i!==null&&(Xt(i,1,t),Pn(i,t));break}}i=i.return}}function D_(t,i,o){var l=t.pingCache;l!==null&&l.delete(i),i=Mn(),t.pingedLanes|=t.suspendedLanes&o,on===t&&(cn&o)===o&&(Jt===4||Jt===3&&(cn&130023424)===cn&&500>W()-Ju?Ur(t,0):Qu|=o),Pn(t,i)}function hp(t,i){i===0&&((t.mode&1)===0?i=1:(i=_t,_t<<=1,(_t&130023424)===0&&(_t=4194304)));var o=Mn();t=Ci(t,i),t!==null&&(Xt(t,i,o),Pn(t,o))}function L_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),hp(t,o)}function N_(t,i){var o=0;switch(t.tag){case 13:var l=t.stateNode,c=t.memoizedState;c!==null&&(o=c.retryLane);break;case 19:l=t.stateNode;break;default:throw Error(n(314))}l!==null&&l.delete(i),hp(t,o)}var pp;pp=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||An.current)Cn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return Cn=!1,y_(t,i,o);Cn=(t.flags&131072)!==0}else Cn=!1,Ht&&(i.flags&1048576)!==0&&Yd(i,Sa,i.index);switch(i.lanes=0,i.tag){case 2:var l=i.type;Fa(t,i),t=i.pendingProps;var c=hs(i,pn.current);xs(i,o),c=Pu(null,i,l,t,c,o);var h=Du();return i.flags|=1,typeof c=="object"&&c!==null&&typeof c.render=="function"&&c.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Rn(l)?(h=!0,va(i)):h=!1,i.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,Mu(i),c.updater=Ia,i.stateNode=c,c._reactInternals=i,Ou(i,l,t,o),i=Hu(null,i,l,!0,h,o)):(i.tag=0,Ht&&h&&hu(i),En(null,i,c,o),i=i.child),i;case 16:l=i.elementType;e:{switch(Fa(t,i),t=i.pendingProps,c=l._init,l=c(l._payload),i.type=l,c=i.tag=U_(l),t=ni(l,t),c){case 0:i=Bu(null,i,l,t,o);break e;case 1:i=Bh(null,i,l,t,o);break e;case 11:i=Uh(null,i,l,t,o);break e;case 14:i=Fh(null,i,l,ni(l.type,t),o);break e}throw Error(n(306,l,""))}return i;case 0:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ni(l,c),Bu(t,i,l,c,o);case 1:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ni(l,c),Bh(t,i,l,c,o);case 3:e:{if(Hh(i),t===null)throw Error(n(387));l=i.pendingProps,h=i.memoizedState,c=h.element,nh(t,i),Ra(i,l,null,o);var E=i.memoizedState;if(l=E.element,h.isDehydrated)if(h={element:l,isDehydrated:!1,cache:E.cache,pendingSuspenseBoundaries:E.pendingSuspenseBoundaries,transitions:E.transitions},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){c=Ss(Error(n(423)),i),i=Vh(t,i,l,o,c);break e}else if(l!==c){c=Ss(Error(n(424)),i),i=Vh(t,i,l,o,c);break e}else for(kn=Zi(i.stateNode.containerInfo.firstChild),On=i,Ht=!0,ti=null,o=eh(i,null,l,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(gs(),l===c){i=Pi(t,i,o);break e}En(t,i,l,o)}i=i.child}return i;case 5:return sh(i),t===null&&gu(i),l=i.type,c=i.pendingProps,h=t!==null?t.memoizedProps:null,E=c.children,au(l,c)?E=null:h!==null&&au(l,h)&&(i.flags|=32),zh(t,i),En(t,i,E,o),i.child;case 6:return t===null&&gu(i),null;case 13:return Gh(t,i,o);case 4:return Tu(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=_s(i,null,l,o):En(t,i,l,o),i.child;case 11:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ni(l,c),Uh(t,i,l,c,o);case 7:return En(t,i,i.pendingProps,o),i.child;case 8:return En(t,i,i.pendingProps.children,o),i.child;case 12:return En(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(l=i.type._context,c=i.pendingProps,h=i.memoizedProps,E=c.value,Ft(Ta,l._currentValue),l._currentValue=E,h!==null)if(ei(h.value,E)){if(h.children===c.children&&!An.current){i=Pi(t,i,o);break e}}else for(h=i.child,h!==null&&(h.return=i);h!==null;){var D=h.dependencies;if(D!==null){E=h.child;for(var O=D.firstContext;O!==null;){if(O.context===l){if(h.tag===1){O=bi(-1,o&-o),O.tag=2;var ie=h.updateQueue;if(ie!==null){ie=ie.shared;var ve=ie.pending;ve===null?O.next=O:(O.next=ve.next,ve.next=O),ie.pending=O}}h.lanes|=o,O=h.alternate,O!==null&&(O.lanes|=o),Su(h.return,o,i),D.lanes|=o;break}O=O.next}}else if(h.tag===10)E=h.type===i.type?null:h.child;else if(h.tag===18){if(E=h.return,E===null)throw Error(n(341));E.lanes|=o,D=E.alternate,D!==null&&(D.lanes|=o),Su(E,o,i),E=h.sibling}else E=h.child;if(E!==null)E.return=h;else for(E=h;E!==null;){if(E===i){E=null;break}if(h=E.sibling,h!==null){h.return=E.return,E=h;break}E=E.return}h=E}En(t,i,c.children,o),i=i.child}return i;case 9:return c=i.type,l=i.pendingProps.children,xs(i,o),c=Yn(c),l=l(c),i.flags|=1,En(t,i,l,o),i.child;case 14:return l=i.type,c=ni(l,i.pendingProps),c=ni(l.type,c),Fh(t,i,l,c,o);case 15:return Oh(t,i,i.type,i.pendingProps,o);case 17:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ni(l,c),Fa(t,i),i.tag=1,Rn(l)?(t=!0,va(i)):t=!1,xs(i,o),Ch(i,l,c),Ou(i,l,c,o),Hu(null,i,l,!0,t,o);case 19:return Xh(t,i,o);case 22:return kh(t,i,o)}throw Error(n(156,i.tag))};function mp(t,i){return T(t,i)}function I_(t,i,o,l){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $n(t,i,o,l){return new I_(t,i,o,l)}function ac(t){return t=t.prototype,!(!t||!t.isReactComponent)}function U_(t){if(typeof t=="function")return ac(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ne)return 11;if(t===te)return 14}return 2}function lr(t,i){var o=t.alternate;return o===null?(o=$n(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Ya(t,i,o,l,c,h){var E=2;if(l=t,typeof t=="function")ac(t)&&(E=1);else if(typeof t=="string")E=5;else e:switch(t){case k:return Or(o.children,c,h,i);case q:E=8,c|=8;break;case R:return t=$n(12,o,i,c|2),t.elementType=R,t.lanes=h,t;case X:return t=$n(13,o,i,c),t.elementType=X,t.lanes=h,t;case j:return t=$n(19,o,i,c),t.elementType=j,t.lanes=h,t;case fe:return qa(o,c,h,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case C:E=10;break e;case B:E=9;break e;case ne:E=11;break e;case te:E=14;break e;case le:E=16,l=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=$n(E,o,i,c),i.elementType=t,i.type=l,i.lanes=h,i}function Or(t,i,o,l){return t=$n(7,t,l,i),t.lanes=o,t}function qa(t,i,o,l){return t=$n(22,t,l,i),t.elementType=fe,t.lanes=o,t.stateNode={isHidden:!1},t}function lc(t,i,o){return t=$n(6,t,null,i),t.lanes=o,t}function uc(t,i,o){return i=$n(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function F_(t,i,o,l,c){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=dn(0),this.expirationTimes=dn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dn(0),this.identifierPrefix=l,this.onRecoverableError=c,this.mutableSourceEagerHydrationData=null}function cc(t,i,o,l,c,h,E,D,O){return t=new F_(t,i,o,D,O),i===1?(i=1,h===!0&&(i|=8)):i=0,h=$n(3,null,null,i),t.current=h,h.stateNode=t,h.memoizedState={element:l,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mu(h),t}function O_(t,i,o){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:z,key:l==null?null:""+l,children:t,containerInfo:i,implementation:o}}function gp(t){if(!t)return Ji;t=t._reactInternals;e:{if(Mi(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Rn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(Rn(o))return Wd(t,o,i)}return i}function _p(t,i,o,l,c,h,E,D,O){return t=cc(o,l,!0,t,c,h,E,D,O),t.context=gp(null),o=t.current,l=Mn(),c=or(o),h=bi(l,c),h.callback=i??null,nr(o,h,c),t.current.lanes=c,Xt(t,c,l),Pn(t,l),t}function Ka(t,i,o,l){var c=i.current,h=Mn(),E=or(c);return o=gp(o),i.context===null?i.context=o:i.pendingContext=o,i=bi(h,E),i.payload={element:t},l=l===void 0?null:l,l!==null&&(i.callback=l),t=nr(c,i,E),t!==null&&(si(t,c,E,h),Aa(t,c,E)),E}function $a(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function vp(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function fc(t,i){vp(t,i),(t=t.alternate)&&vp(t,i)}function k_(){return null}var xp=typeof reportError=="function"?reportError:function(t){console.error(t)};function dc(t){this._internalRoot=t}Za.prototype.render=dc.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Ka(t,i,null,null)},Za.prototype.unmount=dc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Ir(function(){Ka(null,t,null,null)}),i[Ti]=null}};function Za(t){this._internalRoot=t}Za.prototype.unstable_scheduleHydration=function(t){if(t){var i=nd();t={blockedOn:null,target:t,priority:i};for(var o=0;o<qi.length&&i!==0&&i<qi[o].priority;o++);qi.splice(o,0,t),o===0&&sd(t)}};function hc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Qa(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function yp(){}function z_(t,i,o,l,c){if(c){if(typeof l=="function"){var h=l;l=function(){var ie=$a(E);h.call(ie)}}var E=_p(i,l,t,0,null,!1,!1,"",yp);return t._reactRootContainer=E,t[Ti]=E.current,po(t.nodeType===8?t.parentNode:t),Ir(),E}for(;c=t.lastChild;)t.removeChild(c);if(typeof l=="function"){var D=l;l=function(){var ie=$a(O);D.call(ie)}}var O=cc(t,0,!1,null,null,!1,!1,"",yp);return t._reactRootContainer=O,t[Ti]=O.current,po(t.nodeType===8?t.parentNode:t),Ir(function(){Ka(i,O,o,l)}),O}function Ja(t,i,o,l,c){var h=o._reactRootContainer;if(h){var E=h;if(typeof c=="function"){var D=c;c=function(){var O=$a(E);D.call(O)}}Ka(i,E,t,c)}else E=z_(o,i,t,c,l);return $a(E)}ed=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Zt(i.pendingLanes);o!==0&&(wr(i,o|1),Pn(i,W()),(St&6)===0&&(Ts=W()+500,er()))}break;case 13:Ir(function(){var l=Ci(t,1);if(l!==null){var c=Mn();si(l,t,1,c)}}),fc(t,1)}},kl=function(t){if(t.tag===13){var i=Ci(t,134217728);if(i!==null){var o=Mn();si(i,t,134217728,o)}fc(t,134217728)}},td=function(t){if(t.tag===13){var i=or(t),o=Ci(t,i);if(o!==null){var l=Mn();si(o,t,i,l)}fc(t,i)}},nd=function(){return vt},id=function(t,i){var o=vt;try{return vt=t,i()}finally{vt=o}},Ee=function(t,i,o){switch(i){case"input":if(Ge(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var l=o[i];if(l!==t&&l.form===t.form){var c=ga(l);if(!c)throw Error(n(90));$t(l),Ge(l,c)}}}break;case"textarea":M(t,o);break;case"select":i=o.value,i!=null&&Ot(t,!!o.multiple,i,!1)}},lt=rc,wt=Ir;var B_={usingClientEntryPoint:!1,Events:[_o,fs,ga,he,Xe,rc]},Do={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},H_={bundleType:Do.bundleType,version:Do.version,rendererPackageName:Do.rendererPackageName,rendererConfig:Do.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Jo(t),t===null?null:t.stateNode},findFiberByHostInstance:Do.findFiberByHostInstance||k_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var el=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!el.isDisabled&&el.supportsFiber)try{Ze=el.inject(H_),st=el}catch{}}return Dn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=B_,Dn.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!hc(i))throw Error(n(200));return O_(t,i,null,o)},Dn.createRoot=function(t,i){if(!hc(t))throw Error(n(299));var o=!1,l="",c=xp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onRecoverableError!==void 0&&(c=i.onRecoverableError)),i=cc(t,1,!1,null,null,o,!1,l,c),t[Ti]=i.current,po(t.nodeType===8?t.parentNode:t),new dc(i)},Dn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=Jo(i),t=t===null?null:t.stateNode,t},Dn.flushSync=function(t){return Ir(t)},Dn.hydrate=function(t,i,o){if(!Qa(i))throw Error(n(200));return Ja(null,t,i,!0,o)},Dn.hydrateRoot=function(t,i,o){if(!hc(t))throw Error(n(405));var l=o!=null&&o.hydratedSources||null,c=!1,h="",E=xp;if(o!=null&&(o.unstable_strictMode===!0&&(c=!0),o.identifierPrefix!==void 0&&(h=o.identifierPrefix),o.onRecoverableError!==void 0&&(E=o.onRecoverableError)),i=_p(i,null,t,1,o??null,c,!1,h,E),t[Ti]=i.current,po(t),l)for(t=0;t<l.length;t++)o=l[t],c=o._getVersion,c=c(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,c]:i.mutableSourceEagerHydrationData.push(o,c);return new Za(i)},Dn.render=function(t,i,o){if(!Qa(i))throw Error(n(200));return Ja(null,t,i,!1,o)},Dn.unmountComponentAtNode=function(t){if(!Qa(t))throw Error(n(40));return t._reactRootContainer?(Ir(function(){Ja(null,null,t,!1,function(){t._reactRootContainer=null,t[Ti]=null})}),!0):!1},Dn.unstable_batchedUpdates=rc,Dn.unstable_renderSubtreeIntoContainer=function(t,i,o,l){if(!Qa(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return Ja(t,i,o,!1,l)},Dn.version="18.3.1-next-f1338f8080-20240426",Dn}var Cp;function K_(){if(Cp)return gc.exports;Cp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),gc.exports=q_(),gc.exports}var bp;function $_(){if(bp)return tl;bp=1;var s=K_();return tl.createRoot=s.createRoot,tl.hydrateRoot=s.hydrateRoot,tl}var Z_=$_(),Ut=Bf();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hf="180",Gs={ROTATE:0,DOLLY:1,PAN:2},Hs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Q_=0,Pp=1,J_=2,Lm=1,ev=2,Oi=3,Sr=0,Nn=1,ki=2,xr=0,Ws=1,Dp=2,Lp=3,Np=4,tv=5,Xr=100,nv=101,iv=102,rv=103,sv=104,ov=200,av=201,lv=202,uv=203,Kc=204,$c=205,cv=206,fv=207,dv=208,hv=209,pv=210,mv=211,gv=212,_v=213,vv=214,Zc=0,Qc=1,Jc=2,js=3,ef=4,tf=5,nf=6,rf=7,Nm=0,xv=1,yv=2,yr=0,Sv=1,Ev=2,Mv=3,Tv=4,wv=5,Av=6,Rv=7,Im=300,Ys=301,qs=302,sf=303,of=304,Nl=306,af=1e3,Yr=1001,lf=1002,fi=1003,Cv=1004,nl=1005,xi=1006,xc=1007,qr=1008,Hi=1009,Um=1010,Fm=1011,Bo=1012,Vf=1013,Zr=1014,zi=1015,jo=1016,Gf=1017,Wf=1018,Ho=1020,Om=35902,km=35899,zm=1021,Bm=1022,ci=1023,Vo=1026,Go=1027,Hm=1028,Xf=1029,Vm=1030,jf=1031,Yf=1033,wl=33776,Al=33777,Rl=33778,Cl=33779,uf=35840,cf=35841,ff=35842,df=35843,hf=36196,pf=37492,mf=37496,gf=37808,_f=37809,vf=37810,xf=37811,yf=37812,Sf=37813,Ef=37814,Mf=37815,Tf=37816,wf=37817,Af=37818,Rf=37819,Cf=37820,bf=37821,Pf=36492,Df=36494,Lf=36495,Nf=36283,If=36284,Uf=36285,Ff=36286,bv=3200,Pv=3201,Dv=0,Lv=1,_r="",Vn="srgb",Ks="srgb-linear",Pl="linear",bt="srgb",As=7680,Ip=519,Nv=512,Iv=513,Uv=514,Gm=515,Fv=516,Ov=517,kv=518,zv=519,Up=35044,Of="300 es",yi=2e3,Dl=2001;class es{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const u=a.indexOf(n);u!==-1&&a.splice(u,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let u=0,f=a.length;u<f;u++)a[u].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fp=1234567;const ko=Math.PI/180,Wo=180/Math.PI;function Zs(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(vn[s&255]+vn[s>>8&255]+vn[s>>16&255]+vn[s>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[n&63|128]+vn[n>>8&255]+"-"+vn[n>>16&255]+vn[n>>24&255]+vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]).toLowerCase()}function gt(s,e,n){return Math.max(e,Math.min(n,s))}function qf(s,e){return(s%e+e)%e}function Bv(s,e,n,r,a){return r+(s-e)*(a-r)/(n-e)}function Hv(s,e,n){return s!==e?(n-s)/(e-s):0}function zo(s,e,n){return(1-n)*s+n*e}function Vv(s,e,n,r){return zo(s,e,1-Math.exp(-n*r))}function Gv(s,e=1){return e-Math.abs(qf(s,e*2)-e)}function Wv(s,e,n){return s<=e?0:s>=n?1:(s=(s-e)/(n-e),s*s*(3-2*s))}function Xv(s,e,n){return s<=e?0:s>=n?1:(s=(s-e)/(n-e),s*s*s*(s*(s*6-15)+10))}function jv(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Yv(s,e){return s+Math.random()*(e-s)}function qv(s){return s*(.5-Math.random())}function Kv(s){s!==void 0&&(Fp=s);let e=Fp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $v(s){return s*ko}function Zv(s){return s*Wo}function Qv(s){return(s&s-1)===0&&s!==0}function Jv(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function e0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function t0(s,e,n,r,a){const u=Math.cos,f=Math.sin,d=u(n/2),m=f(n/2),p=u((e+r)/2),_=f((e+r)/2),v=u((e-r)/2),x=f((e-r)/2),S=u((r-e)/2),w=f((r-e)/2);switch(a){case"XYX":s.set(d*_,m*v,m*x,d*p);break;case"YZY":s.set(m*x,d*_,m*v,d*p);break;case"ZXZ":s.set(m*v,m*x,d*_,d*p);break;case"XZX":s.set(d*_,m*w,m*S,d*p);break;case"YXY":s.set(m*S,d*_,m*w,d*p);break;case"ZYZ":s.set(m*w,m*S,d*_,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Bs(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const vr={DEG2RAD:ko,RAD2DEG:Wo,generateUUID:Zs,clamp:gt,euclideanModulo:qf,mapLinear:Bv,inverseLerp:Hv,lerp:zo,damp:Vv,pingpong:Gv,smoothstep:Wv,smootherstep:Xv,randInt:jv,randFloat:Yv,randFloatSpread:qv,seededRandom:Kv,degToRad:$v,radToDeg:Zv,isPowerOfTwo:Qv,ceilPowerOfTwo:Jv,floorPowerOfTwo:e0,setQuaternionFromProperEuler:t0,normalize:Tn,denormalize:Bs};class ht{constructor(e=0,n=0){ht.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(gt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),u=this.x-e.x,f=this.y-e.y;return this.x=u*r-f*a+e.x,this.y=u*a+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qr{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,u,f,d){let m=r[a+0],p=r[a+1],_=r[a+2],v=r[a+3];const x=u[f+0],S=u[f+1],w=u[f+2],A=u[f+3];if(d===0){e[n+0]=m,e[n+1]=p,e[n+2]=_,e[n+3]=v;return}if(d===1){e[n+0]=x,e[n+1]=S,e[n+2]=w,e[n+3]=A;return}if(v!==A||m!==x||p!==S||_!==w){let y=1-d;const g=m*x+p*S+_*w+v*A,F=g>=0?1:-1,L=1-g*g;if(L>Number.EPSILON){const H=Math.sqrt(L),z=Math.atan2(H,g*F);y=Math.sin(y*z)/H,d=Math.sin(d*z)/H}const b=d*F;if(m=m*y+x*b,p=p*y+S*b,_=_*y+w*b,v=v*y+A*b,y===1-d){const H=1/Math.sqrt(m*m+p*p+_*_+v*v);m*=H,p*=H,_*=H,v*=H}}e[n]=m,e[n+1]=p,e[n+2]=_,e[n+3]=v}static multiplyQuaternionsFlat(e,n,r,a,u,f){const d=r[a],m=r[a+1],p=r[a+2],_=r[a+3],v=u[f],x=u[f+1],S=u[f+2],w=u[f+3];return e[n]=d*w+_*v+m*S-p*x,e[n+1]=m*w+_*x+p*v-d*S,e[n+2]=p*w+_*S+d*x-m*v,e[n+3]=_*w-d*v-m*x-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,u=e._z,f=e._order,d=Math.cos,m=Math.sin,p=d(r/2),_=d(a/2),v=d(u/2),x=m(r/2),S=m(a/2),w=m(u/2);switch(f){case"XYZ":this._x=x*_*v+p*S*w,this._y=p*S*v-x*_*w,this._z=p*_*w+x*S*v,this._w=p*_*v-x*S*w;break;case"YXZ":this._x=x*_*v+p*S*w,this._y=p*S*v-x*_*w,this._z=p*_*w-x*S*v,this._w=p*_*v+x*S*w;break;case"ZXY":this._x=x*_*v-p*S*w,this._y=p*S*v+x*_*w,this._z=p*_*w+x*S*v,this._w=p*_*v-x*S*w;break;case"ZYX":this._x=x*_*v-p*S*w,this._y=p*S*v+x*_*w,this._z=p*_*w-x*S*v,this._w=p*_*v+x*S*w;break;case"YZX":this._x=x*_*v+p*S*w,this._y=p*S*v+x*_*w,this._z=p*_*w-x*S*v,this._w=p*_*v-x*S*w;break;case"XZY":this._x=x*_*v-p*S*w,this._y=p*S*v-x*_*w,this._z=p*_*w+x*S*v,this._w=p*_*v+x*S*w;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],u=n[8],f=n[1],d=n[5],m=n[9],p=n[2],_=n[6],v=n[10],x=r+d+v;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(_-m)*S,this._y=(u-p)*S,this._z=(f-a)*S}else if(r>d&&r>v){const S=2*Math.sqrt(1+r-d-v);this._w=(_-m)/S,this._x=.25*S,this._y=(a+f)/S,this._z=(u+p)/S}else if(d>v){const S=2*Math.sqrt(1+d-r-v);this._w=(u-p)/S,this._x=(a+f)/S,this._y=.25*S,this._z=(m+_)/S}else{const S=2*Math.sqrt(1+v-r-d);this._w=(f-a)/S,this._x=(u+p)/S,this._y=(m+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,u=e._z,f=e._w,d=n._x,m=n._y,p=n._z,_=n._w;return this._x=r*_+f*d+a*p-u*m,this._y=a*_+f*m+u*d-r*p,this._z=u*_+f*p+r*m-a*d,this._w=f*_-r*d-a*m-u*p,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,u=this._z,f=this._w;let d=f*e._w+r*e._x+a*e._y+u*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=f,this._x=r,this._y=a,this._z=u,this;const m=1-d*d;if(m<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*u+n*this._z,this.normalize(),this}const p=Math.sqrt(m),_=Math.atan2(p,d),v=Math.sin((1-n)*_)/p,x=Math.sin(n*_)/p;return this._w=f*v+this._w*x,this._x=r*v+this._x*x,this._y=a*v+this._y*x,this._z=u*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),u*Math.sin(n),u*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ee{constructor(e=0,n=0,r=0){ee.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Op.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Op.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,u=e.elements;return this.x=u[0]*n+u[3]*r+u[6]*a,this.y=u[1]*n+u[4]*r+u[7]*a,this.z=u[2]*n+u[5]*r+u[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,u=e.elements,f=1/(u[3]*n+u[7]*r+u[11]*a+u[15]);return this.x=(u[0]*n+u[4]*r+u[8]*a+u[12])*f,this.y=(u[1]*n+u[5]*r+u[9]*a+u[13])*f,this.z=(u[2]*n+u[6]*r+u[10]*a+u[14])*f,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,u=e.x,f=e.y,d=e.z,m=e.w,p=2*(f*a-d*r),_=2*(d*n-u*a),v=2*(u*r-f*n);return this.x=n+m*p+f*v-d*_,this.y=r+m*_+d*p-u*v,this.z=a+m*v+u*_-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a,this.y=u[1]*n+u[5]*r+u[9]*a,this.z=u[2]*n+u[6]*r+u[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this.z=gt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this.z=gt(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,u=e.z,f=n.x,d=n.y,m=n.z;return this.x=a*m-u*d,this.y=u*f-r*m,this.z=r*d-a*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return yc.copy(this).projectOnVector(e),this.sub(yc)}reflect(e){return this.sub(yc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(gt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yc=new ee,Op=new Qr;class ft{constructor(e,n,r,a,u,f,d,m,p){ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,u,f,d,m,p)}set(e,n,r,a,u,f,d,m,p){const _=this.elements;return _[0]=e,_[1]=a,_[2]=d,_[3]=n,_[4]=u,_[5]=m,_[6]=r,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,u=this.elements,f=r[0],d=r[3],m=r[6],p=r[1],_=r[4],v=r[7],x=r[2],S=r[5],w=r[8],A=a[0],y=a[3],g=a[6],F=a[1],L=a[4],b=a[7],H=a[2],z=a[5],k=a[8];return u[0]=f*A+d*F+m*H,u[3]=f*y+d*L+m*z,u[6]=f*g+d*b+m*k,u[1]=p*A+_*F+v*H,u[4]=p*y+_*L+v*z,u[7]=p*g+_*b+v*k,u[2]=x*A+S*F+w*H,u[5]=x*y+S*L+w*z,u[8]=x*g+S*b+w*k,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],d=e[5],m=e[6],p=e[7],_=e[8];return n*f*_-n*d*p-r*u*_+r*d*m+a*u*p-a*f*m}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],d=e[5],m=e[6],p=e[7],_=e[8],v=_*f-d*p,x=d*m-_*u,S=p*u-f*m,w=n*v+r*x+a*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=v*A,e[1]=(a*p-_*r)*A,e[2]=(d*r-a*f)*A,e[3]=x*A,e[4]=(_*n-a*m)*A,e[5]=(a*u-d*n)*A,e[6]=S*A,e[7]=(r*m-p*n)*A,e[8]=(f*n-r*u)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,u,f,d){const m=Math.cos(u),p=Math.sin(u);return this.set(r*m,r*p,-r*(m*f+p*d)+f+e,-a*p,a*m,-a*(-p*f+m*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(Sc.makeScale(e,n)),this}rotate(e){return this.premultiply(Sc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Sc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Sc=new ft;function Wm(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Ll(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function n0(){const s=Ll("canvas");return s.style.display="block",s}const kp={};function Xo(s){s in kp||(kp[s]=!0,console.warn(s))}function i0(s,e,n){return new Promise(function(r,a){function u(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(u,n);break;default:r()}}setTimeout(u,n)})}const zp=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bp=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function r0(){const s={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(a,u,f){return this.enabled===!1||u===f||!u||!f||(this.spaces[u].transfer===bt&&(a.r=Bi(a.r),a.g=Bi(a.g),a.b=Bi(a.b)),this.spaces[u].primaries!==this.spaces[f].primaries&&(a.applyMatrix3(this.spaces[u].toXYZ),a.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===bt&&(a.r=Xs(a.r),a.g=Xs(a.g),a.b=Xs(a.b))),a},workingToColorSpace:function(a,u){return this.convert(a,this.workingColorSpace,u)},colorSpaceToWorking:function(a,u){return this.convert(a,u,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===_r?Pl:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,u=this.workingColorSpace){return a.fromArray(this.spaces[u].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,u,f){return a.copy(this.spaces[u].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,u){return Xo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(a,u)},toWorkingColorSpace:function(a,u){return Xo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(a,u)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Ks]:{primaries:e,whitePoint:r,transfer:Pl,toXYZ:zp,fromXYZ:Bp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Vn},outputColorSpaceConfig:{drawingBufferColorSpace:Vn}},[Vn]:{primaries:e,whitePoint:r,transfer:bt,toXYZ:zp,fromXYZ:Bp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Vn}}}),s}const Mt=r0();function Bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Rs;class s0{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Rs===void 0&&(Rs=Ll("canvas")),Rs.width=e.width,Rs.height=e.height;const a=Rs.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),r=Rs}return r.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ll("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),u=a.data;for(let f=0;f<u.length;f++)u[f]=Bi(u[f]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Bi(n[r]/255)*255):n[r]=Bi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let o0=0;class Kf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=Zs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let u;if(Array.isArray(a)){u=[];for(let f=0,d=a.length;f<d;f++)a[f].isDataTexture?u.push(Ec(a[f].image)):u.push(Ec(a[f]))}else u=Ec(a);r.url=u}return n||(e.images[this.uuid]=r),r}}function Ec(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?s0.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let a0=0;const Mc=new ee;class In extends es{constructor(e=In.DEFAULT_IMAGE,n=In.DEFAULT_MAPPING,r=Yr,a=Yr,u=xi,f=qr,d=ci,m=Hi,p=In.DEFAULT_ANISOTROPY,_=_r){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=Zs(),this.name="",this.source=new Kf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=u,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Mc).x}get height(){return this.source.getSize(Mc).y}get depth(){return this.source.getSize(Mc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Im)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case af:e.x=e.x-Math.floor(e.x);break;case Yr:e.x=e.x<0?0:1;break;case lf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case af:e.y=e.y-Math.floor(e.y);break;case Yr:e.y=e.y<0?0:1;break;case lf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=Im;In.DEFAULT_ANISOTROPY=1;class Yt{constructor(e=0,n=0,r=0,a=1){Yt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,u=this.w,f=e.elements;return this.x=f[0]*n+f[4]*r+f[8]*a+f[12]*u,this.y=f[1]*n+f[5]*r+f[9]*a+f[13]*u,this.z=f[2]*n+f[6]*r+f[10]*a+f[14]*u,this.w=f[3]*n+f[7]*r+f[11]*a+f[15]*u,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,u;const m=e.elements,p=m[0],_=m[4],v=m[8],x=m[1],S=m[5],w=m[9],A=m[2],y=m[6],g=m[10];if(Math.abs(_-x)<.01&&Math.abs(v-A)<.01&&Math.abs(w-y)<.01){if(Math.abs(_+x)<.1&&Math.abs(v+A)<.1&&Math.abs(w+y)<.1&&Math.abs(p+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const L=(p+1)/2,b=(S+1)/2,H=(g+1)/2,z=(_+x)/4,k=(v+A)/4,q=(w+y)/4;return L>b&&L>H?L<.01?(r=0,a=.707106781,u=.707106781):(r=Math.sqrt(L),a=z/r,u=k/r):b>H?b<.01?(r=.707106781,a=0,u=.707106781):(a=Math.sqrt(b),r=z/a,u=q/a):H<.01?(r=.707106781,a=.707106781,u=0):(u=Math.sqrt(H),r=k/u,a=q/u),this.set(r,a,u,n),this}let F=Math.sqrt((y-w)*(y-w)+(v-A)*(v-A)+(x-_)*(x-_));return Math.abs(F)<.001&&(F=1),this.x=(y-w)/F,this.y=(v-A)/F,this.z=(x-_)/F,this.w=Math.acos((p+S+g-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this.z=gt(this.z,e.z,n.z),this.w=gt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this.z=gt(this.z,e,n),this.w=gt(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class l0 extends es{constructor(e=1,n=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=r.depth,this.scissor=new Yt(0,0,e,n),this.scissorTest=!1,this.viewport=new Yt(0,0,e,n);const a={width:e,height:n,depth:r.depth},u=new In(a);this.textures=[];const f=r.count;for(let d=0;d<f;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const n={minFilter:xi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,u=this.textures.length;a<u;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new Kf(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jr extends l0{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class Xm extends In{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=fi,this.minFilter=fi,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class u0 extends In{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=fi,this.minFilter=fi,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yo{constructor(e=new ee(1/0,1/0,1/0),n=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const u=r.getAttribute("position");if(n===!0&&u!==void 0&&e.isInstancedMesh!==!0)for(let f=0,d=u.count;f<d;f++)e.isMesh===!0?e.getVertexPosition(f,oi):oi.fromBufferAttribute(u,f),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),il.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),il.copy(r.boundingBox)),il.applyMatrix4(e.matrixWorld),this.union(il)}const a=e.children;for(let u=0,f=a.length;u<f;u++)this.expandByObject(a[u],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(No),rl.subVectors(this.max,No),Cs.subVectors(e.a,No),bs.subVectors(e.b,No),Ps.subVectors(e.c,No),cr.subVectors(bs,Cs),fr.subVectors(Ps,bs),kr.subVectors(Cs,Ps);let n=[0,-cr.z,cr.y,0,-fr.z,fr.y,0,-kr.z,kr.y,cr.z,0,-cr.x,fr.z,0,-fr.x,kr.z,0,-kr.x,-cr.y,cr.x,0,-fr.y,fr.x,0,-kr.y,kr.x,0];return!Tc(n,Cs,bs,Ps,rl)||(n=[1,0,0,0,1,0,0,0,1],!Tc(n,Cs,bs,Ps,rl))?!1:(sl.crossVectors(cr,fr),n=[sl.x,sl.y,sl.z],Tc(n,Cs,bs,Ps,rl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Li=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],oi=new ee,il=new Yo,Cs=new ee,bs=new ee,Ps=new ee,cr=new ee,fr=new ee,kr=new ee,No=new ee,rl=new ee,sl=new ee,zr=new ee;function Tc(s,e,n,r,a){for(let u=0,f=s.length-3;u<=f;u+=3){zr.fromArray(s,u);const d=a.x*Math.abs(zr.x)+a.y*Math.abs(zr.y)+a.z*Math.abs(zr.z),m=e.dot(zr),p=n.dot(zr),_=r.dot(zr);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>d)return!1}return!0}const c0=new Yo,Io=new ee,wc=new ee;class $f{constructor(e=new ee,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):c0.setFromPoints(e).getCenter(r);let a=0;for(let u=0,f=e.length;u<f;u++)a=Math.max(a,r.distanceToSquared(e[u]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Io.subVectors(e,this.center);const n=Io.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Io,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Io.copy(e.center).add(wc)),this.expandByPoint(Io.copy(e.center).sub(wc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ni=new ee,Ac=new ee,ol=new ee,dr=new ee,Rc=new ee,al=new ee,Cc=new ee;class jm{constructor(e=new ee,n=new ee(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ni.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,n),Ni.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){Ac.copy(e).add(n).multiplyScalar(.5),ol.copy(n).sub(e).normalize(),dr.copy(this.origin).sub(Ac);const u=e.distanceTo(n)*.5,f=-this.direction.dot(ol),d=dr.dot(this.direction),m=-dr.dot(ol),p=dr.lengthSq(),_=Math.abs(1-f*f);let v,x,S,w;if(_>0)if(v=f*m-d,x=f*d-m,w=u*_,v>=0)if(x>=-w)if(x<=w){const A=1/_;v*=A,x*=A,S=v*(v+f*x+2*d)+x*(f*v+x+2*m)+p}else x=u,v=Math.max(0,-(f*x+d)),S=-v*v+x*(x+2*m)+p;else x=-u,v=Math.max(0,-(f*x+d)),S=-v*v+x*(x+2*m)+p;else x<=-w?(v=Math.max(0,-(-f*u+d)),x=v>0?-u:Math.min(Math.max(-u,-m),u),S=-v*v+x*(x+2*m)+p):x<=w?(v=0,x=Math.min(Math.max(-u,-m),u),S=x*(x+2*m)+p):(v=Math.max(0,-(f*u+d)),x=v>0?u:Math.min(Math.max(-u,-m),u),S=-v*v+x*(x+2*m)+p);else x=f>0?-u:u,v=Math.max(0,-(f*x+d)),S=-v*v+x*(x+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,v),a&&a.copy(Ac).addScaledVector(ol,x),S}intersectSphere(e,n){Ni.subVectors(e.center,this.origin);const r=Ni.dot(this.direction),a=Ni.dot(Ni)-r*r,u=e.radius*e.radius;if(a>u)return null;const f=Math.sqrt(u-a),d=r-f,m=r+f;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,u,f,d,m;const p=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,x=this.origin;return p>=0?(r=(e.min.x-x.x)*p,a=(e.max.x-x.x)*p):(r=(e.max.x-x.x)*p,a=(e.min.x-x.x)*p),_>=0?(u=(e.min.y-x.y)*_,f=(e.max.y-x.y)*_):(u=(e.max.y-x.y)*_,f=(e.min.y-x.y)*_),r>f||u>a||((u>r||isNaN(r))&&(r=u),(f<a||isNaN(a))&&(a=f),v>=0?(d=(e.min.z-x.z)*v,m=(e.max.z-x.z)*v):(d=(e.max.z-x.z)*v,m=(e.min.z-x.z)*v),r>m||d>a)||((d>r||r!==r)&&(r=d),(m<a||a!==a)&&(a=m),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,n,r,a,u){Rc.subVectors(n,e),al.subVectors(r,e),Cc.crossVectors(Rc,al);let f=this.direction.dot(Cc),d;if(f>0){if(a)return null;d=1}else if(f<0)d=-1,f=-f;else return null;dr.subVectors(this.origin,e);const m=d*this.direction.dot(al.crossVectors(dr,al));if(m<0)return null;const p=d*this.direction.dot(Rc.cross(dr));if(p<0||m+p>f)return null;const _=-d*dr.dot(Cc);return _<0?null:this.at(_/f,u)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tn{constructor(e,n,r,a,u,f,d,m,p,_,v,x,S,w,A,y){tn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,u,f,d,m,p,_,v,x,S,w,A,y)}set(e,n,r,a,u,f,d,m,p,_,v,x,S,w,A,y){const g=this.elements;return g[0]=e,g[4]=n,g[8]=r,g[12]=a,g[1]=u,g[5]=f,g[9]=d,g[13]=m,g[2]=p,g[6]=_,g[10]=v,g[14]=x,g[3]=S,g[7]=w,g[11]=A,g[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tn().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/Ds.setFromMatrixColumn(e,0).length(),u=1/Ds.setFromMatrixColumn(e,1).length(),f=1/Ds.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*u,n[5]=r[5]*u,n[6]=r[6]*u,n[7]=0,n[8]=r[8]*f,n[9]=r[9]*f,n[10]=r[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,u=e.z,f=Math.cos(r),d=Math.sin(r),m=Math.cos(a),p=Math.sin(a),_=Math.cos(u),v=Math.sin(u);if(e.order==="XYZ"){const x=f*_,S=f*v,w=d*_,A=d*v;n[0]=m*_,n[4]=-m*v,n[8]=p,n[1]=S+w*p,n[5]=x-A*p,n[9]=-d*m,n[2]=A-x*p,n[6]=w+S*p,n[10]=f*m}else if(e.order==="YXZ"){const x=m*_,S=m*v,w=p*_,A=p*v;n[0]=x+A*d,n[4]=w*d-S,n[8]=f*p,n[1]=f*v,n[5]=f*_,n[9]=-d,n[2]=S*d-w,n[6]=A+x*d,n[10]=f*m}else if(e.order==="ZXY"){const x=m*_,S=m*v,w=p*_,A=p*v;n[0]=x-A*d,n[4]=-f*v,n[8]=w+S*d,n[1]=S+w*d,n[5]=f*_,n[9]=A-x*d,n[2]=-f*p,n[6]=d,n[10]=f*m}else if(e.order==="ZYX"){const x=f*_,S=f*v,w=d*_,A=d*v;n[0]=m*_,n[4]=w*p-S,n[8]=x*p+A,n[1]=m*v,n[5]=A*p+x,n[9]=S*p-w,n[2]=-p,n[6]=d*m,n[10]=f*m}else if(e.order==="YZX"){const x=f*m,S=f*p,w=d*m,A=d*p;n[0]=m*_,n[4]=A-x*v,n[8]=w*v+S,n[1]=v,n[5]=f*_,n[9]=-d*_,n[2]=-p*_,n[6]=S*v+w,n[10]=x-A*v}else if(e.order==="XZY"){const x=f*m,S=f*p,w=d*m,A=d*p;n[0]=m*_,n[4]=-v,n[8]=p*_,n[1]=x*v+A,n[5]=f*_,n[9]=S*v-w,n[2]=w*v-S,n[6]=d*_,n[10]=A*v+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(f0,e,d0)}lookAt(e,n,r){const a=this.elements;return Bn.subVectors(e,n),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),hr.crossVectors(r,Bn),hr.lengthSq()===0&&(Math.abs(r.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),hr.crossVectors(r,Bn)),hr.normalize(),ll.crossVectors(Bn,hr),a[0]=hr.x,a[4]=ll.x,a[8]=Bn.x,a[1]=hr.y,a[5]=ll.y,a[9]=Bn.y,a[2]=hr.z,a[6]=ll.z,a[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,u=this.elements,f=r[0],d=r[4],m=r[8],p=r[12],_=r[1],v=r[5],x=r[9],S=r[13],w=r[2],A=r[6],y=r[10],g=r[14],F=r[3],L=r[7],b=r[11],H=r[15],z=a[0],k=a[4],q=a[8],R=a[12],C=a[1],B=a[5],ne=a[9],X=a[13],j=a[2],te=a[6],le=a[10],fe=a[14],U=a[3],ue=a[7],ae=a[11],N=a[15];return u[0]=f*z+d*C+m*j+p*U,u[4]=f*k+d*B+m*te+p*ue,u[8]=f*q+d*ne+m*le+p*ae,u[12]=f*R+d*X+m*fe+p*N,u[1]=_*z+v*C+x*j+S*U,u[5]=_*k+v*B+x*te+S*ue,u[9]=_*q+v*ne+x*le+S*ae,u[13]=_*R+v*X+x*fe+S*N,u[2]=w*z+A*C+y*j+g*U,u[6]=w*k+A*B+y*te+g*ue,u[10]=w*q+A*ne+y*le+g*ae,u[14]=w*R+A*X+y*fe+g*N,u[3]=F*z+L*C+b*j+H*U,u[7]=F*k+L*B+b*te+H*ue,u[11]=F*q+L*ne+b*le+H*ae,u[15]=F*R+L*X+b*fe+H*N,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],u=e[12],f=e[1],d=e[5],m=e[9],p=e[13],_=e[2],v=e[6],x=e[10],S=e[14],w=e[3],A=e[7],y=e[11],g=e[15];return w*(+u*m*v-a*p*v-u*d*x+r*p*x+a*d*S-r*m*S)+A*(+n*m*S-n*p*x+u*f*x-a*f*S+a*p*_-u*m*_)+y*(+n*p*v-n*d*S-u*f*v+r*f*S+u*d*_-r*p*_)+g*(-a*d*_-n*m*v+n*d*x+a*f*v-r*f*x+r*m*_)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],d=e[5],m=e[6],p=e[7],_=e[8],v=e[9],x=e[10],S=e[11],w=e[12],A=e[13],y=e[14],g=e[15],F=v*y*p-A*x*p+A*m*S-d*y*S-v*m*g+d*x*g,L=w*x*p-_*y*p-w*m*S+f*y*S+_*m*g-f*x*g,b=_*A*p-w*v*p+w*d*S-f*A*S-_*d*g+f*v*g,H=w*v*m-_*A*m-w*d*x+f*A*x+_*d*y-f*v*y,z=n*F+r*L+a*b+u*H;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/z;return e[0]=F*k,e[1]=(A*x*u-v*y*u-A*a*S+r*y*S+v*a*g-r*x*g)*k,e[2]=(d*y*u-A*m*u+A*a*p-r*y*p-d*a*g+r*m*g)*k,e[3]=(v*m*u-d*x*u-v*a*p+r*x*p+d*a*S-r*m*S)*k,e[4]=L*k,e[5]=(_*y*u-w*x*u+w*a*S-n*y*S-_*a*g+n*x*g)*k,e[6]=(w*m*u-f*y*u-w*a*p+n*y*p+f*a*g-n*m*g)*k,e[7]=(f*x*u-_*m*u+_*a*p-n*x*p-f*a*S+n*m*S)*k,e[8]=b*k,e[9]=(w*v*u-_*A*u-w*r*S+n*A*S+_*r*g-n*v*g)*k,e[10]=(f*A*u-w*d*u+w*r*p-n*A*p-f*r*g+n*d*g)*k,e[11]=(_*d*u-f*v*u-_*r*p+n*v*p+f*r*S-n*d*S)*k,e[12]=H*k,e[13]=(_*A*a-w*v*a+w*r*x-n*A*x-_*r*y+n*v*y)*k,e[14]=(w*d*a-f*A*a-w*r*m+n*A*m+f*r*y-n*d*y)*k,e[15]=(f*v*a-_*d*a+_*r*m-n*v*m-f*r*x+n*d*x)*k,this}scale(e){const n=this.elements,r=e.x,a=e.y,u=e.z;return n[0]*=r,n[4]*=a,n[8]*=u,n[1]*=r,n[5]*=a,n[9]*=u,n[2]*=r,n[6]*=a,n[10]*=u,n[3]*=r,n[7]*=a,n[11]*=u,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),u=1-r,f=e.x,d=e.y,m=e.z,p=u*f,_=u*d;return this.set(p*f+r,p*d-a*m,p*m+a*d,0,p*d+a*m,_*d+r,_*m-a*f,0,p*m-a*d,_*m+a*f,u*m*m+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,u,f){return this.set(1,r,u,0,e,1,f,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,u=n._x,f=n._y,d=n._z,m=n._w,p=u+u,_=f+f,v=d+d,x=u*p,S=u*_,w=u*v,A=f*_,y=f*v,g=d*v,F=m*p,L=m*_,b=m*v,H=r.x,z=r.y,k=r.z;return a[0]=(1-(A+g))*H,a[1]=(S+b)*H,a[2]=(w-L)*H,a[3]=0,a[4]=(S-b)*z,a[5]=(1-(x+g))*z,a[6]=(y+F)*z,a[7]=0,a[8]=(w+L)*k,a[9]=(y-F)*k,a[10]=(1-(x+A))*k,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let u=Ds.set(a[0],a[1],a[2]).length();const f=Ds.set(a[4],a[5],a[6]).length(),d=Ds.set(a[8],a[9],a[10]).length();this.determinant()<0&&(u=-u),e.x=a[12],e.y=a[13],e.z=a[14],ai.copy(this);const p=1/u,_=1/f,v=1/d;return ai.elements[0]*=p,ai.elements[1]*=p,ai.elements[2]*=p,ai.elements[4]*=_,ai.elements[5]*=_,ai.elements[6]*=_,ai.elements[8]*=v,ai.elements[9]*=v,ai.elements[10]*=v,n.setFromRotationMatrix(ai),r.x=u,r.y=f,r.z=d,this}makePerspective(e,n,r,a,u,f,d=yi,m=!1){const p=this.elements,_=2*u/(n-e),v=2*u/(r-a),x=(n+e)/(n-e),S=(r+a)/(r-a);let w,A;if(m)w=u/(f-u),A=f*u/(f-u);else if(d===yi)w=-(f+u)/(f-u),A=-2*f*u/(f-u);else if(d===Dl)w=-f/(f-u),A=-f*u/(f-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=_,p[4]=0,p[8]=x,p[12]=0,p[1]=0,p[5]=v,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=w,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,r,a,u,f,d=yi,m=!1){const p=this.elements,_=2/(n-e),v=2/(r-a),x=-(n+e)/(n-e),S=-(r+a)/(r-a);let w,A;if(m)w=1/(f-u),A=f/(f-u);else if(d===yi)w=-2/(f-u),A=-(f+u)/(f-u);else if(d===Dl)w=-1/(f-u),A=-u/(f-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=_,p[4]=0,p[8]=0,p[12]=x,p[1]=0,p[5]=v,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=w,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Ds=new ee,ai=new tn,f0=new ee(0,0,0),d0=new ee(1,1,1),hr=new ee,ll=new ee,Bn=new ee,Hp=new tn,Vp=new Qr;class Vi{constructor(e=0,n=0,r=0,a=Vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,u=a[0],f=a[4],d=a[8],m=a[1],p=a[5],_=a[9],v=a[2],x=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-f,u)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-v,u),this._z=0);break;case"ZXY":this._x=Math.asin(gt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,S),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-gt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(gt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-v,u)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-gt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-_,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return Hp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hp,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Vp.setFromEuler(this),this.setFromQuaternion(Vp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vi.DEFAULT_ORDER="XYZ";class Ym{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let h0=0;const Gp=new ee,Ls=new Qr,Ii=new tn,ul=new ee,Uo=new ee,p0=new ee,m0=new Qr,Wp=new ee(1,0,0),Xp=new ee(0,1,0),jp=new ee(0,0,1),Yp={type:"added"},g0={type:"removed"},Ns={type:"childadded",child:null},bc={type:"childremoved",child:null};class Gn extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=Zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gn.DEFAULT_UP.clone();const e=new ee,n=new Vi,r=new Qr,a=new ee(1,1,1);function u(){r.setFromEuler(n,!1)}function f(){n.setFromQuaternion(r,void 0,!1)}n._onChange(u),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new tn},normalMatrix:{value:new ft}}),this.matrix=new tn,this.matrixWorld=new tn,this.matrixAutoUpdate=Gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ym,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Wp,e)}rotateY(e){return this.rotateOnAxis(Xp,e)}rotateZ(e){return this.rotateOnAxis(jp,e)}translateOnAxis(e,n){return Gp.copy(e).applyQuaternion(this.quaternion),this.position.add(Gp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Wp,e)}translateY(e){return this.translateOnAxis(Xp,e)}translateZ(e){return this.translateOnAxis(jp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?ul.copy(e):ul.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(Uo,ul,this.up):Ii.lookAt(ul,Uo,this.up),this.quaternion.setFromRotationMatrix(Ii),a&&(Ii.extractRotation(a.matrixWorld),Ls.setFromRotationMatrix(Ii),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yp),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(g0),bc.child=e,this.dispatchEvent(bc),bc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yp),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const f=this.children[r].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let u=0,f=a.length;u<f;u++)a[u].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Uo,e,p0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Uo,m0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let u=0,f=a.length;u<f;u++)a[u].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(d=>({...d})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function u(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=u(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const v=m[p];u(e.shapes,v)}else u(e.shapes,m)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(u(e.materials,this.material[m]));a.material=d}else a.material=u(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];a.animations.push(u(e.animations,m))}}if(n){const d=f(e.geometries),m=f(e.materials),p=f(e.textures),_=f(e.images),v=f(e.shapes),x=f(e.skeletons),S=f(e.animations),w=f(e.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),_.length>0&&(r.images=_),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),w.length>0&&(r.nodes=w)}return r.object=a,r;function f(d){const m=[];for(const p in d){const _=d[p];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}Gn.DEFAULT_UP=new ee(0,1,0);Gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new ee,Ui=new ee,Pc=new ee,Fi=new ee,Is=new ee,Us=new ee,qp=new ee,Dc=new ee,Lc=new ee,Nc=new ee,Ic=new Yt,Uc=new Yt,Fc=new Yt;class ui{constructor(e=new ee,n=new ee,r=new ee){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),li.subVectors(e,n),a.cross(li);const u=a.lengthSq();return u>0?a.multiplyScalar(1/Math.sqrt(u)):a.set(0,0,0)}static getBarycoord(e,n,r,a,u){li.subVectors(a,n),Ui.subVectors(r,n),Pc.subVectors(e,n);const f=li.dot(li),d=li.dot(Ui),m=li.dot(Pc),p=Ui.dot(Ui),_=Ui.dot(Pc),v=f*p-d*d;if(v===0)return u.set(0,0,0),null;const x=1/v,S=(p*m-d*_)*x,w=(f*_-d*m)*x;return u.set(1-S-w,w,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(e,n,r,a,u,f,d,m){return this.getBarycoord(e,n,r,a,Fi)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,Fi.x),m.addScaledVector(f,Fi.y),m.addScaledVector(d,Fi.z),m)}static getInterpolatedAttribute(e,n,r,a,u,f){return Ic.setScalar(0),Uc.setScalar(0),Fc.setScalar(0),Ic.fromBufferAttribute(e,n),Uc.fromBufferAttribute(e,r),Fc.fromBufferAttribute(e,a),f.setScalar(0),f.addScaledVector(Ic,u.x),f.addScaledVector(Uc,u.y),f.addScaledVector(Fc,u.z),f}static isFrontFacing(e,n,r,a){return li.subVectors(r,n),Ui.subVectors(e,n),li.cross(Ui).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),Ui.subVectors(this.a,this.b),li.cross(Ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ui.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,u){return ui.getInterpolation(e,this.a,this.b,this.c,n,r,a,u)}containsPoint(e){return ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,u=this.c;let f,d;Is.subVectors(a,r),Us.subVectors(u,r),Dc.subVectors(e,r);const m=Is.dot(Dc),p=Us.dot(Dc);if(m<=0&&p<=0)return n.copy(r);Lc.subVectors(e,a);const _=Is.dot(Lc),v=Us.dot(Lc);if(_>=0&&v<=_)return n.copy(a);const x=m*v-_*p;if(x<=0&&m>=0&&_<=0)return f=m/(m-_),n.copy(r).addScaledVector(Is,f);Nc.subVectors(e,u);const S=Is.dot(Nc),w=Us.dot(Nc);if(w>=0&&S<=w)return n.copy(u);const A=S*p-m*w;if(A<=0&&p>=0&&w<=0)return d=p/(p-w),n.copy(r).addScaledVector(Us,d);const y=_*w-S*v;if(y<=0&&v-_>=0&&S-w>=0)return qp.subVectors(u,a),d=(v-_)/(v-_+(S-w)),n.copy(a).addScaledVector(qp,d);const g=1/(y+A+x);return f=A*g,d=x*g,n.copy(r).addScaledVector(Is,f).addScaledVector(Us,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pr={h:0,s:0,l:0},cl={h:0,s:0,l:0};function Oc(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class Dt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,n),this}setRGB(e,n,r,a=Mt.workingColorSpace){return this.r=e,this.g=n,this.b=r,Mt.colorSpaceToWorking(this,a),this}setHSL(e,n,r,a=Mt.workingColorSpace){if(e=qf(e,1),n=gt(n,0,1),r=gt(r,0,1),n===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+n):r+n-r*n,f=2*r-u;this.r=Oc(f,u,e+1/3),this.g=Oc(f,u,e),this.b=Oc(f,u,e-1/3)}return Mt.colorSpaceToWorking(this,a),this}setStyle(e,n=Vn){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let u;const f=a[1],d=a[2];switch(f){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,n);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,n);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const u=a[1],f=u.length;if(f===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(u,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Vn){const r=qm[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vn){return Mt.workingToColorSpace(xn.copy(this),e),Math.round(gt(xn.r*255,0,255))*65536+Math.round(gt(xn.g*255,0,255))*256+Math.round(gt(xn.b*255,0,255))}getHexString(e=Vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Mt.workingColorSpace){Mt.workingToColorSpace(xn.copy(this),n);const r=xn.r,a=xn.g,u=xn.b,f=Math.max(r,a,u),d=Math.min(r,a,u);let m,p;const _=(d+f)/2;if(d===f)m=0,p=0;else{const v=f-d;switch(p=_<=.5?v/(f+d):v/(2-f-d),f){case r:m=(a-u)/v+(a<u?6:0);break;case a:m=(u-r)/v+2;break;case u:m=(r-a)/v+4;break}m/=6}return e.h=m,e.s=p,e.l=_,e}getRGB(e,n=Mt.workingColorSpace){return Mt.workingToColorSpace(xn.copy(this),n),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Vn){Mt.workingToColorSpace(xn.copy(this),e);const n=xn.r,r=xn.g,a=xn.b;return e!==Vn?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(pr),this.setHSL(pr.h+e,pr.s+n,pr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(pr),e.getHSL(cl);const r=zo(pr.h,cl.h,n),a=zo(pr.s,cl.s,n),u=zo(pr.l,cl.l,n);return this.setHSL(r,a,u),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,u=e.elements;return this.r=u[0]*n+u[3]*r+u[6]*a,this.g=u[1]*n+u[4]*r+u[7]*a,this.b=u[2]*n+u[5]*r+u[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new Dt;Dt.NAMES=qm;let _0=0;class Il extends es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Zs(),this.name="",this.type="Material",this.blending=Ws,this.side=Sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kc,this.blendDst=$c,this.blendEquation=Xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ip,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(r.blending=this.blending),this.side!==Sr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Kc&&(r.blendSrc=this.blendSrc),this.blendDst!==$c&&(r.blendDst=this.blendDst),this.blendEquation!==Xr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ip&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(r.stencilFail=this.stencilFail),this.stencilZFail!==As&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(u){const f=[];for(const d in u){const m=u[d];delete m.metadata,f.push(m)}return f}if(n){const u=a(e.textures),f=a(e.images);u.length>0&&(r.textures=u),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let u=0;u!==a;++u)r[u]=n[u].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Km extends Il{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=Nm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new ee,fl=new ht;let v0=0;class di{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:v0++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=Up,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,u=this.itemSize;a<u;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)fl.fromBufferAttribute(this,n),fl.applyMatrix3(e),this.setXY(n,fl.x,fl.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.applyMatrix3(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.applyMatrix4(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.applyNormalMatrix(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.transformDirection(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Bs(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=Tn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Bs(n,this.array)),n}setX(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Bs(n,this.array)),n}setY(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Bs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Bs(n,this.array)),n}setW(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=Tn(n,this.array),r=Tn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=Tn(n,this.array),r=Tn(r,this.array),a=Tn(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,u){return e*=this.itemSize,this.normalized&&(n=Tn(n,this.array),r=Tn(r,this.array),a=Tn(a,this.array),u=Tn(u,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=u,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Up&&(e.usage=this.usage),e}}class $m extends di{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Zm extends di{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class $r extends di{constructor(e,n,r){super(new Float32Array(e),n,r)}}let x0=0;const Zn=new tn,kc=new Gn,Fs=new ee,Hn=new Yo,Fo=new Yo,ln=new ee;class Er extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=Zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wm(e)?Zm:$m)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new ft().getNormalMatrix(e);r.applyNormalMatrix(u),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,n,r){return Zn.makeTranslation(e,n,r),this.applyMatrix4(Zn),this}scale(e,n,r){return Zn.makeScale(e,n,r),this.applyMatrix4(Zn),this}lookAt(e){return kc.lookAt(e),kc.updateMatrix(),this.applyMatrix4(kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,u=e.length;a<u;a++){const f=e[a];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new $r(r,3))}else{const r=Math.min(e.length,n.count);for(let a=0;a<r;a++){const u=e[a];n.setXYZ(a,u.x,u.y,u.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const u=n[r];Hn.setFromBufferAttribute(u),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $f);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ee,1/0);return}if(e){const r=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),n)for(let u=0,f=n.length;u<f;u++){const d=n[u];Fo.setFromBufferAttribute(d),this.morphTargetsRelative?(ln.addVectors(Hn.min,Fo.min),Hn.expandByPoint(ln),ln.addVectors(Hn.max,Fo.max),Hn.expandByPoint(ln)):(Hn.expandByPoint(Fo.min),Hn.expandByPoint(Fo.max))}Hn.getCenter(r);let a=0;for(let u=0,f=e.count;u<f;u++)ln.fromBufferAttribute(e,u),a=Math.max(a,r.distanceToSquared(ln));if(n)for(let u=0,f=n.length;u<f;u++){const d=n[u],m=this.morphTargetsRelative;for(let p=0,_=d.count;p<_;p++)ln.fromBufferAttribute(d,p),m&&(Fs.fromBufferAttribute(e,p),ln.add(Fs)),a=Math.max(a,r.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,u=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),d=[],m=[];for(let q=0;q<r.count;q++)d[q]=new ee,m[q]=new ee;const p=new ee,_=new ee,v=new ee,x=new ht,S=new ht,w=new ht,A=new ee,y=new ee;function g(q,R,C){p.fromBufferAttribute(r,q),_.fromBufferAttribute(r,R),v.fromBufferAttribute(r,C),x.fromBufferAttribute(u,q),S.fromBufferAttribute(u,R),w.fromBufferAttribute(u,C),_.sub(p),v.sub(p),S.sub(x),w.sub(x);const B=1/(S.x*w.y-w.x*S.y);isFinite(B)&&(A.copy(_).multiplyScalar(w.y).addScaledVector(v,-S.y).multiplyScalar(B),y.copy(v).multiplyScalar(S.x).addScaledVector(_,-w.x).multiplyScalar(B),d[q].add(A),d[R].add(A),d[C].add(A),m[q].add(y),m[R].add(y),m[C].add(y))}let F=this.groups;F.length===0&&(F=[{start:0,count:e.count}]);for(let q=0,R=F.length;q<R;++q){const C=F[q],B=C.start,ne=C.count;for(let X=B,j=B+ne;X<j;X+=3)g(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const L=new ee,b=new ee,H=new ee,z=new ee;function k(q){H.fromBufferAttribute(a,q),z.copy(H);const R=d[q];L.copy(R),L.sub(H.multiplyScalar(H.dot(R))).normalize(),b.crossVectors(z,R);const B=b.dot(m[q])<0?-1:1;f.setXYZW(q,L.x,L.y,L.z,B)}for(let q=0,R=F.length;q<R;++q){const C=F[q],B=C.start,ne=C.count;for(let X=B,j=B+ne;X<j;X+=3)k(e.getX(X+0)),k(e.getX(X+1)),k(e.getX(X+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new di(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new ee,u=new ee,f=new ee,d=new ee,m=new ee,p=new ee,_=new ee,v=new ee;if(e)for(let x=0,S=e.count;x<S;x+=3){const w=e.getX(x+0),A=e.getX(x+1),y=e.getX(x+2);a.fromBufferAttribute(n,w),u.fromBufferAttribute(n,A),f.fromBufferAttribute(n,y),_.subVectors(f,u),v.subVectors(a,u),_.cross(v),d.fromBufferAttribute(r,w),m.fromBufferAttribute(r,A),p.fromBufferAttribute(r,y),d.add(_),m.add(_),p.add(_),r.setXYZ(w,d.x,d.y,d.z),r.setXYZ(A,m.x,m.y,m.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let x=0,S=n.count;x<S;x+=3)a.fromBufferAttribute(n,x+0),u.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),_.subVectors(f,u),v.subVectors(a,u),_.cross(v),r.setXYZ(x+0,_.x,_.y,_.z),r.setXYZ(x+1,_.x,_.y,_.z),r.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)ln.fromBufferAttribute(e,n),ln.normalize(),e.setXYZ(n,ln.x,ln.y,ln.z)}toNonIndexed(){function e(d,m){const p=d.array,_=d.itemSize,v=d.normalized,x=new p.constructor(m.length*_);let S=0,w=0;for(let A=0,y=m.length;A<y;A++){d.isInterleavedBufferAttribute?S=m[A]*d.data.stride+d.offset:S=m[A]*_;for(let g=0;g<_;g++)x[w++]=p[S++]}return new di(x,_,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Er,r=this.index.array,a=this.attributes;for(const d in a){const m=a[d],p=e(m,r);n.setAttribute(d,p)}const u=this.morphAttributes;for(const d in u){const m=[],p=u[d];for(let _=0,v=p.length;_<v;_++){const x=p[_],S=e(x,r);m.push(S)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const m in r){const p=r[m];e.data.attributes[m]=p.toJSON(e.data)}const a={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let v=0,x=p.length;v<x;v++){const S=p[v];_.push(S.toJSON(e.data))}_.length>0&&(a[m]=_,u=!0)}u&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const a=e.attributes;for(const p in a){const _=a[p];this.setAttribute(p,_.clone(n))}const u=e.morphAttributes;for(const p in u){const _=[],v=u[p];for(let x=0,S=v.length;x<S;x++)_.push(v[x].clone(n));this.morphAttributes[p]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,_=f.length;p<_;p++){const v=f[p];this.addGroup(v.start,v.count,v.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kp=new tn,Br=new jm,dl=new $f,$p=new ee,hl=new ee,pl=new ee,ml=new ee,zc=new ee,gl=new ee,Zp=new ee,_l=new ee;class Si extends Gn{constructor(e=new Er,n=new Km){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=a.length;u<f;u++){const d=a[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,u=r.morphAttributes.position,f=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(u&&d){gl.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const _=d[m],v=u[m];_!==0&&(zc.fromBufferAttribute(v,e),f?gl.addScaledVector(zc,_):gl.addScaledVector(zc.sub(n),_))}n.add(gl)}return n}raycast(e,n){const r=this.geometry,a=this.material,u=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),dl.copy(r.boundingSphere),dl.applyMatrix4(u),Br.copy(e.ray).recast(e.near),!(dl.containsPoint(Br.origin)===!1&&(Br.intersectSphere(dl,$p)===null||Br.origin.distanceToSquared($p)>(e.far-e.near)**2))&&(Kp.copy(u).invert(),Br.copy(e.ray).applyMatrix4(Kp),!(r.boundingBox!==null&&Br.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Br)))}_computeIntersections(e,n,r){let a;const u=this.geometry,f=this.material,d=u.index,m=u.attributes.position,p=u.attributes.uv,_=u.attributes.uv1,v=u.attributes.normal,x=u.groups,S=u.drawRange;if(d!==null)if(Array.isArray(f))for(let w=0,A=x.length;w<A;w++){const y=x[w],g=f[y.materialIndex],F=Math.max(y.start,S.start),L=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let b=F,H=L;b<H;b+=3){const z=d.getX(b),k=d.getX(b+1),q=d.getX(b+2);a=vl(this,g,e,r,p,_,v,z,k,q),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const w=Math.max(0,S.start),A=Math.min(d.count,S.start+S.count);for(let y=w,g=A;y<g;y+=3){const F=d.getX(y),L=d.getX(y+1),b=d.getX(y+2);a=vl(this,f,e,r,p,_,v,F,L,b),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}else if(m!==void 0)if(Array.isArray(f))for(let w=0,A=x.length;w<A;w++){const y=x[w],g=f[y.materialIndex],F=Math.max(y.start,S.start),L=Math.min(m.count,Math.min(y.start+y.count,S.start+S.count));for(let b=F,H=L;b<H;b+=3){const z=b,k=b+1,q=b+2;a=vl(this,g,e,r,p,_,v,z,k,q),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const w=Math.max(0,S.start),A=Math.min(m.count,S.start+S.count);for(let y=w,g=A;y<g;y+=3){const F=y,L=y+1,b=y+2;a=vl(this,f,e,r,p,_,v,F,L,b),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}}}function y0(s,e,n,r,a,u,f,d){let m;if(e.side===Nn?m=r.intersectTriangle(f,u,a,!0,d):m=r.intersectTriangle(a,u,f,e.side===Sr,d),m===null)return null;_l.copy(d),_l.applyMatrix4(s.matrixWorld);const p=n.ray.origin.distanceTo(_l);return p<n.near||p>n.far?null:{distance:p,point:_l.clone(),object:s}}function vl(s,e,n,r,a,u,f,d,m,p){s.getVertexPosition(d,hl),s.getVertexPosition(m,pl),s.getVertexPosition(p,ml);const _=y0(s,e,n,r,hl,pl,ml,Zp);if(_){const v=new ee;ui.getBarycoord(Zp,hl,pl,ml,v),a&&(_.uv=ui.getInterpolatedAttribute(a,d,m,p,v,new ht)),u&&(_.uv1=ui.getInterpolatedAttribute(u,d,m,p,v,new ht)),f&&(_.normal=ui.getInterpolatedAttribute(f,d,m,p,v,new ee),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new ee,materialIndex:0};ui.getNormal(hl,pl,ml,x.normal),_.face=x,_.barycoord=v}return _}class qo extends Er{constructor(e=1,n=1,r=1,a=1,u=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:u,depthSegments:f};const d=this;a=Math.floor(a),u=Math.floor(u),f=Math.floor(f);const m=[],p=[],_=[],v=[];let x=0,S=0;w("z","y","x",-1,-1,r,n,e,f,u,0),w("z","y","x",1,-1,r,n,-e,f,u,1),w("x","z","y",1,1,e,r,n,a,f,2),w("x","z","y",1,-1,e,r,-n,a,f,3),w("x","y","z",1,-1,e,n,r,a,u,4),w("x","y","z",-1,-1,e,n,-r,a,u,5),this.setIndex(m),this.setAttribute("position",new $r(p,3)),this.setAttribute("normal",new $r(_,3)),this.setAttribute("uv",new $r(v,2));function w(A,y,g,F,L,b,H,z,k,q,R){const C=b/k,B=H/q,ne=b/2,X=H/2,j=z/2,te=k+1,le=q+1;let fe=0,U=0;const ue=new ee;for(let ae=0;ae<le;ae++){const N=ae*B-X;for(let re=0;re<te;re++){const xe=re*C-ne;ue[A]=xe*F,ue[y]=N*L,ue[g]=j,p.push(ue.x,ue.y,ue.z),ue[A]=0,ue[y]=0,ue[g]=z>0?1:-1,_.push(ue.x,ue.y,ue.z),v.push(re/k),v.push(1-ae/q),fe+=1}}for(let ae=0;ae<q;ae++)for(let N=0;N<k;N++){const re=x+N+te*ae,xe=x+N+te*(ae+1),be=x+(N+1)+te*(ae+1),pe=x+(N+1)+te*ae;m.push(re,xe,pe),m.push(xe,be,pe),U+=6}d.addGroup(S,U,R),S+=U,x+=fe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $s(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function wn(s){const e={};for(let n=0;n<s.length;n++){const r=$s(s[n]);for(const a in r)e[a]=r[a]}return e}function S0(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function Qm(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}const E0={clone:$s,merge:wn};var M0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends Il{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M0,this.fragmentShader=T0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=S0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const f=this.uniforms[a].value;f&&f.isTexture?n.uniforms[a]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[a]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[a]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[a]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[a]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[a]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[a]={type:"m4",value:f.toArray()}:n.uniforms[a]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class Jm extends Gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tn,this.projectionMatrix=new tn,this.projectionMatrixInverse=new tn,this.coordinateSystem=yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const mr=new ee,Qp=new ht,Jp=new ht;class Qn extends Jm{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Wo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ko*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(ko*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){mr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mr.x,mr.y).multiplyScalar(-e/mr.z),mr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(mr.x,mr.y).multiplyScalar(-e/mr.z)}getViewSize(e,n){return this.getViewBounds(e,Qp,Jp),n.subVectors(Jp,Qp)}setViewOffset(e,n,r,a,u,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(ko*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,u=-.5*a;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;u+=f.offsetX*a/m,n-=f.offsetY*r/p,a*=f.width/m,r*=f.height/p}const d=this.filmOffset;d!==0&&(u+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+a,n,n-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Os=-90,ks=1;class w0 extends Gn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Qn(Os,ks,e,n);a.layers=this.layers,this.add(a);const u=new Qn(Os,ks,e,n);u.layers=this.layers,this.add(u);const f=new Qn(Os,ks,e,n);f.layers=this.layers,this.add(f);const d=new Qn(Os,ks,e,n);d.layers=this.layers,this.add(d);const m=new Qn(Os,ks,e,n);m.layers=this.layers,this.add(m);const p=new Qn(Os,ks,e,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,u,f,d,m]=n;for(const p of n)this.remove(p);if(e===yi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Dl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of n)this.add(p),p.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[u,f,d,m,p,_]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,u),e.setRenderTarget(r,1,a),e.render(n,f),e.setRenderTarget(r,2,a),e.render(n,d),e.setRenderTarget(r,3,a),e.render(n,m),e.setRenderTarget(r,4,a),e.render(n,p),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,a),e.render(n,_),e.setRenderTarget(v,x,S),e.xr.enabled=w,r.texture.needsPMREMUpdate=!0}}class eg extends In{constructor(e=[],n=Ys,r,a,u,f,d,m,p,_){super(e,n,r,a,u,f,d,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class A0 extends Jr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new eg(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new qo(5,5,5),u=new Gi({name:"CubemapFromEquirect",uniforms:$s(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Nn,blending:xr});u.uniforms.tEquirect.value=n;const f=new Si(a,u),d=n.minFilter;return n.minFilter===qr&&(n.minFilter=xi),new w0(1,10,this).update(e,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(e,n=!0,r=!0,a=!0){const u=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,r,a);e.setRenderTarget(u)}}class xl extends Gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const R0={type:"move"};class Bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,u=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const A of e.hand.values()){const y=n.getJointPose(A,r),g=this._getHandJoint(p,A);y!==null&&(g.matrix.fromArray(y.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=y.radius),g.visible=y!==null}const _=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],x=_.position.distanceTo(v.position),S=.02,w=.005;p.inputState.pinching&&x>S+w?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&x<=S-w&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(u=n.getPose(e.gripSpace,r),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&u!==null&&(a=u),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(R0)))}return d!==null&&(d.visible=a!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new xl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class C0 extends Gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Hc=new ee,b0=new ee,P0=new ft;class gr{constructor(e=new ee(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Hc.subVectors(r,n).cross(b0.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Hc),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/a;return u<0||u>1?null:n.copy(e.start).addScaledVector(r,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||P0.getNormalMatrix(e),a=this.coplanarPoint(Hc).applyMatrix4(e),u=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(u),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hr=new $f,D0=new ht(.5,.5),yl=new ee;class tg{constructor(e=new gr,n=new gr,r=new gr,a=new gr,u=new gr,f=new gr){this.planes=[e,n,r,a,u,f]}set(e,n,r,a,u,f){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(r),d[3].copy(a),d[4].copy(u),d[5].copy(f),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=yi,r=!1){const a=this.planes,u=e.elements,f=u[0],d=u[1],m=u[2],p=u[3],_=u[4],v=u[5],x=u[6],S=u[7],w=u[8],A=u[9],y=u[10],g=u[11],F=u[12],L=u[13],b=u[14],H=u[15];if(a[0].setComponents(p-f,S-_,g-w,H-F).normalize(),a[1].setComponents(p+f,S+_,g+w,H+F).normalize(),a[2].setComponents(p+d,S+v,g+A,H+L).normalize(),a[3].setComponents(p-d,S-v,g-A,H-L).normalize(),r)a[4].setComponents(m,x,y,b).normalize(),a[5].setComponents(p-m,S-x,g-y,H-b).normalize();else if(a[4].setComponents(p-m,S-x,g-y,H-b).normalize(),n===yi)a[5].setComponents(p+m,S+x,g+y,H+b).normalize();else if(n===Dl)a[5].setComponents(m,x,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(e){Hr.center.set(0,0,0);const n=D0.distanceTo(e.center);return Hr.radius=.7071067811865476+n,Hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let u=0;u<6;u++)if(n[u].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(yl.x=a.normal.x>0?e.max.x:e.min.x,yl.y=a.normal.y>0?e.max.y:e.min.y,yl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(yl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ng extends In{constructor(e,n,r=Zr,a,u,f,d=fi,m=fi,p,_=Vo,v=1){if(_!==Vo&&_!==Go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:n,depth:v};super(x,a,u,f,d,m,_,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class ig extends In{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ul extends Er{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const u=e/2,f=n/2,d=Math.floor(r),m=Math.floor(a),p=d+1,_=m+1,v=e/d,x=n/m,S=[],w=[],A=[],y=[];for(let g=0;g<_;g++){const F=g*x-f;for(let L=0;L<p;L++){const b=L*v-u;w.push(b,-F,0),A.push(0,0,1),y.push(L/d),y.push(1-g/m)}}for(let g=0;g<m;g++)for(let F=0;F<d;F++){const L=F+p*g,b=F+p*(g+1),H=F+1+p*(g+1),z=F+1+p*g;S.push(L,b,z),S.push(b,H,z)}this.setIndex(S),this.setAttribute("position",new $r(w,3)),this.setAttribute("normal",new $r(A,3)),this.setAttribute("uv",new $r(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ul(e.width,e.height,e.widthSegments,e.heightSegments)}}class L0 extends Il{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class N0 extends Il{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class I0 extends Jm{constructor(e=-1,n=1,r=1,a=-1,u=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=u,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,u,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let u=r-e,f=r+e,d=a+n,m=a-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,f=u+p*this.view.width,d-=_*this.view.offsetY,m=d-_*this.view.height}this.projectionMatrix.makeOrthographic(u,f,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class U0 extends Qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class em{constructor(e=1,n=0,r=0){this.radius=e,this.phi=n,this.theta=r}set(e,n,r){return this.radius=e,this.phi=n,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=gt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,r){return this.radius=Math.sqrt(e*e+n*n+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(gt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class F0 extends es{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function tm(s,e,n,r){const a=O0(r);switch(n){case zm:return s*e;case Hm:return s*e/a.components*a.byteLength;case Xf:return s*e/a.components*a.byteLength;case Vm:return s*e*2/a.components*a.byteLength;case jf:return s*e*2/a.components*a.byteLength;case Bm:return s*e*3/a.components*a.byteLength;case ci:return s*e*4/a.components*a.byteLength;case Yf:return s*e*4/a.components*a.byteLength;case wl:case Al:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Rl:case Cl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case cf:case df:return Math.max(s,16)*Math.max(e,8)/4;case uf:case ff:return Math.max(s,8)*Math.max(e,8)/2;case hf:case pf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case mf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case _f:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case vf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case xf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case yf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Sf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ef:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Mf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Tf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case wf:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Af:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Rf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Cf:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case bf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Pf:case Df:case Lf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Nf:case If:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Uf:case Ff:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function O0(s){switch(s){case Hi:case Um:return{byteLength:1,components:1};case Bo:case Fm:case jo:return{byteLength:2,components:1};case Gf:case Wf:return{byteLength:2,components:4};case Zr:case Vf:case zi:return{byteLength:4,components:1};case Om:case km:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rg(){let s=null,e=!1,n=null,r=null;function a(u,f){n(u,f),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(u){n=u},setContext:function(u){s=u}}}function k0(s){const e=new WeakMap;function n(d,m){const p=d.array,_=d.usage,v=p.byteLength,x=s.createBuffer();s.bindBuffer(m,x),s.bufferData(m,p,_),d.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=s.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:v}}function r(d,m,p){const _=m.array,v=m.updateRanges;if(s.bindBuffer(p,d),v.length===0)s.bufferSubData(p,0,_);else{v.sort((S,w)=>S.start-w.start);let x=0;for(let S=1;S<v.length;S++){const w=v[x],A=v[S];A.start<=w.start+w.count+1?w.count=Math.max(w.count,A.start+A.count-w.start):(++x,v[x]=A)}v.length=x+1;for(let S=0,w=v.length;S<w;S++){const A=v[S];s.bufferSubData(p,A.start*_.BYTES_PER_ELEMENT,_,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(s.deleteBuffer(m.buffer),e.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const _=e.get(d);(!_||_.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,m),p.version=d.version}}return{get:a,remove:u,update:f}}var z0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,B0=`#ifdef USE_ALPHAHASH
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
#endif`,H0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,V0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,G0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,W0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,X0=`#ifdef USE_AOMAP
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
#endif`,j0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Y0=`#ifdef USE_BATCHING
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
#endif`,q0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,K0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Z0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Q0=`#ifdef USE_IRIDESCENCE
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
#endif`,J0=`#ifdef USE_BUMPMAP
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
#endif`,ex=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ix=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ox=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ax=`#if defined( USE_COLOR_ALPHA )
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
#endif`,lx=`#define PI 3.141592653589793
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
} // validated`,ux=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cx=`vec3 transformedNormal = objectNormal;
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
#endif`,fx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,px=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mx="gl_FragColor = linearToOutputTexel( gl_FragColor );",gx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_x=`#ifdef USE_ENVMAP
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
#endif`,vx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xx=`#ifdef USE_ENVMAP
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
#endif`,yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sx=`#ifdef USE_ENVMAP
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
#endif`,Ex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ax=`#ifdef USE_GRADIENTMAP
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
}`,Rx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Px=`uniform bool receiveShadow;
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
#endif`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Lx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ix=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ux=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fx=`PhysicalMaterial material;
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
#endif`,Ox=`struct PhysicalMaterial {
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
}`,kx=`
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
#endif`,zx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qx=`#if defined( USE_POINTS_UV )
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
#endif`,Kx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$x=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ey=`#ifdef USE_MORPHTARGETS
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
#endif`,ty=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ny=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,iy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ry=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ay=`#ifdef USE_NORMALMAP
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
#endif`,ly=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,py=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,my=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_y=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
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
#endif`,Sy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ey=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,My=`float getShadowMask() {
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
}`,Ty=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wy=`#ifdef USE_SKINNING
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
#endif`,Ay=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ry=`#ifdef USE_SKINNING
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
#endif`,Cy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,by=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Py=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ly=`#ifdef USE_TRANSMISSION
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
#endif`,Ny=`#ifdef USE_TRANSMISSION
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
#endif`,Iy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Oy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ky=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zy=`uniform sampler2D t2D;
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
}`,By=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Vy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wy=`#include <common>
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
}`,Xy=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jy=`#define DISTANCE
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
}`,Yy=`#define DISTANCE
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
}`,qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ky=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$y=`uniform float scale;
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
}`,Zy=`uniform vec3 diffuse;
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
}`,Qy=`#include <common>
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
}`,Jy=`uniform vec3 diffuse;
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
}`,eS=`#define LAMBERT
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
}`,tS=`#define LAMBERT
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
}`,nS=`#define MATCAP
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
}`,iS=`#define MATCAP
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
}`,rS=`#define NORMAL
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
}`,sS=`#define NORMAL
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
}`,oS=`#define PHONG
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
}`,aS=`#define PHONG
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
}`,lS=`#define STANDARD
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
}`,uS=`#define STANDARD
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
}`,cS=`#define TOON
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
}`,fS=`#define TOON
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
}`,dS=`uniform float size;
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
}`,hS=`uniform vec3 diffuse;
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
}`,pS=`#include <common>
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
}`,mS=`uniform vec3 color;
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
}`,gS=`uniform float rotation;
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
}`,_S=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:z0,alphahash_pars_fragment:B0,alphamap_fragment:H0,alphamap_pars_fragment:V0,alphatest_fragment:G0,alphatest_pars_fragment:W0,aomap_fragment:X0,aomap_pars_fragment:j0,batching_pars_vertex:Y0,batching_vertex:q0,begin_vertex:K0,beginnormal_vertex:$0,bsdfs:Z0,iridescence_fragment:Q0,bumpmap_pars_fragment:J0,clipping_planes_fragment:ex,clipping_planes_pars_fragment:tx,clipping_planes_pars_vertex:nx,clipping_planes_vertex:ix,color_fragment:rx,color_pars_fragment:sx,color_pars_vertex:ox,color_vertex:ax,common:lx,cube_uv_reflection_fragment:ux,defaultnormal_vertex:cx,displacementmap_pars_vertex:fx,displacementmap_vertex:dx,emissivemap_fragment:hx,emissivemap_pars_fragment:px,colorspace_fragment:mx,colorspace_pars_fragment:gx,envmap_fragment:_x,envmap_common_pars_fragment:vx,envmap_pars_fragment:xx,envmap_pars_vertex:yx,envmap_physical_pars_fragment:Dx,envmap_vertex:Sx,fog_vertex:Ex,fog_pars_vertex:Mx,fog_fragment:Tx,fog_pars_fragment:wx,gradientmap_pars_fragment:Ax,lightmap_pars_fragment:Rx,lights_lambert_fragment:Cx,lights_lambert_pars_fragment:bx,lights_pars_begin:Px,lights_toon_fragment:Lx,lights_toon_pars_fragment:Nx,lights_phong_fragment:Ix,lights_phong_pars_fragment:Ux,lights_physical_fragment:Fx,lights_physical_pars_fragment:Ox,lights_fragment_begin:kx,lights_fragment_maps:zx,lights_fragment_end:Bx,logdepthbuf_fragment:Hx,logdepthbuf_pars_fragment:Vx,logdepthbuf_pars_vertex:Gx,logdepthbuf_vertex:Wx,map_fragment:Xx,map_pars_fragment:jx,map_particle_fragment:Yx,map_particle_pars_fragment:qx,metalnessmap_fragment:Kx,metalnessmap_pars_fragment:$x,morphinstance_vertex:Zx,morphcolor_vertex:Qx,morphnormal_vertex:Jx,morphtarget_pars_vertex:ey,morphtarget_vertex:ty,normal_fragment_begin:ny,normal_fragment_maps:iy,normal_pars_fragment:ry,normal_pars_vertex:sy,normal_vertex:oy,normalmap_pars_fragment:ay,clearcoat_normal_fragment_begin:ly,clearcoat_normal_fragment_maps:uy,clearcoat_pars_fragment:cy,iridescence_pars_fragment:fy,opaque_fragment:dy,packing:hy,premultiplied_alpha_fragment:py,project_vertex:my,dithering_fragment:gy,dithering_pars_fragment:_y,roughnessmap_fragment:vy,roughnessmap_pars_fragment:xy,shadowmap_pars_fragment:yy,shadowmap_pars_vertex:Sy,shadowmap_vertex:Ey,shadowmask_pars_fragment:My,skinbase_vertex:Ty,skinning_pars_vertex:wy,skinning_vertex:Ay,skinnormal_vertex:Ry,specularmap_fragment:Cy,specularmap_pars_fragment:by,tonemapping_fragment:Py,tonemapping_pars_fragment:Dy,transmission_fragment:Ly,transmission_pars_fragment:Ny,uv_pars_fragment:Iy,uv_pars_vertex:Uy,uv_vertex:Fy,worldpos_vertex:Oy,background_vert:ky,background_frag:zy,backgroundCube_vert:By,backgroundCube_frag:Hy,cube_vert:Vy,cube_frag:Gy,depth_vert:Wy,depth_frag:Xy,distanceRGBA_vert:jy,distanceRGBA_frag:Yy,equirect_vert:qy,equirect_frag:Ky,linedashed_vert:$y,linedashed_frag:Zy,meshbasic_vert:Qy,meshbasic_frag:Jy,meshlambert_vert:eS,meshlambert_frag:tS,meshmatcap_vert:nS,meshmatcap_frag:iS,meshnormal_vert:rS,meshnormal_frag:sS,meshphong_vert:oS,meshphong_frag:aS,meshphysical_vert:lS,meshphysical_frag:uS,meshtoon_vert:cS,meshtoon_frag:fS,points_vert:dS,points_frag:hS,shadow_vert:pS,shadow_frag:mS,sprite_vert:gS,sprite_frag:_S},Le={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},vi={basic:{uniforms:wn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:wn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new Dt(0)}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:wn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:wn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:wn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new Dt(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:wn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:wn([Le.points,Le.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:wn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:wn([Le.common,Le.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:wn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:wn([Le.sprite,Le.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distanceRGBA:{uniforms:wn([Le.common,Le.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distanceRGBA_vert,fragmentShader:dt.distanceRGBA_frag},shadow:{uniforms:wn([Le.lights,Le.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};vi.physical={uniforms:wn([vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};const Sl={r:0,b:0,g:0},Vr=new Vi,vS=new tn;function xS(s,e,n,r,a,u,f){const d=new Dt(0);let m=u===!0?0:1,p,_,v=null,x=0,S=null;function w(L){let b=L.isScene===!0?L.background:null;return b&&b.isTexture&&(b=(L.backgroundBlurriness>0?n:e).get(b)),b}function A(L){let b=!1;const H=w(L);H===null?g(d,m):H&&H.isColor&&(g(H,1),b=!0);const z=s.xr.getEnvironmentBlendMode();z==="additive"?r.buffers.color.setClear(0,0,0,1,f):z==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(s.autoClear||b)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(L,b){const H=w(b);H&&(H.isCubeTexture||H.mapping===Nl)?(_===void 0&&(_=new Si(new qo(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:$s(vi.backgroundCube.uniforms),vertexShader:vi.backgroundCube.vertexShader,fragmentShader:vi.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(z,k,q){this.matrixWorld.copyPosition(q.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(_)),Vr.copy(b.backgroundRotation),Vr.x*=-1,Vr.y*=-1,Vr.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(Vr.y*=-1,Vr.z*=-1),_.material.uniforms.envMap.value=H,_.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(vS.makeRotationFromEuler(Vr)),_.material.toneMapped=Mt.getTransfer(H.colorSpace)!==bt,(v!==H||x!==H.version||S!==s.toneMapping)&&(_.material.needsUpdate=!0,v=H,x=H.version,S=s.toneMapping),_.layers.enableAll(),L.unshift(_,_.geometry,_.material,0,0,null)):H&&H.isTexture&&(p===void 0&&(p=new Si(new Ul(2,2),new Gi({name:"BackgroundMaterial",uniforms:$s(vi.background.uniforms),vertexShader:vi.background.vertexShader,fragmentShader:vi.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(p)),p.material.uniforms.t2D.value=H,p.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,p.material.toneMapped=Mt.getTransfer(H.colorSpace)!==bt,H.matrixAutoUpdate===!0&&H.updateMatrix(),p.material.uniforms.uvTransform.value.copy(H.matrix),(v!==H||x!==H.version||S!==s.toneMapping)&&(p.material.needsUpdate=!0,v=H,x=H.version,S=s.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null))}function g(L,b){L.getRGB(Sl,Qm(s)),r.buffers.color.setClear(Sl.r,Sl.g,Sl.b,b,f)}function F(){_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(L,b=1){d.set(L),m=b,g(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(L){m=L,g(d,m)},render:A,addToRenderList:y,dispose:F}}function yS(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let u=a,f=!1;function d(C,B,ne,X,j){let te=!1;const le=v(X,ne,B);u!==le&&(u=le,p(u.object)),te=S(C,X,ne,j),te&&w(C,X,ne,j),j!==null&&e.update(j,s.ELEMENT_ARRAY_BUFFER),(te||f)&&(f=!1,b(C,B,ne,X),j!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function m(){return s.createVertexArray()}function p(C){return s.bindVertexArray(C)}function _(C){return s.deleteVertexArray(C)}function v(C,B,ne){const X=ne.wireframe===!0;let j=r[C.id];j===void 0&&(j={},r[C.id]=j);let te=j[B.id];te===void 0&&(te={},j[B.id]=te);let le=te[X];return le===void 0&&(le=x(m()),te[X]=le),le}function x(C){const B=[],ne=[],X=[];for(let j=0;j<n;j++)B[j]=0,ne[j]=0,X[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:ne,attributeDivisors:X,object:C,attributes:{},index:null}}function S(C,B,ne,X){const j=u.attributes,te=B.attributes;let le=0;const fe=ne.getAttributes();for(const U in fe)if(fe[U].location>=0){const ae=j[U];let N=te[U];if(N===void 0&&(U==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),U==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),ae===void 0||ae.attribute!==N||N&&ae.data!==N.data)return!0;le++}return u.attributesNum!==le||u.index!==X}function w(C,B,ne,X){const j={},te=B.attributes;let le=0;const fe=ne.getAttributes();for(const U in fe)if(fe[U].location>=0){let ae=te[U];ae===void 0&&(U==="instanceMatrix"&&C.instanceMatrix&&(ae=C.instanceMatrix),U==="instanceColor"&&C.instanceColor&&(ae=C.instanceColor));const N={};N.attribute=ae,ae&&ae.data&&(N.data=ae.data),j[U]=N,le++}u.attributes=j,u.attributesNum=le,u.index=X}function A(){const C=u.newAttributes;for(let B=0,ne=C.length;B<ne;B++)C[B]=0}function y(C){g(C,0)}function g(C,B){const ne=u.newAttributes,X=u.enabledAttributes,j=u.attributeDivisors;ne[C]=1,X[C]===0&&(s.enableVertexAttribArray(C),X[C]=1),j[C]!==B&&(s.vertexAttribDivisor(C,B),j[C]=B)}function F(){const C=u.newAttributes,B=u.enabledAttributes;for(let ne=0,X=B.length;ne<X;ne++)B[ne]!==C[ne]&&(s.disableVertexAttribArray(ne),B[ne]=0)}function L(C,B,ne,X,j,te,le){le===!0?s.vertexAttribIPointer(C,B,ne,j,te):s.vertexAttribPointer(C,B,ne,X,j,te)}function b(C,B,ne,X){A();const j=X.attributes,te=ne.getAttributes(),le=B.defaultAttributeValues;for(const fe in te){const U=te[fe];if(U.location>=0){let ue=j[fe];if(ue===void 0&&(fe==="instanceMatrix"&&C.instanceMatrix&&(ue=C.instanceMatrix),fe==="instanceColor"&&C.instanceColor&&(ue=C.instanceColor)),ue!==void 0){const ae=ue.normalized,N=ue.itemSize,re=e.get(ue);if(re===void 0)continue;const xe=re.buffer,be=re.type,pe=re.bytesPerElement,$=be===s.INT||be===s.UNSIGNED_INT||ue.gpuType===Vf;if(ue.isInterleavedBufferAttribute){const Z=ue.data,_e=Z.stride,Ie=ue.offset;if(Z.isInstancedInterleavedBuffer){for(let ke=0;ke<U.locationSize;ke++)g(U.location+ke,Z.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ke=0;ke<U.locationSize;ke++)y(U.location+ke);s.bindBuffer(s.ARRAY_BUFFER,xe);for(let ke=0;ke<U.locationSize;ke++)L(U.location+ke,N/U.locationSize,be,ae,_e*pe,(Ie+N/U.locationSize*ke)*pe,$)}else{if(ue.isInstancedBufferAttribute){for(let Z=0;Z<U.locationSize;Z++)g(U.location+Z,ue.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Z=0;Z<U.locationSize;Z++)y(U.location+Z);s.bindBuffer(s.ARRAY_BUFFER,xe);for(let Z=0;Z<U.locationSize;Z++)L(U.location+Z,N/U.locationSize,be,ae,N*pe,N/U.locationSize*Z*pe,$)}}else if(le!==void 0){const ae=le[fe];if(ae!==void 0)switch(ae.length){case 2:s.vertexAttrib2fv(U.location,ae);break;case 3:s.vertexAttrib3fv(U.location,ae);break;case 4:s.vertexAttrib4fv(U.location,ae);break;default:s.vertexAttrib1fv(U.location,ae)}}}}F()}function H(){q();for(const C in r){const B=r[C];for(const ne in B){const X=B[ne];for(const j in X)_(X[j].object),delete X[j];delete B[ne]}delete r[C]}}function z(C){if(r[C.id]===void 0)return;const B=r[C.id];for(const ne in B){const X=B[ne];for(const j in X)_(X[j].object),delete X[j];delete B[ne]}delete r[C.id]}function k(C){for(const B in r){const ne=r[B];if(ne[C.id]===void 0)continue;const X=ne[C.id];for(const j in X)_(X[j].object),delete X[j];delete ne[C.id]}}function q(){R(),f=!0,u!==a&&(u=a,p(u.object))}function R(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:q,resetDefaultState:R,dispose:H,releaseStatesOfGeometry:z,releaseStatesOfProgram:k,initAttributes:A,enableAttribute:y,disableUnusedAttributes:F}}function SS(s,e,n){let r;function a(p){r=p}function u(p,_){s.drawArrays(r,p,_),n.update(_,r,1)}function f(p,_,v){v!==0&&(s.drawArraysInstanced(r,p,_,v),n.update(_,r,v))}function d(p,_,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,_,0,v);let S=0;for(let w=0;w<v;w++)S+=_[w];n.update(S,r,1)}function m(p,_,v,x){if(v===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let w=0;w<p.length;w++)f(p[w],_[w],x[w]);else{S.multiDrawArraysInstancedWEBGL(r,p,0,_,0,x,0,v);let w=0;for(let A=0;A<v;A++)w+=_[A]*x[A];n.update(w,r,1)}}this.setMode=a,this.render=u,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function ES(s,e,n,r){let a;function u(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function f(k){return!(k!==ci&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(k){const q=k===jo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(k!==Hi&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==zi&&!q)}function m(k){if(k==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const _=m(p);_!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const v=n.logarithmicDepthBuffer===!0,x=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),F=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),L=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),H=w>0,z=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:v,reversedDepthBuffer:x,maxTextures:S,maxVertexTextures:w,maxTextureSize:A,maxCubemapSize:y,maxAttributes:g,maxVertexUniforms:F,maxVaryings:L,maxFragmentUniforms:b,vertexTextures:H,maxSamples:z}}function MS(s){const e=this;let n=null,r=0,a=!1,u=!1;const f=new gr,d=new ft,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const S=v.length!==0||x||r!==0||a;return a=x,r=v.length,S},this.beginShadows=function(){u=!0,_(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(v,x){n=_(v,x,0)},this.setState=function(v,x,S){const w=v.clippingPlanes,A=v.clipIntersection,y=v.clipShadows,g=s.get(v);if(!a||w===null||w.length===0||u&&!y)u?_(null):p();else{const F=u?0:r,L=F*4;let b=g.clippingState||null;m.value=b,b=_(w,x,L,S);for(let H=0;H!==L;++H)b[H]=n[H];g.clippingState=b,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=F}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(v,x,S,w){const A=v!==null?v.length:0;let y=null;if(A!==0){if(y=m.value,w!==!0||y===null){const g=S+A*4,F=x.matrixWorldInverse;d.getNormalMatrix(F),(y===null||y.length<g)&&(y=new Float32Array(g));for(let L=0,b=S;L!==A;++L,b+=4)f.copy(v[L]).applyMatrix4(F,d),f.normal.toArray(y,b),y[b+3]=f.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,y}}function TS(s){let e=new WeakMap;function n(f,d){return d===sf?f.mapping=Ys:d===of&&(f.mapping=qs),f}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===sf||d===of)if(e.has(f)){const m=e.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new A0(m.height);return p.fromEquirectangularTexture(s,f),e.set(f,p),f.addEventListener("dispose",a),n(p.texture,f.mapping)}else return null}}return f}function a(f){const d=f.target;d.removeEventListener("dispose",a);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function u(){e=new WeakMap}return{get:r,dispose:u}}const Vs=4,nm=[.125,.215,.35,.446,.526,.582],jr=20,Vc=new I0,im=new Dt;let Gc=null,Wc=0,Xc=0,jc=!1;const Wr=(1+Math.sqrt(5))/2,zs=1/Wr,rm=[new ee(-Wr,zs,0),new ee(Wr,zs,0),new ee(-zs,0,Wr),new ee(zs,0,Wr),new ee(0,Wr,-zs),new ee(0,Wr,zs),new ee(-1,1,-1),new ee(1,1,-1),new ee(-1,1,1),new ee(1,1,1)],wS=new ee;class sm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100,u={}){const{size:f=256,position:d=wS}=u;Gc=this._renderer.getRenderTarget(),Wc=this._renderer.getActiveCubeFace(),Xc=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,a,m,d),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=am(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Gc,Wc,Xc),this._renderer.xr.enabled=jc,e.scissorTest=!1,El(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ys||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gc=this._renderer.getRenderTarget(),Wc=this._renderer.getActiveCubeFace(),Xc=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:jo,format:ci,colorSpace:Ks,depthBuffer:!1},a=om(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=om(e,n,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=AS(u)),this._blurMaterial=RS(u,e,n)}return a}_compileMaterial(e){const n=new Si(this._lodPlanes[0],e);this._renderer.compile(n,Vc)}_sceneToCubeUV(e,n,r,a,u){const m=new Qn(90,1,n,r),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,x=v.autoClear,S=v.toneMapping;v.getClearColor(im),v.toneMapping=yr,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(a),v.clearDepth(),v.setRenderTarget(null));const A=new Km({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),y=new Si(new qo,A);let g=!1;const F=e.background;F?F.isColor&&(A.color.copy(F),e.background=null,g=!0):(A.color.copy(im),g=!0);for(let L=0;L<6;L++){const b=L%3;b===0?(m.up.set(0,p[L],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x+_[L],u.y,u.z)):b===1?(m.up.set(0,0,p[L]),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y+_[L],u.z)):(m.up.set(0,p[L],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y,u.z+_[L]));const H=this._cubeSize;El(a,b*H,L>2?H:0,H,H),v.setRenderTarget(a),g&&v.render(y,m),v.render(e,m)}y.geometry.dispose(),y.material.dispose(),v.toneMapping=S,v.autoClear=x,e.background=F}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Ys||e.mapping===qs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=lm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=am());const u=a?this._cubemapMaterial:this._equirectMaterial,f=new Si(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=e;const m=this._cubeSize;El(n,0,0,3*m,2*m),r.setRenderTarget(n),r.render(f,Vc)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let u=1;u<a;u++){const f=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=rm[(a-u-1)%rm.length];this._blur(e,u-1,u,f,d)}n.autoClear=r}_blur(e,n,r,a,u){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,r,a,"latitudinal",u),this._halfBlur(f,e,r,r,a,"longitudinal",u)}_halfBlur(e,n,r,a,u,f,d){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,v=new Si(this._lodPlanes[a],p),x=p.uniforms,S=this._sizeLods[r]-1,w=isFinite(u)?Math.PI/(2*S):2*Math.PI/(2*jr-1),A=u/w,y=isFinite(u)?1+Math.floor(_*A):jr;y>jr&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${jr}`);const g=[];let F=0;for(let k=0;k<jr;++k){const q=k/A,R=Math.exp(-q*q/2);g.push(R),k===0?F+=R:k<y&&(F+=2*R)}for(let k=0;k<g.length;k++)g[k]=g[k]/F;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=g,x.latitudinal.value=f==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:L}=this;x.dTheta.value=w,x.mipInt.value=L-r;const b=this._sizeLods[a],H=3*b*(a>L-Vs?a-L+Vs:0),z=4*(this._cubeSize-b);El(n,H,z,3*b,2*b),m.setRenderTarget(n),m.render(v,Vc)}}function AS(s){const e=[],n=[],r=[];let a=s;const u=s-Vs+1+nm.length;for(let f=0;f<u;f++){const d=Math.pow(2,a);n.push(d);let m=1/d;f>s-Vs?m=nm[f-s+Vs-1]:f===0&&(m=0),r.push(m);const p=1/(d-2),_=-p,v=1+p,x=[_,_,v,_,v,v,_,_,v,v,_,v],S=6,w=6,A=3,y=2,g=1,F=new Float32Array(A*w*S),L=new Float32Array(y*w*S),b=new Float32Array(g*w*S);for(let z=0;z<S;z++){const k=z%3*2/3-1,q=z>2?0:-1,R=[k,q,0,k+2/3,q,0,k+2/3,q+1,0,k,q,0,k+2/3,q+1,0,k,q+1,0];F.set(R,A*w*z),L.set(x,y*w*z);const C=[z,z,z,z,z,z];b.set(C,g*w*z)}const H=new Er;H.setAttribute("position",new di(F,A)),H.setAttribute("uv",new di(L,y)),H.setAttribute("faceIndex",new di(b,g)),e.push(H),a>Vs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function om(s,e,n){const r=new Jr(s,e,n);return r.texture.mapping=Nl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function El(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function RS(s,e,n){const r=new Float32Array(jr),a=new ee(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Zf(),fragmentShader:`

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
		`,blending:xr,depthTest:!1,depthWrite:!1})}function am(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zf(),fragmentShader:`

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
		`,blending:xr,depthTest:!1,depthWrite:!1})}function lm(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Zf(){return`

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
	`}function CS(s){let e=new WeakMap,n=null;function r(d){if(d&&d.isTexture){const m=d.mapping,p=m===sf||m===of,_=m===Ys||m===qs;if(p||_){let v=e.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new sm(s)),v=p?n.fromEquirectangular(d,v):n.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),v.texture;if(v!==void 0)return v.texture;{const S=d.image;return p&&S&&S.height>0||_&&S&&a(S)?(n===null&&(n=new sm(s)),v=p?n.fromEquirectangular(d):n.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),d.addEventListener("dispose",u),v.texture):null}}}return d}function a(d){let m=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&m++;return m===p}function u(d){const m=d.target;m.removeEventListener("dispose",u);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function f(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function bS(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&Xo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function PS(s,e,n,r){const a={},u=new WeakMap;function f(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const w in x.attributes)e.remove(x.attributes[w]);x.removeEventListener("dispose",f),delete a[x.id];const S=u.get(x);S&&(e.remove(S),u.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(v,x){return a[x.id]===!0||(x.addEventListener("dispose",f),a[x.id]=!0,n.memory.geometries++),x}function m(v){const x=v.attributes;for(const S in x)e.update(x[S],s.ARRAY_BUFFER)}function p(v){const x=[],S=v.index,w=v.attributes.position;let A=0;if(S!==null){const F=S.array;A=S.version;for(let L=0,b=F.length;L<b;L+=3){const H=F[L+0],z=F[L+1],k=F[L+2];x.push(H,z,z,k,k,H)}}else if(w!==void 0){const F=w.array;A=w.version;for(let L=0,b=F.length/3-1;L<b;L+=3){const H=L+0,z=L+1,k=L+2;x.push(H,z,z,k,k,H)}}else return;const y=new(Wm(x)?Zm:$m)(x,1);y.version=A;const g=u.get(v);g&&e.remove(g),u.set(v,y)}function _(v){const x=u.get(v);if(x){const S=v.index;S!==null&&x.version<S.version&&p(v)}else p(v);return u.get(v)}return{get:d,update:m,getWireframeAttribute:_}}function DS(s,e,n){let r;function a(x){r=x}let u,f;function d(x){u=x.type,f=x.bytesPerElement}function m(x,S){s.drawElements(r,S,u,x*f),n.update(S,r,1)}function p(x,S,w){w!==0&&(s.drawElementsInstanced(r,S,u,x*f,w),n.update(S,r,w))}function _(x,S,w){if(w===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,u,x,0,w);let y=0;for(let g=0;g<w;g++)y+=S[g];n.update(y,r,1)}function v(x,S,w,A){if(w===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let g=0;g<x.length;g++)p(x[g]/f,S[g],A[g]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,u,x,0,A,0,w);let g=0;for(let F=0;F<w;F++)g+=S[F]*A[F];n.update(g,r,1)}}this.setMode=a,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=_,this.renderMultiDrawInstances=v}function LS(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,f,d){switch(n.calls++,f){case s.TRIANGLES:n.triangles+=d*(u/3);break;case s.LINES:n.lines+=d*(u/2);break;case s.LINE_STRIP:n.lines+=d*(u-1);break;case s.LINE_LOOP:n.lines+=d*u;break;case s.POINTS:n.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function NS(s,e,n){const r=new WeakMap,a=new Yt;function u(f,d,m){const p=f.morphTargetInfluences,_=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=_!==void 0?_.length:0;let x=r.get(d);if(x===void 0||x.count!==v){let C=function(){q.dispose(),r.delete(d),d.removeEventListener("dispose",C)};var S=C;x!==void 0&&x.texture.dispose();const w=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,g=d.morphAttributes.position||[],F=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let b=0;w===!0&&(b=1),A===!0&&(b=2),y===!0&&(b=3);let H=d.attributes.position.count*b,z=1;H>e.maxTextureSize&&(z=Math.ceil(H/e.maxTextureSize),H=e.maxTextureSize);const k=new Float32Array(H*z*4*v),q=new Xm(k,H,z,v);q.type=zi,q.needsUpdate=!0;const R=b*4;for(let B=0;B<v;B++){const ne=g[B],X=F[B],j=L[B],te=H*z*4*B;for(let le=0;le<ne.count;le++){const fe=le*R;w===!0&&(a.fromBufferAttribute(ne,le),k[te+fe+0]=a.x,k[te+fe+1]=a.y,k[te+fe+2]=a.z,k[te+fe+3]=0),A===!0&&(a.fromBufferAttribute(X,le),k[te+fe+4]=a.x,k[te+fe+5]=a.y,k[te+fe+6]=a.z,k[te+fe+7]=0),y===!0&&(a.fromBufferAttribute(j,le),k[te+fe+8]=a.x,k[te+fe+9]=a.y,k[te+fe+10]=a.z,k[te+fe+11]=j.itemSize===4?a.w:1)}}x={count:v,texture:q,size:new ht(H,z)},r.set(d,x),d.addEventListener("dispose",C)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",f.morphTexture,n);else{let w=0;for(let y=0;y<p.length;y++)w+=p[y];const A=d.morphTargetsRelative?1:1-w;m.getUniforms().setValue(s,"morphTargetBaseInfluence",A),m.getUniforms().setValue(s,"morphTargetInfluences",p)}m.getUniforms().setValue(s,"morphTargetsTexture",x.texture,n),m.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:u}}function IS(s,e,n,r){let a=new WeakMap;function u(m){const p=r.render.frame,_=m.geometry,v=e.get(m,_);if(a.get(v)!==p&&(e.update(v),a.set(v,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),a.get(m)!==p&&(n.update(m.instanceMatrix,s.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,s.ARRAY_BUFFER),a.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;a.get(x)!==p&&(x.update(),a.set(x,p))}return v}function f(){a=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:u,dispose:f}}const sg=new In,um=new ng(1,1),og=new Xm,ag=new u0,lg=new eg,cm=[],fm=[],dm=new Float32Array(16),hm=new Float32Array(9),pm=new Float32Array(4);function Qs(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let u=cm[a];if(u===void 0&&(u=new Float32Array(a),cm[a]=u),e!==0){r.toArray(u,0);for(let f=1,d=0;f!==e;++f)d+=n,s[f].toArray(u,d)}return u}function nn(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function rn(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function Fl(s,e){let n=fm[e];n===void 0&&(n=new Int32Array(e),fm[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function US(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function FS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(nn(n,e))return;s.uniform2fv(this.addr,e),rn(n,e)}}function OS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(nn(n,e))return;s.uniform3fv(this.addr,e),rn(n,e)}}function kS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(nn(n,e))return;s.uniform4fv(this.addr,e),rn(n,e)}}function zS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(nn(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),rn(n,e)}else{if(nn(n,r))return;pm.set(r),s.uniformMatrix2fv(this.addr,!1,pm),rn(n,r)}}function BS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(nn(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),rn(n,e)}else{if(nn(n,r))return;hm.set(r),s.uniformMatrix3fv(this.addr,!1,hm),rn(n,r)}}function HS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(nn(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),rn(n,e)}else{if(nn(n,r))return;dm.set(r),s.uniformMatrix4fv(this.addr,!1,dm),rn(n,r)}}function VS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function GS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(nn(n,e))return;s.uniform2iv(this.addr,e),rn(n,e)}}function WS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(nn(n,e))return;s.uniform3iv(this.addr,e),rn(n,e)}}function XS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(nn(n,e))return;s.uniform4iv(this.addr,e),rn(n,e)}}function jS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function YS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(nn(n,e))return;s.uniform2uiv(this.addr,e),rn(n,e)}}function qS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(nn(n,e))return;s.uniform3uiv(this.addr,e),rn(n,e)}}function KS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(nn(n,e))return;s.uniform4uiv(this.addr,e),rn(n,e)}}function $S(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let u;this.type===s.SAMPLER_2D_SHADOW?(um.compareFunction=Gm,u=um):u=sg,n.setTexture2D(e||u,a)}function ZS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||ag,a)}function QS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||lg,a)}function JS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||og,a)}function eE(s){switch(s){case 5126:return US;case 35664:return FS;case 35665:return OS;case 35666:return kS;case 35674:return zS;case 35675:return BS;case 35676:return HS;case 5124:case 35670:return VS;case 35667:case 35671:return GS;case 35668:case 35672:return WS;case 35669:case 35673:return XS;case 5125:return jS;case 36294:return YS;case 36295:return qS;case 36296:return KS;case 35678:case 36198:case 36298:case 36306:case 35682:return $S;case 35679:case 36299:case 36307:return ZS;case 35680:case 36300:case 36308:case 36293:return QS;case 36289:case 36303:case 36311:case 36292:return JS}}function tE(s,e){s.uniform1fv(this.addr,e)}function nE(s,e){const n=Qs(e,this.size,2);s.uniform2fv(this.addr,n)}function iE(s,e){const n=Qs(e,this.size,3);s.uniform3fv(this.addr,n)}function rE(s,e){const n=Qs(e,this.size,4);s.uniform4fv(this.addr,n)}function sE(s,e){const n=Qs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function oE(s,e){const n=Qs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function aE(s,e){const n=Qs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function lE(s,e){s.uniform1iv(this.addr,e)}function uE(s,e){s.uniform2iv(this.addr,e)}function cE(s,e){s.uniform3iv(this.addr,e)}function fE(s,e){s.uniform4iv(this.addr,e)}function dE(s,e){s.uniform1uiv(this.addr,e)}function hE(s,e){s.uniform2uiv(this.addr,e)}function pE(s,e){s.uniform3uiv(this.addr,e)}function mE(s,e){s.uniform4uiv(this.addr,e)}function gE(s,e,n){const r=this.cache,a=e.length,u=Fl(n,a);nn(r,u)||(s.uniform1iv(this.addr,u),rn(r,u));for(let f=0;f!==a;++f)n.setTexture2D(e[f]||sg,u[f])}function _E(s,e,n){const r=this.cache,a=e.length,u=Fl(n,a);nn(r,u)||(s.uniform1iv(this.addr,u),rn(r,u));for(let f=0;f!==a;++f)n.setTexture3D(e[f]||ag,u[f])}function vE(s,e,n){const r=this.cache,a=e.length,u=Fl(n,a);nn(r,u)||(s.uniform1iv(this.addr,u),rn(r,u));for(let f=0;f!==a;++f)n.setTextureCube(e[f]||lg,u[f])}function xE(s,e,n){const r=this.cache,a=e.length,u=Fl(n,a);nn(r,u)||(s.uniform1iv(this.addr,u),rn(r,u));for(let f=0;f!==a;++f)n.setTexture2DArray(e[f]||og,u[f])}function yE(s){switch(s){case 5126:return tE;case 35664:return nE;case 35665:return iE;case 35666:return rE;case 35674:return sE;case 35675:return oE;case 35676:return aE;case 5124:case 35670:return lE;case 35667:case 35671:return uE;case 35668:case 35672:return cE;case 35669:case 35673:return fE;case 5125:return dE;case 36294:return hE;case 36295:return pE;case 36296:return mE;case 35678:case 36198:case 36298:case 36306:case 35682:return gE;case 35679:case 36299:case 36307:return _E;case 35680:case 36300:case 36308:case 36293:return vE;case 36289:case 36303:case 36311:case 36292:return xE}}class SE{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=eE(n.type)}}class EE{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=yE(n.type)}}class ME{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let u=0,f=a.length;u!==f;++u){const d=a[u];d.setValue(e,n[d.id],r)}}}const Yc=/(\w+)(\])?(\[|\.)?/g;function mm(s,e){s.seq.push(e),s.map[e.id]=e}function TE(s,e,n){const r=s.name,a=r.length;for(Yc.lastIndex=0;;){const u=Yc.exec(r),f=Yc.lastIndex;let d=u[1];const m=u[2]==="]",p=u[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===a){mm(n,p===void 0?new SE(d,s,e):new EE(d,s,e));break}else{let v=n.map[d];v===void 0&&(v=new ME(d),mm(n,v)),n=v}}}class bl{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const u=e.getActiveUniform(n,a),f=e.getUniformLocation(n,u.name);TE(u,f,this)}}setValue(e,n,r,a){const u=this.map[n];u!==void 0&&u.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let u=0,f=n.length;u!==f;++u){const d=n[u],m=r[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,u=e.length;a!==u;++a){const f=e[a];f.id in n&&r.push(f)}return r}}function gm(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const wE=37297;let AE=0;function RE(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),u=Math.min(e+6,n.length);for(let f=a;f<u;f++){const d=f+1;r.push(`${d===e?">":" "} ${d}: ${n[f]}`)}return r.join(`
`)}const _m=new ft;function CE(s){Mt._getMatrix(_m,Mt.workingColorSpace,s);const e=`mat3( ${_m.elements.map(n=>n.toFixed(4))} )`;switch(Mt.getTransfer(s)){case Pl:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function vm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),u=(s.getShaderInfoLog(e)||"").trim();if(r&&u==="")return"";const f=/ERROR: 0:(\d+)/.exec(u);if(f){const d=parseInt(f[1]);return n.toUpperCase()+`

`+u+`

`+RE(s.getShaderSource(e),d)}else return u}function bE(s,e){const n=CE(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function PE(s,e){let n;switch(e){case Sv:n="Linear";break;case Ev:n="Reinhard";break;case Mv:n="Cineon";break;case Tv:n="ACESFilmic";break;case Av:n="AgX";break;case Rv:n="Neutral";break;case wv:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ml=new ee;function DE(){Mt.getLuminanceCoefficients(Ml);const s=Ml.x.toFixed(4),e=Ml.y.toFixed(4),n=Ml.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function LE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oo).join(`
`)}function NE(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function IE(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const u=s.getActiveAttrib(e,a),f=u.name;let d=1;u.type===s.FLOAT_MAT2&&(d=2),u.type===s.FLOAT_MAT3&&(d=3),u.type===s.FLOAT_MAT4&&(d=4),n[f]={type:u.type,location:s.getAttribLocation(e,f),locationSize:d}}return n}function Oo(s){return s!==""}function xm(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ym(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const UE=/^[ \t]*#include +<([\w\d./]+)>/gm;function kf(s){return s.replace(UE,OE)}const FE=new Map;function OE(s,e){let n=dt[e];if(n===void 0){const r=FE.get(e);if(r!==void 0)n=dt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return kf(n)}const kE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sm(s){return s.replace(kE,zE)}function zE(s,e,n,r){let a="";for(let u=parseInt(e);u<parseInt(n);u++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return a}function Em(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function BE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Lm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===ev?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Oi&&(e="SHADOWMAP_TYPE_VSM"),e}function HE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ys:case qs:e="ENVMAP_TYPE_CUBE";break;case Nl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function VE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function GE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Nm:e="ENVMAP_BLENDING_MULTIPLY";break;case xv:e="ENVMAP_BLENDING_MIX";break;case yv:e="ENVMAP_BLENDING_ADD";break}return e}function WE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function XE(s,e,n,r){const a=s.getContext(),u=n.defines;let f=n.vertexShader,d=n.fragmentShader;const m=BE(n),p=HE(n),_=VE(n),v=GE(n),x=WE(n),S=LE(n),w=NE(u),A=a.createProgram();let y,g,F=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w].filter(Oo).join(`
`),y.length>0&&(y+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w].filter(Oo).join(`
`),g.length>0&&(g+=`
`)):(y=[Em(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oo).join(`
`),g=[Em(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+_:"",n.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==yr?"#define TONE_MAPPING":"",n.toneMapping!==yr?dt.tonemapping_pars_fragment:"",n.toneMapping!==yr?PE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,bE("linearToOutputTexel",n.outputColorSpace),DE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Oo).join(`
`)),f=kf(f),f=xm(f,n),f=ym(f,n),d=kf(d),d=xm(d,n),d=ym(d,n),f=Sm(f),d=Sm(d),n.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",n.glslVersion===Of?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Of?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const L=F+y+f,b=F+g+d,H=gm(a,a.VERTEX_SHADER,L),z=gm(a,a.FRAGMENT_SHADER,b);a.attachShader(A,H),a.attachShader(A,z),n.index0AttributeName!==void 0?a.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(A,0,"position"),a.linkProgram(A);function k(B){if(s.debug.checkShaderErrors){const ne=a.getProgramInfoLog(A)||"",X=a.getShaderInfoLog(H)||"",j=a.getShaderInfoLog(z)||"",te=ne.trim(),le=X.trim(),fe=j.trim();let U=!0,ue=!0;if(a.getProgramParameter(A,a.LINK_STATUS)===!1)if(U=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,A,H,z);else{const ae=vm(a,H,"vertex"),N=vm(a,z,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(A,a.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+te+`
`+ae+`
`+N)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(le===""||fe==="")&&(ue=!1);ue&&(B.diagnostics={runnable:U,programLog:te,vertexShader:{log:le,prefix:y},fragmentShader:{log:fe,prefix:g}})}a.deleteShader(H),a.deleteShader(z),q=new bl(a,A),R=IE(a,A)}let q;this.getUniforms=function(){return q===void 0&&k(this),q};let R;this.getAttributes=function(){return R===void 0&&k(this),R};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(A,wE)),C},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=AE++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=H,this.fragmentShader=z,this}let jE=0;class YE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),u=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(u)===!1&&(f.add(u),u.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new qE(e),n.set(e,r)),r}}class qE{constructor(e){this.id=jE++,this.code=e,this.usedTimes=0}}function KE(s,e,n,r,a,u,f){const d=new Ym,m=new YE,p=new Set,_=[],v=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(R){return p.add(R),R===0?"uv":`uv${R}`}function y(R,C,B,ne,X){const j=ne.fog,te=X.geometry,le=R.isMeshStandardMaterial?ne.environment:null,fe=(R.isMeshStandardMaterial?n:e).get(R.envMap||le),U=fe&&fe.mapping===Nl?fe.image.height:null,ue=w[R.type];R.precision!==null&&(S=a.getMaxPrecision(R.precision),S!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",S,"instead."));const ae=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,N=ae!==void 0?ae.length:0;let re=0;te.morphAttributes.position!==void 0&&(re=1),te.morphAttributes.normal!==void 0&&(re=2),te.morphAttributes.color!==void 0&&(re=3);let xe,be,pe,$;if(ue){const xt=vi[ue];xe=xt.vertexShader,be=xt.fragmentShader}else xe=R.vertexShader,be=R.fragmentShader,m.update(R),pe=m.getVertexShaderID(R),$=m.getFragmentShaderID(R);const Z=s.getRenderTarget(),_e=s.state.buffers.depth.getReversed(),Ie=X.isInstancedMesh===!0,ke=X.isBatchedMesh===!0,pt=!!R.map,$t=!!R.matcap,I=!!fe,Rt=!!R.aoMap,ut=!!R.lightMap,nt=!!R.bumpMap,Ge=!!R.normalMap,Lt=!!R.displacementMap,We=!!R.emissiveMap,at=!!R.metalnessMap,Ot=!!R.roughnessMap,kt=R.anisotropy>0,P=R.clearcoat>0,M=R.dispersion>0,Q=R.iridescence>0,de=R.sheen>0,ge=R.transmission>0,ce=kt&&!!R.anisotropyMap,Ke=P&&!!R.clearcoatMap,Ae=P&&!!R.clearcoatNormalMap,Be=P&&!!R.clearcoatRoughnessMap,$e=Q&&!!R.iridescenceMap,Te=Q&&!!R.iridescenceThicknessMap,Ne=de&&!!R.sheenColorMap,it=de&&!!R.sheenRoughnessMap,Ye=!!R.specularMap,Pe=!!R.specularColorMap,ct=!!R.specularIntensityMap,V=ge&&!!R.transmissionMap,Ee=ge&&!!R.thicknessMap,Ce=!!R.gradientMap,Ue=!!R.alphaMap,Se=R.alphaTest>0,he=!!R.alphaHash,Xe=!!R.extensions;let lt=yr;R.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(lt=s.toneMapping);const wt={shaderID:ue,shaderType:R.type,shaderName:R.name,vertexShader:xe,fragmentShader:be,defines:R.defines,customVertexShaderID:pe,customFragmentShaderID:$,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:S,batching:ke,batchingColor:ke&&X._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&X.instanceColor!==null,instancingMorph:Ie&&X.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:Z===null?s.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ks,alphaToCoverage:!!R.alphaToCoverage,map:pt,matcap:$t,envMap:I,envMapMode:I&&fe.mapping,envMapCubeUVHeight:U,aoMap:Rt,lightMap:ut,bumpMap:nt,normalMap:Ge,displacementMap:x&&Lt,emissiveMap:We,normalMapObjectSpace:Ge&&R.normalMapType===Lv,normalMapTangentSpace:Ge&&R.normalMapType===Dv,metalnessMap:at,roughnessMap:Ot,anisotropy:kt,anisotropyMap:ce,clearcoat:P,clearcoatMap:Ke,clearcoatNormalMap:Ae,clearcoatRoughnessMap:Be,dispersion:M,iridescence:Q,iridescenceMap:$e,iridescenceThicknessMap:Te,sheen:de,sheenColorMap:Ne,sheenRoughnessMap:it,specularMap:Ye,specularColorMap:Pe,specularIntensityMap:ct,transmission:ge,transmissionMap:V,thicknessMap:Ee,gradientMap:Ce,opaque:R.transparent===!1&&R.blending===Ws&&R.alphaToCoverage===!1,alphaMap:Ue,alphaTest:Se,alphaHash:he,combine:R.combine,mapUv:pt&&A(R.map.channel),aoMapUv:Rt&&A(R.aoMap.channel),lightMapUv:ut&&A(R.lightMap.channel),bumpMapUv:nt&&A(R.bumpMap.channel),normalMapUv:Ge&&A(R.normalMap.channel),displacementMapUv:Lt&&A(R.displacementMap.channel),emissiveMapUv:We&&A(R.emissiveMap.channel),metalnessMapUv:at&&A(R.metalnessMap.channel),roughnessMapUv:Ot&&A(R.roughnessMap.channel),anisotropyMapUv:ce&&A(R.anisotropyMap.channel),clearcoatMapUv:Ke&&A(R.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&A(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&A(R.clearcoatRoughnessMap.channel),iridescenceMapUv:$e&&A(R.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&A(R.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&A(R.sheenColorMap.channel),sheenRoughnessMapUv:it&&A(R.sheenRoughnessMap.channel),specularMapUv:Ye&&A(R.specularMap.channel),specularColorMapUv:Pe&&A(R.specularColorMap.channel),specularIntensityMapUv:ct&&A(R.specularIntensityMap.channel),transmissionMapUv:V&&A(R.transmissionMap.channel),thicknessMapUv:Ee&&A(R.thicknessMap.channel),alphaMapUv:Ue&&A(R.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(Ge||kt),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!te.attributes.uv&&(pt||Ue),fog:!!j,useFog:R.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:R.flatShading===!0&&R.wireframe===!1,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:_e,skinning:X.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:re,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:R.dithering,shadowMapEnabled:s.shadowMap.enabled&&B.length>0,shadowMapType:s.shadowMap.type,toneMapping:lt,decodeVideoTexture:pt&&R.map.isVideoTexture===!0&&Mt.getTransfer(R.map.colorSpace)===bt,decodeVideoTextureEmissive:We&&R.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(R.emissiveMap.colorSpace)===bt,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===ki,flipSided:R.side===Nn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:Xe&&R.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&R.extensions.multiDraw===!0||ke)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return wt.vertexUv1s=p.has(1),wt.vertexUv2s=p.has(2),wt.vertexUv3s=p.has(3),p.clear(),wt}function g(R){const C=[];if(R.shaderID?C.push(R.shaderID):(C.push(R.customVertexShaderID),C.push(R.customFragmentShaderID)),R.defines!==void 0)for(const B in R.defines)C.push(B),C.push(R.defines[B]);return R.isRawShaderMaterial===!1&&(F(C,R),L(C,R),C.push(s.outputColorSpace)),C.push(R.customProgramCacheKey),C.join()}function F(R,C){R.push(C.precision),R.push(C.outputColorSpace),R.push(C.envMapMode),R.push(C.envMapCubeUVHeight),R.push(C.mapUv),R.push(C.alphaMapUv),R.push(C.lightMapUv),R.push(C.aoMapUv),R.push(C.bumpMapUv),R.push(C.normalMapUv),R.push(C.displacementMapUv),R.push(C.emissiveMapUv),R.push(C.metalnessMapUv),R.push(C.roughnessMapUv),R.push(C.anisotropyMapUv),R.push(C.clearcoatMapUv),R.push(C.clearcoatNormalMapUv),R.push(C.clearcoatRoughnessMapUv),R.push(C.iridescenceMapUv),R.push(C.iridescenceThicknessMapUv),R.push(C.sheenColorMapUv),R.push(C.sheenRoughnessMapUv),R.push(C.specularMapUv),R.push(C.specularColorMapUv),R.push(C.specularIntensityMapUv),R.push(C.transmissionMapUv),R.push(C.thicknessMapUv),R.push(C.combine),R.push(C.fogExp2),R.push(C.sizeAttenuation),R.push(C.morphTargetsCount),R.push(C.morphAttributeCount),R.push(C.numDirLights),R.push(C.numPointLights),R.push(C.numSpotLights),R.push(C.numSpotLightMaps),R.push(C.numHemiLights),R.push(C.numRectAreaLights),R.push(C.numDirLightShadows),R.push(C.numPointLightShadows),R.push(C.numSpotLightShadows),R.push(C.numSpotLightShadowsWithMaps),R.push(C.numLightProbes),R.push(C.shadowMapType),R.push(C.toneMapping),R.push(C.numClippingPlanes),R.push(C.numClipIntersection),R.push(C.depthPacking)}function L(R,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),C.gradientMap&&d.enable(22),R.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reversedDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),R.push(d.mask)}function b(R){const C=w[R.type];let B;if(C){const ne=vi[C];B=E0.clone(ne.uniforms)}else B=R.uniforms;return B}function H(R,C){let B;for(let ne=0,X=_.length;ne<X;ne++){const j=_[ne];if(j.cacheKey===C){B=j,++B.usedTimes;break}}return B===void 0&&(B=new XE(s,C,R,u),_.push(B)),B}function z(R){if(--R.usedTimes===0){const C=_.indexOf(R);_[C]=_[_.length-1],_.pop(),R.destroy()}}function k(R){m.remove(R)}function q(){m.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:b,acquireProgram:H,releaseProgram:z,releaseShaderCache:k,programs:_,dispose:q}}function $E(){let s=new WeakMap;function e(f){return s.has(f)}function n(f){let d=s.get(f);return d===void 0&&(d={},s.set(f,d)),d}function r(f){s.delete(f)}function a(f,d,m){s.get(f)[d]=m}function u(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:u}}function ZE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Mm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Tm(){const s=[];let e=0;const n=[],r=[],a=[];function u(){e=0,n.length=0,r.length=0,a.length=0}function f(v,x,S,w,A,y){let g=s[e];return g===void 0?(g={id:v.id,object:v,geometry:x,material:S,groupOrder:w,renderOrder:v.renderOrder,z:A,group:y},s[e]=g):(g.id=v.id,g.object=v,g.geometry=x,g.material=S,g.groupOrder=w,g.renderOrder=v.renderOrder,g.z=A,g.group=y),e++,g}function d(v,x,S,w,A,y){const g=f(v,x,S,w,A,y);S.transmission>0?r.push(g):S.transparent===!0?a.push(g):n.push(g)}function m(v,x,S,w,A,y){const g=f(v,x,S,w,A,y);S.transmission>0?r.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function p(v,x){n.length>1&&n.sort(v||ZE),r.length>1&&r.sort(x||Mm),a.length>1&&a.sort(x||Mm)}function _(){for(let v=e,x=s.length;v<x;v++){const S=s[v];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:u,push:d,unshift:m,finish:_,sort:p}}function QE(){let s=new WeakMap;function e(r,a){const u=s.get(r);let f;return u===void 0?(f=new Tm,s.set(r,[f])):a>=u.length?(f=new Tm,u.push(f)):f=u[a],f}function n(){s=new WeakMap}return{get:e,dispose:n}}function JE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new ee,color:new Dt};break;case"SpotLight":n={position:new ee,direction:new ee,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ee,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ee,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":n={color:new Dt,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return s[e.id]=n,n}}}function eM(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let tM=0;function nM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function iM(s){const e=new JE,n=eM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new ee);const a=new ee,u=new tn,f=new tn;function d(p){let _=0,v=0,x=0;for(let R=0;R<9;R++)r.probe[R].set(0,0,0);let S=0,w=0,A=0,y=0,g=0,F=0,L=0,b=0,H=0,z=0,k=0;p.sort(nM);for(let R=0,C=p.length;R<C;R++){const B=p[R],ne=B.color,X=B.intensity,j=B.distance,te=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)_+=ne.r*X,v+=ne.g*X,x+=ne.b*X;else if(B.isLightProbe){for(let le=0;le<9;le++)r.probe[le].addScaledVector(B.sh.coefficients[le],X);k++}else if(B.isDirectionalLight){const le=e.get(B);if(le.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const fe=B.shadow,U=n.get(B);U.shadowIntensity=fe.intensity,U.shadowBias=fe.bias,U.shadowNormalBias=fe.normalBias,U.shadowRadius=fe.radius,U.shadowMapSize=fe.mapSize,r.directionalShadow[S]=U,r.directionalShadowMap[S]=te,r.directionalShadowMatrix[S]=B.shadow.matrix,F++}r.directional[S]=le,S++}else if(B.isSpotLight){const le=e.get(B);le.position.setFromMatrixPosition(B.matrixWorld),le.color.copy(ne).multiplyScalar(X),le.distance=j,le.coneCos=Math.cos(B.angle),le.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),le.decay=B.decay,r.spot[A]=le;const fe=B.shadow;if(B.map&&(r.spotLightMap[H]=B.map,H++,fe.updateMatrices(B),B.castShadow&&z++),r.spotLightMatrix[A]=fe.matrix,B.castShadow){const U=n.get(B);U.shadowIntensity=fe.intensity,U.shadowBias=fe.bias,U.shadowNormalBias=fe.normalBias,U.shadowRadius=fe.radius,U.shadowMapSize=fe.mapSize,r.spotShadow[A]=U,r.spotShadowMap[A]=te,b++}A++}else if(B.isRectAreaLight){const le=e.get(B);le.color.copy(ne).multiplyScalar(X),le.halfWidth.set(B.width*.5,0,0),le.halfHeight.set(0,B.height*.5,0),r.rectArea[y]=le,y++}else if(B.isPointLight){const le=e.get(B);if(le.color.copy(B.color).multiplyScalar(B.intensity),le.distance=B.distance,le.decay=B.decay,B.castShadow){const fe=B.shadow,U=n.get(B);U.shadowIntensity=fe.intensity,U.shadowBias=fe.bias,U.shadowNormalBias=fe.normalBias,U.shadowRadius=fe.radius,U.shadowMapSize=fe.mapSize,U.shadowCameraNear=fe.camera.near,U.shadowCameraFar=fe.camera.far,r.pointShadow[w]=U,r.pointShadowMap[w]=te,r.pointShadowMatrix[w]=B.shadow.matrix,L++}r.point[w]=le,w++}else if(B.isHemisphereLight){const le=e.get(B);le.skyColor.copy(B.color).multiplyScalar(X),le.groundColor.copy(B.groundColor).multiplyScalar(X),r.hemi[g]=le,g++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Le.LTC_FLOAT_1,r.rectAreaLTC2=Le.LTC_FLOAT_2):(r.rectAreaLTC1=Le.LTC_HALF_1,r.rectAreaLTC2=Le.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=v,r.ambient[2]=x;const q=r.hash;(q.directionalLength!==S||q.pointLength!==w||q.spotLength!==A||q.rectAreaLength!==y||q.hemiLength!==g||q.numDirectionalShadows!==F||q.numPointShadows!==L||q.numSpotShadows!==b||q.numSpotMaps!==H||q.numLightProbes!==k)&&(r.directional.length=S,r.spot.length=A,r.rectArea.length=y,r.point.length=w,r.hemi.length=g,r.directionalShadow.length=F,r.directionalShadowMap.length=F,r.pointShadow.length=L,r.pointShadowMap.length=L,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=F,r.pointShadowMatrix.length=L,r.spotLightMatrix.length=b+H-z,r.spotLightMap.length=H,r.numSpotLightShadowsWithMaps=z,r.numLightProbes=k,q.directionalLength=S,q.pointLength=w,q.spotLength=A,q.rectAreaLength=y,q.hemiLength=g,q.numDirectionalShadows=F,q.numPointShadows=L,q.numSpotShadows=b,q.numSpotMaps=H,q.numLightProbes=k,r.version=tM++)}function m(p,_){let v=0,x=0,S=0,w=0,A=0;const y=_.matrixWorldInverse;for(let g=0,F=p.length;g<F;g++){const L=p[g];if(L.isDirectionalLight){const b=r.directional[v];b.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(y),v++}else if(L.isSpotLight){const b=r.spot[S];b.position.setFromMatrixPosition(L.matrixWorld),b.position.applyMatrix4(y),b.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(y),S++}else if(L.isRectAreaLight){const b=r.rectArea[w];b.position.setFromMatrixPosition(L.matrixWorld),b.position.applyMatrix4(y),f.identity(),u.copy(L.matrixWorld),u.premultiply(y),f.extractRotation(u),b.halfWidth.set(L.width*.5,0,0),b.halfHeight.set(0,L.height*.5,0),b.halfWidth.applyMatrix4(f),b.halfHeight.applyMatrix4(f),w++}else if(L.isPointLight){const b=r.point[x];b.position.setFromMatrixPosition(L.matrixWorld),b.position.applyMatrix4(y),x++}else if(L.isHemisphereLight){const b=r.hemi[A];b.direction.setFromMatrixPosition(L.matrixWorld),b.direction.transformDirection(y),A++}}}return{setup:d,setupView:m,state:r}}function wm(s){const e=new iM(s),n=[],r=[];function a(_){p.camera=_,n.length=0,r.length=0}function u(_){n.push(_)}function f(_){r.push(_)}function d(){e.setup(n)}function m(_){e.setupView(n,_)}const p={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:p,setupLights:d,setupLightsView:m,pushLight:u,pushShadow:f}}function rM(s){let e=new WeakMap;function n(a,u=0){const f=e.get(a);let d;return f===void 0?(d=new wm(s),e.set(a,[d])):u>=f.length?(d=new wm(s),f.push(d)):d=f[u],d}function r(){e=new WeakMap}return{get:n,dispose:r}}const sM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oM=`uniform sampler2D shadow_pass;
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
}`;function aM(s,e,n){let r=new tg;const a=new ht,u=new ht,f=new Yt,d=new L0({depthPacking:Pv}),m=new N0,p={},_=n.maxTextureSize,v={[Sr]:Nn,[Nn]:Sr,[ki]:ki},x=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:sM,fragmentShader:oM}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const w=new Er;w.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Si(w,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lm;let g=this.type;this.render=function(z,k,q){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||z.length===0)return;const R=s.getRenderTarget(),C=s.getActiveCubeFace(),B=s.getActiveMipmapLevel(),ne=s.state;ne.setBlending(xr),ne.buffers.depth.getReversed()===!0?ne.buffers.color.setClear(0,0,0,0):ne.buffers.color.setClear(1,1,1,1),ne.buffers.depth.setTest(!0),ne.setScissorTest(!1);const X=g!==Oi&&this.type===Oi,j=g===Oi&&this.type!==Oi;for(let te=0,le=z.length;te<le;te++){const fe=z[te],U=fe.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",fe,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;a.copy(U.mapSize);const ue=U.getFrameExtents();if(a.multiply(ue),u.copy(U.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(u.x=Math.floor(_/ue.x),a.x=u.x*ue.x,U.mapSize.x=u.x),a.y>_&&(u.y=Math.floor(_/ue.y),a.y=u.y*ue.y,U.mapSize.y=u.y)),U.map===null||X===!0||j===!0){const N=this.type!==Oi?{minFilter:fi,magFilter:fi}:{};U.map!==null&&U.map.dispose(),U.map=new Jr(a.x,a.y,N),U.map.texture.name=fe.name+".shadowMap",U.camera.updateProjectionMatrix()}s.setRenderTarget(U.map),s.clear();const ae=U.getViewportCount();for(let N=0;N<ae;N++){const re=U.getViewport(N);f.set(u.x*re.x,u.y*re.y,u.x*re.z,u.y*re.w),ne.viewport(f),U.updateMatrices(fe,N),r=U.getFrustum(),b(k,q,U.camera,fe,this.type)}U.isPointLightShadow!==!0&&this.type===Oi&&F(U,q),U.needsUpdate=!1}g=this.type,y.needsUpdate=!1,s.setRenderTarget(R,C,B)};function F(z,k){const q=e.update(A);x.defines.VSM_SAMPLES!==z.blurSamples&&(x.defines.VSM_SAMPLES=z.blurSamples,S.defines.VSM_SAMPLES=z.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),z.mapPass===null&&(z.mapPass=new Jr(a.x,a.y)),x.uniforms.shadow_pass.value=z.map.texture,x.uniforms.resolution.value=z.mapSize,x.uniforms.radius.value=z.radius,s.setRenderTarget(z.mapPass),s.clear(),s.renderBufferDirect(k,null,q,x,A,null),S.uniforms.shadow_pass.value=z.mapPass.texture,S.uniforms.resolution.value=z.mapSize,S.uniforms.radius.value=z.radius,s.setRenderTarget(z.map),s.clear(),s.renderBufferDirect(k,null,q,S,A,null)}function L(z,k,q,R){let C=null;const B=q.isPointLight===!0?z.customDistanceMaterial:z.customDepthMaterial;if(B!==void 0)C=B;else if(C=q.isPointLight===!0?m:d,s.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0||k.alphaToCoverage===!0){const ne=C.uuid,X=k.uuid;let j=p[ne];j===void 0&&(j={},p[ne]=j);let te=j[X];te===void 0&&(te=C.clone(),j[X]=te,k.addEventListener("dispose",H)),C=te}if(C.visible=k.visible,C.wireframe=k.wireframe,R===Oi?C.side=k.shadowSide!==null?k.shadowSide:k.side:C.side=k.shadowSide!==null?k.shadowSide:v[k.side],C.alphaMap=k.alphaMap,C.alphaTest=k.alphaToCoverage===!0?.5:k.alphaTest,C.map=k.map,C.clipShadows=k.clipShadows,C.clippingPlanes=k.clippingPlanes,C.clipIntersection=k.clipIntersection,C.displacementMap=k.displacementMap,C.displacementScale=k.displacementScale,C.displacementBias=k.displacementBias,C.wireframeLinewidth=k.wireframeLinewidth,C.linewidth=k.linewidth,q.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const ne=s.properties.get(C);ne.light=q}return C}function b(z,k,q,R,C){if(z.visible===!1)return;if(z.layers.test(k.layers)&&(z.isMesh||z.isLine||z.isPoints)&&(z.castShadow||z.receiveShadow&&C===Oi)&&(!z.frustumCulled||r.intersectsObject(z))){z.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,z.matrixWorld);const X=e.update(z),j=z.material;if(Array.isArray(j)){const te=X.groups;for(let le=0,fe=te.length;le<fe;le++){const U=te[le],ue=j[U.materialIndex];if(ue&&ue.visible){const ae=L(z,ue,R,C);z.onBeforeShadow(s,z,k,q,X,ae,U),s.renderBufferDirect(q,null,X,ae,z,U),z.onAfterShadow(s,z,k,q,X,ae,U)}}}else if(j.visible){const te=L(z,j,R,C);z.onBeforeShadow(s,z,k,q,X,te,null),s.renderBufferDirect(q,null,X,te,z,null),z.onAfterShadow(s,z,k,q,X,te,null)}}const ne=z.children;for(let X=0,j=ne.length;X<j;X++)b(ne[X],k,q,R,C)}function H(z){z.target.removeEventListener("dispose",H);for(const q in p){const R=p[q],C=z.target.uuid;C in R&&(R[C].dispose(),delete R[C])}}}const lM={[Zc]:Qc,[Jc]:nf,[ef]:rf,[js]:tf,[Qc]:Zc,[nf]:Jc,[rf]:ef,[tf]:js};function uM(s,e){function n(){let V=!1;const Ee=new Yt;let Ce=null;const Ue=new Yt(0,0,0,0);return{setMask:function(Se){Ce!==Se&&!V&&(s.colorMask(Se,Se,Se,Se),Ce=Se)},setLocked:function(Se){V=Se},setClear:function(Se,he,Xe,lt,wt){wt===!0&&(Se*=lt,he*=lt,Xe*=lt),Ee.set(Se,he,Xe,lt),Ue.equals(Ee)===!1&&(s.clearColor(Se,he,Xe,lt),Ue.copy(Ee))},reset:function(){V=!1,Ce=null,Ue.set(-1,0,0,0)}}}function r(){let V=!1,Ee=!1,Ce=null,Ue=null,Se=null;return{setReversed:function(he){if(Ee!==he){const Xe=e.get("EXT_clip_control");he?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),Ee=he;const lt=Se;Se=null,this.setClear(lt)}},getReversed:function(){return Ee},setTest:function(he){he?Z(s.DEPTH_TEST):_e(s.DEPTH_TEST)},setMask:function(he){Ce!==he&&!V&&(s.depthMask(he),Ce=he)},setFunc:function(he){if(Ee&&(he=lM[he]),Ue!==he){switch(he){case Zc:s.depthFunc(s.NEVER);break;case Qc:s.depthFunc(s.ALWAYS);break;case Jc:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case ef:s.depthFunc(s.EQUAL);break;case tf:s.depthFunc(s.GEQUAL);break;case nf:s.depthFunc(s.GREATER);break;case rf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ue=he}},setLocked:function(he){V=he},setClear:function(he){Se!==he&&(Ee&&(he=1-he),s.clearDepth(he),Se=he)},reset:function(){V=!1,Ce=null,Ue=null,Se=null,Ee=!1}}}function a(){let V=!1,Ee=null,Ce=null,Ue=null,Se=null,he=null,Xe=null,lt=null,wt=null;return{setTest:function(xt){V||(xt?Z(s.STENCIL_TEST):_e(s.STENCIL_TEST))},setMask:function(xt){Ee!==xt&&!V&&(s.stencilMask(xt),Ee=xt)},setFunc:function(xt,Wn,fn){(Ce!==xt||Ue!==Wn||Se!==fn)&&(s.stencilFunc(xt,Wn,fn),Ce=xt,Ue=Wn,Se=fn)},setOp:function(xt,Wn,fn){(he!==xt||Xe!==Wn||lt!==fn)&&(s.stencilOp(xt,Wn,fn),he=xt,Xe=Wn,lt=fn)},setLocked:function(xt){V=xt},setClear:function(xt){wt!==xt&&(s.clearStencil(xt),wt=xt)},reset:function(){V=!1,Ee=null,Ce=null,Ue=null,Se=null,he=null,Xe=null,lt=null,wt=null}}}const u=new n,f=new r,d=new a,m=new WeakMap,p=new WeakMap;let _={},v={},x=new WeakMap,S=[],w=null,A=!1,y=null,g=null,F=null,L=null,b=null,H=null,z=null,k=new Dt(0,0,0),q=0,R=!1,C=null,B=null,ne=null,X=null,j=null;const te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let le=!1,fe=0;const U=s.getParameter(s.VERSION);U.indexOf("WebGL")!==-1?(fe=parseFloat(/^WebGL (\d)/.exec(U)[1]),le=fe>=1):U.indexOf("OpenGL ES")!==-1&&(fe=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),le=fe>=2);let ue=null,ae={};const N=s.getParameter(s.SCISSOR_BOX),re=s.getParameter(s.VIEWPORT),xe=new Yt().fromArray(N),be=new Yt().fromArray(re);function pe(V,Ee,Ce,Ue){const Se=new Uint8Array(4),he=s.createTexture();s.bindTexture(V,he),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xe=0;Xe<Ce;Xe++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(Ee,0,s.RGBA,1,1,Ue,0,s.RGBA,s.UNSIGNED_BYTE,Se):s.texImage2D(Ee+Xe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Se);return he}const $={};$[s.TEXTURE_2D]=pe(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=pe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=pe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=pe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),u.setClear(0,0,0,1),f.setClear(1),d.setClear(0),Z(s.DEPTH_TEST),f.setFunc(js),nt(!1),Ge(Pp),Z(s.CULL_FACE),Rt(xr);function Z(V){_[V]!==!0&&(s.enable(V),_[V]=!0)}function _e(V){_[V]!==!1&&(s.disable(V),_[V]=!1)}function Ie(V,Ee){return v[V]!==Ee?(s.bindFramebuffer(V,Ee),v[V]=Ee,V===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=Ee),V===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=Ee),!0):!1}function ke(V,Ee){let Ce=S,Ue=!1;if(V){Ce=x.get(Ee),Ce===void 0&&(Ce=[],x.set(Ee,Ce));const Se=V.textures;if(Ce.length!==Se.length||Ce[0]!==s.COLOR_ATTACHMENT0){for(let he=0,Xe=Se.length;he<Xe;he++)Ce[he]=s.COLOR_ATTACHMENT0+he;Ce.length=Se.length,Ue=!0}}else Ce[0]!==s.BACK&&(Ce[0]=s.BACK,Ue=!0);Ue&&s.drawBuffers(Ce)}function pt(V){return w!==V?(s.useProgram(V),w=V,!0):!1}const $t={[Xr]:s.FUNC_ADD,[nv]:s.FUNC_SUBTRACT,[iv]:s.FUNC_REVERSE_SUBTRACT};$t[rv]=s.MIN,$t[sv]=s.MAX;const I={[ov]:s.ZERO,[av]:s.ONE,[lv]:s.SRC_COLOR,[Kc]:s.SRC_ALPHA,[pv]:s.SRC_ALPHA_SATURATE,[dv]:s.DST_COLOR,[cv]:s.DST_ALPHA,[uv]:s.ONE_MINUS_SRC_COLOR,[$c]:s.ONE_MINUS_SRC_ALPHA,[hv]:s.ONE_MINUS_DST_COLOR,[fv]:s.ONE_MINUS_DST_ALPHA,[mv]:s.CONSTANT_COLOR,[gv]:s.ONE_MINUS_CONSTANT_COLOR,[_v]:s.CONSTANT_ALPHA,[vv]:s.ONE_MINUS_CONSTANT_ALPHA};function Rt(V,Ee,Ce,Ue,Se,he,Xe,lt,wt,xt){if(V===xr){A===!0&&(_e(s.BLEND),A=!1);return}if(A===!1&&(Z(s.BLEND),A=!0),V!==tv){if(V!==y||xt!==R){if((g!==Xr||b!==Xr)&&(s.blendEquation(s.FUNC_ADD),g=Xr,b=Xr),xt)switch(V){case Ws:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Dp:s.blendFunc(s.ONE,s.ONE);break;case Lp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Np:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Ws:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Dp:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lp:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Np:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}F=null,L=null,H=null,z=null,k.set(0,0,0),q=0,y=V,R=xt}return}Se=Se||Ee,he=he||Ce,Xe=Xe||Ue,(Ee!==g||Se!==b)&&(s.blendEquationSeparate($t[Ee],$t[Se]),g=Ee,b=Se),(Ce!==F||Ue!==L||he!==H||Xe!==z)&&(s.blendFuncSeparate(I[Ce],I[Ue],I[he],I[Xe]),F=Ce,L=Ue,H=he,z=Xe),(lt.equals(k)===!1||wt!==q)&&(s.blendColor(lt.r,lt.g,lt.b,wt),k.copy(lt),q=wt),y=V,R=!1}function ut(V,Ee){V.side===ki?_e(s.CULL_FACE):Z(s.CULL_FACE);let Ce=V.side===Nn;Ee&&(Ce=!Ce),nt(Ce),V.blending===Ws&&V.transparent===!1?Rt(xr):Rt(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),u.setMask(V.colorWrite);const Ue=V.stencilWrite;d.setTest(Ue),Ue&&(d.setMask(V.stencilWriteMask),d.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),d.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),We(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Z(s.SAMPLE_ALPHA_TO_COVERAGE):_e(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(V){C!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),C=V)}function Ge(V){V!==Q_?(Z(s.CULL_FACE),V!==B&&(V===Pp?s.cullFace(s.BACK):V===J_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):_e(s.CULL_FACE),B=V}function Lt(V){V!==ne&&(le&&s.lineWidth(V),ne=V)}function We(V,Ee,Ce){V?(Z(s.POLYGON_OFFSET_FILL),(X!==Ee||j!==Ce)&&(s.polygonOffset(Ee,Ce),X=Ee,j=Ce)):_e(s.POLYGON_OFFSET_FILL)}function at(V){V?Z(s.SCISSOR_TEST):_e(s.SCISSOR_TEST)}function Ot(V){V===void 0&&(V=s.TEXTURE0+te-1),ue!==V&&(s.activeTexture(V),ue=V)}function kt(V,Ee,Ce){Ce===void 0&&(ue===null?Ce=s.TEXTURE0+te-1:Ce=ue);let Ue=ae[Ce];Ue===void 0&&(Ue={type:void 0,texture:void 0},ae[Ce]=Ue),(Ue.type!==V||Ue.texture!==Ee)&&(ue!==Ce&&(s.activeTexture(Ce),ue=Ce),s.bindTexture(V,Ee||$[V]),Ue.type=V,Ue.texture=Ee)}function P(){const V=ae[ue];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Q(){try{s.compressedTexImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{s.texSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ge(){try{s.texSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ce(){try{s.compressedTexSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ke(){try{s.compressedTexSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ae(){try{s.texStorage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Be(){try{s.texStorage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function $e(){try{s.texImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Te(){try{s.texImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ne(V){xe.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),xe.copy(V))}function it(V){be.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),be.copy(V))}function Ye(V,Ee){let Ce=p.get(Ee);Ce===void 0&&(Ce=new WeakMap,p.set(Ee,Ce));let Ue=Ce.get(V);Ue===void 0&&(Ue=s.getUniformBlockIndex(Ee,V.name),Ce.set(V,Ue))}function Pe(V,Ee){const Ue=p.get(Ee).get(V);m.get(Ee)!==Ue&&(s.uniformBlockBinding(Ee,Ue,V.__bindingPointIndex),m.set(Ee,Ue))}function ct(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),f.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),_={},ue=null,ae={},v={},x=new WeakMap,S=[],w=null,A=!1,y=null,g=null,F=null,L=null,b=null,H=null,z=null,k=new Dt(0,0,0),q=0,R=!1,C=null,B=null,ne=null,X=null,j=null,xe.set(0,0,s.canvas.width,s.canvas.height),be.set(0,0,s.canvas.width,s.canvas.height),u.reset(),f.reset(),d.reset()}return{buffers:{color:u,depth:f,stencil:d},enable:Z,disable:_e,bindFramebuffer:Ie,drawBuffers:ke,useProgram:pt,setBlending:Rt,setMaterial:ut,setFlipSided:nt,setCullFace:Ge,setLineWidth:Lt,setPolygonOffset:We,setScissorTest:at,activeTexture:Ot,bindTexture:kt,unbindTexture:P,compressedTexImage2D:M,compressedTexImage3D:Q,texImage2D:$e,texImage3D:Te,updateUBOMapping:Ye,uniformBlockBinding:Pe,texStorage2D:Ae,texStorage3D:Be,texSubImage2D:de,texSubImage3D:ge,compressedTexSubImage2D:ce,compressedTexSubImage3D:Ke,scissor:Ne,viewport:it,reset:ct}}function cM(s,e,n,r,a,u,f){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ht,_=new WeakMap;let v;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(P,M){return S?new OffscreenCanvas(P,M):Ll("canvas")}function A(P,M,Q){let de=1;const ge=kt(P);if((ge.width>Q||ge.height>Q)&&(de=Q/Math.max(ge.width,ge.height)),de<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ce=Math.floor(de*ge.width),Ke=Math.floor(de*ge.height);v===void 0&&(v=w(ce,Ke));const Ae=M?w(ce,Ke):v;return Ae.width=ce,Ae.height=Ke,Ae.getContext("2d").drawImage(P,0,0,ce,Ke),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+ce+"x"+Ke+")."),Ae}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),P;return P}function y(P){return P.generateMipmaps}function g(P){s.generateMipmap(P)}function F(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function L(P,M,Q,de,ge=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ce=M;if(M===s.RED&&(Q===s.FLOAT&&(ce=s.R32F),Q===s.HALF_FLOAT&&(ce=s.R16F),Q===s.UNSIGNED_BYTE&&(ce=s.R8)),M===s.RED_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ce=s.R8UI),Q===s.UNSIGNED_SHORT&&(ce=s.R16UI),Q===s.UNSIGNED_INT&&(ce=s.R32UI),Q===s.BYTE&&(ce=s.R8I),Q===s.SHORT&&(ce=s.R16I),Q===s.INT&&(ce=s.R32I)),M===s.RG&&(Q===s.FLOAT&&(ce=s.RG32F),Q===s.HALF_FLOAT&&(ce=s.RG16F),Q===s.UNSIGNED_BYTE&&(ce=s.RG8)),M===s.RG_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ce=s.RG8UI),Q===s.UNSIGNED_SHORT&&(ce=s.RG16UI),Q===s.UNSIGNED_INT&&(ce=s.RG32UI),Q===s.BYTE&&(ce=s.RG8I),Q===s.SHORT&&(ce=s.RG16I),Q===s.INT&&(ce=s.RG32I)),M===s.RGB_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ce=s.RGB8UI),Q===s.UNSIGNED_SHORT&&(ce=s.RGB16UI),Q===s.UNSIGNED_INT&&(ce=s.RGB32UI),Q===s.BYTE&&(ce=s.RGB8I),Q===s.SHORT&&(ce=s.RGB16I),Q===s.INT&&(ce=s.RGB32I)),M===s.RGBA_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ce=s.RGBA8UI),Q===s.UNSIGNED_SHORT&&(ce=s.RGBA16UI),Q===s.UNSIGNED_INT&&(ce=s.RGBA32UI),Q===s.BYTE&&(ce=s.RGBA8I),Q===s.SHORT&&(ce=s.RGBA16I),Q===s.INT&&(ce=s.RGBA32I)),M===s.RGB&&(Q===s.UNSIGNED_INT_5_9_9_9_REV&&(ce=s.RGB9_E5),Q===s.UNSIGNED_INT_10F_11F_11F_REV&&(ce=s.R11F_G11F_B10F)),M===s.RGBA){const Ke=ge?Pl:Mt.getTransfer(de);Q===s.FLOAT&&(ce=s.RGBA32F),Q===s.HALF_FLOAT&&(ce=s.RGBA16F),Q===s.UNSIGNED_BYTE&&(ce=Ke===bt?s.SRGB8_ALPHA8:s.RGBA8),Q===s.UNSIGNED_SHORT_4_4_4_4&&(ce=s.RGBA4),Q===s.UNSIGNED_SHORT_5_5_5_1&&(ce=s.RGB5_A1)}return(ce===s.R16F||ce===s.R32F||ce===s.RG16F||ce===s.RG32F||ce===s.RGBA16F||ce===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function b(P,M){let Q;return P?M===null||M===Zr||M===Ho?Q=s.DEPTH24_STENCIL8:M===zi?Q=s.DEPTH32F_STENCIL8:M===Bo&&(Q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Zr||M===Ho?Q=s.DEPTH_COMPONENT24:M===zi?Q=s.DEPTH_COMPONENT32F:M===Bo&&(Q=s.DEPTH_COMPONENT16),Q}function H(P,M){return y(P)===!0||P.isFramebufferTexture&&P.minFilter!==fi&&P.minFilter!==xi?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function z(P){const M=P.target;M.removeEventListener("dispose",z),q(M),M.isVideoTexture&&_.delete(M)}function k(P){const M=P.target;M.removeEventListener("dispose",k),C(M)}function q(P){const M=r.get(P);if(M.__webglInit===void 0)return;const Q=P.source,de=x.get(Q);if(de){const ge=de[M.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&R(P),Object.keys(de).length===0&&x.delete(Q)}r.remove(P)}function R(P){const M=r.get(P);s.deleteTexture(M.__webglTexture);const Q=P.source,de=x.get(Q);delete de[M.__cacheKey],f.memory.textures--}function C(P){const M=r.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),r.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let de=0;de<6;de++){if(Array.isArray(M.__webglFramebuffer[de]))for(let ge=0;ge<M.__webglFramebuffer[de].length;ge++)s.deleteFramebuffer(M.__webglFramebuffer[de][ge]);else s.deleteFramebuffer(M.__webglFramebuffer[de]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[de])}else{if(Array.isArray(M.__webglFramebuffer))for(let de=0;de<M.__webglFramebuffer.length;de++)s.deleteFramebuffer(M.__webglFramebuffer[de]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let de=0;de<M.__webglColorRenderbuffer.length;de++)M.__webglColorRenderbuffer[de]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[de]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const Q=P.textures;for(let de=0,ge=Q.length;de<ge;de++){const ce=r.get(Q[de]);ce.__webglTexture&&(s.deleteTexture(ce.__webglTexture),f.memory.textures--),r.remove(Q[de])}r.remove(P)}let B=0;function ne(){B=0}function X(){const P=B;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),B+=1,P}function j(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function te(P,M){const Q=r.get(P);if(P.isVideoTexture&&at(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&Q.__version!==P.version){const de=P.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(Q,P,M);return}}else P.isExternalTexture&&(Q.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(s.TEXTURE_2D,Q.__webglTexture,s.TEXTURE0+M)}function le(P,M){const Q=r.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){$(Q,P,M);return}n.bindTexture(s.TEXTURE_2D_ARRAY,Q.__webglTexture,s.TEXTURE0+M)}function fe(P,M){const Q=r.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){$(Q,P,M);return}n.bindTexture(s.TEXTURE_3D,Q.__webglTexture,s.TEXTURE0+M)}function U(P,M){const Q=r.get(P);if(P.version>0&&Q.__version!==P.version){Z(Q,P,M);return}n.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture,s.TEXTURE0+M)}const ue={[af]:s.REPEAT,[Yr]:s.CLAMP_TO_EDGE,[lf]:s.MIRRORED_REPEAT},ae={[fi]:s.NEAREST,[Cv]:s.NEAREST_MIPMAP_NEAREST,[nl]:s.NEAREST_MIPMAP_LINEAR,[xi]:s.LINEAR,[xc]:s.LINEAR_MIPMAP_NEAREST,[qr]:s.LINEAR_MIPMAP_LINEAR},N={[Nv]:s.NEVER,[zv]:s.ALWAYS,[Iv]:s.LESS,[Gm]:s.LEQUAL,[Uv]:s.EQUAL,[kv]:s.GEQUAL,[Fv]:s.GREATER,[Ov]:s.NOTEQUAL};function re(P,M){if(M.type===zi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===xi||M.magFilter===xc||M.magFilter===nl||M.magFilter===qr||M.minFilter===xi||M.minFilter===xc||M.minFilter===nl||M.minFilter===qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ue[M.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ue[M.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ue[M.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,ae[M.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,ae[M.minFilter]),M.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,N[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===fi||M.minFilter!==nl&&M.minFilter!==qr||M.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||r.get(M).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy}}}function xe(P,M){let Q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",z));const de=M.source;let ge=x.get(de);ge===void 0&&(ge={},x.set(de,ge));const ce=j(M);if(ce!==P.__cacheKey){ge[ce]===void 0&&(ge[ce]={texture:s.createTexture(),usedTimes:0},f.memory.textures++,Q=!0),ge[ce].usedTimes++;const Ke=ge[P.__cacheKey];Ke!==void 0&&(ge[P.__cacheKey].usedTimes--,Ke.usedTimes===0&&R(M)),P.__cacheKey=ce,P.__webglTexture=ge[ce].texture}return Q}function be(P,M,Q){return Math.floor(Math.floor(P/Q)/M)}function pe(P,M,Q,de){const ce=P.updateRanges;if(ce.length===0)n.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,Q,de,M.data);else{ce.sort((Te,Ne)=>Te.start-Ne.start);let Ke=0;for(let Te=1;Te<ce.length;Te++){const Ne=ce[Ke],it=ce[Te],Ye=Ne.start+Ne.count,Pe=be(it.start,M.width,4),ct=be(Ne.start,M.width,4);it.start<=Ye+1&&Pe===ct&&be(it.start+it.count-1,M.width,4)===Pe?Ne.count=Math.max(Ne.count,it.start+it.count-Ne.start):(++Ke,ce[Ke]=it)}ce.length=Ke+1;const Ae=s.getParameter(s.UNPACK_ROW_LENGTH),Be=s.getParameter(s.UNPACK_SKIP_PIXELS),$e=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Te=0,Ne=ce.length;Te<Ne;Te++){const it=ce[Te],Ye=Math.floor(it.start/4),Pe=Math.ceil(it.count/4),ct=Ye%M.width,V=Math.floor(Ye/M.width),Ee=Pe,Ce=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ct),s.pixelStorei(s.UNPACK_SKIP_ROWS,V),n.texSubImage2D(s.TEXTURE_2D,0,ct,V,Ee,Ce,Q,de,M.data)}P.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,Ae),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Be),s.pixelStorei(s.UNPACK_SKIP_ROWS,$e)}}function $(P,M,Q){let de=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(de=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(de=s.TEXTURE_3D);const ge=xe(P,M),ce=M.source;n.bindTexture(de,P.__webglTexture,s.TEXTURE0+Q);const Ke=r.get(ce);if(ce.version!==Ke.__version||ge===!0){n.activeTexture(s.TEXTURE0+Q);const Ae=Mt.getPrimaries(Mt.workingColorSpace),Be=M.colorSpace===_r?null:Mt.getPrimaries(M.colorSpace),$e=M.colorSpace===_r||Ae===Be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let Te=A(M.image,!1,a.maxTextureSize);Te=Ot(M,Te);const Ne=u.convert(M.format,M.colorSpace),it=u.convert(M.type);let Ye=L(M.internalFormat,Ne,it,M.colorSpace,M.isVideoTexture);re(de,M);let Pe;const ct=M.mipmaps,V=M.isVideoTexture!==!0,Ee=Ke.__version===void 0||ge===!0,Ce=ce.dataReady,Ue=H(M,Te);if(M.isDepthTexture)Ye=b(M.format===Go,M.type),Ee&&(V?n.texStorage2D(s.TEXTURE_2D,1,Ye,Te.width,Te.height):n.texImage2D(s.TEXTURE_2D,0,Ye,Te.width,Te.height,0,Ne,it,null));else if(M.isDataTexture)if(ct.length>0){V&&Ee&&n.texStorage2D(s.TEXTURE_2D,Ue,Ye,ct[0].width,ct[0].height);for(let Se=0,he=ct.length;Se<he;Se++)Pe=ct[Se],V?Ce&&n.texSubImage2D(s.TEXTURE_2D,Se,0,0,Pe.width,Pe.height,Ne,it,Pe.data):n.texImage2D(s.TEXTURE_2D,Se,Ye,Pe.width,Pe.height,0,Ne,it,Pe.data);M.generateMipmaps=!1}else V?(Ee&&n.texStorage2D(s.TEXTURE_2D,Ue,Ye,Te.width,Te.height),Ce&&pe(M,Te,Ne,it)):n.texImage2D(s.TEXTURE_2D,0,Ye,Te.width,Te.height,0,Ne,it,Te.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){V&&Ee&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,Ye,ct[0].width,ct[0].height,Te.depth);for(let Se=0,he=ct.length;Se<he;Se++)if(Pe=ct[Se],M.format!==ci)if(Ne!==null)if(V){if(Ce)if(M.layerUpdates.size>0){const Xe=tm(Pe.width,Pe.height,M.format,M.type);for(const lt of M.layerUpdates){const wt=Pe.data.subarray(lt*Xe/Pe.data.BYTES_PER_ELEMENT,(lt+1)*Xe/Pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Se,0,0,lt,Pe.width,Pe.height,1,Ne,wt)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Se,0,0,0,Pe.width,Pe.height,Te.depth,Ne,Pe.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Se,Ye,Pe.width,Pe.height,Te.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else V?Ce&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,Se,0,0,0,Pe.width,Pe.height,Te.depth,Ne,it,Pe.data):n.texImage3D(s.TEXTURE_2D_ARRAY,Se,Ye,Pe.width,Pe.height,Te.depth,0,Ne,it,Pe.data)}else{V&&Ee&&n.texStorage2D(s.TEXTURE_2D,Ue,Ye,ct[0].width,ct[0].height);for(let Se=0,he=ct.length;Se<he;Se++)Pe=ct[Se],M.format!==ci?Ne!==null?V?Ce&&n.compressedTexSubImage2D(s.TEXTURE_2D,Se,0,0,Pe.width,Pe.height,Ne,Pe.data):n.compressedTexImage2D(s.TEXTURE_2D,Se,Ye,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):V?Ce&&n.texSubImage2D(s.TEXTURE_2D,Se,0,0,Pe.width,Pe.height,Ne,it,Pe.data):n.texImage2D(s.TEXTURE_2D,Se,Ye,Pe.width,Pe.height,0,Ne,it,Pe.data)}else if(M.isDataArrayTexture)if(V){if(Ee&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,Ye,Te.width,Te.height,Te.depth),Ce)if(M.layerUpdates.size>0){const Se=tm(Te.width,Te.height,M.format,M.type);for(const he of M.layerUpdates){const Xe=Te.data.subarray(he*Se/Te.data.BYTES_PER_ELEMENT,(he+1)*Se/Te.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,Te.width,Te.height,1,Ne,it,Xe)}M.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Te.width,Te.height,Te.depth,Ne,it,Te.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,Ye,Te.width,Te.height,Te.depth,0,Ne,it,Te.data);else if(M.isData3DTexture)V?(Ee&&n.texStorage3D(s.TEXTURE_3D,Ue,Ye,Te.width,Te.height,Te.depth),Ce&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Te.width,Te.height,Te.depth,Ne,it,Te.data)):n.texImage3D(s.TEXTURE_3D,0,Ye,Te.width,Te.height,Te.depth,0,Ne,it,Te.data);else if(M.isFramebufferTexture){if(Ee)if(V)n.texStorage2D(s.TEXTURE_2D,Ue,Ye,Te.width,Te.height);else{let Se=Te.width,he=Te.height;for(let Xe=0;Xe<Ue;Xe++)n.texImage2D(s.TEXTURE_2D,Xe,Ye,Se,he,0,Ne,it,null),Se>>=1,he>>=1}}else if(ct.length>0){if(V&&Ee){const Se=kt(ct[0]);n.texStorage2D(s.TEXTURE_2D,Ue,Ye,Se.width,Se.height)}for(let Se=0,he=ct.length;Se<he;Se++)Pe=ct[Se],V?Ce&&n.texSubImage2D(s.TEXTURE_2D,Se,0,0,Ne,it,Pe):n.texImage2D(s.TEXTURE_2D,Se,Ye,Ne,it,Pe);M.generateMipmaps=!1}else if(V){if(Ee){const Se=kt(Te);n.texStorage2D(s.TEXTURE_2D,Ue,Ye,Se.width,Se.height)}Ce&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,Ne,it,Te)}else n.texImage2D(s.TEXTURE_2D,0,Ye,Ne,it,Te);y(M)&&g(de),Ke.__version=ce.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Z(P,M,Q){if(M.image.length!==6)return;const de=xe(P,M),ge=M.source;n.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+Q);const ce=r.get(ge);if(ge.version!==ce.__version||de===!0){n.activeTexture(s.TEXTURE0+Q);const Ke=Mt.getPrimaries(Mt.workingColorSpace),Ae=M.colorSpace===_r?null:Mt.getPrimaries(M.colorSpace),Be=M.colorSpace===_r||Ke===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const $e=M.isCompressedTexture||M.image[0].isCompressedTexture,Te=M.image[0]&&M.image[0].isDataTexture,Ne=[];for(let he=0;he<6;he++)!$e&&!Te?Ne[he]=A(M.image[he],!0,a.maxCubemapSize):Ne[he]=Te?M.image[he].image:M.image[he],Ne[he]=Ot(M,Ne[he]);const it=Ne[0],Ye=u.convert(M.format,M.colorSpace),Pe=u.convert(M.type),ct=L(M.internalFormat,Ye,Pe,M.colorSpace),V=M.isVideoTexture!==!0,Ee=ce.__version===void 0||de===!0,Ce=ge.dataReady;let Ue=H(M,it);re(s.TEXTURE_CUBE_MAP,M);let Se;if($e){V&&Ee&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,ct,it.width,it.height);for(let he=0;he<6;he++){Se=Ne[he].mipmaps;for(let Xe=0;Xe<Se.length;Xe++){const lt=Se[Xe];M.format!==ci?Ye!==null?V?Ce&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,0,0,lt.width,lt.height,Ye,lt.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,ct,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?Ce&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,0,0,lt.width,lt.height,Ye,Pe,lt.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,ct,lt.width,lt.height,0,Ye,Pe,lt.data)}}}else{if(Se=M.mipmaps,V&&Ee){Se.length>0&&Ue++;const he=kt(Ne[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,ct,he.width,he.height)}for(let he=0;he<6;he++)if(Te){V?Ce&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ne[he].width,Ne[he].height,Ye,Pe,Ne[he].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ct,Ne[he].width,Ne[he].height,0,Ye,Pe,Ne[he].data);for(let Xe=0;Xe<Se.length;Xe++){const wt=Se[Xe].image[he].image;V?Ce&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,0,0,wt.width,wt.height,Ye,Pe,wt.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,ct,wt.width,wt.height,0,Ye,Pe,wt.data)}}else{V?Ce&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ye,Pe,Ne[he]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ct,Ye,Pe,Ne[he]);for(let Xe=0;Xe<Se.length;Xe++){const lt=Se[Xe];V?Ce&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,0,0,Ye,Pe,lt.image[he]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,ct,Ye,Pe,lt.image[he])}}}y(M)&&g(s.TEXTURE_CUBE_MAP),ce.__version=ge.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function _e(P,M,Q,de,ge,ce){const Ke=u.convert(Q.format,Q.colorSpace),Ae=u.convert(Q.type),Be=L(Q.internalFormat,Ke,Ae,Q.colorSpace),$e=r.get(M),Te=r.get(Q);if(Te.__renderTarget=M,!$e.__hasExternalTextures){const Ne=Math.max(1,M.width>>ce),it=Math.max(1,M.height>>ce);ge===s.TEXTURE_3D||ge===s.TEXTURE_2D_ARRAY?n.texImage3D(ge,ce,Be,Ne,it,M.depth,0,Ke,Ae,null):n.texImage2D(ge,ce,Be,Ne,it,0,Ke,Ae,null)}n.bindFramebuffer(s.FRAMEBUFFER,P),We(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,de,ge,Te.__webglTexture,0,Lt(M)):(ge===s.TEXTURE_2D||ge>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,de,ge,Te.__webglTexture,ce),n.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(P,M,Q){if(s.bindRenderbuffer(s.RENDERBUFFER,P),M.depthBuffer){const de=M.depthTexture,ge=de&&de.isDepthTexture?de.type:null,ce=b(M.stencilBuffer,ge),Ke=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ae=Lt(M);We(M)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ae,ce,M.width,M.height):Q?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,ce,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ce,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ke,s.RENDERBUFFER,P)}else{const de=M.textures;for(let ge=0;ge<de.length;ge++){const ce=de[ge],Ke=u.convert(ce.format,ce.colorSpace),Ae=u.convert(ce.type),Be=L(ce.internalFormat,Ke,Ae,ce.colorSpace),$e=Lt(M);Q&&We(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$e,Be,M.width,M.height):We(M)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$e,Be,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Be,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ke(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const de=r.get(M.depthTexture);de.__renderTarget=M,(!de.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),te(M.depthTexture,0);const ge=de.__webglTexture,ce=Lt(M);if(M.depthTexture.format===Vo)We(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0);else if(M.depthTexture.format===Go)We(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0);else throw new Error("Unknown depthTexture format")}function pt(P){const M=r.get(P),Q=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const de=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),de){const ge=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,de.removeEventListener("dispose",ge)};de.addEventListener("dispose",ge),M.__depthDisposeCallback=ge}M.__boundDepthTexture=de}if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");const de=P.texture.mipmaps;de&&de.length>0?ke(M.__webglFramebuffer[0],P):ke(M.__webglFramebuffer,P)}else if(Q){M.__webglDepthbuffer=[];for(let de=0;de<6;de++)if(n.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[de]),M.__webglDepthbuffer[de]===void 0)M.__webglDepthbuffer[de]=s.createRenderbuffer(),Ie(M.__webglDepthbuffer[de],P,!1);else{const ge=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer[de];s.bindRenderbuffer(s.RENDERBUFFER,ce),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,ce)}}else{const de=P.texture.mipmaps;if(de&&de.length>0?n.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Ie(M.__webglDepthbuffer,P,!1);else{const ge=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ce),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,ce)}}n.bindFramebuffer(s.FRAMEBUFFER,null)}function $t(P,M,Q){const de=r.get(P);M!==void 0&&_e(de.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Q!==void 0&&pt(P)}function I(P){const M=P.texture,Q=r.get(P),de=r.get(M);P.addEventListener("dispose",k);const ge=P.textures,ce=P.isWebGLCubeRenderTarget===!0,Ke=ge.length>1;if(Ke||(de.__webglTexture===void 0&&(de.__webglTexture=s.createTexture()),de.__version=M.version,f.memory.textures++),ce){Q.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer[Ae]=[];for(let Be=0;Be<M.mipmaps.length;Be++)Q.__webglFramebuffer[Ae][Be]=s.createFramebuffer()}else Q.__webglFramebuffer[Ae]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer=[];for(let Ae=0;Ae<M.mipmaps.length;Ae++)Q.__webglFramebuffer[Ae]=s.createFramebuffer()}else Q.__webglFramebuffer=s.createFramebuffer();if(Ke)for(let Ae=0,Be=ge.length;Ae<Be;Ae++){const $e=r.get(ge[Ae]);$e.__webglTexture===void 0&&($e.__webglTexture=s.createTexture(),f.memory.textures++)}if(P.samples>0&&We(P)===!1){Q.__webglMultisampledFramebuffer=s.createFramebuffer(),Q.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let Ae=0;Ae<ge.length;Ae++){const Be=ge[Ae];Q.__webglColorRenderbuffer[Ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Q.__webglColorRenderbuffer[Ae]);const $e=u.convert(Be.format,Be.colorSpace),Te=u.convert(Be.type),Ne=L(Be.internalFormat,$e,Te,Be.colorSpace,P.isXRRenderTarget===!0),it=Lt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,it,Ne,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,Q.__webglColorRenderbuffer[Ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(Q.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(Q.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ce){n.bindTexture(s.TEXTURE_CUBE_MAP,de.__webglTexture),re(s.TEXTURE_CUBE_MAP,M);for(let Ae=0;Ae<6;Ae++)if(M.mipmaps&&M.mipmaps.length>0)for(let Be=0;Be<M.mipmaps.length;Be++)_e(Q.__webglFramebuffer[Ae][Be],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Be);else _e(Q.__webglFramebuffer[Ae],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);y(M)&&g(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ke){for(let Ae=0,Be=ge.length;Ae<Be;Ae++){const $e=ge[Ae],Te=r.get($e);let Ne=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ne=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Ne,Te.__webglTexture),re(Ne,$e),_e(Q.__webglFramebuffer,P,$e,s.COLOR_ATTACHMENT0+Ae,Ne,0),y($e)&&g(Ne)}n.unbindTexture()}else{let Ae=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ae=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Ae,de.__webglTexture),re(Ae,M),M.mipmaps&&M.mipmaps.length>0)for(let Be=0;Be<M.mipmaps.length;Be++)_e(Q.__webglFramebuffer[Be],P,M,s.COLOR_ATTACHMENT0,Ae,Be);else _e(Q.__webglFramebuffer,P,M,s.COLOR_ATTACHMENT0,Ae,0);y(M)&&g(Ae),n.unbindTexture()}P.depthBuffer&&pt(P)}function Rt(P){const M=P.textures;for(let Q=0,de=M.length;Q<de;Q++){const ge=M[Q];if(y(ge)){const ce=F(P),Ke=r.get(ge).__webglTexture;n.bindTexture(ce,Ke),g(ce),n.unbindTexture()}}}const ut=[],nt=[];function Ge(P){if(P.samples>0){if(We(P)===!1){const M=P.textures,Q=P.width,de=P.height;let ge=s.COLOR_BUFFER_BIT;const ce=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ke=r.get(P),Ae=M.length>1;if(Ae)for(let $e=0;$e<M.length;$e++)n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer);const Be=P.texture.mipmaps;Be&&Be.length>0?n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer[0]):n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer);for(let $e=0;$e<M.length;$e++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ge|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ge|=s.STENCIL_BUFFER_BIT)),Ae){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[$e]);const Te=r.get(M[$e]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Te,0)}s.blitFramebuffer(0,0,Q,de,0,0,Q,de,ge,s.NEAREST),m===!0&&(ut.length=0,nt.length=0,ut.push(s.COLOR_ATTACHMENT0+$e),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ut.push(ce),nt.push(ce),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,nt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ut))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ae)for(let $e=0;$e<M.length;$e++){n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[$e]);const Te=r.get(M[$e]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.TEXTURE_2D,Te,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&m){const M=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Lt(P){return Math.min(a.maxSamples,P.samples)}function We(P){const M=r.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function at(P){const M=f.render.frame;_.get(P)!==M&&(_.set(P,M),P.update())}function Ot(P,M){const Q=P.colorSpace,de=P.format,ge=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Q!==Ks&&Q!==_r&&(Mt.getTransfer(Q)===bt?(de!==ci||ge!==Hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),M}function kt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(p.width=P.naturalWidth||P.width,p.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(p.width=P.displayWidth,p.height=P.displayHeight):(p.width=P.width,p.height=P.height),p}this.allocateTextureUnit=X,this.resetTextureUnits=ne,this.setTexture2D=te,this.setTexture2DArray=le,this.setTexture3D=fe,this.setTextureCube=U,this.rebindTextures=$t,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=We}function fM(s,e){function n(r,a=_r){let u;const f=Mt.getTransfer(a);if(r===Hi)return s.UNSIGNED_BYTE;if(r===Gf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Wf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Om)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===km)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===Um)return s.BYTE;if(r===Fm)return s.SHORT;if(r===Bo)return s.UNSIGNED_SHORT;if(r===Vf)return s.INT;if(r===Zr)return s.UNSIGNED_INT;if(r===zi)return s.FLOAT;if(r===jo)return s.HALF_FLOAT;if(r===zm)return s.ALPHA;if(r===Bm)return s.RGB;if(r===ci)return s.RGBA;if(r===Vo)return s.DEPTH_COMPONENT;if(r===Go)return s.DEPTH_STENCIL;if(r===Hm)return s.RED;if(r===Xf)return s.RED_INTEGER;if(r===Vm)return s.RG;if(r===jf)return s.RG_INTEGER;if(r===Yf)return s.RGBA_INTEGER;if(r===wl||r===Al||r===Rl||r===Cl)if(f===bt)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===wl)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Al)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Rl)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Cl)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===wl)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Al)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Rl)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Cl)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===uf||r===cf||r===ff||r===df)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===uf)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===cf)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ff)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===df)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===hf||r===pf||r===mf)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(r===hf||r===pf)return f===bt?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===mf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===gf||r===_f||r===vf||r===xf||r===yf||r===Sf||r===Ef||r===Mf||r===Tf||r===wf||r===Af||r===Rf||r===Cf||r===bf)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(r===gf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===_f)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===vf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===xf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===yf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Sf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ef)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Mf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Tf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===wf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Af)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Rf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Cf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===bf)return f===bt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Pf||r===Df||r===Lf)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(r===Pf)return f===bt?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Df)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Lf)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Nf||r===If||r===Uf||r===Ff)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(r===Nf)return u.COMPRESSED_RED_RGTC1_EXT;if(r===If)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Uf)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ff)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ho?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}const dM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hM=`
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

}`;class pM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const r=new ig(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Gi({vertexShader:dM,fragmentShader:hM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Si(new Ul(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mM extends es{constructor(e,n){super();const r=this;let a=null,u=1,f=null,d="local-floor",m=1,p=null,_=null,v=null,x=null,S=null,w=null;const A=typeof XRWebGLBinding<"u",y=new pM,g={},F=n.getContextAttributes();let L=null,b=null;const H=[],z=[],k=new ht;let q=null;const R=new Qn;R.viewport=new Yt;const C=new Qn;C.viewport=new Yt;const B=[R,C],ne=new U0;let X=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Z=H[$];return Z===void 0&&(Z=new Bc,H[$]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function($){let Z=H[$];return Z===void 0&&(Z=new Bc,H[$]=Z),Z.getGripSpace()},this.getHand=function($){let Z=H[$];return Z===void 0&&(Z=new Bc,H[$]=Z),Z.getHandSpace()};function te($){const Z=z.indexOf($.inputSource);if(Z===-1)return;const _e=H[Z];_e!==void 0&&(_e.update($.inputSource,$.frame,p||f),_e.dispatchEvent({type:$.type,data:$.inputSource}))}function le(){a.removeEventListener("select",te),a.removeEventListener("selectstart",te),a.removeEventListener("selectend",te),a.removeEventListener("squeeze",te),a.removeEventListener("squeezestart",te),a.removeEventListener("squeezeend",te),a.removeEventListener("end",le),a.removeEventListener("inputsourceschange",fe);for(let $=0;$<H.length;$++){const Z=z[$];Z!==null&&(z[$]=null,H[$].disconnect(Z))}X=null,j=null,y.reset();for(const $ in g)delete g[$];e.setRenderTarget(L),S=null,x=null,v=null,a=null,b=null,pe.stop(),r.isPresenting=!1,e.setPixelRatio(q),e.setSize(k.width,k.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){u=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){d=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function($){p=$},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return v===null&&A&&(v=new XRWebGLBinding(a,n)),v},this.getFrame=function(){return w},this.getSession=function(){return a},this.setSession=async function($){if(a=$,a!==null){if(L=e.getRenderTarget(),a.addEventListener("select",te),a.addEventListener("selectstart",te),a.addEventListener("selectend",te),a.addEventListener("squeeze",te),a.addEventListener("squeezestart",te),a.addEventListener("squeezeend",te),a.addEventListener("end",le),a.addEventListener("inputsourceschange",fe),F.xrCompatible!==!0&&await n.makeXRCompatible(),q=e.getPixelRatio(),e.getSize(k),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Ie=null,ke=null;F.depth&&(ke=F.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,_e=F.stencil?Go:Vo,Ie=F.stencil?Ho:Zr);const pt={colorFormat:n.RGBA8,depthFormat:ke,scaleFactor:u};v=this.getBinding(),x=v.createProjectionLayer(pt),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),b=new Jr(x.textureWidth,x.textureHeight,{format:ci,type:Hi,depthTexture:new ng(x.textureWidth,x.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:F.stencil,colorSpace:e.outputColorSpace,samples:F.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const _e={antialias:F.antialias,alpha:!0,depth:F.depth,stencil:F.stencil,framebufferScaleFactor:u};S=new XRWebGLLayer(a,n,_e),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),b=new Jr(S.framebufferWidth,S.framebufferHeight,{format:ci,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:F.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await a.requestReferenceSpace(d),pe.setContext(a),pe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function fe($){for(let Z=0;Z<$.removed.length;Z++){const _e=$.removed[Z],Ie=z.indexOf(_e);Ie>=0&&(z[Ie]=null,H[Ie].disconnect(_e))}for(let Z=0;Z<$.added.length;Z++){const _e=$.added[Z];let Ie=z.indexOf(_e);if(Ie===-1){for(let pt=0;pt<H.length;pt++)if(pt>=z.length){z.push(_e),Ie=pt;break}else if(z[pt]===null){z[pt]=_e,Ie=pt;break}if(Ie===-1)break}const ke=H[Ie];ke&&ke.connect(_e)}}const U=new ee,ue=new ee;function ae($,Z,_e){U.setFromMatrixPosition(Z.matrixWorld),ue.setFromMatrixPosition(_e.matrixWorld);const Ie=U.distanceTo(ue),ke=Z.projectionMatrix.elements,pt=_e.projectionMatrix.elements,$t=ke[14]/(ke[10]-1),I=ke[14]/(ke[10]+1),Rt=(ke[9]+1)/ke[5],ut=(ke[9]-1)/ke[5],nt=(ke[8]-1)/ke[0],Ge=(pt[8]+1)/pt[0],Lt=$t*nt,We=$t*Ge,at=Ie/(-nt+Ge),Ot=at*-nt;if(Z.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ot),$.translateZ(at),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),ke[10]===-1)$.projectionMatrix.copy(Z.projectionMatrix),$.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const kt=$t+at,P=I+at,M=Lt-Ot,Q=We+(Ie-Ot),de=Rt*I/P*kt,ge=ut*I/P*kt;$.projectionMatrix.makePerspective(M,Q,de,ge,kt,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function N($,Z){Z===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Z.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(a===null)return;let Z=$.near,_e=$.far;y.texture!==null&&(y.depthNear>0&&(Z=y.depthNear),y.depthFar>0&&(_e=y.depthFar)),ne.near=C.near=R.near=Z,ne.far=C.far=R.far=_e,(X!==ne.near||j!==ne.far)&&(a.updateRenderState({depthNear:ne.near,depthFar:ne.far}),X=ne.near,j=ne.far),ne.layers.mask=$.layers.mask|6,R.layers.mask=ne.layers.mask&3,C.layers.mask=ne.layers.mask&5;const Ie=$.parent,ke=ne.cameras;N(ne,Ie);for(let pt=0;pt<ke.length;pt++)N(ke[pt],Ie);ke.length===2?ae(ne,R,C):ne.projectionMatrix.copy(R.projectionMatrix),re($,ne,Ie)};function re($,Z,_e){_e===null?$.matrix.copy(Z.matrixWorld):($.matrix.copy(_e.matrixWorld),$.matrix.invert(),$.matrix.multiply(Z.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Z.projectionMatrix),$.projectionMatrixInverse.copy(Z.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Wo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return ne},this.getFoveation=function(){if(!(x===null&&S===null))return m},this.setFoveation=function($){m=$,x!==null&&(x.fixedFoveation=$),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=$)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(ne)},this.getCameraTexture=function($){return g[$]};let xe=null;function be($,Z){if(_=Z.getViewerPose(p||f),w=Z,_!==null){const _e=_.views;S!==null&&(e.setRenderTargetFramebuffer(b,S.framebuffer),e.setRenderTarget(b));let Ie=!1;_e.length!==ne.cameras.length&&(ne.cameras.length=0,Ie=!0);for(let I=0;I<_e.length;I++){const Rt=_e[I];let ut=null;if(S!==null)ut=S.getViewport(Rt);else{const Ge=v.getViewSubImage(x,Rt);ut=Ge.viewport,I===0&&(e.setRenderTargetTextures(b,Ge.colorTexture,Ge.depthStencilTexture),e.setRenderTarget(b))}let nt=B[I];nt===void 0&&(nt=new Qn,nt.layers.enable(I),nt.viewport=new Yt,B[I]=nt),nt.matrix.fromArray(Rt.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(Rt.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(ut.x,ut.y,ut.width,ut.height),I===0&&(ne.matrix.copy(nt.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale)),Ie===!0&&ne.cameras.push(nt)}const ke=a.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&A){v=r.getBinding();const I=v.getDepthInformation(_e[0]);I&&I.isValid&&I.texture&&y.init(I,a.renderState)}if(ke&&ke.includes("camera-access")&&A){e.state.unbindTexture(),v=r.getBinding();for(let I=0;I<_e.length;I++){const Rt=_e[I].camera;if(Rt){let ut=g[Rt];ut||(ut=new ig,g[Rt]=ut);const nt=v.getCameraImage(Rt);ut.sourceTexture=nt}}}}for(let _e=0;_e<H.length;_e++){const Ie=z[_e],ke=H[_e];Ie!==null&&ke!==void 0&&ke.update(Ie,Z,p||f)}xe&&xe($,Z),Z.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:Z}),w=null}const pe=new rg;pe.setAnimationLoop(be),this.setAnimationLoop=function($){xe=$},this.dispose=function(){}}}const Gr=new Vi,gM=new tn;function _M(s,e){function n(y,g){y.matrixAutoUpdate===!0&&y.updateMatrix(),g.value.copy(y.matrix)}function r(y,g){g.color.getRGB(y.fogColor.value,Qm(s)),g.isFog?(y.fogNear.value=g.near,y.fogFar.value=g.far):g.isFogExp2&&(y.fogDensity.value=g.density)}function a(y,g,F,L,b){g.isMeshBasicMaterial||g.isMeshLambertMaterial?u(y,g):g.isMeshToonMaterial?(u(y,g),v(y,g)):g.isMeshPhongMaterial?(u(y,g),_(y,g)):g.isMeshStandardMaterial?(u(y,g),x(y,g),g.isMeshPhysicalMaterial&&S(y,g,b)):g.isMeshMatcapMaterial?(u(y,g),w(y,g)):g.isMeshDepthMaterial?u(y,g):g.isMeshDistanceMaterial?(u(y,g),A(y,g)):g.isMeshNormalMaterial?u(y,g):g.isLineBasicMaterial?(f(y,g),g.isLineDashedMaterial&&d(y,g)):g.isPointsMaterial?m(y,g,F,L):g.isSpriteMaterial?p(y,g):g.isShadowMaterial?(y.color.value.copy(g.color),y.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function u(y,g){y.opacity.value=g.opacity,g.color&&y.diffuse.value.copy(g.color),g.emissive&&y.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(y.map.value=g.map,n(g.map,y.mapTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,n(g.alphaMap,y.alphaMapTransform)),g.bumpMap&&(y.bumpMap.value=g.bumpMap,n(g.bumpMap,y.bumpMapTransform),y.bumpScale.value=g.bumpScale,g.side===Nn&&(y.bumpScale.value*=-1)),g.normalMap&&(y.normalMap.value=g.normalMap,n(g.normalMap,y.normalMapTransform),y.normalScale.value.copy(g.normalScale),g.side===Nn&&y.normalScale.value.negate()),g.displacementMap&&(y.displacementMap.value=g.displacementMap,n(g.displacementMap,y.displacementMapTransform),y.displacementScale.value=g.displacementScale,y.displacementBias.value=g.displacementBias),g.emissiveMap&&(y.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,y.emissiveMapTransform)),g.specularMap&&(y.specularMap.value=g.specularMap,n(g.specularMap,y.specularMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest);const F=e.get(g),L=F.envMap,b=F.envMapRotation;L&&(y.envMap.value=L,Gr.copy(b),Gr.x*=-1,Gr.y*=-1,Gr.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Gr.y*=-1,Gr.z*=-1),y.envMapRotation.value.setFromMatrix4(gM.makeRotationFromEuler(Gr)),y.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=g.reflectivity,y.ior.value=g.ior,y.refractionRatio.value=g.refractionRatio),g.lightMap&&(y.lightMap.value=g.lightMap,y.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,y.lightMapTransform)),g.aoMap&&(y.aoMap.value=g.aoMap,y.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,y.aoMapTransform))}function f(y,g){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,g.map&&(y.map.value=g.map,n(g.map,y.mapTransform))}function d(y,g){y.dashSize.value=g.dashSize,y.totalSize.value=g.dashSize+g.gapSize,y.scale.value=g.scale}function m(y,g,F,L){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,y.size.value=g.size*F,y.scale.value=L*.5,g.map&&(y.map.value=g.map,n(g.map,y.uvTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,n(g.alphaMap,y.alphaMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest)}function p(y,g){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,y.rotation.value=g.rotation,g.map&&(y.map.value=g.map,n(g.map,y.mapTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,n(g.alphaMap,y.alphaMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest)}function _(y,g){y.specular.value.copy(g.specular),y.shininess.value=Math.max(g.shininess,1e-4)}function v(y,g){g.gradientMap&&(y.gradientMap.value=g.gradientMap)}function x(y,g){y.metalness.value=g.metalness,g.metalnessMap&&(y.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,y.metalnessMapTransform)),y.roughness.value=g.roughness,g.roughnessMap&&(y.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,y.roughnessMapTransform)),g.envMap&&(y.envMapIntensity.value=g.envMapIntensity)}function S(y,g,F){y.ior.value=g.ior,g.sheen>0&&(y.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),y.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(y.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,y.sheenColorMapTransform)),g.sheenRoughnessMap&&(y.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,y.sheenRoughnessMapTransform))),g.clearcoat>0&&(y.clearcoat.value=g.clearcoat,y.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(y.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,y.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(y.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Nn&&y.clearcoatNormalScale.value.negate())),g.dispersion>0&&(y.dispersion.value=g.dispersion),g.iridescence>0&&(y.iridescence.value=g.iridescence,y.iridescenceIOR.value=g.iridescenceIOR,y.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(y.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,y.iridescenceMapTransform)),g.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),g.transmission>0&&(y.transmission.value=g.transmission,y.transmissionSamplerMap.value=F.texture,y.transmissionSamplerSize.value.set(F.width,F.height),g.transmissionMap&&(y.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,y.transmissionMapTransform)),y.thickness.value=g.thickness,g.thicknessMap&&(y.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=g.attenuationDistance,y.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(y.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(y.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=g.specularIntensity,y.specularColor.value.copy(g.specularColor),g.specularColorMap&&(y.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,y.specularColorMapTransform)),g.specularIntensityMap&&(y.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,y.specularIntensityMapTransform))}function w(y,g){g.matcap&&(y.matcap.value=g.matcap)}function A(y,g){const F=e.get(g).light;y.referencePosition.value.setFromMatrixPosition(F.matrixWorld),y.nearDistance.value=F.shadow.camera.near,y.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function vM(s,e,n,r){let a={},u={},f=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(F,L){const b=L.program;r.uniformBlockBinding(F,b)}function p(F,L){let b=a[F.id];b===void 0&&(w(F),b=_(F),a[F.id]=b,F.addEventListener("dispose",y));const H=L.program;r.updateUBOMapping(F,H);const z=e.render.frame;u[F.id]!==z&&(x(F),u[F.id]=z)}function _(F){const L=v();F.__bindingPointIndex=L;const b=s.createBuffer(),H=F.__size,z=F.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,H,z),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,L,b),b}function v(){for(let F=0;F<d;F++)if(f.indexOf(F)===-1)return f.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(F){const L=a[F.id],b=F.uniforms,H=F.__cache;s.bindBuffer(s.UNIFORM_BUFFER,L);for(let z=0,k=b.length;z<k;z++){const q=Array.isArray(b[z])?b[z]:[b[z]];for(let R=0,C=q.length;R<C;R++){const B=q[R];if(S(B,z,R,H)===!0){const ne=B.__offset,X=Array.isArray(B.value)?B.value:[B.value];let j=0;for(let te=0;te<X.length;te++){const le=X[te],fe=A(le);typeof le=="number"||typeof le=="boolean"?(B.__data[0]=le,s.bufferSubData(s.UNIFORM_BUFFER,ne+j,B.__data)):le.isMatrix3?(B.__data[0]=le.elements[0],B.__data[1]=le.elements[1],B.__data[2]=le.elements[2],B.__data[3]=0,B.__data[4]=le.elements[3],B.__data[5]=le.elements[4],B.__data[6]=le.elements[5],B.__data[7]=0,B.__data[8]=le.elements[6],B.__data[9]=le.elements[7],B.__data[10]=le.elements[8],B.__data[11]=0):(le.toArray(B.__data,j),j+=fe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ne,B.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(F,L,b,H){const z=F.value,k=L+"_"+b;if(H[k]===void 0)return typeof z=="number"||typeof z=="boolean"?H[k]=z:H[k]=z.clone(),!0;{const q=H[k];if(typeof z=="number"||typeof z=="boolean"){if(q!==z)return H[k]=z,!0}else if(q.equals(z)===!1)return q.copy(z),!0}return!1}function w(F){const L=F.uniforms;let b=0;const H=16;for(let k=0,q=L.length;k<q;k++){const R=Array.isArray(L[k])?L[k]:[L[k]];for(let C=0,B=R.length;C<B;C++){const ne=R[C],X=Array.isArray(ne.value)?ne.value:[ne.value];for(let j=0,te=X.length;j<te;j++){const le=X[j],fe=A(le),U=b%H,ue=U%fe.boundary,ae=U+ue;b+=ue,ae!==0&&H-ae<fe.storage&&(b+=H-ae),ne.__data=new Float32Array(fe.storage/Float32Array.BYTES_PER_ELEMENT),ne.__offset=b,b+=fe.storage}}}const z=b%H;return z>0&&(b+=H-z),F.__size=b,F.__cache={},this}function A(F){const L={boundary:0,storage:0};return typeof F=="number"||typeof F=="boolean"?(L.boundary=4,L.storage=4):F.isVector2?(L.boundary=8,L.storage=8):F.isVector3||F.isColor?(L.boundary=16,L.storage=12):F.isVector4?(L.boundary=16,L.storage=16):F.isMatrix3?(L.boundary=48,L.storage=48):F.isMatrix4?(L.boundary=64,L.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),L}function y(F){const L=F.target;L.removeEventListener("dispose",y);const b=f.indexOf(L.__bindingPointIndex);f.splice(b,1),s.deleteBuffer(a[L.id]),delete a[L.id],delete u[L.id]}function g(){for(const F in a)s.deleteBuffer(a[F]);f=[],a={},u={}}return{bind:m,update:p,dispose:g}}class xM{constructor(e={}){const{canvas:n=n0(),context:r=null,depth:a=!0,stencil:u=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=f;const w=new Uint32Array(4),A=new Int32Array(4);let y=null,g=null;const F=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let H=!1;this._outputColorSpace=Vn;let z=0,k=0,q=null,R=-1,C=null;const B=new Yt,ne=new Yt;let X=null;const j=new Dt(0);let te=0,le=n.width,fe=n.height,U=1,ue=null,ae=null;const N=new Yt(0,0,le,fe),re=new Yt(0,0,le,fe);let xe=!1;const be=new tg;let pe=!1,$=!1;const Z=new tn,_e=new ee,Ie=new Yt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function $t(){return q===null?U:1}let I=r;function Rt(T,Y){return n.getContext(T,Y)}try{const T={alpha:!0,depth:a,stencil:u,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Hf}`),n.addEventListener("webglcontextlost",Ce,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",Se,!1),I===null){const Y="webgl2";if(I=Rt(Y,T),I===null)throw Rt(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ut,nt,Ge,Lt,We,at,Ot,kt,P,M,Q,de,ge,ce,Ke,Ae,Be,$e,Te,Ne,it,Ye,Pe,ct;function V(){ut=new bS(I),ut.init(),Ye=new fM(I,ut),nt=new ES(I,ut,e,Ye),Ge=new uM(I,ut),nt.reversedDepthBuffer&&x&&Ge.buffers.depth.setReversed(!0),Lt=new LS(I),We=new $E,at=new cM(I,ut,Ge,We,nt,Ye,Lt),Ot=new TS(b),kt=new CS(b),P=new k0(I),Pe=new yS(I,P),M=new PS(I,P,Lt,Pe),Q=new IS(I,M,P,Lt),Te=new NS(I,nt,at),Ae=new MS(We),de=new KE(b,Ot,kt,ut,nt,Pe,Ae),ge=new _M(b,We),ce=new QE,Ke=new rM(ut),$e=new xS(b,Ot,kt,Ge,Q,S,m),Be=new aM(b,Q,nt),ct=new vM(I,Lt,nt,Ge),Ne=new SS(I,ut,Lt),it=new DS(I,ut,Lt),Lt.programs=de.programs,b.capabilities=nt,b.extensions=ut,b.properties=We,b.renderLists=ce,b.shadowMap=Be,b.state=Ge,b.info=Lt}V();const Ee=new mM(b,I);this.xr=Ee,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=ut.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ut.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(T){T!==void 0&&(U=T,this.setSize(le,fe,!1))},this.getSize=function(T){return T.set(le,fe)},this.setSize=function(T,Y,se=!0){if(Ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}le=T,fe=Y,n.width=Math.floor(T*U),n.height=Math.floor(Y*U),se===!0&&(n.style.width=T+"px",n.style.height=Y+"px"),this.setViewport(0,0,T,Y)},this.getDrawingBufferSize=function(T){return T.set(le*U,fe*U).floor()},this.setDrawingBufferSize=function(T,Y,se){le=T,fe=Y,U=se,n.width=Math.floor(T*se),n.height=Math.floor(Y*se),this.setViewport(0,0,T,Y)},this.getCurrentViewport=function(T){return T.copy(B)},this.getViewport=function(T){return T.copy(N)},this.setViewport=function(T,Y,se,oe){T.isVector4?N.set(T.x,T.y,T.z,T.w):N.set(T,Y,se,oe),Ge.viewport(B.copy(N).multiplyScalar(U).round())},this.getScissor=function(T){return T.copy(re)},this.setScissor=function(T,Y,se,oe){T.isVector4?re.set(T.x,T.y,T.z,T.w):re.set(T,Y,se,oe),Ge.scissor(ne.copy(re).multiplyScalar(U).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(T){Ge.setScissorTest(xe=T)},this.setOpaqueSort=function(T){ue=T},this.setTransparentSort=function(T){ae=T},this.getClearColor=function(T){return T.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(T=!0,Y=!0,se=!0){let oe=0;if(T){let W=!1;if(q!==null){const Me=q.texture.format;W=Me===Yf||Me===jf||Me===Xf}if(W){const Me=q.texture.type,De=Me===Hi||Me===Zr||Me===Bo||Me===Ho||Me===Gf||Me===Wf,He=$e.getClearColor(),Fe=$e.getClearAlpha(),tt=He.r,rt=He.g,Ze=He.b;De?(w[0]=tt,w[1]=rt,w[2]=Ze,w[3]=Fe,I.clearBufferuiv(I.COLOR,0,w)):(A[0]=tt,A[1]=rt,A[2]=Ze,A[3]=Fe,I.clearBufferiv(I.COLOR,0,A))}else oe|=I.COLOR_BUFFER_BIT}Y&&(oe|=I.DEPTH_BUFFER_BIT),se&&(oe|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(oe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Ce,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",Se,!1),$e.dispose(),ce.dispose(),Ke.dispose(),We.dispose(),Ot.dispose(),kt.dispose(),Q.dispose(),Pe.dispose(),ct.dispose(),de.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",fn),Ee.removeEventListener("sessionend",ts),Un.stop()};function Ce(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const T=Lt.autoReset,Y=Be.enabled,se=Be.autoUpdate,oe=Be.needsUpdate,W=Be.type;V(),Lt.autoReset=T,Be.enabled=Y,Be.autoUpdate=se,Be.needsUpdate=oe,Be.type=W}function Se(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function he(T){const Y=T.target;Y.removeEventListener("dispose",he),Xe(Y)}function Xe(T){lt(T),We.remove(T)}function lt(T){const Y=We.get(T).programs;Y!==void 0&&(Y.forEach(function(se){de.releaseProgram(se)}),T.isShaderMaterial&&de.releaseShaderCache(T))}this.renderBufferDirect=function(T,Y,se,oe,W,Me){Y===null&&(Y=ke);const De=W.isMesh&&W.matrixWorld.determinant()<0,He=Mi(T,Y,se,oe,W);Ge.setMaterial(oe,De);let Fe=se.index,tt=1;if(oe.wireframe===!0){if(Fe=M.getWireframeAttribute(se),Fe===void 0)return;tt=2}const rt=se.drawRange,Ze=se.attributes.position;let st=rt.start*tt,Tt=(rt.start+rt.count)*tt;Me!==null&&(st=Math.max(st,Me.start*tt),Tt=Math.min(Tt,(Me.start+Me.count)*tt)),Fe!==null?(st=Math.max(st,0),Tt=Math.min(Tt,Fe.count)):Ze!=null&&(st=Math.max(st,0),Tt=Math.min(Tt,Ze.count));const yt=Tt-st;if(yt<0||yt===1/0)return;Pe.setup(W,oe,He,se,Fe);let Nt,At=Ne;if(Fe!==null&&(Nt=P.get(Fe),At=it,At.setIndex(Nt)),W.isMesh)oe.wireframe===!0?(Ge.setLineWidth(oe.wireframeLinewidth*$t()),At.setMode(I.LINES)):At.setMode(I.TRIANGLES);else if(W.isLine){let Qe=oe.linewidth;Qe===void 0&&(Qe=1),Ge.setLineWidth(Qe*$t()),W.isLineSegments?At.setMode(I.LINES):W.isLineLoop?At.setMode(I.LINE_LOOP):At.setMode(I.LINE_STRIP)}else W.isPoints?At.setMode(I.POINTS):W.isSprite&&At.setMode(I.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Xo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),At.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))At.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Qe=W._multiDrawStarts,Ct=W._multiDrawCounts,_t=W._multiDrawCount,Zt=Fe?P.get(Fe).bytesPerElement:1,Jn=We.get(oe).currentProgram.getUniforms();for(let yn=0;yn<_t;yn++)Jn.setValue(I,"_gl_DrawID",yn),At.render(Qe[yn]/Zt,Ct[yn])}else if(W.isInstancedMesh)At.renderInstances(st,yt,W.count);else if(se.isInstancedBufferGeometry){const Qe=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Ct=Math.min(se.instanceCount,Qe);At.renderInstances(st,yt,Ct)}else At.render(st,yt)};function wt(T,Y,se){T.transparent===!0&&T.side===ki&&T.forceSinglePass===!1?(T.side=Nn,T.needsUpdate=!0,is(T,Y,se),T.side=Sr,T.needsUpdate=!0,is(T,Y,se),T.side=ki):is(T,Y,se)}this.compile=function(T,Y,se=null){se===null&&(se=T),g=Ke.get(se),g.init(Y),L.push(g),se.traverseVisible(function(W){W.isLight&&W.layers.test(Y.layers)&&(g.pushLight(W),W.castShadow&&g.pushShadow(W))}),T!==se&&T.traverseVisible(function(W){W.isLight&&W.layers.test(Y.layers)&&(g.pushLight(W),W.castShadow&&g.pushShadow(W))}),g.setupLights();const oe=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Me=W.material;if(Me)if(Array.isArray(Me))for(let De=0;De<Me.length;De++){const He=Me[De];wt(He,se,W),oe.add(He)}else wt(Me,se,W),oe.add(Me)}),g=L.pop(),oe},this.compileAsync=function(T,Y,se=null){const oe=this.compile(T,Y,se);return new Promise(W=>{function Me(){if(oe.forEach(function(De){We.get(De).currentProgram.isReady()&&oe.delete(De)}),oe.size===0){W(T);return}setTimeout(Me,10)}ut.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let xt=null;function Wn(T){xt&&xt(T)}function fn(){Un.stop()}function ts(){Un.start()}const Un=new rg;Un.setAnimationLoop(Wn),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(T){xt=T,Ee.setAnimationLoop(T),T===null?Un.stop():Un.start()},Ee.addEventListener("sessionstart",fn),Ee.addEventListener("sessionend",ts),this.render=function(T,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(Y),Y=Ee.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,Y,q),g=Ke.get(T,L.length),g.init(Y),L.push(g),Z.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),be.setFromProjectionMatrix(Z,yi,Y.reversedDepth),$=this.localClippingEnabled,pe=Ae.init(this.clippingPlanes,$),y=ce.get(T,F.length),y.init(),F.push(y),Ee.enabled===!0&&Ee.isPresenting===!0){const Me=b.xr.getDepthSensingMesh();Me!==null&&Js(Me,Y,-1/0,b.sortObjects)}Js(T,Y,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(ue,ae),pt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,pt&&$e.addToRenderList(y,T),this.info.render.frame++,pe===!0&&Ae.beginShadows();const se=g.state.shadowsArray;Be.render(se,T,Y),pe===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const oe=y.opaque,W=y.transmissive;if(g.setupLights(),Y.isArrayCamera){const Me=Y.cameras;if(W.length>0)for(let De=0,He=Me.length;De<He;De++){const Fe=Me[De];Mr(oe,W,T,Fe)}pt&&$e.render(T);for(let De=0,He=Me.length;De<He;De++){const Fe=Me[De];Wi(y,T,Fe,Fe.viewport)}}else W.length>0&&Mr(oe,W,T,Y),pt&&$e.render(T),Wi(y,T,Y);q!==null&&k===0&&(at.updateMultisampleRenderTarget(q),at.updateRenderTargetMipmap(q)),T.isScene===!0&&T.onAfterRender(b,T,Y),Pe.resetDefaultState(),R=-1,C=null,L.pop(),L.length>0?(g=L[L.length-1],pe===!0&&Ae.setGlobalState(b.clippingPlanes,g.state.camera)):g=null,F.pop(),F.length>0?y=F[F.length-1]:y=null};function Js(T,Y,se,oe){if(T.visible===!1)return;if(T.layers.test(Y.layers)){if(T.isGroup)se=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Y);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||be.intersectsSprite(T)){oe&&Ie.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Z);const De=Q.update(T),He=T.material;He.visible&&y.push(T,De,He,se,Ie.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||be.intersectsObject(T))){const De=Q.update(T),He=T.material;if(oe&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ie.copy(T.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Ie.copy(De.boundingSphere.center)),Ie.applyMatrix4(T.matrixWorld).applyMatrix4(Z)),Array.isArray(He)){const Fe=De.groups;for(let tt=0,rt=Fe.length;tt<rt;tt++){const Ze=Fe[tt],st=He[Ze.materialIndex];st&&st.visible&&y.push(T,De,st,se,Ie.z,Ze)}}else He.visible&&y.push(T,De,He,se,Ie.z,null)}}const Me=T.children;for(let De=0,He=Me.length;De<He;De++)Js(Me[De],Y,se,oe)}function Wi(T,Y,se,oe){const W=T.opaque,Me=T.transmissive,De=T.transparent;g.setupLightsView(se),pe===!0&&Ae.setGlobalState(b.clippingPlanes,se),oe&&Ge.viewport(B.copy(oe)),W.length>0&&Ei(W,Y,se),Me.length>0&&Ei(Me,Y,se),De.length>0&&Ei(De,Y,se),Ge.buffers.depth.setTest(!0),Ge.buffers.depth.setMask(!0),Ge.buffers.color.setMask(!0),Ge.setPolygonOffset(!1)}function Mr(T,Y,se,oe){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[oe.id]===void 0&&(g.state.transmissionRenderTarget[oe.id]=new Jr(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?jo:Hi,minFilter:qr,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace}));const Me=g.state.transmissionRenderTarget[oe.id],De=oe.viewport||B;Me.setSize(De.z*b.transmissionResolutionScale,De.w*b.transmissionResolutionScale);const He=b.getRenderTarget(),Fe=b.getActiveCubeFace(),tt=b.getActiveMipmapLevel();b.setRenderTarget(Me),b.getClearColor(j),te=b.getClearAlpha(),te<1&&b.setClearColor(16777215,.5),b.clear(),pt&&$e.render(se);const rt=b.toneMapping;b.toneMapping=yr;const Ze=oe.viewport;if(oe.viewport!==void 0&&(oe.viewport=void 0),g.setupLightsView(oe),pe===!0&&Ae.setGlobalState(b.clippingPlanes,oe),Ei(T,se,oe),at.updateMultisampleRenderTarget(Me),at.updateRenderTargetMipmap(Me),ut.has("WEBGL_multisampled_render_to_texture")===!1){let st=!1;for(let Tt=0,yt=Y.length;Tt<yt;Tt++){const Nt=Y[Tt],At=Nt.object,Qe=Nt.geometry,Ct=Nt.material,_t=Nt.group;if(Ct.side===ki&&At.layers.test(oe.layers)){const Zt=Ct.side;Ct.side=Nn,Ct.needsUpdate=!0,ns(At,se,oe,Qe,Ct,_t),Ct.side=Zt,Ct.needsUpdate=!0,st=!0}}st===!0&&(at.updateMultisampleRenderTarget(Me),at.updateRenderTargetMipmap(Me))}b.setRenderTarget(He,Fe,tt),b.setClearColor(j,te),Ze!==void 0&&(oe.viewport=Ze),b.toneMapping=rt}function Ei(T,Y,se){const oe=Y.isScene===!0?Y.overrideMaterial:null;for(let W=0,Me=T.length;W<Me;W++){const De=T[W],He=De.object,Fe=De.geometry,tt=De.group;let rt=De.material;rt.allowOverride===!0&&oe!==null&&(rt=oe),He.layers.test(se.layers)&&ns(He,Y,se,Fe,rt,tt)}}function ns(T,Y,se,oe,W,Me){T.onBeforeRender(b,Y,se,oe,W,Me),T.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(b,Y,se,oe,T,Me),W.transparent===!0&&W.side===ki&&W.forceSinglePass===!1?(W.side=Nn,W.needsUpdate=!0,b.renderBufferDirect(se,Y,oe,W,T,Me),W.side=Sr,W.needsUpdate=!0,b.renderBufferDirect(se,Y,oe,W,T,Me),W.side=ki):b.renderBufferDirect(se,Y,oe,W,T,Me),T.onAfterRender(b,Y,se,oe,W,Me)}function is(T,Y,se){Y.isScene!==!0&&(Y=ke);const oe=We.get(T),W=g.state.lights,Me=g.state.shadowsArray,De=W.state.version,He=de.getParameters(T,W.state,Me,Y,se),Fe=de.getProgramCacheKey(He);let tt=oe.programs;oe.environment=T.isMeshStandardMaterial?Y.environment:null,oe.fog=Y.fog,oe.envMap=(T.isMeshStandardMaterial?kt:Ot).get(T.envMap||oe.environment),oe.envMapRotation=oe.environment!==null&&T.envMap===null?Y.environmentRotation:T.envMapRotation,tt===void 0&&(T.addEventListener("dispose",he),tt=new Map,oe.programs=tt);let rt=tt.get(Fe);if(rt!==void 0){if(oe.currentProgram===rt&&oe.lightsStateVersion===De)return $o(T,He),rt}else He.uniforms=de.getUniforms(T),T.onBeforeCompile(He,b),rt=de.acquireProgram(He,Fe),tt.set(Fe,rt),oe.uniforms=He.uniforms;const Ze=oe.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ze.clippingPlanes=Ae.uniform),$o(T,He),oe.needsLights=Qo(T),oe.lightsStateVersion=De,oe.needsLights&&(Ze.ambientLightColor.value=W.state.ambient,Ze.lightProbe.value=W.state.probe,Ze.directionalLights.value=W.state.directional,Ze.directionalLightShadows.value=W.state.directionalShadow,Ze.spotLights.value=W.state.spot,Ze.spotLightShadows.value=W.state.spotShadow,Ze.rectAreaLights.value=W.state.rectArea,Ze.ltc_1.value=W.state.rectAreaLTC1,Ze.ltc_2.value=W.state.rectAreaLTC2,Ze.pointLights.value=W.state.point,Ze.pointLightShadows.value=W.state.pointShadow,Ze.hemisphereLights.value=W.state.hemi,Ze.directionalShadowMap.value=W.state.directionalShadowMap,Ze.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ze.spotShadowMap.value=W.state.spotShadowMap,Ze.spotLightMatrix.value=W.state.spotLightMatrix,Ze.spotLightMap.value=W.state.spotLightMap,Ze.pointShadowMap.value=W.state.pointShadowMap,Ze.pointShadowMatrix.value=W.state.pointShadowMatrix),oe.currentProgram=rt,oe.uniformsList=null,rt}function Ko(T){if(T.uniformsList===null){const Y=T.currentProgram.getUniforms();T.uniformsList=bl.seqWithValue(Y.seq,T.uniforms)}return T.uniformsList}function $o(T,Y){const se=We.get(T);se.outputColorSpace=Y.outputColorSpace,se.batching=Y.batching,se.batchingColor=Y.batchingColor,se.instancing=Y.instancing,se.instancingColor=Y.instancingColor,se.instancingMorph=Y.instancingMorph,se.skinning=Y.skinning,se.morphTargets=Y.morphTargets,se.morphNormals=Y.morphNormals,se.morphColors=Y.morphColors,se.morphTargetsCount=Y.morphTargetsCount,se.numClippingPlanes=Y.numClippingPlanes,se.numIntersection=Y.numClipIntersection,se.vertexAlphas=Y.vertexAlphas,se.vertexTangents=Y.vertexTangents,se.toneMapping=Y.toneMapping}function Mi(T,Y,se,oe,W){Y.isScene!==!0&&(Y=ke),at.resetTextureUnits();const Me=Y.fog,De=oe.isMeshStandardMaterial?Y.environment:null,He=q===null?b.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ks,Fe=(oe.isMeshStandardMaterial?kt:Ot).get(oe.envMap||De),tt=oe.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,rt=!!se.attributes.tangent&&(!!oe.normalMap||oe.anisotropy>0),Ze=!!se.morphAttributes.position,st=!!se.morphAttributes.normal,Tt=!!se.morphAttributes.color;let yt=yr;oe.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(yt=b.toneMapping);const Nt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,At=Nt!==void 0?Nt.length:0,Qe=We.get(oe),Ct=g.state.lights;if(pe===!0&&($===!0||T!==C)){const Xt=T===C&&oe.id===R;Ae.setState(oe,T,Xt)}let _t=!1;oe.version===Qe.__version?(Qe.needsLights&&Qe.lightsStateVersion!==Ct.state.version||Qe.outputColorSpace!==He||W.isBatchedMesh&&Qe.batching===!1||!W.isBatchedMesh&&Qe.batching===!0||W.isBatchedMesh&&Qe.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Qe.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Qe.instancing===!1||!W.isInstancedMesh&&Qe.instancing===!0||W.isSkinnedMesh&&Qe.skinning===!1||!W.isSkinnedMesh&&Qe.skinning===!0||W.isInstancedMesh&&Qe.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Qe.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Qe.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Qe.instancingMorph===!1&&W.morphTexture!==null||Qe.envMap!==Fe||oe.fog===!0&&Qe.fog!==Me||Qe.numClippingPlanes!==void 0&&(Qe.numClippingPlanes!==Ae.numPlanes||Qe.numIntersection!==Ae.numIntersection)||Qe.vertexAlphas!==tt||Qe.vertexTangents!==rt||Qe.morphTargets!==Ze||Qe.morphNormals!==st||Qe.morphColors!==Tt||Qe.toneMapping!==yt||Qe.morphTargetsCount!==At)&&(_t=!0):(_t=!0,Qe.__version=oe.version);let Zt=Qe.currentProgram;_t===!0&&(Zt=is(oe,Y,W));let Jn=!1,yn=!1,Tr=!1;const It=Zt.getUniforms(),Sn=Qe.uniforms;if(Ge.useProgram(Zt.program)&&(Jn=!0,yn=!0,Tr=!0),oe.id!==R&&(R=oe.id,yn=!0),Jn||C!==T){Ge.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),It.setValue(I,"projectionMatrix",T.projectionMatrix),It.setValue(I,"viewMatrix",T.matrixWorldInverse);const hn=It.map.cameraPosition;hn!==void 0&&hn.setValue(I,_e.setFromMatrixPosition(T.matrixWorld)),nt.logarithmicDepthBuffer&&It.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(oe.isMeshPhongMaterial||oe.isMeshToonMaterial||oe.isMeshLambertMaterial||oe.isMeshBasicMaterial||oe.isMeshStandardMaterial||oe.isShaderMaterial)&&It.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),C!==T&&(C=T,yn=!0,Tr=!0)}if(W.isSkinnedMesh){It.setOptional(I,W,"bindMatrix"),It.setOptional(I,W,"bindMatrixInverse");const Xt=W.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),It.setValue(I,"boneTexture",Xt.boneTexture,at))}W.isBatchedMesh&&(It.setOptional(I,W,"batchingTexture"),It.setValue(I,"batchingTexture",W._matricesTexture,at),It.setOptional(I,W,"batchingIdTexture"),It.setValue(I,"batchingIdTexture",W._indirectTexture,at),It.setOptional(I,W,"batchingColorTexture"),W._colorsTexture!==null&&It.setValue(I,"batchingColorTexture",W._colorsTexture,at));const dn=se.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&Te.update(W,se,Zt),(yn||Qe.receiveShadow!==W.receiveShadow)&&(Qe.receiveShadow=W.receiveShadow,It.setValue(I,"receiveShadow",W.receiveShadow)),oe.isMeshGouraudMaterial&&oe.envMap!==null&&(Sn.envMap.value=Fe,Sn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),oe.isMeshStandardMaterial&&oe.envMap===null&&Y.environment!==null&&(Sn.envMapIntensity.value=Y.environmentIntensity),yn&&(It.setValue(I,"toneMappingExposure",b.toneMappingExposure),Qe.needsLights&&Zo(Sn,Tr),Me&&oe.fog===!0&&ge.refreshFogUniforms(Sn,Me),ge.refreshMaterialUniforms(Sn,oe,U,fe,g.state.transmissionRenderTarget[T.id]),bl.upload(I,Ko(Qe),Sn,at)),oe.isShaderMaterial&&oe.uniformsNeedUpdate===!0&&(bl.upload(I,Ko(Qe),Sn,at),oe.uniformsNeedUpdate=!1),oe.isSpriteMaterial&&It.setValue(I,"center",W.center),It.setValue(I,"modelViewMatrix",W.modelViewMatrix),It.setValue(I,"normalMatrix",W.normalMatrix),It.setValue(I,"modelMatrix",W.matrixWorld),oe.isShaderMaterial||oe.isRawShaderMaterial){const Xt=oe.uniformsGroups;for(let hn=0,wr=Xt.length;hn<wr;hn++){const vt=Xt[hn];ct.update(vt,Zt),ct.bind(vt,Zt)}}return Zt}function Zo(T,Y){T.ambientLightColor.needsUpdate=Y,T.lightProbe.needsUpdate=Y,T.directionalLights.needsUpdate=Y,T.directionalLightShadows.needsUpdate=Y,T.pointLights.needsUpdate=Y,T.pointLightShadows.needsUpdate=Y,T.spotLights.needsUpdate=Y,T.spotLightShadows.needsUpdate=Y,T.rectAreaLights.needsUpdate=Y,T.hemisphereLights.needsUpdate=Y}function Qo(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(T,Y,se){const oe=We.get(T);oe.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,oe.__autoAllocateDepthBuffer===!1&&(oe.__useRenderToTexture=!1),We.get(T.texture).__webglTexture=Y,We.get(T.depthTexture).__webglTexture=oe.__autoAllocateDepthBuffer?void 0:se,oe.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,Y){const se=We.get(T);se.__webglFramebuffer=Y,se.__useDefaultFramebuffer=Y===void 0};const Ol=I.createFramebuffer();this.setRenderTarget=function(T,Y=0,se=0){q=T,z=Y,k=se;let oe=!0,W=null,Me=!1,De=!1;if(T){const Fe=We.get(T);if(Fe.__useDefaultFramebuffer!==void 0)Ge.bindFramebuffer(I.FRAMEBUFFER,null),oe=!1;else if(Fe.__webglFramebuffer===void 0)at.setupRenderTarget(T);else if(Fe.__hasExternalTextures)at.rebindTextures(T,We.get(T.texture).__webglTexture,We.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ze=T.depthTexture;if(Fe.__boundDepthTexture!==Ze){if(Ze!==null&&We.has(Ze)&&(T.width!==Ze.image.width||T.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(T)}}const tt=T.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(De=!0);const rt=We.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(rt[Y])?W=rt[Y][se]:W=rt[Y],Me=!0):T.samples>0&&at.useMultisampledRTT(T)===!1?W=We.get(T).__webglMultisampledFramebuffer:Array.isArray(rt)?W=rt[se]:W=rt,B.copy(T.viewport),ne.copy(T.scissor),X=T.scissorTest}else B.copy(N).multiplyScalar(U).floor(),ne.copy(re).multiplyScalar(U).floor(),X=xe;if(se!==0&&(W=Ol),Ge.bindFramebuffer(I.FRAMEBUFFER,W)&&oe&&Ge.drawBuffers(T,W),Ge.viewport(B),Ge.scissor(ne),Ge.setScissorTest(X),Me){const Fe=We.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Fe.__webglTexture,se)}else if(De){const Fe=Y;for(let tt=0;tt<T.textures.length;tt++){const rt=We.get(T.textures[tt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+tt,rt.__webglTexture,se,Fe)}}else if(T!==null&&se!==0){const Fe=We.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Fe.__webglTexture,se)}R=-1},this.readRenderTargetPixels=function(T,Y,se,oe,W,Me,De,He=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=We.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe){Ge.bindFramebuffer(I.FRAMEBUFFER,Fe);try{const tt=T.textures[He],rt=tt.format,Ze=tt.type;if(!nt.textureFormatReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=T.width-oe&&se>=0&&se<=T.height-W&&(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+He),I.readPixels(Y,se,oe,W,Ye.convert(rt),Ye.convert(Ze),Me))}finally{const tt=q!==null?We.get(q).__webglFramebuffer:null;Ge.bindFramebuffer(I.FRAMEBUFFER,tt)}}},this.readRenderTargetPixelsAsync=async function(T,Y,se,oe,W,Me,De,He=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=We.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe)if(Y>=0&&Y<=T.width-oe&&se>=0&&se<=T.height-W){Ge.bindFramebuffer(I.FRAMEBUFFER,Fe);const tt=T.textures[He],rt=tt.format,Ze=tt.type;if(!nt.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,st),I.bufferData(I.PIXEL_PACK_BUFFER,Me.byteLength,I.STREAM_READ),T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+He),I.readPixels(Y,se,oe,W,Ye.convert(rt),Ye.convert(Ze),0);const Tt=q!==null?We.get(q).__webglFramebuffer:null;Ge.bindFramebuffer(I.FRAMEBUFFER,Tt);const yt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await i0(I,yt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,st),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Me),I.deleteBuffer(st),I.deleteSync(yt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,Y=null,se=0){const oe=Math.pow(2,-se),W=Math.floor(T.image.width*oe),Me=Math.floor(T.image.height*oe),De=Y!==null?Y.x:0,He=Y!==null?Y.y:0;at.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,se,0,0,De,He,W,Me),Ge.unbindTexture()};const Jo=I.createFramebuffer(),ea=I.createFramebuffer();this.copyTextureToTexture=function(T,Y,se=null,oe=null,W=0,Me=null){Me===null&&(W!==0?(Xo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Me=W,W=0):Me=0);let De,He,Fe,tt,rt,Ze,st,Tt,yt;const Nt=T.isCompressedTexture?T.mipmaps[Me]:T.image;if(se!==null)De=se.max.x-se.min.x,He=se.max.y-se.min.y,Fe=se.isBox3?se.max.z-se.min.z:1,tt=se.min.x,rt=se.min.y,Ze=se.isBox3?se.min.z:0;else{const dn=Math.pow(2,-W);De=Math.floor(Nt.width*dn),He=Math.floor(Nt.height*dn),T.isDataArrayTexture?Fe=Nt.depth:T.isData3DTexture?Fe=Math.floor(Nt.depth*dn):Fe=1,tt=0,rt=0,Ze=0}oe!==null?(st=oe.x,Tt=oe.y,yt=oe.z):(st=0,Tt=0,yt=0);const At=Ye.convert(Y.format),Qe=Ye.convert(Y.type);let Ct;Y.isData3DTexture?(at.setTexture3D(Y,0),Ct=I.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(at.setTexture2DArray(Y,0),Ct=I.TEXTURE_2D_ARRAY):(at.setTexture2D(Y,0),Ct=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,Y.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,Y.unpackAlignment);const _t=I.getParameter(I.UNPACK_ROW_LENGTH),Zt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Jn=I.getParameter(I.UNPACK_SKIP_PIXELS),yn=I.getParameter(I.UNPACK_SKIP_ROWS),Tr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Nt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Nt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,tt),I.pixelStorei(I.UNPACK_SKIP_ROWS,rt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);const It=T.isDataArrayTexture||T.isData3DTexture,Sn=Y.isDataArrayTexture||Y.isData3DTexture;if(T.isDepthTexture){const dn=We.get(T),Xt=We.get(Y),hn=We.get(dn.__renderTarget),wr=We.get(Xt.__renderTarget);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,hn.__webglFramebuffer),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,wr.__webglFramebuffer);for(let vt=0;vt<Fe;vt++)It&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,We.get(T).__webglTexture,W,Ze+vt),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,We.get(Y).__webglTexture,Me,yt+vt)),I.blitFramebuffer(tt,rt,De,He,st,Tt,De,He,I.DEPTH_BUFFER_BIT,I.NEAREST);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(W!==0||T.isRenderTargetTexture||We.has(T)){const dn=We.get(T),Xt=We.get(Y);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,Jo),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,ea);for(let hn=0;hn<Fe;hn++)It?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dn.__webglTexture,W,Ze+hn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dn.__webglTexture,W),Sn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Xt.__webglTexture,Me,yt+hn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Xt.__webglTexture,Me),W!==0?I.blitFramebuffer(tt,rt,De,He,st,Tt,De,He,I.COLOR_BUFFER_BIT,I.NEAREST):Sn?I.copyTexSubImage3D(Ct,Me,st,Tt,yt+hn,tt,rt,De,He):I.copyTexSubImage2D(Ct,Me,st,Tt,tt,rt,De,He);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Sn?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Ct,Me,st,Tt,yt,De,He,Fe,At,Qe,Nt.data):Y.isCompressedArrayTexture?I.compressedTexSubImage3D(Ct,Me,st,Tt,yt,De,He,Fe,At,Nt.data):I.texSubImage3D(Ct,Me,st,Tt,yt,De,He,Fe,At,Qe,Nt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Me,st,Tt,De,He,At,Qe,Nt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Me,st,Tt,Nt.width,Nt.height,At,Nt.data):I.texSubImage2D(I.TEXTURE_2D,Me,st,Tt,De,He,At,Qe,Nt);I.pixelStorei(I.UNPACK_ROW_LENGTH,_t),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Zt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Jn),I.pixelStorei(I.UNPACK_SKIP_ROWS,yn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Tr),Me===0&&Y.generateMipmaps&&I.generateMipmap(Ct),Ge.unbindTexture()},this.initRenderTarget=function(T){We.get(T).__webglFramebuffer===void 0&&at.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?at.setTextureCube(T,0):T.isData3DTexture?at.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?at.setTexture2DArray(T,0):at.setTexture2D(T,0),Ge.unbindTexture()},this.resetState=function(){z=0,k=0,q=null,Ge.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Mt._getUnpackColorSpace()}}const Am={type:"change"},Qf={type:"start"},ug={type:"end"},Tl=new jm,Rm=new gr,yM=Math.cos(70*vr.DEG2RAD),en=new ee,Ln=2*Math.PI,Pt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qc=1e-6;class SM extends F0{constructor(e,n=null){super(e,n),this.state=Pt.NONE,this.target=new ee,this.cursor=new ee,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:Hs.ROTATE,TWO:Hs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new ee,this._lastQuaternion=new Qr,this._lastTargetPosition=new ee,this._quat=new Qr().setFromUnitVectors(e.up,new ee(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new em,this._sphericalDelta=new em,this._scale=1,this._panOffset=new ee,this._rotateStart=new ht,this._rotateEnd=new ht,this._rotateDelta=new ht,this._panStart=new ht,this._panEnd=new ht,this._panDelta=new ht,this._dollyStart=new ht,this._dollyEnd=new ht,this._dollyDelta=new ht,this._dollyDirection=new ee,this._mouse=new ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=MM.bind(this),this._onPointerDown=EM.bind(this),this._onPointerUp=TM.bind(this),this._onContextMenu=DM.bind(this),this._onMouseWheel=RM.bind(this),this._onKeyDown=CM.bind(this),this._onTouchStart=bM.bind(this),this._onTouchMove=PM.bind(this),this._onMouseDown=wM.bind(this),this._onMouseMove=AM.bind(this),this._interceptControlDown=LM.bind(this),this._interceptControlUp=NM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Am),this.update(),this.state=Pt.NONE}update(e=null){const n=this.object.position;en.copy(n).sub(this.target),en.applyQuaternion(this._quat),this._spherical.setFromVector3(en),this.autoRotate&&this.state===Pt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(r)&&isFinite(a)&&(r<-Math.PI?r+=Ln:r>Math.PI&&(r-=Ln),a<-Math.PI?a+=Ln:a>Math.PI&&(a-=Ln),r<=a?this._spherical.theta=Math.max(r,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+a)/2?Math.max(r,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=f!=this._spherical.radius}if(en.setFromSpherical(this._spherical),en.applyQuaternion(this._quatInverse),n.copy(this.target).add(en),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const d=en.length();f=this._clampDistance(d*this._scale);const m=d-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),u=!!m}else if(this.object.isOrthographicCamera){const d=new ee(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=m!==this.object.zoom;const p=new ee(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),f=en.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Tl.origin.copy(this.object.position),Tl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Tl.direction))<yM?this.object.lookAt(this.target):(Rm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Tl.intersectPlane(Rm,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>qc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qc||this._lastTargetPosition.distanceToSquared(this.target)>qc?(this.dispatchEvent(Am),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ln/60*this.autoRotateSpeed*e:Ln/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){en.setFromMatrixColumn(n,0),en.multiplyScalar(-e),this._panOffset.add(en)}_panUp(e,n){this.screenSpacePanning===!0?en.setFromMatrixColumn(n,1):(en.setFromMatrixColumn(n,0),en.crossVectors(this.object.up,en)),en.multiplyScalar(e),this._panOffset.add(en)}_pan(e,n){const r=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;en.copy(a).sub(this.target);let u=en.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*u/r.clientHeight,this.object.matrix),this._panUp(2*n*u/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),a=e-r.left,u=n-r.top,f=r.width,d=r.height;this._mouse.x=a/f*2-1,this._mouse.y=-(u/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Ln*this._rotateDelta.x/n.clientHeight),this._rotateUp(Ln*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateStart.set(r,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panStart.set(r,a)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,u=Math.sqrt(r*r+a*a);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),a=.5*(e.pageX+r.x),u=.5*(e.pageY+r.y);this._rotateEnd.set(a,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Ln*this._rotateDelta.x/n.clientHeight),this._rotateUp(Ln*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panEnd.set(r,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,u=Math.sqrt(r*r+a*a);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+n.x)*.5,d=(e.pageY+n.y)*.5;this._updateZoomParameters(f,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new ht,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function EM(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function MM(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function TM(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ug),this.state=Pt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function wM(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Pt.DOLLY;break;case Gs.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Pt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Pt.ROTATE}break;case Gs.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Pt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Pt.PAN}break;default:this.state=Pt.NONE}this.state!==Pt.NONE&&this.dispatchEvent(Qf)}function AM(s){switch(this.state){case Pt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Pt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Pt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function RM(s){this.enabled===!1||this.enableZoom===!1||this.state!==Pt.NONE||(s.preventDefault(),this.dispatchEvent(Qf),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(ug))}function CM(s){this.enabled!==!1&&this._handleKeyDown(s)}function bM(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Hs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Pt.TOUCH_ROTATE;break;case Hs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Pt.TOUCH_PAN;break;default:this.state=Pt.NONE}break;case 2:switch(this.touches.TWO){case Hs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Pt.TOUCH_DOLLY_PAN;break;case Hs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Pt.TOUCH_DOLLY_ROTATE;break;default:this.state=Pt.NONE}break;default:this.state=Pt.NONE}this.state!==Pt.NONE&&this.dispatchEvent(Qf)}function PM(s){switch(this._trackPointer(s),this.state){case Pt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Pt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Pt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Pt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Pt.NONE}}function DM(s){this.enabled!==!1&&s.preventDefault()}function LM(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function NM(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const IM=`
out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`,UM=`
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform vec3 uCameraTarget;
uniform float uFov;
uniform float uTime;
uniform int uQuality;
uniform int uDebug;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uEmission;
uniform float uOrbitalVelocity;
uniform float uTurbulence;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform float uBloomStrength;
uniform float uBloomThreshold;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;

in vec2 vUv;
out vec4 outColor;

const float HORIZON = 1.0;
const float PHOTON_SPHERE = 1.5;
const float FAR_LIMIT = 46.0;
const int CINEMATIC_STEPS = 260;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.52;
  for (int i = 0; i < 4; i++) {
    value += amplitude * valueNoise(p);
    p = p * 2.03 + vec3(17.1, 3.7, 11.8);
    amplitude *= 0.5;
  }
  return value;
}

vec3 cameraRay(vec2 uv) {
  vec3 forward = normalize(uCameraTarget - uCameraPos);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = normalize(cross(right, forward));
  vec2 screen = uv * 2.0 - 1.0;
  float aspect = uResolution.x / uResolution.y;
  screen.x *= aspect;
  float portraitZoom = mix(1.0, 1.95, smoothstep(0.8, 0.35, aspect));
  float focal = tan(radians(uFov) * 0.5) * portraitZoom;
  return normalize(forward + right * screen.x * focal + up * screen.y * focal);
}

vec3 starBackground(vec3 direction) {
  float longitude = atan(direction.z, direction.x);
  float latitude = asin(clamp(direction.y, -1.0, 1.0));
  float band = exp(-pow(abs(direction.y + 0.12 * sin(longitude * 2.7)), 2.0) * 42.0);
  float cloud = fbm(direction * 7.0 + vec3(0.0, uTime * 0.003, 4.0));
  vec3 galaxy = vec3(0.35, 0.11, 0.035) * band * cloud * uGalaxyBrightness;
  galaxy += vec3(0.06, 0.12, 0.28) * band * (1.0 - cloud) * uGalaxyBrightness * 0.55;

  float stars = 0.0;
  vec3 starTint = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float scale = 18.0 + float(i) * 15.0;
    vec3 cellPos = direction * scale;
    vec3 cell = floor(cellPos);
    vec3 local = fract(cellPos) - 0.5;
    float seed = hash13(cell + vec3(float(i) * 19.37));
    float size = mix(0.018, 0.050, seed);
    float point = exp(-dot(local, local) / (size * size));
    float visibility = step(0.68 - uStarDensity * 0.17, seed);
    float brightness = pow(max(seed, 0.05), 8.0) * 6.5;
    stars += point * visibility * brightness;
    starTint += point * visibility * brightness * mix(vec3(0.55, 0.70, 1.0), vec3(1.0, 0.48, 0.15), seed);
  }
  float horizonFade = smoothstep(-0.8, 0.8, latitude);
  return galaxy + starTint * 0.75 + vec3(0.008, 0.012, 0.022) * (0.5 + horizonFade * 0.5);
}

vec3 diskRadiance(vec3 hit, vec3 rayDirection, float order) {
  float radius = length(hit.xz);
  float radial = clamp((uDiskOuter - radius) / max(uDiskOuter - uDiskInner, 0.1), 0.0, 1.0);
  float edge = smoothstep(uDiskInner, uDiskInner + 0.28, radius) * smoothstep(uDiskOuter, uDiskOuter - 0.55, radius);
  float innerProfile = exp(-pow(max(radius - uDiskInner, 0.0) / 1.25, 1.35));
  float turbulence = fbm(vec3(hit.xz * 1.35 + vec2(uTime * uTurbulenceSpeed * 0.09, -uTime * uTurbulenceSpeed * 0.06), radius * 0.15));
  float ribbons = 0.72 + uTurbulence * (0.55 * turbulence + 0.16 * sin(11.0 * atan(hit.z, hit.x) + radius * 2.3 - uTime * uTurbulenceSpeed));
  float temperature = clamp(uDiskTemperature * mix(0.45, 1.25, pow(radial, 0.42)), 0.1, 2.4);
  vec3 hot = mix(vec3(1.0, 0.18, 0.018), vec3(1.0, 0.86, 0.48), smoothstep(0.25, 1.2, temperature));

  vec3 tangent = normalize(vec3(-hit.z, 0.0, hit.x));
  float orbitalSpeed = clamp(uOrbitalVelocity * sqrt(0.42 / max(radius, 1.1)), 0.02, 0.88);
  float gamma = inversesqrt(max(1.0 - orbitalSpeed * orbitalSpeed, 0.06));
  float lineOfSight = dot(tangent, -rayDirection);
  float doppler = 1.0 / max(gamma * (1.0 - orbitalSpeed * lineOfSight), 0.16);
  float gravitationalRedshift = sqrt(max(1.0 - HORIZON / max(radius, 1.001), 0.02));
  float relativisticBoost = pow(doppler * gravitationalRedshift, 3.0);
  float layer = exp(-order * 0.42);
  float thicknessResponse = mix(0.72, 1.18, clamp(uDiskThickness / 0.7, 0.0, 1.0));
  float brightness = edge * innerProfile * ribbons * uEmission * (0.14 + 0.62 * pow(radial, 0.32)) * relativisticBoost * layer * thicknessResponse;
  return hot * brightness * (0.48 + 0.22 * temperature);
}

// Null geodesic state in Schwarzschild areal-radius coordinates.
// pos and dir are integrated with an affine-like screen distance. The
// curvature term is the stable spatial form d2x/dl2 = -3M L2 x / r5,
// where L = pos x dir. Disk intersections are tested on each curved segment.
vec3 traceSchwarzschild(
  vec3 rayOrigin,
  vec3 rayDirection,
  out float horizonMask,
  out float diskHits,
  out float diskOrder,
  out float closestRadius,
  out float dopplerMetric,
  out float stepMetric,
  out float turnMetric
) {
  vec3 pos = rayOrigin;
  vec3 dir = normalize(rayDirection);
  vec3 diskColor = vec3(0.0);
  float diskAlpha = 0.0;
  horizonMask = 0.0;
  diskHits = 0.0;
  diskOrder = 0.0;
  closestRadius = 100.0;
  dopplerMetric = 0.0;
  turnMetric = 0.0;
  float travelled = 0.0;
  int stepsLimit = uQuality == 0 ? 100 : (uQuality == 1 ? 170 : CINEMATIC_STEPS);

  for (int i = 0; i < CINEMATIC_STEPS; i++) {
    if (i >= stepsLimit) break;
    float radius = length(pos);
    closestRadius = min(closestRadius, radius);
    stepMetric = float(i) / float(stepsLimit);
    if (radius < HORIZON) {
      horizonMask = 1.0;
      break;
    }
    if (radius > FAR_LIMIT && i > 12) break;

    vec3 angularMomentum = cross(pos, dir);
    float angularSquared = dot(angularMomentum, angularMomentum);
    vec3 curvature = -1.5 * angularSquared * pos / max(pow(radius, 5.0), 0.0001);
    float curvatureAmount = length(curvature);
    turnMetric += curvatureAmount * 0.03;
    curvature = curvatureAmount > 3.5 ? curvature * (3.5 / curvatureAmount) : curvature;
    float stepLength = mix(0.034, 0.105, smoothstep(2.0, 30.0, radius));
    vec3 nextDir = normalize(dir + curvature * stepLength);
    vec3 nextPos = pos + nextDir * stepLength;
    travelled += stepLength;

    if (pos.y * nextPos.y <= 0.0 && abs(nextPos.y - pos.y) > 0.0002) {
      float crossing = clamp(pos.y / (pos.y - nextPos.y), 0.0, 1.0);
      vec3 hit = mix(pos, nextPos, crossing);
      float hitRadius = length(hit.xz);
      if (hitRadius > uDiskInner && hitRadius < uDiskOuter && diskHits < 5.0) {
        vec3 emission = diskRadiance(hit, nextDir, diskOrder);
        float contribution = clamp(length(emission) * 0.025, 0.12, 0.85);
        diskColor += emission * (1.0 - diskAlpha);
        diskAlpha += contribution * (1.0 - diskAlpha);
        dopplerMetric = max(dopplerMetric, contribution);
        diskOrder += 1.0;
      }
      diskHits += 1.0;
    }

    pos = nextPos;
    dir = nextDir;
  }

  float escaped = 1.0 - horizonMask;
  vec3 background = starBackground(dir);
  float physicalCritical = exp(-abs(closestRadius - PHOTON_SPHERE) * 24.0) * escaped;
  // The projected critical impact parameter keeps the photon ring legible on
  // narrow, low-resolution mobile viewports while the integrated signal remains
  // the primary contribution on the desktop path.
  float criticalImpact = 2.598076 * 1.04;
  float criticalAngle = asin(clamp(criticalImpact / max(length(uCameraPos), criticalImpact + 0.02), 0.0, 0.98));
  float portraitZoom = mix(1.0, 1.95, smoothstep(0.8, 0.35, uResolution.x / uResolution.y));
  float projectedRing = tan(criticalAngle) / (tan(radians(uFov) * 0.5) * portraitZoom);
  float screenRadius = length((vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0));
  float projectedCritical = exp(-pow((screenRadius - projectedRing) / 0.045, 2.0)) * escaped;
  float critical = max(physicalCritical, projectedCritical * 0.55);
  vec3 photonRing = vec3(1.0, 0.26, 0.035) * critical * (1.8 + 2.6 * clamp(turnMetric, 0.0, 1.0));
  vec3 finalHdr = background * (1.0 - diskAlpha * 0.76) + diskColor + photonRing;
  if (horizonMask > 0.5) finalHdr = vec3(0.0);
  stepMetric = clamp(stepMetric + travelled / 140.0, 0.0, 1.0);
  return finalHdr;
}

vec3 acesToneMap(vec3 color) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((color * (a * color + b)) / (color * (c * color + d) + e), 0.0, 1.0);
}

void main() {
  vec3 rayDirection = cameraRay(vUv);
  float horizonMask;
  float diskHits;
  float diskOrder;
  float closestRadius;
  float dopplerMetric;
  float stepMetric;
  float turnMetric;
  vec3 hdr = traceSchwarzschild(uCameraPos, rayDirection, horizonMask, diskHits, diskOrder, closestRadius, dopplerMetric, stepMetric, turnMetric);
  float preToneLum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
  float bloom = max(preToneLum - uBloomThreshold, 0.0) * uBloomStrength;
  hdr += hdr * bloom * 0.42;

  vec3 diagnostic = hdr;
  if (uDebug == 1) diagnostic = vec3(stepMetric, 1.0 - stepMetric, turnMetric);
  if (uDebug == 2) diagnostic = mix(vec3(0.018, 0.022, 0.035), vec3(0.95, 0.08, 0.015), horizonMask);
  if (uDebug == 3) diagnostic = vec3(clamp(diskHits / 4.0, 0.0, 1.0), clamp(diskOrder / 4.0, 0.0, 1.0), 0.08);
  if (uDebug == 4) diagnostic = vec3(dopplerMetric, 0.22 + dopplerMetric * 0.6, 1.0 - dopplerMetric);
  if (uDebug == 5) diagnostic = vec3(0.5 + rayDirection * 0.5);
  if (uDebug == 6) diagnostic = starBackground(rayDirection) * 2.0;
  if (uDebug == 7) diagnostic = hdr;
  if (uDebug == 8) diagnostic = vec3(clamp((closestRadius - HORIZON) / 3.0, 0.0, 1.0), clamp(turnMetric, 0.0, 1.0), 0.05);
  if (uDebug == 9) diagnostic = vec3(float(uQuality) / 2.0, fract(uTime * 0.025), clamp(preToneLum * 0.08, 0.0, 1.0));

  vec3 color = uDebug == 0 ? acesToneMap(diagnostic * uExposure) : acesToneMap(diagnostic * max(uExposure, 0.8));
  float vignette = smoothstep(1.25, 0.18, length(vUv * 2.0 - 1.0));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  float grain = (hash21(vUv * uResolution + uTime * 13.0) - 0.5) * uGrain * 0.08;
  color += grain;
  color.r *= 1.0 + uChromatic * (0.5 - vUv.x) * 0.06;
  color.b *= 1.0 + uChromatic * (vUv.x - 0.5) * 0.08;
  color = clamp(color, 0.0, 1.0);
  outColor = vec4(color, 1.0);
}
`,cg="gargantua-state-v1",_i=["standard","high","cinematic"],Kr={quality:"high",preset:0,debug:0,hud:!0,playing:!0,fov:44,cameraDistance:8.4,cameraAzimuth:0,cameraElevation:19,timeScale:1,diskInner:2.25,diskOuter:6.6,diskThickness:.22,diskTemperature:1.05,emission:1.35,orbitalVelocity:1,turbulence:.78,turbulenceSpeed:1,starDensity:1.1,galaxyBrightness:1.15,bloomStrength:1.25,bloomThreshold:.62,exposure:1.12,vignette:.48,grain:.22,chromatic:.18},zf=[{name:"Equatorial pass",short:"EQUATORIAL",distance:8.4,azimuth:0,elevation:19,fov:44},{name:"Polar descent",short:"POLAR",distance:8.8,azimuth:45,elevation:46,fov:42},{name:"Photon edge",short:"EDGE-ON",distance:7.4,azimuth:90,elevation:7,fov:37},{name:"Deep survey",short:"DEEP SURVEY",distance:12.8,azimuth:-28,elevation:26,fov:53}],Cm=["Final composite","Ray steps / curvature","Event horizon mask","Disk intersections / order","Doppler + redshift","Lensed background vector","Stars + galaxy field","Pre-tone HDR values","Closest approach / turn","Quality / simulation phase"],FM=[{title:"Camera",items:[["fov","Field of view",28,70,1,"°"],["cameraDistance","Camera distance",5,16,.1," rₛ"],["cameraAzimuth","Camera azimuth",-180,180,1,"°"],["cameraElevation","Camera elevation",3,78,1,"°"],["timeScale","Time multiplier",0,3,.05,"×"]]},{title:"Accretion disk",items:[["diskInner","Inner radius",1.65,4.2,.05," rₛ"],["diskOuter","Outer radius",4.2,10,.1," rₛ"],["diskThickness","Half-thickness",.05,.7,.01," rₛ"],["diskTemperature","Temperature",.35,1.9,.01,""],["emission","Emission intensity",.2,3.2,.05,"×"],["orbitalVelocity","Orbital velocity",.35,1.45,.01,"×"],["turbulence","Turbulence amplitude",0,1.5,.01,"×"],["turbulenceSpeed","Turbulence speed",0,3,.05,"×"]]},{title:"Background",items:[["starDensity","Star density",.15,2,.05,"×"],["galaxyBrightness","Galaxy brightness",0,2.5,.05,"×"]]},{title:"Lens / finish",items:[["bloomStrength","Bloom strength",0,2.8,.05,"×"],["bloomThreshold","Bloom threshold",.1,1.6,.02,""],["exposure","Exposure",.35,2.4,.02,"×"],["vignette","Vignette",0,.9,.01,"×"],["grain","Film grain",0,.8,.01,"×"],["chromatic","Chromatic dispersion",0,1,.01,"×"]]}];function OM(s){return typeof s=="number"&&Number.isFinite(s)}function kM(){const s=new URLSearchParams(window.location.search),e=s.get("capture")==="1",n=s.get("quality"),r=s.has("quality")?_i.includes(n)?n:Kr.quality:null,a=Number.parseInt(s.get("preset"),10),u=Number.parseInt(s.get("debug"),10),f=Number.parseFloat(s.get("time")),d=s.get("hud");return{capture:e,quality:r,preset:s.has("preset")?Number.isInteger(a)&&a>=0&&a<=3?a:0:null,debug:s.has("debug")?Number.isInteger(u)&&u>=0&&u<=9?u:0:null,time:Number.isFinite(f)&&f>=0?f:0,hud:s.has("hud")?d==="0"||d==="1"?d==="1":!0:null}}function zM(s){let e={};try{const r=localStorage.getItem(cg);r&&(e=JSON.parse(r))}catch{e={}}const n={...Kr,...e};if(_i.includes(n.quality)||(n.quality=Kr.quality),(!Number.isInteger(n.debug)||n.debug<0||n.debug>9)&&(n.debug=0),(!Number.isInteger(n.preset)||n.preset<0||n.preset>3)&&(n.preset=0),s.quality&&(n.quality=s.quality),s.preset!==null){const r=zf[s.preset];n.preset=s.preset,n.fov=r.fov,n.cameraDistance=r.distance,n.cameraAzimuth=r.azimuth,n.cameraElevation=r.elevation}return s.debug!==null&&(n.debug=s.debug),s.hud!==null&&(n.hud=s.hud),s.capture&&(n.playing=!1),n}function bm(s,e,n){const r=vr.degToRad(e),a=vr.degToRad(n);return new ee(Math.sin(r)*Math.cos(a)*s,Math.sin(a)*s,Math.cos(r)*Math.cos(a)*s)}function Pm(s,e){return Object.freeze({...s,ready:e})}function BM(s,e,n){const r=e<.1?2:e<1?1:0;return`${Number(s).toFixed(r)}${n}`}function Dm(s){return Math.min(window.devicePixelRatio||1,s==="standard"?.78:s==="high"?1.45:1.85)}function HM(){const s=Ut.useMemo(()=>kM(),[]),[e,n]=Ut.useState(()=>({...zM(s),time:s.capture?s.time:0})),r=Ut.useRef(e),a=Ut.useRef(s),u=Ut.useRef(null),f=Ut.useRef(null),d=Ut.useRef(null),m=Ut.useRef(null),p=Ut.useRef(null),_=Ut.useRef(null),v=Ut.useRef(0),x=Ut.useRef(s.capture?s.time:0),S=Ut.useRef(0),w=Ut.useRef(null),A=Ut.useRef(!1),y=Ut.useRef(!1),[g,F]=Ut.useState(!1),[L,b]=Ut.useState(!1),[H,z]=Ut.useState(""),[k,q]=Ut.useState(!1),R=Ut.useCallback(X=>{const j={...r.current,...X};return r.current=j,n(j),Pm(j,y.current)},[]),C=Ut.useCallback(X=>{if(!Number.isInteger(X)||X<0||X>3)return null;const j=zf[X];return _.current={distance:j.distance,azimuth:j.azimuth,elevation:j.elevation},R({preset:X,fov:j.fov,cameraDistance:j.distance,cameraAzimuth:j.azimuth,cameraElevation:j.elevation})},[R]),B=Ut.useCallback(()=>(x.current=a.current.capture?a.current.time:0,_.current={distance:Kr.cameraDistance,azimuth:Kr.cameraAzimuth,elevation:Kr.cameraElevation},R({...Kr,time:x.current})),[R]);Ut.useEffect(()=>{if(r.current=e,!a.current.capture)try{localStorage.setItem(cg,JSON.stringify(e))}catch{}},[e]),Ut.useEffect(()=>{const X={get ready(){return y.current},getState:()=>Pm(r.current,y.current),setQuality:j=>_i.includes(j)?R({quality:j}):null,setPreset:j=>C(j),setDebug:j=>Number.isInteger(j)&&j>=0&&j<=9?R({debug:j}):null,setTime:j=>OM(j)&&j>=0?(x.current=j,R({time:j,playing:!1})):null};return window.__GARGANTUA__=X,()=>{delete window.__GARGANTUA__}},[C,R]),Ut.useEffect(()=>{const X=u.current;if(!X)return;const j=new Qn(r.current.fov,1,.1,100);m.current=j,j.position.copy(bm(r.current.cameraDistance,r.current.cameraAzimuth,r.current.cameraElevation)),j.lookAt(0,0,0);const te=new SM(j,X);te.enableDamping=!0,te.dampingFactor=.08,te.enablePan=!1,te.minDistance=4.8,te.maxDistance=18,te.minPolarAngle=vr.degToRad(3),te.maxPolarAngle=vr.degToRad(87),te.target.set(0,0,0),p.current=te;const le=()=>{const xe=j.position,be=xe.length(),pe=vr.radToDeg(Math.atan2(xe.x,xe.z)),$=vr.radToDeg(Math.asin(vr.clamp(xe.y/be,-1,1))),Z=r.current;(Math.abs(Z.cameraDistance-be)>.004||Math.abs(Z.cameraAzimuth-pe)>.03||Math.abs(Z.cameraElevation-$)>.03)&&R({cameraDistance:be,cameraAzimuth:pe,cameraElevation:$})};te.addEventListener("change",le);const fe=()=>{f.current&&(f.current.dispose(),f.current=null);const xe=new xM({canvas:X,antialias:!1,alpha:!1,powerPreference:"high-performance"});xe.outputColorSpace=Vn,xe.setClearColor(131847,1);const be=new Er;be.setAttribute("position",new di(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));const pe={uResolution:{value:new ht(1,1)},uCameraPos:{value:j.position.clone()},uCameraTarget:{value:te.target.clone()},uFov:{value:r.current.fov},uTime:{value:0},uQuality:{value:_i.indexOf(r.current.quality)},uDebug:{value:r.current.debug},uDiskInner:{value:r.current.diskInner},uDiskOuter:{value:r.current.diskOuter},uDiskThickness:{value:r.current.diskThickness},uDiskTemperature:{value:r.current.diskTemperature},uEmission:{value:r.current.emission},uOrbitalVelocity:{value:r.current.orbitalVelocity},uTurbulence:{value:r.current.turbulence},uTurbulenceSpeed:{value:r.current.turbulenceSpeed},uStarDensity:{value:r.current.starDensity},uGalaxyBrightness:{value:r.current.galaxyBrightness},uBloomStrength:{value:r.current.bloomStrength},uBloomThreshold:{value:r.current.bloomThreshold},uExposure:{value:r.current.exposure},uVignette:{value:r.current.vignette},uGrain:{value:r.current.grain},uChromatic:{value:r.current.chromatic}},$=new Gi({uniforms:pe,vertexShader:IM,fragmentShader:UM,glslVersion:Of,depthTest:!1,depthWrite:!1}),Z=new C0;return Z.add(new Si(be,$)),f.current=xe,d.current=$,xe.compile(Z,j),{renderer:xe,scene:Z,geometry:be,material:$}};let U;try{U=fe()}catch(xe){z(xe instanceof Error?xe.message:"WebGL initialization failed")}const ue=()=>{const xe=f.current;if(!xe)return;const be=r.current.quality,pe=Dm(be),$=Math.max(1,window.innerWidth),Z=Math.max(1,window.innerHeight);xe.setPixelRatio(pe),xe.setSize($,Z,!1),j.aspect=$/Z,j.updateProjectionMatrix(),d.current&&d.current.uniforms.uResolution.value.set($*pe,Z*pe)};ue(),window.addEventListener("resize",ue);const ae=xe=>{xe.preventDefault(),A.current=!0,b(!0)},N=()=>{try{A.current=!1,U=fe(),w.current=null,ue(),b(!1),z("")}catch(xe){z(xe instanceof Error?xe.message:"WebGL restore failed")}};X.addEventListener("webglcontextlost",ae,!1),X.addEventListener("webglcontextrestored",N,!1);const re=xe=>{v.current=requestAnimationFrame(re);const be=Math.min((xe-S.current)/1e3||0,.08);S.current=xe;const pe=r.current,$=m.current;if(!a.current.capture&&pe.playing&&!A.current&&(x.current+=be*pe.timeScale),!pe.playing&&!a.current.capture&&(x.current=pe.time),_.current){const _e=_.current;$.position.copy(bm(_e.distance,_e.azimuth,_e.elevation)),te.target.set(0,0,0),te.update(),_.current=null}if(te.update(),!f.current||!d.current||A.current||!U)return;const Z=d.current.uniforms;if(w.current!==pe.quality){const _e=Dm(pe.quality);f.current.setPixelRatio(_e),f.current.setSize(window.innerWidth,window.innerHeight,!1),Z.uResolution.value.set(window.innerWidth*_e,window.innerHeight*_e),w.current=pe.quality}$.fov=pe.fov,$.updateProjectionMatrix(),Z.uCameraPos.value.copy($.position),Z.uCameraTarget.value.copy(te.target),Z.uFov.value=pe.fov,Z.uTime.value=a.current.capture?a.current.time:x.current,Z.uQuality.value=_i.indexOf(pe.quality),Z.uDebug.value=pe.debug,Z.uDiskInner.value=pe.diskInner,Z.uDiskOuter.value=Math.max(pe.diskOuter,pe.diskInner+.25),Z.uDiskThickness.value=pe.diskThickness,Z.uDiskTemperature.value=pe.diskTemperature,Z.uEmission.value=pe.emission,Z.uOrbitalVelocity.value=pe.orbitalVelocity,Z.uTurbulence.value=pe.turbulence,Z.uTurbulenceSpeed.value=pe.turbulenceSpeed,Z.uStarDensity.value=pe.starDensity,Z.uGalaxyBrightness.value=pe.galaxyBrightness,Z.uBloomStrength.value=pe.bloomStrength,Z.uBloomThreshold.value=pe.bloomThreshold,Z.uExposure.value=pe.exposure,Z.uVignette.value=pe.vignette,Z.uGrain.value=pe.grain,Z.uChromatic.value=pe.chromatic,f.current.render(U.scene,$),y.current||(y.current=!0,document.documentElement.dataset.gargantuaReady="true",F(!0)),!a.current.capture&&xe%200<18&&n(_e=>({..._e,time:x.current}))};return v.current=requestAnimationFrame(re),()=>{var xe,be,pe;cancelAnimationFrame(v.current),te.removeEventListener("change",le),te.dispose(),window.removeEventListener("resize",ue),X.removeEventListener("webglcontextlost",ae),X.removeEventListener("webglcontextrestored",N),(xe=U==null?void 0:U.geometry)==null||xe.dispose(),(be=U==null?void 0:U.material)==null||be.dispose(),(pe=f.current)==null||pe.dispose()}},[R]),Ut.useEffect(()=>{const X=j=>{if(!(j.target instanceof HTMLInputElement||j.target instanceof HTMLSelectElement)){if(j.key>="0"&&j.key<="9"){R({debug:Number(j.key)});return}if(j.shiftKey&&/^[1-4]$/.test(j.key)){j.preventDefault(),C(Number(j.key)-1);return}if(j.code==="Space")j.preventDefault(),R({playing:!r.current.playing});else if(j.key.toLowerCase()==="h")R({hud:!r.current.hud});else if(j.key.toLowerCase()==="r")B();else if(j.key.toLowerCase()==="q"){const te=(_i.indexOf(r.current.quality)+1)%_i.length;R({quality:_i[te]})}}};return window.addEventListener("keydown",X),()=>window.removeEventListener("keydown",X)},[C,R,B]);const ne=(X,j)=>{const te=Number(j);if(X==="cameraDistance"||X==="cameraAzimuth"||X==="cameraElevation"){const le={...r.current,[X]:te};_.current={distance:le.cameraDistance,azimuth:le.cameraAzimuth,elevation:le.cameraElevation}}return R({[X]:te})};return _i.indexOf(e.quality),Re.jsxs("main",{className:"app-shell",children:[Re.jsx("canvas",{ref:u,className:"ray-canvas","aria-label":"Interactive Schwarzschild black hole raytracer"}),Re.jsx("div",{className:"scanline","aria-hidden":"true"}),Re.jsxs("header",{className:`top-bar ${e.hud?"":"is-hidden"}`,children:[Re.jsxs("div",{className:"brand-lockup",children:[Re.jsx("span",{className:"brand-mark",children:"G"}),Re.jsxs("div",{children:[Re.jsx("p",{className:"eyebrow",children:"RELATIVITY LAB / 03"}),Re.jsx("h1",{children:"GARGANTUA"}),Re.jsx("p",{className:"subtitle",children:"SCHWARZSCHILD RAYTRACER"})]})]}),Re.jsxs("div",{className:"top-status",children:[Re.jsx("span",{className:"status-dot"}),Re.jsx("span",{children:L?"CONTEXT PAUSED":g?"LIVE SIMULATION":"COMPILING SHADER"}),Re.jsx("span",{className:"status-divider"}),Re.jsx("span",{children:e.quality.toUpperCase()})]})]}),Re.jsxs("section",{className:`side-panel ${e.hud?"":"is-hidden"} ${k?"mobile-open":""}`,"aria-label":"Raytracer controls",children:[Re.jsxs("div",{className:"panel-head",children:[Re.jsxs("div",{children:[Re.jsx("p",{className:"eyebrow",children:"CONTROL SURFACE"}),Re.jsx("h2",{children:"Observer rig"})]}),Re.jsx("button",{className:"icon-button mobile-only",type:"button","aria-label":"Close control panel",onClick:()=>q(!1),children:"×"})]}),Re.jsxs("div",{className:"panel-scroll",children:[Re.jsxs("div",{className:"control-section preset-section",children:[Re.jsxs("div",{className:"section-heading",children:[Re.jsx("span",{children:"01"}),Re.jsx("h3",{children:"Camera presets"})]}),Re.jsx("div",{className:"preset-grid",children:zf.map((X,j)=>Re.jsxs("button",{type:"button",className:`preset-button ${e.preset===j?"active":""}`,onClick:()=>C(j),children:[Re.jsxs("span",{className:"preset-index",children:["0",j+1]}),Re.jsx("span",{children:X.short})]},X.short))})]}),Re.jsxs("div",{className:"control-section",children:[Re.jsxs("div",{className:"section-heading",children:[Re.jsx("span",{children:"02"}),Re.jsx("h3",{children:"Simulation budget"})]}),Re.jsx("div",{className:"segmented-control",role:"group","aria-label":"Quality",children:_i.map(X=>Re.jsx("button",{type:"button",className:e.quality===X?"active":"",onClick:()=>R({quality:X}),children:X},X))}),Re.jsxs("div",{className:"debug-row",children:[Re.jsx("span",{children:"Diagnostic view"}),Re.jsx("select",{value:e.debug,onChange:X=>R({debug:Number(X.target.value)}),children:Cm.map((X,j)=>Re.jsxs("option",{value:j,children:[j," · ",X]},X))})]})]}),FM.map(X=>Re.jsxs("div",{className:"control-section",children:[Re.jsxs("div",{className:"section-heading",children:[Re.jsx("span",{children:X.title==="Camera"?"03":X.title==="Accretion disk"?"04":X.title==="Background"?"05":"06"}),Re.jsx("h3",{children:X.title})]}),X.items.map(([j,te,le,fe,U,ue])=>Re.jsxs("label",{className:"range-control",children:[Re.jsxs("span",{className:"range-label",children:[Re.jsx("span",{children:te}),Re.jsx("output",{children:BM(e[j],U,ue)})]}),Re.jsx("input",{type:"range",min:le,max:fe,step:U,value:e[j],onChange:ae=>ne(j,ae.target.value)})]},j))]},X.title)),Re.jsxs("div",{className:"control-section action-section",children:[Re.jsxs("div",{className:"section-heading",children:[Re.jsx("span",{children:"07"}),Re.jsx("h3",{children:"Transport"})]}),Re.jsxs("button",{type:"button",className:"transport-button",onClick:()=>R({playing:!e.playing}),children:[Re.jsx("span",{className:`transport-glyph ${e.playing?"pause":"play"}`,children:e.playing?"Ⅱ":"▶"}),Re.jsx("span",{children:e.playing?"Pause cinematic loop":"Resume cinematic loop"}),Re.jsx("kbd",{children:"SPACE"})]}),Re.jsxs("button",{type:"button",className:"transport-button subtle",onClick:B,children:[Re.jsx("span",{className:"transport-glyph",children:"↺"}),Re.jsx("span",{children:"Reset all parameters"}),Re.jsx("kbd",{children:"R"})]})]})]})]}),Re.jsxs("footer",{className:`bottom-bar ${e.hud?"":"is-hidden"}`,children:[Re.jsxs("div",{className:"telemetry",children:[Re.jsx("span",{children:"GEODESIC"}),Re.jsx("strong",{children:Cm[e.debug].toUpperCase()}),Re.jsx("span",{className:"telemetry-sep",children:"/"}),Re.jsxs("span",{children:["t = ",(s.capture?s.time:x.current).toFixed(2),"s"]})]}),Re.jsxs("div",{className:"shortcut-strip",children:[Re.jsxs("span",{children:[Re.jsx("kbd",{children:"0–9"})," DEBUG"]}),Re.jsxs("span",{children:[Re.jsx("kbd",{children:"⇧1–4"})," PRESETS"]}),Re.jsxs("span",{children:[Re.jsx("kbd",{children:"H"})," HUD"]}),Re.jsxs("span",{children:[Re.jsx("kbd",{children:"Q"})," QUALITY"]})]})]}),Re.jsxs("button",{type:"button",className:`mobile-panel-trigger ${e.hud&&!k?"":"is-hidden"}`,onClick:()=>q(!0),children:["CONTROLS ",Re.jsx("span",{children:"＋"})]}),Re.jsxs("button",{type:"button",className:`hud-toggle ${e.hud?"":"is-hidden"}`,onClick:()=>R({hud:!e.hud}),"aria-label":"Toggle HUD",children:["HIDE HUD ",Re.jsx("kbd",{children:"H"})]}),(L||H)&&Re.jsx("div",{className:"system-overlay",children:Re.jsxs("div",{className:"system-card",children:[Re.jsx("span",{className:"warning-symbol",children:"!"}),Re.jsx("p",{className:"eyebrow",children:L?"WEBGL CONTEXT LOST":"RENDERER ERROR"}),Re.jsx("h2",{children:L?"Rendering paused":"Shader unavailable"}),Re.jsx("p",{children:L?"Release the GPU resource to restore the live image. Your observer state is retained.":H}),L&&Re.jsx("span",{className:"system-hint",children:"Waiting for webglcontextrestored…"})]})})]})}Z_.createRoot(document.getElementById("root")).render(Re.jsx(HM,{}));
