var Fx=Object.defineProperty;var Hx=(r,t,i)=>t in r?Fx(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var Dt=(r,t,i)=>Hx(r,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function J_(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var rh={exports:{}},Fo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var U0;function Gx(){if(U0)return Fo;U0=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:h,ref:l!==void 0?l:null,props:c}}return Fo.Fragment=t,Fo.jsx=i,Fo.jsxs=i,Fo}var N0;function Vx(){return N0||(N0=1,rh.exports=Gx()),rh.exports}var K=Vx(),oh={exports:{}},fe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O0;function kx(){if(O0)return fe;O0=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function S(O){return O===null||typeof O!="object"?null:(O=x&&O[x]||O["@@iterator"],typeof O=="function"?O:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,M={};function g(O,et,Mt){this.props=O,this.context=et,this.refs=M,this.updater=Mt||E}g.prototype.isReactComponent={},g.prototype.setState=function(O,et){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,et,"setState")},g.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function N(){}N.prototype=g.prototype;function L(O,et,Mt){this.props=O,this.context=et,this.refs=M,this.updater=Mt||E}var w=L.prototype=new N;w.constructor=L,b(w,g.prototype),w.isPureReactComponent=!0;var V=Array.isArray;function F(){}var z={H:null,A:null,T:null,S:null},j=Object.prototype.hasOwnProperty;function D(O,et,Mt){var Z=Mt.ref;return{$$typeof:r,type:O,key:et,ref:Z!==void 0?Z:null,props:Mt}}function C(O,et){return D(O.type,et,O.props)}function H(O){return typeof O=="object"&&O!==null&&O.$$typeof===r}function ht(O){var et={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(Mt){return et[Mt]})}var rt=/\/+/g;function yt(O,et){return typeof O=="object"&&O!==null&&O.key!=null?ht(""+O.key):et.toString(36)}function ft(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(F,F):(O.status="pending",O.then(function(et){O.status==="pending"&&(O.status="fulfilled",O.value=et)},function(et){O.status==="pending"&&(O.status="rejected",O.reason=et)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function P(O,et,Mt,Z,pt){var k=typeof O;(k==="undefined"||k==="boolean")&&(O=null);var G=!1;if(O===null)G=!0;else switch(k){case"bigint":case"string":case"number":G=!0;break;case"object":switch(O.$$typeof){case r:case t:G=!0;break;case v:return G=O._init,P(G(O._payload),et,Mt,Z,pt)}}if(G)return pt=pt(O),G=Z===""?"."+yt(O,0):Z,V(pt)?(Mt="",G!=null&&(Mt=G.replace(rt,"$&/")+"/"),P(pt,et,Mt,"",function(Rt){return Rt})):pt!=null&&(H(pt)&&(pt=C(pt,Mt+(pt.key==null||O&&O.key===pt.key?"":(""+pt.key).replace(rt,"$&/")+"/")+G)),et.push(pt)),1;G=0;var ot=Z===""?".":Z+":";if(V(O))for(var st=0;st<O.length;st++)Z=O[st],k=ot+yt(Z,st),G+=P(Z,et,Mt,k,pt);else if(st=S(O),typeof st=="function")for(O=st.call(O),st=0;!(Z=O.next()).done;)Z=Z.value,k=ot+yt(Z,st++),G+=P(Z,et,Mt,k,pt);else if(k==="object"){if(typeof O.then=="function")return P(ft(O),et,Mt,Z,pt);throw et=String(O),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return G}function X(O,et,Mt){if(O==null)return O;var Z=[],pt=0;return P(O,Z,"","",function(k){return et.call(Mt,k,pt++)}),Z}function q(O){if(O._status===-1){var et=O._result;et=et(),et.then(function(Mt){(O._status===0||O._status===-1)&&(O._status=1,O._result=Mt)},function(Mt){(O._status===0||O._status===-1)&&(O._status=2,O._result=Mt)}),O._status===-1&&(O._status=0,O._result=et)}if(O._status===1)return O._result.default;throw O._result}var St=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},At={map:X,forEach:function(O,et,Mt){X(O,function(){et.apply(this,arguments)},Mt)},count:function(O){var et=0;return X(O,function(){et++}),et},toArray:function(O){return X(O,function(et){return et})||[]},only:function(O){if(!H(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return fe.Activity=_,fe.Children=At,fe.Component=g,fe.Fragment=i,fe.Profiler=l,fe.PureComponent=L,fe.StrictMode=s,fe.Suspense=p,fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,fe.__COMPILER_RUNTIME={__proto__:null,c:function(O){return z.H.useMemoCache(O)}},fe.cache=function(O){return function(){return O.apply(null,arguments)}},fe.cacheSignal=function(){return null},fe.cloneElement=function(O,et,Mt){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var Z=b({},O.props),pt=O.key;if(et!=null)for(k in et.key!==void 0&&(pt=""+et.key),et)!j.call(et,k)||k==="key"||k==="__self"||k==="__source"||k==="ref"&&et.ref===void 0||(Z[k]=et[k]);var k=arguments.length-2;if(k===1)Z.children=Mt;else if(1<k){for(var G=Array(k),ot=0;ot<k;ot++)G[ot]=arguments[ot+2];Z.children=G}return D(O.type,pt,Z)},fe.createContext=function(O){return O={$$typeof:h,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},fe.createElement=function(O,et,Mt){var Z,pt={},k=null;if(et!=null)for(Z in et.key!==void 0&&(k=""+et.key),et)j.call(et,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(pt[Z]=et[Z]);var G=arguments.length-2;if(G===1)pt.children=Mt;else if(1<G){for(var ot=Array(G),st=0;st<G;st++)ot[st]=arguments[st+2];pt.children=ot}if(O&&O.defaultProps)for(Z in G=O.defaultProps,G)pt[Z]===void 0&&(pt[Z]=G[Z]);return D(O,k,pt)},fe.createRef=function(){return{current:null}},fe.forwardRef=function(O){return{$$typeof:d,render:O}},fe.isValidElement=H,fe.lazy=function(O){return{$$typeof:v,_payload:{_status:-1,_result:O},_init:q}},fe.memo=function(O,et){return{$$typeof:m,type:O,compare:et===void 0?null:et}},fe.startTransition=function(O){var et=z.T,Mt={};z.T=Mt;try{var Z=O(),pt=z.S;pt!==null&&pt(Mt,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(F,St)}catch(k){St(k)}finally{et!==null&&Mt.types!==null&&(et.types=Mt.types),z.T=et}},fe.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},fe.use=function(O){return z.H.use(O)},fe.useActionState=function(O,et,Mt){return z.H.useActionState(O,et,Mt)},fe.useCallback=function(O,et){return z.H.useCallback(O,et)},fe.useContext=function(O){return z.H.useContext(O)},fe.useDebugValue=function(){},fe.useDeferredValue=function(O,et){return z.H.useDeferredValue(O,et)},fe.useEffect=function(O,et){return z.H.useEffect(O,et)},fe.useEffectEvent=function(O){return z.H.useEffectEvent(O)},fe.useId=function(){return z.H.useId()},fe.useImperativeHandle=function(O,et,Mt){return z.H.useImperativeHandle(O,et,Mt)},fe.useInsertionEffect=function(O,et){return z.H.useInsertionEffect(O,et)},fe.useLayoutEffect=function(O,et){return z.H.useLayoutEffect(O,et)},fe.useMemo=function(O,et){return z.H.useMemo(O,et)},fe.useOptimistic=function(O,et){return z.H.useOptimistic(O,et)},fe.useReducer=function(O,et,Mt){return z.H.useReducer(O,et,Mt)},fe.useRef=function(O){return z.H.useRef(O)},fe.useState=function(O){return z.H.useState(O)},fe.useSyncExternalStore=function(O,et,Mt){return z.H.useSyncExternalStore(O,et,Mt)},fe.useTransition=function(){return z.H.useTransition()},fe.version="19.2.8",fe}var P0;function Pd(){return P0||(P0=1,oh.exports=kx()),oh.exports}var gn=Pd();const Xx=J_(gn);var lh={exports:{}},Ho={},ch={exports:{}},uh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z0;function Wx(){return z0||(z0=1,(function(r){function t(P,X){var q=P.length;P.push(X);t:for(;0<q;){var St=q-1>>>1,At=P[St];if(0<l(At,X))P[St]=X,P[q]=At,q=St;else break t}}function i(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var X=P[0],q=P.pop();if(q!==X){P[0]=q;t:for(var St=0,At=P.length,O=At>>>1;St<O;){var et=2*(St+1)-1,Mt=P[et],Z=et+1,pt=P[Z];if(0>l(Mt,q))Z<At&&0>l(pt,Mt)?(P[St]=pt,P[Z]=q,St=Z):(P[St]=Mt,P[et]=q,St=et);else if(Z<At&&0>l(pt,q))P[St]=pt,P[Z]=q,St=Z;else break t}}return X}function l(P,X){var q=P.sortIndex-X.sortIndex;return q!==0?q:P.id-X.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();r.unstable_now=function(){return h.now()-d}}var p=[],m=[],v=1,_=null,x=3,S=!1,E=!1,b=!1,M=!1,g=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function w(P){for(var X=i(m);X!==null;){if(X.callback===null)s(m);else if(X.startTime<=P)s(m),X.sortIndex=X.expirationTime,t(p,X);else break;X=i(m)}}function V(P){if(b=!1,w(P),!E)if(i(p)!==null)E=!0,F||(F=!0,ht());else{var X=i(m);X!==null&&ft(V,X.startTime-P)}}var F=!1,z=-1,j=5,D=-1;function C(){return M?!0:!(r.unstable_now()-D<j)}function H(){if(M=!1,F){var P=r.unstable_now();D=P;var X=!0;try{t:{E=!1,b&&(b=!1,N(z),z=-1),S=!0;var q=x;try{e:{for(w(P),_=i(p);_!==null&&!(_.expirationTime>P&&C());){var St=_.callback;if(typeof St=="function"){_.callback=null,x=_.priorityLevel;var At=St(_.expirationTime<=P);if(P=r.unstable_now(),typeof At=="function"){_.callback=At,w(P),X=!0;break e}_===i(p)&&s(p),w(P)}else s(p);_=i(p)}if(_!==null)X=!0;else{var O=i(m);O!==null&&ft(V,O.startTime-P),X=!1}}break t}finally{_=null,x=q,S=!1}X=void 0}}finally{X?ht():F=!1}}}var ht;if(typeof L=="function")ht=function(){L(H)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,yt=rt.port2;rt.port1.onmessage=H,ht=function(){yt.postMessage(null)}}else ht=function(){g(H,0)};function ft(P,X){z=g(function(){P(r.unstable_now())},X)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(P){switch(x){case 1:case 2:case 3:var X=3;break;default:X=x}var q=x;x=X;try{return P()}finally{x=q}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(P,X){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var q=x;x=P;try{return X()}finally{x=q}},r.unstable_scheduleCallback=function(P,X,q){var St=r.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?St+q:St):q=St,P){case 1:var At=-1;break;case 2:At=250;break;case 5:At=1073741823;break;case 4:At=1e4;break;default:At=5e3}return At=q+At,P={id:v++,callback:X,priorityLevel:P,startTime:q,expirationTime:At,sortIndex:-1},q>St?(P.sortIndex=q,t(m,P),i(p)===null&&P===i(m)&&(b?(N(z),z=-1):b=!0,ft(V,q-St))):(P.sortIndex=At,t(p,P),E||S||(E=!0,F||(F=!0,ht()))),P},r.unstable_shouldYield=C,r.unstable_wrapCallback=function(P){var X=x;return function(){var q=x;x=X;try{return P.apply(this,arguments)}finally{x=q}}}})(uh)),uh}var I0;function jx(){return I0||(I0=1,ch.exports=Wx()),ch.exports}var fh={exports:{}},Pn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B0;function qx(){if(B0)return Pn;B0=1;var r=Pd();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)m+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:v}}var h=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Pn.createPortal=function(p,m){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,v)},Pn.flushSync=function(p){var m=h.T,v=s.p;try{if(h.T=null,s.p=2,p)return p()}finally{h.T=m,s.p=v,s.d.f()}},Pn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(p,m))},Pn.prefetchDNS=function(p){typeof p=="string"&&s.d.D(p)},Pn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var v=m.as,_=d(v,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,S=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;v==="style"?s.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:S}):v==="script"&&s.d.X(p,{crossOrigin:_,integrity:x,fetchPriority:S,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Pn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var v=d(m.as,m.crossOrigin);s.d.M(p,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&s.d.M(p)},Pn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var v=m.as,_=d(v,m.crossOrigin);s.d.L(p,v,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Pn.preloadModule=function(p,m){if(typeof p=="string")if(m){var v=d(m.as,m.crossOrigin);s.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else s.d.m(p)},Pn.requestFormReset=function(p){s.d.r(p)},Pn.unstable_batchedUpdates=function(p,m){return p(m)},Pn.useFormState=function(p,m,v){return h.H.useFormState(p,m,v)},Pn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Pn.version="19.2.8",Pn}var F0;function Yx(){if(F0)return fh.exports;F0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),fh.exports=qx(),fh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var H0;function Zx(){if(H0)return Ho;H0=1;var r=jx(),t=Pd(),i=Yx();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(s(188))}function m(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return p(u),e;if(f===o)return p(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=f;else{for(var y=!1,A=u.child;A;){if(A===a){y=!0,a=u,o=f;break}if(A===o){y=!0,o=u,a=f;break}A=A.sibling}if(!y){for(A=f.child;A;){if(A===a){y=!0,a=f,o=u;break}if(A===o){y=!0,o=f,a=u;break}A=A.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function v(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=v(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),b=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),L=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),F=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function ht(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var rt=Symbol.for("react.client.reference");function yt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===rt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case b:return"Fragment";case g:return"Profiler";case M:return"StrictMode";case V:return"Suspense";case F:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case L:return e.displayName||"Context";case N:return(e._context.displayName||"Context")+".Consumer";case w:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case z:return n=e.displayName||null,n!==null?n:yt(e.type)||"Memo";case j:n=e._payload,e=e._init;try{return yt(e(n))}catch{}}return null}var ft=Array.isArray,P=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},St=[],At=-1;function O(e){return{current:e}}function et(e){0>At||(e.current=St[At],St[At]=null,At--)}function Mt(e,n){At++,St[At]=e.current,e.current=n}var Z=O(null),pt=O(null),k=O(null),G=O(null);function ot(e,n){switch(Mt(k,n),Mt(pt,e),Mt(Z,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?e0(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=e0(n),e=n0(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(Z),Mt(Z,e)}function st(){et(Z),et(pt),et(k)}function Rt(e){e.memoizedState!==null&&Mt(G,e);var n=Z.current,a=n0(n,e.type);n!==a&&(Mt(pt,e),Mt(Z,a))}function $t(e){pt.current===e&&(et(Z),et(pt)),G.current===e&&(et(G),Po._currentValue=q)}var Kt,ie;function I(e){if(Kt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Kt=n&&n[1]||"",ie=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Kt+e+ie}var pe=!1;function Qt(e,n){if(!e||pe)return"";pe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Et=function(){throw Error()};if(Object.defineProperty(Et.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Et,[])}catch(dt){var lt=dt}Reflect.construct(e,[],Et)}else{try{Et.call()}catch(dt){lt=dt}e.call(Et.prototype)}}else{try{throw Error()}catch(dt){lt=dt}(Et=e())&&typeof Et.catch=="function"&&Et.catch(function(){})}}catch(dt){if(dt&&lt&&typeof dt.stack=="string")return[dt.stack,lt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),y=f[0],A=f[1];if(y&&A){var B=y.split(`
`),at=A.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<at.length&&!at[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===at.length)for(o=B.length-1,u=at.length-1;1<=o&&0<=u&&B[o]!==at[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==at[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==at[u]){var vt=`
`+B[o].replace(" at new "," at ");return e.displayName&&vt.includes("<anonymous>")&&(vt=vt.replace("<anonymous>",e.displayName)),vt}while(1<=o&&0<=u);break}}}finally{pe=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?I(a):""}function re(e,n){switch(e.tag){case 26:case 27:case 5:return I(e.type);case 16:return I("Lazy");case 13:return e.child!==n&&n!==null?I("Suspense Fallback"):I("Suspense");case 19:return I("SuspenseList");case 0:case 15:return Qt(e.type,!1);case 11:return Qt(e.type.render,!1);case 1:return Qt(e.type,!0);case 31:return I("Activity");default:return""}}function Ft(e){try{var n="",a=null;do n+=re(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Yt=Object.prototype.hasOwnProperty,Nt=r.unstable_scheduleCallback,U=r.unstable_cancelCallback,T=r.unstable_shouldYield,nt=r.unstable_requestPaint,mt=r.unstable_now,bt=r.unstable_getCurrentPriorityLevel,_t=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Lt=r.unstable_NormalPriority,Xt=r.unstable_LowPriority,ve=r.unstable_IdlePriority,wt=r.log,kt=r.unstable_setDisableYieldValue,Jt=null,qt=null;function Ht(e){if(typeof wt=="function"&&kt(e),qt&&typeof qt.setStrictMode=="function")try{qt.setStrictMode(Jt,e)}catch{}}var ae=Math.clz32?Math.clz32:Q,he=Math.log,Be=Math.LN2;function Q(e){return e>>>=0,e===0?32:31-(he(e)/Be|0)|0}var Ot=256,gt=262144,Tt=4194304;function Pt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function zt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,f=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var A=o&134217727;return A!==0?(o=A&~f,o!==0?u=Pt(o):(y&=A,y!==0?u=Pt(y):a||(a=A&~e,a!==0&&(u=Pt(a))))):(A=o&~f,A!==0?u=Pt(A):y!==0?u=Pt(y):a||(a=o&~e,a!==0&&(u=Pt(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function oe(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Qe(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hn(){var e=Tt;return Tt<<=1,(Tt&62914560)===0&&(Tt=4194304),e}function De(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Tn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Si(e,n,a,o,u,f){var y=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var A=e.entanglements,B=e.expirationTimes,at=e.hiddenUpdates;for(a=y&~a;0<a;){var vt=31-ae(a),Et=1<<vt;A[vt]=0,B[vt]=-1;var lt=at[vt];if(lt!==null)for(at[vt]=null,vt=0;vt<lt.length;vt++){var dt=lt[vt];dt!==null&&(dt.lane&=-536870913)}a&=~Et}o!==0&&jr(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(y&~n))}function jr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-ae(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function qr(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-ae(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function Ni(e,n){var a=n&-n;return a=(a&42)!==0?1:ts(a),(a&(e.suspendedLanes|n))!==0?0:a}function ts(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Is(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Yr(){var e=X.p;return e!==0?e:(e=window.event,e===void 0?32:T0(e.type))}function es(e,n){var a=X.p;try{return X.p=e,n()}finally{X.p=a}}var Ei=Math.random().toString(36).slice(2),tn="__reactFiber$"+Ei,An="__reactProps$"+Ei,Vi="__reactContainer$"+Ei,Zr="__reactEvents$"+Ei,$c="__reactListeners$"+Ei,tu="__reactHandles$"+Ei,il="__reactResources$"+Ei,ns="__reactMarker$"+Ei;function Kr(e){delete e[tn],delete e[An],delete e[Zr],delete e[$c],delete e[tu]}function R(e){var n=e[tn];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Vi]||a[tn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=c0(e);e!==null;){if(a=e[tn])return a;e=c0(e)}return n}e=a,a=e.parentNode}return null}function J(e){if(e=e[tn]||e[Vi]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function ct(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function ut(e){var n=e[il];return n||(n=e[il]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Y(e){e[ns]=!0}var Ct=new Set,It={};function Gt(e,n){Vt(e,n),Vt(e+"Capture",n)}function Vt(e,n){for(It[e]=n,e=0;e<n.length;e++)Ct.add(n[e])}var le=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ce={},te={};function Ae(e){return Yt.call(te,e)?!0:Yt.call(ce,e)?!1:le.test(e)?te[e]=!0:(ce[e]=!0,!1)}function Re(e,n,a){if(Ae(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ye(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Le(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function ue(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ne(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function dn(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,f.call(this,y)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function we(e){if(!e._valueTracker){var n=ne(e)?"checked":"value";e._valueTracker=dn(e,n,""+e[n])}}function Wn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=ne(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function bi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Hn=/[\n"\\]/g;function xn(e){return e.replace(Hn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Fe(e,n,a,o,u,f,y,A){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),n!=null?y==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+ue(n)):e.value!==""+ue(n)&&(e.value=""+ue(n)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),n!=null?On(e,y,ue(n)):a!=null?On(e,y,ue(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.name=""+ue(A):e.removeAttribute("name")}function Gn(e,n,a,o,u,f,y,A){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){we(e);return}a=a!=null?""+ue(a):"",n=n!=null?""+ue(n):a,A||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=A?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),we(e)}function On(e,n,a){n==="number"&&bi(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function en(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+ue(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Rn(e,n,a){if(n!=null&&(n=""+ue(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+ue(a):""}function Bs(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(ft(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=ue(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),we(e)}function jn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Ov=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Jd(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||Ov.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function $d(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Jd(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&Jd(e,f,n[f])}function eu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),zv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function al(e){return zv.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ki(){}var nu=null;function iu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fs=null,Hs=null;function tp(e){var n=J(e);if(n&&(e=n.stateNode)){var a=e[An]||null;t:switch(e=n.stateNode,n.type){case"input":if(Fe(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+xn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[An]||null;if(!u)throw Error(s(90));Fe(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Wn(o)}break t;case"textarea":Rn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&en(e,!!a.multiple,n,!1)}}}var au=!1;function ep(e,n,a){if(au)return e(n,a);au=!0;try{var o=e(n);return o}finally{if(au=!1,(Fs!==null||Hs!==null)&&(Wl(),Fs&&(n=Fs,e=Hs,Hs=Fs=null,tp(n),e)))for(n=0;n<e.length;n++)tp(e[n])}}function Qr(e,n){var a=e.stateNode;if(a===null)return null;var o=a[An]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Xi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),su=!1;if(Xi)try{var Jr={};Object.defineProperty(Jr,"passive",{get:function(){su=!0}}),window.addEventListener("test",Jr,Jr),window.removeEventListener("test",Jr,Jr)}catch{su=!1}var va=null,ru=null,sl=null;function np(){if(sl)return sl;var e,n=ru,a=n.length,o,u="value"in va?va.value:va.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var y=a-e;for(o=1;o<=y&&n[a-o]===u[f-o];o++);return sl=u.slice(e,1<o?1-o:void 0)}function rl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function ol(){return!0}function ip(){return!1}function qn(e){function n(a,o,u,f,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=y,this.currentTarget=null;for(var A in e)e.hasOwnProperty(A)&&(a=e[A],this[A]=a?a(f):f[A]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ol:ip,this.isPropagationStopped=ip,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ol)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ol)},persist:function(){},isPersistent:ol}),n}var is={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ll=qn(is),$r=_({},is,{view:0,detail:0}),Iv=qn($r),ou,lu,to,cl=_({},$r,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:uu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==to&&(to&&e.type==="mousemove"?(ou=e.screenX-to.screenX,lu=e.screenY-to.screenY):lu=ou=0,to=e),ou)},movementY:function(e){return"movementY"in e?e.movementY:lu}}),ap=qn(cl),Bv=_({},cl,{dataTransfer:0}),Fv=qn(Bv),Hv=_({},$r,{relatedTarget:0}),cu=qn(Hv),Gv=_({},is,{animationName:0,elapsedTime:0,pseudoElement:0}),Vv=qn(Gv),kv=_({},is,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xv=qn(kv),Wv=_({},is,{data:0}),sp=qn(Wv),jv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Yv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Zv(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Yv[e])?!!n[e]:!1}function uu(){return Zv}var Kv=_({},$r,{key:function(e){if(e.key){var n=jv[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=rl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?qv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:uu,charCode:function(e){return e.type==="keypress"?rl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?rl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qv=qn(Kv),Jv=_({},cl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),rp=qn(Jv),$v=_({},$r,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:uu}),ty=qn($v),ey=_({},is,{propertyName:0,elapsedTime:0,pseudoElement:0}),ny=qn(ey),iy=_({},cl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ay=qn(iy),sy=_({},is,{newState:0,oldState:0}),ry=qn(sy),oy=[9,13,27,32],fu=Xi&&"CompositionEvent"in window,eo=null;Xi&&"documentMode"in document&&(eo=document.documentMode);var ly=Xi&&"TextEvent"in window&&!eo,op=Xi&&(!fu||eo&&8<eo&&11>=eo),lp=" ",cp=!1;function up(e,n){switch(e){case"keyup":return oy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Gs=!1;function cy(e,n){switch(e){case"compositionend":return fp(n);case"keypress":return n.which!==32?null:(cp=!0,lp);case"textInput":return e=n.data,e===lp&&cp?null:e;default:return null}}function uy(e,n){if(Gs)return e==="compositionend"||!fu&&up(e,n)?(e=np(),sl=ru=va=null,Gs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return op&&n.locale!=="ko"?null:n.data;default:return null}}var fy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!fy[e.type]:n==="textarea"}function dp(e,n,a,o){Fs?Hs?Hs.push(o):Hs=[o]:Fs=o,n=Jl(n,"onChange"),0<n.length&&(a=new ll("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var no=null,io=null;function hy(e){Zg(e,0)}function ul(e){var n=ct(e);if(Wn(n))return e}function pp(e,n){if(e==="change")return n}var mp=!1;if(Xi){var hu;if(Xi){var du="oninput"in document;if(!du){var gp=document.createElement("div");gp.setAttribute("oninput","return;"),du=typeof gp.oninput=="function"}hu=du}else hu=!1;mp=hu&&(!document.documentMode||9<document.documentMode)}function _p(){no&&(no.detachEvent("onpropertychange",vp),io=no=null)}function vp(e){if(e.propertyName==="value"&&ul(io)){var n=[];dp(n,io,e,iu(e)),ep(hy,n)}}function dy(e,n,a){e==="focusin"?(_p(),no=n,io=a,no.attachEvent("onpropertychange",vp)):e==="focusout"&&_p()}function py(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ul(io)}function my(e,n){if(e==="click")return ul(n)}function gy(e,n){if(e==="input"||e==="change")return ul(n)}function _y(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ei=typeof Object.is=="function"?Object.is:_y;function ao(e,n){if(ei(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Yt.call(n,u)||!ei(e[u],n[u]))return!1}return!0}function yp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xp(e,n){var a=yp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=yp(a)}}function Mp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Mp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Sp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=bi(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=bi(e.document)}return n}function pu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var vy=Xi&&"documentMode"in document&&11>=document.documentMode,Vs=null,mu=null,so=null,gu=!1;function Ep(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;gu||Vs==null||Vs!==bi(o)||(o=Vs,"selectionStart"in o&&pu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),so&&ao(so,o)||(so=o,o=Jl(mu,"onSelect"),0<o.length&&(n=new ll("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Vs)))}function as(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var ks={animationend:as("Animation","AnimationEnd"),animationiteration:as("Animation","AnimationIteration"),animationstart:as("Animation","AnimationStart"),transitionrun:as("Transition","TransitionRun"),transitionstart:as("Transition","TransitionStart"),transitioncancel:as("Transition","TransitionCancel"),transitionend:as("Transition","TransitionEnd")},_u={},bp={};Xi&&(bp=document.createElement("div").style,"AnimationEvent"in window||(delete ks.animationend.animation,delete ks.animationiteration.animation,delete ks.animationstart.animation),"TransitionEvent"in window||delete ks.transitionend.transition);function ss(e){if(_u[e])return _u[e];if(!ks[e])return e;var n=ks[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in bp)return _u[e]=n[a];return e}var Tp=ss("animationend"),Ap=ss("animationiteration"),Rp=ss("animationstart"),yy=ss("transitionrun"),xy=ss("transitionstart"),My=ss("transitioncancel"),Cp=ss("transitionend"),wp=new Map,vu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");vu.push("scrollEnd");function Ti(e,n){wp.set(e,n),Gt(n,[e])}var fl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},fi=[],Xs=0,yu=0;function hl(){for(var e=Xs,n=yu=Xs=0;n<e;){var a=fi[n];fi[n++]=null;var o=fi[n];fi[n++]=null;var u=fi[n];fi[n++]=null;var f=fi[n];if(fi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}f!==0&&Dp(a,u,f)}}function dl(e,n,a,o){fi[Xs++]=e,fi[Xs++]=n,fi[Xs++]=a,fi[Xs++]=o,yu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function xu(e,n,a,o){return dl(e,n,a,o),pl(e)}function rs(e,n){return dl(e,null,null,n),pl(e)}function Dp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-ae(a),e=f.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function pl(e){if(50<Co)throw Co=0,Df=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Ws={};function Sy(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ni(e,n,a,o){return new Sy(e,n,a,o)}function Mu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Wi(e,n){var a=e.alternate;return a===null?(a=ni(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Lp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function ml(e,n,a,o,u,f){var y=0;if(o=e,typeof e=="function")Mu(e)&&(y=1);else if(typeof e=="string")y=Rx(e,a,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ni(31,a,n,u),e.elementType=D,e.lanes=f,e;case b:return os(a.children,u,f,n);case M:y=8,u|=24;break;case g:return e=ni(12,a,n,u|2),e.elementType=g,e.lanes=f,e;case V:return e=ni(13,a,n,u),e.elementType=V,e.lanes=f,e;case F:return e=ni(19,a,n,u),e.elementType=F,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case L:y=10;break t;case N:y=9;break t;case w:y=11;break t;case z:y=14;break t;case j:y=16,o=null;break t}y=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ni(y,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function os(e,n,a,o){return e=ni(7,e,o,n),e.lanes=a,e}function Su(e,n,a){return e=ni(6,e,null,n),e.lanes=a,e}function Up(e){var n=ni(18,null,null,0);return n.stateNode=e,n}function Eu(e,n,a){return n=ni(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Np=new WeakMap;function hi(e,n){if(typeof e=="object"&&e!==null){var a=Np.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Ft(n)},Np.set(e,n),n)}return{value:e,source:n,stack:Ft(n)}}var js=[],qs=0,gl=null,ro=0,di=[],pi=0,ya=null,Oi=1,Pi="";function ji(e,n){js[qs++]=ro,js[qs++]=gl,gl=e,ro=n}function Op(e,n,a){di[pi++]=Oi,di[pi++]=Pi,di[pi++]=ya,ya=e;var o=Oi;e=Pi;var u=32-ae(o)-1;o&=~(1<<u),a+=1;var f=32-ae(n)+u;if(30<f){var y=u-u%5;f=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Oi=1<<32-ae(n)+u|a<<u|o,Pi=f+e}else Oi=1<<f|a<<u|o,Pi=e}function bu(e){e.return!==null&&(ji(e,1),Op(e,1,0))}function Tu(e){for(;e===gl;)gl=js[--qs],js[qs]=null,ro=js[--qs],js[qs]=null;for(;e===ya;)ya=di[--pi],di[pi]=null,Pi=di[--pi],di[pi]=null,Oi=di[--pi],di[pi]=null}function Pp(e,n){di[pi++]=Oi,di[pi++]=Pi,di[pi++]=ya,Oi=n.id,Pi=n.overflow,ya=e}var Cn=null,Ze=null,Ce=!1,xa=null,mi=!1,Au=Error(s(519));function Ma(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw oo(hi(n,e)),Au}function zp(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[tn]=e,n[An]=o,a){case"dialog":Se("cancel",n),Se("close",n);break;case"iframe":case"object":case"embed":Se("load",n);break;case"video":case"audio":for(a=0;a<Do.length;a++)Se(Do[a],n);break;case"source":Se("error",n);break;case"img":case"image":case"link":Se("error",n),Se("load",n);break;case"details":Se("toggle",n);break;case"input":Se("invalid",n),Gn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Se("invalid",n);break;case"textarea":Se("invalid",n),Bs(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||$g(n.textContent,a)?(o.popover!=null&&(Se("beforetoggle",n),Se("toggle",n)),o.onScroll!=null&&Se("scroll",n),o.onScrollEnd!=null&&Se("scrollend",n),o.onClick!=null&&(n.onclick=ki),n=!0):n=!1,n||Ma(e,!0)}function Ip(e){for(Cn=e.return;Cn;)switch(Cn.tag){case 5:case 31:case 13:mi=!1;return;case 27:case 3:mi=!0;return;default:Cn=Cn.return}}function Ys(e){if(e!==Cn)return!1;if(!Ce)return Ip(e),Ce=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Wf(e.type,e.memoizedProps)),a=!a),a&&Ze&&Ma(e),Ip(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ze=l0(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ze=l0(e)}else n===27?(n=Ze,Pa(e.type)?(e=Kf,Kf=null,Ze=e):Ze=n):Ze=Cn?_i(e.stateNode.nextSibling):null;return!0}function ls(){Ze=Cn=null,Ce=!1}function Ru(){var e=xa;return e!==null&&(Qn===null?Qn=e:Qn.push.apply(Qn,e),xa=null),e}function oo(e){xa===null?xa=[e]:xa.push(e)}var Cu=O(null),cs=null,qi=null;function Sa(e,n,a){Mt(Cu,n._currentValue),n._currentValue=a}function Yi(e){e._currentValue=Cu.current,et(Cu)}function wu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Du(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var y=u.child;f=f.firstContext;t:for(;f!==null;){var A=f;f=u;for(var B=0;B<n.length;B++)if(A.context===n[B]){f.lanes|=a,A=f.alternate,A!==null&&(A.lanes|=a),wu(f.return,a,e),o||(y=null);break t}f=A.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,f=y.alternate,f!==null&&(f.lanes|=a),wu(y,a,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function Zs(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var A=u.type;ei(u.pendingProps.value,y.value)||(e!==null?e.push(A):e=[A])}}else if(u===G.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Po):e=[Po])}u=u.return}e!==null&&Du(n,e,a,o),n.flags|=262144}function _l(e){for(e=e.firstContext;e!==null;){if(!ei(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function us(e){cs=e,qi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function wn(e){return Bp(cs,e)}function vl(e,n){return cs===null&&us(e),Bp(e,n)}function Bp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},qi===null){if(e===null)throw Error(s(308));qi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else qi=qi.next=n;return a}var Ey=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},by=r.unstable_scheduleCallback,Ty=r.unstable_NormalPriority,on={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Lu(){return{controller:new Ey,data:new Map,refCount:0}}function lo(e){e.refCount--,e.refCount===0&&by(Ty,function(){e.controller.abort()})}var co=null,Uu=0,Ks=0,Qs=null;function Ay(e,n){if(co===null){var a=co=[];Uu=0,Ks=zf(),Qs={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Uu++,n.then(Fp,Fp),n}function Fp(){if(--Uu===0&&co!==null){Qs!==null&&(Qs.status="fulfilled");var e=co;co=null,Ks=0,Qs=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Ry(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Hp=P.S;P.S=function(e,n){Eg=mt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ay(e,n),Hp!==null&&Hp(e,n)};var fs=O(null);function Nu(){var e=fs.current;return e!==null?e:je.pooledCache}function yl(e,n){n===null?Mt(fs,fs.current):Mt(fs,n.pool)}function Gp(){var e=Nu();return e===null?null:{parent:on._currentValue,pool:e}}var Js=Error(s(460)),Ou=Error(s(474)),xl=Error(s(542)),Ml={then:function(){}};function Vp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function kp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(ki,ki),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Wp(e),e;default:if(typeof n.status=="string")n.then(ki,ki);else{if(e=je,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Wp(e),e}throw ds=n,Js}}function hs(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ds=a,Js):a}}var ds=null;function Xp(){if(ds===null)throw Error(s(459));var e=ds;return ds=null,e}function Wp(e){if(e===Js||e===xl)throw Error(s(483))}var $s=null,uo=0;function Sl(e){var n=uo;return uo+=1,$s===null&&($s=[]),kp($s,e,n)}function fo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function El(e,n){throw n.$$typeof===x?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function jp(e){function n($,W){if(e){var it=$.deletions;it===null?($.deletions=[W],$.flags|=16):it.push(W)}}function a($,W){if(!e)return null;for(;W!==null;)n($,W),W=W.sibling;return null}function o($){for(var W=new Map;$!==null;)$.key!==null?W.set($.key,$):W.set($.index,$),$=$.sibling;return W}function u($,W){return $=Wi($,W),$.index=0,$.sibling=null,$}function f($,W,it){return $.index=it,e?(it=$.alternate,it!==null?(it=it.index,it<W?($.flags|=67108866,W):it):($.flags|=67108866,W)):($.flags|=1048576,W)}function y($){return e&&$.alternate===null&&($.flags|=67108866),$}function A($,W,it,xt){return W===null||W.tag!==6?(W=Su(it,$.mode,xt),W.return=$,W):(W=u(W,it),W.return=$,W)}function B($,W,it,xt){var ee=it.type;return ee===b?vt($,W,it.props.children,xt,it.key):W!==null&&(W.elementType===ee||typeof ee=="object"&&ee!==null&&ee.$$typeof===j&&hs(ee)===W.type)?(W=u(W,it.props),fo(W,it),W.return=$,W):(W=ml(it.type,it.key,it.props,null,$.mode,xt),fo(W,it),W.return=$,W)}function at($,W,it,xt){return W===null||W.tag!==4||W.stateNode.containerInfo!==it.containerInfo||W.stateNode.implementation!==it.implementation?(W=Eu(it,$.mode,xt),W.return=$,W):(W=u(W,it.children||[]),W.return=$,W)}function vt($,W,it,xt,ee){return W===null||W.tag!==7?(W=os(it,$.mode,xt,ee),W.return=$,W):(W=u(W,it),W.return=$,W)}function Et($,W,it){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=Su(""+W,$.mode,it),W.return=$,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case S:return it=ml(W.type,W.key,W.props,null,$.mode,it),fo(it,W),it.return=$,it;case E:return W=Eu(W,$.mode,it),W.return=$,W;case j:return W=hs(W),Et($,W,it)}if(ft(W)||ht(W))return W=os(W,$.mode,it,null),W.return=$,W;if(typeof W.then=="function")return Et($,Sl(W),it);if(W.$$typeof===L)return Et($,vl($,W),it);El($,W)}return null}function lt($,W,it,xt){var ee=W!==null?W.key:null;if(typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint")return ee!==null?null:A($,W,""+it,xt);if(typeof it=="object"&&it!==null){switch(it.$$typeof){case S:return it.key===ee?B($,W,it,xt):null;case E:return it.key===ee?at($,W,it,xt):null;case j:return it=hs(it),lt($,W,it,xt)}if(ft(it)||ht(it))return ee!==null?null:vt($,W,it,xt,null);if(typeof it.then=="function")return lt($,W,Sl(it),xt);if(it.$$typeof===L)return lt($,W,vl($,it),xt);El($,it)}return null}function dt($,W,it,xt,ee){if(typeof xt=="string"&&xt!==""||typeof xt=="number"||typeof xt=="bigint")return $=$.get(it)||null,A(W,$,""+xt,ee);if(typeof xt=="object"&&xt!==null){switch(xt.$$typeof){case S:return $=$.get(xt.key===null?it:xt.key)||null,B(W,$,xt,ee);case E:return $=$.get(xt.key===null?it:xt.key)||null,at(W,$,xt,ee);case j:return xt=hs(xt),dt($,W,it,xt,ee)}if(ft(xt)||ht(xt))return $=$.get(it)||null,vt(W,$,xt,ee,null);if(typeof xt.then=="function")return dt($,W,it,Sl(xt),ee);if(xt.$$typeof===L)return dt($,W,it,vl(W,xt),ee);El(W,xt)}return null}function jt($,W,it,xt){for(var ee=null,Ue=null,Zt=W,ge=W=0,Te=null;Zt!==null&&ge<it.length;ge++){Zt.index>ge?(Te=Zt,Zt=null):Te=Zt.sibling;var Ne=lt($,Zt,it[ge],xt);if(Ne===null){Zt===null&&(Zt=Te);break}e&&Zt&&Ne.alternate===null&&n($,Zt),W=f(Ne,W,ge),Ue===null?ee=Ne:Ue.sibling=Ne,Ue=Ne,Zt=Te}if(ge===it.length)return a($,Zt),Ce&&ji($,ge),ee;if(Zt===null){for(;ge<it.length;ge++)Zt=Et($,it[ge],xt),Zt!==null&&(W=f(Zt,W,ge),Ue===null?ee=Zt:Ue.sibling=Zt,Ue=Zt);return Ce&&ji($,ge),ee}for(Zt=o(Zt);ge<it.length;ge++)Te=dt(Zt,$,ge,it[ge],xt),Te!==null&&(e&&Te.alternate!==null&&Zt.delete(Te.key===null?ge:Te.key),W=f(Te,W,ge),Ue===null?ee=Te:Ue.sibling=Te,Ue=Te);return e&&Zt.forEach(function(Ha){return n($,Ha)}),Ce&&ji($,ge),ee}function se($,W,it,xt){if(it==null)throw Error(s(151));for(var ee=null,Ue=null,Zt=W,ge=W=0,Te=null,Ne=it.next();Zt!==null&&!Ne.done;ge++,Ne=it.next()){Zt.index>ge?(Te=Zt,Zt=null):Te=Zt.sibling;var Ha=lt($,Zt,Ne.value,xt);if(Ha===null){Zt===null&&(Zt=Te);break}e&&Zt&&Ha.alternate===null&&n($,Zt),W=f(Ha,W,ge),Ue===null?ee=Ha:Ue.sibling=Ha,Ue=Ha,Zt=Te}if(Ne.done)return a($,Zt),Ce&&ji($,ge),ee;if(Zt===null){for(;!Ne.done;ge++,Ne=it.next())Ne=Et($,Ne.value,xt),Ne!==null&&(W=f(Ne,W,ge),Ue===null?ee=Ne:Ue.sibling=Ne,Ue=Ne);return Ce&&ji($,ge),ee}for(Zt=o(Zt);!Ne.done;ge++,Ne=it.next())Ne=dt(Zt,$,ge,Ne.value,xt),Ne!==null&&(e&&Ne.alternate!==null&&Zt.delete(Ne.key===null?ge:Ne.key),W=f(Ne,W,ge),Ue===null?ee=Ne:Ue.sibling=Ne,Ue=Ne);return e&&Zt.forEach(function(Bx){return n($,Bx)}),Ce&&ji($,ge),ee}function Ve($,W,it,xt){if(typeof it=="object"&&it!==null&&it.type===b&&it.key===null&&(it=it.props.children),typeof it=="object"&&it!==null){switch(it.$$typeof){case S:t:{for(var ee=it.key;W!==null;){if(W.key===ee){if(ee=it.type,ee===b){if(W.tag===7){a($,W.sibling),xt=u(W,it.props.children),xt.return=$,$=xt;break t}}else if(W.elementType===ee||typeof ee=="object"&&ee!==null&&ee.$$typeof===j&&hs(ee)===W.type){a($,W.sibling),xt=u(W,it.props),fo(xt,it),xt.return=$,$=xt;break t}a($,W);break}else n($,W);W=W.sibling}it.type===b?(xt=os(it.props.children,$.mode,xt,it.key),xt.return=$,$=xt):(xt=ml(it.type,it.key,it.props,null,$.mode,xt),fo(xt,it),xt.return=$,$=xt)}return y($);case E:t:{for(ee=it.key;W!==null;){if(W.key===ee)if(W.tag===4&&W.stateNode.containerInfo===it.containerInfo&&W.stateNode.implementation===it.implementation){a($,W.sibling),xt=u(W,it.children||[]),xt.return=$,$=xt;break t}else{a($,W);break}else n($,W);W=W.sibling}xt=Eu(it,$.mode,xt),xt.return=$,$=xt}return y($);case j:return it=hs(it),Ve($,W,it,xt)}if(ft(it))return jt($,W,it,xt);if(ht(it)){if(ee=ht(it),typeof ee!="function")throw Error(s(150));return it=ee.call(it),se($,W,it,xt)}if(typeof it.then=="function")return Ve($,W,Sl(it),xt);if(it.$$typeof===L)return Ve($,W,vl($,it),xt);El($,it)}return typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint"?(it=""+it,W!==null&&W.tag===6?(a($,W.sibling),xt=u(W,it),xt.return=$,$=xt):(a($,W),xt=Su(it,$.mode,xt),xt.return=$,$=xt),y($)):a($,W)}return function($,W,it,xt){try{uo=0;var ee=Ve($,W,it,xt);return $s=null,ee}catch(Zt){if(Zt===Js||Zt===xl)throw Zt;var Ue=ni(29,Zt,null,$.mode);return Ue.lanes=xt,Ue.return=$,Ue}finally{}}}var ps=jp(!0),qp=jp(!1),Ea=!1;function Pu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function zu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ba(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ta(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Pe&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=pl(e),Dp(e,null,a),n}return dl(e,o,n,a),pl(e)}function ho(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,qr(e,a)}}function Iu(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=y:f=f.next=y,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Bu=!1;function po(){if(Bu){var e=Qs;if(e!==null)throw e}}function mo(e,n,a,o){Bu=!1;var u=e.updateQueue;Ea=!1;var f=u.firstBaseUpdate,y=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var B=A,at=B.next;B.next=null,y===null?f=at:y.next=at,y=B;var vt=e.alternate;vt!==null&&(vt=vt.updateQueue,A=vt.lastBaseUpdate,A!==y&&(A===null?vt.firstBaseUpdate=at:A.next=at,vt.lastBaseUpdate=B))}if(f!==null){var Et=u.baseState;y=0,vt=at=B=null,A=f;do{var lt=A.lane&-536870913,dt=lt!==A.lane;if(dt?(be&lt)===lt:(o&lt)===lt){lt!==0&&lt===Ks&&(Bu=!0),vt!==null&&(vt=vt.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var jt=e,se=A;lt=n;var Ve=a;switch(se.tag){case 1:if(jt=se.payload,typeof jt=="function"){Et=jt.call(Ve,Et,lt);break t}Et=jt;break t;case 3:jt.flags=jt.flags&-65537|128;case 0:if(jt=se.payload,lt=typeof jt=="function"?jt.call(Ve,Et,lt):jt,lt==null)break t;Et=_({},Et,lt);break t;case 2:Ea=!0}}lt=A.callback,lt!==null&&(e.flags|=64,dt&&(e.flags|=8192),dt=u.callbacks,dt===null?u.callbacks=[lt]:dt.push(lt))}else dt={lane:lt,tag:A.tag,payload:A.payload,callback:A.callback,next:null},vt===null?(at=vt=dt,B=Et):vt=vt.next=dt,y|=lt;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;dt=A,A=dt.next,dt.next=null,u.lastBaseUpdate=dt,u.shared.pending=null}}while(!0);vt===null&&(B=Et),u.baseState=B,u.firstBaseUpdate=at,u.lastBaseUpdate=vt,f===null&&(u.shared.lanes=0),Da|=y,e.lanes=y,e.memoizedState=Et}}function Yp(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Zp(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Yp(a[e],n)}var tr=O(null),bl=O(0);function Kp(e,n){e=ia,Mt(bl,e),Mt(tr,n),ia=e|n.baseLanes}function Fu(){Mt(bl,ia),Mt(tr,tr.current)}function Hu(){ia=bl.current,et(tr),et(bl)}var ii=O(null),gi=null;function Aa(e){var n=e.alternate;Mt(sn,sn.current&1),Mt(ii,e),gi===null&&(n===null||tr.current!==null||n.memoizedState!==null)&&(gi=e)}function Gu(e){Mt(sn,sn.current),Mt(ii,e),gi===null&&(gi=e)}function Qp(e){e.tag===22?(Mt(sn,sn.current),Mt(ii,e),gi===null&&(gi=e)):Ra()}function Ra(){Mt(sn,sn.current),Mt(ii,ii.current)}function ai(e){et(ii),gi===e&&(gi=null),et(sn)}var sn=O(0);function Tl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Yf(a)||Zf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Zi=0,me=null,He=null,ln=null,Al=!1,er=!1,ms=!1,Rl=0,go=0,nr=null,Cy=0;function nn(){throw Error(s(321))}function Vu(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ei(e[a],n[a]))return!1;return!0}function ku(e,n,a,o,u,f){return Zi=f,me=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,P.H=e===null||e.memoizedState===null?Om:sf,ms=!1,f=a(o,u),ms=!1,er&&(f=$p(n,a,o,u)),Jp(e),f}function Jp(e){P.H=yo;var n=He!==null&&He.next!==null;if(Zi=0,ln=He=me=null,Al=!1,go=0,nr=null,n)throw Error(s(300));e===null||cn||(e=e.dependencies,e!==null&&_l(e)&&(cn=!0))}function $p(e,n,a,o){me=e;var u=0;do{if(er&&(nr=null),go=0,er=!1,25<=u)throw Error(s(301));if(u+=1,ln=He=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}P.H=Pm,f=n(a,o)}while(er);return f}function wy(){var e=P.H,n=e.useState()[0];return n=typeof n.then=="function"?_o(n):n,e=e.useState()[0],(He!==null?He.memoizedState:null)!==e&&(me.flags|=1024),n}function Xu(){var e=Rl!==0;return Rl=0,e}function Wu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function ju(e){if(Al){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Al=!1}Zi=0,ln=He=me=null,er=!1,go=Rl=0,nr=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ln===null?me.memoizedState=ln=e:ln=ln.next=e,ln}function rn(){if(He===null){var e=me.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var n=ln===null?me.memoizedState:ln.next;if(n!==null)ln=n,He=e;else{if(e===null)throw me.alternate===null?Error(s(467)):Error(s(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},ln===null?me.memoizedState=ln=e:ln=ln.next=e}return ln}function Cl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function _o(e){var n=go;return go+=1,nr===null&&(nr=[]),e=kp(nr,e,n),n=me,(ln===null?n.memoizedState:ln.next)===null&&(n=n.alternate,P.H=n===null||n.memoizedState===null?Om:sf),e}function wl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return _o(e);if(e.$$typeof===L)return wn(e)}throw Error(s(438,String(e)))}function qu(e){var n=null,a=me.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=me.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Cl(),me.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=C;return n.index++,a}function Ki(e,n){return typeof n=="function"?n(e):n}function Dl(e){var n=rn();return Yu(n,He,e)}function Yu(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var y=u.next;u.next=f.next,f.next=y}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var A=y=null,B=null,at=n,vt=!1;do{var Et=at.lane&-536870913;if(Et!==at.lane?(be&Et)===Et:(Zi&Et)===Et){var lt=at.revertLane;if(lt===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null}),Et===Ks&&(vt=!0);else if((Zi&lt)===lt){at=at.next,lt===Ks&&(vt=!0);continue}else Et={lane:0,revertLane:at.revertLane,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},B===null?(A=B=Et,y=f):B=B.next=Et,me.lanes|=lt,Da|=lt;Et=at.action,ms&&a(f,Et),f=at.hasEagerState?at.eagerState:a(f,Et)}else lt={lane:Et,revertLane:at.revertLane,gesture:at.gesture,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},B===null?(A=B=lt,y=f):B=B.next=lt,me.lanes|=Et,Da|=Et;at=at.next}while(at!==null&&at!==n);if(B===null?y=f:B.next=A,!ei(f,e.memoizedState)&&(cn=!0,vt&&(a=Qs,a!==null)))throw a;e.memoizedState=f,e.baseState=y,e.baseQueue=B,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Zu(e){var n=rn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do f=e(f,y.action),y=y.next;while(y!==u);ei(f,n.memoizedState)||(cn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function tm(e,n,a){var o=me,u=rn(),f=Ce;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!ei((He||u).memoizedState,a);if(y&&(u.memoizedState=a,cn=!0),u=u.queue,Ju(im.bind(null,o,u,e),[e]),u.getSnapshot!==n||y||ln!==null&&ln.memoizedState.tag&1){if(o.flags|=2048,ir(9,{destroy:void 0},nm.bind(null,o,u,a,n),null),je===null)throw Error(s(349));f||(Zi&127)!==0||em(o,n,a)}return a}function em(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=me.updateQueue,n===null?(n=Cl(),me.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function nm(e,n,a,o){n.value=a,n.getSnapshot=o,am(n)&&sm(e)}function im(e,n,a){return a(function(){am(n)&&sm(e)})}function am(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ei(e,a)}catch{return!0}}function sm(e){var n=rs(e,2);n!==null&&Jn(n,e,2)}function Ku(e){var n=Vn();if(typeof e=="function"){var a=e;if(e=a(),ms){Ht(!0);try{a()}finally{Ht(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ki,lastRenderedState:e},n}function rm(e,n,a,o){return e.baseState=a,Yu(e,He,typeof o=="function"?o:Ki)}function Dy(e,n,a,o,u){if(Nl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){f.listeners.push(y)}};P.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,om(n,f)):(f.next=a.next,n.pending=a.next=f)}}function om(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=P.T,y={};P.T=y;try{var A=a(u,o),B=P.S;B!==null&&B(y,A),lm(e,n,A)}catch(at){Qu(e,n,at)}finally{f!==null&&y.types!==null&&(f.types=y.types),P.T=f}}else try{f=a(u,o),lm(e,n,f)}catch(at){Qu(e,n,at)}}function lm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){cm(e,n,o)},function(o){return Qu(e,n,o)}):cm(e,n,a)}function cm(e,n,a){n.status="fulfilled",n.value=a,um(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,om(e,a)))}function Qu(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,um(n),n=n.next;while(n!==o)}e.action=null}function um(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function fm(e,n){return n}function hm(e,n){if(Ce){var a=je.formState;if(a!==null){t:{var o=me;if(Ce){if(Ze){e:{for(var u=Ze,f=mi;u.nodeType!==8;){if(!f){u=null;break e}if(u=_i(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Ze=_i(u.nextSibling),o=u.data==="F!";break t}}Ma(o)}o=!1}o&&(n=a[0])}}return a=Vn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fm,lastRenderedState:n},a.queue=o,a=Lm.bind(null,me,o),o.dispatch=a,o=Ku(!1),f=af.bind(null,me,!1,o.queue),o=Vn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=Dy.bind(null,me,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function dm(e){var n=rn();return pm(n,He,e)}function pm(e,n,a){if(n=Yu(e,n,fm)[0],e=Dl(Ki)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=_o(n)}catch(y){throw y===Js?xl:y}else o=n;n=rn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(me.flags|=2048,ir(9,{destroy:void 0},Ly.bind(null,u,a),null)),[o,f,e]}function Ly(e,n){e.action=n}function mm(e){var n=rn(),a=He;if(a!==null)return pm(n,a,e);rn(),n=n.memoizedState,a=rn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function ir(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=me.updateQueue,n===null&&(n=Cl(),me.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function gm(){return rn().memoizedState}function Ll(e,n,a,o){var u=Vn();me.flags|=e,u.memoizedState=ir(1|n,{destroy:void 0},a,o===void 0?null:o)}function Ul(e,n,a,o){var u=rn();o=o===void 0?null:o;var f=u.memoizedState.inst;He!==null&&o!==null&&Vu(o,He.memoizedState.deps)?u.memoizedState=ir(n,f,a,o):(me.flags|=e,u.memoizedState=ir(1|n,f,a,o))}function _m(e,n){Ll(8390656,8,e,n)}function Ju(e,n){Ul(2048,8,e,n)}function Uy(e){me.flags|=4;var n=me.updateQueue;if(n===null)n=Cl(),me.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function vm(e){var n=rn().memoizedState;return Uy({ref:n,nextImpl:e}),function(){if((Pe&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function ym(e,n){return Ul(4,2,e,n)}function xm(e,n){return Ul(4,4,e,n)}function Mm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Sm(e,n,a){a=a!=null?a.concat([e]):null,Ul(4,4,Mm.bind(null,n,e),a)}function $u(){}function Em(e,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Vu(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function bm(e,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Vu(n,o[1]))return o[0];if(o=e(),ms){Ht(!0);try{e()}finally{Ht(!1)}}return a.memoizedState=[o,n],o}function tf(e,n,a){return a===void 0||(Zi&1073741824)!==0&&(be&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=Tg(),me.lanes|=e,Da|=e,a)}function Tm(e,n,a,o){return ei(a,n)?a:tr.current!==null?(e=tf(e,a,o),ei(e,n)||(cn=!0),e):(Zi&42)===0||(Zi&1073741824)!==0&&(be&261930)===0?(cn=!0,e.memoizedState=a):(e=Tg(),me.lanes|=e,Da|=e,n)}function Am(e,n,a,o,u){var f=X.p;X.p=f!==0&&8>f?f:8;var y=P.T,A={};P.T=A,af(e,!1,n,a);try{var B=u(),at=P.S;if(at!==null&&at(A,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var vt=Ry(B,o);vo(e,n,vt,oi(e))}else vo(e,n,o,oi(e))}catch(Et){vo(e,n,{then:function(){},status:"rejected",reason:Et},oi())}finally{X.p=f,y!==null&&A.types!==null&&(y.types=A.types),P.T=y}}function Ny(){}function ef(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=Rm(e).queue;Am(e,u,n,q,a===null?Ny:function(){return Cm(e),a(o)})}function Rm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ki,lastRenderedState:q},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ki,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Cm(e){var n=Rm(e);n.next===null&&(n=e.alternate.memoizedState),vo(e,n.next.queue,{},oi())}function nf(){return wn(Po)}function wm(){return rn().memoizedState}function Dm(){return rn().memoizedState}function Oy(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=oi();e=ba(a);var o=Ta(n,e,a);o!==null&&(Jn(o,n,a),ho(o,n,a)),n={cache:Lu()},e.payload=n;return}n=n.return}}function Py(e,n,a){var o=oi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Nl(e)?Um(n,a):(a=xu(e,n,a,o),a!==null&&(Jn(a,e,o),Nm(a,n,o)))}function Lm(e,n,a){var o=oi();vo(e,n,a,o)}function vo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Nl(e))Um(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var y=n.lastRenderedState,A=f(y,a);if(u.hasEagerState=!0,u.eagerState=A,ei(A,y))return dl(e,n,u,0),je===null&&hl(),!1}catch{}finally{}if(a=xu(e,n,u,o),a!==null)return Jn(a,e,o),Nm(a,n,o),!0}return!1}function af(e,n,a,o){if(o={lane:2,revertLane:zf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Nl(e)){if(n)throw Error(s(479))}else n=xu(e,a,o,2),n!==null&&Jn(n,e,2)}function Nl(e){var n=e.alternate;return e===me||n!==null&&n===me}function Um(e,n){er=Al=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Nm(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,qr(e,a)}}var yo={readContext:wn,use:wl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};yo.useEffectEvent=nn;var Om={readContext:wn,use:wl,useCallback:function(e,n){return Vn().memoizedState=[e,n===void 0?null:n],e},useContext:wn,useEffect:_m,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Ll(4194308,4,Mm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Ll(4194308,4,e,n)},useInsertionEffect:function(e,n){Ll(4,2,e,n)},useMemo:function(e,n){var a=Vn();n=n===void 0?null:n;var o=e();if(ms){Ht(!0);try{e()}finally{Ht(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Vn();if(a!==void 0){var u=a(n);if(ms){Ht(!0);try{a(n)}finally{Ht(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Py.bind(null,me,e),[o.memoizedState,e]},useRef:function(e){var n=Vn();return e={current:e},n.memoizedState=e},useState:function(e){e=Ku(e);var n=e.queue,a=Lm.bind(null,me,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:$u,useDeferredValue:function(e,n){var a=Vn();return tf(a,e,n)},useTransition:function(){var e=Ku(!1);return e=Am.bind(null,me,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=me,u=Vn();if(Ce){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),je===null)throw Error(s(349));(be&127)!==0||em(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,_m(im.bind(null,o,f,e),[e]),o.flags|=2048,ir(9,{destroy:void 0},nm.bind(null,o,f,a,n),null),a},useId:function(){var e=Vn(),n=je.identifierPrefix;if(Ce){var a=Pi,o=Oi;a=(o&~(1<<32-ae(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Rl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Cy++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:nf,useFormState:hm,useActionState:hm,useOptimistic:function(e){var n=Vn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=af.bind(null,me,!0,a),a.dispatch=n,[e,n]},useMemoCache:qu,useCacheRefresh:function(){return Vn().memoizedState=Oy.bind(null,me)},useEffectEvent:function(e){var n=Vn(),a={impl:e};return n.memoizedState=a,function(){if((Pe&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},sf={readContext:wn,use:wl,useCallback:Em,useContext:wn,useEffect:Ju,useImperativeHandle:Sm,useInsertionEffect:ym,useLayoutEffect:xm,useMemo:bm,useReducer:Dl,useRef:gm,useState:function(){return Dl(Ki)},useDebugValue:$u,useDeferredValue:function(e,n){var a=rn();return Tm(a,He.memoizedState,e,n)},useTransition:function(){var e=Dl(Ki)[0],n=rn().memoizedState;return[typeof e=="boolean"?e:_o(e),n]},useSyncExternalStore:tm,useId:wm,useHostTransitionStatus:nf,useFormState:dm,useActionState:dm,useOptimistic:function(e,n){var a=rn();return rm(a,He,e,n)},useMemoCache:qu,useCacheRefresh:Dm};sf.useEffectEvent=vm;var Pm={readContext:wn,use:wl,useCallback:Em,useContext:wn,useEffect:Ju,useImperativeHandle:Sm,useInsertionEffect:ym,useLayoutEffect:xm,useMemo:bm,useReducer:Zu,useRef:gm,useState:function(){return Zu(Ki)},useDebugValue:$u,useDeferredValue:function(e,n){var a=rn();return He===null?tf(a,e,n):Tm(a,He.memoizedState,e,n)},useTransition:function(){var e=Zu(Ki)[0],n=rn().memoizedState;return[typeof e=="boolean"?e:_o(e),n]},useSyncExternalStore:tm,useId:wm,useHostTransitionStatus:nf,useFormState:mm,useActionState:mm,useOptimistic:function(e,n){var a=rn();return He!==null?rm(a,He,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:qu,useCacheRefresh:Dm};Pm.useEffectEvent=vm;function rf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var of={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=oi(),u=ba(o);u.payload=n,a!=null&&(u.callback=a),n=Ta(e,u,o),n!==null&&(Jn(n,e,o),ho(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=oi(),u=ba(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ta(e,u,o),n!==null&&(Jn(n,e,o),ho(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=oi(),o=ba(a);o.tag=2,n!=null&&(o.callback=n),n=Ta(e,o,a),n!==null&&(Jn(n,e,a),ho(n,e,a))}};function zm(e,n,a,o,u,f,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,y):n.prototype&&n.prototype.isPureReactComponent?!ao(a,o)||!ao(u,f):!0}function Im(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&of.enqueueReplaceState(n,n.state,null)}function gs(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function Bm(e){fl(e)}function Fm(e){console.error(e)}function Hm(e){fl(e)}function Ol(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Gm(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function lf(e,n,a){return a=ba(a),a.tag=3,a.payload={element:null},a.callback=function(){Ol(e,n)},a}function Vm(e){return e=ba(e),e.tag=3,e}function km(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){Gm(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){Gm(n,a,o),typeof u!="function"&&(La===null?La=new Set([this]):La.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})})}function zy(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Zs(n,a,u,!0),a=ii.current,a!==null){switch(a.tag){case 31:case 13:return gi===null?jl():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Ml?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Nf(e,o,u)),!1;case 22:return a.flags|=65536,o===Ml?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Nf(e,o,u)),!1}throw Error(s(435,a.tag))}return Nf(e,o,u),jl(),!1}if(Ce)return n=ii.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Au&&(e=Error(s(422),{cause:o}),oo(hi(e,a)))):(o!==Au&&(n=Error(s(423),{cause:o}),oo(hi(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=hi(o,a),u=lf(e.stateNode,o,u),Iu(e,u),an!==4&&(an=2)),!1;var f=Error(s(520),{cause:o});if(f=hi(f,a),Ro===null?Ro=[f]:Ro.push(f),an!==4&&(an=2),n===null)return!0;o=hi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=lf(a.stateNode,o,e),Iu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(La===null||!La.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Vm(u),km(u,e,a,o),Iu(a,u),!1}a=a.return}while(a!==null);return!1}var cf=Error(s(461)),cn=!1;function Dn(e,n,a,o){n.child=e===null?qp(n,null,a,o):ps(n,e.child,a,o)}function Xm(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var y={};for(var A in o)A!=="ref"&&(y[A]=o[A])}else y=o;return us(n),o=ku(e,n,a,y,f,u),A=Xu(),e!==null&&!cn?(Wu(e,n,u),Qi(e,n,u)):(Ce&&A&&bu(n),n.flags|=1,Dn(e,n,o,u),n.child)}function Wm(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Mu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,jm(e,n,f,o,u)):(e=ml(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!_f(e,u)){var y=f.memoizedProps;if(a=a.compare,a=a!==null?a:ao,a(y,o)&&e.ref===n.ref)return Qi(e,n,u)}return n.flags|=1,e=Wi(f,o),e.ref=n.ref,e.return=n,n.child=e}function jm(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if(ao(f,o)&&e.ref===n.ref)if(cn=!1,n.pendingProps=o=f,_f(e,u))(e.flags&131072)!==0&&(cn=!0);else return n.lanes=e.lanes,Qi(e,n,u)}return uf(e,n,a,o,u)}function qm(e,n,a,o){var u=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return Ym(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&yl(n,f!==null?f.cachePool:null),f!==null?Kp(n,f):Fu(),Qp(n);else return o=n.lanes=536870912,Ym(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(yl(n,f.cachePool),Kp(n,f),Ra(),n.memoizedState=null):(e!==null&&yl(n,null),Fu(),Ra());return Dn(e,n,u,a),n.child}function xo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Ym(e,n,a,o,u){var f=Nu();return f=f===null?null:{parent:on._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&yl(n,null),Fu(),Qp(n),e!==null&&Zs(e,n,o,!0),n.childLanes=u,null}function Pl(e,n){return n=Il({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Zm(e,n,a){return ps(n,e.child,null,a),e=Pl(n,n.pendingProps),e.flags|=2,ai(n),n.memoizedState=null,e}function Iy(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ce){if(o.mode==="hidden")return e=Pl(n,o),n.lanes=536870912,xo(null,e);if(Gu(n),(e=Ze)?(e=o0(e,mi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ya!==null?{id:Oi,overflow:Pi}:null,retryLane:536870912,hydrationErrors:null},a=Up(e),a.return=n,n.child=a,Cn=n,Ze=null)):e=null,e===null)throw Ma(n);return n.lanes=536870912,null}return Pl(n,o)}var f=e.memoizedState;if(f!==null){var y=f.dehydrated;if(Gu(n),u)if(n.flags&256)n.flags&=-257,n=Zm(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(cn||Zs(e,n,a,!1),u=(a&e.childLanes)!==0,cn||u){if(o=je,o!==null&&(y=Ni(o,a),y!==0&&y!==f.retryLane))throw f.retryLane=y,rs(e,y),Jn(o,e,y),cf;jl(),n=Zm(e,n,a)}else e=f.treeContext,Ze=_i(y.nextSibling),Cn=n,Ce=!0,xa=null,mi=!1,e!==null&&Pp(n,e),n=Pl(n,o),n.flags|=4096;return n}return e=Wi(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function zl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function uf(e,n,a,o,u){return us(n),a=ku(e,n,a,o,void 0,u),o=Xu(),e!==null&&!cn?(Wu(e,n,u),Qi(e,n,u)):(Ce&&o&&bu(n),n.flags|=1,Dn(e,n,a,u),n.child)}function Km(e,n,a,o,u,f){return us(n),n.updateQueue=null,a=$p(n,o,a,u),Jp(e),o=Xu(),e!==null&&!cn?(Wu(e,n,f),Qi(e,n,f)):(Ce&&o&&bu(n),n.flags|=1,Dn(e,n,a,f),n.child)}function Qm(e,n,a,o,u){if(us(n),n.stateNode===null){var f=Ws,y=a.contextType;typeof y=="object"&&y!==null&&(f=wn(y)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=of,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Pu(n),y=a.contextType,f.context=typeof y=="object"&&y!==null?wn(y):Ws,f.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(rf(n,a,y,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(y=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),y!==f.state&&of.enqueueReplaceState(f,f.state,null),mo(n,o,f,u),po(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var A=n.memoizedProps,B=gs(a,A);f.props=B;var at=f.context,vt=a.contextType;y=Ws,typeof vt=="object"&&vt!==null&&(y=wn(vt));var Et=a.getDerivedStateFromProps;vt=typeof Et=="function"||typeof f.getSnapshotBeforeUpdate=="function",A=n.pendingProps!==A,vt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(A||at!==y)&&Im(n,f,o,y),Ea=!1;var lt=n.memoizedState;f.state=lt,mo(n,o,f,u),po(),at=n.memoizedState,A||lt!==at||Ea?(typeof Et=="function"&&(rf(n,a,Et,o),at=n.memoizedState),(B=Ea||zm(n,a,B,o,lt,at,y))?(vt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=at),f.props=o,f.state=at,f.context=y,o=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,zu(e,n),y=n.memoizedProps,vt=gs(a,y),f.props=vt,Et=n.pendingProps,lt=f.context,at=a.contextType,B=Ws,typeof at=="object"&&at!==null&&(B=wn(at)),A=a.getDerivedStateFromProps,(at=typeof A=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==Et||lt!==B)&&Im(n,f,o,B),Ea=!1,lt=n.memoizedState,f.state=lt,mo(n,o,f,u),po();var dt=n.memoizedState;y!==Et||lt!==dt||Ea||e!==null&&e.dependencies!==null&&_l(e.dependencies)?(typeof A=="function"&&(rf(n,a,A,o),dt=n.memoizedState),(vt=Ea||zm(n,a,vt,o,lt,dt,B)||e!==null&&e.dependencies!==null&&_l(e.dependencies))?(at||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,dt,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,dt,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=dt),f.props=o,f.state=dt,f.context=B,o=vt):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,zl(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=ps(n,e.child,null,u),n.child=ps(n,null,a,u)):Dn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=Qi(e,n,u),e}function Jm(e,n,a,o){return ls(),n.flags|=256,Dn(e,n,a,o),n.child}var ff={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function hf(e){return{baseLanes:e,cachePool:Gp()}}function df(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ri),e}function $m(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,y;if((y=f)||(y=e!==null&&e.memoizedState===null?!1:(sn.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ce){if(u?Aa(n):Ra(),(e=Ze)?(e=o0(e,mi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ya!==null?{id:Oi,overflow:Pi}:null,retryLane:536870912,hydrationErrors:null},a=Up(e),a.return=n,n.child=a,Cn=n,Ze=null)):e=null,e===null)throw Ma(n);return Zf(e)?n.lanes=32:n.lanes=536870912,null}var A=o.children;return o=o.fallback,u?(Ra(),u=n.mode,A=Il({mode:"hidden",children:A},u),o=os(o,u,a,null),A.return=n,o.return=n,A.sibling=o,n.child=A,o=n.child,o.memoizedState=hf(a),o.childLanes=df(e,y,a),n.memoizedState=ff,xo(null,o)):(Aa(n),pf(n,A))}var B=e.memoizedState;if(B!==null&&(A=B.dehydrated,A!==null)){if(f)n.flags&256?(Aa(n),n.flags&=-257,n=mf(e,n,a)):n.memoizedState!==null?(Ra(),n.child=e.child,n.flags|=128,n=null):(Ra(),A=o.fallback,u=n.mode,o=Il({mode:"visible",children:o.children},u),A=os(A,u,a,null),A.flags|=2,o.return=n,A.return=n,o.sibling=A,n.child=o,ps(n,e.child,null,a),o=n.child,o.memoizedState=hf(a),o.childLanes=df(e,y,a),n.memoizedState=ff,n=xo(null,o));else if(Aa(n),Zf(A)){if(y=A.nextSibling&&A.nextSibling.dataset,y)var at=y.dgst;y=at,o=Error(s(419)),o.stack="",o.digest=y,oo({value:o,source:null,stack:null}),n=mf(e,n,a)}else if(cn||Zs(e,n,a,!1),y=(a&e.childLanes)!==0,cn||y){if(y=je,y!==null&&(o=Ni(y,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,rs(e,o),Jn(y,e,o),cf;Yf(A)||jl(),n=mf(e,n,a)}else Yf(A)?(n.flags|=192,n.child=e.child,n=null):(e=B.treeContext,Ze=_i(A.nextSibling),Cn=n,Ce=!0,xa=null,mi=!1,e!==null&&Pp(n,e),n=pf(n,o.children),n.flags|=4096);return n}return u?(Ra(),A=o.fallback,u=n.mode,B=e.child,at=B.sibling,o=Wi(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,at!==null?A=Wi(at,A):(A=os(A,u,a,null),A.flags|=2),A.return=n,o.return=n,o.sibling=A,n.child=o,xo(null,o),o=n.child,A=e.child.memoizedState,A===null?A=hf(a):(u=A.cachePool,u!==null?(B=on._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=Gp(),A={baseLanes:A.baseLanes|a,cachePool:u}),o.memoizedState=A,o.childLanes=df(e,y,a),n.memoizedState=ff,xo(e.child,o)):(Aa(n),a=e.child,e=a.sibling,a=Wi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(y=n.deletions,y===null?(n.deletions=[e],n.flags|=16):y.push(e)),n.child=a,n.memoizedState=null,a)}function pf(e,n){return n=Il({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Il(e,n){return e=ni(22,e,null,n),e.lanes=0,e}function mf(e,n,a){return ps(n,e.child,null,a),e=pf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function tg(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),wu(e.return,n,a)}function gf(e,n,a,o,u,f){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=f)}function eg(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var y=sn.current,A=(y&2)!==0;if(A?(y=y&1|2,n.flags|=128):y&=1,Mt(sn,y),Dn(e,n,o,a),o=Ce?ro:0,!A&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tg(e,a,n);else if(e.tag===19)tg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Tl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),gf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Tl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}gf(n,!0,a,null,f,o);break;case"together":gf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Qi(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Da|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(Zs(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Wi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Wi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function _f(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&_l(e)))}function By(e,n,a){switch(n.tag){case 3:ot(n,n.stateNode.containerInfo),Sa(n,on,e.memoizedState.cache),ls();break;case 27:case 5:Rt(n);break;case 4:ot(n,n.stateNode.containerInfo);break;case 10:Sa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Gu(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Aa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?$m(e,n,a):(Aa(n),e=Qi(e,n,a),e!==null?e.sibling:null);Aa(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Zs(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return eg(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Mt(sn,sn.current),o)break;return null;case 22:return n.lanes=0,qm(e,n,a,n.pendingProps);case 24:Sa(n,on,e.memoizedState.cache)}return Qi(e,n,a)}function ng(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)cn=!0;else{if(!_f(e,a)&&(n.flags&128)===0)return cn=!1,By(e,n,a);cn=(e.flags&131072)!==0}else cn=!1,Ce&&(n.flags&1048576)!==0&&Op(n,ro,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=hs(n.elementType),n.type=e,typeof e=="function")Mu(e)?(o=gs(e,o),n.tag=1,n=Qm(null,n,e,o,a)):(n.tag=0,n=uf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===w){n.tag=11,n=Xm(null,n,e,o,a);break t}else if(u===z){n.tag=14,n=Wm(null,n,e,o,a);break t}}throw n=yt(e)||e,Error(s(306,n,""))}}return n;case 0:return uf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=gs(o,n.pendingProps),Qm(e,n,o,u,a);case 3:t:{if(ot(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,zu(e,n),mo(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Sa(n,on,o),o!==f.cache&&Du(n,[on],a,!0),po(),o=y.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Jm(e,n,o,a);break t}else if(o!==u){u=hi(Error(s(424)),n),oo(u),n=Jm(e,n,o,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ze=_i(e.firstChild),Cn=n,Ce=!0,xa=null,mi=!0,a=qp(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(ls(),o===u){n=Qi(e,n,a);break t}Dn(e,n,o,a)}n=n.child}return n;case 26:return zl(e,n),e===null?(a=d0(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ce||(a=n.type,e=n.pendingProps,o=$l(k.current).createElement(a),o[tn]=n,o[An]=e,Ln(o,a,e),Y(o),n.stateNode=o):n.memoizedState=d0(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Rt(n),e===null&&Ce&&(o=n.stateNode=u0(n.type,n.pendingProps,k.current),Cn=n,mi=!0,u=Ze,Pa(n.type)?(Kf=u,Ze=_i(o.firstChild)):Ze=u),Dn(e,n,n.pendingProps.children,a),zl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ce&&((u=o=Ze)&&(o=px(o,n.type,n.pendingProps,mi),o!==null?(n.stateNode=o,Cn=n,Ze=_i(o.firstChild),mi=!1,u=!0):u=!1),u||Ma(n)),Rt(n),u=n.type,f=n.pendingProps,y=e!==null?e.memoizedProps:null,o=f.children,Wf(u,f)?o=null:y!==null&&Wf(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=ku(e,n,wy,null,null,a),Po._currentValue=u),zl(e,n),Dn(e,n,o,a),n.child;case 6:return e===null&&Ce&&((e=a=Ze)&&(a=mx(a,n.pendingProps,mi),a!==null?(n.stateNode=a,Cn=n,Ze=null,e=!0):e=!1),e||Ma(n)),null;case 13:return $m(e,n,a);case 4:return ot(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=ps(n,null,o,a):Dn(e,n,o,a),n.child;case 11:return Xm(e,n,n.type,n.pendingProps,a);case 7:return Dn(e,n,n.pendingProps,a),n.child;case 8:return Dn(e,n,n.pendingProps.children,a),n.child;case 12:return Dn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Sa(n,n.type,o.value),Dn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,us(n),u=wn(u),o=o(u),n.flags|=1,Dn(e,n,o,a),n.child;case 14:return Wm(e,n,n.type,n.pendingProps,a);case 15:return jm(e,n,n.type,n.pendingProps,a);case 19:return eg(e,n,a);case 31:return Iy(e,n,a);case 22:return qm(e,n,a,n.pendingProps);case 24:return us(n),o=wn(on),e===null?(u=Nu(),u===null&&(u=je,f=Lu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Pu(n),Sa(n,on,u)):((e.lanes&a)!==0&&(zu(e,n),mo(n,null,null,a),po()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Sa(n,on,o)):(o=f.cache,Sa(n,on,o),o!==u.cache&&Du(n,[on],a,!0))),Dn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ji(e){e.flags|=4}function vf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(wg())e.flags|=8192;else throw ds=Ml,Ou}else e.flags&=-16777217}function ig(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!v0(n))if(wg())e.flags|=8192;else throw ds=Ml,Ou}function Bl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?hn():536870912,e.lanes|=n,or|=n)}function Mo(e,n){if(!Ce)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ke(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function Fy(e,n,a){var o=n.pendingProps;switch(Tu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(n),null;case 1:return Ke(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Yi(on),st(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Ys(n)?Ji(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Ru())),Ke(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(Ji(n),f!==null?(Ke(n),ig(n,f)):(Ke(n),vf(n,u,null,o,a))):f?f!==e.memoizedState?(Ji(n),Ke(n),ig(n,f)):(Ke(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&Ji(n),Ke(n),vf(n,u,e,o,a)),null;case 27:if($t(n),a=k.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Ji(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ke(n),null}e=Z.current,Ys(n)?zp(n):(e=u0(u,o,a),n.stateNode=e,Ji(n))}return Ke(n),null;case 5:if($t(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Ji(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ke(n),null}if(f=Z.current,Ys(n))zp(n);else{var y=$l(k.current);switch(f){case 1:f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=y.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}f[tn]=n,f[An]=o;t:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)f.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break t;for(;y.sibling===null;){if(y.return===null||y.return===n)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=f;t:switch(Ln(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&Ji(n)}}return Ke(n),vf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&Ji(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=k.current,Ys(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Cn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[tn]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||$g(e.nodeValue,a)),e||Ma(n,!0)}else e=$l(e).createTextNode(o),e[tn]=n,n.stateNode=e}return Ke(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=Ys(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[tn]=n}else ls(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),e=!1}else a=Ru(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ai(n),n):(ai(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ke(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Ys(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[tn]=n}else ls(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),u=!1}else u=Ru(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ai(n),n):(ai(n),null)}return ai(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Bl(n,n.updateQueue),Ke(n),null);case 4:return st(),e===null&&Hf(n.stateNode.containerInfo),Ke(n),null;case 10:return Yi(n.type),Ke(n),null;case 19:if(et(sn),o=n.memoizedState,o===null)return Ke(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Mo(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=Tl(e),f!==null){for(n.flags|=128,Mo(o,!1),e=f.updateQueue,n.updateQueue=e,Bl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Lp(a,e),a=a.sibling;return Mt(sn,sn.current&1|2),Ce&&ji(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&mt()>kl&&(n.flags|=128,u=!0,Mo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Tl(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Bl(n,e),Mo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Ce)return Ke(n),null}else 2*mt()-o.renderingStartTime>kl&&a!==536870912&&(n.flags|=128,u=!0,Mo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=mt(),e.sibling=null,a=sn.current,Mt(sn,u?a&1|2:a&1),Ce&&ji(n,o.treeForkCount),e):(Ke(n),null);case 22:case 23:return ai(n),Hu(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Ke(n),n.subtreeFlags&6&&(n.flags|=8192)):Ke(n),a=n.updateQueue,a!==null&&Bl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&et(fs),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Yi(on),Ke(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Hy(e,n){switch(Tu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Yi(on),st(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return $t(n),null;case 31:if(n.memoizedState!==null){if(ai(n),n.alternate===null)throw Error(s(340));ls()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ai(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));ls()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return et(sn),null;case 4:return st(),null;case 10:return Yi(n.type),null;case 22:case 23:return ai(n),Hu(),e!==null&&et(fs),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Yi(on),null;case 25:return null;default:return null}}function ag(e,n){switch(Tu(n),n.tag){case 3:Yi(on),st();break;case 26:case 27:case 5:$t(n);break;case 4:st();break;case 31:n.memoizedState!==null&&ai(n);break;case 13:ai(n);break;case 19:et(sn);break;case 10:Yi(n.type);break;case 22:case 23:ai(n),Hu(),e!==null&&et(fs);break;case 24:Yi(on)}}function So(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,y=a.inst;o=f(),y.destroy=o}a=a.next}while(a!==u)}}catch(A){Ie(n,n.return,A)}}function Ca(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var y=o.inst,A=y.destroy;if(A!==void 0){y.destroy=void 0,u=n;var B=a,at=A;try{at()}catch(vt){Ie(u,B,vt)}}}o=o.next}while(o!==f)}}catch(vt){Ie(n,n.return,vt)}}function sg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Zp(n,a)}catch(o){Ie(e,e.return,o)}}}function rg(e,n,a){a.props=gs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ie(e,n,o)}}function Eo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ie(e,n,u)}}function zi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ie(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ie(e,n,u)}else a.current=null}function og(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ie(e,e.return,u)}}function yf(e,n,a){try{var o=e.stateNode;lx(o,e.type,a,n),o[An]=n}catch(u){Ie(e,e.return,u)}}function lg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Pa(e.type)||e.tag===4}function xf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||lg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Pa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Mf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ki));else if(o!==4&&(o===27&&Pa(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Mf(e,n,a),e=e.sibling;e!==null;)Mf(e,n,a),e=e.sibling}function Fl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Pa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Fl(e,n,a),e=e.sibling;e!==null;)Fl(e,n,a),e=e.sibling}function cg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Ln(n,o,a),n[tn]=e,n[An]=a}catch(f){Ie(e,e.return,f)}}var $i=!1,un=!1,Sf=!1,ug=typeof WeakSet=="function"?WeakSet:Set,Mn=null;function Gy(e,n){if(e=e.containerInfo,kf=rc,e=Sp(e),pu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var y=0,A=-1,B=-1,at=0,vt=0,Et=e,lt=null;e:for(;;){for(var dt;Et!==a||u!==0&&Et.nodeType!==3||(A=y+u),Et!==f||o!==0&&Et.nodeType!==3||(B=y+o),Et.nodeType===3&&(y+=Et.nodeValue.length),(dt=Et.firstChild)!==null;)lt=Et,Et=dt;for(;;){if(Et===e)break e;if(lt===a&&++at===u&&(A=y),lt===f&&++vt===o&&(B=y),(dt=Et.nextSibling)!==null)break;Et=lt,lt=Et.parentNode}Et=dt}a=A===-1||B===-1?null:{start:A,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(Xf={focusedElem:e,selectionRange:a},rc=!1,Mn=n;Mn!==null;)if(n=Mn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Mn=e;else for(;Mn!==null;){switch(n=Mn,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var jt=gs(a.type,u);e=o.getSnapshotBeforeUpdate(jt,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(se){Ie(a,a.return,se)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)qf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":qf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Mn=e;break}Mn=n.return}}function fg(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ea(e,a),o&4&&So(5,a);break;case 1:if(ea(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(y){Ie(a,a.return,y)}else{var u=gs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Ie(a,a.return,y)}}o&64&&sg(a),o&512&&Eo(a,a.return);break;case 3:if(ea(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Zp(e,n)}catch(y){Ie(a,a.return,y)}}break;case 27:n===null&&o&4&&cg(a);case 26:case 5:ea(e,a),n===null&&o&4&&og(a),o&512&&Eo(a,a.return);break;case 12:ea(e,a);break;case 31:ea(e,a),o&4&&pg(e,a);break;case 13:ea(e,a),o&4&&mg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Ky.bind(null,a),gx(e,a))));break;case 22:if(o=a.memoizedState!==null||$i,!o){n=n!==null&&n.memoizedState!==null||un,u=$i;var f=un;$i=o,(un=n)&&!f?na(e,a,(a.subtreeFlags&8772)!==0):ea(e,a),$i=u,un=f}break;case 30:break;default:ea(e,a)}}function hg(e){var n=e.alternate;n!==null&&(e.alternate=null,hg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Kr(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Je=null,Yn=!1;function ta(e,n,a){for(a=a.child;a!==null;)dg(e,n,a),a=a.sibling}function dg(e,n,a){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(Jt,a)}catch{}switch(a.tag){case 26:un||zi(a,n),ta(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:un||zi(a,n);var o=Je,u=Yn;Pa(a.type)&&(Je=a.stateNode,Yn=!1),ta(e,n,a),Uo(a.stateNode),Je=o,Yn=u;break;case 5:un||zi(a,n);case 6:if(o=Je,u=Yn,Je=null,ta(e,n,a),Je=o,Yn=u,Je!==null)if(Yn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode)}catch(f){Ie(a,n,f)}else try{Je.removeChild(a.stateNode)}catch(f){Ie(a,n,f)}break;case 18:Je!==null&&(Yn?(e=Je,s0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),mr(e)):s0(Je,a.stateNode));break;case 4:o=Je,u=Yn,Je=a.stateNode.containerInfo,Yn=!0,ta(e,n,a),Je=o,Yn=u;break;case 0:case 11:case 14:case 15:Ca(2,a,n),un||Ca(4,a,n),ta(e,n,a);break;case 1:un||(zi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&rg(a,n,o)),ta(e,n,a);break;case 21:ta(e,n,a);break;case 22:un=(o=un)||a.memoizedState!==null,ta(e,n,a),un=o;break;default:ta(e,n,a)}}function pg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{mr(e)}catch(a){Ie(n,n.return,a)}}}function mg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{mr(e)}catch(a){Ie(n,n.return,a)}}function Vy(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new ug),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new ug),n;default:throw Error(s(435,e.tag))}}function Hl(e,n){var a=Vy(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=Qy.bind(null,e,o);o.then(u,u)}})}function Zn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,y=n,A=y;t:for(;A!==null;){switch(A.tag){case 27:if(Pa(A.type)){Je=A.stateNode,Yn=!1;break t}break;case 5:Je=A.stateNode,Yn=!1;break t;case 3:case 4:Je=A.stateNode.containerInfo,Yn=!0;break t}A=A.return}if(Je===null)throw Error(s(160));dg(f,y,u),Je=null,Yn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)gg(n,e),n=n.sibling}var Ai=null;function gg(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Zn(n,e),Kn(e),o&4&&(Ca(3,e,e.return),So(3,e),Ca(5,e,e.return));break;case 1:Zn(n,e),Kn(e),o&512&&(un||a===null||zi(a,a.return)),o&64&&$i&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ai;if(Zn(n,e),Kn(e),o&512&&(un||a===null||zi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[ns]||f[tn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Ln(f,o,a),f[tn]=e,Y(f),o=f;break t;case"link":var y=g0("link","href",u).get(o+(a.href||""));if(y){for(var A=0;A<y.length;A++)if(f=y[A],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(A,1);break e}}f=u.createElement(o),Ln(f,o,a),u.head.appendChild(f);break;case"meta":if(y=g0("meta","content",u).get(o+(a.content||""))){for(A=0;A<y.length;A++)if(f=y[A],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(A,1);break e}}f=u.createElement(o),Ln(f,o,a),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[tn]=e,Y(f),o=f}e.stateNode=o}else _0(u,e.type,e.stateNode);else e.stateNode=m0(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?_0(u,e.type,e.stateNode):m0(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&yf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Zn(n,e),Kn(e),o&512&&(un||a===null||zi(a,a.return)),a!==null&&o&4&&yf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Zn(n,e),Kn(e),o&512&&(un||a===null||zi(a,a.return)),e.flags&32){u=e.stateNode;try{jn(u,"")}catch(jt){Ie(e,e.return,jt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,yf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Sf=!0);break;case 6:if(Zn(n,e),Kn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(jt){Ie(e,e.return,jt)}}break;case 3:if(nc=null,u=Ai,Ai=tc(n.containerInfo),Zn(n,e),Ai=u,Kn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{mr(n.containerInfo)}catch(jt){Ie(e,e.return,jt)}Sf&&(Sf=!1,_g(e));break;case 4:o=Ai,Ai=tc(e.stateNode.containerInfo),Zn(n,e),Kn(e),Ai=o;break;case 12:Zn(n,e),Kn(e);break;case 31:Zn(n,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Hl(e,o)));break;case 13:Zn(n,e),Kn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Vl=mt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Hl(e,o)));break;case 22:u=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,at=$i,vt=un;if($i=at||u,un=vt||B,Zn(n,e),un=vt,$i=at,Kn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||$i||un||_s(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,u)y=f.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{A=B.stateNode;var Et=B.memoizedProps.style,lt=Et!=null&&Et.hasOwnProperty("display")?Et.display:null;A.style.display=lt==null||typeof lt=="boolean"?"":(""+lt).trim()}}catch(jt){Ie(B,B.return,jt)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(jt){Ie(B,B.return,jt)}}}else if(n.tag===18){if(a===null){B=n;try{var dt=B.stateNode;u?r0(dt,!0):r0(B.stateNode,!1)}catch(jt){Ie(B,B.return,jt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Hl(e,a))));break;case 19:Zn(n,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Hl(e,o)));break;case 30:break;case 21:break;default:Zn(n,e),Kn(e)}}function Kn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(lg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=xf(e);Fl(e,f,u);break;case 5:var y=a.stateNode;a.flags&32&&(jn(y,""),a.flags&=-33);var A=xf(e);Fl(e,A,y);break;case 3:case 4:var B=a.stateNode.containerInfo,at=xf(e);Mf(e,at,B);break;default:throw Error(s(161))}}catch(vt){Ie(e,e.return,vt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function _g(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;_g(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ea(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)fg(e,n.alternate,n),n=n.sibling}function _s(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Ca(4,n,n.return),_s(n);break;case 1:zi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&rg(n,n.return,a),_s(n);break;case 27:Uo(n.stateNode);case 26:case 5:zi(n,n.return),_s(n);break;case 22:n.memoizedState===null&&_s(n);break;case 30:_s(n);break;default:_s(n)}e=e.sibling}}function na(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,y=f.flags;switch(f.tag){case 0:case 11:case 15:na(u,f,a),So(4,f);break;case 1:if(na(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(at){Ie(o,o.return,at)}if(o=f,u=o.updateQueue,u!==null){var A=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)Yp(B[u],A)}catch(at){Ie(o,o.return,at)}}a&&y&64&&sg(f),Eo(f,f.return);break;case 27:cg(f);case 26:case 5:na(u,f,a),a&&o===null&&y&4&&og(f),Eo(f,f.return);break;case 12:na(u,f,a);break;case 31:na(u,f,a),a&&y&4&&pg(u,f);break;case 13:na(u,f,a),a&&y&4&&mg(u,f);break;case 22:f.memoizedState===null&&na(u,f,a),Eo(f,f.return);break;case 30:break;default:na(u,f,a)}n=n.sibling}}function Ef(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&lo(a))}function bf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&lo(e))}function Ri(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)vg(e,n,a,o),n=n.sibling}function vg(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ri(e,n,a,o),u&2048&&So(9,n);break;case 1:Ri(e,n,a,o);break;case 3:Ri(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&lo(e)));break;case 12:if(u&2048){Ri(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,y=f.id,A=f.onPostCommit;typeof A=="function"&&A(y,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){Ie(n,n.return,B)}}else Ri(e,n,a,o);break;case 31:Ri(e,n,a,o);break;case 13:Ri(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,y=n.alternate,n.memoizedState!==null?f._visibility&2?Ri(e,n,a,o):bo(e,n):f._visibility&2?Ri(e,n,a,o):(f._visibility|=2,ar(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Ef(y,n);break;case 24:Ri(e,n,a,o),u&2048&&bf(n.alternate,n);break;default:Ri(e,n,a,o)}}function ar(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,y=n,A=a,B=o,at=y.flags;switch(y.tag){case 0:case 11:case 15:ar(f,y,A,B,u),So(8,y);break;case 23:break;case 22:var vt=y.stateNode;y.memoizedState!==null?vt._visibility&2?ar(f,y,A,B,u):bo(f,y):(vt._visibility|=2,ar(f,y,A,B,u)),u&&at&2048&&Ef(y.alternate,y);break;case 24:ar(f,y,A,B,u),u&&at&2048&&bf(y.alternate,y);break;default:ar(f,y,A,B,u)}n=n.sibling}}function bo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:bo(a,o),u&2048&&Ef(o.alternate,o);break;case 24:bo(a,o),u&2048&&bf(o.alternate,o);break;default:bo(a,o)}n=n.sibling}}var To=8192;function sr(e,n,a){if(e.subtreeFlags&To)for(e=e.child;e!==null;)yg(e,n,a),e=e.sibling}function yg(e,n,a){switch(e.tag){case 26:sr(e,n,a),e.flags&To&&e.memoizedState!==null&&Cx(a,Ai,e.memoizedState,e.memoizedProps);break;case 5:sr(e,n,a);break;case 3:case 4:var o=Ai;Ai=tc(e.stateNode.containerInfo),sr(e,n,a),Ai=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=To,To=16777216,sr(e,n,a),To=o):sr(e,n,a));break;default:sr(e,n,a)}}function xg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ao(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Mn=o,Sg(o,e)}xg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Mg(e),e=e.sibling}function Mg(e){switch(e.tag){case 0:case 11:case 15:Ao(e),e.flags&2048&&Ca(9,e,e.return);break;case 3:Ao(e);break;case 12:Ao(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Gl(e)):Ao(e);break;default:Ao(e)}}function Gl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Mn=o,Sg(o,e)}xg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Ca(8,n,n.return),Gl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Gl(n));break;default:Gl(n)}e=e.sibling}}function Sg(e,n){for(;Mn!==null;){var a=Mn;switch(a.tag){case 0:case 11:case 15:Ca(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:lo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Mn=o;else t:for(a=e;Mn!==null;){o=Mn;var u=o.sibling,f=o.return;if(hg(o),o===a){Mn=null;break t}if(u!==null){u.return=f,Mn=u;break t}Mn=f}}}var ky={getCacheForType:function(e){var n=wn(on),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return wn(on).controller.signal}},Xy=typeof WeakMap=="function"?WeakMap:Map,Pe=0,je=null,Me=null,be=0,ze=0,si=null,wa=!1,rr=!1,Tf=!1,ia=0,an=0,Da=0,vs=0,Af=0,ri=0,or=0,Ro=null,Qn=null,Rf=!1,Vl=0,Eg=0,kl=1/0,Xl=null,La=null,pn=0,Ua=null,lr=null,aa=0,Cf=0,wf=null,bg=null,Co=0,Df=null;function oi(){return(Pe&2)!==0&&be!==0?be&-be:P.T!==null?zf():Yr()}function Tg(){if(ri===0)if((be&536870912)===0||Ce){var e=gt;gt<<=1,(gt&3932160)===0&&(gt=262144),ri=e}else ri=536870912;return e=ii.current,e!==null&&(e.flags|=32),ri}function Jn(e,n,a){(e===je&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(cr(e,0),Na(e,be,ri,!1)),Tn(e,a),((Pe&2)===0||e!==je)&&(e===je&&((Pe&2)===0&&(vs|=a),an===4&&Na(e,be,ri,!1)),Ii(e))}function Ag(e,n,a){if((Pe&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||oe(e,n),u=o?qy(e,n):Uf(e,n,!0),f=o;do{if(u===0){rr&&!o&&Na(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!Wy(a)){u=Uf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;t:{var A=e;u=Ro;var B=A.current.memoizedState.isDehydrated;if(B&&(cr(A,y).flags|=256),y=Uf(A,y,!1),y!==2){if(Tf&&!B){A.errorRecoveryDisabledLanes|=f,vs|=f,u=4;break t}f=Qn,Qn=u,f!==null&&(Qn===null?Qn=f:Qn.push.apply(Qn,f))}u=y}if(f=!1,u!==2)continue}}if(u===1){cr(e,0),Na(e,n,0,!0);break}t:{switch(o=e,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Na(o,n,ri,!wa);break t;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Vl+300-mt(),10<u)){if(Na(o,n,ri,!wa),zt(o,0,!0)!==0)break t;aa=n,o.timeoutHandle=i0(Rg.bind(null,o,a,Qn,Xl,Rf,n,ri,vs,or,wa,f,"Throttled",-0,0),u);break t}Rg(o,a,Qn,Xl,Rf,n,ri,vs,or,wa,f,null,-0,0)}}break}while(!0);Ii(e)}function Rg(e,n,a,o,u,f,y,A,B,at,vt,Et,lt,dt){if(e.timeoutHandle=-1,Et=n.subtreeFlags,Et&8192||(Et&16785408)===16785408){Et={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ki},yg(n,f,Et);var jt=(f&62914560)===f?Vl-mt():(f&4194048)===f?Eg-mt():0;if(jt=wx(Et,jt),jt!==null){aa=f,e.cancelPendingCommit=jt(Pg.bind(null,e,n,f,a,o,u,y,A,B,vt,Et,null,lt,dt)),Na(e,f,y,!at);return}}Pg(e,n,f,a,o,u,y,A,B)}function Wy(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ei(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Na(e,n,a,o){n&=~Af,n&=~vs,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-ae(u),y=1<<f;o[f]=-1,u&=~y}a!==0&&jr(e,a,n)}function Wl(){return(Pe&6)===0?(wo(0),!1):!0}function Lf(){if(Me!==null){if(ze===0)var e=Me.return;else e=Me,qi=cs=null,ju(e),$s=null,uo=0,e=Me;for(;e!==null;)ag(e.alternate,e),e=e.return;Me=null}}function cr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,fx(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),aa=0,Lf(),je=e,Me=a=Wi(e.current,null),be=n,ze=0,si=null,wa=!1,rr=oe(e,n),Tf=!1,or=ri=Af=vs=Da=an=0,Qn=Ro=null,Rf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-ae(o),f=1<<u;n|=e[u],o&=~f}return ia=n,hl(),a}function Cg(e,n){me=null,P.H=yo,n===Js||n===xl?(n=Xp(),ze=3):n===Ou?(n=Xp(),ze=4):ze=n===cf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,si=n,Me===null&&(an=1,Ol(e,hi(n,e.current)))}function wg(){var e=ii.current;return e===null?!0:(be&4194048)===be?gi===null:(be&62914560)===be||(be&536870912)!==0?e===gi:!1}function Dg(){var e=P.H;return P.H=yo,e===null?yo:e}function Lg(){var e=P.A;return P.A=ky,e}function jl(){an=4,wa||(be&4194048)!==be&&ii.current!==null||(rr=!0),(Da&134217727)===0&&(vs&134217727)===0||je===null||Na(je,be,ri,!1)}function Uf(e,n,a){var o=Pe;Pe|=2;var u=Dg(),f=Lg();(je!==e||be!==n)&&(Xl=null,cr(e,n)),n=!1;var y=an;t:do try{if(ze!==0&&Me!==null){var A=Me,B=si;switch(ze){case 8:Lf(),y=6;break t;case 3:case 2:case 9:case 6:ii.current===null&&(n=!0);var at=ze;if(ze=0,si=null,ur(e,A,B,at),a&&rr){y=0;break t}break;default:at=ze,ze=0,si=null,ur(e,A,B,at)}}jy(),y=an;break}catch(vt){Cg(e,vt)}while(!0);return n&&e.shellSuspendCounter++,qi=cs=null,Pe=o,P.H=u,P.A=f,Me===null&&(je=null,be=0,hl()),y}function jy(){for(;Me!==null;)Ug(Me)}function qy(e,n){var a=Pe;Pe|=2;var o=Dg(),u=Lg();je!==e||be!==n?(Xl=null,kl=mt()+500,cr(e,n)):rr=oe(e,n);t:do try{if(ze!==0&&Me!==null){n=Me;var f=si;e:switch(ze){case 1:ze=0,si=null,ur(e,n,f,1);break;case 2:case 9:if(Vp(f)){ze=0,si=null,Ng(n);break}n=function(){ze!==2&&ze!==9||je!==e||(ze=7),Ii(e)},f.then(n,n);break t;case 3:ze=7;break t;case 4:ze=5;break t;case 7:Vp(f)?(ze=0,si=null,Ng(n)):(ze=0,si=null,ur(e,n,f,7));break;case 5:var y=null;switch(Me.tag){case 26:y=Me.memoizedState;case 5:case 27:var A=Me;if(y?v0(y):A.stateNode.complete){ze=0,si=null;var B=A.sibling;if(B!==null)Me=B;else{var at=A.return;at!==null?(Me=at,ql(at)):Me=null}break e}}ze=0,si=null,ur(e,n,f,5);break;case 6:ze=0,si=null,ur(e,n,f,6);break;case 8:Lf(),an=6;break t;default:throw Error(s(462))}}Yy();break}catch(vt){Cg(e,vt)}while(!0);return qi=cs=null,P.H=o,P.A=u,Pe=a,Me!==null?0:(je=null,be=0,hl(),an)}function Yy(){for(;Me!==null&&!T();)Ug(Me)}function Ug(e){var n=ng(e.alternate,e,ia);e.memoizedProps=e.pendingProps,n===null?ql(e):Me=n}function Ng(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Km(a,n,n.pendingProps,n.type,void 0,be);break;case 11:n=Km(a,n,n.pendingProps,n.type.render,n.ref,be);break;case 5:ju(n);default:ag(a,n),n=Me=Lp(n,ia),n=ng(a,n,ia)}e.memoizedProps=e.pendingProps,n===null?ql(e):Me=n}function ur(e,n,a,o){qi=cs=null,ju(n),$s=null,uo=0;var u=n.return;try{if(zy(e,u,n,a,be)){an=1,Ol(e,hi(a,e.current)),Me=null;return}}catch(f){if(u!==null)throw Me=u,f;an=1,Ol(e,hi(a,e.current)),Me=null;return}n.flags&32768?(Ce||o===1?e=!0:rr||(be&536870912)!==0?e=!1:(wa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ii.current,o!==null&&o.tag===13&&(o.flags|=16384))),Og(n,e)):ql(n)}function ql(e){var n=e;do{if((n.flags&32768)!==0){Og(n,wa);return}e=n.return;var a=Fy(n.alternate,n,ia);if(a!==null){Me=a;return}if(n=n.sibling,n!==null){Me=n;return}Me=n=e}while(n!==null);an===0&&(an=5)}function Og(e,n){do{var a=Hy(e.alternate,e);if(a!==null){a.flags&=32767,Me=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){Me=e;return}Me=e=a}while(e!==null);an=6,Me=null}function Pg(e,n,a,o,u,f,y,A,B){e.cancelPendingCommit=null;do Yl();while(pn!==0);if((Pe&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=yu,Si(e,a,f,y,A,B),e===je&&(Me=je=null,be=0),lr=n,Ua=e,aa=a,Cf=f,wf=u,bg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Jy(Lt,function(){return Hg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=P.T,P.T=null,u=X.p,X.p=2,y=Pe,Pe|=4;try{Gy(e,n,a)}finally{Pe=y,X.p=u,P.T=o}}pn=1,zg(),Ig(),Bg()}}function zg(){if(pn===1){pn=0;var e=Ua,n=lr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var o=X.p;X.p=2;var u=Pe;Pe|=4;try{gg(n,e);var f=Xf,y=Sp(e.containerInfo),A=f.focusedElem,B=f.selectionRange;if(y!==A&&A&&A.ownerDocument&&Mp(A.ownerDocument.documentElement,A)){if(B!==null&&pu(A)){var at=B.start,vt=B.end;if(vt===void 0&&(vt=at),"selectionStart"in A)A.selectionStart=at,A.selectionEnd=Math.min(vt,A.value.length);else{var Et=A.ownerDocument||document,lt=Et&&Et.defaultView||window;if(lt.getSelection){var dt=lt.getSelection(),jt=A.textContent.length,se=Math.min(B.start,jt),Ve=B.end===void 0?se:Math.min(B.end,jt);!dt.extend&&se>Ve&&(y=Ve,Ve=se,se=y);var $=xp(A,se),W=xp(A,Ve);if($&&W&&(dt.rangeCount!==1||dt.anchorNode!==$.node||dt.anchorOffset!==$.offset||dt.focusNode!==W.node||dt.focusOffset!==W.offset)){var it=Et.createRange();it.setStart($.node,$.offset),dt.removeAllRanges(),se>Ve?(dt.addRange(it),dt.extend(W.node,W.offset)):(it.setEnd(W.node,W.offset),dt.addRange(it))}}}}for(Et=[],dt=A;dt=dt.parentNode;)dt.nodeType===1&&Et.push({element:dt,left:dt.scrollLeft,top:dt.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<Et.length;A++){var xt=Et[A];xt.element.scrollLeft=xt.left,xt.element.scrollTop=xt.top}}rc=!!kf,Xf=kf=null}finally{Pe=u,X.p=o,P.T=a}}e.current=n,pn=2}}function Ig(){if(pn===2){pn=0;var e=Ua,n=lr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var o=X.p;X.p=2;var u=Pe;Pe|=4;try{fg(e,n.alternate,n)}finally{Pe=u,X.p=o,P.T=a}}pn=3}}function Bg(){if(pn===4||pn===3){pn=0,nt();var e=Ua,n=lr,a=aa,o=bg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?pn=5:(pn=0,lr=Ua=null,Fg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(La=null),Is(a),n=n.stateNode,qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(Jt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=P.T,u=X.p,X.p=2,P.T=null;try{for(var f=e.onRecoverableError,y=0;y<o.length;y++){var A=o[y];f(A.value,{componentStack:A.stack})}}finally{P.T=n,X.p=u}}(aa&3)!==0&&Yl(),Ii(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Df?Co++:(Co=0,Df=e):Co=0,wo(0)}}function Fg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,lo(n)))}function Yl(){return zg(),Ig(),Bg(),Hg()}function Hg(){if(pn!==5)return!1;var e=Ua,n=Cf;Cf=0;var a=Is(aa),o=P.T,u=X.p;try{X.p=32>a?32:a,P.T=null,a=wf,wf=null;var f=Ua,y=aa;if(pn=0,lr=Ua=null,aa=0,(Pe&6)!==0)throw Error(s(331));var A=Pe;if(Pe|=4,Mg(f.current),vg(f,f.current,y,a),Pe=A,wo(0,!1),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(Jt,f)}catch{}return!0}finally{X.p=u,P.T=o,Fg(e,n)}}function Gg(e,n,a){n=hi(a,n),n=lf(e.stateNode,n,2),e=Ta(e,n,2),e!==null&&(Tn(e,2),Ii(e))}function Ie(e,n,a){if(e.tag===3)Gg(e,e,a);else for(;n!==null;){if(n.tag===3){Gg(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(La===null||!La.has(o))){e=hi(a,e),a=Vm(2),o=Ta(n,a,2),o!==null&&(km(a,o,n,e),Tn(o,2),Ii(o));break}}n=n.return}}function Nf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Xy;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Tf=!0,u.add(a),e=Zy.bind(null,e,n,a),n.then(e,e))}function Zy(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,je===e&&(be&a)===a&&(an===4||an===3&&(be&62914560)===be&&300>mt()-Vl?(Pe&2)===0&&cr(e,0):Af|=a,or===be&&(or=0)),Ii(e)}function Vg(e,n){n===0&&(n=hn()),e=rs(e,n),e!==null&&(Tn(e,n),Ii(e))}function Ky(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Vg(e,a)}function Qy(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Vg(e,a)}function Jy(e,n){return Nt(e,n)}var Zl=null,fr=null,Of=!1,Kl=!1,Pf=!1,Oa=0;function Ii(e){e!==fr&&e.next===null&&(fr===null?Zl=fr=e:fr=fr.next=e),Kl=!0,Of||(Of=!0,tx())}function wo(e,n){if(!Pf&&Kl){Pf=!0;do for(var a=!1,o=Zl;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var y=o.suspendedLanes,A=o.pingedLanes;f=(1<<31-ae(42|e)+1)-1,f&=u&~(y&~A),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,jg(o,f))}else f=be,f=zt(o,o===je?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||oe(o,f)||(a=!0,jg(o,f));o=o.next}while(a);Pf=!1}}function $y(){kg()}function kg(){Kl=Of=!1;var e=0;Oa!==0&&ux()&&(e=Oa);for(var n=mt(),a=null,o=Zl;o!==null;){var u=o.next,f=Xg(o,n);f===0?(o.next=null,a===null?Zl=u:a.next=u,u===null&&(fr=a)):(a=o,(e!==0||(f&3)!==0)&&(Kl=!0)),o=u}pn!==0&&pn!==5||wo(e),Oa!==0&&(Oa=0)}function Xg(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var y=31-ae(f),A=1<<y,B=u[y];B===-1?((A&a)===0||(A&o)!==0)&&(u[y]=Qe(A,n)):B<=n&&(e.expiredLanes|=A),f&=~A}if(n=je,a=be,a=zt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&U(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||oe(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&U(o),Is(a)){case 2:case 8:a=Wt;break;case 32:a=Lt;break;case 268435456:a=ve;break;default:a=Lt}return o=Wg.bind(null,e),a=Nt(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&U(o),e.callbackPriority=2,e.callbackNode=null,2}function Wg(e,n){if(pn!==0&&pn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Yl()&&e.callbackNode!==a)return null;var o=be;return o=zt(e,e===je?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Ag(e,o,n),Xg(e,mt()),e.callbackNode!=null&&e.callbackNode===a?Wg.bind(null,e):null)}function jg(e,n){if(Yl())return null;Ag(e,n,!0)}function tx(){hx(function(){(Pe&6)!==0?Nt(_t,$y):kg()})}function zf(){if(Oa===0){var e=Ks;e===0&&(e=Ot,Ot<<=1,(Ot&261888)===0&&(Ot=256)),Oa=e}return Oa}function qg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:al(""+e)}function Yg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function ex(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=qg((u[An]||null).action),y=o.submitter;y&&(n=(n=y[An]||null)?qg(n.formAction):y.getAttribute("formAction"),n!==null&&(f=n,y=null));var A=new ll("action","action",null,o,u);e.push({event:A,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Oa!==0){var B=y?Yg(u,y):new FormData(u);ef(a,{pending:!0,data:B,method:u.method,action:f},null,B)}}else typeof f=="function"&&(A.preventDefault(),B=y?Yg(u,y):new FormData(u),ef(a,{pending:!0,data:B,method:u.method,action:f},f,B))},currentTarget:u}]})}}for(var If=0;If<vu.length;If++){var Bf=vu[If],nx=Bf.toLowerCase(),ix=Bf[0].toUpperCase()+Bf.slice(1);Ti(nx,"on"+ix)}Ti(Tp,"onAnimationEnd"),Ti(Ap,"onAnimationIteration"),Ti(Rp,"onAnimationStart"),Ti("dblclick","onDoubleClick"),Ti("focusin","onFocus"),Ti("focusout","onBlur"),Ti(yy,"onTransitionRun"),Ti(xy,"onTransitionStart"),Ti(My,"onTransitionCancel"),Ti(Cp,"onTransitionEnd"),Vt("onMouseEnter",["mouseout","mouseover"]),Vt("onMouseLeave",["mouseout","mouseover"]),Vt("onPointerEnter",["pointerout","pointerover"]),Vt("onPointerLeave",["pointerout","pointerover"]),Gt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Gt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Gt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Gt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Gt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Gt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Do="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ax=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Do));function Zg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var y=o.length-1;0<=y;y--){var A=o[y],B=A.instance,at=A.currentTarget;if(A=A.listener,B!==f&&u.isPropagationStopped())break t;f=A,u.currentTarget=at;try{f(u)}catch(vt){fl(vt)}u.currentTarget=null,f=B}else for(y=0;y<o.length;y++){if(A=o[y],B=A.instance,at=A.currentTarget,A=A.listener,B!==f&&u.isPropagationStopped())break t;f=A,u.currentTarget=at;try{f(u)}catch(vt){fl(vt)}u.currentTarget=null,f=B}}}}function Se(e,n){var a=n[Zr];a===void 0&&(a=n[Zr]=new Set);var o=e+"__bubble";a.has(o)||(Kg(n,e,2,!1),a.add(o))}function Ff(e,n,a){var o=0;n&&(o|=4),Kg(a,e,o,n)}var Ql="_reactListening"+Math.random().toString(36).slice(2);function Hf(e){if(!e[Ql]){e[Ql]=!0,Ct.forEach(function(a){a!=="selectionchange"&&(ax.has(a)||Ff(a,!1,e),Ff(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ql]||(n[Ql]=!0,Ff("selectionchange",!1,n))}}function Kg(e,n,a,o){switch(T0(n)){case 2:var u=Ux;break;case 8:u=Nx;break;default:u=eh}a=u.bind(null,n,a,e),u=void 0,!su||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Gf(e,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var A=o.stateNode.containerInfo;if(A===u)break;if(y===4)for(y=o.return;y!==null;){var B=y.tag;if((B===3||B===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;A!==null;){if(y=R(A),y===null)return;if(B=y.tag,B===5||B===6||B===26||B===27){o=f=y;continue t}A=A.parentNode}}o=o.return}ep(function(){var at=f,vt=iu(a),Et=[];t:{var lt=wp.get(e);if(lt!==void 0){var dt=ll,jt=e;switch(e){case"keypress":if(rl(a)===0)break t;case"keydown":case"keyup":dt=Qv;break;case"focusin":jt="focus",dt=cu;break;case"focusout":jt="blur",dt=cu;break;case"beforeblur":case"afterblur":dt=cu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":dt=ap;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":dt=Fv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":dt=ty;break;case Tp:case Ap:case Rp:dt=Vv;break;case Cp:dt=ny;break;case"scroll":case"scrollend":dt=Iv;break;case"wheel":dt=ay;break;case"copy":case"cut":case"paste":dt=Xv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":dt=rp;break;case"toggle":case"beforetoggle":dt=ry}var se=(n&4)!==0,Ve=!se&&(e==="scroll"||e==="scrollend"),$=se?lt!==null?lt+"Capture":null:lt;se=[];for(var W=at,it;W!==null;){var xt=W;if(it=xt.stateNode,xt=xt.tag,xt!==5&&xt!==26&&xt!==27||it===null||$===null||(xt=Qr(W,$),xt!=null&&se.push(Lo(W,xt,it))),Ve)break;W=W.return}0<se.length&&(lt=new dt(lt,jt,null,a,vt),Et.push({event:lt,listeners:se}))}}if((n&7)===0){t:{if(lt=e==="mouseover"||e==="pointerover",dt=e==="mouseout"||e==="pointerout",lt&&a!==nu&&(jt=a.relatedTarget||a.fromElement)&&(R(jt)||jt[Vi]))break t;if((dt||lt)&&(lt=vt.window===vt?vt:(lt=vt.ownerDocument)?lt.defaultView||lt.parentWindow:window,dt?(jt=a.relatedTarget||a.toElement,dt=at,jt=jt?R(jt):null,jt!==null&&(Ve=c(jt),se=jt.tag,jt!==Ve||se!==5&&se!==27&&se!==6)&&(jt=null)):(dt=null,jt=at),dt!==jt)){if(se=ap,xt="onMouseLeave",$="onMouseEnter",W="mouse",(e==="pointerout"||e==="pointerover")&&(se=rp,xt="onPointerLeave",$="onPointerEnter",W="pointer"),Ve=dt==null?lt:ct(dt),it=jt==null?lt:ct(jt),lt=new se(xt,W+"leave",dt,a,vt),lt.target=Ve,lt.relatedTarget=it,xt=null,R(vt)===at&&(se=new se($,W+"enter",jt,a,vt),se.target=it,se.relatedTarget=Ve,xt=se),Ve=xt,dt&&jt)e:{for(se=sx,$=dt,W=jt,it=0,xt=$;xt;xt=se(xt))it++;xt=0;for(var ee=W;ee;ee=se(ee))xt++;for(;0<it-xt;)$=se($),it--;for(;0<xt-it;)W=se(W),xt--;for(;it--;){if($===W||W!==null&&$===W.alternate){se=$;break e}$=se($),W=se(W)}se=null}else se=null;dt!==null&&Qg(Et,lt,dt,se,!1),jt!==null&&Ve!==null&&Qg(Et,Ve,jt,se,!0)}}t:{if(lt=at?ct(at):window,dt=lt.nodeName&&lt.nodeName.toLowerCase(),dt==="select"||dt==="input"&&lt.type==="file")var Ue=pp;else if(hp(lt))if(mp)Ue=gy;else{Ue=py;var Zt=dy}else dt=lt.nodeName,!dt||dt.toLowerCase()!=="input"||lt.type!=="checkbox"&&lt.type!=="radio"?at&&eu(at.elementType)&&(Ue=pp):Ue=my;if(Ue&&(Ue=Ue(e,at))){dp(Et,Ue,a,vt);break t}Zt&&Zt(e,lt,at),e==="focusout"&&at&&lt.type==="number"&&at.memoizedProps.value!=null&&On(lt,"number",lt.value)}switch(Zt=at?ct(at):window,e){case"focusin":(hp(Zt)||Zt.contentEditable==="true")&&(Vs=Zt,mu=at,so=null);break;case"focusout":so=mu=Vs=null;break;case"mousedown":gu=!0;break;case"contextmenu":case"mouseup":case"dragend":gu=!1,Ep(Et,a,vt);break;case"selectionchange":if(vy)break;case"keydown":case"keyup":Ep(Et,a,vt)}var ge;if(fu)t:{switch(e){case"compositionstart":var Te="onCompositionStart";break t;case"compositionend":Te="onCompositionEnd";break t;case"compositionupdate":Te="onCompositionUpdate";break t}Te=void 0}else Gs?up(e,a)&&(Te="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Te="onCompositionStart");Te&&(op&&a.locale!=="ko"&&(Gs||Te!=="onCompositionStart"?Te==="onCompositionEnd"&&Gs&&(ge=np()):(va=vt,ru="value"in va?va.value:va.textContent,Gs=!0)),Zt=Jl(at,Te),0<Zt.length&&(Te=new sp(Te,e,null,a,vt),Et.push({event:Te,listeners:Zt}),ge?Te.data=ge:(ge=fp(a),ge!==null&&(Te.data=ge)))),(ge=ly?cy(e,a):uy(e,a))&&(Te=Jl(at,"onBeforeInput"),0<Te.length&&(Zt=new sp("onBeforeInput","beforeinput",null,a,vt),Et.push({event:Zt,listeners:Te}),Zt.data=ge)),ex(Et,e,at,a,vt)}Zg(Et,n)})}function Lo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Jl(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Qr(e,a),u!=null&&o.unshift(Lo(e,u,f)),u=Qr(e,n),u!=null&&o.push(Lo(e,u,f))),e.tag===3)return o;e=e.return}return[]}function sx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Qg(e,n,a,o,u){for(var f=n._reactName,y=[];a!==null&&a!==o;){var A=a,B=A.alternate,at=A.stateNode;if(A=A.tag,B!==null&&B===o)break;A!==5&&A!==26&&A!==27||at===null||(B=at,u?(at=Qr(a,f),at!=null&&y.unshift(Lo(a,at,B))):u||(at=Qr(a,f),at!=null&&y.push(Lo(a,at,B)))),a=a.return}y.length!==0&&e.push({event:n,listeners:y})}var rx=/\r\n?/g,ox=/\u0000|\uFFFD/g;function Jg(e){return(typeof e=="string"?e:""+e).replace(rx,`
`).replace(ox,"")}function $g(e,n){return n=Jg(n),Jg(e)===n}function Ge(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||jn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&jn(e,""+o);break;case"className":Ye(e,"class",o);break;case"tabIndex":Ye(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ye(e,a,o);break;case"style":$d(e,o,f);break;case"data":if(n!=="object"){Ye(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=al(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Ge(e,n,"name",u.name,u,null),Ge(e,n,"formEncType",u.formEncType,u,null),Ge(e,n,"formMethod",u.formMethod,u,null),Ge(e,n,"formTarget",u.formTarget,u,null)):(Ge(e,n,"encType",u.encType,u,null),Ge(e,n,"method",u.method,u,null),Ge(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=al(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=ki);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=al(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":Se("beforetoggle",e),Se("toggle",e),Re(e,"popover",o);break;case"xlinkActuate":Le(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Le(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Le(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Le(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Le(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Le(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Le(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Le(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Le(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Re(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Pv.get(a)||a,Re(e,a,o))}}function Vf(e,n,a,o,u,f){switch(a){case"style":$d(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?jn(e,o):(typeof o=="number"||typeof o=="bigint")&&jn(e,""+o);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"onClick":o!=null&&(e.onclick=ki);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!It.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[An]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Re(e,a,o)}}}function Ln(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",e),Se("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var y=a[f];if(y!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ge(e,n,f,y,a,null)}}u&&Ge(e,n,"srcSet",a.srcSet,a,null),o&&Ge(e,n,"src",a.src,a,null);return;case"input":Se("invalid",e);var A=f=y=u=null,B=null,at=null;for(o in a)if(a.hasOwnProperty(o)){var vt=a[o];if(vt!=null)switch(o){case"name":u=vt;break;case"type":y=vt;break;case"checked":B=vt;break;case"defaultChecked":at=vt;break;case"value":f=vt;break;case"defaultValue":A=vt;break;case"children":case"dangerouslySetInnerHTML":if(vt!=null)throw Error(s(137,n));break;default:Ge(e,n,o,vt,a,null)}}Gn(e,f,A,B,at,y,u,!1);return;case"select":Se("invalid",e),o=y=f=null;for(u in a)if(a.hasOwnProperty(u)&&(A=a[u],A!=null))switch(u){case"value":f=A;break;case"defaultValue":y=A;break;case"multiple":o=A;default:Ge(e,n,u,A,a,null)}n=f,a=y,e.multiple=!!o,n!=null?en(e,!!o,n,!1):a!=null&&en(e,!!o,a,!0);return;case"textarea":Se("invalid",e),f=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(A=a[y],A!=null))switch(y){case"value":o=A;break;case"defaultValue":u=A;break;case"children":f=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(91));break;default:Ge(e,n,y,A,a,null)}Bs(e,o,u,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(o=a[B],o!=null))switch(B){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Ge(e,n,B,o,a,null)}return;case"dialog":Se("beforetoggle",e),Se("toggle",e),Se("cancel",e),Se("close",e);break;case"iframe":case"object":Se("load",e);break;case"video":case"audio":for(o=0;o<Do.length;o++)Se(Do[o],e);break;case"image":Se("error",e),Se("load",e);break;case"details":Se("toggle",e);break;case"embed":case"source":case"link":Se("error",e),Se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(at in a)if(a.hasOwnProperty(at)&&(o=a[at],o!=null))switch(at){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ge(e,n,at,o,a,null)}return;default:if(eu(n)){for(vt in a)a.hasOwnProperty(vt)&&(o=a[vt],o!==void 0&&Vf(e,n,vt,o,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(o=a[A],o!=null&&Ge(e,n,A,o,a,null))}function lx(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,y=null,A=null,B=null,at=null,vt=null;for(dt in a){var Et=a[dt];if(a.hasOwnProperty(dt)&&Et!=null)switch(dt){case"checked":break;case"value":break;case"defaultValue":B=Et;default:o.hasOwnProperty(dt)||Ge(e,n,dt,null,o,Et)}}for(var lt in o){var dt=o[lt];if(Et=a[lt],o.hasOwnProperty(lt)&&(dt!=null||Et!=null))switch(lt){case"type":f=dt;break;case"name":u=dt;break;case"checked":at=dt;break;case"defaultChecked":vt=dt;break;case"value":y=dt;break;case"defaultValue":A=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,n));break;default:dt!==Et&&Ge(e,n,lt,dt,o,Et)}}Fe(e,y,A,B,at,vt,f,u);return;case"select":dt=y=A=lt=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":dt=B;default:o.hasOwnProperty(f)||Ge(e,n,f,null,o,B)}for(u in o)if(f=o[u],B=a[u],o.hasOwnProperty(u)&&(f!=null||B!=null))switch(u){case"value":lt=f;break;case"defaultValue":A=f;break;case"multiple":y=f;default:f!==B&&Ge(e,n,u,f,o,B)}n=A,a=y,o=dt,lt!=null?en(e,!!a,lt,!1):!!o!=!!a&&(n!=null?en(e,!!a,n,!0):en(e,!!a,a?[]:"",!1));return;case"textarea":dt=lt=null;for(A in a)if(u=a[A],a.hasOwnProperty(A)&&u!=null&&!o.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:Ge(e,n,A,null,o,u)}for(y in o)if(u=o[y],f=a[y],o.hasOwnProperty(y)&&(u!=null||f!=null))switch(y){case"value":lt=u;break;case"defaultValue":dt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Ge(e,n,y,u,o,f)}Rn(e,lt,dt);return;case"option":for(var jt in a)if(lt=a[jt],a.hasOwnProperty(jt)&&lt!=null&&!o.hasOwnProperty(jt))switch(jt){case"selected":e.selected=!1;break;default:Ge(e,n,jt,null,o,lt)}for(B in o)if(lt=o[B],dt=a[B],o.hasOwnProperty(B)&&lt!==dt&&(lt!=null||dt!=null))switch(B){case"selected":e.selected=lt&&typeof lt!="function"&&typeof lt!="symbol";break;default:Ge(e,n,B,lt,o,dt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var se in a)lt=a[se],a.hasOwnProperty(se)&&lt!=null&&!o.hasOwnProperty(se)&&Ge(e,n,se,null,o,lt);for(at in o)if(lt=o[at],dt=a[at],o.hasOwnProperty(at)&&lt!==dt&&(lt!=null||dt!=null))switch(at){case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,n));break;default:Ge(e,n,at,lt,o,dt)}return;default:if(eu(n)){for(var Ve in a)lt=a[Ve],a.hasOwnProperty(Ve)&&lt!==void 0&&!o.hasOwnProperty(Ve)&&Vf(e,n,Ve,void 0,o,lt);for(vt in o)lt=o[vt],dt=a[vt],!o.hasOwnProperty(vt)||lt===dt||lt===void 0&&dt===void 0||Vf(e,n,vt,lt,o,dt);return}}for(var $ in a)lt=a[$],a.hasOwnProperty($)&&lt!=null&&!o.hasOwnProperty($)&&Ge(e,n,$,null,o,lt);for(Et in o)lt=o[Et],dt=a[Et],!o.hasOwnProperty(Et)||lt===dt||lt==null&&dt==null||Ge(e,n,Et,lt,o,dt)}function t0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function cx(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,y=u.initiatorType,A=u.duration;if(f&&A&&t0(y)){for(y=0,A=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],at=B.startTime;if(at>A)break;var vt=B.transferSize,Et=B.initiatorType;vt&&t0(Et)&&(B=B.responseEnd,y+=vt*(B<A?1:(A-at)/(B-at)))}if(--o,n+=8*(f+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var kf=null,Xf=null;function $l(e){return e.nodeType===9?e:e.ownerDocument}function e0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function n0(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Wf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var jf=null;function ux(){var e=window.event;return e&&e.type==="popstate"?e===jf?!1:(jf=e,!0):(jf=null,!1)}var i0=typeof setTimeout=="function"?setTimeout:void 0,fx=typeof clearTimeout=="function"?clearTimeout:void 0,a0=typeof Promise=="function"?Promise:void 0,hx=typeof queueMicrotask=="function"?queueMicrotask:typeof a0<"u"?function(e){return a0.resolve(null).then(e).catch(dx)}:i0;function dx(e){setTimeout(function(){throw e})}function Pa(e){return e==="head"}function s0(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),mr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Uo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Uo(a);for(var f=a.firstChild;f;){var y=f.nextSibling,A=f.nodeName;f[ns]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=y}}else a==="body"&&Uo(e.ownerDocument.body);a=u}while(a);mr(n)}function r0(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function qf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":qf(a),Kr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function px(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[ns])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=_i(e.nextSibling),e===null)break}return null}function mx(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=_i(e.nextSibling),e===null))return null;return e}function o0(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=_i(e.nextSibling),e===null))return null;return e}function Yf(e){return e.data==="$?"||e.data==="$~"}function Zf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function gx(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function _i(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Kf=null;function l0(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return _i(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function c0(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function u0(e,n,a){switch(n=$l(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Uo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Kr(e)}var vi=new Map,f0=new Set;function tc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var sa=X.d;X.d={f:_x,r:vx,D:yx,C:xx,L:Mx,m:Sx,X:bx,S:Ex,M:Tx};function _x(){var e=sa.f(),n=Wl();return e||n}function vx(e){var n=J(e);n!==null&&n.tag===5&&n.type==="form"?Cm(n):sa.r(e)}var hr=typeof document>"u"?null:document;function h0(e,n,a){var o=hr;if(o&&typeof n=="string"&&n){var u=xn(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),f0.has(u)||(f0.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Ln(n,"link",e),Y(n),o.head.appendChild(n)))}}function yx(e){sa.D(e),h0("dns-prefetch",e,null)}function xx(e,n){sa.C(e,n),h0("preconnect",e,n)}function Mx(e,n,a){sa.L(e,n,a);var o=hr;if(o&&e&&n){var u='link[rel="preload"][as="'+xn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+xn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+xn(a.imageSizes)+'"]')):u+='[href="'+xn(e)+'"]';var f=u;switch(n){case"style":f=dr(e);break;case"script":f=pr(e)}vi.has(f)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),vi.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(No(f))||n==="script"&&o.querySelector(Oo(f))||(n=o.createElement("link"),Ln(n,"link",e),Y(n),o.head.appendChild(n)))}}function Sx(e,n){sa.m(e,n);var a=hr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+xn(o)+'"][href="'+xn(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=pr(e)}if(!vi.has(f)&&(e=_({rel:"modulepreload",href:e},n),vi.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Oo(f)))return}o=a.createElement("link"),Ln(o,"link",e),Y(o),a.head.appendChild(o)}}}function Ex(e,n,a){sa.S(e,n,a);var o=hr;if(o&&e){var u=ut(o).hoistableStyles,f=dr(e);n=n||"default";var y=u.get(f);if(!y){var A={loading:0,preload:null};if(y=o.querySelector(No(f)))A.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=vi.get(f))&&Qf(e,a);var B=y=o.createElement("link");Y(B),Ln(B,"link",e),B._p=new Promise(function(at,vt){B.onload=at,B.onerror=vt}),B.addEventListener("load",function(){A.loading|=1}),B.addEventListener("error",function(){A.loading|=2}),A.loading|=4,ec(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:A},u.set(f,y)}}}function bx(e,n){sa.X(e,n);var a=hr;if(a&&e){var o=ut(a).hoistableScripts,u=pr(e),f=o.get(u);f||(f=a.querySelector(Oo(u)),f||(e=_({src:e,async:!0},n),(n=vi.get(u))&&Jf(e,n),f=a.createElement("script"),Y(f),Ln(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function Tx(e,n){sa.M(e,n);var a=hr;if(a&&e){var o=ut(a).hoistableScripts,u=pr(e),f=o.get(u);f||(f=a.querySelector(Oo(u)),f||(e=_({src:e,async:!0,type:"module"},n),(n=vi.get(u))&&Jf(e,n),f=a.createElement("script"),Y(f),Ln(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function d0(e,n,a,o){var u=(u=k.current)?tc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=dr(a.href),a=ut(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=dr(a.href);var f=ut(u).hoistableStyles,y=f.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,y),(f=u.querySelector(No(e)))&&!f._p&&(y.instance=f,y.state.loading=5),vi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},vi.set(e,a),f||Ax(u,e,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=pr(a),a=ut(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function dr(e){return'href="'+xn(e)+'"'}function No(e){return'link[rel="stylesheet"]['+e+"]"}function p0(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Ax(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Ln(n,"link",a),Y(n),e.head.appendChild(n))}function pr(e){return'[src="'+xn(e)+'"]'}function Oo(e){return"script[async]"+e}function m0(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+xn(a.href)+'"]');if(o)return n.instance=o,Y(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Y(o),Ln(o,"style",u),ec(o,a.precedence,e),n.instance=o;case"stylesheet":u=dr(a.href);var f=e.querySelector(No(u));if(f)return n.state.loading|=4,n.instance=f,Y(f),f;o=p0(a),(u=vi.get(u))&&Qf(o,u),f=(e.ownerDocument||e).createElement("link"),Y(f);var y=f;return y._p=new Promise(function(A,B){y.onload=A,y.onerror=B}),Ln(f,"link",o),n.state.loading|=4,ec(f,a.precedence,e),n.instance=f;case"script":return f=pr(a.src),(u=e.querySelector(Oo(f)))?(n.instance=u,Y(u),u):(o=a,(u=vi.get(f))&&(o=_({},a),Jf(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Y(u),Ln(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,ec(o,a.precedence,e));return n.instance}function ec(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,y=0;y<o.length;y++){var A=o[y];if(A.dataset.precedence===n)f=A;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Qf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Jf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var nc=null;function g0(e,n,a){if(nc===null){var o=new Map,u=nc=new Map;u.set(a,o)}else u=nc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[ns]||f[tn]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var y=f.getAttribute(n)||"";y=e+y;var A=o.get(y);A?A.push(f):o.set(y,[f])}}return o}function _0(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function Rx(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function v0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Cx(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=dr(o.href),f=n.querySelector(No(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=ic.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,Y(f);return}f=n.ownerDocument||n,o=p0(o),(u=vi.get(u))&&Qf(o,u),f=f.createElement("link"),Y(f);var y=f;y._p=new Promise(function(A,B){y.onload=A,y.onerror=B}),Ln(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=ic.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var $f=0;function wx(e,n){return e.stylesheets&&e.count===0&&sc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&sc(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&$f===0&&($f=62500*cx());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&sc(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>$f?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function ic(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)sc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ac=null;function sc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ac=new Map,n.forEach(Dx,e),ac=null,ic.call(e))}function Dx(e,n){if(!(n.state.loading&4)){var a=ac.get(e);if(a)var o=a.get(null);else{a=new Map,ac.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var y=u[f];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),f=a.get(y)||o,f===o&&a.set(null,u),a.set(y,u),this.count++,o=ic.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Po={$$typeof:L,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function Lx(e,n,a,o,u,f,y,A,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=De(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=De(0),this.hiddenUpdates=De(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function y0(e,n,a,o,u,f,y,A,B,at,vt,Et){return e=new Lx(e,n,a,y,B,at,vt,Et,A),n=1,f===!0&&(n|=24),f=ni(3,null,null,n),e.current=f,f.stateNode=e,n=Lu(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Pu(f),e}function x0(e){return e?(e=Ws,e):Ws}function M0(e,n,a,o,u,f){u=x0(u),o.context===null?o.context=u:o.pendingContext=u,o=ba(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Ta(e,o,n),a!==null&&(Jn(a,e,n),ho(a,e,n))}function S0(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function th(e,n){S0(e,n),(e=e.alternate)&&S0(e,n)}function E0(e){if(e.tag===13||e.tag===31){var n=rs(e,67108864);n!==null&&Jn(n,e,67108864),th(e,67108864)}}function b0(e){if(e.tag===13||e.tag===31){var n=oi();n=ts(n);var a=rs(e,n);a!==null&&Jn(a,e,n),th(e,n)}}var rc=!0;function Ux(e,n,a,o){var u=P.T;P.T=null;var f=X.p;try{X.p=2,eh(e,n,a,o)}finally{X.p=f,P.T=u}}function Nx(e,n,a,o){var u=P.T;P.T=null;var f=X.p;try{X.p=8,eh(e,n,a,o)}finally{X.p=f,P.T=u}}function eh(e,n,a,o){if(rc){var u=nh(o);if(u===null)Gf(e,n,o,oc,a),A0(e,o);else if(Px(u,e,n,a,o))o.stopPropagation();else if(A0(e,o),n&4&&-1<Ox.indexOf(e)){for(;u!==null;){var f=J(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var y=Pt(f.pendingLanes);if(y!==0){var A=f;for(A.pendingLanes|=2,A.entangledLanes|=2;y;){var B=1<<31-ae(y);A.entanglements[1]|=B,y&=~B}Ii(f),(Pe&6)===0&&(kl=mt()+500,wo(0))}}break;case 31:case 13:A=rs(f,2),A!==null&&Jn(A,f,2),Wl(),th(f,2)}if(f=nh(o),f===null&&Gf(e,n,o,oc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Gf(e,n,o,null,a)}}function nh(e){return e=iu(e),ih(e)}var oc=null;function ih(e){if(oc=null,e=R(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return oc=e,null}function T0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bt()){case _t:return 2;case Wt:return 8;case Lt:case Xt:return 32;case ve:return 268435456;default:return 32}default:return 32}}var ah=!1,za=null,Ia=null,Ba=null,zo=new Map,Io=new Map,Fa=[],Ox="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function A0(e,n){switch(e){case"focusin":case"focusout":za=null;break;case"dragenter":case"dragleave":Ia=null;break;case"mouseover":case"mouseout":Ba=null;break;case"pointerover":case"pointerout":zo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Io.delete(n.pointerId)}}function Bo(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=J(n),n!==null&&E0(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function Px(e,n,a,o,u){switch(n){case"focusin":return za=Bo(za,e,n,a,o,u),!0;case"dragenter":return Ia=Bo(Ia,e,n,a,o,u),!0;case"mouseover":return Ba=Bo(Ba,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return zo.set(f,Bo(zo.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Io.set(f,Bo(Io.get(f)||null,e,n,a,o,u)),!0}return!1}function R0(e){var n=R(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,es(e.priority,function(){b0(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,es(e.priority,function(){b0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function lc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=nh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);nu=o,a.target.dispatchEvent(o),nu=null}else return n=J(a),n!==null&&E0(n),e.blockedOn=a,!1;n.shift()}return!0}function C0(e,n,a){lc(e)&&a.delete(n)}function zx(){ah=!1,za!==null&&lc(za)&&(za=null),Ia!==null&&lc(Ia)&&(Ia=null),Ba!==null&&lc(Ba)&&(Ba=null),zo.forEach(C0),Io.forEach(C0)}function cc(e,n){e.blockedOn===n&&(e.blockedOn=null,ah||(ah=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,zx)))}var uc=null;function w0(e){uc!==e&&(uc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){uc===e&&(uc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(ih(o||a)===null)continue;break}var f=J(a);f!==null&&(e.splice(n,3),n-=3,ef(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function mr(e){function n(B){return cc(B,e)}za!==null&&cc(za,e),Ia!==null&&cc(Ia,e),Ba!==null&&cc(Ba,e),zo.forEach(n),Io.forEach(n);for(var a=0;a<Fa.length;a++){var o=Fa[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Fa.length&&(a=Fa[0],a.blockedOn===null);)R0(a),a.blockedOn===null&&Fa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],y=u[An]||null;if(typeof f=="function")y||w0(a);else if(y){var A=null;if(f&&f.hasAttribute("formAction")){if(u=f,y=f[An]||null)A=y.formAction;else if(ih(u)!==null)continue}else A=y.action;typeof A=="function"?a[o+1]=A:(a.splice(o,3),o-=3),w0(a)}}}function D0(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function sh(e){this._internalRoot=e}fc.prototype.render=sh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=oi();M0(a,o,e,n,null,null)},fc.prototype.unmount=sh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;M0(e.current,2,null,e,null,null),Wl(),n[Vi]=null}};function fc(e){this._internalRoot=e}fc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Yr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Fa.length&&n!==0&&n<Fa[a].priority;a++);Fa.splice(a,0,e),a===0&&R0(e)}};var L0=t.version;if(L0!=="19.2.8")throw Error(s(527,L0,"19.2.8"));X.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=m(n),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var Ix={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hc.isDisabled&&hc.supportsFiber)try{Jt=hc.inject(Ix),qt=hc}catch{}}return Ho.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=Bm,f=Fm,y=Hm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=y0(e,1,!1,null,null,a,o,null,u,f,y,D0),e[Vi]=n.current,Hf(e),new sh(n)},Ho.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",f=Bm,y=Fm,A=Hm,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=y0(e,1,!0,n,a??null,o,u,B,f,y,A,D0),n.context=x0(null),a=n.current,o=oi(),o=ts(o),u=ba(o),u.callback=null,Ta(a,u,o),a=o,n.current.lanes=a,Tn(n,a),Ii(n),e[Vi]=n.current,Hf(e),new fc(n)},Ho.version="19.2.8",Ho}var G0;function Kx(){if(G0)return lh.exports;G0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),lh.exports=Zx(),lh.exports}var Qx=Kx();const Jx=J_(Qx);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zd="174",Nr={ROTATE:0,DOLLY:1,PAN:2},Lr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$x=0,V0=1,tM=2,$_=1,tv=2,fa=3,ma=0,Xn=1,Mi=2,Ka=0,Qa=1,Ko=2,k0=3,X0=4,eM=5,Rs=100,nM=101,iM=102,aM=103,sM=104,rM=200,oM=201,lM=202,cM=203,jh=204,qh=205,uM=206,fM=207,hM=208,dM=209,pM=210,mM=211,gM=212,_M=213,vM=214,Yh=0,Zh=1,Kh=2,zr=3,Qh=4,Jh=5,$h=6,td=7,ev=0,yM=1,xM=2,Ja=0,MM=1,SM=2,EM=3,nv=4,bM=5,TM=6,AM=7,iv=300,Ir=301,Br=302,ed=303,nd=304,Kc=306,id=1e3,ws=1001,ad=1002,Un=1003,RM=1004,dc=1005,Fi=1006,hh=1007,Ds=1008,ga=1009,av=1010,sv=1011,Qo=1012,Id=1013,Ls=1014,Hi=1015,tl=1016,Bd=1017,Fd=1018,Fr=1020,rv=35902,ov=1021,lv=1022,Ui=1023,cv=1024,uv=1025,Or=1026,Hr=1027,Hd=1028,Gd=1029,fv=1030,Vd=1031,kd=1033,Bc=33776,Fc=33777,Hc=33778,Gc=33779,sd=35840,rd=35841,od=35842,ld=35843,cd=36196,ud=37492,fd=37496,hd=37808,dd=37809,pd=37810,md=37811,gd=37812,_d=37813,vd=37814,yd=37815,xd=37816,Md=37817,Sd=37818,Ed=37819,bd=37820,Td=37821,Vc=36492,Ad=36494,Rd=36495,hv=36283,Cd=36284,wd=36285,Dd=36286,CM=3200,wM=3201,dv=0,DM=1,Ya="",xi="srgb",Gr="srgb-linear",qc="linear",ke="srgb",gr=7680,W0=519,LM=512,UM=513,NM=514,pv=515,OM=516,PM=517,zM=518,IM=519,j0=35044,q0="300 es",ha=2e3,Yc=2001;class Os{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kc=Math.PI/180,Ld=180/Math.PI;function el(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]+"-"+zn[t&255]+zn[t>>8&255]+"-"+zn[t>>16&15|64]+zn[t>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]).toLowerCase()}function Ee(r,t,i){return Math.max(t,Math.min(i,r))}function BM(r,t){return(r%t+t)%t}function dh(r,t,i){return(1-i)*r+i*t}function Go(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function $n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const FM={DEG2RAD:kc};class de{constructor(t=0,i=0){de.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Ee(this.x,t.x,i.x),this.y=Ee(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Ee(this.x,t,i),this.y=Ee(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ee(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(Ee(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class _e{constructor(t,i,s,l,c,h,d,p,m){_e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,p,m)}set(t,i,s,l,c,h,d,p,m){const v=this.elements;return v[0]=t,v[1]=l,v[2]=d,v[3]=i,v[4]=c,v[5]=p,v[6]=s,v[7]=h,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],p=s[6],m=s[1],v=s[4],_=s[7],x=s[2],S=s[5],E=s[8],b=l[0],M=l[3],g=l[6],N=l[1],L=l[4],w=l[7],V=l[2],F=l[5],z=l[8];return c[0]=h*b+d*N+p*V,c[3]=h*M+d*L+p*F,c[6]=h*g+d*w+p*z,c[1]=m*b+v*N+_*V,c[4]=m*M+v*L+_*F,c[7]=m*g+v*w+_*z,c[2]=x*b+S*N+E*V,c[5]=x*M+S*L+E*F,c[8]=x*g+S*w+E*z,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],p=t[6],m=t[7],v=t[8];return i*h*v-i*d*m-s*c*v+s*d*p+l*c*m-l*h*p}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],p=t[6],m=t[7],v=t[8],_=v*h-d*m,x=d*p-v*c,S=m*c-h*p,E=i*_+s*x+l*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/E;return t[0]=_*b,t[1]=(l*m-v*s)*b,t[2]=(d*s-l*h)*b,t[3]=x*b,t[4]=(v*i-l*p)*b,t[5]=(l*c-d*i)*b,t[6]=S*b,t[7]=(s*p-m*i)*b,t[8]=(h*i-s*c)*b,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,d){const p=Math.cos(c),m=Math.sin(c);return this.set(s*p,s*m,-s*(p*h+m*d)+h+t,-l*m,l*p,-l*(-m*h+p*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(ph.makeScale(t,i)),this}rotate(t){return this.premultiply(ph.makeRotation(-t)),this}translate(t,i){return this.premultiply(ph.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ph=new _e;function mv(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Zc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function HM(){const r=Zc("canvas");return r.style.display="block",r}const Y0={};function Ts(r){r in Y0||(Y0[r]=!0,console.warn(r))}function GM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function VM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function kM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Z0=new _e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),K0=new _e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function XM(){const r={enabled:!0,workingColorSpace:Gr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===ke&&(l.r=pa(l.r),l.g=pa(l.g),l.b=pa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===ke&&(l.r=Pr(l.r),l.g=Pr(l.g),l.b=Pr(l.b))),l},fromWorkingColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},toWorkingColorSpace:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ya?qc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Gr]:{primaries:t,whitePoint:s,transfer:qc,toXYZ:Z0,fromXYZ:K0,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:xi},outputColorSpaceConfig:{drawingBufferColorSpace:xi}},[xi]:{primaries:t,whitePoint:s,transfer:ke,toXYZ:Z0,fromXYZ:K0,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:xi}}}),r}const Oe=XM();function pa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Pr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let _r;class WM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{_r===void 0&&(_r=Zc("canvas")),_r.width=t.width,_r.height=t.height;const s=_r.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=_r}return i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Zc("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=pa(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(pa(i[s]/255)*255):i[s]=pa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jM=0;class Xd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jM++}),this.uuid=el(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(mh(l[h].image)):c.push(mh(l[h]))}else c=mh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function mh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?WM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qM=0;class Bn extends Os{constructor(t=Bn.DEFAULT_IMAGE,i=Bn.DEFAULT_MAPPING,s=ws,l=ws,c=Fi,h=Ds,d=Ui,p=ga,m=Bn.DEFAULT_ANISOTROPY,v=Ya){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qM++}),this.uuid=el(),this.name="",this.source=new Xd(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==iv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case id:t.x=t.x-Math.floor(t.x);break;case ws:t.x=t.x<0?0:1;break;case ad:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case id:t.y=t.y-Math.floor(t.y);break;case ws:t.y=t.y<0?0:1;break;case ad:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=iv;Bn.DEFAULT_ANISOTROPY=1;class We{constructor(t=0,i=0,s=0,l=1){We.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const p=t.elements,m=p[0],v=p[4],_=p[8],x=p[1],S=p[5],E=p[9],b=p[2],M=p[6],g=p[10];if(Math.abs(v-x)<.01&&Math.abs(_-b)<.01&&Math.abs(E-M)<.01){if(Math.abs(v+x)<.1&&Math.abs(_+b)<.1&&Math.abs(E+M)<.1&&Math.abs(m+S+g-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const L=(m+1)/2,w=(S+1)/2,V=(g+1)/2,F=(v+x)/4,z=(_+b)/4,j=(E+M)/4;return L>w&&L>V?L<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(L),l=F/s,c=z/s):w>V?w<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),s=F/l,c=j/l):V<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(V),s=z/c,l=j/c),this.set(s,l,c,i),this}let N=Math.sqrt((M-E)*(M-E)+(_-b)*(_-b)+(x-v)*(x-v));return Math.abs(N)<.001&&(N=1),this.x=(M-E)/N,this.y=(_-b)/N,this.z=(x-v)/N,this.w=Math.acos((m+S+g-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Ee(this.x,t.x,i.x),this.y=Ee(this.y,t.y,i.y),this.z=Ee(this.z,t.z,i.z),this.w=Ee(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Ee(this.x,t,i),this.y=Ee(this.y,t,i),this.z=Ee(this.z,t,i),this.w=Ee(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ee(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class YM extends Os{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new We(0,0,t,i),this.scissorTest=!1,this.viewport=new We(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new Bn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Xd(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Us extends YM{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class gv extends Bn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Un,this.minFilter=Un,this.wrapR=ws,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ZM extends Bn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Un,this.minFilter=Un,this.wrapR=ws,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ns{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,d){let p=s[l+0],m=s[l+1],v=s[l+2],_=s[l+3];const x=c[h+0],S=c[h+1],E=c[h+2],b=c[h+3];if(d===0){t[i+0]=p,t[i+1]=m,t[i+2]=v,t[i+3]=_;return}if(d===1){t[i+0]=x,t[i+1]=S,t[i+2]=E,t[i+3]=b;return}if(_!==b||p!==x||m!==S||v!==E){let M=1-d;const g=p*x+m*S+v*E+_*b,N=g>=0?1:-1,L=1-g*g;if(L>Number.EPSILON){const V=Math.sqrt(L),F=Math.atan2(V,g*N);M=Math.sin(M*F)/V,d=Math.sin(d*F)/V}const w=d*N;if(p=p*M+x*w,m=m*M+S*w,v=v*M+E*w,_=_*M+b*w,M===1-d){const V=1/Math.sqrt(p*p+m*m+v*v+_*_);p*=V,m*=V,v*=V,_*=V}}t[i]=p,t[i+1]=m,t[i+2]=v,t[i+3]=_}static multiplyQuaternionsFlat(t,i,s,l,c,h){const d=s[l],p=s[l+1],m=s[l+2],v=s[l+3],_=c[h],x=c[h+1],S=c[h+2],E=c[h+3];return t[i]=d*E+v*_+p*S-m*x,t[i+1]=p*E+v*x+m*_-d*S,t[i+2]=m*E+v*S+d*x-p*_,t[i+3]=v*E-d*_-p*x-m*S,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,p=Math.sin,m=d(s/2),v=d(l/2),_=d(c/2),x=p(s/2),S=p(l/2),E=p(c/2);switch(h){case"XYZ":this._x=x*v*_+m*S*E,this._y=m*S*_-x*v*E,this._z=m*v*E+x*S*_,this._w=m*v*_-x*S*E;break;case"YXZ":this._x=x*v*_+m*S*E,this._y=m*S*_-x*v*E,this._z=m*v*E-x*S*_,this._w=m*v*_+x*S*E;break;case"ZXY":this._x=x*v*_-m*S*E,this._y=m*S*_+x*v*E,this._z=m*v*E+x*S*_,this._w=m*v*_-x*S*E;break;case"ZYX":this._x=x*v*_-m*S*E,this._y=m*S*_+x*v*E,this._z=m*v*E-x*S*_,this._w=m*v*_+x*S*E;break;case"YZX":this._x=x*v*_+m*S*E,this._y=m*S*_+x*v*E,this._z=m*v*E-x*S*_,this._w=m*v*_-x*S*E;break;case"XZY":this._x=x*v*_-m*S*E,this._y=m*S*_-x*v*E,this._z=m*v*E+x*S*_,this._w=m*v*_+x*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],p=i[9],m=i[2],v=i[6],_=i[10],x=s+d+_;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(v-p)*S,this._y=(c-m)*S,this._z=(h-l)*S}else if(s>d&&s>_){const S=2*Math.sqrt(1+s-d-_);this._w=(v-p)/S,this._x=.25*S,this._y=(l+h)/S,this._z=(c+m)/S}else if(d>_){const S=2*Math.sqrt(1+d-s-_);this._w=(c-m)/S,this._x=(l+h)/S,this._y=.25*S,this._z=(p+v)/S}else{const S=2*Math.sqrt(1+_-s-d);this._w=(h-l)/S,this._x=(c+m)/S,this._y=(p+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,d=i._x,p=i._y,m=i._z,v=i._w;return this._x=s*v+h*d+l*m-c*p,this._y=l*v+h*p+c*d-s*m,this._z=c*v+h*m+s*p-l*d,this._w=h*v-s*d-l*p-c*m,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=c,this;const p=1-d*d;if(p<=Number.EPSILON){const S=1-i;return this._w=S*h+i*this._w,this._x=S*s+i*this._x,this._y=S*l+i*this._y,this._z=S*c+i*this._z,this.normalize(),this}const m=Math.sqrt(p),v=Math.atan2(m,d),_=Math.sin((1-i)*v)/m,x=Math.sin(i*v)/m;return this._w=h*_+this._w*x,this._x=s*_+this._x*x,this._y=l*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class tt{constructor(t=0,i=0,s=0){tt.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Q0.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Q0.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,d=t.z,p=t.w,m=2*(h*l-d*s),v=2*(d*i-c*l),_=2*(c*s-h*i);return this.x=i+p*m+h*_-d*v,this.y=s+p*v+d*m-c*_,this.z=l+p*_+c*v-h*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Ee(this.x,t.x,i.x),this.y=Ee(this.y,t.y,i.y),this.z=Ee(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Ee(this.x,t,i),this.y=Ee(this.y,t,i),this.z=Ee(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ee(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,d=i.y,p=i.z;return this.x=l*p-c*d,this.y=c*h-s*p,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return gh.copy(this).projectOnVector(t),this.sub(gh)}reflect(t){return this.sub(gh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(Ee(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gh=new tt,Q0=new Ns;class Ps{constructor(t=new tt(1/0,1/0,1/0),i=new tt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Ci.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Ci.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Ci.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,Ci):Ci.fromBufferAttribute(c,h),Ci.applyMatrix4(t.matrixWorld),this.expandByPoint(Ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),pc.copy(s.boundingBox)),pc.applyMatrix4(t.matrixWorld),this.union(pc)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ci),Ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vo),mc.subVectors(this.max,Vo),vr.subVectors(t.a,Vo),yr.subVectors(t.b,Vo),xr.subVectors(t.c,Vo),Ga.subVectors(yr,vr),Va.subVectors(xr,yr),ys.subVectors(vr,xr);let i=[0,-Ga.z,Ga.y,0,-Va.z,Va.y,0,-ys.z,ys.y,Ga.z,0,-Ga.x,Va.z,0,-Va.x,ys.z,0,-ys.x,-Ga.y,Ga.x,0,-Va.y,Va.x,0,-ys.y,ys.x,0];return!_h(i,vr,yr,xr,mc)||(i=[1,0,0,0,1,0,0,0,1],!_h(i,vr,yr,xr,mc))?!1:(gc.crossVectors(Ga,Va),i=[gc.x,gc.y,gc.z],_h(i,vr,yr,xr,mc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ra[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ra[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ra[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ra[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ra[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ra[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ra[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ra[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ra),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ra=[new tt,new tt,new tt,new tt,new tt,new tt,new tt,new tt],Ci=new tt,pc=new Ps,vr=new tt,yr=new tt,xr=new tt,Ga=new tt,Va=new tt,ys=new tt,Vo=new tt,mc=new tt,gc=new tt,xs=new tt;function _h(r,t,i,s,l){for(let c=0,h=r.length-3;c<=h;c+=3){xs.fromArray(r,c);const d=l.x*Math.abs(xs.x)+l.y*Math.abs(xs.y)+l.z*Math.abs(xs.z),p=t.dot(xs),m=i.dot(xs),v=s.dot(xs);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>d)return!1}return!0}const KM=new Ps,ko=new tt,vh=new tt;class kr{constructor(t=new tt,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):KM.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ko.subVectors(t,this.center);const i=ko.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ko,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ko.copy(t.center).add(vh)),this.expandByPoint(ko.copy(t.center).sub(vh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oa=new tt,yh=new tt,_c=new tt,ka=new tt,xh=new tt,vc=new tt,Mh=new tt;class Wd{constructor(t=new tt,i=new tt(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,oa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=oa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(oa.copy(this.origin).addScaledVector(this.direction,i),oa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){yh.copy(t).add(i).multiplyScalar(.5),_c.copy(i).sub(t).normalize(),ka.copy(this.origin).sub(yh);const c=t.distanceTo(i)*.5,h=-this.direction.dot(_c),d=ka.dot(this.direction),p=-ka.dot(_c),m=ka.lengthSq(),v=Math.abs(1-h*h);let _,x,S,E;if(v>0)if(_=h*p-d,x=h*d-p,E=c*v,_>=0)if(x>=-E)if(x<=E){const b=1/v;_*=b,x*=b,S=_*(_+h*x+2*d)+x*(h*_+x+2*p)+m}else x=c,_=Math.max(0,-(h*x+d)),S=-_*_+x*(x+2*p)+m;else x=-c,_=Math.max(0,-(h*x+d)),S=-_*_+x*(x+2*p)+m;else x<=-E?(_=Math.max(0,-(-h*c+d)),x=_>0?-c:Math.min(Math.max(-c,-p),c),S=-_*_+x*(x+2*p)+m):x<=E?(_=0,x=Math.min(Math.max(-c,-p),c),S=x*(x+2*p)+m):(_=Math.max(0,-(h*c+d)),x=_>0?c:Math.min(Math.max(-c,-p),c),S=-_*_+x*(x+2*p)+m);else x=h>0?-c:c,_=Math.max(0,-(h*x+d)),S=-_*_+x*(x+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(yh).addScaledVector(_c,x),S}intersectSphere(t,i){oa.subVectors(t.center,this.origin);const s=oa.dot(this.direction),l=oa.dot(oa)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,p=s+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,d,p;const m=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(s=(t.min.x-x.x)*m,l=(t.max.x-x.x)*m):(s=(t.max.x-x.x)*m,l=(t.min.x-x.x)*m),v>=0?(c=(t.min.y-x.y)*v,h=(t.max.y-x.y)*v):(c=(t.max.y-x.y)*v,h=(t.min.y-x.y)*v),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),_>=0?(d=(t.min.z-x.z)*_,p=(t.max.z-x.z)*_):(d=(t.max.z-x.z)*_,p=(t.min.z-x.z)*_),s>p||d>l)||((d>s||s!==s)&&(s=d),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,oa)!==null}intersectTriangle(t,i,s,l,c){xh.subVectors(i,t),vc.subVectors(s,t),Mh.crossVectors(xh,vc);let h=this.direction.dot(Mh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;ka.subVectors(this.origin,t);const p=d*this.direction.dot(vc.crossVectors(ka,vc));if(p<0)return null;const m=d*this.direction.dot(xh.cross(ka));if(m<0||p+m>h)return null;const v=-d*ka.dot(Mh);return v<0?null:this.at(v/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(t,i,s,l,c,h,d,p,m,v,_,x,S,E,b,M){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,p,m,v,_,x,S,E,b,M)}set(t,i,s,l,c,h,d,p,m,v,_,x,S,E,b,M){const g=this.elements;return g[0]=t,g[4]=i,g[8]=s,g[12]=l,g[1]=c,g[5]=h,g[9]=d,g[13]=p,g[2]=m,g[6]=v,g[10]=_,g[14]=x,g[3]=S,g[7]=E,g[11]=b,g[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/Mr.setFromMatrixColumn(t,0).length(),c=1/Mr.setFromMatrixColumn(t,1).length(),h=1/Mr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),d=Math.sin(s),p=Math.cos(l),m=Math.sin(l),v=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const x=h*v,S=h*_,E=d*v,b=d*_;i[0]=p*v,i[4]=-p*_,i[8]=m,i[1]=S+E*m,i[5]=x-b*m,i[9]=-d*p,i[2]=b-x*m,i[6]=E+S*m,i[10]=h*p}else if(t.order==="YXZ"){const x=p*v,S=p*_,E=m*v,b=m*_;i[0]=x+b*d,i[4]=E*d-S,i[8]=h*m,i[1]=h*_,i[5]=h*v,i[9]=-d,i[2]=S*d-E,i[6]=b+x*d,i[10]=h*p}else if(t.order==="ZXY"){const x=p*v,S=p*_,E=m*v,b=m*_;i[0]=x-b*d,i[4]=-h*_,i[8]=E+S*d,i[1]=S+E*d,i[5]=h*v,i[9]=b-x*d,i[2]=-h*m,i[6]=d,i[10]=h*p}else if(t.order==="ZYX"){const x=h*v,S=h*_,E=d*v,b=d*_;i[0]=p*v,i[4]=E*m-S,i[8]=x*m+b,i[1]=p*_,i[5]=b*m+x,i[9]=S*m-E,i[2]=-m,i[6]=d*p,i[10]=h*p}else if(t.order==="YZX"){const x=h*p,S=h*m,E=d*p,b=d*m;i[0]=p*v,i[4]=b-x*_,i[8]=E*_+S,i[1]=_,i[5]=h*v,i[9]=-d*v,i[2]=-m*v,i[6]=S*_+E,i[10]=x-b*_}else if(t.order==="XZY"){const x=h*p,S=h*m,E=d*p,b=d*m;i[0]=p*v,i[4]=-_,i[8]=m*v,i[1]=x*_+b,i[5]=h*v,i[9]=S*_-E,i[2]=E*_-S,i[6]=d*v,i[10]=b*_+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(QM,t,JM)}lookAt(t,i,s){const l=this.elements;return li.subVectors(t,i),li.lengthSq()===0&&(li.z=1),li.normalize(),Xa.crossVectors(s,li),Xa.lengthSq()===0&&(Math.abs(s.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),Xa.crossVectors(s,li)),Xa.normalize(),yc.crossVectors(li,Xa),l[0]=Xa.x,l[4]=yc.x,l[8]=li.x,l[1]=Xa.y,l[5]=yc.y,l[9]=li.y,l[2]=Xa.z,l[6]=yc.z,l[10]=li.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],p=s[8],m=s[12],v=s[1],_=s[5],x=s[9],S=s[13],E=s[2],b=s[6],M=s[10],g=s[14],N=s[3],L=s[7],w=s[11],V=s[15],F=l[0],z=l[4],j=l[8],D=l[12],C=l[1],H=l[5],ht=l[9],rt=l[13],yt=l[2],ft=l[6],P=l[10],X=l[14],q=l[3],St=l[7],At=l[11],O=l[15];return c[0]=h*F+d*C+p*yt+m*q,c[4]=h*z+d*H+p*ft+m*St,c[8]=h*j+d*ht+p*P+m*At,c[12]=h*D+d*rt+p*X+m*O,c[1]=v*F+_*C+x*yt+S*q,c[5]=v*z+_*H+x*ft+S*St,c[9]=v*j+_*ht+x*P+S*At,c[13]=v*D+_*rt+x*X+S*O,c[2]=E*F+b*C+M*yt+g*q,c[6]=E*z+b*H+M*ft+g*St,c[10]=E*j+b*ht+M*P+g*At,c[14]=E*D+b*rt+M*X+g*O,c[3]=N*F+L*C+w*yt+V*q,c[7]=N*z+L*H+w*ft+V*St,c[11]=N*j+L*ht+w*P+V*At,c[15]=N*D+L*rt+w*X+V*O,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],d=t[5],p=t[9],m=t[13],v=t[2],_=t[6],x=t[10],S=t[14],E=t[3],b=t[7],M=t[11],g=t[15];return E*(+c*p*_-l*m*_-c*d*x+s*m*x+l*d*S-s*p*S)+b*(+i*p*S-i*m*x+c*h*x-l*h*S+l*m*v-c*p*v)+M*(+i*m*_-i*d*S-c*h*_+s*h*S+c*d*v-s*m*v)+g*(-l*d*v-i*p*_+i*d*x+l*h*_-s*h*x+s*p*v)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],p=t[6],m=t[7],v=t[8],_=t[9],x=t[10],S=t[11],E=t[12],b=t[13],M=t[14],g=t[15],N=_*M*m-b*x*m+b*p*S-d*M*S-_*p*g+d*x*g,L=E*x*m-v*M*m-E*p*S+h*M*S+v*p*g-h*x*g,w=v*b*m-E*_*m+E*d*S-h*b*S-v*d*g+h*_*g,V=E*_*p-v*b*p-E*d*x+h*b*x+v*d*M-h*_*M,F=i*N+s*L+l*w+c*V;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/F;return t[0]=N*z,t[1]=(b*x*c-_*M*c-b*l*S+s*M*S+_*l*g-s*x*g)*z,t[2]=(d*M*c-b*p*c+b*l*m-s*M*m-d*l*g+s*p*g)*z,t[3]=(_*p*c-d*x*c-_*l*m+s*x*m+d*l*S-s*p*S)*z,t[4]=L*z,t[5]=(v*M*c-E*x*c+E*l*S-i*M*S-v*l*g+i*x*g)*z,t[6]=(E*p*c-h*M*c-E*l*m+i*M*m+h*l*g-i*p*g)*z,t[7]=(h*x*c-v*p*c+v*l*m-i*x*m-h*l*S+i*p*S)*z,t[8]=w*z,t[9]=(E*_*c-v*b*c-E*s*S+i*b*S+v*s*g-i*_*g)*z,t[10]=(h*b*c-E*d*c+E*s*m-i*b*m-h*s*g+i*d*g)*z,t[11]=(v*d*c-h*_*c-v*s*m+i*_*m+h*s*S-i*d*S)*z,t[12]=V*z,t[13]=(v*b*l-E*_*l+E*s*x-i*b*x-v*s*M+i*_*M)*z,t[14]=(E*d*l-h*b*l-E*s*p+i*b*p+h*s*M-i*d*M)*z,t[15]=(h*_*l-v*d*l+v*s*p-i*_*p-h*s*x+i*d*x)*z,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,d=t.y,p=t.z,m=c*h,v=c*d;return this.set(m*h+s,m*d-l*p,m*p+l*d,0,m*d+l*p,v*d+s,v*p-l*h,0,m*p-l*d,v*p+l*h,c*p*p+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,p=i._w,m=c+c,v=h+h,_=d+d,x=c*m,S=c*v,E=c*_,b=h*v,M=h*_,g=d*_,N=p*m,L=p*v,w=p*_,V=s.x,F=s.y,z=s.z;return l[0]=(1-(b+g))*V,l[1]=(S+w)*V,l[2]=(E-L)*V,l[3]=0,l[4]=(S-w)*F,l[5]=(1-(x+g))*F,l[6]=(M+N)*F,l[7]=0,l[8]=(E+L)*z,l[9]=(M-N)*z,l[10]=(1-(x+b))*z,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=Mr.set(l[0],l[1],l[2]).length();const h=Mr.set(l[4],l[5],l[6]).length(),d=Mr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],wi.copy(this);const m=1/c,v=1/h,_=1/d;return wi.elements[0]*=m,wi.elements[1]*=m,wi.elements[2]*=m,wi.elements[4]*=v,wi.elements[5]*=v,wi.elements[6]*=v,wi.elements[8]*=_,wi.elements[9]*=_,wi.elements[10]*=_,i.setFromRotationMatrix(wi),s.x=c,s.y=h,s.z=d,this}makePerspective(t,i,s,l,c,h,d=ha){const p=this.elements,m=2*c/(i-t),v=2*c/(s-l),_=(i+t)/(i-t),x=(s+l)/(s-l);let S,E;if(d===ha)S=-(h+c)/(h-c),E=-2*h*c/(h-c);else if(d===Yc)S=-h/(h-c),E=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=v,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=S,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,s,l,c,h,d=ha){const p=this.elements,m=1/(i-t),v=1/(s-l),_=1/(h-c),x=(i+t)*m,S=(s+l)*v;let E,b;if(d===ha)E=(h+c)*_,b=-2*_;else if(d===Yc)E=c*_,b=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-S,p[2]=0,p[6]=0,p[10]=b,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const Mr=new tt,wi=new qe,QM=new tt(0,0,0),JM=new tt(1,1,1),Xa=new tt,yc=new tt,li=new tt,J0=new qe,$0=new Ns;class Gi{constructor(t=0,i=0,s=0,l=Gi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],p=l[1],m=l[5],v=l[9],_=l[2],x=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-h,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-Ee(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-h,m));break;case"YZX":this._z=Math.asin(Ee(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return J0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(J0,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return $0.setFromEuler(this),this.setFromQuaternion($0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gi.DEFAULT_ORDER="XYZ";class _v{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $M=0;const t_=new tt,Sr=new Ns,la=new qe,xc=new tt,Xo=new tt,tS=new tt,eS=new Ns,e_=new tt(1,0,0),n_=new tt(0,1,0),i_=new tt(0,0,1),a_={type:"added"},nS={type:"removed"},Er={type:"childadded",child:null},Sh={type:"childremoved",child:null};class _n extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=el(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_n.DEFAULT_UP.clone();const t=new tt,i=new Gi,s=new Ns,l=new tt(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new qe},normalMatrix:{value:new _e}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=_n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _v,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Sr.setFromAxisAngle(t,i),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(t,i){return Sr.setFromAxisAngle(t,i),this.quaternion.premultiply(Sr),this}rotateX(t){return this.rotateOnAxis(e_,t)}rotateY(t){return this.rotateOnAxis(n_,t)}rotateZ(t){return this.rotateOnAxis(i_,t)}translateOnAxis(t,i){return t_.copy(t).applyQuaternion(this.quaternion),this.position.add(t_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(e_,t)}translateY(t){return this.translateOnAxis(n_,t)}translateZ(t){return this.translateOnAxis(i_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(la.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?xc.copy(t):xc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?la.lookAt(Xo,xc,this.up):la.lookAt(xc,Xo,this.up),this.quaternion.setFromRotationMatrix(la),l&&(la.extractRotation(l.matrixWorld),Sr.setFromRotationMatrix(la),this.quaternion.premultiply(Sr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(a_),Er.child=t,this.dispatchEvent(Er),Er.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(nS),Sh.child=t,this.dispatchEvent(Sh),Sh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),la.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),la.multiply(t.parent.matrixWorld)),t.applyMatrix4(la),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(a_),Er.child=t,this.dispatchEvent(Er),Er.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xo,t,tS),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xo,eS,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const _=p[m];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(c(t.materials,this.material[p]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];l.animations.push(c(t.animations,p))}}if(i){const d=h(t.geometries),p=h(t.materials),m=h(t.textures),v=h(t.images),_=h(t.shapes),x=h(t.skeletons),S=h(t.animations),E=h(t.nodes);d.length>0&&(s.geometries=d),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),v.length>0&&(s.images=v),_.length>0&&(s.shapes=_),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=l,s;function h(d){const p=[];for(const m in d){const v=d[m];delete v.metadata,p.push(v)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}_n.DEFAULT_UP=new tt(0,1,0);_n.DEFAULT_MATRIX_AUTO_UPDATE=!0;_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Di=new tt,ca=new tt,Eh=new tt,ua=new tt,br=new tt,Tr=new tt,s_=new tt,bh=new tt,Th=new tt,Ah=new tt,Rh=new We,Ch=new We,wh=new We;class Li{constructor(t=new tt,i=new tt,s=new tt){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Di.subVectors(t,i),l.cross(Di);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Di.subVectors(l,i),ca.subVectors(s,i),Eh.subVectors(t,i);const h=Di.dot(Di),d=Di.dot(ca),p=Di.dot(Eh),m=ca.dot(ca),v=ca.dot(Eh),_=h*m-d*d;if(_===0)return c.set(0,0,0),null;const x=1/_,S=(m*p-d*v)*x,E=(h*v-d*p)*x;return c.set(1-S-E,E,S)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ua)===null?!1:ua.x>=0&&ua.y>=0&&ua.x+ua.y<=1}static getInterpolation(t,i,s,l,c,h,d,p){return this.getBarycoord(t,i,s,l,ua)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,ua.x),p.addScaledVector(h,ua.y),p.addScaledVector(d,ua.z),p)}static getInterpolatedAttribute(t,i,s,l,c,h){return Rh.setScalar(0),Ch.setScalar(0),wh.setScalar(0),Rh.fromBufferAttribute(t,i),Ch.fromBufferAttribute(t,s),wh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Rh,c.x),h.addScaledVector(Ch,c.y),h.addScaledVector(wh,c.z),h}static isFrontFacing(t,i,s,l){return Di.subVectors(s,i),ca.subVectors(t,i),Di.cross(ca).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Di.subVectors(this.c,this.b),ca.subVectors(this.a,this.b),Di.cross(ca).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Li.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Li.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Li.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Li.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Li.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,d;br.subVectors(l,s),Tr.subVectors(c,s),bh.subVectors(t,s);const p=br.dot(bh),m=Tr.dot(bh);if(p<=0&&m<=0)return i.copy(s);Th.subVectors(t,l);const v=br.dot(Th),_=Tr.dot(Th);if(v>=0&&_<=v)return i.copy(l);const x=p*_-v*m;if(x<=0&&p>=0&&v<=0)return h=p/(p-v),i.copy(s).addScaledVector(br,h);Ah.subVectors(t,c);const S=br.dot(Ah),E=Tr.dot(Ah);if(E>=0&&S<=E)return i.copy(c);const b=S*m-p*E;if(b<=0&&m>=0&&E<=0)return d=m/(m-E),i.copy(s).addScaledVector(Tr,d);const M=v*E-S*_;if(M<=0&&_-v>=0&&S-E>=0)return s_.subVectors(c,l),d=(_-v)/(_-v+(S-E)),i.copy(l).addScaledVector(s_,d);const g=1/(M+b+x);return h=b*g,d=x*g,i.copy(s).addScaledVector(br,h).addScaledVector(Tr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wa={h:0,s:0,l:0},Mc={h:0,s:0,l:0};function Dh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class xe{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=xi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Oe.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=Oe.workingColorSpace){return this.r=t,this.g=i,this.b=s,Oe.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=Oe.workingColorSpace){if(t=BM(t,1),i=Ee(i,0,1),s=Ee(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=Dh(h,c,t+1/3),this.g=Dh(h,c,t),this.b=Dh(h,c,t-1/3)}return Oe.toWorkingColorSpace(this,l),this}setStyle(t,i=xi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=xi){const s=vv[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pa(t.r),this.g=pa(t.g),this.b=pa(t.b),this}copyLinearToSRGB(t){return this.r=Pr(t.r),this.g=Pr(t.g),this.b=Pr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xi){return Oe.fromWorkingColorSpace(In.copy(this),t),Math.round(Ee(In.r*255,0,255))*65536+Math.round(Ee(In.g*255,0,255))*256+Math.round(Ee(In.b*255,0,255))}getHexString(t=xi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Oe.workingColorSpace){Oe.fromWorkingColorSpace(In.copy(this),i);const s=In.r,l=In.g,c=In.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let p,m;const v=(d+h)/2;if(d===h)p=0,m=0;else{const _=h-d;switch(m=v<=.5?_/(h+d):_/(2-h-d),h){case s:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-s)/_+2;break;case c:p=(s-l)/_+4;break}p/=6}return t.h=p,t.s=m,t.l=v,t}getRGB(t,i=Oe.workingColorSpace){return Oe.fromWorkingColorSpace(In.copy(this),i),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=xi){Oe.fromWorkingColorSpace(In.copy(this),t);const i=In.r,s=In.g,l=In.b;return t!==xi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Wa),this.setHSL(Wa.h+t,Wa.s+i,Wa.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Wa),t.getHSL(Mc);const s=dh(Wa.h,Mc.h,i),l=dh(Wa.s,Mc.s,i),c=dh(Wa.l,Mc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new xe;xe.NAMES=vv;let iS=0;class Xr extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iS++}),this.uuid=el(),this.name="",this.type="Material",this.blending=Qa,this.side=ma,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jh,this.blendDst=qh,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=W0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gr,this.stencilZFail=gr,this.stencilZPass=gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Qa&&(s.blending=this.blending),this.side!==ma&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==jh&&(s.blendSrc=this.blendSrc),this.blendDst!==qh&&(s.blendDst=this.blendDst),this.blendEquation!==Rs&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==zr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==W0&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==gr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==gr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const p=c[d];delete p.metadata,h.push(p)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Jo extends Xr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gi,this.combine=ev,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fn=new tt,Sc=new de;let aS=0;class $e{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:aS++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=j0,this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Sc.fromBufferAttribute(this,i),Sc.applyMatrix3(t),this.setXY(i,Sc.x,Sc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyMatrix3(t),this.setXYZ(i,fn.x,fn.y,fn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyMatrix4(t),this.setXYZ(i,fn.x,fn.y,fn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyNormalMatrix(t),this.setXYZ(i,fn.x,fn.y,fn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.transformDirection(t),this.setXYZ(i,fn.x,fn.y,fn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Go(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=$n(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Go(i,this.array)),i}setX(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Go(i,this.array)),i}setY(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Go(i,this.array)),i}setZ(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Go(i,this.array)),i}setW(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array),c=$n(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==j0&&(t.usage=this.usage),t}}class yv extends $e{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class xv extends $e{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Fn extends $e{constructor(t,i,s){super(new Float32Array(t),i,s)}}let sS=0;const yi=new qe,Lh=new _n,Ar=new tt,ci=new Ps,Wo=new Ps,Sn=new tt;class bn extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sS++}),this.uuid=el(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(mv(t)?xv:yv)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new _e().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yi.makeRotationFromQuaternion(t),this.applyMatrix4(yi),this}rotateX(t){return yi.makeRotationX(t),this.applyMatrix4(yi),this}rotateY(t){return yi.makeRotationY(t),this.applyMatrix4(yi),this}rotateZ(t){return yi.makeRotationZ(t),this.applyMatrix4(yi),this}translate(t,i,s){return yi.makeTranslation(t,i,s),this.applyMatrix4(yi),this}scale(t,i,s){return yi.makeScale(t,i,s),this.applyMatrix4(yi),this}lookAt(t){return Lh.lookAt(t),Lh.updateMatrix(),this.applyMatrix4(Lh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Fn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ps);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new tt(-1/0,-1/0,-1/0),new tt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ci.setFromBufferAttribute(c),this.morphTargetsRelative?(Sn.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Sn),Sn.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Sn)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kr);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new tt,1/0);return}if(t){const s=this.boundingSphere.center;if(ci.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Wo.setFromBufferAttribute(d),this.morphTargetsRelative?(Sn.addVectors(ci.min,Wo.min),ci.expandByPoint(Sn),Sn.addVectors(ci.max,Wo.max),ci.expandByPoint(Sn)):(ci.expandByPoint(Wo.min),ci.expandByPoint(Wo.max))}ci.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)Sn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(Sn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],p=this.morphTargetsRelative;for(let m=0,v=d.count;m<v;m++)Sn.fromBufferAttribute(d,m),p&&(Ar.fromBufferAttribute(t,m),Sn.add(Ar)),l=Math.max(l,s.distanceToSquared(Sn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let j=0;j<s.count;j++)d[j]=new tt,p[j]=new tt;const m=new tt,v=new tt,_=new tt,x=new de,S=new de,E=new de,b=new tt,M=new tt;function g(j,D,C){m.fromBufferAttribute(s,j),v.fromBufferAttribute(s,D),_.fromBufferAttribute(s,C),x.fromBufferAttribute(c,j),S.fromBufferAttribute(c,D),E.fromBufferAttribute(c,C),v.sub(m),_.sub(m),S.sub(x),E.sub(x);const H=1/(S.x*E.y-E.x*S.y);isFinite(H)&&(b.copy(v).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(H),M.copy(_).multiplyScalar(S.x).addScaledVector(v,-E.x).multiplyScalar(H),d[j].add(b),d[D].add(b),d[C].add(b),p[j].add(M),p[D].add(M),p[C].add(M))}let N=this.groups;N.length===0&&(N=[{start:0,count:t.count}]);for(let j=0,D=N.length;j<D;++j){const C=N[j],H=C.start,ht=C.count;for(let rt=H,yt=H+ht;rt<yt;rt+=3)g(t.getX(rt+0),t.getX(rt+1),t.getX(rt+2))}const L=new tt,w=new tt,V=new tt,F=new tt;function z(j){V.fromBufferAttribute(l,j),F.copy(V);const D=d[j];L.copy(D),L.sub(V.multiplyScalar(V.dot(D))).normalize(),w.crossVectors(F,D);const H=w.dot(p[j])<0?-1:1;h.setXYZW(j,L.x,L.y,L.z,H)}for(let j=0,D=N.length;j<D;++j){const C=N[j],H=C.start,ht=C.count;for(let rt=H,yt=H+ht;rt<yt;rt+=3)z(t.getX(rt+0)),z(t.getX(rt+1)),z(t.getX(rt+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new $e(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const l=new tt,c=new tt,h=new tt,d=new tt,p=new tt,m=new tt,v=new tt,_=new tt;if(t)for(let x=0,S=t.count;x<S;x+=3){const E=t.getX(x+0),b=t.getX(x+1),M=t.getX(x+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,b),h.fromBufferAttribute(i,M),v.subVectors(h,c),_.subVectors(l,c),v.cross(_),d.fromBufferAttribute(s,E),p.fromBufferAttribute(s,b),m.fromBufferAttribute(s,M),d.add(v),p.add(v),m.add(v),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(b,p.x,p.y,p.z),s.setXYZ(M,m.x,m.y,m.z)}else for(let x=0,S=i.count;x<S;x+=3)l.fromBufferAttribute(i,x+0),c.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),v.subVectors(h,c),_.subVectors(l,c),v.cross(_),s.setXYZ(x+0,v.x,v.y,v.z),s.setXYZ(x+1,v.x,v.y,v.z),s.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Sn.fromBufferAttribute(t,i),Sn.normalize(),t.setXYZ(i,Sn.x,Sn.y,Sn.z)}toNonIndexed(){function t(d,p){const m=d.array,v=d.itemSize,_=d.normalized,x=new m.constructor(p.length*v);let S=0,E=0;for(let b=0,M=p.length;b<M;b++){d.isInterleavedBufferAttribute?S=p[b]*d.data.stride+d.offset:S=p[b]*v;for(let g=0;g<v;g++)x[E++]=m[S++]}return new $e(x,v,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new bn,s=this.index.array,l=this.attributes;for(const d in l){const p=l[d],m=t(p,s);i.setAttribute(d,m)}const c=this.morphAttributes;for(const d in c){const p=[],m=c[d];for(let v=0,_=m.length;v<_;v++){const x=m[v],S=t(x,s);p.push(S)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const m=h[d];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let _=0,x=m.length;_<x;_++){const S=m[_];v.push(S.toJSON(t.data))}v.length>0&&(l[p]=v,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const m in l){const v=l[m];this.setAttribute(m,v.clone(i))}const c=t.morphAttributes;for(const m in c){const v=[],_=c[m];for(let x=0,S=_.length;x<S;x++)v.push(_[x].clone(i));this.morphAttributes[m]=v}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let m=0,v=h.length;m<v;m++){const _=h[m];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const r_=new qe,Ms=new Wd,Ec=new kr,o_=new tt,bc=new tt,Tc=new tt,Ac=new tt,Uh=new tt,Rc=new tt,l_=new tt,Cc=new tt;class En extends _n{constructor(t=new bn,i=new Jo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Rc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const v=d[p],_=c[p];v!==0&&(Uh.fromBufferAttribute(_,t),h?Rc.addScaledVector(Uh,v):Rc.addScaledVector(Uh.sub(i),v))}i.add(Rc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Ec.copy(s.boundingSphere),Ec.applyMatrix4(c),Ms.copy(t.ray).recast(t.near),!(Ec.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(Ec,o_)===null||Ms.origin.distanceToSquared(o_)>(t.far-t.near)**2))&&(r_.copy(c).invert(),Ms.copy(t.ray).applyMatrix4(r_),!(s.boundingBox!==null&&Ms.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Ms)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,d=c.index,p=c.attributes.position,m=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,x=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,b=x.length;E<b;E++){const M=x[E],g=h[M.materialIndex],N=Math.max(M.start,S.start),L=Math.min(d.count,Math.min(M.start+M.count,S.start+S.count));for(let w=N,V=L;w<V;w+=3){const F=d.getX(w),z=d.getX(w+1),j=d.getX(w+2);l=wc(this,g,t,s,m,v,_,F,z,j),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),b=Math.min(d.count,S.start+S.count);for(let M=E,g=b;M<g;M+=3){const N=d.getX(M),L=d.getX(M+1),w=d.getX(M+2);l=wc(this,h,t,s,m,v,_,N,L,w),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(h))for(let E=0,b=x.length;E<b;E++){const M=x[E],g=h[M.materialIndex],N=Math.max(M.start,S.start),L=Math.min(p.count,Math.min(M.start+M.count,S.start+S.count));for(let w=N,V=L;w<V;w+=3){const F=w,z=w+1,j=w+2;l=wc(this,g,t,s,m,v,_,F,z,j),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),b=Math.min(p.count,S.start+S.count);for(let M=E,g=b;M<g;M+=3){const N=M,L=M+1,w=M+2;l=wc(this,h,t,s,m,v,_,N,L,w),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function rS(r,t,i,s,l,c,h,d){let p;if(t.side===Xn?p=s.intersectTriangle(h,c,l,!0,d):p=s.intersectTriangle(l,c,h,t.side===ma,d),p===null)return null;Cc.copy(d),Cc.applyMatrix4(r.matrixWorld);const m=i.ray.origin.distanceTo(Cc);return m<i.near||m>i.far?null:{distance:m,point:Cc.clone(),object:r}}function wc(r,t,i,s,l,c,h,d,p,m){r.getVertexPosition(d,bc),r.getVertexPosition(p,Tc),r.getVertexPosition(m,Ac);const v=rS(r,t,i,s,bc,Tc,Ac,l_);if(v){const _=new tt;Li.getBarycoord(l_,bc,Tc,Ac,_),l&&(v.uv=Li.getInterpolatedAttribute(l,d,p,m,_,new de)),c&&(v.uv1=Li.getInterpolatedAttribute(c,d,p,m,_,new de)),h&&(v.normal=Li.getInterpolatedAttribute(h,d,p,m,_,new tt),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const x={a:d,b:p,c:m,normal:new tt,materialIndex:0};Li.getNormal(bc,Tc,Ac,x.normal),v.face=x,v.barycoord=_}return v}class zs extends bn{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const p=[],m=[],v=[],_=[];let x=0,S=0;E("z","y","x",-1,-1,s,i,t,h,c,0),E("z","y","x",1,-1,s,i,-t,h,c,1),E("x","z","y",1,1,t,s,i,l,h,2),E("x","z","y",1,-1,t,s,-i,l,h,3),E("x","y","z",1,-1,t,i,s,l,c,4),E("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(p),this.setAttribute("position",new Fn(m,3)),this.setAttribute("normal",new Fn(v,3)),this.setAttribute("uv",new Fn(_,2));function E(b,M,g,N,L,w,V,F,z,j,D){const C=w/z,H=V/j,ht=w/2,rt=V/2,yt=F/2,ft=z+1,P=j+1;let X=0,q=0;const St=new tt;for(let At=0;At<P;At++){const O=At*H-rt;for(let et=0;et<ft;et++){const Mt=et*C-ht;St[b]=Mt*N,St[M]=O*L,St[g]=yt,m.push(St.x,St.y,St.z),St[b]=0,St[M]=0,St[g]=F>0?1:-1,v.push(St.x,St.y,St.z),_.push(et/z),_.push(1-At/j),X+=1}}for(let At=0;At<j;At++)for(let O=0;O<z;O++){const et=x+O+ft*At,Mt=x+O+ft*(At+1),Z=x+(O+1)+ft*(At+1),pt=x+(O+1)+ft*At;p.push(et,Mt,pt),p.push(Mt,Z,pt),q+=6}d.addGroup(S,q,D),S+=q,x+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Vr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function kn(r){const t={};for(let i=0;i<r.length;i++){const s=Vr(r[i]);for(const l in s)t[l]=s[l]}return t}function oS(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function Mv(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Oe.workingColorSpace}const lS={clone:Vr,merge:kn};var cS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _a extends Xr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cS,this.fragmentShader=uS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Vr(t.uniforms),this.uniformsGroups=oS(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}let Sv=class extends _n{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=ha}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};const ja=new tt,c_=new de,u_=new de;class ui extends Sv{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Ld*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(kc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ld*2*Math.atan(Math.tan(kc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){ja.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ja.x,ja.y).multiplyScalar(-t/ja.z),ja.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ja.x,ja.y).multiplyScalar(-t/ja.z)}getViewSize(t,i){return this.getViewBounds(t,c_,u_),i.subVectors(u_,c_)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(kc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,m=h.fullHeight;c+=h.offsetX*l/p,i-=h.offsetY*s/m,l*=h.width/p,s*=h.height/m}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Rr=-90,Cr=1;class fS extends _n{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ui(Rr,Cr,t,i);l.layers=this.layers,this.add(l);const c=new ui(Rr,Cr,t,i);c.layers=this.layers,this.add(c);const h=new ui(Rr,Cr,t,i);h.layers=this.layers,this.add(h);const d=new ui(Rr,Cr,t,i);d.layers=this.layers,this.add(d);const p=new ui(Rr,Cr,t,i);p.layers=this.layers,this.add(p);const m=new ui(Rr,Cr,t,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,p]=i;for(const m of i)this.remove(m);if(t===ha)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===Yc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of i)this.add(m),m.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,p,m,v]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),S=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const b=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,p),t.setRenderTarget(s,4,l),t.render(i,m),s.texture.generateMipmaps=b,t.setRenderTarget(s,5,l),t.render(i,v),t.setRenderTarget(_,x,S),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class Ev extends Bn{constructor(t,i,s,l,c,h,d,p,m,v){t=t!==void 0?t:[],i=i!==void 0?i:Ir,super(t,i,s,l,c,h,d,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hS extends Us{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Ev(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Fi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new zs(5,5,5),c=new _a({name:"CubemapFromEquirect",uniforms:Vr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Xn,blending:Ka});c.uniforms.tEquirect.value=i;const h=new En(l,c),d=i.minFilter;return i.minFilter===Ds&&(i.minFilter=Fi),new fS(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}class Za extends _n{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dS={type:"move"};class Nh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Za,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Za,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new tt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new tt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Za,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new tt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new tt),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const d=this._targetRay,p=this._grip,m=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(m&&t.hand){h=!0;for(const b of t.hand.values()){const M=i.getJointPose(b,s),g=this._getHandJoint(m,b);M!==null&&(g.matrix.fromArray(M.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=M.radius),g.visible=M!==null}const v=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=v.position.distanceTo(_.position),S=.02,E=.005;m.inputState.pinching&&x>S+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&x<=S-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(dS)))}return d!==null&&(d.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new Za;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}class jd{constructor(t,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(t),this.density=i}clone(){return new jd(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class pS extends _n{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gi,this.environmentIntensity=1,this.environmentRotation=new Gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class mS extends Bn{constructor(t=null,i=1,s=1,l,c,h,d,p,m=Un,v=Un,_,x){super(null,h,d,p,m,v,l,c,_,x),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class f_ extends $e{constructor(t,i,s,l=1){super(t,i,s),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=l}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const wr=new qe,h_=new qe,Dc=[],d_=new Ps,gS=new qe,jo=new En,qo=new kr;class Oh extends En{constructor(t,i,s){super(t,i),this.isInstancedMesh=!0,this.instanceMatrix=new f_(new Float32Array(s*16),16),this.instanceColor=null,this.morphTexture=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let l=0;l<s;l++)this.setMatrixAt(l,gS)}computeBoundingBox(){const t=this.geometry,i=this.count;this.boundingBox===null&&(this.boundingBox=new Ps),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let s=0;s<i;s++)this.getMatrixAt(s,wr),d_.copy(t.boundingBox).applyMatrix4(wr),this.boundingBox.union(d_)}computeBoundingSphere(){const t=this.geometry,i=this.count;this.boundingSphere===null&&(this.boundingSphere=new kr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let s=0;s<i;s++)this.getMatrixAt(s,wr),qo.copy(t.boundingSphere).applyMatrix4(wr),this.boundingSphere.union(qo)}copy(t,i){return super.copy(t,i),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,i){i.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,i){i.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,i){const s=i.morphTargetInfluences,l=this.morphTexture.source.data.data,c=s.length+1,h=t*c+1;for(let d=0;d<s.length;d++)s[d]=l[h+d]}raycast(t,i){const s=this.matrixWorld,l=this.count;if(jo.geometry=this.geometry,jo.material=this.material,jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qo.copy(this.boundingSphere),qo.applyMatrix4(s),t.ray.intersectsSphere(qo)!==!1))for(let c=0;c<l;c++){this.getMatrixAt(c,wr),h_.multiplyMatrices(s,wr),jo.matrixWorld=h_,jo.raycast(t,Dc);for(let h=0,d=Dc.length;h<d;h++){const p=Dc[h];p.instanceId=c,p.object=this,i.push(p)}Dc.length=0}}setColorAt(t,i){this.instanceColor===null&&(this.instanceColor=new f_(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),i.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,i){i.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,i){const s=i.morphTargetInfluences,l=s.length+1;this.morphTexture===null&&(this.morphTexture=new mS(new Float32Array(l*this.count),l,this.count,Hd,Hi));const c=this.morphTexture.source.data.data;let h=0;for(let m=0;m<s.length;m++)h+=s[m];const d=this.geometry.morphTargetsRelative?1:1-h,p=l*t;c[p]=d,c.set(s,p+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ph=new tt,_S=new tt,vS=new _e;class qa{constructor(t=new tt(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Ph.subVectors(s,i).cross(_S.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(Ph),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||vS.getNormalMatrix(t),l=this.coplanarPoint(Ph).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ss=new kr,Lc=new tt;class qd{constructor(t=new qa,i=new qa,s=new qa,l=new qa,c=new qa,h=new qa){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ha){const s=this.planes,l=t.elements,c=l[0],h=l[1],d=l[2],p=l[3],m=l[4],v=l[5],_=l[6],x=l[7],S=l[8],E=l[9],b=l[10],M=l[11],g=l[12],N=l[13],L=l[14],w=l[15];if(s[0].setComponents(p-c,x-m,M-S,w-g).normalize(),s[1].setComponents(p+c,x+m,M+S,w+g).normalize(),s[2].setComponents(p+h,x+v,M+E,w+N).normalize(),s[3].setComponents(p-h,x-v,M-E,w-N).normalize(),s[4].setComponents(p-d,x-_,M-b,w-L).normalize(),i===ha)s[5].setComponents(p+d,x+_,M+b,w+L).normalize();else if(i===Yc)s[5].setComponents(d,_,b,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ss.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ss)}intersectsSprite(t){return Ss.center.set(0,0,0),Ss.radius=.7071067811865476,Ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ss)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Lc.x=l.normal.x>0?t.max.x:t.min.x,Lc.y=l.normal.y>0?t.max.y:t.min.y,Lc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Lc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $a extends Xr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const p_=new qe,Ud=new Wd,Uc=new kr,Nc=new tt;class da extends _n{constructor(t=new bn,i=new $a){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Uc.copy(s.boundingSphere),Uc.applyMatrix4(l),Uc.radius+=c,t.ray.intersectsSphere(Uc)===!1)return;p_.copy(l).invert(),Ud.copy(t.ray).applyMatrix4(p_);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=d*d,m=s.index,_=s.attributes.position;if(m!==null){const x=Math.max(0,h.start),S=Math.min(m.count,h.start+h.count);for(let E=x,b=S;E<b;E++){const M=m.getX(E);Nc.fromBufferAttribute(_,M),m_(Nc,M,p,l,t,i,this)}}else{const x=Math.max(0,h.start),S=Math.min(_.count,h.start+h.count);for(let E=x,b=S;E<b;E++)Nc.fromBufferAttribute(_,E),m_(Nc,E,p,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function m_(r,t,i,s,l,c,h){const d=Ud.distanceSqToPoint(r);if(d<i){const p=new tt;Ud.closestPointToPoint(r,p),p.applyMatrix4(s);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(d),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:h})}}class $o extends Bn{constructor(t,i,s,l,c,h,d,p,m){super(t,i,s,l,c,h,d,p,m),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bv extends Bn{constructor(t,i,s,l,c,h,d,p,m,v=Or){if(v!==Or&&v!==Hr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&v===Or&&(s=Ls),s===void 0&&v===Hr&&(s=Fr),super(null,l,c,h,d,p,v,s,m),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:Un,this.minFilter=p!==void 0?p:Un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xd(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class nl extends bn{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(s),p=Math.floor(l),m=d+1,v=p+1,_=t/d,x=i/p,S=[],E=[],b=[],M=[];for(let g=0;g<v;g++){const N=g*x-h;for(let L=0;L<m;L++){const w=L*_-c;E.push(w,-N,0),b.push(0,0,1),M.push(L/d),M.push(1-g/p)}}for(let g=0;g<p;g++)for(let N=0;N<d;N++){const L=N+m*g,w=N+m*(g+1),V=N+1+m*(g+1),F=N+1+m*g;S.push(L,w,F),S.push(w,V,F)}this.setIndex(S),this.setAttribute("position",new Fn(E,3)),this.setAttribute("normal",new Fn(b,3)),this.setAttribute("uv",new Fn(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nl(t.width,t.height,t.widthSegments,t.heightSegments)}}class Yd extends bn{constructor(t=.5,i=1,s=32,l=1,c=0,h=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:c,thetaLength:h},s=Math.max(3,s),l=Math.max(1,l);const d=[],p=[],m=[],v=[];let _=t;const x=(i-t)/l,S=new tt,E=new de;for(let b=0;b<=l;b++){for(let M=0;M<=s;M++){const g=c+M/s*h;S.x=_*Math.cos(g),S.y=_*Math.sin(g),p.push(S.x,S.y,S.z),m.push(0,0,1),E.x=(S.x/i+1)/2,E.y=(S.y/i+1)/2,v.push(E.x,E.y)}_+=x}for(let b=0;b<l;b++){const M=b*(s+1);for(let g=0;g<s;g++){const N=g+M,L=N,w=N+s+1,V=N+s+2,F=N+1;d.push(L,w,F),d.push(w,V,F)}}this.setIndex(d),this.setAttribute("position",new Fn(p,3)),this.setAttribute("normal",new Fn(m,3)),this.setAttribute("uv",new Fn(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yd(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Zd extends bn{constructor(t=1,i=32,s=16,l=0,c=Math.PI*2,h=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:h,thetaLength:d},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const p=Math.min(h+d,Math.PI);let m=0;const v=[],_=new tt,x=new tt,S=[],E=[],b=[],M=[];for(let g=0;g<=s;g++){const N=[],L=g/s;let w=0;g===0&&h===0?w=.5/i:g===s&&p===Math.PI&&(w=-.5/i);for(let V=0;V<=i;V++){const F=V/i;_.x=-t*Math.cos(l+F*c)*Math.sin(h+L*d),_.y=t*Math.cos(h+L*d),_.z=t*Math.sin(l+F*c)*Math.sin(h+L*d),E.push(_.x,_.y,_.z),x.copy(_).normalize(),b.push(x.x,x.y,x.z),M.push(F+w,1-L),N.push(m++)}v.push(N)}for(let g=0;g<s;g++)for(let N=0;N<i;N++){const L=v[g][N+1],w=v[g][N],V=v[g+1][N],F=v[g+1][N+1];(g!==0||h>0)&&S.push(L,w,F),(g!==s-1||p<Math.PI)&&S.push(w,V,F)}this.setIndex(S),this.setAttribute("position",new Fn(E,3)),this.setAttribute("normal",new Fn(b,3)),this.setAttribute("uv",new Fn(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zd(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xc extends Xr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dv,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yS extends Xr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=CM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xS extends Xr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qc extends _n{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class MS extends Qc{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_n.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}}const zh=new qe,g_=new tt,__=new tt;class Tv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qd,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new We(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;g_.setFromMatrixPosition(t.matrixWorld),i.position.copy(g_),__.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(__),i.updateMatrixWorld(),zh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zh),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(zh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const v_=new qe,Yo=new tt,Ih=new tt;class SS extends Tv{constructor(){super(new ui(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new We(2,1,1,1),new We(0,1,1,1),new We(3,1,1,1),new We(1,1,1,1),new We(3,0,1,1),new We(1,0,1,1)],this._cubeDirections=[new tt(1,0,0),new tt(-1,0,0),new tt(0,0,1),new tt(0,0,-1),new tt(0,1,0),new tt(0,-1,0)],this._cubeUps=[new tt(0,1,0),new tt(0,1,0),new tt(0,1,0),new tt(0,1,0),new tt(0,0,1),new tt(0,0,-1)]}updateMatrices(t,i=0){const s=this.camera,l=this.matrix,c=t.distance||s.far;c!==s.far&&(s.far=c,s.updateProjectionMatrix()),Yo.setFromMatrixPosition(t.matrixWorld),s.position.copy(Yo),Ih.copy(s.position),Ih.add(this._cubeDirections[i]),s.up.copy(this._cubeUps[i]),s.lookAt(Ih),s.updateMatrixWorld(),l.makeTranslation(-Yo.x,-Yo.y,-Yo.z),v_.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this._frustum.setFromProjectionMatrix(v_)}}class ES extends Qc{constructor(t,i,s=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new SS}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Av extends Sv{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,d=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,h=c+m*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class bS extends Tv{constructor(){super(new Av(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class TS extends Qc{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_n.DEFAULT_UP),this.updateMatrix(),this.target=new _n,this.shadow=new bS}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class AS extends Qc{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}class RS extends ui{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class CS{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=y_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=y_();t=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=t}return t}}function y_(){return performance.now()}class x_{constructor(t=1,i=0,s=0){this.radius=t,this.phi=i,this.theta=s}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ee(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(Ee(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class wS extends Os{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function M_(r,t,i,s){const l=DS(s);switch(i){case ov:return r*t;case cv:return r*t;case uv:return r*t*2;case Hd:return r*t/l.components*l.byteLength;case Gd:return r*t/l.components*l.byteLength;case fv:return r*t*2/l.components*l.byteLength;case Vd:return r*t*2/l.components*l.byteLength;case lv:return r*t*3/l.components*l.byteLength;case Ui:return r*t*4/l.components*l.byteLength;case kd:return r*t*4/l.components*l.byteLength;case Bc:case Fc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Hc:case Gc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case rd:case ld:return Math.max(r,16)*Math.max(t,8)/4;case sd:case od:return Math.max(r,8)*Math.max(t,8)/2;case cd:case ud:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case fd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case hd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case dd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case pd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case md:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case gd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case _d:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case vd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case yd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case xd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Md:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Ed:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case bd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Td:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Vc:case Ad:case Rd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case hv:case Cd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case wd:case Dd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function DS(r){switch(r){case ga:case av:return{byteLength:1,components:1};case Qo:case sv:case tl:return{byteLength:2,components:1};case Bd:case Fd:return{byteLength:2,components:4};case Ls:case Id:case Hi:return{byteLength:4,components:1};case rv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Rv(){let r=null,t=!1,i=null,s=null;function l(c,h){i(c,h),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function LS(r){const t=new WeakMap;function i(d,p){const m=d.array,v=d.usage,_=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,v),d.onUploadCallback();let S;if(m instanceof Float32Array)S=r.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=r.SHORT;else if(m instanceof Uint32Array)S=r.UNSIGNED_INT;else if(m instanceof Int32Array)S=r.INT;else if(m instanceof Int8Array)S=r.BYTE;else if(m instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,p,m){const v=p.array,_=p.updateRanges;if(r.bindBuffer(m,d),_.length===0)r.bufferSubData(m,0,v);else{_.sort((S,E)=>S.start-E.start);let x=0;for(let S=1;S<_.length;S++){const E=_[x],b=_[S];b.start<=E.start+E.count+1?E.count=Math.max(E.count,b.start+b.count-E.start):(++x,_[x]=b)}_.length=x+1;for(let S=0,E=_.length;S<E;S++){const b=_[S];r.bufferSubData(m,b.start*v.BYTES_PER_ELEMENT,v,b.start,b.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=t.get(d);p&&(r.deleteBuffer(p.buffer),t.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=t.get(d);(!v||v.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=t.get(d);if(m===void 0)t.set(d,i(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,d,p),m.version=d.version}}return{get:l,remove:c,update:h}}var US=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,NS=`#ifdef USE_ALPHAHASH
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
#endif`,OS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,PS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,IS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,BS=`#ifdef USE_AOMAP
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
#endif`,FS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,HS=`#ifdef USE_BATCHING
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
#endif`,GS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,VS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,WS=`#ifdef USE_IRIDESCENCE
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
#endif`,jS=`#ifdef USE_BUMPMAP
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
#endif`,qS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,YS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ZS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,QS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,JS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$S=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,t1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,e1=`#define PI 3.141592653589793
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
} // validated`,n1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,i1=`vec3 transformedNormal = objectNormal;
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
#endif`,a1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,s1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,r1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,l1="gl_FragColor = linearToOutputTexel( gl_FragColor );",c1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u1=`#ifdef USE_ENVMAP
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
#endif`,f1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h1=`#ifdef USE_ENVMAP
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
#endif`,d1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,p1=`#ifdef USE_ENVMAP
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
#endif`,m1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,g1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,v1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,y1=`#ifdef USE_GRADIENTMAP
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
}`,x1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,E1=`uniform bool receiveShadow;
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
#endif`,b1=`#ifdef USE_ENVMAP
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
#endif`,T1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,R1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,w1=`PhysicalMaterial material;
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
#endif`,D1=`struct PhysicalMaterial {
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
}`,L1=`
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
#endif`,U1=`#if defined( RE_IndirectDiffuse )
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
#endif`,N1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,P1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,I1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,B1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,F1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,H1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,G1=`#if defined( USE_POINTS_UV )
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
#endif`,V1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,k1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,X1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,W1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q1=`#ifdef USE_MORPHTARGETS
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
#endif`,Y1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,K1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tE=`#ifdef USE_NORMALMAP
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
#endif`,eE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,oE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gE=`float getShadowMask() {
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
}`,_E=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vE=`#ifdef USE_SKINNING
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
#endif`,yE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xE=`#ifdef USE_SKINNING
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
#endif`,ME=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,SE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,EE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bE=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,TE=`#ifdef USE_TRANSMISSION
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
#endif`,AE=`#ifdef USE_TRANSMISSION
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
#endif`,RE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,DE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const LE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,UE=`uniform sampler2D t2D;
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
}`,NE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,PE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IE=`#include <common>
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
}`,BE=`#if DEPTH_PACKING == 3200
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
}`,FE=`#define DISTANCE
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
}`,HE=`#define DISTANCE
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
}`,GE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,VE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kE=`uniform float scale;
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
}`,XE=`uniform vec3 diffuse;
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
}`,WE=`#include <common>
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
}`,jE=`uniform vec3 diffuse;
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
}`,qE=`#define LAMBERT
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
}`,YE=`#define LAMBERT
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
}`,ZE=`#define MATCAP
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
}`,KE=`#define MATCAP
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
}`,QE=`#define NORMAL
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
}`,JE=`#define NORMAL
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
}`,$E=`#define PHONG
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
}`,tb=`#define PHONG
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
}`,eb=`#define STANDARD
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
}`,nb=`#define STANDARD
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
}`,ib=`#define TOON
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
}`,ab=`#define TOON
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
}`,sb=`uniform float size;
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
}`,rb=`uniform vec3 diffuse;
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
}`,ob=`#include <common>
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
}`,lb=`uniform vec3 color;
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
}`,cb=`uniform float rotation;
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
}`,ub=`uniform vec3 diffuse;
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
}`,ye={alphahash_fragment:US,alphahash_pars_fragment:NS,alphamap_fragment:OS,alphamap_pars_fragment:PS,alphatest_fragment:zS,alphatest_pars_fragment:IS,aomap_fragment:BS,aomap_pars_fragment:FS,batching_pars_vertex:HS,batching_vertex:GS,begin_vertex:VS,beginnormal_vertex:kS,bsdfs:XS,iridescence_fragment:WS,bumpmap_pars_fragment:jS,clipping_planes_fragment:qS,clipping_planes_pars_fragment:YS,clipping_planes_pars_vertex:ZS,clipping_planes_vertex:KS,color_fragment:QS,color_pars_fragment:JS,color_pars_vertex:$S,color_vertex:t1,common:e1,cube_uv_reflection_fragment:n1,defaultnormal_vertex:i1,displacementmap_pars_vertex:a1,displacementmap_vertex:s1,emissivemap_fragment:r1,emissivemap_pars_fragment:o1,colorspace_fragment:l1,colorspace_pars_fragment:c1,envmap_fragment:u1,envmap_common_pars_fragment:f1,envmap_pars_fragment:h1,envmap_pars_vertex:d1,envmap_physical_pars_fragment:b1,envmap_vertex:p1,fog_vertex:m1,fog_pars_vertex:g1,fog_fragment:_1,fog_pars_fragment:v1,gradientmap_pars_fragment:y1,lightmap_pars_fragment:x1,lights_lambert_fragment:M1,lights_lambert_pars_fragment:S1,lights_pars_begin:E1,lights_toon_fragment:T1,lights_toon_pars_fragment:A1,lights_phong_fragment:R1,lights_phong_pars_fragment:C1,lights_physical_fragment:w1,lights_physical_pars_fragment:D1,lights_fragment_begin:L1,lights_fragment_maps:U1,lights_fragment_end:N1,logdepthbuf_fragment:O1,logdepthbuf_pars_fragment:P1,logdepthbuf_pars_vertex:z1,logdepthbuf_vertex:I1,map_fragment:B1,map_pars_fragment:F1,map_particle_fragment:H1,map_particle_pars_fragment:G1,metalnessmap_fragment:V1,metalnessmap_pars_fragment:k1,morphinstance_vertex:X1,morphcolor_vertex:W1,morphnormal_vertex:j1,morphtarget_pars_vertex:q1,morphtarget_vertex:Y1,normal_fragment_begin:Z1,normal_fragment_maps:K1,normal_pars_fragment:Q1,normal_pars_vertex:J1,normal_vertex:$1,normalmap_pars_fragment:tE,clearcoat_normal_fragment_begin:eE,clearcoat_normal_fragment_maps:nE,clearcoat_pars_fragment:iE,iridescence_pars_fragment:aE,opaque_fragment:sE,packing:rE,premultiplied_alpha_fragment:oE,project_vertex:lE,dithering_fragment:cE,dithering_pars_fragment:uE,roughnessmap_fragment:fE,roughnessmap_pars_fragment:hE,shadowmap_pars_fragment:dE,shadowmap_pars_vertex:pE,shadowmap_vertex:mE,shadowmask_pars_fragment:gE,skinbase_vertex:_E,skinning_pars_vertex:vE,skinning_vertex:yE,skinnormal_vertex:xE,specularmap_fragment:ME,specularmap_pars_fragment:SE,tonemapping_fragment:EE,tonemapping_pars_fragment:bE,transmission_fragment:TE,transmission_pars_fragment:AE,uv_pars_fragment:RE,uv_pars_vertex:CE,uv_vertex:wE,worldpos_vertex:DE,background_vert:LE,background_frag:UE,backgroundCube_vert:NE,backgroundCube_frag:OE,cube_vert:PE,cube_frag:zE,depth_vert:IE,depth_frag:BE,distanceRGBA_vert:FE,distanceRGBA_frag:HE,equirect_vert:GE,equirect_frag:VE,linedashed_vert:kE,linedashed_frag:XE,meshbasic_vert:WE,meshbasic_frag:jE,meshlambert_vert:qE,meshlambert_frag:YE,meshmatcap_vert:ZE,meshmatcap_frag:KE,meshnormal_vert:QE,meshnormal_frag:JE,meshphong_vert:$E,meshphong_frag:tb,meshphysical_vert:eb,meshphysical_frag:nb,meshtoon_vert:ib,meshtoon_frag:ab,points_vert:sb,points_frag:rb,shadow_vert:ob,shadow_frag:lb,sprite_vert:cb,sprite_frag:ub},Bt={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _e},alphaMap:{value:null},alphaMapTransform:{value:new _e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _e}},envmap:{envMap:{value:null},envMapRotation:{value:new _e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _e},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _e},alphaTest:{value:0},uvTransform:{value:new _e}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _e},alphaMap:{value:null},alphaMapTransform:{value:new _e},alphaTest:{value:0}}},Bi={basic:{uniforms:kn([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.fog]),vertexShader:ye.meshbasic_vert,fragmentShader:ye.meshbasic_frag},lambert:{uniforms:kn([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new xe(0)}}]),vertexShader:ye.meshlambert_vert,fragmentShader:ye.meshlambert_frag},phong:{uniforms:kn([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:ye.meshphong_vert,fragmentShader:ye.meshphong_frag},standard:{uniforms:kn([Bt.common,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.roughnessmap,Bt.metalnessmap,Bt.fog,Bt.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag},toon:{uniforms:kn([Bt.common,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.gradientmap,Bt.fog,Bt.lights,{emissive:{value:new xe(0)}}]),vertexShader:ye.meshtoon_vert,fragmentShader:ye.meshtoon_frag},matcap:{uniforms:kn([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,{matcap:{value:null}}]),vertexShader:ye.meshmatcap_vert,fragmentShader:ye.meshmatcap_frag},points:{uniforms:kn([Bt.points,Bt.fog]),vertexShader:ye.points_vert,fragmentShader:ye.points_frag},dashed:{uniforms:kn([Bt.common,Bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ye.linedashed_vert,fragmentShader:ye.linedashed_frag},depth:{uniforms:kn([Bt.common,Bt.displacementmap]),vertexShader:ye.depth_vert,fragmentShader:ye.depth_frag},normal:{uniforms:kn([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,{opacity:{value:1}}]),vertexShader:ye.meshnormal_vert,fragmentShader:ye.meshnormal_frag},sprite:{uniforms:kn([Bt.sprite,Bt.fog]),vertexShader:ye.sprite_vert,fragmentShader:ye.sprite_frag},background:{uniforms:{uvTransform:{value:new _e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ye.background_vert,fragmentShader:ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _e}},vertexShader:ye.backgroundCube_vert,fragmentShader:ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ye.cube_vert,fragmentShader:ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ye.equirect_vert,fragmentShader:ye.equirect_frag},distanceRGBA:{uniforms:kn([Bt.common,Bt.displacementmap,{referencePosition:{value:new tt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ye.distanceRGBA_vert,fragmentShader:ye.distanceRGBA_frag},shadow:{uniforms:kn([Bt.lights,Bt.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:ye.shadow_vert,fragmentShader:ye.shadow_frag}};Bi.physical={uniforms:kn([Bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _e},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _e},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _e},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _e},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _e},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _e}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag};const Oc={r:0,b:0,g:0},Es=new Gi,fb=new qe;function hb(r,t,i,s,l,c,h){const d=new xe(0);let p=c===!0?0:1,m,v,_=null,x=0,S=null;function E(L){let w=L.isScene===!0?L.background:null;return w&&w.isTexture&&(w=(L.backgroundBlurriness>0?i:t).get(w)),w}function b(L){let w=!1;const V=E(L);V===null?g(d,p):V&&V.isColor&&(g(V,1),w=!0);const F=r.xr.getEnvironmentBlendMode();F==="additive"?s.buffers.color.setClear(0,0,0,1,h):F==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(r.autoClear||w)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function M(L,w){const V=E(w);V&&(V.isCubeTexture||V.mapping===Kc)?(v===void 0&&(v=new En(new zs(1,1,1),new _a({name:"BackgroundCubeMaterial",uniforms:Vr(Bi.backgroundCube.uniforms),vertexShader:Bi.backgroundCube.vertexShader,fragmentShader:Bi.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(F,z,j){this.matrixWorld.copyPosition(j.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Es.copy(w.backgroundRotation),Es.x*=-1,Es.y*=-1,Es.z*=-1,V.isCubeTexture&&V.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),v.material.uniforms.envMap.value=V,v.material.uniforms.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(fb.makeRotationFromEuler(Es)),v.material.toneMapped=Oe.getTransfer(V.colorSpace)!==ke,(_!==V||x!==V.version||S!==r.toneMapping)&&(v.material.needsUpdate=!0,_=V,x=V.version,S=r.toneMapping),v.layers.enableAll(),L.unshift(v,v.geometry,v.material,0,0,null)):V&&V.isTexture&&(m===void 0&&(m=new En(new nl(2,2),new _a({name:"BackgroundMaterial",uniforms:Vr(Bi.background.uniforms),vertexShader:Bi.background.vertexShader,fragmentShader:Bi.background.fragmentShader,side:ma,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=V,m.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,m.material.toneMapped=Oe.getTransfer(V.colorSpace)!==ke,V.matrixAutoUpdate===!0&&V.updateMatrix(),m.material.uniforms.uvTransform.value.copy(V.matrix),(_!==V||x!==V.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,_=V,x=V.version,S=r.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function g(L,w){L.getRGB(Oc,Mv(r)),s.buffers.color.setClear(Oc.r,Oc.g,Oc.b,w,h)}function N(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(L,w=1){d.set(L),p=w,g(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(L){p=L,g(d,p)},render:b,addToRenderList:M,dispose:N}}function db(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,h=!1;function d(C,H,ht,rt,yt){let ft=!1;const P=_(rt,ht,H);c!==P&&(c=P,m(c.object)),ft=S(C,rt,ht,yt),ft&&E(C,rt,ht,yt),yt!==null&&t.update(yt,r.ELEMENT_ARRAY_BUFFER),(ft||h)&&(h=!1,w(C,H,ht,rt),yt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(yt).buffer))}function p(){return r.createVertexArray()}function m(C){return r.bindVertexArray(C)}function v(C){return r.deleteVertexArray(C)}function _(C,H,ht){const rt=ht.wireframe===!0;let yt=s[C.id];yt===void 0&&(yt={},s[C.id]=yt);let ft=yt[H.id];ft===void 0&&(ft={},yt[H.id]=ft);let P=ft[rt];return P===void 0&&(P=x(p()),ft[rt]=P),P}function x(C){const H=[],ht=[],rt=[];for(let yt=0;yt<i;yt++)H[yt]=0,ht[yt]=0,rt[yt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:ht,attributeDivisors:rt,object:C,attributes:{},index:null}}function S(C,H,ht,rt){const yt=c.attributes,ft=H.attributes;let P=0;const X=ht.getAttributes();for(const q in X)if(X[q].location>=0){const At=yt[q];let O=ft[q];if(O===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(O=C.instanceColor)),At===void 0||At.attribute!==O||O&&At.data!==O.data)return!0;P++}return c.attributesNum!==P||c.index!==rt}function E(C,H,ht,rt){const yt={},ft=H.attributes;let P=0;const X=ht.getAttributes();for(const q in X)if(X[q].location>=0){let At=ft[q];At===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(At=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(At=C.instanceColor));const O={};O.attribute=At,At&&At.data&&(O.data=At.data),yt[q]=O,P++}c.attributes=yt,c.attributesNum=P,c.index=rt}function b(){const C=c.newAttributes;for(let H=0,ht=C.length;H<ht;H++)C[H]=0}function M(C){g(C,0)}function g(C,H){const ht=c.newAttributes,rt=c.enabledAttributes,yt=c.attributeDivisors;ht[C]=1,rt[C]===0&&(r.enableVertexAttribArray(C),rt[C]=1),yt[C]!==H&&(r.vertexAttribDivisor(C,H),yt[C]=H)}function N(){const C=c.newAttributes,H=c.enabledAttributes;for(let ht=0,rt=H.length;ht<rt;ht++)H[ht]!==C[ht]&&(r.disableVertexAttribArray(ht),H[ht]=0)}function L(C,H,ht,rt,yt,ft,P){P===!0?r.vertexAttribIPointer(C,H,ht,yt,ft):r.vertexAttribPointer(C,H,ht,rt,yt,ft)}function w(C,H,ht,rt){b();const yt=rt.attributes,ft=ht.getAttributes(),P=H.defaultAttributeValues;for(const X in ft){const q=ft[X];if(q.location>=0){let St=yt[X];if(St===void 0&&(X==="instanceMatrix"&&C.instanceMatrix&&(St=C.instanceMatrix),X==="instanceColor"&&C.instanceColor&&(St=C.instanceColor)),St!==void 0){const At=St.normalized,O=St.itemSize,et=t.get(St);if(et===void 0)continue;const Mt=et.buffer,Z=et.type,pt=et.bytesPerElement,k=Z===r.INT||Z===r.UNSIGNED_INT||St.gpuType===Id;if(St.isInterleavedBufferAttribute){const G=St.data,ot=G.stride,st=St.offset;if(G.isInstancedInterleavedBuffer){for(let Rt=0;Rt<q.locationSize;Rt++)g(q.location+Rt,G.meshPerAttribute);C.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Rt=0;Rt<q.locationSize;Rt++)M(q.location+Rt);r.bindBuffer(r.ARRAY_BUFFER,Mt);for(let Rt=0;Rt<q.locationSize;Rt++)L(q.location+Rt,O/q.locationSize,Z,At,ot*pt,(st+O/q.locationSize*Rt)*pt,k)}else{if(St.isInstancedBufferAttribute){for(let G=0;G<q.locationSize;G++)g(q.location+G,St.meshPerAttribute);C.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let G=0;G<q.locationSize;G++)M(q.location+G);r.bindBuffer(r.ARRAY_BUFFER,Mt);for(let G=0;G<q.locationSize;G++)L(q.location+G,O/q.locationSize,Z,At,O*pt,O/q.locationSize*G*pt,k)}}else if(P!==void 0){const At=P[X];if(At!==void 0)switch(At.length){case 2:r.vertexAttrib2fv(q.location,At);break;case 3:r.vertexAttrib3fv(q.location,At);break;case 4:r.vertexAttrib4fv(q.location,At);break;default:r.vertexAttrib1fv(q.location,At)}}}}N()}function V(){j();for(const C in s){const H=s[C];for(const ht in H){const rt=H[ht];for(const yt in rt)v(rt[yt].object),delete rt[yt];delete H[ht]}delete s[C]}}function F(C){if(s[C.id]===void 0)return;const H=s[C.id];for(const ht in H){const rt=H[ht];for(const yt in rt)v(rt[yt].object),delete rt[yt];delete H[ht]}delete s[C.id]}function z(C){for(const H in s){const ht=s[H];if(ht[C.id]===void 0)continue;const rt=ht[C.id];for(const yt in rt)v(rt[yt].object),delete rt[yt];delete ht[C.id]}}function j(){D(),h=!0,c!==l&&(c=l,m(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:j,resetDefaultState:D,dispose:V,releaseStatesOfGeometry:F,releaseStatesOfProgram:z,initAttributes:b,enableAttribute:M,disableUnusedAttributes:N}}function pb(r,t,i){let s;function l(m){s=m}function c(m,v){r.drawArrays(s,m,v),i.update(v,s,1)}function h(m,v,_){_!==0&&(r.drawArraysInstanced(s,m,v,_),i.update(v,s,_))}function d(m,v,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,v,0,_);let S=0;for(let E=0;E<_;E++)S+=v[E];i.update(S,s,1)}function p(m,v,_,x){if(_===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<m.length;E++)h(m[E],v[E],x[E]);else{S.multiDrawArraysInstancedWEBGL(s,m,0,v,0,x,0,_);let E=0;for(let b=0;b<_;b++)E+=v[b]*x[b];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function mb(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const z=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(z){return!(z!==Ui&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(z){const j=z===tl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(z!==ga&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Hi&&!j)}function p(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const v=p(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const _=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),L=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),V=E>0,F=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:E,maxTextureSize:b,maxCubemapSize:M,maxAttributes:g,maxVertexUniforms:N,maxVaryings:L,maxFragmentUniforms:w,vertexTextures:V,maxSamples:F}}function gb(r){const t=this;let i=null,s=0,l=!1,c=!1;const h=new qa,d=new _e,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const S=_.length!==0||x||s!==0||l;return l=x,s=_.length,S},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){i=v(_,x,0)},this.setState=function(_,x,S){const E=_.clippingPlanes,b=_.clipIntersection,M=_.clipShadows,g=r.get(_);if(!l||E===null||E.length===0||c&&!M)c?v(null):m();else{const N=c?0:s,L=N*4;let w=g.clippingState||null;p.value=w,w=v(E,x,L,S);for(let V=0;V!==L;++V)w[V]=i[V];g.clippingState=w,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=N}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function v(_,x,S,E){const b=_!==null?_.length:0;let M=null;if(b!==0){if(M=p.value,E!==!0||M===null){const g=S+b*4,N=x.matrixWorldInverse;d.getNormalMatrix(N),(M===null||M.length<g)&&(M=new Float32Array(g));for(let L=0,w=S;L!==b;++L,w+=4)h.copy(_[L]).applyMatrix4(N,d),h.normal.toArray(M,w),M[w+3]=h.constant}p.value=M,p.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,M}}function _b(r){let t=new WeakMap;function i(h,d){return d===ed?h.mapping=Ir:d===nd&&(h.mapping=Br),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===ed||d===nd)if(t.has(h)){const p=t.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const m=new hS(p.height);return m.fromEquirectangularTexture(r,h),t.set(h,m),h.addEventListener("dispose",l),i(m.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Ur=4,S_=[.125,.215,.35,.446,.526,.582],Cs=20,Bh=new Av,E_=new xe;let Fh=null,Hh=0,Gh=0,Vh=!1;const As=(1+Math.sqrt(5))/2,Dr=1/As,b_=[new tt(-As,Dr,0),new tt(As,Dr,0),new tt(-Dr,0,As),new tt(Dr,0,As),new tt(0,As,-Dr),new tt(0,As,Dr),new tt(-1,1,-1),new tt(1,1,-1),new tt(-1,1,1),new tt(1,1,1)],vb=new tt;class T_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100,c={}){const{size:h=256,position:d=vb}=c;Fh=this._renderer.getRenderTarget(),Hh=this._renderer.getActiveCubeFace(),Gh=this._renderer.getActiveMipmapLevel(),Vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(t,s,l,p,d),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=C_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=R_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fh,Hh,Gh),this._renderer.xr.enabled=Vh,t.scissorTest=!1,Pc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Ir||t.mapping===Br?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fh=this._renderer.getRenderTarget(),Hh=this._renderer.getActiveCubeFace(),Gh=this._renderer.getActiveMipmapLevel(),Vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Fi,minFilter:Fi,generateMipmaps:!1,type:tl,format:Ui,colorSpace:Gr,depthBuffer:!1},l=A_(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=A_(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yb(c)),this._blurMaterial=xb(c,t,i)}return l}_compileMaterial(t){const i=new En(this._lodPlanes[0],t);this._renderer.compile(i,Bh)}_sceneToCubeUV(t,i,s,l,c){const p=new ui(90,1,i,s),m=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,x=_.autoClear,S=_.toneMapping;_.getClearColor(E_),_.toneMapping=Ja,_.autoClear=!1;const E=new Jo({name:"PMREM.Background",side:Xn,depthWrite:!1,depthTest:!1}),b=new En(new zs,E);let M=!1;const g=t.background;g?g.isColor&&(E.color.copy(g),t.background=null,M=!0):(E.color.copy(E_),M=!0);for(let N=0;N<6;N++){const L=N%3;L===0?(p.up.set(0,m[N],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x+v[N],c.y,c.z)):L===1?(p.up.set(0,0,m[N]),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y+v[N],c.z)):(p.up.set(0,m[N],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y,c.z+v[N]));const w=this._cubeSize;Pc(l,L*w,N>2?w:0,w,w),_.setRenderTarget(l),M&&_.render(b,p),_.render(t,p)}b.geometry.dispose(),b.material.dispose(),_.toneMapping=S,_.autoClear=x,t.background=g}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Ir||t.mapping===Br;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=C_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=R_());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new En(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const p=this._cubeSize;Pc(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(h,Bh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=b_[(l-c-1)%b_.length];this._blur(t,c-1,c,h,d)}i.autoClear=s}_blur(t,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",c),this._halfBlur(h,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,h,d){const p=this._renderer,m=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,_=new En(this._lodPlanes[l],m),x=m.uniforms,S=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Cs-1),b=c/E,M=isFinite(c)?1+Math.floor(v*b):Cs;M>Cs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${Cs}`);const g=[];let N=0;for(let z=0;z<Cs;++z){const j=z/b,D=Math.exp(-j*j/2);g.push(D),z===0?N+=D:z<M&&(N+=2*D)}for(let z=0;z<g.length;z++)g[z]=g[z]/N;x.envMap.value=t.texture,x.samples.value=M,x.weights.value=g,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:L}=this;x.dTheta.value=E,x.mipInt.value=L-s;const w=this._sizeLods[l],V=3*w*(l>L-Ur?l-L+Ur:0),F=4*(this._cubeSize-w);Pc(i,V,F,3*w,2*w),p.setRenderTarget(i),p.render(_,Bh)}}function yb(r){const t=[],i=[],s=[];let l=r;const c=r-Ur+1+S_.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let p=1/d;h>r-Ur?p=S_[h-r+Ur-1]:h===0&&(p=0),s.push(p);const m=1/(d-2),v=-m,_=1+m,x=[v,v,_,v,_,_,v,v,_,_,v,_],S=6,E=6,b=3,M=2,g=1,N=new Float32Array(b*E*S),L=new Float32Array(M*E*S),w=new Float32Array(g*E*S);for(let F=0;F<S;F++){const z=F%3*2/3-1,j=F>2?0:-1,D=[z,j,0,z+2/3,j,0,z+2/3,j+1,0,z,j,0,z+2/3,j+1,0,z,j+1,0];N.set(D,b*E*F),L.set(x,M*E*F);const C=[F,F,F,F,F,F];w.set(C,g*E*F)}const V=new bn;V.setAttribute("position",new $e(N,b)),V.setAttribute("uv",new $e(L,M)),V.setAttribute("faceIndex",new $e(w,g)),t.push(V),l>Ur&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function A_(r,t,i){const s=new Us(r,t,i);return s.texture.mapping=Kc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Pc(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function xb(r,t,i){const s=new Float32Array(Cs),l=new tt(0,1,0);return new _a({name:"SphericalGaussianBlur",defines:{n:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Kd(),fragmentShader:`

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
		`,blending:Ka,depthTest:!1,depthWrite:!1})}function R_(){return new _a({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kd(),fragmentShader:`

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
		`,blending:Ka,depthTest:!1,depthWrite:!1})}function C_(){return new _a({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ka,depthTest:!1,depthWrite:!1})}function Kd(){return`

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
	`}function Mb(r){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const p=d.mapping,m=p===ed||p===nd,v=p===Ir||p===Br;if(m||v){let _=t.get(d);const x=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new T_(r)),_=m?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const S=d.image;return m&&S&&S.height>0||v&&S&&l(S)?(i===null&&(i=new T_(r)),_=m?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let p=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&p++;return p===m}function c(d){const p=d.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function Sb(r){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Ts("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function Eb(r,t,i,s){const l={},c=new WeakMap;function h(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const E in x.attributes)t.remove(x.attributes[E]);x.removeEventListener("dispose",h),delete l[x.id];const S=c.get(x);S&&(t.remove(S),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(_,x){return l[x.id]===!0||(x.addEventListener("dispose",h),l[x.id]=!0,i.memory.geometries++),x}function p(_){const x=_.attributes;for(const S in x)t.update(x[S],r.ARRAY_BUFFER)}function m(_){const x=[],S=_.index,E=_.attributes.position;let b=0;if(S!==null){const N=S.array;b=S.version;for(let L=0,w=N.length;L<w;L+=3){const V=N[L+0],F=N[L+1],z=N[L+2];x.push(V,F,F,z,z,V)}}else if(E!==void 0){const N=E.array;b=E.version;for(let L=0,w=N.length/3-1;L<w;L+=3){const V=L+0,F=L+1,z=L+2;x.push(V,F,F,z,z,V)}}else return;const M=new(mv(x)?xv:yv)(x,1);M.version=b;const g=c.get(_);g&&t.remove(g),c.set(_,M)}function v(_){const x=c.get(_);if(x){const S=_.index;S!==null&&x.version<S.version&&m(_)}else m(_);return c.get(_)}return{get:d,update:p,getWireframeAttribute:v}}function bb(r,t,i){let s;function l(x){s=x}let c,h;function d(x){c=x.type,h=x.bytesPerElement}function p(x,S){r.drawElements(s,S,c,x*h),i.update(S,s,1)}function m(x,S,E){E!==0&&(r.drawElementsInstanced(s,S,c,x*h,E),i.update(S,s,E))}function v(x,S,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,x,0,E);let M=0;for(let g=0;g<E;g++)M+=S[g];i.update(M,s,1)}function _(x,S,E,b){if(E===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let g=0;g<x.length;g++)m(x[g]/h,S[g],b[g]);else{M.multiDrawElementsInstancedWEBGL(s,S,0,c,x,0,b,0,E);let g=0;for(let N=0;N<E;N++)g+=S[N]*b[N];i.update(g,s,1)}}this.setMode=l,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=_}function Tb(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case r.TRIANGLES:i.triangles+=d*(c/3);break;case r.LINES:i.lines+=d*(c/2);break;case r.LINE_STRIP:i.lines+=d*(c-1);break;case r.LINE_LOOP:i.lines+=d*c;break;case r.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Ab(r,t,i){const s=new WeakMap,l=new We;function c(h,d,p){const m=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=v!==void 0?v.length:0;let x=s.get(d);if(x===void 0||x.count!==_){let C=function(){j.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var S=C;x!==void 0&&x.texture.dispose();const E=d.morphAttributes.position!==void 0,b=d.morphAttributes.normal!==void 0,M=d.morphAttributes.color!==void 0,g=d.morphAttributes.position||[],N=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let w=0;E===!0&&(w=1),b===!0&&(w=2),M===!0&&(w=3);let V=d.attributes.position.count*w,F=1;V>t.maxTextureSize&&(F=Math.ceil(V/t.maxTextureSize),V=t.maxTextureSize);const z=new Float32Array(V*F*4*_),j=new gv(z,V,F,_);j.type=Hi,j.needsUpdate=!0;const D=w*4;for(let H=0;H<_;H++){const ht=g[H],rt=N[H],yt=L[H],ft=V*F*4*H;for(let P=0;P<ht.count;P++){const X=P*D;E===!0&&(l.fromBufferAttribute(ht,P),z[ft+X+0]=l.x,z[ft+X+1]=l.y,z[ft+X+2]=l.z,z[ft+X+3]=0),b===!0&&(l.fromBufferAttribute(rt,P),z[ft+X+4]=l.x,z[ft+X+5]=l.y,z[ft+X+6]=l.z,z[ft+X+7]=0),M===!0&&(l.fromBufferAttribute(yt,P),z[ft+X+8]=l.x,z[ft+X+9]=l.y,z[ft+X+10]=l.z,z[ft+X+11]=yt.itemSize===4?l.w:1)}}x={count:_,texture:j,size:new de(V,F)},s.set(d,x),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",h.morphTexture,i);else{let E=0;for(let M=0;M<m.length;M++)E+=m[M];const b=d.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",b),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function Rb(r,t,i,s){let l=new WeakMap;function c(p){const m=s.render.frame,v=p.geometry,_=t.get(p,v);if(l.get(_)!==m&&(t.update(_),l.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),l.get(p)!==m&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return _}function h(){l=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:c,dispose:h}}const Cv=new Bn,w_=new bv(1,1),wv=new gv,Dv=new ZM,Lv=new Ev,D_=[],L_=[],U_=new Float32Array(16),N_=new Float32Array(9),O_=new Float32Array(4);function Wr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=D_[l];if(c===void 0&&(c=new Float32Array(l),D_[l]=c),t!==0){s.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,r[h].toArray(c,d)}return c}function vn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function yn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function Jc(r,t){let i=L_[t];i===void 0&&(i=new Int32Array(t),L_[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function Cb(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function wb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(vn(i,t))return;r.uniform2fv(this.addr,t),yn(i,t)}}function Db(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(vn(i,t))return;r.uniform3fv(this.addr,t),yn(i,t)}}function Lb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(vn(i,t))return;r.uniform4fv(this.addr,t),yn(i,t)}}function Ub(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(vn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),yn(i,t)}else{if(vn(i,s))return;O_.set(s),r.uniformMatrix2fv(this.addr,!1,O_),yn(i,s)}}function Nb(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(vn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),yn(i,t)}else{if(vn(i,s))return;N_.set(s),r.uniformMatrix3fv(this.addr,!1,N_),yn(i,s)}}function Ob(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(vn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),yn(i,t)}else{if(vn(i,s))return;U_.set(s),r.uniformMatrix4fv(this.addr,!1,U_),yn(i,s)}}function Pb(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function zb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(vn(i,t))return;r.uniform2iv(this.addr,t),yn(i,t)}}function Ib(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(vn(i,t))return;r.uniform3iv(this.addr,t),yn(i,t)}}function Bb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(vn(i,t))return;r.uniform4iv(this.addr,t),yn(i,t)}}function Fb(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function Hb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(vn(i,t))return;r.uniform2uiv(this.addr,t),yn(i,t)}}function Gb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(vn(i,t))return;r.uniform3uiv(this.addr,t),yn(i,t)}}function Vb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(vn(i,t))return;r.uniform4uiv(this.addr,t),yn(i,t)}}function kb(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(w_.compareFunction=pv,c=w_):c=Cv,i.setTexture2D(t||c,l)}function Xb(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||Dv,l)}function Wb(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||Lv,l)}function jb(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||wv,l)}function qb(r){switch(r){case 5126:return Cb;case 35664:return wb;case 35665:return Db;case 35666:return Lb;case 35674:return Ub;case 35675:return Nb;case 35676:return Ob;case 5124:case 35670:return Pb;case 35667:case 35671:return zb;case 35668:case 35672:return Ib;case 35669:case 35673:return Bb;case 5125:return Fb;case 36294:return Hb;case 36295:return Gb;case 36296:return Vb;case 35678:case 36198:case 36298:case 36306:case 35682:return kb;case 35679:case 36299:case 36307:return Xb;case 35680:case 36300:case 36308:case 36293:return Wb;case 36289:case 36303:case 36311:case 36292:return jb}}function Yb(r,t){r.uniform1fv(this.addr,t)}function Zb(r,t){const i=Wr(t,this.size,2);r.uniform2fv(this.addr,i)}function Kb(r,t){const i=Wr(t,this.size,3);r.uniform3fv(this.addr,i)}function Qb(r,t){const i=Wr(t,this.size,4);r.uniform4fv(this.addr,i)}function Jb(r,t){const i=Wr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function $b(r,t){const i=Wr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function tT(r,t){const i=Wr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function eT(r,t){r.uniform1iv(this.addr,t)}function nT(r,t){r.uniform2iv(this.addr,t)}function iT(r,t){r.uniform3iv(this.addr,t)}function aT(r,t){r.uniform4iv(this.addr,t)}function sT(r,t){r.uniform1uiv(this.addr,t)}function rT(r,t){r.uniform2uiv(this.addr,t)}function oT(r,t){r.uniform3uiv(this.addr,t)}function lT(r,t){r.uniform4uiv(this.addr,t)}function cT(r,t,i){const s=this.cache,l=t.length,c=Jc(i,l);vn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||Cv,c[h])}function uT(r,t,i){const s=this.cache,l=t.length,c=Jc(i,l);vn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||Dv,c[h])}function fT(r,t,i){const s=this.cache,l=t.length,c=Jc(i,l);vn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||Lv,c[h])}function hT(r,t,i){const s=this.cache,l=t.length,c=Jc(i,l);vn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||wv,c[h])}function dT(r){switch(r){case 5126:return Yb;case 35664:return Zb;case 35665:return Kb;case 35666:return Qb;case 35674:return Jb;case 35675:return $b;case 35676:return tT;case 5124:case 35670:return eT;case 35667:case 35671:return nT;case 35668:case 35672:return iT;case 35669:case 35673:return aT;case 5125:return sT;case 36294:return rT;case 36295:return oT;case 36296:return lT;case 35678:case 36198:case 36298:case 36306:case 35682:return cT;case 35679:case 36299:case 36307:return uT;case 35680:case 36300:case 36308:case 36293:return fT;case 36289:case 36303:case 36311:case 36292:return hT}}class pT{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=qb(i.type)}}class mT{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=dT(i.type)}}class gT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const kh=/(\w+)(\])?(\[|\.)?/g;function P_(r,t){r.seq.push(t),r.map[t.id]=t}function _T(r,t,i){const s=r.name,l=s.length;for(kh.lastIndex=0;;){const c=kh.exec(s),h=kh.lastIndex;let d=c[1];const p=c[2]==="]",m=c[3];if(p&&(d=d|0),m===void 0||m==="["&&h+2===l){P_(i,m===void 0?new pT(d,r,t):new mT(d,r,t));break}else{let _=i.map[d];_===void 0&&(_=new gT(d),P_(i,_)),i=_}}}class Wc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),h=t.getUniformLocation(i,c.name);_T(c,h,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],p=s[d.id];p.needsUpdate!==!1&&d.setValue(t,p.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function z_(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const vT=37297;let yT=0;function xT(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const I_=new _e;function MT(r){Oe._getMatrix(I_,Oe.workingColorSpace,r);const t=`mat3( ${I_.elements.map(i=>i.toFixed(4))} )`;switch(Oe.getTransfer(r)){case qc:return[t,"LinearTransferOETF"];case ke:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function B_(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const h=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+xT(r.getShaderSource(t),h)}else return l}function ST(r,t){const i=MT(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function ET(r,t){let i;switch(t){case MM:i="Linear";break;case SM:i="Reinhard";break;case EM:i="Cineon";break;case nv:i="ACESFilmic";break;case TM:i="AgX";break;case AM:i="Neutral";break;case bM:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const zc=new tt;function bT(){Oe.getLuminanceCoefficients(zc);const r=zc.x.toFixed(4),t=zc.y.toFixed(4),i=zc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TT(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zo).join(`
`)}function AT(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function RT(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),h=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:r.getAttribLocation(t,h),locationSize:d}}return i}function Zo(r){return r!==""}function F_(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function H_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const CT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nd(r){return r.replace(CT,DT)}const wT=new Map;function DT(r,t){let i=ye[t];if(i===void 0){const s=wT.get(t);if(s!==void 0)i=ye[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Nd(i)}const LT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function G_(r){return r.replace(LT,UT)}function UT(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function V_(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function NT(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===$_?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===tv?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===fa&&(t="SHADOWMAP_TYPE_VSM"),t}function OT(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ir:case Br:t="ENVMAP_TYPE_CUBE";break;case Kc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function PT(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Br:t="ENVMAP_MODE_REFRACTION";break}return t}function zT(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ev:t="ENVMAP_BLENDING_MULTIPLY";break;case yM:t="ENVMAP_BLENDING_MIX";break;case xM:t="ENVMAP_BLENDING_ADD";break}return t}function IT(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function BT(r,t,i,s){const l=r.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=NT(i),m=OT(i),v=PT(i),_=zT(i),x=IT(i),S=TT(i),E=AT(c),b=l.createProgram();let M,g,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Zo).join(`
`),M.length>0&&(M+=`
`),g=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Zo).join(`
`),g.length>0&&(g+=`
`)):(M=[V_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zo).join(`
`),g=[V_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+v:"",i.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ja?"#define TONE_MAPPING":"",i.toneMapping!==Ja?ye.tonemapping_pars_fragment:"",i.toneMapping!==Ja?ET("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ye.colorspace_pars_fragment,ST("linearToOutputTexel",i.outputColorSpace),bT(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Zo).join(`
`)),h=Nd(h),h=F_(h,i),h=H_(h,i),d=Nd(d),d=F_(d,i),d=H_(d,i),h=G_(h),d=G_(d),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,M=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,g=["#define varying in",i.glslVersion===q0?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===q0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const L=N+M+h,w=N+g+d,V=z_(l,l.VERTEX_SHADER,L),F=z_(l,l.FRAGMENT_SHADER,w);l.attachShader(b,V),l.attachShader(b,F),i.index0AttributeName!==void 0?l.bindAttribLocation(b,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(b,0,"position"),l.linkProgram(b);function z(H){if(r.debug.checkShaderErrors){const ht=l.getProgramInfoLog(b).trim(),rt=l.getShaderInfoLog(V).trim(),yt=l.getShaderInfoLog(F).trim();let ft=!0,P=!0;if(l.getProgramParameter(b,l.LINK_STATUS)===!1)if(ft=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,b,V,F);else{const X=B_(l,V,"vertex"),q=B_(l,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(b,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+ht+`
`+X+`
`+q)}else ht!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ht):(rt===""||yt==="")&&(P=!1);P&&(H.diagnostics={runnable:ft,programLog:ht,vertexShader:{log:rt,prefix:M},fragmentShader:{log:yt,prefix:g}})}l.deleteShader(V),l.deleteShader(F),j=new Wc(l,b),D=RT(l,b)}let j;this.getUniforms=function(){return j===void 0&&z(this),j};let D;this.getAttributes=function(){return D===void 0&&z(this),D};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(b,vT)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(b),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=yT++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=V,this.fragmentShader=F,this}let FT=0;class HT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new GT(t),i.set(t,s)),s}}class GT{constructor(t){this.id=FT++,this.code=t,this.usedTimes=0}}function VT(r,t,i,s,l,c,h){const d=new _v,p=new HT,m=new Set,v=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let S=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(D){return m.add(D),D===0?"uv":`uv${D}`}function M(D,C,H,ht,rt){const yt=ht.fog,ft=rt.geometry,P=D.isMeshStandardMaterial?ht.environment:null,X=(D.isMeshStandardMaterial?i:t).get(D.envMap||P),q=X&&X.mapping===Kc?X.image.height:null,St=E[D.type];D.precision!==null&&(S=l.getMaxPrecision(D.precision),S!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",S,"instead."));const At=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,O=At!==void 0?At.length:0;let et=0;ft.morphAttributes.position!==void 0&&(et=1),ft.morphAttributes.normal!==void 0&&(et=2),ft.morphAttributes.color!==void 0&&(et=3);let Mt,Z,pt,k;if(St){const De=Bi[St];Mt=De.vertexShader,Z=De.fragmentShader}else Mt=D.vertexShader,Z=D.fragmentShader,p.update(D),pt=p.getVertexShaderID(D),k=p.getFragmentShaderID(D);const G=r.getRenderTarget(),ot=r.state.buffers.depth.getReversed(),st=rt.isInstancedMesh===!0,Rt=rt.isBatchedMesh===!0,$t=!!D.map,Kt=!!D.matcap,ie=!!X,I=!!D.aoMap,pe=!!D.lightMap,Qt=!!D.bumpMap,re=!!D.normalMap,Ft=!!D.displacementMap,Yt=!!D.emissiveMap,Nt=!!D.metalnessMap,U=!!D.roughnessMap,T=D.anisotropy>0,nt=D.clearcoat>0,mt=D.dispersion>0,bt=D.iridescence>0,_t=D.sheen>0,Wt=D.transmission>0,Lt=T&&!!D.anisotropyMap,Xt=nt&&!!D.clearcoatMap,ve=nt&&!!D.clearcoatNormalMap,wt=nt&&!!D.clearcoatRoughnessMap,kt=bt&&!!D.iridescenceMap,Jt=bt&&!!D.iridescenceThicknessMap,qt=_t&&!!D.sheenColorMap,Ht=_t&&!!D.sheenRoughnessMap,ae=!!D.specularMap,he=!!D.specularColorMap,Be=!!D.specularIntensityMap,Q=Wt&&!!D.transmissionMap,Ot=Wt&&!!D.thicknessMap,gt=!!D.gradientMap,Tt=!!D.alphaMap,Pt=D.alphaTest>0,zt=!!D.alphaHash,oe=!!D.extensions;let Qe=Ja;D.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Qe=r.toneMapping);const hn={shaderID:St,shaderType:D.type,shaderName:D.name,vertexShader:Mt,fragmentShader:Z,defines:D.defines,customVertexShaderID:pt,customFragmentShaderID:k,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:S,batching:Rt,batchingColor:Rt&&rt._colorsTexture!==null,instancing:st,instancingColor:st&&rt.instanceColor!==null,instancingMorph:st&&rt.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:G===null?r.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Gr,alphaToCoverage:!!D.alphaToCoverage,map:$t,matcap:Kt,envMap:ie,envMapMode:ie&&X.mapping,envMapCubeUVHeight:q,aoMap:I,lightMap:pe,bumpMap:Qt,normalMap:re,displacementMap:x&&Ft,emissiveMap:Yt,normalMapObjectSpace:re&&D.normalMapType===DM,normalMapTangentSpace:re&&D.normalMapType===dv,metalnessMap:Nt,roughnessMap:U,anisotropy:T,anisotropyMap:Lt,clearcoat:nt,clearcoatMap:Xt,clearcoatNormalMap:ve,clearcoatRoughnessMap:wt,dispersion:mt,iridescence:bt,iridescenceMap:kt,iridescenceThicknessMap:Jt,sheen:_t,sheenColorMap:qt,sheenRoughnessMap:Ht,specularMap:ae,specularColorMap:he,specularIntensityMap:Be,transmission:Wt,transmissionMap:Q,thicknessMap:Ot,gradientMap:gt,opaque:D.transparent===!1&&D.blending===Qa&&D.alphaToCoverage===!1,alphaMap:Tt,alphaTest:Pt,alphaHash:zt,combine:D.combine,mapUv:$t&&b(D.map.channel),aoMapUv:I&&b(D.aoMap.channel),lightMapUv:pe&&b(D.lightMap.channel),bumpMapUv:Qt&&b(D.bumpMap.channel),normalMapUv:re&&b(D.normalMap.channel),displacementMapUv:Ft&&b(D.displacementMap.channel),emissiveMapUv:Yt&&b(D.emissiveMap.channel),metalnessMapUv:Nt&&b(D.metalnessMap.channel),roughnessMapUv:U&&b(D.roughnessMap.channel),anisotropyMapUv:Lt&&b(D.anisotropyMap.channel),clearcoatMapUv:Xt&&b(D.clearcoatMap.channel),clearcoatNormalMapUv:ve&&b(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&b(D.clearcoatRoughnessMap.channel),iridescenceMapUv:kt&&b(D.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&b(D.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&b(D.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&b(D.sheenRoughnessMap.channel),specularMapUv:ae&&b(D.specularMap.channel),specularColorMapUv:he&&b(D.specularColorMap.channel),specularIntensityMapUv:Be&&b(D.specularIntensityMap.channel),transmissionMapUv:Q&&b(D.transmissionMap.channel),thicknessMapUv:Ot&&b(D.thicknessMap.channel),alphaMapUv:Tt&&b(D.alphaMap.channel),vertexTangents:!!ft.attributes.tangent&&(re||T),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,pointsUvs:rt.isPoints===!0&&!!ft.attributes.uv&&($t||Tt),fog:!!yt,useFog:D.fog===!0,fogExp2:!!yt&&yt.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:ot,skinning:rt.isSkinnedMesh===!0,morphTargets:ft.morphAttributes.position!==void 0,morphNormals:ft.morphAttributes.normal!==void 0,morphColors:ft.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:et,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qe,decodeVideoTexture:$t&&D.map.isVideoTexture===!0&&Oe.getTransfer(D.map.colorSpace)===ke,decodeVideoTextureEmissive:Yt&&D.emissiveMap.isVideoTexture===!0&&Oe.getTransfer(D.emissiveMap.colorSpace)===ke,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Mi,flipSided:D.side===Xn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:oe&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&D.extensions.multiDraw===!0||Rt)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return hn.vertexUv1s=m.has(1),hn.vertexUv2s=m.has(2),hn.vertexUv3s=m.has(3),m.clear(),hn}function g(D){const C=[];if(D.shaderID?C.push(D.shaderID):(C.push(D.customVertexShaderID),C.push(D.customFragmentShaderID)),D.defines!==void 0)for(const H in D.defines)C.push(H),C.push(D.defines[H]);return D.isRawShaderMaterial===!1&&(N(C,D),L(C,D),C.push(r.outputColorSpace)),C.push(D.customProgramCacheKey),C.join()}function N(D,C){D.push(C.precision),D.push(C.outputColorSpace),D.push(C.envMapMode),D.push(C.envMapCubeUVHeight),D.push(C.mapUv),D.push(C.alphaMapUv),D.push(C.lightMapUv),D.push(C.aoMapUv),D.push(C.bumpMapUv),D.push(C.normalMapUv),D.push(C.displacementMapUv),D.push(C.emissiveMapUv),D.push(C.metalnessMapUv),D.push(C.roughnessMapUv),D.push(C.anisotropyMapUv),D.push(C.clearcoatMapUv),D.push(C.clearcoatNormalMapUv),D.push(C.clearcoatRoughnessMapUv),D.push(C.iridescenceMapUv),D.push(C.iridescenceThicknessMapUv),D.push(C.sheenColorMapUv),D.push(C.sheenRoughnessMapUv),D.push(C.specularMapUv),D.push(C.specularColorMapUv),D.push(C.specularIntensityMapUv),D.push(C.transmissionMapUv),D.push(C.thicknessMapUv),D.push(C.combine),D.push(C.fogExp2),D.push(C.sizeAttenuation),D.push(C.morphTargetsCount),D.push(C.morphAttributeCount),D.push(C.numDirLights),D.push(C.numPointLights),D.push(C.numSpotLights),D.push(C.numSpotLightMaps),D.push(C.numHemiLights),D.push(C.numRectAreaLights),D.push(C.numDirLightShadows),D.push(C.numPointLightShadows),D.push(C.numSpotLightShadows),D.push(C.numSpotLightShadowsWithMaps),D.push(C.numLightProbes),D.push(C.shadowMapType),D.push(C.toneMapping),D.push(C.numClippingPlanes),D.push(C.numClipIntersection),D.push(C.depthPacking)}function L(D,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),D.push(d.mask)}function w(D){const C=E[D.type];let H;if(C){const ht=Bi[C];H=lS.clone(ht.uniforms)}else H=D.uniforms;return H}function V(D,C){let H;for(let ht=0,rt=v.length;ht<rt;ht++){const yt=v[ht];if(yt.cacheKey===C){H=yt,++H.usedTimes;break}}return H===void 0&&(H=new BT(r,C,D,c),v.push(H)),H}function F(D){if(--D.usedTimes===0){const C=v.indexOf(D);v[C]=v[v.length-1],v.pop(),D.destroy()}}function z(D){p.remove(D)}function j(){p.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:w,acquireProgram:V,releaseProgram:F,releaseShaderCache:z,programs:v,dispose:j}}function kT(){let r=new WeakMap;function t(h){return r.has(h)}function i(h){let d=r.get(h);return d===void 0&&(d={},r.set(h,d)),d}function s(h){r.delete(h)}function l(h,d,p){r.get(h)[d]=p}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function XT(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function k_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function X_(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(_,x,S,E,b,M){let g=r[t];return g===void 0?(g={id:_.id,object:_,geometry:x,material:S,groupOrder:E,renderOrder:_.renderOrder,z:b,group:M},r[t]=g):(g.id=_.id,g.object=_,g.geometry=x,g.material=S,g.groupOrder=E,g.renderOrder=_.renderOrder,g.z=b,g.group=M),t++,g}function d(_,x,S,E,b,M){const g=h(_,x,S,E,b,M);S.transmission>0?s.push(g):S.transparent===!0?l.push(g):i.push(g)}function p(_,x,S,E,b,M){const g=h(_,x,S,E,b,M);S.transmission>0?s.unshift(g):S.transparent===!0?l.unshift(g):i.unshift(g)}function m(_,x){i.length>1&&i.sort(_||XT),s.length>1&&s.sort(x||k_),l.length>1&&l.sort(x||k_)}function v(){for(let _=t,x=r.length;_<x;_++){const S=r[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:p,finish:v,sort:m}}function WT(){let r=new WeakMap;function t(s,l){const c=r.get(s);let h;return c===void 0?(h=new X_,r.set(s,[h])):l>=c.length?(h=new X_,c.push(h)):h=c[l],h}function i(){r=new WeakMap}return{get:t,dispose:i}}function jT(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new tt,color:new xe};break;case"SpotLight":i={position:new tt,direction:new tt,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new tt,color:new xe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new tt,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":i={color:new xe,position:new tt,halfWidth:new tt,halfHeight:new tt};break}return r[t.id]=i,i}}}function qT(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let YT=0;function ZT(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function KT(r){const t=new jT,i=qT(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new tt);const l=new tt,c=new qe,h=new qe;function d(m){let v=0,_=0,x=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let S=0,E=0,b=0,M=0,g=0,N=0,L=0,w=0,V=0,F=0,z=0;m.sort(ZT);for(let D=0,C=m.length;D<C;D++){const H=m[D],ht=H.color,rt=H.intensity,yt=H.distance,ft=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)v+=ht.r*rt,_+=ht.g*rt,x+=ht.b*rt;else if(H.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(H.sh.coefficients[P],rt);z++}else if(H.isDirectionalLight){const P=t.get(H);if(P.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const X=H.shadow,q=i.get(H);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize=X.mapSize,s.directionalShadow[S]=q,s.directionalShadowMap[S]=ft,s.directionalShadowMatrix[S]=H.shadow.matrix,N++}s.directional[S]=P,S++}else if(H.isSpotLight){const P=t.get(H);P.position.setFromMatrixPosition(H.matrixWorld),P.color.copy(ht).multiplyScalar(rt),P.distance=yt,P.coneCos=Math.cos(H.angle),P.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),P.decay=H.decay,s.spot[b]=P;const X=H.shadow;if(H.map&&(s.spotLightMap[V]=H.map,V++,X.updateMatrices(H),H.castShadow&&F++),s.spotLightMatrix[b]=X.matrix,H.castShadow){const q=i.get(H);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize=X.mapSize,s.spotShadow[b]=q,s.spotShadowMap[b]=ft,w++}b++}else if(H.isRectAreaLight){const P=t.get(H);P.color.copy(ht).multiplyScalar(rt),P.halfWidth.set(H.width*.5,0,0),P.halfHeight.set(0,H.height*.5,0),s.rectArea[M]=P,M++}else if(H.isPointLight){const P=t.get(H);if(P.color.copy(H.color).multiplyScalar(H.intensity),P.distance=H.distance,P.decay=H.decay,H.castShadow){const X=H.shadow,q=i.get(H);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize=X.mapSize,q.shadowCameraNear=X.camera.near,q.shadowCameraFar=X.camera.far,s.pointShadow[E]=q,s.pointShadowMap[E]=ft,s.pointShadowMatrix[E]=H.shadow.matrix,L++}s.point[E]=P,E++}else if(H.isHemisphereLight){const P=t.get(H);P.skyColor.copy(H.color).multiplyScalar(rt),P.groundColor.copy(H.groundColor).multiplyScalar(rt),s.hemi[g]=P,g++}}M>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Bt.LTC_FLOAT_1,s.rectAreaLTC2=Bt.LTC_FLOAT_2):(s.rectAreaLTC1=Bt.LTC_HALF_1,s.rectAreaLTC2=Bt.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=_,s.ambient[2]=x;const j=s.hash;(j.directionalLength!==S||j.pointLength!==E||j.spotLength!==b||j.rectAreaLength!==M||j.hemiLength!==g||j.numDirectionalShadows!==N||j.numPointShadows!==L||j.numSpotShadows!==w||j.numSpotMaps!==V||j.numLightProbes!==z)&&(s.directional.length=S,s.spot.length=b,s.rectArea.length=M,s.point.length=E,s.hemi.length=g,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=w+V-F,s.spotLightMap.length=V,s.numSpotLightShadowsWithMaps=F,s.numLightProbes=z,j.directionalLength=S,j.pointLength=E,j.spotLength=b,j.rectAreaLength=M,j.hemiLength=g,j.numDirectionalShadows=N,j.numPointShadows=L,j.numSpotShadows=w,j.numSpotMaps=V,j.numLightProbes=z,s.version=YT++)}function p(m,v){let _=0,x=0,S=0,E=0,b=0;const M=v.matrixWorldInverse;for(let g=0,N=m.length;g<N;g++){const L=m[g];if(L.isDirectionalLight){const w=s.directional[_];w.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(M),_++}else if(L.isSpotLight){const w=s.spot[S];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(M),w.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(M),S++}else if(L.isRectAreaLight){const w=s.rectArea[E];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(M),h.identity(),c.copy(L.matrixWorld),c.premultiply(M),h.extractRotation(c),w.halfWidth.set(L.width*.5,0,0),w.halfHeight.set(0,L.height*.5,0),w.halfWidth.applyMatrix4(h),w.halfHeight.applyMatrix4(h),E++}else if(L.isPointLight){const w=s.point[x];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(M),x++}else if(L.isHemisphereLight){const w=s.hemi[b];w.direction.setFromMatrixPosition(L.matrixWorld),w.direction.transformDirection(M),b++}}}return{setup:d,setupView:p,state:s}}function W_(r){const t=new KT(r),i=[],s=[];function l(v){m.camera=v,i.length=0,s.length=0}function c(v){i.push(v)}function h(v){s.push(v)}function d(){t.setup(i)}function p(v){t.setupView(i,v)}const m={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:d,setupLightsView:p,pushLight:c,pushShadow:h}}function QT(r){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new W_(r),t.set(l,[d])):c>=h.length?(d=new W_(r),h.push(d)):d=h[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const JT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$T=`uniform sampler2D shadow_pass;
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
}`;function tA(r,t,i){let s=new qd;const l=new de,c=new de,h=new We,d=new yS({depthPacking:wM}),p=new xS,m={},v=i.maxTextureSize,_={[ma]:Xn,[Xn]:ma,[Mi]:Mi},x=new _a({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:JT,fragmentShader:$T}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const E=new bn;E.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new En(E,x),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$_;let g=this.type;this.render=function(F,z,j){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||F.length===0)return;const D=r.getRenderTarget(),C=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),ht=r.state;ht.setBlending(Ka),ht.buffers.color.setClear(1,1,1,1),ht.buffers.depth.setTest(!0),ht.setScissorTest(!1);const rt=g!==fa&&this.type===fa,yt=g===fa&&this.type!==fa;for(let ft=0,P=F.length;ft<P;ft++){const X=F[ft],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;l.copy(q.mapSize);const St=q.getFrameExtents();if(l.multiply(St),c.copy(q.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/St.x),l.x=c.x*St.x,q.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/St.y),l.y=c.y*St.y,q.mapSize.y=c.y)),q.map===null||rt===!0||yt===!0){const O=this.type!==fa?{minFilter:Un,magFilter:Un}:{};q.map!==null&&q.map.dispose(),q.map=new Us(l.x,l.y,O),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const At=q.getViewportCount();for(let O=0;O<At;O++){const et=q.getViewport(O);h.set(c.x*et.x,c.y*et.y,c.x*et.z,c.y*et.w),ht.viewport(h),q.updateMatrices(X,O),s=q.getFrustum(),w(z,j,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===fa&&N(q,j),q.needsUpdate=!1}g=this.type,M.needsUpdate=!1,r.setRenderTarget(D,C,H)};function N(F,z){const j=t.update(b);x.defines.VSM_SAMPLES!==F.blurSamples&&(x.defines.VSM_SAMPLES=F.blurSamples,S.defines.VSM_SAMPLES=F.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new Us(l.x,l.y)),x.uniforms.shadow_pass.value=F.map.texture,x.uniforms.resolution.value=F.mapSize,x.uniforms.radius.value=F.radius,r.setRenderTarget(F.mapPass),r.clear(),r.renderBufferDirect(z,null,j,x,b,null),S.uniforms.shadow_pass.value=F.mapPass.texture,S.uniforms.resolution.value=F.mapSize,S.uniforms.radius.value=F.radius,r.setRenderTarget(F.map),r.clear(),r.renderBufferDirect(z,null,j,S,b,null)}function L(F,z,j,D){let C=null;const H=j.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(H!==void 0)C=H;else if(C=j.isPointLight===!0?p:d,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0){const ht=C.uuid,rt=z.uuid;let yt=m[ht];yt===void 0&&(yt={},m[ht]=yt);let ft=yt[rt];ft===void 0&&(ft=C.clone(),yt[rt]=ft,z.addEventListener("dispose",V)),C=ft}if(C.visible=z.visible,C.wireframe=z.wireframe,D===fa?C.side=z.shadowSide!==null?z.shadowSide:z.side:C.side=z.shadowSide!==null?z.shadowSide:_[z.side],C.alphaMap=z.alphaMap,C.alphaTest=z.alphaTest,C.map=z.map,C.clipShadows=z.clipShadows,C.clippingPlanes=z.clippingPlanes,C.clipIntersection=z.clipIntersection,C.displacementMap=z.displacementMap,C.displacementScale=z.displacementScale,C.displacementBias=z.displacementBias,C.wireframeLinewidth=z.wireframeLinewidth,C.linewidth=z.linewidth,j.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const ht=r.properties.get(C);ht.light=j}return C}function w(F,z,j,D,C){if(F.visible===!1)return;if(F.layers.test(z.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&C===fa)&&(!F.frustumCulled||s.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,F.matrixWorld);const rt=t.update(F),yt=F.material;if(Array.isArray(yt)){const ft=rt.groups;for(let P=0,X=ft.length;P<X;P++){const q=ft[P],St=yt[q.materialIndex];if(St&&St.visible){const At=L(F,St,D,C);F.onBeforeShadow(r,F,z,j,rt,At,q),r.renderBufferDirect(j,null,rt,At,F,q),F.onAfterShadow(r,F,z,j,rt,At,q)}}}else if(yt.visible){const ft=L(F,yt,D,C);F.onBeforeShadow(r,F,z,j,rt,ft,null),r.renderBufferDirect(j,null,rt,ft,F,null),F.onAfterShadow(r,F,z,j,rt,ft,null)}}const ht=F.children;for(let rt=0,yt=ht.length;rt<yt;rt++)w(ht[rt],z,j,D,C)}function V(F){F.target.removeEventListener("dispose",V);for(const j in m){const D=m[j],C=F.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}}const eA={[Yh]:Zh,[Kh]:$h,[Qh]:td,[zr]:Jh,[Zh]:Yh,[$h]:Kh,[td]:Qh,[Jh]:zr};function nA(r,t){function i(){let Q=!1;const Ot=new We;let gt=null;const Tt=new We(0,0,0,0);return{setMask:function(Pt){gt!==Pt&&!Q&&(r.colorMask(Pt,Pt,Pt,Pt),gt=Pt)},setLocked:function(Pt){Q=Pt},setClear:function(Pt,zt,oe,Qe,hn){hn===!0&&(Pt*=Qe,zt*=Qe,oe*=Qe),Ot.set(Pt,zt,oe,Qe),Tt.equals(Ot)===!1&&(r.clearColor(Pt,zt,oe,Qe),Tt.copy(Ot))},reset:function(){Q=!1,gt=null,Tt.set(-1,0,0,0)}}}function s(){let Q=!1,Ot=!1,gt=null,Tt=null,Pt=null;return{setReversed:function(zt){if(Ot!==zt){const oe=t.get("EXT_clip_control");Ot?oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.ZERO_TO_ONE_EXT):oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.NEGATIVE_ONE_TO_ONE_EXT);const Qe=Pt;Pt=null,this.setClear(Qe)}Ot=zt},getReversed:function(){return Ot},setTest:function(zt){zt?G(r.DEPTH_TEST):ot(r.DEPTH_TEST)},setMask:function(zt){gt!==zt&&!Q&&(r.depthMask(zt),gt=zt)},setFunc:function(zt){if(Ot&&(zt=eA[zt]),Tt!==zt){switch(zt){case Yh:r.depthFunc(r.NEVER);break;case Zh:r.depthFunc(r.ALWAYS);break;case Kh:r.depthFunc(r.LESS);break;case zr:r.depthFunc(r.LEQUAL);break;case Qh:r.depthFunc(r.EQUAL);break;case Jh:r.depthFunc(r.GEQUAL);break;case $h:r.depthFunc(r.GREATER);break;case td:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Tt=zt}},setLocked:function(zt){Q=zt},setClear:function(zt){Pt!==zt&&(Ot&&(zt=1-zt),r.clearDepth(zt),Pt=zt)},reset:function(){Q=!1,gt=null,Tt=null,Pt=null,Ot=!1}}}function l(){let Q=!1,Ot=null,gt=null,Tt=null,Pt=null,zt=null,oe=null,Qe=null,hn=null;return{setTest:function(De){Q||(De?G(r.STENCIL_TEST):ot(r.STENCIL_TEST))},setMask:function(De){Ot!==De&&!Q&&(r.stencilMask(De),Ot=De)},setFunc:function(De,Tn,Si){(gt!==De||Tt!==Tn||Pt!==Si)&&(r.stencilFunc(De,Tn,Si),gt=De,Tt=Tn,Pt=Si)},setOp:function(De,Tn,Si){(zt!==De||oe!==Tn||Qe!==Si)&&(r.stencilOp(De,Tn,Si),zt=De,oe=Tn,Qe=Si)},setLocked:function(De){Q=De},setClear:function(De){hn!==De&&(r.clearStencil(De),hn=De)},reset:function(){Q=!1,Ot=null,gt=null,Tt=null,Pt=null,zt=null,oe=null,Qe=null,hn=null}}}const c=new i,h=new s,d=new l,p=new WeakMap,m=new WeakMap;let v={},_={},x=new WeakMap,S=[],E=null,b=!1,M=null,g=null,N=null,L=null,w=null,V=null,F=null,z=new xe(0,0,0),j=0,D=!1,C=null,H=null,ht=null,rt=null,yt=null;const ft=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,X=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(q)[1]),P=X>=1):q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),P=X>=2);let St=null,At={};const O=r.getParameter(r.SCISSOR_BOX),et=r.getParameter(r.VIEWPORT),Mt=new We().fromArray(O),Z=new We().fromArray(et);function pt(Q,Ot,gt,Tt){const Pt=new Uint8Array(4),zt=r.createTexture();r.bindTexture(Q,zt),r.texParameteri(Q,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Q,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let oe=0;oe<gt;oe++)Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?r.texImage3D(Ot,0,r.RGBA,1,1,Tt,0,r.RGBA,r.UNSIGNED_BYTE,Pt):r.texImage2D(Ot+oe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Pt);return zt}const k={};k[r.TEXTURE_2D]=pt(r.TEXTURE_2D,r.TEXTURE_2D,1),k[r.TEXTURE_CUBE_MAP]=pt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[r.TEXTURE_2D_ARRAY]=pt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),k[r.TEXTURE_3D]=pt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),G(r.DEPTH_TEST),h.setFunc(zr),Qt(!1),re(V0),G(r.CULL_FACE),I(Ka);function G(Q){v[Q]!==!0&&(r.enable(Q),v[Q]=!0)}function ot(Q){v[Q]!==!1&&(r.disable(Q),v[Q]=!1)}function st(Q,Ot){return _[Q]!==Ot?(r.bindFramebuffer(Q,Ot),_[Q]=Ot,Q===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Ot),Q===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Ot),!0):!1}function Rt(Q,Ot){let gt=S,Tt=!1;if(Q){gt=x.get(Ot),gt===void 0&&(gt=[],x.set(Ot,gt));const Pt=Q.textures;if(gt.length!==Pt.length||gt[0]!==r.COLOR_ATTACHMENT0){for(let zt=0,oe=Pt.length;zt<oe;zt++)gt[zt]=r.COLOR_ATTACHMENT0+zt;gt.length=Pt.length,Tt=!0}}else gt[0]!==r.BACK&&(gt[0]=r.BACK,Tt=!0);Tt&&r.drawBuffers(gt)}function $t(Q){return E!==Q?(r.useProgram(Q),E=Q,!0):!1}const Kt={[Rs]:r.FUNC_ADD,[nM]:r.FUNC_SUBTRACT,[iM]:r.FUNC_REVERSE_SUBTRACT};Kt[aM]=r.MIN,Kt[sM]=r.MAX;const ie={[rM]:r.ZERO,[oM]:r.ONE,[lM]:r.SRC_COLOR,[jh]:r.SRC_ALPHA,[pM]:r.SRC_ALPHA_SATURATE,[hM]:r.DST_COLOR,[uM]:r.DST_ALPHA,[cM]:r.ONE_MINUS_SRC_COLOR,[qh]:r.ONE_MINUS_SRC_ALPHA,[dM]:r.ONE_MINUS_DST_COLOR,[fM]:r.ONE_MINUS_DST_ALPHA,[mM]:r.CONSTANT_COLOR,[gM]:r.ONE_MINUS_CONSTANT_COLOR,[_M]:r.CONSTANT_ALPHA,[vM]:r.ONE_MINUS_CONSTANT_ALPHA};function I(Q,Ot,gt,Tt,Pt,zt,oe,Qe,hn,De){if(Q===Ka){b===!0&&(ot(r.BLEND),b=!1);return}if(b===!1&&(G(r.BLEND),b=!0),Q!==eM){if(Q!==M||De!==D){if((g!==Rs||w!==Rs)&&(r.blendEquation(r.FUNC_ADD),g=Rs,w=Rs),De)switch(Q){case Qa:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ko:r.blendFunc(r.ONE,r.ONE);break;case k0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case X0:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}else switch(Q){case Qa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ko:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case k0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case X0:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}N=null,L=null,V=null,F=null,z.set(0,0,0),j=0,M=Q,D=De}return}Pt=Pt||Ot,zt=zt||gt,oe=oe||Tt,(Ot!==g||Pt!==w)&&(r.blendEquationSeparate(Kt[Ot],Kt[Pt]),g=Ot,w=Pt),(gt!==N||Tt!==L||zt!==V||oe!==F)&&(r.blendFuncSeparate(ie[gt],ie[Tt],ie[zt],ie[oe]),N=gt,L=Tt,V=zt,F=oe),(Qe.equals(z)===!1||hn!==j)&&(r.blendColor(Qe.r,Qe.g,Qe.b,hn),z.copy(Qe),j=hn),M=Q,D=!1}function pe(Q,Ot){Q.side===Mi?ot(r.CULL_FACE):G(r.CULL_FACE);let gt=Q.side===Xn;Ot&&(gt=!gt),Qt(gt),Q.blending===Qa&&Q.transparent===!1?I(Ka):I(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),h.setFunc(Q.depthFunc),h.setTest(Q.depthTest),h.setMask(Q.depthWrite),c.setMask(Q.colorWrite);const Tt=Q.stencilWrite;d.setTest(Tt),Tt&&(d.setMask(Q.stencilWriteMask),d.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),d.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),Yt(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?G(r.SAMPLE_ALPHA_TO_COVERAGE):ot(r.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(Q){C!==Q&&(Q?r.frontFace(r.CW):r.frontFace(r.CCW),C=Q)}function re(Q){Q!==$x?(G(r.CULL_FACE),Q!==H&&(Q===V0?r.cullFace(r.BACK):Q===tM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ot(r.CULL_FACE),H=Q}function Ft(Q){Q!==ht&&(P&&r.lineWidth(Q),ht=Q)}function Yt(Q,Ot,gt){Q?(G(r.POLYGON_OFFSET_FILL),(rt!==Ot||yt!==gt)&&(r.polygonOffset(Ot,gt),rt=Ot,yt=gt)):ot(r.POLYGON_OFFSET_FILL)}function Nt(Q){Q?G(r.SCISSOR_TEST):ot(r.SCISSOR_TEST)}function U(Q){Q===void 0&&(Q=r.TEXTURE0+ft-1),St!==Q&&(r.activeTexture(Q),St=Q)}function T(Q,Ot,gt){gt===void 0&&(St===null?gt=r.TEXTURE0+ft-1:gt=St);let Tt=At[gt];Tt===void 0&&(Tt={type:void 0,texture:void 0},At[gt]=Tt),(Tt.type!==Q||Tt.texture!==Ot)&&(St!==gt&&(r.activeTexture(gt),St=gt),r.bindTexture(Q,Ot||k[Q]),Tt.type=Q,Tt.texture=Ot)}function nt(){const Q=At[St];Q!==void 0&&Q.type!==void 0&&(r.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function mt(){try{r.compressedTexImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function bt(){try{r.compressedTexImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function _t(){try{r.texSubImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Wt(){try{r.texSubImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Lt(){try{r.compressedTexSubImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Xt(){try{r.compressedTexSubImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function ve(){try{r.texStorage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function wt(){try{r.texStorage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function kt(){try{r.texImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Jt(){try{r.texImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function qt(Q){Mt.equals(Q)===!1&&(r.scissor(Q.x,Q.y,Q.z,Q.w),Mt.copy(Q))}function Ht(Q){Z.equals(Q)===!1&&(r.viewport(Q.x,Q.y,Q.z,Q.w),Z.copy(Q))}function ae(Q,Ot){let gt=m.get(Ot);gt===void 0&&(gt=new WeakMap,m.set(Ot,gt));let Tt=gt.get(Q);Tt===void 0&&(Tt=r.getUniformBlockIndex(Ot,Q.name),gt.set(Q,Tt))}function he(Q,Ot){const Tt=m.get(Ot).get(Q);p.get(Ot)!==Tt&&(r.uniformBlockBinding(Ot,Tt,Q.__bindingPointIndex),p.set(Ot,Tt))}function Be(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),h.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),v={},St=null,At={},_={},x=new WeakMap,S=[],E=null,b=!1,M=null,g=null,N=null,L=null,w=null,V=null,F=null,z=new xe(0,0,0),j=0,D=!1,C=null,H=null,ht=null,rt=null,yt=null,Mt.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:G,disable:ot,bindFramebuffer:st,drawBuffers:Rt,useProgram:$t,setBlending:I,setMaterial:pe,setFlipSided:Qt,setCullFace:re,setLineWidth:Ft,setPolygonOffset:Yt,setScissorTest:Nt,activeTexture:U,bindTexture:T,unbindTexture:nt,compressedTexImage2D:mt,compressedTexImage3D:bt,texImage2D:kt,texImage3D:Jt,updateUBOMapping:ae,uniformBlockBinding:he,texStorage2D:ve,texStorage3D:wt,texSubImage2D:_t,texSubImage3D:Wt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:Xt,scissor:qt,viewport:Ht,reset:Be}}function iA(r,t,i,s,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new de,v=new WeakMap;let _;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(U,T){return S?new OffscreenCanvas(U,T):Zc("canvas")}function b(U,T,nt){let mt=1;const bt=Nt(U);if((bt.width>nt||bt.height>nt)&&(mt=nt/Math.max(bt.width,bt.height)),mt<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const _t=Math.floor(mt*bt.width),Wt=Math.floor(mt*bt.height);_===void 0&&(_=E(_t,Wt));const Lt=T?E(_t,Wt):_;return Lt.width=_t,Lt.height=Wt,Lt.getContext("2d").drawImage(U,0,0,_t,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+bt.width+"x"+bt.height+") to ("+_t+"x"+Wt+")."),Lt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+bt.width+"x"+bt.height+")."),U;return U}function M(U){return U.generateMipmaps}function g(U){r.generateMipmap(U)}function N(U){return U.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?r.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function L(U,T,nt,mt,bt=!1){if(U!==null){if(r[U]!==void 0)return r[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let _t=T;if(T===r.RED&&(nt===r.FLOAT&&(_t=r.R32F),nt===r.HALF_FLOAT&&(_t=r.R16F),nt===r.UNSIGNED_BYTE&&(_t=r.R8)),T===r.RED_INTEGER&&(nt===r.UNSIGNED_BYTE&&(_t=r.R8UI),nt===r.UNSIGNED_SHORT&&(_t=r.R16UI),nt===r.UNSIGNED_INT&&(_t=r.R32UI),nt===r.BYTE&&(_t=r.R8I),nt===r.SHORT&&(_t=r.R16I),nt===r.INT&&(_t=r.R32I)),T===r.RG&&(nt===r.FLOAT&&(_t=r.RG32F),nt===r.HALF_FLOAT&&(_t=r.RG16F),nt===r.UNSIGNED_BYTE&&(_t=r.RG8)),T===r.RG_INTEGER&&(nt===r.UNSIGNED_BYTE&&(_t=r.RG8UI),nt===r.UNSIGNED_SHORT&&(_t=r.RG16UI),nt===r.UNSIGNED_INT&&(_t=r.RG32UI),nt===r.BYTE&&(_t=r.RG8I),nt===r.SHORT&&(_t=r.RG16I),nt===r.INT&&(_t=r.RG32I)),T===r.RGB_INTEGER&&(nt===r.UNSIGNED_BYTE&&(_t=r.RGB8UI),nt===r.UNSIGNED_SHORT&&(_t=r.RGB16UI),nt===r.UNSIGNED_INT&&(_t=r.RGB32UI),nt===r.BYTE&&(_t=r.RGB8I),nt===r.SHORT&&(_t=r.RGB16I),nt===r.INT&&(_t=r.RGB32I)),T===r.RGBA_INTEGER&&(nt===r.UNSIGNED_BYTE&&(_t=r.RGBA8UI),nt===r.UNSIGNED_SHORT&&(_t=r.RGBA16UI),nt===r.UNSIGNED_INT&&(_t=r.RGBA32UI),nt===r.BYTE&&(_t=r.RGBA8I),nt===r.SHORT&&(_t=r.RGBA16I),nt===r.INT&&(_t=r.RGBA32I)),T===r.RGB&&nt===r.UNSIGNED_INT_5_9_9_9_REV&&(_t=r.RGB9_E5),T===r.RGBA){const Wt=bt?qc:Oe.getTransfer(mt);nt===r.FLOAT&&(_t=r.RGBA32F),nt===r.HALF_FLOAT&&(_t=r.RGBA16F),nt===r.UNSIGNED_BYTE&&(_t=Wt===ke?r.SRGB8_ALPHA8:r.RGBA8),nt===r.UNSIGNED_SHORT_4_4_4_4&&(_t=r.RGBA4),nt===r.UNSIGNED_SHORT_5_5_5_1&&(_t=r.RGB5_A1)}return(_t===r.R16F||_t===r.R32F||_t===r.RG16F||_t===r.RG32F||_t===r.RGBA16F||_t===r.RGBA32F)&&t.get("EXT_color_buffer_float"),_t}function w(U,T){let nt;return U?T===null||T===Ls||T===Fr?nt=r.DEPTH24_STENCIL8:T===Hi?nt=r.DEPTH32F_STENCIL8:T===Qo&&(nt=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ls||T===Fr?nt=r.DEPTH_COMPONENT24:T===Hi?nt=r.DEPTH_COMPONENT32F:T===Qo&&(nt=r.DEPTH_COMPONENT16),nt}function V(U,T){return M(U)===!0||U.isFramebufferTexture&&U.minFilter!==Un&&U.minFilter!==Fi?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function F(U){const T=U.target;T.removeEventListener("dispose",F),j(T),T.isVideoTexture&&v.delete(T)}function z(U){const T=U.target;T.removeEventListener("dispose",z),C(T)}function j(U){const T=s.get(U);if(T.__webglInit===void 0)return;const nt=U.source,mt=x.get(nt);if(mt){const bt=mt[T.__cacheKey];bt.usedTimes--,bt.usedTimes===0&&D(U),Object.keys(mt).length===0&&x.delete(nt)}s.remove(U)}function D(U){const T=s.get(U);r.deleteTexture(T.__webglTexture);const nt=U.source,mt=x.get(nt);delete mt[T.__cacheKey],h.memory.textures--}function C(U){const T=s.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),s.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let mt=0;mt<6;mt++){if(Array.isArray(T.__webglFramebuffer[mt]))for(let bt=0;bt<T.__webglFramebuffer[mt].length;bt++)r.deleteFramebuffer(T.__webglFramebuffer[mt][bt]);else r.deleteFramebuffer(T.__webglFramebuffer[mt]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[mt])}else{if(Array.isArray(T.__webglFramebuffer))for(let mt=0;mt<T.__webglFramebuffer.length;mt++)r.deleteFramebuffer(T.__webglFramebuffer[mt]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let mt=0;mt<T.__webglColorRenderbuffer.length;mt++)T.__webglColorRenderbuffer[mt]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[mt]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const nt=U.textures;for(let mt=0,bt=nt.length;mt<bt;mt++){const _t=s.get(nt[mt]);_t.__webglTexture&&(r.deleteTexture(_t.__webglTexture),h.memory.textures--),s.remove(nt[mt])}s.remove(U)}let H=0;function ht(){H=0}function rt(){const U=H;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),H+=1,U}function yt(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function ft(U,T){const nt=s.get(U);if(U.isVideoTexture&&Ft(U),U.isRenderTargetTexture===!1&&U.version>0&&nt.__version!==U.version){const mt=U.image;if(mt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(mt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(nt,U,T);return}}i.bindTexture(r.TEXTURE_2D,nt.__webglTexture,r.TEXTURE0+T)}function P(U,T){const nt=s.get(U);if(U.version>0&&nt.__version!==U.version){Z(nt,U,T);return}i.bindTexture(r.TEXTURE_2D_ARRAY,nt.__webglTexture,r.TEXTURE0+T)}function X(U,T){const nt=s.get(U);if(U.version>0&&nt.__version!==U.version){Z(nt,U,T);return}i.bindTexture(r.TEXTURE_3D,nt.__webglTexture,r.TEXTURE0+T)}function q(U,T){const nt=s.get(U);if(U.version>0&&nt.__version!==U.version){pt(nt,U,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,nt.__webglTexture,r.TEXTURE0+T)}const St={[id]:r.REPEAT,[ws]:r.CLAMP_TO_EDGE,[ad]:r.MIRRORED_REPEAT},At={[Un]:r.NEAREST,[RM]:r.NEAREST_MIPMAP_NEAREST,[dc]:r.NEAREST_MIPMAP_LINEAR,[Fi]:r.LINEAR,[hh]:r.LINEAR_MIPMAP_NEAREST,[Ds]:r.LINEAR_MIPMAP_LINEAR},O={[LM]:r.NEVER,[IM]:r.ALWAYS,[UM]:r.LESS,[pv]:r.LEQUAL,[NM]:r.EQUAL,[zM]:r.GEQUAL,[OM]:r.GREATER,[PM]:r.NOTEQUAL};function et(U,T){if(T.type===Hi&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Fi||T.magFilter===hh||T.magFilter===dc||T.magFilter===Ds||T.minFilter===Fi||T.minFilter===hh||T.minFilter===dc||T.minFilter===Ds)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(U,r.TEXTURE_WRAP_S,St[T.wrapS]),r.texParameteri(U,r.TEXTURE_WRAP_T,St[T.wrapT]),(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)&&r.texParameteri(U,r.TEXTURE_WRAP_R,St[T.wrapR]),r.texParameteri(U,r.TEXTURE_MAG_FILTER,At[T.magFilter]),r.texParameteri(U,r.TEXTURE_MIN_FILTER,At[T.minFilter]),T.compareFunction&&(r.texParameteri(U,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(U,r.TEXTURE_COMPARE_FUNC,O[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Un||T.minFilter!==dc&&T.minFilter!==Ds||T.type===Hi&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const nt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(U,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function Mt(U,T){let nt=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",F));const mt=T.source;let bt=x.get(mt);bt===void 0&&(bt={},x.set(mt,bt));const _t=yt(T);if(_t!==U.__cacheKey){bt[_t]===void 0&&(bt[_t]={texture:r.createTexture(),usedTimes:0},h.memory.textures++,nt=!0),bt[_t].usedTimes++;const Wt=bt[U.__cacheKey];Wt!==void 0&&(bt[U.__cacheKey].usedTimes--,Wt.usedTimes===0&&D(T)),U.__cacheKey=_t,U.__webglTexture=bt[_t].texture}return nt}function Z(U,T,nt){let mt=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(mt=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(mt=r.TEXTURE_3D);const bt=Mt(U,T),_t=T.source;i.bindTexture(mt,U.__webglTexture,r.TEXTURE0+nt);const Wt=s.get(_t);if(_t.version!==Wt.__version||bt===!0){i.activeTexture(r.TEXTURE0+nt);const Lt=Oe.getPrimaries(Oe.workingColorSpace),Xt=T.colorSpace===Ya?null:Oe.getPrimaries(T.colorSpace),ve=T.colorSpace===Ya||Lt===Xt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let wt=b(T.image,!1,l.maxTextureSize);wt=Yt(T,wt);const kt=c.convert(T.format,T.colorSpace),Jt=c.convert(T.type);let qt=L(T.internalFormat,kt,Jt,T.colorSpace,T.isVideoTexture);et(mt,T);let Ht;const ae=T.mipmaps,he=T.isVideoTexture!==!0,Be=Wt.__version===void 0||bt===!0,Q=_t.dataReady,Ot=V(T,wt);if(T.isDepthTexture)qt=w(T.format===Hr,T.type),Be&&(he?i.texStorage2D(r.TEXTURE_2D,1,qt,wt.width,wt.height):i.texImage2D(r.TEXTURE_2D,0,qt,wt.width,wt.height,0,kt,Jt,null));else if(T.isDataTexture)if(ae.length>0){he&&Be&&i.texStorage2D(r.TEXTURE_2D,Ot,qt,ae[0].width,ae[0].height);for(let gt=0,Tt=ae.length;gt<Tt;gt++)Ht=ae[gt],he?Q&&i.texSubImage2D(r.TEXTURE_2D,gt,0,0,Ht.width,Ht.height,kt,Jt,Ht.data):i.texImage2D(r.TEXTURE_2D,gt,qt,Ht.width,Ht.height,0,kt,Jt,Ht.data);T.generateMipmaps=!1}else he?(Be&&i.texStorage2D(r.TEXTURE_2D,Ot,qt,wt.width,wt.height),Q&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,wt.width,wt.height,kt,Jt,wt.data)):i.texImage2D(r.TEXTURE_2D,0,qt,wt.width,wt.height,0,kt,Jt,wt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){he&&Be&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ot,qt,ae[0].width,ae[0].height,wt.depth);for(let gt=0,Tt=ae.length;gt<Tt;gt++)if(Ht=ae[gt],T.format!==Ui)if(kt!==null)if(he){if(Q)if(T.layerUpdates.size>0){const Pt=M_(Ht.width,Ht.height,T.format,T.type);for(const zt of T.layerUpdates){const oe=Ht.data.subarray(zt*Pt/Ht.data.BYTES_PER_ELEMENT,(zt+1)*Pt/Ht.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,gt,0,0,zt,Ht.width,Ht.height,1,kt,oe)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,gt,0,0,0,Ht.width,Ht.height,wt.depth,kt,Ht.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,gt,qt,Ht.width,Ht.height,wt.depth,0,Ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else he?Q&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,gt,0,0,0,Ht.width,Ht.height,wt.depth,kt,Jt,Ht.data):i.texImage3D(r.TEXTURE_2D_ARRAY,gt,qt,Ht.width,Ht.height,wt.depth,0,kt,Jt,Ht.data)}else{he&&Be&&i.texStorage2D(r.TEXTURE_2D,Ot,qt,ae[0].width,ae[0].height);for(let gt=0,Tt=ae.length;gt<Tt;gt++)Ht=ae[gt],T.format!==Ui?kt!==null?he?Q&&i.compressedTexSubImage2D(r.TEXTURE_2D,gt,0,0,Ht.width,Ht.height,kt,Ht.data):i.compressedTexImage2D(r.TEXTURE_2D,gt,qt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?Q&&i.texSubImage2D(r.TEXTURE_2D,gt,0,0,Ht.width,Ht.height,kt,Jt,Ht.data):i.texImage2D(r.TEXTURE_2D,gt,qt,Ht.width,Ht.height,0,kt,Jt,Ht.data)}else if(T.isDataArrayTexture)if(he){if(Be&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ot,qt,wt.width,wt.height,wt.depth),Q)if(T.layerUpdates.size>0){const gt=M_(wt.width,wt.height,T.format,T.type);for(const Tt of T.layerUpdates){const Pt=wt.data.subarray(Tt*gt/wt.data.BYTES_PER_ELEMENT,(Tt+1)*gt/wt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Tt,wt.width,wt.height,1,kt,Jt,Pt)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,wt.width,wt.height,wt.depth,kt,Jt,wt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,qt,wt.width,wt.height,wt.depth,0,kt,Jt,wt.data);else if(T.isData3DTexture)he?(Be&&i.texStorage3D(r.TEXTURE_3D,Ot,qt,wt.width,wt.height,wt.depth),Q&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,wt.width,wt.height,wt.depth,kt,Jt,wt.data)):i.texImage3D(r.TEXTURE_3D,0,qt,wt.width,wt.height,wt.depth,0,kt,Jt,wt.data);else if(T.isFramebufferTexture){if(Be)if(he)i.texStorage2D(r.TEXTURE_2D,Ot,qt,wt.width,wt.height);else{let gt=wt.width,Tt=wt.height;for(let Pt=0;Pt<Ot;Pt++)i.texImage2D(r.TEXTURE_2D,Pt,qt,gt,Tt,0,kt,Jt,null),gt>>=1,Tt>>=1}}else if(ae.length>0){if(he&&Be){const gt=Nt(ae[0]);i.texStorage2D(r.TEXTURE_2D,Ot,qt,gt.width,gt.height)}for(let gt=0,Tt=ae.length;gt<Tt;gt++)Ht=ae[gt],he?Q&&i.texSubImage2D(r.TEXTURE_2D,gt,0,0,kt,Jt,Ht):i.texImage2D(r.TEXTURE_2D,gt,qt,kt,Jt,Ht);T.generateMipmaps=!1}else if(he){if(Be){const gt=Nt(wt);i.texStorage2D(r.TEXTURE_2D,Ot,qt,gt.width,gt.height)}Q&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,kt,Jt,wt)}else i.texImage2D(r.TEXTURE_2D,0,qt,kt,Jt,wt);M(T)&&g(mt),Wt.__version=_t.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function pt(U,T,nt){if(T.image.length!==6)return;const mt=Mt(U,T),bt=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+nt);const _t=s.get(bt);if(bt.version!==_t.__version||mt===!0){i.activeTexture(r.TEXTURE0+nt);const Wt=Oe.getPrimaries(Oe.workingColorSpace),Lt=T.colorSpace===Ya?null:Oe.getPrimaries(T.colorSpace),Xt=T.colorSpace===Ya||Wt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);const ve=T.isCompressedTexture||T.image[0].isCompressedTexture,wt=T.image[0]&&T.image[0].isDataTexture,kt=[];for(let Tt=0;Tt<6;Tt++)!ve&&!wt?kt[Tt]=b(T.image[Tt],!0,l.maxCubemapSize):kt[Tt]=wt?T.image[Tt].image:T.image[Tt],kt[Tt]=Yt(T,kt[Tt]);const Jt=kt[0],qt=c.convert(T.format,T.colorSpace),Ht=c.convert(T.type),ae=L(T.internalFormat,qt,Ht,T.colorSpace),he=T.isVideoTexture!==!0,Be=_t.__version===void 0||mt===!0,Q=bt.dataReady;let Ot=V(T,Jt);et(r.TEXTURE_CUBE_MAP,T);let gt;if(ve){he&&Be&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Ot,ae,Jt.width,Jt.height);for(let Tt=0;Tt<6;Tt++){gt=kt[Tt].mipmaps;for(let Pt=0;Pt<gt.length;Pt++){const zt=gt[Pt];T.format!==Ui?qt!==null?he?Q&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt,0,0,zt.width,zt.height,qt,zt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt,ae,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):he?Q&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt,0,0,zt.width,zt.height,qt,Ht,zt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt,ae,zt.width,zt.height,0,qt,Ht,zt.data)}}}else{if(gt=T.mipmaps,he&&Be){gt.length>0&&Ot++;const Tt=Nt(kt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Ot,ae,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(wt){he?Q&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,kt[Tt].width,kt[Tt].height,qt,Ht,kt[Tt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,ae,kt[Tt].width,kt[Tt].height,0,qt,Ht,kt[Tt].data);for(let Pt=0;Pt<gt.length;Pt++){const oe=gt[Pt].image[Tt].image;he?Q&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt+1,0,0,oe.width,oe.height,qt,Ht,oe.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt+1,ae,oe.width,oe.height,0,qt,Ht,oe.data)}}else{he?Q&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,qt,Ht,kt[Tt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,ae,qt,Ht,kt[Tt]);for(let Pt=0;Pt<gt.length;Pt++){const zt=gt[Pt];he?Q&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt+1,0,0,qt,Ht,zt.image[Tt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Pt+1,ae,qt,Ht,zt.image[Tt])}}}M(T)&&g(r.TEXTURE_CUBE_MAP),_t.__version=bt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function k(U,T,nt,mt,bt,_t){const Wt=c.convert(nt.format,nt.colorSpace),Lt=c.convert(nt.type),Xt=L(nt.internalFormat,Wt,Lt,nt.colorSpace),ve=s.get(T),wt=s.get(nt);if(wt.__renderTarget=T,!ve.__hasExternalTextures){const kt=Math.max(1,T.width>>_t),Jt=Math.max(1,T.height>>_t);bt===r.TEXTURE_3D||bt===r.TEXTURE_2D_ARRAY?i.texImage3D(bt,_t,Xt,kt,Jt,T.depth,0,Wt,Lt,null):i.texImage2D(bt,_t,Xt,kt,Jt,0,Wt,Lt,null)}i.bindFramebuffer(r.FRAMEBUFFER,U),re(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,bt,wt.__webglTexture,0,Qt(T)):(bt===r.TEXTURE_2D||bt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&bt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,mt,bt,wt.__webglTexture,_t),i.bindFramebuffer(r.FRAMEBUFFER,null)}function G(U,T,nt){if(r.bindRenderbuffer(r.RENDERBUFFER,U),T.depthBuffer){const mt=T.depthTexture,bt=mt&&mt.isDepthTexture?mt.type:null,_t=w(T.stencilBuffer,bt),Wt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=Qt(T);re(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,_t,T.width,T.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,_t,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,_t,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,U)}else{const mt=T.textures;for(let bt=0;bt<mt.length;bt++){const _t=mt[bt],Wt=c.convert(_t.format,_t.colorSpace),Lt=c.convert(_t.type),Xt=L(_t.internalFormat,Wt,Lt,_t.colorSpace),ve=Qt(T);nt&&re(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,Xt,T.width,T.height):re(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,Xt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Xt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ot(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const mt=s.get(T.depthTexture);mt.__renderTarget=T,(!mt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ft(T.depthTexture,0);const bt=mt.__webglTexture,_t=Qt(T);if(T.depthTexture.format===Or)re(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,bt,0,_t):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,bt,0);else if(T.depthTexture.format===Hr)re(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,bt,0,_t):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,bt,0);else throw new Error("Unknown depthTexture format")}function st(U){const T=s.get(U),nt=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const mt=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),mt){const bt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,mt.removeEventListener("dispose",bt)};mt.addEventListener("dispose",bt),T.__depthDisposeCallback=bt}T.__boundDepthTexture=mt}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(nt)throw new Error("target.depthTexture not supported in Cube render targets");ot(T.__webglFramebuffer,U)}else if(nt){T.__webglDepthbuffer=[];for(let mt=0;mt<6;mt++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[mt]),T.__webglDepthbuffer[mt]===void 0)T.__webglDepthbuffer[mt]=r.createRenderbuffer(),G(T.__webglDepthbuffer[mt],U,!1);else{const bt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_t=T.__webglDepthbuffer[mt];r.bindRenderbuffer(r.RENDERBUFFER,_t),r.framebufferRenderbuffer(r.FRAMEBUFFER,bt,r.RENDERBUFFER,_t)}}else if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),G(T.__webglDepthbuffer,U,!1);else{const mt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,mt,r.RENDERBUFFER,bt)}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Rt(U,T,nt){const mt=s.get(U);T!==void 0&&k(mt.__webglFramebuffer,U,U.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),nt!==void 0&&st(U)}function $t(U){const T=U.texture,nt=s.get(U),mt=s.get(T);U.addEventListener("dispose",z);const bt=U.textures,_t=U.isWebGLCubeRenderTarget===!0,Wt=bt.length>1;if(Wt||(mt.__webglTexture===void 0&&(mt.__webglTexture=r.createTexture()),mt.__version=T.version,h.memory.textures++),_t){nt.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(T.mipmaps&&T.mipmaps.length>0){nt.__webglFramebuffer[Lt]=[];for(let Xt=0;Xt<T.mipmaps.length;Xt++)nt.__webglFramebuffer[Lt][Xt]=r.createFramebuffer()}else nt.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){nt.__webglFramebuffer=[];for(let Lt=0;Lt<T.mipmaps.length;Lt++)nt.__webglFramebuffer[Lt]=r.createFramebuffer()}else nt.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Lt=0,Xt=bt.length;Lt<Xt;Lt++){const ve=s.get(bt[Lt]);ve.__webglTexture===void 0&&(ve.__webglTexture=r.createTexture(),h.memory.textures++)}if(U.samples>0&&re(U)===!1){nt.__webglMultisampledFramebuffer=r.createFramebuffer(),nt.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let Lt=0;Lt<bt.length;Lt++){const Xt=bt[Lt];nt.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,nt.__webglColorRenderbuffer[Lt]);const ve=c.convert(Xt.format,Xt.colorSpace),wt=c.convert(Xt.type),kt=L(Xt.internalFormat,ve,wt,Xt.colorSpace,U.isXRRenderTarget===!0),Jt=Qt(U);r.renderbufferStorageMultisample(r.RENDERBUFFER,Jt,kt,U.width,U.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,nt.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),U.depthBuffer&&(nt.__webglDepthRenderbuffer=r.createRenderbuffer(),G(nt.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(_t){i.bindTexture(r.TEXTURE_CUBE_MAP,mt.__webglTexture),et(r.TEXTURE_CUBE_MAP,T);for(let Lt=0;Lt<6;Lt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Xt=0;Xt<T.mipmaps.length;Xt++)k(nt.__webglFramebuffer[Lt][Xt],U,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,Xt);else k(nt.__webglFramebuffer[Lt],U,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);M(T)&&g(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Wt){for(let Lt=0,Xt=bt.length;Lt<Xt;Lt++){const ve=bt[Lt],wt=s.get(ve);i.bindTexture(r.TEXTURE_2D,wt.__webglTexture),et(r.TEXTURE_2D,ve),k(nt.__webglFramebuffer,U,ve,r.COLOR_ATTACHMENT0+Lt,r.TEXTURE_2D,0),M(ve)&&g(r.TEXTURE_2D)}i.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Lt=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Lt,mt.__webglTexture),et(Lt,T),T.mipmaps&&T.mipmaps.length>0)for(let Xt=0;Xt<T.mipmaps.length;Xt++)k(nt.__webglFramebuffer[Xt],U,T,r.COLOR_ATTACHMENT0,Lt,Xt);else k(nt.__webglFramebuffer,U,T,r.COLOR_ATTACHMENT0,Lt,0);M(T)&&g(Lt),i.unbindTexture()}U.depthBuffer&&st(U)}function Kt(U){const T=U.textures;for(let nt=0,mt=T.length;nt<mt;nt++){const bt=T[nt];if(M(bt)){const _t=N(U),Wt=s.get(bt).__webglTexture;i.bindTexture(_t,Wt),g(_t),i.unbindTexture()}}}const ie=[],I=[];function pe(U){if(U.samples>0){if(re(U)===!1){const T=U.textures,nt=U.width,mt=U.height;let bt=r.COLOR_BUFFER_BIT;const _t=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=s.get(U),Lt=T.length>1;if(Lt)for(let Xt=0;Xt<T.length;Xt++)i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xt,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xt,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let Xt=0;Xt<T.length;Xt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(bt|=r.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(bt|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[Xt]);const ve=s.get(T[Xt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ve,0)}r.blitFramebuffer(0,0,nt,mt,0,0,nt,mt,bt,r.NEAREST),p===!0&&(ie.length=0,I.length=0,ie.push(r.COLOR_ATTACHMENT0+Xt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(ie.push(_t),I.push(_t),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ie))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let Xt=0;Xt<T.length;Xt++){i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[Xt]);const ve=s.get(T[Xt]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xt,r.TEXTURE_2D,ve,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&p){const T=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Qt(U){return Math.min(l.maxSamples,U.samples)}function re(U){const T=s.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ft(U){const T=h.render.frame;v.get(U)!==T&&(v.set(U,T),U.update())}function Yt(U,T){const nt=U.colorSpace,mt=U.format,bt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||nt!==Gr&&nt!==Ya&&(Oe.getTransfer(nt)===ke?(mt!==Ui||bt!==ga)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",nt)),T}function Nt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(m.width=U.naturalWidth||U.width,m.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(m.width=U.displayWidth,m.height=U.displayHeight):(m.width=U.width,m.height=U.height),m}this.allocateTextureUnit=rt,this.resetTextureUnits=ht,this.setTexture2D=ft,this.setTexture2DArray=P,this.setTexture3D=X,this.setTextureCube=q,this.rebindTextures=Rt,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=Kt,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=k,this.useMultisampledRTT=re}function aA(r,t){function i(s,l=Ya){let c;const h=Oe.getTransfer(l);if(s===ga)return r.UNSIGNED_BYTE;if(s===Bd)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Fd)return r.UNSIGNED_SHORT_5_5_5_1;if(s===rv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===av)return r.BYTE;if(s===sv)return r.SHORT;if(s===Qo)return r.UNSIGNED_SHORT;if(s===Id)return r.INT;if(s===Ls)return r.UNSIGNED_INT;if(s===Hi)return r.FLOAT;if(s===tl)return r.HALF_FLOAT;if(s===ov)return r.ALPHA;if(s===lv)return r.RGB;if(s===Ui)return r.RGBA;if(s===cv)return r.LUMINANCE;if(s===uv)return r.LUMINANCE_ALPHA;if(s===Or)return r.DEPTH_COMPONENT;if(s===Hr)return r.DEPTH_STENCIL;if(s===Hd)return r.RED;if(s===Gd)return r.RED_INTEGER;if(s===fv)return r.RG;if(s===Vd)return r.RG_INTEGER;if(s===kd)return r.RGBA_INTEGER;if(s===Bc||s===Fc||s===Hc||s===Gc)if(h===ke)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Bc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Fc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Hc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Gc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Bc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Fc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Hc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Gc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===sd||s===rd||s===od||s===ld)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===sd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===rd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===od)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ld)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===cd||s===ud||s===fd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===cd||s===ud)return h===ke?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===fd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===hd||s===dd||s===pd||s===md||s===gd||s===_d||s===vd||s===yd||s===xd||s===Md||s===Sd||s===Ed||s===bd||s===Td)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===hd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===dd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===pd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===md)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===gd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===_d)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===vd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===yd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===xd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Md)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Sd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ed)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===bd)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Td)return h===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Vc||s===Ad||s===Rd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Vc)return h===ke?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ad)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Rd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===hv||s===Cd||s===wd||s===Dd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Vc)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Cd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===wd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Dd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Fr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const sA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rA=`
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

}`;class oA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new Bn,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!==s.depthNear||i.depthFar!==s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new _a({vertexShader:sA,fragmentShader:rA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new En(new nl(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lA extends Os{constructor(t,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",p=1,m=null,v=null,_=null,x=null,S=null,E=null;const b=new oA,M=i.getContextAttributes();let g=null,N=null;const L=[],w=[],V=new de;let F=null;const z=new ui;z.viewport=new We;const j=new ui;j.viewport=new We;const D=[z,j],C=new RS;let H=null,ht=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let pt=L[Z];return pt===void 0&&(pt=new Nh,L[Z]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(Z){let pt=L[Z];return pt===void 0&&(pt=new Nh,L[Z]=pt),pt.getGripSpace()},this.getHand=function(Z){let pt=L[Z];return pt===void 0&&(pt=new Nh,L[Z]=pt),pt.getHandSpace()};function rt(Z){const pt=w.indexOf(Z.inputSource);if(pt===-1)return;const k=L[pt];k!==void 0&&(k.update(Z.inputSource,Z.frame,m||h),k.dispatchEvent({type:Z.type,data:Z.inputSource}))}function yt(){l.removeEventListener("select",rt),l.removeEventListener("selectstart",rt),l.removeEventListener("selectend",rt),l.removeEventListener("squeeze",rt),l.removeEventListener("squeezestart",rt),l.removeEventListener("squeezeend",rt),l.removeEventListener("end",yt),l.removeEventListener("inputsourceschange",ft);for(let Z=0;Z<L.length;Z++){const pt=w[Z];pt!==null&&(w[Z]=null,L[Z].disconnect(pt))}H=null,ht=null,b.reset(),t.setRenderTarget(g),S=null,x=null,_=null,l=null,N=null,Mt.stop(),s.isPresenting=!1,t.setPixelRatio(F),t.setSize(V.width,V.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||h},this.setReferenceSpace=function(Z){m=Z},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(g=t.getRenderTarget(),l.addEventListener("select",rt),l.addEventListener("selectstart",rt),l.addEventListener("selectend",rt),l.addEventListener("squeeze",rt),l.addEventListener("squeezestart",rt),l.addEventListener("squeezeend",rt),l.addEventListener("end",yt),l.addEventListener("inputsourceschange",ft),M.xrCompatible!==!0&&await i.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(V),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let k=null,G=null,ot=null;M.depth&&(ot=M.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,k=M.stencil?Hr:Or,G=M.stencil?Fr:Ls);const st={colorFormat:i.RGBA8,depthFormat:ot,scaleFactor:c};_=new XRWebGLBinding(l,i),x=_.createProjectionLayer(st),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),N=new Us(x.textureWidth,x.textureHeight,{format:Ui,type:ga,depthTexture:new bv(x.textureWidth,x.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const k={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,k),l.updateRenderState({baseLayer:S}),t.setPixelRatio(1),t.setSize(S.framebufferWidth,S.framebufferHeight,!1),N=new Us(S.framebufferWidth,S.framebufferHeight,{format:Ui,type:ga,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}N.isXRRenderTarget=!0,this.setFoveation(p),m=null,h=await l.requestReferenceSpace(d),Mt.setContext(l),Mt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function ft(Z){for(let pt=0;pt<Z.removed.length;pt++){const k=Z.removed[pt],G=w.indexOf(k);G>=0&&(w[G]=null,L[G].disconnect(k))}for(let pt=0;pt<Z.added.length;pt++){const k=Z.added[pt];let G=w.indexOf(k);if(G===-1){for(let st=0;st<L.length;st++)if(st>=w.length){w.push(k),G=st;break}else if(w[st]===null){w[st]=k,G=st;break}if(G===-1)break}const ot=L[G];ot&&ot.connect(k)}}const P=new tt,X=new tt;function q(Z,pt,k){P.setFromMatrixPosition(pt.matrixWorld),X.setFromMatrixPosition(k.matrixWorld);const G=P.distanceTo(X),ot=pt.projectionMatrix.elements,st=k.projectionMatrix.elements,Rt=ot[14]/(ot[10]-1),$t=ot[14]/(ot[10]+1),Kt=(ot[9]+1)/ot[5],ie=(ot[9]-1)/ot[5],I=(ot[8]-1)/ot[0],pe=(st[8]+1)/st[0],Qt=Rt*I,re=Rt*pe,Ft=G/(-I+pe),Yt=Ft*-I;if(pt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Yt),Z.translateZ(Ft),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ot[10]===-1)Z.projectionMatrix.copy(pt.projectionMatrix),Z.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Nt=Rt+Ft,U=$t+Ft,T=Qt-Yt,nt=re+(G-Yt),mt=Kt*$t/U*Nt,bt=ie*$t/U*Nt;Z.projectionMatrix.makePerspective(T,nt,mt,bt,Nt,U),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function St(Z,pt){pt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(pt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let pt=Z.near,k=Z.far;b.texture!==null&&(b.depthNear>0&&(pt=b.depthNear),b.depthFar>0&&(k=b.depthFar)),C.near=j.near=z.near=pt,C.far=j.far=z.far=k,(H!==C.near||ht!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),H=C.near,ht=C.far),z.layers.mask=Z.layers.mask|2,j.layers.mask=Z.layers.mask|4,C.layers.mask=z.layers.mask|j.layers.mask;const G=Z.parent,ot=C.cameras;St(C,G);for(let st=0;st<ot.length;st++)St(ot[st],G);ot.length===2?q(C,z,j):C.projectionMatrix.copy(z.projectionMatrix),At(Z,C,G)};function At(Z,pt,k){k===null?Z.matrix.copy(pt.matrixWorld):(Z.matrix.copy(k.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(pt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(pt.projectionMatrix),Z.projectionMatrixInverse.copy(pt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ld*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(x===null&&S===null))return p},this.setFoveation=function(Z){p=Z,x!==null&&(x.fixedFoveation=Z),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Z)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(C)};let O=null;function et(Z,pt){if(v=pt.getViewerPose(m||h),E=pt,v!==null){const k=v.views;S!==null&&(t.setRenderTargetFramebuffer(N,S.framebuffer),t.setRenderTarget(N));let G=!1;k.length!==C.cameras.length&&(C.cameras.length=0,G=!0);for(let Rt=0;Rt<k.length;Rt++){const $t=k[Rt];let Kt=null;if(S!==null)Kt=S.getViewport($t);else{const I=_.getViewSubImage(x,$t);Kt=I.viewport,Rt===0&&(t.setRenderTargetTextures(N,I.colorTexture,x.ignoreDepthValues?void 0:I.depthStencilTexture),t.setRenderTarget(N))}let ie=D[Rt];ie===void 0&&(ie=new ui,ie.layers.enable(Rt),ie.viewport=new We,D[Rt]=ie),ie.matrix.fromArray($t.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray($t.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Rt===0&&(C.matrix.copy(ie.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),G===!0&&C.cameras.push(ie)}const ot=l.enabledFeatures;if(ot&&ot.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&_){const Rt=_.getDepthInformation(k[0]);Rt&&Rt.isValid&&Rt.texture&&b.init(t,Rt,l.renderState)}}for(let k=0;k<L.length;k++){const G=w[k],ot=L[k];G!==null&&ot!==void 0&&ot.update(G,pt,m||h)}O&&O(Z,pt),pt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:pt}),E=null}const Mt=new Rv;Mt.setAnimationLoop(et),this.setAnimationLoop=function(Z){O=Z},this.dispose=function(){}}}const bs=new Gi,cA=new qe;function uA(r,t){function i(M,g){M.matrixAutoUpdate===!0&&M.updateMatrix(),g.value.copy(M.matrix)}function s(M,g){g.color.getRGB(M.fogColor.value,Mv(r)),g.isFog?(M.fogNear.value=g.near,M.fogFar.value=g.far):g.isFogExp2&&(M.fogDensity.value=g.density)}function l(M,g,N,L,w){g.isMeshBasicMaterial||g.isMeshLambertMaterial?c(M,g):g.isMeshToonMaterial?(c(M,g),_(M,g)):g.isMeshPhongMaterial?(c(M,g),v(M,g)):g.isMeshStandardMaterial?(c(M,g),x(M,g),g.isMeshPhysicalMaterial&&S(M,g,w)):g.isMeshMatcapMaterial?(c(M,g),E(M,g)):g.isMeshDepthMaterial?c(M,g):g.isMeshDistanceMaterial?(c(M,g),b(M,g)):g.isMeshNormalMaterial?c(M,g):g.isLineBasicMaterial?(h(M,g),g.isLineDashedMaterial&&d(M,g)):g.isPointsMaterial?p(M,g,N,L):g.isSpriteMaterial?m(M,g):g.isShadowMaterial?(M.color.value.copy(g.color),M.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function c(M,g){M.opacity.value=g.opacity,g.color&&M.diffuse.value.copy(g.color),g.emissive&&M.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(M.map.value=g.map,i(g.map,M.mapTransform)),g.alphaMap&&(M.alphaMap.value=g.alphaMap,i(g.alphaMap,M.alphaMapTransform)),g.bumpMap&&(M.bumpMap.value=g.bumpMap,i(g.bumpMap,M.bumpMapTransform),M.bumpScale.value=g.bumpScale,g.side===Xn&&(M.bumpScale.value*=-1)),g.normalMap&&(M.normalMap.value=g.normalMap,i(g.normalMap,M.normalMapTransform),M.normalScale.value.copy(g.normalScale),g.side===Xn&&M.normalScale.value.negate()),g.displacementMap&&(M.displacementMap.value=g.displacementMap,i(g.displacementMap,M.displacementMapTransform),M.displacementScale.value=g.displacementScale,M.displacementBias.value=g.displacementBias),g.emissiveMap&&(M.emissiveMap.value=g.emissiveMap,i(g.emissiveMap,M.emissiveMapTransform)),g.specularMap&&(M.specularMap.value=g.specularMap,i(g.specularMap,M.specularMapTransform)),g.alphaTest>0&&(M.alphaTest.value=g.alphaTest);const N=t.get(g),L=N.envMap,w=N.envMapRotation;L&&(M.envMap.value=L,bs.copy(w),bs.x*=-1,bs.y*=-1,bs.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),M.envMapRotation.value.setFromMatrix4(cA.makeRotationFromEuler(bs)),M.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=g.reflectivity,M.ior.value=g.ior,M.refractionRatio.value=g.refractionRatio),g.lightMap&&(M.lightMap.value=g.lightMap,M.lightMapIntensity.value=g.lightMapIntensity,i(g.lightMap,M.lightMapTransform)),g.aoMap&&(M.aoMap.value=g.aoMap,M.aoMapIntensity.value=g.aoMapIntensity,i(g.aoMap,M.aoMapTransform))}function h(M,g){M.diffuse.value.copy(g.color),M.opacity.value=g.opacity,g.map&&(M.map.value=g.map,i(g.map,M.mapTransform))}function d(M,g){M.dashSize.value=g.dashSize,M.totalSize.value=g.dashSize+g.gapSize,M.scale.value=g.scale}function p(M,g,N,L){M.diffuse.value.copy(g.color),M.opacity.value=g.opacity,M.size.value=g.size*N,M.scale.value=L*.5,g.map&&(M.map.value=g.map,i(g.map,M.uvTransform)),g.alphaMap&&(M.alphaMap.value=g.alphaMap,i(g.alphaMap,M.alphaMapTransform)),g.alphaTest>0&&(M.alphaTest.value=g.alphaTest)}function m(M,g){M.diffuse.value.copy(g.color),M.opacity.value=g.opacity,M.rotation.value=g.rotation,g.map&&(M.map.value=g.map,i(g.map,M.mapTransform)),g.alphaMap&&(M.alphaMap.value=g.alphaMap,i(g.alphaMap,M.alphaMapTransform)),g.alphaTest>0&&(M.alphaTest.value=g.alphaTest)}function v(M,g){M.specular.value.copy(g.specular),M.shininess.value=Math.max(g.shininess,1e-4)}function _(M,g){g.gradientMap&&(M.gradientMap.value=g.gradientMap)}function x(M,g){M.metalness.value=g.metalness,g.metalnessMap&&(M.metalnessMap.value=g.metalnessMap,i(g.metalnessMap,M.metalnessMapTransform)),M.roughness.value=g.roughness,g.roughnessMap&&(M.roughnessMap.value=g.roughnessMap,i(g.roughnessMap,M.roughnessMapTransform)),g.envMap&&(M.envMapIntensity.value=g.envMapIntensity)}function S(M,g,N){M.ior.value=g.ior,g.sheen>0&&(M.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),M.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(M.sheenColorMap.value=g.sheenColorMap,i(g.sheenColorMap,M.sheenColorMapTransform)),g.sheenRoughnessMap&&(M.sheenRoughnessMap.value=g.sheenRoughnessMap,i(g.sheenRoughnessMap,M.sheenRoughnessMapTransform))),g.clearcoat>0&&(M.clearcoat.value=g.clearcoat,M.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(M.clearcoatMap.value=g.clearcoatMap,i(g.clearcoatMap,M.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,i(g.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(M.clearcoatNormalMap.value=g.clearcoatNormalMap,i(g.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Xn&&M.clearcoatNormalScale.value.negate())),g.dispersion>0&&(M.dispersion.value=g.dispersion),g.iridescence>0&&(M.iridescence.value=g.iridescence,M.iridescenceIOR.value=g.iridescenceIOR,M.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(M.iridescenceMap.value=g.iridescenceMap,i(g.iridescenceMap,M.iridescenceMapTransform)),g.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=g.iridescenceThicknessMap,i(g.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),g.transmission>0&&(M.transmission.value=g.transmission,M.transmissionSamplerMap.value=N.texture,M.transmissionSamplerSize.value.set(N.width,N.height),g.transmissionMap&&(M.transmissionMap.value=g.transmissionMap,i(g.transmissionMap,M.transmissionMapTransform)),M.thickness.value=g.thickness,g.thicknessMap&&(M.thicknessMap.value=g.thicknessMap,i(g.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=g.attenuationDistance,M.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(M.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(M.anisotropyMap.value=g.anisotropyMap,i(g.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=g.specularIntensity,M.specularColor.value.copy(g.specularColor),g.specularColorMap&&(M.specularColorMap.value=g.specularColorMap,i(g.specularColorMap,M.specularColorMapTransform)),g.specularIntensityMap&&(M.specularIntensityMap.value=g.specularIntensityMap,i(g.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,g){g.matcap&&(M.matcap.value=g.matcap)}function b(M,g){const N=t.get(g).light;M.referencePosition.value.setFromMatrixPosition(N.matrixWorld),M.nearDistance.value=N.shadow.camera.near,M.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function fA(r,t,i,s){let l={},c={},h=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(N,L){const w=L.program;s.uniformBlockBinding(N,w)}function m(N,L){let w=l[N.id];w===void 0&&(E(N),w=v(N),l[N.id]=w,N.addEventListener("dispose",M));const V=L.program;s.updateUBOMapping(N,V);const F=t.render.frame;c[N.id]!==F&&(x(N),c[N.id]=F)}function v(N){const L=_();N.__bindingPointIndex=L;const w=r.createBuffer(),V=N.__size,F=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,V,F),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,L,w),w}function _(){for(let N=0;N<d;N++)if(h.indexOf(N)===-1)return h.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(N){const L=l[N.id],w=N.uniforms,V=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,L);for(let F=0,z=w.length;F<z;F++){const j=Array.isArray(w[F])?w[F]:[w[F]];for(let D=0,C=j.length;D<C;D++){const H=j[D];if(S(H,F,D,V)===!0){const ht=H.__offset,rt=Array.isArray(H.value)?H.value:[H.value];let yt=0;for(let ft=0;ft<rt.length;ft++){const P=rt[ft],X=b(P);typeof P=="number"||typeof P=="boolean"?(H.__data[0]=P,r.bufferSubData(r.UNIFORM_BUFFER,ht+yt,H.__data)):P.isMatrix3?(H.__data[0]=P.elements[0],H.__data[1]=P.elements[1],H.__data[2]=P.elements[2],H.__data[3]=0,H.__data[4]=P.elements[3],H.__data[5]=P.elements[4],H.__data[6]=P.elements[5],H.__data[7]=0,H.__data[8]=P.elements[6],H.__data[9]=P.elements[7],H.__data[10]=P.elements[8],H.__data[11]=0):(P.toArray(H.__data,yt),yt+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,ht,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(N,L,w,V){const F=N.value,z=L+"_"+w;if(V[z]===void 0)return typeof F=="number"||typeof F=="boolean"?V[z]=F:V[z]=F.clone(),!0;{const j=V[z];if(typeof F=="number"||typeof F=="boolean"){if(j!==F)return V[z]=F,!0}else if(j.equals(F)===!1)return j.copy(F),!0}return!1}function E(N){const L=N.uniforms;let w=0;const V=16;for(let z=0,j=L.length;z<j;z++){const D=Array.isArray(L[z])?L[z]:[L[z]];for(let C=0,H=D.length;C<H;C++){const ht=D[C],rt=Array.isArray(ht.value)?ht.value:[ht.value];for(let yt=0,ft=rt.length;yt<ft;yt++){const P=rt[yt],X=b(P),q=w%V,St=q%X.boundary,At=q+St;w+=St,At!==0&&V-At<X.storage&&(w+=V-At),ht.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),ht.__offset=w,w+=X.storage}}}const F=w%V;return F>0&&(w+=V-F),N.__size=w,N.__cache={},this}function b(N){const L={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(L.boundary=4,L.storage=4):N.isVector2?(L.boundary=8,L.storage=8):N.isVector3||N.isColor?(L.boundary=16,L.storage=12):N.isVector4?(L.boundary=16,L.storage=16):N.isMatrix3?(L.boundary=48,L.storage=48):N.isMatrix4?(L.boundary=64,L.storage=64):N.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N),L}function M(N){const L=N.target;L.removeEventListener("dispose",M);const w=h.indexOf(L.__bindingPointIndex);h.splice(w,1),r.deleteBuffer(l[L.id]),delete l[L.id],delete c[L.id]}function g(){for(const N in l)r.deleteBuffer(l[N]);h=[],l={},c={}}return{bind:p,update:m,dispose:g}}class hA{constructor(t={}){const{canvas:i=HM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=h;const E=new Uint32Array(4),b=new Int32Array(4);let M=null,g=null;const N=[],L=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xi,this.toneMapping=Ja,this.toneMappingExposure=1;const w=this;let V=!1,F=0,z=0,j=null,D=-1,C=null;const H=new We,ht=new We;let rt=null;const yt=new xe(0);let ft=0,P=i.width,X=i.height,q=1,St=null,At=null;const O=new We(0,0,P,X),et=new We(0,0,P,X);let Mt=!1;const Z=new qd;let pt=!1,k=!1;this.transmissionResolutionScale=1;const G=new qe,ot=new qe,st=new tt,Rt=new We,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function ie(){return j===null?q:1}let I=s;function pe(R,J){return i.getContext(R,J)}try{const R={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${zd}`),i.addEventListener("webglcontextlost",Tt,!1),i.addEventListener("webglcontextrestored",Pt,!1),i.addEventListener("webglcontextcreationerror",zt,!1),I===null){const J="webgl2";if(I=pe(J,R),I===null)throw pe(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Qt,re,Ft,Yt,Nt,U,T,nt,mt,bt,_t,Wt,Lt,Xt,ve,wt,kt,Jt,qt,Ht,ae,he,Be,Q;function Ot(){Qt=new Sb(I),Qt.init(),he=new aA(I,Qt),re=new mb(I,Qt,t,he),Ft=new nA(I,Qt),re.reverseDepthBuffer&&x&&Ft.buffers.depth.setReversed(!0),Yt=new Tb(I),Nt=new kT,U=new iA(I,Qt,Ft,Nt,re,he,Yt),T=new _b(w),nt=new Mb(w),mt=new LS(I),Be=new db(I,mt),bt=new Eb(I,mt,Yt,Be),_t=new Rb(I,bt,mt,Yt),qt=new Ab(I,re,U),wt=new gb(Nt),Wt=new VT(w,T,nt,Qt,re,Be,wt),Lt=new uA(w,Nt),Xt=new WT,ve=new QT(Qt),Jt=new hb(w,T,nt,Ft,_t,S,p),kt=new tA(w,_t,re),Q=new fA(I,Yt,re,Ft),Ht=new pb(I,Qt,Yt),ae=new bb(I,Qt,Yt),Yt.programs=Wt.programs,w.capabilities=re,w.extensions=Qt,w.properties=Nt,w.renderLists=Xt,w.shadowMap=kt,w.state=Ft,w.info=Yt}Ot();const gt=new lA(w,I);this.xr=gt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Qt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Qt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(R){R!==void 0&&(q=R,this.setSize(P,X,!1))},this.getSize=function(R){return R.set(P,X)},this.setSize=function(R,J,ct=!0){if(gt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=R,X=J,i.width=Math.floor(R*q),i.height=Math.floor(J*q),ct===!0&&(i.style.width=R+"px",i.style.height=J+"px"),this.setViewport(0,0,R,J)},this.getDrawingBufferSize=function(R){return R.set(P*q,X*q).floor()},this.setDrawingBufferSize=function(R,J,ct){P=R,X=J,q=ct,i.width=Math.floor(R*ct),i.height=Math.floor(J*ct),this.setViewport(0,0,R,J)},this.getCurrentViewport=function(R){return R.copy(H)},this.getViewport=function(R){return R.copy(O)},this.setViewport=function(R,J,ct,ut){R.isVector4?O.set(R.x,R.y,R.z,R.w):O.set(R,J,ct,ut),Ft.viewport(H.copy(O).multiplyScalar(q).round())},this.getScissor=function(R){return R.copy(et)},this.setScissor=function(R,J,ct,ut){R.isVector4?et.set(R.x,R.y,R.z,R.w):et.set(R,J,ct,ut),Ft.scissor(ht.copy(et).multiplyScalar(q).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(R){Ft.setScissorTest(Mt=R)},this.setOpaqueSort=function(R){St=R},this.setTransparentSort=function(R){At=R},this.getClearColor=function(R){return R.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(R=!0,J=!0,ct=!0){let ut=0;if(R){let Y=!1;if(j!==null){const Ct=j.texture.format;Y=Ct===kd||Ct===Vd||Ct===Gd}if(Y){const Ct=j.texture.type,It=Ct===ga||Ct===Ls||Ct===Qo||Ct===Fr||Ct===Bd||Ct===Fd,Gt=Jt.getClearColor(),Vt=Jt.getClearAlpha(),le=Gt.r,ce=Gt.g,te=Gt.b;It?(E[0]=le,E[1]=ce,E[2]=te,E[3]=Vt,I.clearBufferuiv(I.COLOR,0,E)):(b[0]=le,b[1]=ce,b[2]=te,b[3]=Vt,I.clearBufferiv(I.COLOR,0,b))}else ut|=I.COLOR_BUFFER_BIT}J&&(ut|=I.DEPTH_BUFFER_BIT),ct&&(ut|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(ut)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Tt,!1),i.removeEventListener("webglcontextrestored",Pt,!1),i.removeEventListener("webglcontextcreationerror",zt,!1),Jt.dispose(),Xt.dispose(),ve.dispose(),Nt.dispose(),T.dispose(),nt.dispose(),_t.dispose(),Be.dispose(),Q.dispose(),Wt.dispose(),gt.dispose(),gt.removeEventListener("sessionstart",jr),gt.removeEventListener("sessionend",qr),Ni.stop()};function Tt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const R=Yt.autoReset,J=kt.enabled,ct=kt.autoUpdate,ut=kt.needsUpdate,Y=kt.type;Ot(),Yt.autoReset=R,kt.enabled=J,kt.autoUpdate=ct,kt.needsUpdate=ut,kt.type=Y}function zt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function oe(R){const J=R.target;J.removeEventListener("dispose",oe),Qe(J)}function Qe(R){hn(R),Nt.remove(R)}function hn(R){const J=Nt.get(R).programs;J!==void 0&&(J.forEach(function(ct){Wt.releaseProgram(ct)}),R.isShaderMaterial&&Wt.releaseShaderCache(R))}this.renderBufferDirect=function(R,J,ct,ut,Y,Ct){J===null&&(J=$t);const It=Y.isMesh&&Y.matrixWorld.determinant()<0,Gt=Zr(R,J,ct,ut,Y);Ft.setMaterial(ut,It);let Vt=ct.index,le=1;if(ut.wireframe===!0){if(Vt=bt.getWireframeAttribute(ct),Vt===void 0)return;le=2}const ce=ct.drawRange,te=ct.attributes.position;let Ae=ce.start*le,Re=(ce.start+ce.count)*le;Ct!==null&&(Ae=Math.max(Ae,Ct.start*le),Re=Math.min(Re,(Ct.start+Ct.count)*le)),Vt!==null?(Ae=Math.max(Ae,0),Re=Math.min(Re,Vt.count)):te!=null&&(Ae=Math.max(Ae,0),Re=Math.min(Re,te.count));const Ye=Re-Ae;if(Ye<0||Ye===1/0)return;Be.setup(Y,ut,Gt,ct,Vt);let Le,ue=Ht;if(Vt!==null&&(Le=mt.get(Vt),ue=ae,ue.setIndex(Le)),Y.isMesh)ut.wireframe===!0?(Ft.setLineWidth(ut.wireframeLinewidth*ie()),ue.setMode(I.LINES)):ue.setMode(I.TRIANGLES);else if(Y.isLine){let ne=ut.linewidth;ne===void 0&&(ne=1),Ft.setLineWidth(ne*ie()),Y.isLineSegments?ue.setMode(I.LINES):Y.isLineLoop?ue.setMode(I.LINE_LOOP):ue.setMode(I.LINE_STRIP)}else Y.isPoints?ue.setMode(I.POINTS):Y.isSprite&&ue.setMode(I.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)Ts("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ue.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(Qt.get("WEBGL_multi_draw"))ue.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const ne=Y._multiDrawStarts,dn=Y._multiDrawCounts,we=Y._multiDrawCount,Wn=Vt?mt.get(Vt).bytesPerElement:1,bi=Nt.get(ut).currentProgram.getUniforms();for(let Hn=0;Hn<we;Hn++)bi.setValue(I,"_gl_DrawID",Hn),ue.render(ne[Hn]/Wn,dn[Hn])}else if(Y.isInstancedMesh)ue.renderInstances(Ae,Ye,Y.count);else if(ct.isInstancedBufferGeometry){const ne=ct._maxInstanceCount!==void 0?ct._maxInstanceCount:1/0,dn=Math.min(ct.instanceCount,ne);ue.renderInstances(Ae,Ye,dn)}else ue.render(Ae,Ye)};function De(R,J,ct){R.transparent===!0&&R.side===Mi&&R.forceSinglePass===!1?(R.side=Xn,R.needsUpdate=!0,tn(R,J,ct),R.side=ma,R.needsUpdate=!0,tn(R,J,ct),R.side=Mi):tn(R,J,ct)}this.compile=function(R,J,ct=null){ct===null&&(ct=R),g=ve.get(ct),g.init(J),L.push(g),ct.traverseVisible(function(Y){Y.isLight&&Y.layers.test(J.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),R!==ct&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(J.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),g.setupLights();const ut=new Set;return R.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Ct=Y.material;if(Ct)if(Array.isArray(Ct))for(let It=0;It<Ct.length;It++){const Gt=Ct[It];De(Gt,ct,Y),ut.add(Gt)}else De(Ct,ct,Y),ut.add(Ct)}),g=L.pop(),ut},this.compileAsync=function(R,J,ct=null){const ut=this.compile(R,J,ct);return new Promise(Y=>{function Ct(){if(ut.forEach(function(It){Nt.get(It).currentProgram.isReady()&&ut.delete(It)}),ut.size===0){Y(R);return}setTimeout(Ct,10)}Qt.get("KHR_parallel_shader_compile")!==null?Ct():setTimeout(Ct,10)})};let Tn=null;function Si(R){Tn&&Tn(R)}function jr(){Ni.stop()}function qr(){Ni.start()}const Ni=new Rv;Ni.setAnimationLoop(Si),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(R){Tn=R,gt.setAnimationLoop(R),R===null?Ni.stop():Ni.start()},gt.addEventListener("sessionstart",jr),gt.addEventListener("sessionend",qr),this.render=function(R,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),gt.enabled===!0&&gt.isPresenting===!0&&(gt.cameraAutoUpdate===!0&&gt.updateCamera(J),J=gt.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,J,j),g=ve.get(R,L.length),g.init(J),L.push(g),ot.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),Z.setFromProjectionMatrix(ot),k=this.localClippingEnabled,pt=wt.init(this.clippingPlanes,k),M=Xt.get(R,N.length),M.init(),N.push(M),gt.enabled===!0&&gt.isPresenting===!0){const Ct=w.xr.getDepthSensingMesh();Ct!==null&&ts(Ct,J,-1/0,w.sortObjects)}ts(R,J,0,w.sortObjects),M.finish(),w.sortObjects===!0&&M.sort(St,At),Kt=gt.enabled===!1||gt.isPresenting===!1||gt.hasDepthSensing()===!1,Kt&&Jt.addToRenderList(M,R),this.info.render.frame++,pt===!0&&wt.beginShadows();const ct=g.state.shadowsArray;kt.render(ct,R,J),pt===!0&&wt.endShadows(),this.info.autoReset===!0&&this.info.reset();const ut=M.opaque,Y=M.transmissive;if(g.setupLights(),J.isArrayCamera){const Ct=J.cameras;if(Y.length>0)for(let It=0,Gt=Ct.length;It<Gt;It++){const Vt=Ct[It];Yr(ut,Y,R,Vt)}Kt&&Jt.render(R);for(let It=0,Gt=Ct.length;It<Gt;It++){const Vt=Ct[It];Is(M,R,Vt,Vt.viewport)}}else Y.length>0&&Yr(ut,Y,R,J),Kt&&Jt.render(R),Is(M,R,J);j!==null&&z===0&&(U.updateMultisampleRenderTarget(j),U.updateRenderTargetMipmap(j)),R.isScene===!0&&R.onAfterRender(w,R,J),Be.resetDefaultState(),D=-1,C=null,L.pop(),L.length>0?(g=L[L.length-1],pt===!0&&wt.setGlobalState(w.clippingPlanes,g.state.camera)):g=null,N.pop(),N.length>0?M=N[N.length-1]:M=null};function ts(R,J,ct,ut){if(R.visible===!1)return;if(R.layers.test(J.layers)){if(R.isGroup)ct=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(J);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){ut&&Rt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ot);const It=_t.update(R),Gt=R.material;Gt.visible&&M.push(R,It,Gt,ct,Rt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const It=_t.update(R),Gt=R.material;if(ut&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Rt.copy(R.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Rt.copy(It.boundingSphere.center)),Rt.applyMatrix4(R.matrixWorld).applyMatrix4(ot)),Array.isArray(Gt)){const Vt=It.groups;for(let le=0,ce=Vt.length;le<ce;le++){const te=Vt[le],Ae=Gt[te.materialIndex];Ae&&Ae.visible&&M.push(R,It,Ae,ct,Rt.z,te)}}else Gt.visible&&M.push(R,It,Gt,ct,Rt.z,null)}}const Ct=R.children;for(let It=0,Gt=Ct.length;It<Gt;It++)ts(Ct[It],J,ct,ut)}function Is(R,J,ct,ut){const Y=R.opaque,Ct=R.transmissive,It=R.transparent;g.setupLightsView(ct),pt===!0&&wt.setGlobalState(w.clippingPlanes,ct),ut&&Ft.viewport(H.copy(ut)),Y.length>0&&es(Y,J,ct),Ct.length>0&&es(Ct,J,ct),It.length>0&&es(It,J,ct),Ft.buffers.depth.setTest(!0),Ft.buffers.depth.setMask(!0),Ft.buffers.color.setMask(!0),Ft.setPolygonOffset(!1)}function Yr(R,J,ct,ut){if((ct.isScene===!0?ct.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ut.id]===void 0&&(g.state.transmissionRenderTarget[ut.id]=new Us(1,1,{generateMipmaps:!0,type:Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float")?tl:ga,minFilter:Ds,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Oe.workingColorSpace}));const Ct=g.state.transmissionRenderTarget[ut.id],It=ut.viewport||H;Ct.setSize(It.z*w.transmissionResolutionScale,It.w*w.transmissionResolutionScale);const Gt=w.getRenderTarget();w.setRenderTarget(Ct),w.getClearColor(yt),ft=w.getClearAlpha(),ft<1&&w.setClearColor(16777215,.5),w.clear(),Kt&&Jt.render(ct);const Vt=w.toneMapping;w.toneMapping=Ja;const le=ut.viewport;if(ut.viewport!==void 0&&(ut.viewport=void 0),g.setupLightsView(ut),pt===!0&&wt.setGlobalState(w.clippingPlanes,ut),es(R,ct,ut),U.updateMultisampleRenderTarget(Ct),U.updateRenderTargetMipmap(Ct),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let ce=!1;for(let te=0,Ae=J.length;te<Ae;te++){const Re=J[te],Ye=Re.object,Le=Re.geometry,ue=Re.material,ne=Re.group;if(ue.side===Mi&&Ye.layers.test(ut.layers)){const dn=ue.side;ue.side=Xn,ue.needsUpdate=!0,Ei(Ye,ct,ut,Le,ue,ne),ue.side=dn,ue.needsUpdate=!0,ce=!0}}ce===!0&&(U.updateMultisampleRenderTarget(Ct),U.updateRenderTargetMipmap(Ct))}w.setRenderTarget(Gt),w.setClearColor(yt,ft),le!==void 0&&(ut.viewport=le),w.toneMapping=Vt}function es(R,J,ct){const ut=J.isScene===!0?J.overrideMaterial:null;for(let Y=0,Ct=R.length;Y<Ct;Y++){const It=R[Y],Gt=It.object,Vt=It.geometry,le=ut===null?It.material:ut,ce=It.group;Gt.layers.test(ct.layers)&&Ei(Gt,J,ct,Vt,le,ce)}}function Ei(R,J,ct,ut,Y,Ct){R.onBeforeRender(w,J,ct,ut,Y,Ct),R.modelViewMatrix.multiplyMatrices(ct.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(w,J,ct,ut,R,Ct),Y.transparent===!0&&Y.side===Mi&&Y.forceSinglePass===!1?(Y.side=Xn,Y.needsUpdate=!0,w.renderBufferDirect(ct,J,ut,Y,R,Ct),Y.side=ma,Y.needsUpdate=!0,w.renderBufferDirect(ct,J,ut,Y,R,Ct),Y.side=Mi):w.renderBufferDirect(ct,J,ut,Y,R,Ct),R.onAfterRender(w,J,ct,ut,Y,Ct)}function tn(R,J,ct){J.isScene!==!0&&(J=$t);const ut=Nt.get(R),Y=g.state.lights,Ct=g.state.shadowsArray,It=Y.state.version,Gt=Wt.getParameters(R,Y.state,Ct,J,ct),Vt=Wt.getProgramCacheKey(Gt);let le=ut.programs;ut.environment=R.isMeshStandardMaterial?J.environment:null,ut.fog=J.fog,ut.envMap=(R.isMeshStandardMaterial?nt:T).get(R.envMap||ut.environment),ut.envMapRotation=ut.environment!==null&&R.envMap===null?J.environmentRotation:R.envMapRotation,le===void 0&&(R.addEventListener("dispose",oe),le=new Map,ut.programs=le);let ce=le.get(Vt);if(ce!==void 0){if(ut.currentProgram===ce&&ut.lightsStateVersion===It)return Vi(R,Gt),ce}else Gt.uniforms=Wt.getUniforms(R),R.onBeforeCompile(Gt,w),ce=Wt.acquireProgram(Gt,Vt),le.set(Vt,ce),ut.uniforms=Gt.uniforms;const te=ut.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(te.clippingPlanes=wt.uniform),Vi(R,Gt),ut.needsLights=tu(R),ut.lightsStateVersion=It,ut.needsLights&&(te.ambientLightColor.value=Y.state.ambient,te.lightProbe.value=Y.state.probe,te.directionalLights.value=Y.state.directional,te.directionalLightShadows.value=Y.state.directionalShadow,te.spotLights.value=Y.state.spot,te.spotLightShadows.value=Y.state.spotShadow,te.rectAreaLights.value=Y.state.rectArea,te.ltc_1.value=Y.state.rectAreaLTC1,te.ltc_2.value=Y.state.rectAreaLTC2,te.pointLights.value=Y.state.point,te.pointLightShadows.value=Y.state.pointShadow,te.hemisphereLights.value=Y.state.hemi,te.directionalShadowMap.value=Y.state.directionalShadowMap,te.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,te.spotShadowMap.value=Y.state.spotShadowMap,te.spotLightMatrix.value=Y.state.spotLightMatrix,te.spotLightMap.value=Y.state.spotLightMap,te.pointShadowMap.value=Y.state.pointShadowMap,te.pointShadowMatrix.value=Y.state.pointShadowMatrix),ut.currentProgram=ce,ut.uniformsList=null,ce}function An(R){if(R.uniformsList===null){const J=R.currentProgram.getUniforms();R.uniformsList=Wc.seqWithValue(J.seq,R.uniforms)}return R.uniformsList}function Vi(R,J){const ct=Nt.get(R);ct.outputColorSpace=J.outputColorSpace,ct.batching=J.batching,ct.batchingColor=J.batchingColor,ct.instancing=J.instancing,ct.instancingColor=J.instancingColor,ct.instancingMorph=J.instancingMorph,ct.skinning=J.skinning,ct.morphTargets=J.morphTargets,ct.morphNormals=J.morphNormals,ct.morphColors=J.morphColors,ct.morphTargetsCount=J.morphTargetsCount,ct.numClippingPlanes=J.numClippingPlanes,ct.numIntersection=J.numClipIntersection,ct.vertexAlphas=J.vertexAlphas,ct.vertexTangents=J.vertexTangents,ct.toneMapping=J.toneMapping}function Zr(R,J,ct,ut,Y){J.isScene!==!0&&(J=$t),U.resetTextureUnits();const Ct=J.fog,It=ut.isMeshStandardMaterial?J.environment:null,Gt=j===null?w.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Gr,Vt=(ut.isMeshStandardMaterial?nt:T).get(ut.envMap||It),le=ut.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,ce=!!ct.attributes.tangent&&(!!ut.normalMap||ut.anisotropy>0),te=!!ct.morphAttributes.position,Ae=!!ct.morphAttributes.normal,Re=!!ct.morphAttributes.color;let Ye=Ja;ut.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ye=w.toneMapping);const Le=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,ue=Le!==void 0?Le.length:0,ne=Nt.get(ut),dn=g.state.lights;if(pt===!0&&(k===!0||R!==C)){const en=R===C&&ut.id===D;wt.setState(ut,R,en)}let we=!1;ut.version===ne.__version?(ne.needsLights&&ne.lightsStateVersion!==dn.state.version||ne.outputColorSpace!==Gt||Y.isBatchedMesh&&ne.batching===!1||!Y.isBatchedMesh&&ne.batching===!0||Y.isBatchedMesh&&ne.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&ne.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&ne.instancing===!1||!Y.isInstancedMesh&&ne.instancing===!0||Y.isSkinnedMesh&&ne.skinning===!1||!Y.isSkinnedMesh&&ne.skinning===!0||Y.isInstancedMesh&&ne.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&ne.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&ne.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&ne.instancingMorph===!1&&Y.morphTexture!==null||ne.envMap!==Vt||ut.fog===!0&&ne.fog!==Ct||ne.numClippingPlanes!==void 0&&(ne.numClippingPlanes!==wt.numPlanes||ne.numIntersection!==wt.numIntersection)||ne.vertexAlphas!==le||ne.vertexTangents!==ce||ne.morphTargets!==te||ne.morphNormals!==Ae||ne.morphColors!==Re||ne.toneMapping!==Ye||ne.morphTargetsCount!==ue)&&(we=!0):(we=!0,ne.__version=ut.version);let Wn=ne.currentProgram;we===!0&&(Wn=tn(ut,J,Y));let bi=!1,Hn=!1,xn=!1;const Fe=Wn.getUniforms(),Gn=ne.uniforms;if(Ft.useProgram(Wn.program)&&(bi=!0,Hn=!0,xn=!0),ut.id!==D&&(D=ut.id,Hn=!0),bi||C!==R){Ft.buffers.depth.getReversed()?(G.copy(R.projectionMatrix),VM(G),kM(G),Fe.setValue(I,"projectionMatrix",G)):Fe.setValue(I,"projectionMatrix",R.projectionMatrix),Fe.setValue(I,"viewMatrix",R.matrixWorldInverse);const Rn=Fe.map.cameraPosition;Rn!==void 0&&Rn.setValue(I,st.setFromMatrixPosition(R.matrixWorld)),re.logarithmicDepthBuffer&&Fe.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ut.isMeshPhongMaterial||ut.isMeshToonMaterial||ut.isMeshLambertMaterial||ut.isMeshBasicMaterial||ut.isMeshStandardMaterial||ut.isShaderMaterial)&&Fe.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,Hn=!0,xn=!0)}if(Y.isSkinnedMesh){Fe.setOptional(I,Y,"bindMatrix"),Fe.setOptional(I,Y,"bindMatrixInverse");const en=Y.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Fe.setValue(I,"boneTexture",en.boneTexture,U))}Y.isBatchedMesh&&(Fe.setOptional(I,Y,"batchingTexture"),Fe.setValue(I,"batchingTexture",Y._matricesTexture,U),Fe.setOptional(I,Y,"batchingIdTexture"),Fe.setValue(I,"batchingIdTexture",Y._indirectTexture,U),Fe.setOptional(I,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Fe.setValue(I,"batchingColorTexture",Y._colorsTexture,U));const On=ct.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&qt.update(Y,ct,Wn),(Hn||ne.receiveShadow!==Y.receiveShadow)&&(ne.receiveShadow=Y.receiveShadow,Fe.setValue(I,"receiveShadow",Y.receiveShadow)),ut.isMeshGouraudMaterial&&ut.envMap!==null&&(Gn.envMap.value=Vt,Gn.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),ut.isMeshStandardMaterial&&ut.envMap===null&&J.environment!==null&&(Gn.envMapIntensity.value=J.environmentIntensity),Hn&&(Fe.setValue(I,"toneMappingExposure",w.toneMappingExposure),ne.needsLights&&$c(Gn,xn),Ct&&ut.fog===!0&&Lt.refreshFogUniforms(Gn,Ct),Lt.refreshMaterialUniforms(Gn,ut,q,X,g.state.transmissionRenderTarget[R.id]),Wc.upload(I,An(ne),Gn,U)),ut.isShaderMaterial&&ut.uniformsNeedUpdate===!0&&(Wc.upload(I,An(ne),Gn,U),ut.uniformsNeedUpdate=!1),ut.isSpriteMaterial&&Fe.setValue(I,"center",Y.center),Fe.setValue(I,"modelViewMatrix",Y.modelViewMatrix),Fe.setValue(I,"normalMatrix",Y.normalMatrix),Fe.setValue(I,"modelMatrix",Y.matrixWorld),ut.isShaderMaterial||ut.isRawShaderMaterial){const en=ut.uniformsGroups;for(let Rn=0,Bs=en.length;Rn<Bs;Rn++){const jn=en[Rn];Q.update(jn,Wn),Q.bind(jn,Wn)}}return Wn}function $c(R,J){R.ambientLightColor.needsUpdate=J,R.lightProbe.needsUpdate=J,R.directionalLights.needsUpdate=J,R.directionalLightShadows.needsUpdate=J,R.pointLights.needsUpdate=J,R.pointLightShadows.needsUpdate=J,R.spotLights.needsUpdate=J,R.spotLightShadows.needsUpdate=J,R.rectAreaLights.needsUpdate=J,R.hemisphereLights.needsUpdate=J}function tu(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(R,J,ct){Nt.get(R.texture).__webglTexture=J,Nt.get(R.depthTexture).__webglTexture=ct;const ut=Nt.get(R);ut.__hasExternalTextures=!0,ut.__autoAllocateDepthBuffer=ct===void 0,ut.__autoAllocateDepthBuffer||Qt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ut.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,J){const ct=Nt.get(R);ct.__webglFramebuffer=J,ct.__useDefaultFramebuffer=J===void 0};const il=I.createFramebuffer();this.setRenderTarget=function(R,J=0,ct=0){j=R,F=J,z=ct;let ut=!0,Y=null,Ct=!1,It=!1;if(R){const Vt=Nt.get(R);if(Vt.__useDefaultFramebuffer!==void 0)Ft.bindFramebuffer(I.FRAMEBUFFER,null),ut=!1;else if(Vt.__webglFramebuffer===void 0)U.setupRenderTarget(R);else if(Vt.__hasExternalTextures)U.rebindTextures(R,Nt.get(R.texture).__webglTexture,Nt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const te=R.depthTexture;if(Vt.__boundDepthTexture!==te){if(te!==null&&Nt.has(te)&&(R.width!==te.image.width||R.height!==te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(R)}}const le=R.texture;(le.isData3DTexture||le.isDataArrayTexture||le.isCompressedArrayTexture)&&(It=!0);const ce=Nt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ce[J])?Y=ce[J][ct]:Y=ce[J],Ct=!0):R.samples>0&&U.useMultisampledRTT(R)===!1?Y=Nt.get(R).__webglMultisampledFramebuffer:Array.isArray(ce)?Y=ce[ct]:Y=ce,H.copy(R.viewport),ht.copy(R.scissor),rt=R.scissorTest}else H.copy(O).multiplyScalar(q).floor(),ht.copy(et).multiplyScalar(q).floor(),rt=Mt;if(ct!==0&&(Y=il),Ft.bindFramebuffer(I.FRAMEBUFFER,Y)&&ut&&Ft.drawBuffers(R,Y),Ft.viewport(H),Ft.scissor(ht),Ft.setScissorTest(rt),Ct){const Vt=Nt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+J,Vt.__webglTexture,ct)}else if(It){const Vt=Nt.get(R.texture),le=J;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Vt.__webglTexture,ct,le)}else if(R!==null&&ct!==0){const Vt=Nt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Vt.__webglTexture,ct)}D=-1},this.readRenderTargetPixels=function(R,J,ct,ut,Y,Ct,It){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=Nt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&It!==void 0&&(Gt=Gt[It]),Gt){Ft.bindFramebuffer(I.FRAMEBUFFER,Gt);try{const Vt=R.texture,le=Vt.format,ce=Vt.type;if(!re.textureFormatReadable(le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=R.width-ut&&ct>=0&&ct<=R.height-Y&&I.readPixels(J,ct,ut,Y,he.convert(le),he.convert(ce),Ct)}finally{const Vt=j!==null?Nt.get(j).__webglFramebuffer:null;Ft.bindFramebuffer(I.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(R,J,ct,ut,Y,Ct,It){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=Nt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&It!==void 0&&(Gt=Gt[It]),Gt){const Vt=R.texture,le=Vt.format,ce=Vt.type;if(!re.textureFormatReadable(le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(J>=0&&J<=R.width-ut&&ct>=0&&ct<=R.height-Y){Ft.bindFramebuffer(I.FRAMEBUFFER,Gt);const te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,te),I.bufferData(I.PIXEL_PACK_BUFFER,Ct.byteLength,I.STREAM_READ),I.readPixels(J,ct,ut,Y,he.convert(le),he.convert(ce),0);const Ae=j!==null?Nt.get(j).__webglFramebuffer:null;Ft.bindFramebuffer(I.FRAMEBUFFER,Ae);const Re=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await GM(I,Re,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Ct),I.deleteBuffer(te),I.deleteSync(Re),Ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,J=null,ct=0){R.isTexture!==!0&&(Ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),J=arguments[0]||null,R=arguments[1]);const ut=Math.pow(2,-ct),Y=Math.floor(R.image.width*ut),Ct=Math.floor(R.image.height*ut),It=J!==null?J.x:0,Gt=J!==null?J.y:0;U.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,ct,0,0,It,Gt,Y,Ct),Ft.unbindTexture()};const ns=I.createFramebuffer(),Kr=I.createFramebuffer();this.copyTextureToTexture=function(R,J,ct=null,ut=null,Y=0,Ct=null){R.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture function signature has changed."),ut=arguments[0]||null,R=arguments[1],J=arguments[2],Ct=arguments[3]||0,ct=null),Ct===null&&(Y!==0?(Ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Ct=Y,Y=0):Ct=0);let It,Gt,Vt,le,ce,te,Ae,Re,Ye;const Le=R.isCompressedTexture?R.mipmaps[Ct]:R.image;if(ct!==null)It=ct.max.x-ct.min.x,Gt=ct.max.y-ct.min.y,Vt=ct.isBox3?ct.max.z-ct.min.z:1,le=ct.min.x,ce=ct.min.y,te=ct.isBox3?ct.min.z:0;else{const On=Math.pow(2,-Y);It=Math.floor(Le.width*On),Gt=Math.floor(Le.height*On),R.isDataArrayTexture?Vt=Le.depth:R.isData3DTexture?Vt=Math.floor(Le.depth*On):Vt=1,le=0,ce=0,te=0}ut!==null?(Ae=ut.x,Re=ut.y,Ye=ut.z):(Ae=0,Re=0,Ye=0);const ue=he.convert(J.format),ne=he.convert(J.type);let dn;J.isData3DTexture?(U.setTexture3D(J,0),dn=I.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(U.setTexture2DArray(J,0),dn=I.TEXTURE_2D_ARRAY):(U.setTexture2D(J,0),dn=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,J.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,J.unpackAlignment);const we=I.getParameter(I.UNPACK_ROW_LENGTH),Wn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),bi=I.getParameter(I.UNPACK_SKIP_PIXELS),Hn=I.getParameter(I.UNPACK_SKIP_ROWS),xn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Le.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Le.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,le),I.pixelStorei(I.UNPACK_SKIP_ROWS,ce),I.pixelStorei(I.UNPACK_SKIP_IMAGES,te);const Fe=R.isDataArrayTexture||R.isData3DTexture,Gn=J.isDataArrayTexture||J.isData3DTexture;if(R.isDepthTexture){const On=Nt.get(R),en=Nt.get(J),Rn=Nt.get(On.__renderTarget),Bs=Nt.get(en.__renderTarget);Ft.bindFramebuffer(I.READ_FRAMEBUFFER,Rn.__webglFramebuffer),Ft.bindFramebuffer(I.DRAW_FRAMEBUFFER,Bs.__webglFramebuffer);for(let jn=0;jn<Vt;jn++)Fe&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Nt.get(R).__webglTexture,Y,te+jn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Nt.get(J).__webglTexture,Ct,Ye+jn)),I.blitFramebuffer(le,ce,It,Gt,Ae,Re,It,Gt,I.DEPTH_BUFFER_BIT,I.NEAREST);Ft.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ft.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(Y!==0||R.isRenderTargetTexture||Nt.has(R)){const On=Nt.get(R),en=Nt.get(J);Ft.bindFramebuffer(I.READ_FRAMEBUFFER,ns),Ft.bindFramebuffer(I.DRAW_FRAMEBUFFER,Kr);for(let Rn=0;Rn<Vt;Rn++)Fe?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,On.__webglTexture,Y,te+Rn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,On.__webglTexture,Y),Gn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,en.__webglTexture,Ct,Ye+Rn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,en.__webglTexture,Ct),Y!==0?I.blitFramebuffer(le,ce,It,Gt,Ae,Re,It,Gt,I.COLOR_BUFFER_BIT,I.NEAREST):Gn?I.copyTexSubImage3D(dn,Ct,Ae,Re,Ye+Rn,le,ce,It,Gt):I.copyTexSubImage2D(dn,Ct,Ae,Re,le,ce,It,Gt);Ft.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ft.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Gn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(dn,Ct,Ae,Re,Ye,It,Gt,Vt,ue,ne,Le.data):J.isCompressedArrayTexture?I.compressedTexSubImage3D(dn,Ct,Ae,Re,Ye,It,Gt,Vt,ue,Le.data):I.texSubImage3D(dn,Ct,Ae,Re,Ye,It,Gt,Vt,ue,ne,Le):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Ct,Ae,Re,It,Gt,ue,ne,Le.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Ct,Ae,Re,Le.width,Le.height,ue,Le.data):I.texSubImage2D(I.TEXTURE_2D,Ct,Ae,Re,It,Gt,ue,ne,Le);I.pixelStorei(I.UNPACK_ROW_LENGTH,we),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Wn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,bi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Hn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,xn),Ct===0&&J.generateMipmaps&&I.generateMipmap(dn),Ft.unbindTexture()},this.copyTextureToTexture3D=function(R,J,ct=null,ut=null,Y=0){return R.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ct=arguments[0]||null,ut=arguments[1]||null,R=arguments[2],J=arguments[3],Y=arguments[4]||0),Ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,J,ct,ut,Y)},this.initRenderTarget=function(R){Nt.get(R).__webglFramebuffer===void 0&&U.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?U.setTextureCube(R,0):R.isData3DTexture?U.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?U.setTexture2DArray(R,0):U.setTexture2D(R,0),Ft.unbindTexture()},this.resetState=function(){F=0,z=0,j=null,Ft.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ha}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=Oe._getDrawingBufferColorSpace(t),i.unpackColorSpace=Oe._getUnpackColorSpace()}}const j_={type:"change"},Qd={type:"start"},Uv={type:"end"},Ic=new Wd,q_=new qa,dA=Math.cos(70*FM.DEG2RAD),mn=new tt,ti=2*Math.PI,Xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xh=1e-6;class pA extends wS{constructor(t,i=null){super(t,i),this.state=Xe.NONE,this.enabled=!0,this.target=new tt,this.cursor=new tt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Nr.ROTATE,MIDDLE:Nr.DOLLY,RIGHT:Nr.PAN},this.touches={ONE:Lr.ROTATE,TWO:Lr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new tt,this._lastQuaternion=new Ns,this._lastTargetPosition=new tt,this._quat=new Ns().setFromUnitVectors(t.up,new tt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new x_,this._sphericalDelta=new x_,this._scale=1,this._panOffset=new tt,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new tt,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=gA.bind(this),this._onPointerDown=mA.bind(this),this._onPointerUp=_A.bind(this),this._onContextMenu=bA.bind(this),this._onMouseWheel=xA.bind(this),this._onKeyDown=MA.bind(this),this._onTouchStart=SA.bind(this),this._onTouchMove=EA.bind(this),this._onMouseDown=vA.bind(this),this._onMouseMove=yA.bind(this),this._interceptControlDown=TA.bind(this),this._interceptControlUp=AA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(j_),this.update(),this.state=Xe.NONE}update(t=null){const i=this.object.position;mn.copy(i).sub(this.target),mn.applyQuaternion(this._quat),this._spherical.setFromVector3(mn),this.autoRotate&&this.state===Xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=ti:s>Math.PI&&(s-=ti),l<-Math.PI?l+=ti:l>Math.PI&&(l-=ti),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(mn.setFromSpherical(this._spherical),mn.applyQuaternion(this._quatInverse),i.copy(this.target).add(mn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=mn.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),c=!!p}else if(this.object.isOrthographicCamera){const d=new tt(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=p!==this.object.zoom;const m=new tt(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),h=mn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Ic.origin.copy(this.object.position),Ic.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ic.direction))<dA?this.object.lookAt(this.target):(q_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ic.intersectPlane(q_,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Xh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xh||this._lastTargetPosition.distanceToSquared(this.target)>Xh?(this.dispatchEvent(j_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ti/60*this.autoRotateSpeed*t:ti/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){mn.setFromMatrixColumn(i,0),mn.multiplyScalar(-t),this._panOffset.add(mn)}_panUp(t,i){this.screenSpacePanning===!0?mn.setFromMatrixColumn(i,1):(mn.setFromMatrixColumn(i,0),mn.crossVectors(this.object.up,mn)),mn.multiplyScalar(t),this._panOffset.add(mn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;mn.copy(l).sub(this.target);let c=mn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new de,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function mA(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function gA(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function _A(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Uv),this.state=Xe.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function vA(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Nr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Xe.DOLLY;break;case Nr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Xe.ROTATE}break;case Nr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Xe.PAN}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(Qd)}function yA(r){switch(this.state){case Xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function xA(r){this.enabled===!1||this.enableZoom===!1||this.state!==Xe.NONE||(r.preventDefault(),this.dispatchEvent(Qd),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Uv))}function MA(r){this.enabled!==!1&&this._handleKeyDown(r)}function SA(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Lr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Xe.TOUCH_ROTATE;break;case Lr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Xe.TOUCH_PAN;break;default:this.state=Xe.NONE}break;case 2:switch(this.touches.TWO){case Lr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Xe.TOUCH_DOLLY_PAN;break;case Lr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Xe.TOUCH_DOLLY_ROTATE;break;default:this.state=Xe.NONE}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(Qd)}function EA(r){switch(this._trackPointer(r),this.state){case Xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Xe.NONE}}function bA(r){this.enabled!==!1&&r.preventDefault()}function TA(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function AA(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class jc{constructor(t=12345){Dt(this,"perm");Dt(this,"permMod12");this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512),this.reseed(t)}reseed(t){const i=new Uint8Array(256);for(let c=0;c<256;c++)i[c]=c;let s=(t^3735928559)>>>0;const l=()=>{s=s+1831565813>>>0;let c=Math.imul(s^s>>>15,1|s);return c=c+Math.imul(c^c>>>7,61|c)^c,((c^c>>>14)>>>0)/4294967296};for(let c=255;c>0;c--){const h=Math.floor(l()*(c+1)),d=i[c];i[c]=i[h],i[h]=d}for(let c=0;c<512;c++)this.perm[c]=i[c&255],this.permMod12[c]=this.perm[c]%12}noise2D(t,i){const s=.5*(Math.sqrt(3)-1),l=(3-Math.sqrt(3))/6;let c=0,h=0,d=0;const p=(t+i)*s,m=Math.floor(t+p),v=Math.floor(i+p),_=(m+v)*l,x=m-_,S=v-_,E=t-x,b=i-S;let M=0,g=0;E>b?(M=1,g=0):(M=0,g=1);const N=E-M+l,L=b-g+l,w=E-1+2*l,V=b-1+2*l,F=m&255,z=v&255,j=this.permMod12[F+this.perm[z]],D=this.permMod12[F+M+this.perm[z+g]],C=this.permMod12[F+1+this.perm[z+1]];let H=.5-E*E-b*b;H>=0&&(H*=H,c=H*H*this.grad2D(j,E,b));let ht=.5-N*N-L*L;ht>=0&&(ht*=ht,h=ht*ht*this.grad2D(D,N,L));let rt=.5-w*w-V*V;return rt>=0&&(rt*=rt,d=rt*rt*this.grad2D(C,w,V)),70*(c+h+d)}noise3D(t,i,s){const l=.3333333333333333,c=1/6;let h=0,d=0,p=0,m=0;const v=(t+i+s)*l,_=Math.floor(t+v),x=Math.floor(i+v),S=Math.floor(s+v),E=(_+x+S)*c,b=_-E,M=x-E,g=S-E,N=t-b,L=i-M,w=s-g;let V,F,z,j,D,C;N>=L?L>=w?(V=1,F=0,z=0,j=1,D=1,C=0):N>=w?(V=1,F=0,z=0,j=1,D=0,C=1):(V=0,F=0,z=1,j=1,D=0,C=1):L<w?(V=0,F=0,z=1,j=0,D=1,C=1):N<w?(V=0,F=1,z=0,j=0,D=1,C=1):(V=0,F=1,z=0,j=1,D=1,C=0);const H=N-V+c,ht=L-F+c,rt=w-z+c,yt=N-j+2*c,ft=L-D+2*c,P=w-C+2*c,X=N-1+3*c,q=L-1+3*c,St=w-1+3*c,At=_&255,O=x&255,et=S&255,Mt=this.permMod12[At+this.perm[O+this.perm[et]]],Z=this.permMod12[At+V+this.perm[O+F+this.perm[et+z]]],pt=this.permMod12[At+j+this.perm[O+D+this.perm[et+C]]],k=this.permMod12[At+1+this.perm[O+1+this.perm[et+1]]];let G=.6-N*N-L*L-w*w;G>=0&&(G*=G,h=G*G*this.grad3D(Mt,N,L,w));let ot=.6-H*H-ht*ht-rt*rt;ot>=0&&(ot*=ot,d=ot*ot*this.grad3D(Z,H,ht,rt));let st=.6-yt*yt-ft*ft-P*P;st>=0&&(st*=st,p=st*st*this.grad3D(pt,yt,ft,P));let Rt=.6-X*X-q*q-St*St;return Rt>=0&&(Rt*=Rt,m=Rt*Rt*this.grad3D(k,X,q,St)),32*(h+d+p+m)}fbm2D(t,i,s=5,l=2,c=.5){let h=0,d=1,p=1,m=0;for(let v=0;v<s;v++)h+=this.noise2D(t*p,i*p)*d,m+=d,d*=c,p*=l;return h/m}ridgedFBM2D(t,i,s=5,l=2,c=.5){let h=0,d=1,p=1,m=1;for(let v=0;v<s;v++){let _=1-Math.abs(this.noise2D(t*p,i*p));_=_*_,h+=_*d*m,m=Math.min(1,_*2),d*=c,p*=l}return h}fbm3D(t,i,s,l=4){let c=0,h=1,d=1,p=0;for(let m=0;m<l;m++)c+=this.noise3D(t*d,i*d,s*d)*h,p+=h,h*=.5,d*=2;return c/p}grad2D(t,i,s){const l=t&7,c=l<4?i:s,h=l<4?s:i;return(l&1?-c:c)+(l&2?-2*h:2*h)}grad3D(t,i,s,l){const c=t&15,h=c<8?i:s,d=c<4?s:c===12||c===14?i:l;return((c&1)===0?h:-h)+((c&2)===0?d:-d)}}var Ut=(r=>(r[r.AIR=0]="AIR",r[r.GRASS=1]="GRASS",r[r.GRASS_DARK=2]="GRASS_DARK",r[r.DIRT=3]="DIRT",r[r.STONE=4]="STONE",r[r.STONE_DARK=5]="STONE_DARK",r[r.STONE_MOSS=6]="STONE_MOSS",r[r.SNOW=7]="SNOW",r[r.ICE=8]="ICE",r[r.SAND=9]="SAND",r[r.GRAVEL=10]="GRAVEL",r[r.WOOD_TRUNK=11]="WOOD_TRUNK",r[r.WOOD_BIRCH=12]="WOOD_BIRCH",r[r.LEAVES_PINE=13]="LEAVES_PINE",r[r.LEAVES_OAK=14]="LEAVES_OAK",r[r.LEAVES_SAKURA=15]="LEAVES_SAKURA",r[r.WATER=16]="WATER",r[r.WATER_FALL=17]="WATER_FALL",r[r.CLOUD=18]="CLOUD",r[r.FLOWER_RED=19]="FLOWER_RED",r[r.FLOWER_YELLOW=20]="FLOWER_YELLOW",r[r.FLOWER_BLUE=21]="FLOWER_BLUE",r[r.WOOD_PLANK=22]="WOOD_PLANK",r[r.LANTERN=23]="LANTERN",r))(Ut||{});class RA{constructor(t=1337){Dt(this,"noise");Dt(this,"detailNoise");Dt(this,"biomeNoise");this.noise=new jc(t),this.detailNoise=new jc(t+999),this.biomeNoise=new jc(t+54321)}setSeed(t){this.noise.reseed(t),this.detailNoise.reseed(t+999),this.biomeNoise.reseed(t+54321)}generate(t){const i=t.gridSize,s=t.terrainHeight,l=t.waterLevel,c=new Uint8Array(i*s*i),h=new Int16Array(i*i),d=[],p=[],m=(k,G,ot)=>G*i*i+ot*i+k,v=(k,G,ot)=>k>=0&&k<i&&G>=0&&G<s&&ot>=0&&ot<i,_=(k,G,ot,st)=>{v(k,G,ot)&&(c[m(k,G,ot)]=st)},x=(k,G,ot)=>v(k,G,ot)?c[m(k,G,ot)]:Ut.AIR,S=Math.floor(i*.38),E=Math.floor(i*.4),b=Math.min(s-4,74),M=[{x:Math.floor(i*.68),z:Math.floor(i*.3),h:60,r:i*.35},{x:Math.floor(i*.24),z:Math.floor(i*.68),h:54,r:i*.32},{x:Math.floor(i*.76),z:Math.floor(i*.72),h:48,r:i*.38},{x:Math.floor(i*.46),z:Math.floor(i*.85),h:42,r:i*.28}],g=Math.floor(i*.63),N=Math.floor(i*.65),L=Math.floor(i*.36);for(let k=0;k<i;k++)for(let G=0;G<i;G++){const ot=G/i,st=k/i,Rt=this.noise.fbm2D(ot*2.2,st*2.2,4,2,.5),$t=this.noise.ridgedFBM2D(ot*3+1.2,st*3+1.2,5,2.1,.55),Kt=this.detailNoise.noise2D(ot*8,st*8)*.08,ie=Math.hypot(G-S,k-E)/(i*.45),I=Math.max(0,1-Math.pow(Math.min(1,ie),1.5));let pe=0;for(const bt of M){const _t=Math.hypot(G-bt.x,k-bt.z)/bt.r,Wt=Math.max(0,1-Math.pow(Math.min(1,_t),1.6));pe=Math.max(pe,Wt*(bt.h/b))}const Qt=Math.hypot(G-g,k-N)/L,re=this.detailNoise.noise2D(ot*5.5,st*5.5)*.12,Ft=Qt+re,Yt=Math.max(0,1-Math.min(1,Ft));let Nt=Rt*.25+$t*.75+Kt;const U=Math.max(I,pe*.85);Nt=(Nt*.35+.65)*U;const T=Math.max(0,.16+Rt*.12-Yt*.38);let nt=Math.max(T,Nt);Yt>0&&(nt=nt*(1-Math.pow(Yt,1.2)*.92));let mt=Math.floor(l+nt*(b-l+6));if(Ft<.82){const bt=Math.sin((1-Ft/.82)*(Math.PI/2)),_t=Math.floor(bt*8)+1;mt=Math.max(4,Math.min(mt,l-_t))}mt=Math.max(3,Math.min(s-2,mt)),h[k*i+G]=mt}const w=S+6,V=E+5,F=58;for(let k=-5;k<=5;k++)for(let G=-5;G<=5;G++){const ot=w+G,st=V+k,Rt=Math.hypot(G,k);if(Rt<=4.8&&v(ot,0,st)){const $t=Rt<=2.2?3:Rt<=3.8?2:1;h[st*i+ot]=Math.min(h[st*i+ot],F-$t)}}d.push({x:w,y:F,z:V,type:"source",width:4});const z=Math.floor(w+(g-w)*.42),j=Math.floor(V+(N-V)*.42),D=38;for(let k=-6;k<=6;k++)for(let G=-6;G<=6;G++){const ot=z+G,st=j+k,Rt=Math.hypot(G,k);if(Rt<=5.2&&v(ot,0,st)){const $t=Rt<=2.5?3:Rt<=4.2?2:1;h[st*i+ot]=Math.min(h[st*i+ot],D-$t)}}d.push({x:z,y:D,z:j,type:"pool",width:5});const C=Math.floor(z+(g-z)*.68),H=Math.floor(j+(N-j)*.68);for(let k=-6;k<=6;k++)for(let G=-6;G<=6;G++){const ot=C+G,st=H+k,Rt=Math.hypot(G,k);if(Rt<=5.5&&v(ot,0,st)){const $t=Rt<=2.8?6:Rt<=4.5?4:2;h[st*i+ot]=Math.min(h[st*i+ot],l-$t)}}const ht=(k,G,ot,st,Rt,$t,Kt)=>{const ie=Math.max(1,Math.floor(Math.hypot(st-k,Rt-G)*1.5));for(let I=0;I<=ie;I++){const pe=I/ie,Qt=Math.round(k+(st-k)*pe),re=Math.round(G+(Rt-G)*pe),Ft=Math.round(ot+($t-ot)*pe);for(let Yt=-Kt;Yt<=Kt;Yt++)for(let Nt=-Kt;Nt<=Kt;Nt++){const U=Qt+Nt,T=re+Yt,nt=Math.hypot(Nt,Yt);if(nt<=Kt+.5&&v(U,0,T)){const mt=Ft-(nt<=1.2?2:1);h[T*i+U]>mt&&(h[T*i+U]=Math.max(l-1,mt))}}}};ht(w,V,F,z,j,D,3),ht(z,j,D,C,H,l-1,4),ht(C,H,l-2,g,N,l-4,6);for(let k=0;k<i;k++)for(let G=0;G<i;G++){const ot=h[k*i+G];_(G,0,k,Ut.STONE_DARK);for(let st=1;st<=ot;st++){const Rt=ot-st,$t=v(G-1,0,k)?h[k*i+(G-1)]:ot,Kt=v(G+1,0,k)?h[k*i+(G+1)]:ot,ie=v(G,0,k-1)?h[(k-1)*i+G]:ot,I=v(G,0,k+1)?h[(k+1)*i+G]:ot,pe=Math.max(Math.abs(Kt-$t),Math.abs(I-ie)),Qt=Math.hypot(G-w,k-V),re=Math.hypot(G-z,k-j),Ft=Math.hypot(G-C,k-H),Yt=Qt<8||re<8||Ft<8;Rt===0?st<l-1?_(G,st,k,(G+k)%3===0?Ut.GRAVEL:Ut.SAND):st<=l+1?_(G,st,k,pe>2?Ut.GRAVEL:Ut.SAND):st>=54?st>=64||st>=56&&pe<3?_(G,st,k,Ut.SNOW):_(G,st,k,(G+st+k)%4===0?Ut.ICE:Ut.STONE):st>=38?pe>=3?_(G,st,k,(G+st)%2===0?Ut.STONE_DARK:Ut.STONE):Yt?_(G,st,k,Ut.STONE_MOSS):st<46&&(G*7+k*13)%11>4?_(G,st,k,Ut.GRASS_DARK):_(G,st,k,Ut.STONE):pe>=3?_(G,st,k,(G+k)%4===0?Ut.STONE_MOSS:Ut.STONE):Yt?_(G,st,k,Ut.STONE_MOSS):_(G,st,k,(G*3+k*5)%7===0?Ut.GRASS_DARK:Ut.GRASS):Rt<=3?ot>=54?_(G,st,k,Ut.STONE):ot<=l+1?_(G,st,k,Ut.SAND):pe>=3?_(G,st,k,Ut.STONE):_(G,st,k,Ut.DIRT):_(G,st,k,(G+st+k)%6===0?Ut.STONE_DARK:Ut.STONE)}if(ot<l)for(let st=ot+1;st<=l;st++)_(G,st,k,Ut.WATER)}for(let k=-5;k<=5;k++)for(let G=-5;G<=5;G++){const ot=w+G,st=V+k;if(Math.hypot(G,k)<=4.2&&v(ot,0,st)){const $t=h[st*i+ot];for(let Kt=$t+1;Kt<=F;Kt++)_(ot,Kt,st,Ut.WATER)}}for(let k=-6;k<=6;k++)for(let G=-6;G<=6;G++){const ot=z+G,st=j+k;if(Math.hypot(G,k)<=4.8&&v(ot,0,st)){const $t=h[st*i+ot];for(let Kt=$t+1;Kt<=D;Kt++)_(ot,Kt,st,Ut.WATER)}}const rt=(k,G,ot,st,Rt,$t,Kt)=>{const ie=Math.max(1,Math.floor(Math.hypot(st-k,Rt-G)*1.8));let I=ot;for(let pe=0;pe<=ie;pe++){const Qt=pe/ie,re=Math.round(k+(st-k)*Qt),Ft=Math.round(G+(Rt-G)*Qt),Yt=Math.round(ot+($t-ot)*Qt);(pe===0||pe===ie||pe%6===0)&&d.push({x:re,y:Yt,z:Ft,type:Yt<=l+2||pe===ie?"splash":"drop",width:Kt});for(let Nt=-Kt;Nt<=Kt;Nt++)for(let U=-Kt;U<=Kt;U++){const T=re+U,nt=Ft+Nt;if(Math.hypot(U,Nt)<=Kt+.3&&v(T,0,nt)){const bt=h[nt*i+T],_t=Math.max(Yt,I),Wt=Math.max(bt+1,Yt-1);for(let Lt=Wt;Lt<=_t;Lt++)v(T,Lt,nt)&&_(T,Lt,nt,Ut.WATER_FALL)}}I=Yt}};rt(w,V,F,z,j,D,3),rt(z,j,D,C,H,l,4);const yt=Math.floor(i*.7),ft=Math.floor(i*.36),P=48,X=Math.floor(g+6),q=Math.floor(N-10);ht(yt,ft,P,X,q,l-1,3),rt(yt,ft,P,X,q,l,2),d.push({x:C,y:l,z:H,type:"splash",width:5}),d.push({x:X,y:l,z:q,type:"splash",width:3});const St=t.treeDensity??.85;for(let k=6;k<i-6;k+=3)for(let G=6;G<i-6;G+=3){const ot=G+(G*17+k*31)%3-1,st=k+(G*23+k*13)%3-1;if(!v(ot,0,st))continue;const Rt=h[st*i+ot],$t=x(ot,Rt,st),Kt=x(ot,Rt+1,st);if(Kt===Ut.WATER||Kt===Ut.WATER_FALL||!($t===Ut.GRASS||$t===Ut.GRASS_DARK)||Rt<=l+1||Rt>=50)continue;const I=h[st*i+(ot-1)],pe=h[st*i+(ot+1)],Qt=h[(st-1)*i+ot],re=h[(st+1)*i+ot];if(Math.max(Math.abs(pe-I),Math.abs(re-Qt))>1)continue;const Ft=(ot*73+st*137+t.seed)%100/100;if(Ft<.28*St){let Yt="oak";Rt>=32?Yt="pine":Math.hypot(ot-w,st-V)<32||Math.hypot(ot-g,st-N)<28?Yt=(ot+st)%3===0?"sakura":"oak":(ot+st)%5===0&&(Yt="birch");const Nt=Yt==="pine"?6+(ot+st)%3:4+(ot+st)%2;p.push({x:ot,y:Rt+1,z:st,type:Yt,height:Nt}),this.buildVoxelTree(c,i,s,ot,Rt+1,st,Yt,Nt)}else if(Ft<.65){const Yt=(ot*13+st*47)%3===0?Ut.FLOWER_RED:(ot*29+st*19)%3===0?Ut.FLOWER_YELLOW:Ut.FLOWER_BLUE;_(ot,Rt+1,st,Yt)}}const At=Math.floor(g-16),O=Math.floor(N+4),et=10,Mt=3,Z=l+1;for(let k=0;k<et;k++)for(let G=0;G<Mt;G++){const ot=At+k,st=O+G;if(v(ot,Z,st)&&(_(ot,Z,st,Ut.WOOD_PLANK),k===0||k===4||k===et-1)){const Rt=h[st*i+ot];for(let $t=Z-1;$t>=Math.max(1,Rt);$t--)_(ot,$t,st,Ut.WOOD_TRUNK)}}const pt=At+et-1;return _(pt,Z+1,O,Ut.WOOD_TRUNK),_(pt,Z+2,O,Ut.LANTERN),_(pt,Z+1,O+Mt-1,Ut.WOOD_TRUNK),_(pt,Z+2,O+Mt-1,Ut.LANTERN),{gridSize:i,height:s,voxels:c,heightMap:h,waterfallPoints:d,trees:p,waterLevel:l,mainPeakPos:{x:S,y:b,z:E}}}buildVoxelTree(t,i,s,l,c,h,d,p){const m=(E,b,M)=>b*i*i+M*i+E,v=(E,b,M)=>E>=0&&E<i&&b>=0&&b<s&&M>=0&&M<i,_=(E,b,M,g)=>{v(E,b,M)&&(t[m(E,b,M)]=g)},x=d==="birch"?Ut.WOOD_BIRCH:Ut.WOOD_TRUNK,S=d==="pine"?Ut.LEAVES_PINE:d==="sakura"?Ut.LEAVES_SAKURA:Ut.LEAVES_OAK;for(let E=0;E<p;E++)_(l,c+E,h,x);if(d==="pine"){const E=c+p;_(l,E+1,h,S),_(l,E,h,S);const b=[{dy:0,r:1},{dy:-1,r:2},{dy:-2,r:1},{dy:-3,r:3},{dy:-4,r:2}];for(const M of b){const g=E+M.dy;for(let N=-M.r;N<=M.r;N++)for(let L=-M.r;L<=M.r;L++)Math.abs(L)+Math.abs(N)<=M.r+.5&&(L!==0||N!==0)&&_(l+L,g,h+N,S)}}else{const E=c+p,b=d==="sakura"?3:2;for(let M=-1;M<=2;M++){const g=M===2?b-1:b;for(let N=-g;N<=g;N++)for(let L=-g;L<=g;L++)Math.hypot(L,M*.8,N)<=b+.4&&(L!==0||N!==0||M>=0)&&_(l+L,E+M,h+N,S)}}}}const CA={[Ut.AIR]:0,[Ut.GRASS]:6000178,[Ut.GRASS_DARK]:4748584,[Ut.DIRT]:8806467,[Ut.STONE]:8159880,[Ut.STONE_DARK]:5922919,[Ut.STONE_MOSS]:6189138,[Ut.SNOW]:15791615,[Ut.ICE]:13822711,[Ut.SAND]:14468758,[Ut.GRAVEL]:9407623,[Ut.WOOD_TRUNK]:5914150,[Ut.WOOD_BIRCH]:14604494,[Ut.LEAVES_PINE]:2575917,[Ut.LEAVES_OAK]:4028966,[Ut.LEAVES_SAKURA]:16557513,[Ut.WATER]:2726870,[Ut.WATER_FALL]:7198202,[Ut.CLOUD]:16777215,[Ut.FLOWER_RED]:14692657,[Ut.FLOWER_YELLOW]:16565273,[Ut.FLOWER_BLUE]:3382e3,[Ut.WOOD_PLANK]:11041096,[Ut.LANTERN]:16765286},Od={dawn:{name:"晨曦 (Dawn)",skyTopColor:4865899,skyBottomColor:16752762,fogColor:16560788,sunColor:16756860,sunIntensity:1.6,ambientColor:8020858,ambientIntensity:.7,sunPosition:[120,35,-100],cloudTint:16765636,waterColor:2850984,waterEmissive:662308},day:{name:"晴空 (Day)",skyTopColor:4957155,skyBottomColor:11919608,fogColor:13297914,sunColor:16775912,sunIntensity:2.2,ambientColor:9354203,ambientIntensity:.9,sunPosition:[80,140,60],cloudTint:16777215,waterColor:2726870,waterEmissive:533818},sunset:{name:"晚霞 (Sunset)",skyTopColor:2894680,skyBottomColor:15359811,fogColor:14251090,sunColor:16743225,sunIntensity:2,ambientColor:7883350,ambientIntensity:.65,sunPosition:[-130,25,80],cloudTint:16757642,waterColor:8210794,waterEmissive:2492950},night:{name:"月夜 (Night)",skyTopColor:396056,skyBottomColor:1187123,fogColor:923432,sunColor:9680872,sunIntensity:.8,ambientColor:2043469,ambientIntensity:.45,sunPosition:[-70,110,-80],cloudTint:8097448,waterColor:1258573,waterEmissive:332576},fantasy:{name:"极光幻境 (Fantasy Aurora)",skyTopColor:1181739,skyBottomColor:1722713,fogColor:1590090,sunColor:6222520,sunIntensity:1.5,ambientColor:5188968,ambientIntensity:.8,sunPosition:[50,90,-110],cloudTint:11466720,waterColor:2074267,waterEmissive:473911}},wA=[[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]],DA=[1,.55,.88,.88,.78,.78],LA=[[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]],UA=[[[[-1,1,0],[0,1,1],[-1,1,1]],[[1,1,0],[0,1,1],[1,1,1]],[[1,1,0],[0,1,-1],[1,1,-1]],[[-1,1,0],[0,1,-1],[-1,1,-1]]],[[[-1,-1,0],[0,-1,-1],[-1,-1,-1]],[[1,-1,0],[0,-1,-1],[1,-1,-1]],[[1,-1,0],[0,-1,1],[1,-1,1]],[[-1,-1,0],[0,-1,1],[-1,-1,1]]],[[[-1,0,1],[0,-1,1],[-1,-1,1]],[[1,0,1],[0,-1,1],[1,-1,1]],[[1,0,1],[0,1,1],[1,1,1]],[[-1,0,1],[0,1,1],[-1,1,1]]],[[[1,0,-1],[0,-1,-1],[1,-1,-1]],[[-1,0,-1],[0,-1,-1],[-1,-1,-1]],[[-1,0,-1],[0,1,-1],[-1,1,-1]],[[1,0,-1],[0,1,-1],[1,1,-1]]],[[[1,0,1],[1,-1,0],[1,-1,1]],[[1,0,-1],[1,-1,0],[1,-1,-1]],[[1,0,-1],[1,1,0],[1,1,-1]],[[1,0,1],[1,1,0],[1,1,1]]],[[[-1,0,-1],[-1,-1,0],[-1,-1,-1]],[[-1,0,1],[-1,-1,0],[-1,-1,1]],[[-1,0,1],[-1,1,0],[-1,1,1]],[[-1,0,-1],[-1,1,0],[-1,1,-1]]]];class NA{constructor(){Dt(this,"solidMaterial");Dt(this,"waterMaterial");Dt(this,"lanternMaterial");this.solidMaterial=new Xc({vertexColors:!0,roughness:.82,metalness:.05,flatShading:!0,side:ma}),this.waterMaterial=new Xc({vertexColors:!0,roughness:.1,metalness:.15,transparent:!0,opacity:.85,flatShading:!0,depthWrite:!0,side:Mi}),this.lanternMaterial=new Xc({color:16765286,emissive:16755234,emissiveIntensity:2.2,roughness:.2,flatShading:!0})}build(t){const{gridSize:i,height:s,voxels:l}=t,c=i/2,h=(ft,P,X)=>P*i*i+X*i+ft,d=(ft,P,X)=>ft>=0&&ft<i&&P>=0&&P<s&&X>=0&&X<i,p=(ft,P,X)=>d(ft,P,X)?l[h(ft,P,X)]:Ut.AIR,m=ft=>ft===Ut.WATER||ft===Ut.WATER_FALL,v=ft=>ft!==Ut.AIR&&!m(ft)&&ft!==Ut.CLOUD,_=(ft,P,X)=>{const q=p(ft,P,X);return v(q)},x=[],S=[],E=[],b=[],M=[],g=[],N=[],L=[],w=[],V=[],F=[],z=[];let j=0,D=0;const C=new xe;for(let ft=0;ft<s;ft++)for(let P=0;P<i;P++)for(let X=0;X<i;X++){const q=p(X,ft,P);if(q===Ut.AIR||q===Ut.CLOUD)continue;j++;const St=m(q),At=q===Ut.WATER_FALL,O=q===Ut.LANTERN;let et=CA[q]||16777215;At?et=(X+ft+P)%7===0?14743546:46296:St&&(et=(X+P)%5===0?165063:223649),C.setHex(et);for(let Mt=0;Mt<6;Mt++){const[Z,pt,k]=wA[Mt],G=X+Z,ot=ft+pt,st=P+k,Rt=p(G,ot,st);let $t=!1;if(St?$t=Rt===Ut.AIR||Rt===Ut.CLOUD:$t=!v(Rt),!$t)continue;D++;const Kt=St?M:O?w:x,ie=St?g:O?V:S,I=St?N:O?F:E,pe=St?L:O?z:b,Qt=Kt.length/3,re=LA[Mt],Ft=DA[Mt];for(let Yt=0;Yt<4;Yt++){const[Nt,U,T]=re[Yt],nt=X+Nt-c,mt=ft+U,bt=P+T-c;Kt.push(nt,mt,bt),ie.push(Z,pt,k);let _t=1;if(!O){const[ve,wt,kt]=UA[Mt][Yt],Jt=_(X+ve[0],ft+ve[1],P+ve[2]),qt=_(X+wt[0],ft+wt[1],P+wt[2]),Ht=_(X+kt[0],ft+kt[1],P+kt[2]);let ae=(Jt?1:0)+(qt?1:0);(Jt||qt)&&Ht&&(ae+=1),_t=[1,.82,.62,.45][ae]}const Wt=C.r*Ft*_t,Lt=C.g*Ft*_t,Xt=C.b*Ft*_t;I.push(Wt,Lt,Xt)}pe.push(Qt,Qt+1,Qt+2,Qt,Qt+2,Qt+3)}}const H=(ft,P,X,q,St,At=!0,O=!0)=>{const et=new bn;et.setAttribute("position",new Fn(ft,3)),et.setAttribute("normal",new Fn(P,3)),et.setAttribute("color",new Fn(X,3)),et.setIndex(q),et.computeVertexNormals();const Mt=new En(et,St);return Mt.castShadow=At,Mt.receiveShadow=O,Mt},ht=H(x,S,E,b,this.solidMaterial,!0,!0),rt=H(M,g,N,L,this.waterMaterial,!1,!0),yt=H(w,V,F,z,this.lanternMaterial,!1,!1);return{solidMesh:ht,waterMesh:rt,lanternMesh:yt,voxelCount:j,faceCount:D}}getSolidMaterial(){return this.solidMaterial}getWaterMaterial(){return this.waterMaterial}}class OA{constructor(){Dt(this,"group");Dt(this,"splashGeometry");Dt(this,"splashMaterial");Dt(this,"splashPoints");Dt(this,"mistGeometry");Dt(this,"mistMaterial");Dt(this,"mistPoints");Dt(this,"particles",[]);Dt(this,"impactPoints",[]);Dt(this,"waterfallPoints",[]);Dt(this,"maxParticles",650);Dt(this,"maxMist",450);Dt(this,"flowSpeed",1);Dt(this,"time",0);Dt(this,"rippleGroup");Dt(this,"ripples",[]);Dt(this,"windVector",new tt(.6,0,.3));this.group=new Za,this.rippleGroup=new Za,this.group.add(this.rippleGroup),this.splashGeometry=new bn;const t=new Float32Array(this.maxParticles*3),i=new Float32Array(this.maxParticles*3),s=new Float32Array(this.maxParticles);this.splashGeometry.setAttribute("position",new $e(t,3)),this.splashGeometry.setAttribute("color",new $e(i,3)),this.splashGeometry.setAttribute("size",new $e(s,1));const l=document.createElement("canvas");l.width=16,l.height=16;const c=l.getContext("2d");c.fillStyle="#ffffff",c.fillRect(2,2,12,12);const h=new $o(l);h.magFilter=Un,h.minFilter=Un,this.splashMaterial=new $a({size:1.2,map:h,transparent:!0,opacity:.9,vertexColors:!0,depthWrite:!1,blending:Qa}),this.splashPoints=new da(this.splashGeometry,this.splashMaterial),this.group.add(this.splashPoints),this.mistGeometry=new bn;const d=new Float32Array(this.maxMist*3),p=new Float32Array(this.maxMist*3);this.mistGeometry.setAttribute("position",new $e(d,3)),this.mistGeometry.setAttribute("color",new $e(p,3));const m=document.createElement("canvas");m.width=32,m.height=32;const v=m.getContext("2d"),_=v.createRadialGradient(16,16,2,16,16,15);_.addColorStop(0,"rgba(240, 252, 255, 0.85)"),_.addColorStop(.5,"rgba(210, 245, 255, 0.45)"),_.addColorStop(1,"rgba(200, 240, 255, 0)"),v.fillStyle=_,v.fillRect(0,0,32,32);const x=new $o(m);this.mistMaterial=new $a({size:3.8,map:x,transparent:!0,opacity:.45,vertexColors:!0,depthWrite:!1,blending:Ko}),this.mistPoints=new da(this.mistGeometry,this.mistMaterial),this.group.add(this.mistPoints);for(let S=0;S<this.maxParticles;S++)this.particles.push({x:0,y:-100,z:0,vx:0,vy:0,vz:0,life:0,maxLife:1,size:1,color:new xe(13693183),type:"droplet",dropEnergy:1})}setup(t,i){this.waterfallPoints=t.waterfallPoints,this.flowSpeed=i.waterfallFlowSpeed||1,this.impactPoints=[];const s=t.gridSize/2;for(const l of this.waterfallPoints)if(l.type==="splash"||l.type==="drop"||l.type==="pool"){const c=Math.max(8,l.y-t.waterLevel),h=Math.sqrt(c)*.45;this.impactPoints.push({x:l.x-s+.5,y:l.y+.5,z:l.z-s+.5,dropHeight:c,intensity:h})}for(const l of this.particles)l.life=0,l.y=-100;for(;this.rippleGroup.children.length>0;)this.rippleGroup.remove(this.rippleGroup.children[0]);this.ripples=[]}update(t,i){this.time+=t*this.flowSpeed;const s=i.splashParticleCount??1.2,l=this.splashGeometry.attributes.position,c=this.splashGeometry.attributes.color,h=this.mistGeometry.attributes.position,d=this.mistGeometry.attributes.color,p=l.array,m=c.array,v=h.array,_=d.array;let x=0;const S=9.81*1.6,E=.94,b=1.8;for(let M=0;M<this.particles.length;M++){const g=this.particles[M];if(g.life>0){g.life-=t,g.type==="droplet"?(g.vy-=S*t,g.vx*=E,g.vz*=E,g.x+=g.vx*t*15,g.y+=g.vy*t*15,g.z+=g.vz*t*15):(g.vy+=b*t*.8,g.x+=(g.vx+this.windVector.x*.8)*t*12,g.y+=g.vy*t*12,g.z+=(g.vz+this.windVector.z*.8)*t*12,g.vx*=.92,g.vz*=.92);const N=1-g.life/g.maxLife,L=Math.max(0,1-N);p[M*3]=g.x,p[M*3+1]=g.y,p[M*3+2]=g.z,m[M*3]=g.color.r*L,m[M*3+1]=g.color.g*L,m[M*3+2]=g.color.b*L,g.type==="mist"&&x<this.maxMist&&(v[x*3]=g.x,v[x*3+1]=g.y+.3,v[x*3+2]=g.z,_[x*3]=.92*L,_[x*3+1]=.96*L,_[x*3+2]=1*L,x++)}else if(this.impactPoints.length>0&&Math.random()<.32*s){const N=this.impactPoints[Math.floor(Math.random()*this.impactPoints.length)],L=Math.random()<.48;g.type=L?"mist":"droplet",g.dropEnergy=N.intensity;const w=L?2.5:1.8;g.x=N.x+(Math.random()-.5)*w,g.y=N.y+Math.random()*.4,g.z=N.z+(Math.random()-.5)*w;const V=Math.random()*Math.PI*2,F=(.25+Math.random()*.45)*Math.PI,z=(L?.35:1.35)*N.intensity*(.85+Math.random()*.5);g.vx=Math.cos(V)*Math.cos(F)*z,g.vy=Math.sin(F)*z*(L?.6:1.4),g.vz=Math.sin(V)*Math.cos(F)*z,g.maxLife=L?2.2+Math.random()*1.4:.65+Math.random()*.55,g.life=g.maxLife,g.size=L?3.6:1.2,L?g.color.setHex(15268095):g.color.setHex(Math.random()<.65?16777215:7395071),N.intensity>=1.8&&Math.random()<.1&&this.spawnRipple(N.x,N.y,N.z,N.intensity)}else p[M*3+1]=-100}for(let M=x;M<this.maxMist;M++)v[M*3+1]=-100;l.needsUpdate=!0,c.needsUpdate=!0,h.needsUpdate=!0,d.needsUpdate=!0,this.updateRipples(t)}spawnRipple(t,i,s,l){if(this.ripples.length>15)return;const c=new Yd(.35,.75,8);c.rotateX(-Math.PI/2);const h=new Jo({color:15464703,transparent:!0,opacity:.7,side:Mi,depthWrite:!1}),d=new En(c,h);d.position.set(t,i+.05,s),this.rippleGroup.add(d),this.ripples.push({mesh:d,life:1.6,maxLife:1.6,startScale:.5,maxScale:2.2+l*.9})}updateRipples(t){for(let i=this.ripples.length-1;i>=0;i--){const s=this.ripples[i];if(s.life-=t,s.life<=0)this.rippleGroup.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose(),this.ripples.splice(i,1);else{const l=1-s.life/s.maxLife,c=s.startScale+(s.maxScale-s.startScale)*l;s.mesh.scale.set(c,1,c),s.mesh.material.opacity=.7*Math.pow(1-l,1.4)}}}getGroup(){return this.group}destroy(){for(;this.group.children.length>0;)this.group.remove(this.group.children[0]);this.splashGeometry.dispose(),this.splashMaterial.dispose(),this.mistGeometry.dispose(),this.mistMaterial.dispose();for(const t of this.ripples)t.mesh.geometry.dispose(),t.mesh.material.dispose();this.ripples=[]}}class PA{constructor(t=8888){Dt(this,"group");Dt(this,"cloudMesh",null);Dt(this,"mistParticles",null);Dt(this,"noise");Dt(this,"cloudAltitude",40);Dt(this,"cloudSpeed",1);Dt(this,"worldSize",144);Dt(this,"cloudInstances",[]);Dt(this,"dummy",new _n);Dt(this,"cloudMaterial");this.group=new Za,this.noise=new jc(t),this.cloudMaterial=new Xc({color:16777215,transparent:!0,opacity:.88,roughness:.85,metalness:0,flatShading:!0,depthWrite:!0})}setup(t){for(;this.group.children.length>0;){const h=this.group.children[0];this.group.remove(h),(h instanceof Oh||h instanceof En)&&h.geometry.dispose()}this.worldSize=t.gridSize,this.cloudAltitude=t.cloudAltitude||40,this.cloudSpeed=t.cloudSpeed||1;const i=t.cloudThickness||3,s=.52-(t.cloudDensity??.5)*.22;this.cloudInstances=[];const l=this.worldSize,c=2;for(let h=-l*.65;h<l*.65;h+=c)for(let d=-l*.65;d<l*.65;d+=c){const p=(d+l)/80,m=(h+l)/80,v=this.noise.fbm2D(p,m,3,2,.5),_=this.noise.noise2D(p*2.5,m*2.5)*.25,x=v+_;if(x>s){const S=Math.floor(this.noise.noise2D(p*4,m*4)*i),E=this.cloudAltitude+S;this.cloudInstances.push({x:d,y:E,z:h,scaleY:1.8+Math.abs(x-s)*3}),x>s+.16&&this.cloudInstances.push({x:d,y:E+2,z:h,scaleY:1.4})}}if(this.cloudInstances.length>0){const h=new zs(c,1.6,c);this.cloudMesh=new Oh(h,this.cloudMaterial,this.cloudInstances.length),this.cloudMesh.castShadow=!0,this.cloudMesh.receiveShadow=!0,this.updateInstancesTransform(),this.group.add(this.cloudMesh)}this.setupMountainMist(l),this.updateLighting(t.timeOfDay)}setupMountainMist(t){const s=new bn,l=new Float32Array(600);for(let h=0;h<200;h++)l[h*3]=(Math.random()-.5)*t*.95,l[h*3+1]=this.cloudAltitude-4+Math.random()*12,l[h*3+2]=(Math.random()-.5)*t*.95;s.setAttribute("position",new $e(l,3));const c=new $a({size:5.5,color:16777215,transparent:!0,opacity:.35,depthWrite:!1,blending:Qa});this.mistParticles=new da(s,c),this.group.add(this.mistParticles)}update(t,i){const s=(i.cloudSpeed??1)*t*2.5,l=this.worldSize*.65;for(const c of this.cloudInstances)c.x+=s*.8,c.z+=s*.4,c.x>l&&(c.x=-l),c.z>l&&(c.z=-l);if(this.updateInstancesTransform(),this.mistParticles){const c=this.mistParticles.geometry.attributes.position,h=c.array;for(let d=0;d<h.length/3;d++)h[d*3]+=s*.5,h[d*3+2]+=s*.25,h[d*3]>l&&(h[d*3]=-l),h[d*3+2]>l&&(h[d*3+2]=-l);c.needsUpdate=!0}}updateInstancesTransform(){if(this.cloudMesh){for(let t=0;t<this.cloudInstances.length;t++){const i=this.cloudInstances[t];this.dummy.position.set(i.x,i.y,i.z),this.dummy.scale.set(1,i.scaleY,1),this.dummy.updateMatrix(),this.cloudMesh.setMatrixAt(t,this.dummy.matrix)}this.cloudMesh.instanceMatrix.needsUpdate=!0}}updateLighting(t){const i=Od[t];i&&this.cloudMaterial&&(this.cloudMaterial.color.setHex(i.cloudTint),t==="night"?this.cloudMaterial.opacity=.72:this.cloudMaterial.opacity=.88)}setAltitude(t){this.cloudAltitude=t;for(const i of this.cloudInstances)i.y=t;this.updateInstancesTransform()}getCloudCount(){return this.cloudInstances.length}getGroup(){return this.group}destroy(){for(;this.group.children.length>0;){const t=this.group.children[0];this.group.remove(t),(t instanceof Oh||t instanceof En||t instanceof da)&&t.geometry.dispose()}this.cloudInstances=[]}}class zA{constructor(t){Dt(this,"scene");Dt(this,"dirLight");Dt(this,"hemiLight");Dt(this,"ambientLight");Dt(this,"lanternLight");Dt(this,"sunMesh");Dt(this,"sunHaloMesh");Dt(this,"starsPoints");Dt(this,"fog");Dt(this,"skyDome");Dt(this,"skyMaterial");Dt(this,"currentTimeOfDay","day");Dt(this,"time",0);this.scene=t;const i=new Zd(380,24,16);this.skyMaterial=new _a({side:Xn,depthWrite:!1,uniforms:{uTopColor:{value:new xe(4957155)},uBottomColor:{value:new xe(11919608)},uHorizonOffset:{value:.15}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,fragmentShader:`
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform float uHorizonOffset;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y + uHorizonOffset;
          float factor = clamp(pow(max(0.0, h), 0.7), 0.0, 1.0);
          vec3 sky = mix(uBottomColor, uTopColor, factor);
          gl_FragColor = vec4(sky, 1.0);
        }
      `}),this.skyDome=new En(i,this.skyMaterial),this.scene.add(this.skyDome),this.dirLight=new TS(16775912,2),this.dirLight.castShadow=!0,this.dirLight.shadow.mapSize.width=2048,this.dirLight.shadow.mapSize.height=2048,this.dirLight.shadow.camera.near=10,this.dirLight.shadow.camera.far=450;const s=110;this.dirLight.shadow.camera.left=-s,this.dirLight.shadow.camera.right=s,this.dirLight.shadow.camera.top=s,this.dirLight.shadow.camera.bottom=-s,this.dirLight.shadow.bias=-4e-4,this.dirLight.shadow.normalBias=.02,this.scene.add(this.dirLight),this.scene.add(this.dirLight.target),this.hemiLight=new MS(9354203,4016165,.7),this.scene.add(this.hemiLight),this.ambientLight=new AS(16777215,.3),this.scene.add(this.ambientLight),this.lanternLight=new ES(16755234,2.8,50,1.2),this.lanternLight.position.set(22,16,22),this.scene.add(this.lanternLight);const l=new zs(12,12,12),c=new Jo({color:16775912});this.sunMesh=new En(l,c),this.scene.add(this.sunMesh);const h=new nl(36,36),d=document.createElement("canvas");d.width=64,d.height=64;const p=d.getContext("2d"),m=p.createRadialGradient(32,32,4,32,32,30);m.addColorStop(0,"rgba(255, 250, 220, 0.8)"),m.addColorStop(.4,"rgba(255, 230, 180, 0.3)"),m.addColorStop(1,"rgba(255, 200, 150, 0)"),p.fillStyle=m,p.fillRect(0,0,64,64);const v=new $o(d),_=new Jo({map:v,transparent:!0,opacity:.8,depthWrite:!1,blending:Ko,side:Mi});this.sunHaloMesh=new En(h,_),this.sunMesh.add(this.sunHaloMesh);const x=650,S=new bn,E=new Float32Array(x*3);for(let M=0;M<x;M++){const g=Math.random(),N=Math.random(),L=g*2*Math.PI,w=Math.acos(2*N-1),V=260+Math.random()*30;E[M*3]=V*Math.sin(w)*Math.cos(L),E[M*3+1]=Math.abs(V*Math.cos(w))+15,E[M*3+2]=V*Math.sin(w)*Math.sin(L)}S.setAttribute("position",new $e(E,3));const b=new $a({color:16777215,size:1.8,transparent:!0,opacity:0,depthWrite:!1});this.starsPoints=new da(S,b),this.scene.add(this.starsPoints),this.fog=new jd(13297914,.0032),this.scene.fog=this.fog}applyConfig(t){if(this.setTimeOfDay(t.timeOfDay,t.fogDensity),t.sunIntensity!==void 0){const i=Od[t.timeOfDay];this.dirLight.intensity=i.sunIntensity*t.sunIntensity}}update(t,i){this.time+=t;const s=Math.sin(this.time*8)*.15+Math.sin(this.time*19.3)*.08+Math.cos(this.time*31)*.05,l=this.currentTimeOfDay==="night"||this.currentTimeOfDay==="sunset"||this.currentTimeOfDay==="fantasy"?3.2:.6;this.lanternLight.intensity=l+s,this.sunHaloMesh&&this.sunHaloMesh.lookAt(i.position)}setTimeOfDay(t,i){this.currentTimeOfDay=t;const s=Od[t];s&&(this.skyMaterial.uniforms.uTopColor.value.setHex(s.skyTopColor),this.skyMaterial.uniforms.uBottomColor.value.setHex(s.skyBottomColor),this.dirLight.color.setHex(s.sunColor),this.dirLight.intensity=s.sunIntensity,this.dirLight.position.set(...s.sunPosition),this.dirLight.target.position.set(0,20,0),this.hemiLight.color.setHex(s.skyTopColor),this.hemiLight.groundColor.setHex(s.skyBottomColor),this.hemiLight.intensity=s.ambientIntensity,this.ambientLight.color.setHex(s.ambientColor),this.ambientLight.intensity=s.ambientIntensity*.45,this.sunMesh.position.set(s.sunPosition[0]*1.8,s.sunPosition[1]*1.8,s.sunPosition[2]*1.8),this.sunMesh.material.color.setHex(t==="night"?13690111:t==="sunset"?16737826:16775912),t==="night"||t==="sunset"||t==="fantasy"?this.starsPoints.material.opacity=t==="night"?.95:t==="fantasy"?.8:.45:this.starsPoints.material.opacity=0,this.scene.background=new xe(s.skyBottomColor),this.fog.color.setHex(s.fogColor),this.fog.density=i??(t==="dawn"?.0038:.0032))}setFogDensity(t){this.fog.density=t}getSunMesh(){return this.sunMesh}destroy(){this.scene.remove(this.skyDome),this.scene.remove(this.dirLight),this.scene.remove(this.hemiLight),this.scene.remove(this.ambientLight),this.scene.remove(this.lanternLight),this.scene.remove(this.sunMesh),this.scene.remove(this.sunHaloMesh),this.scene.remove(this.starsPoints),this.skyDome.geometry.dispose(),this.skyMaterial.dispose(),this.sunMesh.geometry.dispose(),this.sunMesh.material.dispose(),this.sunHaloMesh.geometry.dispose(),this.sunHaloMesh.material.dispose(),this.starsPoints.geometry.dispose(),this.starsPoints.material.dispose()}}class IA{constructor(){Dt(this,"group");Dt(this,"sakuraPoints",null);Dt(this,"sakuraGeo",null);Dt(this,"sakuraPetals",[]);Dt(this,"maxSakura",250);Dt(this,"fireflyPoints",null);Dt(this,"fireflyGeo",null);Dt(this,"fireflies",[]);Dt(this,"maxFireflies",180);Dt(this,"fireflyMaterial",null);Dt(this,"snowPoints",null);Dt(this,"snowGeo",null);Dt(this,"snowParticles",[]);Dt(this,"maxSnow",200);Dt(this,"time",0);Dt(this,"peakPos",{x:0,y:70,z:0});this.group=new Za,this.initSystems()}initSystems(){const t=document.createElement("canvas");t.width=16,t.height=16;const i=t.getContext("2d");i.fillStyle="#ffa7c4",i.fillRect(3,2,10,12);const s=new $o(t);s.magFilter=Un,s.minFilter=Un,this.sakuraGeo=new bn;const l=new Float32Array(this.maxSakura*3),c=new Float32Array(this.maxSakura*3);this.sakuraGeo.setAttribute("position",new $e(l,3)),this.sakuraGeo.setAttribute("color",new $e(c,3));const h=new $a({size:1.1,map:s,transparent:!0,opacity:.88,vertexColors:!0,depthWrite:!1});this.sakuraPoints=new da(this.sakuraGeo,h),this.group.add(this.sakuraPoints);const d=document.createElement("canvas");d.width=32,d.height=32;const p=d.getContext("2d"),m=p.createRadialGradient(16,16,2,16,16,15);m.addColorStop(0,"rgba(235, 255, 120, 1)"),m.addColorStop(.4,"rgba(160, 255, 100, 0.6)"),m.addColorStop(1,"rgba(100, 255, 100, 0)"),p.fillStyle=m,p.fillRect(0,0,32,32);const v=new $o(d);this.fireflyGeo=new bn;const _=new Float32Array(this.maxFireflies*3),x=new Float32Array(this.maxFireflies*3);this.fireflyGeo.setAttribute("position",new $e(_,3)),this.fireflyGeo.setAttribute("color",new $e(x,3)),this.fireflyMaterial=new $a({size:2.2,map:v,transparent:!0,opacity:0,vertexColors:!0,depthWrite:!1,blending:Ko}),this.fireflyPoints=new da(this.fireflyGeo,this.fireflyMaterial),this.group.add(this.fireflyPoints),this.snowGeo=new bn;const S=new Float32Array(this.maxSnow*3);this.snowGeo.setAttribute("position",new $e(S,3));const E=new $a({size:1,color:16777215,transparent:!0,opacity:.75,depthWrite:!1});this.snowPoints=new da(this.snowGeo,E),this.group.add(this.snowPoints)}setup(t,i){const s=t.gridSize/2;this.peakPos={x:t.mainPeakPos.x-s,y:t.mainPeakPos.y,z:t.mainPeakPos.z-s},this.sakuraPetals=[];const l=t.trees.filter(c=>c.type==="sakura");for(let c=0;c<this.maxSakura;c++){let h=0,d=25,p=0;if(l.length>0){const m=l[c%l.length];h=m.x-s+(Math.random()-.5)*6,d=m.y+m.height+Math.random()*2,p=m.z-s+(Math.random()-.5)*6}else h=(Math.random()-.5)*s,d=20+Math.random()*15,p=(Math.random()-.5)*s;this.sakuraPetals.push({x:h,y:d-Math.random()*15,z:p,originX:h,originY:d,originZ:p,speedY:.8+Math.random()*.6,swayFreq:1.5+Math.random()*2,swayAmp:.6+Math.random()*.8,phase:Math.random()*Math.PI*2})}this.fireflies=[];for(let c=0;c<this.maxFireflies;c++)this.fireflies.push({x:(Math.random()-.5)*t.gridSize*.8,y:t.waterLevel+1+Math.random()*14,z:(Math.random()-.5)*t.gridSize*.8,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.4,vz:(Math.random()-.5)*.8,pulseFreq:2+Math.random()*3,phase:Math.random()*Math.PI*2,color:new xe(i.timeOfDay==="fantasy"?6809849:16436245)});this.snowParticles=[];for(let c=0;c<this.maxSnow;c++)this.snowParticles.push({x:this.peakPos.x+(Math.random()-.5)*45,y:this.peakPos.y-18+Math.random()*25,z:this.peakPos.z+(Math.random()-.5)*45,vx:1.5+Math.random()*2,vy:-.6-Math.random()*.8,vz:.8+Math.random()*1.5});this.updateLighting(i.timeOfDay)}update(t,i){if(this.time+=t,this.sakuraGeo&&this.sakuraPetals.length>0){const s=this.sakuraGeo.attributes.position.array,l=this.sakuraGeo.attributes.color.array;for(let c=0;c<this.sakuraPetals.length;c++){const h=this.sakuraPetals[c];h.y-=h.speedY*t*2,h.x+=Math.sin(this.time*h.swayFreq+h.phase)*h.swayAmp*t*2+t*.4,h.z+=Math.cos(this.time*h.swayFreq+h.phase)*h.swayAmp*t*1.2+t*.3,h.y<i.waterLevel&&(h.y=h.originY,h.x=h.originX+(Math.random()-.5)*4,h.z=h.originZ+(Math.random()-.5)*4),s[c*3]=h.x,s[c*3+1]=h.y,s[c*3+2]=h.z,l[c*3]=1,l[c*3+1]=.65,l[c*3+2]=.78}this.sakuraGeo.attributes.position.needsUpdate=!0,this.sakuraGeo.attributes.color.needsUpdate=!0}if(this.fireflyGeo&&this.fireflyMaterial&&this.fireflies.length>0){const l=i.timeOfDay==="night"||i.timeOfDay==="sunset"||i.timeOfDay==="fantasy"?i.timeOfDay==="night"?.95:.75:0;if(this.fireflyMaterial.opacity+=(l-this.fireflyMaterial.opacity)*t*3,this.fireflyMaterial.opacity>.05){const c=this.fireflyGeo.attributes.position.array,h=this.fireflyGeo.attributes.color.array;for(let d=0;d<this.fireflies.length;d++){const p=this.fireflies[d];p.x+=p.vx*t*4+Math.sin(this.time*2+p.phase)*.05,p.y+=p.vy*t*3+Math.cos(this.time*1.5+p.phase)*.03,p.z+=p.vz*t*4;const m=i.gridSize*.42;Math.abs(p.x)>m&&(p.vx*=-1),Math.abs(p.z)>m&&(p.vz*=-1),(p.y<i.waterLevel+1||p.y>i.waterLevel+22)&&(p.vy*=-1);const v=Math.pow(Math.sin(this.time*p.pulseFreq+p.phase)*.5+.5,2);c[d*3]=p.x,c[d*3+1]=p.y,c[d*3+2]=p.z,h[d*3]=p.color.r*v,h[d*3+1]=p.color.g*v,h[d*3+2]=p.color.b*v}this.fireflyGeo.attributes.position.needsUpdate=!0,this.fireflyGeo.attributes.color.needsUpdate=!0}}if(this.snowGeo&&this.snowParticles.length>0){const s=this.snowGeo.attributes.position.array;for(let l=0;l<this.snowParticles.length;l++){const c=this.snowParticles[l];c.x+=c.vx*t*6,c.y+=c.vy*t*4,c.z+=c.vz*t*5,(c.x>this.peakPos.x+35||c.z>this.peakPos.z+35||c.y<this.peakPos.y-25)&&(c.x=this.peakPos.x-30+(Math.random()-.5)*15,c.y=this.peakPos.y+Math.random()*12,c.z=this.peakPos.z-30+(Math.random()-.5)*15),s[l*3]=c.x,s[l*3+1]=c.y,s[l*3+2]=c.z}this.snowGeo.attributes.position.needsUpdate=!0}}updateLighting(t){if(this.fireflies)for(const i of this.fireflies)t==="fantasy"?i.color.setHex(6220500):t==="sunset"?i.color.setHex(16638023):i.color.setHex(10741301)}getGroup(){return this.group}destroy(){for(;this.group.children.length>0;){const t=this.group.children[0];this.group.remove(t),t instanceof da&&(t.geometry.dispose(),t.material.dispose())}this.sakuraPetals=[],this.fireflies=[],this.snowParticles=[]}}class BA{constructor(t,i){Dt(this,"container");Dt(this,"scene");Dt(this,"camera");Dt(this,"renderer");Dt(this,"controls");Dt(this,"terrainGen");Dt(this,"meshBuilder");Dt(this,"waterfallSystem");Dt(this,"cloudSystem");Dt(this,"skyLighting");Dt(this,"atmosphereSystem");Dt(this,"currentMeshResult",null);Dt(this,"currentTerrainData",null);Dt(this,"config");Dt(this,"animFrameId",null);Dt(this,"clock");Dt(this,"isDestroyed",!1);Dt(this,"frameCount",0);Dt(this,"lastFpsTime",0);Dt(this,"currentFps",60);Dt(this,"statsCallback",null);Dt(this,"targetCameraPos",new tt);Dt(this,"targetCameraLookAt",new tt);Dt(this,"isTransitioningCamera",!1);Dt(this,"tourAngle",0);this.container=t,this.config={...i},this.clock=new CS,this.scene=new pS;const s=t.clientWidth/t.clientHeight;this.camera=new ui(48,s,.5,900),this.camera.position.set(118,82,126),this.renderer=new hA({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=tv,this.renderer.toneMapping=nv,this.renderer.toneMappingExposure=1.05,t.appendChild(this.renderer.domElement),this.controls=new pA(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.06,this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.minDistance=15,this.controls.maxDistance=350,this.controls.target.set(5,25,5),this.controls.autoRotate=this.config.autoRotate,this.controls.autoRotateSpeed=this.config.autoRotateSpeed||.8,this.terrainGen=new RA(this.config.seed),this.meshBuilder=new NA,this.waterfallSystem=new OA,this.cloudSystem=new PA(this.config.seed+100),this.skyLighting=new zA(this.scene),this.atmosphereSystem=new IA,this.scene.add(this.waterfallSystem.getGroup()),this.scene.add(this.cloudSystem.getGroup()),this.scene.add(this.atmosphereSystem.getGroup()),this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.onWindowResize),this.rebuildScene(),this.applyCameraPreset(this.config.cameraPreset||"overview",!1),this.animate=this.animate.bind(this),this.lastFpsTime=performance.now(),this.animFrameId=requestAnimationFrame(this.animate)}setStatsCallback(t){this.statsCallback=t}rebuildScene(){this.currentMeshResult&&(this.scene.remove(this.currentMeshResult.solidMesh),this.scene.remove(this.currentMeshResult.waterMesh),this.scene.remove(this.currentMeshResult.lanternMesh),this.currentMeshResult.solidMesh.geometry.dispose(),this.currentMeshResult.waterMesh.geometry.dispose(),this.currentMeshResult.lanternMesh.geometry.dispose(),this.currentMeshResult=null),this.terrainGen.setSeed(this.config.seed),this.currentTerrainData=this.terrainGen.generate(this.config),this.currentMeshResult=this.meshBuilder.build(this.currentTerrainData),this.scene.add(this.currentMeshResult.solidMesh),this.scene.add(this.currentMeshResult.waterMesh),this.scene.add(this.currentMeshResult.lanternMesh),this.waterfallSystem.setup(this.currentTerrainData,this.config),this.cloudSystem.setup(this.config),this.atmosphereSystem.setup(this.currentTerrainData,this.config),this.skyLighting.applyConfig(this.config),this.updateWaterAppearance(),this.reportStats()}updateWaterAppearance(){const t=this.meshBuilder.getWaterMaterial();t&&(t.opacity=this.config.waterOpacity??.85,this.config.timeOfDay==="sunset"?t.color.setHex(16574451):this.config.timeOfDay==="night"?t.color.setHex(9684477):this.config.timeOfDay==="dawn"?t.color.setHex(13630206):this.config.timeOfDay==="fantasy"?t.color.setHex(10090212):t.color.setHex(16777215))}updateConfig(t){const i={...this.config};if(this.config={...this.config,...t},t.seed!==void 0&&t.seed!==i.seed||t.gridSize!==void 0&&t.gridSize!==i.gridSize||t.terrainHeight!==void 0&&t.terrainHeight!==i.terrainHeight||t.treeDensity!==void 0&&t.treeDensity!==i.treeDensity||t.waterLevel!==void 0&&t.waterLevel!==i.waterLevel){this.rebuildScene();return}(t.cloudAltitude!==void 0||t.cloudDensity!==void 0||t.cloudThickness!==void 0)&&this.cloudSystem.setup(this.config),(t.timeOfDay!==void 0||t.fogDensity!==void 0||t.sunIntensity!==void 0||t.waterOpacity!==void 0)&&(this.skyLighting.applyConfig(this.config),this.cloudSystem.updateLighting(this.config.timeOfDay),this.atmosphereSystem.updateLighting(this.config.timeOfDay),this.updateWaterAppearance()),t.autoRotate!==void 0&&(this.controls.autoRotate=t.autoRotate),t.autoRotateSpeed!==void 0&&(this.controls.autoRotateSpeed=t.autoRotateSpeed),t.cameraPreset!==void 0&&t.cameraPreset!==i.cameraPreset&&this.applyCameraPreset(t.cameraPreset,!0)}applyCameraPreset(t,i=!0){if(t==="custom")return;let s=new tt(118,82,126),l=new tt(5,25,5);switch(t){case"overview":s.set(118,82,126),l.set(5,25,5);break;case"waterfall":s.set(52,36,56),l.set(10,20,12);break;case"cloudPeak":s.set(-70,75,-65),l.set(-18,62,-15);break;case"lakeShore":s.set(28,20,48),l.set(8,24,16);break;case"cinematicTour":this.tourAngle=0;break}t!=="cinematicTour"&&(i?(this.targetCameraPos.copy(s),this.targetCameraLookAt.copy(l),this.isTransitioningCamera=!0):(this.camera.position.copy(s),this.controls.target.copy(l),this.controls.update()))}animate(){if(this.isDestroyed)return;this.animFrameId=requestAnimationFrame(this.animate);const t=Math.min(this.clock.getDelta(),.1);if(this.clock.getElapsedTime(),this.config.cameraPreset==="cinematicTour"){this.tourAngle+=t*.18;const i=145,s=65+Math.sin(this.tourAngle*2)*18;this.camera.position.x=Math.cos(this.tourAngle)*i,this.camera.position.z=Math.sin(this.tourAngle)*i,this.camera.position.y=s,this.controls.target.set(0,32+Math.sin(this.tourAngle)*8,0)}else this.isTransitioningCamera&&(this.camera.position.lerp(this.targetCameraPos,t*3.5),this.controls.target.lerp(this.targetCameraLookAt,t*3.5),this.camera.position.distanceTo(this.targetCameraPos)<.5&&this.controls.target.distanceTo(this.targetCameraLookAt)<.5&&(this.camera.position.copy(this.targetCameraPos),this.controls.target.copy(this.targetCameraLookAt),this.isTransitioningCamera=!1));this.controls.update(),this.waterfallSystem.update(t,this.config),this.cloudSystem.update(t,this.config),this.atmosphereSystem.update(t,this.config),this.skyLighting.update(t,this.camera),this.renderer.render(this.scene,this.camera),this.calculateFps()}calculateFps(){this.frameCount++;const t=performance.now();t-this.lastFpsTime>=1e3&&(this.currentFps=Math.round(this.frameCount*1e3/(t-this.lastFpsTime)),this.frameCount=0,this.lastFpsTime=t,this.reportStats())}reportStats(){!this.statsCallback||!this.currentMeshResult||!this.currentTerrainData||this.statsCallback({gridSize:this.config.gridSize,voxelCount:this.currentMeshResult.voxelCount,faceCount:this.currentMeshResult.faceCount,treeCount:this.currentTerrainData.trees.length,waterVoxelCount:Math.round(this.currentMeshResult.voxelCount*.18),cloudVoxelCount:this.cloudSystem.getCloudCount(),fps:this.currentFps})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const t=this.container.clientWidth,i=this.container.clientHeight;this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i)}captureScreenshot(){return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}exportScreenshot(){return this.captureScreenshot()}destroy(){this.isDestroyed=!0,this.animFrameId!==null&&cancelAnimationFrame(this.animFrameId),window.removeEventListener("resize",this.onWindowResize),this.currentMeshResult&&(this.scene.remove(this.currentMeshResult.solidMesh),this.scene.remove(this.currentMeshResult.waterMesh),this.scene.remove(this.currentMeshResult.lanternMesh),this.currentMeshResult.solidMesh.geometry.dispose(),this.currentMeshResult.waterMesh.geometry.dispose(),this.currentMeshResult.lanternMesh.geometry.dispose()),this.waterfallSystem.destroy(),this.cloudSystem.destroy(),this.atmosphereSystem.destroy(),this.skyLighting.destroy(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}const FA=({config:r,onStatsUpdate:t,sceneManagerRef:i})=>{const s=gn.useRef(null);return gn.useEffect(()=>{if(!s.current)return;const l=new BA(s.current,r);return l.setStatsCallback(t),i.current=l,()=>{l.destroy(),i.current=null}},[]),gn.useEffect(()=>{i.current&&i.current.updateConfig(r)},[r]),K.jsx("div",{ref:s,style:{width:"100vw",height:"100vh",position:"absolute",top:0,left:0,zIndex:0,overflow:"hidden"}})};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=(...r)=>r.filter((t,i,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===i).join(" ").trim();/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HA=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GA=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,s)=>s?s.toUpperCase():i.toLowerCase());/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y_=r=>{const t=GA(r);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Wh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VA=r=>{for(const t in r)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},kA=gn.createContext({}),XA=()=>gn.useContext(kA),WA=gn.forwardRef(({color:r,size:t,strokeWidth:i,absoluteStrokeWidth:s,className:l="",children:c,iconNode:h,...d},p)=>{const{size:m=24,strokeWidth:v=2,absoluteStrokeWidth:_=!1,color:x="currentColor",className:S=""}=XA()??{},E=s??_?Number(i??v)*24/Number(t??m):i??v;return gn.createElement("svg",{ref:p,...Wh,width:t??m??Wh.width,height:t??m??Wh.height,stroke:r??x,strokeWidth:E,className:Nv("lucide",S,l),...!c&&!VA(d)&&{"aria-hidden":"true"},...d},[...h.map(([b,M])=>gn.createElement(b,M)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=(r,t)=>{const i=gn.forwardRef(({className:s,...l},c)=>gn.createElement(WA,{ref:c,iconNode:t,className:Nv(`lucide-${HA(Y_(r))}`,`lucide-${r}`,s),...l}));return i.displayName=Y_(r),i};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jA=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],qA=Nn("camera",jA);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ZA=Nn("circle-question-mark",YA);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KA=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],QA=Nn("cloud",KA);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]],$A=Nn("compass",JA);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2",key:"6agr2n"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6",key:"1o487t"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M10 14h.01",key:"ssrbsk"}],["path",{d:"M15 6h.01",key:"cblpky"}],["path",{d:"M18 9h.01",key:"2061c0"}]],e2=Nn("dices",t2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]],i2=Nn("droplets",n2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a2=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],s2=Nn("maximize",a2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r2=[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]],o2=Nn("minimize",r2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],c2=Nn("moon",l2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]],f2=Nn("rotate-cw",u2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],Z_=Nn("sliders-vertical",h2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d2=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],p2=Nn("sparkles",d2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m2=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],K_=Nn("sun",m2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=[["path",{d:"M12 2v8",key:"1q4o3n"}],["path",{d:"m4.93 10.93 1.41 1.41",key:"2a7f42"}],["path",{d:"M2 18h2",key:"j10viu"}],["path",{d:"M20 18h2",key:"wocana"}],["path",{d:"m19.07 10.93-1.41 1.41",key:"15zs5n"}],["path",{d:"M22 22H2",key:"19qnx5"}],["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}],["path",{d:"M16 18a4 4 0 0 0-8 0",key:"1lzouq"}]],_2=Nn("sunrise",g2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v2=[["path",{d:"M12 10V2",key:"16sf7g"}],["path",{d:"m4.93 10.93 1.41 1.41",key:"2a7f42"}],["path",{d:"M2 18h2",key:"j10viu"}],["path",{d:"M20 18h2",key:"wocana"}],["path",{d:"m19.07 10.93-1.41 1.41",key:"15zs5n"}],["path",{d:"M22 22H2",key:"19qnx5"}],["path",{d:"m16 6-4 4-4-4",key:"6wukr"}],["path",{d:"M16 18a4 4 0 0 0-8 0",key:"1lzouq"}]],y2=Nn("sunset",v2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x2=[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z",key:"1l6gj6"}],["path",{d:"M7 16v6",key:"1a82de"}],["path",{d:"M13 19v3",key:"13sx9i"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",key:"1sj9kv"}]],M2=Nn("trees",x2);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S2=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Q_=Nn("x",S2),E2=({config:r,onChangeConfig:t,stats:i,onScreenshot:s})=>{const[l,c]=gn.useState(!1),[h,d]=gn.useState(!1),[p,m]=gn.useState(!1),v=()=>{document.fullscreenElement?(document.exitFullscreen().catch(()=>{}),m(!1)):(document.documentElement.requestFullscreen().catch(()=>{}),m(!0))},_=[{id:"dawn",label:"晨曦",icon:K.jsx(_2,{size:16})},{id:"day",label:"晴空",icon:K.jsx(K_,{size:16})},{id:"sunset",label:"晚霞",icon:K.jsx(y2,{size:16})},{id:"night",label:"月夜",icon:K.jsx(c2,{size:16})},{id:"fantasy",label:"极光",icon:K.jsx(p2,{size:16})}],x=[{id:"overview",label:"全景概貌",icon:"🏔️"},{id:"waterfall",label:"瀑布飞流",icon:"🌊"},{id:"cloudPeak",label:"穿云绝顶",icon:"☁️"},{id:"lakeShore",label:"碧湖栈道",icon:"🛶"},{id:"cinematicTour",label:"环绕巡航",icon:"🚁"}],S=(i==null?void 0:i.fps)||60,E=S>=50?"#4ade80":S>=30?"#38bdf8":"#f87171";return K.jsxs("div",{style:{position:"relative",width:"100%",height:"100%",pointerEvents:"none"},children:[K.jsxs("header",{style:{position:"absolute",top:16,left:16,right:16,display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"auto",zIndex:10},children:[K.jsxs("div",{className:"glass-panel",style:{padding:"10px 18px",borderRadius:12,display:"flex",alignItems:"center",gap:12},children:[K.jsx("span",{style:{fontSize:24},children:"🏔️"}),K.jsxs("div",{children:[K.jsx("h1",{style:{fontSize:16,fontWeight:700,letterSpacing:"0.02em",color:"#f8fafc"},children:"3D Voxel Mountain & Waterfall"}),K.jsx("p",{style:{fontSize:11,color:"#94a3b8",marginTop:1},children:"体素自然景观 · 高山瀑布 · 穿云效果 (144×144)"})]})]}),K.jsx("div",{className:"glass-panel",style:{padding:"6px 8px",borderRadius:12,display:"flex",gap:6},children:_.map(b=>{const M=r.timeOfDay===b.id;return K.jsxs("button",{onClick:()=>t({timeOfDay:b.id}),className:`glass-pill ${M?"active":""}`,style:{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",color:M?"#ffffff":"#cbd5e1"},children:[b.icon,K.jsx("span",{children:b.label})]},b.id)})}),K.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[K.jsxs("div",{className:"glass-panel",style:{padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:8},children:[K.jsx("span",{style:{width:8,height:8,borderRadius:"50%",backgroundColor:E,boxShadow:`0 0 8px ${E}`}}),K.jsxs("span",{style:{color:E},children:[S," FPS"]})]}),K.jsx("button",{onClick:s,className:"glass-pill",title:"捕获高清截图",style:{padding:10,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",color:"#f1f5f9"},children:K.jsx(qA,{size:18})}),K.jsx("button",{onClick:()=>t({autoRotate:!r.autoRotate}),className:`glass-pill ${r.autoRotate?"active":""}`,title:"自动环绕旋转",style:{padding:10,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",color:"#f1f5f9"},children:K.jsx(f2,{size:18})}),K.jsx("button",{onClick:v,className:"glass-pill",title:"全屏切换",style:{padding:10,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",color:"#f1f5f9"},children:p?K.jsx(o2,{size:18}):K.jsx(s2,{size:18})}),K.jsx("button",{onClick:()=>d(!0),className:"glass-pill",title:"操作与场景说明",style:{padding:10,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",color:"#f1f5f9"},children:K.jsx(ZA,{size:18})}),K.jsxs("button",{onClick:()=>c(!l),className:`glass-pill ${l?"active":""}`,style:{padding:"8px 16px",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:600,color:"#f1f5f9"},children:[K.jsx(Z_,{size:17}),K.jsx("span",{children:"参数调控"})]})]})]}),K.jsx("div",{style:{position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,pointerEvents:"auto",zIndex:10},children:K.jsx("div",{className:"glass-panel",style:{padding:"6px 8px",borderRadius:14,display:"flex",gap:6},children:x.map(b=>{const M=r.cameraPreset===b.id;return K.jsxs("button",{onClick:()=>t({cameraPreset:b.id}),className:`glass-pill ${M?"active":""}`,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:500,cursor:"pointer",color:M?"#ffffff":"#cbd5e1"},children:[K.jsx("span",{children:b.icon}),K.jsx("span",{children:b.label})]},b.id)})})}),K.jsxs("div",{className:"glass-panel",style:{position:"absolute",bottom:24,left:16,padding:"12px 16px",borderRadius:12,pointerEvents:"auto",fontSize:11,color:"#94a3b8",display:"flex",flexDirection:"column",gap:6,zIndex:10,minWidth:190},children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",color:"#f1f5f9",fontWeight:600},children:[K.jsx("span",{children:"网格规模"}),K.jsx("span",{style:{color:"#38bdf8"},children:"144 × 144"})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[K.jsx("span",{children:"地貌主峰高"}),K.jsx("span",{children:"74 体素层"})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[K.jsx("span",{children:"穿云层高度"}),K.jsxs("span",{children:["y = ",r.cloudAltitude]})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[K.jsx("span",{children:"表面体素数"}),K.jsxs("span",{children:[i?i.voxelCount.toLocaleString():"28,450"," 块"]})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[K.jsx("span",{children:"渲染面数 (AO)"}),K.jsxs("span",{children:[i?i.faceCount.toLocaleString():"64,200"," 面"]})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[K.jsx("span",{children:"植被树木"}),K.jsxs("span",{children:[(i==null?void 0:i.treeCount)||58," 株"]})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:4,color:"#38bdf8"},children:[K.jsx("span",{children:"流体着色器"}),K.jsx("span",{children:"动态瀑布 UV"})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",color:"#ec4899"},children:[K.jsx("span",{children:"氛围粒子"}),K.jsx("span",{children:"落樱 · 萤火 · 冰晶"})]})]}),K.jsxs("div",{className:"glass-panel",style:{position:"absolute",top:0,right:0,width:360,height:"100%",padding:"24px 20px",boxSizing:"border-box",transform:l?"translateX(0)":"translateX(100%)",transition:"transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",pointerEvents:l?"auto":"none",zIndex:20,overflowY:"auto",display:"flex",flexDirection:"column",gap:20},children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,0.1)",paddingBottom:12},children:[K.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[K.jsx(Z_,{size:18,color:"#38bdf8"}),K.jsx("h2",{style:{fontSize:16,fontWeight:700,color:"#f8fafc"},children:"场景参数详细调控"})]}),K.jsx("button",{onClick:()=>c(!1),className:"glass-pill",style:{padding:6,borderRadius:8,cursor:"pointer",color:"#cbd5e1"},children:K.jsx(Q_,{size:18})})]}),K.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[K.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#38bdf8",fontSize:13,fontWeight:600},children:[K.jsx(K_,{size:16}),K.jsx("span",{children:"光影与时序 (Lighting & Atmosphere)"})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"阳光/月光强度"}),K.jsxs("span",{children:[r.sunIntensity.toFixed(1),"x"]})]}),K.jsx("input",{type:"range",min:"0.2",max:"3.0",step:"0.1",value:r.sunIntensity,onChange:b=>t({sunIntensity:parseFloat(b.target.value)})})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"环境雾气浓度 (Fog)"}),K.jsx("span",{children:(r.fogDensity*1e3).toFixed(1)})]}),K.jsx("input",{type:"range",min:"0.001",max:"0.010",step:"0.0005",value:r.fogDensity,onChange:b=>t({fogDensity:parseFloat(b.target.value)})})]})]}),K.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:16},children:[K.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#38bdf8",fontSize:13,fontWeight:600},children:[K.jsx(QA,{size:16}),K.jsx("span",{children:"云雾与穿云效果 (Voxel Clouds)"})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"云层海拔高度 (山腰 y=30~55)"}),K.jsxs("span",{children:["y = ",r.cloudAltitude]})]}),K.jsx("input",{type:"range",min:"28",max:"58",step:"1",value:r.cloudAltitude,onChange:b=>t({cloudAltitude:parseInt(b.target.value)})})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"云层覆盖密度"}),K.jsxs("span",{children:[Math.round(r.cloudDensity*100),"%"]})]}),K.jsx("input",{type:"range",min:"0.1",max:"1.0",step:"0.05",value:r.cloudDensity,onChange:b=>t({cloudDensity:parseFloat(b.target.value)})})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"云雾流动风速"}),K.jsxs("span",{children:[r.cloudSpeed.toFixed(1),"x"]})]}),K.jsx("input",{type:"range",min:"0.0",max:"3.0",step:"0.2",value:r.cloudSpeed,onChange:b=>t({cloudSpeed:parseFloat(b.target.value)})})]})]}),K.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:16},children:[K.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#38bdf8",fontSize:13,fontWeight:600},children:[K.jsx(i2,{size:16}),K.jsx("span",{children:"瀑布与流水动态 (Waterfall & Splash)"})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"瀑布倾泻流速"}),K.jsxs("span",{children:[r.waterfallFlowSpeed.toFixed(1),"x"]})]}),K.jsx("input",{type:"range",min:"0.2",max:"3.0",step:"0.1",value:r.waterfallFlowSpeed,onChange:b=>t({waterfallFlowSpeed:parseFloat(b.target.value)})})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"水花溅落粒子 (Splash Particles)"}),K.jsxs("span",{children:[r.splashParticleCount.toFixed(1),"x"]})]}),K.jsx("input",{type:"range",min:"0.2",max:"2.5",step:"0.1",value:r.splashParticleCount,onChange:b=>t({splashParticleCount:parseFloat(b.target.value)})})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"水体透明度"}),K.jsxs("span",{children:[Math.round(r.waterOpacity*100),"%"]})]}),K.jsx("input",{type:"range",min:"0.4",max:"1.0",step:"0.05",value:r.waterOpacity,onChange:b=>t({waterOpacity:parseFloat(b.target.value)})})]})]}),K.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:16},children:[K.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#38bdf8",fontSize:13,fontWeight:600},children:[K.jsx(M2,{size:16}),K.jsx("span",{children:"地形植被与随机种子 (Terrain Generation)"})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"植被树木覆盖率"}),K.jsxs("span",{children:[Math.round((r.treeDensity||.8)*100),"%"]})]}),K.jsx("input",{type:"range",min:"0.1",max:"1.8",step:"0.1",value:r.treeDensity||.8,onChange:b=>t({treeDensity:parseFloat(b.target.value)})})]}),K.jsx("div",{style:{display:"flex",gap:8,marginTop:4},children:K.jsxs("button",{onClick:()=>t({seed:Math.floor(Math.random()*999999)}),className:"glass-pill",style:{flex:1,padding:"10px 14px",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:13,fontWeight:600,cursor:"pointer",color:"#38bdf8",borderColor:"#0284c7"},children:[K.jsx(e2,{size:16}),K.jsxs("span",{children:["重构随机地形 (Seed: ",r.seed,")"]})]})})]}),K.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:16},children:[K.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#38bdf8",fontSize:13,fontWeight:600},children:[K.jsx($A,{size:16}),K.jsx("span",{children:"视角运动控制 (Camera Orbit)"})]}),K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[K.jsx("span",{style:{fontSize:12,color:"#cbd5e1"},children:"自动环绕旋转"}),K.jsx("input",{type:"checkbox",checked:r.autoRotate,onChange:b=>t({autoRotate:b.target.checked}),style:{width:18,height:18,accentColor:"#0284c7",cursor:"pointer"}})]}),K.jsxs("div",{children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#cbd5e1",marginBottom:4},children:[K.jsx("span",{children:"旋转速度"}),K.jsxs("span",{children:[(r.autoRotateSpeed||.8).toFixed(1),"x"]})]}),K.jsx("input",{type:"range",min:"0.1",max:"2.5",step:"0.1",value:r.autoRotateSpeed||.8,onChange:b=>t({autoRotateSpeed:parseFloat(b.target.value)})})]})]})]}),h&&K.jsx("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,pointerEvents:"auto"},children:K.jsxs("div",{className:"glass-panel",style:{width:520,maxWidth:"92vw",borderRadius:16,padding:24,display:"flex",flexDirection:"column",gap:16},children:[K.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[K.jsxs("h3",{style:{fontSize:18,fontWeight:700,color:"#f8fafc",display:"flex",alignItems:"center",gap:8},children:[K.jsx("span",{children:"🏔️"})," 场景特色与操作指南"]}),K.jsx("button",{onClick:()=>d(!1),className:"glass-pill",style:{padding:6,borderRadius:8,cursor:"pointer",color:"#94a3b8"},children:K.jsx(Q_,{size:18})})]}),K.jsxs("div",{style:{fontSize:13,color:"#cbd5e1",lineHeight:1.6,display:"flex",flexDirection:"column",gap:10},children:[K.jsxs("div",{style:{padding:"10px 12px",background:"rgba(2,132,199,0.15)",border:"1px solid rgba(56,189,248,0.3)",borderRadius:8},children:[K.jsx("strong",{style:{color:"#38bdf8"},children:"✨ 核心景观特征："}),K.jsxs("ul",{style:{paddingLeft:18,marginTop:4},children:[K.jsxs("li",{children:[K.jsx("strong",{children:"体素山脉"}),"：144×144 网格，主峰高达 74 层，带有陡峭悬崖、次峰与自然过渡山脊。"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"穿云效果"}),"：山腰缭绕体素 3D 云层与山雾，高耸雪峰破云而出，前后遮挡层次分明。"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"动态流水着色器"}),"：高山瀑布高速倾泻动态 UV 泡沫纹理、湖面波光倒影与阳光高光镜面反射。"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"飞流瀑布粒子"}),"：水花溅射、升腾水汽与湖面激浪八边形扩散波纹。"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"生动微气候氛围"}),"：飘落的粉色樱花瓣、夜间湖畔自发光呼吸萤火虫与雪峰冰晶微风。"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"生态环境"}),"：点缀松树、橡树、樱花树、湖畔木栈道与夜间发光体素灯笼。"]})]})]}),K.jsxs("div",{children:[K.jsx("strong",{style:{color:"#f8fafc"},children:"🎮 交互操作方式："}),K.jsxs("ul",{style:{paddingLeft:18,marginTop:4},children:[K.jsxs("li",{children:[K.jsx("strong",{children:"鼠标左键拖拽"}),"：360° 自由旋转视角 (Orbit)"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"鼠标右键拖拽"}),"：平移场景位置 (Pan)"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"滚轮缩放"}),"：推进 / 拉远观察细节"]}),K.jsxs("li",{children:[K.jsx("strong",{children:"底部快捷栏"}),"：一键切换 5 大精心调校的电影级镜头视角"]})]})]})]}),K.jsx("button",{onClick:()=>d(!1),className:"glass-pill active",style:{padding:"10px 16px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",textAlign:"center",marginTop:8},children:"开启体验"})]})})]})},b2={seed:42890,gridSize:144,terrainHeight:80,waterLevel:14,timeOfDay:"day",sunIntensity:1,fogDensity:.0035,cloudAltitude:40,cloudThickness:3,cloudDensity:.55,cloudSpeed:1,cloudPiercingEffect:!0,waterfallFlowSpeed:1.2,waterfallFoamIntensity:1,waterOpacity:.78,splashParticleCount:1.2,treeDensity:.85,flowerDensity:1,autoRotate:!0,autoRotateSpeed:.6,cameraPreset:"overview"},T2=()=>{const[r,t]=gn.useState(b2),[i,s]=gn.useState(null),l=gn.useRef(null),c=gn.useCallback(d=>{t(p=>({...p,...d}))},[]),h=gn.useCallback(()=>{if(!l.current)return;const d=l.current.exportScreenshot(),p=document.createElement("a");p.download=`voxel-waterfall-${r.timeOfDay}-${Date.now()}.png`,p.href=d,p.click()},[r.timeOfDay]);return K.jsxs("div",{style:{width:"100vw",height:"100vh",position:"relative",overflow:"hidden"},children:[K.jsx(FA,{config:r,onStatsUpdate:s,sceneManagerRef:l}),K.jsx(E2,{config:r,onChangeConfig:c,stats:i,onScreenshot:h})]})};Jx.createRoot(document.getElementById("root")).render(K.jsx(Xx.StrictMode,{children:K.jsx(T2,{})}));
