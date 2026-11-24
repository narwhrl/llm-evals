(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function s(c){if(c.ep)return;c.ep=!0;const f=i(c);fetch(c.href,f)}})();var od={exports:{}},ul={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qv;function RM(){if(Qv)return ul;Qv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,c,f){var h=null;if(f!==void 0&&(h=""+f),c.key!==void 0&&(h=""+c.key),"key"in c){f={};for(var d in c)d!=="key"&&(f[d]=c[d])}else f=c;return c=f.ref,{$$typeof:o,type:s,key:h,ref:c!==void 0?c:null,props:f}}return ul.Fragment=e,ul.jsx=i,ul.jsxs=i,ul}var Jv;function CM(){return Jv||(Jv=1,od.exports=RM()),od.exports}var lt=CM(),ld={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $v;function DM(){if($v)return ie;$v=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),x=Symbol.for("react.view_transition"),M=Symbol.iterator;function C(D){return D===null||typeof D!="object"?null:(D=M&&D[M]||D["@@iterator"],typeof D=="function"?D:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,y={};function B(D,Z,gt){this.props=D,this.context=Z,this.refs=y,this.updater=gt||w}B.prototype.isReactComponent={},B.prototype.setState=function(D,Z){if(typeof D!="object"&&typeof D!="function"&&D!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,D,Z,"setState")},B.prototype.forceUpdate=function(D){this.updater.enqueueForceUpdate(this,D,"forceUpdate")};function z(){}z.prototype=B.prototype;function U(D,Z,gt){this.props=D,this.context=Z,this.refs=y,this.updater=gt||w}var Q=U.prototype=new z;Q.constructor=U,S(Q,B.prototype),Q.isPureReactComponent=!0;var V=Array.isArray;function P(){}var L={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function A(D,Z,gt){var ht=gt.ref;return{$$typeof:o,type:D,key:Z,ref:ht!==void 0?ht:null,props:gt}}function I(D,Z){return A(D.type,Z,D.props)}function W(D){return typeof D=="object"&&D!==null&&D.$$typeof===o}function et(D){var Z={"=":"=0",":":"=2"};return"$"+D.replace(/[=:]/g,function(gt){return Z[gt]})}var nt=/\/+/g;function ut(D,Z){return typeof D=="object"&&D!==null&&D.key!=null?et(""+D.key):Z.toString(36)}function k(D){switch(D.status){case"fulfilled":return D.value;case"rejected":throw D.reason;default:switch(typeof D.status=="string"?D.then(P,P):(D.status="pending",D.then(function(Z){D.status==="pending"&&(D.status="fulfilled",D.value=Z)},function(Z){D.status==="pending"&&(D.status="rejected",D.reason=Z)})),D.status){case"fulfilled":return D.value;case"rejected":throw D.reason}}throw D}function st(D,Z,gt,ht,bt){var kt=typeof D;(kt==="undefined"||kt==="boolean")&&(D=null);var wt=!1;if(D===null)wt=!0;else switch(kt){case"bigint":case"string":case"number":wt=!0;break;case"object":switch(D.$$typeof){case o:case e:wt=!0;break;case _:return wt=D._init,st(wt(D._payload),Z,gt,ht,bt)}}if(wt)return bt=bt(D),wt=ht===""?"."+ut(D,0):ht,V(bt)?(gt="",wt!=null&&(gt=wt.replace(nt,"$&/")+"/"),st(bt,Z,gt,"",function(re){return re})):bt!=null&&(W(bt)&&(bt=I(bt,gt+(bt.key==null||D&&D.key===bt.key?"":(""+bt.key).replace(nt,"$&/")+"/")+wt)),Z.push(bt)),1;wt=0;var Rt=ht===""?".":ht+":";if(V(D))for(var Bt=0;Bt<D.length;Bt++)ht=D[Bt],kt=Rt+ut(ht,Bt),wt+=st(ht,Z,gt,kt,bt);else if(Bt=C(D),typeof Bt=="function")for(D=Bt.call(D),Bt=0;!(ht=D.next()).done;)ht=ht.value,kt=Rt+ut(ht,Bt++),wt+=st(ht,Z,gt,kt,bt);else if(kt==="object"){if(typeof D.then=="function")return st(k(D),Z,gt,ht,bt);throw Z=String(D),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(D).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return wt}function J(D,Z,gt){if(D==null)return D;var ht=[],bt=0;return st(D,ht,"","",function(kt){return Z.call(gt,kt,bt++)}),ht}function yt(D){if(D._status===-1){var Z=D._result,gt=Z();gt.then(function(ht){(D._status===0||D._status===-1)&&(D._status=1,D._result=ht,gt.status===void 0&&(gt.status="fulfilled",gt.value=ht))},function(ht){(D._status===0||D._status===-1)&&(D._status=2,D._result=ht,gt.status===void 0&&(gt.status="rejected",gt.reason=ht))}),D._status===-1&&(D._status=0,D._result=gt)}if(D._status===1)return D._result.default;throw D._result}var St=typeof reportError=="function"?reportError:function(D){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof D=="object"&&D!==null&&typeof D.message=="string"?String(D.message):String(D),error:D});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",D);return}console.error(D)};function Gt(D){var Z=L.T,gt={};gt.types=Z!==null?Z.types:null,L.T=gt;try{var ht=D(),bt=L.S;bt!==null&&bt(gt,ht),typeof ht=="object"&&ht!==null&&typeof ht.then=="function"&&ht.then(P,St)}catch(kt){St(kt)}finally{Z!==null&&gt.types!==null&&(Z.types=gt.types),L.T=Z}}function ee(D){var Z=L.T;if(Z!==null){var gt=Z.types;gt===null?Z.types=[D]:gt.indexOf(D)===-1&&gt.push(D)}else Gt(ee.bind(null,D))}var Te={map:J,forEach:function(D,Z,gt){J(D,function(){Z.apply(this,arguments)},gt)},count:function(D){var Z=0;return J(D,function(){Z++}),Z},toArray:function(D){return J(D,function(Z){return Z})||[]},only:function(D){if(!W(D))throw Error("React.Children.only expected to receive a single React element child.");return D}};return ie.Activity=v,ie.Children=Te,ie.Component=B,ie.Fragment=i,ie.Profiler=c,ie.PureComponent=U,ie.StrictMode=s,ie.Suspense=p,ie.ViewTransition=x,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,ie.__COMPILER_RUNTIME={__proto__:null,c:function(D){return L.H.useMemoCache(D)}},ie.addTransitionType=ee,ie.cache=function(D){return function(){return D.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(D,Z,gt){if(D==null)throw Error("The argument must be a React element, but you passed "+D+".");var ht=S({},D.props),bt=D.key;if(Z!=null)for(kt in Z.key!==void 0&&(bt=""+Z.key),Z)!b.call(Z,kt)||kt==="key"||kt==="__self"||kt==="__source"||kt==="ref"&&Z.ref===void 0||(ht[kt]=Z[kt]);var kt=arguments.length-2;if(kt===1)ht.children=gt;else if(1<kt){for(var wt=Array(kt),Rt=0;Rt<kt;Rt++)wt[Rt]=arguments[Rt+2];ht.children=wt}return A(D.type,bt,ht)},ie.createContext=function(D){return D={$$typeof:h,_currentValue:D,_currentValue2:D,_threadCount:0,Provider:null,Consumer:null},D.Provider=D,D.Consumer={$$typeof:f,_context:D},D},ie.createElement=function(D,Z,gt){var ht,bt={},kt=null;if(Z!=null)for(ht in Z.key!==void 0&&(kt=""+Z.key),Z)b.call(Z,ht)&&ht!=="key"&&ht!=="__self"&&ht!=="__source"&&(bt[ht]=Z[ht]);var wt=arguments.length-2;if(wt===1)bt.children=gt;else if(1<wt){for(var Rt=Array(wt),Bt=0;Bt<wt;Bt++)Rt[Bt]=arguments[Bt+2];bt.children=Rt}if(D&&D.defaultProps)for(ht in wt=D.defaultProps,wt)bt[ht]===void 0&&(bt[ht]=wt[ht]);return A(D,kt,bt)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(D){return{$$typeof:d,render:D}},ie.isValidElement=W,ie.lazy=function(D){return{$$typeof:_,_payload:{_status:-1,_result:D},_init:yt}},ie.memo=function(D,Z){return{$$typeof:g,type:D,compare:Z===void 0?null:Z}},ie.startTransition=Gt,ie.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},ie.use=function(D){return L.H.use(D)},ie.useActionState=function(D,Z,gt){return L.H.useActionState(D,Z,gt)},ie.useCallback=function(D,Z){return L.H.useCallback(D,Z)},ie.useContext=function(D){return L.H.useContext(D)},ie.useDebugValue=function(){},ie.useDeferredValue=function(D,Z){return L.H.useDeferredValue(D,Z)},ie.useEffect=function(D,Z){return L.H.useEffect(D,Z)},ie.useEffectEvent=function(D){return L.H.useEffectEvent(D)},ie.useId=function(){return L.H.useId()},ie.useImperativeHandle=function(D,Z,gt){return L.H.useImperativeHandle(D,Z,gt)},ie.useInsertionEffect=function(D,Z){return L.H.useInsertionEffect(D,Z)},ie.useLayoutEffect=function(D,Z){return L.H.useLayoutEffect(D,Z)},ie.useMemo=function(D,Z){return L.H.useMemo(D,Z)},ie.useOptimistic=function(D,Z){return L.H.useOptimistic(D,Z)},ie.useReducer=function(D,Z,gt){return L.H.useReducer(D,Z,gt)},ie.useRef=function(D){return L.H.useRef(D)},ie.useState=function(D){return L.H.useState(D)},ie.useSyncExternalStore=function(D,Z,gt){return L.H.useSyncExternalStore(D,Z,gt)},ie.useTransition=function(){return L.H.useTransition()},ie.version="19.3.1",ie}var t_;function Np(){return t_||(t_=1,ld.exports=DM()),ld.exports}var We=Np(),cd={exports:{}},fl={},ud={exports:{}},fd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e_;function wM(){return e_||(e_=1,(function(o){function e(k,st){var J=k.length;k.push(st);t:for(;0<J;){var yt=J-1>>>1,St=k[yt];if(0<c(St,st))k[yt]=st,k[J]=St,J=yt;else break t}}function i(k){return k.length===0?null:k[0]}function s(k){if(k.length===0)return null;var st=k[0],J=k.pop();if(J!==st){k[0]=J;t:for(var yt=0,St=k.length,Gt=St>>>1;yt<Gt;){var ee=2*(yt+1)-1,Te=k[ee],D=ee+1,Z=k[D];if(0>c(Te,J))D<St&&0>c(Z,Te)?(k[yt]=Z,k[D]=J,yt=D):(k[yt]=Te,k[ee]=J,yt=ee);else if(D<St&&0>c(Z,J))k[yt]=Z,k[D]=J,yt=D;else break t}}return st}function c(k,st){var J=k.sortIndex-st.sortIndex;return J!==0?J:k.id-st.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var p=[],g=[],_=1,v=null,x=3,M=!1,C=!1,w=!1,S=!1,y=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function U(k){for(var st=i(g);st!==null;){if(st.callback===null)s(g);else if(st.startTime<=k)s(g),st.sortIndex=st.expirationTime,e(p,st);else break;st=i(g)}}function Q(k){if(w=!1,U(k),!C)if(i(p)!==null)C=!0,V||(V=!0,W());else{var st=i(g);st!==null&&ut(Q,st.startTime-k)}}var V=!1,P=-1,L=5,b=-1;function A(){return S?!0:!(o.unstable_now()-b<L)}function I(){if(S=!1,V){var k=o.unstable_now();b=k;var st=!0;try{t:{C=!1,w&&(w=!1,B(P),P=-1),M=!0;var J=x;try{e:{for(U(k),v=i(p);v!==null&&!(v.expirationTime>k&&A());){var yt=v.callback;if(typeof yt=="function"){v.callback=null,x=v.priorityLevel;var St=yt(v.expirationTime<=k);if(k=o.unstable_now(),typeof St=="function"){v.callback=St,U(k),st=!0;break e}v===i(p)&&s(p),U(k)}else s(p);v=i(p)}if(v!==null)st=!0;else{var Gt=i(g);Gt!==null&&ut(Q,Gt.startTime-k),st=!1}}break t}finally{v=null,x=J,M=!1}st=void 0}}finally{st?W():V=!1}}}var W;if(typeof z=="function")W=function(){z(I)};else if(typeof MessageChannel<"u"){var et=new MessageChannel,nt=et.port2;et.port1.onmessage=I,W=function(){nt.postMessage(null)}}else W=function(){y(I,0)};function ut(k,st){P=y(function(){k(o.unstable_now())},st)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(k){k.callback=null},o.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<k?Math.floor(1e3/k):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_next=function(k){switch(x){case 1:case 2:case 3:var st=3;break;default:st=x}var J=x;x=st;try{return k()}finally{x=J}},o.unstable_requestPaint=function(){S=!0},o.unstable_runWithPriority=function(k,st){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var J=x;x=k;try{return st()}finally{x=J}},o.unstable_scheduleCallback=function(k,st,J){var yt=o.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?yt+J:yt):J=yt,k){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=J+St,k={id:_++,callback:st,priorityLevel:k,startTime:J,expirationTime:St,sortIndex:-1},J>yt?(k.sortIndex=J,e(g,k),i(p)===null&&k===i(g)&&(w?(B(P),P=-1):w=!0,ut(Q,J-yt))):(k.sortIndex=St,e(p,k),C||M||(C=!0,V||(V=!0,W()))),k},o.unstable_shouldYield=A,o.unstable_wrapCallback=function(k){var st=x;return function(){var J=x;x=st;try{return k.apply(this,arguments)}finally{x=J}}}})(fd)),fd}var n_;function UM(){return n_||(n_=1,ud.exports=wM()),ud.exports}var hd={exports:{}},Nn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i_;function NM(){if(i_)return Nn;i_=1;var o=Np();function e(_){var v="https://react.dev/errors/"+_;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)v+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+_+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},c=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(_,v,x){var M=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:M==null?null:M===h?h:""+M,children:_,containerInfo:v,implementation:x}}var p=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function g(_,v){if(_==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return Nn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Nn.browser=function(_){return{$$typeof:f,_reason:_}},Nn.createPortal=function(_,v){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(e(299));return d(_,v,null,x)},Nn.flushSync=function(_){var v=p.T,x=s.p;try{if(p.T=null,s.p=2,_)return _()}finally{p.T=v,s.p=x,s.d.f()}},Nn.preconnect=function(_,v){typeof _=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,s.d.C(_,v))},Nn.prefetchDNS=function(_){typeof _=="string"&&s.d.D(_)},Nn.preinit=function(_,v){if(typeof _=="string"&&v&&typeof v.as=="string"){var x=v.as,M=g(x,v.crossOrigin),C=typeof v.integrity=="string"?v.integrity:void 0,w=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;x==="style"?s.d.S(_,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:M,integrity:C,fetchPriority:w}):x==="script"&&s.d.X(_,{crossOrigin:M,integrity:C,fetchPriority:w,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Nn.preinitModule=function(_,v){if(typeof _=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var x=g(v.as,v.crossOrigin);s.d.M(_,{crossOrigin:x,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0})}}else v==null&&s.d.M(_)},Nn.preload=function(_,v){if(typeof _=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var x=v.as,M=g(x,v.crossOrigin);s.d.L(_,x,{crossOrigin:M,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Nn.preloadModule=function(_,v){if(typeof _=="string")if(v){var x=g(v.as,v.crossOrigin);s.d.m(_,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:x,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0})}else s.d.m(_)},Nn.requestFormReset=function(_){s.d.r(_)},Nn.unstable_batchedUpdates=function(_,v){return _(v)},Nn.useFormState=function(_,v,x){return p.H.useFormState(_,v,x)},Nn.useFormStatus=function(){return p.H.useHostTransitionStatus()},Nn.version="19.3.1",Nn}var a_;function LM(){if(a_)return hd.exports;a_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),hd.exports=NM(),hd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r_;function OM(){if(r_)return fl;r_=1;var o=UM(),e=Np(),i=LM();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(s(188))}function g(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var l=a.return;if(l===null)break;var u=l.alternate;if(u===null){if(r=l.return,r!==null){a=r;continue}break}if(l.child===u.child){for(u=l.child;u;){if(u===a)return p(l),t;if(u===r)return p(l),n;u=u.sibling}throw Error(s(188))}if(a.return!==r.return)a=l,r=u;else{for(var m=!1,E=l.child;E;){if(E===a){m=!0,a=l,r=u;break}if(E===r){m=!0,r=l,a=u;break}E=E.sibling}if(!m){for(E=u.child;E;){if(E===a){m=!0,a=u,r=l;break}if(E===r){m=!0,r=u,a=l;break}E=E.sibling}if(!m)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}function v(t,n,a,r,l,u){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,r,l,u)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&v(t.child,n,a,r,l,u))return!0;t=t.sibling}return!1}function x(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function M(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function C(t){var n=[null,null],a=x(t);return a===null||w(n,t,a.child,{foundSelf:!1}),n}function w(t,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&w(t,n,a.child,r))return!0;a=a.sibling}return!1}function S(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(s(559))}}var y=null,B=null;function z(t,n,a){return t===a?!0:t===n?(y=t,!0):!1}function U(t,n,a){return t===a?(B=t,!1):t===n?(B!==null&&(y=t),!0):!1}function Q(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function V(t,n,a){for(var r=0,l=t;l;l=a(l))r++;l=0;for(var u=n;u;u=a(u))l++;for(;0<r-l;)t=a(t),r--;for(;0<l-r;)n=a(n),l--;for(;r--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var P=Object.assign,L=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),W=Symbol.for("react.strict_mode"),et=Symbol.for("react.profiler"),nt=Symbol.for("react.consumer"),ut=Symbol.for("react.context"),k=Symbol.for("react.forward_ref"),st=Symbol.for("react.suspense"),J=Symbol.for("react.suspense_list"),yt=Symbol.for("react.memo"),St=Symbol.for("react.lazy"),Gt=Symbol.for("react.activity"),ee=Symbol.for("react.legacy_hidden"),Te=Symbol.for("react.memo_cache_sentinel"),D=Symbol.for("react.view_transition"),Z=Symbol.for("react.recoverable"),gt=Symbol.iterator;function ht(t){return t===null||typeof t!="object"?null:(t=gt&&t[gt]||t["@@iterator"],typeof t=="function"?t:null)}var bt=Symbol.for("react.client.reference");function kt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===bt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case I:return"Fragment";case et:return"Profiler";case W:return"StrictMode";case st:return"Suspense";case J:return"SuspenseList";case Gt:return"Activity";case D:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case A:return"Portal";case ut:return t.displayName||"Context";case nt:return(t._context.displayName||"Context")+".Consumer";case k:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case yt:return n=t.displayName||null,n!==null?n:kt(t.type)||"Memo";case St:n=t._payload,t=t._init;try{return kt(t(n))}catch{}}return null}var wt=Array.isArray,Rt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Bt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,re={pending:!1,data:null,method:null,action:null},H=[],hn=-1;function ae(t){return{current:t}}function Kt(t){0>hn||(t.current=H[hn],H[hn]=null,hn--)}function Ct(t,n){hn++,H[hn]=t.current,t.current=n}var ye=ae(null),qt=ae(null),N=ae(null),T=ae(null);function at(t,n){switch(Ct(N,n),Ct(qt,t),Ct(ye,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?sv(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=sv(n),t=ov(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Kt(ye),Ct(ye,t)}function vt(){Kt(ye),Kt(qt),Kt(N)}function xt(t){var n=t.memoizedState;n!==null&&(Fs._currentValue=n.memoizedState,Ct(T,t)),n=ye.current;var a=ov(n,t.type);n!==a&&(Ct(qt,t),Ct(ye,a))}function mt(t){qt.current===t&&(Kt(ye),Kt(qt)),T.current===t&&(Kt(T),Fs._currentValue=re)}var Yt,Lt;function zt(t){if(Yt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Yt=n&&n[1]||"",Lt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yt+t+Lt}var me=!1;function Et(t,n){if(!t||me)return"";me=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(Dt){var X=Dt}Reflect.construct(t,[],pt)}else{try{pt.call()}catch(Dt){X=Dt}pt=!1;try{var tt=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),pt=!0,new t}finally{pt&&(tt!==void 0?Object.defineProperty(t.prototype,"props",tt):delete t.prototype.props)}}}else{try{throw Error()}catch(Dt){X=Dt}(pt=t())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(Dt){if(Dt&&X&&typeof Dt.stack=="string")return[Dt.stack,X.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=r.DetermineComponentFrameRoot(),m=u[0],E=u[1];if(m&&E){var O=m.split(`
`),Y=E.split(`
`);for(l=r=0;r<O.length&&!O[r].includes("DetermineComponentFrameRoot");)r++;for(;l<Y.length&&!Y[l].includes("DetermineComponentFrameRoot");)l++;if(r===O.length||l===Y.length)for(r=O.length-1,l=Y.length-1;1<=r&&0<=l&&O[r]!==Y[l];)l--;for(;1<=r&&0<=l;r--,l--)if(O[r]!==Y[l]){if(r!==1||l!==1)do if(r--,l--,0>l||O[r]!==Y[l]){var rt=`
`+O[r].replace(" at new "," at ");return t.displayName&&rt.includes("<anonymous>")&&(rt=rt.replace("<anonymous>",t.displayName)),rt}while(1<=r&&0<=l);break}}}finally{me=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?zt(a):""}function Vt(t,n){switch(t.tag){case 26:case 27:case 5:return zt(t.type);case 16:return zt("Lazy");case 13:return t.child!==n&&n!==null?zt("Suspense Fallback"):zt("Suspense");case 19:return zt("SuspenseList");case 0:case 15:return Et(t.type,!1);case 11:return Et(t.type.render,!1);case 1:return Et(t.type,!0);case 31:return zt("Activity");case 30:return zt("ViewTransition");default:return""}}function Jt(t){try{var n="",a=null;do n+=Vt(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var te=Object.prototype.hasOwnProperty,Ht=o.unstable_scheduleCallback,pe=o.unstable_cancelCallback,oe=o.unstable_shouldYield,ze=o.unstable_requestPaint,G=o.unstable_now,Ot=o.unstable_getCurrentPriorityLevel,ft=o.unstable_ImmediatePriority,_t=o.unstable_UserBlockingPriority,Pt=o.unstable_NormalPriority,It=o.unstable_LowPriority,se=o.unstable_IdlePriority,Ke=o.log,_n=o.unstable_setDisableYieldValue,be=null,je=null;function xn(t){if(typeof Ke=="function"&&_n(t),je&&typeof je.setStrictMode=="function")try{je.setStrictMode(be,t)}catch{}}var On=Math.clz32?Math.clz32:xo,bl=Math.log,ea=Math.LN2;function xo(t){return t>>>=0,t===0?32:31-(bl(t)/ea|0)|0}var vr=256,_r=262144,na=4194304;function Fi(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ia(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var l=0,u=t.suspendedLanes,m=t.pingedLanes;t=t.warmLanes;var E=r&134217727;return E!==0?(r=E&~u,r!==0?l=Fi(r):(m&=E,m!==0?l=Fi(m):a||(a=E&~t,a!==0&&(l=Fi(a))))):(E=r&~u,E!==0?l=Fi(E):m!==0?l=Fi(m):a||(a=r&~t,a!==0&&(l=Fi(a)))),l===0?0:n!==0&&n!==l&&(n&u)===0&&(u=l&-l,a=n&-n,u>=a||u===32&&(a&4194048)!==0)?n:l}function Na(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function yo(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var r=31-On(a),l=1<<r;n|=t[r],a&=~l}return n}function Ou(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Al(){var t=na;return na<<=1,(na&62914560)===0&&(na=4194304),t}function So(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function xr(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Pu(t,n,a,r,l,u){var m=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,O=t.expirationTimes,Y=t.hiddenUpdates;for(a=m&~a;0<a;){var rt=31-On(a),pt=1<<rt;E[rt]=0,O[rt]=-1;var X=Y[rt];if(X!==null)for(Y[rt]=null,rt=0;rt<X.length;rt++){var tt=X[rt];tt!==null&&(tt.lane&=-536870913)}a&=~pt}r!==0&&Rl(t,r,0),u!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=u&~(m&~n))}function Rl(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-On(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function R(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-On(a),l=1<<r;l&n|t[r]&n&&(t[r]|=n),a&=~l}}function j(t,n){var a=n&-n;return a=(a&42)!==0?1:ot(a),(a&(t.suspendedLanes|n))!==0?0:a}function ot(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ct(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function K(){var t=Bt.p;return t!==0?t:(t=window.event,t===void 0?32:Xv(t.type))}function Mt(t,n){var a=Bt.p;try{return Bt.p=t,n()}finally{Bt.p=a}}var At=Math.random().toString(36).slice(2),Tt="__reactFiber$"+At,Ut="__reactProps$"+At,Qt="__reactContainer$"+At,ne="__reactEvents$"+At,Zt="__reactListeners$"+At,Ae="__reactHandles$"+At,Ce="__reactResources$"+At,Xe="__reactMarker$"+At,Ge="__reactLoad$"+At;function ge(t){delete t[Tt],delete t[Ut],delete t[Zt],delete t[Ae]}function Wt(t){var n;if(n=t[Tt])return n;for(var a=t.parentNode;a;){if(n=a[Qt]||a[Tt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Tv(t);t!==null;){if(a=t[Tt])return a;t=Tv(t)}return n}t=a,a=t.parentNode}return null}function Qe(t){if(t=t[Tt]||t[Qt]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Se(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function yn(t){var n=t[Ce];return n||(n=t[Ce]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Ze(t){t[Xe]=!0}function Pn(t){t[Ge]=void 0}var La=new Set,Ve={};function sn(t,n){dn(t,n),dn(t+"Capture",n)}function dn(t,n){for(Ve[t]=n,t=0;t<n.length;t++)La.add(n[t])}var bn=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),An={},ns={};function aa(t){return te.call(ns,t)?!0:te.call(An,t)?!1:bn.test(t)?ns[t]=!0:(An[t]=!0,!1)}var De=!1;function Yp(){var t=De;return De=!1,t}function Cl(t,n,a){if(aa(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function Dl(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function ra(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,r)}}function $n(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Wp(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Wx(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var l=r.get,u=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return l.call(this)},set:function(m){a=""+m,u.call(this,m)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(m){a=""+m},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function zu(t){if(!t._valueTracker){var n=Wp(t)?"checked":"value";t._valueTracker=Wx(t,n,""+t[n])}}function jp(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=Wp(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}var jx=/[\n"\\]/g;function di(t){return t.replace(jx,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Iu(t,n,a,r,l,u,m,E){t.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?t.type=m:t.removeAttribute("type"),n!=null?m==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+$n(n)):t.value!==""+$n(n)&&(t.value=""+$n(n)):m!=="submit"&&m!=="reset"||t.removeAttribute("value"),n!=null?m==="number"&&t.value==n?Bu(t,$n(t.value)):Bu(t,$n(n)):a!=null?Bu(t,$n(a)):r!=null&&t.removeAttribute("value"),l==null&&u!=null&&(t.defaultChecked=!!u),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+$n(E):t.removeAttribute("name")}function Zp(t,n,a,r,l,u,m,E){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.type=u),n!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||n!=null)){zu(t);return}a=a!=null?""+$n(a):"",n=n!=null?""+$n(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}r=r??l,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=E?t.checked:!!r,t.defaultChecked=!!r,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(t.name=m),zu(t)}function Bu(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function is(t,n,a,r){if(t=t.options,n){n={};for(var l=0;l<a.length;l++)n["$"+a[l]]=!0;for(a=0;a<t.length;a++)l=n.hasOwnProperty("$"+t[a].value),t[a].selected!==l&&(t[a].selected=l),l&&r&&(t[a].defaultSelected=!0)}else{for(a=""+$n(a),n=null,l=0;l<t.length;l++){if(t[l].value===a){t[l].selected=!0,r&&(t[l].defaultSelected=!0);return}n!==null||t[l].disabled||(n=t[l])}n!==null&&(n.selected=!0)}}function Kp(t,n,a){if(n!=null&&(n=""+$n(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+$n(a):""}function Qp(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(wt(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=$n(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),zu(t)}function as(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Zx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Jp(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||Zx.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function $p(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="",De=!0);for(var l in n)r=n[l],n.hasOwnProperty(l)&&a[l]!==r&&(Jp(t,l,r),De=!0)}else for(var u in n)n.hasOwnProperty(u)&&Jp(t,u,n[u])}function Fu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Kx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Qx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function wl(t){return Qx.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Hi(){}var Hu=null;function Gu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var rs=null,ss=null;function tm(t){var n=Qe(t);if(n&&(t=n.stateNode)){var a=t[Ut]||null;t:switch(t=n.stateNode,n.type){case"input":if(Iu(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+di(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var l=r[Ut]||null;if(!l)throw Error(s(90));Iu(r,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&jp(r)}break t;case"textarea":Kp(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&is(t,!!a.multiple,n,!1)}}}var Vu=!1;function em(t,n,a){if(Vu)return t(n,a);Vu=!0;try{var r=t(n);return r}finally{if(Vu=!1,(rs!==null||ss!==null)&&(wc(),rs&&(n=rs,t=ss,ss=rs=null,tm(n),t)))for(n=0;n<t.length;n++)tm(t[n])}}function Mo(t,n){var a=t.stateNode;if(a===null)return null;var r=a[Ut]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var sa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ku=!1;if(sa)try{var Eo={};Object.defineProperty(Eo,"passive",{get:function(){ku=!0}}),window.addEventListener("test",Eo,Eo),window.removeEventListener("test",Eo,Eo)}catch{ku=!1}var Oa=null,Xu=null,Ul=null;function nm(){if(Ul)return Ul;var t,n=Xu,a=n.length,r,l="value"in Oa?Oa.value:Oa.textContent,u=l.length;for(t=0;t<a&&n[t]===l[t];t++);var m=a-t;for(r=1;r<=m&&n[a-r]===l[u-r];r++);return Ul=l.slice(t,1<r?1-r:void 0)}function Nl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Ll(){return!0}function im(){return!1}function Fn(t){function n(a,r,l,u,m){this._reactName=a,this._targetInst=l,this.type=r,this.nativeEvent=u,this.target=m,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(u):u[E]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Ll:im,this.isPropagationStopped=im,this}return P(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ll)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ll)},persist:function(){},isPersistent:Ll}),n}var Pa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ol=Fn(Pa),To=P({},Pa,{view:0,detail:0}),Jx=Fn(To),qu,Yu,bo,Pl=P({},To,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ju,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==bo&&(bo&&t.type==="mousemove"?(qu=t.screenX-bo.screenX,Yu=t.screenY-bo.screenY):Yu=qu=0,bo=t),qu)},movementY:function(t){return"movementY"in t?t.movementY:Yu}}),am=Fn(Pl),$x=P({},Pl,{dataTransfer:0}),ty=Fn($x),ey=P({},To,{relatedTarget:0}),Wu=Fn(ey),ny=P({},Pa,{animationName:0,elapsedTime:0,pseudoElement:0}),iy=Fn(ny),ay=P({},Pa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ry=Fn(ay),sy=P({},Pa,{data:0}),rm=Fn(sy),oy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ly={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function uy(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=cy[t])?!!n[t]:!1}function ju(){return uy}var fy=P({},To,{key:function(t){if(t.key){var n=oy[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Nl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ly[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ju,charCode:function(t){return t.type==="keypress"?Nl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Nl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),hy=Fn(fy),dy=P({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sm=Fn(dy),py=P({},Pa,{submitter:0}),my=Fn(py),gy=P({},To,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ju}),vy=Fn(gy),_y=P({},Pa,{propertyName:0,elapsedTime:0,pseudoElement:0}),xy=Fn(_y),yy=P({},Pl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Sy=Fn(yy),My=P({},Pa,{newState:0,oldState:0,source:0}),Ey=Fn(My),Ty=[9,13,27,32],Zu=sa&&"CompositionEvent"in window,Ao=null;sa&&"documentMode"in document&&(Ao=document.documentMode);var by=sa&&"TextEvent"in window&&!Ao,om=sa&&(!Zu||Ao&&8<Ao&&11>=Ao),lm=" ",cm=!1;function um(t,n){switch(t){case"keyup":return Ty.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var os=!1;function Ay(t,n){switch(t){case"compositionend":return fm(n);case"keypress":return n.which!==32?null:(cm=!0,lm);case"textInput":return t=n.data,t===lm&&cm?null:t;default:return null}}function Ry(t,n){if(os)return t==="compositionend"||!Zu&&um(t,n)?(t=nm(),Ul=Xu=Oa=null,os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return om&&n.locale!=="ko"?null:n.data;default:return null}}var Cy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Cy[t.type]:n==="textarea"}function dm(t,n,a,r){rs?ss?ss.push(r):ss=[r]:rs=r,n=zc(n,"onChange"),0<n.length&&(a=new Ol("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Ro=null,Co=null;function Dy(t){tv(t,0)}function zl(t){var n=Se(t);if(jp(n))return t}function pm(t,n){if(t==="change")return n}var mm=!1;if(sa){var Ku;if(sa){var Qu="oninput"in document;if(!Qu){var gm=document.createElement("div");gm.setAttribute("oninput","return;"),Qu=typeof gm.oninput=="function"}Ku=Qu}else Ku=!1;mm=Ku&&(!document.documentMode||9<document.documentMode)}function vm(){Ro&&(Ro.detachEvent("onpropertychange",_m),Co=Ro=null)}function _m(t){if(t.propertyName==="value"&&zl(Co)){var n=[];dm(n,Co,t,Gu(t)),em(Dy,n)}}function wy(t,n,a){t==="focusin"?(vm(),Ro=n,Co=a,Ro.attachEvent("onpropertychange",_m)):t==="focusout"&&vm()}function Uy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return zl(Co)}function Ny(t,n){if(t==="click")return zl(n)}function Ly(t,n){if(t==="input"||t==="change")return zl(n)}function Oy(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ti=typeof Object.is=="function"?Object.is:Oy;function Do(t,n){if(ti(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var l=a[r];if(!te.call(n,l)||!ti(t[l],n[l]))return!1}return!0}function Ju(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function xm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ym(t,n){var a=xm(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=xm(a)}}function Sm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Sm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Mm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Ju(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Ju(t.document)}return n}function $u(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Py=sa&&"documentMode"in document&&11>=document.documentMode,ls=null,tf=null,wo=null,ef=!1;function Em(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ef||ls==null||ls!==Ju(r)||(r=ls,"selectionStart"in r&&$u(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),wo&&Do(wo,r)||(wo=r,r=zc(tf,"onSelect"),0<r.length&&(n=new Ol("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=ls)))}function yr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var cs={animationend:yr("Animation","AnimationEnd"),animationiteration:yr("Animation","AnimationIteration"),animationstart:yr("Animation","AnimationStart"),transitionrun:yr("Transition","TransitionRun"),transitionstart:yr("Transition","TransitionStart"),transitioncancel:yr("Transition","TransitionCancel"),transitionend:yr("Transition","TransitionEnd")},nf={},Tm={};sa&&(Tm=document.createElement("div").style,"AnimationEvent"in window||(delete cs.animationend.animation,delete cs.animationiteration.animation,delete cs.animationstart.animation),"TransitionEvent"in window||delete cs.transitionend.transition);function Sr(t){if(nf[t])return nf[t];if(!cs[t])return t;var n=cs[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Tm)return nf[t]=n[a];return t}var bm=Sr("animationend"),Am=Sr("animationiteration"),Rm=Sr("animationstart"),zy=Sr("transitionrun"),Iy=Sr("transitionstart"),By=Sr("transitioncancel"),Cm=Sr("transitionend"),Dm=new Map,af="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");af.push("scrollEnd");function Ri(t,n){Dm.set(t,n),sn(n,[t])}var Fy=0;function oa(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Ui.identifierPrefix;var a=Fy++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function wm(t){if(t==null||typeof t=="string")return t;var n=null,a=Ds;if(a!==null)for(var r=0;r<a.length;r++){var l=t[a[r]];if(l!=null){if(l==="none")return"none";n=n==null?l:n+(" "+l)}}return n??t.default}function la(t,n){return t=wm(t),n=wm(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Il=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},pi=[],us=0,rf=0;function Bl(){for(var t=us,n=rf=us=0;n<t;){var a=pi[n];pi[n++]=null;var r=pi[n];pi[n++]=null;var l=pi[n];pi[n++]=null;var u=pi[n];if(pi[n++]=null,r!==null&&l!==null){var m=r.pending;m===null?l.next=l:(l.next=m.next,m.next=l),r.pending=l}u!==0&&Um(a,l,u)}}function Fl(t,n,a,r){pi[us++]=t,pi[us++]=n,pi[us++]=a,pi[us++]=r,rf|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function sf(t,n,a,r){return Fl(t,n,a,r),Hl(t)}function Mr(t,n){return Fl(t,null,null,n),Hl(t)}function Um(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var l=!1,u=t.return;u!==null;)u.childLanes|=a,r=u.alternate,r!==null&&(r.childLanes|=a),u.tag===22&&(t=u.stateNode,t===null||t._visibility&1||(l=!0)),t=u,u=u.return;return t.tag===3?(u=t.stateNode,l&&n!==null&&(l=31-On(a),t=u.hiddenUpdates,r=t[l],r===null?t[l]=[n]:r.push(n),n.lane=a|536870912),u):null}function Hl(t){if(50<Jo)throw Jo=0,Dc=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var fs={};function Hy(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xn(t,n,a,r){return new Hy(t,n,a,r)}function of(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ca(t,n){var a=t.alternate;return a===null?(a=Xn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Nm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Gl(t,n,a,r,l,u){var m=0;if(r=t,typeof r=="function")of(r)&&(m=1);else if(typeof r=="string")m=pM(t,a,ye.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(r){case Gt:return t=Xn(31,a,n,l),t.elementType=Gt,t.lanes=u,t;case I:return Er(a.children,l,u,n);case W:m=8,l|=24;break;case et:return t=Xn(12,a,n,l|2),t.elementType=et,t.lanes=u,t;case st:return t=Xn(13,a,n,l),t.elementType=st,t.lanes=u,t;case J:return t=Xn(19,a,n,l),t.elementType=J,t.lanes=u,t;case ee:case D:return t=l|32,t=Xn(30,a,n,t),t.elementType=D,t.lanes=u,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case ut:m=10;break t;case nt:m=9;break t;case k:m=11;break t;case yt:m=14;break t;case St:m=16,r=null;break t}m=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Xn(m,a,n,l),n.elementType=t,n.type=r,n.lanes=u,n}function Er(t,n,a,r){return t=Xn(7,t,r,n),t.lanes=a,t}function lf(t,n,a){return t=Xn(6,t,null,n),t.lanes=a,t}function Lm(t){var n=Xn(18,null,null,0);return n.stateNode=t,n}function cf(t,n,a){return n=Xn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Om=new WeakMap;function mi(t,n){if(typeof t=="object"&&t!==null){var a=Om.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Jt(n)},Om.set(t,n),n)}return{value:t,source:n,stack:Jt(n)}}var hs=[],ds=0,Vl=null,Uo=0,gi=[],vi=0,za=null,Gi=1,Vi="";function ua(t,n){hs[ds++]=Uo,hs[ds++]=Vl,Vl=t,Uo=n}function Pm(t,n,a){gi[vi++]=Gi,gi[vi++]=Vi,gi[vi++]=za,za=t;var r=Gi;t=Vi;var l=32-On(r)-1;r&=~(1<<l),a+=1;var u=32-On(n)+l;if(30<u){var m=l-l%5;u=(r&(1<<m)-1).toString(32),r>>=m,l-=m,Gi=1<<32-On(n)+l|a<<l|r,Vi=u+t}else Gi=1<<u|a<<l|r,Vi=t}function kl(t){t.return!==null&&(ua(t,1),Pm(t,1,0))}function uf(t){for(;t===Vl;)Vl=hs[--ds],hs[ds]=null,Uo=hs[--ds],hs[ds]=null;for(;t===za;)za=gi[--vi],gi[vi]=null,Vi=gi[--vi],gi[vi]=null,Gi=gi[--vi],gi[vi]=null}function zm(t,n){gi[vi++]=Gi,gi[vi++]=Vi,gi[vi++]=za,Gi=n.id,Vi=n.overflow,za=t}var Sn=null,qe=null,de=!1,Ia=null,_i=!1,ff=Error(s(519));function Ba(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw No(mi(n,t)),ff}function Im(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[Tt]=t,n[Ut]=r,a){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(a=0;a<tl.length;a++)_e(tl[a],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Zp(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),Qp(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||av(n.textContent,a)?(r.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),r.onScroll!=null&&_e("scroll",n),r.onScrollEnd!=null&&_e("scrollend",n),r.onClick!=null&&(n.onclick=Hi),n=!0):n=!1,n||Ba(t,!0)}function Xl(t){for(Sn=t.return;Sn;)switch(Sn.tag){case 5:case 31:case 13:_i=!1;return;case 27:case 3:_i=!0;return;default:Sn=Sn.return}}function ps(t){if(t!==Sn)return!1;if(!de)return Xl(t),de=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Gh(t.type,t.memoizedProps)),a=!a),a&&qe&&Ba(t),Xl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));qe=Ev(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));qe=Ev(t)}else n===27?(n=qe,tr(t.type)?(t=Kh,Kh=null,qe=t):qe=n):qe=Sn?yi(t.stateNode.nextSibling):null;return!0}function Tr(){qe=Sn=null,de=!1}function hf(){var t=Ia;return t!==null&&(Wn===null?Wn=t:Wn.push.apply(Wn,t),Ia=null),t}function No(t){Ia===null?Ia=[t]:Ia.push(t)}var df=ae(null),br=null,fa=null;function Fa(t,n,a){Ct(df,n._currentValue),n._currentValue=a}function ha(t){t._currentValue=df.current,Kt(df)}function ql(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function pf(t,n,a,r){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var u=l.dependencies;if(u!==null){var m=l.child;u=u.firstContext;t:for(;u!==null;){var E=u;u=l;for(var O=0;O<n.length;O++)if(E.context===n[O]){u.lanes|=a,E=u.alternate,E!==null&&(E.lanes|=a),ql(u.return,a,t),r||(m=null);break t}u=E.next}}else if(l.tag===18){if(m=l.return,m===null)throw Error(s(341));m.lanes|=a,u=m.alternate,u!==null&&(u.lanes|=a),ql(m,a,t),m=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=a,m=l.alternate,m!==null&&(m.lanes|=a),ql(l.return,a,t),m=l.child,m=m!==null?m.sibling:null):m=l.child;if(m!==null)m.return=l;else for(m=l;m!==null;){if(m===t){m=null;break}if(l=m.sibling,l!==null){l.return=m.return,m=l;break}m=m.return}l=m}}function Ar(t,n,a,r){t=null;for(var l=n,u=!1;l!==null;){if(!u){if((l.flags&524288)!==0)u=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var m=l.alternate;if(m===null)throw Error(s(387));if(m=m.memoizedProps,m!==null){var E=l.type;ti(l.pendingProps.value,m.value)||(t!==null?t.push(E):t=[E])}}else if(l===T.current){if(m=l.alternate,m===null)throw Error(s(387));m.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Fs):t=[Fs])}l=l.return}return t!==null&&pf(n,t,a,r),n.flags|=262144,t!==null}function Yl(t){for(t=t.firstContext;t!==null;){if(!ti(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Rr(t){br=t,fa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Rn(t){return Bm(br,t)}function Wl(t,n){return br===null&&Rr(t),Bm(t,n)}function Bm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},fa===null){if(t===null)throw Error(s(308));fa=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else fa=fa.next=n;return a}var Gy=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Vy=o.unstable_scheduleCallback,ky=o.unstable_NormalPriority,on={$$typeof:ut,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function mf(){return{controller:new Gy,data:new Map,refCount:0}}function Lo(t){t.refCount--,t.refCount===0&&Vy(ky,function(){t.controller.abort()})}function Fm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var r=n[t];a.indexOf(r)===-1&&a.push(r)}}}var Oo=null;function Xy(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Po=null,gf=0,Cr=0,ms=null;function qy(t,n){if(Po===null){var a=Po=[];gf=0,Cr=Nh(),ms={status:"pending",value:void 0,then:function(r){a.push(r)}}}return gf++,n.then(Hm,Hm),n}function Hm(){if(--gf===0&&(Oo=null,Po!==null)){ms!==null&&(ms.status="fulfilled");var t=Po;Po=null,Cr=0,ms=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Yy(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var l=0;l<a.length;l++)(0,a[l])(n)},function(l){for(r.status="rejected",r.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),r}var Gm=Rt.S;Rt.S=function(t,n){if(Lg=G(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&qy(t,n),Oo!==null)for(var a=Ls;a!==null;)Fm(a,Oo),a=a.next;if(a=t.types,a!==null){for(var r=Ls;r!==null;)Fm(r,a),r=r.next;if(Cr!==0){r=Oo,r===null&&(r=Oo=[]);for(var l=0;l<a.length;l++){var u=a[l];r.indexOf(u)===-1&&r.push(u)}}}Gm!==null&&Gm(t,n)};var Dr=ae(null);function vf(){var t=Dr.current;return t!==null?t:ke.pooledCache}function jl(t,n){n===null?Ct(Dr,Dr.current):Ct(Dr,n.pool)}function Vm(){var t=vf();return t===null?null:{parent:on._currentValue,pool:t}}var gs=Error(s(460)),_f=Error(s(474)),Zl=Error(s(542)),Kl={then:function(){}};function km(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Xm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Hi,Hi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Ym(t),t===void 0&&!("reason"in n)?Error(s(600)):t;default:if(typeof n.status=="string")n.then(Hi,Hi);else{if(t=ke,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var l=n;l.status="fulfilled",l.value=r}},function(r){if(n.status==="pending"){var l=n;l.status="rejected",l.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Ym(t),t}throw Ur=n,gs}}function wr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ur=a,gs):a}}var Ur=null;function qm(){if(Ur===null)throw Error(s(459));var t=Ur;return Ur=null,t}function Ym(t){if(t===gs||t===Zl)throw Error(s(483))}var vs=null,zo=0;function Ql(t){var n=zo;return zo+=1,vs===null&&(vs=[]),Xm(vs,t,n)}function Ha(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Jl(t,n){throw n.$$typeof===L?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Wm(t){function n(q,F){if(t){var $=q.deletions;$===null?(q.deletions=[F],q.flags|=16):$.push(F)}}function a(q,F){if(!t)return null;for(;F!==null;)n(q,F),F=F.sibling;return null}function r(q){for(var F=new Map;q!==null;)q.key===null?F.set(q.index,q):F.set(q.key,q),q=q.sibling;return F}function l(q,F){return q=ca(q,F),q.index=0,q.sibling=null,q}function u(q,F,$){return q.index=$,t?($=q.alternate,$!==null?($=$.index,$<F?(q.flags|=2,F):$):(q.flags|=134217730,F)):(q.flags|=1048576,F)}function m(q){return t&&q.alternate===null&&(q.flags|=134217730),q}function E(q,F,$,dt){return F===null||F.tag!==6?(F=lf($,q.mode,dt),F.return=q,F):(F=l(F,$),F.return=q,F)}function O(q,F,$,dt){var Ft=$.type;return Ft===I?(q=rt(q,F,$.props.children,dt,$.key),Ha(q,$),q):F!==null&&(F.elementType===Ft||typeof Ft=="object"&&Ft!==null&&Ft.$$typeof===St&&wr(Ft)===F.type)?(F=l(F,$.props),Ha(F,$),F.return=q,F):(F=Gl($.type,$.key,$.props,null,q.mode,dt),Ha(F,$),F.return=q,F)}function Y(q,F,$,dt){return F===null||F.tag!==4||F.stateNode.containerInfo!==$.containerInfo||F.stateNode.implementation!==$.implementation?(F=cf($,q.mode,dt),F.return=q,F):(F=l(F,$.children||[]),F.return=q,F)}function rt(q,F,$,dt,Ft){return F===null||F.tag!==7?(F=Er($,q.mode,dt,Ft),F.return=q,F):(F=l(F,$),F.return=q,F)}function pt(q,F,$){if(typeof F=="string"&&F!==""||typeof F=="number"||typeof F=="bigint")return F=lf(""+F,q.mode,$),F.return=q,F;if(typeof F=="object"&&F!==null){switch(F.$$typeof){case b:return $=Gl(F.type,F.key,F.props,null,q.mode,$),Ha($,F),$.return=q,$;case A:return F=cf(F,q.mode,$),F.return=q,F;case St:return F=wr(F),pt(q,F,$)}if(wt(F)||ht(F))return F=Er(F,q.mode,$,null),F.return=q,F;if(typeof F.then=="function")return pt(q,Ql(F),$);if(F.$$typeof===ut)return pt(q,Wl(q,F),$);Jl(q,F)}return null}function X(q,F,$,dt){var Ft=F!==null?F.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Ft!==null?null:E(q,F,""+$,dt);if(typeof $=="object"&&$!==null){switch($.$$typeof){case b:return $.key===Ft?O(q,F,$,dt):null;case A:return $.key===Ft?Y(q,F,$,dt):null;case St:return $=wr($),X(q,F,$,dt)}if(wt($)||ht($))return Ft!==null?null:rt(q,F,$,dt,null);if(typeof $.then=="function")return X(q,F,Ql($),dt);if($.$$typeof===ut)return X(q,F,Wl(q,$),dt);Jl(q,$)}return null}function tt(q,F,$,dt,Ft){if(typeof dt=="string"&&dt!==""||typeof dt=="number"||typeof dt=="bigint")return q=q.get($)||null,E(F,q,""+dt,Ft);if(typeof dt=="object"&&dt!==null){switch(dt.$$typeof){case b:return q=q.get(dt.key===null?$:dt.key)||null,O(F,q,dt,Ft);case A:return q=q.get(dt.key===null?$:dt.key)||null,Y(F,q,dt,Ft);case St:return dt=wr(dt),tt(q,F,$,dt,Ft)}if(wt(dt)||ht(dt))return q=q.get($)||null,rt(F,q,dt,Ft,null);if(typeof dt.then=="function")return tt(q,F,$,Ql(dt),Ft);if(dt.$$typeof===ut)return tt(q,F,$,Wl(F,dt),Ft);Jl(F,dt)}return null}function Dt(q,F,$,dt){for(var Ft=null,Ee=null,jt=F,$t=F=0,un=null;jt!==null&&$t<$.length;$t++){jt.index>$t?(un=jt,jt=null):un=jt.sibling;var Re=X(q,jt,$[$t],dt);if(Re===null){jt===null&&(jt=un);break}t&&jt&&Re.alternate===null&&n(q,jt),F=u(Re,F,$t),Ee===null?Ft=Re:Ee.sibling=Re,Ee=Re,jt=un}if($t===$.length)return a(q,jt),de&&ua(q,$t),Ft;if(jt===null){for(;$t<$.length;$t++)jt=pt(q,$[$t],dt),jt!==null&&(F=u(jt,F,$t),Ee===null?Ft=jt:Ee.sibling=jt,Ee=jt);return de&&ua(q,$t),Ft}for(jt=r(jt);$t<$.length;$t++)un=tt(jt,q,$t,$[$t],dt),un!==null&&(t&&(Re=un.alternate,Re!==null&&jt.delete(Re.key===null?$t:Re.key)),F=u(un,F,$t),Ee===null?Ft=un:Ee.sibling=un,Ee=un);return t&&jt.forEach(function(rr){return n(q,rr)}),de&&ua(q,$t),Ft}function Xt(q,F,$,dt){if($==null)throw Error(s(151));for(var Ft=null,Ee=null,jt=F,$t=F=0,un=null,Re=$.next();jt!==null&&!Re.done;$t++,Re=$.next()){jt.index>$t?(un=jt,jt=null):un=jt.sibling;var rr=X(q,jt,Re.value,dt);if(rr===null){jt===null&&(jt=un);break}t&&jt&&rr.alternate===null&&n(q,jt),F=u(rr,F,$t),Ee===null?Ft=rr:Ee.sibling=rr,Ee=rr,jt=un}if(Re.done)return a(q,jt),de&&ua(q,$t),Ft;if(jt===null){for(;!Re.done;$t++,Re=$.next())Re=pt(q,Re.value,dt),Re!==null&&(F=u(Re,F,$t),Ee===null?Ft=Re:Ee.sibling=Re,Ee=Re);return de&&ua(q,$t),Ft}for(jt=r(jt);!Re.done;$t++,Re=$.next())Re=tt(jt,q,$t,Re.value,dt),Re!==null&&(t&&(un=Re.alternate,un!==null&&jt.delete(un.key===null?$t:un.key)),F=u(Re,F,$t),Ee===null?Ft=Re:Ee.sibling=Re,Ee=Re);return t&&jt.forEach(function(AM){return n(q,AM)}),de&&ua(q,$t),Ft}function ce(q,F,$,dt){if(typeof $=="object"&&$!==null&&$.type===I&&$.key===null&&$.props.ref===void 0&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case b:t:{for(var Ft=$.key;F!==null;){if(F.key===Ft){if(Ft=$.type,Ft===I){if(F.tag===7){a(q,F.sibling),dt=l(F,$.props.children),Ha(dt,$),dt.return=q,q=dt;break t}}else if(F.elementType===Ft||typeof Ft=="object"&&Ft!==null&&Ft.$$typeof===St&&wr(Ft)===F.type){a(q,F.sibling),dt=l(F,$.props),Ha(dt,$),dt.return=q,q=dt;break t}a(q,F);break}else n(q,F);F=F.sibling}$.type===I?(dt=Er($.props.children,q.mode,dt,$.key),Ha(dt,$),dt.return=q,q=dt):(dt=Gl($.type,$.key,$.props,null,q.mode,dt),Ha(dt,$),dt.return=q,q=dt)}return m(q);case A:t:{for(Ft=$.key;F!==null;){if(F.key===Ft)if(F.tag===4&&F.stateNode.containerInfo===$.containerInfo&&F.stateNode.implementation===$.implementation){a(q,F.sibling),dt=l(F,$.children||[]),dt.return=q,q=dt;break t}else{a(q,F);break}else n(q,F);F=F.sibling}dt=cf($,q.mode,dt),dt.return=q,q=dt}return m(q);case St:return $=wr($),ce(q,F,$,dt)}if(wt($))return Dt(q,F,$,dt);if(ht($)){if(Ft=ht($),typeof Ft!="function")throw Error(s(150));return $=Ft.call($),Xt(q,F,$,dt)}if(typeof $.then=="function")return ce(q,F,Ql($),dt);if($.$$typeof===ut)return ce(q,F,Wl(q,$),dt);Jl(q,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,F!==null&&F.tag===6?(a(q,F.sibling),dt=l(F,$),dt.return=q,q=dt):(a(q,F),dt=lf($,q.mode,dt),dt.return=q,q=dt),m(q)):a(q,F)}return function(q,F,$,dt){try{zo=0;var Ft=ce(q,F,$,dt);return vs=null,Ft}catch(jt){if(jt===gs||jt===Zl)throw jt;var Ee=Xn(29,jt,null,q.mode);return Ee.lanes=dt,Ee.return=q,Ee}finally{}}}var Nr=Wm(!0),jm=Wm(!1),Ga=!1;function xf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function yf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Va(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ka(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(Ue&2)!==0){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,n=Hl(t),Um(t,null,a),n}return Fl(t,r,n,a),Hl(t)}function Io(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,R(t,a)}}function Sf(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var l=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var m={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?l=u=m:u=u.next=m,a=a.next}while(a!==null);u===null?l=u=n:u=u.next=n}else l=u=n;a={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Mf=!1;function Bo(){if(Mf){var t=ms;if(t!==null)throw t}}function Fo(t,n,a,r){Mf=!1;var l=t.updateQueue;Ga=!1;var u=l.firstBaseUpdate,m=l.lastBaseUpdate,E=l.shared.pending;if(E!==null){l.shared.pending=null;var O=E,Y=O.next;O.next=null,m===null?u=Y:m.next=Y,m=O;var rt=t.alternate;rt!==null&&(rt=rt.updateQueue,E=rt.lastBaseUpdate,E!==m&&(E===null?rt.firstBaseUpdate=Y:E.next=Y,rt.lastBaseUpdate=O))}if(u!==null){var pt=l.baseState;m=0,rt=Y=O=null,E=u;do{var X=E.lane&-536870913,tt=X!==E.lane;if(tt?(Me&X)===X:(r&X)===X){X!==0&&X===Cr&&(Mf=!0),rt!==null&&(rt=rt.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var Dt=t,Xt=E;X=n;var ce=a;switch(Xt.tag){case 1:if(Dt=Xt.payload,typeof Dt=="function"){pt=Dt.call(ce,pt,X);break t}pt=Dt;break t;case 3:Dt.flags=Dt.flags&-65537|128;case 0:if(Dt=Xt.payload,X=typeof Dt=="function"?Dt.call(ce,pt,X):Dt,X==null)break t;pt=P({},pt,X);break t;case 2:Ga=!0}}X=E.callback,X!==null&&(t.flags|=64,tt&&(t.flags|=8192),tt=l.callbacks,tt===null?l.callbacks=[X]:tt.push(X))}else tt={lane:X,tag:E.tag,payload:E.payload,callback:E.callback,next:null},rt===null?(Y=rt=tt,O=pt):rt=rt.next=tt,m|=X;if(E=E.next,E===null){if(E=l.shared.pending,E===null)break;tt=E,E=tt.next,tt.next=null,l.lastBaseUpdate=tt,l.shared.pending=null}}while(!0);rt===null&&(O=pt),l.baseState=O,l.firstBaseUpdate=Y,l.lastBaseUpdate=rt,u===null&&(l.shared.lanes=0),Ka|=m,t.lanes=m,t.memoizedState=pt}}function Zm(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function Km(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Zm(a[t],n)}var Xa=ae(null),$l=ae(0);function Qm(t,n){t=va,Ct($l,t),Ct(Xa,n),va=t|n.baseLanes}function Ef(){Ct($l,va),Ct(Xa,Xa.current)}function Tf(){va=$l.current,Kt(Xa),Kt($l)}var Cn=ae(null),zn=null;function qa(t){var n=t.alternate;Ct(Dn,Dn.current&1),Ct(Cn,t),zn===null&&(n===null||Xa.current!==null||n.memoizedState!==null)&&(zn=t)}function bf(t){Ct(Dn,Dn.current),Ct(Cn,t),zn===null&&(zn=t)}function Jm(t){t.tag===22?(Ct(Dn,Dn.current),Ct(Cn,t),zn===null&&(zn=t)):Ya()}function Ya(){Ct(Dn,Dn.current),Ct(Cn,Cn.current)}function ei(t){Kt(Cn),zn===t&&(zn=null),Kt(Dn)}var Dn=ae(0);function Ho(t,n){Ct(Cn,Cn.current),Ct(Dn,n)}function Af(t){Kt(Dn),Kt(Cn),zn===t&&(zn=null)}function tc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||jh(a)||Zh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var da=0,le=null,Ie=null,ln=null,ec=!1,_s=!1,Lr=!1,nc=0,Go=0,xs=null,Wy=0;function tn(){throw Error(s(321))}function Rf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ti(t[a],n[a]))return!1;return!0}function Cf(t,n,a,r,l,u){return da=u,le=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Rt.H=t===null||t.memoizedState===null?P0:z0,Lr=!1,u=a(r,l),Lr=!1,_s&&(u=t0(n,a,r,l)),$m(t),u}function $m(t){Rt.H=cc;var n=Ie!==null&&Ie.next!==null;if(da=0,ln=Ie=le=null,ec=!1,Go=0,xs=null,n)throw Error(s(300));t===null||cn||(t=t.dependencies,t!==null&&Yl(t)&&(cn=!0))}function t0(t,n,a,r){le=t;var l=0;do{if(_s&&(xs=null),Go=0,_s=!1,25<=l)throw Error(s(301));if(l+=1,ln=Ie=null,t.updateQueue!=null){var u=t.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}Rt.H=eS,u=n(a,r)}while(_s);return u}function jy(){var t=Rt.H,n=t.useState()[0];return n=typeof n.then=="function"?Vo(n):n,t=t.useState()[0],(Ie!==null?Ie.memoizedState:null)!==t&&(le.flags|=1024),n}function Df(){var t=nc!==0;return nc=0,t}function wf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Uf(t){if(ec){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ec=!1}da=0,ln=Ie=le=null,_s=!1,Go=nc=0,xs=null}function Hn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ln===null?le.memoizedState=ln=t:ln=ln.next=t,ln}function nn(){if(Ie===null){var t=le.alternate;t=t!==null?t.memoizedState:null}else t=Ie.next;var n=ln===null?le.memoizedState:ln.next;if(n!==null)ln=n,Ie=t;else{if(t===null)throw le.alternate===null?Error(s(467)):Error(s(310));Ie=t,t={memoizedState:Ie.memoizedState,baseState:Ie.baseState,baseQueue:Ie.baseQueue,queue:Ie.queue,next:null},ln===null?le.memoizedState=ln=t:ln=ln.next=t}return ln}function ic(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Vo(t){var n=Go;return Go+=1,xs===null&&(xs=[]),t=Xm(xs,t,n),n=le,(ln===null?n.memoizedState:ln.next)===null&&(n=n.alternate,Rt.H=n===null||n.memoizedState===null?P0:z0),t}function ac(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Vo(t);if(t.$$typeof===Z)return;if(t.$$typeof===ut)return Rn(t)}throw Error(s(438,String(t)))}function Nf(t){var n=null,a=le.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=le.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(l){return l.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ic(),le.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=Te;return n.index++,a}function pa(t,n){return typeof n=="function"?n(t):n}function rc(t){var n=nn();return Lf(n,Ie,t)}function Lf(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var l=t.baseQueue,u=r.pending;if(u!==null){if(l!==null){var m=l.next;l.next=u.next,u.next=m}n.baseQueue=l=u,r.pending=null}if(u=t.baseState,l===null)t.memoizedState=u;else{n=l.next;var E=m=null,O=null,Y=n,rt=!1;do{var pt=Y.lane&-536870913;if(pt!==Y.lane?(Me&pt)===pt:(da&pt)===pt){var X=Y.revertLane;if(X===0)O!==null&&(O=O.next={lane:0,revertLane:0,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null}),pt===Cr&&(rt=!0);else if((da&X)===X){Y=Y.next,X===Cr&&(rt=!0);continue}else pt={lane:0,revertLane:Y.revertLane,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},O===null?(E=O=pt,m=u):O=O.next=pt,le.lanes|=X,Ka|=X;pt=Y.action,Lr&&a(u,pt),u=Y.hasEagerState?Y.eagerState:a(u,pt)}else X={lane:pt,revertLane:Y.revertLane,gesture:Y.gesture,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},O===null?(E=O=X,m=u):O=O.next=X,le.lanes|=pt,Ka|=pt;Y=Y.next}while(Y!==null&&Y!==n);if(O===null?m=u:O.next=E,!ti(u,t.memoizedState)&&(cn=!0,rt&&(a=ms,a!==null)))throw a;t.memoizedState=u,t.baseState=m,t.baseQueue=O,r.lastRenderedState=u}return l===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function Of(t){var n=nn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,l=a.pending,u=n.memoizedState;if(l!==null){a.pending=null;var m=l=l.next;do u=t(u,m.action),m=m.next;while(m!==l);ti(u,n.memoizedState)||(cn=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),a.lastRenderedState=u}return[u,r]}function e0(t,n,a){var r=le,l=nn(),u=de;if(u){if(a===void 0)throw Error(s(407));a=a()}else a=n();var m=!ti((Ie||l).memoizedState,a);if(m&&(l.memoizedState=a,cn=!0),l=l.queue,If(a0.bind(null,r,l,t),[t]),t=l.getSnapshot!==n||m||ln!==null&&(ln.memoizedState.tag&1)!==0,ys(t?9:8,{destroy:void 0},i0.bind(null,r,l,a,n),null),t){if(r.flags|=2048,ke===null)throw Error(s(349));u||(da&127)!==0||n0(r,n,a)}return a}function n0(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=le.updateQueue,n===null?(n=ic(),le.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function i0(t,n,a,r){n.value=a,n.getSnapshot=r,r0(n)&&s0(t)}function a0(t,n,a){return a(function(){r0(n)&&s0(t)})}function r0(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ti(t,a)}catch{return!0}}function s0(t){var n=Mr(t,2);n!==null&&jn(n,t,2)}function Pf(t){var n=Hn();if(typeof t=="function"){var a=t;if(t=a(),Lr){xn(!0);try{a()}finally{xn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:t},n}function o0(t,n,a,r){return t.baseState=a,Lf(t,Ie,typeof r=="function"?r:pa)}function Zy(t,n,a,r,l){if(lc(t))throw Error(s(485));if(t=n.action,t!==null){var u={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){u.listeners.push(m)}};Rt.T!==null?a(!0):u.isTransition=!1,r(u),a=n.pending,a===null?(u.next=n.pending=u,l0(n,u)):(u.next=a.next,n.pending=a.next=u)}}function l0(t,n){var a=n.action,r=n.payload,l=t.state;if(n.isTransition){var u=Rt.T,m={};m.types=u!==null?u.types:null,Rt.T=m;try{var E=a(l,r),O=Rt.S;O!==null&&O(m,E),c0(t,n,E)}catch(Y){zf(t,n,Y)}finally{u!==null&&m.types!==null&&(u.types=m.types),Rt.T=u}}else try{u=a(l,r),c0(t,n,u)}catch(Y){zf(t,n,Y)}}function c0(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){u0(t,n,r)},function(r){return zf(t,n,r)}):u0(t,n,a)}function u0(t,n,a){n.status="fulfilled",n.value=a,f0(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,l0(t,a)))}function zf(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,f0(n),n=n.next;while(n!==r)}t.action=null}function f0(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function h0(t,n){return n}function d0(t,n){if(de){var a=ke.formState;if(a!==null){t:{var r=le;if(de){if(qe){e:{for(var l=qe,u=_i;l.nodeType!==8;){if(!u){l=null;break e}if(l=yi(l.nextSibling),l===null){l=null;break e}}u=l.data,l=u==="F!"||u==="F"?l:null}if(l){qe=yi(l.nextSibling),r=l.data==="F!";break t}}Ba(r)}r=!1}r&&(n=a[0])}}return a=Hn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:h0,lastRenderedState:n},a.queue=r,a=N0.bind(null,le,r),r.dispatch=a,r=Pf(!1),u=Vf.bind(null,le,!1,r.queue),r=Hn(),l={state:n,dispatch:null,action:t,pending:null},r.queue=l,a=Zy.bind(null,le,l,u,a),l.dispatch=a,r.memoizedState=t,[n,a,!1]}function p0(t){var n=nn();return m0(n,Ie,t)}function m0(t,n,a){if(n=Lf(t,n,h0)[0],t=rc(pa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=Vo(n)}catch(m){throw m===gs?Zl:m}else r=n;n=nn();var l=n.queue,u=l.dispatch;return a!==n.memoizedState&&(le.flags|=2048,ys(9,{destroy:void 0},Ky.bind(null,l,a),null)),[r,u,t]}function Ky(t,n){t.action=n}function g0(t){var n=nn(),a=Ie;if(a!==null)return m0(n,a,t);nn(),n=n.memoizedState,a=nn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function ys(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=le.updateQueue,n===null&&(n=ic(),le.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function v0(){return nn().memoizedState}function sc(t,n,a,r){var l=Hn();le.flags|=t,l.memoizedState=ys(1|n,{destroy:void 0},a,r===void 0?null:r)}function oc(t,n,a,r){var l=nn();r=r===void 0?null:r;var u=l.memoizedState.inst;Ie!==null&&r!==null&&Rf(r,Ie.memoizedState.deps)?l.memoizedState=ys(n,u,a,r):(le.flags|=t,l.memoizedState=ys(1|n,u,a,r))}function _0(t,n){sc(8390656,8,t,n)}function If(t,n){oc(2048,8,t,n)}function Qy(t){le.flags|=4;var n=le.updateQueue;if(n===null)n=ic(),le.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function x0(t){var n=nn().memoizedState;return Qy({ref:n,nextImpl:t}),function(){if((Ue&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function y0(t,n){return oc(4,2,t,n)}function S0(t,n){return oc(4,4,t,n)}function M0(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function E0(t,n,a){a=a!=null?a.concat([t]):null,oc(4,4,M0.bind(null,n,t),a)}function Bf(){}function T0(t,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Rf(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function b0(t,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Rf(n,r[1]))return r[0];if(r=t(),Lr){xn(!0);try{t()}finally{xn(!1)}}return a.memoizedState=[r,n],r}function Ff(t,n,a){return a===void 0||(da&1073741824)!==0&&(Me&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=Pg(),le.lanes|=t,Ka|=t,a)}function A0(t,n,a,r){return ti(a,n)?a:Xa.current!==null?(t=Ff(t,a,r),ti(t,n)||(cn=!0),t):(da&106)===0||(da&1073741824)!==0&&(Me&261930)===0?(cn=!0,t.memoizedState=a):(t=Pg(),le.lanes|=t,Ka|=t,n)}function R0(t,n,a,r,l){var u=Bt.p;Bt.p=u!==0&&8>u?u:8;var m=Rt.T,E={};E.types=m!==null?m.types:null,Rt.T=E,Vf(t,!1,n,a);try{var O=l(),Y=Rt.S;if(Y!==null&&Y(E,O),O!==null&&typeof O=="object"&&typeof O.then=="function"){var rt=Yy(O,r);ko(t,n,rt,ri(t))}else ko(t,n,r,ri(t))}catch(pt){ko(t,n,{then:function(){},status:"rejected",reason:pt},ri())}finally{Bt.p=u,m!==null&&E.types!==null&&(m.types=E.types),Rt.T=m}}function Jy(){}function Hf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var l=C0(t).queue;R0(t,l,n,re,a===null?Jy:function(){return D0(t),a(r)})}function C0(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:re,baseState:re,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:re},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function D0(t){var n=C0(t);n.next===null&&(n=t.alternate.memoizedState),ko(t,n.next.queue,{},ri())}function Gf(){return Rn(Fs)}function w0(){return nn().memoizedState}function U0(){return nn().memoizedState}function $y(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ri();t=Va(a);var r=ka(n,t,a);r!==null&&(jn(r,n,a),Io(r,n,a)),n={cache:mf()},t.payload=n;return}n=n.return}}function tS(t,n,a){var r=ri();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},lc(t)?L0(n,a):(a=sf(t,n,a,r),a!==null&&(jn(a,t,r),O0(a,n,r)))}function N0(t,n,a){var r=ri();ko(t,n,a,r)}function ko(t,n,a,r){var l={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(lc(t))L0(n,l);else{var u=t.alternate;if(t.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var m=n.lastRenderedState,E=u(m,a);if(l.hasEagerState=!0,l.eagerState=E,ti(E,m))return Fl(t,n,l,0),ke===null&&Bl(),!1}catch{}finally{}if(a=sf(t,n,l,r),a!==null)return jn(a,t,r),O0(a,n,r),!0}return!1}function Vf(t,n,a,r){if(r={lane:2,revertLane:Nh(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(t)){if(n)throw Error(s(479))}else n=sf(t,a,r,2),n!==null&&jn(n,t,2)}function lc(t){var n=t.alternate;return t===le||n!==null&&n===le}function L0(t,n){_s=ec=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function O0(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,R(t,a)}}var cc={readContext:Rn,use:ac,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useLayoutEffect:tn,useInsertionEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useSyncExternalStore:tn,useId:tn,useHostTransitionStatus:tn,useFormState:tn,useActionState:tn,useOptimistic:tn,useMemoCache:tn,useCacheRefresh:tn,useEffectEvent:tn},P0={readContext:Rn,use:ac,useCallback:function(t,n){return Hn().memoizedState=[t,n===void 0?null:n],t},useContext:Rn,useEffect:_0,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,sc(4194308,4,M0.bind(null,n,t),a)},useLayoutEffect:function(t,n){return sc(4194308,4,t,n)},useInsertionEffect:function(t,n){sc(4,2,t,n)},useMemo:function(t,n){var a=Hn();n=n===void 0?null:n;var r=t();if(Lr){xn(!0);try{t()}finally{xn(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Hn();if(a!==void 0){var l=a(n);if(Lr){xn(!0);try{a(n)}finally{xn(!1)}}}else l=n;return r.memoizedState=r.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},r.queue=t,t=t.dispatch=tS.bind(null,le,t),[r.memoizedState,t]},useRef:function(t){var n=Hn();return t={current:t},n.memoizedState=t},useState:function(t){t=Pf(t);var n=t.queue,a=N0.bind(null,le,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Bf,useDeferredValue:function(t,n){var a=Hn();return Ff(a,t,n)},useTransition:function(){var t=Pf(!1);return t=R0.bind(null,le,t.queue,!0,!1),Hn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=le,l=Hn();if(de){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),ke===null)throw Error(s(349));(Me&127)!==0||n0(r,n,a)}l.memoizedState=a;var u={value:a,getSnapshot:n};return l.queue=u,_0(a0.bind(null,r,u,t),[t]),r.flags|=2048,ys(9,{destroy:void 0},i0.bind(null,r,u,a,n),null),a},useId:function(){var t=Hn(),n=ke.identifierPrefix;if(de){var a=Vi,r=Gi;a=(r&~(1<<32-On(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=nc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Wy++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Gf,useFormState:d0,useActionState:d0,useOptimistic:function(t){var n=Hn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Vf.bind(null,le,!0,a),a.dispatch=n,[t,n]},useMemoCache:Nf,useCacheRefresh:function(){return Hn().memoizedState=$y.bind(null,le)},useEffectEvent:function(t){var n=Hn(),a={impl:t};return n.memoizedState=a,function(){if((Ue&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},z0={readContext:Rn,use:ac,useCallback:T0,useContext:Rn,useEffect:If,useImperativeHandle:E0,useInsertionEffect:y0,useLayoutEffect:S0,useMemo:b0,useReducer:rc,useRef:v0,useState:function(){return rc(pa)},useDebugValue:Bf,useDeferredValue:function(t,n){var a=nn();return A0(a,Ie.memoizedState,t,n)},useTransition:function(){var t=rc(pa)[0],n=nn().memoizedState;return[typeof t=="boolean"?t:Vo(t),n]},useSyncExternalStore:e0,useId:w0,useHostTransitionStatus:Gf,useFormState:p0,useActionState:p0,useOptimistic:function(t,n){var a=nn();return o0(a,Ie,t,n)},useMemoCache:Nf,useCacheRefresh:U0,useEffectEvent:x0},eS={readContext:Rn,use:ac,useCallback:T0,useContext:Rn,useEffect:If,useImperativeHandle:E0,useInsertionEffect:y0,useLayoutEffect:S0,useMemo:b0,useReducer:Of,useRef:v0,useState:function(){return Of(pa)},useDebugValue:Bf,useDeferredValue:function(t,n){var a=nn();return Ie===null?Ff(a,t,n):A0(a,Ie.memoizedState,t,n)},useTransition:function(){var t=Of(pa)[0],n=nn().memoizedState;return[typeof t=="boolean"?t:Vo(t),n]},useSyncExternalStore:e0,useId:w0,useHostTransitionStatus:Gf,useFormState:g0,useActionState:g0,useOptimistic:function(t,n){var a=nn();return Ie!==null?o0(a,Ie,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Nf,useCacheRefresh:U0,useEffectEvent:x0};function kf(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:P({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Xf={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ri(),l=Va(r);l.payload=n,a!=null&&(l.callback=a),n=ka(t,l,r),n!==null&&(jn(n,t,r),Io(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ri(),l=Va(r);l.tag=1,l.payload=n,a!=null&&(l.callback=a),n=ka(t,l,r),n!==null&&(jn(n,t,r),Io(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ri(),r=Va(a);r.tag=2,n!=null&&(r.callback=n),n=ka(t,r,a),n!==null&&(jn(n,t,a),Io(n,t,a))}};function I0(t,n,a,r,l,u,m){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,u,m):n.prototype&&n.prototype.isPureReactComponent?!Do(a,r)||!Do(l,u):!0}function B0(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&Xf.enqueueReplaceState(n,n.state,null)}function Or(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=P({},a));for(var l in t)a[l]===void 0&&(a[l]=t[l])}return a}function F0(t){Il(t)}function H0(t){console.error(t)}function G0(t){Il(t)}function uc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function V0(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function qf(t,n,a){return a=Va(a),a.tag=3,a.payload={element:null},a.callback=function(){uc(t,n)},a}function k0(t){return t=Va(t),t.tag=3,t}function X0(t,n,a,r){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var u=r.value;t.payload=function(){return l(u)},t.callback=function(){V0(n,a,r)}}var m=a.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(t.callback=function(){V0(n,a,r),typeof l!="function"&&(Qa===null?Qa=new Set([this]):Qa.add(this));var E=r.stack;this.componentDidCatch(r.value,{componentStack:E!==null?E:""})})}function nS(t,n,a,r,l){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ar(n,a,l,!0),a=Cn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return zn===null?Uc():a.alternate===null&&en===0&&(en=3),a.flags&=-257,a.flags|=65536,a.lanes=l,r===Kl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Dh(t,r,l)),!1;case 22:return a.flags|=65536,r===Kl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Dh(t,r,l)),!1}throw Error(s(435,a.tag))}return Dh(t,r,l),Uc(),!1}if(de)return n=Cn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=l,r!==ff&&(t=Error(s(422),{cause:r}),No(mi(t,a)))):(r!==ff&&(n=Error(s(423),{cause:r}),No(mi(n,a))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,r=mi(r,a),l=qf(t.stateNode,r,l),Sf(t,l),en!==4&&(en=2)),!1;var u=Error(s(520),{cause:r});if(u=mi(u,a),Qo===null?Qo=[u]:Qo.push(u),en!==4&&(en=2),n===null)return!0;r=mi(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=l&-l,a.lanes|=t,t=qf(a.stateNode,r,t),Sf(a,t),!1;case 1:if(n=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(Qa===null||!Qa.has(u))))return a.flags|=65536,l&=-l,a.lanes|=l,l=k0(l),X0(l,t,a,r),Sf(a,l),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var Yf=Error(s(461)),cn=!1;function pn(t,n,a,r){n.child=t===null?jm(n,null,a,r):Nr(n,t.child,a,r)}function q0(t,n,a,r,l){a=a.render;var u=n.ref;if("ref"in r){var m={};for(var E in r)E!=="ref"&&(m[E]=r[E])}else m=r;return Rr(n),r=Cf(t,n,a,m,u,l),E=Df(),t!==null&&!cn?(wf(t,n,l),ma(t,n,l)):(de&&E&&kl(n),n.flags|=1,pn(t,n,r,l),n.child)}function Y0(t,n,a,r,l){if(t===null){var u=a.type;return typeof u=="function"&&!of(u)&&u.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=u,W0(t,n,u,r,l)):(t=Gl(a.type,null,r,n,n.mode,l),t.ref=n.ref,t.return=n,n.child=t)}if(u=t.child,!th(t,l)){var m=u.memoizedProps;if(a=a.compare,a=a!==null?a:Do,a(m,r)&&t.ref===n.ref)return ma(t,n,l)}return n.flags|=1,t=ca(u,r),t.ref=n.ref,t.return=n,n.child=t}function W0(t,n,a,r,l){if(t!==null){var u=t.memoizedProps;if(Do(u,r)&&t.ref===n.ref)if(cn=!1,n.pendingProps=r=u,th(t,l))(t.flags&131072)!==0&&(cn=!0);else return n.lanes=t.lanes,ma(t,n,l)}return Wf(t,n,a,r,l)}function j0(t,n,a,r){var l=r.children,u=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(u=u!==null?u.baseLanes|a:a,t!==null){for(r=n.child=t.child,l=0;r!==null;)l=l|r.lanes|r.childLanes,r=r.sibling;r=l&~u}else r=0,n.child=null;return Z0(t,n,u,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&jl(n,u!==null?u.cachePool:null),u!==null?Qm(n,u):Ef(),Jm(n);else return r=n.lanes=536870912,Z0(t,n,u!==null?u.baseLanes|a:a,a,r)}else u!==null?(jl(n,u.cachePool),Qm(n,u),Ya(),n.memoizedState=null):(t!==null&&jl(n,null),Ef(),Ya());return pn(t,n,l,a),n.child}function Xo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Z0(t,n,a,r,l){var u=vf();return u=u===null?null:{parent:on._currentValue,pool:u},n.memoizedState={baseLanes:a,cachePool:u},t!==null&&jl(n,null),Ef(),Jm(n),t!==null&&Ar(t,n,r,!0),n.childLanes=l,null}function fc(t,n){return n=hc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function K0(t,n,a){return Nr(n,t.child,null,a),t=fc(n,n.pendingProps),t.flags|=2,ei(n),n.memoizedState=null,t}function iS(t,n,a){var r=n.pendingProps,l=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(de){if(r.mode==="hidden")return t=fc(n,r),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Xo(null,t);if(bf(n),(t=qe)?(t=Mv(t,_i),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:za!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Lm(t),a.return=n,n.child=a,Sn=n,qe=null)):t=null,t===null)throw Ba(n);return n.lanes=536870912,null}return fc(n,r)}var u=t.memoizedState;if(u!==null){var m=u.dehydrated;if(bf(n),l)if(n.flags&256)n.flags&=-257,n=K0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(cn||Ar(t,n,a,!1),l=(a&t.childLanes)!==0,cn||l){if(Xa.current===null){if(r=ke,r!==null&&(m=j(r,a),m!==0&&m!==u.retryLane))throw u.retryLane=m,Mr(t,m),jn(r,t,m),Yf;Uc()}n=K0(t,n,a)}else t=u.treeContext,qe=yi(m.nextSibling),Sn=n,de=!0,Ia=null,_i=!1,t!==null&&zm(n,t),n=fc(n,r),n.flags|=134221824;return n}return t=ca(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Ss(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Wf(t,n,a,r,l){return Rr(n),a=Cf(t,n,a,r,void 0,l),r=Df(),t!==null&&!cn?(wf(t,n,l),ma(t,n,l)):(de&&r&&kl(n),n.flags|=1,pn(t,n,a,l),n.child)}function Q0(t,n,a,r,l,u){return Rr(n),n.updateQueue=null,a=t0(n,r,a,l),$m(t),r=Df(),t!==null&&!cn?(wf(t,n,u),ma(t,n,u)):(de&&r&&kl(n),n.flags|=1,pn(t,n,a,u),n.child)}function J0(t,n,a,r,l){if(Rr(n),n.stateNode===null){var u=fs,m=a.contextType;typeof m=="object"&&m!==null&&(u=Rn(m)),u=new a(r,u),n.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=Xf,n.stateNode=u,u._reactInternals=n,u=n.stateNode,u.props=r,u.state=n.memoizedState,u.refs={},xf(n),m=a.contextType,u.context=typeof m=="object"&&m!==null?Rn(m):fs,u.state=n.memoizedState,m=a.getDerivedStateFromProps,typeof m=="function"&&(kf(n,a,m,r),u.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(m=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),m!==u.state&&Xf.enqueueReplaceState(u,u.state,null),Fo(n,r,u,l),Bo(),u.state=n.memoizedState),typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){u=n.stateNode;var E=n.memoizedProps,O=Or(a,E);u.props=O;var Y=u.context,rt=a.contextType;m=fs,typeof rt=="object"&&rt!==null&&(m=Rn(rt));var pt=a.getDerivedStateFromProps;rt=typeof pt=="function"||typeof u.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,rt||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(E||Y!==m)&&B0(n,u,r,m),Ga=!1;var X=n.memoizedState;u.state=X,Fo(n,r,u,l),Bo(),Y=n.memoizedState,E||X!==Y||Ga?(typeof pt=="function"&&(kf(n,a,pt,r),Y=n.memoizedState),(O=Ga||I0(n,a,O,r,X,Y,m))?(rt||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(n.flags|=4194308)):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=Y),u.props=r,u.state=Y,u.context=m,r=O):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{u=n.stateNode,yf(t,n),m=n.memoizedProps,rt=Or(a,m),u.props=rt,pt=n.pendingProps,X=u.context,Y=a.contextType,O=fs,typeof Y=="object"&&Y!==null&&(O=Rn(Y)),E=a.getDerivedStateFromProps,(Y=typeof E=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(m!==pt||X!==O)&&B0(n,u,r,O),Ga=!1,X=n.memoizedState,u.state=X,Fo(n,r,u,l),Bo();var tt=n.memoizedState;m!==pt||X!==tt||Ga||t!==null&&t.dependencies!==null&&Yl(t.dependencies)?(typeof E=="function"&&(kf(n,a,E,r),tt=n.memoizedState),(rt=Ga||I0(n,a,rt,r,X,tt,O)||t!==null&&t.dependencies!==null&&Yl(t.dependencies))?(Y||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,tt,O),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,tt,O)),typeof u.componentDidUpdate=="function"&&(n.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof u.componentDidUpdate!="function"||m===t.memoizedProps&&X===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===t.memoizedProps&&X===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=tt),u.props=r,u.state=tt,u.context=O,r=rt):(typeof u.componentDidUpdate!="function"||m===t.memoizedProps&&X===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===t.memoizedProps&&X===t.memoizedState||(n.flags|=1024),r=!1)}return u=r,Ss(t,n),r=(n.flags&128)!==0,u||r?(u=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:u.render(),n.flags|=1,t!==null&&r?(n.child=Nr(n,t.child,null,l),n.child=Nr(n,null,a,l)):pn(t,n,a,l),n.memoizedState=u.state,t=n.child):t=ma(t,n,l),t}function $0(t,n,a,r){return Tr(),n.flags|=256,pn(t,n,a,r),n.child}var jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Zf(t){return{baseLanes:t,cachePool:Vm()}}function Kf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ai),t}function tg(t,n,a){var r=n.pendingProps,l=!1,u=(n.flags&128)!==0,m;if((m=u)||(m=t!==null&&t.memoizedState===null?!1:(Dn.current&2)!==0),m&&(l=!0,n.flags&=-129),m=(n.flags&32)!==0,n.flags&=-33,t===null){if(de){if(l?qa(n):Ya(),(t=qe)?(t=Mv(t,_i),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:za!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Lm(t),a.return=n,n.child=a,Sn=n,qe=null)):t=null,t===null)throw Ba(n);return Zh(t)?n.lanes=32:n.lanes=536870912,null}return u=r.children,r=r.fallback,l?(Ya(),l=n.mode,u=hc({mode:"hidden",children:u},l),r=Er(r,l,a,null),u.return=n,r.return=n,u.sibling=r,n.child=u,r=n.child,r.memoizedState=Zf(a),r.childLanes=Kf(t,m,a),n.memoizedState=jf,Xo(null,r)):(qa(n),Qf(n,u))}var E=t.memoizedState;if(E!==null){var O=E.dehydrated;if(O!==null)return aS(t,n,u,m,r,O,E,a)}return l?(Ya(),l=r.fallback,u=n.mode,E=t.child,O=E.sibling,r=ca(E,{mode:"hidden",children:r.children}),r.subtreeFlags=E.subtreeFlags&1206910976,O!==null?l=ca(O,l):(l=Er(l,u,a,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,Xo(null,r),r=n.child,l=t.child.memoizedState,l===null?l=Zf(a):(u=l.cachePool,u!==null?(E=on._currentValue,u=u.parent!==E?{parent:E,pool:E}:u):u=Vm(),l={baseLanes:l.baseLanes|a,cachePool:u}),r.memoizedState=l,r.childLanes=Kf(t,m,a),n.memoizedState=jf,Xo(t.child,r)):(qa(n),a=t.child,t=a.sibling,a=ca(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(m=n.deletions,m===null?(n.deletions=[t],n.flags|=16):m.push(t)),n.child=a,n.memoizedState=null,a)}function Qf(t,n){return n=hc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function hc(t,n){return t=Xn(22,t,null,n),t.lanes=0,t}function dc(t,n,a){return Nr(n,t.child,null,a),t=Qf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function aS(t,n,a,r,l,u,m,E){if(a)return n.flags&256?(qa(n),n.flags&=-257,dc(t,n,E)):n.memoizedState!==null?(Ya(),n.child=t.child,n.flags|=128,null):(Ya(),u=l.fallback,m=n.mode,l=hc({mode:"visible",children:l.children},m),u=Er(u,m,E,null),u.flags|=2,l.return=n,u.return=n,l.sibling=u,n.child=l,Nr(n,t.child,null,E),l=n.child,l.memoizedState=Zf(E),l.childLanes=Kf(t,r,E),n.memoizedState=jf,Xo(null,l));if(qa(n),Zh(u)){if(r=u.nextSibling&&u.nextSibling.dataset,r)var O=r.dgst;return r=O,r!==""&&(l=Error(s(419)),l.stack="",l.digest=r,No({value:l,source:null,stack:null})),dc(t,n,E)}if(cn||Ar(t,n,E,!1),r=(E&t.childLanes)!==0,cn||r){if(Xa.current!==null)return dc(t,n,E);if(r=ke,r!==null&&(l=j(r,E),l!==0&&l!==m.retryLane))throw m.retryLane=l,Mr(t,l),jn(r,t,l),Yf;return jh(u)||Uc(),dc(t,n,E)}return jh(u)?(n.flags|=192,n.child=t.child,null):(t=m.treeContext,qe=yi(u.nextSibling),Sn=n,de=!0,Ia=null,_i=!1,t!==null&&zm(n,t),n=Qf(n,l.children),n.flags|=134221824,n)}function eg(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),ql(t.return,n,a)}function ng(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&tc(a)===null&&(n=t),t=t.sibling}return n}function pc(t,n,a,r,l,u){var m=t.memoizedState;m===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:l,treeForkCount:u}:(m.isBackwards=n,m.rendering=null,m.renderingStartTime=0,m.last=r,m.tail=a,m.tailMode=l,m.treeForkCount=u)}function Jf(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function $f(t,n,a){var r=n.pendingProps,l=r.revealOrder,u=r.tail;r=r.children;var m=Dn.current;if(n.flags&128)return Ho(n,m),null;var E=(m&2)!==0;if(E?(m=m&1|2,n.flags|=128):m&=1,Ho(n,m),l==="backwards"&&t!==null?(Jf(t),pn(t,n,r,a),Jf(t)):pn(t,n,r,a),r=de?Uo:0,!E&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&eg(t,a,n);else if(t.tag===19)eg(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"backwards":a=ng(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null,Jf(n)),pc(n,!0,l,null,u,r);break;case"unstable_legacy-backwards":for(a=null,l=n.child,n.child=null;l!==null;){if(t=l.alternate,t!==null&&tc(t)===null){n.child=l;break}t=l.sibling,l.sibling=a,a=l,l=t}pc(n,!0,a,null,u,r);break;case"together":pc(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=ng(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null),pc(n,!1,l,a,u,r)}return n.child}function ig(t,n,a){var r=n.pendingProps;return Fa(n,n.type,r.value),pn(t,n,r.children,a),n.child}function ma(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Ka|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ar(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=ca(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=ca(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function th(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Yl(t)))}function rS(t,n,a){switch(n.tag){case 3:at(n,n.stateNode.containerInfo),Fa(n,on,t.memoizedState.cache),Tr();break;case 27:case 5:xt(n);break;case 4:at(n,n.stateNode.containerInfo);break;case 10:Fa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,bf(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return qa(n),n.flags|=128,null;r=Ar(t,n,a,!1);var l=n.child.childLanes;return r||(a&l)!==0?tg(t,n,a):(qa(n),t=ma(t,n,a),t!==null?t.sibling:null)}qa(n);break;case 19:if(n.flags&128)return $f(t,n,a);if(l=(t.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ar(t,n,a,!1),r=(a&n.childLanes)!==0),l){if(r)return $f(t,n,a);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Ho(n,Dn.current),r)break;return null;case 22:return n.lanes=0,j0(t,n,a,n.pendingProps);case 24:Fa(n,on,t.memoizedState.cache)}return ma(t,n,a)}function ag(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)cn=!0;else{if(!th(t,a)&&(n.flags&128)===0)return cn=!1,rS(t,n,a);cn=(t.flags&131072)!==0}else cn=!1,de&&(n.flags&1048576)!==0&&Pm(n,Uo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=wr(n.elementType),n.type=t,typeof t=="function")of(t)?(r=Or(t,r),n.tag=1,n=J0(null,n,t,r,a)):(n.tag=0,n=Wf(null,n,t,r,a));else{if(t!=null){var l=t.$$typeof;if(l===k){n.tag=11,n=q0(null,n,t,r,a);break t}else if(l===yt){n.tag=14,n=Y0(null,n,t,r,a);break t}else if(l===ut){n.tag=10,n.type=t,n=ig(null,n,a);break t}}throw n=kt(t)||t,Error(s(306,n,""))}}return n;case 0:return Wf(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,l=Or(r,n.pendingProps),J0(t,n,r,l,a);case 3:t:{if(at(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var u=n.memoizedState;l=u.element,yf(t,n),Fo(n,r,null,a);var m=n.memoizedState;if(r=m.cache,Fa(n,on,r),r!==u.cache&&pf(n,[on],a,!0),Bo(),r=m.element,u.isDehydrated)if(u={element:r,isDehydrated:!1,cache:m.cache},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){n=$0(t,n,r,a);break t}else if(r!==l){l=mi(Error(s(424)),n),No(l),n=$0(t,n,r,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(qe=yi(t.firstChild),Sn=n,de=!0,Ia=null,_i=!0,a=jm(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Tr(),r===l){n=ma(t,n,a);break t}pn(t,n,r,a)}n=n.child}return n;case 26:return Ss(t,n),t===null?(a=Dv(n.type,null,n.pendingProps,null))?n.memoizedState=a:de||(n.stateNode=lv(n.type,n.pendingProps,N.current,n)):n.memoizedState=Dv(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return xt(n),t===null&&de&&(r=n.stateNode=bv(n.type,n.pendingProps,N.current),Sn=n,_i=!0,l=qe,tr(n.type)?(Kh=l,qe=yi(r.firstChild)):qe=l),pn(t,n,n.pendingProps.children,a),Ss(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&de&&((l=r=qe)&&(r=$S(r,n.type,n.pendingProps,_i),r!==null?(n.stateNode=r,Sn=n,qe=yi(r.firstChild),_i=!1,l=!0):l=!1),l||Ba(n)),xt(n),l=n.type,u=n.pendingProps,m=t!==null?t.memoizedProps:null,r=u.children,Gh(l,u)?r=null:m!==null&&Gh(l,m)&&(n.flags|=32),n.memoizedState!==null&&(l=Cf(t,n,jy,null,null,a),Fs._currentValue=l),Ss(t,n),pn(t,n,r,a),n.child;case 6:return t===null&&de&&((t=a=qe)&&(a=tM(a,n.pendingProps,_i),a!==null?(n.stateNode=a,Sn=n,qe=null,t=!0):t=!1),t||Ba(n)),null;case 13:return tg(t,n,a);case 4:return at(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Nr(n,null,r,a):pn(t,n,r,a),n.child;case 11:return q0(t,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Ss(t,n),pn(t,n,r,a),n.child;case 8:return pn(t,n,n.pendingProps.children,a),n.child;case 12:return pn(t,n,n.pendingProps.children,a),n.child;case 10:return ig(t,n,a);case 9:return l=n.type._context,r=n.pendingProps.children,Rr(n),l=Rn(l),r=r(l),n.flags|=1,pn(t,n,r,a),n.child;case 14:return Y0(t,n,n.type,n.pendingProps,a);case 15:return W0(t,n,n.type,n.pendingProps,a);case 19:return $f(t,n,a);case 31:return iS(t,n,a);case 22:return j0(t,n,a,n.pendingProps);case 24:return Rr(n),r=Rn(on),t===null?(l=vf(),l===null&&(l=ke,u=mf(),l.pooledCache=u,u.refCount++,u!==null&&(l.pooledCacheLanes|=a),l=u),n.memoizedState={parent:r,cache:l},xf(n),Fa(n,on,l)):((t.lanes&a)!==0&&(yf(t,n),Fo(n,null,null,a),Bo()),l=t.memoizedState,u=n.memoizedState,l.parent!==r?(l={parent:r,cache:r},n.memoizedState=l,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=l),Fa(n,on,r)):(r=u.cache,Fa(n,on,r),r!==l.cache&&pf(n,[on],a,!0))),pn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=t===null?18882560:18874368:de&&kl(n),t!==null&&t.memoizedProps.name!==r.name?n.flags|=4194816:Ss(t,n),pn(t,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ga(t){t.flags|=4}function eh(t,n,a,r,l){var u;if((u=(t.mode&32)!==0)&&(u=a===null?Lv(n,r):Lv(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),u){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(Fg())t.flags|=8192;else throw Ur=Kl,_f}else t.flags&=-16777217}function rg(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Ov(n))if(Fg())t.flags|=8192;else throw Ur=Kl,_f}function mc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Al():536870912,t.lanes|=n,As|=n)}function qo(t,n){if(!de)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function Ye(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var l=t.child;l!==null;)a|=l.lanes|l.childLanes,r|=l.subtreeFlags&1206910976,r|=l.flags&1206910976,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)a|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function sS(t,n,a){var r=n.pendingProps;switch(uf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ye(n),null;case 1:return Ye(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),ha(on),vt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(ps(n)?ga(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,hf())),Ye(n),null;case 26:var l=n.type,u=n.memoizedState;return t===null?(ga(n),u!==null?(Ye(n),rg(n,u)):(Ye(n),eh(n,l,null,r,a))):u?u!==t.memoizedState?(ga(n),Ye(n),rg(n,u)):(Ye(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&ga(n),Ye(n),eh(n,l,t,r,a)),null;case 27:if(mt(n),a=N.current,l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&ga(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Ye(n),n.subtreeFlags&=-33554433,null}t=ye.current,ps(n)?Im(n):(t=bv(l,r,a),n.stateNode=t,ga(n))}return Ye(n),n.subtreeFlags&=-33554433,null;case 5:if(mt(n),l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&ga(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Ye(n),n.subtreeFlags&=-33554433,null}if(u=ye.current,ps(n))Im(n);else{var m=nl(N.current);switch(u){case 1:u=m.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:u=m.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":u=m.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":u=m.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":u=m.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof r.is=="string"?m.createElement("select",{is:r.is}):m.createElement("select"),r.multiple?u.multiple=!0:r.size&&(u.size=r.size);break;default:u=typeof r.is=="string"?m.createElement(l,{is:r.is}):m.createElement(l)}}u[Tt]=n,u[Ut]=r;t:for(m=n.child;m!==null;){if(m.tag===5||m.tag===6)u.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break t;for(;m.sibling===null;){if(m.return===null||m.return===n)break t;m=m.return}m.sibling.return=m.return,m=m.sibling}n.stateNode=u;t:switch(Un(u,l,r),l){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&ga(n)}}return Ye(n),n.subtreeFlags&=-33554433,eh(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&ga(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=N.current,ps(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,l=Sn,l!==null)switch(l.tag){case 27:case 5:r=l.memoizedProps}t[Tt]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||av(t.nodeValue,a)),t||Ba(n,!0)}else t=nl(t).createTextNode(r),t[Tt]=n,n.stateNode=t}return Ye(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=ps(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Tt]=n}else Tr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ye(n),t=!1}else a=hf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ei(n),n):(ei(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ye(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ps(n),r!==null&&r.dehydrated!==null){if(t===null){if(!l)throw Error(s(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(s(317));l[Tt]=n}else Tr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ye(n),l=!1}else l=hf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return n.flags&256?(ei(n),n):(ei(n),null)}return ei(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,l=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(l=r.alternate.memoizedState.cachePool.pool),u=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(u=r.memoizedState.cachePool.pool),u!==l&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),mc(n,n.updateQueue),Ye(n),null);case 4:return vt(),t===null&&zh(n.stateNode.containerInfo),n.flags|=67108864,Ye(n),null;case 10:return ha(n.type),Ye(n),null;case 19:if(Af(n),r=n.memoizedState,r===null)return Ye(n),null;if(l=(n.flags&128)!==0,u=r.rendering,u===null)if(l)qo(r,!1);else{if(en!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(u=tc(t),u!==null){for(n.flags|=128,qo(r,!1),t=u.updateQueue,n.updateQueue=t,mc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Nm(a,t),a=a.sibling;return Ho(n,Dn.current&1|2),de&&ua(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&G()>Rc&&(n.flags|=128,l=!0,qo(r,!1),n.lanes=4194304)}else{if(!l)if(t=tc(u),t!==null){if(n.flags|=128,l=!0,t=t.updateQueue,n.updateQueue=t,mc(n,t),qo(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!u.alternate&&!de)return Ye(n),null}else 2*G()-r.renderingStartTime>Rc&&a!==536870912&&(n.flags|=128,l=!0,qo(r,!1),n.lanes=4194304);r.isBackwards?(u.sibling=n.child,n.child=u):(t=r.last,t!==null?t.sibling=u:n.child=u,r.last=u)}if(r.tail!==null){t=r.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return r.rendering=t,r.tail=t.sibling,r.renderingStartTime=G(),t.sibling=null,u=Dn.current,u=l?u&1|2:u&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||de?Ho(n,u):(a=u,Ct(Cn,n),Ct(Dn,a),zn===null&&(zn=n)),de&&ua(n,r.treeForkCount),t}return Ye(n),null;case 22:case 23:return ei(n),Tf(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(Ye(n),n.subtreeFlags&6&&(n.flags|=8192)):Ye(n),a=n.updateQueue,a!==null&&mc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&Kt(Dr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ha(on),Ye(n),null;case 25:return null;case 30:return n.flags|=33554432,Ye(n),null}throw Error(s(156,n.tag))}function oS(t,n){switch(uf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ha(on),vt(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return mt(n),null;case 31:if(n.memoizedState!==null){if(ei(n),n.alternate===null)throw Error(s(340));Tr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ei(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Tr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Af(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return vt(),null;case 10:return ha(n.type),null;case 22:case 23:return ei(n),Tf(),t!==null&&Kt(Dr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ha(on),null;case 25:return null;default:return null}}function sg(t,n){switch(uf(n),n.tag){case 3:ha(on),vt();break;case 26:case 27:case 5:mt(n);break;case 4:vt();break;case 31:n.memoizedState!==null&&ei(n);break;case 13:ei(n);break;case 19:Af(n);break;case 10:ha(n.type);break;case 22:case 23:ei(n),Tf(),t!==null&&Kt(Dr);break;case 24:ha(on)}}function Yo(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var l=r.next;a=l;do{if((a.tag&t)===t){r=void 0;var u=a.create,m=a.inst;r=u(),m.destroy=r}a=a.next}while(a!==l)}}catch(E){Oe(n,n.return,E)}}function Wa(t,n,a){try{var r=n.updateQueue,l=r!==null?r.lastEffect:null;if(l!==null){var u=l.next;r=u;do{if((r.tag&t)===t){var m=r.inst,E=m.destroy;if(E!==void 0){m.destroy=void 0,l=n;var O=a,Y=E;try{Y()}catch(rt){Oe(l,O,rt)}}}r=r.next}while(r!==u)}}catch(rt){Oe(n,n.return,rt)}}function og(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Km(n,a)}catch(r){Oe(t,t.return,r)}}}function lg(t,n,a){a.props=Or(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){Oe(t,n,r)}}function ki(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:var l=t.stateNode,u=oa(t.memoizedProps,l);(l.ref===null||l.ref.name!==u)&&(l.ref=mv(u)),r=l.ref;break;case 7:if(t.stateNode===null){var m=new si(t);v(t.child,!1,QS,m,void 0,void 0),t.stateNode=m}r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(E){Oe(t,n,E)}}function wn(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(l){Oe(t,n,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){Oe(t,n,l)}else a.current=null}function gc(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)Sv(t.stateNode,n[a])}function cg(t){for(var n=t.return;n!==null&&(ih(n)&&Sv(t.stateNode,n.stateNode),!nh(n));)n=n.return}function Wo(t){for(var n=t.return;n!==null&&(ih(n)&&JS(t.stateNode,n.stateNode),!nh(n));)n=n.return}function nh(t){return t.tag===5||t.tag===3||t.tag===27}function ih(t){return t&&t.tag===7&&t.stateNode!==null}function ah(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(l){Oe(t,t.return,l)}}function rh(t,n,a){try{var r=t.stateNode;LS(r,t.type,a,n),r[Ut]=n}catch(l){Oe(t,t.return,l)}}function ug(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&tr(t.type)||t.tag===4}function sh(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||ug(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&tr(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function oh(t,n,a,r){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(l),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Hi)),gc(t,r),De=!0;else if(l!==4&&(l===27&&(gc(t,r),r=null,tr(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(oh(t,n,a,r),t=t.sibling;t!==null;)oh(t,n,a,r),t=t.sibling}function vc(t,n,a,r){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?a.insertBefore(l,n):a.appendChild(l),gc(t,r),De=!0;else if(l!==4&&(l===27&&(gc(t,r),r=null,tr(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(vc(t,n,a,r),t=t.sibling;t!==null;)vc(t,n,a,r),t=t.sibling}function fg(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0]);Un(n,r,a),n[Tt]=t,n[Ut]=a}catch(u){Oe(t,t.return,u)}}var _c=!1,ni=null;function hg(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(_c=!0)}var Xi=null;function dg(){var t=Xi;return Xi=null,t}var qn=0;function Ms(t,n,a,r,l){return qn=0,pg(t.child,n,a,r,l)}function pg(t,n,a,r,l){for(var u=!1;t!==null;){if(t.tag===5){var m=t.stateNode;if(r!==null){var E=Xh(m);r.push(E),E.view&&(u=!0)}else u||Xh(m).view&&(u=!0);_c=!0,dv(m,qn===0?n:n+"_"+qn,a),qn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&l||pg(t.child,n,a,r,l)&&(u=!0));t=t.sibling}return u}function qi(t,n){for(;t!==null;)t.tag===5?pv(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||qi(t.child,n)),t=t.sibling}function xc(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(xc(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=la(n.default,n.share),n!=="none"&&(Ms(t,a,n,null,!1)||qi(t.child,!1))}t=t.sibling}}function lh(t,n){if(t.tag===30){var a=t.stateNode,r=t.memoizedProps,l=oa(r,a),u=la(r.default,a.paired?r.share:r.enter);u!=="none"?Ms(t,l,u,null,!1)?(xc(t),a.paired||n||ws(t,r.onEnter)):qi(t.child,!1):xc(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)lh(t,n),t=t.sibling;else xc(t)}function ch(t){if(ni!==null&&ni.size!==0){var n=ni;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var l=n.get(r);if(l!==void 0){var u=la(a.default,a.share);if(u!=="none"&&(Ms(t,r,u,null,!1)?(u=t.stateNode,l.paired=u,u.paired=l,ws(t,a.onShare)):qi(t.child,!1)),n.delete(r),n.size===0)break}}}ch(t)}t=t.sibling}}}function uh(t){if(t.tag===30){var n=t.memoizedProps,a=oa(n,t.stateNode),r=ni!==null?ni.get(a):void 0,l=la(n.default,r!==void 0?n.share:n.exit);l!=="none"&&(Ms(t,a,l,null,!1)?r!==void 0?(l=t.stateNode,r.paired=l,l.paired=r,ni.delete(a),ws(t,n.onShare)):ws(t,n.onExit):qi(t.child,!1)),ni!==null&&ch(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)uh(t),t=t.sibling;else ni!==null&&ch(t)}function mg(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=oa(n,t.stateNode);n=la(n.default,n.update),t.flags&=-5,n!=="none"&&Ms(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&mg(t);t=t.sibling}}function fh(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,qi(t.child,!1))}fh(t)}t=t.sibling}}function yc(t){if(t.tag===30)t.stateNode.paired=null,qi(t.child,!1),fh(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)yc(t),t=t.sibling;else fh(t)}function gg(t){for(t=t.child;t!==null;)t.tag===30?qi(t.child,!1):(t.subtreeFlags&33554432)!==0&&gg(t),t=t.sibling}function hh(t,n,a,r,l,u,m){for(var E=!1;n!==null;){if(n.tag===5){var O=n.stateNode;if(u!==null&&qn<u.length){var Y=u[qn],rt=Xh(O);(Y.view||rt.view)&&(E=!0);var pt;if(pt=(t.flags&4)===0)if(rt.clip)pt=!0;else{pt=Y.rect;var X=rt.rect;pt=pt.y!==X.y||pt.x!==X.x||pt.height!==X.height||pt.width!==X.width}pt&&(t.flags|=4),rt.abs?rt=!Y.abs:(Y=Y.rect,rt=rt.rect,rt=Y.height!==rt.height||Y.width!==rt.width),rt&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&dv(O,qn===0?a:a+"_"+qn,l),E&&(t.flags&4)!==0||(Xi===null&&(Xi=[]),Xi.push(O,qn===0?r:r+"_"+qn,n.memoizedProps)),qn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&m?t.flags|=n.flags&32:hh(t,n.child,a,r,l,u,m)&&(E=!0));n=n.sibling}return E}function vg(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,r=t.stateNode,l=oa(a,r),u=la(a.default,a.update),m;m=t.memoizedState,t.memoizedState=null,r=t;var E=t.child;qn=0,l=hh(r,E,l,l,u,m,!1),(t.flags&4)!==0&&l&&ws(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&vg(t);t=t.sibling}}var Mn=!1,Ne=!1,Yi=!1,dh=!1,_g=typeof WeakSet=="function"?WeakSet:Set,En=null,Wi=!1,jo=!1,Sc=!1,ph=!1;function lS(t,n,a){if(t=t.containerInfo,Fh=Hs,t=Mm(t),$u(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var l=r.getSelection&&r.getSelection();if(l&&l.rangeCount!==0){r=l.anchorNode;var u=l.anchorOffset,m=l.focusNode;l=l.focusOffset;try{r.nodeType,m.nodeType}catch{r=null;break t}var E=0,O=-1,Y=-1,rt=0,pt=0,X=t,tt=null;e:for(;;){for(var Dt;X!==r||u!==0&&X.nodeType!==3||(O=E+u),X!==m||l!==0&&X.nodeType!==3||(Y=E+l),X.nodeType===3&&(E+=X.nodeValue.length),(Dt=X.firstChild)!==null;)tt=X,X=Dt;for(;;){if(X===t)break e;if(tt===r&&++rt===u&&(O=E),tt===m&&++pt===l&&(Y=E),(Dt=X.nextSibling)!==null)break;X=tt,tt=X.parentNode}X=Dt}r=O===-1||Y===-1?null:{start:O,end:Y}}else r=null}r=r||{start:0,end:0}}else r=null;for(Hh={focusedElem:t,selectionRange:r},Hs=!1,a=(a&335544064)===a,En=n,n=a?9270:1024;En!==null;){if(t=En,a&&(r=t.deletions,r!==null))for(u=0;u<r.length;u++)a&&uh(r[u]);if(t.alternate===null&&(t.flags&2)!==0)a&&hg(t),Mc(a);else{if(t.tag===22){if(r=t.alternate,t.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&uh(r),Mc(a);continue}else if(r!==null&&r.memoizedState!==null){a&&hg(t),Mc(a);continue}}r=t.child,(t.subtreeFlags&n)!==0&&r!==null?(r.return=t,En=r):(a&&mg(t),Mc(a))}}ni=null}function Mc(t){for(;En!==null;){var n=En,a=t,r=n.alternate,l=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&r!==null){a=void 0,l=r.memoizedProps,r=r.memoizedState;var u=n.stateNode;try{var m=Or(n.type,l);a=u.getSnapshotBeforeUpdate(m,r),u.__reactInternalSnapshotBeforeUpdate=a}catch(E){Oe(n,n.return,E)}}break;case 3:if((l&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)Wh(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":Wh(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=oa(r.memoizedProps,r.stateNode),l=n.memoizedProps,l=la(l.default,l.update),l!=="none"&&Ms(r,a,l,r.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,En=r;break}En=n.return}}function xg(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:ji(t,a),r&4&&Yo(5,a);break;case 1:if(ji(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(m){Oe(a,a.return,m)}else{var l=Or(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(l,n,t.__reactInternalSnapshotBeforeUpdate)}catch(m){Oe(a,a.return,m)}}r&64&&og(a),r&512&&ki(a,a.return);break;case 3:if(ji(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Km(t,n)}catch(m){Oe(a,a.return,m)}}break;case 27:n===null&&r&4&&fg(a);case 26:case 5:ji(t,a),n===null&&r&4&&ah(a),r&512&&ki(a,a.return);break;case 12:ji(t,a);break;case 31:ji(t,a),r&4&&Eg(t,a);break;case 13:ji(t,a),r&4&&Tg(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=yS.bind(null,a),eM(t,a))));break;case 22:if(r=a.memoizedState!==null||Mn,!r){var u=n!==null&&n.memoizedState!==null||Ne;n=Mn,l=Ne,Mn=r,(Ne=u)&&!l?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),wi(t,a,r)):ji(t,a),Mn=n,Ne=l}break;case 30:ji(t,a),r&512&&ki(a,a.return);break;case 7:r&512&&ki(a,a.return);default:ji(t,a)}}function mh(t,n){for(t=t.child;t!==null;)yg(t,n),t=t.sibling}function yg(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var l=t.stateNode,u=t.memoizedProps.style,m=u!=null&&u.hasOwnProperty("display")?u.display:null;l.style.display=m==null||typeof m=="boolean"?"":(""+m).trim()}}catch(O){Oe(t,t.return,O)}gh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,De=!0}catch(O){Oe(t,t.return,O)}break;case 18:try{var E=t.stateNode;n?hv(E,!0):hv(t.stateNode,!1)}catch(O){Oe(t,t.return,O)}break;case 22:case 23:t.memoizedState===null&&mh(t,n);break;default:mh(t,n)}}function gh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,r=n;switch(a.tag){case 4:yg(a,r);break t;case 22:a.memoizedState===null&&gh(a,r);break t;default:gh(a,r)}}t=t.sibling}}function Sg(t){var n=t.alternate;n!==null&&(t.alternate=null,Sg(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&ge(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Je=null,Yn=!1;function Ci(t,n,a){for(a=a.child;a!==null;)Mg(t,n,a),a=a.sibling}function Mg(t,n,a){if(je&&typeof je.onCommitFiberUnmount=="function")try{je.onCommitFiberUnmount(be,a)}catch{}switch(a.tag){case 26:Ne||wn(a,n),Ci(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Ne&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ne||wn(a,n),Wo(a);var r=Je,l=Yn;tr(a.type)&&(Je=a.stateNode,Yn=!1),Ci(t,n,a),Av(a.stateNode,a.type,a.memoizedProps),Je=r,Yn=l;break;case 5:Ne||wn(a,n),Wo(a);case 6:if(a.tag===6&&Wo(a),r=Je,l=Yn,Je=null,Ci(t,n,a),Je=r,Yn=l,Je!==null)if(Yn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode),De=!0}catch(u){Oe(a,n,u)}else try{Je.removeChild(a.stateNode),De=!0}catch(u){Oe(a,n,u)}break;case 18:Je!==null&&(Yn?(t=Je,fv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Gs(t)):fv(Je,a.stateNode));break;case 4:r=Je,l=Yn,Je=a.stateNode.containerInfo,Yn=!0,Ci(t,n,a),Je=r,Yn=l;break;case 0:case 11:case 14:case 15:Wa(2,a,n),Ne||Wa(4,a,n),Ci(t,n,a);break;case 1:Ne||(wn(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&lg(a,n,r)),Ci(t,n,a);break;case 21:Ci(t,n,a);break;case 22:Ne=(r=Ne)||a.memoizedState!==null,Ci(t,n,a),Ne=r;break;case 30:wn(a,n),Ci(t,n,a);break;case 7:Ne||wn(a,n),Ci(t,n,a);break;default:Ci(t,n,a)}}function Eg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Gs(t)}catch(a){Oe(n,n.return,a)}}}function Tg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Gs(t)}catch(a){Oe(n,n.return,a)}}function cS(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new _g),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new _g),n;default:throw Error(s(435,t.tag))}}function Ec(t,n){var a=cS(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var l=SS.bind(null,t,r);r.then(l,l)}})}function Gn(t,n,a){var r=n.deletions;if(r!==null)for(var l=0;l<r.length;l++){var u=r[l],m=t,E=n,O=E;t:for(;O!==null;){switch(O.tag){case 27:if(tr(O.type)){Je=O.stateNode,Yn=!1;break t}break;case 5:Je=O.stateNode,Yn=!1;break t;case 3:case 4:Je=O.stateNode.containerInfo,Yn=!0;break t}O=O.return}if(Je===null)throw Error(s(160));Mg(m,E,u),Je=null,Yn=!1,m=u.alternate,m!==null&&(m.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)bg(n,t,a),n=n.sibling}var Di=null;function bg(t,n,a){var r=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(l&4&&(r=t.updateQueue,r=r!==null?r.events:null,r!==null))for(var u=0;u<r.length;u++){var m=r[u];m.ref.impl=m.nextImpl}Gn(n,t,a),Vn(t),l&4&&(Wa(3,t,t.return),Yo(3,t),Wa(5,t,t.return));break;case 1:Gn(n,t,a),Vn(t),l&512&&(Ne||r===null||wn(r,r.return)),l&64&&Mn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(u=Di,Gn(n,t,a),Vn(t),l&512&&(Ne||r===null||wn(r,r.return)),l&4)if(l=r!==null?r.memoizedState:null,a=t.memoizedState,r===null)if(a===null)if(t.stateNode===null)if(Mn)t.stateNode=lv(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,l=u.ownerDocument||u;e:switch(n){case"title":r=l.getElementsByTagName("title")[0],(!r||r[Xe]||r[Tt]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=l.createElement(n),l.head.insertBefore(r,l.querySelector("head > title"))),Un(r,n,a),r[Tt]=t,Ze(r),n=r;break t;case"link":if(u=Nv("link","href",l).get(n+(a.href||""))){for(m=0;m<u.length;m++)if(r=u[m],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(m,1);break e}}r=l.createElement(n),Un(r,n,a),l.head.appendChild(r);break;case"meta":if(u=Nv("meta","content",l).get(n+(a.content||""))){for(m=0;m<u.length;m++)if(r=u[m],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(m,1);break e}}r=l.createElement(n),Un(r,n,a),l.head.appendChild(r);break;default:throw Error(s(468,n))}r[Tt]=t,Ze(r),n=r}t.stateNode=n}else Mn||td(u,t.type,t.stateNode);else t.stateNode=Uv(u,a,t.memoizedProps);else l!==a?(l===null?(n=r.stateNode,n===null||Ne||n.parentNode.removeChild(n)):l.count--,a===null?Mn||td(u,t.type,t.stateNode):Uv(u,a,t.memoizedProps)):a===null&&t.stateNode!==null&&rh(t,t.memoizedProps,r.memoizedProps);break;case 27:Gn(n,t,a),Vn(t),l&512&&(Ne||r===null||wn(r,r.return)),r!==null&&l&4&&rh(t,t.memoizedProps,r.memoizedProps);break;case 5:if(u=Yi,Yi=!1,Gn(n,t,a),Yi=u,Vn(t),l&512&&(Ne||r===null||wn(r,r.return)),t.flags&32){n=t.stateNode;try{as(n,""),De=!0}catch(rt){Oe(t,t.return,rt)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,rh(t,n,r!==null?r.memoizedProps:n)),l&1024&&(dh=!0);break;case 6:if(Gn(n,t,a),Vn(t),l&4){if(t.stateNode===null)throw Error(s(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,De=!0}catch(rt){Oe(t,t.return,rt)}}break;case 3:if(De=!1,Bc=null,u=Di,Di=il(n.containerInfo),Gn(n,t,a),Di=u,Vn(t),l&4&&r!==null&&r.memoizedState.isDehydrated)try{Gs(n.containerInfo)}catch(rt){Oe(t,t.return,rt)}dh&&(dh=!1,Ag(t)),De=!1;break;case 4:l=Yi,Yi=Mn,r=Yp(),u=Di,Di=il(t.stateNode.containerInfo),Gn(n,t,a),Vn(t),Di=u,De&&jo&&(Sc=!0),De=r,Yi=l;break;case 12:Gn(n,t,a),Vn(t);break;case 31:Gn(n,t,a),Vn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ec(t,n)));break;case 13:Gn(n,t,a),Vn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Ac=G()),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ec(t,n)));break;case 22:u=t.memoizedState!==null,m=r!==null&&r.memoizedState!==null;var E=Mn,O=Ne,Y=Yi;Mn=E||u,Yi=Y||u,Ne=O||m,Gn(n,t,a),Ne=O,Yi=Y,Mn=E,Vn(t),l&8192&&(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,!u||r===null||m||Mn||Ne||(n=m||Ne,a=Mn,r=Ne,Mn=u||Mn,Ne=n,ja(t,2),Mn=a,Ne=r),!u&&Yi||mh(t,u)),l&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Ec(t,a))));break;case 19:Gn(n,t,a),Vn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ec(t,n)));break;case 30:l&512&&(Ne||r===null||wn(r,r.return)),l=Yp(),u=jo,m=(a&335544064)===a,E=t.memoizedProps,jo=m&&la(E.default,E.update)!=="none",Gn(n,t,a),Vn(t),m&&r!==null&&De&&(t.flags|=4),jo=u,De=l;break;case 21:break;case 7:l&512&&(Ne||r===null||wn(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=t);default:Gn(n,t,a),Vn(t)}}function Vn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(ug(r)){a=r;break}r=r.return}r=null;for(var l=t.return;l!==null;){if(ih(l)){var u=l.stateNode;r===null?r=[u]:r.push(u)}if(nh(l))break;l=l.return}var m=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var E=a.stateNode,O=sh(t);vc(t,O,E,m);break;case 5:var Y=a.stateNode;a.flags&32&&(as(Y,""),a.flags&=-33);var rt=sh(t);vc(t,rt,Y,m);break;case 3:case 4:var pt=a.stateNode.containerInfo,X=sh(t);oh(t,X,pt,m);break;default:throw Error(s(161))}}catch(tt){Oe(t,t.return,tt)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function Ag(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;Ag(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Hs=!0,n.reset(),Hs=!1),t=t.sibling}}function Es(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)Rg(n,t),n=n.sibling;else vg(n)}function Rg(t,n){var a=t.alternate;if(a===null)lh(t,!1);else switch(t.tag){case 3:if(ph=Wi=!1,dg(),Es(n,t),!Wi&&!Sc){if(t=Xi,t!==null)for(var r=0;r<t.length;r+=3){a=t[r];var l=t[r+1];pv(a,t[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+l+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),ph=!0}Xi=null;break;case 5:Es(n,t);break;case 4:r=Wi,Wi=!1,Es(n,t),Wi&&(Sc=!0),Wi=r;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?lh(t,!1):Es(n,t));break;case 30:r=Wi,l=dg(),Wi=!1,Es(n,t),Wi&&(t.flags|=4);var u=t.memoizedProps,m=t.stateNode;n=oa(u,m),m=oa(a.memoizedProps,m);var E=la(u.default,u.update);E==="none"?n=!1:(u=a.memoizedState,a.memoizedState=null,a=t.child,qn=0,n=hh(t,a,n,m,E,u,!0),qn!==(u===null?0:u.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(ws(t,t.memoizedProps.onUpdate),Xi=l):l!==null&&(l.push.apply(l,Xi),Xi=l),Wi=(t.flags&32)!==0?!0:r;break;default:Es(n,t)}}function ji(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)xg(t,n.alternate,n),n=n.sibling}function ja(t,n){for(t=t.child;t!==null;){var a=t,r=n;switch(a.tag){case 0:case 11:case 14:case 15:Wa(4,a,a.return),ja(a,r);break;case 1:wn(a,a.return);var l=a.stateNode;typeof l.componentWillUnmount=="function"&&lg(a,a.return,l),ja(a,r);break;case 27:(r&2)!==0&&Av(a.stateNode,a.type,a.memoizedProps);case 5:wn(a,a.return),a.tag!==5&&a.tag!==27||Wo(a),ja(a,r);break;case 6:Wo(a);break;case 26:wn(a,a.return),l=a.stateNode,a.memoizedState!==null||l===null||Ne||l.parentNode.removeChild(l),ja(a,r);break;case 22:a.memoizedState===null&&ja(a,r);break;case 30:wn(a,a.return),ja(a,r);break;case 7:wn(a,a.return);default:ja(a,r)}t=t.sibling}}function wi(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,l=t,u=n,m=u.flags,E=(a&1)!==0;switch(u.tag){case 0:case 11:case 15:wi(l,u,a),Yo(4,u);break;case 1:if(wi(l,u,a),r=u,l=r.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(rt){Oe(r,r.return,rt)}if(r=u,l=r.updateQueue,l!==null){var O=r.stateNode;try{var Y=l.shared.hiddenCallbacks;if(Y!==null)for(l.shared.hiddenCallbacks=null,l=0;l<Y.length;l++)Zm(Y[l],O)}catch(rt){Oe(r,r.return,rt)}}E&&m&64&&og(u),ki(u,u.return);break;case 27:(a&2)!==0&&fg(u);case 5:u.tag!==5&&u.tag!==27||cg(u),wi(l,u,a),E&&r===null&&m&4&&ah(u),ki(u,u.return);break;case 6:cg(u);break;case 26:O=u.stateNode,u.memoizedState!==null||O===null||Mn||td(il(O.ownerDocument),u.type,O),wi(l,u,a),E&&r===null&&m&4&&ah(u),ki(u,u.return);break;case 12:wi(l,u,a);break;case 31:wi(l,u,a),E&&m&4&&Eg(l,u);break;case 13:wi(l,u,a),E&&m&4&&Tg(l,u);break;case 22:u.memoizedState===null&&wi(l,u,a),ki(u,u.return);break;case 30:wi(l,u,a),ki(u,u.return);break;case 7:ki(u,u.return);default:wi(l,u,a)}n=n.sibling}}function vh(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Lo(a))}function _h(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Lo(t))}function xi(t,n,a,r){var l=(a&335544064)===a;if(n.subtreeFlags&(l?10262:10256))for(n=n.child;n!==null;)Cg(t,n,a,r),n=n.sibling;else l&&gg(n)}function Cg(t,n,a,r){var l=(a&335544064)===a;l&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&yc(n);var u=n.flags;switch(n.tag){case 0:case 11:case 15:xi(t,n,a,r),u&2048&&Yo(9,n);break;case 1:xi(t,n,a,r);break;case 3:xi(t,n,a,r),l&&ph&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),u&2048&&(u=null,n.alternate!==null&&(u=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==u&&(n.refCount++,u!=null&&Lo(u)));break;case 12:if(u&2048){xi(t,n,a,r),u=n.stateNode;try{var m=n.memoizedProps,E=m.id,O=m.onPostCommit;typeof O=="function"&&O(E,n.alternate===null?"mount":"update",u.passiveEffectDuration,-0)}catch(Y){Oe(n,n.return,Y)}}else xi(t,n,a,r);break;case 31:xi(t,n,a,r);break;case 13:xi(t,n,a,r);break;case 23:break;case 22:m=n.stateNode,E=n.alternate,n.memoizedState!==null?(l&&E!==null&&E.memoizedState===null&&yc(E),m._visibility&2?xi(t,n,a,r):Zo(t,n)):(l&&E!==null&&E.memoizedState!==null&&yc(n),m._visibility&2?xi(t,n,a,r):(m._visibility|=2,Ts(t,n,a,r,(n.subtreeFlags&10256)!==0||!1))),u&2048&&vh(E,n);break;case 24:xi(t,n,a,r),u&2048&&_h(n.alternate,n);break;case 30:l&&(u=n.alternate,u!==null&&(qi(u.child,!0),qi(n.child,!0))),xi(t,n,a,r);break;default:xi(t,n,a,r)}}function Ts(t,n,a,r,l){for(l=l&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var u=t,m=n,E=a,O=r,Y=m.flags;switch(m.tag){case 0:case 11:case 15:Ts(u,m,E,O,l),Yo(8,m);break;case 23:break;case 22:var rt=m.stateNode;m.memoizedState!==null?rt._visibility&2?Ts(u,m,E,O,l):Zo(u,m):(rt._visibility|=2,Ts(u,m,E,O,l)),l&&Y&2048&&vh(m.alternate,m);break;case 24:Ts(u,m,E,O,l),l&&Y&2048&&_h(m.alternate,m);break;default:Ts(u,m,E,O,l)}n=n.sibling}}function Zo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,l=r.flags;switch(r.tag){case 22:Zo(a,r),l&2048&&vh(r.alternate,r);break;case 24:Zo(a,r),l&2048&&_h(r.alternate,r);break;default:Zo(a,r)}n=n.sibling}}var Pr=8192;function zr(t,n,a){if(t.subtreeFlags&Pr)for(t=t.child;t!==null;)Dg(t,n,a),t=t.sibling}function Dg(t,n,a){switch(t.tag){case 26:zr(t,n,a),t.flags&Pr&&(t.memoizedState!==null?mM(a,Di,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&zv(a,t)));break;case 5:zr(t,n,a),t.flags&Pr&&(t=t.stateNode,(n&335544128)===n&&zv(a,t));break;case 3:case 4:var r=Di;Di=il(t.stateNode.containerInfo),zr(t,n,a),Di=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=Pr,Pr=16777216,zr(t,n,a),Pr=r):zr(t,n,a));break;case 30:if((t.flags&Pr)!==0&&(r=t.memoizedProps.name,r!=null&&r!=="auto")){var l=t.stateNode;l.paired=null,ni===null&&(ni=new Map),ni.set(r,l)}zr(t,n,a);break;default:zr(t,n,a)}}function wg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Ko(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];En=r,Ng(r,t)}wg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ug(t),t=t.sibling}function Ug(t){switch(t.tag){case 0:case 11:case 15:Ko(t),t.flags&2048&&Wa(9,t,t.return);break;case 3:Ko(t);break;case 12:Ko(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Tc(t)):Ko(t);break;default:Ko(t)}}function Tc(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];En=r,Ng(r,t)}wg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Wa(8,n,n.return),Tc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Tc(n));break;default:Tc(n)}t=t.sibling}}function Ng(t,n){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:Wa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Lo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,En=r;else t:for(a=t;En!==null;){r=En;var l=r.sibling,u=r.return;if(Sg(r),r===a){En=null;break t}if(l!==null){l.return=u,En=l;break t}En=u}}}var uS={getCacheForType:function(t){var n=Rn(on),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Rn(on).controller.signal}},fS=typeof WeakMap=="function"?WeakMap:Map,Ue=0,ke=null,ve=null,Me=0,Le=0,ii=null,Za=!1,bs=!1,xh=!1,va=0,en=0,Ka=0,Ir=0,bc=0,ai=0,As=0,Qo=null,Wn=null,yh=!1,Ac=0,Lg=0,Rc=1/0,Cc=null,Qa=null,$e=0,Ui=null,Br=null,Zi=0,Sh=0,Mh=null,Og=null,Rs=null,Cs=null,Ds=null,Jo=0,Dc=null;function ri(){return(Ue&2)!==0&&Me!==0?Me&-Me:Rt.T!==null?Nh():K()}function Pg(){if(ai===0)if((Me&536870912)===0||de){var t=_r;_r<<=1,(_r&3932160)===0&&(_r=262144),ai=t}else ai=536870912;return t=Cn.current,t!==null&&(t.flags|=32),ai}function ws(t,n){if(n!=null){var a=t.stateNode,r=a.ref;r===null&&(r=a.ref=mv(oa(t.memoizedProps,a))),Cs===null&&(Cs=[]),Cs.push(n.bind(null,r))}}function jn(t,n,a){(t===ke&&(Le===2||Le===9)||t.cancelPendingCommit!==null)&&(Us(t,0),Ja(t,Me,ai,!1)),xr(t,a),((Ue&2)===0||t!==ke)&&(t===ke&&((Ue&2)===0&&(Ir|=a),en===4&&Ja(t,Me,ai,!1)),Ki(t))}function zg(t,n,a){if((Ue&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Na(t,n),l=r?pS(t,n):Th(t,n,!0),u=r;do{if(l===0){bs&&!r&&Ja(t,n,0,!1);break}else{if(a=t.current.alternate,u&&!hS(a)){l=Th(t,n,!1),u=!1;continue}if(l===2){if(u=n,t.errorRecoveryDisabledLanes&u)var m=0;else m=t.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){n=m;t:{var E=t;l=Qo;var O=E.current.memoizedState.isDehydrated;if(O&&(Us(E,m).flags|=256),m=Th(E,m,!1),m!==2&&m!==6){if(xh&&!O){E.errorRecoveryDisabledLanes|=u,Ir|=u,l=4;break t}u=Wn,Wn=l,u!==null&&(Wn===null?Wn=u:Wn.push.apply(Wn,u))}l=m}if(u=!1,l!==2)continue}}if(l===1){Us(t,0),Ja(t,n,0,!0);break}t:{switch(r=t,u=l,u){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:Ja(r,n,ai,!Za);break t;case 2:Wn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(l=Ac+300-G(),10<l)){if(Ja(r,n,ai,!Za),ia(r,0,!0)!==0)break t;Zi=n,r.timeoutHandle=kh(Ig.bind(null,r,a,Wn,Cc,yh,n,ai,Ir,As,Za,u,"Throttled",-0,0),l);break t}Ig(r,a,Wn,Cc,yh,n,ai,Ir,As,Za,u,null,-0,0)}}break}while(!0);Ki(t)}function Ig(t,n,a,r,l,u,m,E,O,Y,rt,pt,X,tt){t.timeoutHandle=-1;var Dt=n.subtreeFlags,Xt=(u&335544064)===u;if(pt=null,(Xt||Dt&8192||(Dt&16785408)===16785408)&&(pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Hi},ni=null,Dg(n,u,pt),Xt&&(Dt=pt,Xt=t.containerInfo,Xt=(Xt.nodeType===9?Xt:Xt.ownerDocument).__reactViewTransition,Xt!=null&&(Dt.count++,Dt.waitingForViewTransition=!0,Dt=sl.bind(Dt),Xt.finished.then(Dt,Dt))),Dt=(u&62914560)===u?Ac-G():(u&4194048)===u?Lg-G():0,Dt=gM(pt,Dt),Dt!==null)){Zi=u,t.cancelPendingCommit=Dt(qg.bind(null,t,n,u,a,r,l,m,E,O,Y,rt,pt,null,X,tt)),Ja(t,u,m,!Y);return}qg(t,n,u,a,r,l,m,E,O,Y,rt,pt)}function hS(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var l=a[r],u=l.getSnapshot;l=l.value;try{if(!ti(u(),l))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ja(t,n,a,r){n=yo(t,n),n&=~bc,n&=~Ir,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var l=n;0<l;){var u=31-On(l),m=1<<u;r[u]=-1,l&=~m}a!==0&&Rl(t,a,n)}function wc(){return(Ue&6)===0?($o(0),!1):!0}function Eh(){if(ve!==null){if(Le===0)var t=ve.return;else t=ve,fa=br=null,Uf(t),vs=null,zo=0,t=ve;for(;t!==null;)sg(t.alternate,t),t=t.return;ve=null}}function Us(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,zS(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Zi=0,Eh(),ke=t,ve=a=ca(t.current,null),Me=n,Le=0,ii=null,Za=!1,bs=Na(t,n),xh=!1,As=ai=bc=Ir=Ka=en=0,Wn=Qo=null,yh=!1,va=yo(t,n),Bl(),a}function Bg(t,n){le=null,Rt.H=cc,n===gs||n===Zl?(n=qm(),Le=3):n===_f?(n=qm(),Le=4):Le=n===Yf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ii=n,ve===null&&(en=1,uc(t,mi(n,t.current)))}function Fg(){var t=Cn.current;return t===null?!0:(Me&4194048)===Me?zn===null:(Me&62914560)===Me||(Me&536870912)!==0?t===zn:!1}function Hg(){var t=Rt.H;return Rt.H=cc,t===null?cc:t}function Gg(){var t=Rt.A;return Rt.A=uS,t}function Uc(){en=4,Za||(Me&4194048)!==Me&&Cn.current!==null||(bs=!0),(Ka&134217727)===0&&(Ir&134217727)===0||ke===null||Ja(ke,Me,ai,!1)}function Th(t,n,a){var r=Ue;Ue|=2;var l=Hg(),u=Gg();(ke!==t||Me!==n)&&(Cc=null,Us(t,n)),n=!1;var m=en;t:do try{if(Le!==0&&ve!==null){var E=ve,O=ii;switch(Le){case 8:Eh(),m=6;break t;case 3:case 2:case 9:case 6:Cn.current===null&&(n=!0);var Y=Le;if(Le=0,ii=null,Ns(t,E,O,Y),a&&bs){m=0;break t}break;default:Y=Le,Le=0,ii=null,Ns(t,E,O,Y)}}dS(),m=en;break}catch(rt){Bg(t,rt)}while(!0);return n&&t.shellSuspendCounter++,fa=br=null,Ue=r,Rt.H=l,Rt.A=u,ve===null&&(ke=null,Me=0,Bl()),m}function dS(){for(;ve!==null;)Vg(ve)}function pS(t,n){var a=Ue;Ue|=2;var r=Hg(),l=Gg();ke!==t||Me!==n?(Cc=null,Rc=G()+500,Us(t,n)):bs=Na(t,n);t:do try{if(Le!==0&&ve!==null){n=ve;var u=ii;e:switch(Le){case 1:Le=0,ii=null,Ns(t,n,u,1);break;case 2:case 9:if(km(u)){Le=0,ii=null,kg(n);break}n=function(){Le!==2&&Le!==9||ke!==t||(Le=7),Ki(t)},u.then(n,n);break t;case 3:Le=7;break t;case 4:Le=5;break t;case 7:km(u)?(Le=0,ii=null,kg(n)):(Le=0,ii=null,Ns(t,n,u,7));break;case 5:var m=null;switch(ve.tag){case 26:m=ve.memoizedState;case 5:case 27:var E=ve;if(m?Ov(m):E.stateNode.complete){Le=0,ii=null;var O=E.sibling;if(O!==null)ve=O;else{var Y=E.return;Y!==null?(ve=Y,Nc(Y)):ve=null}break e}}Le=0,ii=null,Ns(t,n,u,5);break;case 6:Le=0,ii=null,Ns(t,n,u,6);break;case 8:Eh(),en=6;break t;default:throw Error(s(462))}}mS();break}catch(rt){Bg(t,rt)}while(!0);return fa=br=null,Rt.H=r,Rt.A=l,Ue=a,ve!==null?0:(ke=null,Me=0,Bl(),en)}function mS(){for(;ve!==null&&!oe();)Vg(ve)}function Vg(t){var n=ag(t.alternate,t,va);t.memoizedProps=t.pendingProps,n===null?Nc(t):ve=n}function kg(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Q0(a,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=Q0(a,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:Uf(n);var r=n;r===Sn&&(de?(Xl(r),r.tag===5&&r.stateNode!=null&&(qe=r.stateNode)):(Xl(r),de=!0));default:sg(a,n),n=ve=Nm(n,va),n=ag(a,n,va)}t.memoizedProps=t.pendingProps,n===null?Nc(t):ve=n}function Ns(t,n,a,r){fa=br=null,Uf(n),vs=null,zo=0;var l=n.return;try{if(nS(t,l,n,a,Me)){en=1,uc(t,mi(a,t.current)),ve=null;return}}catch(u){if(l!==null)throw ve=l,u;en=1,uc(t,mi(a,t.current)),ve=null;return}n.flags&32768?(de||r===1?t=!0:bs||(Me&536870912)!==0?t=!1:(Za=t=!0,(r===2||r===9||r===3||r===6)&&(r=Cn.current,r!==null&&r.tag===13&&(r.flags|=16384))),Xg(n,t)):Nc(n)}function Nc(t){var n=t;do{if((n.flags&32768)!==0){Xg(n,Za);return}t=n.return;var a=sS(n.alternate,n,va);if(a!==null){ve=a;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=t}while(n!==null);en===0&&(en=5)}function Xg(t,n){do{var a=oS(t.alternate,t);if(a!==null){a.flags&=32767,ve=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){ve=t;return}ve=t=a}while(t!==null);en=6,ve=null}function qg(t,n,a,r,l,u,m,E,O,Y,rt,pt){t.cancelPendingCommit=null;do Lc();while($e!==0);if((Ue&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));t===ke&&(ve=ke=null,Me=0),Br=n,Ui=t,Zi=a,Mh=l,Og=r,gS(t,n,a,m,E,O,pt)}}function gS(t,n,a,r,l,u,m){var E=n.lanes|n.childLanes;if(Sh=E,E|=rf,Pu(t,a,E,r,l,u),Cs=null,(a&335544064)===a?(Ds=Xy(t),r=10262):(Ds=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(t.callbackNode=null,t.callbackPriority=0,MS(Pt,function(){return Ch(),null})):(t.callbackNode=null,t.callbackPriority=0),_c=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=Rt.T,Rt.T=null,l=Bt.p,Bt.p=2,u=Ue,Ue|=4;try{lS(t,n,a)}finally{Ue=u,Bt.p=l,Rt.T=r}}$e=1,_c?Rs=VS(m,t.containerInfo,Ds,bh,Ah,_S,Rh,Ch,vS):(bh(),Ah(),Rh())}function vS(t){if($e!==0){var n=Ui.onRecoverableError;n(t,{componentStack:null})}}function _S(){$e===3&&($e=0,Rg(Br,Ui),$e=4)}function bh(){if($e===1){$e=0;var t=Ui,n=Br,a=Zi,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=Rt.T,Rt.T=null;var l=Bt.p;Bt.p=2;var u=Ue;Ue|=4;try{jo=Sc=!1,bg(n,t,a),a=Hh;var m=Mm(t.containerInfo),E=a.focusedElem,O=a.selectionRange;if(m!==E&&E&&E.ownerDocument&&Sm(E.ownerDocument.documentElement,E)){if(O!==null&&$u(E)){var Y=O.start,rt=O.end;if(rt===void 0&&(rt=Y),"selectionStart"in E)E.selectionStart=Y,E.selectionEnd=Math.min(rt,E.value.length);else{var pt=E.ownerDocument||document,X=pt&&pt.defaultView||window;if(X.getSelection){var tt=X.getSelection(),Dt=E.textContent.length,Xt=Math.min(O.start,Dt),ce=O.end===void 0?Xt:Math.min(O.end,Dt);!tt.extend&&Xt>ce&&(m=ce,ce=Xt,Xt=m);var q=ym(E,Xt),F=ym(E,ce);if(q&&F&&(tt.rangeCount!==1||tt.anchorNode!==q.node||tt.anchorOffset!==q.offset||tt.focusNode!==F.node||tt.focusOffset!==F.offset)){var $=pt.createRange();$.setStart(q.node,q.offset),tt.removeAllRanges(),Xt>ce?(tt.addRange($),tt.extend(F.node,F.offset)):($.setEnd(F.node,F.offset),tt.addRange($))}}}}for(pt=[],tt=E;tt=tt.parentNode;)tt.nodeType===1&&pt.push({element:tt,left:tt.scrollLeft,top:tt.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<pt.length;E++){var dt=pt[E];dt.element.scrollLeft=dt.left,dt.element.scrollTop=dt.top}}Hs=!!Fh,Hh=Fh=null}finally{Ue=u,Bt.p=l,Rt.T=r}}t.current=n,$e=2}}function Ah(){if($e===2){$e=0;var t=Ui,n=Br,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=Rt.T,Rt.T=null;var r=Bt.p;Bt.p=2;var l=Ue;Ue|=4;try{xg(t,n.alternate,n)}finally{Ue=l,Bt.p=r,Rt.T=a}}$e=3}}function Rh(){if($e===4||$e===3){$e=0;var t=Rs;Rs=null,ze();var n=Ui,a=Br,r=Zi,l=Og,u=(r&335544064)===r?10262:10256;if((a.subtreeFlags&u)!==0||(a.flags&u)!==0?$e=5:($e=0,Br=Ui=null,Yg(n,n.pendingLanes)),u=n.pendingLanes,u===0&&(Qa=null),ct(r),a=a.stateNode,je&&typeof je.onCommitFiberRoot=="function")try{je.onCommitFiberRoot(be,a,void 0,(a.current.flags&128)===128)}catch{}if(l!==null){a=Rt.T,u=Bt.p,Bt.p=2,Rt.T=null;try{for(var m=n.onRecoverableError,E=0;E<l.length;E++){var O=l[E];m(O.value,{componentStack:O.stack})}}finally{Rt.T=a,Bt.p=u}}if(l=Cs,m=Ds,Ds=null,l!==null&&(Cs=null,m===null&&(m=[]),t!==null))for(O=0;O<l.length;O++)a=(0,l[O])(m),a!==void 0&&t.finished.finally(a);(Zi&3)!==0&&Lc(),Ki(n),u=n.pendingLanes,(r&261930)!==0&&(u&42)!==0?n===Dc?Jo++:(Jo=0,Dc=n):(Jo=0,Dc=null),$o(0)}}function Yg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Lo(n)))}function Lc(){return Rs!==null&&(Rs.skipTransition(),Rs=null),bh(),Ah(),Rh(),Ch()}function Ch(){if($e!==5)return!1;var t=Ui,n=Sh;Sh=0;var a=ct(Zi),r=Rt.T,l=Bt.p;try{Bt.p=32>a?32:a,Rt.T=null,a=Mh,Mh=null;var u=Ui,m=Zi;if($e=0,Br=Ui=null,Zi=0,(Ue&6)!==0)throw Error(s(331));var E=Ue;if(Ue|=4,Ug(u.current),Cg(u,u.current,m,a),Ue=E,$o(0,!1),je&&typeof je.onPostCommitFiberRoot=="function")try{je.onPostCommitFiberRoot(be,u)}catch{}return!0}finally{Bt.p=l,Rt.T=r,Yg(t,n)}}function Wg(t,n,a){n=mi(a,n),n=qf(t.stateNode,n,2),t=ka(t,n,2),t!==null&&(xr(t,2),Ki(t))}function Oe(t,n,a){if(t.tag===3)Wg(t,t,a);else for(;n!==null;){if(n.tag===3){Wg(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Qa===null||!Qa.has(r))){t=mi(a,t),a=k0(2),r=ka(n,a,2),r!==null&&(X0(a,r,n,t),xr(r,2),Ki(r));break}}n=n.return}}function Dh(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new fS;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(a)||(xh=!0,l.add(a),t=xS.bind(null,t,n,a),n.then(t,t))}function xS(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,ke===t&&(Me&a)===a&&((en===4||en===3&&(Me&62914560)===Me&&300>G()-Ac)&&(Ue&2)===0?Us(t,0):bc|=a,As===Me&&(As=0)),Ki(t)}function jg(t,n){n===0&&(n=Al()),t=Mr(t,n),t!==null&&(xr(t,n),Ki(t))}function yS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),jg(t,a)}function SS(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,l=t.memoizedState;l!==null&&(a=l.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),jg(t,a)}function MS(t,n){return Ht(t,n)}var Ls=null,Os=null,wh=!1,Oc=!1,Uh=!1,$a=0;function Ki(t){t!==Os&&t.next===null&&(Os===null?Ls=Os=t:Os=Os.next=t),Oc=!0,wh||(wh=!0,TS())}function $o(t,n){if(!Uh&&Oc){Uh=!0;do for(var a=!1,r=Ls;r!==null;){if(t!==0){var l=r.pendingLanes;if(l===0)var u=0;else{var m=r.suspendedLanes,E=r.pingedLanes;u=(1<<31-On(42|t)+1)-1,u&=l&~(m&~E),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,Jg(r,u))}else u=Me,u=ia(r,r===ke?u:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(u&3)===0||Na(r,u)||(a=!0,Jg(r,u));r=r.next}while(a);Uh=!1}}function ES(){Zg()}function Zg(){Oc=wh=!1;var t=0;$a!==0&&PS()&&(t=$a);for(var n=G(),a=null,r=Ls;r!==null;){var l=r.next,u=Kg(r,n);u===0?(r.next=null,a===null?Ls=l:a.next=l,l===null&&(Os=a)):(a=r,(t!==0||(u&3)!==0)&&(Oc=!0)),r=l}$e!==0&&$e!==5||$o(t),$a!==0&&($a=0)}function Kg(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,l=t.expirationTimes,u=t.pendingLanes&-62914561;0<u;){var m=31-On(u),E=1<<m,O=l[m];O===-1?((E&a)===0||(E&r)!==0)&&(l[m]=Ou(E,n)):O<=n&&(t.expiredLanes|=E),u&=~E}if(n=ke,a=Me,a=ia(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(Le===2||Le===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&pe(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Na(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&pe(r),ct(a)){case 2:case 8:a=_t;break;case 32:a=Pt;break;case 268435456:a=se;break;default:a=Pt}return r=Qg.bind(null,t),a=Ht(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&pe(r),t.callbackPriority=2,t.callbackNode=null,2}function Qg(t,n){if($e!==0&&$e!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Lc()&&t.callbackNode!==a)return null;var r=Me;return r=ia(t,t===ke?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(zg(t,r,n),Kg(t,G()),t.callbackNode!=null&&t.callbackNode===a?Qg.bind(null,t):null)}function Jg(t,n){if(Lc())return null;zg(t,n,!0)}function TS(){IS(function(){(Ue&6)!==0?Ht(ft,ES):Zg()})}function Nh(){if($a===0){var t=Cr;t===0&&(t=vr,vr<<=1,(vr&261888)===0&&(vr=256)),$a=t}return $a}function $g(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:wl(t)}function bS(t,n,a,r,l){if(n==="submit"&&a&&a.stateNode===l){var u=$g((l[Ut]||null).action),m=r.submitter;m&&(n=(n=m[Ut]||null)?$g(n.formAction):m.getAttribute("formAction"),n!==null&&(u=n,m=null));var E=new Ol("action","action",null,r,l);t.push({event:E,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if($a!==0){var O=new FormData(l,m);Hf(a,{pending:!0,data:O,method:l.method,action:u},null,O)}}else typeof u=="function"&&(E.preventDefault(),O=new FormData(l,m),Hf(a,{pending:!0,data:O,method:l.method,action:u},u,O))},currentTarget:l}]})}}for(var Lh=0;Lh<af.length;Lh++){var Oh=af[Lh],AS=Oh.toLowerCase(),RS=Oh[0].toUpperCase()+Oh.slice(1);Ri(AS,"on"+RS)}Ri(bm,"onAnimationEnd"),Ri(Am,"onAnimationIteration"),Ri(Rm,"onAnimationStart"),Ri("dblclick","onDoubleClick"),Ri("focusin","onFocus"),Ri("focusout","onBlur"),Ri(zy,"onTransitionRun"),Ri(Iy,"onTransitionStart"),Ri(By,"onTransitionCancel"),Ri(Cm,"onTransitionEnd"),dn("onMouseEnter",["mouseout","mouseover"]),dn("onMouseLeave",["mouseout","mouseover"]),dn("onPointerEnter",["pointerout","pointerover"]),dn("onPointerLeave",["pointerout","pointerover"]),sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),sn("onBeforeInput",["compositionend","keypress","textInput","paste"]),sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),CS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(tl));function tv(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],l=r.event;r=r.listeners;t:{var u=void 0;if(n)for(var m=r.length-1;0<=m;m--){var E=r[m],O=E.instance,Y=E.currentTarget;if(E=E.listener,O!==u&&l.isPropagationStopped())break t;u=E,l.currentTarget=Y;try{u(l)}catch(rt){Il(rt)}l.currentTarget=null,u=O}else for(m=0;m<r.length;m++){if(E=r[m],O=E.instance,Y=E.currentTarget,E=E.listener,O!==u&&l.isPropagationStopped())break t;u=E,l.currentTarget=Y;try{u(l)}catch(rt){Il(rt)}l.currentTarget=null,u=O}}}}function _e(t,n){var a=n[ne];a===void 0&&(a=n[ne]=new Set);var r=t+"__bubble";a.has(r)||(ev(n,t,2,!1),a.add(r))}function Ph(t,n,a){var r=0;n&&(r|=4),ev(a,t,r,n)}var Pc="_reactListening"+Math.random().toString(36).slice(2);function zh(t){if(!t[Pc]){t[Pc]=!0,La.forEach(function(a){a!=="selectionchange"&&(CS.has(a)||Ph(a,!1,t),Ph(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Pc]||(n[Pc]=!0,Ph("selectionchange",!1,n))}}function ev(t,n,a,r){switch(Xv(n)){case 2:var l=yM;break;case 8:l=SM;break;default:l=nd}a=l.bind(null,n,a,t),l=void 0,!ku||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?t.addEventListener(n,a,{capture:!0,passive:l}):t.addEventListener(n,a,!0):l!==void 0?t.addEventListener(n,a,{passive:l}):t.addEventListener(n,a,!1)}function Ih(t,n,a,r,l){var u=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var m=r.tag;if(m===3||m===4){var E=r.stateNode.containerInfo;if(E===l)break;if(m===4)for(m=r.return;m!==null;){var O=m.tag;if((O===3||O===4)&&m.stateNode.containerInfo===l)return;m=m.return}for(;E!==null;){if(m=Wt(E),m===null)return;if(O=m.tag,O===5||O===6||O===26||O===27){r=u=m;continue t}E=E.parentNode}}r=r.return}em(function(){var Y=u,rt=Gu(a),pt=[];t:{var X=Dm.get(t);if(X!==void 0){var tt=Ol,Dt=t;switch(t){case"keypress":if(Nl(a)===0)break t;case"keydown":case"keyup":tt=hy;break;case"focusin":Dt="focus",tt=Wu;break;case"focusout":Dt="blur",tt=Wu;break;case"beforeblur":case"afterblur":tt=Wu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":tt=am;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":tt=ty;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":tt=vy;break;case bm:case Am:case Rm:tt=iy;break;case Cm:tt=xy;break;case"scroll":case"scrollend":tt=Jx;break;case"wheel":tt=Sy;break;case"copy":case"cut":case"paste":tt=ry;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":tt=sm;break;case"submit":tt=my;break;case"toggle":case"beforetoggle":tt=Ey}var Xt=(n&4)!==0,ce=!Xt&&(t==="scroll"||t==="scrollend"),q=Xt?X!==null?X+"Capture":null:X;Xt=[];for(var F=Y,$;F!==null;){var dt=F;if($=dt.stateNode,dt=dt.tag,dt!==5&&dt!==26&&dt!==27||$===null||q===null||(dt=Mo(F,q),dt!=null&&Xt.push(el(F,dt,$))),ce)break;F=F.return}0<Xt.length&&(X=new tt(X,Dt,null,a,rt),pt.push({event:X,listeners:Xt}))}}if((n&7)===0){t:{if(tt=t==="mouseover"||t==="pointerover",X=t==="mouseout"||t==="pointerout",tt&&a!==Hu&&(Dt=a.relatedTarget||a.fromElement)&&(Wt(Dt)||Dt[Qt]))break t;(X||tt)&&(Dt=rt.window===rt?rt:(tt=rt.ownerDocument)?tt.defaultView||tt.parentWindow:window,X?(tt=a.relatedTarget||a.toElement,X=Y,tt=tt?Wt(tt):null,tt!==null&&(ce=f(tt),Xt=tt.tag,tt!==ce||Xt!==5&&Xt!==27&&Xt!==6)&&(tt=null)):(X=null,tt=Y),X!==tt&&(Xt=am,dt="onMouseLeave",q="onMouseEnter",F="mouse",(t==="pointerout"||t==="pointerover")&&(Xt=sm,dt="onPointerLeave",q="onPointerEnter",F="pointer"),ce=X==null?Dt:Se(X),$=tt==null?Dt:Se(tt),Dt=new Xt(dt,F+"leave",X,a,rt),Dt.target=ce,Dt.relatedTarget=$,dt=null,Wt(rt)===Y&&(Xt=new Xt(q,F+"enter",tt,a,rt),Xt.target=$,Xt.relatedTarget=ce,dt=Xt),ce=dt,Xt=X&&tt?V(X,tt,DS):null,X!==null&&nv(pt,Dt,X,Xt,!1),tt!==null&&ce!==null&&nv(pt,ce,tt,Xt,!0)))}t:{if(X=Y?Se(Y):window,tt=X.nodeName&&X.nodeName.toLowerCase(),tt==="select"||tt==="input"&&X.type==="file")var Ft=pm;else if(hm(X))if(mm)Ft=Ly;else{Ft=Uy;var Ee=wy}else tt=X.nodeName,!tt||tt.toLowerCase()!=="input"||X.type!=="checkbox"&&X.type!=="radio"?Y&&Fu(Y.elementType)&&(Ft=pm):Ft=Ny;if(Ft&&(Ft=Ft(t,Y))){dm(pt,Ft,a,rt);break t}Ee&&Ee(t,X,Y)}switch(Ee=Y?Se(Y):window,t){case"focusin":(hm(Ee)||Ee.contentEditable==="true")&&(ls=Ee,tf=Y,wo=null);break;case"focusout":wo=tf=ls=null;break;case"mousedown":ef=!0;break;case"contextmenu":case"mouseup":case"dragend":ef=!1,Em(pt,a,rt);break;case"selectionchange":if(Py)break;case"keydown":case"keyup":Em(pt,a,rt)}var jt;if(Zu)t:{switch(t){case"compositionstart":var $t="onCompositionStart";break t;case"compositionend":$t="onCompositionEnd";break t;case"compositionupdate":$t="onCompositionUpdate";break t}$t=void 0}else os?um(t,a)&&($t="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&($t="onCompositionStart");$t&&(om&&a.locale!=="ko"&&(os||$t!=="onCompositionStart"?$t==="onCompositionEnd"&&os&&(jt=nm()):(Oa=rt,Xu="value"in Oa?Oa.value:Oa.textContent,os=!0)),Ee=zc(Y,$t),0<Ee.length&&($t=new rm($t,t,null,a,rt),pt.push({event:$t,listeners:Ee}),jt?$t.data=jt:(jt=fm(a),jt!==null&&($t.data=jt)))),(jt=by?Ay(t,a):Ry(t,a))&&($t=zc(Y,"onBeforeInput"),0<$t.length&&(Ee=new rm("onBeforeInput","beforeinput",null,a,rt),pt.push({event:Ee,listeners:$t}),Ee.data=jt)),bS(pt,t,Y,a,rt)}tv(pt,n)})}function el(t,n,a){return{instance:t,listener:n,currentTarget:a}}function zc(t,n){for(var a=n+"Capture",r=[];t!==null;){var l=t,u=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||u===null||(l=Mo(t,a),l!=null&&r.unshift(el(t,l,u)),l=Mo(t,n),l!=null&&r.push(el(t,l,u))),t.tag===3)return r;t=t.return}return[]}function DS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function nv(t,n,a,r,l){for(var u=n._reactName,m=[];a!==null&&a!==r;){var E=a,O=E.alternate,Y=E.stateNode;if(E=E.tag,O!==null&&O===r)break;E!==5&&E!==26&&E!==27||Y===null||(O=Y,l?(Y=Mo(a,u),Y!=null&&m.unshift(el(a,Y,O))):l||(Y=Mo(a,u),Y!=null&&m.push(el(a,Y,O)))),a=a.return}m.length!==0&&t.push({event:n,listeners:m})}var wS=/\r\n?/g,US=/\u0000|\uFFFD/g;function iv(t){return(typeof t=="string"?t:""+t).replace(wS,`
`).replace(US,"")}function av(t,n){return n=iv(n),iv(t)===n}function Pe(t,n,a,r,l,u){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||as(t,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&as(t,""+r);else return;break;case"className":Dl(t,"class",r);break;case"tabIndex":Dl(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Dl(t,a,r);break;case"style":$p(t,r,u);return;case"data":if(n!=="object"){Dl(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=wl(r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(n!=="input"&&Pe(t,n,"name",l.name,l,null),Pe(t,n,"formEncType",l.formEncType,l,null),Pe(t,n,"formMethod",l.formMethod,l,null),Pe(t,n,"formTarget",l.formTarget,l,null)):(Pe(t,n,"encType",l.encType,l,null),Pe(t,n,"method",l.method,l,null),Pe(t,n,"target",l.target,l,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=wl(r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=Hi);return;case"onScroll":r!=null&&_e("scroll",t);return;case"onScrollEnd":r!=null&&_e("scrollend",t);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(l.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=wl(r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":_e("beforetoggle",t),_e("toggle",t),Cl(t,"popover",r);break;case"xlinkActuate":ra(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":ra(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":ra(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":ra(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":ra(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":ra(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":ra(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":ra(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":ra(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Cl(t,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=Kx.get(a)||a,Cl(t,a,r);else return}De=!0}function Bh(t,n,a,r,l,u){switch(a){case"style":$p(t,r,u);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(l.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof r=="string")as(t,r);else if(typeof r=="number"||typeof r=="bigint")as(t,""+r);else return;break;case"onScroll":r!=null&&_e("scroll",t);return;case"onScrollEnd":r!=null&&_e("scrollend",t);return;case"onClick":r!=null&&(t.onclick=Hi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Ve.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),u=a.slice(2,l?a.length-7:void 0),n=t[Ut]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(u,n,l),typeof r=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(u,r,l);break t}De=!0,a in t?t[a]=r:r===!0?t.setAttribute(a,""):Cl(t,a,r)}return}De=!0}function Un(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",t),_e("load",t);var r=!1,l=!1,u;for(u in a)if(a.hasOwnProperty(u)){var m=a[u];if(m!=null)switch(u){case"src":r=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Pe(t,n,u,m,a,null)}}l&&Pe(t,n,"srcSet",a.srcSet,a,null),r&&Pe(t,n,"src",a.src,a,null);return;case"input":_e("invalid",t);var E=u=m=l=null,O=null,Y=null;for(r in a)if(a.hasOwnProperty(r)){var rt=a[r];if(rt!=null)switch(r){case"name":l=rt;break;case"type":m=rt;break;case"checked":O=rt;break;case"defaultChecked":Y=rt;break;case"value":u=rt;break;case"defaultValue":E=rt;break;case"children":case"dangerouslySetInnerHTML":if(rt!=null)throw Error(s(137,n));break;default:Pe(t,n,r,rt,a,null)}}Zp(t,u,E,O,Y,m,l,!1);return;case"select":_e("invalid",t),r=m=u=null;for(l in a)if(a.hasOwnProperty(l)&&(E=a[l],E!=null))switch(l){case"value":u=E;break;case"defaultValue":m=E;break;case"multiple":r=E;default:Pe(t,n,l,E,a,null)}n=u,a=m,t.multiple=!!r,n!=null?is(t,!!r,n,!1):a!=null&&is(t,!!r,a,!0);return;case"textarea":_e("invalid",t),u=l=r=null;for(m in a)if(a.hasOwnProperty(m)&&(E=a[m],E!=null))switch(m){case"value":r=E;break;case"defaultValue":l=E;break;case"children":u=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(s(91));break;default:Pe(t,n,m,E,a,null)}Qp(t,r,l,u);return;case"option":for(O in a)if(a.hasOwnProperty(O)&&(r=a[O],r!=null))switch(O){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Pe(t,n,O,r,a,null)}return;case"dialog":_e("beforetoggle",t),_e("toggle",t),_e("cancel",t),_e("close",t);break;case"iframe":case"object":_e("load",t);break;case"video":case"audio":for(r=0;r<tl.length;r++)_e(tl[r],t);break;case"image":_e("error",t),_e("load",t);break;case"details":_e("toggle",t);break;case"embed":case"source":case"link":_e("error",t),_e("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Y in a)if(a.hasOwnProperty(Y)&&(r=a[Y],r!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Pe(t,n,Y,r,a,null)}return;default:if(Fu(n)){for(rt in a)a.hasOwnProperty(rt)&&(r=a[rt],r!==void 0&&Bh(t,n,rt,r,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(r=a[E],r!=null&&Pe(t,n,E,r,a,null))}var NS={};function LS(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,u=null,m=null,E=null,O=null,Y=null,rt=null;for(tt in a){var pt=a[tt];if(a.hasOwnProperty(tt)&&pt!=null)switch(tt){case"checked":break;case"value":break;case"defaultValue":O=pt;default:r.hasOwnProperty(tt)||Pe(t,n,tt,null,r,pt)}}for(var X in r){var tt=r[X];if(pt=a[X],r.hasOwnProperty(X)&&(tt!=null||pt!=null))switch(X){case"type":tt!==pt&&(De=!0),u=tt;break;case"name":tt!==pt&&(De=!0),l=tt;break;case"checked":tt!==pt&&(De=!0),Y=tt;break;case"defaultChecked":tt!==pt&&(De=!0),rt=tt;break;case"value":tt!==pt&&(De=!0),m=tt;break;case"defaultValue":tt!==pt&&(De=!0),E=tt;break;case"children":case"dangerouslySetInnerHTML":if(tt!=null)throw Error(s(137,n));break;default:tt!==pt&&Pe(t,n,X,tt,r,pt)}}Iu(t,m,E,O,Y,rt,u,l);return;case"select":tt=m=E=X=null;for(u in a)if(O=a[u],a.hasOwnProperty(u)&&O!=null)switch(u){case"value":break;case"multiple":tt=O;default:r.hasOwnProperty(u)||Pe(t,n,u,null,r,O)}for(l in r)if(u=r[l],O=a[l],r.hasOwnProperty(l)&&(u!=null||O!=null))switch(l){case"value":u!==O&&(De=!0),X=u;break;case"defaultValue":u!==O&&(De=!0),E=u;break;case"multiple":u!==O&&(De=!0),m=u;default:u!==O&&Pe(t,n,l,u,r,O)}n=E,a=m,r=tt,X!=null?is(t,!!a,X,!1):!!r!=!!a&&(n!=null?is(t,!!a,n,!0):is(t,!!a,a?[]:"",!1));return;case"textarea":tt=X=null;for(E in a)if(l=a[E],a.hasOwnProperty(E)&&l!=null&&!r.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Pe(t,n,E,null,r,l)}for(m in r)if(l=r[m],u=a[m],r.hasOwnProperty(m)&&(l!=null||u!=null))switch(m){case"value":l!==u&&(De=!0),X=l;break;case"defaultValue":l!==u&&(De=!0),tt=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(s(91));break;default:l!==u&&Pe(t,n,m,l,r,u)}Kp(t,X,tt);return;case"option":for(var Dt in a)if(X=a[Dt],a.hasOwnProperty(Dt)&&X!=null&&!r.hasOwnProperty(Dt))switch(Dt){case"selected":t.selected=!1;break;default:Pe(t,n,Dt,null,r,X)}for(O in r)if(X=r[O],tt=a[O],r.hasOwnProperty(O)&&X!==tt&&(X!=null||tt!=null))switch(O){case"selected":X!==tt&&(De=!0),t.selected=X&&typeof X!="function"&&typeof X!="symbol";break;default:Pe(t,n,O,X,r,tt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Xt in a)X=a[Xt],a.hasOwnProperty(Xt)&&X!=null&&!r.hasOwnProperty(Xt)&&Pe(t,n,Xt,null,r,X);for(Y in r)if(X=r[Y],tt=a[Y],r.hasOwnProperty(Y)&&X!==tt&&(X!=null||tt!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(s(137,n));break;default:Pe(t,n,Y,X,r,tt)}return;default:if(Fu(n)){for(var ce in a)X=a[ce],a.hasOwnProperty(ce)&&X!==void 0&&!r.hasOwnProperty(ce)&&Bh(t,n,ce,void 0,r,X);for(rt in r)X=r[rt],tt=a[rt],!r.hasOwnProperty(rt)||X===tt||X===void 0&&tt===void 0||Bh(t,n,rt,X,r,tt);return}}for(var q in a)X=a[q],a.hasOwnProperty(q)&&X!=null&&!r.hasOwnProperty(q)&&Pe(t,n,q,null,r,X);for(pt in r)X=r[pt],tt=a[pt],!r.hasOwnProperty(pt)||X===tt||X==null&&tt==null||Pe(t,n,pt,X,r,tt)}function rv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function OS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var l=a[r],u=l.transferSize,m=l.initiatorType,E=l.duration;if(u&&E&&rv(m)){for(m=0,E=l.responseEnd,r+=1;r<a.length;r++){var O=a[r],Y=O.startTime;if(Y>E)break;var rt=O.transferSize,pt=O.initiatorType;rt&&rv(pt)&&(O=O.responseEnd,m+=rt*(O<E?1:(E-Y)/(O-Y)))}if(--r,n+=8*(u+m)/(l.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Fh=null,Hh=null;function nl(t){return t.nodeType===9?t:t.ownerDocument}function sv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ov(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function lv(t,n,a,r){return a=nl(a).createElement(t),a[Tt]=r,a[Ut]=n,Un(a,t,n),Ze(a),a}function Gh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Vh=null;function PS(){var t=window.event;return t&&t.type==="popstate"?t===Vh?!1:(Vh=t,!0):(Vh=null,!1)}var kh=typeof setTimeout=="function"?setTimeout:void 0,zS=typeof clearTimeout=="function"?clearTimeout:void 0,cv=typeof Promise=="function"?Promise:void 0,uv=typeof requestAnimationFrame=="function"?requestAnimationFrame:kh,IS=typeof queueMicrotask=="function"?queueMicrotask:typeof cv<"u"?function(t){return cv.resolve(null).then(t).catch(BS)}:kh;function BS(t){setTimeout(function(){throw t})}function tr(t){return t==="head"}function fv(t,n){var a=n,r=0;do{var l=a.nextSibling;if(t.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(l),Gs(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")Qh(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Qh(a);for(var u=a.firstChild;u;){var m=u.nextSibling,E=u.nodeName;u[Xe]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=m}}else a==="body"&&Qh(t.ownerDocument.body);a=l}while(a);Gs(n)}function hv(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function dv(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var r=1;else for(var l=r=0;l<n.length;l++){var u=n[l];0<u.width&&0<u.height&&r++}r===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function pv(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function FS(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function Xh(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return FS(n,a,t)}function HS(t){return t.documentElement.clientHeight}function GS(t){this.addEventListener("load",t),this.addEventListener("error",t)}function VS(t,n,a,r,l,u,m,E,O){var Y=n.nodeType===9?n:n.ownerDocument;try{var rt=Y.startViewTransition({update:function(){var X=Y.defaultView,tt=X.navigation&&X.navigation.transition,Dt=Y.fonts.status;r();var Xt=[];if(Dt==="loaded"&&(HS(Y),Y.fonts.status==="loading"&&Xt.push(Y.fonts.ready)),Dt=Xt.length,t!==null)for(var ce=t.suspenseyImages,q=0,F=0;F<ce.length;F++){var $=ce[F];if(!$.complete){var dt=$.getBoundingClientRect();if(0<dt.bottom&&0<dt.right&&dt.top<X.innerHeight&&dt.left<X.innerWidth){if(q+=Pv($),q>Fc){Xt.length=Dt;break}$=new Promise(GS.bind($)),Xt.push($)}}}if(0<Xt.length)return X=Promise.race([Promise.all(Xt),new Promise(function(Ft){return setTimeout(Ft,500)})]).then(l,l),(tt?Promise.allSettled([tt.finished,X]):X).then(u,u);if(l(),tt)return tt.finished.then(u,u);u()},types:a});Y.__reactViewTransition=rt;var pt=[];return rt.ready.then(function(){for(var X=Y.documentElement.getAnimations({subtree:!0}),tt=0;tt<X.length;tt++){var Dt=X[tt],Xt=Dt.effect,ce=Xt.pseudoElement;if(ce!=null&&ce.startsWith("::view-transition")){pt.push(Dt),Dt=Xt.getKeyframes();for(var q=ce=void 0,F=!0,$=0;$<Dt.length;$++){var dt=Dt[$],Ft=dt.width;if(ce===void 0)ce=Ft;else if(ce!==Ft){F=!1;break}if(Ft=dt.height,q===void 0)q=Ft;else if(q!==Ft){F=!1;break}delete dt.width,delete dt.height,dt.transform==="none"&&delete dt.transform}F&&ce!==void 0&&q!==void 0&&(Xt.setKeyframes(Dt),F=getComputedStyle(Xt.target,Xt.pseudoElement),F.width!==ce||F.height!==q)&&(F=Dt[0],F.width=ce,F.height=q,F=Dt[Dt.length-1],F.width=ce,F.height=q,Xt.setKeyframes(Dt))}}m()},function(X){Y.__reactViewTransition===rt&&(Y.__reactViewTransition=null);try{if(typeof X=="object"&&X!==null)switch(X.name){case"InvalidStateError":(X.message==="View transition was skipped because document visibility state is hidden."||X.message==="Skipping view transition because document visibility state has become hidden."||X.message==="Skipping view transition because viewport size changed."||X.message==="Transition was aborted because of invalid state")&&(X=null)}X!==null&&O(X)}finally{r(),l(),m()}}),rt.finished.finally(function(){for(var X=0;X<pt.length;X++)pt[X].cancel();Y.__reactViewTransition===rt&&(Y.__reactViewTransition=null),E()}),rt}catch{return r(),l(),m(),null}}function Fr(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Fr.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:P({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Fr.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),r=[],l=0;l<a.length;l++){var u=a[l].effect;u!==null&&u.target===t&&u.pseudoElement===n&&r.push(a[l])}return r},Fr.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function mv(t){return{name:t,group:new Fr("group",t),imagePair:new Fr("image-pair",t),old:new Fr("old",t),new:new Fr("new",t)}}function si(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}si.prototype.addEventListener=function(t,n,a){var r=null,l=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var u=this._eventListeners;if(vv(u,t,n,a)===-1){var m=this,E=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(E=function(O){m.removeEventListener(t,n,a),typeof n=="function"?n.call(this,O):n.handleEvent(O)}),r!==null&&(l=m.removeEventListener.bind(m,t,n,a),r.addEventListener("abort",l,{once:!0}),l=r.removeEventListener.bind(r,"abort",l)),r=Ps(a),u.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:E,cleanup:l}),v(this._fragmentFiber.child,!1,kS,t,E,r)}this._eventListeners=u}};function kS(t,n,a,r){return S(t).addEventListener(n,a,r),!1}si.prototype.removeEventListener=function(t,n,a){var r=this._eventListeners;if(r!==null&&(n=vv(r,t,n,a),n!==-1)){var l=r[n];a=l.attachedListener;var u=l.cleanup;l=Ps(l.optionsOrUseCapture),v(this._fragmentFiber.child,!1,XS,t,a,l),r.splice(n,1),u!==null&&u()}};function XS(t,n,a,r){return S(t).removeEventListener(n,a,r),!1}function Ps(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function gv(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function vv(t,n,a,r){if(t.length===0)return-1;r=gv(r);for(var l=0;l<t.length;l++){var u=t[l];if(u.type===n&&u.listener===a&&gv(u.optionsOrUseCapture)===r)return l}return-1}si.prototype.dispatchEvent=function(t){var n=x(this._fragmentFiber);if(n===null)return!0;n=S(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var l=0;l<a.length;l++){var u=a[l];r.addEventListener(u.type,u.attachedListener,Ps(u.optionsOrUseCapture))}if(n.appendChild(r),t=r.dispatchEvent(t),a)for(l=0;l<a.length;l++)u=a[l],r.removeEventListener(u.type,u.attachedListener,Ps(u.optionsOrUseCapture));return n.removeChild(r),t}return n.dispatchEvent(t)},si.prototype.focus=function(t){v(this._fragmentFiber.child,!0,_v,t,void 0,void 0)};function _v(t,n){return t.tag===6?!1:(t=S(t),nM(t,n))}si.prototype.focusLast=function(t){var n=[];v(this._fragmentFiber.child,!0,qh,n,void 0,void 0);for(var a=n.length-1;0<=a&&!_v(n[a],t);a--);};function qh(t,n){return n.push(t),!1}si.prototype.blur=function(){var t=x(this._fragmentFiber);t!==null&&(t=S(t),t=nl(t).activeElement,t!==null&&v(this._fragmentFiber.child,!1,qS,t,void 0,void 0))};function qS(t,n){return t.tag===6?!1:(t=S(t),t===n||t.contains(n)?(n.blur(),!0):!1)}si.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),v(this._fragmentFiber.child,!1,YS,t,void 0,void 0)};function YS(t,n){return t.tag===6||(t=S(t),n.observe(t)),!1}si.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),v(this._fragmentFiber.child,!1,WS,t,void 0,void 0);for(var a=n=0;a<Ni.length;a++){var r=Ni[a];r.fragmentInstance===this&&r.observer===t?t.unobserve(r.instance):Ni[n++]=r}Ni.length=n}};function WS(t,n){return t.tag===6||(t=S(t),n.unobserve(t)),!1}var Ni=[],Yh=!1;function jS(t,n,a){Ni.push({fragmentInstance:t,observer:n,instance:a}),Yh||(Yh=!0,iM(function(){Yh=!1;var r=Ni;Ni=[];for(var l=0;l<r.length;l++){var u=r[l];u.observer.unobserve(u.instance)}}))}si.prototype.getClientRects=function(){var t=[];return v(this._fragmentFiber.child,!1,ZS,t,void 0,void 0),t};function ZS(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=S(t),n.push.apply(n,t.getClientRects());return!1}si.prototype.getRootNode=function(t){var n=x(this._fragmentFiber);return n===null?this:S(n).getRootNode(t)},si.prototype.compareDocumentPosition=function(t){var n=x(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];v(this._fragmentFiber.child,!1,qh,a,void 0,void 0);var r=S(n);if(a.length===0){if(a=r,M(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var l=r=a.compareDocumentPosition(t);return a===t?l=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=C(n)[1],a===null?l=Node.DOCUMENT_POSITION_PRECEDING:(t=S(a).compareDocumentPosition(t),l=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),l|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=S(a[0]),l=S(a[a.length-1]);var u=M(this._fragmentFiber)?n.parentElement:r;if(u==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=u.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,u=u.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY;var m=n.compareDocumentPosition(t),E=l.compareDocumentPosition(t),O=m&Node.DOCUMENT_POSITION_CONTAINED_BY||E&Node.DOCUMENT_POSITION_CONTAINED_BY;return E=r&&u&&m&Node.DOCUMENT_POSITION_FOLLOWING&&E&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===t||u&&l===t||O||E?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===t||!u&&l===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:m,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||KS(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function KS(t,n,a,r,l){var u=Wt(l);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!u)t:{for(;u!==null;){if(u.tag===7&&(u===n||u.alternate===n)){a=!0;break t}u=u.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(u===null)return u=l.ownerDocument,l===u||l===u.documentElement||l===u.body;t:{for(u=n,n=x(n);u!==null;){if(!(u.tag!==5&&u.tag!==3&&u.tag!==27||u!==n&&u.alternate!==n)){u=!0;break t}u=u.return}u=!1}return u}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!u)&&!(n=u===a)&&(n=V(a,u,Q),n===null?n=!1:(v(n,!0,z,u,a),u=y,y=null,n=u!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!u)&&!(n=u===r)&&(n=V(r,u,Q),n===null?n=!1:(v(n,!0,U,u,r),u=y,B=y=null,n=u!==null)),n):!1}function xv(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}si.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(s(566));var n=[];v(this._fragmentFiber.child,!1,qh,n,void 0,void 0);var a=t!==!1;if(n.length===0){var r=C(this._fragmentFiber);if(r=a?r[1]||r[0]||x(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){t=S(r),xv(t,a);return}if(r=S(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(t);return}r.scrollIntoView(t)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var l=n[r];l.tag===6?(l=S(l),xv(l,a)):S(l).scrollIntoView(t),r+=a?-1:1}};function QS(t,n){return t=S(t),yv(t,n),!1}function yv(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function Sv(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var l=a[r];t.addEventListener(l.type,l.attachedListener,Ps(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){for(var m=0,E=0;E<Ni.length;E++){var O=Ni[E];(O.fragmentInstance!==n||O.observer!==u||O.instance!==t)&&(Ni[m++]=O)}Ni.length=m,u.observe(t)}),yv(t,n))}function JS(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var l=a[r];t.removeEventListener(l.type,l.attachedListener,Ps(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){typeof u.rootMargin=="string"?jS(n,u,t):u.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function Wh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Wh(a),ge(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function $S(t,n,a,r){for(;t.nodeType===1;){var l=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[Xe])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(u=t.getAttribute("rel"),u==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(u!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(u=t.getAttribute("src"),(u!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&u&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var u=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===u)return t}else return t;if(t=yi(t.nextSibling),t===null)break}return null}function tM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=yi(t.nextSibling),t===null))return null;return t}function Mv(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=yi(t.nextSibling),t===null))return null;return t}function jh(t){return t.data==="$?"||t.data==="$~"}function Zh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function eM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function yi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Kh=null;function Ev(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return yi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Tv(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function nM(t,n){function a(){r=!0}if(t.ownerDocument.activeElement===t)return!0;var r=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return r}function iM(t){uv(function(){uv(function(n){return t(n)})})}function bv(t,n,a){switch(n=nl(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Av(t,n,a){for(var r in a){var l=a[r];a.hasOwnProperty(r)&&l!=null&&Pe(t,n,r,null,NS,l)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Hi&&(t.onclick=null),ge(t)}function Qh(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);ge(t)}var Si=new Map,Rv=new Set;function il(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var _a=Bt.d;Bt.d={f:aM,r:rM,D:sM,C:oM,L:lM,m:cM,X:fM,S:uM,M:hM};function aM(){var t=_a.f(),n=wc();return t||n}function rM(t){var n=Qe(t);n!==null&&n.tag===5&&n.type==="form"?D0(n):_a.r(t)}var zs=typeof document>"u"?null:document;function Cv(t,n,a){var r=zs;if(r&&typeof n=="string"&&n){var l=di(n);l='link[rel="'+t+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),Rv.has(l)||(Rv.add(l),t={rel:t,crossOrigin:a,href:n},r.querySelector(l)===null&&(n=r.createElement("link"),Un(n,"link",t),Ze(n),r.head.appendChild(n)))}}function sM(t){_a.D(t),Cv("dns-prefetch",t,null)}function oM(t,n){_a.C(t,n),Cv("preconnect",t,n)}function lM(t,n,a){_a.L(t,n,a);var r=zs;if(r&&t&&n){var l='link[rel="preload"][as="'+di(n)+'"]';n==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+di(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+di(a.imageSizes)+'"]')):l+='[href="'+di(t)+'"]';var u=l;switch(n){case"style":u=Is(t);break;case"script":u=Bs(t)}if(!(Si.has(u)||(t=P({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Si.set(u,t),r.querySelector(l)!==null||n==="style"&&r.querySelector(al(u))||n==="script"&&r.querySelector(rl(u))))){var m=r.createElement("link");Un(m,"link",t),n==="style"&&(m[Ge]=!0,m.onload=m.onerror=function(){Pn(m)}),Ze(m),r.head.appendChild(m)}}}function cM(t,n){_a.m(t,n);var a=zs;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",l='link[rel="modulepreload"][as="'+di(r)+'"][href="'+di(t)+'"]',u=l;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=Bs(t)}if(!Si.has(u)&&(t=P({rel:"modulepreload",href:t},n),Si.set(u,t),a.querySelector(l)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(rl(u)))return}r=a.createElement("link"),Un(r,"link",t),Ze(r),a.head.appendChild(r)}}}function uM(t,n,a){_a.S(t,n,a);var r=zs;if(r&&t){var l=yn(r).hoistableStyles,u=Is(t);n=n||"default";var m=l.get(u);if(!m){var E={loading:0,preload:null};if(m=r.querySelector(al(u)))E.loading=5;else{t=P({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Si.get(u))&&Jh(t,a);var O=m=r.createElement("link");Ze(O),Un(O,"link",t),O._p=new Promise(function(Y,rt){O.onload=Y,O.onerror=rt}),O.addEventListener("load",function(){E.loading|=1}),O.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Ic(m,n,r)}m={type:"stylesheet",instance:m,count:1,state:E},l.set(u,m)}}}function fM(t,n){_a.X(t,n);var a=zs;if(a&&t){var r=yn(a).hoistableScripts,l=Bs(t),u=r.get(l);u||(u=a.querySelector(rl(l)),u||(t=P({src:t,async:!0},n),(n=Si.get(l))&&$h(t,n),u=a.createElement("script"),Ze(u),Un(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(l,u))}}function hM(t,n){_a.M(t,n);var a=zs;if(a&&t){var r=yn(a).hoistableScripts,l=Bs(t),u=r.get(l);u||(u=a.querySelector(rl(l)),u||(t=P({src:t,async:!0,type:"module"},n),(n=Si.get(l))&&$h(t,n),u=a.createElement("script"),Ze(u),Un(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(l,u))}}function Dv(t,n,a,r){var l=(l=N.current)?il(l):null;if(!l)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Is(a.href),n=yn(l).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Is(a.href);var u=yn(l).hoistableStyles,m=u.get(t);if(m||(l=l.ownerDocument||l,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(t,m),(u=l.querySelector(al(t)))?u._p||(m.instance=u,m.state.loading=5):(u=Si.get(t),u||(u={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Si.set(t,u)),dM(l,t,u,m.state))),n&&r===null)throw Error(s(528,""));return m}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Bs(a),n=yn(l).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Is(t){return'href="'+di(t)+'"'}function al(t){return'link[rel="stylesheet"]['+t+"]"}function wv(t){return P({},t,{"data-precedence":t.precedence,precedence:null})}function dM(t,n,a,r){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Ge]!==!0){r.loading=1;return}}else n=t.createElement("link"),n[Ge]=!0,n.onload=n.onerror=Pn.bind(null,n),Un(n,"link",a),Ze(n),t.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function Bs(t){return'[src="'+di(t)+'"]'}function rl(t){return"script[async]"+t}function Uv(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+di(a.href)+'"]');if(r)return n.instance=r,Ze(r),r;var l=P({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),Ze(r),Un(r,"style",l),Ic(r,a.precedence,t),n.instance=r;case"stylesheet":l=Is(a.href);var u=t.querySelector(al(l));if(u)return n.state.loading|=4,n.instance=u,Ze(u),u;r=wv(a),(l=Si.get(l))&&Jh(r,l),u=(t.ownerDocument||t).createElement("link"),Ze(u);var m=u;return m._p=new Promise(function(E,O){m.onload=E,m.onerror=O}),Un(u,"link",r),n.state.loading|=4,Ic(u,a.precedence,t),n.instance=u;case"script":return u=Bs(a.src),(l=t.querySelector(rl(u)))?(n.instance=l,Ze(l),l):(r=a,(l=Si.get(u))&&(r=P({},a),$h(r,l)),t=t.ownerDocument||t,l=t.createElement("script"),Ze(l),Un(l,"link",r),t.head.appendChild(l),n.instance=l);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Ic(r,a.precedence,t));return n.instance}function Ic(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=r.length?r[r.length-1]:null,u=l,m=0;m<r.length;m++){var E=r[m];if(E.dataset.precedence===n)u=E;else if(u!==l)break}u?u.parentNode.insertBefore(t,u.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Jh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function $h(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Bc=null;function Nv(t,n,a){if(Bc===null){var r=new Map,l=Bc=new Map;l.set(a,r)}else l=Bc,r=l.get(a),r||(r=new Map,l.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),l=0;l<a.length;l++){var u=a[l];if(!(u[Xe]||u[Tt]||t==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var m=u.getAttribute(n)||"";m=t+m;var E=r.get(m);E?E.push(u):r.set(m,[u])}}return r}function td(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function pM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Lv(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function Ov(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Pv(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function zv(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=Pv(n),t.suspenseyImages.push(n)),t=vM.bind(t),n.decode().then(t,t))}function mM(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=Is(r.href),u=n.querySelector(al(l));if(u){n=u._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=sl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=u,Ze(u);return}u=n.ownerDocument||n,r=wv(r),(l=Si.get(l))&&Jh(r,l),u=u.createElement("link"),Ze(u);var m=u;m._p=new Promise(function(E,O){m.onload=E,m.onerror=O}),Un(u,"link",r),a.instance=u}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=sl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Fc=0;function gM(t,n){return t.stylesheets&&t.count===0&&Gc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&Gc(t,t.stylesheets),t.unsuspend){var u=t.unsuspend;t.unsuspend=null,u()}},6e4+n);0<t.imgBytes&&Fc===0&&(Fc=62500*OS());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Gc(t,t.stylesheets),t.unsuspend)){var u=t.unsuspend;t.unsuspend=null,u()}},(t.imgBytes>Fc?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(l)}}:null}function Iv(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Gc(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function sl(){this.count--,Iv(this)}function vM(){this.imgCount--,Iv(this)}var Hc=null;function Gc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Hc=new Map,n.forEach(_M,t),Hc=null,sl.call(t))}function _M(t,n){if(!(n.state.loading&4)){var a=Hc.get(t);if(a)var r=a.get(null);else{a=new Map,Hc.set(t,a);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<l.length;u++){var m=l[u];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(a.set(m.dataset.precedence,m),r=m)}r&&a.set(null,r)}l=n.instance,m=l.getAttribute("data-precedence"),u=a.get(m)||r,u===r&&a.set(null,l),a.set(m,l),this.count++,r=sl.bind(this),l.addEventListener("load",r),l.addEventListener("error",r),u?u.parentNode.insertBefore(l,u.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),n.state.loading|=4}}var Fs={$$typeof:ut,Provider:null,Consumer:null,_currentValue:re,_currentValue2:re,_threadCount:0};function xM(t,n,a,r,l,u,m,E,O){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=So(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=So(0),this.hiddenUpdates=So(null),this.identifierPrefix=r,this.onUncaughtError=l,this.onCaughtError=u,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=O,this.transitionTypes=null,this.incompleteTransitions=new Map}function Bv(t,n,a,r,l,u,m,E,O,Y,rt,pt){return t=new xM(t,n,a,m,O,Y,rt,pt,E),n=1,u===!0&&(n|=24),u=Xn(3,null,null,n),t.current=u,u.stateNode=t,n=mf(),n.refCount++,t.pooledCache=n,n.refCount++,u.memoizedState={element:r,isDehydrated:a,cache:n},xf(u),t}function Fv(t){return t?(t=fs,t):fs}function Hv(t,n,a,r,l,u){l=Fv(l),r.context===null?r.context=l:r.pendingContext=l,r=Va(n),r.payload={element:a},u=u===void 0?null:u,u!==null&&(r.callback=u),a=ka(t,r,n),a!==null&&(jn(a,t,n),Io(a,t,n))}function Gv(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function ed(t,n){Gv(t,n),(t=t.alternate)&&Gv(t,n)}function Vv(t){if(t.tag===13||t.tag===31){var n=Mr(t,67108864);n!==null&&jn(n,t,67108864),ed(t,67108864)}}function kv(t){if(t.tag===13||t.tag===31){var n=ri();n=ot(n);var a=Mr(t,n);a!==null&&jn(a,t,n),ed(t,n)}}var Hs=!0;function yM(t,n,a,r){var l=Rt.T;Rt.T=null;var u=Bt.p;try{Bt.p=2,nd(t,n,a,r)}finally{Bt.p=u,Rt.T=l}}function SM(t,n,a,r){var l=Rt.T;Rt.T=null;var u=Bt.p;try{Bt.p=8,nd(t,n,a,r)}finally{Bt.p=u,Rt.T=l}}function nd(t,n,a,r){if(Hs){var l=id(r);if(l===null)Ih(t,n,r,Vc,a),qv(t,r);else if(EM(l,t,n,a,r))r.stopPropagation();else if(qv(t,r),n&4&&-1<MM.indexOf(t)){for(;l!==null;){var u=Qe(l);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var m=Fi(u.pendingLanes);if(m!==0){var E=u;for(E.pendingLanes|=2,E.entangledLanes|=2;m;){var O=1<<31-On(m);E.entanglements[1]|=O,m&=~O}Ki(u),(Ue&6)===0&&(Rc=G()+500,$o(0))}}break;case 31:case 13:E=Mr(u,2),E!==null&&jn(E,u,2),wc(),ed(u,2)}if(u=id(r),u===null&&Ih(t,n,r,Vc,a),u===l)break;l=u}l!==null&&r.stopPropagation()}else Ih(t,n,r,null,a)}}function id(t){return t=Gu(t),ad(t)}var Vc=null;function ad(t){if(Vc=null,t=Wt(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Vc=t,null}function Xv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ot()){case ft:return 2;case _t:return 8;case Pt:case It:return 32;case se:return 268435456;default:return 32}default:return 32}}var rd=!1,er=null,nr=null,ir=null,ol=new Map,ll=new Map,ar=[],MM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function qv(t,n){switch(t){case"focusin":case"focusout":er=null;break;case"dragenter":case"dragleave":nr=null;break;case"mouseover":case"mouseout":ir=null;break;case"pointerover":case"pointerout":ol.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ll.delete(n.pointerId)}}function cl(t,n,a,r,l,u){return t===null||t.nativeEvent!==u?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:u,targetContainers:[l]},n!==null&&(n=Qe(n),n!==null&&Vv(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),t)}function EM(t,n,a,r,l){switch(n){case"focusin":return er=cl(er,t,n,a,r,l),!0;case"dragenter":return nr=cl(nr,t,n,a,r,l),!0;case"mouseover":return ir=cl(ir,t,n,a,r,l),!0;case"pointerover":var u=l.pointerId;return ol.set(u,cl(ol.get(u)||null,t,n,a,r,l)),!0;case"gotpointercapture":return u=l.pointerId,ll.set(u,cl(ll.get(u)||null,t,n,a,r,l)),!0}return!1}function Yv(t){var n=Wt(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Mt(t.priority,function(){kv(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,Mt(t.priority,function(){kv(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function kc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=id(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);Hu=r,a.target.dispatchEvent(r),Hu=null}else return n=Qe(a),n!==null&&Vv(n),t.blockedOn=a,!1;n.shift()}return!0}function Wv(t,n,a){kc(t)&&a.delete(n)}function TM(){rd=!1,er!==null&&kc(er)&&(er=null),nr!==null&&kc(nr)&&(nr=null),ir!==null&&kc(ir)&&(ir=null),ol.forEach(Wv),ll.forEach(Wv)}function Xc(t,n){t.blockedOn===n&&(t.blockedOn=null,rd||(rd=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,TM)))}var qc=null;function jv(t){qc!==t&&(qc=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){qc===t&&(qc=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],l=t[n+2];if(typeof r!="function"){if(ad(r||a)===null)continue;break}var u=Qe(a);u!==null&&(t.splice(n,3),n-=3,Hf(u,{pending:!0,data:l,method:a.method,action:r},r,l))}}))}function Gs(t){function n(O){return Xc(O,t)}er!==null&&Xc(er,t),nr!==null&&Xc(nr,t),ir!==null&&Xc(ir,t),ol.forEach(n),ll.forEach(n);for(var a=0;a<ar.length;a++){var r=ar[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<ar.length&&(a=ar[0],a.blockedOn===null);)Yv(a),a.blockedOn===null&&ar.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var l=a[r],u=a[r+1],m=l[Ut]||null;if(typeof u=="function")m||jv(a);else if(m){var E=null;if(u&&u.hasAttribute("formAction")){if(l=u,m=u[Ut]||null)E=m.formAction;else if(ad(l)!==null)continue}else E=m.action;typeof E=="function"?a[r+1]=E:(a.splice(r,3),r-=3),jv(a)}}}function Zv(){function t(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(m){return l=m})},focusReset:"manual",scroll:"manual"})}function n(){l!==null&&(l(),l=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),l!==null&&(l(),l=null)}}}function sd(t){this._internalRoot=t}Yc.prototype.render=sd.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ri();Hv(a,r,t,n,null,null)},Yc.prototype.unmount=sd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Hv(t.current,2,null,t,null,null),wc(),n[Qt]=null}};function Yc(t){this._internalRoot=t}Yc.prototype.unstable_scheduleHydration=function(t){if(t){var n=K();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ar.length&&n!==0&&n<ar[a].priority;a++);ar.splice(a,0,t),a===0&&Yv(t)}};var Kv=e.version;if(Kv!=="19.3.1")throw Error(s(527,Kv,"19.3.1"));Bt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=g(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var bM={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Rt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Wc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Wc.isDisabled&&Wc.supportsFiber)try{be=Wc.inject(bM),je=Wc}catch{}}return fl.createRoot=function(t,n){if(!c(t))throw Error(s(299));var a=!1,r="",l=F0,u=H0,m=G0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(l=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),n=Bv(t,1,!1,null,null,a,r,null,l,u,m,Zv),t[Qt]=n.current,zh(t),new sd(n)},fl.hydrateRoot=function(t,n,a){if(!c(t))throw Error(s(299));var r=!1,l="",u=F0,m=H0,E=G0,O=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(m=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(O=a.formState)),n=Bv(t,1,!0,n,a??null,r,l,O,u,m,E,Zv),n.context=Fv(null),a=n.current,r=ri(),r=ot(r),l=Va(r),l.callback=null,ka(a,l,r),a=r,n.current.lanes=a,xr(n,a),Ki(n),t[Qt]=n.current,zh(t),new Yc(n)},fl.version="19.3.1",fl}var s_;function PM(){if(s_)return cd.exports;s_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),cd.exports=OM(),cd.exports}var zM=PM();const Lp="gargantua.state.v1",Op=1,vu=["standard","high","cinematic"],Qi={standard:{id:"standard",label:"Standard",zhLabel:"标准",renderScale:.72,maxDpr:1.25,maxSteps:150,stepScale:1.22,diskSubSamples:2,bloomLevels:3,starOctaves:2},high:{id:"high",label:"High",zhLabel:"高画质",renderScale:.92,maxDpr:1.75,maxSteps:240,stepScale:.88,diskSubSamples:3,bloomLevels:4,starOctaves:3},cinematic:{id:"cinematic",label:"Cinematic",zhLabel:"电影级",renderScale:1,maxDpr:2,maxSteps:360,stepScale:.62,diskSubSamples:4,bloomLevels:5,starOctaves:4}},fi=[{index:0,shortcut:"Shift+1",name:"卡冈图雅视界",enName:"Gargantua Horizon",summary:"低倾角全景构图：前景吸积盘横贯视界阴影，上下次级透镜拱弧与光子环完整对称",fov:46,cameraDistance:22.5,cameraAzimuth:-28,cameraElevation:9.5},{index:1,shortcut:"Shift+2",name:"光子球掠影",enName:"Photon Ring Graze",summary:"抵近内稳定圆轨道与临界捕获边界，呈现强烈相对论多普勒蓝移与高阶光子子环",fov:56,cameraDistance:7.4,cameraAzimuth:36,cameraElevation:5.2},{index:2,shortcut:"Shift+3",name:"高纬天顶漩涡",enName:"Zenith Accretion Vortex",summary:"高俯仰角俯视开普勒差速剪切湍流螺旋臂与视界边缘内侧的次级底面像",fov:45,cameraDistance:21,cameraAzimuth:118,cameraElevation:56},{index:3,shortcut:"Shift+4",name:"赤道下仰视环",enName:"Sub-Disk Einstein Arc",summary:"自盘面南半球仰望银心星云，观测反转的上下透镜拱与背景爱因斯坦星环",fov:50,cameraDistance:25.5,cameraAzimuth:-144,cameraElevation:-15.5}],yl=[{index:0,key:"0",name:"最终合成画面",enName:"Final Relativistic Composite",description:"完整零测地线光线追踪 + 多尺度 HDR Bloom + ACES RRT/ODT 色调映射与镜头后处理"},{index:1,key:"1",name:"测地线步进与终止诊断",enName:"Geodesic Steps & Termination",description:"RK4 积分步数热力分布（青蓝=逃逸无穷远，高亮金=临界光子轨道缠绕，深红核=落入事件视界）"},{index:2,key:"2",name:"事件视界掩码与碰撞参数",enName:"Horizon Mask & Impact Parameter",description:"纯黑区域为事件视界捕获掩码（r ≤ rs），外围等值线展示碰撞参数比 b / b_crit 与最近点 r_min"},{index:3,key:"3",name:"盘面穿越阶次（首像/高阶像）",enName:"Disk Crossings & Image Order",description:"弯曲测地线按路径顺序命中吸积盘次数：青色=首级像(n=1)，琥珀金=次级透镜拱(n=2)，洋红白=高阶光子环(n≥3)"},{index:4,key:"4",name:"多普勒增亮与引力红移因子 g",enName:"Doppler & Gravitational Redshift g",description:"观测频率比 g = ν_obs / ν_emit：亮蓝白表示朝向观测者蓝移增亮(g>1)，橙红至暗红表示背离与强引力红移(g<1)"},{index:5,key:"5",name:"盘面本征温度与螺旋湍流",enName:"Intrinsic Disk Temp & MRI Turbulence",description:"剥离多普勒与后处理，直接检视 Page–Thorne 径向温度梯度与开普勒差速剪切螺旋湍流密度场"},{index:6,key:"6",name:"背景透镜天球坐标与偏折角",enName:"Lensed Celestial UV & Deflection",description:"无穷远出射方向天球经纬网格与总引力偏折角，直观呈现爱因斯坦环反转映射与空间弯曲"},{index:7,key:"7",name:"程序化星空与银河透镜层",enName:"Procedural Lensed Stars & Galaxy",description:"隐藏吸积盘辐射，单独审视程序化多星等恒星场、银河尘埃带在视界外围的引力透镜畸变与星环"},{index:8,key:"8",name:"后处理前线性 HDR 辐射值",enName:"Pre-Postprocess Linear HDR Radiance",description:"未经 Bloom、ACES 色调映射与暗角处理的原始线性 HDR 辐射度（以对数档位与 >1.0 超亮等高线标示动态范围）"},{index:9,key:"9",name:"吸积盘光学厚度与透射率",enName:"Disk Optical Depth & Opacity (1 - T)",description:"沿弯曲路径累积的辐射传输不透明度 1 - exp(-τ) 与盘半厚度垂向分层结构响应"}],IM=[{id:"camera",label:"相机与时间",enLabel:"Camera & Time"},{id:"disk",label:"吸积盘物理",enLabel:"Accretion Disk"},{id:"sky",label:"深空背景",enLabel:"Procedural Sky"},{id:"post",label:"光学与后处理",enLabel:"Optics & Post"}],Du=[{key:"fov",group:"camera",label:"视场角 (FOV)",unit:"°",min:24,max:85,step:1,defaultValue:fi[0].fov,decimals:0},{key:"cameraDistance",group:"camera",label:"相机距离",unit:" rs",min:2.8,max:42,step:.1,defaultValue:fi[0].cameraDistance,decimals:1},{key:"cameraAzimuth",group:"camera",label:"相机方位角",unit:"°",min:-180,max:180,step:.5,defaultValue:fi[0].cameraAzimuth,decimals:1},{key:"cameraElevation",group:"camera",label:"相机俯仰角",unit:"°",min:-85,max:85,step:.5,defaultValue:fi[0].cameraElevation,decimals:1},{key:"timeScale",group:"camera",label:"时间倍率",unit:"×",min:0,max:4,step:.05,defaultValue:1,decimals:2},{key:"diskInnerRadius",group:"disk",label:"盘内半径",unit:" rs",min:1.6,max:6,step:.05,defaultValue:3,decimals:2},{key:"diskOuterRadius",group:"disk",label:"盘外半径",unit:" rs",min:6.5,max:28,step:.25,defaultValue:12.5,decimals:2},{key:"diskHalfThickness",group:"disk",label:"盘半厚度",unit:" rs",min:.02,max:.8,step:.01,defaultValue:.16,decimals:2},{key:"diskTemperature",group:"disk",label:"盘温度",unit:" K",min:2500,max:14e3,step:100,defaultValue:6400,decimals:0},{key:"diskIntensity",group:"disk",label:"盘发射强度",unit:"",min:.1,max:4,step:.05,defaultValue:1.38,decimals:2},{key:"orbitalSpeedScale",group:"disk",label:"轨道速度倍率",unit:"×",min:0,max:1.8,step:.05,defaultValue:1,decimals:2},{key:"turbulenceAmplitude",group:"disk",label:"湍流幅度",unit:"",min:0,max:1.5,step:.02,defaultValue:.82,decimals:2},{key:"turbulenceSpeed",group:"disk",label:"湍流速度",unit:"×",min:0,max:3,step:.05,defaultValue:1,decimals:2},{key:"starDensity",group:"sky",label:"恒星密度",unit:"×",min:0,max:2.5,step:.05,defaultValue:1,decimals:2},{key:"galaxyBrightness",group:"sky",label:"银河亮度",unit:"×",min:0,max:2.5,step:.05,defaultValue:1.05,decimals:2},{key:"bloomStrength",group:"post",label:"Bloom 强度",unit:"",min:0,max:2,step:.02,defaultValue:.52,decimals:2},{key:"bloomThreshold",group:"post",label:"Bloom 阈值",unit:"",min:.1,max:3,step:.05,defaultValue:.85,decimals:2},{key:"exposure",group:"post",label:"曝光度",unit:"",min:.2,max:2.8,step:.02,defaultValue:1.06,decimals:2},{key:"vignetteStrength",group:"post",label:"暗角强度",unit:"",min:0,max:1,step:.02,defaultValue:.32,decimals:2},{key:"filmGrainStrength",group:"post",label:"胶片颗粒强度",unit:"",min:0,max:.25,step:.005,defaultValue:.03,decimals:3},{key:"chromaticAberration",group:"post",label:"色散强度",unit:"",min:0,max:1,step:.02,defaultValue:.22,decimals:2}],Ln=Object.fromEntries(Du.map(o=>[o.key,o])),o_=[{keys:"0 – 9",action:"切换调试与合成视图"},{keys:"Shift + 1 – 4",action:"切换四个相机预设"},{keys:"Space",action:"播放 / 暂停电影镜头循环"},{keys:"H",action:"显示 / 隐藏 HUD 面板"},{keys:"Q",action:"循环切换渲染质量档位"},{keys:"R",action:"重置全部参数与视角"},{keys:"M",action:"开关程序化深空环境音效"}];function ux(){const o={};for(const e of Du)o[e.key]=e.defaultValue;return o}function fx(o,e){const i=Ln[o];if(!i)return;const s=Number(e);return Number.isFinite(s)?Math.min(i.max,Math.max(i.min,s)):i.defaultValue}function lo(o){const e=ux();if(o&&typeof o=="object")for(const i of Du)Object.prototype.hasOwnProperty.call(o,i.key)&&(e[i.key]=fx(i.key,o[i.key]));return e.diskOuterRadius<e.diskInnerRadius+.5&&(e.diskOuterRadius=Math.min(Ln.diskOuterRadius.max,Math.max(Ln.diskOuterRadius.min,e.diskInnerRadius+.5))),e}function hx(){return{schemaVersion:Op,quality:"high",preset:0,debug:0,hudVisible:!0,cinematicPlaying:!0,audioEnabled:!1,captureMode:!1,time:0,params:ux()}}function bu(o){return typeof o=="string"&&Object.prototype.hasOwnProperty.call(Qi,o)}function kd(o){return Number.isInteger(o)&&o>=0&&o<fi.length}function Xd(o){return Number.isInteger(o)&&o>=0&&o<yl.length}function l_(o){return typeof o=="number"&&Number.isFinite(o)&&o>=0}function c_(o,e,i){if(typeof o!="string")return null;const s=o.trim();if(!/^\d+$/.test(s))return null;const c=Number(s);return!Number.isSafeInteger(c)||c<e||c>i?null:c}function BM(o=window.location.search){const e=new URLSearchParams(o||""),i=e.get("capture")==="1",s=e.get("quality"),c=s!==null&&bu(s)?s:null,f=e.has("preset")?c_(e.get("preset"),0,fi.length-1):null,h=e.has("debug")?c_(e.get("debug"),0,yl.length-1):null;let d=null;if(e.has("hud")){const g=e.get("hud");g==="0"?d=!1:g==="1"&&(d=!0)}let p=null;if(e.has("time")){const g=e.get("time");if(typeof g=="string"&&g.trim()!==""){const _=Number(g);Number.isFinite(_)&&_>=0&&(p=_)}}return{captureMode:i,quality:c,preset:f,debug:h,hud:d,time:p,hasAnyUrlParam:e.size>0}}function FM(o=window.location.search){const e=hx(),i=BM(o);if(!i.captureMode)try{const s=window.localStorage.getItem(Lp);if(s){const c=JSON.parse(s);c&&c.schemaVersion===Op&&(bu(c.quality)&&(e.quality=c.quality),kd(c.preset)&&(e.preset=c.preset),Xd(c.debug)&&(e.debug=c.debug),typeof c.hudVisible=="boolean"&&(e.hudVisible=c.hudVisible),typeof c.cinematicPlaying=="boolean"&&(e.cinematicPlaying=c.cinematicPlaying),e.params=lo(c.params))}}catch{}if(i.quality!==null?e.quality=i.quality:i.captureMode&&(e.quality="high"),i.preset!==null){e.preset=i.preset;const s=fi[i.preset];e.params.fov=s.fov,e.params.cameraDistance=s.cameraDistance,e.params.cameraAzimuth=s.cameraAzimuth,e.params.cameraElevation=s.cameraElevation,e.cinematicPlaying=!1}else if(i.captureMode){e.preset=0;const s=fi[0];e.params.fov=s.fov,e.params.cameraDistance=s.cameraDistance,e.params.cameraAzimuth=s.cameraAzimuth,e.params.cameraElevation=s.cameraElevation}return i.debug!==null?e.debug=i.debug:i.captureMode&&(e.debug=0),i.hud!==null?e.hudVisible=i.hud:i.captureMode&&(e.hudVisible=!0),i.captureMode?(e.captureMode=!0,e.cinematicPlaying=!1,e.audioEnabled=!1,e.time=i.time!==null?i.time:0):i.time!==null&&(e.time=i.time),e}function HM(o){if(!(!o||o.captureMode))try{const e={schemaVersion:Op,quality:o.quality,preset:o.preset,debug:o.debug,hudVisible:o.hudVisible,cinematicPlaying:o.cinematicPlaying,params:lo(o.params)};window.localStorage.setItem(Lp,JSON.stringify(e))}catch{}}function GM(){try{window.localStorage.removeItem(Lp)}catch{}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pp="174",ao={ROTATE:0,DOLLY:1,PAN:2},no={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},VM=0,u_=1,kM=2,dx=1,XM=2,ba=3,mr=0,Qn=1,Aa=2,pr=0,ro=1,f_=2,h_=3,d_=4,qM=5,jr=100,YM=101,WM=102,jM=103,ZM=104,KM=200,QM=201,JM=202,$M=203,qd=204,Yd=205,tE=206,eE=207,nE=208,iE=209,aE=210,rE=211,sE=212,oE=213,lE=214,Wd=0,jd=1,Zd=2,co=3,Kd=4,Qd=5,Jd=6,$d=7,px=0,cE=1,uE=2,Da=0,fE=1,hE=2,dE=3,pE=4,mE=5,gE=6,vE=7,mx=300,uo=301,fo=302,tp=303,ep=304,wu=306,np=1e3,Kr=1001,ip=1002,Ii=1003,_E=1004,jc=1005,Ti=1006,dd=1007,Qr=1008,Bi=1009,gx=1010,vx=1011,Sl=1012,zp=1013,$r=1014,Ra=1015,vo=1016,Ip=1017,Bp=1018,ho=1020,_x=35902,xx=1021,yx=1022,bi=1023,Sx=1024,Mx=1025,so=1026,po=1027,Ex=1028,Fp=1029,Tx=1030,Hp=1031,Gp=1033,_u=33776,xu=33777,yu=33778,Su=33779,ap=35840,rp=35841,sp=35842,op=35843,lp=36196,cp=37492,up=37496,fp=37808,hp=37809,dp=37810,pp=37811,mp=37812,gp=37813,vp=37814,_p=37815,xp=37816,yp=37817,Sp=37818,Mp=37819,Ep=37820,Tp=37821,Mu=36492,bp=36494,Ap=36495,bx=36283,Rp=36284,Cp=36285,Dp=36286,xE=3200,yE=3201,SE=0,ME=1,dr="",ci="srgb",mo="srgb-linear",Au="linear",Be="srgb",Vs=7680,p_=519,EE=512,TE=513,bE=514,Ax=515,AE=516,RE=517,CE=518,DE=519,m_=35044,g_="300 es",Ca=2e3,Ru=2001;class es{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const c=s[e];if(c!==void 0){const f=c.indexOf(i);f!==-1&&c.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const c=s.slice(0);for(let f=0,h=c.length;f<h;f++)c[f].call(this,e);e.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Eu=Math.PI/180,wp=180/Math.PI;function Ml(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(In[o&255]+In[o>>8&255]+In[o>>16&255]+In[o>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[i&63|128]+In[i>>8&255]+"-"+In[i>>16&255]+In[i>>24&255]+In[s&255]+In[s>>8&255]+In[s>>16&255]+In[s>>24&255]).toLowerCase()}function xe(o,e,i){return Math.max(e,Math.min(i,o))}function wE(o,e){return(o%e+e)%e}function pd(o,e,i){return(1-i)*o+i*e}function hl(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Zn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const UE={DEG2RAD:Eu};class ue{constructor(e=0,i=0){ue.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6],this.y=c[1]*i+c[4]*s+c[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=xe(this.x,e.x,i.x),this.y=xe(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=xe(this.x,e,i),this.y=xe(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(xe(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(xe(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),c=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*s-h*c+e.x,this.y=f*c+h*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fe{constructor(e,i,s,c,f,h,d,p,g){fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,c,f,h,d,p,g)}set(e,i,s,c,f,h,d,p,g){const _=this.elements;return _[0]=e,_[1]=c,_[2]=d,_[3]=i,_[4]=f,_[5]=p,_[6]=s,_[7]=h,_[8]=g,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,c=i.elements,f=this.elements,h=s[0],d=s[3],p=s[6],g=s[1],_=s[4],v=s[7],x=s[2],M=s[5],C=s[8],w=c[0],S=c[3],y=c[6],B=c[1],z=c[4],U=c[7],Q=c[2],V=c[5],P=c[8];return f[0]=h*w+d*B+p*Q,f[3]=h*S+d*z+p*V,f[6]=h*y+d*U+p*P,f[1]=g*w+_*B+v*Q,f[4]=g*S+_*z+v*V,f[7]=g*y+_*U+v*P,f[2]=x*w+M*B+C*Q,f[5]=x*S+M*z+C*V,f[8]=x*y+M*U+C*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],c=e[2],f=e[3],h=e[4],d=e[5],p=e[6],g=e[7],_=e[8];return i*h*_-i*d*g-s*f*_+s*d*p+c*f*g-c*h*p}invert(){const e=this.elements,i=e[0],s=e[1],c=e[2],f=e[3],h=e[4],d=e[5],p=e[6],g=e[7],_=e[8],v=_*h-d*g,x=d*p-_*f,M=g*f-h*p,C=i*v+s*x+c*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=v*w,e[1]=(c*g-_*s)*w,e[2]=(d*s-c*h)*w,e[3]=x*w,e[4]=(_*i-c*p)*w,e[5]=(c*f-d*i)*w,e[6]=M*w,e[7]=(s*p-g*i)*w,e[8]=(h*i-s*f)*w,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,c,f,h,d){const p=Math.cos(f),g=Math.sin(f);return this.set(s*p,s*g,-s*(p*h+g*d)+h+e,-c*g,c*p,-c*(-g*h+p*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(md.makeScale(e,i)),this}rotate(e){return this.premultiply(md.makeRotation(-e)),this}translate(e,i){return this.premultiply(md.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let c=0;c<9;c++)if(i[c]!==s[c])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const md=new fe;function Rx(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Cu(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function NE(){const o=Cu("canvas");return o.style.display="block",o}const v_={};function Yr(o){o in v_||(v_[o]=!0,console.warn(o))}function LE(o,e,i){return new Promise(function(s,c){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:c();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:s()}}setTimeout(f,i)})}function OE(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function PE(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const __=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),x_=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zE(){const o={enabled:!0,workingColorSpace:mo,spaces:{},convert:function(c,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===Be&&(c.r=wa(c.r),c.g=wa(c.g),c.b=wa(c.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(c.applyMatrix3(this.spaces[f].toXYZ),c.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Be&&(c.r=oo(c.r),c.g=oo(c.g),c.b=oo(c.b))),c},fromWorkingColorSpace:function(c,f){return this.convert(c,this.workingColorSpace,f)},toWorkingColorSpace:function(c,f){return this.convert(c,f,this.workingColorSpace)},getPrimaries:function(c){return this.spaces[c].primaries},getTransfer:function(c){return c===dr?Au:this.spaces[c].transfer},getLuminanceCoefficients:function(c,f=this.workingColorSpace){return c.fromArray(this.spaces[f].luminanceCoefficients)},define:function(c){Object.assign(this.spaces,c)},_getMatrix:function(c,f,h){return c.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(c){return this.spaces[c].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(c=this.workingColorSpace){return this.spaces[c].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[mo]:{primaries:e,whitePoint:s,transfer:Au,toXYZ:__,fromXYZ:x_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ci},outputColorSpaceConfig:{drawingBufferColorSpace:ci}},[ci]:{primaries:e,whitePoint:s,transfer:Be,toXYZ:__,fromXYZ:x_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ci}}}),o}const we=zE();function wa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function oo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let ks;class IE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ks===void 0&&(ks=Cu("canvas")),ks.width=e.width,ks.height=e.height;const s=ks.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ks}return i.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Cu("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const c=s.getImageData(0,0,e.width,e.height),f=c.data;for(let h=0;h<f.length;h++)f[h]=wa(f[h]/255)*255;return s.putImageData(c,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(wa(i[s]/255)*255):i[s]=wa(i[s]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let BE=0;class Vp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:BE++}),this.uuid=Ml(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},c=this.data;if(c!==null){let f;if(Array.isArray(c)){f=[];for(let h=0,d=c.length;h<d;h++)c[h].isDataTexture?f.push(gd(c[h].image)):f.push(gd(c[h]))}else f=gd(c);s.url=f}return i||(e.images[this.uuid]=s),s}}function gd(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?IE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let FE=0;class Jn extends es{constructor(e=Jn.DEFAULT_IMAGE,i=Jn.DEFAULT_MAPPING,s=Kr,c=Kr,f=Ti,h=Qr,d=bi,p=Bi,g=Jn.DEFAULT_ANISOTROPY,_=dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:FE++}),this.uuid=Ml(),this.name="",this.source=new Vp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=c,this.magFilter=f,this.minFilter=h,this.anisotropy=g,this.format=d,this.internalFormat=null,this.type=p,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case np:e.x=e.x-Math.floor(e.x);break;case Kr:e.x=e.x<0?0:1;break;case ip:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case np:e.y=e.y-Math.floor(e.y);break;case Kr:e.y=e.y<0?0:1;break;case ip:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Jn.DEFAULT_IMAGE=null;Jn.DEFAULT_MAPPING=mx;Jn.DEFAULT_ANISOTROPY=1;class an{constructor(e=0,i=0,s=0,c=1){an.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=c}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,c){return this.x=e,this.y=i,this.z=s,this.w=c,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,c=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*s+h[8]*c+h[12]*f,this.y=h[1]*i+h[5]*s+h[9]*c+h[13]*f,this.z=h[2]*i+h[6]*s+h[10]*c+h[14]*f,this.w=h[3]*i+h[7]*s+h[11]*c+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,c,f;const p=e.elements,g=p[0],_=p[4],v=p[8],x=p[1],M=p[5],C=p[9],w=p[2],S=p[6],y=p[10];if(Math.abs(_-x)<.01&&Math.abs(v-w)<.01&&Math.abs(C-S)<.01){if(Math.abs(_+x)<.1&&Math.abs(v+w)<.1&&Math.abs(C+S)<.1&&Math.abs(g+M+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(g+1)/2,U=(M+1)/2,Q=(y+1)/2,V=(_+x)/4,P=(v+w)/4,L=(C+S)/4;return z>U&&z>Q?z<.01?(s=0,c=.707106781,f=.707106781):(s=Math.sqrt(z),c=V/s,f=P/s):U>Q?U<.01?(s=.707106781,c=0,f=.707106781):(c=Math.sqrt(U),s=V/c,f=L/c):Q<.01?(s=.707106781,c=.707106781,f=0):(f=Math.sqrt(Q),s=P/f,c=L/f),this.set(s,c,f,i),this}let B=Math.sqrt((S-C)*(S-C)+(v-w)*(v-w)+(x-_)*(x-_));return Math.abs(B)<.001&&(B=1),this.x=(S-C)/B,this.y=(v-w)/B,this.z=(x-_)/B,this.w=Math.acos((g+M+y-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=xe(this.x,e.x,i.x),this.y=xe(this.y,e.y,i.y),this.z=xe(this.z,e.z,i.z),this.w=xe(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=xe(this.x,e,i),this.y=xe(this.y,e,i),this.z=xe(this.z,e,i),this.w=xe(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(xe(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class HE extends es{constructor(e=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=1,this.scissor=new an(0,0,e,i),this.scissorTest=!1,this.viewport=new an(0,0,e,i);const c={width:e,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const f=new Jn(c,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);f.flipY=!1,f.generateMipmaps=s.generateMipmaps,f.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let c=0,f=this.textures.length;c<f;c++)this.textures[c].image.width=e,this.textures[c].image.height=i,this.textures[c].image.depth=s;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const c=Object.assign({},e.textures[i].image);this.textures[i].source=new Vp(c)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ta extends HE{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class Cx extends Jn{constructor(e=null,i=1,s=1,c=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:c},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class GE extends Jn{constructor(e=null,i=1,s=1,c=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:c},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ts{constructor(e=0,i=0,s=0,c=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=c}static slerpFlat(e,i,s,c,f,h,d){let p=s[c+0],g=s[c+1],_=s[c+2],v=s[c+3];const x=f[h+0],M=f[h+1],C=f[h+2],w=f[h+3];if(d===0){e[i+0]=p,e[i+1]=g,e[i+2]=_,e[i+3]=v;return}if(d===1){e[i+0]=x,e[i+1]=M,e[i+2]=C,e[i+3]=w;return}if(v!==w||p!==x||g!==M||_!==C){let S=1-d;const y=p*x+g*M+_*C+v*w,B=y>=0?1:-1,z=1-y*y;if(z>Number.EPSILON){const Q=Math.sqrt(z),V=Math.atan2(Q,y*B);S=Math.sin(S*V)/Q,d=Math.sin(d*V)/Q}const U=d*B;if(p=p*S+x*U,g=g*S+M*U,_=_*S+C*U,v=v*S+w*U,S===1-d){const Q=1/Math.sqrt(p*p+g*g+_*_+v*v);p*=Q,g*=Q,_*=Q,v*=Q}}e[i]=p,e[i+1]=g,e[i+2]=_,e[i+3]=v}static multiplyQuaternionsFlat(e,i,s,c,f,h){const d=s[c],p=s[c+1],g=s[c+2],_=s[c+3],v=f[h],x=f[h+1],M=f[h+2],C=f[h+3];return e[i]=d*C+_*v+p*M-g*x,e[i+1]=p*C+_*x+g*v-d*M,e[i+2]=g*C+_*M+d*x-p*v,e[i+3]=_*C-d*v-p*x-g*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,c){return this._x=e,this._y=i,this._z=s,this._w=c,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,c=e._y,f=e._z,h=e._order,d=Math.cos,p=Math.sin,g=d(s/2),_=d(c/2),v=d(f/2),x=p(s/2),M=p(c/2),C=p(f/2);switch(h){case"XYZ":this._x=x*_*v+g*M*C,this._y=g*M*v-x*_*C,this._z=g*_*C+x*M*v,this._w=g*_*v-x*M*C;break;case"YXZ":this._x=x*_*v+g*M*C,this._y=g*M*v-x*_*C,this._z=g*_*C-x*M*v,this._w=g*_*v+x*M*C;break;case"ZXY":this._x=x*_*v-g*M*C,this._y=g*M*v+x*_*C,this._z=g*_*C+x*M*v,this._w=g*_*v-x*M*C;break;case"ZYX":this._x=x*_*v-g*M*C,this._y=g*M*v+x*_*C,this._z=g*_*C-x*M*v,this._w=g*_*v+x*M*C;break;case"YZX":this._x=x*_*v+g*M*C,this._y=g*M*v+x*_*C,this._z=g*_*C-x*M*v,this._w=g*_*v-x*M*C;break;case"XZY":this._x=x*_*v-g*M*C,this._y=g*M*v-x*_*C,this._z=g*_*C+x*M*v,this._w=g*_*v+x*M*C;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,c=Math.sin(s);return this._x=e.x*c,this._y=e.y*c,this._z=e.z*c,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],c=i[4],f=i[8],h=i[1],d=i[5],p=i[9],g=i[2],_=i[6],v=i[10],x=s+d+v;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(_-p)*M,this._y=(f-g)*M,this._z=(h-c)*M}else if(s>d&&s>v){const M=2*Math.sqrt(1+s-d-v);this._w=(_-p)/M,this._x=.25*M,this._y=(c+h)/M,this._z=(f+g)/M}else if(d>v){const M=2*Math.sqrt(1+d-s-v);this._w=(f-g)/M,this._x=(c+h)/M,this._y=.25*M,this._z=(p+_)/M}else{const M=2*Math.sqrt(1+v-s-d);this._w=(h-c)/M,this._x=(f+g)/M,this._y=(p+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xe(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const c=Math.min(1,i/s);return this.slerp(e,c),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,c=e._y,f=e._z,h=e._w,d=i._x,p=i._y,g=i._z,_=i._w;return this._x=s*_+h*d+c*g-f*p,this._y=c*_+h*p+f*d-s*g,this._z=f*_+h*g+s*p-c*d,this._w=h*_-s*d-c*p-f*g,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const s=this._x,c=this._y,f=this._z,h=this._w;let d=h*e._w+s*e._x+c*e._y+f*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=s,this._y=c,this._z=f,this;const p=1-d*d;if(p<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*c+i*this._y,this._z=M*f+i*this._z,this.normalize(),this}const g=Math.sqrt(p),_=Math.atan2(g,d),v=Math.sin((1-i)*_)/g,x=Math.sin(i*_)/g;return this._w=h*v+this._w*x,this._x=s*v+this._x*x,this._y=c*v+this._y*x,this._z=f*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),c=Math.sqrt(1-s),f=Math.sqrt(s);return this.set(c*Math.sin(e),c*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class it{constructor(e=0,i=0,s=0){it.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(y_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(y_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,c=this.z,f=e.elements;return this.x=f[0]*i+f[3]*s+f[6]*c,this.y=f[1]*i+f[4]*s+f[7]*c,this.z=f[2]*i+f[5]*s+f[8]*c,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,c=this.z,f=e.elements,h=1/(f[3]*i+f[7]*s+f[11]*c+f[15]);return this.x=(f[0]*i+f[4]*s+f[8]*c+f[12])*h,this.y=(f[1]*i+f[5]*s+f[9]*c+f[13])*h,this.z=(f[2]*i+f[6]*s+f[10]*c+f[14])*h,this}applyQuaternion(e){const i=this.x,s=this.y,c=this.z,f=e.x,h=e.y,d=e.z,p=e.w,g=2*(h*c-d*s),_=2*(d*i-f*c),v=2*(f*s-h*i);return this.x=i+p*g+h*v-d*_,this.y=s+p*_+d*g-f*v,this.z=c+p*v+f*_-h*g,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,c=this.z,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*c,this.y=f[1]*i+f[5]*s+f[9]*c,this.z=f[2]*i+f[6]*s+f[10]*c,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=xe(this.x,e.x,i.x),this.y=xe(this.y,e.y,i.y),this.z=xe(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=xe(this.x,e,i),this.y=xe(this.y,e,i),this.z=xe(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(xe(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,c=e.y,f=e.z,h=i.x,d=i.y,p=i.z;return this.x=c*p-f*d,this.y=f*h-s*p,this.z=s*d-c*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return vd.copy(this).projectOnVector(e),this.sub(vd)}reflect(e){return this.sub(vd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(xe(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,c=this.z-e.z;return i*i+s*s+c*c}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const c=Math.sin(i)*e;return this.x=c*Math.sin(s),this.y=Math.cos(i)*e,this.z=c*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),c=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=c,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vd=new it,y_=new ts;class El{constructor(e=new it(1/0,1/0,1/0),i=new it(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Li.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Li.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Li.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const f=s.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Li):Li.fromBufferAttribute(f,h),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Zc.copy(s.boundingBox)),Zc.applyMatrix4(e.matrixWorld),this.union(Zc)}const c=e.children;for(let f=0,h=c.length;f<h;f++)this.expandByObject(c[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dl),Kc.subVectors(this.max,dl),Xs.subVectors(e.a,dl),qs.subVectors(e.b,dl),Ys.subVectors(e.c,dl),sr.subVectors(qs,Xs),or.subVectors(Ys,qs),Hr.subVectors(Xs,Ys);let i=[0,-sr.z,sr.y,0,-or.z,or.y,0,-Hr.z,Hr.y,sr.z,0,-sr.x,or.z,0,-or.x,Hr.z,0,-Hr.x,-sr.y,sr.x,0,-or.y,or.x,0,-Hr.y,Hr.x,0];return!_d(i,Xs,qs,Ys,Kc)||(i=[1,0,0,0,1,0,0,0,1],!_d(i,Xs,qs,Ys,Kc))?!1:(Qc.crossVectors(sr,or),i=[Qc.x,Qc.y,Qc.z],_d(i,Xs,qs,Ys,Kc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xa),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xa=[new it,new it,new it,new it,new it,new it,new it,new it],Li=new it,Zc=new El,Xs=new it,qs=new it,Ys=new it,sr=new it,or=new it,Hr=new it,dl=new it,Kc=new it,Qc=new it,Gr=new it;function _d(o,e,i,s,c){for(let f=0,h=o.length-3;f<=h;f+=3){Gr.fromArray(o,f);const d=c.x*Math.abs(Gr.x)+c.y*Math.abs(Gr.y)+c.z*Math.abs(Gr.z),p=e.dot(Gr),g=i.dot(Gr),_=s.dot(Gr);if(Math.max(-Math.max(p,g,_),Math.min(p,g,_))>d)return!1}return!0}const VE=new El,pl=new it,xd=new it;class kp{constructor(e=new it,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):VE.setFromPoints(e).getCenter(s);let c=0;for(let f=0,h=e.length;f<h;f++)c=Math.max(c,s.distanceToSquared(e[f]));return this.radius=Math.sqrt(c),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pl.subVectors(e,this.center);const i=pl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),c=(s-this.radius)*.5;this.center.addScaledVector(pl,c/s),this.radius+=c}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pl.copy(e.center).add(xd)),this.expandByPoint(pl.copy(e.center).sub(xd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ya=new it,yd=new it,Jc=new it,lr=new it,Sd=new it,$c=new it,Md=new it;class Dx{constructor(e=new it,i=new it(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ya)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ya.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ya.copy(this.origin).addScaledVector(this.direction,i),ya.distanceToSquared(e))}distanceSqToSegment(e,i,s,c){yd.copy(e).add(i).multiplyScalar(.5),Jc.copy(i).sub(e).normalize(),lr.copy(this.origin).sub(yd);const f=e.distanceTo(i)*.5,h=-this.direction.dot(Jc),d=lr.dot(this.direction),p=-lr.dot(Jc),g=lr.lengthSq(),_=Math.abs(1-h*h);let v,x,M,C;if(_>0)if(v=h*p-d,x=h*d-p,C=f*_,v>=0)if(x>=-C)if(x<=C){const w=1/_;v*=w,x*=w,M=v*(v+h*x+2*d)+x*(h*v+x+2*p)+g}else x=f,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*p)+g;else x=-f,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*p)+g;else x<=-C?(v=Math.max(0,-(-h*f+d)),x=v>0?-f:Math.min(Math.max(-f,-p),f),M=-v*v+x*(x+2*p)+g):x<=C?(v=0,x=Math.min(Math.max(-f,-p),f),M=x*(x+2*p)+g):(v=Math.max(0,-(h*f+d)),x=v>0?f:Math.min(Math.max(-f,-p),f),M=-v*v+x*(x+2*p)+g);else x=h>0?-f:f,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*p)+g;return s&&s.copy(this.origin).addScaledVector(this.direction,v),c&&c.copy(yd).addScaledVector(Jc,x),M}intersectSphere(e,i){ya.subVectors(e.center,this.origin);const s=ya.dot(this.direction),c=ya.dot(ya)-s*s,f=e.radius*e.radius;if(c>f)return null;const h=Math.sqrt(f-c),d=s-h,p=s+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,c,f,h,d,p;const g=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,x=this.origin;return g>=0?(s=(e.min.x-x.x)*g,c=(e.max.x-x.x)*g):(s=(e.max.x-x.x)*g,c=(e.min.x-x.x)*g),_>=0?(f=(e.min.y-x.y)*_,h=(e.max.y-x.y)*_):(f=(e.max.y-x.y)*_,h=(e.min.y-x.y)*_),s>h||f>c||((f>s||isNaN(s))&&(s=f),(h<c||isNaN(c))&&(c=h),v>=0?(d=(e.min.z-x.z)*v,p=(e.max.z-x.z)*v):(d=(e.max.z-x.z)*v,p=(e.min.z-x.z)*v),s>p||d>c)||((d>s||s!==s)&&(s=d),(p<c||c!==c)&&(c=p),c<0)?null:this.at(s>=0?s:c,i)}intersectsBox(e){return this.intersectBox(e,ya)!==null}intersectTriangle(e,i,s,c,f){Sd.subVectors(i,e),$c.subVectors(s,e),Md.crossVectors(Sd,$c);let h=this.direction.dot(Md),d;if(h>0){if(c)return null;d=1}else if(h<0)d=-1,h=-h;else return null;lr.subVectors(this.origin,e);const p=d*this.direction.dot($c.crossVectors(lr,$c));if(p<0)return null;const g=d*this.direction.dot(Sd.cross(lr));if(g<0||p+g>h)return null;const _=-d*lr.dot(Md);return _<0?null:this.at(_/h,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rn{constructor(e,i,s,c,f,h,d,p,g,_,v,x,M,C,w,S){rn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,c,f,h,d,p,g,_,v,x,M,C,w,S)}set(e,i,s,c,f,h,d,p,g,_,v,x,M,C,w,S){const y=this.elements;return y[0]=e,y[4]=i,y[8]=s,y[12]=c,y[1]=f,y[5]=h,y[9]=d,y[13]=p,y[2]=g,y[6]=_,y[10]=v,y[14]=x,y[3]=M,y[7]=C,y[11]=w,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rn().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,c=1/Ws.setFromMatrixColumn(e,0).length(),f=1/Ws.setFromMatrixColumn(e,1).length(),h=1/Ws.setFromMatrixColumn(e,2).length();return i[0]=s[0]*c,i[1]=s[1]*c,i[2]=s[2]*c,i[3]=0,i[4]=s[4]*f,i[5]=s[5]*f,i[6]=s[6]*f,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,c=e.y,f=e.z,h=Math.cos(s),d=Math.sin(s),p=Math.cos(c),g=Math.sin(c),_=Math.cos(f),v=Math.sin(f);if(e.order==="XYZ"){const x=h*_,M=h*v,C=d*_,w=d*v;i[0]=p*_,i[4]=-p*v,i[8]=g,i[1]=M+C*g,i[5]=x-w*g,i[9]=-d*p,i[2]=w-x*g,i[6]=C+M*g,i[10]=h*p}else if(e.order==="YXZ"){const x=p*_,M=p*v,C=g*_,w=g*v;i[0]=x+w*d,i[4]=C*d-M,i[8]=h*g,i[1]=h*v,i[5]=h*_,i[9]=-d,i[2]=M*d-C,i[6]=w+x*d,i[10]=h*p}else if(e.order==="ZXY"){const x=p*_,M=p*v,C=g*_,w=g*v;i[0]=x-w*d,i[4]=-h*v,i[8]=C+M*d,i[1]=M+C*d,i[5]=h*_,i[9]=w-x*d,i[2]=-h*g,i[6]=d,i[10]=h*p}else if(e.order==="ZYX"){const x=h*_,M=h*v,C=d*_,w=d*v;i[0]=p*_,i[4]=C*g-M,i[8]=x*g+w,i[1]=p*v,i[5]=w*g+x,i[9]=M*g-C,i[2]=-g,i[6]=d*p,i[10]=h*p}else if(e.order==="YZX"){const x=h*p,M=h*g,C=d*p,w=d*g;i[0]=p*_,i[4]=w-x*v,i[8]=C*v+M,i[1]=v,i[5]=h*_,i[9]=-d*_,i[2]=-g*_,i[6]=M*v+C,i[10]=x-w*v}else if(e.order==="XZY"){const x=h*p,M=h*g,C=d*p,w=d*g;i[0]=p*_,i[4]=-v,i[8]=g*_,i[1]=x*v+w,i[5]=h*_,i[9]=M*v-C,i[2]=C*v-M,i[6]=d*_,i[10]=w*v+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kE,e,XE)}lookAt(e,i,s){const c=this.elements;return oi.subVectors(e,i),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),cr.crossVectors(s,oi),cr.lengthSq()===0&&(Math.abs(s.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),cr.crossVectors(s,oi)),cr.normalize(),tu.crossVectors(oi,cr),c[0]=cr.x,c[4]=tu.x,c[8]=oi.x,c[1]=cr.y,c[5]=tu.y,c[9]=oi.y,c[2]=cr.z,c[6]=tu.z,c[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,c=i.elements,f=this.elements,h=s[0],d=s[4],p=s[8],g=s[12],_=s[1],v=s[5],x=s[9],M=s[13],C=s[2],w=s[6],S=s[10],y=s[14],B=s[3],z=s[7],U=s[11],Q=s[15],V=c[0],P=c[4],L=c[8],b=c[12],A=c[1],I=c[5],W=c[9],et=c[13],nt=c[2],ut=c[6],k=c[10],st=c[14],J=c[3],yt=c[7],St=c[11],Gt=c[15];return f[0]=h*V+d*A+p*nt+g*J,f[4]=h*P+d*I+p*ut+g*yt,f[8]=h*L+d*W+p*k+g*St,f[12]=h*b+d*et+p*st+g*Gt,f[1]=_*V+v*A+x*nt+M*J,f[5]=_*P+v*I+x*ut+M*yt,f[9]=_*L+v*W+x*k+M*St,f[13]=_*b+v*et+x*st+M*Gt,f[2]=C*V+w*A+S*nt+y*J,f[6]=C*P+w*I+S*ut+y*yt,f[10]=C*L+w*W+S*k+y*St,f[14]=C*b+w*et+S*st+y*Gt,f[3]=B*V+z*A+U*nt+Q*J,f[7]=B*P+z*I+U*ut+Q*yt,f[11]=B*L+z*W+U*k+Q*St,f[15]=B*b+z*et+U*st+Q*Gt,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],c=e[8],f=e[12],h=e[1],d=e[5],p=e[9],g=e[13],_=e[2],v=e[6],x=e[10],M=e[14],C=e[3],w=e[7],S=e[11],y=e[15];return C*(+f*p*v-c*g*v-f*d*x+s*g*x+c*d*M-s*p*M)+w*(+i*p*M-i*g*x+f*h*x-c*h*M+c*g*_-f*p*_)+S*(+i*g*v-i*d*M-f*h*v+s*h*M+f*d*_-s*g*_)+y*(-c*d*_-i*p*v+i*d*x+c*h*v-s*h*x+s*p*_)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const c=this.elements;return e.isVector3?(c[12]=e.x,c[13]=e.y,c[14]=e.z):(c[12]=e,c[13]=i,c[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],c=e[2],f=e[3],h=e[4],d=e[5],p=e[6],g=e[7],_=e[8],v=e[9],x=e[10],M=e[11],C=e[12],w=e[13],S=e[14],y=e[15],B=v*S*g-w*x*g+w*p*M-d*S*M-v*p*y+d*x*y,z=C*x*g-_*S*g-C*p*M+h*S*M+_*p*y-h*x*y,U=_*w*g-C*v*g+C*d*M-h*w*M-_*d*y+h*v*y,Q=C*v*p-_*w*p-C*d*x+h*w*x+_*d*S-h*v*S,V=i*B+s*z+c*U+f*Q;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/V;return e[0]=B*P,e[1]=(w*x*f-v*S*f-w*c*M+s*S*M+v*c*y-s*x*y)*P,e[2]=(d*S*f-w*p*f+w*c*g-s*S*g-d*c*y+s*p*y)*P,e[3]=(v*p*f-d*x*f-v*c*g+s*x*g+d*c*M-s*p*M)*P,e[4]=z*P,e[5]=(_*S*f-C*x*f+C*c*M-i*S*M-_*c*y+i*x*y)*P,e[6]=(C*p*f-h*S*f-C*c*g+i*S*g+h*c*y-i*p*y)*P,e[7]=(h*x*f-_*p*f+_*c*g-i*x*g-h*c*M+i*p*M)*P,e[8]=U*P,e[9]=(C*v*f-_*w*f-C*s*M+i*w*M+_*s*y-i*v*y)*P,e[10]=(h*w*f-C*d*f+C*s*g-i*w*g-h*s*y+i*d*y)*P,e[11]=(_*d*f-h*v*f-_*s*g+i*v*g+h*s*M-i*d*M)*P,e[12]=Q*P,e[13]=(_*w*c-C*v*c+C*s*x-i*w*x-_*s*S+i*v*S)*P,e[14]=(C*d*c-h*w*c-C*s*p+i*w*p+h*s*S-i*d*S)*P,e[15]=(h*v*c-_*d*c+_*s*p-i*v*p-h*s*x+i*d*x)*P,this}scale(e){const i=this.elements,s=e.x,c=e.y,f=e.z;return i[0]*=s,i[4]*=c,i[8]*=f,i[1]*=s,i[5]*=c,i[9]*=f,i[2]*=s,i[6]*=c,i[10]*=f,i[3]*=s,i[7]*=c,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],c=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,c))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),c=Math.sin(i),f=1-s,h=e.x,d=e.y,p=e.z,g=f*h,_=f*d;return this.set(g*h+s,g*d-c*p,g*p+c*d,0,g*d+c*p,_*d+s,_*p-c*h,0,g*p-c*d,_*p+c*h,f*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,c,f,h){return this.set(1,s,f,0,e,1,h,0,i,c,1,0,0,0,0,1),this}compose(e,i,s){const c=this.elements,f=i._x,h=i._y,d=i._z,p=i._w,g=f+f,_=h+h,v=d+d,x=f*g,M=f*_,C=f*v,w=h*_,S=h*v,y=d*v,B=p*g,z=p*_,U=p*v,Q=s.x,V=s.y,P=s.z;return c[0]=(1-(w+y))*Q,c[1]=(M+U)*Q,c[2]=(C-z)*Q,c[3]=0,c[4]=(M-U)*V,c[5]=(1-(x+y))*V,c[6]=(S+B)*V,c[7]=0,c[8]=(C+z)*P,c[9]=(S-B)*P,c[10]=(1-(x+w))*P,c[11]=0,c[12]=e.x,c[13]=e.y,c[14]=e.z,c[15]=1,this}decompose(e,i,s){const c=this.elements;let f=Ws.set(c[0],c[1],c[2]).length();const h=Ws.set(c[4],c[5],c[6]).length(),d=Ws.set(c[8],c[9],c[10]).length();this.determinant()<0&&(f=-f),e.x=c[12],e.y=c[13],e.z=c[14],Oi.copy(this);const g=1/f,_=1/h,v=1/d;return Oi.elements[0]*=g,Oi.elements[1]*=g,Oi.elements[2]*=g,Oi.elements[4]*=_,Oi.elements[5]*=_,Oi.elements[6]*=_,Oi.elements[8]*=v,Oi.elements[9]*=v,Oi.elements[10]*=v,i.setFromRotationMatrix(Oi),s.x=f,s.y=h,s.z=d,this}makePerspective(e,i,s,c,f,h,d=Ca){const p=this.elements,g=2*f/(i-e),_=2*f/(s-c),v=(i+e)/(i-e),x=(s+c)/(s-c);let M,C;if(d===Ca)M=-(h+f)/(h-f),C=-2*h*f/(h-f);else if(d===Ru)M=-h/(h-f),C=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=C,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,c,f,h,d=Ca){const p=this.elements,g=1/(i-e),_=1/(s-c),v=1/(h-f),x=(i+e)*g,M=(s+c)*_;let C,w;if(d===Ca)C=(h+f)*v,w=-2*v;else if(d===Ru)C=f*v,w=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*g,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*_,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=w,p[14]=-C,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let c=0;c<16;c++)if(i[c]!==s[c])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const Ws=new it,Oi=new rn,kE=new it(0,0,0),XE=new it(1,1,1),cr=new it,tu=new it,oi=new it,S_=new rn,M_=new ts;class Ua{constructor(e=0,i=0,s=0,c=Ua.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=c}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,c=this._order){return this._x=e,this._y=i,this._z=s,this._order=c,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const c=e.elements,f=c[0],h=c[4],d=c[8],p=c[1],g=c[5],_=c[9],v=c[2],x=c[6],M=c[10];switch(i){case"XYZ":this._y=Math.asin(xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(x,g),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(p,g)):(this._y=Math.atan2(-v,f),this._z=0);break;case"ZXY":this._x=Math.asin(xe(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-h,g)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-xe(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-h,g));break;case"YZX":this._z=Math.asin(xe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,g),this._y=Math.atan2(-v,f)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,g),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-_,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return S_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(S_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return M_.setFromEuler(this),this.setFromQuaternion(M_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ua.DEFAULT_ORDER="XYZ";class wx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qE=0;const E_=new it,js=new ts,Sa=new rn,eu=new it,ml=new it,YE=new it,WE=new ts,T_=new it(1,0,0),b_=new it(0,1,0),A_=new it(0,0,1),R_={type:"added"},jE={type:"removed"},Zs={type:"childadded",child:null},Ed={type:"childremoved",child:null};class hi extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qE++}),this.uuid=Ml(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hi.DEFAULT_UP.clone();const e=new it,i=new Ua,s=new ts,c=new it(1,1,1);function f(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(f),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:c},modelViewMatrix:{value:new rn},normalMatrix:{value:new fe}}),this.matrix=new rn,this.matrixWorld=new rn,this.matrixAutoUpdate=hi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return js.setFromAxisAngle(e,i),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,i){return js.setFromAxisAngle(e,i),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(T_,e)}rotateY(e){return this.rotateOnAxis(b_,e)}rotateZ(e){return this.rotateOnAxis(A_,e)}translateOnAxis(e,i){return E_.copy(e).applyQuaternion(this.quaternion),this.position.add(E_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(T_,e)}translateY(e){return this.translateOnAxis(b_,e)}translateZ(e){return this.translateOnAxis(A_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sa.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?eu.copy(e):eu.set(e,i,s);const c=this.parent;this.updateWorldMatrix(!0,!1),ml.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sa.lookAt(ml,eu,this.up):Sa.lookAt(eu,ml,this.up),this.quaternion.setFromRotationMatrix(Sa),c&&(Sa.extractRotation(c.matrixWorld),js.setFromRotationMatrix(Sa),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(R_),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(jE),Ed.child=e,this.dispatchEvent(Ed),Ed.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(R_),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,c=this.children.length;s<c;s++){const h=this.children[s].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const c=this.children;for(let f=0,h=c.length;f<h;f++)c[f].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ml,e,YE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ml,WE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,c=i.length;s<c;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,c=i.length;s<c;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,c=i.length;s<c;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const c=this.children;for(let f=0,h=c.length;f<h;f++)c[f].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const c={};c.uuid=this.uuid,c.type=this.type,this.name!==""&&(c.name=this.name),this.castShadow===!0&&(c.castShadow=!0),this.receiveShadow===!0&&(c.receiveShadow=!0),this.visible===!1&&(c.visible=!1),this.frustumCulled===!1&&(c.frustumCulled=!1),this.renderOrder!==0&&(c.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(c.userData=this.userData),c.layers=this.layers.mask,c.matrix=this.matrix.toArray(),c.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(c.matrixAutoUpdate=!1),this.isInstancedMesh&&(c.type="InstancedMesh",c.count=this.count,c.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(c.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(c.type="BatchedMesh",c.perObjectFrustumCulled=this.perObjectFrustumCulled,c.sortObjects=this.sortObjects,c.drawRanges=this._drawRanges,c.reservedRanges=this._reservedRanges,c.visibility=this._visibility,c.active=this._active,c.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),c.maxInstanceCount=this._maxInstanceCount,c.maxVertexCount=this._maxVertexCount,c.maxIndexCount=this._maxIndexCount,c.geometryInitialized=this._geometryInitialized,c.geometryCount=this._geometryCount,c.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(c.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(c.boundingSphere={center:c.boundingSphere.center.toArray(),radius:c.boundingSphere.radius}),this.boundingBox!==null&&(c.boundingBox={min:c.boundingBox.min.toArray(),max:c.boundingBox.max.toArray()}));function f(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?c.background=this.background.toJSON():this.background.isTexture&&(c.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(c.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){c.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let g=0,_=p.length;g<_;g++){const v=p[g];f(e.shapes,v)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(c.bindMode=this.bindMode,c.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),c.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,g=this.material.length;p<g;p++)d.push(f(e.materials,this.material[p]));c.material=d}else c.material=f(e.materials,this.material);if(this.children.length>0){c.children=[];for(let d=0;d<this.children.length;d++)c.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){c.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];c.animations.push(f(e.animations,p))}}if(i){const d=h(e.geometries),p=h(e.materials),g=h(e.textures),_=h(e.images),v=h(e.shapes),x=h(e.skeletons),M=h(e.animations),C=h(e.nodes);d.length>0&&(s.geometries=d),p.length>0&&(s.materials=p),g.length>0&&(s.textures=g),_.length>0&&(s.images=_),v.length>0&&(s.shapes=v),x.length>0&&(s.skeletons=x),M.length>0&&(s.animations=M),C.length>0&&(s.nodes=C)}return s.object=c,s;function h(d){const p=[];for(const g in d){const _=d[g];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const c=e.children[s];this.add(c.clone())}return this}}hi.DEFAULT_UP=new it(0,1,0);hi.DEFAULT_MATRIX_AUTO_UPDATE=!0;hi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pi=new it,Ma=new it,Td=new it,Ea=new it,Ks=new it,Qs=new it,C_=new it,bd=new it,Ad=new it,Rd=new it,Cd=new an,Dd=new an,wd=new an;class zi{constructor(e=new it,i=new it,s=new it){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,c){c.subVectors(s,i),Pi.subVectors(e,i),c.cross(Pi);const f=c.lengthSq();return f>0?c.multiplyScalar(1/Math.sqrt(f)):c.set(0,0,0)}static getBarycoord(e,i,s,c,f){Pi.subVectors(c,i),Ma.subVectors(s,i),Td.subVectors(e,i);const h=Pi.dot(Pi),d=Pi.dot(Ma),p=Pi.dot(Td),g=Ma.dot(Ma),_=Ma.dot(Td),v=h*g-d*d;if(v===0)return f.set(0,0,0),null;const x=1/v,M=(g*p-d*_)*x,C=(h*_-d*p)*x;return f.set(1-M-C,C,M)}static containsPoint(e,i,s,c){return this.getBarycoord(e,i,s,c,Ea)===null?!1:Ea.x>=0&&Ea.y>=0&&Ea.x+Ea.y<=1}static getInterpolation(e,i,s,c,f,h,d,p){return this.getBarycoord(e,i,s,c,Ea)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,Ea.x),p.addScaledVector(h,Ea.y),p.addScaledVector(d,Ea.z),p)}static getInterpolatedAttribute(e,i,s,c,f,h){return Cd.setScalar(0),Dd.setScalar(0),wd.setScalar(0),Cd.fromBufferAttribute(e,i),Dd.fromBufferAttribute(e,s),wd.fromBufferAttribute(e,c),h.setScalar(0),h.addScaledVector(Cd,f.x),h.addScaledVector(Dd,f.y),h.addScaledVector(wd,f.z),h}static isFrontFacing(e,i,s,c){return Pi.subVectors(s,i),Ma.subVectors(e,i),Pi.cross(Ma).dot(c)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,c){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[c]),this}setFromAttributeAndIndices(e,i,s,c){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,c),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pi.subVectors(this.c,this.b),Ma.subVectors(this.a,this.b),Pi.cross(Ma).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return zi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,c,f){return zi.getInterpolation(e,this.a,this.b,this.c,i,s,c,f)}containsPoint(e){return zi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,c=this.b,f=this.c;let h,d;Ks.subVectors(c,s),Qs.subVectors(f,s),bd.subVectors(e,s);const p=Ks.dot(bd),g=Qs.dot(bd);if(p<=0&&g<=0)return i.copy(s);Ad.subVectors(e,c);const _=Ks.dot(Ad),v=Qs.dot(Ad);if(_>=0&&v<=_)return i.copy(c);const x=p*v-_*g;if(x<=0&&p>=0&&_<=0)return h=p/(p-_),i.copy(s).addScaledVector(Ks,h);Rd.subVectors(e,f);const M=Ks.dot(Rd),C=Qs.dot(Rd);if(C>=0&&M<=C)return i.copy(f);const w=M*g-p*C;if(w<=0&&g>=0&&C<=0)return d=g/(g-C),i.copy(s).addScaledVector(Qs,d);const S=_*C-M*v;if(S<=0&&v-_>=0&&M-C>=0)return C_.subVectors(f,c),d=(v-_)/(v-_+(M-C)),i.copy(c).addScaledVector(C_,d);const y=1/(S+w+x);return h=w*y,d=x*y,i.copy(s).addScaledVector(Ks,h).addScaledVector(Qs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ux={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ur={h:0,s:0,l:0},nu={h:0,s:0,l:0};function Ud(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class He{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const c=e;c&&c.isColor?this.copy(c):typeof c=="number"?this.setHex(c):typeof c=="string"&&this.setStyle(c)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=ci){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,we.toWorkingColorSpace(this,i),this}setRGB(e,i,s,c=we.workingColorSpace){return this.r=e,this.g=i,this.b=s,we.toWorkingColorSpace(this,c),this}setHSL(e,i,s,c=we.workingColorSpace){if(e=wE(e,1),i=xe(i,0,1),s=xe(s,0,1),i===0)this.r=this.g=this.b=s;else{const f=s<=.5?s*(1+i):s+i-s*i,h=2*s-f;this.r=Ud(h,f,e+1/3),this.g=Ud(h,f,e),this.b=Ud(h,f,e-1/3)}return we.toWorkingColorSpace(this,c),this}setStyle(e,i=ci){function s(f){f!==void 0&&parseFloat(f)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let c;if(c=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=c[1],d=c[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(c=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=c[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=ci){const s=Ux[e.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}copyLinearToSRGB(e){return this.r=oo(e.r),this.g=oo(e.g),this.b=oo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ci){return we.fromWorkingColorSpace(Bn.copy(this),e),Math.round(xe(Bn.r*255,0,255))*65536+Math.round(xe(Bn.g*255,0,255))*256+Math.round(xe(Bn.b*255,0,255))}getHexString(e=ci){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=we.workingColorSpace){we.fromWorkingColorSpace(Bn.copy(this),i);const s=Bn.r,c=Bn.g,f=Bn.b,h=Math.max(s,c,f),d=Math.min(s,c,f);let p,g;const _=(d+h)/2;if(d===h)p=0,g=0;else{const v=h-d;switch(g=_<=.5?v/(h+d):v/(2-h-d),h){case s:p=(c-f)/v+(c<f?6:0);break;case c:p=(f-s)/v+2;break;case f:p=(s-c)/v+4;break}p/=6}return e.h=p,e.s=g,e.l=_,e}getRGB(e,i=we.workingColorSpace){return we.fromWorkingColorSpace(Bn.copy(this),i),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=ci){we.fromWorkingColorSpace(Bn.copy(this),e);const i=Bn.r,s=Bn.g,c=Bn.b;return e!==ci?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${c.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(c*255)})`}offsetHSL(e,i,s){return this.getHSL(ur),this.setHSL(ur.h+e,ur.s+i,ur.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ur),e.getHSL(nu);const s=pd(ur.h,nu.h,i),c=pd(ur.s,nu.s,i),f=pd(ur.l,nu.l,i);return this.setHSL(s,c,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,c=this.b,f=e.elements;return this.r=f[0]*i+f[3]*s+f[6]*c,this.g=f[1]*i+f[4]*s+f[7]*c,this.b=f[2]*i+f[5]*s+f[8]*c,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new He;He.NAMES=Ux;let ZE=0;class Uu extends es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ZE++}),this.uuid=Ml(),this.name="",this.type="Material",this.blending=ro,this.side=mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qd,this.blendDst=Yd,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=p_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const c=this[i];if(c===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}c&&c.isColor?c.set(s):c&&c.isVector3&&s&&s.isVector3?c.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==ro&&(s.blending=this.blending),this.side!==mr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==qd&&(s.blendSrc=this.blendSrc),this.blendDst!==Yd&&(s.blendDst=this.blendDst),this.blendEquation!==jr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==co&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==p_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function c(f){const h=[];for(const d in f){const p=f[d];delete p.metadata,h.push(p)}return h}if(i){const f=c(e.textures),h=c(e.images);f.length>0&&(s.textures=f),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const c=i.length;s=new Array(c);for(let f=0;f!==c;++f)s[f]=i[f].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Nx extends Uu{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ua,this.combine=px,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fn=new it,iu=new ue;let KE=0;class Ai{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:KE++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=m_,this.updateRanges=[],this.gpuType=Ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let c=0,f=this.itemSize;c<f;c++)this.array[e+c]=i.array[s+c];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)iu.fromBufferAttribute(this,i),iu.applyMatrix3(e),this.setXY(i,iu.x,iu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyMatrix3(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyMatrix4(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyNormalMatrix(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.transformDirection(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=hl(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Zn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=hl(i,this.array)),i}setX(e,i){return this.normalized&&(i=Zn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=hl(i,this.array)),i}setY(e,i){return this.normalized&&(i=Zn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=hl(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Zn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=hl(i,this.array)),i}setW(e,i){return this.normalized&&(i=Zn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Zn(i,this.array),s=Zn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,c){return e*=this.itemSize,this.normalized&&(i=Zn(i,this.array),s=Zn(s,this.array),c=Zn(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=c,this}setXYZW(e,i,s,c,f){return e*=this.itemSize,this.normalized&&(i=Zn(i,this.array),s=Zn(s,this.array),c=Zn(c,this.array),f=Zn(f,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=c,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==m_&&(e.usage=this.usage),e}}class Lx extends Ai{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class Ox extends Ai{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Jr extends Ai{constructor(e,i,s){super(new Float32Array(e),i,s)}}let QE=0;const Mi=new rn,Nd=new hi,Js=new it,li=new El,gl=new El,Tn=new it;class gr extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=Ml(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rx(e)?Ox:Lx)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const f=new fe().getNormalMatrix(e);s.applyNormalMatrix(f),s.needsUpdate=!0}const c=this.attributes.tangent;return c!==void 0&&(c.transformDirection(e),c.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,i,s){return Mi.makeTranslation(e,i,s),this.applyMatrix4(Mi),this}scale(e,i,s){return Mi.makeScale(e,i,s),this.applyMatrix4(Mi),this}lookAt(e){return Nd.lookAt(e),Nd.updateMatrix(),this.applyMatrix4(Nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let c=0,f=e.length;c<f;c++){const h=e[c];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Jr(s,3))}else{const s=Math.min(e.length,i.count);for(let c=0;c<s;c++){const f=e[c];i.setXYZ(c,f.x,f.y,f.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new El);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new it(-1/0,-1/0,-1/0),new it(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,c=i.length;s<c;s++){const f=i[s];li.setFromBufferAttribute(f),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kp);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new it,1/0);return}if(e){const s=this.boundingSphere.center;if(li.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];gl.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(li.min,gl.min),li.expandByPoint(Tn),Tn.addVectors(li.max,gl.max),li.expandByPoint(Tn)):(li.expandByPoint(gl.min),li.expandByPoint(gl.max))}li.getCenter(s);let c=0;for(let f=0,h=e.count;f<h;f++)Tn.fromBufferAttribute(e,f),c=Math.max(c,s.distanceToSquared(Tn));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],p=this.morphTargetsRelative;for(let g=0,_=d.count;g<_;g++)Tn.fromBufferAttribute(d,g),p&&(Js.fromBufferAttribute(e,g),Tn.add(Js)),c=Math.max(c,s.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(c),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,c=i.normal,f=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ai(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let L=0;L<s.count;L++)d[L]=new it,p[L]=new it;const g=new it,_=new it,v=new it,x=new ue,M=new ue,C=new ue,w=new it,S=new it;function y(L,b,A){g.fromBufferAttribute(s,L),_.fromBufferAttribute(s,b),v.fromBufferAttribute(s,A),x.fromBufferAttribute(f,L),M.fromBufferAttribute(f,b),C.fromBufferAttribute(f,A),_.sub(g),v.sub(g),M.sub(x),C.sub(x);const I=1/(M.x*C.y-C.x*M.y);isFinite(I)&&(w.copy(_).multiplyScalar(C.y).addScaledVector(v,-M.y).multiplyScalar(I),S.copy(v).multiplyScalar(M.x).addScaledVector(_,-C.x).multiplyScalar(I),d[L].add(w),d[b].add(w),d[A].add(w),p[L].add(S),p[b].add(S),p[A].add(S))}let B=this.groups;B.length===0&&(B=[{start:0,count:e.count}]);for(let L=0,b=B.length;L<b;++L){const A=B[L],I=A.start,W=A.count;for(let et=I,nt=I+W;et<nt;et+=3)y(e.getX(et+0),e.getX(et+1),e.getX(et+2))}const z=new it,U=new it,Q=new it,V=new it;function P(L){Q.fromBufferAttribute(c,L),V.copy(Q);const b=d[L];z.copy(b),z.sub(Q.multiplyScalar(Q.dot(b))).normalize(),U.crossVectors(V,b);const I=U.dot(p[L])<0?-1:1;h.setXYZW(L,z.x,z.y,z.z,I)}for(let L=0,b=B.length;L<b;++L){const A=B[L],I=A.start,W=A.count;for(let et=I,nt=I+W;et<nt;et+=3)P(e.getX(et+0)),P(e.getX(et+1)),P(e.getX(et+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ai(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,M=s.count;x<M;x++)s.setXYZ(x,0,0,0);const c=new it,f=new it,h=new it,d=new it,p=new it,g=new it,_=new it,v=new it;if(e)for(let x=0,M=e.count;x<M;x+=3){const C=e.getX(x+0),w=e.getX(x+1),S=e.getX(x+2);c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,w),h.fromBufferAttribute(i,S),_.subVectors(h,f),v.subVectors(c,f),_.cross(v),d.fromBufferAttribute(s,C),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,S),d.add(_),p.add(_),g.add(_),s.setXYZ(C,d.x,d.y,d.z),s.setXYZ(w,p.x,p.y,p.z),s.setXYZ(S,g.x,g.y,g.z)}else for(let x=0,M=i.count;x<M;x+=3)c.fromBufferAttribute(i,x+0),f.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),_.subVectors(h,f),v.subVectors(c,f),_.cross(v),s.setXYZ(x+0,_.x,_.y,_.z),s.setXYZ(x+1,_.x,_.y,_.z),s.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Tn.fromBufferAttribute(e,i),Tn.normalize(),e.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(d,p){const g=d.array,_=d.itemSize,v=d.normalized,x=new g.constructor(p.length*_);let M=0,C=0;for(let w=0,S=p.length;w<S;w++){d.isInterleavedBufferAttribute?M=p[w]*d.data.stride+d.offset:M=p[w]*_;for(let y=0;y<_;y++)x[C++]=g[M++]}return new Ai(x,_,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new gr,s=this.index.array,c=this.attributes;for(const d in c){const p=c[d],g=e(p,s);i.setAttribute(d,g)}const f=this.morphAttributes;for(const d in f){const p=[],g=f[d];for(let _=0,v=g.length;_<v;_++){const x=g[_],M=e(x,s);p.push(M)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const g=h[d];i.addGroup(g.start,g.count,g.materialIndex)}return i}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const g in p)p[g]!==void 0&&(e[g]=p[g]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const g=s[p];e.data.attributes[p]=g.toJSON(e.data)}const c={};let f=!1;for(const p in this.morphAttributes){const g=this.morphAttributes[p],_=[];for(let v=0,x=g.length;v<x;v++){const M=g[v];_.push(M.toJSON(e.data))}_.length>0&&(c[p]=_,f=!0)}f&&(e.data.morphAttributes=c,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(i));const c=e.attributes;for(const g in c){const _=c[g];this.setAttribute(g,_.clone(i))}const f=e.morphAttributes;for(const g in f){const _=[],v=f[g];for(let x=0,M=v.length;x<M;x++)_.push(v[x].clone(i));this.morphAttributes[g]=_}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let g=0,_=h.length;g<_;g++){const v=h[g];this.addGroup(v.start,v.count,v.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const D_=new rn,Vr=new Dx,au=new kp,w_=new it,ru=new it,su=new it,ou=new it,Ld=new it,lu=new it,U_=new it,cu=new it;class $i extends hi{constructor(e=new gr,i=new Nx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const c=i[s[0]];if(c!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=c.length;f<h;f++){const d=c[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const s=this.geometry,c=s.attributes.position,f=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(c,e);const d=this.morphTargetInfluences;if(f&&d){lu.set(0,0,0);for(let p=0,g=f.length;p<g;p++){const _=d[p],v=f[p];_!==0&&(Ld.fromBufferAttribute(v,e),h?lu.addScaledVector(Ld,_):lu.addScaledVector(Ld.sub(i),_))}i.add(lu)}return i}raycast(e,i){const s=this.geometry,c=this.material,f=this.matrixWorld;c!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),au.copy(s.boundingSphere),au.applyMatrix4(f),Vr.copy(e.ray).recast(e.near),!(au.containsPoint(Vr.origin)===!1&&(Vr.intersectSphere(au,w_)===null||Vr.origin.distanceToSquared(w_)>(e.far-e.near)**2))&&(D_.copy(f).invert(),Vr.copy(e.ray).applyMatrix4(D_),!(s.boundingBox!==null&&Vr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Vr)))}_computeIntersections(e,i,s){let c;const f=this.geometry,h=this.material,d=f.index,p=f.attributes.position,g=f.attributes.uv,_=f.attributes.uv1,v=f.attributes.normal,x=f.groups,M=f.drawRange;if(d!==null)if(Array.isArray(h))for(let C=0,w=x.length;C<w;C++){const S=x[C],y=h[S.materialIndex],B=Math.max(S.start,M.start),z=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let U=B,Q=z;U<Q;U+=3){const V=d.getX(U),P=d.getX(U+1),L=d.getX(U+2);c=uu(this,y,e,s,g,_,v,V,P,L),c&&(c.faceIndex=Math.floor(U/3),c.face.materialIndex=S.materialIndex,i.push(c))}}else{const C=Math.max(0,M.start),w=Math.min(d.count,M.start+M.count);for(let S=C,y=w;S<y;S+=3){const B=d.getX(S),z=d.getX(S+1),U=d.getX(S+2);c=uu(this,h,e,s,g,_,v,B,z,U),c&&(c.faceIndex=Math.floor(S/3),i.push(c))}}else if(p!==void 0)if(Array.isArray(h))for(let C=0,w=x.length;C<w;C++){const S=x[C],y=h[S.materialIndex],B=Math.max(S.start,M.start),z=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let U=B,Q=z;U<Q;U+=3){const V=U,P=U+1,L=U+2;c=uu(this,y,e,s,g,_,v,V,P,L),c&&(c.faceIndex=Math.floor(U/3),c.face.materialIndex=S.materialIndex,i.push(c))}}else{const C=Math.max(0,M.start),w=Math.min(p.count,M.start+M.count);for(let S=C,y=w;S<y;S+=3){const B=S,z=S+1,U=S+2;c=uu(this,h,e,s,g,_,v,B,z,U),c&&(c.faceIndex=Math.floor(S/3),i.push(c))}}}}function JE(o,e,i,s,c,f,h,d){let p;if(e.side===Qn?p=s.intersectTriangle(h,f,c,!0,d):p=s.intersectTriangle(c,f,h,e.side===mr,d),p===null)return null;cu.copy(d),cu.applyMatrix4(o.matrixWorld);const g=i.ray.origin.distanceTo(cu);return g<i.near||g>i.far?null:{distance:g,point:cu.clone(),object:o}}function uu(o,e,i,s,c,f,h,d,p,g){o.getVertexPosition(d,ru),o.getVertexPosition(p,su),o.getVertexPosition(g,ou);const _=JE(o,e,i,s,ru,su,ou,U_);if(_){const v=new it;zi.getBarycoord(U_,ru,su,ou,v),c&&(_.uv=zi.getInterpolatedAttribute(c,d,p,g,v,new ue)),f&&(_.uv1=zi.getInterpolatedAttribute(f,d,p,g,v,new ue)),h&&(_.normal=zi.getInterpolatedAttribute(h,d,p,g,v,new it),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const x={a:d,b:p,c:g,normal:new it,materialIndex:0};zi.getNormal(ru,su,ou,x.normal),_.face=x,_.barycoord=v}return _}class Tl extends gr{constructor(e=1,i=1,s=1,c=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:c,heightSegments:f,depthSegments:h};const d=this;c=Math.floor(c),f=Math.floor(f),h=Math.floor(h);const p=[],g=[],_=[],v=[];let x=0,M=0;C("z","y","x",-1,-1,s,i,e,h,f,0),C("z","y","x",1,-1,s,i,-e,h,f,1),C("x","z","y",1,1,e,s,i,c,h,2),C("x","z","y",1,-1,e,s,-i,c,h,3),C("x","y","z",1,-1,e,i,s,c,f,4),C("x","y","z",-1,-1,e,i,-s,c,f,5),this.setIndex(p),this.setAttribute("position",new Jr(g,3)),this.setAttribute("normal",new Jr(_,3)),this.setAttribute("uv",new Jr(v,2));function C(w,S,y,B,z,U,Q,V,P,L,b){const A=U/P,I=Q/L,W=U/2,et=Q/2,nt=V/2,ut=P+1,k=L+1;let st=0,J=0;const yt=new it;for(let St=0;St<k;St++){const Gt=St*I-et;for(let ee=0;ee<ut;ee++){const Te=ee*A-W;yt[w]=Te*B,yt[S]=Gt*z,yt[y]=nt,g.push(yt.x,yt.y,yt.z),yt[w]=0,yt[S]=0,yt[y]=V>0?1:-1,_.push(yt.x,yt.y,yt.z),v.push(ee/P),v.push(1-St/L),st+=1}}for(let St=0;St<L;St++)for(let Gt=0;Gt<P;Gt++){const ee=x+Gt+ut*St,Te=x+Gt+ut*(St+1),D=x+(Gt+1)+ut*(St+1),Z=x+(Gt+1)+ut*St;p.push(ee,Te,Z),p.push(Te,D,Z),J+=6}d.addGroup(M,J,b),M+=J,x+=st}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function go(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const c=o[i][s];c&&(c.isColor||c.isMatrix3||c.isMatrix4||c.isVector2||c.isVector3||c.isVector4||c.isTexture||c.isQuaternion)?c.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=c.clone():Array.isArray(c)?e[i][s]=c.slice():e[i][s]=c}}return e}function kn(o){const e={};for(let i=0;i<o.length;i++){const s=go(o[i]);for(const c in s)e[c]=s[c]}return e}function $E(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function Px(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:we.workingColorSpace}const tT={clone:go,merge:kn};var eT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends Uu{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eT,this.fragmentShader=nT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=go(e.uniforms),this.uniformsGroups=$E(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const c in this.uniforms){const h=this.uniforms[c].value;h&&h.isTexture?i.uniforms[c]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[c]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[c]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[c]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[c]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[c]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[c]={type:"m4",value:h.toArray()}:i.uniforms[c]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const c in this.extensions)this.extensions[c]===!0&&(s[c]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class zx extends hi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rn,this.projectionMatrix=new rn,this.projectionMatrixInverse=new rn,this.coordinateSystem=Ca}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fr=new it,N_=new ue,L_=new ue;class Ei extends zx{constructor(e=50,i=1,s=.1,c=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=c,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=wp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Eu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wp*2*Math.atan(Math.tan(Eu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fr.x,fr.y).multiplyScalar(-e/fr.z),fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(fr.x,fr.y).multiplyScalar(-e/fr.z)}getViewSize(e,i){return this.getViewBounds(e,N_,L_),i.subVectors(L_,N_)}setViewOffset(e,i,s,c,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=c,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Eu*.5*this.fov)/this.zoom,s=2*i,c=this.aspect*s,f=-.5*c;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,g=h.fullHeight;f+=h.offsetX*c/p,i-=h.offsetY*s/g,c*=h.width/p,s*=h.height/g}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+c,i,i-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const $s=-90,to=1;class iT extends hi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const c=new Ei($s,to,e,i);c.layers=this.layers,this.add(c);const f=new Ei($s,to,e,i);f.layers=this.layers,this.add(f);const h=new Ei($s,to,e,i);h.layers=this.layers,this.add(h);const d=new Ei($s,to,e,i);d.layers=this.layers,this.add(d);const p=new Ei($s,to,e,i);p.layers=this.layers,this.add(p);const g=new Ei($s,to,e,i);g.layers=this.layers,this.add(g)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,c,f,h,d,p]=i;for(const g of i)this.remove(g);if(e===Ca)s.up.set(0,1,0),s.lookAt(1,0,0),c.up.set(0,1,0),c.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Ru)s.up.set(0,-1,0),s.lookAt(-1,0,0),c.up.set(0,-1,0),c.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const g of i)this.add(g),g.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:c}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,p,g,_]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),C=e.xr.enabled;e.xr.enabled=!1;const w=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,c),e.render(i,f),e.setRenderTarget(s,1,c),e.render(i,h),e.setRenderTarget(s,2,c),e.render(i,d),e.setRenderTarget(s,3,c),e.render(i,p),e.setRenderTarget(s,4,c),e.render(i,g),s.texture.generateMipmaps=w,e.setRenderTarget(s,5,c),e.render(i,_),e.setRenderTarget(v,x,M),e.xr.enabled=C,s.texture.needsPMREMUpdate=!0}}class Ix extends Jn{constructor(e,i,s,c,f,h,d,p,g,_){e=e!==void 0?e:[],i=i!==void 0?i:uo,super(e,i,s,c,f,h,d,p,g,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class aT extends ta{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},c=[s,s,s,s,s,s];this.texture=new Ix(c,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Ti}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},c=new Tl(5,5,5),f=new ui({name:"CubemapFromEquirect",uniforms:go(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Qn,blending:pr});f.uniforms.tEquirect.value=i;const h=new $i(c,f),d=i.minFilter;return i.minFilter===Qr&&(i.minFilter=Ti),new iT(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i,s,c){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,s,c);e.setRenderTarget(f)}}class fu extends hi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rT={type:"move"};class Od{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new it,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new it),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new it,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new it),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let c=null,f=null,h=null;const d=this._targetRay,p=this._grip,g=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(g&&e.hand){h=!0;for(const w of e.hand.values()){const S=i.getJointPose(w,s),y=this._getHandJoint(g,w);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const _=g.joints["index-finger-tip"],v=g.joints["thumb-tip"],x=_.position.distanceTo(v.position),M=.02,C=.005;g.inputState.pinching&&x>M+C?(g.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!g.inputState.pinching&&x<=M-C&&(g.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,s),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(c=i.getPose(e.targetRaySpace,s),c===null&&f!==null&&(c=f),c!==null&&(d.matrix.fromArray(c.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,c.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(c.linearVelocity)):d.hasLinearVelocity=!1,c.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(c.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(rT)))}return d!==null&&(d.visible=c!==null),p!==null&&(p.visible=f!==null),g!==null&&(g.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new fu;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}class sT extends hi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ua,this.environmentIntensity=1,this.environmentRotation=new Ua,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Pd=new it,oT=new it,lT=new fe;class hr{constructor(e=new it(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,c){return this.normal.set(e,i,s),this.constant=c,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const c=Pd.subVectors(s,i).cross(oT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(c,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(Pd),c=this.normal.dot(s);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return f<0||f>1?null:i.copy(e.start).addScaledVector(s,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||lT.getNormalMatrix(e),c=this.coplanarPoint(Pd).applyMatrix4(e),f=this.normal.applyMatrix3(s).normalize();return this.constant=-c.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kr=new kp,hu=new it;class Bx{constructor(e=new hr,i=new hr,s=new hr,c=new hr,f=new hr,h=new hr){this.planes=[e,i,s,c,f,h]}set(e,i,s,c,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(s),d[3].copy(c),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Ca){const s=this.planes,c=e.elements,f=c[0],h=c[1],d=c[2],p=c[3],g=c[4],_=c[5],v=c[6],x=c[7],M=c[8],C=c[9],w=c[10],S=c[11],y=c[12],B=c[13],z=c[14],U=c[15];if(s[0].setComponents(p-f,x-g,S-M,U-y).normalize(),s[1].setComponents(p+f,x+g,S+M,U+y).normalize(),s[2].setComponents(p+h,x+_,S+C,U+B).normalize(),s[3].setComponents(p-h,x-_,S-C,U-B).normalize(),s[4].setComponents(p-d,x-v,S-w,U-z).normalize(),i===Ca)s[5].setComponents(p+d,x+v,S+w,U+z).normalize();else if(i===Ru)s[5].setComponents(d,v,w,z).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kr)}intersectsSprite(e){return kr.center.set(0,0,0),kr.radius=.7071067811865476,kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSphere(e){const i=this.planes,s=e.center,c=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(s)<c)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const c=i[s];if(hu.x=c.normal.x>0?e.max.x:e.min.x,hu.y=c.normal.y>0?e.max.y:e.min.y,hu.z=c.normal.z>0?e.max.z:e.min.z,c.distanceToPoint(hu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fx extends Jn{constructor(e,i,s,c,f,h,d,p,g,_=so){if(_!==so&&_!==po)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&_===so&&(s=$r),s===void 0&&_===po&&(s=ho),super(null,c,f,h,d,p,_,s,g),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=d!==void 0?d:Ii,this.minFilter=p!==void 0?p:Ii,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Nu extends gr{constructor(e=1,i=1,s=1,c=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:c};const f=e/2,h=i/2,d=Math.floor(s),p=Math.floor(c),g=d+1,_=p+1,v=e/d,x=i/p,M=[],C=[],w=[],S=[];for(let y=0;y<_;y++){const B=y*x-h;for(let z=0;z<g;z++){const U=z*v-f;C.push(U,-B,0),w.push(0,0,1),S.push(z/d),S.push(1-y/p)}}for(let y=0;y<p;y++)for(let B=0;B<d;B++){const z=B+g*y,U=B+g*(y+1),Q=B+1+g*(y+1),V=B+1+g*y;M.push(z,U,V),M.push(U,Q,V)}this.setIndex(M),this.setAttribute("position",new Jr(C,3)),this.setAttribute("normal",new Jr(w,3)),this.setAttribute("uv",new Jr(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nu(e.width,e.height,e.widthSegments,e.heightSegments)}}class cT extends Uu{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uT extends Uu{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Hx extends zx{constructor(e=-1,i=1,s=1,c=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=c,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,c,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=c,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,c=(this.top+this.bottom)/2;let f=s-e,h=s+e,d=c+i,p=c-i;if(this.view!==null&&this.view.enabled){const g=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=g*this.view.offsetX,h=f+g*this.view.width,d-=_*this.view.offsetY,p=d-_*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class fT extends Ei{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class O_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(xe(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class hT extends es{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function P_(o,e,i,s){const c=dT(s);switch(i){case xx:return o*e;case Sx:return o*e;case Mx:return o*e*2;case Ex:return o*e/c.components*c.byteLength;case Fp:return o*e/c.components*c.byteLength;case Tx:return o*e*2/c.components*c.byteLength;case Hp:return o*e*2/c.components*c.byteLength;case yx:return o*e*3/c.components*c.byteLength;case bi:return o*e*4/c.components*c.byteLength;case Gp:return o*e*4/c.components*c.byteLength;case _u:case xu:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case yu:case Su:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case rp:case op:return Math.max(o,16)*Math.max(e,8)/4;case ap:case sp:return Math.max(o,8)*Math.max(e,8)/2;case lp:case cp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case up:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case fp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case hp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case dp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case pp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case mp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case gp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case vp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case _p:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case xp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case yp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Mp:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Ep:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Tp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Mu:case bp:case Ap:return Math.ceil(o/4)*Math.ceil(e/4)*16;case bx:case Rp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Cp:case Dp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function dT(o){switch(o){case Bi:case gx:return{byteLength:1,components:1};case Sl:case vx:case vo:return{byteLength:2,components:1};case Ip:case Bp:return{byteLength:2,components:4};case $r:case zp:case Ra:return{byteLength:4,components:1};case _x:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gx(){let o=null,e=!1,i=null,s=null;function c(f,h){i(f,h),s=o.requestAnimationFrame(c)}return{start:function(){e!==!0&&i!==null&&(s=o.requestAnimationFrame(c),e=!0)},stop:function(){o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function pT(o){const e=new WeakMap;function i(d,p){const g=d.array,_=d.usage,v=g.byteLength,x=o.createBuffer();o.bindBuffer(p,x),o.bufferData(p,g,_),d.onUploadCallback();let M;if(g instanceof Float32Array)M=o.FLOAT;else if(g instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=o.SHORT;else if(g instanceof Uint32Array)M=o.UNSIGNED_INT;else if(g instanceof Int32Array)M=o.INT;else if(g instanceof Int8Array)M=o.BYTE;else if(g instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:x,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:d.version,size:v}}function s(d,p,g){const _=p.array,v=p.updateRanges;if(o.bindBuffer(g,d),v.length===0)o.bufferSubData(g,0,_);else{v.sort((M,C)=>M.start-C.start);let x=0;for(let M=1;M<v.length;M++){const C=v[x],w=v[M];w.start<=C.start+C.count+1?C.count=Math.max(C.count,w.start+w.count-C.start):(++x,v[x]=w)}v.length=x+1;for(let M=0,C=v.length;M<C;M++){const w=v[M];o.bufferSubData(g,w.start*_.BYTES_PER_ELEMENT,_,w.start,w.count)}p.clearUpdateRanges()}p.onUploadCallback()}function c(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(o.deleteBuffer(p.buffer),e.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const _=e.get(d);(!_||_.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const g=e.get(d);if(g===void 0)e.set(d,i(d,p));else if(g.version<d.version){if(g.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(g.buffer,d,p),g.version=d.version}}return{get:c,remove:f,update:h}}var mT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gT=`#ifdef USE_ALPHAHASH
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
#endif`,vT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_T=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ST=`#ifdef USE_AOMAP
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
#endif`,MT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ET=`#ifdef USE_BATCHING
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
#endif`,TT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,CT=`#ifdef USE_IRIDESCENCE
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
#endif`,DT=`#ifdef USE_BUMPMAP
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
#endif`,wT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,UT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,NT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,LT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,OT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,PT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,IT=`#if defined( USE_COLOR_ALPHA )
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
#endif`,BT=`#define PI 3.141592653589793
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
} // validated`,FT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HT=`vec3 transformedNormal = objectNormal;
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
#endif`,GT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,VT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qT="gl_FragColor = linearToOutputTexel( gl_FragColor );",YT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,WT=`#ifdef USE_ENVMAP
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
#endif`,jT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ZT=`#ifdef USE_ENVMAP
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
#endif`,KT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QT=`#ifdef USE_ENVMAP
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
#endif`,JT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$T=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nb=`#ifdef USE_GRADIENTMAP
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
}`,ib=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ab=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sb=`uniform bool receiveShadow;
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
#endif`,ob=`#ifdef USE_ENVMAP
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
#endif`,lb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ub=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hb=`PhysicalMaterial material;
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
#endif`,db=`struct PhysicalMaterial {
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
}`,pb=`
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
#endif`,mb=`#if defined( RE_IndirectDiffuse )
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
#endif`,gb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_b=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Eb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tb=`#if defined( USE_POINTS_UV )
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
#endif`,bb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ab=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Db=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wb=`#ifdef USE_MORPHTARGETS
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
#endif`,Ub=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ob=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ib=`#ifdef USE_NORMALMAP
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
#endif`,Bb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$b=`float getShadowMask() {
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
}`,t1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e1=`#ifdef USE_SKINNING
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
#endif`,n1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i1=`#ifdef USE_SKINNING
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
#endif`,a1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,s1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,l1=`#ifdef USE_TRANSMISSION
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
#endif`,c1=`#ifdef USE_TRANSMISSION
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
#endif`,u1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const p1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m1=`uniform sampler2D t2D;
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
}`,g1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y1=`#include <common>
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
}`,S1=`#if DEPTH_PACKING == 3200
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
}`,M1=`#define DISTANCE
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
}`,E1=`#define DISTANCE
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
}`,T1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,b1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A1=`uniform float scale;
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
}`,R1=`uniform vec3 diffuse;
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
}`,C1=`#include <common>
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
}`,D1=`uniform vec3 diffuse;
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
}`,w1=`#define LAMBERT
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
}`,U1=`#define LAMBERT
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
}`,N1=`#define MATCAP
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
}`,L1=`#define MATCAP
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
}`,O1=`#define NORMAL
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
}`,P1=`#define NORMAL
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
}`,z1=`#define PHONG
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
}`,I1=`#define PHONG
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
}`,B1=`#define STANDARD
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
}`,F1=`#define STANDARD
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
}`,H1=`#define TOON
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
}`,G1=`#define TOON
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
}`,V1=`uniform float size;
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
}`,k1=`uniform vec3 diffuse;
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
}`,X1=`#include <common>
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
}`,q1=`uniform vec3 color;
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
}`,Y1=`uniform float rotation;
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
}`,W1=`uniform vec3 diffuse;
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
}`,he={alphahash_fragment:mT,alphahash_pars_fragment:gT,alphamap_fragment:vT,alphamap_pars_fragment:_T,alphatest_fragment:xT,alphatest_pars_fragment:yT,aomap_fragment:ST,aomap_pars_fragment:MT,batching_pars_vertex:ET,batching_vertex:TT,begin_vertex:bT,beginnormal_vertex:AT,bsdfs:RT,iridescence_fragment:CT,bumpmap_pars_fragment:DT,clipping_planes_fragment:wT,clipping_planes_pars_fragment:UT,clipping_planes_pars_vertex:NT,clipping_planes_vertex:LT,color_fragment:OT,color_pars_fragment:PT,color_pars_vertex:zT,color_vertex:IT,common:BT,cube_uv_reflection_fragment:FT,defaultnormal_vertex:HT,displacementmap_pars_vertex:GT,displacementmap_vertex:VT,emissivemap_fragment:kT,emissivemap_pars_fragment:XT,colorspace_fragment:qT,colorspace_pars_fragment:YT,envmap_fragment:WT,envmap_common_pars_fragment:jT,envmap_pars_fragment:ZT,envmap_pars_vertex:KT,envmap_physical_pars_fragment:ob,envmap_vertex:QT,fog_vertex:JT,fog_pars_vertex:$T,fog_fragment:tb,fog_pars_fragment:eb,gradientmap_pars_fragment:nb,lightmap_pars_fragment:ib,lights_lambert_fragment:ab,lights_lambert_pars_fragment:rb,lights_pars_begin:sb,lights_toon_fragment:lb,lights_toon_pars_fragment:cb,lights_phong_fragment:ub,lights_phong_pars_fragment:fb,lights_physical_fragment:hb,lights_physical_pars_fragment:db,lights_fragment_begin:pb,lights_fragment_maps:mb,lights_fragment_end:gb,logdepthbuf_fragment:vb,logdepthbuf_pars_fragment:_b,logdepthbuf_pars_vertex:xb,logdepthbuf_vertex:yb,map_fragment:Sb,map_pars_fragment:Mb,map_particle_fragment:Eb,map_particle_pars_fragment:Tb,metalnessmap_fragment:bb,metalnessmap_pars_fragment:Ab,morphinstance_vertex:Rb,morphcolor_vertex:Cb,morphnormal_vertex:Db,morphtarget_pars_vertex:wb,morphtarget_vertex:Ub,normal_fragment_begin:Nb,normal_fragment_maps:Lb,normal_pars_fragment:Ob,normal_pars_vertex:Pb,normal_vertex:zb,normalmap_pars_fragment:Ib,clearcoat_normal_fragment_begin:Bb,clearcoat_normal_fragment_maps:Fb,clearcoat_pars_fragment:Hb,iridescence_pars_fragment:Gb,opaque_fragment:Vb,packing:kb,premultiplied_alpha_fragment:Xb,project_vertex:qb,dithering_fragment:Yb,dithering_pars_fragment:Wb,roughnessmap_fragment:jb,roughnessmap_pars_fragment:Zb,shadowmap_pars_fragment:Kb,shadowmap_pars_vertex:Qb,shadowmap_vertex:Jb,shadowmask_pars_fragment:$b,skinbase_vertex:t1,skinning_pars_vertex:e1,skinning_vertex:n1,skinnormal_vertex:i1,specularmap_fragment:a1,specularmap_pars_fragment:r1,tonemapping_fragment:s1,tonemapping_pars_fragment:o1,transmission_fragment:l1,transmission_pars_fragment:c1,uv_pars_fragment:u1,uv_pars_vertex:f1,uv_vertex:h1,worldpos_vertex:d1,background_vert:p1,background_frag:m1,backgroundCube_vert:g1,backgroundCube_frag:v1,cube_vert:_1,cube_frag:x1,depth_vert:y1,depth_frag:S1,distanceRGBA_vert:M1,distanceRGBA_frag:E1,equirect_vert:T1,equirect_frag:b1,linedashed_vert:A1,linedashed_frag:R1,meshbasic_vert:C1,meshbasic_frag:D1,meshlambert_vert:w1,meshlambert_frag:U1,meshmatcap_vert:N1,meshmatcap_frag:L1,meshnormal_vert:O1,meshnormal_frag:P1,meshphong_vert:z1,meshphong_frag:I1,meshphysical_vert:B1,meshphysical_frag:F1,meshtoon_vert:H1,meshtoon_frag:G1,points_vert:V1,points_frag:k1,shadow_vert:X1,shadow_frag:q1,sprite_vert:Y1,sprite_frag:W1},Nt={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},Ji={basic:{uniforms:kn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:kn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:kn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:kn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:kn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:kn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:kn([Nt.points,Nt.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:kn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:kn([Nt.common,Nt.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:kn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:kn([Nt.sprite,Nt.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:kn([Nt.common,Nt.displacementmap,{referencePosition:{value:new it},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:kn([Nt.lights,Nt.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};Ji.physical={uniforms:kn([Ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};const du={r:0,b:0,g:0},Xr=new Ua,j1=new rn;function Z1(o,e,i,s,c,f,h){const d=new He(0);let p=f===!0?0:1,g,_,v=null,x=0,M=null;function C(z){let U=z.isScene===!0?z.background:null;return U&&U.isTexture&&(U=(z.backgroundBlurriness>0?i:e).get(U)),U}function w(z){let U=!1;const Q=C(z);Q===null?y(d,p):Q&&Q.isColor&&(y(Q,1),U=!0);const V=o.xr.getEnvironmentBlendMode();V==="additive"?s.buffers.color.setClear(0,0,0,1,h):V==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||U)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function S(z,U){const Q=C(U);Q&&(Q.isCubeTexture||Q.mapping===wu)?(_===void 0&&(_=new $i(new Tl(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:go(Ji.backgroundCube.uniforms),vertexShader:Ji.backgroundCube.vertexShader,fragmentShader:Ji.backgroundCube.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(V,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),c.update(_)),Xr.copy(U.backgroundRotation),Xr.x*=-1,Xr.y*=-1,Xr.z*=-1,Q.isCubeTexture&&Q.isRenderTargetTexture===!1&&(Xr.y*=-1,Xr.z*=-1),_.material.uniforms.envMap.value=Q,_.material.uniforms.flipEnvMap.value=Q.isCubeTexture&&Q.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(j1.makeRotationFromEuler(Xr)),_.material.toneMapped=we.getTransfer(Q.colorSpace)!==Be,(v!==Q||x!==Q.version||M!==o.toneMapping)&&(_.material.needsUpdate=!0,v=Q,x=Q.version,M=o.toneMapping),_.layers.enableAll(),z.unshift(_,_.geometry,_.material,0,0,null)):Q&&Q.isTexture&&(g===void 0&&(g=new $i(new Nu(2,2),new ui({name:"BackgroundMaterial",uniforms:go(Ji.background.uniforms),vertexShader:Ji.background.vertexShader,fragmentShader:Ji.background.fragmentShader,side:mr,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),Object.defineProperty(g.material,"map",{get:function(){return this.uniforms.t2D.value}}),c.update(g)),g.material.uniforms.t2D.value=Q,g.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,g.material.toneMapped=we.getTransfer(Q.colorSpace)!==Be,Q.matrixAutoUpdate===!0&&Q.updateMatrix(),g.material.uniforms.uvTransform.value.copy(Q.matrix),(v!==Q||x!==Q.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,v=Q,x=Q.version,M=o.toneMapping),g.layers.enableAll(),z.unshift(g,g.geometry,g.material,0,0,null))}function y(z,U){z.getRGB(du,Px(o)),s.buffers.color.setClear(du.r,du.g,du.b,U,h)}function B(){_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0),g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0)}return{getClearColor:function(){return d},setClearColor:function(z,U=1){d.set(z),p=U,y(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(z){p=z,y(d,p)},render:w,addToRenderList:S,dispose:B}}function K1(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},c=x(null);let f=c,h=!1;function d(A,I,W,et,nt){let ut=!1;const k=v(et,W,I);f!==k&&(f=k,g(f.object)),ut=M(A,et,W,nt),ut&&C(A,et,W,nt),nt!==null&&e.update(nt,o.ELEMENT_ARRAY_BUFFER),(ut||h)&&(h=!1,U(A,I,W,et),nt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(nt).buffer))}function p(){return o.createVertexArray()}function g(A){return o.bindVertexArray(A)}function _(A){return o.deleteVertexArray(A)}function v(A,I,W){const et=W.wireframe===!0;let nt=s[A.id];nt===void 0&&(nt={},s[A.id]=nt);let ut=nt[I.id];ut===void 0&&(ut={},nt[I.id]=ut);let k=ut[et];return k===void 0&&(k=x(p()),ut[et]=k),k}function x(A){const I=[],W=[],et=[];for(let nt=0;nt<i;nt++)I[nt]=0,W[nt]=0,et[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:et,object:A,attributes:{},index:null}}function M(A,I,W,et){const nt=f.attributes,ut=I.attributes;let k=0;const st=W.getAttributes();for(const J in st)if(st[J].location>=0){const St=nt[J];let Gt=ut[J];if(Gt===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(Gt=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(Gt=A.instanceColor)),St===void 0||St.attribute!==Gt||Gt&&St.data!==Gt.data)return!0;k++}return f.attributesNum!==k||f.index!==et}function C(A,I,W,et){const nt={},ut=I.attributes;let k=0;const st=W.getAttributes();for(const J in st)if(st[J].location>=0){let St=ut[J];St===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(St=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(St=A.instanceColor));const Gt={};Gt.attribute=St,St&&St.data&&(Gt.data=St.data),nt[J]=Gt,k++}f.attributes=nt,f.attributesNum=k,f.index=et}function w(){const A=f.newAttributes;for(let I=0,W=A.length;I<W;I++)A[I]=0}function S(A){y(A,0)}function y(A,I){const W=f.newAttributes,et=f.enabledAttributes,nt=f.attributeDivisors;W[A]=1,et[A]===0&&(o.enableVertexAttribArray(A),et[A]=1),nt[A]!==I&&(o.vertexAttribDivisor(A,I),nt[A]=I)}function B(){const A=f.newAttributes,I=f.enabledAttributes;for(let W=0,et=I.length;W<et;W++)I[W]!==A[W]&&(o.disableVertexAttribArray(W),I[W]=0)}function z(A,I,W,et,nt,ut,k){k===!0?o.vertexAttribIPointer(A,I,W,nt,ut):o.vertexAttribPointer(A,I,W,et,nt,ut)}function U(A,I,W,et){w();const nt=et.attributes,ut=W.getAttributes(),k=I.defaultAttributeValues;for(const st in ut){const J=ut[st];if(J.location>=0){let yt=nt[st];if(yt===void 0&&(st==="instanceMatrix"&&A.instanceMatrix&&(yt=A.instanceMatrix),st==="instanceColor"&&A.instanceColor&&(yt=A.instanceColor)),yt!==void 0){const St=yt.normalized,Gt=yt.itemSize,ee=e.get(yt);if(ee===void 0)continue;const Te=ee.buffer,D=ee.type,Z=ee.bytesPerElement,gt=D===o.INT||D===o.UNSIGNED_INT||yt.gpuType===zp;if(yt.isInterleavedBufferAttribute){const ht=yt.data,bt=ht.stride,kt=yt.offset;if(ht.isInstancedInterleavedBuffer){for(let wt=0;wt<J.locationSize;wt++)y(J.location+wt,ht.meshPerAttribute);A.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let wt=0;wt<J.locationSize;wt++)S(J.location+wt);o.bindBuffer(o.ARRAY_BUFFER,Te);for(let wt=0;wt<J.locationSize;wt++)z(J.location+wt,Gt/J.locationSize,D,St,bt*Z,(kt+Gt/J.locationSize*wt)*Z,gt)}else{if(yt.isInstancedBufferAttribute){for(let ht=0;ht<J.locationSize;ht++)y(J.location+ht,yt.meshPerAttribute);A.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let ht=0;ht<J.locationSize;ht++)S(J.location+ht);o.bindBuffer(o.ARRAY_BUFFER,Te);for(let ht=0;ht<J.locationSize;ht++)z(J.location+ht,Gt/J.locationSize,D,St,Gt*Z,Gt/J.locationSize*ht*Z,gt)}}else if(k!==void 0){const St=k[st];if(St!==void 0)switch(St.length){case 2:o.vertexAttrib2fv(J.location,St);break;case 3:o.vertexAttrib3fv(J.location,St);break;case 4:o.vertexAttrib4fv(J.location,St);break;default:o.vertexAttrib1fv(J.location,St)}}}}B()}function Q(){L();for(const A in s){const I=s[A];for(const W in I){const et=I[W];for(const nt in et)_(et[nt].object),delete et[nt];delete I[W]}delete s[A]}}function V(A){if(s[A.id]===void 0)return;const I=s[A.id];for(const W in I){const et=I[W];for(const nt in et)_(et[nt].object),delete et[nt];delete I[W]}delete s[A.id]}function P(A){for(const I in s){const W=s[I];if(W[A.id]===void 0)continue;const et=W[A.id];for(const nt in et)_(et[nt].object),delete et[nt];delete W[A.id]}}function L(){b(),h=!0,f!==c&&(f=c,g(f.object))}function b(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:L,resetDefaultState:b,dispose:Q,releaseStatesOfGeometry:V,releaseStatesOfProgram:P,initAttributes:w,enableAttribute:S,disableUnusedAttributes:B}}function Q1(o,e,i){let s;function c(g){s=g}function f(g,_){o.drawArrays(s,g,_),i.update(_,s,1)}function h(g,_,v){v!==0&&(o.drawArraysInstanced(s,g,_,v),i.update(_,s,v))}function d(g,_,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,g,0,_,0,v);let M=0;for(let C=0;C<v;C++)M+=_[C];i.update(M,s,1)}function p(g,_,v,x){if(v===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let C=0;C<g.length;C++)h(g[C],_[C],x[C]);else{M.multiDrawArraysInstancedWEBGL(s,g,0,_,0,x,0,v);let C=0;for(let w=0;w<v;w++)C+=_[w]*x[w];i.update(C,s,1)}}this.setMode=c,this.render=f,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function J1(o,e,i,s){let c;function f(){if(c!==void 0)return c;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");c=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else c=0;return c}function h(P){return!(P!==bi&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const L=P===vo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Bi&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Ra&&!L)}function p(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let g=i.precision!==void 0?i.precision:"highp";const _=p(g);_!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",_,"instead."),g=_);const v=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),C=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=o.getParameter(o.MAX_TEXTURE_SIZE),S=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),y=o.getParameter(o.MAX_VERTEX_ATTRIBS),B=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),z=o.getParameter(o.MAX_VARYING_VECTORS),U=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),Q=C>0,V=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:g,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:C,maxTextureSize:w,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:B,maxVaryings:z,maxFragmentUniforms:U,vertexTextures:Q,maxSamples:V}}function $1(o){const e=this;let i=null,s=0,c=!1,f=!1;const h=new hr,d=new fe,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const M=v.length!==0||x||s!==0||c;return c=x,s=v.length,M},this.beginShadows=function(){f=!0,_(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(v,x){i=_(v,x,0)},this.setState=function(v,x,M){const C=v.clippingPlanes,w=v.clipIntersection,S=v.clipShadows,y=o.get(v);if(!c||C===null||C.length===0||f&&!S)f?_(null):g();else{const B=f?0:s,z=B*4;let U=y.clippingState||null;p.value=U,U=_(C,x,z,M);for(let Q=0;Q!==z;++Q)U[Q]=i[Q];y.clippingState=U,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=B}};function g(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(v,x,M,C){const w=v!==null?v.length:0;let S=null;if(w!==0){if(S=p.value,C!==!0||S===null){const y=M+w*4,B=x.matrixWorldInverse;d.getNormalMatrix(B),(S===null||S.length<y)&&(S=new Float32Array(y));for(let z=0,U=M;z!==w;++z,U+=4)h.copy(v[z]).applyMatrix4(B,d),h.normal.toArray(S,U),S[U+3]=h.constant}p.value=S,p.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,S}}function tA(o){let e=new WeakMap;function i(h,d){return d===tp?h.mapping=uo:d===ep&&(h.mapping=fo),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===tp||d===ep)if(e.has(h)){const p=e.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const g=new aT(p.height);return g.fromEquirectangularTexture(o,h),e.set(h,g),h.addEventListener("dispose",c),i(g.texture,h.mapping)}else return null}}return h}function c(h){const d=h.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){e=new WeakMap}return{get:s,dispose:f}}const io=4,z_=[.125,.215,.35,.446,.526,.582],Zr=20,zd=new Hx,I_=new He;let Id=null,Bd=0,Fd=0,Hd=!1;const Wr=(1+Math.sqrt(5))/2,eo=1/Wr,B_=[new it(-Wr,eo,0),new it(Wr,eo,0),new it(-eo,0,Wr),new it(eo,0,Wr),new it(0,Wr,-eo),new it(0,Wr,eo),new it(-1,1,-1),new it(1,1,-1),new it(-1,1,1),new it(1,1,1)],eA=new it;class F_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,s=.1,c=100,f={}){const{size:h=256,position:d=eA}=f;Id=this._renderer.getRenderTarget(),Bd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,c,p,d),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=V_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=G_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Id,Bd,Fd),this._renderer.xr.enabled=Hd,e.scissorTest=!1,pu(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===uo||e.mapping===fo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Id=this._renderer.getRenderTarget(),Bd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Ti,minFilter:Ti,generateMipmaps:!1,type:vo,format:bi,colorSpace:mo,depthBuffer:!1},c=H_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=H_(e,i,s);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nA(f)),this._blurMaterial=iA(f,e,i)}return c}_compileMaterial(e){const i=new $i(this._lodPlanes[0],e);this._renderer.compile(i,zd)}_sceneToCubeUV(e,i,s,c,f){const p=new Ei(90,1,i,s),g=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,x=v.autoClear,M=v.toneMapping;v.getClearColor(I_),v.toneMapping=Da,v.autoClear=!1;const C=new Nx({name:"PMREM.Background",side:Qn,depthWrite:!1,depthTest:!1}),w=new $i(new Tl,C);let S=!1;const y=e.background;y?y.isColor&&(C.color.copy(y),e.background=null,S=!0):(C.color.copy(I_),S=!0);for(let B=0;B<6;B++){const z=B%3;z===0?(p.up.set(0,g[B],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+_[B],f.y,f.z)):z===1?(p.up.set(0,0,g[B]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+_[B],f.z)):(p.up.set(0,g[B],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+_[B]));const U=this._cubeSize;pu(c,z*U,B>2?U:0,U,U),v.setRenderTarget(c),S&&v.render(w,p),v.render(e,p)}w.geometry.dispose(),w.material.dispose(),v.toneMapping=M,v.autoClear=x,e.background=y}_textureToCubeUV(e,i){const s=this._renderer,c=e.mapping===uo||e.mapping===fo;c?(this._cubemapMaterial===null&&(this._cubemapMaterial=V_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=G_());const f=c?this._cubemapMaterial:this._equirectMaterial,h=new $i(this._lodPlanes[0],f),d=f.uniforms;d.envMap.value=e;const p=this._cubeSize;pu(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(h,zd)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const c=this._lodPlanes.length;for(let f=1;f<c;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),d=B_[(c-f-1)%B_.length];this._blur(e,f-1,f,h,d)}i.autoClear=s}_blur(e,i,s,c,f){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,s,c,"latitudinal",f),this._halfBlur(h,e,s,s,c,"longitudinal",f)}_halfBlur(e,i,s,c,f,h,d){const p=this._renderer,g=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,v=new $i(this._lodPlanes[c],g),x=g.uniforms,M=this._sizeLods[s]-1,C=isFinite(f)?Math.PI/(2*M):2*Math.PI/(2*Zr-1),w=f/C,S=isFinite(f)?1+Math.floor(_*w):Zr;S>Zr&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Zr}`);const y=[];let B=0;for(let P=0;P<Zr;++P){const L=P/w,b=Math.exp(-L*L/2);y.push(b),P===0?B+=b:P<S&&(B+=2*b)}for(let P=0;P<y.length;P++)y[P]=y[P]/B;x.envMap.value=e.texture,x.samples.value=S,x.weights.value=y,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:z}=this;x.dTheta.value=C,x.mipInt.value=z-s;const U=this._sizeLods[c],Q=3*U*(c>z-io?c-z+io:0),V=4*(this._cubeSize-U);pu(i,Q,V,3*U,2*U),p.setRenderTarget(i),p.render(v,zd)}}function nA(o){const e=[],i=[],s=[];let c=o;const f=o-io+1+z_.length;for(let h=0;h<f;h++){const d=Math.pow(2,c);i.push(d);let p=1/d;h>o-io?p=z_[h-o+io-1]:h===0&&(p=0),s.push(p);const g=1/(d-2),_=-g,v=1+g,x=[_,_,v,_,v,v,_,_,v,v,_,v],M=6,C=6,w=3,S=2,y=1,B=new Float32Array(w*C*M),z=new Float32Array(S*C*M),U=new Float32Array(y*C*M);for(let V=0;V<M;V++){const P=V%3*2/3-1,L=V>2?0:-1,b=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];B.set(b,w*C*V),z.set(x,S*C*V);const A=[V,V,V,V,V,V];U.set(A,y*C*V)}const Q=new gr;Q.setAttribute("position",new Ai(B,w)),Q.setAttribute("uv",new Ai(z,S)),Q.setAttribute("faceIndex",new Ai(U,y)),e.push(Q),c>io&&c--}return{lodPlanes:e,sizeLods:i,sigmas:s}}function H_(o,e,i){const s=new ta(o,e,i);return s.texture.mapping=wu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function pu(o,e,i,s,c){o.viewport.set(e,i,s,c),o.scissor.set(e,i,s,c)}function iA(o,e,i){const s=new Float32Array(Zr),c=new it(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:c}},vertexShader:Xp(),fragmentShader:`

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
		`,blending:pr,depthTest:!1,depthWrite:!1})}function G_(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xp(),fragmentShader:`

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
		`,blending:pr,depthTest:!1,depthWrite:!1})}function V_(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function Xp(){return`

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
	`}function aA(o){let e=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const p=d.mapping,g=p===tp||p===ep,_=p===uo||p===fo;if(g||_){let v=e.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new F_(o)),v=g?i.fromEquirectangular(d,v):i.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),v.texture;if(v!==void 0)return v.texture;{const M=d.image;return g&&M&&M.height>0||_&&M&&c(M)?(i===null&&(i=new F_(o)),v=g?i.fromEquirectangular(d):i.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),d.addEventListener("dispose",f),v.texture):null}}}return d}function c(d){let p=0;const g=6;for(let _=0;_<g;_++)d[_]!==void 0&&p++;return p===g}function f(d){const p=d.target;p.removeEventListener("dispose",f);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function rA(o){const e={};function i(s){if(e[s]!==void 0)return e[s];let c;switch(s){case"WEBGL_depth_texture":c=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":c=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":c=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":c=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:c=o.getExtension(s)}return e[s]=c,c}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const c=i(s);return c===null&&Yr("THREE.WebGLRenderer: "+s+" extension not supported."),c}}}function sA(o,e,i,s){const c={},f=new WeakMap;function h(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const C in x.attributes)e.remove(x.attributes[C]);x.removeEventListener("dispose",h),delete c[x.id];const M=f.get(x);M&&(e.remove(M),f.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(v,x){return c[x.id]===!0||(x.addEventListener("dispose",h),c[x.id]=!0,i.memory.geometries++),x}function p(v){const x=v.attributes;for(const M in x)e.update(x[M],o.ARRAY_BUFFER)}function g(v){const x=[],M=v.index,C=v.attributes.position;let w=0;if(M!==null){const B=M.array;w=M.version;for(let z=0,U=B.length;z<U;z+=3){const Q=B[z+0],V=B[z+1],P=B[z+2];x.push(Q,V,V,P,P,Q)}}else if(C!==void 0){const B=C.array;w=C.version;for(let z=0,U=B.length/3-1;z<U;z+=3){const Q=z+0,V=z+1,P=z+2;x.push(Q,V,V,P,P,Q)}}else return;const S=new(Rx(x)?Ox:Lx)(x,1);S.version=w;const y=f.get(v);y&&e.remove(y),f.set(v,S)}function _(v){const x=f.get(v);if(x){const M=v.index;M!==null&&x.version<M.version&&g(v)}else g(v);return f.get(v)}return{get:d,update:p,getWireframeAttribute:_}}function oA(o,e,i){let s;function c(x){s=x}let f,h;function d(x){f=x.type,h=x.bytesPerElement}function p(x,M){o.drawElements(s,M,f,x*h),i.update(M,s,1)}function g(x,M,C){C!==0&&(o.drawElementsInstanced(s,M,f,x*h,C),i.update(M,s,C))}function _(x,M,C){if(C===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,f,x,0,C);let S=0;for(let y=0;y<C;y++)S+=M[y];i.update(S,s,1)}function v(x,M,C,w){if(C===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let y=0;y<x.length;y++)g(x[y]/h,M[y],w[y]);else{S.multiDrawElementsInstancedWEBGL(s,M,0,f,x,0,w,0,C);let y=0;for(let B=0;B<C;B++)y+=M[B]*w[B];i.update(y,s,1)}}this.setMode=c,this.setIndex=d,this.render=p,this.renderInstances=g,this.renderMultiDraw=_,this.renderMultiDrawInstances=v}function lA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function c(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:c,update:s}}function cA(o,e,i){const s=new WeakMap,c=new an;function f(h,d,p){const g=h.morphTargetInfluences,_=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=_!==void 0?_.length:0;let x=s.get(d);if(x===void 0||x.count!==v){let A=function(){L.dispose(),s.delete(d),d.removeEventListener("dispose",A)};var M=A;x!==void 0&&x.texture.dispose();const C=d.morphAttributes.position!==void 0,w=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],B=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let U=0;C===!0&&(U=1),w===!0&&(U=2),S===!0&&(U=3);let Q=d.attributes.position.count*U,V=1;Q>e.maxTextureSize&&(V=Math.ceil(Q/e.maxTextureSize),Q=e.maxTextureSize);const P=new Float32Array(Q*V*4*v),L=new Cx(P,Q,V,v);L.type=Ra,L.needsUpdate=!0;const b=U*4;for(let I=0;I<v;I++){const W=y[I],et=B[I],nt=z[I],ut=Q*V*4*I;for(let k=0;k<W.count;k++){const st=k*b;C===!0&&(c.fromBufferAttribute(W,k),P[ut+st+0]=c.x,P[ut+st+1]=c.y,P[ut+st+2]=c.z,P[ut+st+3]=0),w===!0&&(c.fromBufferAttribute(et,k),P[ut+st+4]=c.x,P[ut+st+5]=c.y,P[ut+st+6]=c.z,P[ut+st+7]=0),S===!0&&(c.fromBufferAttribute(nt,k),P[ut+st+8]=c.x,P[ut+st+9]=c.y,P[ut+st+10]=c.z,P[ut+st+11]=nt.itemSize===4?c.w:1)}}x={count:v,texture:L,size:new ue(Q,V)},s.set(d,x),d.addEventListener("dispose",A)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let C=0;for(let S=0;S<g.length;S++)C+=g[S];const w=d.morphTargetsRelative?1:1-C;p.getUniforms().setValue(o,"morphTargetBaseInfluence",w),p.getUniforms().setValue(o,"morphTargetInfluences",g)}p.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:f}}function uA(o,e,i,s){let c=new WeakMap;function f(p){const g=s.render.frame,_=p.geometry,v=e.get(p,_);if(c.get(v)!==g&&(e.update(v),c.set(v,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),c.get(p)!==g&&(i.update(p.instanceMatrix,o.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,o.ARRAY_BUFFER),c.set(p,g))),p.isSkinnedMesh){const x=p.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return v}function h(){c=new WeakMap}function d(p){const g=p.target;g.removeEventListener("dispose",d),i.remove(g.instanceMatrix),g.instanceColor!==null&&i.remove(g.instanceColor)}return{update:f,dispose:h}}const Vx=new Jn,k_=new Fx(1,1),kx=new Cx,Xx=new GE,qx=new Ix,X_=[],q_=[],Y_=new Float32Array(16),W_=new Float32Array(9),j_=new Float32Array(4);function _o(o,e,i){const s=o[0];if(s<=0||s>0)return o;const c=e*i;let f=X_[c];if(f===void 0&&(f=new Float32Array(c),X_[c]=f),e!==0){s.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function gn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function vn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function Lu(o,e){let i=q_[e];i===void 0&&(i=new Int32Array(e),q_[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function fA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function hA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2fv(this.addr,e),vn(i,e)}}function dA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(gn(i,e))return;o.uniform3fv(this.addr,e),vn(i,e)}}function pA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4fv(this.addr,e),vn(i,e)}}function mA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(gn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),vn(i,e)}else{if(gn(i,s))return;j_.set(s),o.uniformMatrix2fv(this.addr,!1,j_),vn(i,s)}}function gA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(gn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),vn(i,e)}else{if(gn(i,s))return;W_.set(s),o.uniformMatrix3fv(this.addr,!1,W_),vn(i,s)}}function vA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(gn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),vn(i,e)}else{if(gn(i,s))return;Y_.set(s),o.uniformMatrix4fv(this.addr,!1,Y_),vn(i,s)}}function _A(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function xA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2iv(this.addr,e),vn(i,e)}}function yA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gn(i,e))return;o.uniform3iv(this.addr,e),vn(i,e)}}function SA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4iv(this.addr,e),vn(i,e)}}function MA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function EA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2uiv(this.addr,e),vn(i,e)}}function TA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gn(i,e))return;o.uniform3uiv(this.addr,e),vn(i,e)}}function bA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4uiv(this.addr,e),vn(i,e)}}function AA(o,e,i){const s=this.cache,c=i.allocateTextureUnit();s[0]!==c&&(o.uniform1i(this.addr,c),s[0]=c);let f;this.type===o.SAMPLER_2D_SHADOW?(k_.compareFunction=Ax,f=k_):f=Vx,i.setTexture2D(e||f,c)}function RA(o,e,i){const s=this.cache,c=i.allocateTextureUnit();s[0]!==c&&(o.uniform1i(this.addr,c),s[0]=c),i.setTexture3D(e||Xx,c)}function CA(o,e,i){const s=this.cache,c=i.allocateTextureUnit();s[0]!==c&&(o.uniform1i(this.addr,c),s[0]=c),i.setTextureCube(e||qx,c)}function DA(o,e,i){const s=this.cache,c=i.allocateTextureUnit();s[0]!==c&&(o.uniform1i(this.addr,c),s[0]=c),i.setTexture2DArray(e||kx,c)}function wA(o){switch(o){case 5126:return fA;case 35664:return hA;case 35665:return dA;case 35666:return pA;case 35674:return mA;case 35675:return gA;case 35676:return vA;case 5124:case 35670:return _A;case 35667:case 35671:return xA;case 35668:case 35672:return yA;case 35669:case 35673:return SA;case 5125:return MA;case 36294:return EA;case 36295:return TA;case 36296:return bA;case 35678:case 36198:case 36298:case 36306:case 35682:return AA;case 35679:case 36299:case 36307:return RA;case 35680:case 36300:case 36308:case 36293:return CA;case 36289:case 36303:case 36311:case 36292:return DA}}function UA(o,e){o.uniform1fv(this.addr,e)}function NA(o,e){const i=_o(e,this.size,2);o.uniform2fv(this.addr,i)}function LA(o,e){const i=_o(e,this.size,3);o.uniform3fv(this.addr,i)}function OA(o,e){const i=_o(e,this.size,4);o.uniform4fv(this.addr,i)}function PA(o,e){const i=_o(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function zA(o,e){const i=_o(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function IA(o,e){const i=_o(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function BA(o,e){o.uniform1iv(this.addr,e)}function FA(o,e){o.uniform2iv(this.addr,e)}function HA(o,e){o.uniform3iv(this.addr,e)}function GA(o,e){o.uniform4iv(this.addr,e)}function VA(o,e){o.uniform1uiv(this.addr,e)}function kA(o,e){o.uniform2uiv(this.addr,e)}function XA(o,e){o.uniform3uiv(this.addr,e)}function qA(o,e){o.uniform4uiv(this.addr,e)}function YA(o,e,i){const s=this.cache,c=e.length,f=Lu(i,c);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==c;++h)i.setTexture2D(e[h]||Vx,f[h])}function WA(o,e,i){const s=this.cache,c=e.length,f=Lu(i,c);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==c;++h)i.setTexture3D(e[h]||Xx,f[h])}function jA(o,e,i){const s=this.cache,c=e.length,f=Lu(i,c);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==c;++h)i.setTextureCube(e[h]||qx,f[h])}function ZA(o,e,i){const s=this.cache,c=e.length,f=Lu(i,c);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==c;++h)i.setTexture2DArray(e[h]||kx,f[h])}function KA(o){switch(o){case 5126:return UA;case 35664:return NA;case 35665:return LA;case 35666:return OA;case 35674:return PA;case 35675:return zA;case 35676:return IA;case 5124:case 35670:return BA;case 35667:case 35671:return FA;case 35668:case 35672:return HA;case 35669:case 35673:return GA;case 5125:return VA;case 36294:return kA;case 36295:return XA;case 36296:return qA;case 35678:case 36198:case 36298:case 36306:case 35682:return YA;case 35679:case 36299:case 36307:return WA;case 35680:case 36300:case 36308:case 36293:return jA;case 36289:case 36303:case 36311:case 36292:return ZA}}class QA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=wA(i.type)}}class JA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=KA(i.type)}}class $A{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const c=this.seq;for(let f=0,h=c.length;f!==h;++f){const d=c[f];d.setValue(e,i[d.id],s)}}}const Gd=/(\w+)(\])?(\[|\.)?/g;function Z_(o,e){o.seq.push(e),o.map[e.id]=e}function tR(o,e,i){const s=o.name,c=s.length;for(Gd.lastIndex=0;;){const f=Gd.exec(s),h=Gd.lastIndex;let d=f[1];const p=f[2]==="]",g=f[3];if(p&&(d=d|0),g===void 0||g==="["&&h+2===c){Z_(i,g===void 0?new QA(d,o,e):new JA(d,o,e));break}else{let v=i.map[d];v===void 0&&(v=new $A(d),Z_(i,v)),i=v}}}class Tu{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let c=0;c<s;++c){const f=e.getActiveUniform(i,c),h=e.getUniformLocation(i,f.name);tR(f,h,this)}}setValue(e,i,s,c){const f=this.map[i];f!==void 0&&f.setValue(e,s,c)}setOptional(e,i,s){const c=i[s];c!==void 0&&this.setValue(e,s,c)}static upload(e,i,s,c){for(let f=0,h=i.length;f!==h;++f){const d=i[f],p=s[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,c)}}static seqWithValue(e,i){const s=[];for(let c=0,f=e.length;c!==f;++c){const h=e[c];h.id in i&&s.push(h)}return s}}function K_(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const eR=37297;let nR=0;function iR(o,e){const i=o.split(`
`),s=[],c=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=c;h<f;h++){const d=h+1;s.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const Q_=new fe;function aR(o){we._getMatrix(Q_,we.workingColorSpace,o);const e=`mat3( ${Q_.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(o)){case Au:return[e,"LinearTransferOETF"];case Be:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function J_(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),c=o.getShaderInfoLog(e).trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+iR(o.getShaderSource(e),h)}else return c}function rR(o,e){const i=aR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function sR(o,e){let i;switch(e){case fE:i="Linear";break;case hE:i="Reinhard";break;case dE:i="Cineon";break;case pE:i="ACESFilmic";break;case gE:i="AgX";break;case vE:i="Neutral";break;case mE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const mu=new it;function oR(){we.getLuminanceCoefficients(mu);const o=mu.x.toFixed(4),e=mu.y.toFixed(4),i=mu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xl).join(`
`)}function cR(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function uR(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let c=0;c<s;c++){const f=o.getActiveAttrib(e,c),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function xl(o){return o!==""}function $_(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tx(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Up(o){return o.replace(fR,dR)}const hR=new Map;function dR(o,e){let i=he[e];if(i===void 0){const s=hR.get(e);if(s!==void 0)i=he[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Up(i)}const pR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ex(o){return o.replace(pR,mR)}function mR(o,e,i,s){let c="";for(let f=parseInt(e);f<parseInt(i);f++)c+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return c}function nx(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}function gR(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===dx?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===XM?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===ba&&(e="SHADOWMAP_TYPE_VSM"),e}function vR(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case uo:case fo:e="ENVMAP_TYPE_CUBE";break;case wu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _R(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case fo:e="ENVMAP_MODE_REFRACTION";break}return e}function xR(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case px:e="ENVMAP_BLENDING_MULTIPLY";break;case cE:e="ENVMAP_BLENDING_MIX";break;case uE:e="ENVMAP_BLENDING_ADD";break}return e}function yR(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function SR(o,e,i,s){const c=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=gR(i),g=vR(i),_=_R(i),v=xR(i),x=yR(i),M=lR(i),C=cR(f),w=c.createProgram();let S,y,B=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C].filter(xl).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C].filter(xl).join(`
`),y.length>0&&(y+=`
`)):(S=[nx(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xl).join(`
`),y=[nx(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,C,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Da?"#define TONE_MAPPING":"",i.toneMapping!==Da?he.tonemapping_pars_fragment:"",i.toneMapping!==Da?sR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",he.colorspace_pars_fragment,rR("linearToOutputTexel",i.outputColorSpace),oR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(xl).join(`
`)),h=Up(h),h=$_(h,i),h=tx(h,i),d=Up(d),d=$_(d,i),d=tx(d,i),h=ex(h),d=ex(d),i.isRawShaderMaterial!==!0&&(B=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",i.glslVersion===g_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===g_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const z=B+S+h,U=B+y+d,Q=K_(c,c.VERTEX_SHADER,z),V=K_(c,c.FRAGMENT_SHADER,U);c.attachShader(w,Q),c.attachShader(w,V),i.index0AttributeName!==void 0?c.bindAttribLocation(w,0,i.index0AttributeName):i.morphTargets===!0&&c.bindAttribLocation(w,0,"position"),c.linkProgram(w);function P(I){if(o.debug.checkShaderErrors){const W=c.getProgramInfoLog(w).trim(),et=c.getShaderInfoLog(Q).trim(),nt=c.getShaderInfoLog(V).trim();let ut=!0,k=!0;if(c.getProgramParameter(w,c.LINK_STATUS)===!1)if(ut=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(c,w,Q,V);else{const st=J_(c,Q,"vertex"),J=J_(c,V,"fragment");console.error("THREE.WebGLProgram: Shader Error "+c.getError()+" - VALIDATE_STATUS "+c.getProgramParameter(w,c.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+st+`
`+J)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(et===""||nt==="")&&(k=!1);k&&(I.diagnostics={runnable:ut,programLog:W,vertexShader:{log:et,prefix:S},fragmentShader:{log:nt,prefix:y}})}c.deleteShader(Q),c.deleteShader(V),L=new Tu(c,w),b=uR(c,w)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let A=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=c.getProgramParameter(w,eR)),A},this.destroy=function(){s.releaseStatesOfProgram(this),c.deleteProgram(w),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=nR++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=Q,this.fragmentShader=V,this}let MR=0;class ER{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,c=this._getShaderStage(i),f=this._getShaderStage(s),h=this._getShaderCacheForMaterial(e);return h.has(c)===!1&&(h.add(c),c.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new TR(e),i.set(e,s)),s}}class TR{constructor(e){this.id=MR++,this.code=e,this.usedTimes=0}}function bR(o,e,i,s,c,f,h){const d=new wx,p=new ER,g=new Set,_=[],v=c.logarithmicDepthBuffer,x=c.vertexTextures;let M=c.precision;const C={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(b){return g.add(b),b===0?"uv":`uv${b}`}function S(b,A,I,W,et){const nt=W.fog,ut=et.geometry,k=b.isMeshStandardMaterial?W.environment:null,st=(b.isMeshStandardMaterial?i:e).get(b.envMap||k),J=st&&st.mapping===wu?st.image.height:null,yt=C[b.type];b.precision!==null&&(M=c.getMaxPrecision(b.precision),M!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",M,"instead."));const St=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,Gt=St!==void 0?St.length:0;let ee=0;ut.morphAttributes.position!==void 0&&(ee=1),ut.morphAttributes.normal!==void 0&&(ee=2),ut.morphAttributes.color!==void 0&&(ee=3);let Te,D,Z,gt;if(yt){const be=Ji[yt];Te=be.vertexShader,D=be.fragmentShader}else Te=b.vertexShader,D=b.fragmentShader,p.update(b),Z=p.getVertexShaderID(b),gt=p.getFragmentShaderID(b);const ht=o.getRenderTarget(),bt=o.state.buffers.depth.getReversed(),kt=et.isInstancedMesh===!0,wt=et.isBatchedMesh===!0,Rt=!!b.map,Bt=!!b.matcap,re=!!st,H=!!b.aoMap,hn=!!b.lightMap,ae=!!b.bumpMap,Kt=!!b.normalMap,Ct=!!b.displacementMap,ye=!!b.emissiveMap,qt=!!b.metalnessMap,N=!!b.roughnessMap,T=b.anisotropy>0,at=b.clearcoat>0,vt=b.dispersion>0,xt=b.iridescence>0,mt=b.sheen>0,Yt=b.transmission>0,Lt=T&&!!b.anisotropyMap,zt=at&&!!b.clearcoatMap,me=at&&!!b.clearcoatNormalMap,Et=at&&!!b.clearcoatRoughnessMap,Vt=xt&&!!b.iridescenceMap,Jt=xt&&!!b.iridescenceThicknessMap,te=mt&&!!b.sheenColorMap,Ht=mt&&!!b.sheenRoughnessMap,pe=!!b.specularMap,oe=!!b.specularColorMap,ze=!!b.specularIntensityMap,G=Yt&&!!b.transmissionMap,Ot=Yt&&!!b.thicknessMap,ft=!!b.gradientMap,_t=!!b.alphaMap,Pt=b.alphaTest>0,It=!!b.alphaHash,se=!!b.extensions;let Ke=Da;b.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Ke=o.toneMapping);const _n={shaderID:yt,shaderType:b.type,shaderName:b.name,vertexShader:Te,fragmentShader:D,defines:b.defines,customVertexShaderID:Z,customFragmentShaderID:gt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:M,batching:wt,batchingColor:wt&&et._colorsTexture!==null,instancing:kt,instancingColor:kt&&et.instanceColor!==null,instancingMorph:kt&&et.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ht===null?o.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:mo,alphaToCoverage:!!b.alphaToCoverage,map:Rt,matcap:Bt,envMap:re,envMapMode:re&&st.mapping,envMapCubeUVHeight:J,aoMap:H,lightMap:hn,bumpMap:ae,normalMap:Kt,displacementMap:x&&Ct,emissiveMap:ye,normalMapObjectSpace:Kt&&b.normalMapType===ME,normalMapTangentSpace:Kt&&b.normalMapType===SE,metalnessMap:qt,roughnessMap:N,anisotropy:T,anisotropyMap:Lt,clearcoat:at,clearcoatMap:zt,clearcoatNormalMap:me,clearcoatRoughnessMap:Et,dispersion:vt,iridescence:xt,iridescenceMap:Vt,iridescenceThicknessMap:Jt,sheen:mt,sheenColorMap:te,sheenRoughnessMap:Ht,specularMap:pe,specularColorMap:oe,specularIntensityMap:ze,transmission:Yt,transmissionMap:G,thicknessMap:Ot,gradientMap:ft,opaque:b.transparent===!1&&b.blending===ro&&b.alphaToCoverage===!1,alphaMap:_t,alphaTest:Pt,alphaHash:It,combine:b.combine,mapUv:Rt&&w(b.map.channel),aoMapUv:H&&w(b.aoMap.channel),lightMapUv:hn&&w(b.lightMap.channel),bumpMapUv:ae&&w(b.bumpMap.channel),normalMapUv:Kt&&w(b.normalMap.channel),displacementMapUv:Ct&&w(b.displacementMap.channel),emissiveMapUv:ye&&w(b.emissiveMap.channel),metalnessMapUv:qt&&w(b.metalnessMap.channel),roughnessMapUv:N&&w(b.roughnessMap.channel),anisotropyMapUv:Lt&&w(b.anisotropyMap.channel),clearcoatMapUv:zt&&w(b.clearcoatMap.channel),clearcoatNormalMapUv:me&&w(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&w(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&w(b.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&w(b.iridescenceThicknessMap.channel),sheenColorMapUv:te&&w(b.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&w(b.sheenRoughnessMap.channel),specularMapUv:pe&&w(b.specularMap.channel),specularColorMapUv:oe&&w(b.specularColorMap.channel),specularIntensityMapUv:ze&&w(b.specularIntensityMap.channel),transmissionMapUv:G&&w(b.transmissionMap.channel),thicknessMapUv:Ot&&w(b.thicknessMap.channel),alphaMapUv:_t&&w(b.alphaMap.channel),vertexTangents:!!ut.attributes.tangent&&(Kt||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pointsUvs:et.isPoints===!0&&!!ut.attributes.uv&&(Rt||_t),fog:!!nt,useFog:b.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:bt,skinning:et.isSkinnedMesh===!0,morphTargets:ut.morphAttributes.position!==void 0,morphNormals:ut.morphAttributes.normal!==void 0,morphColors:ut.morphAttributes.color!==void 0,morphTargetsCount:Gt,morphTextureStride:ee,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:b.dithering,shadowMapEnabled:o.shadowMap.enabled&&I.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ke,decodeVideoTexture:Rt&&b.map.isVideoTexture===!0&&we.getTransfer(b.map.colorSpace)===Be,decodeVideoTextureEmissive:ye&&b.emissiveMap.isVideoTexture===!0&&we.getTransfer(b.emissiveMap.colorSpace)===Be,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Aa,flipSided:b.side===Qn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:se&&b.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&b.extensions.multiDraw===!0||wt)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return _n.vertexUv1s=g.has(1),_n.vertexUv2s=g.has(2),_n.vertexUv3s=g.has(3),g.clear(),_n}function y(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)A.push(I),A.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(B(A,b),z(A,b),A.push(o.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function B(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function z(b,A){d.disableAll(),A.supportsVertexTextures&&d.enable(0),A.instancing&&d.enable(1),A.instancingColor&&d.enable(2),A.instancingMorph&&d.enable(3),A.matcap&&d.enable(4),A.envMap&&d.enable(5),A.normalMapObjectSpace&&d.enable(6),A.normalMapTangentSpace&&d.enable(7),A.clearcoat&&d.enable(8),A.iridescence&&d.enable(9),A.alphaTest&&d.enable(10),A.vertexColors&&d.enable(11),A.vertexAlphas&&d.enable(12),A.vertexUv1s&&d.enable(13),A.vertexUv2s&&d.enable(14),A.vertexUv3s&&d.enable(15),A.vertexTangents&&d.enable(16),A.anisotropy&&d.enable(17),A.alphaHash&&d.enable(18),A.batching&&d.enable(19),A.dispersion&&d.enable(20),A.batchingColor&&d.enable(21),b.push(d.mask),d.disableAll(),A.fog&&d.enable(0),A.useFog&&d.enable(1),A.flatShading&&d.enable(2),A.logarithmicDepthBuffer&&d.enable(3),A.reverseDepthBuffer&&d.enable(4),A.skinning&&d.enable(5),A.morphTargets&&d.enable(6),A.morphNormals&&d.enable(7),A.morphColors&&d.enable(8),A.premultipliedAlpha&&d.enable(9),A.shadowMapEnabled&&d.enable(10),A.doubleSided&&d.enable(11),A.flipSided&&d.enable(12),A.useDepthPacking&&d.enable(13),A.dithering&&d.enable(14),A.transmission&&d.enable(15),A.sheen&&d.enable(16),A.opaque&&d.enable(17),A.pointsUvs&&d.enable(18),A.decodeVideoTexture&&d.enable(19),A.decodeVideoTextureEmissive&&d.enable(20),A.alphaToCoverage&&d.enable(21),b.push(d.mask)}function U(b){const A=C[b.type];let I;if(A){const W=Ji[A];I=tT.clone(W.uniforms)}else I=b.uniforms;return I}function Q(b,A){let I;for(let W=0,et=_.length;W<et;W++){const nt=_[W];if(nt.cacheKey===A){I=nt,++I.usedTimes;break}}return I===void 0&&(I=new SR(o,A,b,f),_.push(I)),I}function V(b){if(--b.usedTimes===0){const A=_.indexOf(b);_[A]=_[_.length-1],_.pop(),b.destroy()}}function P(b){p.remove(b)}function L(){p.dispose()}return{getParameters:S,getProgramCacheKey:y,getUniforms:U,acquireProgram:Q,releaseProgram:V,releaseShaderCache:P,programs:_,dispose:L}}function AR(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function c(h,d,p){o.get(h)[d]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:s,update:c,dispose:f}}function RR(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function ix(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function ax(){const o=[];let e=0;const i=[],s=[],c=[];function f(){e=0,i.length=0,s.length=0,c.length=0}function h(v,x,M,C,w,S){let y=o[e];return y===void 0?(y={id:v.id,object:v,geometry:x,material:M,groupOrder:C,renderOrder:v.renderOrder,z:w,group:S},o[e]=y):(y.id=v.id,y.object=v,y.geometry=x,y.material=M,y.groupOrder=C,y.renderOrder=v.renderOrder,y.z=w,y.group=S),e++,y}function d(v,x,M,C,w,S){const y=h(v,x,M,C,w,S);M.transmission>0?s.push(y):M.transparent===!0?c.push(y):i.push(y)}function p(v,x,M,C,w,S){const y=h(v,x,M,C,w,S);M.transmission>0?s.unshift(y):M.transparent===!0?c.unshift(y):i.unshift(y)}function g(v,x){i.length>1&&i.sort(v||RR),s.length>1&&s.sort(x||ix),c.length>1&&c.sort(x||ix)}function _(){for(let v=e,x=o.length;v<x;v++){const M=o[v];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:c,init:f,push:d,unshift:p,finish:_,sort:g}}function CR(){let o=new WeakMap;function e(s,c){const f=o.get(s);let h;return f===void 0?(h=new ax,o.set(s,[h])):c>=f.length?(h=new ax,f.push(h)):h=f[c],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function DR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new it,color:new He};break;case"SpotLight":i={position:new it,direction:new it,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new it,color:new He,distance:0,decay:0};break;case"HemisphereLight":i={direction:new it,skyColor:new He,groundColor:new He};break;case"RectAreaLight":i={color:new He,position:new it,halfWidth:new it,halfHeight:new it};break}return o[e.id]=i,i}}}function wR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let UR=0;function NR(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function LR(o){const e=new DR,i=wR(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)s.probe.push(new it);const c=new it,f=new rn,h=new rn;function d(g){let _=0,v=0,x=0;for(let b=0;b<9;b++)s.probe[b].set(0,0,0);let M=0,C=0,w=0,S=0,y=0,B=0,z=0,U=0,Q=0,V=0,P=0;g.sort(NR);for(let b=0,A=g.length;b<A;b++){const I=g[b],W=I.color,et=I.intensity,nt=I.distance,ut=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)_+=W.r*et,v+=W.g*et,x+=W.b*et;else if(I.isLightProbe){for(let k=0;k<9;k++)s.probe[k].addScaledVector(I.sh.coefficients[k],et);P++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const st=I.shadow,J=i.get(I);J.shadowIntensity=st.intensity,J.shadowBias=st.bias,J.shadowNormalBias=st.normalBias,J.shadowRadius=st.radius,J.shadowMapSize=st.mapSize,s.directionalShadow[M]=J,s.directionalShadowMap[M]=ut,s.directionalShadowMatrix[M]=I.shadow.matrix,B++}s.directional[M]=k,M++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(W).multiplyScalar(et),k.distance=nt,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,s.spot[w]=k;const st=I.shadow;if(I.map&&(s.spotLightMap[Q]=I.map,Q++,st.updateMatrices(I),I.castShadow&&V++),s.spotLightMatrix[w]=st.matrix,I.castShadow){const J=i.get(I);J.shadowIntensity=st.intensity,J.shadowBias=st.bias,J.shadowNormalBias=st.normalBias,J.shadowRadius=st.radius,J.shadowMapSize=st.mapSize,s.spotShadow[w]=J,s.spotShadowMap[w]=ut,U++}w++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(W).multiplyScalar(et),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),s.rectArea[S]=k,S++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const st=I.shadow,J=i.get(I);J.shadowIntensity=st.intensity,J.shadowBias=st.bias,J.shadowNormalBias=st.normalBias,J.shadowRadius=st.radius,J.shadowMapSize=st.mapSize,J.shadowCameraNear=st.camera.near,J.shadowCameraFar=st.camera.far,s.pointShadow[C]=J,s.pointShadowMap[C]=ut,s.pointShadowMatrix[C]=I.shadow.matrix,z++}s.point[C]=k,C++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(et),k.groundColor.copy(I.groundColor).multiplyScalar(et),s.hemi[y]=k,y++}}S>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Nt.LTC_FLOAT_1,s.rectAreaLTC2=Nt.LTC_FLOAT_2):(s.rectAreaLTC1=Nt.LTC_HALF_1,s.rectAreaLTC2=Nt.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=v,s.ambient[2]=x;const L=s.hash;(L.directionalLength!==M||L.pointLength!==C||L.spotLength!==w||L.rectAreaLength!==S||L.hemiLength!==y||L.numDirectionalShadows!==B||L.numPointShadows!==z||L.numSpotShadows!==U||L.numSpotMaps!==Q||L.numLightProbes!==P)&&(s.directional.length=M,s.spot.length=w,s.rectArea.length=S,s.point.length=C,s.hemi.length=y,s.directionalShadow.length=B,s.directionalShadowMap.length=B,s.pointShadow.length=z,s.pointShadowMap.length=z,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=B,s.pointShadowMatrix.length=z,s.spotLightMatrix.length=U+Q-V,s.spotLightMap.length=Q,s.numSpotLightShadowsWithMaps=V,s.numLightProbes=P,L.directionalLength=M,L.pointLength=C,L.spotLength=w,L.rectAreaLength=S,L.hemiLength=y,L.numDirectionalShadows=B,L.numPointShadows=z,L.numSpotShadows=U,L.numSpotMaps=Q,L.numLightProbes=P,s.version=UR++)}function p(g,_){let v=0,x=0,M=0,C=0,w=0;const S=_.matrixWorldInverse;for(let y=0,B=g.length;y<B;y++){const z=g[y];if(z.isDirectionalLight){const U=s.directional[v];U.direction.setFromMatrixPosition(z.matrixWorld),c.setFromMatrixPosition(z.target.matrixWorld),U.direction.sub(c),U.direction.transformDirection(S),v++}else if(z.isSpotLight){const U=s.spot[M];U.position.setFromMatrixPosition(z.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(z.matrixWorld),c.setFromMatrixPosition(z.target.matrixWorld),U.direction.sub(c),U.direction.transformDirection(S),M++}else if(z.isRectAreaLight){const U=s.rectArea[C];U.position.setFromMatrixPosition(z.matrixWorld),U.position.applyMatrix4(S),h.identity(),f.copy(z.matrixWorld),f.premultiply(S),h.extractRotation(f),U.halfWidth.set(z.width*.5,0,0),U.halfHeight.set(0,z.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),C++}else if(z.isPointLight){const U=s.point[x];U.position.setFromMatrixPosition(z.matrixWorld),U.position.applyMatrix4(S),x++}else if(z.isHemisphereLight){const U=s.hemi[w];U.direction.setFromMatrixPosition(z.matrixWorld),U.direction.transformDirection(S),w++}}}return{setup:d,setupView:p,state:s}}function rx(o){const e=new LR(o),i=[],s=[];function c(_){g.camera=_,i.length=0,s.length=0}function f(_){i.push(_)}function h(_){s.push(_)}function d(){e.setup(i)}function p(_){e.setupView(i,_)}const g={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:c,state:g,setupLights:d,setupLightsView:p,pushLight:f,pushShadow:h}}function OR(o){let e=new WeakMap;function i(c,f=0){const h=e.get(c);let d;return h===void 0?(d=new rx(o),e.set(c,[d])):f>=h.length?(d=new rx(o),h.push(d)):d=h[f],d}function s(){e=new WeakMap}return{get:i,dispose:s}}const PR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zR=`uniform sampler2D shadow_pass;
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
}`;function IR(o,e,i){let s=new Bx;const c=new ue,f=new ue,h=new an,d=new cT({depthPacking:yE}),p=new uT,g={},_=i.maxTextureSize,v={[mr]:Qn,[Qn]:mr,[Aa]:Aa},x=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:PR,fragmentShader:zR}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const C=new gr;C.setAttribute("position",new Ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new $i(C,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dx;let y=this.type;this.render=function(V,P,L){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||V.length===0)return;const b=o.getRenderTarget(),A=o.getActiveCubeFace(),I=o.getActiveMipmapLevel(),W=o.state;W.setBlending(pr),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const et=y!==ba&&this.type===ba,nt=y===ba&&this.type!==ba;for(let ut=0,k=V.length;ut<k;ut++){const st=V[ut],J=st.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;c.copy(J.mapSize);const yt=J.getFrameExtents();if(c.multiply(yt),f.copy(J.mapSize),(c.x>_||c.y>_)&&(c.x>_&&(f.x=Math.floor(_/yt.x),c.x=f.x*yt.x,J.mapSize.x=f.x),c.y>_&&(f.y=Math.floor(_/yt.y),c.y=f.y*yt.y,J.mapSize.y=f.y)),J.map===null||et===!0||nt===!0){const Gt=this.type!==ba?{minFilter:Ii,magFilter:Ii}:{};J.map!==null&&J.map.dispose(),J.map=new ta(c.x,c.y,Gt),J.map.texture.name=st.name+".shadowMap",J.camera.updateProjectionMatrix()}o.setRenderTarget(J.map),o.clear();const St=J.getViewportCount();for(let Gt=0;Gt<St;Gt++){const ee=J.getViewport(Gt);h.set(f.x*ee.x,f.y*ee.y,f.x*ee.z,f.y*ee.w),W.viewport(h),J.updateMatrices(st,Gt),s=J.getFrustum(),U(P,L,J.camera,st,this.type)}J.isPointLightShadow!==!0&&this.type===ba&&B(J,L),J.needsUpdate=!1}y=this.type,S.needsUpdate=!1,o.setRenderTarget(b,A,I)};function B(V,P){const L=e.update(w);x.defines.VSM_SAMPLES!==V.blurSamples&&(x.defines.VSM_SAMPLES=V.blurSamples,M.defines.VSM_SAMPLES=V.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),V.mapPass===null&&(V.mapPass=new ta(c.x,c.y)),x.uniforms.shadow_pass.value=V.map.texture,x.uniforms.resolution.value=V.mapSize,x.uniforms.radius.value=V.radius,o.setRenderTarget(V.mapPass),o.clear(),o.renderBufferDirect(P,null,L,x,w,null),M.uniforms.shadow_pass.value=V.mapPass.texture,M.uniforms.resolution.value=V.mapSize,M.uniforms.radius.value=V.radius,o.setRenderTarget(V.map),o.clear(),o.renderBufferDirect(P,null,L,M,w,null)}function z(V,P,L,b){let A=null;const I=L.isPointLight===!0?V.customDistanceMaterial:V.customDepthMaterial;if(I!==void 0)A=I;else if(A=L.isPointLight===!0?p:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const W=A.uuid,et=P.uuid;let nt=g[W];nt===void 0&&(nt={},g[W]=nt);let ut=nt[et];ut===void 0&&(ut=A.clone(),nt[et]=ut,P.addEventListener("dispose",Q)),A=ut}if(A.visible=P.visible,A.wireframe=P.wireframe,b===ba?A.side=P.shadowSide!==null?P.shadowSide:P.side:A.side=P.shadowSide!==null?P.shadowSide:v[P.side],A.alphaMap=P.alphaMap,A.alphaTest=P.alphaTest,A.map=P.map,A.clipShadows=P.clipShadows,A.clippingPlanes=P.clippingPlanes,A.clipIntersection=P.clipIntersection,A.displacementMap=P.displacementMap,A.displacementScale=P.displacementScale,A.displacementBias=P.displacementBias,A.wireframeLinewidth=P.wireframeLinewidth,A.linewidth=P.linewidth,L.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const W=o.properties.get(A);W.light=L}return A}function U(V,P,L,b,A){if(V.visible===!1)return;if(V.layers.test(P.layers)&&(V.isMesh||V.isLine||V.isPoints)&&(V.castShadow||V.receiveShadow&&A===ba)&&(!V.frustumCulled||s.intersectsObject(V))){V.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,V.matrixWorld);const et=e.update(V),nt=V.material;if(Array.isArray(nt)){const ut=et.groups;for(let k=0,st=ut.length;k<st;k++){const J=ut[k],yt=nt[J.materialIndex];if(yt&&yt.visible){const St=z(V,yt,b,A);V.onBeforeShadow(o,V,P,L,et,St,J),o.renderBufferDirect(L,null,et,St,V,J),V.onAfterShadow(o,V,P,L,et,St,J)}}}else if(nt.visible){const ut=z(V,nt,b,A);V.onBeforeShadow(o,V,P,L,et,ut,null),o.renderBufferDirect(L,null,et,ut,V,null),V.onAfterShadow(o,V,P,L,et,ut,null)}}const W=V.children;for(let et=0,nt=W.length;et<nt;et++)U(W[et],P,L,b,A)}function Q(V){V.target.removeEventListener("dispose",Q);for(const L in g){const b=g[L],A=V.target.uuid;A in b&&(b[A].dispose(),delete b[A])}}}const BR={[Wd]:jd,[Zd]:Jd,[Kd]:$d,[co]:Qd,[jd]:Wd,[Jd]:Zd,[$d]:Kd,[Qd]:co};function FR(o,e){function i(){let G=!1;const Ot=new an;let ft=null;const _t=new an(0,0,0,0);return{setMask:function(Pt){ft!==Pt&&!G&&(o.colorMask(Pt,Pt,Pt,Pt),ft=Pt)},setLocked:function(Pt){G=Pt},setClear:function(Pt,It,se,Ke,_n){_n===!0&&(Pt*=Ke,It*=Ke,se*=Ke),Ot.set(Pt,It,se,Ke),_t.equals(Ot)===!1&&(o.clearColor(Pt,It,se,Ke),_t.copy(Ot))},reset:function(){G=!1,ft=null,_t.set(-1,0,0,0)}}}function s(){let G=!1,Ot=!1,ft=null,_t=null,Pt=null;return{setReversed:function(It){if(Ot!==It){const se=e.get("EXT_clip_control");Ot?se.clipControlEXT(se.LOWER_LEFT_EXT,se.ZERO_TO_ONE_EXT):se.clipControlEXT(se.LOWER_LEFT_EXT,se.NEGATIVE_ONE_TO_ONE_EXT);const Ke=Pt;Pt=null,this.setClear(Ke)}Ot=It},getReversed:function(){return Ot},setTest:function(It){It?ht(o.DEPTH_TEST):bt(o.DEPTH_TEST)},setMask:function(It){ft!==It&&!G&&(o.depthMask(It),ft=It)},setFunc:function(It){if(Ot&&(It=BR[It]),_t!==It){switch(It){case Wd:o.depthFunc(o.NEVER);break;case jd:o.depthFunc(o.ALWAYS);break;case Zd:o.depthFunc(o.LESS);break;case co:o.depthFunc(o.LEQUAL);break;case Kd:o.depthFunc(o.EQUAL);break;case Qd:o.depthFunc(o.GEQUAL);break;case Jd:o.depthFunc(o.GREATER);break;case $d:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}_t=It}},setLocked:function(It){G=It},setClear:function(It){Pt!==It&&(Ot&&(It=1-It),o.clearDepth(It),Pt=It)},reset:function(){G=!1,ft=null,_t=null,Pt=null,Ot=!1}}}function c(){let G=!1,Ot=null,ft=null,_t=null,Pt=null,It=null,se=null,Ke=null,_n=null;return{setTest:function(be){G||(be?ht(o.STENCIL_TEST):bt(o.STENCIL_TEST))},setMask:function(be){Ot!==be&&!G&&(o.stencilMask(be),Ot=be)},setFunc:function(be,je,xn){(ft!==be||_t!==je||Pt!==xn)&&(o.stencilFunc(be,je,xn),ft=be,_t=je,Pt=xn)},setOp:function(be,je,xn){(It!==be||se!==je||Ke!==xn)&&(o.stencilOp(be,je,xn),It=be,se=je,Ke=xn)},setLocked:function(be){G=be},setClear:function(be){_n!==be&&(o.clearStencil(be),_n=be)},reset:function(){G=!1,Ot=null,ft=null,_t=null,Pt=null,It=null,se=null,Ke=null,_n=null}}}const f=new i,h=new s,d=new c,p=new WeakMap,g=new WeakMap;let _={},v={},x=new WeakMap,M=[],C=null,w=!1,S=null,y=null,B=null,z=null,U=null,Q=null,V=null,P=new He(0,0,0),L=0,b=!1,A=null,I=null,W=null,et=null,nt=null;const ut=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,st=0;const J=o.getParameter(o.VERSION);J.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(J)[1]),k=st>=1):J.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),k=st>=2);let yt=null,St={};const Gt=o.getParameter(o.SCISSOR_BOX),ee=o.getParameter(o.VIEWPORT),Te=new an().fromArray(Gt),D=new an().fromArray(ee);function Z(G,Ot,ft,_t){const Pt=new Uint8Array(4),It=o.createTexture();o.bindTexture(G,It),o.texParameteri(G,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(G,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let se=0;se<ft;se++)G===o.TEXTURE_3D||G===o.TEXTURE_2D_ARRAY?o.texImage3D(Ot,0,o.RGBA,1,1,_t,0,o.RGBA,o.UNSIGNED_BYTE,Pt):o.texImage2D(Ot+se,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Pt);return It}const gt={};gt[o.TEXTURE_2D]=Z(o.TEXTURE_2D,o.TEXTURE_2D,1),gt[o.TEXTURE_CUBE_MAP]=Z(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[o.TEXTURE_2D_ARRAY]=Z(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),gt[o.TEXTURE_3D]=Z(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ht(o.DEPTH_TEST),h.setFunc(co),ae(!1),Kt(u_),ht(o.CULL_FACE),H(pr);function ht(G){_[G]!==!0&&(o.enable(G),_[G]=!0)}function bt(G){_[G]!==!1&&(o.disable(G),_[G]=!1)}function kt(G,Ot){return v[G]!==Ot?(o.bindFramebuffer(G,Ot),v[G]=Ot,G===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=Ot),G===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=Ot),!0):!1}function wt(G,Ot){let ft=M,_t=!1;if(G){ft=x.get(Ot),ft===void 0&&(ft=[],x.set(Ot,ft));const Pt=G.textures;if(ft.length!==Pt.length||ft[0]!==o.COLOR_ATTACHMENT0){for(let It=0,se=Pt.length;It<se;It++)ft[It]=o.COLOR_ATTACHMENT0+It;ft.length=Pt.length,_t=!0}}else ft[0]!==o.BACK&&(ft[0]=o.BACK,_t=!0);_t&&o.drawBuffers(ft)}function Rt(G){return C!==G?(o.useProgram(G),C=G,!0):!1}const Bt={[jr]:o.FUNC_ADD,[YM]:o.FUNC_SUBTRACT,[WM]:o.FUNC_REVERSE_SUBTRACT};Bt[jM]=o.MIN,Bt[ZM]=o.MAX;const re={[KM]:o.ZERO,[QM]:o.ONE,[JM]:o.SRC_COLOR,[qd]:o.SRC_ALPHA,[aE]:o.SRC_ALPHA_SATURATE,[nE]:o.DST_COLOR,[tE]:o.DST_ALPHA,[$M]:o.ONE_MINUS_SRC_COLOR,[Yd]:o.ONE_MINUS_SRC_ALPHA,[iE]:o.ONE_MINUS_DST_COLOR,[eE]:o.ONE_MINUS_DST_ALPHA,[rE]:o.CONSTANT_COLOR,[sE]:o.ONE_MINUS_CONSTANT_COLOR,[oE]:o.CONSTANT_ALPHA,[lE]:o.ONE_MINUS_CONSTANT_ALPHA};function H(G,Ot,ft,_t,Pt,It,se,Ke,_n,be){if(G===pr){w===!0&&(bt(o.BLEND),w=!1);return}if(w===!1&&(ht(o.BLEND),w=!0),G!==qM){if(G!==S||be!==b){if((y!==jr||U!==jr)&&(o.blendEquation(o.FUNC_ADD),y=jr,U=jr),be)switch(G){case ro:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case f_:o.blendFunc(o.ONE,o.ONE);break;case h_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case d_:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case ro:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case f_:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case h_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case d_:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}B=null,z=null,Q=null,V=null,P.set(0,0,0),L=0,S=G,b=be}return}Pt=Pt||Ot,It=It||ft,se=se||_t,(Ot!==y||Pt!==U)&&(o.blendEquationSeparate(Bt[Ot],Bt[Pt]),y=Ot,U=Pt),(ft!==B||_t!==z||It!==Q||se!==V)&&(o.blendFuncSeparate(re[ft],re[_t],re[It],re[se]),B=ft,z=_t,Q=It,V=se),(Ke.equals(P)===!1||_n!==L)&&(o.blendColor(Ke.r,Ke.g,Ke.b,_n),P.copy(Ke),L=_n),S=G,b=!1}function hn(G,Ot){G.side===Aa?bt(o.CULL_FACE):ht(o.CULL_FACE);let ft=G.side===Qn;Ot&&(ft=!ft),ae(ft),G.blending===ro&&G.transparent===!1?H(pr):H(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),h.setFunc(G.depthFunc),h.setTest(G.depthTest),h.setMask(G.depthWrite),f.setMask(G.colorWrite);const _t=G.stencilWrite;d.setTest(_t),_t&&(d.setMask(G.stencilWriteMask),d.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),d.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ye(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ht(o.SAMPLE_ALPHA_TO_COVERAGE):bt(o.SAMPLE_ALPHA_TO_COVERAGE)}function ae(G){A!==G&&(G?o.frontFace(o.CW):o.frontFace(o.CCW),A=G)}function Kt(G){G!==VM?(ht(o.CULL_FACE),G!==I&&(G===u_?o.cullFace(o.BACK):G===kM?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):bt(o.CULL_FACE),I=G}function Ct(G){G!==W&&(k&&o.lineWidth(G),W=G)}function ye(G,Ot,ft){G?(ht(o.POLYGON_OFFSET_FILL),(et!==Ot||nt!==ft)&&(o.polygonOffset(Ot,ft),et=Ot,nt=ft)):bt(o.POLYGON_OFFSET_FILL)}function qt(G){G?ht(o.SCISSOR_TEST):bt(o.SCISSOR_TEST)}function N(G){G===void 0&&(G=o.TEXTURE0+ut-1),yt!==G&&(o.activeTexture(G),yt=G)}function T(G,Ot,ft){ft===void 0&&(yt===null?ft=o.TEXTURE0+ut-1:ft=yt);let _t=St[ft];_t===void 0&&(_t={type:void 0,texture:void 0},St[ft]=_t),(_t.type!==G||_t.texture!==Ot)&&(yt!==ft&&(o.activeTexture(ft),yt=ft),o.bindTexture(G,Ot||gt[G]),_t.type=G,_t.texture=Ot)}function at(){const G=St[yt];G!==void 0&&G.type!==void 0&&(o.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function vt(){try{o.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function xt(){try{o.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function mt(){try{o.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Yt(){try{o.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Lt(){try{o.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function zt(){try{o.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{o.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Et(){try{o.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Vt(){try{o.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Jt(){try{o.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function te(G){Te.equals(G)===!1&&(o.scissor(G.x,G.y,G.z,G.w),Te.copy(G))}function Ht(G){D.equals(G)===!1&&(o.viewport(G.x,G.y,G.z,G.w),D.copy(G))}function pe(G,Ot){let ft=g.get(Ot);ft===void 0&&(ft=new WeakMap,g.set(Ot,ft));let _t=ft.get(G);_t===void 0&&(_t=o.getUniformBlockIndex(Ot,G.name),ft.set(G,_t))}function oe(G,Ot){const _t=g.get(Ot).get(G);p.get(Ot)!==_t&&(o.uniformBlockBinding(Ot,_t,G.__bindingPointIndex),p.set(Ot,_t))}function ze(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),_={},yt=null,St={},v={},x=new WeakMap,M=[],C=null,w=!1,S=null,y=null,B=null,z=null,U=null,Q=null,V=null,P=new He(0,0,0),L=0,b=!1,A=null,I=null,W=null,et=null,nt=null,Te.set(0,0,o.canvas.width,o.canvas.height),D.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:ht,disable:bt,bindFramebuffer:kt,drawBuffers:wt,useProgram:Rt,setBlending:H,setMaterial:hn,setFlipSided:ae,setCullFace:Kt,setLineWidth:Ct,setPolygonOffset:ye,setScissorTest:qt,activeTexture:N,bindTexture:T,unbindTexture:at,compressedTexImage2D:vt,compressedTexImage3D:xt,texImage2D:Vt,texImage3D:Jt,updateUBOMapping:pe,uniformBlockBinding:oe,texStorage2D:me,texStorage3D:Et,texSubImage2D:mt,texSubImage3D:Yt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:te,viewport:Ht,reset:ze}}function HR(o,e,i,s,c,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new ue,_=new WeakMap;let v;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(N,T){return M?new OffscreenCanvas(N,T):Cu("canvas")}function w(N,T,at){let vt=1;const xt=qt(N);if((xt.width>at||xt.height>at)&&(vt=at/Math.max(xt.width,xt.height)),vt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const mt=Math.floor(vt*xt.width),Yt=Math.floor(vt*xt.height);v===void 0&&(v=C(mt,Yt));const Lt=T?C(mt,Yt):v;return Lt.width=mt,Lt.height=Yt,Lt.getContext("2d").drawImage(N,0,0,mt,Yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+xt.width+"x"+xt.height+") to ("+mt+"x"+Yt+")."),Lt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+xt.width+"x"+xt.height+")."),N;return N}function S(N){return N.generateMipmaps}function y(N){o.generateMipmap(N)}function B(N){return N.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?o.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function z(N,T,at,vt,xt=!1){if(N!==null){if(o[N]!==void 0)return o[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let mt=T;if(T===o.RED&&(at===o.FLOAT&&(mt=o.R32F),at===o.HALF_FLOAT&&(mt=o.R16F),at===o.UNSIGNED_BYTE&&(mt=o.R8)),T===o.RED_INTEGER&&(at===o.UNSIGNED_BYTE&&(mt=o.R8UI),at===o.UNSIGNED_SHORT&&(mt=o.R16UI),at===o.UNSIGNED_INT&&(mt=o.R32UI),at===o.BYTE&&(mt=o.R8I),at===o.SHORT&&(mt=o.R16I),at===o.INT&&(mt=o.R32I)),T===o.RG&&(at===o.FLOAT&&(mt=o.RG32F),at===o.HALF_FLOAT&&(mt=o.RG16F),at===o.UNSIGNED_BYTE&&(mt=o.RG8)),T===o.RG_INTEGER&&(at===o.UNSIGNED_BYTE&&(mt=o.RG8UI),at===o.UNSIGNED_SHORT&&(mt=o.RG16UI),at===o.UNSIGNED_INT&&(mt=o.RG32UI),at===o.BYTE&&(mt=o.RG8I),at===o.SHORT&&(mt=o.RG16I),at===o.INT&&(mt=o.RG32I)),T===o.RGB_INTEGER&&(at===o.UNSIGNED_BYTE&&(mt=o.RGB8UI),at===o.UNSIGNED_SHORT&&(mt=o.RGB16UI),at===o.UNSIGNED_INT&&(mt=o.RGB32UI),at===o.BYTE&&(mt=o.RGB8I),at===o.SHORT&&(mt=o.RGB16I),at===o.INT&&(mt=o.RGB32I)),T===o.RGBA_INTEGER&&(at===o.UNSIGNED_BYTE&&(mt=o.RGBA8UI),at===o.UNSIGNED_SHORT&&(mt=o.RGBA16UI),at===o.UNSIGNED_INT&&(mt=o.RGBA32UI),at===o.BYTE&&(mt=o.RGBA8I),at===o.SHORT&&(mt=o.RGBA16I),at===o.INT&&(mt=o.RGBA32I)),T===o.RGB&&at===o.UNSIGNED_INT_5_9_9_9_REV&&(mt=o.RGB9_E5),T===o.RGBA){const Yt=xt?Au:we.getTransfer(vt);at===o.FLOAT&&(mt=o.RGBA32F),at===o.HALF_FLOAT&&(mt=o.RGBA16F),at===o.UNSIGNED_BYTE&&(mt=Yt===Be?o.SRGB8_ALPHA8:o.RGBA8),at===o.UNSIGNED_SHORT_4_4_4_4&&(mt=o.RGBA4),at===o.UNSIGNED_SHORT_5_5_5_1&&(mt=o.RGB5_A1)}return(mt===o.R16F||mt===o.R32F||mt===o.RG16F||mt===o.RG32F||mt===o.RGBA16F||mt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),mt}function U(N,T){let at;return N?T===null||T===$r||T===ho?at=o.DEPTH24_STENCIL8:T===Ra?at=o.DEPTH32F_STENCIL8:T===Sl&&(at=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===$r||T===ho?at=o.DEPTH_COMPONENT24:T===Ra?at=o.DEPTH_COMPONENT32F:T===Sl&&(at=o.DEPTH_COMPONENT16),at}function Q(N,T){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ii&&N.minFilter!==Ti?Math.log2(Math.max(T.width,T.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?T.mipmaps.length:1}function V(N){const T=N.target;T.removeEventListener("dispose",V),L(T),T.isVideoTexture&&_.delete(T)}function P(N){const T=N.target;T.removeEventListener("dispose",P),A(T)}function L(N){const T=s.get(N);if(T.__webglInit===void 0)return;const at=N.source,vt=x.get(at);if(vt){const xt=vt[T.__cacheKey];xt.usedTimes--,xt.usedTimes===0&&b(N),Object.keys(vt).length===0&&x.delete(at)}s.remove(N)}function b(N){const T=s.get(N);o.deleteTexture(T.__webglTexture);const at=N.source,vt=x.get(at);delete vt[T.__cacheKey],h.memory.textures--}function A(N){const T=s.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),s.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let vt=0;vt<6;vt++){if(Array.isArray(T.__webglFramebuffer[vt]))for(let xt=0;xt<T.__webglFramebuffer[vt].length;xt++)o.deleteFramebuffer(T.__webglFramebuffer[vt][xt]);else o.deleteFramebuffer(T.__webglFramebuffer[vt]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[vt])}else{if(Array.isArray(T.__webglFramebuffer))for(let vt=0;vt<T.__webglFramebuffer.length;vt++)o.deleteFramebuffer(T.__webglFramebuffer[vt]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let vt=0;vt<T.__webglColorRenderbuffer.length;vt++)T.__webglColorRenderbuffer[vt]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[vt]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const at=N.textures;for(let vt=0,xt=at.length;vt<xt;vt++){const mt=s.get(at[vt]);mt.__webglTexture&&(o.deleteTexture(mt.__webglTexture),h.memory.textures--),s.remove(at[vt])}s.remove(N)}let I=0;function W(){I=0}function et(){const N=I;return N>=c.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+c.maxTextures),I+=1,N}function nt(N){const T=[];return T.push(N.wrapS),T.push(N.wrapT),T.push(N.wrapR||0),T.push(N.magFilter),T.push(N.minFilter),T.push(N.anisotropy),T.push(N.internalFormat),T.push(N.format),T.push(N.type),T.push(N.generateMipmaps),T.push(N.premultiplyAlpha),T.push(N.flipY),T.push(N.unpackAlignment),T.push(N.colorSpace),T.join()}function ut(N,T){const at=s.get(N);if(N.isVideoTexture&&Ct(N),N.isRenderTargetTexture===!1&&N.version>0&&at.__version!==N.version){const vt=N.image;if(vt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(vt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{D(at,N,T);return}}i.bindTexture(o.TEXTURE_2D,at.__webglTexture,o.TEXTURE0+T)}function k(N,T){const at=s.get(N);if(N.version>0&&at.__version!==N.version){D(at,N,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,at.__webglTexture,o.TEXTURE0+T)}function st(N,T){const at=s.get(N);if(N.version>0&&at.__version!==N.version){D(at,N,T);return}i.bindTexture(o.TEXTURE_3D,at.__webglTexture,o.TEXTURE0+T)}function J(N,T){const at=s.get(N);if(N.version>0&&at.__version!==N.version){Z(at,N,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,at.__webglTexture,o.TEXTURE0+T)}const yt={[np]:o.REPEAT,[Kr]:o.CLAMP_TO_EDGE,[ip]:o.MIRRORED_REPEAT},St={[Ii]:o.NEAREST,[_E]:o.NEAREST_MIPMAP_NEAREST,[jc]:o.NEAREST_MIPMAP_LINEAR,[Ti]:o.LINEAR,[dd]:o.LINEAR_MIPMAP_NEAREST,[Qr]:o.LINEAR_MIPMAP_LINEAR},Gt={[EE]:o.NEVER,[DE]:o.ALWAYS,[TE]:o.LESS,[Ax]:o.LEQUAL,[bE]:o.EQUAL,[CE]:o.GEQUAL,[AE]:o.GREATER,[RE]:o.NOTEQUAL};function ee(N,T){if(T.type===Ra&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Ti||T.magFilter===dd||T.magFilter===jc||T.magFilter===Qr||T.minFilter===Ti||T.minFilter===dd||T.minFilter===jc||T.minFilter===Qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(N,o.TEXTURE_WRAP_S,yt[T.wrapS]),o.texParameteri(N,o.TEXTURE_WRAP_T,yt[T.wrapT]),(N===o.TEXTURE_3D||N===o.TEXTURE_2D_ARRAY)&&o.texParameteri(N,o.TEXTURE_WRAP_R,yt[T.wrapR]),o.texParameteri(N,o.TEXTURE_MAG_FILTER,St[T.magFilter]),o.texParameteri(N,o.TEXTURE_MIN_FILTER,St[T.minFilter]),T.compareFunction&&(o.texParameteri(N,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(N,o.TEXTURE_COMPARE_FUNC,Gt[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ii||T.minFilter!==jc&&T.minFilter!==Qr||T.type===Ra&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const at=e.get("EXT_texture_filter_anisotropic");o.texParameterf(N,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,c.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function Te(N,T){let at=!1;N.__webglInit===void 0&&(N.__webglInit=!0,T.addEventListener("dispose",V));const vt=T.source;let xt=x.get(vt);xt===void 0&&(xt={},x.set(vt,xt));const mt=nt(T);if(mt!==N.__cacheKey){xt[mt]===void 0&&(xt[mt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,at=!0),xt[mt].usedTimes++;const Yt=xt[N.__cacheKey];Yt!==void 0&&(xt[N.__cacheKey].usedTimes--,Yt.usedTimes===0&&b(T)),N.__cacheKey=mt,N.__webglTexture=xt[mt].texture}return at}function D(N,T,at){let vt=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(vt=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(vt=o.TEXTURE_3D);const xt=Te(N,T),mt=T.source;i.bindTexture(vt,N.__webglTexture,o.TEXTURE0+at);const Yt=s.get(mt);if(mt.version!==Yt.__version||xt===!0){i.activeTexture(o.TEXTURE0+at);const Lt=we.getPrimaries(we.workingColorSpace),zt=T.colorSpace===dr?null:we.getPrimaries(T.colorSpace),me=T.colorSpace===dr||Lt===zt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Et=w(T.image,!1,c.maxTextureSize);Et=ye(T,Et);const Vt=f.convert(T.format,T.colorSpace),Jt=f.convert(T.type);let te=z(T.internalFormat,Vt,Jt,T.colorSpace,T.isVideoTexture);ee(vt,T);let Ht;const pe=T.mipmaps,oe=T.isVideoTexture!==!0,ze=Yt.__version===void 0||xt===!0,G=mt.dataReady,Ot=Q(T,Et);if(T.isDepthTexture)te=U(T.format===po,T.type),ze&&(oe?i.texStorage2D(o.TEXTURE_2D,1,te,Et.width,Et.height):i.texImage2D(o.TEXTURE_2D,0,te,Et.width,Et.height,0,Vt,Jt,null));else if(T.isDataTexture)if(pe.length>0){oe&&ze&&i.texStorage2D(o.TEXTURE_2D,Ot,te,pe[0].width,pe[0].height);for(let ft=0,_t=pe.length;ft<_t;ft++)Ht=pe[ft],oe?G&&i.texSubImage2D(o.TEXTURE_2D,ft,0,0,Ht.width,Ht.height,Vt,Jt,Ht.data):i.texImage2D(o.TEXTURE_2D,ft,te,Ht.width,Ht.height,0,Vt,Jt,Ht.data);T.generateMipmaps=!1}else oe?(ze&&i.texStorage2D(o.TEXTURE_2D,Ot,te,Et.width,Et.height),G&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Et.width,Et.height,Vt,Jt,Et.data)):i.texImage2D(o.TEXTURE_2D,0,te,Et.width,Et.height,0,Vt,Jt,Et.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){oe&&ze&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ot,te,pe[0].width,pe[0].height,Et.depth);for(let ft=0,_t=pe.length;ft<_t;ft++)if(Ht=pe[ft],T.format!==bi)if(Vt!==null)if(oe){if(G)if(T.layerUpdates.size>0){const Pt=P_(Ht.width,Ht.height,T.format,T.type);for(const It of T.layerUpdates){const se=Ht.data.subarray(It*Pt/Ht.data.BYTES_PER_ELEMENT,(It+1)*Pt/Ht.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ft,0,0,It,Ht.width,Ht.height,1,Vt,se)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ft,0,0,0,Ht.width,Ht.height,Et.depth,Vt,Ht.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ft,te,Ht.width,Ht.height,Et.depth,0,Ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?G&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,ft,0,0,0,Ht.width,Ht.height,Et.depth,Vt,Jt,Ht.data):i.texImage3D(o.TEXTURE_2D_ARRAY,ft,te,Ht.width,Ht.height,Et.depth,0,Vt,Jt,Ht.data)}else{oe&&ze&&i.texStorage2D(o.TEXTURE_2D,Ot,te,pe[0].width,pe[0].height);for(let ft=0,_t=pe.length;ft<_t;ft++)Ht=pe[ft],T.format!==bi?Vt!==null?oe?G&&i.compressedTexSubImage2D(o.TEXTURE_2D,ft,0,0,Ht.width,Ht.height,Vt,Ht.data):i.compressedTexImage2D(o.TEXTURE_2D,ft,te,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?G&&i.texSubImage2D(o.TEXTURE_2D,ft,0,0,Ht.width,Ht.height,Vt,Jt,Ht.data):i.texImage2D(o.TEXTURE_2D,ft,te,Ht.width,Ht.height,0,Vt,Jt,Ht.data)}else if(T.isDataArrayTexture)if(oe){if(ze&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ot,te,Et.width,Et.height,Et.depth),G)if(T.layerUpdates.size>0){const ft=P_(Et.width,Et.height,T.format,T.type);for(const _t of T.layerUpdates){const Pt=Et.data.subarray(_t*ft/Et.data.BYTES_PER_ELEMENT,(_t+1)*ft/Et.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,_t,Et.width,Et.height,1,Vt,Jt,Pt)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,Vt,Jt,Et.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,te,Et.width,Et.height,Et.depth,0,Vt,Jt,Et.data);else if(T.isData3DTexture)oe?(ze&&i.texStorage3D(o.TEXTURE_3D,Ot,te,Et.width,Et.height,Et.depth),G&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,Vt,Jt,Et.data)):i.texImage3D(o.TEXTURE_3D,0,te,Et.width,Et.height,Et.depth,0,Vt,Jt,Et.data);else if(T.isFramebufferTexture){if(ze)if(oe)i.texStorage2D(o.TEXTURE_2D,Ot,te,Et.width,Et.height);else{let ft=Et.width,_t=Et.height;for(let Pt=0;Pt<Ot;Pt++)i.texImage2D(o.TEXTURE_2D,Pt,te,ft,_t,0,Vt,Jt,null),ft>>=1,_t>>=1}}else if(pe.length>0){if(oe&&ze){const ft=qt(pe[0]);i.texStorage2D(o.TEXTURE_2D,Ot,te,ft.width,ft.height)}for(let ft=0,_t=pe.length;ft<_t;ft++)Ht=pe[ft],oe?G&&i.texSubImage2D(o.TEXTURE_2D,ft,0,0,Vt,Jt,Ht):i.texImage2D(o.TEXTURE_2D,ft,te,Vt,Jt,Ht);T.generateMipmaps=!1}else if(oe){if(ze){const ft=qt(Et);i.texStorage2D(o.TEXTURE_2D,Ot,te,ft.width,ft.height)}G&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Vt,Jt,Et)}else i.texImage2D(o.TEXTURE_2D,0,te,Vt,Jt,Et);S(T)&&y(vt),Yt.__version=mt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function Z(N,T,at){if(T.image.length!==6)return;const vt=Te(N,T),xt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,N.__webglTexture,o.TEXTURE0+at);const mt=s.get(xt);if(xt.version!==mt.__version||vt===!0){i.activeTexture(o.TEXTURE0+at);const Yt=we.getPrimaries(we.workingColorSpace),Lt=T.colorSpace===dr?null:we.getPrimaries(T.colorSpace),zt=T.colorSpace===dr||Yt===Lt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const me=T.isCompressedTexture||T.image[0].isCompressedTexture,Et=T.image[0]&&T.image[0].isDataTexture,Vt=[];for(let _t=0;_t<6;_t++)!me&&!Et?Vt[_t]=w(T.image[_t],!0,c.maxCubemapSize):Vt[_t]=Et?T.image[_t].image:T.image[_t],Vt[_t]=ye(T,Vt[_t]);const Jt=Vt[0],te=f.convert(T.format,T.colorSpace),Ht=f.convert(T.type),pe=z(T.internalFormat,te,Ht,T.colorSpace),oe=T.isVideoTexture!==!0,ze=mt.__version===void 0||vt===!0,G=xt.dataReady;let Ot=Q(T,Jt);ee(o.TEXTURE_CUBE_MAP,T);let ft;if(me){oe&&ze&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ot,pe,Jt.width,Jt.height);for(let _t=0;_t<6;_t++){ft=Vt[_t].mipmaps;for(let Pt=0;Pt<ft.length;Pt++){const It=ft[Pt];T.format!==bi?te!==null?oe?G&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,0,0,It.width,It.height,te,It.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,pe,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,0,0,It.width,It.height,te,Ht,It.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt,pe,It.width,It.height,0,te,Ht,It.data)}}}else{if(ft=T.mipmaps,oe&&ze){ft.length>0&&Ot++;const _t=qt(Vt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ot,pe,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(Et){oe?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Vt[_t].width,Vt[_t].height,te,Ht,Vt[_t].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,pe,Vt[_t].width,Vt[_t].height,0,te,Ht,Vt[_t].data);for(let Pt=0;Pt<ft.length;Pt++){const se=ft[Pt].image[_t].image;oe?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,0,0,se.width,se.height,te,Ht,se.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,pe,se.width,se.height,0,te,Ht,se.data)}}else{oe?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,te,Ht,Vt[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,pe,te,Ht,Vt[_t]);for(let Pt=0;Pt<ft.length;Pt++){const It=ft[Pt];oe?G&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,0,0,te,Ht,It.image[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Pt+1,pe,te,Ht,It.image[_t])}}}S(T)&&y(o.TEXTURE_CUBE_MAP),mt.__version=xt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function gt(N,T,at,vt,xt,mt){const Yt=f.convert(at.format,at.colorSpace),Lt=f.convert(at.type),zt=z(at.internalFormat,Yt,Lt,at.colorSpace),me=s.get(T),Et=s.get(at);if(Et.__renderTarget=T,!me.__hasExternalTextures){const Vt=Math.max(1,T.width>>mt),Jt=Math.max(1,T.height>>mt);xt===o.TEXTURE_3D||xt===o.TEXTURE_2D_ARRAY?i.texImage3D(xt,mt,zt,Vt,Jt,T.depth,0,Yt,Lt,null):i.texImage2D(xt,mt,zt,Vt,Jt,0,Yt,Lt,null)}i.bindFramebuffer(o.FRAMEBUFFER,N),Kt(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,vt,xt,Et.__webglTexture,0,ae(T)):(xt===o.TEXTURE_2D||xt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&xt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,vt,xt,Et.__webglTexture,mt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function ht(N,T,at){if(o.bindRenderbuffer(o.RENDERBUFFER,N),T.depthBuffer){const vt=T.depthTexture,xt=vt&&vt.isDepthTexture?vt.type:null,mt=U(T.stencilBuffer,xt),Yt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Lt=ae(T);Kt(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Lt,mt,T.width,T.height):at?o.renderbufferStorageMultisample(o.RENDERBUFFER,Lt,mt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,mt,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Yt,o.RENDERBUFFER,N)}else{const vt=T.textures;for(let xt=0;xt<vt.length;xt++){const mt=vt[xt],Yt=f.convert(mt.format,mt.colorSpace),Lt=f.convert(mt.type),zt=z(mt.internalFormat,Yt,Lt,mt.colorSpace),me=ae(T);at&&Kt(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,me,zt,T.width,T.height):Kt(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,me,zt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,zt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function bt(N,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,N),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const vt=s.get(T.depthTexture);vt.__renderTarget=T,(!vt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ut(T.depthTexture,0);const xt=vt.__webglTexture,mt=ae(T);if(T.depthTexture.format===so)Kt(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,xt,0,mt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,xt,0);else if(T.depthTexture.format===po)Kt(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,xt,0,mt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,xt,0);else throw new Error("Unknown depthTexture format")}function kt(N){const T=s.get(N),at=N.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==N.depthTexture){const vt=N.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),vt){const xt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,vt.removeEventListener("dispose",xt)};vt.addEventListener("dispose",xt),T.__depthDisposeCallback=xt}T.__boundDepthTexture=vt}if(N.depthTexture&&!T.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");bt(T.__webglFramebuffer,N)}else if(at){T.__webglDepthbuffer=[];for(let vt=0;vt<6;vt++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[vt]),T.__webglDepthbuffer[vt]===void 0)T.__webglDepthbuffer[vt]=o.createRenderbuffer(),ht(T.__webglDepthbuffer[vt],N,!1);else{const xt=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,mt=T.__webglDepthbuffer[vt];o.bindRenderbuffer(o.RENDERBUFFER,mt),o.framebufferRenderbuffer(o.FRAMEBUFFER,xt,o.RENDERBUFFER,mt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),ht(T.__webglDepthbuffer,N,!1);else{const vt=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,xt=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,xt),o.framebufferRenderbuffer(o.FRAMEBUFFER,vt,o.RENDERBUFFER,xt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function wt(N,T,at){const vt=s.get(N);T!==void 0&&gt(vt.__webglFramebuffer,N,N.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),at!==void 0&&kt(N)}function Rt(N){const T=N.texture,at=s.get(N),vt=s.get(T);N.addEventListener("dispose",P);const xt=N.textures,mt=N.isWebGLCubeRenderTarget===!0,Yt=xt.length>1;if(Yt||(vt.__webglTexture===void 0&&(vt.__webglTexture=o.createTexture()),vt.__version=T.version,h.memory.textures++),mt){at.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(T.mipmaps&&T.mipmaps.length>0){at.__webglFramebuffer[Lt]=[];for(let zt=0;zt<T.mipmaps.length;zt++)at.__webglFramebuffer[Lt][zt]=o.createFramebuffer()}else at.__webglFramebuffer[Lt]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){at.__webglFramebuffer=[];for(let Lt=0;Lt<T.mipmaps.length;Lt++)at.__webglFramebuffer[Lt]=o.createFramebuffer()}else at.__webglFramebuffer=o.createFramebuffer();if(Yt)for(let Lt=0,zt=xt.length;Lt<zt;Lt++){const me=s.get(xt[Lt]);me.__webglTexture===void 0&&(me.__webglTexture=o.createTexture(),h.memory.textures++)}if(N.samples>0&&Kt(N)===!1){at.__webglMultisampledFramebuffer=o.createFramebuffer(),at.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Lt=0;Lt<xt.length;Lt++){const zt=xt[Lt];at.__webglColorRenderbuffer[Lt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,at.__webglColorRenderbuffer[Lt]);const me=f.convert(zt.format,zt.colorSpace),Et=f.convert(zt.type),Vt=z(zt.internalFormat,me,Et,zt.colorSpace,N.isXRRenderTarget===!0),Jt=ae(N);o.renderbufferStorageMultisample(o.RENDERBUFFER,Jt,Vt,N.width,N.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.RENDERBUFFER,at.__webglColorRenderbuffer[Lt])}o.bindRenderbuffer(o.RENDERBUFFER,null),N.depthBuffer&&(at.__webglDepthRenderbuffer=o.createRenderbuffer(),ht(at.__webglDepthRenderbuffer,N,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(mt){i.bindTexture(o.TEXTURE_CUBE_MAP,vt.__webglTexture),ee(o.TEXTURE_CUBE_MAP,T);for(let Lt=0;Lt<6;Lt++)if(T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)gt(at.__webglFramebuffer[Lt][zt],N,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else gt(at.__webglFramebuffer[Lt],N,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);S(T)&&y(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Yt){for(let Lt=0,zt=xt.length;Lt<zt;Lt++){const me=xt[Lt],Et=s.get(me);i.bindTexture(o.TEXTURE_2D,Et.__webglTexture),ee(o.TEXTURE_2D,me),gt(at.__webglFramebuffer,N,me,o.COLOR_ATTACHMENT0+Lt,o.TEXTURE_2D,0),S(me)&&y(o.TEXTURE_2D)}i.unbindTexture()}else{let Lt=o.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Lt=N.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Lt,vt.__webglTexture),ee(Lt,T),T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)gt(at.__webglFramebuffer[zt],N,T,o.COLOR_ATTACHMENT0,Lt,zt);else gt(at.__webglFramebuffer,N,T,o.COLOR_ATTACHMENT0,Lt,0);S(T)&&y(Lt),i.unbindTexture()}N.depthBuffer&&kt(N)}function Bt(N){const T=N.textures;for(let at=0,vt=T.length;at<vt;at++){const xt=T[at];if(S(xt)){const mt=B(N),Yt=s.get(xt).__webglTexture;i.bindTexture(mt,Yt),y(mt),i.unbindTexture()}}}const re=[],H=[];function hn(N){if(N.samples>0){if(Kt(N)===!1){const T=N.textures,at=N.width,vt=N.height;let xt=o.COLOR_BUFFER_BIT;const mt=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Yt=s.get(N),Lt=T.length>1;if(Lt)for(let zt=0;zt<T.length;zt++)i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let zt=0;zt<T.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(xt|=o.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(xt|=o.STENCIL_BUFFER_BIT)),Lt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Yt.__webglColorRenderbuffer[zt]);const me=s.get(T[zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,me,0)}o.blitFramebuffer(0,0,at,vt,0,0,at,vt,xt,o.NEAREST),p===!0&&(re.length=0,H.length=0,re.push(o.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(re.push(mt),H.push(mt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,H)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,re))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<T.length;zt++){i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,Yt.__webglColorRenderbuffer[zt]);const me=s.get(T[zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,me,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&p){const T=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function ae(N){return Math.min(c.maxSamples,N.samples)}function Kt(N){const T=s.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ct(N){const T=h.render.frame;_.get(N)!==T&&(_.set(N,T),N.update())}function ye(N,T){const at=N.colorSpace,vt=N.format,xt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||at!==mo&&at!==dr&&(we.getTransfer(at)===Be?(vt!==bi||xt!==Bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),T}function qt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(g.width=N.naturalWidth||N.width,g.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(g.width=N.displayWidth,g.height=N.displayHeight):(g.width=N.width,g.height=N.height),g}this.allocateTextureUnit=et,this.resetTextureUnits=W,this.setTexture2D=ut,this.setTexture2DArray=k,this.setTexture3D=st,this.setTextureCube=J,this.rebindTextures=wt,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=Bt,this.updateMultisampleRenderTarget=hn,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Kt}function GR(o,e){function i(s,c=dr){let f;const h=we.getTransfer(c);if(s===Bi)return o.UNSIGNED_BYTE;if(s===Ip)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Bp)return o.UNSIGNED_SHORT_5_5_5_1;if(s===_x)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===gx)return o.BYTE;if(s===vx)return o.SHORT;if(s===Sl)return o.UNSIGNED_SHORT;if(s===zp)return o.INT;if(s===$r)return o.UNSIGNED_INT;if(s===Ra)return o.FLOAT;if(s===vo)return o.HALF_FLOAT;if(s===xx)return o.ALPHA;if(s===yx)return o.RGB;if(s===bi)return o.RGBA;if(s===Sx)return o.LUMINANCE;if(s===Mx)return o.LUMINANCE_ALPHA;if(s===so)return o.DEPTH_COMPONENT;if(s===po)return o.DEPTH_STENCIL;if(s===Ex)return o.RED;if(s===Fp)return o.RED_INTEGER;if(s===Tx)return o.RG;if(s===Hp)return o.RG_INTEGER;if(s===Gp)return o.RGBA_INTEGER;if(s===_u||s===xu||s===yu||s===Su)if(h===Be)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===_u)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===xu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===yu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Su)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===_u)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===xu)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===yu)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Su)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ap||s===rp||s===sp||s===op)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===ap)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===rp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===sp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===op)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===lp||s===cp||s===up)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(s===lp||s===cp)return h===Be?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===up)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===fp||s===hp||s===dp||s===pp||s===mp||s===gp||s===vp||s===_p||s===xp||s===yp||s===Sp||s===Mp||s===Ep||s===Tp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(s===fp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===hp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===dp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===pp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===mp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===gp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===vp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===_p)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===xp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===yp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Sp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Mp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ep)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Tp)return h===Be?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Mu||s===bp||s===Ap)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(s===Mu)return h===Be?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===bp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ap)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===bx||s===Rp||s===Cp||s===Dp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(s===Mu)return f.COMPRESSED_RED_RGTC1_EXT;if(s===Rp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Cp)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Dp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ho?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const VR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kR=`
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

}`;class XR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,s){if(this.texture===null){const c=new Jn,f=e.properties.get(c);f.__webglTexture=i.texture,(i.depthNear!==s.depthNear||i.depthFar!==s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=c}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new ui({vertexShader:VR,fragmentShader:kR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new $i(new Nu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qR extends es{constructor(e,i){super();const s=this;let c=null,f=1,h=null,d="local-floor",p=1,g=null,_=null,v=null,x=null,M=null,C=null;const w=new XR,S=i.getContextAttributes();let y=null,B=null;const z=[],U=[],Q=new ue;let V=null;const P=new Ei;P.viewport=new an;const L=new Ei;L.viewport=new an;const b=[P,L],A=new fT;let I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let Z=z[D];return Z===void 0&&(Z=new Od,z[D]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(D){let Z=z[D];return Z===void 0&&(Z=new Od,z[D]=Z),Z.getGripSpace()},this.getHand=function(D){let Z=z[D];return Z===void 0&&(Z=new Od,z[D]=Z),Z.getHandSpace()};function et(D){const Z=U.indexOf(D.inputSource);if(Z===-1)return;const gt=z[Z];gt!==void 0&&(gt.update(D.inputSource,D.frame,g||h),gt.dispatchEvent({type:D.type,data:D.inputSource}))}function nt(){c.removeEventListener("select",et),c.removeEventListener("selectstart",et),c.removeEventListener("selectend",et),c.removeEventListener("squeeze",et),c.removeEventListener("squeezestart",et),c.removeEventListener("squeezeend",et),c.removeEventListener("end",nt),c.removeEventListener("inputsourceschange",ut);for(let D=0;D<z.length;D++){const Z=U[D];Z!==null&&(U[D]=null,z[D].disconnect(Z))}I=null,W=null,w.reset(),e.setRenderTarget(y),M=null,x=null,v=null,c=null,B=null,Te.stop(),s.isPresenting=!1,e.setPixelRatio(V),e.setSize(Q.width,Q.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){f=D,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){d=D,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return g||h},this.setReferenceSpace=function(D){g=D},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return v},this.getFrame=function(){return C},this.getSession=function(){return c},this.setSession=async function(D){if(c=D,c!==null){if(y=e.getRenderTarget(),c.addEventListener("select",et),c.addEventListener("selectstart",et),c.addEventListener("selectend",et),c.addEventListener("squeeze",et),c.addEventListener("squeezestart",et),c.addEventListener("squeezeend",et),c.addEventListener("end",nt),c.addEventListener("inputsourceschange",ut),S.xrCompatible!==!0&&await i.makeXRCompatible(),V=e.getPixelRatio(),e.getSize(Q),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,ht=null,bt=null;S.depth&&(bt=S.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,gt=S.stencil?po:so,ht=S.stencil?ho:$r);const kt={colorFormat:i.RGBA8,depthFormat:bt,scaleFactor:f};v=new XRWebGLBinding(c,i),x=v.createProjectionLayer(kt),c.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),B=new ta(x.textureWidth,x.textureHeight,{format:bi,type:Bi,depthTexture:new Fx(x.textureWidth,x.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const gt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:f};M=new XRWebGLLayer(c,i,gt),c.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),B=new ta(M.framebufferWidth,M.framebufferHeight,{format:bi,type:Bi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}B.isXRRenderTarget=!0,this.setFoveation(p),g=null,h=await c.requestReferenceSpace(d),Te.setContext(c),Te.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(c!==null)return c.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function ut(D){for(let Z=0;Z<D.removed.length;Z++){const gt=D.removed[Z],ht=U.indexOf(gt);ht>=0&&(U[ht]=null,z[ht].disconnect(gt))}for(let Z=0;Z<D.added.length;Z++){const gt=D.added[Z];let ht=U.indexOf(gt);if(ht===-1){for(let kt=0;kt<z.length;kt++)if(kt>=U.length){U.push(gt),ht=kt;break}else if(U[kt]===null){U[kt]=gt,ht=kt;break}if(ht===-1)break}const bt=z[ht];bt&&bt.connect(gt)}}const k=new it,st=new it;function J(D,Z,gt){k.setFromMatrixPosition(Z.matrixWorld),st.setFromMatrixPosition(gt.matrixWorld);const ht=k.distanceTo(st),bt=Z.projectionMatrix.elements,kt=gt.projectionMatrix.elements,wt=bt[14]/(bt[10]-1),Rt=bt[14]/(bt[10]+1),Bt=(bt[9]+1)/bt[5],re=(bt[9]-1)/bt[5],H=(bt[8]-1)/bt[0],hn=(kt[8]+1)/kt[0],ae=wt*H,Kt=wt*hn,Ct=ht/(-H+hn),ye=Ct*-H;if(Z.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(ye),D.translateZ(Ct),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert(),bt[10]===-1)D.projectionMatrix.copy(Z.projectionMatrix),D.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const qt=wt+Ct,N=Rt+Ct,T=ae-ye,at=Kt+(ht-ye),vt=Bt*Rt/N*qt,xt=re*Rt/N*qt;D.projectionMatrix.makePerspective(T,at,vt,xt,qt,N),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}}function yt(D,Z){Z===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(Z.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(c===null)return;let Z=D.near,gt=D.far;w.texture!==null&&(w.depthNear>0&&(Z=w.depthNear),w.depthFar>0&&(gt=w.depthFar)),A.near=L.near=P.near=Z,A.far=L.far=P.far=gt,(I!==A.near||W!==A.far)&&(c.updateRenderState({depthNear:A.near,depthFar:A.far}),I=A.near,W=A.far),P.layers.mask=D.layers.mask|2,L.layers.mask=D.layers.mask|4,A.layers.mask=P.layers.mask|L.layers.mask;const ht=D.parent,bt=A.cameras;yt(A,ht);for(let kt=0;kt<bt.length;kt++)yt(bt[kt],ht);bt.length===2?J(A,P,L):A.projectionMatrix.copy(P.projectionMatrix),St(D,A,ht)};function St(D,Z,gt){gt===null?D.matrix.copy(Z.matrixWorld):(D.matrix.copy(gt.matrixWorld),D.matrix.invert(),D.matrix.multiply(Z.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(Z.projectionMatrix),D.projectionMatrixInverse.copy(Z.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=wp*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(D){p=D,x!==null&&(x.fixedFoveation=D),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=D)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(A)};let Gt=null;function ee(D,Z){if(_=Z.getViewerPose(g||h),C=Z,_!==null){const gt=_.views;M!==null&&(e.setRenderTargetFramebuffer(B,M.framebuffer),e.setRenderTarget(B));let ht=!1;gt.length!==A.cameras.length&&(A.cameras.length=0,ht=!0);for(let wt=0;wt<gt.length;wt++){const Rt=gt[wt];let Bt=null;if(M!==null)Bt=M.getViewport(Rt);else{const H=v.getViewSubImage(x,Rt);Bt=H.viewport,wt===0&&(e.setRenderTargetTextures(B,H.colorTexture,x.ignoreDepthValues?void 0:H.depthStencilTexture),e.setRenderTarget(B))}let re=b[wt];re===void 0&&(re=new Ei,re.layers.enable(wt),re.viewport=new an,b[wt]=re),re.matrix.fromArray(Rt.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(Rt.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),wt===0&&(A.matrix.copy(re.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),ht===!0&&A.cameras.push(re)}const bt=c.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&c.depthUsage=="gpu-optimized"&&v){const wt=v.getDepthInformation(gt[0]);wt&&wt.isValid&&wt.texture&&w.init(e,wt,c.renderState)}}for(let gt=0;gt<z.length;gt++){const ht=U[gt],bt=z[gt];ht!==null&&bt!==void 0&&bt.update(ht,Z,g||h)}Gt&&Gt(D,Z),Z.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Z}),C=null}const Te=new Gx;Te.setAnimationLoop(ee),this.setAnimationLoop=function(D){Gt=D},this.dispose=function(){}}}const qr=new Ua,YR=new rn;function WR(o,e){function i(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function s(S,y){y.color.getRGB(S.fogColor.value,Px(o)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function c(S,y,B,z,U){y.isMeshBasicMaterial||y.isMeshLambertMaterial?f(S,y):y.isMeshToonMaterial?(f(S,y),v(S,y)):y.isMeshPhongMaterial?(f(S,y),_(S,y)):y.isMeshStandardMaterial?(f(S,y),x(S,y),y.isMeshPhysicalMaterial&&M(S,y,U)):y.isMeshMatcapMaterial?(f(S,y),C(S,y)):y.isMeshDepthMaterial?f(S,y):y.isMeshDistanceMaterial?(f(S,y),w(S,y)):y.isMeshNormalMaterial?f(S,y):y.isLineBasicMaterial?(h(S,y),y.isLineDashedMaterial&&d(S,y)):y.isPointsMaterial?p(S,y,B,z):y.isSpriteMaterial?g(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function f(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,i(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===Qn&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,i(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===Qn&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,i(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,i(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const B=e.get(y),z=B.envMap,U=B.envMapRotation;z&&(S.envMap.value=z,qr.copy(U),qr.x*=-1,qr.y*=-1,qr.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),S.envMapRotation.value.setFromMatrix4(YR.makeRotationFromEuler(qr)),S.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,S.aoMapTransform))}function h(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform))}function d(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function p(S,y,B,z){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*B,S.scale.value=z*.5,y.map&&(S.map.value=y.map,i(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function g(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function _(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function v(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function x(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function M(S,y,B){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===Qn&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=B.texture,S.transmissionSamplerSize.value.set(B.width,B.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,S.specularIntensityMapTransform))}function C(S,y){y.matcap&&(S.matcap.value=y.matcap)}function w(S,y){const B=e.get(y).light;S.referencePosition.value.setFromMatrixPosition(B.matrixWorld),S.nearDistance.value=B.shadow.camera.near,S.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:c}}function jR(o,e,i,s){let c={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(B,z){const U=z.program;s.uniformBlockBinding(B,U)}function g(B,z){let U=c[B.id];U===void 0&&(C(B),U=_(B),c[B.id]=U,B.addEventListener("dispose",S));const Q=z.program;s.updateUBOMapping(B,Q);const V=e.render.frame;f[B.id]!==V&&(x(B),f[B.id]=V)}function _(B){const z=v();B.__bindingPointIndex=z;const U=o.createBuffer(),Q=B.__size,V=B.usage;return o.bindBuffer(o.UNIFORM_BUFFER,U),o.bufferData(o.UNIFORM_BUFFER,Q,V),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,z,U),U}function v(){for(let B=0;B<d;B++)if(h.indexOf(B)===-1)return h.push(B),B;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(B){const z=c[B.id],U=B.uniforms,Q=B.__cache;o.bindBuffer(o.UNIFORM_BUFFER,z);for(let V=0,P=U.length;V<P;V++){const L=Array.isArray(U[V])?U[V]:[U[V]];for(let b=0,A=L.length;b<A;b++){const I=L[b];if(M(I,V,b,Q)===!0){const W=I.__offset,et=Array.isArray(I.value)?I.value:[I.value];let nt=0;for(let ut=0;ut<et.length;ut++){const k=et[ut],st=w(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,o.bufferSubData(o.UNIFORM_BUFFER,W+nt,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):(k.toArray(I.__data,nt),nt+=st.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,W,I.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(B,z,U,Q){const V=B.value,P=z+"_"+U;if(Q[P]===void 0)return typeof V=="number"||typeof V=="boolean"?Q[P]=V:Q[P]=V.clone(),!0;{const L=Q[P];if(typeof V=="number"||typeof V=="boolean"){if(L!==V)return Q[P]=V,!0}else if(L.equals(V)===!1)return L.copy(V),!0}return!1}function C(B){const z=B.uniforms;let U=0;const Q=16;for(let P=0,L=z.length;P<L;P++){const b=Array.isArray(z[P])?z[P]:[z[P]];for(let A=0,I=b.length;A<I;A++){const W=b[A],et=Array.isArray(W.value)?W.value:[W.value];for(let nt=0,ut=et.length;nt<ut;nt++){const k=et[nt],st=w(k),J=U%Q,yt=J%st.boundary,St=J+yt;U+=yt,St!==0&&Q-St<st.storage&&(U+=Q-St),W.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=U,U+=st.storage}}}const V=U%Q;return V>0&&(U+=Q-V),B.__size=U,B.__cache={},this}function w(B){const z={boundary:0,storage:0};return typeof B=="number"||typeof B=="boolean"?(z.boundary=4,z.storage=4):B.isVector2?(z.boundary=8,z.storage=8):B.isVector3||B.isColor?(z.boundary=16,z.storage=12):B.isVector4?(z.boundary=16,z.storage=16):B.isMatrix3?(z.boundary=48,z.storage=48):B.isMatrix4?(z.boundary=64,z.storage=64):B.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",B),z}function S(B){const z=B.target;z.removeEventListener("dispose",S);const U=h.indexOf(z.__bindingPointIndex);h.splice(U,1),o.deleteBuffer(c[z.id]),delete c[z.id],delete f[z.id]}function y(){for(const B in c)o.deleteBuffer(c[B]);h=[],c={},f={}}return{bind:p,update:g,dispose:y}}class ZR{constructor(e={}){const{canvas:i=NE(),context:s=null,depth:c=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:g=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const C=new Uint32Array(4),w=new Int32Array(4);let S=null,y=null;const B=[],z=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ci,this.toneMapping=Da,this.toneMappingExposure=1;const U=this;let Q=!1,V=0,P=0,L=null,b=-1,A=null;const I=new an,W=new an;let et=null;const nt=new He(0);let ut=0,k=i.width,st=i.height,J=1,yt=null,St=null;const Gt=new an(0,0,k,st),ee=new an(0,0,k,st);let Te=!1;const D=new Bx;let Z=!1,gt=!1;this.transmissionResolutionScale=1;const ht=new rn,bt=new rn,kt=new it,wt=new an,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Bt=!1;function re(){return L===null?J:1}let H=s;function hn(R,j){return i.getContext(R,j)}try{const R={alpha:!0,depth:c,stencil:f,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:g,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Pp}`),i.addEventListener("webglcontextlost",_t,!1),i.addEventListener("webglcontextrestored",Pt,!1),i.addEventListener("webglcontextcreationerror",It,!1),H===null){const j="webgl2";if(H=hn(j,R),H===null)throw hn(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ae,Kt,Ct,ye,qt,N,T,at,vt,xt,mt,Yt,Lt,zt,me,Et,Vt,Jt,te,Ht,pe,oe,ze,G;function Ot(){ae=new rA(H),ae.init(),oe=new GR(H,ae),Kt=new J1(H,ae,e,oe),Ct=new FR(H,ae),Kt.reverseDepthBuffer&&x&&Ct.buffers.depth.setReversed(!0),ye=new lA(H),qt=new AR,N=new HR(H,ae,Ct,qt,Kt,oe,ye),T=new tA(U),at=new aA(U),vt=new pT(H),ze=new K1(H,vt),xt=new sA(H,vt,ye,ze),mt=new uA(H,xt,vt,ye),te=new cA(H,Kt,N),Et=new $1(qt),Yt=new bR(U,T,at,ae,Kt,ze,Et),Lt=new WR(U,qt),zt=new CR,me=new OR(ae),Jt=new Z1(U,T,at,Ct,mt,M,p),Vt=new IR(U,mt,Kt),G=new jR(H,ye,Kt,Ct),Ht=new Q1(H,ae,ye),pe=new oA(H,ae,ye),ye.programs=Yt.programs,U.capabilities=Kt,U.extensions=ae,U.properties=qt,U.renderLists=zt,U.shadowMap=Vt,U.state=Ct,U.info=ye}Ot();const ft=new qR(U,H);this.xr=ft,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const R=ae.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ae.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(R){R!==void 0&&(J=R,this.setSize(k,st,!1))},this.getSize=function(R){return R.set(k,st)},this.setSize=function(R,j,ot=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=R,st=j,i.width=Math.floor(R*J),i.height=Math.floor(j*J),ot===!0&&(i.style.width=R+"px",i.style.height=j+"px"),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(k*J,st*J).floor()},this.setDrawingBufferSize=function(R,j,ot){k=R,st=j,J=ot,i.width=Math.floor(R*ot),i.height=Math.floor(j*ot),this.setViewport(0,0,R,j)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(Gt)},this.setViewport=function(R,j,ot,ct){R.isVector4?Gt.set(R.x,R.y,R.z,R.w):Gt.set(R,j,ot,ct),Ct.viewport(I.copy(Gt).multiplyScalar(J).round())},this.getScissor=function(R){return R.copy(ee)},this.setScissor=function(R,j,ot,ct){R.isVector4?ee.set(R.x,R.y,R.z,R.w):ee.set(R,j,ot,ct),Ct.scissor(W.copy(ee).multiplyScalar(J).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(R){Ct.setScissorTest(Te=R)},this.setOpaqueSort=function(R){yt=R},this.setTransparentSort=function(R){St=R},this.getClearColor=function(R){return R.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(R=!0,j=!0,ot=!0){let ct=0;if(R){let K=!1;if(L!==null){const Mt=L.texture.format;K=Mt===Gp||Mt===Hp||Mt===Fp}if(K){const Mt=L.texture.type,At=Mt===Bi||Mt===$r||Mt===Sl||Mt===ho||Mt===Ip||Mt===Bp,Tt=Jt.getClearColor(),Ut=Jt.getClearAlpha(),Qt=Tt.r,ne=Tt.g,Zt=Tt.b;At?(C[0]=Qt,C[1]=ne,C[2]=Zt,C[3]=Ut,H.clearBufferuiv(H.COLOR,0,C)):(w[0]=Qt,w[1]=ne,w[2]=Zt,w[3]=Ut,H.clearBufferiv(H.COLOR,0,w))}else ct|=H.COLOR_BUFFER_BIT}j&&(ct|=H.DEPTH_BUFFER_BIT),ot&&(ct|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(ct)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_t,!1),i.removeEventListener("webglcontextrestored",Pt,!1),i.removeEventListener("webglcontextcreationerror",It,!1),Jt.dispose(),zt.dispose(),me.dispose(),qt.dispose(),T.dispose(),at.dispose(),mt.dispose(),ze.dispose(),G.dispose(),Yt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",On),ft.removeEventListener("sessionend",bl),ea.stop()};function _t(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Q=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),Q=!1;const R=ye.autoReset,j=Vt.enabled,ot=Vt.autoUpdate,ct=Vt.needsUpdate,K=Vt.type;Ot(),ye.autoReset=R,Vt.enabled=j,Vt.autoUpdate=ot,Vt.needsUpdate=ct,Vt.type=K}function It(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function se(R){const j=R.target;j.removeEventListener("dispose",se),Ke(j)}function Ke(R){_n(R),qt.remove(R)}function _n(R){const j=qt.get(R).programs;j!==void 0&&(j.forEach(function(ot){Yt.releaseProgram(ot)}),R.isShaderMaterial&&Yt.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,ot,ct,K,Mt){j===null&&(j=Rt);const At=K.isMesh&&K.matrixWorld.determinant()<0,Tt=Ou(R,j,ot,ct,K);Ct.setMaterial(ct,At);let Ut=ot.index,Qt=1;if(ct.wireframe===!0){if(Ut=xt.getWireframeAttribute(ot),Ut===void 0)return;Qt=2}const ne=ot.drawRange,Zt=ot.attributes.position;let Ae=ne.start*Qt,Ce=(ne.start+ne.count)*Qt;Mt!==null&&(Ae=Math.max(Ae,Mt.start*Qt),Ce=Math.min(Ce,(Mt.start+Mt.count)*Qt)),Ut!==null?(Ae=Math.max(Ae,0),Ce=Math.min(Ce,Ut.count)):Zt!=null&&(Ae=Math.max(Ae,0),Ce=Math.min(Ce,Zt.count));const Xe=Ce-Ae;if(Xe<0||Xe===1/0)return;ze.setup(K,ct,Tt,ot,Ut);let Ge,ge=Ht;if(Ut!==null&&(Ge=vt.get(Ut),ge=pe,ge.setIndex(Ge)),K.isMesh)ct.wireframe===!0?(Ct.setLineWidth(ct.wireframeLinewidth*re()),ge.setMode(H.LINES)):ge.setMode(H.TRIANGLES);else if(K.isLine){let Wt=ct.linewidth;Wt===void 0&&(Wt=1),Ct.setLineWidth(Wt*re()),K.isLineSegments?ge.setMode(H.LINES):K.isLineLoop?ge.setMode(H.LINE_LOOP):ge.setMode(H.LINE_STRIP)}else K.isPoints?ge.setMode(H.POINTS):K.isSprite&&ge.setMode(H.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Yr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ge.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))ge.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Wt=K._multiDrawStarts,Qe=K._multiDrawCounts,Se=K._multiDrawCount,yn=Ut?vt.get(Ut).bytesPerElement:1,Ze=qt.get(ct).currentProgram.getUniforms();for(let Pn=0;Pn<Se;Pn++)Ze.setValue(H,"_gl_DrawID",Pn),ge.render(Wt[Pn]/yn,Qe[Pn])}else if(K.isInstancedMesh)ge.renderInstances(Ae,Xe,K.count);else if(ot.isInstancedBufferGeometry){const Wt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,Qe=Math.min(ot.instanceCount,Wt);ge.renderInstances(Ae,Xe,Qe)}else ge.render(Ae,Xe)};function be(R,j,ot){R.transparent===!0&&R.side===Aa&&R.forceSinglePass===!1?(R.side=Qn,R.needsUpdate=!0,ia(R,j,ot),R.side=mr,R.needsUpdate=!0,ia(R,j,ot),R.side=Aa):ia(R,j,ot)}this.compile=function(R,j,ot=null){ot===null&&(ot=R),y=me.get(ot),y.init(j),z.push(y),ot.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(y.pushLight(K),K.castShadow&&y.pushShadow(K))}),R!==ot&&R.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(y.pushLight(K),K.castShadow&&y.pushShadow(K))}),y.setupLights();const ct=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Mt=K.material;if(Mt)if(Array.isArray(Mt))for(let At=0;At<Mt.length;At++){const Tt=Mt[At];be(Tt,ot,K),ct.add(Tt)}else be(Mt,ot,K),ct.add(Mt)}),y=z.pop(),ct},this.compileAsync=function(R,j,ot=null){const ct=this.compile(R,j,ot);return new Promise(K=>{function Mt(){if(ct.forEach(function(At){qt.get(At).currentProgram.isReady()&&ct.delete(At)}),ct.size===0){K(R);return}setTimeout(Mt,10)}ae.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let je=null;function xn(R){je&&je(R)}function On(){ea.stop()}function bl(){ea.start()}const ea=new Gx;ea.setAnimationLoop(xn),typeof self<"u"&&ea.setContext(self),this.setAnimationLoop=function(R){je=R,ft.setAnimationLoop(R),R===null?ea.stop():ea.start()},ft.addEventListener("sessionstart",On),ft.addEventListener("sessionend",bl),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(j),j=ft.getCamera()),R.isScene===!0&&R.onBeforeRender(U,R,j,L),y=me.get(R,z.length),y.init(j),z.push(y),bt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),D.setFromProjectionMatrix(bt),gt=this.localClippingEnabled,Z=Et.init(this.clippingPlanes,gt),S=zt.get(R,B.length),S.init(),B.push(S),ft.enabled===!0&&ft.isPresenting===!0){const Mt=U.xr.getDepthSensingMesh();Mt!==null&&xo(Mt,j,-1/0,U.sortObjects)}xo(R,j,0,U.sortObjects),S.finish(),U.sortObjects===!0&&S.sort(yt,St),Bt=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,Bt&&Jt.addToRenderList(S,R),this.info.render.frame++,Z===!0&&Et.beginShadows();const ot=y.state.shadowsArray;Vt.render(ot,R,j),Z===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset();const ct=S.opaque,K=S.transmissive;if(y.setupLights(),j.isArrayCamera){const Mt=j.cameras;if(K.length>0)for(let At=0,Tt=Mt.length;At<Tt;At++){const Ut=Mt[At];_r(ct,K,R,Ut)}Bt&&Jt.render(R);for(let At=0,Tt=Mt.length;At<Tt;At++){const Ut=Mt[At];vr(S,R,Ut,Ut.viewport)}}else K.length>0&&_r(ct,K,R,j),Bt&&Jt.render(R),vr(S,R,j);L!==null&&P===0&&(N.updateMultisampleRenderTarget(L),N.updateRenderTargetMipmap(L)),R.isScene===!0&&R.onAfterRender(U,R,j),ze.resetDefaultState(),b=-1,A=null,z.pop(),z.length>0?(y=z[z.length-1],Z===!0&&Et.setGlobalState(U.clippingPlanes,y.state.camera)):y=null,B.pop(),B.length>0?S=B[B.length-1]:S=null};function xo(R,j,ot,ct){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)ot=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLight)y.pushLight(R),R.castShadow&&y.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||D.intersectsSprite(R)){ct&&wt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(bt);const At=mt.update(R),Tt=R.material;Tt.visible&&S.push(R,At,Tt,ot,wt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||D.intersectsObject(R))){const At=mt.update(R),Tt=R.material;if(ct&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),wt.copy(R.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),wt.copy(At.boundingSphere.center)),wt.applyMatrix4(R.matrixWorld).applyMatrix4(bt)),Array.isArray(Tt)){const Ut=At.groups;for(let Qt=0,ne=Ut.length;Qt<ne;Qt++){const Zt=Ut[Qt],Ae=Tt[Zt.materialIndex];Ae&&Ae.visible&&S.push(R,At,Ae,ot,wt.z,Zt)}}else Tt.visible&&S.push(R,At,Tt,ot,wt.z,null)}}const Mt=R.children;for(let At=0,Tt=Mt.length;At<Tt;At++)xo(Mt[At],j,ot,ct)}function vr(R,j,ot,ct){const K=R.opaque,Mt=R.transmissive,At=R.transparent;y.setupLightsView(ot),Z===!0&&Et.setGlobalState(U.clippingPlanes,ot),ct&&Ct.viewport(I.copy(ct)),K.length>0&&na(K,j,ot),Mt.length>0&&na(Mt,j,ot),At.length>0&&na(At,j,ot),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function _r(R,j,ot,ct){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[ct.id]===void 0&&(y.state.transmissionRenderTarget[ct.id]=new ta(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?vo:Bi,minFilter:Qr,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const Mt=y.state.transmissionRenderTarget[ct.id],At=ct.viewport||I;Mt.setSize(At.z*U.transmissionResolutionScale,At.w*U.transmissionResolutionScale);const Tt=U.getRenderTarget();U.setRenderTarget(Mt),U.getClearColor(nt),ut=U.getClearAlpha(),ut<1&&U.setClearColor(16777215,.5),U.clear(),Bt&&Jt.render(ot);const Ut=U.toneMapping;U.toneMapping=Da;const Qt=ct.viewport;if(ct.viewport!==void 0&&(ct.viewport=void 0),y.setupLightsView(ct),Z===!0&&Et.setGlobalState(U.clippingPlanes,ct),na(R,ot,ct),N.updateMultisampleRenderTarget(Mt),N.updateRenderTargetMipmap(Mt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let Zt=0,Ae=j.length;Zt<Ae;Zt++){const Ce=j[Zt],Xe=Ce.object,Ge=Ce.geometry,ge=Ce.material,Wt=Ce.group;if(ge.side===Aa&&Xe.layers.test(ct.layers)){const Qe=ge.side;ge.side=Qn,ge.needsUpdate=!0,Fi(Xe,ot,ct,Ge,ge,Wt),ge.side=Qe,ge.needsUpdate=!0,ne=!0}}ne===!0&&(N.updateMultisampleRenderTarget(Mt),N.updateRenderTargetMipmap(Mt))}U.setRenderTarget(Tt),U.setClearColor(nt,ut),Qt!==void 0&&(ct.viewport=Qt),U.toneMapping=Ut}function na(R,j,ot){const ct=j.isScene===!0?j.overrideMaterial:null;for(let K=0,Mt=R.length;K<Mt;K++){const At=R[K],Tt=At.object,Ut=At.geometry,Qt=ct===null?At.material:ct,ne=At.group;Tt.layers.test(ot.layers)&&Fi(Tt,j,ot,Ut,Qt,ne)}}function Fi(R,j,ot,ct,K,Mt){R.onBeforeRender(U,j,ot,ct,K,Mt),R.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(U,j,ot,ct,R,Mt),K.transparent===!0&&K.side===Aa&&K.forceSinglePass===!1?(K.side=Qn,K.needsUpdate=!0,U.renderBufferDirect(ot,j,ct,K,R,Mt),K.side=mr,K.needsUpdate=!0,U.renderBufferDirect(ot,j,ct,K,R,Mt),K.side=Aa):U.renderBufferDirect(ot,j,ct,K,R,Mt),R.onAfterRender(U,j,ot,ct,K,Mt)}function ia(R,j,ot){j.isScene!==!0&&(j=Rt);const ct=qt.get(R),K=y.state.lights,Mt=y.state.shadowsArray,At=K.state.version,Tt=Yt.getParameters(R,K.state,Mt,j,ot),Ut=Yt.getProgramCacheKey(Tt);let Qt=ct.programs;ct.environment=R.isMeshStandardMaterial?j.environment:null,ct.fog=j.fog,ct.envMap=(R.isMeshStandardMaterial?at:T).get(R.envMap||ct.environment),ct.envMapRotation=ct.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,Qt===void 0&&(R.addEventListener("dispose",se),Qt=new Map,ct.programs=Qt);let ne=Qt.get(Ut);if(ne!==void 0){if(ct.currentProgram===ne&&ct.lightsStateVersion===At)return yo(R,Tt),ne}else Tt.uniforms=Yt.getUniforms(R),R.onBeforeCompile(Tt,U),ne=Yt.acquireProgram(Tt,Ut),Qt.set(Ut,ne),ct.uniforms=Tt.uniforms;const Zt=ct.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Zt.clippingPlanes=Et.uniform),yo(R,Tt),ct.needsLights=So(R),ct.lightsStateVersion=At,ct.needsLights&&(Zt.ambientLightColor.value=K.state.ambient,Zt.lightProbe.value=K.state.probe,Zt.directionalLights.value=K.state.directional,Zt.directionalLightShadows.value=K.state.directionalShadow,Zt.spotLights.value=K.state.spot,Zt.spotLightShadows.value=K.state.spotShadow,Zt.rectAreaLights.value=K.state.rectArea,Zt.ltc_1.value=K.state.rectAreaLTC1,Zt.ltc_2.value=K.state.rectAreaLTC2,Zt.pointLights.value=K.state.point,Zt.pointLightShadows.value=K.state.pointShadow,Zt.hemisphereLights.value=K.state.hemi,Zt.directionalShadowMap.value=K.state.directionalShadowMap,Zt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Zt.spotShadowMap.value=K.state.spotShadowMap,Zt.spotLightMatrix.value=K.state.spotLightMatrix,Zt.spotLightMap.value=K.state.spotLightMap,Zt.pointShadowMap.value=K.state.pointShadowMap,Zt.pointShadowMatrix.value=K.state.pointShadowMatrix),ct.currentProgram=ne,ct.uniformsList=null,ne}function Na(R){if(R.uniformsList===null){const j=R.currentProgram.getUniforms();R.uniformsList=Tu.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function yo(R,j){const ot=qt.get(R);ot.outputColorSpace=j.outputColorSpace,ot.batching=j.batching,ot.batchingColor=j.batchingColor,ot.instancing=j.instancing,ot.instancingColor=j.instancingColor,ot.instancingMorph=j.instancingMorph,ot.skinning=j.skinning,ot.morphTargets=j.morphTargets,ot.morphNormals=j.morphNormals,ot.morphColors=j.morphColors,ot.morphTargetsCount=j.morphTargetsCount,ot.numClippingPlanes=j.numClippingPlanes,ot.numIntersection=j.numClipIntersection,ot.vertexAlphas=j.vertexAlphas,ot.vertexTangents=j.vertexTangents,ot.toneMapping=j.toneMapping}function Ou(R,j,ot,ct,K){j.isScene!==!0&&(j=Rt),N.resetTextureUnits();const Mt=j.fog,At=ct.isMeshStandardMaterial?j.environment:null,Tt=L===null?U.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:mo,Ut=(ct.isMeshStandardMaterial?at:T).get(ct.envMap||At),Qt=ct.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,ne=!!ot.attributes.tangent&&(!!ct.normalMap||ct.anisotropy>0),Zt=!!ot.morphAttributes.position,Ae=!!ot.morphAttributes.normal,Ce=!!ot.morphAttributes.color;let Xe=Da;ct.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Xe=U.toneMapping);const Ge=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,ge=Ge!==void 0?Ge.length:0,Wt=qt.get(ct),Qe=y.state.lights;if(Z===!0&&(gt===!0||R!==A)){const bn=R===A&&ct.id===b;Et.setState(ct,R,bn)}let Se=!1;ct.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Qe.state.version||Wt.outputColorSpace!==Tt||K.isBatchedMesh&&Wt.batching===!1||!K.isBatchedMesh&&Wt.batching===!0||K.isBatchedMesh&&Wt.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Wt.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Wt.instancing===!1||!K.isInstancedMesh&&Wt.instancing===!0||K.isSkinnedMesh&&Wt.skinning===!1||!K.isSkinnedMesh&&Wt.skinning===!0||K.isInstancedMesh&&Wt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Wt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Wt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Wt.instancingMorph===!1&&K.morphTexture!==null||Wt.envMap!==Ut||ct.fog===!0&&Wt.fog!==Mt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==Et.numPlanes||Wt.numIntersection!==Et.numIntersection)||Wt.vertexAlphas!==Qt||Wt.vertexTangents!==ne||Wt.morphTargets!==Zt||Wt.morphNormals!==Ae||Wt.morphColors!==Ce||Wt.toneMapping!==Xe||Wt.morphTargetsCount!==ge)&&(Se=!0):(Se=!0,Wt.__version=ct.version);let yn=Wt.currentProgram;Se===!0&&(yn=ia(ct,j,K));let Ze=!1,Pn=!1,La=!1;const Ve=yn.getUniforms(),sn=Wt.uniforms;if(Ct.useProgram(yn.program)&&(Ze=!0,Pn=!0,La=!0),ct.id!==b&&(b=ct.id,Pn=!0),Ze||A!==R){Ct.buffers.depth.getReversed()?(ht.copy(R.projectionMatrix),OE(ht),PE(ht),Ve.setValue(H,"projectionMatrix",ht)):Ve.setValue(H,"projectionMatrix",R.projectionMatrix),Ve.setValue(H,"viewMatrix",R.matrixWorldInverse);const An=Ve.map.cameraPosition;An!==void 0&&An.setValue(H,kt.setFromMatrixPosition(R.matrixWorld)),Kt.logarithmicDepthBuffer&&Ve.setValue(H,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ct.isMeshPhongMaterial||ct.isMeshToonMaterial||ct.isMeshLambertMaterial||ct.isMeshBasicMaterial||ct.isMeshStandardMaterial||ct.isShaderMaterial)&&Ve.setValue(H,"isOrthographic",R.isOrthographicCamera===!0),A!==R&&(A=R,Pn=!0,La=!0)}if(K.isSkinnedMesh){Ve.setOptional(H,K,"bindMatrix"),Ve.setOptional(H,K,"bindMatrixInverse");const bn=K.skeleton;bn&&(bn.boneTexture===null&&bn.computeBoneTexture(),Ve.setValue(H,"boneTexture",bn.boneTexture,N))}K.isBatchedMesh&&(Ve.setOptional(H,K,"batchingTexture"),Ve.setValue(H,"batchingTexture",K._matricesTexture,N),Ve.setOptional(H,K,"batchingIdTexture"),Ve.setValue(H,"batchingIdTexture",K._indirectTexture,N),Ve.setOptional(H,K,"batchingColorTexture"),K._colorsTexture!==null&&Ve.setValue(H,"batchingColorTexture",K._colorsTexture,N));const dn=ot.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&te.update(K,ot,yn),(Pn||Wt.receiveShadow!==K.receiveShadow)&&(Wt.receiveShadow=K.receiveShadow,Ve.setValue(H,"receiveShadow",K.receiveShadow)),ct.isMeshGouraudMaterial&&ct.envMap!==null&&(sn.envMap.value=Ut,sn.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),ct.isMeshStandardMaterial&&ct.envMap===null&&j.environment!==null&&(sn.envMapIntensity.value=j.environmentIntensity),Pn&&(Ve.setValue(H,"toneMappingExposure",U.toneMappingExposure),Wt.needsLights&&Al(sn,La),Mt&&ct.fog===!0&&Lt.refreshFogUniforms(sn,Mt),Lt.refreshMaterialUniforms(sn,ct,J,st,y.state.transmissionRenderTarget[R.id]),Tu.upload(H,Na(Wt),sn,N)),ct.isShaderMaterial&&ct.uniformsNeedUpdate===!0&&(Tu.upload(H,Na(Wt),sn,N),ct.uniformsNeedUpdate=!1),ct.isSpriteMaterial&&Ve.setValue(H,"center",K.center),Ve.setValue(H,"modelViewMatrix",K.modelViewMatrix),Ve.setValue(H,"normalMatrix",K.normalMatrix),Ve.setValue(H,"modelMatrix",K.matrixWorld),ct.isShaderMaterial||ct.isRawShaderMaterial){const bn=ct.uniformsGroups;for(let An=0,ns=bn.length;An<ns;An++){const aa=bn[An];G.update(aa,yn),G.bind(aa,yn)}}return yn}function Al(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function So(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(R,j,ot){qt.get(R.texture).__webglTexture=j,qt.get(R.depthTexture).__webglTexture=ot;const ct=qt.get(R);ct.__hasExternalTextures=!0,ct.__autoAllocateDepthBuffer=ot===void 0,ct.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ct.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,j){const ot=qt.get(R);ot.__webglFramebuffer=j,ot.__useDefaultFramebuffer=j===void 0};const xr=H.createFramebuffer();this.setRenderTarget=function(R,j=0,ot=0){L=R,V=j,P=ot;let ct=!0,K=null,Mt=!1,At=!1;if(R){const Ut=qt.get(R);if(Ut.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(H.FRAMEBUFFER,null),ct=!1;else if(Ut.__webglFramebuffer===void 0)N.setupRenderTarget(R);else if(Ut.__hasExternalTextures)N.rebindTextures(R,qt.get(R.texture).__webglTexture,qt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Zt=R.depthTexture;if(Ut.__boundDepthTexture!==Zt){if(Zt!==null&&qt.has(Zt)&&(R.width!==Zt.image.width||R.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(R)}}const Qt=R.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(At=!0);const ne=qt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ne[j])?K=ne[j][ot]:K=ne[j],Mt=!0):R.samples>0&&N.useMultisampledRTT(R)===!1?K=qt.get(R).__webglMultisampledFramebuffer:Array.isArray(ne)?K=ne[ot]:K=ne,I.copy(R.viewport),W.copy(R.scissor),et=R.scissorTest}else I.copy(Gt).multiplyScalar(J).floor(),W.copy(ee).multiplyScalar(J).floor(),et=Te;if(ot!==0&&(K=xr),Ct.bindFramebuffer(H.FRAMEBUFFER,K)&&ct&&Ct.drawBuffers(R,K),Ct.viewport(I),Ct.scissor(W),Ct.setScissorTest(et),Mt){const Ut=qt.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ut.__webglTexture,ot)}else if(At){const Ut=qt.get(R.texture),Qt=j;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ut.__webglTexture,ot,Qt)}else if(R!==null&&ot!==0){const Ut=qt.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ut.__webglTexture,ot)}b=-1},this.readRenderTargetPixels=function(R,j,ot,ct,K,Mt,At){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=qt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&At!==void 0&&(Tt=Tt[At]),Tt){Ct.bindFramebuffer(H.FRAMEBUFFER,Tt);try{const Ut=R.texture,Qt=Ut.format,ne=Ut.type;if(!Kt.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-ct&&ot>=0&&ot<=R.height-K&&H.readPixels(j,ot,ct,K,oe.convert(Qt),oe.convert(ne),Mt)}finally{const Ut=L!==null?qt.get(L).__webglFramebuffer:null;Ct.bindFramebuffer(H.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(R,j,ot,ct,K,Mt,At){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=qt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&At!==void 0&&(Tt=Tt[At]),Tt){const Ut=R.texture,Qt=Ut.format,ne=Ut.type;if(!Kt.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=R.width-ct&&ot>=0&&ot<=R.height-K){Ct.bindFramebuffer(H.FRAMEBUFFER,Tt);const Zt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Zt),H.bufferData(H.PIXEL_PACK_BUFFER,Mt.byteLength,H.STREAM_READ),H.readPixels(j,ot,ct,K,oe.convert(Qt),oe.convert(ne),0);const Ae=L!==null?qt.get(L).__webglFramebuffer:null;Ct.bindFramebuffer(H.FRAMEBUFFER,Ae);const Ce=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await LE(H,Ce,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Zt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Mt),H.deleteBuffer(Zt),H.deleteSync(Ce),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,j=null,ot=0){R.isTexture!==!0&&(Yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,R=arguments[1]);const ct=Math.pow(2,-ot),K=Math.floor(R.image.width*ct),Mt=Math.floor(R.image.height*ct),At=j!==null?j.x:0,Tt=j!==null?j.y:0;N.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,ot,0,0,At,Tt,K,Mt),Ct.unbindTexture()};const Pu=H.createFramebuffer(),Rl=H.createFramebuffer();this.copyTextureToTexture=function(R,j,ot=null,ct=null,K=0,Mt=null){R.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture function signature has changed."),ct=arguments[0]||null,R=arguments[1],j=arguments[2],Mt=arguments[3]||0,ot=null),Mt===null&&(K!==0?(Yr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Mt=K,K=0):Mt=0);let At,Tt,Ut,Qt,ne,Zt,Ae,Ce,Xe;const Ge=R.isCompressedTexture?R.mipmaps[Mt]:R.image;if(ot!==null)At=ot.max.x-ot.min.x,Tt=ot.max.y-ot.min.y,Ut=ot.isBox3?ot.max.z-ot.min.z:1,Qt=ot.min.x,ne=ot.min.y,Zt=ot.isBox3?ot.min.z:0;else{const dn=Math.pow(2,-K);At=Math.floor(Ge.width*dn),Tt=Math.floor(Ge.height*dn),R.isDataArrayTexture?Ut=Ge.depth:R.isData3DTexture?Ut=Math.floor(Ge.depth*dn):Ut=1,Qt=0,ne=0,Zt=0}ct!==null?(Ae=ct.x,Ce=ct.y,Xe=ct.z):(Ae=0,Ce=0,Xe=0);const ge=oe.convert(j.format),Wt=oe.convert(j.type);let Qe;j.isData3DTexture?(N.setTexture3D(j,0),Qe=H.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(N.setTexture2DArray(j,0),Qe=H.TEXTURE_2D_ARRAY):(N.setTexture2D(j,0),Qe=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,j.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,j.unpackAlignment);const Se=H.getParameter(H.UNPACK_ROW_LENGTH),yn=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Ze=H.getParameter(H.UNPACK_SKIP_PIXELS),Pn=H.getParameter(H.UNPACK_SKIP_ROWS),La=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ge.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ge.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Qt),H.pixelStorei(H.UNPACK_SKIP_ROWS,ne),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Zt);const Ve=R.isDataArrayTexture||R.isData3DTexture,sn=j.isDataArrayTexture||j.isData3DTexture;if(R.isDepthTexture){const dn=qt.get(R),bn=qt.get(j),An=qt.get(dn.__renderTarget),ns=qt.get(bn.__renderTarget);Ct.bindFramebuffer(H.READ_FRAMEBUFFER,An.__webglFramebuffer),Ct.bindFramebuffer(H.DRAW_FRAMEBUFFER,ns.__webglFramebuffer);for(let aa=0;aa<Ut;aa++)Ve&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,qt.get(R).__webglTexture,K,Zt+aa),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,qt.get(j).__webglTexture,Mt,Xe+aa)),H.blitFramebuffer(Qt,ne,At,Tt,Ae,Ce,At,Tt,H.DEPTH_BUFFER_BIT,H.NEAREST);Ct.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(K!==0||R.isRenderTargetTexture||qt.has(R)){const dn=qt.get(R),bn=qt.get(j);Ct.bindFramebuffer(H.READ_FRAMEBUFFER,Pu),Ct.bindFramebuffer(H.DRAW_FRAMEBUFFER,Rl);for(let An=0;An<Ut;An++)Ve?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,dn.__webglTexture,K,Zt+An):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,dn.__webglTexture,K),sn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,bn.__webglTexture,Mt,Xe+An):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,bn.__webglTexture,Mt),K!==0?H.blitFramebuffer(Qt,ne,At,Tt,Ae,Ce,At,Tt,H.COLOR_BUFFER_BIT,H.NEAREST):sn?H.copyTexSubImage3D(Qe,Mt,Ae,Ce,Xe+An,Qt,ne,At,Tt):H.copyTexSubImage2D(Qe,Mt,Ae,Ce,Qt,ne,At,Tt);Ct.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else sn?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(Qe,Mt,Ae,Ce,Xe,At,Tt,Ut,ge,Wt,Ge.data):j.isCompressedArrayTexture?H.compressedTexSubImage3D(Qe,Mt,Ae,Ce,Xe,At,Tt,Ut,ge,Ge.data):H.texSubImage3D(Qe,Mt,Ae,Ce,Xe,At,Tt,Ut,ge,Wt,Ge):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Mt,Ae,Ce,At,Tt,ge,Wt,Ge.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Mt,Ae,Ce,Ge.width,Ge.height,ge,Ge.data):H.texSubImage2D(H.TEXTURE_2D,Mt,Ae,Ce,At,Tt,ge,Wt,Ge);H.pixelStorei(H.UNPACK_ROW_LENGTH,Se),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,yn),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ze),H.pixelStorei(H.UNPACK_SKIP_ROWS,Pn),H.pixelStorei(H.UNPACK_SKIP_IMAGES,La),Mt===0&&j.generateMipmaps&&H.generateMipmap(Qe),Ct.unbindTexture()},this.copyTextureToTexture3D=function(R,j,ot=null,ct=null,K=0){return R.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,ct=arguments[1]||null,R=arguments[2],j=arguments[3],K=arguments[4]||0),Yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,j,ot,ct,K)},this.initRenderTarget=function(R){qt.get(R).__webglFramebuffer===void 0&&N.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?N.setTextureCube(R,0):R.isData3DTexture?N.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?N.setTexture2DArray(R,0):N.setTexture2D(R,0),Ct.unbindTexture()},this.resetState=function(){V=0,P=0,L=null,Ct.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ca}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorspace=we._getDrawingBufferColorSpace(e),i.unpackColorSpace=we._getUnpackColorSpace()}}const sx={type:"change"},qp={type:"start"},Yx={type:"end"},gu=new Dx,ox=new hr,KR=Math.cos(70*UE.DEG2RAD),mn=new it,Kn=2*Math.PI,Fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vd=1e-6;class QR extends hT{constructor(e,i=null){super(e,i),this.state=Fe.NONE,this.enabled=!0,this.target=new it,this.cursor=new it,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ao.ROTATE,MIDDLE:ao.DOLLY,RIGHT:ao.PAN},this.touches={ONE:no.ROTATE,TWO:no.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new it,this._lastQuaternion=new ts,this._lastTargetPosition=new it,this._quat=new ts().setFromUnitVectors(e.up,new it(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new O_,this._sphericalDelta=new O_,this._scale=1,this._panOffset=new it,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new it,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=$R.bind(this),this._onPointerDown=JR.bind(this),this._onPointerUp=t2.bind(this),this._onContextMenu=o2.bind(this),this._onMouseWheel=i2.bind(this),this._onKeyDown=a2.bind(this),this._onTouchStart=r2.bind(this),this._onTouchMove=s2.bind(this),this._onMouseDown=e2.bind(this),this._onMouseMove=n2.bind(this),this._interceptControlDown=l2.bind(this),this._interceptControlUp=c2.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sx),this.update(),this.state=Fe.NONE}update(e=null){const i=this.object.position;mn.copy(i).sub(this.target),mn.applyQuaternion(this._quat),this._spherical.setFromVector3(mn),this.autoRotate&&this.state===Fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,c=this.maxAzimuthAngle;isFinite(s)&&isFinite(c)&&(s<-Math.PI?s+=Kn:s>Math.PI&&(s-=Kn),c<-Math.PI?c+=Kn:c>Math.PI&&(c-=Kn),s<=c?this._spherical.theta=Math.max(s,Math.min(c,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+c)/2?Math.max(s,this._spherical.theta):Math.min(c,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(mn.setFromSpherical(this._spherical),mn.applyQuaternion(this._quatInverse),i.copy(this.target).add(mn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=mn.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const d=new it(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const g=new it(this._mouse.x,this._mouse.y,0);g.unproject(this.object),this.object.position.sub(g).add(d),this.object.updateMatrixWorld(),h=mn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(gu.origin.copy(this.object.position),gu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gu.direction))<KR?this.object.lookAt(this.target):(ox.setFromNormalAndCoplanarPoint(this.object.up,this.target),gu.intersectPlane(ox,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>Vd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vd||this._lastTargetPosition.distanceToSquared(this.target)>Vd?(this.dispatchEvent(sx),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Kn/60*this.autoRotateSpeed*e:Kn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){mn.setFromMatrixColumn(i,0),mn.multiplyScalar(-e),this._panOffset.add(mn)}_panUp(e,i){this.screenSpacePanning===!0?mn.setFromMatrixColumn(i,1):(mn.setFromMatrixColumn(i,0),mn.crossVectors(this.object.up,mn)),mn.multiplyScalar(e),this._panOffset.add(mn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const c=this.object.position;mn.copy(c).sub(this.target);let f=mn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/s.clientHeight,this.object.matrix),this._panUp(2*i*f/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),c=e-s.left,f=i-s.top,h=s.width,d=s.height;this._mouse.x=c/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Kn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Kn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),c=.5*(e.pageY+i.y);this._rotateStart.set(s,c)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),c=.5*(e.pageY+i.y);this._panStart.set(s,c)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,c=e.pageY-i.y,f=Math.sqrt(s*s+c*c);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),c=.5*(e.pageX+s.x),f=.5*(e.pageY+s.y);this._rotateEnd.set(c,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Kn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Kn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),c=.5*(e.pageY+i.y);this._panEnd.set(s,c)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,c=e.pageY-i.y,f=Math.sqrt(s*s+c*c);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new ue,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function JR(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function $R(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function t2(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yx),this.state=Fe.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function e2(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ao.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Fe.DOLLY;break;case ao.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Fe.ROTATE}break;case ao.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Fe.PAN}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(qp)}function n2(o){switch(this.state){case Fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function i2(o){this.enabled===!1||this.enableZoom===!1||this.state!==Fe.NONE||(o.preventDefault(),this.dispatchEvent(qp),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Yx))}function a2(o){this.enabled!==!1&&this._handleKeyDown(o)}function r2(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case no.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Fe.TOUCH_ROTATE;break;case no.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Fe.TOUCH_PAN;break;default:this.state=Fe.NONE}break;case 2:switch(this.touches.TWO){case no.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Fe.TOUCH_DOLLY_PAN;break;case no.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Fe.TOUCH_DOLLY_ROTATE;break;default:this.state=Fe.NONE}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(qp)}function s2(o){switch(this._trackPointer(o),this.state){case Fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Fe.NONE}}function o2(o){this.enabled!==!1&&o.preventDefault()}function l2(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function c2(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const vl=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,u2=`
precision highp float;

varying vec2 vUv;

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uPortraitBoost;

uniform float uTime;
uniform int uMaxSteps;
uniform float uStepScale;
uniform int uDiskSubSamples;
uniform int uStarOctaves;
uniform int uDebugMode;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemp;
uniform float uDiskIntensity;
uniform float uOrbitalSpeedScale;
uniform float uTurbulenceAmp;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const float RS = 1.0;
const float R_PHOTON = 1.5;
const float B_CRIT = 2.59807621135;
const float R_ESCAPE = 62.0;
const int MAX_LOOP_STEPS = 380;

// ---------------------------------------------------------------------------
// Deterministic Procedural Noise & Hash Primitives (No external textures)
// ---------------------------------------------------------------------------
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
  float amp = 0.52;
  mat3 rot = mat3(
    0.80,  0.48, -0.36,
   -0.48,  0.84,  0.24,
    0.36, -0.24,  0.90
  );
  for (int i = 0; i < 4; i++) {
    sum += amp * valueNoise3D(p);
    p = rot * p * 2.07 + vec3(13.7, 7.3, 19.1);
    amp *= 0.5;
  }
  return sum;
}

// ---------------------------------------------------------------------------
// Physical Planckian Blackbody Chromaticity (Kelvin -> Linear sRGB)
// ---------------------------------------------------------------------------
vec3 blackbodyToLinearRGB(float kelvin) {
  float t = clamp(kelvin, 900.0, 28000.0) * 0.01;
  float r;
  float g;
  float b;

  if (t <= 66.0) {
    r = 1.0;
    g = clamp(0.39008158 * log(max(t, 1.5)) - 0.63184144, 0.0, 1.0);
    if (t <= 19.0) {
      b = 0.0;
    } else {
      b = clamp(0.54320679 * log(t - 10.0) - 1.19625409, 0.0, 1.0);
    }
  } else {
    r = clamp(1.29293619 * pow(t - 60.0, -0.13320476), 0.0, 1.0);
    g = clamp(1.12989086 * pow(t - 60.0, -0.07551485), 0.0, 1.0);
    b = 1.0;
  }

  // Convert approximate perceptual chromaticity into linear radiance chromaticity
  vec3 srgb = vec3(r, g, b);
  return pow(srgb, vec3(2.2));
}

// ---------------------------------------------------------------------------
// Schwarzschild Geodesic Dynamics & RK4 Integrator
// ---------------------------------------------------------------------------
void initSchwarzschildRay(
  vec3 camPos,
  vec3 localDir,
  out vec3 rayPos,
  out vec3 rayVel,
  out float bSq,
  out float camLapse
) {
  rayPos = camPos;
  float r0 = max(length(camPos), RS + 0.05);
  vec3 er = camPos / r0;
  camLapse = sqrt(max(1.0 - RS / r0, 1e-4));

  float cosAlpha = dot(localDir, er);
  vec3 transverse = localDir - cosAlpha * er;
  rayVel = cosAlpha * er + transverse / camLapse;

  vec3 angMom = cross(rayPos, rayVel);
  bSq = dot(angMom, angMom);
}

vec3 schwarzschildGeodesicAccel(vec3 pos, float bSq) {
  float r2 = max(dot(pos, pos), 1e-4);
  float r = sqrt(r2);
  float invR5 = 1.0 / (r2 * r2 * r);
  return (-1.5 * RS * bSq * invR5) * pos;
}

void stepGeodesicRK4(inout vec3 pos, inout vec3 vel, float bSq, float h) {
  vec3 k1x = vel;
  vec3 k1v = schwarzschildGeodesicAccel(pos, bSq);

  vec3 p2 = pos + 0.5 * h * k1x;
  vec3 k2x = vel + 0.5 * h * k1v;
  vec3 k2v = schwarzschildGeodesicAccel(p2, bSq);

  vec3 p3 = pos + 0.5 * h * k2x;
  vec3 k3x = vel + 0.5 * h * k2v;
  vec3 k3v = schwarzschildGeodesicAccel(p3, bSq);

  vec3 p4 = pos + h * k3x;
  vec3 k4x = vel + h * k3v;
  vec3 k4v = schwarzschildGeodesicAccel(p4, bSq);

  pos += (h / 6.0) * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
  vel += (h / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

float diskFlaredHalfHeight(float cylR) {
  float ratio = clamp(cylR / max(uDiskInner, 0.5), 0.6, 8.0);
  return uDiskHalfThickness * (0.62 + 0.52 * pow(ratio, 0.42));
}

float computeAdaptiveGeodesicStep(vec3 pos, vec3 vel, float bImpact) {
  float r = length(pos);
  float nearHorizon = max(r - 0.84 * RS, 0.07);
  float dt = 0.068 * nearHorizon + 0.0085 * max(r - 4.5, 0.0) * max(r - 4.5, 0.0);
  dt = clamp(dt, 0.024, 2.4);

  // Tighten step near the unstable photon sphere (r = 1.5 rs) and critical impact parameter
  float photonSphereProx = abs(r - R_PHOTON);
  if (photonSphereProx < 1.05) {
    float critProx = clamp(abs(bImpact - B_CRIT) / 0.55, 0.0, 1.0);
    float fineTarget = mix(0.022, 0.038, critProx);
    dt = min(dt, mix(fineTarget, 0.11, photonSphereProx / 1.05));
  }

  // Tighten step when approaching or traversing the equatorial disk slab
  float cylR = length(pos.xz);
  if (cylR > uDiskInner * 0.78 && cylR < uDiskOuter * 1.15) {
    float hSlab = diskFlaredHalfHeight(cylR);
    float absY = abs(pos.y);
    if (absY < max(3.2 * hSlab, 0.9)) {
      float vy = max(abs(vel.y), 0.14);
      float slabStep = max(0.42 * hSlab, 0.032) + 0.28 * max(absY - hSlab, 0.0) / vy;
      dt = min(dt, slabStep);
    }
  }

  return dt * uStepScale;
}

// Cubic Hermite interpolation along an RK4 segment [0, 1]
vec3 hermitePos(vec3 x0, vec3 v0, vec3 x1, vec3 v1, float dt, float s) {
  float s2 = s * s;
  float s3 = s2 * s;
  float h00 = 2.0 * s3 - 3.0 * s2 + 1.0;
  float h10 = s3 - 2.0 * s2 + s;
  float h01 = -2.0 * s3 + 3.0 * s2;
  float h11 = s3 - s2;
  return h00 * x0 + h10 * (dt * v0) + h01 * x1 + h11 * (dt * v1);
}

vec3 hermiteVel(vec3 x0, vec3 v0, vec3 x1, vec3 v1, float dt, float s) {
  float s2 = s * s;
  float dh00 = 6.0 * s2 - 6.0 * s;
  float dh10 = 3.0 * s2 - 4.0 * s + 1.0;
  float dh01 = -6.0 * s2 + 6.0 * s;
  float dh11 = 3.0 * s2 - 2.0 * s;
  return (dh00 * x0 + dh10 * (dt * v0) + dh01 * x1 + dh11 * (dt * v1)) / max(dt, 1e-5);
}

// ---------------------------------------------------------------------------
// Accretion Disk Turbulence, Relativistic Redshift/Doppler & Radiative Sample
// ---------------------------------------------------------------------------
float sampleSpiralDiskTurbulence(vec3 pos, float cylR, float hLocal) {
  float phi = atan(pos.z, pos.x);
  float logR = log(max(cylR, 0.5));
  float keplerOmega = 1.0 / (pow(max(cylR, 1.35), 1.5) + 0.35);

  // Dual-phase Keplerian shear flow prevents infinite spiral winding at large simulation times
  float flowClock = uTime * uTurbulenceSpeed * 0.20;
  float phaseA = fract(flowClock);
  float phaseB = fract(flowClock + 0.5);
  float weightA = sin(PI * phaseA);
  weightA *= weightA;
  float weightB = 1.0 - weightA;

  float shearSpan = 13.0 * keplerOmega;
  float phiA = phi - (phaseA - 0.5) * shearSpan;
  float phiB = phi - (phaseB - 0.5) * shearSpan;

  // Trailing MRI spiral coordinate warp
  float spiralTwist = 5.4 * logR;
  vec3 coordA = vec3(
    cos(phiA + spiralTwist) * 2.35 + logR * 3.2,
    sin(phiA + spiralTwist) * 2.35 - logR * 2.1,
    pos.y / max(hLocal, 0.04) * 0.85 + logR * 5.0
  );
  vec3 coordB = vec3(
    cos(phiB + spiralTwist) * 2.35 + logR * 3.2 + 11.3,
    sin(phiB + spiralTwist) * 2.35 - logR * 2.1 + 7.9,
    pos.y / max(hLocal, 0.04) * 0.85 + logR * 5.0 + 5.1
  );

  float fbmA = fbm3D(coordA);
  float fbmB = fbm3D(coordB);
  float spiralFbm = weightA * fbmA + weightB * fbmB;

  // Fine differential azimuthal streaks + concentric Keplerian ring lanes
  vec3 streakCoordA = vec3(cos(phiA * 2.0 + 3.2 * logR) * 3.6, sin(phiA * 2.0 + 3.2 * logR) * 3.6, logR * 9.5);
  vec3 streakCoordB = vec3(cos(phiB * 2.0 + 3.2 * logR) * 3.6 + 6.4, sin(phiB * 2.0 + 3.2 * logR) * 3.6 + 4.2, logR * 9.5);
  float streaks = weightA * fbm3D(streakCoordA) + weightB * fbm3D(streakCoordB);

  float ringWave = 0.5 + 0.5 * sin(logR * 28.0 + spiralFbm * 5.2 - uTime * uTurbulenceSpeed * 0.35);
  float rawTurb = clamp(0.56 * spiralFbm + 0.30 * streaks + 0.24 * ringWave, 0.0, 1.35);
  float contrastTurb = pow(max(rawTurb, 0.02), 1.45) * 1.65;

  return mix(1.0, contrastTurb, clamp(uTurbulenceAmp, 0.0, 1.5));
}

void evaluateDiskPoint(
  vec3 pos,
  vec3 rayVel,
  float camLapse,
  float verticalZeta,
  out float radialMask,
  out float gFactor,
  out float normTemp,
  out float turbValue,
  out vec3 localEmission
) {
  float cylR = length(pos.xz);
  float rSph = max(length(pos), RS + 0.02);

  float innerWidth = max(0.14 * uDiskInner, 0.24);
  float innerMask = smoothstep(uDiskInner - innerWidth * 0.45, uDiskInner + innerWidth * 0.85, cylR);
  float outerMask = 1.0 - smoothstep(uDiskOuter * 0.68, uDiskOuter * 1.03, cylR);
  radialMask = innerMask * outerMask;

  if (radialMask <= 1e-4) {
    gFactor = 1.0;
    normTemp = 0.0;
    turbValue = 0.0;
    localEmission = vec3(0.0);
    return;
  }

  // Relativistic circular Keplerian gas velocity in local static frame
  float metricLapseSq = max(1.0 - RS / rSph, 0.015);
  float sqrtMetric = sqrt(metricLapseSq);
  float betaKepler = sqrt(RS / max(2.0 * (cylR - RS), 0.30));
  float beta = clamp(uOrbitalSpeedScale * betaKepler, 0.0, 0.90);
  float gamma = inversesqrt(max(1.0 - beta * beta, 0.05));

  // Prograde orbital tangent in equatorial plane (+CCW around +Y)
  vec3 orbTangent = vec3(-pos.z, 0.0, pos.x) / max(cylR, 1e-4);

  // Exact photon frequency ratio g = nu_obs / nu_emit = E_obs / (-p_mu u^mu)
  float dopplerDenom = gamma * (1.0 + beta * sqrtMetric * dot(rayVel, orbTangent));
  gFactor = clamp((sqrtMetric / camLapse) / max(dopplerDenom, 0.12), 0.10, 3.2);

  float hLocal = diskFlaredHalfHeight(cylR);
  turbValue = sampleSpiralDiskTurbulence(pos, cylR, hLocal);

  // Page-Thorne / Shakura-Sunyaev radial temperature profile
  float rRatio = uDiskInner / max(cylR, uDiskInner * 0.90);
  float torqueTerm = pow(max(1.0 - 0.76 * sqrt(rRatio), 0.08), 0.25);
  normTemp = clamp(pow(rRatio, 0.72) * torqueTerm * 1.42, 0.0, 1.5);

  float filamentHeat = mix(0.84, 1.24, clamp(turbValue * 0.65, 0.0, 1.0));
  float verticalCool = mix(1.0, 0.72, clamp(verticalZeta, 0.0, 1.0));
  float localKelvin = uDiskTemp * normTemp * filamentHeat * verticalCool;
  float observedKelvin = clamp(localKelvin * pow(gFactor, 0.85), 950.0, 26000.0);

  vec3 bbColor = blackbodyToLinearRGB(observedKelvin);

  // Relativistic specific intensity scaling + radial emissivity falloff
  float beaming = pow(gFactor, 2.85);
  float radialFalloff = pow(rRatio, 1.85) * (0.35 + 0.95 * outerMask);
  localEmission = bbColor * (uDiskIntensity * 2.35 * radialMask * radialFalloff * turbValue * beaming);
}

// ---------------------------------------------------------------------------
// Procedural Lensed Starfield & Milky Way Galactic Background (No Cubemap)
// Compact-support PSF strictly inside each rotated 3D cell prevents grid seams
// ---------------------------------------------------------------------------
vec3 sampleStarGrid(vec3 dir, float scale, float densityProb, float coreSize, float brightness) {
  vec3 p = dir * scale;
  vec3 cell = floor(p);
  vec3 rnd = hash33(cell);
  if (rnd.x >= densityProb) return vec3(0.0);

  // Keep star center strictly inside [0.27, 0.73]^3 so max PSF radius 0.25 never touches cell wall
  vec3 starPos = cell + 0.27 + 0.46 * hash33(cell + vec3(19.7, 41.3, 7.1));
  float dist = length(p - starPos);
  if (dist >= 0.25) return vec3(0.0);

  float window = smoothstep(0.25, 0.02, dist);
  float rCore = coreSize * (0.72 + 0.55 * rnd.z);
  float core = exp(-(dist * dist) / max(rCore * rCore, 1e-5));
  float airy = 0.16 * exp(-dist / max(rCore * 2.4, 1e-4)) * window;

  float lumVar = 0.22 + 3.4 * pow(rnd.y, 3.6);
  float starKelvin = mix(3000.0, 18000.0, pow(rnd.z, 1.4));
  vec3 starColor = blackbodyToLinearRGB(starKelvin);

  return starColor * (core + airy) * window * lumVar * brightness;
}

vec3 sampleProceduralCosmos(vec3 outDir) {
  vec3 d = normalize(outDir);

  // Rotate into inclined Galactic frame (~39 deg tilt across the sky behind Gargantua)
  const mat3 galacticBasis = mat3(
     0.7880,  0.3827, -0.4822,
    -0.4695,  0.8660,  0.1720,
     0.3983,  0.3214,  0.8589
  );
  const mat3 starRotB = mat3(
     0.5403, -0.6816,  0.4935,
     0.7518,  0.6428,  0.1470,
    -0.3779,  0.3502,  0.8572
  );
  const mat3 starRotC = mat3(
    -0.6124,  0.5000,  0.6124,
     0.7071,  0.7071,  0.0000,
    -0.3536,  0.5000, -0.7906
  );

  vec3 gd = galacticBasis * d;

  // Galactic band & bulge + dark rift absorption lanes
  float galLat = gd.y;
  float galLon = atan(gd.z, gd.x);
  float bandEnvelope = exp(-abs(galLat) * 6.2) + 0.30 * exp(-galLat * galLat * 12.0);
  float bulge = exp(-dot(vec2(galLon * 0.55, galLat * 3.2), vec2(galLon * 0.55, galLat * 3.2)) * 2.0);

  float cloudFbm = fbm3D(gd * 4.4 + vec3(2.4, -1.7, 5.1));
  float fineCloud = fbm3D(gd * 12.0 + vec3(8.2, 3.9, -4.6));
  float dustLane = fbm3D(gd * 8.2 + vec3(15.1, 0.8, 9.4));

  float dustOpticalDepth = smoothstep(0.40, 0.77, dustLane) * exp(-galLat * galLat * 58.0) * 2.45;
  float dustTrans = exp(-dustOpticalDepth);

  vec3 coreWarm = vec3(1.06, 0.75, 0.46) * (0.32 + 0.92 * bulge);
  vec3 armCool = vec3(0.38, 0.56, 0.94) * smoothstep(0.34, 0.86, cloudFbm);
  vec3 hII = vec3(0.86, 0.34, 0.45) * pow(max(fineCloud - 0.54, 0.0) * 2.0, 2.3) * 0.48;

  vec3 galaxyColor = (coreWarm * (0.42 + 0.82 * cloudFbm) + armCool * 0.58 + hII)
    * bandEnvelope * dustTrans * 0.19 * uGalaxyBrightness;

  // Deep cosmic background velvet tone
  vec3 deepBg = vec3(0.0018, 0.0026, 0.0048) * (0.35 + 0.65 * clamp(uGalaxyBrightness, 0.0, 2.0));

  // Multi-tier pinpoint procedural stars (scaled by uStarDensity and quality uStarOctaves)
  float dens = clamp(uStarDensity, 0.0, 2.5);
  vec3 stars = vec3(0.0);
  if (dens > 0.001) {
    float p1 = clamp(0.14 * dens, 0.0, 0.55);
    float p2 = clamp(0.28 * dens * (0.45 + 1.05 * bandEnvelope), 0.0, 0.78);
    stars += sampleStarGrid(d, 72.0, p1, 0.046, 2.1);
    stars += sampleStarGrid(starRotB * d, 138.0, p2, 0.052, 1.05);
    if (uStarOctaves >= 3) {
      float p3 = clamp(0.38 * dens * (0.30 + 1.35 * bandEnvelope), 0.0, 0.88);
      stars += sampleStarGrid(starRotC * d, 235.0, p3, 0.058, 0.52) * (0.35 + 0.65 * dustTrans);
    }
    if (uStarOctaves >= 4) {
      float p4 = clamp(0.48 * dens * (0.20 + 1.45 * bandEnvelope), 0.0, 0.94);
      stars += sampleStarGrid(gd, 360.0, p4, 0.064, 0.28) * dustTrans;
    }
  }

  return deepBg + galaxyColor + stars;
}

// ---------------------------------------------------------------------------
// Diagnostic Colormaps for Debug Modes 1 - 9
// ---------------------------------------------------------------------------
vec3 infernoColormap(float t) {
  t = clamp(t, 0.0, 1.0);
  const vec3 c0 = vec3(0.02, 0.01, 0.08);
  const vec3 c1 = vec3(0.32, 0.06, 0.43);
  const vec3 c2 = vec3(0.74, 0.22, 0.32);
  const vec3 c3 = vec3(0.98, 0.58, 0.10);
  const vec3 c4 = vec3(0.99, 0.97, 0.64);
  if (t < 0.25) return mix(c0, c1, t * 4.0);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
  return mix(c3, c4, (t - 0.75) * 4.0);
}

vec3 divergingDopplerColormap(float g) {
  // Neutral g = 1.0 -> crisp silver-ivory; g < 1 -> warm amber to crimson; g > 1 -> cyan to electric blue-white
  if (g < 1.0) {
    float s = clamp((1.0 - g) / 0.72, 0.0, 1.0);
    vec3 warmMid = vec3(0.95, 0.45, 0.12);
    vec3 deepRed = vec3(0.35, 0.03, 0.06);
    vec3 base = mix(vec3(0.82, 0.84, 0.80), warmMid, smoothstep(0.0, 0.45, s));
    return mix(base, deepRed, smoothstep(0.45, 1.0, s));
  } else {
    float s = clamp((g - 1.0) / 0.85, 0.0, 1.0);
    vec3 cyanMid = vec3(0.18, 0.72, 1.0);
    vec3 hotBlue = vec3(0.86, 0.96, 1.0);
    vec3 base = mix(vec3(0.82, 0.84, 0.80), cyanMid, smoothstep(0.0, 0.50, s));
    return mix(base, hotBlue, smoothstep(0.50, 1.0, s));
  }
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  float effTanHalfFov = uTanHalfFov * uPortraitBoost;
  vec3 localRayDir = normalize(
    uCamForward
    + ndc.x * uAspect * effTanHalfFov * uCamRight
    + ndc.y * effTanHalfFov * uCamUp
  );

  vec3 pos;
  vec3 vel;
  float bSq;
  float camLapse;
  initSchwarzschildRay(uCamPos, localRayDir, pos, vel, bSq, camLapse);

  float bImpact = sqrt(bSq);
  float minRadius = length(pos);

  vec3 accumRadiance = vec3(0.0);
  float transmittance = 1.0;

  bool capturedByHorizon = false;
  bool escapedToInfinity = false;
  int stepsTaken = 0;

  int diskCrossingCount = 0;
  bool touchedVolumetricOnly = false;
  float primaryHitG = 1.0;
  float primaryHitTemp = 0.0;
  float primaryHitTurb = 0.0;
  float primaryHitR = 0.0;

  for (int stepIdx = 0; stepIdx < MAX_LOOP_STEPS; stepIdx++) {
    if (stepIdx >= uMaxSteps) break;
    stepsTaken = stepIdx + 1;

    vec3 prevPos = pos;
    vec3 prevVel = vel;
    float dt = computeAdaptiveGeodesicStep(prevPos, prevVel, bImpact);

    stepGeodesicRK4(pos, vel, bSq, dt);

    float rPrev = length(prevPos);
    float rCurr = length(pos);
    vec3 segDelta = pos - prevPos;
    float segLenSq = max(dot(segDelta, segDelta), 1e-8);
    float tChordMin = clamp(-dot(prevPos, segDelta) / segLenSq, 0.0, 1.0);
    float rSegMin = length(prevPos + segDelta * tChordMin);
    minRadius = min(minRadius, min(rCurr, rSegMin));

    // Determine if this step reaches or crosses the Schwarzschild event horizon (r <= RS)
    float sLimit = 1.0;
    bool hitHorizonThisStep = false;
    if (rCurr <= RS * 1.002 || rSegMin <= RS * 1.0005) {
      hitHorizonThisStep = true;
      sLimit = clamp((rPrev - RS) / max(rPrev - min(rCurr, rSegMin), 1e-4), 0.0, 1.0);
    }

    // 1. Exact Equatorial Midplane Crossing (y = 0) along curved Hermite geodesic arc
    float y0 = prevPos.y;
    float y1 = pos.y;
    if ((y0 > 0.0 && y1 <= 0.0) || (y0 < 0.0 && y1 >= 0.0)) {
      float sRoot = clamp(abs(y0) / max(abs(y0 - y1), 1e-6), 0.0, 1.0);
      // Refine Hermite y(s) = 0 with two Newton iterations
      for (int nr = 0; nr < 2; nr++) {
        vec3 pEst = hermitePos(prevPos, prevVel, pos, vel, dt, sRoot);
        vec3 vEst = hermiteVel(prevPos, prevVel, pos, vel, dt, sRoot);
        float dyDs = vEst.y * dt;
        if (abs(dyDs) > 1e-6) {
          sRoot = clamp(sRoot - pEst.y / dyDs, 0.0, 1.0);
        }
      }

      if (sRoot <= sLimit) {
        vec3 hitPos = hermitePos(prevPos, prevVel, pos, vel, dt, sRoot);
        vec3 hitVel = hermiteVel(prevPos, prevVel, pos, vel, dt, sRoot);
        float hitCylR = length(hitPos.xz);

        if (hitCylR >= uDiskInner * 0.90 && hitCylR <= uDiskOuter * 1.03 && length(hitPos) > RS * 1.01) {
          float radMask;
          float gVal;
          float tempVal;
          float turbVal;
          vec3 coreEmit;
          evaluateDiskPoint(hitPos, hitVel, camLapse, 0.0, radMask, gVal, tempVal, turbVal, coreEmit);

          if (radMask > 0.01) {
            diskCrossingCount += 1;
            if (diskCrossingCount == 1) {
              primaryHitG = gVal;
              primaryHitTemp = tempVal;
              primaryHitTurb = turbVal;
              primaryHitR = hitCylR;
            }

            // Dense equatorial core sheet optical depth (inversely proportional to grazing angle, smoothly bounded)
            float cosGraze = max(abs(hitVel.y) / max(length(hitVel), 1e-4), 0.14);
            float coreTau = clamp((0.36 * radMask * (0.45 + 0.55 * turbVal)) / cosGraze, 0.0, 2.4);
            float coreAlpha = 1.0 - exp(-coreTau);
            accumRadiance += transmittance * coreEmit * coreAlpha * 0.72;
            transmittance *= (1.0 - coreAlpha);
          }
        }
      }
    }

    // 2. Volumetric Flared Slab Integration (responds directly to uDiskHalfThickness)
    float rCyl0 = length(prevPos.xz);
    float rCyl1 = length(pos.xz);
    float hMax = diskFlaredHalfHeight(max(rCyl0, rCyl1));
    bool nearRadial = max(rCyl0, rCyl1) >= uDiskInner * 0.88 && min(rCyl0, rCyl1) <= uDiskOuter * 1.05;
    bool nearVertical = min(abs(y0), abs(y1)) <= hMax * 1.65 || (y0 * y1 <= 0.0);

    if (nearRadial && nearVertical && sLimit > 0.001 && transmittance > 0.004) {
      float subDs = sLimit / float(uDiskSubSamples);
      float arcStepLen = length(segDelta) * subDs;

      for (int sub = 0; sub < 4; sub++) {
        if (sub >= uDiskSubSamples) break;
        float sMid = (float(sub) + 0.5) * subDs;
        vec3 sPos = hermitePos(prevPos, prevVel, pos, vel, dt, sMid);
        vec3 sVel = hermiteVel(prevPos, prevVel, pos, vel, dt, sMid);
        float sCylR = length(sPos.xz);
        float hLoc = max(diskFlaredHalfHeight(sCylR), 0.012);
        float zeta = abs(sPos.y) / hLoc;

        if (zeta < 1.60 && length(sPos) > RS * 1.015) {
          float radMask;
          float gVal;
          float tempVal;
          float turbVal;
          vec3 volEmit;
          evaluateDiskPoint(sPos, sVel, camLapse, zeta * 0.625, radMask, gVal, tempVal, turbVal, volEmit);

          if (radMask > 0.005) {
            if (zeta < 0.95 && radMask > 0.08 && !touchedVolumetricOnly && diskCrossingCount == 0) {
              touchedVolumetricOnly = true;
              primaryHitG = gVal;
              primaryHitTemp = tempVal;
              primaryHitTurb = turbVal;
              primaryHitR = sCylR;
            }

            float vertProfile = exp(-1.45 * zeta * zeta) * smoothstep(1.60, 0.18, zeta);
            // Density normalized so thicker disks display visible vertical halo & torus volume
            float densityNorm = (0.55 + 1.15 * uDiskHalfThickness) / max(hLoc, 0.035);
            float dTau = radMask * vertProfile * (0.35 + 0.65 * turbVal) * densityNorm * arcStepLen * 0.42;
            float absorb = 1.0 - exp(-dTau);
            accumRadiance += transmittance * volEmit * absorb * 0.68;
            transmittance *= (1.0 - absorb);
          }
        }
      }
    }

    if (hitHorizonThisStep) {
      capturedByHorizon = true;
      break;
    }

    if (rCurr >= R_ESCAPE && dot(pos, vel) > 0.0) {
      escapedToInfinity = true;
      break;
    }

    if (transmittance < 0.0025) {
      // Optical depth saturated; still classify whether ray would plunge into horizon if very close
      if (rCurr < R_PHOTON && dot(pos, vel) < 0.0) {
        capturedByHorizon = true;
      }
      break;
    }
  }

  int effectiveOrder = diskCrossingCount > 0 ? diskCrossingCount : (touchedVolumetricOnly ? 1 : 0);

  // Asymptotic outgoing direction (in Schwarzschild ODE d2x/dlambda2 ~ O(r^-4), so vel at R_ESCAPE=62 is already converged to <1e-5)
  vec3 outDir = normalize(vel);

  vec3 skyColor = capturedByHorizon ? vec3(0.0) : sampleProceduralCosmos(outDir);
  vec3 finalHdr = accumRadiance + transmittance * skyColor;

  // -------------------------------------------------------------------------
  // Render Final HDR (0) or Diagnostic Views (1 - 9)
  // -------------------------------------------------------------------------
  if (uDebugMode == 0) {
    gl_FragColor = vec4(max(finalHdr, vec3(0.0)), 1.0);
    return;
  }

  vec3 diag = vec3(0.0);

  if (uDebugMode == 1) {
    // 1: Ray Steps & Termination Reason
    float stepRatio = float(stepsTaken) / float(max(uMaxSteps, 1));
    vec3 heat = infernoColormap(pow(stepRatio, 0.78));
    if (capturedByHorizon) {
      diag = mix(vec3(0.26, 0.02, 0.05), vec3(0.95, 0.18, 0.22), stepRatio);
    } else if (escapedToInfinity) {
      diag = mix(vec3(0.04, 0.18, 0.34), heat, smoothstep(0.06, 0.75, stepRatio));
    } else {
      // Bound / near-critical winding reaching step cap
      diag = mix(heat, vec3(1.0, 0.92, 0.45), 0.55);
    }
  } else if (uDebugMode == 2) {
    // 2: Event Horizon Mask, Closest Approach & Critical Impact Parameter (b / b_crit)
    if (capturedByHorizon) {
      float edgeGlow = exp(-abs(bImpact - B_CRIT) * 24.0);
      diag = vec3(0.85, 0.12, 0.18) * edgeGlow * 0.65;
    } else {
      float bRatio = bImpact / B_CRIT;
      float contour = 0.5 + 0.5 * cos(bRatio * PI * 8.0);
      float gridLine = smoothstep(0.92, 0.995, contour);
      float critLine = exp(-abs(bImpact - B_CRIT) * 32.0);
      float periNorm = clamp((minRadius - RS) / 10.0, 0.0, 1.0);
      vec3 baseField = mix(vec3(0.92, 0.48, 0.12), vec3(0.06, 0.26, 0.52), sqrt(periNorm));
      diag = baseField * (0.65 + 0.35 * gridLine) + vec3(1.0, 0.95, 0.72) * critLine;
    }
  } else if (uDebugMode == 3) {
    // 3: Disk Crossings & Image Order (Primary n=1, Secondary n=2, Higher-Order n>=3)
    float rGrid = primaryHitR > 0.0 ? (0.78 + 0.22 * cos(primaryHitR * PI * 2.0)) : 1.0;
    if (effectiveOrder == 0) {
      diag = capturedByHorizon ? vec3(0.01, 0.01, 0.015) : vec3(0.04, 0.06, 0.11);
    } else if (effectiveOrder == 1) {
      diag = vec3(0.10, 0.72, 0.95) * rGrid;
    } else if (effectiveOrder == 2) {
      diag = vec3(1.0, 0.68, 0.14) * rGrid;
    } else {
      diag = vec3(1.0, 0.28, 0.82);
    }
  } else if (uDebugMode == 4) {
    // 4: Relativistic Doppler & Gravitational Redshift g-Factor
    if (effectiveOrder > 0) {
      diag = divergingDopplerColormap(primaryHitG);
      float gUnityLine = exp(-abs(primaryHitG - 1.0) * 38.0);
      diag = mix(diag, vec3(1.0), gUnityLine * 0.65);
    } else {
      // Show pure gravitational redshift field sqrt(1 - rs/r_min) in surrounding space
      diag = capturedByHorizon
        ? vec3(0.02, 0.01, 0.02)
        : vec3(0.07, 0.09, 0.14) * sqrt(clamp(1.0 - RS / max(minRadius, RS + 0.01), 0.0, 1.0));
    }
  } else if (uDebugMode == 5) {
    // 5: Intrinsic Disk Temperature & Spiral Turbulence Field
    if (effectiveOrder > 0) {
      vec3 tempCol = infernoColormap(clamp(primaryHitTemp * 0.85, 0.0, 1.0));
      diag = tempCol * clamp(0.30 + 0.75 * primaryHitTurb, 0.0, 1.25);
    } else {
      diag = capturedByHorizon ? vec3(0.0) : vec3(0.025, 0.03, 0.045);
    }
  } else if (uDebugMode == 6) {
    // 6: Lensed Celestial Coordinates & Gravitational Deflection Grid
    if (capturedByHorizon) {
      diag = vec3(0.0);
    } else {
      vec3 worldInitDir = normalize(
        uCamForward
        + ndc.x * uAspect * effTanHalfFov * uCamRight
        + ndc.y * effTanHalfFov * uCamUp
      );
      float deflection = acos(clamp(dot(worldInitDir, outDir), -1.0, 1.0));
      float lon = atan(outDir.z, outDir.x);
      float lat = asin(clamp(outDir.y, -1.0, 1.0));
      float gLon = smoothstep(0.90, 0.99, cos(lon * 12.0));
      float gLat = smoothstep(0.90, 0.99, cos(lat * 12.0));
      float grid = max(gLon, gLat);
      vec3 dirTint = 0.5 + 0.5 * outDir;
      vec3 deflHeat = infernoColormap(clamp(deflection / PI, 0.0, 1.0));
      diag = mix(dirTint * 0.48 + deflHeat * 0.42, vec3(0.96, 0.98, 1.0), grid * 0.82);
    }
  } else if (uDebugMode == 7) {
    // 7: Procedural Lensed Starfield & Milky Way Only (No Disk, Horizon Masked)
    if (capturedByHorizon) {
      diag = vec3(0.0);
    } else {
      vec3 rawSky = sampleProceduralCosmos(outDir) * 2.4;
      diag = rawSky / (1.0 + rawSky);
    }
  } else if (uDebugMode == 8) {
    // 8: Pre-Postprocess Linear HDR Radiance (Log10 Dynamic Range + >1.0 Overbright Contours)
    float lum = dot(finalHdr, vec3(0.2126, 0.7152, 0.0722));
    vec3 logHdr = log2(vec3(1.0) + max(finalHdr, vec3(0.0)) * 2.5) / 3.4;
    float hdrClipContour = smoothstep(0.98, 1.08, lum) * (0.65 + 0.35 * sin(log2(max(lum, 1e-3)) * PI * 4.0));
    diag = mix(clamp(logHdr, 0.0, 1.0), vec3(1.0, 0.92, 0.35), clamp(hdrClipContour * 0.42, 0.0, 0.55));
  } else if (uDebugMode == 9) {
    // 9: Integrated Disk Optical Depth / Opacity (1 - Transmittance)
    float opacity = clamp(1.0 - transmittance, 0.0, 1.0);
    vec3 opColor = infernoColormap(opacity);
    if (capturedByHorizon && opacity < 0.02) {
      diag = vec3(0.0, 0.04, 0.08);
    } else {
      diag = opColor;
    }
  }

  gl_FragColor = vec4(clamp(diag, 0.0, 1.0), 1.0);
}
`,f2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D tInput;
uniform vec2 uTexelSize;
uniform float uThreshold;

float calcLuma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

vec3 softThreshold(vec3 color, float threshold) {
  float br = max(max(color.r, color.g), color.b);
  float knee = threshold * 0.5 + 1e-4;
  float soft = clamp(br - threshold + knee, 0.0, 2.0 * knee);
  soft = (soft * soft) / (4.0 * knee + 1e-4);
  float contrib = max(soft, br - threshold) / max(br, 1e-4);
  return color * max(contrib, 0.0);
}

vec3 sampleKaris(vec2 uv) {
  vec3 c = min(texture2D(tInput, uv).rgb, vec3(48.0));
  c = softThreshold(c, uThreshold);
  return c / (1.0 + calcLuma(c) * 0.18);
}

void main() {
  vec2 d = uTexelSize;
  vec3 a = sampleKaris(vUv + vec2(-1.0, -1.0) * d);
  vec3 b = sampleKaris(vUv + vec2( 0.0, -1.0) * d);
  vec3 c = sampleKaris(vUv + vec2( 1.0, -1.0) * d);
  vec3 e = sampleKaris(vUv + vec2(-0.5, -0.5) * d);
  vec3 f = sampleKaris(vUv + vec2( 0.5, -0.5) * d);
  vec3 g = sampleKaris(vUv + vec2(-1.0,  0.0) * d);
  vec3 h = sampleKaris(vUv);
  vec3 i = sampleKaris(vUv + vec2( 1.0,  0.0) * d);
  vec3 j = sampleKaris(vUv + vec2(-0.5,  0.5) * d);
  vec3 k = sampleKaris(vUv + vec2( 0.5,  0.5) * d);
  vec3 l = sampleKaris(vUv + vec2(-1.0,  1.0) * d);
  vec3 m = sampleKaris(vUv + vec2( 0.0,  1.0) * d);
  vec3 n = sampleKaris(vUv + vec2( 1.0,  1.0) * d);

  vec3 outCol = h * 0.125;
  outCol += (a + c + l + n) * 0.03125;
  outCol += (b + g + i + m) * 0.0625;
  outCol += (e + f + j + k) * 0.125;

  gl_FragColor = vec4(max(outCol, vec3(0.0)), 1.0);
}
`,h2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D tInput;
uniform vec2 uTexelSize;

void main() {
  // Slightly wider horizontal kernel imparts a subtle IMAX anamorphic bloom character
  vec2 d = uTexelSize * vec2(1.22, 1.0);

  vec3 a = texture2D(tInput, vUv + vec2(-1.0, -1.0) * d).rgb;
  vec3 b = texture2D(tInput, vUv + vec2( 0.0, -1.0) * d).rgb;
  vec3 c = texture2D(tInput, vUv + vec2( 1.0, -1.0) * d).rgb;
  vec3 e = texture2D(tInput, vUv + vec2(-0.5, -0.5) * d).rgb;
  vec3 f = texture2D(tInput, vUv + vec2( 0.5, -0.5) * d).rgb;
  vec3 g = texture2D(tInput, vUv + vec2(-1.0,  0.0) * d).rgb;
  vec3 h = texture2D(tInput, vUv).rgb;
  vec3 i = texture2D(tInput, vUv + vec2( 1.0,  0.0) * d).rgb;
  vec3 j = texture2D(tInput, vUv + vec2(-0.5,  0.5) * d).rgb;
  vec3 k = texture2D(tInput, vUv + vec2( 0.5,  0.5) * d).rgb;
  vec3 l = texture2D(tInput, vUv + vec2(-1.0,  1.0) * d).rgb;
  vec3 m = texture2D(tInput, vUv + vec2( 0.0,  1.0) * d).rgb;
  vec3 n = texture2D(tInput, vUv + vec2( 1.0,  1.0) * d).rgb;

  vec3 outCol = h * 0.125;
  outCol += (a + c + l + n) * 0.03125;
  outCol += (b + g + i + m) * 0.0625;
  outCol += (e + f + j + k) * 0.125;

  gl_FragColor = vec4(outCol, 1.0);
}
`,d2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D tLowMip;
uniform sampler2D tHighMip;
uniform vec2 uTexelSize;
uniform float uRadiusWeight;

void main() {
  vec2 d = uTexelSize * vec2(1.18, 1.0);

  vec3 s = vec3(0.0);
  s += texture2D(tLowMip, vUv + vec2(-d.x,  d.y)).rgb * 1.0;
  s += texture2D(tLowMip, vUv + vec2( 0.0,  d.y)).rgb * 2.0;
  s += texture2D(tLowMip, vUv + vec2( d.x,  d.y)).rgb * 1.0;
  s += texture2D(tLowMip, vUv + vec2(-d.x,  0.0)).rgb * 2.0;
  s += texture2D(tLowMip, vUv).rgb * 4.0;
  s += texture2D(tLowMip, vUv + vec2( d.x,  0.0)).rgb * 2.0;
  s += texture2D(tLowMip, vUv + vec2(-d.x, -d.y)).rgb * 1.0;
  s += texture2D(tLowMip, vUv + vec2( 0.0, -d.y)).rgb * 2.0;
  s += texture2D(tLowMip, vUv + vec2( d.x, -d.y)).rgb * 1.0;
  s *= (1.0 / 16.0);

  vec3 high = texture2D(tHighMip, vUv).rgb;
  gl_FragColor = vec4(high + s * uRadiusWeight, 1.0);
}
`,p2=`
precision highp float;

varying vec2 vUv;

uniform sampler2D tSceneHdr;
uniform sampler2D tBloom;
uniform vec2 uResolution;
uniform float uTime;
uniform int uDebugMode;

uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignetteStrength;
uniform float uFilmGrainStrength;
uniform float uChromaticAberration;

// Stephen Hill ACES RRT + ODT Fitted Tone Mapping (sRGB <-> ACES AP1)
vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFittedToneMap(vec3 color) {
  // Column-major matrices matching sRGB (D65) -> ACES AP1 -> sRGB (D65)
  const mat3 acesInputMat = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  const mat3 acesOutputMat = mat3(
     1.60475, -0.10208, -0.00327,
    -0.53108,  1.10813, -0.07276,
    -0.07367, -0.00605,  1.07602
  );

  color = acesInputMat * max(color, vec3(0.0));
  color = rrtAndOdtFit(color);
  color = acesOutputMat * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 linear) {
  vec3 c = clamp(linear, 0.0, 1.0);
  vec3 low = c * 12.92;
  vec3 high = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), c));
}

float interleavedGradientNoise(vec2 pixel, float frameSeed) {
  vec2 p = pixel + vec2(frameSeed * 5.588238, frameSeed * 3.14159);
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  // Diagnostic views 1-9 bypass bloom, ACES, vignette, grain, and chromatic aberration
  if (uDebugMode > 0) {
    vec3 diag = texture2D(tSceneHdr, vUv).rgb;
    gl_FragColor = vec4(diag, 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 metricOffset = vec2(centered.x * min(aspect, 1.5), centered.y);
  float radialDistSq = dot(metricOffset, metricOffset);

  // Subtle lateral lens chromatic aberration, zeroed in the central critical region
  float caMask = smoothstep(0.035, 0.42, radialDistSq);
  vec2 caShift = centered * (uChromaticAberration * 0.0095 * caMask);

  float hdrR = texture2D(tSceneHdr, clamp(vUv + caShift, 0.001, 0.999)).r;
  float hdrG = texture2D(tSceneHdr, vUv).g;
  float hdrB = texture2D(tSceneHdr, clamp(vUv - caShift, 0.001, 0.999)).b;
  vec3 sceneHdr = vec3(hdrR, hdrG, hdrB);

  vec3 bloomHdr = texture2D(tBloom, vUv).rgb;
  vec3 combinedHdr = (sceneHdr + bloomHdr * uBloomStrength) * uExposure;

  vec3 mappedLinear = acesFittedToneMap(combinedHdr);
  vec3 colorSrgb = linearToSrgb(mappedLinear);

  // Restrained optical vignette (preserves center photon ring & disk clarity)
  float vigDist = length(centered * vec2(1.12, 1.05));
  float vignette = 1.0 - uVignetteStrength * smoothstep(0.28, 0.92, vigDist);
  colorSrgb *= clamp(vignette, 0.15, 1.0);

  // Fine deterministic cinema film grain (driven by simulation uTime for capture determinism)
  if (uFilmGrainStrength > 0.0001) {
    float luma = dot(colorSrgb, vec3(0.299, 0.587, 0.114));
    // Protect deep shadow inside event horizon and specular peak highlights
    float grainMask = smoothstep(0.008, 0.10, luma) * (1.0 - 0.55 * smoothstep(0.75, 1.0, luma));
    float timeSeed = floor(uTime * 24.0 + 0.5) * 0.173;
    float n1 = interleavedGradientNoise(gl_FragCoord.xy, timeSeed);
    float n2 = interleavedGradientNoise(gl_FragCoord.xy + vec2(17.0, 29.0), timeSeed + 1.37);
    float triNoise = (n1 + n2 - 1.0);
    colorSrgb = clamp(colorSrgb + triNoise * uFilmGrainStrength * (0.35 + 0.65 * grainMask), 0.0, 1.0);
  }

  gl_FragColor = vec4(colorSrgb, 1.0);
}
`,Ta=Math.PI/180,_l=180/Math.PI;function m2(){const o=new gr,e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),i=new Float32Array([0,0,2,0,0,2]);return o.setAttribute("position",new Ai(e,3)),o.setAttribute("uv",new Ai(i,2)),o}class g2{constructor({canvas:e,initialState:i,onCameraInteractiveChange:s,onManualCameraStart:c,onContextStatusChange:f,onBudgetChange:h,onFirstFrameReady:d}){this.canvas=e,this.onCameraInteractiveChange=s,this.onManualCameraStart=c,this.onContextStatusChange=f,this.onBudgetChange=h,this.onFirstFrameReady=d,this.disposed=!1,this.contextLost=!1,this.firstFrameRendered=!1,this.rafId=null,this.lastWallMs=null,this.quality=i.quality,this.preset=i.preset,this.debug=i.debug,this.captureMode=!!i.captureMode,this.cinematicPlaying=!!i.cinematicPlaying&&!this.captureMode,this.simTime=Number.isFinite(i.time)&&i.time>=0?i.time:0,this.params=lo(i.params),this.cinematicPhase=0,this.cinematicBaseAzimuth=this.params.cameraAzimuth,this.cinematicBaseElevation=this.params.cameraElevation,this.cinematicBaseDistance=this.params.cameraDistance,this._camRight=new it,this._camUp=new it,this._camForward=new it,this._camBasisMat=new rn,this._syncingCameraFromCode=!1,this.camera=new Ei(this.params.fov,16/9,.1,200),this.controls=new QR(this.camera,this.canvas),this.controls.enablePan=!1,this.controls.enableDamping=!this.captureMode,this.controls.dampingFactor=.065,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.85,this.controls.minDistance=Ln.cameraDistance.min,this.controls.maxDistance=Ln.cameraDistance.max,this.controls.minPolarAngle=(90-Ln.cameraElevation.max)*Ta,this.controls.maxPolarAngle=(90-Ln.cameraElevation.min)*Ta,this.controls.target.set(0,0,0),this._handleControlsStart=()=>{this.cinematicPlaying&&(this.cinematicPlaying=!1,this.onManualCameraStart&&this.onManualCameraStart())},this._handleControlsChange=()=>{this._syncingCameraFromCode||this.disposed||(this._extractSphericalParamsFromCamera(),this.onCameraInteractiveChange&&this.onCameraInteractiveChange({cameraDistance:this.params.cameraDistance,cameraAzimuth:this.params.cameraAzimuth,cameraElevation:this.params.cameraElevation}))},this.controls.addEventListener("start",this._handleControlsStart),this.controls.addEventListener("change",this._handleControlsChange),this._handleContextLost=p=>{p.preventDefault(),!this.disposed&&(this.contextLost=!0,this._stopLoop(),this.onContextStatusChange&&this.onContextStatusChange(!0))},this._handleContextRestored=()=>{this.disposed||(this._rebuildGpuPipeline(),this.contextLost=!1,this.applySphericalToCamera(),this.renderSingleFrame(),this.onContextStatusChange&&this.onContextStatusChange(!1),this.captureMode||this._startLoop())},this._handleWindowResize=()=>{this.disposed||this.contextLost||(this.resize(),this.renderSingleFrame())},window.addEventListener("resize",this._handleWindowResize),this.applySphericalToCamera(),this._initWebGLRenderer(),this.canvas.addEventListener("webglcontextlost",this._handleContextLost,!1),this.canvas.addEventListener("webglcontextrestored",this._handleContextRestored,!1),this._buildGpuResources(),this.resize(),this.renderSingleFrame(),this.captureMode||this._startLoop()}_initWebGLRenderer(){this.renderer=new ZR({canvas:this.canvas,antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.autoClear=!1,this.renderer.toneMapping=Da,this.renderer.outputColorSpace=ci}_getRenderTargetType(){return this.renderer&&(this.renderer.capabilities.isWebGL2||this.renderer.extensions.has("EXT_color_buffer_half_float"))?vo:Bi}_buildGpuResources(){this.orthoCamera=new Hx(-1,1,1,-1,0,1),this.fsGeometry=m2();const e=Qi[this.quality]||Qi.high;this.raytraceMaterial=new ui({vertexShader:vl,fragmentShader:u2,depthTest:!1,depthWrite:!1,uniforms:{uCamPos:{value:new it},uCamRight:{value:new it(1,0,0)},uCamUp:{value:new it(0,1,0)},uCamForward:{value:new it(0,0,-1)},uTanHalfFov:{value:Math.tan(this.params.fov*.5*Ta)},uAspect:{value:16/9},uPortraitBoost:{value:1},uTime:{value:this.simTime},uMaxSteps:{value:e.maxSteps},uStepScale:{value:e.stepScale},uDiskSubSamples:{value:e.diskSubSamples},uStarOctaves:{value:e.starOctaves},uDebugMode:{value:this.debug},uDiskInner:{value:this.params.diskInnerRadius},uDiskOuter:{value:this.params.diskOuterRadius},uDiskHalfThickness:{value:this.params.diskHalfThickness},uDiskTemp:{value:this.params.diskTemperature},uDiskIntensity:{value:this.params.diskIntensity},uOrbitalSpeedScale:{value:this.params.orbitalSpeedScale},uTurbulenceAmp:{value:this.params.turbulenceAmplitude},uTurbulenceSpeed:{value:this.params.turbulenceSpeed},uStarDensity:{value:this.params.starDensity},uGalaxyBrightness:{value:this.params.galaxyBrightness}}}),this.prefilterMaterial=new ui({vertexShader:vl,fragmentShader:f2,depthTest:!1,depthWrite:!1,uniforms:{tInput:{value:null},uTexelSize:{value:new ue(1/512,1/512)},uThreshold:{value:this.params.bloomThreshold}}}),this.downsampleMaterial=new ui({vertexShader:vl,fragmentShader:h2,depthTest:!1,depthWrite:!1,uniforms:{tInput:{value:null},uTexelSize:{value:new ue(1/256,1/256)}}}),this.upsampleMaterial=new ui({vertexShader:vl,fragmentShader:d2,depthTest:!1,depthWrite:!1,uniforms:{tLowMip:{value:null},tHighMip:{value:null},uTexelSize:{value:new ue(1/256,1/256)},uRadiusWeight:{value:.86}}}),this.compositeMaterial=new ui({vertexShader:vl,fragmentShader:p2,depthTest:!1,depthWrite:!1,uniforms:{tSceneHdr:{value:null},tBloom:{value:null},uResolution:{value:new ue(1440,900)},uTime:{value:this.simTime},uDebugMode:{value:this.debug},uBloomStrength:{value:this.params.bloomStrength},uExposure:{value:this.params.exposure},uVignetteStrength:{value:this.params.vignetteStrength},uFilmGrainStrength:{value:this.params.filmGrainStrength},uChromaticAberration:{value:this.params.chromaticAberration}}}),this.passScene=new sT,this.passMesh=new $i(this.fsGeometry,this.raytraceMaterial),this.passMesh.frustumCulled=!1,this.passScene.add(this.passMesh),this.hdrTarget=null,this.bloomDownTargets=[],this.bloomUpTargets=[]}_disposeRenderTargets(){if(this.hdrTarget&&(this.hdrTarget.dispose(),this.hdrTarget=null),this.bloomDownTargets){for(const e of this.bloomDownTargets)e.dispose();this.bloomDownTargets=[]}if(this.bloomUpTargets){for(const e of this.bloomUpTargets)e.dispose();this.bloomUpTargets=[]}}_disposeMaterialsAndGeometry(){this._disposeRenderTargets();const e=[this.raytraceMaterial,this.prefilterMaterial,this.downsampleMaterial,this.upsampleMaterial,this.compositeMaterial];for(const i of e)i&&i.dispose();this.fsGeometry&&(this.fsGeometry.dispose(),this.fsGeometry=null)}_rebuildGpuPipeline(){this._disposeMaterialsAndGeometry(),this._buildGpuResources(),this.resize()}_allocateRenderTargets(e,i,s){this._disposeRenderTargets();const c={type:this._getRenderTargetType(),format:bi,minFilter:Ti,magFilter:Ti,depthBuffer:!1,stencilBuffer:!1};this.hdrTarget=new ta(e,i,c);let f=Math.max(2,Math.floor(e*.5)),h=Math.max(2,Math.floor(i*.5));for(let d=0;d<s;d++)this.bloomDownTargets.push(new ta(f,h,c)),d<s-1&&this.bloomUpTargets.push(new ta(f,h,c)),f=Math.max(2,Math.floor(f*.5)),h=Math.max(2,Math.floor(h*.5))}resize(){if(!this.renderer||this.contextLost)return;const e=Math.max(1,Math.floor(this.canvas.clientWidth||window.innerWidth||1280)),i=Math.max(1,Math.floor(this.canvas.clientHeight||window.innerHeight||720)),s=Qi[this.quality]||Qi.high,c=window.devicePixelRatio||1,f=Math.min(c,s.maxDpr);this.renderer.setPixelRatio(f),this.renderer.setSize(e,i,!1);const h=Math.max(2,Math.floor(e*f)),d=Math.max(2,Math.floor(i*f)),p=Math.max(2,Math.floor(h*s.renderScale)),g=Math.max(2,Math.floor(d*s.renderScale));this.aspect=e/i,this.portraitBoost=this.aspect<.95?Math.min(2.15,Math.max(1,.96/this.aspect)):1,this.camera.aspect=this.aspect,this.camera.fov=Math.min(125,2*Math.atan(Math.tan(this.params.fov*.5*Ta)*this.portraitBoost)*_l),this.camera.updateProjectionMatrix(),this._allocateRenderTargets(p,g,s.bloomLevels),this.compositeMaterial.uniforms.uResolution.value.set(h,d),this.currentBudget={quality:this.quality,cssWidth:e,cssHeight:i,dpr:Number(f.toFixed(2)),outputWidth:h,outputHeight:d,internalWidth:p,internalHeight:g,renderScale:s.renderScale,maxSteps:s.maxSteps,stepScale:s.stepScale,diskSubSamples:s.diskSubSamples,bloomLevels:s.bloomLevels,starOctaves:s.starOctaves},this.onBudgetChange&&this.onBudgetChange(this.currentBudget)}applySphericalToCamera(){this._syncingCameraFromCode=!0;const e=this.params.cameraDistance,i=this.params.cameraAzimuth*Ta,s=this.params.cameraElevation*Ta,c=Math.cos(s),f=e*c*Math.sin(i),h=e*Math.sin(s),d=e*c*Math.cos(i);this.camera.position.set(f,h,d),this.camera.up.set(0,1,0),this.camera.lookAt(0,0,0);const p=this.controls.enableDamping;this.controls.enableDamping=!1,this.controls.target.set(0,0,0),this.controls.update(),this.controls.enableDamping=p,this.camera.updateMatrixWorld(!0),this._syncingCameraFromCode=!1}_extractSphericalParamsFromCamera(){const e=this.camera.position,i=Math.max(Ln.cameraDistance.min,Math.min(Ln.cameraDistance.max,e.length())),s=Math.asin(Math.max(-1,Math.min(1,e.y/Math.max(i,1e-5))))*_l,c=Math.atan2(e.x,e.z)*_l;this.params.cameraDistance=Number(i.toFixed(2)),this.params.cameraElevation=Number(Math.max(Ln.cameraElevation.min,Math.min(Ln.cameraElevation.max,s)).toFixed(2)),this.params.cameraAzimuth=Number(c.toFixed(2))}_syncUniformsBeforeRender(){const e=Qi[this.quality]||Qi.high,i=this.raytraceMaterial.uniforms;this.camera.updateMatrixWorld(!0),this._camBasisMat.copy(this.camera.matrixWorld),this._camRight.setFromMatrixColumn(this._camBasisMat,0).normalize(),this._camUp.setFromMatrixColumn(this._camBasisMat,1).normalize(),this._camForward.setFromMatrixColumn(this._camBasisMat,2).negate().normalize(),i.uCamPos.value.copy(this.camera.position),i.uCamRight.value.copy(this._camRight),i.uCamUp.value.copy(this._camUp),i.uCamForward.value.copy(this._camForward),i.uTanHalfFov.value=Math.tan(this.params.fov*.5*Ta),i.uAspect.value=this.aspect||16/9,i.uPortraitBoost.value=this.portraitBoost||1,i.uTime.value=this.simTime,i.uMaxSteps.value=e.maxSteps,i.uStepScale.value=e.stepScale,i.uDiskSubSamples.value=e.diskSubSamples,i.uStarOctaves.value=e.starOctaves,i.uDebugMode.value=this.debug;const s=this.params.diskInnerRadius,c=Math.max(s+.5,this.params.diskOuterRadius);i.uDiskInner.value=s,i.uDiskOuter.value=c,i.uDiskHalfThickness.value=this.params.diskHalfThickness,i.uDiskTemp.value=this.params.diskTemperature,i.uDiskIntensity.value=this.params.diskIntensity,i.uOrbitalSpeedScale.value=this.params.orbitalSpeedScale,i.uTurbulenceAmp.value=this.params.turbulenceAmplitude,i.uTurbulenceSpeed.value=this.params.turbulenceSpeed,i.uStarDensity.value=this.params.starDensity,i.uGalaxyBrightness.value=this.params.galaxyBrightness,this.prefilterMaterial.uniforms.uThreshold.value=this.params.bloomThreshold;const f=this.compositeMaterial.uniforms;f.uTime.value=this.simTime,f.uDebugMode.value=this.debug,f.uBloomStrength.value=this.params.bloomStrength,f.uExposure.value=this.params.exposure,f.uVignetteStrength.value=this.params.vignetteStrength,f.uFilmGrainStrength.value=this.params.filmGrainStrength,f.uChromaticAberration.value=this.params.chromaticAberration}renderSingleFrame(){if(this.disposed||this.contextLost||!this.renderer||!this.hdrTarget)return;this._syncUniformsBeforeRender(),this.passMesh.material=this.raytraceMaterial,this.renderer.setRenderTarget(this.hdrTarget),this.renderer.render(this.passScene,this.orthoCamera);let e=this.hdrTarget.texture;if(this.debug===0&&this.bloomDownTargets.length>0&&this.params.bloomStrength>.001){this.passMesh.material=this.prefilterMaterial,this.prefilterMaterial.uniforms.tInput.value=this.hdrTarget.texture,this.prefilterMaterial.uniforms.uTexelSize.value.set(1/this.hdrTarget.width,1/this.hdrTarget.height),this.renderer.setRenderTarget(this.bloomDownTargets[0]),this.renderer.render(this.passScene,this.orthoCamera),this.passMesh.material=this.downsampleMaterial;for(let s=1;s<this.bloomDownTargets.length;s++){const c=this.bloomDownTargets[s-1],f=this.bloomDownTargets[s];this.downsampleMaterial.uniforms.tInput.value=c.texture,this.downsampleMaterial.uniforms.uTexelSize.value.set(1/c.width,1/c.height),this.renderer.setRenderTarget(f),this.renderer.render(this.passScene,this.orthoCamera)}this.passMesh.material=this.upsampleMaterial;let i=this.bloomDownTargets[this.bloomDownTargets.length-1];for(let s=this.bloomUpTargets.length-1;s>=0;s--){const c=this.bloomDownTargets[s],f=this.bloomUpTargets[s];this.upsampleMaterial.uniforms.tLowMip.value=i.texture,this.upsampleMaterial.uniforms.tHighMip.value=c.texture,this.upsampleMaterial.uniforms.uTexelSize.value.set(1/i.width,1/i.height),this.upsampleMaterial.uniforms.uRadiusWeight.value=.84,this.renderer.setRenderTarget(f),this.renderer.render(this.passScene,this.orthoCamera),i=f}e=i.texture}if(this.passMesh.material=this.compositeMaterial,this.compositeMaterial.uniforms.tSceneHdr.value=this.hdrTarget.texture,this.compositeMaterial.uniforms.tBloom.value=e,this.renderer.setRenderTarget(null),this.renderer.render(this.passScene,this.orthoCamera),!this.firstFrameRendered){const i=this.renderer.getContext();i&&typeof i.finish=="function"&&i.finish(),this.firstFrameRendered=!0,this.onFirstFrameReady&&this.onFirstFrameReady()}}_startLoop(){if(this.rafId!==null||this.disposed||this.contextLost)return;this.lastWallMs=performance.now();const e=i=>{if(this.disposed||this.contextLost){this.rafId=null;return}this.rafId=window.requestAnimationFrame(e);const s=Math.min(.1,Math.max(0,(i-(this.lastWallMs??i))*.001));if(this.lastWallMs=i,!this.captureMode)if(this.simTime+=s*this.params.timeScale,this.cinematicPlaying){this.cinematicPhase+=s*.14*Math.max(.25,this.params.timeScale);const c=(this.cinematicBaseAzimuth+this.cinematicPhase*22+540)%360-180,f=Math.max(-78,Math.min(78,this.cinematicBaseElevation+Math.sin(this.cinematicPhase*.85)*6.5)),h=Math.max(Ln.cameraDistance.min,Math.min(Ln.cameraDistance.max,this.cinematicBaseDistance*(1-.11*Math.sin(this.cinematicPhase*.55))));this.params.cameraAzimuth=Number(c.toFixed(2)),this.params.cameraElevation=Number(f.toFixed(2)),this.params.cameraDistance=Number(h.toFixed(2)),this.applySphericalToCamera(),this.onCameraInteractiveChange&&this.onCameraInteractiveChange({cameraDistance:this.params.cameraDistance,cameraAzimuth:this.params.cameraAzimuth,cameraElevation:this.params.cameraElevation})}else this.controls.enableDamping&&this.controls.update();this.renderSingleFrame()};this.rafId=window.requestAnimationFrame(e)}_stopLoop(){this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null),this.lastWallMs=null}setQuality(e){if(this.quality===e){this.captureMode&&this.renderSingleFrame();return}this.quality=e,this.resize(),this.renderSingleFrame()}setDebug(e){this.debug=e,this.renderSingleFrame()}setTime(e){this.simTime=e,this.renderSingleFrame()}setPreset(e,i=!0){const s=fi[e];s&&(this.preset=e,this.params.fov=s.fov,this.params.cameraDistance=s.cameraDistance,this.params.cameraAzimuth=s.cameraAzimuth,this.params.cameraElevation=s.cameraElevation,this.cinematicPhase=0,this.cinematicBaseAzimuth=s.cameraAzimuth,this.cinematicBaseElevation=s.cameraElevation,this.cinematicBaseDistance=s.cameraDistance,(i||this.captureMode)&&(this.cinematicPlaying=!1),this.camera.fov=Math.min(125,2*Math.atan(Math.tan(this.params.fov*.5*Ta)*(this.portraitBoost||1))*_l),this.camera.updateProjectionMatrix(),this.applySphericalToCamera(),this.renderSingleFrame())}setCinematicPlaying(e){if(this.captureMode){this.cinematicPlaying=!1;return}const i=!!e;i&&!this.cinematicPlaying&&(this.cinematicPhase=0,this.cinematicBaseAzimuth=this.params.cameraAzimuth,this.cinematicBaseElevation=this.params.cameraElevation,this.cinematicBaseDistance=this.params.cameraDistance),this.cinematicPlaying=i}updateParams(e,{cameraChanged:i=!1,pauseCinematic:s=!1}={}){this.params=lo(e),s&&this.cinematicPlaying&&(this.cinematicPlaying=!1),i&&(this.camera.fov=Math.min(125,2*Math.atan(Math.tan(this.params.fov*.5*Ta)*(this.portraitBoost||1))*_l),this.camera.updateProjectionMatrix(),this.applySphericalToCamera(),this.cinematicPhase=0,this.cinematicBaseAzimuth=this.params.cameraAzimuth,this.cinematicBaseElevation=this.params.cameraElevation,this.cinematicBaseDistance=this.params.cameraDistance),(this.captureMode||!this.rafId)&&this.renderSingleFrame()}dispose(){this.disposed||(this.disposed=!0,this._stopLoop(),window.removeEventListener("resize",this._handleWindowResize),this.canvas.removeEventListener("webglcontextlost",this._handleContextLost,!1),this.canvas.removeEventListener("webglcontextrestored",this._handleContextRestored,!1),this.controls&&(this.controls.removeEventListener("start",this._handleControlsStart),this.controls.removeEventListener("change",this._handleControlsChange),this.controls.dispose()),this._disposeMaterialsAndGeometry(),this.renderer&&(this.renderer.dispose(),this.renderer=null))}}class v2{constructor(){this.ctx=null,this.masterGain=null,this.nodes=[],this.enabled=!1}_ensureGraph(){if(this.ctx)return!0;const e=window.AudioContext||window.webkitAudioContext;if(!e)return!1;const i=new e,s=i.createGain();s.gain.setValueAtTime(1e-4,i.currentTime),s.connect(i.destination);const c=i.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(340,i.currentTime),c.Q.setValueAtTime(1.4,i.currentTime),c.connect(s);const f=i.createOscillator(),h=i.createGain();f.type="sine",f.frequency.setValueAtTime(.085,i.currentTime),h.gain.setValueAtTime(115,i.currentTime),f.connect(h),h.connect(c.frequency),f.start();const d=[{freq:55,type:"sine",gain:.34,detune:-3},{freq:82.41,type:"triangle",gain:.16,detune:4},{freq:110,type:"sawtooth",gain:.08,detune:-5},{freq:164.81,type:"sine",gain:.09,detune:6}];this.nodes.push(f,h,c);for(const p of d){const g=i.createOscillator(),_=i.createGain();g.type=p.type,g.frequency.setValueAtTime(p.freq,i.currentTime),g.detune.setValueAtTime(p.detune,i.currentTime),_.gain.setValueAtTime(p.gain,i.currentTime),g.connect(_),_.connect(c),g.start(),this.nodes.push(g,_)}return this.ctx=i,this.masterGain=s,!0}async setEnabled(e){if(!e){if(this.enabled=!1,this.ctx&&this.masterGain){const i=this.ctx.currentTime;this.masterGain.gain.cancelScheduledValues(i),this.masterGain.gain.setTargetAtTime(1e-4,i,.25)}return!1}try{if(!this._ensureGraph())return!1;if(this.ctx.state==="suspended"&&await this.ctx.resume(),this.ctx.state!=="running")return this.enabled=!1,!1;const i=this.ctx.currentTime;return this.masterGain.gain.cancelScheduledValues(i),this.masterGain.gain.setTargetAtTime(.16,i,.55),this.enabled=!0,!0}catch{return this.enabled=!1,!1}}dispose(){if(this.enabled=!1,this.ctx){try{this.ctx.close()}catch{}this.ctx=null,this.masterGain=null,this.nodes=[]}}}function _2(){return lt.jsx("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:lt.jsx("path",{d:"M6.5 4.75L15.25 10L6.5 15.25V4.75Z",fill:"currentColor",stroke:"none"})})}function x2(){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("rect",{x:"5.5",y:"4.5",width:"3.2",height:"11",rx:"1",fill:"currentColor",stroke:"none"}),lt.jsx("rect",{x:"11.3",y:"4.5",width:"3.2",height:"11",rx:"1",fill:"currentColor",stroke:"none"})]})}function lx(){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("path",{d:"M4.5 9.5A5.5 5.5 0 1 1 6.2 13.7"}),lt.jsx("path",{d:"M4.2 5.5V9.7H8.4"})]})}function y2(){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("path",{d:"M3.8 8.2H6.8L10.8 4.8V15.2L6.8 11.8H3.8V8.2Z"}),lt.jsx("path",{d:"M13.3 7.3C14.4 8.6 14.4 11.4 13.3 12.7"}),lt.jsx("path",{d:"M15.4 5.4C17.3 7.8 17.3 12.2 15.4 14.6"})]})}function S2(){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("path",{d:"M3.8 8.2H6.8L10.8 4.8V15.2L6.8 11.8H3.8V8.2Z"}),lt.jsx("path",{d:"M13.2 7.8L16.8 12.2"}),lt.jsx("path",{d:"M16.8 7.8L13.2 12.2"})]})}function M2(){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("path",{d:"M3.5 6H16.5"}),lt.jsx("path",{d:"M3.5 10H16.5"}),lt.jsx("path",{d:"M3.5 14H16.5"}),lt.jsx("circle",{cx:"7.5",cy:"6",r:"1.7",fill:"#0b0d13"}),lt.jsx("circle",{cx:"12.8",cy:"10",r:"1.7",fill:"#0b0d13"}),lt.jsx("circle",{cx:"9.2",cy:"14",r:"1.7",fill:"#0b0d13"})]})}function cx({off:o=!1}){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("path",{d:"M2.5 10C4.3 6.5 7 5 10 5C13 5 15.7 6.5 17.5 10C15.7 13.5 13 15 10 15C7 15 4.3 13.5 2.5 10Z"}),lt.jsx("circle",{cx:"10",cy:"10",r:"2.2"}),o?lt.jsx("path",{d:"M4 16L16 4"}):null]})}function E2({expanded:o=!1}){return lt.jsx("svg",{className:`ui-icon chevron-icon ${o?"is-expanded":""}`,viewBox:"0 0 20 20","aria-hidden":"true",children:lt.jsx("path",{d:"M6 8L10 12L14 8"})})}function T2(){return lt.jsxs("svg",{className:"ui-icon",viewBox:"0 0 20 20","aria-hidden":"true",children:[lt.jsx("path",{d:"M10 3.2L17.2 15.8H2.8L10 3.2Z"}),lt.jsx("path",{d:"M10 8V11.6"}),lt.jsx("circle",{cx:"10",cy:"13.8",r:"0.7",fill:"currentColor",stroke:"none"})]})}function b2(o,e){const i=Number(e);return Number.isFinite(i)?`${i.toFixed(o.decimals)}${o.unit}`:`${o.defaultValue}${o.unit}`}function A2({hudVisible:o,captureMode:e,contextLost:i,quality:s,preset:c,debug:f,cinematicPlaying:h,audioEnabled:d,params:p,budget:g,onToggleHud:_,onCycleQuality:v,onSelectQuality:x,onSelectPreset:M,onSelectDebug:C,onToggleCinematic:w,onToggleAudio:S,onParamChange:y,onParamReset:B,onResetAll:z}){const[U,Q]=We.useState(()=>typeof window>"u"?!0:window.innerWidth>860),[V,P]=We.useState(!1),L=yl[f]||yl[0],b=Qi[s]||Qi.high,A=fi[c]||fi[0],I=e?"冻结快照 CAPTURE":h?"电影巡航 CINEMATIC":"手动轨道 MANUAL";return lt.jsxs(lt.Fragment,{children:[i&&lt.jsx("div",{className:"context-lost-banner",role:"status","aria-live":"polite",children:lt.jsxs("div",{className:"context-lost-card",children:[lt.jsxs("div",{className:"context-lost-header",children:[lt.jsx(T2,{}),lt.jsx("h2",{children:"WebGL 渲染上下文已暂停"})]}),lt.jsxs("p",{children:["检测到浏览器 GPU 上下文丢失（",lt.jsx("code",{children:"webglcontextlost"}),"）。渲染循环已安全挂起，当前全部 21 项物理参数、预设与质量档位已完整保留，等待图形驱动恢复上下文后自动重建帧缓冲与着色器资源。"]})]})}),!o&&!e&&lt.jsx("div",{className:"hud-restore-pill",children:lt.jsxs("button",{type:"button",className:"hud-btn hud-btn-pill",onClick:_,title:"显示 HUD 面板 (H)","aria-label":"显示 HUD 面板",children:[lt.jsx(cx,{}),lt.jsx("span",{children:"显示 HUD"}),lt.jsx("kbd",{children:"H"})]})}),o&&lt.jsxs("div",{className:"hud-layer",children:[lt.jsxs("header",{className:"hud-topbar",children:[lt.jsxs("div",{className:"hud-top-left",children:[lt.jsxs("div",{className:"brand-cluster",children:[lt.jsxs("div",{className:"brand-title-row",children:[lt.jsx("h1",{className:"brand-title",children:"GARGANTUA"}),lt.jsx("span",{className:"brand-sub",children:"Schwarzschild Geodesic Raytracer"})]}),lt.jsxs("div",{className:"telemetry-strip","aria-label":"实时渲染状态",children:[lt.jsxs("span",{className:"telemetry-chip is-accent",children:["质量 ",b.label," (",b.zhLabel,")"]}),g?lt.jsxs("span",{className:"telemetry-chip",children:[g.internalWidth,"×",g.internalHeight," · ",g.maxSteps," 步 RK4"]}):null,lt.jsxs("span",{className:"telemetry-chip",children:["镜头: ",I]}),lt.jsxs("span",{className:`telemetry-chip ${f>0?"is-diag":""}`,children:["视图 [",L.index,"] ",L.name]})]})]}),f>0&&lt.jsxs("div",{className:"debug-callout is-highlighted",role:"status",children:[lt.jsxs("span",{className:"debug-badge",children:["DEBUG ",L.index]}),lt.jsx("strong",{className:"debug-title",children:L.name}),lt.jsx("span",{className:"debug-desc",children:L.description})]})]}),lt.jsxs("div",{className:"top-actions",role:"toolbar","aria-label":"全局控制",children:[lt.jsxs("button",{type:"button",className:`hud-btn ${h?"is-active":""}`,onClick:w,title:"播放或暂停电影镜头循环 (Space)",children:[h?lt.jsx(x2,{}):lt.jsx(_2,{}),lt.jsx("span",{children:h?"暂停镜头":"播放镜头"}),lt.jsx("kbd",{children:"Space"})]}),lt.jsxs("button",{type:"button",className:"hud-btn",onClick:v,title:"切换渲染质量档位 (Q)",children:[lt.jsxs("span",{children:["画质: ",b.label]}),lt.jsx("kbd",{children:"Q"})]}),lt.jsxs("button",{type:"button",className:`hud-btn ${d?"is-active":""}`,onClick:S,title:"切换程序化深空环境音效 (M)","aria-pressed":d,children:[d?lt.jsx(y2,{}):lt.jsx(S2,{}),lt.jsx("span",{className:"hide-compact",children:d?"音效开":"音效关"}),lt.jsx("kbd",{children:"M"})]}),lt.jsxs("button",{type:"button",className:"hud-btn",onClick:z,title:"重置全部参数、视角与默认状态 (R)",children:[lt.jsx(lx,{}),lt.jsx("span",{className:"hide-compact",children:"重置"}),lt.jsx("kbd",{children:"R"})]}),lt.jsxs("button",{type:"button",className:`hud-btn inspector-toggle-btn ${U?"is-active":""}`,onClick:()=>Q(W=>!W),"aria-expanded":U,title:"展开或收起 21 项物理与光学参数抽屉",children:[lt.jsx(M2,{}),lt.jsx("span",{children:"参数面板"}),lt.jsx(E2,{expanded:U})]}),lt.jsxs("button",{type:"button",className:"hud-btn",onClick:_,title:"隐藏 HUD (H)","aria-label":"隐藏 HUD",children:[lt.jsx(cx,{off:!0}),lt.jsx("kbd",{children:"H"})]})]})]}),lt.jsxs("section",{className:"hud-bottom-left","aria-label":"视角预设与调试模式",children:[lt.jsxs("div",{className:"panel-block",children:[lt.jsxs("div",{className:"block-header",children:[lt.jsx("span",{className:"block-title",children:"相机视角预设"}),lt.jsx("span",{className:"block-hint",children:"拖拽旋转 · 滚轮/双指缩放 · Shift+1–4"})]}),lt.jsx("div",{className:"preset-grid",role:"group","aria-label":"视角预设选择",children:fi.map(W=>{const et=c===W.index;return lt.jsxs("button",{type:"button",className:`preset-btn ${et?"is-selected":""}`,onClick:()=>M(W.index),title:`${W.name} (${W.shortcut}) — ${W.summary}`,"aria-pressed":et,children:[lt.jsx("span",{className:"preset-name",children:W.name}),lt.jsx("kbd",{children:W.shortcut})]},W.index)})})]}),lt.jsxs("div",{className:"panel-block",children:[lt.jsxs("div",{className:"block-header",children:[lt.jsx("span",{className:"block-title",children:"诊断视图 (0–9)"}),lt.jsx("button",{type:"button",className:"text-link-btn",onClick:()=>P(W=>!W),"aria-expanded":V,children:V?"收起快捷键":"快捷键列表"})]}),lt.jsx("div",{className:"debug-strip",role:"group","aria-label":"0 至 9 调试视图切换",children:yl.map(W=>{const et=f===W.index;return lt.jsx("button",{type:"button",className:`debug-pill ${et?"is-selected":""}`,onClick:()=>C(W.index),title:`${W.index}: ${W.name} — ${W.description}`,"aria-pressed":et,children:W.index},W.index)})}),V&&lt.jsx("ul",{className:"shortcut-legend","aria-label":"键盘快捷键说明",children:o_.map(W=>lt.jsxs("li",{children:[lt.jsx("kbd",{children:W.keys}),lt.jsx("span",{children:W.action})]},W.keys))})]})]}),lt.jsxs("aside",{className:`hud-inspector ${U?"is-open":"is-collapsed"}`,"aria-label":"物理与后处理参数控制台",children:[lt.jsxs("div",{className:"inspector-header",children:[lt.jsxs("div",{children:[lt.jsx("h2",{className:"inspector-title",children:"物理与光学参数"}),lt.jsxs("p",{className:"inspector-subtitle",children:["当前预设: ",A.name," · 双击滑块可单项复位"]})]}),lt.jsxs("button",{type:"button",className:"hud-btn hud-btn-compact",onClick:z,title:"恢复全部默认参数 (R)",children:[lt.jsx(lx,{}),lt.jsx("span",{children:"全部复位"})]})]}),lt.jsxs("div",{className:"inspector-scroll",children:[lt.jsxs("div",{className:"inspector-section",children:[lt.jsxs("div",{className:"section-heading-row",children:[lt.jsx("h3",{className:"section-heading",children:"渲染质量档位"}),lt.jsx("span",{className:"section-meta",children:"快捷键 Q"})]}),lt.jsx("div",{className:"quality-segmented",role:"group","aria-label":"渲染质量档位",children:vu.map(W=>{const et=Qi[W],nt=s===W;return lt.jsxs("button",{type:"button",className:`quality-seg-btn ${nt?"is-selected":""}`,onClick:()=>x(W),"aria-pressed":nt,children:[lt.jsx("strong",{children:et.label}),lt.jsxs("span",{children:[et.maxSteps," 步"]})]},W)})})]}),IM.map(W=>{const et=Du.filter(nt=>nt.group===W.id);return lt.jsxs("div",{className:"inspector-section",children:[lt.jsxs("div",{className:"section-heading-row",children:[lt.jsx("h3",{className:"section-heading",children:W.label}),lt.jsx("span",{className:"section-meta",children:W.enLabel})]}),lt.jsx("div",{className:"param-list",children:et.map(nt=>{const ut=p[nt.key],k=(ut-nt.min)/Math.max(nt.max-nt.min,1e-6)*100;return lt.jsxs("div",{className:"param-row",children:[lt.jsxs("div",{className:"param-label-row",children:[lt.jsx("label",{htmlFor:`param-${nt.key}`,className:"param-label",children:nt.label}),lt.jsx("output",{htmlFor:`param-${nt.key}`,className:"param-value",children:b2(nt,ut)})]}),lt.jsx("input",{id:`param-${nt.key}`,name:nt.key,type:"range",className:"param-slider",min:nt.min,max:nt.max,step:nt.step,value:ut,style:{"--fill-pct":`${Math.max(0,Math.min(100,k))}%`},onChange:st=>y(nt.key,Number(st.target.value)),onDoubleClick:()=>B(nt.key)})]},nt.key)})})]},W.id)}),lt.jsxs("div",{className:"inspector-section inspector-shortcuts-footer",children:[lt.jsxs("div",{className:"section-heading-row",children:[lt.jsx("h3",{className:"section-heading",children:"键盘快捷键"}),lt.jsx("span",{className:"section-meta",children:"Keyboard"})]}),lt.jsx("ul",{className:"shortcut-legend is-compact",children:o_.map(W=>lt.jsxs("li",{children:[lt.jsx("kbd",{children:W.keys}),lt.jsx("span",{children:W.action})]},W.keys))})]})]})]})]})]})}const R2=new Set(["fov","cameraDistance","cameraAzimuth","cameraElevation"]);function C2(){const[o,e]=We.useState(()=>FM(window.location.search)),[i,s]=We.useState(!1),[c,f]=We.useState(null),h=We.useRef(null),d=We.useRef(null),p=We.useRef(null),g=We.useRef(o),_=We.useRef(!1),v=We.useRef(!1);g.current=o,We.useEffect(()=>{HM(o)},[o]);const x=We.useCallback(()=>{const L=g.current,b=d.current;return{ready:!!(_.current&&!v.current),captureMode:!!L.captureMode,contextLost:!!v.current,quality:L.quality,preset:L.preset,debug:L.debug,hudVisible:!!L.hudVisible,cinematicPlaying:!!L.cinematicPlaying,audioEnabled:!!L.audioEnabled,time:b?Number(b.simTime.toFixed(4)):L.time,params:{...L.params},qualityBudget:b&&b.currentBudget?{...b.currentBudget}:null}},[]),M=We.useCallback(L=>{if(!bu(L))return!1;const b=d.current;b&&b.setQuality(L);const A={...g.current,quality:L};return g.current=A,e(A),!0},[]),C=We.useCallback(L=>{if(!kd(L))return!1;const b=fi[L],A=d.current;A&&A.setPreset(L,!0);const I=lo({...g.current.params,fov:b.fov,cameraDistance:b.cameraDistance,cameraAzimuth:b.cameraAzimuth,cameraElevation:b.cameraElevation}),W={...g.current,preset:L,cinematicPlaying:!1,params:I};return g.current=W,e(W),!0},[]),w=We.useCallback(L=>{if(!Xd(L))return!1;const b=d.current;b&&b.setDebug(L);const A={...g.current,debug:L};return g.current=A,e(A),!0},[]),S=We.useCallback(L=>{if(!l_(L))return!1;const b=d.current;b&&b.setTime(L);const A={...g.current,time:L};return g.current=A,e(A),!0},[]),y=We.useCallback(()=>{e(L=>{const b={...L,hudVisible:!L.hudVisible};return g.current=b,b})},[]),B=We.useCallback(()=>{const L=vu.indexOf(g.current.quality),b=vu[(L+1)%vu.length];M(b)},[M]),z=We.useCallback(()=>{if(g.current.captureMode)return;const L=!g.current.cinematicPlaying,b=d.current;b&&b.setCinematicPlaying(L);const A={...g.current,cinematicPlaying:L};g.current=A,e(A)},[]),U=We.useCallback(async()=>{if(g.current.captureMode)return;p.current||(p.current=new v2);const L=!g.current.audioEnabled,b=await p.current.setEnabled(L);e(A=>{const I={...A,audioEnabled:b};return g.current=I,I})},[]),Q=We.useCallback((L,b)=>{if(!Object.prototype.hasOwnProperty.call(Ln,L))return;const A=fx(L,b),I={...g.current.params,[L]:A};L==="diskInnerRadius"&&I.diskOuterRadius<A+.5?I.diskOuterRadius=Math.min(Ln.diskOuterRadius.max,A+.5):L==="diskOuterRadius"&&I.diskInnerRadius>A-.5&&(I.diskInnerRadius=Math.max(Ln.diskInnerRadius.min,A-.5));const W=lo(I),et=R2.has(L),nt=et&&L!=="fov",ut=d.current;ut&&ut.updateParams(W,{cameraChanged:et,pauseCinematic:nt});const k={...g.current,cinematicPlaying:nt?!1:g.current.cinematicPlaying,params:W};g.current=k,e(k)},[]),V=We.useCallback(L=>{const b=Ln[L];b&&Q(L,b.defaultValue)},[Q]),P=We.useCallback(()=>{GM();const L=hx();g.current.captureMode&&(L.captureMode=!0,L.cinematicPlaying=!1,L.audioEnabled=!1,L.time=g.current.time),p.current&&p.current.setEnabled(!1);const b=d.current;b&&(b.setQuality(L.quality),b.setDebug(L.debug),b.updateParams(L.params,{cameraChanged:!0,pauseCinematic:!1}),b.setPreset(L.preset,!1),b.setCinematicPlaying(L.cinematicPlaying),b.renderSingleFrame()),g.current=L,e(L)},[]);return We.useEffect(()=>{const L=h.current;if(!L)return;document.documentElement.dataset.gargantuaReady="false",_.current=!1;const b=g.current;let A=!1,I=null;const W=new g2({canvas:L,initialState:b,onManualCameraStart:()=>{e(nt=>{if(!nt.cinematicPlaying)return nt;const ut={...nt,cinematicPlaying:!1};return g.current=ut,ut})},onCameraInteractiveChange:nt=>{I=nt,!A&&(A=!0,window.requestAnimationFrame(()=>{if(A=!1,!I)return;const ut=I;e(k=>{const st={...k,params:{...k.params,cameraDistance:ut.cameraDistance,cameraAzimuth:ut.cameraAzimuth,cameraElevation:ut.cameraElevation}};return g.current=st,st})}))},onContextStatusChange:nt=>{v.current=nt,s(nt),document.documentElement.dataset.gargantuaReady=nt?"false":"true"},onBudgetChange:nt=>{f(nt)},onFirstFrameReady:()=>{_.current=!0,document.documentElement.dataset.gargantuaReady="true"}});d.current=W;const et={};return Object.defineProperty(et,"ready",{enumerable:!0,configurable:!1,get:()=>!!(_.current&&!v.current)}),et.getState=()=>x(),et.setQuality=nt=>{try{return bu(nt)?(M(nt),{...x(),ok:!0}):{ok:!1,error:"Invalid quality level. Expected standard, high, or cinematic.",state:x()}}catch(ut){return{ok:!1,error:String(ut),state:x()}}},et.setPreset=nt=>{try{return kd(nt)?(C(nt),{...x(),ok:!0}):{ok:!1,error:"Invalid preset index. Expected integer 0..3.",state:x()}}catch(ut){return{ok:!1,error:String(ut),state:x()}}},et.setDebug=nt=>{try{return Xd(nt)?(w(nt),{...x(),ok:!0}):{ok:!1,error:"Invalid debug index. Expected integer 0..9.",state:x()}}catch(ut){return{ok:!1,error:String(ut),state:x()}}},et.setTime=nt=>{try{return l_(nt)?(S(nt),{...x(),ok:!0}):{ok:!1,error:"Invalid simulation time. Expected finite non-negative number.",state:x()}}catch(ut){return{ok:!1,error:String(ut),state:x()}}},window.__GARGANTUA__=Object.freeze(et),W.firstFrameRendered&&!W.contextLost&&(_.current=!0,document.documentElement.dataset.gargantuaReady="true"),()=>{_.current=!1,document.documentElement.dataset.gargantuaReady="false",p.current&&(p.current.dispose(),p.current=null),W.dispose(),d.current=null}},[w,C,M,S,x]),We.useEffect(()=>{const L=b=>{if(b.ctrlKey||b.metaKey||b.altKey)return;const A=b.target;if(A&&(A.tagName==="TEXTAREA"||A.tagName==="INPUT"&&A.type!=="range"))return;const I=b.code||"";if(b.shiftKey){if(I==="Digit1"||b.key==="!"){b.preventDefault(),C(0);return}if(I==="Digit2"||b.key==="@"){b.preventDefault(),C(1);return}if(I==="Digit3"||b.key==="#"){b.preventDefault(),C(2);return}if(I==="Digit4"||b.key==="$"){b.preventDefault(),C(3);return}return}if(/^Digit[0-9]$/.test(I)){b.preventDefault(),w(Number(I.slice(5)));return}if(/^Numpad[0-9]$/.test(I)){b.preventDefault(),w(Number(I.slice(6)));return}if(I==="Space"||b.key===" "){b.preventDefault(),z();return}const W=(b.key||"").toLowerCase();W==="h"?(b.preventDefault(),y()):W==="r"?(b.preventDefault(),P()):W==="q"?(b.preventDefault(),B()):W==="m"&&(b.preventDefault(),U())};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[w,C,B,P,U,z,y]),lt.jsxs("main",{className:"viewport-root",children:[lt.jsx("canvas",{ref:h,className:"raytracer-canvas","aria-label":"Gargantua Schwarzschild Black Hole Real-Time Geodesic Raytracer"}),lt.jsx(A2,{hudVisible:o.hudVisible,captureMode:o.captureMode,contextLost:i,quality:o.quality,preset:o.preset,debug:o.debug,cinematicPlaying:o.cinematicPlaying,audioEnabled:o.audioEnabled,params:o.params,budget:c,onToggleHud:y,onCycleQuality:B,onSelectQuality:M,onSelectPreset:C,onSelectDebug:w,onToggleCinematic:z,onToggleAudio:U,onParamChange:Q,onParamReset:V,onResetAll:P})]})}const D2=document.getElementById("root");zM.createRoot(D2).render(lt.jsx(C2,{}));
