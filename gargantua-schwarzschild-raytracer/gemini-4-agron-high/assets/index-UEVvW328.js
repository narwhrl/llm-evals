(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function r(u){if(u.ep)return;u.ep=!0;const f=i(u);fetch(u.href,f)}})();var rd={exports:{}},pl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J_;function bM(){if(J_)return pl;J_=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,u,f){var h=null;if(f!==void 0&&(h=""+f),u.key!==void 0&&(h=""+u.key),"key"in u){f={};for(var d in u)d!=="key"&&(f[d]=u[d])}else f=u;return u=f.ref,{$$typeof:o,type:r,key:h,ref:u!==void 0?u:null,props:f}}return pl.Fragment=e,pl.jsx=i,pl.jsxs=i,pl}var $_;function AM(){return $_||($_=1,rd.exports=bM()),rd.exports}var St=AM(),od={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tv;function RM(){if(tv)return ie;tv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),_=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),m=Symbol.for("react.activity"),x=Symbol.for("react.view_transition"),M=Symbol.iterator;function A(C){return C===null||typeof C!="object"?null:(C=M&&C[M]||C["@@iterator"],typeof C=="function"?C:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y=Object.assign,S={};function I(C,j,mt){this.props=C,this.context=j,this.refs=S,this.updater=mt||D}I.prototype.isReactComponent={},I.prototype.setState=function(C,j){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,j,"setState")},I.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function z(){}z.prototype=I.prototype;function N(C,j,mt){this.props=C,this.context=j,this.refs=S,this.updater=mt||D}var K=N.prototype=new z;K.constructor=N,y(K,I.prototype),K.isPureReactComponent=!0;var V=Array.isArray;function P(){}var k={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function E(C,j,mt){var ft=mt.ref;return{$$typeof:o,type:C,key:j,ref:ft!==void 0?ft:null,props:mt}}function L(C,j){return E(C.type,j,C.props)}function Q(C){return typeof C=="object"&&C!==null&&C.$$typeof===o}function J(C){var j={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(mt){return j[mt]})}var lt=/\/+/g;function ut(C,j){return typeof C=="object"&&C!==null&&C.key!=null?J(""+C.key):j.toString(36)}function H(C){switch(C.status){case"fulfilled":return C.value;case"rejected":throw C.reason;default:switch(typeof C.status=="string"?C.then(P,P):(C.status="pending",C.then(function(j){C.status==="pending"&&(C.status="fulfilled",C.value=j)},function(j){C.status==="pending"&&(C.status="rejected",C.reason=j)})),C.status){case"fulfilled":return C.value;case"rejected":throw C.reason}}throw C}function rt(C,j,mt,ft,bt){var kt=typeof C;(kt==="undefined"||kt==="boolean")&&(C=null);var wt=!1;if(C===null)wt=!0;else switch(kt){case"bigint":case"string":case"number":wt=!0;break;case"object":switch(C.$$typeof){case o:case e:wt=!0;break;case v:return wt=C._init,rt(wt(C._payload),j,mt,ft,bt)}}if(wt)return bt=bt(C),wt=ft===""?"."+ut(C,0):ft,V(bt)?(mt="",wt!=null&&(mt=wt.replace(lt,"$&/")+"/"),rt(bt,j,mt,"",function(se){return se})):bt!=null&&(Q(bt)&&(bt=L(bt,mt+(bt.key==null||C&&C.key===bt.key?"":(""+bt.key).replace(lt,"$&/")+"/")+wt)),j.push(bt)),1;wt=0;var Rt=ft===""?".":ft+":";if(V(C))for(var Bt=0;Bt<C.length;Bt++)ft=C[Bt],kt=Rt+ut(ft,Bt),wt+=rt(ft,j,mt,kt,bt);else if(Bt=A(C),typeof Bt=="function")for(C=Bt.call(C),Bt=0;!(ft=C.next()).done;)ft=ft.value,kt=Rt+ut(ft,Bt++),wt+=rt(ft,j,mt,kt,bt);else if(kt==="object"){if(typeof C.then=="function")return rt(H(C),j,mt,ft,bt);throw j=String(C),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return wt}function $(C,j,mt){if(C==null)return C;var ft=[],bt=0;return rt(C,ft,"","",function(kt){return j.call(mt,kt,bt++)}),ft}function xt(C){if(C._status===-1){var j=C._result,mt=j();mt.then(function(ft){(C._status===0||C._status===-1)&&(C._status=1,C._result=ft,mt.status===void 0&&(mt.status="fulfilled",mt.value=ft))},function(ft){(C._status===0||C._status===-1)&&(C._status=2,C._result=ft,mt.status===void 0&&(mt.status="rejected",mt.reason=ft))}),C._status===-1&&(C._status=0,C._result=mt)}if(C._status===1)return C._result.default;throw C._result}var yt=typeof reportError=="function"?reportError:function(C){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof C=="object"&&C!==null&&typeof C.message=="string"?String(C.message):String(C),error:C});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",C);return}console.error(C)};function Gt(C){var j=k.T,mt={};mt.types=j!==null?j.types:null,k.T=mt;try{var ft=C(),bt=k.S;bt!==null&&bt(mt,ft),typeof ft=="object"&&ft!==null&&typeof ft.then=="function"&&ft.then(P,yt)}catch(kt){yt(kt)}finally{j!==null&&mt.types!==null&&(j.types=mt.types),k.T=j}}function ee(C){var j=k.T;if(j!==null){var mt=j.types;mt===null?j.types=[C]:mt.indexOf(C)===-1&&mt.push(C)}else Gt(ee.bind(null,C))}var Te={map:$,forEach:function(C,j,mt){$(C,function(){j.apply(this,arguments)},mt)},count:function(C){var j=0;return $(C,function(){j++}),j},toArray:function(C){return $(C,function(j){return j})||[]},only:function(C){if(!Q(C))throw Error("React.Children.only expected to receive a single React element child.");return C}};return ie.Activity=m,ie.Children=Te,ie.Component=I,ie.Fragment=i,ie.Profiler=u,ie.PureComponent=N,ie.StrictMode=r,ie.Suspense=p,ie.ViewTransition=x,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,ie.__COMPILER_RUNTIME={__proto__:null,c:function(C){return k.H.useMemoCache(C)}},ie.addTransitionType=ee,ie.cache=function(C){return function(){return C.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(C,j,mt){if(C==null)throw Error("The argument must be a React element, but you passed "+C+".");var ft=y({},C.props),bt=C.key;if(j!=null)for(kt in j.key!==void 0&&(bt=""+j.key),j)!w.call(j,kt)||kt==="key"||kt==="__self"||kt==="__source"||kt==="ref"&&j.ref===void 0||(ft[kt]=j[kt]);var kt=arguments.length-2;if(kt===1)ft.children=mt;else if(1<kt){for(var wt=Array(kt),Rt=0;Rt<kt;Rt++)wt[Rt]=arguments[Rt+2];ft.children=wt}return E(C.type,bt,ft)},ie.createContext=function(C){return C={$$typeof:h,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null},C.Provider=C,C.Consumer={$$typeof:f,_context:C},C},ie.createElement=function(C,j,mt){var ft,bt={},kt=null;if(j!=null)for(ft in j.key!==void 0&&(kt=""+j.key),j)w.call(j,ft)&&ft!=="key"&&ft!=="__self"&&ft!=="__source"&&(bt[ft]=j[ft]);var wt=arguments.length-2;if(wt===1)bt.children=mt;else if(1<wt){for(var Rt=Array(wt),Bt=0;Bt<wt;Bt++)Rt[Bt]=arguments[Bt+2];bt.children=Rt}if(C&&C.defaultProps)for(ft in wt=C.defaultProps,wt)bt[ft]===void 0&&(bt[ft]=wt[ft]);return E(C,kt,bt)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(C){return{$$typeof:d,render:C}},ie.isValidElement=Q,ie.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:xt}},ie.memo=function(C,j){return{$$typeof:_,type:C,compare:j===void 0?null:j}},ie.startTransition=Gt,ie.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},ie.use=function(C){return k.H.use(C)},ie.useActionState=function(C,j,mt){return k.H.useActionState(C,j,mt)},ie.useCallback=function(C,j){return k.H.useCallback(C,j)},ie.useContext=function(C){return k.H.useContext(C)},ie.useDebugValue=function(){},ie.useDeferredValue=function(C,j){return k.H.useDeferredValue(C,j)},ie.useEffect=function(C,j){return k.H.useEffect(C,j)},ie.useEffectEvent=function(C){return k.H.useEffectEvent(C)},ie.useId=function(){return k.H.useId()},ie.useImperativeHandle=function(C,j,mt){return k.H.useImperativeHandle(C,j,mt)},ie.useInsertionEffect=function(C,j){return k.H.useInsertionEffect(C,j)},ie.useLayoutEffect=function(C,j){return k.H.useLayoutEffect(C,j)},ie.useMemo=function(C,j){return k.H.useMemo(C,j)},ie.useOptimistic=function(C,j){return k.H.useOptimistic(C,j)},ie.useReducer=function(C,j,mt){return k.H.useReducer(C,j,mt)},ie.useRef=function(C){return k.H.useRef(C)},ie.useState=function(C){return k.H.useState(C)},ie.useSyncExternalStore=function(C,j,mt){return k.H.useSyncExternalStore(C,j,mt)},ie.useTransition=function(){return k.H.useTransition()},ie.version="19.3.1",ie}var ev;function wp(){return ev||(ev=1,od.exports=RM()),od.exports}var en=wp(),ld={exports:{}},ml={},ud={exports:{}},cd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nv;function CM(){return nv||(nv=1,(function(o){function e(H,rt){var $=H.length;H.push(rt);t:for(;0<$;){var xt=$-1>>>1,yt=H[xt];if(0<u(yt,rt))H[xt]=rt,H[$]=yt,$=xt;else break t}}function i(H){return H.length===0?null:H[0]}function r(H){if(H.length===0)return null;var rt=H[0],$=H.pop();if($!==rt){H[0]=$;t:for(var xt=0,yt=H.length,Gt=yt>>>1;xt<Gt;){var ee=2*(xt+1)-1,Te=H[ee],C=ee+1,j=H[C];if(0>u(Te,$))C<yt&&0>u(j,Te)?(H[xt]=j,H[C]=$,xt=C):(H[xt]=Te,H[ee]=$,xt=ee);else if(C<yt&&0>u(j,$))H[xt]=j,H[C]=$,xt=C;else break t}}return rt}function u(H,rt){var $=H.sortIndex-rt.sortIndex;return $!==0?$:H.id-rt.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var p=[],_=[],v=1,m=null,x=3,M=!1,A=!1,D=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function N(H){for(var rt=i(_);rt!==null;){if(rt.callback===null)r(_);else if(rt.startTime<=H)r(_),rt.sortIndex=rt.expirationTime,e(p,rt);else break;rt=i(_)}}function K(H){if(D=!1,N(H),!A)if(i(p)!==null)A=!0,V||(V=!0,Q());else{var rt=i(_);rt!==null&&ut(K,rt.startTime-H)}}var V=!1,P=-1,k=5,w=-1;function E(){return y?!0:!(o.unstable_now()-w<k)}function L(){if(y=!1,V){var H=o.unstable_now();w=H;var rt=!0;try{t:{A=!1,D&&(D=!1,I(P),P=-1),M=!0;var $=x;try{e:{for(N(H),m=i(p);m!==null&&!(m.expirationTime>H&&E());){var xt=m.callback;if(typeof xt=="function"){m.callback=null,x=m.priorityLevel;var yt=xt(m.expirationTime<=H);if(H=o.unstable_now(),typeof yt=="function"){m.callback=yt,N(H),rt=!0;break e}m===i(p)&&r(p),N(H)}else r(p);m=i(p)}if(m!==null)rt=!0;else{var Gt=i(_);Gt!==null&&ut(K,Gt.startTime-H),rt=!1}}break t}finally{m=null,x=$,M=!1}rt=void 0}}finally{rt?Q():V=!1}}}var Q;if(typeof z=="function")Q=function(){z(L)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,lt=J.port2;J.port1.onmessage=L,Q=function(){lt.postMessage(null)}}else Q=function(){S(L,0)};function ut(H,rt){P=S(function(){H(o.unstable_now())},rt)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(H){H.callback=null},o.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):k=0<H?Math.floor(1e3/H):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_next=function(H){switch(x){case 1:case 2:case 3:var rt=3;break;default:rt=x}var $=x;x=rt;try{return H()}finally{x=$}},o.unstable_requestPaint=function(){y=!0},o.unstable_runWithPriority=function(H,rt){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var $=x;x=H;try{return rt()}finally{x=$}},o.unstable_scheduleCallback=function(H,rt,$){var xt=o.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?xt+$:xt):$=xt,H){case 1:var yt=-1;break;case 2:yt=250;break;case 5:yt=1073741823;break;case 4:yt=1e4;break;default:yt=5e3}return yt=$+yt,H={id:v++,callback:rt,priorityLevel:H,startTime:$,expirationTime:yt,sortIndex:-1},$>xt?(H.sortIndex=$,e(_,H),i(p)===null&&H===i(_)&&(D?(I(P),P=-1):D=!0,ut(K,$-xt))):(H.sortIndex=yt,e(p,H),A||M||(A=!0,V||(V=!0,Q()))),H},o.unstable_shouldYield=E,o.unstable_wrapCallback=function(H){var rt=x;return function(){var $=x;x=rt;try{return H.apply(this,arguments)}finally{x=$}}}})(cd)),cd}var iv;function DM(){return iv||(iv=1,ud.exports=CM()),ud.exports}var fd={exports:{}},Ln={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var av;function wM(){if(av)return Ln;av=1;var o=wp();function e(v){var m="https://react.dev/errors/"+v;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)m+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+v+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},u=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(v,m,x){var M=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:M==null?null:M===h?h:""+M,children:v,containerInfo:m,implementation:x}}var p=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function _(v,m){if(v==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Ln.browser=function(v){return{$$typeof:f,_reason:v}},Ln.createPortal=function(v,m){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return d(v,m,null,x)},Ln.flushSync=function(v){var m=p.T,x=r.p;try{if(p.T=null,r.p=2,v)return v()}finally{p.T=m,r.p=x,r.d.f()}},Ln.preconnect=function(v,m){typeof v=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(v,m))},Ln.prefetchDNS=function(v){typeof v=="string"&&r.d.D(v)},Ln.preinit=function(v,m){if(typeof v=="string"&&m&&typeof m.as=="string"){var x=m.as,M=_(x,m.crossOrigin),A=typeof m.integrity=="string"?m.integrity:void 0,D=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;x==="style"?r.d.S(v,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:M,integrity:A,fetchPriority:D}):x==="script"&&r.d.X(v,{crossOrigin:M,integrity:A,fetchPriority:D,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Ln.preinitModule=function(v,m){if(typeof v=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var x=_(m.as,m.crossOrigin);r.d.M(v,{crossOrigin:x,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0})}}else m==null&&r.d.M(v)},Ln.preload=function(v,m){if(typeof v=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var x=m.as,M=_(x,m.crossOrigin);r.d.L(v,x,{crossOrigin:M,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Ln.preloadModule=function(v,m){if(typeof v=="string")if(m){var x=_(m.as,m.crossOrigin);r.d.m(v,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:x,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0})}else r.d.m(v)},Ln.requestFormReset=function(v){r.d.r(v)},Ln.unstable_batchedUpdates=function(v,m){return v(m)},Ln.useFormState=function(v,m,x){return p.H.useFormState(v,m,x)},Ln.useFormStatus=function(){return p.H.useHostTransitionStatus()},Ln.version="19.3.1",Ln}var sv;function UM(){if(sv)return fd.exports;sv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),fd.exports=wM(),fd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rv;function NM(){if(rv)return ml;rv=1;var o=DM(),e=wp(),i=UM();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(r(188))}function _(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,s=n;;){var l=a.return;if(l===null)break;var c=l.alternate;if(c===null){if(s=l.return,s!==null){a=s;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===a)return p(l),t;if(c===s)return p(l),n;c=c.sibling}throw Error(r(188))}if(a.return!==s.return)a=l,s=c;else{for(var g=!1,T=l.child;T;){if(T===a){g=!0,a=l,s=c;break}if(T===s){g=!0,s=l,a=c;break}T=T.sibling}if(!g){for(T=c.child;T;){if(T===a){g=!0,a=c,s=l;break}if(T===s){g=!0,s=c,a=l;break}T=T.sibling}if(!g)throw Error(r(189))}}if(a.alternate!==s)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}function m(t,n,a,s,l,c){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,s,l,c)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&m(t.child,n,a,s,l,c))return!0;t=t.sibling}return!1}function x(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function M(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function A(t){var n=[null,null],a=x(t);return a===null||D(n,t,a.child,{foundSelf:!1}),n}function D(t,n,a,s){for(;a!==null;){if(a===n)s.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(s.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&D(t,n,a.child,s))return!0;a=a.sibling}return!1}function y(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(r(559))}}var S=null,I=null;function z(t,n,a){return t===a?!0:t===n?(S=t,!0):!1}function N(t,n,a){return t===a?(I=t,!1):t===n?(I!==null&&(S=t),!0):!1}function K(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function V(t,n,a){for(var s=0,l=t;l;l=a(l))s++;l=0;for(var c=n;c;c=a(c))l++;for(;0<s-l;)t=a(t),s--;for(;0<l-s;)n=a(n),l--;for(;s--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var P=Object.assign,k=Symbol.for("react.element"),w=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),L=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),J=Symbol.for("react.profiler"),lt=Symbol.for("react.consumer"),ut=Symbol.for("react.context"),H=Symbol.for("react.forward_ref"),rt=Symbol.for("react.suspense"),$=Symbol.for("react.suspense_list"),xt=Symbol.for("react.memo"),yt=Symbol.for("react.lazy"),Gt=Symbol.for("react.activity"),ee=Symbol.for("react.legacy_hidden"),Te=Symbol.for("react.memo_cache_sentinel"),C=Symbol.for("react.view_transition"),j=Symbol.for("react.recoverable"),mt=Symbol.iterator;function ft(t){return t===null||typeof t!="object"?null:(t=mt&&t[mt]||t["@@iterator"],typeof t=="function"?t:null)}var bt=Symbol.for("react.client.reference");function kt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===bt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case L:return"Fragment";case J:return"Profiler";case Q:return"StrictMode";case rt:return"Suspense";case $:return"SuspenseList";case Gt:return"Activity";case C:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case ut:return t.displayName||"Context";case lt:return(t._context.displayName||"Context")+".Consumer";case H:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case xt:return n=t.displayName||null,n!==null?n:kt(t.type)||"Memo";case yt:n=t._payload,t=t._init;try{return kt(t(n))}catch{}}return null}var wt=Array.isArray,Rt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Bt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},F=[],hn=-1;function ae(t){return{current:t}}function Kt(t){0>hn||(t.current=F[hn],F[hn]=null,hn--)}function Ct(t,n){hn++,F[hn]=t.current,t.current=n}var Se=ae(null),qt=ae(null),U=ae(null),b=ae(null);function it(t,n){switch(Ct(U,n),Ct(qt,t),Ct(Se,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?o_(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=o_(n),t=l_(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Kt(Se),Ct(Se,t)}function gt(){Kt(Se),Kt(qt),Kt(U)}function vt(t){var n=t.memoizedState;n!==null&&(Hr._currentValue=n.memoizedState,Ct(b,t)),n=Se.current;var a=l_(n,t.type);n!==a&&(Ct(qt,t),Ct(Se,a))}function pt(t){qt.current===t&&(Kt(Se),Kt(qt)),b.current===t&&(Kt(b),Hr._currentValue=se)}var Yt,Lt;function zt(t){if(Yt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Yt=n&&n[1]||"",Lt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yt+t+Lt}var ge=!1;function Et(t,n){if(!t||ge)return"";ge=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var dt=function(){throw Error()};if(Object.defineProperty(dt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(dt,[])}catch(Dt){var X=Dt}Reflect.construct(t,[],dt)}else{try{dt.call()}catch(Dt){X=Dt}dt=!1;try{var et=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),dt=!0,new t}finally{dt&&(et!==void 0?Object.defineProperty(t.prototype,"props",et):delete t.prototype.props)}}}else{try{throw Error()}catch(Dt){X=Dt}(dt=t())&&typeof dt.catch=="function"&&dt.catch(function(){})}}catch(Dt){if(Dt&&X&&typeof Dt.stack=="string")return[Dt.stack,X.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),g=c[0],T=c[1];if(g&&T){var O=g.split(`
`),Y=T.split(`
`);for(l=s=0;s<O.length&&!O[s].includes("DetermineComponentFrameRoot");)s++;for(;l<Y.length&&!Y[l].includes("DetermineComponentFrameRoot");)l++;if(s===O.length||l===Y.length)for(s=O.length-1,l=Y.length-1;1<=s&&0<=l&&O[s]!==Y[l];)l--;for(;1<=s&&0<=l;s--,l--)if(O[s]!==Y[l]){if(s!==1||l!==1)do if(s--,l--,0>l||O[s]!==Y[l]){var at=`
`+O[s].replace(" at new "," at ");return t.displayName&&at.includes("<anonymous>")&&(at=at.replace("<anonymous>",t.displayName)),at}while(1<=s&&0<=l);break}}}finally{ge=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?zt(a):""}function Vt(t,n){switch(t.tag){case 26:case 27:case 5:return zt(t.type);case 16:return zt("Lazy");case 13:return t.child!==n&&n!==null?zt("Suspense Fallback"):zt("Suspense");case 19:return zt("SuspenseList");case 0:case 15:return Et(t.type,!1);case 11:return Et(t.type.render,!1);case 1:return Et(t.type,!0);case 31:return zt("Activity");case 30:return zt("ViewTransition");default:return""}}function Jt(t){try{var n="",a=null;do n+=Vt(t,a),a=t,t=t.return;while(t);return n}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var te=Object.prototype.hasOwnProperty,Ht=o.unstable_scheduleCallback,pe=o.unstable_cancelCallback,le=o.unstable_shouldYield,ze=o.unstable_requestPaint,G=o.unstable_now,Ot=o.unstable_getCurrentPriorityLevel,ct=o.unstable_ImmediatePriority,_t=o.unstable_UserBlockingPriority,Pt=o.unstable_NormalPriority,It=o.unstable_LowPriority,re=o.unstable_IdlePriority,Ze=o.log,vn=o.unstable_setDisableYieldValue,be=null,We=null;function xn(t){if(typeof Ze=="function"&&vn(t),We&&typeof We.setStrictMode=="function")try{We.setStrictMode(be,t)}catch{}}var On=Math.clz32?Math.clz32:Eo,Cl=Math.log,$i=Math.LN2;function Eo(t){return t>>>=0,t===0?32:31-(Cl(t)/$i|0)|0}var _s=256,vs=262144,ta=4194304;function Fi(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ea(t,n,a){var s=t.pendingLanes;if(s===0)return 0;var l=0,c=t.suspendedLanes,g=t.pingedLanes;t=t.warmLanes;var T=s&134217727;return T!==0?(s=T&~c,s!==0?l=Fi(s):(g&=T,g!==0?l=Fi(g):a||(a=T&~t,a!==0&&(l=Fi(a))))):(T=s&~c,T!==0?l=Fi(T):g!==0?l=Fi(g):a||(a=s&~t,a!==0&&(l=Fi(a)))),l===0?0:n!==0&&n!==l&&(n&c)===0&&(c=l&-l,a=n&-n,c>=a||c===32&&(a&4194048)!==0)?n:l}function wa(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function To(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var s=31-On(a),l=1<<s;n|=t[s],a&=~l}return n}function Lc(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Dl(){var t=ta;return ta<<=1,(ta&62914560)===0&&(ta=4194304),t}function bo(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function xs(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Oc(t,n,a,s,l,c){var g=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var T=t.entanglements,O=t.expirationTimes,Y=t.hiddenUpdates;for(a=g&~a;0<a;){var at=31-On(a),dt=1<<at;T[at]=0,O[at]=-1;var X=Y[at];if(X!==null)for(Y[at]=null,at=0;at<X.length;at++){var et=X[at];et!==null&&(et.lane&=-536870913)}a&=~dt}s!==0&&wl(t,s,0),c!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=c&~(g&~n))}function wl(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var s=31-On(n);t.entangledLanes|=n,t.entanglements[s]=t.entanglements[s]|1073741824|a&261930}function R(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var s=31-On(a),l=1<<s;l&n|t[s]&n&&(t[s]|=n),a&=~l}}function W(t,n){var a=n&-n;return a=(a&42)!==0?1:st(a),(a&(t.suspendedLanes|n))!==0?0:a}function st(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ot(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Z(){var t=Bt.p;return t!==0?t:(t=window.event,t===void 0?32:q_(t.type))}function Mt(t,n){var a=Bt.p;try{return Bt.p=t,n()}finally{Bt.p=a}}var At=Math.random().toString(36).slice(2),Tt="__reactFiber$"+At,Ut="__reactProps$"+At,Qt="__reactContainer$"+At,ne="__reactEvents$"+At,Zt="__reactListeners$"+At,Ae="__reactHandles$"+At,Ce="__reactResources$"+At,Xe="__reactMarker$"+At,Ge="__reactLoad$"+At;function _e(t){delete t[Tt],delete t[Ut],delete t[Zt],delete t[Ae]}function Wt(t){var n;if(n=t[Tt])return n;for(var a=t.parentNode;a;){if(n=a[Qt]||a[Tt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=b_(t);t!==null;){if(a=t[Tt])return a;t=b_(t)}return n}t=a,a=t.parentNode}return null}function Ke(t){if(t=t[Tt]||t[Qt]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function ye(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function Sn(t){var n=t[Ce];return n||(n=t[Ce]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function je(t){t[Xe]=!0}function Pn(t){t[Ge]=void 0}var Ua=new Set,Ve={};function sn(t,n){dn(t,n),dn(t+"Capture",n)}function dn(t,n){for(Ve[t]=n,t=0;t<n.length;t++)Ua.add(n[t])}var An=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Rn={},ir={};function na(t){return te.call(ir,t)?!0:te.call(Rn,t)?!1:An.test(t)?ir[t]=!0:(Rn[t]=!0,!1)}var De=!1;function Wp(){var t=De;return De=!1,t}function Ul(t,n,a){if(na(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function Nl(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function ia(t,n,a,s){if(s===null)t.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,s)}}function $n(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function jp(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function qx(t,n,a){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var l=s.get,c=s.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return l.call(this)},set:function(g){a=""+g,c.call(this,g)}}),Object.defineProperty(t,n,{enumerable:s.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Pc(t){if(!t._valueTracker){var n=jp(t)?"checked":"value";t._valueTracker=qx(t,n,""+t[n])}}function Zp(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),s="";return t&&(s=jp(t)?t.checked?"true":"false":t.value),t=s,t!==a?(n.setValue(t),!0):!1}var Yx=/[\n"\\]/g;function di(t){return t.replace(Yx,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function zc(t,n,a,s,l,c,g,T){t.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.type=g:t.removeAttribute("type"),n!=null?g==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+$n(n)):t.value!==""+$n(n)&&(t.value=""+$n(n)):g!=="submit"&&g!=="reset"||t.removeAttribute("value"),n!=null?g==="number"&&t.value==n?Ic(t,$n(t.value)):Ic(t,$n(n)):a!=null?Ic(t,$n(a)):s!=null&&t.removeAttribute("value"),l==null&&c!=null&&(t.defaultChecked=!!c),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"?t.name=""+$n(T):t.removeAttribute("name")}function Kp(t,n,a,s,l,c,g,T){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),n!=null||a!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){Pc(t);return}a=a!=null?""+$n(a):"",n=n!=null?""+$n(n):a,T||n===t.value||(t.value=n),t.defaultValue=n}s=s??l,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=T?t.checked:!!s,t.defaultChecked=!!s,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.name=g),Pc(t)}function Ic(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function ar(t,n,a,s){if(t=t.options,n){n={};for(var l=0;l<a.length;l++)n["$"+a[l]]=!0;for(a=0;a<t.length;a++)l=n.hasOwnProperty("$"+t[a].value),t[a].selected!==l&&(t[a].selected=l),l&&s&&(t[a].defaultSelected=!0)}else{for(a=""+$n(a),n=null,l=0;l<t.length;l++){if(t[l].value===a){t[l].selected=!0,s&&(t[l].defaultSelected=!0);return}n!==null||t[l].disabled||(n=t[l])}n!==null&&(n.selected=!0)}}function Qp(t,n,a){if(n!=null&&(n=""+$n(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+$n(a):""}function Jp(t,n,a,s){if(n==null){if(s!=null){if(a!=null)throw Error(r(92));if(wt(s)){if(1<s.length)throw Error(r(93));s=s[0]}a=s}a==null&&(a=""),n=a}a=$n(n),t.defaultValue=a,s=t.textContent,s===a&&s!==""&&s!==null&&(t.value=s),Pc(t)}function sr(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Wx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $p(t,n,a){var s=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?s?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":s?t.setProperty(n,a):typeof a!="number"||a===0||Wx.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function tm(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var s in a)!a.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="",De=!0);for(var l in n)s=n[l],n.hasOwnProperty(l)&&a[l]!==s&&($p(t,l,s),De=!0)}else for(var c in n)n.hasOwnProperty(c)&&$p(t,c,n[c])}function Bc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var jx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Zx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ll(t){return Zx.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Hi(){}var Fc=null;function Hc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var rr=null,or=null;function em(t){var n=Ke(t);if(n&&(t=n.stateNode)){var a=t[Ut]||null;t:switch(t=n.stateNode,n.type){case"input":if(zc(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+di(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var s=a[n];if(s!==t&&s.form===t.form){var l=s[Ut]||null;if(!l)throw Error(r(90));zc(s,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(n=0;n<a.length;n++)s=a[n],s.form===t.form&&Zp(s)}break t;case"textarea":Qp(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&ar(t,!!a.multiple,n,!1)}}}var Gc=!1;function nm(t,n,a){if(Gc)return t(n,a);Gc=!0;try{var s=t(n);return s}finally{if(Gc=!1,(rr!==null||or!==null)&&(Lu(),rr&&(n=rr,t=or,or=rr=null,em(n),t)))for(n=0;n<t.length;n++)em(t[n])}}function Ao(t,n){var a=t.stateNode;if(a===null)return null;var s=a[Ut]||null;if(s===null)return null;a=s[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var aa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vc=!1;if(aa)try{var Ro={};Object.defineProperty(Ro,"passive",{get:function(){Vc=!0}}),window.addEventListener("test",Ro,Ro),window.removeEventListener("test",Ro,Ro)}catch{Vc=!1}var Na=null,kc=null,Ol=null;function im(){if(Ol)return Ol;var t,n=kc,a=n.length,s,l="value"in Na?Na.value:Na.textContent,c=l.length;for(t=0;t<a&&n[t]===l[t];t++);var g=a-t;for(s=1;s<=g&&n[a-s]===l[c-s];s++);return Ol=l.slice(t,1<s?1-s:void 0)}function Pl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function zl(){return!0}function am(){return!1}function Fn(t){function n(a,s,l,c,g){this._reactName=a,this._targetInst=l,this.type=s,this.nativeEvent=c,this.target=g,this.currentTarget=null;for(var T in t)t.hasOwnProperty(T)&&(a=t[T],this[T]=a?a(c):c[T]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?zl:am,this.isPropagationStopped=am,this}return P(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=zl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=zl)},persist:function(){},isPersistent:zl}),n}var La={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=Fn(La),Co=P({},La,{view:0,detail:0}),Kx=Fn(Co),Xc,qc,Do,Bl=P({},Co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Do&&(Do&&t.type==="mousemove"?(Xc=t.screenX-Do.screenX,qc=t.screenY-Do.screenY):qc=Xc=0,Do=t),Xc)},movementY:function(t){return"movementY"in t?t.movementY:qc}}),sm=Fn(Bl),Qx=P({},Bl,{dataTransfer:0}),Jx=Fn(Qx),$x=P({},Co,{relatedTarget:0}),Yc=Fn($x),tS=P({},La,{animationName:0,elapsedTime:0,pseudoElement:0}),eS=Fn(tS),nS=P({},La,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),iS=Fn(nS),aS=P({},La,{data:0}),rm=Fn(aS),sS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},oS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lS(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=oS[t])?!!n[t]:!1}function Wc(){return lS}var uS=P({},Co,{key:function(t){if(t.key){var n=sS[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Pl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?rS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wc,charCode:function(t){return t.type==="keypress"?Pl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Pl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),cS=Fn(uS),fS=P({},Bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),om=Fn(fS),hS=P({},La,{submitter:0}),dS=Fn(hS),pS=P({},Co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wc}),mS=Fn(pS),gS=P({},La,{propertyName:0,elapsedTime:0,pseudoElement:0}),_S=Fn(gS),vS=P({},Bl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),xS=Fn(vS),SS=P({},La,{newState:0,oldState:0,source:0}),yS=Fn(SS),MS=[9,13,27,32],jc=aa&&"CompositionEvent"in window,wo=null;aa&&"documentMode"in document&&(wo=document.documentMode);var ES=aa&&"TextEvent"in window&&!wo,lm=aa&&(!jc||wo&&8<wo&&11>=wo),um=" ",cm=!1;function fm(t,n){switch(t){case"keyup":return MS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var lr=!1;function TS(t,n){switch(t){case"compositionend":return hm(n);case"keypress":return n.which!==32?null:(cm=!0,um);case"textInput":return t=n.data,t===um&&cm?null:t;default:return null}}function bS(t,n){if(lr)return t==="compositionend"||!jc&&fm(t,n)?(t=im(),Ol=kc=Na=null,lr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return lm&&n.locale!=="ko"?null:n.data;default:return null}}var AS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!AS[t.type]:n==="textarea"}function pm(t,n,a,s){rr?or?or.push(s):or=[s]:rr=s,n=Fu(n,"onChange"),0<n.length&&(a=new Il("onChange","change",null,a,s),t.push({event:a,listeners:n}))}var Uo=null,No=null;function RS(t){e_(t,0)}function Fl(t){var n=ye(t);if(Zp(n))return t}function mm(t,n){if(t==="change")return n}var gm=!1;if(aa){var Zc;if(aa){var Kc="oninput"in document;if(!Kc){var _m=document.createElement("div");_m.setAttribute("oninput","return;"),Kc=typeof _m.oninput=="function"}Zc=Kc}else Zc=!1;gm=Zc&&(!document.documentMode||9<document.documentMode)}function vm(){Uo&&(Uo.detachEvent("onpropertychange",xm),No=Uo=null)}function xm(t){if(t.propertyName==="value"&&Fl(No)){var n=[];pm(n,No,t,Hc(t)),nm(RS,n)}}function CS(t,n,a){t==="focusin"?(vm(),Uo=n,No=a,Uo.attachEvent("onpropertychange",xm)):t==="focusout"&&vm()}function DS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(No)}function wS(t,n){if(t==="click")return Fl(n)}function US(t,n){if(t==="input"||t==="change")return Fl(n)}function NS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ti=typeof Object.is=="function"?Object.is:NS;function Lo(t,n){if(ti(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),s=Object.keys(n);if(a.length!==s.length)return!1;for(s=0;s<a.length;s++){var l=a[s];if(!te.call(n,l)||!ti(t[l],n[l]))return!1}return!0}function Qc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Sm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ym(t,n){var a=Sm(t);t=0;for(var s;a;){if(a.nodeType===3){if(s=t+a.textContent.length,t<=n&&s>=n)return{node:a,offset:n-t};t=s}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Sm(a)}}function Mm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Mm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Em(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Qc(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Qc(t.document)}return n}function Jc(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var LS=aa&&"documentMode"in document&&11>=document.documentMode,ur=null,$c=null,Oo=null,tf=!1;function Tm(t,n,a){var s=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;tf||ur==null||ur!==Qc(s)||(s=ur,"selectionStart"in s&&Jc(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Oo&&Lo(Oo,s)||(Oo=s,s=Fu($c,"onSelect"),0<s.length&&(n=new Il("onSelect","select",null,n,a),t.push({event:n,listeners:s}),n.target=ur)))}function Ss(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var cr={animationend:Ss("Animation","AnimationEnd"),animationiteration:Ss("Animation","AnimationIteration"),animationstart:Ss("Animation","AnimationStart"),transitionrun:Ss("Transition","TransitionRun"),transitionstart:Ss("Transition","TransitionStart"),transitioncancel:Ss("Transition","TransitionCancel"),transitionend:Ss("Transition","TransitionEnd")},ef={},bm={};aa&&(bm=document.createElement("div").style,"AnimationEvent"in window||(delete cr.animationend.animation,delete cr.animationiteration.animation,delete cr.animationstart.animation),"TransitionEvent"in window||delete cr.transitionend.transition);function ys(t){if(ef[t])return ef[t];if(!cr[t])return t;var n=cr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in bm)return ef[t]=n[a];return t}var Am=ys("animationend"),Rm=ys("animationiteration"),Cm=ys("animationstart"),OS=ys("transitionrun"),PS=ys("transitionstart"),zS=ys("transitioncancel"),Dm=ys("transitionend"),wm=new Map,nf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");nf.push("scrollEnd");function Ci(t,n){wm.set(t,n),sn(n,[t])}var IS=0;function sa(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Ni.identifierPrefix;var a=IS++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Um(t){if(t==null||typeof t=="string")return t;var n=null,a=wr;if(a!==null)for(var s=0;s<a.length;s++){var l=t[a[s]];if(l!=null){if(l==="none")return"none";n=n==null?l:n+(" "+l)}}return n??t.default}function ra(t,n){return t=Um(t),n=Um(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Hl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},pi=[],fr=0,af=0;function Gl(){for(var t=fr,n=af=fr=0;n<t;){var a=pi[n];pi[n++]=null;var s=pi[n];pi[n++]=null;var l=pi[n];pi[n++]=null;var c=pi[n];if(pi[n++]=null,s!==null&&l!==null){var g=s.pending;g===null?l.next=l:(l.next=g.next,g.next=l),s.pending=l}c!==0&&Nm(a,l,c)}}function Vl(t,n,a,s){pi[fr++]=t,pi[fr++]=n,pi[fr++]=a,pi[fr++]=s,af|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function sf(t,n,a,s){return Vl(t,n,a,s),kl(t)}function Ms(t,n){return Vl(t,null,null,n),kl(t)}function Nm(t,n,a){t.lanes|=a;var s=t.alternate;s!==null&&(s.lanes|=a);for(var l=!1,c=t.return;c!==null;)c.childLanes|=a,s=c.alternate,s!==null&&(s.childLanes|=a),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(l=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,l&&n!==null&&(l=31-On(a),t=c.hiddenUpdates,s=t[l],s===null?t[l]=[n]:s.push(n),n.lane=a|536870912),c):null}function kl(t){if(50<nl)throw nl=0,Nu=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var hr={};function BS(t,n,a,s){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,n,a,s){return new BS(t,n,a,s)}function rf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function oa(t,n){var a=t.alternate;return a===null?(a=Yn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Lm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Xl(t,n,a,s,l,c){var g=0;if(s=t,typeof s=="function")rf(s)&&(g=1);else if(typeof s=="string")g=hM(t,a,Se.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(s){case Gt:return t=Yn(31,a,n,l),t.elementType=Gt,t.lanes=c,t;case L:return Es(a.children,l,c,n);case Q:g=8,l|=24;break;case J:return t=Yn(12,a,n,l|2),t.elementType=J,t.lanes=c,t;case rt:return t=Yn(13,a,n,l),t.elementType=rt,t.lanes=c,t;case $:return t=Yn(19,a,n,l),t.elementType=$,t.lanes=c,t;case ee:case C:return t=l|32,t=Yn(30,a,n,t),t.elementType=C,t.lanes=c,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case ut:g=10;break t;case lt:g=9;break t;case H:g=11;break t;case xt:g=14;break t;case yt:g=16,s=null;break t}g=29,a=Error(r(130,t===null?"null":typeof t,"")),s=null}return n=Yn(g,a,n,l),n.elementType=t,n.type=s,n.lanes=c,n}function Es(t,n,a,s){return t=Yn(7,t,s,n),t.lanes=a,t}function of(t,n,a){return t=Yn(6,t,null,n),t.lanes=a,t}function Om(t){var n=Yn(18,null,null,0);return n.stateNode=t,n}function lf(t,n,a){return n=Yn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Pm=new WeakMap;function mi(t,n){if(typeof t=="object"&&t!==null){var a=Pm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Jt(n)},Pm.set(t,n),n)}return{value:t,source:n,stack:Jt(n)}}var dr=[],pr=0,ql=null,Po=0,gi=[],_i=0,Oa=null,Gi=1,Vi="";function la(t,n){dr[pr++]=Po,dr[pr++]=ql,ql=t,Po=n}function zm(t,n,a){gi[_i++]=Gi,gi[_i++]=Vi,gi[_i++]=Oa,Oa=t;var s=Gi;t=Vi;var l=32-On(s)-1;s&=~(1<<l),a+=1;var c=32-On(n)+l;if(30<c){var g=l-l%5;c=(s&(1<<g)-1).toString(32),s>>=g,l-=g,Gi=1<<32-On(n)+l|a<<l|s,Vi=c+t}else Gi=1<<c|a<<l|s,Vi=t}function Yl(t){t.return!==null&&(la(t,1),zm(t,1,0))}function uf(t){for(;t===ql;)ql=dr[--pr],dr[pr]=null,Po=dr[--pr],dr[pr]=null;for(;t===Oa;)Oa=gi[--_i],gi[_i]=null,Vi=gi[--_i],gi[_i]=null,Gi=gi[--_i],gi[_i]=null}function Im(t,n){gi[_i++]=Gi,gi[_i++]=Vi,gi[_i++]=Oa,Gi=n.id,Vi=n.overflow,Oa=t}var yn=null,qe=null,de=!1,Pa=null,vi=!1,cf=Error(r(519));function za(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw zo(mi(n,t)),cf}function Bm(t){var n=t.stateNode,a=t.type,s=t.memoizedProps;switch(n[Tt]=t,n[Ut]=s,a){case"dialog":xe("cancel",n),xe("close",n);break;case"iframe":case"object":case"embed":xe("load",n);break;case"video":case"audio":for(a=0;a<al.length;a++)xe(al[a],n);break;case"source":xe("error",n);break;case"img":case"image":case"link":xe("error",n),xe("load",n);break;case"details":xe("toggle",n);break;case"input":xe("invalid",n),Kp(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":xe("invalid",n);break;case"textarea":xe("invalid",n),Jp(n,s.value,s.defaultValue,s.children)}a=s.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||s.suppressHydrationWarning===!0||s_(n.textContent,a)?(s.popover!=null&&(xe("beforetoggle",n),xe("toggle",n)),s.onScroll!=null&&xe("scroll",n),s.onScrollEnd!=null&&xe("scrollend",n),s.onClick!=null&&(n.onclick=Hi),n=!0):n=!1,n||za(t,!0)}function Wl(t){for(yn=t.return;yn;)switch(yn.tag){case 5:case 31:case 13:vi=!1;return;case 27:case 3:vi=!0;return;default:yn=yn.return}}function mr(t){if(t!==yn)return!1;if(!de)return Wl(t),de=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Hh(t.type,t.memoizedProps)),a=!a),a&&qe&&za(t),Wl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));qe=T_(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));qe=T_(t)}else n===27?(n=qe,Ja(t.type)?(t=Zh,Zh=null,qe=t):qe=n):qe=yn?Si(t.stateNode.nextSibling):null;return!0}function Ts(){qe=yn=null,de=!1}function ff(){var t=Pa;return t!==null&&(Zn===null?Zn=t:Zn.push.apply(Zn,t),Pa=null),t}function zo(t){Pa===null?Pa=[t]:Pa.push(t)}var hf=ae(null),bs=null,ua=null;function Ia(t,n,a){Ct(hf,n._currentValue),n._currentValue=a}function ca(t){t._currentValue=hf.current,Kt(hf)}function jl(t,n,a){for(;t!==null;){var s=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),t===a)break;t=t.return}}function df(t,n,a,s){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var c=l.dependencies;if(c!==null){var g=l.child;c=c.firstContext;t:for(;c!==null;){var T=c;c=l;for(var O=0;O<n.length;O++)if(T.context===n[O]){c.lanes|=a,T=c.alternate,T!==null&&(T.lanes|=a),jl(c.return,a,t),s||(g=null);break t}c=T.next}}else if(l.tag===18){if(g=l.return,g===null)throw Error(r(341));g.lanes|=a,c=g.alternate,c!==null&&(c.lanes|=a),jl(g,a,t),g=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=a,g=l.alternate,g!==null&&(g.lanes|=a),jl(l.return,a,t),g=l.child,g=g!==null?g.sibling:null):g=l.child;if(g!==null)g.return=l;else for(g=l;g!==null;){if(g===t){g=null;break}if(l=g.sibling,l!==null){l.return=g.return,g=l;break}g=g.return}l=g}}function As(t,n,a,s){t=null;for(var l=n,c=!1;l!==null;){if(!c){if((l.flags&524288)!==0)c=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var g=l.alternate;if(g===null)throw Error(r(387));if(g=g.memoizedProps,g!==null){var T=l.type;ti(l.pendingProps.value,g.value)||(t!==null?t.push(T):t=[T])}}else if(l===b.current){if(g=l.alternate,g===null)throw Error(r(387));g.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Hr):t=[Hr])}l=l.return}return t!==null&&df(n,t,a,s),n.flags|=262144,t!==null}function Zl(t){for(t=t.firstContext;t!==null;){if(!ti(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Rs(t){bs=t,ua=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Cn(t){return Fm(bs,t)}function Kl(t,n){return bs===null&&Rs(t),Fm(t,n)}function Fm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ua===null){if(t===null)throw Error(r(308));ua=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ua=ua.next=n;return a}var FS=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,s){t.push(s)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},HS=o.unstable_scheduleCallback,GS=o.unstable_NormalPriority,rn={$$typeof:ut,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pf(){return{controller:new FS,data:new Map,refCount:0}}function Io(t){t.refCount--,t.refCount===0&&HS(GS,function(){t.controller.abort()})}function Hm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var s=n[t];a.indexOf(s)===-1&&a.push(s)}}}var Bo=null;function VS(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Fo=null,mf=0,Cs=0,gr=null;function kS(t,n){if(Fo===null){var a=Fo=[];mf=0,Cs=Uh(),gr={status:"pending",value:void 0,then:function(s){a.push(s)}}}return mf++,n.then(Gm,Gm),n}function Gm(){if(--mf===0&&(Bo=null,Fo!==null)){gr!==null&&(gr.status="fulfilled");var t=Fo;Fo=null,Cs=0,gr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function XS(t,n){var a=[],s={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return t.then(function(){s.status="fulfilled",s.value=n;for(var l=0;l<a.length;l++)(0,a[l])(n)},function(l){for(s.status="rejected",s.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),s}var Vm=Rt.S;Rt.S=function(t,n){if(O0=G(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&kS(t,n),Bo!==null)for(var a=Or;a!==null;)Hm(a,Bo),a=a.next;if(a=t.types,a!==null){for(var s=Or;s!==null;)Hm(s,a),s=s.next;if(Cs!==0){s=Bo,s===null&&(s=Bo=[]);for(var l=0;l<a.length;l++){var c=a[l];s.indexOf(c)===-1&&s.push(c)}}}Vm!==null&&Vm(t,n)};var Ds=ae(null);function gf(){var t=Ds.current;return t!==null?t:ke.pooledCache}function Ql(t,n){n===null?Ct(Ds,Ds.current):Ct(Ds,n.pool)}function km(){var t=gf();return t===null?null:{parent:rn._currentValue,pool:t}}var _r=Error(r(460)),_f=Error(r(474)),Jl=Error(r(542)),$l={then:function(){}};function Xm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function qm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Hi,Hi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Wm(t),t===void 0&&!("reason"in n)?Error(r(600)):t;default:if(typeof n.status=="string")n.then(Hi,Hi);else{if(t=ke,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(s){if(n.status==="pending"){var l=n;l.status="fulfilled",l.value=s}},function(s){if(n.status==="pending"){var l=n;l.status="rejected",l.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Wm(t),t}throw Us=n,_r}}function ws(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Us=a,_r):a}}var Us=null;function Ym(){if(Us===null)throw Error(r(459));var t=Us;return Us=null,t}function Wm(t){if(t===_r||t===Jl)throw Error(r(483))}var vr=null,Ho=0;function tu(t){var n=Ho;return Ho+=1,vr===null&&(vr=[]),qm(vr,t,n)}function Ba(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function eu(t,n){throw n.$$typeof===k?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function jm(t){function n(q,B){if(t){var tt=q.deletions;tt===null?(q.deletions=[B],q.flags|=16):tt.push(B)}}function a(q,B){if(!t)return null;for(;B!==null;)n(q,B),B=B.sibling;return null}function s(q){for(var B=new Map;q!==null;)q.key===null?B.set(q.index,q):B.set(q.key,q),q=q.sibling;return B}function l(q,B){return q=oa(q,B),q.index=0,q.sibling=null,q}function c(q,B,tt){return q.index=tt,t?(tt=q.alternate,tt!==null?(tt=tt.index,tt<B?(q.flags|=2,B):tt):(q.flags|=134217730,B)):(q.flags|=1048576,B)}function g(q){return t&&q.alternate===null&&(q.flags|=134217730),q}function T(q,B,tt,ht){return B===null||B.tag!==6?(B=of(tt,q.mode,ht),B.return=q,B):(B=l(B,tt),B.return=q,B)}function O(q,B,tt,ht){var Ft=tt.type;return Ft===L?(q=at(q,B,tt.props.children,ht,tt.key),Ba(q,tt),q):B!==null&&(B.elementType===Ft||typeof Ft=="object"&&Ft!==null&&Ft.$$typeof===yt&&ws(Ft)===B.type)?(B=l(B,tt.props),Ba(B,tt),B.return=q,B):(B=Xl(tt.type,tt.key,tt.props,null,q.mode,ht),Ba(B,tt),B.return=q,B)}function Y(q,B,tt,ht){return B===null||B.tag!==4||B.stateNode.containerInfo!==tt.containerInfo||B.stateNode.implementation!==tt.implementation?(B=lf(tt,q.mode,ht),B.return=q,B):(B=l(B,tt.children||[]),B.return=q,B)}function at(q,B,tt,ht,Ft){return B===null||B.tag!==7?(B=Es(tt,q.mode,ht,Ft),B.return=q,B):(B=l(B,tt),B.return=q,B)}function dt(q,B,tt){if(typeof B=="string"&&B!==""||typeof B=="number"||typeof B=="bigint")return B=of(""+B,q.mode,tt),B.return=q,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case w:return tt=Xl(B.type,B.key,B.props,null,q.mode,tt),Ba(tt,B),tt.return=q,tt;case E:return B=lf(B,q.mode,tt),B.return=q,B;case yt:return B=ws(B),dt(q,B,tt)}if(wt(B)||ft(B))return B=Es(B,q.mode,tt,null),B.return=q,B;if(typeof B.then=="function")return dt(q,tu(B),tt);if(B.$$typeof===ut)return dt(q,Kl(q,B),tt);eu(q,B)}return null}function X(q,B,tt,ht){var Ft=B!==null?B.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return Ft!==null?null:T(q,B,""+tt,ht);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case w:return tt.key===Ft?O(q,B,tt,ht):null;case E:return tt.key===Ft?Y(q,B,tt,ht):null;case yt:return tt=ws(tt),X(q,B,tt,ht)}if(wt(tt)||ft(tt))return Ft!==null?null:at(q,B,tt,ht,null);if(typeof tt.then=="function")return X(q,B,tu(tt),ht);if(tt.$$typeof===ut)return X(q,B,Kl(q,tt),ht);eu(q,tt)}return null}function et(q,B,tt,ht,Ft){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return q=q.get(tt)||null,T(B,q,""+ht,Ft);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case w:return q=q.get(ht.key===null?tt:ht.key)||null,O(B,q,ht,Ft);case E:return q=q.get(ht.key===null?tt:ht.key)||null,Y(B,q,ht,Ft);case yt:return ht=ws(ht),et(q,B,tt,ht,Ft)}if(wt(ht)||ft(ht))return q=q.get(tt)||null,at(B,q,ht,Ft,null);if(typeof ht.then=="function")return et(q,B,tt,tu(ht),Ft);if(ht.$$typeof===ut)return et(q,B,tt,Kl(B,ht),Ft);eu(B,ht)}return null}function Dt(q,B,tt,ht){for(var Ft=null,Ee=null,jt=B,$t=B=0,un=null;jt!==null&&$t<tt.length;$t++){jt.index>$t?(un=jt,jt=null):un=jt.sibling;var Re=X(q,jt,tt[$t],ht);if(Re===null){jt===null&&(jt=un);break}t&&jt&&Re.alternate===null&&n(q,jt),B=c(Re,B,$t),Ee===null?Ft=Re:Ee.sibling=Re,Ee=Re,jt=un}if($t===tt.length)return a(q,jt),de&&la(q,$t),Ft;if(jt===null){for(;$t<tt.length;$t++)jt=dt(q,tt[$t],ht),jt!==null&&(B=c(jt,B,$t),Ee===null?Ft=jt:Ee.sibling=jt,Ee=jt);return de&&la(q,$t),Ft}for(jt=s(jt);$t<tt.length;$t++)un=et(jt,q,$t,tt[$t],ht),un!==null&&(t&&(Re=un.alternate,Re!==null&&jt.delete(Re.key===null?$t:Re.key)),B=c(un,B,$t),Ee===null?Ft=un:Ee.sibling=un,Ee=un);return t&&jt.forEach(function(is){return n(q,is)}),de&&la(q,$t),Ft}function Xt(q,B,tt,ht){if(tt==null)throw Error(r(151));for(var Ft=null,Ee=null,jt=B,$t=B=0,un=null,Re=tt.next();jt!==null&&!Re.done;$t++,Re=tt.next()){jt.index>$t?(un=jt,jt=null):un=jt.sibling;var is=X(q,jt,Re.value,ht);if(is===null){jt===null&&(jt=un);break}t&&jt&&is.alternate===null&&n(q,jt),B=c(is,B,$t),Ee===null?Ft=is:Ee.sibling=is,Ee=is,jt=un}if(Re.done)return a(q,jt),de&&la(q,$t),Ft;if(jt===null){for(;!Re.done;$t++,Re=tt.next())Re=dt(q,Re.value,ht),Re!==null&&(B=c(Re,B,$t),Ee===null?Ft=Re:Ee.sibling=Re,Ee=Re);return de&&la(q,$t),Ft}for(jt=s(jt);!Re.done;$t++,Re=tt.next())Re=et(jt,q,$t,Re.value,ht),Re!==null&&(t&&(un=Re.alternate,un!==null&&jt.delete(un.key===null?$t:un.key)),B=c(Re,B,$t),Ee===null?Ft=Re:Ee.sibling=Re,Ee=Re);return t&&jt.forEach(function(TM){return n(q,TM)}),de&&la(q,$t),Ft}function ce(q,B,tt,ht){if(typeof tt=="object"&&tt!==null&&tt.type===L&&tt.key===null&&tt.props.ref===void 0&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case w:t:{for(var Ft=tt.key;B!==null;){if(B.key===Ft){if(Ft=tt.type,Ft===L){if(B.tag===7){a(q,B.sibling),ht=l(B,tt.props.children),Ba(ht,tt),ht.return=q,q=ht;break t}}else if(B.elementType===Ft||typeof Ft=="object"&&Ft!==null&&Ft.$$typeof===yt&&ws(Ft)===B.type){a(q,B.sibling),ht=l(B,tt.props),Ba(ht,tt),ht.return=q,q=ht;break t}a(q,B);break}else n(q,B);B=B.sibling}tt.type===L?(ht=Es(tt.props.children,q.mode,ht,tt.key),Ba(ht,tt),ht.return=q,q=ht):(ht=Xl(tt.type,tt.key,tt.props,null,q.mode,ht),Ba(ht,tt),ht.return=q,q=ht)}return g(q);case E:t:{for(Ft=tt.key;B!==null;){if(B.key===Ft)if(B.tag===4&&B.stateNode.containerInfo===tt.containerInfo&&B.stateNode.implementation===tt.implementation){a(q,B.sibling),ht=l(B,tt.children||[]),ht.return=q,q=ht;break t}else{a(q,B);break}else n(q,B);B=B.sibling}ht=lf(tt,q.mode,ht),ht.return=q,q=ht}return g(q);case yt:return tt=ws(tt),ce(q,B,tt,ht)}if(wt(tt))return Dt(q,B,tt,ht);if(ft(tt)){if(Ft=ft(tt),typeof Ft!="function")throw Error(r(150));return tt=Ft.call(tt),Xt(q,B,tt,ht)}if(typeof tt.then=="function")return ce(q,B,tu(tt),ht);if(tt.$$typeof===ut)return ce(q,B,Kl(q,tt),ht);eu(q,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,B!==null&&B.tag===6?(a(q,B.sibling),ht=l(B,tt),ht.return=q,q=ht):(a(q,B),ht=of(tt,q.mode,ht),ht.return=q,q=ht),g(q)):a(q,B)}return function(q,B,tt,ht){try{Ho=0;var Ft=ce(q,B,tt,ht);return vr=null,Ft}catch(jt){if(jt===_r||jt===Jl)throw jt;var Ee=Yn(29,jt,null,q.mode);return Ee.lanes=ht,Ee.return=q,Ee}finally{}}}var Ns=jm(!0),Zm=jm(!1),Fa=!1;function vf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ha(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ga(t,n,a){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(Ue&2)!==0){var l=s.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),s.pending=n,n=kl(t),Nm(t,null,a),n}return Vl(t,s,n,a),kl(t)}function Go(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,R(t,a)}}function Sf(t,n){var a=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,a===s)){var l=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};c===null?l=c=g:c=c.next=g,a=a.next}while(a!==null);c===null?l=c=n:c=c.next=n}else l=c=n;a={baseState:s.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var yf=!1;function Vo(){if(yf){var t=gr;if(t!==null)throw t}}function ko(t,n,a,s){yf=!1;var l=t.updateQueue;Fa=!1;var c=l.firstBaseUpdate,g=l.lastBaseUpdate,T=l.shared.pending;if(T!==null){l.shared.pending=null;var O=T,Y=O.next;O.next=null,g===null?c=Y:g.next=Y,g=O;var at=t.alternate;at!==null&&(at=at.updateQueue,T=at.lastBaseUpdate,T!==g&&(T===null?at.firstBaseUpdate=Y:T.next=Y,at.lastBaseUpdate=O))}if(c!==null){var dt=l.baseState;g=0,at=Y=O=null,T=c;do{var X=T.lane&-536870913,et=X!==T.lane;if(et?(Me&X)===X:(s&X)===X){X!==0&&X===Cs&&(yf=!0),at!==null&&(at=at.next={lane:0,tag:T.tag,payload:T.payload,callback:null,next:null});t:{var Dt=t,Xt=T;X=n;var ce=a;switch(Xt.tag){case 1:if(Dt=Xt.payload,typeof Dt=="function"){dt=Dt.call(ce,dt,X);break t}dt=Dt;break t;case 3:Dt.flags=Dt.flags&-65537|128;case 0:if(Dt=Xt.payload,X=typeof Dt=="function"?Dt.call(ce,dt,X):Dt,X==null)break t;dt=P({},dt,X);break t;case 2:Fa=!0}}X=T.callback,X!==null&&(t.flags|=64,et&&(t.flags|=8192),et=l.callbacks,et===null?l.callbacks=[X]:et.push(X))}else et={lane:X,tag:T.tag,payload:T.payload,callback:T.callback,next:null},at===null?(Y=at=et,O=dt):at=at.next=et,g|=X;if(T=T.next,T===null){if(T=l.shared.pending,T===null)break;et=T,T=et.next,et.next=null,l.lastBaseUpdate=et,l.shared.pending=null}}while(!0);at===null&&(O=dt),l.baseState=O,l.firstBaseUpdate=Y,l.lastBaseUpdate=at,c===null&&(l.shared.lanes=0),ja|=g,t.lanes=g,t.memoizedState=dt}}function Km(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function Qm(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Km(a[t],n)}var Va=ae(null),nu=ae(0);function Jm(t,n){t=ma,Ct(nu,t),Ct(Va,n),ma=t|n.baseLanes}function Mf(){Ct(nu,ma),Ct(Va,Va.current)}function Ef(){ma=nu.current,Kt(Va),Kt(nu)}var Dn=ae(null),zn=null;function ka(t){var n=t.alternate;Ct(wn,wn.current&1),Ct(Dn,t),zn===null&&(n===null||Va.current!==null||n.memoizedState!==null)&&(zn=t)}function Tf(t){Ct(wn,wn.current),Ct(Dn,t),zn===null&&(zn=t)}function $m(t){t.tag===22?(Ct(wn,wn.current),Ct(Dn,t),zn===null&&(zn=t)):Xa()}function Xa(){Ct(wn,wn.current),Ct(Dn,Dn.current)}function ei(t){Kt(Dn),zn===t&&(zn=null),Kt(wn)}var wn=ae(0);function Xo(t,n){Ct(Dn,Dn.current),Ct(wn,n)}function bf(t){Kt(wn),Kt(Dn),zn===t&&(zn=null)}function iu(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Wh(a)||jh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var fa=0,ue=null,Ie=null,on=null,au=!1,xr=!1,Ls=!1,su=0,qo=0,Sr=null,qS=0;function $e(){throw Error(r(321))}function Af(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ti(t[a],n[a]))return!1;return!0}function Rf(t,n,a,s,l,c){return fa=c,ue=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Rt.H=t===null||t.memoizedState===null?zg:Ig,Ls=!1,c=a(s,l),Ls=!1,xr&&(c=eg(n,a,s,l)),tg(t),c}function tg(t){Rt.H=hu;var n=Ie!==null&&Ie.next!==null;if(fa=0,on=Ie=ue=null,au=!1,qo=0,Sr=null,n)throw Error(r(300));t===null||ln||(t=t.dependencies,t!==null&&Zl(t)&&(ln=!0))}function eg(t,n,a,s){ue=t;var l=0;do{if(xr&&(Sr=null),qo=0,xr=!1,25<=l)throw Error(r(301));if(l+=1,on=Ie=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}Rt.H=$S,c=n(a,s)}while(xr);return c}function YS(){var t=Rt.H,n=t.useState()[0];return n=typeof n.then=="function"?Yo(n):n,t=t.useState()[0],(Ie!==null?Ie.memoizedState:null)!==t&&(ue.flags|=1024),n}function Cf(){var t=su!==0;return su=0,t}function Df(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function wf(t){if(au){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}au=!1}fa=0,on=Ie=ue=null,xr=!1,qo=su=0,Sr=null}function Hn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?ue.memoizedState=on=t:on=on.next=t,on}function nn(){if(Ie===null){var t=ue.alternate;t=t!==null?t.memoizedState:null}else t=Ie.next;var n=on===null?ue.memoizedState:on.next;if(n!==null)on=n,Ie=t;else{if(t===null)throw ue.alternate===null?Error(r(467)):Error(r(310));Ie=t,t={memoizedState:Ie.memoizedState,baseState:Ie.baseState,baseQueue:Ie.baseQueue,queue:Ie.queue,next:null},on===null?ue.memoizedState=on=t:on=on.next=t}return on}function ru(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Yo(t){var n=qo;return qo+=1,Sr===null&&(Sr=[]),t=qm(Sr,t,n),n=ue,(on===null?n.memoizedState:on.next)===null&&(n=n.alternate,Rt.H=n===null||n.memoizedState===null?zg:Ig),t}function ou(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Yo(t);if(t.$$typeof===j)return;if(t.$$typeof===ut)return Cn(t)}throw Error(r(438,String(t)))}function Uf(t){var n=null,a=ue.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var s=ue.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(l){return l.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ru(),ue.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),s=0;s<t;s++)a[s]=Te;return n.index++,a}function ha(t,n){return typeof n=="function"?n(t):n}function lu(t){var n=nn();return Nf(n,Ie,t)}function Nf(t,n,a){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=a;var l=t.baseQueue,c=s.pending;if(c!==null){if(l!==null){var g=l.next;l.next=c.next,c.next=g}n.baseQueue=l=c,s.pending=null}if(c=t.baseState,l===null)t.memoizedState=c;else{n=l.next;var T=g=null,O=null,Y=n,at=!1;do{var dt=Y.lane&-536870913;if(dt!==Y.lane?(Me&dt)===dt:(fa&dt)===dt){var X=Y.revertLane;if(X===0)O!==null&&(O=O.next={lane:0,revertLane:0,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null}),dt===Cs&&(at=!0);else if((fa&X)===X){Y=Y.next,X===Cs&&(at=!0);continue}else dt={lane:0,revertLane:Y.revertLane,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},O===null?(T=O=dt,g=c):O=O.next=dt,ue.lanes|=X,ja|=X;dt=Y.action,Ls&&a(c,dt),c=Y.hasEagerState?Y.eagerState:a(c,dt)}else X={lane:dt,revertLane:Y.revertLane,gesture:Y.gesture,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},O===null?(T=O=X,g=c):O=O.next=X,ue.lanes|=dt,ja|=dt;Y=Y.next}while(Y!==null&&Y!==n);if(O===null?g=c:O.next=T,!ti(c,t.memoizedState)&&(ln=!0,at&&(a=gr,a!==null)))throw a;t.memoizedState=c,t.baseState=g,t.baseQueue=O,s.lastRenderedState=c}return l===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function Lf(t){var n=nn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var s=a.dispatch,l=a.pending,c=n.memoizedState;if(l!==null){a.pending=null;var g=l=l.next;do c=t(c,g.action),g=g.next;while(g!==l);ti(c,n.memoizedState)||(ln=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),a.lastRenderedState=c}return[c,s]}function ng(t,n,a){var s=ue,l=nn(),c=de;if(c){if(a===void 0)throw Error(r(407));a=a()}else a=n();var g=!ti((Ie||l).memoizedState,a);if(g&&(l.memoizedState=a,ln=!0),l=l.queue,zf(sg.bind(null,s,l,t),[t]),t=l.getSnapshot!==n||g||on!==null&&(on.memoizedState.tag&1)!==0,yr(t?9:8,{destroy:void 0},ag.bind(null,s,l,a,n),null),t){if(s.flags|=2048,ke===null)throw Error(r(349));c||(fa&127)!==0||ig(s,n,a)}return a}function ig(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=ue.updateQueue,n===null?(n=ru(),ue.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function ag(t,n,a,s){n.value=a,n.getSnapshot=s,rg(n)&&og(t)}function sg(t,n,a){return a(function(){rg(n)&&og(t)})}function rg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ti(t,a)}catch{return!0}}function og(t){var n=Ms(t,2);n!==null&&Kn(n,t,2)}function Of(t){var n=Hn();if(typeof t=="function"){var a=t;if(t=a(),Ls){xn(!0);try{a()}finally{xn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:t},n}function lg(t,n,a,s){return t.baseState=a,Nf(t,Ie,typeof s=="function"?s:ha)}function WS(t,n,a,s,l){if(fu(t))throw Error(r(485));if(t=n.action,t!==null){var c={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){c.listeners.push(g)}};Rt.T!==null?a(!0):c.isTransition=!1,s(c),a=n.pending,a===null?(c.next=n.pending=c,ug(n,c)):(c.next=a.next,n.pending=a.next=c)}}function ug(t,n){var a=n.action,s=n.payload,l=t.state;if(n.isTransition){var c=Rt.T,g={};g.types=c!==null?c.types:null,Rt.T=g;try{var T=a(l,s),O=Rt.S;O!==null&&O(g,T),cg(t,n,T)}catch(Y){Pf(t,n,Y)}finally{c!==null&&g.types!==null&&(c.types=g.types),Rt.T=c}}else try{c=a(l,s),cg(t,n,c)}catch(Y){Pf(t,n,Y)}}function cg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(s){fg(t,n,s)},function(s){return Pf(t,n,s)}):fg(t,n,a)}function fg(t,n,a){n.status="fulfilled",n.value=a,hg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,ug(t,a)))}function Pf(t,n,a){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=a,hg(n),n=n.next;while(n!==s)}t.action=null}function hg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function dg(t,n){return n}function pg(t,n){if(de){var a=ke.formState;if(a!==null){t:{var s=ue;if(de){if(qe){e:{for(var l=qe,c=vi;l.nodeType!==8;){if(!c){l=null;break e}if(l=Si(l.nextSibling),l===null){l=null;break e}}c=l.data,l=c==="F!"||c==="F"?l:null}if(l){qe=Si(l.nextSibling),s=l.data==="F!";break t}}za(s)}s=!1}s&&(n=a[0])}}return a=Hn(),a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:dg,lastRenderedState:n},a.queue=s,a=Lg.bind(null,ue,s),s.dispatch=a,s=Of(!1),c=Gf.bind(null,ue,!1,s.queue),s=Hn(),l={state:n,dispatch:null,action:t,pending:null},s.queue=l,a=WS.bind(null,ue,l,c,a),l.dispatch=a,s.memoizedState=t,[n,a,!1]}function mg(t){var n=nn();return gg(n,Ie,t)}function gg(t,n,a){if(n=Nf(t,n,dg)[0],t=lu(ha)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var s=Yo(n)}catch(g){throw g===_r?Jl:g}else s=n;n=nn();var l=n.queue,c=l.dispatch;return a!==n.memoizedState&&(ue.flags|=2048,yr(9,{destroy:void 0},jS.bind(null,l,a),null)),[s,c,t]}function jS(t,n){t.action=n}function _g(t){var n=nn(),a=Ie;if(a!==null)return gg(n,a,t);nn(),n=n.memoizedState,a=nn();var s=a.queue.dispatch;return a.memoizedState=t,[n,s,!1]}function yr(t,n,a,s){return t={tag:t,create:a,deps:s,inst:n,next:null},n=ue.updateQueue,n===null&&(n=ru(),ue.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(s=a.next,a.next=t,t.next=s,n.lastEffect=t),t}function vg(){return nn().memoizedState}function uu(t,n,a,s){var l=Hn();ue.flags|=t,l.memoizedState=yr(1|n,{destroy:void 0},a,s===void 0?null:s)}function cu(t,n,a,s){var l=nn();s=s===void 0?null:s;var c=l.memoizedState.inst;Ie!==null&&s!==null&&Af(s,Ie.memoizedState.deps)?l.memoizedState=yr(n,c,a,s):(ue.flags|=t,l.memoizedState=yr(1|n,c,a,s))}function xg(t,n){uu(8390656,8,t,n)}function zf(t,n){cu(2048,8,t,n)}function ZS(t){ue.flags|=4;var n=ue.updateQueue;if(n===null)n=ru(),ue.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Sg(t){var n=nn().memoizedState;return ZS({ref:n,nextImpl:t}),function(){if((Ue&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function yg(t,n){return cu(4,2,t,n)}function Mg(t,n){return cu(4,4,t,n)}function Eg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Tg(t,n,a){a=a!=null?a.concat([t]):null,cu(4,4,Eg.bind(null,n,t),a)}function If(){}function bg(t,n){var a=nn();n=n===void 0?null:n;var s=a.memoizedState;return n!==null&&Af(n,s[1])?s[0]:(a.memoizedState=[t,n],t)}function Ag(t,n){var a=nn();n=n===void 0?null:n;var s=a.memoizedState;if(n!==null&&Af(n,s[1]))return s[0];if(s=t(),Ls){xn(!0);try{t()}finally{xn(!1)}}return a.memoizedState=[s,n],s}function Bf(t,n,a){return a===void 0||(fa&1073741824)!==0&&(Me&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=z0(),ue.lanes|=t,ja|=t,a)}function Rg(t,n,a,s){return ti(a,n)?a:Va.current!==null?(t=Bf(t,a,s),ti(t,n)||(ln=!0),t):(fa&106)===0||(fa&1073741824)!==0&&(Me&261930)===0?(ln=!0,t.memoizedState=a):(t=z0(),ue.lanes|=t,ja|=t,n)}function Cg(t,n,a,s,l){var c=Bt.p;Bt.p=c!==0&&8>c?c:8;var g=Rt.T,T={};T.types=g!==null?g.types:null,Rt.T=T,Gf(t,!1,n,a);try{var O=l(),Y=Rt.S;if(Y!==null&&Y(T,O),O!==null&&typeof O=="object"&&typeof O.then=="function"){var at=XS(O,s);Wo(t,n,at,si(t))}else Wo(t,n,s,si(t))}catch(dt){Wo(t,n,{then:function(){},status:"rejected",reason:dt},si())}finally{Bt.p=c,g!==null&&T.types!==null&&(g.types=T.types),Rt.T=g}}function KS(){}function Ff(t,n,a,s){if(t.tag!==5)throw Error(r(476));var l=Dg(t).queue;Cg(t,l,n,se,a===null?KS:function(){return wg(t),a(s)})}function Dg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:se},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function wg(t){var n=Dg(t);n.next===null&&(n=t.alternate.memoizedState),Wo(t,n.next.queue,{},si())}function Hf(){return Cn(Hr)}function Ug(){return nn().memoizedState}function Ng(){return nn().memoizedState}function QS(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=si();t=Ha(a);var s=Ga(n,t,a);s!==null&&(Kn(s,n,a),Go(s,n,a)),n={cache:pf()},t.payload=n;return}n=n.return}}function JS(t,n,a){var s=si();a={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},fu(t)?Og(n,a):(a=sf(t,n,a,s),a!==null&&(Kn(a,t,s),Pg(a,n,s)))}function Lg(t,n,a){var s=si();Wo(t,n,a,s)}function Wo(t,n,a,s){var l={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(fu(t))Og(n,l);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var g=n.lastRenderedState,T=c(g,a);if(l.hasEagerState=!0,l.eagerState=T,ti(T,g))return Vl(t,n,l,0),ke===null&&Gl(),!1}catch{}finally{}if(a=sf(t,n,l,s),a!==null)return Kn(a,t,s),Pg(a,n,s),!0}return!1}function Gf(t,n,a,s){if(s={lane:2,revertLane:Uh(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},fu(t)){if(n)throw Error(r(479))}else n=sf(t,a,s,2),n!==null&&Kn(n,t,2)}function fu(t){var n=t.alternate;return t===ue||n!==null&&n===ue}function Og(t,n){xr=au=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Pg(t,n,a){if((a&4194048)!==0){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,R(t,a)}}var hu={readContext:Cn,use:ou,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e,useEffectEvent:$e},zg={readContext:Cn,use:ou,useCallback:function(t,n){return Hn().memoizedState=[t,n===void 0?null:n],t},useContext:Cn,useEffect:xg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,uu(4194308,4,Eg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return uu(4194308,4,t,n)},useInsertionEffect:function(t,n){uu(4,2,t,n)},useMemo:function(t,n){var a=Hn();n=n===void 0?null:n;var s=t();if(Ls){xn(!0);try{t()}finally{xn(!1)}}return a.memoizedState=[s,n],s},useReducer:function(t,n,a){var s=Hn();if(a!==void 0){var l=a(n);if(Ls){xn(!0);try{a(n)}finally{xn(!1)}}}else l=n;return s.memoizedState=s.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},s.queue=t,t=t.dispatch=JS.bind(null,ue,t),[s.memoizedState,t]},useRef:function(t){var n=Hn();return t={current:t},n.memoizedState=t},useState:function(t){t=Of(t);var n=t.queue,a=Lg.bind(null,ue,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:If,useDeferredValue:function(t,n){var a=Hn();return Bf(a,t,n)},useTransition:function(){var t=Of(!1);return t=Cg.bind(null,ue,t.queue,!0,!1),Hn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var s=ue,l=Hn();if(de){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),ke===null)throw Error(r(349));(Me&127)!==0||ig(s,n,a)}l.memoizedState=a;var c={value:a,getSnapshot:n};return l.queue=c,xg(sg.bind(null,s,c,t),[t]),s.flags|=2048,yr(9,{destroy:void 0},ag.bind(null,s,c,a,n),null),a},useId:function(){var t=Hn(),n=ke.identifierPrefix;if(de){var a=Vi,s=Gi;a=(s&~(1<<32-On(s)-1)).toString(32)+a,n="_"+n+"R_"+a,a=su++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=qS++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Hf,useFormState:pg,useActionState:pg,useOptimistic:function(t){var n=Hn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Gf.bind(null,ue,!0,a),a.dispatch=n,[t,n]},useMemoCache:Uf,useCacheRefresh:function(){return Hn().memoizedState=QS.bind(null,ue)},useEffectEvent:function(t){var n=Hn(),a={impl:t};return n.memoizedState=a,function(){if((Ue&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Ig={readContext:Cn,use:ou,useCallback:bg,useContext:Cn,useEffect:zf,useImperativeHandle:Tg,useInsertionEffect:yg,useLayoutEffect:Mg,useMemo:Ag,useReducer:lu,useRef:vg,useState:function(){return lu(ha)},useDebugValue:If,useDeferredValue:function(t,n){var a=nn();return Rg(a,Ie.memoizedState,t,n)},useTransition:function(){var t=lu(ha)[0],n=nn().memoizedState;return[typeof t=="boolean"?t:Yo(t),n]},useSyncExternalStore:ng,useId:Ug,useHostTransitionStatus:Hf,useFormState:mg,useActionState:mg,useOptimistic:function(t,n){var a=nn();return lg(a,Ie,t,n)},useMemoCache:Uf,useCacheRefresh:Ng,useEffectEvent:Sg},$S={readContext:Cn,use:ou,useCallback:bg,useContext:Cn,useEffect:zf,useImperativeHandle:Tg,useInsertionEffect:yg,useLayoutEffect:Mg,useMemo:Ag,useReducer:Lf,useRef:vg,useState:function(){return Lf(ha)},useDebugValue:If,useDeferredValue:function(t,n){var a=nn();return Ie===null?Bf(a,t,n):Rg(a,Ie.memoizedState,t,n)},useTransition:function(){var t=Lf(ha)[0],n=nn().memoizedState;return[typeof t=="boolean"?t:Yo(t),n]},useSyncExternalStore:ng,useId:Ug,useHostTransitionStatus:Hf,useFormState:_g,useActionState:_g,useOptimistic:function(t,n){var a=nn();return Ie!==null?lg(a,Ie,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Uf,useCacheRefresh:Ng,useEffectEvent:Sg};function Vf(t,n,a,s){n=t.memoizedState,a=a(s,n),a=a==null?n:P({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var kf={enqueueSetState:function(t,n,a){t=t._reactInternals;var s=si(),l=Ha(s);l.payload=n,a!=null&&(l.callback=a),n=Ga(t,l,s),n!==null&&(Kn(n,t,s),Go(n,t,s))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var s=si(),l=Ha(s);l.tag=1,l.payload=n,a!=null&&(l.callback=a),n=Ga(t,l,s),n!==null&&(Kn(n,t,s),Go(n,t,s))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=si(),s=Ha(a);s.tag=2,n!=null&&(s.callback=n),n=Ga(t,s,a),n!==null&&(Kn(n,t,a),Go(n,t,a))}};function Bg(t,n,a,s,l,c,g){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,g):n.prototype&&n.prototype.isPureReactComponent?!Lo(a,s)||!Lo(l,c):!0}function Fg(t,n,a,s){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,s),n.state!==t&&kf.enqueueReplaceState(n,n.state,null)}function Os(t,n){var a=n;if("ref"in n){a={};for(var s in n)s!=="ref"&&(a[s]=n[s])}if(t=t.defaultProps){a===n&&(a=P({},a));for(var l in t)a[l]===void 0&&(a[l]=t[l])}return a}function Hg(t){Hl(t)}function Gg(t){console.error(t)}function Vg(t){Hl(t)}function du(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function kg(t,n,a){try{var s=t.onCaughtError;s(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Xf(t,n,a){return a=Ha(a),a.tag=3,a.payload={element:null},a.callback=function(){du(t,n)},a}function Xg(t){return t=Ha(t),t.tag=3,t}function qg(t,n,a,s){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var c=s.value;t.payload=function(){return l(c)},t.callback=function(){kg(n,a,s)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(t.callback=function(){kg(n,a,s),typeof l!="function"&&(Za===null?Za=new Set([this]):Za.add(this));var T=s.stack;this.componentDidCatch(s.value,{componentStack:T!==null?T:""})})}function ty(t,n,a,s,l){if(a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=a.alternate,n!==null&&As(n,a,l,!0),a=Dn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return zn===null?Ou():a.alternate===null&&tn===0&&(tn=3),a.flags&=-257,a.flags|=65536,a.lanes=l,s===$l?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([s]):n.add(s),Ch(t,s,l)),!1;case 22:return a.flags|=65536,s===$l?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([s]):a.add(s)),Ch(t,s,l)),!1}throw Error(r(435,a.tag))}return Ch(t,s,l),Ou(),!1}if(de)return n=Dn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=l,s!==cf&&(t=Error(r(422),{cause:s}),zo(mi(t,a)))):(s!==cf&&(n=Error(r(423),{cause:s}),zo(mi(n,a))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,s=mi(s,a),l=Xf(t.stateNode,s,l),Sf(t,l),tn!==4&&(tn=2)),!1;var c=Error(r(520),{cause:s});if(c=mi(c,a),el===null?el=[c]:el.push(c),tn!==4&&(tn=2),n===null)return!0;s=mi(s,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=l&-l,a.lanes|=t,t=Xf(a.stateNode,s,t),Sf(a,t),!1;case 1:if(n=a.type,c=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Za===null||!Za.has(c))))return a.flags|=65536,l&=-l,a.lanes|=l,l=Xg(l),qg(l,t,a,s),Sf(a,l),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var qf=Error(r(461)),ln=!1;function pn(t,n,a,s){n.child=t===null?Zm(n,null,a,s):Ns(n,t.child,a,s)}function Yg(t,n,a,s,l){a=a.render;var c=n.ref;if("ref"in s){var g={};for(var T in s)T!=="ref"&&(g[T]=s[T])}else g=s;return Rs(n),s=Rf(t,n,a,g,c,l),T=Cf(),t!==null&&!ln?(Df(t,n,l),da(t,n,l)):(de&&T&&Yl(n),n.flags|=1,pn(t,n,s,l),n.child)}function Wg(t,n,a,s,l){if(t===null){var c=a.type;return typeof c=="function"&&!rf(c)&&c.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=c,jg(t,n,c,s,l)):(t=Xl(a.type,null,s,n,n.mode,l),t.ref=n.ref,t.return=n,n.child=t)}if(c=t.child,!$f(t,l)){var g=c.memoizedProps;if(a=a.compare,a=a!==null?a:Lo,a(g,s)&&t.ref===n.ref)return da(t,n,l)}return n.flags|=1,t=oa(c,s),t.ref=n.ref,t.return=n,n.child=t}function jg(t,n,a,s,l){if(t!==null){var c=t.memoizedProps;if(Lo(c,s)&&t.ref===n.ref)if(ln=!1,n.pendingProps=s=c,$f(t,l))(t.flags&131072)!==0&&(ln=!0);else return n.lanes=t.lanes,da(t,n,l)}return Yf(t,n,a,s,l)}function Zg(t,n,a,s){var l=s.children,c=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|a:a,t!==null){for(s=n.child=t.child,l=0;s!==null;)l=l|s.lanes|s.childLanes,s=s.sibling;s=l&~c}else s=0,n.child=null;return Kg(t,n,c,a,s)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ql(n,c!==null?c.cachePool:null),c!==null?Jm(n,c):Mf(),$m(n);else return s=n.lanes=536870912,Kg(t,n,c!==null?c.baseLanes|a:a,a,s)}else c!==null?(Ql(n,c.cachePool),Jm(n,c),Xa(),n.memoizedState=null):(t!==null&&Ql(n,null),Mf(),Xa());return pn(t,n,l,a),n.child}function jo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Kg(t,n,a,s,l){var c=gf();return c=c===null?null:{parent:rn._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},t!==null&&Ql(n,null),Mf(),$m(n),t!==null&&As(t,n,s,!0),n.childLanes=l,null}function pu(t,n){return n=mu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Qg(t,n,a){return Ns(n,t.child,null,a),t=pu(n,n.pendingProps),t.flags|=2,ei(n),n.memoizedState=null,t}function ey(t,n,a){var s=n.pendingProps,l=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(de){if(s.mode==="hidden")return t=pu(n,s),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},jo(null,t);if(Tf(n),(t=qe)?(t=E_(t,vi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Oa!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Om(t),a.return=n,n.child=a,yn=n,qe=null)):t=null,t===null)throw za(n);return n.lanes=536870912,null}return pu(n,s)}var c=t.memoizedState;if(c!==null){var g=c.dehydrated;if(Tf(n),l)if(n.flags&256)n.flags&=-257,n=Qg(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(ln||As(t,n,a,!1),l=(a&t.childLanes)!==0,ln||l){if(Va.current===null){if(s=ke,s!==null&&(g=W(s,a),g!==0&&g!==c.retryLane))throw c.retryLane=g,Ms(t,g),Kn(s,t,g),qf;Ou()}n=Qg(t,n,a)}else t=c.treeContext,qe=Si(g.nextSibling),yn=n,de=!0,Pa=null,vi=!1,t!==null&&Im(n,t),n=pu(n,s),n.flags|=134221824;return n}return t=oa(t.child,{mode:s.mode,children:s.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Mr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Yf(t,n,a,s,l){return Rs(n),a=Rf(t,n,a,s,void 0,l),s=Cf(),t!==null&&!ln?(Df(t,n,l),da(t,n,l)):(de&&s&&Yl(n),n.flags|=1,pn(t,n,a,l),n.child)}function Jg(t,n,a,s,l,c){return Rs(n),n.updateQueue=null,a=eg(n,s,a,l),tg(t),s=Cf(),t!==null&&!ln?(Df(t,n,c),da(t,n,c)):(de&&s&&Yl(n),n.flags|=1,pn(t,n,a,c),n.child)}function $g(t,n,a,s,l){if(Rs(n),n.stateNode===null){var c=hr,g=a.contextType;typeof g=="object"&&g!==null&&(c=Cn(g)),c=new a(s,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=kf,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=s,c.state=n.memoizedState,c.refs={},vf(n),g=a.contextType,c.context=typeof g=="object"&&g!==null?Cn(g):hr,c.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(Vf(n,a,g,s),c.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(g=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),g!==c.state&&kf.enqueueReplaceState(c,c.state,null),ko(n,s,c,l),Vo(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(t===null){c=n.stateNode;var T=n.memoizedProps,O=Os(a,T);c.props=O;var Y=c.context,at=a.contextType;g=hr,typeof at=="object"&&at!==null&&(g=Cn(at));var dt=a.getDerivedStateFromProps;at=typeof dt=="function"||typeof c.getSnapshotBeforeUpdate=="function",T=n.pendingProps!==T,at||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(T||Y!==g)&&Fg(n,c,s,g),Fa=!1;var X=n.memoizedState;c.state=X,ko(n,s,c,l),Vo(),Y=n.memoizedState,T||X!==Y||Fa?(typeof dt=="function"&&(Vf(n,a,dt,s),Y=n.memoizedState),(O=Fa||Bg(n,a,O,s,X,Y,g))?(at||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=Y),c.props=s,c.state=Y,c.context=g,s=O):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{c=n.stateNode,xf(t,n),g=n.memoizedProps,at=Os(a,g),c.props=at,dt=n.pendingProps,X=c.context,Y=a.contextType,O=hr,typeof Y=="object"&&Y!==null&&(O=Cn(Y)),T=a.getDerivedStateFromProps,(Y=typeof T=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(g!==dt||X!==O)&&Fg(n,c,s,O),Fa=!1,X=n.memoizedState,c.state=X,ko(n,s,c,l),Vo();var et=n.memoizedState;g!==dt||X!==et||Fa||t!==null&&t.dependencies!==null&&Zl(t.dependencies)?(typeof T=="function"&&(Vf(n,a,T,s),et=n.memoizedState),(at=Fa||Bg(n,a,at,s,X,et,O)||t!==null&&t.dependencies!==null&&Zl(t.dependencies))?(Y||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,et,O),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,et,O)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||g===t.memoizedProps&&X===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&X===t.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=et),c.props=s,c.state=et,c.context=O,s=at):(typeof c.componentDidUpdate!="function"||g===t.memoizedProps&&X===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&X===t.memoizedState||(n.flags|=1024),s=!1)}return c=s,Mr(t,n),s=(n.flags&128)!==0,c||s?(c=n.stateNode,a=s&&typeof a.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,t!==null&&s?(n.child=Ns(n,t.child,null,l),n.child=Ns(n,null,a,l)):pn(t,n,a,l),n.memoizedState=c.state,t=n.child):t=da(t,n,l),t}function t0(t,n,a,s){return Ts(),n.flags|=256,pn(t,n,a,s),n.child}var Wf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function jf(t){return{baseLanes:t,cachePool:km()}}function Zf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ai),t}function e0(t,n,a){var s=n.pendingProps,l=!1,c=(n.flags&128)!==0,g;if((g=c)||(g=t!==null&&t.memoizedState===null?!1:(wn.current&2)!==0),g&&(l=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,t===null){if(de){if(l?ka(n):Xa(),(t=qe)?(t=E_(t,vi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Oa!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Om(t),a.return=n,n.child=a,yn=n,qe=null)):t=null,t===null)throw za(n);return jh(t)?n.lanes=32:n.lanes=536870912,null}return c=s.children,s=s.fallback,l?(Xa(),l=n.mode,c=mu({mode:"hidden",children:c},l),s=Es(s,l,a,null),c.return=n,s.return=n,c.sibling=s,n.child=c,s=n.child,s.memoizedState=jf(a),s.childLanes=Zf(t,g,a),n.memoizedState=Wf,jo(null,s)):(ka(n),Kf(n,c))}var T=t.memoizedState;if(T!==null){var O=T.dehydrated;if(O!==null)return ny(t,n,c,g,s,O,T,a)}return l?(Xa(),l=s.fallback,c=n.mode,T=t.child,O=T.sibling,s=oa(T,{mode:"hidden",children:s.children}),s.subtreeFlags=T.subtreeFlags&1206910976,O!==null?l=oa(O,l):(l=Es(l,c,a,null),l.flags|=2),l.return=n,s.return=n,s.sibling=l,n.child=s,jo(null,s),s=n.child,l=t.child.memoizedState,l===null?l=jf(a):(c=l.cachePool,c!==null?(T=rn._currentValue,c=c.parent!==T?{parent:T,pool:T}:c):c=km(),l={baseLanes:l.baseLanes|a,cachePool:c}),s.memoizedState=l,s.childLanes=Zf(t,g,a),n.memoizedState=Wf,jo(t.child,s)):(ka(n),a=t.child,t=a.sibling,a=oa(a,{mode:"visible",children:s.children}),a.return=n,a.sibling=null,t!==null&&(g=n.deletions,g===null?(n.deletions=[t],n.flags|=16):g.push(t)),n.child=a,n.memoizedState=null,a)}function Kf(t,n){return n=mu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function mu(t,n){return t=Yn(22,t,null,n),t.lanes=0,t}function gu(t,n,a){return Ns(n,t.child,null,a),t=Kf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function ny(t,n,a,s,l,c,g,T){if(a)return n.flags&256?(ka(n),n.flags&=-257,gu(t,n,T)):n.memoizedState!==null?(Xa(),n.child=t.child,n.flags|=128,null):(Xa(),c=l.fallback,g=n.mode,l=mu({mode:"visible",children:l.children},g),c=Es(c,g,T,null),c.flags|=2,l.return=n,c.return=n,l.sibling=c,n.child=l,Ns(n,t.child,null,T),l=n.child,l.memoizedState=jf(T),l.childLanes=Zf(t,s,T),n.memoizedState=Wf,jo(null,l));if(ka(n),jh(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var O=s.dgst;return s=O,s!==""&&(l=Error(r(419)),l.stack="",l.digest=s,zo({value:l,source:null,stack:null})),gu(t,n,T)}if(ln||As(t,n,T,!1),s=(T&t.childLanes)!==0,ln||s){if(Va.current!==null)return gu(t,n,T);if(s=ke,s!==null&&(l=W(s,T),l!==0&&l!==g.retryLane))throw g.retryLane=l,Ms(t,l),Kn(s,t,l),qf;return Wh(c)||Ou(),gu(t,n,T)}return Wh(c)?(n.flags|=192,n.child=t.child,null):(t=g.treeContext,qe=Si(c.nextSibling),yn=n,de=!0,Pa=null,vi=!1,t!==null&&Im(n,t),n=Kf(n,l.children),n.flags|=134221824,n)}function n0(t,n,a){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n),jl(t.return,n,a)}function i0(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&iu(a)===null&&(n=t),t=t.sibling}return n}function _u(t,n,a,s,l,c){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:a,tailMode:l,treeForkCount:c}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=s,g.tail=a,g.tailMode=l,g.treeForkCount=c)}function Qf(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function Jf(t,n,a){var s=n.pendingProps,l=s.revealOrder,c=s.tail;s=s.children;var g=wn.current;if(n.flags&128)return Xo(n,g),null;var T=(g&2)!==0;if(T?(g=g&1|2,n.flags|=128):g&=1,Xo(n,g),l==="backwards"&&t!==null?(Qf(t),pn(t,n,s,a),Qf(t)):pn(t,n,s,a),s=de?Po:0,!T&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&n0(t,a,n);else if(t.tag===19)n0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"backwards":a=i0(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null,Qf(n)),_u(n,!0,l,null,c,s);break;case"unstable_legacy-backwards":for(a=null,l=n.child,n.child=null;l!==null;){if(t=l.alternate,t!==null&&iu(t)===null){n.child=l;break}t=l.sibling,l.sibling=a,a=l,l=t}_u(n,!0,a,null,c,s);break;case"together":_u(n,!1,null,null,void 0,s);break;case"independent":n.memoizedState=null;break;default:a=i0(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null),_u(n,!1,l,a,c,s)}return n.child}function a0(t,n,a){var s=n.pendingProps;return Ia(n,n.type,s.value),pn(t,n,s.children,a),n.child}function da(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ja|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(As(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=oa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=oa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function $f(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Zl(t)))}function iy(t,n,a){switch(n.tag){case 3:it(n,n.stateNode.containerInfo),Ia(n,rn,t.memoizedState.cache),Ts();break;case 27:case 5:vt(n);break;case 4:it(n,n.stateNode.containerInfo);break;case 10:Ia(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Tf(n),null;break;case 13:var s=n.memoizedState;if(s!==null){if(s.dehydrated!==null)return ka(n),n.flags|=128,null;s=As(t,n,a,!1);var l=n.child.childLanes;return s||(a&l)!==0?e0(t,n,a):(ka(n),t=da(t,n,a),t!==null?t.sibling:null)}ka(n);break;case 19:if(n.flags&128)return Jf(t,n,a);if(l=(t.flags&128)!==0,s=(a&n.childLanes)!==0,s||(As(t,n,a,!1),s=(a&n.childLanes)!==0),l){if(s)return Jf(t,n,a);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Xo(n,wn.current),s)break;return null;case 22:return n.lanes=0,Zg(t,n,a,n.pendingProps);case 24:Ia(n,rn,t.memoizedState.cache)}return da(t,n,a)}function s0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)ln=!0;else{if(!$f(t,a)&&(n.flags&128)===0)return ln=!1,iy(t,n,a);ln=(t.flags&131072)!==0}else ln=!1,de&&(n.flags&1048576)!==0&&zm(n,Po,n.index);switch(n.lanes=0,n.tag){case 16:t:{var s=n.pendingProps;if(t=ws(n.elementType),n.type=t,typeof t=="function")rf(t)?(s=Os(t,s),n.tag=1,n=$g(null,n,t,s,a)):(n.tag=0,n=Yf(null,n,t,s,a));else{if(t!=null){var l=t.$$typeof;if(l===H){n.tag=11,n=Yg(null,n,t,s,a);break t}else if(l===xt){n.tag=14,n=Wg(null,n,t,s,a);break t}else if(l===ut){n.tag=10,n.type=t,n=a0(null,n,a);break t}}throw n=kt(t)||t,Error(r(306,n,""))}}return n;case 0:return Yf(t,n,n.type,n.pendingProps,a);case 1:return s=n.type,l=Os(s,n.pendingProps),$g(t,n,s,l,a);case 3:t:{if(it(n,n.stateNode.containerInfo),t===null)throw Error(r(387));s=n.pendingProps;var c=n.memoizedState;l=c.element,xf(t,n),ko(n,s,null,a);var g=n.memoizedState;if(s=g.cache,Ia(n,rn,s),s!==c.cache&&df(n,[rn],a,!0),Vo(),s=g.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=t0(t,n,s,a);break t}else if(s!==l){l=mi(Error(r(424)),n),zo(l),n=t0(t,n,s,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(qe=Si(t.firstChild),yn=n,de=!0,Pa=null,vi=!0,a=Zm(n,null,s,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Ts(),s===l){n=da(t,n,a);break t}pn(t,n,s,a)}n=n.child}return n;case 26:return Mr(t,n),t===null?(a=w_(n.type,null,n.pendingProps,null))?n.memoizedState=a:de||(n.stateNode=u_(n.type,n.pendingProps,U.current,n)):n.memoizedState=w_(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return vt(n),t===null&&de&&(s=n.stateNode=A_(n.type,n.pendingProps,U.current),yn=n,vi=!0,l=qe,Ja(n.type)?(Zh=l,qe=Si(s.firstChild)):qe=l),pn(t,n,n.pendingProps.children,a),Mr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&de&&((l=s=qe)&&(s=Qy(s,n.type,n.pendingProps,vi),s!==null?(n.stateNode=s,yn=n,qe=Si(s.firstChild),vi=!1,l=!0):l=!1),l||za(n)),vt(n),l=n.type,c=n.pendingProps,g=t!==null?t.memoizedProps:null,s=c.children,Hh(l,c)?s=null:g!==null&&Hh(l,g)&&(n.flags|=32),n.memoizedState!==null&&(l=Rf(t,n,YS,null,null,a),Hr._currentValue=l),Mr(t,n),pn(t,n,s,a),n.child;case 6:return t===null&&de&&((t=a=qe)&&(a=Jy(a,n.pendingProps,vi),a!==null?(n.stateNode=a,yn=n,qe=null,t=!0):t=!1),t||za(n)),null;case 13:return e0(t,n,a);case 4:return it(n,n.stateNode.containerInfo),s=n.pendingProps,t===null?n.child=Ns(n,null,s,a):pn(t,n,s,a),n.child;case 11:return Yg(t,n,n.type,n.pendingProps,a);case 7:return s=n.pendingProps,Mr(t,n),pn(t,n,s,a),n.child;case 8:return pn(t,n,n.pendingProps.children,a),n.child;case 12:return pn(t,n,n.pendingProps.children,a),n.child;case 10:return a0(t,n,a);case 9:return l=n.type._context,s=n.pendingProps.children,Rs(n),l=Cn(l),s=s(l),n.flags|=1,pn(t,n,s,a),n.child;case 14:return Wg(t,n,n.type,n.pendingProps,a);case 15:return jg(t,n,n.type,n.pendingProps,a);case 19:return Jf(t,n,a);case 31:return ey(t,n,a);case 22:return Zg(t,n,a,n.pendingProps);case 24:return Rs(n),s=Cn(rn),t===null?(l=gf(),l===null&&(l=ke,c=pf(),l.pooledCache=c,c.refCount++,c!==null&&(l.pooledCacheLanes|=a),l=c),n.memoizedState={parent:s,cache:l},vf(n),Ia(n,rn,l)):((t.lanes&a)!==0&&(xf(t,n),ko(n,null,null,a),Vo()),l=t.memoizedState,c=n.memoizedState,l.parent!==s?(l={parent:s,cache:s},n.memoizedState=l,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=l),Ia(n,rn,s)):(s=c.cache,Ia(n,rn,s),s!==l.cache&&df(n,[rn],a,!0))),pn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),s=n.pendingProps,s.name!=null&&s.name!=="auto"?n.flags|=t===null?18882560:18874368:de&&Yl(n),t!==null&&t.memoizedProps.name!==s.name?n.flags|=4194816:Mr(t,n),pn(t,n,s.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function pa(t){t.flags|=4}function th(t,n,a,s,l){var c;if((c=(t.mode&32)!==0)&&(c=a===null?O_(n,s):O_(n,s)&&(s.src!==a.src||s.srcSet!==a.srcSet)),c){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(H0())t.flags|=8192;else throw Us=$l,_f}else t.flags&=-16777217}function r0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!P_(n))if(H0())t.flags|=8192;else throw Us=$l,_f}function vu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Dl():536870912,t.lanes|=n,Rr|=n)}function Zo(t,n){if(!de)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function Ye(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,s=0;if(n)for(var l=t.child;l!==null;)a|=l.lanes|l.childLanes,s|=l.subtreeFlags&1206910976,s|=l.flags&1206910976,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)a|=l.lanes|l.childLanes,s|=l.subtreeFlags,s|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=s,t.childLanes=a,n}function ay(t,n,a){var s=n.pendingProps;switch(uf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ye(n),null;case 1:return Ye(n),null;case 3:return a=n.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),ca(rn),gt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(mr(n)?pa(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,ff())),Ye(n),null;case 26:var l=n.type,c=n.memoizedState;return t===null?(pa(n),c!==null?(Ye(n),r0(n,c)):(Ye(n),th(n,l,null,s,a))):c?c!==t.memoizedState?(pa(n),Ye(n),r0(n,c)):(Ye(n),n.flags&=-16777217):(t=t.memoizedProps,t!==s&&pa(n),Ye(n),th(n,l,t,s,a)),null;case 27:if(pt(n),a=U.current,l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ye(n),n.subtreeFlags&=-33554433,null}t=Se.current,mr(n)?Bm(n):(t=A_(l,s,a),n.stateNode=t,pa(n))}return Ye(n),n.subtreeFlags&=-33554433,null;case 5:if(pt(n),l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ye(n),n.subtreeFlags&=-33554433,null}if(c=Se.current,mr(n))Bm(n);else{var g=rl(U.current);switch(c){case 1:c=g.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:c=g.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":c=g.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":c=g.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":c=g.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?g.createElement("select",{is:s.is}):g.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?g.createElement(l,{is:s.is}):g.createElement(l)}}c[Tt]=n,c[Ut]=s;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)c.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=c;t:switch(Nn(c,l,s),l){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&pa(n)}}return Ye(n),n.subtreeFlags&=-33554433,th(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(r(166));if(t=U.current,mr(n)){if(t=n.stateNode,a=n.memoizedProps,s=null,l=yn,l!==null)switch(l.tag){case 27:case 5:s=l.memoizedProps}t[Tt]=n,t=!!(t.nodeValue===a||s!==null&&s.suppressHydrationWarning===!0||s_(t.nodeValue,a)),t||za(n,!0)}else t=rl(t).createTextNode(s),t[Tt]=n,n.stateNode=t}return Ye(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(s=mr(n),a!==null){if(t===null){if(!s)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[Tt]=n}else Ts(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ye(n),t=!1}else a=ff(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ei(n),n):(ei(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Ye(n),null;case 13:if(s=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=mr(n),s!==null&&s.dehydrated!==null){if(t===null){if(!l)throw Error(r(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(r(317));l[Tt]=n}else Ts(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ye(n),l=!1}else l=ff(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return n.flags&256?(ei(n),n):(ei(n),null)}return ei(n),(n.flags&128)!==0?(n.lanes=a,n):(a=s!==null,t=t!==null&&t.memoizedState!==null,a&&(s=n.child,l=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(l=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==l&&(s.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),vu(n,n.updateQueue),Ye(n),null);case 4:return gt(),t===null&&Ph(n.stateNode.containerInfo),n.flags|=67108864,Ye(n),null;case 10:return ca(n.type),Ye(n),null;case 19:if(bf(n),s=n.memoizedState,s===null)return Ye(n),null;if(l=(n.flags&128)!==0,c=s.rendering,c===null)if(l)Zo(s,!1);else{if(tn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(c=iu(t),c!==null){for(n.flags|=128,Zo(s,!1),t=c.updateQueue,n.updateQueue=t,vu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Lm(a,t),a=a.sibling;return Xo(n,wn.current&1|2),de&&la(n,s.treeForkCount),n.child}t=t.sibling}s.tail!==null&&G()>wu&&(n.flags|=128,l=!0,Zo(s,!1),n.lanes=4194304)}else{if(!l)if(t=iu(c),t!==null){if(n.flags|=128,l=!0,t=t.updateQueue,n.updateQueue=t,vu(n,t),Zo(s,!0),s.tail===null&&s.tailMode!=="collapsed"&&s.tailMode!=="visible"&&!c.alternate&&!de)return Ye(n),null}else 2*G()-s.renderingStartTime>wu&&a!==536870912&&(n.flags|=128,l=!0,Zo(s,!1),n.lanes=4194304);s.isBackwards?(c.sibling=n.child,n.child=c):(t=s.last,t!==null?t.sibling=c:n.child=c,s.last=c)}if(s.tail!==null){t=s.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return s.rendering=t,s.tail=t.sibling,s.renderingStartTime=G(),t.sibling=null,c=wn.current,c=l?c&1|2:c&1,s.tailMode==="visible"||s.tailMode==="collapsed"||!a||de?Xo(n,c):(a=c,Ct(Dn,n),Ct(wn,a),zn===null&&(zn=n)),de&&la(n,s.treeForkCount),t}return Ye(n),null;case 22:case 23:return ei(n),Ef(),s=n.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?(a&536870912)!==0&&(n.flags&128)===0&&(Ye(n),n.subtreeFlags&6&&(n.flags|=8192)):Ye(n),a=n.updateQueue,a!==null&&vu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==a&&(n.flags|=2048),t!==null&&Kt(Ds),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ca(rn),Ye(n),null;case 25:return null;case 30:return n.flags|=33554432,Ye(n),null}throw Error(r(156,n.tag))}function sy(t,n){switch(uf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ca(rn),gt(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return pt(n),null;case 31:if(n.memoizedState!==null){if(ei(n),n.alternate===null)throw Error(r(340));Ts()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ei(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Ts()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return bf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return gt(),null;case 10:return ca(n.type),null;case 22:case 23:return ei(n),Ef(),t!==null&&Kt(Ds),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ca(rn),null;case 25:return null;default:return null}}function o0(t,n){switch(uf(n),n.tag){case 3:ca(rn),gt();break;case 26:case 27:case 5:pt(n);break;case 4:gt();break;case 31:n.memoizedState!==null&&ei(n);break;case 13:ei(n);break;case 19:bf(n);break;case 10:ca(n.type);break;case 22:case 23:ei(n),Ef(),t!==null&&Kt(Ds);break;case 24:ca(rn)}}function Ko(t,n){try{var a=n.updateQueue,s=a!==null?a.lastEffect:null;if(s!==null){var l=s.next;a=l;do{if((a.tag&t)===t){s=void 0;var c=a.create,g=a.inst;s=c(),g.destroy=s}a=a.next}while(a!==l)}}catch(T){Oe(n,n.return,T)}}function qa(t,n,a){try{var s=n.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var c=l.next;s=c;do{if((s.tag&t)===t){var g=s.inst,T=g.destroy;if(T!==void 0){g.destroy=void 0,l=n;var O=a,Y=T;try{Y()}catch(at){Oe(l,O,at)}}}s=s.next}while(s!==c)}}catch(at){Oe(n,n.return,at)}}function l0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Qm(n,a)}catch(s){Oe(t,t.return,s)}}}function u0(t,n,a){a.props=Os(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(s){Oe(t,n,s)}}function ki(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:var l=t.stateNode,c=sa(t.memoizedProps,l);(l.ref===null||l.ref.name!==c)&&(l.ref=g_(c)),s=l.ref;break;case 7:if(t.stateNode===null){var g=new ri(t);m(t.child,!1,Zy,g,void 0,void 0),t.stateNode=g}s=t.stateNode;break;default:s=t.stateNode}typeof a=="function"?t.refCleanup=a(s):a.current=s}}catch(T){Oe(t,n,T)}}function Un(t,n){var a=t.ref,s=t.refCleanup;if(a!==null)if(typeof s=="function")try{s()}catch(l){Oe(t,n,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){Oe(t,n,l)}else a.current=null}function xu(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)M_(t.stateNode,n[a])}function c0(t){for(var n=t.return;n!==null&&(nh(n)&&M_(t.stateNode,n.stateNode),!eh(n));)n=n.return}function Qo(t){for(var n=t.return;n!==null&&(nh(n)&&Ky(t.stateNode,n.stateNode),!eh(n));)n=n.return}function eh(t){return t.tag===5||t.tag===3||t.tag===27}function nh(t){return t&&t.tag===7&&t.stateNode!==null}function ih(t){var n=t.type,a=t.memoizedProps,s=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&s.focus();break t;case"img":a.src?s.src=a.src:a.srcSet&&(s.srcset=a.srcSet)}}catch(l){Oe(t,t.return,l)}}function ah(t,n,a){try{var s=t.stateNode;Uy(s,t.type,a,n),s[Ut]=n}catch(l){Oe(t,t.return,l)}}function f0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ja(t.type)||t.tag===4}function sh(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||f0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ja(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function rh(t,n,a,s){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(l),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Hi)),xu(t,s),De=!0;else if(l!==4&&(l===27&&(xu(t,s),s=null,Ja(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(rh(t,n,a,s),t=t.sibling;t!==null;)rh(t,n,a,s),t=t.sibling}function Su(t,n,a,s){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?a.insertBefore(l,n):a.appendChild(l),xu(t,s),De=!0;else if(l!==4&&(l===27&&(xu(t,s),s=null,Ja(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(Su(t,n,a,s),t=t.sibling;t!==null;)Su(t,n,a,s),t=t.sibling}function h0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var s=t.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0]);Nn(n,s,a),n[Tt]=t,n[Ut]=a}catch(c){Oe(t,t.return,c)}}var yu=!1,ni=null;function d0(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(yu=!0)}var Xi=null;function p0(){var t=Xi;return Xi=null,t}var Wn=0;function Er(t,n,a,s,l){return Wn=0,m0(t.child,n,a,s,l)}function m0(t,n,a,s,l){for(var c=!1;t!==null;){if(t.tag===5){var g=t.stateNode;if(s!==null){var T=kh(g);s.push(T),T.view&&(c=!0)}else c||kh(g).view&&(c=!0);yu=!0,p_(g,Wn===0?n:n+"_"+Wn,a),Wn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&l||m0(t.child,n,a,s,l)&&(c=!0));t=t.sibling}return c}function qi(t,n){for(;t!==null;)t.tag===5?m_(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||qi(t.child,n)),t=t.sibling}function Mu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Mu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(r(544));var a=n.name;n=ra(n.default,n.share),n!=="none"&&(Er(t,a,n,null,!1)||qi(t.child,!1))}t=t.sibling}}function oh(t,n){if(t.tag===30){var a=t.stateNode,s=t.memoizedProps,l=sa(s,a),c=ra(s.default,a.paired?s.share:s.enter);c!=="none"?Er(t,l,c,null,!1)?(Mu(t),a.paired||n||Ur(t,s.onEnter)):qi(t.child,!1):Mu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)oh(t,n),t=t.sibling;else Mu(t)}function lh(t){if(ni!==null&&ni.size!==0){var n=ni;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,s=a.name;if(s!=null&&s!=="auto"){var l=n.get(s);if(l!==void 0){var c=ra(a.default,a.share);if(c!=="none"&&(Er(t,s,c,null,!1)?(c=t.stateNode,l.paired=c,c.paired=l,Ur(t,a.onShare)):qi(t.child,!1)),n.delete(s),n.size===0)break}}}lh(t)}t=t.sibling}}}function uh(t){if(t.tag===30){var n=t.memoizedProps,a=sa(n,t.stateNode),s=ni!==null?ni.get(a):void 0,l=ra(n.default,s!==void 0?n.share:n.exit);l!=="none"&&(Er(t,a,l,null,!1)?s!==void 0?(l=t.stateNode,s.paired=l,l.paired=s,ni.delete(a),Ur(t,n.onShare)):Ur(t,n.onExit):qi(t.child,!1)),ni!==null&&lh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)uh(t),t=t.sibling;else ni!==null&&lh(t)}function g0(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=sa(n,t.stateNode);n=ra(n.default,n.update),t.flags&=-5,n!=="none"&&Er(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&g0(t);t=t.sibling}}function ch(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,qi(t.child,!1))}ch(t)}t=t.sibling}}function Eu(t){if(t.tag===30)t.stateNode.paired=null,qi(t.child,!1),ch(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Eu(t),t=t.sibling;else ch(t)}function _0(t){for(t=t.child;t!==null;)t.tag===30?qi(t.child,!1):(t.subtreeFlags&33554432)!==0&&_0(t),t=t.sibling}function fh(t,n,a,s,l,c,g){for(var T=!1;n!==null;){if(n.tag===5){var O=n.stateNode;if(c!==null&&Wn<c.length){var Y=c[Wn],at=kh(O);(Y.view||at.view)&&(T=!0);var dt;if(dt=(t.flags&4)===0)if(at.clip)dt=!0;else{dt=Y.rect;var X=at.rect;dt=dt.y!==X.y||dt.x!==X.x||dt.height!==X.height||dt.width!==X.width}dt&&(t.flags|=4),at.abs?at=!Y.abs:(Y=Y.rect,at=at.rect,at=Y.height!==at.height||Y.width!==at.width),at&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&p_(O,Wn===0?a:a+"_"+Wn,l),T&&(t.flags&4)!==0||(Xi===null&&(Xi=[]),Xi.push(O,Wn===0?s:s+"_"+Wn,n.memoizedProps)),Wn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&g?t.flags|=n.flags&32:fh(t,n.child,a,s,l,c,g)&&(T=!0));n=n.sibling}return T}function v0(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,s=t.stateNode,l=sa(a,s),c=ra(a.default,a.update),g;g=t.memoizedState,t.memoizedState=null,s=t;var T=t.child;Wn=0,l=fh(s,T,l,l,c,g,!1),(t.flags&4)!==0&&l&&Ur(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&v0(t);t=t.sibling}}var Mn=!1,Ne=!1,Yi=!1,hh=!1,x0=typeof WeakSet=="function"?WeakSet:Set,En=null,Wi=!1,Jo=!1,Tu=!1,dh=!1;function ry(t,n,a){if(t=t.containerInfo,Bh=Gr,t=Em(t),Jc(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else t:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var c=l.anchorOffset,g=l.focusNode;l=l.focusOffset;try{s.nodeType,g.nodeType}catch{s=null;break t}var T=0,O=-1,Y=-1,at=0,dt=0,X=t,et=null;e:for(;;){for(var Dt;X!==s||c!==0&&X.nodeType!==3||(O=T+c),X!==g||l!==0&&X.nodeType!==3||(Y=T+l),X.nodeType===3&&(T+=X.nodeValue.length),(Dt=X.firstChild)!==null;)et=X,X=Dt;for(;;){if(X===t)break e;if(et===s&&++at===c&&(O=T),et===g&&++dt===l&&(Y=T),(Dt=X.nextSibling)!==null)break;X=et,et=X.parentNode}X=Dt}s=O===-1||Y===-1?null:{start:O,end:Y}}else s=null}s=s||{start:0,end:0}}else s=null;for(Fh={focusedElem:t,selectionRange:s},Gr=!1,a=(a&335544064)===a,En=n,n=a?9270:1024;En!==null;){if(t=En,a&&(s=t.deletions,s!==null))for(c=0;c<s.length;c++)a&&uh(s[c]);if(t.alternate===null&&(t.flags&2)!==0)a&&d0(t),bu(a);else{if(t.tag===22){if(s=t.alternate,t.memoizedState!==null){s!==null&&s.memoizedState===null&&a&&uh(s),bu(a);continue}else if(s!==null&&s.memoizedState!==null){a&&d0(t),bu(a);continue}}s=t.child,(t.subtreeFlags&n)!==0&&s!==null?(s.return=t,En=s):(a&&g0(t),bu(a))}}ni=null}function bu(t){for(;En!==null;){var n=En,a=t,s=n.alternate,l=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&s!==null){a=void 0,l=s.memoizedProps,s=s.memoizedState;var c=n.stateNode;try{var g=Os(n.type,l);a=c.getSnapshotBeforeUpdate(g,s),c.__reactInternalSnapshotBeforeUpdate=a}catch(T){Oe(n,n.return,T)}}break;case 3:if((l&1024)!==0){if(s=n.stateNode.containerInfo,a=s.nodeType,a===9)Yh(s);else if(a===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Yh(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&s!==null&&(a=sa(s.memoizedProps,s.stateNode),l=n.memoizedProps,l=ra(l.default,l.update),l!=="none"&&Er(s,a,l,s.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(r(163))}if(s=n.sibling,s!==null){s.return=n.return,En=s;break}En=n.return}}function S0(t,n,a){var s=a.flags;switch(a.tag){case 0:case 11:case 15:ji(t,a),s&4&&Ko(5,a);break;case 1:if(ji(t,a),s&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(g){Oe(a,a.return,g)}else{var l=Os(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(l,n,t.__reactInternalSnapshotBeforeUpdate)}catch(g){Oe(a,a.return,g)}}s&64&&l0(a),s&512&&ki(a,a.return);break;case 3:if(ji(t,a),s&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Qm(t,n)}catch(g){Oe(a,a.return,g)}}break;case 27:n===null&&s&4&&h0(a);case 26:case 5:ji(t,a),n===null&&s&4&&ih(a),s&512&&ki(a,a.return);break;case 12:ji(t,a);break;case 31:ji(t,a),s&4&&T0(t,a);break;case 13:ji(t,a),s&4&&b0(t,a),s&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=vy.bind(null,a),$y(t,a))));break;case 22:if(s=a.memoizedState!==null||Mn,!s){var c=n!==null&&n.memoizedState!==null||Ne;n=Mn,l=Ne,Mn=s,(Ne=c)&&!l?(s=2,(a.subtreeFlags&8772)!==0&&(s|=1),Ui(t,a,s)):ji(t,a),Mn=n,Ne=l}break;case 30:ji(t,a),s&512&&ki(a,a.return);break;case 7:s&512&&ki(a,a.return);default:ji(t,a)}}function ph(t,n){for(t=t.child;t!==null;)y0(t,n),t=t.sibling}function y0(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var s=a.style;typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"}else{var l=t.stateNode,c=t.memoizedProps.style,g=c!=null&&c.hasOwnProperty("display")?c.display:null;l.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(O){Oe(t,t.return,O)}mh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,De=!0}catch(O){Oe(t,t.return,O)}break;case 18:try{var T=t.stateNode;n?d_(T,!0):d_(t.stateNode,!1)}catch(O){Oe(t,t.return,O)}break;case 22:case 23:t.memoizedState===null&&ph(t,n);break;default:ph(t,n)}}function mh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,s=n;switch(a.tag){case 4:y0(a,s);break t;case 22:a.memoizedState===null&&mh(a,s);break t;default:mh(a,s)}}t=t.sibling}}function M0(t){var n=t.alternate;n!==null&&(t.alternate=null,M0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&_e(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Qe=null,jn=!1;function Di(t,n,a){for(a=a.child;a!==null;)E0(t,n,a),a=a.sibling}function E0(t,n,a){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(be,a)}catch{}switch(a.tag){case 26:Ne||Un(a,n),Di(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Ne&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ne||Un(a,n),Qo(a);var s=Qe,l=jn;Ja(a.type)&&(Qe=a.stateNode,jn=!1),Di(t,n,a),R_(a.stateNode,a.type,a.memoizedProps),Qe=s,jn=l;break;case 5:Ne||Un(a,n),Qo(a);case 6:if(a.tag===6&&Qo(a),s=Qe,l=jn,Qe=null,Di(t,n,a),Qe=s,jn=l,Qe!==null)if(jn)try{(Qe.nodeType===9?Qe.body:Qe.nodeName==="HTML"?Qe.ownerDocument.body:Qe).removeChild(a.stateNode),De=!0}catch(c){Oe(a,n,c)}else try{Qe.removeChild(a.stateNode),De=!0}catch(c){Oe(a,n,c)}break;case 18:Qe!==null&&(jn?(t=Qe,h_(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Vr(t)):h_(Qe,a.stateNode));break;case 4:s=Qe,l=jn,Qe=a.stateNode.containerInfo,jn=!0,Di(t,n,a),Qe=s,jn=l;break;case 0:case 11:case 14:case 15:qa(2,a,n),Ne||qa(4,a,n),Di(t,n,a);break;case 1:Ne||(Un(a,n),s=a.stateNode,typeof s.componentWillUnmount=="function"&&u0(a,n,s)),Di(t,n,a);break;case 21:Di(t,n,a);break;case 22:Ne=(s=Ne)||a.memoizedState!==null,Di(t,n,a),Ne=s;break;case 30:Un(a,n),Di(t,n,a);break;case 7:Ne||Un(a,n),Di(t,n,a);break;default:Di(t,n,a)}}function T0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Vr(t)}catch(a){Oe(n,n.return,a)}}}function b0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Vr(t)}catch(a){Oe(n,n.return,a)}}function oy(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new x0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new x0),n;default:throw Error(r(435,t.tag))}}function Au(t,n){var a=oy(t);n.forEach(function(s){if(!a.has(s)){a.add(s);var l=xy.bind(null,t,s);s.then(l,l)}})}function Gn(t,n,a){var s=n.deletions;if(s!==null)for(var l=0;l<s.length;l++){var c=s[l],g=t,T=n,O=T;t:for(;O!==null;){switch(O.tag){case 27:if(Ja(O.type)){Qe=O.stateNode,jn=!1;break t}break;case 5:Qe=O.stateNode,jn=!1;break t;case 3:case 4:Qe=O.stateNode.containerInfo,jn=!0;break t}O=O.return}if(Qe===null)throw Error(r(160));E0(g,T,c),Qe=null,jn=!1,g=c.alternate,g!==null&&(g.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)A0(n,t,a),n=n.sibling}var wi=null;function A0(t,n,a){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(l&4&&(s=t.updateQueue,s=s!==null?s.events:null,s!==null))for(var c=0;c<s.length;c++){var g=s[c];g.ref.impl=g.nextImpl}Gn(n,t,a),Vn(t),l&4&&(qa(3,t,t.return),Ko(3,t),qa(5,t,t.return));break;case 1:Gn(n,t,a),Vn(t),l&512&&(Ne||s===null||Un(s,s.return)),l&64&&Mn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(c=wi,Gn(n,t,a),Vn(t),l&512&&(Ne||s===null||Un(s,s.return)),l&4)if(l=s!==null?s.memoizedState:null,a=t.memoizedState,s===null)if(a===null)if(t.stateNode===null)if(Mn)t.stateNode=u_(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,l=c.ownerDocument||c;e:switch(n){case"title":s=l.getElementsByTagName("title")[0],(!s||s[Xe]||s[Tt]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=l.createElement(n),l.head.insertBefore(s,l.querySelector("head > title"))),Nn(s,n,a),s[Tt]=t,je(s),n=s;break t;case"link":if(c=L_("link","href",l).get(n+(a.href||""))){for(g=0;g<c.length;g++)if(s=c[g],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(g,1);break e}}s=l.createElement(n),Nn(s,n,a),l.head.appendChild(s);break;case"meta":if(c=L_("meta","content",l).get(n+(a.content||""))){for(g=0;g<c.length;g++)if(s=c[g],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(g,1);break e}}s=l.createElement(n),Nn(s,n,a),l.head.appendChild(s);break;default:throw Error(r(468,n))}s[Tt]=t,je(s),n=s}t.stateNode=n}else Mn||$h(c,t.type,t.stateNode);else t.stateNode=N_(c,a,t.memoizedProps);else l!==a?(l===null?(n=s.stateNode,n===null||Ne||n.parentNode.removeChild(n)):l.count--,a===null?Mn||$h(c,t.type,t.stateNode):N_(c,a,t.memoizedProps)):a===null&&t.stateNode!==null&&ah(t,t.memoizedProps,s.memoizedProps);break;case 27:Gn(n,t,a),Vn(t),l&512&&(Ne||s===null||Un(s,s.return)),s!==null&&l&4&&ah(t,t.memoizedProps,s.memoizedProps);break;case 5:if(c=Yi,Yi=!1,Gn(n,t,a),Yi=c,Vn(t),l&512&&(Ne||s===null||Un(s,s.return)),t.flags&32){n=t.stateNode;try{sr(n,""),De=!0}catch(at){Oe(t,t.return,at)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,ah(t,n,s!==null?s.memoizedProps:n)),l&1024&&(hh=!0);break;case 6:if(Gn(n,t,a),Vn(t),l&4){if(t.stateNode===null)throw Error(r(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,De=!0}catch(at){Oe(t,t.return,at)}}break;case 3:if(De=!1,Gu=null,c=wi,wi=ol(n.containerInfo),Gn(n,t,a),wi=c,Vn(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Vr(n.containerInfo)}catch(at){Oe(t,t.return,at)}hh&&(hh=!1,R0(t)),De=!1;break;case 4:l=Yi,Yi=Mn,s=Wp(),c=wi,wi=ol(t.stateNode.containerInfo),Gn(n,t,a),Vn(t),wi=c,De&&Jo&&(Tu=!0),De=s,Yi=l;break;case 12:Gn(n,t,a),Vn(t);break;case 31:Gn(n,t,a),Vn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Au(t,n)));break;case 13:Gn(n,t,a),Vn(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Du=G()),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Au(t,n)));break;case 22:c=t.memoizedState!==null,g=s!==null&&s.memoizedState!==null;var T=Mn,O=Ne,Y=Yi;Mn=T||c,Yi=Y||c,Ne=O||g,Gn(n,t,a),Ne=O,Yi=Y,Mn=T,Vn(t),l&8192&&(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,!c||s===null||g||Mn||Ne||(n=g||Ne,a=Mn,s=Ne,Mn=c||Mn,Ne=n,Ya(t,2),Mn=a,Ne=s),!c&&Yi||ph(t,c)),l&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Au(t,a))));break;case 19:Gn(n,t,a),Vn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Au(t,n)));break;case 30:l&512&&(Ne||s===null||Un(s,s.return)),l=Wp(),c=Jo,g=(a&335544064)===a,T=t.memoizedProps,Jo=g&&ra(T.default,T.update)!=="none",Gn(n,t,a),Vn(t),g&&s!==null&&De&&(t.flags|=4),Jo=c,De=l;break;case 21:break;case 7:l&512&&(Ne||s===null||Un(s,s.return)),s&&s.stateNode!==null&&(s.stateNode._fragmentFiber=t);default:Gn(n,t,a),Vn(t)}}function Vn(t){var n=t.flags;if(n&2){try{for(var a,s=t.return;s!==null;){if(f0(s)){a=s;break}s=s.return}s=null;for(var l=t.return;l!==null;){if(nh(l)){var c=l.stateNode;s===null?s=[c]:s.push(c)}if(eh(l))break;l=l.return}var g=s;if(a==null)throw Error(r(160));switch(a.tag){case 27:var T=a.stateNode,O=sh(t);Su(t,O,T,g);break;case 5:var Y=a.stateNode;a.flags&32&&(sr(Y,""),a.flags&=-33);var at=sh(t);Su(t,at,Y,g);break;case 3:case 4:var dt=a.stateNode.containerInfo,X=sh(t);rh(t,X,dt,g);break;default:throw Error(r(161))}}catch(et){Oe(t,t.return,et)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function R0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;R0(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Gr=!0,n.reset(),Gr=!1),t=t.sibling}}function Tr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)C0(n,t),n=n.sibling;else v0(n)}function C0(t,n){var a=t.alternate;if(a===null)oh(t,!1);else switch(t.tag){case 3:if(dh=Wi=!1,p0(),Tr(n,t),!Wi&&!Tu){if(t=Xi,t!==null)for(var s=0;s<t.length;s+=3){a=t[s];var l=t[s+1];m_(a,t[s+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+l+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),dh=!0}Xi=null;break;case 5:Tr(n,t);break;case 4:s=Wi,Wi=!1,Tr(n,t),Wi&&(Tu=!0),Wi=s;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?oh(t,!1):Tr(n,t));break;case 30:s=Wi,l=p0(),Wi=!1,Tr(n,t),Wi&&(t.flags|=4);var c=t.memoizedProps,g=t.stateNode;n=sa(c,g),g=sa(a.memoizedProps,g);var T=ra(c.default,c.update);T==="none"?n=!1:(c=a.memoizedState,a.memoizedState=null,a=t.child,Wn=0,n=fh(t,a,n,g,T,c,!0),Wn!==(c===null?0:c.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Ur(t,t.memoizedProps.onUpdate),Xi=l):l!==null&&(l.push.apply(l,Xi),Xi=l),Wi=(t.flags&32)!==0?!0:s;break;default:Tr(n,t)}}function ji(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)S0(t,n.alternate,n),n=n.sibling}function Ya(t,n){for(t=t.child;t!==null;){var a=t,s=n;switch(a.tag){case 0:case 11:case 14:case 15:qa(4,a,a.return),Ya(a,s);break;case 1:Un(a,a.return);var l=a.stateNode;typeof l.componentWillUnmount=="function"&&u0(a,a.return,l),Ya(a,s);break;case 27:(s&2)!==0&&R_(a.stateNode,a.type,a.memoizedProps);case 5:Un(a,a.return),a.tag!==5&&a.tag!==27||Qo(a),Ya(a,s);break;case 6:Qo(a);break;case 26:Un(a,a.return),l=a.stateNode,a.memoizedState!==null||l===null||Ne||l.parentNode.removeChild(l),Ya(a,s);break;case 22:a.memoizedState===null&&Ya(a,s);break;case 30:Un(a,a.return),Ya(a,s);break;case 7:Un(a,a.return);default:Ya(a,s)}t=t.sibling}}function Ui(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var s=n.alternate,l=t,c=n,g=c.flags,T=(a&1)!==0;switch(c.tag){case 0:case 11:case 15:Ui(l,c,a),Ko(4,c);break;case 1:if(Ui(l,c,a),s=c,l=s.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(at){Oe(s,s.return,at)}if(s=c,l=s.updateQueue,l!==null){var O=s.stateNode;try{var Y=l.shared.hiddenCallbacks;if(Y!==null)for(l.shared.hiddenCallbacks=null,l=0;l<Y.length;l++)Km(Y[l],O)}catch(at){Oe(s,s.return,at)}}T&&g&64&&l0(c),ki(c,c.return);break;case 27:(a&2)!==0&&h0(c);case 5:c.tag!==5&&c.tag!==27||c0(c),Ui(l,c,a),T&&s===null&&g&4&&ih(c),ki(c,c.return);break;case 6:c0(c);break;case 26:O=c.stateNode,c.memoizedState!==null||O===null||Mn||$h(ol(O.ownerDocument),c.type,O),Ui(l,c,a),T&&s===null&&g&4&&ih(c),ki(c,c.return);break;case 12:Ui(l,c,a);break;case 31:Ui(l,c,a),T&&g&4&&T0(l,c);break;case 13:Ui(l,c,a),T&&g&4&&b0(l,c);break;case 22:c.memoizedState===null&&Ui(l,c,a),ki(c,c.return);break;case 30:Ui(l,c,a),ki(c,c.return);break;case 7:ki(c,c.return);default:Ui(l,c,a)}n=n.sibling}}function gh(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Io(a))}function _h(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Io(t))}function xi(t,n,a,s){var l=(a&335544064)===a;if(n.subtreeFlags&(l?10262:10256))for(n=n.child;n!==null;)D0(t,n,a,s),n=n.sibling;else l&&_0(n)}function D0(t,n,a,s){var l=(a&335544064)===a;l&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Eu(n);var c=n.flags;switch(n.tag){case 0:case 11:case 15:xi(t,n,a,s),c&2048&&Ko(9,n);break;case 1:xi(t,n,a,s);break;case 3:xi(t,n,a,s),l&&dh&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),c&2048&&(c=null,n.alternate!==null&&(c=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==c&&(n.refCount++,c!=null&&Io(c)));break;case 12:if(c&2048){xi(t,n,a,s),c=n.stateNode;try{var g=n.memoizedProps,T=g.id,O=g.onPostCommit;typeof O=="function"&&O(T,n.alternate===null?"mount":"update",c.passiveEffectDuration,-0)}catch(Y){Oe(n,n.return,Y)}}else xi(t,n,a,s);break;case 31:xi(t,n,a,s);break;case 13:xi(t,n,a,s);break;case 23:break;case 22:g=n.stateNode,T=n.alternate,n.memoizedState!==null?(l&&T!==null&&T.memoizedState===null&&Eu(T),g._visibility&2?xi(t,n,a,s):$o(t,n)):(l&&T!==null&&T.memoizedState!==null&&Eu(n),g._visibility&2?xi(t,n,a,s):(g._visibility|=2,br(t,n,a,s,(n.subtreeFlags&10256)!==0||!1))),c&2048&&gh(T,n);break;case 24:xi(t,n,a,s),c&2048&&_h(n.alternate,n);break;case 30:l&&(c=n.alternate,c!==null&&(qi(c.child,!0),qi(n.child,!0))),xi(t,n,a,s);break;default:xi(t,n,a,s)}}function br(t,n,a,s,l){for(l=l&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=t,g=n,T=a,O=s,Y=g.flags;switch(g.tag){case 0:case 11:case 15:br(c,g,T,O,l),Ko(8,g);break;case 23:break;case 22:var at=g.stateNode;g.memoizedState!==null?at._visibility&2?br(c,g,T,O,l):$o(c,g):(at._visibility|=2,br(c,g,T,O,l)),l&&Y&2048&&gh(g.alternate,g);break;case 24:br(c,g,T,O,l),l&&Y&2048&&_h(g.alternate,g);break;default:br(c,g,T,O,l)}n=n.sibling}}function $o(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,s=n,l=s.flags;switch(s.tag){case 22:$o(a,s),l&2048&&gh(s.alternate,s);break;case 24:$o(a,s),l&2048&&_h(s.alternate,s);break;default:$o(a,s)}n=n.sibling}}var Ps=8192;function zs(t,n,a){if(t.subtreeFlags&Ps)for(t=t.child;t!==null;)w0(t,n,a),t=t.sibling}function w0(t,n,a){switch(t.tag){case 26:zs(t,n,a),t.flags&Ps&&(t.memoizedState!==null?dM(a,wi,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&I_(a,t)));break;case 5:zs(t,n,a),t.flags&Ps&&(t=t.stateNode,(n&335544128)===n&&I_(a,t));break;case 3:case 4:var s=wi;wi=ol(t.stateNode.containerInfo),zs(t,n,a),wi=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=Ps,Ps=16777216,zs(t,n,a),Ps=s):zs(t,n,a));break;case 30:if((t.flags&Ps)!==0&&(s=t.memoizedProps.name,s!=null&&s!=="auto")){var l=t.stateNode;l.paired=null,ni===null&&(ni=new Map),ni.set(s,l)}zs(t,n,a);break;default:zs(t,n,a)}}function U0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function tl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];En=s,L0(s,t)}U0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)N0(t),t=t.sibling}function N0(t){switch(t.tag){case 0:case 11:case 15:tl(t),t.flags&2048&&qa(9,t,t.return);break;case 3:tl(t);break;case 12:tl(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Ru(t)):tl(t);break;default:tl(t)}}function Ru(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];En=s,L0(s,t)}U0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:qa(8,n,n.return),Ru(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Ru(n));break;default:Ru(n)}t=t.sibling}}function L0(t,n){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:qa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var s=a.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Io(a.memoizedState.cache)}if(s=a.child,s!==null)s.return=a,En=s;else t:for(a=t;En!==null;){s=En;var l=s.sibling,c=s.return;if(M0(s),s===a){En=null;break t}if(l!==null){l.return=c,En=l;break t}En=c}}}var ly={getCacheForType:function(t){var n=Cn(rn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Cn(rn).controller.signal}},uy=typeof WeakMap=="function"?WeakMap:Map,Ue=0,ke=null,ve=null,Me=0,Le=0,ii=null,Wa=!1,Ar=!1,vh=!1,ma=0,tn=0,ja=0,Is=0,Cu=0,ai=0,Rr=0,el=null,Zn=null,xh=!1,Du=0,O0=0,wu=1/0,Uu=null,Za=null,Je=0,Ni=null,Bs=null,Zi=0,Sh=0,yh=null,P0=null,Cr=null,Dr=null,wr=null,nl=0,Nu=null;function si(){return(Ue&2)!==0&&Me!==0?Me&-Me:Rt.T!==null?Uh():Z()}function z0(){if(ai===0)if((Me&536870912)===0||de){var t=vs;vs<<=1,(vs&3932160)===0&&(vs=262144),ai=t}else ai=536870912;return t=Dn.current,t!==null&&(t.flags|=32),ai}function Ur(t,n){if(n!=null){var a=t.stateNode,s=a.ref;s===null&&(s=a.ref=g_(sa(t.memoizedProps,a))),Dr===null&&(Dr=[]),Dr.push(n.bind(null,s))}}function Kn(t,n,a){(t===ke&&(Le===2||Le===9)||t.cancelPendingCommit!==null)&&(Nr(t,0),Ka(t,Me,ai,!1)),xs(t,a),((Ue&2)===0||t!==ke)&&(t===ke&&((Ue&2)===0&&(Is|=a),tn===4&&Ka(t,Me,ai,!1)),Ki(t))}function I0(t,n,a){if((Ue&6)!==0)throw Error(r(327));var s=!a&&(n&127)===0&&(n&t.expiredLanes)===0||wa(t,n),l=s?hy(t,n):Eh(t,n,!0),c=s;do{if(l===0){Ar&&!s&&Ka(t,n,0,!1);break}else{if(a=t.current.alternate,c&&!cy(a)){l=Eh(t,n,!1),c=!1;continue}if(l===2){if(c=n,t.errorRecoveryDisabledLanes&c)var g=0;else g=t.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var T=t;l=el;var O=T.current.memoizedState.isDehydrated;if(O&&(Nr(T,g).flags|=256),g=Eh(T,g,!1),g!==2&&g!==6){if(vh&&!O){T.errorRecoveryDisabledLanes|=c,Is|=c,l=4;break t}c=Zn,Zn=l,c!==null&&(Zn===null?Zn=c:Zn.push.apply(Zn,c))}l=g}if(c=!1,l!==2)continue}}if(l===1){Nr(t,0),Ka(t,n,0,!0);break}t:{switch(s=t,c=l,c){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:Ka(s,n,ai,!Wa);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(l=Du+300-G(),10<l)){if(Ka(s,n,ai,!Wa),ea(s,0,!0)!==0)break t;Zi=n,s.timeoutHandle=Vh(B0.bind(null,s,a,Zn,Uu,xh,n,ai,Is,Rr,Wa,c,"Throttled",-0,0),l);break t}B0(s,a,Zn,Uu,xh,n,ai,Is,Rr,Wa,c,null,-0,0)}}break}while(!0);Ki(t)}function B0(t,n,a,s,l,c,g,T,O,Y,at,dt,X,et){t.timeoutHandle=-1;var Dt=n.subtreeFlags,Xt=(c&335544064)===c;if(dt=null,(Xt||Dt&8192||(Dt&16785408)===16785408)&&(dt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Hi},ni=null,w0(n,c,dt),Xt&&(Dt=dt,Xt=t.containerInfo,Xt=(Xt.nodeType===9?Xt:Xt.ownerDocument).__reactViewTransition,Xt!=null&&(Dt.count++,Dt.waitingForViewTransition=!0,Dt=cl.bind(Dt),Xt.finished.then(Dt,Dt))),Dt=(c&62914560)===c?Du-G():(c&4194048)===c?O0-G():0,Dt=pM(dt,Dt),Dt!==null)){Zi=c,t.cancelPendingCommit=Dt(Y0.bind(null,t,n,c,a,s,l,g,T,O,Y,at,dt,null,X,et)),Ka(t,c,g,!Y);return}Y0(t,n,c,a,s,l,g,T,O,Y,at,dt)}function cy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var s=0;s<a.length;s++){var l=a[s],c=l.getSnapshot;l=l.value;try{if(!ti(c(),l))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ka(t,n,a,s){n=To(t,n),n&=~Cu,n&=~Is,t.suspendedLanes|=n,t.pingedLanes&=~n,s&&(t.warmLanes|=n),s=t.expirationTimes;for(var l=n;0<l;){var c=31-On(l),g=1<<c;s[c]=-1,l&=~g}a!==0&&wl(t,a,n)}function Lu(){return(Ue&6)===0?(il(0),!1):!0}function Mh(){if(ve!==null){if(Le===0)var t=ve.return;else t=ve,ua=bs=null,wf(t),vr=null,Ho=0,t=ve;for(;t!==null;)o0(t.alternate,t),t=t.return;ve=null}}function Nr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,Oy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Zi=0,Mh(),ke=t,ve=a=oa(t.current,null),Me=n,Le=0,ii=null,Wa=!1,Ar=wa(t,n),vh=!1,Rr=ai=Cu=Is=ja=tn=0,Zn=el=null,xh=!1,ma=To(t,n),Gl(),a}function F0(t,n){ue=null,Rt.H=hu,n===_r||n===Jl?(n=Ym(),Le=3):n===_f?(n=Ym(),Le=4):Le=n===qf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ii=n,ve===null&&(tn=1,du(t,mi(n,t.current)))}function H0(){var t=Dn.current;return t===null?!0:(Me&4194048)===Me?zn===null:(Me&62914560)===Me||(Me&536870912)!==0?t===zn:!1}function G0(){var t=Rt.H;return Rt.H=hu,t===null?hu:t}function V0(){var t=Rt.A;return Rt.A=ly,t}function Ou(){tn=4,Wa||(Me&4194048)!==Me&&Dn.current!==null||(Ar=!0),(ja&134217727)===0&&(Is&134217727)===0||ke===null||Ka(ke,Me,ai,!1)}function Eh(t,n,a){var s=Ue;Ue|=2;var l=G0(),c=V0();(ke!==t||Me!==n)&&(Uu=null,Nr(t,n)),n=!1;var g=tn;t:do try{if(Le!==0&&ve!==null){var T=ve,O=ii;switch(Le){case 8:Mh(),g=6;break t;case 3:case 2:case 9:case 6:Dn.current===null&&(n=!0);var Y=Le;if(Le=0,ii=null,Lr(t,T,O,Y),a&&Ar){g=0;break t}break;default:Y=Le,Le=0,ii=null,Lr(t,T,O,Y)}}fy(),g=tn;break}catch(at){F0(t,at)}while(!0);return n&&t.shellSuspendCounter++,ua=bs=null,Ue=s,Rt.H=l,Rt.A=c,ve===null&&(ke=null,Me=0,Gl()),g}function fy(){for(;ve!==null;)k0(ve)}function hy(t,n){var a=Ue;Ue|=2;var s=G0(),l=V0();ke!==t||Me!==n?(Uu=null,wu=G()+500,Nr(t,n)):Ar=wa(t,n);t:do try{if(Le!==0&&ve!==null){n=ve;var c=ii;e:switch(Le){case 1:Le=0,ii=null,Lr(t,n,c,1);break;case 2:case 9:if(Xm(c)){Le=0,ii=null,X0(n);break}n=function(){Le!==2&&Le!==9||ke!==t||(Le=7),Ki(t)},c.then(n,n);break t;case 3:Le=7;break t;case 4:Le=5;break t;case 7:Xm(c)?(Le=0,ii=null,X0(n)):(Le=0,ii=null,Lr(t,n,c,7));break;case 5:var g=null;switch(ve.tag){case 26:g=ve.memoizedState;case 5:case 27:var T=ve;if(g?P_(g):T.stateNode.complete){Le=0,ii=null;var O=T.sibling;if(O!==null)ve=O;else{var Y=T.return;Y!==null?(ve=Y,Pu(Y)):ve=null}break e}}Le=0,ii=null,Lr(t,n,c,5);break;case 6:Le=0,ii=null,Lr(t,n,c,6);break;case 8:Mh(),tn=6;break t;default:throw Error(r(462))}}dy();break}catch(at){F0(t,at)}while(!0);return ua=bs=null,Rt.H=s,Rt.A=l,Ue=a,ve!==null?0:(ke=null,Me=0,Gl(),tn)}function dy(){for(;ve!==null&&!le();)k0(ve)}function k0(t){var n=s0(t.alternate,t,ma);t.memoizedProps=t.pendingProps,n===null?Pu(t):ve=n}function X0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Jg(a,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=Jg(a,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:wf(n);var s=n;s===yn&&(de?(Wl(s),s.tag===5&&s.stateNode!=null&&(qe=s.stateNode)):(Wl(s),de=!0));default:o0(a,n),n=ve=Lm(n,ma),n=s0(a,n,ma)}t.memoizedProps=t.pendingProps,n===null?Pu(t):ve=n}function Lr(t,n,a,s){ua=bs=null,wf(n),vr=null,Ho=0;var l=n.return;try{if(ty(t,l,n,a,Me)){tn=1,du(t,mi(a,t.current)),ve=null;return}}catch(c){if(l!==null)throw ve=l,c;tn=1,du(t,mi(a,t.current)),ve=null;return}n.flags&32768?(de||s===1?t=!0:Ar||(Me&536870912)!==0?t=!1:(Wa=t=!0,(s===2||s===9||s===3||s===6)&&(s=Dn.current,s!==null&&s.tag===13&&(s.flags|=16384))),q0(n,t)):Pu(n)}function Pu(t){var n=t;do{if((n.flags&32768)!==0){q0(n,Wa);return}t=n.return;var a=ay(n.alternate,n,ma);if(a!==null){ve=a;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=t}while(n!==null);tn===0&&(tn=5)}function q0(t,n){do{var a=sy(t.alternate,t);if(a!==null){a.flags&=32767,ve=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){ve=t;return}ve=t=a}while(t!==null);tn=6,ve=null}function Y0(t,n,a,s,l,c,g,T,O,Y,at,dt){t.cancelPendingCommit=null;do zu();while(Je!==0);if((Ue&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));t===ke&&(ve=ke=null,Me=0),Bs=n,Ni=t,Zi=a,yh=l,P0=s,py(t,n,a,g,T,O,dt)}}function py(t,n,a,s,l,c,g){var T=n.lanes|n.childLanes;if(Sh=T,T|=af,Oc(t,a,T,s,l,c),Dr=null,(a&335544064)===a?(wr=VS(t),s=10262):(wr=null,s=10256),(n.subtreeFlags&s)!==0||(n.flags&s)!==0?(t.callbackNode=null,t.callbackPriority=0,Sy(Pt,function(){return Rh(),null})):(t.callbackNode=null,t.callbackPriority=0),yu=!1,s=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||s){s=Rt.T,Rt.T=null,l=Bt.p,Bt.p=2,c=Ue,Ue|=4;try{ry(t,n,a)}finally{Ue=c,Bt.p=l,Rt.T=s}}Je=1,yu?Cr=Hy(g,t.containerInfo,wr,Th,bh,gy,Ah,Rh,my):(Th(),bh(),Ah())}function my(t){if(Je!==0){var n=Ni.onRecoverableError;n(t,{componentStack:null})}}function gy(){Je===3&&(Je=0,C0(Bs,Ni),Je=4)}function Th(){if(Je===1){Je=0;var t=Ni,n=Bs,a=Zi,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=Rt.T,Rt.T=null;var l=Bt.p;Bt.p=2;var c=Ue;Ue|=4;try{Jo=Tu=!1,A0(n,t,a),a=Fh;var g=Em(t.containerInfo),T=a.focusedElem,O=a.selectionRange;if(g!==T&&T&&T.ownerDocument&&Mm(T.ownerDocument.documentElement,T)){if(O!==null&&Jc(T)){var Y=O.start,at=O.end;if(at===void 0&&(at=Y),"selectionStart"in T)T.selectionStart=Y,T.selectionEnd=Math.min(at,T.value.length);else{var dt=T.ownerDocument||document,X=dt&&dt.defaultView||window;if(X.getSelection){var et=X.getSelection(),Dt=T.textContent.length,Xt=Math.min(O.start,Dt),ce=O.end===void 0?Xt:Math.min(O.end,Dt);!et.extend&&Xt>ce&&(g=ce,ce=Xt,Xt=g);var q=ym(T,Xt),B=ym(T,ce);if(q&&B&&(et.rangeCount!==1||et.anchorNode!==q.node||et.anchorOffset!==q.offset||et.focusNode!==B.node||et.focusOffset!==B.offset)){var tt=dt.createRange();tt.setStart(q.node,q.offset),et.removeAllRanges(),Xt>ce?(et.addRange(tt),et.extend(B.node,B.offset)):(tt.setEnd(B.node,B.offset),et.addRange(tt))}}}}for(dt=[],et=T;et=et.parentNode;)et.nodeType===1&&dt.push({element:et,left:et.scrollLeft,top:et.scrollTop});for(typeof T.focus=="function"&&T.focus(),T=0;T<dt.length;T++){var ht=dt[T];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}Gr=!!Bh,Fh=Bh=null}finally{Ue=c,Bt.p=l,Rt.T=s}}t.current=n,Je=2}}function bh(){if(Je===2){Je=0;var t=Ni,n=Bs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=Rt.T,Rt.T=null;var s=Bt.p;Bt.p=2;var l=Ue;Ue|=4;try{S0(t,n.alternate,n)}finally{Ue=l,Bt.p=s,Rt.T=a}}Je=3}}function Ah(){if(Je===4||Je===3){Je=0;var t=Cr;Cr=null,ze();var n=Ni,a=Bs,s=Zi,l=P0,c=(s&335544064)===s?10262:10256;if((a.subtreeFlags&c)!==0||(a.flags&c)!==0?Je=5:(Je=0,Bs=Ni=null,W0(n,n.pendingLanes)),c=n.pendingLanes,c===0&&(Za=null),ot(s),a=a.stateNode,We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(be,a,void 0,(a.current.flags&128)===128)}catch{}if(l!==null){a=Rt.T,c=Bt.p,Bt.p=2,Rt.T=null;try{for(var g=n.onRecoverableError,T=0;T<l.length;T++){var O=l[T];g(O.value,{componentStack:O.stack})}}finally{Rt.T=a,Bt.p=c}}if(l=Dr,g=wr,wr=null,l!==null&&(Dr=null,g===null&&(g=[]),t!==null))for(O=0;O<l.length;O++)a=(0,l[O])(g),a!==void 0&&t.finished.finally(a);(Zi&3)!==0&&zu(),Ki(n),c=n.pendingLanes,(s&261930)!==0&&(c&42)!==0?n===Nu?nl++:(nl=0,Nu=n):(nl=0,Nu=null),il(0)}}function W0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Io(n)))}function zu(){return Cr!==null&&(Cr.skipTransition(),Cr=null),Th(),bh(),Ah(),Rh()}function Rh(){if(Je!==5)return!1;var t=Ni,n=Sh;Sh=0;var a=ot(Zi),s=Rt.T,l=Bt.p;try{Bt.p=32>a?32:a,Rt.T=null,a=yh,yh=null;var c=Ni,g=Zi;if(Je=0,Bs=Ni=null,Zi=0,(Ue&6)!==0)throw Error(r(331));var T=Ue;if(Ue|=4,N0(c.current),D0(c,c.current,g,a),Ue=T,il(0,!1),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(be,c)}catch{}return!0}finally{Bt.p=l,Rt.T=s,W0(t,n)}}function j0(t,n,a){n=mi(a,n),n=Xf(t.stateNode,n,2),t=Ga(t,n,2),t!==null&&(xs(t,2),Ki(t))}function Oe(t,n,a){if(t.tag===3)j0(t,t,a);else for(;n!==null;){if(n.tag===3){j0(n,t,a);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Za===null||!Za.has(s))){t=mi(a,t),a=Xg(2),s=Ga(n,a,2),s!==null&&(qg(a,s,n,t),xs(s,2),Ki(s));break}}n=n.return}}function Ch(t,n,a){var s=t.pingCache;if(s===null){s=t.pingCache=new uy;var l=new Set;s.set(n,l)}else l=s.get(n),l===void 0&&(l=new Set,s.set(n,l));l.has(a)||(vh=!0,l.add(a),t=_y.bind(null,t,n,a),n.then(t,t))}function _y(t,n,a){var s=t.pingCache;s!==null&&s.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,ke===t&&(Me&a)===a&&((tn===4||tn===3&&(Me&62914560)===Me&&300>G()-Du)&&(Ue&2)===0?Nr(t,0):Cu|=a,Rr===Me&&(Rr=0)),Ki(t)}function Z0(t,n){n===0&&(n=Dl()),t=Ms(t,n),t!==null&&(xs(t,n),Ki(t))}function vy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),Z0(t,a)}function xy(t,n){var a=0;switch(t.tag){case 31:case 13:var s=t.stateNode,l=t.memoizedState;l!==null&&(a=l.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(n),Z0(t,a)}function Sy(t,n){return Ht(t,n)}var Or=null,Pr=null,Dh=!1,Iu=!1,wh=!1,Qa=0;function Ki(t){t!==Pr&&t.next===null&&(Pr===null?Or=Pr=t:Pr=Pr.next=t),Iu=!0,Dh||(Dh=!0,My())}function il(t,n){if(!wh&&Iu){wh=!0;do for(var a=!1,s=Or;s!==null;){if(t!==0){var l=s.pendingLanes;if(l===0)var c=0;else{var g=s.suspendedLanes,T=s.pingedLanes;c=(1<<31-On(42|t)+1)-1,c&=l&~(g&~T),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(a=!0,$0(s,c))}else c=Me,c=ea(s,s===ke?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||wa(s,c)||(a=!0,$0(s,c));s=s.next}while(a);wh=!1}}function yy(){K0()}function K0(){Iu=Dh=!1;var t=0;Qa!==0&&Ly()&&(t=Qa);for(var n=G(),a=null,s=Or;s!==null;){var l=s.next,c=Q0(s,n);c===0?(s.next=null,a===null?Or=l:a.next=l,l===null&&(Pr=a)):(a=s,(t!==0||(c&3)!==0)&&(Iu=!0)),s=l}Je!==0&&Je!==5||il(t),Qa!==0&&(Qa=0)}function Q0(t,n){for(var a=t.suspendedLanes,s=t.pingedLanes,l=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var g=31-On(c),T=1<<g,O=l[g];O===-1?((T&a)===0||(T&s)!==0)&&(l[g]=Lc(T,n)):O<=n&&(t.expiredLanes|=T),c&=~T}if(n=ke,a=Me,a=ea(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,a===0||t===n&&(Le===2||Le===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&pe(s),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||wa(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(s!==null&&pe(s),ot(a)){case 2:case 8:a=_t;break;case 32:a=Pt;break;case 268435456:a=re;break;default:a=Pt}return s=J0.bind(null,t),a=Ht(a,s),t.callbackPriority=n,t.callbackNode=a,n}return s!==null&&s!==null&&pe(s),t.callbackPriority=2,t.callbackNode=null,2}function J0(t,n){if(Je!==0&&Je!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(zu()&&t.callbackNode!==a)return null;var s=Me;return s=ea(t,t===ke?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(I0(t,s,n),Q0(t,G()),t.callbackNode!=null&&t.callbackNode===a?J0.bind(null,t):null)}function $0(t,n){if(zu())return null;I0(t,n,!0)}function My(){Py(function(){(Ue&6)!==0?Ht(ct,yy):K0()})}function Uh(){if(Qa===0){var t=Cs;t===0&&(t=_s,_s<<=1,(_s&261888)===0&&(_s=256)),Qa=t}return Qa}function t_(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ll(t)}function Ey(t,n,a,s,l){if(n==="submit"&&a&&a.stateNode===l){var c=t_((l[Ut]||null).action),g=s.submitter;g&&(n=(n=g[Ut]||null)?t_(n.formAction):g.getAttribute("formAction"),n!==null&&(c=n,g=null));var T=new Il("action","action",null,s,l);t.push({event:T,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Qa!==0){var O=new FormData(l,g);Ff(a,{pending:!0,data:O,method:l.method,action:c},null,O)}}else typeof c=="function"&&(T.preventDefault(),O=new FormData(l,g),Ff(a,{pending:!0,data:O,method:l.method,action:c},c,O))},currentTarget:l}]})}}for(var Nh=0;Nh<nf.length;Nh++){var Lh=nf[Nh],Ty=Lh.toLowerCase(),by=Lh[0].toUpperCase()+Lh.slice(1);Ci(Ty,"on"+by)}Ci(Am,"onAnimationEnd"),Ci(Rm,"onAnimationIteration"),Ci(Cm,"onAnimationStart"),Ci("dblclick","onDoubleClick"),Ci("focusin","onFocus"),Ci("focusout","onBlur"),Ci(OS,"onTransitionRun"),Ci(PS,"onTransitionStart"),Ci(zS,"onTransitionCancel"),Ci(Dm,"onTransitionEnd"),dn("onMouseEnter",["mouseout","mouseover"]),dn("onMouseLeave",["mouseout","mouseover"]),dn("onPointerEnter",["pointerout","pointerover"]),dn("onPointerLeave",["pointerout","pointerover"]),sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),sn("onBeforeInput",["compositionend","keypress","textInput","paste"]),sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var al="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ay=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(al));function e_(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var s=t[a],l=s.event;s=s.listeners;t:{var c=void 0;if(n)for(var g=s.length-1;0<=g;g--){var T=s[g],O=T.instance,Y=T.currentTarget;if(T=T.listener,O!==c&&l.isPropagationStopped())break t;c=T,l.currentTarget=Y;try{c(l)}catch(at){Hl(at)}l.currentTarget=null,c=O}else for(g=0;g<s.length;g++){if(T=s[g],O=T.instance,Y=T.currentTarget,T=T.listener,O!==c&&l.isPropagationStopped())break t;c=T,l.currentTarget=Y;try{c(l)}catch(at){Hl(at)}l.currentTarget=null,c=O}}}}function xe(t,n){var a=n[ne];a===void 0&&(a=n[ne]=new Set);var s=t+"__bubble";a.has(s)||(n_(n,t,2,!1),a.add(s))}function Oh(t,n,a){var s=0;n&&(s|=4),n_(a,t,s,n)}var Bu="_reactListening"+Math.random().toString(36).slice(2);function Ph(t){if(!t[Bu]){t[Bu]=!0,Ua.forEach(function(a){a!=="selectionchange"&&(Ay.has(a)||Oh(a,!1,t),Oh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Bu]||(n[Bu]=!0,Oh("selectionchange",!1,n))}}function n_(t,n,a,s){switch(q_(n)){case 2:var l=vM;break;case 8:l=xM;break;default:l=ed}a=l.bind(null,n,a,t),l=void 0,!Vc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),s?l!==void 0?t.addEventListener(n,a,{capture:!0,passive:l}):t.addEventListener(n,a,!0):l!==void 0?t.addEventListener(n,a,{passive:l}):t.addEventListener(n,a,!1)}function zh(t,n,a,s,l){var c=s;if((n&1)===0&&(n&2)===0&&s!==null)t:for(;;){if(s===null)return;var g=s.tag;if(g===3||g===4){var T=s.stateNode.containerInfo;if(T===l)break;if(g===4)for(g=s.return;g!==null;){var O=g.tag;if((O===3||O===4)&&g.stateNode.containerInfo===l)return;g=g.return}for(;T!==null;){if(g=Wt(T),g===null)return;if(O=g.tag,O===5||O===6||O===26||O===27){s=c=g;continue t}T=T.parentNode}}s=s.return}nm(function(){var Y=c,at=Hc(a),dt=[];t:{var X=wm.get(t);if(X!==void 0){var et=Il,Dt=t;switch(t){case"keypress":if(Pl(a)===0)break t;case"keydown":case"keyup":et=cS;break;case"focusin":Dt="focus",et=Yc;break;case"focusout":Dt="blur",et=Yc;break;case"beforeblur":case"afterblur":et=Yc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":et=sm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":et=Jx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":et=mS;break;case Am:case Rm:case Cm:et=eS;break;case Dm:et=_S;break;case"scroll":case"scrollend":et=Kx;break;case"wheel":et=xS;break;case"copy":case"cut":case"paste":et=iS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":et=om;break;case"submit":et=dS;break;case"toggle":case"beforetoggle":et=yS}var Xt=(n&4)!==0,ce=!Xt&&(t==="scroll"||t==="scrollend"),q=Xt?X!==null?X+"Capture":null:X;Xt=[];for(var B=Y,tt;B!==null;){var ht=B;if(tt=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||tt===null||q===null||(ht=Ao(B,q),ht!=null&&Xt.push(sl(B,ht,tt))),ce)break;B=B.return}0<Xt.length&&(X=new et(X,Dt,null,a,at),dt.push({event:X,listeners:Xt}))}}if((n&7)===0){t:{if(et=t==="mouseover"||t==="pointerover",X=t==="mouseout"||t==="pointerout",et&&a!==Fc&&(Dt=a.relatedTarget||a.fromElement)&&(Wt(Dt)||Dt[Qt]))break t;(X||et)&&(Dt=at.window===at?at:(et=at.ownerDocument)?et.defaultView||et.parentWindow:window,X?(et=a.relatedTarget||a.toElement,X=Y,et=et?Wt(et):null,et!==null&&(ce=f(et),Xt=et.tag,et!==ce||Xt!==5&&Xt!==27&&Xt!==6)&&(et=null)):(X=null,et=Y),X!==et&&(Xt=sm,ht="onMouseLeave",q="onMouseEnter",B="mouse",(t==="pointerout"||t==="pointerover")&&(Xt=om,ht="onPointerLeave",q="onPointerEnter",B="pointer"),ce=X==null?Dt:ye(X),tt=et==null?Dt:ye(et),Dt=new Xt(ht,B+"leave",X,a,at),Dt.target=ce,Dt.relatedTarget=tt,ht=null,Wt(at)===Y&&(Xt=new Xt(q,B+"enter",et,a,at),Xt.target=tt,Xt.relatedTarget=ce,ht=Xt),ce=ht,Xt=X&&et?V(X,et,Ry):null,X!==null&&i_(dt,Dt,X,Xt,!1),et!==null&&ce!==null&&i_(dt,ce,et,Xt,!0)))}t:{if(X=Y?ye(Y):window,et=X.nodeName&&X.nodeName.toLowerCase(),et==="select"||et==="input"&&X.type==="file")var Ft=mm;else if(dm(X))if(gm)Ft=US;else{Ft=DS;var Ee=CS}else et=X.nodeName,!et||et.toLowerCase()!=="input"||X.type!=="checkbox"&&X.type!=="radio"?Y&&Bc(Y.elementType)&&(Ft=mm):Ft=wS;if(Ft&&(Ft=Ft(t,Y))){pm(dt,Ft,a,at);break t}Ee&&Ee(t,X,Y)}switch(Ee=Y?ye(Y):window,t){case"focusin":(dm(Ee)||Ee.contentEditable==="true")&&(ur=Ee,$c=Y,Oo=null);break;case"focusout":Oo=$c=ur=null;break;case"mousedown":tf=!0;break;case"contextmenu":case"mouseup":case"dragend":tf=!1,Tm(dt,a,at);break;case"selectionchange":if(LS)break;case"keydown":case"keyup":Tm(dt,a,at)}var jt;if(jc)t:{switch(t){case"compositionstart":var $t="onCompositionStart";break t;case"compositionend":$t="onCompositionEnd";break t;case"compositionupdate":$t="onCompositionUpdate";break t}$t=void 0}else lr?fm(t,a)&&($t="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&($t="onCompositionStart");$t&&(lm&&a.locale!=="ko"&&(lr||$t!=="onCompositionStart"?$t==="onCompositionEnd"&&lr&&(jt=im()):(Na=at,kc="value"in Na?Na.value:Na.textContent,lr=!0)),Ee=Fu(Y,$t),0<Ee.length&&($t=new rm($t,t,null,a,at),dt.push({event:$t,listeners:Ee}),jt?$t.data=jt:(jt=hm(a),jt!==null&&($t.data=jt)))),(jt=ES?TS(t,a):bS(t,a))&&($t=Fu(Y,"onBeforeInput"),0<$t.length&&(Ee=new rm("onBeforeInput","beforeinput",null,a,at),dt.push({event:Ee,listeners:$t}),Ee.data=jt)),Ey(dt,t,Y,a,at)}e_(dt,n)})}function sl(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Fu(t,n){for(var a=n+"Capture",s=[];t!==null;){var l=t,c=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||c===null||(l=Ao(t,a),l!=null&&s.unshift(sl(t,l,c)),l=Ao(t,n),l!=null&&s.push(sl(t,l,c))),t.tag===3)return s;t=t.return}return[]}function Ry(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function i_(t,n,a,s,l){for(var c=n._reactName,g=[];a!==null&&a!==s;){var T=a,O=T.alternate,Y=T.stateNode;if(T=T.tag,O!==null&&O===s)break;T!==5&&T!==26&&T!==27||Y===null||(O=Y,l?(Y=Ao(a,c),Y!=null&&g.unshift(sl(a,Y,O))):l||(Y=Ao(a,c),Y!=null&&g.push(sl(a,Y,O)))),a=a.return}g.length!==0&&t.push({event:n,listeners:g})}var Cy=/\r\n?/g,Dy=/\u0000|\uFFFD/g;function a_(t){return(typeof t=="string"?t:""+t).replace(Cy,`
`).replace(Dy,"")}function s_(t,n){return n=a_(n),a_(t)===n}function Pe(t,n,a,s,l,c){switch(a){case"children":if(typeof s=="string")n==="body"||n==="textarea"&&s===""||sr(t,s);else if(typeof s=="number"||typeof s=="bigint")n!=="body"&&sr(t,""+s);else return;break;case"className":Nl(t,"class",s);break;case"tabIndex":Nl(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Nl(t,a,s);break;case"style":tm(t,s,c);return;case"data":if(n!=="object"){Nl(t,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Ll(s),t.setAttribute(a,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(a==="formAction"?(n!=="input"&&Pe(t,n,"name",l.name,l,null),Pe(t,n,"formEncType",l.formEncType,l,null),Pe(t,n,"formMethod",l.formMethod,l,null),Pe(t,n,"formTarget",l.formTarget,l,null)):(Pe(t,n,"encType",l.encType,l,null),Pe(t,n,"method",l.method,l,null),Pe(t,n,"target",l.target,l,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Ll(s),t.setAttribute(a,s);break;case"onClick":s!=null&&(t.onclick=Hi);return;case"onScroll":s!=null&&xe("scroll",t);return;case"onScrollEnd":s!=null&&xe("scrollend",t);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(l.children!=null)throw Error(r(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}a=Ll(s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":s===!0?t.setAttribute(a,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(a,s):t.removeAttribute(a);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(a):t.setAttribute(a,s);break;case"popover":xe("beforetoggle",t),xe("toggle",t),Ul(t,"popover",s);break;case"xlinkActuate":ia(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":ia(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":ia(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":ia(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":ia(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":ia(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":ia(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":ia(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":ia(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":Ul(t,"is",s);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=jx.get(a)||a,Ul(t,a,s);else return}De=!0}function Ih(t,n,a,s,l,c){switch(a){case"style":tm(t,s,c);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(l.children!=null)throw Error(r(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof s=="string")sr(t,s);else if(typeof s=="number"||typeof s=="bigint")sr(t,""+s);else return;break;case"onScroll":s!=null&&xe("scroll",t);return;case"onScrollEnd":s!=null&&xe("scrollend",t);return;case"onClick":s!=null&&(t.onclick=Hi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Ve.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),c=a.slice(2,l?a.length-7:void 0),n=t[Ut]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(c,n,l),typeof s=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(c,s,l);break t}De=!0,a in t?t[a]=s:s===!0?t.setAttribute(a,""):Ul(t,a,s)}return}De=!0}function Nn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",t),xe("load",t);var s=!1,l=!1,c;for(c in a)if(a.hasOwnProperty(c)){var g=a[c];if(g!=null)switch(c){case"src":s=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Pe(t,n,c,g,a,null)}}l&&Pe(t,n,"srcSet",a.srcSet,a,null),s&&Pe(t,n,"src",a.src,a,null);return;case"input":xe("invalid",t);var T=c=g=l=null,O=null,Y=null;for(s in a)if(a.hasOwnProperty(s)){var at=a[s];if(at!=null)switch(s){case"name":l=at;break;case"type":g=at;break;case"checked":O=at;break;case"defaultChecked":Y=at;break;case"value":c=at;break;case"defaultValue":T=at;break;case"children":case"dangerouslySetInnerHTML":if(at!=null)throw Error(r(137,n));break;default:Pe(t,n,s,at,a,null)}}Kp(t,c,T,O,Y,g,l,!1);return;case"select":xe("invalid",t),s=g=c=null;for(l in a)if(a.hasOwnProperty(l)&&(T=a[l],T!=null))switch(l){case"value":c=T;break;case"defaultValue":g=T;break;case"multiple":s=T;default:Pe(t,n,l,T,a,null)}n=c,a=g,t.multiple=!!s,n!=null?ar(t,!!s,n,!1):a!=null&&ar(t,!!s,a,!0);return;case"textarea":xe("invalid",t),c=l=s=null;for(g in a)if(a.hasOwnProperty(g)&&(T=a[g],T!=null))switch(g){case"value":s=T;break;case"defaultValue":l=T;break;case"children":c=T;break;case"dangerouslySetInnerHTML":if(T!=null)throw Error(r(91));break;default:Pe(t,n,g,T,a,null)}Jp(t,s,l,c);return;case"option":for(O in a)if(a.hasOwnProperty(O)&&(s=a[O],s!=null))switch(O){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Pe(t,n,O,s,a,null)}return;case"dialog":xe("beforetoggle",t),xe("toggle",t),xe("cancel",t),xe("close",t);break;case"iframe":case"object":xe("load",t);break;case"video":case"audio":for(s=0;s<al.length;s++)xe(al[s],t);break;case"image":xe("error",t),xe("load",t);break;case"details":xe("toggle",t);break;case"embed":case"source":case"link":xe("error",t),xe("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Y in a)if(a.hasOwnProperty(Y)&&(s=a[Y],s!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Pe(t,n,Y,s,a,null)}return;default:if(Bc(n)){for(at in a)a.hasOwnProperty(at)&&(s=a[at],s!==void 0&&Ih(t,n,at,s,a,void 0));return}}for(T in a)a.hasOwnProperty(T)&&(s=a[T],s!=null&&Pe(t,n,T,s,a,null))}var wy={};function Uy(t,n,a,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,c=null,g=null,T=null,O=null,Y=null,at=null;for(et in a){var dt=a[et];if(a.hasOwnProperty(et)&&dt!=null)switch(et){case"checked":break;case"value":break;case"defaultValue":O=dt;default:s.hasOwnProperty(et)||Pe(t,n,et,null,s,dt)}}for(var X in s){var et=s[X];if(dt=a[X],s.hasOwnProperty(X)&&(et!=null||dt!=null))switch(X){case"type":et!==dt&&(De=!0),c=et;break;case"name":et!==dt&&(De=!0),l=et;break;case"checked":et!==dt&&(De=!0),Y=et;break;case"defaultChecked":et!==dt&&(De=!0),at=et;break;case"value":et!==dt&&(De=!0),g=et;break;case"defaultValue":et!==dt&&(De=!0),T=et;break;case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(r(137,n));break;default:et!==dt&&Pe(t,n,X,et,s,dt)}}zc(t,g,T,O,Y,at,c,l);return;case"select":et=g=T=X=null;for(c in a)if(O=a[c],a.hasOwnProperty(c)&&O!=null)switch(c){case"value":break;case"multiple":et=O;default:s.hasOwnProperty(c)||Pe(t,n,c,null,s,O)}for(l in s)if(c=s[l],O=a[l],s.hasOwnProperty(l)&&(c!=null||O!=null))switch(l){case"value":c!==O&&(De=!0),X=c;break;case"defaultValue":c!==O&&(De=!0),T=c;break;case"multiple":c!==O&&(De=!0),g=c;default:c!==O&&Pe(t,n,l,c,s,O)}n=T,a=g,s=et,X!=null?ar(t,!!a,X,!1):!!s!=!!a&&(n!=null?ar(t,!!a,n,!0):ar(t,!!a,a?[]:"",!1));return;case"textarea":et=X=null;for(T in a)if(l=a[T],a.hasOwnProperty(T)&&l!=null&&!s.hasOwnProperty(T))switch(T){case"value":break;case"children":break;default:Pe(t,n,T,null,s,l)}for(g in s)if(l=s[g],c=a[g],s.hasOwnProperty(g)&&(l!=null||c!=null))switch(g){case"value":l!==c&&(De=!0),X=l;break;case"defaultValue":l!==c&&(De=!0),et=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(r(91));break;default:l!==c&&Pe(t,n,g,l,s,c)}Qp(t,X,et);return;case"option":for(var Dt in a)if(X=a[Dt],a.hasOwnProperty(Dt)&&X!=null&&!s.hasOwnProperty(Dt))switch(Dt){case"selected":t.selected=!1;break;default:Pe(t,n,Dt,null,s,X)}for(O in s)if(X=s[O],et=a[O],s.hasOwnProperty(O)&&X!==et&&(X!=null||et!=null))switch(O){case"selected":X!==et&&(De=!0),t.selected=X&&typeof X!="function"&&typeof X!="symbol";break;default:Pe(t,n,O,X,s,et)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Xt in a)X=a[Xt],a.hasOwnProperty(Xt)&&X!=null&&!s.hasOwnProperty(Xt)&&Pe(t,n,Xt,null,s,X);for(Y in s)if(X=s[Y],et=a[Y],s.hasOwnProperty(Y)&&X!==et&&(X!=null||et!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(r(137,n));break;default:Pe(t,n,Y,X,s,et)}return;default:if(Bc(n)){for(var ce in a)X=a[ce],a.hasOwnProperty(ce)&&X!==void 0&&!s.hasOwnProperty(ce)&&Ih(t,n,ce,void 0,s,X);for(at in s)X=s[at],et=a[at],!s.hasOwnProperty(at)||X===et||X===void 0&&et===void 0||Ih(t,n,at,X,s,et);return}}for(var q in a)X=a[q],a.hasOwnProperty(q)&&X!=null&&!s.hasOwnProperty(q)&&Pe(t,n,q,null,s,X);for(dt in s)X=s[dt],et=a[dt],!s.hasOwnProperty(dt)||X===et||X==null&&et==null||Pe(t,n,dt,X,s,et)}function r_(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Ny(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),s=0;s<a.length;s++){var l=a[s],c=l.transferSize,g=l.initiatorType,T=l.duration;if(c&&T&&r_(g)){for(g=0,T=l.responseEnd,s+=1;s<a.length;s++){var O=a[s],Y=O.startTime;if(Y>T)break;var at=O.transferSize,dt=O.initiatorType;at&&r_(dt)&&(O=O.responseEnd,g+=at*(O<T?1:(T-Y)/(O-Y)))}if(--s,n+=8*(c+g)/(l.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Bh=null,Fh=null;function rl(t){return t.nodeType===9?t:t.ownerDocument}function o_(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function l_(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function u_(t,n,a,s){return a=rl(a).createElement(t),a[Tt]=s,a[Ut]=n,Nn(a,t,n),je(a),a}function Hh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Gh=null;function Ly(){var t=window.event;return t&&t.type==="popstate"?t===Gh?!1:(Gh=t,!0):(Gh=null,!1)}var Vh=typeof setTimeout=="function"?setTimeout:void 0,Oy=typeof clearTimeout=="function"?clearTimeout:void 0,c_=typeof Promise=="function"?Promise:void 0,f_=typeof requestAnimationFrame=="function"?requestAnimationFrame:Vh,Py=typeof queueMicrotask=="function"?queueMicrotask:typeof c_<"u"?function(t){return c_.resolve(null).then(t).catch(zy)}:Vh;function zy(t){setTimeout(function(){throw t})}function Ja(t){return t==="head"}function h_(t,n){var a=n,s=0;do{var l=a.nextSibling;if(t.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(s===0){t.removeChild(l),Vr(n);return}s--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")s++;else if(a==="html")Kh(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Kh(a);for(var c=a.firstChild;c;){var g=c.nextSibling,T=c.nodeName;c[Xe]||T==="SCRIPT"||T==="STYLE"||T==="LINK"&&c.rel.toLowerCase()==="stylesheet"||a.removeChild(c),c=g}}else a==="body"&&Kh(t.ownerDocument.body);a=l}while(a);Vr(n)}function d_(t,n){var a=t;t=0;do{var s=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=s}while(a)}function p_(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var s=1;else for(var l=s=0;l<n.length;l++){var c=n[l];0<c.width&&0<c.height&&s++}s===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function m_(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function Iy(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function kh(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return Iy(n,a,t)}function By(t){return t.documentElement.clientHeight}function Fy(t){this.addEventListener("load",t),this.addEventListener("error",t)}function Hy(t,n,a,s,l,c,g,T,O){var Y=n.nodeType===9?n:n.ownerDocument;try{var at=Y.startViewTransition({update:function(){var X=Y.defaultView,et=X.navigation&&X.navigation.transition,Dt=Y.fonts.status;s();var Xt=[];if(Dt==="loaded"&&(By(Y),Y.fonts.status==="loading"&&Xt.push(Y.fonts.ready)),Dt=Xt.length,t!==null)for(var ce=t.suspenseyImages,q=0,B=0;B<ce.length;B++){var tt=ce[B];if(!tt.complete){var ht=tt.getBoundingClientRect();if(0<ht.bottom&&0<ht.right&&ht.top<X.innerHeight&&ht.left<X.innerWidth){if(q+=z_(tt),q>Vu){Xt.length=Dt;break}tt=new Promise(Fy.bind(tt)),Xt.push(tt)}}}if(0<Xt.length)return X=Promise.race([Promise.all(Xt),new Promise(function(Ft){return setTimeout(Ft,500)})]).then(l,l),(et?Promise.allSettled([et.finished,X]):X).then(c,c);if(l(),et)return et.finished.then(c,c);c()},types:a});Y.__reactViewTransition=at;var dt=[];return at.ready.then(function(){for(var X=Y.documentElement.getAnimations({subtree:!0}),et=0;et<X.length;et++){var Dt=X[et],Xt=Dt.effect,ce=Xt.pseudoElement;if(ce!=null&&ce.startsWith("::view-transition")){dt.push(Dt),Dt=Xt.getKeyframes();for(var q=ce=void 0,B=!0,tt=0;tt<Dt.length;tt++){var ht=Dt[tt],Ft=ht.width;if(ce===void 0)ce=Ft;else if(ce!==Ft){B=!1;break}if(Ft=ht.height,q===void 0)q=Ft;else if(q!==Ft){B=!1;break}delete ht.width,delete ht.height,ht.transform==="none"&&delete ht.transform}B&&ce!==void 0&&q!==void 0&&(Xt.setKeyframes(Dt),B=getComputedStyle(Xt.target,Xt.pseudoElement),B.width!==ce||B.height!==q)&&(B=Dt[0],B.width=ce,B.height=q,B=Dt[Dt.length-1],B.width=ce,B.height=q,Xt.setKeyframes(Dt))}}g()},function(X){Y.__reactViewTransition===at&&(Y.__reactViewTransition=null);try{if(typeof X=="object"&&X!==null)switch(X.name){case"InvalidStateError":(X.message==="View transition was skipped because document visibility state is hidden."||X.message==="Skipping view transition because document visibility state has become hidden."||X.message==="Skipping view transition because viewport size changed."||X.message==="Transition was aborted because of invalid state")&&(X=null)}X!==null&&O(X)}finally{s(),l(),g()}}),at.finished.finally(function(){for(var X=0;X<dt.length;X++)dt[X].cancel();Y.__reactViewTransition===at&&(Y.__reactViewTransition=null),T()}),at}catch{return s(),l(),g(),null}}function Fs(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Fs.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:P({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Fs.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),s=[],l=0;l<a.length;l++){var c=a[l].effect;c!==null&&c.target===t&&c.pseudoElement===n&&s.push(a[l])}return s},Fs.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function g_(t){return{name:t,group:new Fs("group",t),imagePair:new Fs("image-pair",t),old:new Fs("old",t),new:new Fs("new",t)}}function ri(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ri.prototype.addEventListener=function(t,n,a){var s=null,l=null;if(!(a!=null&&typeof a!="boolean"&&(s=a.signal||null,s!==null&&s.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var c=this._eventListeners;if(v_(c,t,n,a)===-1){var g=this,T=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(T=function(O){g.removeEventListener(t,n,a),typeof n=="function"?n.call(this,O):n.handleEvent(O)}),s!==null&&(l=g.removeEventListener.bind(g,t,n,a),s.addEventListener("abort",l,{once:!0}),l=s.removeEventListener.bind(s,"abort",l)),s=zr(a),c.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:T,cleanup:l}),m(this._fragmentFiber.child,!1,Gy,t,T,s)}this._eventListeners=c}};function Gy(t,n,a,s){return y(t).addEventListener(n,a,s),!1}ri.prototype.removeEventListener=function(t,n,a){var s=this._eventListeners;if(s!==null&&(n=v_(s,t,n,a),n!==-1)){var l=s[n];a=l.attachedListener;var c=l.cleanup;l=zr(l.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Vy,t,a,l),s.splice(n,1),c!==null&&c()}};function Vy(t,n,a,s){return y(t).removeEventListener(n,a,s),!1}function zr(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function __(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function v_(t,n,a,s){if(t.length===0)return-1;s=__(s);for(var l=0;l<t.length;l++){var c=t[l];if(c.type===n&&c.listener===a&&__(c.optionsOrUseCapture)===s)return l}return-1}ri.prototype.dispatchEvent=function(t){var n=x(this._fragmentFiber);if(n===null)return!0;n=y(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var s=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var l=0;l<a.length;l++){var c=a[l];s.addEventListener(c.type,c.attachedListener,zr(c.optionsOrUseCapture))}if(n.appendChild(s),t=s.dispatchEvent(t),a)for(l=0;l<a.length;l++)c=a[l],s.removeEventListener(c.type,c.attachedListener,zr(c.optionsOrUseCapture));return n.removeChild(s),t}return n.dispatchEvent(t)},ri.prototype.focus=function(t){m(this._fragmentFiber.child,!0,x_,t,void 0,void 0)};function x_(t,n){return t.tag===6?!1:(t=y(t),tM(t,n))}ri.prototype.focusLast=function(t){var n=[];m(this._fragmentFiber.child,!0,Xh,n,void 0,void 0);for(var a=n.length-1;0<=a&&!x_(n[a],t);a--);};function Xh(t,n){return n.push(t),!1}ri.prototype.blur=function(){var t=x(this._fragmentFiber);t!==null&&(t=y(t),t=rl(t).activeElement,t!==null&&m(this._fragmentFiber.child,!1,ky,t,void 0,void 0))};function ky(t,n){return t.tag===6?!1:(t=y(t),t===n||t.contains(n)?(n.blur(),!0):!1)}ri.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),m(this._fragmentFiber.child,!1,Xy,t,void 0,void 0)};function Xy(t,n){return t.tag===6||(t=y(t),n.observe(t)),!1}ri.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),m(this._fragmentFiber.child,!1,qy,t,void 0,void 0);for(var a=n=0;a<Li.length;a++){var s=Li[a];s.fragmentInstance===this&&s.observer===t?t.unobserve(s.instance):Li[n++]=s}Li.length=n}};function qy(t,n){return t.tag===6||(t=y(t),n.unobserve(t)),!1}var Li=[],qh=!1;function Yy(t,n,a){Li.push({fragmentInstance:t,observer:n,instance:a}),qh||(qh=!0,eM(function(){qh=!1;var s=Li;Li=[];for(var l=0;l<s.length;l++){var c=s[l];c.observer.unobserve(c.instance)}}))}ri.prototype.getClientRects=function(){var t=[];return m(this._fragmentFiber.child,!1,Wy,t,void 0,void 0),t};function Wy(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=y(t),n.push.apply(n,t.getClientRects());return!1}ri.prototype.getRootNode=function(t){var n=x(this._fragmentFiber);return n===null?this:y(n).getRootNode(t)},ri.prototype.compareDocumentPosition=function(t){var n=x(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];m(this._fragmentFiber.child,!1,Xh,a,void 0,void 0);var s=y(n);if(a.length===0){if(a=s,M(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var l=s=a.compareDocumentPosition(t);return a===t?l=Node.DOCUMENT_POSITION_CONTAINS:s&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=A(n)[1],a===null?l=Node.DOCUMENT_POSITION_PRECEDING:(t=y(a).compareDocumentPosition(t),l=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),l|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=y(a[0]),l=y(a[a.length-1]);var c=M(this._fragmentFiber)?n.parentElement:s;if(c==null)return Node.DOCUMENT_POSITION_DISCONNECTED;s=c.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,c=c.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY;var g=n.compareDocumentPosition(t),T=l.compareDocumentPosition(t),O=g&Node.DOCUMENT_POSITION_CONTAINED_BY||T&Node.DOCUMENT_POSITION_CONTAINED_BY;return T=s&&c&&g&Node.DOCUMENT_POSITION_FOLLOWING&&T&Node.DOCUMENT_POSITION_PRECEDING,n=s&&n===t||c&&l===t||O||T?Node.DOCUMENT_POSITION_CONTAINED_BY:!s&&n===t||!c&&l===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:g,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||jy(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function jy(t,n,a,s,l){var c=Wt(l);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!c)t:{for(;c!==null;){if(c.tag===7&&(c===n||c.alternate===n)){a=!0;break t}c=c.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(c===null)return c=l.ownerDocument,l===c||l===c.documentElement||l===c.body;t:{for(c=n,n=x(n);c!==null;){if(!(c.tag!==5&&c.tag!==3&&c.tag!==27||c!==n&&c.alternate!==n)){c=!0;break t}c=c.return}c=!1}return c}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!c)&&!(n=c===a)&&(n=V(a,c,K),n===null?n=!1:(m(n,!0,z,c,a),c=S,S=null,n=c!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!c)&&!(n=c===s)&&(n=V(s,c,K),n===null?n=!1:(m(n,!0,N,c,s),c=S,I=S=null,n=c!==null)),n):!1}function S_(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ri.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(r(566));var n=[];m(this._fragmentFiber.child,!1,Xh,n,void 0,void 0);var a=t!==!1;if(n.length===0){var s=A(this._fragmentFiber);if(s=a?s[1]||s[0]||x(this._fragmentFiber):s[0]||s[1],s===null)return;if(s.tag===6){t=y(s),S_(t,a);return}if(s=y(s),s.nodeType!==9){if(s.nodeType===11){a="host"in s?s.host:null,a!==null&&a.scrollIntoView(t);return}s.scrollIntoView(t)}}for(s=a?n.length-1:0;s!==(a?-1:n.length);){var l=n[s];l.tag===6?(l=y(l),S_(l,a)):y(l).scrollIntoView(t),s+=a?-1:1}};function Zy(t,n){return t=y(t),y_(t,n),!1}function y_(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function M_(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var l=a[s];t.addEventListener(l.type,l.attachedListener,zr(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){for(var g=0,T=0;T<Li.length;T++){var O=Li[T];(O.fragmentInstance!==n||O.observer!==c||O.instance!==t)&&(Li[g++]=O)}Li.length=g,c.observe(t)}),y_(t,n))}function Ky(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var l=a[s];t.removeEventListener(l.type,l.attachedListener,zr(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){typeof c.rootMargin=="string"?Yy(n,c,t):c.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function Yh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Yh(a),_e(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Qy(t,n,a,s){for(;t.nodeType===1;){var l=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[Xe])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var c=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=Si(t.nextSibling),t===null)break}return null}function Jy(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Si(t.nextSibling),t===null))return null;return t}function E_(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Si(t.nextSibling),t===null))return null;return t}function Wh(t){return t.data==="$?"||t.data==="$~"}function jh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function $y(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var s=function(){n(),a.removeEventListener("DOMContentLoaded",s)};a.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function Si(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Zh=null;function T_(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Si(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function b_(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function tM(t,n){function a(){s=!0}if(t.ownerDocument.activeElement===t)return!0;var s=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return s}function eM(t){f_(function(){f_(function(n){return t(n)})})}function A_(t,n,a){switch(n=rl(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function R_(t,n,a){for(var s in a){var l=a[s];a.hasOwnProperty(s)&&l!=null&&Pe(t,n,s,null,wy,l)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Hi&&(t.onclick=null),_e(t)}function Kh(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);_e(t)}var yi=new Map,C_=new Set;function ol(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var ga=Bt.d;Bt.d={f:nM,r:iM,D:aM,C:sM,L:rM,m:oM,X:uM,S:lM,M:cM};function nM(){var t=ga.f(),n=Lu();return t||n}function iM(t){var n=Ke(t);n!==null&&n.tag===5&&n.type==="form"?wg(n):ga.r(t)}var Ir=typeof document>"u"?null:document;function D_(t,n,a){var s=Ir;if(s&&typeof n=="string"&&n){var l=di(n);l='link[rel="'+t+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),C_.has(l)||(C_.add(l),t={rel:t,crossOrigin:a,href:n},s.querySelector(l)===null&&(n=s.createElement("link"),Nn(n,"link",t),je(n),s.head.appendChild(n)))}}function aM(t){ga.D(t),D_("dns-prefetch",t,null)}function sM(t,n){ga.C(t,n),D_("preconnect",t,n)}function rM(t,n,a){ga.L(t,n,a);var s=Ir;if(s&&t&&n){var l='link[rel="preload"][as="'+di(n)+'"]';n==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+di(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+di(a.imageSizes)+'"]')):l+='[href="'+di(t)+'"]';var c=l;switch(n){case"style":c=Br(t);break;case"script":c=Fr(t)}if(!(yi.has(c)||(t=P({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),yi.set(c,t),s.querySelector(l)!==null||n==="style"&&s.querySelector(ll(c))||n==="script"&&s.querySelector(ul(c))))){var g=s.createElement("link");Nn(g,"link",t),n==="style"&&(g[Ge]=!0,g.onload=g.onerror=function(){Pn(g)}),je(g),s.head.appendChild(g)}}}function oM(t,n){ga.m(t,n);var a=Ir;if(a&&t){var s=n&&typeof n.as=="string"?n.as:"script",l='link[rel="modulepreload"][as="'+di(s)+'"][href="'+di(t)+'"]',c=l;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=Fr(t)}if(!yi.has(c)&&(t=P({rel:"modulepreload",href:t},n),yi.set(c,t),a.querySelector(l)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(ul(c)))return}s=a.createElement("link"),Nn(s,"link",t),je(s),a.head.appendChild(s)}}}function lM(t,n,a){ga.S(t,n,a);var s=Ir;if(s&&t){var l=Sn(s).hoistableStyles,c=Br(t);n=n||"default";var g=l.get(c);if(!g){var T={loading:0,preload:null};if(g=s.querySelector(ll(c)))T.loading=5;else{t=P({rel:"stylesheet",href:t,"data-precedence":n},a),(a=yi.get(c))&&Qh(t,a);var O=g=s.createElement("link");je(O),Nn(O,"link",t),O._p=new Promise(function(Y,at){O.onload=Y,O.onerror=at}),O.addEventListener("load",function(){T.loading|=1}),O.addEventListener("error",function(){T.loading|=2}),T.loading|=4,Hu(g,n,s)}g={type:"stylesheet",instance:g,count:1,state:T},l.set(c,g)}}}function uM(t,n){ga.X(t,n);var a=Ir;if(a&&t){var s=Sn(a).hoistableScripts,l=Fr(t),c=s.get(l);c||(c=a.querySelector(ul(l)),c||(t=P({src:t,async:!0},n),(n=yi.get(l))&&Jh(t,n),c=a.createElement("script"),je(c),Nn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(l,c))}}function cM(t,n){ga.M(t,n);var a=Ir;if(a&&t){var s=Sn(a).hoistableScripts,l=Fr(t),c=s.get(l);c||(c=a.querySelector(ul(l)),c||(t=P({src:t,async:!0,type:"module"},n),(n=yi.get(l))&&Jh(t,n),c=a.createElement("script"),je(c),Nn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(l,c))}}function w_(t,n,a,s){var l=(l=U.current)?ol(l):null;if(!l)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Br(a.href),n=Sn(l).hoistableStyles,s=n.get(a),s||(s={type:"style",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Br(a.href);var c=Sn(l).hoistableStyles,g=c.get(t);if(g||(l=l.ownerDocument||l,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,g),(c=l.querySelector(ll(t)))?c._p||(g.instance=c,g.state.loading=5):(c=yi.get(t),c||(c={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(t,c)),fM(l,t,c,g.state))),n&&s===null)throw Error(r(528,""));return g}if(n&&s!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Fr(a),n=Sn(l).hoistableScripts,s=n.get(a),s||(s={type:"script",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function Br(t){return'href="'+di(t)+'"'}function ll(t){return'link[rel="stylesheet"]['+t+"]"}function U_(t){return P({},t,{"data-precedence":t.precedence,precedence:null})}function fM(t,n,a,s){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Ge]!==!0){s.loading=1;return}}else n=t.createElement("link"),n[Ge]=!0,n.onload=n.onerror=Pn.bind(null,n),Nn(n,"link",a),je(n),t.head.appendChild(n);s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2})}function Fr(t){return'[src="'+di(t)+'"]'}function ul(t){return"script[async]"+t}function N_(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var s=t.querySelector('style[data-href~="'+di(a.href)+'"]');if(s)return n.instance=s,je(s),s;var l=P({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),je(s),Nn(s,"style",l),Hu(s,a.precedence,t),n.instance=s;case"stylesheet":l=Br(a.href);var c=t.querySelector(ll(l));if(c)return n.state.loading|=4,n.instance=c,je(c),c;s=U_(a),(l=yi.get(l))&&Qh(s,l),c=(t.ownerDocument||t).createElement("link"),je(c);var g=c;return g._p=new Promise(function(T,O){g.onload=T,g.onerror=O}),Nn(c,"link",s),n.state.loading|=4,Hu(c,a.precedence,t),n.instance=c;case"script":return c=Fr(a.src),(l=t.querySelector(ul(c)))?(n.instance=l,je(l),l):(s=a,(l=yi.get(c))&&(s=P({},a),Jh(s,l)),t=t.ownerDocument||t,l=t.createElement("script"),je(l),Nn(l,"link",s),t.head.appendChild(l),n.instance=l);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(s=n.instance,n.state.loading|=4,Hu(s,a.precedence,t));return n.instance}function Hu(t,n,a){for(var s=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=s.length?s[s.length-1]:null,c=l,g=0;g<s.length;g++){var T=s[g];if(T.dataset.precedence===n)c=T;else if(c!==l)break}c?c.parentNode.insertBefore(t,c.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Qh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Jh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Gu=null;function L_(t,n,a){if(Gu===null){var s=new Map,l=Gu=new Map;l.set(a,s)}else l=Gu,s=l.get(a),s||(s=new Map,l.set(a,s));if(s.has(t))return s;for(s.set(t,null),a=a.getElementsByTagName(t),l=0;l<a.length;l++){var c=a[l];if(!(c[Xe]||c[Tt]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var g=c.getAttribute(n)||"";g=t+g;var T=s.get(g);T?T.push(c):s.set(g,[c])}}return s}function $h(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function hM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function O_(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function P_(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function z_(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function I_(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=z_(n),t.suspenseyImages.push(n)),t=mM.bind(t),n.decode().then(t,t))}function dM(t,n,a,s){if(a.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=Br(s.href),c=n.querySelector(ll(l));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=cl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=c,je(c);return}c=n.ownerDocument||n,s=U_(s),(l=yi.get(l))&&Qh(s,l),c=c.createElement("link"),je(c);var g=c;g._p=new Promise(function(T,O){g.onload=T,g.onerror=O}),Nn(c,"link",s),a.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=cl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Vu=0;function pM(t,n){return t.stylesheets&&t.count===0&&Xu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var s=setTimeout(function(){if(t.stylesheets&&Xu(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+n);0<t.imgBytes&&Vu===0&&(Vu=62500*Ny());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Xu(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>Vu?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(l)}}:null}function B_(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Xu(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function cl(){this.count--,B_(this)}function mM(){this.imgCount--,B_(this)}var ku=null;function Xu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ku=new Map,n.forEach(gM,t),ku=null,cl.call(t))}function gM(t,n){if(!(n.state.loading&4)){var a=ku.get(t);if(a)var s=a.get(null);else{a=new Map,ku.set(t,a);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<l.length;c++){var g=l[c];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),s=g)}s&&a.set(null,s)}l=n.instance,g=l.getAttribute("data-precedence"),c=a.get(g)||s,c===s&&a.set(null,l),a.set(g,l),this.count++,s=cl.bind(this),l.addEventListener("load",s),l.addEventListener("error",s),c?c.parentNode.insertBefore(l,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),n.state.loading|=4}}var Hr={$$typeof:ut,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function _M(t,n,a,s,l,c,g,T,O){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=bo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=bo(0),this.hiddenUpdates=bo(null),this.identifierPrefix=s,this.onUncaughtError=l,this.onCaughtError=c,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=O,this.transitionTypes=null,this.incompleteTransitions=new Map}function F_(t,n,a,s,l,c,g,T,O,Y,at,dt){return t=new _M(t,n,a,g,O,Y,at,dt,T),n=1,c===!0&&(n|=24),c=Yn(3,null,null,n),t.current=c,c.stateNode=t,n=pf(),n.refCount++,t.pooledCache=n,n.refCount++,c.memoizedState={element:s,isDehydrated:a,cache:n},vf(c),t}function H_(t){return t?(t=hr,t):hr}function G_(t,n,a,s,l,c){l=H_(l),s.context===null?s.context=l:s.pendingContext=l,s=Ha(n),s.payload={element:a},c=c===void 0?null:c,c!==null&&(s.callback=c),a=Ga(t,s,n),a!==null&&(Kn(a,t,n),Go(a,t,n))}function V_(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function td(t,n){V_(t,n),(t=t.alternate)&&V_(t,n)}function k_(t){if(t.tag===13||t.tag===31){var n=Ms(t,67108864);n!==null&&Kn(n,t,67108864),td(t,67108864)}}function X_(t){if(t.tag===13||t.tag===31){var n=si();n=st(n);var a=Ms(t,n);a!==null&&Kn(a,t,n),td(t,n)}}var Gr=!0;function vM(t,n,a,s){var l=Rt.T;Rt.T=null;var c=Bt.p;try{Bt.p=2,ed(t,n,a,s)}finally{Bt.p=c,Rt.T=l}}function xM(t,n,a,s){var l=Rt.T;Rt.T=null;var c=Bt.p;try{Bt.p=8,ed(t,n,a,s)}finally{Bt.p=c,Rt.T=l}}function ed(t,n,a,s){if(Gr){var l=nd(s);if(l===null)zh(t,n,s,qu,a),Y_(t,s);else if(yM(l,t,n,a,s))s.stopPropagation();else if(Y_(t,s),n&4&&-1<SM.indexOf(t)){for(;l!==null;){var c=Ke(l);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var g=Fi(c.pendingLanes);if(g!==0){var T=c;for(T.pendingLanes|=2,T.entangledLanes|=2;g;){var O=1<<31-On(g);T.entanglements[1]|=O,g&=~O}Ki(c),(Ue&6)===0&&(wu=G()+500,il(0))}}break;case 31:case 13:T=Ms(c,2),T!==null&&Kn(T,c,2),Lu(),td(c,2)}if(c=nd(s),c===null&&zh(t,n,s,qu,a),c===l)break;l=c}l!==null&&s.stopPropagation()}else zh(t,n,s,null,a)}}function nd(t){return t=Hc(t),id(t)}var qu=null;function id(t){if(qu=null,t=Wt(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return qu=t,null}function q_(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ot()){case ct:return 2;case _t:return 8;case Pt:case It:return 32;case re:return 268435456;default:return 32}default:return 32}}var ad=!1,$a=null,ts=null,es=null,fl=new Map,hl=new Map,ns=[],SM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Y_(t,n){switch(t){case"focusin":case"focusout":$a=null;break;case"dragenter":case"dragleave":ts=null;break;case"mouseover":case"mouseout":es=null;break;case"pointerover":case"pointerout":fl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":hl.delete(n.pointerId)}}function dl(t,n,a,s,l,c){return t===null||t.nativeEvent!==c?(t={blockedOn:n,domEventName:a,eventSystemFlags:s,nativeEvent:c,targetContainers:[l]},n!==null&&(n=Ke(n),n!==null&&k_(n)),t):(t.eventSystemFlags|=s,n=t.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),t)}function yM(t,n,a,s,l){switch(n){case"focusin":return $a=dl($a,t,n,a,s,l),!0;case"dragenter":return ts=dl(ts,t,n,a,s,l),!0;case"mouseover":return es=dl(es,t,n,a,s,l),!0;case"pointerover":var c=l.pointerId;return fl.set(c,dl(fl.get(c)||null,t,n,a,s,l)),!0;case"gotpointercapture":return c=l.pointerId,hl.set(c,dl(hl.get(c)||null,t,n,a,s,l)),!0}return!1}function W_(t){var n=Wt(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Mt(t.priority,function(){X_(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,Mt(t.priority,function(){X_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Yu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=nd(t.nativeEvent);if(a===null){a=t.nativeEvent;var s=new a.constructor(a.type,a);Fc=s,a.target.dispatchEvent(s),Fc=null}else return n=Ke(a),n!==null&&k_(n),t.blockedOn=a,!1;n.shift()}return!0}function j_(t,n,a){Yu(t)&&a.delete(n)}function MM(){ad=!1,$a!==null&&Yu($a)&&($a=null),ts!==null&&Yu(ts)&&(ts=null),es!==null&&Yu(es)&&(es=null),fl.forEach(j_),hl.forEach(j_)}function Wu(t,n){t.blockedOn===n&&(t.blockedOn=null,ad||(ad=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,MM)))}var ju=null;function Z_(t){ju!==t&&(ju=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){ju===t&&(ju=null);for(var n=0;n<t.length;n+=3){var a=t[n],s=t[n+1],l=t[n+2];if(typeof s!="function"){if(id(s||a)===null)continue;break}var c=Ke(a);c!==null&&(t.splice(n,3),n-=3,Ff(c,{pending:!0,data:l,method:a.method,action:s},s,l))}}))}function Vr(t){function n(O){return Wu(O,t)}$a!==null&&Wu($a,t),ts!==null&&Wu(ts,t),es!==null&&Wu(es,t),fl.forEach(n),hl.forEach(n);for(var a=0;a<ns.length;a++){var s=ns[a];s.blockedOn===t&&(s.blockedOn=null)}for(;0<ns.length&&(a=ns[0],a.blockedOn===null);)W_(a),a.blockedOn===null&&ns.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(s=0;s<a.length;s+=3){var l=a[s],c=a[s+1],g=l[Ut]||null;if(typeof c=="function")g||Z_(a);else if(g){var T=null;if(c&&c.hasAttribute("formAction")){if(l=c,g=c[Ut]||null)T=g.formAction;else if(id(l)!==null)continue}else T=g.action;typeof T=="function"?a[s+1]=T:(a.splice(s,3),s-=3),Z_(a)}}}function K_(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(g){return l=g})},focusReset:"manual",scroll:"manual"})}function n(){l!==null&&(l(),l=null),s||setTimeout(a,20)}function a(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),l!==null&&(l(),l=null)}}}function sd(t){this._internalRoot=t}Zu.prototype.render=sd.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,s=si();G_(a,s,t,n,null,null)},Zu.prototype.unmount=sd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;G_(t.current,2,null,t,null,null),Lu(),n[Qt]=null}};function Zu(t){this._internalRoot=t}Zu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Z();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ns.length&&n!==0&&n<ns[a].priority;a++);ns.splice(a,0,t),a===0&&W_(t)}};var Q_=e.version;if(Q_!=="19.3.1")throw Error(r(527,Q_,"19.3.1"));Bt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=_(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var EM={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Rt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ku=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ku.isDisabled&&Ku.supportsFiber)try{be=Ku.inject(EM),We=Ku}catch{}}return ml.createRoot=function(t,n){if(!u(t))throw Error(r(299));var a=!1,s="",l=Hg,c=Gg,g=Vg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(l=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=F_(t,1,!1,null,null,a,s,null,l,c,g,K_),t[Qt]=n.current,Ph(t),new sd(n)},ml.hydrateRoot=function(t,n,a){if(!u(t))throw Error(r(299));var s=!1,l="",c=Hg,g=Gg,T=Vg,O=null;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(c=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(T=a.onRecoverableError),a.formState!==void 0&&(O=a.formState)),n=F_(t,1,!0,n,a??null,s,l,O,c,g,T,K_),n.context=H_(null),a=n.current,s=si(),s=st(s),l=Ha(s),l.callback=null,Ga(a,l,s),a=s,n.current.lanes=a,xs(n,a),Ki(n),t[Qt]=n.current,Ph(t),new Zu(n)},ml.version="19.3.1",ml}var ov;function LM(){if(ov)return ld.exports;ov=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),ld.exports=NM(),ld.exports}var OM=LM();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Up="174",oo={ROTATE:0,DOLLY:1,PAN:2},ao={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},PM=0,lv=1,zM=2,lx=1,IM=2,Ma=3,ds=0,Jn=1,Ea=2,hs=0,lo=1,uv=2,cv=3,fv=4,BM=5,js=100,FM=101,HM=102,GM=103,VM=104,kM=200,XM=201,qM=202,YM=203,Xd=204,qd=205,WM=206,jM=207,ZM=208,KM=209,QM=210,JM=211,$M=212,tE=213,eE=214,Yd=0,Wd=1,jd=2,mo=3,Zd=4,Kd=5,Qd=6,Jd=7,ux=0,nE=1,iE=2,Ra=0,aE=1,sE=2,rE=3,oE=4,lE=5,uE=6,cE=7,cx=300,go=301,_o=302,$d=303,tp=304,Dc=306,ep=1e3,Ta=1001,np=1002,fi=1003,fE=1004,Qu=1005,bi=1006,hd=1007,Qs=1008,Ai=1009,fx=1010,hx=1011,Tl=1012,Np=1013,$s=1014,ba=1015,tr=1016,Lp=1017,Op=1018,vo=1020,dx=35902,px=1021,mx=1022,ci=1023,gx=1024,_x=1025,uo=1026,xo=1027,vx=1028,Pp=1029,xx=1030,zp=1031,Ip=1033,Sc=33776,yc=33777,Mc=33778,Ec=33779,ip=35840,ap=35841,sp=35842,rp=35843,op=36196,lp=37492,up=37496,cp=37808,fp=37809,hp=37810,dp=37811,pp=37812,mp=37813,gp=37814,_p=37815,vp=37816,xp=37817,Sp=37818,yp=37819,Mp=37820,Ep=37821,Tc=36492,Tp=36494,bp=36495,Sx=36283,Ap=36284,Rp=36285,Cp=36286,hE=3200,dE=3201,pE=0,mE=1,fs="",Ei="srgb",er="srgb-linear",Ac="linear",Be="srgb",kr=7680,hv=519,gE=512,_E=513,vE=514,yx=515,xE=516,SE=517,yE=518,ME=519,dv=35044,pv="300 es",Aa=2e3,Rc=2001;class nr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const u=r[e];if(u!==void 0){const f=u.indexOf(i);f!==-1&&u.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const u=r.slice(0);for(let f=0,h=u.length;f<h;f++)u[f].call(this,e);e.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let mv=1234567;const Ml=Math.PI/180,bl=180/Math.PI;function yo(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(In[o&255]+In[o>>8&255]+In[o>>16&255]+In[o>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[i&63|128]+In[i>>8&255]+"-"+In[i>>16&255]+In[i>>24&255]+In[r&255]+In[r>>8&255]+In[r>>16&255]+In[r>>24&255]).toLowerCase()}function me(o,e,i){return Math.max(e,Math.min(i,o))}function Bp(o,e){return(o%e+e)%e}function EE(o,e,i,r,u){return r+(o-e)*(u-r)/(i-e)}function TE(o,e,i){return o!==e?(i-o)/(e-o):0}function El(o,e,i){return(1-i)*o+i*e}function bE(o,e,i,r){return El(o,e,1-Math.exp(-i*r))}function AE(o,e=1){return e-Math.abs(Bp(o,e*2)-e)}function RE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*(3-2*o))}function CE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*o*(o*(o*6-15)+10))}function DE(o,e){return o+Math.floor(Math.random()*(e-o+1))}function wE(o,e){return o+Math.random()*(e-o)}function UE(o){return o*(.5-Math.random())}function NE(o){o!==void 0&&(mv=o);let e=mv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function LE(o){return o*Ml}function OE(o){return o*bl}function PE(o){return(o&o-1)===0&&o!==0}function zE(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function IE(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function BE(o,e,i,r,u){const f=Math.cos,h=Math.sin,d=f(i/2),p=h(i/2),_=f((e+r)/2),v=h((e+r)/2),m=f((e-r)/2),x=h((e-r)/2),M=f((r-e)/2),A=h((r-e)/2);switch(u){case"XYX":o.set(d*v,p*m,p*x,d*_);break;case"YZY":o.set(p*x,d*v,p*m,d*_);break;case"ZXZ":o.set(p*m,p*x,d*v,d*_);break;case"XZX":o.set(d*v,p*A,p*M,d*_);break;case"YXY":o.set(p*M,d*v,p*A,d*_);break;case"ZYZ":o.set(p*A,p*M,d*v,d*_);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+u)}}function io(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function kn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const bn={DEG2RAD:Ml,RAD2DEG:bl,generateUUID:yo,clamp:me,euclideanModulo:Bp,mapLinear:EE,inverseLerp:TE,lerp:El,damp:bE,pingpong:AE,smoothstep:RE,smootherstep:CE,randInt:DE,randFloat:wE,randFloatSpread:UE,seededRandom:NE,degToRad:LE,radToDeg:OE,isPowerOfTwo:PE,ceilPowerOfTwo:zE,floorPowerOfTwo:IE,setQuaternionFromProperEuler:BE,normalize:kn,denormalize:io};class oe{constructor(e=0,i=0){oe.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,u=e.elements;return this.x=u[0]*i+u[3]*r+u[6],this.y=u[1]*i+u[4]*r+u[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=me(this.x,e.x,i.x),this.y=me(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=me(this.x,e,i),this.y=me(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(me(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),u=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*r-h*u+e.x,this.y=f*u+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fe{constructor(e,i,r,u,f,h,d,p,_){fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,u,f,h,d,p,_)}set(e,i,r,u,f,h,d,p,_){const v=this.elements;return v[0]=e,v[1]=u,v[2]=d,v[3]=i,v[4]=f,v[5]=p,v[6]=r,v[7]=h,v[8]=_,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,u=i.elements,f=this.elements,h=r[0],d=r[3],p=r[6],_=r[1],v=r[4],m=r[7],x=r[2],M=r[5],A=r[8],D=u[0],y=u[3],S=u[6],I=u[1],z=u[4],N=u[7],K=u[2],V=u[5],P=u[8];return f[0]=h*D+d*I+p*K,f[3]=h*y+d*z+p*V,f[6]=h*S+d*N+p*P,f[1]=_*D+v*I+m*K,f[4]=_*y+v*z+m*V,f[7]=_*S+v*N+m*P,f[2]=x*D+M*I+A*K,f[5]=x*y+M*z+A*V,f[8]=x*S+M*N+A*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],_=e[7],v=e[8];return i*h*v-i*d*_-r*f*v+r*d*p+u*f*_-u*h*p}invert(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],_=e[7],v=e[8],m=v*h-d*_,x=d*p-v*f,M=_*f-h*p,A=i*m+r*x+u*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/A;return e[0]=m*D,e[1]=(u*_-v*r)*D,e[2]=(d*r-u*h)*D,e[3]=x*D,e[4]=(v*i-u*p)*D,e[5]=(u*f-d*i)*D,e[6]=M*D,e[7]=(r*p-_*i)*D,e[8]=(h*i-r*f)*D,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,u,f,h,d){const p=Math.cos(f),_=Math.sin(f);return this.set(r*p,r*_,-r*(p*h+_*d)+h+e,-u*_,u*p,-u*(-_*h+p*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(dd.makeScale(e,i)),this}rotate(e){return this.premultiply(dd.makeRotation(-e)),this}translate(e,i){return this.premultiply(dd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let u=0;u<9;u++)if(i[u]!==r[u])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const dd=new fe;function Mx(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Cc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function FE(){const o=Cc("canvas");return o.style.display="block",o}const gv={};function Ys(o){o in gv||(gv[o]=!0,console.warn(o))}function HE(o,e,i){return new Promise(function(r,u){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:u();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:r()}}setTimeout(f,i)})}function GE(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function VE(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const _v=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vv=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kE(){const o={enabled:!0,workingColorSpace:er,spaces:{},convert:function(u,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===Be&&(u.r=Ca(u.r),u.g=Ca(u.g),u.b=Ca(u.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(u.applyMatrix3(this.spaces[f].toXYZ),u.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Be&&(u.r=co(u.r),u.g=co(u.g),u.b=co(u.b))),u},fromWorkingColorSpace:function(u,f){return this.convert(u,this.workingColorSpace,f)},toWorkingColorSpace:function(u,f){return this.convert(u,f,this.workingColorSpace)},getPrimaries:function(u){return this.spaces[u].primaries},getTransfer:function(u){return u===fs?Ac:this.spaces[u].transfer},getLuminanceCoefficients:function(u,f=this.workingColorSpace){return u.fromArray(this.spaces[f].luminanceCoefficients)},define:function(u){Object.assign(this.spaces,u)},_getMatrix:function(u,f,h){return u.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(u){return this.spaces[u].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(u=this.workingColorSpace){return this.spaces[u].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return o.define({[er]:{primaries:e,whitePoint:r,transfer:Ac,toXYZ:_v,fromXYZ:vv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ei},outputColorSpaceConfig:{drawingBufferColorSpace:Ei}},[Ei]:{primaries:e,whitePoint:r,transfer:Be,toXYZ:_v,fromXYZ:vv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ei}}}),o}const we=kE();function Ca(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function co(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Xr;class XE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xr===void 0&&(Xr=Cc("canvas")),Xr.width=e.width,Xr.height=e.height;const r=Xr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Xr}return i.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Cc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const u=r.getImageData(0,0,e.width,e.height),f=u.data;for(let h=0;h<f.length;h++)f[h]=Ca(f[h]/255)*255;return r.putImageData(u,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Ca(i[r]/255)*255):i[r]=Ca(i[r]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qE=0;class Fp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qE++}),this.uuid=yo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},u=this.data;if(u!==null){let f;if(Array.isArray(u)){f=[];for(let h=0,d=u.length;h<d;h++)u[h].isDataTexture?f.push(pd(u[h].image)):f.push(pd(u[h]))}else f=pd(u);r.url=f}return i||(e.images[this.uuid]=r),r}}function pd(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?XE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let YE=0;class qn extends nr{constructor(e=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,r=Ta,u=Ta,f=bi,h=Qs,d=ci,p=Ai,_=qn.DEFAULT_ANISOTROPY,v=fs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:YE++}),this.uuid=yo(),this.name="",this.source=new Fp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=u,this.magFilter=f,this.minFilter=h,this.anisotropy=_,this.format=d,this.internalFormat=null,this.type=p,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ep:e.x=e.x-Math.floor(e.x);break;case Ta:e.x=e.x<0?0:1;break;case np:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ep:e.y=e.y-Math.floor(e.y);break;case Ta:e.y=e.y<0?0:1;break;case np:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=cx;qn.DEFAULT_ANISOTROPY=1;class an{constructor(e=0,i=0,r=0,u=1){an.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=u}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,u){return this.x=e,this.y=i,this.z=r,this.w=u,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,u=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*u+h[12]*f,this.y=h[1]*i+h[5]*r+h[9]*u+h[13]*f,this.z=h[2]*i+h[6]*r+h[10]*u+h[14]*f,this.w=h[3]*i+h[7]*r+h[11]*u+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,u,f;const p=e.elements,_=p[0],v=p[4],m=p[8],x=p[1],M=p[5],A=p[9],D=p[2],y=p[6],S=p[10];if(Math.abs(v-x)<.01&&Math.abs(m-D)<.01&&Math.abs(A-y)<.01){if(Math.abs(v+x)<.1&&Math.abs(m+D)<.1&&Math.abs(A+y)<.1&&Math.abs(_+M+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(_+1)/2,N=(M+1)/2,K=(S+1)/2,V=(v+x)/4,P=(m+D)/4,k=(A+y)/4;return z>N&&z>K?z<.01?(r=0,u=.707106781,f=.707106781):(r=Math.sqrt(z),u=V/r,f=P/r):N>K?N<.01?(r=.707106781,u=0,f=.707106781):(u=Math.sqrt(N),r=V/u,f=k/u):K<.01?(r=.707106781,u=.707106781,f=0):(f=Math.sqrt(K),r=P/f,u=k/f),this.set(r,u,f,i),this}let I=Math.sqrt((y-A)*(y-A)+(m-D)*(m-D)+(x-v)*(x-v));return Math.abs(I)<.001&&(I=1),this.x=(y-A)/I,this.y=(m-D)/I,this.z=(x-v)/I,this.w=Math.acos((_+M+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=me(this.x,e.x,i.x),this.y=me(this.y,e.y,i.y),this.z=me(this.z,e.z,i.z),this.w=me(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=me(this.x,e,i),this.y=me(this.y,e,i),this.z=me(this.z,e,i),this.w=me(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class WE extends nr{constructor(e=1,i=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=1,this.scissor=new an(0,0,e,i),this.scissorTest=!1,this.viewport=new an(0,0,e,i);const u={width:e,height:i,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const f=new qn(u,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);f.flipY=!1,f.generateMipmaps=r.generateMipmaps,f.internalFormat=r.internalFormat,this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let u=0,f=this.textures.length;u<f;u++)this.textures[u].image.width=e,this.textures[u].image.height=i,this.textures[u].image.depth=r;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const u=Object.assign({},e.textures[i].image);this.textures[i].source=new Fp(u)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ps extends WE{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Ex extends qn{constructor(e=null,i=1,r=1,u=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:u},this.magFilter=fi,this.minFilter=fi,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jE extends qn{constructor(e=null,i=1,r=1,u=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:u},this.magFilter=fi,this.minFilter=fi,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ms{constructor(e=0,i=0,r=0,u=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=u}static slerpFlat(e,i,r,u,f,h,d){let p=r[u+0],_=r[u+1],v=r[u+2],m=r[u+3];const x=f[h+0],M=f[h+1],A=f[h+2],D=f[h+3];if(d===0){e[i+0]=p,e[i+1]=_,e[i+2]=v,e[i+3]=m;return}if(d===1){e[i+0]=x,e[i+1]=M,e[i+2]=A,e[i+3]=D;return}if(m!==D||p!==x||_!==M||v!==A){let y=1-d;const S=p*x+_*M+v*A+m*D,I=S>=0?1:-1,z=1-S*S;if(z>Number.EPSILON){const K=Math.sqrt(z),V=Math.atan2(K,S*I);y=Math.sin(y*V)/K,d=Math.sin(d*V)/K}const N=d*I;if(p=p*y+x*N,_=_*y+M*N,v=v*y+A*N,m=m*y+D*N,y===1-d){const K=1/Math.sqrt(p*p+_*_+v*v+m*m);p*=K,_*=K,v*=K,m*=K}}e[i]=p,e[i+1]=_,e[i+2]=v,e[i+3]=m}static multiplyQuaternionsFlat(e,i,r,u,f,h){const d=r[u],p=r[u+1],_=r[u+2],v=r[u+3],m=f[h],x=f[h+1],M=f[h+2],A=f[h+3];return e[i]=d*A+v*m+p*M-_*x,e[i+1]=p*A+v*x+_*m-d*M,e[i+2]=_*A+v*M+d*x-p*m,e[i+3]=v*A-d*m-p*x-_*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,u){return this._x=e,this._y=i,this._z=r,this._w=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,u=e._y,f=e._z,h=e._order,d=Math.cos,p=Math.sin,_=d(r/2),v=d(u/2),m=d(f/2),x=p(r/2),M=p(u/2),A=p(f/2);switch(h){case"XYZ":this._x=x*v*m+_*M*A,this._y=_*M*m-x*v*A,this._z=_*v*A+x*M*m,this._w=_*v*m-x*M*A;break;case"YXZ":this._x=x*v*m+_*M*A,this._y=_*M*m-x*v*A,this._z=_*v*A-x*M*m,this._w=_*v*m+x*M*A;break;case"ZXY":this._x=x*v*m-_*M*A,this._y=_*M*m+x*v*A,this._z=_*v*A+x*M*m,this._w=_*v*m-x*M*A;break;case"ZYX":this._x=x*v*m-_*M*A,this._y=_*M*m+x*v*A,this._z=_*v*A-x*M*m,this._w=_*v*m+x*M*A;break;case"YZX":this._x=x*v*m+_*M*A,this._y=_*M*m+x*v*A,this._z=_*v*A-x*M*m,this._w=_*v*m-x*M*A;break;case"XZY":this._x=x*v*m-_*M*A,this._y=_*M*m-x*v*A,this._z=_*v*A+x*M*m,this._w=_*v*m+x*M*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,u=Math.sin(r);return this._x=e.x*u,this._y=e.y*u,this._z=e.z*u,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],u=i[4],f=i[8],h=i[1],d=i[5],p=i[9],_=i[2],v=i[6],m=i[10],x=r+d+m;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(v-p)*M,this._y=(f-_)*M,this._z=(h-u)*M}else if(r>d&&r>m){const M=2*Math.sqrt(1+r-d-m);this._w=(v-p)/M,this._x=.25*M,this._y=(u+h)/M,this._z=(f+_)/M}else if(d>m){const M=2*Math.sqrt(1+d-r-m);this._w=(f-_)/M,this._x=(u+h)/M,this._y=.25*M,this._z=(p+v)/M}else{const M=2*Math.sqrt(1+m-r-d);this._w=(h-u)/M,this._x=(f+_)/M,this._y=(p+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(me(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const u=Math.min(1,i/r);return this.slerp(e,u),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,u=e._y,f=e._z,h=e._w,d=i._x,p=i._y,_=i._z,v=i._w;return this._x=r*v+h*d+u*_-f*p,this._y=u*v+h*p+f*d-r*_,this._z=f*v+h*_+r*p-u*d,this._w=h*v-r*d-u*p-f*_,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const r=this._x,u=this._y,f=this._z,h=this._w;let d=h*e._w+r*e._x+u*e._y+f*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=r,this._y=u,this._z=f,this;const p=1-d*d;if(p<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*r+i*this._x,this._y=M*u+i*this._y,this._z=M*f+i*this._z,this.normalize(),this}const _=Math.sqrt(p),v=Math.atan2(_,d),m=Math.sin((1-i)*v)/_,x=Math.sin(i*v)/_;return this._w=h*m+this._w*x,this._x=r*m+this._x*x,this._y=u*m+this._y*x,this._z=f*m+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),u=Math.sqrt(1-r),f=Math.sqrt(r);return this.set(u*Math.sin(e),u*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{constructor(e=0,i=0,r=0){nt.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(xv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(xv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[3]*r+f[6]*u,this.y=f[1]*i+f[4]*r+f[7]*u,this.z=f[2]*i+f[5]*r+f[8]*u,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,u=this.z,f=e.elements,h=1/(f[3]*i+f[7]*r+f[11]*u+f[15]);return this.x=(f[0]*i+f[4]*r+f[8]*u+f[12])*h,this.y=(f[1]*i+f[5]*r+f[9]*u+f[13])*h,this.z=(f[2]*i+f[6]*r+f[10]*u+f[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,u=this.z,f=e.x,h=e.y,d=e.z,p=e.w,_=2*(h*u-d*r),v=2*(d*i-f*u),m=2*(f*r-h*i);return this.x=i+p*_+h*m-d*v,this.y=r+p*v+d*_-f*m,this.z=u+p*m+f*v-h*_,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[4]*r+f[8]*u,this.y=f[1]*i+f[5]*r+f[9]*u,this.z=f[2]*i+f[6]*r+f[10]*u,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=me(this.x,e.x,i.x),this.y=me(this.y,e.y,i.y),this.z=me(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=me(this.x,e,i),this.y=me(this.y,e,i),this.z=me(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,u=e.y,f=e.z,h=i.x,d=i.y,p=i.z;return this.x=u*p-f*d,this.y=f*h-r*p,this.z=r*d-u*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return md.copy(this).projectOnVector(e),this.sub(md)}reflect(e){return this.sub(md.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(me(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,u=this.z-e.z;return i*i+r*r+u*u}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const u=Math.sin(i)*e;return this.x=u*Math.sin(r),this.y=Math.cos(i)*e,this.z=u*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),u=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=u,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const md=new nt,xv=new ms;class Al{constructor(e=new nt(1/0,1/0,1/0),i=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Oi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Oi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Oi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const f=r.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Oi):Oi.fromBufferAttribute(f,h),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ju.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ju.copy(r.boundingBox)),Ju.applyMatrix4(e.matrixWorld),this.union(Ju)}const u=e.children;for(let f=0,h=u.length;f<h;f++)this.expandByObject(u[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gl),$u.subVectors(this.max,gl),qr.subVectors(e.a,gl),Yr.subVectors(e.b,gl),Wr.subVectors(e.c,gl),as.subVectors(Yr,qr),ss.subVectors(Wr,Yr),Hs.subVectors(qr,Wr);let i=[0,-as.z,as.y,0,-ss.z,ss.y,0,-Hs.z,Hs.y,as.z,0,-as.x,ss.z,0,-ss.x,Hs.z,0,-Hs.x,-as.y,as.x,0,-ss.y,ss.x,0,-Hs.y,Hs.x,0];return!gd(i,qr,Yr,Wr,$u)||(i=[1,0,0,0,1,0,0,0,1],!gd(i,qr,Yr,Wr,$u))?!1:(tc.crossVectors(as,ss),i=[tc.x,tc.y,tc.z],gd(i,qr,Yr,Wr,$u))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_a),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _a=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Oi=new nt,Ju=new Al,qr=new nt,Yr=new nt,Wr=new nt,as=new nt,ss=new nt,Hs=new nt,gl=new nt,$u=new nt,tc=new nt,Gs=new nt;function gd(o,e,i,r,u){for(let f=0,h=o.length-3;f<=h;f+=3){Gs.fromArray(o,f);const d=u.x*Math.abs(Gs.x)+u.y*Math.abs(Gs.y)+u.z*Math.abs(Gs.z),p=e.dot(Gs),_=i.dot(Gs),v=r.dot(Gs);if(Math.max(-Math.max(p,_,v),Math.min(p,_,v))>d)return!1}return!0}const ZE=new Al,_l=new nt,_d=new nt;class Hp{constructor(e=new nt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):ZE.setFromPoints(e).getCenter(r);let u=0;for(let f=0,h=e.length;f<h;f++)u=Math.max(u,r.distanceToSquared(e[f]));return this.radius=Math.sqrt(u),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_l.subVectors(e,this.center);const i=_l.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),u=(r-this.radius)*.5;this.center.addScaledVector(_l,u/r),this.radius+=u}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_d.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_l.copy(e.center).add(_d)),this.expandByPoint(_l.copy(e.center).sub(_d))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const va=new nt,vd=new nt,ec=new nt,rs=new nt,xd=new nt,nc=new nt,Sd=new nt;class Tx{constructor(e=new nt,i=new nt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,va)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=va.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(va.copy(this.origin).addScaledVector(this.direction,i),va.distanceToSquared(e))}distanceSqToSegment(e,i,r,u){vd.copy(e).add(i).multiplyScalar(.5),ec.copy(i).sub(e).normalize(),rs.copy(this.origin).sub(vd);const f=e.distanceTo(i)*.5,h=-this.direction.dot(ec),d=rs.dot(this.direction),p=-rs.dot(ec),_=rs.lengthSq(),v=Math.abs(1-h*h);let m,x,M,A;if(v>0)if(m=h*p-d,x=h*d-p,A=f*v,m>=0)if(x>=-A)if(x<=A){const D=1/v;m*=D,x*=D,M=m*(m+h*x+2*d)+x*(h*m+x+2*p)+_}else x=f,m=Math.max(0,-(h*x+d)),M=-m*m+x*(x+2*p)+_;else x=-f,m=Math.max(0,-(h*x+d)),M=-m*m+x*(x+2*p)+_;else x<=-A?(m=Math.max(0,-(-h*f+d)),x=m>0?-f:Math.min(Math.max(-f,-p),f),M=-m*m+x*(x+2*p)+_):x<=A?(m=0,x=Math.min(Math.max(-f,-p),f),M=x*(x+2*p)+_):(m=Math.max(0,-(h*f+d)),x=m>0?f:Math.min(Math.max(-f,-p),f),M=-m*m+x*(x+2*p)+_);else x=h>0?-f:f,m=Math.max(0,-(h*x+d)),M=-m*m+x*(x+2*p)+_;return r&&r.copy(this.origin).addScaledVector(this.direction,m),u&&u.copy(vd).addScaledVector(ec,x),M}intersectSphere(e,i){va.subVectors(e.center,this.origin);const r=va.dot(this.direction),u=va.dot(va)-r*r,f=e.radius*e.radius;if(u>f)return null;const h=Math.sqrt(f-u),d=r-h,p=r+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,u,f,h,d,p;const _=1/this.direction.x,v=1/this.direction.y,m=1/this.direction.z,x=this.origin;return _>=0?(r=(e.min.x-x.x)*_,u=(e.max.x-x.x)*_):(r=(e.max.x-x.x)*_,u=(e.min.x-x.x)*_),v>=0?(f=(e.min.y-x.y)*v,h=(e.max.y-x.y)*v):(f=(e.max.y-x.y)*v,h=(e.min.y-x.y)*v),r>h||f>u||((f>r||isNaN(r))&&(r=f),(h<u||isNaN(u))&&(u=h),m>=0?(d=(e.min.z-x.z)*m,p=(e.max.z-x.z)*m):(d=(e.max.z-x.z)*m,p=(e.min.z-x.z)*m),r>p||d>u)||((d>r||r!==r)&&(r=d),(p<u||u!==u)&&(u=p),u<0)?null:this.at(r>=0?r:u,i)}intersectsBox(e){return this.intersectBox(e,va)!==null}intersectTriangle(e,i,r,u,f){xd.subVectors(i,e),nc.subVectors(r,e),Sd.crossVectors(xd,nc);let h=this.direction.dot(Sd),d;if(h>0){if(u)return null;d=1}else if(h<0)d=-1,h=-h;else return null;rs.subVectors(this.origin,e);const p=d*this.direction.dot(nc.crossVectors(rs,nc));if(p<0)return null;const _=d*this.direction.dot(xd.cross(rs));if(_<0||p+_>h)return null;const v=-d*rs.dot(Sd);return v<0?null:this.at(v/h,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fn{constructor(e,i,r,u,f,h,d,p,_,v,m,x,M,A,D,y){fn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,u,f,h,d,p,_,v,m,x,M,A,D,y)}set(e,i,r,u,f,h,d,p,_,v,m,x,M,A,D,y){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=u,S[1]=f,S[5]=h,S[9]=d,S[13]=p,S[2]=_,S[6]=v,S[10]=m,S[14]=x,S[3]=M,S[7]=A,S[11]=D,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fn().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,u=1/jr.setFromMatrixColumn(e,0).length(),f=1/jr.setFromMatrixColumn(e,1).length(),h=1/jr.setFromMatrixColumn(e,2).length();return i[0]=r[0]*u,i[1]=r[1]*u,i[2]=r[2]*u,i[3]=0,i[4]=r[4]*f,i[5]=r[5]*f,i[6]=r[6]*f,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,u=e.y,f=e.z,h=Math.cos(r),d=Math.sin(r),p=Math.cos(u),_=Math.sin(u),v=Math.cos(f),m=Math.sin(f);if(e.order==="XYZ"){const x=h*v,M=h*m,A=d*v,D=d*m;i[0]=p*v,i[4]=-p*m,i[8]=_,i[1]=M+A*_,i[5]=x-D*_,i[9]=-d*p,i[2]=D-x*_,i[6]=A+M*_,i[10]=h*p}else if(e.order==="YXZ"){const x=p*v,M=p*m,A=_*v,D=_*m;i[0]=x+D*d,i[4]=A*d-M,i[8]=h*_,i[1]=h*m,i[5]=h*v,i[9]=-d,i[2]=M*d-A,i[6]=D+x*d,i[10]=h*p}else if(e.order==="ZXY"){const x=p*v,M=p*m,A=_*v,D=_*m;i[0]=x-D*d,i[4]=-h*m,i[8]=A+M*d,i[1]=M+A*d,i[5]=h*v,i[9]=D-x*d,i[2]=-h*_,i[6]=d,i[10]=h*p}else if(e.order==="ZYX"){const x=h*v,M=h*m,A=d*v,D=d*m;i[0]=p*v,i[4]=A*_-M,i[8]=x*_+D,i[1]=p*m,i[5]=D*_+x,i[9]=M*_-A,i[2]=-_,i[6]=d*p,i[10]=h*p}else if(e.order==="YZX"){const x=h*p,M=h*_,A=d*p,D=d*_;i[0]=p*v,i[4]=D-x*m,i[8]=A*m+M,i[1]=m,i[5]=h*v,i[9]=-d*v,i[2]=-_*v,i[6]=M*m+A,i[10]=x-D*m}else if(e.order==="XZY"){const x=h*p,M=h*_,A=d*p,D=d*_;i[0]=p*v,i[4]=-m,i[8]=_*v,i[1]=x*m+D,i[5]=h*v,i[9]=M*m-A,i[2]=A*m-M,i[6]=d*v,i[10]=D*m+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(KE,e,QE)}lookAt(e,i,r){const u=this.elements;return oi.subVectors(e,i),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),os.crossVectors(r,oi),os.lengthSq()===0&&(Math.abs(r.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),os.crossVectors(r,oi)),os.normalize(),ic.crossVectors(oi,os),u[0]=os.x,u[4]=ic.x,u[8]=oi.x,u[1]=os.y,u[5]=ic.y,u[9]=oi.y,u[2]=os.z,u[6]=ic.z,u[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,u=i.elements,f=this.elements,h=r[0],d=r[4],p=r[8],_=r[12],v=r[1],m=r[5],x=r[9],M=r[13],A=r[2],D=r[6],y=r[10],S=r[14],I=r[3],z=r[7],N=r[11],K=r[15],V=u[0],P=u[4],k=u[8],w=u[12],E=u[1],L=u[5],Q=u[9],J=u[13],lt=u[2],ut=u[6],H=u[10],rt=u[14],$=u[3],xt=u[7],yt=u[11],Gt=u[15];return f[0]=h*V+d*E+p*lt+_*$,f[4]=h*P+d*L+p*ut+_*xt,f[8]=h*k+d*Q+p*H+_*yt,f[12]=h*w+d*J+p*rt+_*Gt,f[1]=v*V+m*E+x*lt+M*$,f[5]=v*P+m*L+x*ut+M*xt,f[9]=v*k+m*Q+x*H+M*yt,f[13]=v*w+m*J+x*rt+M*Gt,f[2]=A*V+D*E+y*lt+S*$,f[6]=A*P+D*L+y*ut+S*xt,f[10]=A*k+D*Q+y*H+S*yt,f[14]=A*w+D*J+y*rt+S*Gt,f[3]=I*V+z*E+N*lt+K*$,f[7]=I*P+z*L+N*ut+K*xt,f[11]=I*k+z*Q+N*H+K*yt,f[15]=I*w+z*J+N*rt+K*Gt,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],u=e[8],f=e[12],h=e[1],d=e[5],p=e[9],_=e[13],v=e[2],m=e[6],x=e[10],M=e[14],A=e[3],D=e[7],y=e[11],S=e[15];return A*(+f*p*m-u*_*m-f*d*x+r*_*x+u*d*M-r*p*M)+D*(+i*p*M-i*_*x+f*h*x-u*h*M+u*_*v-f*p*v)+y*(+i*_*m-i*d*M-f*h*m+r*h*M+f*d*v-r*_*v)+S*(-u*d*v-i*p*m+i*d*x+u*h*m-r*h*x+r*p*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const u=this.elements;return e.isVector3?(u[12]=e.x,u[13]=e.y,u[14]=e.z):(u[12]=e,u[13]=i,u[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],_=e[7],v=e[8],m=e[9],x=e[10],M=e[11],A=e[12],D=e[13],y=e[14],S=e[15],I=m*y*_-D*x*_+D*p*M-d*y*M-m*p*S+d*x*S,z=A*x*_-v*y*_-A*p*M+h*y*M+v*p*S-h*x*S,N=v*D*_-A*m*_+A*d*M-h*D*M-v*d*S+h*m*S,K=A*m*p-v*D*p-A*d*x+h*D*x+v*d*y-h*m*y,V=i*I+r*z+u*N+f*K;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/V;return e[0]=I*P,e[1]=(D*x*f-m*y*f-D*u*M+r*y*M+m*u*S-r*x*S)*P,e[2]=(d*y*f-D*p*f+D*u*_-r*y*_-d*u*S+r*p*S)*P,e[3]=(m*p*f-d*x*f-m*u*_+r*x*_+d*u*M-r*p*M)*P,e[4]=z*P,e[5]=(v*y*f-A*x*f+A*u*M-i*y*M-v*u*S+i*x*S)*P,e[6]=(A*p*f-h*y*f-A*u*_+i*y*_+h*u*S-i*p*S)*P,e[7]=(h*x*f-v*p*f+v*u*_-i*x*_-h*u*M+i*p*M)*P,e[8]=N*P,e[9]=(A*m*f-v*D*f-A*r*M+i*D*M+v*r*S-i*m*S)*P,e[10]=(h*D*f-A*d*f+A*r*_-i*D*_-h*r*S+i*d*S)*P,e[11]=(v*d*f-h*m*f-v*r*_+i*m*_+h*r*M-i*d*M)*P,e[12]=K*P,e[13]=(v*D*u-A*m*u+A*r*x-i*D*x-v*r*y+i*m*y)*P,e[14]=(A*d*u-h*D*u-A*r*p+i*D*p+h*r*y-i*d*y)*P,e[15]=(h*m*u-v*d*u+v*r*p-i*m*p-h*r*x+i*d*x)*P,this}scale(e){const i=this.elements,r=e.x,u=e.y,f=e.z;return i[0]*=r,i[4]*=u,i[8]*=f,i[1]*=r,i[5]*=u,i[9]*=f,i[2]*=r,i[6]*=u,i[10]*=f,i[3]*=r,i[7]*=u,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],u=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,u))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),u=Math.sin(i),f=1-r,h=e.x,d=e.y,p=e.z,_=f*h,v=f*d;return this.set(_*h+r,_*d-u*p,_*p+u*d,0,_*d+u*p,v*d+r,v*p-u*h,0,_*p-u*d,v*p+u*h,f*p*p+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,u,f,h){return this.set(1,r,f,0,e,1,h,0,i,u,1,0,0,0,0,1),this}compose(e,i,r){const u=this.elements,f=i._x,h=i._y,d=i._z,p=i._w,_=f+f,v=h+h,m=d+d,x=f*_,M=f*v,A=f*m,D=h*v,y=h*m,S=d*m,I=p*_,z=p*v,N=p*m,K=r.x,V=r.y,P=r.z;return u[0]=(1-(D+S))*K,u[1]=(M+N)*K,u[2]=(A-z)*K,u[3]=0,u[4]=(M-N)*V,u[5]=(1-(x+S))*V,u[6]=(y+I)*V,u[7]=0,u[8]=(A+z)*P,u[9]=(y-I)*P,u[10]=(1-(x+D))*P,u[11]=0,u[12]=e.x,u[13]=e.y,u[14]=e.z,u[15]=1,this}decompose(e,i,r){const u=this.elements;let f=jr.set(u[0],u[1],u[2]).length();const h=jr.set(u[4],u[5],u[6]).length(),d=jr.set(u[8],u[9],u[10]).length();this.determinant()<0&&(f=-f),e.x=u[12],e.y=u[13],e.z=u[14],Pi.copy(this);const _=1/f,v=1/h,m=1/d;return Pi.elements[0]*=_,Pi.elements[1]*=_,Pi.elements[2]*=_,Pi.elements[4]*=v,Pi.elements[5]*=v,Pi.elements[6]*=v,Pi.elements[8]*=m,Pi.elements[9]*=m,Pi.elements[10]*=m,i.setFromRotationMatrix(Pi),r.x=f,r.y=h,r.z=d,this}makePerspective(e,i,r,u,f,h,d=Aa){const p=this.elements,_=2*f/(i-e),v=2*f/(r-u),m=(i+e)/(i-e),x=(r+u)/(r-u);let M,A;if(d===Aa)M=-(h+f)/(h-f),A=-2*h*f/(h-f);else if(d===Rc)M=-h/(h-f),A=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=_,p[4]=0,p[8]=m,p[12]=0,p[1]=0,p[5]=v,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,r,u,f,h,d=Aa){const p=this.elements,_=1/(i-e),v=1/(r-u),m=1/(h-f),x=(i+e)*_,M=(r+u)*v;let A,D;if(d===Aa)A=(h+f)*m,D=-2*m;else if(d===Rc)A=f*m,D=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*_,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=D,p[14]=-A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let u=0;u<16;u++)if(i[u]!==r[u])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const jr=new nt,Pi=new fn,KE=new nt(0,0,0),QE=new nt(1,1,1),os=new nt,ic=new nt,oi=new nt,Sv=new fn,yv=new ms;class Da{constructor(e=0,i=0,r=0,u=Da.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=u}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,u=this._order){return this._x=e,this._y=i,this._z=r,this._order=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const u=e.elements,f=u[0],h=u[4],d=u[8],p=u[1],_=u[5],v=u[9],m=u[2],x=u[6],M=u[10];switch(i){case"XYZ":this._y=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(x,_),this._z=0);break;case"YXZ":this._x=Math.asin(-me(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(p,_)):(this._y=Math.atan2(-m,f),this._z=0);break;case"ZXY":this._x=Math.asin(me(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-m,M),this._z=Math.atan2(-h,_)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-h,_));break;case"YZX":this._z=Math.asin(me(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,_),this._y=Math.atan2(-m,f)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,_),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return Sv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sv,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return yv.setFromEuler(this),this.setFromQuaternion(yv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Da.DEFAULT_ORDER="XYZ";class bx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let JE=0;const Mv=new nt,Zr=new ms,xa=new fn,ac=new nt,vl=new nt,$E=new nt,tT=new ms,Ev=new nt(1,0,0),Tv=new nt(0,1,0),bv=new nt(0,0,1),Av={type:"added"},eT={type:"removed"},Kr={type:"childadded",child:null},yd={type:"childremoved",child:null};class hi extends nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:JE++}),this.uuid=yo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hi.DEFAULT_UP.clone();const e=new nt,i=new Da,r=new ms,u=new nt(1,1,1);function f(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(f),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:u},modelViewMatrix:{value:new fn},normalMatrix:{value:new fe}}),this.matrix=new fn,this.matrixWorld=new fn,this.matrixAutoUpdate=hi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Zr.setFromAxisAngle(e,i),this.quaternion.multiply(Zr),this}rotateOnWorldAxis(e,i){return Zr.setFromAxisAngle(e,i),this.quaternion.premultiply(Zr),this}rotateX(e){return this.rotateOnAxis(Ev,e)}rotateY(e){return this.rotateOnAxis(Tv,e)}rotateZ(e){return this.rotateOnAxis(bv,e)}translateOnAxis(e,i){return Mv.copy(e).applyQuaternion(this.quaternion),this.position.add(Mv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Ev,e)}translateY(e){return this.translateOnAxis(Tv,e)}translateZ(e){return this.translateOnAxis(bv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?ac.copy(e):ac.set(e,i,r);const u=this.parent;this.updateWorldMatrix(!0,!1),vl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(vl,ac,this.up):xa.lookAt(ac,vl,this.up),this.quaternion.setFromRotationMatrix(xa),u&&(xa.extractRotation(u.matrixWorld),Zr.setFromRotationMatrix(xa),this.quaternion.premultiply(Zr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Av),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(eT),yd.child=e,this.dispatchEvent(yd),yd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xa.multiply(e.parent.matrixWorld)),e.applyMatrix4(xa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Av),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,u=this.children.length;r<u;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,e,$E),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,tT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const u={};u.uuid=this.uuid,u.type=this.type,this.name!==""&&(u.name=this.name),this.castShadow===!0&&(u.castShadow=!0),this.receiveShadow===!0&&(u.receiveShadow=!0),this.visible===!1&&(u.visible=!1),this.frustumCulled===!1&&(u.frustumCulled=!1),this.renderOrder!==0&&(u.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(u.userData=this.userData),u.layers=this.layers.mask,u.matrix=this.matrix.toArray(),u.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(u.matrixAutoUpdate=!1),this.isInstancedMesh&&(u.type="InstancedMesh",u.count=this.count,u.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(u.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(u.type="BatchedMesh",u.perObjectFrustumCulled=this.perObjectFrustumCulled,u.sortObjects=this.sortObjects,u.drawRanges=this._drawRanges,u.reservedRanges=this._reservedRanges,u.visibility=this._visibility,u.active=this._active,u.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),u.maxInstanceCount=this._maxInstanceCount,u.maxVertexCount=this._maxVertexCount,u.maxIndexCount=this._maxIndexCount,u.geometryInitialized=this._geometryInitialized,u.geometryCount=this._geometryCount,u.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(u.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(u.boundingSphere={center:u.boundingSphere.center.toArray(),radius:u.boundingSphere.radius}),this.boundingBox!==null&&(u.boundingBox={min:u.boundingBox.min.toArray(),max:u.boundingBox.max.toArray()}));function f(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?u.background=this.background.toJSON():this.background.isTexture&&(u.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(u.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){u.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let _=0,v=p.length;_<v;_++){const m=p[_];f(e.shapes,m)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(u.bindMode=this.bindMode,u.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),u.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,_=this.material.length;p<_;p++)d.push(f(e.materials,this.material[p]));u.material=d}else u.material=f(e.materials,this.material);if(this.children.length>0){u.children=[];for(let d=0;d<this.children.length;d++)u.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){u.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];u.animations.push(f(e.animations,p))}}if(i){const d=h(e.geometries),p=h(e.materials),_=h(e.textures),v=h(e.images),m=h(e.shapes),x=h(e.skeletons),M=h(e.animations),A=h(e.nodes);d.length>0&&(r.geometries=d),p.length>0&&(r.materials=p),_.length>0&&(r.textures=_),v.length>0&&(r.images=v),m.length>0&&(r.shapes=m),x.length>0&&(r.skeletons=x),M.length>0&&(r.animations=M),A.length>0&&(r.nodes=A)}return r.object=u,r;function h(d){const p=[];for(const _ in d){const v=d[_];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const u=e.children[r];this.add(u.clone())}return this}}hi.DEFAULT_UP=new nt(0,1,0);hi.DEFAULT_MATRIX_AUTO_UPDATE=!0;hi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zi=new nt,Sa=new nt,Md=new nt,ya=new nt,Qr=new nt,Jr=new nt,Rv=new nt,Ed=new nt,Td=new nt,bd=new nt,Ad=new an,Rd=new an,Cd=new an;class Bi{constructor(e=new nt,i=new nt,r=new nt){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,u){u.subVectors(r,i),zi.subVectors(e,i),u.cross(zi);const f=u.lengthSq();return f>0?u.multiplyScalar(1/Math.sqrt(f)):u.set(0,0,0)}static getBarycoord(e,i,r,u,f){zi.subVectors(u,i),Sa.subVectors(r,i),Md.subVectors(e,i);const h=zi.dot(zi),d=zi.dot(Sa),p=zi.dot(Md),_=Sa.dot(Sa),v=Sa.dot(Md),m=h*_-d*d;if(m===0)return f.set(0,0,0),null;const x=1/m,M=(_*p-d*v)*x,A=(h*v-d*p)*x;return f.set(1-M-A,A,M)}static containsPoint(e,i,r,u){return this.getBarycoord(e,i,r,u,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(e,i,r,u,f,h,d,p){return this.getBarycoord(e,i,r,u,ya)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,ya.x),p.addScaledVector(h,ya.y),p.addScaledVector(d,ya.z),p)}static getInterpolatedAttribute(e,i,r,u,f,h){return Ad.setScalar(0),Rd.setScalar(0),Cd.setScalar(0),Ad.fromBufferAttribute(e,i),Rd.fromBufferAttribute(e,r),Cd.fromBufferAttribute(e,u),h.setScalar(0),h.addScaledVector(Ad,f.x),h.addScaledVector(Rd,f.y),h.addScaledVector(Cd,f.z),h}static isFrontFacing(e,i,r,u){return zi.subVectors(r,i),Sa.subVectors(e,i),zi.cross(Sa).dot(u)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,u){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[u]),this}setFromAttributeAndIndices(e,i,r,u){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,u),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),zi.cross(Sa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Bi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,u,f){return Bi.getInterpolation(e,this.a,this.b,this.c,i,r,u,f)}containsPoint(e){return Bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,u=this.b,f=this.c;let h,d;Qr.subVectors(u,r),Jr.subVectors(f,r),Ed.subVectors(e,r);const p=Qr.dot(Ed),_=Jr.dot(Ed);if(p<=0&&_<=0)return i.copy(r);Td.subVectors(e,u);const v=Qr.dot(Td),m=Jr.dot(Td);if(v>=0&&m<=v)return i.copy(u);const x=p*m-v*_;if(x<=0&&p>=0&&v<=0)return h=p/(p-v),i.copy(r).addScaledVector(Qr,h);bd.subVectors(e,f);const M=Qr.dot(bd),A=Jr.dot(bd);if(A>=0&&M<=A)return i.copy(f);const D=M*_-p*A;if(D<=0&&_>=0&&A<=0)return d=_/(_-A),i.copy(r).addScaledVector(Jr,d);const y=v*A-M*m;if(y<=0&&m-v>=0&&M-A>=0)return Rv.subVectors(f,u),d=(m-v)/(m-v+(M-A)),i.copy(u).addScaledVector(Rv,d);const S=1/(y+D+x);return h=D*S,d=x*S,i.copy(r).addScaledVector(Qr,h).addScaledVector(Jr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ax={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},sc={h:0,s:0,l:0};function Dd(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class He{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const u=e;u&&u.isColor?this.copy(u):typeof u=="number"?this.setHex(u):typeof u=="string"&&this.setStyle(u)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Ei){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,we.toWorkingColorSpace(this,i),this}setRGB(e,i,r,u=we.workingColorSpace){return this.r=e,this.g=i,this.b=r,we.toWorkingColorSpace(this,u),this}setHSL(e,i,r,u=we.workingColorSpace){if(e=Bp(e,1),i=me(i,0,1),r=me(r,0,1),i===0)this.r=this.g=this.b=r;else{const f=r<=.5?r*(1+i):r+i-r*i,h=2*r-f;this.r=Dd(h,f,e+1/3),this.g=Dd(h,f,e),this.b=Dd(h,f,e-1/3)}return we.toWorkingColorSpace(this,u),this}setStyle(e,i=Ei){function r(f){f!==void 0&&parseFloat(f)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let u;if(u=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=u[1],d=u[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(u=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=u[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Ei){const r=Ax[e.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ca(e.r),this.g=Ca(e.g),this.b=Ca(e.b),this}copyLinearToSRGB(e){return this.r=co(e.r),this.g=co(e.g),this.b=co(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ei){return we.fromWorkingColorSpace(Bn.copy(this),e),Math.round(me(Bn.r*255,0,255))*65536+Math.round(me(Bn.g*255,0,255))*256+Math.round(me(Bn.b*255,0,255))}getHexString(e=Ei){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=we.workingColorSpace){we.fromWorkingColorSpace(Bn.copy(this),i);const r=Bn.r,u=Bn.g,f=Bn.b,h=Math.max(r,u,f),d=Math.min(r,u,f);let p,_;const v=(d+h)/2;if(d===h)p=0,_=0;else{const m=h-d;switch(_=v<=.5?m/(h+d):m/(2-h-d),h){case r:p=(u-f)/m+(u<f?6:0);break;case u:p=(f-r)/m+2;break;case f:p=(r-u)/m+4;break}p/=6}return e.h=p,e.s=_,e.l=v,e}getRGB(e,i=we.workingColorSpace){return we.fromWorkingColorSpace(Bn.copy(this),i),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=Ei){we.fromWorkingColorSpace(Bn.copy(this),e);const i=Bn.r,r=Bn.g,u=Bn.b;return e!==Ei?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${u.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(u*255)})`}offsetHSL(e,i,r){return this.getHSL(ls),this.setHSL(ls.h+e,ls.s+i,ls.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(ls),e.getHSL(sc);const r=El(ls.h,sc.h,i),u=El(ls.s,sc.s,i),f=El(ls.l,sc.l,i);return this.setHSL(r,u,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,u=this.b,f=e.elements;return this.r=f[0]*i+f[3]*r+f[6]*u,this.g=f[1]*i+f[4]*r+f[7]*u,this.b=f[2]*i+f[5]*r+f[8]*u,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new He;He.NAMES=Ax;let nT=0;class wc extends nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nT++}),this.uuid=yo(),this.name="",this.type="Material",this.blending=lo,this.side=ds,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xd,this.blendDst=qd,this.blendEquation=js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kr,this.stencilZFail=kr,this.stencilZPass=kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const u=this[i];if(u===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}u&&u.isColor?u.set(r):u&&u.isVector3&&r&&r.isVector3?u.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==lo&&(r.blending=this.blending),this.side!==ds&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Xd&&(r.blendSrc=this.blendSrc),this.blendDst!==qd&&(r.blendDst=this.blendDst),this.blendEquation!==js&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==mo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==kr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==kr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==kr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function u(f){const h=[];for(const d in f){const p=f[d];delete p.metadata,h.push(p)}return h}if(i){const f=u(e.textures),h=u(e.images);f.length>0&&(r.textures=f),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const u=i.length;r=new Array(u);for(let f=0;f!==u;++f)r[f]=i[f].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Rx extends wc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Da,this.combine=ux,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cn=new nt,rc=new oe;let iT=0;class Ri{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:iT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=dv,this.updateRanges=[],this.gpuType=ba,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let u=0,f=this.itemSize;u<f;u++)this.array[e+u]=i.array[r+u];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)rc.fromBufferAttribute(this,i),rc.applyMatrix3(e),this.setXY(i,rc.x,rc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix3(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix4(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.applyNormalMatrix(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.transformDirection(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=io(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=kn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=io(i,this.array)),i}setX(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=io(i,this.array)),i}setY(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=io(i,this.array)),i}setZ(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=io(i,this.array)),i}setW(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),r=kn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,u){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),r=kn(r,this.array),u=kn(u,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=u,this}setXYZW(e,i,r,u,f){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),r=kn(r,this.array),u=kn(u,this.array),f=kn(f,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=u,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dv&&(e.usage=this.usage),e}}class Cx extends Ri{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Dx extends Ri{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class Js extends Ri{constructor(e,i,r){super(new Float32Array(e),i,r)}}let aT=0;const Mi=new fn,wd=new hi,$r=new nt,li=new Al,xl=new Al,Tn=new nt;class gs extends nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=yo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mx(e)?Dx:Cx)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const f=new fe().getNormalMatrix(e);r.applyNormalMatrix(f),r.needsUpdate=!0}const u=this.attributes.tangent;return u!==void 0&&(u.transformDirection(e),u.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,i,r){return Mi.makeTranslation(e,i,r),this.applyMatrix4(Mi),this}scale(e,i,r){return Mi.makeScale(e,i,r),this.applyMatrix4(Mi),this}lookAt(e){return wd.lookAt(e),wd.updateMatrix(),this.applyMatrix4(wd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($r).negate(),this.translate($r.x,$r.y,$r.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let u=0,f=e.length;u<f;u++){const h=e[u];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Js(r,3))}else{const r=Math.min(e.length,i.count);for(let u=0;u<r;u++){const f=e[u];i.setXYZ(u,f.x,f.y,f.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Al);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,u=i.length;r<u;r++){const f=i[r];li.setFromBufferAttribute(f),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hp);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(e){const r=this.boundingSphere.center;if(li.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];xl.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(li.min,xl.min),li.expandByPoint(Tn),Tn.addVectors(li.max,xl.max),li.expandByPoint(Tn)):(li.expandByPoint(xl.min),li.expandByPoint(xl.max))}li.getCenter(r);let u=0;for(let f=0,h=e.count;f<h;f++)Tn.fromBufferAttribute(e,f),u=Math.max(u,r.distanceToSquared(Tn));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],p=this.morphTargetsRelative;for(let _=0,v=d.count;_<v;_++)Tn.fromBufferAttribute(d,_),p&&($r.fromBufferAttribute(e,_),Tn.add($r)),u=Math.max(u,r.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(u),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,u=i.normal,f=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ri(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let k=0;k<r.count;k++)d[k]=new nt,p[k]=new nt;const _=new nt,v=new nt,m=new nt,x=new oe,M=new oe,A=new oe,D=new nt,y=new nt;function S(k,w,E){_.fromBufferAttribute(r,k),v.fromBufferAttribute(r,w),m.fromBufferAttribute(r,E),x.fromBufferAttribute(f,k),M.fromBufferAttribute(f,w),A.fromBufferAttribute(f,E),v.sub(_),m.sub(_),M.sub(x),A.sub(x);const L=1/(M.x*A.y-A.x*M.y);isFinite(L)&&(D.copy(v).multiplyScalar(A.y).addScaledVector(m,-M.y).multiplyScalar(L),y.copy(m).multiplyScalar(M.x).addScaledVector(v,-A.x).multiplyScalar(L),d[k].add(D),d[w].add(D),d[E].add(D),p[k].add(y),p[w].add(y),p[E].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let k=0,w=I.length;k<w;++k){const E=I[k],L=E.start,Q=E.count;for(let J=L,lt=L+Q;J<lt;J+=3)S(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const z=new nt,N=new nt,K=new nt,V=new nt;function P(k){K.fromBufferAttribute(u,k),V.copy(K);const w=d[k];z.copy(w),z.sub(K.multiplyScalar(K.dot(w))).normalize(),N.crossVectors(V,w);const L=N.dot(p[k])<0?-1:1;h.setXYZW(k,z.x,z.y,z.z,L)}for(let k=0,w=I.length;k<w;++k){const E=I[k],L=E.start,Q=E.count;for(let J=L,lt=L+Q;J<lt;J+=3)P(e.getX(J+0)),P(e.getX(J+1)),P(e.getX(J+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Ri(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let x=0,M=r.count;x<M;x++)r.setXYZ(x,0,0,0);const u=new nt,f=new nt,h=new nt,d=new nt,p=new nt,_=new nt,v=new nt,m=new nt;if(e)for(let x=0,M=e.count;x<M;x+=3){const A=e.getX(x+0),D=e.getX(x+1),y=e.getX(x+2);u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,D),h.fromBufferAttribute(i,y),v.subVectors(h,f),m.subVectors(u,f),v.cross(m),d.fromBufferAttribute(r,A),p.fromBufferAttribute(r,D),_.fromBufferAttribute(r,y),d.add(v),p.add(v),_.add(v),r.setXYZ(A,d.x,d.y,d.z),r.setXYZ(D,p.x,p.y,p.z),r.setXYZ(y,_.x,_.y,_.z)}else for(let x=0,M=i.count;x<M;x+=3)u.fromBufferAttribute(i,x+0),f.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),v.subVectors(h,f),m.subVectors(u,f),v.cross(m),r.setXYZ(x+0,v.x,v.y,v.z),r.setXYZ(x+1,v.x,v.y,v.z),r.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Tn.fromBufferAttribute(e,i),Tn.normalize(),e.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(d,p){const _=d.array,v=d.itemSize,m=d.normalized,x=new _.constructor(p.length*v);let M=0,A=0;for(let D=0,y=p.length;D<y;D++){d.isInterleavedBufferAttribute?M=p[D]*d.data.stride+d.offset:M=p[D]*v;for(let S=0;S<v;S++)x[A++]=_[M++]}return new Ri(x,v,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new gs,r=this.index.array,u=this.attributes;for(const d in u){const p=u[d],_=e(p,r);i.setAttribute(d,_)}const f=this.morphAttributes;for(const d in f){const p=[],_=f[d];for(let v=0,m=_.length;v<m;v++){const x=_[v],M=e(x,r);p.push(M)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const _=h[d];i.addGroup(_.start,_.count,_.materialIndex)}return i}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const _ in p)p[_]!==void 0&&(e[_]=p[_]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const p in r){const _=r[p];e.data.attributes[p]=_.toJSON(e.data)}const u={};let f=!1;for(const p in this.morphAttributes){const _=this.morphAttributes[p],v=[];for(let m=0,x=_.length;m<x;m++){const M=_[m];v.push(M.toJSON(e.data))}v.length>0&&(u[p]=v,f=!0)}f&&(e.data.morphAttributes=u,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(i));const u=e.attributes;for(const _ in u){const v=u[_];this.setAttribute(_,v.clone(i))}const f=e.morphAttributes;for(const _ in f){const v=[],m=f[_];for(let x=0,M=m.length;x<M;x++)v.push(m[x].clone(i));this.morphAttributes[_]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let _=0,v=h.length;_<v;_++){const m=h[_];this.addGroup(m.start,m.count,m.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cv=new fn,Vs=new Tx,oc=new Hp,Dv=new nt,lc=new nt,uc=new nt,cc=new nt,Ud=new nt,fc=new nt,wv=new nt,hc=new nt;class Ji extends hi{constructor(e=new gs,i=new Rx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const u=i[r[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=u.length;f<h;f++){const d=u[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const r=this.geometry,u=r.attributes.position,f=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(u,e);const d=this.morphTargetInfluences;if(f&&d){fc.set(0,0,0);for(let p=0,_=f.length;p<_;p++){const v=d[p],m=f[p];v!==0&&(Ud.fromBufferAttribute(m,e),h?fc.addScaledVector(Ud,v):fc.addScaledVector(Ud.sub(i),v))}i.add(fc)}return i}raycast(e,i){const r=this.geometry,u=this.material,f=this.matrixWorld;u!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),oc.copy(r.boundingSphere),oc.applyMatrix4(f),Vs.copy(e.ray).recast(e.near),!(oc.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(oc,Dv)===null||Vs.origin.distanceToSquared(Dv)>(e.far-e.near)**2))&&(Cv.copy(f).invert(),Vs.copy(e.ray).applyMatrix4(Cv),!(r.boundingBox!==null&&Vs.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Vs)))}_computeIntersections(e,i,r){let u;const f=this.geometry,h=this.material,d=f.index,p=f.attributes.position,_=f.attributes.uv,v=f.attributes.uv1,m=f.attributes.normal,x=f.groups,M=f.drawRange;if(d!==null)if(Array.isArray(h))for(let A=0,D=x.length;A<D;A++){const y=x[A],S=h[y.materialIndex],I=Math.max(y.start,M.start),z=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let N=I,K=z;N<K;N+=3){const V=d.getX(N),P=d.getX(N+1),k=d.getX(N+2);u=dc(this,S,e,r,_,v,m,V,P,k),u&&(u.faceIndex=Math.floor(N/3),u.face.materialIndex=y.materialIndex,i.push(u))}}else{const A=Math.max(0,M.start),D=Math.min(d.count,M.start+M.count);for(let y=A,S=D;y<S;y+=3){const I=d.getX(y),z=d.getX(y+1),N=d.getX(y+2);u=dc(this,h,e,r,_,v,m,I,z,N),u&&(u.faceIndex=Math.floor(y/3),i.push(u))}}else if(p!==void 0)if(Array.isArray(h))for(let A=0,D=x.length;A<D;A++){const y=x[A],S=h[y.materialIndex],I=Math.max(y.start,M.start),z=Math.min(p.count,Math.min(y.start+y.count,M.start+M.count));for(let N=I,K=z;N<K;N+=3){const V=N,P=N+1,k=N+2;u=dc(this,S,e,r,_,v,m,V,P,k),u&&(u.faceIndex=Math.floor(N/3),u.face.materialIndex=y.materialIndex,i.push(u))}}else{const A=Math.max(0,M.start),D=Math.min(p.count,M.start+M.count);for(let y=A,S=D;y<S;y+=3){const I=y,z=y+1,N=y+2;u=dc(this,h,e,r,_,v,m,I,z,N),u&&(u.faceIndex=Math.floor(y/3),i.push(u))}}}}function sT(o,e,i,r,u,f,h,d){let p;if(e.side===Jn?p=r.intersectTriangle(h,f,u,!0,d):p=r.intersectTriangle(u,f,h,e.side===ds,d),p===null)return null;hc.copy(d),hc.applyMatrix4(o.matrixWorld);const _=i.ray.origin.distanceTo(hc);return _<i.near||_>i.far?null:{distance:_,point:hc.clone(),object:o}}function dc(o,e,i,r,u,f,h,d,p,_){o.getVertexPosition(d,lc),o.getVertexPosition(p,uc),o.getVertexPosition(_,cc);const v=sT(o,e,i,r,lc,uc,cc,wv);if(v){const m=new nt;Bi.getBarycoord(wv,lc,uc,cc,m),u&&(v.uv=Bi.getInterpolatedAttribute(u,d,p,_,m,new oe)),f&&(v.uv1=Bi.getInterpolatedAttribute(f,d,p,_,m,new oe)),h&&(v.normal=Bi.getInterpolatedAttribute(h,d,p,_,m,new nt),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const x={a:d,b:p,c:_,normal:new nt,materialIndex:0};Bi.getNormal(lc,uc,cc,x.normal),v.face=x,v.barycoord=m}return v}class Rl extends gs{constructor(e=1,i=1,r=1,u=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:u,heightSegments:f,depthSegments:h};const d=this;u=Math.floor(u),f=Math.floor(f),h=Math.floor(h);const p=[],_=[],v=[],m=[];let x=0,M=0;A("z","y","x",-1,-1,r,i,e,h,f,0),A("z","y","x",1,-1,r,i,-e,h,f,1),A("x","z","y",1,1,e,r,i,u,h,2),A("x","z","y",1,-1,e,r,-i,u,h,3),A("x","y","z",1,-1,e,i,r,u,f,4),A("x","y","z",-1,-1,e,i,-r,u,f,5),this.setIndex(p),this.setAttribute("position",new Js(_,3)),this.setAttribute("normal",new Js(v,3)),this.setAttribute("uv",new Js(m,2));function A(D,y,S,I,z,N,K,V,P,k,w){const E=N/P,L=K/k,Q=N/2,J=K/2,lt=V/2,ut=P+1,H=k+1;let rt=0,$=0;const xt=new nt;for(let yt=0;yt<H;yt++){const Gt=yt*L-J;for(let ee=0;ee<ut;ee++){const Te=ee*E-Q;xt[D]=Te*I,xt[y]=Gt*z,xt[S]=lt,_.push(xt.x,xt.y,xt.z),xt[D]=0,xt[y]=0,xt[S]=V>0?1:-1,v.push(xt.x,xt.y,xt.z),m.push(ee/P),m.push(1-yt/k),rt+=1}}for(let yt=0;yt<k;yt++)for(let Gt=0;Gt<P;Gt++){const ee=x+Gt+ut*yt,Te=x+Gt+ut*(yt+1),C=x+(Gt+1)+ut*(yt+1),j=x+(Gt+1)+ut*yt;p.push(ee,Te,j),p.push(Te,C,j),$+=6}d.addGroup(M,$,w),M+=$,x+=rt}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function So(o){const e={};for(const i in o){e[i]={};for(const r in o[i]){const u=o[i][r];u&&(u.isColor||u.isMatrix3||u.isMatrix4||u.isVector2||u.isVector3||u.isVector4||u.isTexture||u.isQuaternion)?u.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=u.clone():Array.isArray(u)?e[i][r]=u.slice():e[i][r]=u}}return e}function Xn(o){const e={};for(let i=0;i<o.length;i++){const r=So(o[i]);for(const u in r)e[u]=r[u]}return e}function rT(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function wx(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:we.workingColorSpace}const oT={clone:So,merge:Xn};var lT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends wc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lT,this.fragmentShader=uT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=So(e.uniforms),this.uniformsGroups=rT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const u in this.uniforms){const h=this.uniforms[u].value;h&&h.isTexture?i.uniforms[u]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[u]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[u]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[u]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[u]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[u]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[u]={type:"m4",value:h.toArray()}:i.uniforms[u]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const u in this.extensions)this.extensions[u]===!0&&(r[u]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class Ux extends hi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fn,this.projectionMatrix=new fn,this.projectionMatrixInverse=new fn,this.coordinateSystem=Aa}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const us=new nt,Uv=new oe,Nv=new oe;class Ti extends Ux{constructor(e=50,i=1,r=.1,u=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=u,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=bl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ml*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bl*2*Math.atan(Math.tan(Ml*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){us.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(us.x,us.y).multiplyScalar(-e/us.z),us.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(us.x,us.y).multiplyScalar(-e/us.z)}getViewSize(e,i){return this.getViewBounds(e,Uv,Nv),i.subVectors(Nv,Uv)}setViewOffset(e,i,r,u,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Ml*.5*this.fov)/this.zoom,r=2*i,u=this.aspect*r,f=-.5*u;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,_=h.fullHeight;f+=h.offsetX*u/p,i-=h.offsetY*r/_,u*=h.width/p,r*=h.height/_}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+u,i,i-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const to=-90,eo=1;class cT extends hi{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const u=new Ti(to,eo,e,i);u.layers=this.layers,this.add(u);const f=new Ti(to,eo,e,i);f.layers=this.layers,this.add(f);const h=new Ti(to,eo,e,i);h.layers=this.layers,this.add(h);const d=new Ti(to,eo,e,i);d.layers=this.layers,this.add(d);const p=new Ti(to,eo,e,i);p.layers=this.layers,this.add(p);const _=new Ti(to,eo,e,i);_.layers=this.layers,this.add(_)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,u,f,h,d,p]=i;for(const _ of i)this.remove(_);if(e===Aa)r.up.set(0,1,0),r.lookAt(1,0,0),u.up.set(0,1,0),u.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Rc)r.up.set(0,-1,0),r.lookAt(-1,0,0),u.up.set(0,-1,0),u.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const _ of i)this.add(_),_.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:u}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,p,_,v]=this.children,m=e.getRenderTarget(),x=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const D=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,u),e.render(i,f),e.setRenderTarget(r,1,u),e.render(i,h),e.setRenderTarget(r,2,u),e.render(i,d),e.setRenderTarget(r,3,u),e.render(i,p),e.setRenderTarget(r,4,u),e.render(i,_),r.texture.generateMipmaps=D,e.setRenderTarget(r,5,u),e.render(i,v),e.setRenderTarget(m,x,M),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class Nx extends qn{constructor(e,i,r,u,f,h,d,p,_,v){e=e!==void 0?e:[],i=i!==void 0?i:go,super(e,i,r,u,f,h,d,p,_,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fT extends ps{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},u=[r,r,r,r,r,r];this.texture=new Nx(u,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:bi}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},u=new Rl(5,5,5),f=new ui({name:"CubemapFromEquirect",uniforms:So(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Jn,blending:hs});f.uniforms.tEquirect.value=i;const h=new Ji(u,f),d=i.minFilter;return i.minFilter===Qs&&(i.minFilter=bi),new cT(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i,r,u){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,u);e.setRenderTarget(f)}}class pc extends hi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hT={type:"move"};class Nd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let u=null,f=null,h=null;const d=this._targetRay,p=this._grip,_=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(_&&e.hand){h=!0;for(const D of e.hand.values()){const y=i.getJointPose(D,r),S=this._getHandJoint(_,D);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const v=_.joints["index-finger-tip"],m=_.joints["thumb-tip"],x=v.position.distanceTo(m.position),M=.02,A=.005;_.inputState.pinching&&x>M+A?(_.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!_.inputState.pinching&&x<=M-A&&(_.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,r),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(u=i.getPose(e.targetRaySpace,r),u===null&&f!==null&&(u=f),u!==null&&(d.matrix.fromArray(u.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,u.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(u.linearVelocity)):d.hasLinearVelocity=!1,u.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(u.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(hT)))}return d!==null&&(d.visible=u!==null),p!==null&&(p.visible=f!==null),_!==null&&(_.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new pc;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}class dT extends hi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Da,this.environmentIntensity=1,this.environmentRotation=new Da,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class pT extends qn{constructor(e=null,i=1,r=1,u,f,h,d,p,_=fi,v=fi,m,x){super(null,h,d,p,_,v,u,f,m,x),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ld=new nt,mT=new nt,gT=new fe;class cs{constructor(e=new nt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,u){return this.normal.set(e,i,r),this.constant=u,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const u=Ld.subVectors(r,i).cross(mT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(u,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(Ld),u=this.normal.dot(r);if(u===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/u;return f<0||f>1?null:i.copy(e.start).addScaledVector(r,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||gT.getNormalMatrix(e),u=this.coplanarPoint(Ld).applyMatrix4(e),f=this.normal.applyMatrix3(r).normalize();return this.constant=-u.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ks=new Hp,mc=new nt;class Lx{constructor(e=new cs,i=new cs,r=new cs,u=new cs,f=new cs,h=new cs){this.planes=[e,i,r,u,f,h]}set(e,i,r,u,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(u),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=Aa){const r=this.planes,u=e.elements,f=u[0],h=u[1],d=u[2],p=u[3],_=u[4],v=u[5],m=u[6],x=u[7],M=u[8],A=u[9],D=u[10],y=u[11],S=u[12],I=u[13],z=u[14],N=u[15];if(r[0].setComponents(p-f,x-_,y-M,N-S).normalize(),r[1].setComponents(p+f,x+_,y+M,N+S).normalize(),r[2].setComponents(p+h,x+v,y+A,N+I).normalize(),r[3].setComponents(p-h,x-v,y-A,N-I).normalize(),r[4].setComponents(p-d,x-m,y-D,N-z).normalize(),i===Aa)r[5].setComponents(p+d,x+m,y+D,N+z).normalize();else if(i===Rc)r[5].setComponents(d,m,D,z).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(e){return ks.center.set(0,0,0),ks.radius=.7071067811865476,ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(e){const i=this.planes,r=e.center,u=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(r)<u)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const u=i[r];if(mc.x=u.normal.x>0?e.max.x:e.min.x,mc.y=u.normal.y>0?e.max.y:e.min.y,mc.z=u.normal.z>0?e.max.z:e.min.z,u.distanceToPoint(mc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ox extends qn{constructor(e,i,r,u,f,h,d,p,_,v=uo){if(v!==uo&&v!==xo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&v===uo&&(r=$s),r===void 0&&v===xo&&(r=vo),super(null,u,f,h,d,p,v,r,_),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=d!==void 0?d:fi,this.minFilter=p!==void 0?p:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Uc extends gs{constructor(e=1,i=1,r=1,u=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:u};const f=e/2,h=i/2,d=Math.floor(r),p=Math.floor(u),_=d+1,v=p+1,m=e/d,x=i/p,M=[],A=[],D=[],y=[];for(let S=0;S<v;S++){const I=S*x-h;for(let z=0;z<_;z++){const N=z*m-f;A.push(N,-I,0),D.push(0,0,1),y.push(z/d),y.push(1-S/p)}}for(let S=0;S<p;S++)for(let I=0;I<d;I++){const z=I+_*S,N=I+_*(S+1),K=I+1+_*(S+1),V=I+1+_*S;M.push(z,N,V),M.push(N,K,V)}this.setIndex(M),this.setAttribute("position",new Js(A,3)),this.setAttribute("normal",new Js(D,3)),this.setAttribute("uv",new Js(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uc(e.width,e.height,e.widthSegments,e.heightSegments)}}class _T extends wc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vT extends wc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Px extends Ux{constructor(e=-1,i=1,r=1,u=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=u,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,u,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,u=(this.top+this.bottom)/2;let f=r-e,h=r+e,d=u+i,p=u-i;if(this.view!==null&&this.view.enabled){const _=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=_*this.view.offsetX,h=f+_*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class xT extends Ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Lv{constructor(e=1,i=0,r=0){this.radius=e,this.phi=i,this.theta=r}set(e,i,r){return this.radius=e,this.phi=i,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,r){return this.radius=Math.sqrt(e*e+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(me(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ST extends nr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Ov(o,e,i,r){const u=yT(r);switch(i){case px:return o*e;case gx:return o*e;case _x:return o*e*2;case vx:return o*e/u.components*u.byteLength;case Pp:return o*e/u.components*u.byteLength;case xx:return o*e*2/u.components*u.byteLength;case zp:return o*e*2/u.components*u.byteLength;case mx:return o*e*3/u.components*u.byteLength;case ci:return o*e*4/u.components*u.byteLength;case Ip:return o*e*4/u.components*u.byteLength;case Sc:case yc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Mc:case Ec:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case ap:case rp:return Math.max(o,16)*Math.max(e,8)/4;case ip:case sp:return Math.max(o,8)*Math.max(e,8)/2;case op:case lp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case up:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case cp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case fp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case hp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case dp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case pp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case mp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case gp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case _p:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case vp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case xp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case yp:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Mp:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Ep:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Tc:case Tp:case bp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Sx:case Ap:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Rp:case Cp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function yT(o){switch(o){case Ai:case fx:return{byteLength:1,components:1};case Tl:case hx:case tr:return{byteLength:2,components:1};case Lp:case Op:return{byteLength:2,components:4};case $s:case Np:case ba:return{byteLength:4,components:1};case dx:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Up}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Up);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zx(){let o=null,e=!1,i=null,r=null;function u(f,h){i(f,h),r=o.requestAnimationFrame(u)}return{start:function(){e!==!0&&i!==null&&(r=o.requestAnimationFrame(u),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function MT(o){const e=new WeakMap;function i(d,p){const _=d.array,v=d.usage,m=_.byteLength,x=o.createBuffer();o.bindBuffer(p,x),o.bufferData(p,_,v),d.onUploadCallback();let M;if(_ instanceof Float32Array)M=o.FLOAT;else if(_ instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(_ instanceof Int16Array)M=o.SHORT;else if(_ instanceof Uint32Array)M=o.UNSIGNED_INT;else if(_ instanceof Int32Array)M=o.INT;else if(_ instanceof Int8Array)M=o.BYTE;else if(_ instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(_ instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+_);return{buffer:x,type:M,bytesPerElement:_.BYTES_PER_ELEMENT,version:d.version,size:m}}function r(d,p,_){const v=p.array,m=p.updateRanges;if(o.bindBuffer(_,d),m.length===0)o.bufferSubData(_,0,v);else{m.sort((M,A)=>M.start-A.start);let x=0;for(let M=1;M<m.length;M++){const A=m[x],D=m[M];D.start<=A.start+A.count+1?A.count=Math.max(A.count,D.start+D.count-A.start):(++x,m[x]=D)}m.length=x+1;for(let M=0,A=m.length;M<A;M++){const D=m[M];o.bufferSubData(_,D.start*v.BYTES_PER_ELEMENT,v,D.start,D.count)}p.clearUpdateRanges()}p.onUploadCallback()}function u(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(o.deleteBuffer(p.buffer),e.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const _=e.get(d);if(_===void 0)e.set(d,i(d,p));else if(_.version<d.version){if(_.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(_.buffer,d,p),_.version=d.version}}return{get:u,remove:f,update:h}}var ET=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,TT=`#ifdef USE_ALPHAHASH
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
#endif`,bT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,AT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,CT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,DT=`#ifdef USE_AOMAP
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
#endif`,wT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,UT=`#ifdef USE_BATCHING
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
#endif`,NT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,LT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,OT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,PT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zT=`#ifdef USE_IRIDESCENCE
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
#endif`,IT=`#ifdef USE_BUMPMAP
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
#endif`,BT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,FT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,XT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qT=`#if defined( USE_COLOR_ALPHA )
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
#endif`,YT=`#define PI 3.141592653589793
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
} // validated`,WT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jT=`vec3 transformedNormal = objectNormal;
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
#endif`,ZT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,KT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$T="gl_FragColor = linearToOutputTexel( gl_FragColor );",tb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eb=`#ifdef USE_ENVMAP
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
#endif`,nb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ib=`#ifdef USE_ENVMAP
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
#endif`,ab=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sb=`#ifdef USE_ENVMAP
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
#endif`,rb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ob=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ub=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cb=`#ifdef USE_GRADIENTMAP
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
}`,fb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,db=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pb=`uniform bool receiveShadow;
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
#endif`,mb=`#ifdef USE_ENVMAP
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
#endif`,gb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_b=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sb=`PhysicalMaterial material;
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
#endif`,yb=`struct PhysicalMaterial {
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
}`,Mb=`
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
#endif`,Eb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ab=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Db=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ub=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Nb=`#if defined( USE_POINTS_UV )
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
#endif`,Lb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ob=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ib=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bb=`#ifdef USE_MORPHTARGETS
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
#endif`,Fb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qb=`#ifdef USE_NORMALMAP
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
#endif`,Yb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$b=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,t1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,n1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,i1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,o1=`float getShadowMask() {
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
}`,l1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,u1=`#ifdef USE_SKINNING
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
#endif`,c1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f1=`#ifdef USE_SKINNING
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
#endif`,h1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,d1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,p1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,m1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,g1=`#ifdef USE_TRANSMISSION
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
#endif`,_1=`#ifdef USE_TRANSMISSION
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
#endif`,v1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const M1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E1=`uniform sampler2D t2D;
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
}`,T1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,A1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C1=`#include <common>
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
}`,D1=`#if DEPTH_PACKING == 3200
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
}`,w1=`#define DISTANCE
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
}`,U1=`#define DISTANCE
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
}`,N1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,L1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O1=`uniform float scale;
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
}`,P1=`uniform vec3 diffuse;
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
}`,z1=`#include <common>
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
}`,I1=`uniform vec3 diffuse;
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
}`,B1=`#define LAMBERT
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
}`,F1=`#define LAMBERT
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
}`,H1=`#define MATCAP
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
}`,G1=`#define MATCAP
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
}`,V1=`#define NORMAL
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
}`,k1=`#define NORMAL
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
}`,X1=`#define PHONG
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
}`,q1=`#define PHONG
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
}`,Y1=`#define STANDARD
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
}`,W1=`#define STANDARD
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
}`,j1=`#define TOON
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
}`,Z1=`#define TOON
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
}`,K1=`uniform float size;
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
}`,Q1=`uniform vec3 diffuse;
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
}`,J1=`#include <common>
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
}`,$1=`uniform vec3 color;
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
}`,tA=`uniform float rotation;
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
}`,eA=`uniform vec3 diffuse;
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
}`,he={alphahash_fragment:ET,alphahash_pars_fragment:TT,alphamap_fragment:bT,alphamap_pars_fragment:AT,alphatest_fragment:RT,alphatest_pars_fragment:CT,aomap_fragment:DT,aomap_pars_fragment:wT,batching_pars_vertex:UT,batching_vertex:NT,begin_vertex:LT,beginnormal_vertex:OT,bsdfs:PT,iridescence_fragment:zT,bumpmap_pars_fragment:IT,clipping_planes_fragment:BT,clipping_planes_pars_fragment:FT,clipping_planes_pars_vertex:HT,clipping_planes_vertex:GT,color_fragment:VT,color_pars_fragment:kT,color_pars_vertex:XT,color_vertex:qT,common:YT,cube_uv_reflection_fragment:WT,defaultnormal_vertex:jT,displacementmap_pars_vertex:ZT,displacementmap_vertex:KT,emissivemap_fragment:QT,emissivemap_pars_fragment:JT,colorspace_fragment:$T,colorspace_pars_fragment:tb,envmap_fragment:eb,envmap_common_pars_fragment:nb,envmap_pars_fragment:ib,envmap_pars_vertex:ab,envmap_physical_pars_fragment:mb,envmap_vertex:sb,fog_vertex:rb,fog_pars_vertex:ob,fog_fragment:lb,fog_pars_fragment:ub,gradientmap_pars_fragment:cb,lightmap_pars_fragment:fb,lights_lambert_fragment:hb,lights_lambert_pars_fragment:db,lights_pars_begin:pb,lights_toon_fragment:gb,lights_toon_pars_fragment:_b,lights_phong_fragment:vb,lights_phong_pars_fragment:xb,lights_physical_fragment:Sb,lights_physical_pars_fragment:yb,lights_fragment_begin:Mb,lights_fragment_maps:Eb,lights_fragment_end:Tb,logdepthbuf_fragment:bb,logdepthbuf_pars_fragment:Ab,logdepthbuf_pars_vertex:Rb,logdepthbuf_vertex:Cb,map_fragment:Db,map_pars_fragment:wb,map_particle_fragment:Ub,map_particle_pars_fragment:Nb,metalnessmap_fragment:Lb,metalnessmap_pars_fragment:Ob,morphinstance_vertex:Pb,morphcolor_vertex:zb,morphnormal_vertex:Ib,morphtarget_pars_vertex:Bb,morphtarget_vertex:Fb,normal_fragment_begin:Hb,normal_fragment_maps:Gb,normal_pars_fragment:Vb,normal_pars_vertex:kb,normal_vertex:Xb,normalmap_pars_fragment:qb,clearcoat_normal_fragment_begin:Yb,clearcoat_normal_fragment_maps:Wb,clearcoat_pars_fragment:jb,iridescence_pars_fragment:Zb,opaque_fragment:Kb,packing:Qb,premultiplied_alpha_fragment:Jb,project_vertex:$b,dithering_fragment:t1,dithering_pars_fragment:e1,roughnessmap_fragment:n1,roughnessmap_pars_fragment:i1,shadowmap_pars_fragment:a1,shadowmap_pars_vertex:s1,shadowmap_vertex:r1,shadowmask_pars_fragment:o1,skinbase_vertex:l1,skinning_pars_vertex:u1,skinning_vertex:c1,skinnormal_vertex:f1,specularmap_fragment:h1,specularmap_pars_fragment:d1,tonemapping_fragment:p1,tonemapping_pars_fragment:m1,transmission_fragment:g1,transmission_pars_fragment:_1,uv_pars_fragment:v1,uv_pars_vertex:x1,uv_vertex:S1,worldpos_vertex:y1,background_vert:M1,background_frag:E1,backgroundCube_vert:T1,backgroundCube_frag:b1,cube_vert:A1,cube_frag:R1,depth_vert:C1,depth_frag:D1,distanceRGBA_vert:w1,distanceRGBA_frag:U1,equirect_vert:N1,equirect_frag:L1,linedashed_vert:O1,linedashed_frag:P1,meshbasic_vert:z1,meshbasic_frag:I1,meshlambert_vert:B1,meshlambert_frag:F1,meshmatcap_vert:H1,meshmatcap_frag:G1,meshnormal_vert:V1,meshnormal_frag:k1,meshphong_vert:X1,meshphong_frag:q1,meshphysical_vert:Y1,meshphysical_frag:W1,meshtoon_vert:j1,meshtoon_frag:Z1,points_vert:K1,points_frag:Q1,shadow_vert:J1,shadow_frag:$1,sprite_vert:tA,sprite_frag:eA},Nt={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},Qi={basic:{uniforms:Xn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:Xn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:Xn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:Xn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:Xn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:Xn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:Xn([Nt.points,Nt.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:Xn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:Xn([Nt.common,Nt.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:Xn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:Xn([Nt.sprite,Nt.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:Xn([Nt.common,Nt.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:Xn([Nt.lights,Nt.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};Qi.physical={uniforms:Xn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};const gc={r:0,b:0,g:0},Xs=new Da,nA=new fn;function iA(o,e,i,r,u,f,h){const d=new He(0);let p=f===!0?0:1,_,v,m=null,x=0,M=null;function A(z){let N=z.isScene===!0?z.background:null;return N&&N.isTexture&&(N=(z.backgroundBlurriness>0?i:e).get(N)),N}function D(z){let N=!1;const K=A(z);K===null?S(d,p):K&&K.isColor&&(S(K,1),N=!0);const V=o.xr.getEnvironmentBlendMode();V==="additive"?r.buffers.color.setClear(0,0,0,1,h):V==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(o.autoClear||N)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function y(z,N){const K=A(N);K&&(K.isCubeTexture||K.mapping===Dc)?(v===void 0&&(v=new Ji(new Rl(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:So(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(V,P,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),u.update(v)),Xs.copy(N.backgroundRotation),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,K.isCubeTexture&&K.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),v.material.uniforms.envMap.value=K,v.material.uniforms.flipEnvMap.value=K.isCubeTexture&&K.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(nA.makeRotationFromEuler(Xs)),v.material.toneMapped=we.getTransfer(K.colorSpace)!==Be,(m!==K||x!==K.version||M!==o.toneMapping)&&(v.material.needsUpdate=!0,m=K,x=K.version,M=o.toneMapping),v.layers.enableAll(),z.unshift(v,v.geometry,v.material,0,0,null)):K&&K.isTexture&&(_===void 0&&(_=new Ji(new Uc(2,2),new ui({name:"BackgroundMaterial",uniforms:So(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:ds,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),Object.defineProperty(_.material,"map",{get:function(){return this.uniforms.t2D.value}}),u.update(_)),_.material.uniforms.t2D.value=K,_.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,_.material.toneMapped=we.getTransfer(K.colorSpace)!==Be,K.matrixAutoUpdate===!0&&K.updateMatrix(),_.material.uniforms.uvTransform.value.copy(K.matrix),(m!==K||x!==K.version||M!==o.toneMapping)&&(_.material.needsUpdate=!0,m=K,x=K.version,M=o.toneMapping),_.layers.enableAll(),z.unshift(_,_.geometry,_.material,0,0,null))}function S(z,N){z.getRGB(gc,wx(o)),r.buffers.color.setClear(gc.r,gc.g,gc.b,N,h)}function I(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0)}return{getClearColor:function(){return d},setClearColor:function(z,N=1){d.set(z),p=N,S(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(z){p=z,S(d,p)},render:D,addToRenderList:y,dispose:I}}function aA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),r={},u=x(null);let f=u,h=!1;function d(E,L,Q,J,lt){let ut=!1;const H=m(J,Q,L);f!==H&&(f=H,_(f.object)),ut=M(E,J,Q,lt),ut&&A(E,J,Q,lt),lt!==null&&e.update(lt,o.ELEMENT_ARRAY_BUFFER),(ut||h)&&(h=!1,N(E,L,Q,J),lt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(lt).buffer))}function p(){return o.createVertexArray()}function _(E){return o.bindVertexArray(E)}function v(E){return o.deleteVertexArray(E)}function m(E,L,Q){const J=Q.wireframe===!0;let lt=r[E.id];lt===void 0&&(lt={},r[E.id]=lt);let ut=lt[L.id];ut===void 0&&(ut={},lt[L.id]=ut);let H=ut[J];return H===void 0&&(H=x(p()),ut[J]=H),H}function x(E){const L=[],Q=[],J=[];for(let lt=0;lt<i;lt++)L[lt]=0,Q[lt]=0,J[lt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:Q,attributeDivisors:J,object:E,attributes:{},index:null}}function M(E,L,Q,J){const lt=f.attributes,ut=L.attributes;let H=0;const rt=Q.getAttributes();for(const $ in rt)if(rt[$].location>=0){const yt=lt[$];let Gt=ut[$];if(Gt===void 0&&($==="instanceMatrix"&&E.instanceMatrix&&(Gt=E.instanceMatrix),$==="instanceColor"&&E.instanceColor&&(Gt=E.instanceColor)),yt===void 0||yt.attribute!==Gt||Gt&&yt.data!==Gt.data)return!0;H++}return f.attributesNum!==H||f.index!==J}function A(E,L,Q,J){const lt={},ut=L.attributes;let H=0;const rt=Q.getAttributes();for(const $ in rt)if(rt[$].location>=0){let yt=ut[$];yt===void 0&&($==="instanceMatrix"&&E.instanceMatrix&&(yt=E.instanceMatrix),$==="instanceColor"&&E.instanceColor&&(yt=E.instanceColor));const Gt={};Gt.attribute=yt,yt&&yt.data&&(Gt.data=yt.data),lt[$]=Gt,H++}f.attributes=lt,f.attributesNum=H,f.index=J}function D(){const E=f.newAttributes;for(let L=0,Q=E.length;L<Q;L++)E[L]=0}function y(E){S(E,0)}function S(E,L){const Q=f.newAttributes,J=f.enabledAttributes,lt=f.attributeDivisors;Q[E]=1,J[E]===0&&(o.enableVertexAttribArray(E),J[E]=1),lt[E]!==L&&(o.vertexAttribDivisor(E,L),lt[E]=L)}function I(){const E=f.newAttributes,L=f.enabledAttributes;for(let Q=0,J=L.length;Q<J;Q++)L[Q]!==E[Q]&&(o.disableVertexAttribArray(Q),L[Q]=0)}function z(E,L,Q,J,lt,ut,H){H===!0?o.vertexAttribIPointer(E,L,Q,lt,ut):o.vertexAttribPointer(E,L,Q,J,lt,ut)}function N(E,L,Q,J){D();const lt=J.attributes,ut=Q.getAttributes(),H=L.defaultAttributeValues;for(const rt in ut){const $=ut[rt];if($.location>=0){let xt=lt[rt];if(xt===void 0&&(rt==="instanceMatrix"&&E.instanceMatrix&&(xt=E.instanceMatrix),rt==="instanceColor"&&E.instanceColor&&(xt=E.instanceColor)),xt!==void 0){const yt=xt.normalized,Gt=xt.itemSize,ee=e.get(xt);if(ee===void 0)continue;const Te=ee.buffer,C=ee.type,j=ee.bytesPerElement,mt=C===o.INT||C===o.UNSIGNED_INT||xt.gpuType===Np;if(xt.isInterleavedBufferAttribute){const ft=xt.data,bt=ft.stride,kt=xt.offset;if(ft.isInstancedInterleavedBuffer){for(let wt=0;wt<$.locationSize;wt++)S($.location+wt,ft.meshPerAttribute);E.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let wt=0;wt<$.locationSize;wt++)y($.location+wt);o.bindBuffer(o.ARRAY_BUFFER,Te);for(let wt=0;wt<$.locationSize;wt++)z($.location+wt,Gt/$.locationSize,C,yt,bt*j,(kt+Gt/$.locationSize*wt)*j,mt)}else{if(xt.isInstancedBufferAttribute){for(let ft=0;ft<$.locationSize;ft++)S($.location+ft,xt.meshPerAttribute);E.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let ft=0;ft<$.locationSize;ft++)y($.location+ft);o.bindBuffer(o.ARRAY_BUFFER,Te);for(let ft=0;ft<$.locationSize;ft++)z($.location+ft,Gt/$.locationSize,C,yt,Gt*j,Gt/$.locationSize*ft*j,mt)}}else if(H!==void 0){const yt=H[rt];if(yt!==void 0)switch(yt.length){case 2:o.vertexAttrib2fv($.location,yt);break;case 3:o.vertexAttrib3fv($.location,yt);break;case 4:o.vertexAttrib4fv($.location,yt);break;default:o.vertexAttrib1fv($.location,yt)}}}}I()}function K(){k();for(const E in r){const L=r[E];for(const Q in L){const J=L[Q];for(const lt in J)v(J[lt].object),delete J[lt];delete L[Q]}delete r[E]}}function V(E){if(r[E.id]===void 0)return;const L=r[E.id];for(const Q in L){const J=L[Q];for(const lt in J)v(J[lt].object),delete J[lt];delete L[Q]}delete r[E.id]}function P(E){for(const L in r){const Q=r[L];if(Q[E.id]===void 0)continue;const J=Q[E.id];for(const lt in J)v(J[lt].object),delete J[lt];delete Q[E.id]}}function k(){w(),h=!0,f!==u&&(f=u,_(f.object))}function w(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:d,reset:k,resetDefaultState:w,dispose:K,releaseStatesOfGeometry:V,releaseStatesOfProgram:P,initAttributes:D,enableAttribute:y,disableUnusedAttributes:I}}function sA(o,e,i){let r;function u(_){r=_}function f(_,v){o.drawArrays(r,_,v),i.update(v,r,1)}function h(_,v,m){m!==0&&(o.drawArraysInstanced(r,_,v,m),i.update(v,r,m))}function d(_,v,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,_,0,v,0,m);let M=0;for(let A=0;A<m;A++)M+=v[A];i.update(M,r,1)}function p(_,v,m,x){if(m===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let A=0;A<_.length;A++)h(_[A],v[A],x[A]);else{M.multiDrawArraysInstancedWEBGL(r,_,0,v,0,x,0,m);let A=0;for(let D=0;D<m;D++)A+=v[D]*x[D];i.update(A,r,1)}}this.setMode=u,this.render=f,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function rA(o,e,i,r){let u;function f(){if(u!==void 0)return u;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");u=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else u=0;return u}function h(P){return!(P!==ci&&r.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const k=P===tr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Ai&&r.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ba&&!k)}function p(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let _=i.precision!==void 0?i.precision:"highp";const v=p(_);v!==_&&(console.warn("THREE.WebGLRenderer:",_,"not supported, using",v,"instead."),_=v);const m=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),A=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),S=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),z=o.getParameter(o.MAX_VARYING_VECTORS),N=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),K=A>0,V=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:_,logarithmicDepthBuffer:m,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:A,maxTextureSize:D,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:I,maxVaryings:z,maxFragmentUniforms:N,vertexTextures:K,maxSamples:V}}function oA(o){const e=this;let i=null,r=0,u=!1,f=!1;const h=new cs,d=new fe,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(m,x){const M=m.length!==0||x||r!==0||u;return u=x,r=m.length,M},this.beginShadows=function(){f=!0,v(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(m,x){i=v(m,x,0)},this.setState=function(m,x,M){const A=m.clippingPlanes,D=m.clipIntersection,y=m.clipShadows,S=o.get(m);if(!u||A===null||A.length===0||f&&!y)f?v(null):_();else{const I=f?0:r,z=I*4;let N=S.clippingState||null;p.value=N,N=v(A,x,z,M);for(let K=0;K!==z;++K)N[K]=i[K];S.clippingState=N,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=I}};function _(){p.value!==i&&(p.value=i,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(m,x,M,A){const D=m!==null?m.length:0;let y=null;if(D!==0){if(y=p.value,A!==!0||y===null){const S=M+D*4,I=x.matrixWorldInverse;d.getNormalMatrix(I),(y===null||y.length<S)&&(y=new Float32Array(S));for(let z=0,N=M;z!==D;++z,N+=4)h.copy(m[z]).applyMatrix4(I,d),h.normal.toArray(y,N),y[N+3]=h.constant}p.value=y,p.needsUpdate=!0}return e.numPlanes=D,e.numIntersection=0,y}}function lA(o){let e=new WeakMap;function i(h,d){return d===$d?h.mapping=go:d===tp&&(h.mapping=_o),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===$d||d===tp)if(e.has(h)){const p=e.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const _=new fT(p.height);return _.fromEquirectangularTexture(o,h),e.set(h,_),h.addEventListener("dispose",u),i(_.texture,h.mapping)}else return null}}return h}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){e=new WeakMap}return{get:r,dispose:f}}const so=4,Pv=[.125,.215,.35,.446,.526,.582],Zs=20,Od=new Px,zv=new He;let Pd=null,zd=0,Id=0,Bd=!1;const Ws=(1+Math.sqrt(5))/2,no=1/Ws,Iv=[new nt(-Ws,no,0),new nt(Ws,no,0),new nt(-no,0,Ws),new nt(no,0,Ws),new nt(0,Ws,-no),new nt(0,Ws,no),new nt(-1,1,-1),new nt(1,1,-1),new nt(-1,1,1),new nt(1,1,1)],uA=new nt;class Bv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,r=.1,u=100,f={}){const{size:h=256,position:d=uA}=f;Pd=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Id=this._renderer.getActiveMipmapLevel(),Bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,r,u,p,d),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pd,zd,Id),this._renderer.xr.enabled=Bd,e.scissorTest=!1,_c(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===go||e.mapping===_o?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pd=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Id=this._renderer.getActiveMipmapLevel(),Bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:bi,minFilter:bi,generateMipmaps:!1,type:tr,format:ci,colorSpace:er,depthBuffer:!1},u=Fv(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fv(e,i,r);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cA(f)),this._blurMaterial=fA(f,e,i)}return u}_compileMaterial(e){const i=new Ji(this._lodPlanes[0],e);this._renderer.compile(i,Od)}_sceneToCubeUV(e,i,r,u,f){const p=new Ti(90,1,i,r),_=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],m=this._renderer,x=m.autoClear,M=m.toneMapping;m.getClearColor(zv),m.toneMapping=Ra,m.autoClear=!1;const A=new Rx({name:"PMREM.Background",side:Jn,depthWrite:!1,depthTest:!1}),D=new Ji(new Rl,A);let y=!1;const S=e.background;S?S.isColor&&(A.color.copy(S),e.background=null,y=!0):(A.color.copy(zv),y=!0);for(let I=0;I<6;I++){const z=I%3;z===0?(p.up.set(0,_[I],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+v[I],f.y,f.z)):z===1?(p.up.set(0,0,_[I]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+v[I],f.z)):(p.up.set(0,_[I],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+v[I]));const N=this._cubeSize;_c(u,z*N,I>2?N:0,N,N),m.setRenderTarget(u),y&&m.render(D,p),m.render(e,p)}D.geometry.dispose(),D.material.dispose(),m.toneMapping=M,m.autoClear=x,e.background=S}_textureToCubeUV(e,i){const r=this._renderer,u=e.mapping===go||e.mapping===_o;u?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hv());const f=u?this._cubemapMaterial:this._equirectMaterial,h=new Ji(this._lodPlanes[0],f),d=f.uniforms;d.envMap.value=e;const p=this._cubeSize;_c(i,0,0,3*p,2*p),r.setRenderTarget(i),r.render(h,Od)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const u=this._lodPlanes.length;for(let f=1;f<u;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),d=Iv[(u-f-1)%Iv.length];this._blur(e,f-1,f,h,d)}i.autoClear=r}_blur(e,i,r,u,f){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,u,"latitudinal",f),this._halfBlur(h,e,r,r,u,"longitudinal",f)}_halfBlur(e,i,r,u,f,h,d){const p=this._renderer,_=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,m=new Ji(this._lodPlanes[u],_),x=_.uniforms,M=this._sizeLods[r]-1,A=isFinite(f)?Math.PI/(2*M):2*Math.PI/(2*Zs-1),D=f/A,y=isFinite(f)?1+Math.floor(v*D):Zs;y>Zs&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Zs}`);const S=[];let I=0;for(let P=0;P<Zs;++P){const k=P/D,w=Math.exp(-k*k/2);S.push(w),P===0?I+=w:P<y&&(I+=2*w)}for(let P=0;P<S.length;P++)S[P]=S[P]/I;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=S,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:z}=this;x.dTheta.value=A,x.mipInt.value=z-r;const N=this._sizeLods[u],K=3*N*(u>z-so?u-z+so:0),V=4*(this._cubeSize-N);_c(i,K,V,3*N,2*N),p.setRenderTarget(i),p.render(m,Od)}}function cA(o){const e=[],i=[],r=[];let u=o;const f=o-so+1+Pv.length;for(let h=0;h<f;h++){const d=Math.pow(2,u);i.push(d);let p=1/d;h>o-so?p=Pv[h-o+so-1]:h===0&&(p=0),r.push(p);const _=1/(d-2),v=-_,m=1+_,x=[v,v,m,v,m,m,v,v,m,m,v,m],M=6,A=6,D=3,y=2,S=1,I=new Float32Array(D*A*M),z=new Float32Array(y*A*M),N=new Float32Array(S*A*M);for(let V=0;V<M;V++){const P=V%3*2/3-1,k=V>2?0:-1,w=[P,k,0,P+2/3,k,0,P+2/3,k+1,0,P,k,0,P+2/3,k+1,0,P,k+1,0];I.set(w,D*A*V),z.set(x,y*A*V);const E=[V,V,V,V,V,V];N.set(E,S*A*V)}const K=new gs;K.setAttribute("position",new Ri(I,D)),K.setAttribute("uv",new Ri(z,y)),K.setAttribute("faceIndex",new Ri(N,S)),e.push(K),u>so&&u--}return{lodPlanes:e,sizeLods:i,sigmas:r}}function Fv(o,e,i){const r=new ps(o,e,i);return r.texture.mapping=Dc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function _c(o,e,i,r,u){o.viewport.set(e,i,r,u),o.scissor.set(e,i,r,u)}function fA(o,e,i){const r=new Float32Array(Zs),u=new nt(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:Zs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Gp(),fragmentShader:`

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
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Hv(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gp(),fragmentShader:`

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
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Gv(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Gp(){return`

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
	`}function hA(o){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const p=d.mapping,_=p===$d||p===tp,v=p===go||p===_o;if(_||v){let m=e.get(d);const x=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new Bv(o)),m=_?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const M=d.image;return _&&M&&M.height>0||v&&M&&u(M)?(i===null&&(i=new Bv(o)),m=_?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",f),m.texture):null}}}return d}function u(d){let p=0;const _=6;for(let v=0;v<_;v++)d[v]!==void 0&&p++;return p===_}function f(d){const p=d.target;p.removeEventListener("dispose",f);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function dA(o){const e={};function i(r){if(e[r]!==void 0)return e[r];let u;switch(r){case"WEBGL_depth_texture":u=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":u=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":u=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":u=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:u=o.getExtension(r)}return e[r]=u,u}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const u=i(r);return u===null&&Ys("THREE.WebGLRenderer: "+r+" extension not supported."),u}}}function pA(o,e,i,r){const u={},f=new WeakMap;function h(m){const x=m.target;x.index!==null&&e.remove(x.index);for(const A in x.attributes)e.remove(x.attributes[A]);x.removeEventListener("dispose",h),delete u[x.id];const M=f.get(x);M&&(e.remove(M),f.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(m,x){return u[x.id]===!0||(x.addEventListener("dispose",h),u[x.id]=!0,i.memory.geometries++),x}function p(m){const x=m.attributes;for(const M in x)e.update(x[M],o.ARRAY_BUFFER)}function _(m){const x=[],M=m.index,A=m.attributes.position;let D=0;if(M!==null){const I=M.array;D=M.version;for(let z=0,N=I.length;z<N;z+=3){const K=I[z+0],V=I[z+1],P=I[z+2];x.push(K,V,V,P,P,K)}}else if(A!==void 0){const I=A.array;D=A.version;for(let z=0,N=I.length/3-1;z<N;z+=3){const K=z+0,V=z+1,P=z+2;x.push(K,V,V,P,P,K)}}else return;const y=new(Mx(x)?Dx:Cx)(x,1);y.version=D;const S=f.get(m);S&&e.remove(S),f.set(m,y)}function v(m){const x=f.get(m);if(x){const M=m.index;M!==null&&x.version<M.version&&_(m)}else _(m);return f.get(m)}return{get:d,update:p,getWireframeAttribute:v}}function mA(o,e,i){let r;function u(x){r=x}let f,h;function d(x){f=x.type,h=x.bytesPerElement}function p(x,M){o.drawElements(r,M,f,x*h),i.update(M,r,1)}function _(x,M,A){A!==0&&(o.drawElementsInstanced(r,M,f,x*h,A),i.update(M,r,A))}function v(x,M,A){if(A===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,f,x,0,A);let y=0;for(let S=0;S<A;S++)y+=M[S];i.update(y,r,1)}function m(x,M,A,D){if(A===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let S=0;S<x.length;S++)_(x[S]/h,M[S],D[S]);else{y.multiDrawElementsInstancedWEBGL(r,M,0,f,x,0,D,0,A);let S=0;for(let I=0;I<A;I++)S+=M[I]*D[I];i.update(S,r,1)}}this.setMode=u,this.setIndex=d,this.render=p,this.renderInstances=_,this.renderMultiDraw=v,this.renderMultiDrawInstances=m}function gA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function u(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:u,update:r}}function _A(o,e,i){const r=new WeakMap,u=new an;function f(h,d,p){const _=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,m=v!==void 0?v.length:0;let x=r.get(d);if(x===void 0||x.count!==m){let E=function(){k.dispose(),r.delete(d),d.removeEventListener("dispose",E)};var M=E;x!==void 0&&x.texture.dispose();const A=d.morphAttributes.position!==void 0,D=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,S=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let N=0;A===!0&&(N=1),D===!0&&(N=2),y===!0&&(N=3);let K=d.attributes.position.count*N,V=1;K>e.maxTextureSize&&(V=Math.ceil(K/e.maxTextureSize),K=e.maxTextureSize);const P=new Float32Array(K*V*4*m),k=new Ex(P,K,V,m);k.type=ba,k.needsUpdate=!0;const w=N*4;for(let L=0;L<m;L++){const Q=S[L],J=I[L],lt=z[L],ut=K*V*4*L;for(let H=0;H<Q.count;H++){const rt=H*w;A===!0&&(u.fromBufferAttribute(Q,H),P[ut+rt+0]=u.x,P[ut+rt+1]=u.y,P[ut+rt+2]=u.z,P[ut+rt+3]=0),D===!0&&(u.fromBufferAttribute(J,H),P[ut+rt+4]=u.x,P[ut+rt+5]=u.y,P[ut+rt+6]=u.z,P[ut+rt+7]=0),y===!0&&(u.fromBufferAttribute(lt,H),P[ut+rt+8]=u.x,P[ut+rt+9]=u.y,P[ut+rt+10]=u.z,P[ut+rt+11]=lt.itemSize===4?u.w:1)}}x={count:m,texture:k,size:new oe(K,V)},r.set(d,x),d.addEventListener("dispose",E)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let A=0;for(let y=0;y<_.length;y++)A+=_[y];const D=d.morphTargetsRelative?1:1-A;p.getUniforms().setValue(o,"morphTargetBaseInfluence",D),p.getUniforms().setValue(o,"morphTargetInfluences",_)}p.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:f}}function vA(o,e,i,r){let u=new WeakMap;function f(p){const _=r.render.frame,v=p.geometry,m=e.get(p,v);if(u.get(m)!==_&&(e.update(m),u.set(m,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),u.get(p)!==_&&(i.update(p.instanceMatrix,o.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,o.ARRAY_BUFFER),u.set(p,_))),p.isSkinnedMesh){const x=p.skeleton;u.get(x)!==_&&(x.update(),u.set(x,_))}return m}function h(){u=new WeakMap}function d(p){const _=p.target;_.removeEventListener("dispose",d),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:h}}const Ix=new qn,Vv=new Ox(1,1),Bx=new Ex,Fx=new jE,Hx=new Nx,kv=[],Xv=[],qv=new Float32Array(16),Yv=new Float32Array(9),Wv=new Float32Array(4);function Mo(o,e,i){const r=o[0];if(r<=0||r>0)return o;const u=e*i;let f=kv[u];if(f===void 0&&(f=new Float32Array(u),kv[u]=f),e!==0){r.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function gn(o,e){if(o.length!==e.length)return!1;for(let i=0,r=o.length;i<r;i++)if(o[i]!==e[i])return!1;return!0}function _n(o,e){for(let i=0,r=e.length;i<r;i++)o[i]=e[i]}function Nc(o,e){let i=Xv[e];i===void 0&&(i=new Int32Array(e),Xv[e]=i);for(let r=0;r!==e;++r)i[r]=o.allocateTextureUnit();return i}function xA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function SA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2fv(this.addr,e),_n(i,e)}}function yA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(gn(i,e))return;o.uniform3fv(this.addr,e),_n(i,e)}}function MA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4fv(this.addr,e),_n(i,e)}}function EA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(gn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),_n(i,e)}else{if(gn(i,r))return;Wv.set(r),o.uniformMatrix2fv(this.addr,!1,Wv),_n(i,r)}}function TA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(gn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),_n(i,e)}else{if(gn(i,r))return;Yv.set(r),o.uniformMatrix3fv(this.addr,!1,Yv),_n(i,r)}}function bA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(gn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),_n(i,e)}else{if(gn(i,r))return;qv.set(r),o.uniformMatrix4fv(this.addr,!1,qv),_n(i,r)}}function AA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function RA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2iv(this.addr,e),_n(i,e)}}function CA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gn(i,e))return;o.uniform3iv(this.addr,e),_n(i,e)}}function DA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4iv(this.addr,e),_n(i,e)}}function wA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function UA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2uiv(this.addr,e),_n(i,e)}}function NA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gn(i,e))return;o.uniform3uiv(this.addr,e),_n(i,e)}}function LA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4uiv(this.addr,e),_n(i,e)}}function OA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u);let f;this.type===o.SAMPLER_2D_SHADOW?(Vv.compareFunction=yx,f=Vv):f=Ix,i.setTexture2D(e||f,u)}function PA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTexture3D(e||Fx,u)}function zA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTextureCube(e||Hx,u)}function IA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTexture2DArray(e||Bx,u)}function BA(o){switch(o){case 5126:return xA;case 35664:return SA;case 35665:return yA;case 35666:return MA;case 35674:return EA;case 35675:return TA;case 35676:return bA;case 5124:case 35670:return AA;case 35667:case 35671:return RA;case 35668:case 35672:return CA;case 35669:case 35673:return DA;case 5125:return wA;case 36294:return UA;case 36295:return NA;case 36296:return LA;case 35678:case 36198:case 36298:case 36306:case 35682:return OA;case 35679:case 36299:case 36307:return PA;case 35680:case 36300:case 36308:case 36293:return zA;case 36289:case 36303:case 36311:case 36292:return IA}}function FA(o,e){o.uniform1fv(this.addr,e)}function HA(o,e){const i=Mo(e,this.size,2);o.uniform2fv(this.addr,i)}function GA(o,e){const i=Mo(e,this.size,3);o.uniform3fv(this.addr,i)}function VA(o,e){const i=Mo(e,this.size,4);o.uniform4fv(this.addr,i)}function kA(o,e){const i=Mo(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function XA(o,e){const i=Mo(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function qA(o,e){const i=Mo(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function YA(o,e){o.uniform1iv(this.addr,e)}function WA(o,e){o.uniform2iv(this.addr,e)}function jA(o,e){o.uniform3iv(this.addr,e)}function ZA(o,e){o.uniform4iv(this.addr,e)}function KA(o,e){o.uniform1uiv(this.addr,e)}function QA(o,e){o.uniform2uiv(this.addr,e)}function JA(o,e){o.uniform3uiv(this.addr,e)}function $A(o,e){o.uniform4uiv(this.addr,e)}function tR(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);gn(r,f)||(o.uniform1iv(this.addr,f),_n(r,f));for(let h=0;h!==u;++h)i.setTexture2D(e[h]||Ix,f[h])}function eR(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);gn(r,f)||(o.uniform1iv(this.addr,f),_n(r,f));for(let h=0;h!==u;++h)i.setTexture3D(e[h]||Fx,f[h])}function nR(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);gn(r,f)||(o.uniform1iv(this.addr,f),_n(r,f));for(let h=0;h!==u;++h)i.setTextureCube(e[h]||Hx,f[h])}function iR(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);gn(r,f)||(o.uniform1iv(this.addr,f),_n(r,f));for(let h=0;h!==u;++h)i.setTexture2DArray(e[h]||Bx,f[h])}function aR(o){switch(o){case 5126:return FA;case 35664:return HA;case 35665:return GA;case 35666:return VA;case 35674:return kA;case 35675:return XA;case 35676:return qA;case 5124:case 35670:return YA;case 35667:case 35671:return WA;case 35668:case 35672:return jA;case 35669:case 35673:return ZA;case 5125:return KA;case 36294:return QA;case 36295:return JA;case 36296:return $A;case 35678:case 36198:case 36298:case 36306:case 35682:return tR;case 35679:case 36299:case 36307:return eR;case 35680:case 36300:case 36308:case 36293:return nR;case 36289:case 36303:case 36311:case 36292:return iR}}class sR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=BA(i.type)}}class rR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=aR(i.type)}}class oR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const u=this.seq;for(let f=0,h=u.length;f!==h;++f){const d=u[f];d.setValue(e,i[d.id],r)}}}const Fd=/(\w+)(\])?(\[|\.)?/g;function jv(o,e){o.seq.push(e),o.map[e.id]=e}function lR(o,e,i){const r=o.name,u=r.length;for(Fd.lastIndex=0;;){const f=Fd.exec(r),h=Fd.lastIndex;let d=f[1];const p=f[2]==="]",_=f[3];if(p&&(d=d|0),_===void 0||_==="["&&h+2===u){jv(i,_===void 0?new sR(d,o,e):new rR(d,o,e));break}else{let m=i.map[d];m===void 0&&(m=new oR(d),jv(i,m)),i=m}}}class bc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let u=0;u<r;++u){const f=e.getActiveUniform(i,u),h=e.getUniformLocation(i,f.name);lR(f,h,this)}}setValue(e,i,r,u){const f=this.map[i];f!==void 0&&f.setValue(e,r,u)}setOptional(e,i,r){const u=i[r];u!==void 0&&this.setValue(e,r,u)}static upload(e,i,r,u){for(let f=0,h=i.length;f!==h;++f){const d=i[f],p=r[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,u)}}static seqWithValue(e,i){const r=[];for(let u=0,f=e.length;u!==f;++u){const h=e[u];h.id in i&&r.push(h)}return r}}function Zv(o,e,i){const r=o.createShader(e);return o.shaderSource(r,i),o.compileShader(r),r}const uR=37297;let cR=0;function fR(o,e){const i=o.split(`
`),r=[],u=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=u;h<f;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const Kv=new fe;function hR(o){we._getMatrix(Kv,we.workingColorSpace,o);const e=`mat3( ${Kv.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(o)){case Ac:return[e,"LinearTransferOETF"];case Be:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function Qv(o,e,i){const r=o.getShaderParameter(e,o.COMPILE_STATUS),u=o.getShaderInfoLog(e).trim();if(r&&u==="")return"";const f=/ERROR: 0:(\d+)/.exec(u);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+u+`

`+fR(o.getShaderSource(e),h)}else return u}function dR(o,e){const i=hR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function pR(o,e){let i;switch(e){case aE:i="Linear";break;case sE:i="Reinhard";break;case rE:i="Cineon";break;case oE:i="ACESFilmic";break;case uE:i="AgX";break;case cE:i="Neutral";break;case lE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const vc=new nt;function mR(){we.getLuminanceCoefficients(vc);const o=vc.x.toFixed(4),e=vc.y.toFixed(4),i=vc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yl).join(`
`)}function _R(o){const e=[];for(const i in o){const r=o[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function vR(o,e){const i={},r=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let u=0;u<r;u++){const f=o.getActiveAttrib(e,u),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function yl(o){return o!==""}function Jv(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $v(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dp(o){return o.replace(xR,yR)}const SR=new Map;function yR(o,e){let i=he[e];if(i===void 0){const r=SR.get(e);if(r!==void 0)i=he[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Dp(i)}const MR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tx(o){return o.replace(MR,ER)}function ER(o,e,i,r){let u="";for(let f=parseInt(e);f<parseInt(i);f++)u+=r.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return u}function ex(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function TR(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===lx?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===IM?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ma&&(e="SHADOWMAP_TYPE_VSM"),e}function bR(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case go:case _o:e="ENVMAP_TYPE_CUBE";break;case Dc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function AR(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case _o:e="ENVMAP_MODE_REFRACTION";break}return e}function RR(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case ux:e="ENVMAP_BLENDING_MULTIPLY";break;case nE:e="ENVMAP_BLENDING_MIX";break;case iE:e="ENVMAP_BLENDING_ADD";break}return e}function CR(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function DR(o,e,i,r){const u=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=TR(i),_=bR(i),v=AR(i),m=RR(i),x=CR(i),M=gR(i),A=_R(f),D=u.createProgram();let y,S,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(yl).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(yl).join(`
`),S.length>0&&(S+=`
`)):(y=[ex(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yl).join(`
`),S=[ex(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",i.envMap?"#define "+m:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ra?"#define TONE_MAPPING":"",i.toneMapping!==Ra?he.tonemapping_pars_fragment:"",i.toneMapping!==Ra?pR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",he.colorspace_pars_fragment,dR("linearToOutputTexel",i.outputColorSpace),mR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(yl).join(`
`)),h=Dp(h),h=Jv(h,i),h=$v(h,i),d=Dp(d),d=Jv(d,i),d=$v(d,i),h=tx(h),d=tx(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",i.glslVersion===pv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===pv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const z=I+y+h,N=I+S+d,K=Zv(u,u.VERTEX_SHADER,z),V=Zv(u,u.FRAGMENT_SHADER,N);u.attachShader(D,K),u.attachShader(D,V),i.index0AttributeName!==void 0?u.bindAttribLocation(D,0,i.index0AttributeName):i.morphTargets===!0&&u.bindAttribLocation(D,0,"position"),u.linkProgram(D);function P(L){if(o.debug.checkShaderErrors){const Q=u.getProgramInfoLog(D).trim(),J=u.getShaderInfoLog(K).trim(),lt=u.getShaderInfoLog(V).trim();let ut=!0,H=!0;if(u.getProgramParameter(D,u.LINK_STATUS)===!1)if(ut=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(u,D,K,V);else{const rt=Qv(u,K,"vertex"),$=Qv(u,V,"fragment");console.error("THREE.WebGLProgram: Shader Error "+u.getError()+" - VALIDATE_STATUS "+u.getProgramParameter(D,u.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+Q+`
`+rt+`
`+$)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(J===""||lt==="")&&(H=!1);H&&(L.diagnostics={runnable:ut,programLog:Q,vertexShader:{log:J,prefix:y},fragmentShader:{log:lt,prefix:S}})}u.deleteShader(K),u.deleteShader(V),k=new bc(u,D),w=vR(u,D)}let k;this.getUniforms=function(){return k===void 0&&P(this),k};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let E=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=u.getProgramParameter(D,uR)),E},this.destroy=function(){r.releaseStatesOfProgram(this),u.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=cR++,this.cacheKey=e,this.usedTimes=1,this.program=D,this.vertexShader=K,this.fragmentShader=V,this}let wR=0;class UR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,u=this._getShaderStage(i),f=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(u)===!1&&(h.add(u),u.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new NR(e),i.set(e,r)),r}}class NR{constructor(e){this.id=wR++,this.code=e,this.usedTimes=0}}function LR(o,e,i,r,u,f,h){const d=new bx,p=new UR,_=new Set,v=[],m=u.logarithmicDepthBuffer,x=u.vertexTextures;let M=u.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function D(w){return _.add(w),w===0?"uv":`uv${w}`}function y(w,E,L,Q,J){const lt=Q.fog,ut=J.geometry,H=w.isMeshStandardMaterial?Q.environment:null,rt=(w.isMeshStandardMaterial?i:e).get(w.envMap||H),$=rt&&rt.mapping===Dc?rt.image.height:null,xt=A[w.type];w.precision!==null&&(M=u.getMaxPrecision(w.precision),M!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const yt=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,Gt=yt!==void 0?yt.length:0;let ee=0;ut.morphAttributes.position!==void 0&&(ee=1),ut.morphAttributes.normal!==void 0&&(ee=2),ut.morphAttributes.color!==void 0&&(ee=3);let Te,C,j,mt;if(xt){const be=Qi[xt];Te=be.vertexShader,C=be.fragmentShader}else Te=w.vertexShader,C=w.fragmentShader,p.update(w),j=p.getVertexShaderID(w),mt=p.getFragmentShaderID(w);const ft=o.getRenderTarget(),bt=o.state.buffers.depth.getReversed(),kt=J.isInstancedMesh===!0,wt=J.isBatchedMesh===!0,Rt=!!w.map,Bt=!!w.matcap,se=!!rt,F=!!w.aoMap,hn=!!w.lightMap,ae=!!w.bumpMap,Kt=!!w.normalMap,Ct=!!w.displacementMap,Se=!!w.emissiveMap,qt=!!w.metalnessMap,U=!!w.roughnessMap,b=w.anisotropy>0,it=w.clearcoat>0,gt=w.dispersion>0,vt=w.iridescence>0,pt=w.sheen>0,Yt=w.transmission>0,Lt=b&&!!w.anisotropyMap,zt=it&&!!w.clearcoatMap,ge=it&&!!w.clearcoatNormalMap,Et=it&&!!w.clearcoatRoughnessMap,Vt=vt&&!!w.iridescenceMap,Jt=vt&&!!w.iridescenceThicknessMap,te=pt&&!!w.sheenColorMap,Ht=pt&&!!w.sheenRoughnessMap,pe=!!w.specularMap,le=!!w.specularColorMap,ze=!!w.specularIntensityMap,G=Yt&&!!w.transmissionMap,Ot=Yt&&!!w.thicknessMap,ct=!!w.gradientMap,_t=!!w.alphaMap,Pt=w.alphaTest>0,It=!!w.alphaHash,re=!!w.extensions;let Ze=Ra;w.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(Ze=o.toneMapping);const vn={shaderID:xt,shaderType:w.type,shaderName:w.name,vertexShader:Te,fragmentShader:C,defines:w.defines,customVertexShaderID:j,customFragmentShaderID:mt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:wt,batchingColor:wt&&J._colorsTexture!==null,instancing:kt,instancingColor:kt&&J.instanceColor!==null,instancingMorph:kt&&J.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ft===null?o.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:er,alphaToCoverage:!!w.alphaToCoverage,map:Rt,matcap:Bt,envMap:se,envMapMode:se&&rt.mapping,envMapCubeUVHeight:$,aoMap:F,lightMap:hn,bumpMap:ae,normalMap:Kt,displacementMap:x&&Ct,emissiveMap:Se,normalMapObjectSpace:Kt&&w.normalMapType===mE,normalMapTangentSpace:Kt&&w.normalMapType===pE,metalnessMap:qt,roughnessMap:U,anisotropy:b,anisotropyMap:Lt,clearcoat:it,clearcoatMap:zt,clearcoatNormalMap:ge,clearcoatRoughnessMap:Et,dispersion:gt,iridescence:vt,iridescenceMap:Vt,iridescenceThicknessMap:Jt,sheen:pt,sheenColorMap:te,sheenRoughnessMap:Ht,specularMap:pe,specularColorMap:le,specularIntensityMap:ze,transmission:Yt,transmissionMap:G,thicknessMap:Ot,gradientMap:ct,opaque:w.transparent===!1&&w.blending===lo&&w.alphaToCoverage===!1,alphaMap:_t,alphaTest:Pt,alphaHash:It,combine:w.combine,mapUv:Rt&&D(w.map.channel),aoMapUv:F&&D(w.aoMap.channel),lightMapUv:hn&&D(w.lightMap.channel),bumpMapUv:ae&&D(w.bumpMap.channel),normalMapUv:Kt&&D(w.normalMap.channel),displacementMapUv:Ct&&D(w.displacementMap.channel),emissiveMapUv:Se&&D(w.emissiveMap.channel),metalnessMapUv:qt&&D(w.metalnessMap.channel),roughnessMapUv:U&&D(w.roughnessMap.channel),anisotropyMapUv:Lt&&D(w.anisotropyMap.channel),clearcoatMapUv:zt&&D(w.clearcoatMap.channel),clearcoatNormalMapUv:ge&&D(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&D(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&D(w.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&D(w.iridescenceThicknessMap.channel),sheenColorMapUv:te&&D(w.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&D(w.sheenRoughnessMap.channel),specularMapUv:pe&&D(w.specularMap.channel),specularColorMapUv:le&&D(w.specularColorMap.channel),specularIntensityMapUv:ze&&D(w.specularIntensityMap.channel),transmissionMapUv:G&&D(w.transmissionMap.channel),thicknessMapUv:Ot&&D(w.thicknessMap.channel),alphaMapUv:_t&&D(w.alphaMap.channel),vertexTangents:!!ut.attributes.tangent&&(Kt||b),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!ut.attributes.uv&&(Rt||_t),fog:!!lt,useFog:w.fog===!0,fogExp2:!!lt&&lt.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:bt,skinning:J.isSkinnedMesh===!0,morphTargets:ut.morphAttributes.position!==void 0,morphNormals:ut.morphAttributes.normal!==void 0,morphColors:ut.morphAttributes.color!==void 0,morphTargetsCount:Gt,morphTextureStride:ee,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:o.shadowMap.enabled&&L.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ze,decodeVideoTexture:Rt&&w.map.isVideoTexture===!0&&we.getTransfer(w.map.colorSpace)===Be,decodeVideoTextureEmissive:Se&&w.emissiveMap.isVideoTexture===!0&&we.getTransfer(w.emissiveMap.colorSpace)===Be,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ea,flipSided:w.side===Jn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:re&&w.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&w.extensions.multiDraw===!0||wt)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return vn.vertexUv1s=_.has(1),vn.vertexUv2s=_.has(2),vn.vertexUv3s=_.has(3),_.clear(),vn}function S(w){const E=[];if(w.shaderID?E.push(w.shaderID):(E.push(w.customVertexShaderID),E.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)E.push(L),E.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(I(E,w),z(E,w),E.push(o.outputColorSpace)),E.push(w.customProgramCacheKey),E.join()}function I(w,E){w.push(E.precision),w.push(E.outputColorSpace),w.push(E.envMapMode),w.push(E.envMapCubeUVHeight),w.push(E.mapUv),w.push(E.alphaMapUv),w.push(E.lightMapUv),w.push(E.aoMapUv),w.push(E.bumpMapUv),w.push(E.normalMapUv),w.push(E.displacementMapUv),w.push(E.emissiveMapUv),w.push(E.metalnessMapUv),w.push(E.roughnessMapUv),w.push(E.anisotropyMapUv),w.push(E.clearcoatMapUv),w.push(E.clearcoatNormalMapUv),w.push(E.clearcoatRoughnessMapUv),w.push(E.iridescenceMapUv),w.push(E.iridescenceThicknessMapUv),w.push(E.sheenColorMapUv),w.push(E.sheenRoughnessMapUv),w.push(E.specularMapUv),w.push(E.specularColorMapUv),w.push(E.specularIntensityMapUv),w.push(E.transmissionMapUv),w.push(E.thicknessMapUv),w.push(E.combine),w.push(E.fogExp2),w.push(E.sizeAttenuation),w.push(E.morphTargetsCount),w.push(E.morphAttributeCount),w.push(E.numDirLights),w.push(E.numPointLights),w.push(E.numSpotLights),w.push(E.numSpotLightMaps),w.push(E.numHemiLights),w.push(E.numRectAreaLights),w.push(E.numDirLightShadows),w.push(E.numPointLightShadows),w.push(E.numSpotLightShadows),w.push(E.numSpotLightShadowsWithMaps),w.push(E.numLightProbes),w.push(E.shadowMapType),w.push(E.toneMapping),w.push(E.numClippingPlanes),w.push(E.numClipIntersection),w.push(E.depthPacking)}function z(w,E){d.disableAll(),E.supportsVertexTextures&&d.enable(0),E.instancing&&d.enable(1),E.instancingColor&&d.enable(2),E.instancingMorph&&d.enable(3),E.matcap&&d.enable(4),E.envMap&&d.enable(5),E.normalMapObjectSpace&&d.enable(6),E.normalMapTangentSpace&&d.enable(7),E.clearcoat&&d.enable(8),E.iridescence&&d.enable(9),E.alphaTest&&d.enable(10),E.vertexColors&&d.enable(11),E.vertexAlphas&&d.enable(12),E.vertexUv1s&&d.enable(13),E.vertexUv2s&&d.enable(14),E.vertexUv3s&&d.enable(15),E.vertexTangents&&d.enable(16),E.anisotropy&&d.enable(17),E.alphaHash&&d.enable(18),E.batching&&d.enable(19),E.dispersion&&d.enable(20),E.batchingColor&&d.enable(21),w.push(d.mask),d.disableAll(),E.fog&&d.enable(0),E.useFog&&d.enable(1),E.flatShading&&d.enable(2),E.logarithmicDepthBuffer&&d.enable(3),E.reverseDepthBuffer&&d.enable(4),E.skinning&&d.enable(5),E.morphTargets&&d.enable(6),E.morphNormals&&d.enable(7),E.morphColors&&d.enable(8),E.premultipliedAlpha&&d.enable(9),E.shadowMapEnabled&&d.enable(10),E.doubleSided&&d.enable(11),E.flipSided&&d.enable(12),E.useDepthPacking&&d.enable(13),E.dithering&&d.enable(14),E.transmission&&d.enable(15),E.sheen&&d.enable(16),E.opaque&&d.enable(17),E.pointsUvs&&d.enable(18),E.decodeVideoTexture&&d.enable(19),E.decodeVideoTextureEmissive&&d.enable(20),E.alphaToCoverage&&d.enable(21),w.push(d.mask)}function N(w){const E=A[w.type];let L;if(E){const Q=Qi[E];L=oT.clone(Q.uniforms)}else L=w.uniforms;return L}function K(w,E){let L;for(let Q=0,J=v.length;Q<J;Q++){const lt=v[Q];if(lt.cacheKey===E){L=lt,++L.usedTimes;break}}return L===void 0&&(L=new DR(o,E,w,f),v.push(L)),L}function V(w){if(--w.usedTimes===0){const E=v.indexOf(w);v[E]=v[v.length-1],v.pop(),w.destroy()}}function P(w){p.remove(w)}function k(){p.dispose()}return{getParameters:y,getProgramCacheKey:S,getUniforms:N,acquireProgram:K,releaseProgram:V,releaseShaderCache:P,programs:v,dispose:k}}function OR(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function r(h){o.delete(h)}function u(h,d,p){o.get(h)[d]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:r,update:u,dispose:f}}function PR(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function nx(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function ix(){const o=[];let e=0;const i=[],r=[],u=[];function f(){e=0,i.length=0,r.length=0,u.length=0}function h(m,x,M,A,D,y){let S=o[e];return S===void 0?(S={id:m.id,object:m,geometry:x,material:M,groupOrder:A,renderOrder:m.renderOrder,z:D,group:y},o[e]=S):(S.id=m.id,S.object=m,S.geometry=x,S.material=M,S.groupOrder=A,S.renderOrder=m.renderOrder,S.z=D,S.group=y),e++,S}function d(m,x,M,A,D,y){const S=h(m,x,M,A,D,y);M.transmission>0?r.push(S):M.transparent===!0?u.push(S):i.push(S)}function p(m,x,M,A,D,y){const S=h(m,x,M,A,D,y);M.transmission>0?r.unshift(S):M.transparent===!0?u.unshift(S):i.unshift(S)}function _(m,x){i.length>1&&i.sort(m||PR),r.length>1&&r.sort(x||nx),u.length>1&&u.sort(x||nx)}function v(){for(let m=e,x=o.length;m<x;m++){const M=o[m];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:u,init:f,push:d,unshift:p,finish:v,sort:_}}function zR(){let o=new WeakMap;function e(r,u){const f=o.get(r);let h;return f===void 0?(h=new ix,o.set(r,[h])):u>=f.length?(h=new ix,f.push(h)):h=f[u],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function IR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new nt,color:new He};break;case"SpotLight":i={position:new nt,direction:new nt,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new nt,color:new He,distance:0,decay:0};break;case"HemisphereLight":i={direction:new nt,skyColor:new He,groundColor:new He};break;case"RectAreaLight":i={color:new He,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return o[e.id]=i,i}}}function BR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let FR=0;function HR(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function GR(o){const e=new IR,i=BR(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let _=0;_<9;_++)r.probe.push(new nt);const u=new nt,f=new fn,h=new fn;function d(_){let v=0,m=0,x=0;for(let w=0;w<9;w++)r.probe[w].set(0,0,0);let M=0,A=0,D=0,y=0,S=0,I=0,z=0,N=0,K=0,V=0,P=0;_.sort(HR);for(let w=0,E=_.length;w<E;w++){const L=_[w],Q=L.color,J=L.intensity,lt=L.distance,ut=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)v+=Q.r*J,m+=Q.g*J,x+=Q.b*J;else if(L.isLightProbe){for(let H=0;H<9;H++)r.probe[H].addScaledVector(L.sh.coefficients[H],J);P++}else if(L.isDirectionalLight){const H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const rt=L.shadow,$=i.get(L);$.shadowIntensity=rt.intensity,$.shadowBias=rt.bias,$.shadowNormalBias=rt.normalBias,$.shadowRadius=rt.radius,$.shadowMapSize=rt.mapSize,r.directionalShadow[M]=$,r.directionalShadowMap[M]=ut,r.directionalShadowMatrix[M]=L.shadow.matrix,I++}r.directional[M]=H,M++}else if(L.isSpotLight){const H=e.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(Q).multiplyScalar(J),H.distance=lt,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,r.spot[D]=H;const rt=L.shadow;if(L.map&&(r.spotLightMap[K]=L.map,K++,rt.updateMatrices(L),L.castShadow&&V++),r.spotLightMatrix[D]=rt.matrix,L.castShadow){const $=i.get(L);$.shadowIntensity=rt.intensity,$.shadowBias=rt.bias,$.shadowNormalBias=rt.normalBias,$.shadowRadius=rt.radius,$.shadowMapSize=rt.mapSize,r.spotShadow[D]=$,r.spotShadowMap[D]=ut,N++}D++}else if(L.isRectAreaLight){const H=e.get(L);H.color.copy(Q).multiplyScalar(J),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),r.rectArea[y]=H,y++}else if(L.isPointLight){const H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){const rt=L.shadow,$=i.get(L);$.shadowIntensity=rt.intensity,$.shadowBias=rt.bias,$.shadowNormalBias=rt.normalBias,$.shadowRadius=rt.radius,$.shadowMapSize=rt.mapSize,$.shadowCameraNear=rt.camera.near,$.shadowCameraFar=rt.camera.far,r.pointShadow[A]=$,r.pointShadowMap[A]=ut,r.pointShadowMatrix[A]=L.shadow.matrix,z++}r.point[A]=H,A++}else if(L.isHemisphereLight){const H=e.get(L);H.skyColor.copy(L.color).multiplyScalar(J),H.groundColor.copy(L.groundColor).multiplyScalar(J),r.hemi[S]=H,S++}}y>0&&(o.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Nt.LTC_FLOAT_1,r.rectAreaLTC2=Nt.LTC_FLOAT_2):(r.rectAreaLTC1=Nt.LTC_HALF_1,r.rectAreaLTC2=Nt.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=m,r.ambient[2]=x;const k=r.hash;(k.directionalLength!==M||k.pointLength!==A||k.spotLength!==D||k.rectAreaLength!==y||k.hemiLength!==S||k.numDirectionalShadows!==I||k.numPointShadows!==z||k.numSpotShadows!==N||k.numSpotMaps!==K||k.numLightProbes!==P)&&(r.directional.length=M,r.spot.length=D,r.rectArea.length=y,r.point.length=A,r.hemi.length=S,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=z,r.pointShadowMap.length=z,r.spotShadow.length=N,r.spotShadowMap.length=N,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=z,r.spotLightMatrix.length=N+K-V,r.spotLightMap.length=K,r.numSpotLightShadowsWithMaps=V,r.numLightProbes=P,k.directionalLength=M,k.pointLength=A,k.spotLength=D,k.rectAreaLength=y,k.hemiLength=S,k.numDirectionalShadows=I,k.numPointShadows=z,k.numSpotShadows=N,k.numSpotMaps=K,k.numLightProbes=P,r.version=FR++)}function p(_,v){let m=0,x=0,M=0,A=0,D=0;const y=v.matrixWorldInverse;for(let S=0,I=_.length;S<I;S++){const z=_[S];if(z.isDirectionalLight){const N=r.directional[m];N.direction.setFromMatrixPosition(z.matrixWorld),u.setFromMatrixPosition(z.target.matrixWorld),N.direction.sub(u),N.direction.transformDirection(y),m++}else if(z.isSpotLight){const N=r.spot[M];N.position.setFromMatrixPosition(z.matrixWorld),N.position.applyMatrix4(y),N.direction.setFromMatrixPosition(z.matrixWorld),u.setFromMatrixPosition(z.target.matrixWorld),N.direction.sub(u),N.direction.transformDirection(y),M++}else if(z.isRectAreaLight){const N=r.rectArea[A];N.position.setFromMatrixPosition(z.matrixWorld),N.position.applyMatrix4(y),h.identity(),f.copy(z.matrixWorld),f.premultiply(y),h.extractRotation(f),N.halfWidth.set(z.width*.5,0,0),N.halfHeight.set(0,z.height*.5,0),N.halfWidth.applyMatrix4(h),N.halfHeight.applyMatrix4(h),A++}else if(z.isPointLight){const N=r.point[x];N.position.setFromMatrixPosition(z.matrixWorld),N.position.applyMatrix4(y),x++}else if(z.isHemisphereLight){const N=r.hemi[D];N.direction.setFromMatrixPosition(z.matrixWorld),N.direction.transformDirection(y),D++}}}return{setup:d,setupView:p,state:r}}function ax(o){const e=new GR(o),i=[],r=[];function u(v){_.camera=v,i.length=0,r.length=0}function f(v){i.push(v)}function h(v){r.push(v)}function d(){e.setup(i)}function p(v){e.setupView(i,v)}const _={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:u,state:_,setupLights:d,setupLightsView:p,pushLight:f,pushShadow:h}}function VR(o){let e=new WeakMap;function i(u,f=0){const h=e.get(u);let d;return h===void 0?(d=new ax(o),e.set(u,[d])):f>=h.length?(d=new ax(o),h.push(d)):d=h[f],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const kR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XR=`uniform sampler2D shadow_pass;
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
}`;function qR(o,e,i){let r=new Lx;const u=new oe,f=new oe,h=new an,d=new _T({depthPacking:dE}),p=new vT,_={},v=i.maxTextureSize,m={[ds]:Jn,[Jn]:ds,[Ea]:Ea},x=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:kR,fragmentShader:XR}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const A=new gs;A.setAttribute("position",new Ri(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new Ji(A,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lx;let S=this.type;this.render=function(V,P,k){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||V.length===0)return;const w=o.getRenderTarget(),E=o.getActiveCubeFace(),L=o.getActiveMipmapLevel(),Q=o.state;Q.setBlending(hs),Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const J=S!==Ma&&this.type===Ma,lt=S===Ma&&this.type!==Ma;for(let ut=0,H=V.length;ut<H;ut++){const rt=V[ut],$=rt.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;u.copy($.mapSize);const xt=$.getFrameExtents();if(u.multiply(xt),f.copy($.mapSize),(u.x>v||u.y>v)&&(u.x>v&&(f.x=Math.floor(v/xt.x),u.x=f.x*xt.x,$.mapSize.x=f.x),u.y>v&&(f.y=Math.floor(v/xt.y),u.y=f.y*xt.y,$.mapSize.y=f.y)),$.map===null||J===!0||lt===!0){const Gt=this.type!==Ma?{minFilter:fi,magFilter:fi}:{};$.map!==null&&$.map.dispose(),$.map=new ps(u.x,u.y,Gt),$.map.texture.name=rt.name+".shadowMap",$.camera.updateProjectionMatrix()}o.setRenderTarget($.map),o.clear();const yt=$.getViewportCount();for(let Gt=0;Gt<yt;Gt++){const ee=$.getViewport(Gt);h.set(f.x*ee.x,f.y*ee.y,f.x*ee.z,f.y*ee.w),Q.viewport(h),$.updateMatrices(rt,Gt),r=$.getFrustum(),N(P,k,$.camera,rt,this.type)}$.isPointLightShadow!==!0&&this.type===Ma&&I($,k),$.needsUpdate=!1}S=this.type,y.needsUpdate=!1,o.setRenderTarget(w,E,L)};function I(V,P){const k=e.update(D);x.defines.VSM_SAMPLES!==V.blurSamples&&(x.defines.VSM_SAMPLES=V.blurSamples,M.defines.VSM_SAMPLES=V.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),V.mapPass===null&&(V.mapPass=new ps(u.x,u.y)),x.uniforms.shadow_pass.value=V.map.texture,x.uniforms.resolution.value=V.mapSize,x.uniforms.radius.value=V.radius,o.setRenderTarget(V.mapPass),o.clear(),o.renderBufferDirect(P,null,k,x,D,null),M.uniforms.shadow_pass.value=V.mapPass.texture,M.uniforms.resolution.value=V.mapSize,M.uniforms.radius.value=V.radius,o.setRenderTarget(V.map),o.clear(),o.renderBufferDirect(P,null,k,M,D,null)}function z(V,P,k,w){let E=null;const L=k.isPointLight===!0?V.customDistanceMaterial:V.customDepthMaterial;if(L!==void 0)E=L;else if(E=k.isPointLight===!0?p:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const Q=E.uuid,J=P.uuid;let lt=_[Q];lt===void 0&&(lt={},_[Q]=lt);let ut=lt[J];ut===void 0&&(ut=E.clone(),lt[J]=ut,P.addEventListener("dispose",K)),E=ut}if(E.visible=P.visible,E.wireframe=P.wireframe,w===Ma?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:m[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,k.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const Q=o.properties.get(E);Q.light=k}return E}function N(V,P,k,w,E){if(V.visible===!1)return;if(V.layers.test(P.layers)&&(V.isMesh||V.isLine||V.isPoints)&&(V.castShadow||V.receiveShadow&&E===Ma)&&(!V.frustumCulled||r.intersectsObject(V))){V.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,V.matrixWorld);const J=e.update(V),lt=V.material;if(Array.isArray(lt)){const ut=J.groups;for(let H=0,rt=ut.length;H<rt;H++){const $=ut[H],xt=lt[$.materialIndex];if(xt&&xt.visible){const yt=z(V,xt,w,E);V.onBeforeShadow(o,V,P,k,J,yt,$),o.renderBufferDirect(k,null,J,yt,V,$),V.onAfterShadow(o,V,P,k,J,yt,$)}}}else if(lt.visible){const ut=z(V,lt,w,E);V.onBeforeShadow(o,V,P,k,J,ut,null),o.renderBufferDirect(k,null,J,ut,V,null),V.onAfterShadow(o,V,P,k,J,ut,null)}}const Q=V.children;for(let J=0,lt=Q.length;J<lt;J++)N(Q[J],P,k,w,E)}function K(V){V.target.removeEventListener("dispose",K);for(const k in _){const w=_[k],E=V.target.uuid;E in w&&(w[E].dispose(),delete w[E])}}}const YR={[Yd]:Wd,[jd]:Qd,[Zd]:Jd,[mo]:Kd,[Wd]:Yd,[Qd]:jd,[Jd]:Zd,[Kd]:mo};function WR(o,e){function i(){let G=!1;const Ot=new an;let ct=null;const _t=new an(0,0,0,0);return{setMask:function(Pt){ct!==Pt&&!G&&(o.colorMask(Pt,Pt,Pt,Pt),ct=Pt)},setLocked:function(Pt){G=Pt},setClear:function(Pt,It,re,Ze,vn){vn===!0&&(Pt*=Ze,It*=Ze,re*=Ze),Ot.set(Pt,It,re,Ze),_t.equals(Ot)===!1&&(o.clearColor(Pt,It,re,Ze),_t.copy(Ot))},reset:function(){G=!1,ct=null,_t.set(-1,0,0,0)}}}function r(){let G=!1,Ot=!1,ct=null,_t=null,Pt=null;return{setReversed:function(It){if(Ot!==It){const re=e.get("EXT_clip_control");Ot?re.clipControlEXT(re.LOWER_LEFT_EXT,re.ZERO_TO_ONE_EXT):re.clipControlEXT(re.LOWER_LEFT_EXT,re.NEGATIVE_ONE_TO_ONE_EXT);const Ze=Pt;Pt=null,this.setClear(Ze)}Ot=It},getReversed:function(){return Ot},setTest:function(It){It?ft(o.DEPTH_TEST):bt(o.DEPTH_TEST)},setMask:function(It){ct!==It&&!G&&(o.depthMask(It),ct=It)},setFunc:function(It){if(Ot&&(It=YR[It]),_t!==It){switch(It){case Yd:o.depthFunc(o.NEVER);break;case Wd:o.depthFunc(o.ALWAYS);break;case jd:o.depthFunc(o.LESS);break;case mo:o.depthFunc(o.LEQUAL);break;case Zd:o.depthFunc(o.EQUAL);break;case Kd:o.depthFunc(o.GEQUAL);break;case Qd:o.depthFunc(o.GREATER);break;case Jd:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}_t=It}},setLocked:function(It){G=It},setClear:function(It){Pt!==It&&(Ot&&(It=1-It),o.clearDepth(It),Pt=It)},reset:function(){G=!1,ct=null,_t=null,Pt=null,Ot=!1}}}function u(){let G=!1,Ot=null,ct=null,_t=null,Pt=null,It=null,re=null,Ze=null,vn=null;return{setTest:function(be){G||(be?ft(o.STENCIL_TEST):bt(o.STENCIL_TEST))},setMask:function(be){Ot!==be&&!G&&(o.stencilMask(be),Ot=be)},setFunc:function(be,We,xn){(ct!==be||_t!==We||Pt!==xn)&&(o.stencilFunc(be,We,xn),ct=be,_t=We,Pt=xn)},setOp:function(be,We,xn){(It!==be||re!==We||Ze!==xn)&&(o.stencilOp(be,We,xn),It=be,re=We,Ze=xn)},setLocked:function(be){G=be},setClear:function(be){vn!==be&&(o.clearStencil(be),vn=be)},reset:function(){G=!1,Ot=null,ct=null,_t=null,Pt=null,It=null,re=null,Ze=null,vn=null}}}const f=new i,h=new r,d=new u,p=new WeakMap,_=new WeakMap;let v={},m={},x=new WeakMap,M=[],A=null,D=!1,y=null,S=null,I=null,z=null,N=null,K=null,V=null,P=new He(0,0,0),k=0,w=!1,E=null,L=null,Q=null,J=null,lt=null;const ut=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,rt=0;const $=o.getParameter(o.VERSION);$.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec($)[1]),H=rt>=1):$.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),H=rt>=2);let xt=null,yt={};const Gt=o.getParameter(o.SCISSOR_BOX),ee=o.getParameter(o.VIEWPORT),Te=new an().fromArray(Gt),C=new an().fromArray(ee);function j(G,Ot,ct,_t){const Pt=new Uint8Array(4),It=o.createTexture();o.bindTexture(G,It),o.texParameteri(G,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(G,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let re=0;re<ct;re++)G===o.TEXTURE_3D||G===o.TEXTURE_2D_ARRAY?o.texImage3D(Ot,0,o.RGBA,1,1,_t,0,o.RGBA,o.UNSIGNED_BYTE,Pt):o.texImage2D(Ot+re,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Pt);return It}const mt={};mt[o.TEXTURE_2D]=j(o.TEXTURE_2D,o.TEXTURE_2D,1),mt[o.TEXTURE_CUBE_MAP]=j(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[o.TEXTURE_2D_ARRAY]=j(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),mt[o.TEXTURE_3D]=j(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ft(o.DEPTH_TEST),h.setFunc(mo),ae(!1),Kt(lv),ft(o.CULL_FACE),F(hs);function ft(G){v[G]!==!0&&(o.enable(G),v[G]=!0)}function bt(G){v[G]!==!1&&(o.disable(G),v[G]=!1)}function kt(G,Ot){return m[G]!==Ot?(o.bindFramebuffer(G,Ot),m[G]=Ot,G===o.DRAW_FRAMEBUFFER&&(m[o.FRAMEBUFFER]=Ot),G===o.FRAMEBUFFER&&(m[o.DRAW_FRAMEBUFFER]=Ot),!0):!1}function wt(G,Ot){let ct=M,_t=!1;if(G){ct=x.get(Ot),ct===void 0&&(ct=[],x.set(Ot,ct));const Pt=G.textures;if(ct.length!==Pt.length||ct[0]!==o.COLOR_ATTACHMENT0){for(let It=0,re=Pt.length;It<re;It++)ct[It]=o.COLOR_ATTACHMENT0+It;ct.length=Pt.length,_t=!0}}else ct[0]!==o.BACK&&(ct[0]=o.BACK,_t=!0);_t&&o.drawBuffers(ct)}function Rt(G){return A!==G?(o.useProgram(G),A=G,!0):!1}const Bt={[js]:o.FUNC_ADD,[FM]:o.FUNC_SUBTRACT,[HM]:o.FUNC_REVERSE_SUBTRACT};Bt[GM]=o.MIN,Bt[VM]=o.MAX;const se={[kM]:o.ZERO,[XM]:o.ONE,[qM]:o.SRC_COLOR,[Xd]:o.SRC_ALPHA,[QM]:o.SRC_ALPHA_SATURATE,[ZM]:o.DST_COLOR,[WM]:o.DST_ALPHA,[YM]:o.ONE_MINUS_SRC_COLOR,[qd]:o.ONE_MINUS_SRC_ALPHA,[KM]:o.ONE_MINUS_DST_COLOR,[jM]:o.ONE_MINUS_DST_ALPHA,[JM]:o.CONSTANT_COLOR,[$M]:o.ONE_MINUS_CONSTANT_COLOR,[tE]:o.CONSTANT_ALPHA,[eE]:o.ONE_MINUS_CONSTANT_ALPHA};function F(G,Ot,ct,_t,Pt,It,re,Ze,vn,be){if(G===hs){D===!0&&(bt(o.BLEND),D=!1);return}if(D===!1&&(ft(o.BLEND),D=!0),G!==BM){if(G!==y||be!==w){if((S!==js||N!==js)&&(o.blendEquation(o.FUNC_ADD),S=js,N=js),be)switch(G){case lo:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case uv:o.blendFunc(o.ONE,o.ONE);break;case cv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case fv:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case lo:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case uv:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case cv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case fv:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}I=null,z=null,K=null,V=null,P.set(0,0,0),k=0,y=G,w=be}return}Pt=Pt||Ot,It=It||ct,re=re||_t,(Ot!==S||Pt!==N)&&(o.blendEquationSeparate(Bt[Ot],Bt[Pt]),S=Ot,N=Pt),(ct!==I||_t!==z||It!==K||re!==V)&&(o.blendFuncSeparate(se[ct],se[_t],se[It],se[re]),I=ct,z=_t,K=It,V=re),(Ze.equals(P)===!1||vn!==k)&&(o.blendColor(Ze.r,Ze.g,Ze.b,vn),P.copy(Ze),k=vn),y=G,w=!1}function hn(G,Ot){G.side===Ea?bt(o.CULL_FACE):ft(o.CULL_FACE);let ct=G.side===Jn;Ot&&(ct=!ct),ae(ct),G.blending===lo&&G.transparent===!1?F(hs):F(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),h.setFunc(G.depthFunc),h.setTest(G.depthTest),h.setMask(G.depthWrite),f.setMask(G.colorWrite);const _t=G.stencilWrite;d.setTest(_t),_t&&(d.setMask(G.stencilWriteMask),d.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),d.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Se(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ft(o.SAMPLE_ALPHA_TO_COVERAGE):bt(o.SAMPLE_ALPHA_TO_COVERAGE)}function ae(G){E!==G&&(G?o.frontFace(o.CW):o.frontFace(o.CCW),E=G)}function Kt(G){G!==PM?(ft(o.CULL_FACE),G!==L&&(G===lv?o.cullFace(o.BACK):G===zM?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):bt(o.CULL_FACE),L=G}function Ct(G){G!==Q&&(H&&o.lineWidth(G),Q=G)}function Se(G,Ot,ct){G?(ft(o.POLYGON_OFFSET_FILL),(J!==Ot||lt!==ct)&&(o.polygonOffset(Ot,ct),J=Ot,lt=ct)):bt(o.POLYGON_OFFSET_FILL)}function qt(G){G?ft(o.SCISSOR_TEST):bt(o.SCISSOR_TEST)}function U(G){G===void 0&&(G=o.TEXTURE0+ut-1),xt!==G&&(o.activeTexture(G),xt=G)}function b(G,Ot,ct){ct===void 0&&(xt===null?ct=o.TEXTURE0+ut-1:ct=xt);let _t=yt[ct];_t===void 0&&(_t={type:void 0,texture:void 0},yt[ct]=_t),(_t.type!==G||_t.texture!==Ot)&&(xt!==ct&&(o.activeTexture(ct),xt=ct),o.bindTexture(G,Ot||mt[G]),_t.type=G,_t.texture=Ot)}function it(){const G=yt[xt];G!==void 0&&G.type!==void 0&&(o.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function gt(){try{o.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function vt(){try{o.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function pt(){try{o.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Yt(){try{o.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Lt(){try{o.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function zt(){try{o.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ge(){try{o.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Et(){try{o.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Vt(){try{o.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Jt(){try{o.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function te(G){Te.equals(G)===!1&&(o.scissor(G.x,G.y,G.z,G.w),Te.copy(G))}function Ht(G){C.equals(G)===!1&&(o.viewport(G.x,G.y,G.z,G.w),C.copy(G))}function pe(G,Ot){let ct=_.get(Ot);ct===void 0&&(ct=new WeakMap,_.set(Ot,ct));let _t=ct.get(G);_t===void 0&&(_t=o.getUniformBlockIndex(Ot,G.name),ct.set(G,_t))}function le(G,Ot){const _t=_.get(Ot).get(G);p.get(Ot)!==_t&&(o.uniformBlockBinding(Ot,_t,G.__bindingPointIndex),p.set(Ot,_t))}function ze(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),v={},xt=null,yt={},m={},x=new WeakMap,M=[],A=null,D=!1,y=null,S=null,I=null,z=null,N=null,K=null,V=null,P=new He(0,0,0),k=0,w=!1,E=null,L=null,Q=null,J=null,lt=null,Te.set(0,0,o.canvas.width,o.canvas.height),C.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:ft,disable:bt,bindFramebuffer:kt,drawBuffers:wt,useProgram:Rt,setBlending:F,setMaterial:hn,setFlipSided:ae,setCullFace:Kt,setLineWidth:Ct,setPolygonOffset:Se,setScissorTest:qt,activeTexture:U,bindTexture:b,unbindTexture:it,compressedTexImage2D:gt,compressedTexImage3D:vt,texImage2D:Vt,texImage3D:Jt,updateUBOMapping:pe,uniformBlockBinding:le,texStorage2D:ge,texStorage3D:Et,texSubImage2D:pt,texSubImage3D:Yt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:te,viewport:Ht,reset:ze}}function jR(o,e,i,r,u,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new oe,v=new WeakMap;let m;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(U,b){return M?new OffscreenCanvas(U,b):Cc("canvas")}function D(U,b,it){let gt=1;const vt=qt(U);if((vt.width>it||vt.height>it)&&(gt=it/Math.max(vt.width,vt.height)),gt<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const pt=Math.floor(gt*vt.width),Yt=Math.floor(gt*vt.height);m===void 0&&(m=A(pt,Yt));const Lt=b?A(pt,Yt):m;return Lt.width=pt,Lt.height=Yt,Lt.getContext("2d").drawImage(U,0,0,pt,Yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+pt+"x"+Yt+")."),Lt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),U;return U}function y(U){return U.generateMipmaps}function S(U){o.generateMipmap(U)}function I(U){return U.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?o.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function z(U,b,it,gt,vt=!1){if(U!==null){if(o[U]!==void 0)return o[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let pt=b;if(b===o.RED&&(it===o.FLOAT&&(pt=o.R32F),it===o.HALF_FLOAT&&(pt=o.R16F),it===o.UNSIGNED_BYTE&&(pt=o.R8)),b===o.RED_INTEGER&&(it===o.UNSIGNED_BYTE&&(pt=o.R8UI),it===o.UNSIGNED_SHORT&&(pt=o.R16UI),it===o.UNSIGNED_INT&&(pt=o.R32UI),it===o.BYTE&&(pt=o.R8I),it===o.SHORT&&(pt=o.R16I),it===o.INT&&(pt=o.R32I)),b===o.RG&&(it===o.FLOAT&&(pt=o.RG32F),it===o.HALF_FLOAT&&(pt=o.RG16F),it===o.UNSIGNED_BYTE&&(pt=o.RG8)),b===o.RG_INTEGER&&(it===o.UNSIGNED_BYTE&&(pt=o.RG8UI),it===o.UNSIGNED_SHORT&&(pt=o.RG16UI),it===o.UNSIGNED_INT&&(pt=o.RG32UI),it===o.BYTE&&(pt=o.RG8I),it===o.SHORT&&(pt=o.RG16I),it===o.INT&&(pt=o.RG32I)),b===o.RGB_INTEGER&&(it===o.UNSIGNED_BYTE&&(pt=o.RGB8UI),it===o.UNSIGNED_SHORT&&(pt=o.RGB16UI),it===o.UNSIGNED_INT&&(pt=o.RGB32UI),it===o.BYTE&&(pt=o.RGB8I),it===o.SHORT&&(pt=o.RGB16I),it===o.INT&&(pt=o.RGB32I)),b===o.RGBA_INTEGER&&(it===o.UNSIGNED_BYTE&&(pt=o.RGBA8UI),it===o.UNSIGNED_SHORT&&(pt=o.RGBA16UI),it===o.UNSIGNED_INT&&(pt=o.RGBA32UI),it===o.BYTE&&(pt=o.RGBA8I),it===o.SHORT&&(pt=o.RGBA16I),it===o.INT&&(pt=o.RGBA32I)),b===o.RGB&&it===o.UNSIGNED_INT_5_9_9_9_REV&&(pt=o.RGB9_E5),b===o.RGBA){const Yt=vt?Ac:we.getTransfer(gt);it===o.FLOAT&&(pt=o.RGBA32F),it===o.HALF_FLOAT&&(pt=o.RGBA16F),it===o.UNSIGNED_BYTE&&(pt=Yt===Be?o.SRGB8_ALPHA8:o.RGBA8),it===o.UNSIGNED_SHORT_4_4_4_4&&(pt=o.RGBA4),it===o.UNSIGNED_SHORT_5_5_5_1&&(pt=o.RGB5_A1)}return(pt===o.R16F||pt===o.R32F||pt===o.RG16F||pt===o.RG32F||pt===o.RGBA16F||pt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),pt}function N(U,b){let it;return U?b===null||b===$s||b===vo?it=o.DEPTH24_STENCIL8:b===ba?it=o.DEPTH32F_STENCIL8:b===Tl&&(it=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===$s||b===vo?it=o.DEPTH_COMPONENT24:b===ba?it=o.DEPTH_COMPONENT32F:b===Tl&&(it=o.DEPTH_COMPONENT16),it}function K(U,b){return y(U)===!0||U.isFramebufferTexture&&U.minFilter!==fi&&U.minFilter!==bi?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function V(U){const b=U.target;b.removeEventListener("dispose",V),k(b),b.isVideoTexture&&v.delete(b)}function P(U){const b=U.target;b.removeEventListener("dispose",P),E(b)}function k(U){const b=r.get(U);if(b.__webglInit===void 0)return;const it=U.source,gt=x.get(it);if(gt){const vt=gt[b.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&w(U),Object.keys(gt).length===0&&x.delete(it)}r.remove(U)}function w(U){const b=r.get(U);o.deleteTexture(b.__webglTexture);const it=U.source,gt=x.get(it);delete gt[b.__cacheKey],h.memory.textures--}function E(U){const b=r.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),r.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let gt=0;gt<6;gt++){if(Array.isArray(b.__webglFramebuffer[gt]))for(let vt=0;vt<b.__webglFramebuffer[gt].length;vt++)o.deleteFramebuffer(b.__webglFramebuffer[gt][vt]);else o.deleteFramebuffer(b.__webglFramebuffer[gt]);b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer[gt])}else{if(Array.isArray(b.__webglFramebuffer))for(let gt=0;gt<b.__webglFramebuffer.length;gt++)o.deleteFramebuffer(b.__webglFramebuffer[gt]);else o.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&o.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let gt=0;gt<b.__webglColorRenderbuffer.length;gt++)b.__webglColorRenderbuffer[gt]&&o.deleteRenderbuffer(b.__webglColorRenderbuffer[gt]);b.__webglDepthRenderbuffer&&o.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const it=U.textures;for(let gt=0,vt=it.length;gt<vt;gt++){const pt=r.get(it[gt]);pt.__webglTexture&&(o.deleteTexture(pt.__webglTexture),h.memory.textures--),r.remove(it[gt])}r.remove(U)}let L=0;function Q(){L=0}function J(){const U=L;return U>=u.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+u.maxTextures),L+=1,U}function lt(U){const b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function ut(U,b){const it=r.get(U);if(U.isVideoTexture&&Ct(U),U.isRenderTargetTexture===!1&&U.version>0&&it.__version!==U.version){const gt=U.image;if(gt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{C(it,U,b);return}}i.bindTexture(o.TEXTURE_2D,it.__webglTexture,o.TEXTURE0+b)}function H(U,b){const it=r.get(U);if(U.version>0&&it.__version!==U.version){C(it,U,b);return}i.bindTexture(o.TEXTURE_2D_ARRAY,it.__webglTexture,o.TEXTURE0+b)}function rt(U,b){const it=r.get(U);if(U.version>0&&it.__version!==U.version){C(it,U,b);return}i.bindTexture(o.TEXTURE_3D,it.__webglTexture,o.TEXTURE0+b)}function $(U,b){const it=r.get(U);if(U.version>0&&it.__version!==U.version){j(it,U,b);return}i.bindTexture(o.TEXTURE_CUBE_MAP,it.__webglTexture,o.TEXTURE0+b)}const xt={[ep]:o.REPEAT,[Ta]:o.CLAMP_TO_EDGE,[np]:o.MIRRORED_REPEAT},yt={[fi]:o.NEAREST,[fE]:o.NEAREST_MIPMAP_NEAREST,[Qu]:o.NEAREST_MIPMAP_LINEAR,[bi]:o.LINEAR,[hd]:o.LINEAR_MIPMAP_NEAREST,[Qs]:o.LINEAR_MIPMAP_LINEAR},Gt={[gE]:o.NEVER,[ME]:o.ALWAYS,[_E]:o.LESS,[yx]:o.LEQUAL,[vE]:o.EQUAL,[yE]:o.GEQUAL,[xE]:o.GREATER,[SE]:o.NOTEQUAL};function ee(U,b){if(b.type===ba&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===bi||b.magFilter===hd||b.magFilter===Qu||b.magFilter===Qs||b.minFilter===bi||b.minFilter===hd||b.minFilter===Qu||b.minFilter===Qs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(U,o.TEXTURE_WRAP_S,xt[b.wrapS]),o.texParameteri(U,o.TEXTURE_WRAP_T,xt[b.wrapT]),(U===o.TEXTURE_3D||U===o.TEXTURE_2D_ARRAY)&&o.texParameteri(U,o.TEXTURE_WRAP_R,xt[b.wrapR]),o.texParameteri(U,o.TEXTURE_MAG_FILTER,yt[b.magFilter]),o.texParameteri(U,o.TEXTURE_MIN_FILTER,yt[b.minFilter]),b.compareFunction&&(o.texParameteri(U,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(U,o.TEXTURE_COMPARE_FUNC,Gt[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===fi||b.minFilter!==Qu&&b.minFilter!==Qs||b.type===ba&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||r.get(b).__currentAnisotropy){const it=e.get("EXT_texture_filter_anisotropic");o.texParameterf(U,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,u.getMaxAnisotropy())),r.get(b).__currentAnisotropy=b.anisotropy}}}function Te(U,b){let it=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",V));const gt=b.source;let vt=x.get(gt);vt===void 0&&(vt={},x.set(gt,vt));const pt=lt(b);if(pt!==U.__cacheKey){vt[pt]===void 0&&(vt[pt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,it=!0),vt[pt].usedTimes++;const Yt=vt[U.__cacheKey];Yt!==void 0&&(vt[U.__cacheKey].usedTimes--,Yt.usedTimes===0&&w(b)),U.__cacheKey=pt,U.__webglTexture=vt[pt].texture}return it}function C(U,b,it){let gt=o.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(gt=o.TEXTURE_2D_ARRAY),b.isData3DTexture&&(gt=o.TEXTURE_3D);const vt=Te(U,b),pt=b.source;i.bindTexture(gt,U.__webglTexture,o.TEXTURE0+it);const Yt=r.get(pt);if(pt.version!==Yt.__version||vt===!0){i.activeTexture(o.TEXTURE0+it);const Lt=we.getPrimaries(we.workingColorSpace),zt=b.colorSpace===fs?null:we.getPrimaries(b.colorSpace),ge=b.colorSpace===fs||Lt===zt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Et=D(b.image,!1,u.maxTextureSize);Et=Se(b,Et);const Vt=f.convert(b.format,b.colorSpace),Jt=f.convert(b.type);let te=z(b.internalFormat,Vt,Jt,b.colorSpace,b.isVideoTexture);ee(gt,b);let Ht;const pe=b.mipmaps,le=b.isVideoTexture!==!0,ze=Yt.__version===void 0||vt===!0,G=pt.dataReady,Ot=K(b,Et);if(b.isDepthTexture)te=N(b.format===xo,b.type),ze&&(le?i.texStorage2D(o.TEXTURE_2D,1,te,Et.width,Et.height):i.texImage2D(o.TEXTURE_2D,0,te,Et.width,Et.height,0,Vt,Jt,null));else if(b.isDataTexture)if(pe.length>0){le&&ze&&i.texStorage2D(o.TEXTURE_2D,Ot,te,pe[0].width,pe[0].height);for(let ct=0,_t=pe.length;ct<_t;ct++)Ht=pe[ct],le?G&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Ht.width,Ht.height,Vt,Jt,Ht.data):i.texImage2D(o.TEXTURE_2D,ct,te,Ht.width,Ht.height,0,Vt,Jt,Ht.data);b.generateMipmaps=!1}else le?(ze&&i.texStorage2D(o.TEXTURE_2D,Ot,te,Et.width,Et.height),G&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Et.width,Et.height,Vt,Jt,Et.data)):i.texImage2D(o.TEXTURE_2D,0,te,Et.width,Et.height,0,Vt,Jt,Et.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){le&&ze&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ot,te,pe[0].width,pe[0].height,Et.depth);for(let ct=0,_t=pe.length;ct<_t;ct++)if(Ht=pe[ct],b.format!==ci)if(Vt!==null)if(le){if(G)if(b.layerUpdates.size>0){const Pt=Ov(Ht.width,Ht.height,b.format,b.type);for(const It of b.layerUpdates){const re=Ht.data.subarray(It*Pt/Ht.data.BYTES_PER_ELEMENT,(It+1)*Pt/Ht.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,It,Ht.width,Ht.height,1,Vt,re)}b.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,0,Ht.width,Ht.height,Et.depth,Vt,Ht.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ct,te,Ht.width,Ht.height,Et.depth,0,Ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?G&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,0,Ht.width,Ht.height,Et.depth,Vt,Jt,Ht.data):i.texImage3D(o.TEXTURE_2D_ARRAY,ct,te,Ht.width,Ht.height,Et.depth,0,Vt,Jt,Ht.data)}else{le&&ze&&i.texStorage2D(o.TEXTURE_2D,Ot,te,pe[0].width,pe[0].height);for(let ct=0,_t=pe.length;ct<_t;ct++)Ht=pe[ct],b.format!==ci?Vt!==null?le?G&&i.compressedTexSubImage2D(o.TEXTURE_2D,ct,0,0,Ht.width,Ht.height,Vt,Ht.data):i.compressedTexImage2D(o.TEXTURE_2D,ct,te,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?G&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Ht.width,Ht.height,Vt,Jt,Ht.data):i.texImage2D(o.TEXTURE_2D,ct,te,Ht.width,Ht.height,0,Vt,Jt,Ht.data)}else if(b.isDataArrayTexture)if(le){if(ze&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ot,te,Et.width,Et.height,Et.depth),G)if(b.layerUpdates.size>0){const ct=Ov(Et.width,Et.height,b.format,b.type);for(const _t of b.layerUpdates){const Pt=Et.data.subarray(_t*ct/Et.data.BYTES_PER_ELEMENT,(_t+1)*ct/Et.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,_t,Et.width,Et.height,1,Vt,Jt,Pt)}b.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,Vt,Jt,Et.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,te,Et.width,Et.height,Et.depth,0,Vt,Jt,Et.data);else if(b.isData3DTexture)le?(ze&&i.texStorage3D(o.TEXTURE_3D,Ot,te,Et.width,Et.height,Et.depth),G&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,Vt,Jt,Et.data)):i.texImage3D(o.TEXTURE_3D,0,te,Et.width,Et.height,Et.depth,0,Vt,Jt,Et.data);else if(b.isFramebufferTexture){if(ze)if(le)i.texStorage2D(o.TEXTURE_2D,Ot,te,Et.width,Et.height);else{let ct=Et.width,_t=Et.height;for(let Pt=0;Pt<Ot;Pt++)i.texImage2D(o.TEXTURE_2D,Pt,te,ct,_t,0,Vt,Jt,null),ct>>=1,_t>>=1}}else if(pe.length>0){if(le&&ze){const ct=qt(pe[0]);i.texStorage2D(o.TEXTURE_2D,Ot,te,ct.width,ct.height)}for(let ct=0,_t=pe.length;ct<_t;ct++)Ht=pe[ct],le?G&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Vt,Jt,Ht):i.texImage2D(o.TEXTURE_2D,ct,te,Vt,Jt,Ht);b.generateMipmaps=!1}else if(le){if(ze){const ct=qt(Et);i.texStorage2D(o.TEXTURE_2D,Ot,te,ct.width,ct.height)}G&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Vt,Jt,Et)}else i.texImage2D(o.TEXTURE_2D,0,te,Vt,Jt,Et);y(b)&&S(gt),Yt.__version=pt.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function j(U,b,it){if(b.image.length!==6)return;const gt=Te(U,b),vt=b.source;i.bindTexture(o.TEXTURE_CUBE_MAP,U.__webglTexture,o.TEXTURE0+it);const pt=r.get(vt);if(vt.version!==pt.__version||gt===!0){i.activeTexture(o.TEXTURE0+it);const Yt=we.getPrimaries(we.workingColorSpace),Lt=b.colorSpace===fs?null:we.getPrimaries(b.colorSpace),zt=b.colorSpace===fs||Yt===Lt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const ge=b.isCompressedTexture||b.image[0].isCompressedTexture,Et=b.image[0]&&b.image[0].isDataTexture,Vt=[];for(let _t=0;_t<6;_t++)!ge&&!Et?Vt[_t]=D(b.image[_t],!0,u.maxCubemapSize):Vt[_t]=Et?b.image[_t].image:b.image[_t],Vt[_t]=Se(b,Vt[_t]);const Jt=Vt[0],te=f.convert(b.format,b.colorSpace),Ht=f.convert(b.type),pe=z(b.internalFormat,te,Ht,b.colorSpace),le=b.isVideoTexture!==!0,ze=pt.__version===void 0||gt===!0,G=vt.dataReady;let Ot=K(b,Jt);ee(o.TEXTURE_CUBE_MAP,b);let ct;if(ge){le&&ze&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ot,pe,Jt.width,Jt.height);for(let _t=0;_t<6;_t++){ct=Vt[_t].mipmaps;for(let Pt=0;Pt<ct.length;Pt++){const It=ct[Pt];b.format!==ci?te!==null?le?G&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,0,0,It.width,It.height,te,It.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,pe,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):le?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,0,0,It.width,It.height,te,Ht,It.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,pe,It.width,It.height,0,te,Ht,It.data)}}}else{if(ct=b.mipmaps,le&&ze){ct.length>0&&Ot++;const _t=qt(Vt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ot,pe,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(Et){le?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Vt[_t].width,Vt[_t].height,te,Ht,Vt[_t].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,pe,Vt[_t].width,Vt[_t].height,0,te,Ht,Vt[_t].data);for(let Pt=0;Pt<ct.length;Pt++){const re=ct[Pt].image[_t].image;le?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,0,0,re.width,re.height,te,Ht,re.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,pe,re.width,re.height,0,te,Ht,re.data)}}else{le?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,te,Ht,Vt[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,pe,te,Ht,Vt[_t]);for(let Pt=0;Pt<ct.length;Pt++){const It=ct[Pt];le?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,0,0,te,Ht,It.image[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,pe,te,Ht,It.image[_t])}}}y(b)&&S(o.TEXTURE_CUBE_MAP),pt.__version=vt.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function mt(U,b,it,gt,vt,pt){const Yt=f.convert(it.format,it.colorSpace),Lt=f.convert(it.type),zt=z(it.internalFormat,Yt,Lt,it.colorSpace),ge=r.get(b),Et=r.get(it);if(Et.__renderTarget=b,!ge.__hasExternalTextures){const Vt=Math.max(1,b.width>>pt),Jt=Math.max(1,b.height>>pt);vt===o.TEXTURE_3D||vt===o.TEXTURE_2D_ARRAY?i.texImage3D(vt,pt,zt,Vt,Jt,b.depth,0,Yt,Lt,null):i.texImage2D(vt,pt,zt,Vt,Jt,0,Yt,Lt,null)}i.bindFramebuffer(o.FRAMEBUFFER,U),Kt(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,gt,vt,Et.__webglTexture,0,ae(b)):(vt===o.TEXTURE_2D||vt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,gt,vt,Et.__webglTexture,pt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function ft(U,b,it){if(o.bindRenderbuffer(o.RENDERBUFFER,U),b.depthBuffer){const gt=b.depthTexture,vt=gt&&gt.isDepthTexture?gt.type:null,pt=N(b.stencilBuffer,vt),Yt=b.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Lt=ae(b);Kt(b)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Lt,pt,b.width,b.height):it?o.renderbufferStorageMultisample(o.RENDERBUFFER,Lt,pt,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,pt,b.width,b.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Yt,o.RENDERBUFFER,U)}else{const gt=b.textures;for(let vt=0;vt<gt.length;vt++){const pt=gt[vt],Yt=f.convert(pt.format,pt.colorSpace),Lt=f.convert(pt.type),zt=z(pt.internalFormat,Yt,Lt,pt.colorSpace),ge=ae(b);it&&Kt(b)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,ge,zt,b.width,b.height):Kt(b)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ge,zt,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,zt,b.width,b.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function bt(U,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const gt=r.get(b.depthTexture);gt.__renderTarget=b,(!gt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ut(b.depthTexture,0);const vt=gt.__webglTexture,pt=ae(b);if(b.depthTexture.format===uo)Kt(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0,pt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0);else if(b.depthTexture.format===xo)Kt(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0,pt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0);else throw new Error("Unknown depthTexture format")}function kt(U){const b=r.get(U),it=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){const gt=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),gt){const vt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,gt.removeEventListener("dispose",vt)};gt.addEventListener("dispose",vt),b.__depthDisposeCallback=vt}b.__boundDepthTexture=gt}if(U.depthTexture&&!b.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");bt(b.__webglFramebuffer,U)}else if(it){b.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)if(i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[gt]),b.__webglDepthbuffer[gt]===void 0)b.__webglDepthbuffer[gt]=o.createRenderbuffer(),ft(b.__webglDepthbuffer[gt],U,!1);else{const vt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,pt=b.__webglDepthbuffer[gt];o.bindRenderbuffer(o.RENDERBUFFER,pt),o.framebufferRenderbuffer(o.FRAMEBUFFER,vt,o.RENDERBUFFER,pt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=o.createRenderbuffer(),ft(b.__webglDepthbuffer,U,!1);else{const gt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,vt=b.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,vt),o.framebufferRenderbuffer(o.FRAMEBUFFER,gt,o.RENDERBUFFER,vt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function wt(U,b,it){const gt=r.get(U);b!==void 0&&mt(gt.__webglFramebuffer,U,U.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),it!==void 0&&kt(U)}function Rt(U){const b=U.texture,it=r.get(U),gt=r.get(b);U.addEventListener("dispose",P);const vt=U.textures,pt=U.isWebGLCubeRenderTarget===!0,Yt=vt.length>1;if(Yt||(gt.__webglTexture===void 0&&(gt.__webglTexture=o.createTexture()),gt.__version=b.version,h.memory.textures++),pt){it.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(b.mipmaps&&b.mipmaps.length>0){it.__webglFramebuffer[Lt]=[];for(let zt=0;zt<b.mipmaps.length;zt++)it.__webglFramebuffer[Lt][zt]=o.createFramebuffer()}else it.__webglFramebuffer[Lt]=o.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){it.__webglFramebuffer=[];for(let Lt=0;Lt<b.mipmaps.length;Lt++)it.__webglFramebuffer[Lt]=o.createFramebuffer()}else it.__webglFramebuffer=o.createFramebuffer();if(Yt)for(let Lt=0,zt=vt.length;Lt<zt;Lt++){const ge=r.get(vt[Lt]);ge.__webglTexture===void 0&&(ge.__webglTexture=o.createTexture(),h.memory.textures++)}if(U.samples>0&&Kt(U)===!1){it.__webglMultisampledFramebuffer=o.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let Lt=0;Lt<vt.length;Lt++){const zt=vt[Lt];it.__webglColorRenderbuffer[Lt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,it.__webglColorRenderbuffer[Lt]);const ge=f.convert(zt.format,zt.colorSpace),Et=f.convert(zt.type),Vt=z(zt.internalFormat,ge,Et,zt.colorSpace,U.isXRRenderTarget===!0),Jt=ae(U);o.renderbufferStorageMultisample(o.RENDERBUFFER,Jt,Vt,U.width,U.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.RENDERBUFFER,it.__webglColorRenderbuffer[Lt])}o.bindRenderbuffer(o.RENDERBUFFER,null),U.depthBuffer&&(it.__webglDepthRenderbuffer=o.createRenderbuffer(),ft(it.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(pt){i.bindTexture(o.TEXTURE_CUBE_MAP,gt.__webglTexture),ee(o.TEXTURE_CUBE_MAP,b);for(let Lt=0;Lt<6;Lt++)if(b.mipmaps&&b.mipmaps.length>0)for(let zt=0;zt<b.mipmaps.length;zt++)mt(it.__webglFramebuffer[Lt][zt],U,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else mt(it.__webglFramebuffer[Lt],U,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);y(b)&&S(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Yt){for(let Lt=0,zt=vt.length;Lt<zt;Lt++){const ge=vt[Lt],Et=r.get(ge);i.bindTexture(o.TEXTURE_2D,Et.__webglTexture),ee(o.TEXTURE_2D,ge),mt(it.__webglFramebuffer,U,ge,o.COLOR_ATTACHMENT0+Lt,o.TEXTURE_2D,0),y(ge)&&S(o.TEXTURE_2D)}i.unbindTexture()}else{let Lt=o.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Lt=U.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Lt,gt.__webglTexture),ee(Lt,b),b.mipmaps&&b.mipmaps.length>0)for(let zt=0;zt<b.mipmaps.length;zt++)mt(it.__webglFramebuffer[zt],U,b,o.COLOR_ATTACHMENT0,Lt,zt);else mt(it.__webglFramebuffer,U,b,o.COLOR_ATTACHMENT0,Lt,0);y(b)&&S(Lt),i.unbindTexture()}U.depthBuffer&&kt(U)}function Bt(U){const b=U.textures;for(let it=0,gt=b.length;it<gt;it++){const vt=b[it];if(y(vt)){const pt=I(U),Yt=r.get(vt).__webglTexture;i.bindTexture(pt,Yt),S(pt),i.unbindTexture()}}}const se=[],F=[];function hn(U){if(U.samples>0){if(Kt(U)===!1){const b=U.textures,it=U.width,gt=U.height;let vt=o.COLOR_BUFFER_BIT;const pt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Yt=r.get(U),Lt=b.length>1;if(Lt)for(let zt=0;zt<b.length;zt++)i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let zt=0;zt<b.length;zt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(vt|=o.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(vt|=o.STENCIL_BUFFER_BIT)),Lt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Yt.__webglColorRenderbuffer[zt]);const ge=r.get(b[zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ge,0)}o.blitFramebuffer(0,0,it,gt,0,0,it,gt,vt,o.NEAREST),p===!0&&(se.length=0,F.length=0,se.push(o.COLOR_ATTACHMENT0+zt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(se.push(pt),F.push(pt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,F)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,se))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<b.length;zt++){i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,Yt.__webglColorRenderbuffer[zt]);const ge=r.get(b[zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,ge,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&p){const b=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[b])}}}function ae(U){return Math.min(u.maxSamples,U.samples)}function Kt(U){const b=r.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ct(U){const b=h.render.frame;v.get(U)!==b&&(v.set(U,b),U.update())}function Se(U,b){const it=U.colorSpace,gt=U.format,vt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||it!==er&&it!==fs&&(we.getTransfer(it)===Be?(gt!==ci||vt!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),b}function qt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(_.width=U.naturalWidth||U.width,_.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(_.width=U.displayWidth,_.height=U.displayHeight):(_.width=U.width,_.height=U.height),_}this.allocateTextureUnit=J,this.resetTextureUnits=Q,this.setTexture2D=ut,this.setTexture2DArray=H,this.setTexture3D=rt,this.setTextureCube=$,this.rebindTextures=wt,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=Bt,this.updateMultisampleRenderTarget=hn,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Kt}function ZR(o,e){function i(r,u=fs){let f;const h=we.getTransfer(u);if(r===Ai)return o.UNSIGNED_BYTE;if(r===Lp)return o.UNSIGNED_SHORT_4_4_4_4;if(r===Op)return o.UNSIGNED_SHORT_5_5_5_1;if(r===dx)return o.UNSIGNED_INT_5_9_9_9_REV;if(r===fx)return o.BYTE;if(r===hx)return o.SHORT;if(r===Tl)return o.UNSIGNED_SHORT;if(r===Np)return o.INT;if(r===$s)return o.UNSIGNED_INT;if(r===ba)return o.FLOAT;if(r===tr)return o.HALF_FLOAT;if(r===px)return o.ALPHA;if(r===mx)return o.RGB;if(r===ci)return o.RGBA;if(r===gx)return o.LUMINANCE;if(r===_x)return o.LUMINANCE_ALPHA;if(r===uo)return o.DEPTH_COMPONENT;if(r===xo)return o.DEPTH_STENCIL;if(r===vx)return o.RED;if(r===Pp)return o.RED_INTEGER;if(r===xx)return o.RG;if(r===zp)return o.RG_INTEGER;if(r===Ip)return o.RGBA_INTEGER;if(r===Sc||r===yc||r===Mc||r===Ec)if(h===Be)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(r===Sc)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===yc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Mc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ec)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(r===Sc)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===yc)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Mc)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ec)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ip||r===ap||r===sp||r===rp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(r===ip)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ap)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===sp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===rp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===op||r===lp||r===up)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(r===op||r===lp)return h===Be?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(r===up)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===cp||r===fp||r===hp||r===dp||r===pp||r===mp||r===gp||r===_p||r===vp||r===xp||r===Sp||r===yp||r===Mp||r===Ep)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(r===cp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===fp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===hp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===dp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===pp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===mp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===gp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===_p)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===vp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===xp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Sp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===yp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Mp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ep)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Tc||r===Tp||r===bp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(r===Tc)return h===Be?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Tp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===bp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Sx||r===Ap||r===Rp||r===Cp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(r===Tc)return f.COMPRESSED_RED_RGTC1_EXT;if(r===Ap)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Rp)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Cp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===vo?o.UNSIGNED_INT_24_8:o[r]!==void 0?o[r]:null}return{convert:i}}const KR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,QR=`
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

}`;class JR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,r){if(this.texture===null){const u=new qn,f=e.properties.get(u);f.__webglTexture=i.texture,(i.depthNear!==r.depthNear||i.depthFar!==r.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=u}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new ui({vertexShader:KR,fragmentShader:QR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ji(new Uc(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $R extends nr{constructor(e,i){super();const r=this;let u=null,f=1,h=null,d="local-floor",p=1,_=null,v=null,m=null,x=null,M=null,A=null;const D=new JR,y=i.getContextAttributes();let S=null,I=null;const z=[],N=[],K=new oe;let V=null;const P=new Ti;P.viewport=new an;const k=new Ti;k.viewport=new an;const w=[P,k],E=new xT;let L=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(C){let j=z[C];return j===void 0&&(j=new Nd,z[C]=j),j.getTargetRaySpace()},this.getControllerGrip=function(C){let j=z[C];return j===void 0&&(j=new Nd,z[C]=j),j.getGripSpace()},this.getHand=function(C){let j=z[C];return j===void 0&&(j=new Nd,z[C]=j),j.getHandSpace()};function J(C){const j=N.indexOf(C.inputSource);if(j===-1)return;const mt=z[j];mt!==void 0&&(mt.update(C.inputSource,C.frame,_||h),mt.dispatchEvent({type:C.type,data:C.inputSource}))}function lt(){u.removeEventListener("select",J),u.removeEventListener("selectstart",J),u.removeEventListener("selectend",J),u.removeEventListener("squeeze",J),u.removeEventListener("squeezestart",J),u.removeEventListener("squeezeend",J),u.removeEventListener("end",lt),u.removeEventListener("inputsourceschange",ut);for(let C=0;C<z.length;C++){const j=N[C];j!==null&&(N[C]=null,z[C].disconnect(j))}L=null,Q=null,D.reset(),e.setRenderTarget(S),M=null,x=null,m=null,u=null,I=null,Te.stop(),r.isPresenting=!1,e.setPixelRatio(V),e.setSize(K.width,K.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(C){f=C,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(C){d=C,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return _||h},this.setReferenceSpace=function(C){_=C},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return m},this.getFrame=function(){return A},this.getSession=function(){return u},this.setSession=async function(C){if(u=C,u!==null){if(S=e.getRenderTarget(),u.addEventListener("select",J),u.addEventListener("selectstart",J),u.addEventListener("selectend",J),u.addEventListener("squeeze",J),u.addEventListener("squeezestart",J),u.addEventListener("squeezeend",J),u.addEventListener("end",lt),u.addEventListener("inputsourceschange",ut),y.xrCompatible!==!0&&await i.makeXRCompatible(),V=e.getPixelRatio(),e.getSize(K),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,ft=null,bt=null;y.depth&&(bt=y.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,mt=y.stencil?xo:uo,ft=y.stencil?vo:$s);const kt={colorFormat:i.RGBA8,depthFormat:bt,scaleFactor:f};m=new XRWebGLBinding(u,i),x=m.createProjectionLayer(kt),u.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),I=new ps(x.textureWidth,x.textureHeight,{format:ci,type:Ai,depthTexture:new Ox(x.textureWidth,x.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const mt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:f};M=new XRWebGLLayer(u,i,mt),u.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new ps(M.framebufferWidth,M.framebufferHeight,{format:ci,type:Ai,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(p),_=null,h=await u.requestReferenceSpace(d),Te.setContext(u),Te.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(u!==null)return u.environmentBlendMode},this.getDepthTexture=function(){return D.getDepthTexture()};function ut(C){for(let j=0;j<C.removed.length;j++){const mt=C.removed[j],ft=N.indexOf(mt);ft>=0&&(N[ft]=null,z[ft].disconnect(mt))}for(let j=0;j<C.added.length;j++){const mt=C.added[j];let ft=N.indexOf(mt);if(ft===-1){for(let kt=0;kt<z.length;kt++)if(kt>=N.length){N.push(mt),ft=kt;break}else if(N[kt]===null){N[kt]=mt,ft=kt;break}if(ft===-1)break}const bt=z[ft];bt&&bt.connect(mt)}}const H=new nt,rt=new nt;function $(C,j,mt){H.setFromMatrixPosition(j.matrixWorld),rt.setFromMatrixPosition(mt.matrixWorld);const ft=H.distanceTo(rt),bt=j.projectionMatrix.elements,kt=mt.projectionMatrix.elements,wt=bt[14]/(bt[10]-1),Rt=bt[14]/(bt[10]+1),Bt=(bt[9]+1)/bt[5],se=(bt[9]-1)/bt[5],F=(bt[8]-1)/bt[0],hn=(kt[8]+1)/kt[0],ae=wt*F,Kt=wt*hn,Ct=ft/(-F+hn),Se=Ct*-F;if(j.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(Se),C.translateZ(Ct),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert(),bt[10]===-1)C.projectionMatrix.copy(j.projectionMatrix),C.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const qt=wt+Ct,U=Rt+Ct,b=ae-Se,it=Kt+(ft-Se),gt=Bt*Rt/U*qt,vt=se*Rt/U*qt;C.projectionMatrix.makePerspective(b,it,gt,vt,qt,U),C.projectionMatrixInverse.copy(C.projectionMatrix).invert()}}function xt(C,j){j===null?C.matrixWorld.copy(C.matrix):C.matrixWorld.multiplyMatrices(j.matrixWorld,C.matrix),C.matrixWorldInverse.copy(C.matrixWorld).invert()}this.updateCamera=function(C){if(u===null)return;let j=C.near,mt=C.far;D.texture!==null&&(D.depthNear>0&&(j=D.depthNear),D.depthFar>0&&(mt=D.depthFar)),E.near=k.near=P.near=j,E.far=k.far=P.far=mt,(L!==E.near||Q!==E.far)&&(u.updateRenderState({depthNear:E.near,depthFar:E.far}),L=E.near,Q=E.far),P.layers.mask=C.layers.mask|2,k.layers.mask=C.layers.mask|4,E.layers.mask=P.layers.mask|k.layers.mask;const ft=C.parent,bt=E.cameras;xt(E,ft);for(let kt=0;kt<bt.length;kt++)xt(bt[kt],ft);bt.length===2?$(E,P,k):E.projectionMatrix.copy(P.projectionMatrix),yt(C,E,ft)};function yt(C,j,mt){mt===null?C.matrix.copy(j.matrixWorld):(C.matrix.copy(mt.matrixWorld),C.matrix.invert(),C.matrix.multiply(j.matrixWorld)),C.matrix.decompose(C.position,C.quaternion,C.scale),C.updateMatrixWorld(!0),C.projectionMatrix.copy(j.projectionMatrix),C.projectionMatrixInverse.copy(j.projectionMatrixInverse),C.isPerspectiveCamera&&(C.fov=bl*2*Math.atan(1/C.projectionMatrix.elements[5]),C.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(C){p=C,x!==null&&(x.fixedFoveation=C),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=C)},this.hasDepthSensing=function(){return D.texture!==null},this.getDepthSensingMesh=function(){return D.getMesh(E)};let Gt=null;function ee(C,j){if(v=j.getViewerPose(_||h),A=j,v!==null){const mt=v.views;M!==null&&(e.setRenderTargetFramebuffer(I,M.framebuffer),e.setRenderTarget(I));let ft=!1;mt.length!==E.cameras.length&&(E.cameras.length=0,ft=!0);for(let wt=0;wt<mt.length;wt++){const Rt=mt[wt];let Bt=null;if(M!==null)Bt=M.getViewport(Rt);else{const F=m.getViewSubImage(x,Rt);Bt=F.viewport,wt===0&&(e.setRenderTargetTextures(I,F.colorTexture,x.ignoreDepthValues?void 0:F.depthStencilTexture),e.setRenderTarget(I))}let se=w[wt];se===void 0&&(se=new Ti,se.layers.enable(wt),se.viewport=new an,w[wt]=se),se.matrix.fromArray(Rt.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(Rt.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),wt===0&&(E.matrix.copy(se.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ft===!0&&E.cameras.push(se)}const bt=u.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&u.depthUsage=="gpu-optimized"&&m){const wt=m.getDepthInformation(mt[0]);wt&&wt.isValid&&wt.texture&&D.init(e,wt,u.renderState)}}for(let mt=0;mt<z.length;mt++){const ft=N[mt],bt=z[mt];ft!==null&&bt!==void 0&&bt.update(ft,j,_||h)}Gt&&Gt(C,j),j.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:j}),A=null}const Te=new zx;Te.setAnimationLoop(ee),this.setAnimationLoop=function(C){Gt=C},this.dispose=function(){}}}const qs=new Da,t2=new fn;function e2(o,e){function i(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function r(y,S){S.color.getRGB(y.fogColor.value,wx(o)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function u(y,S,I,z,N){S.isMeshBasicMaterial||S.isMeshLambertMaterial?f(y,S):S.isMeshToonMaterial?(f(y,S),m(y,S)):S.isMeshPhongMaterial?(f(y,S),v(y,S)):S.isMeshStandardMaterial?(f(y,S),x(y,S),S.isMeshPhysicalMaterial&&M(y,S,N)):S.isMeshMatcapMaterial?(f(y,S),A(y,S)):S.isMeshDepthMaterial?f(y,S):S.isMeshDistanceMaterial?(f(y,S),D(y,S)):S.isMeshNormalMaterial?f(y,S):S.isLineBasicMaterial?(h(y,S),S.isLineDashedMaterial&&d(y,S)):S.isPointsMaterial?p(y,S,I,z):S.isSpriteMaterial?_(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function f(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,i(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===Jn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,i(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===Jn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,i(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,i(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const I=e.get(S),z=I.envMap,N=I.envMapRotation;z&&(y.envMap.value=z,qs.copy(N),qs.x*=-1,qs.y*=-1,qs.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),y.envMapRotation.value.setFromMatrix4(t2.makeRotationFromEuler(qs)),y.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,y.aoMapTransform))}function h(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform))}function d(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function p(y,S,I,z){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*I,y.scale.value=z*.5,S.map&&(y.map.value=S.map,i(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function _(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function v(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function m(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function x(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function M(y,S,I){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Jn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,y.specularIntensityMapTransform))}function A(y,S){S.matcap&&(y.matcap.value=S.matcap)}function D(y,S){const I=e.get(S).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:u}}function n2(o,e,i,r){let u={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(I,z){const N=z.program;r.uniformBlockBinding(I,N)}function _(I,z){let N=u[I.id];N===void 0&&(A(I),N=v(I),u[I.id]=N,I.addEventListener("dispose",y));const K=z.program;r.updateUBOMapping(I,K);const V=e.render.frame;f[I.id]!==V&&(x(I),f[I.id]=V)}function v(I){const z=m();I.__bindingPointIndex=z;const N=o.createBuffer(),K=I.__size,V=I.usage;return o.bindBuffer(o.UNIFORM_BUFFER,N),o.bufferData(o.UNIFORM_BUFFER,K,V),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,z,N),N}function m(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const z=u[I.id],N=I.uniforms,K=I.__cache;o.bindBuffer(o.UNIFORM_BUFFER,z);for(let V=0,P=N.length;V<P;V++){const k=Array.isArray(N[V])?N[V]:[N[V]];for(let w=0,E=k.length;w<E;w++){const L=k[w];if(M(L,V,w,K)===!0){const Q=L.__offset,J=Array.isArray(L.value)?L.value:[L.value];let lt=0;for(let ut=0;ut<J.length;ut++){const H=J[ut],rt=D(H);typeof H=="number"||typeof H=="boolean"?(L.__data[0]=H,o.bufferSubData(o.UNIFORM_BUFFER,Q+lt,L.__data)):H.isMatrix3?(L.__data[0]=H.elements[0],L.__data[1]=H.elements[1],L.__data[2]=H.elements[2],L.__data[3]=0,L.__data[4]=H.elements[3],L.__data[5]=H.elements[4],L.__data[6]=H.elements[5],L.__data[7]=0,L.__data[8]=H.elements[6],L.__data[9]=H.elements[7],L.__data[10]=H.elements[8],L.__data[11]=0):(H.toArray(L.__data,lt),lt+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,Q,L.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(I,z,N,K){const V=I.value,P=z+"_"+N;if(K[P]===void 0)return typeof V=="number"||typeof V=="boolean"?K[P]=V:K[P]=V.clone(),!0;{const k=K[P];if(typeof V=="number"||typeof V=="boolean"){if(k!==V)return K[P]=V,!0}else if(k.equals(V)===!1)return k.copy(V),!0}return!1}function A(I){const z=I.uniforms;let N=0;const K=16;for(let P=0,k=z.length;P<k;P++){const w=Array.isArray(z[P])?z[P]:[z[P]];for(let E=0,L=w.length;E<L;E++){const Q=w[E],J=Array.isArray(Q.value)?Q.value:[Q.value];for(let lt=0,ut=J.length;lt<ut;lt++){const H=J[lt],rt=D(H),$=N%K,xt=$%rt.boundary,yt=$+xt;N+=xt,yt!==0&&K-yt<rt.storage&&(N+=K-yt),Q.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=N,N+=rt.storage}}}const V=N%K;return V>0&&(N+=K-V),I.__size=N,I.__cache={},this}function D(I){const z={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(z.boundary=4,z.storage=4):I.isVector2?(z.boundary=8,z.storage=8):I.isVector3||I.isColor?(z.boundary=16,z.storage=12):I.isVector4?(z.boundary=16,z.storage=16):I.isMatrix3?(z.boundary=48,z.storage=48):I.isMatrix4?(z.boundary=64,z.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),z}function y(I){const z=I.target;z.removeEventListener("dispose",y);const N=h.indexOf(z.__bindingPointIndex);h.splice(N,1),o.deleteBuffer(u[z.id]),delete u[z.id],delete f[z.id]}function S(){for(const I in u)o.deleteBuffer(u[I]);h=[],u={},f={}}return{bind:p,update:_,dispose:S}}class i2{constructor(e={}){const{canvas:i=FE(),context:r=null,depth:u=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:_=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:m=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=h;const A=new Uint32Array(4),D=new Int32Array(4);let y=null,S=null;const I=[],z=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ei,this.toneMapping=Ra,this.toneMappingExposure=1;const N=this;let K=!1,V=0,P=0,k=null,w=-1,E=null;const L=new an,Q=new an;let J=null;const lt=new He(0);let ut=0,H=i.width,rt=i.height,$=1,xt=null,yt=null;const Gt=new an(0,0,H,rt),ee=new an(0,0,H,rt);let Te=!1;const C=new Lx;let j=!1,mt=!1;this.transmissionResolutionScale=1;const ft=new fn,bt=new fn,kt=new nt,wt=new an,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Bt=!1;function se(){return k===null?$:1}let F=r;function hn(R,W){return i.getContext(R,W)}try{const R={alpha:!0,depth:u,stencil:f,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:_,powerPreference:v,failIfMajorPerformanceCaveat:m};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Up}`),i.addEventListener("webglcontextlost",_t,!1),i.addEventListener("webglcontextrestored",Pt,!1),i.addEventListener("webglcontextcreationerror",It,!1),F===null){const W="webgl2";if(F=hn(W,R),F===null)throw hn(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ae,Kt,Ct,Se,qt,U,b,it,gt,vt,pt,Yt,Lt,zt,ge,Et,Vt,Jt,te,Ht,pe,le,ze,G;function Ot(){ae=new dA(F),ae.init(),le=new ZR(F,ae),Kt=new rA(F,ae,e,le),Ct=new WR(F,ae),Kt.reverseDepthBuffer&&x&&Ct.buffers.depth.setReversed(!0),Se=new gA(F),qt=new OR,U=new jR(F,ae,Ct,qt,Kt,le,Se),b=new lA(N),it=new hA(N),gt=new MT(F),ze=new aA(F,gt),vt=new pA(F,gt,Se,ze),pt=new vA(F,vt,gt,Se),te=new _A(F,Kt,U),Et=new oA(qt),Yt=new LR(N,b,it,ae,Kt,ze,Et),Lt=new e2(N,qt),zt=new zR,ge=new VR(ae),Jt=new iA(N,b,it,Ct,pt,M,p),Vt=new qR(N,pt,Kt),G=new n2(F,Se,Kt,Ct),Ht=new sA(F,ae,Se),pe=new mA(F,ae,Se),Se.programs=Yt.programs,N.capabilities=Kt,N.extensions=ae,N.properties=qt,N.renderLists=zt,N.shadowMap=Vt,N.state=Ct,N.info=Se}Ot();const ct=new $R(N,F);this.xr=ct,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const R=ae.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ae.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(R){R!==void 0&&($=R,this.setSize(H,rt,!1))},this.getSize=function(R){return R.set(H,rt)},this.setSize=function(R,W,st=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=R,rt=W,i.width=Math.floor(R*$),i.height=Math.floor(W*$),st===!0&&(i.style.width=R+"px",i.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(H*$,rt*$).floor()},this.setDrawingBufferSize=function(R,W,st){H=R,rt=W,$=st,i.width=Math.floor(R*st),i.height=Math.floor(W*st),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(Gt)},this.setViewport=function(R,W,st,ot){R.isVector4?Gt.set(R.x,R.y,R.z,R.w):Gt.set(R,W,st,ot),Ct.viewport(L.copy(Gt).multiplyScalar($).round())},this.getScissor=function(R){return R.copy(ee)},this.setScissor=function(R,W,st,ot){R.isVector4?ee.set(R.x,R.y,R.z,R.w):ee.set(R,W,st,ot),Ct.scissor(Q.copy(ee).multiplyScalar($).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(R){Ct.setScissorTest(Te=R)},this.setOpaqueSort=function(R){xt=R},this.setTransparentSort=function(R){yt=R},this.getClearColor=function(R){return R.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,st=!0){let ot=0;if(R){let Z=!1;if(k!==null){const Mt=k.texture.format;Z=Mt===Ip||Mt===zp||Mt===Pp}if(Z){const Mt=k.texture.type,At=Mt===Ai||Mt===$s||Mt===Tl||Mt===vo||Mt===Lp||Mt===Op,Tt=Jt.getClearColor(),Ut=Jt.getClearAlpha(),Qt=Tt.r,ne=Tt.g,Zt=Tt.b;At?(A[0]=Qt,A[1]=ne,A[2]=Zt,A[3]=Ut,F.clearBufferuiv(F.COLOR,0,A)):(D[0]=Qt,D[1]=ne,D[2]=Zt,D[3]=Ut,F.clearBufferiv(F.COLOR,0,D))}else ot|=F.COLOR_BUFFER_BIT}W&&(ot|=F.DEPTH_BUFFER_BIT),st&&(ot|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_t,!1),i.removeEventListener("webglcontextrestored",Pt,!1),i.removeEventListener("webglcontextcreationerror",It,!1),Jt.dispose(),zt.dispose(),ge.dispose(),qt.dispose(),b.dispose(),it.dispose(),pt.dispose(),ze.dispose(),G.dispose(),Yt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",On),ct.removeEventListener("sessionend",Cl),$i.stop()};function _t(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),K=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),K=!1;const R=Se.autoReset,W=Vt.enabled,st=Vt.autoUpdate,ot=Vt.needsUpdate,Z=Vt.type;Ot(),Se.autoReset=R,Vt.enabled=W,Vt.autoUpdate=st,Vt.needsUpdate=ot,Vt.type=Z}function It(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function re(R){const W=R.target;W.removeEventListener("dispose",re),Ze(W)}function Ze(R){vn(R),qt.remove(R)}function vn(R){const W=qt.get(R).programs;W!==void 0&&(W.forEach(function(st){Yt.releaseProgram(st)}),R.isShaderMaterial&&Yt.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,st,ot,Z,Mt){W===null&&(W=Rt);const At=Z.isMesh&&Z.matrixWorld.determinant()<0,Tt=Lc(R,W,st,ot,Z);Ct.setMaterial(ot,At);let Ut=st.index,Qt=1;if(ot.wireframe===!0){if(Ut=vt.getWireframeAttribute(st),Ut===void 0)return;Qt=2}const ne=st.drawRange,Zt=st.attributes.position;let Ae=ne.start*Qt,Ce=(ne.start+ne.count)*Qt;Mt!==null&&(Ae=Math.max(Ae,Mt.start*Qt),Ce=Math.min(Ce,(Mt.start+Mt.count)*Qt)),Ut!==null?(Ae=Math.max(Ae,0),Ce=Math.min(Ce,Ut.count)):Zt!=null&&(Ae=Math.max(Ae,0),Ce=Math.min(Ce,Zt.count));const Xe=Ce-Ae;if(Xe<0||Xe===1/0)return;ze.setup(Z,ot,Tt,st,Ut);let Ge,_e=Ht;if(Ut!==null&&(Ge=gt.get(Ut),_e=pe,_e.setIndex(Ge)),Z.isMesh)ot.wireframe===!0?(Ct.setLineWidth(ot.wireframeLinewidth*se()),_e.setMode(F.LINES)):_e.setMode(F.TRIANGLES);else if(Z.isLine){let Wt=ot.linewidth;Wt===void 0&&(Wt=1),Ct.setLineWidth(Wt*se()),Z.isLineSegments?_e.setMode(F.LINES):Z.isLineLoop?_e.setMode(F.LINE_LOOP):_e.setMode(F.LINE_STRIP)}else Z.isPoints?_e.setMode(F.POINTS):Z.isSprite&&_e.setMode(F.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Ys("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_e.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))_e.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Wt=Z._multiDrawStarts,Ke=Z._multiDrawCounts,ye=Z._multiDrawCount,Sn=Ut?gt.get(Ut).bytesPerElement:1,je=qt.get(ot).currentProgram.getUniforms();for(let Pn=0;Pn<ye;Pn++)je.setValue(F,"_gl_DrawID",Pn),_e.render(Wt[Pn]/Sn,Ke[Pn])}else if(Z.isInstancedMesh)_e.renderInstances(Ae,Xe,Z.count);else if(st.isInstancedBufferGeometry){const Wt=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,Ke=Math.min(st.instanceCount,Wt);_e.renderInstances(Ae,Xe,Ke)}else _e.render(Ae,Xe)};function be(R,W,st){R.transparent===!0&&R.side===Ea&&R.forceSinglePass===!1?(R.side=Jn,R.needsUpdate=!0,ea(R,W,st),R.side=ds,R.needsUpdate=!0,ea(R,W,st),R.side=Ea):ea(R,W,st)}this.compile=function(R,W,st=null){st===null&&(st=R),S=ge.get(st),S.init(W),z.push(S),st.traverseVisible(function(Z){Z.isLight&&Z.layers.test(W.layers)&&(S.pushLight(Z),Z.castShadow&&S.pushShadow(Z))}),R!==st&&R.traverseVisible(function(Z){Z.isLight&&Z.layers.test(W.layers)&&(S.pushLight(Z),Z.castShadow&&S.pushShadow(Z))}),S.setupLights();const ot=new Set;return R.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Mt=Z.material;if(Mt)if(Array.isArray(Mt))for(let At=0;At<Mt.length;At++){const Tt=Mt[At];be(Tt,st,Z),ot.add(Tt)}else be(Mt,st,Z),ot.add(Mt)}),S=z.pop(),ot},this.compileAsync=function(R,W,st=null){const ot=this.compile(R,W,st);return new Promise(Z=>{function Mt(){if(ot.forEach(function(At){qt.get(At).currentProgram.isReady()&&ot.delete(At)}),ot.size===0){Z(R);return}setTimeout(Mt,10)}ae.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let We=null;function xn(R){We&&We(R)}function On(){$i.stop()}function Cl(){$i.start()}const $i=new zx;$i.setAnimationLoop(xn),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(R){We=R,ct.setAnimationLoop(R),R===null?$i.stop():$i.start()},ct.addEventListener("sessionstart",On),ct.addEventListener("sessionend",Cl),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(K===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(W),W=ct.getCamera()),R.isScene===!0&&R.onBeforeRender(N,R,W,k),S=ge.get(R,z.length),S.init(W),z.push(S),bt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),C.setFromProjectionMatrix(bt),mt=this.localClippingEnabled,j=Et.init(this.clippingPlanes,mt),y=zt.get(R,I.length),y.init(),I.push(y),ct.enabled===!0&&ct.isPresenting===!0){const Mt=N.xr.getDepthSensingMesh();Mt!==null&&Eo(Mt,W,-1/0,N.sortObjects)}Eo(R,W,0,N.sortObjects),y.finish(),N.sortObjects===!0&&y.sort(xt,yt),Bt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Bt&&Jt.addToRenderList(y,R),this.info.render.frame++,j===!0&&Et.beginShadows();const st=S.state.shadowsArray;Vt.render(st,R,W),j===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset();const ot=y.opaque,Z=y.transmissive;if(S.setupLights(),W.isArrayCamera){const Mt=W.cameras;if(Z.length>0)for(let At=0,Tt=Mt.length;At<Tt;At++){const Ut=Mt[At];vs(ot,Z,R,Ut)}Bt&&Jt.render(R);for(let At=0,Tt=Mt.length;At<Tt;At++){const Ut=Mt[At];_s(y,R,Ut,Ut.viewport)}}else Z.length>0&&vs(ot,Z,R,W),Bt&&Jt.render(R),_s(y,R,W);k!==null&&P===0&&(U.updateMultisampleRenderTarget(k),U.updateRenderTargetMipmap(k)),R.isScene===!0&&R.onAfterRender(N,R,W),ze.resetDefaultState(),w=-1,E=null,z.pop(),z.length>0?(S=z[z.length-1],j===!0&&Et.setGlobalState(N.clippingPlanes,S.state.camera)):S=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function Eo(R,W,st,ot){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)st=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||C.intersectsSprite(R)){ot&&wt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(bt);const At=pt.update(R),Tt=R.material;Tt.visible&&y.push(R,At,Tt,st,wt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||C.intersectsObject(R))){const At=pt.update(R),Tt=R.material;if(ot&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),wt.copy(R.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),wt.copy(At.boundingSphere.center)),wt.applyMatrix4(R.matrixWorld).applyMatrix4(bt)),Array.isArray(Tt)){const Ut=At.groups;for(let Qt=0,ne=Ut.length;Qt<ne;Qt++){const Zt=Ut[Qt],Ae=Tt[Zt.materialIndex];Ae&&Ae.visible&&y.push(R,At,Ae,st,wt.z,Zt)}}else Tt.visible&&y.push(R,At,Tt,st,wt.z,null)}}const Mt=R.children;for(let At=0,Tt=Mt.length;At<Tt;At++)Eo(Mt[At],W,st,ot)}function _s(R,W,st,ot){const Z=R.opaque,Mt=R.transmissive,At=R.transparent;S.setupLightsView(st),j===!0&&Et.setGlobalState(N.clippingPlanes,st),ot&&Ct.viewport(L.copy(ot)),Z.length>0&&ta(Z,W,st),Mt.length>0&&ta(Mt,W,st),At.length>0&&ta(At,W,st),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function vs(R,W,st,ot){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[ot.id]===void 0&&(S.state.transmissionRenderTarget[ot.id]=new ps(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?tr:Ai,minFilter:Qs,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const Mt=S.state.transmissionRenderTarget[ot.id],At=ot.viewport||L;Mt.setSize(At.z*N.transmissionResolutionScale,At.w*N.transmissionResolutionScale);const Tt=N.getRenderTarget();N.setRenderTarget(Mt),N.getClearColor(lt),ut=N.getClearAlpha(),ut<1&&N.setClearColor(16777215,.5),N.clear(),Bt&&Jt.render(st);const Ut=N.toneMapping;N.toneMapping=Ra;const Qt=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),S.setupLightsView(ot),j===!0&&Et.setGlobalState(N.clippingPlanes,ot),ta(R,st,ot),U.updateMultisampleRenderTarget(Mt),U.updateRenderTargetMipmap(Mt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let Zt=0,Ae=W.length;Zt<Ae;Zt++){const Ce=W[Zt],Xe=Ce.object,Ge=Ce.geometry,_e=Ce.material,Wt=Ce.group;if(_e.side===Ea&&Xe.layers.test(ot.layers)){const Ke=_e.side;_e.side=Jn,_e.needsUpdate=!0,Fi(Xe,st,ot,Ge,_e,Wt),_e.side=Ke,_e.needsUpdate=!0,ne=!0}}ne===!0&&(U.updateMultisampleRenderTarget(Mt),U.updateRenderTargetMipmap(Mt))}N.setRenderTarget(Tt),N.setClearColor(lt,ut),Qt!==void 0&&(ot.viewport=Qt),N.toneMapping=Ut}function ta(R,W,st){const ot=W.isScene===!0?W.overrideMaterial:null;for(let Z=0,Mt=R.length;Z<Mt;Z++){const At=R[Z],Tt=At.object,Ut=At.geometry,Qt=ot===null?At.material:ot,ne=At.group;Tt.layers.test(st.layers)&&Fi(Tt,W,st,Ut,Qt,ne)}}function Fi(R,W,st,ot,Z,Mt){R.onBeforeRender(N,W,st,ot,Z,Mt),R.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Z.onBeforeRender(N,W,st,ot,R,Mt),Z.transparent===!0&&Z.side===Ea&&Z.forceSinglePass===!1?(Z.side=Jn,Z.needsUpdate=!0,N.renderBufferDirect(st,W,ot,Z,R,Mt),Z.side=ds,Z.needsUpdate=!0,N.renderBufferDirect(st,W,ot,Z,R,Mt),Z.side=Ea):N.renderBufferDirect(st,W,ot,Z,R,Mt),R.onAfterRender(N,W,st,ot,Z,Mt)}function ea(R,W,st){W.isScene!==!0&&(W=Rt);const ot=qt.get(R),Z=S.state.lights,Mt=S.state.shadowsArray,At=Z.state.version,Tt=Yt.getParameters(R,Z.state,Mt,W,st),Ut=Yt.getProgramCacheKey(Tt);let Qt=ot.programs;ot.environment=R.isMeshStandardMaterial?W.environment:null,ot.fog=W.fog,ot.envMap=(R.isMeshStandardMaterial?it:b).get(R.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,Qt===void 0&&(R.addEventListener("dispose",re),Qt=new Map,ot.programs=Qt);let ne=Qt.get(Ut);if(ne!==void 0){if(ot.currentProgram===ne&&ot.lightsStateVersion===At)return To(R,Tt),ne}else Tt.uniforms=Yt.getUniforms(R),R.onBeforeCompile(Tt,N),ne=Yt.acquireProgram(Tt,Ut),Qt.set(Ut,ne),ot.uniforms=Tt.uniforms;const Zt=ot.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Zt.clippingPlanes=Et.uniform),To(R,Tt),ot.needsLights=bo(R),ot.lightsStateVersion=At,ot.needsLights&&(Zt.ambientLightColor.value=Z.state.ambient,Zt.lightProbe.value=Z.state.probe,Zt.directionalLights.value=Z.state.directional,Zt.directionalLightShadows.value=Z.state.directionalShadow,Zt.spotLights.value=Z.state.spot,Zt.spotLightShadows.value=Z.state.spotShadow,Zt.rectAreaLights.value=Z.state.rectArea,Zt.ltc_1.value=Z.state.rectAreaLTC1,Zt.ltc_2.value=Z.state.rectAreaLTC2,Zt.pointLights.value=Z.state.point,Zt.pointLightShadows.value=Z.state.pointShadow,Zt.hemisphereLights.value=Z.state.hemi,Zt.directionalShadowMap.value=Z.state.directionalShadowMap,Zt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Zt.spotShadowMap.value=Z.state.spotShadowMap,Zt.spotLightMatrix.value=Z.state.spotLightMatrix,Zt.spotLightMap.value=Z.state.spotLightMap,Zt.pointShadowMap.value=Z.state.pointShadowMap,Zt.pointShadowMatrix.value=Z.state.pointShadowMatrix),ot.currentProgram=ne,ot.uniformsList=null,ne}function wa(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=bc.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function To(R,W){const st=qt.get(R);st.outputColorSpace=W.outputColorSpace,st.batching=W.batching,st.batchingColor=W.batchingColor,st.instancing=W.instancing,st.instancingColor=W.instancingColor,st.instancingMorph=W.instancingMorph,st.skinning=W.skinning,st.morphTargets=W.morphTargets,st.morphNormals=W.morphNormals,st.morphColors=W.morphColors,st.morphTargetsCount=W.morphTargetsCount,st.numClippingPlanes=W.numClippingPlanes,st.numIntersection=W.numClipIntersection,st.vertexAlphas=W.vertexAlphas,st.vertexTangents=W.vertexTangents,st.toneMapping=W.toneMapping}function Lc(R,W,st,ot,Z){W.isScene!==!0&&(W=Rt),U.resetTextureUnits();const Mt=W.fog,At=ot.isMeshStandardMaterial?W.environment:null,Tt=k===null?N.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:er,Ut=(ot.isMeshStandardMaterial?it:b).get(ot.envMap||At),Qt=ot.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,ne=!!st.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Zt=!!st.morphAttributes.position,Ae=!!st.morphAttributes.normal,Ce=!!st.morphAttributes.color;let Xe=Ra;ot.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Xe=N.toneMapping);const Ge=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,_e=Ge!==void 0?Ge.length:0,Wt=qt.get(ot),Ke=S.state.lights;if(j===!0&&(mt===!0||R!==E)){const An=R===E&&ot.id===w;Et.setState(ot,R,An)}let ye=!1;ot.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Ke.state.version||Wt.outputColorSpace!==Tt||Z.isBatchedMesh&&Wt.batching===!1||!Z.isBatchedMesh&&Wt.batching===!0||Z.isBatchedMesh&&Wt.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Wt.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Wt.instancing===!1||!Z.isInstancedMesh&&Wt.instancing===!0||Z.isSkinnedMesh&&Wt.skinning===!1||!Z.isSkinnedMesh&&Wt.skinning===!0||Z.isInstancedMesh&&Wt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Wt.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Wt.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Wt.instancingMorph===!1&&Z.morphTexture!==null||Wt.envMap!==Ut||ot.fog===!0&&Wt.fog!==Mt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==Et.numPlanes||Wt.numIntersection!==Et.numIntersection)||Wt.vertexAlphas!==Qt||Wt.vertexTangents!==ne||Wt.morphTargets!==Zt||Wt.morphNormals!==Ae||Wt.morphColors!==Ce||Wt.toneMapping!==Xe||Wt.morphTargetsCount!==_e)&&(ye=!0):(ye=!0,Wt.__version=ot.version);let Sn=Wt.currentProgram;ye===!0&&(Sn=ea(ot,W,Z));let je=!1,Pn=!1,Ua=!1;const Ve=Sn.getUniforms(),sn=Wt.uniforms;if(Ct.useProgram(Sn.program)&&(je=!0,Pn=!0,Ua=!0),ot.id!==w&&(w=ot.id,Pn=!0),je||E!==R){Ct.buffers.depth.getReversed()?(ft.copy(R.projectionMatrix),GE(ft),VE(ft),Ve.setValue(F,"projectionMatrix",ft)):Ve.setValue(F,"projectionMatrix",R.projectionMatrix),Ve.setValue(F,"viewMatrix",R.matrixWorldInverse);const Rn=Ve.map.cameraPosition;Rn!==void 0&&Rn.setValue(F,kt.setFromMatrixPosition(R.matrixWorld)),Kt.logarithmicDepthBuffer&&Ve.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Ve.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,Pn=!0,Ua=!0)}if(Z.isSkinnedMesh){Ve.setOptional(F,Z,"bindMatrix"),Ve.setOptional(F,Z,"bindMatrixInverse");const An=Z.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),Ve.setValue(F,"boneTexture",An.boneTexture,U))}Z.isBatchedMesh&&(Ve.setOptional(F,Z,"batchingTexture"),Ve.setValue(F,"batchingTexture",Z._matricesTexture,U),Ve.setOptional(F,Z,"batchingIdTexture"),Ve.setValue(F,"batchingIdTexture",Z._indirectTexture,U),Ve.setOptional(F,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Ve.setValue(F,"batchingColorTexture",Z._colorsTexture,U));const dn=st.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&te.update(Z,st,Sn),(Pn||Wt.receiveShadow!==Z.receiveShadow)&&(Wt.receiveShadow=Z.receiveShadow,Ve.setValue(F,"receiveShadow",Z.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(sn.envMap.value=Ut,sn.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&W.environment!==null&&(sn.envMapIntensity.value=W.environmentIntensity),Pn&&(Ve.setValue(F,"toneMappingExposure",N.toneMappingExposure),Wt.needsLights&&Dl(sn,Ua),Mt&&ot.fog===!0&&Lt.refreshFogUniforms(sn,Mt),Lt.refreshMaterialUniforms(sn,ot,$,rt,S.state.transmissionRenderTarget[R.id]),bc.upload(F,wa(Wt),sn,U)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(bc.upload(F,wa(Wt),sn,U),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Ve.setValue(F,"center",Z.center),Ve.setValue(F,"modelViewMatrix",Z.modelViewMatrix),Ve.setValue(F,"normalMatrix",Z.normalMatrix),Ve.setValue(F,"modelMatrix",Z.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const An=ot.uniformsGroups;for(let Rn=0,ir=An.length;Rn<ir;Rn++){const na=An[Rn];G.update(na,Sn),G.bind(na,Sn)}}return Sn}function Dl(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function bo(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(R,W,st){qt.get(R.texture).__webglTexture=W,qt.get(R.depthTexture).__webglTexture=st;const ot=qt.get(R);ot.__hasExternalTextures=!0,ot.__autoAllocateDepthBuffer=st===void 0,ot.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,W){const st=qt.get(R);st.__webglFramebuffer=W,st.__useDefaultFramebuffer=W===void 0};const xs=F.createFramebuffer();this.setRenderTarget=function(R,W=0,st=0){k=R,V=W,P=st;let ot=!0,Z=null,Mt=!1,At=!1;if(R){const Ut=qt.get(R);if(Ut.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(F.FRAMEBUFFER,null),ot=!1;else if(Ut.__webglFramebuffer===void 0)U.setupRenderTarget(R);else if(Ut.__hasExternalTextures)U.rebindTextures(R,qt.get(R.texture).__webglTexture,qt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Zt=R.depthTexture;if(Ut.__boundDepthTexture!==Zt){if(Zt!==null&&qt.has(Zt)&&(R.width!==Zt.image.width||R.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(R)}}const Qt=R.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(At=!0);const ne=qt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ne[W])?Z=ne[W][st]:Z=ne[W],Mt=!0):R.samples>0&&U.useMultisampledRTT(R)===!1?Z=qt.get(R).__webglMultisampledFramebuffer:Array.isArray(ne)?Z=ne[st]:Z=ne,L.copy(R.viewport),Q.copy(R.scissor),J=R.scissorTest}else L.copy(Gt).multiplyScalar($).floor(),Q.copy(ee).multiplyScalar($).floor(),J=Te;if(st!==0&&(Z=xs),Ct.bindFramebuffer(F.FRAMEBUFFER,Z)&&ot&&Ct.drawBuffers(R,Z),Ct.viewport(L),Ct.scissor(Q),Ct.setScissorTest(J),Mt){const Ut=qt.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ut.__webglTexture,st)}else if(At){const Ut=qt.get(R.texture),Qt=W;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ut.__webglTexture,st,Qt)}else if(R!==null&&st!==0){const Ut=qt.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ut.__webglTexture,st)}w=-1},this.readRenderTargetPixels=function(R,W,st,ot,Z,Mt,At){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=qt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&At!==void 0&&(Tt=Tt[At]),Tt){Ct.bindFramebuffer(F.FRAMEBUFFER,Tt);try{const Ut=R.texture,Qt=Ut.format,ne=Ut.type;if(!Kt.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-ot&&st>=0&&st<=R.height-Z&&F.readPixels(W,st,ot,Z,le.convert(Qt),le.convert(ne),Mt)}finally{const Ut=k!==null?qt.get(k).__webglFramebuffer:null;Ct.bindFramebuffer(F.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(R,W,st,ot,Z,Mt,At){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=qt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&At!==void 0&&(Tt=Tt[At]),Tt){const Ut=R.texture,Qt=Ut.format,ne=Ut.type;if(!Kt.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=R.width-ot&&st>=0&&st<=R.height-Z){Ct.bindFramebuffer(F.FRAMEBUFFER,Tt);const Zt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Zt),F.bufferData(F.PIXEL_PACK_BUFFER,Mt.byteLength,F.STREAM_READ),F.readPixels(W,st,ot,Z,le.convert(Qt),le.convert(ne),0);const Ae=k!==null?qt.get(k).__webglFramebuffer:null;Ct.bindFramebuffer(F.FRAMEBUFFER,Ae);const Ce=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await HE(F,Ce,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Zt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Mt),F.deleteBuffer(Zt),F.deleteSync(Ce),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,W=null,st=0){R.isTexture!==!0&&(Ys("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,R=arguments[1]);const ot=Math.pow(2,-st),Z=Math.floor(R.image.width*ot),Mt=Math.floor(R.image.height*ot),At=W!==null?W.x:0,Tt=W!==null?W.y:0;U.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,st,0,0,At,Tt,Z,Mt),Ct.unbindTexture()};const Oc=F.createFramebuffer(),wl=F.createFramebuffer();this.copyTextureToTexture=function(R,W,st=null,ot=null,Z=0,Mt=null){R.isTexture!==!0&&(Ys("WebGLRenderer: copyTextureToTexture function signature has changed."),ot=arguments[0]||null,R=arguments[1],W=arguments[2],Mt=arguments[3]||0,st=null),Mt===null&&(Z!==0?(Ys("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Mt=Z,Z=0):Mt=0);let At,Tt,Ut,Qt,ne,Zt,Ae,Ce,Xe;const Ge=R.isCompressedTexture?R.mipmaps[Mt]:R.image;if(st!==null)At=st.max.x-st.min.x,Tt=st.max.y-st.min.y,Ut=st.isBox3?st.max.z-st.min.z:1,Qt=st.min.x,ne=st.min.y,Zt=st.isBox3?st.min.z:0;else{const dn=Math.pow(2,-Z);At=Math.floor(Ge.width*dn),Tt=Math.floor(Ge.height*dn),R.isDataArrayTexture?Ut=Ge.depth:R.isData3DTexture?Ut=Math.floor(Ge.depth*dn):Ut=1,Qt=0,ne=0,Zt=0}ot!==null?(Ae=ot.x,Ce=ot.y,Xe=ot.z):(Ae=0,Ce=0,Xe=0);const _e=le.convert(W.format),Wt=le.convert(W.type);let Ke;W.isData3DTexture?(U.setTexture3D(W,0),Ke=F.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(U.setTexture2DArray(W,0),Ke=F.TEXTURE_2D_ARRAY):(U.setTexture2D(W,0),Ke=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,W.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,W.unpackAlignment);const ye=F.getParameter(F.UNPACK_ROW_LENGTH),Sn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),je=F.getParameter(F.UNPACK_SKIP_PIXELS),Pn=F.getParameter(F.UNPACK_SKIP_ROWS),Ua=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ge.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ge.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Qt),F.pixelStorei(F.UNPACK_SKIP_ROWS,ne),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Zt);const Ve=R.isDataArrayTexture||R.isData3DTexture,sn=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const dn=qt.get(R),An=qt.get(W),Rn=qt.get(dn.__renderTarget),ir=qt.get(An.__renderTarget);Ct.bindFramebuffer(F.READ_FRAMEBUFFER,Rn.__webglFramebuffer),Ct.bindFramebuffer(F.DRAW_FRAMEBUFFER,ir.__webglFramebuffer);for(let na=0;na<Ut;na++)Ve&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,qt.get(R).__webglTexture,Z,Zt+na),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,qt.get(W).__webglTexture,Mt,Xe+na)),F.blitFramebuffer(Qt,ne,At,Tt,Ae,Ce,At,Tt,F.DEPTH_BUFFER_BIT,F.NEAREST);Ct.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Z!==0||R.isRenderTargetTexture||qt.has(R)){const dn=qt.get(R),An=qt.get(W);Ct.bindFramebuffer(F.READ_FRAMEBUFFER,Oc),Ct.bindFramebuffer(F.DRAW_FRAMEBUFFER,wl);for(let Rn=0;Rn<Ut;Rn++)Ve?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,dn.__webglTexture,Z,Zt+Rn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,dn.__webglTexture,Z),sn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,An.__webglTexture,Mt,Xe+Rn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,An.__webglTexture,Mt),Z!==0?F.blitFramebuffer(Qt,ne,At,Tt,Ae,Ce,At,Tt,F.COLOR_BUFFER_BIT,F.NEAREST):sn?F.copyTexSubImage3D(Ke,Mt,Ae,Ce,Xe+Rn,Qt,ne,At,Tt):F.copyTexSubImage2D(Ke,Mt,Ae,Ce,Qt,ne,At,Tt);Ct.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else sn?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(Ke,Mt,Ae,Ce,Xe,At,Tt,Ut,_e,Wt,Ge.data):W.isCompressedArrayTexture?F.compressedTexSubImage3D(Ke,Mt,Ae,Ce,Xe,At,Tt,Ut,_e,Ge.data):F.texSubImage3D(Ke,Mt,Ae,Ce,Xe,At,Tt,Ut,_e,Wt,Ge):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Mt,Ae,Ce,At,Tt,_e,Wt,Ge.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Mt,Ae,Ce,Ge.width,Ge.height,_e,Ge.data):F.texSubImage2D(F.TEXTURE_2D,Mt,Ae,Ce,At,Tt,_e,Wt,Ge);F.pixelStorei(F.UNPACK_ROW_LENGTH,ye),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Sn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,je),F.pixelStorei(F.UNPACK_SKIP_ROWS,Pn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ua),Mt===0&&W.generateMipmaps&&F.generateMipmap(Ke),Ct.unbindTexture()},this.copyTextureToTexture3D=function(R,W,st=null,ot=null,Z=0){return R.isTexture!==!0&&(Ys("WebGLRenderer: copyTextureToTexture3D function signature has changed."),st=arguments[0]||null,ot=arguments[1]||null,R=arguments[2],W=arguments[3],Z=arguments[4]||0),Ys('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,W,st,ot,Z)},this.initRenderTarget=function(R){qt.get(R).__webglFramebuffer===void 0&&U.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?U.setTextureCube(R,0):R.isData3DTexture?U.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?U.setTexture2DArray(R,0):U.setTexture2D(R,0),Ct.unbindTexture()},this.resetState=function(){V=0,P=0,k=null,Ct.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Aa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorspace=we._getDrawingBufferColorSpace(e),i.unpackColorSpace=we._getUnpackColorSpace()}}const sx={type:"change"},Vp={type:"start"},Gx={type:"end"},xc=new Tx,rx=new cs,a2=Math.cos(70*bn.DEG2RAD),mn=new nt,Qn=2*Math.PI,Fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hd=1e-6;class s2 extends ST{constructor(e,i=null){super(e,i),this.state=Fe.NONE,this.enabled=!0,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:oo.ROTATE,MIDDLE:oo.DOLLY,RIGHT:oo.PAN},this.touches={ONE:ao.ROTATE,TWO:ao.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new ms,this._lastTargetPosition=new nt,this._quat=new ms().setFromUnitVectors(e.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Lv,this._sphericalDelta=new Lv,this._scale=1,this._panOffset=new nt,this._rotateStart=new oe,this._rotateEnd=new oe,this._rotateDelta=new oe,this._panStart=new oe,this._panEnd=new oe,this._panDelta=new oe,this._dollyStart=new oe,this._dollyEnd=new oe,this._dollyDelta=new oe,this._dollyDirection=new nt,this._mouse=new oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=o2.bind(this),this._onPointerDown=r2.bind(this),this._onPointerUp=l2.bind(this),this._onContextMenu=m2.bind(this),this._onMouseWheel=f2.bind(this),this._onKeyDown=h2.bind(this),this._onTouchStart=d2.bind(this),this._onTouchMove=p2.bind(this),this._onMouseDown=u2.bind(this),this._onMouseMove=c2.bind(this),this._interceptControlDown=g2.bind(this),this._interceptControlUp=_2.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sx),this.update(),this.state=Fe.NONE}update(e=null){const i=this.object.position;mn.copy(i).sub(this.target),mn.applyQuaternion(this._quat),this._spherical.setFromVector3(mn),this.autoRotate&&this.state===Fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,u=this.maxAzimuthAngle;isFinite(r)&&isFinite(u)&&(r<-Math.PI?r+=Qn:r>Math.PI&&(r-=Qn),u<-Math.PI?u+=Qn:u>Math.PI&&(u-=Qn),r<=u?this._spherical.theta=Math.max(r,Math.min(u,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+u)/2?Math.max(r,this._spherical.theta):Math.min(u,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(mn.setFromSpherical(this._spherical),mn.applyQuaternion(this._quatInverse),i.copy(this.target).add(mn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=mn.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const d=new nt(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const _=new nt(this._mouse.x,this._mouse.y,0);_.unproject(this.object),this.object.position.sub(_).add(d),this.object.updateMatrixWorld(),h=mn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(xc.origin.copy(this.object.position),xc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xc.direction))<a2?this.object.lookAt(this.target):(rx.setFromNormalAndCoplanarPoint(this.object.up,this.target),xc.intersectPlane(rx,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>Hd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hd||this._lastTargetPosition.distanceToSquared(this.target)>Hd?(this.dispatchEvent(sx),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qn/60*this.autoRotateSpeed*e:Qn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){mn.setFromMatrixColumn(i,0),mn.multiplyScalar(-e),this._panOffset.add(mn)}_panUp(e,i){this.screenSpacePanning===!0?mn.setFromMatrixColumn(i,1):(mn.setFromMatrixColumn(i,0),mn.crossVectors(this.object.up,mn)),mn.multiplyScalar(e),this._panOffset.add(mn)}_pan(e,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const u=this.object.position;mn.copy(u).sub(this.target);let f=mn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/r.clientHeight,this.object.matrix),this._panUp(2*i*f/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),u=e-r.left,f=i-r.top,h=r.width,d=r.height;this._mouse.x=u/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._rotateStart.set(r,u)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panStart.set(r,u)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(r*r+u*u);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),u=.5*(e.pageX+r.x),f=.5*(e.pageY+r.y);this._rotateEnd.set(u,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panEnd.set(r,u)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(r*r+u*u);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new oe,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function r2(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function o2(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function l2(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gx),this.state=Fe.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function u2(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case oo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Fe.DOLLY;break;case oo.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Fe.ROTATE}break;case oo.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Fe.PAN}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(Vp)}function c2(o){switch(this.state){case Fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function f2(o){this.enabled===!1||this.enableZoom===!1||this.state!==Fe.NONE||(o.preventDefault(),this.dispatchEvent(Vp),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Gx))}function h2(o){this.enabled!==!1&&this._handleKeyDown(o)}function d2(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case ao.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Fe.TOUCH_ROTATE;break;case ao.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Fe.TOUCH_PAN;break;default:this.state=Fe.NONE}break;case 2:switch(this.touches.TWO){case ao.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Fe.TOUCH_DOLLY_PAN;break;case ao.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Fe.TOUCH_DOLLY_ROTATE;break;default:this.state=Fe.NONE}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(Vp)}function p2(o){switch(this._trackPointer(o),this.state){case Fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Fe.NONE}}function m2(o){this.enabled!==!1&&o.preventDefault()}function g2(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _2(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Sl=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,v2=`
precision highp float;

varying vec2 vUv;

// Observer camera uniforms (driven by Three.js PerspectiveCamera + OrbitControls)
uniform vec3 uCamPos;
uniform vec3 uCamForward;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform float uTanHalfFov;
uniform float uAspect;
uniform vec2 uResolution;

// Simulation & quality budget uniforms
uniform float uTime;
uniform int uMaxSteps;
uniform float uStepScale;
uniform int uDiskSubsamples;
uniform int uStarLayers;
uniform int uDebugMode;

// Accretion disk & relativistic parameters (in units of Schwarzschild radius r_s = 2GM/c^2 = 1.0)
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemp;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulenceAmp;
uniform float uTurbulenceSpeed;

// Procedural celestial background parameters
uniform float uStarDensity;
uniform float uGalaxyBrightness;

// Physical constants in Schwarzschild radius units: r_s = 2M = 1.0, photon sphere r_ph = 1.5, ISCO = 3.0
const float RS = 1.0;
const float PHOTON_SPHERE = 1.5;
const float B_CRIT = 2.59807621135; // (3 * sqrt(3) / 2) * RS
const float ESCAPE_RADIUS = 52.0;
const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const int HARD_MAX_STEPS = 380;

// -----------------------------------------------------------------------------
// Hash & Procedural 3D Noise Utilities (100% procedural, zero texture lookups)
// -----------------------------------------------------------------------------
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yxx) * p3.zyx);
}

float valueNoise3D(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
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

  float nxy0 = mix(nx00, nx10, f.y);
  float nxy1 = mix(nx01, nx11, f.y);
  return mix(nxy0, nxy1, f.z);
}

float fbm3D(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat3 rot = mat3(
     0.80,  0.60,  0.00,
    -0.60,  0.80,  0.00,
     0.00,  0.00,  1.00
  );
  for (int i = 0; i < 4; i++) {
    sum += amp * valueNoise3D(p);
    p = rot * p * 2.03 + vec3(13.7, 7.3, 5.1);
    amp *= 0.5;
  }
  return sum;
}

// -----------------------------------------------------------------------------
// Planckian Blackbody Locus Approximation (Kelvin -> Linear sRGB)
// -----------------------------------------------------------------------------
vec3 blackbodyLinearRGB(float kelvin) {
  float t = clamp(kelvin, 900.0, 40000.0) * 0.01;
  float r;
  float g;
  float b;

  if (t <= 66.0) {
    r = 1.0;
    g = clamp(0.39008158 * log(max(t, 1.0)) - 0.63184144, 0.0, 1.0);
    if (t <= 19.0) {
      b = 0.0;
    } else {
      b = clamp(0.54320679 * log(max(t - 10.0, 1.0)) - 1.19625409, 0.0, 1.0);
    }
  } else {
    r = clamp(1.29293619 * pow(max(t - 60.0, 0.1), -0.13320476), 0.0, 1.0);
    g = clamp(1.12989086 * pow(max(t - 60.0, 0.1), -0.07551485), 0.0, 1.0);
    b = 1.0;
  }

  // Convert perceptual fit to linear sRGB response
  return pow(max(vec3(r, g, b), vec3(0.0)), vec3(2.2));
}

// -----------------------------------------------------------------------------
// Schwarzschild Metric & Null Geodesic Formulation
//
// Coordinates:
//   3D areal-radius Cartesian embedding x in R^3 where r = ||x|| is the exact
//   Schwarzschild areal coordinate radius and (theta, phi) are spherical angles.
//   Metric (G = c = 1, r_s = 2M = 1.0):
//     ds^2 = -(1 - r_s/r) dt^2 + (1 - r_s/r)^(-1) dr^2 + r^2 dOmega^2 = 0.
//
// Exact Null Geodesic ODE with affine parameter lambda (conserved E = 1):
//   Conserved orbital angular momentum vector: h_vec = x × (dx/dlambda), h^2 = |h_vec|^2.
//   Radial first integral: (dr/dlambda)^2 + (h^2 / r^2)(1 - r_s / r) = 1.
//   Differentiating yields the exact coordinate-singularity-free 3D vector ODE:
//     d^2 x / d lambda^2 = - (3/2) * r_s * h^2 * x / ||x||^5.
//   This reproduces Binet's exact GR equation d^2u/dphi^2 + u = (3/2) r_s u^2,
//   the unstable photon sphere at r = 1.5 r_s, and critical shadow b_crit = 2.598 r_s.
// -----------------------------------------------------------------------------
vec3 initStaticObserverVelocity(vec3 camPos, vec3 localDir) {
  float r0 = max(length(camPos), RS * 1.05);
  vec3 rHat = camPos / r0;
  float dr = dot(localDir, rHat);
  vec3 dPerp = localDir - dr * rHat;
  // Static Schwarzschild observer orthonormal tetrad transformation:
  // Ensures exact Synge relativistic shadow angle at any finite camera radius r0 > r_s.
  float invLapse = inversesqrt(max(1.0 - RS / r0, 0.04));
  return dr * rHat + dPerp * invLapse;
}

vec3 schwarzschildGeodesicAccel(vec3 pos, float h2) {
  float r2 = max(dot(pos, pos), 1e-5);
  float invR = inversesqrt(r2);
  float invR5 = invR * invR * invR * invR * invR;
  return (-1.5 * RS * h2 * invR5) * pos;
}

void stepGeodesicRK4(
  in vec3 pos,
  in vec3 vel,
  in float h2,
  in float dt,
  out vec3 nextPos,
  out vec3 nextVel
) {
  vec3 k1x = vel;
  vec3 k1v = schwarzschildGeodesicAccel(pos, h2);

  vec3 k2x = vel + 0.5 * dt * k1v;
  vec3 k2v = schwarzschildGeodesicAccel(pos + 0.5 * dt * k1x, h2);

  vec3 k3x = vel + 0.5 * dt * k2v;
  vec3 k3v = schwarzschildGeodesicAccel(pos + 0.5 * dt * k2x, h2);

  vec3 k4x = vel + dt * k3v;
  vec3 k4v = schwarzschildGeodesicAccel(pos + dt * k3x, h2);

  nextPos = pos + (dt / 6.0) * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
  nextVel = vel + (dt / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

float computeAdaptiveStep(vec3 pos, float r, float h2) {
  // Fine step near photon sphere (r ~ 1.5 r_s) & event horizon, geometric growth in far field
  float nearHorizon = clamp(0.052 * (r - 0.80), 0.018, 0.14);
  float farStep = 0.045 + 0.125 * max(r - 1.5, 0.0);
  float blend = smoothstep(1.8, 6.5, r);
  float dt = mix(nearHorizon, farStep, blend);

  // Tighten step near curved accretion disk slab for accurate slab & midplane intersections
  float diskBand = step(uDiskInner - 1.0, r) * step(r, uDiskOuter + 1.5);
  if (diskBand > 0.5) {
    float verticalProx = abs(pos.y) / max(uDiskHalfThickness * 3.5, 0.28);
    if (verticalProx < 1.6) {
      dt = min(dt, mix(0.055, 0.18, clamp(verticalProx / 1.6, 0.0, 1.0)));
    }
  }

  // Extra curvature guard for grazing high-angular-momentum rays
  float curvScale = r * r / max(sqrt(h2) * 1.35, 1.0);
  dt = min(dt, max(0.022, 0.16 * curvScale));

  return dt * uStepScale;
}

bool isSegmentCapturedByHorizon(vec3 p0, vec3 p1, float r1) {
  if (r1 <= RS * 1.002) return true;
  vec3 seg = p1 - p0;
  float segLen2 = dot(seg, seg);
  if (segLen2 > 1e-7) {
    float tClosest = clamp(-dot(p0, seg) / segLen2, 0.0, 1.0);
    vec3 closest = p0 + seg * tClosest;
    if (dot(closest, closest) <= RS * RS * 1.002) {
      return true;
    }
  }
  return false;
}

// -----------------------------------------------------------------------------
// Relativistic Accretion Disk Emission (Doppler + Gravitational Redshift + MHD)
// -----------------------------------------------------------------------------
float sampleKeplerianTurbulence(float rCyl, float phi, float yNorm) {
  float radialNorm = clamp((rCyl - uDiskInner) / max(uDiskOuter - uDiskInner, 0.5), 0.0, 1.0);
  float logR = log(max(rCyl, 1.05));

  // Keplerian angular frequency Omega(r) = sqrt(M / r^3)
  float omega = 1.45 * pow(max(rCyl, 1.4), -1.5);
  float flowTime = uTime * uTurbulenceSpeed;

  // Dual-phase Lagrangian flow advection prevents infinite winding shear at large t
  float cycle0 = fract(flowTime * 0.11);
  float cycle1 = fract(flowTime * 0.11 + 0.5);
  float fade = 0.5 - 0.5 * cos(TAU * cycle0);

  float carrierAngle = phi + flowTime * 0.34;
  float spiralA0 = carrierAngle + (cycle0 - 0.5) * 7.5 * omega + 3.2 * logR;
  float spiralA1 = carrierAngle + (cycle1 - 0.5) * 7.5 * omega + 3.2 * logR + 2.1;

  // Cylindrical seamless coordinates stretched azimuthally for sheared MRI plasma filaments
  vec3 coord0 = vec3(cos(spiralA0) * 2.4, sin(spiralA0) * 2.4, logR * 7.5 + yNorm * 0.9);
  vec3 coord1 = vec3(cos(spiralA1) * 2.4, sin(spiralA1) * 2.4, logR * 7.5 + yNorm * 0.9 + 4.7);
  float fbmFilaments = mix(fbm3D(coord0), fbm3D(coord1), fade);

  // Finer high-frequency spiral streaks
  float fineA0 = carrierAngle * 2.0 + (cycle0 - 0.5) * 11.0 * omega + 5.6 * logR;
  float fineA1 = carrierAngle * 2.0 + (cycle1 - 0.5) * 11.0 * omega + 5.6 * logR + 1.7;
  vec3 fineCoord0 = vec3(cos(fineA0) * 4.5, sin(fineA0) * 4.5, rCyl * 1.9);
  vec3 fineCoord1 = vec3(cos(fineA1) * 4.5, sin(fineA1) * 4.5, rCyl * 1.9 + 9.2);
  float fineStreaks = mix(fbm3D(fineCoord0), fbm3D(fineCoord1), fade);

  // Azimuthally coherent MRI pressure rings (characteristic Concentric Gargantua lanes)
  float rings = 0.5 + 0.5 * sin(rCyl * 5.2 - sin(carrierAngle * 2.0 + logR * 3.0) * 0.85);
  float subRings = 0.5 + 0.5 * sin(rCyl * 13.5 + fbmFilaments * 3.6);
  float ringStructure = mix(rings, rings * (0.55 + 0.75 * subRings), 0.65);

  float rawTurb = (fbmFilaments * 0.62 + fineStreaks * 0.38) * (0.55 + 0.75 * ringStructure);
  // Smooth inner hot cusp, filamentary outer fade
  float contrast = mix(1.0, clamp(rawTurb * 1.85, 0.06, 2.35), clamp(uTurbulenceAmp, 0.0, 2.0) * 0.68);
  if (uTurbulenceAmp > 1.0) {
    contrast = pow(max(contrast, 0.02), 1.0 + 0.55 * (uTurbulenceAmp - 1.0));
  }
  return contrast * mix(1.12, 0.88, radialNorm);
}

void evaluateDiskPlasmaPoint(
  in vec3 samplePos,
  in vec3 sampleVel,
  in float camLapseSqrt,
  out vec3 emissionRate,
  out float extinctionRate,
  out float gFactorOut,
  out float localTempNormOut
) {
  float rCyl = length(samplePos.xz);
  float rSph = max(length(samplePos), RS * 1.02);

  // Radial window with smooth inner ISCO cusp & outer taper
  float innerFade = smoothstep(uDiskInner * 0.94, uDiskInner * 1.07, rCyl);
  float outerFade = 1.0 - smoothstep(uDiskOuter * 0.78, uDiskOuter * 1.03, rCyl);
  float radialMask = innerFade * outerFade;

  if (radialMask <= 1e-4) {
    emissionRate = vec3(0.0);
    extinctionRate = 0.0;
    gFactorOut = 1.0;
    localTempNormOut = 0.0;
    return;
  }

  float radialT = clamp((rCyl - uDiskInner) / max(uDiskOuter - uDiskInner, 0.5), 0.0, 1.0);
  float hLocal = max(uDiskHalfThickness * mix(0.68, 1.32, radialT), 0.004);
  float yNorm = samplePos.y / hLocal;
  if (abs(yNorm) > 1.25) {
    emissionRate = vec3(0.0);
    extinctionRate = 0.0;
    gFactorOut = 1.0;
    localTempNormOut = 0.0;
    return;
  }

  // Normalized vertical Gaussian profile: integral over [-hLocal, +hLocal] stays finite as hLocal -> 0
  float verticalProfile = exp(-2.35 * yNorm * yNorm) * smoothstep(1.25, 0.88, abs(yNorm));

  float safeX = (abs(samplePos.x) + abs(samplePos.z) > 1e-6) ? samplePos.x : 1e-6;
  float phi = atan(samplePos.z, safeX);
  float turb = sampleKeplerianTurbulence(rCyl, phi, yNorm);

  // Novikov-Thorne / Page-Thorne relativistic thin-disk temperature profile
  float ratio = clamp(uDiskInner / max(rCyl, uDiskInner * 0.95), 0.02, 1.0);
  float ntFactor = pow(ratio, 0.75) * pow(max(1.0 - 0.82 * sqrt(ratio), 0.04), 0.25) * 1.68;
  localTempNormOut = clamp(ntFactor * (0.72 + 0.36 * turb), 0.0, 2.2);

  // Prograde circular Keplerian orbital speed in static local frame: beta_K = sqrt(r_s / (2 * (r - r_s)))
  float beta = clamp(
    uOrbitalSpeed * sqrt(RS / max(2.0 * (rSph - RS), 0.35)),
    0.0,
    0.90
  );
  float gamma = inversesqrt(max(1.0 - beta * beta, 0.12));

  // Tangent direction of prograde plasma in equatorial xz-plane (left wing approaches +z observer)
  vec3 orbTangent = vec3(samplePos.z, 0.0, -samplePos.x) / max(rCyl, 1e-4);
  vec3 photonToObserver = -normalize(sampleVel);
  float cosTheta = clamp(dot(orbTangent, photonToObserver), -0.995, 0.995);

  // Combined gravitational redshift + special-relativistic Doppler shift factor g = nu_obs / nu_emit
  float emitterLapseSqrt = sqrt(max(1.0 - RS / rSph, 0.02));
  float gFactor = (emitterLapseSqrt / max(camLapseSqrt, 0.2)) / max(gamma * (1.0 - beta * cosTheta), 0.12);
  gFactor = clamp(gFactor, 0.12, 3.2);
  gFactorOut = gFactor;

  // Relativistic invariant intensity transformation: I_obs ~ g^3.5 * B(g * T_local)
  float observedTempK = uDiskTemp * max(localTempNormOut, 0.22) * pow(gFactor, 0.72);
  vec3 bbColor = blackbodyLinearRGB(observedTempK);

  float beamingBoost = pow(gFactor, 2.75);
  float radialBrightness = pow(ratio, 1.25) * (0.38 + 0.62 * outerFade);
  float columnScale = 0.32 / hLocal;

  float density = radialMask * verticalProfile * (0.32 + 0.82 * turb) * columnScale;
  extinctionRate = density * mix(1.18, 0.44, radialT);
  emissionRate = bbColor * (uDiskEmission * 3.85 * radialBrightness * beamingBoost * turb * density);
}

// -----------------------------------------------------------------------------
// Procedural Lensed Starfield & Milky Way Galactic Background (Zero Textures)
// -----------------------------------------------------------------------------
vec3 sampleStarLayer(vec3 dir, float cellScale, float densityThreshold, float brightnessScale) {
  vec3 p = dir * cellScale;
  vec3 cell = floor(p);
  vec3 local = fract(p);

  vec3 starColorSum = vec3(0.0);
  // Check 2x2x2 neighborhood around nearest octant to eliminate cell-boundary clipping
  vec3 stepSign = step(vec3(0.5), local) * 2.0 - 1.0;

  for (int ix = 0; ix < 2; ix++) {
    for (int iy = 0; iy < 2; iy++) {
      for (int iz = 0; iz < 2; iz++) {
        vec3 offset = vec3(float(ix), float(iy), float(iz)) * stepSign;
        vec3 c = cell + offset;
        vec3 rnd = hash33(c);
        float prob = hash13(c + vec3(19.1, 7.7, 3.3));
        if (prob < densityThreshold) {
          vec3 starCenter = c + 0.18 + 0.64 * rnd;
          vec3 starDir = normalize(starCenter);
          float angDist = length(dir - starDir) * cellScale;
          float core = exp(-angDist * angDist * 58.0);
          float halo = 0.14 * exp(-angDist * 9.5);
          float starTemp = mix(3100.0, 16500.0, pow(rnd.x, 1.5));
          float lum = pow(rnd.y, 2.6) * brightnessScale;
          starColorSum += blackbodyLinearRGB(starTemp) * lum * (core + halo);
        }
      }
    }
  }
  return starColorSum;
}

vec3 sampleProceduralCosmos(vec3 dir) {
  vec3 d = normalize(dir);

  // Tilted galactic coordinate frame (~33 deg inclination relative to accretion disk)
  vec3 galUp = normalize(vec3(0.36, 0.84, -0.40));
  vec3 galCenter = normalize(vec3(-0.52, 0.24, -0.82));
  vec3 galSide = normalize(cross(galUp, galCenter));
  vec3 galForward = cross(galSide, galUp);

  float galLat = dot(d, galUp);
  float gx = dot(d, galForward);
  float gz = dot(d, galSide);

  // Galactic band envelope & bulge concentration
  float bandProfile = exp(-abs(galLat) * 6.2) + 0.35 * exp(-galLat * galLat * 14.0);
  float coreBulge = pow(max(dot(d, galCenter) * 0.5 + 0.5, 0.0), 3.4);

  vec3 galPos = vec3(gx, galLat * 2.4, gz);
  float nebClouds = fbm3D(galPos * 3.4 + vec3(2.3, -1.4, 5.1));
  float fineNeb = fbm3D(galPos * 8.2 + vec3(-4.1, 3.7, 1.9));
  float dustRift = smoothstep(0.40, 0.72, fbm3D(galPos * 5.6 + vec3(8.4, 1.2, -3.5)));
  float dustLaneMask = exp(-2.35 * dustRift * exp(-galLat * galLat * 38.0));

  vec3 warmCoreColor = vec3(1.05, 0.76, 0.48);
  vec3 coolArmColor = vec3(0.32, 0.52, 0.88);
  vec3 hiiAccent = vec3(0.82, 0.34, 0.52);

  vec3 galaxyGlow = mix(coolArmColor, warmCoreColor, clamp(coreBulge * 1.15 + nebClouds * 0.35, 0.0, 1.0));
  galaxyGlow += hiiAccent * pow(max(fineNeb - 0.52, 0.0) * 2.0, 2.0) * 0.55;
  galaxyGlow *= bandProfile * (0.35 + 1.15 * nebClouds) * dustLaneMask * 0.20 * uGalaxyBrightness;

  // Deep cosmic ambient starlight floor
  galaxyGlow += vec3(0.0025, 0.0034, 0.0058) * uGalaxyBrightness;

  // Multi-scale procedural 3D starfield (lensed naturally through deflected dir!)
  vec3 stars = vec3(0.0);
  if (uStarDensity > 0.001) {
    float dens = clamp(uStarDensity, 0.0, 2.5);
    float galStarBoost = 1.0 + 1.35 * bandProfile * dustLaneMask;

    if (uStarLayers >= 1) {
      stars += sampleStarLayer(d, 74.0, clamp(0.11 * dens, 0.0, 0.85), 2.55);
    }
    if (uStarLayers >= 2) {
      stars += sampleStarLayer(d + vec3(0.13, -0.07, 0.19), 142.0, clamp(0.18 * dens * galStarBoost, 0.0, 0.92), 1.15);
    }
    if (uStarLayers >= 3) {
      stars += sampleStarLayer(d + vec3(-0.23, 0.17, -0.11), 224.0, clamp(0.24 * dens * galStarBoost, 0.0, 0.95), 0.52);
    }
    if (uStarLayers >= 4) {
      stars += sampleStarLayer(d + vec3(0.31, 0.29, -0.17), 320.0, clamp(0.28 * dens * galStarBoost, 0.0, 0.98), 0.28);
    }
  }

  return galaxyGlow + stars;
}

// -----------------------------------------------------------------------------
// Scientific False-Color Palettes for Diagnostic Views 1..9
// -----------------------------------------------------------------------------
vec3 infernoPalette(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.02, 0.01, 0.08);
  vec3 c1 = vec3(0.36, 0.06, 0.43);
  vec3 c2 = vec3(0.78, 0.22, 0.28);
  vec3 c3 = vec3(0.98, 0.62, 0.12);
  vec3 c4 = vec3(0.99, 0.98, 0.68);
  if (t < 0.25) return mix(c0, c1, t * 4.0);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
  return mix(c3, c4, (t - 0.75) * 4.0);
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 localRayDir = normalize(
    uCamForward +
    ndc.x * uAspect * uTanHalfFov * uCamRight +
    ndc.y * uTanHalfFov * uCamUp
  );

  float camRadius = max(length(uCamPos), RS * 1.08);
  float camLapseSqrt = sqrt(max(1.0 - RS / camRadius, 0.04));

  // Initialize geodesic state (pos, vel) and conserved angular momentum h^2 = |x × v|^2
  vec3 pos = uCamPos;
  vec3 vel = initStaticObserverVelocity(uCamPos, localRayDir);
  vec3 hVec = cross(pos, vel);
  float h2 = dot(hVec, hVec);

  // Radiative transfer & diagnostic accumulators along curved geodesic
  vec3 accumRadiance = vec3(0.0);
  float transmittance = 1.0;

  bool captured = false;
  bool escaped = false;
  int stepsTaken = 0;
  float minRadius = camRadius;

  int diskCrossings = 0;
  bool inDiskSlab = false;
  float weightedGFactor = 0.0;
  float weightedIntrinsicTemp = 0.0;
  float diskWeightSum = 0.0;

  float maxSlabBound = max(uDiskHalfThickness * 1.45, 0.012);

  for (int stepIdx = 0; stepIdx < HARD_MAX_STEPS; stepIdx++) {
    if (stepIdx >= uMaxSteps) break;

    float r = length(pos);
    minRadius = min(minRadius, r);

    if (r <= RS * 1.002) {
      captured = true;
      break;
    }

    if (r > ESCAPE_RADIUS && dot(pos, vel) > 0.0 && stepIdx > 4) {
      escaped = true;
      break;
    }

    float dt = computeAdaptiveStep(pos, r, h2);
    vec3 nextPos;
    vec3 nextVel;
    stepGeodesicRK4(pos, vel, h2, dt, nextPos, nextVel);
    stepsTaken = stepIdx + 1;

    float nextR = length(nextPos);
    minRadius = min(minRadius, nextR);

    // -------------------------------------------------------------------------
    // Curved-path Accretion Disk Intersection & Ordered Multi-Crossing Synthesis
    // -------------------------------------------------------------------------
    if (uDebugMode != 7 && (transmittance > 0.002 || uDebugMode == 3)) {
      float dy = nextPos.y - pos.y;
      float sEnter = 0.0;
      float sExit = 1.0;
      bool hitsVerticalBand = false;

      if (abs(dy) < 1e-6) {
        hitsVerticalBand = abs(pos.y) <= maxSlabBound;
      } else {
        float s0 = (-maxSlabBound - pos.y) / dy;
        float s1 = (maxSlabBound - pos.y) / dy;
        sEnter = max(0.0, min(s0, s1));
        sExit = min(1.0, max(s0, s1));
        hitsVerticalBand = sExit > sEnter;
      }

      bool crossedMidplane = (pos.y * nextPos.y <= 0.0) && (abs(pos.y) + abs(nextPos.y) > 0.0);

      if (hitsVerticalBand) {
        float sMid = 0.5 * (sEnter + sExit);
        vec3 midPos = mix(pos, nextPos, sMid);
        float rMidCyl = length(midPos.xz);

        if (rMidCyl >= uDiskInner * 0.93 && rMidCyl <= uDiskOuter * 1.05) {
          if (!inDiskSlab) {
            diskCrossings += 1;
            inDiskSlab = true;
          } else if (crossedMidplane && abs(pos.y) > maxSlabBound * 0.85) {
            diskCrossings += 1;
          }

          float segWorldLen = length(nextPos - pos) * (sExit - sEnter);
          float subDt = segWorldLen / float(max(uDiskSubsamples, 1));

          for (int s = 0; s < 3; s++) {
            if (s >= uDiskSubsamples) break;
            float frac = mix(sEnter, sExit, (float(s) + 0.5) / float(max(uDiskSubsamples, 1)));
            // Cubic Hermite evaluation on the RK4 segment for smooth curved-ray intersection
            float f2 = frac * frac;
            float f3 = f2 * frac;
            vec3 subPos =
              (2.0 * f3 - 3.0 * f2 + 1.0) * pos +
              (f3 - 2.0 * f2 + frac) * (vel * dt) +
              (-2.0 * f3 + 3.0 * f2) * nextPos +
              (f3 - f2) * (nextVel * dt);
            vec3 subVel = mix(vel, nextVel, frac);

            vec3 emRate;
            float extRate;
            float gVal;
            float tempNormVal;
            evaluateDiskPlasmaPoint(subPos, subVel, camLapseSqrt, emRate, extRate, gVal, tempNormVal);

            if (extRate > 1e-5) {
              float stepTau = extRate * subDt;
              float stepTrans = exp(-stepTau);
              // Exact constant-source radiative transfer along sub-segment
              float absorbWeight = (stepTau > 1e-4) ? ((1.0 - stepTrans) / stepTau) : 1.0;
              vec3 stepContrib = emRate * subDt * absorbWeight;

              float w = transmittance * (1.0 - stepTrans + 0.05 * stepTau);
              accumRadiance += transmittance * stepContrib;
              weightedGFactor += w * gVal;
              weightedIntrinsicTemp += w * tempNormVal;
              diskWeightSum += w;
              transmittance *= stepTrans;
            }
          }
        } else if (abs(nextPos.y) > maxSlabBound * 1.25) {
          inDiskSlab = false;
        }
      } else {
        inDiskSlab = false;
      }
    }

    // Event horizon capture check after checking any outer segment intersection
    if (isSegmentCapturedByHorizon(pos, nextPos, nextR)) {
      captured = true;
      pos = nextPos;
      vel = nextVel;
      break;
    }

    pos = nextPos;
    vel = nextVel;
  }

  // Classify grazing photon-sphere rays that exhausted uMaxSteps near r ~ 1.5 r_s
  float finalR = length(pos);
  if (!captured && !escaped) {
    if (finalR < PHOTON_SPHERE || (finalR < 2.6 && dot(pos, vel) < 0.0)) {
      captured = true;
    } else {
      escaped = true;
    }
  }

  // Asymptotic lensed sky direction for escaped rays (including exact weak-field tail r_final -> inf)
  vec3 lensedSkyDir = normalize(vel);
  if (!captured && finalR > 2.2) {
    vec3 rHatEnd = pos / finalR;
    vec3 tang = lensedSkyDir - dot(lensedSkyDir, rHatEnd) * rHatEnd;
    float tangLen = length(tang);
    if (tangLen > 1e-5) {
      // Remaining Schwarzschild weak-field deflection delta_phi_rem ~ r_s / r_final * sin(alpha)
      float remDeflect = (RS / finalR) * tangLen;
      lensedSkyDir = normalize(lensedSkyDir - (tang / tangLen) * remDeflect * 0.5);
    }
  }

  vec3 cosmosRadiance = captured ? vec3(0.0) : sampleProceduralCosmos(lensedSkyDir);
  vec3 totalHdrRadiance = accumRadiance + transmittance * cosmosRadiance;

  // ---------------------------------------------------------------------------
  // Diagnostic Views (0 = Final HDR Scene for Post-Processing; 1..9 = Diagnostics)
  // ---------------------------------------------------------------------------
  vec3 outColor = totalHdrRadiance;

  if (uDebugMode == 1) {
    // 1: Ray Steps & Termination State
    float stepRatio = clamp(float(stepsTaken) / float(max(uMaxSteps, 1)), 0.0, 1.0);
    vec3 heat = infernoPalette(pow(stepRatio, 0.8));
    if (captured) {
      heat = mix(vec3(0.02, 0.03, 0.07), heat * vec3(0.55, 0.75, 1.15), stepRatio * 0.85);
    }
    outColor = heat;
  } else if (uDebugMode == 2) {
    // 2: Event Horizon Capture Mask & Photon-Sphere Critical Zone
    if (captured) {
      float rim = smoothstep(1.0, 1.48, minRadius);
      outColor = vec3(0.0) + vec3(0.28, 0.06, 0.02) * rim;
    } else {
      float photonProx = exp(-(minRadius - PHOTON_SPHERE) * 4.5);
      float bApprox = sqrt(h2);
      float critLine = exp(-abs(bApprox - B_CRIT) * 28.0);
      vec3 escapedBase = mix(vec3(0.05, 0.14, 0.28), vec3(0.14, 0.42, 0.72), clamp(1.0 / max(minRadius * 0.22, 1.0), 0.0, 1.0));
      outColor = escapedBase + vec3(1.0, 0.76, 0.22) * (photonProx * 0.85 + critLine * 0.9);
    }
  } else if (uDebugMode == 3) {
    // 3: Accretion Disk Crossing Order (0, 1st Primary, 2nd Lensed Arch, 3rd+ Photon Ring)
    if (diskCrossings == 0) {
      outColor = captured ? vec3(0.01, 0.01, 0.015) : vec3(0.03, 0.05, 0.09);
    } else if (diskCrossings == 1) {
      float lum = clamp(1.0 - transmittance, 0.22, 1.0);
      outColor = vec3(0.10, 0.68, 0.92) * lum;
    } else if (diskCrossings == 2) {
      float lum = clamp(1.0 - transmittance, 0.35, 1.0);
      outColor = vec3(0.98, 0.68, 0.16) * lum;
    } else {
      outColor = vec3(1.0, 0.32, 0.86) + vec3(0.35) * clamp(float(diskCrossings - 3), 0.0, 2.0);
    }
  } else if (uDebugMode == 4) {
    // 4: Relativistic Redshift & Doppler Beaming Factor g = nu_obs / nu_emit
    if (diskWeightSum > 1e-4) {
      float meanG = weightedGFactor / diskWeightSum;
      float delta = clamp((meanG - 1.0) * 1.45, -1.0, 1.0);
      vec3 redShiftCol = vec3(0.92, 0.14, 0.10);
      vec3 neutralCol = vec3(0.90, 0.92, 0.88);
      vec3 blueShiftCol = vec3(0.14, 0.58, 1.00);
      vec3 gCol = (delta < 0.0) ? mix(neutralCol, redShiftCol, -delta) : mix(neutralCol, blueShiftCol, delta);
      float mask = clamp(1.0 - transmittance, 0.25, 1.0);
      outColor = gCol * mask;
    } else {
      // Show pure gravitational potentiallapse sqrt(1 - r_s / r_min) in background
      float lapseMin = captured ? 0.0 : sqrt(max(1.0 - RS / max(minRadius, RS), 0.0));
      outColor = captured ? vec3(0.0) : vec3(0.04, 0.06, 0.10) * lapseMin;
    }
  } else if (uDebugMode == 5) {
    // 5: Gravitational Deflection Angle & Closest Approach Contours
    if (captured) {
      outColor = vec3(0.0);
    } else {
      float cosBend = clamp(dot(normalize(localRayDir), lensedSkyDir), -1.0, 1.0);
      float bendRad = acos(cosBend); // [0, PI]
      float bendNorm = clamp(bendRad / PI, 0.0, 1.0);
      float rContours = 0.85 + 0.15 * cos(minRadius * TAU * 1.0);
      outColor = infernoPalette(bendNorm) * rContours;
    }
  } else if (uDebugMode == 6) {
    // 6: Lensed Celestial Coordinate Grid (Einstein Ring & Inversion Visualization)
    if (captured) {
      outColor = vec3(0.0);
    } else {
      float theta = acos(clamp(lensedSkyDir.y, -1.0, 1.0)); // [0, PI]
      float safeSkyX = (abs(lensedSkyDir.x) + abs(lensedSkyDir.z) > 1e-6) ? lensedSkyDir.x : 1e-6;
      float phi = atan(lensedSkyDir.z, safeSkyX); // [-PI, PI]

      float gridLat = abs(fract(theta * (12.0 / PI)) - 0.5);
      float gridLon = abs(fract((phi + PI) * (24.0 / TAU)) - 0.5);
      float lineLat = 1.0 - smoothstep(0.02, 0.07, gridLat);
      float lineLon = 1.0 - smoothstep(0.02, 0.07, gridLon);
      float grid = max(lineLat, lineLon);

      vec3 hemiTint = vec3(
        0.25 + 0.55 * (0.5 + 0.5 * cos(phi)),
        0.25 + 0.55 * (1.0 - theta / PI),
        0.35 + 0.55 * (0.5 + 0.5 * sin(phi))
      );
      // Highlight Einstein ring locus where ray bends straight behind camera
      float einsteinLocus = exp(-length(lensedSkyDir - uCamForward) * 14.0);
      outColor = hemiTint * (0.18 + 0.82 * grid) + vec3(1.0, 0.82, 0.32) * einsteinLocus;
    }
  } else if (uDebugMode == 7) {
    // 7: Isolated Lensed Procedural Starfield & Galaxy (Tone-mapped cleanly for inspection)
    vec3 sky = cosmosRadiance * 1.35;
    outColor = sky / (vec3(1.0) + sky);
  } else if (uDebugMode == 8) {
    // 8: Intrinsic Rest-Frame Disk Temperature & Keplerian MHD Turbulence
    if (diskWeightSum > 1e-4) {
      float meanTempNorm = weightedIntrinsicTemp / diskWeightSum;
      vec3 restCol = blackbodyLinearRGB(uDiskTemp * max(meanTempNorm, 0.15)) * meanTempNorm * 1.15;
      outColor = restCol / (vec3(1.0) + restCol);
    } else {
      outColor = captured ? vec3(0.0) : vec3(0.015, 0.02, 0.035);
    }
  } else if (uDebugMode == 9) {
    // 9: Pre-Postprocessing Linear HDR Radiance Inspection (log2 dynamic range + >1.0 HDR indicator)
    vec3 logHdr = log2(vec3(1.0) + max(totalHdrRadiance, vec3(0.0))) * 0.30;
    float peak = max(totalHdrRadiance.r, max(totalHdrRadiance.g, totalHdrRadiance.b));
    float overUnity = smoothstep(1.0, 4.5, peak);
    outColor = mix(clamp(logHdr, 0.0, 1.0), vec3(1.0, 0.78, 0.95), overUnity * 0.22);
  }

  // Sanitize IEEE-754 output before writing HalfFloat render target
  if (!(outColor.r >= 0.0)) outColor.r = 0.0;
  if (!(outColor.g >= 0.0)) outColor.g = 0.0;
  if (!(outColor.b >= 0.0)) outColor.b = 0.0;
  outColor = clamp(outColor, vec3(0.0), vec3(240.0));

  gl_FragColor = vec4(outColor, captured ? 0.0 : 1.0);
}
`,x2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D uInputTex;
uniform vec2 uTexelSize;
uniform float uThreshold;

float calcSceneLuminance(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

vec3 softThreshold(vec3 color, float threshold) {
  float br = max(color.r, max(color.g, color.b));
  float knee = max(threshold * 0.55, 1e-4);
  float soft = br - threshold + knee;
  soft = clamp(soft, 0.0, 2.0 * knee);
  soft = (soft * soft) / (4.0 * knee + 1e-5);
  float contrib = max(soft, br - threshold) / max(br, 1e-5);
  return color * max(contrib, 0.0);
}

void main() {
  // 4-tap Karis-weighted box prefilter to tame sub-pixel HDR fireflies while keeping photon ring glow crisp
  vec2 d = uTexelSize * 0.5;
  vec3 c0 = softThreshold(texture2D(uInputTex, vUv + vec2(-d.x, -d.y)).rgb, uThreshold);
  vec3 c1 = softThreshold(texture2D(uInputTex, vUv + vec2( d.x, -d.y)).rgb, uThreshold);
  vec3 c2 = softThreshold(texture2D(uInputTex, vUv + vec2(-d.x,  d.y)).rgb, uThreshold);
  vec3 c3 = softThreshold(texture2D(uInputTex, vUv + vec2( d.x,  d.y)).rgb, uThreshold);

  float w0 = 1.0 / (1.0 + calcSceneLuminance(c0) * 0.22);
  float w1 = 1.0 / (1.0 + calcSceneLuminance(c1) * 0.22);
  float w2 = 1.0 / (1.0 + calcSceneLuminance(c2) * 0.22);
  float w3 = 1.0 / (1.0 + calcSceneLuminance(c3) * 0.22);

  vec3 filtered = (c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3) / max(w0 + w1 + w2 + w3, 1e-5);
  gl_FragColor = vec4(clamp(filtered, vec3(0.0), vec3(120.0)), 1.0);
}
`,S2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D uInputTex;
uniform vec2 uTexelSize;

void main() {
  // Jimenez 13-tap energy-preserving HDR downsample filter
  vec2 t = uTexelSize;

  vec3 a = texture2D(uInputTex, vUv + vec2(-2.0,  2.0) * t).rgb;
  vec3 b = texture2D(uInputTex, vUv + vec2( 0.0,  2.0) * t).rgb;
  vec3 c = texture2D(uInputTex, vUv + vec2( 2.0,  2.0) * t).rgb;

  vec3 d = texture2D(uInputTex, vUv + vec2(-2.0,  0.0) * t).rgb;
  vec3 e = texture2D(uInputTex, vUv).rgb;
  vec3 f = texture2D(uInputTex, vUv + vec2( 2.0,  0.0) * t).rgb;

  vec3 g = texture2D(uInputTex, vUv + vec2(-2.0, -2.0) * t).rgb;
  vec3 h = texture2D(uInputTex, vUv + vec2( 0.0, -2.0) * t).rgb;
  vec3 i = texture2D(uInputTex, vUv + vec2( 2.0, -2.0) * t).rgb;

  vec3 j = texture2D(uInputTex, vUv + vec2(-1.0,  1.0) * t).rgb;
  vec3 k = texture2D(uInputTex, vUv + vec2( 1.0,  1.0) * t).rgb;
  vec3 l = texture2D(uInputTex, vUv + vec2(-1.0, -1.0) * t).rgb;
  vec3 m = texture2D(uInputTex, vUv + vec2( 1.0, -1.0) * t).rgb;

  vec3 sum = e * 0.125;
  sum += (a + c + g + i) * 0.03125;
  sum += (b + d + f + h) * 0.0625;
  sum += (j + k + l + m) * 0.125;

  gl_FragColor = vec4(max(sum, vec3(0.0)), 1.0);
}
`,y2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D uLowMipTex;
uniform sampler2D uHighMipTex;
uniform vec2 uTexelSize;
uniform float uRadius;

void main() {
  // 9-tap tent filter upsample combined with higher-resolution mip level
  vec2 d = uTexelSize * uRadius;

  vec3 s = vec3(0.0);
  s += texture2D(uLowMipTex, vUv + vec2(-d.x,  d.y)).rgb * 1.0;
  s += texture2D(uLowMipTex, vUv + vec2( 0.0,  d.y)).rgb * 2.0;
  s += texture2D(uLowMipTex, vUv + vec2( d.x,  d.y)).rgb * 1.0;

  s += texture2D(uLowMipTex, vUv + vec2(-d.x,  0.0)).rgb * 2.0;
  s += texture2D(uLowMipTex, vUv).rgb * 4.0;
  s += texture2D(uLowMipTex, vUv + vec2( d.x,  0.0)).rgb * 2.0;

  s += texture2D(uLowMipTex, vUv + vec2(-d.x, -d.y)).rgb * 1.0;
  s += texture2D(uLowMipTex, vUv + vec2( 0.0, -d.y)).rgb * 2.0;
  s += texture2D(uLowMipTex, vUv + vec2( d.x, -d.y)).rgb * 1.0;

  vec3 tent = s * (1.0 / 16.0);
  vec3 baseMip = texture2D(uHighMipTex, vUv).rgb;
  gl_FragColor = vec4(baseMip + tent * 0.86, 1.0);
}
`,M2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D uSceneTex;
uniform sampler2D uBloomTex;
uniform vec2 uResolution;
uniform float uTime;
uniform int uDebugMode;
uniform int uCaSamples;

uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uFilmGrain;
uniform float uChromaticAberration;

// -----------------------------------------------------------------------------
// Stephen Hill Fitted ACES RRT + ODT Tone Mapping (Linear sRGB -> AP1 -> sRGB)
// Preserves incandescent white-gold highlights without scalar hue skewing.
// -----------------------------------------------------------------------------
vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFittedToneMap(vec3 color) {
  // Column-major mat3 matching Hill's row-major sRGB -> AP1 input transform
  mat3 acesInput = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  // Column-major mat3 matching Hill's AP1 -> linear sRGB output transform
  mat3 acesOutput = mat3(
     1.60475, -0.10208, -0.00327,
    -0.53108,  1.10813, -0.07276,
    -0.07367, -0.00605,  1.07602
  );

  color = acesInput * max(color, vec3(0.0));
  color = rrtAndOdtFit(color);
  color = acesOutput * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 lin) {
  lin = clamp(lin, 0.0, 1.0);
  vec3 lo = lin * 12.92;
  vec3 hi = 1.055 * pow(max(lin, vec3(1e-5)), vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), lin));
}

vec3 spectrumWeight(float t) {
  // Smooth red -> green -> blue spectral dispersion weights for [0, 1]
  vec3 w = vec3(
    clamp(1.5 - abs(t * 3.0 - 0.5) * 1.6, 0.0, 1.0),
    clamp(1.5 - abs(t * 3.0 - 1.5) * 1.6, 0.0, 1.0),
    clamp(1.5 - abs(t * 3.0 - 2.5) * 1.6, 0.0, 1.0)
  );
  return max(w, vec3(0.001));
}

float interleavedGradientNoise(vec2 pixel, float frameSeed) {
  vec2 p = pixel + vec2(frameSeed * 5.588238, frameSeed * 3.14159);
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  if (uDebugMode > 0) {
    vec3 diag = texture2D(uSceneTex, vUv).rgb;
    gl_FragColor = vec4(linearToSrgb(clamp(diag, 0.0, 1.0)), 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float radialDist = length(centered * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0));

  // Subtle peripheral radial chromatic aberration (strictly zero at center so photon ring stays sharp)
  vec3 sceneHdr = vec3(0.0);
  vec3 bloomHdr = vec3(0.0);

  if (uChromaticAberration > 0.001 && uCaSamples >= 3) {
    float dispersion = uChromaticAberration * 0.0068 * pow(radialDist, 1.85);
    vec2 caDir = (length(centered) > 1e-5) ? normalize(centered) : vec2(0.0);
    vec3 weightSum = vec3(0.0);

    for (int i = 0; i < 7; i++) {
      if (i >= uCaSamples) break;
      float t = float(i) / float(max(uCaSamples - 1, 1));
      float shift = (t - 0.5) * 2.0 * dispersion;
      vec2 sampleUv = clamp(vUv + caDir * shift, vec2(0.001), vec2(0.999));
      vec3 w = spectrumWeight(t);
      sceneHdr += texture2D(uSceneTex, sampleUv).rgb * w;
      bloomHdr += texture2D(uBloomTex, sampleUv).rgb * w;
      weightSum += w;
    }
    sceneHdr /= weightSum;
    bloomHdr /= weightSum;
  } else {
    sceneHdr = texture2D(uSceneTex, vUv).rgb;
    bloomHdr = texture2D(uBloomTex, vUv).rgb;
  }

  vec3 hdrCombined = (sceneHdr + bloomHdr * uBloomStrength) * uExposure;

  // ACES fitted tone mapping
  vec3 mapped = acesFittedToneMap(hdrCombined);

  // Restrained optical vignette (never crushes central event horizon or photon ring)
  if (uVignette > 0.001) {
    float vig = 1.0 - uVignette * 0.46 * smoothstep(0.32, 1.18, radialDist);
    mapped *= clamp(vig, 0.15, 1.0);
  }

  vec3 srgb = linearToSrgb(mapped);

  // Subtle photochemical film grain (deterministic with uTime for reproducible captures)
  if (uFilmGrain > 0.0005) {
    float timeSeed = mod(floor(uTime * 24.0 + 0.5), 1024.0);
    float n1 = interleavedGradientNoise(gl_FragCoord.xy, timeSeed);
    float n2 = interleavedGradientNoise(gl_FragCoord.xy + vec2(17.0, 31.0), timeSeed + 0.37);
    float triNoise = (n1 + n2 - 1.0); // Triangular distribution in [-1, +1]
    // Slightly less grain in deep black event horizon core so horizon stays pure dark
    float lum = dot(srgb, vec3(0.299, 0.587, 0.114));
    float grainMask = mix(0.28, 1.0, smoothstep(0.0, 0.12, lum));
    srgb = clamp(srgb + triNoise * uFilmGrain * grainMask, 0.0, 1.0);
  }

  gl_FragColor = vec4(srgb, 1.0);
}
`,kp="gargantua.schwarzschild.state.v1",Xp=1,Gd=["standard","high","cinematic"],Ii={standard:{id:"standard",label:"Standard",labelZh:"标准",renderScale:.76,mobileRenderScale:.68,maxDpr:1.5,mobileMaxDpr:1.35,maxSteps:148,stepScale:1.22,diskSubsamples:1,starLayers:2,bloomMips:3,caSamples:3},high:{id:"high",label:"High",labelZh:"高画质",renderScale:1,mobileRenderScale:.88,maxDpr:2,mobileMaxDpr:1.75,maxSteps:232,stepScale:.88,diskSubsamples:2,starLayers:3,bloomMips:5,caSamples:5},cinematic:{id:"cinematic",label:"Cinematic",labelZh:"电影级",renderScale:1.15,mobileRenderScale:1,maxDpr:2,mobileMaxDpr:2,maxSteps:348,stepScale:.62,diskSubsamples:3,starLayers:4,bloomMips:5,caSamples:7}},fo=[{index:0,id:"gargantua-hero",code:"Shift+1",name:"Gargantua Horizon",nameZh:"卡冈图雅主构图",summary:"Near-equatorial Dutch-tilt framing with primary disk, upper/lower lensed arches, and photon ring.",params:{fov:43,cameraDistance:19.5,cameraAzimuth:-24,cameraElevation:10.5,cameraRoll:-11}},{index:1,id:"photon-graze",code:"Shift+2",name:"ISCO Grazing",nameZh:"内缘掠射近景",summary:"Close relativistic flyby skimming above the hot inner disk rim and multi-order photon ring.",params:{fov:54,cameraDistance:7.2,cameraAzimuth:34,cameraElevation:4.2,cameraRoll:15}},{index:2,id:"polar-vortex",code:"Shift+3",name:"Polar Spiral",nameZh:"极向漩涡俯视",summary:"High-latitude polar vantage revealing full Keplerian MHD spiral arms and concentric photon rings.",params:{fov:44,cameraDistance:21,cameraAzimuth:108,cameraElevation:72,cameraRoll:0}},{index:3,id:"southern-eclipse",code:"Shift+4",name:"Southern Eclipse",nameZh:"南冕仰视透镜",summary:"Telephoto southern-hemisphere angle below the disk plane highlighting inverted Einstein arcs.",params:{fov:38,cameraDistance:25.5,cameraAzimuth:-138,cameraElevation:-16.5,cameraRoll:9}}],ro=[{index:0,key:"0",name:"Final Composite",nameZh:"最终合成画面",desc:"Schwarzschild null-geodesic HDR render with multi-mip Bloom, ACES tone mapping, and lens optics."},{index:1,key:"1",name:"Geodesic Steps & Termination",nameZh:"测地线步数与终止态",desc:"RK4 integration step count heatmap; photon-sphere critical trajectories peak near b_crit ≈ 2.598 r_s."},{index:2,key:"2",name:"Event Horizon & Photon Sphere",nameZh:"事件视界与光子球掩码",desc:"Black = captured inside r ≤ r_s; gold contour = unstable photon orbit zone (r_min < 1.65 r_s); blue = escaped."},{index:3,key:"3",name:"Disk Crossing Order",nameZh:"吸积盘穿越阶次",desc:"Cyan = 1st crossing (direct), Gold = 2nd crossing (lensed arch), Magenta/White = 3rd+ crossing (photon ring)."},{index:4,key:"4",name:"Doppler & Gravitational Redshift",nameZh:"相对论红移与多普勒因子",desc:"Frequency ratio g = ν_obs / ν_emit: Blue = approaching blueshift (g > 1), Red = gravitational/Doppler redshift (g < 1)."},{index:5,key:"5",name:"Curvature Deflection & Periapsis",nameZh:"引力偏折角与近心距",desc:"Total ray bending angle Δθ between initial observer ray and asymptotic direction with r_min iso-contours."},{index:6,key:"6",name:"Lensed Celestial Grid",nameZh:"背景天球透镜网格",desc:"Deflected (θ, φ) spherical coordinate grid demonstrating Einstein ring inversion around the shadow."},{index:7,key:"7",name:"Procedural Stars & Galaxy",nameZh:"程序化星空与银河背景",desc:"Isolated gravitationally lensed procedural starfield, galactic nebula band, and dust rifts without disk."},{index:8,key:"8",name:"Intrinsic Disk Temperature & MHD",nameZh:"盘面本征温度与湍流场",desc:"Rest-frame Novikov-Thorne radial temperature profile modulated by animated Keplerian spiral turbulence."},{index:9,key:"9",name:"Pre-Post Linear HDR Radiance",nameZh:"后处理前线性 HDR 辐射值",desc:"Unbloomed, untonemapped linear scene radiance (log2 HDR exposure inspection; magenta tint marks > 1.0 HDR)."}],E2=[{id:"camera",label:"Camera & Framing",labelZh:"相机与构图"},{id:"disk",label:"Accretion Disk & GR",labelZh:"吸积盘与相对论"},{id:"cosmos",label:"Procedural Cosmos",labelZh:"星空与银河"},{id:"post",label:"HDR & Lens Optics",labelZh:"HDR 与镜头后处理"}],ho=[{key:"fov",group:"camera",label:"视场角 · FOV",unit:"°",min:20,max:85,step:.5,digits:1,default:43},{key:"cameraDistance",group:"camera",label:"相机距离 · Distance",unit:"r_s",min:3.5,max:34,step:.1,digits:1,default:19.5},{key:"cameraAzimuth",group:"camera",label:"相机方位角 · Azimuth",unit:"°",min:-180,max:180,step:.5,digits:1,default:-24},{key:"cameraElevation",group:"camera",label:"相机俯仰角 · Elevation",unit:"°",min:-85,max:85,step:.5,digits:1,default:10.5},{key:"cameraRoll",group:"camera",label:"相机滚转角 · Roll",unit:"°",min:-90,max:90,step:.5,digits:1,default:-11},{key:"timeScale",group:"disk",label:"时间倍率 · Time Scale",unit:"×",min:0,max:4,step:.05,digits:2,default:1},{key:"diskInnerRadius",group:"disk",label:"盘内半径 · Inner Radius",unit:"r_s",min:1.6,max:5.5,step:.05,digits:2,default:2.65},{key:"diskOuterRadius",group:"disk",label:"盘外半径 · Outer Radius",unit:"r_s",min:5,max:22,step:.1,digits:1,default:10.8},{key:"diskHalfThickness",group:"disk",label:"盘半厚度 · Half Thickness",unit:"r_s",min:.01,max:.65,step:.005,digits:3,default:.08},{key:"diskTemperature",group:"disk",label:"盘温度 · Disk Temp",unit:"K",min:2500,max:14e3,step:100,digits:0,default:4900},{key:"diskEmission",group:"disk",label:"盘发射强度 · Emission",unit:"",min:.1,max:5,step:.05,digits:2,default:1.32},{key:"orbitalSpeedScale",group:"disk",label:"轨道速度倍率 · Orbital β",unit:"×",min:0,max:1.75,step:.02,digits:2,default:1},{key:"turbulenceAmp",group:"disk",label:"湍流幅度 · Turbulence",unit:"",min:0,max:2,step:.02,digits:2,default:.92},{key:"turbulenceSpeed",group:"disk",label:"湍流速度 · Flow Rate",unit:"×",min:0,max:3,step:.05,digits:2,default:1},{key:"starDensity",group:"cosmos",label:"恒星密度 · Star Density",unit:"×",min:0,max:2.5,step:.05,digits:2,default:1.15},{key:"galaxyBrightness",group:"cosmos",label:"银河亮度 · Galaxy Glow",unit:"×",min:0,max:3,step:.05,digits:2,default:1.45},{key:"bloomStrength",group:"post",label:"Bloom 强度 · Strength",unit:"",min:0,max:2,step:.02,digits:2,default:.44},{key:"bloomThreshold",group:"post",label:"Bloom 阈值 · Threshold",unit:"",min:.1,max:3,step:.05,digits:2,default:.92},{key:"exposure",group:"post",label:"曝光度 · Exposure",unit:"×",min:.2,max:3,step:.02,digits:2,default:1.02},{key:"vignette",group:"post",label:"暗角强度 · Vignette",unit:"",min:0,max:1.2,step:.02,digits:2,default:.34},{key:"filmGrain",group:"post",label:"胶片颗粒强度 · Film Grain",unit:"",min:0,max:.22,step:.005,digits:3,default:.026},{key:"chromaticAberration",group:"post",label:"色散强度 · Chromatic Ab.",unit:"",min:0,max:1.5,step:.02,digits:2,default:.2}],po=Object.fromEntries(ho.map(o=>[o.key,o]));function Vx(){const o={};for(const e of ho)o[e.key]=e.default;return o}function Ks(o={},e=Vx()){const i={...e};if(o&&typeof o=="object")for(const r of ho){const u=o[r.key];if(typeof u=="number"&&Number.isFinite(u))if(r.key==="cameraAzimuth"){let f=((u+180)%360+360)%360-180;Object.is(f,-0)&&(f=0),i[r.key]=f}else i[r.key]=Math.min(r.max,Math.max(r.min,u))}return i.diskOuterRadius<i.diskInnerRadius+.8&&(i.diskOuterRadius=Math.min(po.diskOuterRadius.max,Math.max(po.diskOuterRadius.min,i.diskInnerRadius+.8)),i.diskInnerRadius>i.diskOuterRadius-.8&&(i.diskInnerRadius=Math.max(po.diskInnerRadius.min,i.diskOuterRadius-.8))),i}function qp(){return{version:Xp,quality:"high",preset:0,debug:0,hudVisible:!0,drawerOpen:!1,cinematicPlaying:!0,audioEnabled:!1,capture:!1,simTime:0,params:Vx()}}function Yp(o){return typeof o=="string"&&Object.prototype.hasOwnProperty.call(Ii,o)}function kx(o){return Number.isInteger(o)&&o>=0&&o<fo.length}function Xx(o){return Number.isInteger(o)&&o>=0&&o<ro.length}function T2(o){return typeof o=="number"&&Number.isFinite(o)&&o>=0}function Vd(o,e,i){if(typeof o!="string"||!/^\d+$/.test(o.trim()))return null;const r=Number(o.trim());return!Number.isInteger(r)||r<e||r>i?null:r}function ox(o){if(typeof o!="string"||o.trim()==="")return null;const e=Number(o.trim());return!Number.isFinite(e)||e<0?null:e}function b2(){const o=qp();try{const e=window.localStorage.getItem(kp);if(!e)return o;const i=JSON.parse(e);return!i||typeof i!="object"||i.version!==Xp?o:{...o,quality:Yp(i.quality)?i.quality:o.quality,preset:i.preset===-1||kx(i.preset)?i.preset:o.preset,debug:Xx(i.debug)?i.debug:o.debug,hudVisible:typeof i.hudVisible=="boolean"?i.hudVisible:o.hudVisible,cinematicPlaying:typeof i.cinematicPlaying=="boolean"?i.cinematicPlaying:o.cinematicPlaying,params:Ks(i.params,o.params)}}catch{return o}}function kd(o){if(!(!o||o.capture))try{const e={version:Xp,quality:o.quality,preset:o.preset,debug:o.debug,hudVisible:o.hudVisible,cinematicPlaying:o.cinematicPlaying,params:o.params};window.localStorage.setItem(kp,JSON.stringify(e))}catch{}}function A2(){try{window.localStorage.removeItem(kp)}catch{}}function R2(o=window.location.search){const e=new URLSearchParams(o||""),i=e.get("capture")==="1",r=i?qp():b2(),u={...r,params:{...r.params}};if(e.has("quality")){const f=e.get("quality");u.quality=Yp(f)?f:"high"}if(e.has("preset")){const f=Vd(e.get("preset"),0,fo.length-1),h=f!==null?f:0;u.preset=h,u.params=Ks(fo[h].params,u.params),i||(u.cinematicPlaying=!1)}if(e.has("debug")){const f=Vd(e.get("debug"),0,ro.length-1);u.debug=f!==null?f:0}if(e.has("hud")){const f=Vd(e.get("hud"),0,1);u.hudVisible=f!==null?f===1:!0}if(i){u.capture=!0,u.cinematicPlaying=!1,u.audioEnabled=!1;const f=e.has("time")?ox(e.get("time")):0;u.simTime=f!==null?f:0}else if(e.has("time")){const f=ox(e.get("time"));u.simTime=f!==null?f:0}return u}class C2{constructor(e,i,r={}){this.canvas=e,this.state={...i,params:{...i.params}},this.callbacks=r,this.ready=!1,this.contextLost=!1,this.disposed=!1,this.rafId=0,this.lastFrameMs=0,this.fpsSmooth=60,this.frameCounter=0,this.userInteracting=!1,this.loopElapsed=0,this.loopAnchor={distance:this.state.params.cameraDistance,elevation:this.state.params.cameraElevation,roll:this.state.params.cameraRoll},this._rightVec=new nt,this._upVec=new nt,this._backVec=new nt,this._forwardVec=new nt,this._rollQuat=new ms,this.renderer=null,this.camera=null,this.controls=null,this.quadScene=null,this.quadCamera=null,this.quadMesh=null,this.quadGeometry=null,this.rayMaterial=null,this.prefilterMaterial=null,this.downsampleMaterial=null,this.upsampleMaterial=null,this.compositeMaterial=null,this.rtType=Ai,this.sceneRT=null,this.bloomPrefilterRT=null,this.bloomDownRTs=[],this.bloomUpRTs=[],this.blackFallbackTex=null,this.renderBudget={width:1,height:1,renderScale:1,effectiveDpr:1,maxSteps:232,diskSubsamples:2,starLayers:3,bloomMips:5,caSamples:5},this._onContextLost=this.handleContextLost.bind(this),this._onContextRestored=this.handleContextRestored.bind(this),this._onResize=this.handleResize.bind(this),this.init()}init(){this.canvas.addEventListener("webglcontextlost",this._onContextLost,!1),this.canvas.addEventListener("webglcontextrestored",this._onContextRestored,!1),window.addEventListener("resize",this._onResize,{passive:!0}),this.renderer=new i2({canvas:this.canvas,antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!!this.state.capture}),this.renderer.autoClear=!1,this.renderer.outputColorSpace=er,this.renderer.toneMapping=Ra,this.camera=new Ti(this.state.params.fov,1,.1,200),this.controls=new s2(this.camera,this.canvas),this.controls.target.set(0,0,0),this.controls.enablePan=!1,this.controls.enableDamping=!this.state.capture,this.controls.dampingFactor=.075,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.85,this.controls.minDistance=3.5,this.controls.maxDistance=34,this.controls.minPolarAngle=bn.degToRad(5),this.controls.maxPolarAngle=bn.degToRad(175),this.applyCameraFromParams(!0),this.controls.addEventListener("start",()=>{this.userInteracting=!0,this.state.cinematicPlaying&&(this.state.cinematicPlaying=!1,this.callbacks.onCameraInput?.({cinematicPlaying:!1,preset:-1,params:{...this.state.params}}))}),this.controls.addEventListener("change",()=>{this.userInteracting&&(this.syncParamsFromCamera(),this.callbacks.onCameraChange?.({params:{...this.state.params},preset:-1}))}),this.controls.addEventListener("end",()=>{this.userInteracting=!1,this.syncParamsFromCamera(),this.syncLoopAnchor(),this.callbacks.onCameraInputEnd?.({params:{...this.state.params}})}),this.buildGpuResources(),this.updateRenderTargets(),this.renderFrame(),this.ready=!0,this.state.capture||this.startLoop()}detectHdrRenderTargetType(){const e=this.renderer.getContext();if(!e)return Ai;if(this.renderer.capabilities.isWebGL2){const r=e.getExtension("EXT_color_buffer_float"),u=e.getExtension("EXT_color_buffer_half_float");if(r||u)return tr}else{const r=e.getExtension("EXT_color_buffer_half_float"),u=e.getExtension("OES_texture_half_float_linear");if(r&&u)return tr}return Ai}buildGpuResources(){this.disposeGpuResources(),this.rtType=this.detectHdrRenderTargetType();const e=new gs,i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),r=new Float32Array([0,0,2,0,0,2]);e.setAttribute("position",new Ri(i,3)),e.setAttribute("uv",new Ri(r,2)),this.quadGeometry=e;const u=new Uint8Array([0,0,0,255]);this.blackFallbackTex=new pT(u,1,1,ci),this.blackFallbackTex.needsUpdate=!0;const f=this.state.params,h=Ii[this.state.quality]||Ii.high;this.rayMaterial=new ui({vertexShader:Sl,fragmentShader:v2,depthTest:!1,depthWrite:!1,uniforms:{uCamPos:{value:new nt},uCamForward:{value:new nt(0,0,-1)},uCamRight:{value:new nt(1,0,0)},uCamUp:{value:new nt(0,1,0)},uTanHalfFov:{value:Math.tan(bn.degToRad(f.fov)*.5)},uAspect:{value:1.6},uResolution:{value:new oe(1,1)},uTime:{value:this.state.simTime},uMaxSteps:{value:h.maxSteps},uStepScale:{value:h.stepScale},uDiskSubsamples:{value:h.diskSubsamples},uStarLayers:{value:h.starLayers},uDebugMode:{value:this.state.debug},uDiskInner:{value:f.diskInnerRadius},uDiskOuter:{value:f.diskOuterRadius},uDiskHalfThickness:{value:f.diskHalfThickness},uDiskTemp:{value:f.diskTemperature},uDiskEmission:{value:f.diskEmission},uOrbitalSpeed:{value:f.orbitalSpeedScale},uTurbulenceAmp:{value:f.turbulenceAmp},uTurbulenceSpeed:{value:f.turbulenceSpeed},uStarDensity:{value:f.starDensity},uGalaxyBrightness:{value:f.galaxyBrightness}}}),this.prefilterMaterial=new ui({vertexShader:Sl,fragmentShader:x2,depthTest:!1,depthWrite:!1,uniforms:{uInputTex:{value:this.blackFallbackTex},uTexelSize:{value:new oe(1,1)},uThreshold:{value:f.bloomThreshold}}}),this.downsampleMaterial=new ui({vertexShader:Sl,fragmentShader:S2,depthTest:!1,depthWrite:!1,uniforms:{uInputTex:{value:this.blackFallbackTex},uTexelSize:{value:new oe(1,1)}}}),this.upsampleMaterial=new ui({vertexShader:Sl,fragmentShader:y2,depthTest:!1,depthWrite:!1,uniforms:{uLowMipTex:{value:this.blackFallbackTex},uHighMipTex:{value:this.blackFallbackTex},uTexelSize:{value:new oe(1,1)},uRadius:{value:1}}}),this.compositeMaterial=new ui({vertexShader:Sl,fragmentShader:M2,depthTest:!1,depthWrite:!1,uniforms:{uSceneTex:{value:this.blackFallbackTex},uBloomTex:{value:this.blackFallbackTex},uResolution:{value:new oe(1,1)},uTime:{value:this.state.simTime},uDebugMode:{value:this.state.debug},uCaSamples:{value:h.caSamples},uBloomStrength:{value:f.bloomStrength},uExposure:{value:f.exposure},uVignette:{value:f.vignette},uFilmGrain:{value:f.filmGrain},uChromaticAberration:{value:f.chromaticAberration}}}),this.quadScene=new dT,this.quadCamera=new Px(-1,1,1,-1,0,1),this.quadMesh=new Ji(this.quadGeometry,this.rayMaterial),this.quadMesh.frustumCulled=!1,this.quadScene.add(this.quadMesh),this.renderer.compile(this.quadScene,this.quadCamera)}createHdrTarget(e,i){return new ps(Math.max(1,e),Math.max(1,i),{type:this.rtType,format:ci,minFilter:bi,magFilter:bi,wrapS:Ta,wrapT:Ta,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1})}disposeRenderTargets(){this.sceneRT?.dispose(),this.sceneRT=null,this.bloomPrefilterRT?.dispose(),this.bloomPrefilterRT=null;for(const e of this.bloomDownRTs)e.dispose();for(const e of this.bloomUpRTs)e.dispose();this.bloomDownRTs=[],this.bloomUpRTs=[]}disposeGpuResources(){this.disposeRenderTargets(),this.quadGeometry?.dispose(),this.quadGeometry=null,this.rayMaterial?.dispose(),this.rayMaterial=null,this.prefilterMaterial?.dispose(),this.prefilterMaterial=null,this.downsampleMaterial?.dispose(),this.downsampleMaterial=null,this.upsampleMaterial?.dispose(),this.upsampleMaterial=null,this.compositeMaterial?.dispose(),this.compositeMaterial=null,this.blackFallbackTex?.dispose(),this.blackFallbackTex=null,this.quadScene=null,this.quadCamera=null,this.quadMesh=null}updateRenderTargets(){if(!this.renderer||this.contextLost)return;const e=this.canvas.parentElement?.getBoundingClientRect(),i=Math.max(1,Math.round(e?.width||window.innerWidth||1280)),r=Math.max(1,Math.round(e?.height||window.innerHeight||720)),u=i<=768,f=Ii[this.state.quality]||Ii.high,h=window.devicePixelRatio||1,d=u?f.mobileMaxDpr:f.maxDpr,p=Math.min(h,d),_=u?f.mobileRenderScale:f.renderScale;this.renderer.setPixelRatio(p),this.renderer.setSize(i,r,!1);const v=Math.max(64,Math.round(i*p*_)),m=Math.max(64,Math.round(r*p*_)),x=this.bloomDownRTs.length!==f.bloomMips;if(!this.sceneRT||this.sceneRT.width!==v||this.sceneRT.height!==m||x){this.disposeRenderTargets(),this.sceneRT=this.createHdrTarget(v,m);let A=Math.max(2,Math.floor(v*.5)),D=Math.max(2,Math.floor(m*.5));this.bloomPrefilterRT=this.createHdrTarget(A,D);for(let y=0;y<f.bloomMips;y++)A=Math.max(2,Math.floor(A*.5)),D=Math.max(2,Math.floor(D*.5)),this.bloomDownRTs.push(this.createHdrTarget(A,D));for(let y=f.bloomMips-2;y>=0;y--){const S=this.bloomDownRTs[y];this.bloomUpRTs.push(this.createHdrTarget(S.width,S.height))}this.bloomUpRTs.push(this.createHdrTarget(this.bloomPrefilterRT.width,this.bloomPrefilterRT.height))}this.renderBudget={width:v,height:m,cssWidth:i,cssHeight:r,renderScale:Number(_.toFixed(2)),effectiveDpr:Number(p.toFixed(2)),maxSteps:f.maxSteps,diskSubsamples:f.diskSubsamples,starLayers:f.starLayers,bloomMips:f.bloomMips,caSamples:f.caSamples},this.callbacks.onBudgetChange?.({...this.renderBudget})}handleResize(){this.disposed||this.contextLost||(this.updateRenderTargets(),this.rafId||this.renderFrame())}syncLoopAnchor(){this.loopElapsed=0,this.loopAnchor={distance:this.state.params.cameraDistance,elevation:this.state.params.cameraElevation,roll:this.state.params.cameraRoll}}applyCameraFromParams(e=!0){if(!this.camera||!this.controls)return;const i=this.state.params,r=bn.clamp(i.cameraDistance,3.5,34),u=bn.degToRad(bn.clamp(i.cameraElevation,-85,85)),f=bn.degToRad(i.cameraAzimuth),h=Math.cos(u);this.camera.position.set(r*h*Math.sin(f),r*Math.sin(u),r*h*Math.cos(f)),this.camera.fov=i.fov,this.controls.target.set(0,0,0);const d=this.controls.enableDamping;e&&(this.controls.enableDamping=!1),this.controls.update(),this.controls.enableDamping=d}syncParamsFromCamera(){if(!this.camera)return;const e=this.camera.position,i=bn.clamp(e.length(),3.5,34),r=bn.clamp(e.y/Math.max(i,1e-5),-1,1),u=bn.clamp(bn.radToDeg(Math.asin(r)),-85,85);let f=bn.radToDeg(Math.atan2(e.x,e.z));Object.is(f,-0)&&(f=0),this.state.params.cameraDistance=Number(i.toFixed(2)),this.state.params.cameraElevation=Number(u.toFixed(2)),this.state.params.cameraAzimuth=Number(f.toFixed(2))}syncShaderUniforms(){if(!this.rayMaterial||!this.compositeMaterial||!this.sceneRT)return;const e=this.state.params,i=Ii[this.state.quality]||Ii.high,r=Math.max(1,this.canvas.width),u=Math.max(1,this.canvas.height),f=r/u;this.camera.fov=e.fov,this.camera.aspect=f,this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(!0),this.camera.matrixWorld.extractBasis(this._rightVec,this._upVec,this._backVec),this._forwardVec.copy(this._backVec).negate().normalize(),this._rightVec.normalize(),this._upVec.normalize();const h=bn.degToRad(e.cameraRoll||0);Math.abs(h)>1e-5&&(this._rollQuat.setFromAxisAngle(this._forwardVec,h),this._rightVec.applyQuaternion(this._rollQuat).normalize(),this._upVec.applyQuaternion(this._rollQuat).normalize());const d=this.rayMaterial.uniforms;d.uCamPos.value.copy(this.camera.position),d.uCamForward.value.copy(this._forwardVec),d.uCamRight.value.copy(this._rightVec),d.uCamUp.value.copy(this._upVec);const p=Math.tan(bn.degToRad(e.fov)*.5),_=f<1?1/Math.max(f*1.08,.56):1;d.uTanHalfFov.value=p*_,d.uAspect.value=f,d.uResolution.value.set(this.sceneRT.width,this.sceneRT.height),d.uTime.value=this.state.simTime,d.uMaxSteps.value=i.maxSteps,d.uStepScale.value=i.stepScale,d.uDiskSubsamples.value=i.diskSubsamples,d.uStarLayers.value=i.starLayers,d.uDebugMode.value=this.state.debug,d.uDiskInner.value=e.diskInnerRadius,d.uDiskOuter.value=e.diskOuterRadius,d.uDiskHalfThickness.value=e.diskHalfThickness,d.uDiskTemp.value=e.diskTemperature,d.uDiskEmission.value=e.diskEmission,d.uOrbitalSpeed.value=e.orbitalSpeedScale,d.uTurbulenceAmp.value=e.turbulenceAmp,d.uTurbulenceSpeed.value=e.turbulenceSpeed,d.uStarDensity.value=e.starDensity,d.uGalaxyBrightness.value=e.galaxyBrightness;const v=this.compositeMaterial.uniforms;v.uResolution.value.set(r,u),v.uTime.value=this.state.simTime,v.uDebugMode.value=this.state.debug,v.uCaSamples.value=i.caSamples,v.uBloomStrength.value=e.bloomStrength,v.uExposure.value=e.exposure,v.uVignette.value=e.vignette,v.uFilmGrain.value=e.filmGrain,v.uChromaticAberration.value=e.chromaticAberration}renderFrame(){if(this.disposed||this.contextLost||!this.renderer||!this.sceneRT||!this.quadMesh)return;this.controls&&!this.state.capture&&this.userInteracting&&this.controls.update(),this.syncShaderUniforms(),this.quadMesh.material=this.rayMaterial,this.renderer.setRenderTarget(this.sceneRT),this.renderer.render(this.quadScene,this.quadCamera);let e=this.blackFallbackTex;if(this.state.debug===0&&this.state.params.bloomStrength>.001&&this.bloomPrefilterRT&&this.bloomDownRTs.length>0&&this.bloomUpRTs.length>0){this.prefilterMaterial.uniforms.uInputTex.value=this.sceneRT.texture,this.prefilterMaterial.uniforms.uTexelSize.value.set(1/this.sceneRT.width,1/this.sceneRT.height),this.prefilterMaterial.uniforms.uThreshold.value=this.state.params.bloomThreshold,this.quadMesh.material=this.prefilterMaterial,this.renderer.setRenderTarget(this.bloomPrefilterRT),this.renderer.render(this.quadScene,this.quadCamera),this.quadMesh.material=this.downsampleMaterial;let r=this.bloomPrefilterRT;for(let f=0;f<this.bloomDownRTs.length;f++){const h=this.bloomDownRTs[f];this.downsampleMaterial.uniforms.uInputTex.value=r.texture,this.downsampleMaterial.uniforms.uTexelSize.value.set(1/r.width,1/r.height),this.renderer.setRenderTarget(h),this.renderer.render(this.quadScene,this.quadCamera),r=h}this.quadMesh.material=this.upsampleMaterial;let u=this.bloomDownRTs[this.bloomDownRTs.length-1];for(let f=0;f<this.bloomUpRTs.length;f++){const h=this.bloomUpRTs[f],d=this.bloomDownRTs.length-2-f,p=d>=0?this.bloomDownRTs[d]:this.bloomPrefilterRT;this.upsampleMaterial.uniforms.uLowMipTex.value=u.texture,this.upsampleMaterial.uniforms.uHighMipTex.value=p.texture,this.upsampleMaterial.uniforms.uTexelSize.value.set(1/u.width,1/u.height),this.upsampleMaterial.uniforms.uRadius.value=1.15,this.renderer.setRenderTarget(h),this.renderer.render(this.quadScene,this.quadCamera),u=h}e=u.texture}this.compositeMaterial.uniforms.uSceneTex.value=this.sceneRT.texture,this.compositeMaterial.uniforms.uBloomTex.value=e,this.quadMesh.material=this.compositeMaterial,this.renderer.setRenderTarget(null),this.renderer.render(this.quadScene,this.quadCamera)}startLoop(){if(this.rafId||this.disposed||this.contextLost||this.state.capture)return;this.lastFrameMs=performance.now();const e=i=>{if(this.disposed||this.contextLost||this.state.capture){this.rafId=0;return}this.rafId=window.requestAnimationFrame(e);const r=Math.max(0,(i-this.lastFrameMs)*.001);this.lastFrameMs=i;const u=Math.min(r,.1);if(r>5e-4){const f=1/r;this.fpsSmooth=this.fpsSmooth*.92+f*.08}if(this.state.simTime+=u*this.state.params.timeScale,this.state.cinematicPlaying&&!this.userInteracting){this.loopElapsed+=u;const f=((this.state.params.cameraAzimuth+u*1.65+180)%360+360)%360-180,h=Math.sin(this.loopElapsed*.22)*2.4,d=(1-Math.cos(this.loopElapsed*.16))*-.65,p=Math.sin(this.loopElapsed*.17)*2.2;this.state.params.cameraAzimuth=Number(f.toFixed(2)),this.state.params.cameraElevation=Number(bn.clamp(this.loopAnchor.elevation+h,-82,82).toFixed(2)),this.state.params.cameraDistance=Number(bn.clamp(this.loopAnchor.distance+d,4,33).toFixed(2)),this.state.params.cameraRoll=Number(bn.clamp(this.loopAnchor.roll+p,-85,85).toFixed(2)),this.applyCameraFromParams(!0)}else this.controls.enableDamping&&this.controls.update();this.renderFrame(),this.frameCounter+=1,this.frameCounter%12===0&&this.callbacks.onTelemetry?.({fps:Math.round(this.fpsSmooth),simTime:this.state.simTime,params:this.state.cinematicPlaying?{...this.state.params}:null})};this.rafId=window.requestAnimationFrame(e)}stopLoop(){this.rafId&&(window.cancelAnimationFrame(this.rafId),this.rafId=0)}applyState(e,{cameraUpdated:i=!1,resetAnchor:r=!1,renderImmediate:u=!0}={}){const f=e.quality!==this.state.quality,h=e.capture!==this.state.capture;this.state={...e,params:{...e.params}},this.controls&&(this.controls.enableDamping=!this.state.capture),i&&this.applyCameraFromParams(!0),(r||i)&&this.syncLoopAnchor(),f&&this.updateRenderTargets(),h&&(this.state.capture?this.stopLoop():this.contextLost||this.startLoop()),u&&!this.contextLost&&this.renderFrame()}handleContextLost(e){e.preventDefault(),this.stopLoop(),this.contextLost=!0,this.ready=!1,document.documentElement.dataset.gargantuaReady="false",document.documentElement.dataset.gargantuaContextLost="true",this.callbacks.onContextLost?.()}handleContextRestored(){this.disposed||window.setTimeout(()=>{if(!this.disposed)try{this.contextLost=!1,this.buildGpuResources(),this.applyCameraFromParams(!0),this.updateRenderTargets(),this.renderFrame(),this.ready=!0,delete document.documentElement.dataset.gargantuaContextLost,document.documentElement.dataset.gargantuaReady="true",this.callbacks.onContextRestored?.(),this.state.capture||this.startLoop()}catch(e){this.callbacks.onError?.(e)}},24)}dispose(){this.disposed=!0,this.stopLoop(),window.removeEventListener("resize",this._onResize),this.canvas&&(this.canvas.removeEventListener("webglcontextlost",this._onContextLost,!1),this.canvas.removeEventListener("webglcontextrestored",this._onContextRestored,!1)),this.controls?.dispose(),this.disposeGpuResources(),this.renderer?.dispose(),this.renderer=null}}class D2{constructor(){this.ctx=null,this.masterGain=null,this.nodes=[],this.lfoTimer=null,this.enabled=!1}initGraph(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const i=new e;this.ctx=i;const r=i.createGain();r.gain.setValueAtTime(1e-4,i.currentTime),r.connect(i.destination),this.masterGain=r;const u=i.createBiquadFilter();u.type="lowpass",u.frequency.setValueAtTime(360,i.currentTime),u.Q.setValueAtTime(1.4,i.currentTime);const f=i.createGain();f.gain.value=.68;const h=i.createDelay(2),d=i.createDelay(2);h.delayTime.value=.43,d.delayTime.value=.61;const p=i.createGain();p.gain.value=.36;const _=i.createGain();_.gain.value=.34,u.connect(f),f.connect(r),u.connect(h),h.connect(d),d.connect(p),p.connect(h),h.connect(_),d.connect(_),_.connect(r);const v=[{freq:73.42,type:"sine",detune:-3,amp:.28},{freq:110,type:"triangle",detune:4,amp:.16},{freq:146.83,type:"sine",detune:-5,amp:.18},{freq:164.81,type:"sine",detune:6,amp:.09},{freq:220,type:"triangle",detune:-4,amp:.07}];for(const M of v){const A=i.createOscillator(),D=i.createGain();A.type=M.type,A.frequency.setValueAtTime(M.freq,i.currentTime),A.detune.setValueAtTime(M.detune,i.currentTime),D.gain.setValueAtTime(M.amp,i.currentTime),A.connect(D),D.connect(u),A.start(),this.nodes.push(A,D)}const m=i.createOscillator(),x=i.createGain();m.type="sine",m.frequency.setValueAtTime(.07,i.currentTime),x.gain.setValueAtTime(150,i.currentTime),m.connect(x),x.connect(u.frequency),m.start(),this.nodes.push(m,x,u,f,h,d,p,_)}async setEnabled(e){const i=!!e;if(this.enabled=i,!i){if(this.ctx&&this.masterGain){const r=this.ctx.currentTime;this.masterGain.gain.cancelScheduledValues(r),this.masterGain.gain.setTargetAtTime(1e-4,r,.18)}return!1}try{if(this.initGraph(),!this.ctx)return this.enabled=!1,!1;this.ctx.state==="suspended"&&await this.ctx.resume();const r=this.ctx.currentTime;return this.masterGain.gain.cancelScheduledValues(r),this.masterGain.gain.setTargetAtTime(.18,r,.45),!0}catch{return this.enabled=!1,!1}}dispose(){if(this.enabled=!1,this.ctx){try{this.ctx.close()}catch{}this.ctx=null,this.masterGain=null,this.nodes=[]}}}const w2=new Set(["fov","cameraDistance","cameraAzimuth","cameraElevation","cameraRoll"]);function U2(){const[o,e]=en.useState(()=>R2(window.location.search)),[i,r]=en.useState({fps:60,simTime:o.simTime}),[u,f]=en.useState(()=>{const E=Ii[o.quality]||Ii.high;return{width:window.innerWidth,height:window.innerHeight,renderScale:E.renderScale,effectiveDpr:Math.min(window.devicePixelRatio||1,E.maxDpr),maxSteps:E.maxSteps,diskSubsamples:E.diskSubsamples,starLayers:E.starLayers,bloomMips:E.bloomMips,caSamples:E.caSamples}}),[h,d]=en.useState(!1),p=en.useRef(null),_=en.useRef(null),v=en.useRef(null),m=en.useRef(o);m.current=o;const x=en.useCallback((E,L={})=>{const Q=m.current,J=typeof E=="function"?E(Q):E,lt={...J,params:Ks(J.params,Q.params)};return m.current=lt,e(lt),kd(lt),_.current?.applyState(lt,L),lt},[]),M=en.useCallback(()=>{const E=m.current,L=_.current,Q=L?L.state.simTime:E.simTime,J=L?{...L.state.params}:{...E.params};return{ready:!!(L?.ready&&!L?.contextLost),capture:!!E.capture,contextLost:!!L?.contextLost,quality:E.quality,preset:E.preset,presetName:fo[E.preset]?.name??"Custom Orbit",debug:E.debug,debugName:ro[E.debug]?.name??"Final Composite",time:Number(Q.toFixed(4)),hud:E.hudVisible?1:0,hudVisible:!!E.hudVisible,cinematicPlaying:!!E.cinematicPlaying,audioEnabled:!!E.audioEnabled,renderBudget:L?{...L.renderBudget}:{...u},params:J}},[u]),A=en.useCallback(E=>Yp(E)?(x(L=>({...L,quality:E}),{renderImmediate:!0}),{...M(),ok:!0}):{...M(),ok:!1,error:'Invalid quality: expected "standard", "high", or "cinematic".'},[M,x]),D=en.useCallback(()=>{const E=Gd.indexOf(m.current.quality),L=Gd[(E+1)%Gd.length];return A(L)},[A]),y=en.useCallback(E=>{if(!kx(E))return{...M(),ok:!1,error:"Invalid preset: expected integer 0..3."};const L=fo[E];return x(Q=>({...Q,preset:E,cinematicPlaying:!1,params:Ks({...Q.params,...L.params},Q.params)}),{cameraUpdated:!0,resetAnchor:!0,renderImmediate:!0}),{...M(),ok:!0}},[M,x]),S=en.useCallback(E=>Xx(E)?(x(L=>({...L,debug:E}),{renderImmediate:!0}),{...M(),ok:!0}):{...M(),ok:!1,error:"Invalid debug mode: expected integer 0..9."},[M,x]),I=en.useCallback(E=>T2(E)?(x(L=>({...L,simTime:E}),{renderImmediate:!0}),r(L=>({...L,simTime:E})),{...M(),ok:!0}):{...M(),ok:!1,error:"Invalid time: expected a finite non-negative number."},[M,x]),z=en.useCallback((E,L)=>{const Q=po[E],J=Number(L);if(!Q||!Number.isFinite(J))return;const lt=w2.has(E);x(ut=>{const H={...ut.params,[E]:J};return E==="diskInnerRadius"&&H.diskInnerRadius>H.diskOuterRadius-.8?H.diskOuterRadius=Math.min(po.diskOuterRadius.max,H.diskInnerRadius+.8):E==="diskOuterRadius"&&H.diskOuterRadius<H.diskInnerRadius+.8&&(H.diskInnerRadius=Math.max(po.diskInnerRadius.min,H.diskOuterRadius-.8)),{...ut,preset:lt?-1:ut.preset,cinematicPlaying:lt?!1:ut.cinematicPlaying,params:H}},{cameraUpdated:lt,resetAnchor:lt,renderImmediate:!0})},[x]),N=en.useCallback(()=>{m.current.capture||x(E=>{const L=_.current?{..._.current.state.params}:E.params;return{...E,cinematicPlaying:!E.cinematicPlaying,params:L}},{resetAnchor:!0,renderImmediate:!0})},[x]),K=en.useCallback(()=>{x(E=>({...E,hudVisible:!E.hudVisible}),{renderImmediate:!1})},[x]),V=en.useCallback(async()=>{if(m.current.capture)return;v.current||(v.current=new D2);const E=!m.current.audioEnabled,L=await v.current.setEnabled(E);x(Q=>({...Q,audioEnabled:L}),{renderImmediate:!1})},[x]),P=en.useCallback(()=>{A2();const E=qp(),L=m.current.capture;v.current&&v.current.setEnabled(!1),x({...E,capture:L,cinematicPlaying:L?!1:E.cinematicPlaying,simTime:L?m.current.simTime:0},{cameraUpdated:!0,resetAnchor:!0,renderImmediate:!0}),r(Q=>({...Q,simTime:L?m.current.simTime:0}))},[x]);en.useEffect(()=>{const E=p.current;if(!E)return;document.documentElement.dataset.gargantuaReady="false";const L=new C2(E,m.current,{onBudgetChange:J=>f(J),onCameraInput:({cinematicPlaying:J,preset:lt,params:ut})=>{const H={...m.current,cinematicPlaying:J,preset:lt,params:Ks(ut,m.current.params)};m.current=H,e(H),kd(H)},onCameraChange:({params:J,preset:lt})=>{const ut={...m.current,preset:lt,params:Ks(J,m.current.params)};m.current=ut,e(ut)},onCameraInputEnd:({params:J})=>{const lt={...m.current,params:Ks(J,m.current.params)};m.current=lt,e(lt),kd(lt)},onTelemetry:({fps:J,simTime:lt,params:ut})=>{if(r({fps:J,simTime:lt}),ut){const H={...m.current,simTime:lt,params:ut};m.current=H,e(H)}else m.current.simTime=lt},onContextLost:()=>d(!0),onContextRestored:()=>d(!1)});_.current=L,f({...L.renderBudget});const Q={};return Object.defineProperty(Q,"ready",{get:()=>!!(_.current?.ready&&!_.current?.contextLost),enumerable:!0,configurable:!1}),Q.getState=()=>M(),Q.setQuality=J=>A(J),Q.setPreset=J=>y(J),Q.setDebug=J=>S(J),Q.setTime=J=>I(J),Q.reset=()=>(P(),{...M(),ok:!0}),window.__GARGANTUA__=Q,document.documentElement.dataset.gargantuaReady=L.ready?"true":"false",()=>{document.documentElement.dataset.gargantuaReady="false",v.current?.dispose(),v.current=null,L.dispose(),_.current=null,window.__GARGANTUA__===Q&&delete window.__GARGANTUA__}},[]),en.useEffect(()=>{const E=L=>{const Q=L.target;if(Q&&(Q.tagName==="TEXTAREA"||Q.tagName==="INPUT"&&Q.type!=="range")||L.ctrlKey||L.altKey||L.metaKey)return;if(L.shiftKey){const lt={Digit1:0,Digit2:1,Digit3:2,Digit4:3},ut={"!":0,"@":1,"#":2,$:3},H=lt[L.code]??ut[L.key]??void 0;if(H!==void 0){L.preventDefault(),y(H);return}}if(!L.shiftKey){if(/^Digit[0-9]$/.test(L.code)){L.preventDefault(),S(Number(L.code.slice(5)));return}if(/^Numpad[0-9]$/.test(L.code)){L.preventDefault(),S(Number(L.code.slice(6)));return}}if(L.code==="Space"){L.preventDefault(),N();return}const J=L.key.toLowerCase();J==="h"?(L.preventDefault(),K()):J==="r"?(L.preventDefault(),P()):J==="q"?(L.preventDefault(),D()):J==="m"&&(L.preventDefault(),V())};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[D,P,S,y,V,K,N]);const k=ro[o.debug]||ro[0],w=Ii[o.quality]||Ii.high;return St.jsxs("div",{className:"gargantua-stage",children:[St.jsx("canvas",{ref:p,className:"gargantua-canvas"}),h&&St.jsx("div",{className:"context-lost-banner",role:"alert",children:St.jsxs("div",{className:"context-lost-card",children:[St.jsx("h2",{children:"WebGL 上下文已挂起 · GPU Context Lost"}),St.jsx("p",{children:"零测地线渲染循环已安全暂停。当前相机、吸积盘参数、质量档与调试视图均已保留，等待 GPU 触发恢复信号后自动重建 HDR RenderTarget 与 Shader 资源。"}),St.jsx("span",{className:"context-status-pill",children:"Standing by for webglcontextrestored…"})]})}),!o.hudVisible&&!o.capture&&St.jsx("div",{className:"hud-restore-pill",children:St.jsxs("button",{type:"button",className:"hud-btn glass-panel",onClick:K,children:["显示 HUD ",St.jsx("span",{className:"kbd-tag",children:"H"})]})}),o.hudVisible&&St.jsxs("div",{className:"hud-layer",children:[St.jsxs("header",{className:"hud-masthead glass-panel",children:[St.jsxs("div",{className:"masthead-top",children:[St.jsx("h1",{className:"brand-title",children:"GARGANTUA"}),St.jsx("span",{className:"brand-subtitle",children:"SCHWARZSCHILD NULL-GEODESIC RAYTRACER · r_s = 2GM/c²"})]}),St.jsxs("div",{className:"telemetry-pills",children:[St.jsxs("button",{type:"button",className:"hud-btn active",onClick:D,title:"切换渲染质量档 (Q)",children:["质量: ",w.label," (",w.labelZh,")",St.jsx("span",{className:"kbd-tag",children:"Q"})]}),St.jsxs("button",{type:"button",className:`hud-btn ${o.cinematicPlaying?"cyan-active":""}`,onClick:N,title:"播放/暂停电影镜头循环 (Space)",children:["镜头: ",o.cinematicPlaying?"巡航中 Loop":"手动 Orbit",St.jsx("span",{className:"kbd-tag",children:"Space"})]}),St.jsxs("button",{type:"button",className:`hud-btn ${o.audioEnabled?"active":""}`,onClick:V,title:"程序化深空管风琴氛围音 (M)",children:["音效: ",o.audioEnabled?"开启":"静音",St.jsx("span",{className:"kbd-tag",children:"M"})]}),St.jsxs("button",{type:"button",className:"hud-btn",onClick:P,title:"恢复默认参数与视角 (R)",children:["重置 ",St.jsx("span",{className:"kbd-tag",children:"R"})]}),St.jsxs("button",{type:"button",className:"hud-btn",onClick:K,title:"隐藏/显示 HUD (H)",children:["隐藏 ",St.jsx("span",{className:"kbd-tag",children:"H"})]}),St.jsxs("button",{type:"button",className:`hud-btn mobile-only ${o.drawerOpen?"active":""}`,onClick:()=>e(E=>({...E,drawerOpen:!E.drawerOpen})),children:["参数抽屉 (",ho.length,")"]})]}),St.jsxs("div",{className:"telemetry-meta",children:[St.jsxs("span",{children:[St.jsx("strong",{children:i.fps})," FPS"]}),St.jsxs("span",{children:["Render ",St.jsxs("strong",{children:[u.width,"×",u.height]})]}),St.jsxs("span",{children:["RK4 ",St.jsx("strong",{children:u.maxSteps})," steps"]}),St.jsxs("span",{children:["Bloom ",St.jsx("strong",{children:u.bloomMips})," mips"]}),St.jsxs("span",{children:["t = ",St.jsxs("strong",{children:[i.simTime.toFixed(1),"s"]})]}),St.jsx("span",{children:"拖拽旋转 · 滚轮/双指缩放"})]})]}),St.jsxs("section",{className:"hud-bottom-left glass-panel","aria-label":"视角预设与调试视图",children:[St.jsxs("div",{className:"strip-label-row",children:[St.jsx("span",{children:"视角预设 · Camera Presets"}),St.jsx("span",{children:"Shift+1 – Shift+4"})]}),St.jsx("div",{className:"preset-grid",children:fo.map(E=>St.jsxs("button",{type:"button",className:`preset-btn ${o.preset===E.index?"active":""}`,onClick:()=>y(E.index),children:[St.jsxs("span",{className:"preset-top",children:[St.jsxs("span",{children:["0",E.index+1]}),St.jsx("span",{children:E.code})]}),St.jsx("span",{className:"preset-name",children:E.nameZh}),St.jsx("span",{className:"preset-sub",children:E.name})]},E.id))}),St.jsxs("div",{className:"debug-bar",children:[St.jsx("div",{className:"debug-buttons",children:ro.map(E=>St.jsx("button",{type:"button",className:`debug-btn ${o.debug===E.index?"active":""}`,onClick:()=>S(E.index),title:`${E.index}: ${E.nameZh} (${E.name})`,children:E.key},E.index))}),St.jsxs("div",{className:"debug-readout",children:[St.jsxs("strong",{children:["[",k.index,"] ",k.nameZh," (",k.name,")"]})," — ",k.desc]})]})]}),St.jsxs("aside",{className:`hud-inspector glass-panel ${o.drawerOpen?"drawer-open":""}`,"aria-label":"物理与后处理参数控制面板",children:[St.jsxs("div",{className:"inspector-header",children:[St.jsxs("span",{className:"inspector-title",children:["参数控制台 · ",ho.length," Controls"]}),St.jsxs("div",{style:{display:"flex",gap:"6px"},children:[St.jsx("button",{type:"button",className:"hud-btn",onClick:P,children:"全部复位"}),St.jsx("button",{type:"button",className:"hud-btn mobile-only",onClick:()=>e(E=>({...E,drawerOpen:!1})),children:"收起"})]})]}),St.jsxs("div",{className:"inspector-scroll",children:[E2.map(E=>{const L=ho.filter(Q=>Q.group===E.id);return St.jsxs("div",{className:"param-section",children:[St.jsxs("div",{className:"param-section-title",children:[St.jsx("span",{children:E.labelZh}),St.jsx("span",{children:E.label})]}),L.map(Q=>{const J=o.params[Q.key];return St.jsxs("div",{className:"param-row",children:[St.jsxs("div",{className:"param-label-line",children:[St.jsx("label",{htmlFor:`ctrl-${Q.key}`,className:"param-label",children:Q.label}),St.jsxs("span",{className:"param-val",children:[Number(J).toFixed(Q.digits),Q.unit?` ${Q.unit}`:""]})]}),St.jsx("input",{id:`ctrl-${Q.key}`,className:"param-slider",type:"range",min:Q.min,max:Q.max,step:Q.step,value:J,onChange:lt=>z(Q.key,lt.target.value),onDoubleClick:()=>z(Q.key,Q.default),title:"双击恢复单项默认值"})]},Q.key)})]},E.id)}),St.jsxs("div",{className:"shortcuts-card",children:[St.jsx("div",{className:"shortcuts-title",children:"快捷键 · Shortcuts"}),St.jsxs("div",{className:"shortcut-list",children:[St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"调试视图"}),St.jsx("span",{className:"kbd-tag",children:"0 – 9"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"视角预设"}),St.jsx("span",{className:"kbd-tag",children:"Shift+1–4"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"电影镜头"}),St.jsx("span",{className:"kbd-tag",children:"Space"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"质量切换"}),St.jsx("span",{className:"kbd-tag",children:"Q"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"显隐 HUD"}),St.jsx("span",{className:"kbd-tag",children:"H"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"重置参数"}),St.jsx("span",{className:"kbd-tag",children:"R"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"氛围音乐"}),St.jsx("span",{className:"kbd-tag",children:"M"})]}),St.jsxs("div",{className:"shortcut-item",children:[St.jsx("span",{children:"单项复位"}),St.jsx("span",{className:"kbd-tag",children:"双击滑块"})]})]})]})]})]})]})]})}const N2=document.getElementById("root");OM.createRoot(N2).render(St.jsx(U2,{}));
