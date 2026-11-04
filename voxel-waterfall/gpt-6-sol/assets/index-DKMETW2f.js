(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function r(u){if(u.ep)return;u.ep=!0;const f=i(u);fetch(u.href,f)}})();function Lx(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var gd={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var av;function Ox(){if(av)return ie;av=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),y=Symbol.for("react.view_transition"),x=Symbol.iterator;function b(C){return C===null||typeof C!="object"?null:(C=x&&C[x]||C["@@iterator"],typeof C=="function"?C:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,S={};function z(C,Z,mt){this.props=C,this.context=Z,this.refs=S,this.updater=mt||w}z.prototype.isReactComponent={},z.prototype.setState=function(C,Z){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,Z,"setState")},z.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function P(){}P.prototype=z.prototype;function U(C,Z,mt){this.props=C,this.context=Z,this.refs=S,this.updater=mt||w}var V=U.prototype=new P;V.constructor=U,M(V,z.prototype),V.isPureReactComponent=!0;var H=Array.isArray;function O(){}var I={H:null,A:null,T:null,S:null},D=Object.prototype.hasOwnProperty;function A(C,Z,mt){var ut=mt.ref;return{$$typeof:o,type:C,key:Z,ref:ut!==void 0?ut:null,props:mt}}function B(C,Z){return A(C.type,Z,C.props)}function ot(C){return typeof C=="object"&&C!==null&&C.$$typeof===o}function it(C){var Z={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(mt){return Z[mt]})}var pt=/\/+/g;function ht(C,Z){return typeof C=="object"&&C!==null&&C.key!=null?it(""+C.key):Z.toString(36)}function W(C){switch(C.status){case"fulfilled":return C.value;case"rejected":throw C.reason;default:switch(typeof C.status=="string"?C.then(O,O):(C.status="pending",C.then(function(Z){C.status==="pending"&&(C.status="fulfilled",C.value=Z)},function(Z){C.status==="pending"&&(C.status="rejected",C.reason=Z)})),C.status){case"fulfilled":return C.value;case"rejected":throw C.reason}}throw C}function st(C,Z,mt,ut,Tt){var Vt=typeof C;(Vt==="undefined"||Vt==="boolean")&&(C=null);var wt=!1;if(C===null)wt=!0;else switch(Vt){case"bigint":case"string":case"number":wt=!0;break;case"object":switch(C.$$typeof){case o:case e:wt=!0;break;case v:return wt=C._init,st(wt(C._payload),Z,mt,ut,Tt)}}if(wt)return Tt=Tt(C),wt=ut===""?"."+ht(C,0):ut,H(Tt)?(mt="",wt!=null&&(mt=wt.replace(pt,"$&/")+"/"),st(Tt,Z,mt,"",function(se){return se})):Tt!=null&&(ot(Tt)&&(Tt=B(Tt,mt+(Tt.key==null||C&&C.key===Tt.key?"":(""+Tt.key).replace(pt,"$&/")+"/")+wt)),Z.push(Tt)),1;wt=0;var At=ut===""?".":ut+":";if(H(C))for(var It=0;It<C.length;It++)ut=C[It],Vt=At+ht(ut,It),wt+=st(ut,Z,mt,Vt,Tt);else if(It=b(C),typeof It=="function")for(C=It.call(C),It=0;!(ut=C.next()).done;)ut=ut.value,Vt=At+ht(ut,It++),wt+=st(ut,Z,mt,Vt,Tt);else if(Vt==="object"){if(typeof C.then=="function")return st(W(C),Z,mt,ut,Tt);throw Z=String(C),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return wt}function Q(C,Z,mt){if(C==null)return C;var ut=[],Tt=0;return st(C,ut,"","",function(Vt){return Z.call(mt,Vt,Tt++)}),ut}function yt(C){if(C._status===-1){var Z=C._result,mt=Z();mt.then(function(ut){(C._status===0||C._status===-1)&&(C._status=1,C._result=ut,mt.status===void 0&&(mt.status="fulfilled",mt.value=ut))},function(ut){(C._status===0||C._status===-1)&&(C._status=2,C._result=ut,mt.status===void 0&&(mt.status="rejected",mt.reason=ut))}),C._status===-1&&(C._status=0,C._result=mt)}if(C._status===1)return C._result.default;throw C._result}var St=typeof reportError=="function"?reportError:function(C){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof C=="object"&&C!==null&&typeof C.message=="string"?String(C.message):String(C),error:C});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",C);return}console.error(C)};function Ht(C){var Z=I.T,mt={};mt.types=Z!==null?Z.types:null,I.T=mt;try{var ut=C(),Tt=I.S;Tt!==null&&Tt(mt,ut),typeof ut=="object"&&ut!==null&&typeof ut.then=="function"&&ut.then(O,St)}catch(Vt){St(Vt)}finally{Z!==null&&mt.types!==null&&(Z.types=mt.types),I.T=Z}}function ee(C){var Z=I.T;if(Z!==null){var mt=Z.types;mt===null?Z.types=[C]:mt.indexOf(C)===-1&&mt.push(C)}else Ht(ee.bind(null,C))}var be={map:Q,forEach:function(C,Z,mt){Q(C,function(){Z.apply(this,arguments)},mt)},count:function(C){var Z=0;return Q(C,function(){Z++}),Z},toArray:function(C){return Q(C,function(Z){return Z})||[]},only:function(C){if(!ot(C))throw Error("React.Children.only expected to receive a single React element child.");return C}};return ie.Activity=g,ie.Children=be,ie.Component=z,ie.Fragment=i,ie.Profiler=u,ie.PureComponent=U,ie.StrictMode=r,ie.Suspense=p,ie.ViewTransition=y,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,ie.__COMPILER_RUNTIME={__proto__:null,c:function(C){return I.H.useMemoCache(C)}},ie.addTransitionType=ee,ie.cache=function(C){return function(){return C.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(C,Z,mt){if(C==null)throw Error("The argument must be a React element, but you passed "+C+".");var ut=M({},C.props),Tt=C.key;if(Z!=null)for(Vt in Z.key!==void 0&&(Tt=""+Z.key),Z)!D.call(Z,Vt)||Vt==="key"||Vt==="__self"||Vt==="__source"||Vt==="ref"&&Z.ref===void 0||(ut[Vt]=Z[Vt]);var Vt=arguments.length-2;if(Vt===1)ut.children=mt;else if(1<Vt){for(var wt=Array(Vt),At=0;At<Vt;At++)wt[At]=arguments[At+2];ut.children=wt}return A(C.type,Tt,ut)},ie.createContext=function(C){return C={$$typeof:h,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null},C.Provider=C,C.Consumer={$$typeof:f,_context:C},C},ie.createElement=function(C,Z,mt){var ut,Tt={},Vt=null;if(Z!=null)for(ut in Z.key!==void 0&&(Vt=""+Z.key),Z)D.call(Z,ut)&&ut!=="key"&&ut!=="__self"&&ut!=="__source"&&(Tt[ut]=Z[ut]);var wt=arguments.length-2;if(wt===1)Tt.children=mt;else if(1<wt){for(var At=Array(wt),It=0;It<wt;It++)At[It]=arguments[It+2];Tt.children=At}if(C&&C.defaultProps)for(ut in wt=C.defaultProps,wt)Tt[ut]===void 0&&(Tt[ut]=wt[ut]);return A(C,Vt,Tt)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(C){return{$$typeof:d,render:C}},ie.isValidElement=ot,ie.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:yt}},ie.memo=function(C,Z){return{$$typeof:m,type:C,compare:Z===void 0?null:Z}},ie.startTransition=Ht,ie.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},ie.use=function(C){return I.H.use(C)},ie.useActionState=function(C,Z,mt){return I.H.useActionState(C,Z,mt)},ie.useCallback=function(C,Z){return I.H.useCallback(C,Z)},ie.useContext=function(C){return I.H.useContext(C)},ie.useDebugValue=function(){},ie.useDeferredValue=function(C,Z){return I.H.useDeferredValue(C,Z)},ie.useEffect=function(C,Z){return I.H.useEffect(C,Z)},ie.useEffectEvent=function(C){return I.H.useEffectEvent(C)},ie.useId=function(){return I.H.useId()},ie.useImperativeHandle=function(C,Z,mt){return I.H.useImperativeHandle(C,Z,mt)},ie.useInsertionEffect=function(C,Z){return I.H.useInsertionEffect(C,Z)},ie.useLayoutEffect=function(C,Z){return I.H.useLayoutEffect(C,Z)},ie.useMemo=function(C,Z){return I.H.useMemo(C,Z)},ie.useOptimistic=function(C,Z){return I.H.useOptimistic(C,Z)},ie.useReducer=function(C,Z,mt){return I.H.useReducer(C,Z,mt)},ie.useRef=function(C){return I.H.useRef(C)},ie.useState=function(C){return I.H.useState(C)},ie.useSyncExternalStore=function(C,Z,mt){return I.H.useSyncExternalStore(C,Z,mt)},ie.useTransition=function(){return I.H.useTransition()},ie.version="19.3.0",ie}var sv;function Ip(){return sv||(sv=1,gd.exports=Ox()),gd.exports}var bi=Ip();const Wt=Lx(bi);var _d={exports:{}},Tl={},vd={exports:{}},yd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rv;function Px(){return rv||(rv=1,(function(o){function e(W,st){var Q=W.length;W.push(st);t:for(;0<Q;){var yt=Q-1>>>1,St=W[yt];if(0<u(St,st))W[yt]=st,W[Q]=St,Q=yt;else break t}}function i(W){return W.length===0?null:W[0]}function r(W){if(W.length===0)return null;var st=W[0],Q=W.pop();if(Q!==st){W[0]=Q;t:for(var yt=0,St=W.length,Ht=St>>>1;yt<Ht;){var ee=2*(yt+1)-1,be=W[ee],C=ee+1,Z=W[C];if(0>u(be,Q))C<St&&0>u(Z,be)?(W[yt]=Z,W[C]=Q,yt=C):(W[yt]=be,W[ee]=Q,yt=ee);else if(C<St&&0>u(Z,Q))W[yt]=Z,W[C]=Q,yt=C;else break t}}return st}function u(W,st){var Q=W.sortIndex-st.sortIndex;return Q!==0?Q:W.id-st.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var p=[],m=[],v=1,g=null,y=3,x=!1,b=!1,w=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function U(W){for(var st=i(m);st!==null;){if(st.callback===null)r(m);else if(st.startTime<=W)r(m),st.sortIndex=st.expirationTime,e(p,st);else break;st=i(m)}}function V(W){if(w=!1,U(W),!b)if(i(p)!==null)b=!0,H||(H=!0,ot());else{var st=i(m);st!==null&&ht(V,st.startTime-W)}}var H=!1,O=-1,I=5,D=-1;function A(){return M?!0:!(o.unstable_now()-D<I)}function B(){if(M=!1,H){var W=o.unstable_now();D=W;var st=!0;try{t:{b=!1,w&&(w=!1,z(O),O=-1),x=!0;var Q=y;try{e:{for(U(W),g=i(p);g!==null&&!(g.expirationTime>W&&A());){var yt=g.callback;if(typeof yt=="function"){g.callback=null,y=g.priorityLevel;var St=yt(g.expirationTime<=W);if(W=o.unstable_now(),typeof St=="function"){g.callback=St,U(W),st=!0;break e}g===i(p)&&r(p),U(W)}else r(p);g=i(p)}if(g!==null)st=!0;else{var Ht=i(m);Ht!==null&&ht(V,Ht.startTime-W),st=!1}}break t}finally{g=null,y=Q,x=!1}st=void 0}}finally{st?ot():H=!1}}}var ot;if(typeof P=="function")ot=function(){P(B)};else if(typeof MessageChannel<"u"){var it=new MessageChannel,pt=it.port2;it.port1.onmessage=B,ot=function(){pt.postMessage(null)}}else ot=function(){S(B,0)};function ht(W,st){O=S(function(){W(o.unstable_now())},st)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(W){W.callback=null},o.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<W?Math.floor(1e3/W):5},o.unstable_getCurrentPriorityLevel=function(){return y},o.unstable_next=function(W){switch(y){case 1:case 2:case 3:var st=3;break;default:st=y}var Q=y;y=st;try{return W()}finally{y=Q}},o.unstable_requestPaint=function(){M=!0},o.unstable_runWithPriority=function(W,st){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var Q=y;y=W;try{return st()}finally{y=Q}},o.unstable_scheduleCallback=function(W,st,Q){var yt=o.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?yt+Q:yt):Q=yt,W){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=Q+St,W={id:v++,callback:st,priorityLevel:W,startTime:Q,expirationTime:St,sortIndex:-1},Q>yt?(W.sortIndex=Q,e(m,W),i(p)===null&&W===i(m)&&(w?(z(O),O=-1):w=!0,ht(V,Q-yt))):(W.sortIndex=St,e(p,W),b||x||(b=!0,H||(H=!0,ot()))),W},o.unstable_shouldYield=A,o.unstable_wrapCallback=function(W){var st=y;return function(){var Q=y;y=st;try{return W.apply(this,arguments)}finally{y=Q}}}})(yd)),yd}var ov;function zx(){return ov||(ov=1,vd.exports=Px()),vd.exports}var Sd={exports:{}},Ln={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lv;function Ix(){if(lv)return Ln;lv=1;var o=Ip();function e(v){var g="https://react.dev/errors/"+v;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)g+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+v+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},u=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(v,g,y){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:x===h?h:""+x,children:v,containerInfo:g,implementation:y}}var p=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(v,g){if(v==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return Ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Ln.browser=function(v){return{$$typeof:f,_reason:v}},Ln.createPortal=function(v,g){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(e(299));return d(v,g,null,y)},Ln.flushSync=function(v){var g=p.T,y=r.p;try{if(p.T=null,r.p=2,v)return v()}finally{p.T=g,r.p=y,r.d.f()}},Ln.preconnect=function(v,g){typeof v=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,r.d.C(v,g))},Ln.prefetchDNS=function(v){typeof v=="string"&&r.d.D(v)},Ln.preinit=function(v,g){if(typeof v=="string"&&g&&typeof g.as=="string"){var y=g.as,x=m(y,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,w=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;y==="style"?r.d.S(v,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:w}):y==="script"&&r.d.X(v,{crossOrigin:x,integrity:b,fetchPriority:w,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},Ln.preinitModule=function(v,g){if(typeof v=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var y=m(g.as,g.crossOrigin);r.d.M(v,{crossOrigin:y,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0})}}else g==null&&r.d.M(v)},Ln.preload=function(v,g){if(typeof v=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var y=g.as,x=m(y,g.crossOrigin);r.d.L(v,y,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},Ln.preloadModule=function(v,g){if(typeof v=="string")if(g){var y=m(g.as,g.crossOrigin);r.d.m(v,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:y,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0})}else r.d.m(v)},Ln.requestFormReset=function(v){r.d.r(v)},Ln.unstable_batchedUpdates=function(v,g){return v(g)},Ln.useFormState=function(v,g,y){return p.H.useFormState(v,g,y)},Ln.useFormStatus=function(){return p.H.useHostTransitionStatus()},Ln.version="19.3.0",Ln}var uv;function Bx(){if(uv)return Sd.exports;uv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),Sd.exports=Ix(),Sd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cv;function Fx(){if(cv)return Tl;cv=1;var o=zx(),e=Ip(),i=Bx();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(r(188))}function m(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,s=n;;){var l=a.return;if(l===null)break;var c=l.alternate;if(c===null){if(s=l.return,s!==null){a=s;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===a)return p(l),t;if(c===s)return p(l),n;c=c.sibling}throw Error(r(188))}if(a.return!==s.return)a=l,s=c;else{for(var _=!1,E=l.child;E;){if(E===a){_=!0,a=l,s=c;break}if(E===s){_=!0,s=l,a=c;break}E=E.sibling}if(!_){for(E=c.child;E;){if(E===a){_=!0,a=c,s=l;break}if(E===s){_=!0,s=c,a=l;break}E=E.sibling}if(!_)throw Error(r(189))}}if(a.alternate!==s)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}function g(t,n,a,s,l,c){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,s,l,c)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&g(t.child,n,a,s,l,c))return!0;t=t.sibling}return!1}function y(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function x(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function b(t){var n=[null,null],a=y(t);return a===null||w(n,t,a.child,{foundSelf:!1}),n}function w(t,n,a,s){for(;a!==null;){if(a===n)s.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(s.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&w(t,n,a.child,s))return!0;a=a.sibling}return!1}function M(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(r(559))}}var S=null,z=null;function P(t,n,a){return t===a?!0:t===n?(S=t,!0):!1}function U(t,n,a){return t===a?(z=t,!1):t===n?(z!==null&&(S=t),!0):!1}function V(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function H(t,n,a){for(var s=0,l=t;l;l=a(l))s++;l=0;for(var c=n;c;c=a(c))l++;for(;0<s-l;)t=a(t),s--;for(;0<l-s;)n=a(n),l--;for(;s--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var O=Object.assign,I=Symbol.for("react.element"),D=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),B=Symbol.for("react.fragment"),ot=Symbol.for("react.strict_mode"),it=Symbol.for("react.profiler"),pt=Symbol.for("react.consumer"),ht=Symbol.for("react.context"),W=Symbol.for("react.forward_ref"),st=Symbol.for("react.suspense"),Q=Symbol.for("react.suspense_list"),yt=Symbol.for("react.memo"),St=Symbol.for("react.lazy"),Ht=Symbol.for("react.activity"),ee=Symbol.for("react.legacy_hidden"),be=Symbol.for("react.memo_cache_sentinel"),C=Symbol.for("react.view_transition"),Z=Symbol.for("react.recoverable"),mt=Symbol.iterator;function ut(t){return t===null||typeof t!="object"?null:(t=mt&&t[mt]||t["@@iterator"],typeof t=="function"?t:null)}var Tt=Symbol.for("react.client.reference");function Vt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Tt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case B:return"Fragment";case it:return"Profiler";case ot:return"StrictMode";case st:return"Suspense";case Q:return"SuspenseList";case Ht:return"Activity";case C:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case A:return"Portal";case ht:return t.displayName||"Context";case pt:return(t._context.displayName||"Context")+".Consumer";case W:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case yt:return n=t.displayName||null,n!==null?n:Vt(t.type)||"Memo";case St:n=t._payload,t=t._init;try{return Vt(t(n))}catch{}}return null}var wt=Array.isArray,At=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,It=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},G=[],dn=-1;function ae(t){return{current:t}}function Kt(t){0>dn||(t.current=G[dn],G[dn]=null,dn--)}function Rt(t,n){dn++,G[dn]=t.current,t.current=n}var Me=ae(null),kt=ae(null),N=ae(null),T=ae(null);function tt(t,n){switch(Rt(N,n),Rt(kt,t),Rt(Me,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?d0(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=d0(n),t=p0(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Kt(Me),Rt(Me,t)}function gt(){Kt(Me),Kt(kt),Kt(N)}function vt(t){var n=t.memoizedState;n!==null&&(jr._currentValue=n.memoizedState,Rt(T,t)),n=Me.current;var a=p0(n,t.type);n!==a&&(Rt(kt,t),Rt(Me,a))}function dt(t){kt.current===t&&(Kt(Me),Kt(kt)),T.current===t&&(Kt(T),jr._currentValue=se)}var Yt,Nt;function Pt(t){if(Yt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Yt=n&&n[1]||"",Nt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yt+t+Nt}var _e=!1;function xt(t,n){if(!t||_e)return"";_e=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var ft=function(){throw Error()};if(Object.defineProperty(ft.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ft,[])}catch(Ct){var k=Ct}Reflect.construct(t,[],ft)}else{try{ft.call()}catch(Ct){k=Ct}ft=!1;try{var $=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),ft=!0,new t}finally{ft&&($!==void 0?Object.defineProperty(t.prototype,"props",$):delete t.prototype.props)}}}else{try{throw Error()}catch(Ct){k=Ct}(ft=t())&&typeof ft.catch=="function"&&ft.catch(function(){})}}catch(Ct){if(Ct&&k&&typeof Ct.stack=="string")return[Ct.stack,k.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),_=c[0],E=c[1];if(_&&E){var L=_.split(`
`),q=E.split(`
`);for(l=s=0;s<L.length&&!L[s].includes("DetermineComponentFrameRoot");)s++;for(;l<q.length&&!q[l].includes("DetermineComponentFrameRoot");)l++;if(s===L.length||l===q.length)for(s=L.length-1,l=q.length-1;1<=s&&0<=l&&L[s]!==q[l];)l--;for(;1<=s&&0<=l;s--,l--)if(L[s]!==q[l]){if(s!==1||l!==1)do if(s--,l--,0>l||L[s]!==q[l]){var et=`
`+L[s].replace(" at new "," at ");return t.displayName&&et.includes("<anonymous>")&&(et=et.replace("<anonymous>",t.displayName)),et}while(1<=s&&0<=l);break}}}finally{_e=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Pt(a):""}function Gt(t,n){switch(t.tag){case 26:case 27:case 5:return Pt(t.type);case 16:return Pt("Lazy");case 13:return t.child!==n&&n!==null?Pt("Suspense Fallback"):Pt("Suspense");case 19:return Pt("SuspenseList");case 0:case 15:return xt(t.type,!1);case 11:return xt(t.type.render,!1);case 1:return xt(t.type,!0);case 31:return Pt("Activity");case 30:return Pt("ViewTransition");default:return""}}function Qt(t){try{var n="",a=null;do n+=Gt(t,a),a=t,t=t.return;while(t);return n}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var te=Object.prototype.hasOwnProperty,Ft=o.unstable_scheduleCallback,pe=o.unstable_cancelCallback,oe=o.unstable_shouldYield,Ie=o.unstable_requestPaint,X=o.unstable_now,Lt=o.unstable_getCurrentPriorityLevel,lt=o.unstable_ImmediatePriority,_t=o.unstable_UserBlockingPriority,Ot=o.unstable_NormalPriority,zt=o.unstable_LowPriority,re=o.unstable_IdlePriority,Ke=o.log,yn=o.unstable_setDisableYieldValue,Ae=null,We=null;function Sn(t){if(typeof Ke=="function"&&yn(t),We&&typeof We.setStrictMode=="function")try{We.setStrictMode(Ae,t)}catch{}}var Pn=Math.clz32?Math.clz32:Lo,Bl=Math.log,ia=Math.LN2;function Lo(t){return t>>>=0,t===0?32:31-(Bl(t)/ia|0)|0}var Ss=256,Ms=262144,aa=4194304;function Hi(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function sa(t,n,a){var s=t.pendingLanes;if(s===0)return 0;var l=0,c=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var E=s&134217727;return E!==0?(s=E&~c,s!==0?l=Hi(s):(_&=E,_!==0?l=Hi(_):a||(a=E&~t,a!==0&&(l=Hi(a))))):(E=s&~c,E!==0?l=Hi(E):_!==0?l=Hi(_):a||(a=s&~t,a!==0&&(l=Hi(a)))),l===0?0:n!==0&&n!==l&&(n&c)===0&&(c=l&-l,a=n&-n,c>=a||c===32&&(a&4194048)!==0)?n:l}function La(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Oo(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var s=31-Pn(a),l=1<<s;n|=t[s],a&=~l}return n}function Xc(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Fl(){var t=aa;return aa<<=1,(aa&62914560)===0&&(aa=4194304),t}function Po(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function xs(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function kc(t,n,a,s,l,c){var _=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,L=t.expirationTimes,q=t.hiddenUpdates;for(a=_&~a;0<a;){var et=31-Pn(a),ft=1<<et;E[et]=0,L[et]=-1;var k=q[et];if(k!==null)for(q[et]=null,et=0;et<k.length;et++){var $=k[et];$!==null&&($.lane&=-536870913)}a&=~ft}s!==0&&Hl(t,s,0),c!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=c&~(_&~n))}function Hl(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var s=31-Pn(n);t.entangledLanes|=n,t.entanglements[s]=t.entanglements[s]|1073741824|a&261930}function R(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var s=31-Pn(a),l=1<<s;l&n|t[s]&n&&(t[s]|=n),a&=~l}}function j(t,n){var a=n&-n;return a=(a&42)!==0?1:at(a),(a&(t.suspendedLanes|n))!==0?0:a}function at(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function rt(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function K(){var t=It.p;return t!==0?t:(t=window.event,t===void 0?32:Q0(t.type))}function Mt(t,n){var a=It.p;try{return It.p=t,n()}finally{It.p=a}}var bt=Math.random().toString(36).slice(2),Et="__reactFiber$"+bt,Dt="__reactProps$"+bt,Jt="__reactContainer$"+bt,ne="__reactEvents$"+bt,Zt="__reactListeners$"+bt,Re="__reactHandles$"+bt,we="__reactResources$"+bt,ke="__reactMarker$"+bt,Ge="__reactLoad$"+bt;function ve(t){delete t[Et],delete t[Dt],delete t[Zt],delete t[Re]}function qt(t){var n;if(n=t[Et])return n;for(var a=t.parentNode;a;){if(n=a[Jt]||a[Et]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=U0(t);t!==null;){if(a=t[Et])return a;t=U0(t)}return n}t=a,a=t.parentNode}return null}function Qe(t){if(t=t[Et]||t[Jt]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function xe(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function Mn(t){var n=t[we];return n||(n=t[we]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function je(t){t[ke]=!0}function zn(t){t[Ge]=void 0}var Oa=new Set,Ve={};function sn(t,n){pn(t,n),pn(t+"Capture",n)}function pn(t,n){for(Ve[t]=n,t=0;t<n.length;t++)Oa.add(n[t])}var An=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Rn={},fr={};function ra(t){return te.call(fr,t)?!0:te.call(Rn,t)?!1:An.test(t)?fr[t]=!0:(Rn[t]=!0,!1)}var De=!1;function $p(){var t=De;return De=!1,t}function Gl(t,n,a){if(ra(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function Vl(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function oa(t,n,a,s){if(s===null)t.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,s)}}function ni(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function tm(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function $y(t,n,a){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var l=s.get,c=s.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return l.call(this)},set:function(_){a=""+_,c.call(this,_)}}),Object.defineProperty(t,n,{enumerable:s.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Yc(t){if(!t._valueTracker){var n=tm(t)?"checked":"value";t._valueTracker=$y(t,n,""+t[n])}}function em(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),s="";return t&&(s=tm(t)?t.checked?"true":"false":t.value),t=s,t!==a?(n.setValue(t),!0):!1}var tS=/[\n"\\]/g;function mi(t){return t.replace(tS,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function qc(t,n,a,s,l,c,_,E){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),n!=null?_==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ni(n)):t.value!==""+ni(n)&&(t.value=""+ni(n)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),n!=null?_==="number"&&t.value==n?Wc(t,ni(t.value)):Wc(t,ni(n)):a!=null?Wc(t,ni(a)):s!=null&&t.removeAttribute("value"),l==null&&c!=null&&(t.defaultChecked=!!c),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+ni(E):t.removeAttribute("name")}function nm(t,n,a,s,l,c,_,E){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),n!=null||a!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){Yc(t);return}a=a!=null?""+ni(a):"",n=n!=null?""+ni(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}s=s??l,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=E?t.checked:!!s,t.defaultChecked=!!s,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),Yc(t)}function Wc(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function hr(t,n,a,s){if(t=t.options,n){n={};for(var l=0;l<a.length;l++)n["$"+a[l]]=!0;for(a=0;a<t.length;a++)l=n.hasOwnProperty("$"+t[a].value),t[a].selected!==l&&(t[a].selected=l),l&&s&&(t[a].defaultSelected=!0)}else{for(a=""+ni(a),n=null,l=0;l<t.length;l++){if(t[l].value===a){t[l].selected=!0,s&&(t[l].defaultSelected=!0);return}n!==null||t[l].disabled||(n=t[l])}n!==null&&(n.selected=!0)}}function im(t,n,a){if(n!=null&&(n=""+ni(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ni(a):""}function am(t,n,a,s){if(n==null){if(s!=null){if(a!=null)throw Error(r(92));if(wt(s)){if(1<s.length)throw Error(r(93));s=s[0]}a=s}a==null&&(a=""),n=a}a=ni(n),t.defaultValue=a,s=t.textContent,s===a&&s!==""&&s!==null&&(t.value=s),Yc(t)}function dr(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var eS=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function sm(t,n,a){var s=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?s?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":s?t.setProperty(n,a):typeof a!="number"||a===0||eS.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function rm(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var s in a)!a.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="",De=!0);for(var l in n)s=n[l],n.hasOwnProperty(l)&&a[l]!==s&&(sm(t,l,s),De=!0)}else for(var c in n)n.hasOwnProperty(c)&&sm(t,c,n[c])}function jc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var nS=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),iS=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xl(t){return iS.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Gi(){}var Zc=null;function Kc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var pr=null,mr=null;function om(t){var n=Qe(t);if(n&&(t=n.stateNode)){var a=t[Dt]||null;t:switch(t=n.stateNode,n.type){case"input":if(qc(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+mi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var s=a[n];if(s!==t&&s.form===t.form){var l=s[Dt]||null;if(!l)throw Error(r(90));qc(s,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(n=0;n<a.length;n++)s=a[n],s.form===t.form&&em(s)}break t;case"textarea":im(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&hr(t,!!a.multiple,n,!1)}}}var Qc=!1;function lm(t,n,a){if(Qc)return t(n,a);Qc=!0;try{var s=t(n);return s}finally{if(Qc=!1,(pr!==null||mr!==null)&&(Xu(),pr&&(n=pr,t=mr,mr=pr=null,om(n),t)))for(n=0;n<t.length;n++)om(t[n])}}function zo(t,n){var a=t.stateNode;if(a===null)return null;var s=a[Dt]||null;if(s===null)return null;a=s[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var la=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Jc=!1;if(la)try{var Io={};Object.defineProperty(Io,"passive",{get:function(){Jc=!0}}),window.addEventListener("test",Io,Io),window.removeEventListener("test",Io,Io)}catch{Jc=!1}var Pa=null,$c=null,kl=null;function um(){if(kl)return kl;var t,n=$c,a=n.length,s,l="value"in Pa?Pa.value:Pa.textContent,c=l.length;for(t=0;t<a&&n[t]===l[t];t++);var _=a-t;for(s=1;s<=_&&n[a-s]===l[c-s];s++);return kl=l.slice(t,1<s?1-s:void 0)}function Yl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function ql(){return!0}function cm(){return!1}function Hn(t){function n(a,s,l,c,_){this._reactName=a,this._targetInst=l,this.type=s,this.nativeEvent=c,this.target=_,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(c):c[E]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?ql:cm,this.isPropagationStopped=cm,this}return O(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ql)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ql)},persist:function(){},isPersistent:ql}),n}var za={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wl=Hn(za),Bo=O({},za,{view:0,detail:0}),aS=Hn(Bo),tf,ef,Fo,jl=O({},Bo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:af,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Fo&&(Fo&&t.type==="mousemove"?(tf=t.screenX-Fo.screenX,ef=t.screenY-Fo.screenY):ef=tf=0,Fo=t),tf)},movementY:function(t){return"movementY"in t?t.movementY:ef}}),fm=Hn(jl),sS=O({},jl,{dataTransfer:0}),rS=Hn(sS),oS=O({},Bo,{relatedTarget:0}),nf=Hn(oS),lS=O({},za,{animationName:0,elapsedTime:0,pseudoElement:0}),uS=Hn(lS),cS=O({},za,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),fS=Hn(cS),hS=O({},za,{data:0}),hm=Hn(hS),dS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},pS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gS(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=mS[t])?!!n[t]:!1}function af(){return gS}var _S=O({},Bo,{key:function(t){if(t.key){var n=dS[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Yl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?pS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:af,charCode:function(t){return t.type==="keypress"?Yl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Yl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),vS=Hn(_S),yS=O({},jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dm=Hn(yS),SS=O({},za,{submitter:0}),MS=Hn(SS),xS=O({},Bo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:af}),ES=Hn(xS),TS=O({},za,{propertyName:0,elapsedTime:0,pseudoElement:0}),bS=Hn(TS),AS=O({},jl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),RS=Hn(AS),CS=O({},za,{newState:0,oldState:0,source:0}),wS=Hn(CS),DS=[9,13,27,32],sf=la&&"CompositionEvent"in window,Ho=null;la&&"documentMode"in document&&(Ho=document.documentMode);var US=la&&"TextEvent"in window&&!Ho,pm=la&&(!sf||Ho&&8<Ho&&11>=Ho),mm=" ",gm=!1;function _m(t,n){switch(t){case"keyup":return DS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var gr=!1;function NS(t,n){switch(t){case"compositionend":return vm(n);case"keypress":return n.which!==32?null:(gm=!0,mm);case"textInput":return t=n.data,t===mm&&gm?null:t;default:return null}}function LS(t,n){if(gr)return t==="compositionend"||!sf&&_m(t,n)?(t=um(),kl=$c=Pa=null,gr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return pm&&n.locale!=="ko"?null:n.data;default:return null}}var OS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ym(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!OS[t.type]:n==="textarea"}function Sm(t,n,a,s){pr?mr?mr.push(s):mr=[s]:pr=s,n=Zu(n,"onChange"),0<n.length&&(a=new Wl("onChange","change",null,a,s),t.push({event:a,listeners:n}))}var Go=null,Vo=null;function PS(t){o0(t,0)}function Zl(t){var n=xe(t);if(em(n))return t}function Mm(t,n){if(t==="change")return n}var xm=!1;if(la){var rf;if(la){var of="oninput"in document;if(!of){var Em=document.createElement("div");Em.setAttribute("oninput","return;"),of=typeof Em.oninput=="function"}rf=of}else rf=!1;xm=rf&&(!document.documentMode||9<document.documentMode)}function Tm(){Go&&(Go.detachEvent("onpropertychange",bm),Vo=Go=null)}function bm(t){if(t.propertyName==="value"&&Zl(Vo)){var n=[];Sm(n,Vo,t,Kc(t)),lm(PS,n)}}function zS(t,n,a){t==="focusin"?(Tm(),Go=n,Vo=a,Go.attachEvent("onpropertychange",bm)):t==="focusout"&&Tm()}function IS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Zl(Vo)}function BS(t,n){if(t==="click")return Zl(n)}function FS(t,n){if(t==="input"||t==="change")return Zl(n)}function HS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ii=typeof Object.is=="function"?Object.is:HS;function Xo(t,n){if(ii(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),s=Object.keys(n);if(a.length!==s.length)return!1;for(s=0;s<a.length;s++){var l=a[s];if(!te.call(n,l)||!ii(t[l],n[l]))return!1}return!0}function lf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Am(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Rm(t,n){var a=Am(t);t=0;for(var s;a;){if(a.nodeType===3){if(s=t+a.textContent.length,t<=n&&s>=n)return{node:a,offset:n-t};t=s}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Am(a)}}function Cm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Cm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function wm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=lf(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=lf(t.document)}return n}function uf(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var GS=la&&"documentMode"in document&&11>=document.documentMode,_r=null,cf=null,ko=null,ff=!1;function Dm(t,n,a){var s=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ff||_r==null||_r!==lf(s)||(s=_r,"selectionStart"in s&&uf(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),ko&&Xo(ko,s)||(ko=s,s=Zu(cf,"onSelect"),0<s.length&&(n=new Wl("onSelect","select",null,n,a),t.push({event:n,listeners:s}),n.target=_r)))}function Es(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var vr={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},hf={},Um={};la&&(Um=document.createElement("div").style,"AnimationEvent"in window||(delete vr.animationend.animation,delete vr.animationiteration.animation,delete vr.animationstart.animation),"TransitionEvent"in window||delete vr.transitionend.transition);function Ts(t){if(hf[t])return hf[t];if(!vr[t])return t;var n=vr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Um)return hf[t]=n[a];return t}var Nm=Ts("animationend"),Lm=Ts("animationiteration"),Om=Ts("animationstart"),VS=Ts("transitionrun"),XS=Ts("transitionstart"),kS=Ts("transitioncancel"),Pm=Ts("transitionend"),zm=new Map,df="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");df.push("scrollEnd");function Ri(t,n){zm.set(t,n),sn(n,[t])}var YS=0;function ua(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Ui.identifierPrefix;var a=YS++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Im(t){if(t==null||typeof t=="string")return t;var n=null,a=Br;if(a!==null)for(var s=0;s<a.length;s++){var l=t[a[s]];if(l!=null){if(l==="none")return"none";n=n==null?l:n+(" "+l)}}return n??t.default}function ca(t,n){return t=Im(t),n=Im(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Kl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},gi=[],yr=0,pf=0;function Ql(){for(var t=yr,n=pf=yr=0;n<t;){var a=gi[n];gi[n++]=null;var s=gi[n];gi[n++]=null;var l=gi[n];gi[n++]=null;var c=gi[n];if(gi[n++]=null,s!==null&&l!==null){var _=s.pending;_===null?l.next=l:(l.next=_.next,_.next=l),s.pending=l}c!==0&&Bm(a,l,c)}}function Jl(t,n,a,s){gi[yr++]=t,gi[yr++]=n,gi[yr++]=a,gi[yr++]=s,pf|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function mf(t,n,a,s){return Jl(t,n,a,s),$l(t)}function bs(t,n){return Jl(t,null,null,n),$l(t)}function Bm(t,n,a){t.lanes|=a;var s=t.alternate;s!==null&&(s.lanes|=a);for(var l=!1,c=t.return;c!==null;)c.childLanes|=a,s=c.alternate,s!==null&&(s.childLanes|=a),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(l=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,l&&n!==null&&(l=31-Pn(a),t=c.hiddenUpdates,s=t[l],s===null?t[l]=[n]:s.push(n),n.lane=a|536870912),c):null}function $l(t){if(50<hl)throw hl=0,Vu=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Sr={};function qS(t,n,a,s){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wn(t,n,a,s){return new qS(t,n,a,s)}function gf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function fa(t,n){var a=t.alternate;return a===null?(a=Wn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Fm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function tu(t,n,a,s,l,c){var _=0;if(s=t,typeof s=="function")gf(s)&&(_=1);else if(typeof s=="string")_=Sx(t,a,Me.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(s){case Ht:return t=Wn(31,a,n,l),t.elementType=Ht,t.lanes=c,t;case B:return As(a.children,l,c,n);case ot:_=8,l|=24;break;case it:return t=Wn(12,a,n,l|2),t.elementType=it,t.lanes=c,t;case st:return t=Wn(13,a,n,l),t.elementType=st,t.lanes=c,t;case Q:return t=Wn(19,a,n,l),t.elementType=Q,t.lanes=c,t;case ee:case C:return t=l|32,t=Wn(30,a,n,t),t.elementType=C,t.lanes=c,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case ht:_=10;break t;case pt:_=9;break t;case W:_=11;break t;case yt:_=14;break t;case St:_=16,s=null;break t}_=29,a=Error(r(130,t===null?"null":typeof t,"")),s=null}return n=Wn(_,a,n,l),n.elementType=t,n.type=s,n.lanes=c,n}function As(t,n,a,s){return t=Wn(7,t,s,n),t.lanes=a,t}function _f(t,n,a){return t=Wn(6,t,null,n),t.lanes=a,t}function Hm(t){var n=Wn(18,null,null,0);return n.stateNode=t,n}function vf(t,n,a){return n=Wn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Gm=new WeakMap;function _i(t,n){if(typeof t=="object"&&t!==null){var a=Gm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Qt(n)},Gm.set(t,n),n)}return{value:t,source:n,stack:Qt(n)}}var Mr=[],xr=0,eu=null,Yo=0,vi=[],yi=0,Ia=null,Vi=1,Xi="";function ha(t,n){Mr[xr++]=Yo,Mr[xr++]=eu,eu=t,Yo=n}function Vm(t,n,a){vi[yi++]=Vi,vi[yi++]=Xi,vi[yi++]=Ia,Ia=t;var s=Vi;t=Xi;var l=32-Pn(s)-1;s&=~(1<<l),a+=1;var c=32-Pn(n)+l;if(30<c){var _=l-l%5;c=(s&(1<<_)-1).toString(32),s>>=_,l-=_,Vi=1<<32-Pn(n)+l|a<<l|s,Xi=c+t}else Vi=1<<c|a<<l|s,Xi=t}function nu(t){t.return!==null&&(ha(t,1),Vm(t,1,0))}function yf(t){for(;t===eu;)eu=Mr[--xr],Mr[xr]=null,Yo=Mr[--xr],Mr[xr]=null;for(;t===Ia;)Ia=vi[--yi],vi[yi]=null,Xi=vi[--yi],vi[yi]=null,Vi=vi[--yi],vi[yi]=null}function Xm(t,n){vi[yi++]=Vi,vi[yi++]=Xi,vi[yi++]=Ia,Vi=n.id,Xi=n.overflow,Ia=t}var xn=null,Ye=null,de=!1,Ba=null,Si=!1,Sf=Error(r(519));function Fa(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw qo(_i(n,t)),Sf}function km(t){var n=t.stateNode,a=t.type,s=t.memoizedProps;switch(n[Et]=t,n[Dt]=s,a){case"dialog":Se("cancel",n),Se("close",n);break;case"iframe":case"object":case"embed":Se("load",n);break;case"video":case"audio":for(a=0;a<pl.length;a++)Se(pl[a],n);break;case"source":Se("error",n);break;case"img":case"image":case"link":Se("error",n),Se("load",n);break;case"details":Se("toggle",n);break;case"input":Se("invalid",n),nm(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":Se("invalid",n);break;case"textarea":Se("invalid",n),am(n,s.value,s.defaultValue,s.children)}a=s.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||s.suppressHydrationWarning===!0||f0(n.textContent,a)?(s.popover!=null&&(Se("beforetoggle",n),Se("toggle",n)),s.onScroll!=null&&Se("scroll",n),s.onScrollEnd!=null&&Se("scrollend",n),s.onClick!=null&&(n.onclick=Gi),n=!0):n=!1,n||Fa(t,!0)}function iu(t){for(xn=t.return;xn;)switch(xn.tag){case 5:case 31:case 13:Si=!1;return;case 27:case 3:Si=!0;return;default:xn=xn.return}}function Er(t){if(t!==xn)return!1;if(!de)return iu(t),de=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Kh(t.type,t.memoizedProps)),a=!a),a&&Ye&&Fa(t),iu(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ye=D0(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ye=D0(t)}else n===27?(n=Ye,es(t.type)?(t=sd,sd=null,Ye=t):Ye=n):Ye=xn?xi(t.stateNode.nextSibling):null;return!0}function Rs(){Ye=xn=null,de=!1}function Mf(){var t=Ba;return t!==null&&(Kn===null?Kn=t:Kn.push.apply(Kn,t),Ba=null),t}function qo(t){Ba===null?Ba=[t]:Ba.push(t)}var xf=ae(null),Cs=null,da=null;function Ha(t,n,a){Rt(xf,n._currentValue),n._currentValue=a}function pa(t){t._currentValue=xf.current,Kt(xf)}function au(t,n,a){for(;t!==null;){var s=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),t===a)break;t=t.return}}function Ef(t,n,a,s){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var c=l.dependencies;if(c!==null){var _=l.child;c=c.firstContext;t:for(;c!==null;){var E=c;c=l;for(var L=0;L<n.length;L++)if(E.context===n[L]){c.lanes|=a,E=c.alternate,E!==null&&(E.lanes|=a),au(c.return,a,t),s||(_=null);break t}c=E.next}}else if(l.tag===18){if(_=l.return,_===null)throw Error(r(341));_.lanes|=a,c=_.alternate,c!==null&&(c.lanes|=a),au(_,a,t),_=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=a,_=l.alternate,_!==null&&(_.lanes|=a),au(l.return,a,t),_=l.child,_=_!==null?_.sibling:null):_=l.child;if(_!==null)_.return=l;else for(_=l;_!==null;){if(_===t){_=null;break}if(l=_.sibling,l!==null){l.return=_.return,_=l;break}_=_.return}l=_}}function ws(t,n,a,s){t=null;for(var l=n,c=!1;l!==null;){if(!c){if((l.flags&524288)!==0)c=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var _=l.alternate;if(_===null)throw Error(r(387));if(_=_.memoizedProps,_!==null){var E=l.type;ii(l.pendingProps.value,_.value)||(t!==null?t.push(E):t=[E])}}else if(l===T.current){if(_=l.alternate,_===null)throw Error(r(387));_.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(jr):t=[jr])}l=l.return}return t!==null&&Ef(n,t,a,s),n.flags|=262144,t!==null}function su(t){for(t=t.firstContext;t!==null;){if(!ii(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ds(t){Cs=t,da=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Cn(t){return Ym(Cs,t)}function ru(t,n){return Cs===null&&Ds(t),Ym(t,n)}function Ym(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},da===null){if(t===null)throw Error(r(308));da=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else da=da.next=n;return a}var WS=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,s){t.push(s)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},jS=o.unstable_scheduleCallback,ZS=o.unstable_NormalPriority,rn={$$typeof:ht,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Tf(){return{controller:new WS,data:new Map,refCount:0}}function Wo(t){t.refCount--,t.refCount===0&&jS(ZS,function(){t.controller.abort()})}function qm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var s=n[t];a.indexOf(s)===-1&&a.push(s)}}}var jo=null;function KS(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Zo=null,bf=0,Us=0,Tr=null;function QS(t,n){if(Zo===null){var a=Zo=[];bf=0,Us=Gh(),Tr={status:"pending",value:void 0,then:function(s){a.push(s)}}}return bf++,n.then(Wm,Wm),n}function Wm(){if(--bf===0&&(jo=null,Zo!==null)){Tr!==null&&(Tr.status="fulfilled");var t=Zo;Zo=null,Us=0,Tr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function JS(t,n){var a=[],s={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return t.then(function(){s.status="fulfilled",s.value=n;for(var l=0;l<a.length;l++)(0,a[l])(n)},function(l){for(s.status="rejected",s.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),s}var jm=At.S;At.S=function(t,n){if(H_=X(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&QS(t,n),jo!==null)for(var a=Vr;a!==null;)qm(a,jo),a=a.next;if(a=t.types,a!==null){for(var s=Vr;s!==null;)qm(s,a),s=s.next;if(Us!==0){s=jo,s===null&&(s=jo=[]);for(var l=0;l<a.length;l++){var c=a[l];s.indexOf(c)===-1&&s.push(c)}}}jm!==null&&jm(t,n)};var Ns=ae(null);function Af(){var t=Ns.current;return t!==null?t:Xe.pooledCache}function ou(t,n){n===null?Rt(Ns,Ns.current):Rt(Ns,n.pool)}function Zm(){var t=Af();return t===null?null:{parent:rn._currentValue,pool:t}}var br=Error(r(460)),Rf=Error(r(474)),lu=Error(r(542)),uu={then:function(){}};function Km(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Qm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Gi,Gi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,$m(t),t===void 0&&!("reason"in n)?Error(r(600)):t;default:if(typeof n.status=="string")n.then(Gi,Gi);else{if(t=Xe,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(s){if(n.status==="pending"){var l=n;l.status="fulfilled",l.value=s}},function(s){if(n.status==="pending"){var l=n;l.status="rejected",l.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,$m(t),t}throw Os=n,br}}function Ls(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Os=a,br):a}}var Os=null;function Jm(){if(Os===null)throw Error(r(459));var t=Os;return Os=null,t}function $m(t){if(t===br||t===lu)throw Error(r(483))}var Ar=null,Ko=0;function cu(t){var n=Ko;return Ko+=1,Ar===null&&(Ar=[]),Qm(Ar,t,n)}function Ga(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function fu(t,n){throw n.$$typeof===I?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function tg(t){function n(Y,F){if(t){var J=Y.deletions;J===null?(Y.deletions=[F],Y.flags|=16):J.push(F)}}function a(Y,F){if(!t)return null;for(;F!==null;)n(Y,F),F=F.sibling;return null}function s(Y){for(var F=new Map;Y!==null;)Y.key===null?F.set(Y.index,Y):F.set(Y.key,Y),Y=Y.sibling;return F}function l(Y,F){return Y=fa(Y,F),Y.index=0,Y.sibling=null,Y}function c(Y,F,J){return Y.index=J,t?(J=Y.alternate,J!==null?(J=J.index,J<F?(Y.flags|=2,F):J):(Y.flags|=134217730,F)):(Y.flags|=1048576,F)}function _(Y){return t&&Y.alternate===null&&(Y.flags|=134217730),Y}function E(Y,F,J,ct){return F===null||F.tag!==6?(F=_f(J,Y.mode,ct),F.return=Y,F):(F=l(F,J),F.return=Y,F)}function L(Y,F,J,ct){var Bt=J.type;return Bt===B?(Y=et(Y,F,J.props.children,ct,J.key),Ga(Y,J),Y):F!==null&&(F.elementType===Bt||typeof Bt=="object"&&Bt!==null&&Bt.$$typeof===St&&Ls(Bt)===F.type)?(F=l(F,J.props),Ga(F,J),F.return=Y,F):(F=tu(J.type,J.key,J.props,null,Y.mode,ct),Ga(F,J),F.return=Y,F)}function q(Y,F,J,ct){return F===null||F.tag!==4||F.stateNode.containerInfo!==J.containerInfo||F.stateNode.implementation!==J.implementation?(F=vf(J,Y.mode,ct),F.return=Y,F):(F=l(F,J.children||[]),F.return=Y,F)}function et(Y,F,J,ct,Bt){return F===null||F.tag!==7?(F=As(J,Y.mode,ct,Bt),F.return=Y,F):(F=l(F,J),F.return=Y,F)}function ft(Y,F,J){if(typeof F=="string"&&F!==""||typeof F=="number"||typeof F=="bigint")return F=_f(""+F,Y.mode,J),F.return=Y,F;if(typeof F=="object"&&F!==null){switch(F.$$typeof){case D:return J=tu(F.type,F.key,F.props,null,Y.mode,J),Ga(J,F),J.return=Y,J;case A:return F=vf(F,Y.mode,J),F.return=Y,F;case St:return F=Ls(F),ft(Y,F,J)}if(wt(F)||ut(F))return F=As(F,Y.mode,J,null),F.return=Y,F;if(typeof F.then=="function")return ft(Y,cu(F),J);if(F.$$typeof===ht)return ft(Y,ru(Y,F),J);fu(Y,F)}return null}function k(Y,F,J,ct){var Bt=F!==null?F.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Bt!==null?null:E(Y,F,""+J,ct);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case D:return J.key===Bt?L(Y,F,J,ct):null;case A:return J.key===Bt?q(Y,F,J,ct):null;case St:return J=Ls(J),k(Y,F,J,ct)}if(wt(J)||ut(J))return Bt!==null?null:et(Y,F,J,ct,null);if(typeof J.then=="function")return k(Y,F,cu(J),ct);if(J.$$typeof===ht)return k(Y,F,ru(Y,J),ct);fu(Y,J)}return null}function $(Y,F,J,ct,Bt){if(typeof ct=="string"&&ct!==""||typeof ct=="number"||typeof ct=="bigint")return Y=Y.get(J)||null,E(F,Y,""+ct,Bt);if(typeof ct=="object"&&ct!==null){switch(ct.$$typeof){case D:return Y=Y.get(ct.key===null?J:ct.key)||null,L(F,Y,ct,Bt);case A:return Y=Y.get(ct.key===null?J:ct.key)||null,q(F,Y,ct,Bt);case St:return ct=Ls(ct),$(Y,F,J,ct,Bt)}if(wt(ct)||ut(ct))return Y=Y.get(J)||null,et(F,Y,ct,Bt,null);if(typeof ct.then=="function")return $(Y,F,J,cu(ct),Bt);if(ct.$$typeof===ht)return $(Y,F,J,ru(F,ct),Bt);fu(F,ct)}return null}function Ct(Y,F,J,ct){for(var Bt=null,Te=null,jt=F,$t=F=0,un=null;jt!==null&&$t<J.length;$t++){jt.index>$t?(un=jt,jt=null):un=jt.sibling;var Ce=k(Y,jt,J[$t],ct);if(Ce===null){jt===null&&(jt=un);break}t&&jt&&Ce.alternate===null&&n(Y,jt),F=c(Ce,F,$t),Te===null?Bt=Ce:Te.sibling=Ce,Te=Ce,jt=un}if($t===J.length)return a(Y,jt),de&&ha(Y,$t),Bt;if(jt===null){for(;$t<J.length;$t++)jt=ft(Y,J[$t],ct),jt!==null&&(F=c(jt,F,$t),Te===null?Bt=jt:Te.sibling=jt,Te=jt);return de&&ha(Y,$t),Bt}for(jt=s(jt);$t<J.length;$t++)un=$(jt,Y,$t,J[$t],ct),un!==null&&(t&&(Ce=un.alternate,Ce!==null&&jt.delete(Ce.key===null?$t:Ce.key)),F=c(un,F,$t),Te===null?Bt=un:Te.sibling=un,Te=un);return t&&jt.forEach(function(rs){return n(Y,rs)}),de&&ha(Y,$t),Bt}function Xt(Y,F,J,ct){if(J==null)throw Error(r(151));for(var Bt=null,Te=null,jt=F,$t=F=0,un=null,Ce=J.next();jt!==null&&!Ce.done;$t++,Ce=J.next()){jt.index>$t?(un=jt,jt=null):un=jt.sibling;var rs=k(Y,jt,Ce.value,ct);if(rs===null){jt===null&&(jt=un);break}t&&jt&&rs.alternate===null&&n(Y,jt),F=c(rs,F,$t),Te===null?Bt=rs:Te.sibling=rs,Te=rs,jt=un}if(Ce.done)return a(Y,jt),de&&ha(Y,$t),Bt;if(jt===null){for(;!Ce.done;$t++,Ce=J.next())Ce=ft(Y,Ce.value,ct),Ce!==null&&(F=c(Ce,F,$t),Te===null?Bt=Ce:Te.sibling=Ce,Te=Ce);return de&&ha(Y,$t),Bt}for(jt=s(jt);!Ce.done;$t++,Ce=J.next())Ce=$(jt,Y,$t,Ce.value,ct),Ce!==null&&(t&&(un=Ce.alternate,un!==null&&jt.delete(un.key===null?$t:un.key)),F=c(Ce,F,$t),Te===null?Bt=Ce:Te.sibling=Ce,Te=Ce);return t&&jt.forEach(function(Nx){return n(Y,Nx)}),de&&ha(Y,$t),Bt}function ue(Y,F,J,ct){if(typeof J=="object"&&J!==null&&J.type===B&&J.key===null&&J.props.ref===void 0&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case D:t:{for(var Bt=J.key;F!==null;){if(F.key===Bt){if(Bt=J.type,Bt===B){if(F.tag===7){a(Y,F.sibling),ct=l(F,J.props.children),Ga(ct,J),ct.return=Y,Y=ct;break t}}else if(F.elementType===Bt||typeof Bt=="object"&&Bt!==null&&Bt.$$typeof===St&&Ls(Bt)===F.type){a(Y,F.sibling),ct=l(F,J.props),Ga(ct,J),ct.return=Y,Y=ct;break t}a(Y,F);break}else n(Y,F);F=F.sibling}J.type===B?(ct=As(J.props.children,Y.mode,ct,J.key),Ga(ct,J),ct.return=Y,Y=ct):(ct=tu(J.type,J.key,J.props,null,Y.mode,ct),Ga(ct,J),ct.return=Y,Y=ct)}return _(Y);case A:t:{for(Bt=J.key;F!==null;){if(F.key===Bt)if(F.tag===4&&F.stateNode.containerInfo===J.containerInfo&&F.stateNode.implementation===J.implementation){a(Y,F.sibling),ct=l(F,J.children||[]),ct.return=Y,Y=ct;break t}else{a(Y,F);break}else n(Y,F);F=F.sibling}ct=vf(J,Y.mode,ct),ct.return=Y,Y=ct}return _(Y);case St:return J=Ls(J),ue(Y,F,J,ct)}if(wt(J))return Ct(Y,F,J,ct);if(ut(J)){if(Bt=ut(J),typeof Bt!="function")throw Error(r(150));return J=Bt.call(J),Xt(Y,F,J,ct)}if(typeof J.then=="function")return ue(Y,F,cu(J),ct);if(J.$$typeof===ht)return ue(Y,F,ru(Y,J),ct);fu(Y,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,F!==null&&F.tag===6?(a(Y,F.sibling),ct=l(F,J),ct.return=Y,Y=ct):(a(Y,F),ct=_f(J,Y.mode,ct),ct.return=Y,Y=ct),_(Y)):a(Y,F)}return function(Y,F,J,ct){try{Ko=0;var Bt=ue(Y,F,J,ct);return Ar=null,Bt}catch(jt){if(jt===br||jt===lu)throw jt;var Te=Wn(29,jt,null,Y.mode);return Te.lanes=ct,Te.return=Y,Te}finally{}}}var Ps=tg(!0),eg=tg(!1),Va=!1;function Cf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Xa(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ka(t,n,a){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(Ne&2)!==0){var l=s.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),s.pending=n,n=$l(t),Bm(t,null,a),n}return Jl(t,s,n,a),$l(t)}function Qo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,R(t,a)}}function Df(t,n){var a=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,a===s)){var l=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};c===null?l=c=_:c=c.next=_,a=a.next}while(a!==null);c===null?l=c=n:c=c.next=n}else l=c=n;a={baseState:s.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Uf=!1;function Jo(){if(Uf){var t=Tr;if(t!==null)throw t}}function $o(t,n,a,s){Uf=!1;var l=t.updateQueue;Va=!1;var c=l.firstBaseUpdate,_=l.lastBaseUpdate,E=l.shared.pending;if(E!==null){l.shared.pending=null;var L=E,q=L.next;L.next=null,_===null?c=q:_.next=q,_=L;var et=t.alternate;et!==null&&(et=et.updateQueue,E=et.lastBaseUpdate,E!==_&&(E===null?et.firstBaseUpdate=q:E.next=q,et.lastBaseUpdate=L))}if(c!==null){var ft=l.baseState;_=0,et=q=L=null,E=c;do{var k=E.lane&-536870913,$=k!==E.lane;if($?(Ee&k)===k:(s&k)===k){k!==0&&k===Us&&(Uf=!0),et!==null&&(et=et.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var Ct=t,Xt=E;k=n;var ue=a;switch(Xt.tag){case 1:if(Ct=Xt.payload,typeof Ct=="function"){ft=Ct.call(ue,ft,k);break t}ft=Ct;break t;case 3:Ct.flags=Ct.flags&-65537|128;case 0:if(Ct=Xt.payload,k=typeof Ct=="function"?Ct.call(ue,ft,k):Ct,k==null)break t;ft=O({},ft,k);break t;case 2:Va=!0}}k=E.callback,k!==null&&(t.flags|=64,$&&(t.flags|=8192),$=l.callbacks,$===null?l.callbacks=[k]:$.push(k))}else $={lane:k,tag:E.tag,payload:E.payload,callback:E.callback,next:null},et===null?(q=et=$,L=ft):et=et.next=$,_|=k;if(E=E.next,E===null){if(E=l.shared.pending,E===null)break;$=E,E=$.next,$.next=null,l.lastBaseUpdate=$,l.shared.pending=null}}while(!0);et===null&&(L=ft),l.baseState=L,l.firstBaseUpdate=q,l.lastBaseUpdate=et,c===null&&(l.shared.lanes=0),Qa|=_,t.lanes=_,t.memoizedState=ft}}function ng(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function ig(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ng(a[t],n)}var Ya=ae(null),hu=ae(0);function ag(t,n){t=ya,Rt(hu,t),Rt(Ya,n),ya=t|n.baseLanes}function Nf(){Rt(hu,ya),Rt(Ya,Ya.current)}function Lf(){ya=hu.current,Kt(Ya),Kt(hu)}var wn=ae(null),In=null;function qa(t){var n=t.alternate;Rt(Dn,Dn.current&1),Rt(wn,t),In===null&&(n===null||Ya.current!==null||n.memoizedState!==null)&&(In=t)}function Of(t){Rt(Dn,Dn.current),Rt(wn,t),In===null&&(In=t)}function sg(t){t.tag===22?(Rt(Dn,Dn.current),Rt(wn,t),In===null&&(In=t)):Wa()}function Wa(){Rt(Dn,Dn.current),Rt(wn,wn.current)}function ai(t){Kt(wn),In===t&&(In=null),Kt(Dn)}var Dn=ae(0);function tl(t,n){Rt(wn,wn.current),Rt(Dn,n)}function Pf(t){Kt(Dn),Kt(wn),In===t&&(In=null)}function du(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||id(a)||ad(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ma=0,le=null,Be=null,on=null,pu=!1,Rr=!1,zs=!1,mu=0,el=0,Cr=null,$S=0;function tn(){throw Error(r(321))}function zf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ii(t[a],n[a]))return!1;return!0}function If(t,n,a,s,l,c){return ma=c,le=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,At.H=t===null||t.memoizedState===null?Vg:Xg,zs=!1,c=a(s,l),zs=!1,Rr&&(c=og(n,a,s,l)),rg(t),c}function rg(t){At.H=xu;var n=Be!==null&&Be.next!==null;if(ma=0,on=Be=le=null,pu=!1,el=0,Cr=null,n)throw Error(r(300));t===null||ln||(t=t.dependencies,t!==null&&su(t)&&(ln=!0))}function og(t,n,a,s){le=t;var l=0;do{if(Rr&&(Cr=null),el=0,Rr=!1,25<=l)throw Error(r(301));if(l+=1,on=Be=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}At.H=oM,c=n(a,s)}while(Rr);return c}function tM(){var t=At.H,n=t.useState()[0];return n=typeof n.then=="function"?nl(n):n,t=t.useState()[0],(Be!==null?Be.memoizedState:null)!==t&&(le.flags|=1024),n}function Bf(){var t=mu!==0;return mu=0,t}function Ff(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Hf(t){if(pu){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}pu=!1}ma=0,on=Be=le=null,Rr=!1,el=mu=0,Cr=null}function Gn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?le.memoizedState=on=t:on=on.next=t,on}function an(){if(Be===null){var t=le.alternate;t=t!==null?t.memoizedState:null}else t=Be.next;var n=on===null?le.memoizedState:on.next;if(n!==null)on=n,Be=t;else{if(t===null)throw le.alternate===null?Error(r(467)):Error(r(310));Be=t,t={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},on===null?le.memoizedState=on=t:on=on.next=t}return on}function gu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function nl(t){var n=el;return el+=1,Cr===null&&(Cr=[]),t=Qm(Cr,t,n),n=le,(on===null?n.memoizedState:on.next)===null&&(n=n.alternate,At.H=n===null||n.memoizedState===null?Vg:Xg),t}function _u(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return nl(t);if(t.$$typeof===Z)return;if(t.$$typeof===ht)return Cn(t)}throw Error(r(438,String(t)))}function Gf(t){var n=null,a=le.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var s=le.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(l){return l.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=gu(),le.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),s=0;s<t;s++)a[s]=be;return n.index++,a}function ga(t,n){return typeof n=="function"?n(t):n}function vu(t){var n=an();return Vf(n,Be,t)}function Vf(t,n,a){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=a;var l=t.baseQueue,c=s.pending;if(c!==null){if(l!==null){var _=l.next;l.next=c.next,c.next=_}n.baseQueue=l=c,s.pending=null}if(c=t.baseState,l===null)t.memoizedState=c;else{n=l.next;var E=_=null,L=null,q=n,et=!1;do{var ft=q.lane&-536870913;if(ft!==q.lane?(Ee&ft)===ft:(ma&ft)===ft){var k=q.revertLane;if(k===0)L!==null&&(L=L.next={lane:0,revertLane:0,gesture:null,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null}),ft===Us&&(et=!0);else if((ma&k)===k){q=q.next,k===Us&&(et=!0);continue}else ft={lane:0,revertLane:q.revertLane,gesture:null,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null},L===null?(E=L=ft,_=c):L=L.next=ft,le.lanes|=k,Qa|=k;ft=q.action,zs&&a(c,ft),c=q.hasEagerState?q.eagerState:a(c,ft)}else k={lane:ft,revertLane:q.revertLane,gesture:q.gesture,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null},L===null?(E=L=k,_=c):L=L.next=k,le.lanes|=ft,Qa|=ft;q=q.next}while(q!==null&&q!==n);if(L===null?_=c:L.next=E,!ii(c,t.memoizedState)&&(ln=!0,et&&(a=Tr,a!==null)))throw a;t.memoizedState=c,t.baseState=_,t.baseQueue=L,s.lastRenderedState=c}return l===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function Xf(t){var n=an(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var s=a.dispatch,l=a.pending,c=n.memoizedState;if(l!==null){a.pending=null;var _=l=l.next;do c=t(c,_.action),_=_.next;while(_!==l);ii(c,n.memoizedState)||(ln=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),a.lastRenderedState=c}return[c,s]}function lg(t,n,a){var s=le,l=an(),c=de;if(c){if(a===void 0)throw Error(r(407));a=a()}else a=n();var _=!ii((Be||l).memoizedState,a);if(_&&(l.memoizedState=a,ln=!0),l=l.queue,qf(fg.bind(null,s,l,t),[t]),t=l.getSnapshot!==n||_||on!==null&&(on.memoizedState.tag&1)!==0,wr(t?9:8,{destroy:void 0},cg.bind(null,s,l,a,n),null),t){if(s.flags|=2048,Xe===null)throw Error(r(349));c||(ma&127)!==0||ug(s,n,a)}return a}function ug(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=le.updateQueue,n===null?(n=gu(),le.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function cg(t,n,a,s){n.value=a,n.getSnapshot=s,hg(n)&&dg(t)}function fg(t,n,a){return a(function(){hg(n)&&dg(t)})}function hg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ii(t,a)}catch{return!0}}function dg(t){var n=bs(t,2);n!==null&&Qn(n,t,2)}function kf(t){var n=Gn();if(typeof t=="function"){var a=t;if(t=a(),zs){Sn(!0);try{a()}finally{Sn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:t},n}function pg(t,n,a,s){return t.baseState=a,Vf(t,Be,typeof s=="function"?s:ga)}function eM(t,n,a,s,l){if(Mu(t))throw Error(r(485));if(t=n.action,t!==null){var c={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){c.listeners.push(_)}};At.T!==null?a(!0):c.isTransition=!1,s(c),a=n.pending,a===null?(c.next=n.pending=c,mg(n,c)):(c.next=a.next,n.pending=a.next=c)}}function mg(t,n){var a=n.action,s=n.payload,l=t.state;if(n.isTransition){var c=At.T,_={};_.types=c!==null?c.types:null,At.T=_;try{var E=a(l,s),L=At.S;L!==null&&L(_,E),gg(t,n,E)}catch(q){Yf(t,n,q)}finally{c!==null&&_.types!==null&&(c.types=_.types),At.T=c}}else try{c=a(l,s),gg(t,n,c)}catch(q){Yf(t,n,q)}}function gg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(s){_g(t,n,s)},function(s){return Yf(t,n,s)}):_g(t,n,a)}function _g(t,n,a){n.status="fulfilled",n.value=a,vg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,mg(t,a)))}function Yf(t,n,a){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=a,vg(n),n=n.next;while(n!==s)}t.action=null}function vg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function yg(t,n){return n}function Sg(t,n){if(de){var a=Xe.formState;if(a!==null){t:{var s=le;if(de){if(Ye){e:{for(var l=Ye,c=Si;l.nodeType!==8;){if(!c){l=null;break e}if(l=xi(l.nextSibling),l===null){l=null;break e}}c=l.data,l=c==="F!"||c==="F"?l:null}if(l){Ye=xi(l.nextSibling),s=l.data==="F!";break t}}Fa(s)}s=!1}s&&(n=a[0])}}return a=Gn(),a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:yg,lastRenderedState:n},a.queue=s,a=Fg.bind(null,le,s),s.dispatch=a,s=kf(!1),c=Qf.bind(null,le,!1,s.queue),s=Gn(),l={state:n,dispatch:null,action:t,pending:null},s.queue=l,a=eM.bind(null,le,l,c,a),l.dispatch=a,s.memoizedState=t,[n,a,!1]}function Mg(t){var n=an();return xg(n,Be,t)}function xg(t,n,a){if(n=Vf(t,n,yg)[0],t=vu(ga)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var s=nl(n)}catch(_){throw _===br?lu:_}else s=n;n=an();var l=n.queue,c=l.dispatch;return a!==n.memoizedState&&(le.flags|=2048,wr(9,{destroy:void 0},nM.bind(null,l,a),null)),[s,c,t]}function nM(t,n){t.action=n}function Eg(t){var n=an(),a=Be;if(a!==null)return xg(n,a,t);an(),n=n.memoizedState,a=an();var s=a.queue.dispatch;return a.memoizedState=t,[n,s,!1]}function wr(t,n,a,s){return t={tag:t,create:a,deps:s,inst:n,next:null},n=le.updateQueue,n===null&&(n=gu(),le.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(s=a.next,a.next=t,t.next=s,n.lastEffect=t),t}function Tg(){return an().memoizedState}function yu(t,n,a,s){var l=Gn();le.flags|=t,l.memoizedState=wr(1|n,{destroy:void 0},a,s===void 0?null:s)}function Su(t,n,a,s){var l=an();s=s===void 0?null:s;var c=l.memoizedState.inst;Be!==null&&s!==null&&zf(s,Be.memoizedState.deps)?l.memoizedState=wr(n,c,a,s):(le.flags|=t,l.memoizedState=wr(1|n,c,a,s))}function bg(t,n){yu(8390656,8,t,n)}function qf(t,n){Su(2048,8,t,n)}function iM(t){le.flags|=4;var n=le.updateQueue;if(n===null)n=gu(),le.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Ag(t){var n=an().memoizedState;return iM({ref:n,nextImpl:t}),function(){if((Ne&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Rg(t,n){return Su(4,2,t,n)}function Cg(t,n){return Su(4,4,t,n)}function wg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Dg(t,n,a){a=a!=null?a.concat([t]):null,Su(4,4,wg.bind(null,n,t),a)}function Wf(){}function Ug(t,n){var a=an();n=n===void 0?null:n;var s=a.memoizedState;return n!==null&&zf(n,s[1])?s[0]:(a.memoizedState=[t,n],t)}function Ng(t,n){var a=an();n=n===void 0?null:n;var s=a.memoizedState;if(n!==null&&zf(n,s[1]))return s[0];if(s=t(),zs){Sn(!0);try{t()}finally{Sn(!1)}}return a.memoizedState=[s,n],s}function jf(t,n,a){return a===void 0||(ma&1073741824)!==0&&(Ee&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=V_(),le.lanes|=t,Qa|=t,a)}function Lg(t,n,a,s){return ii(a,n)?a:Ya.current!==null?(t=jf(t,a,s),ii(t,n)||(ln=!0),t):(ma&106)===0||(ma&1073741824)!==0&&(Ee&261930)===0?(ln=!0,t.memoizedState=a):(t=V_(),le.lanes|=t,Qa|=t,n)}function Og(t,n,a,s,l){var c=It.p;It.p=c!==0&&8>c?c:8;var _=At.T,E={};E.types=_!==null?_.types:null,At.T=E,Qf(t,!1,n,a);try{var L=l(),q=At.S;if(q!==null&&q(E,L),L!==null&&typeof L=="object"&&typeof L.then=="function"){var et=JS(L,s);il(t,n,et,li(t))}else il(t,n,s,li(t))}catch(ft){il(t,n,{then:function(){},status:"rejected",reason:ft},li())}finally{It.p=c,_!==null&&E.types!==null&&(_.types=E.types),At.T=_}}function aM(){}function Zf(t,n,a,s){if(t.tag!==5)throw Error(r(476));var l=Pg(t).queue;Og(t,l,n,se,a===null?aM:function(){return zg(t),a(s)})}function Pg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:se},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function zg(t){var n=Pg(t);n.next===null&&(n=t.alternate.memoizedState),il(t,n.next.queue,{},li())}function Kf(){return Cn(jr)}function Ig(){return an().memoizedState}function Bg(){return an().memoizedState}function sM(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=li();t=Xa(a);var s=ka(n,t,a);s!==null&&(Qn(s,n,a),Qo(s,n,a)),n={cache:Tf()},t.payload=n;return}n=n.return}}function rM(t,n,a){var s=li();a={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Mu(t)?Hg(n,a):(a=mf(t,n,a,s),a!==null&&(Qn(a,t,s),Gg(a,n,s)))}function Fg(t,n,a){var s=li();il(t,n,a,s)}function il(t,n,a,s){var l={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Mu(t))Hg(n,l);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var _=n.lastRenderedState,E=c(_,a);if(l.hasEagerState=!0,l.eagerState=E,ii(E,_))return Jl(t,n,l,0),Xe===null&&Ql(),!1}catch{}finally{}if(a=mf(t,n,l,s),a!==null)return Qn(a,t,s),Gg(a,n,s),!0}return!1}function Qf(t,n,a,s){if(s={lane:2,revertLane:Gh(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Mu(t)){if(n)throw Error(r(479))}else n=mf(t,a,s,2),n!==null&&Qn(n,t,2)}function Mu(t){var n=t.alternate;return t===le||n!==null&&n===le}function Hg(t,n){Rr=pu=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Gg(t,n,a){if((a&4194048)!==0){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,R(t,a)}}var xu={readContext:Cn,use:_u,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useLayoutEffect:tn,useInsertionEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useSyncExternalStore:tn,useId:tn,useHostTransitionStatus:tn,useFormState:tn,useActionState:tn,useOptimistic:tn,useMemoCache:tn,useCacheRefresh:tn,useEffectEvent:tn},Vg={readContext:Cn,use:_u,useCallback:function(t,n){return Gn().memoizedState=[t,n===void 0?null:n],t},useContext:Cn,useEffect:bg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,yu(4194308,4,wg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return yu(4194308,4,t,n)},useInsertionEffect:function(t,n){yu(4,2,t,n)},useMemo:function(t,n){var a=Gn();n=n===void 0?null:n;var s=t();if(zs){Sn(!0);try{t()}finally{Sn(!1)}}return a.memoizedState=[s,n],s},useReducer:function(t,n,a){var s=Gn();if(a!==void 0){var l=a(n);if(zs){Sn(!0);try{a(n)}finally{Sn(!1)}}}else l=n;return s.memoizedState=s.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},s.queue=t,t=t.dispatch=rM.bind(null,le,t),[s.memoizedState,t]},useRef:function(t){var n=Gn();return t={current:t},n.memoizedState=t},useState:function(t){t=kf(t);var n=t.queue,a=Fg.bind(null,le,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Wf,useDeferredValue:function(t,n){var a=Gn();return jf(a,t,n)},useTransition:function(){var t=kf(!1);return t=Og.bind(null,le,t.queue,!0,!1),Gn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var s=le,l=Gn();if(de){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Xe===null)throw Error(r(349));(Ee&127)!==0||ug(s,n,a)}l.memoizedState=a;var c={value:a,getSnapshot:n};return l.queue=c,bg(fg.bind(null,s,c,t),[t]),s.flags|=2048,wr(9,{destroy:void 0},cg.bind(null,s,c,a,n),null),a},useId:function(){var t=Gn(),n=Xe.identifierPrefix;if(de){var a=Xi,s=Vi;a=(s&~(1<<32-Pn(s)-1)).toString(32)+a,n="_"+n+"R_"+a,a=mu++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=$S++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Kf,useFormState:Sg,useActionState:Sg,useOptimistic:function(t){var n=Gn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Qf.bind(null,le,!0,a),a.dispatch=n,[t,n]},useMemoCache:Gf,useCacheRefresh:function(){return Gn().memoizedState=sM.bind(null,le)},useEffectEvent:function(t){var n=Gn(),a={impl:t};return n.memoizedState=a,function(){if((Ne&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Xg={readContext:Cn,use:_u,useCallback:Ug,useContext:Cn,useEffect:qf,useImperativeHandle:Dg,useInsertionEffect:Rg,useLayoutEffect:Cg,useMemo:Ng,useReducer:vu,useRef:Tg,useState:function(){return vu(ga)},useDebugValue:Wf,useDeferredValue:function(t,n){var a=an();return Lg(a,Be.memoizedState,t,n)},useTransition:function(){var t=vu(ga)[0],n=an().memoizedState;return[typeof t=="boolean"?t:nl(t),n]},useSyncExternalStore:lg,useId:Ig,useHostTransitionStatus:Kf,useFormState:Mg,useActionState:Mg,useOptimistic:function(t,n){var a=an();return pg(a,Be,t,n)},useMemoCache:Gf,useCacheRefresh:Bg,useEffectEvent:Ag},oM={readContext:Cn,use:_u,useCallback:Ug,useContext:Cn,useEffect:qf,useImperativeHandle:Dg,useInsertionEffect:Rg,useLayoutEffect:Cg,useMemo:Ng,useReducer:Xf,useRef:Tg,useState:function(){return Xf(ga)},useDebugValue:Wf,useDeferredValue:function(t,n){var a=an();return Be===null?jf(a,t,n):Lg(a,Be.memoizedState,t,n)},useTransition:function(){var t=Xf(ga)[0],n=an().memoizedState;return[typeof t=="boolean"?t:nl(t),n]},useSyncExternalStore:lg,useId:Ig,useHostTransitionStatus:Kf,useFormState:Eg,useActionState:Eg,useOptimistic:function(t,n){var a=an();return Be!==null?pg(a,Be,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Gf,useCacheRefresh:Bg,useEffectEvent:Ag};function Jf(t,n,a,s){n=t.memoizedState,a=a(s,n),a=a==null?n:O({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var $f={enqueueSetState:function(t,n,a){t=t._reactInternals;var s=li(),l=Xa(s);l.payload=n,a!=null&&(l.callback=a),n=ka(t,l,s),n!==null&&(Qn(n,t,s),Qo(n,t,s))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var s=li(),l=Xa(s);l.tag=1,l.payload=n,a!=null&&(l.callback=a),n=ka(t,l,s),n!==null&&(Qn(n,t,s),Qo(n,t,s))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=li(),s=Xa(a);s.tag=2,n!=null&&(s.callback=n),n=ka(t,s,a),n!==null&&(Qn(n,t,a),Qo(n,t,a))}};function kg(t,n,a,s,l,c,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,_):n.prototype&&n.prototype.isPureReactComponent?!Xo(a,s)||!Xo(l,c):!0}function Yg(t,n,a,s){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,s),n.state!==t&&$f.enqueueReplaceState(n,n.state,null)}function Is(t,n){var a=n;if("ref"in n){a={};for(var s in n)s!=="ref"&&(a[s]=n[s])}if(t=t.defaultProps){a===n&&(a=O({},a));for(var l in t)a[l]===void 0&&(a[l]=t[l])}return a}function qg(t){Kl(t)}function Wg(t){console.error(t)}function jg(t){Kl(t)}function Eu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function Zg(t,n,a){try{var s=t.onCaughtError;s(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function th(t,n,a){return a=Xa(a),a.tag=3,a.payload={element:null},a.callback=function(){Eu(t,n)},a}function Kg(t){return t=Xa(t),t.tag=3,t}function Qg(t,n,a,s){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var c=s.value;t.payload=function(){return l(c)},t.callback=function(){Zg(n,a,s)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){Zg(n,a,s),typeof l!="function"&&(Ja===null?Ja=new Set([this]):Ja.add(this));var E=s.stack;this.componentDidCatch(s.value,{componentStack:E!==null?E:""})})}function lM(t,n,a,s,l){if(a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=a.alternate,n!==null&&ws(n,a,l,!0),a=wn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return In===null?ku():a.alternate===null&&en===0&&(en=3),a.flags&=-257,a.flags|=65536,a.lanes=l,s===uu?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([s]):n.add(s),Bh(t,s,l)),!1;case 22:return a.flags|=65536,s===uu?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([s]):a.add(s)),Bh(t,s,l)),!1}throw Error(r(435,a.tag))}return Bh(t,s,l),ku(),!1}if(de)return n=wn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=l,s!==Sf&&(t=Error(r(422),{cause:s}),qo(_i(t,a)))):(s!==Sf&&(n=Error(r(423),{cause:s}),qo(_i(n,a))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,s=_i(s,a),l=th(t.stateNode,s,l),Df(t,l),en!==4&&(en=2)),!1;var c=Error(r(520),{cause:s});if(c=_i(c,a),fl===null?fl=[c]:fl.push(c),en!==4&&(en=2),n===null)return!0;s=_i(s,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=l&-l,a.lanes|=t,t=th(a.stateNode,s,t),Df(a,t),!1;case 1:if(n=a.type,c=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Ja===null||!Ja.has(c))))return a.flags|=65536,l&=-l,a.lanes|=l,l=Kg(l),Qg(l,t,a,s),Df(a,l),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var eh=Error(r(461)),ln=!1;function mn(t,n,a,s){n.child=t===null?eg(n,null,a,s):Ps(n,t.child,a,s)}function Jg(t,n,a,s,l){a=a.render;var c=n.ref;if("ref"in s){var _={};for(var E in s)E!=="ref"&&(_[E]=s[E])}else _=s;return Ds(n),s=If(t,n,a,_,c,l),E=Bf(),t!==null&&!ln?(Ff(t,n,l),_a(t,n,l)):(de&&E&&nu(n),n.flags|=1,mn(t,n,s,l),n.child)}function $g(t,n,a,s,l){if(t===null){var c=a.type;return typeof c=="function"&&!gf(c)&&c.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=c,t_(t,n,c,s,l)):(t=tu(a.type,null,s,n,n.mode,l),t.ref=n.ref,t.return=n,n.child=t)}if(c=t.child,!uh(t,l)){var _=c.memoizedProps;if(a=a.compare,a=a!==null?a:Xo,a(_,s)&&t.ref===n.ref)return _a(t,n,l)}return n.flags|=1,t=fa(c,s),t.ref=n.ref,t.return=n,n.child=t}function t_(t,n,a,s,l){if(t!==null){var c=t.memoizedProps;if(Xo(c,s)&&t.ref===n.ref)if(ln=!1,n.pendingProps=s=c,uh(t,l))(t.flags&131072)!==0&&(ln=!0);else return n.lanes=t.lanes,_a(t,n,l)}return nh(t,n,a,s,l)}function e_(t,n,a,s){var l=s.children,c=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|a:a,t!==null){for(s=n.child=t.child,l=0;s!==null;)l=l|s.lanes|s.childLanes,s=s.sibling;s=l&~c}else s=0,n.child=null;return n_(t,n,c,a,s)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&ou(n,c!==null?c.cachePool:null),c!==null?ag(n,c):Nf(),sg(n);else return s=n.lanes=536870912,n_(t,n,c!==null?c.baseLanes|a:a,a,s)}else c!==null?(ou(n,c.cachePool),ag(n,c),Wa(),n.memoizedState=null):(t!==null&&ou(n,null),Nf(),Wa());return mn(t,n,l,a),n.child}function al(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function n_(t,n,a,s,l){var c=Af();return c=c===null?null:{parent:rn._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},t!==null&&ou(n,null),Nf(),sg(n),t!==null&&ws(t,n,s,!0),n.childLanes=l,null}function Tu(t,n){return n=bu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function i_(t,n,a){return Ps(n,t.child,null,a),t=Tu(n,n.pendingProps),t.flags|=2,ai(n),n.memoizedState=null,t}function uM(t,n,a){var s=n.pendingProps,l=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(de){if(s.mode==="hidden")return t=Tu(n,s),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},al(null,t);if(Of(n),(t=Ye)?(t=w0(t,Si),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ia!==null?{id:Vi,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=Hm(t),a.return=n,n.child=a,xn=n,Ye=null)):t=null,t===null)throw Fa(n);return n.lanes=536870912,null}return Tu(n,s)}var c=t.memoizedState;if(c!==null){var _=c.dehydrated;if(Of(n),l)if(n.flags&256)n.flags&=-257,n=i_(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(ln||ws(t,n,a,!1),l=(a&t.childLanes)!==0,ln||l){if(Ya.current===null){if(s=Xe,s!==null&&(_=j(s,a),_!==0&&_!==c.retryLane))throw c.retryLane=_,bs(t,_),Qn(s,t,_),eh;ku()}n=i_(t,n,a)}else t=c.treeContext,Ye=xi(_.nextSibling),xn=n,de=!0,Ba=null,Si=!1,t!==null&&Xm(n,t),n=Tu(n,s),n.flags|=134221824;return n}return t=fa(t.child,{mode:s.mode,children:s.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Dr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function nh(t,n,a,s,l){return Ds(n),a=If(t,n,a,s,void 0,l),s=Bf(),t!==null&&!ln?(Ff(t,n,l),_a(t,n,l)):(de&&s&&nu(n),n.flags|=1,mn(t,n,a,l),n.child)}function a_(t,n,a,s,l,c){return Ds(n),n.updateQueue=null,a=og(n,s,a,l),rg(t),s=Bf(),t!==null&&!ln?(Ff(t,n,c),_a(t,n,c)):(de&&s&&nu(n),n.flags|=1,mn(t,n,a,c),n.child)}function s_(t,n,a,s,l){if(Ds(n),n.stateNode===null){var c=Sr,_=a.contextType;typeof _=="object"&&_!==null&&(c=Cn(_)),c=new a(s,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=$f,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=s,c.state=n.memoizedState,c.refs={},Cf(n),_=a.contextType,c.context=typeof _=="object"&&_!==null?Cn(_):Sr,c.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Jf(n,a,_,s),c.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(_=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),_!==c.state&&$f.enqueueReplaceState(c,c.state,null),$o(n,s,c,l),Jo(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(t===null){c=n.stateNode;var E=n.memoizedProps,L=Is(a,E);c.props=L;var q=c.context,et=a.contextType;_=Sr,typeof et=="object"&&et!==null&&(_=Cn(et));var ft=a.getDerivedStateFromProps;et=typeof ft=="function"||typeof c.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,et||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(E||q!==_)&&Yg(n,c,s,_),Va=!1;var k=n.memoizedState;c.state=k,$o(n,s,c,l),Jo(),q=n.memoizedState,E||k!==q||Va?(typeof ft=="function"&&(Jf(n,a,ft,s),q=n.memoizedState),(L=Va||kg(n,a,L,s,k,q,_))?(et||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=q),c.props=s,c.state=q,c.context=_,s=L):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{c=n.stateNode,wf(t,n),_=n.memoizedProps,et=Is(a,_),c.props=et,ft=n.pendingProps,k=c.context,q=a.contextType,L=Sr,typeof q=="object"&&q!==null&&(L=Cn(q)),E=a.getDerivedStateFromProps,(q=typeof E=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(_!==ft||k!==L)&&Yg(n,c,s,L),Va=!1,k=n.memoizedState,c.state=k,$o(n,s,c,l),Jo();var $=n.memoizedState;_!==ft||k!==$||Va||t!==null&&t.dependencies!==null&&su(t.dependencies)?(typeof E=="function"&&(Jf(n,a,E,s),$=n.memoizedState),(et=Va||kg(n,a,et,s,k,$,L)||t!==null&&t.dependencies!==null&&su(t.dependencies))?(q||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,$,L),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,$,L)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=$),c.props=s,c.state=$,c.context=L,s=et):(typeof c.componentDidUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),s=!1)}return c=s,Dr(t,n),s=(n.flags&128)!==0,c||s?(c=n.stateNode,a=s&&typeof a.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,t!==null&&s?(n.child=Ps(n,t.child,null,l),n.child=Ps(n,null,a,l)):mn(t,n,a,l),n.memoizedState=c.state,t=n.child):t=_a(t,n,l),t}function r_(t,n,a,s){return Rs(),n.flags|=256,mn(t,n,a,s),n.child}var ih={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ah(t){return{baseLanes:t,cachePool:Zm()}}function sh(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=oi),t}function o_(t,n,a){var s=n.pendingProps,l=!1,c=(n.flags&128)!==0,_;if((_=c)||(_=t!==null&&t.memoizedState===null?!1:(Dn.current&2)!==0),_&&(l=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,t===null){if(de){if(l?qa(n):Wa(),(t=Ye)?(t=w0(t,Si),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ia!==null?{id:Vi,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=Hm(t),a.return=n,n.child=a,xn=n,Ye=null)):t=null,t===null)throw Fa(n);return ad(t)?n.lanes=32:n.lanes=536870912,null}return c=s.children,s=s.fallback,l?(Wa(),l=n.mode,c=bu({mode:"hidden",children:c},l),s=As(s,l,a,null),c.return=n,s.return=n,c.sibling=s,n.child=c,s=n.child,s.memoizedState=ah(a),s.childLanes=sh(t,_,a),n.memoizedState=ih,al(null,s)):(qa(n),rh(n,c))}var E=t.memoizedState;if(E!==null){var L=E.dehydrated;if(L!==null)return cM(t,n,c,_,s,L,E,a)}return l?(Wa(),l=s.fallback,c=n.mode,E=t.child,L=E.sibling,s=fa(E,{mode:"hidden",children:s.children}),s.subtreeFlags=E.subtreeFlags&1206910976,L!==null?l=fa(L,l):(l=As(l,c,a,null),l.flags|=2),l.return=n,s.return=n,s.sibling=l,n.child=s,al(null,s),s=n.child,l=t.child.memoizedState,l===null?l=ah(a):(c=l.cachePool,c!==null?(E=rn._currentValue,c=c.parent!==E?{parent:E,pool:E}:c):c=Zm(),l={baseLanes:l.baseLanes|a,cachePool:c}),s.memoizedState=l,s.childLanes=sh(t,_,a),n.memoizedState=ih,al(t.child,s)):(qa(n),a=t.child,t=a.sibling,a=fa(a,{mode:"visible",children:s.children}),a.return=n,a.sibling=null,t!==null&&(_=n.deletions,_===null?(n.deletions=[t],n.flags|=16):_.push(t)),n.child=a,n.memoizedState=null,a)}function rh(t,n){return n=bu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function bu(t,n){return t=Wn(22,t,null,n),t.lanes=0,t}function Au(t,n,a){return Ps(n,t.child,null,a),t=rh(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function cM(t,n,a,s,l,c,_,E){if(a)return n.flags&256?(qa(n),n.flags&=-257,Au(t,n,E)):n.memoizedState!==null?(Wa(),n.child=t.child,n.flags|=128,null):(Wa(),c=l.fallback,_=n.mode,l=bu({mode:"visible",children:l.children},_),c=As(c,_,E,null),c.flags|=2,l.return=n,c.return=n,l.sibling=c,n.child=l,Ps(n,t.child,null,E),l=n.child,l.memoizedState=ah(E),l.childLanes=sh(t,s,E),n.memoizedState=ih,al(null,l));if(qa(n),ad(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var L=s.dgst;return s=L,s!==""&&(l=Error(r(419)),l.stack="",l.digest=s,qo({value:l,source:null,stack:null})),Au(t,n,E)}if(ln||ws(t,n,E,!1),s=(E&t.childLanes)!==0,ln||s){if(Ya.current!==null)return Au(t,n,E);if(s=Xe,s!==null&&(l=j(s,E),l!==0&&l!==_.retryLane))throw _.retryLane=l,bs(t,l),Qn(s,t,l),eh;return id(c)||ku(),Au(t,n,E)}return id(c)?(n.flags|=192,n.child=t.child,null):(t=_.treeContext,Ye=xi(c.nextSibling),xn=n,de=!0,Ba=null,Si=!1,t!==null&&Xm(n,t),n=rh(n,l.children),n.flags|=134221824,n)}function l_(t,n,a){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n),au(t.return,n,a)}function u_(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&du(a)===null&&(n=t),t=t.sibling}return n}function Ru(t,n,a,s,l,c){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:a,tailMode:l,treeForkCount:c}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=s,_.tail=a,_.tailMode=l,_.treeForkCount=c)}function oh(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function lh(t,n,a){var s=n.pendingProps,l=s.revealOrder,c=s.tail;s=s.children;var _=Dn.current;if(n.flags&128)return tl(n,_),null;var E=(_&2)!==0;if(E?(_=_&1|2,n.flags|=128):_&=1,tl(n,_),l==="backwards"&&t!==null?(oh(t),mn(t,n,s,a),oh(t)):mn(t,n,s,a),s=de?Yo:0,!E&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&l_(t,a,n);else if(t.tag===19)l_(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"backwards":a=u_(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null,oh(n)),Ru(n,!0,l,null,c,s);break;case"unstable_legacy-backwards":for(a=null,l=n.child,n.child=null;l!==null;){if(t=l.alternate,t!==null&&du(t)===null){n.child=l;break}t=l.sibling,l.sibling=a,a=l,l=t}Ru(n,!0,a,null,c,s);break;case"together":Ru(n,!1,null,null,void 0,s);break;case"independent":n.memoizedState=null;break;default:a=u_(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null),Ru(n,!1,l,a,c,s)}return n.child}function c_(t,n,a){var s=n.pendingProps;return Ha(n,n.type,s.value),mn(t,n,s.children,a),n.child}function _a(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Qa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(ws(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=fa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=fa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function uh(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&su(t)))}function fM(t,n,a){switch(n.tag){case 3:tt(n,n.stateNode.containerInfo),Ha(n,rn,t.memoizedState.cache),Rs();break;case 27:case 5:vt(n);break;case 4:tt(n,n.stateNode.containerInfo);break;case 10:Ha(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Of(n),null;break;case 13:var s=n.memoizedState;if(s!==null){if(s.dehydrated!==null)return qa(n),n.flags|=128,null;s=ws(t,n,a,!1);var l=n.child.childLanes;return s||(a&l)!==0?o_(t,n,a):(qa(n),t=_a(t,n,a),t!==null?t.sibling:null)}qa(n);break;case 19:if(n.flags&128)return lh(t,n,a);if(l=(t.flags&128)!==0,s=(a&n.childLanes)!==0,s||(ws(t,n,a,!1),s=(a&n.childLanes)!==0),l){if(s)return lh(t,n,a);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),tl(n,Dn.current),s)break;return null;case 22:return n.lanes=0,e_(t,n,a,n.pendingProps);case 24:Ha(n,rn,t.memoizedState.cache)}return _a(t,n,a)}function f_(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)ln=!0;else{if(!uh(t,a)&&(n.flags&128)===0)return ln=!1,fM(t,n,a);ln=(t.flags&131072)!==0}else ln=!1,de&&(n.flags&1048576)!==0&&Vm(n,Yo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var s=n.pendingProps;if(t=Ls(n.elementType),n.type=t,typeof t=="function")gf(t)?(s=Is(t,s),n.tag=1,n=s_(null,n,t,s,a)):(n.tag=0,n=nh(null,n,t,s,a));else{if(t!=null){var l=t.$$typeof;if(l===W){n.tag=11,n=Jg(null,n,t,s,a);break t}else if(l===yt){n.tag=14,n=$g(null,n,t,s,a);break t}else if(l===ht){n.tag=10,n.type=t,n=c_(null,n,a);break t}}throw n=Vt(t)||t,Error(r(306,n,""))}}return n;case 0:return nh(t,n,n.type,n.pendingProps,a);case 1:return s=n.type,l=Is(s,n.pendingProps),s_(t,n,s,l,a);case 3:t:{if(tt(n,n.stateNode.containerInfo),t===null)throw Error(r(387));s=n.pendingProps;var c=n.memoizedState;l=c.element,wf(t,n),$o(n,s,null,a);var _=n.memoizedState;if(s=_.cache,Ha(n,rn,s),s!==c.cache&&Ef(n,[rn],a,!0),Jo(),s=_.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=r_(t,n,s,a);break t}else if(s!==l){l=_i(Error(r(424)),n),qo(l),n=r_(t,n,s,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Ye=xi(t.firstChild),xn=n,de=!0,Ba=null,Si=!0,a=eg(n,null,s,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Rs(),s===l){n=_a(t,n,a);break t}mn(t,n,s,a)}n=n.child}return n;case 26:return Dr(t,n),t===null?(a=z0(n.type,null,n.pendingProps,null))?n.memoizedState=a:de||(n.stateNode=m0(n.type,n.pendingProps,N.current,n)):n.memoizedState=z0(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return vt(n),t===null&&de&&(s=n.stateNode=N0(n.type,n.pendingProps,N.current),xn=n,Si=!0,l=Ye,es(n.type)?(sd=l,Ye=xi(s.firstChild)):Ye=l),mn(t,n,n.pendingProps.children,a),Dr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&de&&((l=s=Ye)&&(s=sx(s,n.type,n.pendingProps,Si),s!==null?(n.stateNode=s,xn=n,Ye=xi(s.firstChild),Si=!1,l=!0):l=!1),l||Fa(n)),vt(n),l=n.type,c=n.pendingProps,_=t!==null?t.memoizedProps:null,s=c.children,Kh(l,c)?s=null:_!==null&&Kh(l,_)&&(n.flags|=32),n.memoizedState!==null&&(l=If(t,n,tM,null,null,a),jr._currentValue=l),Dr(t,n),mn(t,n,s,a),n.child;case 6:return t===null&&de&&((t=a=Ye)&&(a=rx(a,n.pendingProps,Si),a!==null?(n.stateNode=a,xn=n,Ye=null,t=!0):t=!1),t||Fa(n)),null;case 13:return o_(t,n,a);case 4:return tt(n,n.stateNode.containerInfo),s=n.pendingProps,t===null?n.child=Ps(n,null,s,a):mn(t,n,s,a),n.child;case 11:return Jg(t,n,n.type,n.pendingProps,a);case 7:return s=n.pendingProps,Dr(t,n),mn(t,n,s,a),n.child;case 8:return mn(t,n,n.pendingProps.children,a),n.child;case 12:return mn(t,n,n.pendingProps.children,a),n.child;case 10:return c_(t,n,a);case 9:return l=n.type._context,s=n.pendingProps.children,Ds(n),l=Cn(l),s=s(l),n.flags|=1,mn(t,n,s,a),n.child;case 14:return $g(t,n,n.type,n.pendingProps,a);case 15:return t_(t,n,n.type,n.pendingProps,a);case 19:return lh(t,n,a);case 31:return uM(t,n,a);case 22:return e_(t,n,a,n.pendingProps);case 24:return Ds(n),s=Cn(rn),t===null?(l=Af(),l===null&&(l=Xe,c=Tf(),l.pooledCache=c,c.refCount++,c!==null&&(l.pooledCacheLanes|=a),l=c),n.memoizedState={parent:s,cache:l},Cf(n),Ha(n,rn,l)):((t.lanes&a)!==0&&(wf(t,n),$o(n,null,null,a),Jo()),l=t.memoizedState,c=n.memoizedState,l.parent!==s?(l={parent:s,cache:s},n.memoizedState=l,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=l),Ha(n,rn,s)):(s=c.cache,Ha(n,rn,s),s!==l.cache&&Ef(n,[rn],a,!0))),mn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),s=n.pendingProps,s.name!=null&&s.name!=="auto"?n.flags|=t===null?18882560:18874368:de&&nu(n),t!==null&&t.memoizedProps.name!==s.name?n.flags|=4194816:Dr(t,n),mn(t,n,s.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function va(t){t.flags|=4}function ch(t,n,a,s,l){var c;if((c=(t.mode&32)!==0)&&(c=a===null?H0(n,s):H0(n,s)&&(s.src!==a.src||s.srcSet!==a.srcSet)),c){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(q_())t.flags|=8192;else throw Os=uu,Rf}else t.flags&=-16777217}function h_(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!G0(n))if(q_())t.flags|=8192;else throw Os=uu,Rf}function Cu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Fl():536870912,t.lanes|=n,Pr|=n)}function sl(t,n){if(!de)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function qe(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,s=0;if(n)for(var l=t.child;l!==null;)a|=l.lanes|l.childLanes,s|=l.subtreeFlags&1206910976,s|=l.flags&1206910976,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)a|=l.lanes|l.childLanes,s|=l.subtreeFlags,s|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=s,t.childLanes=a,n}function hM(t,n,a){var s=n.pendingProps;switch(yf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(n),null;case 1:return qe(n),null;case 3:return a=n.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),pa(rn),gt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Er(n)?va(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Mf())),qe(n),null;case 26:var l=n.type,c=n.memoizedState;return t===null?(va(n),c!==null?(qe(n),h_(n,c)):(qe(n),ch(n,l,null,s,a))):c?c!==t.memoizedState?(va(n),qe(n),h_(n,c)):(qe(n),n.flags&=-16777217):(t=t.memoizedProps,t!==s&&va(n),qe(n),ch(n,l,t,s,a)),null;case 27:if(dt(n),a=N.current,l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&va(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return qe(n),n.subtreeFlags&=-33554433,null}t=Me.current,Er(n)?km(n):(t=N0(l,s,a),n.stateNode=t,va(n))}return qe(n),n.subtreeFlags&=-33554433,null;case 5:if(dt(n),l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&va(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return qe(n),n.subtreeFlags&=-33554433,null}if(c=Me.current,Er(n))km(n);else{var _=gl(N.current);switch(c){case 1:c=_.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:c=_.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":c=_.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":c=_.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":c=_.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?_.createElement("select",{is:s.is}):_.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?_.createElement(l,{is:s.is}):_.createElement(l)}}c[Et]=n,c[Dt]=s;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)c.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=c;t:switch(Nn(c,l,s),l){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&va(n)}}return qe(n),n.subtreeFlags&=-33554433,ch(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==s&&va(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(r(166));if(t=N.current,Er(n)){if(t=n.stateNode,a=n.memoizedProps,s=null,l=xn,l!==null)switch(l.tag){case 27:case 5:s=l.memoizedProps}t[Et]=n,t=!!(t.nodeValue===a||s!==null&&s.suppressHydrationWarning===!0||f0(t.nodeValue,a)),t||Fa(n,!0)}else t=gl(t).createTextNode(s),t[Et]=n,n.stateNode=t}return qe(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(s=Er(n),a!==null){if(t===null){if(!s)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[Et]=n}else Rs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),t=!1}else a=Mf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ai(n),n):(ai(n),null);if((n.flags&128)!==0)throw Error(r(558))}return qe(n),null;case 13:if(s=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=Er(n),s!==null&&s.dehydrated!==null){if(t===null){if(!l)throw Error(r(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(r(317));l[Et]=n}else Rs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),l=!1}else l=Mf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return n.flags&256?(ai(n),n):(ai(n),null)}return ai(n),(n.flags&128)!==0?(n.lanes=a,n):(a=s!==null,t=t!==null&&t.memoizedState!==null,a&&(s=n.child,l=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(l=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==l&&(s.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Cu(n,n.updateQueue),qe(n),null);case 4:return gt(),t===null&&Yh(n.stateNode.containerInfo),n.flags|=67108864,qe(n),null;case 10:return pa(n.type),qe(n),null;case 19:if(Pf(n),s=n.memoizedState,s===null)return qe(n),null;if(l=(n.flags&128)!==0,c=s.rendering,c===null)if(l)sl(s,!1);else{if(en!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(c=du(t),c!==null){for(n.flags|=128,sl(s,!1),t=c.updateQueue,n.updateQueue=t,Cu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Fm(a,t),a=a.sibling;return tl(n,Dn.current&1|2),de&&ha(n,s.treeForkCount),n.child}t=t.sibling}s.tail!==null&&X()>Hu&&(n.flags|=128,l=!0,sl(s,!1),n.lanes=4194304)}else{if(!l)if(t=du(c),t!==null){if(n.flags|=128,l=!0,t=t.updateQueue,n.updateQueue=t,Cu(n,t),sl(s,!0),s.tail===null&&s.tailMode!=="collapsed"&&s.tailMode!=="visible"&&!c.alternate&&!de)return qe(n),null}else 2*X()-s.renderingStartTime>Hu&&a!==536870912&&(n.flags|=128,l=!0,sl(s,!1),n.lanes=4194304);s.isBackwards?(c.sibling=n.child,n.child=c):(t=s.last,t!==null?t.sibling=c:n.child=c,s.last=c)}if(s.tail!==null){t=s.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return s.rendering=t,s.tail=t.sibling,s.renderingStartTime=X(),t.sibling=null,c=Dn.current,c=l?c&1|2:c&1,s.tailMode==="visible"||s.tailMode==="collapsed"||!a||de?tl(n,c):(a=c,Rt(wn,n),Rt(Dn,a),In===null&&(In=n)),de&&ha(n,s.treeForkCount),t}return qe(n),null;case 22:case 23:return ai(n),Lf(),s=n.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?(a&536870912)!==0&&(n.flags&128)===0&&(qe(n),n.subtreeFlags&6&&(n.flags|=8192)):qe(n),a=n.updateQueue,a!==null&&Cu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==a&&(n.flags|=2048),t!==null&&Kt(Ns),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),pa(rn),qe(n),null;case 25:return null;case 30:return n.flags|=33554432,qe(n),null}throw Error(r(156,n.tag))}function dM(t,n){switch(yf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return pa(rn),gt(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return dt(n),null;case 31:if(n.memoizedState!==null){if(ai(n),n.alternate===null)throw Error(r(340));Rs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ai(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Rs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Pf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return gt(),null;case 10:return pa(n.type),null;case 22:case 23:return ai(n),Lf(),t!==null&&Kt(Ns),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return pa(rn),null;case 25:return null;default:return null}}function d_(t,n){switch(yf(n),n.tag){case 3:pa(rn),gt();break;case 26:case 27:case 5:dt(n);break;case 4:gt();break;case 31:n.memoizedState!==null&&ai(n);break;case 13:ai(n);break;case 19:Pf(n);break;case 10:pa(n.type);break;case 22:case 23:ai(n),Lf(),t!==null&&Kt(Ns);break;case 24:pa(rn)}}function rl(t,n){try{var a=n.updateQueue,s=a!==null?a.lastEffect:null;if(s!==null){var l=s.next;a=l;do{if((a.tag&t)===t){s=void 0;var c=a.create,_=a.inst;s=c(),_.destroy=s}a=a.next}while(a!==l)}}catch(E){Pe(n,n.return,E)}}function ja(t,n,a){try{var s=n.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var c=l.next;s=c;do{if((s.tag&t)===t){var _=s.inst,E=_.destroy;if(E!==void 0){_.destroy=void 0,l=n;var L=a,q=E;try{q()}catch(et){Pe(l,L,et)}}}s=s.next}while(s!==c)}}catch(et){Pe(n,n.return,et)}}function p_(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{ig(n,a)}catch(s){Pe(t,t.return,s)}}}function m_(t,n,a){a.props=Is(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(s){Pe(t,n,s)}}function ki(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:var l=t.stateNode,c=ua(t.memoizedProps,l);(l.ref===null||l.ref.name!==c)&&(l.ref=x0(c)),s=l.ref;break;case 7:if(t.stateNode===null){var _=new ui(t);g(t.child,!1,ix,_,void 0,void 0),t.stateNode=_}s=t.stateNode;break;default:s=t.stateNode}typeof a=="function"?t.refCleanup=a(s):a.current=s}}catch(E){Pe(t,n,E)}}function Un(t,n){var a=t.ref,s=t.refCleanup;if(a!==null)if(typeof s=="function")try{s()}catch(l){Pe(t,n,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){Pe(t,n,l)}else a.current=null}function wu(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)C0(t.stateNode,n[a])}function g_(t){for(var n=t.return;n!==null&&(hh(n)&&C0(t.stateNode,n.stateNode),!fh(n));)n=n.return}function ol(t){for(var n=t.return;n!==null&&(hh(n)&&ax(t.stateNode,n.stateNode),!fh(n));)n=n.return}function fh(t){return t.tag===5||t.tag===3||t.tag===27}function hh(t){return t&&t.tag===7&&t.stateNode!==null}function dh(t){var n=t.type,a=t.memoizedProps,s=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&s.focus();break t;case"img":a.src?s.src=a.src:a.srcSet&&(s.srcset=a.srcSet)}}catch(l){Pe(t,t.return,l)}}function ph(t,n,a){try{var s=t.stateNode;FM(s,t.type,a,n),s[Dt]=n}catch(l){Pe(t,t.return,l)}}function __(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&es(t.type)||t.tag===4}function mh(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||__(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&es(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function gh(t,n,a,s){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(l),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Gi)),wu(t,s),De=!0;else if(l!==4&&(l===27&&(wu(t,s),s=null,es(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(gh(t,n,a,s),t=t.sibling;t!==null;)gh(t,n,a,s),t=t.sibling}function Du(t,n,a,s){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?a.insertBefore(l,n):a.appendChild(l),wu(t,s),De=!0;else if(l!==4&&(l===27&&(wu(t,s),s=null,es(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(Du(t,n,a,s),t=t.sibling;t!==null;)Du(t,n,a,s),t=t.sibling}function v_(t){var n=t.stateNode,a=t.memoizedProps;try{for(var s=t.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0]);Nn(n,s,a),n[Et]=t,n[Dt]=a}catch(c){Pe(t,t.return,c)}}var Uu=!1,si=null;function y_(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(Uu=!0)}var Yi=null;function S_(){var t=Yi;return Yi=null,t}var jn=0;function Ur(t,n,a,s,l){return jn=0,M_(t.child,n,a,s,l)}function M_(t,n,a,s,l){for(var c=!1;t!==null;){if(t.tag===5){var _=t.stateNode;if(s!==null){var E=$h(_);s.push(E),E.view&&(c=!0)}else c||$h(_).view&&(c=!0);Uu=!0,S0(_,jn===0?n:n+"_"+jn,a),jn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&l||M_(t.child,n,a,s,l)&&(c=!0));t=t.sibling}return c}function qi(t,n){for(;t!==null;)t.tag===5?M0(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||qi(t.child,n)),t=t.sibling}function Nu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Nu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(r(544));var a=n.name;n=ca(n.default,n.share),n!=="none"&&(Ur(t,a,n,null,!1)||qi(t.child,!1))}t=t.sibling}}function _h(t,n){if(t.tag===30){var a=t.stateNode,s=t.memoizedProps,l=ua(s,a),c=ca(s.default,a.paired?s.share:s.enter);c!=="none"?Ur(t,l,c,null,!1)?(Nu(t),a.paired||n||Fr(t,s.onEnter)):qi(t.child,!1):Nu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)_h(t,n),t=t.sibling;else Nu(t)}function vh(t){if(si!==null&&si.size!==0){var n=si;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,s=a.name;if(s!=null&&s!=="auto"){var l=n.get(s);if(l!==void 0){var c=ca(a.default,a.share);if(c!=="none"&&(Ur(t,s,c,null,!1)?(c=t.stateNode,l.paired=c,c.paired=l,Fr(t,a.onShare)):qi(t.child,!1)),n.delete(s),n.size===0)break}}}vh(t)}t=t.sibling}}}function yh(t){if(t.tag===30){var n=t.memoizedProps,a=ua(n,t.stateNode),s=si!==null?si.get(a):void 0,l=ca(n.default,s!==void 0?n.share:n.exit);l!=="none"&&(Ur(t,a,l,null,!1)?s!==void 0?(l=t.stateNode,s.paired=l,l.paired=s,si.delete(a),Fr(t,n.onShare)):Fr(t,n.onExit):qi(t.child,!1)),si!==null&&vh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)yh(t),t=t.sibling;else si!==null&&vh(t)}function x_(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=ua(n,t.stateNode);n=ca(n.default,n.update),t.flags&=-5,n!=="none"&&Ur(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&x_(t);t=t.sibling}}function Sh(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,qi(t.child,!1))}Sh(t)}t=t.sibling}}function Lu(t){if(t.tag===30)t.stateNode.paired=null,qi(t.child,!1),Sh(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Lu(t),t=t.sibling;else Sh(t)}function E_(t){for(t=t.child;t!==null;)t.tag===30?qi(t.child,!1):(t.subtreeFlags&33554432)!==0&&E_(t),t=t.sibling}function Mh(t,n,a,s,l,c,_){for(var E=!1;n!==null;){if(n.tag===5){var L=n.stateNode;if(c!==null&&jn<c.length){var q=c[jn],et=$h(L);(q.view||et.view)&&(E=!0);var ft;if(ft=(t.flags&4)===0)if(et.clip)ft=!0;else{ft=q.rect;var k=et.rect;ft=ft.y!==k.y||ft.x!==k.x||ft.height!==k.height||ft.width!==k.width}ft&&(t.flags|=4),et.abs?et=!q.abs:(q=q.rect,et=et.rect,et=q.height!==et.height||q.width!==et.width),et&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&S0(L,jn===0?a:a+"_"+jn,l),E&&(t.flags&4)!==0||(Yi===null&&(Yi=[]),Yi.push(L,jn===0?s:s+"_"+jn,n.memoizedProps)),jn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&_?t.flags|=n.flags&32:Mh(t,n.child,a,s,l,c,_)&&(E=!0));n=n.sibling}return E}function T_(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,s=t.stateNode,l=ua(a,s),c=ca(a.default,a.update),_;_=t.memoizedState,t.memoizedState=null,s=t;var E=t.child;jn=0,l=Mh(s,E,l,l,c,_,!1),(t.flags&4)!==0&&l&&Fr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&T_(t);t=t.sibling}}var En=!1,Le=!1,Wi=!1,xh=!1,b_=typeof WeakSet=="function"?WeakSet:Set,Tn=null,ji=!1,ll=!1,Ou=!1,Eh=!1;function pM(t,n,a){if(t=t.containerInfo,jh=Zr,t=wm(t),uf(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else t:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var c=l.anchorOffset,_=l.focusNode;l=l.focusOffset;try{s.nodeType,_.nodeType}catch{s=null;break t}var E=0,L=-1,q=-1,et=0,ft=0,k=t,$=null;e:for(;;){for(var Ct;k!==s||c!==0&&k.nodeType!==3||(L=E+c),k!==_||l!==0&&k.nodeType!==3||(q=E+l),k.nodeType===3&&(E+=k.nodeValue.length),(Ct=k.firstChild)!==null;)$=k,k=Ct;for(;;){if(k===t)break e;if($===s&&++et===c&&(L=E),$===_&&++ft===l&&(q=E),(Ct=k.nextSibling)!==null)break;k=$,$=k.parentNode}k=Ct}s=L===-1||q===-1?null:{start:L,end:q}}else s=null}s=s||{start:0,end:0}}else s=null;for(Zh={focusedElem:t,selectionRange:s},Zr=!1,a=(a&335544064)===a,Tn=n,n=a?9270:1024;Tn!==null;){if(t=Tn,a&&(s=t.deletions,s!==null))for(c=0;c<s.length;c++)a&&yh(s[c]);if(t.alternate===null&&(t.flags&2)!==0)a&&y_(t),Pu(a);else{if(t.tag===22){if(s=t.alternate,t.memoizedState!==null){s!==null&&s.memoizedState===null&&a&&yh(s),Pu(a);continue}else if(s!==null&&s.memoizedState!==null){a&&y_(t),Pu(a);continue}}s=t.child,(t.subtreeFlags&n)!==0&&s!==null?(s.return=t,Tn=s):(a&&x_(t),Pu(a))}}si=null}function Pu(t){for(;Tn!==null;){var n=Tn,a=t,s=n.alternate,l=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&s!==null){a=void 0,l=s.memoizedProps,s=s.memoizedState;var c=n.stateNode;try{var _=Is(n.type,l);a=c.getSnapshotBeforeUpdate(_,s),c.__reactInternalSnapshotBeforeUpdate=a}catch(E){Pe(n,n.return,E)}}break;case 3:if((l&1024)!==0){if(s=n.stateNode.containerInfo,a=s.nodeType,a===9)nd(s);else if(a===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":nd(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&s!==null&&(a=ua(s.memoizedProps,s.stateNode),l=n.memoizedProps,l=ca(l.default,l.update),l!=="none"&&Ur(s,a,l,s.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(r(163))}if(s=n.sibling,s!==null){s.return=n.return,Tn=s;break}Tn=n.return}}function A_(t,n,a){var s=a.flags;switch(a.tag){case 0:case 11:case 15:Zi(t,a),s&4&&rl(5,a);break;case 1:if(Zi(t,a),s&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(_){Pe(a,a.return,_)}else{var l=Is(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(l,n,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Pe(a,a.return,_)}}s&64&&p_(a),s&512&&ki(a,a.return);break;case 3:if(Zi(t,a),s&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ig(t,n)}catch(_){Pe(a,a.return,_)}}break;case 27:n===null&&s&4&&v_(a);case 26:case 5:Zi(t,a),n===null&&s&4&&dh(a),s&512&&ki(a,a.return);break;case 12:Zi(t,a);break;case 31:Zi(t,a),s&4&&D_(t,a);break;case 13:Zi(t,a),s&4&&U_(t,a),s&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=AM.bind(null,a),ox(t,a))));break;case 22:if(s=a.memoizedState!==null||En,!s){var c=n!==null&&n.memoizedState!==null||Le;n=En,l=Le,En=s,(Le=c)&&!l?(s=2,(a.subtreeFlags&8772)!==0&&(s|=1),Di(t,a,s)):Zi(t,a),En=n,Le=l}break;case 30:Zi(t,a),s&512&&ki(a,a.return);break;case 7:s&512&&ki(a,a.return);default:Zi(t,a)}}function Th(t,n){for(t=t.child;t!==null;)R_(t,n),t=t.sibling}function R_(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var s=a.style;typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"}else{var l=t.stateNode,c=t.memoizedProps.style,_=c!=null&&c.hasOwnProperty("display")?c.display:null;l.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(L){Pe(t,t.return,L)}bh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,De=!0}catch(L){Pe(t,t.return,L)}break;case 18:try{var E=t.stateNode;n?y0(E,!0):y0(t.stateNode,!1)}catch(L){Pe(t,t.return,L)}break;case 22:case 23:t.memoizedState===null&&Th(t,n);break;default:Th(t,n)}}function bh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,s=n;switch(a.tag){case 4:R_(a,s);break t;case 22:a.memoizedState===null&&bh(a,s);break t;default:bh(a,s)}}t=t.sibling}}function C_(t){var n=t.alternate;n!==null&&(t.alternate=null,C_(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&ve(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Je=null,Zn=!1;function Ci(t,n,a){for(a=a.child;a!==null;)w_(t,n,a),a=a.sibling}function w_(t,n,a){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(Ae,a)}catch{}switch(a.tag){case 26:Le||Un(a,n),Ci(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Le&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Le||Un(a,n),ol(a);var s=Je,l=Zn;es(a.type)&&(Je=a.stateNode,Zn=!1),Ci(t,n,a),L0(a.stateNode,a.type,a.memoizedProps),Je=s,Zn=l;break;case 5:Le||Un(a,n),ol(a);case 6:if(a.tag===6&&ol(a),s=Je,l=Zn,Je=null,Ci(t,n,a),Je=s,Zn=l,Je!==null)if(Zn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode),De=!0}catch(c){Pe(a,n,c)}else try{Je.removeChild(a.stateNode),De=!0}catch(c){Pe(a,n,c)}break;case 18:Je!==null&&(Zn?(t=Je,v0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Kr(t)):v0(Je,a.stateNode));break;case 4:s=Je,l=Zn,Je=a.stateNode.containerInfo,Zn=!0,Ci(t,n,a),Je=s,Zn=l;break;case 0:case 11:case 14:case 15:ja(2,a,n),Le||ja(4,a,n),Ci(t,n,a);break;case 1:Le||(Un(a,n),s=a.stateNode,typeof s.componentWillUnmount=="function"&&m_(a,n,s)),Ci(t,n,a);break;case 21:Ci(t,n,a);break;case 22:Le=(s=Le)||a.memoizedState!==null,Ci(t,n,a),Le=s;break;case 30:Un(a,n),Ci(t,n,a);break;case 7:Le||Un(a,n),Ci(t,n,a);break;default:Ci(t,n,a)}}function D_(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Kr(t)}catch(a){Pe(n,n.return,a)}}}function U_(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Kr(t)}catch(a){Pe(n,n.return,a)}}function mM(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new b_),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new b_),n;default:throw Error(r(435,t.tag))}}function zu(t,n){var a=mM(t);n.forEach(function(s){if(!a.has(s)){a.add(s);var l=RM.bind(null,t,s);s.then(l,l)}})}function Vn(t,n,a){var s=n.deletions;if(s!==null)for(var l=0;l<s.length;l++){var c=s[l],_=t,E=n,L=E;t:for(;L!==null;){switch(L.tag){case 27:if(es(L.type)){Je=L.stateNode,Zn=!1;break t}break;case 5:Je=L.stateNode,Zn=!1;break t;case 3:case 4:Je=L.stateNode.containerInfo,Zn=!0;break t}L=L.return}if(Je===null)throw Error(r(160));w_(_,E,c),Je=null,Zn=!1,_=c.alternate,_!==null&&(_.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)N_(n,t,a),n=n.sibling}var wi=null;function N_(t,n,a){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(l&4&&(s=t.updateQueue,s=s!==null?s.events:null,s!==null))for(var c=0;c<s.length;c++){var _=s[c];_.ref.impl=_.nextImpl}Vn(n,t,a),Xn(t),l&4&&(ja(3,t,t.return),rl(3,t),ja(5,t,t.return));break;case 1:Vn(n,t,a),Xn(t),l&512&&(Le||s===null||Un(s,s.return)),l&64&&En&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(c=wi,Vn(n,t,a),Xn(t),l&512&&(Le||s===null||Un(s,s.return)),l&4)if(l=s!==null?s.memoizedState:null,a=t.memoizedState,s===null)if(a===null)if(t.stateNode===null)if(En)t.stateNode=m0(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,l=c.ownerDocument||c;e:switch(n){case"title":s=l.getElementsByTagName("title")[0],(!s||s[ke]||s[Et]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=l.createElement(n),l.head.insertBefore(s,l.querySelector("head > title"))),Nn(s,n,a),s[Et]=t,je(s),n=s;break t;case"link":if(c=F0("link","href",l).get(n+(a.href||""))){for(_=0;_<c.length;_++)if(s=c[_],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(_,1);break e}}s=l.createElement(n),Nn(s,n,a),l.head.appendChild(s);break;case"meta":if(c=F0("meta","content",l).get(n+(a.content||""))){for(_=0;_<c.length;_++)if(s=c[_],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(_,1);break e}}s=l.createElement(n),Nn(s,n,a),l.head.appendChild(s);break;default:throw Error(r(468,n))}s[Et]=t,je(s),n=s}t.stateNode=n}else En||ud(c,t.type,t.stateNode);else t.stateNode=B0(c,a,t.memoizedProps);else l!==a?(l===null?(n=s.stateNode,n===null||Le||n.parentNode.removeChild(n)):l.count--,a===null?En||ud(c,t.type,t.stateNode):B0(c,a,t.memoizedProps)):a===null&&t.stateNode!==null&&ph(t,t.memoizedProps,s.memoizedProps);break;case 27:Vn(n,t,a),Xn(t),l&512&&(Le||s===null||Un(s,s.return)),s!==null&&l&4&&ph(t,t.memoizedProps,s.memoizedProps);break;case 5:if(c=Wi,Wi=!1,Vn(n,t,a),Wi=c,Xn(t),l&512&&(Le||s===null||Un(s,s.return)),t.flags&32){n=t.stateNode;try{dr(n,""),De=!0}catch(et){Pe(t,t.return,et)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,ph(t,n,s!==null?s.memoizedProps:n)),l&1024&&(xh=!0);break;case 6:if(Vn(n,t,a),Xn(t),l&4){if(t.stateNode===null)throw Error(r(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,De=!0}catch(et){Pe(t,t.return,et)}}break;case 3:if(De=!1,Qu=null,c=wi,wi=_l(n.containerInfo),Vn(n,t,a),wi=c,Xn(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Kr(n.containerInfo)}catch(et){Pe(t,t.return,et)}xh&&(xh=!1,L_(t)),De=!1;break;case 4:l=Wi,Wi=En,s=$p(),c=wi,wi=_l(t.stateNode.containerInfo),Vn(n,t,a),Xn(t),wi=c,De&&ll&&(Ou=!0),De=s,Wi=l;break;case 12:Vn(n,t,a),Xn(t);break;case 31:Vn(n,t,a),Xn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,zu(t,n)));break;case 13:Vn(n,t,a),Xn(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Fu=X()),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,zu(t,n)));break;case 22:c=t.memoizedState!==null,_=s!==null&&s.memoizedState!==null;var E=En,L=Le,q=Wi;En=E||c,Wi=q||c,Le=L||_,Vn(n,t,a),Le=L,Wi=q,En=E,Xn(t),l&8192&&(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,!c||s===null||_||En||Le||(n=_||Le,a=En,s=Le,En=c||En,Le=n,Za(t,2),En=a,Le=s),!c&&Wi||Th(t,c)),l&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,zu(t,a))));break;case 19:Vn(n,t,a),Xn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,zu(t,n)));break;case 30:l&512&&(Le||s===null||Un(s,s.return)),l=$p(),c=ll,_=(a&335544064)===a,E=t.memoizedProps,ll=_&&ca(E.default,E.update)!=="none",Vn(n,t,a),Xn(t),_&&s!==null&&De&&(t.flags|=4),ll=c,De=l;break;case 21:break;case 7:l&512&&(Le||s===null||Un(s,s.return)),s&&s.stateNode!==null&&(s.stateNode._fragmentFiber=t);default:Vn(n,t,a),Xn(t)}}function Xn(t){var n=t.flags;if(n&2){try{for(var a,s=t.return;s!==null;){if(__(s)){a=s;break}s=s.return}s=null;for(var l=t.return;l!==null;){if(hh(l)){var c=l.stateNode;s===null?s=[c]:s.push(c)}if(fh(l))break;l=l.return}var _=s;if(a==null)throw Error(r(160));switch(a.tag){case 27:var E=a.stateNode,L=mh(t);Du(t,L,E,_);break;case 5:var q=a.stateNode;a.flags&32&&(dr(q,""),a.flags&=-33);var et=mh(t);Du(t,et,q,_);break;case 3:case 4:var ft=a.stateNode.containerInfo,k=mh(t);gh(t,k,ft,_);break;default:throw Error(r(161))}}catch($){Pe(t,t.return,$)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function L_(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;L_(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Zr=!0,n.reset(),Zr=!1),t=t.sibling}}function Nr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)O_(n,t),n=n.sibling;else T_(n)}function O_(t,n){var a=t.alternate;if(a===null)_h(t,!1);else switch(t.tag){case 3:if(Eh=ji=!1,S_(),Nr(n,t),!ji&&!Ou){if(t=Yi,t!==null)for(var s=0;s<t.length;s+=3){a=t[s];var l=t[s+1];M0(a,t[s+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+l+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Eh=!0}Yi=null;break;case 5:Nr(n,t);break;case 4:s=ji,ji=!1,Nr(n,t),ji&&(Ou=!0),ji=s;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?_h(t,!1):Nr(n,t));break;case 30:s=ji,l=S_(),ji=!1,Nr(n,t),ji&&(t.flags|=4);var c=t.memoizedProps,_=t.stateNode;n=ua(c,_),_=ua(a.memoizedProps,_);var E=ca(c.default,c.update);E==="none"?n=!1:(c=a.memoizedState,a.memoizedState=null,a=t.child,jn=0,n=Mh(t,a,n,_,E,c,!0),jn!==(c===null?0:c.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Fr(t,t.memoizedProps.onUpdate),Yi=l):l!==null&&(l.push.apply(l,Yi),Yi=l),ji=(t.flags&32)!==0?!0:s;break;default:Nr(n,t)}}function Zi(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)A_(t,n.alternate,n),n=n.sibling}function Za(t,n){for(t=t.child;t!==null;){var a=t,s=n;switch(a.tag){case 0:case 11:case 14:case 15:ja(4,a,a.return),Za(a,s);break;case 1:Un(a,a.return);var l=a.stateNode;typeof l.componentWillUnmount=="function"&&m_(a,a.return,l),Za(a,s);break;case 27:(s&2)!==0&&L0(a.stateNode,a.type,a.memoizedProps);case 5:Un(a,a.return),a.tag!==5&&a.tag!==27||ol(a),Za(a,s);break;case 6:ol(a);break;case 26:Un(a,a.return),l=a.stateNode,a.memoizedState!==null||l===null||Le||l.parentNode.removeChild(l),Za(a,s);break;case 22:a.memoizedState===null&&Za(a,s);break;case 30:Un(a,a.return),Za(a,s);break;case 7:Un(a,a.return);default:Za(a,s)}t=t.sibling}}function Di(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var s=n.alternate,l=t,c=n,_=c.flags,E=(a&1)!==0;switch(c.tag){case 0:case 11:case 15:Di(l,c,a),rl(4,c);break;case 1:if(Di(l,c,a),s=c,l=s.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(et){Pe(s,s.return,et)}if(s=c,l=s.updateQueue,l!==null){var L=s.stateNode;try{var q=l.shared.hiddenCallbacks;if(q!==null)for(l.shared.hiddenCallbacks=null,l=0;l<q.length;l++)ng(q[l],L)}catch(et){Pe(s,s.return,et)}}E&&_&64&&p_(c),ki(c,c.return);break;case 27:(a&2)!==0&&v_(c);case 5:c.tag!==5&&c.tag!==27||g_(c),Di(l,c,a),E&&s===null&&_&4&&dh(c),ki(c,c.return);break;case 6:g_(c);break;case 26:L=c.stateNode,c.memoizedState!==null||L===null||En||ud(_l(L.ownerDocument),c.type,L),Di(l,c,a),E&&s===null&&_&4&&dh(c),ki(c,c.return);break;case 12:Di(l,c,a);break;case 31:Di(l,c,a),E&&_&4&&D_(l,c);break;case 13:Di(l,c,a),E&&_&4&&U_(l,c);break;case 22:c.memoizedState===null&&Di(l,c,a),ki(c,c.return);break;case 30:Di(l,c,a),ki(c,c.return);break;case 7:ki(c,c.return);default:Di(l,c,a)}n=n.sibling}}function Ah(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Wo(a))}function Rh(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Wo(t))}function Mi(t,n,a,s){var l=(a&335544064)===a;if(n.subtreeFlags&(l?10262:10256))for(n=n.child;n!==null;)P_(t,n,a,s),n=n.sibling;else l&&E_(n)}function P_(t,n,a,s){var l=(a&335544064)===a;l&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Lu(n);var c=n.flags;switch(n.tag){case 0:case 11:case 15:Mi(t,n,a,s),c&2048&&rl(9,n);break;case 1:Mi(t,n,a,s);break;case 3:Mi(t,n,a,s),l&&Eh&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),c&2048&&(c=null,n.alternate!==null&&(c=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==c&&(n.refCount++,c!=null&&Wo(c)));break;case 12:if(c&2048){Mi(t,n,a,s),c=n.stateNode;try{var _=n.memoizedProps,E=_.id,L=_.onPostCommit;typeof L=="function"&&L(E,n.alternate===null?"mount":"update",c.passiveEffectDuration,-0)}catch(q){Pe(n,n.return,q)}}else Mi(t,n,a,s);break;case 31:Mi(t,n,a,s);break;case 13:Mi(t,n,a,s);break;case 23:break;case 22:_=n.stateNode,E=n.alternate,n.memoizedState!==null?(l&&E!==null&&E.memoizedState===null&&Lu(E),_._visibility&2?Mi(t,n,a,s):ul(t,n)):(l&&E!==null&&E.memoizedState!==null&&Lu(n),_._visibility&2?Mi(t,n,a,s):(_._visibility|=2,Lr(t,n,a,s,(n.subtreeFlags&10256)!==0||!1))),c&2048&&Ah(E,n);break;case 24:Mi(t,n,a,s),c&2048&&Rh(n.alternate,n);break;case 30:l&&(c=n.alternate,c!==null&&(qi(c.child,!0),qi(n.child,!0))),Mi(t,n,a,s);break;default:Mi(t,n,a,s)}}function Lr(t,n,a,s,l){for(l=l&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=t,_=n,E=a,L=s,q=_.flags;switch(_.tag){case 0:case 11:case 15:Lr(c,_,E,L,l),rl(8,_);break;case 23:break;case 22:var et=_.stateNode;_.memoizedState!==null?et._visibility&2?Lr(c,_,E,L,l):ul(c,_):(et._visibility|=2,Lr(c,_,E,L,l)),l&&q&2048&&Ah(_.alternate,_);break;case 24:Lr(c,_,E,L,l),l&&q&2048&&Rh(_.alternate,_);break;default:Lr(c,_,E,L,l)}n=n.sibling}}function ul(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,s=n,l=s.flags;switch(s.tag){case 22:ul(a,s),l&2048&&Ah(s.alternate,s);break;case 24:ul(a,s),l&2048&&Rh(s.alternate,s);break;default:ul(a,s)}n=n.sibling}}var Bs=8192;function Fs(t,n,a){if(t.subtreeFlags&Bs)for(t=t.child;t!==null;)z_(t,n,a),t=t.sibling}function z_(t,n,a){switch(t.tag){case 26:Fs(t,n,a),t.flags&Bs&&(t.memoizedState!==null?Mx(a,wi,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&X0(a,t)));break;case 5:Fs(t,n,a),t.flags&Bs&&(t=t.stateNode,(n&335544128)===n&&X0(a,t));break;case 3:case 4:var s=wi;wi=_l(t.stateNode.containerInfo),Fs(t,n,a),wi=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=Bs,Bs=16777216,Fs(t,n,a),Bs=s):Fs(t,n,a));break;case 30:if((t.flags&Bs)!==0&&(s=t.memoizedProps.name,s!=null&&s!=="auto")){var l=t.stateNode;l.paired=null,si===null&&(si=new Map),si.set(s,l)}Fs(t,n,a);break;default:Fs(t,n,a)}}function I_(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function cl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];Tn=s,F_(s,t)}I_(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)B_(t),t=t.sibling}function B_(t){switch(t.tag){case 0:case 11:case 15:cl(t),t.flags&2048&&ja(9,t,t.return);break;case 3:cl(t);break;case 12:cl(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Iu(t)):cl(t);break;default:cl(t)}}function Iu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];Tn=s,F_(s,t)}I_(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:ja(8,n,n.return),Iu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Iu(n));break;default:Iu(n)}t=t.sibling}}function F_(t,n){for(;Tn!==null;){var a=Tn;switch(a.tag){case 0:case 11:case 15:ja(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var s=a.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Wo(a.memoizedState.cache)}if(s=a.child,s!==null)s.return=a,Tn=s;else t:for(a=t;Tn!==null;){s=Tn;var l=s.sibling,c=s.return;if(C_(s),s===a){Tn=null;break t}if(l!==null){l.return=c,Tn=l;break t}Tn=c}}}var gM={getCacheForType:function(t){var n=Cn(rn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Cn(rn).controller.signal}},_M=typeof WeakMap=="function"?WeakMap:Map,Ne=0,Xe=null,ye=null,Ee=0,Oe=0,ri=null,Ka=!1,Or=!1,Ch=!1,ya=0,en=0,Qa=0,Hs=0,Bu=0,oi=0,Pr=0,fl=null,Kn=null,wh=!1,Fu=0,H_=0,Hu=1/0,Gu=null,Ja=null,$e=0,Ui=null,Gs=null,Ki=0,Dh=0,Uh=null,G_=null,zr=null,Ir=null,Br=null,hl=0,Vu=null;function li(){return(Ne&2)!==0&&Ee!==0?Ee&-Ee:At.T!==null?Gh():K()}function V_(){if(oi===0)if((Ee&536870912)===0||de){var t=Ms;Ms<<=1,(Ms&3932160)===0&&(Ms=262144),oi=t}else oi=536870912;return t=wn.current,t!==null&&(t.flags|=32),oi}function Fr(t,n){if(n!=null){var a=t.stateNode,s=a.ref;s===null&&(s=a.ref=x0(ua(t.memoizedProps,a))),Ir===null&&(Ir=[]),Ir.push(n.bind(null,s))}}function Qn(t,n,a){(t===Xe&&(Oe===2||Oe===9)||t.cancelPendingCommit!==null)&&(Hr(t,0),$a(t,Ee,oi,!1)),xs(t,a),((Ne&2)===0||t!==Xe)&&(t===Xe&&((Ne&2)===0&&(Hs|=a),en===4&&$a(t,Ee,oi,!1)),Qi(t))}function X_(t,n,a){if((Ne&6)!==0)throw Error(r(327));var s=!a&&(n&127)===0&&(n&t.expiredLanes)===0||La(t,n),l=s?SM(t,n):Lh(t,n,!0),c=s;do{if(l===0){Or&&!s&&$a(t,n,0,!1);break}else{if(a=t.current.alternate,c&&!vM(a)){l=Lh(t,n,!1),c=!1;continue}if(l===2){if(c=n,t.errorRecoveryDisabledLanes&c)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var E=t;l=fl;var L=E.current.memoizedState.isDehydrated;if(L&&(Hr(E,_).flags|=256),_=Lh(E,_,!1),_!==2&&_!==6){if(Ch&&!L){E.errorRecoveryDisabledLanes|=c,Hs|=c,l=4;break t}c=Kn,Kn=l,c!==null&&(Kn===null?Kn=c:Kn.push.apply(Kn,c))}l=_}if(c=!1,l!==2)continue}}if(l===1){Hr(t,0),$a(t,n,0,!0);break}t:{switch(s=t,c=l,c){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:$a(s,n,oi,!Ka);break t;case 2:Kn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(l=Fu+300-X(),10<l)){if($a(s,n,oi,!Ka),sa(s,0,!0)!==0)break t;Ki=n,s.timeoutHandle=Jh(k_.bind(null,s,a,Kn,Gu,wh,n,oi,Hs,Pr,Ka,c,"Throttled",-0,0),l);break t}k_(s,a,Kn,Gu,wh,n,oi,Hs,Pr,Ka,c,null,-0,0)}}break}while(!0);Qi(t)}function k_(t,n,a,s,l,c,_,E,L,q,et,ft,k,$){t.timeoutHandle=-1;var Ct=n.subtreeFlags,Xt=(c&335544064)===c;if(ft=null,(Xt||Ct&8192||(Ct&16785408)===16785408)&&(ft={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Gi},si=null,z_(n,c,ft),Xt&&(Ct=ft,Xt=t.containerInfo,Xt=(Xt.nodeType===9?Xt:Xt.ownerDocument).__reactViewTransition,Xt!=null&&(Ct.count++,Ct.waitingForViewTransition=!0,Ct=Sl.bind(Ct),Xt.finished.then(Ct,Ct))),Ct=(c&62914560)===c?Fu-X():(c&4194048)===c?H_-X():0,Ct=xx(ft,Ct),Ct!==null)){Ki=c,t.cancelPendingCommit=Ct(J_.bind(null,t,n,c,a,s,l,_,E,L,q,et,ft,null,k,$)),$a(t,c,_,!q);return}J_(t,n,c,a,s,l,_,E,L,q,et,ft)}function vM(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var s=0;s<a.length;s++){var l=a[s],c=l.getSnapshot;l=l.value;try{if(!ii(c(),l))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function $a(t,n,a,s){n=Oo(t,n),n&=~Bu,n&=~Hs,t.suspendedLanes|=n,t.pingedLanes&=~n,s&&(t.warmLanes|=n),s=t.expirationTimes;for(var l=n;0<l;){var c=31-Pn(l),_=1<<c;s[c]=-1,l&=~_}a!==0&&Hl(t,a,n)}function Xu(){return(Ne&6)===0?(dl(0),!1):!0}function Nh(){if(ye!==null){if(Oe===0)var t=ye.return;else t=ye,da=Cs=null,Hf(t),Ar=null,Ko=0,t=ye;for(;t!==null;)d_(t.alternate,t),t=t.return;ye=null}}function Hr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,VM(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Ki=0,Nh(),Xe=t,ye=a=fa(t.current,null),Ee=n,Oe=0,ri=null,Ka=!1,Or=La(t,n),Ch=!1,Pr=oi=Bu=Hs=Qa=en=0,Kn=fl=null,wh=!1,ya=Oo(t,n),Ql(),a}function Y_(t,n){le=null,At.H=xu,n===br||n===lu?(n=Jm(),Oe=3):n===Rf?(n=Jm(),Oe=4):Oe=n===eh?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ri=n,ye===null&&(en=1,Eu(t,_i(n,t.current)))}function q_(){var t=wn.current;return t===null?!0:(Ee&4194048)===Ee?In===null:(Ee&62914560)===Ee||(Ee&536870912)!==0?t===In:!1}function W_(){var t=At.H;return At.H=xu,t===null?xu:t}function j_(){var t=At.A;return At.A=gM,t}function ku(){en=4,Ka||(Ee&4194048)!==Ee&&wn.current!==null||(Or=!0),(Qa&134217727)===0&&(Hs&134217727)===0||Xe===null||$a(Xe,Ee,oi,!1)}function Lh(t,n,a){var s=Ne;Ne|=2;var l=W_(),c=j_();(Xe!==t||Ee!==n)&&(Gu=null,Hr(t,n)),n=!1;var _=en;t:do try{if(Oe!==0&&ye!==null){var E=ye,L=ri;switch(Oe){case 8:Nh(),_=6;break t;case 3:case 2:case 9:case 6:wn.current===null&&(n=!0);var q=Oe;if(Oe=0,ri=null,Gr(t,E,L,q),a&&Or){_=0;break t}break;default:q=Oe,Oe=0,ri=null,Gr(t,E,L,q)}}yM(),_=en;break}catch(et){Y_(t,et)}while(!0);return n&&t.shellSuspendCounter++,da=Cs=null,Ne=s,At.H=l,At.A=c,ye===null&&(Xe=null,Ee=0,Ql()),_}function yM(){for(;ye!==null;)Z_(ye)}function SM(t,n){var a=Ne;Ne|=2;var s=W_(),l=j_();Xe!==t||Ee!==n?(Gu=null,Hu=X()+500,Hr(t,n)):Or=La(t,n);t:do try{if(Oe!==0&&ye!==null){n=ye;var c=ri;e:switch(Oe){case 1:Oe=0,ri=null,Gr(t,n,c,1);break;case 2:case 9:if(Km(c)){Oe=0,ri=null,K_(n);break}n=function(){Oe!==2&&Oe!==9||Xe!==t||(Oe=7),Qi(t)},c.then(n,n);break t;case 3:Oe=7;break t;case 4:Oe=5;break t;case 7:Km(c)?(Oe=0,ri=null,K_(n)):(Oe=0,ri=null,Gr(t,n,c,7));break;case 5:var _=null;switch(ye.tag){case 26:_=ye.memoizedState;case 5:case 27:var E=ye;if(_?G0(_):E.stateNode.complete){Oe=0,ri=null;var L=E.sibling;if(L!==null)ye=L;else{var q=E.return;q!==null?(ye=q,Yu(q)):ye=null}break e}}Oe=0,ri=null,Gr(t,n,c,5);break;case 6:Oe=0,ri=null,Gr(t,n,c,6);break;case 8:Nh(),en=6;break t;default:throw Error(r(462))}}MM();break}catch(et){Y_(t,et)}while(!0);return da=Cs=null,At.H=s,At.A=l,Ne=a,ye!==null?0:(Xe=null,Ee=0,Ql(),en)}function MM(){for(;ye!==null&&!oe();)Z_(ye)}function Z_(t){var n=f_(t.alternate,t,ya);t.memoizedProps=t.pendingProps,n===null?Yu(t):ye=n}function K_(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=a_(a,n,n.pendingProps,n.type,void 0,Ee);break;case 11:n=a_(a,n,n.pendingProps,n.type.render,n.ref,Ee);break;case 5:Hf(n);var s=n;s===xn&&(de?(iu(s),s.tag===5&&s.stateNode!=null&&(Ye=s.stateNode)):(iu(s),de=!0));default:d_(a,n),n=ye=Fm(n,ya),n=f_(a,n,ya)}t.memoizedProps=t.pendingProps,n===null?Yu(t):ye=n}function Gr(t,n,a,s){da=Cs=null,Hf(n),Ar=null,Ko=0;var l=n.return;try{if(lM(t,l,n,a,Ee)){en=1,Eu(t,_i(a,t.current)),ye=null;return}}catch(c){if(l!==null)throw ye=l,c;en=1,Eu(t,_i(a,t.current)),ye=null;return}n.flags&32768?(de||s===1?t=!0:Or||(Ee&536870912)!==0?t=!1:(Ka=t=!0,(s===2||s===9||s===3||s===6)&&(s=wn.current,s!==null&&s.tag===13&&(s.flags|=16384))),Q_(n,t)):Yu(n)}function Yu(t){var n=t;do{if((n.flags&32768)!==0){Q_(n,Ka);return}t=n.return;var a=hM(n.alternate,n,ya);if(a!==null){ye=a;return}if(n=n.sibling,n!==null){ye=n;return}ye=n=t}while(n!==null);en===0&&(en=5)}function Q_(t,n){do{var a=dM(t.alternate,t);if(a!==null){a.flags&=32767,ye=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){ye=t;return}ye=t=a}while(t!==null);en=6,ye=null}function J_(t,n,a,s,l,c,_,E,L,q,et,ft){t.cancelPendingCommit=null;do qu();while($e!==0);if((Ne&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));t===Xe&&(ye=Xe=null,Ee=0),Gs=n,Ui=t,Ki=a,Uh=l,G_=s,xM(t,n,a,_,E,L,ft)}}function xM(t,n,a,s,l,c,_){var E=n.lanes|n.childLanes;if(Dh=E,E|=pf,kc(t,a,E,s,l,c),Ir=null,(a&335544064)===a?(Br=KS(t),s=10262):(Br=null,s=10256),(n.subtreeFlags&s)!==0||(n.flags&s)!==0?(t.callbackNode=null,t.callbackPriority=0,CM(Ot,function(){return Ih(),null})):(t.callbackNode=null,t.callbackPriority=0),Uu=!1,s=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||s){s=At.T,At.T=null,l=It.p,It.p=2,c=Ne,Ne|=4;try{pM(t,n,a)}finally{Ne=c,It.p=l,At.T=s}}$e=1,Uu?zr=jM(_,t.containerInfo,Br,Oh,Ph,TM,zh,Ih,EM):(Oh(),Ph(),zh())}function EM(t){if($e!==0){var n=Ui.onRecoverableError;n(t,{componentStack:null})}}function TM(){$e===3&&($e=0,O_(Gs,Ui),$e=4)}function Oh(){if($e===1){$e=0;var t=Ui,n=Gs,a=Ki,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=At.T,At.T=null;var l=It.p;It.p=2;var c=Ne;Ne|=4;try{ll=Ou=!1,N_(n,t,a),a=Zh;var _=wm(t.containerInfo),E=a.focusedElem,L=a.selectionRange;if(_!==E&&E&&E.ownerDocument&&Cm(E.ownerDocument.documentElement,E)){if(L!==null&&uf(E)){var q=L.start,et=L.end;if(et===void 0&&(et=q),"selectionStart"in E)E.selectionStart=q,E.selectionEnd=Math.min(et,E.value.length);else{var ft=E.ownerDocument||document,k=ft&&ft.defaultView||window;if(k.getSelection){var $=k.getSelection(),Ct=E.textContent.length,Xt=Math.min(L.start,Ct),ue=L.end===void 0?Xt:Math.min(L.end,Ct);!$.extend&&Xt>ue&&(_=ue,ue=Xt,Xt=_);var Y=Rm(E,Xt),F=Rm(E,ue);if(Y&&F&&($.rangeCount!==1||$.anchorNode!==Y.node||$.anchorOffset!==Y.offset||$.focusNode!==F.node||$.focusOffset!==F.offset)){var J=ft.createRange();J.setStart(Y.node,Y.offset),$.removeAllRanges(),Xt>ue?($.addRange(J),$.extend(F.node,F.offset)):(J.setEnd(F.node,F.offset),$.addRange(J))}}}}for(ft=[],$=E;$=$.parentNode;)$.nodeType===1&&ft.push({element:$,left:$.scrollLeft,top:$.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<ft.length;E++){var ct=ft[E];ct.element.scrollLeft=ct.left,ct.element.scrollTop=ct.top}}Zr=!!jh,Zh=jh=null}finally{Ne=c,It.p=l,At.T=s}}t.current=n,$e=2}}function Ph(){if($e===2){$e=0;var t=Ui,n=Gs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=At.T,At.T=null;var s=It.p;It.p=2;var l=Ne;Ne|=4;try{A_(t,n.alternate,n)}finally{Ne=l,It.p=s,At.T=a}}$e=3}}function zh(){if($e===4||$e===3){$e=0;var t=zr;zr=null,Ie();var n=Ui,a=Gs,s=Ki,l=G_,c=(s&335544064)===s?10262:10256;if((a.subtreeFlags&c)!==0||(a.flags&c)!==0?$e=5:($e=0,Gs=Ui=null,$_(n,n.pendingLanes)),c=n.pendingLanes,c===0&&(Ja=null),rt(s),a=a.stateNode,We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(Ae,a,void 0,(a.current.flags&128)===128)}catch{}if(l!==null){a=At.T,c=It.p,It.p=2,At.T=null;try{for(var _=n.onRecoverableError,E=0;E<l.length;E++){var L=l[E];_(L.value,{componentStack:L.stack})}}finally{At.T=a,It.p=c}}if(l=Ir,_=Br,Br=null,l!==null&&(Ir=null,_===null&&(_=[]),t!==null))for(L=0;L<l.length;L++)a=(0,l[L])(_),a!==void 0&&t.finished.finally(a);(Ki&3)!==0&&qu(),Qi(n),c=n.pendingLanes,(s&261930)!==0&&(c&42)!==0?n===Vu?hl++:(hl=0,Vu=n):(hl=0,Vu=null),dl(0)}}function $_(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Wo(n)))}function qu(){return zr!==null&&(zr.skipTransition(),zr=null),Oh(),Ph(),zh(),Ih()}function Ih(){if($e!==5)return!1;var t=Ui,n=Dh;Dh=0;var a=rt(Ki),s=At.T,l=It.p;try{It.p=32>a?32:a,At.T=null,a=Uh,Uh=null;var c=Ui,_=Ki;if($e=0,Gs=Ui=null,Ki=0,(Ne&6)!==0)throw Error(r(331));var E=Ne;if(Ne|=4,B_(c.current),P_(c,c.current,_,a),Ne=E,dl(0,!1),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(Ae,c)}catch{}return!0}finally{It.p=l,At.T=s,$_(t,n)}}function t0(t,n,a){n=_i(a,n),n=th(t.stateNode,n,2),t=ka(t,n,2),t!==null&&(xs(t,2),Qi(t))}function Pe(t,n,a){if(t.tag===3)t0(t,t,a);else for(;n!==null;){if(n.tag===3){t0(n,t,a);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Ja===null||!Ja.has(s))){t=_i(a,t),a=Kg(2),s=ka(n,a,2),s!==null&&(Qg(a,s,n,t),xs(s,2),Qi(s));break}}n=n.return}}function Bh(t,n,a){var s=t.pingCache;if(s===null){s=t.pingCache=new _M;var l=new Set;s.set(n,l)}else l=s.get(n),l===void 0&&(l=new Set,s.set(n,l));l.has(a)||(Ch=!0,l.add(a),t=bM.bind(null,t,n,a),n.then(t,t))}function bM(t,n,a){var s=t.pingCache;s!==null&&s.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Xe===t&&(Ee&a)===a&&((en===4||en===3&&(Ee&62914560)===Ee&&300>X()-Fu)&&(Ne&2)===0?Hr(t,0):Bu|=a,Pr===Ee&&(Pr=0)),Qi(t)}function e0(t,n){n===0&&(n=Fl()),t=bs(t,n),t!==null&&(xs(t,n),Qi(t))}function AM(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),e0(t,a)}function RM(t,n){var a=0;switch(t.tag){case 31:case 13:var s=t.stateNode,l=t.memoizedState;l!==null&&(a=l.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(n),e0(t,a)}function CM(t,n){return Ft(t,n)}var Vr=null,Xr=null,Fh=!1,Wu=!1,Hh=!1,ts=0;function Qi(t){t!==Xr&&t.next===null&&(Xr===null?Vr=Xr=t:Xr=Xr.next=t),Wu=!0,Fh||(Fh=!0,DM())}function dl(t,n){if(!Hh&&Wu){Hh=!0;do for(var a=!1,s=Vr;s!==null;){if(t!==0){var l=s.pendingLanes;if(l===0)var c=0;else{var _=s.suspendedLanes,E=s.pingedLanes;c=(1<<31-Pn(42|t)+1)-1,c&=l&~(_&~E),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(a=!0,s0(s,c))}else c=Ee,c=sa(s,s===Xe?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||La(s,c)||(a=!0,s0(s,c));s=s.next}while(a);Hh=!1}}function wM(){n0()}function n0(){Wu=Fh=!1;var t=0;ts!==0&&GM()&&(t=ts);for(var n=X(),a=null,s=Vr;s!==null;){var l=s.next,c=i0(s,n);c===0?(s.next=null,a===null?Vr=l:a.next=l,l===null&&(Xr=a)):(a=s,(t!==0||(c&3)!==0)&&(Wu=!0)),s=l}$e!==0&&$e!==5||dl(t),ts!==0&&(ts=0)}function i0(t,n){for(var a=t.suspendedLanes,s=t.pingedLanes,l=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var _=31-Pn(c),E=1<<_,L=l[_];L===-1?((E&a)===0||(E&s)!==0)&&(l[_]=Xc(E,n)):L<=n&&(t.expiredLanes|=E),c&=~E}if(n=Xe,a=Ee,a=sa(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,a===0||t===n&&(Oe===2||Oe===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&pe(s),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||La(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(s!==null&&pe(s),rt(a)){case 2:case 8:a=_t;break;case 32:a=Ot;break;case 268435456:a=re;break;default:a=Ot}return s=a0.bind(null,t),a=Ft(a,s),t.callbackPriority=n,t.callbackNode=a,n}return s!==null&&s!==null&&pe(s),t.callbackPriority=2,t.callbackNode=null,2}function a0(t,n){if($e!==0&&$e!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(qu()&&t.callbackNode!==a)return null;var s=Ee;return s=sa(t,t===Xe?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(X_(t,s,n),i0(t,X()),t.callbackNode!=null&&t.callbackNode===a?a0.bind(null,t):null)}function s0(t,n){if(qu())return null;X_(t,n,!0)}function DM(){XM(function(){(Ne&6)!==0?Ft(lt,wM):n0()})}function Gh(){if(ts===0){var t=Us;t===0&&(t=Ss,Ss<<=1,(Ss&261888)===0&&(Ss=256)),ts=t}return ts}function r0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Xl(t)}function UM(t,n,a,s,l){if(n==="submit"&&a&&a.stateNode===l){var c=r0((l[Dt]||null).action),_=s.submitter;_&&(n=(n=_[Dt]||null)?r0(n.formAction):_.getAttribute("formAction"),n!==null&&(c=n,_=null));var E=new Wl("action","action",null,s,l);t.push({event:E,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(ts!==0){var L=new FormData(l,_);Zf(a,{pending:!0,data:L,method:l.method,action:c},null,L)}}else typeof c=="function"&&(E.preventDefault(),L=new FormData(l,_),Zf(a,{pending:!0,data:L,method:l.method,action:c},c,L))},currentTarget:l}]})}}for(var Vh=0;Vh<df.length;Vh++){var Xh=df[Vh],NM=Xh.toLowerCase(),LM=Xh[0].toUpperCase()+Xh.slice(1);Ri(NM,"on"+LM)}Ri(Nm,"onAnimationEnd"),Ri(Lm,"onAnimationIteration"),Ri(Om,"onAnimationStart"),Ri("dblclick","onDoubleClick"),Ri("focusin","onFocus"),Ri("focusout","onBlur"),Ri(VS,"onTransitionRun"),Ri(XS,"onTransitionStart"),Ri(kS,"onTransitionCancel"),Ri(Pm,"onTransitionEnd"),pn("onMouseEnter",["mouseout","mouseover"]),pn("onMouseLeave",["mouseout","mouseover"]),pn("onPointerEnter",["pointerout","pointerover"]),pn("onPointerLeave",["pointerout","pointerover"]),sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),sn("onBeforeInput",["compositionend","keypress","textInput","paste"]),sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var pl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),OM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(pl));function o0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var s=t[a],l=s.event;s=s.listeners;t:{var c=void 0;if(n)for(var _=s.length-1;0<=_;_--){var E=s[_],L=E.instance,q=E.currentTarget;if(E=E.listener,L!==c&&l.isPropagationStopped())break t;c=E,l.currentTarget=q;try{c(l)}catch(et){Kl(et)}l.currentTarget=null,c=L}else for(_=0;_<s.length;_++){if(E=s[_],L=E.instance,q=E.currentTarget,E=E.listener,L!==c&&l.isPropagationStopped())break t;c=E,l.currentTarget=q;try{c(l)}catch(et){Kl(et)}l.currentTarget=null,c=L}}}}function Se(t,n){var a=n[ne];a===void 0&&(a=n[ne]=new Set);var s=t+"__bubble";a.has(s)||(l0(n,t,2,!1),a.add(s))}function kh(t,n,a){var s=0;n&&(s|=4),l0(a,t,s,n)}var ju="_reactListening"+Math.random().toString(36).slice(2);function Yh(t){if(!t[ju]){t[ju]=!0,Oa.forEach(function(a){a!=="selectionchange"&&(OM.has(a)||kh(a,!1,t),kh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[ju]||(n[ju]=!0,kh("selectionchange",!1,n))}}function l0(t,n,a,s){switch(Q0(n)){case 2:var l=Ax;break;case 8:l=Rx;break;default:l=fd}a=l.bind(null,n,a,t),l=void 0,!Jc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),s?l!==void 0?t.addEventListener(n,a,{capture:!0,passive:l}):t.addEventListener(n,a,!0):l!==void 0?t.addEventListener(n,a,{passive:l}):t.addEventListener(n,a,!1)}function qh(t,n,a,s,l){var c=s;if((n&1)===0&&(n&2)===0&&s!==null)t:for(;;){if(s===null)return;var _=s.tag;if(_===3||_===4){var E=s.stateNode.containerInfo;if(E===l)break;if(_===4)for(_=s.return;_!==null;){var L=_.tag;if((L===3||L===4)&&_.stateNode.containerInfo===l)return;_=_.return}for(;E!==null;){if(_=qt(E),_===null)return;if(L=_.tag,L===5||L===6||L===26||L===27){s=c=_;continue t}E=E.parentNode}}s=s.return}lm(function(){var q=c,et=Kc(a),ft=[];t:{var k=zm.get(t);if(k!==void 0){var $=Wl,Ct=t;switch(t){case"keypress":if(Yl(a)===0)break t;case"keydown":case"keyup":$=vS;break;case"focusin":Ct="focus",$=nf;break;case"focusout":Ct="blur",$=nf;break;case"beforeblur":case"afterblur":$=nf;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":$=fm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":$=rS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":$=ES;break;case Nm:case Lm:case Om:$=uS;break;case Pm:$=bS;break;case"scroll":case"scrollend":$=aS;break;case"wheel":$=RS;break;case"copy":case"cut":case"paste":$=fS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":$=dm;break;case"submit":$=MS;break;case"toggle":case"beforetoggle":$=wS}var Xt=(n&4)!==0,ue=!Xt&&(t==="scroll"||t==="scrollend"),Y=Xt?k!==null?k+"Capture":null:k;Xt=[];for(var F=q,J;F!==null;){var ct=F;if(J=ct.stateNode,ct=ct.tag,ct!==5&&ct!==26&&ct!==27||J===null||Y===null||(ct=zo(F,Y),ct!=null&&Xt.push(ml(F,ct,J))),ue)break;F=F.return}0<Xt.length&&(k=new $(k,Ct,null,a,et),ft.push({event:k,listeners:Xt}))}}if((n&7)===0){t:{if($=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",$&&a!==Zc&&(Ct=a.relatedTarget||a.fromElement)&&(qt(Ct)||Ct[Jt]))break t;(k||$)&&(Ct=et.window===et?et:($=et.ownerDocument)?$.defaultView||$.parentWindow:window,k?($=a.relatedTarget||a.toElement,k=q,$=$?qt($):null,$!==null&&(ue=f($),Xt=$.tag,$!==ue||Xt!==5&&Xt!==27&&Xt!==6)&&($=null)):(k=null,$=q),k!==$&&(Xt=fm,ct="onMouseLeave",Y="onMouseEnter",F="mouse",(t==="pointerout"||t==="pointerover")&&(Xt=dm,ct="onPointerLeave",Y="onPointerEnter",F="pointer"),ue=k==null?Ct:xe(k),J=$==null?Ct:xe($),Ct=new Xt(ct,F+"leave",k,a,et),Ct.target=ue,Ct.relatedTarget=J,ct=null,qt(et)===q&&(Xt=new Xt(Y,F+"enter",$,a,et),Xt.target=J,Xt.relatedTarget=ue,ct=Xt),ue=ct,Xt=k&&$?H(k,$,PM):null,k!==null&&u0(ft,Ct,k,Xt,!1),$!==null&&ue!==null&&u0(ft,ue,$,Xt,!0)))}t:{if(k=q?xe(q):window,$=k.nodeName&&k.nodeName.toLowerCase(),$==="select"||$==="input"&&k.type==="file")var Bt=Mm;else if(ym(k))if(xm)Bt=FS;else{Bt=IS;var Te=zS}else $=k.nodeName,!$||$.toLowerCase()!=="input"||k.type!=="checkbox"&&k.type!=="radio"?q&&jc(q.elementType)&&(Bt=Mm):Bt=BS;if(Bt&&(Bt=Bt(t,q))){Sm(ft,Bt,a,et);break t}Te&&Te(t,k,q)}switch(Te=q?xe(q):window,t){case"focusin":(ym(Te)||Te.contentEditable==="true")&&(_r=Te,cf=q,ko=null);break;case"focusout":ko=cf=_r=null;break;case"mousedown":ff=!0;break;case"contextmenu":case"mouseup":case"dragend":ff=!1,Dm(ft,a,et);break;case"selectionchange":if(GS)break;case"keydown":case"keyup":Dm(ft,a,et)}var jt;if(sf)t:{switch(t){case"compositionstart":var $t="onCompositionStart";break t;case"compositionend":$t="onCompositionEnd";break t;case"compositionupdate":$t="onCompositionUpdate";break t}$t=void 0}else gr?_m(t,a)&&($t="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&($t="onCompositionStart");$t&&(pm&&a.locale!=="ko"&&(gr||$t!=="onCompositionStart"?$t==="onCompositionEnd"&&gr&&(jt=um()):(Pa=et,$c="value"in Pa?Pa.value:Pa.textContent,gr=!0)),Te=Zu(q,$t),0<Te.length&&($t=new hm($t,t,null,a,et),ft.push({event:$t,listeners:Te}),jt?$t.data=jt:(jt=vm(a),jt!==null&&($t.data=jt)))),(jt=US?NS(t,a):LS(t,a))&&($t=Zu(q,"onBeforeInput"),0<$t.length&&(Te=new hm("onBeforeInput","beforeinput",null,a,et),ft.push({event:Te,listeners:$t}),Te.data=jt)),UM(ft,t,q,a,et)}o0(ft,n)})}function ml(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Zu(t,n){for(var a=n+"Capture",s=[];t!==null;){var l=t,c=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||c===null||(l=zo(t,a),l!=null&&s.unshift(ml(t,l,c)),l=zo(t,n),l!=null&&s.push(ml(t,l,c))),t.tag===3)return s;t=t.return}return[]}function PM(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function u0(t,n,a,s,l){for(var c=n._reactName,_=[];a!==null&&a!==s;){var E=a,L=E.alternate,q=E.stateNode;if(E=E.tag,L!==null&&L===s)break;E!==5&&E!==26&&E!==27||q===null||(L=q,l?(q=zo(a,c),q!=null&&_.unshift(ml(a,q,L))):l||(q=zo(a,c),q!=null&&_.push(ml(a,q,L)))),a=a.return}_.length!==0&&t.push({event:n,listeners:_})}var zM=/\r\n?/g,IM=/\u0000|\uFFFD/g;function c0(t){return(typeof t=="string"?t:""+t).replace(zM,`
`).replace(IM,"")}function f0(t,n){return n=c0(n),c0(t)===n}function ze(t,n,a,s,l,c){switch(a){case"children":if(typeof s=="string")n==="body"||n==="textarea"&&s===""||dr(t,s);else if(typeof s=="number"||typeof s=="bigint")n!=="body"&&dr(t,""+s);else return;break;case"className":Vl(t,"class",s);break;case"tabIndex":Vl(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Vl(t,a,s);break;case"style":rm(t,s,c);return;case"data":if(n!=="object"){Vl(t,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Xl(s),t.setAttribute(a,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(a==="formAction"?(n!=="input"&&ze(t,n,"name",l.name,l,null),ze(t,n,"formEncType",l.formEncType,l,null),ze(t,n,"formMethod",l.formMethod,l,null),ze(t,n,"formTarget",l.formTarget,l,null)):(ze(t,n,"encType",l.encType,l,null),ze(t,n,"method",l.method,l,null),ze(t,n,"target",l.target,l,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Xl(s),t.setAttribute(a,s);break;case"onClick":s!=null&&(t.onclick=Gi);return;case"onScroll":s!=null&&Se("scroll",t);return;case"onScrollEnd":s!=null&&Se("scrollend",t);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(l.children!=null)throw Error(r(60));(c!=null?c.__html:void 0)!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}a=Xl(s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":s===!0?t.setAttribute(a,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(a,s):t.removeAttribute(a);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(a):t.setAttribute(a,s);break;case"popover":Se("beforetoggle",t),Se("toggle",t),Gl(t,"popover",s);break;case"xlinkActuate":oa(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":oa(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":oa(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":oa(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":oa(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":oa(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":oa(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":oa(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":oa(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":Gl(t,"is",s);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=nS.get(a)||a,Gl(t,a,s);else return}De=!0}function Wh(t,n,a,s,l,c){switch(a){case"style":rm(t,s,c);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(l.children!=null)throw Error(r(60));(c!=null?c.__html:void 0)!==a&&(t.innerHTML=a)}}break;case"children":if(typeof s=="string")dr(t,s);else if(typeof s=="number"||typeof s=="bigint")dr(t,""+s);else return;break;case"onScroll":s!=null&&Se("scroll",t);return;case"onScrollEnd":s!=null&&Se("scrollend",t);return;case"onClick":s!=null&&(t.onclick=Gi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Ve.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),c=a.slice(2,l?a.length-7:void 0),n=t[Dt]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(c,n,l),typeof s=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(c,s,l);break t}De=!0,a in t?t[a]=s:s===!0?t.setAttribute(a,""):Gl(t,a,s)}return}De=!0}function Nn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",t),Se("load",t);var s=!1,l=!1,c;for(c in a)if(a.hasOwnProperty(c)){var _=a[c];if(_!=null)switch(c){case"src":s=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:ze(t,n,c,_,a,null)}}l&&ze(t,n,"srcSet",a.srcSet,a,null),s&&ze(t,n,"src",a.src,a,null);return;case"input":Se("invalid",t);var E=c=_=l=null,L=null,q=null;for(s in a)if(a.hasOwnProperty(s)){var et=a[s];if(et!=null)switch(s){case"name":l=et;break;case"type":_=et;break;case"checked":L=et;break;case"defaultChecked":q=et;break;case"value":c=et;break;case"defaultValue":E=et;break;case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(r(137,n));break;default:ze(t,n,s,et,a,null)}}nm(t,c,E,L,q,_,l,!1);return;case"select":Se("invalid",t),s=_=c=null;for(l in a)if(a.hasOwnProperty(l)&&(E=a[l],E!=null))switch(l){case"value":c=E;break;case"defaultValue":_=E;break;case"multiple":s=E;default:ze(t,n,l,E,a,null)}n=c,a=_,t.multiple=!!s,n!=null?hr(t,!!s,n,!1):a!=null&&hr(t,!!s,a,!0);return;case"textarea":Se("invalid",t),c=l=s=null;for(_ in a)if(a.hasOwnProperty(_)&&(E=a[_],E!=null))switch(_){case"value":s=E;break;case"defaultValue":l=E;break;case"children":c=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(91));break;default:ze(t,n,_,E,a,null)}am(t,s,l,c);return;case"option":for(L in a)if(a.hasOwnProperty(L)&&(s=a[L],s!=null))switch(L){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:ze(t,n,L,s,a,null)}return;case"dialog":Se("beforetoggle",t),Se("toggle",t),Se("cancel",t),Se("close",t);break;case"iframe":case"object":Se("load",t);break;case"video":case"audio":for(s=0;s<pl.length;s++)Se(pl[s],t);break;case"image":Se("error",t),Se("load",t);break;case"details":Se("toggle",t);break;case"embed":case"source":case"link":Se("error",t),Se("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(q in a)if(a.hasOwnProperty(q)&&(s=a[q],s!=null))switch(q){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:ze(t,n,q,s,a,null)}return;default:if(jc(n)){for(et in a)a.hasOwnProperty(et)&&(s=a[et],s!==void 0&&Wh(t,n,et,s,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(s=a[E],s!=null&&ze(t,n,E,s,a,null))}var BM={};function FM(t,n,a,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,c=null,_=null,E=null,L=null,q=null,et=null;for($ in a){var ft=a[$];if(a.hasOwnProperty($)&&ft!=null)switch($){case"checked":break;case"value":break;case"defaultValue":L=ft;default:s.hasOwnProperty($)||ze(t,n,$,null,s,ft)}}for(var k in s){var $=s[k];if(ft=a[k],s.hasOwnProperty(k)&&($!=null||ft!=null))switch(k){case"type":$!==ft&&(De=!0),c=$;break;case"name":$!==ft&&(De=!0),l=$;break;case"checked":$!==ft&&(De=!0),q=$;break;case"defaultChecked":$!==ft&&(De=!0),et=$;break;case"value":$!==ft&&(De=!0),_=$;break;case"defaultValue":$!==ft&&(De=!0),E=$;break;case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(r(137,n));break;default:$!==ft&&ze(t,n,k,$,s,ft)}}qc(t,_,E,L,q,et,c,l);return;case"select":$=_=E=k=null;for(c in a)if(L=a[c],a.hasOwnProperty(c)&&L!=null)switch(c){case"value":break;case"multiple":$=L;default:s.hasOwnProperty(c)||ze(t,n,c,null,s,L)}for(l in s)if(c=s[l],L=a[l],s.hasOwnProperty(l)&&(c!=null||L!=null))switch(l){case"value":c!==L&&(De=!0),k=c;break;case"defaultValue":c!==L&&(De=!0),E=c;break;case"multiple":c!==L&&(De=!0),_=c;default:c!==L&&ze(t,n,l,c,s,L)}n=E,a=_,s=$,k!=null?hr(t,!!a,k,!1):!!s!=!!a&&(n!=null?hr(t,!!a,n,!0):hr(t,!!a,a?[]:"",!1));return;case"textarea":$=k=null;for(E in a)if(l=a[E],a.hasOwnProperty(E)&&l!=null&&!s.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:ze(t,n,E,null,s,l)}for(_ in s)if(l=s[_],c=a[_],s.hasOwnProperty(_)&&(l!=null||c!=null))switch(_){case"value":l!==c&&(De=!0),k=l;break;case"defaultValue":l!==c&&(De=!0),$=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(r(91));break;default:l!==c&&ze(t,n,_,l,s,c)}im(t,k,$);return;case"option":for(var Ct in a)if(k=a[Ct],a.hasOwnProperty(Ct)&&k!=null&&!s.hasOwnProperty(Ct))switch(Ct){case"selected":t.selected=!1;break;default:ze(t,n,Ct,null,s,k)}for(L in s)if(k=s[L],$=a[L],s.hasOwnProperty(L)&&k!==$&&(k!=null||$!=null))switch(L){case"selected":k!==$&&(De=!0),t.selected=k&&typeof k!="function"&&typeof k!="symbol";break;default:ze(t,n,L,k,s,$)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Xt in a)k=a[Xt],a.hasOwnProperty(Xt)&&k!=null&&!s.hasOwnProperty(Xt)&&ze(t,n,Xt,null,s,k);for(q in s)if(k=s[q],$=a[q],s.hasOwnProperty(q)&&k!==$&&(k!=null||$!=null))switch(q){case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(r(137,n));break;default:ze(t,n,q,k,s,$)}return;default:if(jc(n)){for(var ue in a)k=a[ue],a.hasOwnProperty(ue)&&k!==void 0&&!s.hasOwnProperty(ue)&&Wh(t,n,ue,void 0,s,k);for(et in s)k=s[et],$=a[et],!s.hasOwnProperty(et)||k===$||k===void 0&&$===void 0||Wh(t,n,et,k,s,$);return}}for(var Y in a)k=a[Y],a.hasOwnProperty(Y)&&k!=null&&!s.hasOwnProperty(Y)&&ze(t,n,Y,null,s,k);for(ft in s)k=s[ft],$=a[ft],!s.hasOwnProperty(ft)||k===$||k==null&&$==null||ze(t,n,ft,k,s,$)}function h0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function HM(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),s=0;s<a.length;s++){var l=a[s],c=l.transferSize,_=l.initiatorType,E=l.duration;if(c&&E&&h0(_)){for(_=0,E=l.responseEnd,s+=1;s<a.length;s++){var L=a[s],q=L.startTime;if(q>E)break;var et=L.transferSize,ft=L.initiatorType;et&&h0(ft)&&(L=L.responseEnd,_+=et*(L<E?1:(E-q)/(L-q)))}if(--s,n+=8*(c+_)/(l.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var jh=null,Zh=null;function gl(t){return t.nodeType===9?t:t.ownerDocument}function d0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function p0(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function m0(t,n,a,s){return a=gl(a).createElement(t),a[Et]=s,a[Dt]=n,Nn(a,t,n),je(a),a}function Kh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Qh=null;function GM(){var t=window.event;return t&&t.type==="popstate"?t===Qh?!1:(Qh=t,!0):(Qh=null,!1)}var Jh=typeof setTimeout=="function"?setTimeout:void 0,VM=typeof clearTimeout=="function"?clearTimeout:void 0,g0=typeof Promise=="function"?Promise:void 0,_0=typeof requestAnimationFrame=="function"?requestAnimationFrame:Jh,XM=typeof queueMicrotask=="function"?queueMicrotask:typeof g0<"u"?function(t){return g0.resolve(null).then(t).catch(kM)}:Jh;function kM(t){setTimeout(function(){throw t})}function es(t){return t==="head"}function v0(t,n){var a=n,s=0;do{var l=a.nextSibling;if(t.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(s===0){t.removeChild(l),Kr(n);return}s--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")s++;else if(a==="html")rd(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,rd(a);for(var c=a.firstChild;c;){var _=c.nextSibling,E=c.nodeName;c[ke]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&c.rel.toLowerCase()==="stylesheet"||a.removeChild(c),c=_}}else a==="body"&&rd(t.ownerDocument.body);a=l}while(a);Kr(n)}function y0(t,n){var a=t;t=0;do{var s=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=s}while(a)}function S0(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var s=1;else for(var l=s=0;l<n.length;l++){var c=n[l];0<c.width&&0<c.height&&s++}s===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function M0(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function YM(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function $h(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return YM(n,a,t)}function qM(t){return t.documentElement.clientHeight}function WM(t){this.addEventListener("load",t),this.addEventListener("error",t)}function jM(t,n,a,s,l,c,_,E,L){var q=n.nodeType===9?n:n.ownerDocument;try{var et=q.startViewTransition({update:function(){var k=q.defaultView,$=k.navigation&&k.navigation.transition,Ct=q.fonts.status;s();var Xt=[];if(Ct==="loaded"&&(qM(q),q.fonts.status==="loading"&&Xt.push(q.fonts.ready)),Ct=Xt.length,t!==null)for(var ue=t.suspenseyImages,Y=0,F=0;F<ue.length;F++){var J=ue[F];if(!J.complete){var ct=J.getBoundingClientRect();if(0<ct.bottom&&0<ct.right&&ct.top<k.innerHeight&&ct.left<k.innerWidth){if(Y+=V0(J),Y>Ju){Xt.length=Ct;break}J=new Promise(WM.bind(J)),Xt.push(J)}}}if(0<Xt.length)return k=Promise.race([Promise.all(Xt),new Promise(function(Bt){return setTimeout(Bt,500)})]).then(l,l),($?Promise.allSettled([$.finished,k]):k).then(c,c);if(l(),$)return $.finished.then(c,c);c()},types:a});q.__reactViewTransition=et;var ft=[];return et.ready.then(function(){for(var k=q.documentElement.getAnimations({subtree:!0}),$=0;$<k.length;$++){var Ct=k[$],Xt=Ct.effect,ue=Xt.pseudoElement;if(ue!=null&&ue.startsWith("::view-transition")){ft.push(Ct),Ct=Xt.getKeyframes();for(var Y=ue=void 0,F=!0,J=0;J<Ct.length;J++){var ct=Ct[J],Bt=ct.width;if(ue===void 0)ue=Bt;else if(ue!==Bt){F=!1;break}if(Bt=ct.height,Y===void 0)Y=Bt;else if(Y!==Bt){F=!1;break}delete ct.width,delete ct.height,ct.transform==="none"&&delete ct.transform}F&&ue!==void 0&&Y!==void 0&&(Xt.setKeyframes(Ct),F=getComputedStyle(Xt.target,Xt.pseudoElement),F.width!==ue||F.height!==Y)&&(F=Ct[0],F.width=ue,F.height=Y,F=Ct[Ct.length-1],F.width=ue,F.height=Y,Xt.setKeyframes(Ct))}}_()},function(k){q.__reactViewTransition===et&&(q.__reactViewTransition=null);try{if(typeof k=="object"&&k!==null)switch(k.name){case"InvalidStateError":(k.message==="View transition was skipped because document visibility state is hidden."||k.message==="Skipping view transition because document visibility state has become hidden."||k.message==="Skipping view transition because viewport size changed."||k.message==="Transition was aborted because of invalid state")&&(k=null)}k!==null&&L(k)}finally{s(),l(),_()}}),et.finished.finally(function(){for(var k=0;k<ft.length;k++)ft[k].cancel();q.__reactViewTransition===et&&(q.__reactViewTransition=null),E()}),et}catch{return s(),l(),_(),null}}function Vs(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Vs.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:O({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Vs.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),s=[],l=0;l<a.length;l++){var c=a[l].effect;c!==null&&c.target===t&&c.pseudoElement===n&&s.push(a[l])}return s},Vs.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function x0(t){return{name:t,group:new Vs("group",t),imagePair:new Vs("image-pair",t),old:new Vs("old",t),new:new Vs("new",t)}}function ui(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ui.prototype.addEventListener=function(t,n,a){var s=null,l=null;if(!(a!=null&&typeof a!="boolean"&&(s=a.signal||null,s!==null&&s.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var c=this._eventListeners;if(T0(c,t,n,a)===-1){var _=this,E=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(E=function(L){_.removeEventListener(t,n,a),typeof n=="function"?n.call(this,L):n.handleEvent(L)}),s!==null&&(l=_.removeEventListener.bind(_,t,n,a),s.addEventListener("abort",l,{once:!0}),l=s.removeEventListener.bind(s,"abort",l)),s=kr(a),c.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:E,cleanup:l}),g(this._fragmentFiber.child,!1,ZM,t,E,s)}this._eventListeners=c}};function ZM(t,n,a,s){return M(t).addEventListener(n,a,s),!1}ui.prototype.removeEventListener=function(t,n,a){var s=this._eventListeners;if(s!==null&&(n=T0(s,t,n,a),n!==-1)){var l=s[n];a=l.attachedListener;var c=l.cleanup;l=kr(l.optionsOrUseCapture),g(this._fragmentFiber.child,!1,KM,t,a,l),s.splice(n,1),c!==null&&c()}};function KM(t,n,a,s){return M(t).removeEventListener(n,a,s),!1}function kr(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function E0(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function T0(t,n,a,s){if(t.length===0)return-1;s=E0(s);for(var l=0;l<t.length;l++){var c=t[l];if(c.type===n&&c.listener===a&&E0(c.optionsOrUseCapture)===s)return l}return-1}ui.prototype.dispatchEvent=function(t){var n=y(this._fragmentFiber);if(n===null)return!0;n=M(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var s=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var l=0;l<a.length;l++){var c=a[l];s.addEventListener(c.type,c.attachedListener,kr(c.optionsOrUseCapture))}if(n.appendChild(s),t=s.dispatchEvent(t),a)for(l=0;l<a.length;l++)c=a[l],s.removeEventListener(c.type,c.attachedListener,kr(c.optionsOrUseCapture));return n.removeChild(s),t}return n.dispatchEvent(t)},ui.prototype.focus=function(t){g(this._fragmentFiber.child,!0,b0,t,void 0,void 0)};function b0(t,n){return t.tag===6?!1:(t=M(t),lx(t,n))}ui.prototype.focusLast=function(t){var n=[];g(this._fragmentFiber.child,!0,td,n,void 0,void 0);for(var a=n.length-1;0<=a&&!b0(n[a],t);a--);};function td(t,n){return n.push(t),!1}ui.prototype.blur=function(){var t=y(this._fragmentFiber);t!==null&&(t=M(t),t=gl(t).activeElement,t!==null&&g(this._fragmentFiber.child,!1,QM,t,void 0,void 0))};function QM(t,n){return t.tag===6?!1:(t=M(t),t===n||t.contains(n)?(n.blur(),!0):!1)}ui.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),g(this._fragmentFiber.child,!1,JM,t,void 0,void 0)};function JM(t,n){return t.tag===6||(t=M(t),n.observe(t)),!1}ui.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),g(this._fragmentFiber.child,!1,$M,t,void 0,void 0);for(var a=n=0;a<Ni.length;a++){var s=Ni[a];s.fragmentInstance===this&&s.observer===t?t.unobserve(s.instance):Ni[n++]=s}Ni.length=n}};function $M(t,n){return t.tag===6||(t=M(t),n.unobserve(t)),!1}var Ni=[],ed=!1;function tx(t,n,a){Ni.push({fragmentInstance:t,observer:n,instance:a}),ed||(ed=!0,ux(function(){ed=!1;var s=Ni;Ni=[];for(var l=0;l<s.length;l++){var c=s[l];c.observer.unobserve(c.instance)}}))}ui.prototype.getClientRects=function(){var t=[];return g(this._fragmentFiber.child,!1,ex,t,void 0,void 0),t};function ex(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=M(t),n.push.apply(n,t.getClientRects());return!1}ui.prototype.getRootNode=function(t){var n=y(this._fragmentFiber);return n===null?this:M(n).getRootNode(t)},ui.prototype.compareDocumentPosition=function(t){var n=y(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];g(this._fragmentFiber.child,!1,td,a,void 0,void 0);var s=M(n);if(a.length===0){if(a=s,x(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var l=s=a.compareDocumentPosition(t);return a===t?l=Node.DOCUMENT_POSITION_CONTAINS:s&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=b(n)[1],a===null?l=Node.DOCUMENT_POSITION_PRECEDING:(t=M(a).compareDocumentPosition(t),l=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),l|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=M(a[0]),l=M(a[a.length-1]);var c=x(this._fragmentFiber)?n.parentElement:s;if(c==null)return Node.DOCUMENT_POSITION_DISCONNECTED;s=c.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,c=c.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY;var _=n.compareDocumentPosition(t),E=l.compareDocumentPosition(t),L=_&Node.DOCUMENT_POSITION_CONTAINED_BY||E&Node.DOCUMENT_POSITION_CONTAINED_BY;return E=s&&c&&_&Node.DOCUMENT_POSITION_FOLLOWING&&E&Node.DOCUMENT_POSITION_PRECEDING,n=s&&n===t||c&&l===t||L||E?Node.DOCUMENT_POSITION_CONTAINED_BY:!s&&n===t||!c&&l===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:_,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||nx(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function nx(t,n,a,s,l){var c=qt(l);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!c)t:{for(;c!==null;){if(c.tag===7&&(c===n||c.alternate===n)){a=!0;break t}c=c.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(c===null)return c=l.ownerDocument,l===c||l===c.documentElement||l===c.body;t:{for(c=n,n=y(n);c!==null;){if(!(c.tag!==5&&c.tag!==3&&c.tag!==27||c!==n&&c.alternate!==n)){c=!0;break t}c=c.return}c=!1}return c}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!c)&&!(n=c===a)&&(n=H(a,c,V),n===null?n=!1:(g(n,!0,P,c,a),c=S,S=null,n=c!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!c)&&!(n=c===s)&&(n=H(s,c,V),n===null?n=!1:(g(n,!0,U,c,s),c=S,z=S=null,n=c!==null)),n):!1}function A0(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ui.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(r(566));var n=[];g(this._fragmentFiber.child,!1,td,n,void 0,void 0);var a=t!==!1;if(n.length===0){var s=b(this._fragmentFiber);if(s=a?s[1]||s[0]||y(this._fragmentFiber):s[0]||s[1],s===null)return;if(s.tag===6){t=M(s),A0(t,a);return}if(s=M(s),s.nodeType!==9){if(s.nodeType===11){a="host"in s?s.host:null,a!==null&&a.scrollIntoView(t);return}s.scrollIntoView(t)}}for(s=a?n.length-1:0;s!==(a?-1:n.length);){var l=n[s];l.tag===6?(l=M(l),A0(l,a)):M(l).scrollIntoView(t),s+=a?-1:1}};function ix(t,n){return t=M(t),R0(t,n),!1}function R0(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function C0(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var l=a[s];t.addEventListener(l.type,l.attachedListener,kr(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){for(var _=0,E=0;E<Ni.length;E++){var L=Ni[E];(L.fragmentInstance!==n||L.observer!==c||L.instance!==t)&&(Ni[_++]=L)}Ni.length=_,c.observe(t)}),R0(t,n))}function ax(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var l=a[s];t.removeEventListener(l.type,l.attachedListener,kr(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){typeof c.rootMargin=="string"?tx(n,c,t):c.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function nd(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":nd(a),ve(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function sx(t,n,a,s){for(;t.nodeType===1;){var l=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[ke])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var c=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=xi(t.nextSibling),t===null)break}return null}function rx(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=xi(t.nextSibling),t===null))return null;return t}function w0(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=xi(t.nextSibling),t===null))return null;return t}function id(t){return t.data==="$?"||t.data==="$~"}function ad(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function ox(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var s=function(){n(),a.removeEventListener("DOMContentLoaded",s)};a.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function xi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var sd=null;function D0(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return xi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function U0(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function lx(t,n){function a(){s=!0}if(t.ownerDocument.activeElement===t)return!0;var s=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return s}function ux(t){_0(function(){_0(function(n){return t(n)})})}function N0(t,n,a){switch(n=gl(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function L0(t,n,a){for(var s in a){var l=a[s];a.hasOwnProperty(s)&&l!=null&&ze(t,n,s,null,BM,l)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Gi&&(t.onclick=null),ve(t)}function rd(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);ve(t)}var Ei=new Map,O0=new Set;function _l(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var Sa=It.d;It.d={f:cx,r:fx,D:hx,C:dx,L:px,m:mx,X:_x,S:gx,M:vx};function cx(){var t=Sa.f(),n=Xu();return t||n}function fx(t){var n=Qe(t);n!==null&&n.tag===5&&n.type==="form"?zg(n):Sa.r(t)}var Yr=typeof document>"u"?null:document;function P0(t,n,a){var s=Yr;if(s&&typeof n=="string"&&n){var l=mi(n);l='link[rel="'+t+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),O0.has(l)||(O0.add(l),t={rel:t,crossOrigin:a,href:n},s.querySelector(l)===null&&(n=s.createElement("link"),Nn(n,"link",t),je(n),s.head.appendChild(n)))}}function hx(t){Sa.D(t),P0("dns-prefetch",t,null)}function dx(t,n){Sa.C(t,n),P0("preconnect",t,n)}function px(t,n,a){Sa.L(t,n,a);var s=Yr;if(s&&t&&n){var l='link[rel="preload"][as="'+mi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+mi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+mi(a.imageSizes)+'"]')):l+='[href="'+mi(t)+'"]';var c=l;switch(n){case"style":c=qr(t);break;case"script":c=Wr(t)}if(!(Ei.has(c)||(t=O({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Ei.set(c,t),s.querySelector(l)!==null||n==="style"&&s.querySelector(vl(c))||n==="script"&&s.querySelector(yl(c))))){var _=s.createElement("link");Nn(_,"link",t),n==="style"&&(_[Ge]=!0,_.onload=_.onerror=function(){zn(_)}),je(_),s.head.appendChild(_)}}}function mx(t,n){Sa.m(t,n);var a=Yr;if(a&&t){var s=n&&typeof n.as=="string"?n.as:"script",l='link[rel="modulepreload"][as="'+mi(s)+'"][href="'+mi(t)+'"]',c=l;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=Wr(t)}if(!Ei.has(c)&&(t=O({rel:"modulepreload",href:t},n),Ei.set(c,t),a.querySelector(l)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(yl(c)))return}s=a.createElement("link"),Nn(s,"link",t),je(s),a.head.appendChild(s)}}}function gx(t,n,a){Sa.S(t,n,a);var s=Yr;if(s&&t){var l=Mn(s).hoistableStyles,c=qr(t);n=n||"default";var _=l.get(c);if(!_){var E={loading:0,preload:null};if(_=s.querySelector(vl(c)))E.loading=5;else{t=O({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Ei.get(c))&&od(t,a);var L=_=s.createElement("link");je(L),Nn(L,"link",t),L._p=new Promise(function(q,et){L.onload=q,L.onerror=et}),L.addEventListener("load",function(){E.loading|=1}),L.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Ku(_,n,s)}_={type:"stylesheet",instance:_,count:1,state:E},l.set(c,_)}}}function _x(t,n){Sa.X(t,n);var a=Yr;if(a&&t){var s=Mn(a).hoistableScripts,l=Wr(t),c=s.get(l);c||(c=a.querySelector(yl(l)),c||(t=O({src:t,async:!0},n),(n=Ei.get(l))&&ld(t,n),c=a.createElement("script"),je(c),Nn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(l,c))}}function vx(t,n){Sa.M(t,n);var a=Yr;if(a&&t){var s=Mn(a).hoistableScripts,l=Wr(t),c=s.get(l);c||(c=a.querySelector(yl(l)),c||(t=O({src:t,async:!0,type:"module"},n),(n=Ei.get(l))&&ld(t,n),c=a.createElement("script"),je(c),Nn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(l,c))}}function z0(t,n,a,s){var l=(l=N.current)?_l(l):null;if(!l)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=qr(a.href),n=Mn(l).hoistableStyles,s=n.get(a),s||(s={type:"style",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=qr(a.href);var c=Mn(l).hoistableStyles,_=c.get(t);if(_||(l=l.ownerDocument||l,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,_),(c=l.querySelector(vl(t)))?c._p||(_.instance=c,_.state.loading=5):(c=Ei.get(t),c||(c={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ei.set(t,c)),yx(l,t,c,_.state))),n&&s===null)throw Error(r(528,""));return _}if(n&&s!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Wr(a),n=Mn(l).hoistableScripts,s=n.get(a),s||(s={type:"script",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function qr(t){return'href="'+mi(t)+'"'}function vl(t){return'link[rel="stylesheet"]['+t+"]"}function I0(t){return O({},t,{"data-precedence":t.precedence,precedence:null})}function yx(t,n,a,s){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Ge]!==!0){s.loading=1;return}}else n=t.createElement("link"),n[Ge]=!0,n.onload=n.onerror=zn.bind(null,n),Nn(n,"link",a),je(n),t.head.appendChild(n);s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2})}function Wr(t){return'[src="'+mi(t)+'"]'}function yl(t){return"script[async]"+t}function B0(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var s=t.querySelector('style[data-href~="'+mi(a.href)+'"]');if(s)return n.instance=s,je(s),s;var l=O({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),je(s),Nn(s,"style",l),Ku(s,a.precedence,t),n.instance=s;case"stylesheet":l=qr(a.href);var c=t.querySelector(vl(l));if(c)return n.state.loading|=4,n.instance=c,je(c),c;s=I0(a),(l=Ei.get(l))&&od(s,l),c=(t.ownerDocument||t).createElement("link"),je(c);var _=c;return _._p=new Promise(function(E,L){_.onload=E,_.onerror=L}),Nn(c,"link",s),n.state.loading|=4,Ku(c,a.precedence,t),n.instance=c;case"script":return c=Wr(a.src),(l=t.querySelector(yl(c)))?(n.instance=l,je(l),l):(s=a,(l=Ei.get(c))&&(s=O({},a),ld(s,l)),t=t.ownerDocument||t,l=t.createElement("script"),je(l),Nn(l,"link",s),t.head.appendChild(l),n.instance=l);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(s=n.instance,n.state.loading|=4,Ku(s,a.precedence,t));return n.instance}function Ku(t,n,a){for(var s=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=s.length?s[s.length-1]:null,c=l,_=0;_<s.length;_++){var E=s[_];if(E.dataset.precedence===n)c=E;else if(c!==l)break}c?c.parentNode.insertBefore(t,c.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function od(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function ld(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Qu=null;function F0(t,n,a){if(Qu===null){var s=new Map,l=Qu=new Map;l.set(a,s)}else l=Qu,s=l.get(a),s||(s=new Map,l.set(a,s));if(s.has(t))return s;for(s.set(t,null),a=a.getElementsByTagName(t),l=0;l<a.length;l++){var c=a[l];if(!(c[ke]||c[Et]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var _=c.getAttribute(n)||"";_=t+_;var E=s.get(_);E?E.push(c):s.set(_,[c])}}return s}function ud(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Sx(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function H0(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function G0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function V0(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function X0(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=V0(n),t.suspenseyImages.push(n)),t=Ex.bind(t),n.decode().then(t,t))}function Mx(t,n,a,s){if(a.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=qr(s.href),c=n.querySelector(vl(l));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Sl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=c,je(c);return}c=n.ownerDocument||n,s=I0(s),(l=Ei.get(l))&&od(s,l),c=c.createElement("link"),je(c);var _=c;_._p=new Promise(function(E,L){_.onload=E,_.onerror=L}),Nn(c,"link",s),a.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Sl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Ju=0;function xx(t,n){return t.stylesheets&&t.count===0&&tc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var s=setTimeout(function(){if(t.stylesheets&&tc(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+n);0<t.imgBytes&&Ju===0&&(Ju=62500*HM());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&tc(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>Ju?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(l)}}:null}function k0(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)tc(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function Sl(){this.count--,k0(this)}function Ex(){this.imgCount--,k0(this)}var $u=null;function tc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,$u=new Map,n.forEach(Tx,t),$u=null,Sl.call(t))}function Tx(t,n){if(!(n.state.loading&4)){var a=$u.get(t);if(a)var s=a.get(null);else{a=new Map,$u.set(t,a);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<l.length;c++){var _=l[c];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),s=_)}s&&a.set(null,s)}l=n.instance,_=l.getAttribute("data-precedence"),c=a.get(_)||s,c===s&&a.set(null,l),a.set(_,l),this.count++,s=Sl.bind(this),l.addEventListener("load",s),l.addEventListener("error",s),c?c.parentNode.insertBefore(l,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),n.state.loading|=4}}var jr={$$typeof:ht,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function bx(t,n,a,s,l,c,_,E,L){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Po(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Po(0),this.hiddenUpdates=Po(null),this.identifierPrefix=s,this.onUncaughtError=l,this.onCaughtError=c,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=L,this.transitionTypes=null,this.incompleteTransitions=new Map}function Y0(t,n,a,s,l,c,_,E,L,q,et,ft){return t=new bx(t,n,a,_,L,q,et,ft,E),n=1,c===!0&&(n|=24),c=Wn(3,null,null,n),t.current=c,c.stateNode=t,n=Tf(),n.refCount++,t.pooledCache=n,n.refCount++,c.memoizedState={element:s,isDehydrated:a,cache:n},Cf(c),t}function q0(t){return t?(t=Sr,t):Sr}function W0(t,n,a,s,l,c){l=q0(l),s.context===null?s.context=l:s.pendingContext=l,s=Xa(n),s.payload={element:a},c=c===void 0?null:c,c!==null&&(s.callback=c),a=ka(t,s,n),a!==null&&(Qn(a,t,n),Qo(a,t,n))}function j0(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function cd(t,n){j0(t,n),(t=t.alternate)&&j0(t,n)}function Z0(t){if(t.tag===13||t.tag===31){var n=bs(t,67108864);n!==null&&Qn(n,t,67108864),cd(t,67108864)}}function K0(t){if(t.tag===13||t.tag===31){var n=li();n=at(n);var a=bs(t,n);a!==null&&Qn(a,t,n),cd(t,n)}}var Zr=!0;function Ax(t,n,a,s){var l=At.T;At.T=null;var c=It.p;try{It.p=2,fd(t,n,a,s)}finally{It.p=c,At.T=l}}function Rx(t,n,a,s){var l=At.T;At.T=null;var c=It.p;try{It.p=8,fd(t,n,a,s)}finally{It.p=c,At.T=l}}function fd(t,n,a,s){if(Zr){var l=hd(s);if(l===null)qh(t,n,s,ec,a),J0(t,s);else if(wx(l,t,n,a,s))s.stopPropagation();else if(J0(t,s),n&4&&-1<Cx.indexOf(t)){for(;l!==null;){var c=Qe(l);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var _=Hi(c.pendingLanes);if(_!==0){var E=c;for(E.pendingLanes|=2,E.entangledLanes|=2;_;){var L=1<<31-Pn(_);E.entanglements[1]|=L,_&=~L}Qi(c),(Ne&6)===0&&(Hu=X()+500,dl(0))}}break;case 31:case 13:E=bs(c,2),E!==null&&Qn(E,c,2),Xu(),cd(c,2)}if(c=hd(s),c===null&&qh(t,n,s,ec,a),c===l)break;l=c}l!==null&&s.stopPropagation()}else qh(t,n,s,null,a)}}function hd(t){return t=Kc(t),dd(t)}var ec=null;function dd(t){if(ec=null,t=qt(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return ec=t,null}function Q0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Lt()){case lt:return 2;case _t:return 8;case Ot:case zt:return 32;case re:return 268435456;default:return 32}default:return 32}}var pd=!1,ns=null,is=null,as=null,Ml=new Map,xl=new Map,ss=[],Cx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function J0(t,n){switch(t){case"focusin":case"focusout":ns=null;break;case"dragenter":case"dragleave":is=null;break;case"mouseover":case"mouseout":as=null;break;case"pointerover":case"pointerout":Ml.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":xl.delete(n.pointerId)}}function El(t,n,a,s,l,c){return t===null||t.nativeEvent!==c?(t={blockedOn:n,domEventName:a,eventSystemFlags:s,nativeEvent:c,targetContainers:[l]},n!==null&&(n=Qe(n),n!==null&&Z0(n)),t):(t.eventSystemFlags|=s,n=t.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),t)}function wx(t,n,a,s,l){switch(n){case"focusin":return ns=El(ns,t,n,a,s,l),!0;case"dragenter":return is=El(is,t,n,a,s,l),!0;case"mouseover":return as=El(as,t,n,a,s,l),!0;case"pointerover":var c=l.pointerId;return Ml.set(c,El(Ml.get(c)||null,t,n,a,s,l)),!0;case"gotpointercapture":return c=l.pointerId,xl.set(c,El(xl.get(c)||null,t,n,a,s,l)),!0}return!1}function $0(t){var n=qt(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Mt(t.priority,function(){K0(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,Mt(t.priority,function(){K0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function nc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=hd(t.nativeEvent);if(a===null){a=t.nativeEvent;var s=new a.constructor(a.type,a);Zc=s,a.target.dispatchEvent(s),Zc=null}else return n=Qe(a),n!==null&&Z0(n),t.blockedOn=a,!1;n.shift()}return!0}function tv(t,n,a){nc(t)&&a.delete(n)}function Dx(){pd=!1,ns!==null&&nc(ns)&&(ns=null),is!==null&&nc(is)&&(is=null),as!==null&&nc(as)&&(as=null),Ml.forEach(tv),xl.forEach(tv)}function ic(t,n){t.blockedOn===n&&(t.blockedOn=null,pd||(pd=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Dx)))}var ac=null;function ev(t){ac!==t&&(ac=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){ac===t&&(ac=null);for(var n=0;n<t.length;n+=3){var a=t[n],s=t[n+1],l=t[n+2];if(typeof s!="function"){if(dd(s||a)===null)continue;break}var c=Qe(a);c!==null&&(t.splice(n,3),n-=3,Zf(c,{pending:!0,data:l,method:a.method,action:s},s,l))}}))}function Kr(t){function n(L){return ic(L,t)}ns!==null&&ic(ns,t),is!==null&&ic(is,t),as!==null&&ic(as,t),Ml.forEach(n),xl.forEach(n);for(var a=0;a<ss.length;a++){var s=ss[a];s.blockedOn===t&&(s.blockedOn=null)}for(;0<ss.length&&(a=ss[0],a.blockedOn===null);)$0(a),a.blockedOn===null&&ss.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(s=0;s<a.length;s+=3){var l=a[s],c=a[s+1],_=l[Dt]||null;if(typeof c=="function")_||ev(a);else if(_){var E=null;if(c&&c.hasAttribute("formAction")){if(l=c,_=c[Dt]||null)E=_.formAction;else if(dd(l)!==null)continue}else E=_.action;typeof E=="function"?a[s+1]=E:(a.splice(s,3),s-=3),ev(a)}}}function nv(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(_){return l=_})},focusReset:"manual",scroll:"manual"})}function n(){l!==null&&(l(),l=null),s||setTimeout(a,20)}function a(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),l!==null&&(l(),l=null)}}}function md(t){this._internalRoot=t}sc.prototype.render=md.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,s=li();W0(a,s,t,n,null,null)},sc.prototype.unmount=md.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;W0(t.current,2,null,t,null,null),Xu(),n[Jt]=null}};function sc(t){this._internalRoot=t}sc.prototype.unstable_scheduleHydration=function(t){if(t){var n=K();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ss.length&&n!==0&&n<ss[a].priority;a++);ss.splice(a,0,t),a===0&&$0(t)}};var iv=e.version;if(iv!=="19.3.0")throw Error(r(527,iv,"19.3.0"));It.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=m(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var Ux={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:At,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rc.isDisabled&&rc.supportsFiber)try{Ae=rc.inject(Ux),We=rc}catch{}}return Tl.createRoot=function(t,n){if(!u(t))throw Error(r(299));var a=!1,s="",l=qg,c=Wg,_=jg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(l=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=Y0(t,1,!1,null,null,a,s,null,l,c,_,nv),t[Jt]=n.current,Yh(t),new md(n)},Tl.hydrateRoot=function(t,n,a){if(!u(t))throw Error(r(299));var s=!1,l="",c=qg,_=Wg,E=jg,L=null;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(c=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(L=a.formState)),n=Y0(t,1,!0,n,a??null,s,l,L,c,_,E,nv),n.context=q0(null),a=n.current,s=li(),s=at(s),l=Xa(s),l.callback=null,ka(a,l,s),a=s,n.current.lanes=a,xs(n,a),Qi(n),t[Jt]=n.current,Yh(t),new sc(n)},Tl.version="19.3.0",Tl}var fv;function Hx(){if(fv)return _d.exports;fv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),_d.exports=Fx(),_d.exports}var Gx=Hx();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),yy=(...o)=>o.filter((e,i,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===i).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Xx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=bi.forwardRef(({color:o="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:u="",children:f,iconNode:h,...d},p)=>bi.createElement("svg",{ref:p,...Xx,width:e,height:e,stroke:o,strokeWidth:r?Number(i)*24/Number(e):i,className:yy("lucide",u),...d},[...h.map(([m,v])=>bi.createElement(m,v)),...Array.isArray(f)?f:[f]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na=(o,e)=>{const i=bi.forwardRef(({className:r,...u},f)=>bi.createElement(kx,{ref:f,iconNode:e,className:yy(`lucide-${Vx(o)}`,r),...u}));return i.displayName=`${o}`,i};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=Na("CameraOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16",key:"qmtpty"}],["path",{d:"M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5",key:"1ufyfc"}],["path",{d:"M14.121 15.121A3 3 0 1 1 9.88 10.88",key:"11zox6"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=Na("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=Na("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=Na("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=Na("Leaf",[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",key:"nnexq3"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",key:"mt58a7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=Na("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=Na("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=Na("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=Na("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bp="173",vo={ROTATE:0,DOLLY:1,PAN:2},mo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},tE=0,hv=1,eE=2,Sy=1,nE=2,Aa=3,Da=0,ei=1,$i=2,ms=0,yo=1,dv=2,pv=3,mv=4,iE=5,Js=100,aE=101,sE=102,rE=103,oE=104,lE=200,uE=201,cE=202,fE=203,Qd=204,Jd=205,hE=206,dE=207,pE=208,mE=209,gE=210,_E=211,vE=212,yE=213,SE=214,$d=0,tp=1,ep=2,xo=3,np=4,ip=5,ap=6,sp=7,Fc=0,ME=1,xE=2,gs=0,EE=1,TE=2,bE=3,My=4,AE=5,RE=6,CE=7,xy=300,Eo=301,To=302,rp=303,op=304,Hc=306,lp=1e3,tr=1001,up=1002,pi=1003,wE=1004,oc=1005,ta=1006,Md=1007,er=1008,Ua=1009,Ey=1010,Ty=1011,Ol=1012,Fp=1013,rr=1014,ea=1015,zl=1016,Hp=1017,Gp=1018,bo=1020,by=35902,Ay=1021,Ry=1022,Ii=1023,Cy=1024,wy=1025,So=1026,Ao=1027,Vp=1028,Xp=1029,Dy=1030,kp=1031,Yp=1033,Dc=33776,Uc=33777,Nc=33778,Lc=33779,cp=35840,fp=35841,hp=35842,dp=35843,pp=36196,mp=37492,gp=37496,_p=37808,vp=37809,yp=37810,Sp=37811,Mp=37812,xp=37813,Ep=37814,Tp=37815,bp=37816,Ap=37817,Rp=37818,Cp=37819,wp=37820,Dp=37821,Oc=36492,Up=36494,Np=36495,Uy=36283,Lp=36284,Op=36285,Pp=36286,DE=3200,UE=3201,qp=0,NE=1,ps="",hi="srgb",Ro="srgb-linear",zc="linear",Fe="srgb",Qr=7680,gv=519,LE=512,OE=513,PE=514,Ny=515,zE=516,IE=517,BE=518,FE=519,_v=35044,HE=35048,vv="300 es",Ra=2e3,Ic=2001;class ur{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const u=r[e];if(u!==void 0){const f=u.indexOf(i);f!==-1&&u.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const u=r.slice(0);for(let f=0,h=u.length;f<h;f++)u[f].call(this,e);e.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yv=1234567;const Nl=Math.PI/180,Pl=180/Math.PI;function Do(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Bn[o&255]+Bn[o>>8&255]+Bn[o>>16&255]+Bn[o>>24&255]+"-"+Bn[e&255]+Bn[e>>8&255]+"-"+Bn[e>>16&15|64]+Bn[e>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]).toLowerCase()}function me(o,e,i){return Math.max(e,Math.min(i,o))}function Wp(o,e){return(o%e+e)%e}function GE(o,e,i,r,u){return r+(o-e)*(u-r)/(i-e)}function VE(o,e,i){return o!==e?(i-o)/(e-o):0}function Ll(o,e,i){return(1-i)*o+i*e}function XE(o,e,i,r){return Ll(o,e,1-Math.exp(-i*r))}function kE(o,e=1){return e-Math.abs(Wp(o,e*2)-e)}function YE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*(3-2*o))}function qE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*o*(o*(o*6-15)+10))}function WE(o,e){return o+Math.floor(Math.random()*(e-o+1))}function jE(o,e){return o+Math.random()*(e-o)}function ZE(o){return o*(.5-Math.random())}function KE(o){o!==void 0&&(yv=o);let e=yv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function QE(o){return o*Nl}function JE(o){return o*Pl}function $E(o){return(o&o-1)===0&&o!==0}function tT(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function eT(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function nT(o,e,i,r,u){const f=Math.cos,h=Math.sin,d=f(i/2),p=h(i/2),m=f((e+r)/2),v=h((e+r)/2),g=f((e-r)/2),y=h((e-r)/2),x=f((r-e)/2),b=h((r-e)/2);switch(u){case"XYX":o.set(d*v,p*g,p*y,d*m);break;case"YZY":o.set(p*y,d*v,p*g,d*m);break;case"ZXZ":o.set(p*g,p*y,d*v,d*m);break;case"XZX":o.set(d*v,p*b,p*x,d*m);break;case"YXY":o.set(p*x,d*v,p*b,d*m);break;case"ZYZ":o.set(p*b,p*x,d*v,d*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+u)}}function ho(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function kn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const ar={DEG2RAD:Nl,RAD2DEG:Pl,generateUUID:Do,clamp:me,euclideanModulo:Wp,mapLinear:GE,inverseLerp:VE,lerp:Ll,damp:XE,pingpong:kE,smoothstep:YE,smootherstep:qE,randInt:WE,randFloat:jE,randFloatSpread:ZE,seededRandom:KE,degToRad:QE,radToDeg:JE,isPowerOfTwo:$E,ceilPowerOfTwo:tT,floorPowerOfTwo:eT,setQuaternionFromProperEuler:nT,normalize:kn,denormalize:ho};class ce{constructor(e=0,i=0){ce.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,u=e.elements;return this.x=u[0]*i+u[3]*r+u[6],this.y=u[1]*i+u[4]*r+u[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=me(this.x,e.x,i.x),this.y=me(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=me(this.x,e,i),this.y=me(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(me(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),u=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*r-h*u+e.x,this.y=f*u+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fe{constructor(e,i,r,u,f,h,d,p,m){fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,u,f,h,d,p,m)}set(e,i,r,u,f,h,d,p,m){const v=this.elements;return v[0]=e,v[1]=u,v[2]=d,v[3]=i,v[4]=f,v[5]=p,v[6]=r,v[7]=h,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,u=i.elements,f=this.elements,h=r[0],d=r[3],p=r[6],m=r[1],v=r[4],g=r[7],y=r[2],x=r[5],b=r[8],w=u[0],M=u[3],S=u[6],z=u[1],P=u[4],U=u[7],V=u[2],H=u[5],O=u[8];return f[0]=h*w+d*z+p*V,f[3]=h*M+d*P+p*H,f[6]=h*S+d*U+p*O,f[1]=m*w+v*z+g*V,f[4]=m*M+v*P+g*H,f[7]=m*S+v*U+g*O,f[2]=y*w+x*z+b*V,f[5]=y*M+x*P+b*H,f[8]=y*S+x*U+b*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],m=e[7],v=e[8];return i*h*v-i*d*m-r*f*v+r*d*p+u*f*m-u*h*p}invert(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],m=e[7],v=e[8],g=v*h-d*m,y=d*p-v*f,x=m*f-h*p,b=i*g+r*y+u*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/b;return e[0]=g*w,e[1]=(u*m-v*r)*w,e[2]=(d*r-u*h)*w,e[3]=y*w,e[4]=(v*i-u*p)*w,e[5]=(u*f-d*i)*w,e[6]=x*w,e[7]=(r*p-m*i)*w,e[8]=(h*i-r*f)*w,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,u,f,h,d){const p=Math.cos(f),m=Math.sin(f);return this.set(r*p,r*m,-r*(p*h+m*d)+h+e,-u*m,u*p,-u*(-m*h+p*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(xd.makeScale(e,i)),this}rotate(e){return this.premultiply(xd.makeRotation(-e)),this}translate(e,i){return this.premultiply(xd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let u=0;u<9;u++)if(i[u]!==r[u])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xd=new fe;function Ly(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Bc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function iT(){const o=Bc("canvas");return o.style.display="block",o}const Sv={};function po(o){o in Sv||(Sv[o]=!0,console.warn(o))}function aT(o,e,i){return new Promise(function(r,u){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:u();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:r()}}setTimeout(f,i)})}function sT(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function rT(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Mv=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xv=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function oT(){const o={enabled:!0,workingColorSpace:Ro,spaces:{},convert:function(u,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===Fe&&(u.r=wa(u.r),u.g=wa(u.g),u.b=wa(u.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(u.applyMatrix3(this.spaces[f].toXYZ),u.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Fe&&(u.r=Mo(u.r),u.g=Mo(u.g),u.b=Mo(u.b))),u},fromWorkingColorSpace:function(u,f){return this.convert(u,this.workingColorSpace,f)},toWorkingColorSpace:function(u,f){return this.convert(u,f,this.workingColorSpace)},getPrimaries:function(u){return this.spaces[u].primaries},getTransfer:function(u){return u===ps?zc:this.spaces[u].transfer},getLuminanceCoefficients:function(u,f=this.workingColorSpace){return u.fromArray(this.spaces[f].luminanceCoefficients)},define:function(u){Object.assign(this.spaces,u)},_getMatrix:function(u,f,h){return u.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(u){return this.spaces[u].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(u=this.workingColorSpace){return this.spaces[u].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return o.define({[Ro]:{primaries:e,whitePoint:r,transfer:zc,toXYZ:Mv,fromXYZ:xv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:e,whitePoint:r,transfer:Fe,toXYZ:Mv,fromXYZ:xv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}}),o}const Ue=oT();function wa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Mo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Jr;class lT{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Jr===void 0&&(Jr=Bc("canvas")),Jr.width=e.width,Jr.height=e.height;const r=Jr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Jr}return i.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Bc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const u=r.getImageData(0,0,e.width,e.height),f=u.data;for(let h=0;h<f.length;h++)f[h]=wa(f[h]/255)*255;return r.putImageData(u,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(wa(i[r]/255)*255):i[r]=wa(i[r]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let uT=0;class Oy{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uT++}),this.uuid=Do(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},u=this.data;if(u!==null){let f;if(Array.isArray(u)){f=[];for(let h=0,d=u.length;h<d;h++)u[h].isDataTexture?f.push(Ed(u[h].image)):f.push(Ed(u[h]))}else f=Ed(u);r.url=f}return i||(e.images[this.uuid]=r),r}}function Ed(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?lT.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cT=0;class qn extends ur{constructor(e=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,r=tr,u=tr,f=ta,h=er,d=Ii,p=Ua,m=qn.DEFAULT_ANISOTROPY,v=ps){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cT++}),this.uuid=Do(),this.name="",this.source=new Oy(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=u,this.magFilter=f,this.minFilter=h,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lp:e.x=e.x-Math.floor(e.x);break;case tr:e.x=e.x<0?0:1;break;case up:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lp:e.y=e.y-Math.floor(e.y);break;case tr:e.y=e.y<0?0:1;break;case up:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=xy;qn.DEFAULT_ANISOTROPY=1;class nn{constructor(e=0,i=0,r=0,u=1){nn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=u}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,u){return this.x=e,this.y=i,this.z=r,this.w=u,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,u=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*u+h[12]*f,this.y=h[1]*i+h[5]*r+h[9]*u+h[13]*f,this.z=h[2]*i+h[6]*r+h[10]*u+h[14]*f,this.w=h[3]*i+h[7]*r+h[11]*u+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,u,f;const p=e.elements,m=p[0],v=p[4],g=p[8],y=p[1],x=p[5],b=p[9],w=p[2],M=p[6],S=p[10];if(Math.abs(v-y)<.01&&Math.abs(g-w)<.01&&Math.abs(b-M)<.01){if(Math.abs(v+y)<.1&&Math.abs(g+w)<.1&&Math.abs(b+M)<.1&&Math.abs(m+x+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const P=(m+1)/2,U=(x+1)/2,V=(S+1)/2,H=(v+y)/4,O=(g+w)/4,I=(b+M)/4;return P>U&&P>V?P<.01?(r=0,u=.707106781,f=.707106781):(r=Math.sqrt(P),u=H/r,f=O/r):U>V?U<.01?(r=.707106781,u=0,f=.707106781):(u=Math.sqrt(U),r=H/u,f=I/u):V<.01?(r=.707106781,u=.707106781,f=0):(f=Math.sqrt(V),r=O/f,u=I/f),this.set(r,u,f,i),this}let z=Math.sqrt((M-b)*(M-b)+(g-w)*(g-w)+(y-v)*(y-v));return Math.abs(z)<.001&&(z=1),this.x=(M-b)/z,this.y=(g-w)/z,this.z=(y-v)/z,this.w=Math.acos((m+x+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=me(this.x,e.x,i.x),this.y=me(this.y,e.y,i.y),this.z=me(this.z,e.z,i.z),this.w=me(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=me(this.x,e,i),this.y=me(this.y,e,i),this.z=me(this.z,e,i),this.w=me(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fT extends ur{constructor(e=1,i=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=1,this.scissor=new nn(0,0,e,i),this.scissorTest=!1,this.viewport=new nn(0,0,e,i);const u={width:e,height:i,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ta,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const f=new qn(u,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);f.flipY=!1,f.generateMipmaps=r.generateMipmaps,f.internalFormat=r.internalFormat,this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let u=0,f=this.textures.length;u<f;u++)this.textures[u].image.width=e,this.textures[u].image.height=i,this.textures[u].image.depth=r;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,u=e.textures.length;r<u;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const i=Object.assign({},e.texture.image);return this.texture.source=new Oy(i),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class or extends fT{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Py extends qn{constructor(e=null,i=1,r=1,u=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:u},this.magFilter=pi,this.minFilter=pi,this.wrapR=tr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hT extends qn{constructor(e=null,i=1,r=1,u=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:u},this.magFilter=pi,this.minFilter=pi,this.wrapR=tr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lr{constructor(e=0,i=0,r=0,u=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=u}static slerpFlat(e,i,r,u,f,h,d){let p=r[u+0],m=r[u+1],v=r[u+2],g=r[u+3];const y=f[h+0],x=f[h+1],b=f[h+2],w=f[h+3];if(d===0){e[i+0]=p,e[i+1]=m,e[i+2]=v,e[i+3]=g;return}if(d===1){e[i+0]=y,e[i+1]=x,e[i+2]=b,e[i+3]=w;return}if(g!==w||p!==y||m!==x||v!==b){let M=1-d;const S=p*y+m*x+v*b+g*w,z=S>=0?1:-1,P=1-S*S;if(P>Number.EPSILON){const V=Math.sqrt(P),H=Math.atan2(V,S*z);M=Math.sin(M*H)/V,d=Math.sin(d*H)/V}const U=d*z;if(p=p*M+y*U,m=m*M+x*U,v=v*M+b*U,g=g*M+w*U,M===1-d){const V=1/Math.sqrt(p*p+m*m+v*v+g*g);p*=V,m*=V,v*=V,g*=V}}e[i]=p,e[i+1]=m,e[i+2]=v,e[i+3]=g}static multiplyQuaternionsFlat(e,i,r,u,f,h){const d=r[u],p=r[u+1],m=r[u+2],v=r[u+3],g=f[h],y=f[h+1],x=f[h+2],b=f[h+3];return e[i]=d*b+v*g+p*x-m*y,e[i+1]=p*b+v*y+m*g-d*x,e[i+2]=m*b+v*x+d*y-p*g,e[i+3]=v*b-d*g-p*y-m*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,u){return this._x=e,this._y=i,this._z=r,this._w=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,u=e._y,f=e._z,h=e._order,d=Math.cos,p=Math.sin,m=d(r/2),v=d(u/2),g=d(f/2),y=p(r/2),x=p(u/2),b=p(f/2);switch(h){case"XYZ":this._x=y*v*g+m*x*b,this._y=m*x*g-y*v*b,this._z=m*v*b+y*x*g,this._w=m*v*g-y*x*b;break;case"YXZ":this._x=y*v*g+m*x*b,this._y=m*x*g-y*v*b,this._z=m*v*b-y*x*g,this._w=m*v*g+y*x*b;break;case"ZXY":this._x=y*v*g-m*x*b,this._y=m*x*g+y*v*b,this._z=m*v*b+y*x*g,this._w=m*v*g-y*x*b;break;case"ZYX":this._x=y*v*g-m*x*b,this._y=m*x*g+y*v*b,this._z=m*v*b-y*x*g,this._w=m*v*g+y*x*b;break;case"YZX":this._x=y*v*g+m*x*b,this._y=m*x*g+y*v*b,this._z=m*v*b-y*x*g,this._w=m*v*g-y*x*b;break;case"XZY":this._x=y*v*g-m*x*b,this._y=m*x*g-y*v*b,this._z=m*v*b+y*x*g,this._w=m*v*g+y*x*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,u=Math.sin(r);return this._x=e.x*u,this._y=e.y*u,this._z=e.z*u,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],u=i[4],f=i[8],h=i[1],d=i[5],p=i[9],m=i[2],v=i[6],g=i[10],y=r+d+g;if(y>0){const x=.5/Math.sqrt(y+1);this._w=.25/x,this._x=(v-p)*x,this._y=(f-m)*x,this._z=(h-u)*x}else if(r>d&&r>g){const x=2*Math.sqrt(1+r-d-g);this._w=(v-p)/x,this._x=.25*x,this._y=(u+h)/x,this._z=(f+m)/x}else if(d>g){const x=2*Math.sqrt(1+d-r-g);this._w=(f-m)/x,this._x=(u+h)/x,this._y=.25*x,this._z=(p+v)/x}else{const x=2*Math.sqrt(1+g-r-d);this._w=(h-u)/x,this._x=(f+m)/x,this._y=(p+v)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(me(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const u=Math.min(1,i/r);return this.slerp(e,u),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,u=e._y,f=e._z,h=e._w,d=i._x,p=i._y,m=i._z,v=i._w;return this._x=r*v+h*d+u*m-f*p,this._y=u*v+h*p+f*d-r*m,this._z=f*v+h*m+r*p-u*d,this._w=h*v-r*d-u*p-f*m,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const r=this._x,u=this._y,f=this._z,h=this._w;let d=h*e._w+r*e._x+u*e._y+f*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=r,this._y=u,this._z=f,this;const p=1-d*d;if(p<=Number.EPSILON){const x=1-i;return this._w=x*h+i*this._w,this._x=x*r+i*this._x,this._y=x*u+i*this._y,this._z=x*f+i*this._z,this.normalize(),this}const m=Math.sqrt(p),v=Math.atan2(m,d),g=Math.sin((1-i)*v)/m,y=Math.sin(i*v)/m;return this._w=h*g+this._w*y,this._x=r*g+this._x*y,this._y=u*g+this._y*y,this._z=f*g+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),u=Math.sqrt(1-r),f=Math.sqrt(r);return this.set(u*Math.sin(e),u*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{constructor(e=0,i=0,r=0){nt.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Ev.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Ev.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[3]*r+f[6]*u,this.y=f[1]*i+f[4]*r+f[7]*u,this.z=f[2]*i+f[5]*r+f[8]*u,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,u=this.z,f=e.elements,h=1/(f[3]*i+f[7]*r+f[11]*u+f[15]);return this.x=(f[0]*i+f[4]*r+f[8]*u+f[12])*h,this.y=(f[1]*i+f[5]*r+f[9]*u+f[13])*h,this.z=(f[2]*i+f[6]*r+f[10]*u+f[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,u=this.z,f=e.x,h=e.y,d=e.z,p=e.w,m=2*(h*u-d*r),v=2*(d*i-f*u),g=2*(f*r-h*i);return this.x=i+p*m+h*g-d*v,this.y=r+p*v+d*m-f*g,this.z=u+p*g+f*v-h*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[4]*r+f[8]*u,this.y=f[1]*i+f[5]*r+f[9]*u,this.z=f[2]*i+f[6]*r+f[10]*u,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=me(this.x,e.x,i.x),this.y=me(this.y,e.y,i.y),this.z=me(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=me(this.x,e,i),this.y=me(this.y,e,i),this.z=me(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,u=e.y,f=e.z,h=i.x,d=i.y,p=i.z;return this.x=u*p-f*d,this.y=f*h-r*p,this.z=r*d-u*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Td.copy(this).projectOnVector(e),this.sub(Td)}reflect(e){return this.sub(Td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(me(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,u=this.z-e.z;return i*i+r*r+u*u}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const u=Math.sin(i)*e;return this.x=u*Math.sin(r),this.y=Math.cos(i)*e,this.z=u*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),u=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=u,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Td=new nt,Ev=new lr;class cr{constructor(e=new nt(1/0,1/0,1/0),i=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Li.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Li.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Li.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const f=r.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Li):Li.fromBufferAttribute(f,h),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),lc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),lc.copy(r.boundingBox)),lc.applyMatrix4(e.matrixWorld),this.union(lc)}const u=e.children;for(let f=0,h=u.length;f<h;f++)this.expandByObject(u[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bl),uc.subVectors(this.max,bl),$r.subVectors(e.a,bl),to.subVectors(e.b,bl),eo.subVectors(e.c,bl),os.subVectors(to,$r),ls.subVectors(eo,to),Xs.subVectors($r,eo);let i=[0,-os.z,os.y,0,-ls.z,ls.y,0,-Xs.z,Xs.y,os.z,0,-os.x,ls.z,0,-ls.x,Xs.z,0,-Xs.x,-os.y,os.x,0,-ls.y,ls.x,0,-Xs.y,Xs.x,0];return!bd(i,$r,to,eo,uc)||(i=[1,0,0,0,1,0,0,0,1],!bd(i,$r,to,eo,uc))?!1:(cc.crossVectors(os,ls),i=[cc.x,cc.y,cc.z],bd(i,$r,to,eo,uc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ma),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ma=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Li=new nt,lc=new cr,$r=new nt,to=new nt,eo=new nt,os=new nt,ls=new nt,Xs=new nt,bl=new nt,uc=new nt,cc=new nt,ks=new nt;function bd(o,e,i,r,u){for(let f=0,h=o.length-3;f<=h;f+=3){ks.fromArray(o,f);const d=u.x*Math.abs(ks.x)+u.y*Math.abs(ks.y)+u.z*Math.abs(ks.z),p=e.dot(ks),m=i.dot(ks),v=r.dot(ks);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>d)return!1}return!0}const dT=new cr,Al=new nt,Ad=new nt;class Il{constructor(e=new nt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):dT.setFromPoints(e).getCenter(r);let u=0;for(let f=0,h=e.length;f<h;f++)u=Math.max(u,r.distanceToSquared(e[f]));return this.radius=Math.sqrt(u),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Al.subVectors(e,this.center);const i=Al.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),u=(r-this.radius)*.5;this.center.addScaledVector(Al,u/r),this.radius+=u}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ad.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Al.copy(e.center).add(Ad)),this.expandByPoint(Al.copy(e.center).sub(Ad))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xa=new nt,Rd=new nt,fc=new nt,us=new nt,Cd=new nt,hc=new nt,wd=new nt;class zy{constructor(e=new nt,i=new nt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xa)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=xa.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(xa.copy(this.origin).addScaledVector(this.direction,i),xa.distanceToSquared(e))}distanceSqToSegment(e,i,r,u){Rd.copy(e).add(i).multiplyScalar(.5),fc.copy(i).sub(e).normalize(),us.copy(this.origin).sub(Rd);const f=e.distanceTo(i)*.5,h=-this.direction.dot(fc),d=us.dot(this.direction),p=-us.dot(fc),m=us.lengthSq(),v=Math.abs(1-h*h);let g,y,x,b;if(v>0)if(g=h*p-d,y=h*d-p,b=f*v,g>=0)if(y>=-b)if(y<=b){const w=1/v;g*=w,y*=w,x=g*(g+h*y+2*d)+y*(h*g+y+2*p)+m}else y=f,g=Math.max(0,-(h*y+d)),x=-g*g+y*(y+2*p)+m;else y=-f,g=Math.max(0,-(h*y+d)),x=-g*g+y*(y+2*p)+m;else y<=-b?(g=Math.max(0,-(-h*f+d)),y=g>0?-f:Math.min(Math.max(-f,-p),f),x=-g*g+y*(y+2*p)+m):y<=b?(g=0,y=Math.min(Math.max(-f,-p),f),x=y*(y+2*p)+m):(g=Math.max(0,-(h*f+d)),y=g>0?f:Math.min(Math.max(-f,-p),f),x=-g*g+y*(y+2*p)+m);else y=h>0?-f:f,g=Math.max(0,-(h*y+d)),x=-g*g+y*(y+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,g),u&&u.copy(Rd).addScaledVector(fc,y),x}intersectSphere(e,i){xa.subVectors(e.center,this.origin);const r=xa.dot(this.direction),u=xa.dot(xa)-r*r,f=e.radius*e.radius;if(u>f)return null;const h=Math.sqrt(f-u),d=r-h,p=r+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,u,f,h,d,p;const m=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,y=this.origin;return m>=0?(r=(e.min.x-y.x)*m,u=(e.max.x-y.x)*m):(r=(e.max.x-y.x)*m,u=(e.min.x-y.x)*m),v>=0?(f=(e.min.y-y.y)*v,h=(e.max.y-y.y)*v):(f=(e.max.y-y.y)*v,h=(e.min.y-y.y)*v),r>h||f>u||((f>r||isNaN(r))&&(r=f),(h<u||isNaN(u))&&(u=h),g>=0?(d=(e.min.z-y.z)*g,p=(e.max.z-y.z)*g):(d=(e.max.z-y.z)*g,p=(e.min.z-y.z)*g),r>p||d>u)||((d>r||r!==r)&&(r=d),(p<u||u!==u)&&(u=p),u<0)?null:this.at(r>=0?r:u,i)}intersectsBox(e){return this.intersectBox(e,xa)!==null}intersectTriangle(e,i,r,u,f){Cd.subVectors(i,e),hc.subVectors(r,e),wd.crossVectors(Cd,hc);let h=this.direction.dot(wd),d;if(h>0){if(u)return null;d=1}else if(h<0)d=-1,h=-h;else return null;us.subVectors(this.origin,e);const p=d*this.direction.dot(hc.crossVectors(us,hc));if(p<0)return null;const m=d*this.direction.dot(Cd.cross(us));if(m<0||p+m>h)return null;const v=-d*us.dot(wd);return v<0?null:this.at(v/h,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,i,r,u,f,h,d,p,m,v,g,y,x,b,w,M){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,u,f,h,d,p,m,v,g,y,x,b,w,M)}set(e,i,r,u,f,h,d,p,m,v,g,y,x,b,w,M){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=u,S[1]=f,S[5]=h,S[9]=d,S[13]=p,S[2]=m,S[6]=v,S[10]=g,S[14]=y,S[3]=x,S[7]=b,S[11]=w,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,u=1/no.setFromMatrixColumn(e,0).length(),f=1/no.setFromMatrixColumn(e,1).length(),h=1/no.setFromMatrixColumn(e,2).length();return i[0]=r[0]*u,i[1]=r[1]*u,i[2]=r[2]*u,i[3]=0,i[4]=r[4]*f,i[5]=r[5]*f,i[6]=r[6]*f,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,u=e.y,f=e.z,h=Math.cos(r),d=Math.sin(r),p=Math.cos(u),m=Math.sin(u),v=Math.cos(f),g=Math.sin(f);if(e.order==="XYZ"){const y=h*v,x=h*g,b=d*v,w=d*g;i[0]=p*v,i[4]=-p*g,i[8]=m,i[1]=x+b*m,i[5]=y-w*m,i[9]=-d*p,i[2]=w-y*m,i[6]=b+x*m,i[10]=h*p}else if(e.order==="YXZ"){const y=p*v,x=p*g,b=m*v,w=m*g;i[0]=y+w*d,i[4]=b*d-x,i[8]=h*m,i[1]=h*g,i[5]=h*v,i[9]=-d,i[2]=x*d-b,i[6]=w+y*d,i[10]=h*p}else if(e.order==="ZXY"){const y=p*v,x=p*g,b=m*v,w=m*g;i[0]=y-w*d,i[4]=-h*g,i[8]=b+x*d,i[1]=x+b*d,i[5]=h*v,i[9]=w-y*d,i[2]=-h*m,i[6]=d,i[10]=h*p}else if(e.order==="ZYX"){const y=h*v,x=h*g,b=d*v,w=d*g;i[0]=p*v,i[4]=b*m-x,i[8]=y*m+w,i[1]=p*g,i[5]=w*m+y,i[9]=x*m-b,i[2]=-m,i[6]=d*p,i[10]=h*p}else if(e.order==="YZX"){const y=h*p,x=h*m,b=d*p,w=d*m;i[0]=p*v,i[4]=w-y*g,i[8]=b*g+x,i[1]=g,i[5]=h*v,i[9]=-d*v,i[2]=-m*v,i[6]=x*g+b,i[10]=y-w*g}else if(e.order==="XZY"){const y=h*p,x=h*m,b=d*p,w=d*m;i[0]=p*v,i[4]=-g,i[8]=m*v,i[1]=y*g+w,i[5]=h*v,i[9]=x*g-b,i[2]=b*g-x,i[6]=d*v,i[10]=w*g+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pT,e,mT)}lookAt(e,i,r){const u=this.elements;return ci.subVectors(e,i),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),cs.crossVectors(r,ci),cs.lengthSq()===0&&(Math.abs(r.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),cs.crossVectors(r,ci)),cs.normalize(),dc.crossVectors(ci,cs),u[0]=cs.x,u[4]=dc.x,u[8]=ci.x,u[1]=cs.y,u[5]=dc.y,u[9]=ci.y,u[2]=cs.z,u[6]=dc.z,u[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,u=i.elements,f=this.elements,h=r[0],d=r[4],p=r[8],m=r[12],v=r[1],g=r[5],y=r[9],x=r[13],b=r[2],w=r[6],M=r[10],S=r[14],z=r[3],P=r[7],U=r[11],V=r[15],H=u[0],O=u[4],I=u[8],D=u[12],A=u[1],B=u[5],ot=u[9],it=u[13],pt=u[2],ht=u[6],W=u[10],st=u[14],Q=u[3],yt=u[7],St=u[11],Ht=u[15];return f[0]=h*H+d*A+p*pt+m*Q,f[4]=h*O+d*B+p*ht+m*yt,f[8]=h*I+d*ot+p*W+m*St,f[12]=h*D+d*it+p*st+m*Ht,f[1]=v*H+g*A+y*pt+x*Q,f[5]=v*O+g*B+y*ht+x*yt,f[9]=v*I+g*ot+y*W+x*St,f[13]=v*D+g*it+y*st+x*Ht,f[2]=b*H+w*A+M*pt+S*Q,f[6]=b*O+w*B+M*ht+S*yt,f[10]=b*I+w*ot+M*W+S*St,f[14]=b*D+w*it+M*st+S*Ht,f[3]=z*H+P*A+U*pt+V*Q,f[7]=z*O+P*B+U*ht+V*yt,f[11]=z*I+P*ot+U*W+V*St,f[15]=z*D+P*it+U*st+V*Ht,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],u=e[8],f=e[12],h=e[1],d=e[5],p=e[9],m=e[13],v=e[2],g=e[6],y=e[10],x=e[14],b=e[3],w=e[7],M=e[11],S=e[15];return b*(+f*p*g-u*m*g-f*d*y+r*m*y+u*d*x-r*p*x)+w*(+i*p*x-i*m*y+f*h*y-u*h*x+u*m*v-f*p*v)+M*(+i*m*g-i*d*x-f*h*g+r*h*x+f*d*v-r*m*v)+S*(-u*d*v-i*p*g+i*d*y+u*h*g-r*h*y+r*p*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const u=this.elements;return e.isVector3?(u[12]=e.x,u[13]=e.y,u[14]=e.z):(u[12]=e,u[13]=i,u[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],m=e[7],v=e[8],g=e[9],y=e[10],x=e[11],b=e[12],w=e[13],M=e[14],S=e[15],z=g*M*m-w*y*m+w*p*x-d*M*x-g*p*S+d*y*S,P=b*y*m-v*M*m-b*p*x+h*M*x+v*p*S-h*y*S,U=v*w*m-b*g*m+b*d*x-h*w*x-v*d*S+h*g*S,V=b*g*p-v*w*p-b*d*y+h*w*y+v*d*M-h*g*M,H=i*z+r*P+u*U+f*V;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/H;return e[0]=z*O,e[1]=(w*y*f-g*M*f-w*u*x+r*M*x+g*u*S-r*y*S)*O,e[2]=(d*M*f-w*p*f+w*u*m-r*M*m-d*u*S+r*p*S)*O,e[3]=(g*p*f-d*y*f-g*u*m+r*y*m+d*u*x-r*p*x)*O,e[4]=P*O,e[5]=(v*M*f-b*y*f+b*u*x-i*M*x-v*u*S+i*y*S)*O,e[6]=(b*p*f-h*M*f-b*u*m+i*M*m+h*u*S-i*p*S)*O,e[7]=(h*y*f-v*p*f+v*u*m-i*y*m-h*u*x+i*p*x)*O,e[8]=U*O,e[9]=(b*g*f-v*w*f-b*r*x+i*w*x+v*r*S-i*g*S)*O,e[10]=(h*w*f-b*d*f+b*r*m-i*w*m-h*r*S+i*d*S)*O,e[11]=(v*d*f-h*g*f-v*r*m+i*g*m+h*r*x-i*d*x)*O,e[12]=V*O,e[13]=(v*w*u-b*g*u+b*r*y-i*w*y-v*r*M+i*g*M)*O,e[14]=(b*d*u-h*w*u-b*r*p+i*w*p+h*r*M-i*d*M)*O,e[15]=(h*g*u-v*d*u+v*r*p-i*g*p-h*r*y+i*d*y)*O,this}scale(e){const i=this.elements,r=e.x,u=e.y,f=e.z;return i[0]*=r,i[4]*=u,i[8]*=f,i[1]*=r,i[5]*=u,i[9]*=f,i[2]*=r,i[6]*=u,i[10]*=f,i[3]*=r,i[7]*=u,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],u=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,u))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),u=Math.sin(i),f=1-r,h=e.x,d=e.y,p=e.z,m=f*h,v=f*d;return this.set(m*h+r,m*d-u*p,m*p+u*d,0,m*d+u*p,v*d+r,v*p-u*h,0,m*p-u*d,v*p+u*h,f*p*p+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,u,f,h){return this.set(1,r,f,0,e,1,h,0,i,u,1,0,0,0,0,1),this}compose(e,i,r){const u=this.elements,f=i._x,h=i._y,d=i._z,p=i._w,m=f+f,v=h+h,g=d+d,y=f*m,x=f*v,b=f*g,w=h*v,M=h*g,S=d*g,z=p*m,P=p*v,U=p*g,V=r.x,H=r.y,O=r.z;return u[0]=(1-(w+S))*V,u[1]=(x+U)*V,u[2]=(b-P)*V,u[3]=0,u[4]=(x-U)*H,u[5]=(1-(y+S))*H,u[6]=(M+z)*H,u[7]=0,u[8]=(b+P)*O,u[9]=(M-z)*O,u[10]=(1-(y+w))*O,u[11]=0,u[12]=e.x,u[13]=e.y,u[14]=e.z,u[15]=1,this}decompose(e,i,r){const u=this.elements;let f=no.set(u[0],u[1],u[2]).length();const h=no.set(u[4],u[5],u[6]).length(),d=no.set(u[8],u[9],u[10]).length();this.determinant()<0&&(f=-f),e.x=u[12],e.y=u[13],e.z=u[14],Oi.copy(this);const m=1/f,v=1/h,g=1/d;return Oi.elements[0]*=m,Oi.elements[1]*=m,Oi.elements[2]*=m,Oi.elements[4]*=v,Oi.elements[5]*=v,Oi.elements[6]*=v,Oi.elements[8]*=g,Oi.elements[9]*=g,Oi.elements[10]*=g,i.setFromRotationMatrix(Oi),r.x=f,r.y=h,r.z=d,this}makePerspective(e,i,r,u,f,h,d=Ra){const p=this.elements,m=2*f/(i-e),v=2*f/(r-u),g=(i+e)/(i-e),y=(r+u)/(r-u);let x,b;if(d===Ra)x=-(h+f)/(h-f),b=-2*h*f/(h-f);else if(d===Ic)x=-h/(h-f),b=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=v,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=x,p[14]=b,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,r,u,f,h,d=Ra){const p=this.elements,m=1/(i-e),v=1/(r-u),g=1/(h-f),y=(i+e)*m,x=(r+u)*v;let b,w;if(d===Ra)b=(h+f)*g,w=-2*g;else if(d===Ic)b=f*g,w=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-y,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-x,p[2]=0,p[6]=0,p[10]=w,p[14]=-b,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let u=0;u<16;u++)if(i[u]!==r[u])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const no=new nt,Oi=new Ze,pT=new nt(0,0,0),mT=new nt(1,1,1),cs=new nt,dc=new nt,ci=new nt,Tv=new Ze,bv=new lr;class Fi{constructor(e=0,i=0,r=0,u=Fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=u}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,u=this._order){return this._x=e,this._y=i,this._z=r,this._order=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const u=e.elements,f=u[0],h=u[4],d=u[8],p=u[1],m=u[5],v=u[9],g=u[2],y=u[6],x=u[10];switch(i){case"XYZ":this._y=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,x),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(y,m),this._z=0);break;case"YXZ":this._x=Math.asin(-me(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,x),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-g,f),this._z=0);break;case"ZXY":this._x=Math.asin(me(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-g,x),this._z=Math.atan2(-h,m)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-me(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(y,x),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-h,m));break;case"YZX":this._z=Math.asin(me(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-g,f)):(this._x=0,this._y=Math.atan2(d,x));break;case"XZY":this._z=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(y,m),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-v,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return Tv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tv,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return bv.setFromEuler(this),this.setFromQuaternion(bv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fi.DEFAULT_ORDER="XYZ";class Iy{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gT=0;const Av=new nt,io=new lr,Ea=new Ze,pc=new nt,Rl=new nt,_T=new nt,vT=new lr,Rv=new nt(1,0,0),Cv=new nt(0,1,0),wv=new nt(0,0,1),Dv={type:"added"},yT={type:"removed"},ao={type:"childadded",child:null},Dd={type:"childremoved",child:null};class hn extends ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gT++}),this.uuid=Do(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const e=new nt,i=new Fi,r=new lr,u=new nt(1,1,1);function f(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(f),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:u},modelViewMatrix:{value:new Ze},normalMatrix:{value:new fe}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Iy,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return io.setFromAxisAngle(e,i),this.quaternion.multiply(io),this}rotateOnWorldAxis(e,i){return io.setFromAxisAngle(e,i),this.quaternion.premultiply(io),this}rotateX(e){return this.rotateOnAxis(Rv,e)}rotateY(e){return this.rotateOnAxis(Cv,e)}rotateZ(e){return this.rotateOnAxis(wv,e)}translateOnAxis(e,i){return Av.copy(e).applyQuaternion(this.quaternion),this.position.add(Av.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Rv,e)}translateY(e){return this.translateOnAxis(Cv,e)}translateZ(e){return this.translateOnAxis(wv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ea.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?pc.copy(e):pc.set(e,i,r);const u=this.parent;this.updateWorldMatrix(!0,!1),Rl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ea.lookAt(Rl,pc,this.up):Ea.lookAt(pc,Rl,this.up),this.quaternion.setFromRotationMatrix(Ea),u&&(Ea.extractRotation(u.matrixWorld),io.setFromRotationMatrix(Ea),this.quaternion.premultiply(io.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dv),ao.child=e,this.dispatchEvent(ao),ao.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(yT),Dd.child=e,this.dispatchEvent(Dd),Dd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dv),ao.child=e,this.dispatchEvent(ao),ao.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,u=this.children.length;r<u;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rl,e,_T),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rl,vT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const u={};u.uuid=this.uuid,u.type=this.type,this.name!==""&&(u.name=this.name),this.castShadow===!0&&(u.castShadow=!0),this.receiveShadow===!0&&(u.receiveShadow=!0),this.visible===!1&&(u.visible=!1),this.frustumCulled===!1&&(u.frustumCulled=!1),this.renderOrder!==0&&(u.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(u.userData=this.userData),u.layers=this.layers.mask,u.matrix=this.matrix.toArray(),u.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(u.matrixAutoUpdate=!1),this.isInstancedMesh&&(u.type="InstancedMesh",u.count=this.count,u.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(u.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(u.type="BatchedMesh",u.perObjectFrustumCulled=this.perObjectFrustumCulled,u.sortObjects=this.sortObjects,u.drawRanges=this._drawRanges,u.reservedRanges=this._reservedRanges,u.visibility=this._visibility,u.active=this._active,u.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),u.maxInstanceCount=this._maxInstanceCount,u.maxVertexCount=this._maxVertexCount,u.maxIndexCount=this._maxIndexCount,u.geometryInitialized=this._geometryInitialized,u.geometryCount=this._geometryCount,u.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(u.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(u.boundingSphere={center:u.boundingSphere.center.toArray(),radius:u.boundingSphere.radius}),this.boundingBox!==null&&(u.boundingBox={min:u.boundingBox.min.toArray(),max:u.boundingBox.max.toArray()}));function f(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?u.background=this.background.toJSON():this.background.isTexture&&(u.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(u.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){u.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const g=p[m];f(e.shapes,g)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(u.bindMode=this.bindMode,u.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),u.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(f(e.materials,this.material[p]));u.material=d}else u.material=f(e.materials,this.material);if(this.children.length>0){u.children=[];for(let d=0;d<this.children.length;d++)u.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){u.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];u.animations.push(f(e.animations,p))}}if(i){const d=h(e.geometries),p=h(e.materials),m=h(e.textures),v=h(e.images),g=h(e.shapes),y=h(e.skeletons),x=h(e.animations),b=h(e.nodes);d.length>0&&(r.geometries=d),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),v.length>0&&(r.images=v),g.length>0&&(r.shapes=g),y.length>0&&(r.skeletons=y),x.length>0&&(r.animations=x),b.length>0&&(r.nodes=b)}return r.object=u,r;function h(d){const p=[];for(const m in d){const v=d[m];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const u=e.children[r];this.add(u.clone())}return this}}hn.DEFAULT_UP=new nt(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pi=new nt,Ta=new nt,Ud=new nt,ba=new nt,so=new nt,ro=new nt,Uv=new nt,Nd=new nt,Ld=new nt,Od=new nt,Pd=new nn,zd=new nn,Id=new nn;class zi{constructor(e=new nt,i=new nt,r=new nt){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,u){u.subVectors(r,i),Pi.subVectors(e,i),u.cross(Pi);const f=u.lengthSq();return f>0?u.multiplyScalar(1/Math.sqrt(f)):u.set(0,0,0)}static getBarycoord(e,i,r,u,f){Pi.subVectors(u,i),Ta.subVectors(r,i),Ud.subVectors(e,i);const h=Pi.dot(Pi),d=Pi.dot(Ta),p=Pi.dot(Ud),m=Ta.dot(Ta),v=Ta.dot(Ud),g=h*m-d*d;if(g===0)return f.set(0,0,0),null;const y=1/g,x=(m*p-d*v)*y,b=(h*v-d*p)*y;return f.set(1-x-b,b,x)}static containsPoint(e,i,r,u){return this.getBarycoord(e,i,r,u,ba)===null?!1:ba.x>=0&&ba.y>=0&&ba.x+ba.y<=1}static getInterpolation(e,i,r,u,f,h,d,p){return this.getBarycoord(e,i,r,u,ba)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,ba.x),p.addScaledVector(h,ba.y),p.addScaledVector(d,ba.z),p)}static getInterpolatedAttribute(e,i,r,u,f,h){return Pd.setScalar(0),zd.setScalar(0),Id.setScalar(0),Pd.fromBufferAttribute(e,i),zd.fromBufferAttribute(e,r),Id.fromBufferAttribute(e,u),h.setScalar(0),h.addScaledVector(Pd,f.x),h.addScaledVector(zd,f.y),h.addScaledVector(Id,f.z),h}static isFrontFacing(e,i,r,u){return Pi.subVectors(r,i),Ta.subVectors(e,i),Pi.cross(Ta).dot(u)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,u){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[u]),this}setFromAttributeAndIndices(e,i,r,u){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,u),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pi.subVectors(this.c,this.b),Ta.subVectors(this.a,this.b),Pi.cross(Ta).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return zi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,u,f){return zi.getInterpolation(e,this.a,this.b,this.c,i,r,u,f)}containsPoint(e){return zi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,u=this.b,f=this.c;let h,d;so.subVectors(u,r),ro.subVectors(f,r),Nd.subVectors(e,r);const p=so.dot(Nd),m=ro.dot(Nd);if(p<=0&&m<=0)return i.copy(r);Ld.subVectors(e,u);const v=so.dot(Ld),g=ro.dot(Ld);if(v>=0&&g<=v)return i.copy(u);const y=p*g-v*m;if(y<=0&&p>=0&&v<=0)return h=p/(p-v),i.copy(r).addScaledVector(so,h);Od.subVectors(e,f);const x=so.dot(Od),b=ro.dot(Od);if(b>=0&&x<=b)return i.copy(f);const w=x*m-p*b;if(w<=0&&m>=0&&b<=0)return d=m/(m-b),i.copy(r).addScaledVector(ro,d);const M=v*b-x*g;if(M<=0&&g-v>=0&&x-b>=0)return Uv.subVectors(f,u),d=(g-v)/(g-v+(x-b)),i.copy(u).addScaledVector(Uv,d);const S=1/(M+w+y);return h=w*S,d=y*S,i.copy(r).addScaledVector(so,h).addScaledVector(ro,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const By={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},mc={h:0,s:0,l:0};function Bd(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class ge{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const u=e;u&&u.isColor?this.copy(u):typeof u=="number"?this.setHex(u):typeof u=="string"&&this.setStyle(u)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=hi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ue.toWorkingColorSpace(this,i),this}setRGB(e,i,r,u=Ue.workingColorSpace){return this.r=e,this.g=i,this.b=r,Ue.toWorkingColorSpace(this,u),this}setHSL(e,i,r,u=Ue.workingColorSpace){if(e=Wp(e,1),i=me(i,0,1),r=me(r,0,1),i===0)this.r=this.g=this.b=r;else{const f=r<=.5?r*(1+i):r+i-r*i,h=2*r-f;this.r=Bd(h,f,e+1/3),this.g=Bd(h,f,e),this.b=Bd(h,f,e-1/3)}return Ue.toWorkingColorSpace(this,u),this}setStyle(e,i=hi){function r(f){f!==void 0&&parseFloat(f)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let u;if(u=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=u[1],d=u[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(u=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=u[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=hi){const r=By[e.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}copyLinearToSRGB(e){return this.r=Mo(e.r),this.g=Mo(e.g),this.b=Mo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hi){return Ue.fromWorkingColorSpace(Fn.copy(this),e),Math.round(me(Fn.r*255,0,255))*65536+Math.round(me(Fn.g*255,0,255))*256+Math.round(me(Fn.b*255,0,255))}getHexString(e=hi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ue.workingColorSpace){Ue.fromWorkingColorSpace(Fn.copy(this),i);const r=Fn.r,u=Fn.g,f=Fn.b,h=Math.max(r,u,f),d=Math.min(r,u,f);let p,m;const v=(d+h)/2;if(d===h)p=0,m=0;else{const g=h-d;switch(m=v<=.5?g/(h+d):g/(2-h-d),h){case r:p=(u-f)/g+(u<f?6:0);break;case u:p=(f-r)/g+2;break;case f:p=(r-u)/g+4;break}p/=6}return e.h=p,e.s=m,e.l=v,e}getRGB(e,i=Ue.workingColorSpace){return Ue.fromWorkingColorSpace(Fn.copy(this),i),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=hi){Ue.fromWorkingColorSpace(Fn.copy(this),e);const i=Fn.r,r=Fn.g,u=Fn.b;return e!==hi?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${u.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(u*255)})`}offsetHSL(e,i,r){return this.getHSL(fs),this.setHSL(fs.h+e,fs.s+i,fs.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(fs),e.getHSL(mc);const r=Ll(fs.h,mc.h,i),u=Ll(fs.s,mc.s,i),f=Ll(fs.l,mc.l,i);return this.setHSL(r,u,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,u=this.b,f=e.elements;return this.r=f[0]*i+f[3]*r+f[6]*u,this.g=f[1]*i+f[4]*r+f[7]*u,this.b=f[2]*i+f[5]*r+f[8]*u,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fn=new ge;ge.NAMES=By;let ST=0;class Uo extends ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ST++}),this.uuid=Do(),this.name="",this.type="Material",this.blending=yo,this.side=Da,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qd,this.blendDst=Jd,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=xo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const u=this[i];if(u===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}u&&u.isColor?u.set(r):u&&u.isVector3&&r&&r.isVector3?u.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==yo&&(r.blending=this.blending),this.side!==Da&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Qd&&(r.blendSrc=this.blendSrc),this.blendDst!==Jd&&(r.blendDst=this.blendDst),this.blendEquation!==Js&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==xo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function u(f){const h=[];for(const d in f){const p=f[d];delete p.metadata,h.push(p)}return h}if(i){const f=u(e.textures),h=u(e.images);f.length>0&&(r.textures=f),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const u=i.length;r=new Array(u);for(let f=0;f!==u;++f)r[f]=i[f].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class jp extends Uo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cn=new nt,gc=new ce;let MT=0;class Bi{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:MT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=_v,this.updateRanges=[],this.gpuType=ea,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let u=0,f=this.itemSize;u<f;u++)this.array[e+u]=i.array[r+u];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)gc.fromBufferAttribute(this,i),gc.applyMatrix3(e),this.setXY(i,gc.x,gc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix3(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix4(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.applyNormalMatrix(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)cn.fromBufferAttribute(this,i),cn.transformDirection(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=ho(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=kn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ho(i,this.array)),i}setX(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ho(i,this.array)),i}setY(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ho(i,this.array)),i}setZ(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ho(i,this.array)),i}setW(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),r=kn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,u){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),r=kn(r,this.array),u=kn(u,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=u,this}setXYZW(e,i,r,u,f){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),r=kn(r,this.array),u=kn(u,this.array),f=kn(f,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=u,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_v&&(e.usage=this.usage),e}}class Fy extends Bi{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Hy extends Bi{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class na extends Bi{constructor(e,i,r){super(new Float32Array(e),i,r)}}let xT=0;const Ti=new Ze,Fd=new hn,oo=new nt,fi=new cr,Cl=new cr,bn=new nt;class ys extends ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=Do(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ly(e)?Hy:Fy)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const f=new fe().getNormalMatrix(e);r.applyNormalMatrix(f),r.needsUpdate=!0}const u=this.attributes.tangent;return u!==void 0&&(u.transformDirection(e),u.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,i,r){return Ti.makeTranslation(e,i,r),this.applyMatrix4(Ti),this}scale(e,i,r){return Ti.makeScale(e,i,r),this.applyMatrix4(Ti),this}lookAt(e){return Fd.lookAt(e),Fd.updateMatrix(),this.applyMatrix4(Fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oo).negate(),this.translate(oo.x,oo.y,oo.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let u=0,f=e.length;u<f;u++){const h=e[u];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new na(r,3))}else{const r=Math.min(e.length,i.count);for(let u=0;u<r;u++){const f=e[u];i.setXYZ(u,f.x,f.y,f.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cr);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,u=i.length;r<u;r++){const f=i[r];fi.setFromBufferAttribute(f),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Il);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(e){const r=this.boundingSphere.center;if(fi.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];Cl.setFromBufferAttribute(d),this.morphTargetsRelative?(bn.addVectors(fi.min,Cl.min),fi.expandByPoint(bn),bn.addVectors(fi.max,Cl.max),fi.expandByPoint(bn)):(fi.expandByPoint(Cl.min),fi.expandByPoint(Cl.max))}fi.getCenter(r);let u=0;for(let f=0,h=e.count;f<h;f++)bn.fromBufferAttribute(e,f),u=Math.max(u,r.distanceToSquared(bn));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],p=this.morphTargetsRelative;for(let m=0,v=d.count;m<v;m++)bn.fromBufferAttribute(d,m),p&&(oo.fromBufferAttribute(e,m),bn.add(oo)),u=Math.max(u,r.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(u),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,u=i.normal,f=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bi(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let I=0;I<r.count;I++)d[I]=new nt,p[I]=new nt;const m=new nt,v=new nt,g=new nt,y=new ce,x=new ce,b=new ce,w=new nt,M=new nt;function S(I,D,A){m.fromBufferAttribute(r,I),v.fromBufferAttribute(r,D),g.fromBufferAttribute(r,A),y.fromBufferAttribute(f,I),x.fromBufferAttribute(f,D),b.fromBufferAttribute(f,A),v.sub(m),g.sub(m),x.sub(y),b.sub(y);const B=1/(x.x*b.y-b.x*x.y);isFinite(B)&&(w.copy(v).multiplyScalar(b.y).addScaledVector(g,-x.y).multiplyScalar(B),M.copy(g).multiplyScalar(x.x).addScaledVector(v,-b.x).multiplyScalar(B),d[I].add(w),d[D].add(w),d[A].add(w),p[I].add(M),p[D].add(M),p[A].add(M))}let z=this.groups;z.length===0&&(z=[{start:0,count:e.count}]);for(let I=0,D=z.length;I<D;++I){const A=z[I],B=A.start,ot=A.count;for(let it=B,pt=B+ot;it<pt;it+=3)S(e.getX(it+0),e.getX(it+1),e.getX(it+2))}const P=new nt,U=new nt,V=new nt,H=new nt;function O(I){V.fromBufferAttribute(u,I),H.copy(V);const D=d[I];P.copy(D),P.sub(V.multiplyScalar(V.dot(D))).normalize(),U.crossVectors(H,D);const B=U.dot(p[I])<0?-1:1;h.setXYZW(I,P.x,P.y,P.z,B)}for(let I=0,D=z.length;I<D;++I){const A=z[I],B=A.start,ot=A.count;for(let it=B,pt=B+ot;it<pt;it+=3)O(e.getX(it+0)),O(e.getX(it+1)),O(e.getX(it+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Bi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let y=0,x=r.count;y<x;y++)r.setXYZ(y,0,0,0);const u=new nt,f=new nt,h=new nt,d=new nt,p=new nt,m=new nt,v=new nt,g=new nt;if(e)for(let y=0,x=e.count;y<x;y+=3){const b=e.getX(y+0),w=e.getX(y+1),M=e.getX(y+2);u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,w),h.fromBufferAttribute(i,M),v.subVectors(h,f),g.subVectors(u,f),v.cross(g),d.fromBufferAttribute(r,b),p.fromBufferAttribute(r,w),m.fromBufferAttribute(r,M),d.add(v),p.add(v),m.add(v),r.setXYZ(b,d.x,d.y,d.z),r.setXYZ(w,p.x,p.y,p.z),r.setXYZ(M,m.x,m.y,m.z)}else for(let y=0,x=i.count;y<x;y+=3)u.fromBufferAttribute(i,y+0),f.fromBufferAttribute(i,y+1),h.fromBufferAttribute(i,y+2),v.subVectors(h,f),g.subVectors(u,f),v.cross(g),r.setXYZ(y+0,v.x,v.y,v.z),r.setXYZ(y+1,v.x,v.y,v.z),r.setXYZ(y+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)bn.fromBufferAttribute(e,i),bn.normalize(),e.setXYZ(i,bn.x,bn.y,bn.z)}toNonIndexed(){function e(d,p){const m=d.array,v=d.itemSize,g=d.normalized,y=new m.constructor(p.length*v);let x=0,b=0;for(let w=0,M=p.length;w<M;w++){d.isInterleavedBufferAttribute?x=p[w]*d.data.stride+d.offset:x=p[w]*v;for(let S=0;S<v;S++)y[b++]=m[x++]}return new Bi(y,v,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ys,r=this.index.array,u=this.attributes;for(const d in u){const p=u[d],m=e(p,r);i.setAttribute(d,m)}const f=this.morphAttributes;for(const d in f){const p=[],m=f[d];for(let v=0,g=m.length;v<g;v++){const y=m[v],x=e(y,r);p.push(x)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const m=h[d];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const p in r){const m=r[p];e.data.attributes[p]=m.toJSON(e.data)}const u={};let f=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let g=0,y=m.length;g<y;g++){const x=m[g];v.push(x.toJSON(e.data))}v.length>0&&(u[p]=v,f=!0)}f&&(e.data.morphAttributes=u,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(i));const u=e.attributes;for(const m in u){const v=u[m];this.setAttribute(m,v.clone(i))}const f=e.morphAttributes;for(const m in f){const v=[],g=f[m];for(let y=0,x=g.length;y<x;y++)v.push(g[y].clone(i));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let m=0,v=h.length;m<v;m++){const g=h[m];this.addGroup(g.start,g.count,g.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nv=new Ze,Ys=new zy,_c=new Il,Lv=new nt,vc=new nt,yc=new nt,Sc=new nt,Hd=new nt,Mc=new nt,Ov=new nt,xc=new nt;class di extends hn{constructor(e=new ys,i=new jp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const u=i[r[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=u.length;f<h;f++){const d=u[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const r=this.geometry,u=r.attributes.position,f=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(u,e);const d=this.morphTargetInfluences;if(f&&d){Mc.set(0,0,0);for(let p=0,m=f.length;p<m;p++){const v=d[p],g=f[p];v!==0&&(Hd.fromBufferAttribute(g,e),h?Mc.addScaledVector(Hd,v):Mc.addScaledVector(Hd.sub(i),v))}i.add(Mc)}return i}raycast(e,i){const r=this.geometry,u=this.material,f=this.matrixWorld;u!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),_c.copy(r.boundingSphere),_c.applyMatrix4(f),Ys.copy(e.ray).recast(e.near),!(_c.containsPoint(Ys.origin)===!1&&(Ys.intersectSphere(_c,Lv)===null||Ys.origin.distanceToSquared(Lv)>(e.far-e.near)**2))&&(Nv.copy(f).invert(),Ys.copy(e.ray).applyMatrix4(Nv),!(r.boundingBox!==null&&Ys.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Ys)))}_computeIntersections(e,i,r){let u;const f=this.geometry,h=this.material,d=f.index,p=f.attributes.position,m=f.attributes.uv,v=f.attributes.uv1,g=f.attributes.normal,y=f.groups,x=f.drawRange;if(d!==null)if(Array.isArray(h))for(let b=0,w=y.length;b<w;b++){const M=y[b],S=h[M.materialIndex],z=Math.max(M.start,x.start),P=Math.min(d.count,Math.min(M.start+M.count,x.start+x.count));for(let U=z,V=P;U<V;U+=3){const H=d.getX(U),O=d.getX(U+1),I=d.getX(U+2);u=Ec(this,S,e,r,m,v,g,H,O,I),u&&(u.faceIndex=Math.floor(U/3),u.face.materialIndex=M.materialIndex,i.push(u))}}else{const b=Math.max(0,x.start),w=Math.min(d.count,x.start+x.count);for(let M=b,S=w;M<S;M+=3){const z=d.getX(M),P=d.getX(M+1),U=d.getX(M+2);u=Ec(this,h,e,r,m,v,g,z,P,U),u&&(u.faceIndex=Math.floor(M/3),i.push(u))}}else if(p!==void 0)if(Array.isArray(h))for(let b=0,w=y.length;b<w;b++){const M=y[b],S=h[M.materialIndex],z=Math.max(M.start,x.start),P=Math.min(p.count,Math.min(M.start+M.count,x.start+x.count));for(let U=z,V=P;U<V;U+=3){const H=U,O=U+1,I=U+2;u=Ec(this,S,e,r,m,v,g,H,O,I),u&&(u.faceIndex=Math.floor(U/3),u.face.materialIndex=M.materialIndex,i.push(u))}}else{const b=Math.max(0,x.start),w=Math.min(p.count,x.start+x.count);for(let M=b,S=w;M<S;M+=3){const z=M,P=M+1,U=M+2;u=Ec(this,h,e,r,m,v,g,z,P,U),u&&(u.faceIndex=Math.floor(M/3),i.push(u))}}}}function ET(o,e,i,r,u,f,h,d){let p;if(e.side===ei?p=r.intersectTriangle(h,f,u,!0,d):p=r.intersectTriangle(u,f,h,e.side===Da,d),p===null)return null;xc.copy(d),xc.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(xc);return m<i.near||m>i.far?null:{distance:m,point:xc.clone(),object:o}}function Ec(o,e,i,r,u,f,h,d,p,m){o.getVertexPosition(d,vc),o.getVertexPosition(p,yc),o.getVertexPosition(m,Sc);const v=ET(o,e,i,r,vc,yc,Sc,Ov);if(v){const g=new nt;zi.getBarycoord(Ov,vc,yc,Sc,g),u&&(v.uv=zi.getInterpolatedAttribute(u,d,p,m,g,new ce)),f&&(v.uv1=zi.getInterpolatedAttribute(f,d,p,m,g,new ce)),h&&(v.normal=zi.getInterpolatedAttribute(h,d,p,m,g,new nt),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const y={a:d,b:p,c:m,normal:new nt,materialIndex:0};zi.getNormal(vc,yc,Sc,y.normal),v.face=y,v.barycoord=g}return v}class $n extends ys{constructor(e=1,i=1,r=1,u=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:u,heightSegments:f,depthSegments:h};const d=this;u=Math.floor(u),f=Math.floor(f),h=Math.floor(h);const p=[],m=[],v=[],g=[];let y=0,x=0;b("z","y","x",-1,-1,r,i,e,h,f,0),b("z","y","x",1,-1,r,i,-e,h,f,1),b("x","z","y",1,1,e,r,i,u,h,2),b("x","z","y",1,-1,e,r,-i,u,h,3),b("x","y","z",1,-1,e,i,r,u,f,4),b("x","y","z",-1,-1,e,i,-r,u,f,5),this.setIndex(p),this.setAttribute("position",new na(m,3)),this.setAttribute("normal",new na(v,3)),this.setAttribute("uv",new na(g,2));function b(w,M,S,z,P,U,V,H,O,I,D){const A=U/O,B=V/I,ot=U/2,it=V/2,pt=H/2,ht=O+1,W=I+1;let st=0,Q=0;const yt=new nt;for(let St=0;St<W;St++){const Ht=St*B-it;for(let ee=0;ee<ht;ee++){const be=ee*A-ot;yt[w]=be*z,yt[M]=Ht*P,yt[S]=pt,m.push(yt.x,yt.y,yt.z),yt[w]=0,yt[M]=0,yt[S]=H>0?1:-1,v.push(yt.x,yt.y,yt.z),g.push(ee/O),g.push(1-St/I),st+=1}}for(let St=0;St<I;St++)for(let Ht=0;Ht<O;Ht++){const ee=y+Ht+ht*St,be=y+Ht+ht*(St+1),C=y+(Ht+1)+ht*(St+1),Z=y+(Ht+1)+ht*St;p.push(ee,be,Z),p.push(be,C,Z),Q+=6}d.addGroup(x,Q,D),x+=Q,y+=st}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Co(o){const e={};for(const i in o){e[i]={};for(const r in o[i]){const u=o[i][r];u&&(u.isColor||u.isMatrix3||u.isMatrix4||u.isVector2||u.isVector3||u.isVector4||u.isTexture||u.isQuaternion)?u.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=u.clone():Array.isArray(u)?e[i][r]=u.slice():e[i][r]=u}}return e}function Yn(o){const e={};for(let i=0;i<o.length;i++){const r=Co(o[i]);for(const u in r)e[u]=r[u]}return e}function TT(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function Gy(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ue.workingColorSpace}const bT={clone:Co,merge:Yn};var AT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vs extends Uo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AT,this.fragmentShader=RT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Co(e.uniforms),this.uniformsGroups=TT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const u in this.uniforms){const h=this.uniforms[u].value;h&&h.isTexture?i.uniforms[u]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[u]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[u]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[u]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[u]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[u]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[u]={type:"m4",value:h.toArray()}:i.uniforms[u]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const u in this.extensions)this.extensions[u]===!0&&(r[u]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class Vy extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Ra}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hs=new nt,Pv=new ce,zv=new ce;class Ai extends Vy{constructor(e=50,i=1,r=.1,u=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=u,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Pl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Nl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pl*2*Math.atan(Math.tan(Nl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hs.x,hs.y).multiplyScalar(-e/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(hs.x,hs.y).multiplyScalar(-e/hs.z)}getViewSize(e,i){return this.getViewBounds(e,Pv,zv),i.subVectors(zv,Pv)}setViewOffset(e,i,r,u,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Nl*.5*this.fov)/this.zoom,r=2*i,u=this.aspect*r,f=-.5*u;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,m=h.fullHeight;f+=h.offsetX*u/p,i-=h.offsetY*r/m,u*=h.width/p,r*=h.height/m}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+u,i,i-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const lo=-90,uo=1;class CT extends hn{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const u=new Ai(lo,uo,e,i);u.layers=this.layers,this.add(u);const f=new Ai(lo,uo,e,i);f.layers=this.layers,this.add(f);const h=new Ai(lo,uo,e,i);h.layers=this.layers,this.add(h);const d=new Ai(lo,uo,e,i);d.layers=this.layers,this.add(d);const p=new Ai(lo,uo,e,i);p.layers=this.layers,this.add(p);const m=new Ai(lo,uo,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,u,f,h,d,p]=i;for(const m of i)this.remove(m);if(e===Ra)r.up.set(0,1,0),r.lookAt(1,0,0),u.up.set(0,1,0),u.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Ic)r.up.set(0,-1,0),r.lookAt(-1,0,0),u.up.set(0,-1,0),u.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:u}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,p,m,v]=this.children,g=e.getRenderTarget(),y=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,u),e.render(i,f),e.setRenderTarget(r,1,u),e.render(i,h),e.setRenderTarget(r,2,u),e.render(i,d),e.setRenderTarget(r,3,u),e.render(i,p),e.setRenderTarget(r,4,u),e.render(i,m),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,u),e.render(i,v),e.setRenderTarget(g,y,x),e.xr.enabled=b,r.texture.needsPMREMUpdate=!0}}class Xy extends qn{constructor(e,i,r,u,f,h,d,p,m,v){e=e!==void 0?e:[],i=i!==void 0?i:Eo,super(e,i,r,u,f,h,d,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wT extends or{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},u=[r,r,r,r,r,r];this.texture=new Xy(u,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:ta}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},u=new $n(5,5,5),f=new vs({name:"CubemapFromEquirect",uniforms:Co(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:ei,blending:ms});f.uniforms.tEquirect.value=i;const h=new di(u,f),d=i.minFilter;return i.minFilter===er&&(i.minFilter=ta),new CT(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i,r,u){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,u);e.setRenderTarget(f)}}class nr extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const DT={type:"move"};class Gd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let u=null,f=null,h=null;const d=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){h=!0;for(const w of e.hand.values()){const M=i.getJointPose(w,r),S=this._getHandJoint(m,w);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const v=m.joints["index-finger-tip"],g=m.joints["thumb-tip"],y=v.position.distanceTo(g.position),x=.02,b=.005;m.inputState.pinching&&y>x+b?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&y<=x-b&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,r),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(u=i.getPose(e.targetRaySpace,r),u===null&&f!==null&&(u=f),u!==null&&(d.matrix.fromArray(u.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,u.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(u.linearVelocity)):d.hasLinearVelocity=!1,u.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(u.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(DT)))}return d!==null&&(d.visible=u!==null),p!==null&&(p.visible=f!==null),m!==null&&(m.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new nr;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}class Zp{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new ge(e),this.density=i}clone(){return new Zp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class UT extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fi,this.environmentIntensity=1,this.environmentRotation=new Fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class NT extends qn{constructor(e=null,i=1,r=1,u,f,h,d,p,m=pi,v=pi,g,y){super(null,h,d,p,m,v,u,f,g,y),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Iv extends Bi{constructor(e,i,r,u=1){super(e,i,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=u}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const co=new Ze,Bv=new Ze,Tc=[],Fv=new cr,LT=new Ze,wl=new di,Dl=new Il;class Ca extends di{constructor(e,i,r){super(e,i),this.isInstancedMesh=!0,this.instanceMatrix=new Iv(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let u=0;u<r;u++)this.setMatrixAt(u,LT)}computeBoundingBox(){const e=this.geometry,i=this.count;this.boundingBox===null&&(this.boundingBox=new cr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<i;r++)this.getMatrixAt(r,co),Fv.copy(e.boundingBox).applyMatrix4(co),this.boundingBox.union(Fv)}computeBoundingSphere(){const e=this.geometry,i=this.count;this.boundingSphere===null&&(this.boundingSphere=new Il),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<i;r++)this.getMatrixAt(r,co),Dl.copy(e.boundingSphere).applyMatrix4(co),this.boundingSphere.union(Dl)}copy(e,i){return super.copy(e,i),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,i){i.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,i){i.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,i){const r=i.morphTargetInfluences,u=this.morphTexture.source.data.data,f=r.length+1,h=e*f+1;for(let d=0;d<r.length;d++)r[d]=u[h+d]}raycast(e,i){const r=this.matrixWorld,u=this.count;if(wl.geometry=this.geometry,wl.material=this.material,wl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dl.copy(this.boundingSphere),Dl.applyMatrix4(r),e.ray.intersectsSphere(Dl)!==!1))for(let f=0;f<u;f++){this.getMatrixAt(f,co),Bv.multiplyMatrices(r,co),wl.matrixWorld=Bv,wl.raycast(e,Tc);for(let h=0,d=Tc.length;h<d;h++){const p=Tc[h];p.instanceId=f,p.object=this,i.push(p)}Tc.length=0}}setColorAt(e,i){this.instanceColor===null&&(this.instanceColor=new Iv(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),i.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,i){i.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,i){const r=i.morphTargetInfluences,u=r.length+1;this.morphTexture===null&&(this.morphTexture=new NT(new Float32Array(u*this.count),u,this.count,Vp,ea));const f=this.morphTexture.source.data.data;let h=0;for(let m=0;m<r.length;m++)h+=r[m];const d=this.geometry.morphTargetsRelative?1:1-h,p=u*e;f[p]=d,f.set(r,p+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Vd=new nt,OT=new nt,PT=new fe;class ds{constructor(e=new nt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,u){return this.normal.set(e,i,r),this.constant=u,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const u=Vd.subVectors(r,i).cross(OT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(u,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(Vd),u=this.normal.dot(r);if(u===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/u;return f<0||f>1?null:i.copy(e.start).addScaledVector(r,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||PT.getNormalMatrix(e),u=this.coplanarPoint(Vd).applyMatrix4(e),f=this.normal.applyMatrix3(r).normalize();return this.constant=-u.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qs=new Il,bc=new nt;class Kp{constructor(e=new ds,i=new ds,r=new ds,u=new ds,f=new ds,h=new ds){this.planes=[e,i,r,u,f,h]}set(e,i,r,u,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(u),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=Ra){const r=this.planes,u=e.elements,f=u[0],h=u[1],d=u[2],p=u[3],m=u[4],v=u[5],g=u[6],y=u[7],x=u[8],b=u[9],w=u[10],M=u[11],S=u[12],z=u[13],P=u[14],U=u[15];if(r[0].setComponents(p-f,y-m,M-x,U-S).normalize(),r[1].setComponents(p+f,y+m,M+x,U+S).normalize(),r[2].setComponents(p+h,y+v,M+b,U+z).normalize(),r[3].setComponents(p-h,y-v,M-b,U-z).normalize(),r[4].setComponents(p-d,y-g,M-w,U-P).normalize(),i===Ra)r[5].setComponents(p+d,y+g,M+w,U+P).normalize();else if(i===Ic)r[5].setComponents(d,g,w,P).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qs)}intersectsSprite(e){return qs.center.set(0,0,0),qs.radius=.7071067811865476,qs.applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){const i=this.planes,r=e.center,u=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(r)<u)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const u=i[r];if(bc.x=u.normal.x>0?e.max.x:e.min.x,bc.y=u.normal.y>0?e.max.y:e.min.y,bc.z=u.normal.z>0?e.max.z:e.min.z,u.distanceToPoint(bc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ky extends qn{constructor(e,i,r,u,f,h,d,p,m,v=So){if(v!==So&&v!==Ao)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&v===So&&(r=rr),r===void 0&&v===Ao&&(r=bo),super(null,u,f,h,d,p,v,r,m),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=d!==void 0?d:pi,this.minFilter=p!==void 0?p:pi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Gc extends ys{constructor(e=1,i=1,r=1,u=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:u};const f=e/2,h=i/2,d=Math.floor(r),p=Math.floor(u),m=d+1,v=p+1,g=e/d,y=i/p,x=[],b=[],w=[],M=[];for(let S=0;S<v;S++){const z=S*y-h;for(let P=0;P<m;P++){const U=P*g-f;b.push(U,-z,0),w.push(0,0,1),M.push(P/d),M.push(1-S/p)}}for(let S=0;S<p;S++)for(let z=0;z<d;z++){const P=z+m*S,U=z+m*(S+1),V=z+1+m*(S+1),H=z+1+m*S;x.push(P,U,H),x.push(U,V,H)}this.setIndex(x),this.setAttribute("position",new na(b,3)),this.setAttribute("normal",new na(w,3)),this.setAttribute("uv",new na(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gc(e.width,e.height,e.widthSegments,e.heightSegments)}}class Hv extends Uo{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ge(16777215),this.specular=new ge(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qp,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ir extends Uo{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qp,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class zT extends Uo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=DE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class IT extends Uo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Yy extends hn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=i}dispose(){}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class BT extends Yy{constructor(e,i,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ge(i)}copy(e,i){return super.copy(e,i),this.groundColor.copy(e.groundColor),this}}const Xd=new Ze,Gv=new nt,Vv=new nt;class FT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kp,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,r=this.matrix;Gv.setFromMatrixPosition(e.matrixWorld),i.position.copy(Gv),Vv.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(Vv),i.updateMatrixWorld(),Xd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xd),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Xd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qy extends Vy{constructor(e=-1,i=1,r=1,u=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=u,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,u,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,u=(this.top+this.bottom)/2;let f=r-e,h=r+e,d=u+i,p=u-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=m*this.view.offsetX,h=f+m*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class HT extends FT{constructor(){super(new qy(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class GT extends Yy{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new HT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class VT extends Ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Xv{constructor(e=1,i=0,r=0){return this.radius=e,this.phi=i,this.theta=r,this}set(e,i,r){return this.radius=e,this.phi=i,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,r){return this.radius=Math.sqrt(e*e+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(me(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class XT extends ur{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function kv(o,e,i,r){const u=kT(r);switch(i){case Ay:return o*e;case Cy:return o*e;case wy:return o*e*2;case Vp:return o*e/u.components*u.byteLength;case Xp:return o*e/u.components*u.byteLength;case Dy:return o*e*2/u.components*u.byteLength;case kp:return o*e*2/u.components*u.byteLength;case Ry:return o*e*3/u.components*u.byteLength;case Ii:return o*e*4/u.components*u.byteLength;case Yp:return o*e*4/u.components*u.byteLength;case Dc:case Uc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Nc:case Lc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case fp:case dp:return Math.max(o,16)*Math.max(e,8)/4;case cp:case hp:return Math.max(o,8)*Math.max(e,8)/2;case pp:case mp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case gp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case _p:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case vp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case yp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Sp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Mp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case xp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Ep:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Tp:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case bp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Ap:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Rp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Cp:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case wp:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Dp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Oc:case Up:case Np:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Uy:case Lp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Op:case Pp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function kT(o){switch(o){case Ua:case Ey:return{byteLength:1,components:1};case Ol:case Ty:case zl:return{byteLength:2,components:1};case Hp:case Gp:return{byteLength:2,components:4};case rr:case Fp:case ea:return{byteLength:4,components:1};case by:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wy(){let o=null,e=!1,i=null,r=null;function u(f,h){i(f,h),r=o.requestAnimationFrame(u)}return{start:function(){e!==!0&&i!==null&&(r=o.requestAnimationFrame(u),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function YT(o){const e=new WeakMap;function i(d,p){const m=d.array,v=d.usage,g=m.byteLength,y=o.createBuffer();o.bindBuffer(p,y),o.bufferData(p,m,v),d.onUploadCallback();let x;if(m instanceof Float32Array)x=o.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?x=o.HALF_FLOAT:x=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)x=o.SHORT;else if(m instanceof Uint32Array)x=o.UNSIGNED_INT;else if(m instanceof Int32Array)x=o.INT;else if(m instanceof Int8Array)x=o.BYTE;else if(m instanceof Uint8Array)x=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)x=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:y,type:x,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:g}}function r(d,p,m){const v=p.array,g=p.updateRanges;if(o.bindBuffer(m,d),g.length===0)o.bufferSubData(m,0,v);else{g.sort((x,b)=>x.start-b.start);let y=0;for(let x=1;x<g.length;x++){const b=g[y],w=g[x];w.start<=b.start+b.count+1?b.count=Math.max(b.count,w.start+w.count-b.start):(++y,g[y]=w)}g.length=y+1;for(let x=0,b=g.length;x<b;x++){const w=g[x];o.bufferSubData(m,w.start*v.BYTES_PER_ELEMENT,v,w.start,w.count)}p.clearUpdateRanges()}p.onUploadCallback()}function u(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(o.deleteBuffer(p.buffer),e.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,i(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,d,p),m.version=d.version}}return{get:u,remove:f,update:h}}var qT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,WT=`#ifdef USE_ALPHAHASH
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
#endif`,jT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ZT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,QT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,JT=`#ifdef USE_AOMAP
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
#endif`,$T=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tb=`#ifdef USE_BATCHING
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
#endif`,eb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ib=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ab=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sb=`#ifdef USE_IRIDESCENCE
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
#endif`,rb=`#ifdef USE_BUMPMAP
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
#endif`,ob=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,db=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pb=`#if defined( USE_COLOR_ALPHA )
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
#endif`,mb=`#define PI 3.141592653589793
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
} // validated`,gb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_b=`vec3 transformedNormal = objectNormal;
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
#endif`,vb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Eb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tb=`#ifdef USE_ENVMAP
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
#endif`,bb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ab=`#ifdef USE_ENVMAP
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
#endif`,Rb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cb=`#ifdef USE_ENVMAP
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
#endif`,wb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Db=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ub=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lb=`#ifdef USE_GRADIENTMAP
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
}`,Ob=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ib=`uniform bool receiveShadow;
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
#endif`,Bb=`#ifdef USE_ENVMAP
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
#endif`,Fb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xb=`PhysicalMaterial material;
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
#endif`,kb=`struct PhysicalMaterial {
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
}`,Yb=`
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
#endif`,qb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$b=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,t1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,e1=`#if defined( USE_POINTS_UV )
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
#endif`,n1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,r1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o1=`#ifdef USE_MORPHTARGETS
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
#endif`,l1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,c1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,f1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,p1=`#ifdef USE_NORMALMAP
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
#endif`,m1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,g1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,y1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,M1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,x1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,E1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,A1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,R1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,C1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,D1=`float getShadowMask() {
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
}`,U1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N1=`#ifdef USE_SKINNING
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
#endif`,L1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O1=`#ifdef USE_SKINNING
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
#endif`,P1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,z1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,I1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,B1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,F1=`#ifdef USE_TRANSMISSION
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
#endif`,H1=`#ifdef USE_TRANSMISSION
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
#endif`,G1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Y1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,q1=`uniform sampler2D t2D;
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
}`,W1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Z1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q1=`#include <common>
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
}`,J1=`#if DEPTH_PACKING == 3200
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
}`,$1=`#define DISTANCE
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
}`,tA=`#define DISTANCE
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
}`,eA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iA=`uniform float scale;
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
}`,aA=`uniform vec3 diffuse;
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
}`,sA=`#include <common>
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
}`,rA=`uniform vec3 diffuse;
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
}`,oA=`#define LAMBERT
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
}`,lA=`#define LAMBERT
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
}`,uA=`#define MATCAP
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
}`,cA=`#define MATCAP
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
}`,fA=`#define NORMAL
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
}`,hA=`#define NORMAL
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
}`,dA=`#define PHONG
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
}`,pA=`#define PHONG
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
}`,mA=`#define STANDARD
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
}`,gA=`#define STANDARD
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
}`,_A=`#define TOON
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
}`,vA=`#define TOON
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
}`,yA=`uniform float size;
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
}`,SA=`uniform vec3 diffuse;
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
}`,MA=`#include <common>
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
}`,xA=`uniform vec3 color;
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
}`,EA=`uniform float rotation;
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
}`,TA=`uniform vec3 diffuse;
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
}`,he={alphahash_fragment:qT,alphahash_pars_fragment:WT,alphamap_fragment:jT,alphamap_pars_fragment:ZT,alphatest_fragment:KT,alphatest_pars_fragment:QT,aomap_fragment:JT,aomap_pars_fragment:$T,batching_pars_vertex:tb,batching_vertex:eb,begin_vertex:nb,beginnormal_vertex:ib,bsdfs:ab,iridescence_fragment:sb,bumpmap_pars_fragment:rb,clipping_planes_fragment:ob,clipping_planes_pars_fragment:lb,clipping_planes_pars_vertex:ub,clipping_planes_vertex:cb,color_fragment:fb,color_pars_fragment:hb,color_pars_vertex:db,color_vertex:pb,common:mb,cube_uv_reflection_fragment:gb,defaultnormal_vertex:_b,displacementmap_pars_vertex:vb,displacementmap_vertex:yb,emissivemap_fragment:Sb,emissivemap_pars_fragment:Mb,colorspace_fragment:xb,colorspace_pars_fragment:Eb,envmap_fragment:Tb,envmap_common_pars_fragment:bb,envmap_pars_fragment:Ab,envmap_pars_vertex:Rb,envmap_physical_pars_fragment:Bb,envmap_vertex:Cb,fog_vertex:wb,fog_pars_vertex:Db,fog_fragment:Ub,fog_pars_fragment:Nb,gradientmap_pars_fragment:Lb,lightmap_pars_fragment:Ob,lights_lambert_fragment:Pb,lights_lambert_pars_fragment:zb,lights_pars_begin:Ib,lights_toon_fragment:Fb,lights_toon_pars_fragment:Hb,lights_phong_fragment:Gb,lights_phong_pars_fragment:Vb,lights_physical_fragment:Xb,lights_physical_pars_fragment:kb,lights_fragment_begin:Yb,lights_fragment_maps:qb,lights_fragment_end:Wb,logdepthbuf_fragment:jb,logdepthbuf_pars_fragment:Zb,logdepthbuf_pars_vertex:Kb,logdepthbuf_vertex:Qb,map_fragment:Jb,map_pars_fragment:$b,map_particle_fragment:t1,map_particle_pars_fragment:e1,metalnessmap_fragment:n1,metalnessmap_pars_fragment:i1,morphinstance_vertex:a1,morphcolor_vertex:s1,morphnormal_vertex:r1,morphtarget_pars_vertex:o1,morphtarget_vertex:l1,normal_fragment_begin:u1,normal_fragment_maps:c1,normal_pars_fragment:f1,normal_pars_vertex:h1,normal_vertex:d1,normalmap_pars_fragment:p1,clearcoat_normal_fragment_begin:m1,clearcoat_normal_fragment_maps:g1,clearcoat_pars_fragment:_1,iridescence_pars_fragment:v1,opaque_fragment:y1,packing:S1,premultiplied_alpha_fragment:M1,project_vertex:x1,dithering_fragment:E1,dithering_pars_fragment:T1,roughnessmap_fragment:b1,roughnessmap_pars_fragment:A1,shadowmap_pars_fragment:R1,shadowmap_pars_vertex:C1,shadowmap_vertex:w1,shadowmask_pars_fragment:D1,skinbase_vertex:U1,skinning_pars_vertex:N1,skinning_vertex:L1,skinnormal_vertex:O1,specularmap_fragment:P1,specularmap_pars_fragment:z1,tonemapping_fragment:I1,tonemapping_pars_fragment:B1,transmission_fragment:F1,transmission_pars_fragment:H1,uv_pars_fragment:G1,uv_pars_vertex:V1,uv_vertex:X1,worldpos_vertex:k1,background_vert:Y1,background_frag:q1,backgroundCube_vert:W1,backgroundCube_frag:j1,cube_vert:Z1,cube_frag:K1,depth_vert:Q1,depth_frag:J1,distanceRGBA_vert:$1,distanceRGBA_frag:tA,equirect_vert:eA,equirect_frag:nA,linedashed_vert:iA,linedashed_frag:aA,meshbasic_vert:sA,meshbasic_frag:rA,meshlambert_vert:oA,meshlambert_frag:lA,meshmatcap_vert:uA,meshmatcap_frag:cA,meshnormal_vert:fA,meshnormal_frag:hA,meshphong_vert:dA,meshphong_frag:pA,meshphysical_vert:mA,meshphysical_frag:gA,meshtoon_vert:_A,meshtoon_frag:vA,points_vert:yA,points_frag:SA,shadow_vert:MA,shadow_frag:xA,sprite_vert:EA,sprite_frag:TA},Ut={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},Ji={basic:{uniforms:Yn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:Yn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ge(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:Yn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:Yn([Ut.common,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.roughnessmap,Ut.metalnessmap,Ut.fog,Ut.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:Yn([Ut.common,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.gradientmap,Ut.fog,Ut.lights,{emissive:{value:new ge(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:Yn([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:Yn([Ut.points,Ut.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:Yn([Ut.common,Ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:Yn([Ut.common,Ut.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:Yn([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:Yn([Ut.sprite,Ut.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:Yn([Ut.common,Ut.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:Yn([Ut.lights,Ut.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};Ji.physical={uniforms:Yn([Ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};const Ac={r:0,b:0,g:0},Ws=new Fi,bA=new Ze;function AA(o,e,i,r,u,f,h){const d=new ge(0);let p=f===!0?0:1,m,v,g=null,y=0,x=null;function b(P){let U=P.isScene===!0?P.background:null;return U&&U.isTexture&&(U=(P.backgroundBlurriness>0?i:e).get(U)),U}function w(P){let U=!1;const V=b(P);V===null?S(d,p):V&&V.isColor&&(S(V,1),U=!0);const H=o.xr.getEnvironmentBlendMode();H==="additive"?r.buffers.color.setClear(0,0,0,1,h):H==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(o.autoClear||U)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function M(P,U){const V=b(U);V&&(V.isCubeTexture||V.mapping===Hc)?(v===void 0&&(v=new di(new $n(1,1,1),new vs({name:"BackgroundCubeMaterial",uniforms:Co(Ji.backgroundCube.uniforms),vertexShader:Ji.backgroundCube.vertexShader,fragmentShader:Ji.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(H,O,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),u.update(v)),Ws.copy(U.backgroundRotation),Ws.x*=-1,Ws.y*=-1,Ws.z*=-1,V.isCubeTexture&&V.isRenderTargetTexture===!1&&(Ws.y*=-1,Ws.z*=-1),v.material.uniforms.envMap.value=V,v.material.uniforms.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(bA.makeRotationFromEuler(Ws)),v.material.toneMapped=Ue.getTransfer(V.colorSpace)!==Fe,(g!==V||y!==V.version||x!==o.toneMapping)&&(v.material.needsUpdate=!0,g=V,y=V.version,x=o.toneMapping),v.layers.enableAll(),P.unshift(v,v.geometry,v.material,0,0,null)):V&&V.isTexture&&(m===void 0&&(m=new di(new Gc(2,2),new vs({name:"BackgroundMaterial",uniforms:Co(Ji.background.uniforms),vertexShader:Ji.background.vertexShader,fragmentShader:Ji.background.fragmentShader,side:Da,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),u.update(m)),m.material.uniforms.t2D.value=V,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=Ue.getTransfer(V.colorSpace)!==Fe,V.matrixAutoUpdate===!0&&V.updateMatrix(),m.material.uniforms.uvTransform.value.copy(V.matrix),(g!==V||y!==V.version||x!==o.toneMapping)&&(m.material.needsUpdate=!0,g=V,y=V.version,x=o.toneMapping),m.layers.enableAll(),P.unshift(m,m.geometry,m.material,0,0,null))}function S(P,U){P.getRGB(Ac,Gy(o)),r.buffers.color.setClear(Ac.r,Ac.g,Ac.b,U,h)}function z(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(P,U=1){d.set(P),p=U,S(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(P){p=P,S(d,p)},render:w,addToRenderList:M,dispose:z}}function RA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),r={},u=y(null);let f=u,h=!1;function d(A,B,ot,it,pt){let ht=!1;const W=g(it,ot,B);f!==W&&(f=W,m(f.object)),ht=x(A,it,ot,pt),ht&&b(A,it,ot,pt),pt!==null&&e.update(pt,o.ELEMENT_ARRAY_BUFFER),(ht||h)&&(h=!1,U(A,B,ot,it),pt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(pt).buffer))}function p(){return o.createVertexArray()}function m(A){return o.bindVertexArray(A)}function v(A){return o.deleteVertexArray(A)}function g(A,B,ot){const it=ot.wireframe===!0;let pt=r[A.id];pt===void 0&&(pt={},r[A.id]=pt);let ht=pt[B.id];ht===void 0&&(ht={},pt[B.id]=ht);let W=ht[it];return W===void 0&&(W=y(p()),ht[it]=W),W}function y(A){const B=[],ot=[],it=[];for(let pt=0;pt<i;pt++)B[pt]=0,ot[pt]=0,it[pt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:ot,attributeDivisors:it,object:A,attributes:{},index:null}}function x(A,B,ot,it){const pt=f.attributes,ht=B.attributes;let W=0;const st=ot.getAttributes();for(const Q in st)if(st[Q].location>=0){const St=pt[Q];let Ht=ht[Q];if(Ht===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(Ht=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(Ht=A.instanceColor)),St===void 0||St.attribute!==Ht||Ht&&St.data!==Ht.data)return!0;W++}return f.attributesNum!==W||f.index!==it}function b(A,B,ot,it){const pt={},ht=B.attributes;let W=0;const st=ot.getAttributes();for(const Q in st)if(st[Q].location>=0){let St=ht[Q];St===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(St=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(St=A.instanceColor));const Ht={};Ht.attribute=St,St&&St.data&&(Ht.data=St.data),pt[Q]=Ht,W++}f.attributes=pt,f.attributesNum=W,f.index=it}function w(){const A=f.newAttributes;for(let B=0,ot=A.length;B<ot;B++)A[B]=0}function M(A){S(A,0)}function S(A,B){const ot=f.newAttributes,it=f.enabledAttributes,pt=f.attributeDivisors;ot[A]=1,it[A]===0&&(o.enableVertexAttribArray(A),it[A]=1),pt[A]!==B&&(o.vertexAttribDivisor(A,B),pt[A]=B)}function z(){const A=f.newAttributes,B=f.enabledAttributes;for(let ot=0,it=B.length;ot<it;ot++)B[ot]!==A[ot]&&(o.disableVertexAttribArray(ot),B[ot]=0)}function P(A,B,ot,it,pt,ht,W){W===!0?o.vertexAttribIPointer(A,B,ot,pt,ht):o.vertexAttribPointer(A,B,ot,it,pt,ht)}function U(A,B,ot,it){w();const pt=it.attributes,ht=ot.getAttributes(),W=B.defaultAttributeValues;for(const st in ht){const Q=ht[st];if(Q.location>=0){let yt=pt[st];if(yt===void 0&&(st==="instanceMatrix"&&A.instanceMatrix&&(yt=A.instanceMatrix),st==="instanceColor"&&A.instanceColor&&(yt=A.instanceColor)),yt!==void 0){const St=yt.normalized,Ht=yt.itemSize,ee=e.get(yt);if(ee===void 0)continue;const be=ee.buffer,C=ee.type,Z=ee.bytesPerElement,mt=C===o.INT||C===o.UNSIGNED_INT||yt.gpuType===Fp;if(yt.isInterleavedBufferAttribute){const ut=yt.data,Tt=ut.stride,Vt=yt.offset;if(ut.isInstancedInterleavedBuffer){for(let wt=0;wt<Q.locationSize;wt++)S(Q.location+wt,ut.meshPerAttribute);A.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let wt=0;wt<Q.locationSize;wt++)M(Q.location+wt);o.bindBuffer(o.ARRAY_BUFFER,be);for(let wt=0;wt<Q.locationSize;wt++)P(Q.location+wt,Ht/Q.locationSize,C,St,Tt*Z,(Vt+Ht/Q.locationSize*wt)*Z,mt)}else{if(yt.isInstancedBufferAttribute){for(let ut=0;ut<Q.locationSize;ut++)S(Q.location+ut,yt.meshPerAttribute);A.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let ut=0;ut<Q.locationSize;ut++)M(Q.location+ut);o.bindBuffer(o.ARRAY_BUFFER,be);for(let ut=0;ut<Q.locationSize;ut++)P(Q.location+ut,Ht/Q.locationSize,C,St,Ht*Z,Ht/Q.locationSize*ut*Z,mt)}}else if(W!==void 0){const St=W[st];if(St!==void 0)switch(St.length){case 2:o.vertexAttrib2fv(Q.location,St);break;case 3:o.vertexAttrib3fv(Q.location,St);break;case 4:o.vertexAttrib4fv(Q.location,St);break;default:o.vertexAttrib1fv(Q.location,St)}}}}z()}function V(){I();for(const A in r){const B=r[A];for(const ot in B){const it=B[ot];for(const pt in it)v(it[pt].object),delete it[pt];delete B[ot]}delete r[A]}}function H(A){if(r[A.id]===void 0)return;const B=r[A.id];for(const ot in B){const it=B[ot];for(const pt in it)v(it[pt].object),delete it[pt];delete B[ot]}delete r[A.id]}function O(A){for(const B in r){const ot=r[B];if(ot[A.id]===void 0)continue;const it=ot[A.id];for(const pt in it)v(it[pt].object),delete it[pt];delete ot[A.id]}}function I(){D(),h=!0,f!==u&&(f=u,m(f.object))}function D(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:d,reset:I,resetDefaultState:D,dispose:V,releaseStatesOfGeometry:H,releaseStatesOfProgram:O,initAttributes:w,enableAttribute:M,disableUnusedAttributes:z}}function CA(o,e,i){let r;function u(m){r=m}function f(m,v){o.drawArrays(r,m,v),i.update(v,r,1)}function h(m,v,g){g!==0&&(o.drawArraysInstanced(r,m,v,g),i.update(v,r,g))}function d(m,v,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,v,0,g);let x=0;for(let b=0;b<g;b++)x+=v[b];i.update(x,r,1)}function p(m,v,g,y){if(g===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let b=0;b<m.length;b++)h(m[b],v[b],y[b]);else{x.multiDrawArraysInstancedWEBGL(r,m,0,v,0,y,0,g);let b=0;for(let w=0;w<g;w++)b+=v[w]*y[w];i.update(b,r,1)}}this.setMode=u,this.render=f,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function wA(o,e,i,r){let u;function f(){if(u!==void 0)return u;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");u=o.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else u=0;return u}function h(O){return!(O!==Ii&&r.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const I=O===zl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==Ua&&r.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==ea&&!I)}function p(O){if(O==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const v=p(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const g=i.logarithmicDepthBuffer===!0,y=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),x=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),b=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=o.getParameter(o.MAX_TEXTURE_SIZE),M=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),S=o.getParameter(o.MAX_VERTEX_ATTRIBS),z=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),P=o.getParameter(o.MAX_VARYING_VECTORS),U=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),V=b>0,H=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:g,reverseDepthBuffer:y,maxTextures:x,maxVertexTextures:b,maxTextureSize:w,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:z,maxVaryings:P,maxFragmentUniforms:U,vertexTextures:V,maxSamples:H}}function DA(o){const e=this;let i=null,r=0,u=!1,f=!1;const h=new ds,d=new fe,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(g,y){const x=g.length!==0||y||r!==0||u;return u=y,r=g.length,x},this.beginShadows=function(){f=!0,v(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(g,y){i=v(g,y,0)},this.setState=function(g,y,x){const b=g.clippingPlanes,w=g.clipIntersection,M=g.clipShadows,S=o.get(g);if(!u||b===null||b.length===0||f&&!M)f?v(null):m();else{const z=f?0:r,P=z*4;let U=S.clippingState||null;p.value=U,U=v(b,y,P,x);for(let V=0;V!==P;++V)U[V]=i[V];S.clippingState=U,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=z}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(g,y,x,b){const w=g!==null?g.length:0;let M=null;if(w!==0){if(M=p.value,b!==!0||M===null){const S=x+w*4,z=y.matrixWorldInverse;d.getNormalMatrix(z),(M===null||M.length<S)&&(M=new Float32Array(S));for(let P=0,U=x;P!==w;++P,U+=4)h.copy(g[P]).applyMatrix4(z,d),h.normal.toArray(M,U),M[U+3]=h.constant}p.value=M,p.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,M}}function UA(o){let e=new WeakMap;function i(h,d){return d===rp?h.mapping=Eo:d===op&&(h.mapping=To),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===rp||d===op)if(e.has(h)){const p=e.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const m=new wT(p.height);return m.fromEquirectangularTexture(o,h),e.set(h,m),h.addEventListener("dispose",u),i(m.texture,h.mapping)}else return null}}return h}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){e=new WeakMap}return{get:r,dispose:f}}const go=4,Yv=[.125,.215,.35,.446,.526,.582],$s=20,kd=new qy,qv=new ge;let Yd=null,qd=0,Wd=0,jd=!1;const Ks=(1+Math.sqrt(5))/2,fo=1/Ks,Wv=[new nt(-Ks,fo,0),new nt(Ks,fo,0),new nt(-fo,0,Ks),new nt(fo,0,Ks),new nt(0,Ks,-fo),new nt(0,Ks,fo),new nt(-1,1,-1),new nt(1,1,-1),new nt(-1,1,1),new nt(1,1,1)];class jv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,r=.1,u=100){Yd=this._renderer.getRenderTarget(),qd=this._renderer.getActiveCubeFace(),Wd=this._renderer.getActiveMipmapLevel(),jd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const f=this._allocateTargets();return f.depthBuffer=!0,this._sceneToCubeUV(e,r,u,f),i>0&&this._blur(f,0,0,i),this._applyPMREM(f),this._cleanup(f),f}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yd,qd,Wd),this._renderer.xr.enabled=jd,e.scissorTest=!1,Rc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Eo||e.mapping===To?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yd=this._renderer.getRenderTarget(),qd=this._renderer.getActiveCubeFace(),Wd=this._renderer.getActiveMipmapLevel(),jd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:ta,minFilter:ta,generateMipmaps:!1,type:zl,format:Ii,colorSpace:Ro,depthBuffer:!1},u=Zv(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zv(e,i,r);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=NA(f)),this._blurMaterial=LA(f,e,i)}return u}_compileMaterial(e){const i=new di(this._lodPlanes[0],e);this._renderer.compile(i,kd)}_sceneToCubeUV(e,i,r,u){const d=new Ai(90,1,i,r),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,y=v.toneMapping;v.getClearColor(qv),v.toneMapping=gs,v.autoClear=!1;const x=new jp({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1}),b=new di(new $n,x);let w=!1;const M=e.background;M?M.isColor&&(x.color.copy(M),e.background=null,w=!0):(x.color.copy(qv),w=!0);for(let S=0;S<6;S++){const z=S%3;z===0?(d.up.set(0,p[S],0),d.lookAt(m[S],0,0)):z===1?(d.up.set(0,0,p[S]),d.lookAt(0,m[S],0)):(d.up.set(0,p[S],0),d.lookAt(0,0,m[S]));const P=this._cubeSize;Rc(u,z*P,S>2?P:0,P,P),v.setRenderTarget(u),w&&v.render(b,d),v.render(e,d)}b.geometry.dispose(),b.material.dispose(),v.toneMapping=y,v.autoClear=g,e.background=M}_textureToCubeUV(e,i){const r=this._renderer,u=e.mapping===Eo||e.mapping===To;u?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kv());const f=u?this._cubemapMaterial:this._equirectMaterial,h=new di(this._lodPlanes[0],f),d=f.uniforms;d.envMap.value=e;const p=this._cubeSize;Rc(i,0,0,3*p,2*p),r.setRenderTarget(i),r.render(h,kd)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const u=this._lodPlanes.length;for(let f=1;f<u;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),d=Wv[(u-f-1)%Wv.length];this._blur(e,f-1,f,h,d)}i.autoClear=r}_blur(e,i,r,u,f){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,u,"latitudinal",f),this._halfBlur(h,e,r,r,u,"longitudinal",f)}_halfBlur(e,i,r,u,f,h,d){const p=this._renderer,m=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,g=new di(this._lodPlanes[u],m),y=m.uniforms,x=this._sizeLods[r]-1,b=isFinite(f)?Math.PI/(2*x):2*Math.PI/(2*$s-1),w=f/b,M=isFinite(f)?1+Math.floor(v*w):$s;M>$s&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${$s}`);const S=[];let z=0;for(let O=0;O<$s;++O){const I=O/w,D=Math.exp(-I*I/2);S.push(D),O===0?z+=D:O<M&&(z+=2*D)}for(let O=0;O<S.length;O++)S[O]=S[O]/z;y.envMap.value=e.texture,y.samples.value=M,y.weights.value=S,y.latitudinal.value=h==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:P}=this;y.dTheta.value=b,y.mipInt.value=P-r;const U=this._sizeLods[u],V=3*U*(u>P-go?u-P+go:0),H=4*(this._cubeSize-U);Rc(i,V,H,3*U,2*U),p.setRenderTarget(i),p.render(g,kd)}}function NA(o){const e=[],i=[],r=[];let u=o;const f=o-go+1+Yv.length;for(let h=0;h<f;h++){const d=Math.pow(2,u);i.push(d);let p=1/d;h>o-go?p=Yv[h-o+go-1]:h===0&&(p=0),r.push(p);const m=1/(d-2),v=-m,g=1+m,y=[v,v,g,v,g,g,v,v,g,g,v,g],x=6,b=6,w=3,M=2,S=1,z=new Float32Array(w*b*x),P=new Float32Array(M*b*x),U=new Float32Array(S*b*x);for(let H=0;H<x;H++){const O=H%3*2/3-1,I=H>2?0:-1,D=[O,I,0,O+2/3,I,0,O+2/3,I+1,0,O,I,0,O+2/3,I+1,0,O,I+1,0];z.set(D,w*b*H),P.set(y,M*b*H);const A=[H,H,H,H,H,H];U.set(A,S*b*H)}const V=new ys;V.setAttribute("position",new Bi(z,w)),V.setAttribute("uv",new Bi(P,M)),V.setAttribute("faceIndex",new Bi(U,S)),e.push(V),u>go&&u--}return{lodPlanes:e,sizeLods:i,sigmas:r}}function Zv(o,e,i){const r=new or(o,e,i);return r.texture.mapping=Hc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Rc(o,e,i,r,u){o.viewport.set(e,i,r,u),o.scissor.set(e,i,r,u)}function LA(o,e,i){const r=new Float32Array($s),u=new nt(0,1,0);return new vs({name:"SphericalGaussianBlur",defines:{n:$s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Qp(),fragmentShader:`

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
		`,blending:ms,depthTest:!1,depthWrite:!1})}function Kv(){return new vs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qp(),fragmentShader:`

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
		`,blending:ms,depthTest:!1,depthWrite:!1})}function Qv(){return new vs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ms,depthTest:!1,depthWrite:!1})}function Qp(){return`

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
	`}function OA(o){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const p=d.mapping,m=p===rp||p===op,v=p===Eo||p===To;if(m||v){let g=e.get(d);const y=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new jv(o)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{const x=d.image;return m&&x&&x.height>0||v&&x&&u(x)?(i===null&&(i=new jv(o)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",f),g.texture):null}}}return d}function u(d){let p=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&p++;return p===m}function f(d){const p=d.target;p.removeEventListener("dispose",f);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function PA(o){const e={};function i(r){if(e[r]!==void 0)return e[r];let u;switch(r){case"WEBGL_depth_texture":u=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":u=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":u=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":u=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:u=o.getExtension(r)}return e[r]=u,u}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const u=i(r);return u===null&&po("THREE.WebGLRenderer: "+r+" extension not supported."),u}}}function zA(o,e,i,r){const u={},f=new WeakMap;function h(g){const y=g.target;y.index!==null&&e.remove(y.index);for(const b in y.attributes)e.remove(y.attributes[b]);y.removeEventListener("dispose",h),delete u[y.id];const x=f.get(y);x&&(e.remove(x),f.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(g,y){return u[y.id]===!0||(y.addEventListener("dispose",h),u[y.id]=!0,i.memory.geometries++),y}function p(g){const y=g.attributes;for(const x in y)e.update(y[x],o.ARRAY_BUFFER)}function m(g){const y=[],x=g.index,b=g.attributes.position;let w=0;if(x!==null){const z=x.array;w=x.version;for(let P=0,U=z.length;P<U;P+=3){const V=z[P+0],H=z[P+1],O=z[P+2];y.push(V,H,H,O,O,V)}}else if(b!==void 0){const z=b.array;w=b.version;for(let P=0,U=z.length/3-1;P<U;P+=3){const V=P+0,H=P+1,O=P+2;y.push(V,H,H,O,O,V)}}else return;const M=new(Ly(y)?Hy:Fy)(y,1);M.version=w;const S=f.get(g);S&&e.remove(S),f.set(g,M)}function v(g){const y=f.get(g);if(y){const x=g.index;x!==null&&y.version<x.version&&m(g)}else m(g);return f.get(g)}return{get:d,update:p,getWireframeAttribute:v}}function IA(o,e,i){let r;function u(y){r=y}let f,h;function d(y){f=y.type,h=y.bytesPerElement}function p(y,x){o.drawElements(r,x,f,y*h),i.update(x,r,1)}function m(y,x,b){b!==0&&(o.drawElementsInstanced(r,x,f,y*h,b),i.update(x,r,b))}function v(y,x,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,x,0,f,y,0,b);let M=0;for(let S=0;S<b;S++)M+=x[S];i.update(M,r,1)}function g(y,x,b,w){if(b===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let S=0;S<y.length;S++)m(y[S]/h,x[S],w[S]);else{M.multiDrawElementsInstancedWEBGL(r,x,0,f,y,0,w,0,b);let S=0;for(let z=0;z<b;z++)S+=x[z]*w[z];i.update(S,r,1)}}this.setMode=u,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=g}function BA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function u(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:u,update:r}}function FA(o,e,i){const r=new WeakMap,u=new nn;function f(h,d,p){const m=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=v!==void 0?v.length:0;let y=r.get(d);if(y===void 0||y.count!==g){let A=function(){I.dispose(),r.delete(d),d.removeEventListener("dispose",A)};var x=A;y!==void 0&&y.texture.dispose();const b=d.morphAttributes.position!==void 0,w=d.morphAttributes.normal!==void 0,M=d.morphAttributes.color!==void 0,S=d.morphAttributes.position||[],z=d.morphAttributes.normal||[],P=d.morphAttributes.color||[];let U=0;b===!0&&(U=1),w===!0&&(U=2),M===!0&&(U=3);let V=d.attributes.position.count*U,H=1;V>e.maxTextureSize&&(H=Math.ceil(V/e.maxTextureSize),V=e.maxTextureSize);const O=new Float32Array(V*H*4*g),I=new Py(O,V,H,g);I.type=ea,I.needsUpdate=!0;const D=U*4;for(let B=0;B<g;B++){const ot=S[B],it=z[B],pt=P[B],ht=V*H*4*B;for(let W=0;W<ot.count;W++){const st=W*D;b===!0&&(u.fromBufferAttribute(ot,W),O[ht+st+0]=u.x,O[ht+st+1]=u.y,O[ht+st+2]=u.z,O[ht+st+3]=0),w===!0&&(u.fromBufferAttribute(it,W),O[ht+st+4]=u.x,O[ht+st+5]=u.y,O[ht+st+6]=u.z,O[ht+st+7]=0),M===!0&&(u.fromBufferAttribute(pt,W),O[ht+st+8]=u.x,O[ht+st+9]=u.y,O[ht+st+10]=u.z,O[ht+st+11]=pt.itemSize===4?u.w:1)}}y={count:g,texture:I,size:new ce(V,H)},r.set(d,y),d.addEventListener("dispose",A)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let b=0;for(let M=0;M<m.length;M++)b+=m[M];const w=d.morphTargetsRelative?1:1-b;p.getUniforms().setValue(o,"morphTargetBaseInfluence",w),p.getUniforms().setValue(o,"morphTargetInfluences",m)}p.getUniforms().setValue(o,"morphTargetsTexture",y.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",y.size)}return{update:f}}function HA(o,e,i,r){let u=new WeakMap;function f(p){const m=r.render.frame,v=p.geometry,g=e.get(p,v);if(u.get(g)!==m&&(e.update(g),u.set(g,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),u.get(p)!==m&&(i.update(p.instanceMatrix,o.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,o.ARRAY_BUFFER),u.set(p,m))),p.isSkinnedMesh){const y=p.skeleton;u.get(y)!==m&&(y.update(),u.set(y,m))}return g}function h(){u=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:f,dispose:h}}const jy=new qn,Jv=new ky(1,1),Zy=new Py,Ky=new hT,Qy=new Xy,$v=[],ty=[],ey=new Float32Array(16),ny=new Float32Array(9),iy=new Float32Array(4);function No(o,e,i){const r=o[0];if(r<=0||r>0)return o;const u=e*i;let f=$v[u];if(f===void 0&&(f=new Float32Array(u),$v[u]=f),e!==0){r.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function _n(o,e){if(o.length!==e.length)return!1;for(let i=0,r=o.length;i<r;i++)if(o[i]!==e[i])return!1;return!0}function vn(o,e){for(let i=0,r=e.length;i<r;i++)o[i]=e[i]}function Vc(o,e){let i=ty[e];i===void 0&&(i=new Int32Array(e),ty[e]=i);for(let r=0;r!==e;++r)i[r]=o.allocateTextureUnit();return i}function GA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function VA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_n(i,e))return;o.uniform2fv(this.addr,e),vn(i,e)}}function XA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(_n(i,e))return;o.uniform3fv(this.addr,e),vn(i,e)}}function kA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_n(i,e))return;o.uniform4fv(this.addr,e),vn(i,e)}}function YA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(_n(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),vn(i,e)}else{if(_n(i,r))return;iy.set(r),o.uniformMatrix2fv(this.addr,!1,iy),vn(i,r)}}function qA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(_n(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),vn(i,e)}else{if(_n(i,r))return;ny.set(r),o.uniformMatrix3fv(this.addr,!1,ny),vn(i,r)}}function WA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(_n(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),vn(i,e)}else{if(_n(i,r))return;ey.set(r),o.uniformMatrix4fv(this.addr,!1,ey),vn(i,r)}}function jA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function ZA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_n(i,e))return;o.uniform2iv(this.addr,e),vn(i,e)}}function KA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(_n(i,e))return;o.uniform3iv(this.addr,e),vn(i,e)}}function QA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_n(i,e))return;o.uniform4iv(this.addr,e),vn(i,e)}}function JA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function $A(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_n(i,e))return;o.uniform2uiv(this.addr,e),vn(i,e)}}function tR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(_n(i,e))return;o.uniform3uiv(this.addr,e),vn(i,e)}}function eR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_n(i,e))return;o.uniform4uiv(this.addr,e),vn(i,e)}}function nR(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u);let f;this.type===o.SAMPLER_2D_SHADOW?(Jv.compareFunction=Ny,f=Jv):f=jy,i.setTexture2D(e||f,u)}function iR(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTexture3D(e||Ky,u)}function aR(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTextureCube(e||Qy,u)}function sR(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTexture2DArray(e||Zy,u)}function rR(o){switch(o){case 5126:return GA;case 35664:return VA;case 35665:return XA;case 35666:return kA;case 35674:return YA;case 35675:return qA;case 35676:return WA;case 5124:case 35670:return jA;case 35667:case 35671:return ZA;case 35668:case 35672:return KA;case 35669:case 35673:return QA;case 5125:return JA;case 36294:return $A;case 36295:return tR;case 36296:return eR;case 35678:case 36198:case 36298:case 36306:case 35682:return nR;case 35679:case 36299:case 36307:return iR;case 35680:case 36300:case 36308:case 36293:return aR;case 36289:case 36303:case 36311:case 36292:return sR}}function oR(o,e){o.uniform1fv(this.addr,e)}function lR(o,e){const i=No(e,this.size,2);o.uniform2fv(this.addr,i)}function uR(o,e){const i=No(e,this.size,3);o.uniform3fv(this.addr,i)}function cR(o,e){const i=No(e,this.size,4);o.uniform4fv(this.addr,i)}function fR(o,e){const i=No(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function hR(o,e){const i=No(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function dR(o,e){const i=No(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function pR(o,e){o.uniform1iv(this.addr,e)}function mR(o,e){o.uniform2iv(this.addr,e)}function gR(o,e){o.uniform3iv(this.addr,e)}function _R(o,e){o.uniform4iv(this.addr,e)}function vR(o,e){o.uniform1uiv(this.addr,e)}function yR(o,e){o.uniform2uiv(this.addr,e)}function SR(o,e){o.uniform3uiv(this.addr,e)}function MR(o,e){o.uniform4uiv(this.addr,e)}function xR(o,e,i){const r=this.cache,u=e.length,f=Vc(i,u);_n(r,f)||(o.uniform1iv(this.addr,f),vn(r,f));for(let h=0;h!==u;++h)i.setTexture2D(e[h]||jy,f[h])}function ER(o,e,i){const r=this.cache,u=e.length,f=Vc(i,u);_n(r,f)||(o.uniform1iv(this.addr,f),vn(r,f));for(let h=0;h!==u;++h)i.setTexture3D(e[h]||Ky,f[h])}function TR(o,e,i){const r=this.cache,u=e.length,f=Vc(i,u);_n(r,f)||(o.uniform1iv(this.addr,f),vn(r,f));for(let h=0;h!==u;++h)i.setTextureCube(e[h]||Qy,f[h])}function bR(o,e,i){const r=this.cache,u=e.length,f=Vc(i,u);_n(r,f)||(o.uniform1iv(this.addr,f),vn(r,f));for(let h=0;h!==u;++h)i.setTexture2DArray(e[h]||Zy,f[h])}function AR(o){switch(o){case 5126:return oR;case 35664:return lR;case 35665:return uR;case 35666:return cR;case 35674:return fR;case 35675:return hR;case 35676:return dR;case 5124:case 35670:return pR;case 35667:case 35671:return mR;case 35668:case 35672:return gR;case 35669:case 35673:return _R;case 5125:return vR;case 36294:return yR;case 36295:return SR;case 36296:return MR;case 35678:case 36198:case 36298:case 36306:case 35682:return xR;case 35679:case 36299:case 36307:return ER;case 35680:case 36300:case 36308:case 36293:return TR;case 36289:case 36303:case 36311:case 36292:return bR}}class RR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=rR(i.type)}}class CR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=AR(i.type)}}class wR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const u=this.seq;for(let f=0,h=u.length;f!==h;++f){const d=u[f];d.setValue(e,i[d.id],r)}}}const Zd=/(\w+)(\])?(\[|\.)?/g;function ay(o,e){o.seq.push(e),o.map[e.id]=e}function DR(o,e,i){const r=o.name,u=r.length;for(Zd.lastIndex=0;;){const f=Zd.exec(r),h=Zd.lastIndex;let d=f[1];const p=f[2]==="]",m=f[3];if(p&&(d=d|0),m===void 0||m==="["&&h+2===u){ay(i,m===void 0?new RR(d,o,e):new CR(d,o,e));break}else{let g=i.map[d];g===void 0&&(g=new wR(d),ay(i,g)),i=g}}}class Pc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let u=0;u<r;++u){const f=e.getActiveUniform(i,u),h=e.getUniformLocation(i,f.name);DR(f,h,this)}}setValue(e,i,r,u){const f=this.map[i];f!==void 0&&f.setValue(e,r,u)}setOptional(e,i,r){const u=i[r];u!==void 0&&this.setValue(e,r,u)}static upload(e,i,r,u){for(let f=0,h=i.length;f!==h;++f){const d=i[f],p=r[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,u)}}static seqWithValue(e,i){const r=[];for(let u=0,f=e.length;u!==f;++u){const h=e[u];h.id in i&&r.push(h)}return r}}function sy(o,e,i){const r=o.createShader(e);return o.shaderSource(r,i),o.compileShader(r),r}const UR=37297;let NR=0;function LR(o,e){const i=o.split(`
`),r=[],u=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=u;h<f;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const ry=new fe;function OR(o){Ue._getMatrix(ry,Ue.workingColorSpace,o);const e=`mat3( ${ry.elements.map(i=>i.toFixed(4))} )`;switch(Ue.getTransfer(o)){case zc:return[e,"LinearTransferOETF"];case Fe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function oy(o,e,i){const r=o.getShaderParameter(e,o.COMPILE_STATUS),u=o.getShaderInfoLog(e).trim();if(r&&u==="")return"";const f=/ERROR: 0:(\d+)/.exec(u);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+u+`

`+LR(o.getShaderSource(e),h)}else return u}function PR(o,e){const i=OR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function zR(o,e){let i;switch(e){case EE:i="Linear";break;case TE:i="Reinhard";break;case bE:i="Cineon";break;case My:i="ACESFilmic";break;case RE:i="AgX";break;case CE:i="Neutral";break;case AE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Cc=new nt;function IR(){Ue.getLuminanceCoefficients(Cc);const o=Cc.x.toFixed(4),e=Cc.y.toFixed(4),i=Cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ul).join(`
`)}function FR(o){const e=[];for(const i in o){const r=o[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function HR(o,e){const i={},r=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let u=0;u<r;u++){const f=o.getActiveAttrib(e,u),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function Ul(o){return o!==""}function ly(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uy(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const GR=/^[ \t]*#include +<([\w\d./]+)>/gm;function zp(o){return o.replace(GR,XR)}const VR=new Map;function XR(o,e){let i=he[e];if(i===void 0){const r=VR.get(e);if(r!==void 0)i=he[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return zp(i)}const kR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cy(o){return o.replace(kR,YR)}function YR(o,e,i,r){let u="";for(let f=parseInt(e);f<parseInt(i);f++)u+=r.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return u}function fy(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}function qR(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Sy?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===nE?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Aa&&(e="SHADOWMAP_TYPE_VSM"),e}function WR(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Eo:case To:e="ENVMAP_TYPE_CUBE";break;case Hc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jR(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case To:e="ENVMAP_MODE_REFRACTION";break}return e}function ZR(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case Fc:e="ENVMAP_BLENDING_MULTIPLY";break;case ME:e="ENVMAP_BLENDING_MIX";break;case xE:e="ENVMAP_BLENDING_ADD";break}return e}function KR(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function QR(o,e,i,r){const u=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=qR(i),m=WR(i),v=jR(i),g=ZR(i),y=KR(i),x=BR(i),b=FR(f),w=u.createProgram();let M,S,z=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Ul).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Ul).join(`
`),S.length>0&&(S+=`
`)):(M=[fy(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ul).join(`
`),S=[fy(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+v:"",i.envMap?"#define "+g:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==gs?"#define TONE_MAPPING":"",i.toneMapping!==gs?he.tonemapping_pars_fragment:"",i.toneMapping!==gs?zR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",he.colorspace_pars_fragment,PR("linearToOutputTexel",i.outputColorSpace),IR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ul).join(`
`)),h=zp(h),h=ly(h,i),h=uy(h,i),d=zp(d),d=ly(d,i),d=uy(d,i),h=cy(h),d=cy(d),i.isRawShaderMaterial!==!0&&(z=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===vv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===vv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const P=z+M+h,U=z+S+d,V=sy(u,u.VERTEX_SHADER,P),H=sy(u,u.FRAGMENT_SHADER,U);u.attachShader(w,V),u.attachShader(w,H),i.index0AttributeName!==void 0?u.bindAttribLocation(w,0,i.index0AttributeName):i.morphTargets===!0&&u.bindAttribLocation(w,0,"position"),u.linkProgram(w);function O(B){if(o.debug.checkShaderErrors){const ot=u.getProgramInfoLog(w).trim(),it=u.getShaderInfoLog(V).trim(),pt=u.getShaderInfoLog(H).trim();let ht=!0,W=!0;if(u.getProgramParameter(w,u.LINK_STATUS)===!1)if(ht=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(u,w,V,H);else{const st=oy(u,V,"vertex"),Q=oy(u,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+u.getError()+" - VALIDATE_STATUS "+u.getProgramParameter(w,u.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+ot+`
`+st+`
`+Q)}else ot!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ot):(it===""||pt==="")&&(W=!1);W&&(B.diagnostics={runnable:ht,programLog:ot,vertexShader:{log:it,prefix:M},fragmentShader:{log:pt,prefix:S}})}u.deleteShader(V),u.deleteShader(H),I=new Pc(u,w),D=HR(u,w)}let I;this.getUniforms=function(){return I===void 0&&O(this),I};let D;this.getAttributes=function(){return D===void 0&&O(this),D};let A=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=u.getProgramParameter(w,UR)),A},this.destroy=function(){r.releaseStatesOfProgram(this),u.deleteProgram(w),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=NR++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=V,this.fragmentShader=H,this}let JR=0;class $R{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,u=this._getShaderStage(i),f=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(u)===!1&&(h.add(u),u.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new tC(e),i.set(e,r)),r}}class tC{constructor(e){this.id=JR++,this.code=e,this.usedTimes=0}}function eC(o,e,i,r,u,f,h){const d=new Iy,p=new $R,m=new Set,v=[],g=u.logarithmicDepthBuffer,y=u.vertexTextures;let x=u.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(D){return m.add(D),D===0?"uv":`uv${D}`}function M(D,A,B,ot,it){const pt=ot.fog,ht=it.geometry,W=D.isMeshStandardMaterial?ot.environment:null,st=(D.isMeshStandardMaterial?i:e).get(D.envMap||W),Q=st&&st.mapping===Hc?st.image.height:null,yt=b[D.type];D.precision!==null&&(x=u.getMaxPrecision(D.precision),x!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",x,"instead."));const St=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,Ht=St!==void 0?St.length:0;let ee=0;ht.morphAttributes.position!==void 0&&(ee=1),ht.morphAttributes.normal!==void 0&&(ee=2),ht.morphAttributes.color!==void 0&&(ee=3);let be,C,Z,mt;if(yt){const Ae=Ji[yt];be=Ae.vertexShader,C=Ae.fragmentShader}else be=D.vertexShader,C=D.fragmentShader,p.update(D),Z=p.getVertexShaderID(D),mt=p.getFragmentShaderID(D);const ut=o.getRenderTarget(),Tt=o.state.buffers.depth.getReversed(),Vt=it.isInstancedMesh===!0,wt=it.isBatchedMesh===!0,At=!!D.map,It=!!D.matcap,se=!!st,G=!!D.aoMap,dn=!!D.lightMap,ae=!!D.bumpMap,Kt=!!D.normalMap,Rt=!!D.displacementMap,Me=!!D.emissiveMap,kt=!!D.metalnessMap,N=!!D.roughnessMap,T=D.anisotropy>0,tt=D.clearcoat>0,gt=D.dispersion>0,vt=D.iridescence>0,dt=D.sheen>0,Yt=D.transmission>0,Nt=T&&!!D.anisotropyMap,Pt=tt&&!!D.clearcoatMap,_e=tt&&!!D.clearcoatNormalMap,xt=tt&&!!D.clearcoatRoughnessMap,Gt=vt&&!!D.iridescenceMap,Qt=vt&&!!D.iridescenceThicknessMap,te=dt&&!!D.sheenColorMap,Ft=dt&&!!D.sheenRoughnessMap,pe=!!D.specularMap,oe=!!D.specularColorMap,Ie=!!D.specularIntensityMap,X=Yt&&!!D.transmissionMap,Lt=Yt&&!!D.thicknessMap,lt=!!D.gradientMap,_t=!!D.alphaMap,Ot=D.alphaTest>0,zt=!!D.alphaHash,re=!!D.extensions;let Ke=gs;D.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(Ke=o.toneMapping);const yn={shaderID:yt,shaderType:D.type,shaderName:D.name,vertexShader:be,fragmentShader:C,defines:D.defines,customVertexShaderID:Z,customFragmentShaderID:mt,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:x,batching:wt,batchingColor:wt&&it._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&it.instanceColor!==null,instancingMorph:Vt&&it.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:ut===null?o.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Ro,alphaToCoverage:!!D.alphaToCoverage,map:At,matcap:It,envMap:se,envMapMode:se&&st.mapping,envMapCubeUVHeight:Q,aoMap:G,lightMap:dn,bumpMap:ae,normalMap:Kt,displacementMap:y&&Rt,emissiveMap:Me,normalMapObjectSpace:Kt&&D.normalMapType===NE,normalMapTangentSpace:Kt&&D.normalMapType===qp,metalnessMap:kt,roughnessMap:N,anisotropy:T,anisotropyMap:Nt,clearcoat:tt,clearcoatMap:Pt,clearcoatNormalMap:_e,clearcoatRoughnessMap:xt,dispersion:gt,iridescence:vt,iridescenceMap:Gt,iridescenceThicknessMap:Qt,sheen:dt,sheenColorMap:te,sheenRoughnessMap:Ft,specularMap:pe,specularColorMap:oe,specularIntensityMap:Ie,transmission:Yt,transmissionMap:X,thicknessMap:Lt,gradientMap:lt,opaque:D.transparent===!1&&D.blending===yo&&D.alphaToCoverage===!1,alphaMap:_t,alphaTest:Ot,alphaHash:zt,combine:D.combine,mapUv:At&&w(D.map.channel),aoMapUv:G&&w(D.aoMap.channel),lightMapUv:dn&&w(D.lightMap.channel),bumpMapUv:ae&&w(D.bumpMap.channel),normalMapUv:Kt&&w(D.normalMap.channel),displacementMapUv:Rt&&w(D.displacementMap.channel),emissiveMapUv:Me&&w(D.emissiveMap.channel),metalnessMapUv:kt&&w(D.metalnessMap.channel),roughnessMapUv:N&&w(D.roughnessMap.channel),anisotropyMapUv:Nt&&w(D.anisotropyMap.channel),clearcoatMapUv:Pt&&w(D.clearcoatMap.channel),clearcoatNormalMapUv:_e&&w(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&w(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Gt&&w(D.iridescenceMap.channel),iridescenceThicknessMapUv:Qt&&w(D.iridescenceThicknessMap.channel),sheenColorMapUv:te&&w(D.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&w(D.sheenRoughnessMap.channel),specularMapUv:pe&&w(D.specularMap.channel),specularColorMapUv:oe&&w(D.specularColorMap.channel),specularIntensityMapUv:Ie&&w(D.specularIntensityMap.channel),transmissionMapUv:X&&w(D.transmissionMap.channel),thicknessMapUv:Lt&&w(D.thicknessMap.channel),alphaMapUv:_t&&w(D.alphaMap.channel),vertexTangents:!!ht.attributes.tangent&&(Kt||T),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,pointsUvs:it.isPoints===!0&&!!ht.attributes.uv&&(At||_t),fog:!!pt,useFog:D.fog===!0,fogExp2:!!pt&&pt.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:Tt,skinning:it.isSkinnedMesh===!0,morphTargets:ht.morphAttributes.position!==void 0,morphNormals:ht.morphAttributes.normal!==void 0,morphColors:ht.morphAttributes.color!==void 0,morphTargetsCount:Ht,morphTextureStride:ee,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:o.shadowMap.enabled&&B.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ke,decodeVideoTexture:At&&D.map.isVideoTexture===!0&&Ue.getTransfer(D.map.colorSpace)===Fe,decodeVideoTextureEmissive:Me&&D.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(D.emissiveMap.colorSpace)===Fe,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===$i,flipSided:D.side===ei,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:re&&D.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&D.extensions.multiDraw===!0||wt)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return yn.vertexUv1s=m.has(1),yn.vertexUv2s=m.has(2),yn.vertexUv3s=m.has(3),m.clear(),yn}function S(D){const A=[];if(D.shaderID?A.push(D.shaderID):(A.push(D.customVertexShaderID),A.push(D.customFragmentShaderID)),D.defines!==void 0)for(const B in D.defines)A.push(B),A.push(D.defines[B]);return D.isRawShaderMaterial===!1&&(z(A,D),P(A,D),A.push(o.outputColorSpace)),A.push(D.customProgramCacheKey),A.join()}function z(D,A){D.push(A.precision),D.push(A.outputColorSpace),D.push(A.envMapMode),D.push(A.envMapCubeUVHeight),D.push(A.mapUv),D.push(A.alphaMapUv),D.push(A.lightMapUv),D.push(A.aoMapUv),D.push(A.bumpMapUv),D.push(A.normalMapUv),D.push(A.displacementMapUv),D.push(A.emissiveMapUv),D.push(A.metalnessMapUv),D.push(A.roughnessMapUv),D.push(A.anisotropyMapUv),D.push(A.clearcoatMapUv),D.push(A.clearcoatNormalMapUv),D.push(A.clearcoatRoughnessMapUv),D.push(A.iridescenceMapUv),D.push(A.iridescenceThicknessMapUv),D.push(A.sheenColorMapUv),D.push(A.sheenRoughnessMapUv),D.push(A.specularMapUv),D.push(A.specularColorMapUv),D.push(A.specularIntensityMapUv),D.push(A.transmissionMapUv),D.push(A.thicknessMapUv),D.push(A.combine),D.push(A.fogExp2),D.push(A.sizeAttenuation),D.push(A.morphTargetsCount),D.push(A.morphAttributeCount),D.push(A.numDirLights),D.push(A.numPointLights),D.push(A.numSpotLights),D.push(A.numSpotLightMaps),D.push(A.numHemiLights),D.push(A.numRectAreaLights),D.push(A.numDirLightShadows),D.push(A.numPointLightShadows),D.push(A.numSpotLightShadows),D.push(A.numSpotLightShadowsWithMaps),D.push(A.numLightProbes),D.push(A.shadowMapType),D.push(A.toneMapping),D.push(A.numClippingPlanes),D.push(A.numClipIntersection),D.push(A.depthPacking)}function P(D,A){d.disableAll(),A.supportsVertexTextures&&d.enable(0),A.instancing&&d.enable(1),A.instancingColor&&d.enable(2),A.instancingMorph&&d.enable(3),A.matcap&&d.enable(4),A.envMap&&d.enable(5),A.normalMapObjectSpace&&d.enable(6),A.normalMapTangentSpace&&d.enable(7),A.clearcoat&&d.enable(8),A.iridescence&&d.enable(9),A.alphaTest&&d.enable(10),A.vertexColors&&d.enable(11),A.vertexAlphas&&d.enable(12),A.vertexUv1s&&d.enable(13),A.vertexUv2s&&d.enable(14),A.vertexUv3s&&d.enable(15),A.vertexTangents&&d.enable(16),A.anisotropy&&d.enable(17),A.alphaHash&&d.enable(18),A.batching&&d.enable(19),A.dispersion&&d.enable(20),A.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),A.fog&&d.enable(0),A.useFog&&d.enable(1),A.flatShading&&d.enable(2),A.logarithmicDepthBuffer&&d.enable(3),A.reverseDepthBuffer&&d.enable(4),A.skinning&&d.enable(5),A.morphTargets&&d.enable(6),A.morphNormals&&d.enable(7),A.morphColors&&d.enable(8),A.premultipliedAlpha&&d.enable(9),A.shadowMapEnabled&&d.enable(10),A.doubleSided&&d.enable(11),A.flipSided&&d.enable(12),A.useDepthPacking&&d.enable(13),A.dithering&&d.enable(14),A.transmission&&d.enable(15),A.sheen&&d.enable(16),A.opaque&&d.enable(17),A.pointsUvs&&d.enable(18),A.decodeVideoTexture&&d.enable(19),A.decodeVideoTextureEmissive&&d.enable(20),A.alphaToCoverage&&d.enable(21),D.push(d.mask)}function U(D){const A=b[D.type];let B;if(A){const ot=Ji[A];B=bT.clone(ot.uniforms)}else B=D.uniforms;return B}function V(D,A){let B;for(let ot=0,it=v.length;ot<it;ot++){const pt=v[ot];if(pt.cacheKey===A){B=pt,++B.usedTimes;break}}return B===void 0&&(B=new QR(o,A,D,f),v.push(B)),B}function H(D){if(--D.usedTimes===0){const A=v.indexOf(D);v[A]=v[v.length-1],v.pop(),D.destroy()}}function O(D){p.remove(D)}function I(){p.dispose()}return{getParameters:M,getProgramCacheKey:S,getUniforms:U,acquireProgram:V,releaseProgram:H,releaseShaderCache:O,programs:v,dispose:I}}function nC(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function r(h){o.delete(h)}function u(h,d,p){o.get(h)[d]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:r,update:u,dispose:f}}function iC(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function hy(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function dy(){const o=[];let e=0;const i=[],r=[],u=[];function f(){e=0,i.length=0,r.length=0,u.length=0}function h(g,y,x,b,w,M){let S=o[e];return S===void 0?(S={id:g.id,object:g,geometry:y,material:x,groupOrder:b,renderOrder:g.renderOrder,z:w,group:M},o[e]=S):(S.id=g.id,S.object=g,S.geometry=y,S.material=x,S.groupOrder=b,S.renderOrder=g.renderOrder,S.z=w,S.group=M),e++,S}function d(g,y,x,b,w,M){const S=h(g,y,x,b,w,M);x.transmission>0?r.push(S):x.transparent===!0?u.push(S):i.push(S)}function p(g,y,x,b,w,M){const S=h(g,y,x,b,w,M);x.transmission>0?r.unshift(S):x.transparent===!0?u.unshift(S):i.unshift(S)}function m(g,y){i.length>1&&i.sort(g||iC),r.length>1&&r.sort(y||hy),u.length>1&&u.sort(y||hy)}function v(){for(let g=e,y=o.length;g<y;g++){const x=o[g];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:i,transmissive:r,transparent:u,init:f,push:d,unshift:p,finish:v,sort:m}}function aC(){let o=new WeakMap;function e(r,u){const f=o.get(r);let h;return f===void 0?(h=new dy,o.set(r,[h])):u>=f.length?(h=new dy,f.push(h)):h=f[u],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function sC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new nt,color:new ge};break;case"SpotLight":i={position:new nt,direction:new nt,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new nt,color:new ge,distance:0,decay:0};break;case"HemisphereLight":i={direction:new nt,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":i={color:new ge,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return o[e.id]=i,i}}}function rC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let oC=0;function lC(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function uC(o){const e=new sC,i=rC(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new nt);const u=new nt,f=new Ze,h=new Ze;function d(m){let v=0,g=0,y=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let x=0,b=0,w=0,M=0,S=0,z=0,P=0,U=0,V=0,H=0,O=0;m.sort(lC);for(let D=0,A=m.length;D<A;D++){const B=m[D],ot=B.color,it=B.intensity,pt=B.distance,ht=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)v+=ot.r*it,g+=ot.g*it,y+=ot.b*it;else if(B.isLightProbe){for(let W=0;W<9;W++)r.probe[W].addScaledVector(B.sh.coefficients[W],it);O++}else if(B.isDirectionalLight){const W=e.get(B);if(W.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const st=B.shadow,Q=i.get(B);Q.shadowIntensity=st.intensity,Q.shadowBias=st.bias,Q.shadowNormalBias=st.normalBias,Q.shadowRadius=st.radius,Q.shadowMapSize=st.mapSize,r.directionalShadow[x]=Q,r.directionalShadowMap[x]=ht,r.directionalShadowMatrix[x]=B.shadow.matrix,z++}r.directional[x]=W,x++}else if(B.isSpotLight){const W=e.get(B);W.position.setFromMatrixPosition(B.matrixWorld),W.color.copy(ot).multiplyScalar(it),W.distance=pt,W.coneCos=Math.cos(B.angle),W.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),W.decay=B.decay,r.spot[w]=W;const st=B.shadow;if(B.map&&(r.spotLightMap[V]=B.map,V++,st.updateMatrices(B),B.castShadow&&H++),r.spotLightMatrix[w]=st.matrix,B.castShadow){const Q=i.get(B);Q.shadowIntensity=st.intensity,Q.shadowBias=st.bias,Q.shadowNormalBias=st.normalBias,Q.shadowRadius=st.radius,Q.shadowMapSize=st.mapSize,r.spotShadow[w]=Q,r.spotShadowMap[w]=ht,U++}w++}else if(B.isRectAreaLight){const W=e.get(B);W.color.copy(ot).multiplyScalar(it),W.halfWidth.set(B.width*.5,0,0),W.halfHeight.set(0,B.height*.5,0),r.rectArea[M]=W,M++}else if(B.isPointLight){const W=e.get(B);if(W.color.copy(B.color).multiplyScalar(B.intensity),W.distance=B.distance,W.decay=B.decay,B.castShadow){const st=B.shadow,Q=i.get(B);Q.shadowIntensity=st.intensity,Q.shadowBias=st.bias,Q.shadowNormalBias=st.normalBias,Q.shadowRadius=st.radius,Q.shadowMapSize=st.mapSize,Q.shadowCameraNear=st.camera.near,Q.shadowCameraFar=st.camera.far,r.pointShadow[b]=Q,r.pointShadowMap[b]=ht,r.pointShadowMatrix[b]=B.shadow.matrix,P++}r.point[b]=W,b++}else if(B.isHemisphereLight){const W=e.get(B);W.skyColor.copy(B.color).multiplyScalar(it),W.groundColor.copy(B.groundColor).multiplyScalar(it),r.hemi[S]=W,S++}}M>0&&(o.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ut.LTC_FLOAT_1,r.rectAreaLTC2=Ut.LTC_FLOAT_2):(r.rectAreaLTC1=Ut.LTC_HALF_1,r.rectAreaLTC2=Ut.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=g,r.ambient[2]=y;const I=r.hash;(I.directionalLength!==x||I.pointLength!==b||I.spotLength!==w||I.rectAreaLength!==M||I.hemiLength!==S||I.numDirectionalShadows!==z||I.numPointShadows!==P||I.numSpotShadows!==U||I.numSpotMaps!==V||I.numLightProbes!==O)&&(r.directional.length=x,r.spot.length=w,r.rectArea.length=M,r.point.length=b,r.hemi.length=S,r.directionalShadow.length=z,r.directionalShadowMap.length=z,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=U,r.spotShadowMap.length=U,r.directionalShadowMatrix.length=z,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=U+V-H,r.spotLightMap.length=V,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=O,I.directionalLength=x,I.pointLength=b,I.spotLength=w,I.rectAreaLength=M,I.hemiLength=S,I.numDirectionalShadows=z,I.numPointShadows=P,I.numSpotShadows=U,I.numSpotMaps=V,I.numLightProbes=O,r.version=oC++)}function p(m,v){let g=0,y=0,x=0,b=0,w=0;const M=v.matrixWorldInverse;for(let S=0,z=m.length;S<z;S++){const P=m[S];if(P.isDirectionalLight){const U=r.directional[g];U.direction.setFromMatrixPosition(P.matrixWorld),u.setFromMatrixPosition(P.target.matrixWorld),U.direction.sub(u),U.direction.transformDirection(M),g++}else if(P.isSpotLight){const U=r.spot[x];U.position.setFromMatrixPosition(P.matrixWorld),U.position.applyMatrix4(M),U.direction.setFromMatrixPosition(P.matrixWorld),u.setFromMatrixPosition(P.target.matrixWorld),U.direction.sub(u),U.direction.transformDirection(M),x++}else if(P.isRectAreaLight){const U=r.rectArea[b];U.position.setFromMatrixPosition(P.matrixWorld),U.position.applyMatrix4(M),h.identity(),f.copy(P.matrixWorld),f.premultiply(M),h.extractRotation(f),U.halfWidth.set(P.width*.5,0,0),U.halfHeight.set(0,P.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),b++}else if(P.isPointLight){const U=r.point[y];U.position.setFromMatrixPosition(P.matrixWorld),U.position.applyMatrix4(M),y++}else if(P.isHemisphereLight){const U=r.hemi[w];U.direction.setFromMatrixPosition(P.matrixWorld),U.direction.transformDirection(M),w++}}}return{setup:d,setupView:p,state:r}}function py(o){const e=new uC(o),i=[],r=[];function u(v){m.camera=v,i.length=0,r.length=0}function f(v){i.push(v)}function h(v){r.push(v)}function d(){e.setup(i)}function p(v){e.setupView(i,v)}const m={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:u,state:m,setupLights:d,setupLightsView:p,pushLight:f,pushShadow:h}}function cC(o){let e=new WeakMap;function i(u,f=0){const h=e.get(u);let d;return h===void 0?(d=new py(o),e.set(u,[d])):f>=h.length?(d=new py(o),h.push(d)):d=h[f],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const fC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hC=`uniform sampler2D shadow_pass;
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
}`;function dC(o,e,i){let r=new Kp;const u=new ce,f=new ce,h=new nn,d=new zT({depthPacking:UE}),p=new IT,m={},v=i.maxTextureSize,g={[Da]:ei,[ei]:Da,[$i]:$i},y=new vs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:fC,fragmentShader:hC}),x=y.clone();x.defines.HORIZONTAL_PASS=1;const b=new ys;b.setAttribute("position",new Bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new di(b,y),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sy;let S=this.type;this.render=function(H,O,I){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||H.length===0)return;const D=o.getRenderTarget(),A=o.getActiveCubeFace(),B=o.getActiveMipmapLevel(),ot=o.state;ot.setBlending(ms),ot.buffers.color.setClear(1,1,1,1),ot.buffers.depth.setTest(!0),ot.setScissorTest(!1);const it=S!==Aa&&this.type===Aa,pt=S===Aa&&this.type!==Aa;for(let ht=0,W=H.length;ht<W;ht++){const st=H[ht],Q=st.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;u.copy(Q.mapSize);const yt=Q.getFrameExtents();if(u.multiply(yt),f.copy(Q.mapSize),(u.x>v||u.y>v)&&(u.x>v&&(f.x=Math.floor(v/yt.x),u.x=f.x*yt.x,Q.mapSize.x=f.x),u.y>v&&(f.y=Math.floor(v/yt.y),u.y=f.y*yt.y,Q.mapSize.y=f.y)),Q.map===null||it===!0||pt===!0){const Ht=this.type!==Aa?{minFilter:pi,magFilter:pi}:{};Q.map!==null&&Q.map.dispose(),Q.map=new or(u.x,u.y,Ht),Q.map.texture.name=st.name+".shadowMap",Q.camera.updateProjectionMatrix()}o.setRenderTarget(Q.map),o.clear();const St=Q.getViewportCount();for(let Ht=0;Ht<St;Ht++){const ee=Q.getViewport(Ht);h.set(f.x*ee.x,f.y*ee.y,f.x*ee.z,f.y*ee.w),ot.viewport(h),Q.updateMatrices(st,Ht),r=Q.getFrustum(),U(O,I,Q.camera,st,this.type)}Q.isPointLightShadow!==!0&&this.type===Aa&&z(Q,I),Q.needsUpdate=!1}S=this.type,M.needsUpdate=!1,o.setRenderTarget(D,A,B)};function z(H,O){const I=e.update(w);y.defines.VSM_SAMPLES!==H.blurSamples&&(y.defines.VSM_SAMPLES=H.blurSamples,x.defines.VSM_SAMPLES=H.blurSamples,y.needsUpdate=!0,x.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new or(u.x,u.y)),y.uniforms.shadow_pass.value=H.map.texture,y.uniforms.resolution.value=H.mapSize,y.uniforms.radius.value=H.radius,o.setRenderTarget(H.mapPass),o.clear(),o.renderBufferDirect(O,null,I,y,w,null),x.uniforms.shadow_pass.value=H.mapPass.texture,x.uniforms.resolution.value=H.mapSize,x.uniforms.radius.value=H.radius,o.setRenderTarget(H.map),o.clear(),o.renderBufferDirect(O,null,I,x,w,null)}function P(H,O,I,D){let A=null;const B=I.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(B!==void 0)A=B;else if(A=I.isPointLight===!0?p:d,o.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const ot=A.uuid,it=O.uuid;let pt=m[ot];pt===void 0&&(pt={},m[ot]=pt);let ht=pt[it];ht===void 0&&(ht=A.clone(),pt[it]=ht,O.addEventListener("dispose",V)),A=ht}if(A.visible=O.visible,A.wireframe=O.wireframe,D===Aa?A.side=O.shadowSide!==null?O.shadowSide:O.side:A.side=O.shadowSide!==null?O.shadowSide:g[O.side],A.alphaMap=O.alphaMap,A.alphaTest=O.alphaTest,A.map=O.map,A.clipShadows=O.clipShadows,A.clippingPlanes=O.clippingPlanes,A.clipIntersection=O.clipIntersection,A.displacementMap=O.displacementMap,A.displacementScale=O.displacementScale,A.displacementBias=O.displacementBias,A.wireframeLinewidth=O.wireframeLinewidth,A.linewidth=O.linewidth,I.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const ot=o.properties.get(A);ot.light=I}return A}function U(H,O,I,D,A){if(H.visible===!1)return;if(H.layers.test(O.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&A===Aa)&&(!H.frustumCulled||r.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,H.matrixWorld);const it=e.update(H),pt=H.material;if(Array.isArray(pt)){const ht=it.groups;for(let W=0,st=ht.length;W<st;W++){const Q=ht[W],yt=pt[Q.materialIndex];if(yt&&yt.visible){const St=P(H,yt,D,A);H.onBeforeShadow(o,H,O,I,it,St,Q),o.renderBufferDirect(I,null,it,St,H,Q),H.onAfterShadow(o,H,O,I,it,St,Q)}}}else if(pt.visible){const ht=P(H,pt,D,A);H.onBeforeShadow(o,H,O,I,it,ht,null),o.renderBufferDirect(I,null,it,ht,H,null),H.onAfterShadow(o,H,O,I,it,ht,null)}}const ot=H.children;for(let it=0,pt=ot.length;it<pt;it++)U(ot[it],O,I,D,A)}function V(H){H.target.removeEventListener("dispose",V);for(const I in m){const D=m[I],A=H.target.uuid;A in D&&(D[A].dispose(),delete D[A])}}}const pC={[$d]:tp,[ep]:ap,[np]:sp,[xo]:ip,[tp]:$d,[ap]:ep,[sp]:np,[ip]:xo};function mC(o,e){function i(){let X=!1;const Lt=new nn;let lt=null;const _t=new nn(0,0,0,0);return{setMask:function(Ot){lt!==Ot&&!X&&(o.colorMask(Ot,Ot,Ot,Ot),lt=Ot)},setLocked:function(Ot){X=Ot},setClear:function(Ot,zt,re,Ke,yn){yn===!0&&(Ot*=Ke,zt*=Ke,re*=Ke),Lt.set(Ot,zt,re,Ke),_t.equals(Lt)===!1&&(o.clearColor(Ot,zt,re,Ke),_t.copy(Lt))},reset:function(){X=!1,lt=null,_t.set(-1,0,0,0)}}}function r(){let X=!1,Lt=!1,lt=null,_t=null,Ot=null;return{setReversed:function(zt){if(Lt!==zt){const re=e.get("EXT_clip_control");Lt?re.clipControlEXT(re.LOWER_LEFT_EXT,re.ZERO_TO_ONE_EXT):re.clipControlEXT(re.LOWER_LEFT_EXT,re.NEGATIVE_ONE_TO_ONE_EXT);const Ke=Ot;Ot=null,this.setClear(Ke)}Lt=zt},getReversed:function(){return Lt},setTest:function(zt){zt?ut(o.DEPTH_TEST):Tt(o.DEPTH_TEST)},setMask:function(zt){lt!==zt&&!X&&(o.depthMask(zt),lt=zt)},setFunc:function(zt){if(Lt&&(zt=pC[zt]),_t!==zt){switch(zt){case $d:o.depthFunc(o.NEVER);break;case tp:o.depthFunc(o.ALWAYS);break;case ep:o.depthFunc(o.LESS);break;case xo:o.depthFunc(o.LEQUAL);break;case np:o.depthFunc(o.EQUAL);break;case ip:o.depthFunc(o.GEQUAL);break;case ap:o.depthFunc(o.GREATER);break;case sp:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}_t=zt}},setLocked:function(zt){X=zt},setClear:function(zt){Ot!==zt&&(Lt&&(zt=1-zt),o.clearDepth(zt),Ot=zt)},reset:function(){X=!1,lt=null,_t=null,Ot=null,Lt=!1}}}function u(){let X=!1,Lt=null,lt=null,_t=null,Ot=null,zt=null,re=null,Ke=null,yn=null;return{setTest:function(Ae){X||(Ae?ut(o.STENCIL_TEST):Tt(o.STENCIL_TEST))},setMask:function(Ae){Lt!==Ae&&!X&&(o.stencilMask(Ae),Lt=Ae)},setFunc:function(Ae,We,Sn){(lt!==Ae||_t!==We||Ot!==Sn)&&(o.stencilFunc(Ae,We,Sn),lt=Ae,_t=We,Ot=Sn)},setOp:function(Ae,We,Sn){(zt!==Ae||re!==We||Ke!==Sn)&&(o.stencilOp(Ae,We,Sn),zt=Ae,re=We,Ke=Sn)},setLocked:function(Ae){X=Ae},setClear:function(Ae){yn!==Ae&&(o.clearStencil(Ae),yn=Ae)},reset:function(){X=!1,Lt=null,lt=null,_t=null,Ot=null,zt=null,re=null,Ke=null,yn=null}}}const f=new i,h=new r,d=new u,p=new WeakMap,m=new WeakMap;let v={},g={},y=new WeakMap,x=[],b=null,w=!1,M=null,S=null,z=null,P=null,U=null,V=null,H=null,O=new ge(0,0,0),I=0,D=!1,A=null,B=null,ot=null,it=null,pt=null;const ht=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,st=0;const Q=o.getParameter(o.VERSION);Q.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(Q)[1]),W=st>=1):Q.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),W=st>=2);let yt=null,St={};const Ht=o.getParameter(o.SCISSOR_BOX),ee=o.getParameter(o.VIEWPORT),be=new nn().fromArray(Ht),C=new nn().fromArray(ee);function Z(X,Lt,lt,_t){const Ot=new Uint8Array(4),zt=o.createTexture();o.bindTexture(X,zt),o.texParameteri(X,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(X,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let re=0;re<lt;re++)X===o.TEXTURE_3D||X===o.TEXTURE_2D_ARRAY?o.texImage3D(Lt,0,o.RGBA,1,1,_t,0,o.RGBA,o.UNSIGNED_BYTE,Ot):o.texImage2D(Lt+re,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Ot);return zt}const mt={};mt[o.TEXTURE_2D]=Z(o.TEXTURE_2D,o.TEXTURE_2D,1),mt[o.TEXTURE_CUBE_MAP]=Z(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[o.TEXTURE_2D_ARRAY]=Z(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),mt[o.TEXTURE_3D]=Z(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ut(o.DEPTH_TEST),h.setFunc(xo),ae(!1),Kt(hv),ut(o.CULL_FACE),G(ms);function ut(X){v[X]!==!0&&(o.enable(X),v[X]=!0)}function Tt(X){v[X]!==!1&&(o.disable(X),v[X]=!1)}function Vt(X,Lt){return g[X]!==Lt?(o.bindFramebuffer(X,Lt),g[X]=Lt,X===o.DRAW_FRAMEBUFFER&&(g[o.FRAMEBUFFER]=Lt),X===o.FRAMEBUFFER&&(g[o.DRAW_FRAMEBUFFER]=Lt),!0):!1}function wt(X,Lt){let lt=x,_t=!1;if(X){lt=y.get(Lt),lt===void 0&&(lt=[],y.set(Lt,lt));const Ot=X.textures;if(lt.length!==Ot.length||lt[0]!==o.COLOR_ATTACHMENT0){for(let zt=0,re=Ot.length;zt<re;zt++)lt[zt]=o.COLOR_ATTACHMENT0+zt;lt.length=Ot.length,_t=!0}}else lt[0]!==o.BACK&&(lt[0]=o.BACK,_t=!0);_t&&o.drawBuffers(lt)}function At(X){return b!==X?(o.useProgram(X),b=X,!0):!1}const It={[Js]:o.FUNC_ADD,[aE]:o.FUNC_SUBTRACT,[sE]:o.FUNC_REVERSE_SUBTRACT};It[rE]=o.MIN,It[oE]=o.MAX;const se={[lE]:o.ZERO,[uE]:o.ONE,[cE]:o.SRC_COLOR,[Qd]:o.SRC_ALPHA,[gE]:o.SRC_ALPHA_SATURATE,[pE]:o.DST_COLOR,[hE]:o.DST_ALPHA,[fE]:o.ONE_MINUS_SRC_COLOR,[Jd]:o.ONE_MINUS_SRC_ALPHA,[mE]:o.ONE_MINUS_DST_COLOR,[dE]:o.ONE_MINUS_DST_ALPHA,[_E]:o.CONSTANT_COLOR,[vE]:o.ONE_MINUS_CONSTANT_COLOR,[yE]:o.CONSTANT_ALPHA,[SE]:o.ONE_MINUS_CONSTANT_ALPHA};function G(X,Lt,lt,_t,Ot,zt,re,Ke,yn,Ae){if(X===ms){w===!0&&(Tt(o.BLEND),w=!1);return}if(w===!1&&(ut(o.BLEND),w=!0),X!==iE){if(X!==M||Ae!==D){if((S!==Js||U!==Js)&&(o.blendEquation(o.FUNC_ADD),S=Js,U=Js),Ae)switch(X){case yo:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case dv:o.blendFunc(o.ONE,o.ONE);break;case pv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case mv:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case yo:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case dv:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case pv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case mv:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}z=null,P=null,V=null,H=null,O.set(0,0,0),I=0,M=X,D=Ae}return}Ot=Ot||Lt,zt=zt||lt,re=re||_t,(Lt!==S||Ot!==U)&&(o.blendEquationSeparate(It[Lt],It[Ot]),S=Lt,U=Ot),(lt!==z||_t!==P||zt!==V||re!==H)&&(o.blendFuncSeparate(se[lt],se[_t],se[zt],se[re]),z=lt,P=_t,V=zt,H=re),(Ke.equals(O)===!1||yn!==I)&&(o.blendColor(Ke.r,Ke.g,Ke.b,yn),O.copy(Ke),I=yn),M=X,D=!1}function dn(X,Lt){X.side===$i?Tt(o.CULL_FACE):ut(o.CULL_FACE);let lt=X.side===ei;Lt&&(lt=!lt),ae(lt),X.blending===yo&&X.transparent===!1?G(ms):G(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),h.setFunc(X.depthFunc),h.setTest(X.depthTest),h.setMask(X.depthWrite),f.setMask(X.colorWrite);const _t=X.stencilWrite;d.setTest(_t),_t&&(d.setMask(X.stencilWriteMask),d.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),d.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Me(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ut(o.SAMPLE_ALPHA_TO_COVERAGE):Tt(o.SAMPLE_ALPHA_TO_COVERAGE)}function ae(X){A!==X&&(X?o.frontFace(o.CW):o.frontFace(o.CCW),A=X)}function Kt(X){X!==tE?(ut(o.CULL_FACE),X!==B&&(X===hv?o.cullFace(o.BACK):X===eE?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Tt(o.CULL_FACE),B=X}function Rt(X){X!==ot&&(W&&o.lineWidth(X),ot=X)}function Me(X,Lt,lt){X?(ut(o.POLYGON_OFFSET_FILL),(it!==Lt||pt!==lt)&&(o.polygonOffset(Lt,lt),it=Lt,pt=lt)):Tt(o.POLYGON_OFFSET_FILL)}function kt(X){X?ut(o.SCISSOR_TEST):Tt(o.SCISSOR_TEST)}function N(X){X===void 0&&(X=o.TEXTURE0+ht-1),yt!==X&&(o.activeTexture(X),yt=X)}function T(X,Lt,lt){lt===void 0&&(yt===null?lt=o.TEXTURE0+ht-1:lt=yt);let _t=St[lt];_t===void 0&&(_t={type:void 0,texture:void 0},St[lt]=_t),(_t.type!==X||_t.texture!==Lt)&&(yt!==lt&&(o.activeTexture(lt),yt=lt),o.bindTexture(X,Lt||mt[X]),_t.type=X,_t.texture=Lt)}function tt(){const X=St[yt];X!==void 0&&X.type!==void 0&&(o.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function gt(){try{o.compressedTexImage2D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function vt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function dt(){try{o.texSubImage2D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Yt(){try{o.texSubImage3D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Nt(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Pt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function _e(){try{o.texStorage2D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function xt(){try{o.texStorage3D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Gt(){try{o.texImage2D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Qt(){try{o.texImage3D.apply(o,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function te(X){be.equals(X)===!1&&(o.scissor(X.x,X.y,X.z,X.w),be.copy(X))}function Ft(X){C.equals(X)===!1&&(o.viewport(X.x,X.y,X.z,X.w),C.copy(X))}function pe(X,Lt){let lt=m.get(Lt);lt===void 0&&(lt=new WeakMap,m.set(Lt,lt));let _t=lt.get(X);_t===void 0&&(_t=o.getUniformBlockIndex(Lt,X.name),lt.set(X,_t))}function oe(X,Lt){const _t=m.get(Lt).get(X);p.get(Lt)!==_t&&(o.uniformBlockBinding(Lt,_t,X.__bindingPointIndex),p.set(Lt,_t))}function Ie(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),v={},yt=null,St={},g={},y=new WeakMap,x=[],b=null,w=!1,M=null,S=null,z=null,P=null,U=null,V=null,H=null,O=new ge(0,0,0),I=0,D=!1,A=null,B=null,ot=null,it=null,pt=null,be.set(0,0,o.canvas.width,o.canvas.height),C.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:ut,disable:Tt,bindFramebuffer:Vt,drawBuffers:wt,useProgram:At,setBlending:G,setMaterial:dn,setFlipSided:ae,setCullFace:Kt,setLineWidth:Rt,setPolygonOffset:Me,setScissorTest:kt,activeTexture:N,bindTexture:T,unbindTexture:tt,compressedTexImage2D:gt,compressedTexImage3D:vt,texImage2D:Gt,texImage3D:Qt,updateUBOMapping:pe,uniformBlockBinding:oe,texStorage2D:_e,texStorage3D:xt,texSubImage2D:dt,texSubImage3D:Yt,compressedTexSubImage2D:Nt,compressedTexSubImage3D:Pt,scissor:te,viewport:Ft,reset:Ie}}function gC(o,e,i,r,u,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new ce,v=new WeakMap;let g;const y=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(N,T){return x?new OffscreenCanvas(N,T):Bc("canvas")}function w(N,T,tt){let gt=1;const vt=kt(N);if((vt.width>tt||vt.height>tt)&&(gt=tt/Math.max(vt.width,vt.height)),gt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const dt=Math.floor(gt*vt.width),Yt=Math.floor(gt*vt.height);g===void 0&&(g=b(dt,Yt));const Nt=T?b(dt,Yt):g;return Nt.width=dt,Nt.height=Yt,Nt.getContext("2d").drawImage(N,0,0,dt,Yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+dt+"x"+Yt+")."),Nt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),N;return N}function M(N){return N.generateMipmaps}function S(N){o.generateMipmap(N)}function z(N){return N.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?o.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function P(N,T,tt,gt,vt=!1){if(N!==null){if(o[N]!==void 0)return o[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let dt=T;if(T===o.RED&&(tt===o.FLOAT&&(dt=o.R32F),tt===o.HALF_FLOAT&&(dt=o.R16F),tt===o.UNSIGNED_BYTE&&(dt=o.R8)),T===o.RED_INTEGER&&(tt===o.UNSIGNED_BYTE&&(dt=o.R8UI),tt===o.UNSIGNED_SHORT&&(dt=o.R16UI),tt===o.UNSIGNED_INT&&(dt=o.R32UI),tt===o.BYTE&&(dt=o.R8I),tt===o.SHORT&&(dt=o.R16I),tt===o.INT&&(dt=o.R32I)),T===o.RG&&(tt===o.FLOAT&&(dt=o.RG32F),tt===o.HALF_FLOAT&&(dt=o.RG16F),tt===o.UNSIGNED_BYTE&&(dt=o.RG8)),T===o.RG_INTEGER&&(tt===o.UNSIGNED_BYTE&&(dt=o.RG8UI),tt===o.UNSIGNED_SHORT&&(dt=o.RG16UI),tt===o.UNSIGNED_INT&&(dt=o.RG32UI),tt===o.BYTE&&(dt=o.RG8I),tt===o.SHORT&&(dt=o.RG16I),tt===o.INT&&(dt=o.RG32I)),T===o.RGB_INTEGER&&(tt===o.UNSIGNED_BYTE&&(dt=o.RGB8UI),tt===o.UNSIGNED_SHORT&&(dt=o.RGB16UI),tt===o.UNSIGNED_INT&&(dt=o.RGB32UI),tt===o.BYTE&&(dt=o.RGB8I),tt===o.SHORT&&(dt=o.RGB16I),tt===o.INT&&(dt=o.RGB32I)),T===o.RGBA_INTEGER&&(tt===o.UNSIGNED_BYTE&&(dt=o.RGBA8UI),tt===o.UNSIGNED_SHORT&&(dt=o.RGBA16UI),tt===o.UNSIGNED_INT&&(dt=o.RGBA32UI),tt===o.BYTE&&(dt=o.RGBA8I),tt===o.SHORT&&(dt=o.RGBA16I),tt===o.INT&&(dt=o.RGBA32I)),T===o.RGB&&tt===o.UNSIGNED_INT_5_9_9_9_REV&&(dt=o.RGB9_E5),T===o.RGBA){const Yt=vt?zc:Ue.getTransfer(gt);tt===o.FLOAT&&(dt=o.RGBA32F),tt===o.HALF_FLOAT&&(dt=o.RGBA16F),tt===o.UNSIGNED_BYTE&&(dt=Yt===Fe?o.SRGB8_ALPHA8:o.RGBA8),tt===o.UNSIGNED_SHORT_4_4_4_4&&(dt=o.RGBA4),tt===o.UNSIGNED_SHORT_5_5_5_1&&(dt=o.RGB5_A1)}return(dt===o.R16F||dt===o.R32F||dt===o.RG16F||dt===o.RG32F||dt===o.RGBA16F||dt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),dt}function U(N,T){let tt;return N?T===null||T===rr||T===bo?tt=o.DEPTH24_STENCIL8:T===ea?tt=o.DEPTH32F_STENCIL8:T===Ol&&(tt=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===rr||T===bo?tt=o.DEPTH_COMPONENT24:T===ea?tt=o.DEPTH_COMPONENT32F:T===Ol&&(tt=o.DEPTH_COMPONENT16),tt}function V(N,T){return M(N)===!0||N.isFramebufferTexture&&N.minFilter!==pi&&N.minFilter!==ta?Math.log2(Math.max(T.width,T.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?T.mipmaps.length:1}function H(N){const T=N.target;T.removeEventListener("dispose",H),I(T),T.isVideoTexture&&v.delete(T)}function O(N){const T=N.target;T.removeEventListener("dispose",O),A(T)}function I(N){const T=r.get(N);if(T.__webglInit===void 0)return;const tt=N.source,gt=y.get(tt);if(gt){const vt=gt[T.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&D(N),Object.keys(gt).length===0&&y.delete(tt)}r.remove(N)}function D(N){const T=r.get(N);o.deleteTexture(T.__webglTexture);const tt=N.source,gt=y.get(tt);delete gt[T.__cacheKey],h.memory.textures--}function A(N){const T=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let gt=0;gt<6;gt++){if(Array.isArray(T.__webglFramebuffer[gt]))for(let vt=0;vt<T.__webglFramebuffer[gt].length;vt++)o.deleteFramebuffer(T.__webglFramebuffer[gt][vt]);else o.deleteFramebuffer(T.__webglFramebuffer[gt]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[gt])}else{if(Array.isArray(T.__webglFramebuffer))for(let gt=0;gt<T.__webglFramebuffer.length;gt++)o.deleteFramebuffer(T.__webglFramebuffer[gt]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let gt=0;gt<T.__webglColorRenderbuffer.length;gt++)T.__webglColorRenderbuffer[gt]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[gt]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const tt=N.textures;for(let gt=0,vt=tt.length;gt<vt;gt++){const dt=r.get(tt[gt]);dt.__webglTexture&&(o.deleteTexture(dt.__webglTexture),h.memory.textures--),r.remove(tt[gt])}r.remove(N)}let B=0;function ot(){B=0}function it(){const N=B;return N>=u.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+u.maxTextures),B+=1,N}function pt(N){const T=[];return T.push(N.wrapS),T.push(N.wrapT),T.push(N.wrapR||0),T.push(N.magFilter),T.push(N.minFilter),T.push(N.anisotropy),T.push(N.internalFormat),T.push(N.format),T.push(N.type),T.push(N.generateMipmaps),T.push(N.premultiplyAlpha),T.push(N.flipY),T.push(N.unpackAlignment),T.push(N.colorSpace),T.join()}function ht(N,T){const tt=r.get(N);if(N.isVideoTexture&&Rt(N),N.isRenderTargetTexture===!1&&N.version>0&&tt.__version!==N.version){const gt=N.image;if(gt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{C(tt,N,T);return}}i.bindTexture(o.TEXTURE_2D,tt.__webglTexture,o.TEXTURE0+T)}function W(N,T){const tt=r.get(N);if(N.version>0&&tt.__version!==N.version){C(tt,N,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,tt.__webglTexture,o.TEXTURE0+T)}function st(N,T){const tt=r.get(N);if(N.version>0&&tt.__version!==N.version){C(tt,N,T);return}i.bindTexture(o.TEXTURE_3D,tt.__webglTexture,o.TEXTURE0+T)}function Q(N,T){const tt=r.get(N);if(N.version>0&&tt.__version!==N.version){Z(tt,N,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,tt.__webglTexture,o.TEXTURE0+T)}const yt={[lp]:o.REPEAT,[tr]:o.CLAMP_TO_EDGE,[up]:o.MIRRORED_REPEAT},St={[pi]:o.NEAREST,[wE]:o.NEAREST_MIPMAP_NEAREST,[oc]:o.NEAREST_MIPMAP_LINEAR,[ta]:o.LINEAR,[Md]:o.LINEAR_MIPMAP_NEAREST,[er]:o.LINEAR_MIPMAP_LINEAR},Ht={[LE]:o.NEVER,[FE]:o.ALWAYS,[OE]:o.LESS,[Ny]:o.LEQUAL,[PE]:o.EQUAL,[BE]:o.GEQUAL,[zE]:o.GREATER,[IE]:o.NOTEQUAL};function ee(N,T){if(T.type===ea&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===ta||T.magFilter===Md||T.magFilter===oc||T.magFilter===er||T.minFilter===ta||T.minFilter===Md||T.minFilter===oc||T.minFilter===er)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(N,o.TEXTURE_WRAP_S,yt[T.wrapS]),o.texParameteri(N,o.TEXTURE_WRAP_T,yt[T.wrapT]),(N===o.TEXTURE_3D||N===o.TEXTURE_2D_ARRAY)&&o.texParameteri(N,o.TEXTURE_WRAP_R,yt[T.wrapR]),o.texParameteri(N,o.TEXTURE_MAG_FILTER,St[T.magFilter]),o.texParameteri(N,o.TEXTURE_MIN_FILTER,St[T.minFilter]),T.compareFunction&&(o.texParameteri(N,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(N,o.TEXTURE_COMPARE_FUNC,Ht[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===pi||T.minFilter!==oc&&T.minFilter!==er||T.type===ea&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const tt=e.get("EXT_texture_filter_anisotropic");o.texParameterf(N,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,u.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function be(N,T){let tt=!1;N.__webglInit===void 0&&(N.__webglInit=!0,T.addEventListener("dispose",H));const gt=T.source;let vt=y.get(gt);vt===void 0&&(vt={},y.set(gt,vt));const dt=pt(T);if(dt!==N.__cacheKey){vt[dt]===void 0&&(vt[dt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,tt=!0),vt[dt].usedTimes++;const Yt=vt[N.__cacheKey];Yt!==void 0&&(vt[N.__cacheKey].usedTimes--,Yt.usedTimes===0&&D(T)),N.__cacheKey=dt,N.__webglTexture=vt[dt].texture}return tt}function C(N,T,tt){let gt=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(gt=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(gt=o.TEXTURE_3D);const vt=be(N,T),dt=T.source;i.bindTexture(gt,N.__webglTexture,o.TEXTURE0+tt);const Yt=r.get(dt);if(dt.version!==Yt.__version||vt===!0){i.activeTexture(o.TEXTURE0+tt);const Nt=Ue.getPrimaries(Ue.workingColorSpace),Pt=T.colorSpace===ps?null:Ue.getPrimaries(T.colorSpace),_e=T.colorSpace===ps||Nt===Pt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let xt=w(T.image,!1,u.maxTextureSize);xt=Me(T,xt);const Gt=f.convert(T.format,T.colorSpace),Qt=f.convert(T.type);let te=P(T.internalFormat,Gt,Qt,T.colorSpace,T.isVideoTexture);ee(gt,T);let Ft;const pe=T.mipmaps,oe=T.isVideoTexture!==!0,Ie=Yt.__version===void 0||vt===!0,X=dt.dataReady,Lt=V(T,xt);if(T.isDepthTexture)te=U(T.format===Ao,T.type),Ie&&(oe?i.texStorage2D(o.TEXTURE_2D,1,te,xt.width,xt.height):i.texImage2D(o.TEXTURE_2D,0,te,xt.width,xt.height,0,Gt,Qt,null));else if(T.isDataTexture)if(pe.length>0){oe&&Ie&&i.texStorage2D(o.TEXTURE_2D,Lt,te,pe[0].width,pe[0].height);for(let lt=0,_t=pe.length;lt<_t;lt++)Ft=pe[lt],oe?X&&i.texSubImage2D(o.TEXTURE_2D,lt,0,0,Ft.width,Ft.height,Gt,Qt,Ft.data):i.texImage2D(o.TEXTURE_2D,lt,te,Ft.width,Ft.height,0,Gt,Qt,Ft.data);T.generateMipmaps=!1}else oe?(Ie&&i.texStorage2D(o.TEXTURE_2D,Lt,te,xt.width,xt.height),X&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,xt.width,xt.height,Gt,Qt,xt.data)):i.texImage2D(o.TEXTURE_2D,0,te,xt.width,xt.height,0,Gt,Qt,xt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){oe&&Ie&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Lt,te,pe[0].width,pe[0].height,xt.depth);for(let lt=0,_t=pe.length;lt<_t;lt++)if(Ft=pe[lt],T.format!==Ii)if(Gt!==null)if(oe){if(X)if(T.layerUpdates.size>0){const Ot=kv(Ft.width,Ft.height,T.format,T.type);for(const zt of T.layerUpdates){const re=Ft.data.subarray(zt*Ot/Ft.data.BYTES_PER_ELEMENT,(zt+1)*Ot/Ft.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,lt,0,0,zt,Ft.width,Ft.height,1,Gt,re)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,lt,0,0,0,Ft.width,Ft.height,xt.depth,Gt,Ft.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,lt,te,Ft.width,Ft.height,xt.depth,0,Ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?X&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,lt,0,0,0,Ft.width,Ft.height,xt.depth,Gt,Qt,Ft.data):i.texImage3D(o.TEXTURE_2D_ARRAY,lt,te,Ft.width,Ft.height,xt.depth,0,Gt,Qt,Ft.data)}else{oe&&Ie&&i.texStorage2D(o.TEXTURE_2D,Lt,te,pe[0].width,pe[0].height);for(let lt=0,_t=pe.length;lt<_t;lt++)Ft=pe[lt],T.format!==Ii?Gt!==null?oe?X&&i.compressedTexSubImage2D(o.TEXTURE_2D,lt,0,0,Ft.width,Ft.height,Gt,Ft.data):i.compressedTexImage2D(o.TEXTURE_2D,lt,te,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?X&&i.texSubImage2D(o.TEXTURE_2D,lt,0,0,Ft.width,Ft.height,Gt,Qt,Ft.data):i.texImage2D(o.TEXTURE_2D,lt,te,Ft.width,Ft.height,0,Gt,Qt,Ft.data)}else if(T.isDataArrayTexture)if(oe){if(Ie&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Lt,te,xt.width,xt.height,xt.depth),X)if(T.layerUpdates.size>0){const lt=kv(xt.width,xt.height,T.format,T.type);for(const _t of T.layerUpdates){const Ot=xt.data.subarray(_t*lt/xt.data.BYTES_PER_ELEMENT,(_t+1)*lt/xt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,_t,xt.width,xt.height,1,Gt,Qt,Ot)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,Gt,Qt,xt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,te,xt.width,xt.height,xt.depth,0,Gt,Qt,xt.data);else if(T.isData3DTexture)oe?(Ie&&i.texStorage3D(o.TEXTURE_3D,Lt,te,xt.width,xt.height,xt.depth),X&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,Gt,Qt,xt.data)):i.texImage3D(o.TEXTURE_3D,0,te,xt.width,xt.height,xt.depth,0,Gt,Qt,xt.data);else if(T.isFramebufferTexture){if(Ie)if(oe)i.texStorage2D(o.TEXTURE_2D,Lt,te,xt.width,xt.height);else{let lt=xt.width,_t=xt.height;for(let Ot=0;Ot<Lt;Ot++)i.texImage2D(o.TEXTURE_2D,Ot,te,lt,_t,0,Gt,Qt,null),lt>>=1,_t>>=1}}else if(pe.length>0){if(oe&&Ie){const lt=kt(pe[0]);i.texStorage2D(o.TEXTURE_2D,Lt,te,lt.width,lt.height)}for(let lt=0,_t=pe.length;lt<_t;lt++)Ft=pe[lt],oe?X&&i.texSubImage2D(o.TEXTURE_2D,lt,0,0,Gt,Qt,Ft):i.texImage2D(o.TEXTURE_2D,lt,te,Gt,Qt,Ft);T.generateMipmaps=!1}else if(oe){if(Ie){const lt=kt(xt);i.texStorage2D(o.TEXTURE_2D,Lt,te,lt.width,lt.height)}X&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Gt,Qt,xt)}else i.texImage2D(o.TEXTURE_2D,0,te,Gt,Qt,xt);M(T)&&S(gt),Yt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function Z(N,T,tt){if(T.image.length!==6)return;const gt=be(N,T),vt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,N.__webglTexture,o.TEXTURE0+tt);const dt=r.get(vt);if(vt.version!==dt.__version||gt===!0){i.activeTexture(o.TEXTURE0+tt);const Yt=Ue.getPrimaries(Ue.workingColorSpace),Nt=T.colorSpace===ps?null:Ue.getPrimaries(T.colorSpace),Pt=T.colorSpace===ps||Yt===Nt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const _e=T.isCompressedTexture||T.image[0].isCompressedTexture,xt=T.image[0]&&T.image[0].isDataTexture,Gt=[];for(let _t=0;_t<6;_t++)!_e&&!xt?Gt[_t]=w(T.image[_t],!0,u.maxCubemapSize):Gt[_t]=xt?T.image[_t].image:T.image[_t],Gt[_t]=Me(T,Gt[_t]);const Qt=Gt[0],te=f.convert(T.format,T.colorSpace),Ft=f.convert(T.type),pe=P(T.internalFormat,te,Ft,T.colorSpace),oe=T.isVideoTexture!==!0,Ie=dt.__version===void 0||gt===!0,X=vt.dataReady;let Lt=V(T,Qt);ee(o.TEXTURE_CUBE_MAP,T);let lt;if(_e){oe&&Ie&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Lt,pe,Qt.width,Qt.height);for(let _t=0;_t<6;_t++){lt=Gt[_t].mipmaps;for(let Ot=0;Ot<lt.length;Ot++){const zt=lt[Ot];T.format!==Ii?te!==null?oe?X&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot,0,0,zt.width,zt.height,te,zt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot,pe,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?X&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot,0,0,zt.width,zt.height,te,Ft,zt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot,pe,zt.width,zt.height,0,te,Ft,zt.data)}}}else{if(lt=T.mipmaps,oe&&Ie){lt.length>0&&Lt++;const _t=kt(Gt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Lt,pe,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(xt){oe?X&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Gt[_t].width,Gt[_t].height,te,Ft,Gt[_t].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,pe,Gt[_t].width,Gt[_t].height,0,te,Ft,Gt[_t].data);for(let Ot=0;Ot<lt.length;Ot++){const re=lt[Ot].image[_t].image;oe?X&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot+1,0,0,re.width,re.height,te,Ft,re.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot+1,pe,re.width,re.height,0,te,Ft,re.data)}}else{oe?X&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,te,Ft,Gt[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,pe,te,Ft,Gt[_t]);for(let Ot=0;Ot<lt.length;Ot++){const zt=lt[Ot];oe?X&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot+1,0,0,te,Ft,zt.image[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ot+1,pe,te,Ft,zt.image[_t])}}}M(T)&&S(o.TEXTURE_CUBE_MAP),dt.__version=vt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function mt(N,T,tt,gt,vt,dt){const Yt=f.convert(tt.format,tt.colorSpace),Nt=f.convert(tt.type),Pt=P(tt.internalFormat,Yt,Nt,tt.colorSpace),_e=r.get(T),xt=r.get(tt);if(xt.__renderTarget=T,!_e.__hasExternalTextures){const Gt=Math.max(1,T.width>>dt),Qt=Math.max(1,T.height>>dt);vt===o.TEXTURE_3D||vt===o.TEXTURE_2D_ARRAY?i.texImage3D(vt,dt,Pt,Gt,Qt,T.depth,0,Yt,Nt,null):i.texImage2D(vt,dt,Pt,Gt,Qt,0,Yt,Nt,null)}i.bindFramebuffer(o.FRAMEBUFFER,N),Kt(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,gt,vt,xt.__webglTexture,0,ae(T)):(vt===o.TEXTURE_2D||vt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,gt,vt,xt.__webglTexture,dt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function ut(N,T,tt){if(o.bindRenderbuffer(o.RENDERBUFFER,N),T.depthBuffer){const gt=T.depthTexture,vt=gt&&gt.isDepthTexture?gt.type:null,dt=U(T.stencilBuffer,vt),Yt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Nt=ae(T);Kt(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Nt,dt,T.width,T.height):tt?o.renderbufferStorageMultisample(o.RENDERBUFFER,Nt,dt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,dt,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Yt,o.RENDERBUFFER,N)}else{const gt=T.textures;for(let vt=0;vt<gt.length;vt++){const dt=gt[vt],Yt=f.convert(dt.format,dt.colorSpace),Nt=f.convert(dt.type),Pt=P(dt.internalFormat,Yt,Nt,dt.colorSpace),_e=ae(T);tt&&Kt(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,_e,Pt,T.width,T.height):Kt(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,_e,Pt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,Pt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Tt(N,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,N),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const gt=r.get(T.depthTexture);gt.__renderTarget=T,(!gt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ht(T.depthTexture,0);const vt=gt.__webglTexture,dt=ae(T);if(T.depthTexture.format===So)Kt(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0);else if(T.depthTexture.format===Ao)Kt(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0);else throw new Error("Unknown depthTexture format")}function Vt(N){const T=r.get(N),tt=N.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==N.depthTexture){const gt=N.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),gt){const vt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,gt.removeEventListener("dispose",vt)};gt.addEventListener("dispose",vt),T.__depthDisposeCallback=vt}T.__boundDepthTexture=gt}if(N.depthTexture&&!T.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");Tt(T.__webglFramebuffer,N)}else if(tt){T.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[gt]),T.__webglDepthbuffer[gt]===void 0)T.__webglDepthbuffer[gt]=o.createRenderbuffer(),ut(T.__webglDepthbuffer[gt],N,!1);else{const vt=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,dt=T.__webglDepthbuffer[gt];o.bindRenderbuffer(o.RENDERBUFFER,dt),o.framebufferRenderbuffer(o.FRAMEBUFFER,vt,o.RENDERBUFFER,dt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),ut(T.__webglDepthbuffer,N,!1);else{const gt=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,vt=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,vt),o.framebufferRenderbuffer(o.FRAMEBUFFER,gt,o.RENDERBUFFER,vt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function wt(N,T,tt){const gt=r.get(N);T!==void 0&&mt(gt.__webglFramebuffer,N,N.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),tt!==void 0&&Vt(N)}function At(N){const T=N.texture,tt=r.get(N),gt=r.get(T);N.addEventListener("dispose",O);const vt=N.textures,dt=N.isWebGLCubeRenderTarget===!0,Yt=vt.length>1;if(Yt||(gt.__webglTexture===void 0&&(gt.__webglTexture=o.createTexture()),gt.__version=T.version,h.memory.textures++),dt){tt.__webglFramebuffer=[];for(let Nt=0;Nt<6;Nt++)if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer[Nt]=[];for(let Pt=0;Pt<T.mipmaps.length;Pt++)tt.__webglFramebuffer[Nt][Pt]=o.createFramebuffer()}else tt.__webglFramebuffer[Nt]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer=[];for(let Nt=0;Nt<T.mipmaps.length;Nt++)tt.__webglFramebuffer[Nt]=o.createFramebuffer()}else tt.__webglFramebuffer=o.createFramebuffer();if(Yt)for(let Nt=0,Pt=vt.length;Nt<Pt;Nt++){const _e=r.get(vt[Nt]);_e.__webglTexture===void 0&&(_e.__webglTexture=o.createTexture(),h.memory.textures++)}if(N.samples>0&&Kt(N)===!1){tt.__webglMultisampledFramebuffer=o.createFramebuffer(),tt.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let Nt=0;Nt<vt.length;Nt++){const Pt=vt[Nt];tt.__webglColorRenderbuffer[Nt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,tt.__webglColorRenderbuffer[Nt]);const _e=f.convert(Pt.format,Pt.colorSpace),xt=f.convert(Pt.type),Gt=P(Pt.internalFormat,_e,xt,Pt.colorSpace,N.isXRRenderTarget===!0),Qt=ae(N);o.renderbufferStorageMultisample(o.RENDERBUFFER,Qt,Gt,N.width,N.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Nt,o.RENDERBUFFER,tt.__webglColorRenderbuffer[Nt])}o.bindRenderbuffer(o.RENDERBUFFER,null),N.depthBuffer&&(tt.__webglDepthRenderbuffer=o.createRenderbuffer(),ut(tt.__webglDepthRenderbuffer,N,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(dt){i.bindTexture(o.TEXTURE_CUBE_MAP,gt.__webglTexture),ee(o.TEXTURE_CUBE_MAP,T);for(let Nt=0;Nt<6;Nt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Pt=0;Pt<T.mipmaps.length;Pt++)mt(tt.__webglFramebuffer[Nt][Pt],N,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,Pt);else mt(tt.__webglFramebuffer[Nt],N,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0);M(T)&&S(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Yt){for(let Nt=0,Pt=vt.length;Nt<Pt;Nt++){const _e=vt[Nt],xt=r.get(_e);i.bindTexture(o.TEXTURE_2D,xt.__webglTexture),ee(o.TEXTURE_2D,_e),mt(tt.__webglFramebuffer,N,_e,o.COLOR_ATTACHMENT0+Nt,o.TEXTURE_2D,0),M(_e)&&S(o.TEXTURE_2D)}i.unbindTexture()}else{let Nt=o.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Nt=N.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Nt,gt.__webglTexture),ee(Nt,T),T.mipmaps&&T.mipmaps.length>0)for(let Pt=0;Pt<T.mipmaps.length;Pt++)mt(tt.__webglFramebuffer[Pt],N,T,o.COLOR_ATTACHMENT0,Nt,Pt);else mt(tt.__webglFramebuffer,N,T,o.COLOR_ATTACHMENT0,Nt,0);M(T)&&S(Nt),i.unbindTexture()}N.depthBuffer&&Vt(N)}function It(N){const T=N.textures;for(let tt=0,gt=T.length;tt<gt;tt++){const vt=T[tt];if(M(vt)){const dt=z(N),Yt=r.get(vt).__webglTexture;i.bindTexture(dt,Yt),S(dt),i.unbindTexture()}}}const se=[],G=[];function dn(N){if(N.samples>0){if(Kt(N)===!1){const T=N.textures,tt=N.width,gt=N.height;let vt=o.COLOR_BUFFER_BIT;const dt=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Yt=r.get(N),Nt=T.length>1;if(Nt)for(let Pt=0;Pt<T.length;Pt++)i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let Pt=0;Pt<T.length;Pt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(vt|=o.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(vt|=o.STENCIL_BUFFER_BIT)),Nt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Yt.__webglColorRenderbuffer[Pt]);const _e=r.get(T[Pt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,_e,0)}o.blitFramebuffer(0,0,tt,gt,0,0,tt,gt,vt,o.NEAREST),p===!0&&(se.length=0,G.length=0,se.push(o.COLOR_ATTACHMENT0+Pt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(se.push(dt),G.push(dt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,G)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,se))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Nt)for(let Pt=0;Pt<T.length;Pt++){i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.RENDERBUFFER,Yt.__webglColorRenderbuffer[Pt]);const _e=r.get(T[Pt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Yt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pt,o.TEXTURE_2D,_e,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&p){const T=N.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function ae(N){return Math.min(u.maxSamples,N.samples)}function Kt(N){const T=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Rt(N){const T=h.render.frame;v.get(N)!==T&&(v.set(N,T),N.update())}function Me(N,T){const tt=N.colorSpace,gt=N.format,vt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||tt!==Ro&&tt!==ps&&(Ue.getTransfer(tt)===Fe?(gt!==Ii||vt!==Ua)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),T}function kt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(m.width=N.naturalWidth||N.width,m.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(m.width=N.displayWidth,m.height=N.displayHeight):(m.width=N.width,m.height=N.height),m}this.allocateTextureUnit=it,this.resetTextureUnits=ot,this.setTexture2D=ht,this.setTexture2DArray=W,this.setTexture3D=st,this.setTextureCube=Q,this.rebindTextures=wt,this.setupRenderTarget=At,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=dn,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Kt}function _C(o,e){function i(r,u=ps){let f;const h=Ue.getTransfer(u);if(r===Ua)return o.UNSIGNED_BYTE;if(r===Hp)return o.UNSIGNED_SHORT_4_4_4_4;if(r===Gp)return o.UNSIGNED_SHORT_5_5_5_1;if(r===by)return o.UNSIGNED_INT_5_9_9_9_REV;if(r===Ey)return o.BYTE;if(r===Ty)return o.SHORT;if(r===Ol)return o.UNSIGNED_SHORT;if(r===Fp)return o.INT;if(r===rr)return o.UNSIGNED_INT;if(r===ea)return o.FLOAT;if(r===zl)return o.HALF_FLOAT;if(r===Ay)return o.ALPHA;if(r===Ry)return o.RGB;if(r===Ii)return o.RGBA;if(r===Cy)return o.LUMINANCE;if(r===wy)return o.LUMINANCE_ALPHA;if(r===So)return o.DEPTH_COMPONENT;if(r===Ao)return o.DEPTH_STENCIL;if(r===Vp)return o.RED;if(r===Xp)return o.RED_INTEGER;if(r===Dy)return o.RG;if(r===kp)return o.RG_INTEGER;if(r===Yp)return o.RGBA_INTEGER;if(r===Dc||r===Uc||r===Nc||r===Lc)if(h===Fe)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(r===Dc)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Uc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Nc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Lc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(r===Dc)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Uc)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Nc)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Lc)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===cp||r===fp||r===hp||r===dp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(r===cp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===fp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===hp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===dp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===pp||r===mp||r===gp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(r===pp||r===mp)return h===Fe?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(r===gp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===_p||r===vp||r===yp||r===Sp||r===Mp||r===xp||r===Ep||r===Tp||r===bp||r===Ap||r===Rp||r===Cp||r===wp||r===Dp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(r===_p)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===vp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===yp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Sp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Mp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===xp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ep)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Tp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===bp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ap)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Rp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Cp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===wp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Dp)return h===Fe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Oc||r===Up||r===Np)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(r===Oc)return h===Fe?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Up)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Np)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Uy||r===Lp||r===Op||r===Pp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(r===Oc)return f.COMPRESSED_RED_RGTC1_EXT;if(r===Lp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Op)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Pp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===bo?o.UNSIGNED_INT_24_8:o[r]!==void 0?o[r]:null}return{convert:i}}const vC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yC=`
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

}`;class SC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,r){if(this.texture===null){const u=new qn,f=e.properties.get(u);f.__webglTexture=i.texture,(i.depthNear!==r.depthNear||i.depthFar!==r.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=u}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new vs({vertexShader:vC,fragmentShader:yC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new di(new Gc(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class MC extends ur{constructor(e,i){super();const r=this;let u=null,f=1,h=null,d="local-floor",p=1,m=null,v=null,g=null,y=null,x=null,b=null;const w=new SC,M=i.getContextAttributes();let S=null,z=null;const P=[],U=[],V=new ce;let H=null;const O=new Ai;O.viewport=new nn;const I=new Ai;I.viewport=new nn;const D=[O,I],A=new VT;let B=null,ot=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(C){let Z=P[C];return Z===void 0&&(Z=new Gd,P[C]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(C){let Z=P[C];return Z===void 0&&(Z=new Gd,P[C]=Z),Z.getGripSpace()},this.getHand=function(C){let Z=P[C];return Z===void 0&&(Z=new Gd,P[C]=Z),Z.getHandSpace()};function it(C){const Z=U.indexOf(C.inputSource);if(Z===-1)return;const mt=P[Z];mt!==void 0&&(mt.update(C.inputSource,C.frame,m||h),mt.dispatchEvent({type:C.type,data:C.inputSource}))}function pt(){u.removeEventListener("select",it),u.removeEventListener("selectstart",it),u.removeEventListener("selectend",it),u.removeEventListener("squeeze",it),u.removeEventListener("squeezestart",it),u.removeEventListener("squeezeend",it),u.removeEventListener("end",pt),u.removeEventListener("inputsourceschange",ht);for(let C=0;C<P.length;C++){const Z=U[C];Z!==null&&(U[C]=null,P[C].disconnect(Z))}B=null,ot=null,w.reset(),e.setRenderTarget(S),x=null,y=null,g=null,u=null,z=null,be.stop(),r.isPresenting=!1,e.setPixelRatio(H),e.setSize(V.width,V.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(C){f=C,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(C){d=C,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||h},this.setReferenceSpace=function(C){m=C},this.getBaseLayer=function(){return y!==null?y:x},this.getBinding=function(){return g},this.getFrame=function(){return b},this.getSession=function(){return u},this.setSession=async function(C){if(u=C,u!==null){if(S=e.getRenderTarget(),u.addEventListener("select",it),u.addEventListener("selectstart",it),u.addEventListener("selectend",it),u.addEventListener("squeeze",it),u.addEventListener("squeezestart",it),u.addEventListener("squeezeend",it),u.addEventListener("end",pt),u.addEventListener("inputsourceschange",ht),M.xrCompatible!==!0&&await i.makeXRCompatible(),H=e.getPixelRatio(),e.getSize(V),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,ut=null,Tt=null;M.depth&&(Tt=M.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,mt=M.stencil?Ao:So,ut=M.stencil?bo:rr);const Vt={colorFormat:i.RGBA8,depthFormat:Tt,scaleFactor:f};g=new XRWebGLBinding(u,i),y=g.createProjectionLayer(Vt),u.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),z=new or(y.textureWidth,y.textureHeight,{format:Ii,type:Ua,depthTexture:new ky(y.textureWidth,y.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1})}else{const mt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:f};x=new XRWebGLLayer(u,i,mt),u.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),z=new or(x.framebufferWidth,x.framebufferHeight,{format:Ii,type:Ua,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}z.isXRRenderTarget=!0,this.setFoveation(p),m=null,h=await u.requestReferenceSpace(d),be.setContext(u),be.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(u!==null)return u.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function ht(C){for(let Z=0;Z<C.removed.length;Z++){const mt=C.removed[Z],ut=U.indexOf(mt);ut>=0&&(U[ut]=null,P[ut].disconnect(mt))}for(let Z=0;Z<C.added.length;Z++){const mt=C.added[Z];let ut=U.indexOf(mt);if(ut===-1){for(let Vt=0;Vt<P.length;Vt++)if(Vt>=U.length){U.push(mt),ut=Vt;break}else if(U[Vt]===null){U[Vt]=mt,ut=Vt;break}if(ut===-1)break}const Tt=P[ut];Tt&&Tt.connect(mt)}}const W=new nt,st=new nt;function Q(C,Z,mt){W.setFromMatrixPosition(Z.matrixWorld),st.setFromMatrixPosition(mt.matrixWorld);const ut=W.distanceTo(st),Tt=Z.projectionMatrix.elements,Vt=mt.projectionMatrix.elements,wt=Tt[14]/(Tt[10]-1),At=Tt[14]/(Tt[10]+1),It=(Tt[9]+1)/Tt[5],se=(Tt[9]-1)/Tt[5],G=(Tt[8]-1)/Tt[0],dn=(Vt[8]+1)/Vt[0],ae=wt*G,Kt=wt*dn,Rt=ut/(-G+dn),Me=Rt*-G;if(Z.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(Me),C.translateZ(Rt),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert(),Tt[10]===-1)C.projectionMatrix.copy(Z.projectionMatrix),C.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const kt=wt+Rt,N=At+Rt,T=ae-Me,tt=Kt+(ut-Me),gt=It*At/N*kt,vt=se*At/N*kt;C.projectionMatrix.makePerspective(T,tt,gt,vt,kt,N),C.projectionMatrixInverse.copy(C.projectionMatrix).invert()}}function yt(C,Z){Z===null?C.matrixWorld.copy(C.matrix):C.matrixWorld.multiplyMatrices(Z.matrixWorld,C.matrix),C.matrixWorldInverse.copy(C.matrixWorld).invert()}this.updateCamera=function(C){if(u===null)return;let Z=C.near,mt=C.far;w.texture!==null&&(w.depthNear>0&&(Z=w.depthNear),w.depthFar>0&&(mt=w.depthFar)),A.near=I.near=O.near=Z,A.far=I.far=O.far=mt,(B!==A.near||ot!==A.far)&&(u.updateRenderState({depthNear:A.near,depthFar:A.far}),B=A.near,ot=A.far),O.layers.mask=C.layers.mask|2,I.layers.mask=C.layers.mask|4,A.layers.mask=O.layers.mask|I.layers.mask;const ut=C.parent,Tt=A.cameras;yt(A,ut);for(let Vt=0;Vt<Tt.length;Vt++)yt(Tt[Vt],ut);Tt.length===2?Q(A,O,I):A.projectionMatrix.copy(O.projectionMatrix),St(C,A,ut)};function St(C,Z,mt){mt===null?C.matrix.copy(Z.matrixWorld):(C.matrix.copy(mt.matrixWorld),C.matrix.invert(),C.matrix.multiply(Z.matrixWorld)),C.matrix.decompose(C.position,C.quaternion,C.scale),C.updateMatrixWorld(!0),C.projectionMatrix.copy(Z.projectionMatrix),C.projectionMatrixInverse.copy(Z.projectionMatrixInverse),C.isPerspectiveCamera&&(C.fov=Pl*2*Math.atan(1/C.projectionMatrix.elements[5]),C.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(y===null&&x===null))return p},this.setFoveation=function(C){p=C,y!==null&&(y.fixedFoveation=C),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=C)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(A)};let Ht=null;function ee(C,Z){if(v=Z.getViewerPose(m||h),b=Z,v!==null){const mt=v.views;x!==null&&(e.setRenderTargetFramebuffer(z,x.framebuffer),e.setRenderTarget(z));let ut=!1;mt.length!==A.cameras.length&&(A.cameras.length=0,ut=!0);for(let wt=0;wt<mt.length;wt++){const At=mt[wt];let It=null;if(x!==null)It=x.getViewport(At);else{const G=g.getViewSubImage(y,At);It=G.viewport,wt===0&&(e.setRenderTargetTextures(z,G.colorTexture,y.ignoreDepthValues?void 0:G.depthStencilTexture),e.setRenderTarget(z))}let se=D[wt];se===void 0&&(se=new Ai,se.layers.enable(wt),se.viewport=new nn,D[wt]=se),se.matrix.fromArray(At.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(At.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(It.x,It.y,It.width,It.height),wt===0&&(A.matrix.copy(se.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),ut===!0&&A.cameras.push(se)}const Tt=u.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&u.depthUsage=="gpu-optimized"&&g){const wt=g.getDepthInformation(mt[0]);wt&&wt.isValid&&wt.texture&&w.init(e,wt,u.renderState)}}for(let mt=0;mt<P.length;mt++){const ut=U[mt],Tt=P[mt];ut!==null&&Tt!==void 0&&Tt.update(ut,Z,m||h)}Ht&&Ht(C,Z),Z.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:Z}),b=null}const be=new Wy;be.setAnimationLoop(ee),this.setAnimationLoop=function(C){Ht=C},this.dispose=function(){}}}const js=new Fi,xC=new Ze;function EC(o,e){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function r(M,S){S.color.getRGB(M.fogColor.value,Gy(o)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function u(M,S,z,P,U){S.isMeshBasicMaterial||S.isMeshLambertMaterial?f(M,S):S.isMeshToonMaterial?(f(M,S),g(M,S)):S.isMeshPhongMaterial?(f(M,S),v(M,S)):S.isMeshStandardMaterial?(f(M,S),y(M,S),S.isMeshPhysicalMaterial&&x(M,S,U)):S.isMeshMatcapMaterial?(f(M,S),b(M,S)):S.isMeshDepthMaterial?f(M,S):S.isMeshDistanceMaterial?(f(M,S),w(M,S)):S.isMeshNormalMaterial?f(M,S):S.isLineBasicMaterial?(h(M,S),S.isLineDashedMaterial&&d(M,S)):S.isPointsMaterial?p(M,S,z,P):S.isSpriteMaterial?m(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function f(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===ei&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===ei&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const z=e.get(S),P=z.envMap,U=z.envMapRotation;P&&(M.envMap.value=P,js.copy(U),js.x*=-1,js.y*=-1,js.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(js.y*=-1,js.z*=-1),M.envMapRotation.value.setFromMatrix4(xC.makeRotationFromEuler(js)),M.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function h(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function d(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function p(M,S,z,P){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*z,M.scale.value=P*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function m(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function v(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function g(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function y(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,z){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===ei&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=z.texture,M.transmissionSamplerSize.value.set(z.width,z.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function b(M,S){S.matcap&&(M.matcap.value=S.matcap)}function w(M,S){const z=e.get(S).light;M.referencePosition.value.setFromMatrixPosition(z.matrixWorld),M.nearDistance.value=z.shadow.camera.near,M.farDistance.value=z.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:u}}function TC(o,e,i,r){let u={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(z,P){const U=P.program;r.uniformBlockBinding(z,U)}function m(z,P){let U=u[z.id];U===void 0&&(b(z),U=v(z),u[z.id]=U,z.addEventListener("dispose",M));const V=P.program;r.updateUBOMapping(z,V);const H=e.render.frame;f[z.id]!==H&&(y(z),f[z.id]=H)}function v(z){const P=g();z.__bindingPointIndex=P;const U=o.createBuffer(),V=z.__size,H=z.usage;return o.bindBuffer(o.UNIFORM_BUFFER,U),o.bufferData(o.UNIFORM_BUFFER,V,H),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,P,U),U}function g(){for(let z=0;z<d;z++)if(h.indexOf(z)===-1)return h.push(z),z;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(z){const P=u[z.id],U=z.uniforms,V=z.__cache;o.bindBuffer(o.UNIFORM_BUFFER,P);for(let H=0,O=U.length;H<O;H++){const I=Array.isArray(U[H])?U[H]:[U[H]];for(let D=0,A=I.length;D<A;D++){const B=I[D];if(x(B,H,D,V)===!0){const ot=B.__offset,it=Array.isArray(B.value)?B.value:[B.value];let pt=0;for(let ht=0;ht<it.length;ht++){const W=it[ht],st=w(W);typeof W=="number"||typeof W=="boolean"?(B.__data[0]=W,o.bufferSubData(o.UNIFORM_BUFFER,ot+pt,B.__data)):W.isMatrix3?(B.__data[0]=W.elements[0],B.__data[1]=W.elements[1],B.__data[2]=W.elements[2],B.__data[3]=0,B.__data[4]=W.elements[3],B.__data[5]=W.elements[4],B.__data[6]=W.elements[5],B.__data[7]=0,B.__data[8]=W.elements[6],B.__data[9]=W.elements[7],B.__data[10]=W.elements[8],B.__data[11]=0):(W.toArray(B.__data,pt),pt+=st.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,ot,B.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function x(z,P,U,V){const H=z.value,O=P+"_"+U;if(V[O]===void 0)return typeof H=="number"||typeof H=="boolean"?V[O]=H:V[O]=H.clone(),!0;{const I=V[O];if(typeof H=="number"||typeof H=="boolean"){if(I!==H)return V[O]=H,!0}else if(I.equals(H)===!1)return I.copy(H),!0}return!1}function b(z){const P=z.uniforms;let U=0;const V=16;for(let O=0,I=P.length;O<I;O++){const D=Array.isArray(P[O])?P[O]:[P[O]];for(let A=0,B=D.length;A<B;A++){const ot=D[A],it=Array.isArray(ot.value)?ot.value:[ot.value];for(let pt=0,ht=it.length;pt<ht;pt++){const W=it[pt],st=w(W),Q=U%V,yt=Q%st.boundary,St=Q+yt;U+=yt,St!==0&&V-St<st.storage&&(U+=V-St),ot.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),ot.__offset=U,U+=st.storage}}}const H=U%V;return H>0&&(U+=V-H),z.__size=U,z.__cache={},this}function w(z){const P={boundary:0,storage:0};return typeof z=="number"||typeof z=="boolean"?(P.boundary=4,P.storage=4):z.isVector2?(P.boundary=8,P.storage=8):z.isVector3||z.isColor?(P.boundary=16,P.storage=12):z.isVector4?(P.boundary=16,P.storage=16):z.isMatrix3?(P.boundary=48,P.storage=48):z.isMatrix4?(P.boundary=64,P.storage=64):z.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",z),P}function M(z){const P=z.target;P.removeEventListener("dispose",M);const U=h.indexOf(P.__bindingPointIndex);h.splice(U,1),o.deleteBuffer(u[P.id]),delete u[P.id],delete f[P.id]}function S(){for(const z in u)o.deleteBuffer(u[z]);h=[],u={},f={}}return{bind:p,update:m,dispose:S}}class bC{constructor(e={}){const{canvas:i=iT(),context:r=null,depth:u=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let x;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=r.getContextAttributes().alpha}else x=h;const b=new Uint32Array(4),w=new Int32Array(4);let M=null,S=null;const z=[],P=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hi,this.toneMapping=gs,this.toneMappingExposure=1;const U=this;let V=!1,H=0,O=0,I=null,D=-1,A=null;const B=new nn,ot=new nn;let it=null;const pt=new ge(0);let ht=0,W=i.width,st=i.height,Q=1,yt=null,St=null;const Ht=new nn(0,0,W,st),ee=new nn(0,0,W,st);let be=!1;const C=new Kp;let Z=!1,mt=!1;this.transmissionResolutionScale=1;const ut=new Ze,Tt=new Ze,Vt=new nt,wt=new nn,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let It=!1;function se(){return I===null?Q:1}let G=r;function dn(R,j){return i.getContext(R,j)}try{const R={alpha:!0,depth:u,stencil:f,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Bp}`),i.addEventListener("webglcontextlost",_t,!1),i.addEventListener("webglcontextrestored",Ot,!1),i.addEventListener("webglcontextcreationerror",zt,!1),G===null){const j="webgl2";if(G=dn(j,R),G===null)throw dn(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ae,Kt,Rt,Me,kt,N,T,tt,gt,vt,dt,Yt,Nt,Pt,_e,xt,Gt,Qt,te,Ft,pe,oe,Ie,X;function Lt(){ae=new PA(G),ae.init(),oe=new _C(G,ae),Kt=new wA(G,ae,e,oe),Rt=new mC(G,ae),Kt.reverseDepthBuffer&&y&&Rt.buffers.depth.setReversed(!0),Me=new BA(G),kt=new nC,N=new gC(G,ae,Rt,kt,Kt,oe,Me),T=new UA(U),tt=new OA(U),gt=new YT(G),Ie=new RA(G,gt),vt=new zA(G,gt,Me,Ie),dt=new HA(G,vt,gt,Me),te=new FA(G,Kt,N),xt=new DA(kt),Yt=new eC(U,T,tt,ae,Kt,Ie,xt),Nt=new EC(U,kt),Pt=new aC,_e=new cC(ae),Qt=new AA(U,T,tt,Rt,dt,x,p),Gt=new dC(U,dt,Kt),X=new TC(G,Me,Kt,Rt),Ft=new CA(G,ae,Me),pe=new IA(G,ae,Me),Me.programs=Yt.programs,U.capabilities=Kt,U.extensions=ae,U.properties=kt,U.renderLists=Pt,U.shadowMap=Gt,U.state=Rt,U.info=Me}Lt();const lt=new MC(U,G);this.xr=lt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const R=ae.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ae.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(R){R!==void 0&&(Q=R,this.setSize(W,st,!1))},this.getSize=function(R){return R.set(W,st)},this.setSize=function(R,j,at=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=R,st=j,i.width=Math.floor(R*Q),i.height=Math.floor(j*Q),at===!0&&(i.style.width=R+"px",i.style.height=j+"px"),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(W*Q,st*Q).floor()},this.setDrawingBufferSize=function(R,j,at){W=R,st=j,Q=at,i.width=Math.floor(R*at),i.height=Math.floor(j*at),this.setViewport(0,0,R,j)},this.getCurrentViewport=function(R){return R.copy(B)},this.getViewport=function(R){return R.copy(Ht)},this.setViewport=function(R,j,at,rt){R.isVector4?Ht.set(R.x,R.y,R.z,R.w):Ht.set(R,j,at,rt),Rt.viewport(B.copy(Ht).multiplyScalar(Q).round())},this.getScissor=function(R){return R.copy(ee)},this.setScissor=function(R,j,at,rt){R.isVector4?ee.set(R.x,R.y,R.z,R.w):ee.set(R,j,at,rt),Rt.scissor(ot.copy(ee).multiplyScalar(Q).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(R){Rt.setScissorTest(be=R)},this.setOpaqueSort=function(R){yt=R},this.setTransparentSort=function(R){St=R},this.getClearColor=function(R){return R.copy(Qt.getClearColor())},this.setClearColor=function(){Qt.setClearColor.apply(Qt,arguments)},this.getClearAlpha=function(){return Qt.getClearAlpha()},this.setClearAlpha=function(){Qt.setClearAlpha.apply(Qt,arguments)},this.clear=function(R=!0,j=!0,at=!0){let rt=0;if(R){let K=!1;if(I!==null){const Mt=I.texture.format;K=Mt===Yp||Mt===kp||Mt===Xp}if(K){const Mt=I.texture.type,bt=Mt===Ua||Mt===rr||Mt===Ol||Mt===bo||Mt===Hp||Mt===Gp,Et=Qt.getClearColor(),Dt=Qt.getClearAlpha(),Jt=Et.r,ne=Et.g,Zt=Et.b;bt?(b[0]=Jt,b[1]=ne,b[2]=Zt,b[3]=Dt,G.clearBufferuiv(G.COLOR,0,b)):(w[0]=Jt,w[1]=ne,w[2]=Zt,w[3]=Dt,G.clearBufferiv(G.COLOR,0,w))}else rt|=G.COLOR_BUFFER_BIT}j&&(rt|=G.DEPTH_BUFFER_BIT),at&&(rt|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_t,!1),i.removeEventListener("webglcontextrestored",Ot,!1),i.removeEventListener("webglcontextcreationerror",zt,!1),Qt.dispose(),Pt.dispose(),_e.dispose(),kt.dispose(),T.dispose(),tt.dispose(),dt.dispose(),Ie.dispose(),X.dispose(),Yt.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Pn),lt.removeEventListener("sessionend",Bl),ia.stop()};function _t(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Ot(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const R=Me.autoReset,j=Gt.enabled,at=Gt.autoUpdate,rt=Gt.needsUpdate,K=Gt.type;Lt(),Me.autoReset=R,Gt.enabled=j,Gt.autoUpdate=at,Gt.needsUpdate=rt,Gt.type=K}function zt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function re(R){const j=R.target;j.removeEventListener("dispose",re),Ke(j)}function Ke(R){yn(R),kt.remove(R)}function yn(R){const j=kt.get(R).programs;j!==void 0&&(j.forEach(function(at){Yt.releaseProgram(at)}),R.isShaderMaterial&&Yt.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,at,rt,K,Mt){j===null&&(j=At);const bt=K.isMesh&&K.matrixWorld.determinant()<0,Et=Xc(R,j,at,rt,K);Rt.setMaterial(rt,bt);let Dt=at.index,Jt=1;if(rt.wireframe===!0){if(Dt=vt.getWireframeAttribute(at),Dt===void 0)return;Jt=2}const ne=at.drawRange,Zt=at.attributes.position;let Re=ne.start*Jt,we=(ne.start+ne.count)*Jt;Mt!==null&&(Re=Math.max(Re,Mt.start*Jt),we=Math.min(we,(Mt.start+Mt.count)*Jt)),Dt!==null?(Re=Math.max(Re,0),we=Math.min(we,Dt.count)):Zt!=null&&(Re=Math.max(Re,0),we=Math.min(we,Zt.count));const ke=we-Re;if(ke<0||ke===1/0)return;Ie.setup(K,rt,Et,at,Dt);let Ge,ve=Ft;if(Dt!==null&&(Ge=gt.get(Dt),ve=pe,ve.setIndex(Ge)),K.isMesh)rt.wireframe===!0?(Rt.setLineWidth(rt.wireframeLinewidth*se()),ve.setMode(G.LINES)):ve.setMode(G.TRIANGLES);else if(K.isLine){let qt=rt.linewidth;qt===void 0&&(qt=1),Rt.setLineWidth(qt*se()),K.isLineSegments?ve.setMode(G.LINES):K.isLineLoop?ve.setMode(G.LINE_LOOP):ve.setMode(G.LINE_STRIP)}else K.isPoints?ve.setMode(G.POINTS):K.isSprite&&ve.setMode(G.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)ve.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))ve.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const qt=K._multiDrawStarts,Qe=K._multiDrawCounts,xe=K._multiDrawCount,Mn=Dt?gt.get(Dt).bytesPerElement:1,je=kt.get(rt).currentProgram.getUniforms();for(let zn=0;zn<xe;zn++)je.setValue(G,"_gl_DrawID",zn),ve.render(qt[zn]/Mn,Qe[zn])}else if(K.isInstancedMesh)ve.renderInstances(Re,ke,K.count);else if(at.isInstancedBufferGeometry){const qt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,Qe=Math.min(at.instanceCount,qt);ve.renderInstances(Re,ke,Qe)}else ve.render(Re,ke)};function Ae(R,j,at){R.transparent===!0&&R.side===$i&&R.forceSinglePass===!1?(R.side=ei,R.needsUpdate=!0,sa(R,j,at),R.side=Da,R.needsUpdate=!0,sa(R,j,at),R.side=$i):sa(R,j,at)}this.compile=function(R,j,at=null){at===null&&(at=R),S=_e.get(at),S.init(j),P.push(S),at.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(S.pushLight(K),K.castShadow&&S.pushShadow(K))}),R!==at&&R.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(S.pushLight(K),K.castShadow&&S.pushShadow(K))}),S.setupLights();const rt=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Mt=K.material;if(Mt)if(Array.isArray(Mt))for(let bt=0;bt<Mt.length;bt++){const Et=Mt[bt];Ae(Et,at,K),rt.add(Et)}else Ae(Mt,at,K),rt.add(Mt)}),P.pop(),S=null,rt},this.compileAsync=function(R,j,at=null){const rt=this.compile(R,j,at);return new Promise(K=>{function Mt(){if(rt.forEach(function(bt){kt.get(bt).currentProgram.isReady()&&rt.delete(bt)}),rt.size===0){K(R);return}setTimeout(Mt,10)}ae.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let We=null;function Sn(R){We&&We(R)}function Pn(){ia.stop()}function Bl(){ia.start()}const ia=new Wy;ia.setAnimationLoop(Sn),typeof self<"u"&&ia.setContext(self),this.setAnimationLoop=function(R){We=R,lt.setAnimationLoop(R),R===null?ia.stop():ia.start()},lt.addEventListener("sessionstart",Pn),lt.addEventListener("sessionend",Bl),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(j),j=lt.getCamera()),R.isScene===!0&&R.onBeforeRender(U,R,j,I),S=_e.get(R,P.length),S.init(j),P.push(S),Tt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),C.setFromProjectionMatrix(Tt),mt=this.localClippingEnabled,Z=xt.init(this.clippingPlanes,mt),M=Pt.get(R,z.length),M.init(),z.push(M),lt.enabled===!0&&lt.isPresenting===!0){const Mt=U.xr.getDepthSensingMesh();Mt!==null&&Lo(Mt,j,-1/0,U.sortObjects)}Lo(R,j,0,U.sortObjects),M.finish(),U.sortObjects===!0&&M.sort(yt,St),It=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,It&&Qt.addToRenderList(M,R),this.info.render.frame++,Z===!0&&xt.beginShadows();const at=S.state.shadowsArray;Gt.render(at,R,j),Z===!0&&xt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=M.opaque,K=M.transmissive;if(S.setupLights(),j.isArrayCamera){const Mt=j.cameras;if(K.length>0)for(let bt=0,Et=Mt.length;bt<Et;bt++){const Dt=Mt[bt];Ms(rt,K,R,Dt)}It&&Qt.render(R);for(let bt=0,Et=Mt.length;bt<Et;bt++){const Dt=Mt[bt];Ss(M,R,Dt,Dt.viewport)}}else K.length>0&&Ms(rt,K,R,j),It&&Qt.render(R),Ss(M,R,j);I!==null&&O===0&&(N.updateMultisampleRenderTarget(I),N.updateRenderTargetMipmap(I)),R.isScene===!0&&R.onAfterRender(U,R,j),Ie.resetDefaultState(),D=-1,A=null,P.pop(),P.length>0?(S=P[P.length-1],Z===!0&&xt.setGlobalState(U.clippingPlanes,S.state.camera)):S=null,z.pop(),z.length>0?M=z[z.length-1]:M=null};function Lo(R,j,at,rt){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)at=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||C.intersectsSprite(R)){rt&&wt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Tt);const bt=dt.update(R),Et=R.material;Et.visible&&M.push(R,bt,Et,at,wt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||C.intersectsObject(R))){const bt=dt.update(R),Et=R.material;if(rt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),wt.copy(R.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),wt.copy(bt.boundingSphere.center)),wt.applyMatrix4(R.matrixWorld).applyMatrix4(Tt)),Array.isArray(Et)){const Dt=bt.groups;for(let Jt=0,ne=Dt.length;Jt<ne;Jt++){const Zt=Dt[Jt],Re=Et[Zt.materialIndex];Re&&Re.visible&&M.push(R,bt,Re,at,wt.z,Zt)}}else Et.visible&&M.push(R,bt,Et,at,wt.z,null)}}const Mt=R.children;for(let bt=0,Et=Mt.length;bt<Et;bt++)Lo(Mt[bt],j,at,rt)}function Ss(R,j,at,rt){const K=R.opaque,Mt=R.transmissive,bt=R.transparent;S.setupLightsView(at),Z===!0&&xt.setGlobalState(U.clippingPlanes,at),rt&&Rt.viewport(B.copy(rt)),K.length>0&&aa(K,j,at),Mt.length>0&&aa(Mt,j,at),bt.length>0&&aa(bt,j,at),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function Ms(R,j,at,rt){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[rt.id]===void 0&&(S.state.transmissionRenderTarget[rt.id]=new or(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?zl:Ua,minFilter:er,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const Mt=S.state.transmissionRenderTarget[rt.id],bt=rt.viewport||B;Mt.setSize(bt.z*U.transmissionResolutionScale,bt.w*U.transmissionResolutionScale);const Et=U.getRenderTarget();U.setRenderTarget(Mt),U.getClearColor(pt),ht=U.getClearAlpha(),ht<1&&U.setClearColor(16777215,.5),U.clear(),It&&Qt.render(at);const Dt=U.toneMapping;U.toneMapping=gs;const Jt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),S.setupLightsView(rt),Z===!0&&xt.setGlobalState(U.clippingPlanes,rt),aa(R,at,rt),N.updateMultisampleRenderTarget(Mt),N.updateRenderTargetMipmap(Mt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let Zt=0,Re=j.length;Zt<Re;Zt++){const we=j[Zt],ke=we.object,Ge=we.geometry,ve=we.material,qt=we.group;if(ve.side===$i&&ke.layers.test(rt.layers)){const Qe=ve.side;ve.side=ei,ve.needsUpdate=!0,Hi(ke,at,rt,Ge,ve,qt),ve.side=Qe,ve.needsUpdate=!0,ne=!0}}ne===!0&&(N.updateMultisampleRenderTarget(Mt),N.updateRenderTargetMipmap(Mt))}U.setRenderTarget(Et),U.setClearColor(pt,ht),Jt!==void 0&&(rt.viewport=Jt),U.toneMapping=Dt}function aa(R,j,at){const rt=j.isScene===!0?j.overrideMaterial:null;for(let K=0,Mt=R.length;K<Mt;K++){const bt=R[K],Et=bt.object,Dt=bt.geometry,Jt=rt===null?bt.material:rt,ne=bt.group;Et.layers.test(at.layers)&&Hi(Et,j,at,Dt,Jt,ne)}}function Hi(R,j,at,rt,K,Mt){R.onBeforeRender(U,j,at,rt,K,Mt),R.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(U,j,at,rt,R,Mt),K.transparent===!0&&K.side===$i&&K.forceSinglePass===!1?(K.side=ei,K.needsUpdate=!0,U.renderBufferDirect(at,j,rt,K,R,Mt),K.side=Da,K.needsUpdate=!0,U.renderBufferDirect(at,j,rt,K,R,Mt),K.side=$i):U.renderBufferDirect(at,j,rt,K,R,Mt),R.onAfterRender(U,j,at,rt,K,Mt)}function sa(R,j,at){j.isScene!==!0&&(j=At);const rt=kt.get(R),K=S.state.lights,Mt=S.state.shadowsArray,bt=K.state.version,Et=Yt.getParameters(R,K.state,Mt,j,at),Dt=Yt.getProgramCacheKey(Et);let Jt=rt.programs;rt.environment=R.isMeshStandardMaterial?j.environment:null,rt.fog=j.fog,rt.envMap=(R.isMeshStandardMaterial?tt:T).get(R.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,Jt===void 0&&(R.addEventListener("dispose",re),Jt=new Map,rt.programs=Jt);let ne=Jt.get(Dt);if(ne!==void 0){if(rt.currentProgram===ne&&rt.lightsStateVersion===bt)return Oo(R,Et),ne}else Et.uniforms=Yt.getUniforms(R),R.onBeforeCompile(Et,U),ne=Yt.acquireProgram(Et,Dt),Jt.set(Dt,ne),rt.uniforms=Et.uniforms;const Zt=rt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Zt.clippingPlanes=xt.uniform),Oo(R,Et),rt.needsLights=Po(R),rt.lightsStateVersion=bt,rt.needsLights&&(Zt.ambientLightColor.value=K.state.ambient,Zt.lightProbe.value=K.state.probe,Zt.directionalLights.value=K.state.directional,Zt.directionalLightShadows.value=K.state.directionalShadow,Zt.spotLights.value=K.state.spot,Zt.spotLightShadows.value=K.state.spotShadow,Zt.rectAreaLights.value=K.state.rectArea,Zt.ltc_1.value=K.state.rectAreaLTC1,Zt.ltc_2.value=K.state.rectAreaLTC2,Zt.pointLights.value=K.state.point,Zt.pointLightShadows.value=K.state.pointShadow,Zt.hemisphereLights.value=K.state.hemi,Zt.directionalShadowMap.value=K.state.directionalShadowMap,Zt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Zt.spotShadowMap.value=K.state.spotShadowMap,Zt.spotLightMatrix.value=K.state.spotLightMatrix,Zt.spotLightMap.value=K.state.spotLightMap,Zt.pointShadowMap.value=K.state.pointShadowMap,Zt.pointShadowMatrix.value=K.state.pointShadowMatrix),rt.currentProgram=ne,rt.uniformsList=null,ne}function La(R){if(R.uniformsList===null){const j=R.currentProgram.getUniforms();R.uniformsList=Pc.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function Oo(R,j){const at=kt.get(R);at.outputColorSpace=j.outputColorSpace,at.batching=j.batching,at.batchingColor=j.batchingColor,at.instancing=j.instancing,at.instancingColor=j.instancingColor,at.instancingMorph=j.instancingMorph,at.skinning=j.skinning,at.morphTargets=j.morphTargets,at.morphNormals=j.morphNormals,at.morphColors=j.morphColors,at.morphTargetsCount=j.morphTargetsCount,at.numClippingPlanes=j.numClippingPlanes,at.numIntersection=j.numClipIntersection,at.vertexAlphas=j.vertexAlphas,at.vertexTangents=j.vertexTangents,at.toneMapping=j.toneMapping}function Xc(R,j,at,rt,K){j.isScene!==!0&&(j=At),N.resetTextureUnits();const Mt=j.fog,bt=rt.isMeshStandardMaterial?j.environment:null,Et=I===null?U.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ro,Dt=(rt.isMeshStandardMaterial?tt:T).get(rt.envMap||bt),Jt=rt.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,ne=!!at.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),Zt=!!at.morphAttributes.position,Re=!!at.morphAttributes.normal,we=!!at.morphAttributes.color;let ke=gs;rt.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ke=U.toneMapping);const Ge=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,ve=Ge!==void 0?Ge.length:0,qt=kt.get(rt),Qe=S.state.lights;if(Z===!0&&(mt===!0||R!==A)){const An=R===A&&rt.id===D;xt.setState(rt,R,An)}let xe=!1;rt.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==Qe.state.version||qt.outputColorSpace!==Et||K.isBatchedMesh&&qt.batching===!1||!K.isBatchedMesh&&qt.batching===!0||K.isBatchedMesh&&qt.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&qt.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&qt.instancing===!1||!K.isInstancedMesh&&qt.instancing===!0||K.isSkinnedMesh&&qt.skinning===!1||!K.isSkinnedMesh&&qt.skinning===!0||K.isInstancedMesh&&qt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&qt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&qt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&qt.instancingMorph===!1&&K.morphTexture!==null||qt.envMap!==Dt||rt.fog===!0&&qt.fog!==Mt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==xt.numPlanes||qt.numIntersection!==xt.numIntersection)||qt.vertexAlphas!==Jt||qt.vertexTangents!==ne||qt.morphTargets!==Zt||qt.morphNormals!==Re||qt.morphColors!==we||qt.toneMapping!==ke||qt.morphTargetsCount!==ve)&&(xe=!0):(xe=!0,qt.__version=rt.version);let Mn=qt.currentProgram;xe===!0&&(Mn=sa(rt,j,K));let je=!1,zn=!1,Oa=!1;const Ve=Mn.getUniforms(),sn=qt.uniforms;if(Rt.useProgram(Mn.program)&&(je=!0,zn=!0,Oa=!0),rt.id!==D&&(D=rt.id,zn=!0),je||A!==R){Rt.buffers.depth.getReversed()?(ut.copy(R.projectionMatrix),sT(ut),rT(ut),Ve.setValue(G,"projectionMatrix",ut)):Ve.setValue(G,"projectionMatrix",R.projectionMatrix),Ve.setValue(G,"viewMatrix",R.matrixWorldInverse);const Rn=Ve.map.cameraPosition;Rn!==void 0&&Rn.setValue(G,Vt.setFromMatrixPosition(R.matrixWorld)),Kt.logarithmicDepthBuffer&&Ve.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Ve.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),A!==R&&(A=R,zn=!0,Oa=!0)}if(K.isSkinnedMesh){Ve.setOptional(G,K,"bindMatrix"),Ve.setOptional(G,K,"bindMatrixInverse");const An=K.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),Ve.setValue(G,"boneTexture",An.boneTexture,N))}K.isBatchedMesh&&(Ve.setOptional(G,K,"batchingTexture"),Ve.setValue(G,"batchingTexture",K._matricesTexture,N),Ve.setOptional(G,K,"batchingIdTexture"),Ve.setValue(G,"batchingIdTexture",K._indirectTexture,N),Ve.setOptional(G,K,"batchingColorTexture"),K._colorsTexture!==null&&Ve.setValue(G,"batchingColorTexture",K._colorsTexture,N));const pn=at.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&te.update(K,at,Mn),(zn||qt.receiveShadow!==K.receiveShadow)&&(qt.receiveShadow=K.receiveShadow,Ve.setValue(G,"receiveShadow",K.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(sn.envMap.value=Dt,sn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&j.environment!==null&&(sn.envMapIntensity.value=j.environmentIntensity),zn&&(Ve.setValue(G,"toneMappingExposure",U.toneMappingExposure),qt.needsLights&&Fl(sn,Oa),Mt&&rt.fog===!0&&Nt.refreshFogUniforms(sn,Mt),Nt.refreshMaterialUniforms(sn,rt,Q,st,S.state.transmissionRenderTarget[R.id]),Pc.upload(G,La(qt),sn,N)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Pc.upload(G,La(qt),sn,N),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Ve.setValue(G,"center",K.center),Ve.setValue(G,"modelViewMatrix",K.modelViewMatrix),Ve.setValue(G,"normalMatrix",K.normalMatrix),Ve.setValue(G,"modelMatrix",K.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const An=rt.uniformsGroups;for(let Rn=0,fr=An.length;Rn<fr;Rn++){const ra=An[Rn];X.update(ra,Mn),X.bind(ra,Mn)}}return Mn}function Fl(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function Po(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(R,j,at){kt.get(R.texture).__webglTexture=j,kt.get(R.depthTexture).__webglTexture=at;const rt=kt.get(R);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=at===void 0,rt.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,j){const at=kt.get(R);at.__webglFramebuffer=j,at.__useDefaultFramebuffer=j===void 0};const xs=G.createFramebuffer();this.setRenderTarget=function(R,j=0,at=0){I=R,H=j,O=at;let rt=!0,K=null,Mt=!1,bt=!1;if(R){const Dt=kt.get(R);if(Dt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(G.FRAMEBUFFER,null),rt=!1;else if(Dt.__webglFramebuffer===void 0)N.setupRenderTarget(R);else if(Dt.__hasExternalTextures)N.rebindTextures(R,kt.get(R.texture).__webglTexture,kt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Zt=R.depthTexture;if(Dt.__boundDepthTexture!==Zt){if(Zt!==null&&kt.has(Zt)&&(R.width!==Zt.image.width||R.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(R)}}const Jt=R.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(bt=!0);const ne=kt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ne[j])?K=ne[j][at]:K=ne[j],Mt=!0):R.samples>0&&N.useMultisampledRTT(R)===!1?K=kt.get(R).__webglMultisampledFramebuffer:Array.isArray(ne)?K=ne[at]:K=ne,B.copy(R.viewport),ot.copy(R.scissor),it=R.scissorTest}else B.copy(Ht).multiplyScalar(Q).floor(),ot.copy(ee).multiplyScalar(Q).floor(),it=be;if(at!==0&&(K=xs),Rt.bindFramebuffer(G.FRAMEBUFFER,K)&&rt&&Rt.drawBuffers(R,K),Rt.viewport(B),Rt.scissor(ot),Rt.setScissorTest(it),Mt){const Dt=kt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+j,Dt.__webglTexture,at)}else if(bt){const Dt=kt.get(R.texture),Jt=j;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Dt.__webglTexture,at,Jt)}else if(R!==null&&at!==0){const Dt=kt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Dt.__webglTexture,at)}D=-1},this.readRenderTargetPixels=function(R,j,at,rt,K,Mt,bt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=kt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&bt!==void 0&&(Et=Et[bt]),Et){Rt.bindFramebuffer(G.FRAMEBUFFER,Et);try{const Dt=R.texture,Jt=Dt.format,ne=Dt.type;if(!Kt.textureFormatReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-rt&&at>=0&&at<=R.height-K&&G.readPixels(j,at,rt,K,oe.convert(Jt),oe.convert(ne),Mt)}finally{const Dt=I!==null?kt.get(I).__webglFramebuffer:null;Rt.bindFramebuffer(G.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(R,j,at,rt,K,Mt,bt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=kt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&bt!==void 0&&(Et=Et[bt]),Et){const Dt=R.texture,Jt=Dt.format,ne=Dt.type;if(!Kt.textureFormatReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=R.width-rt&&at>=0&&at<=R.height-K){Rt.bindFramebuffer(G.FRAMEBUFFER,Et);const Zt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,Zt),G.bufferData(G.PIXEL_PACK_BUFFER,Mt.byteLength,G.STREAM_READ),G.readPixels(j,at,rt,K,oe.convert(Jt),oe.convert(ne),0);const Re=I!==null?kt.get(I).__webglFramebuffer:null;Rt.bindFramebuffer(G.FRAMEBUFFER,Re);const we=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await aT(G,we,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,Zt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Mt),G.deleteBuffer(Zt),G.deleteSync(we),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,j=null,at=0){R.isTexture!==!0&&(po("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,R=arguments[1]);const rt=Math.pow(2,-at),K=Math.floor(R.image.width*rt),Mt=Math.floor(R.image.height*rt),bt=j!==null?j.x:0,Et=j!==null?j.y:0;N.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,at,0,0,bt,Et,K,Mt),Rt.unbindTexture()};const kc=G.createFramebuffer(),Hl=G.createFramebuffer();this.copyTextureToTexture=function(R,j,at=null,rt=null,K=0,Mt=null){R.isTexture!==!0&&(po("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,R=arguments[1],j=arguments[2],Mt=arguments[3]||0,at=null),Mt===null&&(K!==0?(po("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Mt=K,K=0):Mt=0);let bt,Et,Dt,Jt,ne,Zt,Re,we,ke;const Ge=R.isCompressedTexture?R.mipmaps[Mt]:R.image;if(at!==null)bt=at.max.x-at.min.x,Et=at.max.y-at.min.y,Dt=at.isBox3?at.max.z-at.min.z:1,Jt=at.min.x,ne=at.min.y,Zt=at.isBox3?at.min.z:0;else{const pn=Math.pow(2,-K);bt=Math.floor(Ge.width*pn),Et=Math.floor(Ge.height*pn),R.isDataArrayTexture?Dt=Ge.depth:R.isData3DTexture?Dt=Math.floor(Ge.depth*pn):Dt=1,Jt=0,ne=0,Zt=0}rt!==null?(Re=rt.x,we=rt.y,ke=rt.z):(Re=0,we=0,ke=0);const ve=oe.convert(j.format),qt=oe.convert(j.type);let Qe;j.isData3DTexture?(N.setTexture3D(j,0),Qe=G.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(N.setTexture2DArray(j,0),Qe=G.TEXTURE_2D_ARRAY):(N.setTexture2D(j,0),Qe=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,j.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,j.unpackAlignment);const xe=G.getParameter(G.UNPACK_ROW_LENGTH),Mn=G.getParameter(G.UNPACK_IMAGE_HEIGHT),je=G.getParameter(G.UNPACK_SKIP_PIXELS),zn=G.getParameter(G.UNPACK_SKIP_ROWS),Oa=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,Ge.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Ge.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Jt),G.pixelStorei(G.UNPACK_SKIP_ROWS,ne),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Zt);const Ve=R.isDataArrayTexture||R.isData3DTexture,sn=j.isDataArrayTexture||j.isData3DTexture;if(R.isDepthTexture){const pn=kt.get(R),An=kt.get(j),Rn=kt.get(pn.__renderTarget),fr=kt.get(An.__renderTarget);Rt.bindFramebuffer(G.READ_FRAMEBUFFER,Rn.__webglFramebuffer),Rt.bindFramebuffer(G.DRAW_FRAMEBUFFER,fr.__webglFramebuffer);for(let ra=0;ra<Dt;ra++)Ve&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,kt.get(R).__webglTexture,K,Zt+ra),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,kt.get(j).__webglTexture,Mt,ke+ra)),G.blitFramebuffer(Jt,ne,bt,Et,Re,we,bt,Et,G.DEPTH_BUFFER_BIT,G.NEAREST);Rt.bindFramebuffer(G.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(K!==0||R.isRenderTargetTexture||kt.has(R)){const pn=kt.get(R),An=kt.get(j);Rt.bindFramebuffer(G.READ_FRAMEBUFFER,kc),Rt.bindFramebuffer(G.DRAW_FRAMEBUFFER,Hl);for(let Rn=0;Rn<Dt;Rn++)Ve?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,pn.__webglTexture,K,Zt+Rn):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,pn.__webglTexture,K),sn?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,An.__webglTexture,Mt,ke+Rn):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,An.__webglTexture,Mt),K!==0?G.blitFramebuffer(Jt,ne,bt,Et,Re,we,bt,Et,G.COLOR_BUFFER_BIT,G.NEAREST):sn?G.copyTexSubImage3D(Qe,Mt,Re,we,ke+Rn,Jt,ne,bt,Et):G.copyTexSubImage2D(Qe,Mt,Re,we,Jt,ne,bt,Et);Rt.bindFramebuffer(G.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else sn?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(Qe,Mt,Re,we,ke,bt,Et,Dt,ve,qt,Ge.data):j.isCompressedArrayTexture?G.compressedTexSubImage3D(Qe,Mt,Re,we,ke,bt,Et,Dt,ve,Ge.data):G.texSubImage3D(Qe,Mt,Re,we,ke,bt,Et,Dt,ve,qt,Ge):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Mt,Re,we,bt,Et,ve,qt,Ge.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Mt,Re,we,Ge.width,Ge.height,ve,Ge.data):G.texSubImage2D(G.TEXTURE_2D,Mt,Re,we,bt,Et,ve,qt,Ge);G.pixelStorei(G.UNPACK_ROW_LENGTH,xe),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Mn),G.pixelStorei(G.UNPACK_SKIP_PIXELS,je),G.pixelStorei(G.UNPACK_SKIP_ROWS,zn),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Oa),Mt===0&&j.generateMipmaps&&G.generateMipmap(Qe),Rt.unbindTexture()},this.copyTextureToTexture3D=function(R,j,at=null,rt=null,K=0){return R.isTexture!==!0&&(po("WebGLRenderer: copyTextureToTexture3D function signature has changed."),at=arguments[0]||null,rt=arguments[1]||null,R=arguments[2],j=arguments[3],K=arguments[4]||0),po('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,j,at,rt,K)},this.initRenderTarget=function(R){kt.get(R).__webglFramebuffer===void 0&&N.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?N.setTextureCube(R,0):R.isData3DTexture?N.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?N.setTexture2DArray(R,0):N.setTexture2D(R,0),Rt.unbindTexture()},this.resetState=function(){H=0,O=0,I=null,Rt.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorspace=Ue._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ue._getUnpackColorSpace()}}const my={type:"change"},Jp={type:"start"},Jy={type:"end"},wc=new zy,gy=new ds,AC=Math.cos(70*ar.DEG2RAD),gn=new nt,Jn=2*Math.PI,He={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Kd=1e-6;class RC extends XT{constructor(e,i=null){super(e,i),this.state=He.NONE,this.enabled=!0,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vo.ROTATE,MIDDLE:vo.DOLLY,RIGHT:vo.PAN},this.touches={ONE:mo.ROTATE,TWO:mo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new lr,this._lastTargetPosition=new nt,this._quat=new lr().setFromUnitVectors(e.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xv,this._sphericalDelta=new Xv,this._scale=1,this._panOffset=new nt,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new nt,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wC.bind(this),this._onPointerDown=CC.bind(this),this._onPointerUp=DC.bind(this),this._onContextMenu=IC.bind(this),this._onMouseWheel=LC.bind(this),this._onKeyDown=OC.bind(this),this._onTouchStart=PC.bind(this),this._onTouchMove=zC.bind(this),this._onMouseDown=UC.bind(this),this._onMouseMove=NC.bind(this),this._interceptControlDown=BC.bind(this),this._interceptControlUp=FC.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(my),this.update(),this.state=He.NONE}update(e=null){const i=this.object.position;gn.copy(i).sub(this.target),gn.applyQuaternion(this._quat),this._spherical.setFromVector3(gn),this.autoRotate&&this.state===He.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,u=this.maxAzimuthAngle;isFinite(r)&&isFinite(u)&&(r<-Math.PI?r+=Jn:r>Math.PI&&(r-=Jn),u<-Math.PI?u+=Jn:u>Math.PI&&(u-=Jn),r<=u?this._spherical.theta=Math.max(r,Math.min(u,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+u)/2?Math.max(r,this._spherical.theta):Math.min(u,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(gn.setFromSpherical(this._spherical),gn.applyQuaternion(this._quatInverse),i.copy(this.target).add(gn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=gn.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const d=new nt(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const m=new nt(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),h=gn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(wc.origin.copy(this.object.position),wc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wc.direction))<AC?this.object.lookAt(this.target):(gy.setFromNormalAndCoplanarPoint(this.object.up,this.target),wc.intersectPlane(gy,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>Kd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Kd||this._lastTargetPosition.distanceToSquared(this.target)>Kd?(this.dispatchEvent(my),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Jn/60*this.autoRotateSpeed*e:Jn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){gn.setFromMatrixColumn(i,0),gn.multiplyScalar(-e),this._panOffset.add(gn)}_panUp(e,i){this.screenSpacePanning===!0?gn.setFromMatrixColumn(i,1):(gn.setFromMatrixColumn(i,0),gn.crossVectors(this.object.up,gn)),gn.multiplyScalar(e),this._panOffset.add(gn)}_pan(e,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const u=this.object.position;gn.copy(u).sub(this.target);let f=gn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/r.clientHeight,this.object.matrix),this._panUp(2*i*f/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),u=e-r.left,f=i-r.top,h=r.width,d=r.height;this._mouse.x=u/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Jn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Jn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._rotateStart.set(r,u)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panStart.set(r,u)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(r*r+u*u);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),u=.5*(e.pageX+r.x),f=.5*(e.pageY+r.y);this._rotateEnd.set(u,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Jn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Jn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panEnd.set(r,u)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(r*r+u*u);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new ce,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function CC(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function wC(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function DC(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jy),this.state=He.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function UC(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case vo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=He.DOLLY;break;case vo.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=He.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=He.ROTATE}break;case vo.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=He.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=He.PAN}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(Jp)}function NC(o){switch(this.state){case He.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case He.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case He.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function LC(o){this.enabled===!1||this.enableZoom===!1||this.state!==He.NONE||(o.preventDefault(),this.dispatchEvent(Jp),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Jy))}function OC(o){this.enabled!==!1&&this._handleKeyDown(o)}function PC(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case mo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=He.TOUCH_ROTATE;break;case mo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=He.TOUCH_PAN;break;default:this.state=He.NONE}break;case 2:switch(this.touches.TWO){case mo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=He.TOUCH_DOLLY_PAN;break;case mo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=He.TOUCH_DOLLY_ROTATE;break;default:this.state=He.NONE}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(Jp)}function zC(o){switch(this._trackPointer(o),this.state){case He.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case He.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case He.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case He.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=He.NONE}}function IC(o){this.enabled!==!1&&o.preventDefault()}function BC(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function FC(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wo=200,ti=wo/2,_o=23,sr=-78;function fn(o,e){const i=Math.sin(o*127.1+e*311.7)*43758.5453;return i-Math.floor(i)}function _y(o,e){const i=Math.floor(o),r=Math.floor(e),u=o-i,f=e-r,h=u*u*(3-2*u),d=f*f*(3-2*f),p=ar.lerp(fn(i,r),fn(i+1,r),h),m=ar.lerp(fn(i,r+1),fn(i+1,r+1),h);return ar.lerp(p,m,d)}function Zs(o,e,i,r,u,f,h){const d=(o-i)/u,p=(e-r)/f;return h*Math.exp(-.5*(d*d+p*p))}function _s(o){return 8+4.2*Math.sin(o*.047)+1.8*Math.sin(o*.13)}function Qs(o,e){return(e+ti)*wo+(o+ti)}function HC(){const o=new Uint8Array(wo*wo);for(let r=-ti;r<ti;r++)for(let u=-ti;u<ti;u++){const f=Zs(u,r,-10,27,28,33,42),h=Zs(u,r,-56,37,23,29,36),d=Zs(u,r,50,37,24,31,34),p=Zs(u,r,-2,75,48,24,24),m=Math.max(f,h,d,p),v=2.4+m+(f+h+d+p-m)*.17+Zs(u,r,-36,1,30,27,6)+Zs(u,r,-15,23,9,11,8)+Zs(u,r,8,41,8,9,7),g=ar.smoothstep(v,4,22),y=(_y(u*.077,r*.077)-.5)*5.2+(_y(u*.19,r*.19)-.5)*2.1,x=9.5*ar.smoothstep(r,-13,-9)*Math.exp(-Math.pow((u-_s(r))/15,2));o[Qs(u,r)]=ar.clamp(Math.round(v+y*g+x),2,55)}let e=55;for(let r=_o;r>=sr;r--){const u=Math.round(_s(r));e=Math.min(e,o[Qs(u,r)]);for(let f=-3;f<=3;f++){const h=u+f,d=Math.max(0,Math.abs(f)-2);o[Qs(h,r)]=Math.min(o[Qs(h,r)],e+d)}}const i=_s(sr);for(let r=-89;r<=-68;r++)for(let u=Math.floor(i-16);u<=Math.ceil(i+16);u++)Math.pow((u-i)/15,2)+Math.pow((r+79)/10,2)<1&&(o[Qs(u,r)]=Math.min(o[Qs(u,r)],3));return o}function On(o,e,i){return e<-ti||e>=ti||i<-ti||i>=ti?0:o[Qs(e,i)]}function GC(o){const e=[],i=[],r=[],u=[],h=Object.fromEntries(Object.entries({meadow:["#648e60","#739763","#7a9d69","#5b855f"],forest:["#537e5e","#608966","#496f59","#6a8b67"],moss:["#697a69","#74846e","#68766a","#788778"],stone:["#87908b","#929993","#7b8582","#9ca39b"],snow:["#d4d8ce","#e2e4dc","#c6d0cb","#edf0e8"],earth:["#62675e","#6d7166","#737467","#595f58"]}).map(([g,y])=>[g,y.map(x=>new ge(x))]));function d(g,y,x){const b=e.length/3;for(const[w,M,S]of g)e.push(w,M,S),i.push(...y),r.push(x.r,x.g,x.b);u.push(b,b+1,b+2,b,b+2,b+3)}for(let g=-ti;g<ti;g++)for(let y=-ti;y<ti;y++){let V=function(A,B,ot){for(let it=A;it<x;it++){const pt=it>37?"snow":it>23?"stone":it>x-3&&x<18?"forest":"earth",ht=h[pt][Math.floor(fn(y+it*7,g-it*3)*4)];d(B(it,it+1),ot,ht)}};var v=V;const x=On(o,y,g),b=Math.max(Math.abs(x-On(o,y-1,g)),Math.abs(x-On(o,y+1,g)),Math.abs(x-On(o,y,g-1)),Math.abs(x-On(o,y,g+1))),w=Math.floor(fn(y*3,g*7)*4),M=x>39?"snow":x>25||b>4?"stone":x>14?"moss":x>5?"forest":"meadow",S=y-.5,z=y+.5,P=g-.5,U=g+.5;d([[S,x,U],[z,x,U],[z,x,P],[S,x,P]],[0,1,0],h[M][w]);const H=On(o,y,g-1);x>H&&V(H,(A,B)=>[[S,A,P],[S,B,P],[z,B,P],[z,A,P]],[0,0,-1]);const O=On(o,y,g+1);x>O&&V(O,(A,B)=>[[z,A,U],[z,B,U],[S,B,U],[S,A,U]],[0,0,1]);const I=On(o,y-1,g);x>I&&V(I,(A,B)=>[[S,A,U],[S,B,U],[S,B,P],[S,A,P]],[-1,0,0]);const D=On(o,y+1,g);x>D&&V(D,(A,B)=>[[z,A,P],[z,B,P],[z,B,U],[z,A,U]],[1,0,0])}const p=new ys;p.setAttribute("position",new na(e,3)),p.setAttribute("normal",new na(i,3)),p.setAttribute("color",new na(r,3)),p.setIndex(u),p.computeBoundingSphere();const m=new ir({vertexColors:!0,side:Da});return new di(p,m)}function VC(o){const e=new nr,i=new Hv({color:"#3faec0",emissive:"#0c4456",emissiveIntensity:.28,shininess:85,transparent:!0,opacity:.93,depthWrite:!0}),r=new Hv({color:"#59c9d5",emissive:"#146579",emissiveIntensity:.38,shininess:90,transparent:!0,opacity:.88,side:$i}),u=new $n(1,.18,1.04),f=new $n(1,1,1),h=new Ca(u,i,(_o-sr+1)*5+600),d=new Ca(f,r,1500),p=new hn,m=[];let v=0,g=0;for(let V=_o;V>=sr;V--){const H=Math.round(_s(V)),O=On(o,H,V);if(V<_o){const I=On(o,Math.round(_s(V+1)),V+1);for(let D=I;D>O;D-=.65)m.push(new nt(H,D+.2,V+.48))}m.push(new nt(H,O+.35,V));for(let I=-2;I<=2;I++){const D=H+I,A=On(o,D,V);if(p.position.set(D,A+.18,V),p.scale.set(1,1,1),p.updateMatrix(),h.setMatrixAt(v++,p.matrix),V<_o){const B=On(o,D,V+1);if(B>A){const ot=B-A;p.position.set(D,A+ot/2+.2,V+.49),p.scale.set(1.02,ot+.15,.16),p.updateMatrix(),d.setMatrixAt(g++,p.matrix)}}}}h.count=v,d.count=g,h.instanceMatrix.needsUpdate=!0,d.instanceMatrix.needsUpdate=!0,e.add(h,d);const y=new Ca(u,i,600);let x=0;const b=_s(sr);for(let V=-89;V<=-68;V++)for(let H=Math.floor(b-16);H<=Math.ceil(b+16);H++)Math.pow((H-b)/14.5,2)+Math.pow((V+79)/9.5,2)>=1||On(o,H,V)>3||(p.position.set(H,3.18,V),p.scale.set(1,1,1),p.updateMatrix(),y.setMatrixAt(x++,p.matrix));y.count=x,y.instanceMatrix.needsUpdate=!0,e.add(y);const w=135,M=new Ca(new $n(1,1,1),new jp({color:"#d8f6ec",transparent:!0,opacity:.83}),w);M.instanceMatrix.setUsage(HE),e.add(M);const S=m;let z=0;const P=[0];for(let V=1;V<S.length;V++)z+=S[V].distanceTo(S[V-1]),P.push(z);function U(V,H){for(let O=0;O<w;O++){const I=(V*H*23+O*z/w)%z;let D=0,A=P.length-1;for(;D<A;){const pt=D+A>>1;P[pt]<I?D=pt+1:A=pt}const B=Math.max(1,D),ot=(I-P[B-1])/Math.max(.001,P[B]-P[B-1]);p.position.copy(S[B-1]).lerp(S[B],ot),p.position.x+=(fn(O,17)-.5)*4.2,p.position.y+=.13;const it=.13+fn(O,28)*.29;p.scale.set(it*1.7,it*.48,it*2.2),p.updateMatrix(),M.setMatrixAt(O,p.matrix)}M.instanceMatrix.needsUpdate=!0}return{group:e,updateFoam:U}}function XC(o){const e=new nr,i=[];for(let h=-92;h<92;h+=5)for(let d=-92;d<92;d+=5){if(fn(d,h)<.43)continue;const p=Math.round(d+(fn(d+3,h)-.5)*3),m=Math.round(h+(fn(d,h+3)-.5)*3),v=On(o,p,m);v<3||v>18||Math.abs(p-_s(m))<7&&m<_o&&m>sr||Math.max(Math.abs(v-On(o,p+1,m)),Math.abs(v-On(o,p,m+1)))>2||Math.pow((p-_s(sr))/17,2)+Math.pow((m+79)/12,2)<1||i.push([p,v,m,.8+fn(p,m)*.8])}const r=new hn,u=new Ca(new $n(1,1,1),new ir({color:"#74594a"}),i.length),f=[new Ca(new $n(1,1,1),new ir({color:"#315f4b"}),i.length),new Ca(new $n(1,1,1),new ir({color:"#397053"}),i.length),new Ca(new $n(1,1,1),new ir({color:"#4a805b"}),i.length)];return i.forEach(([h,d,p,m],v)=>{r.position.set(h,d+m*1.1,p),r.scale.set(m*.55,m*2.2,m*.55),r.updateMatrix(),u.setMatrixAt(v,r.matrix),f.forEach((g,y)=>{const x=[3.25,2.55,1.75][y]*m;r.position.set(h,d+m*(2.5+y*1.05),p),r.scale.set(x,m*1.35,x),r.updateMatrix(),g.setMatrixAt(v,r.matrix)})}),e.add(u,...f),e}function kC(){const o=[[-69,-17,22,27,16,85],[-36,-4,24,27,16,75],[27,-22,23,34,15,90],[74,-5,24,27,20,70],[-66,39,26,30,19,75],[-16,37,25,39,18,105],[48,45,27,35,18,95],[9,81,30,31,17,65]],e=[];o.forEach(([f,h,d,p,m,v],g)=>{for(let y=0;y<v;y++){const x=fn(y+g*101,7)*Math.PI*2,b=Math.sqrt(fn(y+g*71,23));e.push({x:f+Math.cos(x)*b*p,z:h+Math.sin(x)*b*m,y:d+(fn(y+g*61,39)-.5)*5,width:3+fn(y+g*57,41)*5.5,height:1.6+fn(y+g*43,47)*3.6,depth:3+fn(y+g*37,53)*5})}}),e.sort((f,h)=>fn(f.x,f.z)-fn(h.x,h.z));const i=new Ca(new $n(1,1,1),new ir({color:"#edf3ed",transparent:!0,opacity:.78,depthWrite:!0}),e.length),r=new hn;e.forEach((f,h)=>{r.position.set(f.x,f.y,f.z),r.scale.set(f.width,f.height,f.depth),r.updateMatrix(),i.setMatrixAt(h,r.matrix)}),i.instanceMatrix.needsUpdate=!0;const u=new nr;return u.add(i),{group:u,mesh:i,max:e.length}}const YC={dawn:{sky:"#c9ded9",fog:"#d7e4da",sun:"#ffd6aa",ambient:"#dcece6",sunPower:2.45,ambientPower:1.35,exposure:1.22},noon:{sky:"#c9e6e7",fog:"#dcebe4",sun:"#fff5db",ambient:"#e8f4ef",sunPower:2.25,ambientPower:1.55,exposure:1.28},dusk:{sky:"#a9bbc1",fog:"#bdc9c2",sun:"#f3a979",ambient:"#c3d4d5",sunPower:2.05,ambientPower:1.1,exposure:1.08}};function qC(o,e){const i=new UT;i.fog=new Zp("#d7e4da",.0031);const r=new Ai(48,1,1,700),u=new nt(176,132,-190),f=new nt(0,6,5);r.position.copy(u);const h=new bC({antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"});h.setPixelRatio(Math.min(window.devicePixelRatio,1.6)),h.outputColorSpace=hi,h.toneMapping=My,o.appendChild(h.domElement);const d=new RC(r,h.domElement);d.target.copy(f),d.enableDamping=!0,d.dampingFactor=.065,d.minDistance=105,d.maxDistance=370,d.maxPolarAngle=Math.PI*.48,d.autoRotateSpeed=.45,d.update();const p=new BT("#e3f0ec","#576b59",1.35),m=new GT("#ffd6aa",2.45);m.position.set(-78,115,-60),i.add(p,m);const v=HC();i.add(GC(v));const g=new di(new $n(wo,5,wo),new ir({color:"#606c61"}));g.position.y=-2.5,i.add(g);const y=VC(v);i.add(y.group);const x=XC(v);i.add(x);const b=kC();i.add(b.group);let w={...e},M,S=0,z=performance.now(),P="";function U(){if(d.autoRotate=w.orbit,x.visible=w.vegetation,b.mesh.count=Math.round(b.max*w.clouds/100),w.light!==P){const I=YC[w.light];i.background=new ge(I.sky),i.fog.color.set(I.fog),m.color.set(I.sun),m.intensity=I.sunPower,p.color.set(I.ambient),p.intensity=I.ambientPower,h.toneMappingExposure=I.exposure,P=w.light}}U();function V(){const I=Math.max(1,o.clientWidth),D=Math.max(1,o.clientHeight),A=I<740;r.aspect=I/D,r.fov=A?96:48,f.y=A?-4:6,d.target.y=f.y,d.update(),r.updateProjectionMatrix(),h.setSize(I,D,!1)}const H=new ResizeObserver(V);H.observe(o),V();function O(I){const D=Math.min((I-z)/1e3,.05);z=I,S+=D,b.group.position.x=Math.sin(S*.055)*2.5,y.updateFoam(S,w.flow/100),d.update(),h.render(i,r),M=requestAnimationFrame(O)}return M=requestAnimationFrame(O),{updateOptions(I){w={...w,...I},U()},resetView(){r.position.copy(u),d.target.copy(f),d.update()},capture(){h.render(i,r);const I=document.createElement("a");I.download="voxel-waterfall.png",I.href=h.domElement.toDataURL("image/png"),I.click()},destroy(){cancelAnimationFrame(M),H.disconnect(),d.dispose(),i.traverse(I=>{var D,A;(D=I.geometry)==null||D.dispose(),Array.isArray(I.material)?I.material.forEach(B=>B.dispose()):(A=I.material)==null||A.dispose()}),h.dispose(),h.domElement.remove()}}}const vy={light:"dawn",clouds:76,flow:65,vegetation:!0,orbit:!1};function WC(){const o=bi.useRef(null),e=bi.useRef(null),[i,r]=bi.useState(vy),[u,f]=bi.useState(!1),[h,d]=bi.useState(!1);bi.useEffect(()=>{const m=qC(o.current,vy);return e.current=m,d(!0),()=>{m.destroy(),e.current=null}},[]);function p(m,v){var g;r(y=>({...y,[m]:v})),(g=e.current)==null||g.updateOptions({[m]:v})}return Wt.createElement("main",{className:"app"},Wt.createElement("div",{className:"viewport",ref:o,"aria-label":"山脉、瀑布和穿云效果的三维体素景观"}),Wt.createElement("div",{className:"vignette","aria-hidden":"true"}),Wt.createElement("header",{className:"masthead"},Wt.createElement("div",{className:"brand-mark","aria-hidden":"true"},Wt.createElement("span",null),Wt.createElement("span",null),Wt.createElement("span",null)),Wt.createElement("div",null,Wt.createElement("p",{className:"eyebrow"},"VOXEL LANDSCAPE / 001"),Wt.createElement("h1",null,"云瀑山境"),Wt.createElement("p",{className:"subtitle"},"THE FALLS ABOVE THE CLOUDS"))),Wt.createElement("button",{className:"mobile-settings icon-button",type:"button",title:"场景设置","aria-label":"场景设置","aria-expanded":u,onClick:()=>f(m=>!m)},u?Wt.createElement($x,{size:19}):Wt.createElement(Qx,{size:19})),Wt.createElement("aside",{className:`controls ${u?"controls-open":""}`,"aria-label":"场景设置"},Wt.createElement("div",{className:"panel-heading"},Wt.createElement("span",null,"场景调节"),Wt.createElement("span",{className:"panel-index"},"01 / 04")),Wt.createElement("div",{className:"control-section"},Wt.createElement("div",{className:"section-label"},Wt.createElement("span",null,"光照时段"),Wt.createElement("span",null,"LIGHT")),Wt.createElement("div",{className:"segments",role:"group","aria-label":"光照时段"},[["dawn","晨曦"],["noon","日间"],["dusk","暮色"]].map(([m,v])=>Wt.createElement("button",{key:m,type:"button",className:i.light===m?"selected":"","aria-pressed":i.light===m,onClick:()=>p("light",m)},v)))),Wt.createElement("div",{className:"control-section"},Wt.createElement("label",{className:"range-label",htmlFor:"clouds"},Wt.createElement("span",null,Wt.createElement(Wx,{size:16,strokeWidth:1.8})," 云量"),Wt.createElement("output",null,i.clouds,"%")),Wt.createElement("input",{id:"clouds",type:"range",min:"0",max:"100",value:i.clouds,onChange:m=>p("clouds",Number(m.target.value)),style:{"--value":`${i.clouds}%`}})),Wt.createElement("div",{className:"control-section"},Wt.createElement("label",{className:"range-label",htmlFor:"flow"},Wt.createElement("span",null,Wt.createElement(Jx,{size:16,strokeWidth:1.8})," 水流速度"),Wt.createElement("output",null,i.flow,"%")),Wt.createElement("input",{id:"flow",type:"range",min:"0",max:"100",value:i.flow,onChange:m=>p("flow",Number(m.target.value)),style:{"--value":`${i.flow}%`}})),Wt.createElement("div",{className:"control-section switches"},Wt.createElement("label",{className:"switch-row"},Wt.createElement("span",null,Wt.createElement(Zx,{size:16,strokeWidth:1.8})," 山麓植被"),Wt.createElement("input",{type:"checkbox",checked:i.vegetation,onChange:m=>p("vegetation",m.target.checked)}),Wt.createElement("span",{className:"switch","aria-hidden":"true"})),Wt.createElement("label",{className:"switch-row"},Wt.createElement("span",null,i.orbit?Wt.createElement(qx,{size:16,strokeWidth:1.8}):Wt.createElement(Yx,{size:16,strokeWidth:1.8})," 自动环绕"),Wt.createElement("input",{type:"checkbox",checked:i.orbit,onChange:m=>p("orbit",m.target.checked)}),Wt.createElement("span",{className:"switch","aria-hidden":"true"}))),Wt.createElement("div",{className:"panel-actions"},Wt.createElement("button",{type:"button",title:"重置视角","aria-label":"重置视角",onClick:()=>{var m;return(m=e.current)==null?void 0:m.resetView()},disabled:!h},Wt.createElement(Kx,{size:17})),Wt.createElement("button",{type:"button",title:"下载画面","aria-label":"下载画面",onClick:()=>{var m;return(m=e.current)==null?void 0:m.capture()},disabled:!h},Wt.createElement(jx,{size:17})))),Wt.createElement("footer",{className:"scene-meta"},Wt.createElement("span",{className:"live-dot"}),Wt.createElement("span",null,"200 × 200 VOXEL TERRAIN")))}Gx.createRoot(document.getElementById("root")).render(Wt.createElement(WC,null));
