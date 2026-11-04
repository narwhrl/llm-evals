(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var eh={exports:{}},No={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bx;function _b(){if(bx)return No;bx=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:s,type:r,key:h,ref:l!==void 0?l:null,props:c}}return No.Fragment=e,No.jsx=i,No.jsxs=i,No}var yx;function vb(){return yx||(yx=1,eh.exports=_b()),eh.exports}var Pe=vb(),th={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sx;function bb(){if(Sx)return ut;Sx=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function S(R){return R===null||typeof R!="object"?null:(R=v&&R[v]||R["@@iterator"],typeof R=="function"?R:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,y={};function b(R,J,ge){this.props=R,this.context=J,this.refs=y,this.updater=ge||A}b.prototype.isReactComponent={},b.prototype.setState=function(R,J){if(typeof R!="object"&&typeof R!="function"&&R!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,R,J,"setState")},b.prototype.forceUpdate=function(R){this.updater.enqueueForceUpdate(this,R,"forceUpdate")};function P(){}P.prototype=b.prototype;function L(R,J,ge){this.props=R,this.context=J,this.refs=y,this.updater=ge||A}var H=L.prototype=new P;H.constructor=L,D(H,b.prototype),H.isPureReactComponent=!0;var q=Array.isArray;function O(){}var I={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function U(R,J,ge){var Re=ge.ref;return{$$typeof:s,type:R,key:J,ref:Re!==void 0?Re:null,props:ge}}function C(R,J){return U(R.type,J,R.props)}function V(R){return typeof R=="object"&&R!==null&&R.$$typeof===s}function $(R){var J={"=":"=0",":":"=2"};return"$"+R.replace(/[=:]/g,function(ge){return J[ge]})}var le=/\/+/g;function _e(R,J){return typeof R=="object"&&R!==null&&R.key!=null?$(""+R.key):J.toString(36)}function de(R){switch(R.status){case"fulfilled":return R.value;case"rejected":throw R.reason;default:switch(typeof R.status=="string"?R.then(O,O):(R.status="pending",R.then(function(J){R.status==="pending"&&(R.status="fulfilled",R.value=J)},function(J){R.status==="pending"&&(R.status="rejected",R.reason=J)})),R.status){case"fulfilled":return R.value;case"rejected":throw R.reason}}throw R}function z(R,J,ge,Re,Oe){var ae=typeof R;(ae==="undefined"||ae==="boolean")&&(R=null);var he=!1;if(R===null)he=!0;else switch(ae){case"bigint":case"string":case"number":he=!0;break;case"object":switch(R.$$typeof){case s:case e:he=!0;break;case x:return he=R._init,z(he(R._payload),J,ge,Re,Oe)}}if(he)return Oe=Oe(R),he=Re===""?"."+_e(R,0):Re,q(Oe)?(ge="",he!=null&&(ge=he.replace(le,"$&/")+"/"),z(Oe,J,ge,"",function(Xe){return Xe})):Oe!=null&&(V(Oe)&&(Oe=C(Oe,ge+(Oe.key==null||R&&R.key===Oe.key?"":(""+Oe.key).replace(le,"$&/")+"/")+he)),J.push(Oe)),1;he=0;var Ue=Re===""?".":Re+":";if(q(R))for(var Ve=0;Ve<R.length;Ve++)Re=R[Ve],ae=Ue+_e(Re,Ve),he+=z(Re,J,ge,ae,Oe);else if(Ve=S(R),typeof Ve=="function")for(R=Ve.call(R),Ve=0;!(Re=R.next()).done;)Re=Re.value,ae=Ue+_e(Re,Ve++),he+=z(Re,J,ge,ae,Oe);else if(ae==="object"){if(typeof R.then=="function")return z(de(R),J,ge,Re,Oe);throw J=String(R),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(R).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return he}function Y(R,J,ge){if(R==null)return R;var Re=[],Oe=0;return z(R,Re,"","",function(ae){return J.call(ge,ae,Oe++)}),Re}function F(R){if(R._status===-1){var J=R._result;J=J(),J.then(function(ge){(R._status===0||R._status===-1)&&(R._status=1,R._result=ge)},function(ge){(R._status===0||R._status===-1)&&(R._status=2,R._result=ge)}),R._status===-1&&(R._status=0,R._result=J)}if(R._status===1)return R._result.default;throw R._result}var k=typeof reportError=="function"?reportError:function(R){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof R=="object"&&R!==null&&typeof R.message=="string"?String(R.message):String(R),error:R});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",R);return}console.error(R)},W={map:Y,forEach:function(R,J,ge){Y(R,function(){J.apply(this,arguments)},ge)},count:function(R){var J=0;return Y(R,function(){J++}),J},toArray:function(R){return Y(R,function(J){return J})||[]},only:function(R){if(!V(R))throw Error("React.Children.only expected to receive a single React element child.");return R}};return ut.Activity=_,ut.Children=W,ut.Component=b,ut.Fragment=i,ut.Profiler=l,ut.PureComponent=L,ut.StrictMode=r,ut.Suspense=m,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,ut.__COMPILER_RUNTIME={__proto__:null,c:function(R){return I.H.useMemoCache(R)}},ut.cache=function(R){return function(){return R.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(R,J,ge){if(R==null)throw Error("The argument must be a React element, but you passed "+R+".");var Re=D({},R.props),Oe=R.key;if(J!=null)for(ae in J.key!==void 0&&(Oe=""+J.key),J)!te.call(J,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&J.ref===void 0||(Re[ae]=J[ae]);var ae=arguments.length-2;if(ae===1)Re.children=ge;else if(1<ae){for(var he=Array(ae),Ue=0;Ue<ae;Ue++)he[Ue]=arguments[Ue+2];Re.children=he}return U(R.type,Oe,Re)},ut.createContext=function(R){return R={$$typeof:h,_currentValue:R,_currentValue2:R,_threadCount:0,Provider:null,Consumer:null},R.Provider=R,R.Consumer={$$typeof:c,_context:R},R},ut.createElement=function(R,J,ge){var Re,Oe={},ae=null;if(J!=null)for(Re in J.key!==void 0&&(ae=""+J.key),J)te.call(J,Re)&&Re!=="key"&&Re!=="__self"&&Re!=="__source"&&(Oe[Re]=J[Re]);var he=arguments.length-2;if(he===1)Oe.children=ge;else if(1<he){for(var Ue=Array(he),Ve=0;Ve<he;Ve++)Ue[Ve]=arguments[Ve+2];Oe.children=Ue}if(R&&R.defaultProps)for(Re in he=R.defaultProps,he)Oe[Re]===void 0&&(Oe[Re]=he[Re]);return U(R,ae,Oe)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(R){return{$$typeof:d,render:R}},ut.isValidElement=V,ut.lazy=function(R){return{$$typeof:x,_payload:{_status:-1,_result:R},_init:F}},ut.memo=function(R,J){return{$$typeof:p,type:R,compare:J===void 0?null:J}},ut.startTransition=function(R){var J=I.T,ge={};I.T=ge;try{var Re=R(),Oe=I.S;Oe!==null&&Oe(ge,Re),typeof Re=="object"&&Re!==null&&typeof Re.then=="function"&&Re.then(O,k)}catch(ae){k(ae)}finally{J!==null&&ge.types!==null&&(J.types=ge.types),I.T=J}},ut.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},ut.use=function(R){return I.H.use(R)},ut.useActionState=function(R,J,ge){return I.H.useActionState(R,J,ge)},ut.useCallback=function(R,J){return I.H.useCallback(R,J)},ut.useContext=function(R){return I.H.useContext(R)},ut.useDebugValue=function(){},ut.useDeferredValue=function(R,J){return I.H.useDeferredValue(R,J)},ut.useEffect=function(R,J){return I.H.useEffect(R,J)},ut.useEffectEvent=function(R){return I.H.useEffectEvent(R)},ut.useId=function(){return I.H.useId()},ut.useImperativeHandle=function(R,J,ge){return I.H.useImperativeHandle(R,J,ge)},ut.useInsertionEffect=function(R,J){return I.H.useInsertionEffect(R,J)},ut.useLayoutEffect=function(R,J){return I.H.useLayoutEffect(R,J)},ut.useMemo=function(R,J){return I.H.useMemo(R,J)},ut.useOptimistic=function(R,J){return I.H.useOptimistic(R,J)},ut.useReducer=function(R,J,ge){return I.H.useReducer(R,J,ge)},ut.useRef=function(R){return I.H.useRef(R)},ut.useState=function(R){return I.H.useState(R)},ut.useSyncExternalStore=function(R,J,ge){return I.H.useSyncExternalStore(R,J,ge)},ut.useTransition=function(){return I.H.useTransition()},ut.version="19.2.0",ut}var Mx;function Rd(){return Mx||(Mx=1,th.exports=bb()),th.exports}var Kt=Rd(),nh={exports:{}},Oo={},ih={exports:{}},ah={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ex;function yb(){return Ex||(Ex=1,(function(s){function e(z,Y){var F=z.length;z.push(Y);e:for(;0<F;){var k=F-1>>>1,W=z[k];if(0<l(W,Y))z[k]=Y,z[F]=W,F=k;else break e}}function i(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var Y=z[0],F=z.pop();if(F!==Y){z[0]=F;e:for(var k=0,W=z.length,R=W>>>1;k<R;){var J=2*(k+1)-1,ge=z[J],Re=J+1,Oe=z[Re];if(0>l(ge,F))Re<W&&0>l(Oe,ge)?(z[k]=Oe,z[Re]=F,k=Re):(z[k]=ge,z[J]=F,k=J);else if(Re<W&&0>l(Oe,F))z[k]=Oe,z[Re]=F,k=Re;else break e}}return Y}function l(z,Y){var F=z.sortIndex-Y.sortIndex;return F!==0?F:z.id-Y.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();s.unstable_now=function(){return h.now()-d}}var m=[],p=[],x=1,_=null,v=3,S=!1,A=!1,D=!1,y=!1,b=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function H(z){for(var Y=i(p);Y!==null;){if(Y.callback===null)r(p);else if(Y.startTime<=z)r(p),Y.sortIndex=Y.expirationTime,e(m,Y);else break;Y=i(p)}}function q(z){if(D=!1,H(z),!A)if(i(m)!==null)A=!0,O||(O=!0,$());else{var Y=i(p);Y!==null&&de(q,Y.startTime-z)}}var O=!1,I=-1,te=5,U=-1;function C(){return y?!0:!(s.unstable_now()-U<te)}function V(){if(y=!1,O){var z=s.unstable_now();U=z;var Y=!0;try{e:{A=!1,D&&(D=!1,P(I),I=-1),S=!0;var F=v;try{t:{for(H(z),_=i(m);_!==null&&!(_.expirationTime>z&&C());){var k=_.callback;if(typeof k=="function"){_.callback=null,v=_.priorityLevel;var W=k(_.expirationTime<=z);if(z=s.unstable_now(),typeof W=="function"){_.callback=W,H(z),Y=!0;break t}_===i(m)&&r(m),H(z)}else r(m);_=i(m)}if(_!==null)Y=!0;else{var R=i(p);R!==null&&de(q,R.startTime-z),Y=!1}}break e}finally{_=null,v=F,S=!1}Y=void 0}}finally{Y?$():O=!1}}}var $;if(typeof L=="function")$=function(){L(V)};else if(typeof MessageChannel<"u"){var le=new MessageChannel,_e=le.port2;le.port1.onmessage=V,$=function(){_e.postMessage(null)}}else $=function(){b(V,0)};function de(z,Y){I=b(function(){z(s.unstable_now())},Y)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_next=function(z){switch(v){case 1:case 2:case 3:var Y=3;break;default:Y=v}var F=v;v=Y;try{return z()}finally{v=F}},s.unstable_requestPaint=function(){y=!0},s.unstable_runWithPriority=function(z,Y){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var F=v;v=z;try{return Y()}finally{v=F}},s.unstable_scheduleCallback=function(z,Y,F){var k=s.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?k+F:k):F=k,z){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=F+W,z={id:x++,callback:Y,priorityLevel:z,startTime:F,expirationTime:W,sortIndex:-1},F>k?(z.sortIndex=F,e(p,z),i(m)===null&&z===i(p)&&(D?(P(I),I=-1):D=!0,de(q,F-k))):(z.sortIndex=W,e(m,z),A||S||(A=!0,O||(O=!0,$()))),z},s.unstable_shouldYield=C,s.unstable_wrapCallback=function(z){var Y=v;return function(){var F=v;v=Y;try{return z.apply(this,arguments)}finally{v=F}}}})(ah)),ah}var Tx;function Sb(){return Tx||(Tx=1,ih.exports=yb()),ih.exports}var rh={exports:{}},Nn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ax;function Mb(){if(Ax)return Nn;Ax=1;var s=Rd();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)p+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,x){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:x}}var h=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Nn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Nn.createPortal=function(m,p){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,x)},Nn.flushSync=function(m){var p=h.T,x=r.p;try{if(h.T=null,r.p=2,m)return m()}finally{h.T=p,r.p=x,r.d.f()}},Nn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,r.d.C(m,p))},Nn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Nn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var x=p.as,_=d(x,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;x==="style"?r.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:S}):x==="script"&&r.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Nn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var x=d(p.as,p.crossOrigin);r.d.M(m,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&r.d.M(m)},Nn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var x=p.as,_=d(x,p.crossOrigin);r.d.L(m,x,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Nn.preloadModule=function(m,p){if(typeof m=="string")if(p){var x=d(p.as,p.crossOrigin);r.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else r.d.m(m)},Nn.requestFormReset=function(m){r.d.r(m)},Nn.unstable_batchedUpdates=function(m,p){return m(p)},Nn.useFormState=function(m,p,x){return h.H.useFormState(m,p,x)},Nn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Nn.version="19.2.0",Nn}var Rx;function Eb(){if(Rx)return rh.exports;Rx=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),rh.exports=Mb(),rh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cx;function Tb(){if(Cx)return Oo;Cx=1;var s=Sb(),e=Rd(),i=Eb();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(r(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),t;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var g=!1,E=u.child;E;){if(E===a){g=!0,a=u,o=f;break}if(E===o){g=!0,o=u,a=f;break}E=E.sibling}if(!g){for(E=f.child;E;){if(E===a){g=!0,a=f,o=u;break}if(E===o){g=!0,o=f,a=u;break}E=E.sibling}if(!g)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function x(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=x(t),n!==null)return n;t=t.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),L=Symbol.for("react.context"),H=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function $(t){return t===null||typeof t!="object"?null:(t=V&&t[V]||t["@@iterator"],typeof t=="function"?t:null)}var le=Symbol.for("react.client.reference");function _e(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===le?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case D:return"Fragment";case b:return"Profiler";case y:return"StrictMode";case q:return"Suspense";case O:return"SuspenseList";case U:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case A:return"Portal";case L:return t.displayName||"Context";case P:return(t._context.displayName||"Context")+".Consumer";case H:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case I:return n=t.displayName||null,n!==null?n:_e(t.type)||"Memo";case te:n=t._payload,t=t._init;try{return _e(t(n))}catch{}}return null}var de=Array.isArray,z=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F={pending:!1,data:null,method:null,action:null},k=[],W=-1;function R(t){return{current:t}}function J(t){0>W||(t.current=k[W],k[W]=null,W--)}function ge(t,n){W++,k[W]=t.current,t.current=n}var Re=R(null),Oe=R(null),ae=R(null),he=R(null);function Ue(t,n){switch(ge(ae,n),ge(Oe,t),ge(Re,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?k0(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=k0(n),t=X0(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}J(Re),ge(Re,t)}function Ve(){J(Re),J(Oe),J(ae)}function Xe(t){t.memoizedState!==null&&ge(he,t);var n=Re.current,a=X0(n,t.type);n!==a&&(ge(Oe,t),ge(Re,a))}function rt(t){Oe.current===t&&(J(Re),J(Oe)),he.current===t&&(J(he),Do._currentValue=F)}var Ht,ot;function St(t){if(Ht===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Ht=n&&n[1]||"",ot=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ht+t+ot}var G=!1;function lt(t,n){if(!t||G)return"";G=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ye=function(){throw Error()};if(Object.defineProperty(ye.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ye,[])}catch(ue){var re=ue}Reflect.construct(t,[],ye)}else{try{ye.call()}catch(ue){re=ue}t.call(ye.prototype)}}else{try{throw Error()}catch(ue){re=ue}(ye=t())&&typeof ye.catch=="function"&&ye.catch(function(){})}}catch(ue){if(ue&&re&&typeof ue.stack=="string")return[ue.stack,re.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),g=f[0],E=f[1];if(g&&E){var B=g.split(`
`),ne=E.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ne.length&&!ne[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===ne.length)for(o=B.length-1,u=ne.length-1;1<=o&&0<=u&&B[o]!==ne[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==ne[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==ne[u]){var xe=`
`+B[o].replace(" at new "," at ");return t.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",t.displayName)),xe}while(1<=o&&0<=u);break}}}finally{G=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?St(a):""}function st(t,n){switch(t.tag){case 26:case 27:case 5:return St(t.type);case 16:return St("Lazy");case 13:return t.child!==n&&n!==null?St("Suspense Fallback"):St("Suspense");case 19:return St("SuspenseList");case 0:case 15:return lt(t.type,!1);case 11:return lt(t.type.render,!1);case 1:return lt(t.type,!0);case 31:return St("Activity");default:return""}}function Ct(t){try{var n="",a=null;do n+=st(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var He=Object.prototype.hasOwnProperty,Pt=s.unstable_scheduleCallback,Ze=s.unstable_cancelCallback,nt=s.unstable_shouldYield,N=s.unstable_requestPaint,M=s.unstable_now,Q=s.unstable_getCurrentPriorityLevel,me=s.unstable_ImmediatePriority,Me=s.unstable_UserBlockingPriority,fe=s.unstable_NormalPriority,je=s.unstable_LowPriority,we=s.unstable_IdlePriority,Ke=s.log,qe=s.unstable_setDisableYieldValue,Te=null,Ae=null;function We(t){if(typeof Ke=="function"&&qe(t),Ae&&typeof Ae.setStrictMode=="function")try{Ae.setStrictMode(Te,t)}catch{}}var Ie=Math.clz32?Math.clz32:w,ze=Math.log,it=Math.LN2;function w(t){return t>>>=0,t===0?32:31-(ze(t)/it|0)|0}var ce=256,Ee=262144,Se=4194304;function be(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function pe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,g=t.pingedLanes;t=t.warmLanes;var E=o&134217727;return E!==0?(o=E&~f,o!==0?u=be(o):(g&=E,g!==0?u=be(g):a||(a=E&~t,a!==0&&(u=be(a))))):(E=o&~f,E!==0?u=be(E):g!==0?u=be(g):a||(a=o&~t,a!==0&&(u=be(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function De(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Fe(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _t(){var t=Se;return Se<<=1,(Se&62914560)===0&&(Se=4194304),t}function gt(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function $t(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Ln(t,n,a,o,u,f){var g=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,B=t.expirationTimes,ne=t.hiddenUpdates;for(a=g&~a;0<a;){var xe=31-Ie(a),ye=1<<xe;E[xe]=0,B[xe]=-1;var re=ne[xe];if(re!==null)for(ne[xe]=null,xe=0;xe<re.length;xe++){var ue=re[xe];ue!==null&&(ue.lane&=-536870913)}a&=~ye}o!==0&&Bs(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(g&~n))}function Bs(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Ie(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Hs(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-Ie(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function Gs(t,n){var a=n&-n;return a=(a&42)!==0?1:bi(a),(a&(t.suspendedLanes|n))!==0?0:a}function bi(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ar(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Vs(){var t=Y.p;return t!==0?t:(t=window.event,t===void 0?32:dx(t.type))}function ks(t,n){var a=Y.p;try{return Y.p=t,n()}finally{Y.p=a}}var Zn=Math.random().toString(36).slice(2),ln="__reactFiber$"+Zn,mn="__reactProps$"+Zn,Bi="__reactContainer$"+Zn,Ir="__reactEvents$"+Zn,Yu="__reactListeners$"+Zn,ju="__reactHandles$"+Zn,Jo="__reactResources$"+Zn,rr="__reactMarker$"+Zn;function Xs(t){delete t[ln],delete t[mn],delete t[Ir],delete t[Yu],delete t[ju]}function ba(t){var n=t[ln];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Bi]||a[ln]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Q0(t);t!==null;){if(a=t[ln])return a;t=Q0(t)}return n}t=a,a=t.parentNode}return null}function T(t){if(t=t[ln]||t[Bi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function j(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function se(t){var n=t[Jo];return n||(n=t[Jo]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function ie(t){t[rr]=!0}var K=new Set,Ce={};function Le(t,n){Be(t,n),Be(t+"Capture",n)}function Be(t,n){for(Ce[t]=n,t=0;t<n.length;t++)K.add(n[t])}var Ge=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),et={},at={};function Qe(t){return He.call(at,t)?!0:He.call(et,t)?!1:Ge.test(t)?at[t]=!0:(et[t]=!0,!1)}function dt(t,n,a){if(Qe(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Dt(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function wt(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function Tt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function zt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function $e(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(g){a=""+g,f.call(this,g)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Wt(t){if(!t._valueTracker){var n=zt(t)?"checked":"value";t._valueTracker=$e(t,n,""+t[n])}}function At(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=zt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function Sn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var ya=/[\n"\\]/g;function jt(t){return t.replace(ya,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Hi(t,n,a,o,u,f,g,E){t.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.type=g:t.removeAttribute("type"),n!=null?g==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+Tt(n)):t.value!==""+Tt(n)&&(t.value=""+Tt(n)):g!=="submit"&&g!=="reset"||t.removeAttribute("value"),n!=null?Mn(t,g,Tt(n)):a!=null?Mn(t,g,Tt(a)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+Tt(E):t.removeAttribute("name")}function Zt(t,n,a,o,u,f,g,E){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Wt(t);return}a=a!=null?""+Tt(a):"",n=n!=null?""+Tt(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=E?t.checked:!!o,t.defaultChecked=!!o,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.name=g),Wt(t)}function Mn(t,n,a){n==="number"&&Sn(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function xn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+Tt(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function En(t,n,a){if(n!=null&&(n=""+Tt(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+Tt(a):""}function Rn(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(de(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Tt(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Wt(t)}function wi(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Gi=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Hd(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Gi.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Gd(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Hd(t,u,o)}else for(var f in n)n.hasOwnProperty(f)&&Hd(t,f,n[f])}function Zu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var p_=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),m_=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function $o(t){return m_.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Vi(){}var Ku=null;function Qu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Fr=null,Br=null;function Vd(t){var n=T(t);if(n&&(t=n.stateNode)){var a=t[mn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Hi(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+jt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[mn]||null;if(!u)throw Error(r(90));Hi(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&At(o)}break e;case"textarea":En(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&xn(t,!!a.multiple,n,!1)}}}var Ju=!1;function kd(t,n,a){if(Ju)return t(n,a);Ju=!0;try{var o=t(n);return o}finally{if(Ju=!1,(Fr!==null||Br!==null)&&(Hl(),Fr&&(n=Fr,t=Br,Br=Fr=null,Vd(n),t)))for(n=0;n<t.length;n++)Vd(t[n])}}function qs(t,n){var a=t.stateNode;if(a===null)return null;var o=a[mn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$u=!1;if(ki)try{var Ws={};Object.defineProperty(Ws,"passive",{get:function(){$u=!0}}),window.addEventListener("test",Ws,Ws),window.removeEventListener("test",Ws,Ws)}catch{$u=!1}var Sa=null,ec=null,el=null;function Xd(){if(el)return el;var t,n=ec,a=n.length,o,u="value"in Sa?Sa.value:Sa.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var g=a-t;for(o=1;o<=g&&n[a-o]===u[f-o];o++);return el=u.slice(t,1<o?1-o:void 0)}function tl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function nl(){return!0}function qd(){return!1}function Bn(t){function n(a,o,u,f,g){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(f):f[E]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?nl:qd,this.isPropagationStopped=qd,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=nl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=nl)},persist:function(){},isPersistent:nl}),n}var sr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},il=Bn(sr),Ys=_({},sr,{view:0,detail:0}),x_=Bn(Ys),tc,nc,js,al=_({},Ys,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ac,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==js&&(js&&t.type==="mousemove"?(tc=t.screenX-js.screenX,nc=t.screenY-js.screenY):nc=tc=0,js=t),tc)},movementY:function(t){return"movementY"in t?t.movementY:nc}}),Wd=Bn(al),g_=_({},al,{dataTransfer:0}),__=Bn(g_),v_=_({},Ys,{relatedTarget:0}),ic=Bn(v_),b_=_({},sr,{animationName:0,elapsedTime:0,pseudoElement:0}),y_=Bn(b_),S_=_({},sr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),M_=Bn(S_),E_=_({},sr,{data:0}),Yd=Bn(E_),T_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},A_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},R_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function C_(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=R_[t])?!!n[t]:!1}function ac(){return C_}var D_=_({},Ys,{key:function(t){if(t.key){var n=T_[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=tl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?A_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ac,charCode:function(t){return t.type==="keypress"?tl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?tl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),w_=Bn(D_),U_=_({},al,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),jd=Bn(U_),L_=_({},Ys,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ac}),N_=Bn(L_),O_=_({},sr,{propertyName:0,elapsedTime:0,pseudoElement:0}),P_=Bn(O_),z_=_({},al,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),I_=Bn(z_),F_=_({},sr,{newState:0,oldState:0}),B_=Bn(F_),H_=[9,13,27,32],rc=ki&&"CompositionEvent"in window,Zs=null;ki&&"documentMode"in document&&(Zs=document.documentMode);var G_=ki&&"TextEvent"in window&&!Zs,Zd=ki&&(!rc||Zs&&8<Zs&&11>=Zs),Kd=" ",Qd=!1;function Jd(t,n){switch(t){case"keyup":return H_.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $d(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Hr=!1;function V_(t,n){switch(t){case"compositionend":return $d(n);case"keypress":return n.which!==32?null:(Qd=!0,Kd);case"textInput":return t=n.data,t===Kd&&Qd?null:t;default:return null}}function k_(t,n){if(Hr)return t==="compositionend"||!rc&&Jd(t,n)?(t=Xd(),el=ec=Sa=null,Hr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Zd&&n.locale!=="ko"?null:n.data;default:return null}}var X_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ep(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!X_[t.type]:n==="textarea"}function tp(t,n,a,o){Fr?Br?Br.push(o):Br=[o]:Fr=o,n=Yl(n,"onChange"),0<n.length&&(a=new il("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Ks=null,Qs=null;function q_(t){I0(t,0)}function rl(t){var n=j(t);if(At(n))return t}function np(t,n){if(t==="change")return n}var ip=!1;if(ki){var sc;if(ki){var oc="oninput"in document;if(!oc){var ap=document.createElement("div");ap.setAttribute("oninput","return;"),oc=typeof ap.oninput=="function"}sc=oc}else sc=!1;ip=sc&&(!document.documentMode||9<document.documentMode)}function rp(){Ks&&(Ks.detachEvent("onpropertychange",sp),Qs=Ks=null)}function sp(t){if(t.propertyName==="value"&&rl(Qs)){var n=[];tp(n,Qs,t,Qu(t)),kd(q_,n)}}function W_(t,n,a){t==="focusin"?(rp(),Ks=n,Qs=a,Ks.attachEvent("onpropertychange",sp)):t==="focusout"&&rp()}function Y_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return rl(Qs)}function j_(t,n){if(t==="click")return rl(n)}function Z_(t,n){if(t==="input"||t==="change")return rl(n)}function K_(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Kn=typeof Object.is=="function"?Object.is:K_;function Js(t,n){if(Kn(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!He.call(n,u)||!Kn(t[u],n[u]))return!1}return!0}function op(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function lp(t,n){var a=op(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=op(a)}}function up(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?up(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function cp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Sn(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Sn(t.document)}return n}function lc(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Q_=ki&&"documentMode"in document&&11>=document.documentMode,Gr=null,uc=null,$s=null,cc=!1;function fp(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;cc||Gr==null||Gr!==Sn(o)||(o=Gr,"selectionStart"in o&&lc(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),$s&&Js($s,o)||($s=o,o=Yl(uc,"onSelect"),0<o.length&&(n=new il("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Gr)))}function or(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Vr={animationend:or("Animation","AnimationEnd"),animationiteration:or("Animation","AnimationIteration"),animationstart:or("Animation","AnimationStart"),transitionrun:or("Transition","TransitionRun"),transitionstart:or("Transition","TransitionStart"),transitioncancel:or("Transition","TransitionCancel"),transitionend:or("Transition","TransitionEnd")},fc={},hp={};ki&&(hp=document.createElement("div").style,"AnimationEvent"in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),"TransitionEvent"in window||delete Vr.transitionend.transition);function lr(t){if(fc[t])return fc[t];if(!Vr[t])return t;var n=Vr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in hp)return fc[t]=n[a];return t}var dp=lr("animationend"),pp=lr("animationiteration"),mp=lr("animationstart"),J_=lr("transitionrun"),$_=lr("transitionstart"),ev=lr("transitioncancel"),xp=lr("transitionend"),gp=new Map,hc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");hc.push("scrollEnd");function yi(t,n){gp.set(t,n),Le(n,[t])}var sl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},oi=[],kr=0,dc=0;function ol(){for(var t=kr,n=dc=kr=0;n<t;){var a=oi[n];oi[n++]=null;var o=oi[n];oi[n++]=null;var u=oi[n];oi[n++]=null;var f=oi[n];if(oi[n++]=null,o!==null&&u!==null){var g=o.pending;g===null?u.next=u:(u.next=g.next,g.next=u),o.pending=u}f!==0&&_p(a,u,f)}}function ll(t,n,a,o){oi[kr++]=t,oi[kr++]=n,oi[kr++]=a,oi[kr++]=o,dc|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function pc(t,n,a,o){return ll(t,n,a,o),ul(t)}function ur(t,n){return ll(t,null,null,n),ul(t)}function _p(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-Ie(a),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function ul(t){if(50<So)throw So=0,Ef=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Xr={};function tv(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qn(t,n,a,o){return new tv(t,n,a,o)}function mc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Xi(t,n){var a=t.alternate;return a===null?(a=Qn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function vp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function cl(t,n,a,o,u,f){var g=0;if(o=t,typeof t=="function")mc(t)&&(g=1);else if(typeof t=="string")g=sb(t,a,Re.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case U:return t=Qn(31,a,n,u),t.elementType=U,t.lanes=f,t;case D:return cr(a.children,u,f,n);case y:g=8,u|=24;break;case b:return t=Qn(12,a,n,u|2),t.elementType=b,t.lanes=f,t;case q:return t=Qn(13,a,n,u),t.elementType=q,t.lanes=f,t;case O:return t=Qn(19,a,n,u),t.elementType=O,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case L:g=10;break e;case P:g=9;break e;case H:g=11;break e;case I:g=14;break e;case te:g=16,o=null;break e}g=29,a=Error(r(130,t===null?"null":typeof t,"")),o=null}return n=Qn(g,a,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function cr(t,n,a,o){return t=Qn(7,t,o,n),t.lanes=a,t}function xc(t,n,a){return t=Qn(6,t,null,n),t.lanes=a,t}function bp(t){var n=Qn(18,null,null,0);return n.stateNode=t,n}function gc(t,n,a){return n=Qn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var yp=new WeakMap;function li(t,n){if(typeof t=="object"&&t!==null){var a=yp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Ct(n)},yp.set(t,n),n)}return{value:t,source:n,stack:Ct(n)}}var qr=[],Wr=0,fl=null,eo=0,ui=[],ci=0,Ma=null,Ui=1,Li="";function qi(t,n){qr[Wr++]=eo,qr[Wr++]=fl,fl=t,eo=n}function Sp(t,n,a){ui[ci++]=Ui,ui[ci++]=Li,ui[ci++]=Ma,Ma=t;var o=Ui;t=Li;var u=32-Ie(o)-1;o&=~(1<<u),a+=1;var f=32-Ie(n)+u;if(30<f){var g=u-u%5;f=(o&(1<<g)-1).toString(32),o>>=g,u-=g,Ui=1<<32-Ie(n)+u|a<<u|o,Li=f+t}else Ui=1<<f|a<<u|o,Li=t}function _c(t){t.return!==null&&(qi(t,1),Sp(t,1,0))}function vc(t){for(;t===fl;)fl=qr[--Wr],qr[Wr]=null,eo=qr[--Wr],qr[Wr]=null;for(;t===Ma;)Ma=ui[--ci],ui[ci]=null,Li=ui[--ci],ui[ci]=null,Ui=ui[--ci],ui[ci]=null}function Mp(t,n){ui[ci++]=Ui,ui[ci++]=Li,ui[ci++]=Ma,Ui=n.id,Li=n.overflow,Ma=t}var Cn=null,Qt=null,Rt=!1,Ea=null,fi=!1,bc=Error(r(519));function Ta(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw to(li(n,t)),bc}function Ep(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[ln]=t,n[mn]=o,a){case"dialog":bt("cancel",n),bt("close",n);break;case"iframe":case"object":case"embed":bt("load",n);break;case"video":case"audio":for(a=0;a<Eo.length;a++)bt(Eo[a],n);break;case"source":bt("error",n);break;case"img":case"image":case"link":bt("error",n),bt("load",n);break;case"details":bt("toggle",n);break;case"input":bt("invalid",n),Zt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":bt("invalid",n);break;case"textarea":bt("invalid",n),Rn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||G0(n.textContent,a)?(o.popover!=null&&(bt("beforetoggle",n),bt("toggle",n)),o.onScroll!=null&&bt("scroll",n),o.onScrollEnd!=null&&bt("scrollend",n),o.onClick!=null&&(n.onclick=Vi),n=!0):n=!1,n||Ta(t,!0)}function Tp(t){for(Cn=t.return;Cn;)switch(Cn.tag){case 5:case 31:case 13:fi=!1;return;case 27:case 3:fi=!0;return;default:Cn=Cn.return}}function Yr(t){if(t!==Cn)return!1;if(!Rt)return Tp(t),Rt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Bf(t.type,t.memoizedProps)),a=!a),a&&Qt&&Ta(t),Tp(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Qt=K0(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Qt=K0(t)}else n===27?(n=Qt,Ba(t.type)?(t=Xf,Xf=null,Qt=t):Qt=n):Qt=Cn?di(t.stateNode.nextSibling):null;return!0}function fr(){Qt=Cn=null,Rt=!1}function yc(){var t=Ea;return t!==null&&(kn===null?kn=t:kn.push.apply(kn,t),Ea=null),t}function to(t){Ea===null?Ea=[t]:Ea.push(t)}var Sc=R(null),hr=null,Wi=null;function Aa(t,n,a){ge(Sc,n._currentValue),n._currentValue=a}function Yi(t){t._currentValue=Sc.current,J(Sc)}function Mc(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Ec(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var g=u.child;f=f.firstContext;e:for(;f!==null;){var E=f;f=u;for(var B=0;B<n.length;B++)if(E.context===n[B]){f.lanes|=a,E=f.alternate,E!==null&&(E.lanes|=a),Mc(f.return,a,t),o||(g=null);break e}f=E.next}}else if(u.tag===18){if(g=u.return,g===null)throw Error(r(341));g.lanes|=a,f=g.alternate,f!==null&&(f.lanes|=a),Mc(g,a,t),g=null}else g=u.child;if(g!==null)g.return=u;else for(g=u;g!==null;){if(g===t){g=null;break}if(u=g.sibling,u!==null){u.return=g.return,g=u;break}g=g.return}u=g}}function jr(t,n,a,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var g=u.alternate;if(g===null)throw Error(r(387));if(g=g.memoizedProps,g!==null){var E=u.type;Kn(u.pendingProps.value,g.value)||(t!==null?t.push(E):t=[E])}}else if(u===he.current){if(g=u.alternate,g===null)throw Error(r(387));g.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Do):t=[Do])}u=u.return}t!==null&&Ec(n,t,a,o),n.flags|=262144}function hl(t){for(t=t.firstContext;t!==null;){if(!Kn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function dr(t){hr=t,Wi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Dn(t){return Ap(hr,t)}function dl(t,n){return hr===null&&dr(t),Ap(t,n)}function Ap(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Wi===null){if(t===null)throw Error(r(308));Wi=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Wi=Wi.next=n;return a}var nv=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},iv=s.unstable_scheduleCallback,av=s.unstable_NormalPriority,un={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Tc(){return{controller:new nv,data:new Map,refCount:0}}function no(t){t.refCount--,t.refCount===0&&iv(av,function(){t.controller.abort()})}var io=null,Ac=0,Zr=0,Kr=null;function rv(t,n){if(io===null){var a=io=[];Ac=0,Zr=wf(),Kr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Ac++,n.then(Rp,Rp),n}function Rp(){if(--Ac===0&&io!==null){Kr!==null&&(Kr.status="fulfilled");var t=io;io=null,Zr=0,Kr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function sv(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Cp=z.S;z.S=function(t,n){f0=M(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&rv(t,n),Cp!==null&&Cp(t,n)};var pr=R(null);function Rc(){var t=pr.current;return t!==null?t:Yt.pooledCache}function pl(t,n){n===null?ge(pr,pr.current):ge(pr,n.pool)}function Dp(){var t=Rc();return t===null?null:{parent:un._currentValue,pool:t}}var Qr=Error(r(460)),Cc=Error(r(474)),ml=Error(r(542)),xl={then:function(){}};function wp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Up(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Vi,Vi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Np(t),t;default:if(typeof n.status=="string")n.then(Vi,Vi);else{if(t=Yt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Np(t),t}throw xr=n,Qr}}function mr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(xr=a,Qr):a}}var xr=null;function Lp(){if(xr===null)throw Error(r(459));var t=xr;return xr=null,t}function Np(t){if(t===Qr||t===ml)throw Error(r(483))}var Jr=null,ao=0;function gl(t){var n=ao;return ao+=1,Jr===null&&(Jr=[]),Up(Jr,t,n)}function ro(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function _l(t,n){throw n.$$typeof===v?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Op(t){function n(Z,X){if(t){var ee=Z.deletions;ee===null?(Z.deletions=[X],Z.flags|=16):ee.push(X)}}function a(Z,X){if(!t)return null;for(;X!==null;)n(Z,X),X=X.sibling;return null}function o(Z){for(var X=new Map;Z!==null;)Z.key!==null?X.set(Z.key,Z):X.set(Z.index,Z),Z=Z.sibling;return X}function u(Z,X){return Z=Xi(Z,X),Z.index=0,Z.sibling=null,Z}function f(Z,X,ee){return Z.index=ee,t?(ee=Z.alternate,ee!==null?(ee=ee.index,ee<X?(Z.flags|=67108866,X):ee):(Z.flags|=67108866,X)):(Z.flags|=1048576,X)}function g(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function E(Z,X,ee,ve){return X===null||X.tag!==6?(X=xc(ee,Z.mode,ve),X.return=Z,X):(X=u(X,ee),X.return=Z,X)}function B(Z,X,ee,ve){var Je=ee.type;return Je===D?xe(Z,X,ee.props.children,ve,ee.key):X!==null&&(X.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===te&&mr(Je)===X.type)?(X=u(X,ee.props),ro(X,ee),X.return=Z,X):(X=cl(ee.type,ee.key,ee.props,null,Z.mode,ve),ro(X,ee),X.return=Z,X)}function ne(Z,X,ee,ve){return X===null||X.tag!==4||X.stateNode.containerInfo!==ee.containerInfo||X.stateNode.implementation!==ee.implementation?(X=gc(ee,Z.mode,ve),X.return=Z,X):(X=u(X,ee.children||[]),X.return=Z,X)}function xe(Z,X,ee,ve,Je){return X===null||X.tag!==7?(X=cr(ee,Z.mode,ve,Je),X.return=Z,X):(X=u(X,ee),X.return=Z,X)}function ye(Z,X,ee){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=xc(""+X,Z.mode,ee),X.return=Z,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case S:return ee=cl(X.type,X.key,X.props,null,Z.mode,ee),ro(ee,X),ee.return=Z,ee;case A:return X=gc(X,Z.mode,ee),X.return=Z,X;case te:return X=mr(X),ye(Z,X,ee)}if(de(X)||$(X))return X=cr(X,Z.mode,ee,null),X.return=Z,X;if(typeof X.then=="function")return ye(Z,gl(X),ee);if(X.$$typeof===L)return ye(Z,dl(Z,X),ee);_l(Z,X)}return null}function re(Z,X,ee,ve){var Je=X!==null?X.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint")return Je!==null?null:E(Z,X,""+ee,ve);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case S:return ee.key===Je?B(Z,X,ee,ve):null;case A:return ee.key===Je?ne(Z,X,ee,ve):null;case te:return ee=mr(ee),re(Z,X,ee,ve)}if(de(ee)||$(ee))return Je!==null?null:xe(Z,X,ee,ve,null);if(typeof ee.then=="function")return re(Z,X,gl(ee),ve);if(ee.$$typeof===L)return re(Z,X,dl(Z,ee),ve);_l(Z,ee)}return null}function ue(Z,X,ee,ve,Je){if(typeof ve=="string"&&ve!==""||typeof ve=="number"||typeof ve=="bigint")return Z=Z.get(ee)||null,E(X,Z,""+ve,Je);if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case S:return Z=Z.get(ve.key===null?ee:ve.key)||null,B(X,Z,ve,Je);case A:return Z=Z.get(ve.key===null?ee:ve.key)||null,ne(X,Z,ve,Je);case te:return ve=mr(ve),ue(Z,X,ee,ve,Je)}if(de(ve)||$(ve))return Z=Z.get(ee)||null,xe(X,Z,ve,Je,null);if(typeof ve.then=="function")return ue(Z,X,ee,gl(ve),Je);if(ve.$$typeof===L)return ue(Z,X,ee,dl(X,ve),Je);_l(X,ve)}return null}function ke(Z,X,ee,ve){for(var Je=null,Ut=null,Ye=X,pt=X=0,Et=null;Ye!==null&&pt<ee.length;pt++){Ye.index>pt?(Et=Ye,Ye=null):Et=Ye.sibling;var Lt=re(Z,Ye,ee[pt],ve);if(Lt===null){Ye===null&&(Ye=Et);break}t&&Ye&&Lt.alternate===null&&n(Z,Ye),X=f(Lt,X,pt),Ut===null?Je=Lt:Ut.sibling=Lt,Ut=Lt,Ye=Et}if(pt===ee.length)return a(Z,Ye),Rt&&qi(Z,pt),Je;if(Ye===null){for(;pt<ee.length;pt++)Ye=ye(Z,ee[pt],ve),Ye!==null&&(X=f(Ye,X,pt),Ut===null?Je=Ye:Ut.sibling=Ye,Ut=Ye);return Rt&&qi(Z,pt),Je}for(Ye=o(Ye);pt<ee.length;pt++)Et=ue(Ye,Z,pt,ee[pt],ve),Et!==null&&(t&&Et.alternate!==null&&Ye.delete(Et.key===null?pt:Et.key),X=f(Et,X,pt),Ut===null?Je=Et:Ut.sibling=Et,Ut=Et);return t&&Ye.forEach(function(Xa){return n(Z,Xa)}),Rt&&qi(Z,pt),Je}function tt(Z,X,ee,ve){if(ee==null)throw Error(r(151));for(var Je=null,Ut=null,Ye=X,pt=X=0,Et=null,Lt=ee.next();Ye!==null&&!Lt.done;pt++,Lt=ee.next()){Ye.index>pt?(Et=Ye,Ye=null):Et=Ye.sibling;var Xa=re(Z,Ye,Lt.value,ve);if(Xa===null){Ye===null&&(Ye=Et);break}t&&Ye&&Xa.alternate===null&&n(Z,Ye),X=f(Xa,X,pt),Ut===null?Je=Xa:Ut.sibling=Xa,Ut=Xa,Ye=Et}if(Lt.done)return a(Z,Ye),Rt&&qi(Z,pt),Je;if(Ye===null){for(;!Lt.done;pt++,Lt=ee.next())Lt=ye(Z,Lt.value,ve),Lt!==null&&(X=f(Lt,X,pt),Ut===null?Je=Lt:Ut.sibling=Lt,Ut=Lt);return Rt&&qi(Z,pt),Je}for(Ye=o(Ye);!Lt.done;pt++,Lt=ee.next())Lt=ue(Ye,Z,pt,Lt.value,ve),Lt!==null&&(t&&Lt.alternate!==null&&Ye.delete(Lt.key===null?pt:Lt.key),X=f(Lt,X,pt),Ut===null?Je=Lt:Ut.sibling=Lt,Ut=Lt);return t&&Ye.forEach(function(gb){return n(Z,gb)}),Rt&&qi(Z,pt),Je}function kt(Z,X,ee,ve){if(typeof ee=="object"&&ee!==null&&ee.type===D&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case S:e:{for(var Je=ee.key;X!==null;){if(X.key===Je){if(Je=ee.type,Je===D){if(X.tag===7){a(Z,X.sibling),ve=u(X,ee.props.children),ve.return=Z,Z=ve;break e}}else if(X.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===te&&mr(Je)===X.type){a(Z,X.sibling),ve=u(X,ee.props),ro(ve,ee),ve.return=Z,Z=ve;break e}a(Z,X);break}else n(Z,X);X=X.sibling}ee.type===D?(ve=cr(ee.props.children,Z.mode,ve,ee.key),ve.return=Z,Z=ve):(ve=cl(ee.type,ee.key,ee.props,null,Z.mode,ve),ro(ve,ee),ve.return=Z,Z=ve)}return g(Z);case A:e:{for(Je=ee.key;X!==null;){if(X.key===Je)if(X.tag===4&&X.stateNode.containerInfo===ee.containerInfo&&X.stateNode.implementation===ee.implementation){a(Z,X.sibling),ve=u(X,ee.children||[]),ve.return=Z,Z=ve;break e}else{a(Z,X);break}else n(Z,X);X=X.sibling}ve=gc(ee,Z.mode,ve),ve.return=Z,Z=ve}return g(Z);case te:return ee=mr(ee),kt(Z,X,ee,ve)}if(de(ee))return ke(Z,X,ee,ve);if($(ee)){if(Je=$(ee),typeof Je!="function")throw Error(r(150));return ee=Je.call(ee),tt(Z,X,ee,ve)}if(typeof ee.then=="function")return kt(Z,X,gl(ee),ve);if(ee.$$typeof===L)return kt(Z,X,dl(Z,ee),ve);_l(Z,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint"?(ee=""+ee,X!==null&&X.tag===6?(a(Z,X.sibling),ve=u(X,ee),ve.return=Z,Z=ve):(a(Z,X),ve=xc(ee,Z.mode,ve),ve.return=Z,Z=ve),g(Z)):a(Z,X)}return function(Z,X,ee,ve){try{ao=0;var Je=kt(Z,X,ee,ve);return Jr=null,Je}catch(Ye){if(Ye===Qr||Ye===ml)throw Ye;var Ut=Qn(29,Ye,null,Z.mode);return Ut.lanes=ve,Ut.return=Z,Ut}finally{}}}var gr=Op(!0),Pp=Op(!1),Ra=!1;function Dc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wc(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ca(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Da(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Ot&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=ul(t),_p(t,null,a),n}return ll(t,o,n,a),ul(t)}function so(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Hs(t,a)}}function Uc(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Lc=!1;function oo(){if(Lc){var t=Kr;if(t!==null)throw t}}function lo(t,n,a,o){Lc=!1;var u=t.updateQueue;Ra=!1;var f=u.firstBaseUpdate,g=u.lastBaseUpdate,E=u.shared.pending;if(E!==null){u.shared.pending=null;var B=E,ne=B.next;B.next=null,g===null?f=ne:g.next=ne,g=B;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,E=xe.lastBaseUpdate,E!==g&&(E===null?xe.firstBaseUpdate=ne:E.next=ne,xe.lastBaseUpdate=B))}if(f!==null){var ye=u.baseState;g=0,xe=ne=B=null,E=f;do{var re=E.lane&-536870913,ue=re!==E.lane;if(ue?(Mt&re)===re:(o&re)===re){re!==0&&re===Zr&&(Lc=!0),xe!==null&&(xe=xe.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});e:{var ke=t,tt=E;re=n;var kt=a;switch(tt.tag){case 1:if(ke=tt.payload,typeof ke=="function"){ye=ke.call(kt,ye,re);break e}ye=ke;break e;case 3:ke.flags=ke.flags&-65537|128;case 0:if(ke=tt.payload,re=typeof ke=="function"?ke.call(kt,ye,re):ke,re==null)break e;ye=_({},ye,re);break e;case 2:Ra=!0}}re=E.callback,re!==null&&(t.flags|=64,ue&&(t.flags|=8192),ue=u.callbacks,ue===null?u.callbacks=[re]:ue.push(re))}else ue={lane:re,tag:E.tag,payload:E.payload,callback:E.callback,next:null},xe===null?(ne=xe=ue,B=ye):xe=xe.next=ue,g|=re;if(E=E.next,E===null){if(E=u.shared.pending,E===null)break;ue=E,E=ue.next,ue.next=null,u.lastBaseUpdate=ue,u.shared.pending=null}}while(!0);xe===null&&(B=ye),u.baseState=B,u.firstBaseUpdate=ne,u.lastBaseUpdate=xe,f===null&&(u.shared.lanes=0),Oa|=g,t.lanes=g,t.memoizedState=ye}}function zp(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function Ip(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)zp(a[t],n)}var $r=R(null),vl=R(0);function Fp(t,n){t=na,ge(vl,t),ge($r,n),na=t|n.baseLanes}function Nc(){ge(vl,na),ge($r,$r.current)}function Oc(){na=vl.current,J($r),J(vl)}var Jn=R(null),hi=null;function wa(t){var n=t.alternate;ge(an,an.current&1),ge(Jn,t),hi===null&&(n===null||$r.current!==null||n.memoizedState!==null)&&(hi=t)}function Pc(t){ge(an,an.current),ge(Jn,t),hi===null&&(hi=t)}function Bp(t){t.tag===22?(ge(an,an.current),ge(Jn,t),hi===null&&(hi=t)):Ua()}function Ua(){ge(an,an.current),ge(Jn,Jn.current)}function $n(t){J(Jn),hi===t&&(hi=null),J(an)}var an=R(0);function bl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Vf(a)||kf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ji=0,ht=null,Gt=null,cn=null,yl=!1,es=!1,_r=!1,Sl=0,uo=0,ts=null,ov=0;function tn(){throw Error(r(321))}function zc(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Kn(t[a],n[a]))return!1;return!0}function Ic(t,n,a,o,u,f){return ji=f,ht=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=t===null||t.memoizedState===null?Sm:Jc,_r=!1,f=a(o,u),_r=!1,es&&(f=Gp(n,a,o,u)),Hp(t),f}function Hp(t){z.H=ho;var n=Gt!==null&&Gt.next!==null;if(ji=0,cn=Gt=ht=null,yl=!1,uo=0,ts=null,n)throw Error(r(300));t===null||fn||(t=t.dependencies,t!==null&&hl(t)&&(fn=!0))}function Gp(t,n,a,o){ht=t;var u=0;do{if(es&&(ts=null),uo=0,es=!1,25<=u)throw Error(r(301));if(u+=1,cn=Gt=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}z.H=Mm,f=n(a,o)}while(es);return f}function lv(){var t=z.H,n=t.useState()[0];return n=typeof n.then=="function"?co(n):n,t=t.useState()[0],(Gt!==null?Gt.memoizedState:null)!==t&&(ht.flags|=1024),n}function Fc(){var t=Sl!==0;return Sl=0,t}function Bc(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Hc(t){if(yl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}yl=!1}ji=0,cn=Gt=ht=null,es=!1,uo=Sl=0,ts=null}function zn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?ht.memoizedState=cn=t:cn=cn.next=t,cn}function rn(){if(Gt===null){var t=ht.alternate;t=t!==null?t.memoizedState:null}else t=Gt.next;var n=cn===null?ht.memoizedState:cn.next;if(n!==null)cn=n,Gt=t;else{if(t===null)throw ht.alternate===null?Error(r(467)):Error(r(310));Gt=t,t={memoizedState:Gt.memoizedState,baseState:Gt.baseState,baseQueue:Gt.baseQueue,queue:Gt.queue,next:null},cn===null?ht.memoizedState=cn=t:cn=cn.next=t}return cn}function Ml(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function co(t){var n=uo;return uo+=1,ts===null&&(ts=[]),t=Up(ts,t,n),n=ht,(cn===null?n.memoizedState:cn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?Sm:Jc),t}function El(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return co(t);if(t.$$typeof===L)return Dn(t)}throw Error(r(438,String(t)))}function Gc(t){var n=null,a=ht.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ht.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ml(),ht.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=C;return n.index++,a}function Zi(t,n){return typeof n=="function"?n(t):n}function Tl(t){var n=rn();return Vc(n,Gt,t)}function Vc(t,n,a){var o=t.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var g=u.next;u.next=f.next,f.next=g}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var E=g=null,B=null,ne=n,xe=!1;do{var ye=ne.lane&-536870913;if(ye!==ne.lane?(Mt&ye)===ye:(ji&ye)===ye){var re=ne.revertLane;if(re===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:ne.action,hasEagerState:ne.hasEagerState,eagerState:ne.eagerState,next:null}),ye===Zr&&(xe=!0);else if((ji&re)===re){ne=ne.next,re===Zr&&(xe=!0);continue}else ye={lane:0,revertLane:ne.revertLane,gesture:null,action:ne.action,hasEagerState:ne.hasEagerState,eagerState:ne.eagerState,next:null},B===null?(E=B=ye,g=f):B=B.next=ye,ht.lanes|=re,Oa|=re;ye=ne.action,_r&&a(f,ye),f=ne.hasEagerState?ne.eagerState:a(f,ye)}else re={lane:ye,revertLane:ne.revertLane,gesture:ne.gesture,action:ne.action,hasEagerState:ne.hasEagerState,eagerState:ne.eagerState,next:null},B===null?(E=B=re,g=f):B=B.next=re,ht.lanes|=ye,Oa|=ye;ne=ne.next}while(ne!==null&&ne!==n);if(B===null?g=f:B.next=E,!Kn(f,t.memoizedState)&&(fn=!0,xe&&(a=Kr,a!==null)))throw a;t.memoizedState=f,t.baseState=g,t.baseQueue=B,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function kc(t){var n=rn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var g=u=u.next;do f=t(f,g.action),g=g.next;while(g!==u);Kn(f,n.memoizedState)||(fn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function Vp(t,n,a){var o=ht,u=rn(),f=Rt;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var g=!Kn((Gt||u).memoizedState,a);if(g&&(u.memoizedState=a,fn=!0),u=u.queue,Wc(qp.bind(null,o,u,t),[t]),u.getSnapshot!==n||g||cn!==null&&cn.memoizedState.tag&1){if(o.flags|=2048,ns(9,{destroy:void 0},Xp.bind(null,o,u,a,n),null),Yt===null)throw Error(r(349));f||(ji&127)!==0||kp(o,n,a)}return a}function kp(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=ht.updateQueue,n===null?(n=Ml(),ht.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Xp(t,n,a,o){n.value=a,n.getSnapshot=o,Wp(n)&&Yp(t)}function qp(t,n,a){return a(function(){Wp(n)&&Yp(t)})}function Wp(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Kn(t,a)}catch{return!0}}function Yp(t){var n=ur(t,2);n!==null&&Xn(n,t,2)}function Xc(t){var n=zn();if(typeof t=="function"){var a=t;if(t=a(),_r){We(!0);try{a()}finally{We(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zi,lastRenderedState:t},n}function jp(t,n,a,o){return t.baseState=a,Vc(t,Gt,typeof o=="function"?o:Zi)}function uv(t,n,a,o,u){if(Cl(t))throw Error(r(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};z.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,Zp(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Zp(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=z.T,g={};z.T=g;try{var E=a(u,o),B=z.S;B!==null&&B(g,E),Kp(t,n,E)}catch(ne){qc(t,n,ne)}finally{f!==null&&g.types!==null&&(f.types=g.types),z.T=f}}else try{f=a(u,o),Kp(t,n,f)}catch(ne){qc(t,n,ne)}}function Kp(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Qp(t,n,o)},function(o){return qc(t,n,o)}):Qp(t,n,a)}function Qp(t,n,a){n.status="fulfilled",n.value=a,Jp(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Zp(t,a)))}function qc(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Jp(n),n=n.next;while(n!==o)}t.action=null}function Jp(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function $p(t,n){return n}function em(t,n){if(Rt){var a=Yt.formState;if(a!==null){e:{var o=ht;if(Rt){if(Qt){t:{for(var u=Qt,f=fi;u.nodeType!==8;){if(!f){u=null;break t}if(u=di(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Qt=di(u.nextSibling),o=u.data==="F!";break e}}Ta(o)}o=!1}o&&(n=a[0])}}return a=zn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$p,lastRenderedState:n},a.queue=o,a=vm.bind(null,ht,o),o.dispatch=a,o=Xc(!1),f=Qc.bind(null,ht,!1,o.queue),o=zn(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=uv.bind(null,ht,u,f,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function tm(t){var n=rn();return nm(n,Gt,t)}function nm(t,n,a){if(n=Vc(t,n,$p)[0],t=Tl(Zi)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=co(n)}catch(g){throw g===Qr?ml:g}else o=n;n=rn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ht.flags|=2048,ns(9,{destroy:void 0},cv.bind(null,u,a),null)),[o,f,t]}function cv(t,n){t.action=n}function im(t){var n=rn(),a=Gt;if(a!==null)return nm(n,a,t);rn(),n=n.memoizedState,a=rn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function ns(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=ht.updateQueue,n===null&&(n=Ml(),ht.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function am(){return rn().memoizedState}function Al(t,n,a,o){var u=zn();ht.flags|=t,u.memoizedState=ns(1|n,{destroy:void 0},a,o===void 0?null:o)}function Rl(t,n,a,o){var u=rn();o=o===void 0?null:o;var f=u.memoizedState.inst;Gt!==null&&o!==null&&zc(o,Gt.memoizedState.deps)?u.memoizedState=ns(n,f,a,o):(ht.flags|=t,u.memoizedState=ns(1|n,f,a,o))}function rm(t,n){Al(8390656,8,t,n)}function Wc(t,n){Rl(2048,8,t,n)}function fv(t){ht.flags|=4;var n=ht.updateQueue;if(n===null)n=Ml(),ht.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function sm(t){var n=rn().memoizedState;return fv({ref:n,nextImpl:t}),function(){if((Ot&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function om(t,n){return Rl(4,2,t,n)}function lm(t,n){return Rl(4,4,t,n)}function um(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function cm(t,n,a){a=a!=null?a.concat([t]):null,Rl(4,4,um.bind(null,n,t),a)}function Yc(){}function fm(t,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&zc(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function hm(t,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&zc(n,o[1]))return o[0];if(o=t(),_r){We(!0);try{t()}finally{We(!1)}}return a.memoizedState=[o,n],o}function jc(t,n,a){return a===void 0||(ji&1073741824)!==0&&(Mt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=d0(),ht.lanes|=t,Oa|=t,a)}function dm(t,n,a,o){return Kn(a,n)?a:$r.current!==null?(t=jc(t,a,o),Kn(t,n)||(fn=!0),t):(ji&42)===0||(ji&1073741824)!==0&&(Mt&261930)===0?(fn=!0,t.memoizedState=a):(t=d0(),ht.lanes|=t,Oa|=t,n)}function pm(t,n,a,o,u){var f=Y.p;Y.p=f!==0&&8>f?f:8;var g=z.T,E={};z.T=E,Qc(t,!1,n,a);try{var B=u(),ne=z.S;if(ne!==null&&ne(E,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var xe=sv(B,o);fo(t,n,xe,ni(t))}else fo(t,n,o,ni(t))}catch(ye){fo(t,n,{then:function(){},status:"rejected",reason:ye},ni())}finally{Y.p=f,g!==null&&E.types!==null&&(g.types=E.types),z.T=g}}function hv(){}function Zc(t,n,a,o){if(t.tag!==5)throw Error(r(476));var u=mm(t).queue;pm(t,u,n,F,a===null?hv:function(){return xm(t),a(o)})}function mm(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:F,baseState:F,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zi,lastRenderedState:F},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zi,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function xm(t){var n=mm(t);n.next===null&&(n=t.alternate.memoizedState),fo(t,n.next.queue,{},ni())}function Kc(){return Dn(Do)}function gm(){return rn().memoizedState}function _m(){return rn().memoizedState}function dv(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ni();t=Ca(a);var o=Da(n,t,a);o!==null&&(Xn(o,n,a),so(o,n,a)),n={cache:Tc()},t.payload=n;return}n=n.return}}function pv(t,n,a){var o=ni();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Cl(t)?bm(n,a):(a=pc(t,n,a,o),a!==null&&(Xn(a,t,o),ym(a,n,o)))}function vm(t,n,a){var o=ni();fo(t,n,a,o)}function fo(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Cl(t))bm(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var g=n.lastRenderedState,E=f(g,a);if(u.hasEagerState=!0,u.eagerState=E,Kn(E,g))return ll(t,n,u,0),Yt===null&&ol(),!1}catch{}finally{}if(a=pc(t,n,u,o),a!==null)return Xn(a,t,o),ym(a,n,o),!0}return!1}function Qc(t,n,a,o){if(o={lane:2,revertLane:wf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Cl(t)){if(n)throw Error(r(479))}else n=pc(t,a,o,2),n!==null&&Xn(n,t,2)}function Cl(t){var n=t.alternate;return t===ht||n!==null&&n===ht}function bm(t,n){es=yl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function ym(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Hs(t,a)}}var ho={readContext:Dn,use:El,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useLayoutEffect:tn,useInsertionEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useSyncExternalStore:tn,useId:tn,useHostTransitionStatus:tn,useFormState:tn,useActionState:tn,useOptimistic:tn,useMemoCache:tn,useCacheRefresh:tn};ho.useEffectEvent=tn;var Sm={readContext:Dn,use:El,useCallback:function(t,n){return zn().memoizedState=[t,n===void 0?null:n],t},useContext:Dn,useEffect:rm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Al(4194308,4,um.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Al(4194308,4,t,n)},useInsertionEffect:function(t,n){Al(4,2,t,n)},useMemo:function(t,n){var a=zn();n=n===void 0?null:n;var o=t();if(_r){We(!0);try{t()}finally{We(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=zn();if(a!==void 0){var u=a(n);if(_r){We(!0);try{a(n)}finally{We(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=pv.bind(null,ht,t),[o.memoizedState,t]},useRef:function(t){var n=zn();return t={current:t},n.memoizedState=t},useState:function(t){t=Xc(t);var n=t.queue,a=vm.bind(null,ht,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Yc,useDeferredValue:function(t,n){var a=zn();return jc(a,t,n)},useTransition:function(){var t=Xc(!1);return t=pm.bind(null,ht,t.queue,!0,!1),zn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=ht,u=zn();if(Rt){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Yt===null)throw Error(r(349));(Mt&127)!==0||kp(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,rm(qp.bind(null,o,f,t),[t]),o.flags|=2048,ns(9,{destroy:void 0},Xp.bind(null,o,f,a,n),null),a},useId:function(){var t=zn(),n=Yt.identifierPrefix;if(Rt){var a=Li,o=Ui;a=(o&~(1<<32-Ie(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Sl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ov++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Kc,useFormState:em,useActionState:em,useOptimistic:function(t){var n=zn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Qc.bind(null,ht,!0,a),a.dispatch=n,[t,n]},useMemoCache:Gc,useCacheRefresh:function(){return zn().memoizedState=dv.bind(null,ht)},useEffectEvent:function(t){var n=zn(),a={impl:t};return n.memoizedState=a,function(){if((Ot&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Jc={readContext:Dn,use:El,useCallback:fm,useContext:Dn,useEffect:Wc,useImperativeHandle:cm,useInsertionEffect:om,useLayoutEffect:lm,useMemo:hm,useReducer:Tl,useRef:am,useState:function(){return Tl(Zi)},useDebugValue:Yc,useDeferredValue:function(t,n){var a=rn();return dm(a,Gt.memoizedState,t,n)},useTransition:function(){var t=Tl(Zi)[0],n=rn().memoizedState;return[typeof t=="boolean"?t:co(t),n]},useSyncExternalStore:Vp,useId:gm,useHostTransitionStatus:Kc,useFormState:tm,useActionState:tm,useOptimistic:function(t,n){var a=rn();return jp(a,Gt,t,n)},useMemoCache:Gc,useCacheRefresh:_m};Jc.useEffectEvent=sm;var Mm={readContext:Dn,use:El,useCallback:fm,useContext:Dn,useEffect:Wc,useImperativeHandle:cm,useInsertionEffect:om,useLayoutEffect:lm,useMemo:hm,useReducer:kc,useRef:am,useState:function(){return kc(Zi)},useDebugValue:Yc,useDeferredValue:function(t,n){var a=rn();return Gt===null?jc(a,t,n):dm(a,Gt.memoizedState,t,n)},useTransition:function(){var t=kc(Zi)[0],n=rn().memoizedState;return[typeof t=="boolean"?t:co(t),n]},useSyncExternalStore:Vp,useId:gm,useHostTransitionStatus:Kc,useFormState:im,useActionState:im,useOptimistic:function(t,n){var a=rn();return Gt!==null?jp(a,Gt,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Gc,useCacheRefresh:_m};Mm.useEffectEvent=sm;function $c(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var ef={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ni(),u=Ca(o);u.payload=n,a!=null&&(u.callback=a),n=Da(t,u,o),n!==null&&(Xn(n,t,o),so(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ni(),u=Ca(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Da(t,u,o),n!==null&&(Xn(n,t,o),so(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ni(),o=Ca(a);o.tag=2,n!=null&&(o.callback=n),n=Da(t,o,a),n!==null&&(Xn(n,t,a),so(n,t,a))}};function Em(t,n,a,o,u,f,g){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,g):n.prototype&&n.prototype.isPureReactComponent?!Js(a,o)||!Js(u,f):!0}function Tm(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&ef.enqueueReplaceState(n,n.state,null)}function vr(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=_({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Am(t){sl(t)}function Rm(t){console.error(t)}function Cm(t){sl(t)}function Dl(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Dm(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function tf(t,n,a){return a=Ca(a),a.tag=3,a.payload={element:null},a.callback=function(){Dl(t,n)},a}function wm(t){return t=Ca(t),t.tag=3,t}function Um(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){Dm(n,a,o)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(t.callback=function(){Dm(n,a,o),typeof u!="function"&&(Pa===null?Pa=new Set([this]):Pa.add(this));var E=o.stack;this.componentDidCatch(o.value,{componentStack:E!==null?E:""})})}function mv(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&jr(n,a,u,!0),a=Jn.current,a!==null){switch(a.tag){case 31:case 13:return hi===null?Gl():a.alternate===null&&nn===0&&(nn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===xl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Rf(t,o,u)),!1;case 22:return a.flags|=65536,o===xl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Rf(t,o,u)),!1}throw Error(r(435,a.tag))}return Rf(t,o,u),Gl(),!1}if(Rt)return n=Jn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==bc&&(t=Error(r(422),{cause:o}),to(li(t,a)))):(o!==bc&&(n=Error(r(423),{cause:o}),to(li(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=li(o,a),u=tf(t.stateNode,o,u),Uc(t,u),nn!==4&&(nn=2)),!1;var f=Error(r(520),{cause:o});if(f=li(f,a),yo===null?yo=[f]:yo.push(f),nn!==4&&(nn=2),n===null)return!0;o=li(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=tf(a.stateNode,o,t),Uc(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Pa===null||!Pa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=wm(u),Um(u,t,a,o),Uc(a,u),!1}a=a.return}while(a!==null);return!1}var nf=Error(r(461)),fn=!1;function wn(t,n,a,o){n.child=t===null?Pp(n,null,a,o):gr(n,t.child,a,o)}function Lm(t,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var g={};for(var E in o)E!=="ref"&&(g[E]=o[E])}else g=o;return dr(n),o=Ic(t,n,a,g,f,u),E=Fc(),t!==null&&!fn?(Bc(t,n,u),Ki(t,n,u)):(Rt&&E&&_c(n),n.flags|=1,wn(t,n,o,u),n.child)}function Nm(t,n,a,o,u){if(t===null){var f=a.type;return typeof f=="function"&&!mc(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Om(t,n,f,o,u)):(t=cl(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!ff(t,u)){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:Js,a(g,o)&&t.ref===n.ref)return Ki(t,n,u)}return n.flags|=1,t=Xi(f,o),t.ref=n.ref,t.return=n,n.child=t}function Om(t,n,a,o,u){if(t!==null){var f=t.memoizedProps;if(Js(f,o)&&t.ref===n.ref)if(fn=!1,n.pendingProps=o=f,ff(t,u))(t.flags&131072)!==0&&(fn=!0);else return n.lanes=t.lanes,Ki(t,n,u)}return af(t,n,a,o,u)}function Pm(t,n,a,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return zm(t,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&pl(n,f!==null?f.cachePool:null),f!==null?Fp(n,f):Nc(),Bp(n);else return o=n.lanes=536870912,zm(t,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(pl(n,f.cachePool),Fp(n,f),Ua(),n.memoizedState=null):(t!==null&&pl(n,null),Nc(),Ua());return wn(t,n,u,a),n.child}function po(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function zm(t,n,a,o,u){var f=Rc();return f=f===null?null:{parent:un._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&pl(n,null),Nc(),Bp(n),t!==null&&jr(t,n,o,!0),n.childLanes=u,null}function wl(t,n){return n=Ll({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Im(t,n,a){return gr(n,t.child,null,a),t=wl(n,n.pendingProps),t.flags|=2,$n(n),n.memoizedState=null,t}function xv(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Rt){if(o.mode==="hidden")return t=wl(n,o),n.lanes=536870912,po(null,t);if(Pc(n),(t=Qt)?(t=Z0(t,fi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ma!==null?{id:Ui,overflow:Li}:null,retryLane:536870912,hydrationErrors:null},a=bp(t),a.return=n,n.child=a,Cn=n,Qt=null)):t=null,t===null)throw Ta(n);return n.lanes=536870912,null}return wl(n,o)}var f=t.memoizedState;if(f!==null){var g=f.dehydrated;if(Pc(n),u)if(n.flags&256)n.flags&=-257,n=Im(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(fn||jr(t,n,a,!1),u=(a&t.childLanes)!==0,fn||u){if(o=Yt,o!==null&&(g=Gs(o,a),g!==0&&g!==f.retryLane))throw f.retryLane=g,ur(t,g),Xn(o,t,g),nf;Gl(),n=Im(t,n,a)}else t=f.treeContext,Qt=di(g.nextSibling),Cn=n,Rt=!0,Ea=null,fi=!1,t!==null&&Mp(n,t),n=wl(n,o),n.flags|=4096;return n}return t=Xi(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Ul(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function af(t,n,a,o,u){return dr(n),a=Ic(t,n,a,o,void 0,u),o=Fc(),t!==null&&!fn?(Bc(t,n,u),Ki(t,n,u)):(Rt&&o&&_c(n),n.flags|=1,wn(t,n,a,u),n.child)}function Fm(t,n,a,o,u,f){return dr(n),n.updateQueue=null,a=Gp(n,o,a,u),Hp(t),o=Fc(),t!==null&&!fn?(Bc(t,n,f),Ki(t,n,f)):(Rt&&o&&_c(n),n.flags|=1,wn(t,n,a,f),n.child)}function Bm(t,n,a,o,u){if(dr(n),n.stateNode===null){var f=Xr,g=a.contextType;typeof g=="object"&&g!==null&&(f=Dn(g)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=ef,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Dc(n),g=a.contextType,f.context=typeof g=="object"&&g!==null?Dn(g):Xr,f.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&($c(n,a,g,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&ef.enqueueReplaceState(f,f.state,null),lo(n,o,f,u),oo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var E=n.memoizedProps,B=vr(a,E);f.props=B;var ne=f.context,xe=a.contextType;g=Xr,typeof xe=="object"&&xe!==null&&(g=Dn(xe));var ye=a.getDerivedStateFromProps;xe=typeof ye=="function"||typeof f.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,xe||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(E||ne!==g)&&Tm(n,f,o,g),Ra=!1;var re=n.memoizedState;f.state=re,lo(n,o,f,u),oo(),ne=n.memoizedState,E||re!==ne||Ra?(typeof ye=="function"&&($c(n,a,ye,o),ne=n.memoizedState),(B=Ra||Em(n,a,B,o,re,ne,g))?(xe||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ne),f.props=o,f.state=ne,f.context=g,o=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,wc(t,n),g=n.memoizedProps,xe=vr(a,g),f.props=xe,ye=n.pendingProps,re=f.context,ne=a.contextType,B=Xr,typeof ne=="object"&&ne!==null&&(B=Dn(ne)),E=a.getDerivedStateFromProps,(ne=typeof E=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==ye||re!==B)&&Tm(n,f,o,B),Ra=!1,re=n.memoizedState,f.state=re,lo(n,o,f,u),oo();var ue=n.memoizedState;g!==ye||re!==ue||Ra||t!==null&&t.dependencies!==null&&hl(t.dependencies)?(typeof E=="function"&&($c(n,a,E,o),ue=n.memoizedState),(xe=Ra||Em(n,a,xe,o,re,ue,B)||t!==null&&t.dependencies!==null&&hl(t.dependencies))?(ne||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,ue,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,ue,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===t.memoizedProps&&re===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&re===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ue),f.props=o,f.state=ue,f.context=B,o=xe):(typeof f.componentDidUpdate!="function"||g===t.memoizedProps&&re===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&re===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,Ul(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=gr(n,t.child,null,u),n.child=gr(n,null,a,u)):wn(t,n,a,u),n.memoizedState=f.state,t=n.child):t=Ki(t,n,u),t}function Hm(t,n,a,o){return fr(),n.flags|=256,wn(t,n,a,o),n.child}var rf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function sf(t){return{baseLanes:t,cachePool:Dp()}}function of(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ti),t}function Gm(t,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,g;if((g=f)||(g=t!==null&&t.memoizedState===null?!1:(an.current&2)!==0),g&&(u=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,t===null){if(Rt){if(u?wa(n):Ua(),(t=Qt)?(t=Z0(t,fi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ma!==null?{id:Ui,overflow:Li}:null,retryLane:536870912,hydrationErrors:null},a=bp(t),a.return=n,n.child=a,Cn=n,Qt=null)):t=null,t===null)throw Ta(n);return kf(t)?n.lanes=32:n.lanes=536870912,null}var E=o.children;return o=o.fallback,u?(Ua(),u=n.mode,E=Ll({mode:"hidden",children:E},u),o=cr(o,u,a,null),E.return=n,o.return=n,E.sibling=o,n.child=E,o=n.child,o.memoizedState=sf(a),o.childLanes=of(t,g,a),n.memoizedState=rf,po(null,o)):(wa(n),lf(n,E))}var B=t.memoizedState;if(B!==null&&(E=B.dehydrated,E!==null)){if(f)n.flags&256?(wa(n),n.flags&=-257,n=uf(t,n,a)):n.memoizedState!==null?(Ua(),n.child=t.child,n.flags|=128,n=null):(Ua(),E=o.fallback,u=n.mode,o=Ll({mode:"visible",children:o.children},u),E=cr(E,u,a,null),E.flags|=2,o.return=n,E.return=n,o.sibling=E,n.child=o,gr(n,t.child,null,a),o=n.child,o.memoizedState=sf(a),o.childLanes=of(t,g,a),n.memoizedState=rf,n=po(null,o));else if(wa(n),kf(E)){if(g=E.nextSibling&&E.nextSibling.dataset,g)var ne=g.dgst;g=ne,o=Error(r(419)),o.stack="",o.digest=g,to({value:o,source:null,stack:null}),n=uf(t,n,a)}else if(fn||jr(t,n,a,!1),g=(a&t.childLanes)!==0,fn||g){if(g=Yt,g!==null&&(o=Gs(g,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,ur(t,o),Xn(g,t,o),nf;Vf(E)||Gl(),n=uf(t,n,a)}else Vf(E)?(n.flags|=192,n.child=t.child,n=null):(t=B.treeContext,Qt=di(E.nextSibling),Cn=n,Rt=!0,Ea=null,fi=!1,t!==null&&Mp(n,t),n=lf(n,o.children),n.flags|=4096);return n}return u?(Ua(),E=o.fallback,u=n.mode,B=t.child,ne=B.sibling,o=Xi(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,ne!==null?E=Xi(ne,E):(E=cr(E,u,a,null),E.flags|=2),E.return=n,o.return=n,o.sibling=E,n.child=o,po(null,o),o=n.child,E=t.child.memoizedState,E===null?E=sf(a):(u=E.cachePool,u!==null?(B=un._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=Dp(),E={baseLanes:E.baseLanes|a,cachePool:u}),o.memoizedState=E,o.childLanes=of(t,g,a),n.memoizedState=rf,po(t.child,o)):(wa(n),a=t.child,t=a.sibling,a=Xi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(g=n.deletions,g===null?(n.deletions=[t],n.flags|=16):g.push(t)),n.child=a,n.memoizedState=null,a)}function lf(t,n){return n=Ll({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Ll(t,n){return t=Qn(22,t,null,n),t.lanes=0,t}function uf(t,n,a){return gr(n,t.child,null,a),t=lf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function Vm(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Mc(t.return,n,a)}function cf(t,n,a,o,u,f){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=o,g.tail=a,g.tailMode=u,g.treeForkCount=f)}function km(t,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var g=an.current,E=(g&2)!==0;if(E?(g=g&1|2,n.flags|=128):g&=1,ge(an,g),wn(t,n,o,a),o=Rt?eo:0,!E&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Vm(t,a,n);else if(t.tag===19)Vm(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&bl(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),cf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&bl(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}cf(n,!0,a,null,f,o);break;case"together":cf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ki(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Oa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(jr(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=Xi(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Xi(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function ff(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&hl(t)))}function gv(t,n,a){switch(n.tag){case 3:Ue(n,n.stateNode.containerInfo),Aa(n,un,t.memoizedState.cache),fr();break;case 27:case 5:Xe(n);break;case 4:Ue(n,n.stateNode.containerInfo);break;case 10:Aa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Pc(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(wa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Gm(t,n,a):(wa(n),t=Ki(t,n,a),t!==null?t.sibling:null);wa(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(jr(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return km(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ge(an,an.current),o)break;return null;case 22:return n.lanes=0,Pm(t,n,a,n.pendingProps);case 24:Aa(n,un,t.memoizedState.cache)}return Ki(t,n,a)}function Xm(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)fn=!0;else{if(!ff(t,a)&&(n.flags&128)===0)return fn=!1,gv(t,n,a);fn=(t.flags&131072)!==0}else fn=!1,Rt&&(n.flags&1048576)!==0&&Sp(n,eo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=mr(n.elementType),n.type=t,typeof t=="function")mc(t)?(o=vr(t,o),n.tag=1,n=Bm(null,n,t,o,a)):(n.tag=0,n=af(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===H){n.tag=11,n=Lm(null,n,t,o,a);break e}else if(u===I){n.tag=14,n=Nm(null,n,t,o,a);break e}}throw n=_e(t)||t,Error(r(306,n,""))}}return n;case 0:return af(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=vr(o,n.pendingProps),Bm(t,n,o,u,a);case 3:e:{if(Ue(n,n.stateNode.containerInfo),t===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,wc(t,n),lo(n,o,null,a);var g=n.memoizedState;if(o=g.cache,Aa(n,un,o),o!==f.cache&&Ec(n,[un],a,!0),oo(),o=g.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Hm(t,n,o,a);break e}else if(o!==u){u=li(Error(r(424)),n),to(u),n=Hm(t,n,o,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Qt=di(t.firstChild),Cn=n,Rt=!0,Ea=null,fi=!0,a=Pp(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(fr(),o===u){n=Ki(t,n,a);break e}wn(t,n,o,a)}n=n.child}return n;case 26:return Ul(t,n),t===null?(a=tx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Rt||(a=n.type,t=n.pendingProps,o=jl(ae.current).createElement(a),o[ln]=n,o[mn]=t,Un(o,a,t),ie(o),n.stateNode=o):n.memoizedState=tx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Xe(n),t===null&&Rt&&(o=n.stateNode=J0(n.type,n.pendingProps,ae.current),Cn=n,fi=!0,u=Qt,Ba(n.type)?(Xf=u,Qt=di(o.firstChild)):Qt=u),wn(t,n,n.pendingProps.children,a),Ul(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Rt&&((u=o=Qt)&&(o=Yv(o,n.type,n.pendingProps,fi),o!==null?(n.stateNode=o,Cn=n,Qt=di(o.firstChild),fi=!1,u=!0):u=!1),u||Ta(n)),Xe(n),u=n.type,f=n.pendingProps,g=t!==null?t.memoizedProps:null,o=f.children,Bf(u,f)?o=null:g!==null&&Bf(u,g)&&(n.flags|=32),n.memoizedState!==null&&(u=Ic(t,n,lv,null,null,a),Do._currentValue=u),Ul(t,n),wn(t,n,o,a),n.child;case 6:return t===null&&Rt&&((t=a=Qt)&&(a=jv(a,n.pendingProps,fi),a!==null?(n.stateNode=a,Cn=n,Qt=null,t=!0):t=!1),t||Ta(n)),null;case 13:return Gm(t,n,a);case 4:return Ue(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=gr(n,null,o,a):wn(t,n,o,a),n.child;case 11:return Lm(t,n,n.type,n.pendingProps,a);case 7:return wn(t,n,n.pendingProps,a),n.child;case 8:return wn(t,n,n.pendingProps.children,a),n.child;case 12:return wn(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Aa(n,n.type,o.value),wn(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,dr(n),u=Dn(u),o=o(u),n.flags|=1,wn(t,n,o,a),n.child;case 14:return Nm(t,n,n.type,n.pendingProps,a);case 15:return Om(t,n,n.type,n.pendingProps,a);case 19:return km(t,n,a);case 31:return xv(t,n,a);case 22:return Pm(t,n,a,n.pendingProps);case 24:return dr(n),o=Dn(un),t===null?(u=Rc(),u===null&&(u=Yt,f=Tc(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Dc(n),Aa(n,un,u)):((t.lanes&a)!==0&&(wc(t,n),lo(n,null,null,a),oo()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Aa(n,un,o)):(o=f.cache,Aa(n,un,o),o!==u.cache&&Ec(n,[un],a,!0))),wn(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function Qi(t){t.flags|=4}function hf(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(g0())t.flags|=8192;else throw xr=xl,Cc}else t.flags&=-16777217}function qm(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!sx(n))if(g0())t.flags|=8192;else throw xr=xl,Cc}function Nl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?_t():536870912,t.lanes|=n,ss|=n)}function mo(t,n){if(!Rt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Jt(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function _v(t,n,a){var o=n.pendingProps;switch(vc(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(n),null;case 1:return Jt(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Yi(un),Ve(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Yr(n)?Qi(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,yc())),Jt(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(Qi(n),f!==null?(Jt(n),qm(n,f)):(Jt(n),hf(n,u,null,o,a))):f?f!==t.memoizedState?(Qi(n),Jt(n),qm(n,f)):(Jt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Qi(n),Jt(n),hf(n,u,t,o,a)),null;case 27:if(rt(n),a=ae.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Qi(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Jt(n),null}t=Re.current,Yr(n)?Ep(n):(t=J0(u,o,a),n.stateNode=t,Qi(n))}return Jt(n),null;case 5:if(rt(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Qi(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Jt(n),null}if(f=Re.current,Yr(n))Ep(n);else{var g=jl(ae.current);switch(f){case 1:f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=g.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?g.createElement("select",{is:o.is}):g.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?g.createElement(u,{is:o.is}):g.createElement(u)}}f[ln]=n,f[mn]=o;e:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)f.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break e;for(;g.sibling===null;){if(g.return===null||g.return===n)break e;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=f;e:switch(Un(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Qi(n)}}return Jt(n),hf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Qi(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(t=ae.current,Yr(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=Cn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[ln]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||G0(t.nodeValue,a)),t||Ta(n,!0)}else t=jl(t).createTextNode(o),t[ln]=n,n.stateNode=t}return Jt(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Yr(n),a!==null){if(t===null){if(!o)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[ln]=n}else fr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Jt(n),t=!1}else a=yc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?($n(n),n):($n(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Jt(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Yr(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[ln]=n}else fr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Jt(n),u=!1}else u=yc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?($n(n),n):($n(n),null)}return $n(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Nl(n,n.updateQueue),Jt(n),null);case 4:return Ve(),t===null&&Of(n.stateNode.containerInfo),Jt(n),null;case 10:return Yi(n.type),Jt(n),null;case 19:if(J(an),o=n.memoizedState,o===null)return Jt(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)mo(o,!1);else{if(nn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=bl(t),f!==null){for(n.flags|=128,mo(o,!1),t=f.updateQueue,n.updateQueue=t,Nl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)vp(a,t),a=a.sibling;return ge(an,an.current&1|2),Rt&&qi(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&M()>Fl&&(n.flags|=128,u=!0,mo(o,!1),n.lanes=4194304)}else{if(!u)if(t=bl(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Nl(n,t),mo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Rt)return Jt(n),null}else 2*M()-o.renderingStartTime>Fl&&a!==536870912&&(n.flags|=128,u=!0,mo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=M(),t.sibling=null,a=an.current,ge(an,u?a&1|2:a&1),Rt&&qi(n,o.treeForkCount),t):(Jt(n),null);case 22:case 23:return $n(n),Oc(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Jt(n),n.subtreeFlags&6&&(n.flags|=8192)):Jt(n),a=n.updateQueue,a!==null&&Nl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&J(pr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Yi(un),Jt(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function vv(t,n){switch(vc(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Yi(un),Ve(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return rt(n),null;case 31:if(n.memoizedState!==null){if($n(n),n.alternate===null)throw Error(r(340));fr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if($n(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));fr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return J(an),null;case 4:return Ve(),null;case 10:return Yi(n.type),null;case 22:case 23:return $n(n),Oc(),t!==null&&J(pr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Yi(un),null;case 25:return null;default:return null}}function Wm(t,n){switch(vc(n),n.tag){case 3:Yi(un),Ve();break;case 26:case 27:case 5:rt(n);break;case 4:Ve();break;case 31:n.memoizedState!==null&&$n(n);break;case 13:$n(n);break;case 19:J(an);break;case 10:Yi(n.type);break;case 22:case 23:$n(n),Oc(),t!==null&&J(pr);break;case 24:Yi(un)}}function xo(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var f=a.create,g=a.inst;o=f(),g.destroy=o}a=a.next}while(a!==u)}}catch(E){Ft(n,n.return,E)}}function La(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var g=o.inst,E=g.destroy;if(E!==void 0){g.destroy=void 0,u=n;var B=a,ne=E;try{ne()}catch(xe){Ft(u,B,xe)}}}o=o.next}while(o!==f)}}catch(xe){Ft(n,n.return,xe)}}function Ym(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Ip(n,a)}catch(o){Ft(t,t.return,o)}}}function jm(t,n,a){a.props=vr(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Ft(t,n,o)}}function go(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){Ft(t,n,u)}}function Ni(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ft(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ft(t,n,u)}else a.current=null}function Zm(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ft(t,t.return,u)}}function df(t,n,a){try{var o=t.stateNode;Gv(o,t.type,a,n),o[mn]=n}catch(u){Ft(t,t.return,u)}}function Km(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ba(t.type)||t.tag===4}function pf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Km(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ba(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function mf(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Vi));else if(o!==4&&(o===27&&Ba(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(mf(t,n,a),t=t.sibling;t!==null;)mf(t,n,a),t=t.sibling}function Ol(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Ba(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Ol(t,n,a),t=t.sibling;t!==null;)Ol(t,n,a),t=t.sibling}function Qm(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Un(n,o,a),n[ln]=t,n[mn]=a}catch(f){Ft(t,t.return,f)}}var Ji=!1,hn=!1,xf=!1,Jm=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function bv(t,n){if(t=t.containerInfo,If=tu,t=cp(t),lc(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var g=0,E=-1,B=-1,ne=0,xe=0,ye=t,re=null;t:for(;;){for(var ue;ye!==a||u!==0&&ye.nodeType!==3||(E=g+u),ye!==f||o!==0&&ye.nodeType!==3||(B=g+o),ye.nodeType===3&&(g+=ye.nodeValue.length),(ue=ye.firstChild)!==null;)re=ye,ye=ue;for(;;){if(ye===t)break t;if(re===a&&++ne===u&&(E=g),re===f&&++xe===o&&(B=g),(ue=ye.nextSibling)!==null)break;ye=re,re=ye.parentNode}ye=ue}a=E===-1||B===-1?null:{start:E,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ff={focusedElem:t,selectionRange:a},tu=!1,Tn=n;Tn!==null;)if(n=Tn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Tn=t;else for(;Tn!==null;){switch(n=Tn,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var ke=vr(a.type,u);t=o.getSnapshotBeforeUpdate(ke,f),o.__reactInternalSnapshotBeforeUpdate=t}catch(tt){Ft(a,a.return,tt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Gf(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Gf(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=n.sibling,t!==null){t.return=n.return,Tn=t;break}Tn=n.return}}function $m(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ea(t,a),o&4&&xo(5,a);break;case 1:if(ea(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(g){Ft(a,a.return,g)}else{var u=vr(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(g){Ft(a,a.return,g)}}o&64&&Ym(a),o&512&&go(a,a.return);break;case 3:if(ea(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Ip(t,n)}catch(g){Ft(a,a.return,g)}}break;case 27:n===null&&o&4&&Qm(a);case 26:case 5:ea(t,a),n===null&&o&4&&Zm(a),o&512&&go(a,a.return);break;case 12:ea(t,a);break;case 31:ea(t,a),o&4&&n0(t,a);break;case 13:ea(t,a),o&4&&i0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Dv.bind(null,a),Zv(t,a))));break;case 22:if(o=a.memoizedState!==null||Ji,!o){n=n!==null&&n.memoizedState!==null||hn,u=Ji;var f=hn;Ji=o,(hn=n)&&!f?ta(t,a,(a.subtreeFlags&8772)!==0):ea(t,a),Ji=u,hn=f}break;case 30:break;default:ea(t,a)}}function e0(t){var n=t.alternate;n!==null&&(t.alternate=null,e0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Xs(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var en=null,Hn=!1;function $i(t,n,a){for(a=a.child;a!==null;)t0(t,n,a),a=a.sibling}function t0(t,n,a){if(Ae&&typeof Ae.onCommitFiberUnmount=="function")try{Ae.onCommitFiberUnmount(Te,a)}catch{}switch(a.tag){case 26:hn||Ni(a,n),$i(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:hn||Ni(a,n);var o=en,u=Hn;Ba(a.type)&&(en=a.stateNode,Hn=!1),$i(t,n,a),Ao(a.stateNode),en=o,Hn=u;break;case 5:hn||Ni(a,n);case 6:if(o=en,u=Hn,en=null,$i(t,n,a),en=o,Hn=u,en!==null)if(Hn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(a.stateNode)}catch(f){Ft(a,n,f)}else try{en.removeChild(a.stateNode)}catch(f){Ft(a,n,f)}break;case 18:en!==null&&(Hn?(t=en,Y0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),ps(t)):Y0(en,a.stateNode));break;case 4:o=en,u=Hn,en=a.stateNode.containerInfo,Hn=!0,$i(t,n,a),en=o,Hn=u;break;case 0:case 11:case 14:case 15:La(2,a,n),hn||La(4,a,n),$i(t,n,a);break;case 1:hn||(Ni(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&jm(a,n,o)),$i(t,n,a);break;case 21:$i(t,n,a);break;case 22:hn=(o=hn)||a.memoizedState!==null,$i(t,n,a),hn=o;break;default:$i(t,n,a)}}function n0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ps(t)}catch(a){Ft(n,n.return,a)}}}function i0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ps(t)}catch(a){Ft(n,n.return,a)}}function yv(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Jm),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Jm),n;default:throw Error(r(435,t.tag))}}function Pl(t,n){var a=yv(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=wv.bind(null,t,o);o.then(u,u)}})}function Gn(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=t,g=n,E=g;e:for(;E!==null;){switch(E.tag){case 27:if(Ba(E.type)){en=E.stateNode,Hn=!1;break e}break;case 5:en=E.stateNode,Hn=!1;break e;case 3:case 4:en=E.stateNode.containerInfo,Hn=!0;break e}E=E.return}if(en===null)throw Error(r(160));t0(f,g,u),en=null,Hn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)a0(n,t),n=n.sibling}var Si=null;function a0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Gn(n,t),Vn(t),o&4&&(La(3,t,t.return),xo(3,t),La(5,t,t.return));break;case 1:Gn(n,t),Vn(t),o&512&&(hn||a===null||Ni(a,a.return)),o&64&&Ji&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Si;if(Gn(n,t),Vn(t),o&512&&(hn||a===null||Ni(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[rr]||f[ln]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Un(f,o,a),f[ln]=t,ie(f),o=f;break e;case"link":var g=ax("link","href",u).get(o+(a.href||""));if(g){for(var E=0;E<g.length;E++)if(f=g[E],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){g.splice(E,1);break t}}f=u.createElement(o),Un(f,o,a),u.head.appendChild(f);break;case"meta":if(g=ax("meta","content",u).get(o+(a.content||""))){for(E=0;E<g.length;E++)if(f=g[E],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){g.splice(E,1);break t}}f=u.createElement(o),Un(f,o,a),u.head.appendChild(f);break;default:throw Error(r(468,o))}f[ln]=t,ie(f),o=f}t.stateNode=o}else rx(u,t.type,t.stateNode);else t.stateNode=ix(u,o,t.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?rx(u,t.type,t.stateNode):ix(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&df(t,t.memoizedProps,a.memoizedProps)}break;case 27:Gn(n,t),Vn(t),o&512&&(hn||a===null||Ni(a,a.return)),a!==null&&o&4&&df(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Gn(n,t),Vn(t),o&512&&(hn||a===null||Ni(a,a.return)),t.flags&32){u=t.stateNode;try{wi(u,"")}catch(ke){Ft(t,t.return,ke)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,df(t,u,a!==null?a.memoizedProps:u)),o&1024&&(xf=!0);break;case 6:if(Gn(n,t),Vn(t),o&4){if(t.stateNode===null)throw Error(r(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(ke){Ft(t,t.return,ke)}}break;case 3:if(Ql=null,u=Si,Si=Zl(n.containerInfo),Gn(n,t),Si=u,Vn(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{ps(n.containerInfo)}catch(ke){Ft(t,t.return,ke)}xf&&(xf=!1,r0(t));break;case 4:o=Si,Si=Zl(t.stateNode.containerInfo),Gn(n,t),Vn(t),Si=o;break;case 12:Gn(n,t),Vn(t);break;case 31:Gn(n,t),Vn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Pl(t,o)));break;case 13:Gn(n,t),Vn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Il=M()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Pl(t,o)));break;case 22:u=t.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,ne=Ji,xe=hn;if(Ji=ne||u,hn=xe||B,Gn(n,t),hn=xe,Ji=ne,Vn(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||Ji||hn||br(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,u)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{E=B.stateNode;var ye=B.memoizedProps.style,re=ye!=null&&ye.hasOwnProperty("display")?ye.display:null;E.style.display=re==null||typeof re=="boolean"?"":(""+re).trim()}}catch(ke){Ft(B,B.return,ke)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(ke){Ft(B,B.return,ke)}}}else if(n.tag===18){if(a===null){B=n;try{var ue=B.stateNode;u?j0(ue,!0):j0(B.stateNode,!1)}catch(ke){Ft(B,B.return,ke)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Pl(t,a))));break;case 19:Gn(n,t),Vn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Pl(t,o)));break;case 30:break;case 21:break;default:Gn(n,t),Vn(t)}}function Vn(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(Km(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,f=pf(t);Ol(t,f,u);break;case 5:var g=a.stateNode;a.flags&32&&(wi(g,""),a.flags&=-33);var E=pf(t);Ol(t,E,g);break;case 3:case 4:var B=a.stateNode.containerInfo,ne=pf(t);mf(t,ne,B);break;default:throw Error(r(161))}}catch(xe){Ft(t,t.return,xe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function r0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;r0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function ea(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)$m(t,n.alternate,n),n=n.sibling}function br(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:La(4,n,n.return),br(n);break;case 1:Ni(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&jm(n,n.return,a),br(n);break;case 27:Ao(n.stateNode);case 26:case 5:Ni(n,n.return),br(n);break;case 22:n.memoizedState===null&&br(n);break;case 30:br(n);break;default:br(n)}t=t.sibling}}function ta(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,g=f.flags;switch(f.tag){case 0:case 11:case 15:ta(u,f,a),xo(4,f);break;case 1:if(ta(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ne){Ft(o,o.return,ne)}if(o=f,u=o.updateQueue,u!==null){var E=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)zp(B[u],E)}catch(ne){Ft(o,o.return,ne)}}a&&g&64&&Ym(f),go(f,f.return);break;case 27:Qm(f);case 26:case 5:ta(u,f,a),a&&o===null&&g&4&&Zm(f),go(f,f.return);break;case 12:ta(u,f,a);break;case 31:ta(u,f,a),a&&g&4&&n0(u,f);break;case 13:ta(u,f,a),a&&g&4&&i0(u,f);break;case 22:f.memoizedState===null&&ta(u,f,a),go(f,f.return);break;case 30:break;default:ta(u,f,a)}n=n.sibling}}function gf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&no(a))}function _f(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&no(t))}function Mi(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)s0(t,n,a,o),n=n.sibling}function s0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Mi(t,n,a,o),u&2048&&xo(9,n);break;case 1:Mi(t,n,a,o);break;case 3:Mi(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&no(t)));break;case 12:if(u&2048){Mi(t,n,a,o),t=n.stateNode;try{var f=n.memoizedProps,g=f.id,E=f.onPostCommit;typeof E=="function"&&E(g,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(B){Ft(n,n.return,B)}}else Mi(t,n,a,o);break;case 31:Mi(t,n,a,o);break;case 13:Mi(t,n,a,o);break;case 23:break;case 22:f=n.stateNode,g=n.alternate,n.memoizedState!==null?f._visibility&2?Mi(t,n,a,o):_o(t,n):f._visibility&2?Mi(t,n,a,o):(f._visibility|=2,is(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&gf(g,n);break;case 24:Mi(t,n,a,o),u&2048&&_f(n.alternate,n);break;default:Mi(t,n,a,o)}}function is(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,g=n,E=a,B=o,ne=g.flags;switch(g.tag){case 0:case 11:case 15:is(f,g,E,B,u),xo(8,g);break;case 23:break;case 22:var xe=g.stateNode;g.memoizedState!==null?xe._visibility&2?is(f,g,E,B,u):_o(f,g):(xe._visibility|=2,is(f,g,E,B,u)),u&&ne&2048&&gf(g.alternate,g);break;case 24:is(f,g,E,B,u),u&&ne&2048&&_f(g.alternate,g);break;default:is(f,g,E,B,u)}n=n.sibling}}function _o(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:_o(a,o),u&2048&&gf(o.alternate,o);break;case 24:_o(a,o),u&2048&&_f(o.alternate,o);break;default:_o(a,o)}n=n.sibling}}var vo=8192;function as(t,n,a){if(t.subtreeFlags&vo)for(t=t.child;t!==null;)o0(t,n,a),t=t.sibling}function o0(t,n,a){switch(t.tag){case 26:as(t,n,a),t.flags&vo&&t.memoizedState!==null&&ob(a,Si,t.memoizedState,t.memoizedProps);break;case 5:as(t,n,a);break;case 3:case 4:var o=Si;Si=Zl(t.stateNode.containerInfo),as(t,n,a),Si=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=vo,vo=16777216,as(t,n,a),vo=o):as(t,n,a));break;default:as(t,n,a)}}function l0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function bo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Tn=o,c0(o,t)}l0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)u0(t),t=t.sibling}function u0(t){switch(t.tag){case 0:case 11:case 15:bo(t),t.flags&2048&&La(9,t,t.return);break;case 3:bo(t);break;case 12:bo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,zl(t)):bo(t);break;default:bo(t)}}function zl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Tn=o,c0(o,t)}l0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:La(8,n,n.return),zl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,zl(n));break;default:zl(n)}t=t.sibling}}function c0(t,n){for(;Tn!==null;){var a=Tn;switch(a.tag){case 0:case 11:case 15:La(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:no(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Tn=o;else e:for(a=t;Tn!==null;){o=Tn;var u=o.sibling,f=o.return;if(e0(o),o===a){Tn=null;break e}if(u!==null){u.return=f,Tn=u;break e}Tn=f}}}var Sv={getCacheForType:function(t){var n=Dn(un),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Dn(un).controller.signal}},Mv=typeof WeakMap=="function"?WeakMap:Map,Ot=0,Yt=null,vt=null,Mt=0,It=0,ei=null,Na=!1,rs=!1,vf=!1,na=0,nn=0,Oa=0,yr=0,bf=0,ti=0,ss=0,yo=null,kn=null,yf=!1,Il=0,f0=0,Fl=1/0,Bl=null,Pa=null,gn=0,za=null,os=null,ia=0,Sf=0,Mf=null,h0=null,So=0,Ef=null;function ni(){return(Ot&2)!==0&&Mt!==0?Mt&-Mt:z.T!==null?wf():Vs()}function d0(){if(ti===0)if((Mt&536870912)===0||Rt){var t=Ee;Ee<<=1,(Ee&3932160)===0&&(Ee=262144),ti=t}else ti=536870912;return t=Jn.current,t!==null&&(t.flags|=32),ti}function Xn(t,n,a){(t===Yt&&(It===2||It===9)||t.cancelPendingCommit!==null)&&(ls(t,0),Ia(t,Mt,ti,!1)),$t(t,a),((Ot&2)===0||t!==Yt)&&(t===Yt&&((Ot&2)===0&&(yr|=a),nn===4&&Ia(t,Mt,ti,!1)),Oi(t))}function p0(t,n,a){if((Ot&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||De(t,n),u=o?Av(t,n):Af(t,n,!0),f=o;do{if(u===0){rs&&!o&&Ia(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!Ev(a)){u=Af(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var g=0;else g=t.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;e:{var E=t;u=yo;var B=E.current.memoizedState.isDehydrated;if(B&&(ls(E,g).flags|=256),g=Af(E,g,!1),g!==2){if(vf&&!B){E.errorRecoveryDisabledLanes|=f,yr|=f,u=4;break e}f=kn,kn=u,f!==null&&(kn===null?kn=f:kn.push.apply(kn,f))}u=g}if(f=!1,u!==2)continue}}if(u===1){ls(t,0),Ia(t,n,0,!0);break}e:{switch(o=t,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Ia(o,n,ti,!Na);break e;case 2:kn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=Il+300-M(),10<u)){if(Ia(o,n,ti,!Na),pe(o,0,!0)!==0)break e;ia=n,o.timeoutHandle=q0(m0.bind(null,o,a,kn,Bl,yf,n,ti,yr,ss,Na,f,"Throttled",-0,0),u);break e}m0(o,a,kn,Bl,yf,n,ti,yr,ss,Na,f,null,-0,0)}}break}while(!0);Oi(t)}function m0(t,n,a,o,u,f,g,E,B,ne,xe,ye,re,ue){if(t.timeoutHandle=-1,ye=n.subtreeFlags,ye&8192||(ye&16785408)===16785408){ye={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Vi},o0(n,f,ye);var ke=(f&62914560)===f?Il-M():(f&4194048)===f?f0-M():0;if(ke=lb(ye,ke),ke!==null){ia=f,t.cancelPendingCommit=ke(M0.bind(null,t,n,f,a,o,u,g,E,B,xe,ye,null,re,ue)),Ia(t,f,g,!ne);return}}M0(t,n,f,a,o,u,g,E,B)}function Ev(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!Kn(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ia(t,n,a,o){n&=~bf,n&=~yr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-Ie(u),g=1<<f;o[f]=-1,u&=~g}a!==0&&Bs(t,a,n)}function Hl(){return(Ot&6)===0?(Mo(0),!1):!0}function Tf(){if(vt!==null){if(It===0)var t=vt.return;else t=vt,Wi=hr=null,Hc(t),Jr=null,ao=0,t=vt;for(;t!==null;)Wm(t.alternate,t),t=t.return;vt=null}}function ls(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Xv(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ia=0,Tf(),Yt=t,vt=a=Xi(t.current,null),Mt=n,It=0,ei=null,Na=!1,rs=De(t,n),vf=!1,ss=ti=bf=yr=Oa=nn=0,kn=yo=null,yf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Ie(o),f=1<<u;n|=t[u],o&=~f}return na=n,ol(),a}function x0(t,n){ht=null,z.H=ho,n===Qr||n===ml?(n=Lp(),It=3):n===Cc?(n=Lp(),It=4):It=n===nf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ei=n,vt===null&&(nn=1,Dl(t,li(n,t.current)))}function g0(){var t=Jn.current;return t===null?!0:(Mt&4194048)===Mt?hi===null:(Mt&62914560)===Mt||(Mt&536870912)!==0?t===hi:!1}function _0(){var t=z.H;return z.H=ho,t===null?ho:t}function v0(){var t=z.A;return z.A=Sv,t}function Gl(){nn=4,Na||(Mt&4194048)!==Mt&&Jn.current!==null||(rs=!0),(Oa&134217727)===0&&(yr&134217727)===0||Yt===null||Ia(Yt,Mt,ti,!1)}function Af(t,n,a){var o=Ot;Ot|=2;var u=_0(),f=v0();(Yt!==t||Mt!==n)&&(Bl=null,ls(t,n)),n=!1;var g=nn;e:do try{if(It!==0&&vt!==null){var E=vt,B=ei;switch(It){case 8:Tf(),g=6;break e;case 3:case 2:case 9:case 6:Jn.current===null&&(n=!0);var ne=It;if(It=0,ei=null,us(t,E,B,ne),a&&rs){g=0;break e}break;default:ne=It,It=0,ei=null,us(t,E,B,ne)}}Tv(),g=nn;break}catch(xe){x0(t,xe)}while(!0);return n&&t.shellSuspendCounter++,Wi=hr=null,Ot=o,z.H=u,z.A=f,vt===null&&(Yt=null,Mt=0,ol()),g}function Tv(){for(;vt!==null;)b0(vt)}function Av(t,n){var a=Ot;Ot|=2;var o=_0(),u=v0();Yt!==t||Mt!==n?(Bl=null,Fl=M()+500,ls(t,n)):rs=De(t,n);e:do try{if(It!==0&&vt!==null){n=vt;var f=ei;t:switch(It){case 1:It=0,ei=null,us(t,n,f,1);break;case 2:case 9:if(wp(f)){It=0,ei=null,y0(n);break}n=function(){It!==2&&It!==9||Yt!==t||(It=7),Oi(t)},f.then(n,n);break e;case 3:It=7;break e;case 4:It=5;break e;case 7:wp(f)?(It=0,ei=null,y0(n)):(It=0,ei=null,us(t,n,f,7));break;case 5:var g=null;switch(vt.tag){case 26:g=vt.memoizedState;case 5:case 27:var E=vt;if(g?sx(g):E.stateNode.complete){It=0,ei=null;var B=E.sibling;if(B!==null)vt=B;else{var ne=E.return;ne!==null?(vt=ne,Vl(ne)):vt=null}break t}}It=0,ei=null,us(t,n,f,5);break;case 6:It=0,ei=null,us(t,n,f,6);break;case 8:Tf(),nn=6;break e;default:throw Error(r(462))}}Rv();break}catch(xe){x0(t,xe)}while(!0);return Wi=hr=null,z.H=o,z.A=u,Ot=a,vt!==null?0:(Yt=null,Mt=0,ol(),nn)}function Rv(){for(;vt!==null&&!nt();)b0(vt)}function b0(t){var n=Xm(t.alternate,t,na);t.memoizedProps=t.pendingProps,n===null?Vl(t):vt=n}function y0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Fm(a,n,n.pendingProps,n.type,void 0,Mt);break;case 11:n=Fm(a,n,n.pendingProps,n.type.render,n.ref,Mt);break;case 5:Hc(n);default:Wm(a,n),n=vt=vp(n,na),n=Xm(a,n,na)}t.memoizedProps=t.pendingProps,n===null?Vl(t):vt=n}function us(t,n,a,o){Wi=hr=null,Hc(n),Jr=null,ao=0;var u=n.return;try{if(mv(t,u,n,a,Mt)){nn=1,Dl(t,li(a,t.current)),vt=null;return}}catch(f){if(u!==null)throw vt=u,f;nn=1,Dl(t,li(a,t.current)),vt=null;return}n.flags&32768?(Rt||o===1?t=!0:rs||(Mt&536870912)!==0?t=!1:(Na=t=!0,(o===2||o===9||o===3||o===6)&&(o=Jn.current,o!==null&&o.tag===13&&(o.flags|=16384))),S0(n,t)):Vl(n)}function Vl(t){var n=t;do{if((n.flags&32768)!==0){S0(n,Na);return}t=n.return;var a=_v(n.alternate,n,na);if(a!==null){vt=a;return}if(n=n.sibling,n!==null){vt=n;return}vt=n=t}while(n!==null);nn===0&&(nn=5)}function S0(t,n){do{var a=vv(t.alternate,t);if(a!==null){a.flags&=32767,vt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){vt=t;return}vt=t=a}while(t!==null);nn=6,vt=null}function M0(t,n,a,o,u,f,g,E,B){t.cancelPendingCommit=null;do kl();while(gn!==0);if((Ot&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=dc,Ln(t,a,f,g,E,B),t===Yt&&(vt=Yt=null,Mt=0),os=n,za=t,ia=a,Sf=f,Mf=u,h0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Uv(fe,function(){return C0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Y.p,Y.p=2,g=Ot,Ot|=4;try{bv(t,n,a)}finally{Ot=g,Y.p=u,z.T=o}}gn=1,E0(),T0(),A0()}}function E0(){if(gn===1){gn=0;var t=za,n=os,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var o=Y.p;Y.p=2;var u=Ot;Ot|=4;try{a0(n,t);var f=Ff,g=cp(t.containerInfo),E=f.focusedElem,B=f.selectionRange;if(g!==E&&E&&E.ownerDocument&&up(E.ownerDocument.documentElement,E)){if(B!==null&&lc(E)){var ne=B.start,xe=B.end;if(xe===void 0&&(xe=ne),"selectionStart"in E)E.selectionStart=ne,E.selectionEnd=Math.min(xe,E.value.length);else{var ye=E.ownerDocument||document,re=ye&&ye.defaultView||window;if(re.getSelection){var ue=re.getSelection(),ke=E.textContent.length,tt=Math.min(B.start,ke),kt=B.end===void 0?tt:Math.min(B.end,ke);!ue.extend&&tt>kt&&(g=kt,kt=tt,tt=g);var Z=lp(E,tt),X=lp(E,kt);if(Z&&X&&(ue.rangeCount!==1||ue.anchorNode!==Z.node||ue.anchorOffset!==Z.offset||ue.focusNode!==X.node||ue.focusOffset!==X.offset)){var ee=ye.createRange();ee.setStart(Z.node,Z.offset),ue.removeAllRanges(),tt>kt?(ue.addRange(ee),ue.extend(X.node,X.offset)):(ee.setEnd(X.node,X.offset),ue.addRange(ee))}}}}for(ye=[],ue=E;ue=ue.parentNode;)ue.nodeType===1&&ye.push({element:ue,left:ue.scrollLeft,top:ue.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<ye.length;E++){var ve=ye[E];ve.element.scrollLeft=ve.left,ve.element.scrollTop=ve.top}}tu=!!If,Ff=If=null}finally{Ot=u,Y.p=o,z.T=a}}t.current=n,gn=2}}function T0(){if(gn===2){gn=0;var t=za,n=os,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var o=Y.p;Y.p=2;var u=Ot;Ot|=4;try{$m(t,n.alternate,n)}finally{Ot=u,Y.p=o,z.T=a}}gn=3}}function A0(){if(gn===4||gn===3){gn=0,N();var t=za,n=os,a=ia,o=h0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?gn=5:(gn=0,os=za=null,R0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Pa=null),ar(a),n=n.stateNode,Ae&&typeof Ae.onCommitFiberRoot=="function")try{Ae.onCommitFiberRoot(Te,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=z.T,u=Y.p,Y.p=2,z.T=null;try{for(var f=t.onRecoverableError,g=0;g<o.length;g++){var E=o[g];f(E.value,{componentStack:E.stack})}}finally{z.T=n,Y.p=u}}(ia&3)!==0&&kl(),Oi(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Ef?So++:(So=0,Ef=t):So=0,Mo(0)}}function R0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,no(n)))}function kl(){return E0(),T0(),A0(),C0()}function C0(){if(gn!==5)return!1;var t=za,n=Sf;Sf=0;var a=ar(ia),o=z.T,u=Y.p;try{Y.p=32>a?32:a,z.T=null,a=Mf,Mf=null;var f=za,g=ia;if(gn=0,os=za=null,ia=0,(Ot&6)!==0)throw Error(r(331));var E=Ot;if(Ot|=4,u0(f.current),s0(f,f.current,g,a),Ot=E,Mo(0,!1),Ae&&typeof Ae.onPostCommitFiberRoot=="function")try{Ae.onPostCommitFiberRoot(Te,f)}catch{}return!0}finally{Y.p=u,z.T=o,R0(t,n)}}function D0(t,n,a){n=li(a,n),n=tf(t.stateNode,n,2),t=Da(t,n,2),t!==null&&($t(t,2),Oi(t))}function Ft(t,n,a){if(t.tag===3)D0(t,t,a);else for(;n!==null;){if(n.tag===3){D0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Pa===null||!Pa.has(o))){t=li(a,t),a=wm(2),o=Da(n,a,2),o!==null&&(Um(a,o,n,t),$t(o,2),Oi(o));break}}n=n.return}}function Rf(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new Mv;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(vf=!0,u.add(a),t=Cv.bind(null,t,n,a),n.then(t,t))}function Cv(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Yt===t&&(Mt&a)===a&&(nn===4||nn===3&&(Mt&62914560)===Mt&&300>M()-Il?(Ot&2)===0&&ls(t,0):bf|=a,ss===Mt&&(ss=0)),Oi(t)}function w0(t,n){n===0&&(n=_t()),t=ur(t,n),t!==null&&($t(t,n),Oi(t))}function Dv(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),w0(t,a)}function wv(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),w0(t,a)}function Uv(t,n){return Pt(t,n)}var Xl=null,cs=null,Cf=!1,ql=!1,Df=!1,Fa=0;function Oi(t){t!==cs&&t.next===null&&(cs===null?Xl=cs=t:cs=cs.next=t),ql=!0,Cf||(Cf=!0,Nv())}function Mo(t,n){if(!Df&&ql){Df=!0;do for(var a=!1,o=Xl;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var g=o.suspendedLanes,E=o.pingedLanes;f=(1<<31-Ie(42|t)+1)-1,f&=u&~(g&~E),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,O0(o,f))}else f=Mt,f=pe(o,o===Yt?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||De(o,f)||(a=!0,O0(o,f));o=o.next}while(a);Df=!1}}function Lv(){U0()}function U0(){ql=Cf=!1;var t=0;Fa!==0&&kv()&&(t=Fa);for(var n=M(),a=null,o=Xl;o!==null;){var u=o.next,f=L0(o,n);f===0?(o.next=null,a===null?Xl=u:a.next=u,u===null&&(cs=a)):(a=o,(t!==0||(f&3)!==0)&&(ql=!0)),o=u}gn!==0&&gn!==5||Mo(t),Fa!==0&&(Fa=0)}function L0(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var g=31-Ie(f),E=1<<g,B=u[g];B===-1?((E&a)===0||(E&o)!==0)&&(u[g]=Fe(E,n)):B<=n&&(t.expiredLanes|=E),f&=~E}if(n=Yt,a=Mt,a=pe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(It===2||It===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Ze(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||De(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Ze(o),ar(a)){case 2:case 8:a=Me;break;case 32:a=fe;break;case 268435456:a=we;break;default:a=fe}return o=N0.bind(null,t),a=Pt(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Ze(o),t.callbackPriority=2,t.callbackNode=null,2}function N0(t,n){if(gn!==0&&gn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(kl()&&t.callbackNode!==a)return null;var o=Mt;return o=pe(t,t===Yt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(p0(t,o,n),L0(t,M()),t.callbackNode!=null&&t.callbackNode===a?N0.bind(null,t):null)}function O0(t,n){if(kl())return null;p0(t,n,!0)}function Nv(){qv(function(){(Ot&6)!==0?Pt(me,Lv):U0()})}function wf(){if(Fa===0){var t=Zr;t===0&&(t=ce,ce<<=1,(ce&261888)===0&&(ce=256)),Fa=t}return Fa}function P0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:$o(""+t)}function z0(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Ov(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=P0((u[mn]||null).action),g=o.submitter;g&&(n=(n=g[mn]||null)?P0(n.formAction):g.getAttribute("formAction"),n!==null&&(f=n,g=null));var E=new il("action","action",null,o,u);t.push({event:E,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Fa!==0){var B=g?z0(u,g):new FormData(u);Zc(a,{pending:!0,data:B,method:u.method,action:f},null,B)}}else typeof f=="function"&&(E.preventDefault(),B=g?z0(u,g):new FormData(u),Zc(a,{pending:!0,data:B,method:u.method,action:f},f,B))},currentTarget:u}]})}}for(var Uf=0;Uf<hc.length;Uf++){var Lf=hc[Uf],Pv=Lf.toLowerCase(),zv=Lf[0].toUpperCase()+Lf.slice(1);yi(Pv,"on"+zv)}yi(dp,"onAnimationEnd"),yi(pp,"onAnimationIteration"),yi(mp,"onAnimationStart"),yi("dblclick","onDoubleClick"),yi("focusin","onFocus"),yi("focusout","onBlur"),yi(J_,"onTransitionRun"),yi($_,"onTransitionStart"),yi(ev,"onTransitionCancel"),yi(xp,"onTransitionEnd"),Be("onMouseEnter",["mouseout","mouseover"]),Be("onMouseLeave",["mouseout","mouseover"]),Be("onPointerEnter",["pointerout","pointerover"]),Be("onPointerLeave",["pointerout","pointerover"]),Le("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Le("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Le("onBeforeInput",["compositionend","keypress","textInput","paste"]),Le("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Le("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Le("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Iv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eo));function I0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var f=void 0;if(n)for(var g=o.length-1;0<=g;g--){var E=o[g],B=E.instance,ne=E.currentTarget;if(E=E.listener,B!==f&&u.isPropagationStopped())break e;f=E,u.currentTarget=ne;try{f(u)}catch(xe){sl(xe)}u.currentTarget=null,f=B}else for(g=0;g<o.length;g++){if(E=o[g],B=E.instance,ne=E.currentTarget,E=E.listener,B!==f&&u.isPropagationStopped())break e;f=E,u.currentTarget=ne;try{f(u)}catch(xe){sl(xe)}u.currentTarget=null,f=B}}}}function bt(t,n){var a=n[Ir];a===void 0&&(a=n[Ir]=new Set);var o=t+"__bubble";a.has(o)||(F0(n,t,2,!1),a.add(o))}function Nf(t,n,a){var o=0;n&&(o|=4),F0(a,t,o,n)}var Wl="_reactListening"+Math.random().toString(36).slice(2);function Of(t){if(!t[Wl]){t[Wl]=!0,K.forEach(function(a){a!=="selectionchange"&&(Iv.has(a)||Nf(a,!1,t),Nf(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Wl]||(n[Wl]=!0,Nf("selectionchange",!1,n))}}function F0(t,n,a,o){switch(dx(n)){case 2:var u=fb;break;case 8:u=hb;break;default:u=Zf}a=u.bind(null,n,a,t),u=void 0,!$u||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Pf(t,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var g=o.tag;if(g===3||g===4){var E=o.stateNode.containerInfo;if(E===u)break;if(g===4)for(g=o.return;g!==null;){var B=g.tag;if((B===3||B===4)&&g.stateNode.containerInfo===u)return;g=g.return}for(;E!==null;){if(g=ba(E),g===null)return;if(B=g.tag,B===5||B===6||B===26||B===27){o=f=g;continue e}E=E.parentNode}}o=o.return}kd(function(){var ne=f,xe=Qu(a),ye=[];e:{var re=gp.get(t);if(re!==void 0){var ue=il,ke=t;switch(t){case"keypress":if(tl(a)===0)break e;case"keydown":case"keyup":ue=w_;break;case"focusin":ke="focus",ue=ic;break;case"focusout":ke="blur",ue=ic;break;case"beforeblur":case"afterblur":ue=ic;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ue=Wd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ue=__;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ue=N_;break;case dp:case pp:case mp:ue=y_;break;case xp:ue=P_;break;case"scroll":case"scrollend":ue=x_;break;case"wheel":ue=I_;break;case"copy":case"cut":case"paste":ue=M_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ue=jd;break;case"toggle":case"beforetoggle":ue=B_}var tt=(n&4)!==0,kt=!tt&&(t==="scroll"||t==="scrollend"),Z=tt?re!==null?re+"Capture":null:re;tt=[];for(var X=ne,ee;X!==null;){var ve=X;if(ee=ve.stateNode,ve=ve.tag,ve!==5&&ve!==26&&ve!==27||ee===null||Z===null||(ve=qs(X,Z),ve!=null&&tt.push(To(X,ve,ee))),kt)break;X=X.return}0<tt.length&&(re=new ue(re,ke,null,a,xe),ye.push({event:re,listeners:tt}))}}if((n&7)===0){e:{if(re=t==="mouseover"||t==="pointerover",ue=t==="mouseout"||t==="pointerout",re&&a!==Ku&&(ke=a.relatedTarget||a.fromElement)&&(ba(ke)||ke[Bi]))break e;if((ue||re)&&(re=xe.window===xe?xe:(re=xe.ownerDocument)?re.defaultView||re.parentWindow:window,ue?(ke=a.relatedTarget||a.toElement,ue=ne,ke=ke?ba(ke):null,ke!==null&&(kt=c(ke),tt=ke.tag,ke!==kt||tt!==5&&tt!==27&&tt!==6)&&(ke=null)):(ue=null,ke=ne),ue!==ke)){if(tt=Wd,ve="onMouseLeave",Z="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(tt=jd,ve="onPointerLeave",Z="onPointerEnter",X="pointer"),kt=ue==null?re:j(ue),ee=ke==null?re:j(ke),re=new tt(ve,X+"leave",ue,a,xe),re.target=kt,re.relatedTarget=ee,ve=null,ba(xe)===ne&&(tt=new tt(Z,X+"enter",ke,a,xe),tt.target=ee,tt.relatedTarget=kt,ve=tt),kt=ve,ue&&ke)t:{for(tt=Fv,Z=ue,X=ke,ee=0,ve=Z;ve;ve=tt(ve))ee++;ve=0;for(var Je=X;Je;Je=tt(Je))ve++;for(;0<ee-ve;)Z=tt(Z),ee--;for(;0<ve-ee;)X=tt(X),ve--;for(;ee--;){if(Z===X||X!==null&&Z===X.alternate){tt=Z;break t}Z=tt(Z),X=tt(X)}tt=null}else tt=null;ue!==null&&B0(ye,re,ue,tt,!1),ke!==null&&kt!==null&&B0(ye,kt,ke,tt,!0)}}e:{if(re=ne?j(ne):window,ue=re.nodeName&&re.nodeName.toLowerCase(),ue==="select"||ue==="input"&&re.type==="file")var Ut=np;else if(ep(re))if(ip)Ut=Z_;else{Ut=Y_;var Ye=W_}else ue=re.nodeName,!ue||ue.toLowerCase()!=="input"||re.type!=="checkbox"&&re.type!=="radio"?ne&&Zu(ne.elementType)&&(Ut=np):Ut=j_;if(Ut&&(Ut=Ut(t,ne))){tp(ye,Ut,a,xe);break e}Ye&&Ye(t,re,ne),t==="focusout"&&ne&&re.type==="number"&&ne.memoizedProps.value!=null&&Mn(re,"number",re.value)}switch(Ye=ne?j(ne):window,t){case"focusin":(ep(Ye)||Ye.contentEditable==="true")&&(Gr=Ye,uc=ne,$s=null);break;case"focusout":$s=uc=Gr=null;break;case"mousedown":cc=!0;break;case"contextmenu":case"mouseup":case"dragend":cc=!1,fp(ye,a,xe);break;case"selectionchange":if(Q_)break;case"keydown":case"keyup":fp(ye,a,xe)}var pt;if(rc)e:{switch(t){case"compositionstart":var Et="onCompositionStart";break e;case"compositionend":Et="onCompositionEnd";break e;case"compositionupdate":Et="onCompositionUpdate";break e}Et=void 0}else Hr?Jd(t,a)&&(Et="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Et="onCompositionStart");Et&&(Zd&&a.locale!=="ko"&&(Hr||Et!=="onCompositionStart"?Et==="onCompositionEnd"&&Hr&&(pt=Xd()):(Sa=xe,ec="value"in Sa?Sa.value:Sa.textContent,Hr=!0)),Ye=Yl(ne,Et),0<Ye.length&&(Et=new Yd(Et,t,null,a,xe),ye.push({event:Et,listeners:Ye}),pt?Et.data=pt:(pt=$d(a),pt!==null&&(Et.data=pt)))),(pt=G_?V_(t,a):k_(t,a))&&(Et=Yl(ne,"onBeforeInput"),0<Et.length&&(Ye=new Yd("onBeforeInput","beforeinput",null,a,xe),ye.push({event:Ye,listeners:Et}),Ye.data=pt)),Ov(ye,t,ne,a,xe)}I0(ye,n)})}function To(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Yl(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=qs(t,a),u!=null&&o.unshift(To(t,u,f)),u=qs(t,n),u!=null&&o.push(To(t,u,f))),t.tag===3)return o;t=t.return}return[]}function Fv(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function B0(t,n,a,o,u){for(var f=n._reactName,g=[];a!==null&&a!==o;){var E=a,B=E.alternate,ne=E.stateNode;if(E=E.tag,B!==null&&B===o)break;E!==5&&E!==26&&E!==27||ne===null||(B=ne,u?(ne=qs(a,f),ne!=null&&g.unshift(To(a,ne,B))):u||(ne=qs(a,f),ne!=null&&g.push(To(a,ne,B)))),a=a.return}g.length!==0&&t.push({event:n,listeners:g})}var Bv=/\r\n?/g,Hv=/\u0000|\uFFFD/g;function H0(t){return(typeof t=="string"?t:""+t).replace(Bv,`
`).replace(Hv,"")}function G0(t,n){return n=H0(n),H0(t)===n}function Vt(t,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||wi(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&wi(t,""+o);break;case"className":Dt(t,"class",o);break;case"tabIndex":Dt(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Dt(t,a,o);break;case"style":Gd(t,o,f);break;case"data":if(n!=="object"){Dt(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=$o(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Vt(t,n,"name",u.name,u,null),Vt(t,n,"formEncType",u.formEncType,u,null),Vt(t,n,"formMethod",u.formMethod,u,null),Vt(t,n,"formTarget",u.formTarget,u,null)):(Vt(t,n,"encType",u.encType,u,null),Vt(t,n,"method",u.method,u,null),Vt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=$o(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=Vi);break;case"onScroll":o!=null&&bt("scroll",t);break;case"onScrollEnd":o!=null&&bt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=$o(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":bt("beforetoggle",t),bt("toggle",t),dt(t,"popover",o);break;case"xlinkActuate":wt(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":wt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":wt(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":wt(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":wt(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":wt(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":wt(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":wt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":wt(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":dt(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=p_.get(a)||a,dt(t,a,o))}}function zf(t,n,a,o,u,f){switch(a){case"style":Gd(t,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"children":typeof o=="string"?wi(t,o):(typeof o=="number"||typeof o=="bigint")&&wi(t,""+o);break;case"onScroll":o!=null&&bt("scroll",t);break;case"onScrollEnd":o!=null&&bt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Vi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ce.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=t[mn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):dt(t,a,o)}}}function Un(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":bt("error",t),bt("load",t);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var g=a[f];if(g!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Vt(t,n,f,g,a,null)}}u&&Vt(t,n,"srcSet",a.srcSet,a,null),o&&Vt(t,n,"src",a.src,a,null);return;case"input":bt("invalid",t);var E=f=g=u=null,B=null,ne=null;for(o in a)if(a.hasOwnProperty(o)){var xe=a[o];if(xe!=null)switch(o){case"name":u=xe;break;case"type":g=xe;break;case"checked":B=xe;break;case"defaultChecked":ne=xe;break;case"value":f=xe;break;case"defaultValue":E=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(r(137,n));break;default:Vt(t,n,o,xe,a,null)}}Zt(t,f,E,B,ne,g,u,!1);return;case"select":bt("invalid",t),o=g=f=null;for(u in a)if(a.hasOwnProperty(u)&&(E=a[u],E!=null))switch(u){case"value":f=E;break;case"defaultValue":g=E;break;case"multiple":o=E;default:Vt(t,n,u,E,a,null)}n=f,a=g,t.multiple=!!o,n!=null?xn(t,!!o,n,!1):a!=null&&xn(t,!!o,a,!0);return;case"textarea":bt("invalid",t),f=u=o=null;for(g in a)if(a.hasOwnProperty(g)&&(E=a[g],E!=null))switch(g){case"value":o=E;break;case"defaultValue":u=E;break;case"children":f=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(91));break;default:Vt(t,n,g,E,a,null)}Rn(t,o,u,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(o=a[B],o!=null))switch(B){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Vt(t,n,B,o,a,null)}return;case"dialog":bt("beforetoggle",t),bt("toggle",t),bt("cancel",t),bt("close",t);break;case"iframe":case"object":bt("load",t);break;case"video":case"audio":for(o=0;o<Eo.length;o++)bt(Eo[o],t);break;case"image":bt("error",t),bt("load",t);break;case"details":bt("toggle",t);break;case"embed":case"source":case"link":bt("error",t),bt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ne in a)if(a.hasOwnProperty(ne)&&(o=a[ne],o!=null))switch(ne){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Vt(t,n,ne,o,a,null)}return;default:if(Zu(n)){for(xe in a)a.hasOwnProperty(xe)&&(o=a[xe],o!==void 0&&zf(t,n,xe,o,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(o=a[E],o!=null&&Vt(t,n,E,o,a,null))}function Gv(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,g=null,E=null,B=null,ne=null,xe=null;for(ue in a){var ye=a[ue];if(a.hasOwnProperty(ue)&&ye!=null)switch(ue){case"checked":break;case"value":break;case"defaultValue":B=ye;default:o.hasOwnProperty(ue)||Vt(t,n,ue,null,o,ye)}}for(var re in o){var ue=o[re];if(ye=a[re],o.hasOwnProperty(re)&&(ue!=null||ye!=null))switch(re){case"type":f=ue;break;case"name":u=ue;break;case"checked":ne=ue;break;case"defaultChecked":xe=ue;break;case"value":g=ue;break;case"defaultValue":E=ue;break;case"children":case"dangerouslySetInnerHTML":if(ue!=null)throw Error(r(137,n));break;default:ue!==ye&&Vt(t,n,re,ue,o,ye)}}Hi(t,g,E,B,ne,xe,f,u);return;case"select":ue=g=E=re=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":ue=B;default:o.hasOwnProperty(f)||Vt(t,n,f,null,o,B)}for(u in o)if(f=o[u],B=a[u],o.hasOwnProperty(u)&&(f!=null||B!=null))switch(u){case"value":re=f;break;case"defaultValue":E=f;break;case"multiple":g=f;default:f!==B&&Vt(t,n,u,f,o,B)}n=E,a=g,o=ue,re!=null?xn(t,!!a,re,!1):!!o!=!!a&&(n!=null?xn(t,!!a,n,!0):xn(t,!!a,a?[]:"",!1));return;case"textarea":ue=re=null;for(E in a)if(u=a[E],a.hasOwnProperty(E)&&u!=null&&!o.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Vt(t,n,E,null,o,u)}for(g in o)if(u=o[g],f=a[g],o.hasOwnProperty(g)&&(u!=null||f!=null))switch(g){case"value":re=u;break;case"defaultValue":ue=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Vt(t,n,g,u,o,f)}En(t,re,ue);return;case"option":for(var ke in a)if(re=a[ke],a.hasOwnProperty(ke)&&re!=null&&!o.hasOwnProperty(ke))switch(ke){case"selected":t.selected=!1;break;default:Vt(t,n,ke,null,o,re)}for(B in o)if(re=o[B],ue=a[B],o.hasOwnProperty(B)&&re!==ue&&(re!=null||ue!=null))switch(B){case"selected":t.selected=re&&typeof re!="function"&&typeof re!="symbol";break;default:Vt(t,n,B,re,o,ue)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var tt in a)re=a[tt],a.hasOwnProperty(tt)&&re!=null&&!o.hasOwnProperty(tt)&&Vt(t,n,tt,null,o,re);for(ne in o)if(re=o[ne],ue=a[ne],o.hasOwnProperty(ne)&&re!==ue&&(re!=null||ue!=null))switch(ne){case"children":case"dangerouslySetInnerHTML":if(re!=null)throw Error(r(137,n));break;default:Vt(t,n,ne,re,o,ue)}return;default:if(Zu(n)){for(var kt in a)re=a[kt],a.hasOwnProperty(kt)&&re!==void 0&&!o.hasOwnProperty(kt)&&zf(t,n,kt,void 0,o,re);for(xe in o)re=o[xe],ue=a[xe],!o.hasOwnProperty(xe)||re===ue||re===void 0&&ue===void 0||zf(t,n,xe,re,o,ue);return}}for(var Z in a)re=a[Z],a.hasOwnProperty(Z)&&re!=null&&!o.hasOwnProperty(Z)&&Vt(t,n,Z,null,o,re);for(ye in o)re=o[ye],ue=a[ye],!o.hasOwnProperty(ye)||re===ue||re==null&&ue==null||Vt(t,n,ye,re,o,ue)}function V0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Vv(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,g=u.initiatorType,E=u.duration;if(f&&E&&V0(g)){for(g=0,E=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],ne=B.startTime;if(ne>E)break;var xe=B.transferSize,ye=B.initiatorType;xe&&V0(ye)&&(B=B.responseEnd,g+=xe*(B<E?1:(E-ne)/(B-ne)))}if(--o,n+=8*(f+g)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var If=null,Ff=null;function jl(t){return t.nodeType===9?t:t.ownerDocument}function k0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function X0(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Bf(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Hf=null;function kv(){var t=window.event;return t&&t.type==="popstate"?t===Hf?!1:(Hf=t,!0):(Hf=null,!1)}var q0=typeof setTimeout=="function"?setTimeout:void 0,Xv=typeof clearTimeout=="function"?clearTimeout:void 0,W0=typeof Promise=="function"?Promise:void 0,qv=typeof queueMicrotask=="function"?queueMicrotask:typeof W0<"u"?function(t){return W0.resolve(null).then(t).catch(Wv)}:q0;function Wv(t){setTimeout(function(){throw t})}function Ba(t){return t==="head"}function Y0(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),ps(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Ao(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Ao(a);for(var f=a.firstChild;f;){var g=f.nextSibling,E=f.nodeName;f[rr]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=g}}else a==="body"&&Ao(t.ownerDocument.body);a=u}while(a);ps(n)}function j0(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function Gf(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Gf(a),Xs(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Yv(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[rr])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=di(t.nextSibling),t===null)break}return null}function jv(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=di(t.nextSibling),t===null))return null;return t}function Z0(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=di(t.nextSibling),t===null))return null;return t}function Vf(t){return t.data==="$?"||t.data==="$~"}function kf(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Zv(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function di(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Xf=null;function K0(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return di(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Q0(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function J0(t,n,a){switch(n=jl(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function Ao(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Xs(t)}var pi=new Map,$0=new Set;function Zl(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var aa=Y.d;Y.d={f:Kv,r:Qv,D:Jv,C:$v,L:eb,m:tb,X:ib,S:nb,M:ab};function Kv(){var t=aa.f(),n=Hl();return t||n}function Qv(t){var n=T(t);n!==null&&n.tag===5&&n.type==="form"?xm(n):aa.r(t)}var fs=typeof document>"u"?null:document;function ex(t,n,a){var o=fs;if(o&&typeof n=="string"&&n){var u=jt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),$0.has(u)||($0.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Un(n,"link",t),ie(n),o.head.appendChild(n)))}}function Jv(t){aa.D(t),ex("dns-prefetch",t,null)}function $v(t,n){aa.C(t,n),ex("preconnect",t,n)}function eb(t,n,a){aa.L(t,n,a);var o=fs;if(o&&t&&n){var u='link[rel="preload"][as="'+jt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+jt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+jt(a.imageSizes)+'"]')):u+='[href="'+jt(t)+'"]';var f=u;switch(n){case"style":f=hs(t);break;case"script":f=ds(t)}pi.has(f)||(t=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),pi.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Ro(f))||n==="script"&&o.querySelector(Co(f))||(n=o.createElement("link"),Un(n,"link",t),ie(n),o.head.appendChild(n)))}}function tb(t,n){aa.m(t,n);var a=fs;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+jt(o)+'"][href="'+jt(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=ds(t)}if(!pi.has(f)&&(t=_({rel:"modulepreload",href:t},n),pi.set(f,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Co(f)))return}o=a.createElement("link"),Un(o,"link",t),ie(o),a.head.appendChild(o)}}}function nb(t,n,a){aa.S(t,n,a);var o=fs;if(o&&t){var u=se(o).hoistableStyles,f=hs(t);n=n||"default";var g=u.get(f);if(!g){var E={loading:0,preload:null};if(g=o.querySelector(Ro(f)))E.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":n},a),(a=pi.get(f))&&qf(t,a);var B=g=o.createElement("link");ie(B),Un(B,"link",t),B._p=new Promise(function(ne,xe){B.onload=ne,B.onerror=xe}),B.addEventListener("load",function(){E.loading|=1}),B.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Kl(g,n,o)}g={type:"stylesheet",instance:g,count:1,state:E},u.set(f,g)}}}function ib(t,n){aa.X(t,n);var a=fs;if(a&&t){var o=se(a).hoistableScripts,u=ds(t),f=o.get(u);f||(f=a.querySelector(Co(u)),f||(t=_({src:t,async:!0},n),(n=pi.get(u))&&Wf(t,n),f=a.createElement("script"),ie(f),Un(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function ab(t,n){aa.M(t,n);var a=fs;if(a&&t){var o=se(a).hoistableScripts,u=ds(t),f=o.get(u);f||(f=a.querySelector(Co(u)),f||(t=_({src:t,async:!0,type:"module"},n),(n=pi.get(u))&&Wf(t,n),f=a.createElement("script"),ie(f),Un(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function tx(t,n,a,o){var u=(u=ae.current)?Zl(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=hs(a.href),a=se(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=hs(a.href);var f=se(u).hoistableStyles,g=f.get(t);if(g||(u=u.ownerDocument||u,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,g),(f=u.querySelector(Ro(t)))&&!f._p&&(g.instance=f,g.state.loading=5),pi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},pi.set(t,a),f||rb(u,t,a,g.state))),n&&o===null)throw Error(r(528,""));return g}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ds(a),a=se(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function hs(t){return'href="'+jt(t)+'"'}function Ro(t){return'link[rel="stylesheet"]['+t+"]"}function nx(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function rb(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Un(n,"link",a),ie(n),t.head.appendChild(n))}function ds(t){return'[src="'+jt(t)+'"]'}function Co(t){return"script[async]"+t}function ix(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+jt(a.href)+'"]');if(o)return n.instance=o,ie(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),ie(o),Un(o,"style",u),Kl(o,a.precedence,t),n.instance=o;case"stylesheet":u=hs(a.href);var f=t.querySelector(Ro(u));if(f)return n.state.loading|=4,n.instance=f,ie(f),f;o=nx(a),(u=pi.get(u))&&qf(o,u),f=(t.ownerDocument||t).createElement("link"),ie(f);var g=f;return g._p=new Promise(function(E,B){g.onload=E,g.onerror=B}),Un(f,"link",o),n.state.loading|=4,Kl(f,a.precedence,t),n.instance=f;case"script":return f=ds(a.src),(u=t.querySelector(Co(f)))?(n.instance=u,ie(u),u):(o=a,(u=pi.get(f))&&(o=_({},a),Wf(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),ie(u),Un(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Kl(o,a.precedence,t));return n.instance}function Kl(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,g=0;g<o.length;g++){var E=o[g];if(E.dataset.precedence===n)f=E;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function qf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Wf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Ql=null;function ax(t,n,a){if(Ql===null){var o=new Map,u=Ql=new Map;u.set(a,o)}else u=Ql,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[rr]||f[ln]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(n)||"";g=t+g;var E=o.get(g);E?E.push(f):o.set(g,[f])}}return o}function rx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function sb(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function sx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function ob(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=hs(o.href),f=n.querySelector(Ro(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Jl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,ie(f);return}f=n.ownerDocument||n,o=nx(o),(u=pi.get(u))&&qf(o,u),f=f.createElement("link"),ie(f);var g=f;g._p=new Promise(function(E,B){g.onload=E,g.onerror=B}),Un(f,"link",o),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Jl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Yf=0;function lb(t,n){return t.stylesheets&&t.count===0&&eu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&eu(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&Yf===0&&(Yf=62500*Vv());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&eu(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>Yf?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Jl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)eu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var $l=null;function eu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,$l=new Map,n.forEach(ub,t),$l=null,Jl.call(t))}function ub(t,n){if(!(n.state.loading&4)){var a=$l.get(t);if(a)var o=a.get(null);else{a=new Map,$l.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var g=u[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),o=g)}o&&a.set(null,o)}u=n.instance,g=u.getAttribute("data-precedence"),f=a.get(g)||o,f===o&&a.set(null,u),a.set(g,u),this.count++,o=Jl.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Do={$$typeof:L,Provider:null,Consumer:null,_currentValue:F,_currentValue2:F,_threadCount:0};function cb(t,n,a,o,u,f,g,E,B){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=gt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.hiddenUpdates=gt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function ox(t,n,a,o,u,f,g,E,B,ne,xe,ye){return t=new cb(t,n,a,g,B,ne,xe,ye,E),n=1,f===!0&&(n|=24),f=Qn(3,null,null,n),t.current=f,f.stateNode=t,n=Tc(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Dc(f),t}function lx(t){return t?(t=Xr,t):Xr}function ux(t,n,a,o,u,f){u=lx(u),o.context===null?o.context=u:o.pendingContext=u,o=Ca(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Da(t,o,n),a!==null&&(Xn(a,t,n),so(a,t,n))}function cx(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function jf(t,n){cx(t,n),(t=t.alternate)&&cx(t,n)}function fx(t){if(t.tag===13||t.tag===31){var n=ur(t,67108864);n!==null&&Xn(n,t,67108864),jf(t,67108864)}}function hx(t){if(t.tag===13||t.tag===31){var n=ni();n=bi(n);var a=ur(t,n);a!==null&&Xn(a,t,n),jf(t,n)}}var tu=!0;function fb(t,n,a,o){var u=z.T;z.T=null;var f=Y.p;try{Y.p=2,Zf(t,n,a,o)}finally{Y.p=f,z.T=u}}function hb(t,n,a,o){var u=z.T;z.T=null;var f=Y.p;try{Y.p=8,Zf(t,n,a,o)}finally{Y.p=f,z.T=u}}function Zf(t,n,a,o){if(tu){var u=Kf(o);if(u===null)Pf(t,n,o,nu,a),px(t,o);else if(pb(u,t,n,a,o))o.stopPropagation();else if(px(t,o),n&4&&-1<db.indexOf(t)){for(;u!==null;){var f=T(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=be(f.pendingLanes);if(g!==0){var E=f;for(E.pendingLanes|=2,E.entangledLanes|=2;g;){var B=1<<31-Ie(g);E.entanglements[1]|=B,g&=~B}Oi(f),(Ot&6)===0&&(Fl=M()+500,Mo(0))}}break;case 31:case 13:E=ur(f,2),E!==null&&Xn(E,f,2),Hl(),jf(f,2)}if(f=Kf(o),f===null&&Pf(t,n,o,nu,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Pf(t,n,o,null,a)}}function Kf(t){return t=Qu(t),Qf(t)}var nu=null;function Qf(t){if(nu=null,t=ba(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return nu=t,null}function dx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Q()){case me:return 2;case Me:return 8;case fe:case je:return 32;case we:return 268435456;default:return 32}default:return 32}}var Jf=!1,Ha=null,Ga=null,Va=null,wo=new Map,Uo=new Map,ka=[],db="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function px(t,n){switch(t){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":Ga=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":wo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Uo.delete(n.pointerId)}}function Lo(t,n,a,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=T(n),n!==null&&fx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function pb(t,n,a,o,u){switch(n){case"focusin":return Ha=Lo(Ha,t,n,a,o,u),!0;case"dragenter":return Ga=Lo(Ga,t,n,a,o,u),!0;case"mouseover":return Va=Lo(Va,t,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return wo.set(f,Lo(wo.get(f)||null,t,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Uo.set(f,Lo(Uo.get(f)||null,t,n,a,o,u)),!0}return!1}function mx(t){var n=ba(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,ks(t.priority,function(){hx(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,ks(t.priority,function(){hx(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function iu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Kf(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);Ku=o,a.target.dispatchEvent(o),Ku=null}else return n=T(a),n!==null&&fx(n),t.blockedOn=a,!1;n.shift()}return!0}function xx(t,n,a){iu(t)&&a.delete(n)}function mb(){Jf=!1,Ha!==null&&iu(Ha)&&(Ha=null),Ga!==null&&iu(Ga)&&(Ga=null),Va!==null&&iu(Va)&&(Va=null),wo.forEach(xx),Uo.forEach(xx)}function au(t,n){t.blockedOn===n&&(t.blockedOn=null,Jf||(Jf=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,mb)))}var ru=null;function gx(t){ru!==t&&(ru=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){ru===t&&(ru=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Qf(o||a)===null)continue;break}var f=T(a);f!==null&&(t.splice(n,3),n-=3,Zc(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function ps(t){function n(B){return au(B,t)}Ha!==null&&au(Ha,t),Ga!==null&&au(Ga,t),Va!==null&&au(Va,t),wo.forEach(n),Uo.forEach(n);for(var a=0;a<ka.length;a++){var o=ka[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ka.length&&(a=ka[0],a.blockedOn===null);)mx(a),a.blockedOn===null&&ka.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],g=u[mn]||null;if(typeof f=="function")g||gx(a);else if(g){var E=null;if(f&&f.hasAttribute("formAction")){if(u=f,g=f[mn]||null)E=g.formAction;else if(Qf(u)!==null)continue}else E=g.action;typeof E=="function"?a[o+1]=E:(a.splice(o,3),o-=3),gx(a)}}}function _x(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(g){return u=g})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function $f(t){this._internalRoot=t}su.prototype.render=$f.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ni();ux(a,o,t,n,null,null)},su.prototype.unmount=$f.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;ux(t.current,2,null,t,null,null),Hl(),n[Bi]=null}};function su(t){this._internalRoot=t}su.prototype.unstable_scheduleHydration=function(t){if(t){var n=Vs();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ka.length&&n!==0&&n<ka[a].priority;a++);ka.splice(a,0,t),a===0&&mx(t)}};var vx=e.version;if(vx!=="19.2.0")throw Error(r(527,vx,"19.2.0"));Y.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=p(n),t=t!==null?x(t):null,t=t===null?null:t.stateNode,t};var xb={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ou=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ou.isDisabled&&ou.supportsFiber)try{Te=ou.inject(xb),Ae=ou}catch{}}return Oo.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,o="",u=Am,f=Rm,g=Cm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=ox(t,1,!1,null,null,a,o,null,u,f,g,_x),t[Bi]=n.current,Of(t),new $f(n)},Oo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var o=!1,u="",f=Am,g=Rm,E=Cm,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=ox(t,1,!0,n,a??null,o,u,B,f,g,E,_x),n.context=lx(null),a=n.current,o=ni(),o=bi(o),u=Ca(o),u.callback=null,Da(a,u,o),a=o,n.current.lanes=a,$t(n,a),Oi(n),t[Bi]=n.current,Of(t),new su(n)},Oo.version="19.2.0",Oo}var Dx;function Ab(){if(Dx)return nh.exports;Dx=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),nh.exports=Tb(),nh.exports}var Rb=Ab();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cd="181",ws={ROTATE:0,DOLLY:1,PAN:2},Ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Cb=0,wx=1,Db=2,Og=1,wb=2,fa=3,nr=0,jn=1,ha=2,pa=0,Us=1,Ux=2,Lx=3,Nx=4,Ub=5,Cr=100,Lb=101,Nb=102,Ob=103,Pb=104,zb=200,Ib=201,Fb=202,Bb=203,Ih=204,Fh=205,Hb=206,Gb=207,Vb=208,kb=209,Xb=210,qb=211,Wb=212,Yb=213,jb=214,Bh=0,Hh=1,Gh=2,Os=3,Vh=4,kh=5,Xh=6,qh=7,Pg=0,Zb=1,Kb=2,ma=0,Qb=1,Jb=2,$b=3,ey=4,ty=5,ny=6,iy=7,zg=300,Ps=301,zs=302,Wh=303,Yh=304,Vu=306,jh=1e3,Ci=1001,Zh=1002,ri=1003,ay=1004,lu=1005,Yn=1006,sh=1007,wr=1008,ga=1009,Ig=1010,Fg=1011,Xo=1012,Dd=1013,Lr=1014,da=1015,Pr=1016,wd=1017,Ud=1018,qo=1020,Bg=35902,Hg=35899,Gg=1021,Vg=1022,vi=1023,Wo=1026,Yo=1027,kg=1028,Ld=1029,Nd=1030,Od=1031,Pd=1033,Lu=33776,Nu=33777,Ou=33778,Pu=33779,Kh=35840,Qh=35841,Jh=35842,$h=35843,ed=36196,td=37492,nd=37496,id=37808,ad=37809,rd=37810,sd=37811,od=37812,ld=37813,ud=37814,cd=37815,fd=37816,hd=37817,dd=37818,pd=37819,md=37820,xd=37821,gd=36492,_d=36494,vd=36495,bd=36283,yd=36284,Sd=36285,Md=36286,ry=3200,sy=3201,oy=0,ly=1,$a="",xi="srgb",Nr="srgb-linear",Fu="linear",Xt="srgb",ms=7680,Ox=519,uy=512,cy=513,fy=514,Xg=515,hy=516,dy=517,py=518,my=519,Px=35044,zx="300 es",zi=2e3,Bu=2001;function qg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Hu(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function xy(){const s=Hu("canvas");return s.style.display="block",s}const Ix={};function Fx(...s){const e="THREE."+s.shift();console.log(e,...s)}function ft(...s){const e="THREE."+s.shift();console.warn(e,...s)}function sn(...s){const e="THREE."+s.shift();console.error(e,...s)}function jo(...s){const e=s.join(" ");e in Ix||(Ix[e]=!0,ft(...s))}function gy(s,e,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}class zr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,e);e.target=null}}}const On=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zu=Math.PI/180,Ed=180/Math.PI;function Zo(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(On[s&255]+On[s>>8&255]+On[s>>16&255]+On[s>>24&255]+"-"+On[e&255]+On[e>>8&255]+"-"+On[e>>16&15|64]+On[e>>24&255]+"-"+On[i&63|128]+On[i>>8&255]+"-"+On[i>>16&255]+On[i>>24&255]+On[r&255]+On[r>>8&255]+On[r>>16&255]+On[r>>24&255]).toLowerCase()}function yt(s,e,i){return Math.max(e,Math.min(i,s))}function _y(s,e){return(s%e+e)%e}function oh(s,e,i){return(1-i)*s+i*e}function Po(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function qn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const vy={DEG2RAD:zu};class ct{constructor(e=0,i=0){ct.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=yt(this.x,e.x,i.x),this.y=yt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=yt(this.x,e,i),this.y=yt(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(yt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(yt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-e.x,h=this.y-e.y;return this.x=c*r-h*l+e.x,this.y=c*l+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Or{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,c,h,d){let m=r[l+0],p=r[l+1],x=r[l+2],_=r[l+3],v=c[h+0],S=c[h+1],A=c[h+2],D=c[h+3];if(d<=0){e[i+0]=m,e[i+1]=p,e[i+2]=x,e[i+3]=_;return}if(d>=1){e[i+0]=v,e[i+1]=S,e[i+2]=A,e[i+3]=D;return}if(_!==D||m!==v||p!==S||x!==A){let y=m*v+p*S+x*A+_*D;y<0&&(v=-v,S=-S,A=-A,D=-D,y=-y);let b=1-d;if(y<.9995){const P=Math.acos(y),L=Math.sin(P);b=Math.sin(b*P)/L,d=Math.sin(d*P)/L,m=m*b+v*d,p=p*b+S*d,x=x*b+A*d,_=_*b+D*d}else{m=m*b+v*d,p=p*b+S*d,x=x*b+A*d,_=_*b+D*d;const P=1/Math.sqrt(m*m+p*p+x*x+_*_);m*=P,p*=P,x*=P,_*=P}}e[i]=m,e[i+1]=p,e[i+2]=x,e[i+3]=_}static multiplyQuaternionsFlat(e,i,r,l,c,h){const d=r[l],m=r[l+1],p=r[l+2],x=r[l+3],_=c[h],v=c[h+1],S=c[h+2],A=c[h+3];return e[i]=d*A+x*_+m*S-p*v,e[i+1]=m*A+x*v+p*_-d*S,e[i+2]=p*A+x*S+d*v-m*_,e[i+3]=x*A-d*_-m*v-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,c=e._z,h=e._order,d=Math.cos,m=Math.sin,p=d(r/2),x=d(l/2),_=d(c/2),v=m(r/2),S=m(l/2),A=m(c/2);switch(h){case"XYZ":this._x=v*x*_+p*S*A,this._y=p*S*_-v*x*A,this._z=p*x*A+v*S*_,this._w=p*x*_-v*S*A;break;case"YXZ":this._x=v*x*_+p*S*A,this._y=p*S*_-v*x*A,this._z=p*x*A-v*S*_,this._w=p*x*_+v*S*A;break;case"ZXY":this._x=v*x*_-p*S*A,this._y=p*S*_+v*x*A,this._z=p*x*A+v*S*_,this._w=p*x*_-v*S*A;break;case"ZYX":this._x=v*x*_-p*S*A,this._y=p*S*_+v*x*A,this._z=p*x*A-v*S*_,this._w=p*x*_+v*S*A;break;case"YZX":this._x=v*x*_+p*S*A,this._y=p*S*_+v*x*A,this._z=p*x*A-v*S*_,this._w=p*x*_-v*S*A;break;case"XZY":this._x=v*x*_-p*S*A,this._y=p*S*_-v*x*A,this._z=p*x*A+v*S*_,this._w=p*x*_+v*S*A;break;default:ft("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],x=i[6],_=i[10],v=r+d+_;if(v>0){const S=.5/Math.sqrt(v+1);this._w=.25/S,this._x=(x-m)*S,this._y=(c-p)*S,this._z=(h-l)*S}else if(r>d&&r>_){const S=2*Math.sqrt(1+r-d-_);this._w=(x-m)/S,this._x=.25*S,this._y=(l+h)/S,this._z=(c+p)/S}else if(d>_){const S=2*Math.sqrt(1+d-r-_);this._w=(c-p)/S,this._x=(l+h)/S,this._y=.25*S,this._z=(m+x)/S}else{const S=2*Math.sqrt(1+_-r-d);this._w=(h-l)/S,this._x=(c+p)/S,this._y=(m+x)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,c=e._z,h=e._w,d=i._x,m=i._y,p=i._z,x=i._w;return this._x=r*x+h*d+l*p-c*m,this._y=l*x+h*m+c*d-r*p,this._z=c*x+h*p+r*m-l*d,this._w=h*x-r*d-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){if(i<=0)return this;if(i>=1)return this.copy(e);let r=e._x,l=e._y,c=e._z,h=e._w,d=this.dot(e);d<0&&(r=-r,l=-l,c=-c,h=-h,d=-d);let m=1-i;if(d<.9995){const p=Math.acos(d),x=Math.sin(p);m=Math.sin(m*p)/x,i=Math.sin(i*p)/x,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class oe{constructor(e=0,i=0,r=0){oe.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Bx.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Bx.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=e.elements,h=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,c=e.x,h=e.y,d=e.z,m=e.w,p=2*(h*l-d*r),x=2*(d*i-c*l),_=2*(c*r-h*i);return this.x=i+m*p+h*_-d*x,this.y=r+m*x+d*p-c*_,this.z=l+m*_+c*x-h*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=yt(this.x,e.x,i.x),this.y=yt(this.y,e.y,i.y),this.z=yt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=yt(this.x,e,i),this.y=yt(this.y,e,i),this.z=yt(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(yt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,c=e.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-r*m,this.z=r*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return lh.copy(this).projectOnVector(e),this.sub(lh)}reflect(e){return this.sub(lh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(yt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lh=new oe,Bx=new Or;class mt{constructor(e,i,r,l,c,h,d,m,p){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,h,d,m,p)}set(e,i,r,l,c,h,d,m,p){const x=this.elements;return x[0]=e,x[1]=l,x[2]=d,x[3]=i,x[4]=c,x[5]=m,x[6]=r,x[7]=h,x[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,h=r[0],d=r[3],m=r[6],p=r[1],x=r[4],_=r[7],v=r[2],S=r[5],A=r[8],D=l[0],y=l[3],b=l[6],P=l[1],L=l[4],H=l[7],q=l[2],O=l[5],I=l[8];return c[0]=h*D+d*P+m*q,c[3]=h*y+d*L+m*O,c[6]=h*b+d*H+m*I,c[1]=p*D+x*P+_*q,c[4]=p*y+x*L+_*O,c[7]=p*b+x*H+_*I,c[2]=v*D+S*P+A*q,c[5]=v*y+S*L+A*O,c[8]=v*b+S*H+A*I,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],x=e[8];return i*h*x-i*d*p-r*c*x+r*d*m+l*c*p-l*h*m}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],x=e[8],_=x*h-d*p,v=d*m-x*c,S=p*c-h*m,A=i*_+r*v+l*S;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/A;return e[0]=_*D,e[1]=(l*p-x*r)*D,e[2]=(d*r-l*h)*D,e[3]=v*D,e[4]=(x*i-l*m)*D,e[5]=(l*c-d*i)*D,e[6]=S*D,e[7]=(r*m-p*i)*D,e[8]=(h*i-r*c)*D,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(r*m,r*p,-r*(m*h+p*d)+h+e,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(uh.makeScale(e,i)),this}rotate(e){return this.premultiply(uh.makeRotation(-e)),this}translate(e,i){return this.premultiply(uh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uh=new mt,Hx=new mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gx=new mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function by(){const s={enabled:!0,workingColorSpace:Nr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Xt&&(l.r=xa(l.r),l.g=xa(l.g),l.b=xa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Xt&&(l.r=Ls(l.r),l.g=Ls(l.g),l.b=Ls(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===$a?Fu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return jo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return jo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Nr]:{primaries:e,whitePoint:r,transfer:Fu,toXYZ:Hx,fromXYZ:Gx,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:xi},outputColorSpaceConfig:{drawingBufferColorSpace:xi}},[xi]:{primaries:e,whitePoint:r,transfer:Xt,toXYZ:Hx,fromXYZ:Gx,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:xi}}}),s}const Nt=by();function xa(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let xs;class yy{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{xs===void 0&&(xs=Hu("canvas")),xs.width=e.width,xs.height=e.height;const l=xs.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=xs}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Hu("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=xa(c[h]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(xa(i[r]/255)*255):i[r]=xa(i[r]);return{data:i,width:e.width,height:e.height}}else return ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sy=0;class zd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=Zo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(ch(l[h].image)):c.push(ch(l[h]))}else c=ch(l);r.url=c}return i||(e.images[this.uuid]=r),r}}function ch(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?yy.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(ft("Texture: Unable to serialize Texture."),{})}let My=0;const fh=new oe;class Fn extends zr{constructor(e=Fn.DEFAULT_IMAGE,i=Fn.DEFAULT_MAPPING,r=Ci,l=Ci,c=Yn,h=wr,d=vi,m=ga,p=Fn.DEFAULT_ANISOTROPY,x=$a){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:My++}),this.uuid=Zo(),this.name="",this.source=new zd(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fh).x}get height(){return this.source.getSize(fh).y}get depth(){return this.source.getSize(fh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){ft(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ft(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jh:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case Zh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jh:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case Zh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=zg;Fn.DEFAULT_ANISOTROPY=1;class on{constructor(e=0,i=0,r=0,l=1){on.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,c;const m=e.elements,p=m[0],x=m[4],_=m[8],v=m[1],S=m[5],A=m[9],D=m[2],y=m[6],b=m[10];if(Math.abs(x-v)<.01&&Math.abs(_-D)<.01&&Math.abs(A-y)<.01){if(Math.abs(x+v)<.1&&Math.abs(_+D)<.1&&Math.abs(A+y)<.1&&Math.abs(p+S+b-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const L=(p+1)/2,H=(S+1)/2,q=(b+1)/2,O=(x+v)/4,I=(_+D)/4,te=(A+y)/4;return L>H&&L>q?L<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(L),l=O/r,c=I/r):H>q?H<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(H),r=O/l,c=te/l):q<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(q),r=I/c,l=te/c),this.set(r,l,c,i),this}let P=Math.sqrt((y-A)*(y-A)+(_-D)*(_-D)+(v-x)*(v-x));return Math.abs(P)<.001&&(P=1),this.x=(y-A)/P,this.y=(_-D)/P,this.z=(v-x)/P,this.w=Math.acos((p+S+b-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=yt(this.x,e.x,i.x),this.y=yt(this.y,e.y,i.y),this.z=yt(this.z,e.z,i.z),this.w=yt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=yt(this.x,e,i),this.y=yt(this.y,e,i),this.z=yt(this.z,e,i),this.w=yt(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(yt(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ey extends zr{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new on(0,0,e,i),this.scissorTest=!1,this.viewport=new on(0,0,e,i);const l={width:e,height:i,depth:r.depth},c=new Fn(l);this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const i={minFilter:Yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new zd(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ir extends Ey{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Wg extends Fn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=ri,this.minFilter=ri,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ty extends Fn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=ri,this.minFilter=ri,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ko{constructor(e=new oe(1/0,1/0,1/0),i=new oe(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Ei.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Ei.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Ei.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Ei):Ei.fromBufferAttribute(c,h),Ei.applyMatrix4(e.matrixWorld),this.expandByPoint(Ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uu.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),uu.copy(r.boundingBox)),uu.applyMatrix4(e.matrixWorld),this.union(uu)}const l=e.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ei),Ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zo),cu.subVectors(this.max,zo),gs.subVectors(e.a,zo),_s.subVectors(e.b,zo),vs.subVectors(e.c,zo),qa.subVectors(_s,gs),Wa.subVectors(vs,_s),Sr.subVectors(gs,vs);let i=[0,-qa.z,qa.y,0,-Wa.z,Wa.y,0,-Sr.z,Sr.y,qa.z,0,-qa.x,Wa.z,0,-Wa.x,Sr.z,0,-Sr.x,-qa.y,qa.x,0,-Wa.y,Wa.x,0,-Sr.y,Sr.x,0];return!hh(i,gs,_s,vs,cu)||(i=[1,0,0,0,1,0,0,0,1],!hh(i,gs,_s,vs,cu))?!1:(fu.crossVectors(qa,Wa),i=[fu.x,fu.y,fu.z],hh(i,gs,_s,vs,cu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ra[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ra[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ra[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ra[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ra[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ra[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ra[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ra[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ra),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ra=[new oe,new oe,new oe,new oe,new oe,new oe,new oe,new oe],Ei=new oe,uu=new Ko,gs=new oe,_s=new oe,vs=new oe,qa=new oe,Wa=new oe,Sr=new oe,zo=new oe,cu=new oe,fu=new oe,Mr=new oe;function hh(s,e,i,r,l){for(let c=0,h=s.length-3;c<=h;c+=3){Mr.fromArray(s,c);const d=l.x*Math.abs(Mr.x)+l.y*Math.abs(Mr.y)+l.z*Math.abs(Mr.z),m=e.dot(Mr),p=i.dot(Mr),x=r.dot(Mr);if(Math.max(-Math.max(m,p,x),Math.min(m,p,x))>d)return!1}return!0}const Ay=new Ko,Io=new oe,dh=new oe;class Id{constructor(e=new oe,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):Ay.setFromPoints(e).getCenter(r);let l=0;for(let c=0,h=e.length;c<h;c++)l=Math.max(l,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Io.subVectors(e,this.center);const i=Io.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Io,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Io.copy(e.center).add(dh)),this.expandByPoint(Io.copy(e.center).sub(dh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const sa=new oe,ph=new oe,hu=new oe,Ya=new oe,mh=new oe,du=new oe,xh=new oe;class Yg{constructor(e=new oe,i=new oe(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sa)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=sa.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(sa.copy(this.origin).addScaledVector(this.direction,i),sa.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){ph.copy(e).add(i).multiplyScalar(.5),hu.copy(i).sub(e).normalize(),Ya.copy(this.origin).sub(ph);const c=e.distanceTo(i)*.5,h=-this.direction.dot(hu),d=Ya.dot(this.direction),m=-Ya.dot(hu),p=Ya.lengthSq(),x=Math.abs(1-h*h);let _,v,S,A;if(x>0)if(_=h*m-d,v=h*d-m,A=c*x,_>=0)if(v>=-A)if(v<=A){const D=1/x;_*=D,v*=D,S=_*(_+h*v+2*d)+v*(h*_+v+2*m)+p}else v=c,_=Math.max(0,-(h*v+d)),S=-_*_+v*(v+2*m)+p;else v=-c,_=Math.max(0,-(h*v+d)),S=-_*_+v*(v+2*m)+p;else v<=-A?(_=Math.max(0,-(-h*c+d)),v=_>0?-c:Math.min(Math.max(-c,-m),c),S=-_*_+v*(v+2*m)+p):v<=A?(_=0,v=Math.min(Math.max(-c,-m),c),S=v*(v+2*m)+p):(_=Math.max(0,-(h*c+d)),v=_>0?c:Math.min(Math.max(-c,-m),c),S=-_*_+v*(v+2*m)+p);else v=h>0?-c:c,_=Math.max(0,-(h*v+d)),S=-_*_+v*(v+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(ph).addScaledVector(hu,v),S}intersectSphere(e,i){sa.subVectors(e.center,this.origin);const r=sa.dot(this.direction),l=sa.dot(sa)-r*r,c=e.radius*e.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=r-h,m=r+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,c,h,d,m;const p=1/this.direction.x,x=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(r=(e.min.x-v.x)*p,l=(e.max.x-v.x)*p):(r=(e.max.x-v.x)*p,l=(e.min.x-v.x)*p),x>=0?(c=(e.min.y-v.y)*x,h=(e.max.y-v.y)*x):(c=(e.max.y-v.y)*x,h=(e.min.y-v.y)*x),r>h||c>l||((c>r||isNaN(r))&&(r=c),(h<l||isNaN(l))&&(l=h),_>=0?(d=(e.min.z-v.z)*_,m=(e.max.z-v.z)*_):(d=(e.max.z-v.z)*_,m=(e.min.z-v.z)*_),r>m||d>l)||((d>r||r!==r)&&(r=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,sa)!==null}intersectTriangle(e,i,r,l,c){mh.subVectors(i,e),du.subVectors(r,e),xh.crossVectors(mh,du);let h=this.direction.dot(xh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ya.subVectors(this.origin,e);const m=d*this.direction.dot(du.crossVectors(Ya,du));if(m<0)return null;const p=d*this.direction.dot(mh.cross(Ya));if(p<0||m+p>h)return null;const x=-d*Ya.dot(xh);return x<0?null:this.at(x/h,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vn{constructor(e,i,r,l,c,h,d,m,p,x,_,v,S,A,D,y){vn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,h,d,m,p,x,_,v,S,A,D,y)}set(e,i,r,l,c,h,d,m,p,x,_,v,S,A,D,y){const b=this.elements;return b[0]=e,b[4]=i,b[8]=r,b[12]=l,b[1]=c,b[5]=h,b[9]=d,b[13]=m,b[2]=p,b[6]=x,b[10]=_,b[14]=v,b[3]=S,b[7]=A,b[11]=D,b[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vn().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,l=1/bs.setFromMatrixColumn(e,0).length(),c=1/bs.setFromMatrixColumn(e,1).length(),h=1/bs.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,c=e.z,h=Math.cos(r),d=Math.sin(r),m=Math.cos(l),p=Math.sin(l),x=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const v=h*x,S=h*_,A=d*x,D=d*_;i[0]=m*x,i[4]=-m*_,i[8]=p,i[1]=S+A*p,i[5]=v-D*p,i[9]=-d*m,i[2]=D-v*p,i[6]=A+S*p,i[10]=h*m}else if(e.order==="YXZ"){const v=m*x,S=m*_,A=p*x,D=p*_;i[0]=v+D*d,i[4]=A*d-S,i[8]=h*p,i[1]=h*_,i[5]=h*x,i[9]=-d,i[2]=S*d-A,i[6]=D+v*d,i[10]=h*m}else if(e.order==="ZXY"){const v=m*x,S=m*_,A=p*x,D=p*_;i[0]=v-D*d,i[4]=-h*_,i[8]=A+S*d,i[1]=S+A*d,i[5]=h*x,i[9]=D-v*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(e.order==="ZYX"){const v=h*x,S=h*_,A=d*x,D=d*_;i[0]=m*x,i[4]=A*p-S,i[8]=v*p+D,i[1]=m*_,i[5]=D*p+v,i[9]=S*p-A,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(e.order==="YZX"){const v=h*m,S=h*p,A=d*m,D=d*p;i[0]=m*x,i[4]=D-v*_,i[8]=A*_+S,i[1]=_,i[5]=h*x,i[9]=-d*x,i[2]=-p*x,i[6]=S*_+A,i[10]=v-D*_}else if(e.order==="XZY"){const v=h*m,S=h*p,A=d*m,D=d*p;i[0]=m*x,i[4]=-_,i[8]=p*x,i[1]=v*_+D,i[5]=h*x,i[9]=S*_-A,i[2]=A*_-S,i[6]=d*x,i[10]=D*_+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ry,e,Cy)}lookAt(e,i,r){const l=this.elements;return ii.subVectors(e,i),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),ja.crossVectors(r,ii),ja.lengthSq()===0&&(Math.abs(r.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),ja.crossVectors(r,ii)),ja.normalize(),pu.crossVectors(ii,ja),l[0]=ja.x,l[4]=pu.x,l[8]=ii.x,l[1]=ja.y,l[5]=pu.y,l[9]=ii.y,l[2]=ja.z,l[6]=pu.z,l[10]=ii.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,h=r[0],d=r[4],m=r[8],p=r[12],x=r[1],_=r[5],v=r[9],S=r[13],A=r[2],D=r[6],y=r[10],b=r[14],P=r[3],L=r[7],H=r[11],q=r[15],O=l[0],I=l[4],te=l[8],U=l[12],C=l[1],V=l[5],$=l[9],le=l[13],_e=l[2],de=l[6],z=l[10],Y=l[14],F=l[3],k=l[7],W=l[11],R=l[15];return c[0]=h*O+d*C+m*_e+p*F,c[4]=h*I+d*V+m*de+p*k,c[8]=h*te+d*$+m*z+p*W,c[12]=h*U+d*le+m*Y+p*R,c[1]=x*O+_*C+v*_e+S*F,c[5]=x*I+_*V+v*de+S*k,c[9]=x*te+_*$+v*z+S*W,c[13]=x*U+_*le+v*Y+S*R,c[2]=A*O+D*C+y*_e+b*F,c[6]=A*I+D*V+y*de+b*k,c[10]=A*te+D*$+y*z+b*W,c[14]=A*U+D*le+y*Y+b*R,c[3]=P*O+L*C+H*_e+q*F,c[7]=P*I+L*V+H*de+q*k,c[11]=P*te+L*$+H*z+q*W,c[15]=P*U+L*le+H*Y+q*R,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[12],h=e[1],d=e[5],m=e[9],p=e[13],x=e[2],_=e[6],v=e[10],S=e[14],A=e[3],D=e[7],y=e[11],b=e[15];return A*(+c*m*_-l*p*_-c*d*v+r*p*v+l*d*S-r*m*S)+D*(+i*m*S-i*p*v+c*h*v-l*h*S+l*p*x-c*m*x)+y*(+i*p*_-i*d*S-c*h*_+r*h*S+c*d*x-r*p*x)+b*(-l*d*x-i*m*_+i*d*v+l*h*_-r*h*v+r*m*x)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],x=e[8],_=e[9],v=e[10],S=e[11],A=e[12],D=e[13],y=e[14],b=e[15],P=_*y*p-D*v*p+D*m*S-d*y*S-_*m*b+d*v*b,L=A*v*p-x*y*p-A*m*S+h*y*S+x*m*b-h*v*b,H=x*D*p-A*_*p+A*d*S-h*D*S-x*d*b+h*_*b,q=A*_*m-x*D*m-A*d*v+h*D*v+x*d*y-h*_*y,O=i*P+r*L+l*H+c*q;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/O;return e[0]=P*I,e[1]=(D*v*c-_*y*c-D*l*S+r*y*S+_*l*b-r*v*b)*I,e[2]=(d*y*c-D*m*c+D*l*p-r*y*p-d*l*b+r*m*b)*I,e[3]=(_*m*c-d*v*c-_*l*p+r*v*p+d*l*S-r*m*S)*I,e[4]=L*I,e[5]=(x*y*c-A*v*c+A*l*S-i*y*S-x*l*b+i*v*b)*I,e[6]=(A*m*c-h*y*c-A*l*p+i*y*p+h*l*b-i*m*b)*I,e[7]=(h*v*c-x*m*c+x*l*p-i*v*p-h*l*S+i*m*S)*I,e[8]=H*I,e[9]=(A*_*c-x*D*c-A*r*S+i*D*S+x*r*b-i*_*b)*I,e[10]=(h*D*c-A*d*c+A*r*p-i*D*p-h*r*b+i*d*b)*I,e[11]=(x*d*c-h*_*c-x*r*p+i*_*p+h*r*S-i*d*S)*I,e[12]=q*I,e[13]=(x*D*l-A*_*l+A*r*v-i*D*v-x*r*y+i*_*y)*I,e[14]=(A*d*l-h*D*l-A*r*m+i*D*m+h*r*y-i*d*y)*I,e[15]=(h*_*l-x*d*l+x*r*m-i*_*m-h*r*v+i*d*v)*I,this}scale(e){const i=this.elements,r=e.x,l=e.y,c=e.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,h=e.x,d=e.y,m=e.z,p=c*h,x=c*d;return this.set(p*h+r,p*d-l*m,p*m+l*d,0,p*d+l*m,x*d+r,x*m-l*h,0,p*m-l*d,x*m+l*h,c*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,c,h){return this.set(1,r,c,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,x=h+h,_=d+d,v=c*p,S=c*x,A=c*_,D=h*x,y=h*_,b=d*_,P=m*p,L=m*x,H=m*_,q=r.x,O=r.y,I=r.z;return l[0]=(1-(D+b))*q,l[1]=(S+H)*q,l[2]=(A-L)*q,l[3]=0,l[4]=(S-H)*O,l[5]=(1-(v+b))*O,l[6]=(y+P)*O,l[7]=0,l[8]=(A+L)*I,l[9]=(y-P)*I,l[10]=(1-(v+D))*I,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;let c=bs.set(l[0],l[1],l[2]).length();const h=bs.set(l[4],l[5],l[6]).length(),d=bs.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),e.x=l[12],e.y=l[13],e.z=l[14],Ti.copy(this);const p=1/c,x=1/h,_=1/d;return Ti.elements[0]*=p,Ti.elements[1]*=p,Ti.elements[2]*=p,Ti.elements[4]*=x,Ti.elements[5]*=x,Ti.elements[6]*=x,Ti.elements[8]*=_,Ti.elements[9]*=_,Ti.elements[10]*=_,i.setFromRotationMatrix(Ti),r.x=c,r.y=h,r.z=d,this}makePerspective(e,i,r,l,c,h,d=zi,m=!1){const p=this.elements,x=2*c/(i-e),_=2*c/(r-l),v=(i+e)/(i-e),S=(r+l)/(r-l);let A,D;if(m)A=c/(h-c),D=h*c/(h-c);else if(d===zi)A=-(h+c)/(h-c),D=-2*h*c/(h-c);else if(d===Bu)A=-h/(h-c),D=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=x,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=A,p[14]=D,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,r,l,c,h,d=zi,m=!1){const p=this.elements,x=2/(i-e),_=2/(r-l),v=-(i+e)/(i-e),S=-(r+l)/(r-l);let A,D;if(m)A=1/(h-c),D=h/(h-c);else if(d===zi)A=-2/(h-c),D=-(h+c)/(h-c);else if(d===Bu)A=-1/(h-c),D=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=x,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=_,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=A,p[14]=D,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const bs=new oe,Ti=new vn,Ry=new oe(0,0,0),Cy=new oe(1,1,1),ja=new oe,pu=new oe,ii=new oe,Vx=new vn,kx=new Or;class _a{constructor(e=0,i=0,r=0,l=_a.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],x=l[9],_=l[2],v=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(yt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-x,S),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(yt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-yt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(yt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-yt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-x,S),this._y=0);break;default:ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return Vx.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vx,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return kx.setFromEuler(this),this.setFromQuaternion(kx,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_a.DEFAULT_ORDER="XYZ";class jg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Dy=0;const Xx=new oe,ys=new Or,oa=new vn,mu=new oe,Fo=new oe,wy=new oe,Uy=new Or,qx=new oe(1,0,0),Wx=new oe(0,1,0),Yx=new oe(0,0,1),jx={type:"added"},Ly={type:"removed"},Ss={type:"childadded",child:null},gh={type:"childremoved",child:null};class si extends zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dy++}),this.uuid=Zo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=si.DEFAULT_UP.clone();const e=new oe,i=new _a,r=new Or,l=new oe(1,1,1);function c(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new vn},normalMatrix:{value:new mt}}),this.matrix=new vn,this.matrixWorld=new vn,this.matrixAutoUpdate=si.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=si.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return ys.setFromAxisAngle(e,i),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,i){return ys.setFromAxisAngle(e,i),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(qx,e)}rotateY(e){return this.rotateOnAxis(Wx,e)}rotateZ(e){return this.rotateOnAxis(Yx,e)}translateOnAxis(e,i){return Xx.copy(e).applyQuaternion(this.quaternion),this.position.add(Xx.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(qx,e)}translateY(e){return this.translateOnAxis(Wx,e)}translateZ(e){return this.translateOnAxis(Yx,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oa.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?mu.copy(e):mu.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oa.lookAt(Fo,mu,this.up):oa.lookAt(mu,Fo,this.up),this.quaternion.setFromRotationMatrix(oa),l&&(oa.extractRotation(l.matrixWorld),ys.setFromRotationMatrix(oa),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(sn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jx),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):sn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(Ly),gh.child=e,this.dispatchEvent(gh),gh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oa.multiply(e.parent.matrixWorld)),e.applyMatrix4(oa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jx),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fo,e,wy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fo,Uy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,x=m.length;p<x;p++){const _=m[p];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(e.materials,this.material[m]));l.material=d}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(e.animations,m))}}if(i){const d=h(e.geometries),m=h(e.materials),p=h(e.textures),x=h(e.images),_=h(e.shapes),v=h(e.skeletons),S=h(e.animations),A=h(e.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),x.length>0&&(r.images=x),_.length>0&&(r.shapes=_),v.length>0&&(r.skeletons=v),S.length>0&&(r.animations=S),A.length>0&&(r.nodes=A)}return r.object=l,r;function h(d){const m=[];for(const p in d){const x=d[p];delete x.metadata,m.push(x)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}si.DEFAULT_UP=new oe(0,1,0);si.DEFAULT_MATRIX_AUTO_UPDATE=!0;si.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ai=new oe,la=new oe,_h=new oe,ua=new oe,Ms=new oe,Es=new oe,Zx=new oe,vh=new oe,bh=new oe,yh=new oe,Sh=new on,Mh=new on,Eh=new on;class Ri{constructor(e=new oe,i=new oe,r=new oe){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Ai.subVectors(e,i),l.cross(Ai);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,r,l,c){Ai.subVectors(l,i),la.subVectors(r,i),_h.subVectors(e,i);const h=Ai.dot(Ai),d=Ai.dot(la),m=Ai.dot(_h),p=la.dot(la),x=la.dot(_h),_=h*p-d*d;if(_===0)return c.set(0,0,0),null;const v=1/_,S=(p*m-d*x)*v,A=(h*x-d*m)*v;return c.set(1-S-A,A,S)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,ua)===null?!1:ua.x>=0&&ua.y>=0&&ua.x+ua.y<=1}static getInterpolation(e,i,r,l,c,h,d,m){return this.getBarycoord(e,i,r,l,ua)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ua.x),m.addScaledVector(h,ua.y),m.addScaledVector(d,ua.z),m)}static getInterpolatedAttribute(e,i,r,l,c,h){return Sh.setScalar(0),Mh.setScalar(0),Eh.setScalar(0),Sh.fromBufferAttribute(e,i),Mh.fromBufferAttribute(e,r),Eh.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Sh,c.x),h.addScaledVector(Mh,c.y),h.addScaledVector(Eh,c.z),h}static isFrontFacing(e,i,r,l){return Ai.subVectors(r,i),la.subVectors(e,i),Ai.cross(la).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),la.subVectors(this.a,this.b),Ai.cross(la).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ri.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,c){return Ri.getInterpolation(e,this.a,this.b,this.c,i,r,l,c)}containsPoint(e){return Ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,c=this.c;let h,d;Ms.subVectors(l,r),Es.subVectors(c,r),vh.subVectors(e,r);const m=Ms.dot(vh),p=Es.dot(vh);if(m<=0&&p<=0)return i.copy(r);bh.subVectors(e,l);const x=Ms.dot(bh),_=Es.dot(bh);if(x>=0&&_<=x)return i.copy(l);const v=m*_-x*p;if(v<=0&&m>=0&&x<=0)return h=m/(m-x),i.copy(r).addScaledVector(Ms,h);yh.subVectors(e,c);const S=Ms.dot(yh),A=Es.dot(yh);if(A>=0&&S<=A)return i.copy(c);const D=S*p-m*A;if(D<=0&&p>=0&&A<=0)return d=p/(p-A),i.copy(r).addScaledVector(Es,d);const y=x*A-S*_;if(y<=0&&_-x>=0&&S-A>=0)return Zx.subVectors(c,l),d=(_-x)/(_-x+(S-A)),i.copy(l).addScaledVector(Zx,d);const b=1/(y+D+v);return h=D*b,d=v*b,i.copy(r).addScaledVector(Ms,h).addScaledVector(Es,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Zg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Za={h:0,s:0,l:0},xu={h:0,s:0,l:0};function Th(s,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(e-s)*6*i:i<1/2?e:i<2/3?s+(e-s)*6*(2/3-i):s}class Bt{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=xi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=Nt.workingColorSpace){return this.r=e,this.g=i,this.b=r,Nt.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=Nt.workingColorSpace){if(e=_y(e,1),i=yt(i,0,1),r=yt(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,h=2*r-c;this.r=Th(h,c,e+1/3),this.g=Th(h,c,e),this.b=Th(h,c,e-1/3)}return Nt.colorSpaceToWorking(this,l),this}setStyle(e,i=xi){function r(c){c!==void 0&&parseFloat(c)<1&&ft("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ft("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);ft("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=xi){const r=Zg[e.toLowerCase()];return r!==void 0?this.setHex(r,i):ft("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xa(e.r),this.g=xa(e.g),this.b=xa(e.b),this}copyLinearToSRGB(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xi){return Nt.workingToColorSpace(Pn.copy(this),e),Math.round(yt(Pn.r*255,0,255))*65536+Math.round(yt(Pn.g*255,0,255))*256+Math.round(yt(Pn.b*255,0,255))}getHexString(e=xi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Nt.workingColorSpace){Nt.workingToColorSpace(Pn.copy(this),i);const r=Pn.r,l=Pn.g,c=Pn.b,h=Math.max(r,l,c),d=Math.min(r,l,c);let m,p;const x=(d+h)/2;if(d===h)m=0,p=0;else{const _=h-d;switch(p=x<=.5?_/(h+d):_/(2-h-d),h){case r:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-r)/_+2;break;case c:m=(r-l)/_+4;break}m/=6}return e.h=m,e.s=p,e.l=x,e}getRGB(e,i=Nt.workingColorSpace){return Nt.workingToColorSpace(Pn.copy(this),i),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=xi){Nt.workingToColorSpace(Pn.copy(this),e);const i=Pn.r,r=Pn.g,l=Pn.b;return e!==xi?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(Za),this.setHSL(Za.h+e,Za.s+i,Za.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(Za),e.getHSL(xu);const r=oh(Za.h,xu.h,i),l=oh(Za.s,xu.s,i),c=oh(Za.l,xu.l,i);return this.setHSL(r,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pn=new Bt;Bt.NAMES=Zg;let Ny=0;class ku extends zr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=Zo(),this.name="",this.type="Material",this.blending=Us,this.side=nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ih,this.blendDst=Fh,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ox,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){ft(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ft(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(r.blending=this.blending),this.side!==nr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Ih&&(r.blendSrc=this.blendSrc),this.blendDst!==Fh&&(r.blendDst=this.blendDst),this.blendEquation!==Cr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ox&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(e.textures),h=l(e.images);c.length>0&&(r.textures=c),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Kg extends ku{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _a,this.combine=Pg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dn=new oe,gu=new ct;let Oy=0;class Di{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oy++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=Px,this.updateRanges=[],this.gpuType=da,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)gu.fromBufferAttribute(this,i),gu.applyMatrix3(e),this.setXY(i,gu.x,gu.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.applyMatrix3(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.applyMatrix4(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.applyNormalMatrix(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.transformDirection(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Po(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=qn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Po(i,this.array)),i}setX(e,i){return this.normalized&&(i=qn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Po(i,this.array)),i}setY(e,i){return this.normalized&&(i=qn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Po(i,this.array)),i}setZ(e,i){return this.normalized&&(i=qn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Po(i,this.array)),i}setW(e,i){return this.normalized&&(i=qn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=qn(i,this.array),r=qn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=qn(i,this.array),r=qn(r,this.array),l=qn(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,c){return e*=this.itemSize,this.normalized&&(i=qn(i,this.array),r=qn(r,this.array),l=qn(l,this.array),c=qn(c,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Px&&(e.usage=this.usage),e}}class Qg extends Di{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Jg extends Di{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class Ur extends Di{constructor(e,i,r){super(new Float32Array(e),i,r)}}let Py=0;const mi=new vn,Ah=new si,Ts=new oe,ai=new Ko,Bo=new Ko,An=new oe;class va extends zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Py++}),this.uuid=Zo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qg(e)?Jg:Qg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new mt().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mi.makeRotationFromQuaternion(e),this.applyMatrix4(mi),this}rotateX(e){return mi.makeRotationX(e),this.applyMatrix4(mi),this}rotateY(e){return mi.makeRotationY(e),this.applyMatrix4(mi),this}rotateZ(e){return mi.makeRotationZ(e),this.applyMatrix4(mi),this}translate(e,i,r){return mi.makeTranslation(e,i,r),this.applyMatrix4(mi),this}scale(e,i,r){return mi.makeScale(e,i,r),this.applyMatrix4(mi),this}lookAt(e){return Ah.lookAt(e),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=e.length;l<c;l++){const h=e[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Ur(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ko);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new oe(-1/0,-1/0,-1/0),new oe(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];ai.setFromBufferAttribute(c),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,ai.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,ai.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(ai.min),this.boundingBox.expandByPoint(ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&sn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Id);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new oe,1/0);return}if(e){const r=this.boundingSphere.center;if(ai.setFromBufferAttribute(e),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Bo.setFromBufferAttribute(d),this.morphTargetsRelative?(An.addVectors(ai.min,Bo.min),ai.expandByPoint(An),An.addVectors(ai.max,Bo.max),ai.expandByPoint(An)):(ai.expandByPoint(Bo.min),ai.expandByPoint(Bo.max))}ai.getCenter(r);let l=0;for(let c=0,h=e.count;c<h;c++)An.fromBufferAttribute(e,c),l=Math.max(l,r.distanceToSquared(An));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,x=d.count;p<x;p++)An.fromBufferAttribute(d,p),m&&(Ts.fromBufferAttribute(e,p),An.add(Ts)),l=Math.max(l,r.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&sn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){sn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Di(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let te=0;te<r.count;te++)d[te]=new oe,m[te]=new oe;const p=new oe,x=new oe,_=new oe,v=new ct,S=new ct,A=new ct,D=new oe,y=new oe;function b(te,U,C){p.fromBufferAttribute(r,te),x.fromBufferAttribute(r,U),_.fromBufferAttribute(r,C),v.fromBufferAttribute(c,te),S.fromBufferAttribute(c,U),A.fromBufferAttribute(c,C),x.sub(p),_.sub(p),S.sub(v),A.sub(v);const V=1/(S.x*A.y-A.x*S.y);isFinite(V)&&(D.copy(x).multiplyScalar(A.y).addScaledVector(_,-S.y).multiplyScalar(V),y.copy(_).multiplyScalar(S.x).addScaledVector(x,-A.x).multiplyScalar(V),d[te].add(D),d[U].add(D),d[C].add(D),m[te].add(y),m[U].add(y),m[C].add(y))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let te=0,U=P.length;te<U;++te){const C=P[te],V=C.start,$=C.count;for(let le=V,_e=V+$;le<_e;le+=3)b(e.getX(le+0),e.getX(le+1),e.getX(le+2))}const L=new oe,H=new oe,q=new oe,O=new oe;function I(te){q.fromBufferAttribute(l,te),O.copy(q);const U=d[te];L.copy(U),L.sub(q.multiplyScalar(q.dot(U))).normalize(),H.crossVectors(O,U);const V=H.dot(m[te])<0?-1:1;h.setXYZW(te,L.x,L.y,L.z,V)}for(let te=0,U=P.length;te<U;++te){const C=P[te],V=C.start,$=C.count;for(let le=V,_e=V+$;le<_e;le+=3)I(e.getX(le+0)),I(e.getX(le+1)),I(e.getX(le+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Di(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let v=0,S=r.count;v<S;v++)r.setXYZ(v,0,0,0);const l=new oe,c=new oe,h=new oe,d=new oe,m=new oe,p=new oe,x=new oe,_=new oe;if(e)for(let v=0,S=e.count;v<S;v+=3){const A=e.getX(v+0),D=e.getX(v+1),y=e.getX(v+2);l.fromBufferAttribute(i,A),c.fromBufferAttribute(i,D),h.fromBufferAttribute(i,y),x.subVectors(h,c),_.subVectors(l,c),x.cross(_),d.fromBufferAttribute(r,A),m.fromBufferAttribute(r,D),p.fromBufferAttribute(r,y),d.add(x),m.add(x),p.add(x),r.setXYZ(A,d.x,d.y,d.z),r.setXYZ(D,m.x,m.y,m.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let v=0,S=i.count;v<S;v+=3)l.fromBufferAttribute(i,v+0),c.fromBufferAttribute(i,v+1),h.fromBufferAttribute(i,v+2),x.subVectors(h,c),_.subVectors(l,c),x.cross(_),r.setXYZ(v+0,x.x,x.y,x.z),r.setXYZ(v+1,x.x,x.y,x.z),r.setXYZ(v+2,x.x,x.y,x.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)An.fromBufferAttribute(e,i),An.normalize(),e.setXYZ(i,An.x,An.y,An.z)}toNonIndexed(){function e(d,m){const p=d.array,x=d.itemSize,_=d.normalized,v=new p.constructor(m.length*x);let S=0,A=0;for(let D=0,y=m.length;D<y;D++){d.isInterleavedBufferAttribute?S=m[D]*d.data.stride+d.offset:S=m[D]*x;for(let b=0;b<x;b++)v[A++]=p[S++]}return new Di(v,x,_)}if(this.index===null)return ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new va,r=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=e(m,r);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let x=0,_=p.length;x<_;x++){const v=p[x],S=e(v,r);m.push(S)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const p=r[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],x=[];for(let _=0,v=p.length;_<v;_++){const S=p[_];x.push(S.toJSON(e.data))}x.length>0&&(l[m]=x,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const p in l){const x=l[p];this.setAttribute(p,x.clone(i))}const c=e.morphAttributes;for(const p in c){const x=[],_=c[p];for(let v=0,S=_.length;v<S;v++)x.push(_[v].clone(i));this.morphAttributes[p]=x}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let p=0,x=h.length;p<x;p++){const _=h[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kx=new vn,Er=new Yg,_u=new Id,Qx=new oe,vu=new oe,bu=new oe,yu=new oe,Rh=new oe,Su=new oe,Jx=new oe,Mu=new oe;class Ii extends si{constructor(e=new va,i=new Kg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(c&&d){Su.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const x=d[m],_=c[m];x!==0&&(Rh.fromBufferAttribute(_,e),h?Su.addScaledVector(Rh,x):Su.addScaledVector(Rh.sub(i),x))}i.add(Su)}return i}raycast(e,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),_u.copy(r.boundingSphere),_u.applyMatrix4(c),Er.copy(e.ray).recast(e.near),!(_u.containsPoint(Er.origin)===!1&&(Er.intersectSphere(_u,Qx)===null||Er.origin.distanceToSquared(Qx)>(e.far-e.near)**2))&&(Kx.copy(c).invert(),Er.copy(e.ray).applyMatrix4(Kx),!(r.boundingBox!==null&&Er.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Er)))}_computeIntersections(e,i,r){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,x=c.attributes.uv1,_=c.attributes.normal,v=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(h))for(let A=0,D=v.length;A<D;A++){const y=v[A],b=h[y.materialIndex],P=Math.max(y.start,S.start),L=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let H=P,q=L;H<q;H+=3){const O=d.getX(H),I=d.getX(H+1),te=d.getX(H+2);l=Eu(this,b,e,r,p,x,_,O,I,te),l&&(l.faceIndex=Math.floor(H/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const A=Math.max(0,S.start),D=Math.min(d.count,S.start+S.count);for(let y=A,b=D;y<b;y+=3){const P=d.getX(y),L=d.getX(y+1),H=d.getX(y+2);l=Eu(this,h,e,r,p,x,_,P,L,H),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let A=0,D=v.length;A<D;A++){const y=v[A],b=h[y.materialIndex],P=Math.max(y.start,S.start),L=Math.min(m.count,Math.min(y.start+y.count,S.start+S.count));for(let H=P,q=L;H<q;H+=3){const O=H,I=H+1,te=H+2;l=Eu(this,b,e,r,p,x,_,O,I,te),l&&(l.faceIndex=Math.floor(H/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const A=Math.max(0,S.start),D=Math.min(m.count,S.start+S.count);for(let y=A,b=D;y<b;y+=3){const P=y,L=y+1,H=y+2;l=Eu(this,h,e,r,p,x,_,P,L,H),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function zy(s,e,i,r,l,c,h,d){let m;if(e.side===jn?m=r.intersectTriangle(h,c,l,!0,d):m=r.intersectTriangle(l,c,h,e.side===nr,d),m===null)return null;Mu.copy(d),Mu.applyMatrix4(s.matrixWorld);const p=i.ray.origin.distanceTo(Mu);return p<i.near||p>i.far?null:{distance:p,point:Mu.clone(),object:s}}function Eu(s,e,i,r,l,c,h,d,m,p){s.getVertexPosition(d,vu),s.getVertexPosition(m,bu),s.getVertexPosition(p,yu);const x=zy(s,e,i,r,vu,bu,yu,Jx);if(x){const _=new oe;Ri.getBarycoord(Jx,vu,bu,yu,_),l&&(x.uv=Ri.getInterpolatedAttribute(l,d,m,p,_,new ct)),c&&(x.uv1=Ri.getInterpolatedAttribute(c,d,m,p,_,new ct)),h&&(x.normal=Ri.getInterpolatedAttribute(h,d,m,p,_,new oe),x.normal.dot(r.direction)>0&&x.normal.multiplyScalar(-1));const v={a:d,b:m,c:p,normal:new oe,materialIndex:0};Ri.getNormal(vu,bu,yu,v.normal),x.face=v,x.barycoord=_}return x}class Qo extends va{constructor(e=1,i=1,r=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],x=[],_=[];let v=0,S=0;A("z","y","x",-1,-1,r,i,e,h,c,0),A("z","y","x",1,-1,r,i,-e,h,c,1),A("x","z","y",1,1,e,r,i,l,h,2),A("x","z","y",1,-1,e,r,-i,l,h,3),A("x","y","z",1,-1,e,i,r,l,c,4),A("x","y","z",-1,-1,e,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new Ur(p,3)),this.setAttribute("normal",new Ur(x,3)),this.setAttribute("uv",new Ur(_,2));function A(D,y,b,P,L,H,q,O,I,te,U){const C=H/I,V=q/te,$=H/2,le=q/2,_e=O/2,de=I+1,z=te+1;let Y=0,F=0;const k=new oe;for(let W=0;W<z;W++){const R=W*V-le;for(let J=0;J<de;J++){const ge=J*C-$;k[D]=ge*P,k[y]=R*L,k[b]=_e,p.push(k.x,k.y,k.z),k[D]=0,k[y]=0,k[b]=O>0?1:-1,x.push(k.x,k.y,k.z),_.push(J/I),_.push(1-W/te),Y+=1}}for(let W=0;W<te;W++)for(let R=0;R<I;R++){const J=v+R+de*W,ge=v+R+de*(W+1),Re=v+(R+1)+de*(W+1),Oe=v+(R+1)+de*W;m.push(J,ge,Oe),m.push(ge,Re,Oe),F+=6}d.addGroup(S,F,U),S+=F,v+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Is(s){const e={};for(const i in s){e[i]={};for(const r in s[i]){const l=s[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone():Array.isArray(l)?e[i][r]=l.slice():e[i][r]=l}}return e}function In(s){const e={};for(let i=0;i<s.length;i++){const r=Is(s[i]);for(const l in r)e[l]=r[l]}return e}function Iy(s){const e=[];for(let i=0;i<s.length;i++)e.push(s[i].clone());return e}function $g(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Nt.workingColorSpace}const Fy={clone:Is,merge:In};var By=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fi extends ku{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=By,this.fragmentShader=Hy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=Iy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class Gu extends si{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vn,this.projectionMatrix=new vn,this.projectionMatrixInverse=new vn,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ka=new oe,$x=new ct,eg=new ct;class gi extends Gu{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Ed*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ed*2*Math.atan(Math.tan(zu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){Ka.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ka.x,Ka.y).multiplyScalar(-e/Ka.z),Ka.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Ka.x,Ka.y).multiplyScalar(-e/Ka.z)}getViewSize(e,i){return this.getViewBounds(e,$x,eg),i.subVectors(eg,$x)}setViewOffset(e,i,r,l,c,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(zu*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*r/p,l*=h.width/m,r*=h.height/p}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const As=-90,Rs=1;class Gy extends si{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new gi(As,Rs,e,i);l.layers=this.layers,this.add(l);const c=new gi(As,Rs,e,i);c.layers=this.layers,this.add(c);const h=new gi(As,Rs,e,i);h.layers=this.layers,this.add(h);const d=new gi(As,Rs,e,i);d.layers=this.layers,this.add(d);const m=new gi(As,Rs,e,i);m.layers=this.layers,this.add(m);const p=new gi(As,Rs,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(e===zi)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Bu)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,x]=this.children,_=e.getRenderTarget(),v=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const D=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,l),e.render(i,c),e.setRenderTarget(r,1,l),e.render(i,h),e.setRenderTarget(r,2,l),e.render(i,d),e.setRenderTarget(r,3,l),e.render(i,m),e.setRenderTarget(r,4,l),e.render(i,p),r.texture.generateMipmaps=D,e.setRenderTarget(r,5,l),e.render(i,x),e.setRenderTarget(_,v,S),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class e_ extends Fn{constructor(e=[],i=Ps,r,l,c,h,d,m,p,x){super(e,i,r,l,c,h,d,m,p,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vy extends ir{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new e_(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Qo(5,5,5),c=new Fi({name:"CubemapFromEquirect",uniforms:Is(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:jn,blending:pa});c.uniforms.tEquirect.value=i;const h=new Ii(l,c),d=i.minFilter;return i.minFilter===wr&&(i.minFilter=Yn),new Gy(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const c=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,l);e.setRenderTarget(c)}}class Tu extends si{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ky={type:"move"};class Ch{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new oe,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new oe),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new oe,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new oe),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){h=!0;for(const D of e.hand.values()){const y=i.getJointPose(D,r),b=this._getHandJoint(p,D);y!==null&&(b.matrix.fromArray(y.transform.matrix),b.matrix.decompose(b.position,b.rotation,b.scale),b.matrixWorldNeedsUpdate=!0,b.jointRadius=y.radius),b.visible=y!==null}const x=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=x.position.distanceTo(_.position),S=.02,A=.005;p.inputState.pinching&&v>S+A?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&v<=S-A&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(ky)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new Tu;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}class tg extends si{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _a,this.environmentIntensity=1,this.environmentRotation=new _a,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class Xy extends Fn{constructor(e=null,i=1,r=1,l,c,h,d,m,p=ri,x=ri,_,v){super(null,h,d,m,p,x,l,c,_,v),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Dh=new oe,qy=new oe,Wy=new mt;class Ja{constructor(e=new oe(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=Dh.subVectors(r,i).cross(qy.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(Dh),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||Wy.getNormalMatrix(e),l=this.coplanarPoint(Dh).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new Id,Yy=new ct(.5,.5),Au=new oe;class t_{constructor(e=new Ja,i=new Ja,r=new Ja,l=new Ja,c=new Ja,h=new Ja){this.planes=[e,i,r,l,c,h]}set(e,i,r,l,c,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=zi,r=!1){const l=this.planes,c=e.elements,h=c[0],d=c[1],m=c[2],p=c[3],x=c[4],_=c[5],v=c[6],S=c[7],A=c[8],D=c[9],y=c[10],b=c[11],P=c[12],L=c[13],H=c[14],q=c[15];if(l[0].setComponents(p-h,S-x,b-A,q-P).normalize(),l[1].setComponents(p+h,S+x,b+A,q+P).normalize(),l[2].setComponents(p+d,S+_,b+D,q+L).normalize(),l[3].setComponents(p-d,S-_,b-D,q-L).normalize(),r)l[4].setComponents(m,v,y,H).normalize(),l[5].setComponents(p-m,S-v,b-y,q-H).normalize();else if(l[4].setComponents(p-m,S-v,b-y,q-H).normalize(),i===zi)l[5].setComponents(p+m,S+v,b+y,q+H).normalize();else if(i===Bu)l[5].setComponents(m,v,y,H).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Tr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(e){Tr.center.set(0,0,0);const i=Yy.distanceTo(e.center);return Tr.radius=.7071067811865476+i,Tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Au.x=l.normal.x>0?e.max.x:e.min.x,Au.y=l.normal.y>0?e.max.y:e.min.y,Au.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Au)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class n_ extends Fn{constructor(e,i,r=Lr,l,c,h,d=ri,m=ri,p,x=Wo,_=1){if(x!==Wo&&x!==Yo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:i,depth:_};super(v,l,c,h,d,m,x,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class i_ extends Fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Xu extends va{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const c=e/2,h=i/2,d=Math.floor(r),m=Math.floor(l),p=d+1,x=m+1,_=e/d,v=i/m,S=[],A=[],D=[],y=[];for(let b=0;b<x;b++){const P=b*v-h;for(let L=0;L<p;L++){const H=L*_-c;A.push(H,-P,0),D.push(0,0,1),y.push(L/d),y.push(1-b/m)}}for(let b=0;b<m;b++)for(let P=0;P<d;P++){const L=P+p*b,H=P+p*(b+1),q=P+1+p*(b+1),O=P+1+p*b;S.push(L,H,O),S.push(H,q,O)}this.setIndex(S),this.setAttribute("position",new Ur(A,3)),this.setAttribute("normal",new Ur(D,3)),this.setAttribute("uv",new Ur(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xu(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ru extends Fi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class jy extends ku{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ry,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zy extends ku{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ky extends Gu{constructor(e=-1,i=1,r=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-e,h=r+e,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=x*this.view.offsetY,m=d-x*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class Qy extends gi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class ng{constructor(e=1,i=0,r=0){this.radius=e,this.phi=i,this.theta=r}set(e,i,r){return this.radius=e,this.phi=i,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=yt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,r){return this.radius=Math.sqrt(e*e+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(yt(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Jy extends zr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){ft("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function ig(s,e,i,r){const l=$y(r);switch(i){case Gg:return s*e;case kg:return s*e/l.components*l.byteLength;case Ld:return s*e/l.components*l.byteLength;case Nd:return s*e*2/l.components*l.byteLength;case Od:return s*e*2/l.components*l.byteLength;case Vg:return s*e*3/l.components*l.byteLength;case vi:return s*e*4/l.components*l.byteLength;case Pd:return s*e*4/l.components*l.byteLength;case Lu:case Nu:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ou:case Pu:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qh:case $h:return Math.max(s,16)*Math.max(e,8)/4;case Kh:case Jh:return Math.max(s,8)*Math.max(e,8)/2;case ed:case td:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case nd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case id:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ad:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case rd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case sd:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case od:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ld:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case ud:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case cd:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case fd:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case hd:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case dd:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case pd:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case md:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case xd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case gd:case _d:case vd:return Math.ceil(s/4)*Math.ceil(e/4)*16;case bd:case yd:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Sd:case Md:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function $y(s){switch(s){case ga:case Ig:return{byteLength:1,components:1};case Xo:case Fg:case Pr:return{byteLength:2,components:1};case wd:case Ud:return{byteLength:2,components:4};case Lr:case Dd:case da:return{byteLength:4,components:1};case Bg:case Hg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cd}}));typeof window<"u"&&(window.__THREE__?ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function a_(){let s=null,e=!1,i=null,r=null;function l(c,h){i(c,h),r=s.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(r=s.requestAnimationFrame(l),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function eS(s){const e=new WeakMap;function i(d,m){const p=d.array,x=d.usage,_=p.byteLength,v=s.createBuffer();s.bindBuffer(m,v),s.bufferData(m,p,x),d.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=s.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function r(d,m,p){const x=m.array,_=m.updateRanges;if(s.bindBuffer(p,d),_.length===0)s.bufferSubData(p,0,x);else{_.sort((S,A)=>S.start-A.start);let v=0;for(let S=1;S<_.length;S++){const A=_[v],D=_[S];D.start<=A.start+A.count+1?A.count=Math.max(A.count,D.start+D.count-A.start):(++v,_[v]=D)}_.length=v+1;for(let S=0,A=_.length;S<A;S++){const D=_[S];s.bufferSubData(p,D.start*x.BYTES_PER_ELEMENT,x,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(s.deleteBuffer(m.buffer),e.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const x=e.get(d);(!x||x.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var tS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nS=`#ifdef USE_ALPHAHASH
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
#endif`,iS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oS=`#ifdef USE_AOMAP
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
#endif`,lS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uS=`#ifdef USE_BATCHING
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
#endif`,cS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pS=`#ifdef USE_IRIDESCENCE
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
#endif`,mS=`#ifdef USE_BUMPMAP
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
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,SS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,MS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ES=`#define PI 3.141592653589793
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
} // validated`,TS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,AS=`vec3 transformedNormal = objectNormal;
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
#endif`,RS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,CS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,US="gl_FragColor = linearToOutputTexel( gl_FragColor );",LS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,NS=`#ifdef USE_ENVMAP
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
#endif`,OS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,PS=`#ifdef USE_ENVMAP
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
#endif`,zS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,IS=`#ifdef USE_ENVMAP
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
#endif`,FS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,BS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,HS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,GS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,VS=`#ifdef USE_GRADIENTMAP
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
}`,kS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,XS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,WS=`uniform bool receiveShadow;
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
#endif`,YS=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
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
#endif`,jS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,KS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,JS=`PhysicalMaterial material;
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
#endif`,$S=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
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
}`,eM=`
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
#endif`,tM=`#if defined( RE_IndirectDiffuse )
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
#endif`,nM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,aM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cM=`#if defined( USE_POINTS_UV )
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
#endif`,fM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xM=`#ifdef USE_MORPHTARGETS
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
#endif`,gM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_M=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,MM=`#ifdef USE_NORMALMAP
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
#endif`,EM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,TM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,RM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,CM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,LM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,OM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,PM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,IM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,FM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,BM=`float getShadowMask() {
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
}`,HM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,GM=`#ifdef USE_SKINNING
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
#endif`,VM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kM=`#ifdef USE_SKINNING
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
#endif`,XM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,WM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jM=`#ifdef USE_TRANSMISSION
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
#endif`,ZM=`#ifdef USE_TRANSMISSION
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
#endif`,KM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$M=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const e1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,t1=`uniform sampler2D t2D;
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
}`,n1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,a1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s1=`#include <common>
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
}`,o1=`#if DEPTH_PACKING == 3200
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
}`,l1=`#define DISTANCE
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
}`,u1=`#define DISTANCE
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
}`,c1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h1=`uniform float scale;
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
}`,d1=`uniform vec3 diffuse;
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
}`,p1=`#include <common>
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
}`,m1=`uniform vec3 diffuse;
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
}`,x1=`#define LAMBERT
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
}`,g1=`#define LAMBERT
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
}`,_1=`#define MATCAP
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
}`,v1=`#define MATCAP
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
}`,b1=`#define NORMAL
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
}`,y1=`#define NORMAL
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
}`,S1=`#define PHONG
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
}`,M1=`#define PHONG
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
}`,E1=`#define STANDARD
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
}`,T1=`#define STANDARD
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
}`,A1=`#define TOON
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
}`,R1=`#define TOON
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
}`,C1=`uniform float size;
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
}`,D1=`uniform vec3 diffuse;
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
}`,w1=`#include <common>
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
}`,U1=`uniform vec3 color;
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
}`,L1=`uniform float rotation;
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
}`,N1=`uniform vec3 diffuse;
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
}`,xt={alphahash_fragment:tS,alphahash_pars_fragment:nS,alphamap_fragment:iS,alphamap_pars_fragment:aS,alphatest_fragment:rS,alphatest_pars_fragment:sS,aomap_fragment:oS,aomap_pars_fragment:lS,batching_pars_vertex:uS,batching_vertex:cS,begin_vertex:fS,beginnormal_vertex:hS,bsdfs:dS,iridescence_fragment:pS,bumpmap_pars_fragment:mS,clipping_planes_fragment:xS,clipping_planes_pars_fragment:gS,clipping_planes_pars_vertex:_S,clipping_planes_vertex:vS,color_fragment:bS,color_pars_fragment:yS,color_pars_vertex:SS,color_vertex:MS,common:ES,cube_uv_reflection_fragment:TS,defaultnormal_vertex:AS,displacementmap_pars_vertex:RS,displacementmap_vertex:CS,emissivemap_fragment:DS,emissivemap_pars_fragment:wS,colorspace_fragment:US,colorspace_pars_fragment:LS,envmap_fragment:NS,envmap_common_pars_fragment:OS,envmap_pars_fragment:PS,envmap_pars_vertex:zS,envmap_physical_pars_fragment:YS,envmap_vertex:IS,fog_vertex:FS,fog_pars_vertex:BS,fog_fragment:HS,fog_pars_fragment:GS,gradientmap_pars_fragment:VS,lightmap_pars_fragment:kS,lights_lambert_fragment:XS,lights_lambert_pars_fragment:qS,lights_pars_begin:WS,lights_toon_fragment:jS,lights_toon_pars_fragment:ZS,lights_phong_fragment:KS,lights_phong_pars_fragment:QS,lights_physical_fragment:JS,lights_physical_pars_fragment:$S,lights_fragment_begin:eM,lights_fragment_maps:tM,lights_fragment_end:nM,logdepthbuf_fragment:iM,logdepthbuf_pars_fragment:aM,logdepthbuf_pars_vertex:rM,logdepthbuf_vertex:sM,map_fragment:oM,map_pars_fragment:lM,map_particle_fragment:uM,map_particle_pars_fragment:cM,metalnessmap_fragment:fM,metalnessmap_pars_fragment:hM,morphinstance_vertex:dM,morphcolor_vertex:pM,morphnormal_vertex:mM,morphtarget_pars_vertex:xM,morphtarget_vertex:gM,normal_fragment_begin:_M,normal_fragment_maps:vM,normal_pars_fragment:bM,normal_pars_vertex:yM,normal_vertex:SM,normalmap_pars_fragment:MM,clearcoat_normal_fragment_begin:EM,clearcoat_normal_fragment_maps:TM,clearcoat_pars_fragment:AM,iridescence_pars_fragment:RM,opaque_fragment:CM,packing:DM,premultiplied_alpha_fragment:wM,project_vertex:UM,dithering_fragment:LM,dithering_pars_fragment:NM,roughnessmap_fragment:OM,roughnessmap_pars_fragment:PM,shadowmap_pars_fragment:zM,shadowmap_pars_vertex:IM,shadowmap_vertex:FM,shadowmask_pars_fragment:BM,skinbase_vertex:HM,skinning_pars_vertex:GM,skinning_vertex:VM,skinnormal_vertex:kM,specularmap_fragment:XM,specularmap_pars_fragment:qM,tonemapping_fragment:WM,tonemapping_pars_fragment:YM,transmission_fragment:jM,transmission_pars_fragment:ZM,uv_pars_fragment:KM,uv_pars_vertex:QM,uv_vertex:JM,worldpos_vertex:$M,background_vert:e1,background_frag:t1,backgroundCube_vert:n1,backgroundCube_frag:i1,cube_vert:a1,cube_frag:r1,depth_vert:s1,depth_frag:o1,distanceRGBA_vert:l1,distanceRGBA_frag:u1,equirect_vert:c1,equirect_frag:f1,linedashed_vert:h1,linedashed_frag:d1,meshbasic_vert:p1,meshbasic_frag:m1,meshlambert_vert:x1,meshlambert_frag:g1,meshmatcap_vert:_1,meshmatcap_frag:v1,meshnormal_vert:b1,meshnormal_frag:y1,meshphong_vert:S1,meshphong_frag:M1,meshphysical_vert:E1,meshphysical_frag:T1,meshtoon_vert:A1,meshtoon_frag:R1,points_vert:C1,points_frag:D1,shadow_vert:w1,shadow_frag:U1,sprite_vert:L1,sprite_frag:N1},Ne={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},envMapRotation:{value:new mt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},Pi={basic:{uniforms:In([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:xt.meshbasic_vert,fragmentShader:xt.meshbasic_frag},lambert:{uniforms:In([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Bt(0)}}]),vertexShader:xt.meshlambert_vert,fragmentShader:xt.meshlambert_frag},phong:{uniforms:In([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:xt.meshphong_vert,fragmentShader:xt.meshphong_frag},standard:{uniforms:In([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag},toon:{uniforms:In([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Bt(0)}}]),vertexShader:xt.meshtoon_vert,fragmentShader:xt.meshtoon_frag},matcap:{uniforms:In([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:xt.meshmatcap_vert,fragmentShader:xt.meshmatcap_frag},points:{uniforms:In([Ne.points,Ne.fog]),vertexShader:xt.points_vert,fragmentShader:xt.points_frag},dashed:{uniforms:In([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xt.linedashed_vert,fragmentShader:xt.linedashed_frag},depth:{uniforms:In([Ne.common,Ne.displacementmap]),vertexShader:xt.depth_vert,fragmentShader:xt.depth_frag},normal:{uniforms:In([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:xt.meshnormal_vert,fragmentShader:xt.meshnormal_frag},sprite:{uniforms:In([Ne.sprite,Ne.fog]),vertexShader:xt.sprite_vert,fragmentShader:xt.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xt.background_vert,fragmentShader:xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new mt}},vertexShader:xt.backgroundCube_vert,fragmentShader:xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xt.cube_vert,fragmentShader:xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xt.equirect_vert,fragmentShader:xt.equirect_frag},distanceRGBA:{uniforms:In([Ne.common,Ne.displacementmap,{referencePosition:{value:new oe},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xt.distanceRGBA_vert,fragmentShader:xt.distanceRGBA_frag},shadow:{uniforms:In([Ne.lights,Ne.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:xt.shadow_vert,fragmentShader:xt.shadow_frag}};Pi.physical={uniforms:In([Pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag};const Cu={r:0,b:0,g:0},Ar=new _a,O1=new vn;function P1(s,e,i,r,l,c,h){const d=new Bt(0);let m=c===!0?0:1,p,x,_=null,v=0,S=null;function A(L){let H=L.isScene===!0?L.background:null;return H&&H.isTexture&&(H=(L.backgroundBlurriness>0?i:e).get(H)),H}function D(L){let H=!1;const q=A(L);q===null?b(d,m):q&&q.isColor&&(b(q,1),H=!0);const O=s.xr.getEnvironmentBlendMode();O==="additive"?r.buffers.color.setClear(0,0,0,1,h):O==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(s.autoClear||H)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(L,H){const q=A(H);q&&(q.isCubeTexture||q.mapping===Vu)?(x===void 0&&(x=new Ii(new Qo(1,1,1),new Fi({name:"BackgroundCubeMaterial",uniforms:Is(Pi.backgroundCube.uniforms),vertexShader:Pi.backgroundCube.vertexShader,fragmentShader:Pi.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),x.geometry.deleteAttribute("normal"),x.geometry.deleteAttribute("uv"),x.onBeforeRender=function(O,I,te){this.matrixWorld.copyPosition(te.matrixWorld)},Object.defineProperty(x.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(x)),Ar.copy(H.backgroundRotation),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,q.isCubeTexture&&q.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),x.material.uniforms.envMap.value=q,x.material.uniforms.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1,x.material.uniforms.backgroundBlurriness.value=H.backgroundBlurriness,x.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,x.material.uniforms.backgroundRotation.value.setFromMatrix4(O1.makeRotationFromEuler(Ar)),x.material.toneMapped=Nt.getTransfer(q.colorSpace)!==Xt,(_!==q||v!==q.version||S!==s.toneMapping)&&(x.material.needsUpdate=!0,_=q,v=q.version,S=s.toneMapping),x.layers.enableAll(),L.unshift(x,x.geometry,x.material,0,0,null)):q&&q.isTexture&&(p===void 0&&(p=new Ii(new Xu(2,2),new Fi({name:"BackgroundMaterial",uniforms:Is(Pi.background.uniforms),vertexShader:Pi.background.vertexShader,fragmentShader:Pi.background.fragmentShader,side:nr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=q,p.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,p.material.toneMapped=Nt.getTransfer(q.colorSpace)!==Xt,q.matrixAutoUpdate===!0&&q.updateMatrix(),p.material.uniforms.uvTransform.value.copy(q.matrix),(_!==q||v!==q.version||S!==s.toneMapping)&&(p.material.needsUpdate=!0,_=q,v=q.version,S=s.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null))}function b(L,H){L.getRGB(Cu,$g(s)),r.buffers.color.setClear(Cu.r,Cu.g,Cu.b,H,h)}function P(){x!==void 0&&(x.geometry.dispose(),x.material.dispose(),x=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(L,H=1){d.set(L),m=H,b(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(L){m=L,b(d,m)},render:D,addToRenderList:y,dispose:P}}function z1(s,e){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=v(null);let c=l,h=!1;function d(C,V,$,le,_e){let de=!1;const z=_(le,$,V);c!==z&&(c=z,p(c.object)),de=S(C,le,$,_e),de&&A(C,le,$,_e),_e!==null&&e.update(_e,s.ELEMENT_ARRAY_BUFFER),(de||h)&&(h=!1,H(C,V,$,le),_e!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(_e).buffer))}function m(){return s.createVertexArray()}function p(C){return s.bindVertexArray(C)}function x(C){return s.deleteVertexArray(C)}function _(C,V,$){const le=$.wireframe===!0;let _e=r[C.id];_e===void 0&&(_e={},r[C.id]=_e);let de=_e[V.id];de===void 0&&(de={},_e[V.id]=de);let z=de[le];return z===void 0&&(z=v(m()),de[le]=z),z}function v(C){const V=[],$=[],le=[];for(let _e=0;_e<i;_e++)V[_e]=0,$[_e]=0,le[_e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:$,attributeDivisors:le,object:C,attributes:{},index:null}}function S(C,V,$,le){const _e=c.attributes,de=V.attributes;let z=0;const Y=$.getAttributes();for(const F in Y)if(Y[F].location>=0){const W=_e[F];let R=de[F];if(R===void 0&&(F==="instanceMatrix"&&C.instanceMatrix&&(R=C.instanceMatrix),F==="instanceColor"&&C.instanceColor&&(R=C.instanceColor)),W===void 0||W.attribute!==R||R&&W.data!==R.data)return!0;z++}return c.attributesNum!==z||c.index!==le}function A(C,V,$,le){const _e={},de=V.attributes;let z=0;const Y=$.getAttributes();for(const F in Y)if(Y[F].location>=0){let W=de[F];W===void 0&&(F==="instanceMatrix"&&C.instanceMatrix&&(W=C.instanceMatrix),F==="instanceColor"&&C.instanceColor&&(W=C.instanceColor));const R={};R.attribute=W,W&&W.data&&(R.data=W.data),_e[F]=R,z++}c.attributes=_e,c.attributesNum=z,c.index=le}function D(){const C=c.newAttributes;for(let V=0,$=C.length;V<$;V++)C[V]=0}function y(C){b(C,0)}function b(C,V){const $=c.newAttributes,le=c.enabledAttributes,_e=c.attributeDivisors;$[C]=1,le[C]===0&&(s.enableVertexAttribArray(C),le[C]=1),_e[C]!==V&&(s.vertexAttribDivisor(C,V),_e[C]=V)}function P(){const C=c.newAttributes,V=c.enabledAttributes;for(let $=0,le=V.length;$<le;$++)V[$]!==C[$]&&(s.disableVertexAttribArray($),V[$]=0)}function L(C,V,$,le,_e,de,z){z===!0?s.vertexAttribIPointer(C,V,$,_e,de):s.vertexAttribPointer(C,V,$,le,_e,de)}function H(C,V,$,le){D();const _e=le.attributes,de=$.getAttributes(),z=V.defaultAttributeValues;for(const Y in de){const F=de[Y];if(F.location>=0){let k=_e[Y];if(k===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(k=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(k=C.instanceColor)),k!==void 0){const W=k.normalized,R=k.itemSize,J=e.get(k);if(J===void 0)continue;const ge=J.buffer,Re=J.type,Oe=J.bytesPerElement,ae=Re===s.INT||Re===s.UNSIGNED_INT||k.gpuType===Dd;if(k.isInterleavedBufferAttribute){const he=k.data,Ue=he.stride,Ve=k.offset;if(he.isInstancedInterleavedBuffer){for(let Xe=0;Xe<F.locationSize;Xe++)b(F.location+Xe,he.meshPerAttribute);C.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Xe=0;Xe<F.locationSize;Xe++)y(F.location+Xe);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let Xe=0;Xe<F.locationSize;Xe++)L(F.location+Xe,R/F.locationSize,Re,W,Ue*Oe,(Ve+R/F.locationSize*Xe)*Oe,ae)}else{if(k.isInstancedBufferAttribute){for(let he=0;he<F.locationSize;he++)b(F.location+he,k.meshPerAttribute);C.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let he=0;he<F.locationSize;he++)y(F.location+he);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let he=0;he<F.locationSize;he++)L(F.location+he,R/F.locationSize,Re,W,R*Oe,R/F.locationSize*he*Oe,ae)}}else if(z!==void 0){const W=z[Y];if(W!==void 0)switch(W.length){case 2:s.vertexAttrib2fv(F.location,W);break;case 3:s.vertexAttrib3fv(F.location,W);break;case 4:s.vertexAttrib4fv(F.location,W);break;default:s.vertexAttrib1fv(F.location,W)}}}}P()}function q(){te();for(const C in r){const V=r[C];for(const $ in V){const le=V[$];for(const _e in le)x(le[_e].object),delete le[_e];delete V[$]}delete r[C]}}function O(C){if(r[C.id]===void 0)return;const V=r[C.id];for(const $ in V){const le=V[$];for(const _e in le)x(le[_e].object),delete le[_e];delete V[$]}delete r[C.id]}function I(C){for(const V in r){const $=r[V];if($[C.id]===void 0)continue;const le=$[C.id];for(const _e in le)x(le[_e].object),delete le[_e];delete $[C.id]}}function te(){U(),h=!0,c!==l&&(c=l,p(c.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:te,resetDefaultState:U,dispose:q,releaseStatesOfGeometry:O,releaseStatesOfProgram:I,initAttributes:D,enableAttribute:y,disableUnusedAttributes:P}}function I1(s,e,i){let r;function l(p){r=p}function c(p,x){s.drawArrays(r,p,x),i.update(x,r,1)}function h(p,x,_){_!==0&&(s.drawArraysInstanced(r,p,x,_),i.update(x,r,_))}function d(p,x,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,x,0,_);let S=0;for(let A=0;A<_;A++)S+=x[A];i.update(S,r,1)}function m(p,x,_,v){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let A=0;A<p.length;A++)h(p[A],x[A],v[A]);else{S.multiDrawArraysInstancedWEBGL(r,p,0,x,0,v,0,_);let A=0;for(let D=0;D<_;D++)A+=x[D]*v[D];i.update(A,r,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function F1(s,e,i,r){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");l=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(I){return!(I!==vi&&r.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(I){const te=I===Pr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==ga&&r.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==da&&!te)}function m(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const x=m(p);x!==p&&(ft("WebGLRenderer:",p,"not supported, using",x,"instead."),p=x);const _=i.logarithmicDepthBuffer===!0,v=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),b=s.getParameter(s.MAX_VERTEX_ATTRIBS),P=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),L=s.getParameter(s.MAX_VARYING_VECTORS),H=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),q=A>0,O=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:S,maxVertexTextures:A,maxTextureSize:D,maxCubemapSize:y,maxAttributes:b,maxVertexUniforms:P,maxVaryings:L,maxFragmentUniforms:H,vertexTextures:q,maxSamples:O}}function B1(s){const e=this;let i=null,r=0,l=!1,c=!1;const h=new Ja,d=new mt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const S=_.length!==0||v||r!==0||l;return l=v,r=_.length,S},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){i=x(_,v,0)},this.setState=function(_,v,S){const A=_.clippingPlanes,D=_.clipIntersection,y=_.clipShadows,b=s.get(_);if(!l||A===null||A.length===0||c&&!y)c?x(null):p();else{const P=c?0:r,L=P*4;let H=b.clippingState||null;m.value=H,H=x(A,v,L,S);for(let q=0;q!==L;++q)H[q]=i[q];b.clippingState=H,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=P}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function x(_,v,S,A){const D=_!==null?_.length:0;let y=null;if(D!==0){if(y=m.value,A!==!0||y===null){const b=S+D*4,P=v.matrixWorldInverse;d.getNormalMatrix(P),(y===null||y.length<b)&&(y=new Float32Array(b));for(let L=0,H=S;L!==D;++L,H+=4)h.copy(_[L]).applyMatrix4(P,d),h.normal.toArray(y,H),y[H+3]=h.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=D,e.numIntersection=0,y}}function H1(s){let e=new WeakMap;function i(h,d){return d===Wh?h.mapping=Ps:d===Yh&&(h.mapping=zs),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Wh||d===Yh)if(e.has(h)){const m=e.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new Vy(m.height);return p.fromEquirectangularTexture(s,h),e.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function c(){e=new WeakMap}return{get:r,dispose:c}}const er=4,ag=[.125,.215,.35,.446,.526,.582],Dr=20,G1=256,Ho=new Ky,rg=new Bt;let wh=null,Uh=0,Lh=0,Nh=!1;const V1=new oe;class sg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,r=.1,l=100,c={}){const{size:h=256,position:d=V1}=c;wh=this._renderer.getRenderTarget(),Uh=this._renderer.getActiveCubeFace(),Lh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ug(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wh,Uh,Lh),this._renderer.xr.enabled=Nh,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Ps||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wh=this._renderer.getRenderTarget(),Uh=this._renderer.getActiveCubeFace(),Lh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:Pr,format:vi,colorSpace:Nr,depthBuffer:!1},l=og(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=og(e,i,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=k1(c)),this._blurMaterial=q1(c,e,i),this._ggxMaterial=X1(c,e,i)}return l}_compileMaterial(e){const i=new Ii(new va,e);this._renderer.compile(i,Ho)}_sceneToCubeUV(e,i,r,l,c){const m=new gi(90,1,i,r),p=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,S=_.toneMapping;_.getClearColor(rg),_.toneMapping=ma,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ii(new Qo,new Kg({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,y=D.material;let b=!1;const P=e.background;P?P.isColor&&(y.color.copy(P),e.background=null,b=!0):(y.color.copy(rg),b=!0);for(let L=0;L<6;L++){const H=L%3;H===0?(m.up.set(0,p[L],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[L],c.y,c.z)):H===1?(m.up.set(0,0,p[L]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[L],c.z)):(m.up.set(0,p[L],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[L]));const q=this._cubeSize;Cs(l,H*q,L>2?q:0,q,q),_.setRenderTarget(l),b&&_.render(D,m),_.render(e,m)}_.toneMapping=S,_.autoClear=v,e.background=P}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Ps||e.mapping===zs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=ug()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lg());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const d=c.uniforms;d.envMap.value=e;const m=this._cubeSize;Cs(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,Ho)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=r}_applyGGXFilter(e,i,r){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,d=this._lodMeshes[r];d.material=h;const m=h.uniforms,p=r/(this._lodMeshes.length-1),x=i/(this._lodMeshes.length-1),_=Math.sqrt(p*p-x*x),v=.05+p*.95,S=_*v,{_lodMax:A}=this,D=this._sizeLods[r],y=3*D*(r>A-er?r-A+er:0),b=4*(this._cubeSize-D);m.envMap.value=e.texture,m.roughness.value=S,m.mipInt.value=A-i,Cs(c,y,b,3*D,2*D),l.setRenderTarget(c),l.render(d,Ho),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=A-r,Cs(e,y,b,3*D,2*D),l.setRenderTarget(e),l.render(d,Ho)}_blur(e,i,r,l,c){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,l,"latitudinal",c),this._halfBlur(h,e,r,r,l,"longitudinal",c)}_halfBlur(e,i,r,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&sn("blur direction must be either latitudinal or longitudinal!");const x=3,_=this._lodMeshes[l];_.material=p;const v=p.uniforms,S=this._sizeLods[r]-1,A=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Dr-1),D=c/A,y=isFinite(c)?1+Math.floor(x*D):Dr;y>Dr&&ft(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Dr}`);const b=[];let P=0;for(let I=0;I<Dr;++I){const te=I/D,U=Math.exp(-te*te/2);b.push(U),I===0?P+=U:I<y&&(P+=2*U)}for(let I=0;I<b.length;I++)b[I]=b[I]/P;v.envMap.value=e.texture,v.samples.value=y,v.weights.value=b,v.latitudinal.value=h==="latitudinal",d&&(v.poleAxis.value=d);const{_lodMax:L}=this;v.dTheta.value=A,v.mipInt.value=L-r;const H=this._sizeLods[l],q=3*H*(l>L-er?l-L+er:0),O=4*(this._cubeSize-H);Cs(i,q,O,3*H,2*H),m.setRenderTarget(i),m.render(_,Ho)}}function k1(s){const e=[],i=[],r=[];let l=s;const c=s-er+1+ag.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);e.push(d);let m=1/d;h>s-er?m=ag[h-s+er-1]:h===0&&(m=0),i.push(m);const p=1/(d-2),x=-p,_=1+p,v=[x,x,_,x,_,_,x,x,_,_,x,_],S=6,A=6,D=3,y=2,b=1,P=new Float32Array(D*A*S),L=new Float32Array(y*A*S),H=new Float32Array(b*A*S);for(let O=0;O<S;O++){const I=O%3*2/3-1,te=O>2?0:-1,U=[I,te,0,I+2/3,te,0,I+2/3,te+1,0,I,te,0,I+2/3,te+1,0,I,te+1,0];P.set(U,D*A*O),L.set(v,y*A*O);const C=[O,O,O,O,O,O];H.set(C,b*A*O)}const q=new va;q.setAttribute("position",new Di(P,D)),q.setAttribute("uv",new Di(L,y)),q.setAttribute("faceIndex",new Di(H,b)),r.push(new Ii(q,null)),l>er&&l--}return{lodMeshes:r,sizeLods:e,sigmas:i}}function og(s,e,i){const r=new ir(s,e,i);return r.texture.mapping=Vu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Cs(s,e,i,r,l){s.viewport.set(e,i,r,l),s.scissor.set(e,i,r,l)}function X1(s,e,i){return new Fi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:G1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pa,depthTest:!1,depthWrite:!1})}function q1(s,e,i){const r=new Float32Array(Dr),l=new oe(0,1,0);return new Fi({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:qu(),fragmentShader:`

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
		`,blending:pa,depthTest:!1,depthWrite:!1})}function lg(){return new Fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qu(),fragmentShader:`

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
		`,blending:pa,depthTest:!1,depthWrite:!1})}function ug(){return new Fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pa,depthTest:!1,depthWrite:!1})}function qu(){return`

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
	`}function W1(s){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const m=d.mapping,p=m===Wh||m===Yh,x=m===Ps||m===zs;if(p||x){let _=e.get(d);const v=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==v)return i===null&&(i=new sg(s)),_=p?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),_.texture;if(_!==void 0)return _.texture;{const S=d.image;return p&&S&&S.height>0||x&&S&&l(S)?(i===null&&(i=new sg(s)),_=p?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let x=0;x<p;x++)d[x]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Y1(s){const e={};function i(r){if(e[r]!==void 0)return e[r];const l=s.getExtension(r);return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&jo("WebGLRenderer: "+r+" extension not supported."),l}}}function j1(s,e,i,r){const l={},c=new WeakMap;function h(_){const v=_.target;v.index!==null&&e.remove(v.index);for(const A in v.attributes)e.remove(v.attributes[A]);v.removeEventListener("dispose",h),delete l[v.id];const S=c.get(v);S&&(e.remove(S),c.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function d(_,v){return l[v.id]===!0||(v.addEventListener("dispose",h),l[v.id]=!0,i.memory.geometries++),v}function m(_){const v=_.attributes;for(const S in v)e.update(v[S],s.ARRAY_BUFFER)}function p(_){const v=[],S=_.index,A=_.attributes.position;let D=0;if(S!==null){const P=S.array;D=S.version;for(let L=0,H=P.length;L<H;L+=3){const q=P[L+0],O=P[L+1],I=P[L+2];v.push(q,O,O,I,I,q)}}else if(A!==void 0){const P=A.array;D=A.version;for(let L=0,H=P.length/3-1;L<H;L+=3){const q=L+0,O=L+1,I=L+2;v.push(q,O,O,I,I,q)}}else return;const y=new(qg(v)?Jg:Qg)(v,1);y.version=D;const b=c.get(_);b&&e.remove(b),c.set(_,y)}function x(_){const v=c.get(_);if(v){const S=_.index;S!==null&&v.version<S.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:x}}function Z1(s,e,i){let r;function l(v){r=v}let c,h;function d(v){c=v.type,h=v.bytesPerElement}function m(v,S){s.drawElements(r,S,c,v*h),i.update(S,r,1)}function p(v,S,A){A!==0&&(s.drawElementsInstanced(r,S,c,v*h,A),i.update(S,r,A))}function x(v,S,A){if(A===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,c,v,0,A);let y=0;for(let b=0;b<A;b++)y+=S[b];i.update(y,r,1)}function _(v,S,A,D){if(A===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let b=0;b<v.length;b++)p(v[b]/h,S[b],D[b]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,c,v,0,D,0,A);let b=0;for(let P=0;P<A;P++)b+=S[P]*D[P];i.update(b,r,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=x,this.renderMultiDrawInstances=_}function K1(s){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,h,d){switch(i.calls++,h){case s.TRIANGLES:i.triangles+=d*(c/3);break;case s.LINES:i.lines+=d*(c/2);break;case s.LINE_STRIP:i.lines+=d*(c-1);break;case s.LINE_LOOP:i.lines+=d*c;break;case s.POINTS:i.points+=d*c;break;default:sn("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function Q1(s,e,i){const r=new WeakMap,l=new on;function c(h,d,m){const p=h.morphTargetInfluences,x=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=x!==void 0?x.length:0;let v=r.get(d);if(v===void 0||v.count!==_){let C=function(){te.dispose(),r.delete(d),d.removeEventListener("dispose",C)};var S=C;v!==void 0&&v.texture.dispose();const A=d.morphAttributes.position!==void 0,D=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,b=d.morphAttributes.position||[],P=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let H=0;A===!0&&(H=1),D===!0&&(H=2),y===!0&&(H=3);let q=d.attributes.position.count*H,O=1;q>e.maxTextureSize&&(O=Math.ceil(q/e.maxTextureSize),q=e.maxTextureSize);const I=new Float32Array(q*O*4*_),te=new Wg(I,q,O,_);te.type=da,te.needsUpdate=!0;const U=H*4;for(let V=0;V<_;V++){const $=b[V],le=P[V],_e=L[V],de=q*O*4*V;for(let z=0;z<$.count;z++){const Y=z*U;A===!0&&(l.fromBufferAttribute($,z),I[de+Y+0]=l.x,I[de+Y+1]=l.y,I[de+Y+2]=l.z,I[de+Y+3]=0),D===!0&&(l.fromBufferAttribute(le,z),I[de+Y+4]=l.x,I[de+Y+5]=l.y,I[de+Y+6]=l.z,I[de+Y+7]=0),y===!0&&(l.fromBufferAttribute(_e,z),I[de+Y+8]=l.x,I[de+Y+9]=l.y,I[de+Y+10]=l.z,I[de+Y+11]=_e.itemSize===4?l.w:1)}}v={count:_,texture:te,size:new ct(q,O)},r.set(d,v),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",h.morphTexture,i);else{let A=0;for(let y=0;y<p.length;y++)A+=p[y];const D=d.morphTargetsRelative?1:1-A;m.getUniforms().setValue(s,"morphTargetBaseInfluence",D),m.getUniforms().setValue(s,"morphTargetInfluences",p)}m.getUniforms().setValue(s,"morphTargetsTexture",v.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}return{update:c}}function J1(s,e,i,r){let l=new WeakMap;function c(m){const p=r.render.frame,x=m.geometry,_=e.get(m,x);if(l.get(_)!==p&&(e.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,s.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,s.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const v=m.skeleton;l.get(v)!==p&&(v.update(),l.set(v,p))}return _}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const r_=new Fn,cg=new n_(1,1),s_=new Wg,o_=new Ty,l_=new e_,fg=[],hg=[],dg=new Float32Array(16),pg=new Float32Array(9),mg=new Float32Array(4);function Fs(s,e,i){const r=s[0];if(r<=0||r>0)return s;const l=e*i;let c=fg[l];if(c===void 0&&(c=new Float32Array(l),fg[l]=c),e!==0){r.toArray(c,0);for(let h=1,d=0;h!==e;++h)d+=i,s[h].toArray(c,d)}return c}function bn(s,e){if(s.length!==e.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==e[i])return!1;return!0}function yn(s,e){for(let i=0,r=e.length;i<r;i++)s[i]=e[i]}function Wu(s,e){let i=hg[e];i===void 0&&(i=new Int32Array(e),hg[e]=i);for(let r=0;r!==e;++r)i[r]=s.allocateTextureUnit();return i}function $1(s,e){const i=this.cache;i[0]!==e&&(s.uniform1f(this.addr,e),i[0]=e)}function e3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2fv(this.addr,e),yn(i,e)}}function t3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(bn(i,e))return;s.uniform3fv(this.addr,e),yn(i,e)}}function n3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4fv(this.addr,e),yn(i,e)}}function i3(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix2fv(this.addr,!1,e),yn(i,e)}else{if(bn(i,r))return;mg.set(r),s.uniformMatrix2fv(this.addr,!1,mg),yn(i,r)}}function a3(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix3fv(this.addr,!1,e),yn(i,e)}else{if(bn(i,r))return;pg.set(r),s.uniformMatrix3fv(this.addr,!1,pg),yn(i,r)}}function r3(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(bn(i,e))return;s.uniformMatrix4fv(this.addr,!1,e),yn(i,e)}else{if(bn(i,r))return;dg.set(r),s.uniformMatrix4fv(this.addr,!1,dg),yn(i,r)}}function s3(s,e){const i=this.cache;i[0]!==e&&(s.uniform1i(this.addr,e),i[0]=e)}function o3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2iv(this.addr,e),yn(i,e)}}function l3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3iv(this.addr,e),yn(i,e)}}function u3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4iv(this.addr,e),yn(i,e)}}function c3(s,e){const i=this.cache;i[0]!==e&&(s.uniform1ui(this.addr,e),i[0]=e)}function f3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bn(i,e))return;s.uniform2uiv(this.addr,e),yn(i,e)}}function h3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bn(i,e))return;s.uniform3uiv(this.addr,e),yn(i,e)}}function d3(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bn(i,e))return;s.uniform4uiv(this.addr,e),yn(i,e)}}function p3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(cg.compareFunction=Xg,c=cg):c=r_,i.setTexture2D(e||c,l)}function m3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||o_,l)}function x3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||l_,l)}function g3(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||s_,l)}function _3(s){switch(s){case 5126:return $1;case 35664:return e3;case 35665:return t3;case 35666:return n3;case 35674:return i3;case 35675:return a3;case 35676:return r3;case 5124:case 35670:return s3;case 35667:case 35671:return o3;case 35668:case 35672:return l3;case 35669:case 35673:return u3;case 5125:return c3;case 36294:return f3;case 36295:return h3;case 36296:return d3;case 35678:case 36198:case 36298:case 36306:case 35682:return p3;case 35679:case 36299:case 36307:return m3;case 35680:case 36300:case 36308:case 36293:return x3;case 36289:case 36303:case 36311:case 36292:return g3}}function v3(s,e){s.uniform1fv(this.addr,e)}function b3(s,e){const i=Fs(e,this.size,2);s.uniform2fv(this.addr,i)}function y3(s,e){const i=Fs(e,this.size,3);s.uniform3fv(this.addr,i)}function S3(s,e){const i=Fs(e,this.size,4);s.uniform4fv(this.addr,i)}function M3(s,e){const i=Fs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function E3(s,e){const i=Fs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function T3(s,e){const i=Fs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function A3(s,e){s.uniform1iv(this.addr,e)}function R3(s,e){s.uniform2iv(this.addr,e)}function C3(s,e){s.uniform3iv(this.addr,e)}function D3(s,e){s.uniform4iv(this.addr,e)}function w3(s,e){s.uniform1uiv(this.addr,e)}function U3(s,e){s.uniform2uiv(this.addr,e)}function L3(s,e){s.uniform3uiv(this.addr,e)}function N3(s,e){s.uniform4uiv(this.addr,e)}function O3(s,e,i){const r=this.cache,l=e.length,c=Wu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||r_,c[h])}function P3(s,e,i){const r=this.cache,l=e.length,c=Wu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||o_,c[h])}function z3(s,e,i){const r=this.cache,l=e.length,c=Wu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||l_,c[h])}function I3(s,e,i){const r=this.cache,l=e.length,c=Wu(i,l);bn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||s_,c[h])}function F3(s){switch(s){case 5126:return v3;case 35664:return b3;case 35665:return y3;case 35666:return S3;case 35674:return M3;case 35675:return E3;case 35676:return T3;case 5124:case 35670:return A3;case 35667:case 35671:return R3;case 35668:case 35672:return C3;case 35669:case 35673:return D3;case 5125:return w3;case 36294:return U3;case 36295:return L3;case 36296:return N3;case 35678:case 36198:case 36298:case 36306:case 35682:return O3;case 35679:case 36299:case 36307:return P3;case 35680:case 36300:case 36308:case 36293:return z3;case 36289:case 36303:case 36311:case 36292:return I3}}class B3{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=_3(i.type)}}class H3{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=F3(i.type)}}class G3{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(e,i[d.id],r)}}}const Oh=/(\w+)(\])?(\[|\.)?/g;function xg(s,e){s.seq.push(e),s.map[e.id]=e}function V3(s,e,i){const r=s.name,l=r.length;for(Oh.lastIndex=0;;){const c=Oh.exec(r),h=Oh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){xg(i,p===void 0?new B3(d,s,e):new H3(d,s,e));break}else{let _=i.map[d];_===void 0&&(_=new G3(d),xg(i,_)),i=_}}}class Iu{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const c=e.getActiveUniform(i,l),h=e.getUniformLocation(i,c.name);V3(c,h,this)}}setValue(e,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=r[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,c=e.length;l!==c;++l){const h=e[l];h.id in i&&r.push(h)}return r}}function gg(s,e,i){const r=s.createShader(e);return s.shaderSource(r,i),s.compileShader(r),r}const k3=37297;let X3=0;function q3(s,e){const i=s.split(`
`),r=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let h=l;h<c;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const _g=new mt;function W3(s){Nt._getMatrix(_g,Nt.workingColorSpace,s);const e=`mat3( ${_g.elements.map(i=>i.toFixed(4))} )`;switch(Nt.getTransfer(s)){case Fu:return[e,"LinearTransferOETF"];case Xt:return[e,"sRGBTransferOETF"];default:return ft("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function vg(s,e,i){const r=s.getShaderParameter(e,s.COMPILE_STATUS),c=(s.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+q3(s.getShaderSource(e),d)}else return c}function Y3(s,e){const i=W3(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function j3(s,e){let i;switch(e){case Qb:i="Linear";break;case Jb:i="Reinhard";break;case $b:i="Cineon";break;case ey:i="ACESFilmic";break;case ny:i="AgX";break;case iy:i="Neutral";break;case ty:i="Custom";break;default:ft("WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Du=new oe;function Z3(){Nt.getLuminanceCoefficients(Du);const s=Du.x.toFixed(4),e=Du.y.toFixed(4),i=Du.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function K3(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Go).join(`
`)}function Q3(s){const e=[];for(const i in s){const r=s[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function J3(s,e){const i={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(e,l),h=c.name;let d=1;c.type===s.FLOAT_MAT2&&(d=2),c.type===s.FLOAT_MAT3&&(d=3),c.type===s.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:s.getAttribLocation(e,h),locationSize:d}}return i}function Go(s){return s!==""}function bg(s,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Td(s){return s.replace($3,tE)}const eE=new Map;function tE(s,e){let i=xt[e];if(i===void 0){const r=eE.get(e);if(r!==void 0)i=xt[r],ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Td(i)}const nE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sg(s){return s.replace(nE,iE)}function iE(s,e,i,r){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Mg(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function aE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Og?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===wb?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fa&&(e="SHADOWMAP_TYPE_VSM"),e}function rE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ps:case zs:e="ENVMAP_TYPE_CUBE";break;case Vu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function oE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Pg:e="ENVMAP_BLENDING_MULTIPLY";break;case Zb:e="ENVMAP_BLENDING_MIX";break;case Kb:e="ENVMAP_BLENDING_ADD";break}return e}function lE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function uE(s,e,i,r){const l=s.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=aE(i),p=rE(i),x=sE(i),_=oE(i),v=lE(i),S=K3(i),A=Q3(c),D=l.createProgram();let y,b,P=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(Go).join(`
`),y.length>0&&(y+=`
`),b=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(Go).join(`
`),b.length>0&&(b+=`
`)):(y=[Mg(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Go).join(`
`),b=[Mg(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+x:"",i.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ma?"#define TONE_MAPPING":"",i.toneMapping!==ma?xt.tonemapping_pars_fragment:"",i.toneMapping!==ma?j3("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",xt.colorspace_pars_fragment,Y3("linearToOutputTexel",i.outputColorSpace),Z3(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Go).join(`
`)),h=Td(h),h=bg(h,i),h=yg(h,i),d=Td(d),d=bg(d,i),d=yg(d,i),h=Sg(h),d=Sg(d),i.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,b=["#define varying in",i.glslVersion===zx?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===zx?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const L=P+y+h,H=P+b+d,q=gg(l,l.VERTEX_SHADER,L),O=gg(l,l.FRAGMENT_SHADER,H);l.attachShader(D,q),l.attachShader(D,O),i.index0AttributeName!==void 0?l.bindAttribLocation(D,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(D,0,"position"),l.linkProgram(D);function I(V){if(s.debug.checkShaderErrors){const $=l.getProgramInfoLog(D)||"",le=l.getShaderInfoLog(q)||"",_e=l.getShaderInfoLog(O)||"",de=$.trim(),z=le.trim(),Y=_e.trim();let F=!0,k=!0;if(l.getProgramParameter(D,l.LINK_STATUS)===!1)if(F=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,D,q,O);else{const W=vg(l,q,"vertex"),R=vg(l,O,"fragment");sn("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(D,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+de+`
`+W+`
`+R)}else de!==""?ft("WebGLProgram: Program Info Log:",de):(z===""||Y==="")&&(k=!1);k&&(V.diagnostics={runnable:F,programLog:de,vertexShader:{log:z,prefix:y},fragmentShader:{log:Y,prefix:b}})}l.deleteShader(q),l.deleteShader(O),te=new Iu(l,D),U=J3(l,D)}let te;this.getUniforms=function(){return te===void 0&&I(this),te};let U;this.getAttributes=function(){return U===void 0&&I(this),U};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(D,k3)),C},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=X3++,this.cacheKey=e,this.usedTimes=1,this.program=D,this.vertexShader=q,this.fragmentShader=O,this}let cE=0;class fE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new hE(e),i.set(e,r)),r}}class hE{constructor(e){this.id=cE++,this.code=e,this.usedTimes=0}}function dE(s,e,i,r,l,c,h){const d=new jg,m=new fE,p=new Set,x=[],_=l.logarithmicDepthBuffer,v=l.vertexTextures;let S=l.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function D(U){return p.add(U),U===0?"uv":`uv${U}`}function y(U,C,V,$,le){const _e=$.fog,de=le.geometry,z=U.isMeshStandardMaterial?$.environment:null,Y=(U.isMeshStandardMaterial?i:e).get(U.envMap||z),F=Y&&Y.mapping===Vu?Y.image.height:null,k=A[U.type];U.precision!==null&&(S=l.getMaxPrecision(U.precision),S!==U.precision&&ft("WebGLProgram.getParameters:",U.precision,"not supported, using",S,"instead."));const W=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,R=W!==void 0?W.length:0;let J=0;de.morphAttributes.position!==void 0&&(J=1),de.morphAttributes.normal!==void 0&&(J=2),de.morphAttributes.color!==void 0&&(J=3);let ge,Re,Oe,ae;if(k){const gt=Pi[k];ge=gt.vertexShader,Re=gt.fragmentShader}else ge=U.vertexShader,Re=U.fragmentShader,m.update(U),Oe=m.getVertexShaderID(U),ae=m.getFragmentShaderID(U);const he=s.getRenderTarget(),Ue=s.state.buffers.depth.getReversed(),Ve=le.isInstancedMesh===!0,Xe=le.isBatchedMesh===!0,rt=!!U.map,Ht=!!U.matcap,ot=!!Y,St=!!U.aoMap,G=!!U.lightMap,lt=!!U.bumpMap,st=!!U.normalMap,Ct=!!U.displacementMap,He=!!U.emissiveMap,Pt=!!U.metalnessMap,Ze=!!U.roughnessMap,nt=U.anisotropy>0,N=U.clearcoat>0,M=U.dispersion>0,Q=U.iridescence>0,me=U.sheen>0,Me=U.transmission>0,fe=nt&&!!U.anisotropyMap,je=N&&!!U.clearcoatMap,we=N&&!!U.clearcoatNormalMap,Ke=N&&!!U.clearcoatRoughnessMap,qe=Q&&!!U.iridescenceMap,Te=Q&&!!U.iridescenceThicknessMap,Ae=me&&!!U.sheenColorMap,We=me&&!!U.sheenRoughnessMap,Ie=!!U.specularMap,ze=!!U.specularColorMap,it=!!U.specularIntensityMap,w=Me&&!!U.transmissionMap,ce=Me&&!!U.thicknessMap,Ee=!!U.gradientMap,Se=!!U.alphaMap,be=U.alphaTest>0,pe=!!U.alphaHash,De=!!U.extensions;let Fe=ma;U.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Fe=s.toneMapping);const _t={shaderID:k,shaderType:U.type,shaderName:U.name,vertexShader:ge,fragmentShader:Re,defines:U.defines,customVertexShaderID:Oe,customFragmentShaderID:ae,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:S,batching:Xe,batchingColor:Xe&&le._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&le.instanceColor!==null,instancingMorph:Ve&&le.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:he===null?s.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Nr,alphaToCoverage:!!U.alphaToCoverage,map:rt,matcap:Ht,envMap:ot,envMapMode:ot&&Y.mapping,envMapCubeUVHeight:F,aoMap:St,lightMap:G,bumpMap:lt,normalMap:st,displacementMap:v&&Ct,emissiveMap:He,normalMapObjectSpace:st&&U.normalMapType===ly,normalMapTangentSpace:st&&U.normalMapType===oy,metalnessMap:Pt,roughnessMap:Ze,anisotropy:nt,anisotropyMap:fe,clearcoat:N,clearcoatMap:je,clearcoatNormalMap:we,clearcoatRoughnessMap:Ke,dispersion:M,iridescence:Q,iridescenceMap:qe,iridescenceThicknessMap:Te,sheen:me,sheenColorMap:Ae,sheenRoughnessMap:We,specularMap:Ie,specularColorMap:ze,specularIntensityMap:it,transmission:Me,transmissionMap:w,thicknessMap:ce,gradientMap:Ee,opaque:U.transparent===!1&&U.blending===Us&&U.alphaToCoverage===!1,alphaMap:Se,alphaTest:be,alphaHash:pe,combine:U.combine,mapUv:rt&&D(U.map.channel),aoMapUv:St&&D(U.aoMap.channel),lightMapUv:G&&D(U.lightMap.channel),bumpMapUv:lt&&D(U.bumpMap.channel),normalMapUv:st&&D(U.normalMap.channel),displacementMapUv:Ct&&D(U.displacementMap.channel),emissiveMapUv:He&&D(U.emissiveMap.channel),metalnessMapUv:Pt&&D(U.metalnessMap.channel),roughnessMapUv:Ze&&D(U.roughnessMap.channel),anisotropyMapUv:fe&&D(U.anisotropyMap.channel),clearcoatMapUv:je&&D(U.clearcoatMap.channel),clearcoatNormalMapUv:we&&D(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ke&&D(U.clearcoatRoughnessMap.channel),iridescenceMapUv:qe&&D(U.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&D(U.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&D(U.sheenColorMap.channel),sheenRoughnessMapUv:We&&D(U.sheenRoughnessMap.channel),specularMapUv:Ie&&D(U.specularMap.channel),specularColorMapUv:ze&&D(U.specularColorMap.channel),specularIntensityMapUv:it&&D(U.specularIntensityMap.channel),transmissionMapUv:w&&D(U.transmissionMap.channel),thicknessMapUv:ce&&D(U.thicknessMap.channel),alphaMapUv:Se&&D(U.alphaMap.channel),vertexTangents:!!de.attributes.tangent&&(st||nt),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,pointsUvs:le.isPoints===!0&&!!de.attributes.uv&&(rt||Se),fog:!!_e,useFog:U.fog===!0,fogExp2:!!_e&&_e.isFogExp2,flatShading:U.flatShading===!0&&U.wireframe===!1,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Ue,skinning:le.isSkinnedMesh===!0,morphTargets:de.morphAttributes.position!==void 0,morphNormals:de.morphAttributes.normal!==void 0,morphColors:de.morphAttributes.color!==void 0,morphTargetsCount:R,morphTextureStride:J,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:U.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:Fe,decodeVideoTexture:rt&&U.map.isVideoTexture===!0&&Nt.getTransfer(U.map.colorSpace)===Xt,decodeVideoTextureEmissive:He&&U.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(U.emissiveMap.colorSpace)===Xt,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===ha,flipSided:U.side===jn,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:De&&U.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&U.extensions.multiDraw===!0||Xe)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return _t.vertexUv1s=p.has(1),_t.vertexUv2s=p.has(2),_t.vertexUv3s=p.has(3),p.clear(),_t}function b(U){const C=[];if(U.shaderID?C.push(U.shaderID):(C.push(U.customVertexShaderID),C.push(U.customFragmentShaderID)),U.defines!==void 0)for(const V in U.defines)C.push(V),C.push(U.defines[V]);return U.isRawShaderMaterial===!1&&(P(C,U),L(C,U),C.push(s.outputColorSpace)),C.push(U.customProgramCacheKey),C.join()}function P(U,C){U.push(C.precision),U.push(C.outputColorSpace),U.push(C.envMapMode),U.push(C.envMapCubeUVHeight),U.push(C.mapUv),U.push(C.alphaMapUv),U.push(C.lightMapUv),U.push(C.aoMapUv),U.push(C.bumpMapUv),U.push(C.normalMapUv),U.push(C.displacementMapUv),U.push(C.emissiveMapUv),U.push(C.metalnessMapUv),U.push(C.roughnessMapUv),U.push(C.anisotropyMapUv),U.push(C.clearcoatMapUv),U.push(C.clearcoatNormalMapUv),U.push(C.clearcoatRoughnessMapUv),U.push(C.iridescenceMapUv),U.push(C.iridescenceThicknessMapUv),U.push(C.sheenColorMapUv),U.push(C.sheenRoughnessMapUv),U.push(C.specularMapUv),U.push(C.specularColorMapUv),U.push(C.specularIntensityMapUv),U.push(C.transmissionMapUv),U.push(C.thicknessMapUv),U.push(C.combine),U.push(C.fogExp2),U.push(C.sizeAttenuation),U.push(C.morphTargetsCount),U.push(C.morphAttributeCount),U.push(C.numDirLights),U.push(C.numPointLights),U.push(C.numSpotLights),U.push(C.numSpotLightMaps),U.push(C.numHemiLights),U.push(C.numRectAreaLights),U.push(C.numDirLightShadows),U.push(C.numPointLightShadows),U.push(C.numSpotLightShadows),U.push(C.numSpotLightShadowsWithMaps),U.push(C.numLightProbes),U.push(C.shadowMapType),U.push(C.toneMapping),U.push(C.numClippingPlanes),U.push(C.numClipIntersection),U.push(C.depthPacking)}function L(U,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),C.gradientMap&&d.enable(22),U.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reversedDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),U.push(d.mask)}function H(U){const C=A[U.type];let V;if(C){const $=Pi[C];V=Fy.clone($.uniforms)}else V=U.uniforms;return V}function q(U,C){let V;for(let $=0,le=x.length;$<le;$++){const _e=x[$];if(_e.cacheKey===C){V=_e,++V.usedTimes;break}}return V===void 0&&(V=new uE(s,C,U,c),x.push(V)),V}function O(U){if(--U.usedTimes===0){const C=x.indexOf(U);x[C]=x[x.length-1],x.pop(),U.destroy()}}function I(U){m.remove(U)}function te(){m.dispose()}return{getParameters:y,getProgramCacheKey:b,getUniforms:H,acquireProgram:q,releaseProgram:O,releaseShaderCache:I,programs:x,dispose:te}}function pE(){let s=new WeakMap;function e(h){return s.has(h)}function i(h){let d=s.get(h);return d===void 0&&(d={},s.set(h,d)),d}function r(h){s.delete(h)}function l(h,d,m){s.get(h)[d]=m}function c(){s=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:c}}function mE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Eg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Tg(){const s=[];let e=0;const i=[],r=[],l=[];function c(){e=0,i.length=0,r.length=0,l.length=0}function h(_,v,S,A,D,y){let b=s[e];return b===void 0?(b={id:_.id,object:_,geometry:v,material:S,groupOrder:A,renderOrder:_.renderOrder,z:D,group:y},s[e]=b):(b.id=_.id,b.object=_,b.geometry=v,b.material=S,b.groupOrder=A,b.renderOrder=_.renderOrder,b.z=D,b.group=y),e++,b}function d(_,v,S,A,D,y){const b=h(_,v,S,A,D,y);S.transmission>0?r.push(b):S.transparent===!0?l.push(b):i.push(b)}function m(_,v,S,A,D,y){const b=h(_,v,S,A,D,y);S.transmission>0?r.unshift(b):S.transparent===!0?l.unshift(b):i.unshift(b)}function p(_,v){i.length>1&&i.sort(_||mE),r.length>1&&r.sort(v||Eg),l.length>1&&l.sort(v||Eg)}function x(){for(let _=e,v=s.length;_<v;_++){const S=s[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:d,unshift:m,finish:x,sort:p}}function xE(){let s=new WeakMap;function e(r,l){const c=s.get(r);let h;return c===void 0?(h=new Tg,s.set(r,[h])):l>=c.length?(h=new Tg,c.push(h)):h=c[l],h}function i(){s=new WeakMap}return{get:e,dispose:i}}function gE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new oe,color:new Bt};break;case"SpotLight":i={position:new oe,direction:new oe,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new oe,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":i={direction:new oe,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":i={color:new Bt,position:new oe,halfWidth:new oe,halfHeight:new oe};break}return s[e.id]=i,i}}}function _E(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=i,i}}}let vE=0;function bE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function yE(s){const e=new gE,i=_E(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new oe);const l=new oe,c=new vn,h=new vn;function d(p){let x=0,_=0,v=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let S=0,A=0,D=0,y=0,b=0,P=0,L=0,H=0,q=0,O=0,I=0;p.sort(bE);for(let U=0,C=p.length;U<C;U++){const V=p[U],$=V.color,le=V.intensity,_e=V.distance,de=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)x+=$.r*le,_+=$.g*le,v+=$.b*le;else if(V.isLightProbe){for(let z=0;z<9;z++)r.probe[z].addScaledVector(V.sh.coefficients[z],le);I++}else if(V.isDirectionalLight){const z=e.get(V);if(z.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const Y=V.shadow,F=i.get(V);F.shadowIntensity=Y.intensity,F.shadowBias=Y.bias,F.shadowNormalBias=Y.normalBias,F.shadowRadius=Y.radius,F.shadowMapSize=Y.mapSize,r.directionalShadow[S]=F,r.directionalShadowMap[S]=de,r.directionalShadowMatrix[S]=V.shadow.matrix,P++}r.directional[S]=z,S++}else if(V.isSpotLight){const z=e.get(V);z.position.setFromMatrixPosition(V.matrixWorld),z.color.copy($).multiplyScalar(le),z.distance=_e,z.coneCos=Math.cos(V.angle),z.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),z.decay=V.decay,r.spot[D]=z;const Y=V.shadow;if(V.map&&(r.spotLightMap[q]=V.map,q++,Y.updateMatrices(V),V.castShadow&&O++),r.spotLightMatrix[D]=Y.matrix,V.castShadow){const F=i.get(V);F.shadowIntensity=Y.intensity,F.shadowBias=Y.bias,F.shadowNormalBias=Y.normalBias,F.shadowRadius=Y.radius,F.shadowMapSize=Y.mapSize,r.spotShadow[D]=F,r.spotShadowMap[D]=de,H++}D++}else if(V.isRectAreaLight){const z=e.get(V);z.color.copy($).multiplyScalar(le),z.halfWidth.set(V.width*.5,0,0),z.halfHeight.set(0,V.height*.5,0),r.rectArea[y]=z,y++}else if(V.isPointLight){const z=e.get(V);if(z.color.copy(V.color).multiplyScalar(V.intensity),z.distance=V.distance,z.decay=V.decay,V.castShadow){const Y=V.shadow,F=i.get(V);F.shadowIntensity=Y.intensity,F.shadowBias=Y.bias,F.shadowNormalBias=Y.normalBias,F.shadowRadius=Y.radius,F.shadowMapSize=Y.mapSize,F.shadowCameraNear=Y.camera.near,F.shadowCameraFar=Y.camera.far,r.pointShadow[A]=F,r.pointShadowMap[A]=de,r.pointShadowMatrix[A]=V.shadow.matrix,L++}r.point[A]=z,A++}else if(V.isHemisphereLight){const z=e.get(V);z.skyColor.copy(V.color).multiplyScalar(le),z.groundColor.copy(V.groundColor).multiplyScalar(le),r.hemi[b]=z,b++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ne.LTC_FLOAT_1,r.rectAreaLTC2=Ne.LTC_FLOAT_2):(r.rectAreaLTC1=Ne.LTC_HALF_1,r.rectAreaLTC2=Ne.LTC_HALF_2)),r.ambient[0]=x,r.ambient[1]=_,r.ambient[2]=v;const te=r.hash;(te.directionalLength!==S||te.pointLength!==A||te.spotLength!==D||te.rectAreaLength!==y||te.hemiLength!==b||te.numDirectionalShadows!==P||te.numPointShadows!==L||te.numSpotShadows!==H||te.numSpotMaps!==q||te.numLightProbes!==I)&&(r.directional.length=S,r.spot.length=D,r.rectArea.length=y,r.point.length=A,r.hemi.length=b,r.directionalShadow.length=P,r.directionalShadowMap.length=P,r.pointShadow.length=L,r.pointShadowMap.length=L,r.spotShadow.length=H,r.spotShadowMap.length=H,r.directionalShadowMatrix.length=P,r.pointShadowMatrix.length=L,r.spotLightMatrix.length=H+q-O,r.spotLightMap.length=q,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=I,te.directionalLength=S,te.pointLength=A,te.spotLength=D,te.rectAreaLength=y,te.hemiLength=b,te.numDirectionalShadows=P,te.numPointShadows=L,te.numSpotShadows=H,te.numSpotMaps=q,te.numLightProbes=I,r.version=vE++)}function m(p,x){let _=0,v=0,S=0,A=0,D=0;const y=x.matrixWorldInverse;for(let b=0,P=p.length;b<P;b++){const L=p[b];if(L.isDirectionalLight){const H=r.directional[_];H.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),H.direction.sub(l),H.direction.transformDirection(y),_++}else if(L.isSpotLight){const H=r.spot[S];H.position.setFromMatrixPosition(L.matrixWorld),H.position.applyMatrix4(y),H.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),H.direction.sub(l),H.direction.transformDirection(y),S++}else if(L.isRectAreaLight){const H=r.rectArea[A];H.position.setFromMatrixPosition(L.matrixWorld),H.position.applyMatrix4(y),h.identity(),c.copy(L.matrixWorld),c.premultiply(y),h.extractRotation(c),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),H.halfWidth.applyMatrix4(h),H.halfHeight.applyMatrix4(h),A++}else if(L.isPointLight){const H=r.point[v];H.position.setFromMatrixPosition(L.matrixWorld),H.position.applyMatrix4(y),v++}else if(L.isHemisphereLight){const H=r.hemi[D];H.direction.setFromMatrixPosition(L.matrixWorld),H.direction.transformDirection(y),D++}}}return{setup:d,setupView:m,state:r}}function Ag(s){const e=new yE(s),i=[],r=[];function l(x){p.camera=x,i.length=0,r.length=0}function c(x){i.push(x)}function h(x){r.push(x)}function d(){e.setup(i)}function m(x){e.setupView(i,x)}const p={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function SE(s){let e=new WeakMap;function i(l,c=0){const h=e.get(l);let d;return h===void 0?(d=new Ag(s),e.set(l,[d])):c>=h.length?(d=new Ag(s),h.push(d)):d=h[c],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const ME=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,EE=`uniform sampler2D shadow_pass;
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
}`;function TE(s,e,i){let r=new t_;const l=new ct,c=new ct,h=new on,d=new jy({depthPacking:sy}),m=new Zy,p={},x=i.maxTextureSize,_={[nr]:jn,[jn]:nr,[ha]:ha},v=new Fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:ME,fragmentShader:EE}),S=v.clone();S.defines.HORIZONTAL_PASS=1;const A=new va;A.setAttribute("position",new Di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new Ii(A,v),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Og;let b=this.type;this.render=function(O,I,te){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||O.length===0)return;const U=s.getRenderTarget(),C=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),$=s.state;$.setBlending(pa),$.buffers.depth.getReversed()===!0?$.buffers.color.setClear(0,0,0,0):$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const le=b!==fa&&this.type===fa,_e=b===fa&&this.type!==fa;for(let de=0,z=O.length;de<z;de++){const Y=O[de],F=Y.shadow;if(F===void 0){ft("WebGLShadowMap:",Y,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const k=F.getFrameExtents();if(l.multiply(k),c.copy(F.mapSize),(l.x>x||l.y>x)&&(l.x>x&&(c.x=Math.floor(x/k.x),l.x=c.x*k.x,F.mapSize.x=c.x),l.y>x&&(c.y=Math.floor(x/k.y),l.y=c.y*k.y,F.mapSize.y=c.y)),F.map===null||le===!0||_e===!0){const R=this.type!==fa?{minFilter:ri,magFilter:ri}:{};F.map!==null&&F.map.dispose(),F.map=new ir(l.x,l.y,R),F.map.texture.name=Y.name+".shadowMap",F.camera.updateProjectionMatrix()}s.setRenderTarget(F.map),s.clear();const W=F.getViewportCount();for(let R=0;R<W;R++){const J=F.getViewport(R);h.set(c.x*J.x,c.y*J.y,c.x*J.z,c.y*J.w),$.viewport(h),F.updateMatrices(Y,R),r=F.getFrustum(),H(I,te,F.camera,Y,this.type)}F.isPointLightShadow!==!0&&this.type===fa&&P(F,te),F.needsUpdate=!1}b=this.type,y.needsUpdate=!1,s.setRenderTarget(U,C,V)};function P(O,I){const te=e.update(D);v.defines.VSM_SAMPLES!==O.blurSamples&&(v.defines.VSM_SAMPLES=O.blurSamples,S.defines.VSM_SAMPLES=O.blurSamples,v.needsUpdate=!0,S.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ir(l.x,l.y)),v.uniforms.shadow_pass.value=O.map.texture,v.uniforms.resolution.value=O.mapSize,v.uniforms.radius.value=O.radius,s.setRenderTarget(O.mapPass),s.clear(),s.renderBufferDirect(I,null,te,v,D,null),S.uniforms.shadow_pass.value=O.mapPass.texture,S.uniforms.resolution.value=O.mapSize,S.uniforms.radius.value=O.radius,s.setRenderTarget(O.map),s.clear(),s.renderBufferDirect(I,null,te,S,D,null)}function L(O,I,te,U){let C=null;const V=te.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(V!==void 0)C=V;else if(C=te.isPointLight===!0?m:d,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const $=C.uuid,le=I.uuid;let _e=p[$];_e===void 0&&(_e={},p[$]=_e);let de=_e[le];de===void 0&&(de=C.clone(),_e[le]=de,I.addEventListener("dispose",q)),C=de}if(C.visible=I.visible,C.wireframe=I.wireframe,U===fa?C.side=I.shadowSide!==null?I.shadowSide:I.side:C.side=I.shadowSide!==null?I.shadowSide:_[I.side],C.alphaMap=I.alphaMap,C.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,C.map=I.map,C.clipShadows=I.clipShadows,C.clippingPlanes=I.clippingPlanes,C.clipIntersection=I.clipIntersection,C.displacementMap=I.displacementMap,C.displacementScale=I.displacementScale,C.displacementBias=I.displacementBias,C.wireframeLinewidth=I.wireframeLinewidth,C.linewidth=I.linewidth,te.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const $=s.properties.get(C);$.light=te}return C}function H(O,I,te,U,C){if(O.visible===!1)return;if(O.layers.test(I.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&C===fa)&&(!O.frustumCulled||r.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,O.matrixWorld);const le=e.update(O),_e=O.material;if(Array.isArray(_e)){const de=le.groups;for(let z=0,Y=de.length;z<Y;z++){const F=de[z],k=_e[F.materialIndex];if(k&&k.visible){const W=L(O,k,U,C);O.onBeforeShadow(s,O,I,te,le,W,F),s.renderBufferDirect(te,null,le,W,O,F),O.onAfterShadow(s,O,I,te,le,W,F)}}}else if(_e.visible){const de=L(O,_e,U,C);O.onBeforeShadow(s,O,I,te,le,de,null),s.renderBufferDirect(te,null,le,de,O,null),O.onAfterShadow(s,O,I,te,le,de,null)}}const $=O.children;for(let le=0,_e=$.length;le<_e;le++)H($[le],I,te,U,C)}function q(O){O.target.removeEventListener("dispose",q);for(const te in p){const U=p[te],C=O.target.uuid;C in U&&(U[C].dispose(),delete U[C])}}}const AE={[Bh]:Hh,[Gh]:Xh,[Vh]:qh,[Os]:kh,[Hh]:Bh,[Xh]:Gh,[qh]:Vh,[kh]:Os};function RE(s,e){function i(){let w=!1;const ce=new on;let Ee=null;const Se=new on(0,0,0,0);return{setMask:function(be){Ee!==be&&!w&&(s.colorMask(be,be,be,be),Ee=be)},setLocked:function(be){w=be},setClear:function(be,pe,De,Fe,_t){_t===!0&&(be*=Fe,pe*=Fe,De*=Fe),ce.set(be,pe,De,Fe),Se.equals(ce)===!1&&(s.clearColor(be,pe,De,Fe),Se.copy(ce))},reset:function(){w=!1,Ee=null,Se.set(-1,0,0,0)}}}function r(){let w=!1,ce=!1,Ee=null,Se=null,be=null;return{setReversed:function(pe){if(ce!==pe){const De=e.get("EXT_clip_control");pe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ce=pe;const Fe=be;be=null,this.setClear(Fe)}},getReversed:function(){return ce},setTest:function(pe){pe?he(s.DEPTH_TEST):Ue(s.DEPTH_TEST)},setMask:function(pe){Ee!==pe&&!w&&(s.depthMask(pe),Ee=pe)},setFunc:function(pe){if(ce&&(pe=AE[pe]),Se!==pe){switch(pe){case Bh:s.depthFunc(s.NEVER);break;case Hh:s.depthFunc(s.ALWAYS);break;case Gh:s.depthFunc(s.LESS);break;case Os:s.depthFunc(s.LEQUAL);break;case Vh:s.depthFunc(s.EQUAL);break;case kh:s.depthFunc(s.GEQUAL);break;case Xh:s.depthFunc(s.GREATER);break;case qh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Se=pe}},setLocked:function(pe){w=pe},setClear:function(pe){be!==pe&&(ce&&(pe=1-pe),s.clearDepth(pe),be=pe)},reset:function(){w=!1,Ee=null,Se=null,be=null,ce=!1}}}function l(){let w=!1,ce=null,Ee=null,Se=null,be=null,pe=null,De=null,Fe=null,_t=null;return{setTest:function(gt){w||(gt?he(s.STENCIL_TEST):Ue(s.STENCIL_TEST))},setMask:function(gt){ce!==gt&&!w&&(s.stencilMask(gt),ce=gt)},setFunc:function(gt,$t,Ln){(Ee!==gt||Se!==$t||be!==Ln)&&(s.stencilFunc(gt,$t,Ln),Ee=gt,Se=$t,be=Ln)},setOp:function(gt,$t,Ln){(pe!==gt||De!==$t||Fe!==Ln)&&(s.stencilOp(gt,$t,Ln),pe=gt,De=$t,Fe=Ln)},setLocked:function(gt){w=gt},setClear:function(gt){_t!==gt&&(s.clearStencil(gt),_t=gt)},reset:function(){w=!1,ce=null,Ee=null,Se=null,be=null,pe=null,De=null,Fe=null,_t=null}}}const c=new i,h=new r,d=new l,m=new WeakMap,p=new WeakMap;let x={},_={},v=new WeakMap,S=[],A=null,D=!1,y=null,b=null,P=null,L=null,H=null,q=null,O=null,I=new Bt(0,0,0),te=0,U=!1,C=null,V=null,$=null,le=null,_e=null;const de=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Y=0;const F=s.getParameter(s.VERSION);F.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(F)[1]),z=Y>=1):F.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),z=Y>=2);let k=null,W={};const R=s.getParameter(s.SCISSOR_BOX),J=s.getParameter(s.VIEWPORT),ge=new on().fromArray(R),Re=new on().fromArray(J);function Oe(w,ce,Ee,Se){const be=new Uint8Array(4),pe=s.createTexture();s.bindTexture(w,pe),s.texParameteri(w,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(w,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let De=0;De<Ee;De++)w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY?s.texImage3D(ce,0,s.RGBA,1,1,Se,0,s.RGBA,s.UNSIGNED_BYTE,be):s.texImage2D(ce+De,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,be);return pe}const ae={};ae[s.TEXTURE_2D]=Oe(s.TEXTURE_2D,s.TEXTURE_2D,1),ae[s.TEXTURE_CUBE_MAP]=Oe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[s.TEXTURE_2D_ARRAY]=Oe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ae[s.TEXTURE_3D]=Oe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),he(s.DEPTH_TEST),h.setFunc(Os),lt(!1),st(wx),he(s.CULL_FACE),St(pa);function he(w){x[w]!==!0&&(s.enable(w),x[w]=!0)}function Ue(w){x[w]!==!1&&(s.disable(w),x[w]=!1)}function Ve(w,ce){return _[w]!==ce?(s.bindFramebuffer(w,ce),_[w]=ce,w===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=ce),w===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=ce),!0):!1}function Xe(w,ce){let Ee=S,Se=!1;if(w){Ee=v.get(ce),Ee===void 0&&(Ee=[],v.set(ce,Ee));const be=w.textures;if(Ee.length!==be.length||Ee[0]!==s.COLOR_ATTACHMENT0){for(let pe=0,De=be.length;pe<De;pe++)Ee[pe]=s.COLOR_ATTACHMENT0+pe;Ee.length=be.length,Se=!0}}else Ee[0]!==s.BACK&&(Ee[0]=s.BACK,Se=!0);Se&&s.drawBuffers(Ee)}function rt(w){return A!==w?(s.useProgram(w),A=w,!0):!1}const Ht={[Cr]:s.FUNC_ADD,[Lb]:s.FUNC_SUBTRACT,[Nb]:s.FUNC_REVERSE_SUBTRACT};Ht[Ob]=s.MIN,Ht[Pb]=s.MAX;const ot={[zb]:s.ZERO,[Ib]:s.ONE,[Fb]:s.SRC_COLOR,[Ih]:s.SRC_ALPHA,[Xb]:s.SRC_ALPHA_SATURATE,[Vb]:s.DST_COLOR,[Hb]:s.DST_ALPHA,[Bb]:s.ONE_MINUS_SRC_COLOR,[Fh]:s.ONE_MINUS_SRC_ALPHA,[kb]:s.ONE_MINUS_DST_COLOR,[Gb]:s.ONE_MINUS_DST_ALPHA,[qb]:s.CONSTANT_COLOR,[Wb]:s.ONE_MINUS_CONSTANT_COLOR,[Yb]:s.CONSTANT_ALPHA,[jb]:s.ONE_MINUS_CONSTANT_ALPHA};function St(w,ce,Ee,Se,be,pe,De,Fe,_t,gt){if(w===pa){D===!0&&(Ue(s.BLEND),D=!1);return}if(D===!1&&(he(s.BLEND),D=!0),w!==Ub){if(w!==y||gt!==U){if((b!==Cr||H!==Cr)&&(s.blendEquation(s.FUNC_ADD),b=Cr,H=Cr),gt)switch(w){case Us:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ux:s.blendFunc(s.ONE,s.ONE);break;case Lx:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Nx:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:sn("WebGLState: Invalid blending: ",w);break}else switch(w){case Us:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ux:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lx:sn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nx:sn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:sn("WebGLState: Invalid blending: ",w);break}P=null,L=null,q=null,O=null,I.set(0,0,0),te=0,y=w,U=gt}return}be=be||ce,pe=pe||Ee,De=De||Se,(ce!==b||be!==H)&&(s.blendEquationSeparate(Ht[ce],Ht[be]),b=ce,H=be),(Ee!==P||Se!==L||pe!==q||De!==O)&&(s.blendFuncSeparate(ot[Ee],ot[Se],ot[pe],ot[De]),P=Ee,L=Se,q=pe,O=De),(Fe.equals(I)===!1||_t!==te)&&(s.blendColor(Fe.r,Fe.g,Fe.b,_t),I.copy(Fe),te=_t),y=w,U=!1}function G(w,ce){w.side===ha?Ue(s.CULL_FACE):he(s.CULL_FACE);let Ee=w.side===jn;ce&&(Ee=!Ee),lt(Ee),w.blending===Us&&w.transparent===!1?St(pa):St(w.blending,w.blendEquation,w.blendSrc,w.blendDst,w.blendEquationAlpha,w.blendSrcAlpha,w.blendDstAlpha,w.blendColor,w.blendAlpha,w.premultipliedAlpha),h.setFunc(w.depthFunc),h.setTest(w.depthTest),h.setMask(w.depthWrite),c.setMask(w.colorWrite);const Se=w.stencilWrite;d.setTest(Se),Se&&(d.setMask(w.stencilWriteMask),d.setFunc(w.stencilFunc,w.stencilRef,w.stencilFuncMask),d.setOp(w.stencilFail,w.stencilZFail,w.stencilZPass)),He(w.polygonOffset,w.polygonOffsetFactor,w.polygonOffsetUnits),w.alphaToCoverage===!0?he(s.SAMPLE_ALPHA_TO_COVERAGE):Ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function lt(w){C!==w&&(w?s.frontFace(s.CW):s.frontFace(s.CCW),C=w)}function st(w){w!==Cb?(he(s.CULL_FACE),w!==V&&(w===wx?s.cullFace(s.BACK):w===Db?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ue(s.CULL_FACE),V=w}function Ct(w){w!==$&&(z&&s.lineWidth(w),$=w)}function He(w,ce,Ee){w?(he(s.POLYGON_OFFSET_FILL),(le!==ce||_e!==Ee)&&(s.polygonOffset(ce,Ee),le=ce,_e=Ee)):Ue(s.POLYGON_OFFSET_FILL)}function Pt(w){w?he(s.SCISSOR_TEST):Ue(s.SCISSOR_TEST)}function Ze(w){w===void 0&&(w=s.TEXTURE0+de-1),k!==w&&(s.activeTexture(w),k=w)}function nt(w,ce,Ee){Ee===void 0&&(k===null?Ee=s.TEXTURE0+de-1:Ee=k);let Se=W[Ee];Se===void 0&&(Se={type:void 0,texture:void 0},W[Ee]=Se),(Se.type!==w||Se.texture!==ce)&&(k!==Ee&&(s.activeTexture(Ee),k=Ee),s.bindTexture(w,ce||ae[w]),Se.type=w,Se.texture=ce)}function N(){const w=W[k];w!==void 0&&w.type!==void 0&&(s.bindTexture(w.type,null),w.type=void 0,w.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(w){w("WebGLState:",w)}}function Q(){try{s.compressedTexImage3D(...arguments)}catch(w){w("WebGLState:",w)}}function me(){try{s.texSubImage2D(...arguments)}catch(w){w("WebGLState:",w)}}function Me(){try{s.texSubImage3D(...arguments)}catch(w){w("WebGLState:",w)}}function fe(){try{s.compressedTexSubImage2D(...arguments)}catch(w){w("WebGLState:",w)}}function je(){try{s.compressedTexSubImage3D(...arguments)}catch(w){w("WebGLState:",w)}}function we(){try{s.texStorage2D(...arguments)}catch(w){w("WebGLState:",w)}}function Ke(){try{s.texStorage3D(...arguments)}catch(w){w("WebGLState:",w)}}function qe(){try{s.texImage2D(...arguments)}catch(w){w("WebGLState:",w)}}function Te(){try{s.texImage3D(...arguments)}catch(w){w("WebGLState:",w)}}function Ae(w){ge.equals(w)===!1&&(s.scissor(w.x,w.y,w.z,w.w),ge.copy(w))}function We(w){Re.equals(w)===!1&&(s.viewport(w.x,w.y,w.z,w.w),Re.copy(w))}function Ie(w,ce){let Ee=p.get(ce);Ee===void 0&&(Ee=new WeakMap,p.set(ce,Ee));let Se=Ee.get(w);Se===void 0&&(Se=s.getUniformBlockIndex(ce,w.name),Ee.set(w,Se))}function ze(w,ce){const Se=p.get(ce).get(w);m.get(ce)!==Se&&(s.uniformBlockBinding(ce,Se,w.__bindingPointIndex),m.set(ce,Se))}function it(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),h.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),x={},k=null,W={},_={},v=new WeakMap,S=[],A=null,D=!1,y=null,b=null,P=null,L=null,H=null,q=null,O=null,I=new Bt(0,0,0),te=0,U=!1,C=null,V=null,$=null,le=null,_e=null,ge.set(0,0,s.canvas.width,s.canvas.height),Re.set(0,0,s.canvas.width,s.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:he,disable:Ue,bindFramebuffer:Ve,drawBuffers:Xe,useProgram:rt,setBlending:St,setMaterial:G,setFlipSided:lt,setCullFace:st,setLineWidth:Ct,setPolygonOffset:He,setScissorTest:Pt,activeTexture:Ze,bindTexture:nt,unbindTexture:N,compressedTexImage2D:M,compressedTexImage3D:Q,texImage2D:qe,texImage3D:Te,updateUBOMapping:Ie,uniformBlockBinding:ze,texStorage2D:we,texStorage3D:Ke,texSubImage2D:me,texSubImage3D:Me,compressedTexSubImage2D:fe,compressedTexSubImage3D:je,scissor:Ae,viewport:We,reset:it}}function CE(s,e,i,r,l,c,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ct,x=new WeakMap;let _;const v=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(N,M){return S?new OffscreenCanvas(N,M):Hu("canvas")}function D(N,M,Q){let me=1;const Me=nt(N);if((Me.width>Q||Me.height>Q)&&(me=Q/Math.max(Me.width,Me.height)),me<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const fe=Math.floor(me*Me.width),je=Math.floor(me*Me.height);_===void 0&&(_=A(fe,je));const we=M?A(fe,je):_;return we.width=fe,we.height=je,we.getContext("2d").drawImage(N,0,0,fe,je),ft("WebGLRenderer: Texture has been resized from ("+Me.width+"x"+Me.height+") to ("+fe+"x"+je+")."),we}else return"data"in N&&ft("WebGLRenderer: Image in DataTexture is too big ("+Me.width+"x"+Me.height+")."),N;return N}function y(N){return N.generateMipmaps}function b(N){s.generateMipmap(N)}function P(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function L(N,M,Q,me,Me=!1){if(N!==null){if(s[N]!==void 0)return s[N];ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let fe=M;if(M===s.RED&&(Q===s.FLOAT&&(fe=s.R32F),Q===s.HALF_FLOAT&&(fe=s.R16F),Q===s.UNSIGNED_BYTE&&(fe=s.R8)),M===s.RED_INTEGER&&(Q===s.UNSIGNED_BYTE&&(fe=s.R8UI),Q===s.UNSIGNED_SHORT&&(fe=s.R16UI),Q===s.UNSIGNED_INT&&(fe=s.R32UI),Q===s.BYTE&&(fe=s.R8I),Q===s.SHORT&&(fe=s.R16I),Q===s.INT&&(fe=s.R32I)),M===s.RG&&(Q===s.FLOAT&&(fe=s.RG32F),Q===s.HALF_FLOAT&&(fe=s.RG16F),Q===s.UNSIGNED_BYTE&&(fe=s.RG8)),M===s.RG_INTEGER&&(Q===s.UNSIGNED_BYTE&&(fe=s.RG8UI),Q===s.UNSIGNED_SHORT&&(fe=s.RG16UI),Q===s.UNSIGNED_INT&&(fe=s.RG32UI),Q===s.BYTE&&(fe=s.RG8I),Q===s.SHORT&&(fe=s.RG16I),Q===s.INT&&(fe=s.RG32I)),M===s.RGB_INTEGER&&(Q===s.UNSIGNED_BYTE&&(fe=s.RGB8UI),Q===s.UNSIGNED_SHORT&&(fe=s.RGB16UI),Q===s.UNSIGNED_INT&&(fe=s.RGB32UI),Q===s.BYTE&&(fe=s.RGB8I),Q===s.SHORT&&(fe=s.RGB16I),Q===s.INT&&(fe=s.RGB32I)),M===s.RGBA_INTEGER&&(Q===s.UNSIGNED_BYTE&&(fe=s.RGBA8UI),Q===s.UNSIGNED_SHORT&&(fe=s.RGBA16UI),Q===s.UNSIGNED_INT&&(fe=s.RGBA32UI),Q===s.BYTE&&(fe=s.RGBA8I),Q===s.SHORT&&(fe=s.RGBA16I),Q===s.INT&&(fe=s.RGBA32I)),M===s.RGB&&(Q===s.UNSIGNED_INT_5_9_9_9_REV&&(fe=s.RGB9_E5),Q===s.UNSIGNED_INT_10F_11F_11F_REV&&(fe=s.R11F_G11F_B10F)),M===s.RGBA){const je=Me?Fu:Nt.getTransfer(me);Q===s.FLOAT&&(fe=s.RGBA32F),Q===s.HALF_FLOAT&&(fe=s.RGBA16F),Q===s.UNSIGNED_BYTE&&(fe=je===Xt?s.SRGB8_ALPHA8:s.RGBA8),Q===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),Q===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function H(N,M){let Q;return N?M===null||M===Lr||M===qo?Q=s.DEPTH24_STENCIL8:M===da?Q=s.DEPTH32F_STENCIL8:M===Xo&&(Q=s.DEPTH24_STENCIL8,ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Lr||M===qo?Q=s.DEPTH_COMPONENT24:M===da?Q=s.DEPTH_COMPONENT32F:M===Xo&&(Q=s.DEPTH_COMPONENT16),Q}function q(N,M){return y(N)===!0||N.isFramebufferTexture&&N.minFilter!==ri&&N.minFilter!==Yn?Math.log2(Math.max(M.width,M.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?M.mipmaps.length:1}function O(N){const M=N.target;M.removeEventListener("dispose",O),te(M),M.isVideoTexture&&x.delete(M)}function I(N){const M=N.target;M.removeEventListener("dispose",I),C(M)}function te(N){const M=r.get(N);if(M.__webglInit===void 0)return;const Q=N.source,me=v.get(Q);if(me){const Me=me[M.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&U(N),Object.keys(me).length===0&&v.delete(Q)}r.remove(N)}function U(N){const M=r.get(N);s.deleteTexture(M.__webglTexture);const Q=N.source,me=v.get(Q);delete me[M.__cacheKey],h.memory.textures--}function C(N){const M=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(M.__webglFramebuffer[me]))for(let Me=0;Me<M.__webglFramebuffer[me].length;Me++)s.deleteFramebuffer(M.__webglFramebuffer[me][Me]);else s.deleteFramebuffer(M.__webglFramebuffer[me]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[me])}else{if(Array.isArray(M.__webglFramebuffer))for(let me=0;me<M.__webglFramebuffer.length;me++)s.deleteFramebuffer(M.__webglFramebuffer[me]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let me=0;me<M.__webglColorRenderbuffer.length;me++)M.__webglColorRenderbuffer[me]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[me]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const Q=N.textures;for(let me=0,Me=Q.length;me<Me;me++){const fe=r.get(Q[me]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),h.memory.textures--),r.remove(Q[me])}r.remove(N)}let V=0;function $(){V=0}function le(){const N=V;return N>=l.maxTextures&&ft("WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),V+=1,N}function _e(N){const M=[];return M.push(N.wrapS),M.push(N.wrapT),M.push(N.wrapR||0),M.push(N.magFilter),M.push(N.minFilter),M.push(N.anisotropy),M.push(N.internalFormat),M.push(N.format),M.push(N.type),M.push(N.generateMipmaps),M.push(N.premultiplyAlpha),M.push(N.flipY),M.push(N.unpackAlignment),M.push(N.colorSpace),M.join()}function de(N,M){const Q=r.get(N);if(N.isVideoTexture&&Pt(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Q.__version!==N.version){const me=N.image;if(me===null)ft("WebGLRenderer: Texture marked for update but no image data found.");else if(me.complete===!1)ft("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(Q,N,M);return}}else N.isExternalTexture&&(Q.__webglTexture=N.sourceTexture?N.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,Q.__webglTexture,s.TEXTURE0+M)}function z(N,M){const Q=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Q.__version!==N.version){ae(Q,N,M);return}else N.isExternalTexture&&(Q.__webglTexture=N.sourceTexture?N.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,Q.__webglTexture,s.TEXTURE0+M)}function Y(N,M){const Q=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Q.__version!==N.version){ae(Q,N,M);return}i.bindTexture(s.TEXTURE_3D,Q.__webglTexture,s.TEXTURE0+M)}function F(N,M){const Q=r.get(N);if(N.version>0&&Q.__version!==N.version){he(Q,N,M);return}i.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture,s.TEXTURE0+M)}const k={[jh]:s.REPEAT,[Ci]:s.CLAMP_TO_EDGE,[Zh]:s.MIRRORED_REPEAT},W={[ri]:s.NEAREST,[ay]:s.NEAREST_MIPMAP_NEAREST,[lu]:s.NEAREST_MIPMAP_LINEAR,[Yn]:s.LINEAR,[sh]:s.LINEAR_MIPMAP_NEAREST,[wr]:s.LINEAR_MIPMAP_LINEAR},R={[uy]:s.NEVER,[my]:s.ALWAYS,[cy]:s.LESS,[Xg]:s.LEQUAL,[fy]:s.EQUAL,[py]:s.GEQUAL,[hy]:s.GREATER,[dy]:s.NOTEQUAL};function J(N,M){if(M.type===da&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Yn||M.magFilter===sh||M.magFilter===lu||M.magFilter===wr||M.minFilter===Yn||M.minFilter===sh||M.minFilter===lu||M.minFilter===wr)&&ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,k[M.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,k[M.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,k[M.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,W[M.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,W[M.minFilter]),M.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,R[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===ri||M.minFilter!==lu&&M.minFilter!==wr||M.type===da&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||r.get(M).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy}}}function ge(N,M){let Q=!1;N.__webglInit===void 0&&(N.__webglInit=!0,M.addEventListener("dispose",O));const me=M.source;let Me=v.get(me);Me===void 0&&(Me={},v.set(me,Me));const fe=_e(M);if(fe!==N.__cacheKey){Me[fe]===void 0&&(Me[fe]={texture:s.createTexture(),usedTimes:0},h.memory.textures++,Q=!0),Me[fe].usedTimes++;const je=Me[N.__cacheKey];je!==void 0&&(Me[N.__cacheKey].usedTimes--,je.usedTimes===0&&U(M)),N.__cacheKey=fe,N.__webglTexture=Me[fe].texture}return Q}function Re(N,M,Q){return Math.floor(Math.floor(N/Q)/M)}function Oe(N,M,Q,me){const fe=N.updateRanges;if(fe.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,Q,me,M.data);else{fe.sort((Te,Ae)=>Te.start-Ae.start);let je=0;for(let Te=1;Te<fe.length;Te++){const Ae=fe[je],We=fe[Te],Ie=Ae.start+Ae.count,ze=Re(We.start,M.width,4),it=Re(Ae.start,M.width,4);We.start<=Ie+1&&ze===it&&Re(We.start+We.count-1,M.width,4)===ze?Ae.count=Math.max(Ae.count,We.start+We.count-Ae.start):(++je,fe[je]=We)}fe.length=je+1;const we=s.getParameter(s.UNPACK_ROW_LENGTH),Ke=s.getParameter(s.UNPACK_SKIP_PIXELS),qe=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Te=0,Ae=fe.length;Te<Ae;Te++){const We=fe[Te],Ie=Math.floor(We.start/4),ze=Math.ceil(We.count/4),it=Ie%M.width,w=Math.floor(Ie/M.width),ce=ze,Ee=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,it),s.pixelStorei(s.UNPACK_SKIP_ROWS,w),i.texSubImage2D(s.TEXTURE_2D,0,it,w,ce,Ee,Q,me,M.data)}N.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,we),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ke),s.pixelStorei(s.UNPACK_SKIP_ROWS,qe)}}function ae(N,M,Q){let me=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(me=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(me=s.TEXTURE_3D);const Me=ge(N,M),fe=M.source;i.bindTexture(me,N.__webglTexture,s.TEXTURE0+Q);const je=r.get(fe);if(fe.version!==je.__version||Me===!0){i.activeTexture(s.TEXTURE0+Q);const we=Nt.getPrimaries(Nt.workingColorSpace),Ke=M.colorSpace===$a?null:Nt.getPrimaries(M.colorSpace),qe=M.colorSpace===$a||we===Ke?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let Te=D(M.image,!1,l.maxTextureSize);Te=Ze(M,Te);const Ae=c.convert(M.format,M.colorSpace),We=c.convert(M.type);let Ie=L(M.internalFormat,Ae,We,M.colorSpace,M.isVideoTexture);J(me,M);let ze;const it=M.mipmaps,w=M.isVideoTexture!==!0,ce=je.__version===void 0||Me===!0,Ee=fe.dataReady,Se=q(M,Te);if(M.isDepthTexture)Ie=H(M.format===Yo,M.type),ce&&(w?i.texStorage2D(s.TEXTURE_2D,1,Ie,Te.width,Te.height):i.texImage2D(s.TEXTURE_2D,0,Ie,Te.width,Te.height,0,Ae,We,null));else if(M.isDataTexture)if(it.length>0){w&&ce&&i.texStorage2D(s.TEXTURE_2D,Se,Ie,it[0].width,it[0].height);for(let be=0,pe=it.length;be<pe;be++)ze=it[be],w?Ee&&i.texSubImage2D(s.TEXTURE_2D,be,0,0,ze.width,ze.height,Ae,We,ze.data):i.texImage2D(s.TEXTURE_2D,be,Ie,ze.width,ze.height,0,Ae,We,ze.data);M.generateMipmaps=!1}else w?(ce&&i.texStorage2D(s.TEXTURE_2D,Se,Ie,Te.width,Te.height),Ee&&Oe(M,Te,Ae,We)):i.texImage2D(s.TEXTURE_2D,0,Ie,Te.width,Te.height,0,Ae,We,Te.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){w&&ce&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Se,Ie,it[0].width,it[0].height,Te.depth);for(let be=0,pe=it.length;be<pe;be++)if(ze=it[be],M.format!==vi)if(Ae!==null)if(w){if(Ee)if(M.layerUpdates.size>0){const De=ig(ze.width,ze.height,M.format,M.type);for(const Fe of M.layerUpdates){const _t=ze.data.subarray(Fe*De/ze.data.BYTES_PER_ELEMENT,(Fe+1)*De/ze.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,be,0,0,Fe,ze.width,ze.height,1,Ae,_t)}M.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,be,0,0,0,ze.width,ze.height,Te.depth,Ae,ze.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,be,Ie,ze.width,ze.height,Te.depth,0,ze.data,0,0);else ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else w?Ee&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,be,0,0,0,ze.width,ze.height,Te.depth,Ae,We,ze.data):i.texImage3D(s.TEXTURE_2D_ARRAY,be,Ie,ze.width,ze.height,Te.depth,0,Ae,We,ze.data)}else{w&&ce&&i.texStorage2D(s.TEXTURE_2D,Se,Ie,it[0].width,it[0].height);for(let be=0,pe=it.length;be<pe;be++)ze=it[be],M.format!==vi?Ae!==null?w?Ee&&i.compressedTexSubImage2D(s.TEXTURE_2D,be,0,0,ze.width,ze.height,Ae,ze.data):i.compressedTexImage2D(s.TEXTURE_2D,be,Ie,ze.width,ze.height,0,ze.data):ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):w?Ee&&i.texSubImage2D(s.TEXTURE_2D,be,0,0,ze.width,ze.height,Ae,We,ze.data):i.texImage2D(s.TEXTURE_2D,be,Ie,ze.width,ze.height,0,Ae,We,ze.data)}else if(M.isDataArrayTexture)if(w){if(ce&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Se,Ie,Te.width,Te.height,Te.depth),Ee)if(M.layerUpdates.size>0){const be=ig(Te.width,Te.height,M.format,M.type);for(const pe of M.layerUpdates){const De=Te.data.subarray(pe*be/Te.data.BYTES_PER_ELEMENT,(pe+1)*be/Te.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,pe,Te.width,Te.height,1,Ae,We,De)}M.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Te.width,Te.height,Te.depth,Ae,We,Te.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Ie,Te.width,Te.height,Te.depth,0,Ae,We,Te.data);else if(M.isData3DTexture)w?(ce&&i.texStorage3D(s.TEXTURE_3D,Se,Ie,Te.width,Te.height,Te.depth),Ee&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Te.width,Te.height,Te.depth,Ae,We,Te.data)):i.texImage3D(s.TEXTURE_3D,0,Ie,Te.width,Te.height,Te.depth,0,Ae,We,Te.data);else if(M.isFramebufferTexture){if(ce)if(w)i.texStorage2D(s.TEXTURE_2D,Se,Ie,Te.width,Te.height);else{let be=Te.width,pe=Te.height;for(let De=0;De<Se;De++)i.texImage2D(s.TEXTURE_2D,De,Ie,be,pe,0,Ae,We,null),be>>=1,pe>>=1}}else if(it.length>0){if(w&&ce){const be=nt(it[0]);i.texStorage2D(s.TEXTURE_2D,Se,Ie,be.width,be.height)}for(let be=0,pe=it.length;be<pe;be++)ze=it[be],w?Ee&&i.texSubImage2D(s.TEXTURE_2D,be,0,0,Ae,We,ze):i.texImage2D(s.TEXTURE_2D,be,Ie,Ae,We,ze);M.generateMipmaps=!1}else if(w){if(ce){const be=nt(Te);i.texStorage2D(s.TEXTURE_2D,Se,Ie,be.width,be.height)}Ee&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Ae,We,Te)}else i.texImage2D(s.TEXTURE_2D,0,Ie,Ae,We,Te);y(M)&&b(me),je.__version=fe.version,M.onUpdate&&M.onUpdate(M)}N.__version=M.version}function he(N,M,Q){if(M.image.length!==6)return;const me=ge(N,M),Me=M.source;i.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+Q);const fe=r.get(Me);if(Me.version!==fe.__version||me===!0){i.activeTexture(s.TEXTURE0+Q);const je=Nt.getPrimaries(Nt.workingColorSpace),we=M.colorSpace===$a?null:Nt.getPrimaries(M.colorSpace),Ke=M.colorSpace===$a||je===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);const qe=M.isCompressedTexture||M.image[0].isCompressedTexture,Te=M.image[0]&&M.image[0].isDataTexture,Ae=[];for(let pe=0;pe<6;pe++)!qe&&!Te?Ae[pe]=D(M.image[pe],!0,l.maxCubemapSize):Ae[pe]=Te?M.image[pe].image:M.image[pe],Ae[pe]=Ze(M,Ae[pe]);const We=Ae[0],Ie=c.convert(M.format,M.colorSpace),ze=c.convert(M.type),it=L(M.internalFormat,Ie,ze,M.colorSpace),w=M.isVideoTexture!==!0,ce=fe.__version===void 0||me===!0,Ee=Me.dataReady;let Se=q(M,We);J(s.TEXTURE_CUBE_MAP,M);let be;if(qe){w&&ce&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Se,it,We.width,We.height);for(let pe=0;pe<6;pe++){be=Ae[pe].mipmaps;for(let De=0;De<be.length;De++){const Fe=be[De];M.format!==vi?Ie!==null?w?Ee&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,0,0,Fe.width,Fe.height,Ie,Fe.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,it,Fe.width,Fe.height,0,Fe.data):ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):w?Ee&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,0,0,Fe.width,Fe.height,Ie,ze,Fe.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,it,Fe.width,Fe.height,0,Ie,ze,Fe.data)}}}else{if(be=M.mipmaps,w&&ce){be.length>0&&Se++;const pe=nt(Ae[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Se,it,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(Te){w?Ee&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Ae[pe].width,Ae[pe].height,Ie,ze,Ae[pe].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,it,Ae[pe].width,Ae[pe].height,0,Ie,ze,Ae[pe].data);for(let De=0;De<be.length;De++){const _t=be[De].image[pe].image;w?Ee&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,0,0,_t.width,_t.height,Ie,ze,_t.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,it,_t.width,_t.height,0,Ie,ze,_t.data)}}else{w?Ee&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Ie,ze,Ae[pe]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,it,Ie,ze,Ae[pe]);for(let De=0;De<be.length;De++){const Fe=be[De];w?Ee&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,0,0,Ie,ze,Fe.image[pe]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,it,Ie,ze,Fe.image[pe])}}}y(M)&&b(s.TEXTURE_CUBE_MAP),fe.__version=Me.version,M.onUpdate&&M.onUpdate(M)}N.__version=M.version}function Ue(N,M,Q,me,Me,fe){const je=c.convert(Q.format,Q.colorSpace),we=c.convert(Q.type),Ke=L(Q.internalFormat,je,we,Q.colorSpace),qe=r.get(M),Te=r.get(Q);if(Te.__renderTarget=M,!qe.__hasExternalTextures){const Ae=Math.max(1,M.width>>fe),We=Math.max(1,M.height>>fe);Me===s.TEXTURE_3D||Me===s.TEXTURE_2D_ARRAY?i.texImage3D(Me,fe,Ke,Ae,We,M.depth,0,je,we,null):i.texImage2D(Me,fe,Ke,Ae,We,0,je,we,null)}i.bindFramebuffer(s.FRAMEBUFFER,N),He(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,Me,Te.__webglTexture,0,Ct(M)):(Me===s.TEXTURE_2D||Me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,me,Me,Te.__webglTexture,fe),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Ve(N,M,Q){if(s.bindRenderbuffer(s.RENDERBUFFER,N),M.depthBuffer){const me=M.depthTexture,Me=me&&me.isDepthTexture?me.type:null,fe=H(M.stencilBuffer,Me),je=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=Ct(M);He(M)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,fe,M.width,M.height):Q?s.renderbufferStorageMultisample(s.RENDERBUFFER,we,fe,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,fe,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,je,s.RENDERBUFFER,N)}else{const me=M.textures;for(let Me=0;Me<me.length;Me++){const fe=me[Me],je=c.convert(fe.format,fe.colorSpace),we=c.convert(fe.type),Ke=L(fe.internalFormat,je,we,fe.colorSpace),qe=Ct(M);Q&&He(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,Ke,M.width,M.height):He(M)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe,Ke,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Ke,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Xe(N,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(s.FRAMEBUFFER,N),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const me=r.get(M.depthTexture);me.__renderTarget=M,(!me.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),de(M.depthTexture,0);const Me=me.__webglTexture,fe=Ct(M);if(M.depthTexture.format===Wo)He(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0,fe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0);else if(M.depthTexture.format===Yo)He(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0,fe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0);else throw new Error("Unknown depthTexture format")}function rt(N){const M=r.get(N),Q=N.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==N.depthTexture){const me=N.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),me){const Me=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,me.removeEventListener("dispose",Me)};me.addEventListener("dispose",Me),M.__depthDisposeCallback=Me}M.__boundDepthTexture=me}if(N.depthTexture&&!M.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");const me=N.texture.mipmaps;me&&me.length>0?Xe(M.__webglFramebuffer[0],N):Xe(M.__webglFramebuffer,N)}else if(Q){M.__webglDepthbuffer=[];for(let me=0;me<6;me++)if(i.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[me]),M.__webglDepthbuffer[me]===void 0)M.__webglDepthbuffer[me]=s.createRenderbuffer(),Ve(M.__webglDepthbuffer[me],N,!1);else{const Me=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=M.__webglDepthbuffer[me];s.bindRenderbuffer(s.RENDERBUFFER,fe),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,fe)}}else{const me=N.texture.mipmaps;if(me&&me.length>0?i.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Ve(M.__webglDepthbuffer,N,!1);else{const Me=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,fe),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,fe)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(N,M,Q){const me=r.get(N);M!==void 0&&Ue(me.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Q!==void 0&&rt(N)}function ot(N){const M=N.texture,Q=r.get(N),me=r.get(M);N.addEventListener("dispose",I);const Me=N.textures,fe=N.isWebGLCubeRenderTarget===!0,je=Me.length>1;if(je||(me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture()),me.__version=M.version,h.memory.textures++),fe){Q.__webglFramebuffer=[];for(let we=0;we<6;we++)if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer[we]=[];for(let Ke=0;Ke<M.mipmaps.length;Ke++)Q.__webglFramebuffer[we][Ke]=s.createFramebuffer()}else Q.__webglFramebuffer[we]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer=[];for(let we=0;we<M.mipmaps.length;we++)Q.__webglFramebuffer[we]=s.createFramebuffer()}else Q.__webglFramebuffer=s.createFramebuffer();if(je)for(let we=0,Ke=Me.length;we<Ke;we++){const qe=r.get(Me[we]);qe.__webglTexture===void 0&&(qe.__webglTexture=s.createTexture(),h.memory.textures++)}if(N.samples>0&&He(N)===!1){Q.__webglMultisampledFramebuffer=s.createFramebuffer(),Q.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let we=0;we<Me.length;we++){const Ke=Me[we];Q.__webglColorRenderbuffer[we]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Q.__webglColorRenderbuffer[we]);const qe=c.convert(Ke.format,Ke.colorSpace),Te=c.convert(Ke.type),Ae=L(Ke.internalFormat,qe,Te,Ke.colorSpace,N.isXRRenderTarget===!0),We=Ct(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,We,Ae,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,Q.__webglColorRenderbuffer[we])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(Q.__webglDepthRenderbuffer=s.createRenderbuffer(),Ve(Q.__webglDepthRenderbuffer,N,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(fe){i.bindTexture(s.TEXTURE_CUBE_MAP,me.__webglTexture),J(s.TEXTURE_CUBE_MAP,M);for(let we=0;we<6;we++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ke=0;Ke<M.mipmaps.length;Ke++)Ue(Q.__webglFramebuffer[we][Ke],N,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ke);else Ue(Q.__webglFramebuffer[we],N,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);y(M)&&b(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(je){for(let we=0,Ke=Me.length;we<Ke;we++){const qe=Me[we],Te=r.get(qe);let Ae=s.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ae=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Ae,Te.__webglTexture),J(Ae,qe),Ue(Q.__webglFramebuffer,N,qe,s.COLOR_ATTACHMENT0+we,Ae,0),y(qe)&&b(Ae)}i.unbindTexture()}else{let we=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(we=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(we,me.__webglTexture),J(we,M),M.mipmaps&&M.mipmaps.length>0)for(let Ke=0;Ke<M.mipmaps.length;Ke++)Ue(Q.__webglFramebuffer[Ke],N,M,s.COLOR_ATTACHMENT0,we,Ke);else Ue(Q.__webglFramebuffer,N,M,s.COLOR_ATTACHMENT0,we,0);y(M)&&b(we),i.unbindTexture()}N.depthBuffer&&rt(N)}function St(N){const M=N.textures;for(let Q=0,me=M.length;Q<me;Q++){const Me=M[Q];if(y(Me)){const fe=P(N),je=r.get(Me).__webglTexture;i.bindTexture(fe,je),b(fe),i.unbindTexture()}}}const G=[],lt=[];function st(N){if(N.samples>0){if(He(N)===!1){const M=N.textures,Q=N.width,me=N.height;let Me=s.COLOR_BUFFER_BIT;const fe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,je=r.get(N),we=M.length>1;if(we)for(let qe=0;qe<M.length;qe++)i.bindFramebuffer(s.FRAMEBUFFER,je.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,je.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,je.__webglMultisampledFramebuffer);const Ke=N.texture.mipmaps;Ke&&Ke.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglFramebuffer);for(let qe=0;qe<M.length;qe++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Me|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Me|=s.STENCIL_BUFFER_BIT)),we){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,je.__webglColorRenderbuffer[qe]);const Te=r.get(M[qe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Te,0)}s.blitFramebuffer(0,0,Q,me,0,0,Q,me,Me,s.NEAREST),m===!0&&(G.length=0,lt.length=0,G.push(s.COLOR_ATTACHMENT0+qe),N.depthBuffer&&N.resolveDepthBuffer===!1&&(G.push(fe),lt.push(fe),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,lt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,G))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),we)for(let qe=0;qe<M.length;qe++){i.bindFramebuffer(s.FRAMEBUFFER,je.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,je.__webglColorRenderbuffer[qe]);const Te=r.get(M[qe]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,je.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,Te,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&m){const M=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Ct(N){return Math.min(l.maxSamples,N.samples)}function He(N){const M=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Pt(N){const M=h.render.frame;x.get(N)!==M&&(x.set(N,M),N.update())}function Ze(N,M){const Q=N.colorSpace,me=N.format,Me=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Q!==Nr&&Q!==$a&&(Nt.getTransfer(Q)===Xt?(me!==vi||Me!==ga)&&ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):sn("WebGLTextures: Unsupported texture color space:",Q)),M}function nt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=le,this.resetTextureUnits=$,this.setTexture2D=de,this.setTexture2DArray=z,this.setTexture3D=Y,this.setTextureCube=F,this.rebindTextures=Ht,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=He}function DE(s,e){function i(r,l=$a){let c;const h=Nt.getTransfer(l);if(r===ga)return s.UNSIGNED_BYTE;if(r===wd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Ud)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Bg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Hg)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===Ig)return s.BYTE;if(r===Fg)return s.SHORT;if(r===Xo)return s.UNSIGNED_SHORT;if(r===Dd)return s.INT;if(r===Lr)return s.UNSIGNED_INT;if(r===da)return s.FLOAT;if(r===Pr)return s.HALF_FLOAT;if(r===Gg)return s.ALPHA;if(r===Vg)return s.RGB;if(r===vi)return s.RGBA;if(r===Wo)return s.DEPTH_COMPONENT;if(r===Yo)return s.DEPTH_STENCIL;if(r===kg)return s.RED;if(r===Ld)return s.RED_INTEGER;if(r===Nd)return s.RG;if(r===Od)return s.RG_INTEGER;if(r===Pd)return s.RGBA_INTEGER;if(r===Lu||r===Nu||r===Ou||r===Pu)if(h===Xt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Lu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Pu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Lu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Nu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ou)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Pu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Kh||r===Qh||r===Jh||r===$h)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===Kh)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Qh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Jh)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===$h)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ed||r===td||r===nd)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===ed||r===td)return h===Xt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===nd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===id||r===ad||r===rd||r===sd||r===od||r===ld||r===ud||r===cd||r===fd||r===hd||r===dd||r===pd||r===md||r===xd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===id)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ad)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===rd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===sd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===od)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ld)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ud)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===cd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===fd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===hd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===dd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===pd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===md)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===xd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===gd||r===_d||r===vd)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===gd)return h===Xt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===_d)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===vd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===bd||r===yd||r===Sd||r===Md)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===bd)return c.COMPRESSED_RED_RGTC1_EXT;if(r===yd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Sd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Md)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===qo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const wE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,UE=`
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

}`;class LE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new i_(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new Fi({vertexShader:wE,fragmentShader:UE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ii(new Xu(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class NE extends zr{constructor(e,i){super();const r=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,x=null,_=null,v=null,S=null,A=null;const D=typeof XRWebGLBinding<"u",y=new LE,b={},P=i.getContextAttributes();let L=null,H=null;const q=[],O=[],I=new ct;let te=null;const U=new gi;U.viewport=new on;const C=new gi;C.viewport=new on;const V=[U,C],$=new Qy;let le=null,_e=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let he=q[ae];return he===void 0&&(he=new Ch,q[ae]=he),he.getTargetRaySpace()},this.getControllerGrip=function(ae){let he=q[ae];return he===void 0&&(he=new Ch,q[ae]=he),he.getGripSpace()},this.getHand=function(ae){let he=q[ae];return he===void 0&&(he=new Ch,q[ae]=he),he.getHandSpace()};function de(ae){const he=O.indexOf(ae.inputSource);if(he===-1)return;const Ue=q[he];Ue!==void 0&&(Ue.update(ae.inputSource,ae.frame,p||h),Ue.dispatchEvent({type:ae.type,data:ae.inputSource}))}function z(){l.removeEventListener("select",de),l.removeEventListener("selectstart",de),l.removeEventListener("selectend",de),l.removeEventListener("squeeze",de),l.removeEventListener("squeezestart",de),l.removeEventListener("squeezeend",de),l.removeEventListener("end",z),l.removeEventListener("inputsourceschange",Y);for(let ae=0;ae<q.length;ae++){const he=O[ae];he!==null&&(O[ae]=null,q[ae].disconnect(he))}le=null,_e=null,y.reset();for(const ae in b)delete b[ae];e.setRenderTarget(L),S=null,v=null,_=null,l=null,H=null,Oe.stop(),r.isPresenting=!1,e.setPixelRatio(te),e.setSize(I.width,I.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){c=ae,r.isPresenting===!0&&ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){d=ae,r.isPresenting===!0&&ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(ae){p=ae},this.getBaseLayer=function(){return v!==null?v:S},this.getBinding=function(){return _===null&&D&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return A},this.getSession=function(){return l},this.setSession=async function(ae){if(l=ae,l!==null){if(L=e.getRenderTarget(),l.addEventListener("select",de),l.addEventListener("selectstart",de),l.addEventListener("selectend",de),l.addEventListener("squeeze",de),l.addEventListener("squeezestart",de),l.addEventListener("squeezeend",de),l.addEventListener("end",z),l.addEventListener("inputsourceschange",Y),P.xrCompatible!==!0&&await i.makeXRCompatible(),te=e.getPixelRatio(),e.getSize(I),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ue=null,Ve=null,Xe=null;P.depth&&(Xe=P.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Ue=P.stencil?Yo:Wo,Ve=P.stencil?qo:Lr);const rt={colorFormat:i.RGBA8,depthFormat:Xe,scaleFactor:c};_=this.getBinding(),v=_.createProjectionLayer(rt),l.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),H=new ir(v.textureWidth,v.textureHeight,{format:vi,type:ga,depthTexture:new n_(v.textureWidth,v.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,Ue),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const Ue={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,Ue),l.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),H=new ir(S.framebufferWidth,S.framebufferHeight,{format:vi,type:ga,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}H.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Oe.setContext(l),Oe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Y(ae){for(let he=0;he<ae.removed.length;he++){const Ue=ae.removed[he],Ve=O.indexOf(Ue);Ve>=0&&(O[Ve]=null,q[Ve].disconnect(Ue))}for(let he=0;he<ae.added.length;he++){const Ue=ae.added[he];let Ve=O.indexOf(Ue);if(Ve===-1){for(let rt=0;rt<q.length;rt++)if(rt>=O.length){O.push(Ue),Ve=rt;break}else if(O[rt]===null){O[rt]=Ue,Ve=rt;break}if(Ve===-1)break}const Xe=q[Ve];Xe&&Xe.connect(Ue)}}const F=new oe,k=new oe;function W(ae,he,Ue){F.setFromMatrixPosition(he.matrixWorld),k.setFromMatrixPosition(Ue.matrixWorld);const Ve=F.distanceTo(k),Xe=he.projectionMatrix.elements,rt=Ue.projectionMatrix.elements,Ht=Xe[14]/(Xe[10]-1),ot=Xe[14]/(Xe[10]+1),St=(Xe[9]+1)/Xe[5],G=(Xe[9]-1)/Xe[5],lt=(Xe[8]-1)/Xe[0],st=(rt[8]+1)/rt[0],Ct=Ht*lt,He=Ht*st,Pt=Ve/(-lt+st),Ze=Pt*-lt;if(he.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(Ze),ae.translateZ(Pt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Xe[10]===-1)ae.projectionMatrix.copy(he.projectionMatrix),ae.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const nt=Ht+Pt,N=ot+Pt,M=Ct-Ze,Q=He+(Ve-Ze),me=St*ot/N*nt,Me=G*ot/N*nt;ae.projectionMatrix.makePerspective(M,Q,me,Me,nt,N),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function R(ae,he){he===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(he.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(l===null)return;let he=ae.near,Ue=ae.far;y.texture!==null&&(y.depthNear>0&&(he=y.depthNear),y.depthFar>0&&(Ue=y.depthFar)),$.near=C.near=U.near=he,$.far=C.far=U.far=Ue,(le!==$.near||_e!==$.far)&&(l.updateRenderState({depthNear:$.near,depthFar:$.far}),le=$.near,_e=$.far),$.layers.mask=ae.layers.mask|6,U.layers.mask=$.layers.mask&3,C.layers.mask=$.layers.mask&5;const Ve=ae.parent,Xe=$.cameras;R($,Ve);for(let rt=0;rt<Xe.length;rt++)R(Xe[rt],Ve);Xe.length===2?W($,U,C):$.projectionMatrix.copy(U.projectionMatrix),J(ae,$,Ve)};function J(ae,he,Ue){Ue===null?ae.matrix.copy(he.matrixWorld):(ae.matrix.copy(Ue.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(he.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(he.projectionMatrix),ae.projectionMatrixInverse.copy(he.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Ed*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(v===null&&S===null))return m},this.setFoveation=function(ae){m=ae,v!==null&&(v.fixedFoveation=ae),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=ae)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh($)},this.getCameraTexture=function(ae){return b[ae]};let ge=null;function Re(ae,he){if(x=he.getViewerPose(p||h),A=he,x!==null){const Ue=x.views;S!==null&&(e.setRenderTargetFramebuffer(H,S.framebuffer),e.setRenderTarget(H));let Ve=!1;Ue.length!==$.cameras.length&&($.cameras.length=0,Ve=!0);for(let ot=0;ot<Ue.length;ot++){const St=Ue[ot];let G=null;if(S!==null)G=S.getViewport(St);else{const st=_.getViewSubImage(v,St);G=st.viewport,ot===0&&(e.setRenderTargetTextures(H,st.colorTexture,st.depthStencilTexture),e.setRenderTarget(H))}let lt=V[ot];lt===void 0&&(lt=new gi,lt.layers.enable(ot),lt.viewport=new on,V[ot]=lt),lt.matrix.fromArray(St.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(St.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(G.x,G.y,G.width,G.height),ot===0&&($.matrix.copy(lt.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),Ve===!0&&$.cameras.push(lt)}const Xe=l.enabledFeatures;if(Xe&&Xe.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&D){_=r.getBinding();const ot=_.getDepthInformation(Ue[0]);ot&&ot.isValid&&ot.texture&&y.init(ot,l.renderState)}if(Xe&&Xe.includes("camera-access")&&D){e.state.unbindTexture(),_=r.getBinding();for(let ot=0;ot<Ue.length;ot++){const St=Ue[ot].camera;if(St){let G=b[St];G||(G=new i_,b[St]=G);const lt=_.getCameraImage(St);G.sourceTexture=lt}}}}for(let Ue=0;Ue<q.length;Ue++){const Ve=O[Ue],Xe=q[Ue];Ve!==null&&Xe!==void 0&&Xe.update(Ve,he,p||h)}ge&&ge(ae,he),he.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:he}),A=null}const Oe=new a_;Oe.setAnimationLoop(Re),this.setAnimationLoop=function(ae){ge=ae},this.dispose=function(){}}}const Rr=new _a,OE=new vn;function PE(s,e){function i(y,b){y.matrixAutoUpdate===!0&&y.updateMatrix(),b.value.copy(y.matrix)}function r(y,b){b.color.getRGB(y.fogColor.value,$g(s)),b.isFog?(y.fogNear.value=b.near,y.fogFar.value=b.far):b.isFogExp2&&(y.fogDensity.value=b.density)}function l(y,b,P,L,H){b.isMeshBasicMaterial||b.isMeshLambertMaterial?c(y,b):b.isMeshToonMaterial?(c(y,b),_(y,b)):b.isMeshPhongMaterial?(c(y,b),x(y,b)):b.isMeshStandardMaterial?(c(y,b),v(y,b),b.isMeshPhysicalMaterial&&S(y,b,H)):b.isMeshMatcapMaterial?(c(y,b),A(y,b)):b.isMeshDepthMaterial?c(y,b):b.isMeshDistanceMaterial?(c(y,b),D(y,b)):b.isMeshNormalMaterial?c(y,b):b.isLineBasicMaterial?(h(y,b),b.isLineDashedMaterial&&d(y,b)):b.isPointsMaterial?m(y,b,P,L):b.isSpriteMaterial?p(y,b):b.isShadowMaterial?(y.color.value.copy(b.color),y.opacity.value=b.opacity):b.isShaderMaterial&&(b.uniformsNeedUpdate=!1)}function c(y,b){y.opacity.value=b.opacity,b.color&&y.diffuse.value.copy(b.color),b.emissive&&y.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity),b.map&&(y.map.value=b.map,i(b.map,y.mapTransform)),b.alphaMap&&(y.alphaMap.value=b.alphaMap,i(b.alphaMap,y.alphaMapTransform)),b.bumpMap&&(y.bumpMap.value=b.bumpMap,i(b.bumpMap,y.bumpMapTransform),y.bumpScale.value=b.bumpScale,b.side===jn&&(y.bumpScale.value*=-1)),b.normalMap&&(y.normalMap.value=b.normalMap,i(b.normalMap,y.normalMapTransform),y.normalScale.value.copy(b.normalScale),b.side===jn&&y.normalScale.value.negate()),b.displacementMap&&(y.displacementMap.value=b.displacementMap,i(b.displacementMap,y.displacementMapTransform),y.displacementScale.value=b.displacementScale,y.displacementBias.value=b.displacementBias),b.emissiveMap&&(y.emissiveMap.value=b.emissiveMap,i(b.emissiveMap,y.emissiveMapTransform)),b.specularMap&&(y.specularMap.value=b.specularMap,i(b.specularMap,y.specularMapTransform)),b.alphaTest>0&&(y.alphaTest.value=b.alphaTest);const P=e.get(b),L=P.envMap,H=P.envMapRotation;L&&(y.envMap.value=L,Rr.copy(H),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),y.envMapRotation.value.setFromMatrix4(OE.makeRotationFromEuler(Rr)),y.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=b.reflectivity,y.ior.value=b.ior,y.refractionRatio.value=b.refractionRatio),b.lightMap&&(y.lightMap.value=b.lightMap,y.lightMapIntensity.value=b.lightMapIntensity,i(b.lightMap,y.lightMapTransform)),b.aoMap&&(y.aoMap.value=b.aoMap,y.aoMapIntensity.value=b.aoMapIntensity,i(b.aoMap,y.aoMapTransform))}function h(y,b){y.diffuse.value.copy(b.color),y.opacity.value=b.opacity,b.map&&(y.map.value=b.map,i(b.map,y.mapTransform))}function d(y,b){y.dashSize.value=b.dashSize,y.totalSize.value=b.dashSize+b.gapSize,y.scale.value=b.scale}function m(y,b,P,L){y.diffuse.value.copy(b.color),y.opacity.value=b.opacity,y.size.value=b.size*P,y.scale.value=L*.5,b.map&&(y.map.value=b.map,i(b.map,y.uvTransform)),b.alphaMap&&(y.alphaMap.value=b.alphaMap,i(b.alphaMap,y.alphaMapTransform)),b.alphaTest>0&&(y.alphaTest.value=b.alphaTest)}function p(y,b){y.diffuse.value.copy(b.color),y.opacity.value=b.opacity,y.rotation.value=b.rotation,b.map&&(y.map.value=b.map,i(b.map,y.mapTransform)),b.alphaMap&&(y.alphaMap.value=b.alphaMap,i(b.alphaMap,y.alphaMapTransform)),b.alphaTest>0&&(y.alphaTest.value=b.alphaTest)}function x(y,b){y.specular.value.copy(b.specular),y.shininess.value=Math.max(b.shininess,1e-4)}function _(y,b){b.gradientMap&&(y.gradientMap.value=b.gradientMap)}function v(y,b){y.metalness.value=b.metalness,b.metalnessMap&&(y.metalnessMap.value=b.metalnessMap,i(b.metalnessMap,y.metalnessMapTransform)),y.roughness.value=b.roughness,b.roughnessMap&&(y.roughnessMap.value=b.roughnessMap,i(b.roughnessMap,y.roughnessMapTransform)),b.envMap&&(y.envMapIntensity.value=b.envMapIntensity)}function S(y,b,P){y.ior.value=b.ior,b.sheen>0&&(y.sheenColor.value.copy(b.sheenColor).multiplyScalar(b.sheen),y.sheenRoughness.value=b.sheenRoughness,b.sheenColorMap&&(y.sheenColorMap.value=b.sheenColorMap,i(b.sheenColorMap,y.sheenColorMapTransform)),b.sheenRoughnessMap&&(y.sheenRoughnessMap.value=b.sheenRoughnessMap,i(b.sheenRoughnessMap,y.sheenRoughnessMapTransform))),b.clearcoat>0&&(y.clearcoat.value=b.clearcoat,y.clearcoatRoughness.value=b.clearcoatRoughness,b.clearcoatMap&&(y.clearcoatMap.value=b.clearcoatMap,i(b.clearcoatMap,y.clearcoatMapTransform)),b.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=b.clearcoatRoughnessMap,i(b.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),b.clearcoatNormalMap&&(y.clearcoatNormalMap.value=b.clearcoatNormalMap,i(b.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(b.clearcoatNormalScale),b.side===jn&&y.clearcoatNormalScale.value.negate())),b.dispersion>0&&(y.dispersion.value=b.dispersion),b.iridescence>0&&(y.iridescence.value=b.iridescence,y.iridescenceIOR.value=b.iridescenceIOR,y.iridescenceThicknessMinimum.value=b.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=b.iridescenceThicknessRange[1],b.iridescenceMap&&(y.iridescenceMap.value=b.iridescenceMap,i(b.iridescenceMap,y.iridescenceMapTransform)),b.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=b.iridescenceThicknessMap,i(b.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),b.transmission>0&&(y.transmission.value=b.transmission,y.transmissionSamplerMap.value=P.texture,y.transmissionSamplerSize.value.set(P.width,P.height),b.transmissionMap&&(y.transmissionMap.value=b.transmissionMap,i(b.transmissionMap,y.transmissionMapTransform)),y.thickness.value=b.thickness,b.thicknessMap&&(y.thicknessMap.value=b.thicknessMap,i(b.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=b.attenuationDistance,y.attenuationColor.value.copy(b.attenuationColor)),b.anisotropy>0&&(y.anisotropyVector.value.set(b.anisotropy*Math.cos(b.anisotropyRotation),b.anisotropy*Math.sin(b.anisotropyRotation)),b.anisotropyMap&&(y.anisotropyMap.value=b.anisotropyMap,i(b.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=b.specularIntensity,y.specularColor.value.copy(b.specularColor),b.specularColorMap&&(y.specularColorMap.value=b.specularColorMap,i(b.specularColorMap,y.specularColorMapTransform)),b.specularIntensityMap&&(y.specularIntensityMap.value=b.specularIntensityMap,i(b.specularIntensityMap,y.specularIntensityMapTransform))}function A(y,b){b.matcap&&(y.matcap.value=b.matcap)}function D(y,b){const P=e.get(b).light;y.referencePosition.value.setFromMatrixPosition(P.matrixWorld),y.nearDistance.value=P.shadow.camera.near,y.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function zE(s,e,i,r){let l={},c={},h=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(P,L){const H=L.program;r.uniformBlockBinding(P,H)}function p(P,L){let H=l[P.id];H===void 0&&(A(P),H=x(P),l[P.id]=H,P.addEventListener("dispose",y));const q=L.program;r.updateUBOMapping(P,q);const O=e.render.frame;c[P.id]!==O&&(v(P),c[P.id]=O)}function x(P){const L=_();P.__bindingPointIndex=L;const H=s.createBuffer(),q=P.__size,O=P.usage;return s.bindBuffer(s.UNIFORM_BUFFER,H),s.bufferData(s.UNIFORM_BUFFER,q,O),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,L,H),H}function _(){for(let P=0;P<d;P++)if(h.indexOf(P)===-1)return h.push(P),P;return sn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(P){const L=l[P.id],H=P.uniforms,q=P.__cache;s.bindBuffer(s.UNIFORM_BUFFER,L);for(let O=0,I=H.length;O<I;O++){const te=Array.isArray(H[O])?H[O]:[H[O]];for(let U=0,C=te.length;U<C;U++){const V=te[U];if(S(V,O,U,q)===!0){const $=V.__offset,le=Array.isArray(V.value)?V.value:[V.value];let _e=0;for(let de=0;de<le.length;de++){const z=le[de],Y=D(z);typeof z=="number"||typeof z=="boolean"?(V.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,$+_e,V.__data)):z.isMatrix3?(V.__data[0]=z.elements[0],V.__data[1]=z.elements[1],V.__data[2]=z.elements[2],V.__data[3]=0,V.__data[4]=z.elements[3],V.__data[5]=z.elements[4],V.__data[6]=z.elements[5],V.__data[7]=0,V.__data[8]=z.elements[6],V.__data[9]=z.elements[7],V.__data[10]=z.elements[8],V.__data[11]=0):(z.toArray(V.__data,_e),_e+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,$,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(P,L,H,q){const O=P.value,I=L+"_"+H;if(q[I]===void 0)return typeof O=="number"||typeof O=="boolean"?q[I]=O:q[I]=O.clone(),!0;{const te=q[I];if(typeof O=="number"||typeof O=="boolean"){if(te!==O)return q[I]=O,!0}else if(te.equals(O)===!1)return te.copy(O),!0}return!1}function A(P){const L=P.uniforms;let H=0;const q=16;for(let I=0,te=L.length;I<te;I++){const U=Array.isArray(L[I])?L[I]:[L[I]];for(let C=0,V=U.length;C<V;C++){const $=U[C],le=Array.isArray($.value)?$.value:[$.value];for(let _e=0,de=le.length;_e<de;_e++){const z=le[_e],Y=D(z),F=H%q,k=F%Y.boundary,W=F+k;H+=k,W!==0&&q-W<Y.storage&&(H+=q-W),$.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=H,H+=Y.storage}}}const O=H%q;return O>0&&(H+=q-O),P.__size=H,P.__cache={},this}function D(P){const L={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(L.boundary=4,L.storage=4):P.isVector2?(L.boundary=8,L.storage=8):P.isVector3||P.isColor?(L.boundary=16,L.storage=12):P.isVector4?(L.boundary=16,L.storage=16):P.isMatrix3?(L.boundary=48,L.storage=48):P.isMatrix4?(L.boundary=64,L.storage=64):P.isTexture?ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ft("WebGLRenderer: Unsupported uniform value type.",P),L}function y(P){const L=P.target;L.removeEventListener("dispose",y);const H=h.indexOf(L.__bindingPointIndex);h.splice(H,1),s.deleteBuffer(l[L.id]),delete l[L.id],delete c[L.id]}function b(){for(const P in l)s.deleteBuffer(l[P]);h=[],l={},c={}}return{bind:m,update:p,dispose:b}}const IE=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let ca=null;function FE(){return ca===null&&(ca=new Xy(IE,32,32,Nd,Pr),ca.minFilter=Yn,ca.magFilter=Yn,ca.wrapS=Ci,ca.wrapT=Ci,ca.generateMipmaps=!1,ca.needsUpdate=!0),ca}class BE{constructor(e={}){const{canvas:i=xy(),context:r=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=h;const A=new Set([Pd,Od,Ld]),D=new Set([ga,Lr,Xo,qo,wd,Ud]),y=new Uint32Array(4),b=new Int32Array(4);let P=null,L=null;const H=[],q=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ma,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let I=!1;this._outputColorSpace=xi;let te=0,U=0,C=null,V=-1,$=null;const le=new on,_e=new on;let de=null;const z=new Bt(0);let Y=0,F=i.width,k=i.height,W=1,R=null,J=null;const ge=new on(0,0,F,k),Re=new on(0,0,F,k);let Oe=!1;const ae=new t_;let he=!1,Ue=!1;const Ve=new vn,Xe=new oe,rt=new on,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function St(){return C===null?W:1}let G=r;function lt(T,j){return i.getContext(T,j)}try{const T={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:x,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Cd}`),i.addEventListener("webglcontextlost",be,!1),i.addEventListener("webglcontextrestored",pe,!1),i.addEventListener("webglcontextcreationerror",De,!1),G===null){const j="webgl2";if(G=lt(j,T),G===null)throw lt(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw T("WebGLRenderer: "+T.message),T}let st,Ct,He,Pt,Ze,nt,N,M,Q,me,Me,fe,je,we,Ke,qe,Te,Ae,We,Ie,ze,it,w,ce;function Ee(){st=new Y1(G),st.init(),it=new DE(G,st),Ct=new F1(G,st,e,it),He=new RE(G,st),Ct.reversedDepthBuffer&&v&&He.buffers.depth.setReversed(!0),Pt=new K1(G),Ze=new pE,nt=new CE(G,st,He,Ze,Ct,it,Pt),N=new H1(O),M=new W1(O),Q=new eS(G),w=new z1(G,Q),me=new j1(G,Q,Pt,w),Me=new J1(G,me,Q,Pt),We=new Q1(G,Ct,nt),qe=new B1(Ze),fe=new dE(O,N,M,st,Ct,w,qe),je=new PE(O,Ze),we=new xE,Ke=new SE(st),Ae=new P1(O,N,M,He,Me,S,m),Te=new TE(O,Me,Ct),ce=new zE(G,Pt,Ct,He),Ie=new I1(G,st,Pt),ze=new Z1(G,st,Pt),Pt.programs=fe.programs,O.capabilities=Ct,O.extensions=st,O.properties=Ze,O.renderLists=we,O.shadowMap=Te,O.state=He,O.info=Pt}Ee();const Se=new NE(O,G);this.xr=Se,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const T=st.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=st.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(F,k,!1))},this.getSize=function(T){return T.set(F,k)},this.setSize=function(T,j,se=!0){if(Se.isPresenting){ft("WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,k=j,i.width=Math.floor(T*W),i.height=Math.floor(j*W),se===!0&&(i.style.width=T+"px",i.style.height=j+"px"),this.setViewport(0,0,T,j)},this.getDrawingBufferSize=function(T){return T.set(F*W,k*W).floor()},this.setDrawingBufferSize=function(T,j,se){F=T,k=j,W=se,i.width=Math.floor(T*se),i.height=Math.floor(j*se),this.setViewport(0,0,T,j)},this.getCurrentViewport=function(T){return T.copy(le)},this.getViewport=function(T){return T.copy(ge)},this.setViewport=function(T,j,se,ie){T.isVector4?ge.set(T.x,T.y,T.z,T.w):ge.set(T,j,se,ie),He.viewport(le.copy(ge).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(Re)},this.setScissor=function(T,j,se,ie){T.isVector4?Re.set(T.x,T.y,T.z,T.w):Re.set(T,j,se,ie),He.scissor(_e.copy(Re).multiplyScalar(W).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(T){He.setScissorTest(Oe=T)},this.setOpaqueSort=function(T){R=T},this.setTransparentSort=function(T){J=T},this.getClearColor=function(T){return T.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(T=!0,j=!0,se=!0){let ie=0;if(T){let K=!1;if(C!==null){const Ce=C.texture.format;K=A.has(Ce)}if(K){const Ce=C.texture.type,Le=D.has(Ce),Be=Ae.getClearColor(),Ge=Ae.getClearAlpha(),et=Be.r,at=Be.g,Qe=Be.b;Le?(y[0]=et,y[1]=at,y[2]=Qe,y[3]=Ge,G.clearBufferuiv(G.COLOR,0,y)):(b[0]=et,b[1]=at,b[2]=Qe,b[3]=Ge,G.clearBufferiv(G.COLOR,0,b))}else ie|=G.COLOR_BUFFER_BIT}j&&(ie|=G.DEPTH_BUFFER_BIT),se&&(ie|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",be,!1),i.removeEventListener("webglcontextrestored",pe,!1),i.removeEventListener("webglcontextcreationerror",De,!1),Ae.dispose(),we.dispose(),Ke.dispose(),Ze.dispose(),N.dispose(),M.dispose(),Me.dispose(),w.dispose(),ce.dispose(),fe.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Hs),Se.removeEventListener("sessionend",Gs),bi.stop()};function be(T){T.preventDefault(),Fx("WebGLRenderer: Context Lost."),I=!0}function pe(){Fx("WebGLRenderer: Context Restored."),I=!1;const T=Pt.autoReset,j=Te.enabled,se=Te.autoUpdate,ie=Te.needsUpdate,K=Te.type;Ee(),Pt.autoReset=T,Te.enabled=j,Te.autoUpdate=se,Te.needsUpdate=ie,Te.type=K}function De(T){sn("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Fe(T){const j=T.target;j.removeEventListener("dispose",Fe),_t(j)}function _t(T){gt(T),Ze.remove(T)}function gt(T){const j=Ze.get(T).programs;j!==void 0&&(j.forEach(function(se){fe.releaseProgram(se)}),T.isShaderMaterial&&fe.releaseShaderCache(T))}this.renderBufferDirect=function(T,j,se,ie,K,Ce){j===null&&(j=Ht);const Le=K.isMesh&&K.matrixWorld.determinant()<0,Be=Yu(T,j,se,ie,K);He.setMaterial(ie,Le);let Ge=se.index,et=1;if(ie.wireframe===!0){if(Ge=me.getWireframeAttribute(se),Ge===void 0)return;et=2}const at=se.drawRange,Qe=se.attributes.position;let dt=at.start*et,Dt=(at.start+at.count)*et;Ce!==null&&(dt=Math.max(dt,Ce.start*et),Dt=Math.min(Dt,(Ce.start+Ce.count)*et)),Ge!==null?(dt=Math.max(dt,0),Dt=Math.min(Dt,Ge.count)):Qe!=null&&(dt=Math.max(dt,0),Dt=Math.min(Dt,Qe.count));const wt=Dt-dt;if(wt<0||wt===1/0)return;w.setup(K,ie,Be,se,Ge);let Tt,zt=Ie;if(Ge!==null&&(Tt=Q.get(Ge),zt=ze,zt.setIndex(Tt)),K.isMesh)ie.wireframe===!0?(He.setLineWidth(ie.wireframeLinewidth*St()),zt.setMode(G.LINES)):zt.setMode(G.TRIANGLES);else if(K.isLine){let $e=ie.linewidth;$e===void 0&&($e=1),He.setLineWidth($e*St()),K.isLineSegments?zt.setMode(G.LINES):K.isLineLoop?zt.setMode(G.LINE_LOOP):zt.setMode(G.LINE_STRIP)}else K.isPoints?zt.setMode(G.POINTS):K.isSprite&&zt.setMode(G.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)jo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),zt.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))zt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const $e=K._multiDrawStarts,Wt=K._multiDrawCounts,At=K._multiDrawCount,Sn=Ge?Q.get(Ge).bytesPerElement:1,ya=Ze.get(ie).currentProgram.getUniforms();for(let jt=0;jt<At;jt++)ya.setValue(G,"_gl_DrawID",jt),zt.render($e[jt]/Sn,Wt[jt])}else if(K.isInstancedMesh)zt.renderInstances(dt,wt,K.count);else if(se.isInstancedBufferGeometry){const $e=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Wt=Math.min(se.instanceCount,$e);zt.renderInstances(dt,wt,Wt)}else zt.render(dt,wt)};function $t(T,j,se){T.transparent===!0&&T.side===ha&&T.forceSinglePass===!1?(T.side=jn,T.needsUpdate=!0,mn(T,j,se),T.side=nr,T.needsUpdate=!0,mn(T,j,se),T.side=ha):mn(T,j,se)}this.compile=function(T,j,se=null){se===null&&(se=T),L=Ke.get(se),L.init(j),q.push(L),se.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(L.pushLight(K),K.castShadow&&L.pushShadow(K))}),T!==se&&T.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(L.pushLight(K),K.castShadow&&L.pushShadow(K))}),L.setupLights();const ie=new Set;return T.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ce=K.material;if(Ce)if(Array.isArray(Ce))for(let Le=0;Le<Ce.length;Le++){const Be=Ce[Le];$t(Be,se,K),ie.add(Be)}else $t(Ce,se,K),ie.add(Ce)}),L=q.pop(),ie},this.compileAsync=function(T,j,se=null){const ie=this.compile(T,j,se);return new Promise(K=>{function Ce(){if(ie.forEach(function(Le){Ze.get(Le).currentProgram.isReady()&&ie.delete(Le)}),ie.size===0){K(T);return}setTimeout(Ce,10)}st.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Ln=null;function Bs(T){Ln&&Ln(T)}function Hs(){bi.stop()}function Gs(){bi.start()}const bi=new a_;bi.setAnimationLoop(Bs),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(T){Ln=T,Se.setAnimationLoop(T),T===null?bi.stop():bi.start()},Se.addEventListener("sessionstart",Hs),Se.addEventListener("sessionend",Gs),this.render=function(T,j){if(j!==void 0&&j.isCamera!==!0){sn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(j),j=Se.getCamera()),T.isScene===!0&&T.onBeforeRender(O,T,j,C),L=Ke.get(T,q.length),L.init(j),q.push(L),Ve.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ae.setFromProjectionMatrix(Ve,zi,j.reversedDepth),Ue=this.localClippingEnabled,he=qe.init(this.clippingPlanes,Ue),P=we.get(T,H.length),P.init(),H.push(P),Se.enabled===!0&&Se.isPresenting===!0){const Ce=O.xr.getDepthSensingMesh();Ce!==null&&ar(Ce,j,-1/0,O.sortObjects)}ar(T,j,0,O.sortObjects),P.finish(),O.sortObjects===!0&&P.sort(R,J),ot=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,ot&&Ae.addToRenderList(P,T),this.info.render.frame++,he===!0&&qe.beginShadows();const se=L.state.shadowsArray;Te.render(se,T,j),he===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ie=P.opaque,K=P.transmissive;if(L.setupLights(),j.isArrayCamera){const Ce=j.cameras;if(K.length>0)for(let Le=0,Be=Ce.length;Le<Be;Le++){const Ge=Ce[Le];ks(ie,K,T,Ge)}ot&&Ae.render(T);for(let Le=0,Be=Ce.length;Le<Be;Le++){const Ge=Ce[Le];Vs(P,T,Ge,Ge.viewport)}}else K.length>0&&ks(ie,K,T,j),ot&&Ae.render(T),Vs(P,T,j);C!==null&&U===0&&(nt.updateMultisampleRenderTarget(C),nt.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(O,T,j),w.resetDefaultState(),V=-1,$=null,q.pop(),q.length>0?(L=q[q.length-1],he===!0&&qe.setGlobalState(O.clippingPlanes,L.state.camera)):L=null,H.pop(),H.length>0?P=H[H.length-1]:P=null};function ar(T,j,se,ie){if(T.visible===!1)return;if(T.layers.test(j.layers)){if(T.isGroup)se=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(j);else if(T.isLight)L.pushLight(T),T.castShadow&&L.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ae.intersectsSprite(T)){ie&&rt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ve);const Le=Me.update(T),Be=T.material;Be.visible&&P.push(T,Le,Be,se,rt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ae.intersectsObject(T))){const Le=Me.update(T),Be=T.material;if(ie&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),rt.copy(T.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),rt.copy(Le.boundingSphere.center)),rt.applyMatrix4(T.matrixWorld).applyMatrix4(Ve)),Array.isArray(Be)){const Ge=Le.groups;for(let et=0,at=Ge.length;et<at;et++){const Qe=Ge[et],dt=Be[Qe.materialIndex];dt&&dt.visible&&P.push(T,Le,dt,se,rt.z,Qe)}}else Be.visible&&P.push(T,Le,Be,se,rt.z,null)}}const Ce=T.children;for(let Le=0,Be=Ce.length;Le<Be;Le++)ar(Ce[Le],j,se,ie)}function Vs(T,j,se,ie){const{opaque:K,transmissive:Ce,transparent:Le}=T;L.setupLightsView(se),he===!0&&qe.setGlobalState(O.clippingPlanes,se),ie&&He.viewport(le.copy(ie)),K.length>0&&Zn(K,j,se),Ce.length>0&&Zn(Ce,j,se),Le.length>0&&Zn(Le,j,se),He.buffers.depth.setTest(!0),He.buffers.depth.setMask(!0),He.buffers.color.setMask(!0),He.setPolygonOffset(!1)}function ks(T,j,se,ie){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;L.state.transmissionRenderTarget[ie.id]===void 0&&(L.state.transmissionRenderTarget[ie.id]=new ir(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?Pr:ga,minFilter:wr,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace}));const Ce=L.state.transmissionRenderTarget[ie.id],Le=ie.viewport||le;Ce.setSize(Le.z*O.transmissionResolutionScale,Le.w*O.transmissionResolutionScale);const Be=O.getRenderTarget(),Ge=O.getActiveCubeFace(),et=O.getActiveMipmapLevel();O.setRenderTarget(Ce),O.getClearColor(z),Y=O.getClearAlpha(),Y<1&&O.setClearColor(16777215,.5),O.clear(),ot&&Ae.render(se);const at=O.toneMapping;O.toneMapping=ma;const Qe=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),L.setupLightsView(ie),he===!0&&qe.setGlobalState(O.clippingPlanes,ie),Zn(T,se,ie),nt.updateMultisampleRenderTarget(Ce),nt.updateRenderTargetMipmap(Ce),st.has("WEBGL_multisampled_render_to_texture")===!1){let dt=!1;for(let Dt=0,wt=j.length;Dt<wt;Dt++){const Tt=j[Dt],{object:zt,geometry:$e,material:Wt,group:At}=Tt;if(Wt.side===ha&&zt.layers.test(ie.layers)){const Sn=Wt.side;Wt.side=jn,Wt.needsUpdate=!0,ln(zt,se,ie,$e,Wt,At),Wt.side=Sn,Wt.needsUpdate=!0,dt=!0}}dt===!0&&(nt.updateMultisampleRenderTarget(Ce),nt.updateRenderTargetMipmap(Ce))}O.setRenderTarget(Be,Ge,et),O.setClearColor(z,Y),Qe!==void 0&&(ie.viewport=Qe),O.toneMapping=at}function Zn(T,j,se){const ie=j.isScene===!0?j.overrideMaterial:null;for(let K=0,Ce=T.length;K<Ce;K++){const Le=T[K],{object:Be,geometry:Ge,group:et}=Le;let at=Le.material;at.allowOverride===!0&&ie!==null&&(at=ie),Be.layers.test(se.layers)&&ln(Be,j,se,Ge,at,et)}}function ln(T,j,se,ie,K,Ce){T.onBeforeRender(O,j,se,ie,K,Ce),T.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),K.onBeforeRender(O,j,se,ie,T,Ce),K.transparent===!0&&K.side===ha&&K.forceSinglePass===!1?(K.side=jn,K.needsUpdate=!0,O.renderBufferDirect(se,j,ie,K,T,Ce),K.side=nr,K.needsUpdate=!0,O.renderBufferDirect(se,j,ie,K,T,Ce),K.side=ha):O.renderBufferDirect(se,j,ie,K,T,Ce),T.onAfterRender(O,j,se,ie,K,Ce)}function mn(T,j,se){j.isScene!==!0&&(j=Ht);const ie=Ze.get(T),K=L.state.lights,Ce=L.state.shadowsArray,Le=K.state.version,Be=fe.getParameters(T,K.state,Ce,j,se),Ge=fe.getProgramCacheKey(Be);let et=ie.programs;ie.environment=T.isMeshStandardMaterial?j.environment:null,ie.fog=j.fog,ie.envMap=(T.isMeshStandardMaterial?M:N).get(T.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&T.envMap===null?j.environmentRotation:T.envMapRotation,et===void 0&&(T.addEventListener("dispose",Fe),et=new Map,ie.programs=et);let at=et.get(Ge);if(at!==void 0){if(ie.currentProgram===at&&ie.lightsStateVersion===Le)return Ir(T,Be),at}else Be.uniforms=fe.getUniforms(T),T.onBeforeCompile(Be,O),at=fe.acquireProgram(Be,Ge),et.set(Ge,at),ie.uniforms=Be.uniforms;const Qe=ie.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Qe.clippingPlanes=qe.uniform),Ir(T,Be),ie.needsLights=Jo(T),ie.lightsStateVersion=Le,ie.needsLights&&(Qe.ambientLightColor.value=K.state.ambient,Qe.lightProbe.value=K.state.probe,Qe.directionalLights.value=K.state.directional,Qe.directionalLightShadows.value=K.state.directionalShadow,Qe.spotLights.value=K.state.spot,Qe.spotLightShadows.value=K.state.spotShadow,Qe.rectAreaLights.value=K.state.rectArea,Qe.ltc_1.value=K.state.rectAreaLTC1,Qe.ltc_2.value=K.state.rectAreaLTC2,Qe.pointLights.value=K.state.point,Qe.pointLightShadows.value=K.state.pointShadow,Qe.hemisphereLights.value=K.state.hemi,Qe.directionalShadowMap.value=K.state.directionalShadowMap,Qe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Qe.spotShadowMap.value=K.state.spotShadowMap,Qe.spotLightMatrix.value=K.state.spotLightMatrix,Qe.spotLightMap.value=K.state.spotLightMap,Qe.pointShadowMap.value=K.state.pointShadowMap,Qe.pointShadowMatrix.value=K.state.pointShadowMatrix),ie.currentProgram=at,ie.uniformsList=null,at}function Bi(T){if(T.uniformsList===null){const j=T.currentProgram.getUniforms();T.uniformsList=Iu.seqWithValue(j.seq,T.uniforms)}return T.uniformsList}function Ir(T,j){const se=Ze.get(T);se.outputColorSpace=j.outputColorSpace,se.batching=j.batching,se.batchingColor=j.batchingColor,se.instancing=j.instancing,se.instancingColor=j.instancingColor,se.instancingMorph=j.instancingMorph,se.skinning=j.skinning,se.morphTargets=j.morphTargets,se.morphNormals=j.morphNormals,se.morphColors=j.morphColors,se.morphTargetsCount=j.morphTargetsCount,se.numClippingPlanes=j.numClippingPlanes,se.numIntersection=j.numClipIntersection,se.vertexAlphas=j.vertexAlphas,se.vertexTangents=j.vertexTangents,se.toneMapping=j.toneMapping}function Yu(T,j,se,ie,K){j.isScene!==!0&&(j=Ht),nt.resetTextureUnits();const Ce=j.fog,Le=ie.isMeshStandardMaterial?j.environment:null,Be=C===null?O.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Nr,Ge=(ie.isMeshStandardMaterial?M:N).get(ie.envMap||Le),et=ie.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,at=!!se.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),Qe=!!se.morphAttributes.position,dt=!!se.morphAttributes.normal,Dt=!!se.morphAttributes.color;let wt=ma;ie.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(wt=O.toneMapping);const Tt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,zt=Tt!==void 0?Tt.length:0,$e=Ze.get(ie),Wt=L.state.lights;if(he===!0&&(Ue===!0||T!==$)){const En=T===$&&ie.id===V;qe.setState(ie,T,En)}let At=!1;ie.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==Wt.state.version||$e.outputColorSpace!==Be||K.isBatchedMesh&&$e.batching===!1||!K.isBatchedMesh&&$e.batching===!0||K.isBatchedMesh&&$e.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&$e.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&$e.instancing===!1||!K.isInstancedMesh&&$e.instancing===!0||K.isSkinnedMesh&&$e.skinning===!1||!K.isSkinnedMesh&&$e.skinning===!0||K.isInstancedMesh&&$e.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&$e.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&$e.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&$e.instancingMorph===!1&&K.morphTexture!==null||$e.envMap!==Ge||ie.fog===!0&&$e.fog!==Ce||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==qe.numPlanes||$e.numIntersection!==qe.numIntersection)||$e.vertexAlphas!==et||$e.vertexTangents!==at||$e.morphTargets!==Qe||$e.morphNormals!==dt||$e.morphColors!==Dt||$e.toneMapping!==wt||$e.morphTargetsCount!==zt)&&(At=!0):(At=!0,$e.__version=ie.version);let Sn=$e.currentProgram;At===!0&&(Sn=mn(ie,j,K));let ya=!1,jt=!1,Hi=!1;const Zt=Sn.getUniforms(),Mn=$e.uniforms;if(He.useProgram(Sn.program)&&(ya=!0,jt=!0,Hi=!0),ie.id!==V&&(V=ie.id,jt=!0),ya||$!==T){He.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Zt.setValue(G,"projectionMatrix",T.projectionMatrix),Zt.setValue(G,"viewMatrix",T.matrixWorldInverse);const Rn=Zt.map.cameraPosition;Rn!==void 0&&Rn.setValue(G,Xe.setFromMatrixPosition(T.matrixWorld)),Ct.logarithmicDepthBuffer&&Zt.setValue(G,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Zt.setValue(G,"isOrthographic",T.isOrthographicCamera===!0),$!==T&&($=T,jt=!0,Hi=!0)}if(K.isSkinnedMesh){Zt.setOptional(G,K,"bindMatrix"),Zt.setOptional(G,K,"bindMatrixInverse");const En=K.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Zt.setValue(G,"boneTexture",En.boneTexture,nt))}K.isBatchedMesh&&(Zt.setOptional(G,K,"batchingTexture"),Zt.setValue(G,"batchingTexture",K._matricesTexture,nt),Zt.setOptional(G,K,"batchingIdTexture"),Zt.setValue(G,"batchingIdTexture",K._indirectTexture,nt),Zt.setOptional(G,K,"batchingColorTexture"),K._colorsTexture!==null&&Zt.setValue(G,"batchingColorTexture",K._colorsTexture,nt));const xn=se.morphAttributes;if((xn.position!==void 0||xn.normal!==void 0||xn.color!==void 0)&&We.update(K,se,Sn),(jt||$e.receiveShadow!==K.receiveShadow)&&($e.receiveShadow=K.receiveShadow,Zt.setValue(G,"receiveShadow",K.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(Mn.envMap.value=Ge,Mn.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),ie.isMeshStandardMaterial&&ie.envMap===null&&j.environment!==null&&(Mn.envMapIntensity.value=j.environmentIntensity),Mn.dfgLUT!==void 0&&(Mn.dfgLUT.value=FE()),jt&&(Zt.setValue(G,"toneMappingExposure",O.toneMappingExposure),$e.needsLights&&ju(Mn,Hi),Ce&&ie.fog===!0&&je.refreshFogUniforms(Mn,Ce),je.refreshMaterialUniforms(Mn,ie,W,k,L.state.transmissionRenderTarget[T.id]),Iu.upload(G,Bi($e),Mn,nt)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Iu.upload(G,Bi($e),Mn,nt),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Zt.setValue(G,"center",K.center),Zt.setValue(G,"modelViewMatrix",K.modelViewMatrix),Zt.setValue(G,"normalMatrix",K.normalMatrix),Zt.setValue(G,"modelMatrix",K.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){const En=ie.uniformsGroups;for(let Rn=0,wi=En.length;Rn<wi;Rn++){const Gi=En[Rn];ce.update(Gi,Sn),ce.bind(Gi,Sn)}}return Sn}function ju(T,j){T.ambientLightColor.needsUpdate=j,T.lightProbe.needsUpdate=j,T.directionalLights.needsUpdate=j,T.directionalLightShadows.needsUpdate=j,T.pointLights.needsUpdate=j,T.pointLightShadows.needsUpdate=j,T.spotLights.needsUpdate=j,T.spotLightShadows.needsUpdate=j,T.rectAreaLights.needsUpdate=j,T.hemisphereLights.needsUpdate=j}function Jo(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,j,se){const ie=Ze.get(T);ie.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),Ze.get(T.texture).__webglTexture=j,Ze.get(T.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:se,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,j){const se=Ze.get(T);se.__webglFramebuffer=j,se.__useDefaultFramebuffer=j===void 0};const rr=G.createFramebuffer();this.setRenderTarget=function(T,j=0,se=0){C=T,te=j,U=se;let ie=!0,K=null,Ce=!1,Le=!1;if(T){const Ge=Ze.get(T);if(Ge.__useDefaultFramebuffer!==void 0)He.bindFramebuffer(G.FRAMEBUFFER,null),ie=!1;else if(Ge.__webglFramebuffer===void 0)nt.setupRenderTarget(T);else if(Ge.__hasExternalTextures)nt.rebindTextures(T,Ze.get(T.texture).__webglTexture,Ze.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Qe=T.depthTexture;if(Ge.__boundDepthTexture!==Qe){if(Qe!==null&&Ze.has(Qe)&&(T.width!==Qe.image.width||T.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");nt.setupDepthRenderbuffer(T)}}const et=T.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(Le=!0);const at=Ze.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(at[j])?K=at[j][se]:K=at[j],Ce=!0):T.samples>0&&nt.useMultisampledRTT(T)===!1?K=Ze.get(T).__webglMultisampledFramebuffer:Array.isArray(at)?K=at[se]:K=at,le.copy(T.viewport),_e.copy(T.scissor),de=T.scissorTest}else le.copy(ge).multiplyScalar(W).floor(),_e.copy(Re).multiplyScalar(W).floor(),de=Oe;if(se!==0&&(K=rr),He.bindFramebuffer(G.FRAMEBUFFER,K)&&ie&&He.drawBuffers(T,K),He.viewport(le),He.scissor(_e),He.setScissorTest(de),Ce){const Ge=Ze.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ge.__webglTexture,se)}else if(Le){const Ge=j;for(let et=0;et<T.textures.length;et++){const at=Ze.get(T.textures[et]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+et,at.__webglTexture,se,Ge)}}else if(T!==null&&se!==0){const Ge=Ze.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ge.__webglTexture,se)}V=-1},this.readRenderTargetPixels=function(T,j,se,ie,K,Ce,Le,Be=0){if(!(T&&T.isWebGLRenderTarget)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=Ze.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Le!==void 0&&(Ge=Ge[Le]),Ge){He.bindFramebuffer(G.FRAMEBUFFER,Ge);try{const et=T.textures[Be],at=et.format,Qe=et.type;if(!Ct.textureFormatReadable(at)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Qe)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=T.width-ie&&se>=0&&se<=T.height-K&&(T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Be),G.readPixels(j,se,ie,K,it.convert(at),it.convert(Qe),Ce))}finally{const et=C!==null?Ze.get(C).__webglFramebuffer:null;He.bindFramebuffer(G.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(T,j,se,ie,K,Ce,Le,Be=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=Ze.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Le!==void 0&&(Ge=Ge[Le]),Ge)if(j>=0&&j<=T.width-ie&&se>=0&&se<=T.height-K){He.bindFramebuffer(G.FRAMEBUFFER,Ge);const et=T.textures[Be],at=et.format,Qe=et.type;if(!Ct.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const dt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,dt),G.bufferData(G.PIXEL_PACK_BUFFER,Ce.byteLength,G.STREAM_READ),T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Be),G.readPixels(j,se,ie,K,it.convert(at),it.convert(Qe),0);const Dt=C!==null?Ze.get(C).__webglFramebuffer:null;He.bindFramebuffer(G.FRAMEBUFFER,Dt);const wt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await gy(G,wt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,dt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Ce),G.deleteBuffer(dt),G.deleteSync(wt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,j=null,se=0){const ie=Math.pow(2,-se),K=Math.floor(T.image.width*ie),Ce=Math.floor(T.image.height*ie),Le=j!==null?j.x:0,Be=j!==null?j.y:0;nt.setTexture2D(T,0),G.copyTexSubImage2D(G.TEXTURE_2D,se,0,0,Le,Be,K,Ce),He.unbindTexture()};const Xs=G.createFramebuffer(),ba=G.createFramebuffer();this.copyTextureToTexture=function(T,j,se=null,ie=null,K=0,Ce=null){Ce===null&&(K!==0?(jo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Ce=K,K=0):Ce=0);let Le,Be,Ge,et,at,Qe,dt,Dt,wt;const Tt=T.isCompressedTexture?T.mipmaps[Ce]:T.image;if(se!==null)Le=se.max.x-se.min.x,Be=se.max.y-se.min.y,Ge=se.isBox3?se.max.z-se.min.z:1,et=se.min.x,at=se.min.y,Qe=se.isBox3?se.min.z:0;else{const xn=Math.pow(2,-K);Le=Math.floor(Tt.width*xn),Be=Math.floor(Tt.height*xn),T.isDataArrayTexture?Ge=Tt.depth:T.isData3DTexture?Ge=Math.floor(Tt.depth*xn):Ge=1,et=0,at=0,Qe=0}ie!==null?(dt=ie.x,Dt=ie.y,wt=ie.z):(dt=0,Dt=0,wt=0);const zt=it.convert(j.format),$e=it.convert(j.type);let Wt;j.isData3DTexture?(nt.setTexture3D(j,0),Wt=G.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(nt.setTexture2DArray(j,0),Wt=G.TEXTURE_2D_ARRAY):(nt.setTexture2D(j,0),Wt=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,j.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,j.unpackAlignment);const At=G.getParameter(G.UNPACK_ROW_LENGTH),Sn=G.getParameter(G.UNPACK_IMAGE_HEIGHT),ya=G.getParameter(G.UNPACK_SKIP_PIXELS),jt=G.getParameter(G.UNPACK_SKIP_ROWS),Hi=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,Tt.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Tt.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,et),G.pixelStorei(G.UNPACK_SKIP_ROWS,at),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Qe);const Zt=T.isDataArrayTexture||T.isData3DTexture,Mn=j.isDataArrayTexture||j.isData3DTexture;if(T.isDepthTexture){const xn=Ze.get(T),En=Ze.get(j),Rn=Ze.get(xn.__renderTarget),wi=Ze.get(En.__renderTarget);He.bindFramebuffer(G.READ_FRAMEBUFFER,Rn.__webglFramebuffer),He.bindFramebuffer(G.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let Gi=0;Gi<Ge;Gi++)Zt&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ze.get(T).__webglTexture,K,Qe+Gi),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ze.get(j).__webglTexture,Ce,wt+Gi)),G.blitFramebuffer(et,at,Le,Be,dt,Dt,Le,Be,G.DEPTH_BUFFER_BIT,G.NEAREST);He.bindFramebuffer(G.READ_FRAMEBUFFER,null),He.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(K!==0||T.isRenderTargetTexture||Ze.has(T)){const xn=Ze.get(T),En=Ze.get(j);He.bindFramebuffer(G.READ_FRAMEBUFFER,Xs),He.bindFramebuffer(G.DRAW_FRAMEBUFFER,ba);for(let Rn=0;Rn<Ge;Rn++)Zt?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,xn.__webglTexture,K,Qe+Rn):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,xn.__webglTexture,K),Mn?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,En.__webglTexture,Ce,wt+Rn):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,En.__webglTexture,Ce),K!==0?G.blitFramebuffer(et,at,Le,Be,dt,Dt,Le,Be,G.COLOR_BUFFER_BIT,G.NEAREST):Mn?G.copyTexSubImage3D(Wt,Ce,dt,Dt,wt+Rn,et,at,Le,Be):G.copyTexSubImage2D(Wt,Ce,dt,Dt,et,at,Le,Be);He.bindFramebuffer(G.READ_FRAMEBUFFER,null),He.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Mn?T.isDataTexture||T.isData3DTexture?G.texSubImage3D(Wt,Ce,dt,Dt,wt,Le,Be,Ge,zt,$e,Tt.data):j.isCompressedArrayTexture?G.compressedTexSubImage3D(Wt,Ce,dt,Dt,wt,Le,Be,Ge,zt,Tt.data):G.texSubImage3D(Wt,Ce,dt,Dt,wt,Le,Be,Ge,zt,$e,Tt):T.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Ce,dt,Dt,Le,Be,zt,$e,Tt.data):T.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Ce,dt,Dt,Tt.width,Tt.height,zt,Tt.data):G.texSubImage2D(G.TEXTURE_2D,Ce,dt,Dt,Le,Be,zt,$e,Tt);G.pixelStorei(G.UNPACK_ROW_LENGTH,At),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Sn),G.pixelStorei(G.UNPACK_SKIP_PIXELS,ya),G.pixelStorei(G.UNPACK_SKIP_ROWS,jt),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Hi),Ce===0&&j.generateMipmaps&&G.generateMipmap(Wt),He.unbindTexture()},this.initRenderTarget=function(T){Ze.get(T).__webglFramebuffer===void 0&&nt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?nt.setTextureCube(T,0):T.isData3DTexture?nt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?nt.setTexture2DArray(T,0):nt.setTexture2D(T,0),He.unbindTexture()},this.resetState=function(){te=0,U=0,C=null,He.reset(),w.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Nt._getUnpackColorSpace()}}const Rg={type:"change"},Fd={type:"start"},u_={type:"end"},wu=new Yg,Cg=new Ja,HE=Math.cos(70*vy.DEG2RAD),_n=new oe,Wn=2*Math.PI,qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ph=1e-6;class GE extends Jy{constructor(e,i=null){super(e,i),this.state=qt.NONE,this.target=new oe,this.cursor=new oe,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ws.ROTATE,MIDDLE:ws.DOLLY,RIGHT:ws.PAN},this.touches={ONE:Ds.ROTATE,TWO:Ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new oe,this._lastQuaternion=new Or,this._lastTargetPosition=new oe,this._quat=new Or().setFromUnitVectors(e.up,new oe(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ng,this._sphericalDelta=new ng,this._scale=1,this._panOffset=new oe,this._rotateStart=new ct,this._rotateEnd=new ct,this._rotateDelta=new ct,this._panStart=new ct,this._panEnd=new ct,this._panDelta=new ct,this._dollyStart=new ct,this._dollyEnd=new ct,this._dollyDelta=new ct,this._dollyDirection=new oe,this._mouse=new ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=kE.bind(this),this._onPointerDown=VE.bind(this),this._onPointerUp=XE.bind(this),this._onContextMenu=QE.bind(this),this._onMouseWheel=YE.bind(this),this._onKeyDown=jE.bind(this),this._onTouchStart=ZE.bind(this),this._onTouchMove=KE.bind(this),this._onMouseDown=qE.bind(this),this._onMouseMove=WE.bind(this),this._interceptControlDown=JE.bind(this),this._interceptControlUp=$E.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rg),this.update(),this.state=qt.NONE}update(e=null){const i=this.object.position;_n.copy(i).sub(this.target),_n.applyQuaternion(this._quat),this._spherical.setFromVector3(_n),this.autoRotate&&this.state===qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(r)&&isFinite(l)&&(r<-Math.PI?r+=Wn:r>Math.PI&&(r-=Wn),l<-Math.PI?l+=Wn:l>Math.PI&&(l-=Wn),r<=l?this._spherical.theta=Math.max(r,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+l)/2?Math.max(r,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(_n.setFromSpherical(this._spherical),_n.applyQuaternion(this._quatInverse),i.copy(this.target).add(_n),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=_n.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new oe(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new oe(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=_n.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(wu.origin.copy(this.object.position),wu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wu.direction))<HE?this.object.lookAt(this.target):(Cg.setFromNormalAndCoplanarPoint(this.object.up,this.target),wu.intersectPlane(Cg,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Ph||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ph||this._lastTargetPosition.distanceToSquared(this.target)>Ph?(this.dispatchEvent(Rg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Wn/60*this.autoRotateSpeed*e:Wn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){_n.setFromMatrixColumn(i,0),_n.multiplyScalar(-e),this._panOffset.add(_n)}_panUp(e,i){this.screenSpacePanning===!0?_n.setFromMatrixColumn(i,1):(_n.setFromMatrixColumn(i,0),_n.crossVectors(this.object.up,_n)),_n.multiplyScalar(e),this._panOffset.add(_n)}_pan(e,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;_n.copy(l).sub(this.target);let c=_n.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/r.clientHeight,this.object.matrix),this._panUp(2*i*c/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),l=e-r.left,c=i-r.top,h=r.width,d=r.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Wn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Wn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(r,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(r,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(r*r+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),l=.5*(e.pageX+r.x),c=.5*(e.pageY+r.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Wn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Wn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(r,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(r*r+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new ct,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function VE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function kE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function XE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(u_),this.state=qt.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function qE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ws.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=qt.DOLLY;break;case ws.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=qt.ROTATE}break;case ws.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=qt.PAN}break;default:this.state=qt.NONE}this.state!==qt.NONE&&this.dispatchEvent(Fd)}function WE(s){switch(this.state){case qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function YE(s){this.enabled===!1||this.enableZoom===!1||this.state!==qt.NONE||(s.preventDefault(),this.dispatchEvent(Fd),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(u_))}function jE(s){this.enabled!==!1&&this._handleKeyDown(s)}function ZE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=qt.TOUCH_ROTATE;break;case Ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=qt.TOUCH_PAN;break;default:this.state=qt.NONE}break;case 2:switch(this.touches.TWO){case Ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=qt.TOUCH_DOLLY_PAN;break;case Ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=qt.TOUCH_DOLLY_ROTATE;break;default:this.state=qt.NONE}break;default:this.state=qt.NONE}this.state!==qt.NONE&&this.dispatchEvent(Fd)}function KE(s){switch(this._trackPointer(s),this.state){case qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=qt.NONE}}function QE(s){this.enabled!==!1&&s.preventDefault()}function JE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $E(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const eT=`// =========================================================================\r
// GARGANTUA — Schwarzschild null geodesic raytracer fragment shader.\r
// -------------------------------------------------------------------------\r
// Boyer-Lindquist-style Schwarzschild coordinates with metric\r
//     ds^2 = -f(r) dt^2 + f(r)^-1 dr^2 + r^2 (dtheta^2 + sin^2(theta) dphi^2)\r
// and f(r) = 1 - r_s / r.  Geometrized units (G = c = 1), r_s = 1.\r
//\r
// Per pixel we build a static-observer orbit-plane basis\r
//   e_r  = normalize(cameraPos)              (radial at observer)\r
//   e_t  = normalize(d - e_r*dot(d, e_r))    (perp, same direction as d's\r
//                                            in-plane component — already\r
//                                            encodes the sign of dphi)\r
// and integrate dr/dlambda, dv_r/dlambda, dphi/dlambda with positive\r
// affine parameter lambda:\r
//\r
//   dr/dlambda    = v_r\r
//   dv_r/dlambda  = (L^2 / r^4) * (r - 1.5 r_s)\r
//   dphi/dlambda  = L / r^2\r
//\r
// The conserved orbital-plane angular momentum is non-negative:\r
//   L = r0 * sinTheta / sqrt(f(r0))\r
// Direction of dphi is fixed by eTangent alone (no eNormal, no sign\r
// ambiguity).  Disk crossings: a single "crossing" is one independent\r
// time the geodesic enters the slab |y| <= diskHalfThickness from\r
// outside; subsequent in-slab segments contribute density without\r
// advancing crossingCount.  Re-entry opens a higher-order crossing.\r
//\r
// Background sampling is reserved for true ESCAPED termination only —\r
// saturation breaks and step-budget exhaustion never fake an escape.\r
// =========================================================================\r
\r
precision highp float;\r
\r
uniform vec2  u_resolution;\r
uniform vec3  u_cameraPos;\r
uniform vec3  u_cameraRight;\r
uniform vec3  u_cameraUp;\r
uniform vec3  u_cameraForward;\r
uniform float u_cameraFovY;\r
uniform float u_time;\r
uniform int   u_quality;\r
uniform int   u_debug;\r
\r
uniform float u_cameraDistance;\r
uniform float u_cameraAzimuth;\r
uniform float u_cameraElevation;\r
\r
uniform float u_diskInner;\r
uniform float u_diskOuter;\r
uniform float u_diskHalfThickness;\r
uniform float u_diskTemperature;\r
uniform float u_diskEmission;\r
uniform float u_orbitalSpeed;\r
uniform float u_turbulenceAmplitude;\r
uniform float u_turbulenceSpeed;\r
uniform float u_starDensity;\r
uniform float u_galaxyBrightness;\r
\r
uniform float u_bloomIntensity;\r
uniform float u_bloomThreshold;\r
uniform int  u_maxSteps;\r
uniform int  u_maxCrossings;\r
uniform float u_pixelScale;\r
\r
const float RS = 1.0;\r
\r
const int TERM_RUNNING   = 0;\r
const int TERM_CAPTURED  = 1;\r
const int TERM_ESCAPED   = 2;\r
const int TERM_EXHAUSTED = 3;\r
\r
// ----- integer math shims (GLSL ES 1.0 has no int min/max) --------------\r
\r
int imin(int a, int b) { return a < b ? a : b; }\r
int imax(int a, int b) { return a > b ? a : b; }\r
\r
// ----- hash / noise ------------------------------------------------------\r
\r
float hash11(float p) {\r
  p = fract(p * 0.1031);\r
  p *= p + 33.33;\r
  p *= p + p;\r
  return fract(p);\r
}\r
\r
float hash13(vec3 p) {\r
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));\r
  p += dot(p, p.yzx + 33.33);\r
  return fract((p.x + p.y) * p.z);\r
}\r
\r
float noise3(vec3 p) {\r
  vec3 i = floor(p);\r
  vec3 f = fract(p);\r
  vec3 u = f * f * (3.0 - 2.0 * f);\r
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));\r
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));\r
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));\r
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));\r
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));\r
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));\r
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));\r
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));\r
  float nx00 = mix(n000, n100, u.x);\r
  float nx10 = mix(n010, n110, u.x);\r
  float nx01 = mix(n001, n101, u.x);\r
  float nx11 = mix(n011, n111, u.x);\r
  float nxy0 = mix(nx00, nx10, u.y);\r
  float nxy1 = mix(nx01, nx11, u.y);\r
  return mix(nxy0, nxy1, u.z);\r
}\r
\r
float fbm(vec3 p) {\r
  float v = 0.0;\r
  float a = 0.5;\r
  for (int i = 0; i < 3; ++i) {\r
    v += a * noise3(p);\r
    p *= 2.02;\r
    a *= 0.5;\r
  }\r
  return v;\r
}\r
\r
// ----- physics helpers ---------------------------------------------------\r
\r
float fOfR(float r) {\r
  return 1.0 - RS / r;\r
}\r
\r
// Build the static-observer orbit-plane basis.  eTangent is the unit\r
// projection of d into the plane perpendicular to e_r; for nearly-radial\r
// d, fall back to (world-up x e_r).\r
void buildOrbitBasis(vec3 d, out vec3 eRadial, out vec3 eTangent) {\r
  eRadial = normalize(u_cameraPos);\r
  vec3 dPerp = d - eRadial * dot(d, eRadial);\r
  float perpLen = length(dPerp);\r
  if (perpLen < 1e-4) {\r
    vec3 helper = (abs(eRadial.y) < 0.9)\r
      ? vec3(0.0, 1.0, 0.0)\r
      : vec3(1.0, 0.0, 0.0);\r
    eTangent = normalize(cross(helper, eRadial));\r
  } else {\r
    eTangent = dPerp / perpLen;\r
  }\r
}\r
\r
vec3 temperatureColor(float T) {\r
  // Black-body-ish palette: red-orange to orange-white, with the warm\r
  // tones dominating so the inner disk reads as hot orange instead of\r
  // bleach white.  Mixing toward \`hot\` only happens at T > 1.4 (rare).\r
  vec3 deep   = vec3(0.70, 0.18, 0.05);  // dim outer rim\r
  vec3 warm   = vec3(1.00, 0.55, 0.20);  // mid disk\r
  vec3 bright = vec3(1.00, 0.72, 0.30);  // inner disk (still warm)\r
  if (T < 0.5) return mix(deep, warm, clamp(T * 2.0, 0.0, 1.0));\r
  if (T < 1.2) return mix(warm, bright, clamp((T - 0.5) / 0.7, 0.0, 1.0));\r
  return mix(bright, vec3(1.00, 0.86, 0.55), clamp((T - 1.2) / 0.8, 0.0, 1.0));\r
}\r
\r
// Disk emissive density at cylindrical radius rho, vertical distance y.\r
float diskDensity(float rho, float y, float phi) {\r
  if (rho < u_diskInner || rho > u_diskOuter) return 0.0;\r
  float halfT = max(u_diskHalfThickness, 1e-3);\r
  float vert = exp(- (y * y) / (halfT * halfT));\r
  float rNorm = (rho - u_diskInner) / max(u_diskOuter - u_diskInner, 1e-3);\r
  float radial = smoothstep(0.0, 0.12, rNorm) *\r
                 (1.0 - smoothstep(0.78, 1.0, rNorm));\r
  vec3 q = vec3(cos(phi) * rho * 1.2,\r
                y * 4.0,\r
                sin(phi) * rho * 1.2);\r
  q.x += u_turbulenceAmplitude * 2.0 *\r
         sin(u_time * u_turbulenceSpeed + rho * 0.8);\r
  float turb = fbm(q + vec3(0.0, 0.0, u_time * u_turbulenceSpeed * 0.5));\r
  return radial * vert * (0.45 + 1.0 * turb);\r
}\r
\r
// Schwarzschild Keplerian orbital speed (beta = v/c, proper time).\r
float orbitalBeta(float r) {\r
  float denom = 2.0 * (r - RS);\r
  if (denom <= 0.0) return 0.0;\r
  return clamp(sqrt(RS / denom), 0.0, 0.85);\r
}\r
\r
vec3 sampleStars(vec3 dIn) {\r
  // Per-pixel angular direction to sample the sky.\r
  vec3 d = normalize(dIn);\r
  float lat = asin(clamp(d.y, -1.0, 1.0));\r
  float lon = atan(d.z, d.x);\r
\r
  // Star field: each lat/lon cell is allowed at most ONE star with a\r
  // per-level hit threshold and Gaussian angular sigma.  Thresholds and\r
  // sigmas are tuned so a desktop viewport sees only tens of stars.\r
  vec3 star = vec3(0.0);\r
  // level 0/1/2 thresholds (.9985, .9992, .9997) — coarser levels are\r
  // sparser because they cover the whole sphere.\r
  // level 0/1/2 sigma in radians — level 0 ~ 1-3 screen pixels, finer\r
  // levels get smaller stars but same overall density weight.\r
  for (int level = 0; level < 3; ++level) {\r
    float scale = pow(2.0, float(level));\r
    float cellsPerRad = 60.0 * scale;\r
    vec2 coord = vec2(lat * cellsPerRad, lon * cellsPerRad);\r
\r
    float threshold;\r
    float sigma;\r
    if (level == 0) { threshold = 0.9985; sigma = 0.0015; }\r
    else if (level == 1) { threshold = 0.9992; sigma = 0.0009; }\r
    else { threshold = 0.9997; sigma = 0.0005; }\r
\r
    for (int oy = -1; oy <= 1; ++oy) {\r
      for (int ox = -1; ox <= 1; ++ox) {\r
        vec2 cell = floor(coord) + vec2(float(ox), float(oy));\r
        float h = hash13(vec3(cell, float(level) * 11.0));\r
        if (h < threshold) continue;\r
\r
        vec2 jitter = vec2(\r
          hash13(vec3(cell + 0.13, float(level))) - 0.5,\r
          hash13(vec3(cell + 0.27, float(level))) - 0.5\r
        ) * 0.9 / cellsPerRad;\r
        float seedLat = (cell.x + 0.5) / cellsPerRad + jitter.x;\r
        float seedLon = (cell.y + 0.5) / cellsPerRad + jitter.y;\r
\r
        float sLat = clamp(seedLat, -1.5707963, 1.5707963);\r
        float sLon = seedLon;\r
        float cosB = sin(sLat) * sin(lat) +\r
                     cos(sLat) * cos(lat) * cos(lon - sLon);\r
        cosB = clamp(cosB, -1.0, 1.0);\r
        float angSep = acos(cosB);\r
        float bright = exp(- (angSep * angSep) / (sigma * sigma));\r
        // Magnitude spread: most stars dim, occasional bright pinpoints.\r
        float mag = mix(0.25, 1.2, hash11(h * 31.0));\r
        bright *= mag;\r
        vec3 tint = mix(vec3(1.0, 0.85, 0.7),\r
                        vec3(0.7, 0.85, 1.0),\r
                        hash11(h * 7.0));\r
        star += bright * tint;\r
      }\r
    }\r
  }\r
  star *= clamp(u_starDensity, 0.0, 6.0) * 0.9;\r
\r
  // Galactic band: noisy thick band along the y axis.  Smooth latitudinal\r
  // dependence.\r
  float band = exp(-pow(d.y * 4.5, 2.0));\r
  vec3 gp = d * 4.0;\r
  float n = fbm(gp) * 0.7 + fbm(gp * 2.1) * 0.3;\r
  vec3 galaxy = vec3(0.22, 0.20, 0.32) * band * (0.4 + 1.6 * n);\r
  galaxy *= u_galaxyBrightness;\r
\r
  return star + galaxy;\r
}\r
\r
// Unified slab intersection for an arbitrary segment [A, B]: returns the\r
// clamped, in-segment parameter range over which |y| <= h.\r
void slabRange(float yA, float yB, float h, out float tLo, out float tHi) {\r
  tLo = 0.0;\r
  tHi = 0.0;\r
  float dy = yB - yA;\r
  if (abs(dy) < 1e-7) {\r
    if (abs(yA) <= h) { tLo = 0.0; tHi = 1.0; }\r
    return;\r
  }\r
  float tPlus  = ( h - yA) / dy;\r
  float tMinus = (-h - yA) / dy;\r
  float lo = (tPlus < tMinus) ? tPlus : tMinus;\r
  float hi = (tPlus > tMinus) ? tPlus : tMinus;\r
  tLo = clamp(lo, 0.0, 1.0);\r
  tHi = clamp(hi, 0.0, 1.0);\r
  if (tHi < tLo) {\r
    float tmp = tLo; tLo = tHi; tHi = tmp;\r
  }\r
}\r
\r
// ----- main -------------------------------------------------------------\r
\r
void main() {\r
  vec2 frag = gl_FragCoord.xy;\r
  vec2 uv = frag / u_resolution;\r
\r
  float tanHalf = tan(u_cameraFovY * 0.5);\r
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);\r
  vec2 ndc = uv * 2.0 - 1.0;\r
  vec3 viewDir = normalize(\r
    ndc.x * aspect * tanHalf * u_cameraRight +\r
    ndc.y * tanHalf * u_cameraUp +\r
    u_cameraForward\r
  );\r
\r
  // Orbit-plane basis.\r
  vec3 eRadial, eTangent;\r
  buildOrbitBasis(viewDir, eRadial, eTangent);\r
\r
  vec3 d = normalize(viewDir);\r
  float cosTheta = dot(d, eRadial);\r
  float sinTheta = sqrt(max(1.0 - cosTheta * cosTheta, 0.0));\r
  float r0 = length(u_cameraPos);\r
  float f0 = fOfR(r0);\r
\r
  // Non-negative conserved angular momentum magnitude.\r
  float L = r0 * sinTheta / sqrt(max(f0, 1e-4));\r
\r
  // Initial state: r0 along eRadial, affine v_r(0) = cosTheta, phi grows\r
  // along eTangent — which already carries the correct sign of dphi.\r
  float r   = r0;\r
  float vr  = cosTheta;\r
  float phi = 0.0;\r
\r
  vec3 eWorld  = eRadial;\r
  vec3 eWorldT = eTangent;\r
\r
  vec3 prevPos = r * (cos(phi) * eWorld + sin(phi) * eWorldT);\r
  float prevY = prevPos.y;\r
  // Persistent flag: was the PREVIOUS computed segment a real disk\r
  // segment (slab intersection AND radial band)?  Initial camera\r
  // position is far outside the slab, so this starts false.\r
  bool prevWasDiskSeg = false;\r
\r
  int  term = TERM_RUNNING;\r
  int  stepsTaken = 0;\r
  float maxR = 70.0;\r
  float minR = RS * 1.001;\r
\r
  float firstHitRho = -1.0;\r
  int   crossingCount = 0;        // distinct disk-segment entries\r
  int   higherOrderCrossings = 0;\r
  int   currentCrossingOrder = -1; // order index of the open traversal\r
  float accumAlpha = 0.0;\r
  vec3  accumColour = vec3(0.0);\r
  float dopplerSum = 0.0;\r
  bool  saturated  = false;\r
\r
  vec3 lastWorldDir = d;\r
\r
  for (int i = 0; i < 1024; ++i) {\r
    if (i >= u_maxSteps) { term = TERM_EXHAUSTED; break; }\r
    if (!(r > 0.0) || r != r) { term = TERM_EXHAUSTED; break; }\r
    if (r <= minR) { term = TERM_CAPTURED; break; }\r
    if (r >= maxR && vr > 0.0) { term = TERM_ESCAPED; break; }\r
\r
    float angRate = L / max(r * r, 1e-3);\r
    float dphiMax = 0.06 / max(angRate, 1e-3);\r
    float dRMax   = 0.18 * r;\r
    float hstep = (dRMax < dphiMax) ? dRMax : dphiMax;\r
    if (!(hstep > 0.0) || hstep != hstep) { term = TERM_EXHAUSTED; break; }\r
\r
    // RK2 / midpoint.\r
    float kr  = vr;\r
    float kvr = (L * L) * (r - 1.5 * RS) / max(r * r * r * r, 1e-8);\r
    float kp  = L / max(r * r, 1e-4);\r
    float rM   = r   + 0.5 * hstep * kr;\r
    float vrM  = vr  + 0.5 * hstep * kvr;\r
    float phiM = phi + 0.5 * hstep * kp;\r
    float kr2  = vrM;\r
    float kvr2 = (L * L) * (rM - 1.5 * RS) / max(rM * rM * rM * rM, 1e-8);\r
    float kp2  = L / max(rM * rM, 1e-4);\r
    r   += hstep * kr2;\r
    vr  += hstep * kvr2;\r
    phi += hstep * kp2;\r
    stepsTaken = i + 1;\r
\r
    if (!(r > 0.0) || r != r) { term = TERM_EXHAUSTED; break; }\r
    if (r <= minR) { term = TERM_CAPTURED; break; }\r
    if (r >= maxR && vr > 0.0) { term = TERM_ESCAPED; break; }\r
\r
    vec3 pos = r * (cos(phi) * eWorld + sin(phi) * eWorldT);\r
    vec3 segDelta = pos - prevPos;\r
    float segLen = length(segDelta);\r
    if (segLen > 1e-6) lastWorldDir = segDelta / segLen;\r
\r
    // Unified slab intersection — always treats both boundary planes.\r
    float tLo, tHi;\r
    slabRange(prevY, pos.y, u_diskHalfThickness, tLo, tHi);\r
    bool insideSeg = (tHi > tLo);\r
\r
    // A "disk segment" is THIS computed segment:\r
    //   * spans the slab on at least some portion [tLo, tHi]; AND\r
    //   * the segment midpoint's cylindrical radius lies in the disk\r
    //     radial band [diskInner, diskOuter].\r
    // Disk-segment state from the previous iteration is carried by the\r
    // persistent \`prevWasDiskSeg\` flag, so a ray that *stays* in the disk\r
    // radial band across multiple integration steps accrues density for\r
    // a single crossing (no spurious count++).\r
    float rhoMidSeg = length(vec2(\r
      0.5 * (prevPos.x + pos.x),\r
      0.5 * (prevPos.z + pos.z)\r
    ));\r
    bool isDiskSeg = insideSeg &&\r
      (rhoMidSeg >= u_diskInner && rhoMidSeg <= u_diskOuter);\r
\r
    bool justEntered =  isDiskSeg && !prevWasDiskSeg;\r
    bool staysInside =  isDiskSeg &&  prevWasDiskSeg;\r
    bool justLeft    = !isDiskSeg &&  prevWasDiskSeg;\r
\r
    // Open / close the current independent order on entry / exit of the\r
    // disk radial band.\r
    if (justEntered) {\r
      currentCrossingOrder = crossingCount;\r
      crossingCount = (crossingCount + 1 < 64) ? crossingCount + 1 : 64;\r
      if (currentCrossingOrder > 0) higherOrderCrossings = 1;\r
    }\r
    if (justLeft) {\r
      currentCrossingOrder = -1;\r
    }\r
\r
    if (isDiskSeg) {\r
      float tMid = 0.5 * (tLo + tHi);\r
      vec3 midPos = prevPos + segDelta * tMid;\r
      float rhoMid = rhoMidSeg;\r
      if (firstHitRho < 0.0) firstHitRho = rhoMid;\r
\r
      const int NSAMP = 6;\r
      float acc = 0.0;\r
      for (int j = 0; j < NSAMP; ++j) {\r
        float t = tLo + (tHi - tLo) * (float(j) + 0.5) / float(NSAMP);\r
        vec3 pj = prevPos + segDelta * t;\r
        float rhoj = length(pj.xz);\r
        float thetaj = atan(pj.z, pj.x);\r
        acc += diskDensity(rhoj, pj.y, thetaj);\r
      }\r
      acc /= float(NSAMP);\r
      float usedLen = (tHi - tLo) * segLen;\r
      float density = acc * usedLen;\r
\r
      // Opacity is determined purely by the line-of-sight density so a\r
      // thin slab stays see-through regardless of the emission slider.\r
      // \`u_diskEmission\` is a *radiance* multiplier applied below when\r
      // the segment contributes to the front-to-back accumulation.\r
      float alpha = 1.0 - exp(-0.5 * density);\r
      alpha = clamp(alpha, 0.0, 1.0);\r
\r
      float rNorm = clamp((rhoMid - u_diskInner) /\r
                          max(u_diskOuter - u_diskInner, 1e-3), 0.0, 1.0);\r
      // Inner edge hottest; outer rim cool.  Keep T in the warm/bright\r
      // band of temperatureColor so the disk reads as hot orange, not\r
      // bleach-white.\r
      float temp = clamp(0.4 + 0.9 * (1.0 - rNorm) *\r
                         u_diskTemperature, 0.0, 1.6);\r
      // Disk intrinsic radiance.  The radial profile is a power law\r
      // biased to the inner edge so the hot zone is genuinely hot in\r
      // linear HDR units; at default diskEmission=1.2 the inner edge\r
      // reaches ~3.0 (well above the 1.2 bloom threshold) while the\r
      // outer rim stays modest.  This is what makes the bright-pass\r
      // actually extract the disk instead of only the brightest\r
      // stars.\r
      float radialProfile = pow(mix(0.35, 1.0, 1.0 - rNorm), 2.2);\r
      vec3 emission = temperatureColor(temp) * radialProfile * 2.5;\r
\r
      // Doppler + gravitational redshift:\r
      //   gamma         = 1 / sqrt(1 - beta^2)\r
      //   dopDenom      = gamma * (1 - beta*mu)\r
      //   gGrav         = sqrt(fOfR(rhoMid) / f0)\r
      //   gfac          = gGrav / dopDenom\r
      // Emission brightness multiplied by gfac^3.\r
      vec3 vDir = vec3(-midPos.z, 0.0, midPos.x);\r
      float vl = length(vDir);\r
      vDir = vl > 0.0 ? vDir / vl : vec3(0.0);\r
      // Final subluminal cap: u_orbitalSpeed can push the natural\r
      // Keplerian beta past 1 at high settings.  Apply the slider and\r
      // clamp AGAIN to 0.85 so relativistic factors stay finite.\r
      float betaRaw = orbitalBeta(rhoMid) * u_orbitalSpeed;\r
      float beta    = clamp(betaRaw, 0.0, 0.85);\r
      vec3 dirPhoton = -lastWorldDir;\r
      float mu = dot(dirPhoton, vDir);\r
      float gamma = 1.0 / sqrt(max(1.0 - beta * beta, 1e-4));\r
      float dopDenom = max(gamma * (1.0 - beta * mu), 1e-3);\r
      float gGrav = sqrt(max(fOfR(rhoMid), 1e-4) / max(f0, 1e-4));\r
      float gfac = gGrav / dopDenom;\r
      gfac = clamp(gfac, 0.05, 6.0);\r
      float g3 = gfac * gfac * gfac;\r
      emission *= g3;\r
      dopplerSum += gfac * alpha;\r
\r
      bool withinBudget =\r
        (crossingCount <= u_maxCrossings) ||\r
        (higherOrderCrossings == 1 && crossingCount <= u_maxCrossings + 2);\r
\r
      if (withinBudget) {\r
        float remaining = 1.0 - accumAlpha;\r
        accumColour += emission * u_diskEmission * alpha * remaining;\r
        accumAlpha  += alpha * remaining;\r
      }\r
    }\r
\r
    // Advance the slab bookkeeping by what the NEXT segment will see.\r
    prevPos = pos;\r
    prevY = pos.y;\r
    prevWasDiskSeg = isDiskSeg;\r
\r
    if (accumAlpha >= 0.985) {\r
      saturated = true;\r
      if (term == TERM_RUNNING) term = TERM_EXHAUSTED;\r
      break;\r
    }\r
  }\r
\r
  if (term == TERM_RUNNING) term = TERM_EXHAUSTED;\r
\r
  vec3 colour;\r
  if (term == TERM_CAPTURED) {\r
    colour = accumColour;            // foreground disk visible even when\r
                                     // the terminal ray went under horizon\r
  } else if (term == TERM_ESCAPED && !saturated) {\r
    vec3 sky = sampleStars(lastWorldDir);\r
    float trans = 1.0 - clamp(accumAlpha, 0.0, 1.0);\r
    colour = accumColour + sky * trans;\r
  } else {\r
    colour = accumColour;            // exhaustion / saturation: no sky\r
  }\r
\r
  if (u_debug == 1) {\r
    float s = float(stepsTaken) / float(u_maxSteps > 1 ? u_maxSteps : 1);\r
    colour = mix(vec3(0.0, 0.0, 0.4), vec3(1.0, 0.4, 0.0), clamp(s, 0.0, 1.0));\r
  } else if (u_debug == 2) {\r
    colour = (term == TERM_CAPTURED)\r
      ? vec3(0.0)\r
      : vec3(0.85, 0.85, 0.95);\r
  } else if (u_debug == 3) {\r
    float v = firstHitRho > 0.0\r
      ? clamp((firstHitRho - u_diskInner) /\r
              max(u_diskOuter - u_diskInner, 1e-3), 0.0, 1.0)\r
      : 0.0;\r
    colour = vec3(v, 0.1, 1.0 - v);\r
  } else if (u_debug == 4) {\r
    float c = clamp(float(crossingCount) / 6.0, 0.0, 1.0);\r
    float h = float(higherOrderCrossings);\r
    colour = vec3(c, h, max(0.0, 1.0 - c));\r
  } else if (u_debug == 5) {\r
    float dN = clamp(dopplerSum * 0.25, 0.0, 1.5);\r
    colour = vec3(dN, dN * 0.6, max(0.0, 1.0 - dN * 0.5));\r
  } else if (u_debug == 6) {\r
    colour = 0.5 + 0.5 * normalize(lastWorldDir);\r
  } else if (u_debug == 7) {\r
    // Procedural sky/galaxy alone — disk deliberately hidden so the\r
    // background structure is readable without the foreground in the way.\r
    colour = sampleStars(normalize(lastWorldDir));\r
  } else if (u_debug == 8) {\r
    // Pre-post log HDR: includes the disk AND the sky, exactly what the\r
    // composited HDR target will carry into the bright pass.\r
    colour = log(1.0 + max(colour, vec3(0.0)) * 4.0) / log(5.0);\r
  }\r
  // debug == 9 falls through: the HDR target must carry the unmodified\r
  // raw raytrace colour so the bright-pass shader (which reads this\r
  // HDR target) can extract above-threshold pixels.  The renderer then\r
  // routes the bright target directly through composite's diagnostic\r
  // branch to visualise the threshold extraction on screen.\r
\r
  // Linear HDR output.  Tone mapping, grain, vignette, chromatic\r
  // aberration and the final sRGB conversion all live in composite.glsl\r
  // — only that pass is allowed to do the linear->sRGB step.\r
  colour = max(colour, vec3(0.0));\r
  gl_FragColor = vec4(colour, 1.0);\r
}\r
`,tT=`// =========================================================================\r
// GARGANTUA — bright-pass extraction (module 2)\r
//\r
// Reads the linear HDR scene (output of raytrace.glsl), extracts pixels\r
// above \`u_threshold\` (soft-knee with a hard bright shoulder) and\r
// outputs a tinted luminance scalar.  Used as the input to the\r
// separable Gaussian blur in blur.glsl, which in turn feeds the bloom\r
// in composite.glsl.\r
//\r
// Note: debug=9 reads this bright target directly through the composite\r
// pass's diagnostic branch (no amplification — the displayed colour is\r
// the actual soft-knee extraction with a perceptual gamma).  The bright\r
// material intentionally has no debug branch of its own; the renderer\r
// owns the presentation.\r
// =========================================================================\r
\r
precision highp float;\r
\r
uniform sampler2D u_hdr;\r
uniform vec2 u_texelSize;     // 1.0 / targetSize\r
uniform float u_threshold;    // bloom threshold (linear HDR units)\r
uniform float u_intensity;    // bloom intensity (linear scalar)\r
uniform int u_debug;          // accepted but unused — see note above\r
\r
varying vec2 v_uv;\r
\r
vec3 softKnee(vec3 color, float threshold) {\r
  // Compute luminance using Rec.709 weights.\r
  float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));\r
  // Hard bright portion: pixels well above threshold contribute linearly\r
  // so hot disk regions bloom proportionally to their actual brightness\r
  // instead of saturating at the soft-knee shoulder.\r
  float hard = max(lum - threshold, 0.0);\r
  // Soft knee: smooth ramp over the [threshold - knee, threshold + knee]\r
  // band so we don't pop on/off as rays hit the threshold.\r
  float knee = max(threshold * 0.5, 1e-4);\r
  float soft  = lum - threshold + knee;\r
  soft = clamp(soft, 0.0, 2.0 * knee);\r
  soft = soft * soft / max(4.0 * knee, 1e-4);\r
  // Total luminance contribution = hard + soft; per-channel tint is\r
  // proportional to channel intensity so colour stays tinted, not white.\r
  float lumBright = hard + soft;\r
  vec3 contribution = max(vec3(0.0), color) * (lumBright / max(lum, 1e-4));\r
  return contribution * u_intensity;\r
}\r
\r
void main() {\r
  vec3 hdr = texture2D(u_hdr, v_uv).rgb;\r
\r
  // Map HalfFloat input into a finite range.  GLSL ES 1.0 has no\r
  // isnan()/any() so we rely on the clamp alone to handle non-finite\r
  // values; the soft-knee maths that follows is well-conditioned for\r
  // any non-NaN value.\r
  hdr = clamp(hdr, vec3(0.0), vec3(65504.0));\r
\r
  vec3 bright = softKnee(hdr, u_threshold);\r
  gl_FragColor = vec4(bright, 1.0);\r
}\r
`,nT=`// =========================================================================\r
// GARGANTUA — separable Gaussian blur (module 2)\r
//\r
// One shader is reused for the horizontal pass (direction=(1,0)) and the\r
// vertical pass (direction=(0,1)).  The renderer allocates a dedicated\r
// ping-pong pair (blurH, blurV) at half the scene resolution to amortise\r
// the cost — bloom looks visually identical at 1/2 res while doing only\r
// ~25% of the fill-rate.\r
//\r
// Tap count is selected per quality level:\r
//   standard  ->  5 taps\r
//   high      ->  9 taps\r
//   cinematic -> 13 taps\r
//\r
// The shader bakes the maximum-tap compile-time loop upper bound (13) and\r
// the runtime u_taps guard selects which subset to actually accumulate.\r
// =========================================================================\r
\r
precision highp float;\r
\r
uniform sampler2D u_src;\r
uniform vec2 u_direction;     // (1,0) horizontal, (0,1) vertical\r
uniform vec2 u_texelSize;     // 1.0 / sourceSize\r
uniform int u_taps;           // active taps: 5, 9 or 13\r
uniform float u_radius;       // pixel radius multiplier (>=1)\r
\r
varying vec2 v_uv;\r
\r
// Gaussian weights: sigma chosen so the central tap dominates and the\r
// outer 13 taps fall to ~0.5%.  Compiled as a const array for unrolling.\r
const float W0 = 0.196381;\r
const float W1 = 0.174666;\r
const float W2 = 0.121836;\r
const float W3 = 0.066649;\r
const float W4 = 0.028587;\r
const float W5 = 0.009625;\r
const float W6 = 0.002543;\r
\r
float weightForIndex(int i) {\r
  if (i == 0) return W0;\r
  if (i == 1) return W1;\r
  if (i == 2) return W2;\r
  if (i == 3) return W3;\r
  if (i == 4) return W4;\r
  if (i == 5) return W5;\r
  return W6;\r
}\r
\r
void main() {\r
  // Effective pair count: taps/2 (rounded down).  5 -> 2, 9 -> 4, 13 -> 6.\r
  int pairs = u_taps / 2;\r
  float weightSum = W0; // central tap\r
  vec3 accum = texture2D(u_src, v_uv).rgb * W0;\r
\r
  for (int i = 1; i < 7; ++i) {\r
    if (i > pairs) break;\r
    float w = weightForIndex(i);\r
    float ofs = float(i) * u_radius;\r
    vec2 off = u_direction * u_texelSize * ofs;\r
    vec3 s1 = texture2D(u_src, v_uv + off).rgb;\r
    vec3 s2 = texture2D(u_src, v_uv - off).rgb;\r
    accum += (s1 + s2) * w;\r
    weightSum += 2.0 * w;\r
  }\r
\r
  accum /= max(weightSum, 1e-4);\r
  gl_FragColor = vec4(accum, 1.0);\r
}\r
`,iT=`// =========================================================================\r
// GARGANTUA — final composite (module 2)\r
//\r
// Pipeline (debug == 0 — full beauty pass):\r
//   * sample linear HDR raytrace output (with chromatic aberration)\r
//   * add separable-blurred bloom\r
//   * exposure (multiplicative)\r
//   * restrained ACES filmic tone curve\r
//   * radial vignette\r
//   * pixel-level deterministic grain (luma-masked so the deep-dark\r
//     event horizon stays pure black)\r
//   * exactly one linear-to-sRGB conversion before write\r
//\r
// Diagnostic path (debug 1..9):\r
//   * the raytrace shader's \`u_debug\` branch produces a clean\r
//     diagnostic colour straight from the shader; we sample that colour\r
//     from the HDR target, sRGB-encode it once, and write it to the\r
//     canvas without exposure / ACES / vignette / grain / CA so the\r
//     visualisation is faithful to the underlying metric.\r
//   * debug 9 reads the bright-pass target (raw soft-knee luminance)\r
//     instead of the HDR target, with a perceptual scale to lift the\r
//     dim values into a visible range.  This is the only diagnostic\r
//     that does not come from the raytrace shader.\r
//\r
// The renderer sets \`renderer.outputColorSpace = LinearSRGBColorSpace\`\r
// and \`renderer.toneMapping = NoToneMapping\` so Three does NOT do its\r
// own conversion on the way to the default framebuffer.  This shader\r
// is the ONLY place in the pipeline that performs linear->sRGB\r
// encoding.\r
// =========================================================================\r
\r
precision highp float;\r
\r
uniform sampler2D u_hdr;       // raytrace HDR scene\r
uniform sampler2D u_bloom;     // blurred bright pass (also used as the\r
                               // raw threshold-extracted target for debug 9)\r
uniform vec2  u_resolution;    // scene render-target size (px)\r
uniform float u_exposure;      // exposure multiplier\r
uniform float u_vignette;      // 0..0.6 vignette strength\r
uniform float u_grain;         // 0..0.12 grain strength\r
uniform float u_chromatic;     // 0..2 chromatic aberration (px)\r
uniform float u_bloomAmount;   // effective bloom scalar (>=0)\r
uniform int   u_debug;\r
\r
varying vec2 v_uv;\r
\r
// 2D hash (deterministic, time-independent).  Identical inputs -> identical\r
// output.  This is the source of grain — capture mode relies on the\r
// property that nothing in this path uses Date.now() or Math.random().\r
float hash21(vec2 p) {\r
  p = fract(p * vec2(123.34, 456.21));\r
  p += dot(p, p + 45.32);\r
  return fract(p.x * p.y);\r
}\r
\r
// ACES filmic curve (Krzysztof Narkowicz fit).  Input/output in linear.\r
vec3 aces(vec3 x) {\r
  const float a = 2.51;\r
  const float b = 0.03;\r
  const float c = 2.43;\r
  const float d = 0.59;\r
  const float e = 0.14;\r
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);\r
}\r
\r
// Linear -> sRGB transfer (IEC 61966-2-1).  Used once at the end.\r
vec3 linearToSrgb(vec3 c) {\r
  vec3 lo = c * 12.92;\r
  vec3 hi = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;\r
  return mix(hi, lo, step(c, vec3(0.0031308)));\r
}\r
\r
// Diagnostic visualisation: sRGB-encode a linear colour without any of\r
// the beauty pass steps.  The raytrace shader's debug branches already\r
// produce simple linear palette colours (e.g. heatmap blue->orange);\r
// the sRGB encoding makes them perceptually correct on screen.\r
vec3 presentDiagnostic(vec3 linearColour) {\r
  // Diagnostic outputs can exceed [0,1] (e.g. debug 8 log HDR values\r
  // up to ~1.0, debug 5 Doppler up to 1.5).  Tone-clamp before sRGB.\r
  return linearToSrgb(clamp(linearColour, 0.0, 1.0));\r
}\r
\r
void main() {\r
  vec2 uv = v_uv;\r
  vec2 px = 1.0 / u_resolution;\r
\r
  // -------------------------------------------------------------------\r
  // Diagnostic paths first — they bypass the beauty pipeline entirely.\r
  // -------------------------------------------------------------------\r
  if (u_debug == 9) {\r
    // Threshold bright pass: read the raw HDR bright target (soft-knee\r
    // luminance, before blur).  This is the actual soft-knee extraction\r
    // the bloom chain feeds from — soft-knee values are typically\r
    // 0..1.5 in our pipeline.  We present them in red with a small\r
    // perceptual gamma so dim-but-positive pixels stay visible; pixels\r
    // genuinely below the threshold read as pure black.  No composite\r
    // beautification (ACES / vignette / grain / CA) is applied so the\r
    // visualisation reflects the raw extraction.\r
    vec3 bright = texture2D(u_bloom, uv).rgb;\r
    float lum = dot(bright, vec3(0.2126, 0.7152, 0.0722));\r
    float v = clamp(pow(max(lum, 0.0), 0.55), 0.0, 1.0);\r
    gl_FragColor = vec4(presentDiagnostic(vec3(v, v * 0.25, v * 0.05)), 1.0);\r
    return;\r
  }\r
  if (u_debug >= 1 && u_debug <= 8) {\r
    // Diagnostic 1..8: read the HDR target — the raytrace shader\r
    // already produced the diagnostic colour directly via its\r
    // u_debug branch — and present it without beautification.\r
    vec3 colour = texture2D(u_hdr, uv).rgb;\r
    gl_FragColor = vec4(presentDiagnostic(colour), 1.0);\r
    return;\r
  }\r
\r
  // -------------------------------------------------------------------\r
  // debug == 0 — full beauty pipeline.\r
  // -------------------------------------------------------------------\r
\r
  // Chromatic aberration: per-channel pixel offset along radial axis.\r
  // Centre is the principal point (default uv 0.5, 0.5).\r
  vec2 dir = uv - 0.5;\r
  vec2 caR = dir * (u_chromatic * 1.0)  * px;\r
  vec2 caB = dir * (u_chromatic * -1.0) * px;\r
  vec3 hdr;\r
  hdr.r = texture2D(u_hdr, uv + caR).r;\r
  hdr.g = texture2D(u_hdr, uv).g;\r
  hdr.b = texture2D(u_hdr, uv + caB).b;\r
\r
  vec3 bloom = texture2D(u_bloom, uv).rgb;\r
  vec3 scene = hdr + bloom * u_bloomAmount;\r
\r
  // Exposure\r
  scene *= max(u_exposure, 0.0);\r
\r
  // ACES tone-map.  Operates in linear; linearToSrgb follows.\r
  vec3 toneMapped = aces(scene);\r
\r
  // Vignette (after tone-map so the darkening follows perceptual\r
  // brightness).  \`length(dir)\` is 0 at the screen centre and ~0.7 at\r
  // the corners; \`smoothstep(0.35, 0.85, r)\` rises from 0 to 1 across\r
  // that band, so 1 - that gives the brightness multiplier.\r
  float vig = 1.0 - smoothstep(0.35, 0.85, length(dir));\r
  toneMapped *= mix(1.0, vig, clamp(u_vignette, 0.0, 1.0));\r
\r
  // Deterministic grain — hash on integer pixel coords for stability.\r
  // Modulate by a luminance mask so the deep-dark event horizon stays\r
  // pure black instead of getting lifted by the grain hash.\r
  vec2 grainCoord = gl_FragCoord.xy;\r
  float g = hash21(grainCoord) - 0.5;\r
  float grainMask = smoothstep(0.02, 0.18, max(max(toneMapped.r, toneMapped.g), toneMapped.b));\r
  toneMapped += g * clamp(u_grain, 0.0, 1.0) * grainMask;\r
\r
  // Linear -> sRGB conversion (the only one in the entire pipeline).\r
  gl_FragColor = vec4(linearToSrgb(clamp(toneMapped, 0.0, 1.0)), 1.0);\r
}\r
`,Uu=`
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`,Dg={standard:0,high:1,cinematic:2};function aT(){const s=new va,e=new Float32Array([-1,-1,3,-1,-1,3]);return s.setAttribute("a_position",new Di(e,2)),s.setDrawRange(0,3),s}function rT(s){if(!s)return!1;try{if(s instanceof WebGL2RenderingContext)return!!s.getExtension("EXT_color_buffer_float")||!!s.getExtension("EXT_color_buffer_half_float")}catch{}return!1}function sT(s,e,i){const r=w=>{typeof i=="function"&&i(w)};let l=null;try{l=s.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1,premultipliedAlpha:!0})}catch{}if(!l)return r({ready:!1,lost:!1,error:"WebGL2 context creation failed"}),{renderNow(){},dispose(){}};if(!rT(l))return r({ready:!1,lost:!1,error:"WebGL2 EXT_color_buffer_float / EXT_color_buffer_half_float not available; HDR pipeline unsupported on this device."}),{renderNow(){},dispose(){}};let c;try{c=new BE({canvas:s,context:l,antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"})}catch(w){return r({ready:!1,lost:!1,error:String(w&&w.message||w)}),{renderNow(){},dispose(){}}}c.autoClear=!0,c.setClearColor(new Bt(0),1),c.toneMapping=ma,c.outputColorSpace=Nr;let h=null;c.debug&&(c.debug.checkShaderErrors=!0,c.debug.onShaderError=function(w,ce,Ee,Se){const be=w.getProgramInfoLog(ce)||"",pe=w.getShaderInfoLog(Ee)||"",De=w.getShaderInfoLog(Se)||"",Fe="Shader compile/link failed"+(be?`
program: ${be}`:"")+(pe?`
vertex: ${pe}`:"")+(De?`
fragment: ${De}`:"");h=Fe,r({ready:!1,lost:!1,error:Fe})});let d=function(){},m=function(){};function p(w){d(w)}function x(w){m(w)}s.addEventListener("webglcontextlost",p,!1),s.addEventListener("webglcontextrestored",x,!1);const _=eT,v={u_resolution:{value:new ct(1,1)},u_pixelAspect:{value:1},u_cameraPos:{value:new oe},u_cameraRight:{value:new oe(1,0,0)},u_cameraUp:{value:new oe(0,1,0)},u_cameraForward:{value:new oe(0,0,-1)},u_cameraFovY:{value:46*Math.PI/180},u_time:{value:0},u_quality:{value:Dg[e.getState().quality]??1},u_debug:{value:e.getState().debug},u_cameraDistance:{value:22},u_cameraAzimuth:{value:32*Math.PI/180},u_cameraElevation:{value:24*Math.PI/180},u_diskInner:{value:3},u_diskOuter:{value:11},u_diskHalfThickness:{value:.16},u_diskTemperature:{value:1},u_diskEmission:{value:1.2},u_orbitalSpeed:{value:1},u_turbulenceAmplitude:{value:.35},u_turbulenceSpeed:{value:.7},u_starDensity:{value:1},u_galaxyBrightness:{value:.7},u_bloomIntensity:{value:.65},u_bloomThreshold:{value:1.2},u_maxSteps:{value:176},u_maxCrossings:{value:3},u_pixelScale:{value:.72}},S=new Ru({vertexShader:Uu,fragmentShader:_,uniforms:v,depthTest:!1,depthWrite:!1}),A=aT(),D=new tg,y=new Gu,b=new Ii(A,S);b.frustumCulled=!1,D.add(b);const P=new gi(46,1,.1,500);P.up.set(0,1,0),P.position.set(0,4,22),P.lookAt(0,0,0);const L=new GE(P,s);L.enablePan=!1,L.enableRotate=!0,L.enableZoom=!0,L.enableDamping=!0,L.dampingFactor=.08,L.rotateSpeed=.8,L.zoomSpeed=1,L.minDistance=12,L.maxDistance=45;let H=null,q=!1,O=null;const I={u_hdr:{value:null},u_texelSize:{value:new ct(1,1)},u_threshold:{value:1.2},u_intensity:{value:1},u_debug:{value:0}},te=new Ru({vertexShader:Uu,fragmentShader:tT,uniforms:I,depthTest:!1,depthWrite:!1}),U={u_src:{value:null},u_direction:{value:new ct(1,0)},u_texelSize:{value:new ct(1,1)},u_taps:{value:9},u_radius:{value:2.5}},C=new Ru({vertexShader:Uu,fragmentShader:nT,uniforms:U,depthTest:!1,depthWrite:!1}),V={u_hdr:{value:null},u_bloom:{value:null},u_resolution:{value:new ct(1,1)},u_exposure:{value:1},u_vignette:{value:.18},u_grain:{value:.025},u_chromatic:{value:.4},u_bloomAmount:{value:1},u_debug:{value:0}},$=new Ru({vertexShader:Uu,fragmentShader:iT,uniforms:V,depthTest:!1,depthWrite:!1}),le=new tg,_e=new Gu,de=new Ii(A,te);de.frustumCulled=!1,le.add(de);let z=null,Y=null,F=null,k=null;function W(w,ce){return new ir(w,ce,{minFilter:Yn,magFilter:Yn,wrapS:Ci,wrapT:Ci,format:vi,type:Pr,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1})}function R(w){if(w)try{w.dispose()}catch{}}function J(w,ce){R(z),R(Y),R(F),R(k),z=W(w,ce),Y=W(w,ce);const Ee=Math.max(1,Math.floor(w/2)),Se=Math.max(1,Math.floor(ce/2));F=W(Ee,Se),k=W(Ee,Se)}let ge=!1;function Re(){if(typeof window>"u"||!window.matchMedia)return!1;try{return window.matchMedia("(pointer: coarse)").matches}catch{return!1}}function Oe(){return Re()?1.5:2}function ae(){return Math.min(window.devicePixelRatio||1,Oe())}function he(w){const ce=e.getQualityBudget();v.u_maxSteps.value=ce.maxSteps,v.u_maxCrossings.value=ce.maxCrossings,v.u_pixelScale.value=ce.scale,U.u_taps.value=ce.bloomTaps;const Ee=Dg[w]??1;v.u_quality.value!==Ee&&(v.u_quality.value=Ee)}function Ue(){const w=e.getConfigSnapshot(),ce=w.parameters;v.u_diskInner.value=ce.diskInner,v.u_diskOuter.value=ce.diskOuter,v.u_diskHalfThickness.value=ce.diskHalfThickness,v.u_diskTemperature.value=ce.diskTemperature,v.u_diskEmission.value=ce.diskEmission,v.u_orbitalSpeed.value=ce.orbitalSpeed,v.u_turbulenceAmplitude.value=ce.turbulenceAmplitude,v.u_turbulenceSpeed.value=ce.turbulenceSpeed,v.u_starDensity.value=ce.starDensity,v.u_galaxyBrightness.value=ce.galaxyBrightness,I.u_threshold.value=ce.bloomThreshold,I.u_intensity.value=1,V.u_exposure.value=ce.exposure,V.u_vignette.value=ce.vignette,V.u_grain.value=ce.grain,V.u_chromatic.value=ce.chromaticAberration,V.u_bloomAmount.value=ce.bloomIntensity,v.u_bloomIntensity.value=ce.bloomIntensity,v.u_bloomThreshold.value=ce.bloomThreshold,v.u_cameraFovY.value=ce.fov*Math.PI/180,I.u_debug.value=w.debug,V.u_debug.value=w.debug,v.u_debug.value!==w.debug&&(v.u_debug.value=w.debug),he(w.quality)}Ue();function Ve(){const w=e.getState();v.u_time.value=w.time}Ve();function Xe(){const w=e.getConfigSnapshot().parameters,ce=w.cameraDistance,Ee=w.azimuth*Math.PI/180,Se=w.elevation*Math.PI/180,be=ce*Math.cos(Se)*Math.sin(Ee),pe=ce*Math.sin(Se),De=ce*Math.cos(Se)*Math.cos(Ee);P.position.set(be,pe,De),P.lookAt(0,0,0),P.fov=w.fov,P.updateProjectionMatrix(),L.update()}Xe();let rt=!1;L.addEventListener("change",()=>{if(rt||!P||!L)return;const w=P.position,ce=w.length();if(!(ce>0))return;const Ee=Math.atan2(w.x,w.z)*180/Math.PI,Se=Math.asin(Math.max(-1,Math.min(1,w.y/ce)))*180/Math.PI;e.setCameraFromControls({fov:P.fov,cameraDistance:Math.max(12,Math.min(45,ce)),azimuth:Ee,elevation:Se})});let Ht=null;H=e.subscribe(w=>{const ce=w.parameters;if(!Ht||Ht.parameters.azimuth!==ce.azimuth||Ht.parameters.elevation!==ce.elevation||Ht.parameters.cameraDistance!==ce.cameraDistance||Math.abs(Ht.parameters.fov-ce.fov)>.05){const Se=Math.max(12,Math.min(45,ce.cameraDistance)),be=ce.azimuth*Math.PI/180,pe=ce.elevation*Math.PI/180,De=Se*Math.cos(pe)*Math.sin(be),Fe=Se*Math.sin(pe),_t=Se*Math.cos(pe)*Math.cos(be),gt=P.position,$t=.02;if(Math.abs(gt.x-De)>$t||Math.abs(gt.y-Fe)>$t||Math.abs(gt.z-_t)>$t||Math.abs(P.fov-ce.fov)>.05){rt=!0;try{gt.set(De,Fe,_t),P.fov=ce.fov,P.updateProjectionMatrix(),L.update()}finally{rt=!1}}}Ht=w,Ue(),v.u_time.value=w.time});let ot=-1,St=-1,G=-1,lt=-1;function st(){if(ge)return;const w=q,ce=Math.max(1,s.clientWidth||s.width),Ee=Math.max(1,s.clientHeight||s.height),Se=v.u_pixelScale.value||1,be=ae(),pe=Math.max(1,Math.round(ce*be*Se)),De=Math.max(1,Math.round(Ee*be*Se));v.u_resolution.value.set(pe,De),v.u_pixelAspect.value=De/Math.max(pe,1);const Fe=pe/Math.max(De,1);Math.abs(P.aspect-Fe)>1e-4&&(P.aspect=Fe,P.updateProjectionMatrix()),(s.width!==pe||s.height!==De||ot!==be||St!==ce||G!==Ee||lt!==Se)&&!w&&(s.width=pe,s.height=De,c.setPixelRatio(1),c.setSize(pe,De,!1),J(pe,De),ot=be,St=ce,G=Ee,lt=Se),Y&&I.u_texelSize.value.set(1/Y.width,1/Y.height),F&&U.u_texelSize.value.set(1/F.width,1/F.height),V.u_resolution.value.set(pe,De)}const Ct=typeof ResizeObserver<"u"?new ResizeObserver(()=>st()):null;Ct&&Ct.observe(s),window.addEventListener("resize",st),window.addEventListener("orientationchange",st);const He=new oe,Pt=new oe,Ze=new oe;function nt(){const w=P;He.set(1,0,0).applyQuaternion(w.quaternion),Pt.set(0,1,0).applyQuaternion(w.quaternion),Ze.set(0,0,-1).applyQuaternion(w.quaternion),v.u_cameraPos.value.copy(w.position),v.u_cameraRight.value.copy(He).normalize(),v.u_cameraUp.value.copy(Pt).normalize(),v.u_cameraForward.value.copy(Ze).normalize()}function N(w,ce){de.material=w,c.setRenderTarget(ce),c.render(le,_e)}let M=!1,Q=!1,me=0;function Me(){if(ge||q||!z||!Y||!F||!k)return;c.setRenderTarget(z),c.clear(!0,!0,!0),c.render(D,y),I.u_hdr.value=z.texture,N(te,Y),U.u_src.value=Y.texture,U.u_direction.value.set(1,0),U.u_texelSize.value.set(1/Math.max(F.width,1),1/Math.max(F.height,1)),N(C,F),U.u_src.value=F.texture,U.u_direction.value.set(0,1),N(C,k);const w=v.u_debug.value|0;c.setRenderTarget(null),w===9?(V.u_hdr.value=z.texture,V.u_bloom.value=Y.texture):(V.u_hdr.value=z.texture,V.u_bloom.value=k.texture),N($,null)}let fe=!1,je=0,we=!1,Ke=0;const qe=2,Te=.04;function Ae(){rt||(fe=!0,je=performance.now(),we=!1,Ke=0)}L.addEventListener("start",Ae),L.addEventListener("change",Ae),s.addEventListener("wheel",Ae,{passive:!0}),s.addEventListener("pointerdown",Ae),s.addEventListener("touchstart",Ae,{passive:!0});let We=performance.now();function Ie(){if(ge||q)return;const w=performance.now(),ce=w-We;We=w;const Ee=Math.min(.1,ce/1e3),Se=e.getState(),be=e.getConfigSnapshot();if(Se.playing&&!Se.capture){const Fe=be.parameters.timeScale;Fe>0&&(v.u_time.value+=Fe*Ee,e.advanceTime(Fe*Ee))}const pe=!fe||w-je>qe*1e3;if(Se.playing&&!Se.capture&&pe){we||(Ke=0),we=!0,Ke+=Te*Ee;const Fe=P.position,_t=Fe.length();if(_t>0){const gt=be.parameters.azimuth*Math.PI/180,$t=be.parameters.elevation*Math.PI/180,Ln=gt+Ke;rt=!0;try{Fe.x=_t*Math.cos($t)*Math.sin(Ln),Fe.y=_t*Math.sin($t),Fe.z=_t*Math.cos($t)*Math.cos(Ln)}catch{}}}else we&&(!Se.playing||Se.capture||!pe)&&(we=!1,Ke=0);try{L.update()}finally{rt=!1}nt(),st();try{Me()}catch(Fe){r({ready:!1,lost:!1,error:String(Fe&&Fe.message||Fe)}),ge=!0;return}if(h){r({ready:!1,lost:!1,error:h}),ge=!0;return}Q||(Q=!0,M=!0,r({ready:!0,lost:!1})),me=requestAnimationFrame(Ie)}try{if(st(),nt(),Me(),h)return r({ready:!1,lost:!1,error:h}),{renderNow(){},dispose(){}};Q=!0,M=!0,r({ready:!0,lost:!1})}catch(w){return r({ready:!1,lost:!1,error:String(w&&w.message||w)}),{renderNow(){},dispose(){}}}me=requestAnimationFrame(Ie),d=function(w){ge||(typeof w.preventDefault=="function"&&w.preventDefault(),me&&(cancelAnimationFrame(me),me=0),q=!0,O=null,R(z),R(Y),R(F),R(k),z=Y=F=k=null,ot=-1,St=-1,G=-1,lt=-1,Q=!1,M=!1,r({ready:!1,lost:!0,error:"WebGL context lost — auto-restoring."}))},m=function(){if(!ge&&q){q=!1,h=null;try{if(st(),nt(),Me(),h){O=h,M=!1,r({ready:!1,lost:!1,error:h});return}Q=!0,M=!0,O=null,We=performance.now(),r({ready:!0,lost:!1}),me&&cancelAnimationFrame(me),me=requestAnimationFrame(Ie)}catch(w){O=String(w&&w.message||w),M=!1,r({ready:!1,lost:!1,error:"WebGL context restore failed: "+O})}}};function ze(){if(!ge&&!q){st(),nt();try{Me()}catch(w){r({ready:!1,lost:!1,error:String(w&&w.message||w)})}}}function it(){if(!ge){if(ge=!0,me&&(cancelAnimationFrame(me),me=0),q=!0,window.removeEventListener("resize",st),window.removeEventListener("orientationchange",st),s.removeEventListener("webglcontextlost",p,!1),s.removeEventListener("webglcontextrestored",x,!1),Ct)try{Ct.disconnect()}catch{}if(H){try{H()}catch{}H=null}try{A.dispose()}catch{}try{S.dispose()}catch{}try{te.dispose()}catch{}try{C.dispose()}catch{}try{$.dispose()}catch{}R(z),R(Y),R(F),R(k),z=Y=F=k=null;try{c.dispose()}catch{}try{L.dispose()}catch{}r({ready:!1,lost:!0})}}return{renderNow:ze,dispose:it}}const ko=Object.freeze({fov:46,cameraDistance:22,azimuth:32,elevation:24,timeScale:1,diskInner:3,diskOuter:11,diskHalfThickness:.16,diskTemperature:1,diskEmission:1.2,orbitalSpeed:1,turbulenceAmplitude:.35,turbulenceSpeed:.7,starDensity:1,galaxyBrightness:.7,bloomIntensity:.65,bloomThreshold:1.2,exposure:1,vignette:.18,grain:.025,chromaticAberration:.4}),tr=Object.freeze({standard:Object.freeze({scale:.55,maxSteps:96,maxCrossings:2,bloomTaps:5}),high:Object.freeze({scale:.72,maxSteps:176,maxCrossings:3,bloomTaps:9}),cinematic:Object.freeze({scale:1,maxSteps:288,maxCrossings:4,bloomTaps:13})}),zh=Object.freeze(["final composite","steps / termination heatmap","horizon / capture mask","first disk crossing radius","higher-order disk crossings","redshift / Doppler factor","escape direction (lensed sky)","procedural sky / galaxy alone","pre-post log HDR (disk + sky)","bloom threshold bright pass"]),Vo=Object.freeze(["classic observer","equatorial skim","polar overview","far-field lensing"]),_i=Object.freeze([Object.freeze({name:Vo[0],cameraDistance:22,azimuth:32,elevation:24,fov:46}),Object.freeze({name:Vo[1],cameraDistance:16,azimuth:105,elevation:8,fov:50}),Object.freeze({name:Vo[2],cameraDistance:26,azimuth:-35,elevation:58,fov:43}),Object.freeze({name:Vo[3],cameraDistance:34,azimuth:-120,elevation:-20,fov:37})]),c_=Object.freeze({fov:{min:30,max:75,step:1,label:"FOV (degrees)"},cameraDistance:{min:12,max:45,step:.5,label:"camera distance (r_s)"},azimuth:{min:-180,max:180,step:1,label:"azimuth (degrees)"},elevation:{min:-70,max:70,step:1,label:"elevation (degrees)"},timeScale:{min:0,max:3,step:.05,label:"time scale"},diskInner:{min:2.7,max:6,step:.1,label:"disk inner radius"},diskOuter:{min:7,max:18,step:.2,label:"disk outer radius"},diskHalfThickness:{min:.03,max:.7,step:.01,label:"disk half thickness"},diskTemperature:{min:.5,max:2,step:.05,label:"disk temperature"},diskEmission:{min:.25,max:3,step:.05,label:"disk emission"},orbitalSpeed:{min:.5,max:1.4,step:.02,label:"orbital speed"},turbulenceAmplitude:{min:0,max:1,step:.02,label:"turbulence amplitude"},turbulenceSpeed:{min:0,max:2,step:.05,label:"turbulence speed"},starDensity:{min:.1,max:3,step:.05,label:"star density"},galaxyBrightness:{min:0,max:2,step:.05,label:"galaxy brightness"},bloomIntensity:{min:0,max:2,step:.05,label:"bloom intensity"},bloomThreshold:{min:.5,max:4,step:.05,label:"bloom threshold"},exposure:{min:.4,max:2,step:.05,label:"exposure"},vignette:{min:0,max:.6,step:.01,label:"vignette"},grain:{min:0,max:.12,step:.005,label:"film grain"},chromaticAberration:{min:0,max:2,step:.05,label:"chromatic aberration"}});function oT(){return c_}function lT(){return Vo}function pn(s,e,i){return Math.min(i,Math.max(e,s))}function uT(s){return(s+540)%360-180}function Ns(s){const e={...ko,...s||{}};return e.fov=pn(e.fov,30,75),e.cameraDistance=pn(e.cameraDistance,12,45),e.azimuth=uT(e.azimuth),e.elevation=pn(e.elevation,-70,70),e.timeScale=pn(e.timeScale,0,3),e.diskInner=pn(e.diskInner,2.7,6),e.diskOuter=pn(e.diskOuter,7,18),e.diskHalfThickness=pn(e.diskHalfThickness,.03,.7),e.diskTemperature=pn(e.diskTemperature,.5,2),e.diskEmission=pn(e.diskEmission,.25,3),e.orbitalSpeed=pn(e.orbitalSpeed,.5,1.4),e.turbulenceAmplitude=pn(e.turbulenceAmplitude,0,1),e.turbulenceSpeed=pn(e.turbulenceSpeed,0,2),e.starDensity=pn(e.starDensity,.1,3),e.galaxyBrightness=pn(e.galaxyBrightness,0,2),e.bloomIntensity=pn(e.bloomIntensity,0,2),e.bloomThreshold=pn(e.bloomThreshold,.5,4),e.exposure=pn(e.exposure,.4,2),e.vignette=pn(e.vignette,0,.6),e.grain=pn(e.grain,0,.12),e.chromaticAberration=pn(e.chromaticAberration,0,2),e.diskInner+.5>e.diskOuter&&(e.diskOuter=Math.min(18,e.diskInner+1)),e}function Qa(s){return typeof s!="number"||!Number.isFinite(s)?null:s}function Ad(){if(typeof window>"u"||typeof window.matchMedia!="function")return!1;try{return window.matchMedia("(pointer: coarse)").matches}catch{return!1}}function cT(){if(typeof window>"u")return null;try{const s="__gargantua_probe__";return window.localStorage.setItem(s,"1"),window.localStorage.removeItem(s),window.localStorage}catch{return null}}const Bd="gargantua:v1";function fT(s){if(!s)return null;let e;try{e=s.getItem(Bd)}catch{return null}if(!e)return null;let i;try{i=JSON.parse(e)}catch{return null}if(!i||typeof i!="object"||i.version!==1)return null;const r={};if(i.parameters&&typeof i.parameters=="object"){const l={};for(const[c,h]of Object.entries(c_)){const d=i.parameters[c];typeof d=="number"&&Number.isFinite(d)&&(l[c]=d)}Object.keys(l).length>0&&(r.parameters=Ns(l))}return typeof i.quality=="string"&&Object.prototype.hasOwnProperty.call(tr,i.quality)&&(r.quality=i.quality),Number.isInteger(i.preset)&&i.preset>=0&&i.preset<_i.length?r.preset=i.preset:i.preset===null&&(r.preset=null),Number.isInteger(i.debug)&&i.debug>=0&&i.debug<=9&&(r.debug=i.debug),typeof i.hud=="boolean"&&(r.hud=i.hud),typeof i.playing=="boolean"&&(r.playing=i.playing),r}function hT(s,e){if(!s)return;const i=JSON.stringify({version:1,parameters:e.parameters,quality:e.quality,preset:e.preset,debug:e.debug,hud:e.hud,playing:e.playing});try{s.setItem(Bd,i)}catch{}}function dT(s){if(s)try{s.removeItem(Bd)}catch{}}function wg(s){if(!s)return{};const e=new URLSearchParams(s.startsWith("?")?s:`?${s}`),i={};for(const r of["capture","quality","preset","debug","hud","time"]){const l=e.get(r);l!=null&&(i[r]=l)}return i}function pT(s){return typeof s!="string"?null:Object.prototype.hasOwnProperty.call(tr,s)?s:null}const mT=/^-?\d+$/;function f_(s){if(typeof s!="string"||!mT.test(s))return null;const e=Number(s);return!Number.isFinite(e)||!Number.isInteger(e)?null:e}function xT(s){const e=f_(s);return e==null||e<0||e>=_i.length?null:e}function gT(s){const e=f_(s);return e==null||e<0||e>9?null:e}function _T(s){return s==="0"?!1:s==="1"?!0:null}function h_(s){if(typeof s!="string"||s.length===0||!/^\d+(\.\d+)?$/.test(s))return null;const e=Number(s);return!Number.isFinite(e)||e<0?null:e}function vT(s){return s==="1"?!0:s==="0"?!1:null}function Ug(s,e){const i={...s};if("capture"in e){const r=vT(e.capture);r!==null?i.capture=r:i.capture=!1}if("quality"in e){const r=pT(e.quality);r!==null?i.quality=r:i.quality=Ad()?"standard":"high"}if("preset"in e){const r=xT(e.preset);if(r!==null)i.preset=r,i.parameters=Ns({...i.parameters,cameraDistance:_i[r].cameraDistance,azimuth:_i[r].azimuth,elevation:_i[r].elevation,fov:_i[r].fov});else{const l=_i[0];i.preset=0,i.parameters=Ns({...i.parameters,cameraDistance:l.cameraDistance,azimuth:l.azimuth,elevation:l.elevation,fov:l.fov})}}if("debug"in e){const r=gT(e.debug);r!==null?i.debug=r:i.debug=0}if("hud"in e){const r=_T(e.hud);r!==null?i.hud=r:i.hud=!0}if("time"in e){const r=h_(e.time);r!==null&&(i.time=r)}return i}function bT(s){const e=cT(),i=fT(e)||{},l={...{parameters:{...ko},quality:Ad()?"standard":"high",preset:0,debug:0,hud:!0,playing:!0,capture:!1,time:0}};i.parameters&&(l.parameters=i.parameters),i.quality&&(l.quality=i.quality),i.preset!==void 0&&(l.preset=i.preset),i.debug!==void 0&&(l.debug=i.debug),i.hud!==void 0&&(l.hud=i.hud),i.playing!==void 0&&(l.playing=i.playing);const c=wg(s||(typeof window<"u"?window.location.search:"")),h=Ug(l,c);h.capture&&(h.playing=!1,(!("time"in c)||h_(c.time)==null)&&(h.time=0));function d(){x.parameters={...ko},x.quality=Ad()?"standard":"high",x.preset=0,x.debug=0,x.hud=!0,x.capture||(x.playing=!0,x.time=0),dT(e),m=!0;try{y()}finally{m=!1}}let m=!1;function p(k){return Object.freeze({parameters:Object.freeze({...k.parameters}),quality:k.quality,preset:k.preset,debug:k.debug,hud:k.hud,playing:k.playing})}const x={parameters:h.parameters,quality:h.quality,preset:h.preset,debug:h.debug,hud:h.hud,playing:h.playing,time:h.time,status:{kind:"booting",message:""},capture:h.capture};let _=Object.freeze(p(x));const v=new Set;function S(k){return Object.freeze({..._,time:k.time,capture:k.capture,status:k.status})}function A(){_=p(x)}function D(){e&&hT(e,_)}function y(){A(),m||D();const k=S(x);for(const W of v)try{W(k)}catch{}}function b(k,W){if(!Object.prototype.hasOwnProperty.call(ko,k))return;const R=Qa(W);if(R==null)return;const J=Ns({...x.parameters,[k]:R});x.parameters={...x.parameters,...J},(k==="fov"||k==="cameraDistance"||k==="azimuth"||k==="elevation")&&(x.preset=null),y()}function P({fov:k,cameraDistance:W,azimuth:R,elevation:J}){const ge=Qa(k),Re=Qa(W),Oe=Qa(R),ae=Qa(J);if(ge==null||Re==null||Oe==null||ae==null)return;const he=Ns({...x.parameters,fov:ge,cameraDistance:Re,azimuth:Oe,elevation:ae});x.parameters={...x.parameters,...he},x.preset=null,y()}function L(k){return Object.prototype.hasOwnProperty.call(tr,k)?(x.quality!==k&&(x.quality=k,y()),S(x)):null}function H(k){if(k===null)return x.preset!==null&&(x.preset=null,y()),S(x);if(!Number.isInteger(k)||k<0||k>=_i.length)return null;const W=_i[k];return x.parameters=Ns({...x.parameters,cameraDistance:W.cameraDistance,azimuth:W.azimuth,elevation:W.elevation,fov:W.fov}),x.preset=k,y(),S(x)}function q(k){const W=Qa(k);if(W==null)return null;const R=Math.trunc(W);return!Number.isInteger(R)||R<0||R>9?null:(x.debug!==R&&(x.debug=R,y()),S(x))}function O(k){const W=!!k;return x.hud!==W&&(x.hud=W,y()),S(x)}function I(k){const W=!!k;return x.playing!==W&&(x.playing=W,y()),S(x)}function te(k){const W=Qa(k);return W==null||W<0?null:(x.time!==W&&(x.time=W,y()),S(x))}let U=0;function C(k){const W=Qa(k);if(W!=null&&!(W<=0)&&(x.time+=W,U+=W,U>=1)){U=0;const R=S(x);for(const J of v)try{J(R)}catch{}}}function V(k){x.status=k;const W=S(x);for(const R of v)try{R(W)}catch{}}function $(k){x.capture=!!k,k&&(x.playing=!1),y()}function le(){return S(x)}function _e(){return _}function de(k){return v.add(k),()=>v.delete(k)}function z(){return tr[x.quality]||tr.standard}function Y(){return _i}function F(k){const W=wg(k||""),R=Ug({parameters:x.parameters,quality:x.quality,preset:x.preset,debug:x.debug,hud:x.hud,playing:x.playing,capture:x.capture},W);m=!0;try{x.parameters=R.parameters,x.quality=R.quality,x.preset=R.preset,x.debug=R.debug,x.hud=R.hud,x.playing=R.playing,x.capture=R.capture,R.time!=null&&(x.time=R.time),y()}finally{m=!1}}return A(),{getState:le,getConfigSnapshot:_e,subscribe:de,setParameter:b,setCameraFromControls:P,setQuality:L,setPreset:H,setDebug:q,setHud:O,setPlaying:I,setTime:te,advanceTime:C,reset:d,setStatus:V,setCaptureMode:$,getQualityBudget:z,getPresetConstants:Y,applySearchOverrides:F}}const Lg=["standard","high","cinematic"];function yT(s,e,i,r){const l=Math.min(i,Math.max(e,s)),c=Math.round((l-e)/r)*r+e;return Math.min(i,Math.max(e,c))}function d_(s){return Math.abs(s)>=100?s.toFixed(0):Math.abs(s)>=10?s.toFixed(1):Math.abs(s)>=1?s.toFixed(2):s.toFixed(3)}function ST({index:s,active:e,label:i,onActivate:r}){return Pe.jsxs("button",{type:"button",className:"preset-btn"+(e?" active":""),"data-preset":s,onClick:()=>r(s),"aria-pressed":e,"aria-label":`Preset ${s+1}: ${i}`,children:[Pe.jsx("span",{className:"preset-num",children:s+1}),Pe.jsx("span",{className:"preset-name",children:i})]})}function MT({level:s,active:e,onActivate:i}){return Pe.jsx("button",{type:"button",className:"quality-btn"+(e?" active":""),"data-quality":s,onClick:()=>i(s),"aria-pressed":e,children:s})}function ET({value:s,label:e,active:i,onActivate:r}){return Pe.jsxs("button",{type:"button",className:"debug-btn"+(i?" active":""),"data-debug":s,onClick:()=>r(s),"aria-pressed":i,title:e,children:[Pe.jsx("span",{className:"debug-key",children:s}),Pe.jsx("span",{className:"debug-name",children:e})]})}function TT({name:s,value:e,meta:i,onChange:r}){const l=Kt.useCallback(d=>{const m=Number(d.target.value);r(s,m)},[s,r]),c=Kt.useCallback(d=>{const m=Number(d.target.value);Number.isFinite(m)&&r(s,yT(m,i.min,i.max,i.step))},[s,i,r]),h=Kt.useCallback(()=>{r(s,i.defaultValue)},[s,i.defaultValue,r]);return Pe.jsxs("div",{className:"param-row","data-param":s,children:[Pe.jsx("label",{className:"param-label",htmlFor:`param-${s}`,children:i.label}),Pe.jsx("input",{id:`param-${s}`,type:"range",min:i.min,max:i.max,step:i.step,value:e,onChange:l,className:"param-range"}),Pe.jsx("input",{type:"number",min:i.min,max:i.max,step:i.step,value:d_(e),onChange:c,className:"param-number"}),Pe.jsx("button",{type:"button",className:"param-reset",onClick:h,"aria-label":`Reset ${i.label}`,title:"Reset to default",children:"↺"})]})}function AT({store:s}){const e=Kt.useRef(null),i=Kt.useRef(null),r=Kt.useRef(null),[l,c]=Kt.useState(()=>{if(typeof window>"u")return!1;try{const F=window.matchMedia("(pointer: coarse)").matches,k=window.matchMedia("(max-width: 720px)").matches;return F&&k}catch{return!1}}),[h,d]=Kt.useState({kind:"booting",message:""}),[m,p]=Kt.useState(!1);Kt.useEffect(()=>{if(typeof window>"u"||typeof window.matchMedia!="function")return;const F=window.matchMedia("(max-width: 720px)"),k=window.matchMedia("(pointer: coarse)");function W(){k.matches&&F.matches&&c(!0)}if(W(),typeof F.addEventListener=="function")return F.addEventListener("change",W),()=>F.removeEventListener("change",W)},[]);const[x,_]=Kt.useState(()=>s.getState());Kt.useEffect(()=>s.subscribe(k=>{_({time:k.time,capture:!!k.capture,parameters:k.parameters,quality:k.quality,preset:k.preset,debug:k.debug,hud:k.hud,playing:k.playing})}),[s]);const v=x.parameters,S=x.quality,A=x.preset,D=x.debug,y=x.playing,b=x.hud,P=x.time,L=x.capture,H=Kt.useMemo(()=>{const F=oT(),k={};for(const[W,R]of Object.entries(F))k[W]=Object.freeze({...R,defaultValue:ko[W]});return k},[]),q=Kt.useMemo(()=>Object.keys(H),[H]),O=Kt.useMemo(()=>lT(),[]),I=Kt.useCallback(F=>{s.setPreset(F)},[s]),te=Kt.useCallback(F=>{s.setQuality(F)},[s]),U=Kt.useCallback(F=>{s.setDebug(F)},[s]),C=Kt.useCallback((F,k)=>{s.setParameter(F,k)},[s]),V=Kt.useCallback(()=>{s.setPlaying(!x.playing)},[s,x.playing]),$=Kt.useCallback(()=>{s.reset()},[s]),le=Kt.useCallback(()=>{s.setHud(!x.hud)},[s,x.hud]);Kt.useEffect(()=>{function F(W){if(!W)return!1;const R=(W.tagName||"").toUpperCase();return!!(R==="INPUT"||R==="TEXTAREA"||R==="SELECT"||W.isContentEditable)}function k(W){if(!F(W.target)&&!(W.altKey||W.ctrlKey||W.metaKey)){if(W.shiftKey&&(W.code==="Digit1"||W.code==="Digit2"||W.code==="Digit3"||W.code==="Digit4")){const R=Number(W.code.slice(-1))-1;I(R),W.preventDefault();return}if(W.key===" "){x.capture||V(),W.preventDefault();return}if(W.key==="h"||W.key==="H"){le(),W.preventDefault();return}if(W.key==="r"||W.key==="R"){$(),W.preventDefault();return}if(W.key==="q"||W.key==="Q"){const R=["standard","high","cinematic"],J=R.indexOf(x.quality),ge=R[(J+1)%R.length];te(ge),W.preventDefault();return}W.key>="0"&&W.key<="9"&&(U(Number(W.key)),W.preventDefault())}}return window.addEventListener("keydown",k),()=>window.removeEventListener("keydown",k)},[I,V,le,$,te,U,x.quality]),Kt.useEffect(()=>{function F(W){const R=W.target;if(!R)return;const J=(R.tagName||"").toUpperCase();(J==="INPUT"||J==="TEXTAREA")&&p(!0)}function k(W){const R=W.target;if(!R)return;const J=(R.tagName||"").toUpperCase();(J==="INPUT"||J==="TEXTAREA")&&setTimeout(()=>{const ge=document.activeElement;if(!ge){p(!1);return}const Re=(ge.tagName||"").toUpperCase();Re!=="INPUT"&&Re!=="TEXTAREA"&&p(!1)},0)}return window.addEventListener("focus",F,!0),window.addEventListener("blur",k,!0),()=>{window.removeEventListener("focus",F,!0),window.removeEventListener("blur",k,!0)}},[]),Kt.useEffect(()=>{let F=!1;function k(W){if(F)return;let R;W.ready?R={kind:"ready",message:""}:W.lost?R={kind:"lost",message:"WebGL context lost — auto-restoring."}:W.error?R={kind:"error",message:W.error}:R={kind:"booting",message:""},d(R),s.setStatus(R)}try{const W=sT(e.current,s,k);i.current=W}catch(W){const R={kind:"error",message:String(W&&W.message||W)};d(R),s.setStatus(R)}return()=>{if(F=!0,i.current){try{i.current.dispose()}catch{}i.current=null}}},[s]);const _e=Lg.includes(S)?S:"high",de=tr[S]||tr.high,z=zh[D]||zh[0],Y=b&&h.kind!=="error";return Pe.jsxs("div",{ref:r,className:"app"+(h.kind==="ready"?" ready":"")+(h.kind==="error"?" error-state":"")+(h.kind==="lost"?" lost-state":"")+(L?" capture-mode":"")+(m?" hud-focused":""),"data-status":h.kind,children:[Pe.jsx("canvas",{ref:e,"aria-label":"Schwarzschild black-hole raytracer"}),Pe.jsx("div",{className:"status-overlay"+(h.kind==="ready"?" hidden":"")+(h.kind==="error"?" error":"")+(h.kind==="lost"?" lost":""),role:"status",children:Pe.jsxs("div",{className:"status-inner",children:[h.kind==="booting"&&Pe.jsxs(Pe.Fragment,{children:[Pe.jsx("div",{className:"spinner","aria-hidden":"true"}),Pe.jsx("p",{children:"Initialising WebGL raytracer…"})]}),h.kind==="lost"&&Pe.jsx("p",{children:h.message}),h.kind==="error"&&Pe.jsxs("p",{children:["WebGL error: ",h.message]})]})}),Pe.jsx("button",{type:"button",className:"hud-fab"+(Y||L?" hidden":""),onClick:le,"aria-label":"Show HUD",title:"Show HUD (H)",children:"☰ HUD"}),Y&&Pe.jsxs("aside",{className:"hud"+(l?" collapsed":""),role:"region","aria-label":"Raytracer HUD",children:[Pe.jsxs("header",{className:"hud-header",children:[Pe.jsx("button",{type:"button",className:"hud-toggle",onClick:()=>c(F=>!F),"aria-expanded":!l,"aria-label":l?"Expand HUD":"Collapse HUD",title:l?"Expand HUD":"Collapse HUD",children:l?"☰":"×"}),Pe.jsx("h1",{className:"hud-title",children:"GARGANTUA"}),Pe.jsxs("span",{className:"hud-status",children:[Pe.jsx("span",{className:"status-dot "+h.kind}),Pe.jsxs("span",{className:"hud-status-line",children:[S," · debug ",D," · ",y?"playing":"paused"," · t = ",d_(P)," s"]})]})]}),!l&&Pe.jsxs("div",{className:"hud-body",children:[Pe.jsxs("section",{className:"hud-section",children:[Pe.jsx("h2",{children:"Presets"}),Pe.jsx("div",{className:"preset-row",children:_i.map((F,k)=>Pe.jsx(ST,{index:k,active:A===k,label:O[k]||`preset ${k+1}`,onActivate:I},k))})]}),Pe.jsxs("section",{className:"hud-section",children:[Pe.jsx("h2",{children:"Quality"}),Pe.jsx("div",{className:"quality-row",children:Lg.map(F=>Pe.jsx(MT,{level:F,active:_e===F,onActivate:te},F))}),Pe.jsxs("div",{className:"quality-budget",children:["scale ",de.scale.toFixed(2)," ·"," ","steps ",de.maxSteps," ·"," ","crossings ",de.maxCrossings," ·"," ","bloom taps ",de.bloomTaps]})]}),Pe.jsxs("section",{className:"hud-section",children:[Pe.jsx("h2",{children:"Playback"}),Pe.jsxs("div",{className:"playback-row",children:[Pe.jsx("button",{type:"button",className:"play-btn"+(y?" playing":""),onClick:V,"aria-pressed":y,disabled:L,children:L?"frozen":y?"pause movie":"play movie"}),Pe.jsx("button",{type:"button",className:"reset-btn",onClick:$,title:"Reset all parameters to defaults",children:"reset all"})]})]}),Pe.jsxs("section",{className:"hud-section",children:[Pe.jsx("h2",{children:"Debug view"}),Pe.jsx("div",{className:"debug-grid",children:zh.map((F,k)=>Pe.jsx(ET,{value:k,label:F,active:D===k,onActivate:U},k))}),Pe.jsxs("div",{className:"debug-current",children:["current: ",D," — ",z]})]}),Pe.jsxs("section",{className:"hud-section",children:[Pe.jsx("h2",{children:"Parameters"}),Pe.jsx("div",{className:"param-list",children:q.map(F=>Pe.jsx(TT,{name:F,value:v[F],meta:H[F],onChange:C},F))})]}),Pe.jsxs("section",{className:"hud-section",children:[Pe.jsx("h2",{children:"Keys"}),Pe.jsxs("ul",{className:"keys-list",children:[Pe.jsxs("li",{children:[Pe.jsx("kbd",{children:"Space"})," toggle movie"]}),Pe.jsxs("li",{children:[Pe.jsx("kbd",{children:"H"})," toggle HUD"]}),Pe.jsxs("li",{children:[Pe.jsx("kbd",{children:"R"})," reset all"]}),Pe.jsxs("li",{children:[Pe.jsx("kbd",{children:"Q"})," cycle quality"]}),Pe.jsxs("li",{children:[Pe.jsx("kbd",{children:"Shift+1..4"})," preset"]}),Pe.jsxs("li",{children:[Pe.jsx("kbd",{children:"0..9"})," debug view"]})]})]}),Pe.jsx("footer",{className:"hud-footer",children:Pe.jsx("span",{className:"hud-credit",children:"Local Three.js · Schwarzschild null geodesic"})})]})]})]})}function Ng(){const s=(typeof window<"u"?window.location.search:"")||"",e=bT(s),i=document.getElementById("root");if(!i){document.documentElement.dataset.gargantuaReady="false",typeof window<"u"&&Object.defineProperty(window,"__GARGANTUA__",{value:Object.freeze({get ready(){return!1},getState(){return null},setQuality(){return null},setPreset(){return null},setDebug(){return null},setTime(){return null}}),writable:!1,configurable:!1,enumerable:!0});return}let r=!1;const l={get ready(){return r},getState(){return e.getState()},setQuality(h){return Object.prototype.hasOwnProperty.call(tr,h)?(e.setQuality(h),e.getState()):null},setPreset(h){return!Number.isInteger(h)||h<0||h>=_i.length?null:(e.setPreset(h),e.getState())},setDebug(h){return!Number.isInteger(h)||h<0||h>9?null:(e.setDebug(h),e.getState())},setTime(h){return typeof h!="number"||!Number.isFinite(h)||h<0?null:(e.setTime(h),e.getState())}};Object.freeze(l),typeof window<"u"&&!window.__GARGANTUA__&&Object.defineProperty(window,"__GARGANTUA__",{value:l,writable:!1,configurable:!1,enumerable:!0});function c(h){const d=!!(h&&h.status&&h.status.kind==="ready");d!==r&&(r=d,document.documentElement.dataset.gargantuaReady=d?"true":"false")}e.subscribe(c),c(e.getState()),e.setStatus({kind:"booting",message:""}),document.documentElement.dataset.gargantuaReady="false",Rb.createRoot(i).render(Pe.jsx(Kt.StrictMode,{children:Pe.jsx(AT,{store:e})}))}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ng,{once:!0}):Ng());
