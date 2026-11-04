(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();var Mc={exports:{}},Uo={},Ec={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Up;function rv(){if(Up)return mt;Up=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.iterator;function x(U){return U===null||typeof U!="object"?null:(U=v&&U[v]||U["@@iterator"],typeof U=="function"?U:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,A={};function y(U,ne,Fe){this.props=U,this.context=ne,this.refs=A,this.updater=Fe||S}y.prototype.isReactComponent={},y.prototype.setState=function(U,ne){if(typeof U!="object"&&typeof U!="function"&&U!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,U,ne,"setState")},y.prototype.forceUpdate=function(U){this.updater.enqueueForceUpdate(this,U,"forceUpdate")};function _(){}_.prototype=y.prototype;function F(U,ne,Fe){this.props=U,this.context=ne,this.refs=A,this.updater=Fe||S}var N=F.prototype=new _;N.constructor=F,w(N,y.prototype),N.isPureReactComponent=!0;var b=Array.isArray,z=Object.prototype.hasOwnProperty,k={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};function j(U,ne,Fe){var Xe,He={},J=null,ae=null;if(ne!=null)for(Xe in ne.ref!==void 0&&(ae=ne.ref),ne.key!==void 0&&(J=""+ne.key),ne)z.call(ne,Xe)&&!L.hasOwnProperty(Xe)&&(He[Xe]=ne[Xe]);var Se=arguments.length-2;if(Se===1)He.children=Fe;else if(1<Se){for(var Pe=Array(Se),Ne=0;Ne<Se;Ne++)Pe[Ne]=arguments[Ne+2];He.children=Pe}if(U&&U.defaultProps)for(Xe in Se=U.defaultProps,Se)He[Xe]===void 0&&(He[Xe]=Se[Xe]);return{$$typeof:s,type:U,key:J,ref:ae,props:He,_owner:k.current}}function R(U,ne){return{$$typeof:s,type:U.type,key:ne,ref:U.ref,props:U.props,_owner:U._owner}}function C(U){return typeof U=="object"&&U!==null&&U.$$typeof===s}function V(U){var ne={"=":"=0",":":"=2"};return"$"+U.replace(/[=:]/g,function(Fe){return ne[Fe]})}var Q=/\/+/g;function ie(U,ne){return typeof U=="object"&&U!==null&&U.key!=null?V(""+U.key):ne.toString(36)}function de(U,ne,Fe,Xe,He){var J=typeof U;(J==="undefined"||J==="boolean")&&(U=null);var ae=!1;if(U===null)ae=!0;else switch(J){case"string":case"number":ae=!0;break;case"object":switch(U.$$typeof){case s:case e:ae=!0}}if(ae)return ae=U,He=He(ae),U=Xe===""?"."+ie(ae,0):Xe,b(He)?(Fe="",U!=null&&(Fe=U.replace(Q,"$&/")+"/"),de(He,ne,Fe,"",function(Ne){return Ne})):He!=null&&(C(He)&&(He=R(He,Fe+(!He.key||ae&&ae.key===He.key?"":(""+He.key).replace(Q,"$&/")+"/")+U)),ne.push(He)),1;if(ae=0,Xe=Xe===""?".":Xe+":",b(U))for(var Se=0;Se<U.length;Se++){J=U[Se];var Pe=Xe+ie(J,Se);ae+=de(J,ne,Fe,Pe,He)}else if(Pe=x(U),typeof Pe=="function")for(U=Pe.call(U),Se=0;!(J=U.next()).done;)J=J.value,Pe=Xe+ie(J,Se++),ae+=de(J,ne,Fe,Pe,He);else if(J==="object")throw ne=String(U),Error("Objects are not valid as a React child (found: "+(ne==="[object Object]"?"object with keys {"+Object.keys(U).join(", ")+"}":ne)+"). If you meant to render a collection of children, use an array instead.");return ae}function ue(U,ne,Fe){if(U==null)return U;var Xe=[],He=0;return de(U,Xe,"","",function(J){return ne.call(Fe,J,He++)}),Xe}function le(U){if(U._status===-1){var ne=U._result;ne=ne(),ne.then(function(Fe){(U._status===0||U._status===-1)&&(U._status=1,U._result=Fe)},function(Fe){(U._status===0||U._status===-1)&&(U._status=2,U._result=Fe)}),U._status===-1&&(U._status=0,U._result=ne)}if(U._status===1)return U._result.default;throw U._result}var fe={current:null},B={transition:null},oe={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:B,ReactCurrentOwner:k};function re(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:ue,forEach:function(U,ne,Fe){ue(U,function(){ne.apply(this,arguments)},Fe)},count:function(U){var ne=0;return ue(U,function(){ne++}),ne},toArray:function(U){return ue(U,function(ne){return ne})||[]},only:function(U){if(!C(U))throw Error("React.Children.only expected to receive a single React element child.");return U}},mt.Component=y,mt.Fragment=n,mt.Profiler=a,mt.PureComponent=F,mt.StrictMode=r,mt.Suspense=h,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oe,mt.act=re,mt.cloneElement=function(U,ne,Fe){if(U==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+U+".");var Xe=w({},U.props),He=U.key,J=U.ref,ae=U._owner;if(ne!=null){if(ne.ref!==void 0&&(J=ne.ref,ae=k.current),ne.key!==void 0&&(He=""+ne.key),U.type&&U.type.defaultProps)var Se=U.type.defaultProps;for(Pe in ne)z.call(ne,Pe)&&!L.hasOwnProperty(Pe)&&(Xe[Pe]=ne[Pe]===void 0&&Se!==void 0?Se[Pe]:ne[Pe])}var Pe=arguments.length-2;if(Pe===1)Xe.children=Fe;else if(1<Pe){Se=Array(Pe);for(var Ne=0;Ne<Pe;Ne++)Se[Ne]=arguments[Ne+2];Xe.children=Se}return{$$typeof:s,type:U.type,key:He,ref:J,props:Xe,_owner:ae}},mt.createContext=function(U){return U={$$typeof:c,_currentValue:U,_currentValue2:U,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},U.Provider={$$typeof:l,_context:U},U.Consumer=U},mt.createElement=j,mt.createFactory=function(U){var ne=j.bind(null,U);return ne.type=U,ne},mt.createRef=function(){return{current:null}},mt.forwardRef=function(U){return{$$typeof:d,render:U}},mt.isValidElement=C,mt.lazy=function(U){return{$$typeof:g,_payload:{_status:-1,_result:U},_init:le}},mt.memo=function(U,ne){return{$$typeof:m,type:U,compare:ne===void 0?null:ne}},mt.startTransition=function(U){var ne=B.transition;B.transition={};try{U()}finally{B.transition=ne}},mt.unstable_act=re,mt.useCallback=function(U,ne){return fe.current.useCallback(U,ne)},mt.useContext=function(U){return fe.current.useContext(U)},mt.useDebugValue=function(){},mt.useDeferredValue=function(U){return fe.current.useDeferredValue(U)},mt.useEffect=function(U,ne){return fe.current.useEffect(U,ne)},mt.useId=function(){return fe.current.useId()},mt.useImperativeHandle=function(U,ne,Fe){return fe.current.useImperativeHandle(U,ne,Fe)},mt.useInsertionEffect=function(U,ne){return fe.current.useInsertionEffect(U,ne)},mt.useLayoutEffect=function(U,ne){return fe.current.useLayoutEffect(U,ne)},mt.useMemo=function(U,ne){return fe.current.useMemo(U,ne)},mt.useReducer=function(U,ne,Fe){return fe.current.useReducer(U,ne,Fe)},mt.useRef=function(U){return fe.current.useRef(U)},mt.useState=function(U){return fe.current.useState(U)},mt.useSyncExternalStore=function(U,ne,Fe){return fe.current.useSyncExternalStore(U,ne,Fe)},mt.useTransition=function(){return fe.current.useTransition()},mt.version="18.3.1",mt}var Ip;function Kf(){return Ip||(Ip=1,Ec.exports=rv()),Ec.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Np;function sv(){if(Np)return Uo;Np=1;var s=Kf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(d,h,m){var g,v={},x=null,S=null;m!==void 0&&(x=""+m),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(S=h.ref);for(g in h)r.call(h,g)&&!l.hasOwnProperty(g)&&(v[g]=h[g]);if(d&&d.defaultProps)for(g in h=d.defaultProps,h)v[g]===void 0&&(v[g]=h[g]);return{$$typeof:e,type:d,key:x,ref:S,props:v,_owner:a.current}}return Uo.Fragment=n,Uo.jsx=c,Uo.jsxs=c,Uo}var Fp;function ov(){return Fp||(Fp=1,Mc.exports=sv()),Mc.exports}var Ie=ov(),Io=Kf(),sl={},Tc={exports:{}},Ln={},wc={exports:{}},Ac={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Op;function av(){return Op||(Op=1,(function(s){function e(B,oe){var re=B.length;B.push(oe);e:for(;0<re;){var U=re-1>>>1,ne=B[U];if(0<a(ne,oe))B[U]=oe,B[re]=ne,re=U;else break e}}function n(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var oe=B[0],re=B.pop();if(re!==oe){B[0]=re;e:for(var U=0,ne=B.length,Fe=ne>>>1;U<Fe;){var Xe=2*(U+1)-1,He=B[Xe],J=Xe+1,ae=B[J];if(0>a(He,re))J<ne&&0>a(ae,He)?(B[U]=ae,B[J]=re,U=J):(B[U]=He,B[Xe]=re,U=Xe);else if(J<ne&&0>a(ae,re))B[U]=ae,B[J]=re,U=J;else break e}}return oe}function a(B,oe){var re=B.sortIndex-oe.sortIndex;return re!==0?re:B.id-oe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var c=Date,d=c.now();s.unstable_now=function(){return c.now()-d}}var h=[],m=[],g=1,v=null,x=3,S=!1,w=!1,A=!1,y=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function N(B){for(var oe=n(m);oe!==null;){if(oe.callback===null)r(m);else if(oe.startTime<=B)r(m),oe.sortIndex=oe.expirationTime,e(h,oe);else break;oe=n(m)}}function b(B){if(A=!1,N(B),!w)if(n(h)!==null)w=!0,le(z);else{var oe=n(m);oe!==null&&fe(b,oe.startTime-B)}}function z(B,oe){w=!1,A&&(A=!1,_(j),j=-1),S=!0;var re=x;try{for(N(oe),v=n(h);v!==null&&(!(v.expirationTime>oe)||B&&!V());){var U=v.callback;if(typeof U=="function"){v.callback=null,x=v.priorityLevel;var ne=U(v.expirationTime<=oe);oe=s.unstable_now(),typeof ne=="function"?v.callback=ne:v===n(h)&&r(h),N(oe)}else r(h);v=n(h)}if(v!==null)var Fe=!0;else{var Xe=n(m);Xe!==null&&fe(b,Xe.startTime-oe),Fe=!1}return Fe}finally{v=null,x=re,S=!1}}var k=!1,L=null,j=-1,R=5,C=-1;function V(){return!(s.unstable_now()-C<R)}function Q(){if(L!==null){var B=s.unstable_now();C=B;var oe=!0;try{oe=L(!0,B)}finally{oe?ie():(k=!1,L=null)}}else k=!1}var ie;if(typeof F=="function")ie=function(){F(Q)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,ue=de.port2;de.port1.onmessage=Q,ie=function(){ue.postMessage(null)}}else ie=function(){y(Q,0)};function le(B){L=B,k||(k=!0,ie())}function fe(B,oe){j=y(function(){B(s.unstable_now())},oe)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(B){B.callback=null},s.unstable_continueExecution=function(){w||S||(w=!0,le(z))},s.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<B?Math.floor(1e3/B):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(B){switch(x){case 1:case 2:case 3:var oe=3;break;default:oe=x}var re=x;x=oe;try{return B()}finally{x=re}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(B,oe){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var re=x;x=B;try{return oe()}finally{x=re}},s.unstable_scheduleCallback=function(B,oe,re){var U=s.unstable_now();switch(typeof re=="object"&&re!==null?(re=re.delay,re=typeof re=="number"&&0<re?U+re:U):re=U,B){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=re+ne,B={id:g++,callback:oe,priorityLevel:B,startTime:re,expirationTime:ne,sortIndex:-1},re>U?(B.sortIndex=re,e(m,B),n(h)===null&&B===n(m)&&(A?(_(j),j=-1):A=!0,fe(b,re-U))):(B.sortIndex=ne,e(h,B),w||S||(w=!0,le(z))),B},s.unstable_shouldYield=V,s.unstable_wrapCallback=function(B){var oe=x;return function(){var re=x;x=oe;try{return B.apply(this,arguments)}finally{x=re}}}})(Ac)),Ac}var kp;function lv(){return kp||(kp=1,wc.exports=av()),wc.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bp;function uv(){if(Bp)return Ln;Bp=1;var s=Kf(),e=lv();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(t,i){c(t,i),c(t+"Capture",i)}function c(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},v={};function x(t){return h.call(v,t)?!0:h.call(g,t)?!1:m.test(t)?v[t]=!0:(g[t]=!0,!1)}function S(t,i,o,u){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function w(t,i,o,u){if(i===null||typeof i>"u"||S(t,i,o,u))return!0;if(u)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function A(t,i,o,u,f,p,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=f,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=p,this.removeEmptyString=M}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){y[t]=new A(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];y[i]=new A(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){y[t]=new A(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){y[t]=new A(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){y[t]=new A(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){y[t]=new A(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){y[t]=new A(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){y[t]=new A(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){y[t]=new A(t,5,!1,t.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function F(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(_,F);y[i]=new A(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(_,F);y[i]=new A(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(_,F);y[i]=new A(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){y[t]=new A(t,1,!1,t.toLowerCase(),null,!1,!1)}),y.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){y[t]=new A(t,1,!1,t.toLowerCase(),null,!0,!0)});function N(t,i,o,u){var f=y.hasOwnProperty(i)?y[i]:null;(f!==null?f.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(w(i,o,f,u)&&(o=null),u||f===null?x(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):f.mustUseProperty?t[f.propertyName]=o===null?f.type===3?!1:"":o:(i=f.attributeName,u=f.attributeNamespace,o===null?t.removeAttribute(i):(f=f.type,o=f===3||f===4&&o===!0?"":""+o,u?t.setAttributeNS(u,i,o):t.setAttribute(i,o))))}var b=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,z=Symbol.for("react.element"),k=Symbol.for("react.portal"),L=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),V=Symbol.for("react.context"),Q=Symbol.for("react.forward_ref"),ie=Symbol.for("react.suspense"),de=Symbol.for("react.suspense_list"),ue=Symbol.for("react.memo"),le=Symbol.for("react.lazy"),fe=Symbol.for("react.offscreen"),B=Symbol.iterator;function oe(t){return t===null||typeof t!="object"?null:(t=B&&t[B]||t["@@iterator"],typeof t=="function"?t:null)}var re=Object.assign,U;function ne(t){if(U===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);U=i&&i[1]||""}return`
`+U+t}var Fe=!1;function Xe(t,i){if(!t||Fe)return"";Fe=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(Z){var u=Z}Reflect.construct(t,[],i)}else{try{i.call()}catch(Z){u=Z}t.call(i.prototype)}else{try{throw Error()}catch(Z){u=Z}t()}}catch(Z){if(Z&&u&&typeof Z.stack=="string"){for(var f=Z.stack.split(`
`),p=u.stack.split(`
`),M=f.length-1,D=p.length-1;1<=M&&0<=D&&f[M]!==p[D];)D--;for(;1<=M&&0<=D;M--,D--)if(f[M]!==p[D]){if(M!==1||D!==1)do if(M--,D--,0>D||f[M]!==p[D]){var O=`
`+f[M].replace(" at new "," at ");return t.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",t.displayName)),O}while(1<=M&&0<=D);break}}}finally{Fe=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?ne(t):""}function He(t){switch(t.tag){case 5:return ne(t.type);case 16:return ne("Lazy");case 13:return ne("Suspense");case 19:return ne("SuspenseList");case 0:case 2:case 15:return t=Xe(t.type,!1),t;case 11:return t=Xe(t.type.render,!1),t;case 1:return t=Xe(t.type,!0),t;default:return""}}function J(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case L:return"Fragment";case k:return"Portal";case R:return"Profiler";case j:return"StrictMode";case ie:return"Suspense";case de:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case V:return(t.displayName||"Context")+".Consumer";case C:return(t._context.displayName||"Context")+".Provider";case Q:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ue:return i=t.displayName||null,i!==null?i:J(t.type)||"Memo";case le:i=t._payload,t=t._init;try{return J(t(i))}catch{}}return null}function ae(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return J(i);case 8:return i===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Se(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Pe(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ne(t){var i=Pe(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),u=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var f=o.get,p=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(M){u=""+M,p.call(this,M)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return u},setValue:function(M){u=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function pt(t){t._valueTracker||(t._valueTracker=Ne(t))}function $t(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),u="";return t&&(u=Pe(t)?t.checked?"true":"false":t.value),t=u,t!==o?(i.setValue(t),!0):!1}function I(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ct(t,i){var o=i.checked;return re({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function ct(t,i){var o=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;o=Se(i.value!=null?i.value:o),t._wrapperState={initialChecked:u,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function nt(t,i){i=i.checked,i!=null&&N(t,"checked",i,!1)}function Ve(t,i){nt(t,i);var o=Se(i.value),u=i.type;if(o!=null)u==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(u==="submit"||u==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?Ge(t,i.type,o):i.hasOwnProperty("defaultValue")&&Ge(t,i.type,Se(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function Lt(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function Ge(t,i,o){(i!=="number"||I(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var lt=Array.isArray;function Ot(t,i,o,u){if(t=t.options,i){i={};for(var f=0;f<o.length;f++)i["$"+o[f]]=!0;for(o=0;o<t.length;o++)f=i.hasOwnProperty("$"+t[o].value),t[o].selected!==f&&(t[o].selected=f),f&&u&&(t[o].defaultSelected=!0)}else{for(o=""+Se(o),i=null,f=0;f<t.length;f++){if(t[f].value===o){t[f].selected=!0,u&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function kt(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return re({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function P(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(lt(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:Se(o)}}function E(t,i){var o=Se(i.value),u=Se(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),u!=null&&(t.defaultValue=""+u)}function q(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function ce(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function me(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?ce(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var se,Ke=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,u,f){MSApp.execUnsafeLocalFunction(function(){return t(i,o,u,f)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(se=se||document.createElement("div"),se.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=se.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function Te(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var ke={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$e=["Webkit","ms","Moz","O"];Object.keys(ke).forEach(function(t){$e.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),ke[i]=ke[t]})});function Me(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||ke.hasOwnProperty(t)&&ke[t]?(""+i).trim():i+"px"}function be(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var u=o.indexOf("--")===0,f=Me(o,i[o],u);o==="float"&&(o="cssFloat"),u?t.setProperty(o,f):t[o]=f}}var it=re({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ye(t,i){if(i){if(it[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function Ae(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ft=null;function H(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var xe=null,we=null,De=null;function ve(t){if(t=vo(t)){if(typeof xe!="function")throw Error(n(280));var i=t.stateNode;i&&(i=ya(i),xe(t.stateNode,t.type,i))}}function he(t){we?De?De.push(t):De=[t]:we=t}function We(){if(we){var t=we,i=De;if(De=we=null,ve(t),i)for(t=0;t<i.length;t++)ve(i[t])}}function ut(t,i){return t(i)}function At(){}var xt=!1;function Wn(t,i,o){if(xt)return t(i,o);xt=!0;try{return ut(t,i,o)}finally{xt=!1,(we!==null||De!==null)&&(At(),We())}}function fn(t,i){var o=t.stateNode;if(o===null)return null;var u=ya(o);if(u===null)return null;o=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(t=t.type,u=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!u;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var ts=!1;if(d)try{var Fn={};Object.defineProperty(Fn,"passive",{get:function(){ts=!0}}),window.addEventListener("test",Fn,Fn),window.removeEventListener("test",Fn,Fn)}catch{ts=!1}function eo(t,i,o,u,f,p,M,D,O){var Z=Array.prototype.slice.call(arguments,3);try{i.apply(o,Z)}catch(ge){this.onError(ge)}}var $i=!1,Tr=null,Ti=!1,ns=null,is={onError:function(t){$i=!0,Tr=t}};function Jo(t,i,o,u,f,p,M,D,O){$i=!1,Tr=null,eo.apply(is,arguments)}function ea(t,i,o,u,f,p,M,D,O){if(Jo.apply(this,arguments),$i){if($i){var Z=Tr;$i=!1,Tr=null}else throw Error(n(198));Ti||(Ti=!0,ns=Z)}}function wi(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function ta(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function na(t){if(wi(t)!==t)throw Error(n(188))}function Xl(t){var i=t.alternate;if(!i){if(i=wi(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,u=i;;){var f=o.return;if(f===null)break;var p=f.alternate;if(p===null){if(u=f.return,u!==null){o=u;continue}break}if(f.child===p.child){for(p=f.child;p;){if(p===o)return na(f),t;if(p===u)return na(f),i;p=p.sibling}throw Error(n(188))}if(o.return!==u.return)o=f,u=p;else{for(var M=!1,D=f.child;D;){if(D===o){M=!0,o=f,u=p;break}if(D===u){M=!0,u=f,o=p;break}D=D.sibling}if(!M){for(D=p.child;D;){if(D===o){M=!0,o=p,u=f;break}if(D===u){M=!0,u=p,o=f;break}D=D.sibling}if(!M)throw Error(n(189))}}if(o.alternate!==u)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function ia(t){return t=Xl(t),t!==null?ra(t):null}function ra(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=ra(t);if(i!==null)return i;t=t.sibling}return null}var T=e.unstable_scheduleCallback,X=e.unstable_cancelCallback,ee=e.unstable_shouldYield,te=e.unstable_requestPaint,W=e.unstable_now,ye=e.unstable_getCurrentPriorityLevel,Re=e.unstable_ImmediatePriority,Be=e.unstable_UserBlockingPriority,Le=e.unstable_NormalPriority,tt=e.unstable_LowPriority,rt=e.unstable_IdlePriority,Ze=null,ot=null;function wt(t){if(ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Ze,t,void 0,(t.current.flags&128)===128)}catch{}}var yt=Math.clz32?Math.clz32:Qe,Ut=Math.log,Rt=Math.LN2;function Qe(t){return t>>>=0,t===0?32:31-(Ut(t)/Rt|0)|0}var bt=64,_t=4194304;function Zt(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ti(t,i){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,p=t.pingedLanes,M=o&268435455;if(M!==0){var D=M&~f;D!==0?u=Zt(D):(p&=M,p!==0&&(u=Zt(p)))}else M=o&~f,M!==0?u=Zt(M):p!==0&&(u=Zt(p));if(u===0)return 0;if(i!==0&&i!==u&&(i&f)===0&&(f=u&-u,p=i&-i,f>=p||f===16&&(p&4194240)!==0))return i;if((u&4)!==0&&(u|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=u;0<i;)o=31-yt(i),f=1<<o,u|=t[o],i&=~f;return u}function yn(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wr(t,i){for(var o=t.suspendedLanes,u=t.pingedLanes,f=t.expirationTimes,p=t.pendingLanes;0<p;){var M=31-yt(p),D=1<<M,O=f[M];O===-1?((D&o)===0||(D&u)!==0)&&(f[M]=yn(D,i)):O<=i&&(t.expiredLanes|=D),p&=~D}}function It(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Sn(){var t=bt;return bt<<=1,(bt&4194240)===0&&(bt=64),t}function dn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function Xt(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-yt(i),t[i]=o}function hn(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var u=t.eventTimes;for(t=t.expirationTimes;0<o;){var f=31-yt(o),p=1<<f;i[f]=0,u[f]=-1,t[f]=-1,o&=~p}}function Ar(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var u=31-yt(o),f=1<<u;f&i|t[u]&i&&(t[u]|=i),o&=~f}}var vt=0;function fd(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var dd,jl,hd,pd,md,Yl=!1,sa=[],Zi=null,Qi=null,Ji=null,to=new Map,no=new Map,er=[],Ag="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gd(t,i){switch(t){case"focusin":case"focusout":Zi=null;break;case"dragenter":case"dragleave":Qi=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":to.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":no.delete(i.pointerId)}}function io(t,i,o,u,f,p){return t===null||t.nativeEvent!==p?(t={blockedOn:i,domEventName:o,eventSystemFlags:u,nativeEvent:p,targetContainers:[f]},i!==null&&(i=vo(i),i!==null&&jl(i)),t):(t.eventSystemFlags|=u,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function Rg(t,i,o,u,f){switch(i){case"focusin":return Zi=io(Zi,t,i,o,u,f),!0;case"dragenter":return Qi=io(Qi,t,i,o,u,f),!0;case"mouseover":return Ji=io(Ji,t,i,o,u,f),!0;case"pointerover":var p=f.pointerId;return to.set(p,io(to.get(p)||null,t,i,o,u,f)),!0;case"gotpointercapture":return p=f.pointerId,no.set(p,io(no.get(p)||null,t,i,o,u,f)),!0}return!1}function _d(t){var i=Rr(t.target);if(i!==null){var o=wi(i);if(o!==null){if(i=o.tag,i===13){if(i=ta(o),i!==null){t.blockedOn=i,md(t.priority,function(){hd(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function oa(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Kl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var u=new o.constructor(o.type,o);ft=u,o.target.dispatchEvent(u),ft=null}else return i=vo(o),i!==null&&jl(i),t.blockedOn=o,!1;i.shift()}return!0}function vd(t,i,o){oa(t)&&o.delete(i)}function Cg(){Yl=!1,Zi!==null&&oa(Zi)&&(Zi=null),Qi!==null&&oa(Qi)&&(Qi=null),Ji!==null&&oa(Ji)&&(Ji=null),to.forEach(vd),no.forEach(vd)}function ro(t,i){t.blockedOn===i&&(t.blockedOn=null,Yl||(Yl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Cg)))}function so(t){function i(f){return ro(f,t)}if(0<sa.length){ro(sa[0],t);for(var o=1;o<sa.length;o++){var u=sa[o];u.blockedOn===t&&(u.blockedOn=null)}}for(Zi!==null&&ro(Zi,t),Qi!==null&&ro(Qi,t),Ji!==null&&ro(Ji,t),to.forEach(i),no.forEach(i),o=0;o<er.length;o++)u=er[o],u.blockedOn===t&&(u.blockedOn=null);for(;0<er.length&&(o=er[0],o.blockedOn===null);)_d(o),o.blockedOn===null&&er.shift()}var rs=b.ReactCurrentBatchConfig,aa=!0;function bg(t,i,o,u){var f=vt,p=rs.transition;rs.transition=null;try{vt=1,ql(t,i,o,u)}finally{vt=f,rs.transition=p}}function Pg(t,i,o,u){var f=vt,p=rs.transition;rs.transition=null;try{vt=4,ql(t,i,o,u)}finally{vt=f,rs.transition=p}}function ql(t,i,o,u){if(aa){var f=Kl(t,i,o,u);if(f===null)du(t,i,u,la,o),gd(t,u);else if(Rg(f,t,i,o,u))u.stopPropagation();else if(gd(t,u),i&4&&-1<Ag.indexOf(t)){for(;f!==null;){var p=vo(f);if(p!==null&&dd(p),p=Kl(t,i,o,u),p===null&&du(t,i,u,la,o),p===f)break;f=p}f!==null&&u.stopPropagation()}else du(t,i,u,null,o)}}var la=null;function Kl(t,i,o,u){if(la=null,t=H(u),t=Rr(t),t!==null)if(i=wi(t),i===null)t=null;else if(o=i.tag,o===13){if(t=ta(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return la=t,null}function xd(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ye()){case Re:return 1;case Be:return 4;case Le:case tt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var tr=null,$l=null,ua=null;function yd(){if(ua)return ua;var t,i=$l,o=i.length,u,f="value"in tr?tr.value:tr.textContent,p=f.length;for(t=0;t<o&&i[t]===f[t];t++);var M=o-t;for(u=1;u<=M&&i[o-u]===f[p-u];u++);return ua=f.slice(t,1<u?1-u:void 0)}function ca(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function fa(){return!0}function Sd(){return!1}function On(t){function i(o,u,f,p,M){this._reactName=o,this._targetInst=f,this.type=u,this.nativeEvent=p,this.target=M,this.currentTarget=null;for(var D in t)t.hasOwnProperty(D)&&(o=t[D],this[D]=o?o(p):p[D]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?fa:Sd,this.isPropagationStopped=Sd,this}return re(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=fa)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=fa)},persist:function(){},isPersistent:fa}),i}var ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zl=On(ss),oo=re({},ss,{view:0,detail:0}),Dg=On(oo),Ql,Jl,ao,da=re({},oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ao&&(ao&&t.type==="mousemove"?(Ql=t.screenX-ao.screenX,Jl=t.screenY-ao.screenY):Jl=Ql=0,ao=t),Ql)},movementY:function(t){return"movementY"in t?t.movementY:Jl}}),Md=On(da),Lg=re({},da,{dataTransfer:0}),Ug=On(Lg),Ig=re({},oo,{relatedTarget:0}),eu=On(Ig),Ng=re({},ss,{animationName:0,elapsedTime:0,pseudoElement:0}),Fg=On(Ng),Og=re({},ss,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),kg=On(Og),Bg=re({},ss,{data:0}),Ed=On(Bg),zg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gg(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Vg[t])?!!i[t]:!1}function tu(){return Gg}var Wg=re({},oo,{key:function(t){if(t.key){var i=zg[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=ca(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Hg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tu,charCode:function(t){return t.type==="keypress"?ca(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ca(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Xg=On(Wg),jg=re({},da,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=On(jg),Yg=re({},oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tu}),qg=On(Yg),Kg=re({},ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),$g=On(Kg),Zg=re({},da,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Qg=On(Zg),Jg=[9,13,27,32],nu=d&&"CompositionEvent"in window,lo=null;d&&"documentMode"in document&&(lo=document.documentMode);var e_=d&&"TextEvent"in window&&!lo,wd=d&&(!nu||lo&&8<lo&&11>=lo),Ad=" ",Rd=!1;function Cd(t,i){switch(t){case"keyup":return Jg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bd(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var os=!1;function t_(t,i){switch(t){case"compositionend":return bd(i);case"keypress":return i.which!==32?null:(Rd=!0,Ad);case"textInput":return t=i.data,t===Ad&&Rd?null:t;default:return null}}function n_(t,i){if(os)return t==="compositionend"||!nu&&Cd(t,i)?(t=yd(),ua=$l=tr=null,os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return wd&&i.locale!=="ko"?null:i.data;default:return null}}var i_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pd(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!i_[t.type]:i==="textarea"}function Dd(t,i,o,u){he(u),i=_a(i,"onChange"),0<i.length&&(o=new Zl("onChange","change",null,o,u),t.push({event:o,listeners:i}))}var uo=null,co=null;function r_(t){Kd(t,0)}function ha(t){var i=fs(t);if($t(i))return t}function s_(t,i){if(t==="change")return i}var Ld=!1;if(d){var iu;if(d){var ru="oninput"in document;if(!ru){var Ud=document.createElement("div");Ud.setAttribute("oninput","return;"),ru=typeof Ud.oninput=="function"}iu=ru}else iu=!1;Ld=iu&&(!document.documentMode||9<document.documentMode)}function Id(){uo&&(uo.detachEvent("onpropertychange",Nd),co=uo=null)}function Nd(t){if(t.propertyName==="value"&&ha(co)){var i=[];Dd(i,co,t,H(t)),Wn(r_,i)}}function o_(t,i,o){t==="focusin"?(Id(),uo=i,co=o,uo.attachEvent("onpropertychange",Nd)):t==="focusout"&&Id()}function a_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ha(co)}function l_(t,i){if(t==="click")return ha(i)}function u_(t,i){if(t==="input"||t==="change")return ha(i)}function c_(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ni=typeof Object.is=="function"?Object.is:c_;function fo(t,i){if(ni(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),u=Object.keys(i);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var f=o[u];if(!h.call(i,f)||!ni(t[f],i[f]))return!1}return!0}function Fd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Od(t,i){var o=Fd(t);t=0;for(var u;o;){if(o.nodeType===3){if(u=t+o.textContent.length,t<=i&&u>=i)return{node:o,offset:i-t};t=u}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Fd(o)}}function kd(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?kd(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Bd(){for(var t=window,i=I();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=I(t.document)}return i}function su(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function f_(t){var i=Bd(),o=t.focusedElem,u=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&kd(o.ownerDocument.documentElement,o)){if(u!==null&&su(o)){if(i=u.start,t=u.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var f=o.textContent.length,p=Math.min(u.start,f);u=u.end===void 0?p:Math.min(u.end,f),!t.extend&&p>u&&(f=u,u=p,p=f),f=Od(o,p);var M=Od(o,u);f&&M&&(t.rangeCount!==1||t.anchorNode!==f.node||t.anchorOffset!==f.offset||t.focusNode!==M.node||t.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(f.node,f.offset),t.removeAllRanges(),p>u?(t.addRange(i),t.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var d_=d&&"documentMode"in document&&11>=document.documentMode,as=null,ou=null,ho=null,au=!1;function zd(t,i,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;au||as==null||as!==I(u)||(u=as,"selectionStart"in u&&su(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),ho&&fo(ho,u)||(ho=u,u=_a(ou,"onSelect"),0<u.length&&(i=new Zl("onSelect","select",null,i,o),t.push({event:i,listeners:u}),i.target=as)))}function pa(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var ls={animationend:pa("Animation","AnimationEnd"),animationiteration:pa("Animation","AnimationIteration"),animationstart:pa("Animation","AnimationStart"),transitionend:pa("Transition","TransitionEnd")},lu={},Hd={};d&&(Hd=document.createElement("div").style,"AnimationEvent"in window||(delete ls.animationend.animation,delete ls.animationiteration.animation,delete ls.animationstart.animation),"TransitionEvent"in window||delete ls.transitionend.transition);function ma(t){if(lu[t])return lu[t];if(!ls[t])return t;var i=ls[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in Hd)return lu[t]=i[o];return t}var Vd=ma("animationend"),Gd=ma("animationiteration"),Wd=ma("animationstart"),Xd=ma("transitionend"),jd=new Map,Yd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(t,i){jd.set(t,i),l(i,[t])}for(var uu=0;uu<Yd.length;uu++){var cu=Yd[uu],h_=cu.toLowerCase(),p_=cu[0].toUpperCase()+cu.slice(1);nr(h_,"on"+p_)}nr(Vd,"onAnimationEnd"),nr(Gd,"onAnimationIteration"),nr(Wd,"onAnimationStart"),nr("dblclick","onDoubleClick"),nr("focusin","onFocus"),nr("focusout","onBlur"),nr(Xd,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),m_=new Set("cancel close invalid load scroll toggle".split(" ").concat(po));function qd(t,i,o){var u=t.type||"unknown-event";t.currentTarget=o,ea(u,i,void 0,t),t.currentTarget=null}function Kd(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var u=t[o],f=u.event;u=u.listeners;e:{var p=void 0;if(i)for(var M=u.length-1;0<=M;M--){var D=u[M],O=D.instance,Z=D.currentTarget;if(D=D.listener,O!==p&&f.isPropagationStopped())break e;qd(f,D,Z),p=O}else for(M=0;M<u.length;M++){if(D=u[M],O=D.instance,Z=D.currentTarget,D=D.listener,O!==p&&f.isPropagationStopped())break e;qd(f,D,Z),p=O}}}if(Ti)throw t=ns,Ti=!1,ns=null,t}function Bt(t,i){var o=i[vu];o===void 0&&(o=i[vu]=new Set);var u=t+"__bubble";o.has(u)||($d(i,t,2,!1),o.add(u))}function fu(t,i,o){var u=0;i&&(u|=4),$d(o,t,u,i)}var ga="_reactListening"+Math.random().toString(36).slice(2);function mo(t){if(!t[ga]){t[ga]=!0,r.forEach(function(o){o!=="selectionchange"&&(m_.has(o)||fu(o,!1,t),fu(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[ga]||(i[ga]=!0,fu("selectionchange",!1,i))}}function $d(t,i,o,u){switch(xd(i)){case 1:var f=bg;break;case 4:f=Pg;break;default:f=ql}o=f.bind(null,i,o,t),f=void 0,!ts||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),u?f!==void 0?t.addEventListener(i,o,{capture:!0,passive:f}):t.addEventListener(i,o,!0):f!==void 0?t.addEventListener(i,o,{passive:f}):t.addEventListener(i,o,!1)}function du(t,i,o,u,f){var p=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var M=u.tag;if(M===3||M===4){var D=u.stateNode.containerInfo;if(D===f||D.nodeType===8&&D.parentNode===f)break;if(M===4)for(M=u.return;M!==null;){var O=M.tag;if((O===3||O===4)&&(O=M.stateNode.containerInfo,O===f||O.nodeType===8&&O.parentNode===f))return;M=M.return}for(;D!==null;){if(M=Rr(D),M===null)return;if(O=M.tag,O===5||O===6){u=p=M;continue e}D=D.parentNode}}u=u.return}Wn(function(){var Z=p,ge=H(o),_e=[];e:{var pe=jd.get(t);if(pe!==void 0){var Ue=Zl,ze=t;switch(t){case"keypress":if(ca(o)===0)break e;case"keydown":case"keyup":Ue=Xg;break;case"focusin":ze="focus",Ue=eu;break;case"focusout":ze="blur",Ue=eu;break;case"beforeblur":case"afterblur":Ue=eu;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ue=Md;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ue=Ug;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ue=qg;break;case Vd:case Gd:case Wd:Ue=Fg;break;case Xd:Ue=$g;break;case"scroll":Ue=Dg;break;case"wheel":Ue=Qg;break;case"copy":case"cut":case"paste":Ue=kg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ue=Td}var je=(i&4)!==0,jt=!je&&t==="scroll",Y=je?pe!==null?pe+"Capture":null:pe;je=[];for(var G=Z,$;G!==null;){$=G;var Ee=$.stateNode;if($.tag===5&&Ee!==null&&($=Ee,Y!==null&&(Ee=fn(G,Y),Ee!=null&&je.push(go(G,Ee,$)))),jt)break;G=G.return}0<je.length&&(pe=new Ue(pe,ze,null,o,ge),_e.push({event:pe,listeners:je}))}}if((i&7)===0){e:{if(pe=t==="mouseover"||t==="pointerover",Ue=t==="mouseout"||t==="pointerout",pe&&o!==ft&&(ze=o.relatedTarget||o.fromElement)&&(Rr(ze)||ze[Ai]))break e;if((Ue||pe)&&(pe=ge.window===ge?ge:(pe=ge.ownerDocument)?pe.defaultView||pe.parentWindow:window,Ue?(ze=o.relatedTarget||o.toElement,Ue=Z,ze=ze?Rr(ze):null,ze!==null&&(jt=wi(ze),ze!==jt||ze.tag!==5&&ze.tag!==6)&&(ze=null)):(Ue=null,ze=Z),Ue!==ze)){if(je=Md,Ee="onMouseLeave",Y="onMouseEnter",G="mouse",(t==="pointerout"||t==="pointerover")&&(je=Td,Ee="onPointerLeave",Y="onPointerEnter",G="pointer"),jt=Ue==null?pe:fs(Ue),$=ze==null?pe:fs(ze),pe=new je(Ee,G+"leave",Ue,o,ge),pe.target=jt,pe.relatedTarget=$,Ee=null,Rr(ge)===Z&&(je=new je(Y,G+"enter",ze,o,ge),je.target=$,je.relatedTarget=jt,Ee=je),jt=Ee,Ue&&ze)t:{for(je=Ue,Y=ze,G=0,$=je;$;$=us($))G++;for($=0,Ee=Y;Ee;Ee=us(Ee))$++;for(;0<G-$;)je=us(je),G--;for(;0<$-G;)Y=us(Y),$--;for(;G--;){if(je===Y||Y!==null&&je===Y.alternate)break t;je=us(je),Y=us(Y)}je=null}else je=null;Ue!==null&&Zd(_e,pe,Ue,je,!1),ze!==null&&jt!==null&&Zd(_e,jt,ze,je,!0)}}e:{if(pe=Z?fs(Z):window,Ue=pe.nodeName&&pe.nodeName.toLowerCase(),Ue==="select"||Ue==="input"&&pe.type==="file")var qe=s_;else if(Pd(pe))if(Ld)qe=u_;else{qe=a_;var Je=o_}else(Ue=pe.nodeName)&&Ue.toLowerCase()==="input"&&(pe.type==="checkbox"||pe.type==="radio")&&(qe=l_);if(qe&&(qe=qe(t,Z))){Dd(_e,qe,o,ge);break e}Je&&Je(t,pe,Z),t==="focusout"&&(Je=pe._wrapperState)&&Je.controlled&&pe.type==="number"&&Ge(pe,"number",pe.value)}switch(Je=Z?fs(Z):window,t){case"focusin":(Pd(Je)||Je.contentEditable==="true")&&(as=Je,ou=Z,ho=null);break;case"focusout":ho=ou=as=null;break;case"mousedown":au=!0;break;case"contextmenu":case"mouseup":case"dragend":au=!1,zd(_e,o,ge);break;case"selectionchange":if(d_)break;case"keydown":case"keyup":zd(_e,o,ge)}var et;if(nu)e:{switch(t){case"compositionstart":var at="onCompositionStart";break e;case"compositionend":at="onCompositionEnd";break e;case"compositionupdate":at="onCompositionUpdate";break e}at=void 0}else os?Cd(t,o)&&(at="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(at="onCompositionStart");at&&(wd&&o.locale!=="ko"&&(os||at!=="onCompositionStart"?at==="onCompositionEnd"&&os&&(et=yd()):(tr=ge,$l="value"in tr?tr.value:tr.textContent,os=!0)),Je=_a(Z,at),0<Je.length&&(at=new Ed(at,t,null,o,ge),_e.push({event:at,listeners:Je}),et?at.data=et:(et=bd(o),et!==null&&(at.data=et)))),(et=e_?t_(t,o):n_(t,o))&&(Z=_a(Z,"onBeforeInput"),0<Z.length&&(ge=new Ed("onBeforeInput","beforeinput",null,o,ge),_e.push({event:ge,listeners:Z}),ge.data=et))}Kd(_e,i)})}function go(t,i,o){return{instance:t,listener:i,currentTarget:o}}function _a(t,i){for(var o=i+"Capture",u=[];t!==null;){var f=t,p=f.stateNode;f.tag===5&&p!==null&&(f=p,p=fn(t,o),p!=null&&u.unshift(go(t,p,f)),p=fn(t,i),p!=null&&u.push(go(t,p,f))),t=t.return}return u}function us(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Zd(t,i,o,u,f){for(var p=i._reactName,M=[];o!==null&&o!==u;){var D=o,O=D.alternate,Z=D.stateNode;if(O!==null&&O===u)break;D.tag===5&&Z!==null&&(D=Z,f?(O=fn(o,p),O!=null&&M.unshift(go(o,O,D))):f||(O=fn(o,p),O!=null&&M.push(go(o,O,D)))),o=o.return}M.length!==0&&t.push({event:i,listeners:M})}var g_=/\r\n?/g,__=/\u0000|\uFFFD/g;function Qd(t){return(typeof t=="string"?t:""+t).replace(g_,`
`).replace(__,"")}function va(t,i,o){if(i=Qd(i),Qd(t)!==i&&o)throw Error(n(425))}function xa(){}var hu=null,pu=null;function mu(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var gu=typeof setTimeout=="function"?setTimeout:void 0,v_=typeof clearTimeout=="function"?clearTimeout:void 0,Jd=typeof Promise=="function"?Promise:void 0,x_=typeof queueMicrotask=="function"?queueMicrotask:typeof Jd<"u"?function(t){return Jd.resolve(null).then(t).catch(y_)}:gu;function y_(t){setTimeout(function(){throw t})}function _u(t,i){var o=i,u=0;do{var f=o.nextSibling;if(t.removeChild(o),f&&f.nodeType===8)if(o=f.data,o==="/$"){if(u===0){t.removeChild(f),so(i);return}u--}else o!=="$"&&o!=="$?"&&o!=="$!"||u++;o=f}while(o);so(i)}function ir(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function eh(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var cs=Math.random().toString(36).slice(2),gi="__reactFiber$"+cs,_o="__reactProps$"+cs,Ai="__reactContainer$"+cs,vu="__reactEvents$"+cs,S_="__reactListeners$"+cs,M_="__reactHandles$"+cs;function Rr(t){var i=t[gi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ai]||o[gi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=eh(t);t!==null;){if(o=t[gi])return o;t=eh(t)}return i}t=o,o=t.parentNode}return null}function vo(t){return t=t[gi]||t[Ai],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function fs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function ya(t){return t[_o]||null}var xu=[],ds=-1;function rr(t){return{current:t}}function zt(t){0>ds||(t.current=xu[ds],xu[ds]=null,ds--)}function Ft(t,i){ds++,xu[ds]=t.current,t.current=i}var sr={},pn=rr(sr),Rn=rr(!1),Cr=sr;function hs(t,i){var o=t.type.contextTypes;if(!o)return sr;var u=t.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var f={},p;for(p in o)f[p]=i[p];return u&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=f),f}function Cn(t){return t=t.childContextTypes,t!=null}function Sa(){zt(Rn),zt(pn)}function th(t,i,o){if(pn.current!==sr)throw Error(n(168));Ft(pn,i),Ft(Rn,o)}function nh(t,i,o){var u=t.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return o;u=u.getChildContext();for(var f in u)if(!(f in i))throw Error(n(108,ae(t)||"Unknown",f));return re({},o,u)}function Ma(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||sr,Cr=pn.current,Ft(pn,t),Ft(Rn,Rn.current),!0}function ih(t,i,o){var u=t.stateNode;if(!u)throw Error(n(169));o?(t=nh(t,i,Cr),u.__reactInternalMemoizedMergedChildContext=t,zt(Rn),zt(pn),Ft(pn,t)):zt(Rn),Ft(Rn,o)}var Ri=null,Ea=!1,yu=!1;function rh(t){Ri===null?Ri=[t]:Ri.push(t)}function E_(t){Ea=!0,rh(t)}function or(){if(!yu&&Ri!==null){yu=!0;var t=0,i=vt;try{var o=Ri;for(vt=1;t<o.length;t++){var u=o[t];do u=u(!0);while(u!==null)}Ri=null,Ea=!1}catch(f){throw Ri!==null&&(Ri=Ri.slice(t+1)),T(Re,or),f}finally{vt=i,yu=!1}}return null}var ps=[],ms=0,Ta=null,wa=0,Xn=[],jn=0,br=null,Ci=1,bi="";function Pr(t,i){ps[ms++]=wa,ps[ms++]=Ta,Ta=t,wa=i}function sh(t,i,o){Xn[jn++]=Ci,Xn[jn++]=bi,Xn[jn++]=br,br=t;var u=Ci;t=bi;var f=32-yt(u)-1;u&=~(1<<f),o+=1;var p=32-yt(i)+f;if(30<p){var M=f-f%5;p=(u&(1<<M)-1).toString(32),u>>=M,f-=M,Ci=1<<32-yt(i)+f|o<<f|u,bi=p+t}else Ci=1<<p|o<<f|u,bi=t}function Su(t){t.return!==null&&(Pr(t,1),sh(t,1,0))}function Mu(t){for(;t===Ta;)Ta=ps[--ms],ps[ms]=null,wa=ps[--ms],ps[ms]=null;for(;t===br;)br=Xn[--jn],Xn[jn]=null,bi=Xn[--jn],Xn[jn]=null,Ci=Xn[--jn],Xn[jn]=null}var kn=null,Bn=null,Ht=!1,ii=null;function oh(t,i){var o=$n(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function ah(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,kn=t,Bn=ir(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,kn=t,Bn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=br!==null?{id:Ci,overflow:bi}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=$n(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,kn=t,Bn=null,!0):!1;default:return!1}}function Eu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Tu(t){if(Ht){var i=Bn;if(i){var o=i;if(!ah(t,i)){if(Eu(t))throw Error(n(418));i=ir(o.nextSibling);var u=kn;i&&ah(t,i)?oh(u,o):(t.flags=t.flags&-4097|2,Ht=!1,kn=t)}}else{if(Eu(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ht=!1,kn=t}}}function lh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;kn=t}function Aa(t){if(t!==kn)return!1;if(!Ht)return lh(t),Ht=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!mu(t.type,t.memoizedProps)),i&&(i=Bn)){if(Eu(t))throw uh(),Error(n(418));for(;i;)oh(t,i),i=ir(i.nextSibling)}if(lh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){Bn=ir(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}Bn=null}}else Bn=kn?ir(t.stateNode.nextSibling):null;return!0}function uh(){for(var t=Bn;t;)t=ir(t.nextSibling)}function gs(){Bn=kn=null,Ht=!1}function wu(t){ii===null?ii=[t]:ii.push(t)}var T_=b.ReactCurrentBatchConfig;function xo(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var u=o.stateNode}if(!u)throw Error(n(147,t));var f=u,p=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(M){var D=f.refs;M===null?delete D[p]:D[p]=M},i._stringRef=p,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Ra(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function ch(t){var i=t._init;return i(t._payload)}function fh(t){function i(Y,G){if(t){var $=Y.deletions;$===null?(Y.deletions=[G],Y.flags|=16):$.push(G)}}function o(Y,G){if(!t)return null;for(;G!==null;)i(Y,G),G=G.sibling;return null}function u(Y,G){for(Y=new Map;G!==null;)G.key!==null?Y.set(G.key,G):Y.set(G.index,G),G=G.sibling;return Y}function f(Y,G){return Y=pr(Y,G),Y.index=0,Y.sibling=null,Y}function p(Y,G,$){return Y.index=$,t?($=Y.alternate,$!==null?($=$.index,$<G?(Y.flags|=2,G):$):(Y.flags|=2,G)):(Y.flags|=1048576,G)}function M(Y){return t&&Y.alternate===null&&(Y.flags|=2),Y}function D(Y,G,$,Ee){return G===null||G.tag!==6?(G=gc($,Y.mode,Ee),G.return=Y,G):(G=f(G,$),G.return=Y,G)}function O(Y,G,$,Ee){var qe=$.type;return qe===L?ge(Y,G,$.props.children,Ee,$.key):G!==null&&(G.elementType===qe||typeof qe=="object"&&qe!==null&&qe.$$typeof===le&&ch(qe)===G.type)?(Ee=f(G,$.props),Ee.ref=xo(Y,G,$),Ee.return=Y,Ee):(Ee=Za($.type,$.key,$.props,null,Y.mode,Ee),Ee.ref=xo(Y,G,$),Ee.return=Y,Ee)}function Z(Y,G,$,Ee){return G===null||G.tag!==4||G.stateNode.containerInfo!==$.containerInfo||G.stateNode.implementation!==$.implementation?(G=_c($,Y.mode,Ee),G.return=Y,G):(G=f(G,$.children||[]),G.return=Y,G)}function ge(Y,G,$,Ee,qe){return G===null||G.tag!==7?(G=kr($,Y.mode,Ee,qe),G.return=Y,G):(G=f(G,$),G.return=Y,G)}function _e(Y,G,$){if(typeof G=="string"&&G!==""||typeof G=="number")return G=gc(""+G,Y.mode,$),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case z:return $=Za(G.type,G.key,G.props,null,Y.mode,$),$.ref=xo(Y,null,G),$.return=Y,$;case k:return G=_c(G,Y.mode,$),G.return=Y,G;case le:var Ee=G._init;return _e(Y,Ee(G._payload),$)}if(lt(G)||oe(G))return G=kr(G,Y.mode,$,null),G.return=Y,G;Ra(Y,G)}return null}function pe(Y,G,$,Ee){var qe=G!==null?G.key:null;if(typeof $=="string"&&$!==""||typeof $=="number")return qe!==null?null:D(Y,G,""+$,Ee);if(typeof $=="object"&&$!==null){switch($.$$typeof){case z:return $.key===qe?O(Y,G,$,Ee):null;case k:return $.key===qe?Z(Y,G,$,Ee):null;case le:return qe=$._init,pe(Y,G,qe($._payload),Ee)}if(lt($)||oe($))return qe!==null?null:ge(Y,G,$,Ee,null);Ra(Y,$)}return null}function Ue(Y,G,$,Ee,qe){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return Y=Y.get($)||null,D(G,Y,""+Ee,qe);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case z:return Y=Y.get(Ee.key===null?$:Ee.key)||null,O(G,Y,Ee,qe);case k:return Y=Y.get(Ee.key===null?$:Ee.key)||null,Z(G,Y,Ee,qe);case le:var Je=Ee._init;return Ue(Y,G,$,Je(Ee._payload),qe)}if(lt(Ee)||oe(Ee))return Y=Y.get($)||null,ge(G,Y,Ee,qe,null);Ra(G,Ee)}return null}function ze(Y,G,$,Ee){for(var qe=null,Je=null,et=G,at=G=0,an=null;et!==null&&at<$.length;at++){et.index>at?(an=et,et=null):an=et.sibling;var Mt=pe(Y,et,$[at],Ee);if(Mt===null){et===null&&(et=an);break}t&&et&&Mt.alternate===null&&i(Y,et),G=p(Mt,G,at),Je===null?qe=Mt:Je.sibling=Mt,Je=Mt,et=an}if(at===$.length)return o(Y,et),Ht&&Pr(Y,at),qe;if(et===null){for(;at<$.length;at++)et=_e(Y,$[at],Ee),et!==null&&(G=p(et,G,at),Je===null?qe=et:Je.sibling=et,Je=et);return Ht&&Pr(Y,at),qe}for(et=u(Y,et);at<$.length;at++)an=Ue(et,Y,at,$[at],Ee),an!==null&&(t&&an.alternate!==null&&et.delete(an.key===null?at:an.key),G=p(an,G,at),Je===null?qe=an:Je.sibling=an,Je=an);return t&&et.forEach(function(mr){return i(Y,mr)}),Ht&&Pr(Y,at),qe}function je(Y,G,$,Ee){var qe=oe($);if(typeof qe!="function")throw Error(n(150));if($=qe.call($),$==null)throw Error(n(151));for(var Je=qe=null,et=G,at=G=0,an=null,Mt=$.next();et!==null&&!Mt.done;at++,Mt=$.next()){et.index>at?(an=et,et=null):an=et.sibling;var mr=pe(Y,et,Mt.value,Ee);if(mr===null){et===null&&(et=an);break}t&&et&&mr.alternate===null&&i(Y,et),G=p(mr,G,at),Je===null?qe=mr:Je.sibling=mr,Je=mr,et=an}if(Mt.done)return o(Y,et),Ht&&Pr(Y,at),qe;if(et===null){for(;!Mt.done;at++,Mt=$.next())Mt=_e(Y,Mt.value,Ee),Mt!==null&&(G=p(Mt,G,at),Je===null?qe=Mt:Je.sibling=Mt,Je=Mt);return Ht&&Pr(Y,at),qe}for(et=u(Y,et);!Mt.done;at++,Mt=$.next())Mt=Ue(et,Y,at,Mt.value,Ee),Mt!==null&&(t&&Mt.alternate!==null&&et.delete(Mt.key===null?at:Mt.key),G=p(Mt,G,at),Je===null?qe=Mt:Je.sibling=Mt,Je=Mt);return t&&et.forEach(function(iv){return i(Y,iv)}),Ht&&Pr(Y,at),qe}function jt(Y,G,$,Ee){if(typeof $=="object"&&$!==null&&$.type===L&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case z:e:{for(var qe=$.key,Je=G;Je!==null;){if(Je.key===qe){if(qe=$.type,qe===L){if(Je.tag===7){o(Y,Je.sibling),G=f(Je,$.props.children),G.return=Y,Y=G;break e}}else if(Je.elementType===qe||typeof qe=="object"&&qe!==null&&qe.$$typeof===le&&ch(qe)===Je.type){o(Y,Je.sibling),G=f(Je,$.props),G.ref=xo(Y,Je,$),G.return=Y,Y=G;break e}o(Y,Je);break}else i(Y,Je);Je=Je.sibling}$.type===L?(G=kr($.props.children,Y.mode,Ee,$.key),G.return=Y,Y=G):(Ee=Za($.type,$.key,$.props,null,Y.mode,Ee),Ee.ref=xo(Y,G,$),Ee.return=Y,Y=Ee)}return M(Y);case k:e:{for(Je=$.key;G!==null;){if(G.key===Je)if(G.tag===4&&G.stateNode.containerInfo===$.containerInfo&&G.stateNode.implementation===$.implementation){o(Y,G.sibling),G=f(G,$.children||[]),G.return=Y,Y=G;break e}else{o(Y,G);break}else i(Y,G);G=G.sibling}G=_c($,Y.mode,Ee),G.return=Y,Y=G}return M(Y);case le:return Je=$._init,jt(Y,G,Je($._payload),Ee)}if(lt($))return ze(Y,G,$,Ee);if(oe($))return je(Y,G,$,Ee);Ra(Y,$)}return typeof $=="string"&&$!==""||typeof $=="number"?($=""+$,G!==null&&G.tag===6?(o(Y,G.sibling),G=f(G,$),G.return=Y,Y=G):(o(Y,G),G=gc($,Y.mode,Ee),G.return=Y,Y=G),M(Y)):o(Y,G)}return jt}var _s=fh(!0),dh=fh(!1),Ca=rr(null),ba=null,vs=null,Au=null;function Ru(){Au=vs=ba=null}function Cu(t){var i=Ca.current;zt(Ca),t._currentValue=i}function bu(t,i,o){for(;t!==null;){var u=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),t===o)break;t=t.return}}function xs(t,i){ba=t,Au=vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(bn=!0),t.firstContext=null)}function Yn(t){var i=t._currentValue;if(Au!==t)if(t={context:t,memoizedValue:i,next:null},vs===null){if(ba===null)throw Error(n(308));vs=t,ba.dependencies={lanes:0,firstContext:t}}else vs=vs.next=t;return i}var Dr=null;function Pu(t){Dr===null?Dr=[t]:Dr.push(t)}function hh(t,i,o,u){var f=i.interleaved;return f===null?(o.next=o,Pu(i)):(o.next=f.next,f.next=o),i.interleaved=o,Pi(t,u)}function Pi(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var ar=!1;function Du(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ph(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Di(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function lr(t,i,o){var u=t.updateQueue;if(u===null)return null;if(u=u.shared,(St&2)!==0){var f=u.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),u.pending=i,Pi(t,o)}return f=u.interleaved,f===null?(i.next=i,Pu(u)):(i.next=f.next,f.next=i),u.interleaved=i,Pi(t,o)}function Pa(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var u=i.lanes;u&=t.pendingLanes,o|=u,i.lanes=o,Ar(t,o)}}function mh(t,i){var o=t.updateQueue,u=t.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var f=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var M={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?f=p=M:p=p.next=M,o=o.next}while(o!==null);p===null?f=p=i:p=p.next=i}else f=p=i;o={baseState:u.baseState,firstBaseUpdate:f,lastBaseUpdate:p,shared:u.shared,effects:u.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Da(t,i,o,u){var f=t.updateQueue;ar=!1;var p=f.firstBaseUpdate,M=f.lastBaseUpdate,D=f.shared.pending;if(D!==null){f.shared.pending=null;var O=D,Z=O.next;O.next=null,M===null?p=Z:M.next=Z,M=O;var ge=t.alternate;ge!==null&&(ge=ge.updateQueue,D=ge.lastBaseUpdate,D!==M&&(D===null?ge.firstBaseUpdate=Z:D.next=Z,ge.lastBaseUpdate=O))}if(p!==null){var _e=f.baseState;M=0,ge=Z=O=null,D=p;do{var pe=D.lane,Ue=D.eventTime;if((u&pe)===pe){ge!==null&&(ge=ge.next={eventTime:Ue,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var ze=t,je=D;switch(pe=i,Ue=o,je.tag){case 1:if(ze=je.payload,typeof ze=="function"){_e=ze.call(Ue,_e,pe);break e}_e=ze;break e;case 3:ze.flags=ze.flags&-65537|128;case 0:if(ze=je.payload,pe=typeof ze=="function"?ze.call(Ue,_e,pe):ze,pe==null)break e;_e=re({},_e,pe);break e;case 2:ar=!0}}D.callback!==null&&D.lane!==0&&(t.flags|=64,pe=f.effects,pe===null?f.effects=[D]:pe.push(D))}else Ue={eventTime:Ue,lane:pe,tag:D.tag,payload:D.payload,callback:D.callback,next:null},ge===null?(Z=ge=Ue,O=_e):ge=ge.next=Ue,M|=pe;if(D=D.next,D===null){if(D=f.shared.pending,D===null)break;pe=D,D=pe.next,pe.next=null,f.lastBaseUpdate=pe,f.shared.pending=null}}while(!0);if(ge===null&&(O=_e),f.baseState=O,f.firstBaseUpdate=Z,f.lastBaseUpdate=ge,i=f.shared.interleaved,i!==null){f=i;do M|=f.lane,f=f.next;while(f!==i)}else p===null&&(f.shared.lanes=0);Ir|=M,t.lanes=M,t.memoizedState=_e}}function gh(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var u=t[i],f=u.callback;if(f!==null){if(u.callback=null,u=o,typeof f!="function")throw Error(n(191,f));f.call(u)}}}var yo={},_i=rr(yo),So=rr(yo),Mo=rr(yo);function Lr(t){if(t===yo)throw Error(n(174));return t}function Lu(t,i){switch(Ft(Mo,i),Ft(So,t),Ft(_i,yo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:me(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=me(i,t)}zt(_i),Ft(_i,i)}function ys(){zt(_i),zt(So),zt(Mo)}function _h(t){Lr(Mo.current);var i=Lr(_i.current),o=me(i,t.type);i!==o&&(Ft(So,t),Ft(_i,o))}function Uu(t){So.current===t&&(zt(_i),zt(So))}var Vt=rr(0);function La(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Iu=[];function Nu(){for(var t=0;t<Iu.length;t++)Iu[t]._workInProgressVersionPrimary=null;Iu.length=0}var Ua=b.ReactCurrentDispatcher,Fu=b.ReactCurrentBatchConfig,Ur=0,Gt=null,Qt=null,sn=null,Ia=!1,Eo=!1,To=0,w_=0;function mn(){throw Error(n(321))}function Ou(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ni(t[o],i[o]))return!1;return!0}function ku(t,i,o,u,f,p){if(Ur=p,Gt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Ua.current=t===null||t.memoizedState===null?b_:P_,t=o(u,f),Eo){p=0;do{if(Eo=!1,To=0,25<=p)throw Error(n(301));p+=1,sn=Qt=null,i.updateQueue=null,Ua.current=D_,t=o(u,f)}while(Eo)}if(Ua.current=Oa,i=Qt!==null&&Qt.next!==null,Ur=0,sn=Qt=Gt=null,Ia=!1,i)throw Error(n(300));return t}function Bu(){var t=To!==0;return To=0,t}function vi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return sn===null?Gt.memoizedState=sn=t:sn=sn.next=t,sn}function qn(){if(Qt===null){var t=Gt.alternate;t=t!==null?t.memoizedState:null}else t=Qt.next;var i=sn===null?Gt.memoizedState:sn.next;if(i!==null)sn=i,Qt=t;else{if(t===null)throw Error(n(310));Qt=t,t={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},sn===null?Gt.memoizedState=sn=t:sn=sn.next=t}return sn}function wo(t,i){return typeof i=="function"?i(t):i}function zu(t){var i=qn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var u=Qt,f=u.baseQueue,p=o.pending;if(p!==null){if(f!==null){var M=f.next;f.next=p.next,p.next=M}u.baseQueue=f=p,o.pending=null}if(f!==null){p=f.next,u=u.baseState;var D=M=null,O=null,Z=p;do{var ge=Z.lane;if((Ur&ge)===ge)O!==null&&(O=O.next={lane:0,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null}),u=Z.hasEagerState?Z.eagerState:t(u,Z.action);else{var _e={lane:ge,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null};O===null?(D=O=_e,M=u):O=O.next=_e,Gt.lanes|=ge,Ir|=ge}Z=Z.next}while(Z!==null&&Z!==p);O===null?M=u:O.next=D,ni(u,i.memoizedState)||(bn=!0),i.memoizedState=u,i.baseState=M,i.baseQueue=O,o.lastRenderedState=u}if(t=o.interleaved,t!==null){f=t;do p=f.lane,Gt.lanes|=p,Ir|=p,f=f.next;while(f!==t)}else f===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Hu(t){var i=qn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var u=o.dispatch,f=o.pending,p=i.memoizedState;if(f!==null){o.pending=null;var M=f=f.next;do p=t(p,M.action),M=M.next;while(M!==f);ni(p,i.memoizedState)||(bn=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,u]}function vh(){}function xh(t,i){var o=Gt,u=qn(),f=i(),p=!ni(u.memoizedState,f);if(p&&(u.memoizedState=f,bn=!0),u=u.queue,Vu(Mh.bind(null,o,u,t),[t]),u.getSnapshot!==i||p||sn!==null&&sn.memoizedState.tag&1){if(o.flags|=2048,Ao(9,Sh.bind(null,o,u,f,i),void 0,null),on===null)throw Error(n(349));(Ur&30)!==0||yh(o,i,f)}return f}function yh(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function Sh(t,i,o,u){i.value=o,i.getSnapshot=u,Eh(i)&&Th(t)}function Mh(t,i,o){return o(function(){Eh(i)&&Th(t)})}function Eh(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ni(t,o)}catch{return!0}}function Th(t){var i=Pi(t,1);i!==null&&ai(i,t,1,-1)}function wh(t){var i=vi();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},i.queue=t,t=t.dispatch=C_.bind(null,Gt,t),[i.memoizedState,t]}function Ao(t,i,o,u){return t={tag:t,create:i,destroy:o,deps:u,next:null},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(u=o.next,o.next=t,t.next=u,i.lastEffect=t)),t}function Ah(){return qn().memoizedState}function Na(t,i,o,u){var f=vi();Gt.flags|=t,f.memoizedState=Ao(1|i,o,void 0,u===void 0?null:u)}function Fa(t,i,o,u){var f=qn();u=u===void 0?null:u;var p=void 0;if(Qt!==null){var M=Qt.memoizedState;if(p=M.destroy,u!==null&&Ou(u,M.deps)){f.memoizedState=Ao(i,o,p,u);return}}Gt.flags|=t,f.memoizedState=Ao(1|i,o,p,u)}function Rh(t,i){return Na(8390656,8,t,i)}function Vu(t,i){return Fa(2048,8,t,i)}function Ch(t,i){return Fa(4,2,t,i)}function bh(t,i){return Fa(4,4,t,i)}function Ph(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function Dh(t,i,o){return o=o!=null?o.concat([t]):null,Fa(4,4,Ph.bind(null,i,t),o)}function Gu(){}function Lh(t,i){var o=qn();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&Ou(i,u[1])?u[0]:(o.memoizedState=[t,i],t)}function Uh(t,i){var o=qn();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&Ou(i,u[1])?u[0]:(t=t(),o.memoizedState=[t,i],t)}function Ih(t,i,o){return(Ur&21)===0?(t.baseState&&(t.baseState=!1,bn=!0),t.memoizedState=o):(ni(o,i)||(o=Sn(),Gt.lanes|=o,Ir|=o,t.baseState=!0),i)}function A_(t,i){var o=vt;vt=o!==0&&4>o?o:4,t(!0);var u=Fu.transition;Fu.transition={};try{t(!1),i()}finally{vt=o,Fu.transition=u}}function Nh(){return qn().memoizedState}function R_(t,i,o){var u=dr(t);if(o={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null},Fh(t))Oh(i,o);else if(o=hh(t,i,o,u),o!==null){var f=En();ai(o,t,u,f),kh(o,i,u)}}function C_(t,i,o){var u=dr(t),f={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null};if(Fh(t))Oh(i,f);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var M=i.lastRenderedState,D=p(M,o);if(f.hasEagerState=!0,f.eagerState=D,ni(D,M)){var O=i.interleaved;O===null?(f.next=f,Pu(i)):(f.next=O.next,O.next=f),i.interleaved=f;return}}catch{}finally{}o=hh(t,i,f,u),o!==null&&(f=En(),ai(o,t,u,f),kh(o,i,u))}}function Fh(t){var i=t.alternate;return t===Gt||i!==null&&i===Gt}function Oh(t,i){Eo=Ia=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function kh(t,i,o){if((o&4194240)!==0){var u=i.lanes;u&=t.pendingLanes,o|=u,i.lanes=o,Ar(t,o)}}var Oa={readContext:Yn,useCallback:mn,useContext:mn,useEffect:mn,useImperativeHandle:mn,useInsertionEffect:mn,useLayoutEffect:mn,useMemo:mn,useReducer:mn,useRef:mn,useState:mn,useDebugValue:mn,useDeferredValue:mn,useTransition:mn,useMutableSource:mn,useSyncExternalStore:mn,useId:mn,unstable_isNewReconciler:!1},b_={readContext:Yn,useCallback:function(t,i){return vi().memoizedState=[t,i===void 0?null:i],t},useContext:Yn,useEffect:Rh,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Na(4194308,4,Ph.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Na(4194308,4,t,i)},useInsertionEffect:function(t,i){return Na(4,2,t,i)},useMemo:function(t,i){var o=vi();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var u=vi();return i=o!==void 0?o(i):i,u.memoizedState=u.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},u.queue=t,t=t.dispatch=R_.bind(null,Gt,t),[u.memoizedState,t]},useRef:function(t){var i=vi();return t={current:t},i.memoizedState=t},useState:wh,useDebugValue:Gu,useDeferredValue:function(t){return vi().memoizedState=t},useTransition:function(){var t=wh(!1),i=t[0];return t=A_.bind(null,t[1]),vi().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var u=Gt,f=vi();if(Ht){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),on===null)throw Error(n(349));(Ur&30)!==0||yh(u,i,o)}f.memoizedState=o;var p={value:o,getSnapshot:i};return f.queue=p,Rh(Mh.bind(null,u,p,t),[t]),u.flags|=2048,Ao(9,Sh.bind(null,u,p,o,i),void 0,null),o},useId:function(){var t=vi(),i=on.identifierPrefix;if(Ht){var o=bi,u=Ci;o=(u&~(1<<32-yt(u)-1)).toString(32)+o,i=":"+i+"R"+o,o=To++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=w_++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},P_={readContext:Yn,useCallback:Lh,useContext:Yn,useEffect:Vu,useImperativeHandle:Dh,useInsertionEffect:Ch,useLayoutEffect:bh,useMemo:Uh,useReducer:zu,useRef:Ah,useState:function(){return zu(wo)},useDebugValue:Gu,useDeferredValue:function(t){var i=qn();return Ih(i,Qt.memoizedState,t)},useTransition:function(){var t=zu(wo)[0],i=qn().memoizedState;return[t,i]},useMutableSource:vh,useSyncExternalStore:xh,useId:Nh,unstable_isNewReconciler:!1},D_={readContext:Yn,useCallback:Lh,useContext:Yn,useEffect:Vu,useImperativeHandle:Dh,useInsertionEffect:Ch,useLayoutEffect:bh,useMemo:Uh,useReducer:Hu,useRef:Ah,useState:function(){return Hu(wo)},useDebugValue:Gu,useDeferredValue:function(t){var i=qn();return Qt===null?i.memoizedState=t:Ih(i,Qt.memoizedState,t)},useTransition:function(){var t=Hu(wo)[0],i=qn().memoizedState;return[t,i]},useMutableSource:vh,useSyncExternalStore:xh,useId:Nh,unstable_isNewReconciler:!1};function ri(t,i){if(t&&t.defaultProps){i=re({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Wu(t,i,o,u){i=t.memoizedState,o=o(u,i),o=o==null?i:re({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var ka={isMounted:function(t){return(t=t._reactInternals)?wi(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var u=En(),f=dr(t),p=Di(u,f);p.payload=i,o!=null&&(p.callback=o),i=lr(t,p,f),i!==null&&(ai(i,t,f,u),Pa(i,t,f))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var u=En(),f=dr(t),p=Di(u,f);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=lr(t,p,f),i!==null&&(ai(i,t,f,u),Pa(i,t,f))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=En(),u=dr(t),f=Di(o,u);f.tag=2,i!=null&&(f.callback=i),i=lr(t,f,u),i!==null&&(ai(i,t,u,o),Pa(i,t,u))}};function Bh(t,i,o,u,f,p,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(u,p,M):i.prototype&&i.prototype.isPureReactComponent?!fo(o,u)||!fo(f,p):!0}function zh(t,i,o){var u=!1,f=sr,p=i.contextType;return typeof p=="object"&&p!==null?p=Yn(p):(f=Cn(i)?Cr:pn.current,u=i.contextTypes,p=(u=u!=null)?hs(t,f):sr),i=new i(o,p),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=ka,t.stateNode=i,i._reactInternals=t,u&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=f,t.__reactInternalMemoizedMaskedChildContext=p),i}function Hh(t,i,o,u){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,u),i.state!==t&&ka.enqueueReplaceState(i,i.state,null)}function Xu(t,i,o,u){var f=t.stateNode;f.props=o,f.state=t.memoizedState,f.refs={},Du(t);var p=i.contextType;typeof p=="object"&&p!==null?f.context=Yn(p):(p=Cn(i)?Cr:pn.current,f.context=hs(t,p)),f.state=t.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(Wu(t,i,p,o),f.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(i=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),i!==f.state&&ka.enqueueReplaceState(f,f.state,null),Da(t,o,f,u),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308)}function Ss(t,i){try{var o="",u=i;do o+=He(u),u=u.return;while(u);var f=o}catch(p){f=`
Error generating stack: `+p.message+`
`+p.stack}return{value:t,source:i,stack:f,digest:null}}function ju(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function Yu(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var L_=typeof WeakMap=="function"?WeakMap:Map;function Vh(t,i,o){o=Di(-1,o),o.tag=3,o.payload={element:null};var u=i.value;return o.callback=function(){Xa||(Xa=!0,lc=u),Yu(t,i)},o}function Gh(t,i,o){o=Di(-1,o),o.tag=3;var u=t.type.getDerivedStateFromError;if(typeof u=="function"){var f=i.value;o.payload=function(){return u(f)},o.callback=function(){Yu(t,i)}}var p=t.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){Yu(t,i),typeof u!="function"&&(cr===null?cr=new Set([this]):cr.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),o}function Wh(t,i,o){var u=t.pingCache;if(u===null){u=t.pingCache=new L_;var f=new Set;u.set(i,f)}else f=u.get(i),f===void 0&&(f=new Set,u.set(i,f));f.has(o)||(f.add(o),t=j_.bind(null,t,i,o),i.then(t,t))}function Xh(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function jh(t,i,o,u,f){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Di(-1,1),i.tag=2,lr(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=f,t)}var U_=b.ReactCurrentOwner,bn=!1;function Mn(t,i,o,u){i.child=t===null?dh(i,null,o,u):_s(i,t.child,o,u)}function Yh(t,i,o,u,f){o=o.render;var p=i.ref;return xs(i,f),u=ku(t,i,o,u,p,f),o=Bu(),t!==null&&!bn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~f,Li(t,i,f)):(Ht&&o&&Su(i),i.flags|=1,Mn(t,i,u,f),i.child)}function qh(t,i,o,u,f){if(t===null){var p=o.type;return typeof p=="function"&&!mc(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,Kh(t,i,p,u,f)):(t=Za(o.type,null,u,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(p=t.child,(t.lanes&f)===0){var M=p.memoizedProps;if(o=o.compare,o=o!==null?o:fo,o(M,u)&&t.ref===i.ref)return Li(t,i,f)}return i.flags|=1,t=pr(p,u),t.ref=i.ref,t.return=i,i.child=t}function Kh(t,i,o,u,f){if(t!==null){var p=t.memoizedProps;if(fo(p,u)&&t.ref===i.ref)if(bn=!1,i.pendingProps=u=p,(t.lanes&f)!==0)(t.flags&131072)!==0&&(bn=!0);else return i.lanes=t.lanes,Li(t,i,f)}return qu(t,i,o,u,f)}function $h(t,i,o){var u=i.pendingProps,f=u.children,p=t!==null?t.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ft(Es,zn),zn|=o;else{if((o&1073741824)===0)return t=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Ft(Es,zn),zn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=p!==null?p.baseLanes:o,Ft(Es,zn),zn|=u}else p!==null?(u=p.baseLanes|o,i.memoizedState=null):u=o,Ft(Es,zn),zn|=u;return Mn(t,i,f,o),i.child}function Zh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function qu(t,i,o,u,f){var p=Cn(o)?Cr:pn.current;return p=hs(i,p),xs(i,f),o=ku(t,i,o,u,p,f),u=Bu(),t!==null&&!bn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~f,Li(t,i,f)):(Ht&&u&&Su(i),i.flags|=1,Mn(t,i,o,f),i.child)}function Qh(t,i,o,u,f){if(Cn(o)){var p=!0;Ma(i)}else p=!1;if(xs(i,f),i.stateNode===null)za(t,i),zh(i,o,u),Xu(i,o,u,f),u=!0;else if(t===null){var M=i.stateNode,D=i.memoizedProps;M.props=D;var O=M.context,Z=o.contextType;typeof Z=="object"&&Z!==null?Z=Yn(Z):(Z=Cn(o)?Cr:pn.current,Z=hs(i,Z));var ge=o.getDerivedStateFromProps,_e=typeof ge=="function"||typeof M.getSnapshotBeforeUpdate=="function";_e||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(D!==u||O!==Z)&&Hh(i,M,u,Z),ar=!1;var pe=i.memoizedState;M.state=pe,Da(i,u,M,f),O=i.memoizedState,D!==u||pe!==O||Rn.current||ar?(typeof ge=="function"&&(Wu(i,o,ge,u),O=i.memoizedState),(D=ar||Bh(i,o,D,u,pe,O,Z))?(_e||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=O),M.props=u,M.state=O,M.context=Z,u=D):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{M=i.stateNode,ph(t,i),D=i.memoizedProps,Z=i.type===i.elementType?D:ri(i.type,D),M.props=Z,_e=i.pendingProps,pe=M.context,O=o.contextType,typeof O=="object"&&O!==null?O=Yn(O):(O=Cn(o)?Cr:pn.current,O=hs(i,O));var Ue=o.getDerivedStateFromProps;(ge=typeof Ue=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(D!==_e||pe!==O)&&Hh(i,M,u,O),ar=!1,pe=i.memoizedState,M.state=pe,Da(i,u,M,f);var ze=i.memoizedState;D!==_e||pe!==ze||Rn.current||ar?(typeof Ue=="function"&&(Wu(i,o,Ue,u),ze=i.memoizedState),(Z=ar||Bh(i,o,Z,u,pe,ze,O)||!1)?(ge||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(u,ze,O),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(u,ze,O)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||D===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=ze),M.props=u,M.state=ze,M.context=O,u=Z):(typeof M.componentDidUpdate!="function"||D===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),u=!1)}return Ku(t,i,o,u,p,f)}function Ku(t,i,o,u,f,p){Zh(t,i);var M=(i.flags&128)!==0;if(!u&&!M)return f&&ih(i,o,!1),Li(t,i,p);u=i.stateNode,U_.current=i;var D=M&&typeof o.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,t!==null&&M?(i.child=_s(i,t.child,null,p),i.child=_s(i,null,D,p)):Mn(t,i,D,p),i.memoizedState=u.state,f&&ih(i,o,!0),i.child}function Jh(t){var i=t.stateNode;i.pendingContext?th(t,i.pendingContext,i.pendingContext!==i.context):i.context&&th(t,i.context,!1),Lu(t,i.containerInfo)}function ep(t,i,o,u,f){return gs(),wu(f),i.flags|=256,Mn(t,i,o,u),i.child}var $u={dehydrated:null,treeContext:null,retryLane:0};function Zu(t){return{baseLanes:t,cachePool:null,transitions:null}}function tp(t,i,o){var u=i.pendingProps,f=Vt.current,p=!1,M=(i.flags&128)!==0,D;if((D=M)||(D=t!==null&&t.memoizedState===null?!1:(f&2)!==0),D?(p=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(f|=1),Ft(Vt,f&1),t===null)return Tu(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=u.children,t=u.fallback,p?(u=i.mode,p=i.child,M={mode:"hidden",children:M},(u&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=M):p=Qa(M,u,0,null),t=kr(t,u,o,null),p.return=i,t.return=i,p.sibling=t,i.child=p,i.child.memoizedState=Zu(o),i.memoizedState=$u,t):Qu(i,M));if(f=t.memoizedState,f!==null&&(D=f.dehydrated,D!==null))return I_(t,i,M,u,D,f,o);if(p){p=u.fallback,M=i.mode,f=t.child,D=f.sibling;var O={mode:"hidden",children:u.children};return(M&1)===0&&i.child!==f?(u=i.child,u.childLanes=0,u.pendingProps=O,i.deletions=null):(u=pr(f,O),u.subtreeFlags=f.subtreeFlags&14680064),D!==null?p=pr(D,p):(p=kr(p,M,o,null),p.flags|=2),p.return=i,u.return=i,u.sibling=p,i.child=u,u=p,p=i.child,M=t.child.memoizedState,M=M===null?Zu(o):{baseLanes:M.baseLanes|o,cachePool:null,transitions:M.transitions},p.memoizedState=M,p.childLanes=t.childLanes&~o,i.memoizedState=$u,u}return p=t.child,t=p.sibling,u=pr(p,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=o),u.return=i,u.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=u,i.memoizedState=null,u}function Qu(t,i){return i=Qa({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Ba(t,i,o,u){return u!==null&&wu(u),_s(i,t.child,null,o),t=Qu(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function I_(t,i,o,u,f,p,M){if(o)return i.flags&256?(i.flags&=-257,u=ju(Error(n(422))),Ba(t,i,M,u)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(p=u.fallback,f=i.mode,u=Qa({mode:"visible",children:u.children},f,0,null),p=kr(p,f,M,null),p.flags|=2,u.return=i,p.return=i,u.sibling=p,i.child=u,(i.mode&1)!==0&&_s(i,t.child,null,M),i.child.memoizedState=Zu(M),i.memoizedState=$u,p);if((i.mode&1)===0)return Ba(t,i,M,null);if(f.data==="$!"){if(u=f.nextSibling&&f.nextSibling.dataset,u)var D=u.dgst;return u=D,p=Error(n(419)),u=ju(p,u,void 0),Ba(t,i,M,u)}if(D=(M&t.childLanes)!==0,bn||D){if(u=on,u!==null){switch(M&-M){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(u.suspendedLanes|M))!==0?0:f,f!==0&&f!==p.retryLane&&(p.retryLane=f,Pi(t,f),ai(u,t,f,-1))}return pc(),u=ju(Error(n(421))),Ba(t,i,M,u)}return f.data==="$?"?(i.flags|=128,i.child=t.child,i=Y_.bind(null,t),f._reactRetry=i,null):(t=p.treeContext,Bn=ir(f.nextSibling),kn=i,Ht=!0,ii=null,t!==null&&(Xn[jn++]=Ci,Xn[jn++]=bi,Xn[jn++]=br,Ci=t.id,bi=t.overflow,br=i),i=Qu(i,u.children),i.flags|=4096,i)}function np(t,i,o){t.lanes|=i;var u=t.alternate;u!==null&&(u.lanes|=i),bu(t.return,i,o)}function Ju(t,i,o,u,f){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:f}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=u,p.tail=o,p.tailMode=f)}function ip(t,i,o){var u=i.pendingProps,f=u.revealOrder,p=u.tail;if(Mn(t,i,u.children,o),u=Vt.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&np(t,o,i);else if(t.tag===19)np(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}u&=1}if(Ft(Vt,u),(i.mode&1)===0)i.memoizedState=null;else switch(f){case"forwards":for(o=i.child,f=null;o!==null;)t=o.alternate,t!==null&&La(t)===null&&(f=o),o=o.sibling;o=f,o===null?(f=i.child,i.child=null):(f=o.sibling,o.sibling=null),Ju(i,!1,f,o,p);break;case"backwards":for(o=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&La(t)===null){i.child=f;break}t=f.sibling,f.sibling=o,o=f,f=t}Ju(i,!0,o,null,p);break;case"together":Ju(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function za(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Li(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Ir|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=pr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=pr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function N_(t,i,o){switch(i.tag){case 3:Jh(i),gs();break;case 5:_h(i);break;case 1:Cn(i.type)&&Ma(i);break;case 4:Lu(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,f=i.memoizedProps.value;Ft(Ca,u._currentValue),u._currentValue=f;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(Ft(Vt,Vt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?tp(t,i,o):(Ft(Vt,Vt.current&1),t=Li(t,i,o),t!==null?t.sibling:null);Ft(Vt,Vt.current&1);break;case 19:if(u=(o&i.childLanes)!==0,(t.flags&128)!==0){if(u)return ip(t,i,o);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Ft(Vt,Vt.current),u)break;return null;case 22:case 23:return i.lanes=0,$h(t,i,o)}return Li(t,i,o)}var rp,ec,sp,op;rp=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},ec=function(){},sp=function(t,i,o,u){var f=t.memoizedProps;if(f!==u){t=i.stateNode,Lr(_i.current);var p=null;switch(o){case"input":f=Ct(t,f),u=Ct(t,u),p=[];break;case"select":f=re({},f,{value:void 0}),u=re({},u,{value:void 0}),p=[];break;case"textarea":f=kt(t,f),u=kt(t,u),p=[];break;default:typeof f.onClick!="function"&&typeof u.onClick=="function"&&(t.onclick=xa)}Ye(o,u);var M;o=null;for(Z in f)if(!u.hasOwnProperty(Z)&&f.hasOwnProperty(Z)&&f[Z]!=null)if(Z==="style"){var D=f[Z];for(M in D)D.hasOwnProperty(M)&&(o||(o={}),o[M]="")}else Z!=="dangerouslySetInnerHTML"&&Z!=="children"&&Z!=="suppressContentEditableWarning"&&Z!=="suppressHydrationWarning"&&Z!=="autoFocus"&&(a.hasOwnProperty(Z)?p||(p=[]):(p=p||[]).push(Z,null));for(Z in u){var O=u[Z];if(D=f?.[Z],u.hasOwnProperty(Z)&&O!==D&&(O!=null||D!=null))if(Z==="style")if(D){for(M in D)!D.hasOwnProperty(M)||O&&O.hasOwnProperty(M)||(o||(o={}),o[M]="");for(M in O)O.hasOwnProperty(M)&&D[M]!==O[M]&&(o||(o={}),o[M]=O[M])}else o||(p||(p=[]),p.push(Z,o)),o=O;else Z==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,D=D?D.__html:void 0,O!=null&&D!==O&&(p=p||[]).push(Z,O)):Z==="children"?typeof O!="string"&&typeof O!="number"||(p=p||[]).push(Z,""+O):Z!=="suppressContentEditableWarning"&&Z!=="suppressHydrationWarning"&&(a.hasOwnProperty(Z)?(O!=null&&Z==="onScroll"&&Bt("scroll",t),p||D===O||(p=[])):(p=p||[]).push(Z,O))}o&&(p=p||[]).push("style",o);var Z=p;(i.updateQueue=Z)&&(i.flags|=4)}},op=function(t,i,o,u){o!==u&&(i.flags|=4)};function Ro(t,i){if(!Ht)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:u.sibling=null}}function gn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,u=0;if(i)for(var f=t.child;f!==null;)o|=f.lanes|f.childLanes,u|=f.subtreeFlags&14680064,u|=f.flags&14680064,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)o|=f.lanes|f.childLanes,u|=f.subtreeFlags,u|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=u,t.childLanes=o,i}function F_(t,i,o){var u=i.pendingProps;switch(Mu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gn(i),null;case 1:return Cn(i.type)&&Sa(),gn(i),null;case 3:return u=i.stateNode,ys(),zt(Rn),zt(pn),Nu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(t===null||t.child===null)&&(Aa(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(fc(ii),ii=null))),ec(t,i),gn(i),null;case 5:Uu(i);var f=Lr(Mo.current);if(o=i.type,t!==null&&i.stateNode!=null)sp(t,i,o,u,f),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(n(166));return gn(i),null}if(t=Lr(_i.current),Aa(i)){u=i.stateNode,o=i.type;var p=i.memoizedProps;switch(u[gi]=i,u[_o]=p,t=(i.mode&1)!==0,o){case"dialog":Bt("cancel",u),Bt("close",u);break;case"iframe":case"object":case"embed":Bt("load",u);break;case"video":case"audio":for(f=0;f<po.length;f++)Bt(po[f],u);break;case"source":Bt("error",u);break;case"img":case"image":case"link":Bt("error",u),Bt("load",u);break;case"details":Bt("toggle",u);break;case"input":ct(u,p),Bt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!p.multiple},Bt("invalid",u);break;case"textarea":P(u,p),Bt("invalid",u)}Ye(o,p),f=null;for(var M in p)if(p.hasOwnProperty(M)){var D=p[M];M==="children"?typeof D=="string"?u.textContent!==D&&(p.suppressHydrationWarning!==!0&&va(u.textContent,D,t),f=["children",D]):typeof D=="number"&&u.textContent!==""+D&&(p.suppressHydrationWarning!==!0&&va(u.textContent,D,t),f=["children",""+D]):a.hasOwnProperty(M)&&D!=null&&M==="onScroll"&&Bt("scroll",u)}switch(o){case"input":pt(u),Lt(u,p,!0);break;case"textarea":pt(u),q(u);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(u.onclick=xa)}u=f,i.updateQueue=u,u!==null&&(i.flags|=4)}else{M=f.nodeType===9?f:f.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ce(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=M.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof u.is=="string"?t=M.createElement(o,{is:u.is}):(t=M.createElement(o),o==="select"&&(M=t,u.multiple?M.multiple=!0:u.size&&(M.size=u.size))):t=M.createElementNS(t,o),t[gi]=i,t[_o]=u,rp(t,i,!1,!1),i.stateNode=t;e:{switch(M=Ae(o,u),o){case"dialog":Bt("cancel",t),Bt("close",t),f=u;break;case"iframe":case"object":case"embed":Bt("load",t),f=u;break;case"video":case"audio":for(f=0;f<po.length;f++)Bt(po[f],t);f=u;break;case"source":Bt("error",t),f=u;break;case"img":case"image":case"link":Bt("error",t),Bt("load",t),f=u;break;case"details":Bt("toggle",t),f=u;break;case"input":ct(t,u),f=Ct(t,u),Bt("invalid",t);break;case"option":f=u;break;case"select":t._wrapperState={wasMultiple:!!u.multiple},f=re({},u,{value:void 0}),Bt("invalid",t);break;case"textarea":P(t,u),f=kt(t,u),Bt("invalid",t);break;default:f=u}Ye(o,f),D=f;for(p in D)if(D.hasOwnProperty(p)){var O=D[p];p==="style"?be(t,O):p==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,O!=null&&Ke(t,O)):p==="children"?typeof O=="string"?(o!=="textarea"||O!=="")&&Te(t,O):typeof O=="number"&&Te(t,""+O):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?O!=null&&p==="onScroll"&&Bt("scroll",t):O!=null&&N(t,p,O,M))}switch(o){case"input":pt(t),Lt(t,u,!1);break;case"textarea":pt(t),q(t);break;case"option":u.value!=null&&t.setAttribute("value",""+Se(u.value));break;case"select":t.multiple=!!u.multiple,p=u.value,p!=null?Ot(t,!!u.multiple,p,!1):u.defaultValue!=null&&Ot(t,!!u.multiple,u.defaultValue,!0);break;default:typeof f.onClick=="function"&&(t.onclick=xa)}switch(o){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return gn(i),null;case 6:if(t&&i.stateNode!=null)op(t,i,t.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(n(166));if(o=Lr(Mo.current),Lr(_i.current),Aa(i)){if(u=i.stateNode,o=i.memoizedProps,u[gi]=i,(p=u.nodeValue!==o)&&(t=kn,t!==null))switch(t.tag){case 3:va(u.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&va(u.nodeValue,o,(t.mode&1)!==0)}p&&(i.flags|=4)}else u=(o.nodeType===9?o:o.ownerDocument).createTextNode(u),u[gi]=i,i.stateNode=u}return gn(i),null;case 13:if(zt(Vt),u=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ht&&Bn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)uh(),gs(),i.flags|=98560,p=!1;else if(p=Aa(i),u!==null&&u.dehydrated!==null){if(t===null){if(!p)throw Error(n(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(n(317));p[gi]=i}else gs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;gn(i),p=!1}else ii!==null&&(fc(ii),ii=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(u=u!==null,u!==(t!==null&&t.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(Vt.current&1)!==0?Jt===0&&(Jt=3):pc())),i.updateQueue!==null&&(i.flags|=4),gn(i),null);case 4:return ys(),ec(t,i),t===null&&mo(i.stateNode.containerInfo),gn(i),null;case 10:return Cu(i.type._context),gn(i),null;case 17:return Cn(i.type)&&Sa(),gn(i),null;case 19:if(zt(Vt),p=i.memoizedState,p===null)return gn(i),null;if(u=(i.flags&128)!==0,M=p.rendering,M===null)if(u)Ro(p,!1);else{if(Jt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(M=La(t),M!==null){for(i.flags|=128,Ro(p,!1),u=M.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=o,o=i.child;o!==null;)p=o,t=u,p.flags&=14680066,M=p.alternate,M===null?(p.childLanes=0,p.lanes=t,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=M.childLanes,p.lanes=M.lanes,p.child=M.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=M.memoizedProps,p.memoizedState=M.memoizedState,p.updateQueue=M.updateQueue,p.type=M.type,t=M.dependencies,p.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Ft(Vt,Vt.current&1|2),i.child}t=t.sibling}p.tail!==null&&W()>Ts&&(i.flags|=128,u=!0,Ro(p,!1),i.lanes=4194304)}else{if(!u)if(t=La(M),t!==null){if(i.flags|=128,u=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Ro(p,!0),p.tail===null&&p.tailMode==="hidden"&&!M.alternate&&!Ht)return gn(i),null}else 2*W()-p.renderingStartTime>Ts&&o!==1073741824&&(i.flags|=128,u=!0,Ro(p,!1),i.lanes=4194304);p.isBackwards?(M.sibling=i.child,i.child=M):(o=p.last,o!==null?o.sibling=M:i.child=M,p.last=M)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=W(),i.sibling=null,o=Vt.current,Ft(Vt,u?o&1|2:o&1),i):(gn(i),null);case 22:case 23:return hc(),u=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(zn&1073741824)!==0&&(gn(i),i.subtreeFlags&6&&(i.flags|=8192)):gn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function O_(t,i){switch(Mu(i),i.tag){case 1:return Cn(i.type)&&Sa(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ys(),zt(Rn),zt(pn),Nu(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Uu(i),null;case 13:if(zt(Vt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));gs()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return zt(Vt),null;case 4:return ys(),null;case 10:return Cu(i.type._context),null;case 22:case 23:return hc(),null;case 24:return null;default:return null}}var Ha=!1,_n=!1,k_=typeof WeakSet=="function"?WeakSet:Set,Oe=null;function Ms(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(u){Wt(t,i,u)}else o.current=null}function tc(t,i,o){try{o()}catch(u){Wt(t,i,u)}}var ap=!1;function B_(t,i){if(hu=aa,t=Bd(),su(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var f=u.anchorOffset,p=u.focusNode;u=u.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var M=0,D=-1,O=-1,Z=0,ge=0,_e=t,pe=null;t:for(;;){for(var Ue;_e!==o||f!==0&&_e.nodeType!==3||(D=M+f),_e!==p||u!==0&&_e.nodeType!==3||(O=M+u),_e.nodeType===3&&(M+=_e.nodeValue.length),(Ue=_e.firstChild)!==null;)pe=_e,_e=Ue;for(;;){if(_e===t)break t;if(pe===o&&++Z===f&&(D=M),pe===p&&++ge===u&&(O=M),(Ue=_e.nextSibling)!==null)break;_e=pe,pe=_e.parentNode}_e=Ue}o=D===-1||O===-1?null:{start:D,end:O}}else o=null}o=o||{start:0,end:0}}else o=null;for(pu={focusedElem:t,selectionRange:o},aa=!1,Oe=i;Oe!==null;)if(i=Oe,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,Oe=t;else for(;Oe!==null;){i=Oe;try{var ze=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(ze!==null){var je=ze.memoizedProps,jt=ze.memoizedState,Y=i.stateNode,G=Y.getSnapshotBeforeUpdate(i.elementType===i.type?je:ri(i.type,je),jt);Y.__reactInternalSnapshotBeforeUpdate=G}break;case 3:var $=i.stateNode.containerInfo;$.nodeType===1?$.textContent="":$.nodeType===9&&$.documentElement&&$.removeChild($.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Ee){Wt(i,i.return,Ee)}if(t=i.sibling,t!==null){t.return=i.return,Oe=t;break}Oe=i.return}return ze=ap,ap=!1,ze}function Co(t,i,o){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var f=u=u.next;do{if((f.tag&t)===t){var p=f.destroy;f.destroy=void 0,p!==void 0&&tc(i,o,p)}f=f.next}while(f!==u)}}function Va(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var u=o.create;o.destroy=u()}o=o.next}while(o!==i)}}function nc(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function lp(t){var i=t.alternate;i!==null&&(t.alternate=null,lp(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[gi],delete i[_o],delete i[vu],delete i[S_],delete i[M_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function up(t){return t.tag===5||t.tag===3||t.tag===4}function cp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||up(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ic(t,i,o){var u=t.tag;if(u===5||u===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=xa));else if(u!==4&&(t=t.child,t!==null))for(ic(t,i,o),t=t.sibling;t!==null;)ic(t,i,o),t=t.sibling}function rc(t,i,o){var u=t.tag;if(u===5||u===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(u!==4&&(t=t.child,t!==null))for(rc(t,i,o),t=t.sibling;t!==null;)rc(t,i,o),t=t.sibling}var un=null,si=!1;function ur(t,i,o){for(o=o.child;o!==null;)fp(t,i,o),o=o.sibling}function fp(t,i,o){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Ze,o)}catch{}switch(o.tag){case 5:_n||Ms(o,i);case 6:var u=un,f=si;un=null,ur(t,i,o),un=u,si=f,un!==null&&(si?(t=un,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):un.removeChild(o.stateNode));break;case 18:un!==null&&(si?(t=un,o=o.stateNode,t.nodeType===8?_u(t.parentNode,o):t.nodeType===1&&_u(t,o),so(t)):_u(un,o.stateNode));break;case 4:u=un,f=si,un=o.stateNode.containerInfo,si=!0,ur(t,i,o),un=u,si=f;break;case 0:case 11:case 14:case 15:if(!_n&&(u=o.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){f=u=u.next;do{var p=f,M=p.destroy;p=p.tag,M!==void 0&&((p&2)!==0||(p&4)!==0)&&tc(o,i,M),f=f.next}while(f!==u)}ur(t,i,o);break;case 1:if(!_n&&(Ms(o,i),u=o.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=o.memoizedProps,u.state=o.memoizedState,u.componentWillUnmount()}catch(D){Wt(o,i,D)}ur(t,i,o);break;case 21:ur(t,i,o);break;case 22:o.mode&1?(_n=(u=_n)||o.memoizedState!==null,ur(t,i,o),_n=u):ur(t,i,o);break;default:ur(t,i,o)}}function dp(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new k_),i.forEach(function(u){var f=q_.bind(null,t,u);o.has(u)||(o.add(u),u.then(f,f))})}}function oi(t,i){var o=i.deletions;if(o!==null)for(var u=0;u<o.length;u++){var f=o[u];try{var p=t,M=i,D=M;e:for(;D!==null;){switch(D.tag){case 5:un=D.stateNode,si=!1;break e;case 3:un=D.stateNode.containerInfo,si=!0;break e;case 4:un=D.stateNode.containerInfo,si=!0;break e}D=D.return}if(un===null)throw Error(n(160));fp(p,M,f),un=null,si=!1;var O=f.alternate;O!==null&&(O.return=null),f.return=null}catch(Z){Wt(f,i,Z)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)hp(i,t),i=i.sibling}function hp(t,i){var o=t.alternate,u=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(oi(i,t),xi(t),u&4){try{Co(3,t,t.return),Va(3,t)}catch(je){Wt(t,t.return,je)}try{Co(5,t,t.return)}catch(je){Wt(t,t.return,je)}}break;case 1:oi(i,t),xi(t),u&512&&o!==null&&Ms(o,o.return);break;case 5:if(oi(i,t),xi(t),u&512&&o!==null&&Ms(o,o.return),t.flags&32){var f=t.stateNode;try{Te(f,"")}catch(je){Wt(t,t.return,je)}}if(u&4&&(f=t.stateNode,f!=null)){var p=t.memoizedProps,M=o!==null?o.memoizedProps:p,D=t.type,O=t.updateQueue;if(t.updateQueue=null,O!==null)try{D==="input"&&p.type==="radio"&&p.name!=null&&nt(f,p),Ae(D,M);var Z=Ae(D,p);for(M=0;M<O.length;M+=2){var ge=O[M],_e=O[M+1];ge==="style"?be(f,_e):ge==="dangerouslySetInnerHTML"?Ke(f,_e):ge==="children"?Te(f,_e):N(f,ge,_e,Z)}switch(D){case"input":Ve(f,p);break;case"textarea":E(f,p);break;case"select":var pe=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!p.multiple;var Ue=p.value;Ue!=null?Ot(f,!!p.multiple,Ue,!1):pe!==!!p.multiple&&(p.defaultValue!=null?Ot(f,!!p.multiple,p.defaultValue,!0):Ot(f,!!p.multiple,p.multiple?[]:"",!1))}f[_o]=p}catch(je){Wt(t,t.return,je)}}break;case 6:if(oi(i,t),xi(t),u&4){if(t.stateNode===null)throw Error(n(162));f=t.stateNode,p=t.memoizedProps;try{f.nodeValue=p}catch(je){Wt(t,t.return,je)}}break;case 3:if(oi(i,t),xi(t),u&4&&o!==null&&o.memoizedState.isDehydrated)try{so(i.containerInfo)}catch(je){Wt(t,t.return,je)}break;case 4:oi(i,t),xi(t);break;case 13:oi(i,t),xi(t),f=t.child,f.flags&8192&&(p=f.memoizedState!==null,f.stateNode.isHidden=p,!p||f.alternate!==null&&f.alternate.memoizedState!==null||(ac=W())),u&4&&dp(t);break;case 22:if(ge=o!==null&&o.memoizedState!==null,t.mode&1?(_n=(Z=_n)||ge,oi(i,t),_n=Z):oi(i,t),xi(t),u&8192){if(Z=t.memoizedState!==null,(t.stateNode.isHidden=Z)&&!ge&&(t.mode&1)!==0)for(Oe=t,ge=t.child;ge!==null;){for(_e=Oe=ge;Oe!==null;){switch(pe=Oe,Ue=pe.child,pe.tag){case 0:case 11:case 14:case 15:Co(4,pe,pe.return);break;case 1:Ms(pe,pe.return);var ze=pe.stateNode;if(typeof ze.componentWillUnmount=="function"){u=pe,o=pe.return;try{i=u,ze.props=i.memoizedProps,ze.state=i.memoizedState,ze.componentWillUnmount()}catch(je){Wt(u,o,je)}}break;case 5:Ms(pe,pe.return);break;case 22:if(pe.memoizedState!==null){gp(_e);continue}}Ue!==null?(Ue.return=pe,Oe=Ue):gp(_e)}ge=ge.sibling}e:for(ge=null,_e=t;;){if(_e.tag===5){if(ge===null){ge=_e;try{f=_e.stateNode,Z?(p=f.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(D=_e.stateNode,O=_e.memoizedProps.style,M=O!=null&&O.hasOwnProperty("display")?O.display:null,D.style.display=Me("display",M))}catch(je){Wt(t,t.return,je)}}}else if(_e.tag===6){if(ge===null)try{_e.stateNode.nodeValue=Z?"":_e.memoizedProps}catch(je){Wt(t,t.return,je)}}else if((_e.tag!==22&&_e.tag!==23||_e.memoizedState===null||_e===t)&&_e.child!==null){_e.child.return=_e,_e=_e.child;continue}if(_e===t)break e;for(;_e.sibling===null;){if(_e.return===null||_e.return===t)break e;ge===_e&&(ge=null),_e=_e.return}ge===_e&&(ge=null),_e.sibling.return=_e.return,_e=_e.sibling}}break;case 19:oi(i,t),xi(t),u&4&&dp(t);break;case 21:break;default:oi(i,t),xi(t)}}function xi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(up(o)){var u=o;break e}o=o.return}throw Error(n(160))}switch(u.tag){case 5:var f=u.stateNode;u.flags&32&&(Te(f,""),u.flags&=-33);var p=cp(t);rc(t,p,f);break;case 3:case 4:var M=u.stateNode.containerInfo,D=cp(t);ic(t,D,M);break;default:throw Error(n(161))}}catch(O){Wt(t,t.return,O)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function z_(t,i,o){Oe=t,pp(t)}function pp(t,i,o){for(var u=(t.mode&1)!==0;Oe!==null;){var f=Oe,p=f.child;if(f.tag===22&&u){var M=f.memoizedState!==null||Ha;if(!M){var D=f.alternate,O=D!==null&&D.memoizedState!==null||_n;D=Ha;var Z=_n;if(Ha=M,(_n=O)&&!Z)for(Oe=f;Oe!==null;)M=Oe,O=M.child,M.tag===22&&M.memoizedState!==null?_p(f):O!==null?(O.return=M,Oe=O):_p(f);for(;p!==null;)Oe=p,pp(p),p=p.sibling;Oe=f,Ha=D,_n=Z}mp(t)}else(f.subtreeFlags&8772)!==0&&p!==null?(p.return=f,Oe=p):mp(t)}}function mp(t){for(;Oe!==null;){var i=Oe;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:_n||Va(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!_n)if(o===null)u.componentDidMount();else{var f=i.elementType===i.type?o.memoizedProps:ri(i.type,o.memoizedProps);u.componentDidUpdate(f,o.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&gh(i,p,u);break;case 3:var M=i.updateQueue;if(M!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}gh(i,M,o)}break;case 5:var D=i.stateNode;if(o===null&&i.flags&4){o=D;var O=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":O.autoFocus&&o.focus();break;case"img":O.src&&(o.src=O.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var Z=i.alternate;if(Z!==null){var ge=Z.memoizedState;if(ge!==null){var _e=ge.dehydrated;_e!==null&&so(_e)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}_n||i.flags&512&&nc(i)}catch(pe){Wt(i,i.return,pe)}}if(i===t){Oe=null;break}if(o=i.sibling,o!==null){o.return=i.return,Oe=o;break}Oe=i.return}}function gp(t){for(;Oe!==null;){var i=Oe;if(i===t){Oe=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Oe=o;break}Oe=i.return}}function _p(t){for(;Oe!==null;){var i=Oe;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Va(4,i)}catch(O){Wt(i,o,O)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var f=i.return;try{u.componentDidMount()}catch(O){Wt(i,f,O)}}var p=i.return;try{nc(i)}catch(O){Wt(i,p,O)}break;case 5:var M=i.return;try{nc(i)}catch(O){Wt(i,M,O)}}}catch(O){Wt(i,i.return,O)}if(i===t){Oe=null;break}var D=i.sibling;if(D!==null){D.return=i.return,Oe=D;break}Oe=i.return}}var H_=Math.ceil,Ga=b.ReactCurrentDispatcher,sc=b.ReactCurrentOwner,Kn=b.ReactCurrentBatchConfig,St=0,on=null,qt=null,cn=0,zn=0,Es=rr(0),Jt=0,bo=null,Ir=0,Wa=0,oc=0,Po=null,Pn=null,ac=0,Ts=1/0,Ui=null,Xa=!1,lc=null,cr=null,ja=!1,fr=null,Ya=0,Do=0,uc=null,qa=-1,Ka=0;function En(){return(St&6)!==0?W():qa!==-1?qa:qa=W()}function dr(t){return(t.mode&1)===0?1:(St&2)!==0&&cn!==0?cn&-cn:T_.transition!==null?(Ka===0&&(Ka=Sn()),Ka):(t=vt,t!==0||(t=window.event,t=t===void 0?16:xd(t.type)),t)}function ai(t,i,o,u){if(50<Do)throw Do=0,uc=null,Error(n(185));Xt(t,o,u),((St&2)===0||t!==on)&&(t===on&&((St&2)===0&&(Wa|=o),Jt===4&&hr(t,cn)),Dn(t,u),o===1&&St===0&&(i.mode&1)===0&&(Ts=W()+500,Ea&&or()))}function Dn(t,i){var o=t.callbackNode;wr(t,i);var u=ti(t,t===on?cn:0);if(u===0)o!==null&&X(o),t.callbackNode=null,t.callbackPriority=0;else if(i=u&-u,t.callbackPriority!==i){if(o!=null&&X(o),i===1)t.tag===0?E_(xp.bind(null,t)):rh(xp.bind(null,t)),x_(function(){(St&6)===0&&or()}),o=null;else{switch(fd(u)){case 1:o=Re;break;case 4:o=Be;break;case 16:o=Le;break;case 536870912:o=rt;break;default:o=Le}o=Rp(o,vp.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function vp(t,i){if(qa=-1,Ka=0,(St&6)!==0)throw Error(n(327));var o=t.callbackNode;if(ws()&&t.callbackNode!==o)return null;var u=ti(t,t===on?cn:0);if(u===0)return null;if((u&30)!==0||(u&t.expiredLanes)!==0||i)i=$a(t,u);else{i=u;var f=St;St|=2;var p=Sp();(on!==t||cn!==i)&&(Ui=null,Ts=W()+500,Fr(t,i));do try{W_();break}catch(D){yp(t,D)}while(!0);Ru(),Ga.current=p,St=f,qt!==null?i=0:(on=null,cn=0,i=Jt)}if(i!==0){if(i===2&&(f=It(t),f!==0&&(u=f,i=cc(t,f))),i===1)throw o=bo,Fr(t,0),hr(t,u),Dn(t,W()),o;if(i===6)hr(t,u);else{if(f=t.current.alternate,(u&30)===0&&!V_(f)&&(i=$a(t,u),i===2&&(p=It(t),p!==0&&(u=p,i=cc(t,p))),i===1))throw o=bo,Fr(t,0),hr(t,u),Dn(t,W()),o;switch(t.finishedWork=f,t.finishedLanes=u,i){case 0:case 1:throw Error(n(345));case 2:Or(t,Pn,Ui);break;case 3:if(hr(t,u),(u&130023424)===u&&(i=ac+500-W(),10<i)){if(ti(t,0)!==0)break;if(f=t.suspendedLanes,(f&u)!==u){En(),t.pingedLanes|=t.suspendedLanes&f;break}t.timeoutHandle=gu(Or.bind(null,t,Pn,Ui),i);break}Or(t,Pn,Ui);break;case 4:if(hr(t,u),(u&4194240)===u)break;for(i=t.eventTimes,f=-1;0<u;){var M=31-yt(u);p=1<<M,M=i[M],M>f&&(f=M),u&=~p}if(u=f,u=W()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*H_(u/1960))-u,10<u){t.timeoutHandle=gu(Or.bind(null,t,Pn,Ui),u);break}Or(t,Pn,Ui);break;case 5:Or(t,Pn,Ui);break;default:throw Error(n(329))}}}return Dn(t,W()),t.callbackNode===o?vp.bind(null,t):null}function cc(t,i){var o=Po;return t.current.memoizedState.isDehydrated&&(Fr(t,i).flags|=256),t=$a(t,i),t!==2&&(i=Pn,Pn=o,i!==null&&fc(i)),t}function fc(t){Pn===null?Pn=t:Pn.push.apply(Pn,t)}function V_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var u=0;u<o.length;u++){var f=o[u],p=f.getSnapshot;f=f.value;try{if(!ni(p(),f))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function hr(t,i){for(i&=~oc,i&=~Wa,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-yt(i),u=1<<o;t[o]=-1,i&=~u}}function xp(t){if((St&6)!==0)throw Error(n(327));ws();var i=ti(t,0);if((i&1)===0)return Dn(t,W()),null;var o=$a(t,i);if(t.tag!==0&&o===2){var u=It(t);u!==0&&(i=u,o=cc(t,u))}if(o===1)throw o=bo,Fr(t,0),hr(t,i),Dn(t,W()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Or(t,Pn,Ui),Dn(t,W()),null}function dc(t,i){var o=St;St|=1;try{return t(i)}finally{St=o,St===0&&(Ts=W()+500,Ea&&or())}}function Nr(t){fr!==null&&fr.tag===0&&(St&6)===0&&ws();var i=St;St|=1;var o=Kn.transition,u=vt;try{if(Kn.transition=null,vt=1,t)return t()}finally{vt=u,Kn.transition=o,St=i,(St&6)===0&&or()}}function hc(){zn=Es.current,zt(Es)}function Fr(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,v_(o)),qt!==null)for(o=qt.return;o!==null;){var u=o;switch(Mu(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Sa();break;case 3:ys(),zt(Rn),zt(pn),Nu();break;case 5:Uu(u);break;case 4:ys();break;case 13:zt(Vt);break;case 19:zt(Vt);break;case 10:Cu(u.type._context);break;case 22:case 23:hc()}o=o.return}if(on=t,qt=t=pr(t.current,null),cn=zn=i,Jt=0,bo=null,oc=Wa=Ir=0,Pn=Po=null,Dr!==null){for(i=0;i<Dr.length;i++)if(o=Dr[i],u=o.interleaved,u!==null){o.interleaved=null;var f=u.next,p=o.pending;if(p!==null){var M=p.next;p.next=f,u.next=M}o.pending=u}Dr=null}return t}function yp(t,i){do{var o=qt;try{if(Ru(),Ua.current=Oa,Ia){for(var u=Gt.memoizedState;u!==null;){var f=u.queue;f!==null&&(f.pending=null),u=u.next}Ia=!1}if(Ur=0,sn=Qt=Gt=null,Eo=!1,To=0,sc.current=null,o===null||o.return===null){Jt=1,bo=i,qt=null;break}e:{var p=t,M=o.return,D=o,O=i;if(i=cn,D.flags|=32768,O!==null&&typeof O=="object"&&typeof O.then=="function"){var Z=O,ge=D,_e=ge.tag;if((ge.mode&1)===0&&(_e===0||_e===11||_e===15)){var pe=ge.alternate;pe?(ge.updateQueue=pe.updateQueue,ge.memoizedState=pe.memoizedState,ge.lanes=pe.lanes):(ge.updateQueue=null,ge.memoizedState=null)}var Ue=Xh(M);if(Ue!==null){Ue.flags&=-257,jh(Ue,M,D,p,i),Ue.mode&1&&Wh(p,Z,i),i=Ue,O=Z;var ze=i.updateQueue;if(ze===null){var je=new Set;je.add(O),i.updateQueue=je}else ze.add(O);break e}else{if((i&1)===0){Wh(p,Z,i),pc();break e}O=Error(n(426))}}else if(Ht&&D.mode&1){var jt=Xh(M);if(jt!==null){(jt.flags&65536)===0&&(jt.flags|=256),jh(jt,M,D,p,i),wu(Ss(O,D));break e}}p=O=Ss(O,D),Jt!==4&&(Jt=2),Po===null?Po=[p]:Po.push(p),p=M;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var Y=Vh(p,O,i);mh(p,Y);break e;case 1:D=O;var G=p.type,$=p.stateNode;if((p.flags&128)===0&&(typeof G.getDerivedStateFromError=="function"||$!==null&&typeof $.componentDidCatch=="function"&&(cr===null||!cr.has($)))){p.flags|=65536,i&=-i,p.lanes|=i;var Ee=Gh(p,D,i);mh(p,Ee);break e}}p=p.return}while(p!==null)}Ep(o)}catch(qe){i=qe,qt===o&&o!==null&&(qt=o=o.return);continue}break}while(!0)}function Sp(){var t=Ga.current;return Ga.current=Oa,t===null?Oa:t}function pc(){(Jt===0||Jt===3||Jt===2)&&(Jt=4),on===null||(Ir&268435455)===0&&(Wa&268435455)===0||hr(on,cn)}function $a(t,i){var o=St;St|=2;var u=Sp();(on!==t||cn!==i)&&(Ui=null,Fr(t,i));do try{G_();break}catch(f){yp(t,f)}while(!0);if(Ru(),St=o,Ga.current=u,qt!==null)throw Error(n(261));return on=null,cn=0,Jt}function G_(){for(;qt!==null;)Mp(qt)}function W_(){for(;qt!==null&&!ee();)Mp(qt)}function Mp(t){var i=Ap(t.alternate,t,zn);t.memoizedProps=t.pendingProps,i===null?Ep(t):qt=i,sc.current=null}function Ep(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=F_(o,i,zn),o!==null){qt=o;return}}else{if(o=O_(o,i),o!==null){o.flags&=32767,qt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Jt=6,qt=null;return}}if(i=i.sibling,i!==null){qt=i;return}qt=i=t}while(i!==null);Jt===0&&(Jt=5)}function Or(t,i,o){var u=vt,f=Kn.transition;try{Kn.transition=null,vt=1,X_(t,i,o,u)}finally{Kn.transition=f,vt=u}return null}function X_(t,i,o,u){do ws();while(fr!==null);if((St&6)!==0)throw Error(n(327));o=t.finishedWork;var f=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var p=o.lanes|o.childLanes;if(hn(t,p),t===on&&(qt=on=null,cn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||ja||(ja=!0,Rp(Le,function(){return ws(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=Kn.transition,Kn.transition=null;var M=vt;vt=1;var D=St;St|=4,sc.current=null,B_(t,o),hp(o,t),f_(pu),aa=!!hu,pu=hu=null,t.current=o,z_(o),te(),St=D,vt=M,Kn.transition=p}else t.current=o;if(ja&&(ja=!1,fr=t,Ya=f),p=t.pendingLanes,p===0&&(cr=null),wt(o.stateNode),Dn(t,W()),i!==null)for(u=t.onRecoverableError,o=0;o<i.length;o++)f=i[o],u(f.value,{componentStack:f.stack,digest:f.digest});if(Xa)throw Xa=!1,t=lc,lc=null,t;return(Ya&1)!==0&&t.tag!==0&&ws(),p=t.pendingLanes,(p&1)!==0?t===uc?Do++:(Do=0,uc=t):Do=0,or(),null}function ws(){if(fr!==null){var t=fd(Ya),i=Kn.transition,o=vt;try{if(Kn.transition=null,vt=16>t?16:t,fr===null)var u=!1;else{if(t=fr,fr=null,Ya=0,(St&6)!==0)throw Error(n(331));var f=St;for(St|=4,Oe=t.current;Oe!==null;){var p=Oe,M=p.child;if((Oe.flags&16)!==0){var D=p.deletions;if(D!==null){for(var O=0;O<D.length;O++){var Z=D[O];for(Oe=Z;Oe!==null;){var ge=Oe;switch(ge.tag){case 0:case 11:case 15:Co(8,ge,p)}var _e=ge.child;if(_e!==null)_e.return=ge,Oe=_e;else for(;Oe!==null;){ge=Oe;var pe=ge.sibling,Ue=ge.return;if(lp(ge),ge===Z){Oe=null;break}if(pe!==null){pe.return=Ue,Oe=pe;break}Oe=Ue}}}var ze=p.alternate;if(ze!==null){var je=ze.child;if(je!==null){ze.child=null;do{var jt=je.sibling;je.sibling=null,je=jt}while(je!==null)}}Oe=p}}if((p.subtreeFlags&2064)!==0&&M!==null)M.return=p,Oe=M;else e:for(;Oe!==null;){if(p=Oe,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:Co(9,p,p.return)}var Y=p.sibling;if(Y!==null){Y.return=p.return,Oe=Y;break e}Oe=p.return}}var G=t.current;for(Oe=G;Oe!==null;){M=Oe;var $=M.child;if((M.subtreeFlags&2064)!==0&&$!==null)$.return=M,Oe=$;else e:for(M=G;Oe!==null;){if(D=Oe,(D.flags&2048)!==0)try{switch(D.tag){case 0:case 11:case 15:Va(9,D)}}catch(qe){Wt(D,D.return,qe)}if(D===M){Oe=null;break e}var Ee=D.sibling;if(Ee!==null){Ee.return=D.return,Oe=Ee;break e}Oe=D.return}}if(St=f,or(),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Ze,t)}catch{}u=!0}return u}finally{vt=o,Kn.transition=i}}return!1}function Tp(t,i,o){i=Ss(o,i),i=Vh(t,i,1),t=lr(t,i,1),i=En(),t!==null&&(Xt(t,1,i),Dn(t,i))}function Wt(t,i,o){if(t.tag===3)Tp(t,t,o);else for(;i!==null;){if(i.tag===3){Tp(i,t,o);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(cr===null||!cr.has(u))){t=Ss(o,t),t=Gh(i,t,1),i=lr(i,t,1),t=En(),i!==null&&(Xt(i,1,t),Dn(i,t));break}}i=i.return}}function j_(t,i,o){var u=t.pingCache;u!==null&&u.delete(i),i=En(),t.pingedLanes|=t.suspendedLanes&o,on===t&&(cn&o)===o&&(Jt===4||Jt===3&&(cn&130023424)===cn&&500>W()-ac?Fr(t,0):oc|=o),Dn(t,i)}function wp(t,i){i===0&&((t.mode&1)===0?i=1:(i=_t,_t<<=1,(_t&130023424)===0&&(_t=4194304)));var o=En();t=Pi(t,i),t!==null&&(Xt(t,i,o),Dn(t,o))}function Y_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),wp(t,o)}function q_(t,i){var o=0;switch(t.tag){case 13:var u=t.stateNode,f=t.memoizedState;f!==null&&(o=f.retryLane);break;case 19:u=t.stateNode;break;default:throw Error(n(314))}u!==null&&u.delete(i),wp(t,o)}var Ap;Ap=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||Rn.current)bn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return bn=!1,N_(t,i,o);bn=(t.flags&131072)!==0}else bn=!1,Ht&&(i.flags&1048576)!==0&&sh(i,wa,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;za(t,i),t=i.pendingProps;var f=hs(i,pn.current);xs(i,o),f=ku(null,i,u,t,f,o);var p=Bu();return i.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Cn(u)?(p=!0,Ma(i)):p=!1,i.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,Du(i),f.updater=ka,i.stateNode=f,f._reactInternals=i,Xu(i,u,t,o),i=Ku(null,i,u,!0,p,o)):(i.tag=0,Ht&&p&&Su(i),Mn(null,i,f,o),i=i.child),i;case 16:u=i.elementType;e:{switch(za(t,i),t=i.pendingProps,f=u._init,u=f(u._payload),i.type=u,f=i.tag=$_(u),t=ri(u,t),f){case 0:i=qu(null,i,u,t,o);break e;case 1:i=Qh(null,i,u,t,o);break e;case 11:i=Yh(null,i,u,t,o);break e;case 14:i=qh(null,i,u,ri(u.type,t),o);break e}throw Error(n(306,u,""))}return i;case 0:return u=i.type,f=i.pendingProps,f=i.elementType===u?f:ri(u,f),qu(t,i,u,f,o);case 1:return u=i.type,f=i.pendingProps,f=i.elementType===u?f:ri(u,f),Qh(t,i,u,f,o);case 3:e:{if(Jh(i),t===null)throw Error(n(387));u=i.pendingProps,p=i.memoizedState,f=p.element,ph(t,i),Da(i,u,null,o);var M=i.memoizedState;if(u=M.element,p.isDehydrated)if(p={element:u,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){f=Ss(Error(n(423)),i),i=ep(t,i,u,o,f);break e}else if(u!==f){f=Ss(Error(n(424)),i),i=ep(t,i,u,o,f);break e}else for(Bn=ir(i.stateNode.containerInfo.firstChild),kn=i,Ht=!0,ii=null,o=dh(i,null,u,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(gs(),u===f){i=Li(t,i,o);break e}Mn(t,i,u,o)}i=i.child}return i;case 5:return _h(i),t===null&&Tu(i),u=i.type,f=i.pendingProps,p=t!==null?t.memoizedProps:null,M=f.children,mu(u,f)?M=null:p!==null&&mu(u,p)&&(i.flags|=32),Zh(t,i),Mn(t,i,M,o),i.child;case 6:return t===null&&Tu(i),null;case 13:return tp(t,i,o);case 4:return Lu(i,i.stateNode.containerInfo),u=i.pendingProps,t===null?i.child=_s(i,null,u,o):Mn(t,i,u,o),i.child;case 11:return u=i.type,f=i.pendingProps,f=i.elementType===u?f:ri(u,f),Yh(t,i,u,f,o);case 7:return Mn(t,i,i.pendingProps,o),i.child;case 8:return Mn(t,i,i.pendingProps.children,o),i.child;case 12:return Mn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(u=i.type._context,f=i.pendingProps,p=i.memoizedProps,M=f.value,Ft(Ca,u._currentValue),u._currentValue=M,p!==null)if(ni(p.value,M)){if(p.children===f.children&&!Rn.current){i=Li(t,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var D=p.dependencies;if(D!==null){M=p.child;for(var O=D.firstContext;O!==null;){if(O.context===u){if(p.tag===1){O=Di(-1,o&-o),O.tag=2;var Z=p.updateQueue;if(Z!==null){Z=Z.shared;var ge=Z.pending;ge===null?O.next=O:(O.next=ge.next,ge.next=O),Z.pending=O}}p.lanes|=o,O=p.alternate,O!==null&&(O.lanes|=o),bu(p.return,o,i),D.lanes|=o;break}O=O.next}}else if(p.tag===10)M=p.type===i.type?null:p.child;else if(p.tag===18){if(M=p.return,M===null)throw Error(n(341));M.lanes|=o,D=M.alternate,D!==null&&(D.lanes|=o),bu(M,o,i),M=p.sibling}else M=p.child;if(M!==null)M.return=p;else for(M=p;M!==null;){if(M===i){M=null;break}if(p=M.sibling,p!==null){p.return=M.return,M=p;break}M=M.return}p=M}Mn(t,i,f.children,o),i=i.child}return i;case 9:return f=i.type,u=i.pendingProps.children,xs(i,o),f=Yn(f),u=u(f),i.flags|=1,Mn(t,i,u,o),i.child;case 14:return u=i.type,f=ri(u,i.pendingProps),f=ri(u.type,f),qh(t,i,u,f,o);case 15:return Kh(t,i,i.type,i.pendingProps,o);case 17:return u=i.type,f=i.pendingProps,f=i.elementType===u?f:ri(u,f),za(t,i),i.tag=1,Cn(u)?(t=!0,Ma(i)):t=!1,xs(i,o),zh(i,u,f),Xu(i,u,f,o),Ku(null,i,u,!0,t,o);case 19:return ip(t,i,o);case 22:return $h(t,i,o)}throw Error(n(156,i.tag))};function Rp(t,i){return T(t,i)}function K_(t,i,o,u){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $n(t,i,o,u){return new K_(t,i,o,u)}function mc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function $_(t){if(typeof t=="function")return mc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Q)return 11;if(t===ue)return 14}return 2}function pr(t,i){var o=t.alternate;return o===null?(o=$n(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Za(t,i,o,u,f,p){var M=2;if(u=t,typeof t=="function")mc(t)&&(M=1);else if(typeof t=="string")M=5;else e:switch(t){case L:return kr(o.children,f,p,i);case j:M=8,f|=8;break;case R:return t=$n(12,o,i,f|2),t.elementType=R,t.lanes=p,t;case ie:return t=$n(13,o,i,f),t.elementType=ie,t.lanes=p,t;case de:return t=$n(19,o,i,f),t.elementType=de,t.lanes=p,t;case fe:return Qa(o,f,p,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case C:M=10;break e;case V:M=9;break e;case Q:M=11;break e;case ue:M=14;break e;case le:M=16,u=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=$n(M,o,i,f),i.elementType=t,i.type=u,i.lanes=p,i}function kr(t,i,o,u){return t=$n(7,t,u,i),t.lanes=o,t}function Qa(t,i,o,u){return t=$n(22,t,u,i),t.elementType=fe,t.lanes=o,t.stateNode={isHidden:!1},t}function gc(t,i,o){return t=$n(6,t,null,i),t.lanes=o,t}function _c(t,i,o){return i=$n(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function Z_(t,i,o,u,f){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=dn(0),this.expirationTimes=dn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dn(0),this.identifierPrefix=u,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function vc(t,i,o,u,f,p,M,D,O){return t=new Z_(t,i,o,D,O),i===1?(i=1,p===!0&&(i|=8)):i=0,p=$n(3,null,null,i),t.current=p,p.stateNode=t,p.memoizedState={element:u,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Du(p),t}function Q_(t,i,o){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:k,key:u==null?null:""+u,children:t,containerInfo:i,implementation:o}}function Cp(t){if(!t)return sr;t=t._reactInternals;e:{if(wi(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Cn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(Cn(o))return nh(t,o,i)}return i}function bp(t,i,o,u,f,p,M,D,O){return t=vc(o,u,!0,t,f,p,M,D,O),t.context=Cp(null),o=t.current,u=En(),f=dr(o),p=Di(u,f),p.callback=i??null,lr(o,p,f),t.current.lanes=f,Xt(t,f,u),Dn(t,u),t}function Ja(t,i,o,u){var f=i.current,p=En(),M=dr(f);return o=Cp(o),i.context===null?i.context=o:i.pendingContext=o,i=Di(p,M),i.payload={element:t},u=u===void 0?null:u,u!==null&&(i.callback=u),t=lr(f,i,M),t!==null&&(ai(t,f,M,p),Pa(t,f,M)),M}function el(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Pp(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function xc(t,i){Pp(t,i),(t=t.alternate)&&Pp(t,i)}function J_(){return null}var Dp=typeof reportError=="function"?reportError:function(t){console.error(t)};function yc(t){this._internalRoot=t}tl.prototype.render=yc.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Ja(t,i,null,null)},tl.prototype.unmount=yc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Nr(function(){Ja(null,t,null,null)}),i[Ai]=null}};function tl(t){this._internalRoot=t}tl.prototype.unstable_scheduleHydration=function(t){if(t){var i=pd();t={blockedOn:null,target:t,priority:i};for(var o=0;o<er.length&&i!==0&&i<er[o].priority;o++);er.splice(o,0,t),o===0&&_d(t)}};function Sc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function nl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Lp(){}function ev(t,i,o,u,f){if(f){if(typeof u=="function"){var p=u;u=function(){var Z=el(M);p.call(Z)}}var M=bp(i,u,t,0,null,!1,!1,"",Lp);return t._reactRootContainer=M,t[Ai]=M.current,mo(t.nodeType===8?t.parentNode:t),Nr(),M}for(;f=t.lastChild;)t.removeChild(f);if(typeof u=="function"){var D=u;u=function(){var Z=el(O);D.call(Z)}}var O=vc(t,0,!1,null,null,!1,!1,"",Lp);return t._reactRootContainer=O,t[Ai]=O.current,mo(t.nodeType===8?t.parentNode:t),Nr(function(){Ja(i,O,o,u)}),O}function il(t,i,o,u,f){var p=o._reactRootContainer;if(p){var M=p;if(typeof f=="function"){var D=f;f=function(){var O=el(M);D.call(O)}}Ja(i,M,t,f)}else M=ev(o,i,t,f,u);return el(M)}dd=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Zt(i.pendingLanes);o!==0&&(Ar(i,o|1),Dn(i,W()),(St&6)===0&&(Ts=W()+500,or()))}break;case 13:Nr(function(){var u=Pi(t,1);if(u!==null){var f=En();ai(u,t,1,f)}}),xc(t,1)}},jl=function(t){if(t.tag===13){var i=Pi(t,134217728);if(i!==null){var o=En();ai(i,t,134217728,o)}xc(t,134217728)}},hd=function(t){if(t.tag===13){var i=dr(t),o=Pi(t,i);if(o!==null){var u=En();ai(o,t,i,u)}xc(t,i)}},pd=function(){return vt},md=function(t,i){var o=vt;try{return vt=t,i()}finally{vt=o}},xe=function(t,i,o){switch(i){case"input":if(Ve(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var u=o[i];if(u!==t&&u.form===t.form){var f=ya(u);if(!f)throw Error(n(90));$t(u),Ve(u,f)}}}break;case"textarea":E(t,o);break;case"select":i=o.value,i!=null&&Ot(t,!!o.multiple,i,!1)}},ut=dc,At=Nr;var tv={usingClientEntryPoint:!1,Events:[vo,fs,ya,he,We,dc]},Lo={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nv={bundleType:Lo.bundleType,version:Lo.version,rendererPackageName:Lo.rendererPackageName,rendererConfig:Lo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ia(t),t===null?null:t.stateNode},findFiberByHostInstance:Lo.findFiberByHostInstance||J_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rl.isDisabled&&rl.supportsFiber)try{Ze=rl.inject(nv),ot=rl}catch{}}return Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tv,Ln.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Sc(i))throw Error(n(200));return Q_(t,i,null,o)},Ln.createRoot=function(t,i){if(!Sc(t))throw Error(n(299));var o=!1,u="",f=Dp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),i=vc(t,1,!1,null,null,o,!1,u,f),t[Ai]=i.current,mo(t.nodeType===8?t.parentNode:t),new yc(i)},Ln.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=ia(i),t=t===null?null:t.stateNode,t},Ln.flushSync=function(t){return Nr(t)},Ln.hydrate=function(t,i,o){if(!nl(i))throw Error(n(200));return il(null,t,i,!0,o)},Ln.hydrateRoot=function(t,i,o){if(!Sc(t))throw Error(n(405));var u=o!=null&&o.hydratedSources||null,f=!1,p="",M=Dp;if(o!=null&&(o.unstable_strictMode===!0&&(f=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(M=o.onRecoverableError)),i=bp(i,null,t,1,o??null,f,!1,p,M),t[Ai]=i.current,mo(t),u)for(t=0;t<u.length;t++)o=u[t],f=o._getVersion,f=f(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,f]:i.mutableSourceEagerHydrationData.push(o,f);return new tl(i)},Ln.render=function(t,i,o){if(!nl(i))throw Error(n(200));return il(null,t,i,!1,o)},Ln.unmountComponentAtNode=function(t){if(!nl(t))throw Error(n(40));return t._reactRootContainer?(Nr(function(){il(null,null,t,!1,function(){t._reactRootContainer=null,t[Ai]=null})}),!0):!1},Ln.unstable_batchedUpdates=dc,Ln.unstable_renderSubtreeIntoContainer=function(t,i,o,u){if(!nl(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return il(t,i,o,!1,u)},Ln.version="18.3.1-next-f1338f8080-20240426",Ln}var zp;function cv(){if(zp)return Tc.exports;zp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Tc.exports=uv(),Tc.exports}var Hp;function fv(){if(Hp)return sl;Hp=1;var s=cv();return sl.createRoot=s.createRoot,sl.hydrateRoot=s.hydrateRoot,sl}var dv=fv();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $f="180",Gs={ROTATE:0,DOLLY:1,PAN:2},Hs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hv=0,Vp=1,pv=2,Xm=1,mv=2,Bi=3,Er=0,In=1,zi=2,Gi=0,Ws=1,rf=2,Gp=3,Wp=4,gv=5,jr=100,_v=101,vv=102,xv=103,yv=104,Sv=200,Mv=201,Ev=202,Tv=203,sf=204,of=205,wv=206,Av=207,Rv=208,Cv=209,bv=210,Pv=211,Dv=212,Lv=213,Uv=214,af=0,lf=1,uf=2,js=3,cf=4,ff=5,df=6,hf=7,jm=0,Iv=1,Nv=2,Wi=0,Fv=1,Ov=2,kv=3,Bv=4,zv=5,Hv=6,Vv=7,Ym=300,Ys=301,qs=302,pf=303,mf=304,Hl=306,gf=1e3,qr=1001,_f=1002,pi=1003,Gv=1004,ol=1005,Si=1006,Rc=1007,Kr=1008,Yi=1009,qm=1010,Km=1011,Vo=1012,Zf=1013,Zr=1014,Vi=1015,Ei=1016,Qf=1017,Jf=1018,Go=1020,$m=35902,Zm=35899,Qm=1021,Jm=1022,di=1023,Wo=1026,Xo=1027,eg=1028,ed=1029,tg=1030,td=1031,nd=1033,Dl=33776,Ll=33777,Ul=33778,Il=33779,vf=35840,xf=35841,yf=35842,Sf=35843,Mf=36196,Ef=37492,Tf=37496,wf=37808,Af=37809,Rf=37810,Cf=37811,bf=37812,Pf=37813,Df=37814,Lf=37815,Uf=37816,If=37817,Nf=37818,Ff=37819,Of=37820,kf=37821,Bf=36492,zf=36494,Hf=36495,Vf=36283,Gf=36284,Wf=36285,Xf=36286,Wv=3200,Xv=3201,jv=0,Yv=1,Hi="",Qn="srgb",Qr="srgb-linear",Ol="linear",Pt="srgb",As=7680,Xp=519,qv=512,Kv=513,$v=514,ng=515,Zv=516,Qv=517,Jv=518,e0=519,jp=35044,Yp="300 es",Mi=2e3,kl=2001;class es{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,c=a.length;l<c;l++)a[l].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qp=1234567;const zo=Math.PI/180,jo=180/Math.PI;function Zs(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(vn[s&255]+vn[s>>8&255]+vn[s>>16&255]+vn[s>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[n&63|128]+vn[n>>8&255]+"-"+vn[n>>16&255]+vn[n>>24&255]+vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]).toLowerCase()}function gt(s,e,n){return Math.max(e,Math.min(n,s))}function id(s,e){return(s%e+e)%e}function t0(s,e,n,r,a){return r+(s-e)*(a-r)/(n-e)}function n0(s,e,n){return s!==e?(n-s)/(e-s):0}function Ho(s,e,n){return(1-n)*s+n*e}function i0(s,e,n,r){return Ho(s,e,1-Math.exp(-n*r))}function r0(s,e=1){return e-Math.abs(id(s,e*2)-e)}function s0(s,e,n){return s<=e?0:s>=n?1:(s=(s-e)/(n-e),s*s*(3-2*s))}function o0(s,e,n){return s<=e?0:s>=n?1:(s=(s-e)/(n-e),s*s*s*(s*(s*6-15)+10))}function a0(s,e){return s+Math.floor(Math.random()*(e-s+1))}function l0(s,e){return s+Math.random()*(e-s)}function u0(s){return s*(.5-Math.random())}function c0(s){s!==void 0&&(qp=s);let e=qp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function f0(s){return s*zo}function d0(s){return s*jo}function h0(s){return(s&s-1)===0&&s!==0}function p0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function m0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function g0(s,e,n,r,a){const l=Math.cos,c=Math.sin,d=l(n/2),h=c(n/2),m=l((e+r)/2),g=c((e+r)/2),v=l((e-r)/2),x=c((e-r)/2),S=l((r-e)/2),w=c((r-e)/2);switch(a){case"XYX":s.set(d*g,h*v,h*x,d*m);break;case"YZY":s.set(h*x,d*g,h*v,d*m);break;case"ZXZ":s.set(h*v,h*x,d*g,d*m);break;case"XZX":s.set(d*g,h*w,h*S,d*m);break;case"YXY":s.set(h*S,d*g,h*w,d*m);break;case"ZYZ":s.set(h*w,h*S,d*g,d*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function zs(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ig={DEG2RAD:zo,RAD2DEG:jo,generateUUID:Zs,clamp:gt,euclideanModulo:id,mapLinear:t0,inverseLerp:n0,lerp:Ho,damp:i0,pingpong:r0,smoothstep:s0,smootherstep:o0,randInt:a0,randFloat:l0,randFloatSpread:u0,seededRandom:c0,degToRad:f0,radToDeg:d0,isPowerOfTwo:h0,ceilPowerOfTwo:p0,floorPowerOfTwo:m0,setQuaternionFromProperEuler:g0,normalize:Tn,denormalize:zs};class st{constructor(e=0,n=0){st.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(gt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),l=this.x-e.x,c=this.y-e.y;return this.x=l*r-c*a+e.x,this.y=l*a+c*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jr{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,l,c,d){let h=r[a+0],m=r[a+1],g=r[a+2],v=r[a+3];const x=l[c+0],S=l[c+1],w=l[c+2],A=l[c+3];if(d===0){e[n+0]=h,e[n+1]=m,e[n+2]=g,e[n+3]=v;return}if(d===1){e[n+0]=x,e[n+1]=S,e[n+2]=w,e[n+3]=A;return}if(v!==A||h!==x||m!==S||g!==w){let y=1-d;const _=h*x+m*S+g*w+v*A,F=_>=0?1:-1,N=1-_*_;if(N>Number.EPSILON){const z=Math.sqrt(N),k=Math.atan2(z,_*F);y=Math.sin(y*k)/z,d=Math.sin(d*k)/z}const b=d*F;if(h=h*y+x*b,m=m*y+S*b,g=g*y+w*b,v=v*y+A*b,y===1-d){const z=1/Math.sqrt(h*h+m*m+g*g+v*v);h*=z,m*=z,g*=z,v*=z}}e[n]=h,e[n+1]=m,e[n+2]=g,e[n+3]=v}static multiplyQuaternionsFlat(e,n,r,a,l,c){const d=r[a],h=r[a+1],m=r[a+2],g=r[a+3],v=l[c],x=l[c+1],S=l[c+2],w=l[c+3];return e[n]=d*w+g*v+h*S-m*x,e[n+1]=h*w+g*x+m*v-d*S,e[n+2]=m*w+g*S+d*x-h*v,e[n+3]=g*w-d*v-h*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,l=e._z,c=e._order,d=Math.cos,h=Math.sin,m=d(r/2),g=d(a/2),v=d(l/2),x=h(r/2),S=h(a/2),w=h(l/2);switch(c){case"XYZ":this._x=x*g*v+m*S*w,this._y=m*S*v-x*g*w,this._z=m*g*w+x*S*v,this._w=m*g*v-x*S*w;break;case"YXZ":this._x=x*g*v+m*S*w,this._y=m*S*v-x*g*w,this._z=m*g*w-x*S*v,this._w=m*g*v+x*S*w;break;case"ZXY":this._x=x*g*v-m*S*w,this._y=m*S*v+x*g*w,this._z=m*g*w+x*S*v,this._w=m*g*v-x*S*w;break;case"ZYX":this._x=x*g*v-m*S*w,this._y=m*S*v+x*g*w,this._z=m*g*w-x*S*v,this._w=m*g*v+x*S*w;break;case"YZX":this._x=x*g*v+m*S*w,this._y=m*S*v+x*g*w,this._z=m*g*w-x*S*v,this._w=m*g*v-x*S*w;break;case"XZY":this._x=x*g*v-m*S*w,this._y=m*S*v-x*g*w,this._z=m*g*w+x*S*v,this._w=m*g*v+x*S*w;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],l=n[8],c=n[1],d=n[5],h=n[9],m=n[2],g=n[6],v=n[10],x=r+d+v;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(g-h)*S,this._y=(l-m)*S,this._z=(c-a)*S}else if(r>d&&r>v){const S=2*Math.sqrt(1+r-d-v);this._w=(g-h)/S,this._x=.25*S,this._y=(a+c)/S,this._z=(l+m)/S}else if(d>v){const S=2*Math.sqrt(1+d-r-v);this._w=(l-m)/S,this._x=(a+c)/S,this._y=.25*S,this._z=(h+g)/S}else{const S=2*Math.sqrt(1+v-r-d);this._w=(c-a)/S,this._x=(l+m)/S,this._y=(h+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,l=e._z,c=e._w,d=n._x,h=n._y,m=n._z,g=n._w;return this._x=r*g+c*d+a*m-l*h,this._y=a*g+c*h+l*d-r*m,this._z=l*g+c*m+r*h-a*d,this._w=c*g-r*d-a*h-l*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,c=this._w;let d=c*e._w+r*e._x+a*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=c,this._x=r,this._y=a,this._z=l,this;const h=1-d*d;if(h<=Number.EPSILON){const S=1-n;return this._w=S*c+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*l+n*this._z,this.normalize(),this}const m=Math.sqrt(h),g=Math.atan2(m,d),v=Math.sin((1-n)*g)/m,x=Math.sin(n*g)/m;return this._w=c*v+this._w*x,this._x=r*v+this._x*x,this._y=a*v+this._y*x,this._z=l*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(n),l*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,n=0,r=0){K.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Kp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Kp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[3]*r+l[6]*a,this.y=l[1]*n+l[4]*r+l[7]*a,this.z=l[2]*n+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=e.elements,c=1/(l[3]*n+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*n+l[4]*r+l[8]*a+l[12])*c,this.y=(l[1]*n+l[5]*r+l[9]*a+l[13])*c,this.z=(l[2]*n+l[6]*r+l[10]*a+l[14])*c,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,l=e.x,c=e.y,d=e.z,h=e.w,m=2*(c*a-d*r),g=2*(d*n-l*a),v=2*(l*r-c*n);return this.x=n+h*m+c*v-d*g,this.y=r+h*g+d*m-l*v,this.z=a+h*v+l*g-c*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[4]*r+l[8]*a,this.y=l[1]*n+l[5]*r+l[9]*a,this.z=l[2]*n+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this.z=gt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this.z=gt(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,l=e.z,c=n.x,d=n.y,h=n.z;return this.x=a*h-l*d,this.y=l*c-r*h,this.z=r*d-a*c,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Cc.copy(this).projectOnVector(e),this.sub(Cc)}reflect(e){return this.sub(Cc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(gt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cc=new K,Kp=new Jr;class dt{constructor(e,n,r,a,l,c,d,h,m){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,c,d,h,m)}set(e,n,r,a,l,c,d,h,m){const g=this.elements;return g[0]=e,g[1]=a,g[2]=d,g[3]=n,g[4]=l,g[5]=h,g[6]=r,g[7]=c,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,c=r[0],d=r[3],h=r[6],m=r[1],g=r[4],v=r[7],x=r[2],S=r[5],w=r[8],A=a[0],y=a[3],_=a[6],F=a[1],N=a[4],b=a[7],z=a[2],k=a[5],L=a[8];return l[0]=c*A+d*F+h*z,l[3]=c*y+d*N+h*k,l[6]=c*_+d*b+h*L,l[1]=m*A+g*F+v*z,l[4]=m*y+g*N+v*k,l[7]=m*_+g*b+v*L,l[2]=x*A+S*F+w*z,l[5]=x*y+S*N+w*k,l[8]=x*_+S*b+w*L,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],c=e[4],d=e[5],h=e[6],m=e[7],g=e[8];return n*c*g-n*d*m-r*l*g+r*d*h+a*l*m-a*c*h}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],c=e[4],d=e[5],h=e[6],m=e[7],g=e[8],v=g*c-d*m,x=d*h-g*l,S=m*l-c*h,w=n*v+r*x+a*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=v*A,e[1]=(a*m-g*r)*A,e[2]=(d*r-a*c)*A,e[3]=x*A,e[4]=(g*n-a*h)*A,e[5]=(a*l-d*n)*A,e[6]=S*A,e[7]=(r*h-m*n)*A,e[8]=(c*n-r*l)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,l,c,d){const h=Math.cos(l),m=Math.sin(l);return this.set(r*h,r*m,-r*(h*c+m*d)+c+e,-a*m,a*h,-a*(-m*c+h*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(bc.makeScale(e,n)),this}rotate(e){return this.premultiply(bc.makeRotation(-e)),this}translate(e,n){return this.premultiply(bc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bc=new dt;function rg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Bl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function _0(){const s=Bl("canvas");return s.style.display="block",s}const $p={};function Yo(s){s in $p||($p[s]=!0,console.warn(s))}function v0(s,e,n){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,n);break;default:r()}}setTimeout(l,n)})}const Zp=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qp=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function x0(){const s={enabled:!0,workingColorSpace:Qr,spaces:{},convert:function(a,l,c){return this.enabled===!1||l===c||!l||!c||(this.spaces[l].transfer===Pt&&(a.r=Xi(a.r),a.g=Xi(a.g),a.b=Xi(a.b)),this.spaces[l].primaries!==this.spaces[c].primaries&&(a.applyMatrix3(this.spaces[l].toXYZ),a.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===Pt&&(a.r=Xs(a.r),a.g=Xs(a.g),a.b=Xs(a.b))),a},workingToColorSpace:function(a,l){return this.convert(a,this.workingColorSpace,l)},colorSpaceToWorking:function(a,l){return this.convert(a,l,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Hi?Ol:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,l=this.workingColorSpace){return a.fromArray(this.spaces[l].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,l,c){return a.copy(this.spaces[l].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,l){return Yo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(a,l)},toWorkingColorSpace:function(a,l){return Yo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(a,l)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Qr]:{primaries:e,whitePoint:r,transfer:Ol,toXYZ:Zp,fromXYZ:Qp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Qn},outputColorSpaceConfig:{drawingBufferColorSpace:Qn}},[Qn]:{primaries:e,whitePoint:r,transfer:Pt,toXYZ:Zp,fromXYZ:Qp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Qn}}}),s}const Et=x0();function Xi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Rs;class y0{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Rs===void 0&&(Rs=Bl("canvas")),Rs.width=e.width,Rs.height=e.height;const a=Rs.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),r=Rs}return r.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Bl("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let c=0;c<l.length;c++)l[c]=Xi(l[c]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Xi(n[r]/255)*255):n[r]=Xi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let S0=0;class rd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=Zs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let c=0,d=a.length;c<d;c++)a[c].isDataTexture?l.push(Pc(a[c].image)):l.push(Pc(a[c]))}else l=Pc(a);r.url=l}return n||(e.images[this.uuid]=r),r}}function Pc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?y0.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let M0=0;const Dc=new K;class Nn extends es{constructor(e=Nn.DEFAULT_IMAGE,n=Nn.DEFAULT_MAPPING,r=qr,a=qr,l=Si,c=Kr,d=di,h=Yi,m=Nn.DEFAULT_ANISOTROPY,g=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Zs(),this.name="",this.source=new rd(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=c,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=h,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Dc).x}get height(){return this.source.getSize(Dc).y}get depth(){return this.source.getSize(Dc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ym)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gf:e.x=e.x-Math.floor(e.x);break;case qr:e.x=e.x<0?0:1;break;case _f:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gf:e.y=e.y-Math.floor(e.y);break;case qr:e.y=e.y<0?0:1;break;case _f:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nn.DEFAULT_IMAGE=null;Nn.DEFAULT_MAPPING=Ym;Nn.DEFAULT_ANISOTROPY=1;class Yt{constructor(e=0,n=0,r=0,a=1){Yt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=this.w,c=e.elements;return this.x=c[0]*n+c[4]*r+c[8]*a+c[12]*l,this.y=c[1]*n+c[5]*r+c[9]*a+c[13]*l,this.z=c[2]*n+c[6]*r+c[10]*a+c[14]*l,this.w=c[3]*n+c[7]*r+c[11]*a+c[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,l;const h=e.elements,m=h[0],g=h[4],v=h[8],x=h[1],S=h[5],w=h[9],A=h[2],y=h[6],_=h[10];if(Math.abs(g-x)<.01&&Math.abs(v-A)<.01&&Math.abs(w-y)<.01){if(Math.abs(g+x)<.1&&Math.abs(v+A)<.1&&Math.abs(w+y)<.1&&Math.abs(m+S+_-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(m+1)/2,b=(S+1)/2,z=(_+1)/2,k=(g+x)/4,L=(v+A)/4,j=(w+y)/4;return N>b&&N>z?N<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(N),a=k/r,l=L/r):b>z?b<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(b),r=k/a,l=j/a):z<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(z),r=L/l,a=j/l),this.set(r,a,l,n),this}let F=Math.sqrt((y-w)*(y-w)+(v-A)*(v-A)+(x-g)*(x-g));return Math.abs(F)<.001&&(F=1),this.x=(y-w)/F,this.y=(v-A)/F,this.z=(x-g)/F,this.w=Math.acos((m+S+_-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=gt(this.x,e.x,n.x),this.y=gt(this.y,e.y,n.y),this.z=gt(this.z,e.z,n.z),this.w=gt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=gt(this.x,e,n),this.y=gt(this.y,e,n),this.z=gt(this.z,e,n),this.w=gt(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(gt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class E0 extends es{constructor(e=1,n=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=r.depth,this.scissor=new Yt(0,0,e,n),this.scissorTest=!1,this.viewport=new Yt(0,0,e,n);const a={width:e,height:n,depth:r.depth},l=new Nn(a);this.textures=[];const c=r.count;for(let d=0;d<c;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const n={minFilter:Si,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new rd(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends E0{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class sg extends Nn{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=pi,this.minFilter=pi,this.wrapR=qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class T0 extends Nn{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=pi,this.minFilter=pi,this.wrapR=qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $o{constructor(e=new K(1/0,1/0,1/0),n=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(li.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(li.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=li.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(n===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let c=0,d=l.count;c<d;c++)e.isMesh===!0?e.getVertexPosition(c,li):li.fromBufferAttribute(l,c),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),al.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),al.copy(r.boundingBox)),al.applyMatrix4(e.matrixWorld),this.union(al)}const a=e.children;for(let l=0,c=a.length;l<c;l++)this.expandByObject(a[l],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(No),ll.subVectors(this.max,No),Cs.subVectors(e.a,No),bs.subVectors(e.b,No),Ps.subVectors(e.c,No),gr.subVectors(bs,Cs),_r.subVectors(Ps,bs),Br.subVectors(Cs,Ps);let n=[0,-gr.z,gr.y,0,-_r.z,_r.y,0,-Br.z,Br.y,gr.z,0,-gr.x,_r.z,0,-_r.x,Br.z,0,-Br.x,-gr.y,gr.x,0,-_r.y,_r.x,0,-Br.y,Br.x,0];return!Lc(n,Cs,bs,Ps,ll)||(n=[1,0,0,0,1,0,0,0,1],!Lc(n,Cs,bs,Ps,ll))?!1:(ul.crossVectors(gr,_r),n=[ul.x,ul.y,ul.z],Lc(n,Cs,bs,Ps,ll))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ii=[new K,new K,new K,new K,new K,new K,new K,new K],li=new K,al=new $o,Cs=new K,bs=new K,Ps=new K,gr=new K,_r=new K,Br=new K,No=new K,ll=new K,ul=new K,zr=new K;function Lc(s,e,n,r,a){for(let l=0,c=s.length-3;l<=c;l+=3){zr.fromArray(s,l);const d=a.x*Math.abs(zr.x)+a.y*Math.abs(zr.y)+a.z*Math.abs(zr.z),h=e.dot(zr),m=n.dot(zr),g=r.dot(zr);if(Math.max(-Math.max(h,m,g),Math.min(h,m,g))>d)return!1}return!0}const w0=new $o,Fo=new K,Uc=new K;class sd{constructor(e=new K,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):w0.setFromPoints(e).getCenter(r);let a=0;for(let l=0,c=e.length;l<c;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fo.subVectors(e,this.center);const n=Fo.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Fo,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fo.copy(e.center).add(Uc)),this.expandByPoint(Fo.copy(e.center).sub(Uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ni=new K,Ic=new K,cl=new K,vr=new K,Nc=new K,fl=new K,Fc=new K;class og{constructor(e=new K,n=new K(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ni.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,n),Ni.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){Ic.copy(e).add(n).multiplyScalar(.5),cl.copy(n).sub(e).normalize(),vr.copy(this.origin).sub(Ic);const l=e.distanceTo(n)*.5,c=-this.direction.dot(cl),d=vr.dot(this.direction),h=-vr.dot(cl),m=vr.lengthSq(),g=Math.abs(1-c*c);let v,x,S,w;if(g>0)if(v=c*h-d,x=c*d-h,w=l*g,v>=0)if(x>=-w)if(x<=w){const A=1/g;v*=A,x*=A,S=v*(v+c*x+2*d)+x*(c*v+x+2*h)+m}else x=l,v=Math.max(0,-(c*x+d)),S=-v*v+x*(x+2*h)+m;else x=-l,v=Math.max(0,-(c*x+d)),S=-v*v+x*(x+2*h)+m;else x<=-w?(v=Math.max(0,-(-c*l+d)),x=v>0?-l:Math.min(Math.max(-l,-h),l),S=-v*v+x*(x+2*h)+m):x<=w?(v=0,x=Math.min(Math.max(-l,-h),l),S=x*(x+2*h)+m):(v=Math.max(0,-(c*l+d)),x=v>0?l:Math.min(Math.max(-l,-h),l),S=-v*v+x*(x+2*h)+m);else x=c>0?-l:l,v=Math.max(0,-(c*x+d)),S=-v*v+x*(x+2*h)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,v),a&&a.copy(Ic).addScaledVector(cl,x),S}intersectSphere(e,n){Ni.subVectors(e.center,this.origin);const r=Ni.dot(this.direction),a=Ni.dot(Ni)-r*r,l=e.radius*e.radius;if(a>l)return null;const c=Math.sqrt(l-a),d=r-c,h=r+c;return h<0?null:d<0?this.at(h,n):this.at(d,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,l,c,d,h;const m=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),g>=0?(l=(e.min.y-x.y)*g,c=(e.max.y-x.y)*g):(l=(e.max.y-x.y)*g,c=(e.min.y-x.y)*g),r>c||l>a||((l>r||isNaN(r))&&(r=l),(c<a||isNaN(a))&&(a=c),v>=0?(d=(e.min.z-x.z)*v,h=(e.max.z-x.z)*v):(d=(e.max.z-x.z)*v,h=(e.min.z-x.z)*v),r>h||d>a)||((d>r||r!==r)&&(r=d),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,n,r,a,l){Nc.subVectors(n,e),fl.subVectors(r,e),Fc.crossVectors(Nc,fl);let c=this.direction.dot(Fc),d;if(c>0){if(a)return null;d=1}else if(c<0)d=-1,c=-c;else return null;vr.subVectors(this.origin,e);const h=d*this.direction.dot(fl.crossVectors(vr,fl));if(h<0)return null;const m=d*this.direction.dot(Nc.cross(vr));if(m<0||h+m>c)return null;const g=-d*vr.dot(Fc);return g<0?null:this.at(g/c,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tn{constructor(e,n,r,a,l,c,d,h,m,g,v,x,S,w,A,y){tn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,c,d,h,m,g,v,x,S,w,A,y)}set(e,n,r,a,l,c,d,h,m,g,v,x,S,w,A,y){const _=this.elements;return _[0]=e,_[4]=n,_[8]=r,_[12]=a,_[1]=l,_[5]=c,_[9]=d,_[13]=h,_[2]=m,_[6]=g,_[10]=v,_[14]=x,_[3]=S,_[7]=w,_[11]=A,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tn().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/Ds.setFromMatrixColumn(e,0).length(),l=1/Ds.setFromMatrixColumn(e,1).length(),c=1/Ds.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*l,n[5]=r[5]*l,n[6]=r[6]*l,n[7]=0,n[8]=r[8]*c,n[9]=r[9]*c,n[10]=r[10]*c,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,l=e.z,c=Math.cos(r),d=Math.sin(r),h=Math.cos(a),m=Math.sin(a),g=Math.cos(l),v=Math.sin(l);if(e.order==="XYZ"){const x=c*g,S=c*v,w=d*g,A=d*v;n[0]=h*g,n[4]=-h*v,n[8]=m,n[1]=S+w*m,n[5]=x-A*m,n[9]=-d*h,n[2]=A-x*m,n[6]=w+S*m,n[10]=c*h}else if(e.order==="YXZ"){const x=h*g,S=h*v,w=m*g,A=m*v;n[0]=x+A*d,n[4]=w*d-S,n[8]=c*m,n[1]=c*v,n[5]=c*g,n[9]=-d,n[2]=S*d-w,n[6]=A+x*d,n[10]=c*h}else if(e.order==="ZXY"){const x=h*g,S=h*v,w=m*g,A=m*v;n[0]=x-A*d,n[4]=-c*v,n[8]=w+S*d,n[1]=S+w*d,n[5]=c*g,n[9]=A-x*d,n[2]=-c*m,n[6]=d,n[10]=c*h}else if(e.order==="ZYX"){const x=c*g,S=c*v,w=d*g,A=d*v;n[0]=h*g,n[4]=w*m-S,n[8]=x*m+A,n[1]=h*v,n[5]=A*m+x,n[9]=S*m-w,n[2]=-m,n[6]=d*h,n[10]=c*h}else if(e.order==="YZX"){const x=c*h,S=c*m,w=d*h,A=d*m;n[0]=h*g,n[4]=A-x*v,n[8]=w*v+S,n[1]=v,n[5]=c*g,n[9]=-d*g,n[2]=-m*g,n[6]=S*v+w,n[10]=x-A*v}else if(e.order==="XZY"){const x=c*h,S=c*m,w=d*h,A=d*m;n[0]=h*g,n[4]=-v,n[8]=m*g,n[1]=x*v+A,n[5]=c*g,n[9]=S*v-w,n[2]=w*v-S,n[6]=d*g,n[10]=A*v+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(A0,e,R0)}lookAt(e,n,r){const a=this.elements;return Hn.subVectors(e,n),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),xr.crossVectors(r,Hn),xr.lengthSq()===0&&(Math.abs(r.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),xr.crossVectors(r,Hn)),xr.normalize(),dl.crossVectors(Hn,xr),a[0]=xr.x,a[4]=dl.x,a[8]=Hn.x,a[1]=xr.y,a[5]=dl.y,a[9]=Hn.y,a[2]=xr.z,a[6]=dl.z,a[10]=Hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,c=r[0],d=r[4],h=r[8],m=r[12],g=r[1],v=r[5],x=r[9],S=r[13],w=r[2],A=r[6],y=r[10],_=r[14],F=r[3],N=r[7],b=r[11],z=r[15],k=a[0],L=a[4],j=a[8],R=a[12],C=a[1],V=a[5],Q=a[9],ie=a[13],de=a[2],ue=a[6],le=a[10],fe=a[14],B=a[3],oe=a[7],re=a[11],U=a[15];return l[0]=c*k+d*C+h*de+m*B,l[4]=c*L+d*V+h*ue+m*oe,l[8]=c*j+d*Q+h*le+m*re,l[12]=c*R+d*ie+h*fe+m*U,l[1]=g*k+v*C+x*de+S*B,l[5]=g*L+v*V+x*ue+S*oe,l[9]=g*j+v*Q+x*le+S*re,l[13]=g*R+v*ie+x*fe+S*U,l[2]=w*k+A*C+y*de+_*B,l[6]=w*L+A*V+y*ue+_*oe,l[10]=w*j+A*Q+y*le+_*re,l[14]=w*R+A*ie+y*fe+_*U,l[3]=F*k+N*C+b*de+z*B,l[7]=F*L+N*V+b*ue+z*oe,l[11]=F*j+N*Q+b*le+z*re,l[15]=F*R+N*ie+b*fe+z*U,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],l=e[12],c=e[1],d=e[5],h=e[9],m=e[13],g=e[2],v=e[6],x=e[10],S=e[14],w=e[3],A=e[7],y=e[11],_=e[15];return w*(+l*h*v-a*m*v-l*d*x+r*m*x+a*d*S-r*h*S)+A*(+n*h*S-n*m*x+l*c*x-a*c*S+a*m*g-l*h*g)+y*(+n*m*v-n*d*S-l*c*v+r*c*S+l*d*g-r*m*g)+_*(-a*d*g-n*h*v+n*d*x+a*c*v-r*c*x+r*h*g)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],c=e[4],d=e[5],h=e[6],m=e[7],g=e[8],v=e[9],x=e[10],S=e[11],w=e[12],A=e[13],y=e[14],_=e[15],F=v*y*m-A*x*m+A*h*S-d*y*S-v*h*_+d*x*_,N=w*x*m-g*y*m-w*h*S+c*y*S+g*h*_-c*x*_,b=g*A*m-w*v*m+w*d*S-c*A*S-g*d*_+c*v*_,z=w*v*h-g*A*h-w*d*x+c*A*x+g*d*y-c*v*y,k=n*F+r*N+a*b+l*z;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/k;return e[0]=F*L,e[1]=(A*x*l-v*y*l-A*a*S+r*y*S+v*a*_-r*x*_)*L,e[2]=(d*y*l-A*h*l+A*a*m-r*y*m-d*a*_+r*h*_)*L,e[3]=(v*h*l-d*x*l-v*a*m+r*x*m+d*a*S-r*h*S)*L,e[4]=N*L,e[5]=(g*y*l-w*x*l+w*a*S-n*y*S-g*a*_+n*x*_)*L,e[6]=(w*h*l-c*y*l-w*a*m+n*y*m+c*a*_-n*h*_)*L,e[7]=(c*x*l-g*h*l+g*a*m-n*x*m-c*a*S+n*h*S)*L,e[8]=b*L,e[9]=(w*v*l-g*A*l-w*r*S+n*A*S+g*r*_-n*v*_)*L,e[10]=(c*A*l-w*d*l+w*r*m-n*A*m-c*r*_+n*d*_)*L,e[11]=(g*d*l-c*v*l-g*r*m+n*v*m+c*r*S-n*d*S)*L,e[12]=z*L,e[13]=(g*A*a-w*v*a+w*r*x-n*A*x-g*r*y+n*v*y)*L,e[14]=(w*d*a-c*A*a-w*r*h+n*A*h+c*r*y-n*d*y)*L,e[15]=(c*v*a-g*d*a+g*r*h-n*v*h-c*r*x+n*d*x)*L,this}scale(e){const n=this.elements,r=e.x,a=e.y,l=e.z;return n[0]*=r,n[4]*=a,n[8]*=l,n[1]*=r,n[5]*=a,n[9]*=l,n[2]*=r,n[6]*=a,n[10]*=l,n[3]*=r,n[7]*=a,n[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),l=1-r,c=e.x,d=e.y,h=e.z,m=l*c,g=l*d;return this.set(m*c+r,m*d-a*h,m*h+a*d,0,m*d+a*h,g*d+r,g*h-a*c,0,m*h-a*d,g*h+a*c,l*h*h+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,l,c){return this.set(1,r,l,0,e,1,c,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,l=n._x,c=n._y,d=n._z,h=n._w,m=l+l,g=c+c,v=d+d,x=l*m,S=l*g,w=l*v,A=c*g,y=c*v,_=d*v,F=h*m,N=h*g,b=h*v,z=r.x,k=r.y,L=r.z;return a[0]=(1-(A+_))*z,a[1]=(S+b)*z,a[2]=(w-N)*z,a[3]=0,a[4]=(S-b)*k,a[5]=(1-(x+_))*k,a[6]=(y+F)*k,a[7]=0,a[8]=(w+N)*L,a[9]=(y-F)*L,a[10]=(1-(x+A))*L,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let l=Ds.set(a[0],a[1],a[2]).length();const c=Ds.set(a[4],a[5],a[6]).length(),d=Ds.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ui.copy(this);const m=1/l,g=1/c,v=1/d;return ui.elements[0]*=m,ui.elements[1]*=m,ui.elements[2]*=m,ui.elements[4]*=g,ui.elements[5]*=g,ui.elements[6]*=g,ui.elements[8]*=v,ui.elements[9]*=v,ui.elements[10]*=v,n.setFromRotationMatrix(ui),r.x=l,r.y=c,r.z=d,this}makePerspective(e,n,r,a,l,c,d=Mi,h=!1){const m=this.elements,g=2*l/(n-e),v=2*l/(r-a),x=(n+e)/(n-e),S=(r+a)/(r-a);let w,A;if(h)w=l/(c-l),A=c*l/(c-l);else if(d===Mi)w=-(c+l)/(c-l),A=-2*c*l/(c-l);else if(d===kl)w=-c/(c-l),A=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=g,m[4]=0,m[8]=x,m[12]=0,m[1]=0,m[5]=v,m[9]=S,m[13]=0,m[2]=0,m[6]=0,m[10]=w,m[14]=A,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,n,r,a,l,c,d=Mi,h=!1){const m=this.elements,g=2/(n-e),v=2/(r-a),x=-(n+e)/(n-e),S=-(r+a)/(r-a);let w,A;if(h)w=1/(c-l),A=c/(c-l);else if(d===Mi)w=-2/(c-l),A=-(c+l)/(c-l);else if(d===kl)w=-1/(c-l),A=-l/(c-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=g,m[4]=0,m[8]=0,m[12]=x,m[1]=0,m[5]=v,m[9]=0,m[13]=S,m[2]=0,m[6]=0,m[10]=w,m[14]=A,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Ds=new K,ui=new tn,A0=new K(0,0,0),R0=new K(1,1,1),xr=new K,dl=new K,Hn=new K,Jp=new tn,em=new Jr;class qi{constructor(e=0,n=0,r=0,a=qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,l=a[0],c=a[4],d=a[8],h=a[1],m=a[5],g=a[9],v=a[2],x=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-v,l),this._z=0);break;case"ZXY":this._x=Math.asin(gt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,S),this._z=Math.atan2(-c,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-gt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-c,m));break;case"YZX":this._z=Math.asin(gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-v,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return Jp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jp,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return em.setFromEuler(this),this.setFromQuaternion(em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qi.DEFAULT_ORDER="XYZ";class ag{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let C0=0;const tm=new K,Ls=new Jr,Fi=new tn,hl=new K,Oo=new K,b0=new K,P0=new Jr,nm=new K(1,0,0),im=new K(0,1,0),rm=new K(0,0,1),sm={type:"added"},D0={type:"removed"},Us={type:"childadded",child:null},Oc={type:"childremoved",child:null};class Gn extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=Zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gn.DEFAULT_UP.clone();const e=new K,n=new qi,r=new Jr,a=new K(1,1,1);function l(){r.setFromEuler(n,!1)}function c(){n.setFromQuaternion(r,void 0,!1)}n._onChange(l),r._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new tn},normalMatrix:{value:new dt}}),this.matrix=new tn,this.matrixWorld=new tn,this.matrixAutoUpdate=Gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ag,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(nm,e)}rotateY(e){return this.rotateOnAxis(im,e)}rotateZ(e){return this.rotateOnAxis(rm,e)}translateOnAxis(e,n){return tm.copy(e).applyQuaternion(this.quaternion),this.position.add(tm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(nm,e)}translateY(e){return this.translateOnAxis(im,e)}translateZ(e){return this.translateOnAxis(rm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?hl.copy(e):hl.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(Oo,hl,this.up):Fi.lookAt(hl,Oo,this.up),this.quaternion.setFromRotationMatrix(Fi),a&&(Fi.extractRotation(a.matrixWorld),Ls.setFromRotationMatrix(Fi),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sm),Us.child=e,this.dispatchEvent(Us),Us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(D0),Oc.child=e,this.dispatchEvent(Oc),Oc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sm),Us.child=e,this.dispatchEvent(Us),Us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const c=this.children[r].getObjectByProperty(e,n);if(c!==void 0)return c}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let l=0,c=a.length;l<c;l++)a[l].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,e,b0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,P0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let l=0,c=a.length;l<c;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(d=>({...d})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function l(d,h){return d[h.uuid]===void 0&&(d[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const h=d.shapes;if(Array.isArray(h))for(let m=0,g=h.length;m<g;m++){const v=h[m];l(e.shapes,v)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let h=0,m=this.material.length;h<m;h++)d.push(l(e.materials,this.material[h]));a.material=d}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const h=this.animations[d];a.animations.push(l(e.animations,h))}}if(n){const d=c(e.geometries),h=c(e.materials),m=c(e.textures),g=c(e.images),v=c(e.shapes),x=c(e.skeletons),S=c(e.animations),w=c(e.nodes);d.length>0&&(r.geometries=d),h.length>0&&(r.materials=h),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),w.length>0&&(r.nodes=w)}return r.object=a,r;function c(d){const h=[];for(const m in d){const g=d[m];delete g.metadata,h.push(g)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}Gn.DEFAULT_UP=new K(0,1,0);Gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ci=new K,Oi=new K,kc=new K,ki=new K,Is=new K,Ns=new K,om=new K,Bc=new K,zc=new K,Hc=new K,Vc=new Yt,Gc=new Yt,Wc=new Yt;class fi{constructor(e=new K,n=new K,r=new K){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),ci.subVectors(e,n),a.cross(ci);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,n,r,a,l){ci.subVectors(a,n),Oi.subVectors(r,n),kc.subVectors(e,n);const c=ci.dot(ci),d=ci.dot(Oi),h=ci.dot(kc),m=Oi.dot(Oi),g=Oi.dot(kc),v=c*m-d*d;if(v===0)return l.set(0,0,0),null;const x=1/v,S=(m*h-d*g)*x,w=(c*g-d*h)*x;return l.set(1-S-w,w,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,n,r,a,l,c,d,h){return this.getBarycoord(e,n,r,a,ki)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,ki.x),h.addScaledVector(c,ki.y),h.addScaledVector(d,ki.z),h)}static getInterpolatedAttribute(e,n,r,a,l,c){return Vc.setScalar(0),Gc.setScalar(0),Wc.setScalar(0),Vc.fromBufferAttribute(e,n),Gc.fromBufferAttribute(e,r),Wc.fromBufferAttribute(e,a),c.setScalar(0),c.addScaledVector(Vc,l.x),c.addScaledVector(Gc,l.y),c.addScaledVector(Wc,l.z),c}static isFrontFacing(e,n,r,a){return ci.subVectors(r,n),Oi.subVectors(e,n),ci.cross(Oi).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),ci.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return fi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,l){return fi.getInterpolation(e,this.a,this.b,this.c,n,r,a,l)}containsPoint(e){return fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,l=this.c;let c,d;Is.subVectors(a,r),Ns.subVectors(l,r),Bc.subVectors(e,r);const h=Is.dot(Bc),m=Ns.dot(Bc);if(h<=0&&m<=0)return n.copy(r);zc.subVectors(e,a);const g=Is.dot(zc),v=Ns.dot(zc);if(g>=0&&v<=g)return n.copy(a);const x=h*v-g*m;if(x<=0&&h>=0&&g<=0)return c=h/(h-g),n.copy(r).addScaledVector(Is,c);Hc.subVectors(e,l);const S=Is.dot(Hc),w=Ns.dot(Hc);if(w>=0&&S<=w)return n.copy(l);const A=S*m-h*w;if(A<=0&&m>=0&&w<=0)return d=m/(m-w),n.copy(r).addScaledVector(Ns,d);const y=g*w-S*v;if(y<=0&&v-g>=0&&S-w>=0)return om.subVectors(l,a),d=(v-g)/(v-g+(S-w)),n.copy(a).addScaledVector(om,d);const _=1/(y+A+x);return c=A*_,d=x*_,n.copy(r).addScaledVector(Is,c).addScaledVector(Ns,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const lg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},pl={h:0,s:0,l:0};function Xc(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class Tt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Qn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.colorSpaceToWorking(this,n),this}setRGB(e,n,r,a=Et.workingColorSpace){return this.r=e,this.g=n,this.b=r,Et.colorSpaceToWorking(this,a),this}setHSL(e,n,r,a=Et.workingColorSpace){if(e=id(e,1),n=gt(n,0,1),r=gt(r,0,1),n===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+n):r+n-r*n,c=2*r-l;this.r=Xc(c,l,e+1/3),this.g=Xc(c,l,e),this.b=Xc(c,l,e-1/3)}return Et.colorSpaceToWorking(this,a),this}setStyle(e,n=Qn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const c=a[1],d=a[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,n);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,n);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,n);if(c===6)return this.setHex(parseInt(l,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Qn){const r=lg[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qn){return Et.workingToColorSpace(xn.copy(this),e),Math.round(gt(xn.r*255,0,255))*65536+Math.round(gt(xn.g*255,0,255))*256+Math.round(gt(xn.b*255,0,255))}getHexString(e=Qn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Et.workingColorSpace){Et.workingToColorSpace(xn.copy(this),n);const r=xn.r,a=xn.g,l=xn.b,c=Math.max(r,a,l),d=Math.min(r,a,l);let h,m;const g=(d+c)/2;if(d===c)h=0,m=0;else{const v=c-d;switch(m=g<=.5?v/(c+d):v/(2-c-d),c){case r:h=(a-l)/v+(a<l?6:0);break;case a:h=(l-r)/v+2;break;case l:h=(r-a)/v+4;break}h/=6}return e.h=h,e.s=m,e.l=g,e}getRGB(e,n=Et.workingColorSpace){return Et.workingToColorSpace(xn.copy(this),n),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Qn){Et.workingToColorSpace(xn.copy(this),e);const n=xn.r,r=xn.g,a=xn.b;return e!==Qn?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+n,yr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(yr),e.getHSL(pl);const r=Ho(yr.h,pl.h,n),a=Ho(yr.s,pl.s,n),l=Ho(yr.l,pl.l,n);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*n+l[3]*r+l[6]*a,this.g=l[1]*n+l[4]*r+l[7]*a,this.b=l[2]*n+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new Tt;Tt.NAMES=lg;let L0=0;class Vl extends es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=Zs(),this.name="",this.type="Material",this.blending=Ws,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sf,this.blendDst=of,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(r.blending=this.blending),this.side!==Er&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==sf&&(r.blendSrc=this.blendSrc),this.blendDst!==of&&(r.blendDst=this.blendDst),this.blendEquation!==jr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(r.stencilFail=this.stencilFail),this.stencilZFail!==As&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const c=[];for(const d in l){const h=l[d];delete h.metadata,c.push(h)}return c}if(n){const l=a(e.textures),c=a(e.images);l.length>0&&(r.textures=l),c.length>0&&(r.images=c)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=n[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class od extends Vl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.combine=jm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new K,ml=new st;let U0=0;class mi{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:U0++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=jp,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)ml.fromBufferAttribute(this,n),ml.applyMatrix3(e),this.setXY(n,ml.x,ml.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.applyMatrix3(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.applyMatrix4(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.applyNormalMatrix(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)Kt.fromBufferAttribute(this,n),Kt.transformDirection(e),this.setXYZ(n,Kt.x,Kt.y,Kt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=zs(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=Tn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=zs(n,this.array)),n}setX(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=zs(n,this.array)),n}setY(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=zs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=zs(n,this.array)),n}setW(e,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=Tn(n,this.array),r=Tn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=Tn(n,this.array),r=Tn(r,this.array),a=Tn(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,l){return e*=this.itemSize,this.normalized&&(n=Tn(n,this.array),r=Tn(r,this.array),a=Tn(a,this.array),l=Tn(l,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jp&&(e.usage=this.usage),e}}class ug extends mi{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class cg extends mi{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class ji extends mi{constructor(e,n,r){super(new Float32Array(e),n,r)}}let I0=0;const Zn=new tn,jc=new Gn,Fs=new K,Vn=new $o,ko=new $o,ln=new K;class Ki extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=Zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rg(e)?cg:ug)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new dt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,n,r){return Zn.makeTranslation(e,n,r),this.applyMatrix4(Zn),this}scale(e,n,r){return Zn.makeScale(e,n,r),this.applyMatrix4(Zn),this}lookAt(e){return jc.lookAt(e),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];r.push(c.x,c.y,c.z||0)}this.setAttribute("position",new ji(r,3))}else{const r=Math.min(e.length,n.count);for(let a=0;a<r;a++){const l=e[a];n.setXYZ(a,l.x,l.y,l.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $o);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const l=n[r];Vn.setFromBufferAttribute(l),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Vn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Vn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Vn.min),this.boundingBox.expandByPoint(Vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sd);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const r=this.boundingSphere.center;if(Vn.setFromBufferAttribute(e),n)for(let l=0,c=n.length;l<c;l++){const d=n[l];ko.setFromBufferAttribute(d),this.morphTargetsRelative?(ln.addVectors(Vn.min,ko.min),Vn.expandByPoint(ln),ln.addVectors(Vn.max,ko.max),Vn.expandByPoint(ln)):(Vn.expandByPoint(ko.min),Vn.expandByPoint(ko.max))}Vn.getCenter(r);let a=0;for(let l=0,c=e.count;l<c;l++)ln.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(ln));if(n)for(let l=0,c=n.length;l<c;l++){const d=n[l],h=this.morphTargetsRelative;for(let m=0,g=d.count;m<g;m++)ln.fromBufferAttribute(d,m),h&&(Fs.fromBufferAttribute(e,m),ln.add(Fs)),a=Math.max(a,r.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,l=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mi(new Float32Array(4*r.count),4));const c=this.getAttribute("tangent"),d=[],h=[];for(let j=0;j<r.count;j++)d[j]=new K,h[j]=new K;const m=new K,g=new K,v=new K,x=new st,S=new st,w=new st,A=new K,y=new K;function _(j,R,C){m.fromBufferAttribute(r,j),g.fromBufferAttribute(r,R),v.fromBufferAttribute(r,C),x.fromBufferAttribute(l,j),S.fromBufferAttribute(l,R),w.fromBufferAttribute(l,C),g.sub(m),v.sub(m),S.sub(x),w.sub(x);const V=1/(S.x*w.y-w.x*S.y);isFinite(V)&&(A.copy(g).multiplyScalar(w.y).addScaledVector(v,-S.y).multiplyScalar(V),y.copy(v).multiplyScalar(S.x).addScaledVector(g,-w.x).multiplyScalar(V),d[j].add(A),d[R].add(A),d[C].add(A),h[j].add(y),h[R].add(y),h[C].add(y))}let F=this.groups;F.length===0&&(F=[{start:0,count:e.count}]);for(let j=0,R=F.length;j<R;++j){const C=F[j],V=C.start,Q=C.count;for(let ie=V,de=V+Q;ie<de;ie+=3)_(e.getX(ie+0),e.getX(ie+1),e.getX(ie+2))}const N=new K,b=new K,z=new K,k=new K;function L(j){z.fromBufferAttribute(a,j),k.copy(z);const R=d[j];N.copy(R),N.sub(z.multiplyScalar(z.dot(R))).normalize(),b.crossVectors(k,R);const V=b.dot(h[j])<0?-1:1;c.setXYZW(j,N.x,N.y,N.z,V)}for(let j=0,R=F.length;j<R;++j){const C=F[j],V=C.start,Q=C.count;for(let ie=V,de=V+Q;ie<de;ie+=3)L(e.getX(ie+0)),L(e.getX(ie+1)),L(e.getX(ie+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new mi(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new K,l=new K,c=new K,d=new K,h=new K,m=new K,g=new K,v=new K;if(e)for(let x=0,S=e.count;x<S;x+=3){const w=e.getX(x+0),A=e.getX(x+1),y=e.getX(x+2);a.fromBufferAttribute(n,w),l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,y),g.subVectors(c,l),v.subVectors(a,l),g.cross(v),d.fromBufferAttribute(r,w),h.fromBufferAttribute(r,A),m.fromBufferAttribute(r,y),d.add(g),h.add(g),m.add(g),r.setXYZ(w,d.x,d.y,d.z),r.setXYZ(A,h.x,h.y,h.z),r.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,S=n.count;x<S;x+=3)a.fromBufferAttribute(n,x+0),l.fromBufferAttribute(n,x+1),c.fromBufferAttribute(n,x+2),g.subVectors(c,l),v.subVectors(a,l),g.cross(v),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)ln.fromBufferAttribute(e,n),ln.normalize(),e.setXYZ(n,ln.x,ln.y,ln.z)}toNonIndexed(){function e(d,h){const m=d.array,g=d.itemSize,v=d.normalized,x=new m.constructor(h.length*g);let S=0,w=0;for(let A=0,y=h.length;A<y;A++){d.isInterleavedBufferAttribute?S=h[A]*d.data.stride+d.offset:S=h[A]*g;for(let _=0;_<g;_++)x[w++]=m[S++]}return new mi(x,g,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ki,r=this.index.array,a=this.attributes;for(const d in a){const h=a[d],m=e(h,r);n.setAttribute(d,m)}const l=this.morphAttributes;for(const d in l){const h=[],m=l[d];for(let g=0,v=m.length;g<v;g++){const x=m[g],S=e(x,r);h.push(S)}n.morphAttributes[d]=h}n.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let d=0,h=c.length;d<h;d++){const m=c[d];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const h in r){const m=r[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],g=[];for(let v=0,x=m.length;v<x;v++){const S=m[v];g.push(S.toJSON(e.data))}g.length>0&&(a[h]=g,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const a=e.attributes;for(const m in a){const g=a[m];this.setAttribute(m,g.clone(n))}const l=e.morphAttributes;for(const m in l){const g=[],v=l[m];for(let x=0,S=v.length;x<S;x++)g.push(v[x].clone(n));this.morphAttributes[m]=g}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let m=0,g=c.length;m<g;m++){const v=c[m];this.addGroup(v.start,v.count,v.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const am=new tn,Hr=new og,gl=new sd,lm=new K,_l=new K,vl=new K,xl=new K,Yc=new K,yl=new K,um=new K,Sl=new K;class hi extends Gn{constructor(e=new Ki,n=new od){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=a.length;l<c;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,c=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(l&&d){yl.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const g=d[h],v=l[h];g!==0&&(Yc.fromBufferAttribute(v,e),c?yl.addScaledVector(Yc,g):yl.addScaledVector(Yc.sub(n),g))}n.add(yl)}return n}raycast(e,n){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),gl.copy(r.boundingSphere),gl.applyMatrix4(l),Hr.copy(e.ray).recast(e.near),!(gl.containsPoint(Hr.origin)===!1&&(Hr.intersectSphere(gl,lm)===null||Hr.origin.distanceToSquared(lm)>(e.far-e.near)**2))&&(am.copy(l).invert(),Hr.copy(e.ray).applyMatrix4(am),!(r.boundingBox!==null&&Hr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Hr)))}_computeIntersections(e,n,r){let a;const l=this.geometry,c=this.material,d=l.index,h=l.attributes.position,m=l.attributes.uv,g=l.attributes.uv1,v=l.attributes.normal,x=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(c))for(let w=0,A=x.length;w<A;w++){const y=x[w],_=c[y.materialIndex],F=Math.max(y.start,S.start),N=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let b=F,z=N;b<z;b+=3){const k=d.getX(b),L=d.getX(b+1),j=d.getX(b+2);a=Ml(this,_,e,r,m,g,v,k,L,j),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const w=Math.max(0,S.start),A=Math.min(d.count,S.start+S.count);for(let y=w,_=A;y<_;y+=3){const F=d.getX(y),N=d.getX(y+1),b=d.getX(y+2);a=Ml(this,c,e,r,m,g,v,F,N,b),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(c))for(let w=0,A=x.length;w<A;w++){const y=x[w],_=c[y.materialIndex],F=Math.max(y.start,S.start),N=Math.min(h.count,Math.min(y.start+y.count,S.start+S.count));for(let b=F,z=N;b<z;b+=3){const k=b,L=b+1,j=b+2;a=Ml(this,_,e,r,m,g,v,k,L,j),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const w=Math.max(0,S.start),A=Math.min(h.count,S.start+S.count);for(let y=w,_=A;y<_;y+=3){const F=y,N=y+1,b=y+2;a=Ml(this,c,e,r,m,g,v,F,N,b),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}}}function N0(s,e,n,r,a,l,c,d){let h;if(e.side===In?h=r.intersectTriangle(c,l,a,!0,d):h=r.intersectTriangle(a,l,c,e.side===Er,d),h===null)return null;Sl.copy(d),Sl.applyMatrix4(s.matrixWorld);const m=n.ray.origin.distanceTo(Sl);return m<n.near||m>n.far?null:{distance:m,point:Sl.clone(),object:s}}function Ml(s,e,n,r,a,l,c,d,h,m){s.getVertexPosition(d,_l),s.getVertexPosition(h,vl),s.getVertexPosition(m,xl);const g=N0(s,e,n,r,_l,vl,xl,um);if(g){const v=new K;fi.getBarycoord(um,_l,vl,xl,v),a&&(g.uv=fi.getInterpolatedAttribute(a,d,h,m,v,new st)),l&&(g.uv1=fi.getInterpolatedAttribute(l,d,h,m,v,new st)),c&&(g.normal=fi.getInterpolatedAttribute(c,d,h,m,v,new K),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:h,c:m,normal:new K,materialIndex:0};fi.getNormal(_l,vl,xl,x.normal),g.face=x,g.barycoord=v}return g}class Zo extends Ki{constructor(e=1,n=1,r=1,a=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:l,depthSegments:c};const d=this;a=Math.floor(a),l=Math.floor(l),c=Math.floor(c);const h=[],m=[],g=[],v=[];let x=0,S=0;w("z","y","x",-1,-1,r,n,e,c,l,0),w("z","y","x",1,-1,r,n,-e,c,l,1),w("x","z","y",1,1,e,r,n,a,c,2),w("x","z","y",1,-1,e,r,-n,a,c,3),w("x","y","z",1,-1,e,n,r,a,l,4),w("x","y","z",-1,-1,e,n,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new ji(m,3)),this.setAttribute("normal",new ji(g,3)),this.setAttribute("uv",new ji(v,2));function w(A,y,_,F,N,b,z,k,L,j,R){const C=b/L,V=z/j,Q=b/2,ie=z/2,de=k/2,ue=L+1,le=j+1;let fe=0,B=0;const oe=new K;for(let re=0;re<le;re++){const U=re*V-ie;for(let ne=0;ne<ue;ne++){const Fe=ne*C-Q;oe[A]=Fe*F,oe[y]=U*N,oe[_]=de,m.push(oe.x,oe.y,oe.z),oe[A]=0,oe[y]=0,oe[_]=k>0?1:-1,g.push(oe.x,oe.y,oe.z),v.push(ne/L),v.push(1-re/j),fe+=1}}for(let re=0;re<j;re++)for(let U=0;U<L;U++){const ne=x+U+ue*re,Fe=x+U+ue*(re+1),Xe=x+(U+1)+ue*(re+1),He=x+(U+1)+ue*re;h.push(ne,Fe,He),h.push(Fe,Xe,He),B+=6}d.addGroup(S,B,R),S+=B,x+=fe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ks(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function wn(s){const e={};for(let n=0;n<s.length;n++){const r=Ks(s[n]);for(const a in r)e[a]=r[a]}return e}function F0(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function fg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const zl={clone:Ks,merge:wn};var O0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,k0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Vl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O0,this.fragmentShader=k0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=F0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const c=this.uniforms[a].value;c&&c.isTexture?n.uniforms[a]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?n.uniforms[a]={type:"c",value:c.getHex()}:c&&c.isVector2?n.uniforms[a]={type:"v2",value:c.toArray()}:c&&c.isVector3?n.uniforms[a]={type:"v3",value:c.toArray()}:c&&c.isVector4?n.uniforms[a]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?n.uniforms[a]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?n.uniforms[a]={type:"m4",value:c.toArray()}:n.uniforms[a]={value:c}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class dg extends Gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tn,this.projectionMatrix=new tn,this.projectionMatrixInverse=new tn,this.coordinateSystem=Mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sr=new K,cm=new st,fm=new st;class Jn extends dg{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=jo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jo*2*Math.atan(Math.tan(zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){Sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z),Sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z)}getViewSize(e,n){return this.getViewBounds(e,cm,fm),n.subVectors(fm,cm)}setViewOffset(e,n,r,a,l,c){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zo*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,l=-.5*a;const c=this.view;if(this.view!==null&&this.view.enabled){const h=c.fullWidth,m=c.fullHeight;l+=c.offsetX*a/h,n-=c.offsetY*r/m,a*=c.width/h,r*=c.height/m}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,n,n-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Os=-90,ks=1;class B0 extends Gn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Jn(Os,ks,e,n);a.layers=this.layers,this.add(a);const l=new Jn(Os,ks,e,n);l.layers=this.layers,this.add(l);const c=new Jn(Os,ks,e,n);c.layers=this.layers,this.add(c);const d=new Jn(Os,ks,e,n);d.layers=this.layers,this.add(d);const h=new Jn(Os,ks,e,n);h.layers=this.layers,this.add(h);const m=new Jn(Os,ks,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,l,c,d,h]=n;for(const m of n)this.remove(m);if(e===Mi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===kl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,c,d,h,m,g]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,l),e.setRenderTarget(r,1,a),e.render(n,c),e.setRenderTarget(r,2,a),e.render(n,d),e.setRenderTarget(r,3,a),e.render(n,h),e.setRenderTarget(r,4,a),e.render(n,m),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,a),e.render(n,g),e.setRenderTarget(v,x,S),e.xr.enabled=w,r.texture.needsPMREMUpdate=!0}}class hg extends Nn{constructor(e=[],n=Ys,r,a,l,c,d,h,m,g){super(e,n,r,a,l,c,d,h,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class z0 extends ei{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new hg(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Zo(5,5,5),l=new An({name:"CubemapFromEquirect",uniforms:Ks(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:In,blending:Gi});l.uniforms.tEquirect.value=n;const c=new hi(a,l),d=n.minFilter;return n.minFilter===Kr&&(n.minFilter=Si),new B0(1,10,this).update(e,c),n.minFilter=d,c.geometry.dispose(),c.material.dispose(),this}clear(e,n=!0,r=!0,a=!0){const l=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(n,r,a);e.setRenderTarget(l)}}class El extends Gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const H0={type:"move"};class qc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new El,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new El,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new El,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,l=null,c=null;const d=this._targetRay,h=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){c=!0;for(const A of e.hand.values()){const y=n.getJointPose(A,r),_=this._getHandJoint(m,A);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const g=m.joints["index-finger-tip"],v=m.joints["thumb-tip"],x=g.position.distanceTo(v.position),S=.02,w=.005;m.inputState.pinching&&x>S+w?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-w&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=n.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));d!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(H0)))}return d!==null&&(d.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new El;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class V0 extends Gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qi,this.environmentIntensity=1,this.environmentRotation=new qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Kc=new K,G0=new K,W0=new dt;class Mr{constructor(e=new K(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Kc.subVectors(r,n).cross(G0.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Kc),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:n.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||W0.getNormalMatrix(e),a=this.coplanarPoint(Kc).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vr=new sd,X0=new st(.5,.5),Tl=new K;class pg{constructor(e=new Mr,n=new Mr,r=new Mr,a=new Mr,l=new Mr,c=new Mr){this.planes=[e,n,r,a,l,c]}set(e,n,r,a,l,c){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(r),d[3].copy(a),d[4].copy(l),d[5].copy(c),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Mi,r=!1){const a=this.planes,l=e.elements,c=l[0],d=l[1],h=l[2],m=l[3],g=l[4],v=l[5],x=l[6],S=l[7],w=l[8],A=l[9],y=l[10],_=l[11],F=l[12],N=l[13],b=l[14],z=l[15];if(a[0].setComponents(m-c,S-g,_-w,z-F).normalize(),a[1].setComponents(m+c,S+g,_+w,z+F).normalize(),a[2].setComponents(m+d,S+v,_+A,z+N).normalize(),a[3].setComponents(m-d,S-v,_-A,z-N).normalize(),r)a[4].setComponents(h,x,y,b).normalize(),a[5].setComponents(m-h,S-x,_-y,z-b).normalize();else if(a[4].setComponents(m-h,S-x,_-y,z-b).normalize(),n===Mi)a[5].setComponents(m+h,S+x,_+y,z+b).normalize();else if(n===kl)a[5].setComponents(h,x,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vr)}intersectsSprite(e){Vr.center.set(0,0,0);const n=X0.distanceTo(e.center);return Vr.radius=.7071067811865476+n,Vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(n[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(Tl.x=a.normal.x>0?e.max.x:e.min.x,Tl.y=a.normal.y>0?e.max.y:e.min.y,Tl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Tl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class mg extends Nn{constructor(e,n,r=Zr,a,l,c,d=pi,h=pi,m,g=Wo,v=1){if(g!==Wo&&g!==Xo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:n,depth:v};super(x,a,l,c,d,h,g,r,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class gg extends Nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Gl extends Ki{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const l=e/2,c=n/2,d=Math.floor(r),h=Math.floor(a),m=d+1,g=h+1,v=e/d,x=n/h,S=[],w=[],A=[],y=[];for(let _=0;_<g;_++){const F=_*x-c;for(let N=0;N<m;N++){const b=N*v-l;w.push(b,-F,0),A.push(0,0,1),y.push(N/d),y.push(1-_/h)}}for(let _=0;_<h;_++)for(let F=0;F<d;F++){const N=F+m*_,b=F+m*(_+1),z=F+1+m*(_+1),k=F+1+m*_;S.push(N,b,k),S.push(b,z,k)}this.setIndex(S),this.setAttribute("position",new ji(w,3)),this.setAttribute("normal",new ji(A,3)),this.setAttribute("uv",new ji(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gl(e.width,e.height,e.widthSegments,e.heightSegments)}}class j0 extends Vl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Y0 extends Vl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class _g extends dg{constructor(e=-1,n=1,r=1,a=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,c=r+e,d=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,c=l+m*this.view.width,d-=g*this.view.offsetY,h=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,c,d,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class q0 extends Jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class K0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}class dm{constructor(e=1,n=0,r=0){this.radius=e,this.phi=n,this.theta=r}set(e,n,r){return this.radius=e,this.phi=n,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=gt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,r){return this.radius=Math.sqrt(e*e+n*n+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(gt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class $0 extends es{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function hm(s,e,n,r){const a=Z0(r);switch(n){case Qm:return s*e;case eg:return s*e/a.components*a.byteLength;case ed:return s*e/a.components*a.byteLength;case tg:return s*e*2/a.components*a.byteLength;case td:return s*e*2/a.components*a.byteLength;case Jm:return s*e*3/a.components*a.byteLength;case di:return s*e*4/a.components*a.byteLength;case nd:return s*e*4/a.components*a.byteLength;case Dl:case Ll:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ul:case Il:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case xf:case Sf:return Math.max(s,16)*Math.max(e,8)/4;case vf:case yf:return Math.max(s,8)*Math.max(e,8)/2;case Mf:case Ef:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Tf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Af:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Rf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Cf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case bf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Pf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Df:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Lf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Uf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case If:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Nf:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ff:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Of:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case kf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Bf:case zf:case Hf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Vf:case Gf:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Wf:case Xf:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Z0(s){switch(s){case Yi:case qm:return{byteLength:1,components:1};case Vo:case Km:case Ei:return{byteLength:2,components:1};case Qf:case Jf:return{byteLength:2,components:4};case Zr:case Zf:case Vi:return{byteLength:4,components:1};case $m:case Zm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$f}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$f);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vg(){let s=null,e=!1,n=null,r=null;function a(l,c){n(l,c),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){n=l},setContext:function(l){s=l}}}function Q0(s){const e=new WeakMap;function n(d,h){const m=d.array,g=d.usage,v=m.byteLength,x=s.createBuffer();s.bindBuffer(h,x),s.bufferData(h,m,g),d.onUploadCallback();let S;if(m instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)S=s.HALF_FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=s.SHORT;else if(m instanceof Uint32Array)S=s.UNSIGNED_INT;else if(m instanceof Int32Array)S=s.INT;else if(m instanceof Int8Array)S=s.BYTE;else if(m instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:v}}function r(d,h,m){const g=h.array,v=h.updateRanges;if(s.bindBuffer(m,d),v.length===0)s.bufferSubData(m,0,g);else{v.sort((S,w)=>S.start-w.start);let x=0;for(let S=1;S<v.length;S++){const w=v[x],A=v[S];A.start<=w.start+w.count+1?w.count=Math.max(w.count,A.start+A.count-w.start):(++x,v[x]=A)}v.length=x+1;for(let S=0,w=v.length;S<w;S++){const A=v[S];s.bufferSubData(m,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const h=e.get(d);h&&(s.deleteBuffer(h.buffer),e.delete(d))}function c(d,h){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,n(d,h));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,d,h),m.version=d.version}}return{get:a,remove:l,update:c}}var J0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ex=`#ifdef USE_ALPHAHASH
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
#endif`,tx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ix=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sx=`#ifdef USE_AOMAP
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
#endif`,ox=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ax=`#ifdef USE_BATCHING
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
#endif`,lx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ux=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dx=`#ifdef USE_IRIDESCENCE
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
#endif`,hx=`#ifdef USE_BUMPMAP
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
#endif`,px=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Mx=`#define PI 3.141592653589793
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
} // validated`,Ex=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tx=`vec3 transformedNormal = objectNormal;
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
#endif`,wx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Px=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Lx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Ix=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nx=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zx=`#ifdef USE_GRADIENTMAP
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
}`,Hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wx=`uniform bool receiveShadow;
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
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,jx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$x=`PhysicalMaterial material;
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
#endif`,Zx=`struct PhysicalMaterial {
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
}`,Qx=`
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
#endif`,Jx=`#if defined( RE_IndirectDiffuse )
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
#endif`,ey=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ty=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ny=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ry=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ay=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ly=`#if defined( USE_POINTS_UV )
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
#endif`,uy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,py=`#ifdef USE_MORPHTARGETS
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
#endif`,my=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_y=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sy=`#ifdef USE_NORMALMAP
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
#endif`,My=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ey=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ty=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ay=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ry=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,by=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Py=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ly=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Iy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ny=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Oy=`float getShadowMask() {
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
}`,ky=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,By=`#ifdef USE_SKINNING
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
#endif`,zy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hy=`#ifdef USE_SKINNING
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
#endif`,Vy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jy=`#ifdef USE_TRANSMISSION
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
#endif`,Yy=`#ifdef USE_TRANSMISSION
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
#endif`,qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ky=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jy=`uniform sampler2D t2D;
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
}`,eS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rS=`#include <common>
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
}`,sS=`#if DEPTH_PACKING == 3200
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
}`,oS=`#define DISTANCE
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
}`,aS=`#define DISTANCE
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
}`,lS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cS=`uniform float scale;
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
}`,fS=`uniform vec3 diffuse;
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
}`,dS=`#include <common>
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
}`,hS=`uniform vec3 diffuse;
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
}`,pS=`#define LAMBERT
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
}`,mS=`#define LAMBERT
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
}`,gS=`#define MATCAP
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
}`,_S=`#define MATCAP
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
}`,vS=`#define NORMAL
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
}`,xS=`#define NORMAL
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
}`,yS=`#define PHONG
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
}`,SS=`#define PHONG
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
}`,MS=`#define STANDARD
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
}`,ES=`#define STANDARD
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
}`,TS=`#define TOON
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
}`,wS=`#define TOON
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
}`,AS=`uniform float size;
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
}`,RS=`uniform vec3 diffuse;
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
}`,CS=`#include <common>
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
}`,bS=`uniform vec3 color;
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
}`,PS=`uniform float rotation;
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
}`,DS=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:J0,alphahash_pars_fragment:ex,alphamap_fragment:tx,alphamap_pars_fragment:nx,alphatest_fragment:ix,alphatest_pars_fragment:rx,aomap_fragment:sx,aomap_pars_fragment:ox,batching_pars_vertex:ax,batching_vertex:lx,begin_vertex:ux,beginnormal_vertex:cx,bsdfs:fx,iridescence_fragment:dx,bumpmap_pars_fragment:hx,clipping_planes_fragment:px,clipping_planes_pars_fragment:mx,clipping_planes_pars_vertex:gx,clipping_planes_vertex:_x,color_fragment:vx,color_pars_fragment:xx,color_pars_vertex:yx,color_vertex:Sx,common:Mx,cube_uv_reflection_fragment:Ex,defaultnormal_vertex:Tx,displacementmap_pars_vertex:wx,displacementmap_vertex:Ax,emissivemap_fragment:Rx,emissivemap_pars_fragment:Cx,colorspace_fragment:bx,colorspace_pars_fragment:Px,envmap_fragment:Dx,envmap_common_pars_fragment:Lx,envmap_pars_fragment:Ux,envmap_pars_vertex:Ix,envmap_physical_pars_fragment:Xx,envmap_vertex:Nx,fog_vertex:Fx,fog_pars_vertex:Ox,fog_fragment:kx,fog_pars_fragment:Bx,gradientmap_pars_fragment:zx,lightmap_pars_fragment:Hx,lights_lambert_fragment:Vx,lights_lambert_pars_fragment:Gx,lights_pars_begin:Wx,lights_toon_fragment:jx,lights_toon_pars_fragment:Yx,lights_phong_fragment:qx,lights_phong_pars_fragment:Kx,lights_physical_fragment:$x,lights_physical_pars_fragment:Zx,lights_fragment_begin:Qx,lights_fragment_maps:Jx,lights_fragment_end:ey,logdepthbuf_fragment:ty,logdepthbuf_pars_fragment:ny,logdepthbuf_pars_vertex:iy,logdepthbuf_vertex:ry,map_fragment:sy,map_pars_fragment:oy,map_particle_fragment:ay,map_particle_pars_fragment:ly,metalnessmap_fragment:uy,metalnessmap_pars_fragment:cy,morphinstance_vertex:fy,morphcolor_vertex:dy,morphnormal_vertex:hy,morphtarget_pars_vertex:py,morphtarget_vertex:my,normal_fragment_begin:gy,normal_fragment_maps:_y,normal_pars_fragment:vy,normal_pars_vertex:xy,normal_vertex:yy,normalmap_pars_fragment:Sy,clearcoat_normal_fragment_begin:My,clearcoat_normal_fragment_maps:Ey,clearcoat_pars_fragment:Ty,iridescence_pars_fragment:wy,opaque_fragment:Ay,packing:Ry,premultiplied_alpha_fragment:Cy,project_vertex:by,dithering_fragment:Py,dithering_pars_fragment:Dy,roughnessmap_fragment:Ly,roughnessmap_pars_fragment:Uy,shadowmap_pars_fragment:Iy,shadowmap_pars_vertex:Ny,shadowmap_vertex:Fy,shadowmask_pars_fragment:Oy,skinbase_vertex:ky,skinning_pars_vertex:By,skinning_vertex:zy,skinnormal_vertex:Hy,specularmap_fragment:Vy,specularmap_pars_fragment:Gy,tonemapping_fragment:Wy,tonemapping_pars_fragment:Xy,transmission_fragment:jy,transmission_pars_fragment:Yy,uv_pars_fragment:qy,uv_pars_vertex:Ky,uv_vertex:$y,worldpos_vertex:Zy,background_vert:Qy,background_frag:Jy,backgroundCube_vert:eS,backgroundCube_frag:tS,cube_vert:nS,cube_frag:iS,depth_vert:rS,depth_frag:sS,distanceRGBA_vert:oS,distanceRGBA_frag:aS,equirect_vert:lS,equirect_frag:uS,linedashed_vert:cS,linedashed_frag:fS,meshbasic_vert:dS,meshbasic_frag:hS,meshlambert_vert:pS,meshlambert_frag:mS,meshmatcap_vert:gS,meshmatcap_frag:_S,meshnormal_vert:vS,meshnormal_frag:xS,meshphong_vert:yS,meshphong_frag:SS,meshphysical_vert:MS,meshphysical_frag:ES,meshtoon_vert:TS,meshtoon_frag:wS,points_vert:AS,points_frag:RS,shadow_vert:CS,shadow_frag:bS,sprite_vert:PS,sprite_frag:DS},Ce={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},yi={basic:{uniforms:wn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:wn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Tt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:wn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:wn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:wn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Tt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:wn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:wn([Ce.points,Ce.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:wn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:wn([Ce.common,Ce.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:wn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:wn([Ce.sprite,Ce.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:wn([Ce.common,Ce.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:wn([Ce.lights,Ce.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};yi.physical={uniforms:wn([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const wl={r:0,b:0,g:0},Gr=new qi,LS=new tn;function US(s,e,n,r,a,l,c){const d=new Tt(0);let h=l===!0?0:1,m,g,v=null,x=0,S=null;function w(N){let b=N.isScene===!0?N.background:null;return b&&b.isTexture&&(b=(N.backgroundBlurriness>0?n:e).get(b)),b}function A(N){let b=!1;const z=w(N);z===null?_(d,h):z&&z.isColor&&(_(z,1),b=!0);const k=s.xr.getEnvironmentBlendMode();k==="additive"?r.buffers.color.setClear(0,0,0,1,c):k==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,c),(s.autoClear||b)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(N,b){const z=w(b);z&&(z.isCubeTexture||z.mapping===Hl)?(g===void 0&&(g=new hi(new Zo(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Ks(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(k,L,j){this.matrixWorld.copyPosition(j.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(g)),Gr.copy(b.backgroundRotation),Gr.x*=-1,Gr.y*=-1,Gr.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(Gr.y*=-1,Gr.z*=-1),g.material.uniforms.envMap.value=z,g.material.uniforms.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(LS.makeRotationFromEuler(Gr)),g.material.toneMapped=Et.getTransfer(z.colorSpace)!==Pt,(v!==z||x!==z.version||S!==s.toneMapping)&&(g.material.needsUpdate=!0,v=z,x=z.version,S=s.toneMapping),g.layers.enableAll(),N.unshift(g,g.geometry,g.material,0,0,null)):z&&z.isTexture&&(m===void 0&&(m=new hi(new Gl(2,2),new An({name:"BackgroundMaterial",uniforms:Ks(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=z,m.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,m.material.toneMapped=Et.getTransfer(z.colorSpace)!==Pt,z.matrixAutoUpdate===!0&&z.updateMatrix(),m.material.uniforms.uvTransform.value.copy(z.matrix),(v!==z||x!==z.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,v=z,x=z.version,S=s.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function _(N,b){N.getRGB(wl,fg(s)),r.buffers.color.setClear(wl.r,wl.g,wl.b,b,c)}function F(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(N,b=1){d.set(N),h=b,_(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,_(d,h)},render:A,addToRenderList:y,dispose:F}}function IS(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let l=a,c=!1;function d(C,V,Q,ie,de){let ue=!1;const le=v(ie,Q,V);l!==le&&(l=le,m(l.object)),ue=S(C,ie,Q,de),ue&&w(C,ie,Q,de),de!==null&&e.update(de,s.ELEMENT_ARRAY_BUFFER),(ue||c)&&(c=!1,b(C,V,Q,ie),de!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(de).buffer))}function h(){return s.createVertexArray()}function m(C){return s.bindVertexArray(C)}function g(C){return s.deleteVertexArray(C)}function v(C,V,Q){const ie=Q.wireframe===!0;let de=r[C.id];de===void 0&&(de={},r[C.id]=de);let ue=de[V.id];ue===void 0&&(ue={},de[V.id]=ue);let le=ue[ie];return le===void 0&&(le=x(h()),ue[ie]=le),le}function x(C){const V=[],Q=[],ie=[];for(let de=0;de<n;de++)V[de]=0,Q[de]=0,ie[de]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:Q,attributeDivisors:ie,object:C,attributes:{},index:null}}function S(C,V,Q,ie){const de=l.attributes,ue=V.attributes;let le=0;const fe=Q.getAttributes();for(const B in fe)if(fe[B].location>=0){const re=de[B];let U=ue[B];if(U===void 0&&(B==="instanceMatrix"&&C.instanceMatrix&&(U=C.instanceMatrix),B==="instanceColor"&&C.instanceColor&&(U=C.instanceColor)),re===void 0||re.attribute!==U||U&&re.data!==U.data)return!0;le++}return l.attributesNum!==le||l.index!==ie}function w(C,V,Q,ie){const de={},ue=V.attributes;let le=0;const fe=Q.getAttributes();for(const B in fe)if(fe[B].location>=0){let re=ue[B];re===void 0&&(B==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),B==="instanceColor"&&C.instanceColor&&(re=C.instanceColor));const U={};U.attribute=re,re&&re.data&&(U.data=re.data),de[B]=U,le++}l.attributes=de,l.attributesNum=le,l.index=ie}function A(){const C=l.newAttributes;for(let V=0,Q=C.length;V<Q;V++)C[V]=0}function y(C){_(C,0)}function _(C,V){const Q=l.newAttributes,ie=l.enabledAttributes,de=l.attributeDivisors;Q[C]=1,ie[C]===0&&(s.enableVertexAttribArray(C),ie[C]=1),de[C]!==V&&(s.vertexAttribDivisor(C,V),de[C]=V)}function F(){const C=l.newAttributes,V=l.enabledAttributes;for(let Q=0,ie=V.length;Q<ie;Q++)V[Q]!==C[Q]&&(s.disableVertexAttribArray(Q),V[Q]=0)}function N(C,V,Q,ie,de,ue,le){le===!0?s.vertexAttribIPointer(C,V,Q,de,ue):s.vertexAttribPointer(C,V,Q,ie,de,ue)}function b(C,V,Q,ie){A();const de=ie.attributes,ue=Q.getAttributes(),le=V.defaultAttributeValues;for(const fe in ue){const B=ue[fe];if(B.location>=0){let oe=de[fe];if(oe===void 0&&(fe==="instanceMatrix"&&C.instanceMatrix&&(oe=C.instanceMatrix),fe==="instanceColor"&&C.instanceColor&&(oe=C.instanceColor)),oe!==void 0){const re=oe.normalized,U=oe.itemSize,ne=e.get(oe);if(ne===void 0)continue;const Fe=ne.buffer,Xe=ne.type,He=ne.bytesPerElement,J=Xe===s.INT||Xe===s.UNSIGNED_INT||oe.gpuType===Zf;if(oe.isInterleavedBufferAttribute){const ae=oe.data,Se=ae.stride,Pe=oe.offset;if(ae.isInstancedInterleavedBuffer){for(let Ne=0;Ne<B.locationSize;Ne++)_(B.location+Ne,ae.meshPerAttribute);C.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ne=0;Ne<B.locationSize;Ne++)y(B.location+Ne);s.bindBuffer(s.ARRAY_BUFFER,Fe);for(let Ne=0;Ne<B.locationSize;Ne++)N(B.location+Ne,U/B.locationSize,Xe,re,Se*He,(Pe+U/B.locationSize*Ne)*He,J)}else{if(oe.isInstancedBufferAttribute){for(let ae=0;ae<B.locationSize;ae++)_(B.location+ae,oe.meshPerAttribute);C.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ae=0;ae<B.locationSize;ae++)y(B.location+ae);s.bindBuffer(s.ARRAY_BUFFER,Fe);for(let ae=0;ae<B.locationSize;ae++)N(B.location+ae,U/B.locationSize,Xe,re,U*He,U/B.locationSize*ae*He,J)}}else if(le!==void 0){const re=le[fe];if(re!==void 0)switch(re.length){case 2:s.vertexAttrib2fv(B.location,re);break;case 3:s.vertexAttrib3fv(B.location,re);break;case 4:s.vertexAttrib4fv(B.location,re);break;default:s.vertexAttrib1fv(B.location,re)}}}}F()}function z(){j();for(const C in r){const V=r[C];for(const Q in V){const ie=V[Q];for(const de in ie)g(ie[de].object),delete ie[de];delete V[Q]}delete r[C]}}function k(C){if(r[C.id]===void 0)return;const V=r[C.id];for(const Q in V){const ie=V[Q];for(const de in ie)g(ie[de].object),delete ie[de];delete V[Q]}delete r[C.id]}function L(C){for(const V in r){const Q=r[V];if(Q[C.id]===void 0)continue;const ie=Q[C.id];for(const de in ie)g(ie[de].object),delete ie[de];delete Q[C.id]}}function j(){R(),c=!0,l!==a&&(l=a,m(l.object))}function R(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:j,resetDefaultState:R,dispose:z,releaseStatesOfGeometry:k,releaseStatesOfProgram:L,initAttributes:A,enableAttribute:y,disableUnusedAttributes:F}}function NS(s,e,n){let r;function a(m){r=m}function l(m,g){s.drawArrays(r,m,g),n.update(g,r,1)}function c(m,g,v){v!==0&&(s.drawArraysInstanced(r,m,g,v),n.update(g,r,v))}function d(m,g,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,g,0,v);let S=0;for(let w=0;w<v;w++)S+=g[w];n.update(S,r,1)}function h(m,g,v,x){if(v===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let w=0;w<m.length;w++)c(m[w],g[w],x[w]);else{S.multiDrawArraysInstancedWEBGL(r,m,0,g,0,x,0,v);let w=0;for(let A=0;A<v;A++)w+=g[A]*x[A];n.update(w,r,1)}}this.setMode=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function FS(s,e,n,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function c(L){return!(L!==di&&r.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(L){const j=L===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Yi&&r.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Vi&&!j)}function h(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const g=h(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const v=n.logarithmicDepthBuffer===!0,x=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),F=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),N=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),z=w>0,k=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:c,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:v,reversedDepthBuffer:x,maxTextures:S,maxVertexTextures:w,maxTextureSize:A,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:F,maxVaryings:N,maxFragmentUniforms:b,vertexTextures:z,maxSamples:k}}function OS(s){const e=this;let n=null,r=0,a=!1,l=!1;const c=new Mr,d=new dt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const S=v.length!==0||x||r!==0||a;return a=x,r=v.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(v,x){n=g(v,x,0)},this.setState=function(v,x,S){const w=v.clippingPlanes,A=v.clipIntersection,y=v.clipShadows,_=s.get(v);if(!a||w===null||w.length===0||l&&!y)l?g(null):m();else{const F=l?0:r,N=F*4;let b=_.clippingState||null;h.value=b,b=g(w,x,N,S);for(let z=0;z!==N;++z)b[z]=n[z];_.clippingState=b,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=F}};function m(){h.value!==n&&(h.value=n,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(v,x,S,w){const A=v!==null?v.length:0;let y=null;if(A!==0){if(y=h.value,w!==!0||y===null){const _=S+A*4,F=x.matrixWorldInverse;d.getNormalMatrix(F),(y===null||y.length<_)&&(y=new Float32Array(_));for(let N=0,b=S;N!==A;++N,b+=4)c.copy(v[N]).applyMatrix4(F,d),c.normal.toArray(y,b),y[b+3]=c.constant}h.value=y,h.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,y}}function kS(s){let e=new WeakMap;function n(c,d){return d===pf?c.mapping=Ys:d===mf&&(c.mapping=qs),c}function r(c){if(c&&c.isTexture){const d=c.mapping;if(d===pf||d===mf)if(e.has(c)){const h=e.get(c).texture;return n(h,c.mapping)}else{const h=c.image;if(h&&h.height>0){const m=new z0(h.height);return m.fromEquirectangularTexture(s,c),e.set(c,m),c.addEventListener("dispose",a),n(m.texture,c.mapping)}else return null}}return c}function a(c){const d=c.target;d.removeEventListener("dispose",a);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const Vs=4,pm=[.125,.215,.35,.446,.526,.582],Yr=20,$c=new _g,mm=new Tt;let Zc=null,Qc=0,Jc=0,ef=!1;const Xr=(1+Math.sqrt(5))/2,Bs=1/Xr,gm=[new K(-Xr,Bs,0),new K(Xr,Bs,0),new K(-Bs,0,Xr),new K(Bs,0,Xr),new K(0,Xr,-Bs),new K(0,Xr,Bs),new K(-1,1,-1),new K(1,1,-1),new K(-1,1,1),new K(1,1,1)],BS=new K;class _m{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100,l={}){const{size:c=256,position:d=BS}=l;Zc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),Jc=this._renderer.getActiveMipmapLevel(),ef=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,r,a,h,d),n>0&&this._blur(h,0,0,n),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ym(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zc,Qc,Jc),this._renderer.xr.enabled=ef,e.scissorTest=!1,Al(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ys||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),Jc=this._renderer.getActiveMipmapLevel(),ef=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:Si,minFilter:Si,generateMipmaps:!1,type:Ei,format:di,colorSpace:Qr,depthBuffer:!1},a=vm(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vm(e,n,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zS(l)),this._blurMaterial=HS(l,e,n)}return a}_compileMaterial(e){const n=new hi(this._lodPlanes[0],e);this._renderer.compile(n,$c)}_sceneToCubeUV(e,n,r,a,l){const h=new Jn(90,1,n,r),m=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],v=this._renderer,x=v.autoClear,S=v.toneMapping;v.getClearColor(mm),v.toneMapping=Wi,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(a),v.clearDepth(),v.setRenderTarget(null));const A=new od({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),y=new hi(new Zo,A);let _=!1;const F=e.background;F?F.isColor&&(A.color.copy(F),e.background=null,_=!0):(A.color.copy(mm),_=!0);for(let N=0;N<6;N++){const b=N%3;b===0?(h.up.set(0,m[N],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x+g[N],l.y,l.z)):b===1?(h.up.set(0,0,m[N]),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y+g[N],l.z)):(h.up.set(0,m[N],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y,l.z+g[N]));const z=this._cubeSize;Al(a,b*z,N>2?z:0,z,z),v.setRenderTarget(a),_&&v.render(y,h),v.render(e,h)}y.geometry.dispose(),y.material.dispose(),v.toneMapping=S,v.autoClear=x,e.background=F}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Ys||e.mapping===qs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=ym()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xm());const l=a?this._cubemapMaterial:this._equirectMaterial,c=new hi(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const h=this._cubeSize;Al(n,0,0,3*h,2*h),r.setRenderTarget(n),r.render(c,$c)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const c=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),d=gm[(a-l-1)%gm.length];this._blur(e,l-1,l,c,d)}n.autoClear=r}_blur(e,n,r,a,l){const c=this._pingPongRenderTarget;this._halfBlur(e,c,n,r,a,"latitudinal",l),this._halfBlur(c,e,r,r,a,"longitudinal",l)}_halfBlur(e,n,r,a,l,c,d){const h=this._renderer,m=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,v=new hi(this._lodPlanes[a],m),x=m.uniforms,S=this._sizeLods[r]-1,w=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Yr-1),A=l/w,y=isFinite(l)?1+Math.floor(g*A):Yr;y>Yr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Yr}`);const _=[];let F=0;for(let L=0;L<Yr;++L){const j=L/A,R=Math.exp(-j*j/2);_.push(R),L===0?F+=R:L<y&&(F+=2*R)}for(let L=0;L<_.length;L++)_[L]=_[L]/F;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=_,x.latitudinal.value=c==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:N}=this;x.dTheta.value=w,x.mipInt.value=N-r;const b=this._sizeLods[a],z=3*b*(a>N-Vs?a-N+Vs:0),k=4*(this._cubeSize-b);Al(n,z,k,3*b,2*b),h.setRenderTarget(n),h.render(v,$c)}}function zS(s){const e=[],n=[],r=[];let a=s;const l=s-Vs+1+pm.length;for(let c=0;c<l;c++){const d=Math.pow(2,a);n.push(d);let h=1/d;c>s-Vs?h=pm[c-s+Vs-1]:c===0&&(h=0),r.push(h);const m=1/(d-2),g=-m,v=1+m,x=[g,g,v,g,v,v,g,g,v,v,g,v],S=6,w=6,A=3,y=2,_=1,F=new Float32Array(A*w*S),N=new Float32Array(y*w*S),b=new Float32Array(_*w*S);for(let k=0;k<S;k++){const L=k%3*2/3-1,j=k>2?0:-1,R=[L,j,0,L+2/3,j,0,L+2/3,j+1,0,L,j,0,L+2/3,j+1,0,L,j+1,0];F.set(R,A*w*k),N.set(x,y*w*k);const C=[k,k,k,k,k,k];b.set(C,_*w*k)}const z=new Ki;z.setAttribute("position",new mi(F,A)),z.setAttribute("uv",new mi(N,y)),z.setAttribute("faceIndex",new mi(b,_)),e.push(z),a>Vs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function vm(s,e,n){const r=new ei(s,e,n);return r.texture.mapping=Hl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Al(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function HS(s,e,n){const r=new Float32Array(Yr),a=new K(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Yr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ad(),fragmentShader:`

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
		`,blending:Gi,depthTest:!1,depthWrite:!1})}function xm(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ad(),fragmentShader:`

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
		`,blending:Gi,depthTest:!1,depthWrite:!1})}function ym(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ad(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gi,depthTest:!1,depthWrite:!1})}function ad(){return`

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
	`}function VS(s){let e=new WeakMap,n=null;function r(d){if(d&&d.isTexture){const h=d.mapping,m=h===pf||h===mf,g=h===Ys||h===qs;if(m||g){let v=e.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new _m(s)),v=m?n.fromEquirectangular(d,v):n.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),v.texture;if(v!==void 0)return v.texture;{const S=d.image;return m&&S&&S.height>0||g&&S&&a(S)?(n===null&&(n=new _m(s)),v=m?n.fromEquirectangular(d):n.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),d.addEventListener("dispose",l),v.texture):null}}}return d}function a(d){let h=0;const m=6;for(let g=0;g<m;g++)d[g]!==void 0&&h++;return h===m}function l(d){const h=d.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function c(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:c}}function GS(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&Yo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function WS(s,e,n,r){const a={},l=new WeakMap;function c(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const w in x.attributes)e.remove(x.attributes[w]);x.removeEventListener("dispose",c),delete a[x.id];const S=l.get(x);S&&(e.remove(S),l.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(v,x){return a[x.id]===!0||(x.addEventListener("dispose",c),a[x.id]=!0,n.memory.geometries++),x}function h(v){const x=v.attributes;for(const S in x)e.update(x[S],s.ARRAY_BUFFER)}function m(v){const x=[],S=v.index,w=v.attributes.position;let A=0;if(S!==null){const F=S.array;A=S.version;for(let N=0,b=F.length;N<b;N+=3){const z=F[N+0],k=F[N+1],L=F[N+2];x.push(z,k,k,L,L,z)}}else if(w!==void 0){const F=w.array;A=w.version;for(let N=0,b=F.length/3-1;N<b;N+=3){const z=N+0,k=N+1,L=N+2;x.push(z,k,k,L,L,z)}}else return;const y=new(rg(x)?cg:ug)(x,1);y.version=A;const _=l.get(v);_&&e.remove(_),l.set(v,y)}function g(v){const x=l.get(v);if(x){const S=v.index;S!==null&&x.version<S.version&&m(v)}else m(v);return l.get(v)}return{get:d,update:h,getWireframeAttribute:g}}function XS(s,e,n){let r;function a(x){r=x}let l,c;function d(x){l=x.type,c=x.bytesPerElement}function h(x,S){s.drawElements(r,S,l,x*c),n.update(S,r,1)}function m(x,S,w){w!==0&&(s.drawElementsInstanced(r,S,l,x*c,w),n.update(S,r,w))}function g(x,S,w){if(w===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,x,0,w);let y=0;for(let _=0;_<w;_++)y+=S[_];n.update(y,r,1)}function v(x,S,w,A){if(w===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<x.length;_++)m(x[_]/c,S[_],A[_]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,l,x,0,A,0,w);let _=0;for(let F=0;F<w;F++)_+=S[F]*A[F];n.update(_,r,1)}}this.setMode=a,this.setIndex=d,this.render=h,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=v}function jS(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,c,d){switch(n.calls++,c){case s.TRIANGLES:n.triangles+=d*(l/3);break;case s.LINES:n.lines+=d*(l/2);break;case s.LINE_STRIP:n.lines+=d*(l-1);break;case s.LINE_LOOP:n.lines+=d*l;break;case s.POINTS:n.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function YS(s,e,n){const r=new WeakMap,a=new Yt;function l(c,d,h){const m=c.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=g!==void 0?g.length:0;let x=r.get(d);if(x===void 0||x.count!==v){let C=function(){j.dispose(),r.delete(d),d.removeEventListener("dispose",C)};var S=C;x!==void 0&&x.texture.dispose();const w=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],F=d.morphAttributes.normal||[],N=d.morphAttributes.color||[];let b=0;w===!0&&(b=1),A===!0&&(b=2),y===!0&&(b=3);let z=d.attributes.position.count*b,k=1;z>e.maxTextureSize&&(k=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const L=new Float32Array(z*k*4*v),j=new sg(L,z,k,v);j.type=Vi,j.needsUpdate=!0;const R=b*4;for(let V=0;V<v;V++){const Q=_[V],ie=F[V],de=N[V],ue=z*k*4*V;for(let le=0;le<Q.count;le++){const fe=le*R;w===!0&&(a.fromBufferAttribute(Q,le),L[ue+fe+0]=a.x,L[ue+fe+1]=a.y,L[ue+fe+2]=a.z,L[ue+fe+3]=0),A===!0&&(a.fromBufferAttribute(ie,le),L[ue+fe+4]=a.x,L[ue+fe+5]=a.y,L[ue+fe+6]=a.z,L[ue+fe+7]=0),y===!0&&(a.fromBufferAttribute(de,le),L[ue+fe+8]=a.x,L[ue+fe+9]=a.y,L[ue+fe+10]=a.z,L[ue+fe+11]=de.itemSize===4?a.w:1)}}x={count:v,texture:j,size:new st(z,k)},r.set(d,x),d.addEventListener("dispose",C)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",c.morphTexture,n);else{let w=0;for(let y=0;y<m.length;y++)w+=m[y];const A=d.morphTargetsRelative?1:1-w;h.getUniforms().setValue(s,"morphTargetBaseInfluence",A),h.getUniforms().setValue(s,"morphTargetInfluences",m)}h.getUniforms().setValue(s,"morphTargetsTexture",x.texture,n),h.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:l}}function qS(s,e,n,r){let a=new WeakMap;function l(h){const m=r.render.frame,g=h.geometry,v=e.get(h,g);if(a.get(v)!==m&&(e.update(v),a.set(v,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",d)===!1&&h.addEventListener("dispose",d),a.get(h)!==m&&(n.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const x=h.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return v}function c(){a=new WeakMap}function d(h){const m=h.target;m.removeEventListener("dispose",d),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:l,dispose:c}}const xg=new Nn,Sm=new mg(1,1),yg=new sg,Sg=new T0,Mg=new hg,Mm=[],Em=[],Tm=new Float32Array(16),wm=new Float32Array(9),Am=new Float32Array(4);function Qs(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let l=Mm[a];if(l===void 0&&(l=new Float32Array(a),Mm[a]=l),e!==0){r.toArray(l,0);for(let c=1,d=0;c!==e;++c)d+=n,s[c].toArray(l,d)}return l}function nn(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function rn(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function Wl(s,e){let n=Em[e];n===void 0&&(n=new Int32Array(e),Em[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function KS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function $S(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(nn(n,e))return;s.uniform2fv(this.addr,e),rn(n,e)}}function ZS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(nn(n,e))return;s.uniform3fv(this.addr,e),rn(n,e)}}function QS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(nn(n,e))return;s.uniform4fv(this.addr,e),rn(n,e)}}function JS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(nn(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),rn(n,e)}else{if(nn(n,r))return;Am.set(r),s.uniformMatrix2fv(this.addr,!1,Am),rn(n,r)}}function eM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(nn(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),rn(n,e)}else{if(nn(n,r))return;wm.set(r),s.uniformMatrix3fv(this.addr,!1,wm),rn(n,r)}}function tM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(nn(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),rn(n,e)}else{if(nn(n,r))return;Tm.set(r),s.uniformMatrix4fv(this.addr,!1,Tm),rn(n,r)}}function nM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function iM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(nn(n,e))return;s.uniform2iv(this.addr,e),rn(n,e)}}function rM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(nn(n,e))return;s.uniform3iv(this.addr,e),rn(n,e)}}function sM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(nn(n,e))return;s.uniform4iv(this.addr,e),rn(n,e)}}function oM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function aM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(nn(n,e))return;s.uniform2uiv(this.addr,e),rn(n,e)}}function lM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(nn(n,e))return;s.uniform3uiv(this.addr,e),rn(n,e)}}function uM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(nn(n,e))return;s.uniform4uiv(this.addr,e),rn(n,e)}}function cM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(Sm.compareFunction=ng,l=Sm):l=xg,n.setTexture2D(e||l,a)}function fM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||Sg,a)}function dM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||Mg,a)}function hM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||yg,a)}function pM(s){switch(s){case 5126:return KS;case 35664:return $S;case 35665:return ZS;case 35666:return QS;case 35674:return JS;case 35675:return eM;case 35676:return tM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return rM;case 35669:case 35673:return sM;case 5125:return oM;case 36294:return aM;case 36295:return lM;case 36296:return uM;case 35678:case 36198:case 36298:case 36306:case 35682:return cM;case 35679:case 36299:case 36307:return fM;case 35680:case 36300:case 36308:case 36293:return dM;case 36289:case 36303:case 36311:case 36292:return hM}}function mM(s,e){s.uniform1fv(this.addr,e)}function gM(s,e){const n=Qs(e,this.size,2);s.uniform2fv(this.addr,n)}function _M(s,e){const n=Qs(e,this.size,3);s.uniform3fv(this.addr,n)}function vM(s,e){const n=Qs(e,this.size,4);s.uniform4fv(this.addr,n)}function xM(s,e){const n=Qs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function yM(s,e){const n=Qs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function SM(s,e){const n=Qs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function MM(s,e){s.uniform1iv(this.addr,e)}function EM(s,e){s.uniform2iv(this.addr,e)}function TM(s,e){s.uniform3iv(this.addr,e)}function wM(s,e){s.uniform4iv(this.addr,e)}function AM(s,e){s.uniform1uiv(this.addr,e)}function RM(s,e){s.uniform2uiv(this.addr,e)}function CM(s,e){s.uniform3uiv(this.addr,e)}function bM(s,e){s.uniform4uiv(this.addr,e)}function PM(s,e,n){const r=this.cache,a=e.length,l=Wl(n,a);nn(r,l)||(s.uniform1iv(this.addr,l),rn(r,l));for(let c=0;c!==a;++c)n.setTexture2D(e[c]||xg,l[c])}function DM(s,e,n){const r=this.cache,a=e.length,l=Wl(n,a);nn(r,l)||(s.uniform1iv(this.addr,l),rn(r,l));for(let c=0;c!==a;++c)n.setTexture3D(e[c]||Sg,l[c])}function LM(s,e,n){const r=this.cache,a=e.length,l=Wl(n,a);nn(r,l)||(s.uniform1iv(this.addr,l),rn(r,l));for(let c=0;c!==a;++c)n.setTextureCube(e[c]||Mg,l[c])}function UM(s,e,n){const r=this.cache,a=e.length,l=Wl(n,a);nn(r,l)||(s.uniform1iv(this.addr,l),rn(r,l));for(let c=0;c!==a;++c)n.setTexture2DArray(e[c]||yg,l[c])}function IM(s){switch(s){case 5126:return mM;case 35664:return gM;case 35665:return _M;case 35666:return vM;case 35674:return xM;case 35675:return yM;case 35676:return SM;case 5124:case 35670:return MM;case 35667:case 35671:return EM;case 35668:case 35672:return TM;case 35669:case 35673:return wM;case 5125:return AM;case 36294:return RM;case 36295:return CM;case 36296:return bM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return DM;case 35680:case 36300:case 36308:case 36293:return LM;case 36289:case 36303:case 36311:case 36292:return UM}}class NM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=pM(n.type)}}class FM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=IM(n.type)}}class OM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let l=0,c=a.length;l!==c;++l){const d=a[l];d.setValue(e,n[d.id],r)}}}const tf=/(\w+)(\])?(\[|\.)?/g;function Rm(s,e){s.seq.push(e),s.map[e.id]=e}function kM(s,e,n){const r=s.name,a=r.length;for(tf.lastIndex=0;;){const l=tf.exec(r),c=tf.lastIndex;let d=l[1];const h=l[2]==="]",m=l[3];if(h&&(d=d|0),m===void 0||m==="["&&c+2===a){Rm(n,m===void 0?new NM(d,s,e):new FM(d,s,e));break}else{let v=n.map[d];v===void 0&&(v=new OM(d),Rm(n,v)),n=v}}}class Nl{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(n,a),c=e.getUniformLocation(n,l.name);kM(l,c,this)}}setValue(e,n,r,a){const l=this.map[n];l!==void 0&&l.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let l=0,c=n.length;l!==c;++l){const d=n[l],h=r[d.id];h.needsUpdate!==!1&&d.setValue(e,h.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,l=e.length;a!==l;++a){const c=e[a];c.id in n&&r.push(c)}return r}}function Cm(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const BM=37297;let zM=0;function HM(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,n.length);for(let c=a;c<l;c++){const d=c+1;r.push(`${d===e?">":" "} ${d}: ${n[c]}`)}return r.join(`
`)}const bm=new dt;function VM(s){Et._getMatrix(bm,Et.workingColorSpace,s);const e=`mat3( ${bm.elements.map(n=>n.toFixed(4))} )`;switch(Et.getTransfer(s)){case Ol:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Pm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),l=(s.getShaderInfoLog(e)||"").trim();if(r&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const d=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+HM(s.getShaderSource(e),d)}else return l}function GM(s,e){const n=VM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function WM(s,e){let n;switch(e){case Fv:n="Linear";break;case Ov:n="Reinhard";break;case kv:n="Cineon";break;case Bv:n="ACESFilmic";break;case Hv:n="AgX";break;case Vv:n="Neutral";break;case zv:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Rl=new K;function XM(){Et.getLuminanceCoefficients(Rl);const s=Rl.x.toFixed(4),e=Rl.y.toFixed(4),n=Rl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function YM(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function qM(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),c=l.name;let d=1;l.type===s.FLOAT_MAT2&&(d=2),l.type===s.FLOAT_MAT3&&(d=3),l.type===s.FLOAT_MAT4&&(d=4),n[c]={type:l.type,location:s.getAttribLocation(e,c),locationSize:d}}return n}function Bo(s){return s!==""}function Dm(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const KM=/^[ \t]*#include +<([\w\d./]+)>/gm;function jf(s){return s.replace(KM,ZM)}const $M=new Map;function ZM(s,e){let n=ht[e];if(n===void 0){const r=$M.get(e);if(r!==void 0)n=ht[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return jf(n)}const QM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Um(s){return s.replace(QM,JM)}function JM(s,e,n,r){let a="";for(let l=parseInt(e);l<parseInt(n);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function Im(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function eE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===mv?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Bi&&(e="SHADOWMAP_TYPE_VSM"),e}function tE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ys:case qs:e="ENVMAP_TYPE_CUBE";break;case Hl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function iE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case jm:e="ENVMAP_BLENDING_MULTIPLY";break;case Iv:e="ENVMAP_BLENDING_MIX";break;case Nv:e="ENVMAP_BLENDING_ADD";break}return e}function rE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function sE(s,e,n,r){const a=s.getContext(),l=n.defines;let c=n.vertexShader,d=n.fragmentShader;const h=eE(n),m=tE(n),g=nE(n),v=iE(n),x=rE(n),S=jM(n),w=YM(l),A=a.createProgram();let y,_,F=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w].filter(Bo).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w].filter(Bo).join(`
`),_.length>0&&(_+=`
`)):(y=[Im(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),_=[Im(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+g:"",n.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Wi?"#define TONE_MAPPING":"",n.toneMapping!==Wi?ht.tonemapping_pars_fragment:"",n.toneMapping!==Wi?WM("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,GM("linearToOutputTexel",n.outputColorSpace),XM(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Bo).join(`
`)),c=jf(c),c=Dm(c,n),c=Lm(c,n),d=jf(d),d=Dm(d,n),d=Lm(d,n),c=Um(c),d=Um(d),n.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",n.glslVersion===Yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const N=F+y+c,b=F+_+d,z=Cm(a,a.VERTEX_SHADER,N),k=Cm(a,a.FRAGMENT_SHADER,b);a.attachShader(A,z),a.attachShader(A,k),n.index0AttributeName!==void 0?a.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(A,0,"position"),a.linkProgram(A);function L(V){if(s.debug.checkShaderErrors){const Q=a.getProgramInfoLog(A)||"",ie=a.getShaderInfoLog(z)||"",de=a.getShaderInfoLog(k)||"",ue=Q.trim(),le=ie.trim(),fe=de.trim();let B=!0,oe=!0;if(a.getProgramParameter(A,a.LINK_STATUS)===!1)if(B=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,A,z,k);else{const re=Pm(a,z,"vertex"),U=Pm(a,k,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(A,a.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+ue+`
`+re+`
`+U)}else ue!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ue):(le===""||fe==="")&&(oe=!1);oe&&(V.diagnostics={runnable:B,programLog:ue,vertexShader:{log:le,prefix:y},fragmentShader:{log:fe,prefix:_}})}a.deleteShader(z),a.deleteShader(k),j=new Nl(a,A),R=qM(a,A)}let j;this.getUniforms=function(){return j===void 0&&L(this),j};let R;this.getAttributes=function(){return R===void 0&&L(this),R};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(A,BM)),C},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zM++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=z,this.fragmentShader=k,this}let oE=0;class aE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),l=this._getShaderStage(r),c=this._getShaderCacheForMaterial(e);return c.has(a)===!1&&(c.add(a),a.usedTimes++),c.has(l)===!1&&(c.add(l),l.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new lE(e),n.set(e,r)),r}}class lE{constructor(e){this.id=oE++,this.code=e,this.usedTimes=0}}function uE(s,e,n,r,a,l,c){const d=new ag,h=new aE,m=new Set,g=[],v=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(R){return m.add(R),R===0?"uv":`uv${R}`}function y(R,C,V,Q,ie){const de=Q.fog,ue=ie.geometry,le=R.isMeshStandardMaterial?Q.environment:null,fe=(R.isMeshStandardMaterial?n:e).get(R.envMap||le),B=fe&&fe.mapping===Hl?fe.image.height:null,oe=w[R.type];R.precision!==null&&(S=a.getMaxPrecision(R.precision),S!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",S,"instead."));const re=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,U=re!==void 0?re.length:0;let ne=0;ue.morphAttributes.position!==void 0&&(ne=1),ue.morphAttributes.normal!==void 0&&(ne=2),ue.morphAttributes.color!==void 0&&(ne=3);let Fe,Xe,He,J;if(oe){const xt=yi[oe];Fe=xt.vertexShader,Xe=xt.fragmentShader}else Fe=R.vertexShader,Xe=R.fragmentShader,h.update(R),He=h.getVertexShaderID(R),J=h.getFragmentShaderID(R);const ae=s.getRenderTarget(),Se=s.state.buffers.depth.getReversed(),Pe=ie.isInstancedMesh===!0,Ne=ie.isBatchedMesh===!0,pt=!!R.map,$t=!!R.matcap,I=!!fe,Ct=!!R.aoMap,ct=!!R.lightMap,nt=!!R.bumpMap,Ve=!!R.normalMap,Lt=!!R.displacementMap,Ge=!!R.emissiveMap,lt=!!R.metalnessMap,Ot=!!R.roughnessMap,kt=R.anisotropy>0,P=R.clearcoat>0,E=R.dispersion>0,q=R.iridescence>0,ce=R.sheen>0,me=R.transmission>0,se=kt&&!!R.anisotropyMap,Ke=P&&!!R.clearcoatMap,Te=P&&!!R.clearcoatNormalMap,ke=P&&!!R.clearcoatRoughnessMap,$e=q&&!!R.iridescenceMap,Me=q&&!!R.iridescenceThicknessMap,be=ce&&!!R.sheenColorMap,it=ce&&!!R.sheenRoughnessMap,Ye=!!R.specularMap,Ae=!!R.specularColorMap,ft=!!R.specularIntensityMap,H=me&&!!R.transmissionMap,xe=me&&!!R.thicknessMap,we=!!R.gradientMap,De=!!R.alphaMap,ve=R.alphaTest>0,he=!!R.alphaHash,We=!!R.extensions;let ut=Wi;R.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ut=s.toneMapping);const At={shaderID:oe,shaderType:R.type,shaderName:R.name,vertexShader:Fe,fragmentShader:Xe,defines:R.defines,customVertexShaderID:He,customFragmentShaderID:J,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:S,batching:Ne,batchingColor:Ne&&ie._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&ie.instanceColor!==null,instancingMorph:Pe&&ie.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ae===null?s.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Qr,alphaToCoverage:!!R.alphaToCoverage,map:pt,matcap:$t,envMap:I,envMapMode:I&&fe.mapping,envMapCubeUVHeight:B,aoMap:Ct,lightMap:ct,bumpMap:nt,normalMap:Ve,displacementMap:x&&Lt,emissiveMap:Ge,normalMapObjectSpace:Ve&&R.normalMapType===Yv,normalMapTangentSpace:Ve&&R.normalMapType===jv,metalnessMap:lt,roughnessMap:Ot,anisotropy:kt,anisotropyMap:se,clearcoat:P,clearcoatMap:Ke,clearcoatNormalMap:Te,clearcoatRoughnessMap:ke,dispersion:E,iridescence:q,iridescenceMap:$e,iridescenceThicknessMap:Me,sheen:ce,sheenColorMap:be,sheenRoughnessMap:it,specularMap:Ye,specularColorMap:Ae,specularIntensityMap:ft,transmission:me,transmissionMap:H,thicknessMap:xe,gradientMap:we,opaque:R.transparent===!1&&R.blending===Ws&&R.alphaToCoverage===!1,alphaMap:De,alphaTest:ve,alphaHash:he,combine:R.combine,mapUv:pt&&A(R.map.channel),aoMapUv:Ct&&A(R.aoMap.channel),lightMapUv:ct&&A(R.lightMap.channel),bumpMapUv:nt&&A(R.bumpMap.channel),normalMapUv:Ve&&A(R.normalMap.channel),displacementMapUv:Lt&&A(R.displacementMap.channel),emissiveMapUv:Ge&&A(R.emissiveMap.channel),metalnessMapUv:lt&&A(R.metalnessMap.channel),roughnessMapUv:Ot&&A(R.roughnessMap.channel),anisotropyMapUv:se&&A(R.anisotropyMap.channel),clearcoatMapUv:Ke&&A(R.clearcoatMap.channel),clearcoatNormalMapUv:Te&&A(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&A(R.clearcoatRoughnessMap.channel),iridescenceMapUv:$e&&A(R.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&A(R.iridescenceThicknessMap.channel),sheenColorMapUv:be&&A(R.sheenColorMap.channel),sheenRoughnessMapUv:it&&A(R.sheenRoughnessMap.channel),specularMapUv:Ye&&A(R.specularMap.channel),specularColorMapUv:Ae&&A(R.specularColorMap.channel),specularIntensityMapUv:ft&&A(R.specularIntensityMap.channel),transmissionMapUv:H&&A(R.transmissionMap.channel),thicknessMapUv:xe&&A(R.thicknessMap.channel),alphaMapUv:De&&A(R.alphaMap.channel),vertexTangents:!!ue.attributes.tangent&&(Ve||kt),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,pointsUvs:ie.isPoints===!0&&!!ue.attributes.uv&&(pt||De),fog:!!de,useFog:R.fog===!0,fogExp2:!!de&&de.isFogExp2,flatShading:R.flatShading===!0&&R.wireframe===!1,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Se,skinning:ie.isSkinnedMesh===!0,morphTargets:ue.morphAttributes.position!==void 0,morphNormals:ue.morphAttributes.normal!==void 0,morphColors:ue.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:ne,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:R.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:ut,decodeVideoTexture:pt&&R.map.isVideoTexture===!0&&Et.getTransfer(R.map.colorSpace)===Pt,decodeVideoTextureEmissive:Ge&&R.emissiveMap.isVideoTexture===!0&&Et.getTransfer(R.emissiveMap.colorSpace)===Pt,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===zi,flipSided:R.side===In,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:We&&R.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&R.extensions.multiDraw===!0||Ne)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return At.vertexUv1s=m.has(1),At.vertexUv2s=m.has(2),At.vertexUv3s=m.has(3),m.clear(),At}function _(R){const C=[];if(R.shaderID?C.push(R.shaderID):(C.push(R.customVertexShaderID),C.push(R.customFragmentShaderID)),R.defines!==void 0)for(const V in R.defines)C.push(V),C.push(R.defines[V]);return R.isRawShaderMaterial===!1&&(F(C,R),N(C,R),C.push(s.outputColorSpace)),C.push(R.customProgramCacheKey),C.join()}function F(R,C){R.push(C.precision),R.push(C.outputColorSpace),R.push(C.envMapMode),R.push(C.envMapCubeUVHeight),R.push(C.mapUv),R.push(C.alphaMapUv),R.push(C.lightMapUv),R.push(C.aoMapUv),R.push(C.bumpMapUv),R.push(C.normalMapUv),R.push(C.displacementMapUv),R.push(C.emissiveMapUv),R.push(C.metalnessMapUv),R.push(C.roughnessMapUv),R.push(C.anisotropyMapUv),R.push(C.clearcoatMapUv),R.push(C.clearcoatNormalMapUv),R.push(C.clearcoatRoughnessMapUv),R.push(C.iridescenceMapUv),R.push(C.iridescenceThicknessMapUv),R.push(C.sheenColorMapUv),R.push(C.sheenRoughnessMapUv),R.push(C.specularMapUv),R.push(C.specularColorMapUv),R.push(C.specularIntensityMapUv),R.push(C.transmissionMapUv),R.push(C.thicknessMapUv),R.push(C.combine),R.push(C.fogExp2),R.push(C.sizeAttenuation),R.push(C.morphTargetsCount),R.push(C.morphAttributeCount),R.push(C.numDirLights),R.push(C.numPointLights),R.push(C.numSpotLights),R.push(C.numSpotLightMaps),R.push(C.numHemiLights),R.push(C.numRectAreaLights),R.push(C.numDirLightShadows),R.push(C.numPointLightShadows),R.push(C.numSpotLightShadows),R.push(C.numSpotLightShadowsWithMaps),R.push(C.numLightProbes),R.push(C.shadowMapType),R.push(C.toneMapping),R.push(C.numClippingPlanes),R.push(C.numClipIntersection),R.push(C.depthPacking)}function N(R,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),C.gradientMap&&d.enable(22),R.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reversedDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),R.push(d.mask)}function b(R){const C=w[R.type];let V;if(C){const Q=yi[C];V=zl.clone(Q.uniforms)}else V=R.uniforms;return V}function z(R,C){let V;for(let Q=0,ie=g.length;Q<ie;Q++){const de=g[Q];if(de.cacheKey===C){V=de,++V.usedTimes;break}}return V===void 0&&(V=new sE(s,C,R,l),g.push(V)),V}function k(R){if(--R.usedTimes===0){const C=g.indexOf(R);g[C]=g[g.length-1],g.pop(),R.destroy()}}function L(R){h.remove(R)}function j(){h.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:b,acquireProgram:z,releaseProgram:k,releaseShaderCache:L,programs:g,dispose:j}}function cE(){let s=new WeakMap;function e(c){return s.has(c)}function n(c){let d=s.get(c);return d===void 0&&(d={},s.set(c,d)),d}function r(c){s.delete(c)}function a(c,d,h){s.get(c)[d]=h}function l(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:l}}function fE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Nm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Fm(){const s=[];let e=0;const n=[],r=[],a=[];function l(){e=0,n.length=0,r.length=0,a.length=0}function c(v,x,S,w,A,y){let _=s[e];return _===void 0?(_={id:v.id,object:v,geometry:x,material:S,groupOrder:w,renderOrder:v.renderOrder,z:A,group:y},s[e]=_):(_.id=v.id,_.object=v,_.geometry=x,_.material=S,_.groupOrder=w,_.renderOrder=v.renderOrder,_.z=A,_.group=y),e++,_}function d(v,x,S,w,A,y){const _=c(v,x,S,w,A,y);S.transmission>0?r.push(_):S.transparent===!0?a.push(_):n.push(_)}function h(v,x,S,w,A,y){const _=c(v,x,S,w,A,y);S.transmission>0?r.unshift(_):S.transparent===!0?a.unshift(_):n.unshift(_)}function m(v,x){n.length>1&&n.sort(v||fE),r.length>1&&r.sort(x||Nm),a.length>1&&a.sort(x||Nm)}function g(){for(let v=e,x=s.length;v<x;v++){const S=s[v];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:l,push:d,unshift:h,finish:g,sort:m}}function dE(){let s=new WeakMap;function e(r,a){const l=s.get(r);let c;return l===void 0?(c=new Fm,s.set(r,[c])):a>=l.length?(c=new Fm,l.push(c)):c=l[a],c}function n(){s=new WeakMap}return{get:e,dispose:n}}function hE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new K,color:new Tt};break;case"SpotLight":n={position:new K,direction:new K,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new K,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new K,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":n={color:new Tt,position:new K,halfWidth:new K,halfHeight:new K};break}return s[e.id]=n,n}}}function pE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let mE=0;function gE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function _E(s){const e=new hE,n=pE(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new K);const a=new K,l=new tn,c=new tn;function d(m){let g=0,v=0,x=0;for(let R=0;R<9;R++)r.probe[R].set(0,0,0);let S=0,w=0,A=0,y=0,_=0,F=0,N=0,b=0,z=0,k=0,L=0;m.sort(gE);for(let R=0,C=m.length;R<C;R++){const V=m[R],Q=V.color,ie=V.intensity,de=V.distance,ue=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)g+=Q.r*ie,v+=Q.g*ie,x+=Q.b*ie;else if(V.isLightProbe){for(let le=0;le<9;le++)r.probe[le].addScaledVector(V.sh.coefficients[le],ie);L++}else if(V.isDirectionalLight){const le=e.get(V);if(le.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const fe=V.shadow,B=n.get(V);B.shadowIntensity=fe.intensity,B.shadowBias=fe.bias,B.shadowNormalBias=fe.normalBias,B.shadowRadius=fe.radius,B.shadowMapSize=fe.mapSize,r.directionalShadow[S]=B,r.directionalShadowMap[S]=ue,r.directionalShadowMatrix[S]=V.shadow.matrix,F++}r.directional[S]=le,S++}else if(V.isSpotLight){const le=e.get(V);le.position.setFromMatrixPosition(V.matrixWorld),le.color.copy(Q).multiplyScalar(ie),le.distance=de,le.coneCos=Math.cos(V.angle),le.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),le.decay=V.decay,r.spot[A]=le;const fe=V.shadow;if(V.map&&(r.spotLightMap[z]=V.map,z++,fe.updateMatrices(V),V.castShadow&&k++),r.spotLightMatrix[A]=fe.matrix,V.castShadow){const B=n.get(V);B.shadowIntensity=fe.intensity,B.shadowBias=fe.bias,B.shadowNormalBias=fe.normalBias,B.shadowRadius=fe.radius,B.shadowMapSize=fe.mapSize,r.spotShadow[A]=B,r.spotShadowMap[A]=ue,b++}A++}else if(V.isRectAreaLight){const le=e.get(V);le.color.copy(Q).multiplyScalar(ie),le.halfWidth.set(V.width*.5,0,0),le.halfHeight.set(0,V.height*.5,0),r.rectArea[y]=le,y++}else if(V.isPointLight){const le=e.get(V);if(le.color.copy(V.color).multiplyScalar(V.intensity),le.distance=V.distance,le.decay=V.decay,V.castShadow){const fe=V.shadow,B=n.get(V);B.shadowIntensity=fe.intensity,B.shadowBias=fe.bias,B.shadowNormalBias=fe.normalBias,B.shadowRadius=fe.radius,B.shadowMapSize=fe.mapSize,B.shadowCameraNear=fe.camera.near,B.shadowCameraFar=fe.camera.far,r.pointShadow[w]=B,r.pointShadowMap[w]=ue,r.pointShadowMatrix[w]=V.shadow.matrix,N++}r.point[w]=le,w++}else if(V.isHemisphereLight){const le=e.get(V);le.skyColor.copy(V.color).multiplyScalar(ie),le.groundColor.copy(V.groundColor).multiplyScalar(ie),r.hemi[_]=le,_++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ce.LTC_FLOAT_1,r.rectAreaLTC2=Ce.LTC_FLOAT_2):(r.rectAreaLTC1=Ce.LTC_HALF_1,r.rectAreaLTC2=Ce.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=v,r.ambient[2]=x;const j=r.hash;(j.directionalLength!==S||j.pointLength!==w||j.spotLength!==A||j.rectAreaLength!==y||j.hemiLength!==_||j.numDirectionalShadows!==F||j.numPointShadows!==N||j.numSpotShadows!==b||j.numSpotMaps!==z||j.numLightProbes!==L)&&(r.directional.length=S,r.spot.length=A,r.rectArea.length=y,r.point.length=w,r.hemi.length=_,r.directionalShadow.length=F,r.directionalShadowMap.length=F,r.pointShadow.length=N,r.pointShadowMap.length=N,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=F,r.pointShadowMatrix.length=N,r.spotLightMatrix.length=b+z-k,r.spotLightMap.length=z,r.numSpotLightShadowsWithMaps=k,r.numLightProbes=L,j.directionalLength=S,j.pointLength=w,j.spotLength=A,j.rectAreaLength=y,j.hemiLength=_,j.numDirectionalShadows=F,j.numPointShadows=N,j.numSpotShadows=b,j.numSpotMaps=z,j.numLightProbes=L,r.version=mE++)}function h(m,g){let v=0,x=0,S=0,w=0,A=0;const y=g.matrixWorldInverse;for(let _=0,F=m.length;_<F;_++){const N=m[_];if(N.isDirectionalLight){const b=r.directional[v];b.direction.setFromMatrixPosition(N.matrixWorld),a.setFromMatrixPosition(N.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(y),v++}else if(N.isSpotLight){const b=r.spot[S];b.position.setFromMatrixPosition(N.matrixWorld),b.position.applyMatrix4(y),b.direction.setFromMatrixPosition(N.matrixWorld),a.setFromMatrixPosition(N.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(y),S++}else if(N.isRectAreaLight){const b=r.rectArea[w];b.position.setFromMatrixPosition(N.matrixWorld),b.position.applyMatrix4(y),c.identity(),l.copy(N.matrixWorld),l.premultiply(y),c.extractRotation(l),b.halfWidth.set(N.width*.5,0,0),b.halfHeight.set(0,N.height*.5,0),b.halfWidth.applyMatrix4(c),b.halfHeight.applyMatrix4(c),w++}else if(N.isPointLight){const b=r.point[x];b.position.setFromMatrixPosition(N.matrixWorld),b.position.applyMatrix4(y),x++}else if(N.isHemisphereLight){const b=r.hemi[A];b.direction.setFromMatrixPosition(N.matrixWorld),b.direction.transformDirection(y),A++}}}return{setup:d,setupView:h,state:r}}function Om(s){const e=new _E(s),n=[],r=[];function a(g){m.camera=g,n.length=0,r.length=0}function l(g){n.push(g)}function c(g){r.push(g)}function d(){e.setup(n)}function h(g){e.setupView(n,g)}const m={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:d,setupLightsView:h,pushLight:l,pushShadow:c}}function vE(s){let e=new WeakMap;function n(a,l=0){const c=e.get(a);let d;return c===void 0?(d=new Om(s),e.set(a,[d])):l>=c.length?(d=new Om(s),c.push(d)):d=c[l],d}function r(){e=new WeakMap}return{get:n,dispose:r}}const xE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yE=`uniform sampler2D shadow_pass;
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
}`;function SE(s,e,n){let r=new pg;const a=new st,l=new st,c=new Yt,d=new j0({depthPacking:Xv}),h=new Y0,m={},g=n.maxTextureSize,v={[Er]:In,[In]:Er,[zi]:zi},x=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:xE,fragmentShader:yE}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const w=new Ki;w.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new hi(w,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xm;let _=this.type;this.render=function(k,L,j){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||k.length===0)return;const R=s.getRenderTarget(),C=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),Q=s.state;Q.setBlending(Gi),Q.buffers.depth.getReversed()===!0?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const ie=_!==Bi&&this.type===Bi,de=_===Bi&&this.type!==Bi;for(let ue=0,le=k.length;ue<le;ue++){const fe=k[ue],B=fe.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",fe,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;a.copy(B.mapSize);const oe=B.getFrameExtents();if(a.multiply(oe),l.copy(B.mapSize),(a.x>g||a.y>g)&&(a.x>g&&(l.x=Math.floor(g/oe.x),a.x=l.x*oe.x,B.mapSize.x=l.x),a.y>g&&(l.y=Math.floor(g/oe.y),a.y=l.y*oe.y,B.mapSize.y=l.y)),B.map===null||ie===!0||de===!0){const U=this.type!==Bi?{minFilter:pi,magFilter:pi}:{};B.map!==null&&B.map.dispose(),B.map=new ei(a.x,a.y,U),B.map.texture.name=fe.name+".shadowMap",B.camera.updateProjectionMatrix()}s.setRenderTarget(B.map),s.clear();const re=B.getViewportCount();for(let U=0;U<re;U++){const ne=B.getViewport(U);c.set(l.x*ne.x,l.y*ne.y,l.x*ne.z,l.y*ne.w),Q.viewport(c),B.updateMatrices(fe,U),r=B.getFrustum(),b(L,j,B.camera,fe,this.type)}B.isPointLightShadow!==!0&&this.type===Bi&&F(B,j),B.needsUpdate=!1}_=this.type,y.needsUpdate=!1,s.setRenderTarget(R,C,V)};function F(k,L){const j=e.update(A);x.defines.VSM_SAMPLES!==k.blurSamples&&(x.defines.VSM_SAMPLES=k.blurSamples,S.defines.VSM_SAMPLES=k.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new ei(a.x,a.y)),x.uniforms.shadow_pass.value=k.map.texture,x.uniforms.resolution.value=k.mapSize,x.uniforms.radius.value=k.radius,s.setRenderTarget(k.mapPass),s.clear(),s.renderBufferDirect(L,null,j,x,A,null),S.uniforms.shadow_pass.value=k.mapPass.texture,S.uniforms.resolution.value=k.mapSize,S.uniforms.radius.value=k.radius,s.setRenderTarget(k.map),s.clear(),s.renderBufferDirect(L,null,j,S,A,null)}function N(k,L,j,R){let C=null;const V=j.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(V!==void 0)C=V;else if(C=j.isPointLight===!0?h:d,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const Q=C.uuid,ie=L.uuid;let de=m[Q];de===void 0&&(de={},m[Q]=de);let ue=de[ie];ue===void 0&&(ue=C.clone(),de[ie]=ue,L.addEventListener("dispose",z)),C=ue}if(C.visible=L.visible,C.wireframe=L.wireframe,R===Bi?C.side=L.shadowSide!==null?L.shadowSide:L.side:C.side=L.shadowSide!==null?L.shadowSide:v[L.side],C.alphaMap=L.alphaMap,C.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,C.map=L.map,C.clipShadows=L.clipShadows,C.clippingPlanes=L.clippingPlanes,C.clipIntersection=L.clipIntersection,C.displacementMap=L.displacementMap,C.displacementScale=L.displacementScale,C.displacementBias=L.displacementBias,C.wireframeLinewidth=L.wireframeLinewidth,C.linewidth=L.linewidth,j.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const Q=s.properties.get(C);Q.light=j}return C}function b(k,L,j,R,C){if(k.visible===!1)return;if(k.layers.test(L.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&C===Bi)&&(!k.frustumCulled||r.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,k.matrixWorld);const ie=e.update(k),de=k.material;if(Array.isArray(de)){const ue=ie.groups;for(let le=0,fe=ue.length;le<fe;le++){const B=ue[le],oe=de[B.materialIndex];if(oe&&oe.visible){const re=N(k,oe,R,C);k.onBeforeShadow(s,k,L,j,ie,re,B),s.renderBufferDirect(j,null,ie,re,k,B),k.onAfterShadow(s,k,L,j,ie,re,B)}}}else if(de.visible){const ue=N(k,de,R,C);k.onBeforeShadow(s,k,L,j,ie,ue,null),s.renderBufferDirect(j,null,ie,ue,k,null),k.onAfterShadow(s,k,L,j,ie,ue,null)}}const Q=k.children;for(let ie=0,de=Q.length;ie<de;ie++)b(Q[ie],L,j,R,C)}function z(k){k.target.removeEventListener("dispose",z);for(const j in m){const R=m[j],C=k.target.uuid;C in R&&(R[C].dispose(),delete R[C])}}}const ME={[af]:lf,[uf]:df,[cf]:hf,[js]:ff,[lf]:af,[df]:uf,[hf]:cf,[ff]:js};function EE(s,e){function n(){let H=!1;const xe=new Yt;let we=null;const De=new Yt(0,0,0,0);return{setMask:function(ve){we!==ve&&!H&&(s.colorMask(ve,ve,ve,ve),we=ve)},setLocked:function(ve){H=ve},setClear:function(ve,he,We,ut,At){At===!0&&(ve*=ut,he*=ut,We*=ut),xe.set(ve,he,We,ut),De.equals(xe)===!1&&(s.clearColor(ve,he,We,ut),De.copy(xe))},reset:function(){H=!1,we=null,De.set(-1,0,0,0)}}}function r(){let H=!1,xe=!1,we=null,De=null,ve=null;return{setReversed:function(he){if(xe!==he){const We=e.get("EXT_clip_control");he?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),xe=he;const ut=ve;ve=null,this.setClear(ut)}},getReversed:function(){return xe},setTest:function(he){he?ae(s.DEPTH_TEST):Se(s.DEPTH_TEST)},setMask:function(he){we!==he&&!H&&(s.depthMask(he),we=he)},setFunc:function(he){if(xe&&(he=ME[he]),De!==he){switch(he){case af:s.depthFunc(s.NEVER);break;case lf:s.depthFunc(s.ALWAYS);break;case uf:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case cf:s.depthFunc(s.EQUAL);break;case ff:s.depthFunc(s.GEQUAL);break;case df:s.depthFunc(s.GREATER);break;case hf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}De=he}},setLocked:function(he){H=he},setClear:function(he){ve!==he&&(xe&&(he=1-he),s.clearDepth(he),ve=he)},reset:function(){H=!1,we=null,De=null,ve=null,xe=!1}}}function a(){let H=!1,xe=null,we=null,De=null,ve=null,he=null,We=null,ut=null,At=null;return{setTest:function(xt){H||(xt?ae(s.STENCIL_TEST):Se(s.STENCIL_TEST))},setMask:function(xt){xe!==xt&&!H&&(s.stencilMask(xt),xe=xt)},setFunc:function(xt,Wn,fn){(we!==xt||De!==Wn||ve!==fn)&&(s.stencilFunc(xt,Wn,fn),we=xt,De=Wn,ve=fn)},setOp:function(xt,Wn,fn){(he!==xt||We!==Wn||ut!==fn)&&(s.stencilOp(xt,Wn,fn),he=xt,We=Wn,ut=fn)},setLocked:function(xt){H=xt},setClear:function(xt){At!==xt&&(s.clearStencil(xt),At=xt)},reset:function(){H=!1,xe=null,we=null,De=null,ve=null,he=null,We=null,ut=null,At=null}}}const l=new n,c=new r,d=new a,h=new WeakMap,m=new WeakMap;let g={},v={},x=new WeakMap,S=[],w=null,A=!1,y=null,_=null,F=null,N=null,b=null,z=null,k=null,L=new Tt(0,0,0),j=0,R=!1,C=null,V=null,Q=null,ie=null,de=null;const ue=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let le=!1,fe=0;const B=s.getParameter(s.VERSION);B.indexOf("WebGL")!==-1?(fe=parseFloat(/^WebGL (\d)/.exec(B)[1]),le=fe>=1):B.indexOf("OpenGL ES")!==-1&&(fe=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),le=fe>=2);let oe=null,re={};const U=s.getParameter(s.SCISSOR_BOX),ne=s.getParameter(s.VIEWPORT),Fe=new Yt().fromArray(U),Xe=new Yt().fromArray(ne);function He(H,xe,we,De){const ve=new Uint8Array(4),he=s.createTexture();s.bindTexture(H,he),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let We=0;We<we;We++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(xe,0,s.RGBA,1,1,De,0,s.RGBA,s.UNSIGNED_BYTE,ve):s.texImage2D(xe+We,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ve);return he}const J={};J[s.TEXTURE_2D]=He(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=He(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=He(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=He(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),c.setClear(1),d.setClear(0),ae(s.DEPTH_TEST),c.setFunc(js),nt(!1),Ve(Vp),ae(s.CULL_FACE),Ct(Gi);function ae(H){g[H]!==!0&&(s.enable(H),g[H]=!0)}function Se(H){g[H]!==!1&&(s.disable(H),g[H]=!1)}function Pe(H,xe){return v[H]!==xe?(s.bindFramebuffer(H,xe),v[H]=xe,H===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=xe),H===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ne(H,xe){let we=S,De=!1;if(H){we=x.get(xe),we===void 0&&(we=[],x.set(xe,we));const ve=H.textures;if(we.length!==ve.length||we[0]!==s.COLOR_ATTACHMENT0){for(let he=0,We=ve.length;he<We;he++)we[he]=s.COLOR_ATTACHMENT0+he;we.length=ve.length,De=!0}}else we[0]!==s.BACK&&(we[0]=s.BACK,De=!0);De&&s.drawBuffers(we)}function pt(H){return w!==H?(s.useProgram(H),w=H,!0):!1}const $t={[jr]:s.FUNC_ADD,[_v]:s.FUNC_SUBTRACT,[vv]:s.FUNC_REVERSE_SUBTRACT};$t[xv]=s.MIN,$t[yv]=s.MAX;const I={[Sv]:s.ZERO,[Mv]:s.ONE,[Ev]:s.SRC_COLOR,[sf]:s.SRC_ALPHA,[bv]:s.SRC_ALPHA_SATURATE,[Rv]:s.DST_COLOR,[wv]:s.DST_ALPHA,[Tv]:s.ONE_MINUS_SRC_COLOR,[of]:s.ONE_MINUS_SRC_ALPHA,[Cv]:s.ONE_MINUS_DST_COLOR,[Av]:s.ONE_MINUS_DST_ALPHA,[Pv]:s.CONSTANT_COLOR,[Dv]:s.ONE_MINUS_CONSTANT_COLOR,[Lv]:s.CONSTANT_ALPHA,[Uv]:s.ONE_MINUS_CONSTANT_ALPHA};function Ct(H,xe,we,De,ve,he,We,ut,At,xt){if(H===Gi){A===!0&&(Se(s.BLEND),A=!1);return}if(A===!1&&(ae(s.BLEND),A=!0),H!==gv){if(H!==y||xt!==R){if((_!==jr||b!==jr)&&(s.blendEquation(s.FUNC_ADD),_=jr,b=jr),xt)switch(H){case Ws:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case rf:s.blendFunc(s.ONE,s.ONE);break;case Gp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Wp:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Ws:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case rf:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Gp:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wp:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}F=null,N=null,z=null,k=null,L.set(0,0,0),j=0,y=H,R=xt}return}ve=ve||xe,he=he||we,We=We||De,(xe!==_||ve!==b)&&(s.blendEquationSeparate($t[xe],$t[ve]),_=xe,b=ve),(we!==F||De!==N||he!==z||We!==k)&&(s.blendFuncSeparate(I[we],I[De],I[he],I[We]),F=we,N=De,z=he,k=We),(ut.equals(L)===!1||At!==j)&&(s.blendColor(ut.r,ut.g,ut.b,At),L.copy(ut),j=At),y=H,R=!1}function ct(H,xe){H.side===zi?Se(s.CULL_FACE):ae(s.CULL_FACE);let we=H.side===In;xe&&(we=!we),nt(we),H.blending===Ws&&H.transparent===!1?Ct(Gi):Ct(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),c.setFunc(H.depthFunc),c.setTest(H.depthTest),c.setMask(H.depthWrite),l.setMask(H.colorWrite);const De=H.stencilWrite;d.setTest(De),De&&(d.setMask(H.stencilWriteMask),d.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),d.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ge(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ae(s.SAMPLE_ALPHA_TO_COVERAGE):Se(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(H){C!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),C=H)}function Ve(H){H!==hv?(ae(s.CULL_FACE),H!==V&&(H===Vp?s.cullFace(s.BACK):H===pv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Se(s.CULL_FACE),V=H}function Lt(H){H!==Q&&(le&&s.lineWidth(H),Q=H)}function Ge(H,xe,we){H?(ae(s.POLYGON_OFFSET_FILL),(ie!==xe||de!==we)&&(s.polygonOffset(xe,we),ie=xe,de=we)):Se(s.POLYGON_OFFSET_FILL)}function lt(H){H?ae(s.SCISSOR_TEST):Se(s.SCISSOR_TEST)}function Ot(H){H===void 0&&(H=s.TEXTURE0+ue-1),oe!==H&&(s.activeTexture(H),oe=H)}function kt(H,xe,we){we===void 0&&(oe===null?we=s.TEXTURE0+ue-1:we=oe);let De=re[we];De===void 0&&(De={type:void 0,texture:void 0},re[we]=De),(De.type!==H||De.texture!==xe)&&(oe!==we&&(s.activeTexture(we),oe=we),s.bindTexture(H,xe||J[H]),De.type=H,De.texture=xe)}function P(){const H=re[oe];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function E(){try{s.compressedTexImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function q(){try{s.compressedTexImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ce(){try{s.texSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{s.texSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function se(){try{s.compressedTexSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ke(){try{s.compressedTexSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Te(){try{s.texStorage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ke(){try{s.texStorage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function $e(){try{s.texImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Me(){try{s.texImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function be(H){Fe.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),Fe.copy(H))}function it(H){Xe.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Xe.copy(H))}function Ye(H,xe){let we=m.get(xe);we===void 0&&(we=new WeakMap,m.set(xe,we));let De=we.get(H);De===void 0&&(De=s.getUniformBlockIndex(xe,H.name),we.set(H,De))}function Ae(H,xe){const De=m.get(xe).get(H);h.get(xe)!==De&&(s.uniformBlockBinding(xe,De,H.__bindingPointIndex),h.set(xe,De))}function ft(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),c.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),g={},oe=null,re={},v={},x=new WeakMap,S=[],w=null,A=!1,y=null,_=null,F=null,N=null,b=null,z=null,k=null,L=new Tt(0,0,0),j=0,R=!1,C=null,V=null,Q=null,ie=null,de=null,Fe.set(0,0,s.canvas.width,s.canvas.height),Xe.set(0,0,s.canvas.width,s.canvas.height),l.reset(),c.reset(),d.reset()}return{buffers:{color:l,depth:c,stencil:d},enable:ae,disable:Se,bindFramebuffer:Pe,drawBuffers:Ne,useProgram:pt,setBlending:Ct,setMaterial:ct,setFlipSided:nt,setCullFace:Ve,setLineWidth:Lt,setPolygonOffset:Ge,setScissorTest:lt,activeTexture:Ot,bindTexture:kt,unbindTexture:P,compressedTexImage2D:E,compressedTexImage3D:q,texImage2D:$e,texImage3D:Me,updateUBOMapping:Ye,uniformBlockBinding:Ae,texStorage2D:Te,texStorage3D:ke,texSubImage2D:ce,texSubImage3D:me,compressedTexSubImage2D:se,compressedTexSubImage3D:Ke,scissor:be,viewport:it,reset:ft}}function TE(s,e,n,r,a,l,c){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new st,g=new WeakMap;let v;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(P,E){return S?new OffscreenCanvas(P,E):Bl("canvas")}function A(P,E,q){let ce=1;const me=kt(P);if((me.width>q||me.height>q)&&(ce=q/Math.max(me.width,me.height)),ce<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const se=Math.floor(ce*me.width),Ke=Math.floor(ce*me.height);v===void 0&&(v=w(se,Ke));const Te=E?w(se,Ke):v;return Te.width=se,Te.height=Ke,Te.getContext("2d").drawImage(P,0,0,se,Ke),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+se+"x"+Ke+")."),Te}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),P;return P}function y(P){return P.generateMipmaps}function _(P){s.generateMipmap(P)}function F(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function N(P,E,q,ce,me=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let se=E;if(E===s.RED&&(q===s.FLOAT&&(se=s.R32F),q===s.HALF_FLOAT&&(se=s.R16F),q===s.UNSIGNED_BYTE&&(se=s.R8)),E===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(se=s.R8UI),q===s.UNSIGNED_SHORT&&(se=s.R16UI),q===s.UNSIGNED_INT&&(se=s.R32UI),q===s.BYTE&&(se=s.R8I),q===s.SHORT&&(se=s.R16I),q===s.INT&&(se=s.R32I)),E===s.RG&&(q===s.FLOAT&&(se=s.RG32F),q===s.HALF_FLOAT&&(se=s.RG16F),q===s.UNSIGNED_BYTE&&(se=s.RG8)),E===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(se=s.RG8UI),q===s.UNSIGNED_SHORT&&(se=s.RG16UI),q===s.UNSIGNED_INT&&(se=s.RG32UI),q===s.BYTE&&(se=s.RG8I),q===s.SHORT&&(se=s.RG16I),q===s.INT&&(se=s.RG32I)),E===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(se=s.RGB8UI),q===s.UNSIGNED_SHORT&&(se=s.RGB16UI),q===s.UNSIGNED_INT&&(se=s.RGB32UI),q===s.BYTE&&(se=s.RGB8I),q===s.SHORT&&(se=s.RGB16I),q===s.INT&&(se=s.RGB32I)),E===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(se=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(se=s.RGBA16UI),q===s.UNSIGNED_INT&&(se=s.RGBA32UI),q===s.BYTE&&(se=s.RGBA8I),q===s.SHORT&&(se=s.RGBA16I),q===s.INT&&(se=s.RGBA32I)),E===s.RGB&&(q===s.UNSIGNED_INT_5_9_9_9_REV&&(se=s.RGB9_E5),q===s.UNSIGNED_INT_10F_11F_11F_REV&&(se=s.R11F_G11F_B10F)),E===s.RGBA){const Ke=me?Ol:Et.getTransfer(ce);q===s.FLOAT&&(se=s.RGBA32F),q===s.HALF_FLOAT&&(se=s.RGBA16F),q===s.UNSIGNED_BYTE&&(se=Ke===Pt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(se=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(se=s.RGB5_A1)}return(se===s.R16F||se===s.R32F||se===s.RG16F||se===s.RG32F||se===s.RGBA16F||se===s.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function b(P,E){let q;return P?E===null||E===Zr||E===Go?q=s.DEPTH24_STENCIL8:E===Vi?q=s.DEPTH32F_STENCIL8:E===Vo&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Zr||E===Go?q=s.DEPTH_COMPONENT24:E===Vi?q=s.DEPTH_COMPONENT32F:E===Vo&&(q=s.DEPTH_COMPONENT16),q}function z(P,E){return y(P)===!0||P.isFramebufferTexture&&P.minFilter!==pi&&P.minFilter!==Si?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function k(P){const E=P.target;E.removeEventListener("dispose",k),j(E),E.isVideoTexture&&g.delete(E)}function L(P){const E=P.target;E.removeEventListener("dispose",L),C(E)}function j(P){const E=r.get(P);if(E.__webglInit===void 0)return;const q=P.source,ce=x.get(q);if(ce){const me=ce[E.__cacheKey];me.usedTimes--,me.usedTimes===0&&R(P),Object.keys(ce).length===0&&x.delete(q)}r.remove(P)}function R(P){const E=r.get(P);s.deleteTexture(E.__webglTexture);const q=P.source,ce=x.get(q);delete ce[E.__cacheKey],c.memory.textures--}function C(P){const E=r.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),r.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(E.__webglFramebuffer[ce]))for(let me=0;me<E.__webglFramebuffer[ce].length;me++)s.deleteFramebuffer(E.__webglFramebuffer[ce][me]);else s.deleteFramebuffer(E.__webglFramebuffer[ce]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[ce])}else{if(Array.isArray(E.__webglFramebuffer))for(let ce=0;ce<E.__webglFramebuffer.length;ce++)s.deleteFramebuffer(E.__webglFramebuffer[ce]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ce=0;ce<E.__webglColorRenderbuffer.length;ce++)E.__webglColorRenderbuffer[ce]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[ce]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const q=P.textures;for(let ce=0,me=q.length;ce<me;ce++){const se=r.get(q[ce]);se.__webglTexture&&(s.deleteTexture(se.__webglTexture),c.memory.textures--),r.remove(q[ce])}r.remove(P)}let V=0;function Q(){V=0}function ie(){const P=V;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),V+=1,P}function de(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function ue(P,E){const q=r.get(P);if(P.isVideoTexture&&lt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&q.__version!==P.version){const ce=P.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(q,P,E);return}}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+E)}function le(P,E){const q=r.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){J(q,P,E);return}n.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+E)}function fe(P,E){const q=r.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){J(q,P,E);return}n.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+E)}function B(P,E){const q=r.get(P);if(P.version>0&&q.__version!==P.version){ae(q,P,E);return}n.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+E)}const oe={[gf]:s.REPEAT,[qr]:s.CLAMP_TO_EDGE,[_f]:s.MIRRORED_REPEAT},re={[pi]:s.NEAREST,[Gv]:s.NEAREST_MIPMAP_NEAREST,[ol]:s.NEAREST_MIPMAP_LINEAR,[Si]:s.LINEAR,[Rc]:s.LINEAR_MIPMAP_NEAREST,[Kr]:s.LINEAR_MIPMAP_LINEAR},U={[qv]:s.NEVER,[e0]:s.ALWAYS,[Kv]:s.LESS,[ng]:s.LEQUAL,[$v]:s.EQUAL,[Jv]:s.GEQUAL,[Zv]:s.GREATER,[Qv]:s.NOTEQUAL};function ne(P,E){if(E.type===Vi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Si||E.magFilter===Rc||E.magFilter===ol||E.magFilter===Kr||E.minFilter===Si||E.minFilter===Rc||E.minFilter===ol||E.minFilter===Kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,oe[E.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,oe[E.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,oe[E.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,re[E.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,re[E.minFilter]),E.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,U[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===pi||E.minFilter!==ol&&E.minFilter!==Kr||E.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,a.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function Fe(P,E){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",k));const ce=E.source;let me=x.get(ce);me===void 0&&(me={},x.set(ce,me));const se=de(E);if(se!==P.__cacheKey){me[se]===void 0&&(me[se]={texture:s.createTexture(),usedTimes:0},c.memory.textures++,q=!0),me[se].usedTimes++;const Ke=me[P.__cacheKey];Ke!==void 0&&(me[P.__cacheKey].usedTimes--,Ke.usedTimes===0&&R(E)),P.__cacheKey=se,P.__webglTexture=me[se].texture}return q}function Xe(P,E,q){return Math.floor(Math.floor(P/q)/E)}function He(P,E,q,ce){const se=P.updateRanges;if(se.length===0)n.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,q,ce,E.data);else{se.sort((Me,be)=>Me.start-be.start);let Ke=0;for(let Me=1;Me<se.length;Me++){const be=se[Ke],it=se[Me],Ye=be.start+be.count,Ae=Xe(it.start,E.width,4),ft=Xe(be.start,E.width,4);it.start<=Ye+1&&Ae===ft&&Xe(it.start+it.count-1,E.width,4)===Ae?be.count=Math.max(be.count,it.start+it.count-be.start):(++Ke,se[Ke]=it)}se.length=Ke+1;const Te=s.getParameter(s.UNPACK_ROW_LENGTH),ke=s.getParameter(s.UNPACK_SKIP_PIXELS),$e=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let Me=0,be=se.length;Me<be;Me++){const it=se[Me],Ye=Math.floor(it.start/4),Ae=Math.ceil(it.count/4),ft=Ye%E.width,H=Math.floor(Ye/E.width),xe=Ae,we=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ft),s.pixelStorei(s.UNPACK_SKIP_ROWS,H),n.texSubImage2D(s.TEXTURE_2D,0,ft,H,xe,we,q,ce,E.data)}P.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,Te),s.pixelStorei(s.UNPACK_SKIP_PIXELS,ke),s.pixelStorei(s.UNPACK_SKIP_ROWS,$e)}}function J(P,E,q){let ce=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ce=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ce=s.TEXTURE_3D);const me=Fe(P,E),se=E.source;n.bindTexture(ce,P.__webglTexture,s.TEXTURE0+q);const Ke=r.get(se);if(se.version!==Ke.__version||me===!0){n.activeTexture(s.TEXTURE0+q);const Te=Et.getPrimaries(Et.workingColorSpace),ke=E.colorSpace===Hi?null:Et.getPrimaries(E.colorSpace),$e=E.colorSpace===Hi||Te===ke?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let Me=A(E.image,!1,a.maxTextureSize);Me=Ot(E,Me);const be=l.convert(E.format,E.colorSpace),it=l.convert(E.type);let Ye=N(E.internalFormat,be,it,E.colorSpace,E.isVideoTexture);ne(ce,E);let Ae;const ft=E.mipmaps,H=E.isVideoTexture!==!0,xe=Ke.__version===void 0||me===!0,we=se.dataReady,De=z(E,Me);if(E.isDepthTexture)Ye=b(E.format===Xo,E.type),xe&&(H?n.texStorage2D(s.TEXTURE_2D,1,Ye,Me.width,Me.height):n.texImage2D(s.TEXTURE_2D,0,Ye,Me.width,Me.height,0,be,it,null));else if(E.isDataTexture)if(ft.length>0){H&&xe&&n.texStorage2D(s.TEXTURE_2D,De,Ye,ft[0].width,ft[0].height);for(let ve=0,he=ft.length;ve<he;ve++)Ae=ft[ve],H?we&&n.texSubImage2D(s.TEXTURE_2D,ve,0,0,Ae.width,Ae.height,be,it,Ae.data):n.texImage2D(s.TEXTURE_2D,ve,Ye,Ae.width,Ae.height,0,be,it,Ae.data);E.generateMipmaps=!1}else H?(xe&&n.texStorage2D(s.TEXTURE_2D,De,Ye,Me.width,Me.height),we&&He(E,Me,be,it)):n.texImage2D(s.TEXTURE_2D,0,Ye,Me.width,Me.height,0,be,it,Me.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){H&&xe&&n.texStorage3D(s.TEXTURE_2D_ARRAY,De,Ye,ft[0].width,ft[0].height,Me.depth);for(let ve=0,he=ft.length;ve<he;ve++)if(Ae=ft[ve],E.format!==di)if(be!==null)if(H){if(we)if(E.layerUpdates.size>0){const We=hm(Ae.width,Ae.height,E.format,E.type);for(const ut of E.layerUpdates){const At=Ae.data.subarray(ut*We/Ae.data.BYTES_PER_ELEMENT,(ut+1)*We/Ae.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ve,0,0,ut,Ae.width,Ae.height,1,be,At)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ve,0,0,0,Ae.width,Ae.height,Me.depth,be,Ae.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ve,Ye,Ae.width,Ae.height,Me.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else H?we&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,ve,0,0,0,Ae.width,Ae.height,Me.depth,be,it,Ae.data):n.texImage3D(s.TEXTURE_2D_ARRAY,ve,Ye,Ae.width,Ae.height,Me.depth,0,be,it,Ae.data)}else{H&&xe&&n.texStorage2D(s.TEXTURE_2D,De,Ye,ft[0].width,ft[0].height);for(let ve=0,he=ft.length;ve<he;ve++)Ae=ft[ve],E.format!==di?be!==null?H?we&&n.compressedTexSubImage2D(s.TEXTURE_2D,ve,0,0,Ae.width,Ae.height,be,Ae.data):n.compressedTexImage2D(s.TEXTURE_2D,ve,Ye,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):H?we&&n.texSubImage2D(s.TEXTURE_2D,ve,0,0,Ae.width,Ae.height,be,it,Ae.data):n.texImage2D(s.TEXTURE_2D,ve,Ye,Ae.width,Ae.height,0,be,it,Ae.data)}else if(E.isDataArrayTexture)if(H){if(xe&&n.texStorage3D(s.TEXTURE_2D_ARRAY,De,Ye,Me.width,Me.height,Me.depth),we)if(E.layerUpdates.size>0){const ve=hm(Me.width,Me.height,E.format,E.type);for(const he of E.layerUpdates){const We=Me.data.subarray(he*ve/Me.data.BYTES_PER_ELEMENT,(he+1)*ve/Me.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,Me.width,Me.height,1,be,it,We)}E.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Me.width,Me.height,Me.depth,be,it,Me.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,Ye,Me.width,Me.height,Me.depth,0,be,it,Me.data);else if(E.isData3DTexture)H?(xe&&n.texStorage3D(s.TEXTURE_3D,De,Ye,Me.width,Me.height,Me.depth),we&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Me.width,Me.height,Me.depth,be,it,Me.data)):n.texImage3D(s.TEXTURE_3D,0,Ye,Me.width,Me.height,Me.depth,0,be,it,Me.data);else if(E.isFramebufferTexture){if(xe)if(H)n.texStorage2D(s.TEXTURE_2D,De,Ye,Me.width,Me.height);else{let ve=Me.width,he=Me.height;for(let We=0;We<De;We++)n.texImage2D(s.TEXTURE_2D,We,Ye,ve,he,0,be,it,null),ve>>=1,he>>=1}}else if(ft.length>0){if(H&&xe){const ve=kt(ft[0]);n.texStorage2D(s.TEXTURE_2D,De,Ye,ve.width,ve.height)}for(let ve=0,he=ft.length;ve<he;ve++)Ae=ft[ve],H?we&&n.texSubImage2D(s.TEXTURE_2D,ve,0,0,be,it,Ae):n.texImage2D(s.TEXTURE_2D,ve,Ye,be,it,Ae);E.generateMipmaps=!1}else if(H){if(xe){const ve=kt(Me);n.texStorage2D(s.TEXTURE_2D,De,Ye,ve.width,ve.height)}we&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,be,it,Me)}else n.texImage2D(s.TEXTURE_2D,0,Ye,be,it,Me);y(E)&&_(ce),Ke.__version=se.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function ae(P,E,q){if(E.image.length!==6)return;const ce=Fe(P,E),me=E.source;n.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+q);const se=r.get(me);if(me.version!==se.__version||ce===!0){n.activeTexture(s.TEXTURE0+q);const Ke=Et.getPrimaries(Et.workingColorSpace),Te=E.colorSpace===Hi?null:Et.getPrimaries(E.colorSpace),ke=E.colorSpace===Hi||Ke===Te?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);const $e=E.isCompressedTexture||E.image[0].isCompressedTexture,Me=E.image[0]&&E.image[0].isDataTexture,be=[];for(let he=0;he<6;he++)!$e&&!Me?be[he]=A(E.image[he],!0,a.maxCubemapSize):be[he]=Me?E.image[he].image:E.image[he],be[he]=Ot(E,be[he]);const it=be[0],Ye=l.convert(E.format,E.colorSpace),Ae=l.convert(E.type),ft=N(E.internalFormat,Ye,Ae,E.colorSpace),H=E.isVideoTexture!==!0,xe=se.__version===void 0||ce===!0,we=me.dataReady;let De=z(E,it);ne(s.TEXTURE_CUBE_MAP,E);let ve;if($e){H&&xe&&n.texStorage2D(s.TEXTURE_CUBE_MAP,De,ft,it.width,it.height);for(let he=0;he<6;he++){ve=be[he].mipmaps;for(let We=0;We<ve.length;We++){const ut=ve[We];E.format!==di?Ye!==null?H?we&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We,0,0,ut.width,ut.height,Ye,ut.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We,ft,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?we&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We,0,0,ut.width,ut.height,Ye,Ae,ut.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We,ft,ut.width,ut.height,0,Ye,Ae,ut.data)}}}else{if(ve=E.mipmaps,H&&xe){ve.length>0&&De++;const he=kt(be[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,De,ft,he.width,he.height)}for(let he=0;he<6;he++)if(Me){H?we&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,be[he].width,be[he].height,Ye,Ae,be[he].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ft,be[he].width,be[he].height,0,Ye,Ae,be[he].data);for(let We=0;We<ve.length;We++){const At=ve[We].image[he].image;H?we&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We+1,0,0,At.width,At.height,Ye,Ae,At.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We+1,ft,At.width,At.height,0,Ye,Ae,At.data)}}else{H?we&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ye,Ae,be[he]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ft,Ye,Ae,be[he]);for(let We=0;We<ve.length;We++){const ut=ve[We];H?we&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We+1,0,0,Ye,Ae,ut.image[he]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,We+1,ft,Ye,Ae,ut.image[he])}}}y(E)&&_(s.TEXTURE_CUBE_MAP),se.__version=me.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Se(P,E,q,ce,me,se){const Ke=l.convert(q.format,q.colorSpace),Te=l.convert(q.type),ke=N(q.internalFormat,Ke,Te,q.colorSpace),$e=r.get(E),Me=r.get(q);if(Me.__renderTarget=E,!$e.__hasExternalTextures){const be=Math.max(1,E.width>>se),it=Math.max(1,E.height>>se);me===s.TEXTURE_3D||me===s.TEXTURE_2D_ARRAY?n.texImage3D(me,se,ke,be,it,E.depth,0,Ke,Te,null):n.texImage2D(me,se,ke,be,it,0,Ke,Te,null)}n.bindFramebuffer(s.FRAMEBUFFER,P),Ge(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ce,me,Me.__webglTexture,0,Lt(E)):(me===s.TEXTURE_2D||me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ce,me,Me.__webglTexture,se),n.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(P,E,q){if(s.bindRenderbuffer(s.RENDERBUFFER,P),E.depthBuffer){const ce=E.depthTexture,me=ce&&ce.isDepthTexture?ce.type:null,se=b(E.stencilBuffer,me),Ke=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Te=Lt(E);Ge(E)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Te,se,E.width,E.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,se,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,se,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ke,s.RENDERBUFFER,P)}else{const ce=E.textures;for(let me=0;me<ce.length;me++){const se=ce[me],Ke=l.convert(se.format,se.colorSpace),Te=l.convert(se.type),ke=N(se.internalFormat,Ke,Te,se.colorSpace),$e=Lt(E);q&&Ge(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$e,ke,E.width,E.height):Ge(E)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$e,ke,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,ke,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ne(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ce=r.get(E.depthTexture);ce.__renderTarget=E,(!ce.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ue(E.depthTexture,0);const me=ce.__webglTexture,se=Lt(E);if(E.depthTexture.format===Wo)Ge(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,me,0,se):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,me,0);else if(E.depthTexture.format===Xo)Ge(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,me,0,se):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,me,0);else throw new Error("Unknown depthTexture format")}function pt(P){const E=r.get(P),q=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const ce=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ce){const me=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ce.removeEventListener("dispose",me)};ce.addEventListener("dispose",me),E.__depthDisposeCallback=me}E.__boundDepthTexture=ce}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const ce=P.texture.mipmaps;ce&&ce.length>0?Ne(E.__webglFramebuffer[0],P):Ne(E.__webglFramebuffer,P)}else if(q){E.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[ce]),E.__webglDepthbuffer[ce]===void 0)E.__webglDepthbuffer[ce]=s.createRenderbuffer(),Pe(E.__webglDepthbuffer[ce],P,!1);else{const me=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer[ce];s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,me,s.RENDERBUFFER,se)}}else{const ce=P.texture.mipmaps;if(ce&&ce.length>0?n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Pe(E.__webglDepthbuffer,P,!1);else{const me=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,me,s.RENDERBUFFER,se)}}n.bindFramebuffer(s.FRAMEBUFFER,null)}function $t(P,E,q){const ce=r.get(P);E!==void 0&&Se(ce.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&pt(P)}function I(P){const E=P.texture,q=r.get(P),ce=r.get(E);P.addEventListener("dispose",L);const me=P.textures,se=P.isWebGLCubeRenderTarget===!0,Ke=me.length>1;if(Ke||(ce.__webglTexture===void 0&&(ce.__webglTexture=s.createTexture()),ce.__version=E.version,c.memory.textures++),se){q.__webglFramebuffer=[];for(let Te=0;Te<6;Te++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[Te]=[];for(let ke=0;ke<E.mipmaps.length;ke++)q.__webglFramebuffer[Te][ke]=s.createFramebuffer()}else q.__webglFramebuffer[Te]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let Te=0;Te<E.mipmaps.length;Te++)q.__webglFramebuffer[Te]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(Ke)for(let Te=0,ke=me.length;Te<ke;Te++){const $e=r.get(me[Te]);$e.__webglTexture===void 0&&($e.__webglTexture=s.createTexture(),c.memory.textures++)}if(P.samples>0&&Ge(P)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Te=0;Te<me.length;Te++){const ke=me[Te];q.__webglColorRenderbuffer[Te]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[Te]);const $e=l.convert(ke.format,ke.colorSpace),Me=l.convert(ke.type),be=N(ke.internalFormat,$e,Me,ke.colorSpace,P.isXRRenderTarget===!0),it=Lt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,it,be,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.RENDERBUFFER,q.__webglColorRenderbuffer[Te])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),Pe(q.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(se){n.bindTexture(s.TEXTURE_CUBE_MAP,ce.__webglTexture),ne(s.TEXTURE_CUBE_MAP,E);for(let Te=0;Te<6;Te++)if(E.mipmaps&&E.mipmaps.length>0)for(let ke=0;ke<E.mipmaps.length;ke++)Se(q.__webglFramebuffer[Te][ke],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,ke);else Se(q.__webglFramebuffer[Te],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0);y(E)&&_(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ke){for(let Te=0,ke=me.length;Te<ke;Te++){const $e=me[Te],Me=r.get($e);let be=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(be=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(be,Me.__webglTexture),ne(be,$e),Se(q.__webglFramebuffer,P,$e,s.COLOR_ATTACHMENT0+Te,be,0),y($e)&&_(be)}n.unbindTexture()}else{let Te=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Te=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Te,ce.__webglTexture),ne(Te,E),E.mipmaps&&E.mipmaps.length>0)for(let ke=0;ke<E.mipmaps.length;ke++)Se(q.__webglFramebuffer[ke],P,E,s.COLOR_ATTACHMENT0,Te,ke);else Se(q.__webglFramebuffer,P,E,s.COLOR_ATTACHMENT0,Te,0);y(E)&&_(Te),n.unbindTexture()}P.depthBuffer&&pt(P)}function Ct(P){const E=P.textures;for(let q=0,ce=E.length;q<ce;q++){const me=E[q];if(y(me)){const se=F(P),Ke=r.get(me).__webglTexture;n.bindTexture(se,Ke),_(se),n.unbindTexture()}}}const ct=[],nt=[];function Ve(P){if(P.samples>0){if(Ge(P)===!1){const E=P.textures,q=P.width,ce=P.height;let me=s.COLOR_BUFFER_BIT;const se=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ke=r.get(P),Te=E.length>1;if(Te)for(let $e=0;$e<E.length;$e++)n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer);const ke=P.texture.mipmaps;ke&&ke.length>0?n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer[0]):n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer);for(let $e=0;$e<E.length;$e++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(me|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(me|=s.STENCIL_BUFFER_BIT)),Te){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[$e]);const Me=r.get(E[$e]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Me,0)}s.blitFramebuffer(0,0,q,ce,0,0,q,ce,me,s.NEAREST),h===!0&&(ct.length=0,nt.length=0,ct.push(s.COLOR_ATTACHMENT0+$e),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ct.push(se),nt.push(se),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,nt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ct))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Te)for(let $e=0;$e<E.length;$e++){n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[$e]);const Me=r.get(E[$e]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+$e,s.TEXTURE_2D,Me,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&h){const E=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function Lt(P){return Math.min(a.maxSamples,P.samples)}function Ge(P){const E=r.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function lt(P){const E=c.render.frame;g.get(P)!==E&&(g.set(P,E),P.update())}function Ot(P,E){const q=P.colorSpace,ce=P.format,me=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==Qr&&q!==Hi&&(Et.getTransfer(q)===Pt?(ce!==di||me!==Yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),E}function kt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(m.width=P.naturalWidth||P.width,m.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(m.width=P.displayWidth,m.height=P.displayHeight):(m.width=P.width,m.height=P.height),m}this.allocateTextureUnit=ie,this.resetTextureUnits=Q,this.setTexture2D=ue,this.setTexture2DArray=le,this.setTexture3D=fe,this.setTextureCube=B,this.rebindTextures=$t,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ge}function wE(s,e){function n(r,a=Hi){let l;const c=Et.getTransfer(a);if(r===Yi)return s.UNSIGNED_BYTE;if(r===Qf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===$m)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Zm)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===qm)return s.BYTE;if(r===Km)return s.SHORT;if(r===Vo)return s.UNSIGNED_SHORT;if(r===Zf)return s.INT;if(r===Zr)return s.UNSIGNED_INT;if(r===Vi)return s.FLOAT;if(r===Ei)return s.HALF_FLOAT;if(r===Qm)return s.ALPHA;if(r===Jm)return s.RGB;if(r===di)return s.RGBA;if(r===Wo)return s.DEPTH_COMPONENT;if(r===Xo)return s.DEPTH_STENCIL;if(r===eg)return s.RED;if(r===ed)return s.RED_INTEGER;if(r===tg)return s.RG;if(r===td)return s.RG_INTEGER;if(r===nd)return s.RGBA_INTEGER;if(r===Dl||r===Ll||r===Ul||r===Il)if(c===Pt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Dl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ul)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Il)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Dl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ul)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Il)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===vf||r===xf||r===yf||r===Sf)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===vf)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===xf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===yf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Sf)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Mf||r===Ef||r===Tf)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Mf||r===Ef)return c===Pt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Tf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===wf||r===Af||r===Rf||r===Cf||r===bf||r===Pf||r===Df||r===Lf||r===Uf||r===If||r===Nf||r===Ff||r===Of||r===kf)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===wf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Af)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Rf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Cf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===bf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Pf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Df)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Lf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===If)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Nf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ff)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Of)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===kf)return c===Pt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Bf||r===zf||r===Hf)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Bf)return c===Pt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===zf)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Hf)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Vf||r===Gf||r===Wf||r===Xf)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Vf)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Gf)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wf)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Xf)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Go?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}const AE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RE=`
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

}`;class CE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const r=new gg(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new An({vertexShader:AE,fragmentShader:RE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new hi(new Gl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bE extends es{constructor(e,n){super();const r=this;let a=null,l=1,c=null,d="local-floor",h=1,m=null,g=null,v=null,x=null,S=null,w=null;const A=typeof XRWebGLBinding<"u",y=new CE,_={},F=n.getContextAttributes();let N=null,b=null;const z=[],k=[],L=new st;let j=null;const R=new Jn;R.viewport=new Yt;const C=new Jn;C.viewport=new Yt;const V=[R,C],Q=new q0;let ie=null,de=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ae=z[J];return ae===void 0&&(ae=new qc,z[J]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(J){let ae=z[J];return ae===void 0&&(ae=new qc,z[J]=ae),ae.getGripSpace()},this.getHand=function(J){let ae=z[J];return ae===void 0&&(ae=new qc,z[J]=ae),ae.getHandSpace()};function ue(J){const ae=k.indexOf(J.inputSource);if(ae===-1)return;const Se=z[ae];Se!==void 0&&(Se.update(J.inputSource,J.frame,m||c),Se.dispatchEvent({type:J.type,data:J.inputSource}))}function le(){a.removeEventListener("select",ue),a.removeEventListener("selectstart",ue),a.removeEventListener("selectend",ue),a.removeEventListener("squeeze",ue),a.removeEventListener("squeezestart",ue),a.removeEventListener("squeezeend",ue),a.removeEventListener("end",le),a.removeEventListener("inputsourceschange",fe);for(let J=0;J<z.length;J++){const ae=k[J];ae!==null&&(k[J]=null,z[J].disconnect(ae))}ie=null,de=null,y.reset();for(const J in _)delete _[J];e.setRenderTarget(N),S=null,x=null,v=null,a=null,b=null,He.stop(),r.isPresenting=!1,e.setPixelRatio(j),e.setSize(L.width,L.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){l=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){d=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||c},this.setReferenceSpace=function(J){m=J},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return v===null&&A&&(v=new XRWebGLBinding(a,n)),v},this.getFrame=function(){return w},this.getSession=function(){return a},this.setSession=async function(J){if(a=J,a!==null){if(N=e.getRenderTarget(),a.addEventListener("select",ue),a.addEventListener("selectstart",ue),a.addEventListener("selectend",ue),a.addEventListener("squeeze",ue),a.addEventListener("squeezestart",ue),a.addEventListener("squeezeend",ue),a.addEventListener("end",le),a.addEventListener("inputsourceschange",fe),F.xrCompatible!==!0&&await n.makeXRCompatible(),j=e.getPixelRatio(),e.getSize(L),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Pe=null,Ne=null;F.depth&&(Ne=F.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Se=F.stencil?Xo:Wo,Pe=F.stencil?Go:Zr);const pt={colorFormat:n.RGBA8,depthFormat:Ne,scaleFactor:l};v=this.getBinding(),x=v.createProjectionLayer(pt),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),b=new ei(x.textureWidth,x.textureHeight,{format:di,type:Yi,depthTexture:new mg(x.textureWidth,x.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:F.stencil,colorSpace:e.outputColorSpace,samples:F.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const Se={antialias:F.antialias,alpha:!0,depth:F.depth,stencil:F.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,n,Se),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),b=new ei(S.framebufferWidth,S.framebufferHeight,{format:di,type:Yi,colorSpace:e.outputColorSpace,stencilBuffer:F.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(h),m=null,c=await a.requestReferenceSpace(d),He.setContext(a),He.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function fe(J){for(let ae=0;ae<J.removed.length;ae++){const Se=J.removed[ae],Pe=k.indexOf(Se);Pe>=0&&(k[Pe]=null,z[Pe].disconnect(Se))}for(let ae=0;ae<J.added.length;ae++){const Se=J.added[ae];let Pe=k.indexOf(Se);if(Pe===-1){for(let pt=0;pt<z.length;pt++)if(pt>=k.length){k.push(Se),Pe=pt;break}else if(k[pt]===null){k[pt]=Se,Pe=pt;break}if(Pe===-1)break}const Ne=z[Pe];Ne&&Ne.connect(Se)}}const B=new K,oe=new K;function re(J,ae,Se){B.setFromMatrixPosition(ae.matrixWorld),oe.setFromMatrixPosition(Se.matrixWorld);const Pe=B.distanceTo(oe),Ne=ae.projectionMatrix.elements,pt=Se.projectionMatrix.elements,$t=Ne[14]/(Ne[10]-1),I=Ne[14]/(Ne[10]+1),Ct=(Ne[9]+1)/Ne[5],ct=(Ne[9]-1)/Ne[5],nt=(Ne[8]-1)/Ne[0],Ve=(pt[8]+1)/pt[0],Lt=$t*nt,Ge=$t*Ve,lt=Pe/(-nt+Ve),Ot=lt*-nt;if(ae.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ot),J.translateZ(lt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ne[10]===-1)J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const kt=$t+lt,P=I+lt,E=Lt-Ot,q=Ge+(Pe-Ot),ce=Ct*I/P*kt,me=ct*I/P*kt;J.projectionMatrix.makePerspective(E,q,ce,me,kt,P),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function U(J,ae){ae===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ae.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(a===null)return;let ae=J.near,Se=J.far;y.texture!==null&&(y.depthNear>0&&(ae=y.depthNear),y.depthFar>0&&(Se=y.depthFar)),Q.near=C.near=R.near=ae,Q.far=C.far=R.far=Se,(ie!==Q.near||de!==Q.far)&&(a.updateRenderState({depthNear:Q.near,depthFar:Q.far}),ie=Q.near,de=Q.far),Q.layers.mask=J.layers.mask|6,R.layers.mask=Q.layers.mask&3,C.layers.mask=Q.layers.mask&5;const Pe=J.parent,Ne=Q.cameras;U(Q,Pe);for(let pt=0;pt<Ne.length;pt++)U(Ne[pt],Pe);Ne.length===2?re(Q,R,C):Q.projectionMatrix.copy(R.projectionMatrix),ne(J,Q,Pe)};function ne(J,ae,Se){Se===null?J.matrix.copy(ae.matrixWorld):(J.matrix.copy(Se.matrixWorld),J.matrix.invert(),J.matrix.multiply(ae.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=jo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return Q},this.getFoveation=function(){if(!(x===null&&S===null))return h},this.setFoveation=function(J){h=J,x!==null&&(x.fixedFoveation=J),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(Q)},this.getCameraTexture=function(J){return _[J]};let Fe=null;function Xe(J,ae){if(g=ae.getViewerPose(m||c),w=ae,g!==null){const Se=g.views;S!==null&&(e.setRenderTargetFramebuffer(b,S.framebuffer),e.setRenderTarget(b));let Pe=!1;Se.length!==Q.cameras.length&&(Q.cameras.length=0,Pe=!0);for(let I=0;I<Se.length;I++){const Ct=Se[I];let ct=null;if(S!==null)ct=S.getViewport(Ct);else{const Ve=v.getViewSubImage(x,Ct);ct=Ve.viewport,I===0&&(e.setRenderTargetTextures(b,Ve.colorTexture,Ve.depthStencilTexture),e.setRenderTarget(b))}let nt=V[I];nt===void 0&&(nt=new Jn,nt.layers.enable(I),nt.viewport=new Yt,V[I]=nt),nt.matrix.fromArray(Ct.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(Ct.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(ct.x,ct.y,ct.width,ct.height),I===0&&(Q.matrix.copy(nt.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),Pe===!0&&Q.cameras.push(nt)}const Ne=a.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&A){v=r.getBinding();const I=v.getDepthInformation(Se[0]);I&&I.isValid&&I.texture&&y.init(I,a.renderState)}if(Ne&&Ne.includes("camera-access")&&A){e.state.unbindTexture(),v=r.getBinding();for(let I=0;I<Se.length;I++){const Ct=Se[I].camera;if(Ct){let ct=_[Ct];ct||(ct=new gg,_[Ct]=ct);const nt=v.getCameraImage(Ct);ct.sourceTexture=nt}}}}for(let Se=0;Se<z.length;Se++){const Pe=k[Se],Ne=z[Se];Pe!==null&&Ne!==void 0&&Ne.update(Pe,ae,m||c)}Fe&&Fe(J,ae),ae.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ae}),w=null}const He=new vg;He.setAnimationLoop(Xe),this.setAnimationLoop=function(J){Fe=J},this.dispose=function(){}}}const Wr=new qi,PE=new tn;function DE(s,e){function n(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function r(y,_){_.color.getRGB(y.fogColor.value,fg(s)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function a(y,_,F,N,b){_.isMeshBasicMaterial||_.isMeshLambertMaterial?l(y,_):_.isMeshToonMaterial?(l(y,_),v(y,_)):_.isMeshPhongMaterial?(l(y,_),g(y,_)):_.isMeshStandardMaterial?(l(y,_),x(y,_),_.isMeshPhysicalMaterial&&S(y,_,b)):_.isMeshMatcapMaterial?(l(y,_),w(y,_)):_.isMeshDepthMaterial?l(y,_):_.isMeshDistanceMaterial?(l(y,_),A(y,_)):_.isMeshNormalMaterial?l(y,_):_.isLineBasicMaterial?(c(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?h(y,_,F,N):_.isSpriteMaterial?m(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function l(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,n(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,n(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,n(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===In&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,n(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===In&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,n(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,n(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,n(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const F=e.get(_),N=F.envMap,b=F.envMapRotation;N&&(y.envMap.value=N,Wr.copy(b),Wr.x*=-1,Wr.y*=-1,Wr.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Wr.y*=-1,Wr.z*=-1),y.envMapRotation.value.setFromMatrix4(PE.makeRotationFromEuler(Wr)),y.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,n(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,n(_.aoMap,y.aoMapTransform))}function c(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,n(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function h(y,_,F,N){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*F,y.scale.value=N*.5,_.map&&(y.map.value=_.map,n(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,n(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function m(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,n(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,n(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function g(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function v(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,n(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,n(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function S(y,_,F){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,n(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,n(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,n(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,n(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,n(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===In&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,n(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,n(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=F.texture,y.transmissionSamplerSize.value.set(F.width,F.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,n(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,n(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,n(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,n(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,n(_.specularIntensityMap,y.specularIntensityMapTransform))}function w(y,_){_.matcap&&(y.matcap.value=_.matcap)}function A(y,_){const F=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(F.matrixWorld),y.nearDistance.value=F.shadow.camera.near,y.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function LE(s,e,n,r){let a={},l={},c=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(F,N){const b=N.program;r.uniformBlockBinding(F,b)}function m(F,N){let b=a[F.id];b===void 0&&(w(F),b=g(F),a[F.id]=b,F.addEventListener("dispose",y));const z=N.program;r.updateUBOMapping(F,z);const k=e.render.frame;l[F.id]!==k&&(x(F),l[F.id]=k)}function g(F){const N=v();F.__bindingPointIndex=N;const b=s.createBuffer(),z=F.__size,k=F.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,z,k),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,N,b),b}function v(){for(let F=0;F<d;F++)if(c.indexOf(F)===-1)return c.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(F){const N=a[F.id],b=F.uniforms,z=F.__cache;s.bindBuffer(s.UNIFORM_BUFFER,N);for(let k=0,L=b.length;k<L;k++){const j=Array.isArray(b[k])?b[k]:[b[k]];for(let R=0,C=j.length;R<C;R++){const V=j[R];if(S(V,k,R,z)===!0){const Q=V.__offset,ie=Array.isArray(V.value)?V.value:[V.value];let de=0;for(let ue=0;ue<ie.length;ue++){const le=ie[ue],fe=A(le);typeof le=="number"||typeof le=="boolean"?(V.__data[0]=le,s.bufferSubData(s.UNIFORM_BUFFER,Q+de,V.__data)):le.isMatrix3?(V.__data[0]=le.elements[0],V.__data[1]=le.elements[1],V.__data[2]=le.elements[2],V.__data[3]=0,V.__data[4]=le.elements[3],V.__data[5]=le.elements[4],V.__data[6]=le.elements[5],V.__data[7]=0,V.__data[8]=le.elements[6],V.__data[9]=le.elements[7],V.__data[10]=le.elements[8],V.__data[11]=0):(le.toArray(V.__data,de),de+=fe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,Q,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(F,N,b,z){const k=F.value,L=N+"_"+b;if(z[L]===void 0)return typeof k=="number"||typeof k=="boolean"?z[L]=k:z[L]=k.clone(),!0;{const j=z[L];if(typeof k=="number"||typeof k=="boolean"){if(j!==k)return z[L]=k,!0}else if(j.equals(k)===!1)return j.copy(k),!0}return!1}function w(F){const N=F.uniforms;let b=0;const z=16;for(let L=0,j=N.length;L<j;L++){const R=Array.isArray(N[L])?N[L]:[N[L]];for(let C=0,V=R.length;C<V;C++){const Q=R[C],ie=Array.isArray(Q.value)?Q.value:[Q.value];for(let de=0,ue=ie.length;de<ue;de++){const le=ie[de],fe=A(le),B=b%z,oe=B%fe.boundary,re=B+oe;b+=oe,re!==0&&z-re<fe.storage&&(b+=z-re),Q.__data=new Float32Array(fe.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=b,b+=fe.storage}}}const k=b%z;return k>0&&(b+=z-k),F.__size=b,F.__cache={},this}function A(F){const N={boundary:0,storage:0};return typeof F=="number"||typeof F=="boolean"?(N.boundary=4,N.storage=4):F.isVector2?(N.boundary=8,N.storage=8):F.isVector3||F.isColor?(N.boundary=16,N.storage=12):F.isVector4?(N.boundary=16,N.storage=16):F.isMatrix3?(N.boundary=48,N.storage=48):F.isMatrix4?(N.boundary=64,N.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),N}function y(F){const N=F.target;N.removeEventListener("dispose",y);const b=c.indexOf(N.__bindingPointIndex);c.splice(b,1),s.deleteBuffer(a[N.id]),delete a[N.id],delete l[N.id]}function _(){for(const F in a)s.deleteBuffer(a[F]);c=[],a={},l={}}return{bind:h,update:m,dispose:_}}class UE{constructor(e={}){const{canvas:n=_0(),context:r=null,depth:a=!0,stencil:l=!1,alpha:c=!1,antialias:d=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=c;const w=new Uint32Array(4),A=new Int32Array(4);let y=null,_=null;const F=[],N=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let z=!1;this._outputColorSpace=Qn;let k=0,L=0,j=null,R=-1,C=null;const V=new Yt,Q=new Yt;let ie=null;const de=new Tt(0);let ue=0,le=n.width,fe=n.height,B=1,oe=null,re=null;const U=new Yt(0,0,le,fe),ne=new Yt(0,0,le,fe);let Fe=!1;const Xe=new pg;let He=!1,J=!1;const ae=new tn,Se=new K,Pe=new Yt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function $t(){return j===null?B:1}let I=r;function Ct(T,X){return n.getContext(T,X)}try{const T={alpha:!0,depth:a,stencil:l,antialias:d,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${$f}`),n.addEventListener("webglcontextlost",we,!1),n.addEventListener("webglcontextrestored",De,!1),n.addEventListener("webglcontextcreationerror",ve,!1),I===null){const X="webgl2";if(I=Ct(X,T),I===null)throw Ct(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ct,nt,Ve,Lt,Ge,lt,Ot,kt,P,E,q,ce,me,se,Ke,Te,ke,$e,Me,be,it,Ye,Ae,ft;function H(){ct=new GS(I),ct.init(),Ye=new wE(I,ct),nt=new FS(I,ct,e,Ye),Ve=new EE(I,ct),nt.reversedDepthBuffer&&x&&Ve.buffers.depth.setReversed(!0),Lt=new jS(I),Ge=new cE,lt=new TE(I,ct,Ve,Ge,nt,Ye,Lt),Ot=new kS(b),kt=new VS(b),P=new Q0(I),Ae=new IS(I,P),E=new WS(I,P,Lt,Ae),q=new qS(I,E,P,Lt),Me=new YS(I,nt,lt),Te=new OS(Ge),ce=new uE(b,Ot,kt,ct,nt,Ae,Te),me=new DE(b,Ge),se=new dE,Ke=new vE(ct),$e=new US(b,Ot,kt,Ve,q,S,h),ke=new SE(b,q,nt),ft=new LE(I,Lt,nt,Ve),be=new NS(I,ct,Lt),it=new XS(I,ct,Lt),Lt.programs=ce.programs,b.capabilities=nt,b.extensions=ct,b.properties=Ge,b.renderLists=se,b.shadowMap=ke,b.state=Ve,b.info=Lt}H();const xe=new bE(b,I);this.xr=xe,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=ct.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ct.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(le,fe,!1))},this.getSize=function(T){return T.set(le,fe)},this.setSize=function(T,X,ee=!0){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}le=T,fe=X,n.width=Math.floor(T*B),n.height=Math.floor(X*B),ee===!0&&(n.style.width=T+"px",n.style.height=X+"px"),this.setViewport(0,0,T,X)},this.getDrawingBufferSize=function(T){return T.set(le*B,fe*B).floor()},this.setDrawingBufferSize=function(T,X,ee){le=T,fe=X,B=ee,n.width=Math.floor(T*ee),n.height=Math.floor(X*ee),this.setViewport(0,0,T,X)},this.getCurrentViewport=function(T){return T.copy(V)},this.getViewport=function(T){return T.copy(U)},this.setViewport=function(T,X,ee,te){T.isVector4?U.set(T.x,T.y,T.z,T.w):U.set(T,X,ee,te),Ve.viewport(V.copy(U).multiplyScalar(B).round())},this.getScissor=function(T){return T.copy(ne)},this.setScissor=function(T,X,ee,te){T.isVector4?ne.set(T.x,T.y,T.z,T.w):ne.set(T,X,ee,te),Ve.scissor(Q.copy(ne).multiplyScalar(B).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(T){Ve.setScissorTest(Fe=T)},this.setOpaqueSort=function(T){oe=T},this.setTransparentSort=function(T){re=T},this.getClearColor=function(T){return T.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(T=!0,X=!0,ee=!0){let te=0;if(T){let W=!1;if(j!==null){const ye=j.texture.format;W=ye===nd||ye===td||ye===ed}if(W){const ye=j.texture.type,Re=ye===Yi||ye===Zr||ye===Vo||ye===Go||ye===Qf||ye===Jf,Be=$e.getClearColor(),Le=$e.getClearAlpha(),tt=Be.r,rt=Be.g,Ze=Be.b;Re?(w[0]=tt,w[1]=rt,w[2]=Ze,w[3]=Le,I.clearBufferuiv(I.COLOR,0,w)):(A[0]=tt,A[1]=rt,A[2]=Ze,A[3]=Le,I.clearBufferiv(I.COLOR,0,A))}else te|=I.COLOR_BUFFER_BIT}X&&(te|=I.DEPTH_BUFFER_BIT),ee&&(te|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",we,!1),n.removeEventListener("webglcontextrestored",De,!1),n.removeEventListener("webglcontextcreationerror",ve,!1),$e.dispose(),se.dispose(),Ke.dispose(),Ge.dispose(),Ot.dispose(),kt.dispose(),q.dispose(),Ae.dispose(),ft.dispose(),ce.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",fn),xe.removeEventListener("sessionend",ts),Fn.stop()};function we(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),z=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),z=!1;const T=Lt.autoReset,X=ke.enabled,ee=ke.autoUpdate,te=ke.needsUpdate,W=ke.type;H(),Lt.autoReset=T,ke.enabled=X,ke.autoUpdate=ee,ke.needsUpdate=te,ke.type=W}function ve(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function he(T){const X=T.target;X.removeEventListener("dispose",he),We(X)}function We(T){ut(T),Ge.remove(T)}function ut(T){const X=Ge.get(T).programs;X!==void 0&&(X.forEach(function(ee){ce.releaseProgram(ee)}),T.isShaderMaterial&&ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,X,ee,te,W,ye){X===null&&(X=Ne);const Re=W.isMesh&&W.matrixWorld.determinant()<0,Be=wi(T,X,ee,te,W);Ve.setMaterial(te,Re);let Le=ee.index,tt=1;if(te.wireframe===!0){if(Le=E.getWireframeAttribute(ee),Le===void 0)return;tt=2}const rt=ee.drawRange,Ze=ee.attributes.position;let ot=rt.start*tt,wt=(rt.start+rt.count)*tt;ye!==null&&(ot=Math.max(ot,ye.start*tt),wt=Math.min(wt,(ye.start+ye.count)*tt)),Le!==null?(ot=Math.max(ot,0),wt=Math.min(wt,Le.count)):Ze!=null&&(ot=Math.max(ot,0),wt=Math.min(wt,Ze.count));const yt=wt-ot;if(yt<0||yt===1/0)return;Ae.setup(W,te,Be,ee,Le);let Ut,Rt=be;if(Le!==null&&(Ut=P.get(Le),Rt=it,Rt.setIndex(Ut)),W.isMesh)te.wireframe===!0?(Ve.setLineWidth(te.wireframeLinewidth*$t()),Rt.setMode(I.LINES)):Rt.setMode(I.TRIANGLES);else if(W.isLine){let Qe=te.linewidth;Qe===void 0&&(Qe=1),Ve.setLineWidth(Qe*$t()),W.isLineSegments?Rt.setMode(I.LINES):W.isLineLoop?Rt.setMode(I.LINE_LOOP):Rt.setMode(I.LINE_STRIP)}else W.isPoints?Rt.setMode(I.POINTS):W.isSprite&&Rt.setMode(I.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Yo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Rt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ct.get("WEBGL_multi_draw"))Rt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Qe=W._multiDrawStarts,bt=W._multiDrawCounts,_t=W._multiDrawCount,Zt=Le?P.get(Le).bytesPerElement:1,ti=Ge.get(te).currentProgram.getUniforms();for(let yn=0;yn<_t;yn++)ti.setValue(I,"_gl_DrawID",yn),Rt.render(Qe[yn]/Zt,bt[yn])}else if(W.isInstancedMesh)Rt.renderInstances(ot,yt,W.count);else if(ee.isInstancedBufferGeometry){const Qe=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,bt=Math.min(ee.instanceCount,Qe);Rt.renderInstances(ot,yt,bt)}else Rt.render(ot,yt)};function At(T,X,ee){T.transparent===!0&&T.side===zi&&T.forceSinglePass===!1?(T.side=In,T.needsUpdate=!0,is(T,X,ee),T.side=Er,T.needsUpdate=!0,is(T,X,ee),T.side=zi):is(T,X,ee)}this.compile=function(T,X,ee=null){ee===null&&(ee=T),_=Ke.get(ee),_.init(X),N.push(_),ee.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(_.pushLight(W),W.castShadow&&_.pushShadow(W))}),T!==ee&&T.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(_.pushLight(W),W.castShadow&&_.pushShadow(W))}),_.setupLights();const te=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ye=W.material;if(ye)if(Array.isArray(ye))for(let Re=0;Re<ye.length;Re++){const Be=ye[Re];At(Be,ee,W),te.add(Be)}else At(ye,ee,W),te.add(ye)}),_=N.pop(),te},this.compileAsync=function(T,X,ee=null){const te=this.compile(T,X,ee);return new Promise(W=>{function ye(){if(te.forEach(function(Re){Ge.get(Re).currentProgram.isReady()&&te.delete(Re)}),te.size===0){W(T);return}setTimeout(ye,10)}ct.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let xt=null;function Wn(T){xt&&xt(T)}function fn(){Fn.stop()}function ts(){Fn.start()}const Fn=new vg;Fn.setAnimationLoop(Wn),typeof self<"u"&&Fn.setContext(self),this.setAnimationLoop=function(T){xt=T,xe.setAnimationLoop(T),T===null?Fn.stop():Fn.start()},xe.addEventListener("sessionstart",fn),xe.addEventListener("sessionend",ts),this.render=function(T,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(X),X=xe.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,X,j),_=Ke.get(T,N.length),_.init(X),N.push(_),ae.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Xe.setFromProjectionMatrix(ae,Mi,X.reversedDepth),J=this.localClippingEnabled,He=Te.init(this.clippingPlanes,J),y=se.get(T,F.length),y.init(),F.push(y),xe.enabled===!0&&xe.isPresenting===!0){const ye=b.xr.getDepthSensingMesh();ye!==null&&eo(ye,X,-1/0,b.sortObjects)}eo(T,X,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(oe,re),pt=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,pt&&$e.addToRenderList(y,T),this.info.render.frame++,He===!0&&Te.beginShadows();const ee=_.state.shadowsArray;ke.render(ee,T,X),He===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=y.opaque,W=y.transmissive;if(_.setupLights(),X.isArrayCamera){const ye=X.cameras;if(W.length>0)for(let Re=0,Be=ye.length;Re<Be;Re++){const Le=ye[Re];Tr(te,W,T,Le)}pt&&$e.render(T);for(let Re=0,Be=ye.length;Re<Be;Re++){const Le=ye[Re];$i(y,T,Le,Le.viewport)}}else W.length>0&&Tr(te,W,T,X),pt&&$e.render(T),$i(y,T,X);j!==null&&L===0&&(lt.updateMultisampleRenderTarget(j),lt.updateRenderTargetMipmap(j)),T.isScene===!0&&T.onAfterRender(b,T,X),Ae.resetDefaultState(),R=-1,C=null,N.pop(),N.length>0?(_=N[N.length-1],He===!0&&Te.setGlobalState(b.clippingPlanes,_.state.camera)):_=null,F.pop(),F.length>0?y=F[F.length-1]:y=null};function eo(T,X,ee,te){if(T.visible===!1)return;if(T.layers.test(X.layers)){if(T.isGroup)ee=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(X);else if(T.isLight)_.pushLight(T),T.castShadow&&_.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Xe.intersectsSprite(T)){te&&Pe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ae);const Re=q.update(T),Be=T.material;Be.visible&&y.push(T,Re,Be,ee,Pe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Xe.intersectsObject(T))){const Re=q.update(T),Be=T.material;if(te&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Pe.copy(T.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Pe.copy(Re.boundingSphere.center)),Pe.applyMatrix4(T.matrixWorld).applyMatrix4(ae)),Array.isArray(Be)){const Le=Re.groups;for(let tt=0,rt=Le.length;tt<rt;tt++){const Ze=Le[tt],ot=Be[Ze.materialIndex];ot&&ot.visible&&y.push(T,Re,ot,ee,Pe.z,Ze)}}else Be.visible&&y.push(T,Re,Be,ee,Pe.z,null)}}const ye=T.children;for(let Re=0,Be=ye.length;Re<Be;Re++)eo(ye[Re],X,ee,te)}function $i(T,X,ee,te){const W=T.opaque,ye=T.transmissive,Re=T.transparent;_.setupLightsView(ee),He===!0&&Te.setGlobalState(b.clippingPlanes,ee),te&&Ve.viewport(V.copy(te)),W.length>0&&Ti(W,X,ee),ye.length>0&&Ti(ye,X,ee),Re.length>0&&Ti(Re,X,ee),Ve.buffers.depth.setTest(!0),Ve.buffers.depth.setMask(!0),Ve.buffers.color.setMask(!0),Ve.setPolygonOffset(!1)}function Tr(T,X,ee,te){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[te.id]===void 0&&(_.state.transmissionRenderTarget[te.id]=new ei(1,1,{generateMipmaps:!0,type:ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float")?Ei:Yi,minFilter:Kr,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace}));const ye=_.state.transmissionRenderTarget[te.id],Re=te.viewport||V;ye.setSize(Re.z*b.transmissionResolutionScale,Re.w*b.transmissionResolutionScale);const Be=b.getRenderTarget(),Le=b.getActiveCubeFace(),tt=b.getActiveMipmapLevel();b.setRenderTarget(ye),b.getClearColor(de),ue=b.getClearAlpha(),ue<1&&b.setClearColor(16777215,.5),b.clear(),pt&&$e.render(ee);const rt=b.toneMapping;b.toneMapping=Wi;const Ze=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),_.setupLightsView(te),He===!0&&Te.setGlobalState(b.clippingPlanes,te),Ti(T,ee,te),lt.updateMultisampleRenderTarget(ye),lt.updateRenderTargetMipmap(ye),ct.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let wt=0,yt=X.length;wt<yt;wt++){const Ut=X[wt],Rt=Ut.object,Qe=Ut.geometry,bt=Ut.material,_t=Ut.group;if(bt.side===zi&&Rt.layers.test(te.layers)){const Zt=bt.side;bt.side=In,bt.needsUpdate=!0,ns(Rt,ee,te,Qe,bt,_t),bt.side=Zt,bt.needsUpdate=!0,ot=!0}}ot===!0&&(lt.updateMultisampleRenderTarget(ye),lt.updateRenderTargetMipmap(ye))}b.setRenderTarget(Be,Le,tt),b.setClearColor(de,ue),Ze!==void 0&&(te.viewport=Ze),b.toneMapping=rt}function Ti(T,X,ee){const te=X.isScene===!0?X.overrideMaterial:null;for(let W=0,ye=T.length;W<ye;W++){const Re=T[W],Be=Re.object,Le=Re.geometry,tt=Re.group;let rt=Re.material;rt.allowOverride===!0&&te!==null&&(rt=te),Be.layers.test(ee.layers)&&ns(Be,X,ee,Le,rt,tt)}}function ns(T,X,ee,te,W,ye){T.onBeforeRender(b,X,ee,te,W,ye),T.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(b,X,ee,te,T,ye),W.transparent===!0&&W.side===zi&&W.forceSinglePass===!1?(W.side=In,W.needsUpdate=!0,b.renderBufferDirect(ee,X,te,W,T,ye),W.side=Er,W.needsUpdate=!0,b.renderBufferDirect(ee,X,te,W,T,ye),W.side=zi):b.renderBufferDirect(ee,X,te,W,T,ye),T.onAfterRender(b,X,ee,te,W,ye)}function is(T,X,ee){X.isScene!==!0&&(X=Ne);const te=Ge.get(T),W=_.state.lights,ye=_.state.shadowsArray,Re=W.state.version,Be=ce.getParameters(T,W.state,ye,X,ee),Le=ce.getProgramCacheKey(Be);let tt=te.programs;te.environment=T.isMeshStandardMaterial?X.environment:null,te.fog=X.fog,te.envMap=(T.isMeshStandardMaterial?kt:Ot).get(T.envMap||te.environment),te.envMapRotation=te.environment!==null&&T.envMap===null?X.environmentRotation:T.envMapRotation,tt===void 0&&(T.addEventListener("dispose",he),tt=new Map,te.programs=tt);let rt=tt.get(Le);if(rt!==void 0){if(te.currentProgram===rt&&te.lightsStateVersion===Re)return ea(T,Be),rt}else Be.uniforms=ce.getUniforms(T),T.onBeforeCompile(Be,b),rt=ce.acquireProgram(Be,Le),tt.set(Le,rt),te.uniforms=Be.uniforms;const Ze=te.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ze.clippingPlanes=Te.uniform),ea(T,Be),te.needsLights=na(T),te.lightsStateVersion=Re,te.needsLights&&(Ze.ambientLightColor.value=W.state.ambient,Ze.lightProbe.value=W.state.probe,Ze.directionalLights.value=W.state.directional,Ze.directionalLightShadows.value=W.state.directionalShadow,Ze.spotLights.value=W.state.spot,Ze.spotLightShadows.value=W.state.spotShadow,Ze.rectAreaLights.value=W.state.rectArea,Ze.ltc_1.value=W.state.rectAreaLTC1,Ze.ltc_2.value=W.state.rectAreaLTC2,Ze.pointLights.value=W.state.point,Ze.pointLightShadows.value=W.state.pointShadow,Ze.hemisphereLights.value=W.state.hemi,Ze.directionalShadowMap.value=W.state.directionalShadowMap,Ze.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ze.spotShadowMap.value=W.state.spotShadowMap,Ze.spotLightMatrix.value=W.state.spotLightMatrix,Ze.spotLightMap.value=W.state.spotLightMap,Ze.pointShadowMap.value=W.state.pointShadowMap,Ze.pointShadowMatrix.value=W.state.pointShadowMatrix),te.currentProgram=rt,te.uniformsList=null,rt}function Jo(T){if(T.uniformsList===null){const X=T.currentProgram.getUniforms();T.uniformsList=Nl.seqWithValue(X.seq,T.uniforms)}return T.uniformsList}function ea(T,X){const ee=Ge.get(T);ee.outputColorSpace=X.outputColorSpace,ee.batching=X.batching,ee.batchingColor=X.batchingColor,ee.instancing=X.instancing,ee.instancingColor=X.instancingColor,ee.instancingMorph=X.instancingMorph,ee.skinning=X.skinning,ee.morphTargets=X.morphTargets,ee.morphNormals=X.morphNormals,ee.morphColors=X.morphColors,ee.morphTargetsCount=X.morphTargetsCount,ee.numClippingPlanes=X.numClippingPlanes,ee.numIntersection=X.numClipIntersection,ee.vertexAlphas=X.vertexAlphas,ee.vertexTangents=X.vertexTangents,ee.toneMapping=X.toneMapping}function wi(T,X,ee,te,W){X.isScene!==!0&&(X=Ne),lt.resetTextureUnits();const ye=X.fog,Re=te.isMeshStandardMaterial?X.environment:null,Be=j===null?b.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Qr,Le=(te.isMeshStandardMaterial?kt:Ot).get(te.envMap||Re),tt=te.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,rt=!!ee.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Ze=!!ee.morphAttributes.position,ot=!!ee.morphAttributes.normal,wt=!!ee.morphAttributes.color;let yt=Wi;te.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(yt=b.toneMapping);const Ut=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Rt=Ut!==void 0?Ut.length:0,Qe=Ge.get(te),bt=_.state.lights;if(He===!0&&(J===!0||T!==C)){const Xt=T===C&&te.id===R;Te.setState(te,T,Xt)}let _t=!1;te.version===Qe.__version?(Qe.needsLights&&Qe.lightsStateVersion!==bt.state.version||Qe.outputColorSpace!==Be||W.isBatchedMesh&&Qe.batching===!1||!W.isBatchedMesh&&Qe.batching===!0||W.isBatchedMesh&&Qe.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Qe.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Qe.instancing===!1||!W.isInstancedMesh&&Qe.instancing===!0||W.isSkinnedMesh&&Qe.skinning===!1||!W.isSkinnedMesh&&Qe.skinning===!0||W.isInstancedMesh&&Qe.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Qe.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Qe.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Qe.instancingMorph===!1&&W.morphTexture!==null||Qe.envMap!==Le||te.fog===!0&&Qe.fog!==ye||Qe.numClippingPlanes!==void 0&&(Qe.numClippingPlanes!==Te.numPlanes||Qe.numIntersection!==Te.numIntersection)||Qe.vertexAlphas!==tt||Qe.vertexTangents!==rt||Qe.morphTargets!==Ze||Qe.morphNormals!==ot||Qe.morphColors!==wt||Qe.toneMapping!==yt||Qe.morphTargetsCount!==Rt)&&(_t=!0):(_t=!0,Qe.__version=te.version);let Zt=Qe.currentProgram;_t===!0&&(Zt=is(te,X,W));let ti=!1,yn=!1,wr=!1;const It=Zt.getUniforms(),Sn=Qe.uniforms;if(Ve.useProgram(Zt.program)&&(ti=!0,yn=!0,wr=!0),te.id!==R&&(R=te.id,yn=!0),ti||C!==T){Ve.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),It.setValue(I,"projectionMatrix",T.projectionMatrix),It.setValue(I,"viewMatrix",T.matrixWorldInverse);const hn=It.map.cameraPosition;hn!==void 0&&hn.setValue(I,Se.setFromMatrixPosition(T.matrixWorld)),nt.logarithmicDepthBuffer&&It.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&It.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),C!==T&&(C=T,yn=!0,wr=!0)}if(W.isSkinnedMesh){It.setOptional(I,W,"bindMatrix"),It.setOptional(I,W,"bindMatrixInverse");const Xt=W.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),It.setValue(I,"boneTexture",Xt.boneTexture,lt))}W.isBatchedMesh&&(It.setOptional(I,W,"batchingTexture"),It.setValue(I,"batchingTexture",W._matricesTexture,lt),It.setOptional(I,W,"batchingIdTexture"),It.setValue(I,"batchingIdTexture",W._indirectTexture,lt),It.setOptional(I,W,"batchingColorTexture"),W._colorsTexture!==null&&It.setValue(I,"batchingColorTexture",W._colorsTexture,lt));const dn=ee.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&Me.update(W,ee,Zt),(yn||Qe.receiveShadow!==W.receiveShadow)&&(Qe.receiveShadow=W.receiveShadow,It.setValue(I,"receiveShadow",W.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Sn.envMap.value=Le,Sn.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&X.environment!==null&&(Sn.envMapIntensity.value=X.environmentIntensity),yn&&(It.setValue(I,"toneMappingExposure",b.toneMappingExposure),Qe.needsLights&&ta(Sn,wr),ye&&te.fog===!0&&me.refreshFogUniforms(Sn,ye),me.refreshMaterialUniforms(Sn,te,B,fe,_.state.transmissionRenderTarget[T.id]),Nl.upload(I,Jo(Qe),Sn,lt)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Nl.upload(I,Jo(Qe),Sn,lt),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&It.setValue(I,"center",W.center),It.setValue(I,"modelViewMatrix",W.modelViewMatrix),It.setValue(I,"normalMatrix",W.normalMatrix),It.setValue(I,"modelMatrix",W.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const Xt=te.uniformsGroups;for(let hn=0,Ar=Xt.length;hn<Ar;hn++){const vt=Xt[hn];ft.update(vt,Zt),ft.bind(vt,Zt)}}return Zt}function ta(T,X){T.ambientLightColor.needsUpdate=X,T.lightProbe.needsUpdate=X,T.directionalLights.needsUpdate=X,T.directionalLightShadows.needsUpdate=X,T.pointLights.needsUpdate=X,T.pointLightShadows.needsUpdate=X,T.spotLights.needsUpdate=X,T.spotLightShadows.needsUpdate=X,T.rectAreaLights.needsUpdate=X,T.hemisphereLights.needsUpdate=X}function na(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(T,X,ee){const te=Ge.get(T);te.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),Ge.get(T.texture).__webglTexture=X,Ge.get(T.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:ee,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,X){const ee=Ge.get(T);ee.__webglFramebuffer=X,ee.__useDefaultFramebuffer=X===void 0};const Xl=I.createFramebuffer();this.setRenderTarget=function(T,X=0,ee=0){j=T,k=X,L=ee;let te=!0,W=null,ye=!1,Re=!1;if(T){const Le=Ge.get(T);if(Le.__useDefaultFramebuffer!==void 0)Ve.bindFramebuffer(I.FRAMEBUFFER,null),te=!1;else if(Le.__webglFramebuffer===void 0)lt.setupRenderTarget(T);else if(Le.__hasExternalTextures)lt.rebindTextures(T,Ge.get(T.texture).__webglTexture,Ge.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ze=T.depthTexture;if(Le.__boundDepthTexture!==Ze){if(Ze!==null&&Ge.has(Ze)&&(T.width!==Ze.image.width||T.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");lt.setupDepthRenderbuffer(T)}}const tt=T.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(Re=!0);const rt=Ge.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(rt[X])?W=rt[X][ee]:W=rt[X],ye=!0):T.samples>0&&lt.useMultisampledRTT(T)===!1?W=Ge.get(T).__webglMultisampledFramebuffer:Array.isArray(rt)?W=rt[ee]:W=rt,V.copy(T.viewport),Q.copy(T.scissor),ie=T.scissorTest}else V.copy(U).multiplyScalar(B).floor(),Q.copy(ne).multiplyScalar(B).floor(),ie=Fe;if(ee!==0&&(W=Xl),Ve.bindFramebuffer(I.FRAMEBUFFER,W)&&te&&Ve.drawBuffers(T,W),Ve.viewport(V),Ve.scissor(Q),Ve.setScissorTest(ie),ye){const Le=Ge.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+X,Le.__webglTexture,ee)}else if(Re){const Le=X;for(let tt=0;tt<T.textures.length;tt++){const rt=Ge.get(T.textures[tt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+tt,rt.__webglTexture,ee,Le)}}else if(T!==null&&ee!==0){const Le=Ge.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Le.__webglTexture,ee)}R=-1},this.readRenderTargetPixels=function(T,X,ee,te,W,ye,Re,Be=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Ge.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Re!==void 0&&(Le=Le[Re]),Le){Ve.bindFramebuffer(I.FRAMEBUFFER,Le);try{const tt=T.textures[Be],rt=tt.format,Ze=tt.type;if(!nt.textureFormatReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=T.width-te&&ee>=0&&ee<=T.height-W&&(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Be),I.readPixels(X,ee,te,W,Ye.convert(rt),Ye.convert(Ze),ye))}finally{const tt=j!==null?Ge.get(j).__webglFramebuffer:null;Ve.bindFramebuffer(I.FRAMEBUFFER,tt)}}},this.readRenderTargetPixelsAsync=async function(T,X,ee,te,W,ye,Re,Be=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Ge.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Re!==void 0&&(Le=Le[Re]),Le)if(X>=0&&X<=T.width-te&&ee>=0&&ee<=T.height-W){Ve.bindFramebuffer(I.FRAMEBUFFER,Le);const tt=T.textures[Be],rt=tt.format,Ze=tt.type;if(!nt.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ot),I.bufferData(I.PIXEL_PACK_BUFFER,ye.byteLength,I.STREAM_READ),T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Be),I.readPixels(X,ee,te,W,Ye.convert(rt),Ye.convert(Ze),0);const wt=j!==null?Ge.get(j).__webglFramebuffer:null;Ve.bindFramebuffer(I.FRAMEBUFFER,wt);const yt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await v0(I,yt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ot),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ye),I.deleteBuffer(ot),I.deleteSync(yt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,X=null,ee=0){const te=Math.pow(2,-ee),W=Math.floor(T.image.width*te),ye=Math.floor(T.image.height*te),Re=X!==null?X.x:0,Be=X!==null?X.y:0;lt.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,ee,0,0,Re,Be,W,ye),Ve.unbindTexture()};const ia=I.createFramebuffer(),ra=I.createFramebuffer();this.copyTextureToTexture=function(T,X,ee=null,te=null,W=0,ye=null){ye===null&&(W!==0?(Yo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ye=W,W=0):ye=0);let Re,Be,Le,tt,rt,Ze,ot,wt,yt;const Ut=T.isCompressedTexture?T.mipmaps[ye]:T.image;if(ee!==null)Re=ee.max.x-ee.min.x,Be=ee.max.y-ee.min.y,Le=ee.isBox3?ee.max.z-ee.min.z:1,tt=ee.min.x,rt=ee.min.y,Ze=ee.isBox3?ee.min.z:0;else{const dn=Math.pow(2,-W);Re=Math.floor(Ut.width*dn),Be=Math.floor(Ut.height*dn),T.isDataArrayTexture?Le=Ut.depth:T.isData3DTexture?Le=Math.floor(Ut.depth*dn):Le=1,tt=0,rt=0,Ze=0}te!==null?(ot=te.x,wt=te.y,yt=te.z):(ot=0,wt=0,yt=0);const Rt=Ye.convert(X.format),Qe=Ye.convert(X.type);let bt;X.isData3DTexture?(lt.setTexture3D(X,0),bt=I.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(lt.setTexture2DArray(X,0),bt=I.TEXTURE_2D_ARRAY):(lt.setTexture2D(X,0),bt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,X.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,X.unpackAlignment);const _t=I.getParameter(I.UNPACK_ROW_LENGTH),Zt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ti=I.getParameter(I.UNPACK_SKIP_PIXELS),yn=I.getParameter(I.UNPACK_SKIP_ROWS),wr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ut.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ut.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,tt),I.pixelStorei(I.UNPACK_SKIP_ROWS,rt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);const It=T.isDataArrayTexture||T.isData3DTexture,Sn=X.isDataArrayTexture||X.isData3DTexture;if(T.isDepthTexture){const dn=Ge.get(T),Xt=Ge.get(X),hn=Ge.get(dn.__renderTarget),Ar=Ge.get(Xt.__renderTarget);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,hn.__webglFramebuffer),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ar.__webglFramebuffer);for(let vt=0;vt<Le;vt++)It&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ge.get(T).__webglTexture,W,Ze+vt),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ge.get(X).__webglTexture,ye,yt+vt)),I.blitFramebuffer(tt,rt,Re,Be,ot,wt,Re,Be,I.DEPTH_BUFFER_BIT,I.NEAREST);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(W!==0||T.isRenderTargetTexture||Ge.has(T)){const dn=Ge.get(T),Xt=Ge.get(X);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,ia),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,ra);for(let hn=0;hn<Le;hn++)It?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dn.__webglTexture,W,Ze+hn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dn.__webglTexture,W),Sn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Xt.__webglTexture,ye,yt+hn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Xt.__webglTexture,ye),W!==0?I.blitFramebuffer(tt,rt,Re,Be,ot,wt,Re,Be,I.COLOR_BUFFER_BIT,I.NEAREST):Sn?I.copyTexSubImage3D(bt,ye,ot,wt,yt+hn,tt,rt,Re,Be):I.copyTexSubImage2D(bt,ye,ot,wt,tt,rt,Re,Be);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Sn?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(bt,ye,ot,wt,yt,Re,Be,Le,Rt,Qe,Ut.data):X.isCompressedArrayTexture?I.compressedTexSubImage3D(bt,ye,ot,wt,yt,Re,Be,Le,Rt,Ut.data):I.texSubImage3D(bt,ye,ot,wt,yt,Re,Be,Le,Rt,Qe,Ut):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ye,ot,wt,Re,Be,Rt,Qe,Ut.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ye,ot,wt,Ut.width,Ut.height,Rt,Ut.data):I.texSubImage2D(I.TEXTURE_2D,ye,ot,wt,Re,Be,Rt,Qe,Ut);I.pixelStorei(I.UNPACK_ROW_LENGTH,_t),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Zt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ti),I.pixelStorei(I.UNPACK_SKIP_ROWS,yn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,wr),ye===0&&X.generateMipmaps&&I.generateMipmap(bt),Ve.unbindTexture()},this.initRenderTarget=function(T){Ge.get(T).__webglFramebuffer===void 0&&lt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?lt.setTextureCube(T,0):T.isData3DTexture?lt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?lt.setTexture2DArray(T,0):lt.setTexture2D(T,0),Ve.unbindTexture()},this.resetState=function(){k=0,L=0,j=null,Ve.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),n.unpackColorSpace=Et._getUnpackColorSpace()}}const km={type:"change"},ld={type:"start"},Eg={type:"end"},Cl=new og,Bm=new Mr,IE=Math.cos(70*ig.DEG2RAD),en=new K,Un=2*Math.PI,Dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},nf=1e-6;class NE extends $0{constructor(e,n=null){super(e,n),this.state=Dt.NONE,this.target=new K,this.cursor=new K,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:Hs.ROTATE,TWO:Hs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new K,this._lastQuaternion=new Jr,this._lastTargetPosition=new K,this._quat=new Jr().setFromUnitVectors(e.up,new K(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new dm,this._sphericalDelta=new dm,this._scale=1,this._panOffset=new K,this._rotateStart=new st,this._rotateEnd=new st,this._rotateDelta=new st,this._panStart=new st,this._panEnd=new st,this._panDelta=new st,this._dollyStart=new st,this._dollyEnd=new st,this._dollyDelta=new st,this._dollyDirection=new K,this._mouse=new st,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=OE.bind(this),this._onPointerDown=FE.bind(this),this._onPointerUp=kE.bind(this),this._onContextMenu=XE.bind(this),this._onMouseWheel=HE.bind(this),this._onKeyDown=VE.bind(this),this._onTouchStart=GE.bind(this),this._onTouchMove=WE.bind(this),this._onMouseDown=BE.bind(this),this._onMouseMove=zE.bind(this),this._interceptControlDown=jE.bind(this),this._interceptControlUp=YE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(km),this.update(),this.state=Dt.NONE}update(e=null){const n=this.object.position;en.copy(n).sub(this.target),en.applyQuaternion(this._quat),this._spherical.setFromVector3(en),this.autoRotate&&this.state===Dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(r)&&isFinite(a)&&(r<-Math.PI?r+=Un:r>Math.PI&&(r-=Un),a<-Math.PI?a+=Un:a>Math.PI&&(a-=Un),r<=a?this._spherical.theta=Math.max(r,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+a)/2?Math.max(r,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let l=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const c=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),l=c!=this._spherical.radius}if(en.setFromSpherical(this._spherical),en.applyQuaternion(this._quatInverse),n.copy(this.target).add(en),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let c=null;if(this.object.isPerspectiveCamera){const d=en.length();c=this._clampDistance(d*this._scale);const h=d-c;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),l=!!h}else if(this.object.isOrthographicCamera){const d=new K(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),l=h!==this.object.zoom;const m=new K(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),c=en.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;c!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(c).add(this.object.position):(Cl.origin.copy(this.object.position),Cl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cl.direction))<IE?this.object.lookAt(this.target):(Bm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cl.intersectPlane(Bm,this.target))))}else if(this.object.isOrthographicCamera){const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),c!==this.object.zoom&&(this.object.updateProjectionMatrix(),l=!0)}return this._scale=1,this._performCursorZoom=!1,l||this._lastPosition.distanceToSquared(this.object.position)>nf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>nf||this._lastTargetPosition.distanceToSquared(this.target)>nf?(this.dispatchEvent(km),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Un/60*this.autoRotateSpeed*e:Un/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){en.setFromMatrixColumn(n,0),en.multiplyScalar(-e),this._panOffset.add(en)}_panUp(e,n){this.screenSpacePanning===!0?en.setFromMatrixColumn(n,1):(en.setFromMatrixColumn(n,0),en.crossVectors(this.object.up,en)),en.multiplyScalar(e),this._panOffset.add(en)}_pan(e,n){const r=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;en.copy(a).sub(this.target);let l=en.length();l*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*l/r.clientHeight,this.object.matrix),this._panUp(2*n*l/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),a=e-r.left,l=n-r.top,c=r.width,d=r.height;this._mouse.x=a/c*2-1,this._mouse.y=-(l/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Un*this._rotateDelta.x/n.clientHeight),this._rotateUp(Un*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateStart.set(r,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panStart.set(r,a)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,l=Math.sqrt(r*r+a*a);this._dollyStart.set(0,l)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),a=.5*(e.pageX+r.x),l=.5*(e.pageY+r.y);this._rotateEnd.set(a,l)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Un*this._rotateDelta.x/n.clientHeight),this._rotateUp(Un*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panEnd.set(r,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,l=Math.sqrt(r*r+a*a);this._dollyEnd.set(0,l),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const c=(e.pageX+n.x)*.5,d=(e.pageY+n.y)*.5;this._updateZoomParameters(c,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new st,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function FE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function OE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function kE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Eg),this.state=Dt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function BE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Dt.DOLLY;break;case Gs.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Dt.ROTATE}break;case Gs.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Dt.PAN}break;default:this.state=Dt.NONE}this.state!==Dt.NONE&&this.dispatchEvent(ld)}function zE(s){switch(this.state){case Dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function HE(s){this.enabled===!1||this.enableZoom===!1||this.state!==Dt.NONE||(s.preventDefault(),this.dispatchEvent(ld),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Eg))}function VE(s){this.enabled!==!1&&this._handleKeyDown(s)}function GE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Hs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Dt.TOUCH_ROTATE;break;case Hs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Dt.TOUCH_PAN;break;default:this.state=Dt.NONE}break;case 2:switch(this.touches.TWO){case Hs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Dt.TOUCH_DOLLY_PAN;break;case Hs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Dt.TOUCH_DOLLY_ROTATE;break;default:this.state=Dt.NONE}break;default:this.state=Dt.NONE}this.state!==Dt.NONE&&this.dispatchEvent(ld)}function WE(s){switch(this._trackPointer(s),this.state){case Dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Dt.NONE}}function XE(s){this.enabled!==!1&&s.preventDefault()}function jE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function YE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Fl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Qo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const qE=new _g(-1,1,1,-1,0,1);class KE extends Ki{constructor(){super(),this.setAttribute("position",new ji([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ji([0,2,0,0,2,0],2))}}const $E=new KE;class Tg{constructor(e){this._mesh=new hi($E,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,qE)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class wg extends Qo{constructor(e,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,e instanceof An?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=zl.clone(e.uniforms),this.material=new An({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Tg(this.material)}render(e,n,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class zm extends Qo{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,r){const a=e.getContext(),l=e.state;l.buffers.color.setMask(!1),l.buffers.depth.setMask(!1),l.buffers.color.setLocked(!0),l.buffers.depth.setLocked(!0);let c,d;this.inverse?(c=0,d=1):(c=1,d=0),l.buffers.stencil.setTest(!0),l.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),l.buffers.stencil.setFunc(a.ALWAYS,c,4294967295),l.buffers.stencil.setClear(d),l.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),l.buffers.color.setLocked(!1),l.buffers.depth.setLocked(!1),l.buffers.color.setMask(!0),l.buffers.depth.setMask(!0),l.buffers.stencil.setLocked(!1),l.buffers.stencil.setFunc(a.EQUAL,1,4294967295),l.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),l.buffers.stencil.setLocked(!0)}}class ZE extends Qo{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class QE{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const r=e.getSize(new st);this._width=r.width,this._height=r.height,n=new ei(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ei}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new wg(Fl),this.copyPass.material.blending=Gi,this.clock=new K0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const n=this.renderer.getRenderTarget();let r=!1;for(let a=0,l=this.passes.length;a<l;a++){const c=this.passes[a];if(c.enabled!==!1){if(c.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),c.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),c.needsSwap){if(r){const d=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}zm!==void 0&&(c instanceof zm?r=!0:c instanceof ZE&&(r=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new st);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const r=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(r,a),this.renderTarget2.setSize(r,a);for(let l=0;l<this.passes.length;l++)this.passes[l].setSize(r,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class JE extends Qo{constructor(e,n,r=null,a=null,l=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=r,this.clearColor=a,this.clearAlpha=l,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Tt}render(e,n,r){const a=e.autoClear;e.autoClear=!1;let l,c;this.overrideMaterial!==null&&(c=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(l=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(l),this.overrideMaterial!==null&&(this.scene.overrideMaterial=c),e.autoClear=a}}const eT={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Tt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class $s extends Qo{constructor(e,n=1,r,a){super(),this.strength=n,this.radius=r,this.threshold=a,this.resolution=e!==void 0?new st(e.x,e.y):new st(256,256),this.clearColor=new Tt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let l=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);this.renderTargetBright=new ei(l,c,{type:Ei}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let g=0;g<this.nMips;g++){const v=new ei(l,c,{type:Ei});v.texture.name="UnrealBloomPass.h"+g,v.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(v);const x=new ei(l,c,{type:Ei});x.texture.name="UnrealBloomPass.v"+g,x.texture.generateMipmaps=!1,this.renderTargetsVertical.push(x),l=Math.round(l/2),c=Math.round(c/2)}const d=eT;this.highPassUniforms=zl.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new An({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];l=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);for(let g=0;g<this.nMips;g++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[g])),this.separableBlurMaterials[g].uniforms.invSize.value=new st(1/l,1/c),l=Math.round(l/2),c=Math.round(c/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const m=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=m,this.bloomTintColors=[new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=zl.clone(Fl.uniforms),this.blendMaterial=new An({uniforms:this.copyUniforms,vertexShader:Fl.vertexShader,fragmentShader:Fl.fragmentShader,blending:rf,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Tt,this._oldClearAlpha=1,this._basic=new od,this._fsQuad=new Tg(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,n){let r=Math.round(e/2),a=Math.round(n/2);this.renderTargetBright.setSize(r,a);for(let l=0;l<this.nMips;l++)this.renderTargetsHorizontal[l].setSize(r,a),this.renderTargetsVertical[l].setSize(r,a),this.separableBlurMaterials[l].uniforms.invSize.value=new st(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2)}render(e,n,r,a,l){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const c=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),l&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let d=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this._fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[h].uniforms.direction.value=$s.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=$s.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this._fsQuad.render(e),d=this.renderTargetsVertical[h];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,l&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=c}_getSeparableBlurMaterial(e){const n=[];for(let r=0;r<e;r++)n.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new An({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new st(.5,.5)},direction:{value:new st(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new An({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}$s.BlurDirectionX=new st(1,0);$s.BlurDirectionY=new st(0,1);const tT=`// 全屏三角形直通顶点着色器：裁剪空间坐标直接输出，vUv 覆盖 [0,1]。\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = position.xy * 0.5 + 0.5;\r
  gl_Position = vec4(position.xy, 0.0, 1.0);\r
}\r
`,nT=`// ============================================================================\r
// GARGANTUA — 史瓦西黑洞零测地线全屏光线追踪 Fragment Shader\r
// ----------------------------------------------------------------------------\r
// 坐标 / 状态量 / 步进 / 终止条件（任务要求以命名函数与注释说明）：\r
//\r
// * 坐标与单位：世界单位 = 史瓦西半径 RS = 1；黑洞位于原点；吸积盘平面 y = 0\r
//   （法线 +Y）。几何单位 c = G = 1，M = RS/2 = 0.5；光子球 r = 3M = 1.5，\r
//   临界碰撞参数 b_crit = 3*sqrt(3)*M ≈ 2.598，事件视界 r = RS = 1。\r
//\r
// * 零测地线：史瓦西度规 ds² = -(1-RS/r)dt² + dr²/(1-RS/r) + r²dΩ²，取 ds² = 0。\r
//   球对称 ⇒ 测地线恒在同一轨道平面内。以守恒量 E = (1-RS/r)·dt/dλ、\r
//   h = r²·dφ/dλ 消去 t、λ，得到 u = 1/r 关于 φ 的轨道方程（精确，非弱场近似）：\r
//       d²u/dφ² = -u + 3·M·u²\r
//\r
// * 状态量：y = (u, w)，w = du/dφ。射线初值映射：e1 = normalize(camPos)\r
//   （黑洞→相机基线），e2 = 轨道平面内正交于 e1 的单位向量，轨迹重建\r
//   P(φ) = (1/u)·(cos φ·e1 + sin φ·e2)（φ=0 处 P = camPos），\r
//   w0 = du/dφ|₀ = -u0·a/b（a = dir·e1，b = |dir - a·e1|，由 dr/dφ = r·a/b 得）。\r
//\r
// * 步进：RK4，自适应 dφ（接近盘面时减半，保证穿越定位精度）。\r
//\r
// * 终止条件：\r
//     u ≥ 1/RS          → r ≤ RS，落入事件视界（深黑，不叠加背景）\r
//     u < 1/48 且 w < 0 → r > 48 且向外运动，逃逸（沿出射切向采样程序化星空/银河）\r
//     步数 ≥ uMaxSteps  → 步数耗尽（合成已收集光 + 当前切向背景近似）\r
//     b ≈ 0（近轴）     → 解析退化：向内即捕获（b < b_crit 的入射线必入视界），向外无偏折逃逸\r
//\r
// * 吸积盘沿积分后的弯曲路径与 y=0 平面求交（非平面圆环几何/贴图）；同一光线的\r
//   多次盘面穿越按路径顺序（前向→后向 alpha）合成，形成主像、次级像与高阶环状细节。\r
// * 发射：轨道速度导致的相对论多普勒增亮/去增亮 × 引力红移（g 因子）、径向温度\r
//   梯度（内热蓝白 → 外橙）、开普勒差速剪切的时变程序化湍流。\r
// * 背景：程序化星空 + 银河带经透镜映射（逃逸方向 n̂）采样，无任何贴图/环境图。\r
// * 调试视图 0–9：0 走完整后处理链；1–9 直接输出诊断色（见 debugView）。\r
// ============================================================================\r
\r
varying vec2 vUv;\r
\r
uniform vec3 uCamPos;\r
uniform vec3 uCamRight;\r
uniform vec3 uCamUp;\r
uniform vec3 uCamForward;\r
uniform float uTanHalfFov;\r
uniform float uAspect;\r
uniform float uSimTime;\r
uniform int uDebugView;\r
uniform int uMaxSteps;\r
uniform int uMaxCrossings;\r
uniform int uOctaves;\r
\r
uniform float uDiskInner;\r
uniform float uDiskOuter;\r
uniform float uDiskHalfH;\r
uniform float uDiskTemp;\r
uniform float uDiskEmission;\r
uniform float uOrbitSpeed;\r
uniform float uTurbAmp;\r
uniform float uTurbSpeed;\r
uniform float uStarDensity;\r
uniform float uGalaxyBright;\r
\r
const float RS = 1.0;\r
const float M = 0.5 * RS;\r
const float B_CRIT = 2.5980762; // 3*sqrt(3)*M\r
const float PI = 3.14159265;\r
const float TAU = 6.28318531;\r
const float HALF_PI = 1.57079633;\r
const int HARD_MAX_STEPS = 512; // GLSL ES 1.00 常量循环上界\r
const float DISK_CALIBRATION = 0.1; // 发射视觉校准系数（由视觉验收调整）\r
const float SQRT_PI = 1.7724539;\r
\r
struct TraceResult {\r
  int term; // 0 捕获入视界 / 1 逃逸 / 2 步数耗尽\r
  int steps;\r
  int crossCount; // 收集到的盘面穿越次数（阶次）\r
  float firstG; // 首个穿越点的 g 因子\r
  float bImpact;\r
  vec3 bgDir;\r
};\r
\r
// ---------------------------------------------------------------- 基础工具\r
float hash12(vec2 p) {\r
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\r
  p3 += dot(p3, p3.yzx + 33.33);\r
  return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
vec2 hash22(vec2 p) {\r
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));\r
  p3 += dot(p3, p3.yzx + 33.33);\r
  return fract((p3.xx + p3.yz) * p3.zy);\r
}\r
\r
// 周期性 value noise：period 指定 lattice 周期（φ / 经度方向无缝）\r
float pnoise2(vec2 p, vec2 period) {\r
  vec2 i = floor(p);\r
  vec2 f = fract(p);\r
  vec2 s = f * f * (3.0 - 2.0 * f);\r
  float a = hash12(mod(i, period));\r
  float b = hash12(mod(i + vec2(1.0, 0.0), period));\r
  float c = hash12(mod(i + vec2(0.0, 1.0), period));\r
  float d = hash12(mod(i + vec2(1.0, 1.0), period));\r
  return mix(mix(a, b, s.x), mix(c, d, s.x), s.y);\r
}\r
\r
float fbm2(vec2 p, vec2 period, int octaves) {\r
  float sum = 0.0;\r
  float amp = 0.5;\r
  float norm = 0.0;\r
  for (int i = 0; i < 5; i++) {\r
    if (i >= octaves) break;\r
    sum += amp * pnoise2(p, period);\r
    norm += amp;\r
    p *= 2.0;\r
    period *= 2.0;\r
    amp *= 0.5;\r
  }\r
  return sum / max(norm, 1e-4);\r
}\r
\r
vec3 linearToSrgb(vec3 c) {\r
  c = clamp(c, 0.0, 1.0);\r
  return mix(c * 12.92, 1.055 * pow(max(c, 1e-5), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));\r
}\r
\r
vec3 heatRamp(float t) {\r
  t = clamp(t, 0.0, 1.0);\r
  vec3 c = mix(vec3(0.0, 0.15, 0.8), vec3(0.0, 0.95, 0.85), smoothstep(0.0, 0.35, t));\r
  c = mix(c, vec3(1.0, 0.9, 0.1), smoothstep(0.35, 0.7, t));\r
  return mix(c, vec3(1.0, 0.25, 0.0), smoothstep(0.7, 1.0, t));\r
}\r
\r
// ---------------------------------------------------------------- 吸积盘发射\r
// Tanner Helland 色温→RGB 近似（tannerhelland.com/2012/09/18/rgb-temperature-algorithm-code.html）\r
vec3 blackbodyColor(float T) {\r
  float t = clamp(T, 1000.0, 40000.0) / 100.0;\r
  float r, g, b;\r
  if (t <= 66.0) {\r
    r = 255.0;\r
  } else {\r
    r = 329.698727446 * pow(t - 60.0, -0.1332047592);\r
  }\r
  if (t <= 66.0) {\r
    g = 99.4708025861 * log(t) - 161.1195681661;\r
  } else {\r
    g = 288.1221695283 * pow(t - 60.0, -0.0755148492);\r
  }\r
  if (t >= 66.0) {\r
    b = 255.0;\r
  } else if (t <= 19.0) {\r
    b = 0.0;\r
  } else {\r
    b = 138.5177312231 * log(t - 10.0) - 305.0447927307;\r
  }\r
  return clamp(vec3(r, g, b), 0.0, 255.0) / 255.0;\r
}\r
\r
// 径向亮度轮廓（Shakura–Sunyaev 风格 T ∝ (rin/r)^{3/4}(1-√(rin/r))^{1/4} 的流量形态），\r
// 峰值归一化到 [0,1]，内外边缘 smoothstep 软化\r
float radialProfile(float r) {\r
  float x = uDiskInner / max(r, 1e-4);\r
  float base = pow(x, 0.75) * pow(max(1.0 - sqrt(x), 0.0), 0.25) * 1.956;\r
  float edgeIn = smoothstep(uDiskInner, uDiskInner + 0.5, r);\r
  float edgeOut = 1.0 - smoothstep(uDiskOuter - 0.5, uDiskOuter, r);\r
  return clamp(base, 0.0, 1.0) * edgeIn * edgeOut;\r
}\r
\r
// 径向温度梯度：内缘 14000K 蓝白 → 外缘约 3000K 橙（温标幂 2.0，视觉验收调整）\r
float tempOfR(float r) {\r
  float x = clamp(uDiskInner / max(r, 1e-4), 0.0, 1.0);\r
  return mix(3000.0, 14000.0, pow(x, 2.0)) * uDiskTemp;\r
}\r
\r
// 时变程序化湍流：开普勒差速剪切 ω(r)=√(M/r³) 的共转坐标系 fbm\r
float turbulenceAt(float r, float phi, float t) {\r
  float omega = sqrt(M / max(r * r * r, 1e-4));\r
  vec2 p = vec2(4.0 * log(r), (phi - omega * t * uTurbSpeed) * (8.0 / TAU));\r
  float n = fbm2(p, vec2(64.0, 8.0), uOctaves);\r
  return 1.0 + uTurbAmp * (n - 0.5) * 2.0;\r
}\r
\r
// 发射光谱：观测黑体温度 Tobs = g·T(r)，亮度按黑体幂律 I ∝ Tobs³\r
//（幂次 3 由视觉验收调整：保留温标渐变与 Doppler 不对称，避免外盘过暗/内盘冲白）\r
vec3 emissionAt(vec3 p, float g, float t) {\r
  float r = length(p);\r
  float prof = radialProfile(r);\r
  if (prof <= 0.0) return vec3(0.0);\r
  float Tobs = clamp(tempOfR(r) * g, 1000.0, 40000.0);\r
  float turb = turbulenceAt(r, atan(p.z, p.x), t);\r
  float brightness = uDiskEmission * prof * turb * pow(Tobs / 6500.0, 3.0) * DISK_CALIBRATION;\r
  return blackbodyColor(Tobs) * brightness;\r
}\r
\r
// 圆轨道发射体的 g 因子 = 相对论多普勒 × 引力红移：\r
//   gGrav = √(1-RS/r_em) / √(1-RS/r_cam)（光子爬出引力势阱损失能量）\r
//   D = 1 / (γ·(1 - β·n̂))，n̂ 为光子在发射点的传播方向（指向相机），\r
//       β 为发射体在局部静止正交标架中的轨道速度（史瓦西圆轨道 γ = √((1-RS/r)/(1-3M/r))）\r
float redshiftFactor(vec3 p, vec3 photonDir, float rCam, out float dopplerOut) {\r
  float r = max(length(p), 1e-4);\r
  float gGrav = sqrt(max(1.0 - RS / r, 0.0)) / sqrt(max(1.0 - RS / rCam, 0.0));\r
  float gamma = sqrt(max((1.0 - RS / r) / max(1.0 - 3.0 * M / r, 1e-3), 1e-3));\r
  float beta = min(sqrt(max(1.0 - 1.0 / (gamma * gamma), 0.0)) * uOrbitSpeed, 0.95);\r
  float gammaK = inversesqrt(max(1.0 - beta * beta, 1e-4));\r
  vec3 velDir = normalize(cross(vec3(0.0, 1.0, 0.0), p)); // 顺行开普勒轨道方向\r
  dopplerOut = 1.0 / (gammaK * max(1.0 - dot(velDir, photonDir) * beta, 1e-3));\r
  return dopplerOut * gGrav;\r
}\r
\r
// 穿越事件发射：以二分定位的穿越参数 τ 为锚做 3 点梯形样点（空间步距 ≈ 2h，高斯权重\r
// exp(-(y/h)²)）平均，再乘高斯薄层沿路径的解析积分因子 h·√π/|n̂_y|（掠射增益限幅防灰化）\r
vec3 crossingEmission(vec3 pa, vec3 pb, float tau, float g, float t) {\r
  float h = uDiskHalfH;\r
  float chord = max(length(pb - pa), 1e-4);\r
  float dt = clamp(2.0 * h / chord, 0.004, 0.45);\r
  vec3 sum = vec3(0.0);\r
  float wsum = 0.0;\r
  for (int j = -1; j <= 1; j++) {\r
    float s = clamp(tau + float(j) * dt, 0.0, 1.0);\r
    vec3 p = mix(pa, pb, s);\r
    float wj = exp(-pow(p.y / h, 2.0));\r
    sum += wj * emissionAt(p, g, t);\r
    wsum += wj;\r
  }\r
  float ny = abs((pb - pa).y) / chord;\r
  return (sum / max(wsum, 1e-4)) * (h * SQRT_PI / clamp(ny, 0.35, 1.0));\r
}\r
\r
// ---------------------------------------------------------------- 程序化背景\r
// 星空：经纬网格 hash 星点（经度方向 mod 周期化避免接缝），极区按 cos(lat) 衰减星数\r
vec3 starField(vec3 dir, float density) {\r
  float lon = atan(dir.z, dir.x);\r
  float lat = asin(clamp(dir.y, -1.0, 1.0));\r
  vec2 sp = vec2((lon + PI) / TAU * 128.0, (lat + HALF_PI) / PI * 64.0);\r
  vec2 cell = vec2(mod(floor(sp.x), 128.0), floor(sp.y));\r
  vec2 f = fract(sp);\r
  float cosLat = max(cos(lat), 0.05);\r
  vec3 acc = vec3(0.0);\r
  for (int j = 0; j < 2; j++) {\r
    vec2 h = hash22(cell + vec2(float(j) * 37.7, float(j) * 91.3) + 4.1);\r
    if (h.x > density * cosLat * 0.55) continue; // 恒星密度控制数量阈值\r
    vec2 pos = vec2(0.15 + 0.7 * h.y, 0.15 + 0.7 * hash12(cell + h + 17.0));\r
    float d = length(f - pos);\r
    float size = 0.035 + 0.05 * hash12(cell + h + 5.0);\r
    float core = smoothstep(size, 0.0, d);\r
    if (core <= 0.0) continue;\r
    float mag = 0.35 + 2.6 * pow(hash12(cell + h + 9.0), 3.0); // 少数亮星\r
    float temp = mix(3200.0, 14000.0, hash12(cell + h + 3.0));\r
    acc += blackbodyColor(temp) * core * mag * density;\r
  }\r
  return acc;\r
}\r
\r
// 银河带：倾斜大圆亮带 × fbm 尘埃纹理（暖白核心 → 偏蓝边缘）\r
vec3 galaxyBand(vec3 dir, float bright) {\r
  float lon = atan(dir.z, dir.x);\r
  float lat = asin(clamp(dir.y, -1.0, 1.0));\r
  vec2 gp = vec2((lon + PI) / TAU * 8.0, (lat + HALF_PI) / PI * 4.0);\r
  float dust = fbm2(gp * 2.0, vec2(16.0, 8.0), 3);\r
  float b = dot(dir, normalize(vec3(0.3, 1.0, 0.2)));\r
  float band = exp(-(b / 0.28) * (b / 0.28));\r
  vec3 col = mix(vec3(0.62, 0.7, 0.95), vec3(1.0, 0.93, 0.8), band * band);\r
  return col * band * (0.22 + 0.78 * dust) * bright * 0.5;\r
}\r
\r
vec3 background(vec3 dir) {\r
  return starField(dir, uStarDensity) + galaxyBand(dir, uGalaxyBright);\r
}\r
\r
// ---------------------------------------------------------------- 零测地线核\r
// 轨道方程 RHS：d²u/dφ² = -u + 3·M·u²\r
void geodesicRhs(float u, float w, out float du, out float dw) {\r
  du = w;\r
  dw = -u + 3.0 * M * u * u;\r
}\r
\r
void rk4Step(inout float u, inout float w, float dphi) {\r
  float k1u, k1w, k2u, k2w, k3u, k3w, k4u, k4w;\r
  geodesicRhs(u, w, k1u, k1w);\r
  geodesicRhs(u + 0.5 * dphi * k1u, w + 0.5 * dphi * k1w, k2u, k2w);\r
  geodesicRhs(u + 0.5 * dphi * k2u, w + 0.5 * dphi * k2w, k3u, k3w);\r
  geodesicRhs(u + dphi * k3u, w + dphi * k3w, k4u, k4w);\r
  u += dphi * (k1u + 2.0 * k2u + 2.0 * k3u + k4u) / 6.0;\r
  w += dphi * (k1w + 2.0 * k2w + 2.0 * k3w + k4w) / 6.0;\r
}\r
\r
// 射线初值 → (e1, e2, u0, w0, bImpact)\r
void setupRay(vec3 camPos, vec3 dir, out vec3 e1, out vec3 e2, out float u0, out float w0, out float bImpact) {\r
  float r0 = max(length(camPos), 1e-4);\r
  e1 = camPos / r0;\r
  u0 = 1.0 / r0;\r
  float a = dot(dir, e1);\r
  vec3 v = dir - a * e1;\r
  float b = length(v);\r
  e2 = v / max(b, 1e-5);\r
  w0 = -u0 * a / max(b, 1e-5); // du/dφ|₀ = -u·a/b（由 dr/dφ = r·a/b 得）\r
  bImpact = r0 * b; // 射线直线到中心的垂直距离 ≈ 渐近碰撞参数 b\r
}\r
\r
vec3 posOf(float phi, float u, vec3 e1, vec3 e2) {\r
  return (cos(phi) * e1 + sin(phi) * e2) / u;\r
}\r
\r
vec3 tangentOf(float phi, float u, float w, vec3 e1, vec3 e2) {\r
  vec3 rHat = cos(phi) * e1 + sin(phi) * e2;\r
  vec3 phiHat = -sin(phi) * e1 + cos(phi) * e2;\r
  return normalize((-w / (u * u)) * rHat + (1.0 / u) * phiHat); // dP/dφ = (dr/dφ)·r̂ + r·φ̂，dr/dφ = -w/u²\r
}\r
\r
// 主积分：RK4 推进 (u, w)，检测盘面穿越并按路径顺序合成，按终止条件返回\r
TraceResult traceGeodesic(vec3 camPos, vec3 dir, float rCam, inout vec3 accum, inout float trans) {\r
  TraceResult res;\r
  res.term = 2;\r
  res.steps = 0;\r
  res.crossCount = 0;\r
  res.firstG = 0.0;\r
  res.bImpact = 0.0;\r
  res.bgDir = dir;\r
\r
  vec3 e1, e2;\r
  float u, w;\r
  setupRay(camPos, dir, e1, e2, u, w, res.bImpact);\r
\r
  // 近轴退化解析处理（b ≈ 0）：b < b_crit 的入射零测地线必入视界；向外则无偏折逃逸\r
  if (res.bImpact < 1e-3) {\r
    res.term = dot(dir, e1) < 0.0 ? 0 : 1;\r
    return res;\r
  }\r
\r
  float phi = 0.0;\r
  vec3 pPrev = camPos;\r
  float yPrev = camPos.y;\r
\r
  for (int i = 0; i < HARD_MAX_STEPS; i++) {\r
    if (i >= uMaxSteps) {\r
      res.term = 2;\r
      break;\r
    }\r
    res.steps = i + 1;\r
\r
    float r = 1.0 / u;\r
    vec3 tangent = tangentOf(phi, u, w, e1, e2);\r
    float dphi = clamp(0.15 * (0.3 + 1.2 * u), 0.05, 0.22);\r
    float chordY = r * dphi * abs(tangent.y);\r
    if (abs(yPrev) < 2.0 * chordY) dphi = max(dphi * 0.5, 0.005); // 接近盘面加密\r
\r
    float uNext = u;\r
    float wNext = w;\r
    rk4Step(uNext, wNext, dphi);\r
    float phiNext = phi + dphi;\r
    vec3 pNext = posOf(phiNext, uNext, e1, e2);\r
    float yNext = pNext.y;\r
\r
    // 盘面穿越：y 变号 → 5 次二分定位穿越点（再积分到 φ 内部后按 P(φ) 重算）\r
    if (yPrev * yNext < 0.0 && res.crossCount < uMaxCrossings) {\r
      float lo = 0.0;\r
      float hi = 1.0;\r
      for (int k = 0; k < 5; k++) {\r
        float mid = 0.5 * (lo + hi);\r
        float uM = u;\r
        float wM = w;\r
        rk4Step(uM, wM, mid * dphi);\r
        float yM = posOf(phi + mid * dphi, uM, e1, e2).y;\r
        if (yM * yPrev > 0.0) lo = mid;\r
        else hi = mid;\r
      }\r
      float tau = 0.5 * (lo + hi);\r
      float uC = u;\r
      float wC = w;\r
      rk4Step(uC, wC, tau * dphi);\r
      vec3 pCross = posOf(phi + tau * dphi, uC, e1, e2);\r
      float rC = length(pCross);\r
      if (rC >= uDiskInner && rC <= uDiskOuter) {\r
        // 光子在发射点的传播方向 = 指向相机 = -march 切向\r
        vec3 photonDir = -tangentOf(phi + tau * dphi, uC, wC, e1, e2);\r
        float doppler;\r
        float g = redshiftFactor(pCross, photonDir, rCam, doppler);\r
        res.crossCount += 1;\r
        if (res.crossCount == 1) res.firstG = g;\r
        vec3 colorK = crossingEmission(pPrev, pNext, tau, g, uSimTime);\r
        float prof = radialProfile(rC);\r
        float turb = turbulenceAt(rC, atan(pCross.z, pCross.x), uSimTime);\r
        float alphaK = clamp(0.25 + 0.7 * prof * (0.75 + 0.25 * turb), 0.05, 0.97);\r
        accum += trans * alphaK * colorK;\r
        trans *= 1.0 - alphaK;\r
      }\r
    }\r
\r
    u = uNext;\r
    w = wNext;\r
    phi = phiNext;\r
    pPrev = pNext;\r
    yPrev = yNext;\r
\r
    if (u >= 1.0 / RS) { // r ≤ RS：事件视界终止\r
      res.term = 0;\r
      break;\r
    }\r
    if (u < 1.0 / 48.0 && w < 0.0) { // r > 48 且向外：逃逸，记录出射切向\r
      res.term = 1;\r
      res.bgDir = tangentOf(phi, u, w, e1, e2);\r
      break;\r
    }\r
  }\r
  return res;\r
}\r
\r
// ---------------------------------------------------------------- 调试视图 0–9\r
vec3 debugView(int mode, TraceResult tr, vec3 hdr, vec3 bg, vec3 diskAccum) {\r
  if (mode == 1) {\r
    // 幂律拉伸动态范围，突出临界环附近的高步数绕转\r
    return heatRamp(pow(float(tr.steps) / float(max(uMaxSteps, 1)), 0.5));\r
  }\r
  if (mode == 2) {\r
    if (tr.bImpact < 0.05) return vec3(0.45); // 近轴退化处理区\r
    if (tr.term == 0) return vec3(0.9, 0.1, 0.1);\r
    if (tr.term == 1) return vec3(0.1, 0.3, 0.9);\r
    return vec3(0.95, 0.85, 0.1);\r
  }\r
  if (mode == 3) {\r
    if (tr.term == 0) return vec3(1.0);\r
    if (tr.term == 1) return vec3(0.0);\r
    return vec3(0.5);\r
  }\r
  if (mode == 4) {\r
    int k = tr.crossCount;\r
    if (k <= 0) return vec3(0.0);\r
    if (k == 1) return vec3(0.2, 0.9, 0.3);\r
    if (k == 2) return vec3(0.95, 0.2, 0.85);\r
    if (k == 3) return vec3(1.0, 0.6, 0.1);\r
    if (k == 4) return vec3(0.2, 0.85, 0.95);\r
    return vec3(1.0);\r
  }\r
  if (mode == 5) {\r
    if (tr.crossCount <= 0) return vec3(0.0);\r
    float g = tr.firstG;\r
    vec3 c = mix(vec3(0.9, 0.15, 0.1), vec3(0.7, 0.85, 1.0), smoothstep(0.55, 1.35, g));\r
    return c * clamp(0.3 + 0.5 * g, 0.2, 1.1);\r
  }\r
  if (mode == 6) {\r
    if (tr.term == 0) return vec3(0.0);\r
    return tr.bgDir * 0.5 + 0.5;\r
  }\r
  if (mode == 7) {\r
    return bg;\r
  }\r
  if (mode == 8) {\r
    float lum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));\r
    return heatRamp(log(1.0 + lum) / log(17.0));\r
  }\r
  if (mode == 9) {\r
    float q = clamp(tr.bImpact / 4.0, 0.0, 1.0);\r
    vec3 c = vec3(q, 0.25 * q, 1.0 - q) * 0.35;\r
    c += vec3(exp(-abs(tr.bImpact - B_CRIT) * 30.0)); // 临界带高亮\r
    return c;\r
  }\r
  return hdr;\r
}\r
\r
void main() {\r
  vec2 ndc = vUv * 2.0 - 1.0;\r
  vec3 dir = normalize(uCamForward + uCamRight * (ndc.x * uAspect * uTanHalfFov) + uCamUp * (ndc.y * uTanHalfFov));\r
\r
  vec3 accum = vec3(0.0);\r
  float trans = 1.0;\r
  float rCam = max(length(uCamPos), 1e-4);\r
  TraceResult tr = traceGeodesic(uCamPos, dir, rCam, accum, trans);\r
\r
  vec3 bg = vec3(0.0);\r
  if (tr.term == 1 || tr.term == 2) {\r
    bg = background(tr.bgDir); // 步数耗尽用当前切向做背景近似\r
  }\r
  vec3 hdr = accum + trans * bg;\r
\r
  if (uDebugView == 0) {\r
    gl_FragColor = vec4(hdr, 1.0); // 线性 HDR → 后处理链（Bloom / ACES / 暗角 / 颗粒 / 色散）\r
  } else {\r
    gl_FragColor = vec4(linearToSrgb(clamp(debugView(uDebugView, tr, hdr, bg, accum), 0.0, 1.0)), 1.0);\r
  }\r
}\r
`,iT=`// ============================================================================\r
// 后处理合成 Pass：径向色散 → 曝光 → ACES tone mapping → 暗角 → 胶片颗粒 → sRGB\r
// 输入为线性 HDR（HalfFloat），输出为 sRGB 显示色。\r
// ============================================================================\r
uniform sampler2D tDiffuse;\r
uniform float uExposure;\r
uniform float uVignette;\r
uniform float uGrain;\r
uniform float uChroma;\r
uniform float uTime;\r
uniform float uAspect;\r
uniform int uCATaps;\r
\r
varying vec2 vUv;\r
\r
// Narkowicz (2015) ACESFilmic 拟合近似（明确实现的 ACES tone mapping）\r
vec3 acesFitted(vec3 x) {\r
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);\r
}\r
\r
vec3 linearToSrgb(vec3 c) {\r
  c = clamp(c, 0.0, 1.0);\r
  return mix(c * 12.92, 1.055 * pow(max(c, 1e-5), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));\r
}\r
\r
float hash12(vec2 p) {\r
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\r
  p3 += dot(p3, p3.yzx + 33.33);\r
  return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
// 径向色散：沿 UV 径向偏移采样，R/B 通道反向偏移（G 不偏移）。\r
// uCATaps = 3：三采样；uCATaps = 5：增加 ±0.5 级插值采样（质量档预算之一）。\r
vec3 sampleCA(sampler2D tex, vec2 uv, vec2 dir, float amount, int taps) {\r
  if (amount <= 1e-4) return texture2D(tex, uv).rgb;\r
  vec2 off = dir * amount * 0.012;\r
  if (taps >= 5) {\r
    float r = 0.6 * texture2D(tex, uv + off).r + 0.4 * texture2D(tex, uv + 0.5 * off).r;\r
    float g = texture2D(tex, uv).g;\r
    float b = 0.6 * texture2D(tex, uv - off).b + 0.4 * texture2D(tex, uv - 0.5 * off).b;\r
    return vec3(r, g, b);\r
  }\r
  return vec3(texture2D(tex, uv + off).r, texture2D(tex, uv).g, texture2D(tex, uv - off).b);\r
}\r
\r
void main() {\r
  vec2 uv = vUv;\r
  vec2 dir = uv - 0.5;\r
\r
  vec3 hdr = sampleCA(tDiffuse, uv, dir, uChroma, uCATaps);\r
  vec3 col = acesFitted(hdr * uExposure);\r
\r
  // 克制的暗角：边缘轻微压暗，不遮挡光子环与多次盘面像\r
  float vig = smoothstep(1.25, 0.35, length(dir * vec2(uAspect, 1.0)) * 1.4);\r
  col *= mix(1.0, vig, uVignette);\r
\r
  // 胶片颗粒（capture 模式下 uTime 冻结 → 截图确定性）\r
  float grainN = hash12(uv * 913.0 + floor(uTime * 60.0)) - 0.5;\r
  col += grainN * uGrain * 0.2;\r
\r
  gl_FragColor = vec4(linearToSrgb(col), 1.0);\r
}\r
`;function rT(){const s=new Ki;return s.setAttribute("position",new mi(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),s}function sT(){return new An({vertexShader:tT,fragmentShader:nT,depthTest:!1,depthWrite:!1,uniforms:{uCamPos:{value:new K},uCamRight:{value:new K(1,0,0)},uCamUp:{value:new K(0,1,0)},uCamForward:{value:new K(0,0,-1)},uTanHalfFov:{value:Math.tan(60*Math.PI/360)},uAspect:{value:1},uSimTime:{value:0},uDebugView:{value:0},uMaxSteps:{value:340},uMaxCrossings:{value:5},uOctaves:{value:4},uDiskInner:{value:3},uDiskOuter:{value:12},uDiskHalfH:{value:.25},uDiskTemp:{value:1},uDiskEmission:{value:1.5},uOrbitSpeed:{value:1},uTurbAmp:{value:.55},uTurbSpeed:{value:1},uStarDensity:{value:1},uGalaxyBright:{value:.6}}})}const oT=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;function aT(){return{uniforms:{tDiffuse:{value:null},uExposure:{value:1.1},uVignette:{value:.35},uGrain:{value:.12},uChroma:{value:.25},uTime:{value:0},uAspect:{value:1},uCATaps:{value:3}},vertexShader:oT,fragmentShader:iT}}const Js=[{key:"fov",label:"视场角 FOV",group:"相机镜头",min:20,max:100,step:1,default:60,unit:"°"},{key:"camDist",label:"相机距离",group:"相机镜头",min:5.5,max:60,step:.1,default:16,unit:"rs"},{key:"camAzimuth",label:"相机方位角",group:"相机镜头",min:0,max:360,step:1,default:0,unit:"°"},{key:"camElevation",label:"相机俯仰角",group:"相机镜头",min:-85,max:85,step:1,default:10,unit:"°"},{key:"timeScale",label:"时间倍率",group:"相机镜头",min:0,max:5,step:.05,default:1,unit:"×"},{key:"diskInner",label:"盘内半径",group:"吸积盘",min:2.5,max:10,step:.1,default:3,unit:"rs"},{key:"diskOuter",label:"盘外半径",group:"吸积盘",min:6,max:30,step:.1,default:12,unit:"rs"},{key:"diskThickness",label:"盘半厚度",group:"吸积盘",min:.02,max:1.5,step:.01,default:.25,unit:"rs"},{key:"diskTemp",label:"盘温度",group:"吸积盘",min:.3,max:2.5,step:.05,default:1,unit:"×"},{key:"diskEmission",label:"盘发射强度",group:"吸积盘",min:0,max:5,step:.05,default:1.5,unit:""},{key:"orbitSpeed",label:"轨道速度倍率",group:"吸积盘",min:0,max:2,step:.05,default:1,unit:"×"},{key:"turbAmp",label:"湍流幅度",group:"吸积盘",min:0,max:1,step:.01,default:.55,unit:""},{key:"turbSpeed",label:"湍流速度",group:"吸积盘",min:0,max:3,step:.05,default:1,unit:"×"},{key:"starDensity",label:"恒星密度",group:"背景",min:0,max:3,step:.05,default:1,unit:"×"},{key:"galaxyBright",label:"银河亮度",group:"背景",min:0,max:3,step:.05,default:.6,unit:"×"},{key:"bloomStrength",label:"Bloom 强度",group:"后处理",min:0,max:2.5,step:.05,default:.7,unit:""},{key:"bloomThreshold",label:"Bloom 阈值",group:"后处理",min:0,max:2,step:.05,default:.85,unit:""},{key:"exposure",label:"曝光度",group:"后处理",min:.1,max:3,step:.05,default:1.1,unit:"×"},{key:"vignette",label:"暗角强度",group:"后处理",min:0,max:1,step:.01,default:.35,unit:""},{key:"grain",label:"胶片颗粒强度",group:"后处理",min:0,max:.6,step:.01,default:.12,unit:""},{key:"chroma",label:"色散强度",group:"后处理",min:0,max:1,step:.01,default:.25,unit:""}];Js.map(s=>s.key);const qo=Object.fromEntries(Js.map(s=>[s.key,s.default])),lT=["相机镜头","吸积盘","背景","后处理"],ud=[{name:"视界边缘 Horizon Edge",camDist:16,camAzimuth:0,camElevation:10,fov:60},{name:"极区俯瞰 Polar Descent",camDist:20,camAzimuth:30,camElevation:68,fov:55},{name:"光子环特写 Photon Ring Macro",camDist:8.5,camAzimuth:140,camElevation:25,fov:28},{name:"广角透镜场 Wide Lensing Field",camDist:32,camAzimuth:250,camElevation:42,fov:88}],Yf={standard:{renderScale:.75,dprCap:1.25,maxSteps:180,maxCrossings:3,octaves:3,bloomScale:.5,caTaps:3},high:{renderScale:1,dprCap:1.5,maxSteps:340,maxCrossings:5,octaves:4,bloomScale:.75,caTaps:3},cinematic:{renderScale:1,dprCap:2,maxSteps:512,maxCrossings:8,octaves:5,bloomScale:1,caTaps:5}},$r=["standard","high","cinematic"],Ko="high",Hm=[{name:"最终合成 FINAL",desc:"完整后处理链输出（Bloom + ACES + 暗角/颗粒/色散）"},{name:"积分步数 STEPS",desc:"每像素测地线积分步数热力图（临界环附近更热）"},{name:"终止原因 TERMINATION",desc:"红=入视界 / 蓝=逃逸 / 黄=步数耗尽 / 灰=近轴退化"},{name:"视界掩码 HORIZON",desc:"捕获=白、逃逸=黑（阴影剪影，含光子环边界）"},{name:"盘交点阶次 DISK ORDER",desc:"该光线收集的盘面穿越次数：1=绿 2=品红 3=橙 4=青 ≥5=白"},{name:"红移/DOPPLER G-MAP",desc:"首个穿越点 g 因子：>1 蓝移偏蓝白、<1 红移偏红，亮度∝g"},{name:"背景透镜坐标 LENSED DIR",desc:"逃逸方向 n̂ 假彩色（透镜映射后的背景坐标）"},{name:"星空/银河 STARFIELD",desc:"仅透镜后的程序化星空 + 银河层"},{name:"处理前 HDR PRE-POST HDR",desc:"Bloom/tonemap 之前的 HDR 辐亮度对数热图"},{name:"碰撞参数 IMPACT B",desc:"b 相对 b_crit≈2.598 的接近度梯度（临界捕获结构）"}],bl=Math.PI/180;class uT{constructor(e){this.container=e,this.quality=Ko,this.debugView=0,this.status="normal",this.onStatusChange=null,this.running=!0,this.params=null,this._restoredTimer=0}init(){return this.width=window.innerWidth,this.height=window.innerHeight,this.renderer=new UE({antialias:!1,powerPreference:"high-performance"}),this.renderer.toneMapping=Wi,this.renderer.outputColorSpace=Qr,this.renderer.domElement.className="gargantua-canvas",this.container.appendChild(this.renderer.domElement),this.scene=new V0,this.camera=new Jn(60,this.width/Math.max(this.height,1),.1,3e3),this.rayMaterial=sT(),this.mesh=new hi(rT(),this.rayMaterial),this.mesh.frustumCulled=!1,this.scene.add(this.mesh),this.controls=new NE(this.camera,this.renderer.domElement),this.controls.target.set(0,0,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.06,this.controls.enablePan=!1,this.controls.minDistance=5.5,this.controls.maxDistance=60,this._onLost=e=>{e.preventDefault(),this.running=!1,this._setStatus("lost")},this._onRestored=()=>{this.rebuildPipeline(),this._setStatus("restored"),this.running=!0,clearTimeout(this._restoredTimer),this._restoredTimer=setTimeout(()=>this._setStatus("normal"),2e3)},this.renderer.domElement.addEventListener("webglcontextlost",this._onLost,!1),this.renderer.domElement.addEventListener("webglcontextrestored",this._onRestored,!1),this._onResize=()=>this.resize(),window.addEventListener("resize",this._onResize),window.addEventListener("orientationchange",this._onResize),this.buildPipeline(),this.resize(),this}qualityBudget(){return Yf[this.quality]}pixelRatio(){const e=this.qualityBudget();return Math.min(window.devicePixelRatio||1,e.dprCap)*e.renderScale}setQuality(e){return Yf[e]?(this.quality=e,this._applyQualityUniforms(),this.resize(),!0):!1}_applyQualityUniforms(){const e=this.qualityBudget();this.rayMaterial.uniforms.uMaxSteps.value=e.maxSteps,this.rayMaterial.uniforms.uMaxCrossings.value=e.maxCrossings,this.rayMaterial.uniforms.uOctaves.value=e.octaves,this.finalPass&&(this.finalPass.material.uniforms.uCATaps.value=e.caTaps)}resize(){this.width=window.innerWidth,this.height=window.innerHeight;const e=this.qualityBudget(),n=this.pixelRatio();this.camera.aspect=this.width/Math.max(this.height,1),this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n),this.renderer.setSize(this.width,this.height),this.composer&&(this.composer.setPixelRatio(n),this.composer.setSize(this.width,this.height),this.bloomPass.setSize(Math.max(1,Math.round(this.width*n*e.bloomScale)),Math.max(1,Math.round(this.height*n*e.bloomScale)))),this.rayMaterial.uniforms.uAspect.value=this.camera.aspect,this.finalPass&&(this.finalPass.material.uniforms.uAspect.value=this.camera.aspect)}buildPipeline(){const e=this.qualityBudget(),n=this.pixelRatio(),r=Math.max(1,Math.round(this.width*n)),a=Math.max(1,Math.round(this.height*n)),l=new ei(r,a,{type:Ei,depthBuffer:!0,stencilBuffer:!1});l.texture.colorSpace=Hi,this.composer=new QE(this.renderer,l),this.composer.setPixelRatio(n),this.composer.setSize(this.width,this.height),this.renderPass=new JE(this.scene,this.camera),this.bloomPass=new $s(new st(Math.max(1,Math.round(r*e.bloomScale)),Math.max(1,Math.round(a*e.bloomScale))),.7,.55,.85),this.finalPass=new wg(aT()),this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(this.finalPass),this.bloomPass.setSize(Math.max(1,Math.round(r*e.bloomScale)),Math.max(1,Math.round(a*e.bloomScale))),this._applyQualityUniforms(),this.params&&this.applyParams(this.params)}disposePipeline(){if(this.composer){for(const e of[this.finalPass,this.bloomPass,this.renderPass])e&&e.dispose&&e.dispose();this.composer.renderTarget1.dispose(),this.composer.renderTarget2.dispose(),this.composer.dispose(),this.composer=null,this.renderPass=null,this.bloomPass=null,this.finalPass=null}}rebuildPipeline(){this.disposePipeline(),this.rayMaterial.needsUpdate=!0,this.buildPipeline(),this.resize()}applyParams(e){this.params=e;const n=this.rayMaterial.uniforms;if(n.uDiskInner.value=e.diskInner,n.uDiskOuter.value=e.diskOuter,n.uDiskHalfH.value=e.diskThickness,n.uDiskTemp.value=e.diskTemp,n.uDiskEmission.value=e.diskEmission,n.uOrbitSpeed.value=e.orbitSpeed,n.uTurbAmp.value=e.turbAmp,n.uTurbSpeed.value=e.turbSpeed,n.uStarDensity.value=e.starDensity,n.uGalaxyBright.value=e.galaxyBright,this.finalPass){const r=this.finalPass.material.uniforms;r.uExposure.value=e.exposure,r.uVignette.value=e.vignette,r.uGrain.value=e.grain,r.uChroma.value=e.chroma}this.bloomPass&&(this.bloomPass.strength=e.bloomStrength,this.bloomPass.threshold=e.bloomThreshold)}setCameraSpherical({camDist:e,camAzimuth:n,camElevation:r,fov:a}){const l=r*bl,c=n*bl;this.camera.position.set(e*Math.cos(l)*Math.cos(c),e*Math.sin(l),e*Math.cos(l)*Math.sin(c)),this.camera.fov=a,this.camera.updateProjectionMatrix(),this.controls.target.set(0,0,0),this.controls.update(),this.syncCameraUniforms()}getCameraSpherical(){const e=this.camera.position,n=e.length(),r=Math.asin(ig.clamp(e.y/Math.max(n,1e-6),-1,1))/bl;let a=Math.atan2(e.z,e.x)/bl;return a<0&&(a+=360),{camDist:n,camAzimuth:a,camElevation:r,fov:this.camera.fov}}syncCameraUniforms(){this.camera.updateMatrixWorld();const e=this.camera.matrixWorld.elements,n=this.rayMaterial.uniforms;n.uCamPos.value.set(e[12],e[13],e[14]),n.uCamRight.value.set(e[0],e[1],e[2]),n.uCamUp.value.set(e[4],e[5],e[6]),n.uCamForward.value.set(-e[8],-e[9],-e[10]),n.uTanHalfFov.value=Math.tan(this.camera.fov*Math.PI/360),n.uAspect.value=this.camera.aspect}setDebugView(e){const n=Number(e);return!Number.isInteger(n)||n<0||n>9?!1:(this.debugView=n,this.rayMaterial.uniforms.uDebugView.value=n,!0)}renderFrame(e){this.running&&(this.controls.update(),this.syncCameraUniforms(),this.rayMaterial.uniforms.uSimTime.value=e,this.finalPass&&(this.finalPass.material.uniforms.uTime.value=e),this.debugView!==0?(this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)):this.composer.render())}_setStatus(e){this.status=e,this.onStatusChange&&this.onStatusChange(e)}dispose(){clearTimeout(this._restoredTimer),window.removeEventListener("resize",this._onResize),window.removeEventListener("orientationchange",this._onResize),this.renderer.domElement.removeEventListener("webglcontextlost",this._onLost,!1),this.renderer.domElement.removeEventListener("webglcontextrestored",this._onRestored,!1),this.disposePipeline(),this.controls.dispose(),this.rayMaterial.dispose(),this.mesh.geometry.dispose(),this.renderer.dispose(),this.renderer.domElement.parentNode===this.container&&this.container.removeChild(this.renderer.domElement)}}const cT=new Map(Js.map(s=>[s.key,s]));function fT(s,e){const n=cT.get(s);return!n||typeof e!="number"||!Number.isFinite(e)?null:Math.min(n.max,Math.max(n.min,e))}function dT(s={}){let e={params:{...qo},quality:Ko,preset:0,debug:0,hudOpen:!0,playing:!1,ctxStatus:"normal",capture:!1,...s};const n=new Set,r=()=>e,a=h=>{e={...e,...h},n.forEach(m=>m(e))},l=h=>{const m={...e.params};for(const g of Object.keys(h)){const v=fT(g,h[g]);v!==null&&(m[g]=v)}m.diskOuter=Math.max(m.diskOuter,m.diskInner+1),a({params:m})};return{get:r,set:a,subscribe:d,...{setParams:l,setParam(h,m){l({[h]:m})},applyPreset(h){if(!Number.isInteger(h))return!1;const m=ud[h];return m?(a({preset:h,playing:!1,params:{...e.params,camDist:m.camDist,camAzimuth:m.camAzimuth,camElevation:m.camElevation,fov:m.fov}}),!0):!1},setQuality(h){return $r.includes(h)?(a({quality:h}),!0):!1},cycleQuality(){const h=$r.indexOf(e.quality);a({quality:$r[(h+1)%$r.length]})},setDebug(h){return!Number.isInteger(h)||h<0||h>9?!1:(a({debug:h}),!0)},toggleHud(){a({hudOpen:!e.hudOpen})},setHud(h){a({hudOpen:!!h})},togglePlayback(){return e.capture?!1:(a({playing:!e.playing}),!0)},setPlaying(h){a({playing:e.capture?!1:!!h})},setCtxStatus(h){a({ctxStatus:h})},resetAll(){a({params:{...qo},quality:Ko,preset:0,debug:0,hudOpen:!0,playing:!1})}}};function d(h){return n.add(h),()=>n.delete(h)}}const Nt=dT(),cd="gargantua.state.v1",hT=new Map(Js.map(s=>[s.key,s]));function pT(s,e){const n=hT.get(s);return n?typeof e!="number"||!Number.isFinite(e)?n.default:Math.min(n.max,Math.max(n.min,e)):null}function mT(){try{const s=localStorage.getItem(cd);if(!s)return null;const e=JSON.parse(s);if(!e||typeof e!="object"||e.version!==1)return null;const n={...qo};if(e.params&&typeof e.params=="object")for(const r of Js)r.key in e.params&&(n[r.key]=pT(r.key,e.params[r.key]));return n.diskOuter=Math.max(n.diskOuter,n.diskInner+1),{params:n,quality:$r.includes(e.quality)?e.quality:Ko,preset:Number.isInteger(e.preset)&&e.preset>=0&&e.preset<=3?e.preset:0,debug:Number.isInteger(e.debug)&&e.debug>=0&&e.debug<=9?e.debug:0,hudOpen:typeof e.hudOpen=="boolean"?e.hudOpen:!0}}catch{return null}}let qf=0;function Pl(s){clearTimeout(qf),qf=setTimeout(()=>{try{localStorage.setItem(cd,JSON.stringify({version:1,params:s.params,quality:s.quality,preset:s.preset,debug:s.debug,hudOpen:s.hudOpen}))}catch{}},200)}function Vm(){clearTimeout(qf);try{localStorage.removeItem(cd)}catch{}}function Gm(s,e,n,r){const a=Number(s);return Number.isInteger(a)&&a>=n&&a<=r?a:e}function gT(s,e){const n=Number(s);return Number.isFinite(n)&&n>=0?n:e}function _T(s){const e=new URLSearchParams(typeof location<"u"?location.search:""),n=l=>e.has(l),r=e.get("quality"),a=e.get("hud");return{captureMode:e.get("capture")==="1",time:gT(e.get("time"),0),quality:$r.includes(r)?r:Ko,preset:Gm(e.get("preset"),0,0,3),debug:Gm(e.get("debug"),0,0,9),hud:a==="0"||a==="1"?Number(a):1,present:{quality:n("quality"),preset:n("preset"),debug:n("debug"),hud:n("hud")}}}function vT(s,e){const n=()=>{const a=s.get();return{quality:a.quality,preset:a.preset,debug:a.debug,time:e.getTime(),hud:a.hudOpen?1:0,capture:a.capture,params:{...a.params}}},r={getState:()=>n(),setQuality:a=>typeof a=="string"&&$r.includes(a)&&s.setQuality(a)?n():!1,setPreset:a=>Number.isInteger(a)&&a>=0&&a<ud.length&&s.applyPreset(a)?n():!1,setDebug:a=>Number.isInteger(a)&&a>=0&&a<=9&&s.setDebug(a)?n():!1,setTime:a=>typeof a=="number"&&Number.isFinite(a)&&a>=0&&e.setTime(a)?n():!1};return Object.defineProperty(r,"ready",{get:()=>!0,enumerable:!0}),window.__GARGANTUA__=r,r}function xT(s){const e=n=>{const r=n.target;if(r&&(r.tagName==="INPUT"||r.tagName==="SELECT"||r.tagName==="TEXTAREA"||r.isContentEditable))return;if(n.code==="Space"){n.preventDefault(),s.onTogglePlayback();return}let a=/^Digit([0-9])$/.exec(n.code)||/^Numpad([0-9])$/.exec(n.code);if(a){n.preventDefault(),n.shiftKey&&a[1]>="1"&&a[1]<="4"?s.onPreset(Number(a[1])-1):n.shiftKey||s.onDebug(Number(a[1]));return}switch(n.code){case"KeyH":s.onToggleHud();break;case"KeyR":s.onReset();break;case"KeyQ":s.onCycleQuality();break}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)}function yT({def:s,value:e,onChange:n,onReset:r}){const a=(String(s.step).split(".")[1]||"").length,l=a?e.toFixed(a):String(Math.round(e));return Ie.jsxs("div",{className:"param",children:[Ie.jsxs("div",{className:"param__head",children:[Ie.jsxs("span",{className:"param__label",children:[s.label," ",Ie.jsx("em",{children:s.key})]}),Ie.jsxs("span",{className:"param__value",children:[l,s.unit]})]}),Ie.jsxs("div",{className:"param__row",children:[Ie.jsx("input",{type:"range",min:s.min,max:s.max,step:s.step,value:e,"aria-label":s.label,onChange:c=>n(s.key,Number(c.target.value))}),Ie.jsx("button",{type:"button",className:"param__reset",title:`复位 ${s.label} → ${s.default}`,"aria-label":`复位 ${s.label}`,onClick:()=>r(s.key),children:"↺"})]})]})}const Wm={standard:"Standard 标准",high:"High 高",cinematic:"Cinematic 电影"},ST={normal:"渲染正常",lost:"上下文丢失 - 恢复中…",restored:"上下文已恢复"};function MT({state:s,simTime:e,actions:n,capture:r,onResetAll:a}){const l=s.params,c=Hm[s.debug]??Hm[0],d=r&&!s.hudOpen;return Ie.jsxs(Ie.Fragment,{children:[Ie.jsxs("aside",{className:`hud ${s.hudOpen?"hud--open":""} ${d?"hud--hidden":""}`,"aria-label":"GARGANTUA HUD",children:[Ie.jsxs("header",{className:"hud__handle",onClick:n.toggleHud,children:[Ie.jsx("strong",{children:"GARGANTUA"}),Ie.jsxs("span",{className:"hud__summary",children:[Wm[s.quality]," · 调试 ",s.debug," · ",s.playing?"镜头播放":"镜头暂停"]}),Ie.jsx("span",{className:"hud__toggle",children:s.hudOpen?"收起 ▾":"展开 ▴"})]}),Ie.jsxs("div",{className:"hud__body",children:[Ie.jsxs("section",{className:"hud__section",children:[Ie.jsx("h3",{children:"状态"}),Ie.jsxs("div",{className:"hud__row",children:[Ie.jsx("span",{children:"质量档"}),Ie.jsx("button",{type:"button",onClick:n.cycleQuality,children:Wm[s.quality]}),Ie.jsx("kbd",{children:"Q"})]}),Ie.jsxs("div",{className:"hud__row hud__row--col",children:[Ie.jsxs("span",{children:["调试视图 ",Ie.jsx("b",{children:s.debug})," · ",c.name]}),Ie.jsx("small",{children:c.desc})]}),Ie.jsxs("div",{className:"hud__row hud__row--col",children:[Ie.jsxs("span",{children:["镜头：距离 ",l.camDist.toFixed(1)," rs · 方位 ",Math.round(l.camAzimuth),"° · 俯仰"," ",Math.round(l.camElevation),"° · FOV ",Math.round(l.fov),"°"]}),Ie.jsxs("small",{children:["模拟时间 ",e.toFixed(2)," s · 镜头循环 ",s.playing?"播放":"暂停",r?" · capture 冻结":""]})]}),Ie.jsx("div",{className:"hud__row",children:Ie.jsx("span",{className:`hud__chip hud__chip--${s.ctxStatus}`,children:ST[s.ctxStatus]})})]}),Ie.jsxs("section",{className:"hud__section",children:[Ie.jsxs("h3",{children:["视角预设 ",Ie.jsx("kbd",{children:"Shift"}),"+",Ie.jsx("kbd",{children:"1"}),"–",Ie.jsx("kbd",{children:"4"})]}),Ie.jsx("div",{className:"hud__presets",children:ud.map((h,m)=>Ie.jsxs("button",{type:"button",className:m===s.preset?"active":"",onClick:()=>n.applyPreset(m),children:[Ie.jsx("b",{children:m+1})," ",h.name]},h.name))})]}),Ie.jsxs("section",{className:"hud__section",children:[Ie.jsx("h3",{children:"参数（21 项，均可生效 · ↺ 单项复位）"}),lT.map(h=>Ie.jsxs("div",{className:"hud__group",children:[Ie.jsx("h4",{children:h}),Js.filter(m=>m.group===h).map(m=>Ie.jsx(yT,{def:m,value:l[m.key],onChange:n.setParam,onReset:g=>n.setParam(g,qo[g])},m.key))]},h)),Ie.jsxs("button",{type:"button",className:"hud__reset",onClick:a,children:["全部重置 ",Ie.jsx("kbd",{children:"R"})]})]}),Ie.jsxs("section",{className:"hud__section",children:[Ie.jsx("h3",{children:"快捷键"}),Ie.jsxs("ul",{className:"hud__keys",children:[Ie.jsxs("li",{children:[Ie.jsx("kbd",{children:"0"}),"–",Ie.jsx("kbd",{children:"9"})," 调试视图切换"]}),Ie.jsxs("li",{children:[Ie.jsx("kbd",{children:"Shift"}),"+",Ie.jsx("kbd",{children:"1"}),"–",Ie.jsx("kbd",{children:"4"})," 视角预设"]}),Ie.jsxs("li",{children:[Ie.jsx("kbd",{children:"Space"})," 播放/暂停电影镜头"]}),Ie.jsxs("li",{children:[Ie.jsx("kbd",{children:"H"})," HUD 显隐"]}),Ie.jsxs("li",{children:[Ie.jsx("kbd",{children:"R"})," 重置全部"]}),Ie.jsxs("li",{children:[Ie.jsx("kbd",{children:"Q"})," 质量档切换"]}),Ie.jsx("li",{className:"hud__note",children:"氛围音乐为任务可选项，本实现未提供（无 M 键）"})]})]})]})]}),!s.hudOpen&&!r&&Ie.jsx("button",{type:"button",className:"hud-reopen",onClick:n.toggleHud,children:"☰ HUD (H)"})]})}function ET(s,e){const n=Math.abs(s-e)%360;return n>180?360-n:n}function TT(){const s=Io.useRef(null),e=Io.useSyncExternalStore(Nt.subscribe,Nt.get),[n,r]=Io.useState(0),a=Io.useRef({simTime:0,frozen:0});Io.useEffect(()=>{const c=_T(),d=mT();d||Pl(Nt.get());const m={params:{...qo,...d?d.params:{}},quality:c.present.quality?c.quality:d?.quality??"high",debug:c.present.debug?c.debug:d?.debug??0,hudOpen:c.present.hud?c.hud===1:d?.hudOpen??!0,preset:d?.preset??0,capture:c.captureMode};Nt.set(m),c.present.preset&&Nt.applyPreset(c.preset),c.captureMode&&(a.current={simTime:c.time,frozen:c.time});const g=new uT(s.current).init();g.onStatusChange=L=>Nt.setCtxStatus(L);const v=Nt.get();g.setQuality(Yf[v.quality]?v.quality:"high"),g.setDebugView(v.debug),g.applyParams(v.params),g.setCameraSpherical(v.params),g.controls.addEventListener("start",()=>Nt.setPlaying(!1)),g.controls.addEventListener("change",()=>{const L=g.getCameraSpherical();Nt.setParams({camDist:L.camDist,camAzimuth:L.camAzimuth,camElevation:L.camElevation,fov:L.fov})});const x=L=>{g.applyParams(L.params);const j=g.getCameraSpherical(),R=L.params;(Math.abs(j.camDist-R.camDist)>.01||ET(j.camAzimuth,R.camAzimuth)>.05||Math.abs(j.camElevation-R.camElevation)>.05||Math.abs(j.fov-R.fov)>.01)&&g.setCameraSpherical(R),g.setDebugView(L.debug),g.quality!==L.quality&&g.setQuality(L.quality)},S=Nt.subscribe(L=>{x(L),Pl(L)});let w=0,A=performance.now(),y=0,_=Nt.get().params.camElevation,F=!1,N=0,b=!1;const z=L=>{const j=Math.min((L-A)/1e3,.1);A=L;const R=Nt.get();c.captureMode?a.current.simTime=a.current.frozen:a.current.simTime+=j*R.params.timeScale,R.playing&&!R.capture&&(F||(_=R.params.camElevation),y+=j,Nt.setParams({camAzimuth:(R.params.camAzimuth+6*j)%360,camElevation:_+3*Math.sin(.1*y)})),F=R.playing,g.renderFrame(a.current.simTime),L-N>250&&(N=L,r(a.current.simTime)),b||(b=!0,vT(Nt,{getTime:()=>a.current.simTime,setTime:C=>(a.current.frozen=C,a.current.simTime=C,!0)}),document.documentElement.dataset.gargantuaReady="true"),w=requestAnimationFrame(z)};w=requestAnimationFrame(z);const k=xT({onDebug:L=>Nt.setDebug(L),onPreset:L=>Nt.applyPreset(L),onTogglePlayback:()=>Nt.togglePlayback(),onToggleHud:()=>Nt.toggleHud(),onCycleQuality:()=>Nt.cycleQuality(),onReset:()=>{Vm(),Nt.resetAll(),Pl(Nt.get())}});return()=>{cancelAnimationFrame(w),S(),k(),g.dispose()}},[]);const l=()=>{Vm(),Nt.resetAll(),Pl(Nt.get())};return Ie.jsxs("div",{className:"app-root",children:[Ie.jsx("div",{className:"stage",ref:s}),Ie.jsx(MT,{state:e,simTime:n,capture:e.capture,onResetAll:l,actions:{setParam:(c,d)=>Nt.setParam(c,d),applyPreset:c=>Nt.applyPreset(c),cycleQuality:()=>Nt.cycleQuality(),toggleHud:()=>Nt.toggleHud()}})]})}dv.createRoot(document.getElementById("root")).render(Ie.jsx(TT,{}));
