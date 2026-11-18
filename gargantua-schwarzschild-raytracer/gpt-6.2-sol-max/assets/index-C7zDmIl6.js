(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var If={exports:{}},Uo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bg;function Lx(){if(Bg)return Uo;Bg=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:h,ref:l!==void 0?l:null,props:c}}return Uo.Fragment=t,Uo.jsx=i,Uo.jsxs=i,Uo}var Ig;function Nx(){return Ig||(Ig=1,If.exports=Lx()),If.exports}var _t=Nx(),Ff={exports:{}},ue={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fg;function Ox(){if(Fg)return ue;Fg=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),x=Symbol.iterator;function S(w){return w===null||typeof w!="object"?null:(w=x&&w[x]||w["@@iterator"],typeof w=="function"?w:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function y(w,nt,Tt){this.props=w,this.context=nt,this.refs=D,this.updater=Tt||M}y.prototype.isReactComponent={},y.prototype.setState=function(w,nt){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,nt,"setState")},y.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function _(){}_.prototype=y.prototype;function I(w,nt,Tt){this.props=w,this.context=nt,this.refs=D,this.updater=Tt||M}var z=I.prototype=new _;z.constructor=I,C(z,y.prototype),z.isPureReactComponent=!0;var N=Array.isArray,V={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function L(w,nt,Tt,vt,Y,ht){return Tt=ht.ref,{$$typeof:r,type:w,key:nt,ref:Tt!==void 0?Tt:null,props:ht}}function B(w,nt){return L(w.type,nt,void 0,void 0,void 0,w.props)}function R(w){return typeof w=="object"&&w!==null&&w.$$typeof===r}function E(w){var nt={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(Tt){return nt[Tt]})}var P=/\/+/g;function ot(w,nt){return typeof w=="object"&&w!==null&&w.key!=null?E(""+w.key):nt.toString(36)}function at(){}function ct(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(at,at):(w.status="pending",w.then(function(nt){w.status==="pending"&&(w.status="fulfilled",w.value=nt)},function(nt){w.status==="pending"&&(w.status="rejected",w.reason=nt)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function ft(w,nt,Tt,vt,Y){var ht=typeof w;(ht==="undefined"||ht==="boolean")&&(w=null);var xt=!1;if(w===null)xt=!0;else switch(ht){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(w.$$typeof){case r:case t:xt=!0;break;case g:return xt=w._init,ft(xt(w._payload),nt,Tt,vt,Y)}}if(xt)return Y=Y(w),xt=vt===""?"."+ot(w,0):vt,N(Y)?(Tt="",xt!=null&&(Tt=xt.replace(P,"$&/")+"/"),ft(Y,nt,Tt,"",function(zt){return zt})):Y!=null&&(R(Y)&&(Y=B(Y,Tt+(Y.key==null||w&&w.key===Y.key?"":(""+Y.key).replace(P,"$&/")+"/")+xt)),nt.push(Y)),1;xt=0;var bt=vt===""?".":vt+":";if(N(w))for(var Rt=0;Rt<w.length;Rt++)vt=w[Rt],ht=bt+ot(vt,Rt),xt+=ft(vt,nt,Tt,ht,Y);else if(Rt=S(w),typeof Rt=="function")for(w=Rt.call(w),Rt=0;!(vt=w.next()).done;)vt=vt.value,ht=bt+ot(vt,Rt++),xt+=ft(vt,nt,Tt,ht,Y);else if(ht==="object"){if(typeof w.then=="function")return ft(ct(w),nt,Tt,vt,Y);throw nt=String(w),Error("Objects are not valid as a React child (found: "+(nt==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":nt)+"). If you meant to render a collection of children, use an array instead.")}return xt}function X(w,nt,Tt){if(w==null)return w;var vt=[],Y=0;return ft(w,vt,"","",function(ht){return nt.call(Tt,ht,Y++)}),vt}function st(w){if(w._status===-1){var nt=w._result;nt=nt(),nt.then(function(Tt){(w._status===0||w._status===-1)&&(w._status=1,w._result=Tt)},function(Tt){(w._status===0||w._status===-1)&&(w._status=2,w._result=Tt)}),w._status===-1&&(w._status=0,w._result=nt)}if(w._status===1)return w._result.default;throw w._result}var j=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var nt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(nt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)};function yt(){}return ue.Children={map:X,forEach:function(w,nt,Tt){X(w,function(){nt.apply(this,arguments)},Tt)},count:function(w){var nt=0;return X(w,function(){nt++}),nt},toArray:function(w){return X(w,function(nt){return nt})||[]},only:function(w){if(!R(w))throw Error("React.Children.only expected to receive a single React element child.");return w}},ue.Component=y,ue.Fragment=i,ue.Profiler=l,ue.PureComponent=I,ue.StrictMode=s,ue.Suspense=m,ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=V,ue.act=function(){throw Error("act(...) is not supported in production builds of React.")},ue.cache=function(w){return function(){return w.apply(null,arguments)}},ue.cloneElement=function(w,nt,Tt){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var vt=C({},w.props),Y=w.key,ht=void 0;if(nt!=null)for(xt in nt.ref!==void 0&&(ht=void 0),nt.key!==void 0&&(Y=""+nt.key),nt)!H.call(nt,xt)||xt==="key"||xt==="__self"||xt==="__source"||xt==="ref"&&nt.ref===void 0||(vt[xt]=nt[xt]);var xt=arguments.length-2;if(xt===1)vt.children=Tt;else if(1<xt){for(var bt=Array(xt),Rt=0;Rt<xt;Rt++)bt[Rt]=arguments[Rt+2];vt.children=bt}return L(w.type,Y,void 0,void 0,ht,vt)},ue.createContext=function(w){return w={$$typeof:h,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:c,_context:w},w},ue.createElement=function(w,nt,Tt){var vt,Y={},ht=null;if(nt!=null)for(vt in nt.key!==void 0&&(ht=""+nt.key),nt)H.call(nt,vt)&&vt!=="key"&&vt!=="__self"&&vt!=="__source"&&(Y[vt]=nt[vt]);var xt=arguments.length-2;if(xt===1)Y.children=Tt;else if(1<xt){for(var bt=Array(xt),Rt=0;Rt<xt;Rt++)bt[Rt]=arguments[Rt+2];Y.children=bt}if(w&&w.defaultProps)for(vt in xt=w.defaultProps,xt)Y[vt]===void 0&&(Y[vt]=xt[vt]);return L(w,ht,void 0,void 0,null,Y)},ue.createRef=function(){return{current:null}},ue.forwardRef=function(w){return{$$typeof:d,render:w}},ue.isValidElement=R,ue.lazy=function(w){return{$$typeof:g,_payload:{_status:-1,_result:w},_init:st}},ue.memo=function(w,nt){return{$$typeof:p,type:w,compare:nt===void 0?null:nt}},ue.startTransition=function(w){var nt=V.T,Tt={};V.T=Tt;try{var vt=w(),Y=V.S;Y!==null&&Y(Tt,vt),typeof vt=="object"&&vt!==null&&typeof vt.then=="function"&&vt.then(yt,j)}catch(ht){j(ht)}finally{V.T=nt}},ue.unstable_useCacheRefresh=function(){return V.H.useCacheRefresh()},ue.use=function(w){return V.H.use(w)},ue.useActionState=function(w,nt,Tt){return V.H.useActionState(w,nt,Tt)},ue.useCallback=function(w,nt){return V.H.useCallback(w,nt)},ue.useContext=function(w){return V.H.useContext(w)},ue.useDebugValue=function(){},ue.useDeferredValue=function(w,nt){return V.H.useDeferredValue(w,nt)},ue.useEffect=function(w,nt){return V.H.useEffect(w,nt)},ue.useId=function(){return V.H.useId()},ue.useImperativeHandle=function(w,nt,Tt){return V.H.useImperativeHandle(w,nt,Tt)},ue.useInsertionEffect=function(w,nt){return V.H.useInsertionEffect(w,nt)},ue.useLayoutEffect=function(w,nt){return V.H.useLayoutEffect(w,nt)},ue.useMemo=function(w,nt){return V.H.useMemo(w,nt)},ue.useOptimistic=function(w,nt){return V.H.useOptimistic(w,nt)},ue.useReducer=function(w,nt,Tt){return V.H.useReducer(w,nt,Tt)},ue.useRef=function(w){return V.H.useRef(w)},ue.useState=function(w){return V.H.useState(w)},ue.useSyncExternalStore=function(w,nt,Tt){return V.H.useSyncExternalStore(w,nt,Tt)},ue.useTransition=function(){return V.H.useTransition()},ue.version="19.0.0",ue}var Hg;function rd(){return Hg||(Hg=1,Ff.exports=Ox()),Ff.exports}var un=rd(),Hf={exports:{}},Lo={},Gf={exports:{}},Vf={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gg;function Px(){return Gg||(Gg=1,function(r){function t(X,st){var j=X.length;X.push(st);t:for(;0<j;){var yt=j-1>>>1,w=X[yt];if(0<l(w,st))X[yt]=st,X[j]=w,j=yt;else break t}}function i(X){return X.length===0?null:X[0]}function s(X){if(X.length===0)return null;var st=X[0],j=X.pop();if(j!==st){X[0]=j;t:for(var yt=0,w=X.length,nt=w>>>1;yt<nt;){var Tt=2*(yt+1)-1,vt=X[Tt],Y=Tt+1,ht=X[Y];if(0>l(vt,j))Y<w&&0>l(ht,vt)?(X[yt]=ht,X[Y]=j,yt=Y):(X[yt]=vt,X[Tt]=j,yt=Tt);else if(Y<w&&0>l(ht,j))X[yt]=ht,X[Y]=j,yt=Y;else break t}}return st}function l(X,st){var j=X.sortIndex-st.sortIndex;return j!==0?j:X.id-st.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();r.unstable_now=function(){return h.now()-d}}var m=[],p=[],g=1,x=null,S=3,M=!1,C=!1,D=!1,y=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function z(X){for(var st=i(p);st!==null;){if(st.callback===null)s(p);else if(st.startTime<=X)s(p),st.sortIndex=st.expirationTime,t(m,st);else break;st=i(p)}}function N(X){if(D=!1,z(X),!C)if(i(m)!==null)C=!0,ct();else{var st=i(p);st!==null&&ft(N,st.startTime-X)}}var V=!1,H=-1,L=5,B=-1;function R(){return!(r.unstable_now()-B<L)}function E(){if(V){var X=r.unstable_now();B=X;var st=!0;try{t:{C=!1,D&&(D=!1,_(H),H=-1),M=!0;var j=S;try{e:{for(z(X),x=i(m);x!==null&&!(x.expirationTime>X&&R());){var yt=x.callback;if(typeof yt=="function"){x.callback=null,S=x.priorityLevel;var w=yt(x.expirationTime<=X);if(X=r.unstable_now(),typeof w=="function"){x.callback=w,z(X),st=!0;break e}x===i(m)&&s(m),z(X)}else s(m);x=i(m)}if(x!==null)st=!0;else{var nt=i(p);nt!==null&&ft(N,nt.startTime-X),st=!1}}break t}finally{x=null,S=j,M=!1}st=void 0}}finally{st?P():V=!1}}}var P;if(typeof I=="function")P=function(){I(E)};else if(typeof MessageChannel<"u"){var ot=new MessageChannel,at=ot.port2;ot.port1.onmessage=E,P=function(){at.postMessage(null)}}else P=function(){y(E,0)};function ct(){V||(V=!0,P())}function ft(X,st){H=y(function(){X(r.unstable_now())},st)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(X){X.callback=null},r.unstable_continueExecution=function(){C||M||(C=!0,ct())},r.unstable_forceFrameRate=function(X){0>X||125<X?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<X?Math.floor(1e3/X):5},r.unstable_getCurrentPriorityLevel=function(){return S},r.unstable_getFirstCallbackNode=function(){return i(m)},r.unstable_next=function(X){switch(S){case 1:case 2:case 3:var st=3;break;default:st=S}var j=S;S=st;try{return X()}finally{S=j}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(X,st){switch(X){case 1:case 2:case 3:case 4:case 5:break;default:X=3}var j=S;S=X;try{return st()}finally{S=j}},r.unstable_scheduleCallback=function(X,st,j){var yt=r.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?yt+j:yt):j=yt,X){case 1:var w=-1;break;case 2:w=250;break;case 5:w=1073741823;break;case 4:w=1e4;break;default:w=5e3}return w=j+w,X={id:g++,callback:st,priorityLevel:X,startTime:j,expirationTime:w,sortIndex:-1},j>yt?(X.sortIndex=j,t(p,X),i(m)===null&&X===i(p)&&(D?(_(H),H=-1):D=!0,ft(N,j-yt))):(X.sortIndex=w,t(m,X),C||M||(C=!0,ct())),X},r.unstable_shouldYield=R,r.unstable_wrapCallback=function(X){var st=S;return function(){var j=S;S=st;try{return X.apply(this,arguments)}finally{S=j}}}}(Vf)),Vf}var Vg;function zx(){return Vg||(Vg=1,Gf.exports=Px()),Gf.exports}var kf={exports:{}},bn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kg;function Bx(){if(kg)return bn;kg=1;var r=rd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:p,implementation:g}}var h=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,bn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},bn.flushSync=function(m){var p=h.T,g=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=g,s.d.f()}},bn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},bn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},bn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,x=d(g,p.crossOrigin),S=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:S,fetchPriority:M}):g==="script"&&s.d.X(m,{crossOrigin:x,integrity:S,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},bn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},bn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,x=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},bn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},bn.requestFormReset=function(m){s.d.r(m)},bn.unstable_batchedUpdates=function(m,p){return m(p)},bn.useFormState=function(m,p,g){return h.H.useFormState(m,p,g)},bn.useFormStatus=function(){return h.H.useHostTransitionStatus()},bn.version="19.0.0",bn}var Xg;function Ix(){if(Xg)return kf.exports;Xg=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),kf.exports=Bx(),kf.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wg;function Fx(){if(Wg)return Lo;Wg=1;var r=zx(),t=rd(),i=Ix();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}var c=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),d=Symbol.for("react.portal"),m=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),x=Symbol.for("react.provider"),S=Symbol.for("react.consumer"),M=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),y=Symbol.for("react.suspense_list"),_=Symbol.for("react.memo"),I=Symbol.for("react.lazy"),z=Symbol.for("react.offscreen"),N=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function H(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var L=Symbol.for("react.client.reference");function B(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===L?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case m:return"Fragment";case d:return"Portal";case g:return"Profiler";case p:return"StrictMode";case D:return"Suspense";case y:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case M:return(e.displayName||"Context")+".Provider";case S:return(e._context.displayName||"Context")+".Consumer";case C:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case _:return n=e.displayName||null,n!==null?n:B(e.type)||"Memo";case I:n=e._payload,e=e._init;try{return B(e(n))}catch{}}return null}var R=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,E=Object.assign,P,ot;function at(e){if(P===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);P=n&&n[1]||"",ot=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+P+e+ot}var ct=!1;function ft(e,n){if(!e||ct)return"";ct=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var St=function(){throw Error()};if(Object.defineProperty(St.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(St,[])}catch(lt){var it=lt}Reflect.construct(e,[],St)}else{try{St.call()}catch(lt){it=lt}e.call(St.prototype)}}else{try{throw Error()}catch(lt){it=lt}(St=e())&&typeof St.catch=="function"&&St.catch(function(){})}}catch(lt){if(lt&&it&&typeof lt.stack=="string")return[lt.stack,it.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),v=f[0],b=f[1];if(v&&b){var O=v.split(`
`),k=b.split(`
`);for(u=o=0;o<O.length&&!O[o].includes("DetermineComponentFrameRoot");)o++;for(;u<k.length&&!k[u].includes("DetermineComponentFrameRoot");)u++;if(o===O.length||u===k.length)for(o=O.length-1,u=k.length-1;1<=o&&0<=u&&O[o]!==k[u];)u--;for(;1<=o&&0<=u;o--,u--)if(O[o]!==k[u]){if(o!==1||u!==1)do if(o--,u--,0>u||O[o]!==k[u]){var ut=`
`+O[o].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=o&&0<=u);break}}}finally{ct=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?at(a):""}function X(e){switch(e.tag){case 26:case 27:case 5:return at(e.type);case 16:return at("Lazy");case 13:return at("Suspense");case 19:return at("SuspenseList");case 0:case 15:return e=ft(e.type,!1),e;case 11:return e=ft(e.type.render,!1),e;case 1:return e=ft(e.type,!0),e;default:return""}}function st(e){try{var n="";do n+=X(e),e=e.return;while(e);return n}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function j(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function yt(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function w(e){if(j(e)!==e)throw Error(s(188))}function nt(e){var n=e.alternate;if(!n){if(n=j(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return w(u),e;if(f===o)return w(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=f;else{for(var v=!1,b=u.child;b;){if(b===a){v=!0,a=u,o=f;break}if(b===o){v=!0,o=u,a=f;break}b=b.sibling}if(!v){for(b=f.child;b;){if(b===a){v=!0,a=f,o=u;break}if(b===o){v=!0,o=f,a=u;break}b=b.sibling}if(!v)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function Tt(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=Tt(e),n!==null)return n;e=e.sibling}return null}var vt=Array.isArray,Y=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ht={pending:!1,data:null,method:null,action:null},xt=[],bt=-1;function Rt(e){return{current:e}}function zt(e){0>bt||(e.current=xt[bt],xt[bt]=null,bt--)}function Vt(e,n){bt++,xt[bt]=e.current,e.current=n}var ge=Rt(null),le=Rt(null),be=Rt(null),F=Rt(null);function It(e,n){switch(Vt(be,n),Vt(le,e),Vt(ge,null),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)&&(n=n.namespaceURI)?hg(n):0;break;default:if(e=e===8?n.parentNode:n,n=e.tagName,e=e.namespaceURI)e=hg(e),n=dg(e,n);else switch(n){case"svg":n=1;break;case"math":n=2;break;default:n=0}}zt(ge),Vt(ge,n)}function jt(){zt(ge),zt(le),zt(be)}function Kt(e){e.memoizedState!==null&&Vt(F,e);var n=ge.current,a=dg(n,e.type);n!==a&&(Vt(le,e),Vt(ge,a))}function Bt(e){le.current===e&&(zt(ge),zt(le)),F.current===e&&(zt(F),Ao._currentValue=ht)}var ve=Object.prototype.hasOwnProperty,kt=r.unstable_scheduleCallback,U=r.unstable_cancelCallback,T=r.unstable_shouldYield,tt=r.unstable_requestPaint,dt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,pt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,wt=r.unstable_NormalPriority,Ft=r.unstable_LowPriority,xe=r.unstable_IdlePriority,At=r.log,Ht=r.unstable_setDisableYieldValue,Qt=null,qt=null;function Gt(e){if(qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(Qt,e,void 0,(e.current.flags&128)===128)}catch{}}function oe(e){if(typeof At=="function"&&Ht(e),qt&&typeof qt.setStrictMode=="function")try{qt.setStrictMode(Qt,e)}catch{}}var $t=Math.clz32?Math.clz32:Nt,Ue=Math.log,W=Math.LN2;function Nt(e){return e>>>=0,e===0?32:31-(Ue(e)/W|0)|0}var rt=128,gt=4194304;function Dt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ut(e,n){var a=e.pendingLanes;if(a===0)return 0;var o=0,u=e.suspendedLanes,f=e.pingedLanes,v=e.warmLanes;e=e.finishedLanes!==0;var b=a&134217727;return b!==0?(a=b&~u,a!==0?o=Dt(a):(f&=b,f!==0?o=Dt(f):e||(v=b&~v,v!==0&&(o=Dt(v))))):(b=a&~u,b!==0?o=Dt(b):f!==0?o=Dt(f):e||(v=a&~v,v!==0&&(o=Dt(v)))),o===0?0:n!==0&&n!==o&&!(n&u)&&(u=o&-o,v=n&-n,u>=v||u===32&&(v&4194176)!==0)?n:o}function ne(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Ve(e,n){switch(e){case 1:case 2:case 4:case 8:return n+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nn(){var e=rt;return rt<<=1,!(rt&4194176)&&(rt=128),e}function Ae(){var e=gt;return gt<<=1,!(gt&62914560)&&(gt=4194304),e}function Cn(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Dn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function qo(e,n,a,o,u,f){var v=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,O=e.expirationTimes,k=e.hiddenUpdates;for(a=v&~a;0<a;){var ut=31-$t(a),St=1<<ut;b[ut]=0,O[ut]=-1;var it=k[ut];if(it!==null)for(k[ut]=null,ut=0;ut<it.length;ut++){var lt=it[ut];lt!==null&&(lt.lane&=-536870913)}a&=~St}o!==0&&zr(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(v&~n))}function zr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-$t(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&4194218}function Mi(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-$t(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function Rs(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Br(){var e=Y.p;return e!==0?e:(e=window.event,e===void 0?32:Ug(e.type))}function Yo(e,n){var a=Y.p;try{return Y.p=e,n()}finally{Y.p=a}}var kn=Math.random().toString(36).slice(2),an="__reactFiber$"+kn,sn="__reactProps$"+kn,Li="__reactContainer$"+kn,Cs="__reactEvents$"+kn,Pu="__reactListeners$"+kn,zu="__reactHandles$"+kn,jo="__reactResources$"+kn,Ga="__reactMarker$"+kn;function Ir(e){delete e[an],delete e[sn],delete e[Cs],delete e[Pu],delete e[zu]}function Ni(e){var n=e[an];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Li]||a[an]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=gg(e);e!==null;){if(a=e[an])return a;e=gg(e)}return n}e=a,a=e.parentNode}return null}function A(e){if(e=e[an]||e[Li]){var n=e.tag;if(n===5||n===6||n===13||n===26||n===27||n===3)return e}return null}function q(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function $(e){var n=e[jo];return n||(n=e[jo]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Q(e){e[Ga]=!0}var Z=new Set,Et={};function Ct(e,n){Pt(e,n),Pt(e+"Capture",n)}function Pt(e,n){for(Et[e]=n,e=0;e<n.length;e++)Z.add(n[e])}var Ot=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ie=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ae={},Jt={};function Se(e){return ve.call(Jt,e)?!0:ve.call(ae,e)?!1:ie.test(e)?Jt[e]=!0:(ae[e]=!0,!1)}function ye(e,n,a){if(Se(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ge(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Re(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function se(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function te(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function rn(e){var n=te(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),o=""+e[n];if(!e.hasOwnProperty(n)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var u=a.get,f=a.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(v){o=""+v,f.call(this,v)}}),Object.defineProperty(e,n,{enumerable:a.enumerable}),{getValue:function(){return o},setValue:function(v){o=""+v},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Me(e){e._valueTracker||(e._valueTracker=rn(e))}function zn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=te(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function fi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var wn=/[\n"\\]/g;function dn(e){return e.replace(wn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Le(e,n,a,o,u,f,v,b){e.name="",v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?e.type=v:e.removeAttribute("type"),n!=null?v==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+se(n)):e.value!==""+se(n)&&(e.value=""+se(n)):v!=="submit"&&v!=="reset"||e.removeAttribute("value"),n!=null?En(e,v,se(n)):a!=null?En(e,v,se(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+se(b):e.removeAttribute("name")}function Un(e,n,a,o,u,f,v,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null))return;a=a!=null?""+se(a):"",n=n!=null?""+se(n):a,b||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"&&(e.name=v)}function En(e,n,a){n==="number"&&fi(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function We(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+se(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function vn(e,n,a){if(n!=null&&(n=""+se(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+se(a):""}function Ds(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(vt(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=se(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o)}function Bn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var D0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Sd(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||D0.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function yd(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Sd(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&Sd(e,f,n[f])}function Bu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var w0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),U0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zo(e){return U0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Iu=null;function Fu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ws=null,Us=null;function Md(e){var n=A(e);if(n&&(e=n.stateNode)){var a=e[sn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Le(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+dn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[sn]||null;if(!u)throw Error(s(90));Le(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&zn(o)}break t;case"textarea":vn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&We(e,!!a.multiple,n,!1)}}}var Hu=!1;function Ed(e,n,a){if(Hu)return e(n,a);Hu=!0;try{var o=e(n);return o}finally{if(Hu=!1,(ws!==null||Us!==null)&&(Ll(),ws&&(n=ws,e=Us,Us=ws=null,Md(n),e)))for(n=0;n<e.length;n++)Md(e[n])}}function Fr(e,n){var a=e.stateNode;if(a===null)return null;var o=a[sn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Gu=!1;if(Ot)try{var Hr={};Object.defineProperty(Hr,"passive",{get:function(){Gu=!0}}),window.addEventListener("test",Hr,Hr),window.removeEventListener("test",Hr,Hr)}catch{Gu=!1}var ua=null,Vu=null,Ko=null;function Td(){if(Ko)return Ko;var e,n=Vu,a=n.length,o,u="value"in ua?ua.value:ua.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var v=a-e;for(o=1;o<=v&&n[a-o]===u[f-o];o++);return Ko=u.slice(e,1<o?1-o:void 0)}function Qo(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Jo(){return!0}function bd(){return!1}function In(e){function n(a,o,u,f,v){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=v,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Jo:bd,this.isPropagationStopped=bd,this}return E(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Jo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Jo)},persist:function(){},isPersistent:Jo}),n}var Va={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$o=In(Va),Gr=E({},Va,{view:0,detail:0}),L0=In(Gr),ku,Xu,Vr,tl=E({},Gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Vr&&(Vr&&e.type==="mousemove"?(ku=e.screenX-Vr.screenX,Xu=e.screenY-Vr.screenY):Xu=ku=0,Vr=e),ku)},movementY:function(e){return"movementY"in e?e.movementY:Xu}}),Ad=In(tl),N0=E({},tl,{dataTransfer:0}),O0=In(N0),P0=E({},Gr,{relatedTarget:0}),Wu=In(P0),z0=E({},Va,{animationName:0,elapsedTime:0,pseudoElement:0}),B0=In(z0),I0=E({},Va,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),F0=In(I0),H0=E({},Va,{data:0}),Rd=In(H0),G0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},V0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},k0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function X0(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=k0[e])?!!n[e]:!1}function qu(){return X0}var W0=E({},Gr,{key:function(e){if(e.key){var n=G0[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Qo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?V0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qu,charCode:function(e){return e.type==="keypress"?Qo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),q0=In(W0),Y0=E({},tl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cd=In(Y0),j0=E({},Gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qu}),Z0=In(j0),K0=E({},Va,{propertyName:0,elapsedTime:0,pseudoElement:0}),Q0=In(K0),J0=E({},tl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$0=In(J0),tv=E({},Va,{newState:0,oldState:0}),ev=In(tv),nv=[9,13,27,32],Yu=Ot&&"CompositionEvent"in window,kr=null;Ot&&"documentMode"in document&&(kr=document.documentMode);var iv=Ot&&"TextEvent"in window&&!kr,Dd=Ot&&(!Yu||kr&&8<kr&&11>=kr),wd=" ",Ud=!1;function Ld(e,n){switch(e){case"keyup":return nv.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ls=!1;function av(e,n){switch(e){case"compositionend":return Nd(n);case"keypress":return n.which!==32?null:(Ud=!0,wd);case"textInput":return e=n.data,e===wd&&Ud?null:e;default:return null}}function sv(e,n){if(Ls)return e==="compositionend"||!Yu&&Ld(e,n)?(e=Td(),Ko=Vu=ua=null,Ls=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Dd&&n.locale!=="ko"?null:n.data;default:return null}}var rv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Od(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!rv[e.type]:n==="textarea"}function Pd(e,n,a,o){ws?Us?Us.push(o):Us=[o]:ws=o,n=Bl(n,"onChange"),0<n.length&&(a=new $o("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var Xr=null,Wr=null;function ov(e){og(e,0)}function el(e){var n=q(e);if(zn(n))return e}function zd(e,n){if(e==="change")return n}var Bd=!1;if(Ot){var ju;if(Ot){var Zu="oninput"in document;if(!Zu){var Id=document.createElement("div");Id.setAttribute("oninput","return;"),Zu=typeof Id.oninput=="function"}ju=Zu}else ju=!1;Bd=ju&&(!document.documentMode||9<document.documentMode)}function Fd(){Xr&&(Xr.detachEvent("onpropertychange",Hd),Wr=Xr=null)}function Hd(e){if(e.propertyName==="value"&&el(Wr)){var n=[];Pd(n,Wr,e,Fu(e)),Ed(ov,n)}}function lv(e,n,a){e==="focusin"?(Fd(),Xr=n,Wr=a,Xr.attachEvent("onpropertychange",Hd)):e==="focusout"&&Fd()}function uv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return el(Wr)}function cv(e,n){if(e==="click")return el(n)}function fv(e,n){if(e==="input"||e==="change")return el(n)}function hv(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Xn=typeof Object.is=="function"?Object.is:hv;function qr(e,n){if(Xn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!ve.call(n,u)||!Xn(e[u],n[u]))return!1}return!0}function Gd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vd(e,n){var a=Gd(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Gd(a)}}function kd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?kd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Xd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=fi(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=fi(e.document)}return n}function Ku(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function dv(e,n){var a=Xd(n);n=e.focusedElem;var o=e.selectionRange;if(a!==n&&n&&n.ownerDocument&&kd(n.ownerDocument.documentElement,n)){if(o!==null&&Ku(n)){if(e=o.start,a=o.end,a===void 0&&(a=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(a,n.value.length);else if(a=(e=n.ownerDocument||document)&&e.defaultView||window,a.getSelection){a=a.getSelection();var u=n.textContent.length,f=Math.min(o.start,u);o=o.end===void 0?f:Math.min(o.end,u),!a.extend&&f>o&&(u=o,o=f,f=u),u=Vd(n,f);var v=Vd(n,o);u&&v&&(a.rangeCount!==1||a.anchorNode!==u.node||a.anchorOffset!==u.offset||a.focusNode!==v.node||a.focusOffset!==v.offset)&&(e=e.createRange(),e.setStart(u.node,u.offset),a.removeAllRanges(),f>o?(a.addRange(e),a.extend(v.node,v.offset)):(e.setEnd(v.node,v.offset),a.addRange(e)))}}for(e=[],a=n;a=a.parentNode;)a.nodeType===1&&e.push({element:a,left:a.scrollLeft,top:a.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)a=e[n],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}var pv=Ot&&"documentMode"in document&&11>=document.documentMode,Ns=null,Qu=null,Yr=null,Ju=!1;function Wd(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ju||Ns==null||Ns!==fi(o)||(o=Ns,"selectionStart"in o&&Ku(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Yr&&qr(Yr,o)||(Yr=o,o=Bl(Qu,"onSelect"),0<o.length&&(n=new $o("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Ns)))}function ka(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Os={animationend:ka("Animation","AnimationEnd"),animationiteration:ka("Animation","AnimationIteration"),animationstart:ka("Animation","AnimationStart"),transitionrun:ka("Transition","TransitionRun"),transitionstart:ka("Transition","TransitionStart"),transitioncancel:ka("Transition","TransitionCancel"),transitionend:ka("Transition","TransitionEnd")},$u={},qd={};Ot&&(qd=document.createElement("div").style,"AnimationEvent"in window||(delete Os.animationend.animation,delete Os.animationiteration.animation,delete Os.animationstart.animation),"TransitionEvent"in window||delete Os.transitionend.transition);function Xa(e){if($u[e])return $u[e];if(!Os[e])return e;var n=Os[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in qd)return $u[e]=n[a];return e}var Yd=Xa("animationend"),jd=Xa("animationiteration"),Zd=Xa("animationstart"),mv=Xa("transitionrun"),gv=Xa("transitionstart"),_v=Xa("transitioncancel"),Kd=Xa("transitionend"),Qd=new Map,Jd="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function hi(e,n){Qd.set(e,n),Ct(n,[e])}var $n=[],Ps=0,tc=0;function nl(){for(var e=Ps,n=tc=Ps=0;n<e;){var a=$n[n];$n[n++]=null;var o=$n[n];$n[n++]=null;var u=$n[n];$n[n++]=null;var f=$n[n];if($n[n++]=null,o!==null&&u!==null){var v=o.pending;v===null?u.next=u:(u.next=v.next,v.next=u),o.pending=u}f!==0&&$d(a,u,f)}}function il(e,n,a,o){$n[Ps++]=e,$n[Ps++]=n,$n[Ps++]=a,$n[Ps++]=o,tc|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function ec(e,n,a,o){return il(e,n,a,o),al(e)}function ca(e,n){return il(e,null,null,n),al(e)}function $d(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;u&&n!==null&&e.tag===3&&(f=e.stateNode,u=31-$t(a),f=f.hiddenUpdates,e=f[u],e===null?f[u]=[n]:e.push(n),n.lane=a|536870912)}function al(e){if(50<xo)throw xo=0,lf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var zs={},tp=new WeakMap;function ti(e,n){if(typeof e=="object"&&e!==null){var a=tp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:st(n)},tp.set(e,n),n)}return{value:e,source:n,stack:st(n)}}var Bs=[],Is=0,sl=null,rl=0,ei=[],ni=0,Wa=null,Oi=1,Pi="";function qa(e,n){Bs[Is++]=rl,Bs[Is++]=sl,sl=e,rl=n}function ep(e,n,a){ei[ni++]=Oi,ei[ni++]=Pi,ei[ni++]=Wa,Wa=e;var o=Oi;e=Pi;var u=32-$t(o)-1;o&=~(1<<u),a+=1;var f=32-$t(n)+u;if(30<f){var v=u-u%5;f=(o&(1<<v)-1).toString(32),o>>=v,u-=v,Oi=1<<32-$t(n)+u|a<<u|o,Pi=f+e}else Oi=1<<f|a<<u|o,Pi=e}function nc(e){e.return!==null&&(qa(e,1),ep(e,1,0))}function ic(e){for(;e===sl;)sl=Bs[--Is],Bs[Is]=null,rl=Bs[--Is],Bs[Is]=null;for(;e===Wa;)Wa=ei[--ni],ei[ni]=null,Pi=ei[--ni],ei[ni]=null,Oi=ei[--ni],ei[ni]=null}var Ln=null,xn=null,Ce=!1,di=null,Ei=!1,ac=Error(s(519));function Ya(e){var n=Error(s(418,""));throw Kr(ti(n,e)),ac}function np(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[an]=e,n[sn]=o,a){case"dialog":Ee("cancel",n),Ee("close",n);break;case"iframe":case"object":case"embed":Ee("load",n);break;case"video":case"audio":for(a=0;a<yo.length;a++)Ee(yo[a],n);break;case"source":Ee("error",n);break;case"img":case"image":case"link":Ee("error",n),Ee("load",n);break;case"details":Ee("toggle",n);break;case"input":Ee("invalid",n),Un(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0),Me(n);break;case"select":Ee("invalid",n);break;case"textarea":Ee("invalid",n),Ds(n,o.value,o.defaultValue,o.children),Me(n)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||fg(n.textContent,a)?(o.popover!=null&&(Ee("beforetoggle",n),Ee("toggle",n)),o.onScroll!=null&&Ee("scroll",n),o.onScrollEnd!=null&&Ee("scrollend",n),o.onClick!=null&&(n.onclick=Il),n=!0):n=!1,n||Ya(e)}function ip(e){for(Ln=e.return;Ln;)switch(Ln.tag){case 3:case 27:Ei=!0;return;case 5:case 13:Ei=!1;return;default:Ln=Ln.return}}function jr(e){if(e!==Ln)return!1;if(!Ce)return ip(e),Ce=!0,!1;var n=!1,a;if((a=e.tag!==3&&e.tag!==27)&&((a=e.tag===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||bf(e.type,e.memoizedProps)),a=!a),a&&(n=!0),n&&xn&&Ya(e),ip(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));t:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(n===0){xn=mi(e.nextSibling);break t}n--}else a!=="$"&&a!=="$!"&&a!=="$?"||n++;e=e.nextSibling}xn=null}}else xn=Ln?mi(e.stateNode.nextSibling):null;return!0}function Zr(){xn=Ln=null,Ce=!1}function Kr(e){di===null?di=[e]:di.push(e)}var Qr=Error(s(460)),ap=Error(s(474)),sc={then:function(){}};function sp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function ol(){}function rp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(ol,ol),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,e===Qr?Error(s(483)):e;default:if(typeof n.status=="string")n.then(ol,ol);else{if(e=Fe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,e===Qr?Error(s(483)):e}throw Jr=n,Qr}}var Jr=null;function op(){if(Jr===null)throw Error(s(459));var e=Jr;return Jr=null,e}var Fs=null,$r=0;function ll(e){var n=$r;return $r+=1,Fs===null&&(Fs=[]),rp(Fs,e,n)}function to(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function ul(e,n){throw n.$$typeof===c?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function lp(e){var n=e._init;return n(e._payload)}function up(e){function n(K,G){if(e){var J=K.deletions;J===null?(K.deletions=[G],K.flags|=16):J.push(G)}}function a(K,G){if(!e)return null;for(;G!==null;)n(K,G),G=G.sibling;return null}function o(K){for(var G=new Map;K!==null;)K.key!==null?G.set(K.key,K):G.set(K.index,K),K=K.sibling;return G}function u(K,G){return K=Ma(K,G),K.index=0,K.sibling=null,K}function f(K,G,J){return K.index=J,e?(J=K.alternate,J!==null?(J=J.index,J<G?(K.flags|=33554434,G):J):(K.flags|=33554434,G)):(K.flags|=1048576,G)}function v(K){return e&&K.alternate===null&&(K.flags|=33554434),K}function b(K,G,J,mt){return G===null||G.tag!==6?(G=$c(J,K.mode,mt),G.return=K,G):(G=u(G,J),G.return=K,G)}function O(K,G,J,mt){var Xt=J.type;return Xt===m?ut(K,G,J.props.children,mt,J.key):G!==null&&(G.elementType===Xt||typeof Xt=="object"&&Xt!==null&&Xt.$$typeof===I&&lp(Xt)===G.type)?(G=u(G,J.props),to(G,J),G.return=K,G):(G=Rl(J.type,J.key,J.props,null,K.mode,mt),to(G,J),G.return=K,G)}function k(K,G,J,mt){return G===null||G.tag!==4||G.stateNode.containerInfo!==J.containerInfo||G.stateNode.implementation!==J.implementation?(G=tf(J,K.mode,mt),G.return=K,G):(G=u(G,J.children||[]),G.return=K,G)}function ut(K,G,J,mt,Xt){return G===null||G.tag!==7?(G=is(J,K.mode,mt,Xt),G.return=K,G):(G=u(G,J),G.return=K,G)}function St(K,G,J){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=$c(""+G,K.mode,J),G.return=K,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case h:return J=Rl(G.type,G.key,G.props,null,K.mode,J),to(J,G),J.return=K,J;case d:return G=tf(G,K.mode,J),G.return=K,G;case I:var mt=G._init;return G=mt(G._payload),St(K,G,J)}if(vt(G)||H(G))return G=is(G,K.mode,J,null),G.return=K,G;if(typeof G.then=="function")return St(K,ll(G),J);if(G.$$typeof===M)return St(K,Tl(K,G),J);ul(K,G)}return null}function it(K,G,J,mt){var Xt=G!==null?G.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Xt!==null?null:b(K,G,""+J,mt);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case h:return J.key===Xt?O(K,G,J,mt):null;case d:return J.key===Xt?k(K,G,J,mt):null;case I:return Xt=J._init,J=Xt(J._payload),it(K,G,J,mt)}if(vt(J)||H(J))return Xt!==null?null:ut(K,G,J,mt,null);if(typeof J.then=="function")return it(K,G,ll(J),mt);if(J.$$typeof===M)return it(K,G,Tl(K,J),mt);ul(K,J)}return null}function lt(K,G,J,mt,Xt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return K=K.get(J)||null,b(G,K,""+mt,Xt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case h:return K=K.get(mt.key===null?J:mt.key)||null,O(G,K,mt,Xt);case d:return K=K.get(mt.key===null?J:mt.key)||null,k(G,K,mt,Xt);case I:var pe=mt._init;return mt=pe(mt._payload),lt(K,G,J,mt,Xt)}if(vt(mt)||H(mt))return K=K.get(J)||null,ut(G,K,mt,Xt,null);if(typeof mt.then=="function")return lt(K,G,J,ll(mt),Xt);if(mt.$$typeof===M)return lt(K,G,J,Tl(G,mt),Xt);ul(G,mt)}return null}function Yt(K,G,J,mt){for(var Xt=null,pe=null,Zt=G,ee=G=0,gn=null;Zt!==null&&ee<J.length;ee++){Zt.index>ee?(gn=Zt,Zt=null):gn=Zt.sibling;var De=it(K,Zt,J[ee],mt);if(De===null){Zt===null&&(Zt=gn);break}e&&Zt&&De.alternate===null&&n(K,Zt),G=f(De,G,ee),pe===null?Xt=De:pe.sibling=De,pe=De,Zt=gn}if(ee===J.length)return a(K,Zt),Ce&&qa(K,ee),Xt;if(Zt===null){for(;ee<J.length;ee++)Zt=St(K,J[ee],mt),Zt!==null&&(G=f(Zt,G,ee),pe===null?Xt=Zt:pe.sibling=Zt,pe=Zt);return Ce&&qa(K,ee),Xt}for(Zt=o(Zt);ee<J.length;ee++)gn=lt(Zt,K,ee,J[ee],mt),gn!==null&&(e&&gn.alternate!==null&&Zt.delete(gn.key===null?ee:gn.key),G=f(gn,G,ee),pe===null?Xt=gn:pe.sibling=gn,pe=gn);return e&&Zt.forEach(function(Da){return n(K,Da)}),Ce&&qa(K,ee),Xt}function re(K,G,J,mt){if(J==null)throw Error(s(151));for(var Xt=null,pe=null,Zt=G,ee=G=0,gn=null,De=J.next();Zt!==null&&!De.done;ee++,De=J.next()){Zt.index>ee?(gn=Zt,Zt=null):gn=Zt.sibling;var Da=it(K,Zt,De.value,mt);if(Da===null){Zt===null&&(Zt=gn);break}e&&Zt&&Da.alternate===null&&n(K,Zt),G=f(Da,G,ee),pe===null?Xt=Da:pe.sibling=Da,pe=Da,Zt=gn}if(De.done)return a(K,Zt),Ce&&qa(K,ee),Xt;if(Zt===null){for(;!De.done;ee++,De=J.next())De=St(K,De.value,mt),De!==null&&(G=f(De,G,ee),pe===null?Xt=De:pe.sibling=De,pe=De);return Ce&&qa(K,ee),Xt}for(Zt=o(Zt);!De.done;ee++,De=J.next())De=lt(Zt,K,ee,De.value,mt),De!==null&&(e&&De.alternate!==null&&Zt.delete(De.key===null?ee:De.key),G=f(De,G,ee),pe===null?Xt=De:pe.sibling=De,pe=De);return e&&Zt.forEach(function(Ux){return n(K,Ux)}),Ce&&qa(K,ee),Xt}function je(K,G,J,mt){if(typeof J=="object"&&J!==null&&J.type===m&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case h:t:{for(var Xt=J.key;G!==null;){if(G.key===Xt){if(Xt=J.type,Xt===m){if(G.tag===7){a(K,G.sibling),mt=u(G,J.props.children),mt.return=K,K=mt;break t}}else if(G.elementType===Xt||typeof Xt=="object"&&Xt!==null&&Xt.$$typeof===I&&lp(Xt)===G.type){a(K,G.sibling),mt=u(G,J.props),to(mt,J),mt.return=K,K=mt;break t}a(K,G);break}else n(K,G);G=G.sibling}J.type===m?(mt=is(J.props.children,K.mode,mt,J.key),mt.return=K,K=mt):(mt=Rl(J.type,J.key,J.props,null,K.mode,mt),to(mt,J),mt.return=K,K=mt)}return v(K);case d:t:{for(Xt=J.key;G!==null;){if(G.key===Xt)if(G.tag===4&&G.stateNode.containerInfo===J.containerInfo&&G.stateNode.implementation===J.implementation){a(K,G.sibling),mt=u(G,J.children||[]),mt.return=K,K=mt;break t}else{a(K,G);break}else n(K,G);G=G.sibling}mt=tf(J,K.mode,mt),mt.return=K,K=mt}return v(K);case I:return Xt=J._init,J=Xt(J._payload),je(K,G,J,mt)}if(vt(J))return Yt(K,G,J,mt);if(H(J)){if(Xt=H(J),typeof Xt!="function")throw Error(s(150));return J=Xt.call(J),re(K,G,J,mt)}if(typeof J.then=="function")return je(K,G,ll(J),mt);if(J.$$typeof===M)return je(K,G,Tl(K,J),mt);ul(K,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,G!==null&&G.tag===6?(a(K,G.sibling),mt=u(G,J),mt.return=K,K=mt):(a(K,G),mt=$c(J,K.mode,mt),mt.return=K,K=mt),v(K)):a(K,G)}return function(K,G,J,mt){try{$r=0;var Xt=je(K,G,J,mt);return Fs=null,Xt}catch(Zt){if(Zt===Qr)throw Zt;var pe=ri(29,Zt,null,K.mode);return pe.lanes=mt,pe.return=K,pe}finally{}}}var ja=up(!0),cp=up(!1),Hs=Rt(null),cl=Rt(0);function fp(e,n){e=qi,Vt(cl,e),Vt(Hs,n),qi=e|n.baseLanes}function rc(){Vt(cl,qi),Vt(Hs,Hs.current)}function oc(){qi=cl.current,zt(Hs),zt(cl)}var ii=Rt(null),Ti=null;function fa(e){var n=e.alternate;Vt(on,on.current&1),Vt(ii,e),Ti===null&&(n===null||Hs.current!==null||n.memoizedState!==null)&&(Ti=e)}function hp(e){if(e.tag===22){if(Vt(on,on.current),Vt(ii,e),Ti===null){var n=e.alternate;n!==null&&n.memoizedState!==null&&(Ti=e)}}else ha()}function ha(){Vt(on,on.current),Vt(ii,ii.current)}function zi(e){zt(ii),Ti===e&&(Ti=null),zt(on)}var on=Rt(0);function fl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var vv=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},xv=r.unstable_scheduleCallback,Sv=r.unstable_NormalPriority,ln={$$typeof:M,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function lc(){return{controller:new vv,data:new Map,refCount:0}}function eo(e){e.refCount--,e.refCount===0&&xv(Sv,function(){e.controller.abort()})}var no=null,uc=0,Gs=0,Vs=null;function yv(e,n){if(no===null){var a=no=[];uc=0,Gs=gf(),Vs={status:"pending",value:void 0,then:function(o){a.push(o)}}}return uc++,n.then(dp,dp),n}function dp(){if(--uc===0&&no!==null){Vs!==null&&(Vs.status="fulfilled");var e=no;no=null,Gs=0,Vs=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Mv(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var pp=R.S;R.S=function(e,n){typeof n=="object"&&n!==null&&typeof n.then=="function"&&yv(e,n),pp!==null&&pp(e,n)};var Za=Rt(null);function cc(){var e=Za.current;return e!==null?e:Fe.pooledCache}function hl(e,n){n===null?Vt(Za,Za.current):Vt(Za,n.pool)}function mp(){var e=cc();return e===null?null:{parent:ln._currentValue,pool:e}}var da=0,de=null,Ne=null,Qe=null,dl=!1,ks=!1,Ka=!1,pl=0,io=0,Xs=null,Ev=0;function Ze(){throw Error(s(321))}function fc(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Xn(e[a],n[a]))return!1;return!0}function hc(e,n,a,o,u,f){return da=f,de=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,R.H=e===null||e.memoizedState===null?Qa:pa,Ka=!1,f=a(o,u),Ka=!1,ks&&(f=_p(n,a,o,u)),gp(e),f}function gp(e){R.H=bi;var n=Ne!==null&&Ne.next!==null;if(da=0,Qe=Ne=de=null,dl=!1,io=0,Xs=null,n)throw Error(s(300));e===null||pn||(e=e.dependencies,e!==null&&El(e)&&(pn=!0))}function _p(e,n,a,o){de=e;var u=0;do{if(ks&&(Xs=null),io=0,ks=!1,25<=u)throw Error(s(301));if(u+=1,Qe=Ne=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}R.H=Ja,f=n(a,o)}while(ks);return f}function Tv(){var e=R.H,n=e.useState()[0];return n=typeof n.then=="function"?ao(n):n,e=e.useState()[0],(Ne!==null?Ne.memoizedState:null)!==e&&(de.flags|=1024),n}function dc(){var e=pl!==0;return pl=0,e}function pc(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function mc(e){if(dl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}dl=!1}da=0,Qe=Ne=de=null,ks=!1,io=pl=0,Xs=null}function Fn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?de.memoizedState=Qe=e:Qe=Qe.next=e,Qe}function Je(){if(Ne===null){var e=de.alternate;e=e!==null?e.memoizedState:null}else e=Ne.next;var n=Qe===null?de.memoizedState:Qe.next;if(n!==null)Qe=n,Ne=e;else{if(e===null)throw de.alternate===null?Error(s(467)):Error(s(310));Ne=e,e={memoizedState:Ne.memoizedState,baseState:Ne.baseState,baseQueue:Ne.baseQueue,queue:Ne.queue,next:null},Qe===null?de.memoizedState=Qe=e:Qe=Qe.next=e}return Qe}var ml;ml=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function ao(e){var n=io;return io+=1,Xs===null&&(Xs=[]),e=rp(Xs,e,n),n=de,(Qe===null?n.memoizedState:Qe.next)===null&&(n=n.alternate,R.H=n===null||n.memoizedState===null?Qa:pa),e}function gl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ao(e);if(e.$$typeof===M)return Tn(e)}throw Error(s(438,String(e)))}function gc(e){var n=null,a=de.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=de.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ml(),de.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=N;return n.index++,a}function Bi(e,n){return typeof n=="function"?n(e):n}function _l(e){var n=Je();return _c(n,Ne,e)}function _c(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var v=u.next;u.next=f.next,f.next=v}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var b=v=null,O=null,k=n,ut=!1;do{var St=k.lane&-536870913;if(St!==k.lane?(Te&St)===St:(da&St)===St){var it=k.revertLane;if(it===0)O!==null&&(O=O.next={lane:0,revertLane:0,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null}),St===Gs&&(ut=!0);else if((da&it)===it){k=k.next,it===Gs&&(ut=!0);continue}else St={lane:0,revertLane:k.revertLane,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null},O===null?(b=O=St,v=f):O=O.next=St,de.lanes|=it,Ea|=it;St=k.action,Ka&&a(f,St),f=k.hasEagerState?k.eagerState:a(f,St)}else it={lane:St,revertLane:k.revertLane,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null},O===null?(b=O=it,v=f):O=O.next=it,de.lanes|=St,Ea|=St;k=k.next}while(k!==null&&k!==n);if(O===null?v=f:O.next=b,!Xn(f,e.memoizedState)&&(pn=!0,ut&&(a=Vs,a!==null)))throw a;e.memoizedState=f,e.baseState=v,e.baseQueue=O,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function vc(e){var n=Je(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var v=u=u.next;do f=e(f,v.action),v=v.next;while(v!==u);Xn(f,n.memoizedState)||(pn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function vp(e,n,a){var o=de,u=Je(),f=Ce;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var v=!Xn((Ne||u).memoizedState,a);if(v&&(u.memoizedState=a,pn=!0),u=u.queue,yc(yp.bind(null,o,u,e),[e]),u.getSnapshot!==n||v||Qe!==null&&Qe.memoizedState.tag&1){if(o.flags|=2048,Ws(9,Sp.bind(null,o,u,a,n),{destroy:void 0},null),Fe===null)throw Error(s(349));f||da&60||xp(o,n,a)}return a}function xp(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=de.updateQueue,n===null?(n=ml(),de.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Sp(e,n,a,o){n.value=a,n.getSnapshot=o,Mp(n)&&Ep(e)}function yp(e,n,a){return a(function(){Mp(n)&&Ep(e)})}function Mp(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Xn(e,a)}catch{return!0}}function Ep(e){var n=ca(e,2);n!==null&&Nn(n,e,2)}function xc(e){var n=Fn();if(typeof e=="function"){var a=e;if(e=a(),Ka){oe(!0);try{a()}finally{oe(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bi,lastRenderedState:e},n}function Tp(e,n,a,o){return e.baseState=a,_c(e,Ne,typeof o=="function"?o:Bi)}function bv(e,n,a,o,u){if(Sl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(v){f.listeners.push(v)}};R.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,bp(n,f)):(f.next=a.next,n.pending=a.next=f)}}function bp(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=R.T,v={};R.T=v;try{var b=a(u,o),O=R.S;O!==null&&O(v,b),Ap(e,n,b)}catch(k){Sc(e,n,k)}finally{R.T=f}}else try{f=a(u,o),Ap(e,n,f)}catch(k){Sc(e,n,k)}}function Ap(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Rp(e,n,o)},function(o){return Sc(e,n,o)}):Rp(e,n,a)}function Rp(e,n,a){n.status="fulfilled",n.value=a,Cp(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,bp(e,a)))}function Sc(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Cp(n),n=n.next;while(n!==o)}e.action=null}function Cp(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Dp(e,n){return n}function wp(e,n){if(Ce){var a=Fe.formState;if(a!==null){t:{var o=de;if(Ce){if(xn){e:{for(var u=xn,f=Ei;u.nodeType!==8;){if(!f){u=null;break e}if(u=mi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){xn=mi(u.nextSibling),o=u.data==="F!";break t}}Ya(o)}o=!1}o&&(n=a[0])}}return a=Fn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dp,lastRenderedState:n},a.queue=o,a=jp.bind(null,de,o),o.dispatch=a,o=xc(!1),f=Ac.bind(null,de,!1,o.queue),o=Fn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=bv.bind(null,de,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Up(e){var n=Je();return Lp(n,Ne,e)}function Lp(e,n,a){n=_c(e,n,Dp)[0],e=_l(Bi)[0],n=typeof n=="object"&&n!==null&&typeof n.then=="function"?ao(n):n;var o=Je(),u=o.queue,f=u.dispatch;return a!==o.memoizedState&&(de.flags|=2048,Ws(9,Av.bind(null,u,a),{destroy:void 0},null)),[n,f,e]}function Av(e,n){e.action=n}function Np(e){var n=Je(),a=Ne;if(a!==null)return Lp(n,a,e);Je(),n=n.memoizedState,a=Je();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function Ws(e,n,a,o){return e={tag:e,create:n,inst:a,deps:o,next:null},n=de.updateQueue,n===null&&(n=ml(),de.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Op(){return Je().memoizedState}function vl(e,n,a,o){var u=Fn();de.flags|=e,u.memoizedState=Ws(1|n,a,{destroy:void 0},o===void 0?null:o)}function xl(e,n,a,o){var u=Je();o=o===void 0?null:o;var f=u.memoizedState.inst;Ne!==null&&o!==null&&fc(o,Ne.memoizedState.deps)?u.memoizedState=Ws(n,a,f,o):(de.flags|=e,u.memoizedState=Ws(1|n,a,f,o))}function Pp(e,n){vl(8390656,8,e,n)}function yc(e,n){xl(2048,8,e,n)}function zp(e,n){return xl(4,2,e,n)}function Bp(e,n){return xl(4,4,e,n)}function Ip(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Fp(e,n,a){a=a!=null?a.concat([e]):null,xl(4,4,Ip.bind(null,n,e),a)}function Mc(){}function Hp(e,n){var a=Je();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&fc(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Gp(e,n){var a=Je();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&fc(n,o[1]))return o[0];if(o=e(),Ka){oe(!0);try{e()}finally{oe(!1)}}return a.memoizedState=[o,n],o}function Ec(e,n,a){return a===void 0||da&1073741824?e.memoizedState=n:(e.memoizedState=a,e=km(),de.lanes|=e,Ea|=e,a)}function Vp(e,n,a,o){return Xn(a,n)?a:Hs.current!==null?(e=Ec(e,a,o),Xn(e,n)||(pn=!0),e):da&42?(e=km(),de.lanes|=e,Ea|=e,n):(pn=!0,e.memoizedState=a)}function kp(e,n,a,o,u){var f=Y.p;Y.p=f!==0&&8>f?f:8;var v=R.T,b={};R.T=b,Ac(e,!1,n,a);try{var O=u(),k=R.S;if(k!==null&&k(b,O),O!==null&&typeof O=="object"&&typeof O.then=="function"){var ut=Mv(O,o);so(e,n,ut,jn(e))}else so(e,n,o,jn(e))}catch(St){so(e,n,{then:function(){},status:"rejected",reason:St},jn())}finally{Y.p=f,R.T=v}}function Rv(){}function Tc(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=Xp(e).queue;kp(e,u,n,ht,a===null?Rv:function(){return Wp(e),a(o)})}function Xp(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ht,baseState:ht,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bi,lastRenderedState:ht},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bi,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Wp(e){var n=Xp(e).next.queue;so(e,n,{},jn())}function bc(){return Tn(Ao)}function qp(){return Je().memoizedState}function Yp(){return Je().memoizedState}function Cv(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=jn();e=_a(a);var o=va(n,e,a);o!==null&&(Nn(o,n,a),lo(o,n,a)),n={cache:lc()},e.payload=n;return}n=n.return}}function Dv(e,n,a){var o=jn();a={lane:o,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},Sl(e)?Zp(n,a):(a=ec(e,n,a,o),a!==null&&(Nn(a,e,o),Kp(a,n,o)))}function jp(e,n,a){var o=jn();so(e,n,a,o)}function so(e,n,a,o){var u={lane:o,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(Sl(e))Zp(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var v=n.lastRenderedState,b=f(v,a);if(u.hasEagerState=!0,u.eagerState=b,Xn(b,v))return il(e,n,u,0),Fe===null&&nl(),!1}catch{}finally{}if(a=ec(e,n,u,o),a!==null)return Nn(a,e,o),Kp(a,n,o),!0}return!1}function Ac(e,n,a,o){if(o={lane:2,revertLane:gf(),action:o,hasEagerState:!1,eagerState:null,next:null},Sl(e)){if(n)throw Error(s(479))}else n=ec(e,a,o,2),n!==null&&Nn(n,e,2)}function Sl(e){var n=e.alternate;return e===de||n!==null&&n===de}function Zp(e,n){ks=dl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Kp(e,n,a){if(a&4194176){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Mi(e,a)}}var bi={readContext:Tn,use:gl,useCallback:Ze,useContext:Ze,useEffect:Ze,useImperativeHandle:Ze,useLayoutEffect:Ze,useInsertionEffect:Ze,useMemo:Ze,useReducer:Ze,useRef:Ze,useState:Ze,useDebugValue:Ze,useDeferredValue:Ze,useTransition:Ze,useSyncExternalStore:Ze,useId:Ze};bi.useCacheRefresh=Ze,bi.useMemoCache=Ze,bi.useHostTransitionStatus=Ze,bi.useFormState=Ze,bi.useActionState=Ze,bi.useOptimistic=Ze;var Qa={readContext:Tn,use:gl,useCallback:function(e,n){return Fn().memoizedState=[e,n===void 0?null:n],e},useContext:Tn,useEffect:Pp,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,vl(4194308,4,Ip.bind(null,n,e),a)},useLayoutEffect:function(e,n){return vl(4194308,4,e,n)},useInsertionEffect:function(e,n){vl(4,2,e,n)},useMemo:function(e,n){var a=Fn();n=n===void 0?null:n;var o=e();if(Ka){oe(!0);try{e()}finally{oe(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Fn();if(a!==void 0){var u=a(n);if(Ka){oe(!0);try{a(n)}finally{oe(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Dv.bind(null,de,e),[o.memoizedState,e]},useRef:function(e){var n=Fn();return e={current:e},n.memoizedState=e},useState:function(e){e=xc(e);var n=e.queue,a=jp.bind(null,de,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Mc,useDeferredValue:function(e,n){var a=Fn();return Ec(a,e,n)},useTransition:function(){var e=xc(!1);return e=kp.bind(null,de,e.queue,!0,!1),Fn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=de,u=Fn();if(Ce){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Fe===null)throw Error(s(349));Te&60||xp(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Pp(yp.bind(null,o,f,e),[e]),o.flags|=2048,Ws(9,Sp.bind(null,o,f,a,n),{destroy:void 0},null),a},useId:function(){var e=Fn(),n=Fe.identifierPrefix;if(Ce){var a=Pi,o=Oi;a=(o&~(1<<32-$t(o)-1)).toString(32)+a,n=":"+n+"R"+a,a=pl++,0<a&&(n+="H"+a.toString(32)),n+=":"}else a=Ev++,n=":"+n+"r"+a.toString(32)+":";return e.memoizedState=n},useCacheRefresh:function(){return Fn().memoizedState=Cv.bind(null,de)}};Qa.useMemoCache=gc,Qa.useHostTransitionStatus=bc,Qa.useFormState=wp,Qa.useActionState=wp,Qa.useOptimistic=function(e){var n=Fn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Ac.bind(null,de,!0,a),a.dispatch=n,[e,n]};var pa={readContext:Tn,use:gl,useCallback:Hp,useContext:Tn,useEffect:yc,useImperativeHandle:Fp,useInsertionEffect:zp,useLayoutEffect:Bp,useMemo:Gp,useReducer:_l,useRef:Op,useState:function(){return _l(Bi)},useDebugValue:Mc,useDeferredValue:function(e,n){var a=Je();return Vp(a,Ne.memoizedState,e,n)},useTransition:function(){var e=_l(Bi)[0],n=Je().memoizedState;return[typeof e=="boolean"?e:ao(e),n]},useSyncExternalStore:vp,useId:qp};pa.useCacheRefresh=Yp,pa.useMemoCache=gc,pa.useHostTransitionStatus=bc,pa.useFormState=Up,pa.useActionState=Up,pa.useOptimistic=function(e,n){var a=Je();return Tp(a,Ne,e,n)};var Ja={readContext:Tn,use:gl,useCallback:Hp,useContext:Tn,useEffect:yc,useImperativeHandle:Fp,useInsertionEffect:zp,useLayoutEffect:Bp,useMemo:Gp,useReducer:vc,useRef:Op,useState:function(){return vc(Bi)},useDebugValue:Mc,useDeferredValue:function(e,n){var a=Je();return Ne===null?Ec(a,e,n):Vp(a,Ne.memoizedState,e,n)},useTransition:function(){var e=vc(Bi)[0],n=Je().memoizedState;return[typeof e=="boolean"?e:ao(e),n]},useSyncExternalStore:vp,useId:qp};Ja.useCacheRefresh=Yp,Ja.useMemoCache=gc,Ja.useHostTransitionStatus=bc,Ja.useFormState=Np,Ja.useActionState=Np,Ja.useOptimistic=function(e,n){var a=Je();return Ne!==null?Tp(a,Ne,e,n):(a.baseState=e,[e,a.queue.dispatch])};function Rc(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:E({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Cc={isMounted:function(e){return(e=e._reactInternals)?j(e)===e:!1},enqueueSetState:function(e,n,a){e=e._reactInternals;var o=jn(),u=_a(o);u.payload=n,a!=null&&(u.callback=a),n=va(e,u,o),n!==null&&(Nn(n,e,o),lo(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=jn(),u=_a(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=va(e,u,o),n!==null&&(Nn(n,e,o),lo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=jn(),o=_a(a);o.tag=2,n!=null&&(o.callback=n),n=va(e,o,a),n!==null&&(Nn(n,e,a),lo(n,e,a))}};function Qp(e,n,a,o,u,f,v){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,v):n.prototype&&n.prototype.isPureReactComponent?!qr(a,o)||!qr(u,f):!0}function Jp(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&Cc.enqueueReplaceState(n,n.state,null)}function $a(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=E({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}var yl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function $p(e){yl(e)}function tm(e){console.error(e)}function em(e){yl(e)}function Ml(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function nm(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Dc(e,n,a){return a=_a(a),a.tag=3,a.payload={element:null},a.callback=function(){Ml(e,n)},a}function im(e){return e=_a(e),e.tag=3,e}function am(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){nm(n,a,o)}}var v=a.stateNode;v!==null&&typeof v.componentDidCatch=="function"&&(e.callback=function(){nm(n,a,o),typeof u!="function"&&(Ta===null?Ta=new Set([this]):Ta.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function wv(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&oo(n,a,u,!0),a=ii.current,a!==null){switch(a.tag){case 13:return Ti===null?ff():a.alternate===null&&Ye===0&&(Ye=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===sc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),df(e,o,u)),!1;case 22:return a.flags|=65536,o===sc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),df(e,o,u)),!1}throw Error(s(435,a.tag))}return df(e,o,u),ff(),!1}if(Ce)return n=ii.current,n!==null?(!(n.flags&65536)&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==ac&&(e=Error(s(422),{cause:o}),Kr(ti(e,a)))):(o!==ac&&(n=Error(s(423),{cause:o}),Kr(ti(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=ti(o,a),u=Dc(e.stateNode,o,u),Xc(e,u),Ye!==4&&(Ye=2)),!1;var f=Error(s(520),{cause:o});if(f=ti(f,a),_o===null?_o=[f]:_o.push(f),Ye!==4&&(Ye=2),n===null)return!0;o=ti(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Dc(a.stateNode,o,e),Xc(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ta===null||!Ta.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=im(u),am(u,e,a,o),Xc(a,u),!1}a=a.return}while(a!==null);return!1}var sm=Error(s(461)),pn=!1;function Sn(e,n,a,o){n.child=e===null?cp(n,null,a,o):ja(n,e.child,a,o)}function rm(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var v={};for(var b in o)b!=="ref"&&(v[b]=o[b])}else v=o;return es(n),o=hc(e,n,a,v,f,u),b=dc(),e!==null&&!pn?(pc(e,n,u),Ii(e,n,u)):(Ce&&b&&nc(n),n.flags|=1,Sn(e,n,o,u),n.child)}function om(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Jc(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,lm(e,n,f,o,u)):(e=Rl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Ic(e,u)){var v=f.memoizedProps;if(a=a.compare,a=a!==null?a:qr,a(v,o)&&e.ref===n.ref)return Ii(e,n,u)}return n.flags|=1,e=Ma(f,o),e.ref=n.ref,e.return=n,n.child=e}function lm(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if(qr(f,o)&&e.ref===n.ref)if(pn=!1,n.pendingProps=o=f,Ic(e,u))e.flags&131072&&(pn=!0);else return n.lanes=e.lanes,Ii(e,n,u)}return wc(e,n,a,o,u)}function um(e,n,a){var o=n.pendingProps,u=o.children,f=(n.stateNode._pendingVisibility&2)!==0,v=e!==null?e.memoizedState:null;if(ro(e,n),o.mode==="hidden"||f){if(n.flags&128){if(o=v!==null?v.baseLanes|a:a,e!==null){for(u=n.child=e.child,f=0;u!==null;)f=f|u.lanes|u.childLanes,u=u.sibling;n.childLanes=f&~o}else n.childLanes=0,n.child=null;return cm(e,n,o,a)}if(a&536870912)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&hl(n,v!==null?v.cachePool:null),v!==null?fp(n,v):rc(),hp(n);else return n.lanes=n.childLanes=536870912,cm(e,n,v!==null?v.baseLanes|a:a,a)}else v!==null?(hl(n,v.cachePool),fp(n,v),ha(),n.memoizedState=null):(e!==null&&hl(n,null),rc(),ha());return Sn(e,n,u,a),n.child}function cm(e,n,a,o){var u=cc();return u=u===null?null:{parent:ln._currentValue,pool:u},n.memoizedState={baseLanes:a,cachePool:u},e!==null&&hl(n,null),rc(),hp(n),e!==null&&oo(e,n,o,!0),null}function ro(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=2097664);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=2097664)}}function wc(e,n,a,o,u){return es(n),a=hc(e,n,a,o,void 0,u),o=dc(),e!==null&&!pn?(pc(e,n,u),Ii(e,n,u)):(Ce&&o&&nc(n),n.flags|=1,Sn(e,n,a,u),n.child)}function fm(e,n,a,o,u,f){return es(n),n.updateQueue=null,a=_p(n,o,a,u),gp(e),o=dc(),e!==null&&!pn?(pc(e,n,f),Ii(e,n,f)):(Ce&&o&&nc(n),n.flags|=1,Sn(e,n,a,f),n.child)}function hm(e,n,a,o,u){if(es(n),n.stateNode===null){var f=zs,v=a.contextType;typeof v=="object"&&v!==null&&(f=Tn(v)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Cc,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Vc(n),v=a.contextType,f.context=typeof v=="object"&&v!==null?Tn(v):zs,f.state=n.memoizedState,v=a.getDerivedStateFromProps,typeof v=="function"&&(Rc(n,a,v,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(v=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),v!==f.state&&Cc.enqueueReplaceState(f,f.state,null),co(n,o,f,u),uo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var b=n.memoizedProps,O=$a(a,b);f.props=O;var k=f.context,ut=a.contextType;v=zs,typeof ut=="object"&&ut!==null&&(v=Tn(ut));var St=a.getDerivedStateFromProps;ut=typeof St=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||k!==v)&&Jp(n,f,o,v),ga=!1;var it=n.memoizedState;f.state=it,co(n,o,f,u),uo(),k=n.memoizedState,b||it!==k||ga?(typeof St=="function"&&(Rc(n,a,St,o),k=n.memoizedState),(O=ga||Qp(n,a,O,o,it,k,v))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=k),f.props=o,f.state=k,f.context=v,o=O):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,kc(e,n),v=n.memoizedProps,ut=$a(a,v),f.props=ut,St=n.pendingProps,it=f.context,k=a.contextType,O=zs,typeof k=="object"&&k!==null&&(O=Tn(k)),b=a.getDerivedStateFromProps,(k=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(v!==St||it!==O)&&Jp(n,f,o,O),ga=!1,it=n.memoizedState,f.state=it,co(n,o,f,u),uo();var lt=n.memoizedState;v!==St||it!==lt||ga||e!==null&&e.dependencies!==null&&El(e.dependencies)?(typeof b=="function"&&(Rc(n,a,b,o),lt=n.memoizedState),(ut=ga||Qp(n,a,ut,o,it,lt,O)||e!==null&&e.dependencies!==null&&El(e.dependencies))?(k||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,lt,O),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,lt,O)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||v===e.memoizedProps&&it===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&it===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=lt),f.props=o,f.state=lt,f.context=O,o=ut):(typeof f.componentDidUpdate!="function"||v===e.memoizedProps&&it===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&it===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,ro(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=ja(n,e.child,null,u),n.child=ja(n,null,a,u)):Sn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=Ii(e,n,u),e}function dm(e,n,a,o){return Zr(),n.flags|=256,Sn(e,n,a,o),n.child}var Uc={dehydrated:null,treeContext:null,retryLane:0};function Lc(e){return{baseLanes:e,cachePool:mp()}}function Nc(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=oi),e}function pm(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,v;if((v=f)||(v=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),v&&(u=!0,n.flags&=-129),v=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ce){if(u?fa(n):ha(),Ce){var b=xn,O;if(O=b){t:{for(O=b,b=Ei;O.nodeType!==8;){if(!b){b=null;break t}if(O=mi(O.nextSibling),O===null){b=null;break t}}b=O}b!==null?(n.memoizedState={dehydrated:b,treeContext:Wa!==null?{id:Oi,overflow:Pi}:null,retryLane:536870912},O=ri(18,null,null,0),O.stateNode=b,O.return=n,n.child=O,Ln=n,xn=null,O=!0):O=!1}O||Ya(n)}if(b=n.memoizedState,b!==null&&(b=b.dehydrated,b!==null))return b.data==="$!"?n.lanes=16:n.lanes=536870912,null;zi(n)}return b=o.children,o=o.fallback,u?(ha(),u=n.mode,b=Pc({mode:"hidden",children:b},u),o=is(o,u,a,null),b.return=n,o.return=n,b.sibling=o,n.child=b,u=n.child,u.memoizedState=Lc(a),u.childLanes=Nc(e,v,a),n.memoizedState=Uc,o):(fa(n),Oc(n,b))}if(O=e.memoizedState,O!==null&&(b=O.dehydrated,b!==null)){if(f)n.flags&256?(fa(n),n.flags&=-257,n=zc(e,n,a)):n.memoizedState!==null?(ha(),n.child=e.child,n.flags|=128,n=null):(ha(),u=o.fallback,b=n.mode,o=Pc({mode:"visible",children:o.children},b),u=is(u,b,a,null),u.flags|=2,o.return=n,u.return=n,o.sibling=u,n.child=o,ja(n,e.child,null,a),o=n.child,o.memoizedState=Lc(a),o.childLanes=Nc(e,v,a),n.memoizedState=Uc,n=u);else if(fa(n),b.data==="$!"){if(v=b.nextSibling&&b.nextSibling.dataset,v)var k=v.dgst;v=k,o=Error(s(419)),o.stack="",o.digest=v,Kr({value:o,source:null,stack:null}),n=zc(e,n,a)}else if(pn||oo(e,n,a,!1),v=(a&e.childLanes)!==0,pn||v){if(v=Fe,v!==null){if(o=a&-a,o&42)o=1;else switch(o){case 2:o=1;break;case 8:o=4;break;case 32:o=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:o=64;break;case 268435456:o=134217728;break;default:o=0}if(o=o&(v.suspendedLanes|a)?0:o,o!==0&&o!==O.retryLane)throw O.retryLane=o,ca(e,o),Nn(v,e,o),sm}b.data==="$?"||ff(),n=zc(e,n,a)}else b.data==="$?"?(n.flags|=128,n.child=e.child,n=Wv.bind(null,e),b._reactRetry=n,n=null):(e=O.treeContext,xn=mi(b.nextSibling),Ln=n,Ce=!0,di=null,Ei=!1,e!==null&&(ei[ni++]=Oi,ei[ni++]=Pi,ei[ni++]=Wa,Oi=e.id,Pi=e.overflow,Wa=n),n=Oc(n,o.children),n.flags|=4096);return n}return u?(ha(),u=o.fallback,b=n.mode,O=e.child,k=O.sibling,o=Ma(O,{mode:"hidden",children:o.children}),o.subtreeFlags=O.subtreeFlags&31457280,k!==null?u=Ma(k,u):(u=is(u,b,a,null),u.flags|=2),u.return=n,o.return=n,o.sibling=u,n.child=o,o=u,u=n.child,b=e.child.memoizedState,b===null?b=Lc(a):(O=b.cachePool,O!==null?(k=ln._currentValue,O=O.parent!==k?{parent:k,pool:k}:O):O=mp(),b={baseLanes:b.baseLanes|a,cachePool:O}),u.memoizedState=b,u.childLanes=Nc(e,v,a),n.memoizedState=Uc,o):(fa(n),a=e.child,e=a.sibling,a=Ma(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(v=n.deletions,v===null?(n.deletions=[e],n.flags|=16):v.push(e)),n.child=a,n.memoizedState=null,a)}function Oc(e,n){return n=Pc({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Pc(e,n){return Hm(e,n,0,null)}function zc(e,n,a){return ja(n,e.child,null,a),e=Oc(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function mm(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Hc(e.return,n,a)}function Bc(e,n,a,o,u){var f=e.memoizedState;f===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u}:(f.isBackwards=n,f.rendering=null,f.renderingStartTime=0,f.last=o,f.tail=a,f.tailMode=u)}function gm(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;if(Sn(e,n,o.children,a),o=on.current,o&2)o=o&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&mm(e,a,n);else if(e.tag===19)mm(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}o&=1}switch(Vt(on,o),u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&fl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Bc(n,!1,u,a,f);break;case"backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&fl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Bc(n,!0,a,null,f);break;case"together":Bc(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ii(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ea|=n.lanes,!(a&n.childLanes))if(e!==null){if(oo(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Ma(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Ma(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Ic(e,n){return e.lanes&n?!0:(e=e.dependencies,!!(e!==null&&El(e)))}function Uv(e,n,a){switch(n.tag){case 3:It(n,n.stateNode.containerInfo),ma(n,ln,e.memoizedState.cache),Zr();break;case 27:case 5:Kt(n);break;case 4:It(n,n.stateNode.containerInfo);break;case 10:ma(n,n.type,n.memoizedProps.value);break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(fa(n),n.flags|=128,null):a&n.child.childLanes?pm(e,n,a):(fa(n),e=Ii(e,n,a),e!==null?e.sibling:null);fa(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(oo(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return gm(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Vt(on,on.current),o)break;return null;case 22:case 23:return n.lanes=0,um(e,n,a);case 24:ma(n,ln,e.memoizedState.cache)}return Ii(e,n,a)}function _m(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)pn=!0;else{if(!Ic(e,a)&&!(n.flags&128))return pn=!1,Uv(e,n,a);pn=!!(e.flags&131072)}else pn=!1,Ce&&n.flags&1048576&&ep(n,rl,n.index);switch(n.lanes=0,n.tag){case 16:t:{e=n.pendingProps;var o=n.elementType,u=o._init;if(o=u(o._payload),n.type=o,typeof o=="function")Jc(o)?(e=$a(o,e),n.tag=1,n=hm(null,n,o,e,a)):(n.tag=0,n=wc(null,n,o,e,a));else{if(o!=null){if(u=o.$$typeof,u===C){n.tag=11,n=rm(null,n,o,e,a);break t}else if(u===_){n.tag=14,n=om(null,n,o,e,a);break t}}throw n=B(o)||o,Error(s(306,n,""))}}return n;case 0:return wc(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=$a(o,n.pendingProps),hm(e,n,o,u,a);case 3:t:{if(It(n,n.stateNode.containerInfo),e===null)throw Error(s(387));var f=n.pendingProps;u=n.memoizedState,o=u.element,kc(e,n),co(n,f,null,a);var v=n.memoizedState;if(f=v.cache,ma(n,ln,f),f!==u.cache&&Gc(n,[ln],a,!0),uo(),f=v.element,u.isDehydrated)if(u={element:f,isDehydrated:!1,cache:v.cache},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){n=dm(e,n,f,a);break t}else if(f!==o){o=ti(Error(s(424)),n),Kr(o),n=dm(e,n,f,a);break t}else for(xn=mi(n.stateNode.containerInfo.firstChild),Ln=n,Ce=!0,di=null,Ei=!0,a=cp(n,null,f,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Zr(),f===o){n=Ii(e,n,a);break t}Sn(e,n,f,a)}n=n.child}return n;case 26:return ro(e,n),e===null?(a=Sg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ce||(a=n.type,e=n.pendingProps,o=Fl(be.current).createElement(a),o[an]=n,o[sn]=e,yn(o,a,e),Q(o),n.stateNode=o):n.memoizedState=Sg(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Kt(n),e===null&&Ce&&(o=n.stateNode=_g(n.type,n.pendingProps,be.current),Ln=n,Ei=!0,xn=mi(o.firstChild)),o=n.pendingProps.children,e!==null||Ce?Sn(e,n,o,a):n.child=ja(n,null,o,a),ro(e,n),n.child;case 5:return e===null&&Ce&&((u=o=xn)&&(o=ox(o,n.type,n.pendingProps,Ei),o!==null?(n.stateNode=o,Ln=n,xn=mi(o.firstChild),Ei=!1,u=!0):u=!1),u||Ya(n)),Kt(n),u=n.type,f=n.pendingProps,v=e!==null?e.memoizedProps:null,o=f.children,bf(u,f)?o=null:v!==null&&bf(u,v)&&(n.flags|=32),n.memoizedState!==null&&(u=hc(e,n,Tv,null,null,a),Ao._currentValue=u),ro(e,n),Sn(e,n,o,a),n.child;case 6:return e===null&&Ce&&((e=a=xn)&&(a=lx(a,n.pendingProps,Ei),a!==null?(n.stateNode=a,Ln=n,xn=null,e=!0):e=!1),e||Ya(n)),null;case 13:return pm(e,n,a);case 4:return It(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=ja(n,null,o,a):Sn(e,n,o,a),n.child;case 11:return rm(e,n,n.type,n.pendingProps,a);case 7:return Sn(e,n,n.pendingProps,a),n.child;case 8:return Sn(e,n,n.pendingProps.children,a),n.child;case 12:return Sn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,ma(n,n.type,o.value),Sn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,es(n),u=Tn(u),o=o(u),n.flags|=1,Sn(e,n,o,a),n.child;case 14:return om(e,n,n.type,n.pendingProps,a);case 15:return lm(e,n,n.type,n.pendingProps,a);case 19:return gm(e,n,a);case 22:return um(e,n,a);case 24:return es(n),o=Tn(ln),e===null?(u=cc(),u===null&&(u=Fe,f=lc(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Vc(n),ma(n,ln,u)):(e.lanes&a&&(kc(e,n),co(n,null,null,a),uo()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),ma(n,ln,o)):(o=f.cache,ma(n,ln,o),o!==u.cache&&Gc(n,[ln],a,!0))),Sn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}var Fc=Rt(null),ts=null,Fi=null;function ma(e,n,a){Vt(Fc,n._currentValue),n._currentValue=a}function Hi(e){e._currentValue=Fc.current,zt(Fc)}function Hc(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Gc(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var v=u.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=u;for(var O=0;O<n.length;O++)if(b.context===n[O]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),Hc(f.return,a,e),o||(v=null);break t}f=b.next}}else if(u.tag===18){if(v=u.return,v===null)throw Error(s(341));v.lanes|=a,f=v.alternate,f!==null&&(f.lanes|=a),Hc(v,a,e),v=null}else v=u.child;if(v!==null)v.return=u;else for(v=u;v!==null;){if(v===e){v=null;break}if(u=v.sibling,u!==null){u.return=v.return,v=u;break}v=v.return}u=v}}function oo(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if(u.flags&524288)f=!0;else if(u.flags&262144)break}if(u.tag===10){var v=u.alternate;if(v===null)throw Error(s(387));if(v=v.memoizedProps,v!==null){var b=u.type;Xn(u.pendingProps.value,v.value)||(e!==null?e.push(b):e=[b])}}else if(u===F.current){if(v=u.alternate,v===null)throw Error(s(387));v.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Ao):e=[Ao])}u=u.return}e!==null&&Gc(n,e,a,o),n.flags|=262144}function El(e){for(e=e.firstContext;e!==null;){if(!Xn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function es(e){ts=e,Fi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Tn(e){return vm(ts,e)}function Tl(e,n){return ts===null&&es(e),vm(e,n)}function vm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Fi===null){if(e===null)throw Error(s(308));Fi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Fi=Fi.next=n;return a}var ga=!1;function Vc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function kc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function _a(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function va(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,Xe&2){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=al(e),$d(e,null,a),n}return il(e,o,n,a),al(e)}function lo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194176)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Mi(e,a)}}function Xc(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var v={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=v:f=f.next=v,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Wc=!1;function uo(){if(Wc){var e=Vs;if(e!==null)throw e}}function co(e,n,a,o){Wc=!1;var u=e.updateQueue;ga=!1;var f=u.firstBaseUpdate,v=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var O=b,k=O.next;O.next=null,v===null?f=k:v.next=k,v=O;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,b=ut.lastBaseUpdate,b!==v&&(b===null?ut.firstBaseUpdate=k:b.next=k,ut.lastBaseUpdate=O))}if(f!==null){var St=u.baseState;v=0,ut=k=O=null,b=f;do{var it=b.lane&-536870913,lt=it!==b.lane;if(lt?(Te&it)===it:(o&it)===it){it!==0&&it===Gs&&(Wc=!0),ut!==null&&(ut=ut.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Yt=e,re=b;it=n;var je=a;switch(re.tag){case 1:if(Yt=re.payload,typeof Yt=="function"){St=Yt.call(je,St,it);break t}St=Yt;break t;case 3:Yt.flags=Yt.flags&-65537|128;case 0:if(Yt=re.payload,it=typeof Yt=="function"?Yt.call(je,St,it):Yt,it==null)break t;St=E({},St,it);break t;case 2:ga=!0}}it=b.callback,it!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[it]:lt.push(it))}else lt={lane:it,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ut===null?(k=ut=lt,O=St):ut=ut.next=lt,v|=it;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);ut===null&&(O=St),u.baseState=O,u.firstBaseUpdate=k,u.lastBaseUpdate=ut,f===null&&(u.shared.lanes=0),Ea|=v,e.lanes=v,e.memoizedState=St}}function xm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Sm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)xm(a[e],n)}function fo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,v=a.inst;o=f(),v.destroy=o}a=a.next}while(a!==u)}}catch(b){Ie(n,n.return,b)}}function xa(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var v=o.inst,b=v.destroy;if(b!==void 0){v.destroy=void 0,u=n;var O=a;try{b()}catch(k){Ie(u,O,k)}}}o=o.next}while(o!==f)}}catch(k){Ie(n,n.return,k)}}function ym(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Sm(n,a)}catch(o){Ie(e,e.return,o)}}}function Mm(e,n,a){a.props=$a(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ie(e,n,o)}}function ns(e,n){try{var a=e.ref;if(a!==null){var o=e.stateNode;switch(e.tag){case 26:case 27:case 5:var u=o;break;default:u=o}typeof a=="function"?e.refCleanup=a(u):a.current=u}}catch(f){Ie(e,n,f)}}function Wn(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ie(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ie(e,n,u)}else a.current=null}function Em(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ie(e,e.return,u)}}function Tm(e,n,a){try{var o=e.stateNode;nx(o,e.type,a,n),o[sn]=n}catch(u){Ie(e,e.return,u)}}function bm(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27||e.tag===4}function qc(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||bm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==27&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Yc(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.nodeType===8?a.parentNode.insertBefore(e,n):a.insertBefore(e,n):(a.nodeType===8?(n=a.parentNode,n.insertBefore(e,a)):(n=a,n.appendChild(e)),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Il));else if(o!==4&&o!==27&&(e=e.child,e!==null))for(Yc(e,n,a),e=e.sibling;e!==null;)Yc(e,n,a),e=e.sibling}function bl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&o!==27&&(e=e.child,e!==null))for(bl(e,n,a),e=e.sibling;e!==null;)bl(e,n,a),e=e.sibling}var Gi=!1,qe=!1,jc=!1,Am=typeof WeakSet=="function"?WeakSet:Set,mn=null,Rm=!1;function Lv(e,n){if(e=e.containerInfo,Ef=Wl,e=Xd(e),Ku(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var v=0,b=-1,O=-1,k=0,ut=0,St=e,it=null;e:for(;;){for(var lt;St!==a||u!==0&&St.nodeType!==3||(b=v+u),St!==f||o!==0&&St.nodeType!==3||(O=v+o),St.nodeType===3&&(v+=St.nodeValue.length),(lt=St.firstChild)!==null;)it=St,St=lt;for(;;){if(St===e)break e;if(it===a&&++k===u&&(b=v),it===f&&++ut===o&&(O=v),(lt=St.nextSibling)!==null)break;St=it,it=St.parentNode}St=lt}a=b===-1||O===-1?null:{start:b,end:O}}else a=null}a=a||{start:0,end:0}}else a=null;for(Tf={focusedElem:e,selectionRange:a},Wl=!1,mn=n;mn!==null;)if(n=mn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,mn=e;else for(;mn!==null;){switch(n=mn,f=n.alternate,e=n.flags,n.tag){case 0:break;case 11:case 15:break;case 1:if(e&1024&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Yt=$a(a.type,u,a.elementType===a.type);e=o.getSnapshotBeforeUpdate(Yt,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(re){Ie(a,a.return,re)}}break;case 3:if(e&1024){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Cf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Cf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,mn=e;break}mn=n.return}return Yt=Rm,Rm=!1,Yt}function Cm(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ki(e,a),o&4&&fo(5,a);break;case 1:if(ki(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(b){Ie(a,a.return,b)}else{var u=$a(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(b){Ie(a,a.return,b)}}o&64&&ym(a),o&512&&ns(a,a.return);break;case 3:if(ki(e,a),o&64&&(o=a.updateQueue,o!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{Sm(o,e)}catch(b){Ie(a,a.return,b)}}break;case 26:ki(e,a),o&512&&ns(a,a.return);break;case 27:case 5:ki(e,a),n===null&&o&4&&Em(a),o&512&&ns(a,a.return);break;case 12:ki(e,a);break;case 13:ki(e,a),o&4&&Um(e,a);break;case 22:if(u=a.memoizedState!==null||Gi,!u){n=n!==null&&n.memoizedState!==null||qe;var f=Gi,v=qe;Gi=u,(qe=n)&&!v?Sa(e,a,(a.subtreeFlags&8772)!==0):ki(e,a),Gi=f,qe=v}o&512&&(a.memoizedProps.mode==="manual"?ns(a,a.return):Wn(a,a.return));break;default:ki(e,a)}}function Dm(e){var n=e.alternate;n!==null&&(e.alternate=null,Dm(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Ir(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,qn=!1;function Vi(e,n,a){for(a=a.child;a!==null;)wm(e,n,a),a=a.sibling}function wm(e,n,a){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(Qt,a)}catch{}switch(a.tag){case 26:qe||Wn(a,n),Vi(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:qe||Wn(a,n);var o=$e,u=qn;for($e=a.stateNode,Vi(e,n,a),a=a.stateNode,n=a.attributes;n.length;)a.removeAttributeNode(n[0]);Ir(a),$e=o,qn=u;break;case 5:qe||Wn(a,n);case 6:u=$e;var f=qn;if($e=null,Vi(e,n,a),$e=u,qn=f,$e!==null)if(qn)try{e=$e,o=a.stateNode,e.nodeType===8?e.parentNode.removeChild(o):e.removeChild(o)}catch(v){Ie(a,n,v)}else try{$e.removeChild(a.stateNode)}catch(v){Ie(a,n,v)}break;case 18:$e!==null&&(qn?(n=$e,a=a.stateNode,n.nodeType===8?Rf(n.parentNode,a):n.nodeType===1&&Rf(n,a),wo(n)):Rf($e,a.stateNode));break;case 4:o=$e,u=qn,$e=a.stateNode.containerInfo,qn=!0,Vi(e,n,a),$e=o,qn=u;break;case 0:case 11:case 14:case 15:qe||xa(2,a,n),qe||xa(4,a,n),Vi(e,n,a);break;case 1:qe||(Wn(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Mm(a,n,o)),Vi(e,n,a);break;case 21:Vi(e,n,a);break;case 22:qe||Wn(a,n),qe=(o=qe)||a.memoizedState!==null,Vi(e,n,a),qe=o;break;default:Vi(e,n,a)}}function Um(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{wo(e)}catch(a){Ie(n,n.return,a)}}function Nv(e){switch(e.tag){case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Am),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Am),n;default:throw Error(s(435,e.tag))}}function Zc(e,n){var a=Nv(e);n.forEach(function(o){var u=qv.bind(null,e,o);a.has(o)||(a.add(o),o.then(u,u))})}function ai(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,v=n,b=v;t:for(;b!==null;){switch(b.tag){case 27:case 5:$e=b.stateNode,qn=!1;break t;case 3:$e=b.stateNode.containerInfo,qn=!0;break t;case 4:$e=b.stateNode.containerInfo,qn=!0;break t}b=b.return}if($e===null)throw Error(s(160));wm(f,v,u),$e=null,qn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13878)for(n=n.child;n!==null;)Lm(n,e),n=n.sibling}var pi=null;function Lm(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ai(n,e),si(e),o&4&&(xa(3,e,e.return),fo(3,e),xa(5,e,e.return));break;case 1:ai(n,e),si(e),o&512&&(qe||a===null||Wn(a,a.return)),o&64&&Gi&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=pi;if(ai(n,e),si(e),o&512&&(qe||a===null||Wn(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Ga]||f[an]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),yn(f,o,a),f[an]=e,Q(f),o=f;break t;case"link":var v=Eg("link","href",u).get(o+(a.href||""));if(v){for(var b=0;b<v.length;b++)if(f=v[b],f.getAttribute("href")===(a.href==null?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){v.splice(b,1);break e}}f=u.createElement(o),yn(f,o,a),u.head.appendChild(f);break;case"meta":if(v=Eg("meta","content",u).get(o+(a.content||""))){for(b=0;b<v.length;b++)if(f=v[b],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){v.splice(b,1);break e}}f=u.createElement(o),yn(f,o,a),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[an]=e,Q(f),o=f}e.stateNode=o}else Tg(u,e.type,e.stateNode);else e.stateNode=Mg(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?Tg(u,e.type,e.stateNode):Mg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Tm(e,e.memoizedProps,a.memoizedProps)}break;case 27:if(o&4&&e.alternate===null){u=e.stateNode,f=e.memoizedProps;try{for(var O=u.firstChild;O;){var k=O.nextSibling,ut=O.nodeName;O[Ga]||ut==="HEAD"||ut==="BODY"||ut==="SCRIPT"||ut==="STYLE"||ut==="LINK"&&O.rel.toLowerCase()==="stylesheet"||u.removeChild(O),O=k}for(var St=e.type,it=u.attributes;it.length;)u.removeAttributeNode(it[0]);yn(u,St,f),u[an]=e,u[sn]=f}catch(Yt){Ie(e,e.return,Yt)}}case 5:if(ai(n,e),si(e),o&512&&(qe||a===null||Wn(a,a.return)),e.flags&32){u=e.stateNode;try{Bn(u,"")}catch(Yt){Ie(e,e.return,Yt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Tm(e,u,a!==null?a.memoizedProps:u)),o&1024&&(jc=!0);break;case 6:if(ai(n,e),si(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Yt){Ie(e,e.return,Yt)}}break;case 3:if(Vl=null,u=pi,pi=Hl(n.containerInfo),ai(n,e),pi=u,si(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{wo(n.containerInfo)}catch(Yt){Ie(e,e.return,Yt)}jc&&(jc=!1,Nm(e));break;case 4:o=pi,pi=Hl(e.stateNode.containerInfo),ai(n,e),si(e),pi=o;break;case 12:ai(n,e),si(e);break;case 13:ai(n,e),si(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(sf=dt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Zc(e,o)));break;case 22:if(o&512&&(qe||a===null||Wn(a,a.return)),O=e.memoizedState!==null,k=a!==null&&a.memoizedState!==null,ut=Gi,St=qe,Gi=ut||O,qe=St||k,ai(n,e),qe=St,Gi=ut,si(e),n=e.stateNode,n._current=e,n._visibility&=-3,n._visibility|=n._pendingVisibility&2,o&8192&&(n._visibility=O?n._visibility&-2:n._visibility|1,O&&(n=Gi||qe,a===null||k||n||qs(e)),e.memoizedProps===null||e.memoizedProps.mode!=="manual"))t:for(a=null,n=e;;){if(n.tag===5||n.tag===26||n.tag===27){if(a===null){k=a=n;try{if(u=k.stateNode,O)f=u.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none";else{v=k.stateNode,b=k.memoizedProps.style;var lt=b!=null&&b.hasOwnProperty("display")?b.display:null;v.style.display=lt==null||typeof lt=="boolean"?"":(""+lt).trim()}}catch(Yt){Ie(k,k.return,Yt)}}}else if(n.tag===6){if(a===null){k=n;try{k.stateNode.nodeValue=O?"":k.memoizedProps}catch(Yt){Ie(k,k.return,Yt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Zc(e,a))));break;case 19:ai(n,e),si(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Zc(e,o)));break;case 21:break;default:ai(n,e),si(e)}}function si(e){var n=e.flags;if(n&2){try{if(e.tag!==27){t:{for(var a=e.return;a!==null;){if(bm(a)){var o=a;break t}a=a.return}throw Error(s(160))}switch(o.tag){case 27:var u=o.stateNode,f=qc(e);bl(e,f,u);break;case 5:var v=o.stateNode;o.flags&32&&(Bn(v,""),o.flags&=-33);var b=qc(e);bl(e,b,v);break;case 3:case 4:var O=o.stateNode.containerInfo,k=qc(e);Yc(e,k,O);break;default:throw Error(s(161))}}}catch(ut){Ie(e,e.return,ut)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Nm(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Nm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ki(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Cm(e,n.alternate,n),n=n.sibling}function qs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:xa(4,n,n.return),qs(n);break;case 1:Wn(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Mm(n,n.return,a),qs(n);break;case 26:case 27:case 5:Wn(n,n.return),qs(n);break;case 22:Wn(n,n.return),n.memoizedState===null&&qs(n);break;default:qs(n)}e=e.sibling}}function Sa(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,v=f.flags;switch(f.tag){case 0:case 11:case 15:Sa(u,f,a),fo(4,f);break;case 1:if(Sa(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(k){Ie(o,o.return,k)}if(o=f,u=o.updateQueue,u!==null){var b=o.stateNode;try{var O=u.shared.hiddenCallbacks;if(O!==null)for(u.shared.hiddenCallbacks=null,u=0;u<O.length;u++)xm(O[u],b)}catch(k){Ie(o,o.return,k)}}a&&v&64&&ym(f),ns(f,f.return);break;case 26:case 27:case 5:Sa(u,f,a),a&&o===null&&v&4&&Em(f),ns(f,f.return);break;case 12:Sa(u,f,a);break;case 13:Sa(u,f,a),a&&v&4&&Um(u,f);break;case 22:f.memoizedState===null&&Sa(u,f,a),ns(f,f.return);break;default:Sa(u,f,a)}n=n.sibling}}function Kc(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&eo(a))}function Qc(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e))}function ya(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Om(e,n,a,o),n=n.sibling}function Om(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:ya(e,n,a,o),u&2048&&fo(9,n);break;case 3:ya(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e)));break;case 12:if(u&2048){ya(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,v=f.id,b=f.onPostCommit;typeof b=="function"&&b(v,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(O){Ie(n,n.return,O)}}else ya(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,n.memoizedState!==null?f._visibility&4?ya(e,n,a,o):ho(e,n):f._visibility&4?ya(e,n,a,o):(f._visibility|=4,Ys(e,n,a,o,(n.subtreeFlags&10256)!==0)),u&2048&&Kc(n.alternate,n);break;case 24:ya(e,n,a,o),u&2048&&Qc(n.alternate,n);break;default:ya(e,n,a,o)}}function Ys(e,n,a,o,u){for(u=u&&(n.subtreeFlags&10256)!==0,n=n.child;n!==null;){var f=e,v=n,b=a,O=o,k=v.flags;switch(v.tag){case 0:case 11:case 15:Ys(f,v,b,O,u),fo(8,v);break;case 23:break;case 22:var ut=v.stateNode;v.memoizedState!==null?ut._visibility&4?Ys(f,v,b,O,u):ho(f,v):(ut._visibility|=4,Ys(f,v,b,O,u)),u&&k&2048&&Kc(v.alternate,v);break;case 24:Ys(f,v,b,O,u),u&&k&2048&&Qc(v.alternate,v);break;default:Ys(f,v,b,O,u)}n=n.sibling}}function ho(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:ho(a,o),u&2048&&Kc(o.alternate,o);break;case 24:ho(a,o),u&2048&&Qc(o.alternate,o);break;default:ho(a,o)}n=n.sibling}}var po=8192;function js(e){if(e.subtreeFlags&po)for(e=e.child;e!==null;)Pm(e),e=e.sibling}function Pm(e){switch(e.tag){case 26:js(e),e.flags&po&&e.memoizedState!==null&&yx(pi,e.memoizedState,e.memoizedProps);break;case 5:js(e);break;case 3:case 4:var n=pi;pi=Hl(e.stateNode.containerInfo),js(e),pi=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=po,po=16777216,js(e),po=n):js(e));break;default:js(e)}}function zm(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function mo(e){var n=e.deletions;if(e.flags&16){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];mn=o,Im(o,e)}zm(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Bm(e),e=e.sibling}function Bm(e){switch(e.tag){case 0:case 11:case 15:mo(e),e.flags&2048&&xa(9,e,e.return);break;case 3:mo(e);break;case 12:mo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&4&&(e.return===null||e.return.tag!==13)?(n._visibility&=-5,Al(e)):mo(e);break;default:mo(e)}}function Al(e){var n=e.deletions;if(e.flags&16){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];mn=o,Im(o,e)}zm(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:xa(8,n,n.return),Al(n);break;case 22:a=n.stateNode,a._visibility&4&&(a._visibility&=-5,Al(n));break;default:Al(n)}e=e.sibling}}function Im(e,n){for(;mn!==null;){var a=mn;switch(a.tag){case 0:case 11:case 15:xa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:eo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,mn=o;else t:for(a=e;mn!==null;){o=mn;var u=o.sibling,f=o.return;if(Dm(o),o===a){mn=null;break t}if(u!==null){u.return=f,mn=u;break t}mn=f}}}function Ov(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,n,a,o){return new Ov(e,n,a,o)}function Jc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ma(e,n){var a=e.alternate;return a===null?(a=ri(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&31457280,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Fm(e,n){e.flags&=31457282;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Rl(e,n,a,o,u,f){var v=0;if(o=e,typeof e=="function")Jc(e)&&(v=1);else if(typeof e=="string")v=xx(e,a,ge.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case m:return is(a.children,u,f,n);case p:v=8,u|=24;break;case g:return e=ri(12,a,n,u|2),e.elementType=g,e.lanes=f,e;case D:return e=ri(13,a,n,u),e.elementType=D,e.lanes=f,e;case y:return e=ri(19,a,n,u),e.elementType=y,e.lanes=f,e;case z:return Hm(a,u,f,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case x:case M:v=10;break t;case S:v=9;break t;case C:v=11;break t;case _:v=14;break t;case I:v=16,o=null;break t}v=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ri(v,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function is(e,n,a,o){return e=ri(7,e,o,n),e.lanes=a,e}function Hm(e,n,a,o){e=ri(22,e,o,n),e.elementType=z,e.lanes=a;var u={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var f=u._current;if(f===null)throw Error(s(456));if(!(u._pendingVisibility&2)){var v=ca(f,2);v!==null&&(u._pendingVisibility|=2,Nn(v,f,2))}},attach:function(){var f=u._current;if(f===null)throw Error(s(456));if(u._pendingVisibility&2){var v=ca(f,2);v!==null&&(u._pendingVisibility&=-3,Nn(v,f,2))}}};return e.stateNode=u,e}function $c(e,n,a){return e=ri(6,e,null,n),e.lanes=a,e}function tf(e,n,a){return n=ri(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Xi(e){e.flags|=4}function Gm(e,n){if(n.type!=="stylesheet"||n.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!bg(n)){if(n=ii.current,n!==null&&((Te&4194176)===Te?Ti!==null:(Te&62914560)!==Te&&!(Te&536870912)||n!==Ti))throw Jr=sc,ap;e.flags|=8192}}function Cl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Ae():536870912,e.lanes|=n,Ks|=n)}function go(e,n){if(!Ce)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function ke(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&31457280,o|=u.flags&31457280,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function Pv(e,n,a){var o=n.pendingProps;switch(ic(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ke(n),null;case 1:return ke(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Hi(ln),jt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(jr(n)?Xi(n):e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,di!==null&&(uf(di),di=null))),ke(n),null;case 26:return a=n.memoizedState,e===null?(Xi(n),a!==null?(ke(n),Gm(n,a)):(ke(n),n.flags&=-16777217)):a?a!==e.memoizedState?(Xi(n),ke(n),Gm(n,a)):(ke(n),n.flags&=-16777217):(e.memoizedProps!==o&&Xi(n),ke(n),n.flags&=-16777217),null;case 27:Bt(n),a=be.current;var u=n.type;if(e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Xi(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return ke(n),null}e=ge.current,jr(n)?np(n):(e=_g(u,o,a),n.stateNode=e,Xi(n))}return ke(n),null;case 5:if(Bt(n),a=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Xi(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return ke(n),null}if(e=ge.current,jr(n))np(n);else{switch(u=Fl(be.current),e){case 1:e=u.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=u.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof o.is=="string"?u.createElement("select",{is:o.is}):u.createElement("select"),o.multiple?e.multiple=!0:o.size&&(e.size=o.size);break;default:e=typeof o.is=="string"?u.createElement(a,{is:o.is}):u.createElement(a)}}e[an]=n,e[sn]=o;t:for(u=n.child;u!==null;){if(u.tag===5||u.tag===6)e.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===n)break t;for(;u.sibling===null;){if(u.return===null||u.return===n)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}n.stateNode=e;t:switch(yn(e,a,o),a){case"button":case"input":case"select":case"textarea":e=!!o.autoFocus;break t;case"img":e=!0;break t;default:e=!1}e&&Xi(n)}}return ke(n),n.flags&=-16777217,null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&Xi(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=be.current,jr(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Ln,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[an]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||fg(e.nodeValue,a)),e||Ya(n)}else e=Fl(e).createTextNode(o),e[an]=n,n.stateNode=e}return ke(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=jr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[an]=n}else Zr(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ke(n),u=!1}else di!==null&&(uf(di),di=null),u=!0;if(!u)return n.flags&256?(zi(n),n):(zi(n),null)}if(zi(n),n.flags&128)return n.lanes=a,n;if(a=o!==null,e=e!==null&&e.memoizedState!==null,a){o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool);var f=null;o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)}return a!==e&&a&&(n.child.flags|=8192),Cl(n,n.updateQueue),ke(n),null;case 4:return jt(),e===null&&Sf(n.stateNode.containerInfo),ke(n),null;case 10:return Hi(n.type),ke(n),null;case 19:if(zt(on),u=n.memoizedState,u===null)return ke(n),null;if(o=(n.flags&128)!==0,f=u.rendering,f===null)if(o)go(u,!1);else{if(Ye!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(f=fl(e),f!==null){for(n.flags|=128,go(u,!1),e=f.updateQueue,n.updateQueue=e,Cl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Fm(a,e),a=a.sibling;return Vt(on,on.current&1|2),n.child}e=e.sibling}u.tail!==null&&dt()>Dl&&(n.flags|=128,o=!0,go(u,!1),n.lanes=4194304)}else{if(!o)if(e=fl(f),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,Cl(n,e),go(u,!0),u.tail===null&&u.tailMode==="hidden"&&!f.alternate&&!Ce)return ke(n),null}else 2*dt()-u.renderingStartTime>Dl&&a!==536870912&&(n.flags|=128,o=!0,go(u,!1),n.lanes=4194304);u.isBackwards?(f.sibling=n.child,n.child=f):(e=u.last,e!==null?e.sibling=f:n.child=f,u.last=f)}return u.tail!==null?(n=u.tail,u.rendering=n,u.tail=n.sibling,u.renderingStartTime=dt(),n.sibling=null,e=on.current,Vt(on,o?e&1|2:e&1),n):(ke(n),null);case 22:case 23:return zi(n),oc(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?a&536870912&&!(n.flags&128)&&(ke(n),n.subtreeFlags&6&&(n.flags|=8192)):ke(n),a=n.updateQueue,a!==null&&Cl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&zt(Za),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Hi(ln),ke(n),null;case 25:return null}throw Error(s(156,n.tag))}function zv(e,n){switch(ic(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Hi(ln),jt(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Bt(n),null;case 13:if(zi(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Zr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return zt(on),null;case 4:return jt(),null;case 10:return Hi(n.type),null;case 22:case 23:return zi(n),oc(),e!==null&&zt(Za),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Hi(ln),null;case 25:return null;default:return null}}function Vm(e,n){switch(ic(n),n.tag){case 3:Hi(ln),jt();break;case 26:case 27:case 5:Bt(n);break;case 4:jt();break;case 13:zi(n);break;case 19:zt(on);break;case 10:Hi(n.type);break;case 22:case 23:zi(n),oc(),e!==null&&zt(Za);break;case 24:Hi(ln)}}var Bv={getCacheForType:function(e){var n=Tn(ln),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a}},Iv=typeof WeakMap=="function"?WeakMap:Map,Xe=0,Fe=null,_e=null,Te=0,He=0,Yn=null,Wi=!1,Zs=!1,ef=!1,qi=0,Ye=0,Ea=0,as=0,nf=0,oi=0,Ks=0,_o=null,Ai=null,af=!1,sf=0,Dl=1/0,wl=null,Ta=null,Ul=!1,ss=null,vo=0,rf=0,of=null,xo=0,lf=null;function jn(){if(Xe&2&&Te!==0)return Te&-Te;if(R.T!==null){var e=Gs;return e!==0?e:gf()}return Br()}function km(){oi===0&&(oi=!(Te&536870912)||Ce?nn():536870912);var e=ii.current;return e!==null&&(e.flags|=32),oi}function Nn(e,n,a){(e===Fe&&He===2||e.cancelPendingCommit!==null)&&(Qs(e,0),Yi(e,Te,oi,!1)),Dn(e,a),(!(Xe&2)||e!==Fe)&&(e===Fe&&(!(Xe&2)&&(as|=a),Ye===4&&Yi(e,Te,oi,!1)),Ri(e))}function Xm(e,n,a){if(Xe&6)throw Error(s(327));var o=!a&&(n&60)===0&&(n&e.expiredLanes)===0||ne(e,n),u=o?Gv(e,n):hf(e,n,!0),f=o;do{if(u===0){Zs&&!o&&Yi(e,n,0,!1);break}else if(u===6)Yi(e,n,0,!Wi);else{if(a=e.current.alternate,f&&!Fv(a)){u=hf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var v=0;else v=e.pendingLanes&-536870913,v=v!==0?v:v&536870912?536870912:0;if(v!==0){n=v;t:{var b=e;u=_o;var O=b.current.memoizedState.isDehydrated;if(O&&(Qs(b,v).flags|=256),v=hf(b,v,!1),v!==2){if(ef&&!O){b.errorRecoveryDisabledLanes|=f,as|=f,u=4;break t}f=Ai,Ai=u,f!==null&&uf(f)}u=v}if(f=!1,u!==2)continue}}if(u===1){Qs(e,0),Yi(e,n,0,!0);break}t:{switch(o=e,u){case 0:case 1:throw Error(s(345));case 4:if((n&4194176)===n){Yi(o,n,oi,!Wi);break t}break;case 2:Ai=null;break;case 3:case 5:break;default:throw Error(s(329))}if(o.finishedWork=a,o.finishedLanes=n,(n&62914560)===n&&(f=sf+300-dt(),10<f)){if(Yi(o,n,oi,!Wi),Ut(o,0)!==0)break t;o.timeoutHandle=pg(Wm.bind(null,o,a,Ai,wl,af,n,oi,as,Ks,Wi,2,-0,0),f);break t}Wm(o,a,Ai,wl,af,n,oi,as,Ks,Wi,0,-0,0)}}break}while(!0);Ri(e)}function uf(e){Ai===null?Ai=e:Ai.push.apply(Ai,e)}function Wm(e,n,a,o,u,f,v,b,O,k,ut,St,it){var lt=n.subtreeFlags;if((lt&8192||(lt&16785408)===16785408)&&(bo={stylesheets:null,count:0,unsuspend:Sx},Pm(n),n=Mx(),n!==null)){e.cancelPendingCommit=n(Jm.bind(null,e,a,o,u,v,b,O,1,St,it)),Yi(e,f,v,!k);return}Jm(e,a,o,u,v,b,O,ut,St,it)}function Fv(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!Xn(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Yi(e,n,a,o){n&=~nf,n&=~as,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-$t(u),v=1<<f;o[f]=-1,u&=~v}a!==0&&zr(e,a,n)}function Ll(){return Xe&6?!0:(So(0),!1)}function cf(){if(_e!==null){if(He===0)var e=_e.return;else e=_e,Fi=ts=null,mc(e),Fs=null,$r=0,e=_e;for(;e!==null;)Vm(e.alternate,e),e=e.return;_e=null}}function Qs(e,n){e.finishedWork=null,e.finishedLanes=0;var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,ax(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),cf(),Fe=e,_e=a=Ma(e.current,null),Te=n,He=0,Yn=null,Wi=!1,Zs=ne(e,n),ef=!1,Ks=oi=nf=as=Ea=Ye=0,Ai=_o=null,af=!1,n&8&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-$t(o),f=1<<u;n|=e[u],o&=~f}return qi=n,nl(),a}function qm(e,n){de=null,R.H=bi,n===Qr?(n=op(),He=3):n===ap?(n=op(),He=4):He=n===sm?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Yn=n,_e===null&&(Ye=1,Ml(e,ti(n,e.current)))}function Ym(){var e=R.H;return R.H=bi,e===null?bi:e}function jm(){var e=R.A;return R.A=Bv,e}function ff(){Ye=4,Wi||(Te&4194176)!==Te&&ii.current!==null||(Zs=!0),!(Ea&134217727)&&!(as&134217727)||Fe===null||Yi(Fe,Te,oi,!1)}function hf(e,n,a){var o=Xe;Xe|=2;var u=Ym(),f=jm();(Fe!==e||Te!==n)&&(wl=null,Qs(e,n)),n=!1;var v=Ye;t:do try{if(He!==0&&_e!==null){var b=_e,O=Yn;switch(He){case 8:cf(),v=6;break t;case 3:case 2:case 6:ii.current===null&&(n=!0);var k=He;if(He=0,Yn=null,Js(e,b,O,k),a&&Zs){v=0;break t}break;default:k=He,He=0,Yn=null,Js(e,b,O,k)}}Hv(),v=Ye;break}catch(ut){qm(e,ut)}while(!0);return n&&e.shellSuspendCounter++,Fi=ts=null,Xe=o,R.H=u,R.A=f,_e===null&&(Fe=null,Te=0,nl()),v}function Hv(){for(;_e!==null;)Zm(_e)}function Gv(e,n){var a=Xe;Xe|=2;var o=Ym(),u=jm();Fe!==e||Te!==n?(wl=null,Dl=dt()+500,Qs(e,n)):Zs=ne(e,n);t:do try{if(He!==0&&_e!==null){n=_e;var f=Yn;e:switch(He){case 1:He=0,Yn=null,Js(e,n,f,1);break;case 2:if(sp(f)){He=0,Yn=null,Km(n);break}n=function(){He===2&&Fe===e&&(He=7),Ri(e)},f.then(n,n);break t;case 3:He=7;break t;case 4:He=5;break t;case 7:sp(f)?(He=0,Yn=null,Km(n)):(He=0,Yn=null,Js(e,n,f,7));break;case 5:var v=null;switch(_e.tag){case 26:v=_e.memoizedState;case 5:case 27:var b=_e;if(!v||bg(v)){He=0,Yn=null;var O=b.sibling;if(O!==null)_e=O;else{var k=b.return;k!==null?(_e=k,Nl(k)):_e=null}break e}}He=0,Yn=null,Js(e,n,f,5);break;case 6:He=0,Yn=null,Js(e,n,f,6);break;case 8:cf(),Ye=6;break t;default:throw Error(s(462))}}Vv();break}catch(ut){qm(e,ut)}while(!0);return Fi=ts=null,R.H=o,R.A=u,Xe=a,_e!==null?0:(Fe=null,Te=0,nl(),Ye)}function Vv(){for(;_e!==null&&!T();)Zm(_e)}function Zm(e){var n=_m(e.alternate,e,qi);e.memoizedProps=e.pendingProps,n===null?Nl(e):_e=n}function Km(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=fm(a,n,n.pendingProps,n.type,void 0,Te);break;case 11:n=fm(a,n,n.pendingProps,n.type.render,n.ref,Te);break;case 5:mc(n);default:Vm(a,n),n=_e=Fm(n,qi),n=_m(a,n,qi)}e.memoizedProps=e.pendingProps,n===null?Nl(e):_e=n}function Js(e,n,a,o){Fi=ts=null,mc(n),Fs=null,$r=0;var u=n.return;try{if(wv(e,u,n,a,Te)){Ye=1,Ml(e,ti(a,e.current)),_e=null;return}}catch(f){if(u!==null)throw _e=u,f;Ye=1,Ml(e,ti(a,e.current)),_e=null;return}n.flags&32768?(Ce||o===1?e=!0:Zs||Te&536870912?e=!1:(Wi=e=!0,(o===2||o===3||o===6)&&(o=ii.current,o!==null&&o.tag===13&&(o.flags|=16384))),Qm(n,e)):Nl(n)}function Nl(e){var n=e;do{if(n.flags&32768){Qm(n,Wi);return}e=n.return;var a=Pv(n.alternate,n,qi);if(a!==null){_e=a;return}if(n=n.sibling,n!==null){_e=n;return}_e=n=e}while(n!==null);Ye===0&&(Ye=5)}function Qm(e,n){do{var a=zv(e.alternate,e);if(a!==null){a.flags&=32767,_e=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){_e=e;return}_e=e=a}while(e!==null);Ye=6,_e=null}function Jm(e,n,a,o,u,f,v,b,O,k){var ut=R.T,St=Y.p;try{Y.p=2,R.T=null,kv(e,n,a,o,St,u,f,v,b,O,k)}finally{R.T=ut,Y.p=St}}function kv(e,n,a,o,u,f,v,b){do $s();while(ss!==null);if(Xe&6)throw Error(s(327));var O=e.finishedWork;if(o=e.finishedLanes,O===null)return null;if(e.finishedWork=null,e.finishedLanes=0,O===e.current)throw Error(s(177));e.callbackNode=null,e.callbackPriority=0,e.cancelPendingCommit=null;var k=O.lanes|O.childLanes;if(k|=tc,qo(e,o,k,f,v,b),e===Fe&&(_e=Fe=null,Te=0),!(O.subtreeFlags&10256)&&!(O.flags&10256)||Ul||(Ul=!0,rf=k,of=a,Yv(wt,function(){return $s(),null})),a=(O.flags&15990)!==0,O.subtreeFlags&15990||a?(a=R.T,R.T=null,f=Y.p,Y.p=2,v=Xe,Xe|=4,Lv(e,O),Lm(O,e),dv(Tf,e.containerInfo),Wl=!!Ef,Tf=Ef=null,e.current=O,Cm(e,O.alternate,O),tt(),Xe=v,Y.p=f,R.T=a):e.current=O,Ul?(Ul=!1,ss=e,vo=o):$m(e,k),k=e.pendingLanes,k===0&&(Ta=null),Gt(O.stateNode),Ri(e),n!==null)for(u=e.onRecoverableError,O=0;O<n.length;O++)k=n[O],u(k.value,{componentStack:k.stack});return vo&3&&$s(),k=e.pendingLanes,o&4194218&&k&42?e===lf?xo++:(xo=0,lf=e):xo=0,So(0),null}function $m(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,eo(n)))}function $s(){if(ss!==null){var e=ss,n=rf;rf=0;var a=Rs(vo),o=R.T,u=Y.p;try{if(Y.p=32>a?32:a,R.T=null,ss===null)var f=!1;else{a=of,of=null;var v=ss,b=vo;if(ss=null,vo=0,Xe&6)throw Error(s(331));var O=Xe;if(Xe|=4,Bm(v.current),Om(v,v.current,b,a),Xe=O,So(0,!1),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(Qt,v)}catch{}f=!0}return f}finally{Y.p=u,R.T=o,$m(e,n)}}return!1}function tg(e,n,a){n=ti(a,n),n=Dc(e.stateNode,n,2),e=va(e,n,2),e!==null&&(Dn(e,2),Ri(e))}function Ie(e,n,a){if(e.tag===3)tg(e,e,a);else for(;n!==null;){if(n.tag===3){tg(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ta===null||!Ta.has(o))){e=ti(a,e),a=im(2),o=va(n,a,2),o!==null&&(am(a,o,n,e),Dn(o,2),Ri(o));break}}n=n.return}}function df(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Iv;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(ef=!0,u.add(a),e=Xv.bind(null,e,n,a),n.then(e,e))}function Xv(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Fe===e&&(Te&a)===a&&(Ye===4||Ye===3&&(Te&62914560)===Te&&300>dt()-sf?!(Xe&2)&&Qs(e,0):nf|=a,Ks===Te&&(Ks=0)),Ri(e)}function eg(e,n){n===0&&(n=Ae()),e=ca(e,n),e!==null&&(Dn(e,n),Ri(e))}function Wv(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),eg(e,a)}function qv(e,n){var a=0;switch(e.tag){case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),eg(e,a)}function Yv(e,n){return kt(e,n)}var Ol=null,tr=null,pf=!1,Pl=!1,mf=!1,rs=0;function Ri(e){e!==tr&&e.next===null&&(tr===null?Ol=tr=e:tr=tr.next=e),Pl=!0,pf||(pf=!0,Zv(jv))}function So(e,n){if(!mf&&Pl){mf=!0;do for(var a=!1,o=Ol;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var v=o.suspendedLanes,b=o.pingedLanes;f=(1<<31-$t(42|e)+1)-1,f&=u&~(v&~b),f=f&201326677?f&201326677|1:f?f|2:0}f!==0&&(a=!0,ag(o,f))}else f=Te,f=Ut(o,o===Fe?f:0),!(f&3)||ne(o,f)||(a=!0,ag(o,f));o=o.next}while(a);mf=!1}}function jv(){Pl=pf=!1;var e=0;rs!==0&&(ix()&&(e=rs),rs=0);for(var n=dt(),a=null,o=Ol;o!==null;){var u=o.next,f=ng(o,n);f===0?(o.next=null,a===null?Ol=u:a.next=u,u===null&&(tr=a)):(a=o,(e!==0||f&3)&&(Pl=!0)),o=u}So(e)}function ng(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var v=31-$t(f),b=1<<v,O=u[v];O===-1?(!(b&a)||b&o)&&(u[v]=Ve(b,n)):O<=n&&(e.expiredLanes|=b),f&=~b}if(n=Fe,a=Te,a=Ut(e,e===n?a:0),o=e.callbackNode,a===0||e===n&&He===2||e.cancelPendingCommit!==null)return o!==null&&o!==null&&U(o),e.callbackNode=null,e.callbackPriority=0;if(!(a&3)||ne(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&U(o),Rs(a)){case 2:case 8:a=Wt;break;case 32:a=wt;break;case 268435456:a=xe;break;default:a=wt}return o=ig.bind(null,e),a=kt(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&U(o),e.callbackPriority=2,e.callbackNode=null,2}function ig(e,n){var a=e.callbackNode;if($s()&&e.callbackNode!==a)return null;var o=Te;return o=Ut(e,e===Fe?o:0),o===0?null:(Xm(e,o,n),ng(e,dt()),e.callbackNode!=null&&e.callbackNode===a?ig.bind(null,e):null)}function ag(e,n){if($s())return null;Xm(e,n,!0)}function Zv(e){sx(function(){Xe&6?kt(pt,e):e()})}function gf(){return rs===0&&(rs=nn()),rs}function sg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Zo(""+e)}function rg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function Kv(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=sg((u[sn]||null).action),v=o.submitter;v&&(n=(n=v[sn]||null)?sg(n.formAction):v.getAttribute("formAction"),n!==null&&(f=n,v=null));var b=new $o("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(rs!==0){var O=v?rg(u,v):new FormData(u);Tc(a,{pending:!0,data:O,method:u.method,action:f},null,O)}}else typeof f=="function"&&(b.preventDefault(),O=v?rg(u,v):new FormData(u),Tc(a,{pending:!0,data:O,method:u.method,action:f},f,O))},currentTarget:u}]})}}for(var _f=0;_f<Jd.length;_f++){var vf=Jd[_f],Qv=vf.toLowerCase(),Jv=vf[0].toUpperCase()+vf.slice(1);hi(Qv,"on"+Jv)}hi(Yd,"onAnimationEnd"),hi(jd,"onAnimationIteration"),hi(Zd,"onAnimationStart"),hi("dblclick","onDoubleClick"),hi("focusin","onFocus"),hi("focusout","onBlur"),hi(mv,"onTransitionRun"),hi(gv,"onTransitionStart"),hi(_v,"onTransitionCancel"),hi(Kd,"onTransitionEnd"),Pt("onMouseEnter",["mouseout","mouseover"]),Pt("onMouseLeave",["mouseout","mouseover"]),Pt("onPointerEnter",["pointerout","pointerover"]),Pt("onPointerLeave",["pointerout","pointerover"]),Ct("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ct("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ct("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ct("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ct("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ct("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$v=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yo));function og(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var v=o.length-1;0<=v;v--){var b=o[v],O=b.instance,k=b.currentTarget;if(b=b.listener,O!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=k;try{f(u)}catch(ut){yl(ut)}u.currentTarget=null,f=O}else for(v=0;v<o.length;v++){if(b=o[v],O=b.instance,k=b.currentTarget,b=b.listener,O!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=k;try{f(u)}catch(ut){yl(ut)}u.currentTarget=null,f=O}}}}function Ee(e,n){var a=n[Cs];a===void 0&&(a=n[Cs]=new Set);var o=e+"__bubble";a.has(o)||(lg(n,e,2,!1),a.add(o))}function xf(e,n,a){var o=0;n&&(o|=4),lg(a,e,o,n)}var zl="_reactListening"+Math.random().toString(36).slice(2);function Sf(e){if(!e[zl]){e[zl]=!0,Z.forEach(function(a){a!=="selectionchange"&&($v.has(a)||xf(a,!1,e),xf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[zl]||(n[zl]=!0,xf("selectionchange",!1,n))}}function lg(e,n,a,o){switch(Ug(n)){case 2:var u=bx;break;case 8:u=Ax;break;default:u=Nf}a=u.bind(null,n,a,e),u=void 0,!Gu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function yf(e,n,a,o,u){var f=o;if(!(n&1)&&!(n&2)&&o!==null)t:for(;;){if(o===null)return;var v=o.tag;if(v===3||v===4){var b=o.stateNode.containerInfo;if(b===u||b.nodeType===8&&b.parentNode===u)break;if(v===4)for(v=o.return;v!==null;){var O=v.tag;if((O===3||O===4)&&(O=v.stateNode.containerInfo,O===u||O.nodeType===8&&O.parentNode===u))return;v=v.return}for(;b!==null;){if(v=Ni(b),v===null)return;if(O=v.tag,O===5||O===6||O===26||O===27){o=f=v;continue t}b=b.parentNode}}o=o.return}Ed(function(){var k=f,ut=Fu(a),St=[];t:{var it=Qd.get(e);if(it!==void 0){var lt=$o,Yt=e;switch(e){case"keypress":if(Qo(a)===0)break t;case"keydown":case"keyup":lt=q0;break;case"focusin":Yt="focus",lt=Wu;break;case"focusout":Yt="blur",lt=Wu;break;case"beforeblur":case"afterblur":lt=Wu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=Ad;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=O0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Z0;break;case Yd:case jd:case Zd:lt=B0;break;case Kd:lt=Q0;break;case"scroll":case"scrollend":lt=L0;break;case"wheel":lt=$0;break;case"copy":case"cut":case"paste":lt=F0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Cd;break;case"toggle":case"beforetoggle":lt=ev}var re=(n&4)!==0,je=!re&&(e==="scroll"||e==="scrollend"),K=re?it!==null?it+"Capture":null:it;re=[];for(var G=k,J;G!==null;){var mt=G;if(J=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||J===null||K===null||(mt=Fr(G,K),mt!=null&&re.push(Mo(G,mt,J))),je)break;G=G.return}0<re.length&&(it=new lt(it,Yt,null,a,ut),St.push({event:it,listeners:re}))}}if(!(n&7)){t:{if(it=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",it&&a!==Iu&&(Yt=a.relatedTarget||a.fromElement)&&(Ni(Yt)||Yt[Li]))break t;if((lt||it)&&(it=ut.window===ut?ut:(it=ut.ownerDocument)?it.defaultView||it.parentWindow:window,lt?(Yt=a.relatedTarget||a.toElement,lt=k,Yt=Yt?Ni(Yt):null,Yt!==null&&(je=j(Yt),re=Yt.tag,Yt!==je||re!==5&&re!==27&&re!==6)&&(Yt=null)):(lt=null,Yt=k),lt!==Yt)){if(re=Ad,mt="onMouseLeave",K="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(re=Cd,mt="onPointerLeave",K="onPointerEnter",G="pointer"),je=lt==null?it:q(lt),J=Yt==null?it:q(Yt),it=new re(mt,G+"leave",lt,a,ut),it.target=je,it.relatedTarget=J,mt=null,Ni(ut)===k&&(re=new re(K,G+"enter",Yt,a,ut),re.target=J,re.relatedTarget=je,mt=re),je=mt,lt&&Yt)e:{for(re=lt,K=Yt,G=0,J=re;J;J=er(J))G++;for(J=0,mt=K;mt;mt=er(mt))J++;for(;0<G-J;)re=er(re),G--;for(;0<J-G;)K=er(K),J--;for(;G--;){if(re===K||K!==null&&re===K.alternate)break e;re=er(re),K=er(K)}re=null}else re=null;lt!==null&&ug(St,it,lt,re,!1),Yt!==null&&je!==null&&ug(St,je,Yt,re,!0)}}t:{if(it=k?q(k):window,lt=it.nodeName&&it.nodeName.toLowerCase(),lt==="select"||lt==="input"&&it.type==="file")var Xt=zd;else if(Od(it))if(Bd)Xt=fv;else{Xt=uv;var pe=lv}else lt=it.nodeName,!lt||lt.toLowerCase()!=="input"||it.type!=="checkbox"&&it.type!=="radio"?k&&Bu(k.elementType)&&(Xt=zd):Xt=cv;if(Xt&&(Xt=Xt(e,k))){Pd(St,Xt,a,ut);break t}pe&&pe(e,it,k),e==="focusout"&&k&&it.type==="number"&&k.memoizedProps.value!=null&&En(it,"number",it.value)}switch(pe=k?q(k):window,e){case"focusin":(Od(pe)||pe.contentEditable==="true")&&(Ns=pe,Qu=k,Yr=null);break;case"focusout":Yr=Qu=Ns=null;break;case"mousedown":Ju=!0;break;case"contextmenu":case"mouseup":case"dragend":Ju=!1,Wd(St,a,ut);break;case"selectionchange":if(pv)break;case"keydown":case"keyup":Wd(St,a,ut)}var Zt;if(Yu)t:{switch(e){case"compositionstart":var ee="onCompositionStart";break t;case"compositionend":ee="onCompositionEnd";break t;case"compositionupdate":ee="onCompositionUpdate";break t}ee=void 0}else Ls?Ld(e,a)&&(ee="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ee="onCompositionStart");ee&&(Dd&&a.locale!=="ko"&&(Ls||ee!=="onCompositionStart"?ee==="onCompositionEnd"&&Ls&&(Zt=Td()):(ua=ut,Vu="value"in ua?ua.value:ua.textContent,Ls=!0)),pe=Bl(k,ee),0<pe.length&&(ee=new Rd(ee,e,null,a,ut),St.push({event:ee,listeners:pe}),Zt?ee.data=Zt:(Zt=Nd(a),Zt!==null&&(ee.data=Zt)))),(Zt=iv?av(e,a):sv(e,a))&&(ee=Bl(k,"onBeforeInput"),0<ee.length&&(pe=new Rd("onBeforeInput","beforeinput",null,a,ut),St.push({event:pe,listeners:ee}),pe.data=Zt)),Kv(St,e,k,a,ut)}og(St,n)})}function Mo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Bl(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Fr(e,a),u!=null&&o.unshift(Mo(e,u,f)),u=Fr(e,n),u!=null&&o.push(Mo(e,u,f))),e=e.return}return o}function er(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ug(e,n,a,o,u){for(var f=n._reactName,v=[];a!==null&&a!==o;){var b=a,O=b.alternate,k=b.stateNode;if(b=b.tag,O!==null&&O===o)break;b!==5&&b!==26&&b!==27||k===null||(O=k,u?(k=Fr(a,f),k!=null&&v.unshift(Mo(a,k,O))):u||(k=Fr(a,f),k!=null&&v.push(Mo(a,k,O)))),a=a.return}v.length!==0&&e.push({event:n,listeners:v})}var tx=/\r\n?/g,ex=/\u0000|\uFFFD/g;function cg(e){return(typeof e=="string"?e:""+e).replace(tx,`
`).replace(ex,"")}function fg(e,n){return n=cg(n),cg(e)===n}function Il(){}function Oe(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Bn(e,""+o);break;case"className":Ge(e,"class",o);break;case"tabIndex":Ge(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ge(e,a,o);break;case"style":yd(e,o,f);break;case"data":if(n!=="object"){Ge(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Zo(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Oe(e,n,"name",u.name,u,null),Oe(e,n,"formEncType",u.formEncType,u,null),Oe(e,n,"formMethod",u.formMethod,u,null),Oe(e,n,"formTarget",u.formTarget,u,null)):(Oe(e,n,"encType",u.encType,u,null),Oe(e,n,"method",u.method,u,null),Oe(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Zo(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Il);break;case"onScroll":o!=null&&Ee("scroll",e);break;case"onScrollEnd":o!=null&&Ee("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Zo(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":Ee("beforetoggle",e),Ee("toggle",e),ye(e,"popover",o);break;case"xlinkActuate":Re(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Re(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Re(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Re(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Re(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Re(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Re(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Re(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Re(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":ye(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=w0.get(a)||a,ye(e,a,o))}}function Mf(e,n,a,o,u,f){switch(a){case"style":yd(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&Bn(e,""+o);break;case"onScroll":o!=null&&Ee("scroll",e);break;case"onScrollEnd":o!=null&&Ee("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Il);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Et.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[sn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):ye(e,a,o)}}}function yn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ee("error",e),Ee("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var v=a[f];if(v!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Oe(e,n,f,v,a,null)}}u&&Oe(e,n,"srcSet",a.srcSet,a,null),o&&Oe(e,n,"src",a.src,a,null);return;case"input":Ee("invalid",e);var b=f=v=u=null,O=null,k=null;for(o in a)if(a.hasOwnProperty(o)){var ut=a[o];if(ut!=null)switch(o){case"name":u=ut;break;case"type":v=ut;break;case"checked":O=ut;break;case"defaultChecked":k=ut;break;case"value":f=ut;break;case"defaultValue":b=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:Oe(e,n,o,ut,a,null)}}Un(e,f,b,O,k,v,u,!1),Me(e);return;case"select":Ee("invalid",e),o=v=f=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":f=b;break;case"defaultValue":v=b;break;case"multiple":o=b;default:Oe(e,n,u,b,a,null)}n=f,a=v,e.multiple=!!o,n!=null?We(e,!!o,n,!1):a!=null&&We(e,!!o,a,!0);return;case"textarea":Ee("invalid",e),f=u=o=null;for(v in a)if(a.hasOwnProperty(v)&&(b=a[v],b!=null))switch(v){case"value":o=b;break;case"defaultValue":u=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:Oe(e,n,v,b,a,null)}Ds(e,o,u,f),Me(e);return;case"option":for(O in a)if(a.hasOwnProperty(O)&&(o=a[O],o!=null))switch(O){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Oe(e,n,O,o,a,null)}return;case"dialog":Ee("cancel",e),Ee("close",e);break;case"iframe":case"object":Ee("load",e);break;case"video":case"audio":for(o=0;o<yo.length;o++)Ee(yo[o],e);break;case"image":Ee("error",e),Ee("load",e);break;case"details":Ee("toggle",e);break;case"embed":case"source":case"link":Ee("error",e),Ee("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(k in a)if(a.hasOwnProperty(k)&&(o=a[k],o!=null))switch(k){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Oe(e,n,k,o,a,null)}return;default:if(Bu(n)){for(ut in a)a.hasOwnProperty(ut)&&(o=a[ut],o!==void 0&&Mf(e,n,ut,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&Oe(e,n,b,o,a,null))}function nx(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,v=null,b=null,O=null,k=null,ut=null;for(lt in a){var St=a[lt];if(a.hasOwnProperty(lt)&&St!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":O=St;default:o.hasOwnProperty(lt)||Oe(e,n,lt,null,o,St)}}for(var it in o){var lt=o[it];if(St=a[it],o.hasOwnProperty(it)&&(lt!=null||St!=null))switch(it){case"type":f=lt;break;case"name":u=lt;break;case"checked":k=lt;break;case"defaultChecked":ut=lt;break;case"value":v=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,n));break;default:lt!==St&&Oe(e,n,it,lt,o,St)}}Le(e,v,b,O,k,ut,f,u);return;case"select":lt=v=b=it=null;for(f in a)if(O=a[f],a.hasOwnProperty(f)&&O!=null)switch(f){case"value":break;case"multiple":lt=O;default:o.hasOwnProperty(f)||Oe(e,n,f,null,o,O)}for(u in o)if(f=o[u],O=a[u],o.hasOwnProperty(u)&&(f!=null||O!=null))switch(u){case"value":it=f;break;case"defaultValue":b=f;break;case"multiple":v=f;default:f!==O&&Oe(e,n,u,f,o,O)}n=b,a=v,o=lt,it!=null?We(e,!!a,it,!1):!!o!=!!a&&(n!=null?We(e,!!a,n,!0):We(e,!!a,a?[]:"",!1));return;case"textarea":lt=it=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Oe(e,n,b,null,o,u)}for(v in o)if(u=o[v],f=a[v],o.hasOwnProperty(v)&&(u!=null||f!=null))switch(v){case"value":it=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Oe(e,n,v,u,o,f)}vn(e,it,lt);return;case"option":for(var Yt in a)if(it=a[Yt],a.hasOwnProperty(Yt)&&it!=null&&!o.hasOwnProperty(Yt))switch(Yt){case"selected":e.selected=!1;break;default:Oe(e,n,Yt,null,o,it)}for(O in o)if(it=o[O],lt=a[O],o.hasOwnProperty(O)&&it!==lt&&(it!=null||lt!=null))switch(O){case"selected":e.selected=it&&typeof it!="function"&&typeof it!="symbol";break;default:Oe(e,n,O,it,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var re in a)it=a[re],a.hasOwnProperty(re)&&it!=null&&!o.hasOwnProperty(re)&&Oe(e,n,re,null,o,it);for(k in o)if(it=o[k],lt=a[k],o.hasOwnProperty(k)&&it!==lt&&(it!=null||lt!=null))switch(k){case"children":case"dangerouslySetInnerHTML":if(it!=null)throw Error(s(137,n));break;default:Oe(e,n,k,it,o,lt)}return;default:if(Bu(n)){for(var je in a)it=a[je],a.hasOwnProperty(je)&&it!==void 0&&!o.hasOwnProperty(je)&&Mf(e,n,je,void 0,o,it);for(ut in o)it=o[ut],lt=a[ut],!o.hasOwnProperty(ut)||it===lt||it===void 0&&lt===void 0||Mf(e,n,ut,it,o,lt);return}}for(var K in a)it=a[K],a.hasOwnProperty(K)&&it!=null&&!o.hasOwnProperty(K)&&Oe(e,n,K,null,o,it);for(St in o)it=o[St],lt=a[St],!o.hasOwnProperty(St)||it===lt||it==null&&lt==null||Oe(e,n,St,it,o,lt)}var Ef=null,Tf=null;function Fl(e){return e.nodeType===9?e:e.ownerDocument}function hg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function dg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function bf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Af=null;function ix(){var e=window.event;return e&&e.type==="popstate"?e===Af?!1:(Af=e,!0):(Af=null,!1)}var pg=typeof setTimeout=="function"?setTimeout:void 0,ax=typeof clearTimeout=="function"?clearTimeout:void 0,mg=typeof Promise=="function"?Promise:void 0,sx=typeof queueMicrotask=="function"?queueMicrotask:typeof mg<"u"?function(e){return mg.resolve(null).then(e).catch(rx)}:pg;function rx(e){setTimeout(function(){throw e})}function Rf(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"){if(o===0){e.removeChild(u),wo(n);return}o--}else a!=="$"&&a!=="$?"&&a!=="$!"||o++;a=u}while(a);wo(n)}function Cf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Cf(a),Ir(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function ox(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Ga])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=mi(e.nextSibling),e===null)break}return null}function lx(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=mi(e.nextSibling),e===null))return null;return e}function mi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="F!"||n==="F")break;if(n==="/$")return null}}return e}function gg(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(n===0)return e;n--}else a==="/$"&&n++}e=e.previousSibling}return null}function _g(e,n,a){switch(n=Fl(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}var li=new Map,vg=new Set;function Hl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.ownerDocument}var ji=Y.d;Y.d={f:ux,r:cx,D:fx,C:hx,L:dx,m:px,X:gx,S:mx,M:_x};function ux(){var e=ji.f(),n=Ll();return e||n}function cx(e){var n=A(e);n!==null&&n.tag===5&&n.type==="form"?Wp(n):ji.r(e)}var nr=typeof document>"u"?null:document;function xg(e,n,a){var o=nr;if(o&&typeof n=="string"&&n){var u=dn(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),vg.has(u)||(vg.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),yn(n,"link",e),Q(n),o.head.appendChild(n)))}}function fx(e){ji.D(e),xg("dns-prefetch",e,null)}function hx(e,n){ji.C(e,n),xg("preconnect",e,n)}function dx(e,n,a){ji.L(e,n,a);var o=nr;if(o&&e&&n){var u='link[rel="preload"][as="'+dn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+dn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+dn(a.imageSizes)+'"]')):u+='[href="'+dn(e)+'"]';var f=u;switch(n){case"style":f=ir(e);break;case"script":f=ar(e)}li.has(f)||(e=E({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),li.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Eo(f))||n==="script"&&o.querySelector(To(f))||(n=o.createElement("link"),yn(n,"link",e),Q(n),o.head.appendChild(n)))}}function px(e,n){ji.m(e,n);var a=nr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+dn(o)+'"][href="'+dn(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=ar(e)}if(!li.has(f)&&(e=E({rel:"modulepreload",href:e},n),li.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(To(f)))return}o=a.createElement("link"),yn(o,"link",e),Q(o),a.head.appendChild(o)}}}function mx(e,n,a){ji.S(e,n,a);var o=nr;if(o&&e){var u=$(o).hoistableStyles,f=ir(e);n=n||"default";var v=u.get(f);if(!v){var b={loading:0,preload:null};if(v=o.querySelector(Eo(f)))b.loading=5;else{e=E({rel:"stylesheet",href:e,"data-precedence":n},a),(a=li.get(f))&&Df(e,a);var O=v=o.createElement("link");Q(O),yn(O,"link",e),O._p=new Promise(function(k,ut){O.onload=k,O.onerror=ut}),O.addEventListener("load",function(){b.loading|=1}),O.addEventListener("error",function(){b.loading|=2}),b.loading|=4,Gl(v,n,o)}v={type:"stylesheet",instance:v,count:1,state:b},u.set(f,v)}}}function gx(e,n){ji.X(e,n);var a=nr;if(a&&e){var o=$(a).hoistableScripts,u=ar(e),f=o.get(u);f||(f=a.querySelector(To(u)),f||(e=E({src:e,async:!0},n),(n=li.get(u))&&wf(e,n),f=a.createElement("script"),Q(f),yn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function _x(e,n){ji.M(e,n);var a=nr;if(a&&e){var o=$(a).hoistableScripts,u=ar(e),f=o.get(u);f||(f=a.querySelector(To(u)),f||(e=E({src:e,async:!0,type:"module"},n),(n=li.get(u))&&wf(e,n),f=a.createElement("script"),Q(f),yn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function Sg(e,n,a,o){var u=(u=be.current)?Hl(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=ir(a.href),a=$(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=ir(a.href);var f=$(u).hoistableStyles,v=f.get(e);if(v||(u=u.ownerDocument||u,v={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,v),(f=u.querySelector(Eo(e)))&&!f._p&&(v.instance=f,v.state.loading=5),li.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},li.set(e,a),f||vx(u,e,a,v.state))),n&&o===null)throw Error(s(528,""));return v}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ar(a),a=$(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function ir(e){return'href="'+dn(e)+'"'}function Eo(e){return'link[rel="stylesheet"]['+e+"]"}function yg(e){return E({},e,{"data-precedence":e.precedence,precedence:null})}function vx(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),yn(n,"link",a),Q(n),e.head.appendChild(n))}function ar(e){return'[src="'+dn(e)+'"]'}function To(e){return"script[async]"+e}function Mg(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+dn(a.href)+'"]');if(o)return n.instance=o,Q(o),o;var u=E({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Q(o),yn(o,"style",u),Gl(o,a.precedence,e),n.instance=o;case"stylesheet":u=ir(a.href);var f=e.querySelector(Eo(u));if(f)return n.state.loading|=4,n.instance=f,Q(f),f;o=yg(a),(u=li.get(u))&&Df(o,u),f=(e.ownerDocument||e).createElement("link"),Q(f);var v=f;return v._p=new Promise(function(b,O){v.onload=b,v.onerror=O}),yn(f,"link",o),n.state.loading|=4,Gl(f,a.precedence,e),n.instance=f;case"script":return f=ar(a.src),(u=e.querySelector(To(f)))?(n.instance=u,Q(u),u):(o=a,(u=li.get(f))&&(o=E({},a),wf(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Q(u),yn(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&!(n.state.loading&4)&&(o=n.instance,n.state.loading|=4,Gl(o,a.precedence,e));return n.instance}function Gl(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,v=0;v<o.length;v++){var b=o[v];if(b.dataset.precedence===n)f=b;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Df(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function wf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Vl=null;function Eg(e,n,a){if(Vl===null){var o=new Map,u=Vl=new Map;u.set(a,o)}else u=Vl,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[Ga]||f[an]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var v=f.getAttribute(n)||"";v=e+v;var b=o.get(v);b?b.push(f):o.set(v,[f])}}return o}function Tg(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function xx(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function bg(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}var bo=null;function Sx(){}function yx(e,n,a){if(bo===null)throw Error(s(475));var o=bo;if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var u=ir(a.href),f=e.querySelector(Eo(u));if(f){e=f._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(o.count++,o=kl.bind(o),e.then(o,o)),n.state.loading|=4,n.instance=f,Q(f);return}f=e.ownerDocument||e,a=yg(a),(u=li.get(u))&&Df(a,u),f=f.createElement("link"),Q(f);var v=f;v._p=new Promise(function(b,O){v.onload=b,v.onerror=O}),yn(f,"link",a),n.instance=f}o.stylesheets===null&&(o.stylesheets=new Map),o.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(o.count++,n=kl.bind(o),e.addEventListener("load",n),e.addEventListener("error",n))}}function Mx(){if(bo===null)throw Error(s(475));var e=bo;return e.stylesheets&&e.count===0&&Uf(e,e.stylesheets),0<e.count?function(n){var a=setTimeout(function(){if(e.stylesheets&&Uf(e,e.stylesheets),e.unsuspend){var o=e.unsuspend;e.unsuspend=null,o()}},6e4);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a)}}:null}function kl(){if(this.count--,this.count===0){if(this.stylesheets)Uf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Xl=null;function Uf(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Xl=new Map,n.forEach(Ex,e),Xl=null,kl.call(e))}function Ex(e,n){if(!(n.state.loading&4)){var a=Xl.get(e);if(a)var o=a.get(null);else{a=new Map,Xl.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var v=u[f];(v.nodeName==="LINK"||v.getAttribute("media")!=="not all")&&(a.set(v.dataset.precedence,v),o=v)}o&&a.set(null,o)}u=n.instance,v=u.getAttribute("data-precedence"),f=a.get(v)||o,f===o&&a.set(null,u),a.set(v,u),this.count++,o=kl.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Ao={$$typeof:M,Provider:null,Consumer:null,_currentValue:ht,_currentValue2:ht,_threadCount:0};function Tx(e,n,a,o,u,f,v,b){this.tag=1,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Cn(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cn(0),this.hiddenUpdates=Cn(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=v,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=b,this.incompleteTransitions=new Map}function Ag(e,n,a,o,u,f,v,b,O,k,ut,St){return e=new Tx(e,n,a,v,b,O,k,St),n=1,f===!0&&(n|=24),f=ri(3,null,null,n),e.current=f,f.stateNode=e,n=lc(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Vc(f),e}function Rg(e){return e?(e=zs,e):zs}function Cg(e,n,a,o,u,f){u=Rg(u),o.context===null?o.context=u:o.pendingContext=u,o=_a(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=va(e,o,n),a!==null&&(Nn(a,e,n),lo(a,e,n))}function Dg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Lf(e,n){Dg(e,n),(e=e.alternate)&&Dg(e,n)}function wg(e){if(e.tag===13){var n=ca(e,67108864);n!==null&&Nn(n,e,67108864),Lf(e,67108864)}}var Wl=!0;function bx(e,n,a,o){var u=R.T;R.T=null;var f=Y.p;try{Y.p=2,Nf(e,n,a,o)}finally{Y.p=f,R.T=u}}function Ax(e,n,a,o){var u=R.T;R.T=null;var f=Y.p;try{Y.p=8,Nf(e,n,a,o)}finally{Y.p=f,R.T=u}}function Nf(e,n,a,o){if(Wl){var u=Of(o);if(u===null)yf(e,n,o,ql,a),Lg(e,o);else if(Cx(u,e,n,a,o))o.stopPropagation();else if(Lg(e,o),n&4&&-1<Rx.indexOf(e)){for(;u!==null;){var f=A(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var v=Dt(f.pendingLanes);if(v!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;v;){var O=1<<31-$t(v);b.entanglements[1]|=O,v&=~O}Ri(f),!(Xe&6)&&(Dl=dt()+500,So(0))}}break;case 13:b=ca(f,2),b!==null&&Nn(b,f,2),Ll(),Lf(f,2)}if(f=Of(o),f===null&&yf(e,n,o,ql,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else yf(e,n,o,null,a)}}function Of(e){return e=Fu(e),Pf(e)}var ql=null;function Pf(e){if(ql=null,e=Ni(e),e!==null){var n=j(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=yt(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return ql=e,null}function Ug(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case pt:return 2;case Wt:return 8;case wt:case Ft:return 32;case xe:return 268435456;default:return 32}default:return 32}}var zf=!1,ba=null,Aa=null,Ra=null,Ro=new Map,Co=new Map,Ca=[],Rx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Lg(e,n){switch(e){case"focusin":case"focusout":ba=null;break;case"dragenter":case"dragleave":Aa=null;break;case"mouseover":case"mouseout":Ra=null;break;case"pointerover":case"pointerout":Ro.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Co.delete(n.pointerId)}}function Do(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=A(n),n!==null&&wg(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function Cx(e,n,a,o,u){switch(n){case"focusin":return ba=Do(ba,e,n,a,o,u),!0;case"dragenter":return Aa=Do(Aa,e,n,a,o,u),!0;case"mouseover":return Ra=Do(Ra,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return Ro.set(f,Do(Ro.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Co.set(f,Do(Co.get(f)||null,e,n,a,o,u)),!0}return!1}function Ng(e){var n=Ni(e.target);if(n!==null){var a=j(n);if(a!==null){if(n=a.tag,n===13){if(n=yt(a),n!==null){e.blockedOn=n,Yo(e.priority,function(){if(a.tag===13){var o=jn(),u=ca(a,o);u!==null&&Nn(u,a,o),Lf(a,o)}});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Yl(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Of(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Iu=o,a.target.dispatchEvent(o),Iu=null}else return n=A(a),n!==null&&wg(n),e.blockedOn=a,!1;n.shift()}return!0}function Og(e,n,a){Yl(e)&&a.delete(n)}function Dx(){zf=!1,ba!==null&&Yl(ba)&&(ba=null),Aa!==null&&Yl(Aa)&&(Aa=null),Ra!==null&&Yl(Ra)&&(Ra=null),Ro.forEach(Og),Co.forEach(Og)}function jl(e,n){e.blockedOn===n&&(e.blockedOn=null,zf||(zf=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Dx)))}var Zl=null;function Pg(e){Zl!==e&&(Zl=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Zl===e&&(Zl=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(Pf(o||a)===null)continue;break}var f=A(a);f!==null&&(e.splice(n,3),n-=3,Tc(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function wo(e){function n(O){return jl(O,e)}ba!==null&&jl(ba,e),Aa!==null&&jl(Aa,e),Ra!==null&&jl(Ra,e),Ro.forEach(n),Co.forEach(n);for(var a=0;a<Ca.length;a++){var o=Ca[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Ca.length&&(a=Ca[0],a.blockedOn===null);)Ng(a),a.blockedOn===null&&Ca.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],v=u[sn]||null;if(typeof f=="function")v||Pg(a);else if(v){var b=null;if(f&&f.hasAttribute("formAction")){if(u=f,v=f[sn]||null)b=v.formAction;else if(Pf(u)!==null)continue}else b=v.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),Pg(a)}}}function Bf(e){this._internalRoot=e}Kl.prototype.render=Bf.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=jn();Cg(a,o,e,n,null,null)},Kl.prototype.unmount=Bf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;e.tag===0&&$s(),Cg(e.current,2,null,e,null,null),Ll(),n[Li]=null}};function Kl(e){this._internalRoot=e}Kl.prototype.unstable_scheduleHydration=function(e){if(e){var n=Br();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Ca.length&&n!==0&&n<Ca[a].priority;a++);Ca.splice(a,0,e),a===0&&Ng(e)}};var zg=t.version;if(zg!=="19.0.0")throw Error(s(527,zg,"19.0.0"));Y.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=nt(n),e=e!==null?Tt(e):null,e=e===null?null:e.stateNode,e};var wx={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:R,findFiberByHostInstance:Ni,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ql=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ql.isDisabled&&Ql.supportsFiber)try{Qt=Ql.inject(wx),qt=Ql}catch{}}return Lo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=$p,f=tm,v=em,b=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(v=n.onRecoverableError),n.unstable_transitionCallbacks!==void 0&&(b=n.unstable_transitionCallbacks)),n=Ag(e,1,!1,null,null,a,o,u,f,v,b,null),e[Li]=n.current,Sf(e.nodeType===8?e.parentNode:e),new Bf(n)},Lo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",f=$p,v=tm,b=em,O=null,k=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(v=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(O=a.unstable_transitionCallbacks),a.formState!==void 0&&(k=a.formState)),n=Ag(e,1,!0,n,a??null,o,u,f,v,b,O,k),n.context=Rg(null),a=n.current,o=jn(),u=_a(o),u.callback=null,va(a,u,o),n.current.lanes=o,Dn(n,o),Ri(n),e[Li]=n.current,Sf(e),new Kl(n)},Lo.version="19.0.0",Lo}var qg;function Hx(){if(qg)return Hf.exports;qg=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Hf.exports=Fx(),Hf.exports}var Gx=Hx();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const od="172",Er={ROTATE:0,DOLLY:1,PAN:2},yr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vx=0,Yg=1,kx=2,Y_=1,Xx=2,ta=3,Ha=0,Gn=1,ea=2,Fa=0,Tr=1,jg=2,Zg=3,Kg=4,Wx=5,ms=100,qx=101,Yx=102,jx=103,Zx=104,Kx=200,Qx=201,Jx=202,$x=203,xh=204,Sh=205,tS=206,eS=207,nS=208,iS=209,aS=210,sS=211,rS=212,oS=213,lS=214,yh=0,Mh=1,Eh=2,Rr=3,Th=4,bh=5,Ah=6,Rh=7,j_=0,uS=1,cS=2,aa=0,fS=1,hS=2,dS=3,pS=4,mS=5,gS=6,_S=7,Z_=300,Cr=301,Dr=302,Ch=303,Dh=304,Lu=306,wh=1e3,_s=1001,Uh=1002,yi=1003,vS=1004,Jl=1005,Di=1006,Xf=1007,vs=1008,ra=1009,K_=1010,Q_=1011,Ho=1012,ld=1013,Ms=1014,na=1015,Vo=1016,ud=1017,cd=1018,wr=1020,J_=35902,$_=1021,t0=1022,Si=1023,e0=1024,n0=1025,br=1026,Ur=1027,i0=1028,fd=1029,a0=1030,hd=1031,dd=1033,yu=33776,Mu=33777,Eu=33778,Tu=33779,Lh=35840,Nh=35841,Oh=35842,Ph=35843,zh=36196,Bh=37492,Ih=37496,Fh=37808,Hh=37809,Gh=37810,Vh=37811,kh=37812,Xh=37813,Wh=37814,qh=37815,Yh=37816,jh=37817,Zh=37818,Kh=37819,Qh=37820,Jh=37821,bu=36492,$h=36494,td=36495,s0=36283,ed=36284,nd=36285,id=36286,xS=3200,SS=3201,yS=0,MS=1,Ia="",Qn="srgb",Lr="srgb-linear",Cu="linear",Pe="srgb",sr=7680,Qg=519,ES=512,TS=513,bS=514,r0=515,AS=516,RS=517,CS=518,DS=519,Jg=35044,$g="300 es",ia=2e3,Du=2001;class bs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let t_=1234567;const Io=Math.PI/180,Go=180/Math.PI;function Or(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(An[r&255]+An[r>>8&255]+An[r>>16&255]+An[r>>24&255]+"-"+An[t&255]+An[t>>8&255]+"-"+An[t>>16&15|64]+An[t>>24&255]+"-"+An[i&63|128]+An[i>>8&255]+"-"+An[i>>16&255]+An[i>>24&255]+An[s&255]+An[s>>8&255]+An[s>>16&255]+An[s>>24&255]).toLowerCase()}function me(r,t,i){return Math.max(t,Math.min(i,r))}function pd(r,t){return(r%t+t)%t}function wS(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function US(r,t,i){return r!==t?(i-r)/(t-r):0}function Fo(r,t,i){return(1-i)*r+i*t}function LS(r,t,i,s){return Fo(r,t,1-Math.exp(-i*s))}function NS(r,t=1){return t-Math.abs(pd(r,t*2)-t)}function OS(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function PS(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function zS(r,t){return r+Math.floor(Math.random()*(t-r+1))}function BS(r,t){return r+Math.random()*(t-r)}function IS(r){return r*(.5-Math.random())}function FS(r){r!==void 0&&(t_=r);let t=t_+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function HS(r){return r*Io}function GS(r){return r*Go}function VS(r){return(r&r-1)===0&&r!==0}function kS(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function XS(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function WS(r,t,i,s,l){const c=Math.cos,h=Math.sin,d=c(i/2),m=h(i/2),p=c((t+s)/2),g=h((t+s)/2),x=c((t-s)/2),S=h((t-s)/2),M=c((s-t)/2),C=h((s-t)/2);switch(l){case"XYX":r.set(d*g,m*x,m*S,d*p);break;case"YZY":r.set(m*S,d*g,m*x,d*p);break;case"ZXZ":r.set(m*x,m*S,d*g,d*p);break;case"XZX":r.set(d*g,m*C,m*M,d*p);break;case"YXY":r.set(m*M,d*g,m*C,d*p);break;case"ZYZ":r.set(m*C,m*M,d*g,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function xr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function On(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ds={DEG2RAD:Io,RAD2DEG:Go,generateUUID:Or,clamp:me,euclideanModulo:pd,mapLinear:wS,inverseLerp:US,lerp:Fo,damp:LS,pingpong:NS,smoothstep:OS,smootherstep:PS,randInt:zS,randFloat:BS,randFloatSpread:IS,seededRandom:FS,degToRad:HS,radToDeg:GS,isPowerOfTwo:VS,ceilPowerOfTwo:kS,floorPowerOfTwo:XS,setQuaternionFromProperEuler:WS,normalize:On,denormalize:xr};class he{constructor(t=0,i=0){he.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(me(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(me(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,i,s,l,c,h,d,m,p){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p)}set(t,i,s,l,c,h,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=m,g[6]=s,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],g=s[4],x=s[7],S=s[2],M=s[5],C=s[8],D=l[0],y=l[3],_=l[6],I=l[1],z=l[4],N=l[7],V=l[2],H=l[5],L=l[8];return c[0]=h*D+d*I+m*V,c[3]=h*y+d*z+m*H,c[6]=h*_+d*N+m*L,c[1]=p*D+g*I+x*V,c[4]=p*y+g*z+x*H,c[7]=p*_+g*N+x*L,c[2]=S*D+M*I+C*V,c[5]=S*y+M*z+C*H,c[8]=S*_+M*N+C*L,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return i*h*g-i*d*p-s*c*g+s*d*m+l*c*p-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],x=g*h-d*p,S=d*m-g*c,M=p*c-h*m,C=i*x+s*S+l*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/C;return t[0]=x*D,t[1]=(l*p-g*s)*D,t[2]=(d*s-l*h)*D,t[3]=S*D,t[4]=(g*i-l*m)*D,t[5]=(l*c-d*i)*D,t[6]=M*D,t[7]=(s*m-p*i)*D,t[8]=(h*i-s*c)*D,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(Wf.makeScale(t,i)),this}rotate(t){return this.premultiply(Wf.makeRotation(-t)),this}translate(t,i){return this.premultiply(Wf.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wf=new ce;function o0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function wu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function qS(){const r=wu("canvas");return r.style.display="block",r}const e_={};function Sr(r){r in e_||(e_[r]=!0,console.warn(r))}function YS(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function jS(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ZS(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const n_=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),i_=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function KS(){const r={enabled:!0,workingColorSpace:Lr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Pe&&(l.r=sa(l.r),l.g=sa(l.g),l.b=sa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Pe&&(l.r=Ar(l.r),l.g=Ar(l.g),l.b=Ar(l.b))),l},fromWorkingColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},toWorkingColorSpace:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ia?Cu:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Lr]:{primaries:t,whitePoint:s,transfer:Cu,toXYZ:n_,fromXYZ:i_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Qn},outputColorSpaceConfig:{drawingBufferColorSpace:Qn}},[Qn]:{primaries:t,whitePoint:s,transfer:Pe,toXYZ:n_,fromXYZ:i_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Qn}}}),r}const we=KS();function sa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ar(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let rr;class QS{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{rr===void 0&&(rr=wu("canvas")),rr.width=t.width,rr.height=t.height;const s=rr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=rr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=wu("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=sa(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(sa(i[s]/255)*255):i[s]=sa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let JS=0;class l0{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=Or(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(qf(l[h].image)):c.push(qf(l[h]))}else c=qf(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function qf(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?QS.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $S=0;class Vn extends bs{constructor(t=Vn.DEFAULT_IMAGE,i=Vn.DEFAULT_MAPPING,s=_s,l=_s,c=Di,h=vs,d=Si,m=ra,p=Vn.DEFAULT_ANISOTROPY,g=Ia){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$S++}),this.uuid=Or(),this.name="",this.source=new l0(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Z_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wh:t.x=t.x-Math.floor(t.x);break;case _s:t.x=t.x<0?0:1;break;case Uh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wh:t.y=t.y-Math.floor(t.y);break;case _s:t.y=t.y<0?0:1;break;case Uh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=Z_;Vn.DEFAULT_ANISOTROPY=1;class Ke{constructor(t=0,i=0,s=0,l=1){Ke.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,p=m[0],g=m[4],x=m[8],S=m[1],M=m[5],C=m[9],D=m[2],y=m[6],_=m[10];if(Math.abs(g-S)<.01&&Math.abs(x-D)<.01&&Math.abs(C-y)<.01){if(Math.abs(g+S)<.1&&Math.abs(x+D)<.1&&Math.abs(C+y)<.1&&Math.abs(p+M+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(p+1)/2,N=(M+1)/2,V=(_+1)/2,H=(g+S)/4,L=(x+D)/4,B=(C+y)/4;return z>N&&z>V?z<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(z),l=H/s,c=L/s):N>V?N<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(N),s=H/l,c=B/l):V<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(V),s=L/c,l=B/c),this.set(s,l,c,i),this}let I=Math.sqrt((y-C)*(y-C)+(x-D)*(x-D)+(S-g)*(S-g));return Math.abs(I)<.001&&(I=1),this.x=(y-C)/I,this.y=(x-D)/I,this.z=(S-g)/I,this.w=Math.acos((p+M+_-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this.w=me(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this.w=me(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(me(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ty extends bs{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new Ke(0,0,t,i),this.scissorTest=!1,this.viewport=new Ke(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new Vn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;const i=Object.assign({},t.texture.image);return this.texture.source=new l0(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Es extends ty{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class u0 extends Vn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=yi,this.minFilter=yi,this.wrapR=_s,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ey extends Vn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=yi,this.minFilter=yi,this.wrapR=_s,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ts{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,d){let m=s[l+0],p=s[l+1],g=s[l+2],x=s[l+3];const S=c[h+0],M=c[h+1],C=c[h+2],D=c[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=g,t[i+3]=x;return}if(d===1){t[i+0]=S,t[i+1]=M,t[i+2]=C,t[i+3]=D;return}if(x!==D||m!==S||p!==M||g!==C){let y=1-d;const _=m*S+p*M+g*C+x*D,I=_>=0?1:-1,z=1-_*_;if(z>Number.EPSILON){const V=Math.sqrt(z),H=Math.atan2(V,_*I);y=Math.sin(y*H)/V,d=Math.sin(d*H)/V}const N=d*I;if(m=m*y+S*N,p=p*y+M*N,g=g*y+C*N,x=x*y+D*N,y===1-d){const V=1/Math.sqrt(m*m+p*p+g*g+x*x);m*=V,p*=V,g*=V,x*=V}}t[i]=m,t[i+1]=p,t[i+2]=g,t[i+3]=x}static multiplyQuaternionsFlat(t,i,s,l,c,h){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],x=c[h],S=c[h+1],M=c[h+2],C=c[h+3];return t[i]=d*C+g*x+m*M-p*S,t[i+1]=m*C+g*S+p*x-d*M,t[i+2]=p*C+g*M+d*S-m*x,t[i+3]=g*C-d*x-m*S-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),x=d(c/2),S=m(s/2),M=m(l/2),C=m(c/2);switch(h){case"XYZ":this._x=S*g*x+p*M*C,this._y=p*M*x-S*g*C,this._z=p*g*C+S*M*x,this._w=p*g*x-S*M*C;break;case"YXZ":this._x=S*g*x+p*M*C,this._y=p*M*x-S*g*C,this._z=p*g*C-S*M*x,this._w=p*g*x+S*M*C;break;case"ZXY":this._x=S*g*x-p*M*C,this._y=p*M*x+S*g*C,this._z=p*g*C+S*M*x,this._w=p*g*x-S*M*C;break;case"ZYX":this._x=S*g*x-p*M*C,this._y=p*M*x+S*g*C,this._z=p*g*C-S*M*x,this._w=p*g*x+S*M*C;break;case"YZX":this._x=S*g*x+p*M*C,this._y=p*M*x+S*g*C,this._z=p*g*C-S*M*x,this._w=p*g*x-S*M*C;break;case"XZY":this._x=S*g*x-p*M*C,this._y=p*M*x-S*g*C,this._z=p*g*C+S*M*x,this._w=p*g*x+S*M*C;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],g=i[6],x=i[10],S=s+d+x;if(S>0){const M=.5/Math.sqrt(S+1);this._w=.25/M,this._x=(g-m)*M,this._y=(c-p)*M,this._z=(h-l)*M}else if(s>d&&s>x){const M=2*Math.sqrt(1+s-d-x);this._w=(g-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(c+p)/M}else if(d>x){const M=2*Math.sqrt(1+d-s-x);this._w=(c-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+x-s-d);this._w=(h-l)/M,this._x=(c+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=s*g+h*d+l*p-c*m,this._y=l*g+h*m+c*d-s*p,this._z=c*g+h*p+s*m-l*d,this._w=h*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*c+i*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),x=Math.sin((1-i)*g)/p,S=Math.sin(i*g)/p;return this._w=h*x+this._w*S,this._x=s*x+this._x*S,this._y=l*x+this._y*S,this._z=c*x+this._z*S,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class et{constructor(t=0,i=0,s=0){et.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(a_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(a_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*s),g=2*(d*i-c*l),x=2*(c*s-h*i);return this.x=i+m*p+h*x-d*g,this.y=s+m*g+d*p-c*x,this.z=l+m*x+c*g-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(me(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-s*m,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Yf.copy(this).projectOnVector(t),this.sub(Yf)}reflect(t){return this.sub(Yf.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(me(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yf=new et,a_=new Ts;class ko{constructor(t=new et(1/0,1/0,1/0),i=new et(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(gi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(gi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=gi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,gi):gi.fromBufferAttribute(c,h),gi.applyMatrix4(t.matrixWorld),this.expandByPoint(gi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$l.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),$l.copy(s.boundingBox)),$l.applyMatrix4(t.matrixWorld),this.union($l)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gi),gi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(No),tu.subVectors(this.max,No),or.subVectors(t.a,No),lr.subVectors(t.b,No),ur.subVectors(t.c,No),wa.subVectors(lr,or),Ua.subVectors(ur,lr),os.subVectors(or,ur);let i=[0,-wa.z,wa.y,0,-Ua.z,Ua.y,0,-os.z,os.y,wa.z,0,-wa.x,Ua.z,0,-Ua.x,os.z,0,-os.x,-wa.y,wa.x,0,-Ua.y,Ua.x,0,-os.y,os.x,0];return!jf(i,or,lr,ur,tu)||(i=[1,0,0,0,1,0,0,0,1],!jf(i,or,lr,ur,tu))?!1:(eu.crossVectors(wa,Ua),i=[eu.x,eu.y,eu.z],jf(i,or,lr,ur,tu))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Zi=[new et,new et,new et,new et,new et,new et,new et,new et],gi=new et,$l=new ko,or=new et,lr=new et,ur=new et,wa=new et,Ua=new et,os=new et,No=new et,tu=new et,eu=new et,ls=new et;function jf(r,t,i,s,l){for(let c=0,h=r.length-3;c<=h;c+=3){ls.fromArray(r,c);const d=l.x*Math.abs(ls.x)+l.y*Math.abs(ls.y)+l.z*Math.abs(ls.z),m=t.dot(ls),p=i.dot(ls),g=s.dot(ls);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const ny=new ko,Oo=new et,Zf=new et;class md{constructor(t=new et,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):ny.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Oo.subVectors(t,this.center);const i=Oo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Oo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zf.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Oo.copy(t.center).add(Zf)),this.expandByPoint(Oo.copy(t.center).sub(Zf))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ki=new et,Kf=new et,nu=new et,La=new et,Qf=new et,iu=new et,Jf=new et;class c0{constructor(t=new et,i=new et(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ki)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Ki.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Ki.copy(this.origin).addScaledVector(this.direction,i),Ki.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Kf.copy(t).add(i).multiplyScalar(.5),nu.copy(i).sub(t).normalize(),La.copy(this.origin).sub(Kf);const c=t.distanceTo(i)*.5,h=-this.direction.dot(nu),d=La.dot(this.direction),m=-La.dot(nu),p=La.lengthSq(),g=Math.abs(1-h*h);let x,S,M,C;if(g>0)if(x=h*m-d,S=h*d-m,C=c*g,x>=0)if(S>=-C)if(S<=C){const D=1/g;x*=D,S*=D,M=x*(x+h*S+2*d)+S*(h*x+S+2*m)+p}else S=c,x=Math.max(0,-(h*S+d)),M=-x*x+S*(S+2*m)+p;else S=-c,x=Math.max(0,-(h*S+d)),M=-x*x+S*(S+2*m)+p;else S<=-C?(x=Math.max(0,-(-h*c+d)),S=x>0?-c:Math.min(Math.max(-c,-m),c),M=-x*x+S*(S+2*m)+p):S<=C?(x=0,S=Math.min(Math.max(-c,-m),c),M=S*(S+2*m)+p):(x=Math.max(0,-(h*c+d)),S=x>0?c:Math.min(Math.max(-c,-m),c),M=-x*x+S*(S+2*m)+p);else S=h>0?-c:c,x=Math.max(0,-(h*S+d)),M=-x*x+S*(S+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(Kf).addScaledVector(nu,S),M}intersectSphere(t,i){Ki.subVectors(t.center,this.origin);const s=Ki.dot(this.direction),l=Ki.dot(Ki)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,d,m;const p=1/this.direction.x,g=1/this.direction.y,x=1/this.direction.z,S=this.origin;return p>=0?(s=(t.min.x-S.x)*p,l=(t.max.x-S.x)*p):(s=(t.max.x-S.x)*p,l=(t.min.x-S.x)*p),g>=0?(c=(t.min.y-S.y)*g,h=(t.max.y-S.y)*g):(c=(t.max.y-S.y)*g,h=(t.min.y-S.y)*g),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),x>=0?(d=(t.min.z-S.z)*x,m=(t.max.z-S.z)*x):(d=(t.max.z-S.z)*x,m=(t.min.z-S.z)*x),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,Ki)!==null}intersectTriangle(t,i,s,l,c){Qf.subVectors(i,t),iu.subVectors(s,t),Jf.crossVectors(Qf,iu);let h=this.direction.dot(Jf),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;La.subVectors(this.origin,t);const m=d*this.direction.dot(iu.crossVectors(La,iu));if(m<0)return null;const p=d*this.direction.dot(Qf.cross(La));if(p<0||m+p>h)return null;const g=-d*La.dot(Jf);return g<0?null:this.at(g/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class en{constructor(t,i,s,l,c,h,d,m,p,g,x,S,M,C,D,y){en.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p,g,x,S,M,C,D,y)}set(t,i,s,l,c,h,d,m,p,g,x,S,M,C,D,y){const _=this.elements;return _[0]=t,_[4]=i,_[8]=s,_[12]=l,_[1]=c,_[5]=h,_[9]=d,_[13]=m,_[2]=p,_[6]=g,_[10]=x,_[14]=S,_[3]=M,_[7]=C,_[11]=D,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new en().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/cr.setFromMatrixColumn(t,0).length(),c=1/cr.setFromMatrixColumn(t,1).length(),h=1/cr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),x=Math.sin(c);if(t.order==="XYZ"){const S=h*g,M=h*x,C=d*g,D=d*x;i[0]=m*g,i[4]=-m*x,i[8]=p,i[1]=M+C*p,i[5]=S-D*p,i[9]=-d*m,i[2]=D-S*p,i[6]=C+M*p,i[10]=h*m}else if(t.order==="YXZ"){const S=m*g,M=m*x,C=p*g,D=p*x;i[0]=S+D*d,i[4]=C*d-M,i[8]=h*p,i[1]=h*x,i[5]=h*g,i[9]=-d,i[2]=M*d-C,i[6]=D+S*d,i[10]=h*m}else if(t.order==="ZXY"){const S=m*g,M=m*x,C=p*g,D=p*x;i[0]=S-D*d,i[4]=-h*x,i[8]=C+M*d,i[1]=M+C*d,i[5]=h*g,i[9]=D-S*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const S=h*g,M=h*x,C=d*g,D=d*x;i[0]=m*g,i[4]=C*p-M,i[8]=S*p+D,i[1]=m*x,i[5]=D*p+S,i[9]=M*p-C,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const S=h*m,M=h*p,C=d*m,D=d*p;i[0]=m*g,i[4]=D-S*x,i[8]=C*x+M,i[1]=x,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=M*x+C,i[10]=S-D*x}else if(t.order==="XZY"){const S=h*m,M=h*p,C=d*m,D=d*p;i[0]=m*g,i[4]=-x,i[8]=p*g,i[1]=S*x+D,i[5]=h*g,i[9]=M*x-C,i[2]=C*x-M,i[6]=d*g,i[10]=D*x+S}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(iy,t,ay)}lookAt(t,i,s){const l=this.elements;return Zn.subVectors(t,i),Zn.lengthSq()===0&&(Zn.z=1),Zn.normalize(),Na.crossVectors(s,Zn),Na.lengthSq()===0&&(Math.abs(s.z)===1?Zn.x+=1e-4:Zn.z+=1e-4,Zn.normalize(),Na.crossVectors(s,Zn)),Na.normalize(),au.crossVectors(Zn,Na),l[0]=Na.x,l[4]=au.x,l[8]=Zn.x,l[1]=Na.y,l[5]=au.y,l[9]=Zn.y,l[2]=Na.z,l[6]=au.z,l[10]=Zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],g=s[1],x=s[5],S=s[9],M=s[13],C=s[2],D=s[6],y=s[10],_=s[14],I=s[3],z=s[7],N=s[11],V=s[15],H=l[0],L=l[4],B=l[8],R=l[12],E=l[1],P=l[5],ot=l[9],at=l[13],ct=l[2],ft=l[6],X=l[10],st=l[14],j=l[3],yt=l[7],w=l[11],nt=l[15];return c[0]=h*H+d*E+m*ct+p*j,c[4]=h*L+d*P+m*ft+p*yt,c[8]=h*B+d*ot+m*X+p*w,c[12]=h*R+d*at+m*st+p*nt,c[1]=g*H+x*E+S*ct+M*j,c[5]=g*L+x*P+S*ft+M*yt,c[9]=g*B+x*ot+S*X+M*w,c[13]=g*R+x*at+S*st+M*nt,c[2]=C*H+D*E+y*ct+_*j,c[6]=C*L+D*P+y*ft+_*yt,c[10]=C*B+D*ot+y*X+_*w,c[14]=C*R+D*at+y*st+_*nt,c[3]=I*H+z*E+N*ct+V*j,c[7]=I*L+z*P+N*ft+V*yt,c[11]=I*B+z*ot+N*X+V*w,c[15]=I*R+z*at+N*st+V*nt,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],d=t[5],m=t[9],p=t[13],g=t[2],x=t[6],S=t[10],M=t[14],C=t[3],D=t[7],y=t[11],_=t[15];return C*(+c*m*x-l*p*x-c*d*S+s*p*S+l*d*M-s*m*M)+D*(+i*m*M-i*p*S+c*h*S-l*h*M+l*p*g-c*m*g)+y*(+i*p*x-i*d*M-c*h*x+s*h*M+c*d*g-s*p*g)+_*(-l*d*g-i*m*x+i*d*S+l*h*x-s*h*S+s*m*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],x=t[9],S=t[10],M=t[11],C=t[12],D=t[13],y=t[14],_=t[15],I=x*y*p-D*S*p+D*m*M-d*y*M-x*m*_+d*S*_,z=C*S*p-g*y*p-C*m*M+h*y*M+g*m*_-h*S*_,N=g*D*p-C*x*p+C*d*M-h*D*M-g*d*_+h*x*_,V=C*x*m-g*D*m-C*d*S+h*D*S+g*d*y-h*x*y,H=i*I+s*z+l*N+c*V;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/H;return t[0]=I*L,t[1]=(D*S*c-x*y*c-D*l*M+s*y*M+x*l*_-s*S*_)*L,t[2]=(d*y*c-D*m*c+D*l*p-s*y*p-d*l*_+s*m*_)*L,t[3]=(x*m*c-d*S*c-x*l*p+s*S*p+d*l*M-s*m*M)*L,t[4]=z*L,t[5]=(g*y*c-C*S*c+C*l*M-i*y*M-g*l*_+i*S*_)*L,t[6]=(C*m*c-h*y*c-C*l*p+i*y*p+h*l*_-i*m*_)*L,t[7]=(h*S*c-g*m*c+g*l*p-i*S*p-h*l*M+i*m*M)*L,t[8]=N*L,t[9]=(C*x*c-g*D*c-C*s*M+i*D*M+g*s*_-i*x*_)*L,t[10]=(h*D*c-C*d*c+C*s*p-i*D*p-h*s*_+i*d*_)*L,t[11]=(g*d*c-h*x*c-g*s*p+i*x*p+h*s*M-i*d*M)*L,t[12]=V*L,t[13]=(g*D*l-C*x*l+C*s*S-i*D*S-g*s*y+i*x*y)*L,t[14]=(C*d*l-h*D*l-C*s*m+i*D*m+h*s*y-i*d*y)*L,t[15]=(h*x*l-g*d*l+g*s*m-i*x*m-h*s*S+i*d*S)*L,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,d=t.y,m=t.z,p=c*h,g=c*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*h,0,p*m-l*d,g*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,g=h+h,x=d+d,S=c*p,M=c*g,C=c*x,D=h*g,y=h*x,_=d*x,I=m*p,z=m*g,N=m*x,V=s.x,H=s.y,L=s.z;return l[0]=(1-(D+_))*V,l[1]=(M+N)*V,l[2]=(C-z)*V,l[3]=0,l[4]=(M-N)*H,l[5]=(1-(S+_))*H,l[6]=(y+I)*H,l[7]=0,l[8]=(C+z)*L,l[9]=(y-I)*L,l[10]=(1-(S+D))*L,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=cr.set(l[0],l[1],l[2]).length();const h=cr.set(l[4],l[5],l[6]).length(),d=cr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],_i.copy(this);const p=1/c,g=1/h,x=1/d;return _i.elements[0]*=p,_i.elements[1]*=p,_i.elements[2]*=p,_i.elements[4]*=g,_i.elements[5]*=g,_i.elements[6]*=g,_i.elements[8]*=x,_i.elements[9]*=x,_i.elements[10]*=x,i.setFromRotationMatrix(_i),s.x=c,s.y=h,s.z=d,this}makePerspective(t,i,s,l,c,h,d=ia){const m=this.elements,p=2*c/(i-t),g=2*c/(s-l),x=(i+t)/(i-t),S=(s+l)/(s-l);let M,C;if(d===ia)M=-(h+c)/(h-c),C=-2*h*c/(h-c);else if(d===Du)M=-h/(h-c),C=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=x,m[12]=0,m[1]=0,m[5]=g,m[9]=S,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=C,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,c,h,d=ia){const m=this.elements,p=1/(i-t),g=1/(s-l),x=1/(h-c),S=(i+t)*p,M=(s+l)*g;let C,D;if(d===ia)C=(h+c)*x,D=-2*x;else if(d===Du)C=c*x,D=-1*x;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-S,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=D,m[14]=-C,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const cr=new et,_i=new en,iy=new et(0,0,0),ay=new et(1,1,1),Na=new et,au=new et,Zn=new et,s_=new en,r_=new Ts;class oa{constructor(t=0,i=0,s=0,l=oa.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],g=l[9],x=l[2],S=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(S,p),this._z=0);break;case"YXZ":this._x=Math.asin(-me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-x,c),this._z=0);break;case"ZXY":this._x=Math.asin(me(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(-x,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-me(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(S,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-x,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(S,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return s_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(s_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return r_.setFromEuler(this),this.setFromQuaternion(r_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oa.DEFAULT_ORDER="XYZ";class f0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let sy=0;const o_=new et,fr=new Ts,Qi=new en,su=new et,Po=new et,ry=new et,oy=new Ts,l_=new et(1,0,0),u_=new et(0,1,0),c_=new et(0,0,1),f_={type:"added"},ly={type:"removed"},hr={type:"childadded",child:null},$f={type:"childremoved",child:null};class Jn extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Jn.DEFAULT_UP.clone();const t=new et,i=new oa,s=new Ts,l=new et(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new en},normalMatrix:{value:new ce}}),this.matrix=new en,this.matrixWorld=new en,this.matrixAutoUpdate=Jn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new f0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return fr.setFromAxisAngle(t,i),this.quaternion.multiply(fr),this}rotateOnWorldAxis(t,i){return fr.setFromAxisAngle(t,i),this.quaternion.premultiply(fr),this}rotateX(t){return this.rotateOnAxis(l_,t)}rotateY(t){return this.rotateOnAxis(u_,t)}rotateZ(t){return this.rotateOnAxis(c_,t)}translateOnAxis(t,i){return o_.copy(t).applyQuaternion(this.quaternion),this.position.add(o_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(l_,t)}translateY(t){return this.translateOnAxis(u_,t)}translateZ(t){return this.translateOnAxis(c_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qi.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?su.copy(t):su.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Po.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qi.lookAt(Po,su,this.up):Qi.lookAt(su,Po,this.up),this.quaternion.setFromRotationMatrix(Qi),l&&(Qi.extractRotation(l.matrixWorld),fr.setFromRotationMatrix(Qi),this.quaternion.premultiply(fr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(f_),hr.child=t,this.dispatchEvent(hr),hr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(ly),$f.child=t,this.dispatchEvent($f),$f.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(f_),hr.child=t,this.dispatchEvent(hr),hr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,t,ry),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,oy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const x=m[p];c(t.shapes,x)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),g=h(t.images),x=h(t.shapes),S=h(t.skeletons),M=h(t.animations),C=h(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),x.length>0&&(s.shapes=x),S.length>0&&(s.skeletons=S),M.length>0&&(s.animations=M),C.length>0&&(s.nodes=C)}return s.object=l,s;function h(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Jn.DEFAULT_UP=new et(0,1,0);Jn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vi=new et,Ji=new et,th=new et,$i=new et,dr=new et,pr=new et,h_=new et,eh=new et,nh=new et,ih=new et,ah=new Ke,sh=new Ke,rh=new Ke;class xi{constructor(t=new et,i=new et,s=new et){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),vi.subVectors(t,i),l.cross(vi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){vi.subVectors(l,i),Ji.subVectors(s,i),th.subVectors(t,i);const h=vi.dot(vi),d=vi.dot(Ji),m=vi.dot(th),p=Ji.dot(Ji),g=Ji.dot(th),x=h*p-d*d;if(x===0)return c.set(0,0,0),null;const S=1/x,M=(p*m-d*g)*S,C=(h*g-d*m)*S;return c.set(1-M-C,C,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(t,i,s,l,c,h,d,m){return this.getBarycoord(t,i,s,l,$i)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,$i.x),m.addScaledVector(h,$i.y),m.addScaledVector(d,$i.z),m)}static getInterpolatedAttribute(t,i,s,l,c,h){return ah.setScalar(0),sh.setScalar(0),rh.setScalar(0),ah.fromBufferAttribute(t,i),sh.fromBufferAttribute(t,s),rh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(ah,c.x),h.addScaledVector(sh,c.y),h.addScaledVector(rh,c.z),h}static isFrontFacing(t,i,s,l){return vi.subVectors(s,i),Ji.subVectors(t,i),vi.cross(Ji).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vi.subVectors(this.c,this.b),Ji.subVectors(this.a,this.b),vi.cross(Ji).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return xi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return xi.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return xi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,d;dr.subVectors(l,s),pr.subVectors(c,s),eh.subVectors(t,s);const m=dr.dot(eh),p=pr.dot(eh);if(m<=0&&p<=0)return i.copy(s);nh.subVectors(t,l);const g=dr.dot(nh),x=pr.dot(nh);if(g>=0&&x<=g)return i.copy(l);const S=m*x-g*p;if(S<=0&&m>=0&&g<=0)return h=m/(m-g),i.copy(s).addScaledVector(dr,h);ih.subVectors(t,c);const M=dr.dot(ih),C=pr.dot(ih);if(C>=0&&M<=C)return i.copy(c);const D=M*p-m*C;if(D<=0&&p>=0&&C<=0)return d=p/(p-C),i.copy(s).addScaledVector(pr,d);const y=g*C-M*x;if(y<=0&&x-g>=0&&M-C>=0)return h_.subVectors(c,l),d=(x-g)/(x-g+(M-C)),i.copy(l).addScaledVector(h_,d);const _=1/(y+D+S);return h=D*_,d=S*_,i.copy(s).addScaledVector(dr,h).addScaledVector(pr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const h0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oa={h:0,s:0,l:0},ru={h:0,s:0,l:0};function oh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class Be{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Qn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=we.workingColorSpace){return this.r=t,this.g=i,this.b=s,we.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=we.workingColorSpace){if(t=pd(t,1),i=me(i,0,1),s=me(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=oh(h,c,t+1/3),this.g=oh(h,c,t),this.b=oh(h,c,t-1/3)}return we.toWorkingColorSpace(this,l),this}setStyle(t,i=Qn){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Qn){const s=h0[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=sa(t.r),this.g=sa(t.g),this.b=sa(t.b),this}copyLinearToSRGB(t){return this.r=Ar(t.r),this.g=Ar(t.g),this.b=Ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qn){return we.fromWorkingColorSpace(Rn.copy(this),t),Math.round(me(Rn.r*255,0,255))*65536+Math.round(me(Rn.g*255,0,255))*256+Math.round(me(Rn.b*255,0,255))}getHexString(t=Qn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=we.workingColorSpace){we.fromWorkingColorSpace(Rn.copy(this),i);const s=Rn.r,l=Rn.g,c=Rn.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+h)/2;if(d===h)m=0,p=0;else{const x=h-d;switch(p=g<=.5?x/(h+d):x/(2-h-d),h){case s:m=(l-c)/x+(l<c?6:0);break;case l:m=(c-s)/x+2;break;case c:m=(s-l)/x+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,i=we.workingColorSpace){return we.fromWorkingColorSpace(Rn.copy(this),i),t.r=Rn.r,t.g=Rn.g,t.b=Rn.b,t}getStyle(t=Qn){we.fromWorkingColorSpace(Rn.copy(this),t);const i=Rn.r,s=Rn.g,l=Rn.b;return t!==Qn?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Oa),this.setHSL(Oa.h+t,Oa.s+i,Oa.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Oa),t.getHSL(ru);const s=Fo(Oa.h,ru.h,i),l=Fo(Oa.s,ru.s,i),c=Fo(Oa.l,ru.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rn=new Be;Be.NAMES=h0;let uy=0;class Nu extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uy++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Tr,this.side=Ha,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xh,this.blendDst=Sh,this.blendEquation=ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Tr&&(s.blending=this.blending),this.side!==Ha&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==xh&&(s.blendSrc=this.blendSrc),this.blendDst!==Sh&&(s.blendDst=this.blendDst),this.blendEquation!==ms&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Rr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qg&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class d0 extends Nu{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oa,this.combine=j_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const tn=new et,ou=new he;class Ui{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=Jg,this.updateRanges=[],this.gpuType=na,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)ou.fromBufferAttribute(this,i),ou.applyMatrix3(t),this.setXY(i,ou.x,ou.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)tn.fromBufferAttribute(this,i),tn.applyMatrix3(t),this.setXYZ(i,tn.x,tn.y,tn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)tn.fromBufferAttribute(this,i),tn.applyMatrix4(t),this.setXYZ(i,tn.x,tn.y,tn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)tn.fromBufferAttribute(this,i),tn.applyNormalMatrix(t),this.setXYZ(i,tn.x,tn.y,tn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)tn.fromBufferAttribute(this,i),tn.transformDirection(t),this.setXYZ(i,tn.x,tn.y,tn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=xr(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=On(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=xr(i,this.array)),i}setX(t,i){return this.normalized&&(i=On(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=xr(i,this.array)),i}setY(t,i){return this.normalized&&(i=On(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=xr(i,this.array)),i}setZ(t,i){return this.normalized&&(i=On(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=xr(i,this.array)),i}setW(t,i){return this.normalized&&(i=On(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=On(i,this.array),s=On(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=On(i,this.array),s=On(s,this.array),l=On(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=On(i,this.array),s=On(s,this.array),l=On(l,this.array),c=On(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jg&&(t.usage=this.usage),t}}class p0 extends Ui{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class m0 extends Ui{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class ys extends Ui{constructor(t,i,s){super(new Float32Array(t),i,s)}}let cy=0;const ui=new en,lh=new Jn,mr=new et,Kn=new ko,zo=new ko,_n=new et;class As extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cy++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(o0(t)?m0:p0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new ce().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ui.makeRotationFromQuaternion(t),this.applyMatrix4(ui),this}rotateX(t){return ui.makeRotationX(t),this.applyMatrix4(ui),this}rotateY(t){return ui.makeRotationY(t),this.applyMatrix4(ui),this}rotateZ(t){return ui.makeRotationZ(t),this.applyMatrix4(ui),this}translate(t,i,s){return ui.makeTranslation(t,i,s),this.applyMatrix4(ui),this}scale(t,i,s){return ui.makeScale(t,i,s),this.applyMatrix4(ui),this}lookAt(t){return lh.lookAt(t),lh.updateMatrix(),this.applyMatrix4(lh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mr).negate(),this.translate(mr.x,mr.y,mr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new ys(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ko);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new et(-1/0,-1/0,-1/0),new et(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Kn.setFromBufferAttribute(c),this.morphTargetsRelative?(_n.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(_n),_n.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(_n)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new md);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new et,1/0);return}if(t){const s=this.boundingSphere.center;if(Kn.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];zo.setFromBufferAttribute(d),this.morphTargetsRelative?(_n.addVectors(Kn.min,zo.min),Kn.expandByPoint(_n),_n.addVectors(Kn.max,zo.max),Kn.expandByPoint(_n)):(Kn.expandByPoint(zo.min),Kn.expandByPoint(zo.max))}Kn.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)_n.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(_n));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)_n.fromBufferAttribute(d,p),m&&(mr.fromBufferAttribute(t,p),_n.add(mr)),l=Math.max(l,s.distanceToSquared(_n))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ui(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let B=0;B<s.count;B++)d[B]=new et,m[B]=new et;const p=new et,g=new et,x=new et,S=new he,M=new he,C=new he,D=new et,y=new et;function _(B,R,E){p.fromBufferAttribute(s,B),g.fromBufferAttribute(s,R),x.fromBufferAttribute(s,E),S.fromBufferAttribute(c,B),M.fromBufferAttribute(c,R),C.fromBufferAttribute(c,E),g.sub(p),x.sub(p),M.sub(S),C.sub(S);const P=1/(M.x*C.y-C.x*M.y);isFinite(P)&&(D.copy(g).multiplyScalar(C.y).addScaledVector(x,-M.y).multiplyScalar(P),y.copy(x).multiplyScalar(M.x).addScaledVector(g,-C.x).multiplyScalar(P),d[B].add(D),d[R].add(D),d[E].add(D),m[B].add(y),m[R].add(y),m[E].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let B=0,R=I.length;B<R;++B){const E=I[B],P=E.start,ot=E.count;for(let at=P,ct=P+ot;at<ct;at+=3)_(t.getX(at+0),t.getX(at+1),t.getX(at+2))}const z=new et,N=new et,V=new et,H=new et;function L(B){V.fromBufferAttribute(l,B),H.copy(V);const R=d[B];z.copy(R),z.sub(V.multiplyScalar(V.dot(R))).normalize(),N.crossVectors(H,R);const P=N.dot(m[B])<0?-1:1;h.setXYZW(B,z.x,z.y,z.z,P)}for(let B=0,R=I.length;B<R;++B){const E=I[B],P=E.start,ot=E.count;for(let at=P,ct=P+ot;at<ct;at+=3)L(t.getX(at+0)),L(t.getX(at+1)),L(t.getX(at+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ui(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let S=0,M=s.count;S<M;S++)s.setXYZ(S,0,0,0);const l=new et,c=new et,h=new et,d=new et,m=new et,p=new et,g=new et,x=new et;if(t)for(let S=0,M=t.count;S<M;S+=3){const C=t.getX(S+0),D=t.getX(S+1),y=t.getX(S+2);l.fromBufferAttribute(i,C),c.fromBufferAttribute(i,D),h.fromBufferAttribute(i,y),g.subVectors(h,c),x.subVectors(l,c),g.cross(x),d.fromBufferAttribute(s,C),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,y),d.add(g),m.add(g),p.add(g),s.setXYZ(C,d.x,d.y,d.z),s.setXYZ(D,m.x,m.y,m.z),s.setXYZ(y,p.x,p.y,p.z)}else for(let S=0,M=i.count;S<M;S+=3)l.fromBufferAttribute(i,S+0),c.fromBufferAttribute(i,S+1),h.fromBufferAttribute(i,S+2),g.subVectors(h,c),x.subVectors(l,c),g.cross(x),s.setXYZ(S+0,g.x,g.y,g.z),s.setXYZ(S+1,g.x,g.y,g.z),s.setXYZ(S+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)_n.fromBufferAttribute(t,i),_n.normalize(),t.setXYZ(i,_n.x,_n.y,_n.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,x=d.normalized,S=new p.constructor(m.length*g);let M=0,C=0;for(let D=0,y=m.length;D<y;D++){d.isInterleavedBufferAttribute?M=m[D]*d.data.stride+d.offset:M=m[D]*g;for(let _=0;_<g;_++)S[C++]=p[M++]}return new Ui(S,g,x)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new As,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,x=p.length;g<x;g++){const S=p[g],M=t(S,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let x=0,S=p.length;x<S;x++){const M=p[x];g.push(M.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const c=t.morphAttributes;for(const p in c){const g=[],x=c[p];for(let S=0,M=x.length;S<M;S++)g.push(x[S].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,g=h.length;p<g;p++){const x=h[p];this.addGroup(x.start,x.count,x.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const d_=new en,us=new c0,lu=new md,p_=new et,uu=new et,cu=new et,fu=new et,uh=new et,hu=new et,m_=new et,du=new et;class wi extends Jn{constructor(t=new As,i=new d0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){hu.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],x=c[m];g!==0&&(uh.fromBufferAttribute(x,t),h?hu.addScaledVector(uh,g):hu.addScaledVector(uh.sub(i),g))}i.add(hu)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),lu.copy(s.boundingSphere),lu.applyMatrix4(c),us.copy(t.ray).recast(t.near),!(lu.containsPoint(us.origin)===!1&&(us.intersectSphere(lu,p_)===null||us.origin.distanceToSquared(p_)>(t.far-t.near)**2))&&(d_.copy(c).invert(),us.copy(t.ray).applyMatrix4(d_),!(s.boundingBox!==null&&us.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,us)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,x=c.attributes.normal,S=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(h))for(let C=0,D=S.length;C<D;C++){const y=S[C],_=h[y.materialIndex],I=Math.max(y.start,M.start),z=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let N=I,V=z;N<V;N+=3){const H=d.getX(N),L=d.getX(N+1),B=d.getX(N+2);l=pu(this,_,t,s,p,g,x,H,L,B),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const C=Math.max(0,M.start),D=Math.min(d.count,M.start+M.count);for(let y=C,_=D;y<_;y+=3){const I=d.getX(y),z=d.getX(y+1),N=d.getX(y+2);l=pu(this,h,t,s,p,g,x,I,z,N),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let C=0,D=S.length;C<D;C++){const y=S[C],_=h[y.materialIndex],I=Math.max(y.start,M.start),z=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let N=I,V=z;N<V;N+=3){const H=N,L=N+1,B=N+2;l=pu(this,_,t,s,p,g,x,H,L,B),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const C=Math.max(0,M.start),D=Math.min(m.count,M.start+M.count);for(let y=C,_=D;y<_;y+=3){const I=y,z=y+1,N=y+2;l=pu(this,h,t,s,p,g,x,I,z,N),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function fy(r,t,i,s,l,c,h,d){let m;if(t.side===Gn?m=s.intersectTriangle(h,c,l,!0,d):m=s.intersectTriangle(l,c,h,t.side===Ha,d),m===null)return null;du.copy(d),du.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(du);return p<i.near||p>i.far?null:{distance:p,point:du.clone(),object:r}}function pu(r,t,i,s,l,c,h,d,m,p){r.getVertexPosition(d,uu),r.getVertexPosition(m,cu),r.getVertexPosition(p,fu);const g=fy(r,t,i,s,uu,cu,fu,m_);if(g){const x=new et;xi.getBarycoord(m_,uu,cu,fu,x),l&&(g.uv=xi.getInterpolatedAttribute(l,d,m,p,x,new he)),c&&(g.uv1=xi.getInterpolatedAttribute(c,d,m,p,x,new he)),h&&(g.normal=xi.getInterpolatedAttribute(h,d,m,p,x,new et),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const S={a:d,b:m,c:p,normal:new et,materialIndex:0};xi.getNormal(uu,cu,fu,S.normal),g.face=S,g.barycoord=x}return g}class Xo extends As{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],g=[],x=[];let S=0,M=0;C("z","y","x",-1,-1,s,i,t,h,c,0),C("z","y","x",1,-1,s,i,-t,h,c,1),C("x","z","y",1,1,t,s,i,l,h,2),C("x","z","y",1,-1,t,s,-i,l,h,3),C("x","y","z",1,-1,t,i,s,l,c,4),C("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new ys(p,3)),this.setAttribute("normal",new ys(g,3)),this.setAttribute("uv",new ys(x,2));function C(D,y,_,I,z,N,V,H,L,B,R){const E=N/L,P=V/B,ot=N/2,at=V/2,ct=H/2,ft=L+1,X=B+1;let st=0,j=0;const yt=new et;for(let w=0;w<X;w++){const nt=w*P-at;for(let Tt=0;Tt<ft;Tt++){const vt=Tt*E-ot;yt[D]=vt*I,yt[y]=nt*z,yt[_]=ct,p.push(yt.x,yt.y,yt.z),yt[D]=0,yt[y]=0,yt[_]=H>0?1:-1,g.push(yt.x,yt.y,yt.z),x.push(Tt/L),x.push(1-w/B),st+=1}}for(let w=0;w<B;w++)for(let nt=0;nt<L;nt++){const Tt=S+nt+ft*w,vt=S+nt+ft*(w+1),Y=S+(nt+1)+ft*(w+1),ht=S+(nt+1)+ft*w;m.push(Tt,vt,ht),m.push(vt,Y,ht),j+=6}d.addGroup(M,j,R),M+=j,S+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Nr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function Pn(r){const t={};for(let i=0;i<r.length;i++){const s=Nr(r[i]);for(const l in s)t[l]=s[l]}return t}function hy(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function g0(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const dy={clone:Nr,merge:Pn};var py=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,my=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class la extends Nu{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=py,this.fragmentShader=my,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Nr(t.uniforms),this.uniformsGroups=hy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class _0 extends Jn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new en,this.projectionMatrix=new en,this.projectionMatrixInverse=new en,this.coordinateSystem=ia}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pa=new et,g_=new he,__=new he;class ci extends _0{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Go*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Io*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Go*2*Math.atan(Math.tan(Io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){Pa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pa.x,Pa.y).multiplyScalar(-t/Pa.z),Pa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Pa.x,Pa.y).multiplyScalar(-t/Pa.z)}getViewSize(t,i){return this.getViewBounds(t,g_,__),i.subVectors(__,g_)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Io*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const gr=-90,_r=1;class gy extends Jn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ci(gr,_r,t,i);l.layers=this.layers,this.add(l);const c=new ci(gr,_r,t,i);c.layers=this.layers,this.add(c);const h=new ci(gr,_r,t,i);h.layers=this.layers,this.add(h);const d=new ci(gr,_r,t,i);d.layers=this.layers,this.add(d);const m=new ci(gr,_r,t,i);m.layers=this.layers,this.add(m);const p=new ci(gr,_r,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(t===ia)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Du)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,g]=this.children,x=t.getRenderTarget(),S=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),C=t.xr.enabled;t.xr.enabled=!1;const D=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,m),t.setRenderTarget(s,4,l),t.render(i,p),s.texture.generateMipmaps=D,t.setRenderTarget(s,5,l),t.render(i,g),t.setRenderTarget(x,S,M),t.xr.enabled=C,s.texture.needsPMREMUpdate=!0}}class v0 extends Vn{constructor(t,i,s,l,c,h,d,m,p,g){t=t!==void 0?t:[],i=i!==void 0?i:Cr,super(t,i,s,l,c,h,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _y extends Es{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new v0(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Di}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Xo(5,5,5),c=new la({name:"CubemapFromEquirect",uniforms:Nr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Gn,blending:Fa});c.uniforms.tEquirect.value=i;const h=new wi(l,c),d=i.minFilter;return i.minFilter===vs&&(i.minFilter=Di),new gy(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}class vy extends Jn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oa,this.environmentIntensity=1,this.environmentRotation=new oa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const ch=new et,xy=new et,Sy=new ce;class Ba{constructor(t=new et(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=ch.subVectors(s,i).cross(xy.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(ch),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||Sy.getNormalMatrix(t),l=this.coplanarPoint(ch).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const cs=new md,mu=new et;class x0{constructor(t=new Ba,i=new Ba,s=new Ba,l=new Ba,c=new Ba,h=new Ba){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ia){const s=this.planes,l=t.elements,c=l[0],h=l[1],d=l[2],m=l[3],p=l[4],g=l[5],x=l[6],S=l[7],M=l[8],C=l[9],D=l[10],y=l[11],_=l[12],I=l[13],z=l[14],N=l[15];if(s[0].setComponents(m-c,S-p,y-M,N-_).normalize(),s[1].setComponents(m+c,S+p,y+M,N+_).normalize(),s[2].setComponents(m+h,S+g,y+C,N+I).normalize(),s[3].setComponents(m-h,S-g,y-C,N-I).normalize(),s[4].setComponents(m-d,S-x,y-D,N-z).normalize(),i===ia)s[5].setComponents(m+d,S+x,y+D,N+z).normalize();else if(i===Du)s[5].setComponents(d,x,D,z).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),cs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(t){return cs.center.set(0,0,0),cs.radius=.7071067811865476,cs.applyMatrix4(t.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(mu.x=l.normal.x>0?t.max.x:t.min.x,mu.y=l.normal.y>0?t.max.y:t.min.y,mu.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(mu)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gu extends Jn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class S0 extends Vn{constructor(t,i,s,l,c,h,d,m,p,g=br){if(g!==br&&g!==Ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===br&&(s=Ms),s===void 0&&g===Ur&&(s=wr),super(null,l,c,h,d,m,g,s,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:yi,this.minFilter=m!==void 0?m:yi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Wo extends As{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,x=t/d,S=i/m,M=[],C=[],D=[],y=[];for(let _=0;_<g;_++){const I=_*S-h;for(let z=0;z<p;z++){const N=z*x-c;C.push(N,-I,0),D.push(0,0,1),y.push(z/d),y.push(1-_/m)}}for(let _=0;_<m;_++)for(let I=0;I<d;I++){const z=I+p*_,N=I+p*(_+1),V=I+1+p*(_+1),H=I+1+p*_;M.push(z,N,H),M.push(N,V,H)}this.setIndex(M),this.setAttribute("position",new ys(C,3)),this.setAttribute("normal",new ys(D,3)),this.setAttribute("uv",new ys(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.width,t.height,t.widthSegments,t.heightSegments)}}class yy extends Nu{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class My extends Nu{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ey extends _0{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class Ty extends ci{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class v_{constructor(t=1,i=0,s=0){return this.radius=t,this.phi=i,this.theta=s,this}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(me(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class by extends bs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function x_(r,t,i,s){const l=Ay(s);switch(i){case $_:return r*t;case e0:return r*t;case n0:return r*t*2;case i0:return r*t/l.components*l.byteLength;case fd:return r*t/l.components*l.byteLength;case a0:return r*t*2/l.components*l.byteLength;case hd:return r*t*2/l.components*l.byteLength;case t0:return r*t*3/l.components*l.byteLength;case Si:return r*t*4/l.components*l.byteLength;case dd:return r*t*4/l.components*l.byteLength;case yu:case Mu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Eu:case Tu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Nh:case Ph:return Math.max(r,16)*Math.max(t,8)/4;case Lh:case Oh:return Math.max(r,8)*Math.max(t,8)/2;case zh:case Bh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ih:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Fh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Hh:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Gh:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Vh:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case kh:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Xh:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Wh:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case qh:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Yh:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case jh:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Zh:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Kh:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Qh:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Jh:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case bu:case $h:case td:return Math.ceil(r/4)*Math.ceil(t/4)*16;case s0:case ed:return Math.ceil(r/4)*Math.ceil(t/4)*8;case nd:case id:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Ay(r){switch(r){case ra:case K_:return{byteLength:1,components:1};case Ho:case Q_:case Vo:return{byteLength:2,components:1};case ud:case cd:return{byteLength:2,components:4};case Ms:case ld:case na:return{byteLength:4,components:1};case J_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:od}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=od);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function y0(){let r=null,t=!1,i=null,s=null;function l(c,h){i(c,h),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function Ry(r){const t=new WeakMap;function i(d,m){const p=d.array,g=d.usage,x=p.byteLength,S=r.createBuffer();r.bindBuffer(m,S),r.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:S,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:x}}function s(d,m,p){const g=m.array,x=m.updateRanges;if(r.bindBuffer(p,d),x.length===0)r.bufferSubData(p,0,g);else{x.sort((M,C)=>M.start-C.start);let S=0;for(let M=1;M<x.length;M++){const C=x[S],D=x[M];D.start<=C.start+C.count+1?C.count=Math.max(C.count,D.start+D.count-C.start):(++S,x[S]=D)}x.length=S+1;for(let M=0,C=x.length;M<C;M++){const D=x[M];r.bufferSubData(p,D.start*g.BYTES_PER_ELEMENT,g,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var Cy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dy=`#ifdef USE_ALPHAHASH
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
#endif`,wy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ly=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ny=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Oy=`#ifdef USE_AOMAP
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
#endif`,Py=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zy=`#ifdef USE_BATCHING
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
#endif`,By=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Iy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gy=`#ifdef USE_IRIDESCENCE
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
#endif`,Vy=`#ifdef USE_BUMPMAP
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
#endif`,ky=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ky=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Qy=`#define PI 3.141592653589793
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
} // validated`,Jy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$y=`vec3 transformedNormal = objectNormal;
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
#endif`,tM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,aM="gl_FragColor = linearToOutputTexel( gl_FragColor );",sM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rM=`#ifdef USE_ENVMAP
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
#endif`,oM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lM=`#ifdef USE_ENVMAP
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
#endif`,uM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cM=`#ifdef USE_ENVMAP
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
#endif`,fM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mM=`#ifdef USE_GRADIENTMAP
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
}`,gM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_M=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xM=`uniform bool receiveShadow;
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
#endif`,SM=`#ifdef USE_ENVMAP
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
#endif`,yM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,MM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,EM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,TM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bM=`PhysicalMaterial material;
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
#endif`,AM=`struct PhysicalMaterial {
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
}`,RM=`
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
#endif`,CM=`#if defined( RE_IndirectDiffuse )
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
#endif`,DM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,UM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,OM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,PM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,BM=`#if defined( USE_POINTS_UV )
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
#endif`,IM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,FM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,HM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,GM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,VM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kM=`#ifdef USE_MORPHTARGETS
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
#endif`,XM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,YM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,KM=`#ifdef USE_NORMALMAP
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
#endif`,QM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,JM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$M=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,iE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,aE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hE=`float getShadowMask() {
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
}`,dE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pE=`#ifdef USE_SKINNING
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
#endif`,mE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gE=`#ifdef USE_SKINNING
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
#endif`,_E=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,SE=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yE=`#ifdef USE_TRANSMISSION
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
#endif`,ME=`#ifdef USE_TRANSMISSION
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
#endif`,EE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,AE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const RE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,CE=`uniform sampler2D t2D;
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
}`,DE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,UE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NE=`#include <common>
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
}`,OE=`#if DEPTH_PACKING == 3200
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
}`,PE=`#define DISTANCE
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
}`,zE=`#define DISTANCE
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
}`,BE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FE=`uniform float scale;
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
}`,HE=`uniform vec3 diffuse;
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
}`,GE=`#include <common>
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
}`,VE=`uniform vec3 diffuse;
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
}`,kE=`#define LAMBERT
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
}`,XE=`#define LAMBERT
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
}`,WE=`#define MATCAP
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
}`,qE=`#define MATCAP
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
}`,YE=`#define NORMAL
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
}`,jE=`#define NORMAL
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
}`,ZE=`#define PHONG
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
}`,KE=`#define PHONG
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
}`,QE=`#define STANDARD
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
}`,JE=`#define STANDARD
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
}`,$E=`#define TOON
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
}`,tT=`#define TOON
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
}`,eT=`uniform float size;
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
}`,nT=`uniform vec3 diffuse;
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
}`,iT=`#include <common>
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
}`,aT=`uniform vec3 color;
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
}`,sT=`uniform float rotation;
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
}`,rT=`uniform vec3 diffuse;
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
}`,fe={alphahash_fragment:Cy,alphahash_pars_fragment:Dy,alphamap_fragment:wy,alphamap_pars_fragment:Uy,alphatest_fragment:Ly,alphatest_pars_fragment:Ny,aomap_fragment:Oy,aomap_pars_fragment:Py,batching_pars_vertex:zy,batching_vertex:By,begin_vertex:Iy,beginnormal_vertex:Fy,bsdfs:Hy,iridescence_fragment:Gy,bumpmap_pars_fragment:Vy,clipping_planes_fragment:ky,clipping_planes_pars_fragment:Xy,clipping_planes_pars_vertex:Wy,clipping_planes_vertex:qy,color_fragment:Yy,color_pars_fragment:jy,color_pars_vertex:Zy,color_vertex:Ky,common:Qy,cube_uv_reflection_fragment:Jy,defaultnormal_vertex:$y,displacementmap_pars_vertex:tM,displacementmap_vertex:eM,emissivemap_fragment:nM,emissivemap_pars_fragment:iM,colorspace_fragment:aM,colorspace_pars_fragment:sM,envmap_fragment:rM,envmap_common_pars_fragment:oM,envmap_pars_fragment:lM,envmap_pars_vertex:uM,envmap_physical_pars_fragment:SM,envmap_vertex:cM,fog_vertex:fM,fog_pars_vertex:hM,fog_fragment:dM,fog_pars_fragment:pM,gradientmap_pars_fragment:mM,lightmap_pars_fragment:gM,lights_lambert_fragment:_M,lights_lambert_pars_fragment:vM,lights_pars_begin:xM,lights_toon_fragment:yM,lights_toon_pars_fragment:MM,lights_phong_fragment:EM,lights_phong_pars_fragment:TM,lights_physical_fragment:bM,lights_physical_pars_fragment:AM,lights_fragment_begin:RM,lights_fragment_maps:CM,lights_fragment_end:DM,logdepthbuf_fragment:wM,logdepthbuf_pars_fragment:UM,logdepthbuf_pars_vertex:LM,logdepthbuf_vertex:NM,map_fragment:OM,map_pars_fragment:PM,map_particle_fragment:zM,map_particle_pars_fragment:BM,metalnessmap_fragment:IM,metalnessmap_pars_fragment:FM,morphinstance_vertex:HM,morphcolor_vertex:GM,morphnormal_vertex:VM,morphtarget_pars_vertex:kM,morphtarget_vertex:XM,normal_fragment_begin:WM,normal_fragment_maps:qM,normal_pars_fragment:YM,normal_pars_vertex:jM,normal_vertex:ZM,normalmap_pars_fragment:KM,clearcoat_normal_fragment_begin:QM,clearcoat_normal_fragment_maps:JM,clearcoat_pars_fragment:$M,iridescence_pars_fragment:tE,opaque_fragment:eE,packing:nE,premultiplied_alpha_fragment:iE,project_vertex:aE,dithering_fragment:sE,dithering_pars_fragment:rE,roughnessmap_fragment:oE,roughnessmap_pars_fragment:lE,shadowmap_pars_fragment:uE,shadowmap_pars_vertex:cE,shadowmap_vertex:fE,shadowmask_pars_fragment:hE,skinbase_vertex:dE,skinning_pars_vertex:pE,skinning_vertex:mE,skinnormal_vertex:gE,specularmap_fragment:_E,specularmap_pars_fragment:vE,tonemapping_fragment:xE,tonemapping_pars_fragment:SE,transmission_fragment:yE,transmission_pars_fragment:ME,uv_pars_fragment:EE,uv_pars_vertex:TE,uv_vertex:bE,worldpos_vertex:AE,background_vert:RE,background_frag:CE,backgroundCube_vert:DE,backgroundCube_frag:wE,cube_vert:UE,cube_frag:LE,depth_vert:NE,depth_frag:OE,distanceRGBA_vert:PE,distanceRGBA_frag:zE,equirect_vert:BE,equirect_frag:IE,linedashed_vert:FE,linedashed_frag:HE,meshbasic_vert:GE,meshbasic_frag:VE,meshlambert_vert:kE,meshlambert_frag:XE,meshmatcap_vert:WE,meshmatcap_frag:qE,meshnormal_vert:YE,meshnormal_frag:jE,meshphong_vert:ZE,meshphong_frag:KE,meshphysical_vert:QE,meshphysical_frag:JE,meshtoon_vert:$E,meshtoon_frag:tT,points_vert:eT,points_frag:nT,shadow_vert:iT,shadow_frag:aT,sprite_vert:sT,sprite_frag:rT},Lt={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Ci={basic:{uniforms:Pn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:Pn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:Pn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:Pn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:Pn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:Pn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:Pn([Lt.points,Lt.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:Pn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:Pn([Lt.common,Lt.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:Pn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:Pn([Lt.sprite,Lt.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distanceRGBA:{uniforms:Pn([Lt.common,Lt.displacementmap,{referencePosition:{value:new et},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distanceRGBA_vert,fragmentShader:fe.distanceRGBA_frag},shadow:{uniforms:Pn([Lt.lights,Lt.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};Ci.physical={uniforms:Pn([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const _u={r:0,b:0,g:0},fs=new oa,oT=new en;function lT(r,t,i,s,l,c,h){const d=new Be(0);let m=c===!0?0:1,p,g,x=null,S=0,M=null;function C(z){let N=z.isScene===!0?z.background:null;return N&&N.isTexture&&(N=(z.backgroundBlurriness>0?i:t).get(N)),N}function D(z){let N=!1;const V=C(z);V===null?_(d,m):V&&V.isColor&&(_(V,1),N=!0);const H=r.xr.getEnvironmentBlendMode();H==="additive"?s.buffers.color.setClear(0,0,0,1,h):H==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(r.autoClear||N)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(z,N){const V=C(N);V&&(V.isCubeTexture||V.mapping===Lu)?(g===void 0&&(g=new wi(new Xo(1,1,1),new la({name:"BackgroundCubeMaterial",uniforms:Nr(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(H,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),fs.copy(N.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,V.isCubeTexture&&V.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),g.material.uniforms.envMap.value=V,g.material.uniforms.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(oT.makeRotationFromEuler(fs)),g.material.toneMapped=we.getTransfer(V.colorSpace)!==Pe,(x!==V||S!==V.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,x=V,S=V.version,M=r.toneMapping),g.layers.enableAll(),z.unshift(g,g.geometry,g.material,0,0,null)):V&&V.isTexture&&(p===void 0&&(p=new wi(new Wo(2,2),new la({name:"BackgroundMaterial",uniforms:Nr(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Ha,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=V,p.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,p.material.toneMapped=we.getTransfer(V.colorSpace)!==Pe,V.matrixAutoUpdate===!0&&V.updateMatrix(),p.material.uniforms.uvTransform.value.copy(V.matrix),(x!==V||S!==V.version||M!==r.toneMapping)&&(p.material.needsUpdate=!0,x=V,S=V.version,M=r.toneMapping),p.layers.enableAll(),z.unshift(p,p.geometry,p.material,0,0,null))}function _(z,N){z.getRGB(_u,g0(r)),s.buffers.color.setClear(_u.r,_u.g,_u.b,N,h)}function I(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(z,N=1){d.set(z),m=N,_(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(z){m=z,_(d,m)},render:D,addToRenderList:y,dispose:I}}function uT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=S(null);let c=l,h=!1;function d(E,P,ot,at,ct){let ft=!1;const X=x(at,ot,P);c!==X&&(c=X,p(c.object)),ft=M(E,at,ot,ct),ft&&C(E,at,ot,ct),ct!==null&&t.update(ct,r.ELEMENT_ARRAY_BUFFER),(ft||h)&&(h=!1,N(E,P,ot,at),ct!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ct).buffer))}function m(){return r.createVertexArray()}function p(E){return r.bindVertexArray(E)}function g(E){return r.deleteVertexArray(E)}function x(E,P,ot){const at=ot.wireframe===!0;let ct=s[E.id];ct===void 0&&(ct={},s[E.id]=ct);let ft=ct[P.id];ft===void 0&&(ft={},ct[P.id]=ft);let X=ft[at];return X===void 0&&(X=S(m()),ft[at]=X),X}function S(E){const P=[],ot=[],at=[];for(let ct=0;ct<i;ct++)P[ct]=0,ot[ct]=0,at[ct]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:ot,attributeDivisors:at,object:E,attributes:{},index:null}}function M(E,P,ot,at){const ct=c.attributes,ft=P.attributes;let X=0;const st=ot.getAttributes();for(const j in st)if(st[j].location>=0){const w=ct[j];let nt=ft[j];if(nt===void 0&&(j==="instanceMatrix"&&E.instanceMatrix&&(nt=E.instanceMatrix),j==="instanceColor"&&E.instanceColor&&(nt=E.instanceColor)),w===void 0||w.attribute!==nt||nt&&w.data!==nt.data)return!0;X++}return c.attributesNum!==X||c.index!==at}function C(E,P,ot,at){const ct={},ft=P.attributes;let X=0;const st=ot.getAttributes();for(const j in st)if(st[j].location>=0){let w=ft[j];w===void 0&&(j==="instanceMatrix"&&E.instanceMatrix&&(w=E.instanceMatrix),j==="instanceColor"&&E.instanceColor&&(w=E.instanceColor));const nt={};nt.attribute=w,w&&w.data&&(nt.data=w.data),ct[j]=nt,X++}c.attributes=ct,c.attributesNum=X,c.index=at}function D(){const E=c.newAttributes;for(let P=0,ot=E.length;P<ot;P++)E[P]=0}function y(E){_(E,0)}function _(E,P){const ot=c.newAttributes,at=c.enabledAttributes,ct=c.attributeDivisors;ot[E]=1,at[E]===0&&(r.enableVertexAttribArray(E),at[E]=1),ct[E]!==P&&(r.vertexAttribDivisor(E,P),ct[E]=P)}function I(){const E=c.newAttributes,P=c.enabledAttributes;for(let ot=0,at=P.length;ot<at;ot++)P[ot]!==E[ot]&&(r.disableVertexAttribArray(ot),P[ot]=0)}function z(E,P,ot,at,ct,ft,X){X===!0?r.vertexAttribIPointer(E,P,ot,ct,ft):r.vertexAttribPointer(E,P,ot,at,ct,ft)}function N(E,P,ot,at){D();const ct=at.attributes,ft=ot.getAttributes(),X=P.defaultAttributeValues;for(const st in ft){const j=ft[st];if(j.location>=0){let yt=ct[st];if(yt===void 0&&(st==="instanceMatrix"&&E.instanceMatrix&&(yt=E.instanceMatrix),st==="instanceColor"&&E.instanceColor&&(yt=E.instanceColor)),yt!==void 0){const w=yt.normalized,nt=yt.itemSize,Tt=t.get(yt);if(Tt===void 0)continue;const vt=Tt.buffer,Y=Tt.type,ht=Tt.bytesPerElement,xt=Y===r.INT||Y===r.UNSIGNED_INT||yt.gpuType===ld;if(yt.isInterleavedBufferAttribute){const bt=yt.data,Rt=bt.stride,zt=yt.offset;if(bt.isInstancedInterleavedBuffer){for(let Vt=0;Vt<j.locationSize;Vt++)_(j.location+Vt,bt.meshPerAttribute);E.isInstancedMesh!==!0&&at._maxInstanceCount===void 0&&(at._maxInstanceCount=bt.meshPerAttribute*bt.count)}else for(let Vt=0;Vt<j.locationSize;Vt++)y(j.location+Vt);r.bindBuffer(r.ARRAY_BUFFER,vt);for(let Vt=0;Vt<j.locationSize;Vt++)z(j.location+Vt,nt/j.locationSize,Y,w,Rt*ht,(zt+nt/j.locationSize*Vt)*ht,xt)}else{if(yt.isInstancedBufferAttribute){for(let bt=0;bt<j.locationSize;bt++)_(j.location+bt,yt.meshPerAttribute);E.isInstancedMesh!==!0&&at._maxInstanceCount===void 0&&(at._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let bt=0;bt<j.locationSize;bt++)y(j.location+bt);r.bindBuffer(r.ARRAY_BUFFER,vt);for(let bt=0;bt<j.locationSize;bt++)z(j.location+bt,nt/j.locationSize,Y,w,nt*ht,nt/j.locationSize*bt*ht,xt)}}else if(X!==void 0){const w=X[st];if(w!==void 0)switch(w.length){case 2:r.vertexAttrib2fv(j.location,w);break;case 3:r.vertexAttrib3fv(j.location,w);break;case 4:r.vertexAttrib4fv(j.location,w);break;default:r.vertexAttrib1fv(j.location,w)}}}}I()}function V(){B();for(const E in s){const P=s[E];for(const ot in P){const at=P[ot];for(const ct in at)g(at[ct].object),delete at[ct];delete P[ot]}delete s[E]}}function H(E){if(s[E.id]===void 0)return;const P=s[E.id];for(const ot in P){const at=P[ot];for(const ct in at)g(at[ct].object),delete at[ct];delete P[ot]}delete s[E.id]}function L(E){for(const P in s){const ot=s[P];if(ot[E.id]===void 0)continue;const at=ot[E.id];for(const ct in at)g(at[ct].object),delete at[ct];delete ot[E.id]}}function B(){R(),h=!0,c!==l&&(c=l,p(c.object))}function R(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:B,resetDefaultState:R,dispose:V,releaseStatesOfGeometry:H,releaseStatesOfProgram:L,initAttributes:D,enableAttribute:y,disableUnusedAttributes:I}}function cT(r,t,i){let s;function l(p){s=p}function c(p,g){r.drawArrays(s,p,g),i.update(g,s,1)}function h(p,g,x){x!==0&&(r.drawArraysInstanced(s,p,g,x),i.update(g,s,x))}function d(p,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,x);let M=0;for(let C=0;C<x;C++)M+=g[C];i.update(M,s,1)}function m(p,g,x,S){if(x===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let C=0;C<p.length;C++)h(p[C],g[C],S[C]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,g,0,S,0,x);let C=0;for(let D=0;D<x;D++)C+=g[D]*S[D];i.update(C,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function fT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(L){return!(L!==Si&&s.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(L){const B=L===Vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==ra&&s.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==na&&!B)}function m(L){if(L==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const x=i.logarithmicDepthBuffer===!0,S=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),I=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),z=r.getParameter(r.MAX_VARYING_VECTORS),N=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),V=C>0,H=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:x,reverseDepthBuffer:S,maxTextures:M,maxVertexTextures:C,maxTextureSize:D,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:I,maxVaryings:z,maxFragmentUniforms:N,vertexTextures:V,maxSamples:H}}function hT(r){const t=this;let i=null,s=0,l=!1,c=!1;const h=new Ba,d=new ce,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,S){const M=x.length!==0||S||s!==0||l;return l=S,s=x.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(x,S){i=g(x,S,0)},this.setState=function(x,S,M){const C=x.clippingPlanes,D=x.clipIntersection,y=x.clipShadows,_=r.get(x);if(!l||C===null||C.length===0||c&&!y)c?g(null):p();else{const I=c?0:s,z=I*4;let N=_.clippingState||null;m.value=N,N=g(C,S,z,M);for(let V=0;V!==z;++V)N[V]=i[V];_.clippingState=N,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(x,S,M,C){const D=x!==null?x.length:0;let y=null;if(D!==0){if(y=m.value,C!==!0||y===null){const _=M+D*4,I=S.matrixWorldInverse;d.getNormalMatrix(I),(y===null||y.length<_)&&(y=new Float32Array(_));for(let z=0,N=M;z!==D;++z,N+=4)h.copy(x[z]).applyMatrix4(I,d),h.normal.toArray(y,N),y[N+3]=h.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=D,t.numIntersection=0,y}}function dT(r){let t=new WeakMap;function i(h,d){return d===Ch?h.mapping=Cr:d===Dh&&(h.mapping=Dr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Ch||d===Dh)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new _y(m.height);return p.fromEquirectangularTexture(r,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Mr=4,S_=[.125,.215,.35,.446,.526,.582],gs=20,fh=new Ey,y_=new Be;let hh=null,dh=0,ph=0,mh=!1;const ps=(1+Math.sqrt(5))/2,vr=1/ps,M_=[new et(-ps,vr,0),new et(ps,vr,0),new et(-vr,0,ps),new et(vr,0,ps),new et(0,ps,-vr),new et(0,ps,vr),new et(-1,1,-1),new et(1,1,-1),new et(-1,1,1),new et(1,1,1)];class E_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){hh=this._renderer.getRenderTarget(),dh=this._renderer.getActiveCubeFace(),ph=this._renderer.getActiveMipmapLevel(),mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=A_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=b_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(hh,dh,ph),this._renderer.xr.enabled=mh,t.scissorTest=!1,vu(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Cr||t.mapping===Dr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),hh=this._renderer.getRenderTarget(),dh=this._renderer.getActiveCubeFace(),ph=this._renderer.getActiveMipmapLevel(),mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Di,minFilter:Di,generateMipmaps:!1,type:Vo,format:Si,colorSpace:Lr,depthBuffer:!1},l=T_(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=T_(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pT(c)),this._blurMaterial=mT(c,t,i)}return l}_compileMaterial(t){const i=new wi(this._lodPlanes[0],t);this._renderer.compile(i,fh)}_sceneToCubeUV(t,i,s,l){const d=new ci(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,x=g.autoClear,S=g.toneMapping;g.getClearColor(y_),g.toneMapping=aa,g.autoClear=!1;const M=new d0({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1}),C=new wi(new Xo,M);let D=!1;const y=t.background;y?y.isColor&&(M.color.copy(y),t.background=null,D=!0):(M.color.copy(y_),D=!0);for(let _=0;_<6;_++){const I=_%3;I===0?(d.up.set(0,m[_],0),d.lookAt(p[_],0,0)):I===1?(d.up.set(0,0,m[_]),d.lookAt(0,p[_],0)):(d.up.set(0,m[_],0),d.lookAt(0,0,p[_]));const z=this._cubeSize;vu(l,I*z,_>2?z:0,z,z),g.setRenderTarget(l),D&&g.render(C,d),g.render(t,d)}C.geometry.dispose(),C.material.dispose(),g.toneMapping=S,g.autoClear=x,t.background=y}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Cr||t.mapping===Dr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=A_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=b_());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new wi(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;vu(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,fh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=M_[(l-c-1)%M_.length];this._blur(t,c-1,c,h,d)}i.autoClear=s}_blur(t,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",c),this._halfBlur(h,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,x=new wi(this._lodPlanes[l],p),S=p.uniforms,M=this._sizeLods[s]-1,C=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*gs-1),D=c/C,y=isFinite(c)?1+Math.floor(g*D):gs;y>gs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${gs}`);const _=[];let I=0;for(let L=0;L<gs;++L){const B=L/D,R=Math.exp(-B*B/2);_.push(R),L===0?I+=R:L<y&&(I+=2*R)}for(let L=0;L<_.length;L++)_[L]=_[L]/I;S.envMap.value=t.texture,S.samples.value=y,S.weights.value=_,S.latitudinal.value=h==="latitudinal",d&&(S.poleAxis.value=d);const{_lodMax:z}=this;S.dTheta.value=C,S.mipInt.value=z-s;const N=this._sizeLods[l],V=3*N*(l>z-Mr?l-z+Mr:0),H=4*(this._cubeSize-N);vu(i,V,H,3*N,2*N),m.setRenderTarget(i),m.render(x,fh)}}function pT(r){const t=[],i=[],s=[];let l=r;const c=r-Mr+1+S_.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>r-Mr?m=S_[h-r+Mr-1]:h===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,x=1+p,S=[g,g,x,g,x,x,g,g,x,x,g,x],M=6,C=6,D=3,y=2,_=1,I=new Float32Array(D*C*M),z=new Float32Array(y*C*M),N=new Float32Array(_*C*M);for(let H=0;H<M;H++){const L=H%3*2/3-1,B=H>2?0:-1,R=[L,B,0,L+2/3,B,0,L+2/3,B+1,0,L,B,0,L+2/3,B+1,0,L,B+1,0];I.set(R,D*C*H),z.set(S,y*C*H);const E=[H,H,H,H,H,H];N.set(E,_*C*H)}const V=new As;V.setAttribute("position",new Ui(I,D)),V.setAttribute("uv",new Ui(z,y)),V.setAttribute("faceIndex",new Ui(N,_)),t.push(V),l>Mr&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function T_(r,t,i){const s=new Es(r,t,i);return s.texture.mapping=Lu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function vu(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function mT(r,t,i){const s=new Float32Array(gs),l=new et(0,1,0);return new la({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:gd(),fragmentShader:`

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
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function b_(){return new la({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gd(),fragmentShader:`

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
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function A_(){return new la({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function gd(){return`

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
	`}function gT(r){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===Ch||m===Dh,g=m===Cr||m===Dr;if(p||g){let x=t.get(d);const S=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==S)return i===null&&(i=new E_(r)),x=p?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),x.texture;if(x!==void 0)return x.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new E_(r)),x=p?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),d.addEventListener("dispose",c),x.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function _T(r){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Sr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function vT(r,t,i,s){const l={},c=new WeakMap;function h(x){const S=x.target;S.index!==null&&t.remove(S.index);for(const C in S.attributes)t.remove(S.attributes[C]);S.removeEventListener("dispose",h),delete l[S.id];const M=c.get(S);M&&(t.remove(M),c.delete(S)),s.releaseStatesOfGeometry(S),S.isInstancedBufferGeometry===!0&&delete S._maxInstanceCount,i.memory.geometries--}function d(x,S){return l[S.id]===!0||(S.addEventListener("dispose",h),l[S.id]=!0,i.memory.geometries++),S}function m(x){const S=x.attributes;for(const M in S)t.update(S[M],r.ARRAY_BUFFER)}function p(x){const S=[],M=x.index,C=x.attributes.position;let D=0;if(M!==null){const I=M.array;D=M.version;for(let z=0,N=I.length;z<N;z+=3){const V=I[z+0],H=I[z+1],L=I[z+2];S.push(V,H,H,L,L,V)}}else if(C!==void 0){const I=C.array;D=C.version;for(let z=0,N=I.length/3-1;z<N;z+=3){const V=z+0,H=z+1,L=z+2;S.push(V,H,H,L,L,V)}}else return;const y=new(o0(S)?m0:p0)(S,1);y.version=D;const _=c.get(x);_&&t.remove(_),c.set(x,y)}function g(x){const S=c.get(x);if(S){const M=x.index;M!==null&&S.version<M.version&&p(x)}else p(x);return c.get(x)}return{get:d,update:m,getWireframeAttribute:g}}function xT(r,t,i){let s;function l(S){s=S}let c,h;function d(S){c=S.type,h=S.bytesPerElement}function m(S,M){r.drawElements(s,M,c,S*h),i.update(M,s,1)}function p(S,M,C){C!==0&&(r.drawElementsInstanced(s,M,c,S*h,C),i.update(M,s,C))}function g(S,M,C){if(C===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,S,0,C);let y=0;for(let _=0;_<C;_++)y+=M[_];i.update(y,s,1)}function x(S,M,C,D){if(C===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<S.length;_++)p(S[_]/h,M[_],D[_]);else{y.multiDrawElementsInstancedWEBGL(s,M,0,c,S,0,D,0,C);let _=0;for(let I=0;I<C;I++)_+=M[I]*D[I];i.update(_,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=x}function ST(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case r.TRIANGLES:i.triangles+=d*(c/3);break;case r.LINES:i.lines+=d*(c/2);break;case r.LINE_STRIP:i.lines+=d*(c-1);break;case r.LINE_LOOP:i.lines+=d*c;break;case r.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function yT(r,t,i){const s=new WeakMap,l=new Ke;function c(h,d,m){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=g!==void 0?g.length:0;let S=s.get(d);if(S===void 0||S.count!==x){let E=function(){B.dispose(),s.delete(d),d.removeEventListener("dispose",E)};var M=E;S!==void 0&&S.texture.dispose();const C=d.morphAttributes.position!==void 0,D=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let N=0;C===!0&&(N=1),D===!0&&(N=2),y===!0&&(N=3);let V=d.attributes.position.count*N,H=1;V>t.maxTextureSize&&(H=Math.ceil(V/t.maxTextureSize),V=t.maxTextureSize);const L=new Float32Array(V*H*4*x),B=new u0(L,V,H,x);B.type=na,B.needsUpdate=!0;const R=N*4;for(let P=0;P<x;P++){const ot=_[P],at=I[P],ct=z[P],ft=V*H*4*P;for(let X=0;X<ot.count;X++){const st=X*R;C===!0&&(l.fromBufferAttribute(ot,X),L[ft+st+0]=l.x,L[ft+st+1]=l.y,L[ft+st+2]=l.z,L[ft+st+3]=0),D===!0&&(l.fromBufferAttribute(at,X),L[ft+st+4]=l.x,L[ft+st+5]=l.y,L[ft+st+6]=l.z,L[ft+st+7]=0),y===!0&&(l.fromBufferAttribute(ct,X),L[ft+st+8]=l.x,L[ft+st+9]=l.y,L[ft+st+10]=l.z,L[ft+st+11]=ct.itemSize===4?l.w:1)}}S={count:x,texture:B,size:new he(V,H)},s.set(d,S),d.addEventListener("dispose",E)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",h.morphTexture,i);else{let C=0;for(let y=0;y<p.length;y++)C+=p[y];const D=d.morphTargetsRelative?1:1-C;m.getUniforms().setValue(r,"morphTargetBaseInfluence",D),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",S.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",S.size)}return{update:c}}function MT(r,t,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,x=t.get(m,g);if(l.get(x)!==p&&(t.update(x),l.set(x,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const S=m.skeleton;l.get(S)!==p&&(S.update(),l.set(S,p))}return x}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const M0=new Vn,R_=new S0(1,1),E0=new u0,T0=new ey,b0=new v0,C_=[],D_=[],w_=new Float32Array(16),U_=new Float32Array(9),L_=new Float32Array(4);function Pr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=C_[l];if(c===void 0&&(c=new Float32Array(l),C_[l]=c),t!==0){s.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,r[h].toArray(c,d)}return c}function fn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function hn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function Ou(r,t){let i=D_[t];i===void 0&&(i=new Int32Array(t),D_[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function ET(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function TT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(fn(i,t))return;r.uniform2fv(this.addr,t),hn(i,t)}}function bT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(fn(i,t))return;r.uniform3fv(this.addr,t),hn(i,t)}}function AT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(fn(i,t))return;r.uniform4fv(this.addr,t),hn(i,t)}}function RT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(fn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),hn(i,t)}else{if(fn(i,s))return;L_.set(s),r.uniformMatrix2fv(this.addr,!1,L_),hn(i,s)}}function CT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(fn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),hn(i,t)}else{if(fn(i,s))return;U_.set(s),r.uniformMatrix3fv(this.addr,!1,U_),hn(i,s)}}function DT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(fn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),hn(i,t)}else{if(fn(i,s))return;w_.set(s),r.uniformMatrix4fv(this.addr,!1,w_),hn(i,s)}}function wT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function UT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(fn(i,t))return;r.uniform2iv(this.addr,t),hn(i,t)}}function LT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(fn(i,t))return;r.uniform3iv(this.addr,t),hn(i,t)}}function NT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(fn(i,t))return;r.uniform4iv(this.addr,t),hn(i,t)}}function OT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function PT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(fn(i,t))return;r.uniform2uiv(this.addr,t),hn(i,t)}}function zT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(fn(i,t))return;r.uniform3uiv(this.addr,t),hn(i,t)}}function BT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(fn(i,t))return;r.uniform4uiv(this.addr,t),hn(i,t)}}function IT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(R_.compareFunction=r0,c=R_):c=M0,i.setTexture2D(t||c,l)}function FT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||T0,l)}function HT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||b0,l)}function GT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||E0,l)}function VT(r){switch(r){case 5126:return ET;case 35664:return TT;case 35665:return bT;case 35666:return AT;case 35674:return RT;case 35675:return CT;case 35676:return DT;case 5124:case 35670:return wT;case 35667:case 35671:return UT;case 35668:case 35672:return LT;case 35669:case 35673:return NT;case 5125:return OT;case 36294:return PT;case 36295:return zT;case 36296:return BT;case 35678:case 36198:case 36298:case 36306:case 35682:return IT;case 35679:case 36299:case 36307:return FT;case 35680:case 36300:case 36308:case 36293:return HT;case 36289:case 36303:case 36311:case 36292:return GT}}function kT(r,t){r.uniform1fv(this.addr,t)}function XT(r,t){const i=Pr(t,this.size,2);r.uniform2fv(this.addr,i)}function WT(r,t){const i=Pr(t,this.size,3);r.uniform3fv(this.addr,i)}function qT(r,t){const i=Pr(t,this.size,4);r.uniform4fv(this.addr,i)}function YT(r,t){const i=Pr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function jT(r,t){const i=Pr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function ZT(r,t){const i=Pr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function KT(r,t){r.uniform1iv(this.addr,t)}function QT(r,t){r.uniform2iv(this.addr,t)}function JT(r,t){r.uniform3iv(this.addr,t)}function $T(r,t){r.uniform4iv(this.addr,t)}function tb(r,t){r.uniform1uiv(this.addr,t)}function eb(r,t){r.uniform2uiv(this.addr,t)}function nb(r,t){r.uniform3uiv(this.addr,t)}function ib(r,t){r.uniform4uiv(this.addr,t)}function ab(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);fn(s,c)||(r.uniform1iv(this.addr,c),hn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||M0,c[h])}function sb(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);fn(s,c)||(r.uniform1iv(this.addr,c),hn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||T0,c[h])}function rb(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);fn(s,c)||(r.uniform1iv(this.addr,c),hn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||b0,c[h])}function ob(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);fn(s,c)||(r.uniform1iv(this.addr,c),hn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||E0,c[h])}function lb(r){switch(r){case 5126:return kT;case 35664:return XT;case 35665:return WT;case 35666:return qT;case 35674:return YT;case 35675:return jT;case 35676:return ZT;case 5124:case 35670:return KT;case 35667:case 35671:return QT;case 35668:case 35672:return JT;case 35669:case 35673:return $T;case 5125:return tb;case 36294:return eb;case 36295:return nb;case 36296:return ib;case 35678:case 36198:case 36298:case 36306:case 35682:return ab;case 35679:case 36299:case 36307:return sb;case 35680:case 36300:case 36308:case 36293:return rb;case 36289:case 36303:case 36311:case 36292:return ob}}class ub{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=VT(i.type)}}class cb{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=lb(i.type)}}class fb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const gh=/(\w+)(\])?(\[|\.)?/g;function N_(r,t){r.seq.push(t),r.map[t.id]=t}function hb(r,t,i){const s=r.name,l=s.length;for(gh.lastIndex=0;;){const c=gh.exec(s),h=gh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){N_(i,p===void 0?new ub(d,r,t):new cb(d,r,t));break}else{let x=i.map[d];x===void 0&&(x=new fb(d),N_(i,x)),i=x}}}class Au{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),h=t.getUniformLocation(i,c.name);hb(c,h,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function O_(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const db=37297;let pb=0;function mb(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const P_=new ce;function gb(r){we._getMatrix(P_,we.workingColorSpace,r);const t=`mat3( ${P_.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(r)){case Cu:return[t,"LinearTransferOETF"];case Pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function z_(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const h=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+mb(r.getShaderSource(t),h)}else return l}function _b(r,t){const i=gb(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function vb(r,t){let i;switch(t){case fS:i="Linear";break;case hS:i="Reinhard";break;case dS:i="Cineon";break;case pS:i="ACESFilmic";break;case gS:i="AgX";break;case _S:i="Neutral";break;case mS:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const xu=new et;function xb(){we.getLuminanceCoefficients(xu);const r=xu.x.toFixed(4),t=xu.y.toFixed(4),i=xu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function yb(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function Mb(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),h=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:r.getAttribLocation(t,h),locationSize:d}}return i}function Bo(r){return r!==""}function B_(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function I_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Eb=/^[ \t]*#include +<([\w\d./]+)>/gm;function ad(r){return r.replace(Eb,bb)}const Tb=new Map;function bb(r,t){let i=fe[t];if(i===void 0){const s=Tb.get(t);if(s!==void 0)i=fe[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return ad(i)}const Ab=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function F_(r){return r.replace(Ab,Rb)}function Rb(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function H_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function Cb(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Y_?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Xx?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ta&&(t="SHADOWMAP_TYPE_VSM"),t}function Db(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Cr:case Dr:t="ENVMAP_TYPE_CUBE";break;case Lu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function wb(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Dr:t="ENVMAP_MODE_REFRACTION";break}return t}function Ub(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case j_:t="ENVMAP_BLENDING_MULTIPLY";break;case uS:t="ENVMAP_BLENDING_MIX";break;case cS:t="ENVMAP_BLENDING_ADD";break}return t}function Lb(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),7*16)),texelHeight:s,maxMip:i}}function Nb(r,t,i,s){const l=r.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=Cb(i),p=Db(i),g=wb(i),x=Ub(i),S=Lb(i),M=Sb(i),C=yb(c),D=l.createProgram();let y,_,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C].filter(Bo).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C].filter(Bo).join(`
`),_.length>0&&(_+=`
`)):(y=[H_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),_=[H_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+x:"",S?"#define CUBEUV_TEXEL_WIDTH "+S.texelWidth:"",S?"#define CUBEUV_TEXEL_HEIGHT "+S.texelHeight:"",S?"#define CUBEUV_MAX_MIP "+S.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==aa?"#define TONE_MAPPING":"",i.toneMapping!==aa?fe.tonemapping_pars_fragment:"",i.toneMapping!==aa?vb("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,_b("linearToOutputTexel",i.outputColorSpace),xb(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Bo).join(`
`)),h=ad(h),h=B_(h,i),h=I_(h,i),d=ad(d),d=B_(d,i),d=I_(d,i),h=F_(h),d=F_(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",i.glslVersion===$g?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===$g?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const z=I+y+h,N=I+_+d,V=O_(l,l.VERTEX_SHADER,z),H=O_(l,l.FRAGMENT_SHADER,N);l.attachShader(D,V),l.attachShader(D,H),i.index0AttributeName!==void 0?l.bindAttribLocation(D,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(D,0,"position"),l.linkProgram(D);function L(P){if(r.debug.checkShaderErrors){const ot=l.getProgramInfoLog(D).trim(),at=l.getShaderInfoLog(V).trim(),ct=l.getShaderInfoLog(H).trim();let ft=!0,X=!0;if(l.getProgramParameter(D,l.LINK_STATUS)===!1)if(ft=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,D,V,H);else{const st=z_(l,V,"vertex"),j=z_(l,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(D,l.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+ot+`
`+st+`
`+j)}else ot!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ot):(at===""||ct==="")&&(X=!1);X&&(P.diagnostics={runnable:ft,programLog:ot,vertexShader:{log:at,prefix:y},fragmentShader:{log:ct,prefix:_}})}l.deleteShader(V),l.deleteShader(H),B=new Au(l,D),R=Mb(l,D)}let B;this.getUniforms=function(){return B===void 0&&L(this),B};let R;this.getAttributes=function(){return R===void 0&&L(this),R};let E=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=l.getProgramParameter(D,db)),E},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=pb++,this.cacheKey=t,this.usedTimes=1,this.program=D,this.vertexShader=V,this.fragmentShader=H,this}let Ob=0;class Pb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new zb(t),i.set(t,s)),s}}class zb{constructor(t){this.id=Ob++,this.code=t,this.usedTimes=0}}function Bb(r,t,i,s,l,c,h){const d=new f0,m=new Pb,p=new Set,g=[],x=l.logarithmicDepthBuffer,S=l.vertexTextures;let M=l.precision;const C={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function D(R){return p.add(R),R===0?"uv":`uv${R}`}function y(R,E,P,ot,at){const ct=ot.fog,ft=at.geometry,X=R.isMeshStandardMaterial?ot.environment:null,st=(R.isMeshStandardMaterial?i:t).get(R.envMap||X),j=st&&st.mapping===Lu?st.image.height:null,yt=C[R.type];R.precision!==null&&(M=l.getMaxPrecision(R.precision),M!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",M,"instead."));const w=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,nt=w!==void 0?w.length:0;let Tt=0;ft.morphAttributes.position!==void 0&&(Tt=1),ft.morphAttributes.normal!==void 0&&(Tt=2),ft.morphAttributes.color!==void 0&&(Tt=3);let vt,Y,ht,xt;if(yt){const Ae=Ci[yt];vt=Ae.vertexShader,Y=Ae.fragmentShader}else vt=R.vertexShader,Y=R.fragmentShader,m.update(R),ht=m.getVertexShaderID(R),xt=m.getFragmentShaderID(R);const bt=r.getRenderTarget(),Rt=r.state.buffers.depth.getReversed(),zt=at.isInstancedMesh===!0,Vt=at.isBatchedMesh===!0,ge=!!R.map,le=!!R.matcap,be=!!st,F=!!R.aoMap,It=!!R.lightMap,jt=!!R.bumpMap,Kt=!!R.normalMap,Bt=!!R.displacementMap,ve=!!R.emissiveMap,kt=!!R.metalnessMap,U=!!R.roughnessMap,T=R.anisotropy>0,tt=R.clearcoat>0,dt=R.dispersion>0,Mt=R.iridescence>0,pt=R.sheen>0,Wt=R.transmission>0,wt=T&&!!R.anisotropyMap,Ft=tt&&!!R.clearcoatMap,xe=tt&&!!R.clearcoatNormalMap,At=tt&&!!R.clearcoatRoughnessMap,Ht=Mt&&!!R.iridescenceMap,Qt=Mt&&!!R.iridescenceThicknessMap,qt=pt&&!!R.sheenColorMap,Gt=pt&&!!R.sheenRoughnessMap,oe=!!R.specularMap,$t=!!R.specularColorMap,Ue=!!R.specularIntensityMap,W=Wt&&!!R.transmissionMap,Nt=Wt&&!!R.thicknessMap,rt=!!R.gradientMap,gt=!!R.alphaMap,Dt=R.alphaTest>0,Ut=!!R.alphaHash,ne=!!R.extensions;let Ve=aa;R.toneMapped&&(bt===null||bt.isXRRenderTarget===!0)&&(Ve=r.toneMapping);const nn={shaderID:yt,shaderType:R.type,shaderName:R.name,vertexShader:vt,fragmentShader:Y,defines:R.defines,customVertexShaderID:ht,customFragmentShaderID:xt,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:M,batching:Vt,batchingColor:Vt&&at._colorsTexture!==null,instancing:zt,instancingColor:zt&&at.instanceColor!==null,instancingMorph:zt&&at.morphTexture!==null,supportsVertexTextures:S,outputColorSpace:bt===null?r.outputColorSpace:bt.isXRRenderTarget===!0?bt.texture.colorSpace:Lr,alphaToCoverage:!!R.alphaToCoverage,map:ge,matcap:le,envMap:be,envMapMode:be&&st.mapping,envMapCubeUVHeight:j,aoMap:F,lightMap:It,bumpMap:jt,normalMap:Kt,displacementMap:S&&Bt,emissiveMap:ve,normalMapObjectSpace:Kt&&R.normalMapType===MS,normalMapTangentSpace:Kt&&R.normalMapType===yS,metalnessMap:kt,roughnessMap:U,anisotropy:T,anisotropyMap:wt,clearcoat:tt,clearcoatMap:Ft,clearcoatNormalMap:xe,clearcoatRoughnessMap:At,dispersion:dt,iridescence:Mt,iridescenceMap:Ht,iridescenceThicknessMap:Qt,sheen:pt,sheenColorMap:qt,sheenRoughnessMap:Gt,specularMap:oe,specularColorMap:$t,specularIntensityMap:Ue,transmission:Wt,transmissionMap:W,thicknessMap:Nt,gradientMap:rt,opaque:R.transparent===!1&&R.blending===Tr&&R.alphaToCoverage===!1,alphaMap:gt,alphaTest:Dt,alphaHash:Ut,combine:R.combine,mapUv:ge&&D(R.map.channel),aoMapUv:F&&D(R.aoMap.channel),lightMapUv:It&&D(R.lightMap.channel),bumpMapUv:jt&&D(R.bumpMap.channel),normalMapUv:Kt&&D(R.normalMap.channel),displacementMapUv:Bt&&D(R.displacementMap.channel),emissiveMapUv:ve&&D(R.emissiveMap.channel),metalnessMapUv:kt&&D(R.metalnessMap.channel),roughnessMapUv:U&&D(R.roughnessMap.channel),anisotropyMapUv:wt&&D(R.anisotropyMap.channel),clearcoatMapUv:Ft&&D(R.clearcoatMap.channel),clearcoatNormalMapUv:xe&&D(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&D(R.clearcoatRoughnessMap.channel),iridescenceMapUv:Ht&&D(R.iridescenceMap.channel),iridescenceThicknessMapUv:Qt&&D(R.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&D(R.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&D(R.sheenRoughnessMap.channel),specularMapUv:oe&&D(R.specularMap.channel),specularColorMapUv:$t&&D(R.specularColorMap.channel),specularIntensityMapUv:Ue&&D(R.specularIntensityMap.channel),transmissionMapUv:W&&D(R.transmissionMap.channel),thicknessMapUv:Nt&&D(R.thicknessMap.channel),alphaMapUv:gt&&D(R.alphaMap.channel),vertexTangents:!!ft.attributes.tangent&&(Kt||T),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,pointsUvs:at.isPoints===!0&&!!ft.attributes.uv&&(ge||gt),fog:!!ct,useFog:R.fog===!0,fogExp2:!!ct&&ct.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:x,reverseDepthBuffer:Rt,skinning:at.isSkinnedMesh===!0,morphTargets:ft.morphAttributes.position!==void 0,morphNormals:ft.morphAttributes.normal!==void 0,morphColors:ft.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:Tt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:R.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ve,decodeVideoTexture:ge&&R.map.isVideoTexture===!0&&we.getTransfer(R.map.colorSpace)===Pe,decodeVideoTextureEmissive:ve&&R.emissiveMap.isVideoTexture===!0&&we.getTransfer(R.emissiveMap.colorSpace)===Pe,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===ea,flipSided:R.side===Gn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:ne&&R.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&R.extensions.multiDraw===!0||Vt)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return nn.vertexUv1s=p.has(1),nn.vertexUv2s=p.has(2),nn.vertexUv3s=p.has(3),p.clear(),nn}function _(R){const E=[];if(R.shaderID?E.push(R.shaderID):(E.push(R.customVertexShaderID),E.push(R.customFragmentShaderID)),R.defines!==void 0)for(const P in R.defines)E.push(P),E.push(R.defines[P]);return R.isRawShaderMaterial===!1&&(I(E,R),z(E,R),E.push(r.outputColorSpace)),E.push(R.customProgramCacheKey),E.join()}function I(R,E){R.push(E.precision),R.push(E.outputColorSpace),R.push(E.envMapMode),R.push(E.envMapCubeUVHeight),R.push(E.mapUv),R.push(E.alphaMapUv),R.push(E.lightMapUv),R.push(E.aoMapUv),R.push(E.bumpMapUv),R.push(E.normalMapUv),R.push(E.displacementMapUv),R.push(E.emissiveMapUv),R.push(E.metalnessMapUv),R.push(E.roughnessMapUv),R.push(E.anisotropyMapUv),R.push(E.clearcoatMapUv),R.push(E.clearcoatNormalMapUv),R.push(E.clearcoatRoughnessMapUv),R.push(E.iridescenceMapUv),R.push(E.iridescenceThicknessMapUv),R.push(E.sheenColorMapUv),R.push(E.sheenRoughnessMapUv),R.push(E.specularMapUv),R.push(E.specularColorMapUv),R.push(E.specularIntensityMapUv),R.push(E.transmissionMapUv),R.push(E.thicknessMapUv),R.push(E.combine),R.push(E.fogExp2),R.push(E.sizeAttenuation),R.push(E.morphTargetsCount),R.push(E.morphAttributeCount),R.push(E.numDirLights),R.push(E.numPointLights),R.push(E.numSpotLights),R.push(E.numSpotLightMaps),R.push(E.numHemiLights),R.push(E.numRectAreaLights),R.push(E.numDirLightShadows),R.push(E.numPointLightShadows),R.push(E.numSpotLightShadows),R.push(E.numSpotLightShadowsWithMaps),R.push(E.numLightProbes),R.push(E.shadowMapType),R.push(E.toneMapping),R.push(E.numClippingPlanes),R.push(E.numClipIntersection),R.push(E.depthPacking)}function z(R,E){d.disableAll(),E.supportsVertexTextures&&d.enable(0),E.instancing&&d.enable(1),E.instancingColor&&d.enable(2),E.instancingMorph&&d.enable(3),E.matcap&&d.enable(4),E.envMap&&d.enable(5),E.normalMapObjectSpace&&d.enable(6),E.normalMapTangentSpace&&d.enable(7),E.clearcoat&&d.enable(8),E.iridescence&&d.enable(9),E.alphaTest&&d.enable(10),E.vertexColors&&d.enable(11),E.vertexAlphas&&d.enable(12),E.vertexUv1s&&d.enable(13),E.vertexUv2s&&d.enable(14),E.vertexUv3s&&d.enable(15),E.vertexTangents&&d.enable(16),E.anisotropy&&d.enable(17),E.alphaHash&&d.enable(18),E.batching&&d.enable(19),E.dispersion&&d.enable(20),E.batchingColor&&d.enable(21),R.push(d.mask),d.disableAll(),E.fog&&d.enable(0),E.useFog&&d.enable(1),E.flatShading&&d.enable(2),E.logarithmicDepthBuffer&&d.enable(3),E.reverseDepthBuffer&&d.enable(4),E.skinning&&d.enable(5),E.morphTargets&&d.enable(6),E.morphNormals&&d.enable(7),E.morphColors&&d.enable(8),E.premultipliedAlpha&&d.enable(9),E.shadowMapEnabled&&d.enable(10),E.doubleSided&&d.enable(11),E.flipSided&&d.enable(12),E.useDepthPacking&&d.enable(13),E.dithering&&d.enable(14),E.transmission&&d.enable(15),E.sheen&&d.enable(16),E.opaque&&d.enable(17),E.pointsUvs&&d.enable(18),E.decodeVideoTexture&&d.enable(19),E.decodeVideoTextureEmissive&&d.enable(20),E.alphaToCoverage&&d.enable(21),R.push(d.mask)}function N(R){const E=C[R.type];let P;if(E){const ot=Ci[E];P=dy.clone(ot.uniforms)}else P=R.uniforms;return P}function V(R,E){let P;for(let ot=0,at=g.length;ot<at;ot++){const ct=g[ot];if(ct.cacheKey===E){P=ct,++P.usedTimes;break}}return P===void 0&&(P=new Nb(r,E,R,c),g.push(P)),P}function H(R){if(--R.usedTimes===0){const E=g.indexOf(R);g[E]=g[g.length-1],g.pop(),R.destroy()}}function L(R){m.remove(R)}function B(){m.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:N,acquireProgram:V,releaseProgram:H,releaseShaderCache:L,programs:g,dispose:B}}function Ib(){let r=new WeakMap;function t(h){return r.has(h)}function i(h){let d=r.get(h);return d===void 0&&(d={},r.set(h,d)),d}function s(h){r.delete(h)}function l(h,d,m){r.get(h)[d]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function Fb(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function G_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function V_(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(x,S,M,C,D,y){let _=r[t];return _===void 0?(_={id:x.id,object:x,geometry:S,material:M,groupOrder:C,renderOrder:x.renderOrder,z:D,group:y},r[t]=_):(_.id=x.id,_.object=x,_.geometry=S,_.material=M,_.groupOrder=C,_.renderOrder=x.renderOrder,_.z=D,_.group=y),t++,_}function d(x,S,M,C,D,y){const _=h(x,S,M,C,D,y);M.transmission>0?s.push(_):M.transparent===!0?l.push(_):i.push(_)}function m(x,S,M,C,D,y){const _=h(x,S,M,C,D,y);M.transmission>0?s.unshift(_):M.transparent===!0?l.unshift(_):i.unshift(_)}function p(x,S){i.length>1&&i.sort(x||Fb),s.length>1&&s.sort(S||G_),l.length>1&&l.sort(S||G_)}function g(){for(let x=t,S=r.length;x<S;x++){const M=r[x];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function Hb(){let r=new WeakMap;function t(s,l){const c=r.get(s);let h;return c===void 0?(h=new V_,r.set(s,[h])):l>=c.length?(h=new V_,c.push(h)):h=c[l],h}function i(){r=new WeakMap}return{get:t,dispose:i}}function Gb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new et,color:new Be};break;case"SpotLight":i={position:new et,direction:new et,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new et,color:new Be,distance:0,decay:0};break;case"HemisphereLight":i={direction:new et,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":i={color:new Be,position:new et,halfWidth:new et,halfHeight:new et};break}return r[t.id]=i,i}}}function Vb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let kb=0;function Xb(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Wb(r){const t=new Gb,i=Vb(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new et);const l=new et,c=new en,h=new en;function d(p){let g=0,x=0,S=0;for(let R=0;R<9;R++)s.probe[R].set(0,0,0);let M=0,C=0,D=0,y=0,_=0,I=0,z=0,N=0,V=0,H=0,L=0;p.sort(Xb);for(let R=0,E=p.length;R<E;R++){const P=p[R],ot=P.color,at=P.intensity,ct=P.distance,ft=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)g+=ot.r*at,x+=ot.g*at,S+=ot.b*at;else if(P.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(P.sh.coefficients[X],at);L++}else if(P.isDirectionalLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const st=P.shadow,j=i.get(P);j.shadowIntensity=st.intensity,j.shadowBias=st.bias,j.shadowNormalBias=st.normalBias,j.shadowRadius=st.radius,j.shadowMapSize=st.mapSize,s.directionalShadow[M]=j,s.directionalShadowMap[M]=ft,s.directionalShadowMatrix[M]=P.shadow.matrix,I++}s.directional[M]=X,M++}else if(P.isSpotLight){const X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(ot).multiplyScalar(at),X.distance=ct,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,s.spot[D]=X;const st=P.shadow;if(P.map&&(s.spotLightMap[V]=P.map,V++,st.updateMatrices(P),P.castShadow&&H++),s.spotLightMatrix[D]=st.matrix,P.castShadow){const j=i.get(P);j.shadowIntensity=st.intensity,j.shadowBias=st.bias,j.shadowNormalBias=st.normalBias,j.shadowRadius=st.radius,j.shadowMapSize=st.mapSize,s.spotShadow[D]=j,s.spotShadowMap[D]=ft,N++}D++}else if(P.isRectAreaLight){const X=t.get(P);X.color.copy(ot).multiplyScalar(at),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),s.rectArea[y]=X,y++}else if(P.isPointLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const st=P.shadow,j=i.get(P);j.shadowIntensity=st.intensity,j.shadowBias=st.bias,j.shadowNormalBias=st.normalBias,j.shadowRadius=st.radius,j.shadowMapSize=st.mapSize,j.shadowCameraNear=st.camera.near,j.shadowCameraFar=st.camera.far,s.pointShadow[C]=j,s.pointShadowMap[C]=ft,s.pointShadowMatrix[C]=P.shadow.matrix,z++}s.point[C]=X,C++}else if(P.isHemisphereLight){const X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(at),X.groundColor.copy(P.groundColor).multiplyScalar(at),s.hemi[_]=X,_++}}y>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_FLOAT_1,s.rectAreaLTC2=Lt.LTC_FLOAT_2):(s.rectAreaLTC1=Lt.LTC_HALF_1,s.rectAreaLTC2=Lt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=x,s.ambient[2]=S;const B=s.hash;(B.directionalLength!==M||B.pointLength!==C||B.spotLength!==D||B.rectAreaLength!==y||B.hemiLength!==_||B.numDirectionalShadows!==I||B.numPointShadows!==z||B.numSpotShadows!==N||B.numSpotMaps!==V||B.numLightProbes!==L)&&(s.directional.length=M,s.spot.length=D,s.rectArea.length=y,s.point.length=C,s.hemi.length=_,s.directionalShadow.length=I,s.directionalShadowMap.length=I,s.pointShadow.length=z,s.pointShadowMap.length=z,s.spotShadow.length=N,s.spotShadowMap.length=N,s.directionalShadowMatrix.length=I,s.pointShadowMatrix.length=z,s.spotLightMatrix.length=N+V-H,s.spotLightMap.length=V,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=L,B.directionalLength=M,B.pointLength=C,B.spotLength=D,B.rectAreaLength=y,B.hemiLength=_,B.numDirectionalShadows=I,B.numPointShadows=z,B.numSpotShadows=N,B.numSpotMaps=V,B.numLightProbes=L,s.version=kb++)}function m(p,g){let x=0,S=0,M=0,C=0,D=0;const y=g.matrixWorldInverse;for(let _=0,I=p.length;_<I;_++){const z=p[_];if(z.isDirectionalLight){const N=s.directional[x];N.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(y),x++}else if(z.isSpotLight){const N=s.spot[M];N.position.setFromMatrixPosition(z.matrixWorld),N.position.applyMatrix4(y),N.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(y),M++}else if(z.isRectAreaLight){const N=s.rectArea[C];N.position.setFromMatrixPosition(z.matrixWorld),N.position.applyMatrix4(y),h.identity(),c.copy(z.matrixWorld),c.premultiply(y),h.extractRotation(c),N.halfWidth.set(z.width*.5,0,0),N.halfHeight.set(0,z.height*.5,0),N.halfWidth.applyMatrix4(h),N.halfHeight.applyMatrix4(h),C++}else if(z.isPointLight){const N=s.point[S];N.position.setFromMatrixPosition(z.matrixWorld),N.position.applyMatrix4(y),S++}else if(z.isHemisphereLight){const N=s.hemi[D];N.direction.setFromMatrixPosition(z.matrixWorld),N.direction.transformDirection(y),D++}}}return{setup:d,setupView:m,state:s}}function k_(r){const t=new Wb(r),i=[],s=[];function l(g){p.camera=g,i.length=0,s.length=0}function c(g){i.push(g)}function h(g){s.push(g)}function d(){t.setup(i)}function m(g){t.setupView(i,g)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function qb(r){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new k_(r),t.set(l,[d])):c>=h.length?(d=new k_(r),h.push(d)):d=h[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const Yb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jb=`uniform sampler2D shadow_pass;
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
}`;function Zb(r,t,i){let s=new x0;const l=new he,c=new he,h=new Ke,d=new yy({depthPacking:SS}),m=new My,p={},g=i.maxTextureSize,x={[Ha]:Gn,[Gn]:Ha,[ea]:ea},S=new la({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:Yb,fragmentShader:jb}),M=S.clone();M.defines.HORIZONTAL_PASS=1;const C=new As;C.setAttribute("position",new Ui(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new wi(C,S),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Y_;let _=this.type;this.render=function(H,L,B){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||H.length===0)return;const R=r.getRenderTarget(),E=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),ot=r.state;ot.setBlending(Fa),ot.buffers.color.setClear(1,1,1,1),ot.buffers.depth.setTest(!0),ot.setScissorTest(!1);const at=_!==ta&&this.type===ta,ct=_===ta&&this.type!==ta;for(let ft=0,X=H.length;ft<X;ft++){const st=H[ft],j=st.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;l.copy(j.mapSize);const yt=j.getFrameExtents();if(l.multiply(yt),c.copy(j.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/yt.x),l.x=c.x*yt.x,j.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/yt.y),l.y=c.y*yt.y,j.mapSize.y=c.y)),j.map===null||at===!0||ct===!0){const nt=this.type!==ta?{minFilter:yi,magFilter:yi}:{};j.map!==null&&j.map.dispose(),j.map=new Es(l.x,l.y,nt),j.map.texture.name=st.name+".shadowMap",j.camera.updateProjectionMatrix()}r.setRenderTarget(j.map),r.clear();const w=j.getViewportCount();for(let nt=0;nt<w;nt++){const Tt=j.getViewport(nt);h.set(c.x*Tt.x,c.y*Tt.y,c.x*Tt.z,c.y*Tt.w),ot.viewport(h),j.updateMatrices(st,nt),s=j.getFrustum(),N(L,B,j.camera,st,this.type)}j.isPointLightShadow!==!0&&this.type===ta&&I(j,B),j.needsUpdate=!1}_=this.type,y.needsUpdate=!1,r.setRenderTarget(R,E,P)};function I(H,L){const B=t.update(D);S.defines.VSM_SAMPLES!==H.blurSamples&&(S.defines.VSM_SAMPLES=H.blurSamples,M.defines.VSM_SAMPLES=H.blurSamples,S.needsUpdate=!0,M.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new Es(l.x,l.y)),S.uniforms.shadow_pass.value=H.map.texture,S.uniforms.resolution.value=H.mapSize,S.uniforms.radius.value=H.radius,r.setRenderTarget(H.mapPass),r.clear(),r.renderBufferDirect(L,null,B,S,D,null),M.uniforms.shadow_pass.value=H.mapPass.texture,M.uniforms.resolution.value=H.mapSize,M.uniforms.radius.value=H.radius,r.setRenderTarget(H.map),r.clear(),r.renderBufferDirect(L,null,B,M,D,null)}function z(H,L,B,R){let E=null;const P=B.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(P!==void 0)E=P;else if(E=B.isPointLight===!0?m:d,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const ot=E.uuid,at=L.uuid;let ct=p[ot];ct===void 0&&(ct={},p[ot]=ct);let ft=ct[at];ft===void 0&&(ft=E.clone(),ct[at]=ft,L.addEventListener("dispose",V)),E=ft}if(E.visible=L.visible,E.wireframe=L.wireframe,R===ta?E.side=L.shadowSide!==null?L.shadowSide:L.side:E.side=L.shadowSide!==null?L.shadowSide:x[L.side],E.alphaMap=L.alphaMap,E.alphaTest=L.alphaTest,E.map=L.map,E.clipShadows=L.clipShadows,E.clippingPlanes=L.clippingPlanes,E.clipIntersection=L.clipIntersection,E.displacementMap=L.displacementMap,E.displacementScale=L.displacementScale,E.displacementBias=L.displacementBias,E.wireframeLinewidth=L.wireframeLinewidth,E.linewidth=L.linewidth,B.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const ot=r.properties.get(E);ot.light=B}return E}function N(H,L,B,R,E){if(H.visible===!1)return;if(H.layers.test(L.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&E===ta)&&(!H.frustumCulled||s.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,H.matrixWorld);const at=t.update(H),ct=H.material;if(Array.isArray(ct)){const ft=at.groups;for(let X=0,st=ft.length;X<st;X++){const j=ft[X],yt=ct[j.materialIndex];if(yt&&yt.visible){const w=z(H,yt,R,E);H.onBeforeShadow(r,H,L,B,at,w,j),r.renderBufferDirect(B,null,at,w,H,j),H.onAfterShadow(r,H,L,B,at,w,j)}}}else if(ct.visible){const ft=z(H,ct,R,E);H.onBeforeShadow(r,H,L,B,at,ft,null),r.renderBufferDirect(B,null,at,ft,H,null),H.onAfterShadow(r,H,L,B,at,ft,null)}}const ot=H.children;for(let at=0,ct=ot.length;at<ct;at++)N(ot[at],L,B,R,E)}function V(H){H.target.removeEventListener("dispose",V);for(const B in p){const R=p[B],E=H.target.uuid;E in R&&(R[E].dispose(),delete R[E])}}}const Kb={[yh]:Mh,[Eh]:Ah,[Th]:Rh,[Rr]:bh,[Mh]:yh,[Ah]:Eh,[Rh]:Th,[bh]:Rr};function Qb(r,t){function i(){let W=!1;const Nt=new Ke;let rt=null;const gt=new Ke(0,0,0,0);return{setMask:function(Dt){rt!==Dt&&!W&&(r.colorMask(Dt,Dt,Dt,Dt),rt=Dt)},setLocked:function(Dt){W=Dt},setClear:function(Dt,Ut,ne,Ve,nn){nn===!0&&(Dt*=Ve,Ut*=Ve,ne*=Ve),Nt.set(Dt,Ut,ne,Ve),gt.equals(Nt)===!1&&(r.clearColor(Dt,Ut,ne,Ve),gt.copy(Nt))},reset:function(){W=!1,rt=null,gt.set(-1,0,0,0)}}}function s(){let W=!1,Nt=!1,rt=null,gt=null,Dt=null;return{setReversed:function(Ut){if(Nt!==Ut){const ne=t.get("EXT_clip_control");Nt?ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.ZERO_TO_ONE_EXT):ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.NEGATIVE_ONE_TO_ONE_EXT);const Ve=Dt;Dt=null,this.setClear(Ve)}Nt=Ut},getReversed:function(){return Nt},setTest:function(Ut){Ut?bt(r.DEPTH_TEST):Rt(r.DEPTH_TEST)},setMask:function(Ut){rt!==Ut&&!W&&(r.depthMask(Ut),rt=Ut)},setFunc:function(Ut){if(Nt&&(Ut=Kb[Ut]),gt!==Ut){switch(Ut){case yh:r.depthFunc(r.NEVER);break;case Mh:r.depthFunc(r.ALWAYS);break;case Eh:r.depthFunc(r.LESS);break;case Rr:r.depthFunc(r.LEQUAL);break;case Th:r.depthFunc(r.EQUAL);break;case bh:r.depthFunc(r.GEQUAL);break;case Ah:r.depthFunc(r.GREATER);break;case Rh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}gt=Ut}},setLocked:function(Ut){W=Ut},setClear:function(Ut){Dt!==Ut&&(Nt&&(Ut=1-Ut),r.clearDepth(Ut),Dt=Ut)},reset:function(){W=!1,rt=null,gt=null,Dt=null,Nt=!1}}}function l(){let W=!1,Nt=null,rt=null,gt=null,Dt=null,Ut=null,ne=null,Ve=null,nn=null;return{setTest:function(Ae){W||(Ae?bt(r.STENCIL_TEST):Rt(r.STENCIL_TEST))},setMask:function(Ae){Nt!==Ae&&!W&&(r.stencilMask(Ae),Nt=Ae)},setFunc:function(Ae,Cn,Dn){(rt!==Ae||gt!==Cn||Dt!==Dn)&&(r.stencilFunc(Ae,Cn,Dn),rt=Ae,gt=Cn,Dt=Dn)},setOp:function(Ae,Cn,Dn){(Ut!==Ae||ne!==Cn||Ve!==Dn)&&(r.stencilOp(Ae,Cn,Dn),Ut=Ae,ne=Cn,Ve=Dn)},setLocked:function(Ae){W=Ae},setClear:function(Ae){nn!==Ae&&(r.clearStencil(Ae),nn=Ae)},reset:function(){W=!1,Nt=null,rt=null,gt=null,Dt=null,Ut=null,ne=null,Ve=null,nn=null}}}const c=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},x={},S=new WeakMap,M=[],C=null,D=!1,y=null,_=null,I=null,z=null,N=null,V=null,H=null,L=new Be(0,0,0),B=0,R=!1,E=null,P=null,ot=null,at=null,ct=null;const ft=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,st=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=st>=1):j.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=st>=2);let yt=null,w={};const nt=r.getParameter(r.SCISSOR_BOX),Tt=r.getParameter(r.VIEWPORT),vt=new Ke().fromArray(nt),Y=new Ke().fromArray(Tt);function ht(W,Nt,rt,gt){const Dt=new Uint8Array(4),Ut=r.createTexture();r.bindTexture(W,Ut),r.texParameteri(W,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(W,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ne=0;ne<rt;ne++)W===r.TEXTURE_3D||W===r.TEXTURE_2D_ARRAY?r.texImage3D(Nt,0,r.RGBA,1,1,gt,0,r.RGBA,r.UNSIGNED_BYTE,Dt):r.texImage2D(Nt+ne,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Dt);return Ut}const xt={};xt[r.TEXTURE_2D]=ht(r.TEXTURE_2D,r.TEXTURE_2D,1),xt[r.TEXTURE_CUBE_MAP]=ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[r.TEXTURE_2D_ARRAY]=ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),xt[r.TEXTURE_3D]=ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),bt(r.DEPTH_TEST),h.setFunc(Rr),jt(!1),Kt(Yg),bt(r.CULL_FACE),F(Fa);function bt(W){g[W]!==!0&&(r.enable(W),g[W]=!0)}function Rt(W){g[W]!==!1&&(r.disable(W),g[W]=!1)}function zt(W,Nt){return x[W]!==Nt?(r.bindFramebuffer(W,Nt),x[W]=Nt,W===r.DRAW_FRAMEBUFFER&&(x[r.FRAMEBUFFER]=Nt),W===r.FRAMEBUFFER&&(x[r.DRAW_FRAMEBUFFER]=Nt),!0):!1}function Vt(W,Nt){let rt=M,gt=!1;if(W){rt=S.get(Nt),rt===void 0&&(rt=[],S.set(Nt,rt));const Dt=W.textures;if(rt.length!==Dt.length||rt[0]!==r.COLOR_ATTACHMENT0){for(let Ut=0,ne=Dt.length;Ut<ne;Ut++)rt[Ut]=r.COLOR_ATTACHMENT0+Ut;rt.length=Dt.length,gt=!0}}else rt[0]!==r.BACK&&(rt[0]=r.BACK,gt=!0);gt&&r.drawBuffers(rt)}function ge(W){return C!==W?(r.useProgram(W),C=W,!0):!1}const le={[ms]:r.FUNC_ADD,[qx]:r.FUNC_SUBTRACT,[Yx]:r.FUNC_REVERSE_SUBTRACT};le[jx]=r.MIN,le[Zx]=r.MAX;const be={[Kx]:r.ZERO,[Qx]:r.ONE,[Jx]:r.SRC_COLOR,[xh]:r.SRC_ALPHA,[aS]:r.SRC_ALPHA_SATURATE,[nS]:r.DST_COLOR,[tS]:r.DST_ALPHA,[$x]:r.ONE_MINUS_SRC_COLOR,[Sh]:r.ONE_MINUS_SRC_ALPHA,[iS]:r.ONE_MINUS_DST_COLOR,[eS]:r.ONE_MINUS_DST_ALPHA,[sS]:r.CONSTANT_COLOR,[rS]:r.ONE_MINUS_CONSTANT_COLOR,[oS]:r.CONSTANT_ALPHA,[lS]:r.ONE_MINUS_CONSTANT_ALPHA};function F(W,Nt,rt,gt,Dt,Ut,ne,Ve,nn,Ae){if(W===Fa){D===!0&&(Rt(r.BLEND),D=!1);return}if(D===!1&&(bt(r.BLEND),D=!0),W!==Wx){if(W!==y||Ae!==R){if((_!==ms||N!==ms)&&(r.blendEquation(r.FUNC_ADD),_=ms,N=ms),Ae)switch(W){case Tr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jg:r.blendFunc(r.ONE,r.ONE);break;case Zg:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Kg:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Tr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jg:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Zg:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Kg:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}I=null,z=null,V=null,H=null,L.set(0,0,0),B=0,y=W,R=Ae}return}Dt=Dt||Nt,Ut=Ut||rt,ne=ne||gt,(Nt!==_||Dt!==N)&&(r.blendEquationSeparate(le[Nt],le[Dt]),_=Nt,N=Dt),(rt!==I||gt!==z||Ut!==V||ne!==H)&&(r.blendFuncSeparate(be[rt],be[gt],be[Ut],be[ne]),I=rt,z=gt,V=Ut,H=ne),(Ve.equals(L)===!1||nn!==B)&&(r.blendColor(Ve.r,Ve.g,Ve.b,nn),L.copy(Ve),B=nn),y=W,R=!1}function It(W,Nt){W.side===ea?Rt(r.CULL_FACE):bt(r.CULL_FACE);let rt=W.side===Gn;Nt&&(rt=!rt),jt(rt),W.blending===Tr&&W.transparent===!1?F(Fa):F(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),h.setFunc(W.depthFunc),h.setTest(W.depthTest),h.setMask(W.depthWrite),c.setMask(W.colorWrite);const gt=W.stencilWrite;d.setTest(gt),gt&&(d.setMask(W.stencilWriteMask),d.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),d.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),ve(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?bt(r.SAMPLE_ALPHA_TO_COVERAGE):Rt(r.SAMPLE_ALPHA_TO_COVERAGE)}function jt(W){E!==W&&(W?r.frontFace(r.CW):r.frontFace(r.CCW),E=W)}function Kt(W){W!==Vx?(bt(r.CULL_FACE),W!==P&&(W===Yg?r.cullFace(r.BACK):W===kx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Rt(r.CULL_FACE),P=W}function Bt(W){W!==ot&&(X&&r.lineWidth(W),ot=W)}function ve(W,Nt,rt){W?(bt(r.POLYGON_OFFSET_FILL),(at!==Nt||ct!==rt)&&(r.polygonOffset(Nt,rt),at=Nt,ct=rt)):Rt(r.POLYGON_OFFSET_FILL)}function kt(W){W?bt(r.SCISSOR_TEST):Rt(r.SCISSOR_TEST)}function U(W){W===void 0&&(W=r.TEXTURE0+ft-1),yt!==W&&(r.activeTexture(W),yt=W)}function T(W,Nt,rt){rt===void 0&&(yt===null?rt=r.TEXTURE0+ft-1:rt=yt);let gt=w[rt];gt===void 0&&(gt={type:void 0,texture:void 0},w[rt]=gt),(gt.type!==W||gt.texture!==Nt)&&(yt!==rt&&(r.activeTexture(rt),yt=rt),r.bindTexture(W,Nt||xt[W]),gt.type=W,gt.texture=Nt)}function tt(){const W=w[yt];W!==void 0&&W.type!==void 0&&(r.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function dt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function pt(){try{r.texSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function wt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ft(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function xe(){try{r.texStorage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ht(){try{r.texImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Qt(){try{r.texImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function qt(W){vt.equals(W)===!1&&(r.scissor(W.x,W.y,W.z,W.w),vt.copy(W))}function Gt(W){Y.equals(W)===!1&&(r.viewport(W.x,W.y,W.z,W.w),Y.copy(W))}function oe(W,Nt){let rt=p.get(Nt);rt===void 0&&(rt=new WeakMap,p.set(Nt,rt));let gt=rt.get(W);gt===void 0&&(gt=r.getUniformBlockIndex(Nt,W.name),rt.set(W,gt))}function $t(W,Nt){const gt=p.get(Nt).get(W);m.get(Nt)!==gt&&(r.uniformBlockBinding(Nt,gt,W.__bindingPointIndex),m.set(Nt,gt))}function Ue(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),h.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},yt=null,w={},x={},S=new WeakMap,M=[],C=null,D=!1,y=null,_=null,I=null,z=null,N=null,V=null,H=null,L=new Be(0,0,0),B=0,R=!1,E=null,P=null,ot=null,at=null,ct=null,vt.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:bt,disable:Rt,bindFramebuffer:zt,drawBuffers:Vt,useProgram:ge,setBlending:F,setMaterial:It,setFlipSided:jt,setCullFace:Kt,setLineWidth:Bt,setPolygonOffset:ve,setScissorTest:kt,activeTexture:U,bindTexture:T,unbindTexture:tt,compressedTexImage2D:dt,compressedTexImage3D:Mt,texImage2D:Ht,texImage3D:Qt,updateUBOMapping:oe,uniformBlockBinding:$t,texStorage2D:xe,texStorage3D:At,texSubImage2D:pt,texSubImage3D:Wt,compressedTexSubImage2D:wt,compressedTexSubImage3D:Ft,scissor:qt,viewport:Gt,reset:Ue}}function Jb(r,t,i,s,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new he,g=new WeakMap;let x;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(U,T){return M?new OffscreenCanvas(U,T):wu("canvas")}function D(U,T,tt){let dt=1;const Mt=kt(U);if((Mt.width>tt||Mt.height>tt)&&(dt=tt/Math.max(Mt.width,Mt.height)),dt<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const pt=Math.floor(dt*Mt.width),Wt=Math.floor(dt*Mt.height);x===void 0&&(x=C(pt,Wt));const wt=T?C(pt,Wt):x;return wt.width=pt,wt.height=Wt,wt.getContext("2d").drawImage(U,0,0,pt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+pt+"x"+Wt+")."),wt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),U;return U}function y(U){return U.generateMipmaps}function _(U){r.generateMipmap(U)}function I(U){return U.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?r.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function z(U,T,tt,dt,Mt=!1){if(U!==null){if(r[U]!==void 0)return r[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let pt=T;if(T===r.RED&&(tt===r.FLOAT&&(pt=r.R32F),tt===r.HALF_FLOAT&&(pt=r.R16F),tt===r.UNSIGNED_BYTE&&(pt=r.R8)),T===r.RED_INTEGER&&(tt===r.UNSIGNED_BYTE&&(pt=r.R8UI),tt===r.UNSIGNED_SHORT&&(pt=r.R16UI),tt===r.UNSIGNED_INT&&(pt=r.R32UI),tt===r.BYTE&&(pt=r.R8I),tt===r.SHORT&&(pt=r.R16I),tt===r.INT&&(pt=r.R32I)),T===r.RG&&(tt===r.FLOAT&&(pt=r.RG32F),tt===r.HALF_FLOAT&&(pt=r.RG16F),tt===r.UNSIGNED_BYTE&&(pt=r.RG8)),T===r.RG_INTEGER&&(tt===r.UNSIGNED_BYTE&&(pt=r.RG8UI),tt===r.UNSIGNED_SHORT&&(pt=r.RG16UI),tt===r.UNSIGNED_INT&&(pt=r.RG32UI),tt===r.BYTE&&(pt=r.RG8I),tt===r.SHORT&&(pt=r.RG16I),tt===r.INT&&(pt=r.RG32I)),T===r.RGB_INTEGER&&(tt===r.UNSIGNED_BYTE&&(pt=r.RGB8UI),tt===r.UNSIGNED_SHORT&&(pt=r.RGB16UI),tt===r.UNSIGNED_INT&&(pt=r.RGB32UI),tt===r.BYTE&&(pt=r.RGB8I),tt===r.SHORT&&(pt=r.RGB16I),tt===r.INT&&(pt=r.RGB32I)),T===r.RGBA_INTEGER&&(tt===r.UNSIGNED_BYTE&&(pt=r.RGBA8UI),tt===r.UNSIGNED_SHORT&&(pt=r.RGBA16UI),tt===r.UNSIGNED_INT&&(pt=r.RGBA32UI),tt===r.BYTE&&(pt=r.RGBA8I),tt===r.SHORT&&(pt=r.RGBA16I),tt===r.INT&&(pt=r.RGBA32I)),T===r.RGB&&tt===r.UNSIGNED_INT_5_9_9_9_REV&&(pt=r.RGB9_E5),T===r.RGBA){const Wt=Mt?Cu:we.getTransfer(dt);tt===r.FLOAT&&(pt=r.RGBA32F),tt===r.HALF_FLOAT&&(pt=r.RGBA16F),tt===r.UNSIGNED_BYTE&&(pt=Wt===Pe?r.SRGB8_ALPHA8:r.RGBA8),tt===r.UNSIGNED_SHORT_4_4_4_4&&(pt=r.RGBA4),tt===r.UNSIGNED_SHORT_5_5_5_1&&(pt=r.RGB5_A1)}return(pt===r.R16F||pt===r.R32F||pt===r.RG16F||pt===r.RG32F||pt===r.RGBA16F||pt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function N(U,T){let tt;return U?T===null||T===Ms||T===wr?tt=r.DEPTH24_STENCIL8:T===na?tt=r.DEPTH32F_STENCIL8:T===Ho&&(tt=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ms||T===wr?tt=r.DEPTH_COMPONENT24:T===na?tt=r.DEPTH_COMPONENT32F:T===Ho&&(tt=r.DEPTH_COMPONENT16),tt}function V(U,T){return y(U)===!0||U.isFramebufferTexture&&U.minFilter!==yi&&U.minFilter!==Di?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function H(U){const T=U.target;T.removeEventListener("dispose",H),B(T),T.isVideoTexture&&g.delete(T)}function L(U){const T=U.target;T.removeEventListener("dispose",L),E(T)}function B(U){const T=s.get(U);if(T.__webglInit===void 0)return;const tt=U.source,dt=S.get(tt);if(dt){const Mt=dt[T.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&R(U),Object.keys(dt).length===0&&S.delete(tt)}s.remove(U)}function R(U){const T=s.get(U);r.deleteTexture(T.__webglTexture);const tt=U.source,dt=S.get(tt);delete dt[T.__cacheKey],h.memory.textures--}function E(U){const T=s.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),s.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(T.__webglFramebuffer[dt]))for(let Mt=0;Mt<T.__webglFramebuffer[dt].length;Mt++)r.deleteFramebuffer(T.__webglFramebuffer[dt][Mt]);else r.deleteFramebuffer(T.__webglFramebuffer[dt]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[dt])}else{if(Array.isArray(T.__webglFramebuffer))for(let dt=0;dt<T.__webglFramebuffer.length;dt++)r.deleteFramebuffer(T.__webglFramebuffer[dt]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let dt=0;dt<T.__webglColorRenderbuffer.length;dt++)T.__webglColorRenderbuffer[dt]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[dt]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const tt=U.textures;for(let dt=0,Mt=tt.length;dt<Mt;dt++){const pt=s.get(tt[dt]);pt.__webglTexture&&(r.deleteTexture(pt.__webglTexture),h.memory.textures--),s.remove(tt[dt])}s.remove(U)}let P=0;function ot(){P=0}function at(){const U=P;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),P+=1,U}function ct(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function ft(U,T){const tt=s.get(U);if(U.isVideoTexture&&Bt(U),U.isRenderTargetTexture===!1&&U.version>0&&tt.__version!==U.version){const dt=U.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(tt,U,T);return}}i.bindTexture(r.TEXTURE_2D,tt.__webglTexture,r.TEXTURE0+T)}function X(U,T){const tt=s.get(U);if(U.version>0&&tt.__version!==U.version){Y(tt,U,T);return}i.bindTexture(r.TEXTURE_2D_ARRAY,tt.__webglTexture,r.TEXTURE0+T)}function st(U,T){const tt=s.get(U);if(U.version>0&&tt.__version!==U.version){Y(tt,U,T);return}i.bindTexture(r.TEXTURE_3D,tt.__webglTexture,r.TEXTURE0+T)}function j(U,T){const tt=s.get(U);if(U.version>0&&tt.__version!==U.version){ht(tt,U,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,tt.__webglTexture,r.TEXTURE0+T)}const yt={[wh]:r.REPEAT,[_s]:r.CLAMP_TO_EDGE,[Uh]:r.MIRRORED_REPEAT},w={[yi]:r.NEAREST,[vS]:r.NEAREST_MIPMAP_NEAREST,[Jl]:r.NEAREST_MIPMAP_LINEAR,[Di]:r.LINEAR,[Xf]:r.LINEAR_MIPMAP_NEAREST,[vs]:r.LINEAR_MIPMAP_LINEAR},nt={[ES]:r.NEVER,[DS]:r.ALWAYS,[TS]:r.LESS,[r0]:r.LEQUAL,[bS]:r.EQUAL,[CS]:r.GEQUAL,[AS]:r.GREATER,[RS]:r.NOTEQUAL};function Tt(U,T){if(T.type===na&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Di||T.magFilter===Xf||T.magFilter===Jl||T.magFilter===vs||T.minFilter===Di||T.minFilter===Xf||T.minFilter===Jl||T.minFilter===vs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(U,r.TEXTURE_WRAP_S,yt[T.wrapS]),r.texParameteri(U,r.TEXTURE_WRAP_T,yt[T.wrapT]),(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)&&r.texParameteri(U,r.TEXTURE_WRAP_R,yt[T.wrapR]),r.texParameteri(U,r.TEXTURE_MAG_FILTER,w[T.magFilter]),r.texParameteri(U,r.TEXTURE_MIN_FILTER,w[T.minFilter]),T.compareFunction&&(r.texParameteri(U,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(U,r.TEXTURE_COMPARE_FUNC,nt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===yi||T.minFilter!==Jl&&T.minFilter!==vs||T.type===na&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(U,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function vt(U,T){let tt=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",H));const dt=T.source;let Mt=S.get(dt);Mt===void 0&&(Mt={},S.set(dt,Mt));const pt=ct(T);if(pt!==U.__cacheKey){Mt[pt]===void 0&&(Mt[pt]={texture:r.createTexture(),usedTimes:0},h.memory.textures++,tt=!0),Mt[pt].usedTimes++;const Wt=Mt[U.__cacheKey];Wt!==void 0&&(Mt[U.__cacheKey].usedTimes--,Wt.usedTimes===0&&R(T)),U.__cacheKey=pt,U.__webglTexture=Mt[pt].texture}return tt}function Y(U,T,tt){let dt=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(dt=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(dt=r.TEXTURE_3D);const Mt=vt(U,T),pt=T.source;i.bindTexture(dt,U.__webglTexture,r.TEXTURE0+tt);const Wt=s.get(pt);if(pt.version!==Wt.__version||Mt===!0){i.activeTexture(r.TEXTURE0+tt);const wt=we.getPrimaries(we.workingColorSpace),Ft=T.colorSpace===Ia?null:we.getPrimaries(T.colorSpace),xe=T.colorSpace===Ia||wt===Ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let At=D(T.image,!1,l.maxTextureSize);At=ve(T,At);const Ht=c.convert(T.format,T.colorSpace),Qt=c.convert(T.type);let qt=z(T.internalFormat,Ht,Qt,T.colorSpace,T.isVideoTexture);Tt(dt,T);let Gt;const oe=T.mipmaps,$t=T.isVideoTexture!==!0,Ue=Wt.__version===void 0||Mt===!0,W=pt.dataReady,Nt=V(T,At);if(T.isDepthTexture)qt=N(T.format===Ur,T.type),Ue&&($t?i.texStorage2D(r.TEXTURE_2D,1,qt,At.width,At.height):i.texImage2D(r.TEXTURE_2D,0,qt,At.width,At.height,0,Ht,Qt,null));else if(T.isDataTexture)if(oe.length>0){$t&&Ue&&i.texStorage2D(r.TEXTURE_2D,Nt,qt,oe[0].width,oe[0].height);for(let rt=0,gt=oe.length;rt<gt;rt++)Gt=oe[rt],$t?W&&i.texSubImage2D(r.TEXTURE_2D,rt,0,0,Gt.width,Gt.height,Ht,Qt,Gt.data):i.texImage2D(r.TEXTURE_2D,rt,qt,Gt.width,Gt.height,0,Ht,Qt,Gt.data);T.generateMipmaps=!1}else $t?(Ue&&i.texStorage2D(r.TEXTURE_2D,Nt,qt,At.width,At.height),W&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Ht,Qt,At.data)):i.texImage2D(r.TEXTURE_2D,0,qt,At.width,At.height,0,Ht,Qt,At.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){$t&&Ue&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Nt,qt,oe[0].width,oe[0].height,At.depth);for(let rt=0,gt=oe.length;rt<gt;rt++)if(Gt=oe[rt],T.format!==Si)if(Ht!==null)if($t){if(W)if(T.layerUpdates.size>0){const Dt=x_(Gt.width,Gt.height,T.format,T.type);for(const Ut of T.layerUpdates){const ne=Gt.data.subarray(Ut*Dt/Gt.data.BYTES_PER_ELEMENT,(Ut+1)*Dt/Gt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,rt,0,0,Ut,Gt.width,Gt.height,1,Ht,ne)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,rt,0,0,0,Gt.width,Gt.height,At.depth,Ht,Gt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,rt,qt,Gt.width,Gt.height,At.depth,0,Gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $t?W&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,rt,0,0,0,Gt.width,Gt.height,At.depth,Ht,Qt,Gt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,rt,qt,Gt.width,Gt.height,At.depth,0,Ht,Qt,Gt.data)}else{$t&&Ue&&i.texStorage2D(r.TEXTURE_2D,Nt,qt,oe[0].width,oe[0].height);for(let rt=0,gt=oe.length;rt<gt;rt++)Gt=oe[rt],T.format!==Si?Ht!==null?$t?W&&i.compressedTexSubImage2D(r.TEXTURE_2D,rt,0,0,Gt.width,Gt.height,Ht,Gt.data):i.compressedTexImage2D(r.TEXTURE_2D,rt,qt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?W&&i.texSubImage2D(r.TEXTURE_2D,rt,0,0,Gt.width,Gt.height,Ht,Qt,Gt.data):i.texImage2D(r.TEXTURE_2D,rt,qt,Gt.width,Gt.height,0,Ht,Qt,Gt.data)}else if(T.isDataArrayTexture)if($t){if(Ue&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Nt,qt,At.width,At.height,At.depth),W)if(T.layerUpdates.size>0){const rt=x_(At.width,At.height,T.format,T.type);for(const gt of T.layerUpdates){const Dt=At.data.subarray(gt*rt/At.data.BYTES_PER_ELEMENT,(gt+1)*rt/At.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,gt,At.width,At.height,1,Ht,Qt,Dt)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Ht,Qt,At.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,qt,At.width,At.height,At.depth,0,Ht,Qt,At.data);else if(T.isData3DTexture)$t?(Ue&&i.texStorage3D(r.TEXTURE_3D,Nt,qt,At.width,At.height,At.depth),W&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Ht,Qt,At.data)):i.texImage3D(r.TEXTURE_3D,0,qt,At.width,At.height,At.depth,0,Ht,Qt,At.data);else if(T.isFramebufferTexture){if(Ue)if($t)i.texStorage2D(r.TEXTURE_2D,Nt,qt,At.width,At.height);else{let rt=At.width,gt=At.height;for(let Dt=0;Dt<Nt;Dt++)i.texImage2D(r.TEXTURE_2D,Dt,qt,rt,gt,0,Ht,Qt,null),rt>>=1,gt>>=1}}else if(oe.length>0){if($t&&Ue){const rt=kt(oe[0]);i.texStorage2D(r.TEXTURE_2D,Nt,qt,rt.width,rt.height)}for(let rt=0,gt=oe.length;rt<gt;rt++)Gt=oe[rt],$t?W&&i.texSubImage2D(r.TEXTURE_2D,rt,0,0,Ht,Qt,Gt):i.texImage2D(r.TEXTURE_2D,rt,qt,Ht,Qt,Gt);T.generateMipmaps=!1}else if($t){if(Ue){const rt=kt(At);i.texStorage2D(r.TEXTURE_2D,Nt,qt,rt.width,rt.height)}W&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Ht,Qt,At)}else i.texImage2D(r.TEXTURE_2D,0,qt,Ht,Qt,At);y(T)&&_(dt),Wt.__version=pt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function ht(U,T,tt){if(T.image.length!==6)return;const dt=vt(U,T),Mt=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+tt);const pt=s.get(Mt);if(Mt.version!==pt.__version||dt===!0){i.activeTexture(r.TEXTURE0+tt);const Wt=we.getPrimaries(we.workingColorSpace),wt=T.colorSpace===Ia?null:we.getPrimaries(T.colorSpace),Ft=T.colorSpace===Ia||Wt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);const xe=T.isCompressedTexture||T.image[0].isCompressedTexture,At=T.image[0]&&T.image[0].isDataTexture,Ht=[];for(let gt=0;gt<6;gt++)!xe&&!At?Ht[gt]=D(T.image[gt],!0,l.maxCubemapSize):Ht[gt]=At?T.image[gt].image:T.image[gt],Ht[gt]=ve(T,Ht[gt]);const Qt=Ht[0],qt=c.convert(T.format,T.colorSpace),Gt=c.convert(T.type),oe=z(T.internalFormat,qt,Gt,T.colorSpace),$t=T.isVideoTexture!==!0,Ue=pt.__version===void 0||dt===!0,W=Mt.dataReady;let Nt=V(T,Qt);Tt(r.TEXTURE_CUBE_MAP,T);let rt;if(xe){$t&&Ue&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Nt,oe,Qt.width,Qt.height);for(let gt=0;gt<6;gt++){rt=Ht[gt].mipmaps;for(let Dt=0;Dt<rt.length;Dt++){const Ut=rt[Dt];T.format!==Si?qt!==null?$t?W&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt,0,0,Ut.width,Ut.height,qt,Ut.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt,oe,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$t?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt,0,0,Ut.width,Ut.height,qt,Gt,Ut.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt,oe,Ut.width,Ut.height,0,qt,Gt,Ut.data)}}}else{if(rt=T.mipmaps,$t&&Ue){rt.length>0&&Nt++;const gt=kt(Ht[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Nt,oe,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(At){$t?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Ht[gt].width,Ht[gt].height,qt,Gt,Ht[gt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,oe,Ht[gt].width,Ht[gt].height,0,qt,Gt,Ht[gt].data);for(let Dt=0;Dt<rt.length;Dt++){const ne=rt[Dt].image[gt].image;$t?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt+1,0,0,ne.width,ne.height,qt,Gt,ne.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt+1,oe,ne.width,ne.height,0,qt,Gt,ne.data)}}else{$t?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,qt,Gt,Ht[gt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,oe,qt,Gt,Ht[gt]);for(let Dt=0;Dt<rt.length;Dt++){const Ut=rt[Dt];$t?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt+1,0,0,qt,Gt,Ut.image[gt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Dt+1,oe,qt,Gt,Ut.image[gt])}}}y(T)&&_(r.TEXTURE_CUBE_MAP),pt.__version=Mt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function xt(U,T,tt,dt,Mt,pt){const Wt=c.convert(tt.format,tt.colorSpace),wt=c.convert(tt.type),Ft=z(tt.internalFormat,Wt,wt,tt.colorSpace),xe=s.get(T),At=s.get(tt);if(At.__renderTarget=T,!xe.__hasExternalTextures){const Ht=Math.max(1,T.width>>pt),Qt=Math.max(1,T.height>>pt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?i.texImage3D(Mt,pt,Ft,Ht,Qt,T.depth,0,Wt,wt,null):i.texImage2D(Mt,pt,Ft,Ht,Qt,0,Wt,wt,null)}i.bindFramebuffer(r.FRAMEBUFFER,U),Kt(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,Mt,At.__webglTexture,0,jt(T)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,dt,Mt,At.__webglTexture,pt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function bt(U,T,tt){if(r.bindRenderbuffer(r.RENDERBUFFER,U),T.depthBuffer){const dt=T.depthTexture,Mt=dt&&dt.isDepthTexture?dt.type:null,pt=N(T.stencilBuffer,Mt),Wt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,wt=jt(T);Kt(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,wt,pt,T.width,T.height):tt?r.renderbufferStorageMultisample(r.RENDERBUFFER,wt,pt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,pt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,U)}else{const dt=T.textures;for(let Mt=0;Mt<dt.length;Mt++){const pt=dt[Mt],Wt=c.convert(pt.format,pt.colorSpace),wt=c.convert(pt.type),Ft=z(pt.internalFormat,Wt,wt,pt.colorSpace),xe=jt(T);tt&&Kt(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,Ft,T.width,T.height):Kt(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,Ft,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ft,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Rt(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=s.get(T.depthTexture);dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ft(T.depthTexture,0);const Mt=dt.__webglTexture,pt=jt(T);if(T.depthTexture.format===br)Kt(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,pt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(T.depthTexture.format===Ur)Kt(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,pt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function zt(U){const T=s.get(U),tt=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const dt=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),dt){const Mt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,dt.removeEventListener("dispose",Mt)};dt.addEventListener("dispose",Mt),T.__depthDisposeCallback=Mt}T.__boundDepthTexture=dt}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");Rt(T.__webglFramebuffer,U)}else if(tt){T.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[dt]),T.__webglDepthbuffer[dt]===void 0)T.__webglDepthbuffer[dt]=r.createRenderbuffer(),bt(T.__webglDepthbuffer[dt],U,!1);else{const Mt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,pt=T.__webglDepthbuffer[dt];r.bindRenderbuffer(r.RENDERBUFFER,pt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,pt)}}else if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),bt(T.__webglDepthbuffer,U,!1);else{const dt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,Mt)}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Vt(U,T,tt){const dt=s.get(U);T!==void 0&&xt(dt.__webglFramebuffer,U,U.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),tt!==void 0&&zt(U)}function ge(U){const T=U.texture,tt=s.get(U),dt=s.get(T);U.addEventListener("dispose",L);const Mt=U.textures,pt=U.isWebGLCubeRenderTarget===!0,Wt=Mt.length>1;if(Wt||(dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture()),dt.__version=T.version,h.memory.textures++),pt){tt.__webglFramebuffer=[];for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer[wt]=[];for(let Ft=0;Ft<T.mipmaps.length;Ft++)tt.__webglFramebuffer[wt][Ft]=r.createFramebuffer()}else tt.__webglFramebuffer[wt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer=[];for(let wt=0;wt<T.mipmaps.length;wt++)tt.__webglFramebuffer[wt]=r.createFramebuffer()}else tt.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let wt=0,Ft=Mt.length;wt<Ft;wt++){const xe=s.get(Mt[wt]);xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture(),h.memory.textures++)}if(U.samples>0&&Kt(U)===!1){tt.__webglMultisampledFramebuffer=r.createFramebuffer(),tt.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let wt=0;wt<Mt.length;wt++){const Ft=Mt[wt];tt.__webglColorRenderbuffer[wt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,tt.__webglColorRenderbuffer[wt]);const xe=c.convert(Ft.format,Ft.colorSpace),At=c.convert(Ft.type),Ht=z(Ft.internalFormat,xe,At,Ft.colorSpace,U.isXRRenderTarget===!0),Qt=jt(U);r.renderbufferStorageMultisample(r.RENDERBUFFER,Qt,Ht,U.width,U.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,tt.__webglColorRenderbuffer[wt])}r.bindRenderbuffer(r.RENDERBUFFER,null),U.depthBuffer&&(tt.__webglDepthRenderbuffer=r.createRenderbuffer(),bt(tt.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(pt){i.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),Tt(r.TEXTURE_CUBE_MAP,T);for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ft=0;Ft<T.mipmaps.length;Ft++)xt(tt.__webglFramebuffer[wt][Ft],U,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+wt,Ft);else xt(tt.__webglFramebuffer[wt],U,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0);y(T)&&_(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Wt){for(let wt=0,Ft=Mt.length;wt<Ft;wt++){const xe=Mt[wt],At=s.get(xe);i.bindTexture(r.TEXTURE_2D,At.__webglTexture),Tt(r.TEXTURE_2D,xe),xt(tt.__webglFramebuffer,U,xe,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,0),y(xe)&&_(r.TEXTURE_2D)}i.unbindTexture()}else{let wt=r.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(wt=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(wt,dt.__webglTexture),Tt(wt,T),T.mipmaps&&T.mipmaps.length>0)for(let Ft=0;Ft<T.mipmaps.length;Ft++)xt(tt.__webglFramebuffer[Ft],U,T,r.COLOR_ATTACHMENT0,wt,Ft);else xt(tt.__webglFramebuffer,U,T,r.COLOR_ATTACHMENT0,wt,0);y(T)&&_(wt),i.unbindTexture()}U.depthBuffer&&zt(U)}function le(U){const T=U.textures;for(let tt=0,dt=T.length;tt<dt;tt++){const Mt=T[tt];if(y(Mt)){const pt=I(U),Wt=s.get(Mt).__webglTexture;i.bindTexture(pt,Wt),_(pt),i.unbindTexture()}}}const be=[],F=[];function It(U){if(U.samples>0){if(Kt(U)===!1){const T=U.textures,tt=U.width,dt=U.height;let Mt=r.COLOR_BUFFER_BIT;const pt=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=s.get(U),wt=T.length>1;if(wt)for(let Ft=0;Ft<T.length;Ft++)i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let Ft=0;Ft<T.length;Ft++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),wt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[Ft]);const xe=s.get(T[Ft]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,xe,0)}r.blitFramebuffer(0,0,tt,dt,0,0,tt,dt,Mt,r.NEAREST),m===!0&&(be.length=0,F.length=0,be.push(r.COLOR_ATTACHMENT0+Ft),U.depthBuffer&&U.resolveDepthBuffer===!1&&(be.push(pt),F.push(pt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,F)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,be))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),wt)for(let Ft=0;Ft<T.length;Ft++){i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[Ft]);const xe=s.get(T[Ft]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.TEXTURE_2D,xe,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const T=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function jt(U){return Math.min(l.maxSamples,U.samples)}function Kt(U){const T=s.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Bt(U){const T=h.render.frame;g.get(U)!==T&&(g.set(U,T),U.update())}function ve(U,T){const tt=U.colorSpace,dt=U.format,Mt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||tt!==Lr&&tt!==Ia&&(we.getTransfer(tt)===Pe?(dt!==Si||Mt!==ra)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),T}function kt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=at,this.resetTextureUnits=ot,this.setTexture2D=ft,this.setTexture2DArray=X,this.setTexture3D=st,this.setTextureCube=j,this.rebindTextures=Vt,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Kt}function $b(r,t){function i(s,l=Ia){let c;const h=we.getTransfer(l);if(s===ra)return r.UNSIGNED_BYTE;if(s===ud)return r.UNSIGNED_SHORT_4_4_4_4;if(s===cd)return r.UNSIGNED_SHORT_5_5_5_1;if(s===J_)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===K_)return r.BYTE;if(s===Q_)return r.SHORT;if(s===Ho)return r.UNSIGNED_SHORT;if(s===ld)return r.INT;if(s===Ms)return r.UNSIGNED_INT;if(s===na)return r.FLOAT;if(s===Vo)return r.HALF_FLOAT;if(s===$_)return r.ALPHA;if(s===t0)return r.RGB;if(s===Si)return r.RGBA;if(s===e0)return r.LUMINANCE;if(s===n0)return r.LUMINANCE_ALPHA;if(s===br)return r.DEPTH_COMPONENT;if(s===Ur)return r.DEPTH_STENCIL;if(s===i0)return r.RED;if(s===fd)return r.RED_INTEGER;if(s===a0)return r.RG;if(s===hd)return r.RG_INTEGER;if(s===dd)return r.RGBA_INTEGER;if(s===yu||s===Mu||s===Eu||s===Tu)if(h===Pe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===yu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Mu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Tu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===yu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Mu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Eu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Tu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Lh||s===Nh||s===Oh||s===Ph)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Lh)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Nh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Oh)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ph)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===zh||s===Bh||s===Ih)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===zh||s===Bh)return h===Pe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Ih)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Fh||s===Hh||s===Gh||s===Vh||s===kh||s===Xh||s===Wh||s===qh||s===Yh||s===jh||s===Zh||s===Kh||s===Qh||s===Jh)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Fh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Hh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Gh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Vh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===kh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Xh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Wh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===qh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Yh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===jh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Zh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Kh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Qh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Jh)return h===Pe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===bu||s===$h||s===td)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===bu)return h===Pe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===$h)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===td)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===s0||s===ed||s===nd||s===id)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===bu)return c.COMPRESSED_RED_RGTC1_EXT;if(s===ed)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===nd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===id)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===wr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const tA={type:"move"};class _h{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new et,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new et),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new et,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new et),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const D of t.hand.values()){const y=i.getJointPose(D,s),_=this._getHandJoint(p,D);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const g=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],S=g.position.distanceTo(x.position),M=.02,C=.005;p.inputState.pinching&&S>M+C?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&S<=M-C&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(tA)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new gu;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const eA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nA=`
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

}`;class iA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new Vn,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!==s.depthNear||i.depthFar!==s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new la({vertexShader:eA,fragmentShader:nA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new wi(new Wo(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aA extends bs{constructor(t,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,g=null,x=null,S=null,M=null,C=null;const D=new iA,y=i.getContextAttributes();let _=null,I=null;const z=[],N=[],V=new he;let H=null;const L=new ci;L.viewport=new Ke;const B=new ci;B.viewport=new Ke;const R=[L,B],E=new Ty;let P=null,ot=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ht=z[Y];return ht===void 0&&(ht=new _h,z[Y]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(Y){let ht=z[Y];return ht===void 0&&(ht=new _h,z[Y]=ht),ht.getGripSpace()},this.getHand=function(Y){let ht=z[Y];return ht===void 0&&(ht=new _h,z[Y]=ht),ht.getHandSpace()};function at(Y){const ht=N.indexOf(Y.inputSource);if(ht===-1)return;const xt=z[ht];xt!==void 0&&(xt.update(Y.inputSource,Y.frame,p||h),xt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function ct(){l.removeEventListener("select",at),l.removeEventListener("selectstart",at),l.removeEventListener("selectend",at),l.removeEventListener("squeeze",at),l.removeEventListener("squeezestart",at),l.removeEventListener("squeezeend",at),l.removeEventListener("end",ct),l.removeEventListener("inputsourceschange",ft);for(let Y=0;Y<z.length;Y++){const ht=N[Y];ht!==null&&(N[Y]=null,z[Y].disconnect(ht))}P=null,ot=null,D.reset(),t.setRenderTarget(_),M=null,S=null,x=null,l=null,I=null,vt.stop(),s.isPresenting=!1,t.setPixelRatio(H),t.setSize(V.width,V.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){c=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){d=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(Y){p=Y},this.getBaseLayer=function(){return S!==null?S:M},this.getBinding=function(){return x},this.getFrame=function(){return C},this.getSession=function(){return l},this.setSession=async function(Y){if(l=Y,l!==null){if(_=t.getRenderTarget(),l.addEventListener("select",at),l.addEventListener("selectstart",at),l.addEventListener("selectend",at),l.addEventListener("squeeze",at),l.addEventListener("squeezestart",at),l.addEventListener("squeezeend",at),l.addEventListener("end",ct),l.addEventListener("inputsourceschange",ft),y.xrCompatible!==!0&&await i.makeXRCompatible(),H=t.getPixelRatio(),t.getSize(V),l.enabledFeatures!==void 0&&l.enabledFeatures.includes("layers")){let xt=null,bt=null,Rt=null;y.depth&&(Rt=y.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,xt=y.stencil?Ur:br,bt=y.stencil?wr:Ms);const zt={colorFormat:i.RGBA8,depthFormat:Rt,scaleFactor:c};x=new XRWebGLBinding(l,i),S=x.createProjectionLayer(zt),l.updateRenderState({layers:[S]}),t.setPixelRatio(1),t.setSize(S.textureWidth,S.textureHeight,!1),I=new Es(S.textureWidth,S.textureHeight,{format:Si,type:ra,depthTexture:new S0(S.textureWidth,S.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:S.ignoreDepthValues===!1})}else{const xt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,xt),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new Es(M.framebufferWidth,M.framebufferHeight,{format:Si,type:ra,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),vt.setContext(l),vt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return D.getDepthTexture()};function ft(Y){for(let ht=0;ht<Y.removed.length;ht++){const xt=Y.removed[ht],bt=N.indexOf(xt);bt>=0&&(N[bt]=null,z[bt].disconnect(xt))}for(let ht=0;ht<Y.added.length;ht++){const xt=Y.added[ht];let bt=N.indexOf(xt);if(bt===-1){for(let zt=0;zt<z.length;zt++)if(zt>=N.length){N.push(xt),bt=zt;break}else if(N[zt]===null){N[zt]=xt,bt=zt;break}if(bt===-1)break}const Rt=z[bt];Rt&&Rt.connect(xt)}}const X=new et,st=new et;function j(Y,ht,xt){X.setFromMatrixPosition(ht.matrixWorld),st.setFromMatrixPosition(xt.matrixWorld);const bt=X.distanceTo(st),Rt=ht.projectionMatrix.elements,zt=xt.projectionMatrix.elements,Vt=Rt[14]/(Rt[10]-1),ge=Rt[14]/(Rt[10]+1),le=(Rt[9]+1)/Rt[5],be=(Rt[9]-1)/Rt[5],F=(Rt[8]-1)/Rt[0],It=(zt[8]+1)/zt[0],jt=Vt*F,Kt=Vt*It,Bt=bt/(-F+It),ve=Bt*-F;if(ht.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ve),Y.translateZ(Bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Rt[10]===-1)Y.projectionMatrix.copy(ht.projectionMatrix),Y.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const kt=Vt+Bt,U=ge+Bt,T=jt-ve,tt=Kt+(bt-ve),dt=le*ge/U*kt,Mt=be*ge/U*kt;Y.projectionMatrix.makePerspective(T,tt,dt,Mt,kt,U),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function yt(Y,ht){ht===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ht.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(l===null)return;let ht=Y.near,xt=Y.far;D.texture!==null&&(D.depthNear>0&&(ht=D.depthNear),D.depthFar>0&&(xt=D.depthFar)),E.near=B.near=L.near=ht,E.far=B.far=L.far=xt,(P!==E.near||ot!==E.far)&&(l.updateRenderState({depthNear:E.near,depthFar:E.far}),P=E.near,ot=E.far),L.layers.mask=Y.layers.mask|2,B.layers.mask=Y.layers.mask|4,E.layers.mask=L.layers.mask|B.layers.mask;const bt=Y.parent,Rt=E.cameras;yt(E,bt);for(let zt=0;zt<Rt.length;zt++)yt(Rt[zt],bt);Rt.length===2?j(E,L,B):E.projectionMatrix.copy(L.projectionMatrix),w(Y,E,bt)};function w(Y,ht,xt){xt===null?Y.matrix.copy(ht.matrixWorld):(Y.matrix.copy(xt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ht.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ht.projectionMatrix),Y.projectionMatrixInverse.copy(ht.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Go*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(S===null&&M===null))return m},this.setFoveation=function(Y){m=Y,S!==null&&(S.fixedFoveation=Y),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Y)},this.hasDepthSensing=function(){return D.texture!==null},this.getDepthSensingMesh=function(){return D.getMesh(E)};let nt=null;function Tt(Y,ht){if(g=ht.getViewerPose(p||h),C=ht,g!==null){const xt=g.views;M!==null&&(t.setRenderTargetFramebuffer(I,M.framebuffer),t.setRenderTarget(I));let bt=!1;xt.length!==E.cameras.length&&(E.cameras.length=0,bt=!0);for(let zt=0;zt<xt.length;zt++){const Vt=xt[zt];let ge=null;if(M!==null)ge=M.getViewport(Vt);else{const be=x.getViewSubImage(S,Vt);ge=be.viewport,zt===0&&(t.setRenderTargetTextures(I,be.colorTexture,S.ignoreDepthValues?void 0:be.depthStencilTexture),t.setRenderTarget(I))}let le=R[zt];le===void 0&&(le=new ci,le.layers.enable(zt),le.viewport=new Ke,R[zt]=le),le.matrix.fromArray(Vt.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Vt.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(ge.x,ge.y,ge.width,ge.height),zt===0&&(E.matrix.copy(le.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),bt===!0&&E.cameras.push(le)}const Rt=l.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const zt=x.getDepthInformation(xt[0]);zt&&zt.isValid&&zt.texture&&D.init(t,zt,l.renderState)}}for(let xt=0;xt<z.length;xt++){const bt=N[xt],Rt=z[xt];bt!==null&&Rt!==void 0&&Rt.update(bt,ht,p||h)}nt&&nt(Y,ht),ht.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ht}),C=null}const vt=new y0;vt.setAnimationLoop(Tt),this.setAnimationLoop=function(Y){nt=Y},this.dispose=function(){}}}const hs=new oa,sA=new en;function rA(r,t){function i(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function s(y,_){_.color.getRGB(y.fogColor.value,g0(r)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function l(y,_,I,z,N){_.isMeshBasicMaterial||_.isMeshLambertMaterial?c(y,_):_.isMeshToonMaterial?(c(y,_),x(y,_)):_.isMeshPhongMaterial?(c(y,_),g(y,_)):_.isMeshStandardMaterial?(c(y,_),S(y,_),_.isMeshPhysicalMaterial&&M(y,_,N)):_.isMeshMatcapMaterial?(c(y,_),C(y,_)):_.isMeshDepthMaterial?c(y,_):_.isMeshDistanceMaterial?(c(y,_),D(y,_)):_.isMeshNormalMaterial?c(y,_):_.isLineBasicMaterial?(h(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?m(y,_,I,z):_.isSpriteMaterial?p(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function c(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,i(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===Gn&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,i(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===Gn&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,i(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,i(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const I=t.get(_),z=I.envMap,N=I.envMapRotation;z&&(y.envMap.value=z,hs.copy(N),hs.x*=-1,hs.y*=-1,hs.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),y.envMapRotation.value.setFromMatrix4(sA.makeRotationFromEuler(hs)),y.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,y.aoMapTransform))}function h(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function m(y,_,I,z){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*I,y.scale.value=z*.5,_.map&&(y.map.value=_.map,i(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function p(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function g(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function x(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function S(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function M(y,_,I){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Gn&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,y.specularIntensityMapTransform))}function C(y,_){_.matcap&&(y.matcap.value=_.matcap)}function D(y,_){const I=t.get(_).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function oA(r,t,i,s){let l={},c={},h=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,z){const N=z.program;s.uniformBlockBinding(I,N)}function p(I,z){let N=l[I.id];N===void 0&&(C(I),N=g(I),l[I.id]=N,I.addEventListener("dispose",y));const V=z.program;s.updateUBOMapping(I,V);const H=t.render.frame;c[I.id]!==H&&(S(I),c[I.id]=H)}function g(I){const z=x();I.__bindingPointIndex=z;const N=r.createBuffer(),V=I.__size,H=I.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,V,H),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,z,N),N}function x(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function S(I){const z=l[I.id],N=I.uniforms,V=I.__cache;r.bindBuffer(r.UNIFORM_BUFFER,z);for(let H=0,L=N.length;H<L;H++){const B=Array.isArray(N[H])?N[H]:[N[H]];for(let R=0,E=B.length;R<E;R++){const P=B[R];if(M(P,H,R,V)===!0){const ot=P.__offset,at=Array.isArray(P.value)?P.value:[P.value];let ct=0;for(let ft=0;ft<at.length;ft++){const X=at[ft],st=D(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,ot+ct,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,ct),ct+=st.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,ot,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(I,z,N,V){const H=I.value,L=z+"_"+N;if(V[L]===void 0)return typeof H=="number"||typeof H=="boolean"?V[L]=H:V[L]=H.clone(),!0;{const B=V[L];if(typeof H=="number"||typeof H=="boolean"){if(B!==H)return V[L]=H,!0}else if(B.equals(H)===!1)return B.copy(H),!0}return!1}function C(I){const z=I.uniforms;let N=0;const V=16;for(let L=0,B=z.length;L<B;L++){const R=Array.isArray(z[L])?z[L]:[z[L]];for(let E=0,P=R.length;E<P;E++){const ot=R[E],at=Array.isArray(ot.value)?ot.value:[ot.value];for(let ct=0,ft=at.length;ct<ft;ct++){const X=at[ct],st=D(X),j=N%V,yt=j%st.boundary,w=j+yt;N+=yt,w!==0&&V-w<st.storage&&(N+=V-w),ot.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),ot.__offset=N,N+=st.storage}}}const H=N%V;return H>0&&(N+=V-H),I.__size=N,I.__cache={},this}function D(I){const z={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(z.boundary=4,z.storage=4):I.isVector2?(z.boundary=8,z.storage=8):I.isVector3||I.isColor?(z.boundary=16,z.storage=12):I.isVector4?(z.boundary=16,z.storage=16):I.isMatrix3?(z.boundary=48,z.storage=48):I.isMatrix4?(z.boundary=64,z.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),z}function y(I){const z=I.target;z.removeEventListener("dispose",y);const N=h.indexOf(z.__bindingPointIndex);h.splice(N,1),r.deleteBuffer(l[z.id]),delete l[z.id],delete c[z.id]}function _(){for(const I in l)r.deleteBuffer(l[I]);h=[],l={},c={}}return{bind:m,update:p,dispose:_}}class lA{constructor(t={}){const{canvas:i=qS(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:x=!1,reverseDepthBuffer:S=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const C=new Uint32Array(4),D=new Int32Array(4);let y=null,_=null;const I=[],z=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qn,this.toneMapping=aa,this.toneMappingExposure=1;const N=this;let V=!1,H=0,L=0,B=null,R=-1,E=null;const P=new Ke,ot=new Ke;let at=null;const ct=new Be(0);let ft=0,X=i.width,st=i.height,j=1,yt=null,w=null;const nt=new Ke(0,0,X,st),Tt=new Ke(0,0,X,st);let vt=!1;const Y=new x0;let ht=!1,xt=!1;this.transmissionResolutionScale=1;const bt=new en,Rt=new en,zt=new et,Vt=new Ke,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function be(){return B===null?j:1}let F=s;function It(A,q){return i.getContext(A,q)}try{const A={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${od}`),i.addEventListener("webglcontextlost",gt,!1),i.addEventListener("webglcontextrestored",Dt,!1),i.addEventListener("webglcontextcreationerror",Ut,!1),F===null){const q="webgl2";if(F=It(q,A),F===null)throw It(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let jt,Kt,Bt,ve,kt,U,T,tt,dt,Mt,pt,Wt,wt,Ft,xe,At,Ht,Qt,qt,Gt,oe,$t,Ue,W;function Nt(){jt=new _T(F),jt.init(),$t=new $b(F,jt),Kt=new fT(F,jt,t,$t),Bt=new Qb(F,jt),Kt.reverseDepthBuffer&&S&&Bt.buffers.depth.setReversed(!0),ve=new ST(F),kt=new Ib,U=new Jb(F,jt,Bt,kt,Kt,$t,ve),T=new dT(N),tt=new gT(N),dt=new Ry(F),Ue=new uT(F,dt),Mt=new vT(F,dt,ve,Ue),pt=new MT(F,Mt,dt,ve),qt=new yT(F,Kt,U),At=new hT(kt),Wt=new Bb(N,T,tt,jt,Kt,Ue,At),wt=new rA(N,kt),Ft=new Hb,xe=new qb(jt),Qt=new lT(N,T,tt,Bt,pt,M,m),Ht=new Zb(N,pt,Kt),W=new oA(F,ve,Kt,Bt),Gt=new cT(F,jt,ve),oe=new xT(F,jt,ve),ve.programs=Wt.programs,N.capabilities=Kt,N.extensions=jt,N.properties=kt,N.renderLists=Ft,N.shadowMap=Ht,N.state=Bt,N.info=ve}Nt();const rt=new aA(N,F);this.xr=rt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=jt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=jt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(X,st,!1))},this.getSize=function(A){return A.set(X,st)},this.setSize=function(A,q,$=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=A,st=q,i.width=Math.floor(A*j),i.height=Math.floor(q*j),$===!0&&(i.style.width=A+"px",i.style.height=q+"px"),this.setViewport(0,0,A,q)},this.getDrawingBufferSize=function(A){return A.set(X*j,st*j).floor()},this.setDrawingBufferSize=function(A,q,$){X=A,st=q,j=$,i.width=Math.floor(A*$),i.height=Math.floor(q*$),this.setViewport(0,0,A,q)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(nt)},this.setViewport=function(A,q,$,Q){A.isVector4?nt.set(A.x,A.y,A.z,A.w):nt.set(A,q,$,Q),Bt.viewport(P.copy(nt).multiplyScalar(j).round())},this.getScissor=function(A){return A.copy(Tt)},this.setScissor=function(A,q,$,Q){A.isVector4?Tt.set(A.x,A.y,A.z,A.w):Tt.set(A,q,$,Q),Bt.scissor(ot.copy(Tt).multiplyScalar(j).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(A){Bt.setScissorTest(vt=A)},this.setOpaqueSort=function(A){yt=A},this.setTransparentSort=function(A){w=A},this.getClearColor=function(A){return A.copy(Qt.getClearColor())},this.setClearColor=function(){Qt.setClearColor.apply(Qt,arguments)},this.getClearAlpha=function(){return Qt.getClearAlpha()},this.setClearAlpha=function(){Qt.setClearAlpha.apply(Qt,arguments)},this.clear=function(A=!0,q=!0,$=!0){let Q=0;if(A){let Z=!1;if(B!==null){const Et=B.texture.format;Z=Et===dd||Et===hd||Et===fd}if(Z){const Et=B.texture.type,Ct=Et===ra||Et===Ms||Et===Ho||Et===wr||Et===ud||Et===cd,Pt=Qt.getClearColor(),Ot=Qt.getClearAlpha(),ie=Pt.r,ae=Pt.g,Jt=Pt.b;Ct?(C[0]=ie,C[1]=ae,C[2]=Jt,C[3]=Ot,F.clearBufferuiv(F.COLOR,0,C)):(D[0]=ie,D[1]=ae,D[2]=Jt,D[3]=Ot,F.clearBufferiv(F.COLOR,0,D))}else Q|=F.COLOR_BUFFER_BIT}q&&(Q|=F.DEPTH_BUFFER_BIT),$&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",gt,!1),i.removeEventListener("webglcontextrestored",Dt,!1),i.removeEventListener("webglcontextcreationerror",Ut,!1),Qt.dispose(),Ft.dispose(),xe.dispose(),kt.dispose(),T.dispose(),tt.dispose(),pt.dispose(),Ue.dispose(),W.dispose(),Wt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",qo),rt.removeEventListener("sessionend",zr),Mi.stop()};function gt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const A=ve.autoReset,q=Ht.enabled,$=Ht.autoUpdate,Q=Ht.needsUpdate,Z=Ht.type;Nt(),ve.autoReset=A,Ht.enabled=q,Ht.autoUpdate=$,Ht.needsUpdate=Q,Ht.type=Z}function Ut(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ne(A){const q=A.target;q.removeEventListener("dispose",ne),Ve(q)}function Ve(A){nn(A),kt.remove(A)}function nn(A){const q=kt.get(A).programs;q!==void 0&&(q.forEach(function($){Wt.releaseProgram($)}),A.isShaderMaterial&&Wt.releaseShaderCache(A))}this.renderBufferDirect=function(A,q,$,Q,Z,Et){q===null&&(q=ge);const Ct=Z.isMesh&&Z.matrixWorld.determinant()<0,Pt=Pu(A,q,$,Q,Z);Bt.setMaterial(Q,Ct);let Ot=$.index,ie=1;if(Q.wireframe===!0){if(Ot=Mt.getWireframeAttribute($),Ot===void 0)return;ie=2}const ae=$.drawRange,Jt=$.attributes.position;let Se=ae.start*ie,ye=(ae.start+ae.count)*ie;Et!==null&&(Se=Math.max(Se,Et.start*ie),ye=Math.min(ye,(Et.start+Et.count)*ie)),Ot!==null?(Se=Math.max(Se,0),ye=Math.min(ye,Ot.count)):Jt!=null&&(Se=Math.max(Se,0),ye=Math.min(ye,Jt.count));const Ge=ye-Se;if(Ge<0||Ge===1/0)return;Ue.setup(Z,Q,Pt,$,Ot);let Re,se=Gt;if(Ot!==null&&(Re=dt.get(Ot),se=oe,se.setIndex(Re)),Z.isMesh)Q.wireframe===!0?(Bt.setLineWidth(Q.wireframeLinewidth*be()),se.setMode(F.LINES)):se.setMode(F.TRIANGLES);else if(Z.isLine){let te=Q.linewidth;te===void 0&&(te=1),Bt.setLineWidth(te*be()),Z.isLineSegments?se.setMode(F.LINES):Z.isLineLoop?se.setMode(F.LINE_LOOP):se.setMode(F.LINE_STRIP)}else Z.isPoints?se.setMode(F.POINTS):Z.isSprite&&se.setMode(F.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)se.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))se.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const te=Z._multiDrawStarts,rn=Z._multiDrawCounts,Me=Z._multiDrawCount,zn=Ot?dt.get(Ot).bytesPerElement:1,fi=kt.get(Q).currentProgram.getUniforms();for(let wn=0;wn<Me;wn++)fi.setValue(F,"_gl_DrawID",wn),se.render(te[wn]/zn,rn[wn])}else if(Z.isInstancedMesh)se.renderInstances(Se,Ge,Z.count);else if($.isInstancedBufferGeometry){const te=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,rn=Math.min($.instanceCount,te);se.renderInstances(Se,Ge,rn)}else se.render(Se,Ge)};function Ae(A,q,$){A.transparent===!0&&A.side===ea&&A.forceSinglePass===!1?(A.side=Gn,A.needsUpdate=!0,sn(A,q,$),A.side=Ha,A.needsUpdate=!0,sn(A,q,$),A.side=ea):sn(A,q,$)}this.compile=function(A,q,$=null){$===null&&($=A),_=xe.get($),_.init(q),z.push(_),$.traverseVisible(function(Z){Z.isLight&&Z.layers.test(q.layers)&&(_.pushLight(Z),Z.castShadow&&_.pushShadow(Z))}),A!==$&&A.traverseVisible(function(Z){Z.isLight&&Z.layers.test(q.layers)&&(_.pushLight(Z),Z.castShadow&&_.pushShadow(Z))}),_.setupLights();const Q=new Set;return A.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Et=Z.material;if(Et)if(Array.isArray(Et))for(let Ct=0;Ct<Et.length;Ct++){const Pt=Et[Ct];Ae(Pt,$,Z),Q.add(Pt)}else Ae(Et,$,Z),Q.add(Et)}),z.pop(),_=null,Q},this.compileAsync=function(A,q,$=null){const Q=this.compile(A,q,$);return new Promise(Z=>{function Et(){if(Q.forEach(function(Ct){kt.get(Ct).currentProgram.isReady()&&Q.delete(Ct)}),Q.size===0){Z(A);return}setTimeout(Et,10)}jt.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let Cn=null;function Dn(A){Cn&&Cn(A)}function qo(){Mi.stop()}function zr(){Mi.start()}const Mi=new y0;Mi.setAnimationLoop(Dn),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(A){Cn=A,rt.setAnimationLoop(A),A===null?Mi.stop():Mi.start()},rt.addEventListener("sessionstart",qo),rt.addEventListener("sessionend",zr),this.render=function(A,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(q),q=rt.getCamera()),A.isScene===!0&&A.onBeforeRender(N,A,q,B),_=xe.get(A,z.length),_.init(q),z.push(_),Rt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Y.setFromProjectionMatrix(Rt),xt=this.localClippingEnabled,ht=At.init(this.clippingPlanes,xt),y=Ft.get(A,I.length),y.init(),I.push(y),rt.enabled===!0&&rt.isPresenting===!0){const Et=N.xr.getDepthSensingMesh();Et!==null&&Rs(Et,q,-1/0,N.sortObjects)}Rs(A,q,0,N.sortObjects),y.finish(),N.sortObjects===!0&&y.sort(yt,w),le=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,le&&Qt.addToRenderList(y,A),this.info.render.frame++,ht===!0&&At.beginShadows();const $=_.state.shadowsArray;Ht.render($,A,q),ht===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=y.opaque,Z=y.transmissive;if(_.setupLights(),q.isArrayCamera){const Et=q.cameras;if(Z.length>0)for(let Ct=0,Pt=Et.length;Ct<Pt;Ct++){const Ot=Et[Ct];Yo(Q,Z,A,Ot)}le&&Qt.render(A);for(let Ct=0,Pt=Et.length;Ct<Pt;Ct++){const Ot=Et[Ct];Br(y,A,Ot,Ot.viewport)}}else Z.length>0&&Yo(Q,Z,A,q),le&&Qt.render(A),Br(y,A,q);B!==null&&L===0&&(U.updateMultisampleRenderTarget(B),U.updateRenderTargetMipmap(B)),A.isScene===!0&&A.onAfterRender(N,A,q),Ue.resetDefaultState(),R=-1,E=null,z.pop(),z.length>0?(_=z[z.length-1],ht===!0&&At.setGlobalState(N.clippingPlanes,_.state.camera)):_=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function Rs(A,q,$,Q){if(A.visible===!1)return;if(A.layers.test(q.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(q);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Y.intersectsSprite(A)){Q&&Vt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Rt);const Ct=pt.update(A),Pt=A.material;Pt.visible&&y.push(A,Ct,Pt,$,Vt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Y.intersectsObject(A))){const Ct=pt.update(A),Pt=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Vt.copy(A.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),Vt.copy(Ct.boundingSphere.center)),Vt.applyMatrix4(A.matrixWorld).applyMatrix4(Rt)),Array.isArray(Pt)){const Ot=Ct.groups;for(let ie=0,ae=Ot.length;ie<ae;ie++){const Jt=Ot[ie],Se=Pt[Jt.materialIndex];Se&&Se.visible&&y.push(A,Ct,Se,$,Vt.z,Jt)}}else Pt.visible&&y.push(A,Ct,Pt,$,Vt.z,null)}}const Et=A.children;for(let Ct=0,Pt=Et.length;Ct<Pt;Ct++)Rs(Et[Ct],q,$,Q)}function Br(A,q,$,Q){const Z=A.opaque,Et=A.transmissive,Ct=A.transparent;_.setupLightsView($),ht===!0&&At.setGlobalState(N.clippingPlanes,$),Q&&Bt.viewport(P.copy(Q)),Z.length>0&&kn(Z,q,$),Et.length>0&&kn(Et,q,$),Ct.length>0&&kn(Ct,q,$),Bt.buffers.depth.setTest(!0),Bt.buffers.depth.setMask(!0),Bt.buffers.color.setMask(!0),Bt.setPolygonOffset(!1)}function Yo(A,q,$,Q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[Q.id]===void 0&&(_.state.transmissionRenderTarget[Q.id]=new Es(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?Vo:ra,minFilter:vs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const Et=_.state.transmissionRenderTarget[Q.id],Ct=Q.viewport||P;Et.setSize(Ct.z*N.transmissionResolutionScale,Ct.w*N.transmissionResolutionScale);const Pt=N.getRenderTarget();N.setRenderTarget(Et),N.getClearColor(ct),ft=N.getClearAlpha(),ft<1&&N.setClearColor(16777215,.5),N.clear(),le&&Qt.render($);const Ot=N.toneMapping;N.toneMapping=aa;const ie=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),_.setupLightsView(Q),ht===!0&&At.setGlobalState(N.clippingPlanes,Q),kn(A,$,Q),U.updateMultisampleRenderTarget(Et),U.updateRenderTargetMipmap(Et),jt.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let Jt=0,Se=q.length;Jt<Se;Jt++){const ye=q[Jt],Ge=ye.object,Re=ye.geometry,se=ye.material,te=ye.group;if(se.side===ea&&Ge.layers.test(Q.layers)){const rn=se.side;se.side=Gn,se.needsUpdate=!0,an(Ge,$,Q,Re,se,te),se.side=rn,se.needsUpdate=!0,ae=!0}}ae===!0&&(U.updateMultisampleRenderTarget(Et),U.updateRenderTargetMipmap(Et))}N.setRenderTarget(Pt),N.setClearColor(ct,ft),ie!==void 0&&(Q.viewport=ie),N.toneMapping=Ot}function kn(A,q,$){const Q=q.isScene===!0?q.overrideMaterial:null;for(let Z=0,Et=A.length;Z<Et;Z++){const Ct=A[Z],Pt=Ct.object,Ot=Ct.geometry,ie=Q===null?Ct.material:Q,ae=Ct.group;Pt.layers.test($.layers)&&an(Pt,q,$,Ot,ie,ae)}}function an(A,q,$,Q,Z,Et){A.onBeforeRender(N,q,$,Q,Z,Et),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Z.onBeforeRender(N,q,$,Q,A,Et),Z.transparent===!0&&Z.side===ea&&Z.forceSinglePass===!1?(Z.side=Gn,Z.needsUpdate=!0,N.renderBufferDirect($,q,Q,Z,A,Et),Z.side=Ha,Z.needsUpdate=!0,N.renderBufferDirect($,q,Q,Z,A,Et),Z.side=ea):N.renderBufferDirect($,q,Q,Z,A,Et),A.onAfterRender(N,q,$,Q,Z,Et)}function sn(A,q,$){q.isScene!==!0&&(q=ge);const Q=kt.get(A),Z=_.state.lights,Et=_.state.shadowsArray,Ct=Z.state.version,Pt=Wt.getParameters(A,Z.state,Et,q,$),Ot=Wt.getProgramCacheKey(Pt);let ie=Q.programs;Q.environment=A.isMeshStandardMaterial?q.environment:null,Q.fog=q.fog,Q.envMap=(A.isMeshStandardMaterial?tt:T).get(A.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&A.envMap===null?q.environmentRotation:A.envMapRotation,ie===void 0&&(A.addEventListener("dispose",ne),ie=new Map,Q.programs=ie);let ae=ie.get(Ot);if(ae!==void 0){if(Q.currentProgram===ae&&Q.lightsStateVersion===Ct)return Cs(A,Pt),ae}else Pt.uniforms=Wt.getUniforms(A),A.onBeforeCompile(Pt,N),ae=Wt.acquireProgram(Pt,Ot),ie.set(Ot,ae),Q.uniforms=Pt.uniforms;const Jt=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Jt.clippingPlanes=At.uniform),Cs(A,Pt),Q.needsLights=jo(A),Q.lightsStateVersion=Ct,Q.needsLights&&(Jt.ambientLightColor.value=Z.state.ambient,Jt.lightProbe.value=Z.state.probe,Jt.directionalLights.value=Z.state.directional,Jt.directionalLightShadows.value=Z.state.directionalShadow,Jt.spotLights.value=Z.state.spot,Jt.spotLightShadows.value=Z.state.spotShadow,Jt.rectAreaLights.value=Z.state.rectArea,Jt.ltc_1.value=Z.state.rectAreaLTC1,Jt.ltc_2.value=Z.state.rectAreaLTC2,Jt.pointLights.value=Z.state.point,Jt.pointLightShadows.value=Z.state.pointShadow,Jt.hemisphereLights.value=Z.state.hemi,Jt.directionalShadowMap.value=Z.state.directionalShadowMap,Jt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Jt.spotShadowMap.value=Z.state.spotShadowMap,Jt.spotLightMatrix.value=Z.state.spotLightMatrix,Jt.spotLightMap.value=Z.state.spotLightMap,Jt.pointShadowMap.value=Z.state.pointShadowMap,Jt.pointShadowMatrix.value=Z.state.pointShadowMatrix),Q.currentProgram=ae,Q.uniformsList=null,ae}function Li(A){if(A.uniformsList===null){const q=A.currentProgram.getUniforms();A.uniformsList=Au.seqWithValue(q.seq,A.uniforms)}return A.uniformsList}function Cs(A,q){const $=kt.get(A);$.outputColorSpace=q.outputColorSpace,$.batching=q.batching,$.batchingColor=q.batchingColor,$.instancing=q.instancing,$.instancingColor=q.instancingColor,$.instancingMorph=q.instancingMorph,$.skinning=q.skinning,$.morphTargets=q.morphTargets,$.morphNormals=q.morphNormals,$.morphColors=q.morphColors,$.morphTargetsCount=q.morphTargetsCount,$.numClippingPlanes=q.numClippingPlanes,$.numIntersection=q.numClipIntersection,$.vertexAlphas=q.vertexAlphas,$.vertexTangents=q.vertexTangents,$.toneMapping=q.toneMapping}function Pu(A,q,$,Q,Z){q.isScene!==!0&&(q=ge),U.resetTextureUnits();const Et=q.fog,Ct=Q.isMeshStandardMaterial?q.environment:null,Pt=B===null?N.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Lr,Ot=(Q.isMeshStandardMaterial?tt:T).get(Q.envMap||Ct),ie=Q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ae=!!$.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Jt=!!$.morphAttributes.position,Se=!!$.morphAttributes.normal,ye=!!$.morphAttributes.color;let Ge=aa;Q.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ge=N.toneMapping);const Re=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,se=Re!==void 0?Re.length:0,te=kt.get(Q),rn=_.state.lights;if(ht===!0&&(xt===!0||A!==E)){const We=A===E&&Q.id===R;At.setState(Q,A,We)}let Me=!1;Q.version===te.__version?(te.needsLights&&te.lightsStateVersion!==rn.state.version||te.outputColorSpace!==Pt||Z.isBatchedMesh&&te.batching===!1||!Z.isBatchedMesh&&te.batching===!0||Z.isBatchedMesh&&te.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&te.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&te.instancing===!1||!Z.isInstancedMesh&&te.instancing===!0||Z.isSkinnedMesh&&te.skinning===!1||!Z.isSkinnedMesh&&te.skinning===!0||Z.isInstancedMesh&&te.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&te.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&te.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&te.instancingMorph===!1&&Z.morphTexture!==null||te.envMap!==Ot||Q.fog===!0&&te.fog!==Et||te.numClippingPlanes!==void 0&&(te.numClippingPlanes!==At.numPlanes||te.numIntersection!==At.numIntersection)||te.vertexAlphas!==ie||te.vertexTangents!==ae||te.morphTargets!==Jt||te.morphNormals!==Se||te.morphColors!==ye||te.toneMapping!==Ge||te.morphTargetsCount!==se)&&(Me=!0):(Me=!0,te.__version=Q.version);let zn=te.currentProgram;Me===!0&&(zn=sn(Q,q,Z));let fi=!1,wn=!1,dn=!1;const Le=zn.getUniforms(),Un=te.uniforms;if(Bt.useProgram(zn.program)&&(fi=!0,wn=!0,dn=!0),Q.id!==R&&(R=Q.id,wn=!0),fi||E!==A){Bt.buffers.depth.getReversed()?(bt.copy(A.projectionMatrix),jS(bt),ZS(bt),Le.setValue(F,"projectionMatrix",bt)):Le.setValue(F,"projectionMatrix",A.projectionMatrix),Le.setValue(F,"viewMatrix",A.matrixWorldInverse);const vn=Le.map.cameraPosition;vn!==void 0&&vn.setValue(F,zt.setFromMatrixPosition(A.matrixWorld)),Kt.logarithmicDepthBuffer&&Le.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Le.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),E!==A&&(E=A,wn=!0,dn=!0)}if(Z.isSkinnedMesh){Le.setOptional(F,Z,"bindMatrix"),Le.setOptional(F,Z,"bindMatrixInverse");const We=Z.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),Le.setValue(F,"boneTexture",We.boneTexture,U))}Z.isBatchedMesh&&(Le.setOptional(F,Z,"batchingTexture"),Le.setValue(F,"batchingTexture",Z._matricesTexture,U),Le.setOptional(F,Z,"batchingIdTexture"),Le.setValue(F,"batchingIdTexture",Z._indirectTexture,U),Le.setOptional(F,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Le.setValue(F,"batchingColorTexture",Z._colorsTexture,U));const En=$.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&qt.update(Z,$,zn),(wn||te.receiveShadow!==Z.receiveShadow)&&(te.receiveShadow=Z.receiveShadow,Le.setValue(F,"receiveShadow",Z.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(Un.envMap.value=Ot,Un.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&q.environment!==null&&(Un.envMapIntensity.value=q.environmentIntensity),wn&&(Le.setValue(F,"toneMappingExposure",N.toneMappingExposure),te.needsLights&&zu(Un,dn),Et&&Q.fog===!0&&wt.refreshFogUniforms(Un,Et),wt.refreshMaterialUniforms(Un,Q,j,st,_.state.transmissionRenderTarget[A.id]),Au.upload(F,Li(te),Un,U)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Au.upload(F,Li(te),Un,U),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Le.setValue(F,"center",Z.center),Le.setValue(F,"modelViewMatrix",Z.modelViewMatrix),Le.setValue(F,"normalMatrix",Z.normalMatrix),Le.setValue(F,"modelMatrix",Z.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const We=Q.uniformsGroups;for(let vn=0,Ds=We.length;vn<Ds;vn++){const Bn=We[vn];W.update(Bn,zn),W.bind(Bn,zn)}}return zn}function zu(A,q){A.ambientLightColor.needsUpdate=q,A.lightProbe.needsUpdate=q,A.directionalLights.needsUpdate=q,A.directionalLightShadows.needsUpdate=q,A.pointLights.needsUpdate=q,A.pointLightShadows.needsUpdate=q,A.spotLights.needsUpdate=q,A.spotLightShadows.needsUpdate=q,A.rectAreaLights.needsUpdate=q,A.hemisphereLights.needsUpdate=q}function jo(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(A,q,$){kt.get(A.texture).__webglTexture=q,kt.get(A.depthTexture).__webglTexture=$;const Q=kt.get(A);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=$===void 0,Q.__autoAllocateDepthBuffer||jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,q){const $=kt.get(A);$.__webglFramebuffer=q,$.__useDefaultFramebuffer=q===void 0};const Ga=F.createFramebuffer();this.setRenderTarget=function(A,q=0,$=0){B=A,H=q,L=$;let Q=!0,Z=null,Et=!1,Ct=!1;if(A){const Ot=kt.get(A);if(Ot.__useDefaultFramebuffer!==void 0)Bt.bindFramebuffer(F.FRAMEBUFFER,null),Q=!1;else if(Ot.__webglFramebuffer===void 0)U.setupRenderTarget(A);else if(Ot.__hasExternalTextures)U.rebindTextures(A,kt.get(A.texture).__webglTexture,kt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Jt=A.depthTexture;if(Ot.__boundDepthTexture!==Jt){if(Jt!==null&&kt.has(Jt)&&(A.width!==Jt.image.width||A.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(A)}}const ie=A.texture;(ie.isData3DTexture||ie.isDataArrayTexture||ie.isCompressedArrayTexture)&&(Ct=!0);const ae=kt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ae[q])?Z=ae[q][$]:Z=ae[q],Et=!0):A.samples>0&&U.useMultisampledRTT(A)===!1?Z=kt.get(A).__webglMultisampledFramebuffer:Array.isArray(ae)?Z=ae[$]:Z=ae,P.copy(A.viewport),ot.copy(A.scissor),at=A.scissorTest}else P.copy(nt).multiplyScalar(j).floor(),ot.copy(Tt).multiplyScalar(j).floor(),at=vt;if($!==0&&(Z=Ga),Bt.bindFramebuffer(F.FRAMEBUFFER,Z)&&Q&&Bt.drawBuffers(A,Z),Bt.viewport(P),Bt.scissor(ot),Bt.setScissorTest(at),Et){const Ot=kt.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ot.__webglTexture,$)}else if(Ct){const Ot=kt.get(A.texture),ie=q;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.__webglTexture,$,ie)}else if(A!==null&&$!==0){const Ot=kt.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ot.__webglTexture,$)}R=-1},this.readRenderTargetPixels=function(A,q,$,Q,Z,Et,Ct){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=kt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Pt=Pt[Ct]),Pt){Bt.bindFramebuffer(F.FRAMEBUFFER,Pt);try{const Ot=A.texture,ie=Ot.format,ae=Ot.type;if(!Kt.textureFormatReadable(ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=A.width-Q&&$>=0&&$<=A.height-Z&&F.readPixels(q,$,Q,Z,$t.convert(ie),$t.convert(ae),Et)}finally{const Ot=B!==null?kt.get(B).__webglFramebuffer:null;Bt.bindFramebuffer(F.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,q,$,Q,Z,Et,Ct){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=kt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Pt=Pt[Ct]),Pt){const Ot=A.texture,ie=Ot.format,ae=Ot.type;if(!Kt.textureFormatReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=A.width-Q&&$>=0&&$<=A.height-Z){Bt.bindFramebuffer(F.FRAMEBUFFER,Pt);const Jt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Jt),F.bufferData(F.PIXEL_PACK_BUFFER,Et.byteLength,F.STREAM_READ),F.readPixels(q,$,Q,Z,$t.convert(ie),$t.convert(ae),0);const Se=B!==null?kt.get(B).__webglFramebuffer:null;Bt.bindFramebuffer(F.FRAMEBUFFER,Se);const ye=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await YS(F,ye,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Jt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Et),F.deleteBuffer(Jt),F.deleteSync(ye),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,q=null,$=0){A.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,A=arguments[1]);const Q=Math.pow(2,-$),Z=Math.floor(A.image.width*Q),Et=Math.floor(A.image.height*Q),Ct=q!==null?q.x:0,Pt=q!==null?q.y:0;U.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,Ct,Pt,Z,Et),Bt.unbindTexture()};const Ir=F.createFramebuffer(),Ni=F.createFramebuffer();this.copyTextureToTexture=function(A,q,$=null,Q=null,Z=0,Et=null){A.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,A=arguments[1],q=arguments[2],Et=arguments[3]||0,$=null),Et===null&&(Z!==0?(Sr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Et=Z,Z=0):Et=0);let Ct,Pt,Ot,ie,ae,Jt,Se,ye,Ge;const Re=A.isCompressedTexture?A.mipmaps[Et]:A.image;if($!==null)Ct=$.max.x-$.min.x,Pt=$.max.y-$.min.y,Ot=$.isBox3?$.max.z-$.min.z:1,ie=$.min.x,ae=$.min.y,Jt=$.isBox3?$.min.z:0;else{const En=Math.pow(2,-Z);Ct=Math.floor(Re.width*En),Pt=Math.floor(Re.height*En),A.isDataArrayTexture?Ot=Re.depth:A.isData3DTexture?Ot=Math.floor(Re.depth*En):Ot=1,ie=0,ae=0,Jt=0}Q!==null?(Se=Q.x,ye=Q.y,Ge=Q.z):(Se=0,ye=0,Ge=0);const se=$t.convert(q.format),te=$t.convert(q.type);let rn;q.isData3DTexture?(U.setTexture3D(q,0),rn=F.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(U.setTexture2DArray(q,0),rn=F.TEXTURE_2D_ARRAY):(U.setTexture2D(q,0),rn=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,q.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,q.unpackAlignment);const Me=F.getParameter(F.UNPACK_ROW_LENGTH),zn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),fi=F.getParameter(F.UNPACK_SKIP_PIXELS),wn=F.getParameter(F.UNPACK_SKIP_ROWS),dn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Re.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Re.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ie),F.pixelStorei(F.UNPACK_SKIP_ROWS,ae),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Jt);const Le=A.isDataArrayTexture||A.isData3DTexture,Un=q.isDataArrayTexture||q.isData3DTexture;if(A.isDepthTexture){const En=kt.get(A),We=kt.get(q),vn=kt.get(En.__renderTarget),Ds=kt.get(We.__renderTarget);Bt.bindFramebuffer(F.READ_FRAMEBUFFER,vn.__webglFramebuffer),Bt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ds.__webglFramebuffer);for(let Bn=0;Bn<Ot;Bn++)Le&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,kt.get(A).__webglTexture,Z,Jt+Bn),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,kt.get(q).__webglTexture,Et,Ge+Bn)),F.blitFramebuffer(ie,ae,Ct,Pt,Se,ye,Ct,Pt,F.DEPTH_BUFFER_BIT,F.NEAREST);Bt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Bt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Z!==0||A.isRenderTargetTexture||kt.has(A)){const En=kt.get(A),We=kt.get(q);Bt.bindFramebuffer(F.READ_FRAMEBUFFER,Ir),Bt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ni);for(let vn=0;vn<Ot;vn++)Le?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,En.__webglTexture,Z,Jt+vn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,En.__webglTexture,Z),Un?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,We.__webglTexture,Et,Ge+vn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,We.__webglTexture,Et),Z!==0?F.blitFramebuffer(ie,ae,Ct,Pt,Se,ye,Ct,Pt,F.COLOR_BUFFER_BIT,F.NEAREST):Un?F.copyTexSubImage3D(rn,Et,Se,ye,Ge+vn,ie,ae,Ct,Pt):F.copyTexSubImage2D(rn,Et,Se,ye,ie,ae,Ct,Pt);Bt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Bt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Un?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(rn,Et,Se,ye,Ge,Ct,Pt,Ot,se,te,Re.data):q.isCompressedArrayTexture?F.compressedTexSubImage3D(rn,Et,Se,ye,Ge,Ct,Pt,Ot,se,Re.data):F.texSubImage3D(rn,Et,Se,ye,Ge,Ct,Pt,Ot,se,te,Re):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Et,Se,ye,Ct,Pt,se,te,Re.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Et,Se,ye,Re.width,Re.height,se,Re.data):F.texSubImage2D(F.TEXTURE_2D,Et,Se,ye,Ct,Pt,se,te,Re);F.pixelStorei(F.UNPACK_ROW_LENGTH,Me),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,zn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,fi),F.pixelStorei(F.UNPACK_SKIP_ROWS,wn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,dn),Et===0&&q.generateMipmaps&&F.generateMipmap(rn),Bt.unbindTexture()},this.copyTextureToTexture3D=function(A,q,$=null,Q=null,Z=0){return A.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Q=arguments[1]||null,A=arguments[2],q=arguments[3],Z=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,q,$,Q,Z)},this.initRenderTarget=function(A){kt.get(A).__webglFramebuffer===void 0&&U.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?U.setTextureCube(A,0):A.isData3DTexture?U.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?U.setTexture2DArray(A,0):U.setTexture2D(A,0),Bt.unbindTexture()},this.resetState=function(){H=0,L=0,B=null,Bt.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ia}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=we._getDrawingBufferColorSpace(t),i.unpackColorSpace=we._getUnpackColorSpace()}}const X_={type:"change"},_d={type:"start"},A0={type:"end"},Su=new c0,W_=new Ba,uA=Math.cos(70*ds.DEG2RAD),cn=new et,Hn=2*Math.PI,ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},vh=1e-6;class cA extends by{constructor(t,i=null){super(t,i),this.state=ze.NONE,this.enabled=!0,this.target=new et,this.cursor=new et,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Er.ROTATE,MIDDLE:Er.DOLLY,RIGHT:Er.PAN},this.touches={ONE:yr.ROTATE,TWO:yr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new et,this._lastQuaternion=new Ts,this._lastTargetPosition=new et,this._quat=new Ts().setFromUnitVectors(t.up,new et(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new v_,this._sphericalDelta=new v_,this._scale=1,this._panOffset=new et,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new et,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hA.bind(this),this._onPointerDown=fA.bind(this),this._onPointerUp=dA.bind(this),this._onContextMenu=SA.bind(this),this._onMouseWheel=gA.bind(this),this._onKeyDown=_A.bind(this),this._onTouchStart=vA.bind(this),this._onTouchMove=xA.bind(this),this._onMouseDown=pA.bind(this),this._onMouseMove=mA.bind(this),this._interceptControlDown=yA.bind(this),this._interceptControlUp=MA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(X_),this.update(),this.state=ze.NONE}update(t=null){const i=this.object.position;cn.copy(i).sub(this.target),cn.applyQuaternion(this._quat),this._spherical.setFromVector3(cn),this.autoRotate&&this.state===ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Hn:s>Math.PI&&(s-=Hn),l<-Math.PI?l+=Hn:l>Math.PI&&(l-=Hn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(cn.setFromSpherical(this._spherical),cn.applyQuaternion(this._quatInverse),i.copy(this.target).add(cn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=cn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new et(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new et(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=cn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Su.origin.copy(this.object.position),Su.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Su.direction))<uA?this.object.lookAt(this.target):(W_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Su.intersectPlane(W_,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>vh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>vh||this._lastTargetPosition.distanceToSquared(this.target)>vh?(this.dispatchEvent(X_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Hn/60*this.autoRotateSpeed*t:Hn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){cn.setFromMatrixColumn(i,0),cn.multiplyScalar(-t),this._panOffset.add(cn)}_panUp(t,i){this.screenSpacePanning===!0?cn.setFromMatrixColumn(i,1):(cn.setFromMatrixColumn(i,0),cn.crossVectors(this.object.up,cn)),cn.multiplyScalar(t),this._panOffset.add(cn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;cn.copy(l).sub(this.target);let c=cn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new he,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function fA(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function hA(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function dA(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(A0),this.state=ze.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function pA(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Er.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ze.DOLLY;break;case Er.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ze.ROTATE}break;case Er.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ze.PAN}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(_d)}function mA(r){switch(this.state){case ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function gA(r){this.enabled===!1||this.enableZoom===!1||this.state!==ze.NONE||(r.preventDefault(),this.dispatchEvent(_d),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(A0))}function _A(r){this.enabled!==!1&&this._handleKeyDown(r)}function vA(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case yr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ze.TOUCH_ROTATE;break;case yr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ze.TOUCH_PAN;break;default:this.state=ze.NONE}break;case 2:switch(this.touches.TWO){case yr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ze.TOUCH_DOLLY_PAN;break;case yr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ze.TOUCH_DOLLY_ROTATE;break;default:this.state=ze.NONE}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(_d)}function xA(r){switch(this._trackPointer(r),this.state){case ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ze.NONE}}function SA(r){this.enabled!==!1&&r.preventDefault()}function yA(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function MA(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const EA=`
precision highp float;

varying vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`,TA=`
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uFov;
uniform vec3 uCameraPosition;
uniform vec3 uCameraForward;
uniform vec3 uCameraRight;
uniform vec3 uCameraUp;

uniform float uRs;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulence;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform float uBloomStrength;
uniform float uBloomThreshold;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uDispersion;
uniform float uMaxSteps;
uniform float uDiskSamples;
uniform float uDebug;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const int MAX_STEPS = 220;

struct TraceResult {
  vec3 diskColor;
  vec3 escapedDirection;
  float steps;
  float crossings;
  float captured;
  float escaped;
  float redshift;
  float doppler;
  float curvature;
  float starValue;
  float galaxyValue;
  float critical;
  float impact;
};

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += valueNoise(p) * amplitude;
    p = p * 2.03 + vec2(17.17, -9.31);
    amplitude *= 0.5;
  }
  return value;
}

vec3 blackbody(float temperature) {
  float t = clamp(temperature, 0.0, 1.0);
  vec3 cool = vec3(0.82, 0.045, 0.006);
  vec3 warm = vec3(1.0, 0.27, 0.025);
  vec3 hot = vec3(1.0, 0.92, 0.64);
  return mix(mix(cool, warm, smoothstep(0.0, 0.5, t)), hot, smoothstep(0.45, 1.0, t));
}

vec3 diskEmission(vec3 point, vec3 rayDirection, float crossingIndex, out float localDoppler, out float localRedshift, out float localEnergy) {
  vec2 planePoint = point.xz;
  float radius = length(planePoint);
  float radialIn = smoothstep(uDiskInner - 0.14, uDiskInner + 0.22, radius);
  float radialOut = 1.0 - smoothstep(uDiskOuter - 0.55, uDiskOuter + 0.18, radius);
  float radial = radialIn * radialOut;
  float angle = atan(planePoint.y, planePoint.x);
  float flow = angle * 3.0 + log(max(radius, 1.01)) * 7.0;
  float turbulence = fbm(vec2(flow * 0.72, radius * 0.78) + vec2(uTime * uTurbulenceSpeed * 0.35, -uTime * uTurbulenceSpeed * 0.19));
  turbulence = mix(1.0, 0.52 + turbulence * 1.22, clamp(uTurbulence, 0.0, 1.0));

  vec3 tangent = normalize(vec3(-planePoint.y, 0.0, planePoint.x));
  float orbitalBeta = clamp(uOrbitalSpeed * sqrt(uRs / max(2.0 * radius, 0.01)), 0.025, 0.78);
  float gamma = inversesqrt(max(0.05, 1.0 - orbitalBeta * orbitalBeta));
  localDoppler = 1.0 / (gamma * max(0.08, 1.0 - orbitalBeta * dot(tangent, -rayDirection)));
  localRedshift = sqrt(max(0.035, 1.0 - uRs / max(radius, uRs + 0.02)));
  float spectralShift = clamp(localDoppler * localRedshift, 0.28, 2.2);
  float innerHeat = 1.0 - smoothstep(uDiskInner, uDiskOuter, radius);
  float temperature = clamp(uDiskTemperature * (0.32 + innerHeat * 0.9) * turbulence * spectralShift, 0.0, 1.6);
  vec3 color = blackbody(clamp(temperature * 0.82, 0.0, 1.0));
  float edge = 0.68 + 0.32 * smoothstep(-uDiskThickness, uDiskThickness, abs(point.y));
  float relativisticGain = pow(max(0.1, localDoppler * localRedshift), 3.0);
  float movingRim = 0.82 + 0.18 * sin(angle * 5.0 + uTime * uTurbulenceSpeed);
  localEnergy = radial * turbulence * edge * movingRim * relativisticGain;
  localEnergy *= (0.72 + 0.28 * exp(-radius * 0.13)) * uDiskEmission;
  localEnergy *= 1.0 / (1.0 + 0.35 * crossingIndex);
  return color * localEnergy;
}

vec3 proceduralSky(vec3 direction, out float starValue, out float galaxyValue) {
  vec3 d = normalize(direction);
  float longitude = atan(d.z, d.x);
  float latitude = asin(clamp(d.y, -1.0, 1.0));
  vec2 skyUv = vec2(longitude / TAU + 0.5, latitude / PI + 0.5);
  float cloud = fbm(skyUv * vec2(9.0, 5.0) + vec2(2.0, -3.0));
  float galacticLatitude = latitude + 0.12 * sin(longitude * 2.3) + 0.035 * sin(longitude * 8.0);
  float band = exp(-pow(abs(galacticLatitude) / 0.19, 2.0));
  galaxyValue = band * (0.32 + cloud * 0.88) * uGalaxyBrightness;
  vec3 galaxy = vec3(0.33, 0.11, 0.18) * galaxyValue;
  galaxy += vec3(0.055, 0.15, 0.31) * band * band * (0.38 + cloud * 0.44) * uGalaxyBrightness;

  starValue = 0.0;
  vec3 stars = vec3(0.0);
  for (int layer = 0; layer < 3; layer++) {
    float scale = 42.0 + float(layer) * 68.0;
    vec2 grid = skyUv * scale;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;
    float seed = hash21(cell + vec2(float(layer) * 43.1, float(layer) * 17.7));
    float threshold = 0.992 - uStarDensity * (0.024 - float(layer) * 0.004);
    float star = 1.0 - smoothstep(0.0, 0.06, length(local - vec2(hash11(seed + 1.7) - 0.5, hash11(seed + 4.1) - 0.5) * 0.18));
    star *= step(threshold, seed);
    float hue = hash11(seed + 8.0);
    vec3 starColor = mix(vec3(0.55, 0.72, 1.0), vec3(1.0, 0.55, 0.2), hue);
    stars += starColor * star * (1.0 + float(layer) * 1.8);
    starValue += star * (1.0 + float(layer) * 1.8);
  }
  stars *= (0.48 + 0.82 * uStarDensity);
  vec3 deep = vec3(0.0012, 0.0024, 0.008) + galaxy;
  return deep + stars;
}

// Schwarzschild null-geodesic integration in a stable spatial affine form.
// The state is position plus a unit spatial direction. The curvature term
// uses conserved angular momentum L = r x k, producing d2r/ds2 =
// -3 Rs |L|^2 r / (2 |r|^5). Each step checks the event horizon and disk
// plane, so multiple ordered disk crossings contribute along one bent ray.
TraceResult traceNullGeodesic(vec3 rayOrigin, vec3 rayDirection) {
  TraceResult result;
  result.diskColor = vec3(0.0);
  result.escapedDirection = normalize(rayDirection);
  result.steps = 0.0;
  result.crossings = 0.0;
  result.captured = 0.0;
  result.escaped = 0.0;
  result.redshift = 0.0;
  result.doppler = 0.0;
  result.curvature = 0.0;
  result.starValue = 0.0;
  result.galaxyValue = 0.0;
  result.impact = length(cross(rayOrigin, rayDirection));
  result.critical = exp(-pow((result.impact - 2.60) / 0.11, 2.0));

  vec3 position = rayOrigin;
  vec3 direction = normalize(rayDirection);
  vec3 previous = position;
  float throughput = 1.0;
  float previousRadius = length(position);

  for (int i = 0; i < MAX_STEPS; i++) {
    if (float(i) >= uMaxSteps) {
      break;
    }
    float radius = length(position);
    result.steps = float(i) + 1.0;
    if (radius <= uRs * 1.015) {
      result.captured = 1.0;
      break;
    }
    if (radius > 25.0 && i > 8) {
      result.escaped = 1.0;
      break;
    }

    float adaptiveStep = mix(0.013, 0.088, smoothstep(1.4, 15.0, radius));
    adaptiveStep *= mix(0.72, 1.0, clamp(radius / 8.0, 0.0, 1.0));
    vec3 angularMomentum = cross(position, direction);
    float angularMomentumSquared = dot(angularMomentum, angularMomentum);
    vec3 curvatureAcceleration = -1.5 * uRs * angularMomentumSquared * position / max(pow(radius, 5.0), 0.001);
    result.curvature = max(result.curvature, length(curvatureAcceleration));
    vec3 nextDirection = normalize(direction + curvatureAcceleration * adaptiveStep);
    vec3 nextPosition = position + direction * adaptiveStep;

    float planeCrossed = previous.y * nextPosition.y;
    if (planeCrossed <= 0.0 && abs(previous.y - nextPosition.y) > 0.0001 && result.crossings < uDiskSamples) {
      float hitT = clamp(previous.y / (previous.y - nextPosition.y), 0.0, 1.0);
      vec3 hitPoint = mix(previous, nextPosition, hitT);
      float hitRadius = length(hitPoint.xz);
      if (hitRadius > uDiskInner - uDiskThickness && hitRadius < uDiskOuter + uDiskThickness && abs(hitPoint.y) < uDiskThickness + 0.035) {
        float localDoppler;
        float localRedshift;
        float localEnergy;
        vec3 layer = diskEmission(hitPoint, direction, result.crossings, localDoppler, localRedshift, localEnergy);
        result.diskColor += layer * throughput;
        result.doppler += localDoppler * localEnergy;
        result.redshift += localRedshift * localEnergy;
        result.crossings += 1.0;
        throughput *= 0.58;
      }
    }

    previous = position;
    previousRadius = radius;
    position = nextPosition;
    direction = nextDirection;
  }

  result.escapedDirection = direction;
  vec3 background = proceduralSky(direction, result.starValue, result.galaxyValue);
  if (result.captured > 0.5) {
    background = vec3(0.0);
  }
  result.diskColor *= 1.0 - 0.025 * clamp(previousRadius - uRs, 0.0, 10.0);
  result.diskColor = max(result.diskColor, vec3(0.0));
  return result;
}

vec3 acesToneMap(vec3 color) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((color * (a * color + b)) / (color * (c * color + d) + e), 0.0, 1.0);
}

vec3 debugColor(float mode, TraceResult result, vec3 hdr, vec3 background) {
  if (mode > 0.5 && mode < 1.5) {
    float progress = clamp(result.steps / max(uMaxSteps, 1.0), 0.0, 1.0);
    return vec3(progress, result.escaped, result.captured);
  }
  if (mode > 1.5 && mode < 2.5) {
    return mix(vec3(0.015, 0.02, 0.035), vec3(0.88, 0.025, 0.012), result.captured) + vec3(result.critical * 0.65);
  }
  if (mode > 2.5 && mode < 3.5) {
    return vec3(clamp(result.crossings / 3.0, 0.0, 1.0), result.crossings > 0.5 ? 0.85 : 0.03, result.crossings > 1.5 ? 0.95 : 0.03);
  }
  if (mode > 3.5 && mode < 4.5) {
    float shift = clamp((result.doppler / max(result.redshift, 0.01)) * 0.35, 0.0, 1.0);
    return vec3(shift, clamp(result.redshift * 0.25, 0.0, 1.0), 1.0 - shift);
  }
  if (mode > 4.5 && mode < 5.5) {
    return result.escapedDirection * 0.5 + 0.5;
  }
  if (mode > 5.5 && mode < 6.5) {
    return background * 4.0;
  }
  if (mode > 6.5 && mode < 7.5) {
    return vec3(1.0 - exp(-max(hdr, vec3(0.0)) * 0.18));
  }
  if (mode > 7.5 && mode < 8.5) {
    return vec3(result.critical * 1.8, result.critical * 0.28, result.critical * 0.02);
  }
  return vec3(clamp(result.curvature * 2.2, 0.0, 1.0), clamp(result.steps / max(uMaxSteps, 1.0), 0.0, 1.0), clamp(result.impact / 6.0, 0.0, 1.0));
}

void main() {
  vec2 centered = vUv - 0.5;
  centered.x *= uResolution.x / max(uResolution.y, 1.0);
  float tangentFov = tan(radians(uFov) * 0.5);
  vec3 rayDirection = normalize(uCameraForward + uCameraRight * centered.x * tangentFov * 2.0 + uCameraUp * centered.y * tangentFov * 2.0);
  TraceResult result = traceNullGeodesic(uCameraPosition, rayDirection);
  vec3 background = proceduralSky(result.escapedDirection, result.starValue, result.galaxyValue);

  float diskLuminance = dot(result.diskColor, vec3(0.2126, 0.7152, 0.0722));
  float bloomGate = smoothstep(uBloomThreshold * 0.18, uBloomThreshold * 1.65, diskLuminance);
  float ringHalo = exp(-pow((result.impact - 2.60) / 0.29, 2.0)) * (0.3 + 0.7 * result.critical);
  vec3 ringColor = vec3(1.0, 0.23, 0.035) * ringHalo * (0.14 + 0.32 * uBloomStrength);
  vec3 bloomColor = vec3(1.0, 0.16, 0.018) * bloomGate * uBloomStrength * 0.42;
  vec3 hdr = background + result.diskColor + ringColor + bloomColor;
  if (result.captured > 0.5) {
    hdr = result.diskColor + ringColor + bloomColor;
  }
  hdr *= max(0.05, uExposure);

  vec3 outputColor;
  if (uDebug > 0.5) {
    outputColor = debugColor(uDebug, result, hdr, background);
    outputColor = acesToneMap(max(outputColor, vec3(0.0)));
  } else {
    float edge = clamp(length(centered) * 0.72, 0.0, 1.0);
    hdr *= 1.0 - edge * edge * uVignette;
    float aberration = uDispersion * edge * 0.18;
    hdr.r *= 1.0 + aberration;
    hdr.b *= 1.0 - aberration;
    outputColor = acesToneMap(max(hdr, vec3(0.0)));
    float grain = (hash21(gl_FragCoord.xy + uTime * 17.0) - 0.5) * uGrain;
    outputColor += grain;
  }
  gl_FragColor = vec4(clamp(outputColor, 0.0, 1.0), 1.0);
}
`,vd="gargantua.state.v1",R0=1,za={standard:{label:"Standard",scale:.62,steps:82,crossings:2},high:{label:"High",scale:.82,steps:132,crossings:3},cinematic:{label:"Cinematic",scale:1,steps:190,crossings:4}},xs=[{name:"EQUATORIAL",note:"front-on ring",cameraDistance:8.8,cameraAzimuth:0,cameraElevation:11,fov:48},{name:"OBLIQUE",note:"lensed crescent",cameraDistance:8.4,cameraAzimuth:24,cameraElevation:18,fov:46},{name:"POLAR",note:"high inclination",cameraDistance:9.4,cameraAzimuth:-18,cameraElevation:52,fov:43},{name:"CLOSE PASS",note:"photon sphere",cameraDistance:5.8,cameraAzimuth:138,cameraElevation:17,fov:39}],q_=["FINAL COMPOSITE","RAY STEPS / TERMINATION","EVENT HORIZON MASK","DISK CROSSINGS / ORDER","REDSHIFT + DOPPLER","LENSED BACKGROUND VECTOR","STARS + GALAXY FIELD","PRE-TONE HDR ENERGY","PHOTON RING / CRITICAL","CURVATURE / IMPACT"],C0=[{key:"fov",label:"Field of view",min:24,max:78,step:.5,unit:"°"},{key:"cameraDistance",label:"Camera distance",min:4.2,max:15,step:.1,unit:"rₛ"},{key:"cameraAzimuth",label:"Camera azimuth",min:-180,max:180,step:1,unit:"°"},{key:"cameraElevation",label:"Camera elevation",min:4,max:74,step:1,unit:"°"},{key:"timeMultiplier",label:"Time multiplier",min:0,max:4,step:.05,unit:"×"},{key:"diskInner",label:"Disk inner radius",min:1.85,max:4.8,step:.05,unit:"rₛ"},{key:"diskOuter",label:"Disk outer radius",min:5.5,max:14,step:.1,unit:"rₛ"},{key:"diskThickness",label:"Disk half-thickness",min:.04,max:.6,step:.01,unit:"rₛ"},{key:"diskTemperature",label:"Disk temperature",min:.35,max:2,step:.01,unit:"T"},{key:"diskEmission",label:"Disk emission",min:.4,max:8,step:.05,unit:"×"},{key:"orbitalSpeed",label:"Orbital speed",min:.2,max:1.5,step:.01,unit:"×"},{key:"turbulence",label:"Turbulence amplitude",min:0,max:1,step:.01,unit:"×"},{key:"turbulenceSpeed",label:"Turbulence speed",min:0,max:3,step:.05,unit:"×"},{key:"starDensity",label:"Stellar density",min:.15,max:2.5,step:.05,unit:"×"},{key:"galaxyBrightness",label:"Galaxy brightness",min:0,max:2,step:.05,unit:"×"},{key:"bloomStrength",label:"Bloom strength",min:0,max:1.6,step:.02,unit:"×"},{key:"bloomThreshold",label:"Bloom threshold",min:.2,max:3,step:.05,unit:"HDR"},{key:"exposure",label:"Exposure",min:.35,max:2.4,step:.02,unit:"×"},{key:"vignette",label:"Vignette",min:0,max:.9,step:.01,unit:"×"},{key:"grain",label:"Film grain",min:0,max:.18,step:.005,unit:"×"},{key:"dispersion",label:"Chromatic dispersion",min:0,max:.3,step:.01,unit:"×"}],Mn={quality:"high",preset:1,debug:0,time:0,hud:!0,moviePlaying:!0,capture:!1,fov:46,cameraDistance:8.4,cameraAzimuth:24,cameraElevation:18,timeMultiplier:1,diskInner:2.25,diskOuter:9.6,diskThickness:.17,diskTemperature:1.14,diskEmission:2.7,orbitalSpeed:1,turbulence:.36,turbulenceSpeed:.8,starDensity:1.2,galaxyBrightness:.82,bloomStrength:.76,bloomThreshold:1.1,exposure:1.06,vignette:.44,grain:.045,dispersion:.08},Ru=(r,t,i)=>Math.min(i,Math.max(t,r));function xd(r){return typeof r=="string"&&Object.prototype.hasOwnProperty.call(za,r)}function sd(r,t,i,s){const l=Number(r);return Number.isFinite(l)?Ru(l,i,s):t}function Uu(r,t,i,s){const l=Number(r);return Number.isInteger(l)&&l>=i&&l<=s?l:t}function Ss(r){const t=r&&typeof r=="object"?r:{},i={...Mn,...t};return i.quality=xd(t.quality)?t.quality:Mn.quality,i.preset=Uu(t.preset,Mn.preset,0,xs.length-1),i.debug=Uu(t.debug,Mn.debug,0,9),i.time=sd(t.time,Mn.time,0,1e9),i.hud=typeof t.hud=="boolean"?t.hud:Mn.hud,i.moviePlaying=typeof t.moviePlaying=="boolean"?t.moviePlaying:Mn.moviePlaying,C0.forEach(({key:s,min:l,max:c})=>{i[s]=sd(t[s],Mn[s],l,c)}),i.diskOuter=Math.max(i.diskOuter,i.diskInner+.5),i.capture=!!t.capture,i}function bA(){try{const r=window.localStorage.getItem(vd);if(!r)return Ss(Mn);const t=JSON.parse(r);return!t||t.version!==R0?Ss(Mn):Ss(t.state)}catch{return Ss(Mn)}}function AA(r){const t=new URLSearchParams(window.location.search),i=t.get("capture")==="1",s={...r,capture:i},l=t.get("quality");l!==null&&(s.quality=xd(l)?l:Mn.quality);const c=t.get("preset");if(c!==null){const p=Uu(c,Mn.preset,0,xs.length-1),g=xs[p];s.preset=p,s.fov=g.fov,s.cameraDistance=g.cameraDistance,s.cameraAzimuth=g.cameraAzimuth,s.cameraElevation=g.cameraElevation}const h=t.get("debug");h!==null&&(s.debug=Uu(h,Mn.debug,0,9));const d=t.get("hud");d!==null&&(s.hud=d==="0"||d==="1"?d==="1":Mn.hud);const m=t.get("time");return m!==null&&(s.time=sd(m,Mn.time,0,1e9)),i&&(s.moviePlaying=!1),Ss(s)}function RA(r,t,i){const s=t<.01?3:t<.1?2:t<1?1:0;return`${Number(r).toFixed(s)}${i?` ${i}`:""}`}function CA(r){try{const{capture:t,...i}=r;window.localStorage.setItem(vd,JSON.stringify({version:R0,state:i}))}catch{}}function DA(){return AA(bA())}function wA(){const r=un.useRef(null),t=un.useRef(DA()),i=un.useRef(t.current.time),s=un.useRef(!1),l=un.useRef(!1);un.useRef(null);const[c,h]=un.useState(t.current),[d,m]=un.useState(!1),[p,g]=un.useState("ready"),[x,S]=un.useState(i.current),M=un.useCallback((L,B=!0)=>{const R=t.current,E=typeof L=="function"?L(R):L,P=Ss({...R,...E});return t.current=P,B&&CA(P),h(P),P},[]),C=un.useCallback(()=>{const L=Ss({...Mn,capture:t.current.capture});t.current=L,i.current=L.time;try{window.localStorage.removeItem(vd)}catch{}h(L)},[]),D=un.useCallback(L=>{if(!Number.isInteger(L)||L<0||L>=xs.length)return t.current;const B=xs[L];return M({preset:L,fov:B.fov,cameraDistance:B.cameraDistance,cameraAzimuth:B.cameraAzimuth,cameraElevation:B.cameraElevation,moviePlaying:!1})},[M]),y=un.useCallback(L=>xd(L)?M({quality:L}):{...t.current},[M]),_=un.useCallback(L=>!Number.isInteger(L)||L<0||L>9?{...t.current}:M({debug:L}),[M]),I=un.useCallback(L=>{const B=Number(L);return!Number.isFinite(B)||B<0?{...t.current,time:i.current}:(i.current=B,M({time:B},!0))},[M]);un.useEffect(()=>{t.current=c},[c]),un.useEffect(()=>{document.documentElement.dataset.gargantuaReady="false";const L=r.current;if(!L)return;let B,R,E,P,ot,at,ct,ft,X=performance.now(),st="",j="",yt=!1,w=0,nt=!1,Tt=0;const vt={uResolution:{value:new he(1,1)},uTime:{value:i.current},uFov:{value:t.current.fov},uCameraPosition:{value:new et},uCameraForward:{value:new et(0,0,-1)},uCameraRight:{value:new et(1,0,0)},uCameraUp:{value:new et(0,1,0)},uRs:{value:1},uDiskInner:{value:t.current.diskInner},uDiskOuter:{value:t.current.diskOuter},uDiskThickness:{value:t.current.diskThickness},uDiskTemperature:{value:t.current.diskTemperature},uDiskEmission:{value:t.current.diskEmission},uOrbitalSpeed:{value:t.current.orbitalSpeed},uTurbulence:{value:t.current.turbulence},uTurbulenceSpeed:{value:t.current.turbulenceSpeed},uStarDensity:{value:t.current.starDensity},uGalaxyBrightness:{value:t.current.galaxyBrightness},uBloomStrength:{value:t.current.bloomStrength},uBloomThreshold:{value:t.current.bloomThreshold},uExposure:{value:t.current.exposure},uVignette:{value:t.current.vignette},uGrain:{value:t.current.grain},uDispersion:{value:t.current.dispersion},uMaxSteps:{value:za[t.current.quality].steps},uDiskSamples:{value:za[t.current.quality].crossings},uDebug:{value:t.current.debug}},Y=()=>new la({uniforms:vt,vertexShader:EA,fragmentShader:TA,depthWrite:!1,depthTest:!1}),ht=It=>[It.fov,It.cameraDistance,It.cameraAzimuth,It.cameraElevation].join("|"),xt=(It,jt=!1)=>{const Kt=ht(It);if(!jt&&Kt===j)return;yt=!0;const Bt=ds.degToRad(It.cameraAzimuth),ve=ds.degToRad(Ru(It.cameraElevation,4,74)),kt=It.cameraDistance*Math.cos(ve);E.position.set(kt*Math.sin(Bt),It.cameraDistance*Math.sin(ve),kt*Math.cos(Bt)),E.fov=It.fov,E.updateProjectionMatrix(),P.target.set(0,0,0),P.update(),j=Kt,yt=!1},bt=()=>{if(yt||!E||!P)return;const It=E.position.clone().sub(P.target),jt=It.length(),Kt=ds.radToDeg(Math.atan2(It.x,It.z)),Bt=ds.radToDeg(Math.asin(Ru(It.y/Math.max(jt,.001),-1,1))),ve=t.current,kt={cameraDistance:Number(jt.toFixed(3)),cameraAzimuth:Number(Kt.toFixed(2)),cameraElevation:Number(Bt.toFixed(2)),moviePlaying:!1};j=ht({...ve,...kt}),M(kt)},Rt=()=>{if(!B||!E)return;const It=t.current,jt=za[It.quality],Kt=Math.min(window.devicePixelRatio||1,2)*jt.scale;B.setPixelRatio(Kt),B.setSize(window.innerWidth,window.innerHeight,!1),E.aspect=window.innerWidth/Math.max(window.innerHeight,1),E.updateProjectionMatrix();const Bt=B.getDrawingBufferSize(new he);vt.uResolution.value.copy(Bt)},zt=()=>{const It=t.current,jt=za[It.quality];vt.uTime.value=i.current,vt.uFov.value=It.fov,vt.uDiskInner.value=It.diskInner,vt.uDiskOuter.value=Math.max(It.diskOuter,It.diskInner+.5),vt.uDiskThickness.value=It.diskThickness,vt.uDiskTemperature.value=It.diskTemperature,vt.uDiskEmission.value=It.diskEmission,vt.uOrbitalSpeed.value=It.orbitalSpeed,vt.uTurbulence.value=It.turbulence,vt.uTurbulenceSpeed.value=It.turbulenceSpeed,vt.uStarDensity.value=It.starDensity,vt.uGalaxyBrightness.value=It.galaxyBrightness,vt.uBloomStrength.value=It.bloomStrength,vt.uBloomThreshold.value=It.bloomThreshold,vt.uExposure.value=It.exposure,vt.uVignette.value=It.vignette,vt.uGrain.value=It.grain,vt.uDispersion.value=It.dispersion,vt.uMaxSteps.value=jt.steps,vt.uDiskSamples.value=jt.crossings,vt.uDebug.value=It.debug,jt.label!==st&&(st=jt.label,Rt())},Vt=()=>{E.updateMatrixWorld(),vt.uCameraPosition.value.copy(E.position),vt.uCameraForward.value.set(0,0,-1).applyQuaternion(E.quaternion).normalize(),vt.uCameraRight.value.set(1,0,0).applyQuaternion(E.quaternion).normalize(),vt.uCameraUp.value.set(0,1,0).applyQuaternion(E.quaternion).normalize()},ge=It=>{It.preventDefault(),l.current=!0,g("lost")},le=()=>{l.current=!1,ct&&ct.dispose(),ct=Y(),ot.material=ct,B.resetState(),Rt(),g("restored"),window.setTimeout(()=>g("ready"),500)};try{B=new lA({canvas:L,antialias:!1,alpha:!1,powerPreference:"high-performance"}),B.setClearColor(66053,1),B.outputColorSpace=Qn,B.toneMapping=aa,R=new vy,E=new ci(t.current.fov,1,.01,100),P=new cA(E,L),P.enableDamping=!0,P.dampingFactor=.07,P.enablePan=!1,P.minDistance=4.2,P.maxDistance=15,P.minPolarAngle=ds.degToRad(16),P.maxPolarAngle=ds.degToRad(86),P.target.set(0,0,0),P.addEventListener("change",bt),at=new Wo(2,2),ct=Y(),ot=new wi(at,ct),ot.frustumCulled=!1,R.add(ot),L.addEventListener("webglcontextlost",ge,!1),L.addEventListener("webglcontextrestored",le,!1),xt(t.current,!0),Rt()}catch(It){return g("error"),console.error("[GARGANTUA] renderer initialization failed",It),()=>{}}const be=It=>{ft=window.requestAnimationFrame(be);const jt=Math.min(.05,Math.max(0,(It-X)/1e3));if(X=It,l.current)return;const Kt=t.current;if(!Kt.capture&&Kt.moviePlaying){w+=jt*.13;const Bt=Kt.cameraAzimuth+Math.sin(w*.7)*18+w*9,ve=Kt.cameraElevation+Math.sin(w*.43)*3;xt({...Kt,cameraAzimuth:Bt,cameraElevation:ve},!0)}else xt(Kt);!Kt.capture&&Kt.moviePlaying&&(i.current+=jt*Kt.timeMultiplier),It-Tt>250&&(Tt=It,S(i.current)),P.update(),zt(),Vt(),B.render(R,E),nt||(nt=!0,s.current=!0,m(!0),document.documentElement.dataset.gargantuaReady="true")};ft=window.requestAnimationFrame(be);const F={getState:()=>({...t.current,time:i.current,ready:s.current}),setQuality:y,setPreset:D,setDebug:_,setTime:I};return Object.defineProperty(F,"ready",{enumerable:!0,get:()=>s.current}),window.__GARGANTUA__=Object.freeze(F),()=>{window.cancelAnimationFrame(ft),L.removeEventListener("webglcontextlost",ge),L.removeEventListener("webglcontextrestored",le),P==null||P.removeEventListener("change",bt),P==null||P.dispose(),at==null||at.dispose(),ct==null||ct.dispose(),B==null||B.dispose(),delete window.__GARGANTUA__,delete document.documentElement.dataset.gargantuaReady}},[D,M,_,y,I]),un.useEffect(()=>{const L=B=>{const R=B.target,E=R instanceof HTMLInputElement||R instanceof HTMLSelectElement||R instanceof HTMLTextAreaElement;if(B.shiftKey&&/^[1-4]$/.test(B.key)){B.preventDefault(),D(Number(B.key)-1);return}if(!(E&&B.key!=="Escape")){if(/^[0-9]$/.test(B.key))B.preventDefault(),_(Number(B.key));else if(B.key===" ")B.preventDefault(),M({moviePlaying:!t.current.moviePlaying});else if(B.key.toLowerCase()==="h")B.preventDefault(),M({hud:!t.current.hud});else if(B.key.toLowerCase()==="r")B.preventDefault(),C();else if(B.key.toLowerCase()==="q"){B.preventDefault();const P=Object.keys(za),ot=(P.indexOf(t.current.quality)+1)%P.length;y(P[ot])}}};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[D,M,C,_,y]);const z=xs[c.preset],N=q_[c.debug],V=(L,B)=>{const R={[L]:Number(B)};["fov","cameraDistance","cameraAzimuth","cameraElevation"].includes(L)&&(R.moviePlaying=!1),M(R)},H=p==="lost"?"WEBGL PAUSED":p==="restored"?"RESUMING":p==="error"?"RENDERER ERROR":d?"LIVE":"INITIALIZING";return _t.jsxs("main",{className:"gargantua-app",children:[_t.jsx("canvas",{ref:r,className:"raytracer-canvas","aria-label":"Interactive Schwarzschild black hole raytracer"}),_t.jsx("div",{className:"scene-vignette","aria-hidden":"true"}),_t.jsxs("header",{className:"topbar",children:[_t.jsxs("div",{className:"brand-lockup",children:[_t.jsxs("div",{className:"brand-mark",children:[_t.jsx("span",{className:"brand-dot"}),"GARGANTUA"]}),_t.jsx("div",{className:"brand-subtitle",children:"SCHWARZSCHILD / NULL GEODESIC OBSERVATORY"})]}),_t.jsxs("div",{className:"topbar-status",children:[_t.jsx("span",{className:`status-led status-led--${p}`}),_t.jsx("span",{children:H}),_t.jsx("span",{className:"status-divider"}),_t.jsx("span",{children:za[c.quality].label.toUpperCase()})]})]}),p==="lost"&&_t.jsxs("div",{className:"context-banner",role:"status",children:[_t.jsx("strong",{children:"WebGL context paused"}),_t.jsx("span",{children:"Renderer resources will rebuild when the context returns."})]}),!c.hud&&_t.jsxs("button",{className:"hud-reopen",onClick:()=>M({hud:!0}),"aria-label":"Show HUD",children:["HUD ",_t.jsx("span",{children:"H"})]}),c.hud&&_t.jsxs("aside",{className:"hud-panel","aria-label":"Gargantua controls",children:[_t.jsxs("div",{className:"hud-scroll",children:[_t.jsxs("div",{className:"hud-heading",children:[_t.jsxs("div",{children:[_t.jsx("span",{className:"eyebrow",children:"LIVE INSTRUMENT"}),_t.jsx("h1",{children:"Photon field"})]}),_t.jsx("button",{className:"icon-button",onClick:()=>M({hud:!1}),"aria-label":"Hide HUD",children:"×"})]}),_t.jsxs("section",{className:"status-card",children:[_t.jsxs("div",{className:"status-card-line",children:[_t.jsx("span",{children:"SCHEMATIC"}),_t.jsx("strong",{children:c.debug===0?"FINAL IMAGE":`DEBUG ${c.debug}`})]}),_t.jsxs("div",{className:"status-card-line",children:[_t.jsx("span",{children:"PRESET"}),_t.jsx("strong",{children:z.name})]}),_t.jsxs("div",{className:"status-card-line",children:[_t.jsx("span",{children:"SIM TIME"}),_t.jsxs("strong",{children:[x.toFixed(2)," s"]})]}),_t.jsx("div",{className:"status-card-meter",children:_t.jsx("span",{style:{width:`${Ru(c.timeMultiplier/4*100,5,100)}%`}})})]}),_t.jsxs("section",{className:"hud-section",children:[_t.jsxs("div",{className:"section-label",children:[_t.jsx("span",{children:"CAMERA PRESETS"}),_t.jsx("span",{className:"section-rule"})]}),_t.jsx("div",{className:"preset-grid",children:xs.map((L,B)=>_t.jsxs("button",{className:`preset-button ${c.preset===B?"is-active":""}`,onClick:()=>D(B),children:[_t.jsxs("span",{className:"preset-index",children:["0",B+1]}),_t.jsxs("span",{children:[_t.jsx("b",{children:L.name}),_t.jsx("small",{children:L.note})]})]},L.name))})]}),_t.jsxs("section",{className:"hud-section",children:[_t.jsxs("div",{className:"section-label",children:[_t.jsx("span",{children:"RENDER QUALITY"}),_t.jsx("span",{className:"section-rule"})]}),_t.jsx("div",{className:"quality-switcher",children:Object.entries(za).map(([L,B])=>_t.jsx("button",{className:c.quality===L?"is-active":"",onClick:()=>y(L),children:B.label},L))})]}),_t.jsxs("section",{className:"hud-section controls-section",children:[_t.jsxs("div",{className:"section-label",children:[_t.jsx("span",{children:"PARAMETERS / 21"}),_t.jsx("span",{className:"section-rule"})]}),_t.jsx("div",{className:"parameter-list",children:C0.map(L=>_t.jsxs("label",{className:"parameter",children:[_t.jsxs("span",{className:"parameter-head",children:[_t.jsx("span",{children:L.label}),_t.jsx("output",{children:RA(c[L.key],L.step,L.unit)})]}),_t.jsx("input",{type:"range",min:L.min,max:L.max,step:L.step,value:c[L.key],onChange:B=>V(L.key,B.target.value)})]},L.key))})]}),_t.jsxs("section",{className:"hud-section",children:[_t.jsxs("div",{className:"section-label",children:[_t.jsx("span",{children:"DIAGNOSTIC VIEW"}),_t.jsx("span",{className:"section-rule"})]}),_t.jsxs("div",{className:"debug-title",children:[_t.jsx("span",{className:"debug-number",children:c.debug}),_t.jsx("span",{children:N})]}),_t.jsx("div",{className:"debug-grid",children:q_.map((L,B)=>_t.jsx("button",{className:c.debug===B?"is-active":"",onClick:()=>_(B),title:L,children:B},L))})]}),_t.jsxs("section",{className:"hud-section shortcuts-section",children:[_t.jsxs("div",{className:"section-label",children:[_t.jsx("span",{children:"INPUT MAP"}),_t.jsx("span",{className:"section-rule"})]}),_t.jsxs("div",{className:"shortcut-row",children:[_t.jsxs("span",{children:[_t.jsx("kbd",{children:"SHIFT"})," + ",_t.jsx("kbd",{children:"1–4"})]}),_t.jsx("span",{children:"presets"})]}),_t.jsxs("div",{className:"shortcut-row",children:[_t.jsx("span",{children:_t.jsx("kbd",{children:"SPACE"})}),_t.jsx("span",{children:c.moviePlaying?"pause camera loop":"play camera loop"})]}),_t.jsxs("div",{className:"shortcut-row",children:[_t.jsx("span",{children:_t.jsx("kbd",{children:"0–9"})}),_t.jsx("span",{children:"diagnostics"})]}),_t.jsxs("div",{className:"shortcut-row",children:[_t.jsxs("span",{children:[_t.jsx("kbd",{children:"H"})," / ",_t.jsx("kbd",{children:"Q"})," / ",_t.jsx("kbd",{children:"R"})]}),_t.jsx("span",{children:"HUD / quality / reset"})]})]}),_t.jsxs("button",{className:"reset-button",onClick:C,children:["RESET INSTRUMENT ",_t.jsx("span",{children:"R"})]})]}),_t.jsxs("div",{className:"hud-footer",children:[_t.jsx("span",{children:"rₛ = 1.000"}),_t.jsx("span",{children:"LOCAL / OFFLINE"})]})]}),_t.jsxs("div",{className:"bottom-readout","aria-live":"polite",children:[_t.jsx("span",{className:"readout-line"}),_t.jsx("span",{children:"NULL GEODESIC INTEGRATOR"}),_t.jsx("span",{className:"readout-separator",children:"/"}),_t.jsx("span",{children:c.moviePlaying?"CINEMA LOOP":"MANUAL CONTROL"})]}),_t.jsxs("div",{className:"gesture-hint",children:["DRAG TO ORBIT ",_t.jsx("span",{children:"·"})," SCROLL TO DOLLY"]})]})}Gx.createRoot(document.getElementById("root")).render(_t.jsx(wA,{}));
