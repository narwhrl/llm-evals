(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(a){if(a.ep)return;a.ep=!0;const u=n(a);fetch(a.href,u)}})();function iv(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var xc={exports:{}},No={},yc={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cp;function rv(){if(Cp)return mt;Cp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=v&&N[v]||N["@@iterator"],typeof N=="function"?N:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,A={};function y(N,re,Fe){this.props=N,this.context=re,this.refs=A,this.updater=Fe||S}y.prototype.isReactComponent={},y.prototype.setState=function(N,re){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,re,"setState")},y.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function g(){}g.prototype=y.prototype;function L(N,re,Fe){this.props=N,this.context=re,this.refs=A,this.updater=Fe||S}var U=L.prototype=new g;U.constructor=L,T(U,y.prototype),U.isPureReactComponent=!0;var R=Array.isArray,Q=Object.prototype.hasOwnProperty,B={current:null},F={key:!0,ref:!0,__self:!0,__source:!0};function Y(N,re,Fe){var Z,de={},Se=null,xe=null;if(re!=null)for(Z in re.ref!==void 0&&(xe=re.ref),re.key!==void 0&&(Se=""+re.key),re)Q.call(re,Z)&&!F.hasOwnProperty(Z)&&(de[Z]=re[Z]);var Re=arguments.length-2;if(Re===1)de.children=Fe;else if(1<Re){for(var ke=Array(Re),Ke=0;Ke<Re;Ke++)ke[Ke]=arguments[Ke+2];de.children=ke}if(N&&N.defaultProps)for(Z in Re=N.defaultProps,Re)de[Z]===void 0&&(de[Z]=Re[Z]);return{$$typeof:s,type:N,key:Se,ref:xe,props:de,_owner:B.current}}function P(N,re){return{$$typeof:s,type:N.type,key:re,ref:N.ref,props:N.props,_owner:N._owner}}function C(N){return typeof N=="object"&&N!==null&&N.$$typeof===s}function z(N){var re={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Fe){return re[Fe]})}var le=/\/+/g;function te(N,re){return typeof N=="object"&&N!==null&&N.key!=null?z(""+N.key):re.toString(36)}function fe(N,re,Fe,Z,de){var Se=typeof N;(Se==="undefined"||Se==="boolean")&&(N=null);var xe=!1;if(N===null)xe=!0;else switch(Se){case"string":case"number":xe=!0;break;case"object":switch(N.$$typeof){case s:case e:xe=!0}}if(xe)return xe=N,de=de(xe),N=Z===""?"."+te(xe,0):Z,R(de)?(Fe="",N!=null&&(Fe=N.replace(le,"$&/")+"/"),fe(de,re,Fe,"",function(Ke){return Ke})):de!=null&&(C(de)&&(de=P(de,Fe+(!de.key||xe&&xe.key===de.key?"":(""+de.key).replace(le,"$&/")+"/")+N)),re.push(de)),1;if(xe=0,Z=Z===""?".":Z+":",R(N))for(var Re=0;Re<N.length;Re++){Se=N[Re];var ke=Z+te(Se,Re);xe+=fe(Se,re,Fe,ke,de)}else if(ke=x(N),typeof ke=="function")for(N=ke.call(N),Re=0;!(Se=N.next()).done;)Se=Se.value,ke=Z+te(Se,Re++),xe+=fe(Se,re,Fe,ke,de);else if(Se==="object")throw re=String(N),Error("Objects are not valid as a React child (found: "+(re==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":re)+"). If you meant to render a collection of children, use an array instead.");return xe}function me(N,re,Fe){if(N==null)return N;var Z=[],de=0;return fe(N,Z,"","",function(Se){return re.call(Fe,Se,de++)}),Z}function ue(N){if(N._status===-1){var re=N._result;re=re(),re.then(function(Fe){(N._status===0||N._status===-1)&&(N._status=1,N._result=Fe)},function(Fe){(N._status===0||N._status===-1)&&(N._status=2,N._result=Fe)}),N._status===-1&&(N._status=0,N._result=re)}if(N._status===1)return N._result.default;throw N._result}var he={current:null},k={transition:null},ce={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:k,ReactCurrentOwner:B};function oe(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:me,forEach:function(N,re,Fe){me(N,function(){re.apply(this,arguments)},Fe)},count:function(N){var re=0;return me(N,function(){re++}),re},toArray:function(N){return me(N,function(re){return re})||[]},only:function(N){if(!C(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},mt.Component=y,mt.Fragment=n,mt.Profiler=a,mt.PureComponent=L,mt.StrictMode=r,mt.Suspense=p,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ce,mt.act=oe,mt.cloneElement=function(N,re,Fe){if(N==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+N+".");var Z=T({},N.props),de=N.key,Se=N.ref,xe=N._owner;if(re!=null){if(re.ref!==void 0&&(Se=re.ref,xe=B.current),re.key!==void 0&&(de=""+re.key),N.type&&N.type.defaultProps)var Re=N.type.defaultProps;for(ke in re)Q.call(re,ke)&&!F.hasOwnProperty(ke)&&(Z[ke]=re[ke]===void 0&&Re!==void 0?Re[ke]:re[ke])}var ke=arguments.length-2;if(ke===1)Z.children=Fe;else if(1<ke){Re=Array(ke);for(var Ke=0;Ke<ke;Ke++)Re[Ke]=arguments[Ke+2];Z.children=Re}return{$$typeof:s,type:N.type,key:de,ref:Se,props:Z,_owner:xe}},mt.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},N.Provider={$$typeof:u,_context:N},N.Consumer=N},mt.createElement=Y,mt.createFactory=function(N){var re=Y.bind(null,N);return re.type=N,re},mt.createRef=function(){return{current:null}},mt.forwardRef=function(N){return{$$typeof:h,render:N}},mt.isValidElement=C,mt.lazy=function(N){return{$$typeof:_,_payload:{_status:-1,_result:N},_init:ue}},mt.memo=function(N,re){return{$$typeof:m,type:N,compare:re===void 0?null:re}},mt.startTransition=function(N){var re=k.transition;k.transition={};try{N()}finally{k.transition=re}},mt.unstable_act=oe,mt.useCallback=function(N,re){return he.current.useCallback(N,re)},mt.useContext=function(N){return he.current.useContext(N)},mt.useDebugValue=function(){},mt.useDeferredValue=function(N){return he.current.useDeferredValue(N)},mt.useEffect=function(N,re){return he.current.useEffect(N,re)},mt.useId=function(){return he.current.useId()},mt.useImperativeHandle=function(N,re,Fe){return he.current.useImperativeHandle(N,re,Fe)},mt.useInsertionEffect=function(N,re){return he.current.useInsertionEffect(N,re)},mt.useLayoutEffect=function(N,re){return he.current.useLayoutEffect(N,re)},mt.useMemo=function(N,re){return he.current.useMemo(N,re)},mt.useReducer=function(N,re,Fe){return he.current.useReducer(N,re,Fe)},mt.useRef=function(N){return he.current.useRef(N)},mt.useState=function(N){return he.current.useState(N)},mt.useSyncExternalStore=function(N,re,Fe){return he.current.useSyncExternalStore(N,re,Fe)},mt.useTransition=function(){return he.current.useTransition()},mt.version="18.3.1",mt}var Rp;function Wf(){return Rp||(Rp=1,yc.exports=rv()),yc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pp;function sv(){if(Pp)return No;Pp=1;var s=Wf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function f(h,p,m){var _,v={},x=null,S=null;m!==void 0&&(x=""+m),p.key!==void 0&&(x=""+p.key),p.ref!==void 0&&(S=p.ref);for(_ in p)r.call(p,_)&&!u.hasOwnProperty(_)&&(v[_]=p[_]);if(h&&h.defaultProps)for(_ in p=h.defaultProps,p)v[_]===void 0&&(v[_]=p[_]);return{$$typeof:e,type:h,key:x,ref:S,props:v,_owner:a.current}}return No.Fragment=n,No.jsx=f,No.jsxs=f,No}var bp;function ov(){return bp||(bp=1,xc.exports=sv()),xc.exports}var st=ov(),_r=Wf();const av=iv(_r);var nl={},Sc={exports:{}},bn={},Mc={exports:{}},Ec={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lp;function lv(){return Lp||(Lp=1,(function(s){function e(k,ce){var oe=k.length;k.push(ce);e:for(;0<oe;){var N=oe-1>>>1,re=k[N];if(0<a(re,ce))k[N]=ce,k[oe]=re,oe=N;else break e}}function n(k){return k.length===0?null:k[0]}function r(k){if(k.length===0)return null;var ce=k[0],oe=k.pop();if(oe!==ce){k[0]=oe;e:for(var N=0,re=k.length,Fe=re>>>1;N<Fe;){var Z=2*(N+1)-1,de=k[Z],Se=Z+1,xe=k[Se];if(0>a(de,oe))Se<re&&0>a(xe,de)?(k[N]=xe,k[Se]=oe,N=Se):(k[N]=de,k[Z]=oe,N=Z);else if(Se<re&&0>a(xe,oe))k[N]=xe,k[Se]=oe,N=Se;else break e}}return ce}function a(k,ce){var oe=k.sortIndex-ce.sortIndex;return oe!==0?oe:k.id-ce.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;s.unstable_now=function(){return u.now()}}else{var f=Date,h=f.now();s.unstable_now=function(){return f.now()-h}}var p=[],m=[],_=1,v=null,x=3,S=!1,T=!1,A=!1,y=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function U(k){for(var ce=n(m);ce!==null;){if(ce.callback===null)r(m);else if(ce.startTime<=k)r(m),ce.sortIndex=ce.expirationTime,e(p,ce);else break;ce=n(m)}}function R(k){if(A=!1,U(k),!T)if(n(p)!==null)T=!0,ue(Q);else{var ce=n(m);ce!==null&&he(R,ce.startTime-k)}}function Q(k,ce){T=!1,A&&(A=!1,g(Y),Y=-1),S=!0;var oe=x;try{for(U(ce),v=n(p);v!==null&&(!(v.expirationTime>ce)||k&&!z());){var N=v.callback;if(typeof N=="function"){v.callback=null,x=v.priorityLevel;var re=N(v.expirationTime<=ce);ce=s.unstable_now(),typeof re=="function"?v.callback=re:v===n(p)&&r(p),U(ce)}else r(p);v=n(p)}if(v!==null)var Fe=!0;else{var Z=n(m);Z!==null&&he(R,Z.startTime-ce),Fe=!1}return Fe}finally{v=null,x=oe,S=!1}}var B=!1,F=null,Y=-1,P=5,C=-1;function z(){return!(s.unstable_now()-C<P)}function le(){if(F!==null){var k=s.unstable_now();C=k;var ce=!0;try{ce=F(!0,k)}finally{ce?te():(B=!1,F=null)}}else B=!1}var te;if(typeof L=="function")te=function(){L(le)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,me=fe.port2;fe.port1.onmessage=le,te=function(){me.postMessage(null)}}else te=function(){y(le,0)};function ue(k){F=k,B||(B=!0,te())}function he(k,ce){Y=y(function(){k(s.unstable_now())},ce)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(k){k.callback=null},s.unstable_continueExecution=function(){T||S||(T=!0,ue(Q))},s.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<k?Math.floor(1e3/k):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return n(p)},s.unstable_next=function(k){switch(x){case 1:case 2:case 3:var ce=3;break;default:ce=x}var oe=x;x=ce;try{return k()}finally{x=oe}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(k,ce){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var oe=x;x=k;try{return ce()}finally{x=oe}},s.unstable_scheduleCallback=function(k,ce,oe){var N=s.unstable_now();switch(typeof oe=="object"&&oe!==null?(oe=oe.delay,oe=typeof oe=="number"&&0<oe?N+oe:N):oe=N,k){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=oe+re,k={id:_++,callback:ce,priorityLevel:k,startTime:oe,expirationTime:re,sortIndex:-1},oe>N?(k.sortIndex=oe,e(m,k),n(p)===null&&k===n(m)&&(A?(g(Y),Y=-1):A=!0,he(R,oe-N))):(k.sortIndex=re,e(p,k),T||S||(T=!0,ue(Q))),k},s.unstable_shouldYield=z,s.unstable_wrapCallback=function(k){var ce=x;return function(){var oe=x;x=ce;try{return k.apply(this,arguments)}finally{x=oe}}}})(Ec)),Ec}var Dp;function uv(){return Dp||(Dp=1,Mc.exports=lv()),Mc.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ip;function cv(){if(Ip)return bn;Ip=1;var s=Wf(),e=uv();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function u(t,i){f(t,i),f(t+"Capture",i)}function f(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},v={};function x(t){return p.call(v,t)?!0:p.call(_,t)?!1:m.test(t)?v[t]=!0:(_[t]=!0,!1)}function S(t,i,o,l){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return l?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function T(t,i,o,l){if(i===null||typeof i>"u"||S(t,i,o,l))return!0;if(l)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function A(t,i,o,l,c,d,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=l,this.attributeNamespace=c,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=d,this.removeEmptyString=M}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){y[t]=new A(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];y[i]=new A(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){y[t]=new A(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){y[t]=new A(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){y[t]=new A(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){y[t]=new A(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){y[t]=new A(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){y[t]=new A(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){y[t]=new A(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function L(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,L);y[i]=new A(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,L);y[i]=new A(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,L);y[i]=new A(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){y[t]=new A(t,1,!1,t.toLowerCase(),null,!1,!1)}),y.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){y[t]=new A(t,1,!1,t.toLowerCase(),null,!0,!0)});function U(t,i,o,l){var c=y.hasOwnProperty(i)?y[i]:null;(c!==null?c.type!==0:l||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(T(i,o,c,l)&&(o=null),l||c===null?x(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):c.mustUseProperty?t[c.propertyName]=o===null?c.type===3?!1:"":o:(i=c.attributeName,l=c.attributeNamespace,o===null?t.removeAttribute(i):(c=c.type,o=c===3||c===4&&o===!0?"":""+o,l?t.setAttributeNS(l,i,o):t.setAttribute(i,o))))}var R=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Q=Symbol.for("react.element"),B=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),Y=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),z=Symbol.for("react.context"),le=Symbol.for("react.forward_ref"),te=Symbol.for("react.suspense"),fe=Symbol.for("react.suspense_list"),me=Symbol.for("react.memo"),ue=Symbol.for("react.lazy"),he=Symbol.for("react.offscreen"),k=Symbol.iterator;function ce(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var oe=Object.assign,N;function re(t){if(N===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);N=i&&i[1]||""}return`
`+N+t}var Fe=!1;function Z(t,i){if(!t||Fe)return"";Fe=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ee){var l=ee}Reflect.construct(t,[],i)}else{try{i.call()}catch(ee){l=ee}t.call(i.prototype)}else{try{throw Error()}catch(ee){l=ee}t()}}catch(ee){if(ee&&l&&typeof ee.stack=="string"){for(var c=ee.stack.split(`
`),d=l.stack.split(`
`),M=c.length-1,I=d.length-1;1<=M&&0<=I&&c[M]!==d[I];)I--;for(;1<=M&&0<=I;M--,I--)if(c[M]!==d[I]){if(M!==1||I!==1)do if(M--,I--,0>I||c[M]!==d[I]){var O=`
`+c[M].replace(" at new "," at ");return t.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",t.displayName)),O}while(1<=M&&0<=I);break}}}finally{Fe=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?re(t):""}function de(t){switch(t.tag){case 5:return re(t.type);case 16:return re("Lazy");case 13:return re("Suspense");case 19:return re("SuspenseList");case 0:case 2:case 15:return t=Z(t.type,!1),t;case 11:return t=Z(t.type.render,!1),t;case 1:return t=Z(t.type,!0),t;default:return""}}function Se(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case F:return"Fragment";case B:return"Portal";case P:return"Profiler";case Y:return"StrictMode";case te:return"Suspense";case fe:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case z:return(t.displayName||"Context")+".Consumer";case C:return(t._context.displayName||"Context")+".Provider";case le:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case me:return i=t.displayName||null,i!==null?i:Se(t.type)||"Memo";case ue:i=t._payload,t=t._init;try{return Se(t(i))}catch{}}return null}function xe(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Se(i);case 8:return i===Y?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Re(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ke(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ke(t){var i=ke(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),l=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,d=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return c.call(this)},set:function(M){l=""+M,d.call(this,M)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return l},setValue:function(M){l=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function At(t){t._valueTracker||(t._valueTracker=Ke(t))}function at(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),l="";return t&&(l=ke(t)?t.checked?"true":"false":t.value),t=l,t!==o?(i.setValue(t),!0):!1}function Rt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function W(t,i){var o=i.checked;return oe({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function sn(t,i){var o=i.defaultValue==null?"":i.defaultValue,l=i.checked!=null?i.checked:i.defaultChecked;o=Re(i.value!=null?i.value:o),t._wrapperState={initialChecked:l,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function lt(t,i){i=i.checked,i!=null&&U(t,"checked",i,!1)}function ft(t,i){lt(t,i);var o=Re(i.value),l=i.type;if(o!=null)l==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(l==="submit"||l==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?Mt(t,i.type,o):i.hasOwnProperty("defaultValue")&&Mt(t,i.type,Re(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function $e(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var l=i.type;if(!(l!=="submit"&&l!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function Mt(t,i,o){(i!=="number"||Rt(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var We=Array.isArray;function b(t,i,o,l){if(t=t.options,i){i={};for(var c=0;c<o.length;c++)i["$"+o[c]]=!0;for(o=0;o<t.length;o++)c=i.hasOwnProperty("$"+t[o].value),t[o].selected!==c&&(t[o].selected=c),c&&l&&(t[o].defaultSelected=!0)}else{for(o=""+Re(o),i=null,c=0;c<t.length;c++){if(t[c].value===o){t[c].selected=!0,l&&(t[c].defaultSelected=!0);return}i!==null||t[c].disabled||(i=t[c])}i!==null&&(i.selected=!0)}}function E(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return oe({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function D(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(We(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:Re(o)}}function V(t,i){var o=Re(i.value),l=Re(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),l!=null&&(t.defaultValue=""+l)}function se(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function K(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Te(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?K(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ye,Ce=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,l,c){MSApp.execUnsafeLocalFunction(function(){return t(i,o,l,c)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(ye=ye||document.createElement("div"),ye.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=ye.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function Je(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var _e={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},be=["Webkit","ms","Moz","O"];Object.keys(_e).forEach(function(t){be.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),_e[i]=_e[t]})});function Ie(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||_e.hasOwnProperty(t)&&_e[t]?(""+i).trim():i+"px"}function ze(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var l=o.indexOf("--")===0,c=Ie(o,i[o],l);o==="float"&&(o="cssFloat"),l?t.setProperty(o,c):t[o]=c}}var Pe=oe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ut(t,i){if(i){if(Pe[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function tt(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var vt=null;function G(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Le=null,ae=null,pe=null;function Ne(t){if(t=yo(t)){if(typeof Le!="function")throw Error(n(280));var i=t.stateNode;i&&(i=_a(i),Le(t.stateNode,t.type,i))}}function Ue(t){ae?pe?pe.push(t):pe=[t]:ae=t}function ot(){if(ae){var t=ae,i=pe;if(pe=ae=null,Ne(t),i)for(t=0;t<i.length;t++)Ne(i[t])}}function It(t,i){return t(i)}function jt(){}var xt=!1;function En(t,i,o){if(xt)return t(i,o);xt=!0;try{return It(t,i,o)}finally{xt=!1,(ae!==null||pe!==null)&&(jt(),ot())}}function gn(t,i){var o=t.stateNode;if(o===null)return null;var l=_a(o);if(l===null)return null;o=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var is=!1;if(h)try{var Wi={};Object.defineProperty(Wi,"passive",{get:function(){is=!0}}),window.addEventListener("test",Wi,Wi),window.removeEventListener("test",Wi,Wi)}catch{is=!1}function Ei(t,i,o,l,c,d,M,I,O){var ee=Array.prototype.slice.call(arguments,3);try{i.apply(o,ee)}catch(ve){this.onError(ve)}}var Ti=!1,Tr=null,wr=!1,Xi=null,Zo={onError:function(t){Ti=!0,Tr=t}};function rs(t,i,o,l,c,d,M,I,O){Ti=!1,Tr=null,Ei.apply(Zo,arguments)}function Qo(t,i,o,l,c,d,M,I,O){if(rs.apply(this,arguments),Ti){if(Ti){var ee=Tr;Ti=!1,Tr=null}else throw Error(n(198));wr||(wr=!0,Xi=ee)}}function di(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Jo(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function ea(t){if(di(t)!==t)throw Error(n(188))}function Hl(t){var i=t.alternate;if(!i){if(i=di(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,l=i;;){var c=o.return;if(c===null)break;var d=c.alternate;if(d===null){if(l=c.return,l!==null){o=l;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===o)return ea(c),t;if(d===l)return ea(c),i;d=d.sibling}throw Error(n(188))}if(o.return!==l.return)o=c,l=d;else{for(var M=!1,I=c.child;I;){if(I===o){M=!0,o=c,l=d;break}if(I===l){M=!0,l=c,o=d;break}I=I.sibling}if(!M){for(I=d.child;I;){if(I===o){M=!0,o=d,l=c;break}if(I===l){M=!0,l=d,o=c;break}I=I.sibling}if(!M)throw Error(n(189))}}if(o.alternate!==l)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function w(t){return t=Hl(t),t!==null?X(t):null}function X(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=X(t);if(i!==null)return i;t=t.sibling}return null}var ne=e.unstable_scheduleCallback,ie=e.unstable_cancelCallback,j=e.unstable_shouldYield,Ae=e.unstable_requestPaint,Ee=e.unstable_now,Xe=e.unstable_getCurrentPriorityLevel,Ve=e.unstable_ImmediatePriority,nt=e.unstable_UserBlockingPriority,rt=e.unstable_NormalPriority,je=e.unstable_LowPriority,_t=e.unstable_IdlePriority,wt=null,gt=null;function ln(t){if(gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(wt,t,void 0,(t.current.flags&128)===128)}catch{}}var ct=Math.clz32?Math.clz32:Et,qe=Math.log,Jn=Math.LN2;function Et(t){return t>>>=0,t===0?32:31-(qe(t)/Jn|0)|0}var un=64,ei=4194304;function Yt(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function pi(t,i){var o=t.pendingLanes;if(o===0)return 0;var l=0,c=t.suspendedLanes,d=t.pingedLanes,M=o&268435455;if(M!==0){var I=M&~c;I!==0?l=Yt(I):(d&=M,d!==0&&(l=Yt(d)))}else M=o&~c,M!==0?l=Yt(M):d!==0&&(l=Yt(d));if(l===0)return 0;if(i!==0&&i!==l&&(i&c)===0&&(c=l&-l,d=i&-i,c>=d||c===16&&(d&4194240)!==0))return i;if((l&4)!==0&&(l|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=l;0<i;)o=31-ct(i),c=1<<o,l|=t[o],i&=~c;return l}function Lt(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Hn(t,i){for(var o=t.suspendedLanes,l=t.pingedLanes,c=t.expirationTimes,d=t.pendingLanes;0<d;){var M=31-ct(d),I=1<<M,O=c[M];O===-1?((I&o)===0||(I&l)!==0)&&(c[M]=Lt(I,i)):O<=i&&(t.expiredLanes|=I),d&=~I}}function wi(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function _n(){var t=un;return un<<=1,(un&4194240)===0&&(un=64),t}function Vn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function Tn(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-ct(i),t[i]=o}function ta(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var l=t.eventTimes;for(t=t.expirationTimes;0<o;){var c=31-ct(o),d=1<<c;i[c]=0,l[c]=-1,t[c]=-1,o&=~d}}function Vl(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var l=31-ct(o),c=1<<l;c&i|t[l]&i&&(t[l]|=i),o&=~c}}var Ct=0;function sh(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var oh,Gl,ah,lh,uh,Wl=!1,na=[],ji=null,Yi=null,qi=null,io=new Map,ro=new Map,Ki=[],wg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ch(t,i){switch(t){case"focusin":case"focusout":ji=null;break;case"dragenter":case"dragleave":Yi=null;break;case"mouseover":case"mouseout":qi=null;break;case"pointerover":case"pointerout":io.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":ro.delete(i.pointerId)}}function so(t,i,o,l,c,d){return t===null||t.nativeEvent!==d?(t={blockedOn:i,domEventName:o,eventSystemFlags:l,nativeEvent:d,targetContainers:[c]},i!==null&&(i=yo(i),i!==null&&Gl(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,c!==null&&i.indexOf(c)===-1&&i.push(c),t)}function Ag(t,i,o,l,c){switch(i){case"focusin":return ji=so(ji,t,i,o,l,c),!0;case"dragenter":return Yi=so(Yi,t,i,o,l,c),!0;case"mouseover":return qi=so(qi,t,i,o,l,c),!0;case"pointerover":var d=c.pointerId;return io.set(d,so(io.get(d)||null,t,i,o,l,c)),!0;case"gotpointercapture":return d=c.pointerId,ro.set(d,so(ro.get(d)||null,t,i,o,l,c)),!0}return!1}function fh(t){var i=Ar(t.target);if(i!==null){var o=di(i);if(o!==null){if(i=o.tag,i===13){if(i=Jo(o),i!==null){t.blockedOn=i,uh(t.priority,function(){ah(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ia(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=jl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var l=new o.constructor(o.type,o);vt=l,o.target.dispatchEvent(l),vt=null}else return i=yo(o),i!==null&&Gl(i),t.blockedOn=o,!1;i.shift()}return!0}function hh(t,i,o){ia(t)&&o.delete(i)}function Cg(){Wl=!1,ji!==null&&ia(ji)&&(ji=null),Yi!==null&&ia(Yi)&&(Yi=null),qi!==null&&ia(qi)&&(qi=null),io.forEach(hh),ro.forEach(hh)}function oo(t,i){t.blockedOn===i&&(t.blockedOn=null,Wl||(Wl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Cg)))}function ao(t){function i(c){return oo(c,t)}if(0<na.length){oo(na[0],t);for(var o=1;o<na.length;o++){var l=na[o];l.blockedOn===t&&(l.blockedOn=null)}}for(ji!==null&&oo(ji,t),Yi!==null&&oo(Yi,t),qi!==null&&oo(qi,t),io.forEach(i),ro.forEach(i),o=0;o<Ki.length;o++)l=Ki[o],l.blockedOn===t&&(l.blockedOn=null);for(;0<Ki.length&&(o=Ki[0],o.blockedOn===null);)fh(o),o.blockedOn===null&&Ki.shift()}var ss=R.ReactCurrentBatchConfig,ra=!0;function Rg(t,i,o,l){var c=Ct,d=ss.transition;ss.transition=null;try{Ct=1,Xl(t,i,o,l)}finally{Ct=c,ss.transition=d}}function Pg(t,i,o,l){var c=Ct,d=ss.transition;ss.transition=null;try{Ct=4,Xl(t,i,o,l)}finally{Ct=c,ss.transition=d}}function Xl(t,i,o,l){if(ra){var c=jl(t,i,o,l);if(c===null)uu(t,i,l,sa,o),ch(t,l);else if(Ag(c,t,i,o,l))l.stopPropagation();else if(ch(t,l),i&4&&-1<wg.indexOf(t)){for(;c!==null;){var d=yo(c);if(d!==null&&oh(d),d=jl(t,i,o,l),d===null&&uu(t,i,l,sa,o),d===c)break;c=d}c!==null&&l.stopPropagation()}else uu(t,i,l,null,o)}}var sa=null;function jl(t,i,o,l){if(sa=null,t=G(l),t=Ar(t),t!==null)if(i=di(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Jo(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return sa=t,null}function dh(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Xe()){case Ve:return 1;case nt:return 4;case rt:case je:return 16;case _t:return 536870912;default:return 16}default:return 16}}var $i=null,Yl=null,oa=null;function ph(){if(oa)return oa;var t,i=Yl,o=i.length,l,c="value"in $i?$i.value:$i.textContent,d=c.length;for(t=0;t<o&&i[t]===c[t];t++);var M=o-t;for(l=1;l<=M&&i[o-l]===c[d-l];l++);return oa=c.slice(t,1<l?1-l:void 0)}function aa(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function la(){return!0}function mh(){return!1}function Un(t){function i(o,l,c,d,M){this._reactName=o,this._targetInst=c,this.type=l,this.nativeEvent=d,this.target=M,this.currentTarget=null;for(var I in t)t.hasOwnProperty(I)&&(o=t[I],this[I]=o?o(d):d[I]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?la:mh,this.isPropagationStopped=mh,this}return oe(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=la)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=la)},persist:function(){},isPersistent:la}),i}var os={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ql=Un(os),lo=oe({},os,{view:0,detail:0}),bg=Un(lo),Kl,$l,uo,ua=oe({},lo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ql,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==uo&&(uo&&t.type==="mousemove"?(Kl=t.screenX-uo.screenX,$l=t.screenY-uo.screenY):$l=Kl=0,uo=t),Kl)},movementY:function(t){return"movementY"in t?t.movementY:$l}}),gh=Un(ua),Lg=oe({},ua,{dataTransfer:0}),Dg=Un(Lg),Ig=oe({},lo,{relatedTarget:0}),Zl=Un(Ig),Ug=oe({},os,{animationName:0,elapsedTime:0,pseudoElement:0}),Ng=Un(Ug),Fg=oe({},os,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Og=Un(Fg),kg=oe({},os,{data:0}),_h=Un(kg),zg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Vg(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Hg[t])?!!i[t]:!1}function Ql(){return Vg}var Gg=oe({},lo,{key:function(t){if(t.key){var i=zg[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=aa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Bg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ql,charCode:function(t){return t.type==="keypress"?aa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?aa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Wg=Un(Gg),Xg=oe({},ua,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vh=Un(Xg),jg=oe({},lo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ql}),Yg=Un(jg),qg=oe({},os,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kg=Un(qg),$g=oe({},ua,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Zg=Un($g),Qg=[9,13,27,32],Jl=h&&"CompositionEvent"in window,co=null;h&&"documentMode"in document&&(co=document.documentMode);var Jg=h&&"TextEvent"in window&&!co,xh=h&&(!Jl||co&&8<co&&11>=co),yh=" ",Sh=!1;function Mh(t,i){switch(t){case"keyup":return Qg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Eh(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var as=!1;function e_(t,i){switch(t){case"compositionend":return Eh(i);case"keypress":return i.which!==32?null:(Sh=!0,yh);case"textInput":return t=i.data,t===yh&&Sh?null:t;default:return null}}function t_(t,i){if(as)return t==="compositionend"||!Jl&&Mh(t,i)?(t=ph(),oa=Yl=$i=null,as=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return xh&&i.locale!=="ko"?null:i.data;default:return null}}var n_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Th(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!n_[t.type]:i==="textarea"}function wh(t,i,o,l){Ue(l),i=pa(i,"onChange"),0<i.length&&(o=new ql("onChange","change",null,o,l),t.push({event:o,listeners:i}))}var fo=null,ho=null;function i_(t){Gh(t,0)}function ca(t){var i=hs(t);if(at(i))return t}function r_(t,i){if(t==="change")return i}var Ah=!1;if(h){var eu;if(h){var tu="oninput"in document;if(!tu){var Ch=document.createElement("div");Ch.setAttribute("oninput","return;"),tu=typeof Ch.oninput=="function"}eu=tu}else eu=!1;Ah=eu&&(!document.documentMode||9<document.documentMode)}function Rh(){fo&&(fo.detachEvent("onpropertychange",Ph),ho=fo=null)}function Ph(t){if(t.propertyName==="value"&&ca(ho)){var i=[];wh(i,ho,t,G(t)),En(i_,i)}}function s_(t,i,o){t==="focusin"?(Rh(),fo=i,ho=o,fo.attachEvent("onpropertychange",Ph)):t==="focusout"&&Rh()}function o_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ca(ho)}function a_(t,i){if(t==="click")return ca(i)}function l_(t,i){if(t==="input"||t==="change")return ca(i)}function u_(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ti=typeof Object.is=="function"?Object.is:u_;function po(t,i){if(ti(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),l=Object.keys(i);if(o.length!==l.length)return!1;for(l=0;l<o.length;l++){var c=o[l];if(!p.call(i,c)||!ti(t[c],i[c]))return!1}return!0}function bh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Lh(t,i){var o=bh(t);t=0;for(var l;o;){if(o.nodeType===3){if(l=t+o.textContent.length,t<=i&&l>=i)return{node:o,offset:i-t};t=l}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=bh(o)}}function Dh(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Dh(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Ih(){for(var t=window,i=Rt();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=Rt(t.document)}return i}function nu(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function c_(t){var i=Ih(),o=t.focusedElem,l=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&Dh(o.ownerDocument.documentElement,o)){if(l!==null&&nu(o)){if(i=l.start,t=l.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var c=o.textContent.length,d=Math.min(l.start,c);l=l.end===void 0?d:Math.min(l.end,c),!t.extend&&d>l&&(c=l,l=d,d=c),c=Lh(o,d);var M=Lh(o,l);c&&M&&(t.rangeCount!==1||t.anchorNode!==c.node||t.anchorOffset!==c.offset||t.focusNode!==M.node||t.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(c.node,c.offset),t.removeAllRanges(),d>l?(t.addRange(i),t.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var f_=h&&"documentMode"in document&&11>=document.documentMode,ls=null,iu=null,mo=null,ru=!1;function Uh(t,i,o){var l=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;ru||ls==null||ls!==Rt(l)||(l=ls,"selectionStart"in l&&nu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),mo&&po(mo,l)||(mo=l,l=pa(iu,"onSelect"),0<l.length&&(i=new ql("onSelect","select",null,i,o),t.push({event:i,listeners:l}),i.target=ls)))}function fa(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var us={animationend:fa("Animation","AnimationEnd"),animationiteration:fa("Animation","AnimationIteration"),animationstart:fa("Animation","AnimationStart"),transitionend:fa("Transition","TransitionEnd")},su={},Nh={};h&&(Nh=document.createElement("div").style,"AnimationEvent"in window||(delete us.animationend.animation,delete us.animationiteration.animation,delete us.animationstart.animation),"TransitionEvent"in window||delete us.transitionend.transition);function ha(t){if(su[t])return su[t];if(!us[t])return t;var i=us[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in Nh)return su[t]=i[o];return t}var Fh=ha("animationend"),Oh=ha("animationiteration"),kh=ha("animationstart"),zh=ha("transitionend"),Bh=new Map,Hh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Zi(t,i){Bh.set(t,i),u(i,[t])}for(var ou=0;ou<Hh.length;ou++){var au=Hh[ou],h_=au.toLowerCase(),d_=au[0].toUpperCase()+au.slice(1);Zi(h_,"on"+d_)}Zi(Fh,"onAnimationEnd"),Zi(Oh,"onAnimationIteration"),Zi(kh,"onAnimationStart"),Zi("dblclick","onDoubleClick"),Zi("focusin","onFocus"),Zi("focusout","onBlur"),Zi(zh,"onTransitionEnd"),f("onMouseEnter",["mouseout","mouseover"]),f("onMouseLeave",["mouseout","mouseover"]),f("onPointerEnter",["pointerout","pointerover"]),f("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var go="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p_=new Set("cancel close invalid load scroll toggle".split(" ").concat(go));function Vh(t,i,o){var l=t.type||"unknown-event";t.currentTarget=o,Qo(l,i,void 0,t),t.currentTarget=null}function Gh(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var l=t[o],c=l.event;l=l.listeners;e:{var d=void 0;if(i)for(var M=l.length-1;0<=M;M--){var I=l[M],O=I.instance,ee=I.currentTarget;if(I=I.listener,O!==d&&c.isPropagationStopped())break e;Vh(c,I,ee),d=O}else for(M=0;M<l.length;M++){if(I=l[M],O=I.instance,ee=I.currentTarget,I=I.listener,O!==d&&c.isPropagationStopped())break e;Vh(c,I,ee),d=O}}}if(wr)throw t=Xi,wr=!1,Xi=null,t}function Ut(t,i){var o=i[mu];o===void 0&&(o=i[mu]=new Set);var l=t+"__bubble";o.has(l)||(Wh(i,t,2,!1),o.add(l))}function lu(t,i,o){var l=0;i&&(l|=4),Wh(o,t,l,i)}var da="_reactListening"+Math.random().toString(36).slice(2);function _o(t){if(!t[da]){t[da]=!0,r.forEach(function(o){o!=="selectionchange"&&(p_.has(o)||lu(o,!1,t),lu(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[da]||(i[da]=!0,lu("selectionchange",!1,i))}}function Wh(t,i,o,l){switch(dh(i)){case 1:var c=Rg;break;case 4:c=Pg;break;default:c=Xl}o=c.bind(null,i,o,t),c=void 0,!is||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(c=!0),l?c!==void 0?t.addEventListener(i,o,{capture:!0,passive:c}):t.addEventListener(i,o,!0):c!==void 0?t.addEventListener(i,o,{passive:c}):t.addEventListener(i,o,!1)}function uu(t,i,o,l,c){var d=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var I=l.stateNode.containerInfo;if(I===c||I.nodeType===8&&I.parentNode===c)break;if(M===4)for(M=l.return;M!==null;){var O=M.tag;if((O===3||O===4)&&(O=M.stateNode.containerInfo,O===c||O.nodeType===8&&O.parentNode===c))return;M=M.return}for(;I!==null;){if(M=Ar(I),M===null)return;if(O=M.tag,O===5||O===6){l=d=M;continue e}I=I.parentNode}}l=l.return}En(function(){var ee=d,ve=G(o),Me=[];e:{var ge=Bh.get(t);if(ge!==void 0){var Oe=ql,He=t;switch(t){case"keypress":if(aa(o)===0)break e;case"keydown":case"keyup":Oe=Wg;break;case"focusin":He="focus",Oe=Zl;break;case"focusout":He="blur",Oe=Zl;break;case"beforeblur":case"afterblur":Oe=Zl;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Oe=gh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Oe=Dg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Oe=Yg;break;case Fh:case Oh:case kh:Oe=Ng;break;case zh:Oe=Kg;break;case"scroll":Oe=bg;break;case"wheel":Oe=Zg;break;case"copy":case"cut":case"paste":Oe=Og;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Oe=vh}var Ge=(i&4)!==0,Gt=!Ge&&t==="scroll",q=Ge?ge!==null?ge+"Capture":null:ge;Ge=[];for(var H=ee,$;H!==null;){$=H;var we=$.stateNode;if($.tag===5&&we!==null&&($=we,q!==null&&(we=gn(H,q),we!=null&&Ge.push(vo(H,we,$)))),Gt)break;H=H.return}0<Ge.length&&(ge=new Oe(ge,He,null,o,ve),Me.push({event:ge,listeners:Ge}))}}if((i&7)===0){e:{if(ge=t==="mouseover"||t==="pointerover",Oe=t==="mouseout"||t==="pointerout",ge&&o!==vt&&(He=o.relatedTarget||o.fromElement)&&(Ar(He)||He[Ai]))break e;if((Oe||ge)&&(ge=ve.window===ve?ve:(ge=ve.ownerDocument)?ge.defaultView||ge.parentWindow:window,Oe?(He=o.relatedTarget||o.toElement,Oe=ee,He=He?Ar(He):null,He!==null&&(Gt=di(He),He!==Gt||He.tag!==5&&He.tag!==6)&&(He=null)):(Oe=null,He=ee),Oe!==He)){if(Ge=gh,we="onMouseLeave",q="onMouseEnter",H="mouse",(t==="pointerout"||t==="pointerover")&&(Ge=vh,we="onPointerLeave",q="onPointerEnter",H="pointer"),Gt=Oe==null?ge:hs(Oe),$=He==null?ge:hs(He),ge=new Ge(we,H+"leave",Oe,o,ve),ge.target=Gt,ge.relatedTarget=$,we=null,Ar(ve)===ee&&(Ge=new Ge(q,H+"enter",He,o,ve),Ge.target=$,Ge.relatedTarget=Gt,we=Ge),Gt=we,Oe&&He)t:{for(Ge=Oe,q=He,H=0,$=Ge;$;$=cs($))H++;for($=0,we=q;we;we=cs(we))$++;for(;0<H-$;)Ge=cs(Ge),H--;for(;0<$-H;)q=cs(q),$--;for(;H--;){if(Ge===q||q!==null&&Ge===q.alternate)break t;Ge=cs(Ge),q=cs(q)}Ge=null}else Ge=null;Oe!==null&&Xh(Me,ge,Oe,Ge,!1),He!==null&&Gt!==null&&Xh(Me,Gt,He,Ge,!0)}}e:{if(ge=ee?hs(ee):window,Oe=ge.nodeName&&ge.nodeName.toLowerCase(),Oe==="select"||Oe==="input"&&ge.type==="file")var Ye=r_;else if(Th(ge))if(Ah)Ye=l_;else{Ye=o_;var Ze=s_}else(Oe=ge.nodeName)&&Oe.toLowerCase()==="input"&&(ge.type==="checkbox"||ge.type==="radio")&&(Ye=a_);if(Ye&&(Ye=Ye(t,ee))){wh(Me,Ye,o,ve);break e}Ze&&Ze(t,ge,ee),t==="focusout"&&(Ze=ge._wrapperState)&&Ze.controlled&&ge.type==="number"&&Mt(ge,"number",ge.value)}switch(Ze=ee?hs(ee):window,t){case"focusin":(Th(Ze)||Ze.contentEditable==="true")&&(ls=Ze,iu=ee,mo=null);break;case"focusout":mo=iu=ls=null;break;case"mousedown":ru=!0;break;case"contextmenu":case"mouseup":case"dragend":ru=!1,Uh(Me,o,ve);break;case"selectionchange":if(f_)break;case"keydown":case"keyup":Uh(Me,o,ve)}var Qe;if(Jl)e:{switch(t){case"compositionstart":var it="onCompositionStart";break e;case"compositionend":it="onCompositionEnd";break e;case"compositionupdate":it="onCompositionUpdate";break e}it=void 0}else as?Mh(t,o)&&(it="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(it="onCompositionStart");it&&(xh&&o.locale!=="ko"&&(as||it!=="onCompositionStart"?it==="onCompositionEnd"&&as&&(Qe=ph()):($i=ve,Yl="value"in $i?$i.value:$i.textContent,as=!0)),Ze=pa(ee,it),0<Ze.length&&(it=new _h(it,t,null,o,ve),Me.push({event:it,listeners:Ze}),Qe?it.data=Qe:(Qe=Eh(o),Qe!==null&&(it.data=Qe)))),(Qe=Jg?e_(t,o):t_(t,o))&&(ee=pa(ee,"onBeforeInput"),0<ee.length&&(ve=new _h("onBeforeInput","beforeinput",null,o,ve),Me.push({event:ve,listeners:ee}),ve.data=Qe))}Gh(Me,i)})}function vo(t,i,o){return{instance:t,listener:i,currentTarget:o}}function pa(t,i){for(var o=i+"Capture",l=[];t!==null;){var c=t,d=c.stateNode;c.tag===5&&d!==null&&(c=d,d=gn(t,o),d!=null&&l.unshift(vo(t,d,c)),d=gn(t,i),d!=null&&l.push(vo(t,d,c))),t=t.return}return l}function cs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Xh(t,i,o,l,c){for(var d=i._reactName,M=[];o!==null&&o!==l;){var I=o,O=I.alternate,ee=I.stateNode;if(O!==null&&O===l)break;I.tag===5&&ee!==null&&(I=ee,c?(O=gn(o,d),O!=null&&M.unshift(vo(o,O,I))):c||(O=gn(o,d),O!=null&&M.push(vo(o,O,I)))),o=o.return}M.length!==0&&t.push({event:i,listeners:M})}var m_=/\r\n?/g,g_=/\u0000|\uFFFD/g;function jh(t){return(typeof t=="string"?t:""+t).replace(m_,`
`).replace(g_,"")}function ma(t,i,o){if(i=jh(i),jh(t)!==i&&o)throw Error(n(425))}function ga(){}var cu=null,fu=null;function hu(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var du=typeof setTimeout=="function"?setTimeout:void 0,__=typeof clearTimeout=="function"?clearTimeout:void 0,Yh=typeof Promise=="function"?Promise:void 0,v_=typeof queueMicrotask=="function"?queueMicrotask:typeof Yh<"u"?function(t){return Yh.resolve(null).then(t).catch(x_)}:du;function x_(t){setTimeout(function(){throw t})}function pu(t,i){var o=i,l=0;do{var c=o.nextSibling;if(t.removeChild(o),c&&c.nodeType===8)if(o=c.data,o==="/$"){if(l===0){t.removeChild(c),ao(i);return}l--}else o!=="$"&&o!=="$?"&&o!=="$!"||l++;o=c}while(o);ao(i)}function Qi(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function qh(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var fs=Math.random().toString(36).slice(2),mi="__reactFiber$"+fs,xo="__reactProps$"+fs,Ai="__reactContainer$"+fs,mu="__reactEvents$"+fs,y_="__reactListeners$"+fs,S_="__reactHandles$"+fs;function Ar(t){var i=t[mi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ai]||o[mi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=qh(t);t!==null;){if(o=t[mi])return o;t=qh(t)}return i}t=o,o=t.parentNode}return null}function yo(t){return t=t[mi]||t[Ai],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function hs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function _a(t){return t[xo]||null}var gu=[],ds=-1;function Ji(t){return{current:t}}function Nt(t){0>ds||(t.current=gu[ds],gu[ds]=null,ds--)}function Dt(t,i){ds++,gu[ds]=t.current,t.current=i}var er={},cn=Ji(er),wn=Ji(!1),Cr=er;function ps(t,i){var o=t.type.contextTypes;if(!o)return er;var l=t.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===i)return l.__reactInternalMemoizedMaskedChildContext;var c={},d;for(d in o)c[d]=i[d];return l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=c),c}function An(t){return t=t.childContextTypes,t!=null}function va(){Nt(wn),Nt(cn)}function Kh(t,i,o){if(cn.current!==er)throw Error(n(168));Dt(cn,i),Dt(wn,o)}function $h(t,i,o){var l=t.stateNode;if(i=i.childContextTypes,typeof l.getChildContext!="function")return o;l=l.getChildContext();for(var c in l)if(!(c in i))throw Error(n(108,xe(t)||"Unknown",c));return oe({},o,l)}function xa(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||er,Cr=cn.current,Dt(cn,t),Dt(wn,wn.current),!0}function Zh(t,i,o){var l=t.stateNode;if(!l)throw Error(n(169));o?(t=$h(t,i,Cr),l.__reactInternalMemoizedMergedChildContext=t,Nt(wn),Nt(cn),Dt(cn,t)):Nt(wn),Dt(wn,o)}var Ci=null,ya=!1,_u=!1;function Qh(t){Ci===null?Ci=[t]:Ci.push(t)}function M_(t){ya=!0,Qh(t)}function tr(){if(!_u&&Ci!==null){_u=!0;var t=0,i=Ct;try{var o=Ci;for(Ct=1;t<o.length;t++){var l=o[t];do l=l(!0);while(l!==null)}Ci=null,ya=!1}catch(c){throw Ci!==null&&(Ci=Ci.slice(t+1)),ne(Ve,tr),c}finally{Ct=i,_u=!1}}return null}var ms=[],gs=0,Sa=null,Ma=0,Gn=[],Wn=0,Rr=null,Ri=1,Pi="";function Pr(t,i){ms[gs++]=Ma,ms[gs++]=Sa,Sa=t,Ma=i}function Jh(t,i,o){Gn[Wn++]=Ri,Gn[Wn++]=Pi,Gn[Wn++]=Rr,Rr=t;var l=Ri;t=Pi;var c=32-ct(l)-1;l&=~(1<<c),o+=1;var d=32-ct(i)+c;if(30<d){var M=c-c%5;d=(l&(1<<M)-1).toString(32),l>>=M,c-=M,Ri=1<<32-ct(i)+c|o<<c|l,Pi=d+t}else Ri=1<<d|o<<c|l,Pi=t}function vu(t){t.return!==null&&(Pr(t,1),Jh(t,1,0))}function xu(t){for(;t===Sa;)Sa=ms[--gs],ms[gs]=null,Ma=ms[--gs],ms[gs]=null;for(;t===Rr;)Rr=Gn[--Wn],Gn[Wn]=null,Pi=Gn[--Wn],Gn[Wn]=null,Ri=Gn[--Wn],Gn[Wn]=null}var Nn=null,Fn=null,kt=!1,ni=null;function ed(t,i){var o=qn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function td(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Nn=t,Fn=Qi(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Nn=t,Fn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Rr!==null?{id:Ri,overflow:Pi}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=qn(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Nn=t,Fn=null,!0):!1;default:return!1}}function yu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Su(t){if(kt){var i=Fn;if(i){var o=i;if(!td(t,i)){if(yu(t))throw Error(n(418));i=Qi(o.nextSibling);var l=Nn;i&&td(t,i)?ed(l,o):(t.flags=t.flags&-4097|2,kt=!1,Nn=t)}}else{if(yu(t))throw Error(n(418));t.flags=t.flags&-4097|2,kt=!1,Nn=t}}}function nd(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Nn=t}function Ea(t){if(t!==Nn)return!1;if(!kt)return nd(t),kt=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!hu(t.type,t.memoizedProps)),i&&(i=Fn)){if(yu(t))throw id(),Error(n(418));for(;i;)ed(t,i),i=Qi(i.nextSibling)}if(nd(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){Fn=Qi(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}Fn=null}}else Fn=Nn?Qi(t.stateNode.nextSibling):null;return!0}function id(){for(var t=Fn;t;)t=Qi(t.nextSibling)}function _s(){Fn=Nn=null,kt=!1}function Mu(t){ni===null?ni=[t]:ni.push(t)}var E_=R.ReactCurrentBatchConfig;function So(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var l=o.stateNode}if(!l)throw Error(n(147,t));var c=l,d=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===d?i.ref:(i=function(M){var I=c.refs;M===null?delete I[d]:I[d]=M},i._stringRef=d,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Ta(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function rd(t){var i=t._init;return i(t._payload)}function sd(t){function i(q,H){if(t){var $=q.deletions;$===null?(q.deletions=[H],q.flags|=16):$.push(H)}}function o(q,H){if(!t)return null;for(;H!==null;)i(q,H),H=H.sibling;return null}function l(q,H){for(q=new Map;H!==null;)H.key!==null?q.set(H.key,H):q.set(H.index,H),H=H.sibling;return q}function c(q,H){return q=ur(q,H),q.index=0,q.sibling=null,q}function d(q,H,$){return q.index=$,t?($=q.alternate,$!==null?($=$.index,$<H?(q.flags|=2,H):$):(q.flags|=2,H)):(q.flags|=1048576,H)}function M(q){return t&&q.alternate===null&&(q.flags|=2),q}function I(q,H,$,we){return H===null||H.tag!==6?(H=dc($,q.mode,we),H.return=q,H):(H=c(H,$),H.return=q,H)}function O(q,H,$,we){var Ye=$.type;return Ye===F?ve(q,H,$.props.children,we,$.key):H!==null&&(H.elementType===Ye||typeof Ye=="object"&&Ye!==null&&Ye.$$typeof===ue&&rd(Ye)===H.type)?(we=c(H,$.props),we.ref=So(q,H,$),we.return=q,we):(we=qa($.type,$.key,$.props,null,q.mode,we),we.ref=So(q,H,$),we.return=q,we)}function ee(q,H,$,we){return H===null||H.tag!==4||H.stateNode.containerInfo!==$.containerInfo||H.stateNode.implementation!==$.implementation?(H=pc($,q.mode,we),H.return=q,H):(H=c(H,$.children||[]),H.return=q,H)}function ve(q,H,$,we,Ye){return H===null||H.tag!==7?(H=Or($,q.mode,we,Ye),H.return=q,H):(H=c(H,$),H.return=q,H)}function Me(q,H,$){if(typeof H=="string"&&H!==""||typeof H=="number")return H=dc(""+H,q.mode,$),H.return=q,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case Q:return $=qa(H.type,H.key,H.props,null,q.mode,$),$.ref=So(q,null,H),$.return=q,$;case B:return H=pc(H,q.mode,$),H.return=q,H;case ue:var we=H._init;return Me(q,we(H._payload),$)}if(We(H)||ce(H))return H=Or(H,q.mode,$,null),H.return=q,H;Ta(q,H)}return null}function ge(q,H,$,we){var Ye=H!==null?H.key:null;if(typeof $=="string"&&$!==""||typeof $=="number")return Ye!==null?null:I(q,H,""+$,we);if(typeof $=="object"&&$!==null){switch($.$$typeof){case Q:return $.key===Ye?O(q,H,$,we):null;case B:return $.key===Ye?ee(q,H,$,we):null;case ue:return Ye=$._init,ge(q,H,Ye($._payload),we)}if(We($)||ce($))return Ye!==null?null:ve(q,H,$,we,null);Ta(q,$)}return null}function Oe(q,H,$,we,Ye){if(typeof we=="string"&&we!==""||typeof we=="number")return q=q.get($)||null,I(H,q,""+we,Ye);if(typeof we=="object"&&we!==null){switch(we.$$typeof){case Q:return q=q.get(we.key===null?$:we.key)||null,O(H,q,we,Ye);case B:return q=q.get(we.key===null?$:we.key)||null,ee(H,q,we,Ye);case ue:var Ze=we._init;return Oe(q,H,$,Ze(we._payload),Ye)}if(We(we)||ce(we))return q=q.get($)||null,ve(H,q,we,Ye,null);Ta(H,we)}return null}function He(q,H,$,we){for(var Ye=null,Ze=null,Qe=H,it=H=0,tn=null;Qe!==null&&it<$.length;it++){Qe.index>it?(tn=Qe,Qe=null):tn=Qe.sibling;var Tt=ge(q,Qe,$[it],we);if(Tt===null){Qe===null&&(Qe=tn);break}t&&Qe&&Tt.alternate===null&&i(q,Qe),H=d(Tt,H,it),Ze===null?Ye=Tt:Ze.sibling=Tt,Ze=Tt,Qe=tn}if(it===$.length)return o(q,Qe),kt&&Pr(q,it),Ye;if(Qe===null){for(;it<$.length;it++)Qe=Me(q,$[it],we),Qe!==null&&(H=d(Qe,H,it),Ze===null?Ye=Qe:Ze.sibling=Qe,Ze=Qe);return kt&&Pr(q,it),Ye}for(Qe=l(q,Qe);it<$.length;it++)tn=Oe(Qe,q,it,$[it],we),tn!==null&&(t&&tn.alternate!==null&&Qe.delete(tn.key===null?it:tn.key),H=d(tn,H,it),Ze===null?Ye=tn:Ze.sibling=tn,Ze=tn);return t&&Qe.forEach(function(cr){return i(q,cr)}),kt&&Pr(q,it),Ye}function Ge(q,H,$,we){var Ye=ce($);if(typeof Ye!="function")throw Error(n(150));if($=Ye.call($),$==null)throw Error(n(151));for(var Ze=Ye=null,Qe=H,it=H=0,tn=null,Tt=$.next();Qe!==null&&!Tt.done;it++,Tt=$.next()){Qe.index>it?(tn=Qe,Qe=null):tn=Qe.sibling;var cr=ge(q,Qe,Tt.value,we);if(cr===null){Qe===null&&(Qe=tn);break}t&&Qe&&cr.alternate===null&&i(q,Qe),H=d(cr,H,it),Ze===null?Ye=cr:Ze.sibling=cr,Ze=cr,Qe=tn}if(Tt.done)return o(q,Qe),kt&&Pr(q,it),Ye;if(Qe===null){for(;!Tt.done;it++,Tt=$.next())Tt=Me(q,Tt.value,we),Tt!==null&&(H=d(Tt,H,it),Ze===null?Ye=Tt:Ze.sibling=Tt,Ze=Tt);return kt&&Pr(q,it),Ye}for(Qe=l(q,Qe);!Tt.done;it++,Tt=$.next())Tt=Oe(Qe,q,it,Tt.value,we),Tt!==null&&(t&&Tt.alternate!==null&&Qe.delete(Tt.key===null?it:Tt.key),H=d(Tt,H,it),Ze===null?Ye=Tt:Ze.sibling=Tt,Ze=Tt);return t&&Qe.forEach(function(nv){return i(q,nv)}),kt&&Pr(q,it),Ye}function Gt(q,H,$,we){if(typeof $=="object"&&$!==null&&$.type===F&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case Q:e:{for(var Ye=$.key,Ze=H;Ze!==null;){if(Ze.key===Ye){if(Ye=$.type,Ye===F){if(Ze.tag===7){o(q,Ze.sibling),H=c(Ze,$.props.children),H.return=q,q=H;break e}}else if(Ze.elementType===Ye||typeof Ye=="object"&&Ye!==null&&Ye.$$typeof===ue&&rd(Ye)===Ze.type){o(q,Ze.sibling),H=c(Ze,$.props),H.ref=So(q,Ze,$),H.return=q,q=H;break e}o(q,Ze);break}else i(q,Ze);Ze=Ze.sibling}$.type===F?(H=Or($.props.children,q.mode,we,$.key),H.return=q,q=H):(we=qa($.type,$.key,$.props,null,q.mode,we),we.ref=So(q,H,$),we.return=q,q=we)}return M(q);case B:e:{for(Ze=$.key;H!==null;){if(H.key===Ze)if(H.tag===4&&H.stateNode.containerInfo===$.containerInfo&&H.stateNode.implementation===$.implementation){o(q,H.sibling),H=c(H,$.children||[]),H.return=q,q=H;break e}else{o(q,H);break}else i(q,H);H=H.sibling}H=pc($,q.mode,we),H.return=q,q=H}return M(q);case ue:return Ze=$._init,Gt(q,H,Ze($._payload),we)}if(We($))return He(q,H,$,we);if(ce($))return Ge(q,H,$,we);Ta(q,$)}return typeof $=="string"&&$!==""||typeof $=="number"?($=""+$,H!==null&&H.tag===6?(o(q,H.sibling),H=c(H,$),H.return=q,q=H):(o(q,H),H=dc($,q.mode,we),H.return=q,q=H),M(q)):o(q,H)}return Gt}var vs=sd(!0),od=sd(!1),wa=Ji(null),Aa=null,xs=null,Eu=null;function Tu(){Eu=xs=Aa=null}function wu(t){var i=wa.current;Nt(wa),t._currentValue=i}function Au(t,i,o){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===o)break;t=t.return}}function ys(t,i){Aa=t,Eu=xs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(Cn=!0),t.firstContext=null)}function Xn(t){var i=t._currentValue;if(Eu!==t)if(t={context:t,memoizedValue:i,next:null},xs===null){if(Aa===null)throw Error(n(308));xs=t,Aa.dependencies={lanes:0,firstContext:t}}else xs=xs.next=t;return i}var br=null;function Cu(t){br===null?br=[t]:br.push(t)}function ad(t,i,o,l){var c=i.interleaved;return c===null?(o.next=o,Cu(i)):(o.next=c.next,c.next=o),i.interleaved=o,bi(t,l)}function bi(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var nr=!1;function Ru(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ld(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Li(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function ir(t,i,o){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(yt&2)!==0){var c=l.pending;return c===null?i.next=i:(i.next=c.next,c.next=i),l.pending=i,bi(t,o)}return c=l.interleaved,c===null?(i.next=i,Cu(l)):(i.next=c.next,c.next=i),l.interleaved=i,bi(t,o)}function Ca(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,Vl(t,o)}}function ud(t,i){var o=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,o===l)){var c=null,d=null;if(o=o.firstBaseUpdate,o!==null){do{var M={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};d===null?c=d=M:d=d.next=M,o=o.next}while(o!==null);d===null?c=d=i:d=d.next=i}else c=d=i;o={baseState:l.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:l.shared,effects:l.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Ra(t,i,o,l){var c=t.updateQueue;nr=!1;var d=c.firstBaseUpdate,M=c.lastBaseUpdate,I=c.shared.pending;if(I!==null){c.shared.pending=null;var O=I,ee=O.next;O.next=null,M===null?d=ee:M.next=ee,M=O;var ve=t.alternate;ve!==null&&(ve=ve.updateQueue,I=ve.lastBaseUpdate,I!==M&&(I===null?ve.firstBaseUpdate=ee:I.next=ee,ve.lastBaseUpdate=O))}if(d!==null){var Me=c.baseState;M=0,ve=ee=O=null,I=d;do{var ge=I.lane,Oe=I.eventTime;if((l&ge)===ge){ve!==null&&(ve=ve.next={eventTime:Oe,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var He=t,Ge=I;switch(ge=i,Oe=o,Ge.tag){case 1:if(He=Ge.payload,typeof He=="function"){Me=He.call(Oe,Me,ge);break e}Me=He;break e;case 3:He.flags=He.flags&-65537|128;case 0:if(He=Ge.payload,ge=typeof He=="function"?He.call(Oe,Me,ge):He,ge==null)break e;Me=oe({},Me,ge);break e;case 2:nr=!0}}I.callback!==null&&I.lane!==0&&(t.flags|=64,ge=c.effects,ge===null?c.effects=[I]:ge.push(I))}else Oe={eventTime:Oe,lane:ge,tag:I.tag,payload:I.payload,callback:I.callback,next:null},ve===null?(ee=ve=Oe,O=Me):ve=ve.next=Oe,M|=ge;if(I=I.next,I===null){if(I=c.shared.pending,I===null)break;ge=I,I=ge.next,ge.next=null,c.lastBaseUpdate=ge,c.shared.pending=null}}while(!0);if(ve===null&&(O=Me),c.baseState=O,c.firstBaseUpdate=ee,c.lastBaseUpdate=ve,i=c.shared.interleaved,i!==null){c=i;do M|=c.lane,c=c.next;while(c!==i)}else d===null&&(c.shared.lanes=0);Ir|=M,t.lanes=M,t.memoizedState=Me}}function cd(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var l=t[i],c=l.callback;if(c!==null){if(l.callback=null,l=o,typeof c!="function")throw Error(n(191,c));c.call(l)}}}var Mo={},gi=Ji(Mo),Eo=Ji(Mo),To=Ji(Mo);function Lr(t){if(t===Mo)throw Error(n(174));return t}function Pu(t,i){switch(Dt(To,i),Dt(Eo,t),Dt(gi,Mo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Te(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=Te(i,t)}Nt(gi),Dt(gi,i)}function Ss(){Nt(gi),Nt(Eo),Nt(To)}function fd(t){Lr(To.current);var i=Lr(gi.current),o=Te(i,t.type);i!==o&&(Dt(Eo,t),Dt(gi,o))}function bu(t){Eo.current===t&&(Nt(gi),Nt(Eo))}var zt=Ji(0);function Pa(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Lu=[];function Du(){for(var t=0;t<Lu.length;t++)Lu[t]._workInProgressVersionPrimary=null;Lu.length=0}var ba=R.ReactCurrentDispatcher,Iu=R.ReactCurrentBatchConfig,Dr=0,Bt=null,qt=null,Jt=null,La=!1,wo=!1,Ao=0,T_=0;function fn(){throw Error(n(321))}function Uu(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ti(t[o],i[o]))return!1;return!0}function Nu(t,i,o,l,c,d){if(Dr=d,Bt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,ba.current=t===null||t.memoizedState===null?R_:P_,t=o(l,c),wo){d=0;do{if(wo=!1,Ao=0,25<=d)throw Error(n(301));d+=1,Jt=qt=null,i.updateQueue=null,ba.current=b_,t=o(l,c)}while(wo)}if(ba.current=Ua,i=qt!==null&&qt.next!==null,Dr=0,Jt=qt=Bt=null,La=!1,i)throw Error(n(300));return t}function Fu(){var t=Ao!==0;return Ao=0,t}function _i(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Jt===null?Bt.memoizedState=Jt=t:Jt=Jt.next=t,Jt}function jn(){if(qt===null){var t=Bt.alternate;t=t!==null?t.memoizedState:null}else t=qt.next;var i=Jt===null?Bt.memoizedState:Jt.next;if(i!==null)Jt=i,qt=t;else{if(t===null)throw Error(n(310));qt=t,t={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},Jt===null?Bt.memoizedState=Jt=t:Jt=Jt.next=t}return Jt}function Co(t,i){return typeof i=="function"?i(t):i}function Ou(t){var i=jn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=qt,c=l.baseQueue,d=o.pending;if(d!==null){if(c!==null){var M=c.next;c.next=d.next,d.next=M}l.baseQueue=c=d,o.pending=null}if(c!==null){d=c.next,l=l.baseState;var I=M=null,O=null,ee=d;do{var ve=ee.lane;if((Dr&ve)===ve)O!==null&&(O=O.next={lane:0,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null}),l=ee.hasEagerState?ee.eagerState:t(l,ee.action);else{var Me={lane:ve,action:ee.action,hasEagerState:ee.hasEagerState,eagerState:ee.eagerState,next:null};O===null?(I=O=Me,M=l):O=O.next=Me,Bt.lanes|=ve,Ir|=ve}ee=ee.next}while(ee!==null&&ee!==d);O===null?M=l:O.next=I,ti(l,i.memoizedState)||(Cn=!0),i.memoizedState=l,i.baseState=M,i.baseQueue=O,o.lastRenderedState=l}if(t=o.interleaved,t!==null){c=t;do d=c.lane,Bt.lanes|=d,Ir|=d,c=c.next;while(c!==t)}else c===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function ku(t){var i=jn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=o.dispatch,c=o.pending,d=i.memoizedState;if(c!==null){o.pending=null;var M=c=c.next;do d=t(d,M.action),M=M.next;while(M!==c);ti(d,i.memoizedState)||(Cn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),o.lastRenderedState=d}return[d,l]}function hd(){}function dd(t,i){var o=Bt,l=jn(),c=i(),d=!ti(l.memoizedState,c);if(d&&(l.memoizedState=c,Cn=!0),l=l.queue,zu(gd.bind(null,o,l,t),[t]),l.getSnapshot!==i||d||Jt!==null&&Jt.memoizedState.tag&1){if(o.flags|=2048,Ro(9,md.bind(null,o,l,c,i),void 0,null),en===null)throw Error(n(349));(Dr&30)!==0||pd(o,i,c)}return c}function pd(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=Bt.updateQueue,i===null?(i={lastEffect:null,stores:null},Bt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function md(t,i,o,l){i.value=o,i.getSnapshot=l,_d(i)&&vd(t)}function gd(t,i,o){return o(function(){_d(i)&&vd(t)})}function _d(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ti(t,o)}catch{return!0}}function vd(t){var i=bi(t,1);i!==null&&oi(i,t,1,-1)}function xd(t){var i=_i();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Co,lastRenderedState:t},i.queue=t,t=t.dispatch=C_.bind(null,Bt,t),[i.memoizedState,t]}function Ro(t,i,o,l){return t={tag:t,create:i,destroy:o,deps:l,next:null},i=Bt.updateQueue,i===null?(i={lastEffect:null,stores:null},Bt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(l=o.next,o.next=t,t.next=l,i.lastEffect=t)),t}function yd(){return jn().memoizedState}function Da(t,i,o,l){var c=_i();Bt.flags|=t,c.memoizedState=Ro(1|i,o,void 0,l===void 0?null:l)}function Ia(t,i,o,l){var c=jn();l=l===void 0?null:l;var d=void 0;if(qt!==null){var M=qt.memoizedState;if(d=M.destroy,l!==null&&Uu(l,M.deps)){c.memoizedState=Ro(i,o,d,l);return}}Bt.flags|=t,c.memoizedState=Ro(1|i,o,d,l)}function Sd(t,i){return Da(8390656,8,t,i)}function zu(t,i){return Ia(2048,8,t,i)}function Md(t,i){return Ia(4,2,t,i)}function Ed(t,i){return Ia(4,4,t,i)}function Td(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function wd(t,i,o){return o=o!=null?o.concat([t]):null,Ia(4,4,Td.bind(null,i,t),o)}function Bu(){}function Ad(t,i){var o=jn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&Uu(i,l[1])?l[0]:(o.memoizedState=[t,i],t)}function Cd(t,i){var o=jn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&Uu(i,l[1])?l[0]:(t=t(),o.memoizedState=[t,i],t)}function Rd(t,i,o){return(Dr&21)===0?(t.baseState&&(t.baseState=!1,Cn=!0),t.memoizedState=o):(ti(o,i)||(o=_n(),Bt.lanes|=o,Ir|=o,t.baseState=!0),i)}function w_(t,i){var o=Ct;Ct=o!==0&&4>o?o:4,t(!0);var l=Iu.transition;Iu.transition={};try{t(!1),i()}finally{Ct=o,Iu.transition=l}}function Pd(){return jn().memoizedState}function A_(t,i,o){var l=ar(t);if(o={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null},bd(t))Ld(i,o);else if(o=ad(t,i,o,l),o!==null){var c=xn();oi(o,t,l,c),Dd(o,i,l)}}function C_(t,i,o){var l=ar(t),c={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null};if(bd(t))Ld(i,c);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var M=i.lastRenderedState,I=d(M,o);if(c.hasEagerState=!0,c.eagerState=I,ti(I,M)){var O=i.interleaved;O===null?(c.next=c,Cu(i)):(c.next=O.next,O.next=c),i.interleaved=c;return}}catch{}finally{}o=ad(t,i,c,l),o!==null&&(c=xn(),oi(o,t,l,c),Dd(o,i,l))}}function bd(t){var i=t.alternate;return t===Bt||i!==null&&i===Bt}function Ld(t,i){wo=La=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function Dd(t,i,o){if((o&4194240)!==0){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,Vl(t,o)}}var Ua={readContext:Xn,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useInsertionEffect:fn,useLayoutEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useMutableSource:fn,useSyncExternalStore:fn,useId:fn,unstable_isNewReconciler:!1},R_={readContext:Xn,useCallback:function(t,i){return _i().memoizedState=[t,i===void 0?null:i],t},useContext:Xn,useEffect:Sd,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Da(4194308,4,Td.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Da(4194308,4,t,i)},useInsertionEffect:function(t,i){return Da(4,2,t,i)},useMemo:function(t,i){var o=_i();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var l=_i();return i=o!==void 0?o(i):i,l.memoizedState=l.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},l.queue=t,t=t.dispatch=A_.bind(null,Bt,t),[l.memoizedState,t]},useRef:function(t){var i=_i();return t={current:t},i.memoizedState=t},useState:xd,useDebugValue:Bu,useDeferredValue:function(t){return _i().memoizedState=t},useTransition:function(){var t=xd(!1),i=t[0];return t=w_.bind(null,t[1]),_i().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var l=Bt,c=_i();if(kt){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),en===null)throw Error(n(349));(Dr&30)!==0||pd(l,i,o)}c.memoizedState=o;var d={value:o,getSnapshot:i};return c.queue=d,Sd(gd.bind(null,l,d,t),[t]),l.flags|=2048,Ro(9,md.bind(null,l,d,o,i),void 0,null),o},useId:function(){var t=_i(),i=en.identifierPrefix;if(kt){var o=Pi,l=Ri;o=(l&~(1<<32-ct(l)-1)).toString(32)+o,i=":"+i+"R"+o,o=Ao++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=T_++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},P_={readContext:Xn,useCallback:Ad,useContext:Xn,useEffect:zu,useImperativeHandle:wd,useInsertionEffect:Md,useLayoutEffect:Ed,useMemo:Cd,useReducer:Ou,useRef:yd,useState:function(){return Ou(Co)},useDebugValue:Bu,useDeferredValue:function(t){var i=jn();return Rd(i,qt.memoizedState,t)},useTransition:function(){var t=Ou(Co)[0],i=jn().memoizedState;return[t,i]},useMutableSource:hd,useSyncExternalStore:dd,useId:Pd,unstable_isNewReconciler:!1},b_={readContext:Xn,useCallback:Ad,useContext:Xn,useEffect:zu,useImperativeHandle:wd,useInsertionEffect:Md,useLayoutEffect:Ed,useMemo:Cd,useReducer:ku,useRef:yd,useState:function(){return ku(Co)},useDebugValue:Bu,useDeferredValue:function(t){var i=jn();return qt===null?i.memoizedState=t:Rd(i,qt.memoizedState,t)},useTransition:function(){var t=ku(Co)[0],i=jn().memoizedState;return[t,i]},useMutableSource:hd,useSyncExternalStore:dd,useId:Pd,unstable_isNewReconciler:!1};function ii(t,i){if(t&&t.defaultProps){i=oe({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Hu(t,i,o,l){i=t.memoizedState,o=o(l,i),o=o==null?i:oe({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Na={isMounted:function(t){return(t=t._reactInternals)?di(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var l=xn(),c=ar(t),d=Li(l,c);d.payload=i,o!=null&&(d.callback=o),i=ir(t,d,c),i!==null&&(oi(i,t,c,l),Ca(i,t,c))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var l=xn(),c=ar(t),d=Li(l,c);d.tag=1,d.payload=i,o!=null&&(d.callback=o),i=ir(t,d,c),i!==null&&(oi(i,t,c,l),Ca(i,t,c))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=xn(),l=ar(t),c=Li(o,l);c.tag=2,i!=null&&(c.callback=i),i=ir(t,c,l),i!==null&&(oi(i,t,l,o),Ca(i,t,l))}};function Id(t,i,o,l,c,d,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,d,M):i.prototype&&i.prototype.isPureReactComponent?!po(o,l)||!po(c,d):!0}function Ud(t,i,o){var l=!1,c=er,d=i.contextType;return typeof d=="object"&&d!==null?d=Xn(d):(c=An(i)?Cr:cn.current,l=i.contextTypes,d=(l=l!=null)?ps(t,c):er),i=new i(o,d),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Na,t.stateNode=i,i._reactInternals=t,l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=c,t.__reactInternalMemoizedMaskedChildContext=d),i}function Nd(t,i,o,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,l),i.state!==t&&Na.enqueueReplaceState(i,i.state,null)}function Vu(t,i,o,l){var c=t.stateNode;c.props=o,c.state=t.memoizedState,c.refs={},Ru(t);var d=i.contextType;typeof d=="object"&&d!==null?c.context=Xn(d):(d=An(i)?Cr:cn.current,c.context=ps(t,d)),c.state=t.memoizedState,d=i.getDerivedStateFromProps,typeof d=="function"&&(Hu(t,i,d,o),c.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(i=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),i!==c.state&&Na.enqueueReplaceState(c,c.state,null),Ra(t,o,c,l),c.state=t.memoizedState),typeof c.componentDidMount=="function"&&(t.flags|=4194308)}function Ms(t,i){try{var o="",l=i;do o+=de(l),l=l.return;while(l);var c=o}catch(d){c=`
Error generating stack: `+d.message+`
`+d.stack}return{value:t,source:i,stack:c,digest:null}}function Gu(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function Wu(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var L_=typeof WeakMap=="function"?WeakMap:Map;function Fd(t,i,o){o=Li(-1,o),o.tag=3,o.payload={element:null};var l=i.value;return o.callback=function(){Va||(Va=!0,sc=l),Wu(t,i)},o}function Od(t,i,o){o=Li(-1,o),o.tag=3;var l=t.type.getDerivedStateFromError;if(typeof l=="function"){var c=i.value;o.payload=function(){return l(c)},o.callback=function(){Wu(t,i)}}var d=t.stateNode;return d!==null&&typeof d.componentDidCatch=="function"&&(o.callback=function(){Wu(t,i),typeof l!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),o}function kd(t,i,o){var l=t.pingCache;if(l===null){l=t.pingCache=new L_;var c=new Set;l.set(i,c)}else c=l.get(i),c===void 0&&(c=new Set,l.set(i,c));c.has(o)||(c.add(o),t=X_.bind(null,t,i,o),i.then(t,t))}function zd(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Bd(t,i,o,l,c){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Li(-1,1),i.tag=2,ir(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=c,t)}var D_=R.ReactCurrentOwner,Cn=!1;function vn(t,i,o,l){i.child=t===null?od(i,null,o,l):vs(i,t.child,o,l)}function Hd(t,i,o,l,c){o=o.render;var d=i.ref;return ys(i,c),l=Nu(t,i,o,l,d,c),o=Fu(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~c,Di(t,i,c)):(kt&&o&&vu(i),i.flags|=1,vn(t,i,l,c),i.child)}function Vd(t,i,o,l,c){if(t===null){var d=o.type;return typeof d=="function"&&!hc(d)&&d.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=d,Gd(t,i,d,l,c)):(t=qa(o.type,null,l,i,i.mode,c),t.ref=i.ref,t.return=i,i.child=t)}if(d=t.child,(t.lanes&c)===0){var M=d.memoizedProps;if(o=o.compare,o=o!==null?o:po,o(M,l)&&t.ref===i.ref)return Di(t,i,c)}return i.flags|=1,t=ur(d,l),t.ref=i.ref,t.return=i,i.child=t}function Gd(t,i,o,l,c){if(t!==null){var d=t.memoizedProps;if(po(d,l)&&t.ref===i.ref)if(Cn=!1,i.pendingProps=l=d,(t.lanes&c)!==0)(t.flags&131072)!==0&&(Cn=!0);else return i.lanes=t.lanes,Di(t,i,c)}return Xu(t,i,o,l,c)}function Wd(t,i,o){var l=i.pendingProps,c=l.children,d=t!==null?t.memoizedState:null;if(l.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dt(Ts,On),On|=o;else{if((o&1073741824)===0)return t=d!==null?d.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Dt(Ts,On),On|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=d!==null?d.baseLanes:o,Dt(Ts,On),On|=l}else d!==null?(l=d.baseLanes|o,i.memoizedState=null):l=o,Dt(Ts,On),On|=l;return vn(t,i,c,o),i.child}function Xd(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Xu(t,i,o,l,c){var d=An(o)?Cr:cn.current;return d=ps(i,d),ys(i,c),o=Nu(t,i,o,l,d,c),l=Fu(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~c,Di(t,i,c)):(kt&&l&&vu(i),i.flags|=1,vn(t,i,o,c),i.child)}function jd(t,i,o,l,c){if(An(o)){var d=!0;xa(i)}else d=!1;if(ys(i,c),i.stateNode===null)Oa(t,i),Ud(i,o,l),Vu(i,o,l,c),l=!0;else if(t===null){var M=i.stateNode,I=i.memoizedProps;M.props=I;var O=M.context,ee=o.contextType;typeof ee=="object"&&ee!==null?ee=Xn(ee):(ee=An(o)?Cr:cn.current,ee=ps(i,ee));var ve=o.getDerivedStateFromProps,Me=typeof ve=="function"||typeof M.getSnapshotBeforeUpdate=="function";Me||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(I!==l||O!==ee)&&Nd(i,M,l,ee),nr=!1;var ge=i.memoizedState;M.state=ge,Ra(i,l,M,c),O=i.memoizedState,I!==l||ge!==O||wn.current||nr?(typeof ve=="function"&&(Hu(i,o,ve,l),O=i.memoizedState),(I=nr||Id(i,o,I,l,ge,O,ee))?(Me||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=O),M.props=l,M.state=O,M.context=ee,l=I):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{M=i.stateNode,ld(t,i),I=i.memoizedProps,ee=i.type===i.elementType?I:ii(i.type,I),M.props=ee,Me=i.pendingProps,ge=M.context,O=o.contextType,typeof O=="object"&&O!==null?O=Xn(O):(O=An(o)?Cr:cn.current,O=ps(i,O));var Oe=o.getDerivedStateFromProps;(ve=typeof Oe=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(I!==Me||ge!==O)&&Nd(i,M,l,O),nr=!1,ge=i.memoizedState,M.state=ge,Ra(i,l,M,c);var He=i.memoizedState;I!==Me||ge!==He||wn.current||nr?(typeof Oe=="function"&&(Hu(i,o,Oe,l),He=i.memoizedState),(ee=nr||Id(i,o,ee,l,ge,He,O)||!1)?(ve||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(l,He,O),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(l,He,O)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||I===t.memoizedProps&&ge===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||I===t.memoizedProps&&ge===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=He),M.props=l,M.state=He,M.context=O,l=ee):(typeof M.componentDidUpdate!="function"||I===t.memoizedProps&&ge===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||I===t.memoizedProps&&ge===t.memoizedState||(i.flags|=1024),l=!1)}return ju(t,i,o,l,d,c)}function ju(t,i,o,l,c,d){Xd(t,i);var M=(i.flags&128)!==0;if(!l&&!M)return c&&Zh(i,o,!1),Di(t,i,d);l=i.stateNode,D_.current=i;var I=M&&typeof o.getDerivedStateFromError!="function"?null:l.render();return i.flags|=1,t!==null&&M?(i.child=vs(i,t.child,null,d),i.child=vs(i,null,I,d)):vn(t,i,I,d),i.memoizedState=l.state,c&&Zh(i,o,!0),i.child}function Yd(t){var i=t.stateNode;i.pendingContext?Kh(t,i.pendingContext,i.pendingContext!==i.context):i.context&&Kh(t,i.context,!1),Pu(t,i.containerInfo)}function qd(t,i,o,l,c){return _s(),Mu(c),i.flags|=256,vn(t,i,o,l),i.child}var Yu={dehydrated:null,treeContext:null,retryLane:0};function qu(t){return{baseLanes:t,cachePool:null,transitions:null}}function Kd(t,i,o){var l=i.pendingProps,c=zt.current,d=!1,M=(i.flags&128)!==0,I;if((I=M)||(I=t!==null&&t.memoizedState===null?!1:(c&2)!==0),I?(d=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(c|=1),Dt(zt,c&1),t===null)return Su(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=l.children,t=l.fallback,d?(l=i.mode,d=i.child,M={mode:"hidden",children:M},(l&1)===0&&d!==null?(d.childLanes=0,d.pendingProps=M):d=Ka(M,l,0,null),t=Or(t,l,o,null),d.return=i,t.return=i,d.sibling=t,i.child=d,i.child.memoizedState=qu(o),i.memoizedState=Yu,t):Ku(i,M));if(c=t.memoizedState,c!==null&&(I=c.dehydrated,I!==null))return I_(t,i,M,l,I,c,o);if(d){d=l.fallback,M=i.mode,c=t.child,I=c.sibling;var O={mode:"hidden",children:l.children};return(M&1)===0&&i.child!==c?(l=i.child,l.childLanes=0,l.pendingProps=O,i.deletions=null):(l=ur(c,O),l.subtreeFlags=c.subtreeFlags&14680064),I!==null?d=ur(I,d):(d=Or(d,M,o,null),d.flags|=2),d.return=i,l.return=i,l.sibling=d,i.child=l,l=d,d=i.child,M=t.child.memoizedState,M=M===null?qu(o):{baseLanes:M.baseLanes|o,cachePool:null,transitions:M.transitions},d.memoizedState=M,d.childLanes=t.childLanes&~o,i.memoizedState=Yu,l}return d=t.child,t=d.sibling,l=ur(d,{mode:"visible",children:l.children}),(i.mode&1)===0&&(l.lanes=o),l.return=i,l.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=l,i.memoizedState=null,l}function Ku(t,i){return i=Ka({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Fa(t,i,o,l){return l!==null&&Mu(l),vs(i,t.child,null,o),t=Ku(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function I_(t,i,o,l,c,d,M){if(o)return i.flags&256?(i.flags&=-257,l=Gu(Error(n(422))),Fa(t,i,M,l)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(d=l.fallback,c=i.mode,l=Ka({mode:"visible",children:l.children},c,0,null),d=Or(d,c,M,null),d.flags|=2,l.return=i,d.return=i,l.sibling=d,i.child=l,(i.mode&1)!==0&&vs(i,t.child,null,M),i.child.memoizedState=qu(M),i.memoizedState=Yu,d);if((i.mode&1)===0)return Fa(t,i,M,null);if(c.data==="$!"){if(l=c.nextSibling&&c.nextSibling.dataset,l)var I=l.dgst;return l=I,d=Error(n(419)),l=Gu(d,l,void 0),Fa(t,i,M,l)}if(I=(M&t.childLanes)!==0,Cn||I){if(l=en,l!==null){switch(M&-M){case 4:c=2;break;case 16:c=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:c=32;break;case 536870912:c=268435456;break;default:c=0}c=(c&(l.suspendedLanes|M))!==0?0:c,c!==0&&c!==d.retryLane&&(d.retryLane=c,bi(t,c),oi(l,t,c,-1))}return fc(),l=Gu(Error(n(421))),Fa(t,i,M,l)}return c.data==="$?"?(i.flags|=128,i.child=t.child,i=j_.bind(null,t),c._reactRetry=i,null):(t=d.treeContext,Fn=Qi(c.nextSibling),Nn=i,kt=!0,ni=null,t!==null&&(Gn[Wn++]=Ri,Gn[Wn++]=Pi,Gn[Wn++]=Rr,Ri=t.id,Pi=t.overflow,Rr=i),i=Ku(i,l.children),i.flags|=4096,i)}function $d(t,i,o){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),Au(t.return,i,o)}function $u(t,i,o,l,c){var d=t.memoizedState;d===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:o,tailMode:c}:(d.isBackwards=i,d.rendering=null,d.renderingStartTime=0,d.last=l,d.tail=o,d.tailMode=c)}function Zd(t,i,o){var l=i.pendingProps,c=l.revealOrder,d=l.tail;if(vn(t,i,l.children,o),l=zt.current,(l&2)!==0)l=l&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&$d(t,o,i);else if(t.tag===19)$d(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}l&=1}if(Dt(zt,l),(i.mode&1)===0)i.memoizedState=null;else switch(c){case"forwards":for(o=i.child,c=null;o!==null;)t=o.alternate,t!==null&&Pa(t)===null&&(c=o),o=o.sibling;o=c,o===null?(c=i.child,i.child=null):(c=o.sibling,o.sibling=null),$u(i,!1,c,o,d);break;case"backwards":for(o=null,c=i.child,i.child=null;c!==null;){if(t=c.alternate,t!==null&&Pa(t)===null){i.child=c;break}t=c.sibling,c.sibling=o,o=c,c=t}$u(i,!0,o,null,d);break;case"together":$u(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Oa(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Di(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Ir|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=ur(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=ur(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function U_(t,i,o){switch(i.tag){case 3:Yd(i),_s();break;case 5:fd(i);break;case 1:An(i.type)&&xa(i);break;case 4:Pu(i,i.stateNode.containerInfo);break;case 10:var l=i.type._context,c=i.memoizedProps.value;Dt(wa,l._currentValue),l._currentValue=c;break;case 13:if(l=i.memoizedState,l!==null)return l.dehydrated!==null?(Dt(zt,zt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Kd(t,i,o):(Dt(zt,zt.current&1),t=Di(t,i,o),t!==null?t.sibling:null);Dt(zt,zt.current&1);break;case 19:if(l=(o&i.childLanes)!==0,(t.flags&128)!==0){if(l)return Zd(t,i,o);i.flags|=128}if(c=i.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Dt(zt,zt.current),l)break;return null;case 22:case 23:return i.lanes=0,Wd(t,i,o)}return Di(t,i,o)}var Qd,Zu,Jd,ep;Qd=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Zu=function(){},Jd=function(t,i,o,l){var c=t.memoizedProps;if(c!==l){t=i.stateNode,Lr(gi.current);var d=null;switch(o){case"input":c=W(t,c),l=W(t,l),d=[];break;case"select":c=oe({},c,{value:void 0}),l=oe({},l,{value:void 0}),d=[];break;case"textarea":c=E(t,c),l=E(t,l),d=[];break;default:typeof c.onClick!="function"&&typeof l.onClick=="function"&&(t.onclick=ga)}ut(o,l);var M;o=null;for(ee in c)if(!l.hasOwnProperty(ee)&&c.hasOwnProperty(ee)&&c[ee]!=null)if(ee==="style"){var I=c[ee];for(M in I)I.hasOwnProperty(M)&&(o||(o={}),o[M]="")}else ee!=="dangerouslySetInnerHTML"&&ee!=="children"&&ee!=="suppressContentEditableWarning"&&ee!=="suppressHydrationWarning"&&ee!=="autoFocus"&&(a.hasOwnProperty(ee)?d||(d=[]):(d=d||[]).push(ee,null));for(ee in l){var O=l[ee];if(I=c!=null?c[ee]:void 0,l.hasOwnProperty(ee)&&O!==I&&(O!=null||I!=null))if(ee==="style")if(I){for(M in I)!I.hasOwnProperty(M)||O&&O.hasOwnProperty(M)||(o||(o={}),o[M]="");for(M in O)O.hasOwnProperty(M)&&I[M]!==O[M]&&(o||(o={}),o[M]=O[M])}else o||(d||(d=[]),d.push(ee,o)),o=O;else ee==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,I=I?I.__html:void 0,O!=null&&I!==O&&(d=d||[]).push(ee,O)):ee==="children"?typeof O!="string"&&typeof O!="number"||(d=d||[]).push(ee,""+O):ee!=="suppressContentEditableWarning"&&ee!=="suppressHydrationWarning"&&(a.hasOwnProperty(ee)?(O!=null&&ee==="onScroll"&&Ut("scroll",t),d||I===O||(d=[])):(d=d||[]).push(ee,O))}o&&(d=d||[]).push("style",o);var ee=d;(i.updateQueue=ee)&&(i.flags|=4)}},ep=function(t,i,o,l){o!==l&&(i.flags|=4)};function Po(t,i){if(!kt)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var l=null;o!==null;)o.alternate!==null&&(l=o),o=o.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function hn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,l=0;if(i)for(var c=t.child;c!==null;)o|=c.lanes|c.childLanes,l|=c.subtreeFlags&14680064,l|=c.flags&14680064,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)o|=c.lanes|c.childLanes,l|=c.subtreeFlags,l|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=l,t.childLanes=o,i}function N_(t,i,o){var l=i.pendingProps;switch(xu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(i),null;case 1:return An(i.type)&&va(),hn(i),null;case 3:return l=i.stateNode,Ss(),Nt(wn),Nt(cn),Du(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(t===null||t.child===null)&&(Ea(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ni!==null&&(lc(ni),ni=null))),Zu(t,i),hn(i),null;case 5:bu(i);var c=Lr(To.current);if(o=i.type,t!==null&&i.stateNode!=null)Jd(t,i,o,l,c),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!l){if(i.stateNode===null)throw Error(n(166));return hn(i),null}if(t=Lr(gi.current),Ea(i)){l=i.stateNode,o=i.type;var d=i.memoizedProps;switch(l[mi]=i,l[xo]=d,t=(i.mode&1)!==0,o){case"dialog":Ut("cancel",l),Ut("close",l);break;case"iframe":case"object":case"embed":Ut("load",l);break;case"video":case"audio":for(c=0;c<go.length;c++)Ut(go[c],l);break;case"source":Ut("error",l);break;case"img":case"image":case"link":Ut("error",l),Ut("load",l);break;case"details":Ut("toggle",l);break;case"input":sn(l,d),Ut("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!d.multiple},Ut("invalid",l);break;case"textarea":D(l,d),Ut("invalid",l)}ut(o,d),c=null;for(var M in d)if(d.hasOwnProperty(M)){var I=d[M];M==="children"?typeof I=="string"?l.textContent!==I&&(d.suppressHydrationWarning!==!0&&ma(l.textContent,I,t),c=["children",I]):typeof I=="number"&&l.textContent!==""+I&&(d.suppressHydrationWarning!==!0&&ma(l.textContent,I,t),c=["children",""+I]):a.hasOwnProperty(M)&&I!=null&&M==="onScroll"&&Ut("scroll",l)}switch(o){case"input":At(l),$e(l,d,!0);break;case"textarea":At(l),se(l);break;case"select":case"option":break;default:typeof d.onClick=="function"&&(l.onclick=ga)}l=c,i.updateQueue=l,l!==null&&(i.flags|=4)}else{M=c.nodeType===9?c:c.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=K(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=M.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof l.is=="string"?t=M.createElement(o,{is:l.is}):(t=M.createElement(o),o==="select"&&(M=t,l.multiple?M.multiple=!0:l.size&&(M.size=l.size))):t=M.createElementNS(t,o),t[mi]=i,t[xo]=l,Qd(t,i,!1,!1),i.stateNode=t;e:{switch(M=tt(o,l),o){case"dialog":Ut("cancel",t),Ut("close",t),c=l;break;case"iframe":case"object":case"embed":Ut("load",t),c=l;break;case"video":case"audio":for(c=0;c<go.length;c++)Ut(go[c],t);c=l;break;case"source":Ut("error",t),c=l;break;case"img":case"image":case"link":Ut("error",t),Ut("load",t),c=l;break;case"details":Ut("toggle",t),c=l;break;case"input":sn(t,l),c=W(t,l),Ut("invalid",t);break;case"option":c=l;break;case"select":t._wrapperState={wasMultiple:!!l.multiple},c=oe({},l,{value:void 0}),Ut("invalid",t);break;case"textarea":D(t,l),c=E(t,l),Ut("invalid",t);break;default:c=l}ut(o,c),I=c;for(d in I)if(I.hasOwnProperty(d)){var O=I[d];d==="style"?ze(t,O):d==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,O!=null&&Ce(t,O)):d==="children"?typeof O=="string"?(o!=="textarea"||O!=="")&&Je(t,O):typeof O=="number"&&Je(t,""+O):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(a.hasOwnProperty(d)?O!=null&&d==="onScroll"&&Ut("scroll",t):O!=null&&U(t,d,O,M))}switch(o){case"input":At(t),$e(t,l,!1);break;case"textarea":At(t),se(t);break;case"option":l.value!=null&&t.setAttribute("value",""+Re(l.value));break;case"select":t.multiple=!!l.multiple,d=l.value,d!=null?b(t,!!l.multiple,d,!1):l.defaultValue!=null&&b(t,!!l.multiple,l.defaultValue,!0);break;default:typeof c.onClick=="function"&&(t.onclick=ga)}switch(o){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return hn(i),null;case 6:if(t&&i.stateNode!=null)ep(t,i,t.memoizedProps,l);else{if(typeof l!="string"&&i.stateNode===null)throw Error(n(166));if(o=Lr(To.current),Lr(gi.current),Ea(i)){if(l=i.stateNode,o=i.memoizedProps,l[mi]=i,(d=l.nodeValue!==o)&&(t=Nn,t!==null))switch(t.tag){case 3:ma(l.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ma(l.nodeValue,o,(t.mode&1)!==0)}d&&(i.flags|=4)}else l=(o.nodeType===9?o:o.ownerDocument).createTextNode(l),l[mi]=i,i.stateNode=l}return hn(i),null;case 13:if(Nt(zt),l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(kt&&Fn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)id(),_s(),i.flags|=98560,d=!1;else if(d=Ea(i),l!==null&&l.dehydrated!==null){if(t===null){if(!d)throw Error(n(318));if(d=i.memoizedState,d=d!==null?d.dehydrated:null,!d)throw Error(n(317));d[mi]=i}else _s(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;hn(i),d=!1}else ni!==null&&(lc(ni),ni=null),d=!0;if(!d)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(l=l!==null,l!==(t!==null&&t.memoizedState!==null)&&l&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(zt.current&1)!==0?Kt===0&&(Kt=3):fc())),i.updateQueue!==null&&(i.flags|=4),hn(i),null);case 4:return Ss(),Zu(t,i),t===null&&_o(i.stateNode.containerInfo),hn(i),null;case 10:return wu(i.type._context),hn(i),null;case 17:return An(i.type)&&va(),hn(i),null;case 19:if(Nt(zt),d=i.memoizedState,d===null)return hn(i),null;if(l=(i.flags&128)!==0,M=d.rendering,M===null)if(l)Po(d,!1);else{if(Kt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(M=Pa(t),M!==null){for(i.flags|=128,Po(d,!1),l=M.updateQueue,l!==null&&(i.updateQueue=l,i.flags|=4),i.subtreeFlags=0,l=o,o=i.child;o!==null;)d=o,t=l,d.flags&=14680066,M=d.alternate,M===null?(d.childLanes=0,d.lanes=t,d.child=null,d.subtreeFlags=0,d.memoizedProps=null,d.memoizedState=null,d.updateQueue=null,d.dependencies=null,d.stateNode=null):(d.childLanes=M.childLanes,d.lanes=M.lanes,d.child=M.child,d.subtreeFlags=0,d.deletions=null,d.memoizedProps=M.memoizedProps,d.memoizedState=M.memoizedState,d.updateQueue=M.updateQueue,d.type=M.type,t=M.dependencies,d.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Dt(zt,zt.current&1|2),i.child}t=t.sibling}d.tail!==null&&Ee()>ws&&(i.flags|=128,l=!0,Po(d,!1),i.lanes=4194304)}else{if(!l)if(t=Pa(M),t!==null){if(i.flags|=128,l=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Po(d,!0),d.tail===null&&d.tailMode==="hidden"&&!M.alternate&&!kt)return hn(i),null}else 2*Ee()-d.renderingStartTime>ws&&o!==1073741824&&(i.flags|=128,l=!0,Po(d,!1),i.lanes=4194304);d.isBackwards?(M.sibling=i.child,i.child=M):(o=d.last,o!==null?o.sibling=M:i.child=M,d.last=M)}return d.tail!==null?(i=d.tail,d.rendering=i,d.tail=i.sibling,d.renderingStartTime=Ee(),i.sibling=null,o=zt.current,Dt(zt,l?o&1|2:o&1),i):(hn(i),null);case 22:case 23:return cc(),l=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==l&&(i.flags|=8192),l&&(i.mode&1)!==0?(On&1073741824)!==0&&(hn(i),i.subtreeFlags&6&&(i.flags|=8192)):hn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function F_(t,i){switch(xu(i),i.tag){case 1:return An(i.type)&&va(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return Ss(),Nt(wn),Nt(cn),Du(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return bu(i),null;case 13:if(Nt(zt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));_s()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Nt(zt),null;case 4:return Ss(),null;case 10:return wu(i.type._context),null;case 22:case 23:return cc(),null;case 24:return null;default:return null}}var ka=!1,dn=!1,O_=typeof WeakSet=="function"?WeakSet:Set,Be=null;function Es(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(l){Ht(t,i,l)}else o.current=null}function Qu(t,i,o){try{o()}catch(l){Ht(t,i,l)}}var tp=!1;function k_(t,i){if(cu=ra,t=Ih(),nu(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var l=o.getSelection&&o.getSelection();if(l&&l.rangeCount!==0){o=l.anchorNode;var c=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{o.nodeType,d.nodeType}catch{o=null;break e}var M=0,I=-1,O=-1,ee=0,ve=0,Me=t,ge=null;t:for(;;){for(var Oe;Me!==o||c!==0&&Me.nodeType!==3||(I=M+c),Me!==d||l!==0&&Me.nodeType!==3||(O=M+l),Me.nodeType===3&&(M+=Me.nodeValue.length),(Oe=Me.firstChild)!==null;)ge=Me,Me=Oe;for(;;){if(Me===t)break t;if(ge===o&&++ee===c&&(I=M),ge===d&&++ve===l&&(O=M),(Oe=Me.nextSibling)!==null)break;Me=ge,ge=Me.parentNode}Me=Oe}o=I===-1||O===-1?null:{start:I,end:O}}else o=null}o=o||{start:0,end:0}}else o=null;for(fu={focusedElem:t,selectionRange:o},ra=!1,Be=i;Be!==null;)if(i=Be,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,Be=t;else for(;Be!==null;){i=Be;try{var He=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(He!==null){var Ge=He.memoizedProps,Gt=He.memoizedState,q=i.stateNode,H=q.getSnapshotBeforeUpdate(i.elementType===i.type?Ge:ii(i.type,Ge),Gt);q.__reactInternalSnapshotBeforeUpdate=H}break;case 3:var $=i.stateNode.containerInfo;$.nodeType===1?$.textContent="":$.nodeType===9&&$.documentElement&&$.removeChild($.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(we){Ht(i,i.return,we)}if(t=i.sibling,t!==null){t.return=i.return,Be=t;break}Be=i.return}return He=tp,tp=!1,He}function bo(t,i,o){var l=i.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var c=l=l.next;do{if((c.tag&t)===t){var d=c.destroy;c.destroy=void 0,d!==void 0&&Qu(i,o,d)}c=c.next}while(c!==l)}}function za(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var l=o.create;o.destroy=l()}o=o.next}while(o!==i)}}function Ju(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function np(t){var i=t.alternate;i!==null&&(t.alternate=null,np(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[mi],delete i[xo],delete i[mu],delete i[y_],delete i[S_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function ip(t){return t.tag===5||t.tag===3||t.tag===4}function rp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ip(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ec(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ga));else if(l!==4&&(t=t.child,t!==null))for(ec(t,i,o),t=t.sibling;t!==null;)ec(t,i,o),t=t.sibling}function tc(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(l!==4&&(t=t.child,t!==null))for(tc(t,i,o),t=t.sibling;t!==null;)tc(t,i,o),t=t.sibling}var on=null,ri=!1;function rr(t,i,o){for(o=o.child;o!==null;)sp(t,i,o),o=o.sibling}function sp(t,i,o){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(wt,o)}catch{}switch(o.tag){case 5:dn||Es(o,i);case 6:var l=on,c=ri;on=null,rr(t,i,o),on=l,ri=c,on!==null&&(ri?(t=on,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):on.removeChild(o.stateNode));break;case 18:on!==null&&(ri?(t=on,o=o.stateNode,t.nodeType===8?pu(t.parentNode,o):t.nodeType===1&&pu(t,o),ao(t)):pu(on,o.stateNode));break;case 4:l=on,c=ri,on=o.stateNode.containerInfo,ri=!0,rr(t,i,o),on=l,ri=c;break;case 0:case 11:case 14:case 15:if(!dn&&(l=o.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){c=l=l.next;do{var d=c,M=d.destroy;d=d.tag,M!==void 0&&((d&2)!==0||(d&4)!==0)&&Qu(o,i,M),c=c.next}while(c!==l)}rr(t,i,o);break;case 1:if(!dn&&(Es(o,i),l=o.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=o.memoizedProps,l.state=o.memoizedState,l.componentWillUnmount()}catch(I){Ht(o,i,I)}rr(t,i,o);break;case 21:rr(t,i,o);break;case 22:o.mode&1?(dn=(l=dn)||o.memoizedState!==null,rr(t,i,o),dn=l):rr(t,i,o);break;default:rr(t,i,o)}}function op(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new O_),i.forEach(function(l){var c=Y_.bind(null,t,l);o.has(l)||(o.add(l),l.then(c,c))})}}function si(t,i){var o=i.deletions;if(o!==null)for(var l=0;l<o.length;l++){var c=o[l];try{var d=t,M=i,I=M;e:for(;I!==null;){switch(I.tag){case 5:on=I.stateNode,ri=!1;break e;case 3:on=I.stateNode.containerInfo,ri=!0;break e;case 4:on=I.stateNode.containerInfo,ri=!0;break e}I=I.return}if(on===null)throw Error(n(160));sp(d,M,c),on=null,ri=!1;var O=c.alternate;O!==null&&(O.return=null),c.return=null}catch(ee){Ht(c,i,ee)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)ap(i,t),i=i.sibling}function ap(t,i){var o=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(si(i,t),vi(t),l&4){try{bo(3,t,t.return),za(3,t)}catch(Ge){Ht(t,t.return,Ge)}try{bo(5,t,t.return)}catch(Ge){Ht(t,t.return,Ge)}}break;case 1:si(i,t),vi(t),l&512&&o!==null&&Es(o,o.return);break;case 5:if(si(i,t),vi(t),l&512&&o!==null&&Es(o,o.return),t.flags&32){var c=t.stateNode;try{Je(c,"")}catch(Ge){Ht(t,t.return,Ge)}}if(l&4&&(c=t.stateNode,c!=null)){var d=t.memoizedProps,M=o!==null?o.memoizedProps:d,I=t.type,O=t.updateQueue;if(t.updateQueue=null,O!==null)try{I==="input"&&d.type==="radio"&&d.name!=null&&lt(c,d),tt(I,M);var ee=tt(I,d);for(M=0;M<O.length;M+=2){var ve=O[M],Me=O[M+1];ve==="style"?ze(c,Me):ve==="dangerouslySetInnerHTML"?Ce(c,Me):ve==="children"?Je(c,Me):U(c,ve,Me,ee)}switch(I){case"input":ft(c,d);break;case"textarea":V(c,d);break;case"select":var ge=c._wrapperState.wasMultiple;c._wrapperState.wasMultiple=!!d.multiple;var Oe=d.value;Oe!=null?b(c,!!d.multiple,Oe,!1):ge!==!!d.multiple&&(d.defaultValue!=null?b(c,!!d.multiple,d.defaultValue,!0):b(c,!!d.multiple,d.multiple?[]:"",!1))}c[xo]=d}catch(Ge){Ht(t,t.return,Ge)}}break;case 6:if(si(i,t),vi(t),l&4){if(t.stateNode===null)throw Error(n(162));c=t.stateNode,d=t.memoizedProps;try{c.nodeValue=d}catch(Ge){Ht(t,t.return,Ge)}}break;case 3:if(si(i,t),vi(t),l&4&&o!==null&&o.memoizedState.isDehydrated)try{ao(i.containerInfo)}catch(Ge){Ht(t,t.return,Ge)}break;case 4:si(i,t),vi(t);break;case 13:si(i,t),vi(t),c=t.child,c.flags&8192&&(d=c.memoizedState!==null,c.stateNode.isHidden=d,!d||c.alternate!==null&&c.alternate.memoizedState!==null||(rc=Ee())),l&4&&op(t);break;case 22:if(ve=o!==null&&o.memoizedState!==null,t.mode&1?(dn=(ee=dn)||ve,si(i,t),dn=ee):si(i,t),vi(t),l&8192){if(ee=t.memoizedState!==null,(t.stateNode.isHidden=ee)&&!ve&&(t.mode&1)!==0)for(Be=t,ve=t.child;ve!==null;){for(Me=Be=ve;Be!==null;){switch(ge=Be,Oe=ge.child,ge.tag){case 0:case 11:case 14:case 15:bo(4,ge,ge.return);break;case 1:Es(ge,ge.return);var He=ge.stateNode;if(typeof He.componentWillUnmount=="function"){l=ge,o=ge.return;try{i=l,He.props=i.memoizedProps,He.state=i.memoizedState,He.componentWillUnmount()}catch(Ge){Ht(l,o,Ge)}}break;case 5:Es(ge,ge.return);break;case 22:if(ge.memoizedState!==null){cp(Me);continue}}Oe!==null?(Oe.return=ge,Be=Oe):cp(Me)}ve=ve.sibling}e:for(ve=null,Me=t;;){if(Me.tag===5){if(ve===null){ve=Me;try{c=Me.stateNode,ee?(d=c.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none"):(I=Me.stateNode,O=Me.memoizedProps.style,M=O!=null&&O.hasOwnProperty("display")?O.display:null,I.style.display=Ie("display",M))}catch(Ge){Ht(t,t.return,Ge)}}}else if(Me.tag===6){if(ve===null)try{Me.stateNode.nodeValue=ee?"":Me.memoizedProps}catch(Ge){Ht(t,t.return,Ge)}}else if((Me.tag!==22&&Me.tag!==23||Me.memoizedState===null||Me===t)&&Me.child!==null){Me.child.return=Me,Me=Me.child;continue}if(Me===t)break e;for(;Me.sibling===null;){if(Me.return===null||Me.return===t)break e;ve===Me&&(ve=null),Me=Me.return}ve===Me&&(ve=null),Me.sibling.return=Me.return,Me=Me.sibling}}break;case 19:si(i,t),vi(t),l&4&&op(t);break;case 21:break;default:si(i,t),vi(t)}}function vi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(ip(o)){var l=o;break e}o=o.return}throw Error(n(160))}switch(l.tag){case 5:var c=l.stateNode;l.flags&32&&(Je(c,""),l.flags&=-33);var d=rp(t);tc(t,d,c);break;case 3:case 4:var M=l.stateNode.containerInfo,I=rp(t);ec(t,I,M);break;default:throw Error(n(161))}}catch(O){Ht(t,t.return,O)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function z_(t,i,o){Be=t,lp(t)}function lp(t,i,o){for(var l=(t.mode&1)!==0;Be!==null;){var c=Be,d=c.child;if(c.tag===22&&l){var M=c.memoizedState!==null||ka;if(!M){var I=c.alternate,O=I!==null&&I.memoizedState!==null||dn;I=ka;var ee=dn;if(ka=M,(dn=O)&&!ee)for(Be=c;Be!==null;)M=Be,O=M.child,M.tag===22&&M.memoizedState!==null?fp(c):O!==null?(O.return=M,Be=O):fp(c);for(;d!==null;)Be=d,lp(d),d=d.sibling;Be=c,ka=I,dn=ee}up(t)}else(c.subtreeFlags&8772)!==0&&d!==null?(d.return=c,Be=d):up(t)}}function up(t){for(;Be!==null;){var i=Be;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:dn||za(5,i);break;case 1:var l=i.stateNode;if(i.flags&4&&!dn)if(o===null)l.componentDidMount();else{var c=i.elementType===i.type?o.memoizedProps:ii(i.type,o.memoizedProps);l.componentDidUpdate(c,o.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var d=i.updateQueue;d!==null&&cd(i,d,l);break;case 3:var M=i.updateQueue;if(M!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}cd(i,M,o)}break;case 5:var I=i.stateNode;if(o===null&&i.flags&4){o=I;var O=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":O.autoFocus&&o.focus();break;case"img":O.src&&(o.src=O.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ee=i.alternate;if(ee!==null){var ve=ee.memoizedState;if(ve!==null){var Me=ve.dehydrated;Me!==null&&ao(Me)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}dn||i.flags&512&&Ju(i)}catch(ge){Ht(i,i.return,ge)}}if(i===t){Be=null;break}if(o=i.sibling,o!==null){o.return=i.return,Be=o;break}Be=i.return}}function cp(t){for(;Be!==null;){var i=Be;if(i===t){Be=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Be=o;break}Be=i.return}}function fp(t){for(;Be!==null;){var i=Be;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{za(4,i)}catch(O){Ht(i,o,O)}break;case 1:var l=i.stateNode;if(typeof l.componentDidMount=="function"){var c=i.return;try{l.componentDidMount()}catch(O){Ht(i,c,O)}}var d=i.return;try{Ju(i)}catch(O){Ht(i,d,O)}break;case 5:var M=i.return;try{Ju(i)}catch(O){Ht(i,M,O)}}}catch(O){Ht(i,i.return,O)}if(i===t){Be=null;break}var I=i.sibling;if(I!==null){I.return=i.return,Be=I;break}Be=i.return}}var B_=Math.ceil,Ba=R.ReactCurrentDispatcher,nc=R.ReactCurrentOwner,Yn=R.ReactCurrentBatchConfig,yt=0,en=null,Wt=null,an=0,On=0,Ts=Ji(0),Kt=0,Lo=null,Ir=0,Ha=0,ic=0,Do=null,Rn=null,rc=0,ws=1/0,Ii=null,Va=!1,sc=null,sr=null,Ga=!1,or=null,Wa=0,Io=0,oc=null,Xa=-1,ja=0;function xn(){return(yt&6)!==0?Ee():Xa!==-1?Xa:Xa=Ee()}function ar(t){return(t.mode&1)===0?1:(yt&2)!==0&&an!==0?an&-an:E_.transition!==null?(ja===0&&(ja=_n()),ja):(t=Ct,t!==0||(t=window.event,t=t===void 0?16:dh(t.type)),t)}function oi(t,i,o,l){if(50<Io)throw Io=0,oc=null,Error(n(185));Tn(t,o,l),((yt&2)===0||t!==en)&&(t===en&&((yt&2)===0&&(Ha|=o),Kt===4&&lr(t,an)),Pn(t,l),o===1&&yt===0&&(i.mode&1)===0&&(ws=Ee()+500,ya&&tr()))}function Pn(t,i){var o=t.callbackNode;Hn(t,i);var l=pi(t,t===en?an:0);if(l===0)o!==null&&ie(o),t.callbackNode=null,t.callbackPriority=0;else if(i=l&-l,t.callbackPriority!==i){if(o!=null&&ie(o),i===1)t.tag===0?M_(dp.bind(null,t)):Qh(dp.bind(null,t)),v_(function(){(yt&6)===0&&tr()}),o=null;else{switch(sh(l)){case 1:o=Ve;break;case 4:o=nt;break;case 16:o=rt;break;case 536870912:o=_t;break;default:o=rt}o=Sp(o,hp.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function hp(t,i){if(Xa=-1,ja=0,(yt&6)!==0)throw Error(n(327));var o=t.callbackNode;if(As()&&t.callbackNode!==o)return null;var l=pi(t,t===en?an:0);if(l===0)return null;if((l&30)!==0||(l&t.expiredLanes)!==0||i)i=Ya(t,l);else{i=l;var c=yt;yt|=2;var d=mp();(en!==t||an!==i)&&(Ii=null,ws=Ee()+500,Nr(t,i));do try{G_();break}catch(I){pp(t,I)}while(!0);Tu(),Ba.current=d,yt=c,Wt!==null?i=0:(en=null,an=0,i=Kt)}if(i!==0){if(i===2&&(c=wi(t),c!==0&&(l=c,i=ac(t,c))),i===1)throw o=Lo,Nr(t,0),lr(t,l),Pn(t,Ee()),o;if(i===6)lr(t,l);else{if(c=t.current.alternate,(l&30)===0&&!H_(c)&&(i=Ya(t,l),i===2&&(d=wi(t),d!==0&&(l=d,i=ac(t,d))),i===1))throw o=Lo,Nr(t,0),lr(t,l),Pn(t,Ee()),o;switch(t.finishedWork=c,t.finishedLanes=l,i){case 0:case 1:throw Error(n(345));case 2:Fr(t,Rn,Ii);break;case 3:if(lr(t,l),(l&130023424)===l&&(i=rc+500-Ee(),10<i)){if(pi(t,0)!==0)break;if(c=t.suspendedLanes,(c&l)!==l){xn(),t.pingedLanes|=t.suspendedLanes&c;break}t.timeoutHandle=du(Fr.bind(null,t,Rn,Ii),i);break}Fr(t,Rn,Ii);break;case 4:if(lr(t,l),(l&4194240)===l)break;for(i=t.eventTimes,c=-1;0<l;){var M=31-ct(l);d=1<<M,M=i[M],M>c&&(c=M),l&=~d}if(l=c,l=Ee()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*B_(l/1960))-l,10<l){t.timeoutHandle=du(Fr.bind(null,t,Rn,Ii),l);break}Fr(t,Rn,Ii);break;case 5:Fr(t,Rn,Ii);break;default:throw Error(n(329))}}}return Pn(t,Ee()),t.callbackNode===o?hp.bind(null,t):null}function ac(t,i){var o=Do;return t.current.memoizedState.isDehydrated&&(Nr(t,i).flags|=256),t=Ya(t,i),t!==2&&(i=Rn,Rn=o,i!==null&&lc(i)),t}function lc(t){Rn===null?Rn=t:Rn.push.apply(Rn,t)}function H_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var l=0;l<o.length;l++){var c=o[l],d=c.getSnapshot;c=c.value;try{if(!ti(d(),c))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function lr(t,i){for(i&=~ic,i&=~Ha,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-ct(i),l=1<<o;t[o]=-1,i&=~l}}function dp(t){if((yt&6)!==0)throw Error(n(327));As();var i=pi(t,0);if((i&1)===0)return Pn(t,Ee()),null;var o=Ya(t,i);if(t.tag!==0&&o===2){var l=wi(t);l!==0&&(i=l,o=ac(t,l))}if(o===1)throw o=Lo,Nr(t,0),lr(t,i),Pn(t,Ee()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Fr(t,Rn,Ii),Pn(t,Ee()),null}function uc(t,i){var o=yt;yt|=1;try{return t(i)}finally{yt=o,yt===0&&(ws=Ee()+500,ya&&tr())}}function Ur(t){or!==null&&or.tag===0&&(yt&6)===0&&As();var i=yt;yt|=1;var o=Yn.transition,l=Ct;try{if(Yn.transition=null,Ct=1,t)return t()}finally{Ct=l,Yn.transition=o,yt=i,(yt&6)===0&&tr()}}function cc(){On=Ts.current,Nt(Ts)}function Nr(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,__(o)),Wt!==null)for(o=Wt.return;o!==null;){var l=o;switch(xu(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&va();break;case 3:Ss(),Nt(wn),Nt(cn),Du();break;case 5:bu(l);break;case 4:Ss();break;case 13:Nt(zt);break;case 19:Nt(zt);break;case 10:wu(l.type._context);break;case 22:case 23:cc()}o=o.return}if(en=t,Wt=t=ur(t.current,null),an=On=i,Kt=0,Lo=null,ic=Ha=Ir=0,Rn=Do=null,br!==null){for(i=0;i<br.length;i++)if(o=br[i],l=o.interleaved,l!==null){o.interleaved=null;var c=l.next,d=o.pending;if(d!==null){var M=d.next;d.next=c,l.next=M}o.pending=l}br=null}return t}function pp(t,i){do{var o=Wt;try{if(Tu(),ba.current=Ua,La){for(var l=Bt.memoizedState;l!==null;){var c=l.queue;c!==null&&(c.pending=null),l=l.next}La=!1}if(Dr=0,Jt=qt=Bt=null,wo=!1,Ao=0,nc.current=null,o===null||o.return===null){Kt=1,Lo=i,Wt=null;break}e:{var d=t,M=o.return,I=o,O=i;if(i=an,I.flags|=32768,O!==null&&typeof O=="object"&&typeof O.then=="function"){var ee=O,ve=I,Me=ve.tag;if((ve.mode&1)===0&&(Me===0||Me===11||Me===15)){var ge=ve.alternate;ge?(ve.updateQueue=ge.updateQueue,ve.memoizedState=ge.memoizedState,ve.lanes=ge.lanes):(ve.updateQueue=null,ve.memoizedState=null)}var Oe=zd(M);if(Oe!==null){Oe.flags&=-257,Bd(Oe,M,I,d,i),Oe.mode&1&&kd(d,ee,i),i=Oe,O=ee;var He=i.updateQueue;if(He===null){var Ge=new Set;Ge.add(O),i.updateQueue=Ge}else He.add(O);break e}else{if((i&1)===0){kd(d,ee,i),fc();break e}O=Error(n(426))}}else if(kt&&I.mode&1){var Gt=zd(M);if(Gt!==null){(Gt.flags&65536)===0&&(Gt.flags|=256),Bd(Gt,M,I,d,i),Mu(Ms(O,I));break e}}d=O=Ms(O,I),Kt!==4&&(Kt=2),Do===null?Do=[d]:Do.push(d),d=M;do{switch(d.tag){case 3:d.flags|=65536,i&=-i,d.lanes|=i;var q=Fd(d,O,i);ud(d,q);break e;case 1:I=O;var H=d.type,$=d.stateNode;if((d.flags&128)===0&&(typeof H.getDerivedStateFromError=="function"||$!==null&&typeof $.componentDidCatch=="function"&&(sr===null||!sr.has($)))){d.flags|=65536,i&=-i,d.lanes|=i;var we=Od(d,I,i);ud(d,we);break e}}d=d.return}while(d!==null)}_p(o)}catch(Ye){i=Ye,Wt===o&&o!==null&&(Wt=o=o.return);continue}break}while(!0)}function mp(){var t=Ba.current;return Ba.current=Ua,t===null?Ua:t}function fc(){(Kt===0||Kt===3||Kt===2)&&(Kt=4),en===null||(Ir&268435455)===0&&(Ha&268435455)===0||lr(en,an)}function Ya(t,i){var o=yt;yt|=2;var l=mp();(en!==t||an!==i)&&(Ii=null,Nr(t,i));do try{V_();break}catch(c){pp(t,c)}while(!0);if(Tu(),yt=o,Ba.current=l,Wt!==null)throw Error(n(261));return en=null,an=0,Kt}function V_(){for(;Wt!==null;)gp(Wt)}function G_(){for(;Wt!==null&&!j();)gp(Wt)}function gp(t){var i=yp(t.alternate,t,On);t.memoizedProps=t.pendingProps,i===null?_p(t):Wt=i,nc.current=null}function _p(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=N_(o,i,On),o!==null){Wt=o;return}}else{if(o=F_(o,i),o!==null){o.flags&=32767,Wt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Kt=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=t}while(i!==null);Kt===0&&(Kt=5)}function Fr(t,i,o){var l=Ct,c=Yn.transition;try{Yn.transition=null,Ct=1,W_(t,i,o,l)}finally{Yn.transition=c,Ct=l}return null}function W_(t,i,o,l){do As();while(or!==null);if((yt&6)!==0)throw Error(n(327));o=t.finishedWork;var c=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var d=o.lanes|o.childLanes;if(ta(t,d),t===en&&(Wt=en=null,an=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Ga||(Ga=!0,Sp(rt,function(){return As(),null})),d=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||d){d=Yn.transition,Yn.transition=null;var M=Ct;Ct=1;var I=yt;yt|=4,nc.current=null,k_(t,o),ap(o,t),c_(fu),ra=!!cu,fu=cu=null,t.current=o,z_(o),Ae(),yt=I,Ct=M,Yn.transition=d}else t.current=o;if(Ga&&(Ga=!1,or=t,Wa=c),d=t.pendingLanes,d===0&&(sr=null),ln(o.stateNode),Pn(t,Ee()),i!==null)for(l=t.onRecoverableError,o=0;o<i.length;o++)c=i[o],l(c.value,{componentStack:c.stack,digest:c.digest});if(Va)throw Va=!1,t=sc,sc=null,t;return(Wa&1)!==0&&t.tag!==0&&As(),d=t.pendingLanes,(d&1)!==0?t===oc?Io++:(Io=0,oc=t):Io=0,tr(),null}function As(){if(or!==null){var t=sh(Wa),i=Yn.transition,o=Ct;try{if(Yn.transition=null,Ct=16>t?16:t,or===null)var l=!1;else{if(t=or,or=null,Wa=0,(yt&6)!==0)throw Error(n(331));var c=yt;for(yt|=4,Be=t.current;Be!==null;){var d=Be,M=d.child;if((Be.flags&16)!==0){var I=d.deletions;if(I!==null){for(var O=0;O<I.length;O++){var ee=I[O];for(Be=ee;Be!==null;){var ve=Be;switch(ve.tag){case 0:case 11:case 15:bo(8,ve,d)}var Me=ve.child;if(Me!==null)Me.return=ve,Be=Me;else for(;Be!==null;){ve=Be;var ge=ve.sibling,Oe=ve.return;if(np(ve),ve===ee){Be=null;break}if(ge!==null){ge.return=Oe,Be=ge;break}Be=Oe}}}var He=d.alternate;if(He!==null){var Ge=He.child;if(Ge!==null){He.child=null;do{var Gt=Ge.sibling;Ge.sibling=null,Ge=Gt}while(Ge!==null)}}Be=d}}if((d.subtreeFlags&2064)!==0&&M!==null)M.return=d,Be=M;else e:for(;Be!==null;){if(d=Be,(d.flags&2048)!==0)switch(d.tag){case 0:case 11:case 15:bo(9,d,d.return)}var q=d.sibling;if(q!==null){q.return=d.return,Be=q;break e}Be=d.return}}var H=t.current;for(Be=H;Be!==null;){M=Be;var $=M.child;if((M.subtreeFlags&2064)!==0&&$!==null)$.return=M,Be=$;else e:for(M=H;Be!==null;){if(I=Be,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:za(9,I)}}catch(Ye){Ht(I,I.return,Ye)}if(I===M){Be=null;break e}var we=I.sibling;if(we!==null){we.return=I.return,Be=we;break e}Be=I.return}}if(yt=c,tr(),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(wt,t)}catch{}l=!0}return l}finally{Ct=o,Yn.transition=i}}return!1}function vp(t,i,o){i=Ms(o,i),i=Fd(t,i,1),t=ir(t,i,1),i=xn(),t!==null&&(Tn(t,1,i),Pn(t,i))}function Ht(t,i,o){if(t.tag===3)vp(t,t,o);else for(;i!==null;){if(i.tag===3){vp(i,t,o);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(sr===null||!sr.has(l))){t=Ms(o,t),t=Od(i,t,1),i=ir(i,t,1),t=xn(),i!==null&&(Tn(i,1,t),Pn(i,t));break}}i=i.return}}function X_(t,i,o){var l=t.pingCache;l!==null&&l.delete(i),i=xn(),t.pingedLanes|=t.suspendedLanes&o,en===t&&(an&o)===o&&(Kt===4||Kt===3&&(an&130023424)===an&&500>Ee()-rc?Nr(t,0):ic|=o),Pn(t,i)}function xp(t,i){i===0&&((t.mode&1)===0?i=1:(i=ei,ei<<=1,(ei&130023424)===0&&(ei=4194304)));var o=xn();t=bi(t,i),t!==null&&(Tn(t,i,o),Pn(t,o))}function j_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),xp(t,o)}function Y_(t,i){var o=0;switch(t.tag){case 13:var l=t.stateNode,c=t.memoizedState;c!==null&&(o=c.retryLane);break;case 19:l=t.stateNode;break;default:throw Error(n(314))}l!==null&&l.delete(i),xp(t,o)}var yp;yp=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||wn.current)Cn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return Cn=!1,U_(t,i,o);Cn=(t.flags&131072)!==0}else Cn=!1,kt&&(i.flags&1048576)!==0&&Jh(i,Ma,i.index);switch(i.lanes=0,i.tag){case 2:var l=i.type;Oa(t,i),t=i.pendingProps;var c=ps(i,cn.current);ys(i,o),c=Nu(null,i,l,t,c,o);var d=Fu();return i.flags|=1,typeof c=="object"&&c!==null&&typeof c.render=="function"&&c.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,An(l)?(d=!0,xa(i)):d=!1,i.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,Ru(i),c.updater=Na,i.stateNode=c,c._reactInternals=i,Vu(i,l,t,o),i=ju(null,i,l,!0,d,o)):(i.tag=0,kt&&d&&vu(i),vn(null,i,c,o),i=i.child),i;case 16:l=i.elementType;e:{switch(Oa(t,i),t=i.pendingProps,c=l._init,l=c(l._payload),i.type=l,c=i.tag=K_(l),t=ii(l,t),c){case 0:i=Xu(null,i,l,t,o);break e;case 1:i=jd(null,i,l,t,o);break e;case 11:i=Hd(null,i,l,t,o);break e;case 14:i=Vd(null,i,l,ii(l.type,t),o);break e}throw Error(n(306,l,""))}return i;case 0:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ii(l,c),Xu(t,i,l,c,o);case 1:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ii(l,c),jd(t,i,l,c,o);case 3:e:{if(Yd(i),t===null)throw Error(n(387));l=i.pendingProps,d=i.memoizedState,c=d.element,ld(t,i),Ra(i,l,null,o);var M=i.memoizedState;if(l=M.element,d.isDehydrated)if(d={element:l,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){c=Ms(Error(n(423)),i),i=qd(t,i,l,o,c);break e}else if(l!==c){c=Ms(Error(n(424)),i),i=qd(t,i,l,o,c);break e}else for(Fn=Qi(i.stateNode.containerInfo.firstChild),Nn=i,kt=!0,ni=null,o=od(i,null,l,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(_s(),l===c){i=Di(t,i,o);break e}vn(t,i,l,o)}i=i.child}return i;case 5:return fd(i),t===null&&Su(i),l=i.type,c=i.pendingProps,d=t!==null?t.memoizedProps:null,M=c.children,hu(l,c)?M=null:d!==null&&hu(l,d)&&(i.flags|=32),Xd(t,i),vn(t,i,M,o),i.child;case 6:return t===null&&Su(i),null;case 13:return Kd(t,i,o);case 4:return Pu(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=vs(i,null,l,o):vn(t,i,l,o),i.child;case 11:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ii(l,c),Hd(t,i,l,c,o);case 7:return vn(t,i,i.pendingProps,o),i.child;case 8:return vn(t,i,i.pendingProps.children,o),i.child;case 12:return vn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(l=i.type._context,c=i.pendingProps,d=i.memoizedProps,M=c.value,Dt(wa,l._currentValue),l._currentValue=M,d!==null)if(ti(d.value,M)){if(d.children===c.children&&!wn.current){i=Di(t,i,o);break e}}else for(d=i.child,d!==null&&(d.return=i);d!==null;){var I=d.dependencies;if(I!==null){M=d.child;for(var O=I.firstContext;O!==null;){if(O.context===l){if(d.tag===1){O=Li(-1,o&-o),O.tag=2;var ee=d.updateQueue;if(ee!==null){ee=ee.shared;var ve=ee.pending;ve===null?O.next=O:(O.next=ve.next,ve.next=O),ee.pending=O}}d.lanes|=o,O=d.alternate,O!==null&&(O.lanes|=o),Au(d.return,o,i),I.lanes|=o;break}O=O.next}}else if(d.tag===10)M=d.type===i.type?null:d.child;else if(d.tag===18){if(M=d.return,M===null)throw Error(n(341));M.lanes|=o,I=M.alternate,I!==null&&(I.lanes|=o),Au(M,o,i),M=d.sibling}else M=d.child;if(M!==null)M.return=d;else for(M=d;M!==null;){if(M===i){M=null;break}if(d=M.sibling,d!==null){d.return=M.return,M=d;break}M=M.return}d=M}vn(t,i,c.children,o),i=i.child}return i;case 9:return c=i.type,l=i.pendingProps.children,ys(i,o),c=Xn(c),l=l(c),i.flags|=1,vn(t,i,l,o),i.child;case 14:return l=i.type,c=ii(l,i.pendingProps),c=ii(l.type,c),Vd(t,i,l,c,o);case 15:return Gd(t,i,i.type,i.pendingProps,o);case 17:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ii(l,c),Oa(t,i),i.tag=1,An(l)?(t=!0,xa(i)):t=!1,ys(i,o),Ud(i,l,c),Vu(i,l,c,o),ju(null,i,l,!0,t,o);case 19:return Zd(t,i,o);case 22:return Wd(t,i,o)}throw Error(n(156,i.tag))};function Sp(t,i){return ne(t,i)}function q_(t,i,o,l){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qn(t,i,o,l){return new q_(t,i,o,l)}function hc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function K_(t){if(typeof t=="function")return hc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===le)return 11;if(t===me)return 14}return 2}function ur(t,i){var o=t.alternate;return o===null?(o=qn(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function qa(t,i,o,l,c,d){var M=2;if(l=t,typeof t=="function")hc(t)&&(M=1);else if(typeof t=="string")M=5;else e:switch(t){case F:return Or(o.children,c,d,i);case Y:M=8,c|=8;break;case P:return t=qn(12,o,i,c|2),t.elementType=P,t.lanes=d,t;case te:return t=qn(13,o,i,c),t.elementType=te,t.lanes=d,t;case fe:return t=qn(19,o,i,c),t.elementType=fe,t.lanes=d,t;case he:return Ka(o,c,d,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case C:M=10;break e;case z:M=9;break e;case le:M=11;break e;case me:M=14;break e;case ue:M=16,l=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=qn(M,o,i,c),i.elementType=t,i.type=l,i.lanes=d,i}function Or(t,i,o,l){return t=qn(7,t,l,i),t.lanes=o,t}function Ka(t,i,o,l){return t=qn(22,t,l,i),t.elementType=he,t.lanes=o,t.stateNode={isHidden:!1},t}function dc(t,i,o){return t=qn(6,t,null,i),t.lanes=o,t}function pc(t,i,o){return i=qn(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function $_(t,i,o,l,c){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vn(0),this.expirationTimes=Vn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vn(0),this.identifierPrefix=l,this.onRecoverableError=c,this.mutableSourceEagerHydrationData=null}function mc(t,i,o,l,c,d,M,I,O){return t=new $_(t,i,o,I,O),i===1?(i=1,d===!0&&(i|=8)):i=0,d=qn(3,null,null,i),t.current=d,d.stateNode=t,d.memoizedState={element:l,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ru(d),t}function Z_(t,i,o){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:B,key:l==null?null:""+l,children:t,containerInfo:i,implementation:o}}function Mp(t){if(!t)return er;t=t._reactInternals;e:{if(di(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(An(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(An(o))return $h(t,o,i)}return i}function Ep(t,i,o,l,c,d,M,I,O){return t=mc(o,l,!0,t,c,d,M,I,O),t.context=Mp(null),o=t.current,l=xn(),c=ar(o),d=Li(l,c),d.callback=i??null,ir(o,d,c),t.current.lanes=c,Tn(t,c,l),Pn(t,l),t}function $a(t,i,o,l){var c=i.current,d=xn(),M=ar(c);return o=Mp(o),i.context===null?i.context=o:i.pendingContext=o,i=Li(d,M),i.payload={element:t},l=l===void 0?null:l,l!==null&&(i.callback=l),t=ir(c,i,M),t!==null&&(oi(t,c,M,d),Ca(t,c,M)),M}function Za(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Tp(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function gc(t,i){Tp(t,i),(t=t.alternate)&&Tp(t,i)}function Q_(){return null}var wp=typeof reportError=="function"?reportError:function(t){console.error(t)};function _c(t){this._internalRoot=t}Qa.prototype.render=_c.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));$a(t,i,null,null)},Qa.prototype.unmount=_c.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Ur(function(){$a(null,t,null,null)}),i[Ai]=null}};function Qa(t){this._internalRoot=t}Qa.prototype.unstable_scheduleHydration=function(t){if(t){var i=lh();t={blockedOn:null,target:t,priority:i};for(var o=0;o<Ki.length&&i!==0&&i<Ki[o].priority;o++);Ki.splice(o,0,t),o===0&&fh(t)}};function vc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ja(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ap(){}function J_(t,i,o,l,c){if(c){if(typeof l=="function"){var d=l;l=function(){var ee=Za(M);d.call(ee)}}var M=Ep(i,l,t,0,null,!1,!1,"",Ap);return t._reactRootContainer=M,t[Ai]=M.current,_o(t.nodeType===8?t.parentNode:t),Ur(),M}for(;c=t.lastChild;)t.removeChild(c);if(typeof l=="function"){var I=l;l=function(){var ee=Za(O);I.call(ee)}}var O=mc(t,0,!1,null,null,!1,!1,"",Ap);return t._reactRootContainer=O,t[Ai]=O.current,_o(t.nodeType===8?t.parentNode:t),Ur(function(){$a(i,O,o,l)}),O}function el(t,i,o,l,c){var d=o._reactRootContainer;if(d){var M=d;if(typeof c=="function"){var I=c;c=function(){var O=Za(M);I.call(O)}}$a(i,M,t,c)}else M=J_(o,i,t,c,l);return Za(M)}oh=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Yt(i.pendingLanes);o!==0&&(Vl(i,o|1),Pn(i,Ee()),(yt&6)===0&&(ws=Ee()+500,tr()))}break;case 13:Ur(function(){var l=bi(t,1);if(l!==null){var c=xn();oi(l,t,1,c)}}),gc(t,1)}},Gl=function(t){if(t.tag===13){var i=bi(t,134217728);if(i!==null){var o=xn();oi(i,t,134217728,o)}gc(t,134217728)}},ah=function(t){if(t.tag===13){var i=ar(t),o=bi(t,i);if(o!==null){var l=xn();oi(o,t,i,l)}gc(t,i)}},lh=function(){return Ct},uh=function(t,i){var o=Ct;try{return Ct=t,i()}finally{Ct=o}},Le=function(t,i,o){switch(i){case"input":if(ft(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var l=o[i];if(l!==t&&l.form===t.form){var c=_a(l);if(!c)throw Error(n(90));at(l),ft(l,c)}}}break;case"textarea":V(t,o);break;case"select":i=o.value,i!=null&&b(t,!!o.multiple,i,!1)}},It=uc,jt=Ur;var ev={usingClientEntryPoint:!1,Events:[yo,hs,_a,Ue,ot,uc]},Uo={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},tv={bundleType:Uo.bundleType,version:Uo.version,rendererPackageName:Uo.rendererPackageName,rendererConfig:Uo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:R.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=w(t),t===null?null:t.stateNode},findFiberByHostInstance:Uo.findFiberByHostInstance||Q_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var tl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!tl.isDisabled&&tl.supportsFiber)try{wt=tl.inject(tv),gt=tl}catch{}}return bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ev,bn.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!vc(i))throw Error(n(200));return Z_(t,i,null,o)},bn.createRoot=function(t,i){if(!vc(t))throw Error(n(299));var o=!1,l="",c=wp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onRecoverableError!==void 0&&(c=i.onRecoverableError)),i=mc(t,1,!1,null,null,o,!1,l,c),t[Ai]=i.current,_o(t.nodeType===8?t.parentNode:t),new _c(i)},bn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=w(i),t=t===null?null:t.stateNode,t},bn.flushSync=function(t){return Ur(t)},bn.hydrate=function(t,i,o){if(!Ja(i))throw Error(n(200));return el(null,t,i,!0,o)},bn.hydrateRoot=function(t,i,o){if(!vc(t))throw Error(n(405));var l=o!=null&&o.hydratedSources||null,c=!1,d="",M=wp;if(o!=null&&(o.unstable_strictMode===!0&&(c=!0),o.identifierPrefix!==void 0&&(d=o.identifierPrefix),o.onRecoverableError!==void 0&&(M=o.onRecoverableError)),i=Ep(i,null,t,1,o??null,c,!1,d,M),t[Ai]=i.current,_o(t),l)for(t=0;t<l.length;t++)o=l[t],c=o._getVersion,c=c(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,c]:i.mutableSourceEagerHydrationData.push(o,c);return new Qa(i)},bn.render=function(t,i,o){if(!Ja(i))throw Error(n(200));return el(null,t,i,!1,o)},bn.unmountComponentAtNode=function(t){if(!Ja(t))throw Error(n(40));return t._reactRootContainer?(Ur(function(){el(null,null,t,!1,function(){t._reactRootContainer=null,t[Ai]=null})}),!0):!1},bn.unstable_batchedUpdates=uc,bn.unstable_renderSubtreeIntoContainer=function(t,i,o,l){if(!Ja(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return el(t,i,o,!1,l)},bn.version="18.3.1-next-f1338f8080-20240426",bn}var Up;function fv(){if(Up)return Sc.exports;Up=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Sc.exports=cv(),Sc.exports}var Np;function hv(){if(Np)return nl;Np=1;var s=fv();return nl.createRoot=s.createRoot,nl.hydrateRoot=s.hydrateRoot,nl}var dv=hv();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xf="170",Ws={ROTATE:0,DOLLY:1,PAN:2},Vs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pv=0,Fp=1,mv=2,Wm=1,Xm=2,zi=3,Mr=0,In=1,Bi=2,yr=0,Xs=1,Op=2,kp=3,zp=4,gv=5,Xr=100,_v=101,vv=102,xv=103,yv=104,Sv=200,Mv=201,Ev=202,Tv=203,tf=204,nf=205,wv=206,Av=207,Cv=208,Rv=209,Pv=210,bv=211,Lv=212,Dv=213,Iv=214,rf=0,sf=1,of=2,qs=3,af=4,lf=5,uf=6,cf=7,jf=0,Uv=1,Nv=2,Sr=0,Fv=1,Ov=2,kv=3,zv=4,Bv=5,Hv=6,Vv=7,jm=300,Ks=301,$s=302,ff=303,hf=304,Ol=306,df=1e3,Yr=1001,pf=1002,Bn=1003,Gv=1004,il=1005,yi=1006,Tc=1007,qr=1008,Gi=1009,Ym=1010,qm=1011,jo=1012,Yf=1013,$r=1014,Si=1015,Yo=1016,qf=1017,Kf=1018,Zs=1020,Km=35902,$m=1021,Zm=1022,fi=1023,Qm=1024,Jm=1025,js=1026,Qs=1027,$f=1028,Zf=1029,eg=1030,Qf=1031,Jf=1033,Rl=33776,Pl=33777,bl=33778,Ll=33779,mf=35840,gf=35841,_f=35842,vf=35843,xf=36196,yf=37492,Sf=37496,Mf=37808,Ef=37809,Tf=37810,wf=37811,Af=37812,Cf=37813,Rf=37814,Pf=37815,bf=37816,Lf=37817,Df=37818,If=37819,Uf=37820,Nf=37821,Dl=36492,Ff=36494,Of=36495,tg=36283,kf=36284,zf=36285,Bf=36286,Wv=3200,Xv=3201,ng=0,jv=1,xr="",$n="srgb",to="srgb-linear",kl="linear",Pt="srgb",Cs=7680,Bp=519,Yv=512,qv=513,Kv=514,ig=515,$v=516,Zv=517,Qv=518,Jv=519,Hp=35044,Vp="300 es",Hi=2e3,Nl=2001;class es{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const u=a.indexOf(n);u!==-1&&a.splice(u,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let u=0,f=a.length;u<f;u++)a[u].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Il=Math.PI/180,Hf=180/Math.PI;function qo(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(pn[s&255]+pn[s>>8&255]+pn[s>>16&255]+pn[s>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[n&63|128]+pn[n>>8&255]+"-"+pn[n>>16&255]+pn[n>>24&255]+pn[r&255]+pn[r>>8&255]+pn[r>>16&255]+pn[r>>24&255]).toLowerCase()}function Sn(s,e,n){return Math.max(e,Math.min(n,s))}function e0(s,e){return(s%e+e)%e}function wc(s,e,n){return(1-n)*s+n*e}function Fo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ln(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const t0={DEG2RAD:Il};class dt{constructor(e=0,n=0){dt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Sn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),u=this.x-e.x,f=this.y-e.y;return this.x=u*r-f*a+e.x,this.y=u*a+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ht{constructor(e,n,r,a,u,f,h,p,m){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,u,f,h,p,m)}set(e,n,r,a,u,f,h,p,m){const _=this.elements;return _[0]=e,_[1]=a,_[2]=h,_[3]=n,_[4]=u,_[5]=p,_[6]=r,_[7]=f,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,u=this.elements,f=r[0],h=r[3],p=r[6],m=r[1],_=r[4],v=r[7],x=r[2],S=r[5],T=r[8],A=a[0],y=a[3],g=a[6],L=a[1],U=a[4],R=a[7],Q=a[2],B=a[5],F=a[8];return u[0]=f*A+h*L+p*Q,u[3]=f*y+h*U+p*B,u[6]=f*g+h*R+p*F,u[1]=m*A+_*L+v*Q,u[4]=m*y+_*U+v*B,u[7]=m*g+_*R+v*F,u[2]=x*A+S*L+T*Q,u[5]=x*y+S*U+T*B,u[8]=x*g+S*R+T*F,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],h=e[5],p=e[6],m=e[7],_=e[8];return n*f*_-n*h*m-r*u*_+r*h*p+a*u*m-a*f*p}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],h=e[5],p=e[6],m=e[7],_=e[8],v=_*f-h*m,x=h*p-_*u,S=m*u-f*p,T=n*v+r*x+a*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=v*A,e[1]=(a*m-_*r)*A,e[2]=(h*r-a*f)*A,e[3]=x*A,e[4]=(_*n-a*p)*A,e[5]=(a*u-h*n)*A,e[6]=S*A,e[7]=(r*p-m*n)*A,e[8]=(f*n-r*u)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,u,f,h){const p=Math.cos(u),m=Math.sin(u);return this.set(r*p,r*m,-r*(p*f+m*h)+f+e,-a*m,a*p,-a*(-m*f+p*h)+h+n,0,0,1),this}scale(e,n){return this.premultiply(Ac.makeScale(e,n)),this}rotate(e){return this.premultiply(Ac.makeRotation(-e)),this}translate(e,n){return this.premultiply(Ac.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ac=new ht;function rg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Fl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function n0(){const s=Fl("canvas");return s.style.display="block",s}const Gp={};function Wo(s){s in Gp||(Gp[s]=!0,console.warn(s))}function i0(s,e,n){return new Promise(function(r,a){function u(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(u,n);break;default:r()}}setTimeout(u,n)})}function r0(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function s0(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const St={enabled:!0,workingColorSpace:to,spaces:{},convert:function(s,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===Pt&&(s.r=Vi(s.r),s.g=Vi(s.g),s.b=Vi(s.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Pt&&(s.r=Ys(s.r),s.g=Ys(s.g),s.b=Ys(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xr?kl:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,n){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Vi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ys(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Wp=[.64,.33,.3,.6,.15,.06],Xp=[.2126,.7152,.0722],jp=[.3127,.329],Yp=new ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qp=new ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);St.define({[to]:{primaries:Wp,whitePoint:jp,transfer:kl,toXYZ:Yp,fromXYZ:qp,luminanceCoefficients:Xp,workingColorSpaceConfig:{unpackColorSpace:$n},outputColorSpaceConfig:{drawingBufferColorSpace:$n}},[$n]:{primaries:Wp,whitePoint:jp,transfer:Pt,toXYZ:Yp,fromXYZ:qp,luminanceCoefficients:Xp,outputColorSpaceConfig:{drawingBufferColorSpace:$n}}});let Rs;class o0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Rs===void 0&&(Rs=Fl("canvas")),Rs.width=e.width,Rs.height=e.height;const r=Rs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Rs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Fl("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),u=a.data;for(let f=0;f<u.length;f++)u[f]=Vi(u[f]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Vi(n[r]/255)*255):n[r]=Vi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let a0=0;class sg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=qo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let u;if(Array.isArray(a)){u=[];for(let f=0,h=a.length;f<h;f++)a[f].isDataTexture?u.push(Cc(a[f].image)):u.push(Cc(a[f]))}else u=Cc(a);r.url=u}return n||(e.images[this.uuid]=r),r}}function Cc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?o0.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let l0=0;class Mn extends es{constructor(e=Mn.DEFAULT_IMAGE,n=Mn.DEFAULT_MAPPING,r=Yr,a=Yr,u=yi,f=qr,h=fi,p=Gi,m=Mn.DEFAULT_ANISOTROPY,_=xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=qo(),this.name="",this.source=new sg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=u,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case df:e.x=e.x-Math.floor(e.x);break;case Yr:e.x=e.x<0?0:1;break;case pf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case df:e.y=e.y-Math.floor(e.y);break;case Yr:e.y=e.y<0?0:1;break;case pf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=jm;Mn.DEFAULT_ANISOTROPY=1;class Vt{constructor(e=0,n=0,r=0,a=1){Vt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,u=this.w,f=e.elements;return this.x=f[0]*n+f[4]*r+f[8]*a+f[12]*u,this.y=f[1]*n+f[5]*r+f[9]*a+f[13]*u,this.z=f[2]*n+f[6]*r+f[10]*a+f[14]*u,this.w=f[3]*n+f[7]*r+f[11]*a+f[15]*u,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,u;const p=e.elements,m=p[0],_=p[4],v=p[8],x=p[1],S=p[5],T=p[9],A=p[2],y=p[6],g=p[10];if(Math.abs(_-x)<.01&&Math.abs(v-A)<.01&&Math.abs(T-y)<.01){if(Math.abs(_+x)<.1&&Math.abs(v+A)<.1&&Math.abs(T+y)<.1&&Math.abs(m+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const U=(m+1)/2,R=(S+1)/2,Q=(g+1)/2,B=(_+x)/4,F=(v+A)/4,Y=(T+y)/4;return U>R&&U>Q?U<.01?(r=0,a=.707106781,u=.707106781):(r=Math.sqrt(U),a=B/r,u=F/r):R>Q?R<.01?(r=.707106781,a=0,u=.707106781):(a=Math.sqrt(R),r=B/a,u=Y/a):Q<.01?(r=.707106781,a=.707106781,u=0):(u=Math.sqrt(Q),r=F/u,a=Y/u),this.set(r,a,u,n),this}let L=Math.sqrt((y-T)*(y-T)+(v-A)*(v-A)+(x-_)*(x-_));return Math.abs(L)<.001&&(L=1),this.x=(y-T)/L,this.y=(v-A)/L,this.z=(x-_)/L,this.w=Math.acos((m+S+g-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class u0 extends es{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Vt(0,0,e,n),this.scissorTest=!1,this.viewport=new Vt(0,0,e,n);const a={width:e,height:n,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const u=new Mn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);u.flipY=!1,u.generateMipmaps=r.generateMipmaps,u.internalFormat=r.internalFormat,this.textures=[];const f=r.count;for(let h=0;h<f;h++)this.textures[h]=u.clone(),this.textures[h].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,u=this.textures.length;a<u;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new sg(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zr extends u0{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class og extends Mn{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class c0 extends Mn{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qr{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,u,f,h){let p=r[a+0],m=r[a+1],_=r[a+2],v=r[a+3];const x=u[f+0],S=u[f+1],T=u[f+2],A=u[f+3];if(h===0){e[n+0]=p,e[n+1]=m,e[n+2]=_,e[n+3]=v;return}if(h===1){e[n+0]=x,e[n+1]=S,e[n+2]=T,e[n+3]=A;return}if(v!==A||p!==x||m!==S||_!==T){let y=1-h;const g=p*x+m*S+_*T+v*A,L=g>=0?1:-1,U=1-g*g;if(U>Number.EPSILON){const Q=Math.sqrt(U),B=Math.atan2(Q,g*L);y=Math.sin(y*B)/Q,h=Math.sin(h*B)/Q}const R=h*L;if(p=p*y+x*R,m=m*y+S*R,_=_*y+T*R,v=v*y+A*R,y===1-h){const Q=1/Math.sqrt(p*p+m*m+_*_+v*v);p*=Q,m*=Q,_*=Q,v*=Q}}e[n]=p,e[n+1]=m,e[n+2]=_,e[n+3]=v}static multiplyQuaternionsFlat(e,n,r,a,u,f){const h=r[a],p=r[a+1],m=r[a+2],_=r[a+3],v=u[f],x=u[f+1],S=u[f+2],T=u[f+3];return e[n]=h*T+_*v+p*S-m*x,e[n+1]=p*T+_*x+m*v-h*S,e[n+2]=m*T+_*S+h*x-p*v,e[n+3]=_*T-h*v-p*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,u=e._z,f=e._order,h=Math.cos,p=Math.sin,m=h(r/2),_=h(a/2),v=h(u/2),x=p(r/2),S=p(a/2),T=p(u/2);switch(f){case"XYZ":this._x=x*_*v+m*S*T,this._y=m*S*v-x*_*T,this._z=m*_*T+x*S*v,this._w=m*_*v-x*S*T;break;case"YXZ":this._x=x*_*v+m*S*T,this._y=m*S*v-x*_*T,this._z=m*_*T-x*S*v,this._w=m*_*v+x*S*T;break;case"ZXY":this._x=x*_*v-m*S*T,this._y=m*S*v+x*_*T,this._z=m*_*T+x*S*v,this._w=m*_*v-x*S*T;break;case"ZYX":this._x=x*_*v-m*S*T,this._y=m*S*v+x*_*T,this._z=m*_*T-x*S*v,this._w=m*_*v+x*S*T;break;case"YZX":this._x=x*_*v+m*S*T,this._y=m*S*v+x*_*T,this._z=m*_*T-x*S*v,this._w=m*_*v-x*S*T;break;case"XZY":this._x=x*_*v-m*S*T,this._y=m*S*v-x*_*T,this._z=m*_*T+x*S*v,this._w=m*_*v+x*S*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],u=n[8],f=n[1],h=n[5],p=n[9],m=n[2],_=n[6],v=n[10],x=r+h+v;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(_-p)*S,this._y=(u-m)*S,this._z=(f-a)*S}else if(r>h&&r>v){const S=2*Math.sqrt(1+r-h-v);this._w=(_-p)/S,this._x=.25*S,this._y=(a+f)/S,this._z=(u+m)/S}else if(h>v){const S=2*Math.sqrt(1+h-r-v);this._w=(u-m)/S,this._x=(a+f)/S,this._y=.25*S,this._z=(p+_)/S}else{const S=2*Math.sqrt(1+v-r-h);this._w=(f-a)/S,this._x=(u+m)/S,this._y=(p+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Sn(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,u=e._z,f=e._w,h=n._x,p=n._y,m=n._z,_=n._w;return this._x=r*_+f*h+a*m-u*p,this._y=a*_+f*p+u*h-r*m,this._z=u*_+f*m+r*p-a*h,this._w=f*_-r*h-a*p-u*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,u=this._z,f=this._w;let h=f*e._w+r*e._x+a*e._y+u*e._z;if(h<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,h=-h):this.copy(e),h>=1)return this._w=f,this._x=r,this._y=a,this._z=u,this;const p=1-h*h;if(p<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*u+n*this._z,this.normalize(),this}const m=Math.sqrt(p),_=Math.atan2(m,h),v=Math.sin((1-n)*_)/m,x=Math.sin(n*_)/m;return this._w=f*v+this._w*x,this._x=r*v+this._x*x,this._y=a*v+this._y*x,this._z=u*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),u*Math.sin(n),u*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(e=0,n=0,r=0){J.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Kp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Kp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,u=e.elements;return this.x=u[0]*n+u[3]*r+u[6]*a,this.y=u[1]*n+u[4]*r+u[7]*a,this.z=u[2]*n+u[5]*r+u[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,u=e.elements,f=1/(u[3]*n+u[7]*r+u[11]*a+u[15]);return this.x=(u[0]*n+u[4]*r+u[8]*a+u[12])*f,this.y=(u[1]*n+u[5]*r+u[9]*a+u[13])*f,this.z=(u[2]*n+u[6]*r+u[10]*a+u[14])*f,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,u=e.x,f=e.y,h=e.z,p=e.w,m=2*(f*a-h*r),_=2*(h*n-u*a),v=2*(u*r-f*n);return this.x=n+p*m+f*v-h*_,this.y=r+p*_+h*m-u*v,this.z=a+p*v+u*_-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a,this.y=u[1]*n+u[5]*r+u[9]*a,this.z=u[2]*n+u[6]*r+u[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,u=e.z,f=n.x,h=n.y,p=n.z;return this.x=a*p-u*h,this.y=u*f-r*p,this.z=r*h-a*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Rc.copy(this).projectOnVector(e),this.sub(Rc)}reflect(e){return this.sub(Rc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Sn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rc=new J,Kp=new Qr;class ts{constructor(e=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(ai.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(ai.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=ai.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const u=r.getAttribute("position");if(n===!0&&u!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=u.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,ai):ai.fromBufferAttribute(u,f),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),rl.copy(r.boundingBox)),rl.applyMatrix4(e.matrixWorld),this.union(rl)}const a=e.children;for(let u=0,f=a.length;u<f;u++)this.expandByObject(a[u],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oo),sl.subVectors(this.max,Oo),Ps.subVectors(e.a,Oo),bs.subVectors(e.b,Oo),Ls.subVectors(e.c,Oo),fr.subVectors(bs,Ps),hr.subVectors(Ls,bs),kr.subVectors(Ps,Ls);let n=[0,-fr.z,fr.y,0,-hr.z,hr.y,0,-kr.z,kr.y,fr.z,0,-fr.x,hr.z,0,-hr.x,kr.z,0,-kr.x,-fr.y,fr.x,0,-hr.y,hr.x,0,-kr.y,kr.x,0];return!Pc(n,Ps,bs,Ls,sl)||(n=[1,0,0,0,1,0,0,0,1],!Pc(n,Ps,bs,Ls,sl))?!1:(ol.crossVectors(fr,hr),n=[ol.x,ol.y,ol.z],Pc(n,Ps,bs,Ls,sl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ui=[new J,new J,new J,new J,new J,new J,new J,new J],ai=new J,rl=new ts,Ps=new J,bs=new J,Ls=new J,fr=new J,hr=new J,kr=new J,Oo=new J,sl=new J,ol=new J,zr=new J;function Pc(s,e,n,r,a){for(let u=0,f=s.length-3;u<=f;u+=3){zr.fromArray(s,u);const h=a.x*Math.abs(zr.x)+a.y*Math.abs(zr.y)+a.z*Math.abs(zr.z),p=e.dot(zr),m=n.dot(zr),_=r.dot(zr);if(Math.max(-Math.max(p,m,_),Math.min(p,m,_))>h)return!1}return!0}const f0=new ts,ko=new J,bc=new J;class Ko{constructor(e=new J,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):f0.setFromPoints(e).getCenter(r);let a=0;for(let u=0,f=e.length;u<f;u++)a=Math.max(a,r.distanceToSquared(e[u]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const n=ko.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(ko,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(bc)),this.expandByPoint(ko.copy(e.center).sub(bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ni=new J,Lc=new J,al=new J,dr=new J,Dc=new J,ll=new J,Ic=new J;class ag{constructor(e=new J,n=new J(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ni.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,n),Ni.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){Lc.copy(e).add(n).multiplyScalar(.5),al.copy(n).sub(e).normalize(),dr.copy(this.origin).sub(Lc);const u=e.distanceTo(n)*.5,f=-this.direction.dot(al),h=dr.dot(this.direction),p=-dr.dot(al),m=dr.lengthSq(),_=Math.abs(1-f*f);let v,x,S,T;if(_>0)if(v=f*p-h,x=f*h-p,T=u*_,v>=0)if(x>=-T)if(x<=T){const A=1/_;v*=A,x*=A,S=v*(v+f*x+2*h)+x*(f*v+x+2*p)+m}else x=u,v=Math.max(0,-(f*x+h)),S=-v*v+x*(x+2*p)+m;else x=-u,v=Math.max(0,-(f*x+h)),S=-v*v+x*(x+2*p)+m;else x<=-T?(v=Math.max(0,-(-f*u+h)),x=v>0?-u:Math.min(Math.max(-u,-p),u),S=-v*v+x*(x+2*p)+m):x<=T?(v=0,x=Math.min(Math.max(-u,-p),u),S=x*(x+2*p)+m):(v=Math.max(0,-(f*u+h)),x=v>0?u:Math.min(Math.max(-u,-p),u),S=-v*v+x*(x+2*p)+m);else x=f>0?-u:u,v=Math.max(0,-(f*x+h)),S=-v*v+x*(x+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,v),a&&a.copy(Lc).addScaledVector(al,x),S}intersectSphere(e,n){Ni.subVectors(e.center,this.origin);const r=Ni.dot(this.direction),a=Ni.dot(Ni)-r*r,u=e.radius*e.radius;if(a>u)return null;const f=Math.sqrt(u-a),h=r-f,p=r+f;return p<0?null:h<0?this.at(p,n):this.at(h,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,u,f,h,p;const m=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),_>=0?(u=(e.min.y-x.y)*_,f=(e.max.y-x.y)*_):(u=(e.max.y-x.y)*_,f=(e.min.y-x.y)*_),r>f||u>a||((u>r||isNaN(r))&&(r=u),(f<a||isNaN(a))&&(a=f),v>=0?(h=(e.min.z-x.z)*v,p=(e.max.z-x.z)*v):(h=(e.max.z-x.z)*v,p=(e.min.z-x.z)*v),r>p||h>a)||((h>r||r!==r)&&(r=h),(p<a||a!==a)&&(a=p),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,n,r,a,u){Dc.subVectors(n,e),ll.subVectors(r,e),Ic.crossVectors(Dc,ll);let f=this.direction.dot(Ic),h;if(f>0){if(a)return null;h=1}else if(f<0)h=-1,f=-f;else return null;dr.subVectors(this.origin,e);const p=h*this.direction.dot(ll.crossVectors(dr,ll));if(p<0)return null;const m=h*this.direction.dot(Dc.cross(dr));if(m<0||p+m>f)return null;const _=-h*dr.dot(Ic);return _<0?null:this.at(_/f,u)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ot{constructor(e,n,r,a,u,f,h,p,m,_,v,x,S,T,A,y){Ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,u,f,h,p,m,_,v,x,S,T,A,y)}set(e,n,r,a,u,f,h,p,m,_,v,x,S,T,A,y){const g=this.elements;return g[0]=e,g[4]=n,g[8]=r,g[12]=a,g[1]=u,g[5]=f,g[9]=h,g[13]=p,g[2]=m,g[6]=_,g[10]=v,g[14]=x,g[3]=S,g[7]=T,g[11]=A,g[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/Ds.setFromMatrixColumn(e,0).length(),u=1/Ds.setFromMatrixColumn(e,1).length(),f=1/Ds.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*u,n[5]=r[5]*u,n[6]=r[6]*u,n[7]=0,n[8]=r[8]*f,n[9]=r[9]*f,n[10]=r[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,u=e.z,f=Math.cos(r),h=Math.sin(r),p=Math.cos(a),m=Math.sin(a),_=Math.cos(u),v=Math.sin(u);if(e.order==="XYZ"){const x=f*_,S=f*v,T=h*_,A=h*v;n[0]=p*_,n[4]=-p*v,n[8]=m,n[1]=S+T*m,n[5]=x-A*m,n[9]=-h*p,n[2]=A-x*m,n[6]=T+S*m,n[10]=f*p}else if(e.order==="YXZ"){const x=p*_,S=p*v,T=m*_,A=m*v;n[0]=x+A*h,n[4]=T*h-S,n[8]=f*m,n[1]=f*v,n[5]=f*_,n[9]=-h,n[2]=S*h-T,n[6]=A+x*h,n[10]=f*p}else if(e.order==="ZXY"){const x=p*_,S=p*v,T=m*_,A=m*v;n[0]=x-A*h,n[4]=-f*v,n[8]=T+S*h,n[1]=S+T*h,n[5]=f*_,n[9]=A-x*h,n[2]=-f*m,n[6]=h,n[10]=f*p}else if(e.order==="ZYX"){const x=f*_,S=f*v,T=h*_,A=h*v;n[0]=p*_,n[4]=T*m-S,n[8]=x*m+A,n[1]=p*v,n[5]=A*m+x,n[9]=S*m-T,n[2]=-m,n[6]=h*p,n[10]=f*p}else if(e.order==="YZX"){const x=f*p,S=f*m,T=h*p,A=h*m;n[0]=p*_,n[4]=A-x*v,n[8]=T*v+S,n[1]=v,n[5]=f*_,n[9]=-h*_,n[2]=-m*_,n[6]=S*v+T,n[10]=x-A*v}else if(e.order==="XZY"){const x=f*p,S=f*m,T=h*p,A=h*m;n[0]=p*_,n[4]=-v,n[8]=m*_,n[1]=x*v+A,n[5]=f*_,n[9]=S*v-T,n[2]=T*v-S,n[6]=h*_,n[10]=A*v+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(h0,e,d0)}lookAt(e,n,r){const a=this.elements;return kn.subVectors(e,n),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),pr.crossVectors(r,kn),pr.lengthSq()===0&&(Math.abs(r.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),pr.crossVectors(r,kn)),pr.normalize(),ul.crossVectors(kn,pr),a[0]=pr.x,a[4]=ul.x,a[8]=kn.x,a[1]=pr.y,a[5]=ul.y,a[9]=kn.y,a[2]=pr.z,a[6]=ul.z,a[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,u=this.elements,f=r[0],h=r[4],p=r[8],m=r[12],_=r[1],v=r[5],x=r[9],S=r[13],T=r[2],A=r[6],y=r[10],g=r[14],L=r[3],U=r[7],R=r[11],Q=r[15],B=a[0],F=a[4],Y=a[8],P=a[12],C=a[1],z=a[5],le=a[9],te=a[13],fe=a[2],me=a[6],ue=a[10],he=a[14],k=a[3],ce=a[7],oe=a[11],N=a[15];return u[0]=f*B+h*C+p*fe+m*k,u[4]=f*F+h*z+p*me+m*ce,u[8]=f*Y+h*le+p*ue+m*oe,u[12]=f*P+h*te+p*he+m*N,u[1]=_*B+v*C+x*fe+S*k,u[5]=_*F+v*z+x*me+S*ce,u[9]=_*Y+v*le+x*ue+S*oe,u[13]=_*P+v*te+x*he+S*N,u[2]=T*B+A*C+y*fe+g*k,u[6]=T*F+A*z+y*me+g*ce,u[10]=T*Y+A*le+y*ue+g*oe,u[14]=T*P+A*te+y*he+g*N,u[3]=L*B+U*C+R*fe+Q*k,u[7]=L*F+U*z+R*me+Q*ce,u[11]=L*Y+U*le+R*ue+Q*oe,u[15]=L*P+U*te+R*he+Q*N,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],u=e[12],f=e[1],h=e[5],p=e[9],m=e[13],_=e[2],v=e[6],x=e[10],S=e[14],T=e[3],A=e[7],y=e[11],g=e[15];return T*(+u*p*v-a*m*v-u*h*x+r*m*x+a*h*S-r*p*S)+A*(+n*p*S-n*m*x+u*f*x-a*f*S+a*m*_-u*p*_)+y*(+n*m*v-n*h*S-u*f*v+r*f*S+u*h*_-r*m*_)+g*(-a*h*_-n*p*v+n*h*x+a*f*v-r*f*x+r*p*_)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],h=e[5],p=e[6],m=e[7],_=e[8],v=e[9],x=e[10],S=e[11],T=e[12],A=e[13],y=e[14],g=e[15],L=v*y*m-A*x*m+A*p*S-h*y*S-v*p*g+h*x*g,U=T*x*m-_*y*m-T*p*S+f*y*S+_*p*g-f*x*g,R=_*A*m-T*v*m+T*h*S-f*A*S-_*h*g+f*v*g,Q=T*v*p-_*A*p-T*h*x+f*A*x+_*h*y-f*v*y,B=n*L+r*U+a*R+u*Q;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/B;return e[0]=L*F,e[1]=(A*x*u-v*y*u-A*a*S+r*y*S+v*a*g-r*x*g)*F,e[2]=(h*y*u-A*p*u+A*a*m-r*y*m-h*a*g+r*p*g)*F,e[3]=(v*p*u-h*x*u-v*a*m+r*x*m+h*a*S-r*p*S)*F,e[4]=U*F,e[5]=(_*y*u-T*x*u+T*a*S-n*y*S-_*a*g+n*x*g)*F,e[6]=(T*p*u-f*y*u-T*a*m+n*y*m+f*a*g-n*p*g)*F,e[7]=(f*x*u-_*p*u+_*a*m-n*x*m-f*a*S+n*p*S)*F,e[8]=R*F,e[9]=(T*v*u-_*A*u-T*r*S+n*A*S+_*r*g-n*v*g)*F,e[10]=(f*A*u-T*h*u+T*r*m-n*A*m-f*r*g+n*h*g)*F,e[11]=(_*h*u-f*v*u-_*r*m+n*v*m+f*r*S-n*h*S)*F,e[12]=Q*F,e[13]=(_*A*a-T*v*a+T*r*x-n*A*x-_*r*y+n*v*y)*F,e[14]=(T*h*a-f*A*a-T*r*p+n*A*p+f*r*y-n*h*y)*F,e[15]=(f*v*a-_*h*a+_*r*p-n*v*p-f*r*x+n*h*x)*F,this}scale(e){const n=this.elements,r=e.x,a=e.y,u=e.z;return n[0]*=r,n[4]*=a,n[8]*=u,n[1]*=r,n[5]*=a,n[9]*=u,n[2]*=r,n[6]*=a,n[10]*=u,n[3]*=r,n[7]*=a,n[11]*=u,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),u=1-r,f=e.x,h=e.y,p=e.z,m=u*f,_=u*h;return this.set(m*f+r,m*h-a*p,m*p+a*h,0,m*h+a*p,_*h+r,_*p-a*f,0,m*p-a*h,_*p+a*f,u*p*p+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,u,f){return this.set(1,r,u,0,e,1,f,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,u=n._x,f=n._y,h=n._z,p=n._w,m=u+u,_=f+f,v=h+h,x=u*m,S=u*_,T=u*v,A=f*_,y=f*v,g=h*v,L=p*m,U=p*_,R=p*v,Q=r.x,B=r.y,F=r.z;return a[0]=(1-(A+g))*Q,a[1]=(S+R)*Q,a[2]=(T-U)*Q,a[3]=0,a[4]=(S-R)*B,a[5]=(1-(x+g))*B,a[6]=(y+L)*B,a[7]=0,a[8]=(T+U)*F,a[9]=(y-L)*F,a[10]=(1-(x+A))*F,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let u=Ds.set(a[0],a[1],a[2]).length();const f=Ds.set(a[4],a[5],a[6]).length(),h=Ds.set(a[8],a[9],a[10]).length();this.determinant()<0&&(u=-u),e.x=a[12],e.y=a[13],e.z=a[14],li.copy(this);const m=1/u,_=1/f,v=1/h;return li.elements[0]*=m,li.elements[1]*=m,li.elements[2]*=m,li.elements[4]*=_,li.elements[5]*=_,li.elements[6]*=_,li.elements[8]*=v,li.elements[9]*=v,li.elements[10]*=v,n.setFromRotationMatrix(li),r.x=u,r.y=f,r.z=h,this}makePerspective(e,n,r,a,u,f,h=Hi){const p=this.elements,m=2*u/(n-e),_=2*u/(r-a),v=(n+e)/(n-e),x=(r+a)/(r-a);let S,T;if(h===Hi)S=-(f+u)/(f-u),T=-2*f*u/(f-u);else if(h===Nl)S=-f/(f-u),T=-f*u/(f-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=S,p[14]=T,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,r,a,u,f,h=Hi){const p=this.elements,m=1/(n-e),_=1/(r-a),v=1/(f-u),x=(n+e)*m,S=(r+a)*_;let T,A;if(h===Hi)T=(f+u)*v,A=-2*v;else if(h===Nl)T=u*v,A=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*_,p[9]=0,p[13]=-S,p[2]=0,p[6]=0,p[10]=A,p[14]=-T,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Ds=new J,li=new Ot,h0=new J(0,0,0),d0=new J(1,1,1),pr=new J,ul=new J,kn=new J,$p=new Ot,Zp=new Qr;class Mi{constructor(e=0,n=0,r=0,a=Mi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,u=a[0],f=a[4],h=a[8],p=a[1],m=a[5],_=a[9],v=a[2],x=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(Sn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-f,u)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Sn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,S),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-v,u),this._z=0);break;case"ZXY":this._x=Math.asin(Sn(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,S),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,u));break;case"ZYX":this._y=Math.asin(-Sn(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(p,u)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(Sn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-v,u)):(this._x=0,this._y=Math.atan2(h,S));break;case"XZY":this._z=Math.asin(-Sn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,u)):(this._x=Math.atan2(-_,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return $p.makeRotationFromQuaternion(e),this.setFromRotationMatrix($p,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Zp.setFromEuler(this),this.setFromQuaternion(Zp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mi.DEFAULT_ORDER="XYZ";class lg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let p0=0;const Qp=new J,Is=new Qr,Fi=new Ot,cl=new J,zo=new J,m0=new J,g0=new Qr,Jp=new J(1,0,0),em=new J(0,1,0),tm=new J(0,0,1),nm={type:"added"},_0={type:"removed"},Us={type:"childadded",child:null},Uc={type:"childremoved",child:null};class rn extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=qo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const e=new J,n=new Mi,r=new Qr,a=new J(1,1,1);function u(){r.setFromEuler(n,!1)}function f(){n.setFromQuaternion(r,void 0,!1)}n._onChange(u),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ot},normalMatrix:{value:new ht}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Is.setFromAxisAngle(e,n),this.quaternion.multiply(Is),this}rotateOnWorldAxis(e,n){return Is.setFromAxisAngle(e,n),this.quaternion.premultiply(Is),this}rotateX(e){return this.rotateOnAxis(Jp,e)}rotateY(e){return this.rotateOnAxis(em,e)}rotateZ(e){return this.rotateOnAxis(tm,e)}translateOnAxis(e,n){return Qp.copy(e).applyQuaternion(this.quaternion),this.position.add(Qp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Jp,e)}translateY(e){return this.translateOnAxis(em,e)}translateZ(e){return this.translateOnAxis(tm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?cl.copy(e):cl.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(zo,cl,this.up):Fi.lookAt(cl,zo,this.up),this.quaternion.setFromRotationMatrix(Fi),a&&(Fi.extractRotation(a.matrixWorld),Is.setFromRotationMatrix(Fi),this.quaternion.premultiply(Is.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nm),Us.child=e,this.dispatchEvent(Us),Us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(_0),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nm),Us.child=e,this.dispatchEvent(Us),Us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const f=this.children[r].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let u=0,f=a.length;u<f;u++)a[u].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,e,m0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,g0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let u=0,f=a.length;u<f;u++)a[u].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function u(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=u(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,_=p.length;m<_;m++){const v=p[m];u(e.shapes,v)}else u(e.shapes,p)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(u(e.materials,this.material[p]));a.material=h}else a.material=u(e.materials,this.material);if(this.children.length>0){a.children=[];for(let h=0;h<this.children.length;h++)a.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];a.animations.push(u(e.animations,p))}}if(n){const h=f(e.geometries),p=f(e.materials),m=f(e.textures),_=f(e.images),v=f(e.shapes),x=f(e.skeletons),S=f(e.animations),T=f(e.nodes);h.length>0&&(r.geometries=h),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),_.length>0&&(r.images=_),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),T.length>0&&(r.nodes=T)}return r.object=a,r;function f(h){const p=[];for(const m in h){const _=h[m];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}rn.DEFAULT_UP=new J(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new J,Oi=new J,Nc=new J,ki=new J,Ns=new J,Fs=new J,im=new J,Fc=new J,Oc=new J,kc=new J,zc=new Vt,Bc=new Vt,Hc=new Vt;class ci{constructor(e=new J,n=new J,r=new J){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),ui.subVectors(e,n),a.cross(ui);const u=a.lengthSq();return u>0?a.multiplyScalar(1/Math.sqrt(u)):a.set(0,0,0)}static getBarycoord(e,n,r,a,u){ui.subVectors(a,n),Oi.subVectors(r,n),Nc.subVectors(e,n);const f=ui.dot(ui),h=ui.dot(Oi),p=ui.dot(Nc),m=Oi.dot(Oi),_=Oi.dot(Nc),v=f*m-h*h;if(v===0)return u.set(0,0,0),null;const x=1/v,S=(m*p-h*_)*x,T=(f*_-h*p)*x;return u.set(1-S-T,T,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,n,r,a,u,f,h,p){return this.getBarycoord(e,n,r,a,ki)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(u,ki.x),p.addScaledVector(f,ki.y),p.addScaledVector(h,ki.z),p)}static getInterpolatedAttribute(e,n,r,a,u,f){return zc.setScalar(0),Bc.setScalar(0),Hc.setScalar(0),zc.fromBufferAttribute(e,n),Bc.fromBufferAttribute(e,r),Hc.fromBufferAttribute(e,a),f.setScalar(0),f.addScaledVector(zc,u.x),f.addScaledVector(Bc,u.y),f.addScaledVector(Hc,u.z),f}static isFrontFacing(e,n,r,a){return ui.subVectors(r,n),Oi.subVectors(e,n),ui.cross(Oi).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),ui.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ci.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,u){return ci.getInterpolation(e,this.a,this.b,this.c,n,r,a,u)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,u=this.c;let f,h;Ns.subVectors(a,r),Fs.subVectors(u,r),Fc.subVectors(e,r);const p=Ns.dot(Fc),m=Fs.dot(Fc);if(p<=0&&m<=0)return n.copy(r);Oc.subVectors(e,a);const _=Ns.dot(Oc),v=Fs.dot(Oc);if(_>=0&&v<=_)return n.copy(a);const x=p*v-_*m;if(x<=0&&p>=0&&_<=0)return f=p/(p-_),n.copy(r).addScaledVector(Ns,f);kc.subVectors(e,u);const S=Ns.dot(kc),T=Fs.dot(kc);if(T>=0&&S<=T)return n.copy(u);const A=S*m-p*T;if(A<=0&&m>=0&&T<=0)return h=m/(m-T),n.copy(r).addScaledVector(Fs,h);const y=_*T-S*v;if(y<=0&&v-_>=0&&S-T>=0)return im.subVectors(u,a),h=(v-_)/(v-_+(S-T)),n.copy(a).addScaledVector(im,h);const g=1/(y+A+x);return f=A*g,h=x*g,n.copy(r).addScaledVector(Ns,f).addScaledVector(Fs,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ug={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mr={h:0,s:0,l:0},fl={h:0,s:0,l:0};function Vc(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class et{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=$n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.toWorkingColorSpace(this,n),this}setRGB(e,n,r,a=St.workingColorSpace){return this.r=e,this.g=n,this.b=r,St.toWorkingColorSpace(this,a),this}setHSL(e,n,r,a=St.workingColorSpace){if(e=e0(e,1),n=Sn(n,0,1),r=Sn(r,0,1),n===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+n):r+n-r*n,f=2*r-u;this.r=Vc(f,u,e+1/3),this.g=Vc(f,u,e),this.b=Vc(f,u,e-1/3)}return St.toWorkingColorSpace(this,a),this}setStyle(e,n=$n){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let u;const f=a[1],h=a[2];switch(f){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,n);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,n);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const u=a[1],f=u.length;if(f===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(u,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=$n){const r=ug[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$n){return St.fromWorkingColorSpace(mn.copy(this),e),Math.round(Sn(mn.r*255,0,255))*65536+Math.round(Sn(mn.g*255,0,255))*256+Math.round(Sn(mn.b*255,0,255))}getHexString(e=$n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=St.workingColorSpace){St.fromWorkingColorSpace(mn.copy(this),n);const r=mn.r,a=mn.g,u=mn.b,f=Math.max(r,a,u),h=Math.min(r,a,u);let p,m;const _=(h+f)/2;if(h===f)p=0,m=0;else{const v=f-h;switch(m=_<=.5?v/(f+h):v/(2-f-h),f){case r:p=(a-u)/v+(a<u?6:0);break;case a:p=(u-r)/v+2;break;case u:p=(r-a)/v+4;break}p/=6}return e.h=p,e.s=m,e.l=_,e}getRGB(e,n=St.workingColorSpace){return St.fromWorkingColorSpace(mn.copy(this),n),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=$n){St.fromWorkingColorSpace(mn.copy(this),e);const n=mn.r,r=mn.g,a=mn.b;return e!==$n?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(mr),this.setHSL(mr.h+e,mr.s+n,mr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(mr),e.getHSL(fl);const r=wc(mr.h,fl.h,n),a=wc(mr.s,fl.s,n),u=wc(mr.l,fl.l,n);return this.setHSL(r,a,u),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,u=e.elements;return this.r=u[0]*n+u[3]*r+u[6]*a,this.g=u[1]*n+u[4]*r+u[7]*a,this.b=u[2]*n+u[5]*r+u[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new et;et.NAMES=ug;let v0=0;class $o extends es{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=qo(),this.name="",this.blending=Xs,this.side=Mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tf,this.blendDst=nf,this.blendEquation=Xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(r.blending=this.blending),this.side!==Mr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==tf&&(r.blendSrc=this.blendSrc),this.blendDst!==nf&&(r.blendDst=this.blendDst),this.blendEquation!==Xr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(u){const f=[];for(const h in u){const p=u[h];delete p.metadata,f.push(p)}return f}if(n){const u=a(e.textures),f=a(e.images);u.length>0&&(r.textures=u),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let u=0;u!==a;++u)r[u]=n[u].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class cg extends $o{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=jf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xt=new J,hl=new dt;class hi{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=Hp,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,u=this.itemSize;a<u;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)hl.fromBufferAttribute(this,n),hl.applyMatrix3(e),this.setXY(n,hl.x,hl.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)Xt.fromBufferAttribute(this,n),Xt.applyMatrix3(e),this.setXYZ(n,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)Xt.fromBufferAttribute(this,n),Xt.applyMatrix4(e),this.setXYZ(n,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)Xt.fromBufferAttribute(this,n),Xt.applyNormalMatrix(e),this.setXYZ(n,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)Xt.fromBufferAttribute(this,n),Xt.transformDirection(e),this.setXYZ(n,Xt.x,Xt.y,Xt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Fo(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=Ln(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Fo(n,this.array)),n}setX(e,n){return this.normalized&&(n=Ln(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Fo(n,this.array)),n}setY(e,n){return this.normalized&&(n=Ln(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Fo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Ln(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Fo(n,this.array)),n}setW(e,n){return this.normalized&&(n=Ln(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=Ln(n,this.array),r=Ln(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=Ln(n,this.array),r=Ln(r,this.array),a=Ln(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,u){return e*=this.itemSize,this.normalized&&(n=Ln(n,this.array),r=Ln(r,this.array),a=Ln(a,this.array),u=Ln(u,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=u,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hp&&(e.usage=this.usage),e}}class fg extends hi{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class hg extends hi{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class Kr extends hi{constructor(e,n,r){super(new Float32Array(e),n,r)}}let x0=0;const Kn=new Ot,Gc=new rn,Os=new J,zn=new ts,Bo=new ts,nn=new J;class ns extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=qo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rg(e)?hg:fg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new ht().getNormalMatrix(e);r.applyNormalMatrix(u),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,n,r){return Kn.makeTranslation(e,n,r),this.applyMatrix4(Kn),this}scale(e,n,r){return Kn.makeScale(e,n,r),this.applyMatrix4(Kn),this}lookAt(e){return Gc.lookAt(e),Gc.updateMatrix(),this.applyMatrix4(Gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,u=e.length;a<u;a++){const f=e[a];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Kr(r,3))}else{for(let r=0,a=n.count;r<a;r++){const u=e[r];n.setXYZ(r,u.x,u.y,u.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ts);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const u=n[r];zn.setFromBufferAttribute(u),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ko);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const r=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),n)for(let u=0,f=n.length;u<f;u++){const h=n[u];Bo.setFromBufferAttribute(h),this.morphTargetsRelative?(nn.addVectors(zn.min,Bo.min),zn.expandByPoint(nn),nn.addVectors(zn.max,Bo.max),zn.expandByPoint(nn)):(zn.expandByPoint(Bo.min),zn.expandByPoint(Bo.max))}zn.getCenter(r);let a=0;for(let u=0,f=e.count;u<f;u++)nn.fromBufferAttribute(e,u),a=Math.max(a,r.distanceToSquared(nn));if(n)for(let u=0,f=n.length;u<f;u++){const h=n[u],p=this.morphTargetsRelative;for(let m=0,_=h.count;m<_;m++)nn.fromBufferAttribute(h,m),p&&(Os.fromBufferAttribute(e,m),nn.add(Os)),a=Math.max(a,r.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,u=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let Y=0;Y<r.count;Y++)h[Y]=new J,p[Y]=new J;const m=new J,_=new J,v=new J,x=new dt,S=new dt,T=new dt,A=new J,y=new J;function g(Y,P,C){m.fromBufferAttribute(r,Y),_.fromBufferAttribute(r,P),v.fromBufferAttribute(r,C),x.fromBufferAttribute(u,Y),S.fromBufferAttribute(u,P),T.fromBufferAttribute(u,C),_.sub(m),v.sub(m),S.sub(x),T.sub(x);const z=1/(S.x*T.y-T.x*S.y);isFinite(z)&&(A.copy(_).multiplyScalar(T.y).addScaledVector(v,-S.y).multiplyScalar(z),y.copy(v).multiplyScalar(S.x).addScaledVector(_,-T.x).multiplyScalar(z),h[Y].add(A),h[P].add(A),h[C].add(A),p[Y].add(y),p[P].add(y),p[C].add(y))}let L=this.groups;L.length===0&&(L=[{start:0,count:e.count}]);for(let Y=0,P=L.length;Y<P;++Y){const C=L[Y],z=C.start,le=C.count;for(let te=z,fe=z+le;te<fe;te+=3)g(e.getX(te+0),e.getX(te+1),e.getX(te+2))}const U=new J,R=new J,Q=new J,B=new J;function F(Y){Q.fromBufferAttribute(a,Y),B.copy(Q);const P=h[Y];U.copy(P),U.sub(Q.multiplyScalar(Q.dot(P))).normalize(),R.crossVectors(B,P);const z=R.dot(p[Y])<0?-1:1;f.setXYZW(Y,U.x,U.y,U.z,z)}for(let Y=0,P=L.length;Y<P;++Y){const C=L[Y],z=C.start,le=C.count;for(let te=z,fe=z+le;te<fe;te+=3)F(e.getX(te+0)),F(e.getX(te+1)),F(e.getX(te+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new hi(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new J,u=new J,f=new J,h=new J,p=new J,m=new J,_=new J,v=new J;if(e)for(let x=0,S=e.count;x<S;x+=3){const T=e.getX(x+0),A=e.getX(x+1),y=e.getX(x+2);a.fromBufferAttribute(n,T),u.fromBufferAttribute(n,A),f.fromBufferAttribute(n,y),_.subVectors(f,u),v.subVectors(a,u),_.cross(v),h.fromBufferAttribute(r,T),p.fromBufferAttribute(r,A),m.fromBufferAttribute(r,y),h.add(_),p.add(_),m.add(_),r.setXYZ(T,h.x,h.y,h.z),r.setXYZ(A,p.x,p.y,p.z),r.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,S=n.count;x<S;x+=3)a.fromBufferAttribute(n,x+0),u.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),_.subVectors(f,u),v.subVectors(a,u),_.cross(v),r.setXYZ(x+0,_.x,_.y,_.z),r.setXYZ(x+1,_.x,_.y,_.z),r.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)nn.fromBufferAttribute(e,n),nn.normalize(),e.setXYZ(n,nn.x,nn.y,nn.z)}toNonIndexed(){function e(h,p){const m=h.array,_=h.itemSize,v=h.normalized,x=new m.constructor(p.length*_);let S=0,T=0;for(let A=0,y=p.length;A<y;A++){h.isInterleavedBufferAttribute?S=p[A]*h.data.stride+h.offset:S=p[A]*_;for(let g=0;g<_;g++)x[T++]=m[S++]}return new hi(x,_,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ns,r=this.index.array,a=this.attributes;for(const h in a){const p=a[h],m=e(p,r);n.setAttribute(h,m)}const u=this.morphAttributes;for(const h in u){const p=[],m=u[h];for(let _=0,v=m.length;_<v;_++){const x=m[_],S=e(x,r);p.push(S)}n.morphAttributes[h]=p}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const p in r){const m=r[p];e.data.attributes[p]=m.toJSON(e.data)}const a={};let u=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],_=[];for(let v=0,x=m.length;v<x;v++){const S=m[v];_.push(S.toJSON(e.data))}_.length>0&&(a[p]=_,u=!0)}u&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const a=e.attributes;for(const m in a){const _=a[m];this.setAttribute(m,_.clone(n))}const u=e.morphAttributes;for(const m in u){const _=[],v=u[m];for(let x=0,S=v.length;x<S;x++)_.push(v[x].clone(n));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,_=f.length;m<_;m++){const v=f[m];this.addGroup(v.start,v.count,v.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rm=new Ot,Br=new ag,dl=new Ko,sm=new J,pl=new J,ml=new J,gl=new J,Wc=new J,_l=new J,om=new J,vl=new J;class Qn extends rn{constructor(e=new ns,n=new cg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=a.length;u<f;u++){const h=a[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,u=r.morphAttributes.position,f=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const h=this.morphTargetInfluences;if(u&&h){_l.set(0,0,0);for(let p=0,m=u.length;p<m;p++){const _=h[p],v=u[p];_!==0&&(Wc.fromBufferAttribute(v,e),f?_l.addScaledVector(Wc,_):_l.addScaledVector(Wc.sub(n),_))}n.add(_l)}return n}raycast(e,n){const r=this.geometry,a=this.material,u=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),dl.copy(r.boundingSphere),dl.applyMatrix4(u),Br.copy(e.ray).recast(e.near),!(dl.containsPoint(Br.origin)===!1&&(Br.intersectSphere(dl,sm)===null||Br.origin.distanceToSquared(sm)>(e.far-e.near)**2))&&(rm.copy(u).invert(),Br.copy(e.ray).applyMatrix4(rm),!(r.boundingBox!==null&&Br.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Br)))}_computeIntersections(e,n,r){let a;const u=this.geometry,f=this.material,h=u.index,p=u.attributes.position,m=u.attributes.uv,_=u.attributes.uv1,v=u.attributes.normal,x=u.groups,S=u.drawRange;if(h!==null)if(Array.isArray(f))for(let T=0,A=x.length;T<A;T++){const y=x[T],g=f[y.materialIndex],L=Math.max(y.start,S.start),U=Math.min(h.count,Math.min(y.start+y.count,S.start+S.count));for(let R=L,Q=U;R<Q;R+=3){const B=h.getX(R),F=h.getX(R+1),Y=h.getX(R+2);a=xl(this,g,e,r,m,_,v,B,F,Y),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const T=Math.max(0,S.start),A=Math.min(h.count,S.start+S.count);for(let y=T,g=A;y<g;y+=3){const L=h.getX(y),U=h.getX(y+1),R=h.getX(y+2);a=xl(this,f,e,r,m,_,v,L,U,R),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}else if(p!==void 0)if(Array.isArray(f))for(let T=0,A=x.length;T<A;T++){const y=x[T],g=f[y.materialIndex],L=Math.max(y.start,S.start),U=Math.min(p.count,Math.min(y.start+y.count,S.start+S.count));for(let R=L,Q=U;R<Q;R+=3){const B=R,F=R+1,Y=R+2;a=xl(this,g,e,r,m,_,v,B,F,Y),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=y.materialIndex,n.push(a))}}else{const T=Math.max(0,S.start),A=Math.min(p.count,S.start+S.count);for(let y=T,g=A;y<g;y+=3){const L=y,U=y+1,R=y+2;a=xl(this,f,e,r,m,_,v,L,U,R),a&&(a.faceIndex=Math.floor(y/3),n.push(a))}}}}function y0(s,e,n,r,a,u,f,h){let p;if(e.side===In?p=r.intersectTriangle(f,u,a,!0,h):p=r.intersectTriangle(a,u,f,e.side===Mr,h),p===null)return null;vl.copy(h),vl.applyMatrix4(s.matrixWorld);const m=n.ray.origin.distanceTo(vl);return m<n.near||m>n.far?null:{distance:m,point:vl.clone(),object:s}}function xl(s,e,n,r,a,u,f,h,p,m){s.getVertexPosition(h,pl),s.getVertexPosition(p,ml),s.getVertexPosition(m,gl);const _=y0(s,e,n,r,pl,ml,gl,om);if(_){const v=new J;ci.getBarycoord(om,pl,ml,gl,v),a&&(_.uv=ci.getInterpolatedAttribute(a,h,p,m,v,new dt)),u&&(_.uv1=ci.getInterpolatedAttribute(u,h,p,m,v,new dt)),f&&(_.normal=ci.getInterpolatedAttribute(f,h,p,m,v,new J),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new J,materialIndex:0};ci.getNormal(pl,ml,gl,x.normal),_.face=x,_.barycoord=v}return _}class Jr extends ns{constructor(e=1,n=1,r=1,a=1,u=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:u,depthSegments:f};const h=this;a=Math.floor(a),u=Math.floor(u),f=Math.floor(f);const p=[],m=[],_=[],v=[];let x=0,S=0;T("z","y","x",-1,-1,r,n,e,f,u,0),T("z","y","x",1,-1,r,n,-e,f,u,1),T("x","z","y",1,1,e,r,n,a,f,2),T("x","z","y",1,-1,e,r,-n,a,f,3),T("x","y","z",1,-1,e,n,r,a,u,4),T("x","y","z",-1,-1,e,n,-r,a,u,5),this.setIndex(p),this.setAttribute("position",new Kr(m,3)),this.setAttribute("normal",new Kr(_,3)),this.setAttribute("uv",new Kr(v,2));function T(A,y,g,L,U,R,Q,B,F,Y,P){const C=R/F,z=Q/Y,le=R/2,te=Q/2,fe=B/2,me=F+1,ue=Y+1;let he=0,k=0;const ce=new J;for(let oe=0;oe<ue;oe++){const N=oe*z-te;for(let re=0;re<me;re++){const Fe=re*C-le;ce[A]=Fe*L,ce[y]=N*U,ce[g]=fe,m.push(ce.x,ce.y,ce.z),ce[A]=0,ce[y]=0,ce[g]=B>0?1:-1,_.push(ce.x,ce.y,ce.z),v.push(re/F),v.push(1-oe/Y),he+=1}}for(let oe=0;oe<Y;oe++)for(let N=0;N<F;N++){const re=x+N+me*oe,Fe=x+N+me*(oe+1),Z=x+(N+1)+me*(oe+1),de=x+(N+1)+me*oe;p.push(re,Fe,de),p.push(Fe,Z,de),k+=6}h.addGroup(S,k,P),S+=k,x+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Js(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function yn(s){const e={};for(let n=0;n<s.length;n++){const r=Js(s[n]);for(const a in r)e[a]=r[a]}return e}function S0(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function dg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}const M0={clone:Js,merge:yn};var E0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Er extends $o{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=E0,this.fragmentShader=T0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=S0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const f=this.uniforms[a].value;f&&f.isTexture?n.uniforms[a]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[a]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[a]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[a]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[a]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[a]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[a]={type:"m4",value:f.toArray()}:n.uniforms[a]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class pg extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=Hi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const gr=new J,am=new dt,lm=new dt;class Zn extends pg{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Hf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Il*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hf*2*Math.atan(Math.tan(Il*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gr.x,gr.y).multiplyScalar(-e/gr.z),gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(gr.x,gr.y).multiplyScalar(-e/gr.z)}getViewSize(e,n){return this.getViewBounds(e,am,lm),n.subVectors(lm,am)}setViewOffset(e,n,r,a,u,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Il*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,u=-.5*a;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;u+=f.offsetX*a/p,n-=f.offsetY*r/m,a*=f.width/p,r*=f.height/m}const h=this.filmOffset;h!==0&&(u+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+a,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ks=-90,zs=1;class w0 extends rn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Zn(ks,zs,e,n);a.layers=this.layers,this.add(a);const u=new Zn(ks,zs,e,n);u.layers=this.layers,this.add(u);const f=new Zn(ks,zs,e,n);f.layers=this.layers,this.add(f);const h=new Zn(ks,zs,e,n);h.layers=this.layers,this.add(h);const p=new Zn(ks,zs,e,n);p.layers=this.layers,this.add(p);const m=new Zn(ks,zs,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,u,f,h,p]=n;for(const m of n)this.remove(m);if(e===Hi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Nl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[u,f,h,p,m,_]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,u),e.setRenderTarget(r,1,a),e.render(n,f),e.setRenderTarget(r,2,a),e.render(n,h),e.setRenderTarget(r,3,a),e.render(n,p),e.setRenderTarget(r,4,a),e.render(n,m),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,a),e.render(n,_),e.setRenderTarget(v,x,S),e.xr.enabled=T,r.texture.needsPMREMUpdate=!0}}class mg extends Mn{constructor(e,n,r,a,u,f,h,p,m,_){e=e!==void 0?e:[],n=n!==void 0?n:Ks,super(e,n,r,a,u,f,h,p,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class A0 extends Zr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new mg(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:yi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Jr(5,5,5),u=new Er({name:"CubemapFromEquirect",uniforms:Js(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:In,blending:yr});u.uniforms.tEquirect.value=n;const f=new Qn(a,u),h=n.minFilter;return n.minFilter===qr&&(n.minFilter=yi),new w0(1,10,this).update(e,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,n,r,a){const u=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,r,a);e.setRenderTarget(u)}}const Xc=new J,C0=new J,R0=new ht;class vr{constructor(e=new J(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Xc.subVectors(r,n).cross(C0.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Xc),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/a;return u<0||u>1?null:n.copy(e.start).addScaledVector(r,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||R0.getNormalMatrix(e),a=this.coplanarPoint(Xc).applyMatrix4(e),u=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(u),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hr=new Ko,yl=new J;class eh{constructor(e=new vr,n=new vr,r=new vr,a=new vr,u=new vr,f=new vr){this.planes=[e,n,r,a,u,f]}set(e,n,r,a,u,f){const h=this.planes;return h[0].copy(e),h[1].copy(n),h[2].copy(r),h[3].copy(a),h[4].copy(u),h[5].copy(f),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Hi){const r=this.planes,a=e.elements,u=a[0],f=a[1],h=a[2],p=a[3],m=a[4],_=a[5],v=a[6],x=a[7],S=a[8],T=a[9],A=a[10],y=a[11],g=a[12],L=a[13],U=a[14],R=a[15];if(r[0].setComponents(p-u,x-m,y-S,R-g).normalize(),r[1].setComponents(p+u,x+m,y+S,R+g).normalize(),r[2].setComponents(p+f,x+_,y+T,R+L).normalize(),r[3].setComponents(p-f,x-_,y-T,R-L).normalize(),r[4].setComponents(p-h,x-v,y-A,R-U).normalize(),n===Hi)r[5].setComponents(p+h,x+v,y+A,R+U).normalize();else if(n===Nl)r[5].setComponents(h,v,A,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(e){return Hr.center.set(0,0,0),Hr.radius=.7071067811865476,Hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let u=0;u<6;u++)if(n[u].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(yl.x=a.normal.x>0?e.max.x:e.min.x,yl.y=a.normal.y>0?e.max.y:e.min.y,yl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(yl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gg(){let s=null,e=!1,n=null,r=null;function a(u,f){n(u,f),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(u){n=u},setContext:function(u){s=u}}}function P0(s){const e=new WeakMap;function n(h,p){const m=h.array,_=h.usage,v=m.byteLength,x=s.createBuffer();s.bindBuffer(p,x),s.bufferData(p,m,_),h.onUploadCallback();let S;if(m instanceof Float32Array)S=s.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=s.SHORT;else if(m instanceof Uint32Array)S=s.UNSIGNED_INT;else if(m instanceof Int32Array)S=s.INT;else if(m instanceof Int8Array)S=s.BYTE;else if(m instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:v}}function r(h,p,m){const _=p.array,v=p.updateRanges;if(s.bindBuffer(m,h),v.length===0)s.bufferSubData(m,0,_);else{v.sort((S,T)=>S.start-T.start);let x=0;for(let S=1;S<v.length;S++){const T=v[x],A=v[S];A.start<=T.start+T.count+1?T.count=Math.max(T.count,A.start+A.count-T.start):(++x,v[x]=A)}v.length=x+1;for(let S=0,T=v.length;S<T;S++){const A=v[S];s.bufferSubData(m,A.start*_.BYTES_PER_ELEMENT,_,A.start,A.count)}p.clearUpdateRanges()}p.onUploadCallback()}function a(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function u(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(s.deleteBuffer(p.buffer),e.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,n(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,h,p),m.version=h.version}}return{get:a,remove:u,update:f}}class zl extends ns{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const u=e/2,f=n/2,h=Math.floor(r),p=Math.floor(a),m=h+1,_=p+1,v=e/h,x=n/p,S=[],T=[],A=[],y=[];for(let g=0;g<_;g++){const L=g*x-f;for(let U=0;U<m;U++){const R=U*v-u;T.push(R,-L,0),A.push(0,0,1),y.push(U/h),y.push(1-g/p)}}for(let g=0;g<p;g++)for(let L=0;L<h;L++){const U=L+m*g,R=L+m*(g+1),Q=L+1+m*(g+1),B=L+1+m*g;S.push(U,R,B),S.push(R,Q,B)}this.setIndex(S),this.setAttribute("position",new Kr(T,3)),this.setAttribute("normal",new Kr(A,3)),this.setAttribute("uv",new Kr(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.width,e.height,e.widthSegments,e.heightSegments)}}var b0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,L0=`#ifdef USE_ALPHAHASH
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
#endif`,D0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,U0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F0=`#ifdef USE_AOMAP
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
#endif`,O0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,k0=`#ifdef USE_BATCHING
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
#endif`,z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,B0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,H0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,G0=`#ifdef USE_IRIDESCENCE
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
#endif`,W0=`#ifdef USE_BUMPMAP
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
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,K0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,J0=`#define PI 3.141592653589793
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
} // validated`,ex=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tx=`vec3 transformedNormal = objectNormal;
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
#endif`,nx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ix=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ox="gl_FragColor = linearToOutputTexel( gl_FragColor );",ax=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lx=`#ifdef USE_ENVMAP
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
#endif`,ux=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cx=`#ifdef USE_ENVMAP
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
#endif`,fx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hx=`#ifdef USE_ENVMAP
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
#endif`,dx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,px=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_x=`#ifdef USE_GRADIENTMAP
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
}`,vx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sx=`uniform bool receiveShadow;
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
#endif`,Mx=`#ifdef USE_ENVMAP
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
#endif`,Ex=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ax=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cx=`PhysicalMaterial material;
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
#endif`,Rx=`struct PhysicalMaterial {
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
}`,Px=`
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
#endif`,bx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ix=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ux=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ox=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zx=`#if defined( USE_POINTS_UV )
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
#endif`,Bx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xx=`#ifdef USE_MORPHTARGETS
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
#endif`,jx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qx=`#ifdef USE_NORMALMAP
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
#endif`,Jx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ey=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ty=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ny=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ry=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,oy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ay=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ly=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,py=`float getShadowMask() {
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
}`,my=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gy=`#ifdef USE_SKINNING
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
#endif`,_y=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vy=`#ifdef USE_SKINNING
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
#endif`,xy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,My=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ey=`#ifdef USE_TRANSMISSION
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
#endif`,Ty=`#ifdef USE_TRANSMISSION
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
#endif`,wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ry=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Py=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,by=`uniform sampler2D t2D;
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
}`,Ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ny=`#include <common>
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
}`,Fy=`#if DEPTH_PACKING == 3200
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
}`,Oy=`#define DISTANCE
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
}`,ky=`#define DISTANCE
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
}`,zy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,By=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hy=`uniform float scale;
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
}`,Vy=`uniform vec3 diffuse;
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
}`,Gy=`#include <common>
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
}`,Wy=`uniform vec3 diffuse;
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
}`,Xy=`#define LAMBERT
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
}`,jy=`#define LAMBERT
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
}`,Yy=`#define MATCAP
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
}`,qy=`#define MATCAP
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
}`,Ky=`#define NORMAL
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
}`,$y=`#define NORMAL
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
}`,Zy=`#define PHONG
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
}`,Qy=`#define PHONG
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
}`,Jy=`#define STANDARD
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
}`,eS=`#define STANDARD
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
}`,tS=`#define TOON
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
}`,nS=`#define TOON
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
}`,iS=`uniform float size;
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
}`,rS=`uniform vec3 diffuse;
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
}`,sS=`#include <common>
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
}`,oS=`uniform vec3 color;
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
}`,aS=`uniform float rotation;
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
}`,lS=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:b0,alphahash_pars_fragment:L0,alphamap_fragment:D0,alphamap_pars_fragment:I0,alphatest_fragment:U0,alphatest_pars_fragment:N0,aomap_fragment:F0,aomap_pars_fragment:O0,batching_pars_vertex:k0,batching_vertex:z0,begin_vertex:B0,beginnormal_vertex:H0,bsdfs:V0,iridescence_fragment:G0,bumpmap_pars_fragment:W0,clipping_planes_fragment:X0,clipping_planes_pars_fragment:j0,clipping_planes_pars_vertex:Y0,clipping_planes_vertex:q0,color_fragment:K0,color_pars_fragment:$0,color_pars_vertex:Z0,color_vertex:Q0,common:J0,cube_uv_reflection_fragment:ex,defaultnormal_vertex:tx,displacementmap_pars_vertex:nx,displacementmap_vertex:ix,emissivemap_fragment:rx,emissivemap_pars_fragment:sx,colorspace_fragment:ox,colorspace_pars_fragment:ax,envmap_fragment:lx,envmap_common_pars_fragment:ux,envmap_pars_fragment:cx,envmap_pars_vertex:fx,envmap_physical_pars_fragment:Mx,envmap_vertex:hx,fog_vertex:dx,fog_pars_vertex:px,fog_fragment:mx,fog_pars_fragment:gx,gradientmap_pars_fragment:_x,lightmap_pars_fragment:vx,lights_lambert_fragment:xx,lights_lambert_pars_fragment:yx,lights_pars_begin:Sx,lights_toon_fragment:Ex,lights_toon_pars_fragment:Tx,lights_phong_fragment:wx,lights_phong_pars_fragment:Ax,lights_physical_fragment:Cx,lights_physical_pars_fragment:Rx,lights_fragment_begin:Px,lights_fragment_maps:bx,lights_fragment_end:Lx,logdepthbuf_fragment:Dx,logdepthbuf_pars_fragment:Ix,logdepthbuf_pars_vertex:Ux,logdepthbuf_vertex:Nx,map_fragment:Fx,map_pars_fragment:Ox,map_particle_fragment:kx,map_particle_pars_fragment:zx,metalnessmap_fragment:Bx,metalnessmap_pars_fragment:Hx,morphinstance_vertex:Vx,morphcolor_vertex:Gx,morphnormal_vertex:Wx,morphtarget_pars_vertex:Xx,morphtarget_vertex:jx,normal_fragment_begin:Yx,normal_fragment_maps:qx,normal_pars_fragment:Kx,normal_pars_vertex:$x,normal_vertex:Zx,normalmap_pars_fragment:Qx,clearcoat_normal_fragment_begin:Jx,clearcoat_normal_fragment_maps:ey,clearcoat_pars_fragment:ty,iridescence_pars_fragment:ny,opaque_fragment:iy,packing:ry,premultiplied_alpha_fragment:sy,project_vertex:oy,dithering_fragment:ay,dithering_pars_fragment:ly,roughnessmap_fragment:uy,roughnessmap_pars_fragment:cy,shadowmap_pars_fragment:fy,shadowmap_pars_vertex:hy,shadowmap_vertex:dy,shadowmask_pars_fragment:py,skinbase_vertex:my,skinning_pars_vertex:gy,skinning_vertex:_y,skinnormal_vertex:vy,specularmap_fragment:xy,specularmap_pars_fragment:yy,tonemapping_fragment:Sy,tonemapping_pars_fragment:My,transmission_fragment:Ey,transmission_pars_fragment:Ty,uv_pars_fragment:wy,uv_pars_vertex:Ay,uv_vertex:Cy,worldpos_vertex:Ry,background_vert:Py,background_frag:by,backgroundCube_vert:Ly,backgroundCube_frag:Dy,cube_vert:Iy,cube_frag:Uy,depth_vert:Ny,depth_frag:Fy,distanceRGBA_vert:Oy,distanceRGBA_frag:ky,equirect_vert:zy,equirect_frag:By,linedashed_vert:Hy,linedashed_frag:Vy,meshbasic_vert:Gy,meshbasic_frag:Wy,meshlambert_vert:Xy,meshlambert_frag:jy,meshmatcap_vert:Yy,meshmatcap_frag:qy,meshnormal_vert:Ky,meshnormal_frag:$y,meshphong_vert:Zy,meshphong_frag:Qy,meshphysical_vert:Jy,meshphysical_frag:eS,meshtoon_vert:tS,meshtoon_frag:nS,points_vert:iS,points_frag:rS,shadow_vert:sS,shadow_frag:oS,sprite_vert:aS,sprite_frag:lS},De={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},xi={basic:{uniforms:yn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:yn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new et(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:yn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:yn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:yn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new et(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:yn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:yn([De.points,De.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:yn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:yn([De.common,De.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:yn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:yn([De.sprite,De.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:yn([De.common,De.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:yn([De.lights,De.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};xi.physical={uniforms:yn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Sl={r:0,b:0,g:0},Vr=new Mi,uS=new Ot;function cS(s,e,n,r,a,u,f){const h=new et(0);let p=u===!0?0:1,m,_,v=null,x=0,S=null;function T(L){let U=L.isScene===!0?L.background:null;return U&&U.isTexture&&(U=(L.backgroundBlurriness>0?n:e).get(U)),U}function A(L){let U=!1;const R=T(L);R===null?g(h,p):R&&R.isColor&&(g(R,1),U=!0);const Q=s.xr.getEnvironmentBlendMode();Q==="additive"?r.buffers.color.setClear(0,0,0,1,f):Q==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(s.autoClear||U)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(L,U){const R=T(U);R&&(R.isCubeTexture||R.mapping===Ol)?(_===void 0&&(_=new Qn(new Jr(1,1,1),new Er({name:"BackgroundCubeMaterial",uniforms:Js(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(Q,B,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(_)),Vr.copy(U.backgroundRotation),Vr.x*=-1,Vr.y*=-1,Vr.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Vr.y*=-1,Vr.z*=-1),_.material.uniforms.envMap.value=R,_.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(uS.makeRotationFromEuler(Vr)),_.material.toneMapped=St.getTransfer(R.colorSpace)!==Pt,(v!==R||x!==R.version||S!==s.toneMapping)&&(_.material.needsUpdate=!0,v=R,x=R.version,S=s.toneMapping),_.layers.enableAll(),L.unshift(_,_.geometry,_.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new Qn(new zl(2,2),new Er({name:"BackgroundMaterial",uniforms:Js(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:Mr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=St.getTransfer(R.colorSpace)!==Pt,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(v!==R||x!==R.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,v=R,x=R.version,S=s.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function g(L,U){L.getRGB(Sl,dg(s)),r.buffers.color.setClear(Sl.r,Sl.g,Sl.b,U,f)}return{getClearColor:function(){return h},setClearColor:function(L,U=1){h.set(L),p=U,g(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(L){p=L,g(h,p)},render:A,addToRenderList:y}}function fS(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let u=a,f=!1;function h(C,z,le,te,fe){let me=!1;const ue=v(te,le,z);u!==ue&&(u=ue,m(u.object)),me=S(C,te,le,fe),me&&T(C,te,le,fe),fe!==null&&e.update(fe,s.ELEMENT_ARRAY_BUFFER),(me||f)&&(f=!1,R(C,z,le,te),fe!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(fe).buffer))}function p(){return s.createVertexArray()}function m(C){return s.bindVertexArray(C)}function _(C){return s.deleteVertexArray(C)}function v(C,z,le){const te=le.wireframe===!0;let fe=r[C.id];fe===void 0&&(fe={},r[C.id]=fe);let me=fe[z.id];me===void 0&&(me={},fe[z.id]=me);let ue=me[te];return ue===void 0&&(ue=x(p()),me[te]=ue),ue}function x(C){const z=[],le=[],te=[];for(let fe=0;fe<n;fe++)z[fe]=0,le[fe]=0,te[fe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:le,attributeDivisors:te,object:C,attributes:{},index:null}}function S(C,z,le,te){const fe=u.attributes,me=z.attributes;let ue=0;const he=le.getAttributes();for(const k in he)if(he[k].location>=0){const oe=fe[k];let N=me[k];if(N===void 0&&(k==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),k==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),oe===void 0||oe.attribute!==N||N&&oe.data!==N.data)return!0;ue++}return u.attributesNum!==ue||u.index!==te}function T(C,z,le,te){const fe={},me=z.attributes;let ue=0;const he=le.getAttributes();for(const k in he)if(he[k].location>=0){let oe=me[k];oe===void 0&&(k==="instanceMatrix"&&C.instanceMatrix&&(oe=C.instanceMatrix),k==="instanceColor"&&C.instanceColor&&(oe=C.instanceColor));const N={};N.attribute=oe,oe&&oe.data&&(N.data=oe.data),fe[k]=N,ue++}u.attributes=fe,u.attributesNum=ue,u.index=te}function A(){const C=u.newAttributes;for(let z=0,le=C.length;z<le;z++)C[z]=0}function y(C){g(C,0)}function g(C,z){const le=u.newAttributes,te=u.enabledAttributes,fe=u.attributeDivisors;le[C]=1,te[C]===0&&(s.enableVertexAttribArray(C),te[C]=1),fe[C]!==z&&(s.vertexAttribDivisor(C,z),fe[C]=z)}function L(){const C=u.newAttributes,z=u.enabledAttributes;for(let le=0,te=z.length;le<te;le++)z[le]!==C[le]&&(s.disableVertexAttribArray(le),z[le]=0)}function U(C,z,le,te,fe,me,ue){ue===!0?s.vertexAttribIPointer(C,z,le,fe,me):s.vertexAttribPointer(C,z,le,te,fe,me)}function R(C,z,le,te){A();const fe=te.attributes,me=le.getAttributes(),ue=z.defaultAttributeValues;for(const he in me){const k=me[he];if(k.location>=0){let ce=fe[he];if(ce===void 0&&(he==="instanceMatrix"&&C.instanceMatrix&&(ce=C.instanceMatrix),he==="instanceColor"&&C.instanceColor&&(ce=C.instanceColor)),ce!==void 0){const oe=ce.normalized,N=ce.itemSize,re=e.get(ce);if(re===void 0)continue;const Fe=re.buffer,Z=re.type,de=re.bytesPerElement,Se=Z===s.INT||Z===s.UNSIGNED_INT||ce.gpuType===Yf;if(ce.isInterleavedBufferAttribute){const xe=ce.data,Re=xe.stride,ke=ce.offset;if(xe.isInstancedInterleavedBuffer){for(let Ke=0;Ke<k.locationSize;Ke++)g(k.location+Ke,xe.meshPerAttribute);C.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Ke=0;Ke<k.locationSize;Ke++)y(k.location+Ke);s.bindBuffer(s.ARRAY_BUFFER,Fe);for(let Ke=0;Ke<k.locationSize;Ke++)U(k.location+Ke,N/k.locationSize,Z,oe,Re*de,(ke+N/k.locationSize*Ke)*de,Se)}else{if(ce.isInstancedBufferAttribute){for(let xe=0;xe<k.locationSize;xe++)g(k.location+xe,ce.meshPerAttribute);C.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let xe=0;xe<k.locationSize;xe++)y(k.location+xe);s.bindBuffer(s.ARRAY_BUFFER,Fe);for(let xe=0;xe<k.locationSize;xe++)U(k.location+xe,N/k.locationSize,Z,oe,N*de,N/k.locationSize*xe*de,Se)}}else if(ue!==void 0){const oe=ue[he];if(oe!==void 0)switch(oe.length){case 2:s.vertexAttrib2fv(k.location,oe);break;case 3:s.vertexAttrib3fv(k.location,oe);break;case 4:s.vertexAttrib4fv(k.location,oe);break;default:s.vertexAttrib1fv(k.location,oe)}}}}L()}function Q(){Y();for(const C in r){const z=r[C];for(const le in z){const te=z[le];for(const fe in te)_(te[fe].object),delete te[fe];delete z[le]}delete r[C]}}function B(C){if(r[C.id]===void 0)return;const z=r[C.id];for(const le in z){const te=z[le];for(const fe in te)_(te[fe].object),delete te[fe];delete z[le]}delete r[C.id]}function F(C){for(const z in r){const le=r[z];if(le[C.id]===void 0)continue;const te=le[C.id];for(const fe in te)_(te[fe].object),delete te[fe];delete le[C.id]}}function Y(){P(),f=!0,u!==a&&(u=a,m(u.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:h,reset:Y,resetDefaultState:P,dispose:Q,releaseStatesOfGeometry:B,releaseStatesOfProgram:F,initAttributes:A,enableAttribute:y,disableUnusedAttributes:L}}function hS(s,e,n){let r;function a(m){r=m}function u(m,_){s.drawArrays(r,m,_),n.update(_,r,1)}function f(m,_,v){v!==0&&(s.drawArraysInstanced(r,m,_,v),n.update(_,r,v))}function h(m,_,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,_,0,v);let S=0;for(let T=0;T<v;T++)S+=_[T];n.update(S,r,1)}function p(m,_,v,x){if(v===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let T=0;T<m.length;T++)f(m[T],_[T],x[T]);else{S.multiDrawArraysInstancedWEBGL(r,m,0,_,0,x,0,v);let T=0;for(let A=0;A<v;A++)T+=_[A]*x[A];n.update(T,r,1)}}this.setMode=a,this.render=u,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function dS(s,e,n,r){let a;function u(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function f(F){return!(F!==fi&&r.convert(F)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(F){const Y=F===Yo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==Gi&&r.convert(F)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==Si&&!Y)}function p(F){if(F==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const _=p(m);_!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const v=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),T=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),L=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),U=s.getParameter(s.MAX_VARYING_VECTORS),R=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),Q=T>0,B=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:T,maxTextureSize:A,maxCubemapSize:y,maxAttributes:g,maxVertexUniforms:L,maxVaryings:U,maxFragmentUniforms:R,vertexTextures:Q,maxSamples:B}}function pS(s){const e=this;let n=null,r=0,a=!1,u=!1;const f=new vr,h=new ht,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const S=v.length!==0||x||r!==0||a;return a=x,r=v.length,S},this.beginShadows=function(){u=!0,_(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(v,x){n=_(v,x,0)},this.setState=function(v,x,S){const T=v.clippingPlanes,A=v.clipIntersection,y=v.clipShadows,g=s.get(v);if(!a||T===null||T.length===0||u&&!y)u?_(null):m();else{const L=u?0:r,U=L*4;let R=g.clippingState||null;p.value=R,R=_(T,x,U,S);for(let Q=0;Q!==U;++Q)R[Q]=n[Q];g.clippingState=R,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=L}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(v,x,S,T){const A=v!==null?v.length:0;let y=null;if(A!==0){if(y=p.value,T!==!0||y===null){const g=S+A*4,L=x.matrixWorldInverse;h.getNormalMatrix(L),(y===null||y.length<g)&&(y=new Float32Array(g));for(let U=0,R=S;U!==A;++U,R+=4)f.copy(v[U]).applyMatrix4(L,h),f.normal.toArray(y,R),y[R+3]=f.constant}p.value=y,p.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,y}}function mS(s){let e=new WeakMap;function n(f,h){return h===ff?f.mapping=Ks:h===hf&&(f.mapping=$s),f}function r(f){if(f&&f.isTexture){const h=f.mapping;if(h===ff||h===hf)if(e.has(f)){const p=e.get(f).texture;return n(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new A0(p.height);return m.fromEquirectangularTexture(s,f),e.set(f,m),f.addEventListener("dispose",a),n(m.texture,f.mapping)}else return null}}return f}function a(f){const h=f.target;h.removeEventListener("dispose",a);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(){e=new WeakMap}return{get:r,dispose:u}}class _g extends pg{constructor(e=-1,n=1,r=1,a=-1,u=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=u,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,u,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let u=r-e,f=r+e,h=a+n,p=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=m*this.view.offsetX,f=u+m*this.view.width,h-=_*this.view.offsetY,p=h-_*this.view.height}this.projectionMatrix.makeOrthographic(u,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Gs=4,um=[.125,.215,.35,.446,.526,.582],jr=20,jc=new _g,cm=new et;let Yc=null,qc=0,Kc=0,$c=!1;const Wr=(1+Math.sqrt(5))/2,Bs=1/Wr,fm=[new J(-Wr,Bs,0),new J(Wr,Bs,0),new J(-Bs,0,Wr),new J(Bs,0,Wr),new J(0,Wr,-Bs),new J(0,Wr,Bs),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class hm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100){Yc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Kc=this._renderer.getActiveMipmapLevel(),$c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,r,a,u),n>0&&this._blur(u,0,0,n),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yc,qc,Kc),this._renderer.xr.enabled=$c,e.scissorTest=!1,Ml(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ks||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Kc=this._renderer.getActiveMipmapLevel(),$c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:yi,minFilter:yi,generateMipmaps:!1,type:Yo,format:fi,colorSpace:to,depthBuffer:!1},a=dm(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dm(e,n,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gS(u)),this._blurMaterial=_S(u,e,n)}return a}_compileMaterial(e){const n=new Qn(this._lodPlanes[0],e);this._renderer.compile(n,jc)}_sceneToCubeUV(e,n,r,a){const h=new Zn(90,1,n,r),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,x=_.toneMapping;_.getClearColor(cm),_.toneMapping=Sr,_.autoClear=!1;const S=new cg({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),T=new Qn(new Jr,S);let A=!1;const y=e.background;y?y.isColor&&(S.color.copy(y),e.background=null,A=!0):(S.color.copy(cm),A=!0);for(let g=0;g<6;g++){const L=g%3;L===0?(h.up.set(0,p[g],0),h.lookAt(m[g],0,0)):L===1?(h.up.set(0,0,p[g]),h.lookAt(0,m[g],0)):(h.up.set(0,p[g],0),h.lookAt(0,0,m[g]));const U=this._cubeSize;Ml(a,L*U,g>2?U:0,U,U),_.setRenderTarget(a),A&&_.render(T,h),_.render(e,h)}T.geometry.dispose(),T.material.dispose(),_.toneMapping=x,_.autoClear=v,e.background=y}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Ks||e.mapping===$s;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=mm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pm());const u=a?this._cubemapMaterial:this._equirectMaterial,f=new Qn(this._lodPlanes[0],u),h=u.uniforms;h.envMap.value=e;const p=this._cubeSize;Ml(n,0,0,3*p,2*p),r.setRenderTarget(n),r.render(f,jc)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let u=1;u<a;u++){const f=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),h=fm[(a-u-1)%fm.length];this._blur(e,u-1,u,f,h)}n.autoClear=r}_blur(e,n,r,a,u){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,r,a,"latitudinal",u),this._halfBlur(f,e,r,r,a,"longitudinal",u)}_halfBlur(e,n,r,a,u,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,v=new Qn(this._lodPlanes[a],m),x=m.uniforms,S=this._sizeLods[r]-1,T=isFinite(u)?Math.PI/(2*S):2*Math.PI/(2*jr-1),A=u/T,y=isFinite(u)?1+Math.floor(_*A):jr;y>jr&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${jr}`);const g=[];let L=0;for(let F=0;F<jr;++F){const Y=F/A,P=Math.exp(-Y*Y/2);g.push(P),F===0?L+=P:F<y&&(L+=2*P)}for(let F=0;F<g.length;F++)g[F]=g[F]/L;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=g,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:U}=this;x.dTheta.value=T,x.mipInt.value=U-r;const R=this._sizeLods[a],Q=3*R*(a>U-Gs?a-U+Gs:0),B=4*(this._cubeSize-R);Ml(n,Q,B,3*R,2*R),p.setRenderTarget(n),p.render(v,jc)}}function gS(s){const e=[],n=[],r=[];let a=s;const u=s-Gs+1+um.length;for(let f=0;f<u;f++){const h=Math.pow(2,a);n.push(h);let p=1/h;f>s-Gs?p=um[f-s+Gs-1]:f===0&&(p=0),r.push(p);const m=1/(h-2),_=-m,v=1+m,x=[_,_,v,_,v,v,_,_,v,v,_,v],S=6,T=6,A=3,y=2,g=1,L=new Float32Array(A*T*S),U=new Float32Array(y*T*S),R=new Float32Array(g*T*S);for(let B=0;B<S;B++){const F=B%3*2/3-1,Y=B>2?0:-1,P=[F,Y,0,F+2/3,Y,0,F+2/3,Y+1,0,F,Y,0,F+2/3,Y+1,0,F,Y+1,0];L.set(P,A*T*B),U.set(x,y*T*B);const C=[B,B,B,B,B,B];R.set(C,g*T*B)}const Q=new ns;Q.setAttribute("position",new hi(L,A)),Q.setAttribute("uv",new hi(U,y)),Q.setAttribute("faceIndex",new hi(R,g)),e.push(Q),a>Gs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function dm(s,e,n){const r=new Zr(s,e,n);return r.texture.mapping=Ol,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ml(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function _S(s,e,n){const r=new Float32Array(jr),a=new J(0,1,0);return new Er({name:"SphericalGaussianBlur",defines:{n:jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:th(),fragmentShader:`

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
		`,blending:yr,depthTest:!1,depthWrite:!1})}function pm(){return new Er({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:th(),fragmentShader:`

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
		`,blending:yr,depthTest:!1,depthWrite:!1})}function mm(){return new Er({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function th(){return`

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
	`}function vS(s){let e=new WeakMap,n=null;function r(h){if(h&&h.isTexture){const p=h.mapping,m=p===ff||p===hf,_=p===Ks||p===$s;if(m||_){let v=e.get(h);const x=v!==void 0?v.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==x)return n===null&&(n=new hm(s)),v=m?n.fromEquirectangular(h,v):n.fromCubemap(h,v),v.texture.pmremVersion=h.pmremVersion,e.set(h,v),v.texture;if(v!==void 0)return v.texture;{const S=h.image;return m&&S&&S.height>0||_&&S&&a(S)?(n===null&&(n=new hm(s)),v=m?n.fromEquirectangular(h):n.fromCubemap(h),v.texture.pmremVersion=h.pmremVersion,e.set(h,v),h.addEventListener("dispose",u),v.texture):null}}}return h}function a(h){let p=0;const m=6;for(let _=0;_<m;_++)h[_]!==void 0&&p++;return p===m}function u(h){const p=h.target;p.removeEventListener("dispose",u);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function f(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function xS(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&Wo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function yS(s,e,n,r){const a={},u=new WeakMap;function f(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const T in x.attributes)e.remove(x.attributes[T]);for(const T in x.morphAttributes){const A=x.morphAttributes[T];for(let y=0,g=A.length;y<g;y++)e.remove(A[y])}x.removeEventListener("dispose",f),delete a[x.id];const S=u.get(x);S&&(e.remove(S),u.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function h(v,x){return a[x.id]===!0||(x.addEventListener("dispose",f),a[x.id]=!0,n.memory.geometries++),x}function p(v){const x=v.attributes;for(const T in x)e.update(x[T],s.ARRAY_BUFFER);const S=v.morphAttributes;for(const T in S){const A=S[T];for(let y=0,g=A.length;y<g;y++)e.update(A[y],s.ARRAY_BUFFER)}}function m(v){const x=[],S=v.index,T=v.attributes.position;let A=0;if(S!==null){const L=S.array;A=S.version;for(let U=0,R=L.length;U<R;U+=3){const Q=L[U+0],B=L[U+1],F=L[U+2];x.push(Q,B,B,F,F,Q)}}else if(T!==void 0){const L=T.array;A=T.version;for(let U=0,R=L.length/3-1;U<R;U+=3){const Q=U+0,B=U+1,F=U+2;x.push(Q,B,B,F,F,Q)}}else return;const y=new(rg(x)?hg:fg)(x,1);y.version=A;const g=u.get(v);g&&e.remove(g),u.set(v,y)}function _(v){const x=u.get(v);if(x){const S=v.index;S!==null&&x.version<S.version&&m(v)}else m(v);return u.get(v)}return{get:h,update:p,getWireframeAttribute:_}}function SS(s,e,n){let r;function a(x){r=x}let u,f;function h(x){u=x.type,f=x.bytesPerElement}function p(x,S){s.drawElements(r,S,u,x*f),n.update(S,r,1)}function m(x,S,T){T!==0&&(s.drawElementsInstanced(r,S,u,x*f,T),n.update(S,r,T))}function _(x,S,T){if(T===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,u,x,0,T);let y=0;for(let g=0;g<T;g++)y+=S[g];n.update(y,r,1)}function v(x,S,T,A){if(T===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let g=0;g<x.length;g++)m(x[g]/f,S[g],A[g]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,u,x,0,A,0,T);let g=0;for(let L=0;L<T;L++)g+=S[L]*A[L];n.update(g,r,1)}}this.setMode=a,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=_,this.renderMultiDrawInstances=v}function MS(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,f,h){switch(n.calls++,f){case s.TRIANGLES:n.triangles+=h*(u/3);break;case s.LINES:n.lines+=h*(u/2);break;case s.LINE_STRIP:n.lines+=h*(u-1);break;case s.LINE_LOOP:n.lines+=h*u;break;case s.POINTS:n.points+=h*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function ES(s,e,n){const r=new WeakMap,a=new Vt;function u(f,h,p){const m=f.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=_!==void 0?_.length:0;let x=r.get(h);if(x===void 0||x.count!==v){let C=function(){Y.dispose(),r.delete(h),h.removeEventListener("dispose",C)};var S=C;x!==void 0&&x.texture.dispose();const T=h.morphAttributes.position!==void 0,A=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,g=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],U=h.morphAttributes.color||[];let R=0;T===!0&&(R=1),A===!0&&(R=2),y===!0&&(R=3);let Q=h.attributes.position.count*R,B=1;Q>e.maxTextureSize&&(B=Math.ceil(Q/e.maxTextureSize),Q=e.maxTextureSize);const F=new Float32Array(Q*B*4*v),Y=new og(F,Q,B,v);Y.type=Si,Y.needsUpdate=!0;const P=R*4;for(let z=0;z<v;z++){const le=g[z],te=L[z],fe=U[z],me=Q*B*4*z;for(let ue=0;ue<le.count;ue++){const he=ue*P;T===!0&&(a.fromBufferAttribute(le,ue),F[me+he+0]=a.x,F[me+he+1]=a.y,F[me+he+2]=a.z,F[me+he+3]=0),A===!0&&(a.fromBufferAttribute(te,ue),F[me+he+4]=a.x,F[me+he+5]=a.y,F[me+he+6]=a.z,F[me+he+7]=0),y===!0&&(a.fromBufferAttribute(fe,ue),F[me+he+8]=a.x,F[me+he+9]=a.y,F[me+he+10]=a.z,F[me+he+11]=fe.itemSize===4?a.w:1)}}x={count:v,texture:Y,size:new dt(Q,B)},r.set(h,x),h.addEventListener("dispose",C)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(s,"morphTexture",f.morphTexture,n);else{let T=0;for(let y=0;y<m.length;y++)T+=m[y];const A=h.morphTargetsRelative?1:1-T;p.getUniforms().setValue(s,"morphTargetBaseInfluence",A),p.getUniforms().setValue(s,"morphTargetInfluences",m)}p.getUniforms().setValue(s,"morphTargetsTexture",x.texture,n),p.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:u}}function TS(s,e,n,r){let a=new WeakMap;function u(p){const m=r.render.frame,_=p.geometry,v=e.get(p,_);if(a.get(v)!==m&&(e.update(v),a.set(v,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),a.get(p)!==m&&(n.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,s.ARRAY_BUFFER),a.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return v}function f(){a=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:u,dispose:f}}class vg extends Mn{constructor(e,n,r,a,u,f,h,p,m,_=js){if(_!==js&&_!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&_===js&&(r=$r),r===void 0&&_===Qs&&(r=Zs),super(null,a,u,f,h,p,_,r,m),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=h!==void 0?h:Bn,this.minFilter=p!==void 0?p:Bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const xg=new Mn,gm=new vg(1,1),yg=new og,Sg=new c0,Mg=new mg,_m=[],vm=[],xm=new Float32Array(16),ym=new Float32Array(9),Sm=new Float32Array(4);function no(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let u=_m[a];if(u===void 0&&(u=new Float32Array(a),_m[a]=u),e!==0){r.toArray(u,0);for(let f=1,h=0;f!==e;++f)h+=n,s[f].toArray(u,h)}return u}function Zt(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function Qt(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function Bl(s,e){let n=vm[e];n===void 0&&(n=new Int32Array(e),vm[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function wS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function AS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;s.uniform2fv(this.addr,e),Qt(n,e)}}function CS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Zt(n,e))return;s.uniform3fv(this.addr,e),Qt(n,e)}}function RS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;s.uniform4fv(this.addr,e),Qt(n,e)}}function PS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Zt(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),Qt(n,e)}else{if(Zt(n,r))return;Sm.set(r),s.uniformMatrix2fv(this.addr,!1,Sm),Qt(n,r)}}function bS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Zt(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),Qt(n,e)}else{if(Zt(n,r))return;ym.set(r),s.uniformMatrix3fv(this.addr,!1,ym),Qt(n,r)}}function LS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Zt(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),Qt(n,e)}else{if(Zt(n,r))return;xm.set(r),s.uniformMatrix4fv(this.addr,!1,xm),Qt(n,r)}}function DS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function IS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;s.uniform2iv(this.addr,e),Qt(n,e)}}function US(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;s.uniform3iv(this.addr,e),Qt(n,e)}}function NS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;s.uniform4iv(this.addr,e),Qt(n,e)}}function FS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function OS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;s.uniform2uiv(this.addr,e),Qt(n,e)}}function kS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;s.uniform3uiv(this.addr,e),Qt(n,e)}}function zS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;s.uniform4uiv(this.addr,e),Qt(n,e)}}function BS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let u;this.type===s.SAMPLER_2D_SHADOW?(gm.compareFunction=ig,u=gm):u=xg,n.setTexture2D(e||u,a)}function HS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||Sg,a)}function VS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||Mg,a)}function GS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||yg,a)}function WS(s){switch(s){case 5126:return wS;case 35664:return AS;case 35665:return CS;case 35666:return RS;case 35674:return PS;case 35675:return bS;case 35676:return LS;case 5124:case 35670:return DS;case 35667:case 35671:return IS;case 35668:case 35672:return US;case 35669:case 35673:return NS;case 5125:return FS;case 36294:return OS;case 36295:return kS;case 36296:return zS;case 35678:case 36198:case 36298:case 36306:case 35682:return BS;case 35679:case 36299:case 36307:return HS;case 35680:case 36300:case 36308:case 36293:return VS;case 36289:case 36303:case 36311:case 36292:return GS}}function XS(s,e){s.uniform1fv(this.addr,e)}function jS(s,e){const n=no(e,this.size,2);s.uniform2fv(this.addr,n)}function YS(s,e){const n=no(e,this.size,3);s.uniform3fv(this.addr,n)}function qS(s,e){const n=no(e,this.size,4);s.uniform4fv(this.addr,n)}function KS(s,e){const n=no(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function $S(s,e){const n=no(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function ZS(s,e){const n=no(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function QS(s,e){s.uniform1iv(this.addr,e)}function JS(s,e){s.uniform2iv(this.addr,e)}function eM(s,e){s.uniform3iv(this.addr,e)}function tM(s,e){s.uniform4iv(this.addr,e)}function nM(s,e){s.uniform1uiv(this.addr,e)}function iM(s,e){s.uniform2uiv(this.addr,e)}function rM(s,e){s.uniform3uiv(this.addr,e)}function sM(s,e){s.uniform4uiv(this.addr,e)}function oM(s,e,n){const r=this.cache,a=e.length,u=Bl(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTexture2D(e[f]||xg,u[f])}function aM(s,e,n){const r=this.cache,a=e.length,u=Bl(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTexture3D(e[f]||Sg,u[f])}function lM(s,e,n){const r=this.cache,a=e.length,u=Bl(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTextureCube(e[f]||Mg,u[f])}function uM(s,e,n){const r=this.cache,a=e.length,u=Bl(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTexture2DArray(e[f]||yg,u[f])}function cM(s){switch(s){case 5126:return XS;case 35664:return jS;case 35665:return YS;case 35666:return qS;case 35674:return KS;case 35675:return $S;case 35676:return ZS;case 5124:case 35670:return QS;case 35667:case 35671:return JS;case 35668:case 35672:return eM;case 35669:case 35673:return tM;case 5125:return nM;case 36294:return iM;case 36295:return rM;case 36296:return sM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return aM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return uM}}class fM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=WS(n.type)}}class hM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=cM(n.type)}}class dM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let u=0,f=a.length;u!==f;++u){const h=a[u];h.setValue(e,n[h.id],r)}}}const Zc=/(\w+)(\])?(\[|\.)?/g;function Mm(s,e){s.seq.push(e),s.map[e.id]=e}function pM(s,e,n){const r=s.name,a=r.length;for(Zc.lastIndex=0;;){const u=Zc.exec(r),f=Zc.lastIndex;let h=u[1];const p=u[2]==="]",m=u[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===a){Mm(n,m===void 0?new fM(h,s,e):new hM(h,s,e));break}else{let v=n.map[h];v===void 0&&(v=new dM(h),Mm(n,v)),n=v}}}class Ul{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const u=e.getActiveUniform(n,a),f=e.getUniformLocation(n,u.name);pM(u,f,this)}}setValue(e,n,r,a){const u=this.map[n];u!==void 0&&u.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let u=0,f=n.length;u!==f;++u){const h=n[u],p=r[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,u=e.length;a!==u;++a){const f=e[a];f.id in n&&r.push(f)}return r}}function Em(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const mM=37297;let gM=0;function _M(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),u=Math.min(e+6,n.length);for(let f=a;f<u;f++){const h=f+1;r.push(`${h===e?">":" "} ${h}: ${n[f]}`)}return r.join(`
`)}const Tm=new ht;function vM(s){St._getMatrix(Tm,St.workingColorSpace,s);const e=`mat3( ${Tm.elements.map(n=>n.toFixed(4))} )`;switch(St.getTransfer(s)){case kl:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function wm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const u=/ERROR: 0:(\d+)/.exec(a);if(u){const f=parseInt(u[1]);return n.toUpperCase()+`

`+a+`

`+_M(s.getShaderSource(e),f)}else return a}function xM(s,e){const n=vM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function yM(s,e){let n;switch(e){case Fv:n="Linear";break;case Ov:n="Reinhard";break;case kv:n="Cineon";break;case zv:n="ACESFilmic";break;case Hv:n="AgX";break;case Vv:n="Neutral";break;case Bv:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const El=new J;function SM(){St.getLuminanceCoefficients(El);const s=El.x.toFixed(4),e=El.y.toFixed(4),n=El.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xo).join(`
`)}function EM(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function TM(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const u=s.getActiveAttrib(e,a),f=u.name;let h=1;u.type===s.FLOAT_MAT2&&(h=2),u.type===s.FLOAT_MAT3&&(h=3),u.type===s.FLOAT_MAT4&&(h=4),n[f]={type:u.type,location:s.getAttribLocation(e,f),locationSize:h}}return n}function Xo(s){return s!==""}function Am(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vf(s){return s.replace(wM,CM)}const AM=new Map;function CM(s,e){let n=pt[e];if(n===void 0){const r=AM.get(e);if(r!==void 0)n=pt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Vf(n)}const RM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rm(s){return s.replace(RM,PM)}function PM(s,e,n,r){let a="";for(let u=parseInt(e);u<parseInt(n);u++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return a}function Pm(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function bM(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Wm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xm?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===zi&&(e="SHADOWMAP_TYPE_VSM"),e}function LM(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ks:case $s:e="ENVMAP_TYPE_CUBE";break;case Ol:e="ENVMAP_TYPE_CUBE_UV";break}return e}function DM(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case $s:e="ENVMAP_MODE_REFRACTION";break}return e}function IM(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case jf:e="ENVMAP_BLENDING_MULTIPLY";break;case Uv:e="ENVMAP_BLENDING_MIX";break;case Nv:e="ENVMAP_BLENDING_ADD";break}return e}function UM(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function NM(s,e,n,r){const a=s.getContext(),u=n.defines;let f=n.vertexShader,h=n.fragmentShader;const p=bM(n),m=LM(n),_=DM(n),v=IM(n),x=UM(n),S=MM(n),T=EM(u),A=a.createProgram();let y,g,L=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T].filter(Xo).join(`
`),y.length>0&&(y+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T].filter(Xo).join(`
`),g.length>0&&(g+=`
`)):(y=[Pm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xo).join(`
`),g=[Pm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+_:"",n.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Sr?"#define TONE_MAPPING":"",n.toneMapping!==Sr?pt.tonemapping_pars_fragment:"",n.toneMapping!==Sr?yM("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,xM("linearToOutputTexel",n.outputColorSpace),SM(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Xo).join(`
`)),f=Vf(f),f=Am(f,n),f=Cm(f,n),h=Vf(h),h=Am(h,n),h=Cm(h,n),f=Rm(f),h=Rm(h),n.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",n.glslVersion===Vp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Vp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const U=L+y+f,R=L+g+h,Q=Em(a,a.VERTEX_SHADER,U),B=Em(a,a.FRAGMENT_SHADER,R);a.attachShader(A,Q),a.attachShader(A,B),n.index0AttributeName!==void 0?a.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(A,0,"position"),a.linkProgram(A);function F(z){if(s.debug.checkShaderErrors){const le=a.getProgramInfoLog(A).trim(),te=a.getShaderInfoLog(Q).trim(),fe=a.getShaderInfoLog(B).trim();let me=!0,ue=!0;if(a.getProgramParameter(A,a.LINK_STATUS)===!1)if(me=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,A,Q,B);else{const he=wm(a,Q,"vertex"),k=wm(a,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(A,a.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+le+`
`+he+`
`+k)}else le!==""?console.warn("THREE.WebGLProgram: Program Info Log:",le):(te===""||fe==="")&&(ue=!1);ue&&(z.diagnostics={runnable:me,programLog:le,vertexShader:{log:te,prefix:y},fragmentShader:{log:fe,prefix:g}})}a.deleteShader(Q),a.deleteShader(B),Y=new Ul(a,A),P=TM(a,A)}let Y;this.getUniforms=function(){return Y===void 0&&F(this),Y};let P;this.getAttributes=function(){return P===void 0&&F(this),P};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(A,mM)),C},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=gM++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=Q,this.fragmentShader=B,this}let FM=0;class OM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),u=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(u)===!1&&(f.add(u),u.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new kM(e),n.set(e,r)),r}}class kM{constructor(e){this.id=FM++,this.code=e,this.usedTimes=0}}function zM(s,e,n,r,a,u,f){const h=new lg,p=new OM,m=new Set,_=[],v=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(P){return m.add(P),P===0?"uv":`uv${P}`}function y(P,C,z,le,te){const fe=le.fog,me=te.geometry,ue=P.isMeshStandardMaterial?le.environment:null,he=(P.isMeshStandardMaterial?n:e).get(P.envMap||ue),k=he&&he.mapping===Ol?he.image.height:null,ce=T[P.type];P.precision!==null&&(S=a.getMaxPrecision(P.precision),S!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",S,"instead."));const oe=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,N=oe!==void 0?oe.length:0;let re=0;me.morphAttributes.position!==void 0&&(re=1),me.morphAttributes.normal!==void 0&&(re=2),me.morphAttributes.color!==void 0&&(re=3);let Fe,Z,de,Se;if(ce){const xt=xi[ce];Fe=xt.vertexShader,Z=xt.fragmentShader}else Fe=P.vertexShader,Z=P.fragmentShader,p.update(P),de=p.getVertexShaderID(P),Se=p.getFragmentShaderID(P);const xe=s.getRenderTarget(),Re=s.state.buffers.depth.getReversed(),ke=te.isInstancedMesh===!0,Ke=te.isBatchedMesh===!0,At=!!P.map,at=!!P.matcap,Rt=!!he,W=!!P.aoMap,sn=!!P.lightMap,lt=!!P.bumpMap,ft=!!P.normalMap,$e=!!P.displacementMap,Mt=!!P.emissiveMap,We=!!P.metalnessMap,b=!!P.roughnessMap,E=P.anisotropy>0,D=P.clearcoat>0,V=P.dispersion>0,se=P.iridescence>0,K=P.sheen>0,Te=P.transmission>0,ye=E&&!!P.anisotropyMap,Ce=D&&!!P.clearcoatMap,Je=D&&!!P.clearcoatNormalMap,_e=D&&!!P.clearcoatRoughnessMap,be=se&&!!P.iridescenceMap,Ie=se&&!!P.iridescenceThicknessMap,ze=K&&!!P.sheenColorMap,Pe=K&&!!P.sheenRoughnessMap,ut=!!P.specularMap,tt=!!P.specularColorMap,vt=!!P.specularIntensityMap,G=Te&&!!P.transmissionMap,Le=Te&&!!P.thicknessMap,ae=!!P.gradientMap,pe=!!P.alphaMap,Ne=P.alphaTest>0,Ue=!!P.alphaHash,ot=!!P.extensions;let It=Sr;P.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(It=s.toneMapping);const jt={shaderID:ce,shaderType:P.type,shaderName:P.name,vertexShader:Fe,fragmentShader:Z,defines:P.defines,customVertexShaderID:de,customFragmentShaderID:Se,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:S,batching:Ke,batchingColor:Ke&&te._colorsTexture!==null,instancing:ke,instancingColor:ke&&te.instanceColor!==null,instancingMorph:ke&&te.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:xe===null?s.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:to,alphaToCoverage:!!P.alphaToCoverage,map:At,matcap:at,envMap:Rt,envMapMode:Rt&&he.mapping,envMapCubeUVHeight:k,aoMap:W,lightMap:sn,bumpMap:lt,normalMap:ft,displacementMap:x&&$e,emissiveMap:Mt,normalMapObjectSpace:ft&&P.normalMapType===jv,normalMapTangentSpace:ft&&P.normalMapType===ng,metalnessMap:We,roughnessMap:b,anisotropy:E,anisotropyMap:ye,clearcoat:D,clearcoatMap:Ce,clearcoatNormalMap:Je,clearcoatRoughnessMap:_e,dispersion:V,iridescence:se,iridescenceMap:be,iridescenceThicknessMap:Ie,sheen:K,sheenColorMap:ze,sheenRoughnessMap:Pe,specularMap:ut,specularColorMap:tt,specularIntensityMap:vt,transmission:Te,transmissionMap:G,thicknessMap:Le,gradientMap:ae,opaque:P.transparent===!1&&P.blending===Xs&&P.alphaToCoverage===!1,alphaMap:pe,alphaTest:Ne,alphaHash:Ue,combine:P.combine,mapUv:At&&A(P.map.channel),aoMapUv:W&&A(P.aoMap.channel),lightMapUv:sn&&A(P.lightMap.channel),bumpMapUv:lt&&A(P.bumpMap.channel),normalMapUv:ft&&A(P.normalMap.channel),displacementMapUv:$e&&A(P.displacementMap.channel),emissiveMapUv:Mt&&A(P.emissiveMap.channel),metalnessMapUv:We&&A(P.metalnessMap.channel),roughnessMapUv:b&&A(P.roughnessMap.channel),anisotropyMapUv:ye&&A(P.anisotropyMap.channel),clearcoatMapUv:Ce&&A(P.clearcoatMap.channel),clearcoatNormalMapUv:Je&&A(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&A(P.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&A(P.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&A(P.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&A(P.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&A(P.sheenRoughnessMap.channel),specularMapUv:ut&&A(P.specularMap.channel),specularColorMapUv:tt&&A(P.specularColorMap.channel),specularIntensityMapUv:vt&&A(P.specularIntensityMap.channel),transmissionMapUv:G&&A(P.transmissionMap.channel),thicknessMapUv:Le&&A(P.thicknessMap.channel),alphaMapUv:pe&&A(P.alphaMap.channel),vertexTangents:!!me.attributes.tangent&&(ft||E),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,pointsUvs:te.isPoints===!0&&!!me.attributes.uv&&(At||pe),fog:!!fe,useFog:P.fog===!0,fogExp2:!!fe&&fe.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:Re,skinning:te.isSkinnedMesh===!0,morphTargets:me.morphAttributes.position!==void 0,morphNormals:me.morphAttributes.normal!==void 0,morphColors:me.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:re,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:It,decodeVideoTexture:At&&P.map.isVideoTexture===!0&&St.getTransfer(P.map.colorSpace)===Pt,decodeVideoTextureEmissive:Mt&&P.emissiveMap.isVideoTexture===!0&&St.getTransfer(P.emissiveMap.colorSpace)===Pt,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Bi,flipSided:P.side===In,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:ot&&P.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&P.extensions.multiDraw===!0||Ke)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return jt.vertexUv1s=m.has(1),jt.vertexUv2s=m.has(2),jt.vertexUv3s=m.has(3),m.clear(),jt}function g(P){const C=[];if(P.shaderID?C.push(P.shaderID):(C.push(P.customVertexShaderID),C.push(P.customFragmentShaderID)),P.defines!==void 0)for(const z in P.defines)C.push(z),C.push(P.defines[z]);return P.isRawShaderMaterial===!1&&(L(C,P),U(C,P),C.push(s.outputColorSpace)),C.push(P.customProgramCacheKey),C.join()}function L(P,C){P.push(C.precision),P.push(C.outputColorSpace),P.push(C.envMapMode),P.push(C.envMapCubeUVHeight),P.push(C.mapUv),P.push(C.alphaMapUv),P.push(C.lightMapUv),P.push(C.aoMapUv),P.push(C.bumpMapUv),P.push(C.normalMapUv),P.push(C.displacementMapUv),P.push(C.emissiveMapUv),P.push(C.metalnessMapUv),P.push(C.roughnessMapUv),P.push(C.anisotropyMapUv),P.push(C.clearcoatMapUv),P.push(C.clearcoatNormalMapUv),P.push(C.clearcoatRoughnessMapUv),P.push(C.iridescenceMapUv),P.push(C.iridescenceThicknessMapUv),P.push(C.sheenColorMapUv),P.push(C.sheenRoughnessMapUv),P.push(C.specularMapUv),P.push(C.specularColorMapUv),P.push(C.specularIntensityMapUv),P.push(C.transmissionMapUv),P.push(C.thicknessMapUv),P.push(C.combine),P.push(C.fogExp2),P.push(C.sizeAttenuation),P.push(C.morphTargetsCount),P.push(C.morphAttributeCount),P.push(C.numDirLights),P.push(C.numPointLights),P.push(C.numSpotLights),P.push(C.numSpotLightMaps),P.push(C.numHemiLights),P.push(C.numRectAreaLights),P.push(C.numDirLightShadows),P.push(C.numPointLightShadows),P.push(C.numSpotLightShadows),P.push(C.numSpotLightShadowsWithMaps),P.push(C.numLightProbes),P.push(C.shadowMapType),P.push(C.toneMapping),P.push(C.numClippingPlanes),P.push(C.numClipIntersection),P.push(C.depthPacking)}function U(P,C){h.disableAll(),C.supportsVertexTextures&&h.enable(0),C.instancing&&h.enable(1),C.instancingColor&&h.enable(2),C.instancingMorph&&h.enable(3),C.matcap&&h.enable(4),C.envMap&&h.enable(5),C.normalMapObjectSpace&&h.enable(6),C.normalMapTangentSpace&&h.enable(7),C.clearcoat&&h.enable(8),C.iridescence&&h.enable(9),C.alphaTest&&h.enable(10),C.vertexColors&&h.enable(11),C.vertexAlphas&&h.enable(12),C.vertexUv1s&&h.enable(13),C.vertexUv2s&&h.enable(14),C.vertexUv3s&&h.enable(15),C.vertexTangents&&h.enable(16),C.anisotropy&&h.enable(17),C.alphaHash&&h.enable(18),C.batching&&h.enable(19),C.dispersion&&h.enable(20),C.batchingColor&&h.enable(21),P.push(h.mask),h.disableAll(),C.fog&&h.enable(0),C.useFog&&h.enable(1),C.flatShading&&h.enable(2),C.logarithmicDepthBuffer&&h.enable(3),C.reverseDepthBuffer&&h.enable(4),C.skinning&&h.enable(5),C.morphTargets&&h.enable(6),C.morphNormals&&h.enable(7),C.morphColors&&h.enable(8),C.premultipliedAlpha&&h.enable(9),C.shadowMapEnabled&&h.enable(10),C.doubleSided&&h.enable(11),C.flipSided&&h.enable(12),C.useDepthPacking&&h.enable(13),C.dithering&&h.enable(14),C.transmission&&h.enable(15),C.sheen&&h.enable(16),C.opaque&&h.enable(17),C.pointsUvs&&h.enable(18),C.decodeVideoTexture&&h.enable(19),C.decodeVideoTextureEmissive&&h.enable(20),C.alphaToCoverage&&h.enable(21),P.push(h.mask)}function R(P){const C=T[P.type];let z;if(C){const le=xi[C];z=M0.clone(le.uniforms)}else z=P.uniforms;return z}function Q(P,C){let z;for(let le=0,te=_.length;le<te;le++){const fe=_[le];if(fe.cacheKey===C){z=fe,++z.usedTimes;break}}return z===void 0&&(z=new NM(s,C,P,u),_.push(z)),z}function B(P){if(--P.usedTimes===0){const C=_.indexOf(P);_[C]=_[_.length-1],_.pop(),P.destroy()}}function F(P){p.remove(P)}function Y(){p.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:R,acquireProgram:Q,releaseProgram:B,releaseShaderCache:F,programs:_,dispose:Y}}function BM(){let s=new WeakMap;function e(f){return s.has(f)}function n(f){let h=s.get(f);return h===void 0&&(h={},s.set(f,h)),h}function r(f){s.delete(f)}function a(f,h,p){s.get(f)[h]=p}function u(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:u}}function HM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function bm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Lm(){const s=[];let e=0;const n=[],r=[],a=[];function u(){e=0,n.length=0,r.length=0,a.length=0}function f(v,x,S,T,A,y){let g=s[e];return g===void 0?(g={id:v.id,object:v,geometry:x,material:S,groupOrder:T,renderOrder:v.renderOrder,z:A,group:y},s[e]=g):(g.id=v.id,g.object=v,g.geometry=x,g.material=S,g.groupOrder=T,g.renderOrder=v.renderOrder,g.z=A,g.group=y),e++,g}function h(v,x,S,T,A,y){const g=f(v,x,S,T,A,y);S.transmission>0?r.push(g):S.transparent===!0?a.push(g):n.push(g)}function p(v,x,S,T,A,y){const g=f(v,x,S,T,A,y);S.transmission>0?r.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function m(v,x){n.length>1&&n.sort(v||HM),r.length>1&&r.sort(x||bm),a.length>1&&a.sort(x||bm)}function _(){for(let v=e,x=s.length;v<x;v++){const S=s[v];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:u,push:h,unshift:p,finish:_,sort:m}}function VM(){let s=new WeakMap;function e(r,a){const u=s.get(r);let f;return u===void 0?(f=new Lm,s.set(r,[f])):a>=u.length?(f=new Lm,u.push(f)):f=u[a],f}function n(){s=new WeakMap}return{get:e,dispose:n}}function GM(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new J,color:new et};break;case"SpotLight":n={position:new J,direction:new J,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new et,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new et,groundColor:new et};break;case"RectAreaLight":n={color:new et,position:new J,halfWidth:new J,halfHeight:new J};break}return s[e.id]=n,n}}}function WM(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let XM=0;function jM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function YM(s){const e=new GM,n=WM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new J);const a=new J,u=new Ot,f=new Ot;function h(m){let _=0,v=0,x=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let S=0,T=0,A=0,y=0,g=0,L=0,U=0,R=0,Q=0,B=0,F=0;m.sort(jM);for(let P=0,C=m.length;P<C;P++){const z=m[P],le=z.color,te=z.intensity,fe=z.distance,me=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)_+=le.r*te,v+=le.g*te,x+=le.b*te;else if(z.isLightProbe){for(let ue=0;ue<9;ue++)r.probe[ue].addScaledVector(z.sh.coefficients[ue],te);F++}else if(z.isDirectionalLight){const ue=e.get(z);if(ue.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const he=z.shadow,k=n.get(z);k.shadowIntensity=he.intensity,k.shadowBias=he.bias,k.shadowNormalBias=he.normalBias,k.shadowRadius=he.radius,k.shadowMapSize=he.mapSize,r.directionalShadow[S]=k,r.directionalShadowMap[S]=me,r.directionalShadowMatrix[S]=z.shadow.matrix,L++}r.directional[S]=ue,S++}else if(z.isSpotLight){const ue=e.get(z);ue.position.setFromMatrixPosition(z.matrixWorld),ue.color.copy(le).multiplyScalar(te),ue.distance=fe,ue.coneCos=Math.cos(z.angle),ue.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),ue.decay=z.decay,r.spot[A]=ue;const he=z.shadow;if(z.map&&(r.spotLightMap[Q]=z.map,Q++,he.updateMatrices(z),z.castShadow&&B++),r.spotLightMatrix[A]=he.matrix,z.castShadow){const k=n.get(z);k.shadowIntensity=he.intensity,k.shadowBias=he.bias,k.shadowNormalBias=he.normalBias,k.shadowRadius=he.radius,k.shadowMapSize=he.mapSize,r.spotShadow[A]=k,r.spotShadowMap[A]=me,R++}A++}else if(z.isRectAreaLight){const ue=e.get(z);ue.color.copy(le).multiplyScalar(te),ue.halfWidth.set(z.width*.5,0,0),ue.halfHeight.set(0,z.height*.5,0),r.rectArea[y]=ue,y++}else if(z.isPointLight){const ue=e.get(z);if(ue.color.copy(z.color).multiplyScalar(z.intensity),ue.distance=z.distance,ue.decay=z.decay,z.castShadow){const he=z.shadow,k=n.get(z);k.shadowIntensity=he.intensity,k.shadowBias=he.bias,k.shadowNormalBias=he.normalBias,k.shadowRadius=he.radius,k.shadowMapSize=he.mapSize,k.shadowCameraNear=he.camera.near,k.shadowCameraFar=he.camera.far,r.pointShadow[T]=k,r.pointShadowMap[T]=me,r.pointShadowMatrix[T]=z.shadow.matrix,U++}r.point[T]=ue,T++}else if(z.isHemisphereLight){const ue=e.get(z);ue.skyColor.copy(z.color).multiplyScalar(te),ue.groundColor.copy(z.groundColor).multiplyScalar(te),r.hemi[g]=ue,g++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=v,r.ambient[2]=x;const Y=r.hash;(Y.directionalLength!==S||Y.pointLength!==T||Y.spotLength!==A||Y.rectAreaLength!==y||Y.hemiLength!==g||Y.numDirectionalShadows!==L||Y.numPointShadows!==U||Y.numSpotShadows!==R||Y.numSpotMaps!==Q||Y.numLightProbes!==F)&&(r.directional.length=S,r.spot.length=A,r.rectArea.length=y,r.point.length=T,r.hemi.length=g,r.directionalShadow.length=L,r.directionalShadowMap.length=L,r.pointShadow.length=U,r.pointShadowMap.length=U,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=L,r.pointShadowMatrix.length=U,r.spotLightMatrix.length=R+Q-B,r.spotLightMap.length=Q,r.numSpotLightShadowsWithMaps=B,r.numLightProbes=F,Y.directionalLength=S,Y.pointLength=T,Y.spotLength=A,Y.rectAreaLength=y,Y.hemiLength=g,Y.numDirectionalShadows=L,Y.numPointShadows=U,Y.numSpotShadows=R,Y.numSpotMaps=Q,Y.numLightProbes=F,r.version=XM++)}function p(m,_){let v=0,x=0,S=0,T=0,A=0;const y=_.matrixWorldInverse;for(let g=0,L=m.length;g<L;g++){const U=m[g];if(U.isDirectionalLight){const R=r.directional[v];R.direction.setFromMatrixPosition(U.matrixWorld),a.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(y),v++}else if(U.isSpotLight){const R=r.spot[S];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(y),R.direction.setFromMatrixPosition(U.matrixWorld),a.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(y),S++}else if(U.isRectAreaLight){const R=r.rectArea[T];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(y),f.identity(),u.copy(U.matrixWorld),u.premultiply(y),f.extractRotation(u),R.halfWidth.set(U.width*.5,0,0),R.halfHeight.set(0,U.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),T++}else if(U.isPointLight){const R=r.point[x];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(y),x++}else if(U.isHemisphereLight){const R=r.hemi[A];R.direction.setFromMatrixPosition(U.matrixWorld),R.direction.transformDirection(y),A++}}}return{setup:h,setupView:p,state:r}}function Dm(s){const e=new YM(s),n=[],r=[];function a(_){m.camera=_,n.length=0,r.length=0}function u(_){n.push(_)}function f(_){r.push(_)}function h(){e.setup(n)}function p(_){e.setupView(n,_)}const m={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:h,setupLightsView:p,pushLight:u,pushShadow:f}}function qM(s){let e=new WeakMap;function n(a,u=0){const f=e.get(a);let h;return f===void 0?(h=new Dm(s),e.set(a,[h])):u>=f.length?(h=new Dm(s),f.push(h)):h=f[u],h}function r(){e=new WeakMap}return{get:n,dispose:r}}class KM extends $o{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Wv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $M extends $o{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ZM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QM=`uniform sampler2D shadow_pass;
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
}`;function JM(s,e,n){let r=new eh;const a=new dt,u=new dt,f=new Vt,h=new KM({depthPacking:Xv}),p=new $M,m={},_=n.maxTextureSize,v={[Mr]:In,[In]:Mr,[Bi]:Bi},x=new Er({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:ZM,fragmentShader:QM}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const T=new ns;T.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Qn(T,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wm;let g=this.type;this.render=function(B,F,Y){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||B.length===0)return;const P=s.getRenderTarget(),C=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),le=s.state;le.setBlending(yr),le.buffers.color.setClear(1,1,1,1),le.buffers.depth.setTest(!0),le.setScissorTest(!1);const te=g!==zi&&this.type===zi,fe=g===zi&&this.type!==zi;for(let me=0,ue=B.length;me<ue;me++){const he=B[me],k=he.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;a.copy(k.mapSize);const ce=k.getFrameExtents();if(a.multiply(ce),u.copy(k.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(u.x=Math.floor(_/ce.x),a.x=u.x*ce.x,k.mapSize.x=u.x),a.y>_&&(u.y=Math.floor(_/ce.y),a.y=u.y*ce.y,k.mapSize.y=u.y)),k.map===null||te===!0||fe===!0){const N=this.type!==zi?{minFilter:Bn,magFilter:Bn}:{};k.map!==null&&k.map.dispose(),k.map=new Zr(a.x,a.y,N),k.map.texture.name=he.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const oe=k.getViewportCount();for(let N=0;N<oe;N++){const re=k.getViewport(N);f.set(u.x*re.x,u.y*re.y,u.x*re.z,u.y*re.w),le.viewport(f),k.updateMatrices(he,N),r=k.getFrustum(),R(F,Y,k.camera,he,this.type)}k.isPointLightShadow!==!0&&this.type===zi&&L(k,Y),k.needsUpdate=!1}g=this.type,y.needsUpdate=!1,s.setRenderTarget(P,C,z)};function L(B,F){const Y=e.update(A);x.defines.VSM_SAMPLES!==B.blurSamples&&(x.defines.VSM_SAMPLES=B.blurSamples,S.defines.VSM_SAMPLES=B.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new Zr(a.x,a.y)),x.uniforms.shadow_pass.value=B.map.texture,x.uniforms.resolution.value=B.mapSize,x.uniforms.radius.value=B.radius,s.setRenderTarget(B.mapPass),s.clear(),s.renderBufferDirect(F,null,Y,x,A,null),S.uniforms.shadow_pass.value=B.mapPass.texture,S.uniforms.resolution.value=B.mapSize,S.uniforms.radius.value=B.radius,s.setRenderTarget(B.map),s.clear(),s.renderBufferDirect(F,null,Y,S,A,null)}function U(B,F,Y,P){let C=null;const z=Y.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(z!==void 0)C=z;else if(C=Y.isPointLight===!0?p:h,s.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0){const le=C.uuid,te=F.uuid;let fe=m[le];fe===void 0&&(fe={},m[le]=fe);let me=fe[te];me===void 0&&(me=C.clone(),fe[te]=me,F.addEventListener("dispose",Q)),C=me}if(C.visible=F.visible,C.wireframe=F.wireframe,P===zi?C.side=F.shadowSide!==null?F.shadowSide:F.side:C.side=F.shadowSide!==null?F.shadowSide:v[F.side],C.alphaMap=F.alphaMap,C.alphaTest=F.alphaTest,C.map=F.map,C.clipShadows=F.clipShadows,C.clippingPlanes=F.clippingPlanes,C.clipIntersection=F.clipIntersection,C.displacementMap=F.displacementMap,C.displacementScale=F.displacementScale,C.displacementBias=F.displacementBias,C.wireframeLinewidth=F.wireframeLinewidth,C.linewidth=F.linewidth,Y.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const le=s.properties.get(C);le.light=Y}return C}function R(B,F,Y,P,C){if(B.visible===!1)return;if(B.layers.test(F.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&C===zi)&&(!B.frustumCulled||r.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,B.matrixWorld);const te=e.update(B),fe=B.material;if(Array.isArray(fe)){const me=te.groups;for(let ue=0,he=me.length;ue<he;ue++){const k=me[ue],ce=fe[k.materialIndex];if(ce&&ce.visible){const oe=U(B,ce,P,C);B.onBeforeShadow(s,B,F,Y,te,oe,k),s.renderBufferDirect(Y,null,te,oe,B,k),B.onAfterShadow(s,B,F,Y,te,oe,k)}}}else if(fe.visible){const me=U(B,fe,P,C);B.onBeforeShadow(s,B,F,Y,te,me,null),s.renderBufferDirect(Y,null,te,me,B,null),B.onAfterShadow(s,B,F,Y,te,me,null)}}const le=B.children;for(let te=0,fe=le.length;te<fe;te++)R(le[te],F,Y,P,C)}function Q(B){B.target.removeEventListener("dispose",Q);for(const Y in m){const P=m[Y],C=B.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}const eE={[rf]:sf,[of]:uf,[af]:cf,[qs]:lf,[sf]:rf,[uf]:of,[cf]:af,[lf]:qs};function tE(s,e){function n(){let G=!1;const Le=new Vt;let ae=null;const pe=new Vt(0,0,0,0);return{setMask:function(Ne){ae!==Ne&&!G&&(s.colorMask(Ne,Ne,Ne,Ne),ae=Ne)},setLocked:function(Ne){G=Ne},setClear:function(Ne,Ue,ot,It,jt){jt===!0&&(Ne*=It,Ue*=It,ot*=It),Le.set(Ne,Ue,ot,It),pe.equals(Le)===!1&&(s.clearColor(Ne,Ue,ot,It),pe.copy(Le))},reset:function(){G=!1,ae=null,pe.set(-1,0,0,0)}}}function r(){let G=!1,Le=!1,ae=null,pe=null,Ne=null;return{setReversed:function(Ue){if(Le!==Ue){const ot=e.get("EXT_clip_control");Le?ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.ZERO_TO_ONE_EXT):ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.NEGATIVE_ONE_TO_ONE_EXT);const It=Ne;Ne=null,this.setClear(It)}Le=Ue},getReversed:function(){return Le},setTest:function(Ue){Ue?xe(s.DEPTH_TEST):Re(s.DEPTH_TEST)},setMask:function(Ue){ae!==Ue&&!G&&(s.depthMask(Ue),ae=Ue)},setFunc:function(Ue){if(Le&&(Ue=eE[Ue]),pe!==Ue){switch(Ue){case rf:s.depthFunc(s.NEVER);break;case sf:s.depthFunc(s.ALWAYS);break;case of:s.depthFunc(s.LESS);break;case qs:s.depthFunc(s.LEQUAL);break;case af:s.depthFunc(s.EQUAL);break;case lf:s.depthFunc(s.GEQUAL);break;case uf:s.depthFunc(s.GREATER);break;case cf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pe=Ue}},setLocked:function(Ue){G=Ue},setClear:function(Ue){Ne!==Ue&&(Le&&(Ue=1-Ue),s.clearDepth(Ue),Ne=Ue)},reset:function(){G=!1,ae=null,pe=null,Ne=null,Le=!1}}}function a(){let G=!1,Le=null,ae=null,pe=null,Ne=null,Ue=null,ot=null,It=null,jt=null;return{setTest:function(xt){G||(xt?xe(s.STENCIL_TEST):Re(s.STENCIL_TEST))},setMask:function(xt){Le!==xt&&!G&&(s.stencilMask(xt),Le=xt)},setFunc:function(xt,En,gn){(ae!==xt||pe!==En||Ne!==gn)&&(s.stencilFunc(xt,En,gn),ae=xt,pe=En,Ne=gn)},setOp:function(xt,En,gn){(Ue!==xt||ot!==En||It!==gn)&&(s.stencilOp(xt,En,gn),Ue=xt,ot=En,It=gn)},setLocked:function(xt){G=xt},setClear:function(xt){jt!==xt&&(s.clearStencil(xt),jt=xt)},reset:function(){G=!1,Le=null,ae=null,pe=null,Ne=null,Ue=null,ot=null,It=null,jt=null}}}const u=new n,f=new r,h=new a,p=new WeakMap,m=new WeakMap;let _={},v={},x=new WeakMap,S=[],T=null,A=!1,y=null,g=null,L=null,U=null,R=null,Q=null,B=null,F=new et(0,0,0),Y=0,P=!1,C=null,z=null,le=null,te=null,fe=null;const me=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ue=!1,he=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(k)[1]),ue=he>=1):k.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),ue=he>=2);let ce=null,oe={};const N=s.getParameter(s.SCISSOR_BOX),re=s.getParameter(s.VIEWPORT),Fe=new Vt().fromArray(N),Z=new Vt().fromArray(re);function de(G,Le,ae,pe){const Ne=new Uint8Array(4),Ue=s.createTexture();s.bindTexture(G,Ue),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ot=0;ot<ae;ot++)G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY?s.texImage3D(Le,0,s.RGBA,1,1,pe,0,s.RGBA,s.UNSIGNED_BYTE,Ne):s.texImage2D(Le+ot,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ne);return Ue}const Se={};Se[s.TEXTURE_2D]=de(s.TEXTURE_2D,s.TEXTURE_2D,1),Se[s.TEXTURE_CUBE_MAP]=de(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[s.TEXTURE_2D_ARRAY]=de(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Se[s.TEXTURE_3D]=de(s.TEXTURE_3D,s.TEXTURE_3D,1,1),u.setClear(0,0,0,1),f.setClear(1),h.setClear(0),xe(s.DEPTH_TEST),f.setFunc(qs),lt(!1),ft(Fp),xe(s.CULL_FACE),W(yr);function xe(G){_[G]!==!0&&(s.enable(G),_[G]=!0)}function Re(G){_[G]!==!1&&(s.disable(G),_[G]=!1)}function ke(G,Le){return v[G]!==Le?(s.bindFramebuffer(G,Le),v[G]=Le,G===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=Le),G===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=Le),!0):!1}function Ke(G,Le){let ae=S,pe=!1;if(G){ae=x.get(Le),ae===void 0&&(ae=[],x.set(Le,ae));const Ne=G.textures;if(ae.length!==Ne.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Ue=0,ot=Ne.length;Ue<ot;Ue++)ae[Ue]=s.COLOR_ATTACHMENT0+Ue;ae.length=Ne.length,pe=!0}}else ae[0]!==s.BACK&&(ae[0]=s.BACK,pe=!0);pe&&s.drawBuffers(ae)}function At(G){return T!==G?(s.useProgram(G),T=G,!0):!1}const at={[Xr]:s.FUNC_ADD,[_v]:s.FUNC_SUBTRACT,[vv]:s.FUNC_REVERSE_SUBTRACT};at[xv]=s.MIN,at[yv]=s.MAX;const Rt={[Sv]:s.ZERO,[Mv]:s.ONE,[Ev]:s.SRC_COLOR,[tf]:s.SRC_ALPHA,[Pv]:s.SRC_ALPHA_SATURATE,[Cv]:s.DST_COLOR,[wv]:s.DST_ALPHA,[Tv]:s.ONE_MINUS_SRC_COLOR,[nf]:s.ONE_MINUS_SRC_ALPHA,[Rv]:s.ONE_MINUS_DST_COLOR,[Av]:s.ONE_MINUS_DST_ALPHA,[bv]:s.CONSTANT_COLOR,[Lv]:s.ONE_MINUS_CONSTANT_COLOR,[Dv]:s.CONSTANT_ALPHA,[Iv]:s.ONE_MINUS_CONSTANT_ALPHA};function W(G,Le,ae,pe,Ne,Ue,ot,It,jt,xt){if(G===yr){A===!0&&(Re(s.BLEND),A=!1);return}if(A===!1&&(xe(s.BLEND),A=!0),G!==gv){if(G!==y||xt!==P){if((g!==Xr||R!==Xr)&&(s.blendEquation(s.FUNC_ADD),g=Xr,R=Xr),xt)switch(G){case Xs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Op:s.blendFunc(s.ONE,s.ONE);break;case kp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case zp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Xs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Op:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case kp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case zp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}L=null,U=null,Q=null,B=null,F.set(0,0,0),Y=0,y=G,P=xt}return}Ne=Ne||Le,Ue=Ue||ae,ot=ot||pe,(Le!==g||Ne!==R)&&(s.blendEquationSeparate(at[Le],at[Ne]),g=Le,R=Ne),(ae!==L||pe!==U||Ue!==Q||ot!==B)&&(s.blendFuncSeparate(Rt[ae],Rt[pe],Rt[Ue],Rt[ot]),L=ae,U=pe,Q=Ue,B=ot),(It.equals(F)===!1||jt!==Y)&&(s.blendColor(It.r,It.g,It.b,jt),F.copy(It),Y=jt),y=G,P=!1}function sn(G,Le){G.side===Bi?Re(s.CULL_FACE):xe(s.CULL_FACE);let ae=G.side===In;Le&&(ae=!ae),lt(ae),G.blending===Xs&&G.transparent===!1?W(yr):W(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),f.setFunc(G.depthFunc),f.setTest(G.depthTest),f.setMask(G.depthWrite),u.setMask(G.colorWrite);const pe=G.stencilWrite;h.setTest(pe),pe&&(h.setMask(G.stencilWriteMask),h.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),h.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Mt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?xe(s.SAMPLE_ALPHA_TO_COVERAGE):Re(s.SAMPLE_ALPHA_TO_COVERAGE)}function lt(G){C!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),C=G)}function ft(G){G!==pv?(xe(s.CULL_FACE),G!==z&&(G===Fp?s.cullFace(s.BACK):G===mv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Re(s.CULL_FACE),z=G}function $e(G){G!==le&&(ue&&s.lineWidth(G),le=G)}function Mt(G,Le,ae){G?(xe(s.POLYGON_OFFSET_FILL),(te!==Le||fe!==ae)&&(s.polygonOffset(Le,ae),te=Le,fe=ae)):Re(s.POLYGON_OFFSET_FILL)}function We(G){G?xe(s.SCISSOR_TEST):Re(s.SCISSOR_TEST)}function b(G){G===void 0&&(G=s.TEXTURE0+me-1),ce!==G&&(s.activeTexture(G),ce=G)}function E(G,Le,ae){ae===void 0&&(ce===null?ae=s.TEXTURE0+me-1:ae=ce);let pe=oe[ae];pe===void 0&&(pe={type:void 0,texture:void 0},oe[ae]=pe),(pe.type!==G||pe.texture!==Le)&&(ce!==ae&&(s.activeTexture(ae),ce=ae),s.bindTexture(G,Le||Se[G]),pe.type=G,pe.texture=Le)}function D(){const G=oe[ce];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function V(){try{s.compressedTexImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function se(){try{s.compressedTexImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function K(){try{s.texSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Te(){try{s.texSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ye(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ce(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Je(){try{s.texStorage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function _e(){try{s.texStorage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function be(){try{s.texImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ie(){try{s.texImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ze(G){Fe.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),Fe.copy(G))}function Pe(G){Z.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),Z.copy(G))}function ut(G,Le){let ae=m.get(Le);ae===void 0&&(ae=new WeakMap,m.set(Le,ae));let pe=ae.get(G);pe===void 0&&(pe=s.getUniformBlockIndex(Le,G.name),ae.set(G,pe))}function tt(G,Le){const pe=m.get(Le).get(G);p.get(Le)!==pe&&(s.uniformBlockBinding(Le,pe,G.__bindingPointIndex),p.set(Le,pe))}function vt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),f.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),_={},ce=null,oe={},v={},x=new WeakMap,S=[],T=null,A=!1,y=null,g=null,L=null,U=null,R=null,Q=null,B=null,F=new et(0,0,0),Y=0,P=!1,C=null,z=null,le=null,te=null,fe=null,Fe.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),u.reset(),f.reset(),h.reset()}return{buffers:{color:u,depth:f,stencil:h},enable:xe,disable:Re,bindFramebuffer:ke,drawBuffers:Ke,useProgram:At,setBlending:W,setMaterial:sn,setFlipSided:lt,setCullFace:ft,setLineWidth:$e,setPolygonOffset:Mt,setScissorTest:We,activeTexture:b,bindTexture:E,unbindTexture:D,compressedTexImage2D:V,compressedTexImage3D:se,texImage2D:be,texImage3D:Ie,updateUBOMapping:ut,uniformBlockBinding:tt,texStorage2D:Je,texStorage3D:_e,texSubImage2D:K,texSubImage3D:Te,compressedTexSubImage2D:ye,compressedTexSubImage3D:Ce,scissor:ze,viewport:Pe,reset:vt}}function Im(s,e,n,r){const a=nE(r);switch(n){case $m:return s*e;case Qm:return s*e;case Jm:return s*e*2;case $f:return s*e/a.components*a.byteLength;case Zf:return s*e/a.components*a.byteLength;case eg:return s*e*2/a.components*a.byteLength;case Qf:return s*e*2/a.components*a.byteLength;case Zm:return s*e*3/a.components*a.byteLength;case fi:return s*e*4/a.components*a.byteLength;case Jf:return s*e*4/a.components*a.byteLength;case Rl:case Pl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case bl:case Ll:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gf:case vf:return Math.max(s,16)*Math.max(e,8)/4;case mf:case _f:return Math.max(s,8)*Math.max(e,8)/2;case xf:case yf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Mf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ef:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Tf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case wf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Af:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Cf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rf:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Pf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case bf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Lf:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Df:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case If:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Uf:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Nf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Dl:case Ff:case Of:return Math.ceil(s/4)*Math.ceil(e/4)*16;case tg:case kf:return Math.ceil(s/4)*Math.ceil(e/4)*8;case zf:case Bf:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function nE(s){switch(s){case Gi:case Ym:return{byteLength:1,components:1};case jo:case qm:case Yo:return{byteLength:2,components:1};case qf:case Kf:return{byteLength:2,components:4};case $r:case Yf:case Si:return{byteLength:4,components:1};case Km:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function iE(s,e,n,r,a,u,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new dt,_=new WeakMap;let v;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(b,E){return S?new OffscreenCanvas(b,E):Fl("canvas")}function A(b,E,D){let V=1;const se=We(b);if((se.width>D||se.height>D)&&(V=D/Math.max(se.width,se.height)),V<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const K=Math.floor(V*se.width),Te=Math.floor(V*se.height);v===void 0&&(v=T(K,Te));const ye=E?T(K,Te):v;return ye.width=K,ye.height=Te,ye.getContext("2d").drawImage(b,0,0,K,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+K+"x"+Te+")."),ye}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function y(b){return b.generateMipmaps}function g(b){s.generateMipmap(b)}function L(b){return b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?s.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function U(b,E,D,V,se=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let K=E;if(E===s.RED&&(D===s.FLOAT&&(K=s.R32F),D===s.HALF_FLOAT&&(K=s.R16F),D===s.UNSIGNED_BYTE&&(K=s.R8)),E===s.RED_INTEGER&&(D===s.UNSIGNED_BYTE&&(K=s.R8UI),D===s.UNSIGNED_SHORT&&(K=s.R16UI),D===s.UNSIGNED_INT&&(K=s.R32UI),D===s.BYTE&&(K=s.R8I),D===s.SHORT&&(K=s.R16I),D===s.INT&&(K=s.R32I)),E===s.RG&&(D===s.FLOAT&&(K=s.RG32F),D===s.HALF_FLOAT&&(K=s.RG16F),D===s.UNSIGNED_BYTE&&(K=s.RG8)),E===s.RG_INTEGER&&(D===s.UNSIGNED_BYTE&&(K=s.RG8UI),D===s.UNSIGNED_SHORT&&(K=s.RG16UI),D===s.UNSIGNED_INT&&(K=s.RG32UI),D===s.BYTE&&(K=s.RG8I),D===s.SHORT&&(K=s.RG16I),D===s.INT&&(K=s.RG32I)),E===s.RGB_INTEGER&&(D===s.UNSIGNED_BYTE&&(K=s.RGB8UI),D===s.UNSIGNED_SHORT&&(K=s.RGB16UI),D===s.UNSIGNED_INT&&(K=s.RGB32UI),D===s.BYTE&&(K=s.RGB8I),D===s.SHORT&&(K=s.RGB16I),D===s.INT&&(K=s.RGB32I)),E===s.RGBA_INTEGER&&(D===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),D===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),D===s.UNSIGNED_INT&&(K=s.RGBA32UI),D===s.BYTE&&(K=s.RGBA8I),D===s.SHORT&&(K=s.RGBA16I),D===s.INT&&(K=s.RGBA32I)),E===s.RGB&&D===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),E===s.RGBA){const Te=se?kl:St.getTransfer(V);D===s.FLOAT&&(K=s.RGBA32F),D===s.HALF_FLOAT&&(K=s.RGBA16F),D===s.UNSIGNED_BYTE&&(K=Te===Pt?s.SRGB8_ALPHA8:s.RGBA8),D===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),D===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function R(b,E){let D;return b?E===null||E===$r||E===Zs?D=s.DEPTH24_STENCIL8:E===Si?D=s.DEPTH32F_STENCIL8:E===jo&&(D=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===$r||E===Zs?D=s.DEPTH_COMPONENT24:E===Si?D=s.DEPTH_COMPONENT32F:E===jo&&(D=s.DEPTH_COMPONENT16),D}function Q(b,E){return y(b)===!0||b.isFramebufferTexture&&b.minFilter!==Bn&&b.minFilter!==yi?Math.log2(Math.max(E.width,E.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?E.mipmaps.length:1}function B(b){const E=b.target;E.removeEventListener("dispose",B),Y(E),E.isVideoTexture&&_.delete(E)}function F(b){const E=b.target;E.removeEventListener("dispose",F),C(E)}function Y(b){const E=r.get(b);if(E.__webglInit===void 0)return;const D=b.source,V=x.get(D);if(V){const se=V[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&P(b),Object.keys(V).length===0&&x.delete(D)}r.remove(b)}function P(b){const E=r.get(b);s.deleteTexture(E.__webglTexture);const D=b.source,V=x.get(D);delete V[E.__cacheKey],f.memory.textures--}function C(b){const E=r.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),r.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(E.__webglFramebuffer[V]))for(let se=0;se<E.__webglFramebuffer[V].length;se++)s.deleteFramebuffer(E.__webglFramebuffer[V][se]);else s.deleteFramebuffer(E.__webglFramebuffer[V]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[V])}else{if(Array.isArray(E.__webglFramebuffer))for(let V=0;V<E.__webglFramebuffer.length;V++)s.deleteFramebuffer(E.__webglFramebuffer[V]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let V=0;V<E.__webglColorRenderbuffer.length;V++)E.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[V]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const D=b.textures;for(let V=0,se=D.length;V<se;V++){const K=r.get(D[V]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),f.memory.textures--),r.remove(D[V])}r.remove(b)}let z=0;function le(){z=0}function te(){const b=z;return b>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),z+=1,b}function fe(b){const E=[];return E.push(b.wrapS),E.push(b.wrapT),E.push(b.wrapR||0),E.push(b.magFilter),E.push(b.minFilter),E.push(b.anisotropy),E.push(b.internalFormat),E.push(b.format),E.push(b.type),E.push(b.generateMipmaps),E.push(b.premultiplyAlpha),E.push(b.flipY),E.push(b.unpackAlignment),E.push(b.colorSpace),E.join()}function me(b,E){const D=r.get(b);if(b.isVideoTexture&&$e(b),b.isRenderTargetTexture===!1&&b.version>0&&D.__version!==b.version){const V=b.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(D,b,E);return}}n.bindTexture(s.TEXTURE_2D,D.__webglTexture,s.TEXTURE0+E)}function ue(b,E){const D=r.get(b);if(b.version>0&&D.__version!==b.version){Z(D,b,E);return}n.bindTexture(s.TEXTURE_2D_ARRAY,D.__webglTexture,s.TEXTURE0+E)}function he(b,E){const D=r.get(b);if(b.version>0&&D.__version!==b.version){Z(D,b,E);return}n.bindTexture(s.TEXTURE_3D,D.__webglTexture,s.TEXTURE0+E)}function k(b,E){const D=r.get(b);if(b.version>0&&D.__version!==b.version){de(D,b,E);return}n.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+E)}const ce={[df]:s.REPEAT,[Yr]:s.CLAMP_TO_EDGE,[pf]:s.MIRRORED_REPEAT},oe={[Bn]:s.NEAREST,[Gv]:s.NEAREST_MIPMAP_NEAREST,[il]:s.NEAREST_MIPMAP_LINEAR,[yi]:s.LINEAR,[Tc]:s.LINEAR_MIPMAP_NEAREST,[qr]:s.LINEAR_MIPMAP_LINEAR},N={[Yv]:s.NEVER,[Jv]:s.ALWAYS,[qv]:s.LESS,[ig]:s.LEQUAL,[Kv]:s.EQUAL,[Qv]:s.GEQUAL,[$v]:s.GREATER,[Zv]:s.NOTEQUAL};function re(b,E){if(E.type===Si&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===yi||E.magFilter===Tc||E.magFilter===il||E.magFilter===qr||E.minFilter===yi||E.minFilter===Tc||E.minFilter===il||E.minFilter===qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,ce[E.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,ce[E.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,ce[E.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,oe[E.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,oe[E.minFilter]),E.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,N[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Bn||E.minFilter!==il&&E.minFilter!==qr||E.type===Si&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");s.texParameterf(b,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,a.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function Fe(b,E){let D=!1;b.__webglInit===void 0&&(b.__webglInit=!0,E.addEventListener("dispose",B));const V=E.source;let se=x.get(V);se===void 0&&(se={},x.set(V,se));const K=fe(E);if(K!==b.__cacheKey){se[K]===void 0&&(se[K]={texture:s.createTexture(),usedTimes:0},f.memory.textures++,D=!0),se[K].usedTimes++;const Te=se[b.__cacheKey];Te!==void 0&&(se[b.__cacheKey].usedTimes--,Te.usedTimes===0&&P(E)),b.__cacheKey=K,b.__webglTexture=se[K].texture}return D}function Z(b,E,D){let V=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(V=s.TEXTURE_3D);const se=Fe(b,E),K=E.source;n.bindTexture(V,b.__webglTexture,s.TEXTURE0+D);const Te=r.get(K);if(K.version!==Te.__version||se===!0){n.activeTexture(s.TEXTURE0+D);const ye=St.getPrimaries(St.workingColorSpace),Ce=E.colorSpace===xr?null:St.getPrimaries(E.colorSpace),Je=E.colorSpace===xr||ye===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let _e=A(E.image,!1,a.maxTextureSize);_e=Mt(E,_e);const be=u.convert(E.format,E.colorSpace),Ie=u.convert(E.type);let ze=U(E.internalFormat,be,Ie,E.colorSpace,E.isVideoTexture);re(V,E);let Pe;const ut=E.mipmaps,tt=E.isVideoTexture!==!0,vt=Te.__version===void 0||se===!0,G=K.dataReady,Le=Q(E,_e);if(E.isDepthTexture)ze=R(E.format===Qs,E.type),vt&&(tt?n.texStorage2D(s.TEXTURE_2D,1,ze,_e.width,_e.height):n.texImage2D(s.TEXTURE_2D,0,ze,_e.width,_e.height,0,be,Ie,null));else if(E.isDataTexture)if(ut.length>0){tt&&vt&&n.texStorage2D(s.TEXTURE_2D,Le,ze,ut[0].width,ut[0].height);for(let ae=0,pe=ut.length;ae<pe;ae++)Pe=ut[ae],tt?G&&n.texSubImage2D(s.TEXTURE_2D,ae,0,0,Pe.width,Pe.height,be,Ie,Pe.data):n.texImage2D(s.TEXTURE_2D,ae,ze,Pe.width,Pe.height,0,be,Ie,Pe.data);E.generateMipmaps=!1}else tt?(vt&&n.texStorage2D(s.TEXTURE_2D,Le,ze,_e.width,_e.height),G&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,_e.width,_e.height,be,Ie,_e.data)):n.texImage2D(s.TEXTURE_2D,0,ze,_e.width,_e.height,0,be,Ie,_e.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){tt&&vt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Le,ze,ut[0].width,ut[0].height,_e.depth);for(let ae=0,pe=ut.length;ae<pe;ae++)if(Pe=ut[ae],E.format!==fi)if(be!==null)if(tt){if(G)if(E.layerUpdates.size>0){const Ne=Im(Pe.width,Pe.height,E.format,E.type);for(const Ue of E.layerUpdates){const ot=Pe.data.subarray(Ue*Ne/Pe.data.BYTES_PER_ELEMENT,(Ue+1)*Ne/Pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,Ue,Pe.width,Pe.height,1,be,ot)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Pe.width,Pe.height,_e.depth,be,Pe.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ae,ze,Pe.width,Pe.height,_e.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else tt?G&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Pe.width,Pe.height,_e.depth,be,Ie,Pe.data):n.texImage3D(s.TEXTURE_2D_ARRAY,ae,ze,Pe.width,Pe.height,_e.depth,0,be,Ie,Pe.data)}else{tt&&vt&&n.texStorage2D(s.TEXTURE_2D,Le,ze,ut[0].width,ut[0].height);for(let ae=0,pe=ut.length;ae<pe;ae++)Pe=ut[ae],E.format!==fi?be!==null?tt?G&&n.compressedTexSubImage2D(s.TEXTURE_2D,ae,0,0,Pe.width,Pe.height,be,Pe.data):n.compressedTexImage2D(s.TEXTURE_2D,ae,ze,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?G&&n.texSubImage2D(s.TEXTURE_2D,ae,0,0,Pe.width,Pe.height,be,Ie,Pe.data):n.texImage2D(s.TEXTURE_2D,ae,ze,Pe.width,Pe.height,0,be,Ie,Pe.data)}else if(E.isDataArrayTexture)if(tt){if(vt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Le,ze,_e.width,_e.height,_e.depth),G)if(E.layerUpdates.size>0){const ae=Im(_e.width,_e.height,E.format,E.type);for(const pe of E.layerUpdates){const Ne=_e.data.subarray(pe*ae/_e.data.BYTES_PER_ELEMENT,(pe+1)*ae/_e.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,pe,_e.width,_e.height,1,be,Ie,Ne)}E.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,be,Ie,_e.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,ze,_e.width,_e.height,_e.depth,0,be,Ie,_e.data);else if(E.isData3DTexture)tt?(vt&&n.texStorage3D(s.TEXTURE_3D,Le,ze,_e.width,_e.height,_e.depth),G&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,be,Ie,_e.data)):n.texImage3D(s.TEXTURE_3D,0,ze,_e.width,_e.height,_e.depth,0,be,Ie,_e.data);else if(E.isFramebufferTexture){if(vt)if(tt)n.texStorage2D(s.TEXTURE_2D,Le,ze,_e.width,_e.height);else{let ae=_e.width,pe=_e.height;for(let Ne=0;Ne<Le;Ne++)n.texImage2D(s.TEXTURE_2D,Ne,ze,ae,pe,0,be,Ie,null),ae>>=1,pe>>=1}}else if(ut.length>0){if(tt&&vt){const ae=We(ut[0]);n.texStorage2D(s.TEXTURE_2D,Le,ze,ae.width,ae.height)}for(let ae=0,pe=ut.length;ae<pe;ae++)Pe=ut[ae],tt?G&&n.texSubImage2D(s.TEXTURE_2D,ae,0,0,be,Ie,Pe):n.texImage2D(s.TEXTURE_2D,ae,ze,be,Ie,Pe);E.generateMipmaps=!1}else if(tt){if(vt){const ae=We(_e);n.texStorage2D(s.TEXTURE_2D,Le,ze,ae.width,ae.height)}G&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,be,Ie,_e)}else n.texImage2D(s.TEXTURE_2D,0,ze,be,Ie,_e);y(E)&&g(V),Te.__version=K.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function de(b,E,D){if(E.image.length!==6)return;const V=Fe(b,E),se=E.source;n.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+D);const K=r.get(se);if(se.version!==K.__version||V===!0){n.activeTexture(s.TEXTURE0+D);const Te=St.getPrimaries(St.workingColorSpace),ye=E.colorSpace===xr?null:St.getPrimaries(E.colorSpace),Ce=E.colorSpace===xr||Te===ye?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Je=E.isCompressedTexture||E.image[0].isCompressedTexture,_e=E.image[0]&&E.image[0].isDataTexture,be=[];for(let pe=0;pe<6;pe++)!Je&&!_e?be[pe]=A(E.image[pe],!0,a.maxCubemapSize):be[pe]=_e?E.image[pe].image:E.image[pe],be[pe]=Mt(E,be[pe]);const Ie=be[0],ze=u.convert(E.format,E.colorSpace),Pe=u.convert(E.type),ut=U(E.internalFormat,ze,Pe,E.colorSpace),tt=E.isVideoTexture!==!0,vt=K.__version===void 0||V===!0,G=se.dataReady;let Le=Q(E,Ie);re(s.TEXTURE_CUBE_MAP,E);let ae;if(Je){tt&&vt&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Le,ut,Ie.width,Ie.height);for(let pe=0;pe<6;pe++){ae=be[pe].mipmaps;for(let Ne=0;Ne<ae.length;Ne++){const Ue=ae[Ne];E.format!==fi?ze!==null?tt?G&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne,0,0,Ue.width,Ue.height,ze,Ue.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne,ut,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):tt?G&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne,0,0,Ue.width,Ue.height,ze,Pe,Ue.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne,ut,Ue.width,Ue.height,0,ze,Pe,Ue.data)}}}else{if(ae=E.mipmaps,tt&&vt){ae.length>0&&Le++;const pe=We(be[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Le,ut,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(_e){tt?G&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,be[pe].width,be[pe].height,ze,Pe,be[pe].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ut,be[pe].width,be[pe].height,0,ze,Pe,be[pe].data);for(let Ne=0;Ne<ae.length;Ne++){const ot=ae[Ne].image[pe].image;tt?G&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne+1,0,0,ot.width,ot.height,ze,Pe,ot.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne+1,ut,ot.width,ot.height,0,ze,Pe,ot.data)}}else{tt?G&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ze,Pe,be[pe]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ut,ze,Pe,be[pe]);for(let Ne=0;Ne<ae.length;Ne++){const Ue=ae[Ne];tt?G&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne+1,0,0,ze,Pe,Ue.image[pe]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne+1,ut,ze,Pe,Ue.image[pe])}}}y(E)&&g(s.TEXTURE_CUBE_MAP),K.__version=se.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function Se(b,E,D,V,se,K){const Te=u.convert(D.format,D.colorSpace),ye=u.convert(D.type),Ce=U(D.internalFormat,Te,ye,D.colorSpace),Je=r.get(E),_e=r.get(D);if(_e.__renderTarget=E,!Je.__hasExternalTextures){const be=Math.max(1,E.width>>K),Ie=Math.max(1,E.height>>K);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?n.texImage3D(se,K,Ce,be,Ie,E.depth,0,Te,ye,null):n.texImage2D(se,K,Ce,be,Ie,0,Te,ye,null)}n.bindFramebuffer(s.FRAMEBUFFER,b),ft(E)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,se,_e.__webglTexture,0,lt(E)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,se,_e.__webglTexture,K),n.bindFramebuffer(s.FRAMEBUFFER,null)}function xe(b,E,D){if(s.bindRenderbuffer(s.RENDERBUFFER,b),E.depthBuffer){const V=E.depthTexture,se=V&&V.isDepthTexture?V.type:null,K=R(E.stencilBuffer,se),Te=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=lt(E);ft(E)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ye,K,E.width,E.height):D?s.renderbufferStorageMultisample(s.RENDERBUFFER,ye,K,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,K,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Te,s.RENDERBUFFER,b)}else{const V=E.textures;for(let se=0;se<V.length;se++){const K=V[se],Te=u.convert(K.format,K.colorSpace),ye=u.convert(K.type),Ce=U(K.internalFormat,Te,ye,K.colorSpace),Je=lt(E);D&&ft(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Je,Ce,E.width,E.height):ft(E)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Je,Ce,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ce,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Re(b,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,b),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=r.get(E.depthTexture);V.__renderTarget=E,(!V.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),me(E.depthTexture,0);const se=V.__webglTexture,K=lt(E);if(E.depthTexture.format===js)ft(E)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(E.depthTexture.format===Qs)ft(E)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function ke(b){const E=r.get(b),D=b.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==b.depthTexture){const V=b.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),V){const se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,V.removeEventListener("dispose",se)};V.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=V}if(b.depthTexture&&!E.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");Re(E.__webglFramebuffer,b)}else if(D){E.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[V]),E.__webglDepthbuffer[V]===void 0)E.__webglDepthbuffer[V]=s.createRenderbuffer(),xe(E.__webglDepthbuffer[V],b,!1);else{const se=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,K)}}else if(n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),xe(E.__webglDepthbuffer,b,!1);else{const V=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,V,s.RENDERBUFFER,se)}n.bindFramebuffer(s.FRAMEBUFFER,null)}function Ke(b,E,D){const V=r.get(b);E!==void 0&&Se(V.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),D!==void 0&&ke(b)}function At(b){const E=b.texture,D=r.get(b),V=r.get(E);b.addEventListener("dispose",F);const se=b.textures,K=b.isWebGLCubeRenderTarget===!0,Te=se.length>1;if(Te||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=E.version,f.memory.textures++),K){D.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(E.mipmaps&&E.mipmaps.length>0){D.__webglFramebuffer[ye]=[];for(let Ce=0;Ce<E.mipmaps.length;Ce++)D.__webglFramebuffer[ye][Ce]=s.createFramebuffer()}else D.__webglFramebuffer[ye]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){D.__webglFramebuffer=[];for(let ye=0;ye<E.mipmaps.length;ye++)D.__webglFramebuffer[ye]=s.createFramebuffer()}else D.__webglFramebuffer=s.createFramebuffer();if(Te)for(let ye=0,Ce=se.length;ye<Ce;ye++){const Je=r.get(se[ye]);Je.__webglTexture===void 0&&(Je.__webglTexture=s.createTexture(),f.memory.textures++)}if(b.samples>0&&ft(b)===!1){D.__webglMultisampledFramebuffer=s.createFramebuffer(),D.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ye=0;ye<se.length;ye++){const Ce=se[ye];D.__webglColorRenderbuffer[ye]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,D.__webglColorRenderbuffer[ye]);const Je=u.convert(Ce.format,Ce.colorSpace),_e=u.convert(Ce.type),be=U(Ce.internalFormat,Je,_e,Ce.colorSpace,b.isXRRenderTarget===!0),Ie=lt(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie,be,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.RENDERBUFFER,D.__webglColorRenderbuffer[ye])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(D.__webglDepthRenderbuffer=s.createRenderbuffer(),xe(D.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){n.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),re(s.TEXTURE_CUBE_MAP,E);for(let ye=0;ye<6;ye++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ce=0;Ce<E.mipmaps.length;Ce++)Se(D.__webglFramebuffer[ye][Ce],b,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Ce);else Se(D.__webglFramebuffer[ye],b,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);y(E)&&g(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Te){for(let ye=0,Ce=se.length;ye<Ce;ye++){const Je=se[ye],_e=r.get(Je);n.bindTexture(s.TEXTURE_2D,_e.__webglTexture),re(s.TEXTURE_2D,Je),Se(D.__webglFramebuffer,b,Je,s.COLOR_ATTACHMENT0+ye,s.TEXTURE_2D,0),y(Je)&&g(s.TEXTURE_2D)}n.unbindTexture()}else{let ye=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ye=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(ye,V.__webglTexture),re(ye,E),E.mipmaps&&E.mipmaps.length>0)for(let Ce=0;Ce<E.mipmaps.length;Ce++)Se(D.__webglFramebuffer[Ce],b,E,s.COLOR_ATTACHMENT0,ye,Ce);else Se(D.__webglFramebuffer,b,E,s.COLOR_ATTACHMENT0,ye,0);y(E)&&g(ye),n.unbindTexture()}b.depthBuffer&&ke(b)}function at(b){const E=b.textures;for(let D=0,V=E.length;D<V;D++){const se=E[D];if(y(se)){const K=L(b),Te=r.get(se).__webglTexture;n.bindTexture(K,Te),g(K),n.unbindTexture()}}}const Rt=[],W=[];function sn(b){if(b.samples>0){if(ft(b)===!1){const E=b.textures,D=b.width,V=b.height;let se=s.COLOR_BUFFER_BIT;const K=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Te=r.get(b),ye=E.length>1;if(ye)for(let Ce=0;Ce<E.length;Ce++)n.bindFramebuffer(s.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Te.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ce=0;Ce<E.length;Ce++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),ye){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Te.__webglColorRenderbuffer[Ce]);const Je=r.get(E[Ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Je,0)}s.blitFramebuffer(0,0,D,V,0,0,D,V,se,s.NEAREST),p===!0&&(Rt.length=0,W.length=0,Rt.push(s.COLOR_ATTACHMENT0+Ce),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Rt.push(K),W.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,W)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Rt))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ye)for(let Ce=0;Ce<E.length;Ce++){n.bindFramebuffer(s.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,Te.__webglColorRenderbuffer[Ce]);const Je=r.get(E[Ce]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Te.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,Je,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&p){const E=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function lt(b){return Math.min(a.maxSamples,b.samples)}function ft(b){const E=r.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function $e(b){const E=f.render.frame;_.get(b)!==E&&(_.set(b,E),b.update())}function Mt(b,E){const D=b.colorSpace,V=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||D!==to&&D!==xr&&(St.getTransfer(D)===Pt?(V!==fi||se!==Gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),E}function We(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(m.width=b.naturalWidth||b.width,m.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(m.width=b.displayWidth,m.height=b.displayHeight):(m.width=b.width,m.height=b.height),m}this.allocateTextureUnit=te,this.resetTextureUnits=le,this.setTexture2D=me,this.setTexture2DArray=ue,this.setTexture3D=he,this.setTextureCube=k,this.rebindTextures=Ke,this.setupRenderTarget=At,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=sn,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=ft}function rE(s,e){function n(r,a=xr){let u;const f=St.getTransfer(a);if(r===Gi)return s.UNSIGNED_BYTE;if(r===qf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Kf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Km)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Ym)return s.BYTE;if(r===qm)return s.SHORT;if(r===jo)return s.UNSIGNED_SHORT;if(r===Yf)return s.INT;if(r===$r)return s.UNSIGNED_INT;if(r===Si)return s.FLOAT;if(r===Yo)return s.HALF_FLOAT;if(r===$m)return s.ALPHA;if(r===Zm)return s.RGB;if(r===fi)return s.RGBA;if(r===Qm)return s.LUMINANCE;if(r===Jm)return s.LUMINANCE_ALPHA;if(r===js)return s.DEPTH_COMPONENT;if(r===Qs)return s.DEPTH_STENCIL;if(r===$f)return s.RED;if(r===Zf)return s.RED_INTEGER;if(r===eg)return s.RG;if(r===Qf)return s.RG_INTEGER;if(r===Jf)return s.RGBA_INTEGER;if(r===Rl||r===Pl||r===bl||r===Ll)if(f===Pt)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===Rl)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Pl)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===bl)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ll)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===Rl)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Pl)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===bl)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ll)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===mf||r===gf||r===_f||r===vf)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===mf)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===gf)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===_f)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===vf)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===xf||r===yf||r===Sf)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(r===xf||r===yf)return f===Pt?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===Sf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Mf||r===Ef||r===Tf||r===wf||r===Af||r===Cf||r===Rf||r===Pf||r===bf||r===Lf||r===Df||r===If||r===Uf||r===Nf)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(r===Mf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ef)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Tf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===wf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Af)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Cf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Rf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Pf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===bf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Lf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Df)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===If)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Uf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Nf)return f===Pt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Dl||r===Ff||r===Of)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(r===Dl)return f===Pt?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ff)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Of)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===tg||r===kf||r===zf||r===Bf)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(r===Dl)return u.COMPRESSED_RED_RGTC1_EXT;if(r===kf)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===zf)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Bf)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Zs?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}class sE extends Zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tl extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const oE={type:"move"};class Qc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,u=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const A of e.hand.values()){const y=n.getJointPose(A,r),g=this._getHandJoint(m,A);y!==null&&(g.matrix.fromArray(y.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=y.radius),g.visible=y!==null}const _=m.joints["index-finger-tip"],v=m.joints["thumb-tip"],x=_.position.distanceTo(v.position),S=.02,T=.005;m.inputState.pinching&&x>S+T?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-T&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(u=n.getPose(e.gripSpace,r),u!==null&&(p.matrix.fromArray(u.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,u.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(u.linearVelocity)):p.hasLinearVelocity=!1,u.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(u.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&u!==null&&(a=u),a!==null&&(h.matrix.fromArray(a.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,a.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(a.linearVelocity)):h.hasLinearVelocity=!1,a.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(a.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(oE)))}return h!==null&&(h.visible=a!==null),p!==null&&(p.visible=u!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new Tl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}const aE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lE=`
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

}`;class uE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,r){if(this.texture===null){const a=new Mn,u=e.properties.get(a);u.__webglTexture=n.texture,(n.depthNear!=r.depthNear||n.depthFar!=r.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Er({vertexShader:aE,fragmentShader:lE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Qn(new zl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cE extends es{constructor(e,n){super();const r=this;let a=null,u=1,f=null,h="local-floor",p=1,m=null,_=null,v=null,x=null,S=null,T=null;const A=new uE,y=n.getContextAttributes();let g=null,L=null;const U=[],R=[],Q=new dt;let B=null;const F=new Zn;F.viewport=new Vt;const Y=new Zn;Y.viewport=new Vt;const P=[F,Y],C=new sE;let z=null,le=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let de=U[Z];return de===void 0&&(de=new Qc,U[Z]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Z){let de=U[Z];return de===void 0&&(de=new Qc,U[Z]=de),de.getGripSpace()},this.getHand=function(Z){let de=U[Z];return de===void 0&&(de=new Qc,U[Z]=de),de.getHandSpace()};function te(Z){const de=R.indexOf(Z.inputSource);if(de===-1)return;const Se=U[de];Se!==void 0&&(Se.update(Z.inputSource,Z.frame,m||f),Se.dispatchEvent({type:Z.type,data:Z.inputSource}))}function fe(){a.removeEventListener("select",te),a.removeEventListener("selectstart",te),a.removeEventListener("selectend",te),a.removeEventListener("squeeze",te),a.removeEventListener("squeezestart",te),a.removeEventListener("squeezeend",te),a.removeEventListener("end",fe),a.removeEventListener("inputsourceschange",me);for(let Z=0;Z<U.length;Z++){const de=R[Z];de!==null&&(R[Z]=null,U[Z].disconnect(de))}z=null,le=null,A.reset(),e.setRenderTarget(g),S=null,x=null,v=null,a=null,L=null,Fe.stop(),r.isPresenting=!1,e.setPixelRatio(B),e.setSize(Q.width,Q.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){u=Z,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){h=Z,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(Z){m=Z},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return v},this.getFrame=function(){return T},this.getSession=function(){return a},this.setSession=async function(Z){if(a=Z,a!==null){if(g=e.getRenderTarget(),a.addEventListener("select",te),a.addEventListener("selectstart",te),a.addEventListener("selectend",te),a.addEventListener("squeeze",te),a.addEventListener("squeezestart",te),a.addEventListener("squeezeend",te),a.addEventListener("end",fe),a.addEventListener("inputsourceschange",me),y.xrCompatible!==!0&&await n.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(Q),a.renderState.layers===void 0){const de={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:u};S=new XRWebGLLayer(a,n,de),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),L=new Zr(S.framebufferWidth,S.framebufferHeight,{format:fi,type:Gi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let de=null,Se=null,xe=null;y.depth&&(xe=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,de=y.stencil?Qs:js,Se=y.stencil?Zs:$r);const Re={colorFormat:n.RGBA8,depthFormat:xe,scaleFactor:u};v=new XRWebGLBinding(a,n),x=v.createProjectionLayer(Re),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),L=new Zr(x.textureWidth,x.textureHeight,{format:fi,type:Gi,depthTexture:new vg(x.textureWidth,x.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await a.requestReferenceSpace(h),Fe.setContext(a),Fe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function me(Z){for(let de=0;de<Z.removed.length;de++){const Se=Z.removed[de],xe=R.indexOf(Se);xe>=0&&(R[xe]=null,U[xe].disconnect(Se))}for(let de=0;de<Z.added.length;de++){const Se=Z.added[de];let xe=R.indexOf(Se);if(xe===-1){for(let ke=0;ke<U.length;ke++)if(ke>=R.length){R.push(Se),xe=ke;break}else if(R[ke]===null){R[ke]=Se,xe=ke;break}if(xe===-1)break}const Re=U[xe];Re&&Re.connect(Se)}}const ue=new J,he=new J;function k(Z,de,Se){ue.setFromMatrixPosition(de.matrixWorld),he.setFromMatrixPosition(Se.matrixWorld);const xe=ue.distanceTo(he),Re=de.projectionMatrix.elements,ke=Se.projectionMatrix.elements,Ke=Re[14]/(Re[10]-1),At=Re[14]/(Re[10]+1),at=(Re[9]+1)/Re[5],Rt=(Re[9]-1)/Re[5],W=(Re[8]-1)/Re[0],sn=(ke[8]+1)/ke[0],lt=Ke*W,ft=Ke*sn,$e=xe/(-W+sn),Mt=$e*-W;if(de.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Mt),Z.translateZ($e),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Re[10]===-1)Z.projectionMatrix.copy(de.projectionMatrix),Z.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const We=Ke+$e,b=At+$e,E=lt-Mt,D=ft+(xe-Mt),V=at*At/b*We,se=Rt*At/b*We;Z.projectionMatrix.makePerspective(E,D,V,se,We,b),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ce(Z,de){de===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(de.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(a===null)return;let de=Z.near,Se=Z.far;A.texture!==null&&(A.depthNear>0&&(de=A.depthNear),A.depthFar>0&&(Se=A.depthFar)),C.near=Y.near=F.near=de,C.far=Y.far=F.far=Se,(z!==C.near||le!==C.far)&&(a.updateRenderState({depthNear:C.near,depthFar:C.far}),z=C.near,le=C.far),F.layers.mask=Z.layers.mask|2,Y.layers.mask=Z.layers.mask|4,C.layers.mask=F.layers.mask|Y.layers.mask;const xe=Z.parent,Re=C.cameras;ce(C,xe);for(let ke=0;ke<Re.length;ke++)ce(Re[ke],xe);Re.length===2?k(C,F,Y):C.projectionMatrix.copy(F.projectionMatrix),oe(Z,C,xe)};function oe(Z,de,Se){Se===null?Z.matrix.copy(de.matrixWorld):(Z.matrix.copy(Se.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(de.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(de.projectionMatrix),Z.projectionMatrixInverse.copy(de.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Hf*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(x===null&&S===null))return p},this.setFoveation=function(Z){p=Z,x!==null&&(x.fixedFoveation=Z),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Z)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(C)};let N=null;function re(Z,de){if(_=de.getViewerPose(m||f),T=de,_!==null){const Se=_.views;S!==null&&(e.setRenderTargetFramebuffer(L,S.framebuffer),e.setRenderTarget(L));let xe=!1;Se.length!==C.cameras.length&&(C.cameras.length=0,xe=!0);for(let ke=0;ke<Se.length;ke++){const Ke=Se[ke];let At=null;if(S!==null)At=S.getViewport(Ke);else{const Rt=v.getViewSubImage(x,Ke);At=Rt.viewport,ke===0&&(e.setRenderTargetTextures(L,Rt.colorTexture,x.ignoreDepthValues?void 0:Rt.depthStencilTexture),e.setRenderTarget(L))}let at=P[ke];at===void 0&&(at=new Zn,at.layers.enable(ke),at.viewport=new Vt,P[ke]=at),at.matrix.fromArray(Ke.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(Ke.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(At.x,At.y,At.width,At.height),ke===0&&(C.matrix.copy(at.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),xe===!0&&C.cameras.push(at)}const Re=a.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const ke=v.getDepthInformation(Se[0]);ke&&ke.isValid&&ke.texture&&A.init(e,ke,a.renderState)}}for(let Se=0;Se<U.length;Se++){const xe=R[Se],Re=U[Se];xe!==null&&Re!==void 0&&Re.update(xe,de,m||f)}N&&N(Z,de),de.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:de}),T=null}const Fe=new gg;Fe.setAnimationLoop(re),this.setAnimationLoop=function(Z){N=Z},this.dispose=function(){}}}const Gr=new Mi,fE=new Ot;function hE(s,e){function n(y,g){y.matrixAutoUpdate===!0&&y.updateMatrix(),g.value.copy(y.matrix)}function r(y,g){g.color.getRGB(y.fogColor.value,dg(s)),g.isFog?(y.fogNear.value=g.near,y.fogFar.value=g.far):g.isFogExp2&&(y.fogDensity.value=g.density)}function a(y,g,L,U,R){g.isMeshBasicMaterial||g.isMeshLambertMaterial?u(y,g):g.isMeshToonMaterial?(u(y,g),v(y,g)):g.isMeshPhongMaterial?(u(y,g),_(y,g)):g.isMeshStandardMaterial?(u(y,g),x(y,g),g.isMeshPhysicalMaterial&&S(y,g,R)):g.isMeshMatcapMaterial?(u(y,g),T(y,g)):g.isMeshDepthMaterial?u(y,g):g.isMeshDistanceMaterial?(u(y,g),A(y,g)):g.isMeshNormalMaterial?u(y,g):g.isLineBasicMaterial?(f(y,g),g.isLineDashedMaterial&&h(y,g)):g.isPointsMaterial?p(y,g,L,U):g.isSpriteMaterial?m(y,g):g.isShadowMaterial?(y.color.value.copy(g.color),y.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function u(y,g){y.opacity.value=g.opacity,g.color&&y.diffuse.value.copy(g.color),g.emissive&&y.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(y.map.value=g.map,n(g.map,y.mapTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,n(g.alphaMap,y.alphaMapTransform)),g.bumpMap&&(y.bumpMap.value=g.bumpMap,n(g.bumpMap,y.bumpMapTransform),y.bumpScale.value=g.bumpScale,g.side===In&&(y.bumpScale.value*=-1)),g.normalMap&&(y.normalMap.value=g.normalMap,n(g.normalMap,y.normalMapTransform),y.normalScale.value.copy(g.normalScale),g.side===In&&y.normalScale.value.negate()),g.displacementMap&&(y.displacementMap.value=g.displacementMap,n(g.displacementMap,y.displacementMapTransform),y.displacementScale.value=g.displacementScale,y.displacementBias.value=g.displacementBias),g.emissiveMap&&(y.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,y.emissiveMapTransform)),g.specularMap&&(y.specularMap.value=g.specularMap,n(g.specularMap,y.specularMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest);const L=e.get(g),U=L.envMap,R=L.envMapRotation;U&&(y.envMap.value=U,Gr.copy(R),Gr.x*=-1,Gr.y*=-1,Gr.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(Gr.y*=-1,Gr.z*=-1),y.envMapRotation.value.setFromMatrix4(fE.makeRotationFromEuler(Gr)),y.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=g.reflectivity,y.ior.value=g.ior,y.refractionRatio.value=g.refractionRatio),g.lightMap&&(y.lightMap.value=g.lightMap,y.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,y.lightMapTransform)),g.aoMap&&(y.aoMap.value=g.aoMap,y.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,y.aoMapTransform))}function f(y,g){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,g.map&&(y.map.value=g.map,n(g.map,y.mapTransform))}function h(y,g){y.dashSize.value=g.dashSize,y.totalSize.value=g.dashSize+g.gapSize,y.scale.value=g.scale}function p(y,g,L,U){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,y.size.value=g.size*L,y.scale.value=U*.5,g.map&&(y.map.value=g.map,n(g.map,y.uvTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,n(g.alphaMap,y.alphaMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest)}function m(y,g){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,y.rotation.value=g.rotation,g.map&&(y.map.value=g.map,n(g.map,y.mapTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,n(g.alphaMap,y.alphaMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest)}function _(y,g){y.specular.value.copy(g.specular),y.shininess.value=Math.max(g.shininess,1e-4)}function v(y,g){g.gradientMap&&(y.gradientMap.value=g.gradientMap)}function x(y,g){y.metalness.value=g.metalness,g.metalnessMap&&(y.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,y.metalnessMapTransform)),y.roughness.value=g.roughness,g.roughnessMap&&(y.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,y.roughnessMapTransform)),g.envMap&&(y.envMapIntensity.value=g.envMapIntensity)}function S(y,g,L){y.ior.value=g.ior,g.sheen>0&&(y.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),y.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(y.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,y.sheenColorMapTransform)),g.sheenRoughnessMap&&(y.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,y.sheenRoughnessMapTransform))),g.clearcoat>0&&(y.clearcoat.value=g.clearcoat,y.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(y.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,y.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(y.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===In&&y.clearcoatNormalScale.value.negate())),g.dispersion>0&&(y.dispersion.value=g.dispersion),g.iridescence>0&&(y.iridescence.value=g.iridescence,y.iridescenceIOR.value=g.iridescenceIOR,y.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(y.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,y.iridescenceMapTransform)),g.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),g.transmission>0&&(y.transmission.value=g.transmission,y.transmissionSamplerMap.value=L.texture,y.transmissionSamplerSize.value.set(L.width,L.height),g.transmissionMap&&(y.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,y.transmissionMapTransform)),y.thickness.value=g.thickness,g.thicknessMap&&(y.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=g.attenuationDistance,y.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(y.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(y.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=g.specularIntensity,y.specularColor.value.copy(g.specularColor),g.specularColorMap&&(y.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,y.specularColorMapTransform)),g.specularIntensityMap&&(y.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,y.specularIntensityMapTransform))}function T(y,g){g.matcap&&(y.matcap.value=g.matcap)}function A(y,g){const L=e.get(g).light;y.referencePosition.value.setFromMatrixPosition(L.matrixWorld),y.nearDistance.value=L.shadow.camera.near,y.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function dE(s,e,n,r){let a={},u={},f=[];const h=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function p(L,U){const R=U.program;r.uniformBlockBinding(L,R)}function m(L,U){let R=a[L.id];R===void 0&&(T(L),R=_(L),a[L.id]=R,L.addEventListener("dispose",y));const Q=U.program;r.updateUBOMapping(L,Q);const B=e.render.frame;u[L.id]!==B&&(x(L),u[L.id]=B)}function _(L){const U=v();L.__bindingPointIndex=U;const R=s.createBuffer(),Q=L.__size,B=L.usage;return s.bindBuffer(s.UNIFORM_BUFFER,R),s.bufferData(s.UNIFORM_BUFFER,Q,B),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,U,R),R}function v(){for(let L=0;L<h;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(L){const U=a[L.id],R=L.uniforms,Q=L.__cache;s.bindBuffer(s.UNIFORM_BUFFER,U);for(let B=0,F=R.length;B<F;B++){const Y=Array.isArray(R[B])?R[B]:[R[B]];for(let P=0,C=Y.length;P<C;P++){const z=Y[P];if(S(z,B,P,Q)===!0){const le=z.__offset,te=Array.isArray(z.value)?z.value:[z.value];let fe=0;for(let me=0;me<te.length;me++){const ue=te[me],he=A(ue);typeof ue=="number"||typeof ue=="boolean"?(z.__data[0]=ue,s.bufferSubData(s.UNIFORM_BUFFER,le+fe,z.__data)):ue.isMatrix3?(z.__data[0]=ue.elements[0],z.__data[1]=ue.elements[1],z.__data[2]=ue.elements[2],z.__data[3]=0,z.__data[4]=ue.elements[3],z.__data[5]=ue.elements[4],z.__data[6]=ue.elements[5],z.__data[7]=0,z.__data[8]=ue.elements[6],z.__data[9]=ue.elements[7],z.__data[10]=ue.elements[8],z.__data[11]=0):(ue.toArray(z.__data,fe),fe+=he.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,le,z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(L,U,R,Q){const B=L.value,F=U+"_"+R;if(Q[F]===void 0)return typeof B=="number"||typeof B=="boolean"?Q[F]=B:Q[F]=B.clone(),!0;{const Y=Q[F];if(typeof B=="number"||typeof B=="boolean"){if(Y!==B)return Q[F]=B,!0}else if(Y.equals(B)===!1)return Y.copy(B),!0}return!1}function T(L){const U=L.uniforms;let R=0;const Q=16;for(let F=0,Y=U.length;F<Y;F++){const P=Array.isArray(U[F])?U[F]:[U[F]];for(let C=0,z=P.length;C<z;C++){const le=P[C],te=Array.isArray(le.value)?le.value:[le.value];for(let fe=0,me=te.length;fe<me;fe++){const ue=te[fe],he=A(ue),k=R%Q,ce=k%he.boundary,oe=k+ce;R+=ce,oe!==0&&Q-oe<he.storage&&(R+=Q-oe),le.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),le.__offset=R,R+=he.storage}}}const B=R%Q;return B>0&&(R+=Q-B),L.__size=R,L.__cache={},this}function A(L){const U={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(U.boundary=4,U.storage=4):L.isVector2?(U.boundary=8,U.storage=8):L.isVector3||L.isColor?(U.boundary=16,U.storage=12):L.isVector4?(U.boundary=16,U.storage=16):L.isMatrix3?(U.boundary=48,U.storage=48):L.isMatrix4?(U.boundary=64,U.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),U}function y(L){const U=L.target;U.removeEventListener("dispose",y);const R=f.indexOf(U.__bindingPointIndex);f.splice(R,1),s.deleteBuffer(a[U.id]),delete a[U.id],delete u[U.id]}function g(){for(const L in a)s.deleteBuffer(a[L]);f=[],a={},u={}}return{bind:p,update:m,dispose:g}}class pE{constructor(e={}){const{canvas:n=n0(),context:r=null,depth:a=!0,stencil:u=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=f;const T=new Uint32Array(4),A=new Int32Array(4);let y=null,g=null;const L=[],U=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$n,this.toneMapping=Sr,this.toneMappingExposure=1;const R=this;let Q=!1,B=0,F=0,Y=null,P=-1,C=null;const z=new Vt,le=new Vt;let te=null;const fe=new et(0);let me=0,ue=n.width,he=n.height,k=1,ce=null,oe=null;const N=new Vt(0,0,ue,he),re=new Vt(0,0,ue,he);let Fe=!1;const Z=new eh;let de=!1,Se=!1;const xe=new Ot,Re=new Ot,ke=new J,Ke=new Vt,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function Rt(){return Y===null?k:1}let W=r;function sn(w,X){return n.getContext(w,X)}try{const w={alpha:!0,depth:a,stencil:u,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Xf}`),n.addEventListener("webglcontextlost",pe,!1),n.addEventListener("webglcontextrestored",Ne,!1),n.addEventListener("webglcontextcreationerror",Ue,!1),W===null){const X="webgl2";if(W=sn(X,w),W===null)throw sn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let lt,ft,$e,Mt,We,b,E,D,V,se,K,Te,ye,Ce,Je,_e,be,Ie,ze,Pe,ut,tt,vt,G;function Le(){lt=new xS(W),lt.init(),tt=new rE(W,lt),ft=new dS(W,lt,e,tt),$e=new tE(W,lt),ft.reverseDepthBuffer&&x&&$e.buffers.depth.setReversed(!0),Mt=new MS(W),We=new BM,b=new iE(W,lt,$e,We,ft,tt,Mt),E=new mS(R),D=new vS(R),V=new P0(W),vt=new fS(W,V),se=new yS(W,V,Mt,vt),K=new TS(W,se,V,Mt),ze=new ES(W,ft,b),_e=new pS(We),Te=new zM(R,E,D,lt,ft,vt,_e),ye=new hE(R,We),Ce=new VM,Je=new qM(lt),Ie=new cS(R,E,D,$e,K,S,p),be=new JM(R,K,ft),G=new dE(W,Mt,ft,$e),Pe=new hS(W,lt,Mt),ut=new SS(W,lt,Mt),Mt.programs=Te.programs,R.capabilities=ft,R.extensions=lt,R.properties=We,R.renderLists=Ce,R.shadowMap=be,R.state=$e,R.info=Mt}Le();const ae=new cE(R,W);this.xr=ae,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const w=lt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=lt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(w){w!==void 0&&(k=w,this.setSize(ue,he,!1))},this.getSize=function(w){return w.set(ue,he)},this.setSize=function(w,X,ne=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ue=w,he=X,n.width=Math.floor(w*k),n.height=Math.floor(X*k),ne===!0&&(n.style.width=w+"px",n.style.height=X+"px"),this.setViewport(0,0,w,X)},this.getDrawingBufferSize=function(w){return w.set(ue*k,he*k).floor()},this.setDrawingBufferSize=function(w,X,ne){ue=w,he=X,k=ne,n.width=Math.floor(w*ne),n.height=Math.floor(X*ne),this.setViewport(0,0,w,X)},this.getCurrentViewport=function(w){return w.copy(z)},this.getViewport=function(w){return w.copy(N)},this.setViewport=function(w,X,ne,ie){w.isVector4?N.set(w.x,w.y,w.z,w.w):N.set(w,X,ne,ie),$e.viewport(z.copy(N).multiplyScalar(k).round())},this.getScissor=function(w){return w.copy(re)},this.setScissor=function(w,X,ne,ie){w.isVector4?re.set(w.x,w.y,w.z,w.w):re.set(w,X,ne,ie),$e.scissor(le.copy(re).multiplyScalar(k).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(w){$e.setScissorTest(Fe=w)},this.setOpaqueSort=function(w){ce=w},this.setTransparentSort=function(w){oe=w},this.getClearColor=function(w){return w.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor.apply(Ie,arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha.apply(Ie,arguments)},this.clear=function(w=!0,X=!0,ne=!0){let ie=0;if(w){let j=!1;if(Y!==null){const Ae=Y.texture.format;j=Ae===Jf||Ae===Qf||Ae===Zf}if(j){const Ae=Y.texture.type,Ee=Ae===Gi||Ae===$r||Ae===jo||Ae===Zs||Ae===qf||Ae===Kf,Xe=Ie.getClearColor(),Ve=Ie.getClearAlpha(),nt=Xe.r,rt=Xe.g,je=Xe.b;Ee?(T[0]=nt,T[1]=rt,T[2]=je,T[3]=Ve,W.clearBufferuiv(W.COLOR,0,T)):(A[0]=nt,A[1]=rt,A[2]=je,A[3]=Ve,W.clearBufferiv(W.COLOR,0,A))}else ie|=W.COLOR_BUFFER_BIT}X&&(ie|=W.DEPTH_BUFFER_BIT),ne&&(ie|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",pe,!1),n.removeEventListener("webglcontextrestored",Ne,!1),n.removeEventListener("webglcontextcreationerror",Ue,!1),Ce.dispose(),Je.dispose(),We.dispose(),E.dispose(),D.dispose(),K.dispose(),vt.dispose(),G.dispose(),Te.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",is),ae.removeEventListener("sessionend",Wi),Ei.stop()};function pe(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Q=!0}function Ne(){console.log("THREE.WebGLRenderer: Context Restored."),Q=!1;const w=Mt.autoReset,X=be.enabled,ne=be.autoUpdate,ie=be.needsUpdate,j=be.type;Le(),Mt.autoReset=w,be.enabled=X,be.autoUpdate=ne,be.needsUpdate=ie,be.type=j}function Ue(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ot(w){const X=w.target;X.removeEventListener("dispose",ot),It(X)}function It(w){jt(w),We.remove(w)}function jt(w){const X=We.get(w).programs;X!==void 0&&(X.forEach(function(ne){Te.releaseProgram(ne)}),w.isShaderMaterial&&Te.releaseShaderCache(w))}this.renderBufferDirect=function(w,X,ne,ie,j,Ae){X===null&&(X=At);const Ee=j.isMesh&&j.matrixWorld.determinant()<0,Xe=Jo(w,X,ne,ie,j);$e.setMaterial(ie,Ee);let Ve=ne.index,nt=1;if(ie.wireframe===!0){if(Ve=se.getWireframeAttribute(ne),Ve===void 0)return;nt=2}const rt=ne.drawRange,je=ne.attributes.position;let _t=rt.start*nt,wt=(rt.start+rt.count)*nt;Ae!==null&&(_t=Math.max(_t,Ae.start*nt),wt=Math.min(wt,(Ae.start+Ae.count)*nt)),Ve!==null?(_t=Math.max(_t,0),wt=Math.min(wt,Ve.count)):je!=null&&(_t=Math.max(_t,0),wt=Math.min(wt,je.count));const gt=wt-_t;if(gt<0||gt===1/0)return;vt.setup(j,ie,Xe,ne,Ve);let ln,ct=Pe;if(Ve!==null&&(ln=V.get(Ve),ct=ut,ct.setIndex(ln)),j.isMesh)ie.wireframe===!0?($e.setLineWidth(ie.wireframeLinewidth*Rt()),ct.setMode(W.LINES)):ct.setMode(W.TRIANGLES);else if(j.isLine){let qe=ie.linewidth;qe===void 0&&(qe=1),$e.setLineWidth(qe*Rt()),j.isLineSegments?ct.setMode(W.LINES):j.isLineLoop?ct.setMode(W.LINE_LOOP):ct.setMode(W.LINE_STRIP)}else j.isPoints?ct.setMode(W.POINTS):j.isSprite&&ct.setMode(W.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)ct.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(lt.get("WEBGL_multi_draw"))ct.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const qe=j._multiDrawStarts,Jn=j._multiDrawCounts,Et=j._multiDrawCount,un=Ve?V.get(Ve).bytesPerElement:1,ei=We.get(ie).currentProgram.getUniforms();for(let Yt=0;Yt<Et;Yt++)ei.setValue(W,"_gl_DrawID",Yt),ct.render(qe[Yt]/un,Jn[Yt])}else if(j.isInstancedMesh)ct.renderInstances(_t,gt,j.count);else if(ne.isInstancedBufferGeometry){const qe=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Jn=Math.min(ne.instanceCount,qe);ct.renderInstances(_t,gt,Jn)}else ct.render(_t,gt)};function xt(w,X,ne){w.transparent===!0&&w.side===Bi&&w.forceSinglePass===!1?(w.side=In,w.needsUpdate=!0,rs(w,X,ne),w.side=Mr,w.needsUpdate=!0,rs(w,X,ne),w.side=Bi):rs(w,X,ne)}this.compile=function(w,X,ne=null){ne===null&&(ne=w),g=Je.get(ne),g.init(X),U.push(g),ne.traverseVisible(function(j){j.isLight&&j.layers.test(X.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))}),w!==ne&&w.traverseVisible(function(j){j.isLight&&j.layers.test(X.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))}),g.setupLights();const ie=new Set;return w.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const Ae=j.material;if(Ae)if(Array.isArray(Ae))for(let Ee=0;Ee<Ae.length;Ee++){const Xe=Ae[Ee];xt(Xe,ne,j),ie.add(Xe)}else xt(Ae,ne,j),ie.add(Ae)}),U.pop(),g=null,ie},this.compileAsync=function(w,X,ne=null){const ie=this.compile(w,X,ne);return new Promise(j=>{function Ae(){if(ie.forEach(function(Ee){We.get(Ee).currentProgram.isReady()&&ie.delete(Ee)}),ie.size===0){j(w);return}setTimeout(Ae,10)}lt.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let En=null;function gn(w){En&&En(w)}function is(){Ei.stop()}function Wi(){Ei.start()}const Ei=new gg;Ei.setAnimationLoop(gn),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(w){En=w,ae.setAnimationLoop(w),w===null?Ei.stop():Ei.start()},ae.addEventListener("sessionstart",is),ae.addEventListener("sessionend",Wi),this.render=function(w,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(X),X=ae.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,X,Y),g=Je.get(w,U.length),g.init(X),U.push(g),Re.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Z.setFromProjectionMatrix(Re),Se=this.localClippingEnabled,de=_e.init(this.clippingPlanes,Se),y=Ce.get(w,L.length),y.init(),L.push(y),ae.enabled===!0&&ae.isPresenting===!0){const Ae=R.xr.getDepthSensingMesh();Ae!==null&&Ti(Ae,X,-1/0,R.sortObjects)}Ti(w,X,0,R.sortObjects),y.finish(),R.sortObjects===!0&&y.sort(ce,oe),at=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,at&&Ie.addToRenderList(y,w),this.info.render.frame++,de===!0&&_e.beginShadows();const ne=g.state.shadowsArray;be.render(ne,w,X),de===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();const ie=y.opaque,j=y.transmissive;if(g.setupLights(),X.isArrayCamera){const Ae=X.cameras;if(j.length>0)for(let Ee=0,Xe=Ae.length;Ee<Xe;Ee++){const Ve=Ae[Ee];wr(ie,j,w,Ve)}at&&Ie.render(w);for(let Ee=0,Xe=Ae.length;Ee<Xe;Ee++){const Ve=Ae[Ee];Tr(y,w,Ve,Ve.viewport)}}else j.length>0&&wr(ie,j,w,X),at&&Ie.render(w),Tr(y,w,X);Y!==null&&(b.updateMultisampleRenderTarget(Y),b.updateRenderTargetMipmap(Y)),w.isScene===!0&&w.onAfterRender(R,w,X),vt.resetDefaultState(),P=-1,C=null,U.pop(),U.length>0?(g=U[U.length-1],de===!0&&_e.setGlobalState(R.clippingPlanes,g.state.camera)):g=null,L.pop(),L.length>0?y=L[L.length-1]:y=null};function Ti(w,X,ne,ie){if(w.visible===!1)return;if(w.layers.test(X.layers)){if(w.isGroup)ne=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(X);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Z.intersectsSprite(w)){ie&&Ke.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Re);const Ee=K.update(w),Xe=w.material;Xe.visible&&y.push(w,Ee,Xe,ne,Ke.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Z.intersectsObject(w))){const Ee=K.update(w),Xe=w.material;if(ie&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ke.copy(w.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Ke.copy(Ee.boundingSphere.center)),Ke.applyMatrix4(w.matrixWorld).applyMatrix4(Re)),Array.isArray(Xe)){const Ve=Ee.groups;for(let nt=0,rt=Ve.length;nt<rt;nt++){const je=Ve[nt],_t=Xe[je.materialIndex];_t&&_t.visible&&y.push(w,Ee,_t,ne,Ke.z,je)}}else Xe.visible&&y.push(w,Ee,Xe,ne,Ke.z,null)}}const Ae=w.children;for(let Ee=0,Xe=Ae.length;Ee<Xe;Ee++)Ti(Ae[Ee],X,ne,ie)}function Tr(w,X,ne,ie){const j=w.opaque,Ae=w.transmissive,Ee=w.transparent;g.setupLightsView(ne),de===!0&&_e.setGlobalState(R.clippingPlanes,ne),ie&&$e.viewport(z.copy(ie)),j.length>0&&Xi(j,X,ne),Ae.length>0&&Xi(Ae,X,ne),Ee.length>0&&Xi(Ee,X,ne),$e.buffers.depth.setTest(!0),$e.buffers.depth.setMask(!0),$e.buffers.color.setMask(!0),$e.setPolygonOffset(!1)}function wr(w,X,ne,ie){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ie.id]===void 0&&(g.state.transmissionRenderTarget[ie.id]=new Zr(1,1,{generateMipmaps:!0,type:lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float")?Yo:Gi,minFilter:qr,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:St.workingColorSpace}));const Ae=g.state.transmissionRenderTarget[ie.id],Ee=ie.viewport||z;Ae.setSize(Ee.z,Ee.w);const Xe=R.getRenderTarget();R.setRenderTarget(Ae),R.getClearColor(fe),me=R.getClearAlpha(),me<1&&R.setClearColor(16777215,.5),R.clear(),at&&Ie.render(ne);const Ve=R.toneMapping;R.toneMapping=Sr;const nt=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),g.setupLightsView(ie),de===!0&&_e.setGlobalState(R.clippingPlanes,ie),Xi(w,ne,ie),b.updateMultisampleRenderTarget(Ae),b.updateRenderTargetMipmap(Ae),lt.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let je=0,_t=X.length;je<_t;je++){const wt=X[je],gt=wt.object,ln=wt.geometry,ct=wt.material,qe=wt.group;if(ct.side===Bi&&gt.layers.test(ie.layers)){const Jn=ct.side;ct.side=In,ct.needsUpdate=!0,Zo(gt,ne,ie,ln,ct,qe),ct.side=Jn,ct.needsUpdate=!0,rt=!0}}rt===!0&&(b.updateMultisampleRenderTarget(Ae),b.updateRenderTargetMipmap(Ae))}R.setRenderTarget(Xe),R.setClearColor(fe,me),nt!==void 0&&(ie.viewport=nt),R.toneMapping=Ve}function Xi(w,X,ne){const ie=X.isScene===!0?X.overrideMaterial:null;for(let j=0,Ae=w.length;j<Ae;j++){const Ee=w[j],Xe=Ee.object,Ve=Ee.geometry,nt=ie===null?Ee.material:ie,rt=Ee.group;Xe.layers.test(ne.layers)&&Zo(Xe,X,ne,Ve,nt,rt)}}function Zo(w,X,ne,ie,j,Ae){w.onBeforeRender(R,X,ne,ie,j,Ae),w.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),j.onBeforeRender(R,X,ne,ie,w,Ae),j.transparent===!0&&j.side===Bi&&j.forceSinglePass===!1?(j.side=In,j.needsUpdate=!0,R.renderBufferDirect(ne,X,ie,j,w,Ae),j.side=Mr,j.needsUpdate=!0,R.renderBufferDirect(ne,X,ie,j,w,Ae),j.side=Bi):R.renderBufferDirect(ne,X,ie,j,w,Ae),w.onAfterRender(R,X,ne,ie,j,Ae)}function rs(w,X,ne){X.isScene!==!0&&(X=At);const ie=We.get(w),j=g.state.lights,Ae=g.state.shadowsArray,Ee=j.state.version,Xe=Te.getParameters(w,j.state,Ae,X,ne),Ve=Te.getProgramCacheKey(Xe);let nt=ie.programs;ie.environment=w.isMeshStandardMaterial?X.environment:null,ie.fog=X.fog,ie.envMap=(w.isMeshStandardMaterial?D:E).get(w.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&w.envMap===null?X.environmentRotation:w.envMapRotation,nt===void 0&&(w.addEventListener("dispose",ot),nt=new Map,ie.programs=nt);let rt=nt.get(Ve);if(rt!==void 0){if(ie.currentProgram===rt&&ie.lightsStateVersion===Ee)return di(w,Xe),rt}else Xe.uniforms=Te.getUniforms(w),w.onBeforeCompile(Xe,R),rt=Te.acquireProgram(Xe,Ve),nt.set(Ve,rt),ie.uniforms=Xe.uniforms;const je=ie.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(je.clippingPlanes=_e.uniform),di(w,Xe),ie.needsLights=Hl(w),ie.lightsStateVersion=Ee,ie.needsLights&&(je.ambientLightColor.value=j.state.ambient,je.lightProbe.value=j.state.probe,je.directionalLights.value=j.state.directional,je.directionalLightShadows.value=j.state.directionalShadow,je.spotLights.value=j.state.spot,je.spotLightShadows.value=j.state.spotShadow,je.rectAreaLights.value=j.state.rectArea,je.ltc_1.value=j.state.rectAreaLTC1,je.ltc_2.value=j.state.rectAreaLTC2,je.pointLights.value=j.state.point,je.pointLightShadows.value=j.state.pointShadow,je.hemisphereLights.value=j.state.hemi,je.directionalShadowMap.value=j.state.directionalShadowMap,je.directionalShadowMatrix.value=j.state.directionalShadowMatrix,je.spotShadowMap.value=j.state.spotShadowMap,je.spotLightMatrix.value=j.state.spotLightMatrix,je.spotLightMap.value=j.state.spotLightMap,je.pointShadowMap.value=j.state.pointShadowMap,je.pointShadowMatrix.value=j.state.pointShadowMatrix),ie.currentProgram=rt,ie.uniformsList=null,rt}function Qo(w){if(w.uniformsList===null){const X=w.currentProgram.getUniforms();w.uniformsList=Ul.seqWithValue(X.seq,w.uniforms)}return w.uniformsList}function di(w,X){const ne=We.get(w);ne.outputColorSpace=X.outputColorSpace,ne.batching=X.batching,ne.batchingColor=X.batchingColor,ne.instancing=X.instancing,ne.instancingColor=X.instancingColor,ne.instancingMorph=X.instancingMorph,ne.skinning=X.skinning,ne.morphTargets=X.morphTargets,ne.morphNormals=X.morphNormals,ne.morphColors=X.morphColors,ne.morphTargetsCount=X.morphTargetsCount,ne.numClippingPlanes=X.numClippingPlanes,ne.numIntersection=X.numClipIntersection,ne.vertexAlphas=X.vertexAlphas,ne.vertexTangents=X.vertexTangents,ne.toneMapping=X.toneMapping}function Jo(w,X,ne,ie,j){X.isScene!==!0&&(X=At),b.resetTextureUnits();const Ae=X.fog,Ee=ie.isMeshStandardMaterial?X.environment:null,Xe=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:to,Ve=(ie.isMeshStandardMaterial?D:E).get(ie.envMap||Ee),nt=ie.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,rt=!!ne.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),je=!!ne.morphAttributes.position,_t=!!ne.morphAttributes.normal,wt=!!ne.morphAttributes.color;let gt=Sr;ie.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(gt=R.toneMapping);const ln=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,ct=ln!==void 0?ln.length:0,qe=We.get(ie),Jn=g.state.lights;if(de===!0&&(Se===!0||w!==C)){const _n=w===C&&ie.id===P;_e.setState(ie,w,_n)}let Et=!1;ie.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Jn.state.version||qe.outputColorSpace!==Xe||j.isBatchedMesh&&qe.batching===!1||!j.isBatchedMesh&&qe.batching===!0||j.isBatchedMesh&&qe.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&qe.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&qe.instancing===!1||!j.isInstancedMesh&&qe.instancing===!0||j.isSkinnedMesh&&qe.skinning===!1||!j.isSkinnedMesh&&qe.skinning===!0||j.isInstancedMesh&&qe.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&qe.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&qe.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&qe.instancingMorph===!1&&j.morphTexture!==null||qe.envMap!==Ve||ie.fog===!0&&qe.fog!==Ae||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==_e.numPlanes||qe.numIntersection!==_e.numIntersection)||qe.vertexAlphas!==nt||qe.vertexTangents!==rt||qe.morphTargets!==je||qe.morphNormals!==_t||qe.morphColors!==wt||qe.toneMapping!==gt||qe.morphTargetsCount!==ct)&&(Et=!0):(Et=!0,qe.__version=ie.version);let un=qe.currentProgram;Et===!0&&(un=rs(ie,X,j));let ei=!1,Yt=!1,pi=!1;const Lt=un.getUniforms(),Hn=qe.uniforms;if($e.useProgram(un.program)&&(ei=!0,Yt=!0,pi=!0),ie.id!==P&&(P=ie.id,Yt=!0),ei||C!==w){$e.buffers.depth.getReversed()?(xe.copy(w.projectionMatrix),r0(xe),s0(xe),Lt.setValue(W,"projectionMatrix",xe)):Lt.setValue(W,"projectionMatrix",w.projectionMatrix),Lt.setValue(W,"viewMatrix",w.matrixWorldInverse);const Vn=Lt.map.cameraPosition;Vn!==void 0&&Vn.setValue(W,ke.setFromMatrixPosition(w.matrixWorld)),ft.logarithmicDepthBuffer&&Lt.setValue(W,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Lt.setValue(W,"isOrthographic",w.isOrthographicCamera===!0),C!==w&&(C=w,Yt=!0,pi=!0)}if(j.isSkinnedMesh){Lt.setOptional(W,j,"bindMatrix"),Lt.setOptional(W,j,"bindMatrixInverse");const _n=j.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),Lt.setValue(W,"boneTexture",_n.boneTexture,b))}j.isBatchedMesh&&(Lt.setOptional(W,j,"batchingTexture"),Lt.setValue(W,"batchingTexture",j._matricesTexture,b),Lt.setOptional(W,j,"batchingIdTexture"),Lt.setValue(W,"batchingIdTexture",j._indirectTexture,b),Lt.setOptional(W,j,"batchingColorTexture"),j._colorsTexture!==null&&Lt.setValue(W,"batchingColorTexture",j._colorsTexture,b));const wi=ne.morphAttributes;if((wi.position!==void 0||wi.normal!==void 0||wi.color!==void 0)&&ze.update(j,ne,un),(Yt||qe.receiveShadow!==j.receiveShadow)&&(qe.receiveShadow=j.receiveShadow,Lt.setValue(W,"receiveShadow",j.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(Hn.envMap.value=Ve,Hn.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),ie.isMeshStandardMaterial&&ie.envMap===null&&X.environment!==null&&(Hn.envMapIntensity.value=X.environmentIntensity),Yt&&(Lt.setValue(W,"toneMappingExposure",R.toneMappingExposure),qe.needsLights&&ea(Hn,pi),Ae&&ie.fog===!0&&ye.refreshFogUniforms(Hn,Ae),ye.refreshMaterialUniforms(Hn,ie,k,he,g.state.transmissionRenderTarget[w.id]),Ul.upload(W,Qo(qe),Hn,b)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Ul.upload(W,Qo(qe),Hn,b),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Lt.setValue(W,"center",j.center),Lt.setValue(W,"modelViewMatrix",j.modelViewMatrix),Lt.setValue(W,"normalMatrix",j.normalMatrix),Lt.setValue(W,"modelMatrix",j.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){const _n=ie.uniformsGroups;for(let Vn=0,Tn=_n.length;Vn<Tn;Vn++){const ta=_n[Vn];G.update(ta,un),G.bind(ta,un)}}return un}function ea(w,X){w.ambientLightColor.needsUpdate=X,w.lightProbe.needsUpdate=X,w.directionalLights.needsUpdate=X,w.directionalLightShadows.needsUpdate=X,w.pointLights.needsUpdate=X,w.pointLightShadows.needsUpdate=X,w.spotLights.needsUpdate=X,w.spotLightShadows.needsUpdate=X,w.rectAreaLights.needsUpdate=X,w.hemisphereLights.needsUpdate=X}function Hl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(w,X,ne){We.get(w.texture).__webglTexture=X,We.get(w.depthTexture).__webglTexture=ne;const ie=We.get(w);ie.__hasExternalTextures=!0,ie.__autoAllocateDepthBuffer=ne===void 0,ie.__autoAllocateDepthBuffer||lt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ie.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,X){const ne=We.get(w);ne.__webglFramebuffer=X,ne.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(w,X=0,ne=0){Y=w,B=X,F=ne;let ie=!0,j=null,Ae=!1,Ee=!1;if(w){const Ve=We.get(w);if(Ve.__useDefaultFramebuffer!==void 0)$e.bindFramebuffer(W.FRAMEBUFFER,null),ie=!1;else if(Ve.__webglFramebuffer===void 0)b.setupRenderTarget(w);else if(Ve.__hasExternalTextures)b.rebindTextures(w,We.get(w.texture).__webglTexture,We.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const je=w.depthTexture;if(Ve.__boundDepthTexture!==je){if(je!==null&&We.has(je)&&(w.width!==je.image.width||w.height!==je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(w)}}const nt=w.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Ee=!0);const rt=We.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(rt[X])?j=rt[X][ne]:j=rt[X],Ae=!0):w.samples>0&&b.useMultisampledRTT(w)===!1?j=We.get(w).__webglMultisampledFramebuffer:Array.isArray(rt)?j=rt[ne]:j=rt,z.copy(w.viewport),le.copy(w.scissor),te=w.scissorTest}else z.copy(N).multiplyScalar(k).floor(),le.copy(re).multiplyScalar(k).floor(),te=Fe;if($e.bindFramebuffer(W.FRAMEBUFFER,j)&&ie&&$e.drawBuffers(w,j),$e.viewport(z),$e.scissor(le),$e.setScissorTest(te),Ae){const Ve=We.get(w.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ve.__webglTexture,ne)}else if(Ee){const Ve=We.get(w.texture),nt=X||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ve.__webglTexture,ne||0,nt)}P=-1},this.readRenderTargetPixels=function(w,X,ne,ie,j,Ae,Ee){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=We.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ee!==void 0&&(Xe=Xe[Ee]),Xe){$e.bindFramebuffer(W.FRAMEBUFFER,Xe);try{const Ve=w.texture,nt=Ve.format,rt=Ve.type;if(!ft.textureFormatReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=w.width-ie&&ne>=0&&ne<=w.height-j&&W.readPixels(X,ne,ie,j,tt.convert(nt),tt.convert(rt),Ae)}finally{const Ve=Y!==null?We.get(Y).__webglFramebuffer:null;$e.bindFramebuffer(W.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(w,X,ne,ie,j,Ae,Ee){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=We.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ee!==void 0&&(Xe=Xe[Ee]),Xe){const Ve=w.texture,nt=Ve.format,rt=Ve.type;if(!ft.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=w.width-ie&&ne>=0&&ne<=w.height-j){$e.bindFramebuffer(W.FRAMEBUFFER,Xe);const je=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,je),W.bufferData(W.PIXEL_PACK_BUFFER,Ae.byteLength,W.STREAM_READ),W.readPixels(X,ne,ie,j,tt.convert(nt),tt.convert(rt),0);const _t=Y!==null?We.get(Y).__webglFramebuffer:null;$e.bindFramebuffer(W.FRAMEBUFFER,_t);const wt=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await i0(W,wt,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,je),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Ae),W.deleteBuffer(je),W.deleteSync(wt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,X=null,ne=0){w.isTexture!==!0&&(Wo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,w=arguments[1]);const ie=Math.pow(2,-ne),j=Math.floor(w.image.width*ie),Ae=Math.floor(w.image.height*ie),Ee=X!==null?X.x:0,Xe=X!==null?X.y:0;b.setTexture2D(w,0),W.copyTexSubImage2D(W.TEXTURE_2D,ne,0,0,Ee,Xe,j,Ae),$e.unbindTexture()},this.copyTextureToTexture=function(w,X,ne=null,ie=null,j=0){w.isTexture!==!0&&(Wo("WebGLRenderer: copyTextureToTexture function signature has changed."),ie=arguments[0]||null,w=arguments[1],X=arguments[2],j=arguments[3]||0,ne=null);let Ae,Ee,Xe,Ve,nt,rt,je,_t,wt;const gt=w.isCompressedTexture?w.mipmaps[j]:w.image;ne!==null?(Ae=ne.max.x-ne.min.x,Ee=ne.max.y-ne.min.y,Xe=ne.isBox3?ne.max.z-ne.min.z:1,Ve=ne.min.x,nt=ne.min.y,rt=ne.isBox3?ne.min.z:0):(Ae=gt.width,Ee=gt.height,Xe=gt.depth||1,Ve=0,nt=0,rt=0),ie!==null?(je=ie.x,_t=ie.y,wt=ie.z):(je=0,_t=0,wt=0);const ln=tt.convert(X.format),ct=tt.convert(X.type);let qe;X.isData3DTexture?(b.setTexture3D(X,0),qe=W.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(b.setTexture2DArray(X,0),qe=W.TEXTURE_2D_ARRAY):(b.setTexture2D(X,0),qe=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,X.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,X.unpackAlignment);const Jn=W.getParameter(W.UNPACK_ROW_LENGTH),Et=W.getParameter(W.UNPACK_IMAGE_HEIGHT),un=W.getParameter(W.UNPACK_SKIP_PIXELS),ei=W.getParameter(W.UNPACK_SKIP_ROWS),Yt=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,gt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,gt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Ve),W.pixelStorei(W.UNPACK_SKIP_ROWS,nt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,rt);const pi=w.isDataArrayTexture||w.isData3DTexture,Lt=X.isDataArrayTexture||X.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const Hn=We.get(w),wi=We.get(X),_n=We.get(Hn.__renderTarget),Vn=We.get(wi.__renderTarget);$e.bindFramebuffer(W.READ_FRAMEBUFFER,_n.__webglFramebuffer),$e.bindFramebuffer(W.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Tn=0;Tn<Xe;Tn++)pi&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,We.get(w).__webglTexture,j,rt+Tn),w.isDepthTexture?(Lt&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,We.get(X).__webglTexture,j,wt+Tn),W.blitFramebuffer(Ve,nt,Ae,Ee,je,_t,Ae,Ee,W.DEPTH_BUFFER_BIT,W.NEAREST)):Lt?W.copyTexSubImage3D(qe,j,je,_t,wt+Tn,Ve,nt,Ae,Ee):W.copyTexSubImage2D(qe,j,je,_t,wt+Tn,Ve,nt,Ae,Ee);$e.bindFramebuffer(W.READ_FRAMEBUFFER,null),$e.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Lt?w.isDataTexture||w.isData3DTexture?W.texSubImage3D(qe,j,je,_t,wt,Ae,Ee,Xe,ln,ct,gt.data):X.isCompressedArrayTexture?W.compressedTexSubImage3D(qe,j,je,_t,wt,Ae,Ee,Xe,ln,gt.data):W.texSubImage3D(qe,j,je,_t,wt,Ae,Ee,Xe,ln,ct,gt):w.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,j,je,_t,Ae,Ee,ln,ct,gt.data):w.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,j,je,_t,gt.width,gt.height,ln,gt.data):W.texSubImage2D(W.TEXTURE_2D,j,je,_t,Ae,Ee,ln,ct,gt);W.pixelStorei(W.UNPACK_ROW_LENGTH,Jn),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Et),W.pixelStorei(W.UNPACK_SKIP_PIXELS,un),W.pixelStorei(W.UNPACK_SKIP_ROWS,ei),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Yt),j===0&&X.generateMipmaps&&W.generateMipmap(qe),$e.unbindTexture()},this.copyTextureToTexture3D=function(w,X,ne=null,ie=null,j=0){return w.isTexture!==!0&&(Wo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ne=arguments[0]||null,ie=arguments[1]||null,w=arguments[2],X=arguments[3],j=arguments[4]||0),Wo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,X,ne,ie,j)},this.initRenderTarget=function(w){We.get(w).__webglFramebuffer===void 0&&b.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?b.setTextureCube(w,0):w.isData3DTexture?b.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?b.setTexture2DArray(w,0):b.setTexture2D(w,0),$e.unbindTexture()},this.resetState=function(){B=0,F=0,Y=null,$e.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=St._getDrawingBufferColorSpace(e),n.unpackColorSpace=St._getUnpackColorSpace()}}class nh{constructor(e,n=1,r=1e3){this.isFog=!0,this.name="",this.color=new et(e),this.near=n,this.far=r}clone(){return new nh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class mE extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class gE extends Mn{constructor(e=null,n=1,r=1,a,u,f,h,p,m=Bn,_=Bn,v,x){super(null,f,h,p,m,_,a,u,v,x),this.isDataTexture=!0,this.image={data:e,width:n,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Um extends hi{constructor(e,n,r,a=1){super(e,n,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hs=new Ot,Nm=new Ot,wl=[],Fm=new ts,_E=new Ot,Ho=new Qn,Vo=new Ko;class Al extends Qn{constructor(e,n,r){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Um(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<r;a++)this.setMatrixAt(a,_E)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new ts),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<n;r++)this.getMatrixAt(r,Hs),Fm.copy(e.boundingBox).applyMatrix4(Hs),this.boundingBox.union(Fm)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ko),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<n;r++)this.getMatrixAt(r,Hs),Vo.copy(e.boundingSphere).applyMatrix4(Hs),this.boundingSphere.union(Vo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const r=n.morphTargetInfluences,a=this.morphTexture.source.data.data,u=r.length+1,f=e*u+1;for(let h=0;h<r.length;h++)r[h]=a[f+h]}raycast(e,n){const r=this.matrixWorld,a=this.count;if(Ho.geometry=this.geometry,Ho.material=this.material,Ho.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vo.copy(this.boundingSphere),Vo.applyMatrix4(r),e.ray.intersectsSphere(Vo)!==!1))for(let u=0;u<a;u++){this.getMatrixAt(u,Hs),Nm.multiplyMatrices(r,Hs),Ho.matrixWorld=Nm,Ho.raycast(e,wl);for(let f=0,h=wl.length;f<h;f++){const p=wl[f];p.instanceId=u,p.object=this,n.push(p)}wl.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new Um(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const r=n.morphTargetInfluences,a=r.length+1;this.morphTexture===null&&(this.morphTexture=new gE(new Float32Array(a*this.count),a,this.count,$f,Si));const u=this.morphTexture.source.data.data;let f=0;for(let m=0;m<r.length;m++)f+=r[m];const h=this.geometry.morphTargetsRelative?1:1-f,p=a*e;u[p]=h,u.set(r,p+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Go extends $o{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ng,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=jf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ih extends rn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class vE extends ih{constructor(e,n,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new et(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const Jc=new Ot,Om=new J,km=new J;class xE{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new eh,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new Vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,r=this.matrix;Om.setFromMatrixPosition(e.matrixWorld),n.position.copy(Om),km.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(km),n.updateMatrixWorld(),Jc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jc),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class yE extends xE{constructor(){super(new _g(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class SE extends ih{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new yE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ME extends ih{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class EE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=zm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=zm();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function zm(){return performance.now()}class Bm{constructor(e=1,n=0,r=0){return this.radius=e,this.phi=n,this.theta=r,this}set(e,n,r){return this.radius=e,this.phi=n,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,r){return this.radius=Math.sqrt(e*e+n*n+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(Sn(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class TE extends es{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xf);const Hm={type:"change"},rh={type:"start"},Eg={type:"end"},Cl=new ag,Vm=new vr,wE=Math.cos(70*t0.DEG2RAD),$t=new J,Dn=2*Math.PI,bt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ef=1e-6;class AE extends TE{constructor(e,n=null){super(e,n),this.state=bt.NONE,this.enabled=!0,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ws.ROTATE,MIDDLE:Ws.DOLLY,RIGHT:Ws.PAN},this.touches={ONE:Vs.ROTATE,TWO:Vs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new Qr,this._lastTargetPosition=new J,this._quat=new Qr().setFromUnitVectors(e.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Bm,this._sphericalDelta=new Bm,this._scale=1,this._panOffset=new J,this._rotateStart=new dt,this._rotateEnd=new dt,this._rotateDelta=new dt,this._panStart=new dt,this._panEnd=new dt,this._panDelta=new dt,this._dollyStart=new dt,this._dollyEnd=new dt,this._dollyDelta=new dt,this._dollyDirection=new J,this._mouse=new dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RE.bind(this),this._onPointerDown=CE.bind(this),this._onPointerUp=PE.bind(this),this._onContextMenu=FE.bind(this),this._onMouseWheel=DE.bind(this),this._onKeyDown=IE.bind(this),this._onTouchStart=UE.bind(this),this._onTouchMove=NE.bind(this),this._onMouseDown=bE.bind(this),this._onMouseMove=LE.bind(this),this._interceptControlDown=OE.bind(this),this._interceptControlUp=kE.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hm),this.update(),this.state=bt.NONE}update(e=null){const n=this.object.position;$t.copy(n).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===bt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(r)&&isFinite(a)&&(r<-Math.PI?r+=Dn:r>Math.PI&&(r-=Dn),a<-Math.PI?a+=Dn:a>Math.PI&&(a-=Dn),r<=a?this._spherical.theta=Math.max(r,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+a)/2?Math.max(r,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=f!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),n.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=$t.length();f=this._clampDistance(h*this._scale);const p=h-f;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),u=!!p}else if(this.object.isOrthographicCamera){const h=new J(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=p!==this.object.zoom;const m=new J(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(h),this.object.updateMatrixWorld(),f=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Cl.origin.copy(this.object.position),Cl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cl.direction))<wE?this.object.lookAt(this.target):(Vm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cl.intersectPlane(Vm,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>ef||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ef||this._lastTargetPosition.distanceToSquared(this.target)>ef?(this.dispatchEvent(Hm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Dn/60*this.autoRotateSpeed*e:Dn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){$t.setFromMatrixColumn(n,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,n){this.screenSpacePanning===!0?$t.setFromMatrixColumn(n,1):($t.setFromMatrixColumn(n,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,n){const r=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;$t.copy(a).sub(this.target);let u=$t.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*u/r.clientHeight,this.object.matrix),this._panUp(2*n*u/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),a=e-r.left,u=n-r.top,f=r.width,h=r.height;this._mouse.x=a/f*2-1,this._mouse.y=-(u/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateStart.set(r,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panStart.set(r,a)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,u=Math.sqrt(r*r+a*a);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),a=.5*(e.pageX+r.x),u=.5*(e.pageY+r.y);this._rotateEnd.set(a,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panEnd.set(r,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,u=Math.sqrt(r*r+a*a);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+n.x)*.5,h=(e.pageY+n.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new dt,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function CE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function RE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function PE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Eg),this.state=bt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function bE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ws.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=bt.DOLLY;break;case Ws.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=bt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=bt.ROTATE}break;case Ws.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=bt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=bt.PAN}break;default:this.state=bt.NONE}this.state!==bt.NONE&&this.dispatchEvent(rh)}function LE(s){switch(this.state){case bt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case bt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case bt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function DE(s){this.enabled===!1||this.enableZoom===!1||this.state!==bt.NONE||(s.preventDefault(),this.dispatchEvent(rh),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Eg))}function IE(s){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(s)}function UE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Vs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=bt.TOUCH_ROTATE;break;case Vs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=bt.TOUCH_PAN;break;default:this.state=bt.NONE}break;case 2:switch(this.touches.TWO){case Vs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=bt.TOUCH_DOLLY_PAN;break;case Vs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=bt.TOUCH_DOLLY_ROTATE;break;default:this.state=bt.NONE}break;default:this.state=bt.NONE}this.state!==bt.NONE&&this.dispatchEvent(rh)}function NE(s){switch(this._trackPointer(s),this.state){case bt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case bt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case bt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case bt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=bt.NONE}}function FE(s){this.enabled!==!1&&s.preventDefault()}function OE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function kE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ft(s,e,n){let r=s*374761393+e*668265263+n*974634211|0;return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967295}function Tg(s,e,n){const r=Math.floor(s),a=Math.floor(e),u=s-r,f=e-a,h=u*u*(3-2*u),p=f*f*(3-2*f),m=Ft(r,a,n),_=Ft(r+1,a,n),v=Ft(r,a+1,n),x=Ft(r+1,a+1,n);return m+(_-m)*h+(v-m)*p+(m-_-v+x)*h*p}function Gm(s,e,n,r){let a=0,u=.5,f=1,h=0;for(let p=0;p<n;p++)a+=u*Tg(s*f,e*f,r+p*101),h+=u,u*=.5,f*=2.03;return a/h}const eo=(s,e,n)=>Math.max(e,Math.min(n,s)),Gf={morning:{label:"清晨",sun:16767400,sunI:2.6,sunPos:[140,90,60],hemiSky:12573183,hemiGround:9075302,hemiI:.9,sky:13624567,fog:14214898,fogNear:260,fogFar:720},noon:{label:"正午",sun:16777215,sunI:3,sunPos:[60,200,80],hemiSky:13625599,hemiGround:10129791,hemiI:1,sky:10473717,fog:12901614,fogNear:300,fogFar:800},dusk:{label:"黄昏",sun:16752222,sunI:2.2,sunPos:[-160,55,110],hemiSky:15250575,hemiGround:6247528,hemiI:.75,sky:15906186,fog:15646880,fogNear:240,fogFar:680}};function zE(s,e,n){const r=s,a=new Float32Array(r*r),u=r*.5,f=r*.44,h=[{x:u,z:f,h:e,s:r*.125},{x:r*.74,z:r*.62,h:e*.55,s:r*.085},{x:r*.27,z:r*.68,h:e*.45,s:r*.075},{x:r*.62,z:r*.24,h:e*.34,s:r*.06}],p=8;for(let m=0;m<r;m++)for(let _=0;_<r;_++){let v=p;for(const y of h){const g=_-y.x,L=m-y.z;v+=y.h*Math.exp(-(g*g+L*L)/(2*y.s*y.s))}v+=(Gm(_*.028,m*.028,4,n)-.5)*e*.42,v+=(Gm(_*.09,m*.09,3,n+7)-.5)*7;const x=_-r*.5,S=m-r*.86;v-=16*Math.exp(-(x*x+S*S)/(2*(r*.13)**2));const T=Math.max(0,Math.abs(_-u)-r*.44)/(r*.06),A=Math.max(0,Math.abs(m-r*.5)-r*.44)/(r*.06);v-=10*eo(Math.max(T,A),0,1),a[m*r+_]=Math.round(v)}return a}function BE(s,e,n,r,a,u){const f=[];for(let h=0;h<r;h++){const p=r===1?.18:(h/(r-1)-.5)*.9;let m=Math.round(n.x+Math.sin(p)*e*.07),_=Math.round(n.z+Math.cos(p)*e*.07);m=eo(m,1,e-2),_=eo(_,1,e-2);const v=[],x=new Set;for(let S=0;S<600;S++){const T=_*e+m;if(x.has(T)||(x.add(T),v.push({x:m,z:_,h:s[T]}),s[T]<=a+1))break;let A=m,y=_,g=1/0;for(let L=-1;L<=1;L++)for(let U=-1;U<=1;U++){if(!U&&!L)continue;const R=m+U,Q=_+L;if(R<1||Q<1||R>=e-1||Q>=e-1)continue;const B=(Tg(R*.15,Q*.15,u+h*31)-.5)*3,F=s[Q*e+R]+B+(L===1?-.6:0);F<g&&(g=F,A=R,y=Q)}g>=s[T]+.5&&s[T]>a+1&&(y=Math.min(e-2,_+1)),m=A,_=y}v.length>8&&f.push(v)}return f}function HE(s,e,n,r,a,u,f){const h=Ft(a,u,f);if(s<=e+1)return new et().setHSL(.32-h*.03,.32,.3+h*.06);if(s>=n){const p=eo((s-n)/8,0,1);return new et().lerpColors(new et(10134445),new et(15922938),.35+p*.65)}if(s>=r){const p=(s-r)/Math.max(1,n-r),m=new et().lerpColors(new et(7305832),new et(9146262),p);return m.offsetHSL(0,0,(h-.5)*.05),m}return new et().setHSL(.29+h*.05,.45,.3+h*.1)}function VE(s,e){const n=e.grid,r=1337,a=7,u=new pE({antialias:!0});u.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.setSize(s.clientWidth,s.clientHeight),u.shadowMap.enabled=!0,u.shadowMap.type=Xm,s.appendChild(u.domElement);const f=new mE,h=new Zn(50,s.clientWidth/s.clientHeight,.5,3e3);h.position.set(n*.62,n*.62,n*1.02);const p=new AE(h,u.domElement);p.target.set(0,16,-n*.06),p.enableDamping=!0,p.dampingFactor=.06,p.maxPolarAngle=Math.PI*.495,p.minDistance=40,p.maxDistance=n*3.2,p.autoRotate=e.autoRotate,p.autoRotateSpeed=.55;const m=new SE(16777215,2.5);m.castShadow=!0;const _=n*1.4;m.shadow.camera.left=-_,m.shadow.camera.right=_,m.shadow.camera.top=_,m.shadow.camera.bottom=-_,m.shadow.camera.far=n*5,m.shadow.mapSize.set(2048,2048),m.shadow.bias=-6e-4,f.add(m,m.target);const v=new vE(12573183,9075302,.9);f.add(v),f.add(new ME(16777215,.12));const x=zE(n,e.peakHeight,r),S={x:n*.5,z:n*.44},T=8+e.peakHeight*.62,A=8+e.peakHeight*.3,y=(D,V)=>x[V*n+D],g=new Jr(1,1,1),L=new rn,U=-n/2,R=-n/2;let Q=0;const B=[];for(let D=0;D<n;D++)for(let V=0;V<n;V++){const se=y(V,D),K=[];V>0&&K.push(y(V-1,D)),V<n-1&&K.push(y(V+1,D)),D>0&&K.push(y(V,D-1)),D<n-1&&K.push(y(V,D+1));let Te=K.length?Math.min(...K):0;(V===0||D===0||V===n-1||D===n-1)&&(Te=Math.min(Te,1));for(let ye=Te;ye<=se;ye++){const Ce=ye===se?HE(ye,a,T,A,V,D,r):new et().setHSL(.07,.18,.24+Ft(V+ye,D-ye,r)*.06);B.push({x:V+U,y:ye,z:D+R,c:Ce,s:1})}}const F=new Qn(new Jr(n+6,4,n+6),new Go({color:4866617}));F.position.y=-2.5,F.receiveShadow=!0,f.add(F);const Y=[];for(let D=0;D<n;D++)for(let V=0;V<n;V++)y(V,D)<=a&&Y.push({x:V,z:D});const P=new Go({color:4169688,transparent:!0,opacity:.82}),C=new Al(g,P,Math.max(1,Y.length));Y.forEach((D,V)=>{L.position.set(D.x+U,a+.45,D.z+R),L.scale.set(1,.5,1),L.rotation.set(0,0,0),L.updateMatrix(),C.setMatrixAt(V,L.matrix)}),C.receiveShadow=!0,f.add(C);const z=BE(x,n,S,e.waterfallCount,a,r),le=[];z.forEach((D,V)=>{for(let K=0;K<D.length;K++){const Te=D[K],ye=D[Math.min(D.length-1,K+1)];let Ce=ye.x-Te.x,Je=ye.z-Te.z;!Ce&&!Je&&(Ce=0,Je=1);const _e=Math.hypot(Ce,Je),be=-Je/_e,Ie=Ce/_e,ze=Math.floor(e.fallWidth/2);for(let Pe=-ze;Pe<=ze;Pe++){const ut=eo(Math.round(Te.x+be*Pe),0,n-1),tt=eo(Math.round(Te.z+Ie*Pe),0,n-1),vt=Math.max(y(ut,tt),Te.h);le.push({x:ut+U,y:vt+.85,z:tt+R,phase:(K/D.length+V*.37+Math.abs(Pe)*.05)%1}),K>0&&Te.h<D[K-1].h-1&&le.push({x:ut+U,y:vt+1.8,z:tt+R,phase:(K/D.length+.5+V*.37)%1})}}const se=D[D.length-1];for(let K=0;K<26;K++){const Te=Ft(K,V,r)*Math.PI*2,ye=1+Ft(K,V+9,r)*(e.fallWidth*.9+1.5);le.push({x:se.x+U+Math.cos(Te)*ye,y:a+.7,z:se.z+R+Math.sin(Te)*ye,phase:Ft(K,V+3,r),foam:!0})}});const te=new Go({color:16777215,transparent:!0,opacity:.88}),fe=new Al(g,te,Math.max(1,le.length)),me=le.map(D=>({...D})),ue=new et(15398911),he=new et(6210287),k=new et;le.forEach((D,V)=>{L.position.set(D.x,D.y,D.z),L.scale.set(.96,D.foam?.55:.96,.96),L.rotation.set(0,0,0),L.updateMatrix(),fe.setMatrixAt(V,L.matrix),fe.setColorAt(V,D.foam?ue:he)}),f.add(fe);const ce=[],oe=a+2+e.peakHeight*.22,N=Math.round(e.treeDensity*320);let re=0,Fe=0;for(;Fe<N&&re++<N*40;){const D=Math.floor(Ft(re,1,r)*n),V=Math.floor(Ft(re,77,r+5)*n),se=y(D,V);if(se<a+2||se>oe)continue;let K=!1;for(const Ie of z){for(let ze=0;ze<Ie.length;ze+=4)if(Math.abs(Ie[ze].x-D)+Math.abs(Ie[ze].z-V)<4){K=!0;break}if(K)break}if(K||Math.abs(y(Math.min(n-1,D+1),V)-se)+Math.abs(y(D,Math.min(n-1,V+1))-se)>3)continue;const ye=Ft(D,V,r+11),Ce=3+Math.floor(ye*2),Je=new et().setHSL(.3+ye*.06,.5,.28+ye*.08),_e=new et(7031342);for(let Ie=1;Ie<=Ce;Ie++)ce.push({x:D+U,y:se+Ie,z:V+R,c:_e});const be=se+Ce;for(let Ie=0;Ie<2;Ie++)for(let ze=-2;ze<=2;ze++)for(let Pe=-2;Pe<=2;Pe++)Math.abs(ze)===2&&Math.abs(Pe)===2||Ie===1&&Math.abs(ze)+Math.abs(Pe)>2||ce.push({x:D+U+ze,y:be+Ie,z:V+R+Pe,c:Je});ce.push({x:D+U,y:be+2,z:V+R,c:Je}),Fe++}const Z=[];for(let D=0;D<1400;D++){const V=Math.floor(Ft(D,5,r+21)*n),se=Math.floor(Ft(D,9,r+22)*n),K=y(V,se);K<a+2||K>oe+2||Z.push({x:V+U,y:K+1,z:se+R,c:new et().setHSL(.26+Ft(D,3,r)*.08,.55,.35)})}const de=e.cloudHeight,Se=[],xe=8+Math.round(e.cloudAmount*10);for(let D=0;D<xe;D++){const V=Ft(D,2,r+31)*Math.PI*2,se=n*(.18+Ft(D,4,r+32)*.3),K=Math.cos(V)*se,Te=Math.sin(V)*se*.9,ye=de+(Ft(D,6,r+33)-.5)*7,Ce=9+Ft(D,8,r+34)*10,Je=1.6+Ft(D,10,r+35)*1.4,_e=6+Ft(D,12,r+36)*7;for(let be=-3;be<=3;be++)for(let Ie=-Math.ceil(Ce);Ie<=Math.ceil(Ce);Ie++)for(let ze=-Math.ceil(_e);ze<=Math.ceil(_e);ze++)Ie*Ie/(Ce*Ce)+be*be/(Je*Je)+ze*ze/(_e*_e)>1||Ft(Ie+D*57,ze*3+be*7,r+40)<.24||Se.push({x:K+Ie,y:ye+be,z:Te+ze,cloud:D})}const Re=B.concat(ce,Z);Q=Re.length+le.length+Se.length+Y.length;const ke=new Go({color:16777215}),Ke=new Al(g,ke,Re.length);Re.forEach((D,V)=>{L.position.set(D.x,D.y,D.z),L.scale.set(1,1,1),L.rotation.set(0,0,0),L.updateMatrix(),Ke.setMatrixAt(V,L.matrix),Ke.setColorAt(V,D.c)}),Ke.castShadow=!0,Ke.receiveShadow=!0,f.add(Ke);const At=new Go({color:16777215,transparent:!0,opacity:.82,depthWrite:!1,emissive:9345448,emissiveIntensity:.45}),at=new Al(g,At,Math.max(1,Se.length)),Rt=Se.map(D=>D.x);Se.forEach((D,V)=>{L.position.set(D.x,D.y,D.z);const se=.9+Ft(V,V,r+50)*.5;L.scale.set(se,se*.75,se),L.rotation.set(0,0,0),L.updateMatrix(),at.setMatrixAt(V,L.matrix),k.setHSL(.58,.08,.9+Ft(V,7,r)*.08),at.setColorAt(V,k)}),f.add(at);function W(D){const V=Gf[D]||Gf.morning;m.color.set(V.sun),m.intensity=V.sunI,m.position.set(...V.sunPos),v.color.set(V.hemiSky),v.groundColor.set(V.hemiGround),v.intensity=V.hemiI,f.background=new et(V.sky),f.fog=new nh(V.fog,V.fogNear,V.fogFar)}W(e.timeOfDay);const sn=new EE;let lt={flowSpeed:e.flowSpeed,cloudSpeed:e.cloudSpeed},ft=0,$e=0,Mt=0,We=0;function b(){Mt=requestAnimationFrame(b);const D=Math.min(sn.getDelta(),.05);We+=D,ft++,ft%20===0&&($e=Math.round(1/Math.max(D,1e-4)));for(let se=0;se<le.length;se++){const K=me[se];if(K.foam){const Te=(We*1.4+K.phase)%1;L.position.set(K.x,K.y+Math.sin((Te+K.phase)*6.28)*.18,K.z),L.scale.set(.96,.55,.96)}else{const Te=(K.phase+We*lt.flowSpeed*.35)%1;L.position.set(K.x,K.y-Te*.45,K.z),L.scale.set(.96,.96,.96),k.lerpColors(he,ue,Te<.5?Te*1.4:(1-Te)*1.4),k.offsetHSL(0,0,Te*.06),fe.setColorAt(se,k)}L.rotation.set(0,0,0),L.updateMatrix(),fe.setMatrixAt(se,L.matrix)}fe.instanceMatrix.needsUpdate=!0,fe.instanceColor&&(fe.instanceColor.needsUpdate=!0);const V=n+90;for(let se=0;se<Se.length;se++){const K=Se[se];let Te=Rt[se]+We*lt.cloudSpeed;Te=((Te+V/2)%V+V)%V-V/2,L.position.set(Te,K.y,K.z);const ye=.9+Ft(se,se,r+50)*.5;L.scale.set(ye,ye*.75,ye),L.rotation.set(0,0,0),L.updateMatrix(),at.setMatrixAt(se,L.matrix)}at.instanceMatrix.needsUpdate=!0,p.update(),u.render(f,h)}b();function E(){const D=s.clientWidth,V=s.clientHeight;h.aspect=D/V,h.updateProjectionMatrix(),u.setSize(D,V)}return window.addEventListener("resize",E),{totalVoxels:Q,grid:n,setLive(D){lt={...lt,...D},p.autoRotate=D.autoRotate??p.autoRotate,D.timeOfDay&&W(D.timeOfDay)},getFps:()=>$e,dispose(){cancelAnimationFrame(Mt),window.removeEventListener("resize",E),p.dispose(),f.traverse(D=>{D.geometry&&D.geometry!==g&&D.geometry.dispose(),D.material&&(Array.isArray(D.material)?D.material:[D.material]).forEach(V=>V.dispose())}),g.dispose(),u.dispose(),s.removeChild(u.domElement)}}}const GE=["grid","peakHeight","waterfallCount","fallWidth","cloudAmount","cloudHeight","treeDensity"];function WE(){const s=_r.useRef(null),e=_r.useRef(null),[n,r]=_r.useState({grid:200,peakHeight:44,waterfallCount:2,fallWidth:3,flowSpeed:1,cloudAmount:.7,cloudHeight:34,cloudSpeed:1.2,treeDensity:.8,timeOfDay:"morning",autoRotate:!0}),[a,u]=_r.useState({voxels:0,fps:0}),[f,h]=_r.useState(0),p=GE.map(v=>n[v]).join("|");_r.useEffect(()=>{const v=s.current;if(!v)return;const x=VE(v,n);e.current=x,u({voxels:x.totalVoxels,fps:0}),h(T=>T+1);const S=setInterval(()=>{u(T=>({...T,fps:x.getFps()}))},800);return()=>{clearInterval(S),x.dispose(),e.current=null}},[p]),_r.useEffect(()=>{var v;(v=e.current)==null||v.setLive({flowSpeed:n.flowSpeed,cloudSpeed:n.cloudSpeed,timeOfDay:n.timeOfDay,autoRotate:n.autoRotate})},[n.flowSpeed,n.cloudSpeed,n.timeOfDay,n.autoRotate]);const m=v=>x=>{const S=x.target.type==="checkbox"?x.target.checked:x.target.value;r(T=>({...T,[v]:x.target.type==="checkbox"?S:x.target.type==="number"?Number(S):S}))},_=v=>x=>r(S=>({...S,[v]:Number(x.target.value)}));return st.jsxs("div",{className:"stage",children:[st.jsx("div",{ref:s,className:"viewport"}),st.jsxs("header",{className:"title",children:[st.jsxs("h1",{children:["体素山水 ",st.jsx("span",{children:"Voxel Waterfall"})]}),st.jsxs("p",{children:[n.grid,"×",n.grid," 体素地形 · 体素总数 ",a.voxels.toLocaleString()," · ",a.fps," FPS"]})]}),st.jsxs("aside",{className:"panel",children:[st.jsx("h2",{children:"场景调整"}),st.jsxs("label",{children:["地形尺寸",st.jsxs("select",{value:n.grid,onChange:_("grid"),children:[st.jsx("option",{value:120,children:"120×120（流畅）"}),st.jsx("option",{value:160,children:"160×160（均衡）"}),st.jsx("option",{value:200,children:"200×200（完整）"})]})]}),st.jsxs("label",{children:["主峰高度 ",st.jsx("b",{children:n.peakHeight}),st.jsx("input",{type:"range",min:24,max:60,step:1,value:n.peakHeight,onChange:_("peakHeight")})]}),st.jsxs("label",{children:["瀑布数量 ",st.jsx("b",{children:n.waterfallCount}),st.jsx("input",{type:"range",min:1,max:3,step:1,value:n.waterfallCount,onChange:_("waterfallCount")})]}),st.jsxs("label",{children:["瀑布宽度 ",st.jsx("b",{children:n.fallWidth}),st.jsx("input",{type:"range",min:1,max:7,step:2,value:n.fallWidth,onChange:_("fallWidth")})]}),st.jsxs("label",{children:["水流速度 ",st.jsx("b",{children:n.flowSpeed.toFixed(1)}),st.jsx("input",{type:"range",min:0,max:3,step:.1,value:n.flowSpeed,onChange:_("flowSpeed")})]}),st.jsxs("label",{children:["云量 ",st.jsxs("b",{children:[Math.round(n.cloudAmount*100),"%"]}),st.jsx("input",{type:"range",min:0,max:1,step:.05,value:n.cloudAmount,onChange:_("cloudAmount")})]}),st.jsxs("label",{children:["云层高度 ",st.jsx("b",{children:n.cloudHeight}),st.jsx("input",{type:"range",min:22,max:48,step:1,value:n.cloudHeight,onChange:_("cloudHeight")})]}),st.jsxs("label",{children:["云漂移速度 ",st.jsx("b",{children:n.cloudSpeed.toFixed(1)}),st.jsx("input",{type:"range",min:0,max:4,step:.1,value:n.cloudSpeed,onChange:_("cloudSpeed")})]}),st.jsxs("label",{children:["植被密度 ",st.jsxs("b",{children:[Math.round(n.treeDensity*100),"%"]}),st.jsx("input",{type:"range",min:0,max:1,step:.05,value:n.treeDensity,onChange:_("treeDensity")})]}),st.jsxs("label",{children:["时段",st.jsx("select",{value:n.timeOfDay,onChange:m("timeOfDay"),children:Object.entries(Gf).map(([v,x])=>st.jsx("option",{value:v,children:x.label},v))})]}),st.jsxs("label",{className:"row",children:[st.jsx("input",{type:"checkbox",checked:n.autoRotate,onChange:m("autoRotate")}),"自动环绕"]}),st.jsx("p",{className:"hint",children:"拖拽旋转 · 滚轮缩放 · 右键平移"})]})]})}dv.createRoot(document.getElementById("root")).render(st.jsx(av.StrictMode,{children:st.jsx(WE,{})}));
