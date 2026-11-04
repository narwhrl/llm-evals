(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(a){if(a.ep)return;a.ep=!0;const u=n(a);fetch(a.href,u)}})();function j_(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var hc={exports:{}},Io={},pc={exports:{}},dt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _p;function Y_(){if(_p)return dt;_p=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),y=Symbol.iterator;function x(I){return I===null||typeof I!="object"?null:(I=y&&I[y]||I["@@iterator"],typeof I=="function"?I:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,w={};function _(I,ne,Ie){this.props=I,this.context=ne,this.refs=w,this.updater=Ie||S}_.prototype.isReactComponent={},_.prototype.setState=function(I,ne){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,ne,"setState")},_.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function g(){}g.prototype=_.prototype;function U(I,ne,Ie){this.props=I,this.context=ne,this.refs=w,this.updater=Ie||S}var L=U.prototype=new g;L.constructor=U,A(L,_.prototype),L.isPureReactComponent=!0;var R=Array.isArray,X=Object.prototype.hasOwnProperty,N={current:null},F={key:!0,ref:!0,__self:!0,__source:!0};function j(I,ne,Ie){var $,ue={},Me=null,ve=null;if(ne!=null)for($ in ne.ref!==void 0&&(ve=ne.ref),ne.key!==void 0&&(Me=""+ne.key),ne)X.call(ne,$)&&!F.hasOwnProperty($)&&(ue[$]=ne[$]);var Ae=arguments.length-2;if(Ae===1)ue.children=Ie;else if(1<Ae){for(var Ue=Array(Ae),Ze=0;Ze<Ae;Ze++)Ue[Ze]=arguments[Ze+2];ue.children=Ue}if(I&&I.defaultProps)for($ in Ae=I.defaultProps,Ae)ue[$]===void 0&&(ue[$]=Ae[$]);return{$$typeof:s,type:I,key:Me,ref:ve,props:ue,_owner:N.current}}function b(I,ne){return{$$typeof:s,type:I.type,key:ne,ref:I.ref,props:I.props,_owner:I._owner}}function T(I){return typeof I=="object"&&I!==null&&I.$$typeof===s}function k(I){var ne={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(Ie){return ne[Ie]})}var re=/\/+/g;function Q(I,ne){return typeof I=="object"&&I!==null&&I.key!=null?k(""+I.key):ne.toString(36)}function fe(I,ne,Ie,$,ue){var Me=typeof I;(Me==="undefined"||Me==="boolean")&&(I=null);var ve=!1;if(I===null)ve=!0;else switch(Me){case"string":case"number":ve=!0;break;case"object":switch(I.$$typeof){case s:case e:ve=!0}}if(ve)return ve=I,ue=ue(ve),I=$===""?"."+Q(ve,0):$,R(ue)?(Ie="",I!=null&&(Ie=I.replace(re,"$&/")+"/"),fe(ue,ne,Ie,"",function(Ze){return Ze})):ue!=null&&(T(ue)&&(ue=b(ue,Ie+(!ue.key||ve&&ve.key===ue.key?"":(""+ue.key).replace(re,"$&/")+"/")+I)),ne.push(ue)),1;if(ve=0,$=$===""?".":$+":",R(I))for(var Ae=0;Ae<I.length;Ae++){Me=I[Ae];var Ue=$+Q(Me,Ae);ve+=fe(Me,ne,Ie,Ue,ue)}else if(Ue=x(I),typeof Ue=="function")for(I=Ue.call(I),Ae=0;!(Me=I.next()).done;)Me=Me.value,Ue=$+Q(Me,Ae++),ve+=fe(Me,ne,Ie,Ue,ue);else if(Me==="object")throw ne=String(I),Error("Objects are not valid as a React child (found: "+(ne==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":ne)+"). If you meant to render a collection of children, use an array instead.");return ve}function he(I,ne,Ie){if(I==null)return I;var $=[],ue=0;return fe(I,$,"","",function(Me){return ne.call(Ie,Me,ue++)}),$}function oe(I){if(I._status===-1){var ne=I._result;ne=ne(),ne.then(function(Ie){(I._status===0||I._status===-1)&&(I._status=1,I._result=Ie)},function(Ie){(I._status===0||I._status===-1)&&(I._status=2,I._result=Ie)}),I._status===-1&&(I._status=0,I._result=ne)}if(I._status===1)return I._result.default;throw I._result}var le={current:null},z={transition:null},ae={ReactCurrentDispatcher:le,ReactCurrentBatchConfig:z,ReactCurrentOwner:N};function se(){throw Error("act(...) is not supported in production builds of React.")}return dt.Children={map:he,forEach:function(I,ne,Ie){he(I,function(){ne.apply(this,arguments)},Ie)},count:function(I){var ne=0;return he(I,function(){ne++}),ne},toArray:function(I){return he(I,function(ne){return ne})||[]},only:function(I){if(!T(I))throw Error("React.Children.only expected to receive a single React element child.");return I}},dt.Component=_,dt.Fragment=n,dt.Profiler=a,dt.PureComponent=U,dt.StrictMode=r,dt.Suspense=p,dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ae,dt.act=se,dt.cloneElement=function(I,ne,Ie){if(I==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+I+".");var $=A({},I.props),ue=I.key,Me=I.ref,ve=I._owner;if(ne!=null){if(ne.ref!==void 0&&(Me=ne.ref,ve=N.current),ne.key!==void 0&&(ue=""+ne.key),I.type&&I.type.defaultProps)var Ae=I.type.defaultProps;for(Ue in ne)X.call(ne,Ue)&&!F.hasOwnProperty(Ue)&&($[Ue]=ne[Ue]===void 0&&Ae!==void 0?Ae[Ue]:ne[Ue])}var Ue=arguments.length-2;if(Ue===1)$.children=Ie;else if(1<Ue){Ae=Array(Ue);for(var Ze=0;Ze<Ue;Ze++)Ae[Ze]=arguments[Ze+2];$.children=Ae}return{$$typeof:s,type:I.type,key:ue,ref:Me,props:$,_owner:ve}},dt.createContext=function(I){return I={$$typeof:f,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},I.Provider={$$typeof:u,_context:I},I.Consumer=I},dt.createElement=j,dt.createFactory=function(I){var ne=j.bind(null,I);return ne.type=I,ne},dt.createRef=function(){return{current:null}},dt.forwardRef=function(I){return{$$typeof:d,render:I}},dt.isValidElement=T,dt.lazy=function(I){return{$$typeof:v,_payload:{_status:-1,_result:I},_init:oe}},dt.memo=function(I,ne){return{$$typeof:m,type:I,compare:ne===void 0?null:ne}},dt.startTransition=function(I){var ne=z.transition;z.transition={};try{I()}finally{z.transition=ne}},dt.unstable_act=se,dt.useCallback=function(I,ne){return le.current.useCallback(I,ne)},dt.useContext=function(I){return le.current.useContext(I)},dt.useDebugValue=function(){},dt.useDeferredValue=function(I){return le.current.useDeferredValue(I)},dt.useEffect=function(I,ne){return le.current.useEffect(I,ne)},dt.useId=function(){return le.current.useId()},dt.useImperativeHandle=function(I,ne,Ie){return le.current.useImperativeHandle(I,ne,Ie)},dt.useInsertionEffect=function(I,ne){return le.current.useInsertionEffect(I,ne)},dt.useLayoutEffect=function(I,ne){return le.current.useLayoutEffect(I,ne)},dt.useMemo=function(I,ne){return le.current.useMemo(I,ne)},dt.useReducer=function(I,ne,Ie){return le.current.useReducer(I,ne,Ie)},dt.useRef=function(I){return le.current.useRef(I)},dt.useState=function(I){return le.current.useState(I)},dt.useSyncExternalStore=function(I,ne,Ie){return le.current.useSyncExternalStore(I,ne,Ie)},dt.useTransition=function(){return le.current.useTransition()},dt.version="18.3.1",dt}var vp;function kf(){return vp||(vp=1,pc.exports=Y_()),pc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xp;function q_(){if(xp)return Io;xp=1;var s=kf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function f(d,p,m){var v,y={},x=null,S=null;m!==void 0&&(x=""+m),p.key!==void 0&&(x=""+p.key),p.ref!==void 0&&(S=p.ref);for(v in p)r.call(p,v)&&!u.hasOwnProperty(v)&&(y[v]=p[v]);if(d&&d.defaultProps)for(v in p=d.defaultProps,p)y[v]===void 0&&(y[v]=p[v]);return{$$typeof:e,type:d,key:x,ref:S,props:y,_owner:a.current}}return Io.Fragment=n,Io.jsx=f,Io.jsxs=f,Io}var yp;function K_(){return yp||(yp=1,hc.exports=q_()),hc.exports}var we=K_(),Xt=kf(),Qa={},mc={exports:{}},Rn={},gc={exports:{}},_c={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp;function $_(){return Sp||(Sp=1,(function(s){function e(z,ae){var se=z.length;z.push(ae);e:for(;0<se;){var I=se-1>>>1,ne=z[I];if(0<a(ne,ae))z[I]=ae,z[se]=ne,se=I;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var ae=z[0],se=z.pop();if(se!==ae){z[0]=se;e:for(var I=0,ne=z.length,Ie=ne>>>1;I<Ie;){var $=2*(I+1)-1,ue=z[$],Me=$+1,ve=z[Me];if(0>a(ue,se))Me<ne&&0>a(ve,ue)?(z[I]=ve,z[Me]=se,I=Me):(z[I]=ue,z[$]=se,I=$);else if(Me<ne&&0>a(ve,se))z[I]=ve,z[Me]=se,I=Me;else break e}}return ae}function a(z,ae){var se=z.sortIndex-ae.sortIndex;return se!==0?se:z.id-ae.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;s.unstable_now=function(){return u.now()}}else{var f=Date,d=f.now();s.unstable_now=function(){return f.now()-d}}var p=[],m=[],v=1,y=null,x=3,S=!1,A=!1,w=!1,_=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function L(z){for(var ae=n(m);ae!==null;){if(ae.callback===null)r(m);else if(ae.startTime<=z)r(m),ae.sortIndex=ae.expirationTime,e(p,ae);else break;ae=n(m)}}function R(z){if(w=!1,L(z),!A)if(n(p)!==null)A=!0,oe(X);else{var ae=n(m);ae!==null&&le(R,ae.startTime-z)}}function X(z,ae){A=!1,w&&(w=!1,g(j),j=-1),S=!0;var se=x;try{for(L(ae),y=n(p);y!==null&&(!(y.expirationTime>ae)||z&&!k());){var I=y.callback;if(typeof I=="function"){y.callback=null,x=y.priorityLevel;var ne=I(y.expirationTime<=ae);ae=s.unstable_now(),typeof ne=="function"?y.callback=ne:y===n(p)&&r(p),L(ae)}else r(p);y=n(p)}if(y!==null)var Ie=!0;else{var $=n(m);$!==null&&le(R,$.startTime-ae),Ie=!1}return Ie}finally{y=null,x=se,S=!1}}var N=!1,F=null,j=-1,b=5,T=-1;function k(){return!(s.unstable_now()-T<b)}function re(){if(F!==null){var z=s.unstable_now();T=z;var ae=!0;try{ae=F(!0,z)}finally{ae?Q():(N=!1,F=null)}}else N=!1}var Q;if(typeof U=="function")Q=function(){U(re)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,he=fe.port2;fe.port1.onmessage=re,Q=function(){he.postMessage(null)}}else Q=function(){_(re,0)};function oe(z){F=z,N||(N=!0,Q())}function le(z,ae){j=_(function(){z(s.unstable_now())},ae)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_continueExecution=function(){A||S||(A=!0,oe(X))},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return n(p)},s.unstable_next=function(z){switch(x){case 1:case 2:case 3:var ae=3;break;default:ae=x}var se=x;x=ae;try{return z()}finally{x=se}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(z,ae){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var se=x;x=z;try{return ae()}finally{x=se}},s.unstable_scheduleCallback=function(z,ae,se){var I=s.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?I+se:I):se=I,z){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=se+ne,z={id:v++,callback:ae,priorityLevel:z,startTime:se,expirationTime:ne,sortIndex:-1},se>I?(z.sortIndex=se,e(m,z),n(p)===null&&z===n(m)&&(w?(g(j),j=-1):w=!0,le(R,se-I))):(z.sortIndex=ne,e(p,z),A||S||(A=!0,oe(X))),z},s.unstable_shouldYield=k,s.unstable_wrapCallback=function(z){var ae=x;return function(){var se=x;x=ae;try{return z.apply(this,arguments)}finally{x=se}}}})(_c)),_c}var Mp;function Z_(){return Mp||(Mp=1,gc.exports=$_()),gc.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ep;function Q_(){if(Ep)return Rn;Ep=1;var s=kf(),e=Z_();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function u(t,i){f(t,i),f(t+"Capture",i)}function f(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},y={};function x(t){return p.call(y,t)?!0:p.call(v,t)?!1:m.test(t)?y[t]=!0:(v[t]=!0,!1)}function S(t,i,o,l){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return l?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function A(t,i,o,l){if(i===null||typeof i>"u"||S(t,i,o,l))return!0;if(l)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function w(t,i,o,l,c,h,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=l,this.attributeNamespace=c,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=h,this.removeEmptyString=M}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){_[t]=new w(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];_[i]=new w(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){_[t]=new w(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){_[t]=new w(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){_[t]=new w(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){_[t]=new w(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){_[t]=new w(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){_[t]=new w(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){_[t]=new w(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function U(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,U);_[i]=new w(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,U);_[i]=new w(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,U);_[i]=new w(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){_[t]=new w(t,1,!1,t.toLowerCase(),null,!1,!1)}),_.xlinkHref=new w("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){_[t]=new w(t,1,!1,t.toLowerCase(),null,!0,!0)});function L(t,i,o,l){var c=_.hasOwnProperty(i)?_[i]:null;(c!==null?c.type!==0:l||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(A(i,o,c,l)&&(o=null),l||c===null?x(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):c.mustUseProperty?t[c.propertyName]=o===null?c.type===3?!1:"":o:(i=c.attributeName,l=c.attributeNamespace,o===null?t.removeAttribute(i):(c=c.type,o=c===3||c===4&&o===!0?"":""+o,l?t.setAttributeNS(l,i,o):t.setAttribute(i,o))))}var R=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,X=Symbol.for("react.element"),N=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),T=Symbol.for("react.provider"),k=Symbol.for("react.context"),re=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),fe=Symbol.for("react.suspense_list"),he=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),le=Symbol.for("react.offscreen"),z=Symbol.iterator;function ae(t){return t===null||typeof t!="object"?null:(t=z&&t[z]||t["@@iterator"],typeof t=="function"?t:null)}var se=Object.assign,I;function ne(t){if(I===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);I=i&&i[1]||""}return`
`+I+t}var Ie=!1;function $(t,i){if(!t||Ie)return"";Ie=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(J){var l=J}Reflect.construct(t,[],i)}else{try{i.call()}catch(J){l=J}t.call(i.prototype)}else{try{throw Error()}catch(J){l=J}t()}}catch(J){if(J&&l&&typeof J.stack=="string"){for(var c=J.stack.split(`
`),h=l.stack.split(`
`),M=c.length-1,D=h.length-1;1<=M&&0<=D&&c[M]!==h[D];)D--;for(;1<=M&&0<=D;M--,D--)if(c[M]!==h[D]){if(M!==1||D!==1)do if(M--,D--,0>D||c[M]!==h[D]){var O=`
`+c[M].replace(" at new "," at ");return t.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",t.displayName)),O}while(1<=M&&0<=D);break}}}finally{Ie=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?ne(t):""}function ue(t){switch(t.tag){case 5:return ne(t.type);case 16:return ne("Lazy");case 13:return ne("Suspense");case 19:return ne("SuspenseList");case 0:case 2:case 15:return t=$(t.type,!1),t;case 11:return t=$(t.type.render,!1),t;case 1:return t=$(t.type,!0),t;default:return""}}function Me(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case F:return"Fragment";case N:return"Portal";case b:return"Profiler";case j:return"StrictMode";case Q:return"Suspense";case fe:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case k:return(t.displayName||"Context")+".Consumer";case T:return(t._context.displayName||"Context")+".Provider";case re:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case he:return i=t.displayName||null,i!==null?i:Me(t.type)||"Memo";case oe:i=t._payload,t=t._init;try{return Me(t(i))}catch{}}return null}function ve(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Me(i);case 8:return i===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Ae(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ue(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ze(t){var i=Ue(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),l=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,h=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return c.call(this)},set:function(M){l=""+M,h.call(this,M)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return l},setValue:function(M){l=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function At(t){t._valueTracker||(t._valueTracker=Ze(t))}function pt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),l="";return t&&(l=Ue(t)?t.checked?"true":"false":t.value),t=l,t!==o?(i.setValue(t),!0):!1}function Dt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function W(t,i){var o=i.checked;return se({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function pn(t,i){var o=i.defaultValue==null?"":i.defaultValue,l=i.checked!=null?i.checked:i.defaultChecked;o=Ae(i.value!=null?i.value:o),t._wrapperState={initialChecked:l,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function ht(t,i){i=i.checked,i!=null&&L(t,"checked",i,!1)}function ct(t,i){ht(t,i);var o=Ae(i.value),l=i.type;if(o!=null)l==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(l==="submit"||l==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?Tt(t,i.type,o):i.hasOwnProperty("defaultValue")&&Tt(t,i.type,Ae(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function qe(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var l=i.type;if(!(l!=="submit"&&l!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function Tt(t,i,o){(i!=="number"||Dt(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var Ye=Array.isArray;function P(t,i,o,l){if(t=t.options,i){i={};for(var c=0;c<o.length;c++)i["$"+o[c]]=!0;for(o=0;o<t.length;o++)c=i.hasOwnProperty("$"+t[o].value),t[o].selected!==c&&(t[o].selected=c),c&&l&&(t[o].defaultSelected=!0)}else{for(o=""+Ae(o),i=null,c=0;c<t.length;c++){if(t[c].value===o){t[c].selected=!0,l&&(t[c].defaultSelected=!0);return}i!==null||t[c].disabled||(i=t[c])}i!==null&&(i.selected=!0)}}function E(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return se({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function K(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(Ye(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:Ae(o)}}function pe(t,i){var o=Ae(i.value),l=Ae(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),l!=null&&(t.defaultValue=""+l)}function ge(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function ce(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?ce(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ce,Ne=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,l,c){MSApp.execUnsafeLocalFunction(function(){return t(i,o,l,c)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(Ce=Ce||document.createElement("div"),Ce.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ce.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function ut(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var ye={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Oe=["Webkit","ms","Moz","O"];Object.keys(ye).forEach(function(t){Oe.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),ye[i]=ye[t]})});function Qe(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||ye.hasOwnProperty(t)&&ye[t]?(""+i).trim():i+"px"}function Je(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var l=o.indexOf("--")===0,c=Qe(o,i[o],l);o==="float"&&(o="cssFloat"),l?t.setProperty(o,c):t[o]=c}}var ke=se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ft(t,i){if(i){if(ke[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function it(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Et=null;function V(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Re=null,ie=null,de=null;function De(t){if(t=vo(t)){if(typeof Re!="function")throw Error(n(280));var i=t.stateNode;i&&(i=ha(i),Re(t.stateNode,t.type,i))}}function Pe(t){ie?de?de.push(t):de=[t]:ie=t}function rt(){if(ie){var t=ie,i=de;if(de=ie=null,De(t),i)for(t=0;t<i.length;t++)De(i[t])}}function It(t,i){return t(i)}function jt(){}var _t=!1;function Sn(t,i,o){if(_t)return t(i,o);_t=!0;try{return It(t,i,o)}finally{_t=!1,(ie!==null||de!==null)&&(jt(),rt())}}function mn(t,i){var o=t.stateNode;if(o===null)return null;var l=ha(o);if(l===null)return null;o=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var ns=!1;if(d)try{var Yi={};Object.defineProperty(Yi,"passive",{get:function(){ns=!0}}),window.addEventListener("test",Yi,Yi),window.removeEventListener("test",Yi,Yi)}catch{ns=!1}function Ti(t,i,o,l,c,h,M,D,O){var J=Array.prototype.slice.call(arguments,3);try{i.apply(o,J)}catch(_e){this.onError(_e)}}var wi=!1,wr=null,Ar=!1,qi=null,Yo={onError:function(t){wi=!0,wr=t}};function is(t,i,o,l,c,h,M,D,O){wi=!1,wr=null,Ti.apply(Yo,arguments)}function qo(t,i,o,l,c,h,M,D,O){if(is.apply(this,arguments),wi){if(wi){var J=wr;wi=!1,wr=null}else throw Error(n(198));Ar||(Ar=!0,qi=J)}}function mi(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Ko(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function $o(t){if(mi(t)!==t)throw Error(n(188))}function Nl(t){var i=t.alternate;if(!i){if(i=mi(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,l=i;;){var c=o.return;if(c===null)break;var h=c.alternate;if(h===null){if(l=c.return,l!==null){o=l;continue}break}if(c.child===h.child){for(h=c.child;h;){if(h===o)return $o(c),t;if(h===l)return $o(c),i;h=h.sibling}throw Error(n(188))}if(o.return!==l.return)o=c,l=h;else{for(var M=!1,D=c.child;D;){if(D===o){M=!0,o=c,l=h;break}if(D===l){M=!0,l=c,o=h;break}D=D.sibling}if(!M){for(D=h.child;D;){if(D===o){M=!0,o=h,l=c;break}if(D===l){M=!0,l=h,o=c;break}D=D.sibling}if(!M)throw Error(n(189))}}if(o.alternate!==l)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function C(t){return t=Nl(t),t!==null?H(t):null}function H(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=H(t);if(i!==null)return i;t=t.sibling}return null}var ee=e.unstable_scheduleCallback,te=e.unstable_cancelCallback,G=e.unstable_shouldYield,Te=e.unstable_requestPaint,Se=e.unstable_now,Ge=e.unstable_getCurrentPriorityLevel,Be=e.unstable_ImmediatePriority,et=e.unstable_UserBlockingPriority,nt=e.unstable_NormalPriority,We=e.unstable_LowPriority,gt=e.unstable_IdlePriority,Mt=null,mt=null;function on(t){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(Mt,t,void 0,(t.current.flags&128)===128)}catch{}}var st=Math.clz32?Math.clz32:yt,je=Math.log,ei=Math.LN2;function yt(t){return t>>>=0,t===0?32:31-(je(t)/ei|0)|0}var an=64,ti=4194304;function Yt(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function gi(t,i){var o=t.pendingLanes;if(o===0)return 0;var l=0,c=t.suspendedLanes,h=t.pingedLanes,M=o&268435455;if(M!==0){var D=M&~c;D!==0?l=Yt(D):(h&=M,h!==0&&(l=Yt(h)))}else M=o&~c,M!==0?l=Yt(M):h!==0&&(l=Yt(h));if(l===0)return 0;if(i!==0&&i!==l&&(i&c)===0&&(c=l&-l,h=i&-i,c>=h||c===16&&(h&4194240)!==0))return i;if((l&4)!==0&&(l|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=l;0<i;)o=31-st(i),c=1<<o,l|=t[o],i&=~c;return l}function Pt(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Bn(t,i){for(var o=t.suspendedLanes,l=t.pingedLanes,c=t.expirationTimes,h=t.pendingLanes;0<h;){var M=31-st(h),D=1<<M,O=c[M];O===-1?((D&o)===0||(D&l)!==0)&&(c[M]=Pt(D,i)):O<=i&&(t.expiredLanes|=D),h&=~D}}function Ai(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function gn(){var t=an;return an<<=1,(an&4194240)===0&&(an=64),t}function Vn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function Mn(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-st(i),t[i]=o}function Zo(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var l=t.eventTimes;for(t=t.expirationTimes;0<o;){var c=31-st(o),h=1<<c;i[c]=0,l[c]=-1,t[c]=-1,o&=~h}}function Fl(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var l=31-st(o),c=1<<l;c&i|t[l]&i&&(t[l]|=i),o&=~c}}var wt=0;function Kf(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var $f,Ol,Zf,Qf,Jf,kl=!1,Qo=[],Ki=null,$i=null,Zi=null,to=new Map,no=new Map,Qi=[],pg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ed(t,i){switch(t){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":$i=null;break;case"mouseover":case"mouseout":Zi=null;break;case"pointerover":case"pointerout":to.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":no.delete(i.pointerId)}}function io(t,i,o,l,c,h){return t===null||t.nativeEvent!==h?(t={blockedOn:i,domEventName:o,eventSystemFlags:l,nativeEvent:h,targetContainers:[c]},i!==null&&(i=vo(i),i!==null&&Ol(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,c!==null&&i.indexOf(c)===-1&&i.push(c),t)}function mg(t,i,o,l,c){switch(i){case"focusin":return Ki=io(Ki,t,i,o,l,c),!0;case"dragenter":return $i=io($i,t,i,o,l,c),!0;case"mouseover":return Zi=io(Zi,t,i,o,l,c),!0;case"pointerover":var h=c.pointerId;return to.set(h,io(to.get(h)||null,t,i,o,l,c)),!0;case"gotpointercapture":return h=c.pointerId,no.set(h,io(no.get(h)||null,t,i,o,l,c)),!0}return!1}function td(t){var i=Cr(t.target);if(i!==null){var o=mi(i);if(o!==null){if(i=o.tag,i===13){if(i=Ko(o),i!==null){t.blockedOn=i,Jf(t.priority,function(){Zf(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Jo(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Bl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var l=new o.constructor(o.type,o);Et=l,o.target.dispatchEvent(l),Et=null}else return i=vo(o),i!==null&&Ol(i),t.blockedOn=o,!1;i.shift()}return!0}function nd(t,i,o){Jo(t)&&o.delete(i)}function gg(){kl=!1,Ki!==null&&Jo(Ki)&&(Ki=null),$i!==null&&Jo($i)&&($i=null),Zi!==null&&Jo(Zi)&&(Zi=null),to.forEach(nd),no.forEach(nd)}function ro(t,i){t.blockedOn===i&&(t.blockedOn=null,kl||(kl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,gg)))}function so(t){function i(c){return ro(c,t)}if(0<Qo.length){ro(Qo[0],t);for(var o=1;o<Qo.length;o++){var l=Qo[o];l.blockedOn===t&&(l.blockedOn=null)}}for(Ki!==null&&ro(Ki,t),$i!==null&&ro($i,t),Zi!==null&&ro(Zi,t),to.forEach(i),no.forEach(i),o=0;o<Qi.length;o++)l=Qi[o],l.blockedOn===t&&(l.blockedOn=null);for(;0<Qi.length&&(o=Qi[0],o.blockedOn===null);)td(o),o.blockedOn===null&&Qi.shift()}var rs=R.ReactCurrentBatchConfig,ea=!0;function _g(t,i,o,l){var c=wt,h=rs.transition;rs.transition=null;try{wt=1,zl(t,i,o,l)}finally{wt=c,rs.transition=h}}function vg(t,i,o,l){var c=wt,h=rs.transition;rs.transition=null;try{wt=4,zl(t,i,o,l)}finally{wt=c,rs.transition=h}}function zl(t,i,o,l){if(ea){var c=Bl(t,i,o,l);if(c===null)iu(t,i,l,ta,o),ed(t,l);else if(mg(c,t,i,o,l))l.stopPropagation();else if(ed(t,l),i&4&&-1<pg.indexOf(t)){for(;c!==null;){var h=vo(c);if(h!==null&&$f(h),h=Bl(t,i,o,l),h===null&&iu(t,i,l,ta,o),h===c)break;c=h}c!==null&&l.stopPropagation()}else iu(t,i,l,null,o)}}var ta=null;function Bl(t,i,o,l){if(ta=null,t=V(l),t=Cr(t),t!==null)if(i=mi(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Ko(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return ta=t,null}function id(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ge()){case Be:return 1;case et:return 4;case nt:case We:return 16;case gt:return 536870912;default:return 16}default:return 16}}var Ji=null,Vl=null,na=null;function rd(){if(na)return na;var t,i=Vl,o=i.length,l,c="value"in Ji?Ji.value:Ji.textContent,h=c.length;for(t=0;t<o&&i[t]===c[t];t++);var M=o-t;for(l=1;l<=M&&i[o-l]===c[h-l];l++);return na=c.slice(t,1<l?1-l:void 0)}function ia(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function ra(){return!0}function sd(){return!1}function In(t){function i(o,l,c,h,M){this._reactName=o,this._targetInst=c,this.type=l,this.nativeEvent=h,this.target=M,this.currentTarget=null;for(var D in t)t.hasOwnProperty(D)&&(o=t[D],this[D]=o?o(h):h[D]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?ra:sd,this.isPropagationStopped=sd,this}return se(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=ra)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=ra)},persist:function(){},isPersistent:ra}),i}var ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hl=In(ss),oo=se({},ss,{view:0,detail:0}),xg=In(oo),Gl,Wl,ao,sa=se({},oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jl,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ao&&(ao&&t.type==="mousemove"?(Gl=t.screenX-ao.screenX,Wl=t.screenY-ao.screenY):Wl=Gl=0,ao=t),Gl)},movementY:function(t){return"movementY"in t?t.movementY:Wl}}),od=In(sa),yg=se({},sa,{dataTransfer:0}),Sg=In(yg),Mg=se({},oo,{relatedTarget:0}),Xl=In(Mg),Eg=se({},ss,{animationName:0,elapsedTime:0,pseudoElement:0}),Tg=In(Eg),wg=se({},ss,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ag=In(wg),Cg=se({},ss,{data:0}),ad=In(Cg),Rg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},bg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Pg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Dg(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Pg[t])?!!i[t]:!1}function jl(){return Dg}var Lg=se({},oo,{key:function(t){if(t.key){var i=Rg[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=ia(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?bg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jl,charCode:function(t){return t.type==="keypress"?ia(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ia(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ig=In(Lg),Ug=se({},sa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ld=In(Ug),Ng=se({},oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jl}),Fg=In(Ng),Og=se({},ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),kg=In(Og),zg=se({},sa,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Bg=In(zg),Vg=[9,13,27,32],Yl=d&&"CompositionEvent"in window,lo=null;d&&"documentMode"in document&&(lo=document.documentMode);var Hg=d&&"TextEvent"in window&&!lo,ud=d&&(!Yl||lo&&8<lo&&11>=lo),cd=" ",fd=!1;function dd(t,i){switch(t){case"keyup":return Vg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hd(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var os=!1;function Gg(t,i){switch(t){case"compositionend":return hd(i);case"keypress":return i.which!==32?null:(fd=!0,cd);case"textInput":return t=i.data,t===cd&&fd?null:t;default:return null}}function Wg(t,i){if(os)return t==="compositionend"||!Yl&&dd(t,i)?(t=rd(),na=Vl=Ji=null,os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return ud&&i.locale!=="ko"?null:i.data;default:return null}}var Xg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pd(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Xg[t.type]:i==="textarea"}function md(t,i,o,l){Pe(l),i=ca(i,"onChange"),0<i.length&&(o=new Hl("onChange","change",null,o,l),t.push({event:o,listeners:i}))}var uo=null,co=null;function jg(t){Id(t,0)}function oa(t){var i=fs(t);if(pt(i))return t}function Yg(t,i){if(t==="change")return i}var gd=!1;if(d){var ql;if(d){var Kl="oninput"in document;if(!Kl){var _d=document.createElement("div");_d.setAttribute("oninput","return;"),Kl=typeof _d.oninput=="function"}ql=Kl}else ql=!1;gd=ql&&(!document.documentMode||9<document.documentMode)}function vd(){uo&&(uo.detachEvent("onpropertychange",xd),co=uo=null)}function xd(t){if(t.propertyName==="value"&&oa(co)){var i=[];md(i,co,t,V(t)),Sn(jg,i)}}function qg(t,i,o){t==="focusin"?(vd(),uo=i,co=o,uo.attachEvent("onpropertychange",xd)):t==="focusout"&&vd()}function Kg(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return oa(co)}function $g(t,i){if(t==="click")return oa(i)}function Zg(t,i){if(t==="input"||t==="change")return oa(i)}function Qg(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ni=typeof Object.is=="function"?Object.is:Qg;function fo(t,i){if(ni(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),l=Object.keys(i);if(o.length!==l.length)return!1;for(l=0;l<o.length;l++){var c=o[l];if(!p.call(i,c)||!ni(t[c],i[c]))return!1}return!0}function yd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Sd(t,i){var o=yd(t);t=0;for(var l;o;){if(o.nodeType===3){if(l=t+o.textContent.length,t<=i&&l>=i)return{node:o,offset:i-t};t=l}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=yd(o)}}function Md(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Md(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Ed(){for(var t=window,i=Dt();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=Dt(t.document)}return i}function $l(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function Jg(t){var i=Ed(),o=t.focusedElem,l=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&Md(o.ownerDocument.documentElement,o)){if(l!==null&&$l(o)){if(i=l.start,t=l.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var c=o.textContent.length,h=Math.min(l.start,c);l=l.end===void 0?h:Math.min(l.end,c),!t.extend&&h>l&&(c=l,l=h,h=c),c=Sd(o,h);var M=Sd(o,l);c&&M&&(t.rangeCount!==1||t.anchorNode!==c.node||t.anchorOffset!==c.offset||t.focusNode!==M.node||t.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(c.node,c.offset),t.removeAllRanges(),h>l?(t.addRange(i),t.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var e_=d&&"documentMode"in document&&11>=document.documentMode,as=null,Zl=null,ho=null,Ql=!1;function Td(t,i,o){var l=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Ql||as==null||as!==Dt(l)||(l=as,"selectionStart"in l&&$l(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),ho&&fo(ho,l)||(ho=l,l=ca(Zl,"onSelect"),0<l.length&&(i=new Hl("onSelect","select",null,i,o),t.push({event:i,listeners:l}),i.target=as)))}function aa(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var ls={animationend:aa("Animation","AnimationEnd"),animationiteration:aa("Animation","AnimationIteration"),animationstart:aa("Animation","AnimationStart"),transitionend:aa("Transition","TransitionEnd")},Jl={},wd={};d&&(wd=document.createElement("div").style,"AnimationEvent"in window||(delete ls.animationend.animation,delete ls.animationiteration.animation,delete ls.animationstart.animation),"TransitionEvent"in window||delete ls.transitionend.transition);function la(t){if(Jl[t])return Jl[t];if(!ls[t])return t;var i=ls[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in wd)return Jl[t]=i[o];return t}var Ad=la("animationend"),Cd=la("animationiteration"),Rd=la("animationstart"),bd=la("transitionend"),Pd=new Map,Dd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function er(t,i){Pd.set(t,i),u(i,[t])}for(var eu=0;eu<Dd.length;eu++){var tu=Dd[eu],t_=tu.toLowerCase(),n_=tu[0].toUpperCase()+tu.slice(1);er(t_,"on"+n_)}er(Ad,"onAnimationEnd"),er(Cd,"onAnimationIteration"),er(Rd,"onAnimationStart"),er("dblclick","onDoubleClick"),er("focusin","onFocus"),er("focusout","onBlur"),er(bd,"onTransitionEnd"),f("onMouseEnter",["mouseout","mouseover"]),f("onMouseLeave",["mouseout","mouseover"]),f("onPointerEnter",["pointerout","pointerover"]),f("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),i_=new Set("cancel close invalid load scroll toggle".split(" ").concat(po));function Ld(t,i,o){var l=t.type||"unknown-event";t.currentTarget=o,qo(l,i,void 0,t),t.currentTarget=null}function Id(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var l=t[o],c=l.event;l=l.listeners;e:{var h=void 0;if(i)for(var M=l.length-1;0<=M;M--){var D=l[M],O=D.instance,J=D.currentTarget;if(D=D.listener,O!==h&&c.isPropagationStopped())break e;Ld(c,D,J),h=O}else for(M=0;M<l.length;M++){if(D=l[M],O=D.instance,J=D.currentTarget,D=D.listener,O!==h&&c.isPropagationStopped())break e;Ld(c,D,J),h=O}}}if(Ar)throw t=qi,Ar=!1,qi=null,t}function Ut(t,i){var o=i[uu];o===void 0&&(o=i[uu]=new Set);var l=t+"__bubble";o.has(l)||(Ud(i,t,2,!1),o.add(l))}function nu(t,i,o){var l=0;i&&(l|=4),Ud(o,t,l,i)}var ua="_reactListening"+Math.random().toString(36).slice(2);function mo(t){if(!t[ua]){t[ua]=!0,r.forEach(function(o){o!=="selectionchange"&&(i_.has(o)||nu(o,!1,t),nu(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[ua]||(i[ua]=!0,nu("selectionchange",!1,i))}}function Ud(t,i,o,l){switch(id(i)){case 1:var c=_g;break;case 4:c=vg;break;default:c=zl}o=c.bind(null,i,o,t),c=void 0,!ns||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(c=!0),l?c!==void 0?t.addEventListener(i,o,{capture:!0,passive:c}):t.addEventListener(i,o,!0):c!==void 0?t.addEventListener(i,o,{passive:c}):t.addEventListener(i,o,!1)}function iu(t,i,o,l,c){var h=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var D=l.stateNode.containerInfo;if(D===c||D.nodeType===8&&D.parentNode===c)break;if(M===4)for(M=l.return;M!==null;){var O=M.tag;if((O===3||O===4)&&(O=M.stateNode.containerInfo,O===c||O.nodeType===8&&O.parentNode===c))return;M=M.return}for(;D!==null;){if(M=Cr(D),M===null)return;if(O=M.tag,O===5||O===6){l=h=M;continue e}D=D.parentNode}}l=l.return}Sn(function(){var J=h,_e=V(o),xe=[];e:{var me=Pd.get(t);if(me!==void 0){var Le=Hl,ze=t;switch(t){case"keypress":if(ia(o)===0)break e;case"keydown":case"keyup":Le=Ig;break;case"focusin":ze="focus",Le=Xl;break;case"focusout":ze="blur",Le=Xl;break;case"beforeblur":case"afterblur":Le=Xl;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Le=od;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Le=Sg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Le=Fg;break;case Ad:case Cd:case Rd:Le=Tg;break;case bd:Le=kg;break;case"scroll":Le=xg;break;case"wheel":Le=Bg;break;case"copy":case"cut":case"paste":Le=Ag;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Le=ld}var Ve=(i&4)!==0,Bt=!Ve&&t==="scroll",Y=Ve?me!==null?me+"Capture":null:me;Ve=[];for(var B=J,q;B!==null;){q=B;var Ee=q.stateNode;if(q.tag===5&&Ee!==null&&(q=Ee,Y!==null&&(Ee=mn(B,Y),Ee!=null&&Ve.push(go(B,Ee,q)))),Bt)break;B=B.return}0<Ve.length&&(me=new Le(me,ze,null,o,_e),xe.push({event:me,listeners:Ve}))}}if((i&7)===0){e:{if(me=t==="mouseover"||t==="pointerover",Le=t==="mouseout"||t==="pointerout",me&&o!==Et&&(ze=o.relatedTarget||o.fromElement)&&(Cr(ze)||ze[Ci]))break e;if((Le||me)&&(me=_e.window===_e?_e:(me=_e.ownerDocument)?me.defaultView||me.parentWindow:window,Le?(ze=o.relatedTarget||o.toElement,Le=J,ze=ze?Cr(ze):null,ze!==null&&(Bt=mi(ze),ze!==Bt||ze.tag!==5&&ze.tag!==6)&&(ze=null)):(Le=null,ze=J),Le!==ze)){if(Ve=od,Ee="onMouseLeave",Y="onMouseEnter",B="mouse",(t==="pointerout"||t==="pointerover")&&(Ve=ld,Ee="onPointerLeave",Y="onPointerEnter",B="pointer"),Bt=Le==null?me:fs(Le),q=ze==null?me:fs(ze),me=new Ve(Ee,B+"leave",Le,o,_e),me.target=Bt,me.relatedTarget=q,Ee=null,Cr(_e)===J&&(Ve=new Ve(Y,B+"enter",ze,o,_e),Ve.target=q,Ve.relatedTarget=Bt,Ee=Ve),Bt=Ee,Le&&ze)t:{for(Ve=Le,Y=ze,B=0,q=Ve;q;q=us(q))B++;for(q=0,Ee=Y;Ee;Ee=us(Ee))q++;for(;0<B-q;)Ve=us(Ve),B--;for(;0<q-B;)Y=us(Y),q--;for(;B--;){if(Ve===Y||Y!==null&&Ve===Y.alternate)break t;Ve=us(Ve),Y=us(Y)}Ve=null}else Ve=null;Le!==null&&Nd(xe,me,Le,Ve,!1),ze!==null&&Bt!==null&&Nd(xe,Bt,ze,Ve,!0)}}e:{if(me=J?fs(J):window,Le=me.nodeName&&me.nodeName.toLowerCase(),Le==="select"||Le==="input"&&me.type==="file")var Xe=Yg;else if(pd(me))if(gd)Xe=Zg;else{Xe=Kg;var Ke=qg}else(Le=me.nodeName)&&Le.toLowerCase()==="input"&&(me.type==="checkbox"||me.type==="radio")&&(Xe=$g);if(Xe&&(Xe=Xe(t,J))){md(xe,Xe,o,_e);break e}Ke&&Ke(t,me,J),t==="focusout"&&(Ke=me._wrapperState)&&Ke.controlled&&me.type==="number"&&Tt(me,"number",me.value)}switch(Ke=J?fs(J):window,t){case"focusin":(pd(Ke)||Ke.contentEditable==="true")&&(as=Ke,Zl=J,ho=null);break;case"focusout":ho=Zl=as=null;break;case"mousedown":Ql=!0;break;case"contextmenu":case"mouseup":case"dragend":Ql=!1,Td(xe,o,_e);break;case"selectionchange":if(e_)break;case"keydown":case"keyup":Td(xe,o,_e)}var $e;if(Yl)e:{switch(t){case"compositionstart":var tt="onCompositionStart";break e;case"compositionend":tt="onCompositionEnd";break e;case"compositionupdate":tt="onCompositionUpdate";break e}tt=void 0}else os?dd(t,o)&&(tt="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(tt="onCompositionStart");tt&&(ud&&o.locale!=="ko"&&(os||tt!=="onCompositionStart"?tt==="onCompositionEnd"&&os&&($e=rd()):(Ji=_e,Vl="value"in Ji?Ji.value:Ji.textContent,os=!0)),Ke=ca(J,tt),0<Ke.length&&(tt=new ad(tt,t,null,o,_e),xe.push({event:tt,listeners:Ke}),$e?tt.data=$e:($e=hd(o),$e!==null&&(tt.data=$e)))),($e=Hg?Gg(t,o):Wg(t,o))&&(J=ca(J,"onBeforeInput"),0<J.length&&(_e=new ad("onBeforeInput","beforeinput",null,o,_e),xe.push({event:_e,listeners:J}),_e.data=$e))}Id(xe,i)})}function go(t,i,o){return{instance:t,listener:i,currentTarget:o}}function ca(t,i){for(var o=i+"Capture",l=[];t!==null;){var c=t,h=c.stateNode;c.tag===5&&h!==null&&(c=h,h=mn(t,o),h!=null&&l.unshift(go(t,h,c)),h=mn(t,i),h!=null&&l.push(go(t,h,c))),t=t.return}return l}function us(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Nd(t,i,o,l,c){for(var h=i._reactName,M=[];o!==null&&o!==l;){var D=o,O=D.alternate,J=D.stateNode;if(O!==null&&O===l)break;D.tag===5&&J!==null&&(D=J,c?(O=mn(o,h),O!=null&&M.unshift(go(o,O,D))):c||(O=mn(o,h),O!=null&&M.push(go(o,O,D)))),o=o.return}M.length!==0&&t.push({event:i,listeners:M})}var r_=/\r\n?/g,s_=/\u0000|\uFFFD/g;function Fd(t){return(typeof t=="string"?t:""+t).replace(r_,`
`).replace(s_,"")}function fa(t,i,o){if(i=Fd(i),Fd(t)!==i&&o)throw Error(n(425))}function da(){}var ru=null,su=null;function ou(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var au=typeof setTimeout=="function"?setTimeout:void 0,o_=typeof clearTimeout=="function"?clearTimeout:void 0,Od=typeof Promise=="function"?Promise:void 0,a_=typeof queueMicrotask=="function"?queueMicrotask:typeof Od<"u"?function(t){return Od.resolve(null).then(t).catch(l_)}:au;function l_(t){setTimeout(function(){throw t})}function lu(t,i){var o=i,l=0;do{var c=o.nextSibling;if(t.removeChild(o),c&&c.nodeType===8)if(o=c.data,o==="/$"){if(l===0){t.removeChild(c),so(i);return}l--}else o!=="$"&&o!=="$?"&&o!=="$!"||l++;o=c}while(o);so(i)}function tr(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function kd(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var cs=Math.random().toString(36).slice(2),_i="__reactFiber$"+cs,_o="__reactProps$"+cs,Ci="__reactContainer$"+cs,uu="__reactEvents$"+cs,u_="__reactListeners$"+cs,c_="__reactHandles$"+cs;function Cr(t){var i=t[_i];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ci]||o[_i]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=kd(t);t!==null;){if(o=t[_i])return o;t=kd(t)}return i}t=o,o=t.parentNode}return null}function vo(t){return t=t[_i]||t[Ci],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function fs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function ha(t){return t[_o]||null}var cu=[],ds=-1;function nr(t){return{current:t}}function Nt(t){0>ds||(t.current=cu[ds],cu[ds]=null,ds--)}function Lt(t,i){ds++,cu[ds]=t.current,t.current=i}var ir={},ln=nr(ir),En=nr(!1),Rr=ir;function hs(t,i){var o=t.type.contextTypes;if(!o)return ir;var l=t.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===i)return l.__reactInternalMemoizedMaskedChildContext;var c={},h;for(h in o)c[h]=i[h];return l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=c),c}function Tn(t){return t=t.childContextTypes,t!=null}function pa(){Nt(En),Nt(ln)}function zd(t,i,o){if(ln.current!==ir)throw Error(n(168));Lt(ln,i),Lt(En,o)}function Bd(t,i,o){var l=t.stateNode;if(i=i.childContextTypes,typeof l.getChildContext!="function")return o;l=l.getChildContext();for(var c in l)if(!(c in i))throw Error(n(108,ve(t)||"Unknown",c));return se({},o,l)}function ma(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ir,Rr=ln.current,Lt(ln,t),Lt(En,En.current),!0}function Vd(t,i,o){var l=t.stateNode;if(!l)throw Error(n(169));o?(t=Bd(t,i,Rr),l.__reactInternalMemoizedMergedChildContext=t,Nt(En),Nt(ln),Lt(ln,t)):Nt(En),Lt(En,o)}var Ri=null,ga=!1,fu=!1;function Hd(t){Ri===null?Ri=[t]:Ri.push(t)}function f_(t){ga=!0,Hd(t)}function rr(){if(!fu&&Ri!==null){fu=!0;var t=0,i=wt;try{var o=Ri;for(wt=1;t<o.length;t++){var l=o[t];do l=l(!0);while(l!==null)}Ri=null,ga=!1}catch(c){throw Ri!==null&&(Ri=Ri.slice(t+1)),ee(Be,rr),c}finally{wt=i,fu=!1}}return null}var ps=[],ms=0,_a=null,va=0,Hn=[],Gn=0,br=null,bi=1,Pi="";function Pr(t,i){ps[ms++]=va,ps[ms++]=_a,_a=t,va=i}function Gd(t,i,o){Hn[Gn++]=bi,Hn[Gn++]=Pi,Hn[Gn++]=br,br=t;var l=bi;t=Pi;var c=32-st(l)-1;l&=~(1<<c),o+=1;var h=32-st(i)+c;if(30<h){var M=c-c%5;h=(l&(1<<M)-1).toString(32),l>>=M,c-=M,bi=1<<32-st(i)+c|o<<c|l,Pi=h+t}else bi=1<<h|o<<c|l,Pi=t}function du(t){t.return!==null&&(Pr(t,1),Gd(t,1,0))}function hu(t){for(;t===_a;)_a=ps[--ms],ps[ms]=null,va=ps[--ms],ps[ms]=null;for(;t===br;)br=Hn[--Gn],Hn[Gn]=null,Pi=Hn[--Gn],Hn[Gn]=null,bi=Hn[--Gn],Hn[Gn]=null}var Un=null,Nn=null,Ft=!1,ii=null;function Wd(t,i){var o=Yn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function Xd(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Un=t,Nn=tr(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Un=t,Nn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=br!==null?{id:bi,overflow:Pi}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Yn(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Un=t,Nn=null,!0):!1;default:return!1}}function pu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function mu(t){if(Ft){var i=Nn;if(i){var o=i;if(!Xd(t,i)){if(pu(t))throw Error(n(418));i=tr(o.nextSibling);var l=Un;i&&Xd(t,i)?Wd(l,o):(t.flags=t.flags&-4097|2,Ft=!1,Un=t)}}else{if(pu(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ft=!1,Un=t}}}function jd(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Un=t}function xa(t){if(t!==Un)return!1;if(!Ft)return jd(t),Ft=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!ou(t.type,t.memoizedProps)),i&&(i=Nn)){if(pu(t))throw Yd(),Error(n(418));for(;i;)Wd(t,i),i=tr(i.nextSibling)}if(jd(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){Nn=tr(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}Nn=null}}else Nn=Un?tr(t.stateNode.nextSibling):null;return!0}function Yd(){for(var t=Nn;t;)t=tr(t.nextSibling)}function gs(){Nn=Un=null,Ft=!1}function gu(t){ii===null?ii=[t]:ii.push(t)}var d_=R.ReactCurrentBatchConfig;function xo(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var l=o.stateNode}if(!l)throw Error(n(147,t));var c=l,h=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===h?i.ref:(i=function(M){var D=c.refs;M===null?delete D[h]:D[h]=M},i._stringRef=h,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function ya(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function qd(t){var i=t._init;return i(t._payload)}function Kd(t){function i(Y,B){if(t){var q=Y.deletions;q===null?(Y.deletions=[B],Y.flags|=16):q.push(B)}}function o(Y,B){if(!t)return null;for(;B!==null;)i(Y,B),B=B.sibling;return null}function l(Y,B){for(Y=new Map;B!==null;)B.key!==null?Y.set(B.key,B):Y.set(B.index,B),B=B.sibling;return Y}function c(Y,B){return Y=dr(Y,B),Y.index=0,Y.sibling=null,Y}function h(Y,B,q){return Y.index=q,t?(q=Y.alternate,q!==null?(q=q.index,q<B?(Y.flags|=2,B):q):(Y.flags|=2,B)):(Y.flags|=1048576,B)}function M(Y){return t&&Y.alternate===null&&(Y.flags|=2),Y}function D(Y,B,q,Ee){return B===null||B.tag!==6?(B=ac(q,Y.mode,Ee),B.return=Y,B):(B=c(B,q),B.return=Y,B)}function O(Y,B,q,Ee){var Xe=q.type;return Xe===F?_e(Y,B,q.props.children,Ee,q.key):B!==null&&(B.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===oe&&qd(Xe)===B.type)?(Ee=c(B,q.props),Ee.ref=xo(Y,B,q),Ee.return=Y,Ee):(Ee=Wa(q.type,q.key,q.props,null,Y.mode,Ee),Ee.ref=xo(Y,B,q),Ee.return=Y,Ee)}function J(Y,B,q,Ee){return B===null||B.tag!==4||B.stateNode.containerInfo!==q.containerInfo||B.stateNode.implementation!==q.implementation?(B=lc(q,Y.mode,Ee),B.return=Y,B):(B=c(B,q.children||[]),B.return=Y,B)}function _e(Y,B,q,Ee,Xe){return B===null||B.tag!==7?(B=kr(q,Y.mode,Ee,Xe),B.return=Y,B):(B=c(B,q),B.return=Y,B)}function xe(Y,B,q){if(typeof B=="string"&&B!==""||typeof B=="number")return B=ac(""+B,Y.mode,q),B.return=Y,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case X:return q=Wa(B.type,B.key,B.props,null,Y.mode,q),q.ref=xo(Y,null,B),q.return=Y,q;case N:return B=lc(B,Y.mode,q),B.return=Y,B;case oe:var Ee=B._init;return xe(Y,Ee(B._payload),q)}if(Ye(B)||ae(B))return B=kr(B,Y.mode,q,null),B.return=Y,B;ya(Y,B)}return null}function me(Y,B,q,Ee){var Xe=B!==null?B.key:null;if(typeof q=="string"&&q!==""||typeof q=="number")return Xe!==null?null:D(Y,B,""+q,Ee);if(typeof q=="object"&&q!==null){switch(q.$$typeof){case X:return q.key===Xe?O(Y,B,q,Ee):null;case N:return q.key===Xe?J(Y,B,q,Ee):null;case oe:return Xe=q._init,me(Y,B,Xe(q._payload),Ee)}if(Ye(q)||ae(q))return Xe!==null?null:_e(Y,B,q,Ee,null);ya(Y,q)}return null}function Le(Y,B,q,Ee,Xe){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return Y=Y.get(q)||null,D(B,Y,""+Ee,Xe);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case X:return Y=Y.get(Ee.key===null?q:Ee.key)||null,O(B,Y,Ee,Xe);case N:return Y=Y.get(Ee.key===null?q:Ee.key)||null,J(B,Y,Ee,Xe);case oe:var Ke=Ee._init;return Le(Y,B,q,Ke(Ee._payload),Xe)}if(Ye(Ee)||ae(Ee))return Y=Y.get(q)||null,_e(B,Y,Ee,Xe,null);ya(B,Ee)}return null}function ze(Y,B,q,Ee){for(var Xe=null,Ke=null,$e=B,tt=B=0,tn=null;$e!==null&&tt<q.length;tt++){$e.index>tt?(tn=$e,$e=null):tn=$e.sibling;var St=me(Y,$e,q[tt],Ee);if(St===null){$e===null&&($e=tn);break}t&&$e&&St.alternate===null&&i(Y,$e),B=h(St,B,tt),Ke===null?Xe=St:Ke.sibling=St,Ke=St,$e=tn}if(tt===q.length)return o(Y,$e),Ft&&Pr(Y,tt),Xe;if($e===null){for(;tt<q.length;tt++)$e=xe(Y,q[tt],Ee),$e!==null&&(B=h($e,B,tt),Ke===null?Xe=$e:Ke.sibling=$e,Ke=$e);return Ft&&Pr(Y,tt),Xe}for($e=l(Y,$e);tt<q.length;tt++)tn=Le($e,Y,tt,q[tt],Ee),tn!==null&&(t&&tn.alternate!==null&&$e.delete(tn.key===null?tt:tn.key),B=h(tn,B,tt),Ke===null?Xe=tn:Ke.sibling=tn,Ke=tn);return t&&$e.forEach(function(hr){return i(Y,hr)}),Ft&&Pr(Y,tt),Xe}function Ve(Y,B,q,Ee){var Xe=ae(q);if(typeof Xe!="function")throw Error(n(150));if(q=Xe.call(q),q==null)throw Error(n(151));for(var Ke=Xe=null,$e=B,tt=B=0,tn=null,St=q.next();$e!==null&&!St.done;tt++,St=q.next()){$e.index>tt?(tn=$e,$e=null):tn=$e.sibling;var hr=me(Y,$e,St.value,Ee);if(hr===null){$e===null&&($e=tn);break}t&&$e&&hr.alternate===null&&i(Y,$e),B=h(hr,B,tt),Ke===null?Xe=hr:Ke.sibling=hr,Ke=hr,$e=tn}if(St.done)return o(Y,$e),Ft&&Pr(Y,tt),Xe;if($e===null){for(;!St.done;tt++,St=q.next())St=xe(Y,St.value,Ee),St!==null&&(B=h(St,B,tt),Ke===null?Xe=St:Ke.sibling=St,Ke=St);return Ft&&Pr(Y,tt),Xe}for($e=l(Y,$e);!St.done;tt++,St=q.next())St=Le($e,Y,tt,St.value,Ee),St!==null&&(t&&St.alternate!==null&&$e.delete(St.key===null?tt:St.key),B=h(St,B,tt),Ke===null?Xe=St:Ke.sibling=St,Ke=St);return t&&$e.forEach(function(X_){return i(Y,X_)}),Ft&&Pr(Y,tt),Xe}function Bt(Y,B,q,Ee){if(typeof q=="object"&&q!==null&&q.type===F&&q.key===null&&(q=q.props.children),typeof q=="object"&&q!==null){switch(q.$$typeof){case X:e:{for(var Xe=q.key,Ke=B;Ke!==null;){if(Ke.key===Xe){if(Xe=q.type,Xe===F){if(Ke.tag===7){o(Y,Ke.sibling),B=c(Ke,q.props.children),B.return=Y,Y=B;break e}}else if(Ke.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===oe&&qd(Xe)===Ke.type){o(Y,Ke.sibling),B=c(Ke,q.props),B.ref=xo(Y,Ke,q),B.return=Y,Y=B;break e}o(Y,Ke);break}else i(Y,Ke);Ke=Ke.sibling}q.type===F?(B=kr(q.props.children,Y.mode,Ee,q.key),B.return=Y,Y=B):(Ee=Wa(q.type,q.key,q.props,null,Y.mode,Ee),Ee.ref=xo(Y,B,q),Ee.return=Y,Y=Ee)}return M(Y);case N:e:{for(Ke=q.key;B!==null;){if(B.key===Ke)if(B.tag===4&&B.stateNode.containerInfo===q.containerInfo&&B.stateNode.implementation===q.implementation){o(Y,B.sibling),B=c(B,q.children||[]),B.return=Y,Y=B;break e}else{o(Y,B);break}else i(Y,B);B=B.sibling}B=lc(q,Y.mode,Ee),B.return=Y,Y=B}return M(Y);case oe:return Ke=q._init,Bt(Y,B,Ke(q._payload),Ee)}if(Ye(q))return ze(Y,B,q,Ee);if(ae(q))return Ve(Y,B,q,Ee);ya(Y,q)}return typeof q=="string"&&q!==""||typeof q=="number"?(q=""+q,B!==null&&B.tag===6?(o(Y,B.sibling),B=c(B,q),B.return=Y,Y=B):(o(Y,B),B=ac(q,Y.mode,Ee),B.return=Y,Y=B),M(Y)):o(Y,B)}return Bt}var _s=Kd(!0),$d=Kd(!1),Sa=nr(null),Ma=null,vs=null,_u=null;function vu(){_u=vs=Ma=null}function xu(t){var i=Sa.current;Nt(Sa),t._currentValue=i}function yu(t,i,o){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===o)break;t=t.return}}function xs(t,i){Ma=t,_u=vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(wn=!0),t.firstContext=null)}function Wn(t){var i=t._currentValue;if(_u!==t)if(t={context:t,memoizedValue:i,next:null},vs===null){if(Ma===null)throw Error(n(308));vs=t,Ma.dependencies={lanes:0,firstContext:t}}else vs=vs.next=t;return i}var Dr=null;function Su(t){Dr===null?Dr=[t]:Dr.push(t)}function Zd(t,i,o,l){var c=i.interleaved;return c===null?(o.next=o,Su(i)):(o.next=c.next,c.next=o),i.interleaved=o,Di(t,l)}function Di(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var sr=!1;function Mu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Qd(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Li(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function or(t,i,o){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(vt&2)!==0){var c=l.pending;return c===null?i.next=i:(i.next=c.next,c.next=i),l.pending=i,Di(t,o)}return c=l.interleaved,c===null?(i.next=i,Su(l)):(i.next=c.next,c.next=i),l.interleaved=i,Di(t,o)}function Ea(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,Fl(t,o)}}function Jd(t,i){var o=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,o===l)){var c=null,h=null;if(o=o.firstBaseUpdate,o!==null){do{var M={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};h===null?c=h=M:h=h.next=M,o=o.next}while(o!==null);h===null?c=h=i:h=h.next=i}else c=h=i;o={baseState:l.baseState,firstBaseUpdate:c,lastBaseUpdate:h,shared:l.shared,effects:l.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Ta(t,i,o,l){var c=t.updateQueue;sr=!1;var h=c.firstBaseUpdate,M=c.lastBaseUpdate,D=c.shared.pending;if(D!==null){c.shared.pending=null;var O=D,J=O.next;O.next=null,M===null?h=J:M.next=J,M=O;var _e=t.alternate;_e!==null&&(_e=_e.updateQueue,D=_e.lastBaseUpdate,D!==M&&(D===null?_e.firstBaseUpdate=J:D.next=J,_e.lastBaseUpdate=O))}if(h!==null){var xe=c.baseState;M=0,_e=J=O=null,D=h;do{var me=D.lane,Le=D.eventTime;if((l&me)===me){_e!==null&&(_e=_e.next={eventTime:Le,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var ze=t,Ve=D;switch(me=i,Le=o,Ve.tag){case 1:if(ze=Ve.payload,typeof ze=="function"){xe=ze.call(Le,xe,me);break e}xe=ze;break e;case 3:ze.flags=ze.flags&-65537|128;case 0:if(ze=Ve.payload,me=typeof ze=="function"?ze.call(Le,xe,me):ze,me==null)break e;xe=se({},xe,me);break e;case 2:sr=!0}}D.callback!==null&&D.lane!==0&&(t.flags|=64,me=c.effects,me===null?c.effects=[D]:me.push(D))}else Le={eventTime:Le,lane:me,tag:D.tag,payload:D.payload,callback:D.callback,next:null},_e===null?(J=_e=Le,O=xe):_e=_e.next=Le,M|=me;if(D=D.next,D===null){if(D=c.shared.pending,D===null)break;me=D,D=me.next,me.next=null,c.lastBaseUpdate=me,c.shared.pending=null}}while(!0);if(_e===null&&(O=xe),c.baseState=O,c.firstBaseUpdate=J,c.lastBaseUpdate=_e,i=c.shared.interleaved,i!==null){c=i;do M|=c.lane,c=c.next;while(c!==i)}else h===null&&(c.shared.lanes=0);Ur|=M,t.lanes=M,t.memoizedState=xe}}function eh(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var l=t[i],c=l.callback;if(c!==null){if(l.callback=null,l=o,typeof c!="function")throw Error(n(191,c));c.call(l)}}}var yo={},vi=nr(yo),So=nr(yo),Mo=nr(yo);function Lr(t){if(t===yo)throw Error(n(174));return t}function Eu(t,i){switch(Lt(Mo,i),Lt(So,t),Lt(vi,yo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:He(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=He(i,t)}Nt(vi),Lt(vi,i)}function ys(){Nt(vi),Nt(So),Nt(Mo)}function th(t){Lr(Mo.current);var i=Lr(vi.current),o=He(i,t.type);i!==o&&(Lt(So,t),Lt(vi,o))}function Tu(t){So.current===t&&(Nt(vi),Nt(So))}var Ot=nr(0);function wa(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var wu=[];function Au(){for(var t=0;t<wu.length;t++)wu[t]._workInProgressVersionPrimary=null;wu.length=0}var Aa=R.ReactCurrentDispatcher,Cu=R.ReactCurrentBatchConfig,Ir=0,kt=null,qt=null,Jt=null,Ca=!1,Eo=!1,To=0,h_=0;function un(){throw Error(n(321))}function Ru(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ni(t[o],i[o]))return!1;return!0}function bu(t,i,o,l,c,h){if(Ir=h,kt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Aa.current=t===null||t.memoizedState===null?__:v_,t=o(l,c),Eo){h=0;do{if(Eo=!1,To=0,25<=h)throw Error(n(301));h+=1,Jt=qt=null,i.updateQueue=null,Aa.current=x_,t=o(l,c)}while(Eo)}if(Aa.current=Pa,i=qt!==null&&qt.next!==null,Ir=0,Jt=qt=kt=null,Ca=!1,i)throw Error(n(300));return t}function Pu(){var t=To!==0;return To=0,t}function xi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Jt===null?kt.memoizedState=Jt=t:Jt=Jt.next=t,Jt}function Xn(){if(qt===null){var t=kt.alternate;t=t!==null?t.memoizedState:null}else t=qt.next;var i=Jt===null?kt.memoizedState:Jt.next;if(i!==null)Jt=i,qt=t;else{if(t===null)throw Error(n(310));qt=t,t={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},Jt===null?kt.memoizedState=Jt=t:Jt=Jt.next=t}return Jt}function wo(t,i){return typeof i=="function"?i(t):i}function Du(t){var i=Xn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=qt,c=l.baseQueue,h=o.pending;if(h!==null){if(c!==null){var M=c.next;c.next=h.next,h.next=M}l.baseQueue=c=h,o.pending=null}if(c!==null){h=c.next,l=l.baseState;var D=M=null,O=null,J=h;do{var _e=J.lane;if((Ir&_e)===_e)O!==null&&(O=O.next={lane:0,action:J.action,hasEagerState:J.hasEagerState,eagerState:J.eagerState,next:null}),l=J.hasEagerState?J.eagerState:t(l,J.action);else{var xe={lane:_e,action:J.action,hasEagerState:J.hasEagerState,eagerState:J.eagerState,next:null};O===null?(D=O=xe,M=l):O=O.next=xe,kt.lanes|=_e,Ur|=_e}J=J.next}while(J!==null&&J!==h);O===null?M=l:O.next=D,ni(l,i.memoizedState)||(wn=!0),i.memoizedState=l,i.baseState=M,i.baseQueue=O,o.lastRenderedState=l}if(t=o.interleaved,t!==null){c=t;do h=c.lane,kt.lanes|=h,Ur|=h,c=c.next;while(c!==t)}else c===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Lu(t){var i=Xn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=o.dispatch,c=o.pending,h=i.memoizedState;if(c!==null){o.pending=null;var M=c=c.next;do h=t(h,M.action),M=M.next;while(M!==c);ni(h,i.memoizedState)||(wn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),o.lastRenderedState=h}return[h,l]}function nh(){}function ih(t,i){var o=kt,l=Xn(),c=i(),h=!ni(l.memoizedState,c);if(h&&(l.memoizedState=c,wn=!0),l=l.queue,Iu(oh.bind(null,o,l,t),[t]),l.getSnapshot!==i||h||Jt!==null&&Jt.memoizedState.tag&1){if(o.flags|=2048,Ao(9,sh.bind(null,o,l,c,i),void 0,null),en===null)throw Error(n(349));(Ir&30)!==0||rh(o,i,c)}return c}function rh(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function sh(t,i,o,l){i.value=o,i.getSnapshot=l,ah(i)&&lh(t)}function oh(t,i,o){return o(function(){ah(i)&&lh(t)})}function ah(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ni(t,o)}catch{return!0}}function lh(t){var i=Di(t,1);i!==null&&ai(i,t,1,-1)}function uh(t){var i=xi();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},i.queue=t,t=t.dispatch=g_.bind(null,kt,t),[i.memoizedState,t]}function Ao(t,i,o,l){return t={tag:t,create:i,destroy:o,deps:l,next:null},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(l=o.next,o.next=t,t.next=l,i.lastEffect=t)),t}function ch(){return Xn().memoizedState}function Ra(t,i,o,l){var c=xi();kt.flags|=t,c.memoizedState=Ao(1|i,o,void 0,l===void 0?null:l)}function ba(t,i,o,l){var c=Xn();l=l===void 0?null:l;var h=void 0;if(qt!==null){var M=qt.memoizedState;if(h=M.destroy,l!==null&&Ru(l,M.deps)){c.memoizedState=Ao(i,o,h,l);return}}kt.flags|=t,c.memoizedState=Ao(1|i,o,h,l)}function fh(t,i){return Ra(8390656,8,t,i)}function Iu(t,i){return ba(2048,8,t,i)}function dh(t,i){return ba(4,2,t,i)}function hh(t,i){return ba(4,4,t,i)}function ph(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function mh(t,i,o){return o=o!=null?o.concat([t]):null,ba(4,4,ph.bind(null,i,t),o)}function Uu(){}function gh(t,i){var o=Xn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&Ru(i,l[1])?l[0]:(o.memoizedState=[t,i],t)}function _h(t,i){var o=Xn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&Ru(i,l[1])?l[0]:(t=t(),o.memoizedState=[t,i],t)}function vh(t,i,o){return(Ir&21)===0?(t.baseState&&(t.baseState=!1,wn=!0),t.memoizedState=o):(ni(o,i)||(o=gn(),kt.lanes|=o,Ur|=o,t.baseState=!0),i)}function p_(t,i){var o=wt;wt=o!==0&&4>o?o:4,t(!0);var l=Cu.transition;Cu.transition={};try{t(!1),i()}finally{wt=o,Cu.transition=l}}function xh(){return Xn().memoizedState}function m_(t,i,o){var l=cr(t);if(o={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null},yh(t))Sh(i,o);else if(o=Zd(t,i,o,l),o!==null){var c=vn();ai(o,t,l,c),Mh(o,i,l)}}function g_(t,i,o){var l=cr(t),c={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null};if(yh(t))Sh(i,c);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var M=i.lastRenderedState,D=h(M,o);if(c.hasEagerState=!0,c.eagerState=D,ni(D,M)){var O=i.interleaved;O===null?(c.next=c,Su(i)):(c.next=O.next,O.next=c),i.interleaved=c;return}}catch{}finally{}o=Zd(t,i,c,l),o!==null&&(c=vn(),ai(o,t,l,c),Mh(o,i,l))}}function yh(t){var i=t.alternate;return t===kt||i!==null&&i===kt}function Sh(t,i){Eo=Ca=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function Mh(t,i,o){if((o&4194240)!==0){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,Fl(t,o)}}var Pa={readContext:Wn,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useInsertionEffect:un,useLayoutEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useMutableSource:un,useSyncExternalStore:un,useId:un,unstable_isNewReconciler:!1},__={readContext:Wn,useCallback:function(t,i){return xi().memoizedState=[t,i===void 0?null:i],t},useContext:Wn,useEffect:fh,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Ra(4194308,4,ph.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Ra(4194308,4,t,i)},useInsertionEffect:function(t,i){return Ra(4,2,t,i)},useMemo:function(t,i){var o=xi();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var l=xi();return i=o!==void 0?o(i):i,l.memoizedState=l.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},l.queue=t,t=t.dispatch=m_.bind(null,kt,t),[l.memoizedState,t]},useRef:function(t){var i=xi();return t={current:t},i.memoizedState=t},useState:uh,useDebugValue:Uu,useDeferredValue:function(t){return xi().memoizedState=t},useTransition:function(){var t=uh(!1),i=t[0];return t=p_.bind(null,t[1]),xi().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var l=kt,c=xi();if(Ft){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),en===null)throw Error(n(349));(Ir&30)!==0||rh(l,i,o)}c.memoizedState=o;var h={value:o,getSnapshot:i};return c.queue=h,fh(oh.bind(null,l,h,t),[t]),l.flags|=2048,Ao(9,sh.bind(null,l,h,o,i),void 0,null),o},useId:function(){var t=xi(),i=en.identifierPrefix;if(Ft){var o=Pi,l=bi;o=(l&~(1<<32-st(l)-1)).toString(32)+o,i=":"+i+"R"+o,o=To++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=h_++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},v_={readContext:Wn,useCallback:gh,useContext:Wn,useEffect:Iu,useImperativeHandle:mh,useInsertionEffect:dh,useLayoutEffect:hh,useMemo:_h,useReducer:Du,useRef:ch,useState:function(){return Du(wo)},useDebugValue:Uu,useDeferredValue:function(t){var i=Xn();return vh(i,qt.memoizedState,t)},useTransition:function(){var t=Du(wo)[0],i=Xn().memoizedState;return[t,i]},useMutableSource:nh,useSyncExternalStore:ih,useId:xh,unstable_isNewReconciler:!1},x_={readContext:Wn,useCallback:gh,useContext:Wn,useEffect:Iu,useImperativeHandle:mh,useInsertionEffect:dh,useLayoutEffect:hh,useMemo:_h,useReducer:Lu,useRef:ch,useState:function(){return Lu(wo)},useDebugValue:Uu,useDeferredValue:function(t){var i=Xn();return qt===null?i.memoizedState=t:vh(i,qt.memoizedState,t)},useTransition:function(){var t=Lu(wo)[0],i=Xn().memoizedState;return[t,i]},useMutableSource:nh,useSyncExternalStore:ih,useId:xh,unstable_isNewReconciler:!1};function ri(t,i){if(t&&t.defaultProps){i=se({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Nu(t,i,o,l){i=t.memoizedState,o=o(l,i),o=o==null?i:se({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Da={isMounted:function(t){return(t=t._reactInternals)?mi(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var l=vn(),c=cr(t),h=Li(l,c);h.payload=i,o!=null&&(h.callback=o),i=or(t,h,c),i!==null&&(ai(i,t,c,l),Ea(i,t,c))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var l=vn(),c=cr(t),h=Li(l,c);h.tag=1,h.payload=i,o!=null&&(h.callback=o),i=or(t,h,c),i!==null&&(ai(i,t,c,l),Ea(i,t,c))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=vn(),l=cr(t),c=Li(o,l);c.tag=2,i!=null&&(c.callback=i),i=or(t,c,l),i!==null&&(ai(i,t,l,o),Ea(i,t,l))}};function Eh(t,i,o,l,c,h,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,h,M):i.prototype&&i.prototype.isPureReactComponent?!fo(o,l)||!fo(c,h):!0}function Th(t,i,o){var l=!1,c=ir,h=i.contextType;return typeof h=="object"&&h!==null?h=Wn(h):(c=Tn(i)?Rr:ln.current,l=i.contextTypes,h=(l=l!=null)?hs(t,c):ir),i=new i(o,h),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Da,t.stateNode=i,i._reactInternals=t,l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=c,t.__reactInternalMemoizedMaskedChildContext=h),i}function wh(t,i,o,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,l),i.state!==t&&Da.enqueueReplaceState(i,i.state,null)}function Fu(t,i,o,l){var c=t.stateNode;c.props=o,c.state=t.memoizedState,c.refs={},Mu(t);var h=i.contextType;typeof h=="object"&&h!==null?c.context=Wn(h):(h=Tn(i)?Rr:ln.current,c.context=hs(t,h)),c.state=t.memoizedState,h=i.getDerivedStateFromProps,typeof h=="function"&&(Nu(t,i,h,o),c.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(i=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),i!==c.state&&Da.enqueueReplaceState(c,c.state,null),Ta(t,o,c,l),c.state=t.memoizedState),typeof c.componentDidMount=="function"&&(t.flags|=4194308)}function Ss(t,i){try{var o="",l=i;do o+=ue(l),l=l.return;while(l);var c=o}catch(h){c=`
Error generating stack: `+h.message+`
`+h.stack}return{value:t,source:i,stack:c,digest:null}}function Ou(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function ku(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var y_=typeof WeakMap=="function"?WeakMap:Map;function Ah(t,i,o){o=Li(-1,o),o.tag=3,o.payload={element:null};var l=i.value;return o.callback=function(){ka||(ka=!0,Ju=l),ku(t,i)},o}function Ch(t,i,o){o=Li(-1,o),o.tag=3;var l=t.type.getDerivedStateFromError;if(typeof l=="function"){var c=i.value;o.payload=function(){return l(c)},o.callback=function(){ku(t,i)}}var h=t.stateNode;return h!==null&&typeof h.componentDidCatch=="function"&&(o.callback=function(){ku(t,i),typeof l!="function"&&(lr===null?lr=new Set([this]):lr.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),o}function Rh(t,i,o){var l=t.pingCache;if(l===null){l=t.pingCache=new y_;var c=new Set;l.set(i,c)}else c=l.get(i),c===void 0&&(c=new Set,l.set(i,c));c.has(o)||(c.add(o),t=U_.bind(null,t,i,o),i.then(t,t))}function bh(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Ph(t,i,o,l,c){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Li(-1,1),i.tag=2,or(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=c,t)}var S_=R.ReactCurrentOwner,wn=!1;function _n(t,i,o,l){i.child=t===null?$d(i,null,o,l):_s(i,t.child,o,l)}function Dh(t,i,o,l,c){o=o.render;var h=i.ref;return xs(i,c),l=bu(t,i,o,l,h,c),o=Pu(),t!==null&&!wn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~c,Ii(t,i,c)):(Ft&&o&&du(i),i.flags|=1,_n(t,i,l,c),i.child)}function Lh(t,i,o,l,c){if(t===null){var h=o.type;return typeof h=="function"&&!oc(h)&&h.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=h,Ih(t,i,h,l,c)):(t=Wa(o.type,null,l,i,i.mode,c),t.ref=i.ref,t.return=i,i.child=t)}if(h=t.child,(t.lanes&c)===0){var M=h.memoizedProps;if(o=o.compare,o=o!==null?o:fo,o(M,l)&&t.ref===i.ref)return Ii(t,i,c)}return i.flags|=1,t=dr(h,l),t.ref=i.ref,t.return=i,i.child=t}function Ih(t,i,o,l,c){if(t!==null){var h=t.memoizedProps;if(fo(h,l)&&t.ref===i.ref)if(wn=!1,i.pendingProps=l=h,(t.lanes&c)!==0)(t.flags&131072)!==0&&(wn=!0);else return i.lanes=t.lanes,Ii(t,i,c)}return zu(t,i,o,l,c)}function Uh(t,i,o){var l=i.pendingProps,c=l.children,h=t!==null?t.memoizedState:null;if(l.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Lt(Es,Fn),Fn|=o;else{if((o&1073741824)===0)return t=h!==null?h.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Lt(Es,Fn),Fn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=h!==null?h.baseLanes:o,Lt(Es,Fn),Fn|=l}else h!==null?(l=h.baseLanes|o,i.memoizedState=null):l=o,Lt(Es,Fn),Fn|=l;return _n(t,i,c,o),i.child}function Nh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function zu(t,i,o,l,c){var h=Tn(o)?Rr:ln.current;return h=hs(i,h),xs(i,c),o=bu(t,i,o,l,h,c),l=Pu(),t!==null&&!wn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~c,Ii(t,i,c)):(Ft&&l&&du(i),i.flags|=1,_n(t,i,o,c),i.child)}function Fh(t,i,o,l,c){if(Tn(o)){var h=!0;ma(i)}else h=!1;if(xs(i,c),i.stateNode===null)Ia(t,i),Th(i,o,l),Fu(i,o,l,c),l=!0;else if(t===null){var M=i.stateNode,D=i.memoizedProps;M.props=D;var O=M.context,J=o.contextType;typeof J=="object"&&J!==null?J=Wn(J):(J=Tn(o)?Rr:ln.current,J=hs(i,J));var _e=o.getDerivedStateFromProps,xe=typeof _e=="function"||typeof M.getSnapshotBeforeUpdate=="function";xe||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(D!==l||O!==J)&&wh(i,M,l,J),sr=!1;var me=i.memoizedState;M.state=me,Ta(i,l,M,c),O=i.memoizedState,D!==l||me!==O||En.current||sr?(typeof _e=="function"&&(Nu(i,o,_e,l),O=i.memoizedState),(D=sr||Eh(i,o,D,l,me,O,J))?(xe||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=O),M.props=l,M.state=O,M.context=J,l=D):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{M=i.stateNode,Qd(t,i),D=i.memoizedProps,J=i.type===i.elementType?D:ri(i.type,D),M.props=J,xe=i.pendingProps,me=M.context,O=o.contextType,typeof O=="object"&&O!==null?O=Wn(O):(O=Tn(o)?Rr:ln.current,O=hs(i,O));var Le=o.getDerivedStateFromProps;(_e=typeof Le=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(D!==xe||me!==O)&&wh(i,M,l,O),sr=!1,me=i.memoizedState,M.state=me,Ta(i,l,M,c);var ze=i.memoizedState;D!==xe||me!==ze||En.current||sr?(typeof Le=="function"&&(Nu(i,o,Le,l),ze=i.memoizedState),(J=sr||Eh(i,o,J,l,me,ze,O)||!1)?(_e||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(l,ze,O),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(l,ze,O)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=ze),M.props=l,M.state=ze,M.context=O,l=J):(typeof M.componentDidUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&me===t.memoizedState||(i.flags|=1024),l=!1)}return Bu(t,i,o,l,h,c)}function Bu(t,i,o,l,c,h){Nh(t,i);var M=(i.flags&128)!==0;if(!l&&!M)return c&&Vd(i,o,!1),Ii(t,i,h);l=i.stateNode,S_.current=i;var D=M&&typeof o.getDerivedStateFromError!="function"?null:l.render();return i.flags|=1,t!==null&&M?(i.child=_s(i,t.child,null,h),i.child=_s(i,null,D,h)):_n(t,i,D,h),i.memoizedState=l.state,c&&Vd(i,o,!0),i.child}function Oh(t){var i=t.stateNode;i.pendingContext?zd(t,i.pendingContext,i.pendingContext!==i.context):i.context&&zd(t,i.context,!1),Eu(t,i.containerInfo)}function kh(t,i,o,l,c){return gs(),gu(c),i.flags|=256,_n(t,i,o,l),i.child}var Vu={dehydrated:null,treeContext:null,retryLane:0};function Hu(t){return{baseLanes:t,cachePool:null,transitions:null}}function zh(t,i,o){var l=i.pendingProps,c=Ot.current,h=!1,M=(i.flags&128)!==0,D;if((D=M)||(D=t!==null&&t.memoizedState===null?!1:(c&2)!==0),D?(h=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(c|=1),Lt(Ot,c&1),t===null)return mu(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=l.children,t=l.fallback,h?(l=i.mode,h=i.child,M={mode:"hidden",children:M},(l&1)===0&&h!==null?(h.childLanes=0,h.pendingProps=M):h=Xa(M,l,0,null),t=kr(t,l,o,null),h.return=i,t.return=i,h.sibling=t,i.child=h,i.child.memoizedState=Hu(o),i.memoizedState=Vu,t):Gu(i,M));if(c=t.memoizedState,c!==null&&(D=c.dehydrated,D!==null))return M_(t,i,M,l,D,c,o);if(h){h=l.fallback,M=i.mode,c=t.child,D=c.sibling;var O={mode:"hidden",children:l.children};return(M&1)===0&&i.child!==c?(l=i.child,l.childLanes=0,l.pendingProps=O,i.deletions=null):(l=dr(c,O),l.subtreeFlags=c.subtreeFlags&14680064),D!==null?h=dr(D,h):(h=kr(h,M,o,null),h.flags|=2),h.return=i,l.return=i,l.sibling=h,i.child=l,l=h,h=i.child,M=t.child.memoizedState,M=M===null?Hu(o):{baseLanes:M.baseLanes|o,cachePool:null,transitions:M.transitions},h.memoizedState=M,h.childLanes=t.childLanes&~o,i.memoizedState=Vu,l}return h=t.child,t=h.sibling,l=dr(h,{mode:"visible",children:l.children}),(i.mode&1)===0&&(l.lanes=o),l.return=i,l.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=l,i.memoizedState=null,l}function Gu(t,i){return i=Xa({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function La(t,i,o,l){return l!==null&&gu(l),_s(i,t.child,null,o),t=Gu(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function M_(t,i,o,l,c,h,M){if(o)return i.flags&256?(i.flags&=-257,l=Ou(Error(n(422))),La(t,i,M,l)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(h=l.fallback,c=i.mode,l=Xa({mode:"visible",children:l.children},c,0,null),h=kr(h,c,M,null),h.flags|=2,l.return=i,h.return=i,l.sibling=h,i.child=l,(i.mode&1)!==0&&_s(i,t.child,null,M),i.child.memoizedState=Hu(M),i.memoizedState=Vu,h);if((i.mode&1)===0)return La(t,i,M,null);if(c.data==="$!"){if(l=c.nextSibling&&c.nextSibling.dataset,l)var D=l.dgst;return l=D,h=Error(n(419)),l=Ou(h,l,void 0),La(t,i,M,l)}if(D=(M&t.childLanes)!==0,wn||D){if(l=en,l!==null){switch(M&-M){case 4:c=2;break;case 16:c=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:c=32;break;case 536870912:c=268435456;break;default:c=0}c=(c&(l.suspendedLanes|M))!==0?0:c,c!==0&&c!==h.retryLane&&(h.retryLane=c,Di(t,c),ai(l,t,c,-1))}return sc(),l=Ou(Error(n(421))),La(t,i,M,l)}return c.data==="$?"?(i.flags|=128,i.child=t.child,i=N_.bind(null,t),c._reactRetry=i,null):(t=h.treeContext,Nn=tr(c.nextSibling),Un=i,Ft=!0,ii=null,t!==null&&(Hn[Gn++]=bi,Hn[Gn++]=Pi,Hn[Gn++]=br,bi=t.id,Pi=t.overflow,br=i),i=Gu(i,l.children),i.flags|=4096,i)}function Bh(t,i,o){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),yu(t.return,i,o)}function Wu(t,i,o,l,c){var h=t.memoizedState;h===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:o,tailMode:c}:(h.isBackwards=i,h.rendering=null,h.renderingStartTime=0,h.last=l,h.tail=o,h.tailMode=c)}function Vh(t,i,o){var l=i.pendingProps,c=l.revealOrder,h=l.tail;if(_n(t,i,l.children,o),l=Ot.current,(l&2)!==0)l=l&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Bh(t,o,i);else if(t.tag===19)Bh(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}l&=1}if(Lt(Ot,l),(i.mode&1)===0)i.memoizedState=null;else switch(c){case"forwards":for(o=i.child,c=null;o!==null;)t=o.alternate,t!==null&&wa(t)===null&&(c=o),o=o.sibling;o=c,o===null?(c=i.child,i.child=null):(c=o.sibling,o.sibling=null),Wu(i,!1,c,o,h);break;case"backwards":for(o=null,c=i.child,i.child=null;c!==null;){if(t=c.alternate,t!==null&&wa(t)===null){i.child=c;break}t=c.sibling,c.sibling=o,o=c,c=t}Wu(i,!0,o,null,h);break;case"together":Wu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ia(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Ii(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Ur|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=dr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=dr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function E_(t,i,o){switch(i.tag){case 3:Oh(i),gs();break;case 5:th(i);break;case 1:Tn(i.type)&&ma(i);break;case 4:Eu(i,i.stateNode.containerInfo);break;case 10:var l=i.type._context,c=i.memoizedProps.value;Lt(Sa,l._currentValue),l._currentValue=c;break;case 13:if(l=i.memoizedState,l!==null)return l.dehydrated!==null?(Lt(Ot,Ot.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?zh(t,i,o):(Lt(Ot,Ot.current&1),t=Ii(t,i,o),t!==null?t.sibling:null);Lt(Ot,Ot.current&1);break;case 19:if(l=(o&i.childLanes)!==0,(t.flags&128)!==0){if(l)return Vh(t,i,o);i.flags|=128}if(c=i.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Lt(Ot,Ot.current),l)break;return null;case 22:case 23:return i.lanes=0,Uh(t,i,o)}return Ii(t,i,o)}var Hh,Xu,Gh,Wh;Hh=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Xu=function(){},Gh=function(t,i,o,l){var c=t.memoizedProps;if(c!==l){t=i.stateNode,Lr(vi.current);var h=null;switch(o){case"input":c=W(t,c),l=W(t,l),h=[];break;case"select":c=se({},c,{value:void 0}),l=se({},l,{value:void 0}),h=[];break;case"textarea":c=E(t,c),l=E(t,l),h=[];break;default:typeof c.onClick!="function"&&typeof l.onClick=="function"&&(t.onclick=da)}ft(o,l);var M;o=null;for(J in c)if(!l.hasOwnProperty(J)&&c.hasOwnProperty(J)&&c[J]!=null)if(J==="style"){var D=c[J];for(M in D)D.hasOwnProperty(M)&&(o||(o={}),o[M]="")}else J!=="dangerouslySetInnerHTML"&&J!=="children"&&J!=="suppressContentEditableWarning"&&J!=="suppressHydrationWarning"&&J!=="autoFocus"&&(a.hasOwnProperty(J)?h||(h=[]):(h=h||[]).push(J,null));for(J in l){var O=l[J];if(D=c!=null?c[J]:void 0,l.hasOwnProperty(J)&&O!==D&&(O!=null||D!=null))if(J==="style")if(D){for(M in D)!D.hasOwnProperty(M)||O&&O.hasOwnProperty(M)||(o||(o={}),o[M]="");for(M in O)O.hasOwnProperty(M)&&D[M]!==O[M]&&(o||(o={}),o[M]=O[M])}else o||(h||(h=[]),h.push(J,o)),o=O;else J==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,D=D?D.__html:void 0,O!=null&&D!==O&&(h=h||[]).push(J,O)):J==="children"?typeof O!="string"&&typeof O!="number"||(h=h||[]).push(J,""+O):J!=="suppressContentEditableWarning"&&J!=="suppressHydrationWarning"&&(a.hasOwnProperty(J)?(O!=null&&J==="onScroll"&&Ut("scroll",t),h||D===O||(h=[])):(h=h||[]).push(J,O))}o&&(h=h||[]).push("style",o);var J=h;(i.updateQueue=J)&&(i.flags|=4)}},Wh=function(t,i,o,l){o!==l&&(i.flags|=4)};function Co(t,i){if(!Ft)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var l=null;o!==null;)o.alternate!==null&&(l=o),o=o.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function cn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,l=0;if(i)for(var c=t.child;c!==null;)o|=c.lanes|c.childLanes,l|=c.subtreeFlags&14680064,l|=c.flags&14680064,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)o|=c.lanes|c.childLanes,l|=c.subtreeFlags,l|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=l,t.childLanes=o,i}function T_(t,i,o){var l=i.pendingProps;switch(hu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return cn(i),null;case 1:return Tn(i.type)&&pa(),cn(i),null;case 3:return l=i.stateNode,ys(),Nt(En),Nt(ln),Au(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(t===null||t.child===null)&&(xa(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(nc(ii),ii=null))),Xu(t,i),cn(i),null;case 5:Tu(i);var c=Lr(Mo.current);if(o=i.type,t!==null&&i.stateNode!=null)Gh(t,i,o,l,c),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!l){if(i.stateNode===null)throw Error(n(166));return cn(i),null}if(t=Lr(vi.current),xa(i)){l=i.stateNode,o=i.type;var h=i.memoizedProps;switch(l[_i]=i,l[_o]=h,t=(i.mode&1)!==0,o){case"dialog":Ut("cancel",l),Ut("close",l);break;case"iframe":case"object":case"embed":Ut("load",l);break;case"video":case"audio":for(c=0;c<po.length;c++)Ut(po[c],l);break;case"source":Ut("error",l);break;case"img":case"image":case"link":Ut("error",l),Ut("load",l);break;case"details":Ut("toggle",l);break;case"input":pn(l,h),Ut("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!h.multiple},Ut("invalid",l);break;case"textarea":K(l,h),Ut("invalid",l)}ft(o,h),c=null;for(var M in h)if(h.hasOwnProperty(M)){var D=h[M];M==="children"?typeof D=="string"?l.textContent!==D&&(h.suppressHydrationWarning!==!0&&fa(l.textContent,D,t),c=["children",D]):typeof D=="number"&&l.textContent!==""+D&&(h.suppressHydrationWarning!==!0&&fa(l.textContent,D,t),c=["children",""+D]):a.hasOwnProperty(M)&&D!=null&&M==="onScroll"&&Ut("scroll",l)}switch(o){case"input":At(l),qe(l,h,!0);break;case"textarea":At(l),ge(l);break;case"select":case"option":break;default:typeof h.onClick=="function"&&(l.onclick=da)}l=c,i.updateQueue=l,l!==null&&(i.flags|=4)}else{M=c.nodeType===9?c:c.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ce(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=M.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof l.is=="string"?t=M.createElement(o,{is:l.is}):(t=M.createElement(o),o==="select"&&(M=t,l.multiple?M.multiple=!0:l.size&&(M.size=l.size))):t=M.createElementNS(t,o),t[_i]=i,t[_o]=l,Hh(t,i,!1,!1),i.stateNode=t;e:{switch(M=it(o,l),o){case"dialog":Ut("cancel",t),Ut("close",t),c=l;break;case"iframe":case"object":case"embed":Ut("load",t),c=l;break;case"video":case"audio":for(c=0;c<po.length;c++)Ut(po[c],t);c=l;break;case"source":Ut("error",t),c=l;break;case"img":case"image":case"link":Ut("error",t),Ut("load",t),c=l;break;case"details":Ut("toggle",t),c=l;break;case"input":pn(t,l),c=W(t,l),Ut("invalid",t);break;case"option":c=l;break;case"select":t._wrapperState={wasMultiple:!!l.multiple},c=se({},l,{value:void 0}),Ut("invalid",t);break;case"textarea":K(t,l),c=E(t,l),Ut("invalid",t);break;default:c=l}ft(o,c),D=c;for(h in D)if(D.hasOwnProperty(h)){var O=D[h];h==="style"?Je(t,O):h==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,O!=null&&Ne(t,O)):h==="children"?typeof O=="string"?(o!=="textarea"||O!=="")&&ut(t,O):typeof O=="number"&&ut(t,""+O):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(a.hasOwnProperty(h)?O!=null&&h==="onScroll"&&Ut("scroll",t):O!=null&&L(t,h,O,M))}switch(o){case"input":At(t),qe(t,l,!1);break;case"textarea":At(t),ge(t);break;case"option":l.value!=null&&t.setAttribute("value",""+Ae(l.value));break;case"select":t.multiple=!!l.multiple,h=l.value,h!=null?P(t,!!l.multiple,h,!1):l.defaultValue!=null&&P(t,!!l.multiple,l.defaultValue,!0);break;default:typeof c.onClick=="function"&&(t.onclick=da)}switch(o){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return cn(i),null;case 6:if(t&&i.stateNode!=null)Wh(t,i,t.memoizedProps,l);else{if(typeof l!="string"&&i.stateNode===null)throw Error(n(166));if(o=Lr(Mo.current),Lr(vi.current),xa(i)){if(l=i.stateNode,o=i.memoizedProps,l[_i]=i,(h=l.nodeValue!==o)&&(t=Un,t!==null))switch(t.tag){case 3:fa(l.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&fa(l.nodeValue,o,(t.mode&1)!==0)}h&&(i.flags|=4)}else l=(o.nodeType===9?o:o.ownerDocument).createTextNode(l),l[_i]=i,i.stateNode=l}return cn(i),null;case 13:if(Nt(Ot),l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ft&&Nn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Yd(),gs(),i.flags|=98560,h=!1;else if(h=xa(i),l!==null&&l.dehydrated!==null){if(t===null){if(!h)throw Error(n(318));if(h=i.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(n(317));h[_i]=i}else gs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;cn(i),h=!1}else ii!==null&&(nc(ii),ii=null),h=!0;if(!h)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(l=l!==null,l!==(t!==null&&t.memoizedState!==null)&&l&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(Ot.current&1)!==0?Kt===0&&(Kt=3):sc())),i.updateQueue!==null&&(i.flags|=4),cn(i),null);case 4:return ys(),Xu(t,i),t===null&&mo(i.stateNode.containerInfo),cn(i),null;case 10:return xu(i.type._context),cn(i),null;case 17:return Tn(i.type)&&pa(),cn(i),null;case 19:if(Nt(Ot),h=i.memoizedState,h===null)return cn(i),null;if(l=(i.flags&128)!==0,M=h.rendering,M===null)if(l)Co(h,!1);else{if(Kt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(M=wa(t),M!==null){for(i.flags|=128,Co(h,!1),l=M.updateQueue,l!==null&&(i.updateQueue=l,i.flags|=4),i.subtreeFlags=0,l=o,o=i.child;o!==null;)h=o,t=l,h.flags&=14680066,M=h.alternate,M===null?(h.childLanes=0,h.lanes=t,h.child=null,h.subtreeFlags=0,h.memoizedProps=null,h.memoizedState=null,h.updateQueue=null,h.dependencies=null,h.stateNode=null):(h.childLanes=M.childLanes,h.lanes=M.lanes,h.child=M.child,h.subtreeFlags=0,h.deletions=null,h.memoizedProps=M.memoizedProps,h.memoizedState=M.memoizedState,h.updateQueue=M.updateQueue,h.type=M.type,t=M.dependencies,h.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Lt(Ot,Ot.current&1|2),i.child}t=t.sibling}h.tail!==null&&Se()>Ts&&(i.flags|=128,l=!0,Co(h,!1),i.lanes=4194304)}else{if(!l)if(t=wa(M),t!==null){if(i.flags|=128,l=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Co(h,!0),h.tail===null&&h.tailMode==="hidden"&&!M.alternate&&!Ft)return cn(i),null}else 2*Se()-h.renderingStartTime>Ts&&o!==1073741824&&(i.flags|=128,l=!0,Co(h,!1),i.lanes=4194304);h.isBackwards?(M.sibling=i.child,i.child=M):(o=h.last,o!==null?o.sibling=M:i.child=M,h.last=M)}return h.tail!==null?(i=h.tail,h.rendering=i,h.tail=i.sibling,h.renderingStartTime=Se(),i.sibling=null,o=Ot.current,Lt(Ot,l?o&1|2:o&1),i):(cn(i),null);case 22:case 23:return rc(),l=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==l&&(i.flags|=8192),l&&(i.mode&1)!==0?(Fn&1073741824)!==0&&(cn(i),i.subtreeFlags&6&&(i.flags|=8192)):cn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function w_(t,i){switch(hu(i),i.tag){case 1:return Tn(i.type)&&pa(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ys(),Nt(En),Nt(ln),Au(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Tu(i),null;case 13:if(Nt(Ot),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));gs()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Nt(Ot),null;case 4:return ys(),null;case 10:return xu(i.type._context),null;case 22:case 23:return rc(),null;case 24:return null;default:return null}}var Ua=!1,fn=!1,A_=typeof WeakSet=="function"?WeakSet:Set,Fe=null;function Ms(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(l){zt(t,i,l)}else o.current=null}function ju(t,i,o){try{o()}catch(l){zt(t,i,l)}}var Xh=!1;function C_(t,i){if(ru=ea,t=Ed(),$l(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var l=o.getSelection&&o.getSelection();if(l&&l.rangeCount!==0){o=l.anchorNode;var c=l.anchorOffset,h=l.focusNode;l=l.focusOffset;try{o.nodeType,h.nodeType}catch{o=null;break e}var M=0,D=-1,O=-1,J=0,_e=0,xe=t,me=null;t:for(;;){for(var Le;xe!==o||c!==0&&xe.nodeType!==3||(D=M+c),xe!==h||l!==0&&xe.nodeType!==3||(O=M+l),xe.nodeType===3&&(M+=xe.nodeValue.length),(Le=xe.firstChild)!==null;)me=xe,xe=Le;for(;;){if(xe===t)break t;if(me===o&&++J===c&&(D=M),me===h&&++_e===l&&(O=M),(Le=xe.nextSibling)!==null)break;xe=me,me=xe.parentNode}xe=Le}o=D===-1||O===-1?null:{start:D,end:O}}else o=null}o=o||{start:0,end:0}}else o=null;for(su={focusedElem:t,selectionRange:o},ea=!1,Fe=i;Fe!==null;)if(i=Fe,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,Fe=t;else for(;Fe!==null;){i=Fe;try{var ze=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(ze!==null){var Ve=ze.memoizedProps,Bt=ze.memoizedState,Y=i.stateNode,B=Y.getSnapshotBeforeUpdate(i.elementType===i.type?Ve:ri(i.type,Ve),Bt);Y.__reactInternalSnapshotBeforeUpdate=B}break;case 3:var q=i.stateNode.containerInfo;q.nodeType===1?q.textContent="":q.nodeType===9&&q.documentElement&&q.removeChild(q.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Ee){zt(i,i.return,Ee)}if(t=i.sibling,t!==null){t.return=i.return,Fe=t;break}Fe=i.return}return ze=Xh,Xh=!1,ze}function Ro(t,i,o){var l=i.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var c=l=l.next;do{if((c.tag&t)===t){var h=c.destroy;c.destroy=void 0,h!==void 0&&ju(i,o,h)}c=c.next}while(c!==l)}}function Na(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var l=o.create;o.destroy=l()}o=o.next}while(o!==i)}}function Yu(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function jh(t){var i=t.alternate;i!==null&&(t.alternate=null,jh(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[_i],delete i[_o],delete i[uu],delete i[u_],delete i[c_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Yh(t){return t.tag===5||t.tag===3||t.tag===4}function qh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Yh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function qu(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=da));else if(l!==4&&(t=t.child,t!==null))for(qu(t,i,o),t=t.sibling;t!==null;)qu(t,i,o),t=t.sibling}function Ku(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(l!==4&&(t=t.child,t!==null))for(Ku(t,i,o),t=t.sibling;t!==null;)Ku(t,i,o),t=t.sibling}var rn=null,si=!1;function ar(t,i,o){for(o=o.child;o!==null;)Kh(t,i,o),o=o.sibling}function Kh(t,i,o){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(Mt,o)}catch{}switch(o.tag){case 5:fn||Ms(o,i);case 6:var l=rn,c=si;rn=null,ar(t,i,o),rn=l,si=c,rn!==null&&(si?(t=rn,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):rn.removeChild(o.stateNode));break;case 18:rn!==null&&(si?(t=rn,o=o.stateNode,t.nodeType===8?lu(t.parentNode,o):t.nodeType===1&&lu(t,o),so(t)):lu(rn,o.stateNode));break;case 4:l=rn,c=si,rn=o.stateNode.containerInfo,si=!0,ar(t,i,o),rn=l,si=c;break;case 0:case 11:case 14:case 15:if(!fn&&(l=o.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){c=l=l.next;do{var h=c,M=h.destroy;h=h.tag,M!==void 0&&((h&2)!==0||(h&4)!==0)&&ju(o,i,M),c=c.next}while(c!==l)}ar(t,i,o);break;case 1:if(!fn&&(Ms(o,i),l=o.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=o.memoizedProps,l.state=o.memoizedState,l.componentWillUnmount()}catch(D){zt(o,i,D)}ar(t,i,o);break;case 21:ar(t,i,o);break;case 22:o.mode&1?(fn=(l=fn)||o.memoizedState!==null,ar(t,i,o),fn=l):ar(t,i,o);break;default:ar(t,i,o)}}function $h(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new A_),i.forEach(function(l){var c=F_.bind(null,t,l);o.has(l)||(o.add(l),l.then(c,c))})}}function oi(t,i){var o=i.deletions;if(o!==null)for(var l=0;l<o.length;l++){var c=o[l];try{var h=t,M=i,D=M;e:for(;D!==null;){switch(D.tag){case 5:rn=D.stateNode,si=!1;break e;case 3:rn=D.stateNode.containerInfo,si=!0;break e;case 4:rn=D.stateNode.containerInfo,si=!0;break e}D=D.return}if(rn===null)throw Error(n(160));Kh(h,M,c),rn=null,si=!1;var O=c.alternate;O!==null&&(O.return=null),c.return=null}catch(J){zt(c,i,J)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Zh(i,t),i=i.sibling}function Zh(t,i){var o=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(oi(i,t),yi(t),l&4){try{Ro(3,t,t.return),Na(3,t)}catch(Ve){zt(t,t.return,Ve)}try{Ro(5,t,t.return)}catch(Ve){zt(t,t.return,Ve)}}break;case 1:oi(i,t),yi(t),l&512&&o!==null&&Ms(o,o.return);break;case 5:if(oi(i,t),yi(t),l&512&&o!==null&&Ms(o,o.return),t.flags&32){var c=t.stateNode;try{ut(c,"")}catch(Ve){zt(t,t.return,Ve)}}if(l&4&&(c=t.stateNode,c!=null)){var h=t.memoizedProps,M=o!==null?o.memoizedProps:h,D=t.type,O=t.updateQueue;if(t.updateQueue=null,O!==null)try{D==="input"&&h.type==="radio"&&h.name!=null&&ht(c,h),it(D,M);var J=it(D,h);for(M=0;M<O.length;M+=2){var _e=O[M],xe=O[M+1];_e==="style"?Je(c,xe):_e==="dangerouslySetInnerHTML"?Ne(c,xe):_e==="children"?ut(c,xe):L(c,_e,xe,J)}switch(D){case"input":ct(c,h);break;case"textarea":pe(c,h);break;case"select":var me=c._wrapperState.wasMultiple;c._wrapperState.wasMultiple=!!h.multiple;var Le=h.value;Le!=null?P(c,!!h.multiple,Le,!1):me!==!!h.multiple&&(h.defaultValue!=null?P(c,!!h.multiple,h.defaultValue,!0):P(c,!!h.multiple,h.multiple?[]:"",!1))}c[_o]=h}catch(Ve){zt(t,t.return,Ve)}}break;case 6:if(oi(i,t),yi(t),l&4){if(t.stateNode===null)throw Error(n(162));c=t.stateNode,h=t.memoizedProps;try{c.nodeValue=h}catch(Ve){zt(t,t.return,Ve)}}break;case 3:if(oi(i,t),yi(t),l&4&&o!==null&&o.memoizedState.isDehydrated)try{so(i.containerInfo)}catch(Ve){zt(t,t.return,Ve)}break;case 4:oi(i,t),yi(t);break;case 13:oi(i,t),yi(t),c=t.child,c.flags&8192&&(h=c.memoizedState!==null,c.stateNode.isHidden=h,!h||c.alternate!==null&&c.alternate.memoizedState!==null||(Qu=Se())),l&4&&$h(t);break;case 22:if(_e=o!==null&&o.memoizedState!==null,t.mode&1?(fn=(J=fn)||_e,oi(i,t),fn=J):oi(i,t),yi(t),l&8192){if(J=t.memoizedState!==null,(t.stateNode.isHidden=J)&&!_e&&(t.mode&1)!==0)for(Fe=t,_e=t.child;_e!==null;){for(xe=Fe=_e;Fe!==null;){switch(me=Fe,Le=me.child,me.tag){case 0:case 11:case 14:case 15:Ro(4,me,me.return);break;case 1:Ms(me,me.return);var ze=me.stateNode;if(typeof ze.componentWillUnmount=="function"){l=me,o=me.return;try{i=l,ze.props=i.memoizedProps,ze.state=i.memoizedState,ze.componentWillUnmount()}catch(Ve){zt(l,o,Ve)}}break;case 5:Ms(me,me.return);break;case 22:if(me.memoizedState!==null){ep(xe);continue}}Le!==null?(Le.return=me,Fe=Le):ep(xe)}_e=_e.sibling}e:for(_e=null,xe=t;;){if(xe.tag===5){if(_e===null){_e=xe;try{c=xe.stateNode,J?(h=c.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none"):(D=xe.stateNode,O=xe.memoizedProps.style,M=O!=null&&O.hasOwnProperty("display")?O.display:null,D.style.display=Qe("display",M))}catch(Ve){zt(t,t.return,Ve)}}}else if(xe.tag===6){if(_e===null)try{xe.stateNode.nodeValue=J?"":xe.memoizedProps}catch(Ve){zt(t,t.return,Ve)}}else if((xe.tag!==22&&xe.tag!==23||xe.memoizedState===null||xe===t)&&xe.child!==null){xe.child.return=xe,xe=xe.child;continue}if(xe===t)break e;for(;xe.sibling===null;){if(xe.return===null||xe.return===t)break e;_e===xe&&(_e=null),xe=xe.return}_e===xe&&(_e=null),xe.sibling.return=xe.return,xe=xe.sibling}}break;case 19:oi(i,t),yi(t),l&4&&$h(t);break;case 21:break;default:oi(i,t),yi(t)}}function yi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(Yh(o)){var l=o;break e}o=o.return}throw Error(n(160))}switch(l.tag){case 5:var c=l.stateNode;l.flags&32&&(ut(c,""),l.flags&=-33);var h=qh(t);Ku(t,h,c);break;case 3:case 4:var M=l.stateNode.containerInfo,D=qh(t);qu(t,D,M);break;default:throw Error(n(161))}}catch(O){zt(t,t.return,O)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function R_(t,i,o){Fe=t,Qh(t)}function Qh(t,i,o){for(var l=(t.mode&1)!==0;Fe!==null;){var c=Fe,h=c.child;if(c.tag===22&&l){var M=c.memoizedState!==null||Ua;if(!M){var D=c.alternate,O=D!==null&&D.memoizedState!==null||fn;D=Ua;var J=fn;if(Ua=M,(fn=O)&&!J)for(Fe=c;Fe!==null;)M=Fe,O=M.child,M.tag===22&&M.memoizedState!==null?tp(c):O!==null?(O.return=M,Fe=O):tp(c);for(;h!==null;)Fe=h,Qh(h),h=h.sibling;Fe=c,Ua=D,fn=J}Jh(t)}else(c.subtreeFlags&8772)!==0&&h!==null?(h.return=c,Fe=h):Jh(t)}}function Jh(t){for(;Fe!==null;){var i=Fe;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:fn||Na(5,i);break;case 1:var l=i.stateNode;if(i.flags&4&&!fn)if(o===null)l.componentDidMount();else{var c=i.elementType===i.type?o.memoizedProps:ri(i.type,o.memoizedProps);l.componentDidUpdate(c,o.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var h=i.updateQueue;h!==null&&eh(i,h,l);break;case 3:var M=i.updateQueue;if(M!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}eh(i,M,o)}break;case 5:var D=i.stateNode;if(o===null&&i.flags&4){o=D;var O=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":O.autoFocus&&o.focus();break;case"img":O.src&&(o.src=O.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var J=i.alternate;if(J!==null){var _e=J.memoizedState;if(_e!==null){var xe=_e.dehydrated;xe!==null&&so(xe)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}fn||i.flags&512&&Yu(i)}catch(me){zt(i,i.return,me)}}if(i===t){Fe=null;break}if(o=i.sibling,o!==null){o.return=i.return,Fe=o;break}Fe=i.return}}function ep(t){for(;Fe!==null;){var i=Fe;if(i===t){Fe=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Fe=o;break}Fe=i.return}}function tp(t){for(;Fe!==null;){var i=Fe;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Na(4,i)}catch(O){zt(i,o,O)}break;case 1:var l=i.stateNode;if(typeof l.componentDidMount=="function"){var c=i.return;try{l.componentDidMount()}catch(O){zt(i,c,O)}}var h=i.return;try{Yu(i)}catch(O){zt(i,h,O)}break;case 5:var M=i.return;try{Yu(i)}catch(O){zt(i,M,O)}}}catch(O){zt(i,i.return,O)}if(i===t){Fe=null;break}var D=i.sibling;if(D!==null){D.return=i.return,Fe=D;break}Fe=i.return}}var b_=Math.ceil,Fa=R.ReactCurrentDispatcher,$u=R.ReactCurrentOwner,jn=R.ReactCurrentBatchConfig,vt=0,en=null,Gt=null,sn=0,Fn=0,Es=nr(0),Kt=0,bo=null,Ur=0,Oa=0,Zu=0,Po=null,An=null,Qu=0,Ts=1/0,Ui=null,ka=!1,Ju=null,lr=null,za=!1,ur=null,Ba=0,Do=0,ec=null,Va=-1,Ha=0;function vn(){return(vt&6)!==0?Se():Va!==-1?Va:Va=Se()}function cr(t){return(t.mode&1)===0?1:(vt&2)!==0&&sn!==0?sn&-sn:d_.transition!==null?(Ha===0&&(Ha=gn()),Ha):(t=wt,t!==0||(t=window.event,t=t===void 0?16:id(t.type)),t)}function ai(t,i,o,l){if(50<Do)throw Do=0,ec=null,Error(n(185));Mn(t,o,l),((vt&2)===0||t!==en)&&(t===en&&((vt&2)===0&&(Oa|=o),Kt===4&&fr(t,sn)),Cn(t,l),o===1&&vt===0&&(i.mode&1)===0&&(Ts=Se()+500,ga&&rr()))}function Cn(t,i){var o=t.callbackNode;Bn(t,i);var l=gi(t,t===en?sn:0);if(l===0)o!==null&&te(o),t.callbackNode=null,t.callbackPriority=0;else if(i=l&-l,t.callbackPriority!==i){if(o!=null&&te(o),i===1)t.tag===0?f_(ip.bind(null,t)):Hd(ip.bind(null,t)),a_(function(){(vt&6)===0&&rr()}),o=null;else{switch(Kf(l)){case 1:o=Be;break;case 4:o=et;break;case 16:o=nt;break;case 536870912:o=gt;break;default:o=nt}o=fp(o,np.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function np(t,i){if(Va=-1,Ha=0,(vt&6)!==0)throw Error(n(327));var o=t.callbackNode;if(ws()&&t.callbackNode!==o)return null;var l=gi(t,t===en?sn:0);if(l===0)return null;if((l&30)!==0||(l&t.expiredLanes)!==0||i)i=Ga(t,l);else{i=l;var c=vt;vt|=2;var h=sp();(en!==t||sn!==i)&&(Ui=null,Ts=Se()+500,Fr(t,i));do try{L_();break}catch(D){rp(t,D)}while(!0);vu(),Fa.current=h,vt=c,Gt!==null?i=0:(en=null,sn=0,i=Kt)}if(i!==0){if(i===2&&(c=Ai(t),c!==0&&(l=c,i=tc(t,c))),i===1)throw o=bo,Fr(t,0),fr(t,l),Cn(t,Se()),o;if(i===6)fr(t,l);else{if(c=t.current.alternate,(l&30)===0&&!P_(c)&&(i=Ga(t,l),i===2&&(h=Ai(t),h!==0&&(l=h,i=tc(t,h))),i===1))throw o=bo,Fr(t,0),fr(t,l),Cn(t,Se()),o;switch(t.finishedWork=c,t.finishedLanes=l,i){case 0:case 1:throw Error(n(345));case 2:Or(t,An,Ui);break;case 3:if(fr(t,l),(l&130023424)===l&&(i=Qu+500-Se(),10<i)){if(gi(t,0)!==0)break;if(c=t.suspendedLanes,(c&l)!==l){vn(),t.pingedLanes|=t.suspendedLanes&c;break}t.timeoutHandle=au(Or.bind(null,t,An,Ui),i);break}Or(t,An,Ui);break;case 4:if(fr(t,l),(l&4194240)===l)break;for(i=t.eventTimes,c=-1;0<l;){var M=31-st(l);h=1<<M,M=i[M],M>c&&(c=M),l&=~h}if(l=c,l=Se()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*b_(l/1960))-l,10<l){t.timeoutHandle=au(Or.bind(null,t,An,Ui),l);break}Or(t,An,Ui);break;case 5:Or(t,An,Ui);break;default:throw Error(n(329))}}}return Cn(t,Se()),t.callbackNode===o?np.bind(null,t):null}function tc(t,i){var o=Po;return t.current.memoizedState.isDehydrated&&(Fr(t,i).flags|=256),t=Ga(t,i),t!==2&&(i=An,An=o,i!==null&&nc(i)),t}function nc(t){An===null?An=t:An.push.apply(An,t)}function P_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var l=0;l<o.length;l++){var c=o[l],h=c.getSnapshot;c=c.value;try{if(!ni(h(),c))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function fr(t,i){for(i&=~Zu,i&=~Oa,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-st(i),l=1<<o;t[o]=-1,i&=~l}}function ip(t){if((vt&6)!==0)throw Error(n(327));ws();var i=gi(t,0);if((i&1)===0)return Cn(t,Se()),null;var o=Ga(t,i);if(t.tag!==0&&o===2){var l=Ai(t);l!==0&&(i=l,o=tc(t,l))}if(o===1)throw o=bo,Fr(t,0),fr(t,i),Cn(t,Se()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Or(t,An,Ui),Cn(t,Se()),null}function ic(t,i){var o=vt;vt|=1;try{return t(i)}finally{vt=o,vt===0&&(Ts=Se()+500,ga&&rr())}}function Nr(t){ur!==null&&ur.tag===0&&(vt&6)===0&&ws();var i=vt;vt|=1;var o=jn.transition,l=wt;try{if(jn.transition=null,wt=1,t)return t()}finally{wt=l,jn.transition=o,vt=i,(vt&6)===0&&rr()}}function rc(){Fn=Es.current,Nt(Es)}function Fr(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,o_(o)),Gt!==null)for(o=Gt.return;o!==null;){var l=o;switch(hu(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&pa();break;case 3:ys(),Nt(En),Nt(ln),Au();break;case 5:Tu(l);break;case 4:ys();break;case 13:Nt(Ot);break;case 19:Nt(Ot);break;case 10:xu(l.type._context);break;case 22:case 23:rc()}o=o.return}if(en=t,Gt=t=dr(t.current,null),sn=Fn=i,Kt=0,bo=null,Zu=Oa=Ur=0,An=Po=null,Dr!==null){for(i=0;i<Dr.length;i++)if(o=Dr[i],l=o.interleaved,l!==null){o.interleaved=null;var c=l.next,h=o.pending;if(h!==null){var M=h.next;h.next=c,l.next=M}o.pending=l}Dr=null}return t}function rp(t,i){do{var o=Gt;try{if(vu(),Aa.current=Pa,Ca){for(var l=kt.memoizedState;l!==null;){var c=l.queue;c!==null&&(c.pending=null),l=l.next}Ca=!1}if(Ir=0,Jt=qt=kt=null,Eo=!1,To=0,$u.current=null,o===null||o.return===null){Kt=1,bo=i,Gt=null;break}e:{var h=t,M=o.return,D=o,O=i;if(i=sn,D.flags|=32768,O!==null&&typeof O=="object"&&typeof O.then=="function"){var J=O,_e=D,xe=_e.tag;if((_e.mode&1)===0&&(xe===0||xe===11||xe===15)){var me=_e.alternate;me?(_e.updateQueue=me.updateQueue,_e.memoizedState=me.memoizedState,_e.lanes=me.lanes):(_e.updateQueue=null,_e.memoizedState=null)}var Le=bh(M);if(Le!==null){Le.flags&=-257,Ph(Le,M,D,h,i),Le.mode&1&&Rh(h,J,i),i=Le,O=J;var ze=i.updateQueue;if(ze===null){var Ve=new Set;Ve.add(O),i.updateQueue=Ve}else ze.add(O);break e}else{if((i&1)===0){Rh(h,J,i),sc();break e}O=Error(n(426))}}else if(Ft&&D.mode&1){var Bt=bh(M);if(Bt!==null){(Bt.flags&65536)===0&&(Bt.flags|=256),Ph(Bt,M,D,h,i),gu(Ss(O,D));break e}}h=O=Ss(O,D),Kt!==4&&(Kt=2),Po===null?Po=[h]:Po.push(h),h=M;do{switch(h.tag){case 3:h.flags|=65536,i&=-i,h.lanes|=i;var Y=Ah(h,O,i);Jd(h,Y);break e;case 1:D=O;var B=h.type,q=h.stateNode;if((h.flags&128)===0&&(typeof B.getDerivedStateFromError=="function"||q!==null&&typeof q.componentDidCatch=="function"&&(lr===null||!lr.has(q)))){h.flags|=65536,i&=-i,h.lanes|=i;var Ee=Ch(h,D,i);Jd(h,Ee);break e}}h=h.return}while(h!==null)}ap(o)}catch(Xe){i=Xe,Gt===o&&o!==null&&(Gt=o=o.return);continue}break}while(!0)}function sp(){var t=Fa.current;return Fa.current=Pa,t===null?Pa:t}function sc(){(Kt===0||Kt===3||Kt===2)&&(Kt=4),en===null||(Ur&268435455)===0&&(Oa&268435455)===0||fr(en,sn)}function Ga(t,i){var o=vt;vt|=2;var l=sp();(en!==t||sn!==i)&&(Ui=null,Fr(t,i));do try{D_();break}catch(c){rp(t,c)}while(!0);if(vu(),vt=o,Fa.current=l,Gt!==null)throw Error(n(261));return en=null,sn=0,Kt}function D_(){for(;Gt!==null;)op(Gt)}function L_(){for(;Gt!==null&&!G();)op(Gt)}function op(t){var i=cp(t.alternate,t,Fn);t.memoizedProps=t.pendingProps,i===null?ap(t):Gt=i,$u.current=null}function ap(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=T_(o,i,Fn),o!==null){Gt=o;return}}else{if(o=w_(o,i),o!==null){o.flags&=32767,Gt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Kt=6,Gt=null;return}}if(i=i.sibling,i!==null){Gt=i;return}Gt=i=t}while(i!==null);Kt===0&&(Kt=5)}function Or(t,i,o){var l=wt,c=jn.transition;try{jn.transition=null,wt=1,I_(t,i,o,l)}finally{jn.transition=c,wt=l}return null}function I_(t,i,o,l){do ws();while(ur!==null);if((vt&6)!==0)throw Error(n(327));o=t.finishedWork;var c=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var h=o.lanes|o.childLanes;if(Zo(t,h),t===en&&(Gt=en=null,sn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||za||(za=!0,fp(nt,function(){return ws(),null})),h=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||h){h=jn.transition,jn.transition=null;var M=wt;wt=1;var D=vt;vt|=4,$u.current=null,C_(t,o),Zh(o,t),Jg(su),ea=!!ru,su=ru=null,t.current=o,R_(o),Te(),vt=D,wt=M,jn.transition=h}else t.current=o;if(za&&(za=!1,ur=t,Ba=c),h=t.pendingLanes,h===0&&(lr=null),on(o.stateNode),Cn(t,Se()),i!==null)for(l=t.onRecoverableError,o=0;o<i.length;o++)c=i[o],l(c.value,{componentStack:c.stack,digest:c.digest});if(ka)throw ka=!1,t=Ju,Ju=null,t;return(Ba&1)!==0&&t.tag!==0&&ws(),h=t.pendingLanes,(h&1)!==0?t===ec?Do++:(Do=0,ec=t):Do=0,rr(),null}function ws(){if(ur!==null){var t=Kf(Ba),i=jn.transition,o=wt;try{if(jn.transition=null,wt=16>t?16:t,ur===null)var l=!1;else{if(t=ur,ur=null,Ba=0,(vt&6)!==0)throw Error(n(331));var c=vt;for(vt|=4,Fe=t.current;Fe!==null;){var h=Fe,M=h.child;if((Fe.flags&16)!==0){var D=h.deletions;if(D!==null){for(var O=0;O<D.length;O++){var J=D[O];for(Fe=J;Fe!==null;){var _e=Fe;switch(_e.tag){case 0:case 11:case 15:Ro(8,_e,h)}var xe=_e.child;if(xe!==null)xe.return=_e,Fe=xe;else for(;Fe!==null;){_e=Fe;var me=_e.sibling,Le=_e.return;if(jh(_e),_e===J){Fe=null;break}if(me!==null){me.return=Le,Fe=me;break}Fe=Le}}}var ze=h.alternate;if(ze!==null){var Ve=ze.child;if(Ve!==null){ze.child=null;do{var Bt=Ve.sibling;Ve.sibling=null,Ve=Bt}while(Ve!==null)}}Fe=h}}if((h.subtreeFlags&2064)!==0&&M!==null)M.return=h,Fe=M;else e:for(;Fe!==null;){if(h=Fe,(h.flags&2048)!==0)switch(h.tag){case 0:case 11:case 15:Ro(9,h,h.return)}var Y=h.sibling;if(Y!==null){Y.return=h.return,Fe=Y;break e}Fe=h.return}}var B=t.current;for(Fe=B;Fe!==null;){M=Fe;var q=M.child;if((M.subtreeFlags&2064)!==0&&q!==null)q.return=M,Fe=q;else e:for(M=B;Fe!==null;){if(D=Fe,(D.flags&2048)!==0)try{switch(D.tag){case 0:case 11:case 15:Na(9,D)}}catch(Xe){zt(D,D.return,Xe)}if(D===M){Fe=null;break e}var Ee=D.sibling;if(Ee!==null){Ee.return=D.return,Fe=Ee;break e}Fe=D.return}}if(vt=c,rr(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(Mt,t)}catch{}l=!0}return l}finally{wt=o,jn.transition=i}}return!1}function lp(t,i,o){i=Ss(o,i),i=Ah(t,i,1),t=or(t,i,1),i=vn(),t!==null&&(Mn(t,1,i),Cn(t,i))}function zt(t,i,o){if(t.tag===3)lp(t,t,o);else for(;i!==null;){if(i.tag===3){lp(i,t,o);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(lr===null||!lr.has(l))){t=Ss(o,t),t=Ch(i,t,1),i=or(i,t,1),t=vn(),i!==null&&(Mn(i,1,t),Cn(i,t));break}}i=i.return}}function U_(t,i,o){var l=t.pingCache;l!==null&&l.delete(i),i=vn(),t.pingedLanes|=t.suspendedLanes&o,en===t&&(sn&o)===o&&(Kt===4||Kt===3&&(sn&130023424)===sn&&500>Se()-Qu?Fr(t,0):Zu|=o),Cn(t,i)}function up(t,i){i===0&&((t.mode&1)===0?i=1:(i=ti,ti<<=1,(ti&130023424)===0&&(ti=4194304)));var o=vn();t=Di(t,i),t!==null&&(Mn(t,i,o),Cn(t,o))}function N_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),up(t,o)}function F_(t,i){var o=0;switch(t.tag){case 13:var l=t.stateNode,c=t.memoizedState;c!==null&&(o=c.retryLane);break;case 19:l=t.stateNode;break;default:throw Error(n(314))}l!==null&&l.delete(i),up(t,o)}var cp;cp=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||En.current)wn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return wn=!1,E_(t,i,o);wn=(t.flags&131072)!==0}else wn=!1,Ft&&(i.flags&1048576)!==0&&Gd(i,va,i.index);switch(i.lanes=0,i.tag){case 2:var l=i.type;Ia(t,i),t=i.pendingProps;var c=hs(i,ln.current);xs(i,o),c=bu(null,i,l,t,c,o);var h=Pu();return i.flags|=1,typeof c=="object"&&c!==null&&typeof c.render=="function"&&c.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Tn(l)?(h=!0,ma(i)):h=!1,i.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,Mu(i),c.updater=Da,i.stateNode=c,c._reactInternals=i,Fu(i,l,t,o),i=Bu(null,i,l,!0,h,o)):(i.tag=0,Ft&&h&&du(i),_n(null,i,c,o),i=i.child),i;case 16:l=i.elementType;e:{switch(Ia(t,i),t=i.pendingProps,c=l._init,l=c(l._payload),i.type=l,c=i.tag=k_(l),t=ri(l,t),c){case 0:i=zu(null,i,l,t,o);break e;case 1:i=Fh(null,i,l,t,o);break e;case 11:i=Dh(null,i,l,t,o);break e;case 14:i=Lh(null,i,l,ri(l.type,t),o);break e}throw Error(n(306,l,""))}return i;case 0:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ri(l,c),zu(t,i,l,c,o);case 1:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ri(l,c),Fh(t,i,l,c,o);case 3:e:{if(Oh(i),t===null)throw Error(n(387));l=i.pendingProps,h=i.memoizedState,c=h.element,Qd(t,i),Ta(i,l,null,o);var M=i.memoizedState;if(l=M.element,h.isDehydrated)if(h={element:l,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){c=Ss(Error(n(423)),i),i=kh(t,i,l,o,c);break e}else if(l!==c){c=Ss(Error(n(424)),i),i=kh(t,i,l,o,c);break e}else for(Nn=tr(i.stateNode.containerInfo.firstChild),Un=i,Ft=!0,ii=null,o=$d(i,null,l,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(gs(),l===c){i=Ii(t,i,o);break e}_n(t,i,l,o)}i=i.child}return i;case 5:return th(i),t===null&&mu(i),l=i.type,c=i.pendingProps,h=t!==null?t.memoizedProps:null,M=c.children,ou(l,c)?M=null:h!==null&&ou(l,h)&&(i.flags|=32),Nh(t,i),_n(t,i,M,o),i.child;case 6:return t===null&&mu(i),null;case 13:return zh(t,i,o);case 4:return Eu(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=_s(i,null,l,o):_n(t,i,l,o),i.child;case 11:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ri(l,c),Dh(t,i,l,c,o);case 7:return _n(t,i,i.pendingProps,o),i.child;case 8:return _n(t,i,i.pendingProps.children,o),i.child;case 12:return _n(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(l=i.type._context,c=i.pendingProps,h=i.memoizedProps,M=c.value,Lt(Sa,l._currentValue),l._currentValue=M,h!==null)if(ni(h.value,M)){if(h.children===c.children&&!En.current){i=Ii(t,i,o);break e}}else for(h=i.child,h!==null&&(h.return=i);h!==null;){var D=h.dependencies;if(D!==null){M=h.child;for(var O=D.firstContext;O!==null;){if(O.context===l){if(h.tag===1){O=Li(-1,o&-o),O.tag=2;var J=h.updateQueue;if(J!==null){J=J.shared;var _e=J.pending;_e===null?O.next=O:(O.next=_e.next,_e.next=O),J.pending=O}}h.lanes|=o,O=h.alternate,O!==null&&(O.lanes|=o),yu(h.return,o,i),D.lanes|=o;break}O=O.next}}else if(h.tag===10)M=h.type===i.type?null:h.child;else if(h.tag===18){if(M=h.return,M===null)throw Error(n(341));M.lanes|=o,D=M.alternate,D!==null&&(D.lanes|=o),yu(M,o,i),M=h.sibling}else M=h.child;if(M!==null)M.return=h;else for(M=h;M!==null;){if(M===i){M=null;break}if(h=M.sibling,h!==null){h.return=M.return,M=h;break}M=M.return}h=M}_n(t,i,c.children,o),i=i.child}return i;case 9:return c=i.type,l=i.pendingProps.children,xs(i,o),c=Wn(c),l=l(c),i.flags|=1,_n(t,i,l,o),i.child;case 14:return l=i.type,c=ri(l,i.pendingProps),c=ri(l.type,c),Lh(t,i,l,c,o);case 15:return Ih(t,i,i.type,i.pendingProps,o);case 17:return l=i.type,c=i.pendingProps,c=i.elementType===l?c:ri(l,c),Ia(t,i),i.tag=1,Tn(l)?(t=!0,ma(i)):t=!1,xs(i,o),Th(i,l,c),Fu(i,l,c,o),Bu(null,i,l,!0,t,o);case 19:return Vh(t,i,o);case 22:return Uh(t,i,o)}throw Error(n(156,i.tag))};function fp(t,i){return ee(t,i)}function O_(t,i,o,l){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,i,o,l){return new O_(t,i,o,l)}function oc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function k_(t){if(typeof t=="function")return oc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===re)return 11;if(t===he)return 14}return 2}function dr(t,i){var o=t.alternate;return o===null?(o=Yn(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Wa(t,i,o,l,c,h){var M=2;if(l=t,typeof t=="function")oc(t)&&(M=1);else if(typeof t=="string")M=5;else e:switch(t){case F:return kr(o.children,c,h,i);case j:M=8,c|=8;break;case b:return t=Yn(12,o,i,c|2),t.elementType=b,t.lanes=h,t;case Q:return t=Yn(13,o,i,c),t.elementType=Q,t.lanes=h,t;case fe:return t=Yn(19,o,i,c),t.elementType=fe,t.lanes=h,t;case le:return Xa(o,c,h,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case T:M=10;break e;case k:M=9;break e;case re:M=11;break e;case he:M=14;break e;case oe:M=16,l=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=Yn(M,o,i,c),i.elementType=t,i.type=l,i.lanes=h,i}function kr(t,i,o,l){return t=Yn(7,t,l,i),t.lanes=o,t}function Xa(t,i,o,l){return t=Yn(22,t,l,i),t.elementType=le,t.lanes=o,t.stateNode={isHidden:!1},t}function ac(t,i,o){return t=Yn(6,t,null,i),t.lanes=o,t}function lc(t,i,o){return i=Yn(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function z_(t,i,o,l,c){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vn(0),this.expirationTimes=Vn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vn(0),this.identifierPrefix=l,this.onRecoverableError=c,this.mutableSourceEagerHydrationData=null}function uc(t,i,o,l,c,h,M,D,O){return t=new z_(t,i,o,D,O),i===1?(i=1,h===!0&&(i|=8)):i=0,h=Yn(3,null,null,i),t.current=h,h.stateNode=t,h.memoizedState={element:l,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mu(h),t}function B_(t,i,o){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:N,key:l==null?null:""+l,children:t,containerInfo:i,implementation:o}}function dp(t){if(!t)return ir;t=t._reactInternals;e:{if(mi(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Tn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(Tn(o))return Bd(t,o,i)}return i}function hp(t,i,o,l,c,h,M,D,O){return t=uc(o,l,!0,t,c,h,M,D,O),t.context=dp(null),o=t.current,l=vn(),c=cr(o),h=Li(l,c),h.callback=i??null,or(o,h,c),t.current.lanes=c,Mn(t,c,l),Cn(t,l),t}function ja(t,i,o,l){var c=i.current,h=vn(),M=cr(c);return o=dp(o),i.context===null?i.context=o:i.pendingContext=o,i=Li(h,M),i.payload={element:t},l=l===void 0?null:l,l!==null&&(i.callback=l),t=or(c,i,M),t!==null&&(ai(t,c,M,h),Ea(t,c,M)),M}function Ya(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function pp(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function cc(t,i){pp(t,i),(t=t.alternate)&&pp(t,i)}function V_(){return null}var mp=typeof reportError=="function"?reportError:function(t){console.error(t)};function fc(t){this._internalRoot=t}qa.prototype.render=fc.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));ja(t,i,null,null)},qa.prototype.unmount=fc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Nr(function(){ja(null,t,null,null)}),i[Ci]=null}};function qa(t){this._internalRoot=t}qa.prototype.unstable_scheduleHydration=function(t){if(t){var i=Qf();t={blockedOn:null,target:t,priority:i};for(var o=0;o<Qi.length&&i!==0&&i<Qi[o].priority;o++);Qi.splice(o,0,t),o===0&&td(t)}};function dc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ka(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function gp(){}function H_(t,i,o,l,c){if(c){if(typeof l=="function"){var h=l;l=function(){var J=Ya(M);h.call(J)}}var M=hp(i,l,t,0,null,!1,!1,"",gp);return t._reactRootContainer=M,t[Ci]=M.current,mo(t.nodeType===8?t.parentNode:t),Nr(),M}for(;c=t.lastChild;)t.removeChild(c);if(typeof l=="function"){var D=l;l=function(){var J=Ya(O);D.call(J)}}var O=uc(t,0,!1,null,null,!1,!1,"",gp);return t._reactRootContainer=O,t[Ci]=O.current,mo(t.nodeType===8?t.parentNode:t),Nr(function(){ja(i,O,o,l)}),O}function $a(t,i,o,l,c){var h=o._reactRootContainer;if(h){var M=h;if(typeof c=="function"){var D=c;c=function(){var O=Ya(M);D.call(O)}}ja(i,M,t,c)}else M=H_(o,i,t,c,l);return Ya(M)}$f=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Yt(i.pendingLanes);o!==0&&(Fl(i,o|1),Cn(i,Se()),(vt&6)===0&&(Ts=Se()+500,rr()))}break;case 13:Nr(function(){var l=Di(t,1);if(l!==null){var c=vn();ai(l,t,1,c)}}),cc(t,1)}},Ol=function(t){if(t.tag===13){var i=Di(t,134217728);if(i!==null){var o=vn();ai(i,t,134217728,o)}cc(t,134217728)}},Zf=function(t){if(t.tag===13){var i=cr(t),o=Di(t,i);if(o!==null){var l=vn();ai(o,t,i,l)}cc(t,i)}},Qf=function(){return wt},Jf=function(t,i){var o=wt;try{return wt=t,i()}finally{wt=o}},Re=function(t,i,o){switch(i){case"input":if(ct(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var l=o[i];if(l!==t&&l.form===t.form){var c=ha(l);if(!c)throw Error(n(90));pt(l),ct(l,c)}}}break;case"textarea":pe(t,o);break;case"select":i=o.value,i!=null&&P(t,!!o.multiple,i,!1)}},It=ic,jt=Nr;var G_={usingClientEntryPoint:!1,Events:[vo,fs,ha,Pe,rt,ic]},Lo={findFiberByHostInstance:Cr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},W_={bundleType:Lo.bundleType,version:Lo.version,rendererPackageName:Lo.rendererPackageName,rendererConfig:Lo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:R.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=C(t),t===null?null:t.stateNode},findFiberByHostInstance:Lo.findFiberByHostInstance||V_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Za=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Za.isDisabled&&Za.supportsFiber)try{Mt=Za.inject(W_),mt=Za}catch{}}return Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=G_,Rn.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!dc(i))throw Error(n(200));return B_(t,i,null,o)},Rn.createRoot=function(t,i){if(!dc(t))throw Error(n(299));var o=!1,l="",c=mp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onRecoverableError!==void 0&&(c=i.onRecoverableError)),i=uc(t,1,!1,null,null,o,!1,l,c),t[Ci]=i.current,mo(t.nodeType===8?t.parentNode:t),new fc(i)},Rn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=C(i),t=t===null?null:t.stateNode,t},Rn.flushSync=function(t){return Nr(t)},Rn.hydrate=function(t,i,o){if(!Ka(i))throw Error(n(200));return $a(null,t,i,!0,o)},Rn.hydrateRoot=function(t,i,o){if(!dc(t))throw Error(n(405));var l=o!=null&&o.hydratedSources||null,c=!1,h="",M=mp;if(o!=null&&(o.unstable_strictMode===!0&&(c=!0),o.identifierPrefix!==void 0&&(h=o.identifierPrefix),o.onRecoverableError!==void 0&&(M=o.onRecoverableError)),i=hp(i,null,t,1,o??null,c,!1,h,M),t[Ci]=i.current,mo(t),l)for(t=0;t<l.length;t++)o=l[t],c=o._getVersion,c=c(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,c]:i.mutableSourceEagerHydrationData.push(o,c);return new qa(i)},Rn.render=function(t,i,o){if(!Ka(i))throw Error(n(200));return $a(null,t,i,!1,o)},Rn.unmountComponentAtNode=function(t){if(!Ka(t))throw Error(n(40));return t._reactRootContainer?(Nr(function(){$a(null,null,t,!1,function(){t._reactRootContainer=null,t[Ci]=null})}),!0):!1},Rn.unstable_batchedUpdates=ic,Rn.unstable_renderSubtreeIntoContainer=function(t,i,o,l){if(!Ka(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return $a(t,i,o,!1,l)},Rn.version="18.3.1-next-f1338f8080-20240426",Rn}var Tp;function J_(){if(Tp)return mc.exports;Tp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),mc.exports=Q_(),mc.exports}var wp;function ev(){if(wp)return Qa;wp=1;var s=J_();return Qa.createRoot=s.createRoot,Qa.hydrateRoot=s.hydrateRoot,Qa}var tv=ev();const nv=j_(tv);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zf="170",Hs={ROTATE:0,DOLLY:1,PAN:2},Bs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},iv=0,Ap=1,rv=2,Pm=1,sv=2,Bi=3,Tr=0,Dn=1,Vi=2,Mr=0,Gs=1,Cp=2,Rp=3,bp=4,ov=5,Yr=100,av=101,lv=102,uv=103,cv=104,fv=200,dv=201,hv=202,pv=203,$c=204,Zc=205,mv=206,gv=207,_v=208,vv=209,xv=210,yv=211,Sv=212,Mv=213,Ev=214,Qc=0,Jc=1,ef=2,js=3,tf=4,nf=5,rf=6,sf=7,Dm=0,Tv=1,wv=2,Er=0,Av=1,Cv=2,Rv=3,bv=4,Pv=5,Dv=6,Lv=7,Lm=300,Ys=301,qs=302,of=303,af=304,Dl=306,lf=1e3,Kr=1001,uf=1002,hi=1003,Iv=1004,Ja=1005,Zn=1006,vc=1007,$r=1008,Xi=1009,Im=1010,Um=1011,Ho=1012,Bf=1013,Qr=1014,Hi=1015,Qs=1016,Vf=1017,Hf=1018,Ks=1020,Nm=35902,Fm=1021,Om=1022,Qn=1023,km=1024,zm=1025,Ws=1026,$s=1027,Bm=1028,Gf=1029,Vm=1030,Wf=1031,Xf=1033,Ml=33776,El=33777,Tl=33778,wl=33779,cf=35840,ff=35841,df=35842,hf=35843,pf=36196,mf=37492,gf=37496,_f=37808,vf=37809,xf=37810,yf=37811,Sf=37812,Mf=37813,Ef=37814,Tf=37815,wf=37816,Af=37817,Cf=37818,Rf=37819,bf=37820,Pf=37821,Al=36492,Df=36494,Lf=36495,Hm=36283,If=36284,Uf=36285,Nf=36286,Uv=3200,Nv=3201,Fv=0,Ov=1,Sr="",Kn="srgb",Js="srgb-linear",Ll="linear",Ct="srgb",As=7680,Pp=519,kv=512,zv=513,Bv=514,Gm=515,Vv=516,Hv=517,Gv=518,Wv=519,Dp=35044,Lp="300 es",Gi=2e3,bl=2001;class es{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const u=a.indexOf(n);u!==-1&&a.splice(u,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let u=0,f=a.length;u<f;u++)a[u].call(this,e);e.target=null}}}const dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cl=Math.PI/180,Ff=180/Math.PI;function Go(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(dn[s&255]+dn[s>>8&255]+dn[s>>16&255]+dn[s>>24&255]+"-"+dn[e&255]+dn[e>>8&255]+"-"+dn[e>>16&15|64]+dn[e>>24&255]+"-"+dn[n&63|128]+dn[n>>8&255]+"-"+dn[n>>16&255]+dn[n>>24&255]+dn[r&255]+dn[r>>8&255]+dn[r>>16&255]+dn[r>>24&255]).toLowerCase()}function yn(s,e,n){return Math.max(e,Math.min(n,s))}function Xv(s,e){return(s%e+e)%e}function xc(s,e,n){return(1-n)*s+n*e}function Uo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const jv={DEG2RAD:Cl};class at{constructor(e=0,n=0){at.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(yn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),u=this.x-e.x,f=this.y-e.y;return this.x=u*r-f*a+e.x,this.y=u*a+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ot{constructor(e,n,r,a,u,f,d,p,m){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,u,f,d,p,m)}set(e,n,r,a,u,f,d,p,m){const v=this.elements;return v[0]=e,v[1]=a,v[2]=d,v[3]=n,v[4]=u,v[5]=p,v[6]=r,v[7]=f,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,u=this.elements,f=r[0],d=r[3],p=r[6],m=r[1],v=r[4],y=r[7],x=r[2],S=r[5],A=r[8],w=a[0],_=a[3],g=a[6],U=a[1],L=a[4],R=a[7],X=a[2],N=a[5],F=a[8];return u[0]=f*w+d*U+p*X,u[3]=f*_+d*L+p*N,u[6]=f*g+d*R+p*F,u[1]=m*w+v*U+y*X,u[4]=m*_+v*L+y*N,u[7]=m*g+v*R+y*F,u[2]=x*w+S*U+A*X,u[5]=x*_+S*L+A*N,u[8]=x*g+S*R+A*F,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],d=e[5],p=e[6],m=e[7],v=e[8];return n*f*v-n*d*m-r*u*v+r*d*p+a*u*m-a*f*p}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],d=e[5],p=e[6],m=e[7],v=e[8],y=v*f-d*m,x=d*p-v*u,S=m*u-f*p,A=n*y+r*x+a*S;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=y*w,e[1]=(a*m-v*r)*w,e[2]=(d*r-a*f)*w,e[3]=x*w,e[4]=(v*n-a*p)*w,e[5]=(a*u-d*n)*w,e[6]=S*w,e[7]=(r*p-m*n)*w,e[8]=(f*n-r*u)*w,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,u,f,d){const p=Math.cos(u),m=Math.sin(u);return this.set(r*p,r*m,-r*(p*f+m*d)+f+e,-a*m,a*p,-a*(-m*f+p*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(yc.makeScale(e,n)),this}rotate(e){return this.premultiply(yc.makeRotation(-e)),this}translate(e,n){return this.premultiply(yc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const yc=new ot;function Wm(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Pl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Yv(){const s=Pl("canvas");return s.style.display="block",s}const Ip={};function zo(s){s in Ip||(Ip[s]=!0,console.warn(s))}function qv(s,e,n){return new Promise(function(r,a){function u(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(u,n);break;default:r()}}setTimeout(u,n)})}function Kv(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function $v(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const xt={enabled:!0,workingColorSpace:Js,spaces:{},convert:function(s,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===Ct&&(s.r=Wi(s.r),s.g=Wi(s.g),s.b=Wi(s.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Ct&&(s.r=Xs(s.r),s.g=Xs(s.g),s.b=Xs(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Sr?Ll:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,n){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Wi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Up=[.64,.33,.3,.6,.15,.06],Np=[.2126,.7152,.0722],Fp=[.3127,.329],Op=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kp=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);xt.define({[Js]:{primaries:Up,whitePoint:Fp,transfer:Ll,toXYZ:Op,fromXYZ:kp,luminanceCoefficients:Np,workingColorSpaceConfig:{unpackColorSpace:Kn},outputColorSpaceConfig:{drawingBufferColorSpace:Kn}},[Kn]:{primaries:Up,whitePoint:Fp,transfer:Ct,toXYZ:Op,fromXYZ:kp,luminanceCoefficients:Np,outputColorSpaceConfig:{drawingBufferColorSpace:Kn}}});let Cs;class Zv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Cs===void 0&&(Cs=Pl("canvas")),Cs.width=e.width,Cs.height=e.height;const r=Cs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Cs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Pl("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),u=a.data;for(let f=0;f<u.length;f++)u[f]=Wi(u[f]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Wi(n[r]/255)*255):n[r]=Wi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qv=0;class Xm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qv++}),this.uuid=Go(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let u;if(Array.isArray(a)){u=[];for(let f=0,d=a.length;f<d;f++)a[f].isDataTexture?u.push(Sc(a[f].image)):u.push(Sc(a[f]))}else u=Sc(a);r.url=u}return n||(e.images[this.uuid]=r),r}}function Sc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zv.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jv=0;class Ln extends es{constructor(e=Ln.DEFAULT_IMAGE,n=Ln.DEFAULT_MAPPING,r=Kr,a=Kr,u=Zn,f=$r,d=Qn,p=Xi,m=Ln.DEFAULT_ANISOTROPY,v=Sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jv++}),this.uuid=Go(),this.name="",this.source=new Xm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=u,this.minFilter=f,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lf:e.x=e.x-Math.floor(e.x);break;case Kr:e.x=e.x<0?0:1;break;case uf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lf:e.y=e.y-Math.floor(e.y);break;case Kr:e.y=e.y<0?0:1;break;case uf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=Lm;Ln.DEFAULT_ANISOTROPY=1;class Vt{constructor(e=0,n=0,r=0,a=1){Vt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,u=this.w,f=e.elements;return this.x=f[0]*n+f[4]*r+f[8]*a+f[12]*u,this.y=f[1]*n+f[5]*r+f[9]*a+f[13]*u,this.z=f[2]*n+f[6]*r+f[10]*a+f[14]*u,this.w=f[3]*n+f[7]*r+f[11]*a+f[15]*u,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,u;const p=e.elements,m=p[0],v=p[4],y=p[8],x=p[1],S=p[5],A=p[9],w=p[2],_=p[6],g=p[10];if(Math.abs(v-x)<.01&&Math.abs(y-w)<.01&&Math.abs(A-_)<.01){if(Math.abs(v+x)<.1&&Math.abs(y+w)<.1&&Math.abs(A+_)<.1&&Math.abs(m+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const L=(m+1)/2,R=(S+1)/2,X=(g+1)/2,N=(v+x)/4,F=(y+w)/4,j=(A+_)/4;return L>R&&L>X?L<.01?(r=0,a=.707106781,u=.707106781):(r=Math.sqrt(L),a=N/r,u=F/r):R>X?R<.01?(r=.707106781,a=0,u=.707106781):(a=Math.sqrt(R),r=N/a,u=j/a):X<.01?(r=.707106781,a=.707106781,u=0):(u=Math.sqrt(X),r=F/u,a=j/u),this.set(r,a,u,n),this}let U=Math.sqrt((_-A)*(_-A)+(y-w)*(y-w)+(x-v)*(x-v));return Math.abs(U)<.001&&(U=1),this.x=(_-A)/U,this.y=(y-w)/U,this.z=(x-v)/U,this.w=Math.acos((m+S+g-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class e0 extends es{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Vt(0,0,e,n),this.scissorTest=!1,this.viewport=new Vt(0,0,e,n);const a={width:e,height:n,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const u=new Ln(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);u.flipY=!1,u.generateMipmaps=r.generateMipmaps,u.internalFormat=r.internalFormat,this.textures=[];const f=r.count;for(let d=0;d<f;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,u=this.textures.length;a<u;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Xm(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mi extends e0{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class jm extends Ln{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=hi,this.minFilter=hi,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class t0 extends Ln{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=hi,this.minFilter=hi,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jr{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,u,f,d){let p=r[a+0],m=r[a+1],v=r[a+2],y=r[a+3];const x=u[f+0],S=u[f+1],A=u[f+2],w=u[f+3];if(d===0){e[n+0]=p,e[n+1]=m,e[n+2]=v,e[n+3]=y;return}if(d===1){e[n+0]=x,e[n+1]=S,e[n+2]=A,e[n+3]=w;return}if(y!==w||p!==x||m!==S||v!==A){let _=1-d;const g=p*x+m*S+v*A+y*w,U=g>=0?1:-1,L=1-g*g;if(L>Number.EPSILON){const X=Math.sqrt(L),N=Math.atan2(X,g*U);_=Math.sin(_*N)/X,d=Math.sin(d*N)/X}const R=d*U;if(p=p*_+x*R,m=m*_+S*R,v=v*_+A*R,y=y*_+w*R,_===1-d){const X=1/Math.sqrt(p*p+m*m+v*v+y*y);p*=X,m*=X,v*=X,y*=X}}e[n]=p,e[n+1]=m,e[n+2]=v,e[n+3]=y}static multiplyQuaternionsFlat(e,n,r,a,u,f){const d=r[a],p=r[a+1],m=r[a+2],v=r[a+3],y=u[f],x=u[f+1],S=u[f+2],A=u[f+3];return e[n]=d*A+v*y+p*S-m*x,e[n+1]=p*A+v*x+m*y-d*S,e[n+2]=m*A+v*S+d*x-p*y,e[n+3]=v*A-d*y-p*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,u=e._z,f=e._order,d=Math.cos,p=Math.sin,m=d(r/2),v=d(a/2),y=d(u/2),x=p(r/2),S=p(a/2),A=p(u/2);switch(f){case"XYZ":this._x=x*v*y+m*S*A,this._y=m*S*y-x*v*A,this._z=m*v*A+x*S*y,this._w=m*v*y-x*S*A;break;case"YXZ":this._x=x*v*y+m*S*A,this._y=m*S*y-x*v*A,this._z=m*v*A-x*S*y,this._w=m*v*y+x*S*A;break;case"ZXY":this._x=x*v*y-m*S*A,this._y=m*S*y+x*v*A,this._z=m*v*A+x*S*y,this._w=m*v*y-x*S*A;break;case"ZYX":this._x=x*v*y-m*S*A,this._y=m*S*y+x*v*A,this._z=m*v*A-x*S*y,this._w=m*v*y+x*S*A;break;case"YZX":this._x=x*v*y+m*S*A,this._y=m*S*y+x*v*A,this._z=m*v*A-x*S*y,this._w=m*v*y-x*S*A;break;case"XZY":this._x=x*v*y-m*S*A,this._y=m*S*y-x*v*A,this._z=m*v*A+x*S*y,this._w=m*v*y+x*S*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],u=n[8],f=n[1],d=n[5],p=n[9],m=n[2],v=n[6],y=n[10],x=r+d+y;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(v-p)*S,this._y=(u-m)*S,this._z=(f-a)*S}else if(r>d&&r>y){const S=2*Math.sqrt(1+r-d-y);this._w=(v-p)/S,this._x=.25*S,this._y=(a+f)/S,this._z=(u+m)/S}else if(d>y){const S=2*Math.sqrt(1+d-r-y);this._w=(u-m)/S,this._x=(a+f)/S,this._y=.25*S,this._z=(p+v)/S}else{const S=2*Math.sqrt(1+y-r-d);this._w=(f-a)/S,this._x=(u+m)/S,this._y=(p+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yn(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,u=e._z,f=e._w,d=n._x,p=n._y,m=n._z,v=n._w;return this._x=r*v+f*d+a*m-u*p,this._y=a*v+f*p+u*d-r*m,this._z=u*v+f*m+r*p-a*d,this._w=f*v-r*d-a*p-u*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,u=this._z,f=this._w;let d=f*e._w+r*e._x+a*e._y+u*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=f,this._x=r,this._y=a,this._z=u,this;const p=1-d*d;if(p<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*u+n*this._z,this.normalize(),this}const m=Math.sqrt(p),v=Math.atan2(m,d),y=Math.sin((1-n)*v)/m,x=Math.sin(n*v)/m;return this._w=f*y+this._w*x,this._x=r*y+this._x*x,this._y=a*y+this._y*x,this._z=u*y+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),u*Math.sin(n),u*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,n=0,r=0){Z.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(zp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(zp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,u=e.elements;return this.x=u[0]*n+u[3]*r+u[6]*a,this.y=u[1]*n+u[4]*r+u[7]*a,this.z=u[2]*n+u[5]*r+u[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,u=e.elements,f=1/(u[3]*n+u[7]*r+u[11]*a+u[15]);return this.x=(u[0]*n+u[4]*r+u[8]*a+u[12])*f,this.y=(u[1]*n+u[5]*r+u[9]*a+u[13])*f,this.z=(u[2]*n+u[6]*r+u[10]*a+u[14])*f,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,u=e.x,f=e.y,d=e.z,p=e.w,m=2*(f*a-d*r),v=2*(d*n-u*a),y=2*(u*r-f*n);return this.x=n+p*m+f*y-d*v,this.y=r+p*v+d*m-u*y,this.z=a+p*y+u*v-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a,this.y=u[1]*n+u[5]*r+u[9]*a,this.z=u[2]*n+u[6]*r+u[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,u=e.z,f=n.x,d=n.y,p=n.z;return this.x=a*p-u*d,this.y=u*f-r*p,this.z=r*d-a*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Mc.copy(this).projectOnVector(e),this.sub(Mc)}reflect(e){return this.sub(Mc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(yn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mc=new Z,zp=new Jr;class Wo{constructor(e=new Z(1/0,1/0,1/0),n=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(li.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(li.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=li.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const u=r.getAttribute("position");if(n===!0&&u!==void 0&&e.isInstancedMesh!==!0)for(let f=0,d=u.count;f<d;f++)e.isMesh===!0?e.getVertexPosition(f,li):li.fromBufferAttribute(u,f),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),el.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),el.copy(r.boundingBox)),el.applyMatrix4(e.matrixWorld),this.union(el)}const a=e.children;for(let u=0,f=a.length;u<f;u++)this.expandByObject(a[u],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(No),tl.subVectors(this.max,No),Rs.subVectors(e.a,No),bs.subVectors(e.b,No),Ps.subVectors(e.c,No),pr.subVectors(bs,Rs),mr.subVectors(Ps,bs),zr.subVectors(Rs,Ps);let n=[0,-pr.z,pr.y,0,-mr.z,mr.y,0,-zr.z,zr.y,pr.z,0,-pr.x,mr.z,0,-mr.x,zr.z,0,-zr.x,-pr.y,pr.x,0,-mr.y,mr.x,0,-zr.y,zr.x,0];return!Ec(n,Rs,bs,Ps,tl)||(n=[1,0,0,0,1,0,0,0,1],!Ec(n,Rs,bs,Ps,tl))?!1:(nl.crossVectors(pr,mr),n=[nl.x,nl.y,nl.z],Ec(n,Rs,bs,Ps,tl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ni=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],li=new Z,el=new Wo,Rs=new Z,bs=new Z,Ps=new Z,pr=new Z,mr=new Z,zr=new Z,No=new Z,tl=new Z,nl=new Z,Br=new Z;function Ec(s,e,n,r,a){for(let u=0,f=s.length-3;u<=f;u+=3){Br.fromArray(s,u);const d=a.x*Math.abs(Br.x)+a.y*Math.abs(Br.y)+a.z*Math.abs(Br.z),p=e.dot(Br),m=n.dot(Br),v=r.dot(Br);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>d)return!1}return!0}const n0=new Wo,Fo=new Z,Tc=new Z;class jf{constructor(e=new Z,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):n0.setFromPoints(e).getCenter(r);let a=0;for(let u=0,f=e.length;u<f;u++)a=Math.max(a,r.distanceToSquared(e[u]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fo.subVectors(e,this.center);const n=Fo.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Fo,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fo.copy(e.center).add(Tc)),this.expandByPoint(Fo.copy(e.center).sub(Tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new Z,wc=new Z,il=new Z,gr=new Z,Ac=new Z,rl=new Z,Cc=new Z;class Ym{constructor(e=new Z,n=new Z(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,n),Fi.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){wc.copy(e).add(n).multiplyScalar(.5),il.copy(n).sub(e).normalize(),gr.copy(this.origin).sub(wc);const u=e.distanceTo(n)*.5,f=-this.direction.dot(il),d=gr.dot(this.direction),p=-gr.dot(il),m=gr.lengthSq(),v=Math.abs(1-f*f);let y,x,S,A;if(v>0)if(y=f*p-d,x=f*d-p,A=u*v,y>=0)if(x>=-A)if(x<=A){const w=1/v;y*=w,x*=w,S=y*(y+f*x+2*d)+x*(f*y+x+2*p)+m}else x=u,y=Math.max(0,-(f*x+d)),S=-y*y+x*(x+2*p)+m;else x=-u,y=Math.max(0,-(f*x+d)),S=-y*y+x*(x+2*p)+m;else x<=-A?(y=Math.max(0,-(-f*u+d)),x=y>0?-u:Math.min(Math.max(-u,-p),u),S=-y*y+x*(x+2*p)+m):x<=A?(y=0,x=Math.min(Math.max(-u,-p),u),S=x*(x+2*p)+m):(y=Math.max(0,-(f*u+d)),x=y>0?u:Math.min(Math.max(-u,-p),u),S=-y*y+x*(x+2*p)+m);else x=f>0?-u:u,y=Math.max(0,-(f*x+d)),S=-y*y+x*(x+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,y),a&&a.copy(wc).addScaledVector(il,x),S}intersectSphere(e,n){Fi.subVectors(e.center,this.origin);const r=Fi.dot(this.direction),a=Fi.dot(Fi)-r*r,u=e.radius*e.radius;if(a>u)return null;const f=Math.sqrt(u-a),d=r-f,p=r+f;return p<0?null:d<0?this.at(p,n):this.at(d,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,u,f,d,p;const m=1/this.direction.x,v=1/this.direction.y,y=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),v>=0?(u=(e.min.y-x.y)*v,f=(e.max.y-x.y)*v):(u=(e.max.y-x.y)*v,f=(e.min.y-x.y)*v),r>f||u>a||((u>r||isNaN(r))&&(r=u),(f<a||isNaN(a))&&(a=f),y>=0?(d=(e.min.z-x.z)*y,p=(e.max.z-x.z)*y):(d=(e.max.z-x.z)*y,p=(e.min.z-x.z)*y),r>p||d>a)||((d>r||r!==r)&&(r=d),(p<a||a!==a)&&(a=p),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,n,r,a,u){Ac.subVectors(n,e),rl.subVectors(r,e),Cc.crossVectors(Ac,rl);let f=this.direction.dot(Cc),d;if(f>0){if(a)return null;d=1}else if(f<0)d=-1,f=-f;else return null;gr.subVectors(this.origin,e);const p=d*this.direction.dot(rl.crossVectors(gr,rl));if(p<0)return null;const m=d*this.direction.dot(Ac.cross(gr));if(m<0||p+m>f)return null;const v=-d*gr.dot(Cc);return v<0?null:this.at(v/f,u)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,n,r,a,u,f,d,p,m,v,y,x,S,A,w,_){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,u,f,d,p,m,v,y,x,S,A,w,_)}set(e,n,r,a,u,f,d,p,m,v,y,x,S,A,w,_){const g=this.elements;return g[0]=e,g[4]=n,g[8]=r,g[12]=a,g[1]=u,g[5]=f,g[9]=d,g[13]=p,g[2]=m,g[6]=v,g[10]=y,g[14]=x,g[3]=S,g[7]=A,g[11]=w,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/Ds.setFromMatrixColumn(e,0).length(),u=1/Ds.setFromMatrixColumn(e,1).length(),f=1/Ds.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*u,n[5]=r[5]*u,n[6]=r[6]*u,n[7]=0,n[8]=r[8]*f,n[9]=r[9]*f,n[10]=r[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,u=e.z,f=Math.cos(r),d=Math.sin(r),p=Math.cos(a),m=Math.sin(a),v=Math.cos(u),y=Math.sin(u);if(e.order==="XYZ"){const x=f*v,S=f*y,A=d*v,w=d*y;n[0]=p*v,n[4]=-p*y,n[8]=m,n[1]=S+A*m,n[5]=x-w*m,n[9]=-d*p,n[2]=w-x*m,n[6]=A+S*m,n[10]=f*p}else if(e.order==="YXZ"){const x=p*v,S=p*y,A=m*v,w=m*y;n[0]=x+w*d,n[4]=A*d-S,n[8]=f*m,n[1]=f*y,n[5]=f*v,n[9]=-d,n[2]=S*d-A,n[6]=w+x*d,n[10]=f*p}else if(e.order==="ZXY"){const x=p*v,S=p*y,A=m*v,w=m*y;n[0]=x-w*d,n[4]=-f*y,n[8]=A+S*d,n[1]=S+A*d,n[5]=f*v,n[9]=w-x*d,n[2]=-f*m,n[6]=d,n[10]=f*p}else if(e.order==="ZYX"){const x=f*v,S=f*y,A=d*v,w=d*y;n[0]=p*v,n[4]=A*m-S,n[8]=x*m+w,n[1]=p*y,n[5]=w*m+x,n[9]=S*m-A,n[2]=-m,n[6]=d*p,n[10]=f*p}else if(e.order==="YZX"){const x=f*p,S=f*m,A=d*p,w=d*m;n[0]=p*v,n[4]=w-x*y,n[8]=A*y+S,n[1]=y,n[5]=f*v,n[9]=-d*v,n[2]=-m*v,n[6]=S*y+A,n[10]=x-w*y}else if(e.order==="XZY"){const x=f*p,S=f*m,A=d*p,w=d*m;n[0]=p*v,n[4]=-y,n[8]=m*v,n[1]=x*y+w,n[5]=f*v,n[9]=S*y-A,n[2]=A*y-S,n[6]=d*v,n[10]=w*y+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(i0,e,r0)}lookAt(e,n,r){const a=this.elements;return On.subVectors(e,n),On.lengthSq()===0&&(On.z=1),On.normalize(),_r.crossVectors(r,On),_r.lengthSq()===0&&(Math.abs(r.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),_r.crossVectors(r,On)),_r.normalize(),sl.crossVectors(On,_r),a[0]=_r.x,a[4]=sl.x,a[8]=On.x,a[1]=_r.y,a[5]=sl.y,a[9]=On.y,a[2]=_r.z,a[6]=sl.z,a[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,u=this.elements,f=r[0],d=r[4],p=r[8],m=r[12],v=r[1],y=r[5],x=r[9],S=r[13],A=r[2],w=r[6],_=r[10],g=r[14],U=r[3],L=r[7],R=r[11],X=r[15],N=a[0],F=a[4],j=a[8],b=a[12],T=a[1],k=a[5],re=a[9],Q=a[13],fe=a[2],he=a[6],oe=a[10],le=a[14],z=a[3],ae=a[7],se=a[11],I=a[15];return u[0]=f*N+d*T+p*fe+m*z,u[4]=f*F+d*k+p*he+m*ae,u[8]=f*j+d*re+p*oe+m*se,u[12]=f*b+d*Q+p*le+m*I,u[1]=v*N+y*T+x*fe+S*z,u[5]=v*F+y*k+x*he+S*ae,u[9]=v*j+y*re+x*oe+S*se,u[13]=v*b+y*Q+x*le+S*I,u[2]=A*N+w*T+_*fe+g*z,u[6]=A*F+w*k+_*he+g*ae,u[10]=A*j+w*re+_*oe+g*se,u[14]=A*b+w*Q+_*le+g*I,u[3]=U*N+L*T+R*fe+X*z,u[7]=U*F+L*k+R*he+X*ae,u[11]=U*j+L*re+R*oe+X*se,u[15]=U*b+L*Q+R*le+X*I,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],u=e[12],f=e[1],d=e[5],p=e[9],m=e[13],v=e[2],y=e[6],x=e[10],S=e[14],A=e[3],w=e[7],_=e[11],g=e[15];return A*(+u*p*y-a*m*y-u*d*x+r*m*x+a*d*S-r*p*S)+w*(+n*p*S-n*m*x+u*f*x-a*f*S+a*m*v-u*p*v)+_*(+n*m*y-n*d*S-u*f*y+r*f*S+u*d*v-r*m*v)+g*(-a*d*v-n*p*y+n*d*x+a*f*y-r*f*x+r*p*v)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],u=e[3],f=e[4],d=e[5],p=e[6],m=e[7],v=e[8],y=e[9],x=e[10],S=e[11],A=e[12],w=e[13],_=e[14],g=e[15],U=y*_*m-w*x*m+w*p*S-d*_*S-y*p*g+d*x*g,L=A*x*m-v*_*m-A*p*S+f*_*S+v*p*g-f*x*g,R=v*w*m-A*y*m+A*d*S-f*w*S-v*d*g+f*y*g,X=A*y*p-v*w*p-A*d*x+f*w*x+v*d*_-f*y*_,N=n*U+r*L+a*R+u*X;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/N;return e[0]=U*F,e[1]=(w*x*u-y*_*u-w*a*S+r*_*S+y*a*g-r*x*g)*F,e[2]=(d*_*u-w*p*u+w*a*m-r*_*m-d*a*g+r*p*g)*F,e[3]=(y*p*u-d*x*u-y*a*m+r*x*m+d*a*S-r*p*S)*F,e[4]=L*F,e[5]=(v*_*u-A*x*u+A*a*S-n*_*S-v*a*g+n*x*g)*F,e[6]=(A*p*u-f*_*u-A*a*m+n*_*m+f*a*g-n*p*g)*F,e[7]=(f*x*u-v*p*u+v*a*m-n*x*m-f*a*S+n*p*S)*F,e[8]=R*F,e[9]=(A*y*u-v*w*u-A*r*S+n*w*S+v*r*g-n*y*g)*F,e[10]=(f*w*u-A*d*u+A*r*m-n*w*m-f*r*g+n*d*g)*F,e[11]=(v*d*u-f*y*u-v*r*m+n*y*m+f*r*S-n*d*S)*F,e[12]=X*F,e[13]=(v*w*a-A*y*a+A*r*x-n*w*x-v*r*_+n*y*_)*F,e[14]=(A*d*a-f*w*a-A*r*p+n*w*p+f*r*_-n*d*_)*F,e[15]=(f*y*a-v*d*a+v*r*p-n*y*p-f*r*x+n*d*x)*F,this}scale(e){const n=this.elements,r=e.x,a=e.y,u=e.z;return n[0]*=r,n[4]*=a,n[8]*=u,n[1]*=r,n[5]*=a,n[9]*=u,n[2]*=r,n[6]*=a,n[10]*=u,n[3]*=r,n[7]*=a,n[11]*=u,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),u=1-r,f=e.x,d=e.y,p=e.z,m=u*f,v=u*d;return this.set(m*f+r,m*d-a*p,m*p+a*d,0,m*d+a*p,v*d+r,v*p-a*f,0,m*p-a*d,v*p+a*f,u*p*p+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,u,f){return this.set(1,r,u,0,e,1,f,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,u=n._x,f=n._y,d=n._z,p=n._w,m=u+u,v=f+f,y=d+d,x=u*m,S=u*v,A=u*y,w=f*v,_=f*y,g=d*y,U=p*m,L=p*v,R=p*y,X=r.x,N=r.y,F=r.z;return a[0]=(1-(w+g))*X,a[1]=(S+R)*X,a[2]=(A-L)*X,a[3]=0,a[4]=(S-R)*N,a[5]=(1-(x+g))*N,a[6]=(_+U)*N,a[7]=0,a[8]=(A+L)*F,a[9]=(_-U)*F,a[10]=(1-(x+w))*F,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let u=Ds.set(a[0],a[1],a[2]).length();const f=Ds.set(a[4],a[5],a[6]).length(),d=Ds.set(a[8],a[9],a[10]).length();this.determinant()<0&&(u=-u),e.x=a[12],e.y=a[13],e.z=a[14],ui.copy(this);const m=1/u,v=1/f,y=1/d;return ui.elements[0]*=m,ui.elements[1]*=m,ui.elements[2]*=m,ui.elements[4]*=v,ui.elements[5]*=v,ui.elements[6]*=v,ui.elements[8]*=y,ui.elements[9]*=y,ui.elements[10]*=y,n.setFromRotationMatrix(ui),r.x=u,r.y=f,r.z=d,this}makePerspective(e,n,r,a,u,f,d=Gi){const p=this.elements,m=2*u/(n-e),v=2*u/(r-a),y=(n+e)/(n-e),x=(r+a)/(r-a);let S,A;if(d===Gi)S=-(f+u)/(f-u),A=-2*f*u/(f-u);else if(d===bl)S=-f/(f-u),A=-f*u/(f-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=y,p[12]=0,p[1]=0,p[5]=v,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=S,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,r,a,u,f,d=Gi){const p=this.elements,m=1/(n-e),v=1/(r-a),y=1/(f-u),x=(n+e)*m,S=(r+a)*v;let A,w;if(d===Gi)A=(f+u)*y,w=-2*y;else if(d===bl)A=u*y,w=-1*y;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-S,p[2]=0,p[6]=0,p[10]=w,p[14]=-A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Ds=new Z,ui=new Ht,i0=new Z(0,0,0),r0=new Z(1,1,1),_r=new Z,sl=new Z,On=new Z,Bp=new Ht,Vp=new Jr;class ji{constructor(e=0,n=0,r=0,a=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,u=a[0],f=a[4],d=a[8],p=a[1],m=a[5],v=a[9],y=a[2],x=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(yn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-f,u)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-yn(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-y,u),this._z=0);break;case"ZXY":this._x=Math.asin(yn(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-y,S),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,u));break;case"ZYX":this._y=Math.asin(-yn(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(p,u)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(yn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-y,u)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-yn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-v,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return Bp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bp,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Vp.setFromEuler(this),this.setFromQuaternion(Vp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class qm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let s0=0;const Hp=new Z,Ls=new Jr,Oi=new Ht,ol=new Z,Oo=new Z,o0=new Z,a0=new Jr,Gp=new Z(1,0,0),Wp=new Z(0,1,0),Xp=new Z(0,0,1),jp={type:"added"},l0={type:"removed"},Is={type:"childadded",child:null},Rc={type:"childremoved",child:null};class zn extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=Go(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zn.DEFAULT_UP.clone();const e=new Z,n=new ji,r=new Jr,a=new Z(1,1,1);function u(){r.setFromEuler(n,!1)}function f(){n.setFromQuaternion(r,void 0,!1)}n._onChange(u),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ht},normalMatrix:{value:new ot}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Gp,e)}rotateY(e){return this.rotateOnAxis(Wp,e)}rotateZ(e){return this.rotateOnAxis(Xp,e)}translateOnAxis(e,n){return Hp.copy(e).applyQuaternion(this.quaternion),this.position.add(Hp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Gp,e)}translateY(e){return this.translateOnAxis(Wp,e)}translateZ(e){return this.translateOnAxis(Xp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?ol.copy(e):ol.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(Oo,ol,this.up):Oi.lookAt(ol,Oo,this.up),this.quaternion.setFromRotationMatrix(Oi),a&&(Oi.extractRotation(a.matrixWorld),Ls.setFromRotationMatrix(Oi),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jp),Is.child=e,this.dispatchEvent(Is),Is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(l0),Rc.child=e,this.dispatchEvent(Rc),Rc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jp),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const f=this.children[r].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let u=0,f=a.length;u<f;u++)a[u].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,e,o0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,a0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let u=0,f=a.length;u<f;u++)a[u].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function u(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=u(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const y=p[m];u(e.shapes,y)}else u(e.shapes,p)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(u(e.materials,this.material[p]));a.material=d}else a.material=u(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];a.animations.push(u(e.animations,p))}}if(n){const d=f(e.geometries),p=f(e.materials),m=f(e.textures),v=f(e.images),y=f(e.shapes),x=f(e.skeletons),S=f(e.animations),A=f(e.nodes);d.length>0&&(r.geometries=d),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),v.length>0&&(r.images=v),y.length>0&&(r.shapes=y),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),A.length>0&&(r.nodes=A)}return r.object=a,r;function f(d){const p=[];for(const m in d){const v=d[m];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}zn.DEFAULT_UP=new Z(0,1,0);zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ci=new Z,ki=new Z,bc=new Z,zi=new Z,Us=new Z,Ns=new Z,Yp=new Z,Pc=new Z,Dc=new Z,Lc=new Z,Ic=new Vt,Uc=new Vt,Nc=new Vt;class di{constructor(e=new Z,n=new Z,r=new Z){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),ci.subVectors(e,n),a.cross(ci);const u=a.lengthSq();return u>0?a.multiplyScalar(1/Math.sqrt(u)):a.set(0,0,0)}static getBarycoord(e,n,r,a,u){ci.subVectors(a,n),ki.subVectors(r,n),bc.subVectors(e,n);const f=ci.dot(ci),d=ci.dot(ki),p=ci.dot(bc),m=ki.dot(ki),v=ki.dot(bc),y=f*m-d*d;if(y===0)return u.set(0,0,0),null;const x=1/y,S=(m*p-d*v)*x,A=(f*v-d*p)*x;return u.set(1-S-A,A,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getInterpolation(e,n,r,a,u,f,d,p){return this.getBarycoord(e,n,r,a,zi)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(u,zi.x),p.addScaledVector(f,zi.y),p.addScaledVector(d,zi.z),p)}static getInterpolatedAttribute(e,n,r,a,u,f){return Ic.setScalar(0),Uc.setScalar(0),Nc.setScalar(0),Ic.fromBufferAttribute(e,n),Uc.fromBufferAttribute(e,r),Nc.fromBufferAttribute(e,a),f.setScalar(0),f.addScaledVector(Ic,u.x),f.addScaledVector(Uc,u.y),f.addScaledVector(Nc,u.z),f}static isFrontFacing(e,n,r,a){return ci.subVectors(r,n),ki.subVectors(e,n),ci.cross(ki).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),ci.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return di.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,u){return di.getInterpolation(e,this.a,this.b,this.c,n,r,a,u)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,u=this.c;let f,d;Us.subVectors(a,r),Ns.subVectors(u,r),Pc.subVectors(e,r);const p=Us.dot(Pc),m=Ns.dot(Pc);if(p<=0&&m<=0)return n.copy(r);Dc.subVectors(e,a);const v=Us.dot(Dc),y=Ns.dot(Dc);if(v>=0&&y<=v)return n.copy(a);const x=p*y-v*m;if(x<=0&&p>=0&&v<=0)return f=p/(p-v),n.copy(r).addScaledVector(Us,f);Lc.subVectors(e,u);const S=Us.dot(Lc),A=Ns.dot(Lc);if(A>=0&&S<=A)return n.copy(u);const w=S*m-p*A;if(w<=0&&m>=0&&A<=0)return d=m/(m-A),n.copy(r).addScaledVector(Ns,d);const _=v*A-S*y;if(_<=0&&y-v>=0&&S-A>=0)return Yp.subVectors(u,a),d=(y-v)/(y-v+(S-A)),n.copy(a).addScaledVector(Yp,d);const g=1/(_+w+x);return f=w*g,d=x*g,n.copy(r).addScaledVector(Us,f).addScaledVector(Ns,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Km={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},al={h:0,s:0,l:0};function Fc(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class bt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Kn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.toWorkingColorSpace(this,n),this}setRGB(e,n,r,a=xt.workingColorSpace){return this.r=e,this.g=n,this.b=r,xt.toWorkingColorSpace(this,a),this}setHSL(e,n,r,a=xt.workingColorSpace){if(e=Xv(e,1),n=yn(n,0,1),r=yn(r,0,1),n===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+n):r+n-r*n,f=2*r-u;this.r=Fc(f,u,e+1/3),this.g=Fc(f,u,e),this.b=Fc(f,u,e-1/3)}return xt.toWorkingColorSpace(this,a),this}setStyle(e,n=Kn){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let u;const f=a[1],d=a[2];switch(f){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,n);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,n);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const u=a[1],f=u.length;if(f===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(u,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Kn){const r=Km[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kn){return xt.fromWorkingColorSpace(hn.copy(this),e),Math.round(yn(hn.r*255,0,255))*65536+Math.round(yn(hn.g*255,0,255))*256+Math.round(yn(hn.b*255,0,255))}getHexString(e=Kn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=xt.workingColorSpace){xt.fromWorkingColorSpace(hn.copy(this),n);const r=hn.r,a=hn.g,u=hn.b,f=Math.max(r,a,u),d=Math.min(r,a,u);let p,m;const v=(d+f)/2;if(d===f)p=0,m=0;else{const y=f-d;switch(m=v<=.5?y/(f+d):y/(2-f-d),f){case r:p=(a-u)/y+(a<u?6:0);break;case a:p=(u-r)/y+2;break;case u:p=(r-a)/y+4;break}p/=6}return e.h=p,e.s=m,e.l=v,e}getRGB(e,n=xt.workingColorSpace){return xt.fromWorkingColorSpace(hn.copy(this),n),e.r=hn.r,e.g=hn.g,e.b=hn.b,e}getStyle(e=Kn){xt.fromWorkingColorSpace(hn.copy(this),e);const n=hn.r,r=hn.g,a=hn.b;return e!==Kn?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+n,vr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(vr),e.getHSL(al);const r=xc(vr.h,al.h,n),a=xc(vr.s,al.s,n),u=xc(vr.l,al.l,n);return this.setHSL(r,a,u),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,u=e.elements;return this.r=u[0]*n+u[3]*r+u[6]*a,this.g=u[1]*n+u[4]*r+u[7]*a,this.b=u[2]*n+u[5]*r+u[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hn=new bt;bt.NAMES=Km;let u0=0;class Il extends es{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Go(),this.name="",this.blending=Gs,this.side=Tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$c,this.blendDst=Zc,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new bt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(r.blending=this.blending),this.side!==Tr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==$c&&(r.blendSrc=this.blendSrc),this.blendDst!==Zc&&(r.blendDst=this.blendDst),this.blendEquation!==Yr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(r.stencilFail=this.stencilFail),this.stencilZFail!==As&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(u){const f=[];for(const d in u){const p=u[d];delete p.metadata,f.push(p)}return f}if(n){const u=a(e.textures),f=a(e.images);u.length>0&&(r.textures=u),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let u=0;u!==a;++u)r[u]=n[u].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class $m extends Il{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=Dm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Wt=new Z,ll=new at;class Ei{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=Dp,this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,u=this.itemSize;a<u;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)ll.fromBufferAttribute(this,n),ll.applyMatrix3(e),this.setXY(n,ll.x,ll.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)Wt.fromBufferAttribute(this,n),Wt.applyMatrix3(e),this.setXYZ(n,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)Wt.fromBufferAttribute(this,n),Wt.applyMatrix4(e),this.setXYZ(n,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)Wt.fromBufferAttribute(this,n),Wt.applyNormalMatrix(e),this.setXYZ(n,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)Wt.fromBufferAttribute(this,n),Wt.transformDirection(e),this.setXYZ(n,Wt.x,Wt.y,Wt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Uo(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=bn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Uo(n,this.array)),n}setX(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Uo(n,this.array)),n}setY(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Uo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Uo(n,this.array)),n}setW(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),r=bn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),r=bn(r,this.array),a=bn(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,u){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),r=bn(r,this.array),a=bn(a,this.array),u=bn(u,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=u,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dp&&(e.usage=this.usage),e}}class Zm extends Ei{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Qm extends Ei{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class Zr extends Ei{constructor(e,n,r){super(new Float32Array(e),n,r)}}let c0=0;const qn=new Ht,Oc=new zn,Fs=new Z,kn=new Wo,ko=new Wo,nn=new Z;class ts extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=Go(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wm(e)?Qm:Zm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new ot().getNormalMatrix(e);r.applyNormalMatrix(u),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,n,r){return qn.makeTranslation(e,n,r),this.applyMatrix4(qn),this}scale(e,n,r){return qn.makeScale(e,n,r),this.applyMatrix4(qn),this}lookAt(e){return Oc.lookAt(e),Oc.updateMatrix(),this.applyMatrix4(Oc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,u=e.length;a<u;a++){const f=e[a];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Zr(r,3))}else{for(let r=0,a=n.count;r<a;r++){const u=e[r];n.setXYZ(r,u.x,u.y,u.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const u=n[r];kn.setFromBufferAttribute(u),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jf);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const r=this.boundingSphere.center;if(kn.setFromBufferAttribute(e),n)for(let u=0,f=n.length;u<f;u++){const d=n[u];ko.setFromBufferAttribute(d),this.morphTargetsRelative?(nn.addVectors(kn.min,ko.min),kn.expandByPoint(nn),nn.addVectors(kn.max,ko.max),kn.expandByPoint(nn)):(kn.expandByPoint(ko.min),kn.expandByPoint(ko.max))}kn.getCenter(r);let a=0;for(let u=0,f=e.count;u<f;u++)nn.fromBufferAttribute(e,u),a=Math.max(a,r.distanceToSquared(nn));if(n)for(let u=0,f=n.length;u<f;u++){const d=n[u],p=this.morphTargetsRelative;for(let m=0,v=d.count;m<v;m++)nn.fromBufferAttribute(d,m),p&&(Fs.fromBufferAttribute(e,m),nn.add(Fs)),a=Math.max(a,r.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,u=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ei(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),d=[],p=[];for(let j=0;j<r.count;j++)d[j]=new Z,p[j]=new Z;const m=new Z,v=new Z,y=new Z,x=new at,S=new at,A=new at,w=new Z,_=new Z;function g(j,b,T){m.fromBufferAttribute(r,j),v.fromBufferAttribute(r,b),y.fromBufferAttribute(r,T),x.fromBufferAttribute(u,j),S.fromBufferAttribute(u,b),A.fromBufferAttribute(u,T),v.sub(m),y.sub(m),S.sub(x),A.sub(x);const k=1/(S.x*A.y-A.x*S.y);isFinite(k)&&(w.copy(v).multiplyScalar(A.y).addScaledVector(y,-S.y).multiplyScalar(k),_.copy(y).multiplyScalar(S.x).addScaledVector(v,-A.x).multiplyScalar(k),d[j].add(w),d[b].add(w),d[T].add(w),p[j].add(_),p[b].add(_),p[T].add(_))}let U=this.groups;U.length===0&&(U=[{start:0,count:e.count}]);for(let j=0,b=U.length;j<b;++j){const T=U[j],k=T.start,re=T.count;for(let Q=k,fe=k+re;Q<fe;Q+=3)g(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const L=new Z,R=new Z,X=new Z,N=new Z;function F(j){X.fromBufferAttribute(a,j),N.copy(X);const b=d[j];L.copy(b),L.sub(X.multiplyScalar(X.dot(b))).normalize(),R.crossVectors(N,b);const k=R.dot(p[j])<0?-1:1;f.setXYZW(j,L.x,L.y,L.z,k)}for(let j=0,b=U.length;j<b;++j){const T=U[j],k=T.start,re=T.count;for(let Q=k,fe=k+re;Q<fe;Q+=3)F(e.getX(Q+0)),F(e.getX(Q+1)),F(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Ei(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new Z,u=new Z,f=new Z,d=new Z,p=new Z,m=new Z,v=new Z,y=new Z;if(e)for(let x=0,S=e.count;x<S;x+=3){const A=e.getX(x+0),w=e.getX(x+1),_=e.getX(x+2);a.fromBufferAttribute(n,A),u.fromBufferAttribute(n,w),f.fromBufferAttribute(n,_),v.subVectors(f,u),y.subVectors(a,u),v.cross(y),d.fromBufferAttribute(r,A),p.fromBufferAttribute(r,w),m.fromBufferAttribute(r,_),d.add(v),p.add(v),m.add(v),r.setXYZ(A,d.x,d.y,d.z),r.setXYZ(w,p.x,p.y,p.z),r.setXYZ(_,m.x,m.y,m.z)}else for(let x=0,S=n.count;x<S;x+=3)a.fromBufferAttribute(n,x+0),u.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),v.subVectors(f,u),y.subVectors(a,u),v.cross(y),r.setXYZ(x+0,v.x,v.y,v.z),r.setXYZ(x+1,v.x,v.y,v.z),r.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)nn.fromBufferAttribute(e,n),nn.normalize(),e.setXYZ(n,nn.x,nn.y,nn.z)}toNonIndexed(){function e(d,p){const m=d.array,v=d.itemSize,y=d.normalized,x=new m.constructor(p.length*v);let S=0,A=0;for(let w=0,_=p.length;w<_;w++){d.isInterleavedBufferAttribute?S=p[w]*d.data.stride+d.offset:S=p[w]*v;for(let g=0;g<v;g++)x[A++]=m[S++]}return new Ei(x,v,y)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ts,r=this.index.array,a=this.attributes;for(const d in a){const p=a[d],m=e(p,r);n.setAttribute(d,m)}const u=this.morphAttributes;for(const d in u){const p=[],m=u[d];for(let v=0,y=m.length;v<y;v++){const x=m[v],S=e(x,r);p.push(S)}n.morphAttributes[d]=p}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,p=f.length;d<p;d++){const m=f[d];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const p in r){const m=r[p];e.data.attributes[p]=m.toJSON(e.data)}const a={};let u=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let y=0,x=m.length;y<x;y++){const S=m[y];v.push(S.toJSON(e.data))}v.length>0&&(a[p]=v,u=!0)}u&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const a=e.attributes;for(const m in a){const v=a[m];this.setAttribute(m,v.clone(n))}const u=e.morphAttributes;for(const m in u){const v=[],y=u[m];for(let x=0,S=y.length;x<S;x++)v.push(y[x].clone(n));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,v=f.length;m<v;m++){const y=f[m];this.addGroup(y.start,y.count,y.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qp=new Ht,Vr=new Ym,ul=new jf,Kp=new Z,cl=new Z,fl=new Z,dl=new Z,kc=new Z,hl=new Z,$p=new Z,pl=new Z;class Jn extends zn{constructor(e=new ts,n=new $m){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=a.length;u<f;u++){const d=a[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,u=r.morphAttributes.position,f=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(u&&d){hl.set(0,0,0);for(let p=0,m=u.length;p<m;p++){const v=d[p],y=u[p];v!==0&&(kc.fromBufferAttribute(y,e),f?hl.addScaledVector(kc,v):hl.addScaledVector(kc.sub(n),v))}n.add(hl)}return n}raycast(e,n){const r=this.geometry,a=this.material,u=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),ul.copy(r.boundingSphere),ul.applyMatrix4(u),Vr.copy(e.ray).recast(e.near),!(ul.containsPoint(Vr.origin)===!1&&(Vr.intersectSphere(ul,Kp)===null||Vr.origin.distanceToSquared(Kp)>(e.far-e.near)**2))&&(qp.copy(u).invert(),Vr.copy(e.ray).applyMatrix4(qp),!(r.boundingBox!==null&&Vr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Vr)))}_computeIntersections(e,n,r){let a;const u=this.geometry,f=this.material,d=u.index,p=u.attributes.position,m=u.attributes.uv,v=u.attributes.uv1,y=u.attributes.normal,x=u.groups,S=u.drawRange;if(d!==null)if(Array.isArray(f))for(let A=0,w=x.length;A<w;A++){const _=x[A],g=f[_.materialIndex],U=Math.max(_.start,S.start),L=Math.min(d.count,Math.min(_.start+_.count,S.start+S.count));for(let R=U,X=L;R<X;R+=3){const N=d.getX(R),F=d.getX(R+1),j=d.getX(R+2);a=ml(this,g,e,r,m,v,y,N,F,j),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const A=Math.max(0,S.start),w=Math.min(d.count,S.start+S.count);for(let _=A,g=w;_<g;_+=3){const U=d.getX(_),L=d.getX(_+1),R=d.getX(_+2);a=ml(this,f,e,r,m,v,y,U,L,R),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}else if(p!==void 0)if(Array.isArray(f))for(let A=0,w=x.length;A<w;A++){const _=x[A],g=f[_.materialIndex],U=Math.max(_.start,S.start),L=Math.min(p.count,Math.min(_.start+_.count,S.start+S.count));for(let R=U,X=L;R<X;R+=3){const N=R,F=R+1,j=R+2;a=ml(this,g,e,r,m,v,y,N,F,j),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const A=Math.max(0,S.start),w=Math.min(p.count,S.start+S.count);for(let _=A,g=w;_<g;_+=3){const U=_,L=_+1,R=_+2;a=ml(this,f,e,r,m,v,y,U,L,R),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}}}function f0(s,e,n,r,a,u,f,d){let p;if(e.side===Dn?p=r.intersectTriangle(f,u,a,!0,d):p=r.intersectTriangle(a,u,f,e.side===Tr,d),p===null)return null;pl.copy(d),pl.applyMatrix4(s.matrixWorld);const m=n.ray.origin.distanceTo(pl);return m<n.near||m>n.far?null:{distance:m,point:pl.clone(),object:s}}function ml(s,e,n,r,a,u,f,d,p,m){s.getVertexPosition(d,cl),s.getVertexPosition(p,fl),s.getVertexPosition(m,dl);const v=f0(s,e,n,r,cl,fl,dl,$p);if(v){const y=new Z;di.getBarycoord($p,cl,fl,dl,y),a&&(v.uv=di.getInterpolatedAttribute(a,d,p,m,y,new at)),u&&(v.uv1=di.getInterpolatedAttribute(u,d,p,m,y,new at)),f&&(v.normal=di.getInterpolatedAttribute(f,d,p,m,y,new Z),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const x={a:d,b:p,c:m,normal:new Z,materialIndex:0};di.getNormal(cl,fl,dl,x.normal),v.face=x,v.barycoord=y}return v}class Xo extends ts{constructor(e=1,n=1,r=1,a=1,u=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:u,depthSegments:f};const d=this;a=Math.floor(a),u=Math.floor(u),f=Math.floor(f);const p=[],m=[],v=[],y=[];let x=0,S=0;A("z","y","x",-1,-1,r,n,e,f,u,0),A("z","y","x",1,-1,r,n,-e,f,u,1),A("x","z","y",1,1,e,r,n,a,f,2),A("x","z","y",1,-1,e,r,-n,a,f,3),A("x","y","z",1,-1,e,n,r,a,u,4),A("x","y","z",-1,-1,e,n,-r,a,u,5),this.setIndex(p),this.setAttribute("position",new Zr(m,3)),this.setAttribute("normal",new Zr(v,3)),this.setAttribute("uv",new Zr(y,2));function A(w,_,g,U,L,R,X,N,F,j,b){const T=R/F,k=X/j,re=R/2,Q=X/2,fe=N/2,he=F+1,oe=j+1;let le=0,z=0;const ae=new Z;for(let se=0;se<oe;se++){const I=se*k-Q;for(let ne=0;ne<he;ne++){const Ie=ne*T-re;ae[w]=Ie*U,ae[_]=I*L,ae[g]=fe,m.push(ae.x,ae.y,ae.z),ae[w]=0,ae[_]=0,ae[g]=N>0?1:-1,v.push(ae.x,ae.y,ae.z),y.push(ne/F),y.push(1-se/j),le+=1}}for(let se=0;se<j;se++)for(let I=0;I<F;I++){const ne=x+I+he*se,Ie=x+I+he*(se+1),$=x+(I+1)+he*(se+1),ue=x+(I+1)+he*se;p.push(ne,Ie,ue),p.push(Ie,$,ue),z+=6}d.addGroup(S,z,b),S+=z,x+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Zs(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function xn(s){const e={};for(let n=0;n<s.length;n++){const r=Zs(s[n]);for(const a in r)e[a]=r[a]}return e}function d0(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function Jm(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const h0={clone:Zs,merge:xn};var p0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends Il{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p0,this.fragmentShader=m0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zs(e.uniforms),this.uniformsGroups=d0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const f=this.uniforms[a].value;f&&f.isTexture?n.uniforms[a]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[a]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[a]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[a]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[a]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[a]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[a]={type:"m4",value:f.toArray()}:n.uniforms[a]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class eg extends zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Gi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xr=new Z,Zp=new at,Qp=new at;class $n extends eg{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ff*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ff*2*Math.atan(Math.tan(Cl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){xr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xr.x,xr.y).multiplyScalar(-e/xr.z),xr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(xr.x,xr.y).multiplyScalar(-e/xr.z)}getViewSize(e,n){return this.getViewBounds(e,Zp,Qp),n.subVectors(Qp,Zp)}setViewOffset(e,n,r,a,u,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Cl*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,u=-.5*a;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;u+=f.offsetX*a/p,n-=f.offsetY*r/m,a*=f.width/p,r*=f.height/m}const d=this.filmOffset;d!==0&&(u+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+a,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Os=-90,ks=1;class g0 extends zn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new $n(Os,ks,e,n);a.layers=this.layers,this.add(a);const u=new $n(Os,ks,e,n);u.layers=this.layers,this.add(u);const f=new $n(Os,ks,e,n);f.layers=this.layers,this.add(f);const d=new $n(Os,ks,e,n);d.layers=this.layers,this.add(d);const p=new $n(Os,ks,e,n);p.layers=this.layers,this.add(p);const m=new $n(Os,ks,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,u,f,d,p]=n;for(const m of n)this.remove(m);if(e===Gi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===bl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[u,f,d,p,m,v]=this.children,y=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,u),e.setRenderTarget(r,1,a),e.render(n,f),e.setRenderTarget(r,2,a),e.render(n,d),e.setRenderTarget(r,3,a),e.render(n,p),e.setRenderTarget(r,4,a),e.render(n,m),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,a),e.render(n,v),e.setRenderTarget(y,x,S),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class tg extends Ln{constructor(e,n,r,a,u,f,d,p,m,v){e=e!==void 0?e:[],n=n!==void 0?n:Ys,super(e,n,r,a,u,f,d,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _0 extends Mi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new tg(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Zn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Xo(5,5,5),u=new pi({name:"CubemapFromEquirect",uniforms:Zs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Dn,blending:Mr});u.uniforms.tEquirect.value=n;const f=new Jn(a,u),d=n.minFilter;return n.minFilter===$r&&(n.minFilter=Zn),new g0(1,10,this).update(e,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(e,n,r,a){const u=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,r,a);e.setRenderTarget(u)}}const zc=new Z,v0=new Z,x0=new ot;class yr{constructor(e=new Z(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=zc.subVectors(r,n).cross(v0.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(zc),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/a;return u<0||u>1?null:n.copy(e.start).addScaledVector(r,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||x0.getNormalMatrix(e),a=this.coplanarPoint(zc).applyMatrix4(e),u=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(u),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hr=new jf,gl=new Z;class ng{constructor(e=new yr,n=new yr,r=new yr,a=new yr,u=new yr,f=new yr){this.planes=[e,n,r,a,u,f]}set(e,n,r,a,u,f){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(r),d[3].copy(a),d[4].copy(u),d[5].copy(f),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Gi){const r=this.planes,a=e.elements,u=a[0],f=a[1],d=a[2],p=a[3],m=a[4],v=a[5],y=a[6],x=a[7],S=a[8],A=a[9],w=a[10],_=a[11],g=a[12],U=a[13],L=a[14],R=a[15];if(r[0].setComponents(p-u,x-m,_-S,R-g).normalize(),r[1].setComponents(p+u,x+m,_+S,R+g).normalize(),r[2].setComponents(p+f,x+v,_+A,R+U).normalize(),r[3].setComponents(p-f,x-v,_-A,R-U).normalize(),r[4].setComponents(p-d,x-y,_-w,R-L).normalize(),n===Gi)r[5].setComponents(p+d,x+y,_+w,R+L).normalize();else if(n===bl)r[5].setComponents(d,y,w,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(e){return Hr.center.set(0,0,0),Hr.radius=.7071067811865476,Hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let u=0;u<6;u++)if(n[u].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(gl.x=a.normal.x>0?e.max.x:e.min.x,gl.y=a.normal.y>0?e.max.y:e.min.y,gl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(gl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ig(){let s=null,e=!1,n=null,r=null;function a(u,f){n(u,f),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(u){n=u},setContext:function(u){s=u}}}function y0(s){const e=new WeakMap;function n(d,p){const m=d.array,v=d.usage,y=m.byteLength,x=s.createBuffer();s.bindBuffer(p,x),s.bufferData(p,m,v),d.onUploadCallback();let S;if(m instanceof Float32Array)S=s.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=s.SHORT;else if(m instanceof Uint32Array)S=s.UNSIGNED_INT;else if(m instanceof Int32Array)S=s.INT;else if(m instanceof Int8Array)S=s.BYTE;else if(m instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:y}}function r(d,p,m){const v=p.array,y=p.updateRanges;if(s.bindBuffer(m,d),y.length===0)s.bufferSubData(m,0,v);else{y.sort((S,A)=>S.start-A.start);let x=0;for(let S=1;S<y.length;S++){const A=y[x],w=y[S];w.start<=A.start+A.count+1?A.count=Math.max(A.count,w.start+w.count-A.start):(++x,y[x]=w)}y.length=x+1;for(let S=0,A=y.length;S<A;S++){const w=y[S];s.bufferSubData(m,w.start*v.BYTES_PER_ELEMENT,v,w.start,w.count)}p.clearUpdateRanges()}p.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(s.deleteBuffer(p.buffer),e.delete(d))}function f(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,n(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,d,p),m.version=d.version}}return{get:a,remove:u,update:f}}class jo extends ts{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const u=e/2,f=n/2,d=Math.floor(r),p=Math.floor(a),m=d+1,v=p+1,y=e/d,x=n/p,S=[],A=[],w=[],_=[];for(let g=0;g<v;g++){const U=g*x-f;for(let L=0;L<m;L++){const R=L*y-u;A.push(R,-U,0),w.push(0,0,1),_.push(L/d),_.push(1-g/p)}}for(let g=0;g<p;g++)for(let U=0;U<d;U++){const L=U+m*g,R=U+m*(g+1),X=U+1+m*(g+1),N=U+1+m*g;S.push(L,R,N),S.push(R,X,N)}this.setIndex(S),this.setAttribute("position",new Zr(A,3)),this.setAttribute("normal",new Zr(w,3)),this.setAttribute("uv",new Zr(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.width,e.height,e.widthSegments,e.heightSegments)}}var S0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M0=`#ifdef USE_ALPHAHASH
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
#endif`,E0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,T0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,w0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,C0=`#ifdef USE_AOMAP
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
#endif`,R0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b0=`#ifdef USE_BATCHING
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
#endif`,P0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,D0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,U0=`#ifdef USE_IRIDESCENCE
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
#endif`,N0=`#ifdef USE_BUMPMAP
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
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,V0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,H0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,W0=`#define PI 3.141592653589793
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
} // validated`,X0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,j0=`vec3 transformedNormal = objectNormal;
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
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,q0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Q0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,J0=`#ifdef USE_ENVMAP
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
#endif`,ex=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tx=`#ifdef USE_ENVMAP
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
#endif`,nx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ix=`#ifdef USE_ENVMAP
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
#endif`,rx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ox=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ax=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lx=`#ifdef USE_GRADIENTMAP
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
}`,ux=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dx=`uniform bool receiveShadow;
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
#endif`,hx=`#ifdef USE_ENVMAP
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
#endif`,px=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vx=`PhysicalMaterial material;
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
#endif`,xx=`struct PhysicalMaterial {
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
}`,yx=`
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
#endif`,Sx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ex=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ax=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Px=`#if defined( USE_POINTS_UV )
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
#endif`,Dx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ix=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ux=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fx=`#ifdef USE_MORPHTARGETS
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
#endif`,Ox=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gx=`#ifdef USE_NORMALMAP
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
#endif`,Wx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$x=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ey=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ty=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ny=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ry=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sy=`float getShadowMask() {
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
}`,oy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ay=`#ifdef USE_SKINNING
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
#endif`,ly=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uy=`#ifdef USE_SKINNING
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
#endif`,cy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,py=`#ifdef USE_TRANSMISSION
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
#endif`,my=`#ifdef USE_TRANSMISSION
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
#endif`,gy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sy=`uniform sampler2D t2D;
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
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ey=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ty=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ay=`#include <common>
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
}`,Cy=`#if DEPTH_PACKING == 3200
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
}`,Ry=`#define DISTANCE
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
}`,by=`#define DISTANCE
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
}`,Py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ly=`uniform float scale;
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
}`,Iy=`uniform vec3 diffuse;
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
}`,Uy=`#include <common>
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
}`,Ny=`uniform vec3 diffuse;
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
}`,Fy=`#define LAMBERT
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
}`,Oy=`#define LAMBERT
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
}`,ky=`#define MATCAP
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
}`,zy=`#define MATCAP
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
}`,By=`#define NORMAL
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
}`,Vy=`#define NORMAL
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
}`,Hy=`#define PHONG
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
}`,Gy=`#define PHONG
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
}`,Wy=`#define STANDARD
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
}`,Xy=`#define STANDARD
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
}`,jy=`#define TOON
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
}`,Yy=`#define TOON
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
}`,qy=`uniform float size;
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
}`,Ky=`uniform vec3 diffuse;
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
}`,$y=`#include <common>
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
}`,Zy=`uniform vec3 color;
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
}`,Qy=`uniform float rotation;
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
}`,Jy=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:S0,alphahash_pars_fragment:M0,alphamap_fragment:E0,alphamap_pars_fragment:T0,alphatest_fragment:w0,alphatest_pars_fragment:A0,aomap_fragment:C0,aomap_pars_fragment:R0,batching_pars_vertex:b0,batching_vertex:P0,begin_vertex:D0,beginnormal_vertex:L0,bsdfs:I0,iridescence_fragment:U0,bumpmap_pars_fragment:N0,clipping_planes_fragment:F0,clipping_planes_pars_fragment:O0,clipping_planes_pars_vertex:k0,clipping_planes_vertex:z0,color_fragment:B0,color_pars_fragment:V0,color_pars_vertex:H0,color_vertex:G0,common:W0,cube_uv_reflection_fragment:X0,defaultnormal_vertex:j0,displacementmap_pars_vertex:Y0,displacementmap_vertex:q0,emissivemap_fragment:K0,emissivemap_pars_fragment:$0,colorspace_fragment:Z0,colorspace_pars_fragment:Q0,envmap_fragment:J0,envmap_common_pars_fragment:ex,envmap_pars_fragment:tx,envmap_pars_vertex:nx,envmap_physical_pars_fragment:hx,envmap_vertex:ix,fog_vertex:rx,fog_pars_vertex:sx,fog_fragment:ox,fog_pars_fragment:ax,gradientmap_pars_fragment:lx,lightmap_pars_fragment:ux,lights_lambert_fragment:cx,lights_lambert_pars_fragment:fx,lights_pars_begin:dx,lights_toon_fragment:px,lights_toon_pars_fragment:mx,lights_phong_fragment:gx,lights_phong_pars_fragment:_x,lights_physical_fragment:vx,lights_physical_pars_fragment:xx,lights_fragment_begin:yx,lights_fragment_maps:Sx,lights_fragment_end:Mx,logdepthbuf_fragment:Ex,logdepthbuf_pars_fragment:Tx,logdepthbuf_pars_vertex:wx,logdepthbuf_vertex:Ax,map_fragment:Cx,map_pars_fragment:Rx,map_particle_fragment:bx,map_particle_pars_fragment:Px,metalnessmap_fragment:Dx,metalnessmap_pars_fragment:Lx,morphinstance_vertex:Ix,morphcolor_vertex:Ux,morphnormal_vertex:Nx,morphtarget_pars_vertex:Fx,morphtarget_vertex:Ox,normal_fragment_begin:kx,normal_fragment_maps:zx,normal_pars_fragment:Bx,normal_pars_vertex:Vx,normal_vertex:Hx,normalmap_pars_fragment:Gx,clearcoat_normal_fragment_begin:Wx,clearcoat_normal_fragment_maps:Xx,clearcoat_pars_fragment:jx,iridescence_pars_fragment:Yx,opaque_fragment:qx,packing:Kx,premultiplied_alpha_fragment:$x,project_vertex:Zx,dithering_fragment:Qx,dithering_pars_fragment:Jx,roughnessmap_fragment:ey,roughnessmap_pars_fragment:ty,shadowmap_pars_fragment:ny,shadowmap_pars_vertex:iy,shadowmap_vertex:ry,shadowmask_pars_fragment:sy,skinbase_vertex:oy,skinning_pars_vertex:ay,skinning_vertex:ly,skinnormal_vertex:uy,specularmap_fragment:cy,specularmap_pars_fragment:fy,tonemapping_fragment:dy,tonemapping_pars_fragment:hy,transmission_fragment:py,transmission_pars_fragment:my,uv_pars_fragment:gy,uv_pars_vertex:_y,uv_vertex:vy,worldpos_vertex:xy,background_vert:yy,background_frag:Sy,backgroundCube_vert:My,backgroundCube_frag:Ey,cube_vert:Ty,cube_frag:wy,depth_vert:Ay,depth_frag:Cy,distanceRGBA_vert:Ry,distanceRGBA_frag:by,equirect_vert:Py,equirect_frag:Dy,linedashed_vert:Ly,linedashed_frag:Iy,meshbasic_vert:Uy,meshbasic_frag:Ny,meshlambert_vert:Fy,meshlambert_frag:Oy,meshmatcap_vert:ky,meshmatcap_frag:zy,meshnormal_vert:By,meshnormal_frag:Vy,meshphong_vert:Hy,meshphong_frag:Gy,meshphysical_vert:Wy,meshphysical_frag:Xy,meshtoon_vert:jy,meshtoon_frag:Yy,points_vert:qy,points_frag:Ky,shadow_vert:$y,shadow_frag:Zy,sprite_vert:Qy,sprite_frag:Jy},be={common:{diffuse:{value:new bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new bt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Si={basic:{uniforms:xn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:xn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new bt(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:xn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new bt(0)},specular:{value:new bt(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:xn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:xn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new bt(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:xn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:xn([be.points,be.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:xn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:xn([be.common,be.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:xn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:xn([be.sprite,be.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:xn([be.common,be.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:xn([be.lights,be.fog,{color:{value:new bt(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};Si.physical={uniforms:xn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new bt(0)},specularColor:{value:new bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const _l={r:0,b:0,g:0},Gr=new ji,eS=new Ht;function tS(s,e,n,r,a,u,f){const d=new bt(0);let p=u===!0?0:1,m,v,y=null,x=0,S=null;function A(U){let L=U.isScene===!0?U.background:null;return L&&L.isTexture&&(L=(U.backgroundBlurriness>0?n:e).get(L)),L}function w(U){let L=!1;const R=A(U);R===null?g(d,p):R&&R.isColor&&(g(R,1),L=!0);const X=s.xr.getEnvironmentBlendMode();X==="additive"?r.buffers.color.setClear(0,0,0,1,f):X==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(s.autoClear||L)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(U,L){const R=A(L);R&&(R.isCubeTexture||R.mapping===Dl)?(v===void 0&&(v=new Jn(new Xo(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:Zs(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(X,N,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(v)),Gr.copy(L.backgroundRotation),Gr.x*=-1,Gr.y*=-1,Gr.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Gr.y*=-1,Gr.z*=-1),v.material.uniforms.envMap.value=R,v.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(eS.makeRotationFromEuler(Gr)),v.material.toneMapped=xt.getTransfer(R.colorSpace)!==Ct,(y!==R||x!==R.version||S!==s.toneMapping)&&(v.material.needsUpdate=!0,y=R,x=R.version,S=s.toneMapping),v.layers.enableAll(),U.unshift(v,v.geometry,v.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new Jn(new jo(2,2),new pi({name:"BackgroundMaterial",uniforms:Zs(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Tr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,m.material.toneMapped=xt.getTransfer(R.colorSpace)!==Ct,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(y!==R||x!==R.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,y=R,x=R.version,S=s.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function g(U,L){U.getRGB(_l,Jm(s)),r.buffers.color.setClear(_l.r,_l.g,_l.b,L,f)}return{getClearColor:function(){return d},setClearColor:function(U,L=1){d.set(U),p=L,g(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(U){p=U,g(d,p)},render:w,addToRenderList:_}}function nS(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let u=a,f=!1;function d(T,k,re,Q,fe){let he=!1;const oe=y(Q,re,k);u!==oe&&(u=oe,m(u.object)),he=S(T,Q,re,fe),he&&A(T,Q,re,fe),fe!==null&&e.update(fe,s.ELEMENT_ARRAY_BUFFER),(he||f)&&(f=!1,R(T,k,re,Q),fe!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(fe).buffer))}function p(){return s.createVertexArray()}function m(T){return s.bindVertexArray(T)}function v(T){return s.deleteVertexArray(T)}function y(T,k,re){const Q=re.wireframe===!0;let fe=r[T.id];fe===void 0&&(fe={},r[T.id]=fe);let he=fe[k.id];he===void 0&&(he={},fe[k.id]=he);let oe=he[Q];return oe===void 0&&(oe=x(p()),he[Q]=oe),oe}function x(T){const k=[],re=[],Q=[];for(let fe=0;fe<n;fe++)k[fe]=0,re[fe]=0,Q[fe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:re,attributeDivisors:Q,object:T,attributes:{},index:null}}function S(T,k,re,Q){const fe=u.attributes,he=k.attributes;let oe=0;const le=re.getAttributes();for(const z in le)if(le[z].location>=0){const se=fe[z];let I=he[z];if(I===void 0&&(z==="instanceMatrix"&&T.instanceMatrix&&(I=T.instanceMatrix),z==="instanceColor"&&T.instanceColor&&(I=T.instanceColor)),se===void 0||se.attribute!==I||I&&se.data!==I.data)return!0;oe++}return u.attributesNum!==oe||u.index!==Q}function A(T,k,re,Q){const fe={},he=k.attributes;let oe=0;const le=re.getAttributes();for(const z in le)if(le[z].location>=0){let se=he[z];se===void 0&&(z==="instanceMatrix"&&T.instanceMatrix&&(se=T.instanceMatrix),z==="instanceColor"&&T.instanceColor&&(se=T.instanceColor));const I={};I.attribute=se,se&&se.data&&(I.data=se.data),fe[z]=I,oe++}u.attributes=fe,u.attributesNum=oe,u.index=Q}function w(){const T=u.newAttributes;for(let k=0,re=T.length;k<re;k++)T[k]=0}function _(T){g(T,0)}function g(T,k){const re=u.newAttributes,Q=u.enabledAttributes,fe=u.attributeDivisors;re[T]=1,Q[T]===0&&(s.enableVertexAttribArray(T),Q[T]=1),fe[T]!==k&&(s.vertexAttribDivisor(T,k),fe[T]=k)}function U(){const T=u.newAttributes,k=u.enabledAttributes;for(let re=0,Q=k.length;re<Q;re++)k[re]!==T[re]&&(s.disableVertexAttribArray(re),k[re]=0)}function L(T,k,re,Q,fe,he,oe){oe===!0?s.vertexAttribIPointer(T,k,re,fe,he):s.vertexAttribPointer(T,k,re,Q,fe,he)}function R(T,k,re,Q){w();const fe=Q.attributes,he=re.getAttributes(),oe=k.defaultAttributeValues;for(const le in he){const z=he[le];if(z.location>=0){let ae=fe[le];if(ae===void 0&&(le==="instanceMatrix"&&T.instanceMatrix&&(ae=T.instanceMatrix),le==="instanceColor"&&T.instanceColor&&(ae=T.instanceColor)),ae!==void 0){const se=ae.normalized,I=ae.itemSize,ne=e.get(ae);if(ne===void 0)continue;const Ie=ne.buffer,$=ne.type,ue=ne.bytesPerElement,Me=$===s.INT||$===s.UNSIGNED_INT||ae.gpuType===Bf;if(ae.isInterleavedBufferAttribute){const ve=ae.data,Ae=ve.stride,Ue=ae.offset;if(ve.isInstancedInterleavedBuffer){for(let Ze=0;Ze<z.locationSize;Ze++)g(z.location+Ze,ve.meshPerAttribute);T.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ze=0;Ze<z.locationSize;Ze++)_(z.location+Ze);s.bindBuffer(s.ARRAY_BUFFER,Ie);for(let Ze=0;Ze<z.locationSize;Ze++)L(z.location+Ze,I/z.locationSize,$,se,Ae*ue,(Ue+I/z.locationSize*Ze)*ue,Me)}else{if(ae.isInstancedBufferAttribute){for(let ve=0;ve<z.locationSize;ve++)g(z.location+ve,ae.meshPerAttribute);T.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ve=0;ve<z.locationSize;ve++)_(z.location+ve);s.bindBuffer(s.ARRAY_BUFFER,Ie);for(let ve=0;ve<z.locationSize;ve++)L(z.location+ve,I/z.locationSize,$,se,I*ue,I/z.locationSize*ve*ue,Me)}}else if(oe!==void 0){const se=oe[le];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(z.location,se);break;case 3:s.vertexAttrib3fv(z.location,se);break;case 4:s.vertexAttrib4fv(z.location,se);break;default:s.vertexAttrib1fv(z.location,se)}}}}U()}function X(){j();for(const T in r){const k=r[T];for(const re in k){const Q=k[re];for(const fe in Q)v(Q[fe].object),delete Q[fe];delete k[re]}delete r[T]}}function N(T){if(r[T.id]===void 0)return;const k=r[T.id];for(const re in k){const Q=k[re];for(const fe in Q)v(Q[fe].object),delete Q[fe];delete k[re]}delete r[T.id]}function F(T){for(const k in r){const re=r[k];if(re[T.id]===void 0)continue;const Q=re[T.id];for(const fe in Q)v(Q[fe].object),delete Q[fe];delete re[T.id]}}function j(){b(),f=!0,u!==a&&(u=a,m(u.object))}function b(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:j,resetDefaultState:b,dispose:X,releaseStatesOfGeometry:N,releaseStatesOfProgram:F,initAttributes:w,enableAttribute:_,disableUnusedAttributes:U}}function iS(s,e,n){let r;function a(m){r=m}function u(m,v){s.drawArrays(r,m,v),n.update(v,r,1)}function f(m,v,y){y!==0&&(s.drawArraysInstanced(r,m,v,y),n.update(v,r,y))}function d(m,v,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,v,0,y);let S=0;for(let A=0;A<y;A++)S+=v[A];n.update(S,r,1)}function p(m,v,y,x){if(y===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let A=0;A<m.length;A++)f(m[A],v[A],x[A]);else{S.multiDrawArraysInstancedWEBGL(r,m,0,v,0,x,0,y);let A=0;for(let w=0;w<y;w++)A+=v[w]*x[w];n.update(A,r,1)}}this.setMode=a,this.render=u,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function rS(s,e,n,r){let a;function u(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function f(F){return!(F!==Qn&&r.convert(F)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(F){const j=F===Qs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==Xi&&r.convert(F)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==Hi&&!j)}function p(F){if(F==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const v=p(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const y=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),U=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),L=s.getParameter(s.MAX_VARYING_VECTORS),R=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),X=A>0,N=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:y,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:A,maxTextureSize:w,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:U,maxVaryings:L,maxFragmentUniforms:R,vertexTextures:X,maxSamples:N}}function sS(s){const e=this;let n=null,r=0,a=!1,u=!1;const f=new yr,d=new ot,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(y,x){const S=y.length!==0||x||r!==0||a;return a=x,r=y.length,S},this.beginShadows=function(){u=!0,v(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(y,x){n=v(y,x,0)},this.setState=function(y,x,S){const A=y.clippingPlanes,w=y.clipIntersection,_=y.clipShadows,g=s.get(y);if(!a||A===null||A.length===0||u&&!_)u?v(null):m();else{const U=u?0:r,L=U*4;let R=g.clippingState||null;p.value=R,R=v(A,x,L,S);for(let X=0;X!==L;++X)R[X]=n[X];g.clippingState=R,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=U}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(y,x,S,A){const w=y!==null?y.length:0;let _=null;if(w!==0){if(_=p.value,A!==!0||_===null){const g=S+w*4,U=x.matrixWorldInverse;d.getNormalMatrix(U),(_===null||_.length<g)&&(_=new Float32Array(g));for(let L=0,R=S;L!==w;++L,R+=4)f.copy(y[L]).applyMatrix4(U,d),f.normal.toArray(_,R),_[R+3]=f.constant}p.value=_,p.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,_}}function oS(s){let e=new WeakMap;function n(f,d){return d===of?f.mapping=Ys:d===af&&(f.mapping=qs),f}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===of||d===af)if(e.has(f)){const p=e.get(f).texture;return n(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new _0(p.height);return m.fromEquirectangularTexture(s,f),e.set(f,m),f.addEventListener("dispose",a),n(m.texture,f.mapping)}else return null}}return f}function a(f){const d=f.target;d.removeEventListener("dispose",a);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){e=new WeakMap}return{get:r,dispose:u}}class rg extends eg{constructor(e=-1,n=1,r=1,a=-1,u=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=u,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,u,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let u=r-e,f=r+e,d=a+n,p=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=m*this.view.offsetX,f=u+m*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(u,f,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Vs=4,Jp=[.125,.215,.35,.446,.526,.582],qr=20,Bc=new rg,em=new bt;let Vc=null,Hc=0,Gc=0,Wc=!1;const jr=(1+Math.sqrt(5))/2,zs=1/jr,tm=[new Z(-jr,zs,0),new Z(jr,zs,0),new Z(-zs,0,jr),new Z(zs,0,jr),new Z(0,jr,-zs),new Z(0,jr,zs),new Z(-1,1,-1),new Z(1,1,-1),new Z(-1,1,1),new Z(1,1,1)];class nm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100){Vc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Gc=this._renderer.getActiveMipmapLevel(),Wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,r,a,u),n>0&&this._blur(u,0,0,n),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vc,Hc,Gc),this._renderer.xr.enabled=Wc,e.scissorTest=!1,vl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ys||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Gc=this._renderer.getActiveMipmapLevel(),Wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:Zn,minFilter:Zn,generateMipmaps:!1,type:Qs,format:Qn,colorSpace:Js,depthBuffer:!1},a=im(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=im(e,n,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=aS(u)),this._blurMaterial=lS(u,e,n)}return a}_compileMaterial(e){const n=new Jn(this._lodPlanes[0],e);this._renderer.compile(n,Bc)}_sceneToCubeUV(e,n,r,a){const d=new $n(90,1,n,r),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],v=this._renderer,y=v.autoClear,x=v.toneMapping;v.getClearColor(em),v.toneMapping=Er,v.autoClear=!1;const S=new $m({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),A=new Jn(new Xo,S);let w=!1;const _=e.background;_?_.isColor&&(S.color.copy(_),e.background=null,w=!0):(S.color.copy(em),w=!0);for(let g=0;g<6;g++){const U=g%3;U===0?(d.up.set(0,p[g],0),d.lookAt(m[g],0,0)):U===1?(d.up.set(0,0,p[g]),d.lookAt(0,m[g],0)):(d.up.set(0,p[g],0),d.lookAt(0,0,m[g]));const L=this._cubeSize;vl(a,U*L,g>2?L:0,L,L),v.setRenderTarget(a),w&&v.render(A,d),v.render(e,d)}A.geometry.dispose(),A.material.dispose(),v.toneMapping=x,v.autoClear=y,e.background=_}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Ys||e.mapping===qs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=sm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rm());const u=a?this._cubemapMaterial:this._equirectMaterial,f=new Jn(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=e;const p=this._cubeSize;vl(n,0,0,3*p,2*p),r.setRenderTarget(n),r.render(f,Bc)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let u=1;u<a;u++){const f=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=tm[(a-u-1)%tm.length];this._blur(e,u-1,u,f,d)}n.autoClear=r}_blur(e,n,r,a,u){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,r,a,"latitudinal",u),this._halfBlur(f,e,r,r,a,"longitudinal",u)}_halfBlur(e,n,r,a,u,f,d){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,y=new Jn(this._lodPlanes[a],m),x=m.uniforms,S=this._sizeLods[r]-1,A=isFinite(u)?Math.PI/(2*S):2*Math.PI/(2*qr-1),w=u/A,_=isFinite(u)?1+Math.floor(v*w):qr;_>qr&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${qr}`);const g=[];let U=0;for(let F=0;F<qr;++F){const j=F/w,b=Math.exp(-j*j/2);g.push(b),F===0?U+=b:F<_&&(U+=2*b)}for(let F=0;F<g.length;F++)g[F]=g[F]/U;x.envMap.value=e.texture,x.samples.value=_,x.weights.value=g,x.latitudinal.value=f==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:L}=this;x.dTheta.value=A,x.mipInt.value=L-r;const R=this._sizeLods[a],X=3*R*(a>L-Vs?a-L+Vs:0),N=4*(this._cubeSize-R);vl(n,X,N,3*R,2*R),p.setRenderTarget(n),p.render(y,Bc)}}function aS(s){const e=[],n=[],r=[];let a=s;const u=s-Vs+1+Jp.length;for(let f=0;f<u;f++){const d=Math.pow(2,a);n.push(d);let p=1/d;f>s-Vs?p=Jp[f-s+Vs-1]:f===0&&(p=0),r.push(p);const m=1/(d-2),v=-m,y=1+m,x=[v,v,y,v,y,y,v,v,y,y,v,y],S=6,A=6,w=3,_=2,g=1,U=new Float32Array(w*A*S),L=new Float32Array(_*A*S),R=new Float32Array(g*A*S);for(let N=0;N<S;N++){const F=N%3*2/3-1,j=N>2?0:-1,b=[F,j,0,F+2/3,j,0,F+2/3,j+1,0,F,j,0,F+2/3,j+1,0,F,j+1,0];U.set(b,w*A*N),L.set(x,_*A*N);const T=[N,N,N,N,N,N];R.set(T,g*A*N)}const X=new ts;X.setAttribute("position",new Ei(U,w)),X.setAttribute("uv",new Ei(L,_)),X.setAttribute("faceIndex",new Ei(R,g)),e.push(X),a>Vs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function im(s,e,n){const r=new Mi(s,e,n);return r.texture.mapping=Dl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function vl(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function lS(s,e,n){const r=new Float32Array(qr),a=new Z(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Yf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function rm(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function sm(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Yf(){return`

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
	`}function uS(s){let e=new WeakMap,n=null;function r(d){if(d&&d.isTexture){const p=d.mapping,m=p===of||p===af,v=p===Ys||p===qs;if(m||v){let y=e.get(d);const x=y!==void 0?y.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new nm(s)),y=m?n.fromEquirectangular(d,y):n.fromCubemap(d,y),y.texture.pmremVersion=d.pmremVersion,e.set(d,y),y.texture;if(y!==void 0)return y.texture;{const S=d.image;return m&&S&&S.height>0||v&&S&&a(S)?(n===null&&(n=new nm(s)),y=m?n.fromEquirectangular(d):n.fromCubemap(d),y.texture.pmremVersion=d.pmremVersion,e.set(d,y),d.addEventListener("dispose",u),y.texture):null}}}return d}function a(d){let p=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&p++;return p===m}function u(d){const p=d.target;p.removeEventListener("dispose",u);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function f(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function cS(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&zo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function fS(s,e,n,r){const a={},u=new WeakMap;function f(y){const x=y.target;x.index!==null&&e.remove(x.index);for(const A in x.attributes)e.remove(x.attributes[A]);for(const A in x.morphAttributes){const w=x.morphAttributes[A];for(let _=0,g=w.length;_<g;_++)e.remove(w[_])}x.removeEventListener("dispose",f),delete a[x.id];const S=u.get(x);S&&(e.remove(S),u.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(y,x){return a[x.id]===!0||(x.addEventListener("dispose",f),a[x.id]=!0,n.memory.geometries++),x}function p(y){const x=y.attributes;for(const A in x)e.update(x[A],s.ARRAY_BUFFER);const S=y.morphAttributes;for(const A in S){const w=S[A];for(let _=0,g=w.length;_<g;_++)e.update(w[_],s.ARRAY_BUFFER)}}function m(y){const x=[],S=y.index,A=y.attributes.position;let w=0;if(S!==null){const U=S.array;w=S.version;for(let L=0,R=U.length;L<R;L+=3){const X=U[L+0],N=U[L+1],F=U[L+2];x.push(X,N,N,F,F,X)}}else if(A!==void 0){const U=A.array;w=A.version;for(let L=0,R=U.length/3-1;L<R;L+=3){const X=L+0,N=L+1,F=L+2;x.push(X,N,N,F,F,X)}}else return;const _=new(Wm(x)?Qm:Zm)(x,1);_.version=w;const g=u.get(y);g&&e.remove(g),u.set(y,_)}function v(y){const x=u.get(y);if(x){const S=y.index;S!==null&&x.version<S.version&&m(y)}else m(y);return u.get(y)}return{get:d,update:p,getWireframeAttribute:v}}function dS(s,e,n){let r;function a(x){r=x}let u,f;function d(x){u=x.type,f=x.bytesPerElement}function p(x,S){s.drawElements(r,S,u,x*f),n.update(S,r,1)}function m(x,S,A){A!==0&&(s.drawElementsInstanced(r,S,u,x*f,A),n.update(S,r,A))}function v(x,S,A){if(A===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,u,x,0,A);let _=0;for(let g=0;g<A;g++)_+=S[g];n.update(_,r,1)}function y(x,S,A,w){if(A===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<x.length;g++)m(x[g]/f,S[g],w[g]);else{_.multiDrawElementsInstancedWEBGL(r,S,0,u,x,0,w,0,A);let g=0;for(let U=0;U<A;U++)g+=S[U]*w[U];n.update(g,r,1)}}this.setMode=a,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=y}function hS(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,f,d){switch(n.calls++,f){case s.TRIANGLES:n.triangles+=d*(u/3);break;case s.LINES:n.lines+=d*(u/2);break;case s.LINE_STRIP:n.lines+=d*(u-1);break;case s.LINE_LOOP:n.lines+=d*u;break;case s.POINTS:n.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function pS(s,e,n){const r=new WeakMap,a=new Vt;function u(f,d,p){const m=f.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,y=v!==void 0?v.length:0;let x=r.get(d);if(x===void 0||x.count!==y){let T=function(){j.dispose(),r.delete(d),d.removeEventListener("dispose",T)};var S=T;x!==void 0&&x.texture.dispose();const A=d.morphAttributes.position!==void 0,w=d.morphAttributes.normal!==void 0,_=d.morphAttributes.color!==void 0,g=d.morphAttributes.position||[],U=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let R=0;A===!0&&(R=1),w===!0&&(R=2),_===!0&&(R=3);let X=d.attributes.position.count*R,N=1;X>e.maxTextureSize&&(N=Math.ceil(X/e.maxTextureSize),X=e.maxTextureSize);const F=new Float32Array(X*N*4*y),j=new jm(F,X,N,y);j.type=Hi,j.needsUpdate=!0;const b=R*4;for(let k=0;k<y;k++){const re=g[k],Q=U[k],fe=L[k],he=X*N*4*k;for(let oe=0;oe<re.count;oe++){const le=oe*b;A===!0&&(a.fromBufferAttribute(re,oe),F[he+le+0]=a.x,F[he+le+1]=a.y,F[he+le+2]=a.z,F[he+le+3]=0),w===!0&&(a.fromBufferAttribute(Q,oe),F[he+le+4]=a.x,F[he+le+5]=a.y,F[he+le+6]=a.z,F[he+le+7]=0),_===!0&&(a.fromBufferAttribute(fe,oe),F[he+le+8]=a.x,F[he+le+9]=a.y,F[he+le+10]=a.z,F[he+le+11]=fe.itemSize===4?a.w:1)}}x={count:y,texture:j,size:new at(X,N)},r.set(d,x),d.addEventListener("dispose",T)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(s,"morphTexture",f.morphTexture,n);else{let A=0;for(let _=0;_<m.length;_++)A+=m[_];const w=d.morphTargetsRelative?1:1-A;p.getUniforms().setValue(s,"morphTargetBaseInfluence",w),p.getUniforms().setValue(s,"morphTargetInfluences",m)}p.getUniforms().setValue(s,"morphTargetsTexture",x.texture,n),p.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:u}}function mS(s,e,n,r){let a=new WeakMap;function u(p){const m=r.render.frame,v=p.geometry,y=e.get(p,v);if(a.get(y)!==m&&(e.update(y),a.set(y,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),a.get(p)!==m&&(n.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,s.ARRAY_BUFFER),a.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return y}function f(){a=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:u,dispose:f}}class sg extends Ln{constructor(e,n,r,a,u,f,d,p,m,v=Ws){if(v!==Ws&&v!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&v===Ws&&(r=Qr),r===void 0&&v===$s&&(r=Ks),super(null,a,u,f,d,p,v,r,m),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=d!==void 0?d:hi,this.minFilter=p!==void 0?p:hi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const og=new Ln,om=new sg(1,1),ag=new jm,lg=new t0,ug=new tg,am=[],lm=[],um=new Float32Array(16),cm=new Float32Array(9),fm=new Float32Array(4);function eo(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let u=am[a];if(u===void 0&&(u=new Float32Array(a),am[a]=u),e!==0){r.toArray(u,0);for(let f=1,d=0;f!==e;++f)d+=n,s[f].toArray(u,d)}return u}function Zt(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function Qt(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function Ul(s,e){let n=lm[e];n===void 0&&(n=new Int32Array(e),lm[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function gS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function _S(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;s.uniform2fv(this.addr,e),Qt(n,e)}}function vS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Zt(n,e))return;s.uniform3fv(this.addr,e),Qt(n,e)}}function xS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;s.uniform4fv(this.addr,e),Qt(n,e)}}function yS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Zt(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),Qt(n,e)}else{if(Zt(n,r))return;fm.set(r),s.uniformMatrix2fv(this.addr,!1,fm),Qt(n,r)}}function SS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Zt(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),Qt(n,e)}else{if(Zt(n,r))return;cm.set(r),s.uniformMatrix3fv(this.addr,!1,cm),Qt(n,r)}}function MS(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Zt(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),Qt(n,e)}else{if(Zt(n,r))return;um.set(r),s.uniformMatrix4fv(this.addr,!1,um),Qt(n,r)}}function ES(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function TS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;s.uniform2iv(this.addr,e),Qt(n,e)}}function wS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;s.uniform3iv(this.addr,e),Qt(n,e)}}function AS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;s.uniform4iv(this.addr,e),Qt(n,e)}}function CS(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function RS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;s.uniform2uiv(this.addr,e),Qt(n,e)}}function bS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;s.uniform3uiv(this.addr,e),Qt(n,e)}}function PS(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;s.uniform4uiv(this.addr,e),Qt(n,e)}}function DS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let u;this.type===s.SAMPLER_2D_SHADOW?(om.compareFunction=Gm,u=om):u=og,n.setTexture2D(e||u,a)}function LS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||lg,a)}function IS(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||ug,a)}function US(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||ag,a)}function NS(s){switch(s){case 5126:return gS;case 35664:return _S;case 35665:return vS;case 35666:return xS;case 35674:return yS;case 35675:return SS;case 35676:return MS;case 5124:case 35670:return ES;case 35667:case 35671:return TS;case 35668:case 35672:return wS;case 35669:case 35673:return AS;case 5125:return CS;case 36294:return RS;case 36295:return bS;case 36296:return PS;case 35678:case 36198:case 36298:case 36306:case 35682:return DS;case 35679:case 36299:case 36307:return LS;case 35680:case 36300:case 36308:case 36293:return IS;case 36289:case 36303:case 36311:case 36292:return US}}function FS(s,e){s.uniform1fv(this.addr,e)}function OS(s,e){const n=eo(e,this.size,2);s.uniform2fv(this.addr,n)}function kS(s,e){const n=eo(e,this.size,3);s.uniform3fv(this.addr,n)}function zS(s,e){const n=eo(e,this.size,4);s.uniform4fv(this.addr,n)}function BS(s,e){const n=eo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function VS(s,e){const n=eo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function HS(s,e){const n=eo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function GS(s,e){s.uniform1iv(this.addr,e)}function WS(s,e){s.uniform2iv(this.addr,e)}function XS(s,e){s.uniform3iv(this.addr,e)}function jS(s,e){s.uniform4iv(this.addr,e)}function YS(s,e){s.uniform1uiv(this.addr,e)}function qS(s,e){s.uniform2uiv(this.addr,e)}function KS(s,e){s.uniform3uiv(this.addr,e)}function $S(s,e){s.uniform4uiv(this.addr,e)}function ZS(s,e,n){const r=this.cache,a=e.length,u=Ul(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTexture2D(e[f]||og,u[f])}function QS(s,e,n){const r=this.cache,a=e.length,u=Ul(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTexture3D(e[f]||lg,u[f])}function JS(s,e,n){const r=this.cache,a=e.length,u=Ul(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTextureCube(e[f]||ug,u[f])}function eM(s,e,n){const r=this.cache,a=e.length,u=Ul(n,a);Zt(r,u)||(s.uniform1iv(this.addr,u),Qt(r,u));for(let f=0;f!==a;++f)n.setTexture2DArray(e[f]||ag,u[f])}function tM(s){switch(s){case 5126:return FS;case 35664:return OS;case 35665:return kS;case 35666:return zS;case 35674:return BS;case 35675:return VS;case 35676:return HS;case 5124:case 35670:return GS;case 35667:case 35671:return WS;case 35668:case 35672:return XS;case 35669:case 35673:return jS;case 5125:return YS;case 36294:return qS;case 36295:return KS;case 36296:return $S;case 35678:case 36198:case 36298:case 36306:case 35682:return ZS;case 35679:case 36299:case 36307:return QS;case 35680:case 36300:case 36308:case 36293:return JS;case 36289:case 36303:case 36311:case 36292:return eM}}class nM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=NS(n.type)}}class iM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=tM(n.type)}}class rM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let u=0,f=a.length;u!==f;++u){const d=a[u];d.setValue(e,n[d.id],r)}}}const Xc=/(\w+)(\])?(\[|\.)?/g;function dm(s,e){s.seq.push(e),s.map[e.id]=e}function sM(s,e,n){const r=s.name,a=r.length;for(Xc.lastIndex=0;;){const u=Xc.exec(r),f=Xc.lastIndex;let d=u[1];const p=u[2]==="]",m=u[3];if(p&&(d=d|0),m===void 0||m==="["&&f+2===a){dm(n,m===void 0?new nM(d,s,e):new iM(d,s,e));break}else{let y=n.map[d];y===void 0&&(y=new rM(d),dm(n,y)),n=y}}}class Rl{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const u=e.getActiveUniform(n,a),f=e.getUniformLocation(n,u.name);sM(u,f,this)}}setValue(e,n,r,a){const u=this.map[n];u!==void 0&&u.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let u=0,f=n.length;u!==f;++u){const d=n[u],p=r[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,u=e.length;a!==u;++a){const f=e[a];f.id in n&&r.push(f)}return r}}function hm(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const oM=37297;let aM=0;function lM(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),u=Math.min(e+6,n.length);for(let f=a;f<u;f++){const d=f+1;r.push(`${d===e?">":" "} ${d}: ${n[f]}`)}return r.join(`
`)}const pm=new ot;function uM(s){xt._getMatrix(pm,xt.workingColorSpace,s);const e=`mat3( ${pm.elements.map(n=>n.toFixed(4))} )`;switch(xt.getTransfer(s)){case Ll:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function mm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const u=/ERROR: 0:(\d+)/.exec(a);if(u){const f=parseInt(u[1]);return n.toUpperCase()+`

`+a+`

`+lM(s.getShaderSource(e),f)}else return a}function cM(s,e){const n=uM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function fM(s,e){let n;switch(e){case Av:n="Linear";break;case Cv:n="Reinhard";break;case Rv:n="Cineon";break;case bv:n="ACESFilmic";break;case Dv:n="AgX";break;case Lv:n="Neutral";break;case Pv:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const xl=new Z;function dM(){xt.getLuminanceCoefficients(xl);const s=xl.x.toFixed(4),e=xl.y.toFixed(4),n=xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function pM(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function mM(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const u=s.getActiveAttrib(e,a),f=u.name;let d=1;u.type===s.FLOAT_MAT2&&(d=2),u.type===s.FLOAT_MAT3&&(d=3),u.type===s.FLOAT_MAT4&&(d=4),n[f]={type:u.type,location:s.getAttribLocation(e,f),locationSize:d}}return n}function Bo(s){return s!==""}function gm(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _m(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Of(s){return s.replace(gM,vM)}const _M=new Map;function vM(s,e){let n=lt[e];if(n===void 0){const r=_M.get(e);if(r!==void 0)n=lt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Of(n)}const xM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vm(s){return s.replace(xM,yM)}function yM(s,e,n,r){let a="";for(let u=parseInt(e);u<parseInt(n);u++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return a}function xm(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function SM(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Pm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===sv?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Bi&&(e="SHADOWMAP_TYPE_VSM"),e}function MM(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ys:case qs:e="ENVMAP_TYPE_CUBE";break;case Dl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function EM(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function TM(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Dm:e="ENVMAP_BLENDING_MULTIPLY";break;case Tv:e="ENVMAP_BLENDING_MIX";break;case wv:e="ENVMAP_BLENDING_ADD";break}return e}function wM(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function AM(s,e,n,r){const a=s.getContext(),u=n.defines;let f=n.vertexShader,d=n.fragmentShader;const p=SM(n),m=MM(n),v=EM(n),y=TM(n),x=wM(n),S=hM(n),A=pM(u),w=a.createProgram();let _,g,U=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,A].filter(Bo).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,A].filter(Bo).join(`
`),g.length>0&&(g+=`
`)):(_=[xm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,A,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),g=[xm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,A,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+v:"",n.envMap?"#define "+y:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Er?"#define TONE_MAPPING":"",n.toneMapping!==Er?lt.tonemapping_pars_fragment:"",n.toneMapping!==Er?fM("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,cM("linearToOutputTexel",n.outputColorSpace),dM(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Bo).join(`
`)),f=Of(f),f=gm(f,n),f=_m(f,n),d=Of(d),d=gm(d,n),d=_m(d,n),f=vm(f),d=vm(d),n.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,_=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",n.glslVersion===Lp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Lp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const L=U+_+f,R=U+g+d,X=hm(a,a.VERTEX_SHADER,L),N=hm(a,a.FRAGMENT_SHADER,R);a.attachShader(w,X),a.attachShader(w,N),n.index0AttributeName!==void 0?a.bindAttribLocation(w,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function F(k){if(s.debug.checkShaderErrors){const re=a.getProgramInfoLog(w).trim(),Q=a.getShaderInfoLog(X).trim(),fe=a.getShaderInfoLog(N).trim();let he=!0,oe=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(he=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,w,X,N);else{const le=mm(a,X,"vertex"),z=mm(a,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+re+`
`+le+`
`+z)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(Q===""||fe==="")&&(oe=!1);oe&&(k.diagnostics={runnable:he,programLog:re,vertexShader:{log:Q,prefix:_},fragmentShader:{log:fe,prefix:g}})}a.deleteShader(X),a.deleteShader(N),j=new Rl(a,w),b=mM(a,w)}let j;this.getUniforms=function(){return j===void 0&&F(this),j};let b;this.getAttributes=function(){return b===void 0&&F(this),b};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=a.getProgramParameter(w,oM)),T},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=aM++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=X,this.fragmentShader=N,this}let CM=0;class RM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),u=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(u)===!1&&(f.add(u),u.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new bM(e),n.set(e,r)),r}}class bM{constructor(e){this.id=CM++,this.code=e,this.usedTimes=0}}function PM(s,e,n,r,a,u,f){const d=new qm,p=new RM,m=new Set,v=[],y=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(b){return m.add(b),b===0?"uv":`uv${b}`}function _(b,T,k,re,Q){const fe=re.fog,he=Q.geometry,oe=b.isMeshStandardMaterial?re.environment:null,le=(b.isMeshStandardMaterial?n:e).get(b.envMap||oe),z=le&&le.mapping===Dl?le.image.height:null,ae=A[b.type];b.precision!==null&&(S=a.getMaxPrecision(b.precision),S!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",S,"instead."));const se=he.morphAttributes.position||he.morphAttributes.normal||he.morphAttributes.color,I=se!==void 0?se.length:0;let ne=0;he.morphAttributes.position!==void 0&&(ne=1),he.morphAttributes.normal!==void 0&&(ne=2),he.morphAttributes.color!==void 0&&(ne=3);let Ie,$,ue,Me;if(ae){const _t=Si[ae];Ie=_t.vertexShader,$=_t.fragmentShader}else Ie=b.vertexShader,$=b.fragmentShader,p.update(b),ue=p.getVertexShaderID(b),Me=p.getFragmentShaderID(b);const ve=s.getRenderTarget(),Ae=s.state.buffers.depth.getReversed(),Ue=Q.isInstancedMesh===!0,Ze=Q.isBatchedMesh===!0,At=!!b.map,pt=!!b.matcap,Dt=!!le,W=!!b.aoMap,pn=!!b.lightMap,ht=!!b.bumpMap,ct=!!b.normalMap,qe=!!b.displacementMap,Tt=!!b.emissiveMap,Ye=!!b.metalnessMap,P=!!b.roughnessMap,E=b.anisotropy>0,K=b.clearcoat>0,pe=b.dispersion>0,ge=b.iridescence>0,ce=b.sheen>0,He=b.transmission>0,Ce=E&&!!b.anisotropyMap,Ne=K&&!!b.clearcoatMap,ut=K&&!!b.clearcoatNormalMap,ye=K&&!!b.clearcoatRoughnessMap,Oe=ge&&!!b.iridescenceMap,Qe=ge&&!!b.iridescenceThicknessMap,Je=ce&&!!b.sheenColorMap,ke=ce&&!!b.sheenRoughnessMap,ft=!!b.specularMap,it=!!b.specularColorMap,Et=!!b.specularIntensityMap,V=He&&!!b.transmissionMap,Re=He&&!!b.thicknessMap,ie=!!b.gradientMap,de=!!b.alphaMap,De=b.alphaTest>0,Pe=!!b.alphaHash,rt=!!b.extensions;let It=Er;b.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(It=s.toneMapping);const jt={shaderID:ae,shaderType:b.type,shaderName:b.name,vertexShader:Ie,fragmentShader:$,defines:b.defines,customVertexShaderID:ue,customFragmentShaderID:Me,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:S,batching:Ze,batchingColor:Ze&&Q._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&Q.instanceColor!==null,instancingMorph:Ue&&Q.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ve===null?s.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Js,alphaToCoverage:!!b.alphaToCoverage,map:At,matcap:pt,envMap:Dt,envMapMode:Dt&&le.mapping,envMapCubeUVHeight:z,aoMap:W,lightMap:pn,bumpMap:ht,normalMap:ct,displacementMap:x&&qe,emissiveMap:Tt,normalMapObjectSpace:ct&&b.normalMapType===Ov,normalMapTangentSpace:ct&&b.normalMapType===Fv,metalnessMap:Ye,roughnessMap:P,anisotropy:E,anisotropyMap:Ce,clearcoat:K,clearcoatMap:Ne,clearcoatNormalMap:ut,clearcoatRoughnessMap:ye,dispersion:pe,iridescence:ge,iridescenceMap:Oe,iridescenceThicknessMap:Qe,sheen:ce,sheenColorMap:Je,sheenRoughnessMap:ke,specularMap:ft,specularColorMap:it,specularIntensityMap:Et,transmission:He,transmissionMap:V,thicknessMap:Re,gradientMap:ie,opaque:b.transparent===!1&&b.blending===Gs&&b.alphaToCoverage===!1,alphaMap:de,alphaTest:De,alphaHash:Pe,combine:b.combine,mapUv:At&&w(b.map.channel),aoMapUv:W&&w(b.aoMap.channel),lightMapUv:pn&&w(b.lightMap.channel),bumpMapUv:ht&&w(b.bumpMap.channel),normalMapUv:ct&&w(b.normalMap.channel),displacementMapUv:qe&&w(b.displacementMap.channel),emissiveMapUv:Tt&&w(b.emissiveMap.channel),metalnessMapUv:Ye&&w(b.metalnessMap.channel),roughnessMapUv:P&&w(b.roughnessMap.channel),anisotropyMapUv:Ce&&w(b.anisotropyMap.channel),clearcoatMapUv:Ne&&w(b.clearcoatMap.channel),clearcoatNormalMapUv:ut&&w(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&w(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&w(b.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&w(b.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&w(b.sheenColorMap.channel),sheenRoughnessMapUv:ke&&w(b.sheenRoughnessMap.channel),specularMapUv:ft&&w(b.specularMap.channel),specularColorMapUv:it&&w(b.specularColorMap.channel),specularIntensityMapUv:Et&&w(b.specularIntensityMap.channel),transmissionMapUv:V&&w(b.transmissionMap.channel),thicknessMapUv:Re&&w(b.thicknessMap.channel),alphaMapUv:de&&w(b.alphaMap.channel),vertexTangents:!!he.attributes.tangent&&(ct||E),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!he.attributes.color&&he.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!he.attributes.uv&&(At||de),fog:!!fe,useFog:b.fog===!0,fogExp2:!!fe&&fe.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:y,reverseDepthBuffer:Ae,skinning:Q.isSkinnedMesh===!0,morphTargets:he.morphAttributes.position!==void 0,morphNormals:he.morphAttributes.normal!==void 0,morphColors:he.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:ne,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&k.length>0,shadowMapType:s.shadowMap.type,toneMapping:It,decodeVideoTexture:At&&b.map.isVideoTexture===!0&&xt.getTransfer(b.map.colorSpace)===Ct,decodeVideoTextureEmissive:Tt&&b.emissiveMap.isVideoTexture===!0&&xt.getTransfer(b.emissiveMap.colorSpace)===Ct,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vi,flipSided:b.side===Dn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:rt&&b.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&b.extensions.multiDraw===!0||Ze)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return jt.vertexUv1s=m.has(1),jt.vertexUv2s=m.has(2),jt.vertexUv3s=m.has(3),m.clear(),jt}function g(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const k in b.defines)T.push(k),T.push(b.defines[k]);return b.isRawShaderMaterial===!1&&(U(T,b),L(T,b),T.push(s.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function U(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function L(b,T){d.disableAll(),T.supportsVertexTextures&&d.enable(0),T.instancing&&d.enable(1),T.instancingColor&&d.enable(2),T.instancingMorph&&d.enable(3),T.matcap&&d.enable(4),T.envMap&&d.enable(5),T.normalMapObjectSpace&&d.enable(6),T.normalMapTangentSpace&&d.enable(7),T.clearcoat&&d.enable(8),T.iridescence&&d.enable(9),T.alphaTest&&d.enable(10),T.vertexColors&&d.enable(11),T.vertexAlphas&&d.enable(12),T.vertexUv1s&&d.enable(13),T.vertexUv2s&&d.enable(14),T.vertexUv3s&&d.enable(15),T.vertexTangents&&d.enable(16),T.anisotropy&&d.enable(17),T.alphaHash&&d.enable(18),T.batching&&d.enable(19),T.dispersion&&d.enable(20),T.batchingColor&&d.enable(21),b.push(d.mask),d.disableAll(),T.fog&&d.enable(0),T.useFog&&d.enable(1),T.flatShading&&d.enable(2),T.logarithmicDepthBuffer&&d.enable(3),T.reverseDepthBuffer&&d.enable(4),T.skinning&&d.enable(5),T.morphTargets&&d.enable(6),T.morphNormals&&d.enable(7),T.morphColors&&d.enable(8),T.premultipliedAlpha&&d.enable(9),T.shadowMapEnabled&&d.enable(10),T.doubleSided&&d.enable(11),T.flipSided&&d.enable(12),T.useDepthPacking&&d.enable(13),T.dithering&&d.enable(14),T.transmission&&d.enable(15),T.sheen&&d.enable(16),T.opaque&&d.enable(17),T.pointsUvs&&d.enable(18),T.decodeVideoTexture&&d.enable(19),T.decodeVideoTextureEmissive&&d.enable(20),T.alphaToCoverage&&d.enable(21),b.push(d.mask)}function R(b){const T=A[b.type];let k;if(T){const re=Si[T];k=h0.clone(re.uniforms)}else k=b.uniforms;return k}function X(b,T){let k;for(let re=0,Q=v.length;re<Q;re++){const fe=v[re];if(fe.cacheKey===T){k=fe,++k.usedTimes;break}}return k===void 0&&(k=new AM(s,T,b,u),v.push(k)),k}function N(b){if(--b.usedTimes===0){const T=v.indexOf(b);v[T]=v[v.length-1],v.pop(),b.destroy()}}function F(b){p.remove(b)}function j(){p.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:R,acquireProgram:X,releaseProgram:N,releaseShaderCache:F,programs:v,dispose:j}}function DM(){let s=new WeakMap;function e(f){return s.has(f)}function n(f){let d=s.get(f);return d===void 0&&(d={},s.set(f,d)),d}function r(f){s.delete(f)}function a(f,d,p){s.get(f)[d]=p}function u(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:u}}function LM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function ym(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Sm(){const s=[];let e=0;const n=[],r=[],a=[];function u(){e=0,n.length=0,r.length=0,a.length=0}function f(y,x,S,A,w,_){let g=s[e];return g===void 0?(g={id:y.id,object:y,geometry:x,material:S,groupOrder:A,renderOrder:y.renderOrder,z:w,group:_},s[e]=g):(g.id=y.id,g.object=y,g.geometry=x,g.material=S,g.groupOrder=A,g.renderOrder=y.renderOrder,g.z=w,g.group=_),e++,g}function d(y,x,S,A,w,_){const g=f(y,x,S,A,w,_);S.transmission>0?r.push(g):S.transparent===!0?a.push(g):n.push(g)}function p(y,x,S,A,w,_){const g=f(y,x,S,A,w,_);S.transmission>0?r.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function m(y,x){n.length>1&&n.sort(y||LM),r.length>1&&r.sort(x||ym),a.length>1&&a.sort(x||ym)}function v(){for(let y=e,x=s.length;y<x;y++){const S=s[y];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:u,push:d,unshift:p,finish:v,sort:m}}function IM(){let s=new WeakMap;function e(r,a){const u=s.get(r);let f;return u===void 0?(f=new Sm,s.set(r,[f])):a>=u.length?(f=new Sm,u.push(f)):f=u[a],f}function n(){s=new WeakMap}return{get:e,dispose:n}}function UM(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new Z,color:new bt};break;case"SpotLight":n={position:new Z,direction:new Z,color:new bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Z,color:new bt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Z,skyColor:new bt,groundColor:new bt};break;case"RectAreaLight":n={color:new bt,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return s[e.id]=n,n}}}function NM(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let FM=0;function OM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function kM(s){const e=new UM,n=NM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new Z);const a=new Z,u=new Ht,f=new Ht;function d(m){let v=0,y=0,x=0;for(let b=0;b<9;b++)r.probe[b].set(0,0,0);let S=0,A=0,w=0,_=0,g=0,U=0,L=0,R=0,X=0,N=0,F=0;m.sort(OM);for(let b=0,T=m.length;b<T;b++){const k=m[b],re=k.color,Q=k.intensity,fe=k.distance,he=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)v+=re.r*Q,y+=re.g*Q,x+=re.b*Q;else if(k.isLightProbe){for(let oe=0;oe<9;oe++)r.probe[oe].addScaledVector(k.sh.coefficients[oe],Q);F++}else if(k.isDirectionalLight){const oe=e.get(k);if(oe.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const le=k.shadow,z=n.get(k);z.shadowIntensity=le.intensity,z.shadowBias=le.bias,z.shadowNormalBias=le.normalBias,z.shadowRadius=le.radius,z.shadowMapSize=le.mapSize,r.directionalShadow[S]=z,r.directionalShadowMap[S]=he,r.directionalShadowMatrix[S]=k.shadow.matrix,U++}r.directional[S]=oe,S++}else if(k.isSpotLight){const oe=e.get(k);oe.position.setFromMatrixPosition(k.matrixWorld),oe.color.copy(re).multiplyScalar(Q),oe.distance=fe,oe.coneCos=Math.cos(k.angle),oe.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),oe.decay=k.decay,r.spot[w]=oe;const le=k.shadow;if(k.map&&(r.spotLightMap[X]=k.map,X++,le.updateMatrices(k),k.castShadow&&N++),r.spotLightMatrix[w]=le.matrix,k.castShadow){const z=n.get(k);z.shadowIntensity=le.intensity,z.shadowBias=le.bias,z.shadowNormalBias=le.normalBias,z.shadowRadius=le.radius,z.shadowMapSize=le.mapSize,r.spotShadow[w]=z,r.spotShadowMap[w]=he,R++}w++}else if(k.isRectAreaLight){const oe=e.get(k);oe.color.copy(re).multiplyScalar(Q),oe.halfWidth.set(k.width*.5,0,0),oe.halfHeight.set(0,k.height*.5,0),r.rectArea[_]=oe,_++}else if(k.isPointLight){const oe=e.get(k);if(oe.color.copy(k.color).multiplyScalar(k.intensity),oe.distance=k.distance,oe.decay=k.decay,k.castShadow){const le=k.shadow,z=n.get(k);z.shadowIntensity=le.intensity,z.shadowBias=le.bias,z.shadowNormalBias=le.normalBias,z.shadowRadius=le.radius,z.shadowMapSize=le.mapSize,z.shadowCameraNear=le.camera.near,z.shadowCameraFar=le.camera.far,r.pointShadow[A]=z,r.pointShadowMap[A]=he,r.pointShadowMatrix[A]=k.shadow.matrix,L++}r.point[A]=oe,A++}else if(k.isHemisphereLight){const oe=e.get(k);oe.skyColor.copy(k.color).multiplyScalar(Q),oe.groundColor.copy(k.groundColor).multiplyScalar(Q),r.hemi[g]=oe,g++}}_>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=be.LTC_FLOAT_1,r.rectAreaLTC2=be.LTC_FLOAT_2):(r.rectAreaLTC1=be.LTC_HALF_1,r.rectAreaLTC2=be.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=y,r.ambient[2]=x;const j=r.hash;(j.directionalLength!==S||j.pointLength!==A||j.spotLength!==w||j.rectAreaLength!==_||j.hemiLength!==g||j.numDirectionalShadows!==U||j.numPointShadows!==L||j.numSpotShadows!==R||j.numSpotMaps!==X||j.numLightProbes!==F)&&(r.directional.length=S,r.spot.length=w,r.rectArea.length=_,r.point.length=A,r.hemi.length=g,r.directionalShadow.length=U,r.directionalShadowMap.length=U,r.pointShadow.length=L,r.pointShadowMap.length=L,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=U,r.pointShadowMatrix.length=L,r.spotLightMatrix.length=R+X-N,r.spotLightMap.length=X,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=F,j.directionalLength=S,j.pointLength=A,j.spotLength=w,j.rectAreaLength=_,j.hemiLength=g,j.numDirectionalShadows=U,j.numPointShadows=L,j.numSpotShadows=R,j.numSpotMaps=X,j.numLightProbes=F,r.version=FM++)}function p(m,v){let y=0,x=0,S=0,A=0,w=0;const _=v.matrixWorldInverse;for(let g=0,U=m.length;g<U;g++){const L=m[g];if(L.isDirectionalLight){const R=r.directional[y];R.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(_),y++}else if(L.isSpotLight){const R=r.spot[S];R.position.setFromMatrixPosition(L.matrixWorld),R.position.applyMatrix4(_),R.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(_),S++}else if(L.isRectAreaLight){const R=r.rectArea[A];R.position.setFromMatrixPosition(L.matrixWorld),R.position.applyMatrix4(_),f.identity(),u.copy(L.matrixWorld),u.premultiply(_),f.extractRotation(u),R.halfWidth.set(L.width*.5,0,0),R.halfHeight.set(0,L.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),A++}else if(L.isPointLight){const R=r.point[x];R.position.setFromMatrixPosition(L.matrixWorld),R.position.applyMatrix4(_),x++}else if(L.isHemisphereLight){const R=r.hemi[w];R.direction.setFromMatrixPosition(L.matrixWorld),R.direction.transformDirection(_),w++}}}return{setup:d,setupView:p,state:r}}function Mm(s){const e=new kM(s),n=[],r=[];function a(v){m.camera=v,n.length=0,r.length=0}function u(v){n.push(v)}function f(v){r.push(v)}function d(){e.setup(n)}function p(v){e.setupView(n,v)}const m={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:d,setupLightsView:p,pushLight:u,pushShadow:f}}function zM(s){let e=new WeakMap;function n(a,u=0){const f=e.get(a);let d;return f===void 0?(d=new Mm(s),e.set(a,[d])):u>=f.length?(d=new Mm(s),f.push(d)):d=f[u],d}function r(){e=new WeakMap}return{get:n,dispose:r}}class BM extends Il{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Uv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class VM extends Il{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const HM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GM=`uniform sampler2D shadow_pass;
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
}`;function WM(s,e,n){let r=new ng;const a=new at,u=new at,f=new Vt,d=new BM({depthPacking:Nv}),p=new VM,m={},v=n.maxTextureSize,y={[Tr]:Dn,[Dn]:Tr,[Vi]:Vi},x=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:HM,fragmentShader:GM}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const A=new ts;A.setAttribute("position",new Ei(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Jn(A,x),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pm;let g=this.type;this.render=function(N,F,j){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||N.length===0)return;const b=s.getRenderTarget(),T=s.getActiveCubeFace(),k=s.getActiveMipmapLevel(),re=s.state;re.setBlending(Mr),re.buffers.color.setClear(1,1,1,1),re.buffers.depth.setTest(!0),re.setScissorTest(!1);const Q=g!==Bi&&this.type===Bi,fe=g===Bi&&this.type!==Bi;for(let he=0,oe=N.length;he<oe;he++){const le=N[he],z=le.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;a.copy(z.mapSize);const ae=z.getFrameExtents();if(a.multiply(ae),u.copy(z.mapSize),(a.x>v||a.y>v)&&(a.x>v&&(u.x=Math.floor(v/ae.x),a.x=u.x*ae.x,z.mapSize.x=u.x),a.y>v&&(u.y=Math.floor(v/ae.y),a.y=u.y*ae.y,z.mapSize.y=u.y)),z.map===null||Q===!0||fe===!0){const I=this.type!==Bi?{minFilter:hi,magFilter:hi}:{};z.map!==null&&z.map.dispose(),z.map=new Mi(a.x,a.y,I),z.map.texture.name=le.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const se=z.getViewportCount();for(let I=0;I<se;I++){const ne=z.getViewport(I);f.set(u.x*ne.x,u.y*ne.y,u.x*ne.z,u.y*ne.w),re.viewport(f),z.updateMatrices(le,I),r=z.getFrustum(),R(F,j,z.camera,le,this.type)}z.isPointLightShadow!==!0&&this.type===Bi&&U(z,j),z.needsUpdate=!1}g=this.type,_.needsUpdate=!1,s.setRenderTarget(b,T,k)};function U(N,F){const j=e.update(w);x.defines.VSM_SAMPLES!==N.blurSamples&&(x.defines.VSM_SAMPLES=N.blurSamples,S.defines.VSM_SAMPLES=N.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new Mi(a.x,a.y)),x.uniforms.shadow_pass.value=N.map.texture,x.uniforms.resolution.value=N.mapSize,x.uniforms.radius.value=N.radius,s.setRenderTarget(N.mapPass),s.clear(),s.renderBufferDirect(F,null,j,x,w,null),S.uniforms.shadow_pass.value=N.mapPass.texture,S.uniforms.resolution.value=N.mapSize,S.uniforms.radius.value=N.radius,s.setRenderTarget(N.map),s.clear(),s.renderBufferDirect(F,null,j,S,w,null)}function L(N,F,j,b){let T=null;const k=j.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(k!==void 0)T=k;else if(T=j.isPointLight===!0?p:d,s.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0){const re=T.uuid,Q=F.uuid;let fe=m[re];fe===void 0&&(fe={},m[re]=fe);let he=fe[Q];he===void 0&&(he=T.clone(),fe[Q]=he,F.addEventListener("dispose",X)),T=he}if(T.visible=F.visible,T.wireframe=F.wireframe,b===Bi?T.side=F.shadowSide!==null?F.shadowSide:F.side:T.side=F.shadowSide!==null?F.shadowSide:y[F.side],T.alphaMap=F.alphaMap,T.alphaTest=F.alphaTest,T.map=F.map,T.clipShadows=F.clipShadows,T.clippingPlanes=F.clippingPlanes,T.clipIntersection=F.clipIntersection,T.displacementMap=F.displacementMap,T.displacementScale=F.displacementScale,T.displacementBias=F.displacementBias,T.wireframeLinewidth=F.wireframeLinewidth,T.linewidth=F.linewidth,j.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const re=s.properties.get(T);re.light=j}return T}function R(N,F,j,b,T){if(N.visible===!1)return;if(N.layers.test(F.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&T===Bi)&&(!N.frustumCulled||r.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,N.matrixWorld);const Q=e.update(N),fe=N.material;if(Array.isArray(fe)){const he=Q.groups;for(let oe=0,le=he.length;oe<le;oe++){const z=he[oe],ae=fe[z.materialIndex];if(ae&&ae.visible){const se=L(N,ae,b,T);N.onBeforeShadow(s,N,F,j,Q,se,z),s.renderBufferDirect(j,null,Q,se,N,z),N.onAfterShadow(s,N,F,j,Q,se,z)}}}else if(fe.visible){const he=L(N,fe,b,T);N.onBeforeShadow(s,N,F,j,Q,he,null),s.renderBufferDirect(j,null,Q,he,N,null),N.onAfterShadow(s,N,F,j,Q,he,null)}}const re=N.children;for(let Q=0,fe=re.length;Q<fe;Q++)R(re[Q],F,j,b,T)}function X(N){N.target.removeEventListener("dispose",X);for(const j in m){const b=m[j],T=N.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const XM={[Qc]:Jc,[ef]:rf,[tf]:sf,[js]:nf,[Jc]:Qc,[rf]:ef,[sf]:tf,[nf]:js};function jM(s,e){function n(){let V=!1;const Re=new Vt;let ie=null;const de=new Vt(0,0,0,0);return{setMask:function(De){ie!==De&&!V&&(s.colorMask(De,De,De,De),ie=De)},setLocked:function(De){V=De},setClear:function(De,Pe,rt,It,jt){jt===!0&&(De*=It,Pe*=It,rt*=It),Re.set(De,Pe,rt,It),de.equals(Re)===!1&&(s.clearColor(De,Pe,rt,It),de.copy(Re))},reset:function(){V=!1,ie=null,de.set(-1,0,0,0)}}}function r(){let V=!1,Re=!1,ie=null,de=null,De=null;return{setReversed:function(Pe){if(Re!==Pe){const rt=e.get("EXT_clip_control");Re?rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.ZERO_TO_ONE_EXT):rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.NEGATIVE_ONE_TO_ONE_EXT);const It=De;De=null,this.setClear(It)}Re=Pe},getReversed:function(){return Re},setTest:function(Pe){Pe?ve(s.DEPTH_TEST):Ae(s.DEPTH_TEST)},setMask:function(Pe){ie!==Pe&&!V&&(s.depthMask(Pe),ie=Pe)},setFunc:function(Pe){if(Re&&(Pe=XM[Pe]),de!==Pe){switch(Pe){case Qc:s.depthFunc(s.NEVER);break;case Jc:s.depthFunc(s.ALWAYS);break;case ef:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case tf:s.depthFunc(s.EQUAL);break;case nf:s.depthFunc(s.GEQUAL);break;case rf:s.depthFunc(s.GREATER);break;case sf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}de=Pe}},setLocked:function(Pe){V=Pe},setClear:function(Pe){De!==Pe&&(Re&&(Pe=1-Pe),s.clearDepth(Pe),De=Pe)},reset:function(){V=!1,ie=null,de=null,De=null,Re=!1}}}function a(){let V=!1,Re=null,ie=null,de=null,De=null,Pe=null,rt=null,It=null,jt=null;return{setTest:function(_t){V||(_t?ve(s.STENCIL_TEST):Ae(s.STENCIL_TEST))},setMask:function(_t){Re!==_t&&!V&&(s.stencilMask(_t),Re=_t)},setFunc:function(_t,Sn,mn){(ie!==_t||de!==Sn||De!==mn)&&(s.stencilFunc(_t,Sn,mn),ie=_t,de=Sn,De=mn)},setOp:function(_t,Sn,mn){(Pe!==_t||rt!==Sn||It!==mn)&&(s.stencilOp(_t,Sn,mn),Pe=_t,rt=Sn,It=mn)},setLocked:function(_t){V=_t},setClear:function(_t){jt!==_t&&(s.clearStencil(_t),jt=_t)},reset:function(){V=!1,Re=null,ie=null,de=null,De=null,Pe=null,rt=null,It=null,jt=null}}}const u=new n,f=new r,d=new a,p=new WeakMap,m=new WeakMap;let v={},y={},x=new WeakMap,S=[],A=null,w=!1,_=null,g=null,U=null,L=null,R=null,X=null,N=null,F=new bt(0,0,0),j=0,b=!1,T=null,k=null,re=null,Q=null,fe=null;const he=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let oe=!1,le=0;const z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(z)[1]),oe=le>=1):z.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),oe=le>=2);let ae=null,se={};const I=s.getParameter(s.SCISSOR_BOX),ne=s.getParameter(s.VIEWPORT),Ie=new Vt().fromArray(I),$=new Vt().fromArray(ne);function ue(V,Re,ie,de){const De=new Uint8Array(4),Pe=s.createTexture();s.bindTexture(V,Pe),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let rt=0;rt<ie;rt++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(Re,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(Re+rt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return Pe}const Me={};Me[s.TEXTURE_2D]=ue(s.TEXTURE_2D,s.TEXTURE_2D,1),Me[s.TEXTURE_CUBE_MAP]=ue(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[s.TEXTURE_2D_ARRAY]=ue(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Me[s.TEXTURE_3D]=ue(s.TEXTURE_3D,s.TEXTURE_3D,1,1),u.setClear(0,0,0,1),f.setClear(1),d.setClear(0),ve(s.DEPTH_TEST),f.setFunc(js),ht(!1),ct(Ap),ve(s.CULL_FACE),W(Mr);function ve(V){v[V]!==!0&&(s.enable(V),v[V]=!0)}function Ae(V){v[V]!==!1&&(s.disable(V),v[V]=!1)}function Ue(V,Re){return y[V]!==Re?(s.bindFramebuffer(V,Re),y[V]=Re,V===s.DRAW_FRAMEBUFFER&&(y[s.FRAMEBUFFER]=Re),V===s.FRAMEBUFFER&&(y[s.DRAW_FRAMEBUFFER]=Re),!0):!1}function Ze(V,Re){let ie=S,de=!1;if(V){ie=x.get(Re),ie===void 0&&(ie=[],x.set(Re,ie));const De=V.textures;if(ie.length!==De.length||ie[0]!==s.COLOR_ATTACHMENT0){for(let Pe=0,rt=De.length;Pe<rt;Pe++)ie[Pe]=s.COLOR_ATTACHMENT0+Pe;ie.length=De.length,de=!0}}else ie[0]!==s.BACK&&(ie[0]=s.BACK,de=!0);de&&s.drawBuffers(ie)}function At(V){return A!==V?(s.useProgram(V),A=V,!0):!1}const pt={[Yr]:s.FUNC_ADD,[av]:s.FUNC_SUBTRACT,[lv]:s.FUNC_REVERSE_SUBTRACT};pt[uv]=s.MIN,pt[cv]=s.MAX;const Dt={[fv]:s.ZERO,[dv]:s.ONE,[hv]:s.SRC_COLOR,[$c]:s.SRC_ALPHA,[xv]:s.SRC_ALPHA_SATURATE,[_v]:s.DST_COLOR,[mv]:s.DST_ALPHA,[pv]:s.ONE_MINUS_SRC_COLOR,[Zc]:s.ONE_MINUS_SRC_ALPHA,[vv]:s.ONE_MINUS_DST_COLOR,[gv]:s.ONE_MINUS_DST_ALPHA,[yv]:s.CONSTANT_COLOR,[Sv]:s.ONE_MINUS_CONSTANT_COLOR,[Mv]:s.CONSTANT_ALPHA,[Ev]:s.ONE_MINUS_CONSTANT_ALPHA};function W(V,Re,ie,de,De,Pe,rt,It,jt,_t){if(V===Mr){w===!0&&(Ae(s.BLEND),w=!1);return}if(w===!1&&(ve(s.BLEND),w=!0),V!==ov){if(V!==_||_t!==b){if((g!==Yr||R!==Yr)&&(s.blendEquation(s.FUNC_ADD),g=Yr,R=Yr),_t)switch(V){case Gs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Cp:s.blendFunc(s.ONE,s.ONE);break;case Rp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Gs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Cp:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Rp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}U=null,L=null,X=null,N=null,F.set(0,0,0),j=0,_=V,b=_t}return}De=De||Re,Pe=Pe||ie,rt=rt||de,(Re!==g||De!==R)&&(s.blendEquationSeparate(pt[Re],pt[De]),g=Re,R=De),(ie!==U||de!==L||Pe!==X||rt!==N)&&(s.blendFuncSeparate(Dt[ie],Dt[de],Dt[Pe],Dt[rt]),U=ie,L=de,X=Pe,N=rt),(It.equals(F)===!1||jt!==j)&&(s.blendColor(It.r,It.g,It.b,jt),F.copy(It),j=jt),_=V,b=!1}function pn(V,Re){V.side===Vi?Ae(s.CULL_FACE):ve(s.CULL_FACE);let ie=V.side===Dn;Re&&(ie=!ie),ht(ie),V.blending===Gs&&V.transparent===!1?W(Mr):W(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),u.setMask(V.colorWrite);const de=V.stencilWrite;d.setTest(de),de&&(d.setMask(V.stencilWriteMask),d.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),d.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Tt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ve(s.SAMPLE_ALPHA_TO_COVERAGE):Ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function ht(V){T!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),T=V)}function ct(V){V!==iv?(ve(s.CULL_FACE),V!==k&&(V===Ap?s.cullFace(s.BACK):V===rv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ae(s.CULL_FACE),k=V}function qe(V){V!==re&&(oe&&s.lineWidth(V),re=V)}function Tt(V,Re,ie){V?(ve(s.POLYGON_OFFSET_FILL),(Q!==Re||fe!==ie)&&(s.polygonOffset(Re,ie),Q=Re,fe=ie)):Ae(s.POLYGON_OFFSET_FILL)}function Ye(V){V?ve(s.SCISSOR_TEST):Ae(s.SCISSOR_TEST)}function P(V){V===void 0&&(V=s.TEXTURE0+he-1),ae!==V&&(s.activeTexture(V),ae=V)}function E(V,Re,ie){ie===void 0&&(ae===null?ie=s.TEXTURE0+he-1:ie=ae);let de=se[ie];de===void 0&&(de={type:void 0,texture:void 0},se[ie]=de),(de.type!==V||de.texture!==Re)&&(ae!==ie&&(s.activeTexture(ie),ae=ie),s.bindTexture(V,Re||Me[V]),de.type=V,de.texture=Re)}function K(){const V=se[ae];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function pe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ge(){try{s.compressedTexImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ce(){try{s.texSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function He(){try{s.texSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ne(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ut(){try{s.texStorage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ye(){try{s.texStorage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(){try{s.texImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Qe(){try{s.texImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Je(V){Ie.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),Ie.copy(V))}function ke(V){$.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),$.copy(V))}function ft(V,Re){let ie=m.get(Re);ie===void 0&&(ie=new WeakMap,m.set(Re,ie));let de=ie.get(V);de===void 0&&(de=s.getUniformBlockIndex(Re,V.name),ie.set(V,de))}function it(V,Re){const de=m.get(Re).get(V);p.get(Re)!==de&&(s.uniformBlockBinding(Re,de,V.__bindingPointIndex),p.set(Re,de))}function Et(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),f.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),v={},ae=null,se={},y={},x=new WeakMap,S=[],A=null,w=!1,_=null,g=null,U=null,L=null,R=null,X=null,N=null,F=new bt(0,0,0),j=0,b=!1,T=null,k=null,re=null,Q=null,fe=null,Ie.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),u.reset(),f.reset(),d.reset()}return{buffers:{color:u,depth:f,stencil:d},enable:ve,disable:Ae,bindFramebuffer:Ue,drawBuffers:Ze,useProgram:At,setBlending:W,setMaterial:pn,setFlipSided:ht,setCullFace:ct,setLineWidth:qe,setPolygonOffset:Tt,setScissorTest:Ye,activeTexture:P,bindTexture:E,unbindTexture:K,compressedTexImage2D:pe,compressedTexImage3D:ge,texImage2D:Oe,texImage3D:Qe,updateUBOMapping:ft,uniformBlockBinding:it,texStorage2D:ut,texStorage3D:ye,texSubImage2D:ce,texSubImage3D:He,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Ne,scissor:Je,viewport:ke,reset:Et}}function Em(s,e,n,r){const a=YM(r);switch(n){case Fm:return s*e;case km:return s*e;case zm:return s*e*2;case Bm:return s*e/a.components*a.byteLength;case Gf:return s*e/a.components*a.byteLength;case Vm:return s*e*2/a.components*a.byteLength;case Wf:return s*e*2/a.components*a.byteLength;case Om:return s*e*3/a.components*a.byteLength;case Qn:return s*e*4/a.components*a.byteLength;case Xf:return s*e*4/a.components*a.byteLength;case Ml:case El:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Tl:case wl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ff:case hf:return Math.max(s,16)*Math.max(e,8)/4;case cf:case df:return Math.max(s,8)*Math.max(e,8)/2;case pf:case mf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case gf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case _f:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case vf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case xf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case yf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Sf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Mf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ef:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Tf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case wf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Af:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Cf:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Rf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case bf:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Pf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Al:case Df:case Lf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Hm:case If:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Uf:case Nf:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function YM(s){switch(s){case Xi:case Im:return{byteLength:1,components:1};case Ho:case Um:case Qs:return{byteLength:2,components:1};case Vf:case Hf:return{byteLength:2,components:4};case Qr:case Bf:case Hi:return{byteLength:4,components:1};case Nm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function qM(s,e,n,r,a,u,f){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new at,v=new WeakMap;let y;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(P,E){return S?new OffscreenCanvas(P,E):Pl("canvas")}function w(P,E,K){let pe=1;const ge=Ye(P);if((ge.width>K||ge.height>K)&&(pe=K/Math.max(ge.width,ge.height)),pe<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ce=Math.floor(pe*ge.width),He=Math.floor(pe*ge.height);y===void 0&&(y=A(ce,He));const Ce=E?A(ce,He):y;return Ce.width=ce,Ce.height=He,Ce.getContext("2d").drawImage(P,0,0,ce,He),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+ce+"x"+He+")."),Ce}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),P;return P}function _(P){return P.generateMipmaps}function g(P){s.generateMipmap(P)}function U(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function L(P,E,K,pe,ge=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ce=E;if(E===s.RED&&(K===s.FLOAT&&(ce=s.R32F),K===s.HALF_FLOAT&&(ce=s.R16F),K===s.UNSIGNED_BYTE&&(ce=s.R8)),E===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(ce=s.R8UI),K===s.UNSIGNED_SHORT&&(ce=s.R16UI),K===s.UNSIGNED_INT&&(ce=s.R32UI),K===s.BYTE&&(ce=s.R8I),K===s.SHORT&&(ce=s.R16I),K===s.INT&&(ce=s.R32I)),E===s.RG&&(K===s.FLOAT&&(ce=s.RG32F),K===s.HALF_FLOAT&&(ce=s.RG16F),K===s.UNSIGNED_BYTE&&(ce=s.RG8)),E===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(ce=s.RG8UI),K===s.UNSIGNED_SHORT&&(ce=s.RG16UI),K===s.UNSIGNED_INT&&(ce=s.RG32UI),K===s.BYTE&&(ce=s.RG8I),K===s.SHORT&&(ce=s.RG16I),K===s.INT&&(ce=s.RG32I)),E===s.RGB_INTEGER&&(K===s.UNSIGNED_BYTE&&(ce=s.RGB8UI),K===s.UNSIGNED_SHORT&&(ce=s.RGB16UI),K===s.UNSIGNED_INT&&(ce=s.RGB32UI),K===s.BYTE&&(ce=s.RGB8I),K===s.SHORT&&(ce=s.RGB16I),K===s.INT&&(ce=s.RGB32I)),E===s.RGBA_INTEGER&&(K===s.UNSIGNED_BYTE&&(ce=s.RGBA8UI),K===s.UNSIGNED_SHORT&&(ce=s.RGBA16UI),K===s.UNSIGNED_INT&&(ce=s.RGBA32UI),K===s.BYTE&&(ce=s.RGBA8I),K===s.SHORT&&(ce=s.RGBA16I),K===s.INT&&(ce=s.RGBA32I)),E===s.RGB&&K===s.UNSIGNED_INT_5_9_9_9_REV&&(ce=s.RGB9_E5),E===s.RGBA){const He=ge?Ll:xt.getTransfer(pe);K===s.FLOAT&&(ce=s.RGBA32F),K===s.HALF_FLOAT&&(ce=s.RGBA16F),K===s.UNSIGNED_BYTE&&(ce=He===Ct?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(ce=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(ce=s.RGB5_A1)}return(ce===s.R16F||ce===s.R32F||ce===s.RG16F||ce===s.RG32F||ce===s.RGBA16F||ce===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function R(P,E){let K;return P?E===null||E===Qr||E===Ks?K=s.DEPTH24_STENCIL8:E===Hi?K=s.DEPTH32F_STENCIL8:E===Ho&&(K=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Qr||E===Ks?K=s.DEPTH_COMPONENT24:E===Hi?K=s.DEPTH_COMPONENT32F:E===Ho&&(K=s.DEPTH_COMPONENT16),K}function X(P,E){return _(P)===!0||P.isFramebufferTexture&&P.minFilter!==hi&&P.minFilter!==Zn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function N(P){const E=P.target;E.removeEventListener("dispose",N),j(E),E.isVideoTexture&&v.delete(E)}function F(P){const E=P.target;E.removeEventListener("dispose",F),T(E)}function j(P){const E=r.get(P);if(E.__webglInit===void 0)return;const K=P.source,pe=x.get(K);if(pe){const ge=pe[E.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&b(P),Object.keys(pe).length===0&&x.delete(K)}r.remove(P)}function b(P){const E=r.get(P);s.deleteTexture(E.__webglTexture);const K=P.source,pe=x.get(K);delete pe[E.__cacheKey],f.memory.textures--}function T(P){const E=r.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),r.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(E.__webglFramebuffer[pe]))for(let ge=0;ge<E.__webglFramebuffer[pe].length;ge++)s.deleteFramebuffer(E.__webglFramebuffer[pe][ge]);else s.deleteFramebuffer(E.__webglFramebuffer[pe]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[pe])}else{if(Array.isArray(E.__webglFramebuffer))for(let pe=0;pe<E.__webglFramebuffer.length;pe++)s.deleteFramebuffer(E.__webglFramebuffer[pe]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let pe=0;pe<E.__webglColorRenderbuffer.length;pe++)E.__webglColorRenderbuffer[pe]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[pe]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const K=P.textures;for(let pe=0,ge=K.length;pe<ge;pe++){const ce=r.get(K[pe]);ce.__webglTexture&&(s.deleteTexture(ce.__webglTexture),f.memory.textures--),r.remove(K[pe])}r.remove(P)}let k=0;function re(){k=0}function Q(){const P=k;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),k+=1,P}function fe(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function he(P,E){const K=r.get(P);if(P.isVideoTexture&&qe(P),P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){const pe=P.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(K,P,E);return}}n.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+E)}function oe(P,E){const K=r.get(P);if(P.version>0&&K.__version!==P.version){$(K,P,E);return}n.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+E)}function le(P,E){const K=r.get(P);if(P.version>0&&K.__version!==P.version){$(K,P,E);return}n.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+E)}function z(P,E){const K=r.get(P);if(P.version>0&&K.__version!==P.version){ue(K,P,E);return}n.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+E)}const ae={[lf]:s.REPEAT,[Kr]:s.CLAMP_TO_EDGE,[uf]:s.MIRRORED_REPEAT},se={[hi]:s.NEAREST,[Iv]:s.NEAREST_MIPMAP_NEAREST,[Ja]:s.NEAREST_MIPMAP_LINEAR,[Zn]:s.LINEAR,[vc]:s.LINEAR_MIPMAP_NEAREST,[$r]:s.LINEAR_MIPMAP_LINEAR},I={[kv]:s.NEVER,[Wv]:s.ALWAYS,[zv]:s.LESS,[Gm]:s.LEQUAL,[Bv]:s.EQUAL,[Gv]:s.GEQUAL,[Vv]:s.GREATER,[Hv]:s.NOTEQUAL};function ne(P,E){if(E.type===Hi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Zn||E.magFilter===vc||E.magFilter===Ja||E.magFilter===$r||E.minFilter===Zn||E.minFilter===vc||E.minFilter===Ja||E.minFilter===$r)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ae[E.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ae[E.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ae[E.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,se[E.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,se[E.minFilter]),E.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,I[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===hi||E.minFilter!==Ja&&E.minFilter!==$r||E.type===Hi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const K=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,a.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function Ie(P,E){let K=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",N));const pe=E.source;let ge=x.get(pe);ge===void 0&&(ge={},x.set(pe,ge));const ce=fe(E);if(ce!==P.__cacheKey){ge[ce]===void 0&&(ge[ce]={texture:s.createTexture(),usedTimes:0},f.memory.textures++,K=!0),ge[ce].usedTimes++;const He=ge[P.__cacheKey];He!==void 0&&(ge[P.__cacheKey].usedTimes--,He.usedTimes===0&&b(E)),P.__cacheKey=ce,P.__webglTexture=ge[ce].texture}return K}function $(P,E,K){let pe=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(pe=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(pe=s.TEXTURE_3D);const ge=Ie(P,E),ce=E.source;n.bindTexture(pe,P.__webglTexture,s.TEXTURE0+K);const He=r.get(ce);if(ce.version!==He.__version||ge===!0){n.activeTexture(s.TEXTURE0+K);const Ce=xt.getPrimaries(xt.workingColorSpace),Ne=E.colorSpace===Sr?null:xt.getPrimaries(E.colorSpace),ut=E.colorSpace===Sr||Ce===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let ye=w(E.image,!1,a.maxTextureSize);ye=Tt(E,ye);const Oe=u.convert(E.format,E.colorSpace),Qe=u.convert(E.type);let Je=L(E.internalFormat,Oe,Qe,E.colorSpace,E.isVideoTexture);ne(pe,E);let ke;const ft=E.mipmaps,it=E.isVideoTexture!==!0,Et=He.__version===void 0||ge===!0,V=ce.dataReady,Re=X(E,ye);if(E.isDepthTexture)Je=R(E.format===$s,E.type),Et&&(it?n.texStorage2D(s.TEXTURE_2D,1,Je,ye.width,ye.height):n.texImage2D(s.TEXTURE_2D,0,Je,ye.width,ye.height,0,Oe,Qe,null));else if(E.isDataTexture)if(ft.length>0){it&&Et&&n.texStorage2D(s.TEXTURE_2D,Re,Je,ft[0].width,ft[0].height);for(let ie=0,de=ft.length;ie<de;ie++)ke=ft[ie],it?V&&n.texSubImage2D(s.TEXTURE_2D,ie,0,0,ke.width,ke.height,Oe,Qe,ke.data):n.texImage2D(s.TEXTURE_2D,ie,Je,ke.width,ke.height,0,Oe,Qe,ke.data);E.generateMipmaps=!1}else it?(Et&&n.texStorage2D(s.TEXTURE_2D,Re,Je,ye.width,ye.height),V&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,ye.width,ye.height,Oe,Qe,ye.data)):n.texImage2D(s.TEXTURE_2D,0,Je,ye.width,ye.height,0,Oe,Qe,ye.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){it&&Et&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Re,Je,ft[0].width,ft[0].height,ye.depth);for(let ie=0,de=ft.length;ie<de;ie++)if(ke=ft[ie],E.format!==Qn)if(Oe!==null)if(it){if(V)if(E.layerUpdates.size>0){const De=Em(ke.width,ke.height,E.format,E.type);for(const Pe of E.layerUpdates){const rt=ke.data.subarray(Pe*De/ke.data.BYTES_PER_ELEMENT,(Pe+1)*De/ke.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,Pe,ke.width,ke.height,1,Oe,rt)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ke.width,ke.height,ye.depth,Oe,ke.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ie,Je,ke.width,ke.height,ye.depth,0,ke.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?V&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ke.width,ke.height,ye.depth,Oe,Qe,ke.data):n.texImage3D(s.TEXTURE_2D_ARRAY,ie,Je,ke.width,ke.height,ye.depth,0,Oe,Qe,ke.data)}else{it&&Et&&n.texStorage2D(s.TEXTURE_2D,Re,Je,ft[0].width,ft[0].height);for(let ie=0,de=ft.length;ie<de;ie++)ke=ft[ie],E.format!==Qn?Oe!==null?it?V&&n.compressedTexSubImage2D(s.TEXTURE_2D,ie,0,0,ke.width,ke.height,Oe,ke.data):n.compressedTexImage2D(s.TEXTURE_2D,ie,Je,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?V&&n.texSubImage2D(s.TEXTURE_2D,ie,0,0,ke.width,ke.height,Oe,Qe,ke.data):n.texImage2D(s.TEXTURE_2D,ie,Je,ke.width,ke.height,0,Oe,Qe,ke.data)}else if(E.isDataArrayTexture)if(it){if(Et&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Re,Je,ye.width,ye.height,ye.depth),V)if(E.layerUpdates.size>0){const ie=Em(ye.width,ye.height,E.format,E.type);for(const de of E.layerUpdates){const De=ye.data.subarray(de*ie/ye.data.BYTES_PER_ELEMENT,(de+1)*ie/ye.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,de,ye.width,ye.height,1,Oe,Qe,De)}E.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Oe,Qe,ye.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,Je,ye.width,ye.height,ye.depth,0,Oe,Qe,ye.data);else if(E.isData3DTexture)it?(Et&&n.texStorage3D(s.TEXTURE_3D,Re,Je,ye.width,ye.height,ye.depth),V&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Oe,Qe,ye.data)):n.texImage3D(s.TEXTURE_3D,0,Je,ye.width,ye.height,ye.depth,0,Oe,Qe,ye.data);else if(E.isFramebufferTexture){if(Et)if(it)n.texStorage2D(s.TEXTURE_2D,Re,Je,ye.width,ye.height);else{let ie=ye.width,de=ye.height;for(let De=0;De<Re;De++)n.texImage2D(s.TEXTURE_2D,De,Je,ie,de,0,Oe,Qe,null),ie>>=1,de>>=1}}else if(ft.length>0){if(it&&Et){const ie=Ye(ft[0]);n.texStorage2D(s.TEXTURE_2D,Re,Je,ie.width,ie.height)}for(let ie=0,de=ft.length;ie<de;ie++)ke=ft[ie],it?V&&n.texSubImage2D(s.TEXTURE_2D,ie,0,0,Oe,Qe,ke):n.texImage2D(s.TEXTURE_2D,ie,Je,Oe,Qe,ke);E.generateMipmaps=!1}else if(it){if(Et){const ie=Ye(ye);n.texStorage2D(s.TEXTURE_2D,Re,Je,ie.width,ie.height)}V&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,Oe,Qe,ye)}else n.texImage2D(s.TEXTURE_2D,0,Je,Oe,Qe,ye);_(E)&&g(pe),He.__version=ce.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function ue(P,E,K){if(E.image.length!==6)return;const pe=Ie(P,E),ge=E.source;n.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+K);const ce=r.get(ge);if(ge.version!==ce.__version||pe===!0){n.activeTexture(s.TEXTURE0+K);const He=xt.getPrimaries(xt.workingColorSpace),Ce=E.colorSpace===Sr?null:xt.getPrimaries(E.colorSpace),Ne=E.colorSpace===Sr||He===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const ut=E.isCompressedTexture||E.image[0].isCompressedTexture,ye=E.image[0]&&E.image[0].isDataTexture,Oe=[];for(let de=0;de<6;de++)!ut&&!ye?Oe[de]=w(E.image[de],!0,a.maxCubemapSize):Oe[de]=ye?E.image[de].image:E.image[de],Oe[de]=Tt(E,Oe[de]);const Qe=Oe[0],Je=u.convert(E.format,E.colorSpace),ke=u.convert(E.type),ft=L(E.internalFormat,Je,ke,E.colorSpace),it=E.isVideoTexture!==!0,Et=ce.__version===void 0||pe===!0,V=ge.dataReady;let Re=X(E,Qe);ne(s.TEXTURE_CUBE_MAP,E);let ie;if(ut){it&&Et&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Re,ft,Qe.width,Qe.height);for(let de=0;de<6;de++){ie=Oe[de].mipmaps;for(let De=0;De<ie.length;De++){const Pe=ie[De];E.format!==Qn?Je!==null?it?V&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De,0,0,Pe.width,Pe.height,Je,Pe.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De,ft,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?V&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De,0,0,Pe.width,Pe.height,Je,ke,Pe.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De,ft,Pe.width,Pe.height,0,Je,ke,Pe.data)}}}else{if(ie=E.mipmaps,it&&Et){ie.length>0&&Re++;const de=Ye(Oe[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Re,ft,de.width,de.height)}for(let de=0;de<6;de++)if(ye){it?V&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Oe[de].width,Oe[de].height,Je,ke,Oe[de].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ft,Oe[de].width,Oe[de].height,0,Je,ke,Oe[de].data);for(let De=0;De<ie.length;De++){const rt=ie[De].image[de].image;it?V&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De+1,0,0,rt.width,rt.height,Je,ke,rt.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De+1,ft,rt.width,rt.height,0,Je,ke,rt.data)}}else{it?V&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Je,ke,Oe[de]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ft,Je,ke,Oe[de]);for(let De=0;De<ie.length;De++){const Pe=ie[De];it?V&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De+1,0,0,Je,ke,Pe.image[de]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,De+1,ft,Je,ke,Pe.image[de])}}}_(E)&&g(s.TEXTURE_CUBE_MAP),ce.__version=ge.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Me(P,E,K,pe,ge,ce){const He=u.convert(K.format,K.colorSpace),Ce=u.convert(K.type),Ne=L(K.internalFormat,He,Ce,K.colorSpace),ut=r.get(E),ye=r.get(K);if(ye.__renderTarget=E,!ut.__hasExternalTextures){const Oe=Math.max(1,E.width>>ce),Qe=Math.max(1,E.height>>ce);ge===s.TEXTURE_3D||ge===s.TEXTURE_2D_ARRAY?n.texImage3D(ge,ce,Ne,Oe,Qe,E.depth,0,He,Ce,null):n.texImage2D(ge,ce,Ne,Oe,Qe,0,He,Ce,null)}n.bindFramebuffer(s.FRAMEBUFFER,P),ct(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,ge,ye.__webglTexture,0,ht(E)):(ge===s.TEXTURE_2D||ge>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,pe,ge,ye.__webglTexture,ce),n.bindFramebuffer(s.FRAMEBUFFER,null)}function ve(P,E,K){if(s.bindRenderbuffer(s.RENDERBUFFER,P),E.depthBuffer){const pe=E.depthTexture,ge=pe&&pe.isDepthTexture?pe.type:null,ce=R(E.stencilBuffer,ge),He=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ce=ht(E);ct(E)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,ce,E.width,E.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,ce,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,ce,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,He,s.RENDERBUFFER,P)}else{const pe=E.textures;for(let ge=0;ge<pe.length;ge++){const ce=pe[ge],He=u.convert(ce.format,ce.colorSpace),Ce=u.convert(ce.type),Ne=L(ce.internalFormat,He,Ce,ce.colorSpace),ut=ht(E);K&&ct(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,Ne,E.width,E.height):ct(E)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,Ne,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ne,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ae(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pe=r.get(E.depthTexture);pe.__renderTarget=E,(!pe.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),he(E.depthTexture,0);const ge=pe.__webglTexture,ce=ht(E);if(E.depthTexture.format===Ws)ct(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0);else if(E.depthTexture.format===$s)ct(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0);else throw new Error("Unknown depthTexture format")}function Ue(P){const E=r.get(P),K=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const pe=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),pe){const ge=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,pe.removeEventListener("dispose",ge)};pe.addEventListener("dispose",ge),E.__depthDisposeCallback=ge}E.__boundDepthTexture=pe}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Ae(E.__webglFramebuffer,P)}else if(K){E.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[pe]),E.__webglDepthbuffer[pe]===void 0)E.__webglDepthbuffer[pe]=s.createRenderbuffer(),ve(E.__webglDepthbuffer[pe],P,!1);else{const ge=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=E.__webglDepthbuffer[pe];s.bindRenderbuffer(s.RENDERBUFFER,ce),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,ce)}}else if(n.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),ve(E.__webglDepthbuffer,P,!1);else{const pe=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,pe,s.RENDERBUFFER,ge)}n.bindFramebuffer(s.FRAMEBUFFER,null)}function Ze(P,E,K){const pe=r.get(P);E!==void 0&&Me(pe.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&Ue(P)}function At(P){const E=P.texture,K=r.get(P),pe=r.get(E);P.addEventListener("dispose",F);const ge=P.textures,ce=P.isWebGLCubeRenderTarget===!0,He=ge.length>1;if(He||(pe.__webglTexture===void 0&&(pe.__webglTexture=s.createTexture()),pe.__version=E.version,f.memory.textures++),ce){K.__webglFramebuffer=[];for(let Ce=0;Ce<6;Ce++)if(E.mipmaps&&E.mipmaps.length>0){K.__webglFramebuffer[Ce]=[];for(let Ne=0;Ne<E.mipmaps.length;Ne++)K.__webglFramebuffer[Ce][Ne]=s.createFramebuffer()}else K.__webglFramebuffer[Ce]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){K.__webglFramebuffer=[];for(let Ce=0;Ce<E.mipmaps.length;Ce++)K.__webglFramebuffer[Ce]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(He)for(let Ce=0,Ne=ge.length;Ce<Ne;Ce++){const ut=r.get(ge[Ce]);ut.__webglTexture===void 0&&(ut.__webglTexture=s.createTexture(),f.memory.textures++)}if(P.samples>0&&ct(P)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let Ce=0;Ce<ge.length;Ce++){const Ne=ge[Ce];K.__webglColorRenderbuffer[Ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[Ce]);const ut=u.convert(Ne.format,Ne.colorSpace),ye=u.convert(Ne.type),Oe=L(Ne.internalFormat,ut,ye,Ne.colorSpace,P.isXRRenderTarget===!0),Qe=ht(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,Oe,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,K.__webglColorRenderbuffer[Ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),ve(K.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ce){n.bindTexture(s.TEXTURE_CUBE_MAP,pe.__webglTexture),ne(s.TEXTURE_CUBE_MAP,E);for(let Ce=0;Ce<6;Ce++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ne=0;Ne<E.mipmaps.length;Ne++)Me(K.__webglFramebuffer[Ce][Ne],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,Ne);else Me(K.__webglFramebuffer[Ce],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0);_(E)&&g(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(He){for(let Ce=0,Ne=ge.length;Ce<Ne;Ce++){const ut=ge[Ce],ye=r.get(ut);n.bindTexture(s.TEXTURE_2D,ye.__webglTexture),ne(s.TEXTURE_2D,ut),Me(K.__webglFramebuffer,P,ut,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,0),_(ut)&&g(s.TEXTURE_2D)}n.unbindTexture()}else{let Ce=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ce=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Ce,pe.__webglTexture),ne(Ce,E),E.mipmaps&&E.mipmaps.length>0)for(let Ne=0;Ne<E.mipmaps.length;Ne++)Me(K.__webglFramebuffer[Ne],P,E,s.COLOR_ATTACHMENT0,Ce,Ne);else Me(K.__webglFramebuffer,P,E,s.COLOR_ATTACHMENT0,Ce,0);_(E)&&g(Ce),n.unbindTexture()}P.depthBuffer&&Ue(P)}function pt(P){const E=P.textures;for(let K=0,pe=E.length;K<pe;K++){const ge=E[K];if(_(ge)){const ce=U(P),He=r.get(ge).__webglTexture;n.bindTexture(ce,He),g(ce),n.unbindTexture()}}}const Dt=[],W=[];function pn(P){if(P.samples>0){if(ct(P)===!1){const E=P.textures,K=P.width,pe=P.height;let ge=s.COLOR_BUFFER_BIT;const ce=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,He=r.get(P),Ce=E.length>1;if(Ce)for(let Ne=0;Ne<E.length;Ne++)n.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,He.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglFramebuffer);for(let Ne=0;Ne<E.length;Ne++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ge|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ge|=s.STENCIL_BUFFER_BIT)),Ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,He.__webglColorRenderbuffer[Ne]);const ut=r.get(E[Ne]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ut,0)}s.blitFramebuffer(0,0,K,pe,0,0,K,pe,ge,s.NEAREST),p===!0&&(Dt.length=0,W.length=0,Dt.push(s.COLOR_ATTACHMENT0+Ne),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Dt.push(ce),W.push(ce),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,W)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Dt))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ce)for(let Ne=0;Ne<E.length;Ne++){n.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,He.__webglColorRenderbuffer[Ne]);const ut=r.get(E[Ne]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,ut,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&p){const E=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function ht(P){return Math.min(a.maxSamples,P.samples)}function ct(P){const E=r.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function qe(P){const E=f.render.frame;v.get(P)!==E&&(v.set(P,E),P.update())}function Tt(P,E){const K=P.colorSpace,pe=P.format,ge=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||K!==Js&&K!==Sr&&(xt.getTransfer(K)===Ct?(pe!==Qn||ge!==Xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),E}function Ye(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(m.width=P.naturalWidth||P.width,m.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(m.width=P.displayWidth,m.height=P.displayHeight):(m.width=P.width,m.height=P.height),m}this.allocateTextureUnit=Q,this.resetTextureUnits=re,this.setTexture2D=he,this.setTexture2DArray=oe,this.setTexture3D=le,this.setTextureCube=z,this.rebindTextures=Ze,this.setupRenderTarget=At,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=pn,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=ct}function KM(s,e){function n(r,a=Sr){let u;const f=xt.getTransfer(a);if(r===Xi)return s.UNSIGNED_BYTE;if(r===Vf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Hf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Nm)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Im)return s.BYTE;if(r===Um)return s.SHORT;if(r===Ho)return s.UNSIGNED_SHORT;if(r===Bf)return s.INT;if(r===Qr)return s.UNSIGNED_INT;if(r===Hi)return s.FLOAT;if(r===Qs)return s.HALF_FLOAT;if(r===Fm)return s.ALPHA;if(r===Om)return s.RGB;if(r===Qn)return s.RGBA;if(r===km)return s.LUMINANCE;if(r===zm)return s.LUMINANCE_ALPHA;if(r===Ws)return s.DEPTH_COMPONENT;if(r===$s)return s.DEPTH_STENCIL;if(r===Bm)return s.RED;if(r===Gf)return s.RED_INTEGER;if(r===Vm)return s.RG;if(r===Wf)return s.RG_INTEGER;if(r===Xf)return s.RGBA_INTEGER;if(r===Ml||r===El||r===Tl||r===wl)if(f===Ct)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===Ml)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===El)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Tl)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===wl)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===Ml)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===El)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Tl)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===wl)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===cf||r===ff||r===df||r===hf)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===cf)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ff)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===df)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===hf)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===pf||r===mf||r===gf)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(r===pf||r===mf)return f===Ct?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===gf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===_f||r===vf||r===xf||r===yf||r===Sf||r===Mf||r===Ef||r===Tf||r===wf||r===Af||r===Cf||r===Rf||r===bf||r===Pf)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(r===_f)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===vf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===xf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===yf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Sf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Mf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ef)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Tf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===wf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Af)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Cf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Rf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===bf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Pf)return f===Ct?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Al||r===Df||r===Lf)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(r===Al)return f===Ct?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Df)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Lf)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Hm||r===If||r===Uf||r===Nf)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(r===Al)return u.COMPRESSED_RED_RGTC1_EXT;if(r===If)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Uf)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Nf)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ks?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}class $M extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yl extends zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ZM={type:"move"};class jc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,u=null,f=null;const d=this._targetRay,p=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const w of e.hand.values()){const _=n.getJointPose(w,r),g=this._getHandJoint(m,w);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const v=m.joints["index-finger-tip"],y=m.joints["thumb-tip"],x=v.position.distanceTo(y.position),S=.02,A=.005;m.inputState.pinching&&x>S+A?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-A&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(u=n.getPose(e.gripSpace,r),u!==null&&(p.matrix.fromArray(u.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,u.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(u.linearVelocity)):p.hasLinearVelocity=!1,u.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(u.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&u!==null&&(a=u),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(ZM)))}return d!==null&&(d.visible=a!==null),p!==null&&(p.visible=u!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new yl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}const QM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JM=`
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

}`;class eE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,r){if(this.texture===null){const a=new Ln,u=e.properties.get(a);u.__webglTexture=n.texture,(n.depthNear!=r.depthNear||n.depthFar!=r.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new pi({vertexShader:QM,fragmentShader:JM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Jn(new jo(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tE extends es{constructor(e,n){super();const r=this;let a=null,u=1,f=null,d="local-floor",p=1,m=null,v=null,y=null,x=null,S=null,A=null;const w=new eE,_=n.getContextAttributes();let g=null,U=null;const L=[],R=[],X=new at;let N=null;const F=new $n;F.viewport=new Vt;const j=new $n;j.viewport=new Vt;const b=[F,j],T=new $M;let k=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ue=L[$];return ue===void 0&&(ue=new jc,L[$]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function($){let ue=L[$];return ue===void 0&&(ue=new jc,L[$]=ue),ue.getGripSpace()},this.getHand=function($){let ue=L[$];return ue===void 0&&(ue=new jc,L[$]=ue),ue.getHandSpace()};function Q($){const ue=R.indexOf($.inputSource);if(ue===-1)return;const Me=L[ue];Me!==void 0&&(Me.update($.inputSource,$.frame,m||f),Me.dispatchEvent({type:$.type,data:$.inputSource}))}function fe(){a.removeEventListener("select",Q),a.removeEventListener("selectstart",Q),a.removeEventListener("selectend",Q),a.removeEventListener("squeeze",Q),a.removeEventListener("squeezestart",Q),a.removeEventListener("squeezeend",Q),a.removeEventListener("end",fe),a.removeEventListener("inputsourceschange",he);for(let $=0;$<L.length;$++){const ue=R[$];ue!==null&&(R[$]=null,L[$].disconnect(ue))}k=null,re=null,w.reset(),e.setRenderTarget(g),S=null,x=null,y=null,a=null,U=null,Ie.stop(),r.isPresenting=!1,e.setPixelRatio(N),e.setSize(X.width,X.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){u=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){d=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function($){m=$},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return y},this.getFrame=function(){return A},this.getSession=function(){return a},this.setSession=async function($){if(a=$,a!==null){if(g=e.getRenderTarget(),a.addEventListener("select",Q),a.addEventListener("selectstart",Q),a.addEventListener("selectend",Q),a.addEventListener("squeeze",Q),a.addEventListener("squeezestart",Q),a.addEventListener("squeezeend",Q),a.addEventListener("end",fe),a.addEventListener("inputsourceschange",he),_.xrCompatible!==!0&&await n.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(X),a.renderState.layers===void 0){const ue={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:u};S=new XRWebGLLayer(a,n,ue),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),U=new Mi(S.framebufferWidth,S.framebufferHeight,{format:Qn,type:Xi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ue=null,Me=null,ve=null;_.depth&&(ve=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ue=_.stencil?$s:Ws,Me=_.stencil?Ks:Qr);const Ae={colorFormat:n.RGBA8,depthFormat:ve,scaleFactor:u};y=new XRWebGLBinding(a,n),x=y.createProjectionLayer(Ae),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),U=new Mi(x.textureWidth,x.textureHeight,{format:Qn,type:Xi,depthTexture:new sg(x.textureWidth,x.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await a.requestReferenceSpace(d),Ie.setContext(a),Ie.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function he($){for(let ue=0;ue<$.removed.length;ue++){const Me=$.removed[ue],ve=R.indexOf(Me);ve>=0&&(R[ve]=null,L[ve].disconnect(Me))}for(let ue=0;ue<$.added.length;ue++){const Me=$.added[ue];let ve=R.indexOf(Me);if(ve===-1){for(let Ue=0;Ue<L.length;Ue++)if(Ue>=R.length){R.push(Me),ve=Ue;break}else if(R[Ue]===null){R[Ue]=Me,ve=Ue;break}if(ve===-1)break}const Ae=L[ve];Ae&&Ae.connect(Me)}}const oe=new Z,le=new Z;function z($,ue,Me){oe.setFromMatrixPosition(ue.matrixWorld),le.setFromMatrixPosition(Me.matrixWorld);const ve=oe.distanceTo(le),Ae=ue.projectionMatrix.elements,Ue=Me.projectionMatrix.elements,Ze=Ae[14]/(Ae[10]-1),At=Ae[14]/(Ae[10]+1),pt=(Ae[9]+1)/Ae[5],Dt=(Ae[9]-1)/Ae[5],W=(Ae[8]-1)/Ae[0],pn=(Ue[8]+1)/Ue[0],ht=Ze*W,ct=Ze*pn,qe=ve/(-W+pn),Tt=qe*-W;if(ue.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Tt),$.translateZ(qe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ae[10]===-1)$.projectionMatrix.copy(ue.projectionMatrix),$.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const Ye=Ze+qe,P=At+qe,E=ht-Tt,K=ct+(ve-Tt),pe=pt*At/P*Ye,ge=Dt*At/P*Ye;$.projectionMatrix.makePerspective(E,K,pe,ge,Ye,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ae($,ue){ue===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ue.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(a===null)return;let ue=$.near,Me=$.far;w.texture!==null&&(w.depthNear>0&&(ue=w.depthNear),w.depthFar>0&&(Me=w.depthFar)),T.near=j.near=F.near=ue,T.far=j.far=F.far=Me,(k!==T.near||re!==T.far)&&(a.updateRenderState({depthNear:T.near,depthFar:T.far}),k=T.near,re=T.far),F.layers.mask=$.layers.mask|2,j.layers.mask=$.layers.mask|4,T.layers.mask=F.layers.mask|j.layers.mask;const ve=$.parent,Ae=T.cameras;ae(T,ve);for(let Ue=0;Ue<Ae.length;Ue++)ae(Ae[Ue],ve);Ae.length===2?z(T,F,j):T.projectionMatrix.copy(F.projectionMatrix),se($,T,ve)};function se($,ue,Me){Me===null?$.matrix.copy(ue.matrixWorld):($.matrix.copy(Me.matrixWorld),$.matrix.invert(),$.matrix.multiply(ue.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ue.projectionMatrix),$.projectionMatrixInverse.copy(ue.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ff*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(x===null&&S===null))return p},this.setFoveation=function($){p=$,x!==null&&(x.fixedFoveation=$),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=$)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(T)};let I=null;function ne($,ue){if(v=ue.getViewerPose(m||f),A=ue,v!==null){const Me=v.views;S!==null&&(e.setRenderTargetFramebuffer(U,S.framebuffer),e.setRenderTarget(U));let ve=!1;Me.length!==T.cameras.length&&(T.cameras.length=0,ve=!0);for(let Ue=0;Ue<Me.length;Ue++){const Ze=Me[Ue];let At=null;if(S!==null)At=S.getViewport(Ze);else{const Dt=y.getViewSubImage(x,Ze);At=Dt.viewport,Ue===0&&(e.setRenderTargetTextures(U,Dt.colorTexture,x.ignoreDepthValues?void 0:Dt.depthStencilTexture),e.setRenderTarget(U))}let pt=b[Ue];pt===void 0&&(pt=new $n,pt.layers.enable(Ue),pt.viewport=new Vt,b[Ue]=pt),pt.matrix.fromArray(Ze.transform.matrix),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.projectionMatrix.fromArray(Ze.projectionMatrix),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert(),pt.viewport.set(At.x,At.y,At.width,At.height),Ue===0&&(T.matrix.copy(pt.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),ve===!0&&T.cameras.push(pt)}const Ae=a.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")){const Ue=y.getDepthInformation(Me[0]);Ue&&Ue.isValid&&Ue.texture&&w.init(e,Ue,a.renderState)}}for(let Me=0;Me<L.length;Me++){const ve=R[Me],Ae=L[Me];ve!==null&&Ae!==void 0&&Ae.update(ve,ue,m||f)}I&&I($,ue),ue.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ue}),A=null}const Ie=new ig;Ie.setAnimationLoop(ne),this.setAnimationLoop=function($){I=$},this.dispose=function(){}}}const Wr=new ji,nE=new Ht;function iE(s,e){function n(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function r(_,g){g.color.getRGB(_.fogColor.value,Jm(s)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function a(_,g,U,L,R){g.isMeshBasicMaterial||g.isMeshLambertMaterial?u(_,g):g.isMeshToonMaterial?(u(_,g),y(_,g)):g.isMeshPhongMaterial?(u(_,g),v(_,g)):g.isMeshStandardMaterial?(u(_,g),x(_,g),g.isMeshPhysicalMaterial&&S(_,g,R)):g.isMeshMatcapMaterial?(u(_,g),A(_,g)):g.isMeshDepthMaterial?u(_,g):g.isMeshDistanceMaterial?(u(_,g),w(_,g)):g.isMeshNormalMaterial?u(_,g):g.isLineBasicMaterial?(f(_,g),g.isLineDashedMaterial&&d(_,g)):g.isPointsMaterial?p(_,g,U,L):g.isSpriteMaterial?m(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function u(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,n(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,n(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===Dn&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,n(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===Dn&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,n(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,n(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const U=e.get(g),L=U.envMap,R=U.envMapRotation;L&&(_.envMap.value=L,Wr.copy(R),Wr.x*=-1,Wr.y*=-1,Wr.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Wr.y*=-1,Wr.z*=-1),_.envMapRotation.value.setFromMatrix4(nE.makeRotationFromEuler(Wr)),_.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap&&(_.lightMap.value=g.lightMap,_.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,_.lightMapTransform)),g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,_.aoMapTransform))}function f(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,n(g.map,_.mapTransform))}function d(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function p(_,g,U,L){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*U,_.scale.value=L*.5,g.map&&(_.map.value=g.map,n(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function m(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,n(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function v(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function y(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function x(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function S(_,g,U){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Dn&&_.clearcoatNormalScale.value.negate())),g.dispersion>0&&(_.dispersion.value=g.dispersion),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=U.texture,_.transmissionSamplerSize.value.set(U.width,U.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,_.specularIntensityMapTransform))}function A(_,g){g.matcap&&(_.matcap.value=g.matcap)}function w(_,g){const U=e.get(g).light;_.referencePosition.value.setFromMatrixPosition(U.matrixWorld),_.nearDistance.value=U.shadow.camera.near,_.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function rE(s,e,n,r){let a={},u={},f=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function p(U,L){const R=L.program;r.uniformBlockBinding(U,R)}function m(U,L){let R=a[U.id];R===void 0&&(A(U),R=v(U),a[U.id]=R,U.addEventListener("dispose",_));const X=L.program;r.updateUBOMapping(U,X);const N=e.render.frame;u[U.id]!==N&&(x(U),u[U.id]=N)}function v(U){const L=y();U.__bindingPointIndex=L;const R=s.createBuffer(),X=U.__size,N=U.usage;return s.bindBuffer(s.UNIFORM_BUFFER,R),s.bufferData(s.UNIFORM_BUFFER,X,N),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,L,R),R}function y(){for(let U=0;U<d;U++)if(f.indexOf(U)===-1)return f.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(U){const L=a[U.id],R=U.uniforms,X=U.__cache;s.bindBuffer(s.UNIFORM_BUFFER,L);for(let N=0,F=R.length;N<F;N++){const j=Array.isArray(R[N])?R[N]:[R[N]];for(let b=0,T=j.length;b<T;b++){const k=j[b];if(S(k,N,b,X)===!0){const re=k.__offset,Q=Array.isArray(k.value)?k.value:[k.value];let fe=0;for(let he=0;he<Q.length;he++){const oe=Q[he],le=w(oe);typeof oe=="number"||typeof oe=="boolean"?(k.__data[0]=oe,s.bufferSubData(s.UNIFORM_BUFFER,re+fe,k.__data)):oe.isMatrix3?(k.__data[0]=oe.elements[0],k.__data[1]=oe.elements[1],k.__data[2]=oe.elements[2],k.__data[3]=0,k.__data[4]=oe.elements[3],k.__data[5]=oe.elements[4],k.__data[6]=oe.elements[5],k.__data[7]=0,k.__data[8]=oe.elements[6],k.__data[9]=oe.elements[7],k.__data[10]=oe.elements[8],k.__data[11]=0):(oe.toArray(k.__data,fe),fe+=le.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,re,k.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(U,L,R,X){const N=U.value,F=L+"_"+R;if(X[F]===void 0)return typeof N=="number"||typeof N=="boolean"?X[F]=N:X[F]=N.clone(),!0;{const j=X[F];if(typeof N=="number"||typeof N=="boolean"){if(j!==N)return X[F]=N,!0}else if(j.equals(N)===!1)return j.copy(N),!0}return!1}function A(U){const L=U.uniforms;let R=0;const X=16;for(let F=0,j=L.length;F<j;F++){const b=Array.isArray(L[F])?L[F]:[L[F]];for(let T=0,k=b.length;T<k;T++){const re=b[T],Q=Array.isArray(re.value)?re.value:[re.value];for(let fe=0,he=Q.length;fe<he;fe++){const oe=Q[fe],le=w(oe),z=R%X,ae=z%le.boundary,se=z+ae;R+=ae,se!==0&&X-se<le.storage&&(R+=X-se),re.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),re.__offset=R,R+=le.storage}}}const N=R%X;return N>0&&(R+=X-N),U.__size=R,U.__cache={},this}function w(U){const L={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(L.boundary=4,L.storage=4):U.isVector2?(L.boundary=8,L.storage=8):U.isVector3||U.isColor?(L.boundary=16,L.storage=12):U.isVector4?(L.boundary=16,L.storage=16):U.isMatrix3?(L.boundary=48,L.storage=48):U.isMatrix4?(L.boundary=64,L.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),L}function _(U){const L=U.target;L.removeEventListener("dispose",_);const R=f.indexOf(L.__bindingPointIndex);f.splice(R,1),s.deleteBuffer(a[L.id]),delete a[L.id],delete u[L.id]}function g(){for(const U in a)s.deleteBuffer(a[U]);f=[],a={},u={}}return{bind:p,update:m,dispose:g}}class sE{constructor(e={}){const{canvas:n=Yv(),context:r=null,depth:a=!0,stencil:u=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:y=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=f;const A=new Uint32Array(4),w=new Int32Array(4);let _=null,g=null;const U=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Kn,this.toneMapping=Er,this.toneMappingExposure=1;const R=this;let X=!1,N=0,F=0,j=null,b=-1,T=null;const k=new Vt,re=new Vt;let Q=null;const fe=new bt(0);let he=0,oe=n.width,le=n.height,z=1,ae=null,se=null;const I=new Vt(0,0,oe,le),ne=new Vt(0,0,oe,le);let Ie=!1;const $=new ng;let ue=!1,Me=!1;const ve=new Ht,Ae=new Ht,Ue=new Z,Ze=new Vt,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Dt(){return j===null?z:1}let W=r;function pn(C,H){return n.getContext(C,H)}try{const C={alpha:!0,depth:a,stencil:u,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:y};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${zf}`),n.addEventListener("webglcontextlost",de,!1),n.addEventListener("webglcontextrestored",De,!1),n.addEventListener("webglcontextcreationerror",Pe,!1),W===null){const H="webgl2";if(W=pn(H,C),W===null)throw pn(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ht,ct,qe,Tt,Ye,P,E,K,pe,ge,ce,He,Ce,Ne,ut,ye,Oe,Qe,Je,ke,ft,it,Et,V;function Re(){ht=new cS(W),ht.init(),it=new KM(W,ht),ct=new rS(W,ht,e,it),qe=new jM(W,ht),ct.reverseDepthBuffer&&x&&qe.buffers.depth.setReversed(!0),Tt=new hS(W),Ye=new DM,P=new qM(W,ht,qe,Ye,ct,it,Tt),E=new oS(R),K=new uS(R),pe=new y0(W),Et=new nS(W,pe),ge=new fS(W,pe,Tt,Et),ce=new mS(W,ge,pe,Tt),Je=new pS(W,ct,P),ye=new sS(Ye),He=new PM(R,E,K,ht,ct,Et,ye),Ce=new iE(R,Ye),Ne=new IM,ut=new zM(ht),Qe=new tS(R,E,K,qe,ce,S,p),Oe=new WM(R,ce,ct),V=new rE(W,Tt,ct,qe),ke=new iS(W,ht,Tt),ft=new dS(W,ht,Tt),Tt.programs=He.programs,R.capabilities=ct,R.extensions=ht,R.properties=Ye,R.renderLists=Ne,R.shadowMap=Oe,R.state=qe,R.info=Tt}Re();const ie=new tE(R,W);this.xr=ie,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const C=ht.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ht.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(oe,le,!1))},this.getSize=function(C){return C.set(oe,le)},this.setSize=function(C,H,ee=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}oe=C,le=H,n.width=Math.floor(C*z),n.height=Math.floor(H*z),ee===!0&&(n.style.width=C+"px",n.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(oe*z,le*z).floor()},this.setDrawingBufferSize=function(C,H,ee){oe=C,le=H,z=ee,n.width=Math.floor(C*ee),n.height=Math.floor(H*ee),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(k)},this.getViewport=function(C){return C.copy(I)},this.setViewport=function(C,H,ee,te){C.isVector4?I.set(C.x,C.y,C.z,C.w):I.set(C,H,ee,te),qe.viewport(k.copy(I).multiplyScalar(z).round())},this.getScissor=function(C){return C.copy(ne)},this.setScissor=function(C,H,ee,te){C.isVector4?ne.set(C.x,C.y,C.z,C.w):ne.set(C,H,ee,te),qe.scissor(re.copy(ne).multiplyScalar(z).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(C){qe.setScissorTest(Ie=C)},this.setOpaqueSort=function(C){ae=C},this.setTransparentSort=function(C){se=C},this.getClearColor=function(C){return C.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(C=!0,H=!0,ee=!0){let te=0;if(C){let G=!1;if(j!==null){const Te=j.texture.format;G=Te===Xf||Te===Wf||Te===Gf}if(G){const Te=j.texture.type,Se=Te===Xi||Te===Qr||Te===Ho||Te===Ks||Te===Vf||Te===Hf,Ge=Qe.getClearColor(),Be=Qe.getClearAlpha(),et=Ge.r,nt=Ge.g,We=Ge.b;Se?(A[0]=et,A[1]=nt,A[2]=We,A[3]=Be,W.clearBufferuiv(W.COLOR,0,A)):(w[0]=et,w[1]=nt,w[2]=We,w[3]=Be,W.clearBufferiv(W.COLOR,0,w))}else te|=W.COLOR_BUFFER_BIT}H&&(te|=W.DEPTH_BUFFER_BIT),ee&&(te|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",de,!1),n.removeEventListener("webglcontextrestored",De,!1),n.removeEventListener("webglcontextcreationerror",Pe,!1),Ne.dispose(),ut.dispose(),Ye.dispose(),E.dispose(),K.dispose(),ce.dispose(),Et.dispose(),V.dispose(),He.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",ns),ie.removeEventListener("sessionend",Yi),Ti.stop()};function de(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),X=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),X=!1;const C=Tt.autoReset,H=Oe.enabled,ee=Oe.autoUpdate,te=Oe.needsUpdate,G=Oe.type;Re(),Tt.autoReset=C,Oe.enabled=H,Oe.autoUpdate=ee,Oe.needsUpdate=te,Oe.type=G}function Pe(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function rt(C){const H=C.target;H.removeEventListener("dispose",rt),It(H)}function It(C){jt(C),Ye.remove(C)}function jt(C){const H=Ye.get(C).programs;H!==void 0&&(H.forEach(function(ee){He.releaseProgram(ee)}),C.isShaderMaterial&&He.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,ee,te,G,Te){H===null&&(H=At);const Se=G.isMesh&&G.matrixWorld.determinant()<0,Ge=Ko(C,H,ee,te,G);qe.setMaterial(te,Se);let Be=ee.index,et=1;if(te.wireframe===!0){if(Be=ge.getWireframeAttribute(ee),Be===void 0)return;et=2}const nt=ee.drawRange,We=ee.attributes.position;let gt=nt.start*et,Mt=(nt.start+nt.count)*et;Te!==null&&(gt=Math.max(gt,Te.start*et),Mt=Math.min(Mt,(Te.start+Te.count)*et)),Be!==null?(gt=Math.max(gt,0),Mt=Math.min(Mt,Be.count)):We!=null&&(gt=Math.max(gt,0),Mt=Math.min(Mt,We.count));const mt=Mt-gt;if(mt<0||mt===1/0)return;Et.setup(G,te,Ge,ee,Be);let on,st=ke;if(Be!==null&&(on=pe.get(Be),st=ft,st.setIndex(on)),G.isMesh)te.wireframe===!0?(qe.setLineWidth(te.wireframeLinewidth*Dt()),st.setMode(W.LINES)):st.setMode(W.TRIANGLES);else if(G.isLine){let je=te.linewidth;je===void 0&&(je=1),qe.setLineWidth(je*Dt()),G.isLineSegments?st.setMode(W.LINES):G.isLineLoop?st.setMode(W.LINE_LOOP):st.setMode(W.LINE_STRIP)}else G.isPoints?st.setMode(W.POINTS):G.isSprite&&st.setMode(W.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)st.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ht.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const je=G._multiDrawStarts,ei=G._multiDrawCounts,yt=G._multiDrawCount,an=Be?pe.get(Be).bytesPerElement:1,ti=Ye.get(te).currentProgram.getUniforms();for(let Yt=0;Yt<yt;Yt++)ti.setValue(W,"_gl_DrawID",Yt),st.render(je[Yt]/an,ei[Yt])}else if(G.isInstancedMesh)st.renderInstances(gt,mt,G.count);else if(ee.isInstancedBufferGeometry){const je=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,ei=Math.min(ee.instanceCount,je);st.renderInstances(gt,mt,ei)}else st.render(gt,mt)};function _t(C,H,ee){C.transparent===!0&&C.side===Vi&&C.forceSinglePass===!1?(C.side=Dn,C.needsUpdate=!0,is(C,H,ee),C.side=Tr,C.needsUpdate=!0,is(C,H,ee),C.side=Vi):is(C,H,ee)}this.compile=function(C,H,ee=null){ee===null&&(ee=C),g=ut.get(ee),g.init(H),L.push(g),ee.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(g.pushLight(G),G.castShadow&&g.pushShadow(G))}),C!==ee&&C.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(g.pushLight(G),G.castShadow&&g.pushShadow(G))}),g.setupLights();const te=new Set;return C.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const Te=G.material;if(Te)if(Array.isArray(Te))for(let Se=0;Se<Te.length;Se++){const Ge=Te[Se];_t(Ge,ee,G),te.add(Ge)}else _t(Te,ee,G),te.add(Te)}),L.pop(),g=null,te},this.compileAsync=function(C,H,ee=null){const te=this.compile(C,H,ee);return new Promise(G=>{function Te(){if(te.forEach(function(Se){Ye.get(Se).currentProgram.isReady()&&te.delete(Se)}),te.size===0){G(C);return}setTimeout(Te,10)}ht.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Sn=null;function mn(C){Sn&&Sn(C)}function ns(){Ti.stop()}function Yi(){Ti.start()}const Ti=new ig;Ti.setAnimationLoop(mn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(C){Sn=C,ie.setAnimationLoop(C),C===null?Ti.stop():Ti.start()},ie.addEventListener("sessionstart",ns),ie.addEventListener("sessionend",Yi),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(H),H=ie.getCamera()),C.isScene===!0&&C.onBeforeRender(R,C,H,j),g=ut.get(C,L.length),g.init(H),L.push(g),Ae.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),$.setFromProjectionMatrix(Ae),Me=this.localClippingEnabled,ue=ye.init(this.clippingPlanes,Me),_=Ne.get(C,U.length),_.init(),U.push(_),ie.enabled===!0&&ie.isPresenting===!0){const Te=R.xr.getDepthSensingMesh();Te!==null&&wi(Te,H,-1/0,R.sortObjects)}wi(C,H,0,R.sortObjects),_.finish(),R.sortObjects===!0&&_.sort(ae,se),pt=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,pt&&Qe.addToRenderList(_,C),this.info.render.frame++,ue===!0&&ye.beginShadows();const ee=g.state.shadowsArray;Oe.render(ee,C,H),ue===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=_.opaque,G=_.transmissive;if(g.setupLights(),H.isArrayCamera){const Te=H.cameras;if(G.length>0)for(let Se=0,Ge=Te.length;Se<Ge;Se++){const Be=Te[Se];Ar(te,G,C,Be)}pt&&Qe.render(C);for(let Se=0,Ge=Te.length;Se<Ge;Se++){const Be=Te[Se];wr(_,C,Be,Be.viewport)}}else G.length>0&&Ar(te,G,C,H),pt&&Qe.render(C),wr(_,C,H);j!==null&&(P.updateMultisampleRenderTarget(j),P.updateRenderTargetMipmap(j)),C.isScene===!0&&C.onAfterRender(R,C,H),Et.resetDefaultState(),b=-1,T=null,L.pop(),L.length>0?(g=L[L.length-1],ue===!0&&ye.setGlobalState(R.clippingPlanes,g.state.camera)):g=null,U.pop(),U.length>0?_=U[U.length-1]:_=null};function wi(C,H,ee,te){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)ee=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)g.pushLight(C),C.castShadow&&g.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||$.intersectsSprite(C)){te&&Ze.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ae);const Se=ce.update(C),Ge=C.material;Ge.visible&&_.push(C,Se,Ge,ee,Ze.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||$.intersectsObject(C))){const Se=ce.update(C),Ge=C.material;if(te&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ze.copy(C.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ze.copy(Se.boundingSphere.center)),Ze.applyMatrix4(C.matrixWorld).applyMatrix4(Ae)),Array.isArray(Ge)){const Be=Se.groups;for(let et=0,nt=Be.length;et<nt;et++){const We=Be[et],gt=Ge[We.materialIndex];gt&&gt.visible&&_.push(C,Se,gt,ee,Ze.z,We)}}else Ge.visible&&_.push(C,Se,Ge,ee,Ze.z,null)}}const Te=C.children;for(let Se=0,Ge=Te.length;Se<Ge;Se++)wi(Te[Se],H,ee,te)}function wr(C,H,ee,te){const G=C.opaque,Te=C.transmissive,Se=C.transparent;g.setupLightsView(ee),ue===!0&&ye.setGlobalState(R.clippingPlanes,ee),te&&qe.viewport(k.copy(te)),G.length>0&&qi(G,H,ee),Te.length>0&&qi(Te,H,ee),Se.length>0&&qi(Se,H,ee),qe.buffers.depth.setTest(!0),qe.buffers.depth.setMask(!0),qe.buffers.color.setMask(!0),qe.setPolygonOffset(!1)}function Ar(C,H,ee,te){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[te.id]===void 0&&(g.state.transmissionRenderTarget[te.id]=new Mi(1,1,{generateMipmaps:!0,type:ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float")?Qs:Xi,minFilter:$r,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace}));const Te=g.state.transmissionRenderTarget[te.id],Se=te.viewport||k;Te.setSize(Se.z,Se.w);const Ge=R.getRenderTarget();R.setRenderTarget(Te),R.getClearColor(fe),he=R.getClearAlpha(),he<1&&R.setClearColor(16777215,.5),R.clear(),pt&&Qe.render(ee);const Be=R.toneMapping;R.toneMapping=Er;const et=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),g.setupLightsView(te),ue===!0&&ye.setGlobalState(R.clippingPlanes,te),qi(C,ee,te),P.updateMultisampleRenderTarget(Te),P.updateRenderTargetMipmap(Te),ht.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let We=0,gt=H.length;We<gt;We++){const Mt=H[We],mt=Mt.object,on=Mt.geometry,st=Mt.material,je=Mt.group;if(st.side===Vi&&mt.layers.test(te.layers)){const ei=st.side;st.side=Dn,st.needsUpdate=!0,Yo(mt,ee,te,on,st,je),st.side=ei,st.needsUpdate=!0,nt=!0}}nt===!0&&(P.updateMultisampleRenderTarget(Te),P.updateRenderTargetMipmap(Te))}R.setRenderTarget(Ge),R.setClearColor(fe,he),et!==void 0&&(te.viewport=et),R.toneMapping=Be}function qi(C,H,ee){const te=H.isScene===!0?H.overrideMaterial:null;for(let G=0,Te=C.length;G<Te;G++){const Se=C[G],Ge=Se.object,Be=Se.geometry,et=te===null?Se.material:te,nt=Se.group;Ge.layers.test(ee.layers)&&Yo(Ge,H,ee,Be,et,nt)}}function Yo(C,H,ee,te,G,Te){C.onBeforeRender(R,H,ee,te,G,Te),C.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),G.onBeforeRender(R,H,ee,te,C,Te),G.transparent===!0&&G.side===Vi&&G.forceSinglePass===!1?(G.side=Dn,G.needsUpdate=!0,R.renderBufferDirect(ee,H,te,G,C,Te),G.side=Tr,G.needsUpdate=!0,R.renderBufferDirect(ee,H,te,G,C,Te),G.side=Vi):R.renderBufferDirect(ee,H,te,G,C,Te),C.onAfterRender(R,H,ee,te,G,Te)}function is(C,H,ee){H.isScene!==!0&&(H=At);const te=Ye.get(C),G=g.state.lights,Te=g.state.shadowsArray,Se=G.state.version,Ge=He.getParameters(C,G.state,Te,H,ee),Be=He.getProgramCacheKey(Ge);let et=te.programs;te.environment=C.isMeshStandardMaterial?H.environment:null,te.fog=H.fog,te.envMap=(C.isMeshStandardMaterial?K:E).get(C.envMap||te.environment),te.envMapRotation=te.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,et===void 0&&(C.addEventListener("dispose",rt),et=new Map,te.programs=et);let nt=et.get(Be);if(nt!==void 0){if(te.currentProgram===nt&&te.lightsStateVersion===Se)return mi(C,Ge),nt}else Ge.uniforms=He.getUniforms(C),C.onBeforeCompile(Ge,R),nt=He.acquireProgram(Ge,Be),et.set(Be,nt),te.uniforms=Ge.uniforms;const We=te.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(We.clippingPlanes=ye.uniform),mi(C,Ge),te.needsLights=Nl(C),te.lightsStateVersion=Se,te.needsLights&&(We.ambientLightColor.value=G.state.ambient,We.lightProbe.value=G.state.probe,We.directionalLights.value=G.state.directional,We.directionalLightShadows.value=G.state.directionalShadow,We.spotLights.value=G.state.spot,We.spotLightShadows.value=G.state.spotShadow,We.rectAreaLights.value=G.state.rectArea,We.ltc_1.value=G.state.rectAreaLTC1,We.ltc_2.value=G.state.rectAreaLTC2,We.pointLights.value=G.state.point,We.pointLightShadows.value=G.state.pointShadow,We.hemisphereLights.value=G.state.hemi,We.directionalShadowMap.value=G.state.directionalShadowMap,We.directionalShadowMatrix.value=G.state.directionalShadowMatrix,We.spotShadowMap.value=G.state.spotShadowMap,We.spotLightMatrix.value=G.state.spotLightMatrix,We.spotLightMap.value=G.state.spotLightMap,We.pointShadowMap.value=G.state.pointShadowMap,We.pointShadowMatrix.value=G.state.pointShadowMatrix),te.currentProgram=nt,te.uniformsList=null,nt}function qo(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=Rl.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function mi(C,H){const ee=Ye.get(C);ee.outputColorSpace=H.outputColorSpace,ee.batching=H.batching,ee.batchingColor=H.batchingColor,ee.instancing=H.instancing,ee.instancingColor=H.instancingColor,ee.instancingMorph=H.instancingMorph,ee.skinning=H.skinning,ee.morphTargets=H.morphTargets,ee.morphNormals=H.morphNormals,ee.morphColors=H.morphColors,ee.morphTargetsCount=H.morphTargetsCount,ee.numClippingPlanes=H.numClippingPlanes,ee.numIntersection=H.numClipIntersection,ee.vertexAlphas=H.vertexAlphas,ee.vertexTangents=H.vertexTangents,ee.toneMapping=H.toneMapping}function Ko(C,H,ee,te,G){H.isScene!==!0&&(H=At),P.resetTextureUnits();const Te=H.fog,Se=te.isMeshStandardMaterial?H.environment:null,Ge=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Js,Be=(te.isMeshStandardMaterial?K:E).get(te.envMap||Se),et=te.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,nt=!!ee.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),We=!!ee.morphAttributes.position,gt=!!ee.morphAttributes.normal,Mt=!!ee.morphAttributes.color;let mt=Er;te.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(mt=R.toneMapping);const on=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,st=on!==void 0?on.length:0,je=Ye.get(te),ei=g.state.lights;if(ue===!0&&(Me===!0||C!==T)){const gn=C===T&&te.id===b;ye.setState(te,C,gn)}let yt=!1;te.version===je.__version?(je.needsLights&&je.lightsStateVersion!==ei.state.version||je.outputColorSpace!==Ge||G.isBatchedMesh&&je.batching===!1||!G.isBatchedMesh&&je.batching===!0||G.isBatchedMesh&&je.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&je.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&je.instancing===!1||!G.isInstancedMesh&&je.instancing===!0||G.isSkinnedMesh&&je.skinning===!1||!G.isSkinnedMesh&&je.skinning===!0||G.isInstancedMesh&&je.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&je.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&je.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&je.instancingMorph===!1&&G.morphTexture!==null||je.envMap!==Be||te.fog===!0&&je.fog!==Te||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ye.numPlanes||je.numIntersection!==ye.numIntersection)||je.vertexAlphas!==et||je.vertexTangents!==nt||je.morphTargets!==We||je.morphNormals!==gt||je.morphColors!==Mt||je.toneMapping!==mt||je.morphTargetsCount!==st)&&(yt=!0):(yt=!0,je.__version=te.version);let an=je.currentProgram;yt===!0&&(an=is(te,H,G));let ti=!1,Yt=!1,gi=!1;const Pt=an.getUniforms(),Bn=je.uniforms;if(qe.useProgram(an.program)&&(ti=!0,Yt=!0,gi=!0),te.id!==b&&(b=te.id,Yt=!0),ti||T!==C){qe.buffers.depth.getReversed()?(ve.copy(C.projectionMatrix),Kv(ve),$v(ve),Pt.setValue(W,"projectionMatrix",ve)):Pt.setValue(W,"projectionMatrix",C.projectionMatrix),Pt.setValue(W,"viewMatrix",C.matrixWorldInverse);const Vn=Pt.map.cameraPosition;Vn!==void 0&&Vn.setValue(W,Ue.setFromMatrixPosition(C.matrixWorld)),ct.logarithmicDepthBuffer&&Pt.setValue(W,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Pt.setValue(W,"isOrthographic",C.isOrthographicCamera===!0),T!==C&&(T=C,Yt=!0,gi=!0)}if(G.isSkinnedMesh){Pt.setOptional(W,G,"bindMatrix"),Pt.setOptional(W,G,"bindMatrixInverse");const gn=G.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),Pt.setValue(W,"boneTexture",gn.boneTexture,P))}G.isBatchedMesh&&(Pt.setOptional(W,G,"batchingTexture"),Pt.setValue(W,"batchingTexture",G._matricesTexture,P),Pt.setOptional(W,G,"batchingIdTexture"),Pt.setValue(W,"batchingIdTexture",G._indirectTexture,P),Pt.setOptional(W,G,"batchingColorTexture"),G._colorsTexture!==null&&Pt.setValue(W,"batchingColorTexture",G._colorsTexture,P));const Ai=ee.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&Je.update(G,ee,an),(Yt||je.receiveShadow!==G.receiveShadow)&&(je.receiveShadow=G.receiveShadow,Pt.setValue(W,"receiveShadow",G.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Bn.envMap.value=Be,Bn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&H.environment!==null&&(Bn.envMapIntensity.value=H.environmentIntensity),Yt&&(Pt.setValue(W,"toneMappingExposure",R.toneMappingExposure),je.needsLights&&$o(Bn,gi),Te&&te.fog===!0&&Ce.refreshFogUniforms(Bn,Te),Ce.refreshMaterialUniforms(Bn,te,z,le,g.state.transmissionRenderTarget[C.id]),Rl.upload(W,qo(je),Bn,P)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Rl.upload(W,qo(je),Bn,P),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Pt.setValue(W,"center",G.center),Pt.setValue(W,"modelViewMatrix",G.modelViewMatrix),Pt.setValue(W,"normalMatrix",G.normalMatrix),Pt.setValue(W,"modelMatrix",G.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const gn=te.uniformsGroups;for(let Vn=0,Mn=gn.length;Vn<Mn;Vn++){const Zo=gn[Vn];V.update(Zo,an),V.bind(Zo,an)}}return an}function $o(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function Nl(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(C,H,ee){Ye.get(C.texture).__webglTexture=H,Ye.get(C.depthTexture).__webglTexture=ee;const te=Ye.get(C);te.__hasExternalTextures=!0,te.__autoAllocateDepthBuffer=ee===void 0,te.__autoAllocateDepthBuffer||ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,H){const ee=Ye.get(C);ee.__webglFramebuffer=H,ee.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(C,H=0,ee=0){j=C,N=H,F=ee;let te=!0,G=null,Te=!1,Se=!1;if(C){const Be=Ye.get(C);if(Be.__useDefaultFramebuffer!==void 0)qe.bindFramebuffer(W.FRAMEBUFFER,null),te=!1;else if(Be.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(Be.__hasExternalTextures)P.rebindTextures(C,Ye.get(C.texture).__webglTexture,Ye.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const We=C.depthTexture;if(Be.__boundDepthTexture!==We){if(We!==null&&Ye.has(We)&&(C.width!==We.image.width||C.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const et=C.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(Se=!0);const nt=Ye.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(nt[H])?G=nt[H][ee]:G=nt[H],Te=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?G=Ye.get(C).__webglMultisampledFramebuffer:Array.isArray(nt)?G=nt[ee]:G=nt,k.copy(C.viewport),re.copy(C.scissor),Q=C.scissorTest}else k.copy(I).multiplyScalar(z).floor(),re.copy(ne).multiplyScalar(z).floor(),Q=Ie;if(qe.bindFramebuffer(W.FRAMEBUFFER,G)&&te&&qe.drawBuffers(C,G),qe.viewport(k),qe.scissor(re),qe.setScissorTest(Q),Te){const Be=Ye.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+H,Be.__webglTexture,ee)}else if(Se){const Be=Ye.get(C.texture),et=H||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Be.__webglTexture,ee||0,et)}b=-1},this.readRenderTargetPixels=function(C,H,ee,te,G,Te,Se){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=Ye.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Se!==void 0&&(Ge=Ge[Se]),Ge){qe.bindFramebuffer(W.FRAMEBUFFER,Ge);try{const Be=C.texture,et=Be.format,nt=Be.type;if(!ct.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-te&&ee>=0&&ee<=C.height-G&&W.readPixels(H,ee,te,G,it.convert(et),it.convert(nt),Te)}finally{const Be=j!==null?Ye.get(j).__webglFramebuffer:null;qe.bindFramebuffer(W.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(C,H,ee,te,G,Te,Se){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=Ye.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Se!==void 0&&(Ge=Ge[Se]),Ge){const Be=C.texture,et=Be.format,nt=Be.type;if(!ct.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=C.width-te&&ee>=0&&ee<=C.height-G){qe.bindFramebuffer(W.FRAMEBUFFER,Ge);const We=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,We),W.bufferData(W.PIXEL_PACK_BUFFER,Te.byteLength,W.STREAM_READ),W.readPixels(H,ee,te,G,it.convert(et),it.convert(nt),0);const gt=j!==null?Ye.get(j).__webglFramebuffer:null;qe.bindFramebuffer(W.FRAMEBUFFER,gt);const Mt=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await qv(W,Mt,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,We),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Te),W.deleteBuffer(We),W.deleteSync(Mt),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,H=null,ee=0){C.isTexture!==!0&&(zo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,C=arguments[1]);const te=Math.pow(2,-ee),G=Math.floor(C.image.width*te),Te=Math.floor(C.image.height*te),Se=H!==null?H.x:0,Ge=H!==null?H.y:0;P.setTexture2D(C,0),W.copyTexSubImage2D(W.TEXTURE_2D,ee,0,0,Se,Ge,G,Te),qe.unbindTexture()},this.copyTextureToTexture=function(C,H,ee=null,te=null,G=0){C.isTexture!==!0&&(zo("WebGLRenderer: copyTextureToTexture function signature has changed."),te=arguments[0]||null,C=arguments[1],H=arguments[2],G=arguments[3]||0,ee=null);let Te,Se,Ge,Be,et,nt,We,gt,Mt;const mt=C.isCompressedTexture?C.mipmaps[G]:C.image;ee!==null?(Te=ee.max.x-ee.min.x,Se=ee.max.y-ee.min.y,Ge=ee.isBox3?ee.max.z-ee.min.z:1,Be=ee.min.x,et=ee.min.y,nt=ee.isBox3?ee.min.z:0):(Te=mt.width,Se=mt.height,Ge=mt.depth||1,Be=0,et=0,nt=0),te!==null?(We=te.x,gt=te.y,Mt=te.z):(We=0,gt=0,Mt=0);const on=it.convert(H.format),st=it.convert(H.type);let je;H.isData3DTexture?(P.setTexture3D(H,0),je=W.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(P.setTexture2DArray(H,0),je=W.TEXTURE_2D_ARRAY):(P.setTexture2D(H,0),je=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,H.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,H.unpackAlignment);const ei=W.getParameter(W.UNPACK_ROW_LENGTH),yt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),an=W.getParameter(W.UNPACK_SKIP_PIXELS),ti=W.getParameter(W.UNPACK_SKIP_ROWS),Yt=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,mt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,mt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Be),W.pixelStorei(W.UNPACK_SKIP_ROWS,et),W.pixelStorei(W.UNPACK_SKIP_IMAGES,nt);const gi=C.isDataArrayTexture||C.isData3DTexture,Pt=H.isDataArrayTexture||H.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const Bn=Ye.get(C),Ai=Ye.get(H),gn=Ye.get(Bn.__renderTarget),Vn=Ye.get(Ai.__renderTarget);qe.bindFramebuffer(W.READ_FRAMEBUFFER,gn.__webglFramebuffer),qe.bindFramebuffer(W.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Mn=0;Mn<Ge;Mn++)gi&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ye.get(C).__webglTexture,G,nt+Mn),C.isDepthTexture?(Pt&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ye.get(H).__webglTexture,G,Mt+Mn),W.blitFramebuffer(Be,et,Te,Se,We,gt,Te,Se,W.DEPTH_BUFFER_BIT,W.NEAREST)):Pt?W.copyTexSubImage3D(je,G,We,gt,Mt+Mn,Be,et,Te,Se):W.copyTexSubImage2D(je,G,We,gt,Mt+Mn,Be,et,Te,Se);qe.bindFramebuffer(W.READ_FRAMEBUFFER,null),qe.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Pt?C.isDataTexture||C.isData3DTexture?W.texSubImage3D(je,G,We,gt,Mt,Te,Se,Ge,on,st,mt.data):H.isCompressedArrayTexture?W.compressedTexSubImage3D(je,G,We,gt,Mt,Te,Se,Ge,on,mt.data):W.texSubImage3D(je,G,We,gt,Mt,Te,Se,Ge,on,st,mt):C.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,G,We,gt,Te,Se,on,st,mt.data):C.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,G,We,gt,mt.width,mt.height,on,mt.data):W.texSubImage2D(W.TEXTURE_2D,G,We,gt,Te,Se,on,st,mt);W.pixelStorei(W.UNPACK_ROW_LENGTH,ei),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,yt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,an),W.pixelStorei(W.UNPACK_SKIP_ROWS,ti),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Yt),G===0&&H.generateMipmaps&&W.generateMipmap(je),qe.unbindTexture()},this.copyTextureToTexture3D=function(C,H,ee=null,te=null,G=0){return C.isTexture!==!0&&(zo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ee=arguments[0]||null,te=arguments[1]||null,C=arguments[2],H=arguments[3],G=arguments[4]||0),zo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,H,ee,te,G)},this.initRenderTarget=function(C){Ye.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),qe.unbindTexture()},this.resetState=function(){N=0,F=0,j=null,qe.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=xt._getDrawingBufferColorSpace(e),n.unpackColorSpace=xt._getUnpackColorSpace()}}class Yc extends zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Tm{constructor(e=1,n=0,r=0){return this.radius=e,this.phi=n,this.theta=r,this}set(e,n,r){return this.radius=e,this.phi=n,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,r){return this.radius=Math.sqrt(e*e+n*n+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(yn(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class oE extends es{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zf);const wm={type:"change"},qf={type:"start"},cg={type:"end"},Sl=new Ym,Am=new yr,aE=Math.cos(70*jv.DEG2RAD),$t=new Z,Pn=2*Math.PI,Rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qc=1e-6;class lE extends oE{constructor(e,n=null){super(e,n),this.state=Rt.NONE,this.enabled=!0,this.target=new Z,this.cursor=new Z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hs.ROTATE,MIDDLE:Hs.DOLLY,RIGHT:Hs.PAN},this.touches={ONE:Bs.ROTATE,TWO:Bs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Z,this._lastQuaternion=new Jr,this._lastTargetPosition=new Z,this._quat=new Jr().setFromUnitVectors(e.up,new Z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Tm,this._sphericalDelta=new Tm,this._scale=1,this._panOffset=new Z,this._rotateStart=new at,this._rotateEnd=new at,this._rotateDelta=new at,this._panStart=new at,this._panEnd=new at,this._panDelta=new at,this._dollyStart=new at,this._dollyEnd=new at,this._dollyDelta=new at,this._dollyDirection=new Z,this._mouse=new at,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=cE.bind(this),this._onPointerDown=uE.bind(this),this._onPointerUp=fE.bind(this),this._onContextMenu=vE.bind(this),this._onMouseWheel=pE.bind(this),this._onKeyDown=mE.bind(this),this._onTouchStart=gE.bind(this),this._onTouchMove=_E.bind(this),this._onMouseDown=dE.bind(this),this._onMouseMove=hE.bind(this),this._interceptControlDown=xE.bind(this),this._interceptControlUp=yE.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(wm),this.update(),this.state=Rt.NONE}update(e=null){const n=this.object.position;$t.copy(n).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===Rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(r)&&isFinite(a)&&(r<-Math.PI?r+=Pn:r>Math.PI&&(r-=Pn),a<-Math.PI?a+=Pn:a>Math.PI&&(a-=Pn),r<=a?this._spherical.theta=Math.max(r,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+a)/2?Math.max(r,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=f!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),n.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const d=$t.length();f=this._clampDistance(d*this._scale);const p=d-f;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),u=!!p}else if(this.object.isOrthographicCamera){const d=new Z(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=p!==this.object.zoom;const m=new Z(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),f=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Sl.origin.copy(this.object.position),Sl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sl.direction))<aE?this.object.lookAt(this.target):(Am.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sl.intersectPlane(Am,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>qc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qc||this._lastTargetPosition.distanceToSquared(this.target)>qc?(this.dispatchEvent(wm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Pn/60*this.autoRotateSpeed*e:Pn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){$t.setFromMatrixColumn(n,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,n){this.screenSpacePanning===!0?$t.setFromMatrixColumn(n,1):($t.setFromMatrixColumn(n,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,n){const r=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;$t.copy(a).sub(this.target);let u=$t.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*u/r.clientHeight,this.object.matrix),this._panUp(2*n*u/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),a=e-r.left,u=n-r.top,f=r.width,d=r.height;this._mouse.x=a/f*2-1,this._mouse.y=-(u/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Pn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Pn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateStart.set(r,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panStart.set(r,a)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,u=Math.sqrt(r*r+a*a);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),a=.5*(e.pageX+r.x),u=.5*(e.pageY+r.y);this._rotateEnd.set(a,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Pn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Pn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panEnd.set(r,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),r=e.pageX-n.x,a=e.pageY-n.y,u=Math.sqrt(r*r+a*a);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+n.x)*.5,d=(e.pageY+n.y)*.5;this._updateZoomParameters(f,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new at,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function uE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function cE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function fE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(cg),this.state=Rt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function dE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Rt.DOLLY;break;case Hs.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Rt.ROTATE}break;case Hs.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Rt.PAN}break;default:this.state=Rt.NONE}this.state!==Rt.NONE&&this.dispatchEvent(qf)}function hE(s){switch(this.state){case Rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function pE(s){this.enabled===!1||this.enableZoom===!1||this.state!==Rt.NONE||(s.preventDefault(),this.dispatchEvent(qf),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(cg))}function mE(s){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(s)}function gE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Bs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Rt.TOUCH_ROTATE;break;case Bs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Rt.TOUCH_PAN;break;default:this.state=Rt.NONE}break;case 2:switch(this.touches.TWO){case Bs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Rt.TOUCH_DOLLY_PAN;break;case Bs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Rt.TOUCH_DOLLY_ROTATE;break;default:this.state=Rt.NONE}break;default:this.state=Rt.NONE}this.state!==Rt.NONE&&this.dispatchEvent(qf)}function _E(s){switch(this._trackPointer(s),this.state){case Rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Rt.NONE}}function vE(s){this.enabled!==!1&&s.preventDefault()}function xE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Kc=`// fullscreen.vert.glsl - High-performance fullscreen quad/triangle vertex shader\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position.xy, 0.0, 1.0);\r
}\r
`,SE=`// raytracer.frag.glsl - Physical Schwarzschild Null Geodesic Raytracer\r
precision highp float;\r
\r
varying vec2 vUv;\r
\r
// Camera & Frame Uniforms\r
uniform vec3 uCameraPos;\r
uniform mat4 uCameraWorldMatrix;\r
uniform float uFov;\r
uniform vec2 uResolution;\r
uniform float uTime;\r
uniform int uMaxSteps;\r
uniform int uDebugMode;\r
\r
// Physical Parameters (from 21 Reactive Parameters)\r
uniform float uDiskInner;         // e.g. 2.6 rs\r
uniform float uDiskOuter;         // e.g. 12.5 rs\r
uniform float uDiskThickness;     // e.g. 0.08 rs\r
uniform float uDiskTemp;          // e.g. 6500 K\r
uniform float uDiskEmission;      // e.g. 1.5\r
uniform float uVelocityFactor;     // e.g. 1.0\r
uniform float uTurbAmp;           // e.g. 0.85\r
uniform float uTurbSpeed;         // e.g. 1.0\r
uniform float uStarDensity;       // e.g. 1.0\r
uniform float uGalaxyBrightness;  // e.g. 1.3\r
\r
// Constants of Schwarzschild Geometry (Natural Units: c = 1, G = 1, M = 0.5 => rs = 1.0)\r
const float RS = 1.0;\r
const float HORIZON_R = 1.002;\r
const float ESCAPE_R = 40.0;\r
const float PI = 3.14159265358979323846;\r
\r
// --- Procedural 3D Simplex & Value Noise ---\r
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\r
\r
float snoise(vec3 v) {\r
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);\r
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\r
\r
  vec3 i  = floor(v + dot(v, C.yyy));\r
  vec3 x0 = v - i + dot(i, C.xxx);\r
\r
  vec3 g = step(x0.yzx, x0.xyz);\r
  vec3 l = 1.0 - g;\r
  vec3 i1 = min(g.xyz, l.zxy);\r
  vec3 i2 = max(g.xyz, l.zxy);\r
\r
  vec3 x1 = x0 - i1 + C.xxx;\r
  vec3 x2 = x0 - i2 + C.yyy;\r
  vec3 x3 = x0 - D.yyy;\r
\r
  i = mod289(i);\r
  vec4 p = permute(permute(permute(\r
             i.z + vec4(0.0, i1.z, i2.z, 1.0))\r
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))\r
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));\r
\r
  float n_ = 0.142857142857;\r
  vec3  ns = n_ * D.wyz - D.xzx;\r
\r
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r
\r
  vec4 x_ = floor(j * ns.z);\r
  vec4 y_ = floor(j - 7.0 * x_);\r
\r
  vec4 x = x_ * ns.x + ns.yyyy;\r
  vec4 y = y_ * ns.x + ns.yyyy;\r
  vec4 h = 1.0 - abs(x) - abs(y);\r
\r
  vec4 b0 = vec4(x.xy, y.xy);\r
  vec4 b1 = vec4(x.zw, y.zw);\r
\r
  vec4 s0 = floor(b0) * 2.0 + 1.0;\r
  vec4 s1 = floor(b1) * 2.0 + 1.0;\r
  vec4 sh = -step(h, vec4(0.0));\r
\r
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\r
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\r
\r
  vec3 p0 = vec3(a0.xy, h.x);\r
  vec3 p1 = vec3(a0.zw, h.y);\r
  vec3 p2 = vec3(a1.xy, h.z);\r
  vec3 p3 = vec3(a1.zw, h.w);\r
\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
\r
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\r
  m = m * m;\r
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));\r
}\r
\r
// Multi-octave fractal noise\r
float fbm(vec3 p) {\r
  float f = 0.0;\r
  float amp = 0.5;\r
  for (int i = 0; i < 4; i++) {\r
    f += amp * snoise(p);\r
    p = p * 2.02 + vec3(0.15, 0.28, 0.37);\r
    amp *= 0.5;\r
  }\r
  return f;\r
}\r
\r
// --- Planck Blackbody Spectrum Approximation ---\r
// Maps Kelvin temperature (1000K - 20000K) to linear RGB radiant color\r
vec3 blackbody(float kelvin) {\r
  float T = kelvin / 100.0;\r
  vec3 color;\r
\r
  // Red\r
  if (T <= 66.0) {\r
    color.r = 1.0;\r
  } else {\r
    color.r = clamp(pow(T - 60.0, -0.1332047592) * 1.292936186, 0.0, 1.0);\r
  }\r
\r
  // Green\r
  if (T <= 66.0) {\r
    color.g = clamp(0.390081578769 * log(T) - 0.631841443788, 0.0, 1.0);\r
  } else {\r
    color.g = clamp(pow(T - 60.0, -0.0755148492) * 1.129890861, 0.0, 1.0);\r
  }\r
\r
  // Blue\r
  if (T >= 66.0) {\r
    color.b = 1.0;\r
  } else if (T <= 19.0) {\r
    color.b = 0.0;\r
  } else {\r
    color.b = clamp(0.54320678911 * log(T - 10.0) - 1.19625408914, 0.0, 1.0);\r
  }\r
\r
  // Luminance scaling via Stefan-Boltzmann (normalized around 6500K)\r
  float normT = kelvin / 6500.0;\r
  float intensity = normT * normT * normT;\r
  return color * intensity;\r
}\r
\r
// Turbo Colormap for Step Cost Heatmap (Mode 1)\r
vec3 turboColormap(float x) {\r
  x = clamp(x, 0.0, 1.0);\r
  const vec4 kRedVec4 = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);\r
  const vec4 kGreenVec4 = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);\r
  const vec4 kBlueVec4 = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);\r
  const vec2 kRedVec2 = vec2(-152.94239396, 59.28637943);\r
  const vec2 kGreenVec2 = vec2(4.27729857, 2.82956604);\r
  const vec2 kBlueVec2 = vec2(-89.90310912, 27.34824973);\r
\r
  vec4 v4 = vec4(1.0, x, x * x, x * x * x);\r
  vec2 v2 = v4.zw * v4.z;\r
\r
  return clamp(vec3(\r
    dot(v4, kRedVec4) + dot(v2, kRedVec2),\r
    dot(v4, kGreenVec4) + dot(v2, kGreenVec2),\r
    dot(v4, kBlueVec4) + dot(v2, kBlueVec2)\r
  ), 0.0, 1.0);\r
}\r
\r
// --- Procedural Celestial Sphere (Milky Way & Stars) ---\r
// Generates physical cosmic background without external textures\r
vec3 sampleCelestialSphere(vec3 dir) {\r
  // Galactic orientation vectors\r
  vec3 galPole = normalize(vec3(0.42, 0.78, 0.45));\r
  vec3 galCore = normalize(vec3(-0.75, 0.22, 0.62));\r
\r
  float galLat = dot(dir, galPole);\r
  float galPlaneDist = abs(galLat);\r
\r
  // Milky Way Galactic Bulge & Core\r
  float coreAngle = dot(dir, galCore);\r
  float coreGlow = pow(max(coreAngle, 0.0), 12.0) * 4.5 + pow(max(coreAngle, 0.0), 40.0) * 12.0;\r
  vec3 coreColor = vec3(1.3, 1.05, 0.75) * coreGlow;\r
\r
  // Milky Way Galactic Disc\r
  float discIntensity = exp(-galPlaneDist * 8.5) * 1.8;\r
  float discFbm = fbm(dir * 5.5 + vec3(1.2, 4.3, 2.1));\r
  float dustLane = smoothstep(0.02, 0.18, abs(galLat + 0.03 * snoise(dir * 8.0)));\r
  vec3 discColor = vec3(0.85, 0.9, 1.1) * discIntensity * (0.6 + 0.8 * discFbm) * (0.2 + 0.8 * dustLane);\r
\r
  vec3 milkyWay = (coreColor + discColor) * uGalaxyBrightness;\r
\r
  // Procedural Starfield using cellular/Voronoi noise\r
  vec3 starColor = vec3(0.0);\r
  vec3 pStar = dir * 160.0 * uStarDensity;\r
  vec3 iStar = floor(pStar);\r
  vec3 fStar = fract(pStar);\r
\r
  float minDist = 1.0;\r
  vec3 starFeaturePoint = vec3(0.0);\r
  for (int z = -1; z <= 1; z++) {\r
    for (int y = -1; y <= 1; y++) {\r
      for (int x = -1; x <= 1; x++) {\r
        vec3 neighbor = vec3(float(x), float(y), float(z));\r
        vec3 hashP = iStar + neighbor;\r
        // Deterministic pseudo-random offset\r
        vec3 cellHash = fract(sin(vec3(\r
          dot(hashP, vec3(127.1, 311.7, 74.7)),\r
          dot(hashP, vec3(269.5, 183.3, 246.1)),\r
          dot(hashP, vec3(113.5, 271.9, 124.6))\r
        )) * 43758.5453123);\r
\r
        vec3 diff = neighbor + cellHash - fStar;\r
        float dist = length(diff);\r
        if (dist < minDist) {\r
          minDist = dist;\r
          starFeaturePoint = hashP + cellHash;\r
        }\r
      }\r
    }\r
  }\r
\r
  // Star brightness power-law distribution\r
  float starSeed = fract(sin(dot(starFeaturePoint, vec3(12.9898, 78.233, 45.164))) * 43758.5453);\r
  if (starSeed > 0.82) {\r
    float starRadius = 0.08 + 0.12 * (starSeed - 0.82) / 0.18;\r
    float starIntensity = smoothstep(starRadius, 0.0, minDist);\r
    float starMag = pow((starSeed - 0.82) / 0.18, 5.0) * 7.0 + 0.4;\r
\r
    // Spectral star temperature: blue giants, solar yellow, red dwarfs\r
    vec3 spectralColor;\r
    float specSeed = fract(starSeed * 37.19);\r
    if (specSeed > 0.75) {\r
      spectralColor = vec3(0.8, 0.95, 1.4); // Blue hot O/B star\r
    } else if (specSeed > 0.35) {\r
      spectralColor = vec3(1.1, 1.05, 0.9); // White/yellow G star\r
    } else {\r
      spectralColor = vec3(1.3, 0.75, 0.5); // Cool red M dwarf\r
    }\r
\r
    // Subtle 4-ray diffraction spike on brightest stars\r
    vec3 rayDir = fract(pStar) - 0.5;\r
    float spike = max(exp(-abs(rayDir.x) * 45.0) * exp(-abs(rayDir.y) * 4.0),\r
                      exp(-abs(rayDir.y) * 45.0) * exp(-abs(rayDir.x) * 4.0));\r
    starColor = spectralColor * (starIntensity * starMag + spike * starMag * 0.3);\r
  }\r
\r
  return milkyWay + starColor;\r
}\r
\r
// --- Schwarzschild Null Geodesic Acceleration ---\r
// Exact vector ODE: a = d^2x/dlambda^2 = - (3 * M * |x x v|^2 / r^5) * x\r
// where rs = 2M => 3M = 1.5 * rs\r
vec3 getGeodesicAccel(vec3 pos, vec3 vel) {\r
  float r2 = dot(pos, pos);\r
  float r = sqrt(r2);\r
  float r5 = r2 * r2 * r;\r
\r
  vec3 h = cross(pos, vel); // Conserved specific angular momentum vector\r
  float h2 = dot(h, h);\r
\r
  // Exact GR photon deflection acceleration\r
  return (-1.5 * RS * h2 / max(r5, 0.0001)) * pos;\r
}\r
\r
// 4th-Order Runge-Kutta (RK4) Step for Null Geodesic\r
void stepRK4(inout vec3 p, inout vec3 v, float h) {\r
  vec3 k1_x = v;\r
  vec3 k1_v = getGeodesicAccel(p, v);\r
\r
  vec3 p2 = p + 0.5 * h * k1_x;\r
  vec3 v2 = v + 0.5 * h * k1_v;\r
  vec3 k2_x = v2;\r
  vec3 k2_v = getGeodesicAccel(p2, v2);\r
\r
  vec3 p3 = p + 0.5 * h * k2_x;\r
  vec3 v3 = v + 0.5 * h * k2_v;\r
  vec3 k3_x = v3;\r
  vec3 k3_v = getGeodesicAccel(p3, v3);\r
\r
  vec3 p4 = p + h * k3_x;\r
  vec3 v4 = v + h * k3_v;\r
  vec3 k4_x = v4;\r
  vec3 k4_v = getGeodesicAccel(p4, v4);\r
\r
  p += (h / 6.0) * (k1_x + 2.0 * k2_x + 2.0 * k3_x + k4_x);\r
  v += (h / 6.0) * (k1_v + 2.0 * k2_v + 2.0 * k3_v + k4_v);\r
}\r
\r
// Primary Camera Ray Generation\r
vec3 getPrimaryRayDir(vec2 screenCoord, vec3 camPos, mat4 camWorldMatrix, float fovDeg) {\r
  float fovRad = radians(fovDeg);\r
  float tanHalfFov = tan(fovRad * 0.5);\r
  float aspect = uResolution.x / uResolution.y;\r
\r
  vec2 ndc = (screenCoord / uResolution) * 2.0 - 1.0;\r
  ndc.x *= aspect;\r
\r
  vec3 rayCam = normalize(vec3(ndc.x * tanHalfFov, ndc.y * tanHalfFov, -1.0));\r
  // Transform ray direction into world coordinates\r
  return normalize((camWorldMatrix * vec4(rayCam, 0.0)).xyz);\r
}\r
\r
void main() {\r
  vec3 rayPos = uCameraPos;\r
  vec3 rayDir0 = getPrimaryRayDir(gl_FragCoord.xy, uCameraPos, uCameraWorldMatrix, uFov);\r
  vec3 rayDir = rayDir0;\r
\r
  // Diagnostic Tracking Variables\r
  int totalSteps = 0;\r
  bool hitHorizon = false;\r
  int diskCrossings = 0;\r
  float primaryDoppler = 1.0;\r
  float primaryTemp = 0.0;\r
  float primaryTurb = 0.0;\r
  vec3 primaryVel = vec3(0.0);\r
  bool firstCrossingRecorded = false;\r
\r
  // Radiative Transfer Accumulators\r
  vec3 accumulatedColor = vec3(0.0);\r
  float rayTransmission = 1.0;\r
\r
  // Adaptive Geodesic Raymarching Loop\r
  for (int step = 0; step < 360; step++) {\r
    if (step >= uMaxSteps) break;\r
    totalSteps++;\r
\r
    float r = length(rayPos);\r
\r
    // 1. Horizon Termination Check\r
    if (r <= HORIZON_R) {\r
      hitHorizon = true;\r
      break;\r
    }\r
\r
    // 2. Escape Termination Check\r
    if (r >= ESCAPE_R) {\r
      break;\r
    }\r
\r
    // Adaptive step size: dense near horizon and photon ring, rapid far away\r
    float stepSize = clamp(0.075 * (r - 0.96 * RS), 0.012, 0.38);\r
\r
    vec3 prevPos = rayPos;\r
    vec3 prevVel = rayDir;\r
\r
    // Advance ray along null geodesic via RK4\r
    stepRK4(rayPos, rayDir, stepSize);\r
\r
    // 3. Accretion Disk Crossing Detection (Equatorial Plane y = 0)\r
    if (prevPos.y * rayPos.y <= 0.0 && abs(rayPos.y - prevPos.y) > 0.00001) {\r
      float tCross = -prevPos.y / (rayPos.y - prevPos.y);\r
      if (tCross >= 0.0 && tCross <= 1.0) {\r
        vec3 hitPos = mix(prevPos, rayPos, tCross);\r
        float hitR = length(vec2(hitPos.x, hitPos.z));\r
\r
        // Within disk inner and outer boundary\r
        if (hitR >= uDiskInner && hitR <= uDiskOuter) {\r
          diskCrossings++;\r
\r
          // Relativistic Keplerian Velocity Field: v_K = sqrt(rs / (2 r))\r
          float vK = sqrt((0.5 * RS) / hitR);\r
          vec3 vOrbit = uVelocityFactor * vK * normalize(vec3(hitPos.z, 0.0, -hitPos.x));\r
          float beta = dot(vOrbit, -normalize(rayDir)); // Line-of-sight velocity toward observer\r
          float gamma = 1.0 / sqrt(max(1.0 - dot(vOrbit, vOrbit), 0.001));\r
\r
          // Doppler Factor & Gravitational Redshift Factor\r
          float gDoppler = 1.0 / (gamma * (1.0 - beta));\r
          float gGrav = sqrt(max(1.0 - RS / hitR, 0.001));\r
          float g = gDoppler * gGrav;\r
\r
          if (!firstCrossingRecorded) {\r
            primaryDoppler = g;\r
            primaryVel = vOrbit;\r
            firstCrossingRecorded = true;\r
          }\r
\r
          // Shakura-Sunyaev Temperature Profile f(r) = (r_in/r)^0.75 * (1 - sqrt(r_in/r))^0.25\r
          float rRatio = uDiskInner / hitR;\r
          float ssProfile = pow(rRatio, 0.75) * pow(max(1.0 - sqrt(rRatio), 0.001), 0.25);\r
          float localTemp = uDiskTemp * (0.35 + 1.85 * ssProfile);\r
          float observedTemp = localTemp * g;\r
\r
          // Smooth edge falloff at inner plunging region and diffuse outer boundary\r
          float innerEdgeFade = smoothstep(uDiskInner, uDiskInner + 0.25, hitR);\r
          float outerEdgeFade = smoothstep(uDiskOuter, uDiskOuter - 1.2, hitR);\r
          float edgeFade = innerEdgeFade * outerEdgeFade;\r
\r
          // Procedural Differential Keplerian Shear Turbulence\r
          float phi = atan(hitPos.z, hitPos.x);\r
          float keplerOmega = sqrt((0.5 * RS) / (hitR * hitR * hitR));\r
          float phiShear = phi - keplerOmega * uTime * uTurbSpeed * 2.5;\r
\r
          vec3 turbCoord = vec3(hitR * cos(phiShear), hitR * sin(phiShear), uTime * 0.09 * uTurbSpeed);\r
          float noiseVal = fbm(turbCoord * 1.4);\r
          float turbMod = 1.0 + uTurbAmp * (noiseVal - 0.45) * 1.8;\r
          turbMod = max(turbMod, 0.1);\r
\r
          if (diskCrossings == 1) {\r
            primaryTemp = observedTemp;\r
            primaryTurb = turbMod;\r
          }\r
\r
          // Disk Radiance: Planck blackbody * g^4 (relativistic beaming) * turbulence * edge fade\r
          vec3 emittedRadiance = blackbody(observedTemp) * pow(g, 4.0) * uDiskEmission * turbMod * edgeFade;\r
\r
          // Volumetric Slab Opacity & Path Length Integration\r
          float effectivePath = (2.0 * uDiskThickness) / max(abs(normalize(rayDir).y), 0.045);\r
          float slabAlpha = clamp((1.0 - exp(-0.85 * effectivePath)) * edgeFade, 0.0, 1.0);\r
\r
          // Path-sequential front-to-back accumulation\r
          accumulatedColor += rayTransmission * emittedRadiance * slabAlpha;\r
          rayTransmission *= (1.0 - slabAlpha);\r
\r
          if (rayTransmission < 0.005) {\r
            break; // Ray completely absorbed by disk matter\r
          }\r
        }\r
      }\r
    }\r
  }\r
\r
  // 4. Background Celestial Contribution (if ray escaped and transmission remains)\r
  vec3 bgRadiance = vec3(0.0);\r
  if (!hitHorizon && rayTransmission > 0.005) {\r
    vec3 escapedDir = normalize(rayDir);\r
    bgRadiance = sampleCelestialSphere(escapedDir);\r
    accumulatedColor += rayTransmission * bgRadiance;\r
  }\r
\r
  // 5. Diagnostic Debug View Routing\r
  if (uDebugMode == 0) {\r
    // Mode 0: Raw Linear HDR Radiance (passed to bloom and tonemapping)\r
    gl_FragColor = vec4(accumulatedColor, 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 1) {\r
    // Mode 1: Geodesic Step Cost Heatmap (Turbo colormap)\r
    float costNorm = float(totalSteps) / float(uMaxSteps);\r
    gl_FragColor = vec4(turboColormap(costNorm), 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 2) {\r
    // Mode 2: Event Horizon & Shadow Mask (binary mask)\r
    float mask = hitHorizon ? 1.0 : 0.0;\r
    gl_FragColor = vec4(vec3(mask), 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 3) {\r
    // Mode 3: Disk Crossing Count & Order\r
    // 0 = black, 1 = blue (primary direct), 2 = green (secondary arc), 3+ = orange/red (higher order)\r
    vec3 crossColor = vec3(0.0);\r
    if (diskCrossings == 1) {\r
      crossColor = vec3(0.1, 0.45, 1.0); // Primary direct disk\r
    } else if (diskCrossings == 2) {\r
      crossColor = vec3(0.15, 0.95, 0.35); // Secondary lensed halo arc\r
    } else if (diskCrossings >= 3) {\r
      crossColor = vec3(1.0, 0.4, 0.05); // Higher order Einstein ring crossings\r
    }\r
    gl_FragColor = vec4(crossColor, 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 4) {\r
    // Mode 4: Relativistic Doppler & Redshift Factor\r
    // Maps g in [0.3, 2.2]: Red (< 0.8), White (1.0), Cyan-Blue (> 1.2)\r
    vec3 dopColor = vec3(0.0);\r
    if (diskCrossings > 0) {\r
      float g = primaryDoppler;\r
      if (g < 1.0) {\r
        float t = clamp((g - 0.4) / 0.6, 0.0, 1.0);\r
        dopColor = mix(vec3(1.0, 0.08, 0.05), vec3(0.9, 0.9, 0.9), t);\r
      } else {\r
        float t = clamp((g - 1.0) / 1.0, 0.0, 1.0);\r
        dopColor = mix(vec3(0.9, 0.9, 0.9), vec3(0.08, 0.65, 1.0), t);\r
      }\r
    }\r
    gl_FragColor = vec4(dopColor, 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 5) {\r
    // Mode 5: Celestial Deflection Map (theta = acos(d0 . d_inf))\r
    vec3 escapedDir = normalize(rayDir);\r
    float deflection = hitHorizon ? PI : acos(clamp(dot(rayDir0, escapedDir), -1.0, 1.0));\r
    float normDef = deflection / PI;\r
    gl_FragColor = vec4(turboColormap(normDef), 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 6) {\r
    // Mode 6: Isolated Celestial Background without black hole or disk\r
    vec3 pureBg = sampleCelestialSphere(rayDir0);\r
    gl_FragColor = vec4(pureBg, 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 7) {\r
    // Mode 7: Raw Linear HDR Radiance (Logarithmic False-Color)\r
    float lum = dot(accumulatedColor, vec3(0.2126, 0.7152, 0.0722));\r
    float logLum = log(1.0 + lum) * 0.4;\r
    gl_FragColor = vec4(turboColormap(clamp(logLum, 0.0, 1.0)), 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 8) {\r
    // Mode 8: Disk Temperature & Sheared Turbulence Field\r
    vec3 tempColor = vec3(0.0);\r
    if (diskCrossings > 0) {\r
      float normT = clamp((primaryTemp - 2000.0) / 10000.0, 0.0, 1.0);\r
      tempColor = turboColormap(normT) * (0.5 + 0.5 * primaryTurb);\r
    }\r
    gl_FragColor = vec4(tempColor, 1.0);\r
    return;\r
  }\r
\r
  if (uDebugMode == 9) {\r
    // Mode 9: Disk Keplerian Velocity Vector Field\r
    vec3 velColor = vec3(0.0);\r
    if (diskCrossings > 0) {\r
      velColor = primaryVel * 0.5 + 0.5;\r
    }\r
    gl_FragColor = vec4(velColor, 1.0);\r
    return;\r
  }\r
\r
  gl_FragColor = vec4(accumulatedColor, 1.0);\r
}\r
`,ME=`// bloomBlur.frag.glsl - Multi-tap separable Gaussian blur for HDR Bloom pyramid\r
precision highp float;\r
\r
varying vec2 vUv;\r
\r
uniform sampler2D uTexture;\r
uniform vec2 uDirection;\r
uniform vec2 uResolution;\r
uniform float uThreshold;\r
uniform bool uExtractThreshold;\r
\r
void main() {\r
  vec2 texel = 1.0 / uResolution;\r
  vec3 color = vec3(0.0);\r
\r
  // 9-tap Gaussian filter kernel\r
  const float weights[5] = float[5](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);\r
\r
  vec3 centerSample = texture2D(uTexture, vUv).rgb;\r
  if (uExtractThreshold) {\r
    float maxBright = max(centerSample.r, max(centerSample.g, centerSample.b));\r
    if (maxBright < uThreshold) {\r
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\r
      return;\r
    }\r
  }\r
\r
  color += centerSample * weights[0];\r
\r
  for (int i = 1; i < 5; i++) {\r
    vec2 offset = uDirection * (float(i) * texel);\r
    vec3 cP = texture2D(uTexture, vUv + offset).rgb;\r
    vec3 cM = texture2D(uTexture, vUv - offset).rgb;\r
\r
    if (uExtractThreshold) {\r
      cP = max(cP - vec3(uThreshold), vec3(0.0));\r
      cM = max(cM - vec3(uThreshold), vec3(0.0));\r
    }\r
\r
    color += (cP + cM) * weights[i];\r
  }\r
\r
  gl_FragColor = vec4(color, 1.0);\r
}\r
`,EE=`// composite.frag.glsl - HDR Post-Processing: Bloom composite, ACES tonemapping, vignette, grain, aberration\r
precision highp float;\r
\r
varying vec2 vUv;\r
\r
uniform sampler2D uSceneTexture;\r
uniform sampler2D uBloomTexture;\r
uniform int uDebugMode;\r
\r
// Uniforms\r
uniform float uBloomStrength;\r
uniform float uExposure;\r
uniform float uVignetteStrength;\r
uniform float uGrainStrength;\r
uniform float uChromaticAberration;\r
uniform float uTime;\r
\r
// High-quality pseudo-random noise generator for film grain\r
float randomNoise(vec2 coord, float seed) {\r
  return fract(sin(dot(coord + seed, vec2(12.9898, 78.233))) * 43758.5453123);\r
}\r
\r
// ACES Filmic Tone Mapping Curve (Krzysztof Narkowicz)\r
vec3 acesFilm(vec3 x) {\r
  float a = 2.51;\r
  float b = 0.03;\r
  float c = 2.43;\r
  float d = 0.59;\r
  float e = 0.14;\r
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);\r
}\r
\r
void main() {\r
  // If in diagnostic debug mode (1-9), pass through raw diagnostic color without distortion\r
  if (uDebugMode != 0) {\r
    gl_FragColor = texture2D(uSceneTexture, vUv);\r
    return;\r
  }\r
\r
  vec2 uv = vUv;\r
  vec2 distVec = uv - 0.5;\r
  float dist2 = dot(distVec, distVec);\r
\r
  // 1. Radial Chromatic Aberration\r
  vec2 caOffset = distVec * (dist2 * uChromaticAberration * 8.0);\r
  float r = texture2D(uSceneTexture, uv + caOffset).r;\r
  float g = texture2D(uSceneTexture, uv).g;\r
  float b = texture2D(uSceneTexture, uv - caOffset).b;\r
  vec3 sceneColor = vec3(r, g, b);\r
\r
  // 2. Additive Bloom Composite\r
  vec3 bloom = texture2D(uBloomTexture, uv).rgb;\r
  vec3 hdrColor = sceneColor + bloom * uBloomStrength;\r
\r
  // 3. Exposure Scaling\r
  hdrColor *= uExposure;\r
\r
  // 4. ACES Filmic Tonemapping\r
  vec3 ldrColor = acesFilm(hdrColor);\r
\r
  // 5. Cinematic Vignette\r
  float vignette = 1.0 - smoothstep(0.2, 0.85, sqrt(dist2)) * uVignetteStrength;\r
  ldrColor *= vignette;\r
\r
  // 6. Micro Film Grain\r
  float grain = (randomNoise(uv * 1024.0, fract(uTime * 17.13)) - 0.5) * uGrainStrength;\r
  ldrColor += grain;\r
\r
  // Gamma correction to sRGB\r
  vec3 finalColor = pow(clamp(ldrColor, 0.0, 1.0), vec3(1.0 / 2.2));\r
\r
  gl_FragColor = vec4(finalColor, 1.0);\r
}\r
`,fg="gargantua_settings_v1",fi={standard:{label:"Standard",maxSteps:120,resScale:.85,maxDpr:1.2,bloomPasses:2},high:{label:"High",maxSteps:200,resScale:1,maxDpr:1.5,bloomPasses:3},cinematic:{label:"Cinematic",maxSteps:320,resScale:1,maxDpr:2,bloomPasses:4}},dg=[{id:0,name:"Iconic Inclined View",description:"Classic Interstellar viewing angle: prominent upper/lower lensed arcs and Doppler brightness asymmetry.",distance:17.5,azimuth:0,elevation:18,fov:45},{id:1,name:"Edge-On Thin Disk",description:"Extreme equatorial slice: severe gravitational deflection folding the disk above and below the horizon.",distance:15,azimuth:0,elevation:2,fov:42},{id:2,name:"Polar Vortex Overhead",description:"Top-down polar perspective: concentric circular photon ring and swirling Keplerian accretion flow.",distance:19,azimuth:0,elevation:82,fov:50},{id:3,name:"Deep-Field Distant Lensing",description:"Distant cosmic view: macro-scale Einstein rings bending the background Milky Way and starfield.",distance:36,azimuth:-30,elevation:24,fov:30}],Cm=[{id:0,name:"Final Composite",desc:"Full physical raytracing, relativistic disk, bloom & ACES post-processing."},{id:1,name:"Geodesic Step Cost Heatmap",desc:"Normalized RK4 integration steps visualized with Turbo gradient near the photon sphere."},{id:2,name:"Event Horizon & Shadow Mask",desc:"Pure binary capture mask (1.0 = horizon hit, 0.0 = escape)."},{id:3,name:"Disk Crossing Count & Order",desc:"Discrete color encoding: 0 = none, 1 = primary direct, 2 = secondary arc, 3+ = higher-order rings."},{id:4,name:"Doppler & Redshift Factor",desc:"Relativistic shift g: red for redshift (g < 0.8), white for neutral, cyan-blue for Doppler boosted approaching side (g > 1.2)."},{id:5,name:"Celestial Deflection Map",desc:"Deflection angle theta = acos(d0 . d_inf) mapped across the field of view."},{id:6,name:"Isolated Celestial Background",desc:"Procedural starfield and Milky Way core without black hole deflection or disk absorption."},{id:7,name:"Raw Linear HDR Radiance",desc:"Logarithmic dynamic range log10(1 + L_hdr) before bloom and tonemapping."},{id:8,name:"Disk Temp & Turbulence Field",desc:"Normalized disk surface temperature T(r) and sheared simplex noise without Doppler shift."},{id:9,name:"Disk Velocity Vector Field",desc:"Normalized Keplerian velocity vector v_orbit mapped to RGB."}],hg=[{id:"uFov",label:"Field of View (FOV)",min:20,max:90,step:1,default:45,unit:"°",group:"Optics & Camera"},{id:"cameraDist",label:"Camera Distance",min:8,max:50,step:.5,default:17.5,unit:" rs",group:"Optics & Camera"},{id:"cameraAzimuth",label:"Camera Azimuth",min:-180,max:180,step:1,default:0,unit:"°",group:"Optics & Camera"},{id:"cameraElevation",label:"Camera Elevation",min:-85,max:85,step:1,default:18,unit:"°",group:"Optics & Camera"},{id:"uTimeScale",label:"Time Scale",min:0,max:3,step:.05,default:1,unit:"x",group:"Optics & Camera"},{id:"uDiskInner",label:"Disk Inner Radius",min:2,max:4,step:.05,default:2.6,unit:" rs",group:"Accretion Disk"},{id:"uDiskOuter",label:"Disk Outer Radius",min:6,max:22,step:.5,default:12.5,unit:" rs",group:"Accretion Disk"},{id:"uDiskThickness",label:"Disk Half-Thickness",min:.01,max:.4,step:.01,default:.08,unit:" rs",group:"Accretion Disk"},{id:"uDiskTemp",label:"Disk Temperature",min:2e3,max:12e3,step:100,default:6500,unit:" K",group:"Accretion Disk"},{id:"uDiskEmission",label:"Disk Emission Intensity",min:.1,max:5,step:.1,default:1.5,unit:"",group:"Accretion Disk"},{id:"uVelocityFactor",label:"Orbital Velocity Factor",min:0,max:2,step:.05,default:1,unit:"x",group:"Accretion Disk"},{id:"uTurbAmp",label:"Turbulence Amplitude",min:0,max:2,step:.05,default:.85,unit:"",group:"Accretion Disk"},{id:"uTurbSpeed",label:"Turbulence Speed",min:0,max:3,step:.05,default:1,unit:"x",group:"Accretion Disk"},{id:"uStarDensity",label:"Star Density",min:.1,max:3,step:.1,default:1,unit:"",group:"Environment"},{id:"uGalaxyBrightness",label:"Milky Way Brightness",min:0,max:3,step:.1,default:1.3,unit:"",group:"Environment"},{id:"uBloomStrength",label:"Bloom Strength",min:0,max:3,step:.05,default:.85,unit:"",group:"Post-Processing"},{id:"uBloomThreshold",label:"Bloom Threshold",min:.2,max:2,step:.05,default:.8,unit:"",group:"Post-Processing"},{id:"uExposure",label:"Exposure Multiplier",min:.2,max:3,step:.05,default:1,unit:"x",group:"Post-Processing"},{id:"uVignetteStrength",label:"Vignette Strength",min:0,max:1.5,step:.05,default:.35,unit:"",group:"Post-Processing"},{id:"uGrainStrength",label:"Film Grain Strength",min:0,max:.15,step:.005,default:.035,unit:"",group:"Post-Processing"},{id:"uChromaticAberration",label:"Chromatic Aberration",min:0,max:.02,step:.001,default:.003,unit:"",group:"Post-Processing"}];function Vo(){const s={};for(const e of hg)s[e.id]=e.default;return{version:1,quality:"high",preset:0,debug:0,hudVisible:!0,cinematicOrbit:!1,audioEnabled:!1,params:s}}function TE(){try{const s=localStorage.getItem(fg);if(!s)return Vo();const e=JSON.parse(s);if(!e||e.version!==1)return Vo();const n=Vo();return{version:1,quality:["standard","high","cinematic"].includes(e.quality)?e.quality:n.quality,preset:typeof e.preset=="number"&&e.preset>=0&&e.preset<=3?e.preset:n.preset,debug:typeof e.debug=="number"&&e.debug>=0&&e.debug<=9?e.debug:n.debug,hudVisible:typeof e.hudVisible=="boolean"?e.hudVisible:n.hudVisible,cinematicOrbit:typeof e.cinematicOrbit=="boolean"?e.cinematicOrbit:n.cinematicOrbit,audioEnabled:typeof e.audioEnabled=="boolean"?e.audioEnabled:n.audioEnabled,params:{...n.params,...e.params||{}}}}catch(s){return console.warn("Failed to load persisted state, falling back to defaults:",s),Vo()}}function Xr(s){try{localStorage.setItem(fg,JSON.stringify(s))}catch(e){console.warn("Failed to persist state:",e)}}class wE{constructor(e,n={}){this.canvas=e,this.options=n,this.onFrameCallback=n.onFrame||null,this.onContextLostCallback=n.onContextLost||null,this.onContextRestoredCallback=n.onContextRestored||null,this.onCameraUserInteraction=n.onCameraUserInteraction||null,this.isContextLost=!1,this.animationFrameId=null,this.clockTime=0,this.frozenTime=null,this.lastTimestamp=performance.now(),this.quality=n.quality||"high",this.presetIndex=n.preset!==void 0?n.preset:0,this.debugMode=n.debug!==void 0?n.debug:0,this.cinematicOrbit=n.cinematicOrbit||!1,this.params={...n.params||{}},this.init()}init(){const e=this.canvas.clientWidth||window.innerWidth,n=this.canvas.clientHeight||window.innerHeight;this.renderer=new sE({canvas:this.canvas,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0,alpha:!1});const r=fi[this.quality]||fi.high,a=Math.min(window.devicePixelRatio||1,r.maxDpr);this.renderer.setPixelRatio(a),this.renderer.setSize(e,n,!1),this.camera=new $n(this.params.uFov||45,e/n,.1,1e3),this.controls=new lE(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.rotateSpeed=.8,this.controls.zoomSpeed=1,this.controls.panSpeed=.8,this.controls.minDistance=6,this.controls.maxDistance=60,this.controls.target.set(0,0,0),this.controls.addEventListener("start",()=>{this.onCameraUserInteraction&&this.onCameraUserInteraction()}),this.fsCamera=new rg(-1,1,1,-1,0,1),this.fsGeometry=new jo(2,2),this.buildRenderTargets(e*a*r.resScale,n*a*r.resScale),this.buildMaterials(),this.applyPreset(this.presetIndex),this.handleContextLost=u=>{u.preventDefault(),this.isContextLost=!0,this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.onContextLostCallback&&this.onContextLostCallback()},this.handleContextRestored=()=>{this.isContextLost=!1,this.init(),this.onContextRestoredCallback&&this.onContextRestoredCallback(),this.start()},this.canvas.addEventListener("webglcontextlost",this.handleContextLost,!1),this.canvas.addEventListener("webglcontextrestored",this.handleContextRestored,!1),this.renderFrame(.016)}buildRenderTargets(e,n){e=Math.max(Math.floor(e),64),n=Math.max(Math.floor(n),64),this.sceneRT&&this.sceneRT.dispose(),this.bloomRT1&&this.bloomRT1.dispose(),this.bloomRT2&&this.bloomRT2.dispose();const r={type:Qs,format:Qn,minFilter:Zn,magFilter:Zn,depthBuffer:!1,stencilBuffer:!1};this.sceneRT=new Mi(e,n,r);const a=Math.max(Math.floor(e*.5),32),u=Math.max(Math.floor(n*.5),32);this.bloomRT1=new Mi(a,u,r),this.bloomRT2=new Mi(a,u,r)}buildMaterials(){const e=fi[this.quality]||fi.high;this.raytracerMaterial=new pi({vertexShader:Kc,fragmentShader:SE,uniforms:{uCameraPos:{value:new Z},uCameraWorldMatrix:{value:new Ht},uFov:{value:this.params.uFov||45},uResolution:{value:new at(this.sceneRT.width,this.sceneRT.height)},uTime:{value:0},uMaxSteps:{value:e.maxSteps},uDebugMode:{value:this.debugMode},uDiskInner:{value:this.params.uDiskInner||2.6},uDiskOuter:{value:this.params.uDiskOuter||12.5},uDiskThickness:{value:this.params.uDiskThickness||.08},uDiskTemp:{value:this.params.uDiskTemp||6500},uDiskEmission:{value:this.params.uDiskEmission||1.5},uVelocityFactor:{value:this.params.uVelocityFactor||1},uTurbAmp:{value:this.params.uTurbAmp||.85},uTurbSpeed:{value:this.params.uTurbSpeed||1},uStarDensity:{value:this.params.uStarDensity||1},uGalaxyBrightness:{value:this.params.uGalaxyBrightness||1.3}},depthWrite:!1,depthTest:!1}),this.raytracerMesh=new Jn(this.fsGeometry,this.raytracerMaterial),this.raytracerScene=new Yc,this.raytracerScene.add(this.raytracerMesh),this.bloomBlurMaterial=new pi({vertexShader:Kc,fragmentShader:ME,uniforms:{uTexture:{value:null},uDirection:{value:new at(1,0)},uResolution:{value:new at(this.bloomRT1.width,this.bloomRT1.height)},uThreshold:{value:this.params.uBloomThreshold||.8},uExtractThreshold:{value:!1}},depthWrite:!1,depthTest:!1}),this.bloomMesh=new Jn(this.fsGeometry,this.bloomBlurMaterial),this.bloomScene=new Yc,this.bloomScene.add(this.bloomMesh),this.compositeMaterial=new pi({vertexShader:Kc,fragmentShader:EE,uniforms:{uSceneTexture:{value:this.sceneRT.texture},uBloomTexture:{value:this.bloomRT1.texture},uDebugMode:{value:this.debugMode},uBloomStrength:{value:this.params.uBloomStrength||.85},uExposure:{value:this.params.uExposure||1},uVignetteStrength:{value:this.params.uVignetteStrength||.35},uGrainStrength:{value:this.params.uGrainStrength||.035},uChromaticAberration:{value:this.params.uChromaticAberration||.003},uTime:{value:0}},depthWrite:!1,depthTest:!1}),this.compositeMesh=new Jn(this.fsGeometry,this.compositeMaterial),this.compositeScene=new Yc,this.compositeScene.add(this.compositeMesh)}setQuality(e){if(!fi[e])return;this.quality=e;const n=fi[e],r=this.canvas.clientWidth||window.innerWidth,a=this.canvas.clientHeight||window.innerHeight,u=Math.min(window.devicePixelRatio||1,n.maxDpr);this.renderer.setPixelRatio(u),this.buildRenderTargets(r*u*n.resScale,a*u*n.resScale),this.raytracerMaterial.uniforms.uMaxSteps.value=n.maxSteps,this.raytracerMaterial.uniforms.uResolution.value.set(this.sceneRT.width,this.sceneRT.height),this.bloomBlurMaterial.uniforms.uResolution.value.set(this.bloomRT1.width,this.bloomRT1.height),this.compositeMaterial.uniforms.uSceneTexture.value=this.sceneRT.texture,this.compositeMaterial.uniforms.uBloomTexture.value=this.bloomRT1.texture,this.renderFrame(.016)}setDebug(e){this.debugMode=e,this.raytracerMaterial&&(this.raytracerMaterial.uniforms.uDebugMode.value=e),this.compositeMaterial&&(this.compositeMaterial.uniforms.uDebugMode.value=e),this.renderFrame(.016)}setTime(e){this.frozenTime=e,this.clockTime=e,this.raytracerMaterial&&(this.raytracerMaterial.uniforms.uTime.value=e),this.compositeMaterial&&(this.compositeMaterial.uniforms.uTime.value=e),this.renderFrame(.016)}setCinematicOrbit(e){this.cinematicOrbit=e}applyPreset(e){const n=dg[e];if(!n)return;this.presetIndex=e;const r=n.azimuth*Math.PI/180,a=n.elevation*Math.PI/180,u=n.distance,f=u*Math.cos(a)*Math.sin(r),d=u*Math.sin(a),p=u*Math.cos(a)*Math.cos(r);this.camera.position.set(f,d,p),this.camera.fov=n.fov,this.camera.updateProjectionMatrix(),this.controls.target.set(0,0,0),this.controls.update(),this.params.cameraDist=u,this.params.cameraAzimuth=n.azimuth,this.params.cameraElevation=n.elevation,this.params.uFov=n.fov,this.raytracerMaterial&&(this.raytracerMaterial.uniforms.uFov.value=n.fov),this.renderFrame(.016)}updateCameraFromSpherical(e,n,r){const a=n*Math.PI/180,u=r*Math.PI/180,f=e*Math.cos(u)*Math.sin(a),d=e*Math.sin(u),p=e*Math.cos(u)*Math.cos(a);this.camera.position.set(f,d,p),this.controls.update()}updateParameter(e,n){if(this.params[e]=n,e==="cameraDist"||e==="cameraAzimuth"||e==="cameraElevation"){this.updateCameraFromSpherical(this.params.cameraDist,this.params.cameraAzimuth,this.params.cameraElevation);return}if(e==="uFov"){this.camera.fov=n,this.camera.updateProjectionMatrix(),this.raytracerMaterial&&(this.raytracerMaterial.uniforms.uFov.value=n);return}this.raytracerMaterial&&this.raytracerMaterial.uniforms[e]&&(this.raytracerMaterial.uniforms[e].value=n),this.compositeMaterial&&this.compositeMaterial.uniforms[e]&&(this.compositeMaterial.uniforms[e].value=n),e==="uBloomThreshold"&&this.bloomBlurMaterial&&(this.bloomBlurMaterial.uniforms.uThreshold.value=n)}resize(){if(this.isContextLost||!this.renderer)return;const e=this.canvas.clientWidth||window.innerWidth,n=this.canvas.clientHeight||window.innerHeight,r=fi[this.quality]||fi.high,a=Math.min(window.devicePixelRatio||1,r.maxDpr);this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(a),this.renderer.setSize(e,n,!1),this.buildRenderTargets(e*a*r.resScale,n*a*r.resScale),this.raytracerMaterial.uniforms.uResolution.value.set(this.sceneRT.width,this.sceneRT.height),this.bloomBlurMaterial.uniforms.uResolution.value.set(this.bloomRT1.width,this.bloomRT1.height),this.compositeMaterial.uniforms.uSceneTexture.value=this.sceneRT.texture,this.compositeMaterial.uniforms.uBloomTexture.value=this.bloomRT1.texture,this.renderFrame(.016)}renderFrame(e){if(!(this.isContextLost||!this.renderer)){if(this.frozenTime===null){const n=this.params.uTimeScale!==void 0?this.params.uTimeScale:1;this.clockTime+=e*n}else this.clockTime=this.frozenTime;if(this.cinematicOrbit&&this.frozenTime===null){const n=.12*e,r=this.camera.position.x,a=this.camera.position.z,u=Math.cos(n),f=Math.sin(n);this.camera.position.x=r*u-a*f,this.camera.position.z=r*f+a*u,this.controls.update();const d=this.camera.position.length(),p=Math.asin(this.camera.position.y/Math.max(d,.001))*(180/Math.PI),m=Math.atan2(this.camera.position.x,this.camera.position.z)*(180/Math.PI);this.params.cameraDist=Math.round(d*10)/10,this.params.cameraElevation=Math.round(p),this.params.cameraAzimuth=Math.round(m)}else{this.controls.update();const n=this.camera.position.length(),r=Math.asin(this.camera.position.y/Math.max(n,.001))*(180/Math.PI),a=Math.atan2(this.camera.position.x,this.camera.position.z)*(180/Math.PI);this.params.cameraDist=Math.round(n*10)/10,this.params.cameraElevation=Math.round(r),this.params.cameraAzimuth=Math.round(a)}if(this.camera.updateMatrixWorld(),this.raytracerMaterial.uniforms.uCameraPos.value.copy(this.camera.position),this.raytracerMaterial.uniforms.uCameraWorldMatrix.value.copy(this.camera.matrixWorld),this.raytracerMaterial.uniforms.uTime.value=this.clockTime,this.compositeMaterial.uniforms.uTime.value=this.clockTime,this.renderer.setRenderTarget(this.sceneRT),this.renderer.render(this.raytracerScene,this.fsCamera),this.debugMode===0){const r=(fi[this.quality]||fi.high).bloomPasses;this.bloomBlurMaterial.uniforms.uExtractThreshold.value=!0,this.bloomBlurMaterial.uniforms.uTexture.value=this.sceneRT.texture,this.bloomBlurMaterial.uniforms.uDirection.value.set(1,0),this.renderer.setRenderTarget(this.bloomRT1),this.renderer.render(this.bloomScene,this.fsCamera),this.bloomBlurMaterial.uniforms.uExtractThreshold.value=!1;for(let a=0;a<r;a++)this.bloomBlurMaterial.uniforms.uTexture.value=this.bloomRT1.texture,this.bloomBlurMaterial.uniforms.uDirection.value.set(0,1),this.renderer.setRenderTarget(this.bloomRT2),this.renderer.render(this.bloomScene,this.fsCamera),this.bloomBlurMaterial.uniforms.uTexture.value=this.bloomRT2.texture,this.bloomBlurMaterial.uniforms.uDirection.value.set(1,0),this.renderer.setRenderTarget(this.bloomRT1),this.renderer.render(this.bloomScene,this.fsCamera)}this.renderer.setRenderTarget(null),this.renderer.render(this.compositeScene,this.fsCamera)}}start(){this.lastTimestamp=performance.now();const e=n=>{this.animationFrameId=requestAnimationFrame(e);const r=Math.min((n-this.lastTimestamp)/1e3,.1);this.lastTimestamp=n,this.renderFrame(r),this.onFrameCallback&&this.onFrameCallback(this.clockTime,r)};this.animationFrameId=requestAnimationFrame(e)}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}dispose(){this.stop(),this.canvas.removeEventListener("webglcontextlost",this.handleContextLost),this.canvas.removeEventListener("webglcontextrestored",this.handleContextRestored),this.controls&&this.controls.dispose(),this.sceneRT&&this.sceneRT.dispose(),this.bloomRT1&&this.bloomRT1.dispose(),this.bloomRT2&&this.bloomRT2.dispose(),this.renderer&&this.renderer.dispose()}}function AE({state:s,fps:e,onParameterChange:n,onQualityChange:r,onPresetChange:a,onDebugChange:u,onCinematicToggle:f,onAudioToggle:d,onResetAll:p,onToggleHUD:m}){const[v,y]=Xt.useState("parameters"),[x,S]=Xt.useState(!1);if(!s.hudVisible)return we.jsx("button",{onClick:m,title:"Show HUD (H)",style:{position:"fixed",top:"16px",right:"16px",zIndex:1e3,background:"rgba(15, 23, 42, 0.75)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.2)",color:"#38bdf8",borderRadius:"8px",padding:"8px 14px",fontSize:"12px",fontWeight:"600",cursor:"pointer"},children:"HUD [H]"});const A=["Optics & Camera","Accretion Disk","Environment","Post-Processing"];return we.jsxs("div",{style:{position:"fixed",top:"12px",right:"12px",width:"380px",maxWidth:"calc(100vw - 24px)",maxHeight:"calc(100vh - 24px)",zIndex:1e3,display:"flex",flexDirection:"column",background:"rgba(10, 15, 29, 0.82)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:"1px solid rgba(56, 189, 248, 0.25)",borderRadius:"12px",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",color:"#e2e8f0",fontFamily:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",fontSize:"12px",overflow:"hidden",transition:"all 0.25s ease-in-out"},children:[we.jsxs("div",{style:{padding:"10px 14px",borderBottom:"1px solid rgba(255, 255, 255, 0.1)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(15, 23, 42, 0.6)"},children:[we.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[we.jsx("span",{style:{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:s.debug===0?"#38bdf8":"#f59e0b",boxShadow:s.debug===0?"0 0 8px #38bdf8":"0 0 8px #f59e0b"}}),we.jsx("span",{style:{fontWeight:"700",letterSpacing:"0.1em",color:"#f8fafc"},children:"GARGANTUA"}),we.jsxs("span",{style:{color:"#94a3b8",fontSize:"10px"},children:[e," FPS"]})]}),we.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[we.jsx("button",{onClick:()=>{const w=["standard","high","cinematic"],_=w[(w.indexOf(s.quality)+1)%w.length];r(_)},title:"Cycle Quality (Q)",style:{background:"rgba(56, 189, 248, 0.15)",border:"1px solid rgba(56, 189, 248, 0.35)",color:"#38bdf8",borderRadius:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:"600",cursor:"pointer"},children:s.quality.toUpperCase()}),we.jsx("button",{onClick:()=>S(!x),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:"14px",padding:"2px 4px"},children:x?"▼":"▲"}),we.jsx("button",{onClick:m,title:"Hide HUD (H)",style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:"14px",padding:"2px 4px"},children:"✕"})]})]}),!x&&we.jsxs(we.Fragment,{children:[we.jsxs("div",{style:{padding:"6px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0, 0, 0, 0.3)",borderBottom:"1px solid rgba(255, 255, 255, 0.06)",fontSize:"10px",color:"#94a3b8"},children:[we.jsxs("div",{children:[we.jsx("span",{style:{color:"#64748b"},children:"VIEW: "}),we.jsx("span",{style:{color:"#38bdf8"},children:Cm[s.debug].name})]}),we.jsxs("div",{style:{display:"flex",gap:"8px"},children:[we.jsxs("button",{onClick:f,style:{background:"none",border:"none",color:s.cinematicOrbit?"#4ade80":"#64748b",cursor:"pointer",fontSize:"10px"},children:["ORBIT: ",s.cinematicOrbit?"ON":"OFF"]}),we.jsxs("button",{onClick:d,style:{background:"none",border:"none",color:s.audioEnabled?"#38bdf8":"#64748b",cursor:"pointer",fontSize:"10px"},children:["AUDIO: ",s.audioEnabled?"ON":"OFF"]})]})]}),we.jsx("div",{style:{display:"flex",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",background:"rgba(15, 23, 42, 0.4)"},children:[{id:"parameters",label:"PARAMS (21)"},{id:"presets",label:"PRESETS (4)"},{id:"debug",label:"DEBUG (10)"},{id:"info",label:"KEYS"}].map(w=>we.jsx("button",{onClick:()=>y(w.id),style:{flex:1,padding:"7px 0",background:v===w.id?"rgba(56, 189, 248, 0.16)":"transparent",border:"none",borderBottom:v===w.id?"2px solid #38bdf8":"2px solid transparent",color:v===w.id?"#38bdf8":"#94a3b8",fontSize:"10px",fontWeight:"600",cursor:"pointer",textAlign:"center"},children:w.label},w.id))}),we.jsxs("div",{style:{padding:"12px 14px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"14px"},children:[v==="parameters"&&we.jsxs(we.Fragment,{children:[we.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:we.jsx("button",{onClick:p,style:{background:"rgba(239, 68, 68, 0.15)",border:"1px solid rgba(239, 68, 68, 0.4)",color:"#f87171",borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:"600",cursor:"pointer"},children:"Reset All to Defaults (R)"})}),A.map(w=>we.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[we.jsx("div",{style:{fontSize:"10px",fontWeight:"700",color:"#38bdf8",textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:"1px solid rgba(56, 189, 248, 0.2)",paddingBottom:"3px"},children:w}),hg.filter(_=>_.group===w).map(_=>{const g=s.params[_.id]!==void 0?s.params[_.id]:_.default;return we.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[we.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[we.jsx("span",{style:{color:"#cbd5e1",fontSize:"11px"},children:_.label}),we.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[we.jsxs("span",{style:{color:"#38bdf8",fontSize:"11px",fontWeight:"600"},children:[g,_.unit]}),we.jsx("button",{onClick:()=>n(_.id,_.default),title:"Reset parameter",style:{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:"10px",padding:"0 2px"},children:"↺"})]})]}),we.jsx("input",{type:"range",min:_.min,max:_.max,step:_.step,value:g,onChange:U=>n(_.id,parseFloat(U.target.value)),style:{width:"100%",height:"4px",background:"#1e293b",outline:"none",cursor:"pointer",accentColor:"#38bdf8"}})]},_.id)})]},w))]}),v==="presets"&&we.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[we.jsx("div",{style:{fontSize:"11px",color:"#94a3b8",marginBottom:"4px"},children:"Select or switch with Shift+1 through Shift+4:"}),dg.map(w=>{const _=s.preset===w.id;return we.jsxs("div",{onClick:()=>a(w.id),style:{padding:"10px 12px",borderRadius:"6px",background:_?"rgba(56, 189, 248, 0.18)":"rgba(15, 23, 42, 0.5)",border:_?"1px solid #38bdf8":"1px solid rgba(255, 255, 255, 0.08)",cursor:"pointer",display:"flex",flexDirection:"column",gap:"4px",transition:"all 0.15s ease"},children:[we.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[we.jsxs("span",{style:{fontWeight:"700",color:_?"#38bdf8":"#f1f5f9"},children:["Preset ",w.id+1,": ",w.name]}),we.jsxs("span",{style:{fontSize:"10px",color:"#64748b"},children:["Shift+",w.id+1]})]}),we.jsx("div",{style:{fontSize:"10px",color:"#94a3b8",lineHeight:"1.4"},children:w.description}),we.jsxs("div",{style:{fontSize:"9px",color:"#64748b"},children:["Dist: ",w.distance,"rs | Elev: ",w.elevation,"° | FOV: ",w.fov,"°"]})]},w.id)})]}),v==="debug"&&we.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:[we.jsx("div",{style:{fontSize:"11px",color:"#94a3b8",marginBottom:"4px"},children:"Diagnostic shader outputs (Hotkeys 0–9):"}),Cm.map(w=>{const _=s.debug===w.id;return we.jsxs("div",{onClick:()=>u(w.id),style:{padding:"8px 10px",borderRadius:"6px",background:_?"rgba(56, 189, 248, 0.2)":"rgba(15, 23, 42, 0.45)",border:_?"1px solid #38bdf8":"1px solid rgba(255, 255, 255, 0.06)",cursor:"pointer",display:"flex",flexDirection:"column",gap:"2px",transition:"all 0.15s ease"},children:[we.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[we.jsxs("span",{style:{fontWeight:"700",color:_?"#38bdf8":"#e2e8f0",fontSize:"11px"},children:["[",w.id,"] ",w.name]}),_&&we.jsx("span",{style:{fontSize:"9px",color:"#38bdf8",fontWeight:"bold"},children:"ACTIVE"})]}),we.jsx("span",{style:{fontSize:"10px",color:"#94a3b8",lineHeight:"1.3"},children:w.desc})]},w.id)})]}),v==="info"&&we.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",fontSize:"11px"},children:[we.jsx("div",{style:{fontWeight:"700",color:"#38bdf8"},children:"Keyboard Controls"}),we.jsxs("div",{style:{display:"grid",gridTemplateColumns:"80px 1fr",gap:"6px 10px",color:"#cbd5e1"},children:[we.jsx("span",{style:{color:"#38bdf8"},children:"0 – 9"}),we.jsx("span",{children:"Switch Diagnostic Debug Views"}),we.jsx("span",{style:{color:"#38bdf8"},children:"Shift + 1-4"}),we.jsx("span",{children:"Switch Camera Presets"}),we.jsx("span",{style:{color:"#38bdf8"},children:"Space"}),we.jsx("span",{children:"Toggle Cinematic Camera Orbit"}),we.jsx("span",{style:{color:"#38bdf8"},children:"H"}),we.jsx("span",{children:"Toggle HUD Visibility"}),we.jsx("span",{style:{color:"#38bdf8"},children:"Q"}),we.jsx("span",{children:"Cycle Quality (Standard/High/Cinematic)"}),we.jsx("span",{style:{color:"#38bdf8"},children:"R"}),we.jsx("span",{children:"Reset All Parameters to Default"}),we.jsx("span",{style:{color:"#38bdf8"},children:"M"}),we.jsx("span",{children:"Toggle Ambient Procedural Sound"}),we.jsx("span",{style:{color:"#38bdf8"},children:"Drag / Touch"}),we.jsx("span",{children:"Rotate OrbitControls Camera"}),we.jsx("span",{style:{color:"#38bdf8"},children:"Wheel / Pinch"}),we.jsx("span",{children:"Dolly / Zoom Camera Distance"})]}),we.jsxs("div",{style:{borderTop:"1px solid rgba(255, 255, 255, 0.1)",paddingTop:"8px",marginTop:"4px"},children:[we.jsx("div",{style:{fontWeight:"700",color:"#38bdf8",marginBottom:"4px"},children:"Physics Specifications"}),we.jsxs("div",{style:{color:"#94a3b8",fontSize:"10px",lineHeight:"1.5"},children:["• Spacetime: Schwarzschild Metric (M=0.5, rs=1.0)",we.jsx("br",{}),"• Numerical Integration: 4th-Order Runge-Kutta (RK4)",we.jsx("br",{}),"• Geodesic ODE: a = -1.5*rs*|x × v|² / r⁵ * x",we.jsx("br",{}),"• Accretion Disk: Shakura-Sunyaev + Keplerian Shear",we.jsx("br",{}),"• Relativistic Doppler: g⁴ Beaming & Gravitational Redshift",we.jsx("br",{}),"• Celestial Lensing: Pure Procedural Milky Way & Stars"]})]})]})]})]})]})}function CE({visible:s}){return s?we.jsxs("div",{style:{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"rgba(220, 38, 38, 0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(248, 113, 113, 0.6)",borderRadius:"8px",padding:"12px 24px",color:"#ffffff",fontSize:"14px",fontWeight:"600",letterSpacing:"0.05em",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.6)",display:"flex",alignItems:"center",gap:"10px",animation:"pulse 1.8s infinite ease-in-out"},children:[we.jsx("span",{style:{width:"10px",height:"10px",borderRadius:"50%",backgroundColor:"#ff4d4f",display:"inline-block",boxShadow:"0 0 8px #ff4d4f"}}),"WebGL Context Lost — Rebuilding GPU Pipeline & Restoring State..."]}):null}class RE{constructor(){this.ctx=null,this.isPlaying=!1,this.masterGain=null,this.filter=null,this.lfo=null,this.oscillators=[]}initContext(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination),this.filter=this.ctx.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.setValueAtTime(160,this.ctx.currentTime),this.filter.Q.setValueAtTime(3.5,this.ctx.currentTime),this.filter.connect(this.masterGain),this.lfo=this.ctx.createOscillator(),this.lfo.frequency.setValueAtTime(.08,this.ctx.currentTime);const n=this.ctx.createGain();n.gain.setValueAtTime(45,this.ctx.currentTime),this.lfo.connect(n),n.connect(this.filter.frequency),this.lfo.start();const r=[55,54.7,110.2,164.8],a=["sawtooth","triangle","sine","sine"],u=[.12,.14,.08,.04];r.forEach((f,d)=>{const p=this.ctx.createOscillator();p.type=a[d],p.frequency.setValueAtTime(f,this.ctx.currentTime);const m=this.ctx.createGain();m.gain.setValueAtTime(u[d],this.ctx.currentTime),p.connect(m),m.connect(this.filter),p.start(),this.oscillators.push(p)})}toggle(){return this.isPlaying?(this.stop(),!1):(this.start(),!0)}start(){if(this.initContext(),!this.ctx)return;this.ctx.state==="suspended"&&this.ctx.resume();const e=this.ctx.currentTime;this.masterGain.gain.cancelScheduledValues(e),this.masterGain.gain.setValueAtTime(this.masterGain.gain.value,e),this.masterGain.gain.exponentialRampToValueAtTime(.28,e+2),this.isPlaying=!0}stop(){if(!this.ctx||!this.masterGain)return;const e=this.ctx.currentTime;this.masterGain.gain.cancelScheduledValues(e),this.masterGain.gain.setValueAtTime(this.masterGain.gain.value,e),this.masterGain.gain.exponentialRampToValueAtTime(1e-4,e+1.2),this.isPlaying=!1}}const bE=new RE;function Rm(){const s=new URLSearchParams(window.location.search),e=s.get("capture")==="1";let n=s.get("quality");!n||!["standard","high","cinematic"].includes(n.toLowerCase())?n=null:n=n.toLowerCase();let r=s.get("preset");if(r!==null){const m=parseInt(r,10);r=Number.isFinite(m)&&m>=0&&m<=3?m:null}let a=s.get("debug");if(a!==null){const m=parseInt(a,10);a=Number.isFinite(m)&&m>=0&&m<=9?m:null}let u=s.get("hud"),f=null;u!==null&&(u==="0"?f=!1:u==="1"&&(f=!0));let d=s.get("time"),p=null;if(d!==null){const m=parseFloat(d);Number.isFinite(m)&&m>=0&&(p=m)}return{isCapture:e,quality:n,preset:r,debug:a,hudVisible:f,freezeTime:p}}function PE(s){let e=!1;const n={get ready(){return e},getState(){try{return s.getFullState()}catch(r){return console.error("__GARGANTUA__.getState error:",r),null}},setQuality(r){try{if(typeof r!="string")return s.getFullState();const a=r.toLowerCase();return fi[a]&&s.applyQuality(a),s.getFullState()}catch(a){return console.error("__GARGANTUA__.setQuality error:",a),s.getFullState()}},setPreset(r){try{const a=parseInt(r,10);return!Number.isFinite(a)||a<0||a>3||s.applyPreset(a),s.getFullState()}catch(a){return console.error("__GARGANTUA__.setPreset error:",a),s.getFullState()}},setDebug(r){try{const a=parseInt(r,10);return!Number.isFinite(a)||a<0||a>9||s.applyDebug(a),s.getFullState()}catch(a){return console.error("__GARGANTUA__.setDebug error:",a),s.getFullState()}},setTime(r){try{const a=parseFloat(r);return!Number.isFinite(a)||a<0||s.applyTime(a),s.getFullState()}catch(a){return console.error("__GARGANTUA__.setTime error:",a),s.getFullState()}}};return window.__GARGANTUA__=n,{markReady(){e=!0,document.documentElement.dataset.gargantuaReady="true"}}}function DE(){const s=Xt.useRef(null),e=Xt.useRef(null),[n,r]=Xt.useState(()=>{const R=TE(),X=Rm();return{...R,quality:X.quality||R.quality,preset:X.preset!==null?X.preset:R.preset,debug:X.debug!==null?X.debug:R.debug,hudVisible:X.hudVisible!==null?X.hudVisible:R.hudVisible,cinematicOrbit:X.isCapture?!1:R.cinematicOrbit,audioEnabled:!1}}),[a,u]=Xt.useState(60),[f,d]=Xt.useState(!1),p=Xt.useRef(0),m=Xt.useRef(performance.now()),v=Xt.useRef(null),y=Xt.useRef(!1),x=Xt.useCallback((R,X)=>{r(N=>{const F={...N,params:{...N.params,[R]:X}};return Xr(F),F}),e.current&&e.current.updateParameter(R,X)},[]),S=Xt.useCallback(R=>{r(X=>{const N={...X,quality:R};return Xr(N),N}),e.current&&e.current.setQuality(R)},[]),A=Xt.useCallback(R=>{r(X=>{const N={...X,preset:R};return Xr(N),N}),e.current&&e.current.applyPreset(R)},[]),w=Xt.useCallback(R=>{r(X=>{const N={...X,debug:R};return Xr(N),N}),e.current&&e.current.setDebug(R)},[]),_=Xt.useCallback(()=>{r(R=>{const X={...R,cinematicOrbit:!R.cinematicOrbit};return e.current&&e.current.setCinematicOrbit(X.cinematicOrbit),X})},[]),g=Xt.useCallback(()=>{const R=bE.toggle();r(X=>({...X,audioEnabled:R}))},[]),U=Xt.useCallback(()=>{const R=Vo();if(r(R),Xr(R),e.current){e.current.setQuality(R.quality),e.current.setDebug(R.debug),e.current.applyPreset(R.preset),e.current.setCinematicOrbit(R.cinematicOrbit);for(const[X,N]of Object.entries(R.params))e.current.updateParameter(X,N)}},[]),L=Xt.useCallback(()=>{r(R=>{const X={...R,hudVisible:!R.hudVisible};return Xr(X),X})},[]);return Xt.useEffect(()=>{const R=s.current;if(!R)return;const X=Rm(),N=new wE(R,{quality:n.quality,preset:n.preset,debug:n.debug,cinematicOrbit:n.cinematicOrbit,params:n.params,onFrame:(T,k)=>{p.current++;const re=performance.now();re-m.current>=1e3&&(u(Math.round(p.current*1e3/(re-m.current))),p.current=0,m.current=re),y.current||(y.current=!0,v.current&&v.current.markReady())},onContextLost:()=>{d(!0)},onContextRestored:()=>{d(!1)},onCameraUserInteraction:()=>{r(T=>T.cinematicOrbit?(N.setCinematicOrbit(!1),{...T,cinematicOrbit:!1}):T)}});e.current=N,X.freezeTime!==null&&N.setTime(X.freezeTime);const F={getFullState:()=>({quality:N.quality,preset:N.presetIndex,debug:N.debugMode,time:N.clockTime,cinematicOrbit:N.cinematicOrbit,params:{...N.params}}),applyQuality:T=>{S(T)},applyPreset:T=>{A(T)},applyDebug:T=>{w(T)},applyTime:T=>{N.setTime(T)}};v.current=PE(F),N.start();const j=()=>{N.resize()};window.addEventListener("resize",j);const b=T=>{if(!(T.target.tagName==="INPUT"||T.target.tagName==="TEXTAREA")){if(T.key>="0"&&T.key<="9"&&!T.shiftKey&&!T.ctrlKey&&!T.altKey&&!T.metaKey){w(parseInt(T.key,10));return}if(T.shiftKey&&T.code.startsWith("Digit")){const k=parseInt(T.code.replace("Digit",""),10);if(k>=1&&k<=4){T.preventDefault(),A(k-1);return}}if(T.code==="Space"){T.preventDefault(),_();return}if(T.key==="h"||T.key==="H"){T.preventDefault(),L();return}if(T.key==="r"||T.key==="R"){T.preventDefault(),U();return}if(T.key==="q"||T.key==="Q"){T.preventDefault();const k=["standard","high","cinematic"];r(re=>{const Q=k[(k.indexOf(re.quality)+1)%k.length];return N.setQuality(Q),Xr({...re,quality:Q}),{...re,quality:Q}});return}if(T.key==="m"||T.key==="M"){T.preventDefault(),g();return}}};return window.addEventListener("keydown",b),()=>{window.removeEventListener("resize",j),window.removeEventListener("keydown",b),N.dispose()}},[]),we.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[we.jsx("canvas",{ref:s,style:{width:"100%",height:"100%",display:"block"}}),we.jsx(AE,{state:n,fps:a,onParameterChange:x,onQualityChange:S,onPresetChange:A,onDebugChange:w,onCinematicToggle:_,onAudioToggle:g,onResetAll:U,onToggleHUD:L}),we.jsx(CE,{visible:f})]})}const bm=document.getElementById("root");bm&&nv.createRoot(bm).render(we.jsx(DE,{}));
