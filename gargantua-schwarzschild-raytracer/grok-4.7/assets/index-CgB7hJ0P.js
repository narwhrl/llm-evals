(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function s(u){if(u.ep)return;u.ep=!0;const f=i(u);fetch(u.href,f)}})();var gd={exports:{}},cl={};var uv;function XM(){if(uv)return cl;uv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,u,f){var h=null;if(f!==void 0&&(h=""+f),u.key!==void 0&&(h=""+u.key),"key"in u){f={};for(var d in u)d!=="key"&&(f[d]=u[d])}else f=u;return u=f.ref,{$$typeof:o,type:s,key:h,ref:u!==void 0?u:null,props:f}}return cl.Fragment=e,cl.jsx=i,cl.jsxs=i,cl}var cv;function qM(){return cv||(cv=1,gd.exports=XM()),gd.exports}var ue=qM(),_d={exports:{}},fl={},vd={exports:{}},Sd={};var fv;function WM(){return fv||(fv=1,(function(o){function e(q,X){var ft=q.length;q.push(X);t:for(;0<ft;){var ot=ft-1>>>1,dt=q[ot];if(0<u(dt,X))q[ot]=X,q[ft]=dt,ft=ot;else break t}}function i(q){return q.length===0?null:q[0]}function s(q){if(q.length===0)return null;var X=q[0],ft=q.pop();if(ft!==X){q[0]=ft;t:for(var ot=0,dt=q.length,Mt=dt>>>1;ot<Mt;){var Qt=2*(ot+1)-1,Yt=q[Qt],z=Qt+1,mt=q[z];if(0>u(Yt,ft))z<dt&&0>u(mt,Yt)?(q[ot]=mt,q[z]=ft,ot=z):(q[ot]=Yt,q[Qt]=ft,ot=Qt);else if(z<dt&&0>u(mt,ft))q[ot]=mt,q[z]=ft,ot=z;else break t}}return X}function u(q,X){var ft=q.sortIndex-X.sortIndex;return ft!==0?ft:q.id-X.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var p=[],m=[],S=1,_=null,v=3,E=!1,R=!1,D=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,K=typeof setImmediate<"u"?setImmediate:null;function C(q){for(var X=i(m);X!==null;){if(X.callback===null)s(m);else if(X.startTime<=q)s(m),X.sortIndex=X.expirationTime,e(p,X);else break;X=i(m)}}function U(q){if(D=!1,C(q),!R)if(i(p)!==null)R=!0,N||(N=!0,et());else{var X=i(m);X!==null&&$(U,X.startTime-q)}}var N=!1,P=-1,T=5,L=-1;function V(){return M?!0:!(o.unstable_now()-L<T)}function W(){if(M=!1,N){var q=o.unstable_now();L=q;var X=!0;try{t:{R=!1,D&&(D=!1,I(P),P=-1),E=!0;var ft=v;try{e:{for(C(q),_=i(p);_!==null&&!(_.expirationTime>q&&V());){var ot=_.callback;if(typeof ot=="function"){_.callback=null,v=_.priorityLevel;var dt=ot(_.expirationTime<=q);if(q=o.unstable_now(),typeof dt=="function"){_.callback=dt,C(q),X=!0;break e}_===i(p)&&s(p),C(q)}else s(p);_=i(p)}if(_!==null)X=!0;else{var Mt=i(m);Mt!==null&&$(U,Mt.startTime-q),X=!1}}break t}finally{_=null,v=ft,E=!1}X=void 0}}finally{X?et():N=!1}}}var et;if(typeof K=="function")et=function(){K(W)};else if(typeof MessageChannel<"u"){var ct=new MessageChannel,J=ct.port2;ct.port1.onmessage=W,et=function(){J.postMessage(null)}}else et=function(){x(W,0)};function $(q,X){P=x(function(){q(o.unstable_now())},X)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(q){q.callback=null},o.unstable_forceFrameRate=function(q){0>q||125<q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<q?Math.floor(1e3/q):5},o.unstable_getCurrentPriorityLevel=function(){return v},o.unstable_next=function(q){switch(v){case 1:case 2:case 3:var X=3;break;default:X=v}var ft=v;v=X;try{return q()}finally{v=ft}},o.unstable_requestPaint=function(){M=!0},o.unstable_runWithPriority=function(q,X){switch(q){case 1:case 2:case 3:case 4:case 5:break;default:q=3}var ft=v;v=q;try{return X()}finally{v=ft}},o.unstable_scheduleCallback=function(q,X,ft){var ot=o.unstable_now();switch(typeof ft=="object"&&ft!==null?(ft=ft.delay,ft=typeof ft=="number"&&0<ft?ot+ft:ot):ft=ot,q){case 1:var dt=-1;break;case 2:dt=250;break;case 5:dt=1073741823;break;case 4:dt=1e4;break;default:dt=5e3}return dt=ft+dt,q={id:S++,callback:X,priorityLevel:q,startTime:ft,expirationTime:dt,sortIndex:-1},ft>ot?(q.sortIndex=ft,e(m,q),i(p)===null&&q===i(m)&&(D?(I(P),P=-1):D=!0,$(U,ft-ot))):(q.sortIndex=dt,e(p,q),R||E||(R=!0,N||(N=!0,et()))),q},o.unstable_shouldYield=V,o.unstable_wrapCallback=function(q){var X=v;return function(){var ft=v;v=X;try{return q.apply(this,arguments)}finally{v=ft}}}})(Sd)),Sd}var hv;function YM(){return hv||(hv=1,vd.exports=WM()),vd.exports}var xd={exports:{}},oe={};var dv;function ZM(){if(dv)return oe;dv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.for("react.view_transition"),E=Symbol.iterator;function R(z){return z===null||typeof z!="object"?null:(z=E&&z[E]||z["@@iterator"],typeof z=="function"?z:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,x={};function I(z,mt,At){this.props=z,this.context=mt,this.refs=x,this.updater=At||D}I.prototype.isReactComponent={},I.prototype.setState=function(z,mt){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,mt,"setState")},I.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function K(){}K.prototype=I.prototype;function C(z,mt,At){this.props=z,this.context=mt,this.refs=x,this.updater=At||D}var U=C.prototype=new K;U.constructor=C,M(U,I.prototype),U.isPureReactComponent=!0;var N=Array.isArray;function P(){}var T={H:null,A:null,T:null,S:null},L=Object.prototype.hasOwnProperty;function V(z,mt,At){var Y=At.ref;return{$$typeof:o,type:z,key:mt,ref:Y!==void 0?Y:null,props:At}}function W(z,mt){return V(z.type,mt,z.props)}function et(z){return typeof z=="object"&&z!==null&&z.$$typeof===o}function ct(z){var mt={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(At){return mt[At]})}var J=/\/+/g;function $(z,mt){return typeof z=="object"&&z!==null&&z.key!=null?ct(""+z.key):mt.toString(36)}function q(z){switch(z.status){case"fulfilled":return z.value;case"rejected":throw z.reason;default:switch(typeof z.status=="string"?z.then(P,P):(z.status="pending",z.then(function(mt){z.status==="pending"&&(z.status="fulfilled",z.value=mt)},function(mt){z.status==="pending"&&(z.status="rejected",z.reason=mt)})),z.status){case"fulfilled":return z.value;case"rejected":throw z.reason}}throw z}function X(z,mt,At,Y,ht){var Tt=typeof z;(Tt==="undefined"||Tt==="boolean")&&(z=null);var It=!1;if(z===null)It=!0;else switch(Tt){case"bigint":case"string":case"number":It=!0;break;case"object":switch(z.$$typeof){case o:case e:It=!0;break;case S:return It=z._init,X(It(z._payload),mt,At,Y,ht)}}if(It)return ht=ht(z),It=Y===""?"."+$(z,0):Y,N(ht)?(At="",It!=null&&(At=It.replace(J,"$&/")+"/"),X(ht,mt,At,"",function(Ge){return Ge})):ht!=null&&(et(ht)&&(ht=W(ht,At+(ht.key==null||z&&z.key===ht.key?"":(""+ht.key).replace(J,"$&/")+"/")+It)),mt.push(ht)),1;It=0;var _t=Y===""?".":Y+":";if(N(z))for(var Rt=0;Rt<z.length;Rt++)Y=z[Rt],Tt=_t+$(Y,Rt),It+=X(Y,mt,At,Tt,ht);else if(Rt=R(z),typeof Rt=="function")for(z=Rt.call(z),Rt=0;!(Y=z.next()).done;)Y=Y.value,Tt=_t+$(Y,Rt++),It+=X(Y,mt,At,Tt,ht);else if(Tt==="object"){if(typeof z.then=="function")return X(q(z),mt,At,Y,ht);throw mt=String(z),Error("Objects are not valid as a React child (found: "+(mt==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":mt)+"). If you meant to render a collection of children, use an array instead.")}return It}function ft(z,mt,At){if(z==null)return z;var Y=[],ht=0;return X(z,Y,"","",function(Tt){return mt.call(At,Tt,ht++)}),Y}function ot(z){if(z._status===-1){var mt=z._result,At=mt();At.then(function(Y){(z._status===0||z._status===-1)&&(z._status=1,z._result=Y,At.status===void 0&&(At.status="fulfilled",At.value=Y))},function(Y){(z._status===0||z._status===-1)&&(z._status=2,z._result=Y,At.status===void 0&&(At.status="rejected",At.reason=Y))}),z._status===-1&&(z._status=0,z._result=At)}if(z._status===1)return z._result.default;throw z._result}var dt=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var mt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z!==null&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(mt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)};function Mt(z){var mt=T.T,At={};At.types=mt!==null?mt.types:null,T.T=At;try{var Y=z(),ht=T.S;ht!==null&&ht(At,Y),typeof Y=="object"&&Y!==null&&typeof Y.then=="function"&&Y.then(P,dt)}catch(Tt){dt(Tt)}finally{mt!==null&&At.types!==null&&(mt.types=At.types),T.T=mt}}function Qt(z){var mt=T.T;if(mt!==null){var At=mt.types;At===null?mt.types=[z]:At.indexOf(z)===-1&&At.push(z)}else Mt(Qt.bind(null,z))}var Yt={map:ft,forEach:function(z,mt,At){ft(z,function(){mt.apply(this,arguments)},At)},count:function(z){var mt=0;return ft(z,function(){mt++}),mt},toArray:function(z){return ft(z,function(mt){return mt})||[]},only:function(z){if(!et(z))throw Error("React.Children.only expected to receive a single React element child.");return z}};return oe.Activity=_,oe.Children=Yt,oe.Component=I,oe.Fragment=i,oe.Profiler=u,oe.PureComponent=C,oe.StrictMode=s,oe.Suspense=p,oe.ViewTransition=v,oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,oe.__COMPILER_RUNTIME={__proto__:null,c:function(z){return T.H.useMemoCache(z)}},oe.addTransitionType=Qt,oe.cache=function(z){return function(){return z.apply(null,arguments)}},oe.cacheSignal=function(){return null},oe.cloneElement=function(z,mt,At){if(z==null)throw Error("The argument must be a React element, but you passed "+z+".");var Y=M({},z.props),ht=z.key;if(mt!=null)for(Tt in mt.key!==void 0&&(ht=""+mt.key),mt)!L.call(mt,Tt)||Tt==="key"||Tt==="__self"||Tt==="__source"||Tt==="ref"&&mt.ref===void 0||(Y[Tt]=mt[Tt]);var Tt=arguments.length-2;if(Tt===1)Y.children=At;else if(1<Tt){for(var It=Array(Tt),_t=0;_t<Tt;_t++)It[_t]=arguments[_t+2];Y.children=It}return V(z.type,ht,Y)},oe.createContext=function(z){return z={$$typeof:h,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null},z.Provider=z,z.Consumer={$$typeof:f,_context:z},z},oe.createElement=function(z,mt,At){var Y,ht={},Tt=null;if(mt!=null)for(Y in mt.key!==void 0&&(Tt=""+mt.key),mt)L.call(mt,Y)&&Y!=="key"&&Y!=="__self"&&Y!=="__source"&&(ht[Y]=mt[Y]);var It=arguments.length-2;if(It===1)ht.children=At;else if(1<It){for(var _t=Array(It),Rt=0;Rt<It;Rt++)_t[Rt]=arguments[Rt+2];ht.children=_t}if(z&&z.defaultProps)for(Y in It=z.defaultProps,It)ht[Y]===void 0&&(ht[Y]=It[Y]);return V(z,Tt,ht)},oe.createRef=function(){return{current:null}},oe.forwardRef=function(z){return{$$typeof:d,render:z}},oe.isValidElement=et,oe.lazy=function(z){return{$$typeof:S,_payload:{_status:-1,_result:z},_init:ot}},oe.memo=function(z,mt){return{$$typeof:m,type:z,compare:mt===void 0?null:mt}},oe.startTransition=Mt,oe.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},oe.use=function(z){return T.H.use(z)},oe.useActionState=function(z,mt,At){return T.H.useActionState(z,mt,At)},oe.useCallback=function(z,mt){return T.H.useCallback(z,mt)},oe.useContext=function(z){return T.H.useContext(z)},oe.useDebugValue=function(){},oe.useDeferredValue=function(z,mt){return T.H.useDeferredValue(z,mt)},oe.useEffect=function(z,mt){return T.H.useEffect(z,mt)},oe.useEffectEvent=function(z){return T.H.useEffectEvent(z)},oe.useId=function(){return T.H.useId()},oe.useImperativeHandle=function(z,mt,At){return T.H.useImperativeHandle(z,mt,At)},oe.useInsertionEffect=function(z,mt){return T.H.useInsertionEffect(z,mt)},oe.useLayoutEffect=function(z,mt){return T.H.useLayoutEffect(z,mt)},oe.useMemo=function(z,mt){return T.H.useMemo(z,mt)},oe.useOptimistic=function(z,mt){return T.H.useOptimistic(z,mt)},oe.useReducer=function(z,mt,At){return T.H.useReducer(z,mt,At)},oe.useRef=function(z){return T.H.useRef(z)},oe.useState=function(z){return T.H.useState(z)},oe.useSyncExternalStore=function(z,mt,At){return T.H.useSyncExternalStore(z,mt,At)},oe.useTransition=function(){return T.H.useTransition()},oe.version="19.3.0",oe}var pv;function kp(){return pv||(pv=1,xd.exports=ZM()),xd.exports}var yd={exports:{}},Ln={};var mv;function KM(){if(mv)return Ln;mv=1;var o=kp();function e(S){var _="https://react.dev/errors/"+S;if(1<arguments.length){_+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)_+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+S+"; visit "+_+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},u=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(S,_,v){var E=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:E==null?null:E===h?h:""+E,children:S,containerInfo:_,implementation:v}}var p=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(S,_){if(S==="font")return"";if(typeof _=="string")return _==="use-credentials"?_:""}return Ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Ln.browser=function(S){return{$$typeof:f,_reason:S}},Ln.createPortal=function(S,_){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!_||_.nodeType!==1&&_.nodeType!==9&&_.nodeType!==11)throw Error(e(299));return d(S,_,null,v)},Ln.flushSync=function(S){var _=p.T,v=s.p;try{if(p.T=null,s.p=2,S)return S()}finally{p.T=_,s.p=v,s.d.f()}},Ln.preconnect=function(S,_){typeof S=="string"&&(_?(_=_.crossOrigin,_=typeof _=="string"?_==="use-credentials"?_:"":void 0):_=null,s.d.C(S,_))},Ln.prefetchDNS=function(S){typeof S=="string"&&s.d.D(S)},Ln.preinit=function(S,_){if(typeof S=="string"&&_&&typeof _.as=="string"){var v=_.as,E=m(v,_.crossOrigin),R=typeof _.integrity=="string"?_.integrity:void 0,D=typeof _.fetchPriority=="string"?_.fetchPriority:void 0;v==="style"?s.d.S(S,typeof _.precedence=="string"?_.precedence:void 0,{crossOrigin:E,integrity:R,fetchPriority:D}):v==="script"&&s.d.X(S,{crossOrigin:E,integrity:R,fetchPriority:D,nonce:typeof _.nonce=="string"?_.nonce:void 0})}},Ln.preinitModule=function(S,_){if(typeof S=="string")if(typeof _=="object"&&_!==null){if(_.as==null||_.as==="script"){var v=m(_.as,_.crossOrigin);s.d.M(S,{crossOrigin:v,integrity:typeof _.integrity=="string"?_.integrity:void 0,nonce:typeof _.nonce=="string"?_.nonce:void 0,fetchPriority:typeof _.fetchPriority=="string"?_.fetchPriority:void 0})}}else _==null&&s.d.M(S)},Ln.preload=function(S,_){if(typeof S=="string"&&typeof _=="object"&&_!==null&&typeof _.as=="string"){var v=_.as,E=m(v,_.crossOrigin);s.d.L(S,v,{crossOrigin:E,integrity:typeof _.integrity=="string"?_.integrity:void 0,nonce:typeof _.nonce=="string"?_.nonce:void 0,type:typeof _.type=="string"?_.type:void 0,fetchPriority:typeof _.fetchPriority=="string"?_.fetchPriority:void 0,referrerPolicy:typeof _.referrerPolicy=="string"?_.referrerPolicy:void 0,imageSrcSet:typeof _.imageSrcSet=="string"?_.imageSrcSet:void 0,imageSizes:typeof _.imageSizes=="string"?_.imageSizes:void 0,media:typeof _.media=="string"?_.media:void 0})}},Ln.preloadModule=function(S,_){if(typeof S=="string")if(_){var v=m(_.as,_.crossOrigin);s.d.m(S,{as:typeof _.as=="string"&&_.as!=="script"?_.as:void 0,crossOrigin:v,integrity:typeof _.integrity=="string"?_.integrity:void 0,nonce:typeof _.nonce=="string"?_.nonce:void 0,fetchPriority:typeof _.fetchPriority=="string"?_.fetchPriority:void 0})}else s.d.m(S)},Ln.requestFormReset=function(S){s.d.r(S)},Ln.unstable_batchedUpdates=function(S,_){return S(_)},Ln.useFormState=function(S,_,v){return p.H.useFormState(S,_,v)},Ln.useFormStatus=function(){return p.H.useHostTransitionStatus()},Ln.version="19.3.0",Ln}var gv;function QM(){if(gv)return yd.exports;gv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),yd.exports=KM(),yd.exports}var _v;function JM(){if(_v)return fl;_v=1;var o=YM(),e=kp(),i=QM();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var l=a.return;if(l===null)break;var c=l.alternate;if(c===null){if(r=l.return,r!==null){a=r;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===a)return p(l),t;if(c===r)return p(l),n;c=c.sibling}throw Error(s(188))}if(a.return!==r.return)a=l,r=c;else{for(var g=!1,A=l.child;A;){if(A===a){g=!0,a=l,r=c;break}if(A===r){g=!0,r=l,a=c;break}A=A.sibling}if(!g){for(A=c.child;A;){if(A===a){g=!0,a=c,r=l;break}if(A===r){g=!0,r=c,a=l;break}A=A.sibling}if(!g)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function S(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=S(t),n!==null)return n;t=t.sibling}return null}function _(t,n,a,r,l,c){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,r,l,c)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&_(t.child,n,a,r,l,c))return!0;t=t.sibling}return!1}function v(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function E(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function R(t){var n=[null,null],a=v(t);return a===null||D(n,t,a.child,{foundSelf:!1}),n}function D(t,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&D(t,n,a.child,r))return!0;a=a.sibling}return!1}function M(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(s(559))}}var x=null,I=null;function K(t,n,a){return t===a?!0:t===n?(x=t,!0):!1}function C(t,n,a){return t===a?(I=t,!1):t===n?(I!==null&&(x=t),!0):!1}function U(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function N(t,n,a){for(var r=0,l=t;l;l=a(l))r++;l=0;for(var c=n;c;c=a(c))l++;for(;0<r-l;)t=a(t),r--;for(;0<l-r;)n=a(n),l--;for(;r--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var P=Object.assign,T=Symbol.for("react.element"),L=Symbol.for("react.transitional.element"),V=Symbol.for("react.portal"),W=Symbol.for("react.fragment"),et=Symbol.for("react.strict_mode"),ct=Symbol.for("react.profiler"),J=Symbol.for("react.consumer"),$=Symbol.for("react.context"),q=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),ft=Symbol.for("react.suspense_list"),ot=Symbol.for("react.memo"),dt=Symbol.for("react.lazy"),Mt=Symbol.for("react.activity"),Qt=Symbol.for("react.legacy_hidden"),Yt=Symbol.for("react.memo_cache_sentinel"),z=Symbol.for("react.view_transition"),mt=Symbol.for("react.recoverable"),At=Symbol.iterator;function Y(t){return t===null||typeof t!="object"?null:(t=At&&t[At]||t["@@iterator"],typeof t=="function"?t:null)}var ht=Symbol.for("react.client.reference");function Tt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ht?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case W:return"Fragment";case ct:return"Profiler";case et:return"StrictMode";case X:return"Suspense";case ft:return"SuspenseList";case Mt:return"Activity";case z:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case V:return"Portal";case $:return t.displayName||"Context";case J:return(t._context.displayName||"Context")+".Consumer";case q:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ot:return n=t.displayName||null,n!==null?n:Tt(t.type)||"Memo";case dt:n=t._payload,t=t._init;try{return Tt(t(n))}catch{}}return null}var It=Array.isArray,_t=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Rt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ge={pending:!1,data:null,method:null,action:null},me=[],_e=-1;function Me(t){return{current:t}}function te(t){0>_e||(t.current=me[_e],me[_e]=null,_e--)}function ne(t,n){_e++,me[_e]=t.current,t.current=n}var Ve=Me(null),hn=Me(null),Oe=Me(null),tn=Me(null);function G(t,n){switch(ne(Oe,n),ne(hn,t),ne(Ve,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?v_(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=v_(n),t=S_(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}te(Ve),ne(Ve,t)}function nn(){te(Ve),te(hn),te(Oe)}function Le(t){var n=t.memoizedState;n!==null&&(Hr._currentValue=n.memoizedState,ne(tn,t)),n=Ve.current;var a=S_(n,t.type);n!==a&&(ne(hn,t),ne(Ve,a))}function w(t){hn.current===t&&(te(Ve),te(hn)),tn.current===t&&(te(tn),Hr._currentValue=Ge)}var y,j;function rt(t){if(y===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);y=n&&n[1]||"",j=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+y+t+j}var pt=!1;function bt(t,n){if(!t||pt)return"";pt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var St=function(){throw Error()};if(Object.defineProperty(St.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(St,[])}catch(Lt){var k=Lt}Reflect.construct(t,[],St)}else{try{St.call()}catch(Lt){k=Lt}St=!1;try{var at=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),St=!0,new t}finally{St&&(at!==void 0?Object.defineProperty(t.prototype,"props",at):delete t.prototype.props)}}}else{try{throw Error()}catch(Lt){k=Lt}(St=t())&&typeof St.catch=="function"&&St.catch(function(){})}}catch(Lt){if(Lt&&k&&typeof Lt.stack=="string")return[Lt.stack,k.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=r.DetermineComponentFrameRoot(),g=c[0],A=c[1];if(g&&A){var O=g.split(`
`),Q=A.split(`
`);for(l=r=0;r<O.length&&!O[r].includes("DetermineComponentFrameRoot");)r++;for(;l<Q.length&&!Q[l].includes("DetermineComponentFrameRoot");)l++;if(r===O.length||l===Q.length)for(r=O.length-1,l=Q.length-1;1<=r&&0<=l&&O[r]!==Q[l];)l--;for(;1<=r&&0<=l;r--,l--)if(O[r]!==Q[l]){if(r!==1||l!==1)do if(r--,l--,0>l||O[r]!==Q[l]){var lt=`
`+O[r].replace(" at new "," at ");return t.displayName&&lt.includes("<anonymous>")&&(lt=lt.replace("<anonymous>",t.displayName)),lt}while(1<=r&&0<=l);break}}}finally{pt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?rt(a):""}function Dt(t,n){switch(t.tag){case 26:case 27:case 5:return rt(t.type);case 16:return rt("Lazy");case 13:return t.child!==n&&n!==null?rt("Suspense Fallback"):rt("Suspense");case 19:return rt("SuspenseList");case 0:case 15:return bt(t.type,!1);case 11:return bt(t.type.render,!1);case 1:return bt(t.type,!0);case 31:return rt("Activity");case 30:return rt("ViewTransition");default:return""}}function gt(t){try{var n="",a=null;do n+=Dt(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var yt=Object.prototype.hasOwnProperty,wt=o.unstable_scheduleCallback,jt=o.unstable_cancelCallback,Pt=o.unstable_shouldYield,Ot=o.unstable_requestPaint,Vt=o.unstable_now,ee=o.unstable_getCurrentPriorityLevel,le=o.unstable_ImmediatePriority,H=o.unstable_UserBlockingPriority,Ct=o.unstable_NormalPriority,xt=o.unstable_LowPriority,Ut=o.unstable_IdlePriority,Gt=o.log,Et=o.unstable_setDisableYieldValue,Jt=null,Ht=null;function we(t){if(typeof Gt=="function"&&Et(t),Ht&&typeof Ht.setStrictMode=="function")try{Ht.setStrictMode(Jt,t)}catch{}}var ce=Math.clz32?Math.clz32:Xc,$n=Math.log,di=Math.LN2;function Xc(t){return t>>>=0,t===0?32:31-($n(t)/di|0)|0}var nr=256,ys=262144,Ba=4194304;function ha(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ms(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var l=0,c=t.suspendedLanes,g=t.pingedLanes;t=t.warmLanes;var A=r&134217727;return A!==0?(r=A&~c,r!==0?l=ha(r):(g&=A,g!==0?l=ha(g):a||(a=A&~t,a!==0&&(l=ha(a))))):(A=r&~c,A!==0?l=ha(A):g!==0?l=ha(g):a||(a=r&~t,a!==0&&(l=ha(a)))),l===0?0:n!==0&&n!==l&&(n&c)===0&&(c=l&-l,a=n&-n,c>=a||c===32&&(a&4194048)!==0)?n:l}function Fa(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function ki(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var r=31-ce(a),l=1<<r;n|=t[r],a&=~l}return n}function go(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _o(){var t=Ba;return Ba<<=1,(Ba&62914560)===0&&(Ba=4194304),t}function ir(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Xi(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Dl(t,n,a,r,l,c){var g=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var A=t.entanglements,O=t.expirationTimes,Q=t.hiddenUpdates;for(a=g&~a;0<a;){var lt=31-ce(a),St=1<<lt;A[lt]=0,O[lt]=-1;var k=Q[lt];if(k!==null)for(Q[lt]=null,lt=0;lt<k.length;lt++){var at=k[lt];at!==null&&(at.lane&=-536870913)}a&=~St}r!==0&&Es(t,r,0),c!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=c&~(g&~n))}function Es(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-ce(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function vo(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-ce(a),l=1<<r;l&n|t[r]&n&&(t[r]|=n),a&=~l}}function So(t,n){var a=n&-n;return a=(a&42)!==0?1:xo(a),(a&(t.suspendedLanes|n))!==0?0:a}function xo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function yo(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ul(){var t=Rt.p;return t!==0?t:(t=window.event,t===void 0?32:nv(t.type))}function Nl(t,n){var a=Rt.p;try{return Rt.p=t,n()}finally{Rt.p=a}}var pi=Math.random().toString(36).slice(2),b="__reactFiber$"+pi,B="__reactProps$"+pi,ut="__reactContainer$"+pi,nt="__reactEvents$"+pi,it="__reactListeners$"+pi,zt="__reactHandles$"+pi,kt="__reactResources$"+pi,Nt="__reactMarker$"+pi,Wt="__reactLoad$"+pi;function Zt(t){delete t[b],delete t[B],delete t[it],delete t[zt]}function ae(t){var n;if(n=t[b])return n;for(var a=t.parentNode;a;){if(n=a[ut]||a[b]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=I_(t);t!==null;){if(a=t[b])return a;t=I_(t)}return n}t=a,a=t.parentNode}return null}function fe(t){if(t=t[b]||t[ut]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Xt(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ee(t){var n=t[kt];return n||(n=t[kt]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function ve(t){t[Nt]=!0}function Ze(t){t[Wt]=void 0}var Be=new Set,vn={};function Bt(t,n){sn(t,n),sn(t+"Capture",n)}function sn(t,n){for(vn[t]=n,t=0;t<n.length;t++)Be.add(n[t])}var De=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Bn={},ti={};function qi(t){return yt.call(ti,t)?!0:yt.call(Bn,t)?!1:De.test(t)?ti[t]=!0:(Bn[t]=!0,!1)}var Se=!1;function Ie(){var t=Se;return Se=!1,t}function Je(t,n,a){if(qi(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function ei(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function Ae(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,r)}}function rn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function da(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ll(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var l=r.get,c=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return l.call(this)},set:function(g){a=""+g,c.call(this,g)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function qc(t){if(!t._valueTracker){var n=da(t)?"checked":"value";t._valueTracker=Ll(t,n,""+t[n])}}function rm(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=da(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}var fx=/[\n"\\]/g;function mi(t){return t.replace(fx,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Wc(t,n,a,r,l,c,g,A){t.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.type=g:t.removeAttribute("type"),n!=null?g==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+rn(n)):t.value!==""+rn(n)&&(t.value=""+rn(n)):g!=="submit"&&g!=="reset"||t.removeAttribute("value"),n!=null?g==="number"&&t.value==n?Yc(t,rn(t.value)):Yc(t,rn(n)):a!=null?Yc(t,rn(a)):r!=null&&t.removeAttribute("value"),l==null&&c!=null&&(t.defaultChecked=!!c),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?t.name=""+rn(A):t.removeAttribute("name")}function om(t,n,a,r,l,c,g,A){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),n!=null||a!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){qc(t);return}a=a!=null?""+rn(a):"",n=n!=null?""+rn(n):a,A||n===t.value||(t.value=n),t.defaultValue=n}r=r??l,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=A?t.checked:!!r,t.defaultChecked=!!r,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.name=g),qc(t)}function Yc(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function ar(t,n,a,r){if(t=t.options,n){n={};for(var l=0;l<a.length;l++)n["$"+a[l]]=!0;for(a=0;a<t.length;a++)l=n.hasOwnProperty("$"+t[a].value),t[a].selected!==l&&(t[a].selected=l),l&&r&&(t[a].defaultSelected=!0)}else{for(a=""+rn(a),n=null,l=0;l<t.length;l++){if(t[l].value===a){t[l].selected=!0,r&&(t[l].defaultSelected=!0);return}n!==null||t[l].disabled||(n=t[l])}n!==null&&(n.selected=!0)}}function lm(t,n,a){if(n!=null&&(n=""+rn(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+rn(a):""}function um(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(It(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=rn(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),qc(t)}function sr(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var hx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function cm(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||hx.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function fm(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="",Se=!0);for(var l in n)r=n[l],n.hasOwnProperty(l)&&a[l]!==r&&(cm(t,l,r),Se=!0)}else for(var c in n)n.hasOwnProperty(c)&&cm(t,c,n[c])}function Zc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),px=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ol(t){return px.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Wi(){}var Kc=null;function Qc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var rr=null,or=null;function hm(t){var n=fe(t);if(n&&(t=n.stateNode)){var a=t[B]||null;t:switch(t=n.stateNode,n.type){case"input":if(Wc(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+mi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var l=r[B]||null;if(!l)throw Error(s(90));Wc(r,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&rm(r)}break t;case"textarea":lm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&ar(t,!!a.multiple,n,!1)}}}var Jc=!1;function dm(t,n,a){if(Jc)return t(n,a);Jc=!0;try{var r=t(n);return r}finally{if(Jc=!1,(rr!==null||or!==null)&&(Ou(),rr&&(n=rr,t=or,or=rr=null,hm(n),t)))for(n=0;n<t.length;n++)hm(t[n])}}function Mo(t,n){var a=t.stateNode;if(a===null)return null;var r=a[B]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var pa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),jc=!1;if(pa)try{var Eo={};Object.defineProperty(Eo,"passive",{get:function(){jc=!0}}),window.addEventListener("test",Eo,Eo),window.removeEventListener("test",Eo,Eo)}catch{jc=!1}var Ha=null,$c=null,Pl=null;function pm(){if(Pl)return Pl;var t,n=$c,a=n.length,r,l="value"in Ha?Ha.value:Ha.textContent,c=l.length;for(t=0;t<a&&n[t]===l[t];t++);var g=a-t;for(r=1;r<=g&&n[a-r]===l[c-r];r++);return Pl=l.slice(t,1<r?1-r:void 0)}function Il(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function zl(){return!0}function mm(){return!1}function Fn(t){function n(a,r,l,c,g){this._reactName=a,this._targetInst=l,this.type=r,this.nativeEvent=c,this.target=g,this.currentTarget=null;for(var A in t)t.hasOwnProperty(A)&&(a=t[A],this[A]=a?a(c):c[A]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?zl:mm,this.isPropagationStopped=mm,this}return P(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=zl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=zl)},persist:function(){},isPersistent:zl}),n}var Ga={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bl=Fn(Ga),To=P({},Ga,{view:0,detail:0}),mx=Fn(To),tf,ef,bo,Fl=P({},To,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:af,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==bo&&(bo&&t.type==="mousemove"?(tf=t.screenX-bo.screenX,ef=t.screenY-bo.screenY):ef=tf=0,bo=t),tf)},movementY:function(t){return"movementY"in t?t.movementY:ef}}),gm=Fn(Fl),gx=P({},Fl,{dataTransfer:0}),_x=Fn(gx),vx=P({},To,{relatedTarget:0}),nf=Fn(vx),Sx=P({},Ga,{animationName:0,elapsedTime:0,pseudoElement:0}),xx=Fn(Sx),yx=P({},Ga,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Mx=Fn(yx),Ex=P({},Ga,{data:0}),_m=Fn(Ex),Tx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},bx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ax={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rx(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Ax[t])?!!n[t]:!1}function af(){return Rx}var Cx=P({},To,{key:function(t){if(t.key){var n=Tx[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Il(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?bx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:af,charCode:function(t){return t.type==="keypress"?Il(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Il(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),wx=Fn(Cx),Dx=P({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vm=Fn(Dx),Ux=P({},Ga,{submitter:0}),Nx=Fn(Ux),Lx=P({},To,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:af}),Ox=Fn(Lx),Px=P({},Ga,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ix=Fn(Px),zx=P({},Fl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Bx=Fn(zx),Fx=P({},Ga,{newState:0,oldState:0,source:0}),Hx=Fn(Fx),Gx=[9,13,27,32],sf=pa&&"CompositionEvent"in window,Ao=null;pa&&"documentMode"in document&&(Ao=document.documentMode);var Vx=pa&&"TextEvent"in window&&!Ao,Sm=pa&&(!sf||Ao&&8<Ao&&11>=Ao),xm=" ",ym=!1;function Mm(t,n){switch(t){case"keyup":return Gx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Em(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var lr=!1;function kx(t,n){switch(t){case"compositionend":return Em(n);case"keypress":return n.which!==32?null:(ym=!0,xm);case"textInput":return t=n.data,t===xm&&ym?null:t;default:return null}}function Xx(t,n){if(lr)return t==="compositionend"||!sf&&Mm(t,n)?(t=pm(),Pl=$c=Ha=null,lr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Sm&&n.locale!=="ko"?null:n.data;default:return null}}var qx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!qx[t.type]:n==="textarea"}function bm(t,n,a,r){rr?or?or.push(r):or=[r]:rr=r,n=Hu(n,"onChange"),0<n.length&&(a=new Bl("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Ro=null,Co=null;function Wx(t){h_(t,0)}function Hl(t){var n=Xt(t);if(rm(n))return t}function Am(t,n){if(t==="change")return n}var Rm=!1;if(pa){var rf;if(pa){var of="oninput"in document;if(!of){var Cm=document.createElement("div");Cm.setAttribute("oninput","return;"),of=typeof Cm.oninput=="function"}rf=of}else rf=!1;Rm=rf&&(!document.documentMode||9<document.documentMode)}function wm(){Ro&&(Ro.detachEvent("onpropertychange",Dm),Co=Ro=null)}function Dm(t){if(t.propertyName==="value"&&Hl(Co)){var n=[];bm(n,Co,t,Qc(t)),dm(Wx,n)}}function Yx(t,n,a){t==="focusin"?(wm(),Ro=n,Co=a,Ro.attachEvent("onpropertychange",Dm)):t==="focusout"&&wm()}function Zx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Hl(Co)}function Kx(t,n){if(t==="click")return Hl(n)}function Qx(t,n){if(t==="input"||t==="change")return Hl(n)}function Jx(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ni=typeof Object.is=="function"?Object.is:Jx;function wo(t,n){if(ni(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var l=a[r];if(!yt.call(n,l)||!ni(t[l],n[l]))return!1}return!0}function lf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Um(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Nm(t,n){var a=Um(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Um(a)}}function Lm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Lm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Om(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=lf(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=lf(t.document)}return n}function uf(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var jx=pa&&"documentMode"in document&&11>=document.documentMode,ur=null,cf=null,Do=null,ff=!1;function Pm(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ff||ur==null||ur!==lf(r)||(r=ur,"selectionStart"in r&&uf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Do&&wo(Do,r)||(Do=r,r=Hu(cf,"onSelect"),0<r.length&&(n=new Bl("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=ur)))}function Ts(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var cr={animationend:Ts("Animation","AnimationEnd"),animationiteration:Ts("Animation","AnimationIteration"),animationstart:Ts("Animation","AnimationStart"),transitionrun:Ts("Transition","TransitionRun"),transitionstart:Ts("Transition","TransitionStart"),transitioncancel:Ts("Transition","TransitionCancel"),transitionend:Ts("Transition","TransitionEnd")},hf={},Im={};pa&&(Im=document.createElement("div").style,"AnimationEvent"in window||(delete cr.animationend.animation,delete cr.animationiteration.animation,delete cr.animationstart.animation),"TransitionEvent"in window||delete cr.transitionend.transition);function bs(t){if(hf[t])return hf[t];if(!cr[t])return t;var n=cr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Im)return hf[t]=n[a];return t}var zm=bs("animationend"),Bm=bs("animationiteration"),Fm=bs("animationstart"),$x=bs("transitionrun"),ty=bs("transitionstart"),ey=bs("transitioncancel"),Hm=bs("transitionend"),Gm=new Map,df="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");df.push("scrollEnd");function Di(t,n){Gm.set(t,n),Bt(n,[t])}var ny=0;function ma(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Oi.identifierPrefix;var a=ny++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Vm(t){if(t==null||typeof t=="string")return t;var n=null,a=Dr;if(a!==null)for(var r=0;r<a.length;r++){var l=t[a[r]];if(l!=null){if(l==="none")return"none";n=n==null?l:n+(" "+l)}}return n??t.default}function ga(t,n){return t=Vm(t),n=Vm(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Gl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},gi=[],fr=0,pf=0;function Vl(){for(var t=fr,n=pf=fr=0;n<t;){var a=gi[n];gi[n++]=null;var r=gi[n];gi[n++]=null;var l=gi[n];gi[n++]=null;var c=gi[n];if(gi[n++]=null,r!==null&&l!==null){var g=r.pending;g===null?l.next=l:(l.next=g.next,g.next=l),r.pending=l}c!==0&&km(a,l,c)}}function kl(t,n,a,r){gi[fr++]=t,gi[fr++]=n,gi[fr++]=a,gi[fr++]=r,pf|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function mf(t,n,a,r){return kl(t,n,a,r),Xl(t)}function As(t,n){return kl(t,null,null,n),Xl(t)}function km(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var l=!1,c=t.return;c!==null;)c.childLanes|=a,r=c.alternate,r!==null&&(r.childLanes|=a),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(l=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,l&&n!==null&&(l=31-ce(a),t=c.hiddenUpdates,r=t[l],r===null?t[l]=[n]:r.push(n),n.lane=a|536870912),c):null}function Xl(t){if(50<jo)throw jo=0,Lu=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var hr={};function iy(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wn(t,n,a,r){return new iy(t,n,a,r)}function gf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function _a(t,n){var a=t.alternate;return a===null?(a=Wn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Xm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function ql(t,n,a,r,l,c){var g=0;if(r=t,typeof r=="function")gf(r)&&(g=1);else if(typeof r=="string")g=UM(t,a,Ve.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(r){case Mt:return t=Wn(31,a,n,l),t.elementType=Mt,t.lanes=c,t;case W:return Rs(a.children,l,c,n);case et:g=8,l|=24;break;case ct:return t=Wn(12,a,n,l|2),t.elementType=ct,t.lanes=c,t;case X:return t=Wn(13,a,n,l),t.elementType=X,t.lanes=c,t;case ft:return t=Wn(19,a,n,l),t.elementType=ft,t.lanes=c,t;case Qt:case z:return t=l|32,t=Wn(30,a,n,t),t.elementType=z,t.lanes=c,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case $:g=10;break t;case J:g=9;break t;case q:g=11;break t;case ot:g=14;break t;case dt:g=16,r=null;break t}g=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Wn(g,a,n,l),n.elementType=t,n.type=r,n.lanes=c,n}function Rs(t,n,a,r){return t=Wn(7,t,r,n),t.lanes=a,t}function _f(t,n,a){return t=Wn(6,t,null,n),t.lanes=a,t}function qm(t){var n=Wn(18,null,null,0);return n.stateNode=t,n}function vf(t,n,a){return n=Wn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Wm=new WeakMap;function _i(t,n){if(typeof t=="object"&&t!==null){var a=Wm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:gt(n)},Wm.set(t,n),n)}return{value:t,source:n,stack:gt(n)}}var dr=[],pr=0,Wl=null,Uo=0,vi=[],Si=0,Va=null,Yi=1,Zi="";function va(t,n){dr[pr++]=Uo,dr[pr++]=Wl,Wl=t,Uo=n}function Ym(t,n,a){vi[Si++]=Yi,vi[Si++]=Zi,vi[Si++]=Va,Va=t;var r=Yi;t=Zi;var l=32-ce(r)-1;r&=~(1<<l),a+=1;var c=32-ce(n)+l;if(30<c){var g=l-l%5;c=(r&(1<<g)-1).toString(32),r>>=g,l-=g,Yi=1<<32-ce(n)+l|a<<l|r,Zi=c+t}else Yi=1<<c|a<<l|r,Zi=t}function Yl(t){t.return!==null&&(va(t,1),Ym(t,1,0))}function Sf(t){for(;t===Wl;)Wl=dr[--pr],dr[pr]=null,Uo=dr[--pr],dr[pr]=null;for(;t===Va;)Va=vi[--Si],vi[Si]=null,Zi=vi[--Si],vi[Si]=null,Yi=vi[--Si],vi[Si]=null}function Zm(t,n){vi[Si++]=Yi,vi[Si++]=Zi,vi[Si++]=Va,Yi=n.id,Zi=n.overflow,Va=t}var En=null,je=null,xe=!1,ka=null,xi=!1,xf=Error(s(519));function Xa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw No(_i(n,t)),xf}function Km(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[b]=t,n[B]=r,a){case"dialog":be("cancel",n),be("close",n);break;case"iframe":case"object":case"embed":be("load",n);break;case"video":case"audio":for(a=0;a<tl.length;a++)be(tl[a],n);break;case"source":be("error",n);break;case"img":case"image":case"link":be("error",n),be("load",n);break;case"details":be("toggle",n);break;case"input":be("invalid",n),om(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":be("invalid",n);break;case"textarea":be("invalid",n),um(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||g_(n.textContent,a)?(r.popover!=null&&(be("beforetoggle",n),be("toggle",n)),r.onScroll!=null&&be("scroll",n),r.onScrollEnd!=null&&be("scrollend",n),r.onClick!=null&&(n.onclick=Wi),n=!0):n=!1,n||Xa(t,!0)}function Zl(t){for(En=t.return;En;)switch(En.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:En=En.return}}function mr(t){if(t!==En)return!1;if(!xe)return Zl(t),xe=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Qh(t.type,t.memoizedProps)),a=!a),a&&je&&Xa(t),Zl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));je=P_(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));je=P_(t)}else n===27?(n=je,rs(t.type)?(t=sd,sd=null,je=t):je=n):je=En?Mi(t.stateNode.nextSibling):null;return!0}function Cs(){je=En=null,xe=!1}function yf(){var t=ka;return t!==null&&(Kn===null?Kn=t:Kn.push.apply(Kn,t),ka=null),t}function No(t){ka===null?ka=[t]:ka.push(t)}var Mf=Me(null),ws=null,Sa=null;function qa(t,n,a){ne(Mf,n._currentValue),n._currentValue=a}function xa(t){t._currentValue=Mf.current,te(Mf)}function Kl(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function Ef(t,n,a,r){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var c=l.dependencies;if(c!==null){var g=l.child;c=c.firstContext;t:for(;c!==null;){var A=c;c=l;for(var O=0;O<n.length;O++)if(A.context===n[O]){c.lanes|=a,A=c.alternate,A!==null&&(A.lanes|=a),Kl(c.return,a,t),r||(g=null);break t}c=A.next}}else if(l.tag===18){if(g=l.return,g===null)throw Error(s(341));g.lanes|=a,c=g.alternate,c!==null&&(c.lanes|=a),Kl(g,a,t),g=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=a,g=l.alternate,g!==null&&(g.lanes|=a),Kl(l.return,a,t),g=l.child,g=g!==null?g.sibling:null):g=l.child;if(g!==null)g.return=l;else for(g=l;g!==null;){if(g===t){g=null;break}if(l=g.sibling,l!==null){l.return=g.return,g=l;break}g=g.return}l=g}}function Ds(t,n,a,r){t=null;for(var l=n,c=!1;l!==null;){if(!c){if((l.flags&524288)!==0)c=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var g=l.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var A=l.type;ni(l.pendingProps.value,g.value)||(t!==null?t.push(A):t=[A])}}else if(l===tn.current){if(g=l.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Hr):t=[Hr])}l=l.return}return t!==null&&Ef(n,t,a,r),n.flags|=262144,t!==null}function Ql(t){for(t=t.firstContext;t!==null;){if(!ni(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Us(t){ws=t,Sa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Cn(t){return Qm(ws,t)}function Jl(t,n){return ws===null&&Us(t),Qm(t,n)}function Qm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Sa===null){if(t===null)throw Error(s(308));Sa=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Sa=Sa.next=n;return a}var ay=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},sy=o.unstable_scheduleCallback,ry=o.unstable_NormalPriority,dn={$$typeof:$,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Tf(){return{controller:new ay,data:new Map,refCount:0}}function Lo(t){t.refCount--,t.refCount===0&&sy(ry,function(){t.controller.abort()})}function Jm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var r=n[t];a.indexOf(r)===-1&&a.push(r)}}}var Oo=null;function oy(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Po=null,bf=0,Ns=0,gr=null;function ly(t,n){if(Po===null){var a=Po=[];bf=0,Ns=Gh(),gr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return bf++,n.then(jm,jm),n}function jm(){if(--bf===0&&(Oo=null,Po!==null)){gr!==null&&(gr.status="fulfilled");var t=Po;Po=null,Ns=0,gr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function uy(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var l=0;l<a.length;l++)(0,a[l])(n)},function(l){for(r.status="rejected",r.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),r}var $m=_t.S;_t.S=function(t,n){if(qg=Vt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&ly(t,n),Oo!==null)for(var a=Or;a!==null;)Jm(a,Oo),a=a.next;if(a=t.types,a!==null){for(var r=Or;r!==null;)Jm(r,a),r=r.next;if(Ns!==0){r=Oo,r===null&&(r=Oo=[]);for(var l=0;l<a.length;l++){var c=a[l];r.indexOf(c)===-1&&r.push(c)}}}$m!==null&&$m(t,n)};var Ls=Me(null);function Af(){var t=Ls.current;return t!==null?t:Qe.pooledCache}function jl(t,n){n===null?ne(Ls,Ls.current):ne(Ls,n.pool)}function t0(){var t=Af();return t===null?null:{parent:dn._currentValue,pool:t}}var _r=Error(s(460)),Rf=Error(s(474)),$l=Error(s(542)),tu={then:function(){}};function e0(t){return t=t.status,t==="fulfilled"||t==="rejected"}function n0(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Wi,Wi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,a0(t),t===void 0&&!("reason"in n)?Error(s(600)):t;default:if(typeof n.status=="string")n.then(Wi,Wi);else{if(t=Qe,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var l=n;l.status="fulfilled",l.value=r}},function(r){if(n.status==="pending"){var l=n;l.status="rejected",l.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,a0(t),t}throw Ps=n,_r}}function Os(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ps=a,_r):a}}var Ps=null;function i0(){if(Ps===null)throw Error(s(459));var t=Ps;return Ps=null,t}function a0(t){if(t===_r||t===$l)throw Error(s(483))}var vr=null,Io=0;function eu(t){var n=Io;return Io+=1,vr===null&&(vr=[]),n0(vr,t,n)}function Wa(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function nu(t,n){throw n.$$typeof===T?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function s0(t){function n(Z,F){if(t){var tt=Z.deletions;tt===null?(Z.deletions=[F],Z.flags|=16):tt.push(F)}}function a(Z,F){if(!t)return null;for(;F!==null;)n(Z,F),F=F.sibling;return null}function r(Z){for(var F=new Map;Z!==null;)Z.key===null?F.set(Z.index,Z):F.set(Z.key,Z),Z=Z.sibling;return F}function l(Z,F){return Z=_a(Z,F),Z.index=0,Z.sibling=null,Z}function c(Z,F,tt){return Z.index=tt,t?(tt=Z.alternate,tt!==null?(tt=tt.index,tt<F?(Z.flags|=2,F):tt):(Z.flags|=134217730,F)):(Z.flags|=1048576,F)}function g(Z){return t&&Z.alternate===null&&(Z.flags|=134217730),Z}function A(Z,F,tt,vt){return F===null||F.tag!==6?(F=_f(tt,Z.mode,vt),F.return=Z,F):(F=l(F,tt),F.return=Z,F)}function O(Z,F,tt,vt){var qt=tt.type;return qt===W?(Z=lt(Z,F,tt.props.children,vt,tt.key),Wa(Z,tt),Z):F!==null&&(F.elementType===qt||typeof qt=="object"&&qt!==null&&qt.$$typeof===dt&&Os(qt)===F.type)?(F=l(F,tt.props),Wa(F,tt),F.return=Z,F):(F=ql(tt.type,tt.key,tt.props,null,Z.mode,vt),Wa(F,tt),F.return=Z,F)}function Q(Z,F,tt,vt){return F===null||F.tag!==4||F.stateNode.containerInfo!==tt.containerInfo||F.stateNode.implementation!==tt.implementation?(F=vf(tt,Z.mode,vt),F.return=Z,F):(F=l(F,tt.children||[]),F.return=Z,F)}function lt(Z,F,tt,vt,qt){return F===null||F.tag!==7?(F=Rs(tt,Z.mode,vt,qt),F.return=Z,F):(F=l(F,tt),F.return=Z,F)}function St(Z,F,tt){if(typeof F=="string"&&F!==""||typeof F=="number"||typeof F=="bigint")return F=_f(""+F,Z.mode,tt),F.return=Z,F;if(typeof F=="object"&&F!==null){switch(F.$$typeof){case L:return tt=ql(F.type,F.key,F.props,null,Z.mode,tt),Wa(tt,F),tt.return=Z,tt;case V:return F=vf(F,Z.mode,tt),F.return=Z,F;case dt:return F=Os(F),St(Z,F,tt)}if(It(F)||Y(F))return F=Rs(F,Z.mode,tt,null),F.return=Z,F;if(typeof F.then=="function")return St(Z,eu(F),tt);if(F.$$typeof===$)return St(Z,Jl(Z,F),tt);nu(Z,F)}return null}function k(Z,F,tt,vt){var qt=F!==null?F.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return qt!==null?null:A(Z,F,""+tt,vt);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case L:return tt.key===qt?O(Z,F,tt,vt):null;case V:return tt.key===qt?Q(Z,F,tt,vt):null;case dt:return tt=Os(tt),k(Z,F,tt,vt)}if(It(tt)||Y(tt))return qt!==null?null:lt(Z,F,tt,vt,null);if(typeof tt.then=="function")return k(Z,F,eu(tt),vt);if(tt.$$typeof===$)return k(Z,F,Jl(Z,tt),vt);nu(Z,tt)}return null}function at(Z,F,tt,vt,qt){if(typeof vt=="string"&&vt!==""||typeof vt=="number"||typeof vt=="bigint")return Z=Z.get(tt)||null,A(F,Z,""+vt,qt);if(typeof vt=="object"&&vt!==null){switch(vt.$$typeof){case L:return Z=Z.get(vt.key===null?tt:vt.key)||null,O(F,Z,vt,qt);case V:return Z=Z.get(vt.key===null?tt:vt.key)||null,Q(F,Z,vt,qt);case dt:return vt=Os(vt),at(Z,F,tt,vt,qt)}if(It(vt)||Y(vt))return Z=Z.get(tt)||null,lt(F,Z,vt,qt,null);if(typeof vt.then=="function")return at(Z,F,tt,eu(vt),qt);if(vt.$$typeof===$)return at(Z,F,tt,Jl(F,vt),qt);nu(F,vt)}return null}function Lt(Z,F,tt,vt){for(var qt=null,Ce=null,$t=F,ie=F=0,gn=null;$t!==null&&ie<tt.length;ie++){$t.index>ie?(gn=$t,$t=null):gn=$t.sibling;var Ne=k(Z,$t,tt[ie],vt);if(Ne===null){$t===null&&($t=gn);break}t&&$t&&Ne.alternate===null&&n(Z,$t),F=c(Ne,F,ie),Ce===null?qt=Ne:Ce.sibling=Ne,Ce=Ne,$t=gn}if(ie===tt.length)return a(Z,$t),xe&&va(Z,ie),qt;if($t===null){for(;ie<tt.length;ie++)$t=St(Z,tt[ie],vt),$t!==null&&(F=c($t,F,ie),Ce===null?qt=$t:Ce.sibling=$t,Ce=$t);return xe&&va(Z,ie),qt}for($t=r($t);ie<tt.length;ie++)gn=at($t,Z,ie,tt[ie],vt),gn!==null&&(t&&(Ne=gn.alternate,Ne!==null&&$t.delete(Ne.key===null?ie:Ne.key)),F=c(gn,F,ie),Ce===null?qt=gn:Ce.sibling=gn,Ce=gn);return t&&$t.forEach(function(fs){return n(Z,fs)}),xe&&va(Z,ie),qt}function Kt(Z,F,tt,vt){if(tt==null)throw Error(s(151));for(var qt=null,Ce=null,$t=F,ie=F=0,gn=null,Ne=tt.next();$t!==null&&!Ne.done;ie++,Ne=tt.next()){$t.index>ie?(gn=$t,$t=null):gn=$t.sibling;var fs=k(Z,$t,Ne.value,vt);if(fs===null){$t===null&&($t=gn);break}t&&$t&&fs.alternate===null&&n(Z,$t),F=c(fs,F,ie),Ce===null?qt=fs:Ce.sibling=fs,Ce=fs,$t=gn}if(Ne.done)return a(Z,$t),xe&&va(Z,ie),qt;if($t===null){for(;!Ne.done;ie++,Ne=tt.next())Ne=St(Z,Ne.value,vt),Ne!==null&&(F=c(Ne,F,ie),Ce===null?qt=Ne:Ce.sibling=Ne,Ce=Ne);return xe&&va(Z,ie),qt}for($t=r($t);!Ne.done;ie++,Ne=tt.next())Ne=at($t,Z,ie,Ne.value,vt),Ne!==null&&(t&&(gn=Ne.alternate,gn!==null&&$t.delete(gn.key===null?ie:gn.key)),F=c(Ne,F,ie),Ce===null?qt=Ne:Ce.sibling=Ne,Ce=Ne);return t&&$t.forEach(function(kM){return n(Z,kM)}),xe&&va(Z,ie),qt}function pe(Z,F,tt,vt){if(typeof tt=="object"&&tt!==null&&tt.type===W&&tt.key===null&&tt.props.ref===void 0&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case L:t:{for(var qt=tt.key;F!==null;){if(F.key===qt){if(qt=tt.type,qt===W){if(F.tag===7){a(Z,F.sibling),vt=l(F,tt.props.children),Wa(vt,tt),vt.return=Z,Z=vt;break t}}else if(F.elementType===qt||typeof qt=="object"&&qt!==null&&qt.$$typeof===dt&&Os(qt)===F.type){a(Z,F.sibling),vt=l(F,tt.props),Wa(vt,tt),vt.return=Z,Z=vt;break t}a(Z,F);break}else n(Z,F);F=F.sibling}tt.type===W?(vt=Rs(tt.props.children,Z.mode,vt,tt.key),Wa(vt,tt),vt.return=Z,Z=vt):(vt=ql(tt.type,tt.key,tt.props,null,Z.mode,vt),Wa(vt,tt),vt.return=Z,Z=vt)}return g(Z);case V:t:{for(qt=tt.key;F!==null;){if(F.key===qt)if(F.tag===4&&F.stateNode.containerInfo===tt.containerInfo&&F.stateNode.implementation===tt.implementation){a(Z,F.sibling),vt=l(F,tt.children||[]),vt.return=Z,Z=vt;break t}else{a(Z,F);break}else n(Z,F);F=F.sibling}vt=vf(tt,Z.mode,vt),vt.return=Z,Z=vt}return g(Z);case dt:return tt=Os(tt),pe(Z,F,tt,vt)}if(It(tt))return Lt(Z,F,tt,vt);if(Y(tt)){if(qt=Y(tt),typeof qt!="function")throw Error(s(150));return tt=qt.call(tt),Kt(Z,F,tt,vt)}if(typeof tt.then=="function")return pe(Z,F,eu(tt),vt);if(tt.$$typeof===$)return pe(Z,F,Jl(Z,tt),vt);nu(Z,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,F!==null&&F.tag===6?(a(Z,F.sibling),vt=l(F,tt),vt.return=Z,Z=vt):(a(Z,F),vt=_f(tt,Z.mode,vt),vt.return=Z,Z=vt),g(Z)):a(Z,F)}return function(Z,F,tt,vt){try{Io=0;var qt=pe(Z,F,tt,vt);return vr=null,qt}catch($t){if($t===_r||$t===$l)throw $t;var Ce=Wn(29,$t,null,Z.mode);return Ce.lanes=vt,Ce.return=Z,Ce}}}var Is=s0(!0),r0=s0(!1),Ya=!1;function Cf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Za(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ka(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(ze&2)!==0){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,n=Xl(t),km(t,null,a),n}return kl(t,r,n,a),Xl(t)}function zo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,vo(t,a)}}function Df(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var l=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};c===null?l=c=g:c=c.next=g,a=a.next}while(a!==null);c===null?l=c=n:c=c.next=n}else l=c=n;a={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Uf=!1;function Bo(){if(Uf){var t=gr;if(t!==null)throw t}}function Fo(t,n,a,r){Uf=!1;var l=t.updateQueue;Ya=!1;var c=l.firstBaseUpdate,g=l.lastBaseUpdate,A=l.shared.pending;if(A!==null){l.shared.pending=null;var O=A,Q=O.next;O.next=null,g===null?c=Q:g.next=Q,g=O;var lt=t.alternate;lt!==null&&(lt=lt.updateQueue,A=lt.lastBaseUpdate,A!==g&&(A===null?lt.firstBaseUpdate=Q:A.next=Q,lt.lastBaseUpdate=O))}if(c!==null){var St=l.baseState;g=0,lt=Q=O=null,A=c;do{var k=A.lane&-536870913,at=k!==A.lane;if(at?(Re&k)===k:(r&k)===k){k!==0&&k===Ns&&(Uf=!0),lt!==null&&(lt=lt.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var Lt=t,Kt=A;k=n;var pe=a;switch(Kt.tag){case 1:if(Lt=Kt.payload,typeof Lt=="function"){St=Lt.call(pe,St,k);break t}St=Lt;break t;case 3:Lt.flags=Lt.flags&-65537|128;case 0:if(Lt=Kt.payload,k=typeof Lt=="function"?Lt.call(pe,St,k):Lt,k==null)break t;St=P({},St,k);break t;case 2:Ya=!0}}k=A.callback,k!==null&&(t.flags|=64,at&&(t.flags|=8192),at=l.callbacks,at===null?l.callbacks=[k]:at.push(k))}else at={lane:k,tag:A.tag,payload:A.payload,callback:A.callback,next:null},lt===null?(Q=lt=at,O=St):lt=lt.next=at,g|=k;if(A=A.next,A===null){if(A=l.shared.pending,A===null)break;at=A,A=at.next,at.next=null,l.lastBaseUpdate=at,l.shared.pending=null}}while(!0);lt===null&&(O=St),l.baseState=O,l.firstBaseUpdate=Q,l.lastBaseUpdate=lt,c===null&&(l.shared.lanes=0),ns|=g,t.lanes=g,t.memoizedState=St}}function o0(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function l0(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)o0(a[t],n)}var Qa=Me(null),iu=Me(0);function u0(t,n){t=ba,ne(iu,t),ne(Qa,n),ba=t|n.baseLanes}function Nf(){ne(iu,ba),ne(Qa,Qa.current)}function Lf(){ba=iu.current,te(Qa),te(iu)}var wn=Me(null),Pn=null;function Ja(t){var n=t.alternate;ne(Dn,Dn.current&1),ne(wn,t),Pn===null&&(n===null||Qa.current!==null||n.memoizedState!==null)&&(Pn=t)}function Of(t){ne(Dn,Dn.current),ne(wn,t),Pn===null&&(Pn=t)}function c0(t){t.tag===22?(ne(Dn,Dn.current),ne(wn,t),Pn===null&&(Pn=t)):ja()}function ja(){ne(Dn,Dn.current),ne(wn,wn.current)}function ii(t){te(wn),Pn===t&&(Pn=null),te(Dn)}var Dn=Me(0);function Ho(t,n){ne(wn,wn.current),ne(Dn,n)}function Pf(t){te(Dn),te(wn),Pn===t&&(Pn=null)}function au(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||id(a)||ad(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ya=0,de=null,Ke=null,pn=null,su=!1,Sr=!1,zs=!1,ru=0,Go=0,xr=null,cy=0;function on(){throw Error(s(321))}function If(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ni(t[a],n[a]))return!1;return!0}function zf(t,n,a,r,l,c){return ya=c,de=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,_t.H=t===null||t.memoizedState===null?Y0:Z0,zs=!1,c=a(r,l),zs=!1,Sr&&(c=h0(n,a,r,l)),f0(t),c}function f0(t){_t.H=du;var n=Ke!==null&&Ke.next!==null;if(ya=0,pn=Ke=de=null,su=!1,Go=0,xr=null,n)throw Error(s(300));t===null||mn||(t=t.dependencies,t!==null&&Ql(t)&&(mn=!0))}function h0(t,n,a,r){de=t;var l=0;do{if(Sr&&(xr=null),Go=0,Sr=!1,25<=l)throw Error(s(301));if(l+=1,pn=Ke=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}_t.H=vy,c=n(a,r)}while(Sr);return c}function fy(){var t=_t.H,n=t.useState()[0];return n=typeof n.then=="function"?Vo(n):n,t=t.useState()[0],(Ke!==null?Ke.memoizedState:null)!==t&&(de.flags|=1024),n}function Bf(){var t=ru!==0;return ru=0,t}function Ff(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Hf(t){if(su){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}su=!1}ya=0,pn=Ke=de=null,Sr=!1,Go=ru=0,xr=null}function Hn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?de.memoizedState=pn=t:pn=pn.next=t,pn}function cn(){if(Ke===null){var t=de.alternate;t=t!==null?t.memoizedState:null}else t=Ke.next;var n=pn===null?de.memoizedState:pn.next;if(n!==null)pn=n,Ke=t;else{if(t===null)throw de.alternate===null?Error(s(467)):Error(s(310));Ke=t,t={memoizedState:Ke.memoizedState,baseState:Ke.baseState,baseQueue:Ke.baseQueue,queue:Ke.queue,next:null},pn===null?de.memoizedState=pn=t:pn=pn.next=t}return pn}function ou(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Vo(t){var n=Go;return Go+=1,xr===null&&(xr=[]),t=n0(xr,t,n),n=de,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,_t.H=n===null||n.memoizedState===null?Y0:Z0),t}function lu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Vo(t);if(t.$$typeof===mt)return;if(t.$$typeof===$)return Cn(t)}throw Error(s(438,String(t)))}function Gf(t){var n=null,a=de.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=de.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(l){return l.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ou(),de.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=Yt;return n.index++,a}function Ma(t,n){return typeof n=="function"?n(t):n}function uu(t){var n=cn();return Vf(n,Ke,t)}function Vf(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var l=t.baseQueue,c=r.pending;if(c!==null){if(l!==null){var g=l.next;l.next=c.next,c.next=g}n.baseQueue=l=c,r.pending=null}if(c=t.baseState,l===null)t.memoizedState=c;else{n=l.next;var A=g=null,O=null,Q=n,lt=!1;do{var St=Q.lane&-536870913;if(St!==Q.lane?(Re&St)===St:(ya&St)===St){var k=Q.revertLane;if(k===0)O!==null&&(O=O.next={lane:0,revertLane:0,gesture:null,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null}),St===Ns&&(lt=!0);else if((ya&k)===k){Q=Q.next,k===Ns&&(lt=!0);continue}else St={lane:0,revertLane:Q.revertLane,gesture:null,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null},O===null?(A=O=St,g=c):O=O.next=St,de.lanes|=k,ns|=k;St=Q.action,zs&&a(c,St),c=Q.hasEagerState?Q.eagerState:a(c,St)}else k={lane:St,revertLane:Q.revertLane,gesture:Q.gesture,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null},O===null?(A=O=k,g=c):O=O.next=k,de.lanes|=St,ns|=St;Q=Q.next}while(Q!==null&&Q!==n);if(O===null?g=c:O.next=A,!ni(c,t.memoizedState)&&(mn=!0,lt&&(a=gr,a!==null)))throw a;t.memoizedState=c,t.baseState=g,t.baseQueue=O,r.lastRenderedState=c}return l===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function kf(t){var n=cn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,l=a.pending,c=n.memoizedState;if(l!==null){a.pending=null;var g=l=l.next;do c=t(c,g.action),g=g.next;while(g!==l);ni(c,n.memoizedState)||(mn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),a.lastRenderedState=c}return[c,r]}function d0(t,n,a){var r=de,l=cn(),c=xe;if(c){if(a===void 0)throw Error(s(407));a=a()}else a=n();var g=!ni((Ke||l).memoizedState,a);if(g&&(l.memoizedState=a,mn=!0),l=l.queue,Wf(g0.bind(null,r,l,t),[t]),t=l.getSnapshot!==n||g||pn!==null&&(pn.memoizedState.tag&1)!==0,yr(t?9:8,{destroy:void 0},m0.bind(null,r,l,a,n),null),t){if(r.flags|=2048,Qe===null)throw Error(s(349));c||(ya&127)!==0||p0(r,n,a)}return a}function p0(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=de.updateQueue,n===null?(n=ou(),de.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function m0(t,n,a,r){n.value=a,n.getSnapshot=r,_0(n)&&v0(t)}function g0(t,n,a){return a(function(){_0(n)&&v0(t)})}function _0(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ni(t,a)}catch{return!0}}function v0(t){var n=As(t,2);n!==null&&Qn(n,t,2)}function Xf(t){var n=Hn();if(typeof t=="function"){var a=t;if(t=a(),zs){we(!0);try{a()}finally{we(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:t},n}function S0(t,n,a,r){return t.baseState=a,Vf(t,Ke,typeof r=="function"?r:Ma)}function hy(t,n,a,r,l){if(hu(t))throw Error(s(485));if(t=n.action,t!==null){var c={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){c.listeners.push(g)}};_t.T!==null?a(!0):c.isTransition=!1,r(c),a=n.pending,a===null?(c.next=n.pending=c,x0(n,c)):(c.next=a.next,n.pending=a.next=c)}}function x0(t,n){var a=n.action,r=n.payload,l=t.state;if(n.isTransition){var c=_t.T,g={};g.types=c!==null?c.types:null,_t.T=g;try{var A=a(l,r),O=_t.S;O!==null&&O(g,A),y0(t,n,A)}catch(Q){qf(t,n,Q)}finally{c!==null&&g.types!==null&&(c.types=g.types),_t.T=c}}else try{c=a(l,r),y0(t,n,c)}catch(Q){qf(t,n,Q)}}function y0(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){M0(t,n,r)},function(r){return qf(t,n,r)}):M0(t,n,a)}function M0(t,n,a){n.status="fulfilled",n.value=a,E0(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,x0(t,a)))}function qf(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,E0(n),n=n.next;while(n!==r)}t.action=null}function E0(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function T0(t,n){return n}function b0(t,n){if(xe){var a=Qe.formState;if(a!==null){t:{var r=de;if(xe){if(je){e:{for(var l=je,c=xi;l.nodeType!==8;){if(!c){l=null;break e}if(l=Mi(l.nextSibling),l===null){l=null;break e}}c=l.data,l=c==="F!"||c==="F"?l:null}if(l){je=Mi(l.nextSibling),r=l.data==="F!";break t}}Xa(r)}r=!1}r&&(n=a[0])}}return a=Hn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:T0,lastRenderedState:n},a.queue=r,a=X0.bind(null,de,r),r.dispatch=a,r=Xf(!1),c=Jf.bind(null,de,!1,r.queue),r=Hn(),l={state:n,dispatch:null,action:t,pending:null},r.queue=l,a=hy.bind(null,de,l,c,a),l.dispatch=a,r.memoizedState=t,[n,a,!1]}function A0(t){var n=cn();return R0(n,Ke,t)}function R0(t,n,a){if(n=Vf(t,n,T0)[0],t=uu(Ma)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=Vo(n)}catch(g){throw g===_r?$l:g}else r=n;n=cn();var l=n.queue,c=l.dispatch;return a!==n.memoizedState&&(de.flags|=2048,yr(9,{destroy:void 0},dy.bind(null,l,a),null)),[r,c,t]}function dy(t,n){t.action=n}function C0(t){var n=cn(),a=Ke;if(a!==null)return R0(n,a,t);cn(),n=n.memoizedState,a=cn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function yr(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=de.updateQueue,n===null&&(n=ou(),de.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function w0(){return cn().memoizedState}function cu(t,n,a,r){var l=Hn();de.flags|=t,l.memoizedState=yr(1|n,{destroy:void 0},a,r===void 0?null:r)}function fu(t,n,a,r){var l=cn();r=r===void 0?null:r;var c=l.memoizedState.inst;Ke!==null&&r!==null&&If(r,Ke.memoizedState.deps)?l.memoizedState=yr(n,c,a,r):(de.flags|=t,l.memoizedState=yr(1|n,c,a,r))}function D0(t,n){cu(8390656,8,t,n)}function Wf(t,n){fu(2048,8,t,n)}function py(t){de.flags|=4;var n=de.updateQueue;if(n===null)n=ou(),de.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function U0(t){var n=cn().memoizedState;return py({ref:n,nextImpl:t}),function(){if((ze&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function N0(t,n){return fu(4,2,t,n)}function L0(t,n){return fu(4,4,t,n)}function O0(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function P0(t,n,a){a=a!=null?a.concat([t]):null,fu(4,4,O0.bind(null,n,t),a)}function Yf(){}function I0(t,n){var a=cn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&If(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function z0(t,n){var a=cn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&If(n,r[1]))return r[0];if(r=t(),zs){we(!0);try{t()}finally{we(!1)}}return a.memoizedState=[r,n],r}function Zf(t,n,a){return a===void 0||(ya&1073741824)!==0&&(Re&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=Yg(),de.lanes|=t,ns|=t,a)}function B0(t,n,a,r){return ni(a,n)?a:Qa.current!==null?(t=Zf(t,a,r),ni(t,n)||(mn=!0),t):(ya&106)===0||(ya&1073741824)!==0&&(Re&261930)===0?(mn=!0,t.memoizedState=a):(t=Yg(),de.lanes|=t,ns|=t,n)}function F0(t,n,a,r,l){var c=Rt.p;Rt.p=c!==0&&8>c?c:8;var g=_t.T,A={};A.types=g!==null?g.types:null,_t.T=A,Jf(t,!1,n,a);try{var O=l(),Q=_t.S;if(Q!==null&&Q(A,O),O!==null&&typeof O=="object"&&typeof O.then=="function"){var lt=uy(O,r);ko(t,n,lt,oi(t))}else ko(t,n,r,oi(t))}catch(St){ko(t,n,{then:function(){},status:"rejected",reason:St},oi())}finally{Rt.p=c,g!==null&&A.types!==null&&(g.types=A.types),_t.T=g}}function my(){}function Kf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var l=H0(t).queue;F0(t,l,n,Ge,a===null?my:function(){return G0(t),a(r)})}function H0(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:Ge,baseState:Ge,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:Ge},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function G0(t){var n=H0(t);n.next===null&&(n=t.alternate.memoizedState),ko(t,n.next.queue,{},oi())}function Qf(){return Cn(Hr)}function V0(){return cn().memoizedState}function k0(){return cn().memoizedState}function gy(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=oi();t=Za(a);var r=Ka(n,t,a);r!==null&&(Qn(r,n,a),zo(r,n,a)),n={cache:Tf()},t.payload=n;return}n=n.return}}function _y(t,n,a){var r=oi();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},hu(t)?q0(n,a):(a=mf(t,n,a,r),a!==null&&(Qn(a,t,r),W0(a,n,r)))}function X0(t,n,a){var r=oi();ko(t,n,a,r)}function ko(t,n,a,r){var l={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(hu(t))q0(n,l);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var g=n.lastRenderedState,A=c(g,a);if(l.hasEagerState=!0,l.eagerState=A,ni(A,g))return kl(t,n,l,0),Qe===null&&Vl(),!1}catch{}if(a=mf(t,n,l,r),a!==null)return Qn(a,t,r),W0(a,n,r),!0}return!1}function Jf(t,n,a,r){if(r={lane:2,revertLane:Gh(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},hu(t)){if(n)throw Error(s(479))}else n=mf(t,a,r,2),n!==null&&Qn(n,t,2)}function hu(t){var n=t.alternate;return t===de||n!==null&&n===de}function q0(t,n){Sr=su=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function W0(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,vo(t,a)}}var du={readContext:Cn,use:lu,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on,useEffectEvent:on},Y0={readContext:Cn,use:lu,useCallback:function(t,n){return Hn().memoizedState=[t,n===void 0?null:n],t},useContext:Cn,useEffect:D0,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,cu(4194308,4,O0.bind(null,n,t),a)},useLayoutEffect:function(t,n){return cu(4194308,4,t,n)},useInsertionEffect:function(t,n){cu(4,2,t,n)},useMemo:function(t,n){var a=Hn();n=n===void 0?null:n;var r=t();if(zs){we(!0);try{t()}finally{we(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Hn();if(a!==void 0){var l=a(n);if(zs){we(!0);try{a(n)}finally{we(!1)}}}else l=n;return r.memoizedState=r.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},r.queue=t,t=t.dispatch=_y.bind(null,de,t),[r.memoizedState,t]},useRef:function(t){var n=Hn();return t={current:t},n.memoizedState=t},useState:function(t){t=Xf(t);var n=t.queue,a=X0.bind(null,de,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Yf,useDeferredValue:function(t,n){var a=Hn();return Zf(a,t,n)},useTransition:function(){var t=Xf(!1);return t=F0.bind(null,de,t.queue,!0,!1),Hn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=de,l=Hn();if(xe){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Qe===null)throw Error(s(349));(Re&127)!==0||p0(r,n,a)}l.memoizedState=a;var c={value:a,getSnapshot:n};return l.queue=c,D0(g0.bind(null,r,c,t),[t]),r.flags|=2048,yr(9,{destroy:void 0},m0.bind(null,r,c,a,n),null),a},useId:function(){var t=Hn(),n=Qe.identifierPrefix;if(xe){var a=Zi,r=Yi;a=(r&~(1<<32-ce(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ru++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=cy++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Qf,useFormState:b0,useActionState:b0,useOptimistic:function(t){var n=Hn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Jf.bind(null,de,!0,a),a.dispatch=n,[t,n]},useMemoCache:Gf,useCacheRefresh:function(){return Hn().memoizedState=gy.bind(null,de)},useEffectEvent:function(t){var n=Hn(),a={impl:t};return n.memoizedState=a,function(){if((ze&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Z0={readContext:Cn,use:lu,useCallback:I0,useContext:Cn,useEffect:Wf,useImperativeHandle:P0,useInsertionEffect:N0,useLayoutEffect:L0,useMemo:z0,useReducer:uu,useRef:w0,useState:function(){return uu(Ma)},useDebugValue:Yf,useDeferredValue:function(t,n){var a=cn();return B0(a,Ke.memoizedState,t,n)},useTransition:function(){var t=uu(Ma)[0],n=cn().memoizedState;return[typeof t=="boolean"?t:Vo(t),n]},useSyncExternalStore:d0,useId:V0,useHostTransitionStatus:Qf,useFormState:A0,useActionState:A0,useOptimistic:function(t,n){var a=cn();return S0(a,Ke,t,n)},useMemoCache:Gf,useCacheRefresh:k0,useEffectEvent:U0},vy={readContext:Cn,use:lu,useCallback:I0,useContext:Cn,useEffect:Wf,useImperativeHandle:P0,useInsertionEffect:N0,useLayoutEffect:L0,useMemo:z0,useReducer:kf,useRef:w0,useState:function(){return kf(Ma)},useDebugValue:Yf,useDeferredValue:function(t,n){var a=cn();return Ke===null?Zf(a,t,n):B0(a,Ke.memoizedState,t,n)},useTransition:function(){var t=kf(Ma)[0],n=cn().memoizedState;return[typeof t=="boolean"?t:Vo(t),n]},useSyncExternalStore:d0,useId:V0,useHostTransitionStatus:Qf,useFormState:C0,useActionState:C0,useOptimistic:function(t,n){var a=cn();return Ke!==null?S0(a,Ke,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Gf,useCacheRefresh:k0,useEffectEvent:U0};function jf(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:P({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var $f={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=oi(),l=Za(r);l.payload=n,a!=null&&(l.callback=a),n=Ka(t,l,r),n!==null&&(Qn(n,t,r),zo(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=oi(),l=Za(r);l.tag=1,l.payload=n,a!=null&&(l.callback=a),n=Ka(t,l,r),n!==null&&(Qn(n,t,r),zo(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=oi(),r=Za(a);r.tag=2,n!=null&&(r.callback=n),n=Ka(t,r,a),n!==null&&(Qn(n,t,a),zo(n,t,a))}};function K0(t,n,a,r,l,c,g){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,c,g):n.prototype&&n.prototype.isPureReactComponent?!wo(a,r)||!wo(l,c):!0}function Q0(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&$f.enqueueReplaceState(n,n.state,null)}function Bs(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=P({},a));for(var l in t)a[l]===void 0&&(a[l]=t[l])}return a}function J0(t){Gl(t)}function j0(t){console.error(t)}function $0(t){Gl(t)}function pu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function tg(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function th(t,n,a){return a=Za(a),a.tag=3,a.payload={element:null},a.callback=function(){pu(t,n)},a}function eg(t){return t=Za(t),t.tag=3,t}function ng(t,n,a,r){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var c=r.value;t.payload=function(){return l(c)},t.callback=function(){tg(n,a,r)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(t.callback=function(){tg(n,a,r),typeof l!="function"&&(is===null?is=new Set([this]):is.add(this));var A=r.stack;this.componentDidCatch(r.value,{componentStack:A!==null?A:""})})}function Sy(t,n,a,r,l){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ds(n,a,l,!0),a=wn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Pn===null?Pu():a.alternate===null&&ln===0&&(ln=3),a.flags&=-257,a.flags|=65536,a.lanes=l,r===tu?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Bh(t,r,l)),!1;case 22:return a.flags|=65536,r===tu?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Bh(t,r,l)),!1}throw Error(s(435,a.tag))}return Bh(t,r,l),Pu(),!1}if(xe)return n=wn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=l,r!==xf&&(t=Error(s(422),{cause:r}),No(_i(t,a)))):(r!==xf&&(n=Error(s(423),{cause:r}),No(_i(n,a))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,r=_i(r,a),l=th(t.stateNode,r,l),Df(t,l),ln!==4&&(ln=2)),!1;var c=Error(s(520),{cause:r});if(c=_i(c,a),Jo===null?Jo=[c]:Jo.push(c),ln!==4&&(ln=2),n===null)return!0;r=_i(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=l&-l,a.lanes|=t,t=th(a.stateNode,r,t),Df(a,t),!1;case 1:if(n=a.type,c=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(is===null||!is.has(c))))return a.flags|=65536,l&=-l,a.lanes|=l,l=eg(l),ng(l,t,a,r),Df(a,l),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var eh=Error(s(461)),mn=!1;function Sn(t,n,a,r){n.child=t===null?r0(n,null,a,r):Is(n,t.child,a,r)}function ig(t,n,a,r,l){a=a.render;var c=n.ref;if("ref"in r){var g={};for(var A in r)A!=="ref"&&(g[A]=r[A])}else g=r;return Us(n),r=zf(t,n,a,g,c,l),A=Bf(),t!==null&&!mn?(Ff(t,n,l),Ea(t,n,l)):(xe&&A&&Yl(n),n.flags|=1,Sn(t,n,r,l),n.child)}function ag(t,n,a,r,l){if(t===null){var c=a.type;return typeof c=="function"&&!gf(c)&&c.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=c,sg(t,n,c,r,l)):(t=ql(a.type,null,r,n,n.mode,l),t.ref=n.ref,t.return=n,n.child=t)}if(c=t.child,!uh(t,l)){var g=c.memoizedProps;if(a=a.compare,a=a!==null?a:wo,a(g,r)&&t.ref===n.ref)return Ea(t,n,l)}return n.flags|=1,t=_a(c,r),t.ref=n.ref,t.return=n,n.child=t}function sg(t,n,a,r,l){if(t!==null){var c=t.memoizedProps;if(wo(c,r)&&t.ref===n.ref)if(mn=!1,n.pendingProps=r=c,uh(t,l))(t.flags&131072)!==0&&(mn=!0);else return n.lanes=t.lanes,Ea(t,n,l)}return nh(t,n,a,r,l)}function rg(t,n,a,r){var l=r.children,c=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|a:a,t!==null){for(r=n.child=t.child,l=0;r!==null;)l=l|r.lanes|r.childLanes,r=r.sibling;r=l&~c}else r=0,n.child=null;return og(t,n,c,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&jl(n,c!==null?c.cachePool:null),c!==null?u0(n,c):Nf(),c0(n);else return r=n.lanes=536870912,og(t,n,c!==null?c.baseLanes|a:a,a,r)}else c!==null?(jl(n,c.cachePool),u0(n,c),ja(),n.memoizedState=null):(t!==null&&jl(n,null),Nf(),ja());return Sn(t,n,l,a),n.child}function Xo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function og(t,n,a,r,l){var c=Af();return c=c===null?null:{parent:dn._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},t!==null&&jl(n,null),Nf(),c0(n),t!==null&&Ds(t,n,r,!0),n.childLanes=l,null}function mu(t,n){return n=gu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function lg(t,n,a){return Is(n,t.child,null,a),t=mu(n,n.pendingProps),t.flags|=2,ii(n),n.memoizedState=null,t}function xy(t,n,a){var r=n.pendingProps,l=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(xe){if(r.mode==="hidden")return t=mu(n,r),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Xo(null,t);if(Of(n),(t=je)?(t=O_(t,xi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:Yi,overflow:Zi}:null,retryLane:536870912,hydrationErrors:null},a=qm(t),a.return=n,n.child=a,En=n,je=null)):t=null,t===null)throw Xa(n);return n.lanes=536870912,null}return mu(n,r)}var c=t.memoizedState;if(c!==null){var g=c.dehydrated;if(Of(n),l)if(n.flags&256)n.flags&=-257,n=lg(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||Ds(t,n,a,!1),l=(a&t.childLanes)!==0,mn||l){if(Qa.current===null){if(r=Qe,r!==null&&(g=So(r,a),g!==0&&g!==c.retryLane))throw c.retryLane=g,As(t,g),Qn(r,t,g),eh;Pu()}n=lg(t,n,a)}else t=c.treeContext,je=Mi(g.nextSibling),En=n,xe=!0,ka=null,xi=!1,t!==null&&Zm(n,t),n=mu(n,r),n.flags|=134221824;return n}return t=_a(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Mr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function nh(t,n,a,r,l){return Us(n),a=zf(t,n,a,r,void 0,l),r=Bf(),t!==null&&!mn?(Ff(t,n,l),Ea(t,n,l)):(xe&&r&&Yl(n),n.flags|=1,Sn(t,n,a,l),n.child)}function ug(t,n,a,r,l,c){return Us(n),n.updateQueue=null,a=h0(n,r,a,l),f0(t),r=Bf(),t!==null&&!mn?(Ff(t,n,c),Ea(t,n,c)):(xe&&r&&Yl(n),n.flags|=1,Sn(t,n,a,c),n.child)}function cg(t,n,a,r,l){if(Us(n),n.stateNode===null){var c=hr,g=a.contextType;typeof g=="object"&&g!==null&&(c=Cn(g)),c=new a(r,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=$f,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=r,c.state=n.memoizedState,c.refs={},Cf(n),g=a.contextType,c.context=typeof g=="object"&&g!==null?Cn(g):hr,c.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(jf(n,a,g,r),c.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(g=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),g!==c.state&&$f.enqueueReplaceState(c,c.state,null),Fo(n,r,c,l),Bo(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){c=n.stateNode;var A=n.memoizedProps,O=Bs(a,A);c.props=O;var Q=c.context,lt=a.contextType;g=hr,typeof lt=="object"&&lt!==null&&(g=Cn(lt));var St=a.getDerivedStateFromProps;lt=typeof St=="function"||typeof c.getSnapshotBeforeUpdate=="function",A=n.pendingProps!==A,lt||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(A||Q!==g)&&Q0(n,c,r,g),Ya=!1;var k=n.memoizedState;c.state=k,Fo(n,r,c,l),Bo(),Q=n.memoizedState,A||k!==Q||Ya?(typeof St=="function"&&(jf(n,a,St,r),Q=n.memoizedState),(O=Ya||K0(n,a,O,r,k,Q,g))?(lt||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=Q),c.props=r,c.state=Q,c.context=g,r=O):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{c=n.stateNode,wf(t,n),g=n.memoizedProps,lt=Bs(a,g),c.props=lt,St=n.pendingProps,k=c.context,Q=a.contextType,O=hr,typeof Q=="object"&&Q!==null&&(O=Cn(Q)),A=a.getDerivedStateFromProps,(Q=typeof A=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(g!==St||k!==O)&&Q0(n,c,r,O),Ya=!1,k=n.memoizedState,c.state=k,Fo(n,r,c,l),Bo();var at=n.memoizedState;g!==St||k!==at||Ya||t!==null&&t.dependencies!==null&&Ql(t.dependencies)?(typeof A=="function"&&(jf(n,a,A,r),at=n.memoizedState),(lt=Ya||K0(n,a,lt,r,k,at,O)||t!==null&&t.dependencies!==null&&Ql(t.dependencies))?(Q||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(r,at,O),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(r,at,O)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||g===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=at),c.props=r,c.state=at,c.context=O,r=lt):(typeof c.componentDidUpdate!="function"||g===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),r=!1)}return c=r,Mr(t,n),r=(n.flags&128)!==0,c||r?(c=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,t!==null&&r?(n.child=Is(n,t.child,null,l),n.child=Is(n,null,a,l)):Sn(t,n,a,l),n.memoizedState=c.state,t=n.child):t=Ea(t,n,l),t}function fg(t,n,a,r){return Cs(),n.flags|=256,Sn(t,n,a,r),n.child}var ih={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ah(t){return{baseLanes:t,cachePool:t0()}}function sh(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ri),t}function hg(t,n,a){var r=n.pendingProps,l=!1,c=(n.flags&128)!==0,g;if((g=c)||(g=t!==null&&t.memoizedState===null?!1:(Dn.current&2)!==0),g&&(l=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,t===null){if(xe){if(l?Ja(n):ja(),(t=je)?(t=O_(t,xi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:Yi,overflow:Zi}:null,retryLane:536870912,hydrationErrors:null},a=qm(t),a.return=n,n.child=a,En=n,je=null)):t=null,t===null)throw Xa(n);return ad(t)?n.lanes=32:n.lanes=536870912,null}return c=r.children,r=r.fallback,l?(ja(),l=n.mode,c=gu({mode:"hidden",children:c},l),r=Rs(r,l,a,null),c.return=n,r.return=n,c.sibling=r,n.child=c,r=n.child,r.memoizedState=ah(a),r.childLanes=sh(t,g,a),n.memoizedState=ih,Xo(null,r)):(Ja(n),rh(n,c))}var A=t.memoizedState;if(A!==null){var O=A.dehydrated;if(O!==null)return yy(t,n,c,g,r,O,A,a)}return l?(ja(),l=r.fallback,c=n.mode,A=t.child,O=A.sibling,r=_a(A,{mode:"hidden",children:r.children}),r.subtreeFlags=A.subtreeFlags&1206910976,O!==null?l=_a(O,l):(l=Rs(l,c,a,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,Xo(null,r),r=n.child,l=t.child.memoizedState,l===null?l=ah(a):(c=l.cachePool,c!==null?(A=dn._currentValue,c=c.parent!==A?{parent:A,pool:A}:c):c=t0(),l={baseLanes:l.baseLanes|a,cachePool:c}),r.memoizedState=l,r.childLanes=sh(t,g,a),n.memoizedState=ih,Xo(t.child,r)):(Ja(n),a=t.child,t=a.sibling,a=_a(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(g=n.deletions,g===null?(n.deletions=[t],n.flags|=16):g.push(t)),n.child=a,n.memoizedState=null,a)}function rh(t,n){return n=gu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function gu(t,n){return t=Wn(22,t,null,n),t.lanes=0,t}function _u(t,n,a){return Is(n,t.child,null,a),t=rh(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function yy(t,n,a,r,l,c,g,A){if(a)return n.flags&256?(Ja(n),n.flags&=-257,_u(t,n,A)):n.memoizedState!==null?(ja(),n.child=t.child,n.flags|=128,null):(ja(),c=l.fallback,g=n.mode,l=gu({mode:"visible",children:l.children},g),c=Rs(c,g,A,null),c.flags|=2,l.return=n,c.return=n,l.sibling=c,n.child=l,Is(n,t.child,null,A),l=n.child,l.memoizedState=ah(A),l.childLanes=sh(t,r,A),n.memoizedState=ih,Xo(null,l));if(Ja(n),ad(c)){if(r=c.nextSibling&&c.nextSibling.dataset,r)var O=r.dgst;return r=O,r!==""&&(l=Error(s(419)),l.stack="",l.digest=r,No({value:l,source:null,stack:null})),_u(t,n,A)}if(mn||Ds(t,n,A,!1),r=(A&t.childLanes)!==0,mn||r){if(Qa.current!==null)return _u(t,n,A);if(r=Qe,r!==null&&(l=So(r,A),l!==0&&l!==g.retryLane))throw g.retryLane=l,As(t,l),Qn(r,t,l),eh;return id(c)||Pu(),_u(t,n,A)}return id(c)?(n.flags|=192,n.child=t.child,null):(t=g.treeContext,je=Mi(c.nextSibling),En=n,xe=!0,ka=null,xi=!1,t!==null&&Zm(n,t),n=rh(n,l.children),n.flags|=134221824,n)}function dg(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Kl(t.return,n,a)}function pg(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&au(a)===null&&(n=t),t=t.sibling}return n}function vu(t,n,a,r,l,c){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:l,treeForkCount:c}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=r,g.tail=a,g.tailMode=l,g.treeForkCount=c)}function oh(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function lh(t,n,a){var r=n.pendingProps,l=r.revealOrder,c=r.tail;r=r.children;var g=Dn.current;if(n.flags&128)return Ho(n,g),null;var A=(g&2)!==0;if(A?(g=g&1|2,n.flags|=128):g&=1,Ho(n,g),l==="backwards"&&t!==null?(oh(t),Sn(t,n,r,a),oh(t)):Sn(t,n,r,a),r=xe?Uo:0,!A&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&dg(t,a,n);else if(t.tag===19)dg(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"backwards":a=pg(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null,oh(n)),vu(n,!0,l,null,c,r);break;case"unstable_legacy-backwards":for(a=null,l=n.child,n.child=null;l!==null;){if(t=l.alternate,t!==null&&au(t)===null){n.child=l;break}t=l.sibling,l.sibling=a,a=l,l=t}vu(n,!0,a,null,c,r);break;case"together":vu(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=pg(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null),vu(n,!1,l,a,c,r)}return n.child}function mg(t,n,a){var r=n.pendingProps;return qa(n,n.type,r.value),Sn(t,n,r.children,a),n.child}function Ea(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ns|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ds(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=_a(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=_a(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function uh(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Ql(t)))}function My(t,n,a){switch(n.tag){case 3:G(n,n.stateNode.containerInfo),qa(n,dn,t.memoizedState.cache),Cs();break;case 27:case 5:Le(n);break;case 4:G(n,n.stateNode.containerInfo);break;case 10:qa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Of(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return Ja(n),n.flags|=128,null;r=Ds(t,n,a,!1);var l=n.child.childLanes;return r||(a&l)!==0?hg(t,n,a):(Ja(n),t=Ea(t,n,a),t!==null?t.sibling:null)}Ja(n);break;case 19:if(n.flags&128)return lh(t,n,a);if(l=(t.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ds(t,n,a,!1),r=(a&n.childLanes)!==0),l){if(r)return lh(t,n,a);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Ho(n,Dn.current),r)break;return null;case 22:return n.lanes=0,rg(t,n,a,n.pendingProps);case 24:qa(n,dn,t.memoizedState.cache)}return Ea(t,n,a)}function gg(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)mn=!0;else{if(!uh(t,a)&&(n.flags&128)===0)return mn=!1,My(t,n,a);mn=(t.flags&131072)!==0}else mn=!1,xe&&(n.flags&1048576)!==0&&Ym(n,Uo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=Os(n.elementType),n.type=t,typeof t=="function")gf(t)?(r=Bs(t,r),n.tag=1,n=cg(null,n,t,r,a)):(n.tag=0,n=nh(null,n,t,r,a));else{if(t!=null){var l=t.$$typeof;if(l===q){n.tag=11,n=ig(null,n,t,r,a);break t}else if(l===ot){n.tag=14,n=ag(null,n,t,r,a);break t}else if(l===$){n.tag=10,n.type=t,n=mg(null,n,a);break t}}throw n=Tt(t)||t,Error(s(306,n,""))}}return n;case 0:return nh(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,l=Bs(r,n.pendingProps),cg(t,n,r,l,a);case 3:t:{if(G(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var c=n.memoizedState;l=c.element,wf(t,n),Fo(n,r,null,a);var g=n.memoizedState;if(r=g.cache,qa(n,dn,r),r!==c.cache&&Ef(n,[dn],a,!0),Bo(),r=g.element,c.isDehydrated)if(c={element:r,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=fg(t,n,r,a);break t}else if(r!==l){l=_i(Error(s(424)),n),No(l),n=fg(t,n,r,a);break t}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,je=Mi(t.firstChild),En=n,xe=!0,ka=null,xi=!0,a=r0(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling;else{if(Cs(),r===l){n=Ea(t,n,a);break t}Sn(t,n,r,a)}n=n.child}return n;case 26:return Mr(t,n),t===null?(a=G_(n.type,null,n.pendingProps,null))?n.memoizedState=a:xe||(n.stateNode=x_(n.type,n.pendingProps,Oe.current,n)):n.memoizedState=G_(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Le(n),t===null&&xe&&(r=n.stateNode=z_(n.type,n.pendingProps,Oe.current),En=n,xi=!0,l=je,rs(n.type)?(sd=l,je=Mi(r.firstChild)):je=l),Sn(t,n,n.pendingProps.children,a),Mr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&xe&&((l=r=je)&&(r=gM(r,n.type,n.pendingProps,xi),r!==null?(n.stateNode=r,En=n,je=Mi(r.firstChild),xi=!1,l=!0):l=!1),l||Xa(n)),Le(n),l=n.type,c=n.pendingProps,g=t!==null?t.memoizedProps:null,r=c.children,Qh(l,c)?r=null:g!==null&&Qh(l,g)&&(n.flags|=32),n.memoizedState!==null&&(l=zf(t,n,fy,null,null,a),Hr._currentValue=l),Mr(t,n),Sn(t,n,r,a),n.child;case 6:return t===null&&xe&&((t=a=je)&&(a=_M(a,n.pendingProps,xi),a!==null?(n.stateNode=a,En=n,je=null,t=!0):t=!1),t||Xa(n)),null;case 13:return hg(t,n,a);case 4:return G(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Is(n,null,r,a):Sn(t,n,r,a),n.child;case 11:return ig(t,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Mr(t,n),Sn(t,n,r,a),n.child;case 8:return Sn(t,n,n.pendingProps.children,a),n.child;case 12:return Sn(t,n,n.pendingProps.children,a),n.child;case 10:return mg(t,n,a);case 9:return l=n.type._context,r=n.pendingProps.children,Us(n),l=Cn(l),r=r(l),n.flags|=1,Sn(t,n,r,a),n.child;case 14:return ag(t,n,n.type,n.pendingProps,a);case 15:return sg(t,n,n.type,n.pendingProps,a);case 19:return lh(t,n,a);case 31:return xy(t,n,a);case 22:return rg(t,n,a,n.pendingProps);case 24:return Us(n),r=Cn(dn),t===null?(l=Af(),l===null&&(l=Qe,c=Tf(),l.pooledCache=c,c.refCount++,c!==null&&(l.pooledCacheLanes|=a),l=c),n.memoizedState={parent:r,cache:l},Cf(n),qa(n,dn,l)):((t.lanes&a)!==0&&(wf(t,n),Fo(n,null,null,a),Bo()),l=t.memoizedState,c=n.memoizedState,l.parent!==r?(l={parent:r,cache:r},n.memoizedState=l,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=l),qa(n,dn,r)):(r=c.cache,qa(n,dn,r),r!==l.cache&&Ef(n,[dn],a,!0))),Sn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=t===null?18882560:18874368:xe&&Yl(n),t!==null&&t.memoizedProps.name!==r.name?n.flags|=4194816:Mr(t,n),Sn(t,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ta(t){t.flags|=4}function ch(t,n,a,r,l){var c;if((c=(t.mode&32)!==0)&&(c=a===null?q_(n,r):q_(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),c){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(Jg())t.flags|=8192;else throw Ps=tu,Rf}else t.flags&=-16777217}function _g(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!W_(n))if(Jg())t.flags|=8192;else throw Ps=tu,Rf}function Su(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?_o():536870912,t.lanes|=n,Rr|=n)}function qo(t,n){if(!xe)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function $e(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var l=t.child;l!==null;)a|=l.lanes|l.childLanes,r|=l.subtreeFlags&1206910976,r|=l.flags&1206910976,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)a|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function Ey(t,n,a){var r=n.pendingProps;switch(Sf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $e(n),null;case 1:return $e(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),xa(dn),nn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(mr(n)?Ta(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,yf())),$e(n),null;case 26:var l=n.type,c=n.memoizedState;return t===null?(Ta(n),c!==null?($e(n),_g(n,c)):($e(n),ch(n,l,null,r,a))):c?c!==t.memoizedState?(Ta(n),$e(n),_g(n,c)):($e(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&Ta(n),$e(n),ch(n,l,t,r,a)),null;case 27:if(w(n),a=Oe.current,l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return $e(n),n.subtreeFlags&=-33554433,null}t=Ve.current,mr(n)?Km(n):(t=z_(l,r,a),n.stateNode=t,Ta(n))}return $e(n),n.subtreeFlags&=-33554433,null;case 5:if(w(n),l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return $e(n),n.subtreeFlags&=-33554433,null}if(c=Ve.current,mr(n))Km(n);else{var g=nl(Oe.current);switch(c){case 1:c=g.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:c=g.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":c=g.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":c=g.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":c=g.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof r.is=="string"?g.createElement("select",{is:r.is}):g.createElement("select"),r.multiple?c.multiple=!0:r.size&&(c.size=r.size);break;default:c=typeof r.is=="string"?g.createElement(l,{is:r.is}):g.createElement(l)}}c[b]=n,c[B]=r;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)c.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=c;t:switch(Nn(c,l,r),l){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Ta(n)}}return $e(n),n.subtreeFlags&=-33554433,ch(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=Oe.current,mr(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,l=En,l!==null)switch(l.tag){case 27:case 5:r=l.memoizedProps}t[b]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||g_(t.nodeValue,a)),t||Xa(n,!0)}else t=nl(t).createTextNode(r),t[b]=n,n.stateNode=t}return $e(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=mr(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[b]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;$e(n),t=!1}else a=yf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ii(n),n):(ii(n),null);if((n.flags&128)!==0)throw Error(s(558))}return $e(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=mr(n),r!==null&&r.dehydrated!==null){if(t===null){if(!l)throw Error(s(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(s(317));l[b]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;$e(n),l=!1}else l=yf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return n.flags&256?(ii(n),n):(ii(n),null)}return ii(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,l=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(l=r.alternate.memoizedState.cachePool.pool),c=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(c=r.memoizedState.cachePool.pool),c!==l&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Su(n,n.updateQueue),$e(n),null);case 4:return nn(),t===null&&qh(n.stateNode.containerInfo),n.flags|=67108864,$e(n),null;case 10:return xa(n.type),$e(n),null;case 19:if(Pf(n),r=n.memoizedState,r===null)return $e(n),null;if(l=(n.flags&128)!==0,c=r.rendering,c===null)if(l)qo(r,!1);else{if(ln!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(c=au(t),c!==null){for(n.flags|=128,qo(r,!1),t=c.updateQueue,n.updateQueue=t,Su(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Xm(a,t),a=a.sibling;return Ho(n,Dn.current&1|2),xe&&va(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&Vt()>Uu&&(n.flags|=128,l=!0,qo(r,!1),n.lanes=4194304)}else{if(!l)if(t=au(c),t!==null){if(n.flags|=128,l=!0,t=t.updateQueue,n.updateQueue=t,Su(n,t),qo(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!c.alternate&&!xe)return $e(n),null}else 2*Vt()-r.renderingStartTime>Uu&&a!==536870912&&(n.flags|=128,l=!0,qo(r,!1),n.lanes=4194304);r.isBackwards?(c.sibling=n.child,n.child=c):(t=r.last,t!==null?t.sibling=c:n.child=c,r.last=c)}if(r.tail!==null){t=r.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return r.rendering=t,r.tail=t.sibling,r.renderingStartTime=Vt(),t.sibling=null,c=Dn.current,c=l?c&1|2:c&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||xe?Ho(n,c):(a=c,ne(wn,n),ne(Dn,a),Pn===null&&(Pn=n)),xe&&va(n,r.treeForkCount),t}return $e(n),null;case 22:case 23:return ii(n),Lf(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&($e(n),n.subtreeFlags&6&&(n.flags|=8192)):$e(n),a=n.updateQueue,a!==null&&Su(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&te(Ls),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),xa(dn),$e(n),null;case 25:return null;case 30:return n.flags|=33554432,$e(n),null}throw Error(s(156,n.tag))}function Ty(t,n){switch(Sf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return xa(dn),nn(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return w(n),null;case 31:if(n.memoizedState!==null){if(ii(n),n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ii(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Pf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return nn(),null;case 10:return xa(n.type),null;case 22:case 23:return ii(n),Lf(),t!==null&&te(Ls),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return xa(dn),null;case 25:return null;default:return null}}function vg(t,n){switch(Sf(n),n.tag){case 3:xa(dn),nn();break;case 26:case 27:case 5:w(n);break;case 4:nn();break;case 31:n.memoizedState!==null&&ii(n);break;case 13:ii(n);break;case 19:Pf(n);break;case 10:xa(n.type);break;case 22:case 23:ii(n),Lf(),t!==null&&te(Ls);break;case 24:xa(dn)}}function Wo(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var l=r.next;a=l;do{if((a.tag&t)===t){r=void 0;var c=a.create,g=a.inst;r=c(),g.destroy=r}a=a.next}while(a!==l)}}catch(A){Xe(n,n.return,A)}}function $a(t,n,a){try{var r=n.updateQueue,l=r!==null?r.lastEffect:null;if(l!==null){var c=l.next;r=c;do{if((r.tag&t)===t){var g=r.inst,A=g.destroy;if(A!==void 0){g.destroy=void 0,l=n;var O=a,Q=A;try{Q()}catch(lt){Xe(l,O,lt)}}}r=r.next}while(r!==c)}}catch(lt){Xe(n,n.return,lt)}}function Sg(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{l0(n,a)}catch(r){Xe(t,t.return,r)}}}function xg(t,n,a){a.props=Bs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){Xe(t,n,r)}}function Ki(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:var l=t.stateNode,c=ma(t.memoizedProps,l);(l.ref===null||l.ref.name!==c)&&(l.ref=R_(c)),r=l.ref;break;case 7:if(t.stateNode===null){var g=new li(t);_(t.child,!1,pM,g,void 0,void 0),t.stateNode=g}r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(A){Xe(t,n,A)}}function Un(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(l){Xe(t,n,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){Xe(t,n,l)}else a.current=null}function xu(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)L_(t.stateNode,n[a])}function yg(t){for(var n=t.return;n!==null&&(hh(n)&&L_(t.stateNode,n.stateNode),!fh(n));)n=n.return}function Yo(t){for(var n=t.return;n!==null&&(hh(n)&&mM(t.stateNode,n.stateNode),!fh(n));)n=n.return}function fh(t){return t.tag===5||t.tag===3||t.tag===27}function hh(t){return t&&t.tag===7&&t.stateNode!==null}function dh(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(l){Xe(t,t.return,l)}}function ph(t,n,a){try{var r=t.stateNode;Qy(r,t.type,a,n),r[B]=n}catch(l){Xe(t,t.return,l)}}function Mg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&rs(t.type)||t.tag===4}function mh(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Mg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&rs(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function gh(t,n,a,r){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(l),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Wi)),xu(t,r),Se=!0;else if(l!==4&&(l===27&&(xu(t,r),r=null,rs(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(gh(t,n,a,r),t=t.sibling;t!==null;)gh(t,n,a,r),t=t.sibling}function yu(t,n,a,r){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?a.insertBefore(l,n):a.appendChild(l),xu(t,r),Se=!0;else if(l!==4&&(l===27&&(xu(t,r),r=null,rs(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(yu(t,n,a,r),t=t.sibling;t!==null;)yu(t,n,a,r),t=t.sibling}function Eg(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0]);Nn(n,r,a),n[b]=t,n[B]=a}catch(c){Xe(t,t.return,c)}}var Mu=!1,ai=null;function Tg(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(Mu=!0)}var Qi=null;function bg(){var t=Qi;return Qi=null,t}var Yn=0;function Er(t,n,a,r,l){return Yn=0,Ag(t.child,n,a,r,l)}function Ag(t,n,a,r,l){for(var c=!1;t!==null;){if(t.tag===5){var g=t.stateNode;if(r!==null){var A=$h(g);r.push(A),A.view&&(c=!0)}else c||$h(g).view&&(c=!0);Mu=!0,b_(g,Yn===0?n:n+"_"+Yn,a),Yn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&l||Ag(t.child,n,a,r,l)&&(c=!0));t=t.sibling}return c}function Ji(t,n){for(;t!==null;)t.tag===5?A_(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||Ji(t.child,n)),t=t.sibling}function Eu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Eu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=ga(n.default,n.share),n!=="none"&&(Er(t,a,n,null,!1)||Ji(t.child,!1))}t=t.sibling}}function _h(t,n){if(t.tag===30){var a=t.stateNode,r=t.memoizedProps,l=ma(r,a),c=ga(r.default,a.paired?r.share:r.enter);c!=="none"?Er(t,l,c,null,!1)?(Eu(t),a.paired||n||Ur(t,r.onEnter)):Ji(t.child,!1):Eu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)_h(t,n),t=t.sibling;else Eu(t)}function vh(t){if(ai!==null&&ai.size!==0){var n=ai;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var l=n.get(r);if(l!==void 0){var c=ga(a.default,a.share);if(c!=="none"&&(Er(t,r,c,null,!1)?(c=t.stateNode,l.paired=c,c.paired=l,Ur(t,a.onShare)):Ji(t.child,!1)),n.delete(r),n.size===0)break}}}vh(t)}t=t.sibling}}}function Sh(t){if(t.tag===30){var n=t.memoizedProps,a=ma(n,t.stateNode),r=ai!==null?ai.get(a):void 0,l=ga(n.default,r!==void 0?n.share:n.exit);l!=="none"&&(Er(t,a,l,null,!1)?r!==void 0?(l=t.stateNode,r.paired=l,l.paired=r,ai.delete(a),Ur(t,n.onShare)):Ur(t,n.onExit):Ji(t.child,!1)),ai!==null&&vh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Sh(t),t=t.sibling;else ai!==null&&vh(t)}function Rg(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=ma(n,t.stateNode);n=ga(n.default,n.update),t.flags&=-5,n!=="none"&&Er(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&Rg(t);t=t.sibling}}function xh(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,Ji(t.child,!1))}xh(t)}t=t.sibling}}function Tu(t){if(t.tag===30)t.stateNode.paired=null,Ji(t.child,!1),xh(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Tu(t),t=t.sibling;else xh(t)}function Cg(t){for(t=t.child;t!==null;)t.tag===30?Ji(t.child,!1):(t.subtreeFlags&33554432)!==0&&Cg(t),t=t.sibling}function yh(t,n,a,r,l,c,g){for(var A=!1;n!==null;){if(n.tag===5){var O=n.stateNode;if(c!==null&&Yn<c.length){var Q=c[Yn],lt=$h(O);(Q.view||lt.view)&&(A=!0);var St;if(St=(t.flags&4)===0)if(lt.clip)St=!0;else{St=Q.rect;var k=lt.rect;St=St.y!==k.y||St.x!==k.x||St.height!==k.height||St.width!==k.width}St&&(t.flags|=4),lt.abs?lt=!Q.abs:(Q=Q.rect,lt=lt.rect,lt=Q.height!==lt.height||Q.width!==lt.width),lt&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&b_(O,Yn===0?a:a+"_"+Yn,l),A&&(t.flags&4)!==0||(Qi===null&&(Qi=[]),Qi.push(O,Yn===0?r:r+"_"+Yn,n.memoizedProps)),Yn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&g?t.flags|=n.flags&32:yh(t,n.child,a,r,l,c,g)&&(A=!0));n=n.sibling}return A}function wg(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,r=t.stateNode,l=ma(a,r),c=ga(a.default,a.update),g;g=t.memoizedState,t.memoizedState=null,r=t;var A=t.child;Yn=0,l=yh(r,A,l,l,c,g,!1),(t.flags&4)!==0&&l&&Ur(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&wg(t);t=t.sibling}}var Tn=!1,Fe=!1,ji=!1,Mh=!1,Dg=typeof WeakSet=="function"?WeakSet:Set,bn=null,$i=!1,Zo=!1,bu=!1,Eh=!1;function by(t,n,a){if(t=t.containerInfo,Zh=Gr,t=Om(t),uf(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var l=r.getSelection&&r.getSelection();if(l&&l.rangeCount!==0){r=l.anchorNode;var c=l.anchorOffset,g=l.focusNode;l=l.focusOffset;try{r.nodeType,g.nodeType}catch{r=null;break t}var A=0,O=-1,Q=-1,lt=0,St=0,k=t,at=null;e:for(;;){for(var Lt;k!==r||c!==0&&k.nodeType!==3||(O=A+c),k!==g||l!==0&&k.nodeType!==3||(Q=A+l),k.nodeType===3&&(A+=k.nodeValue.length),(Lt=k.firstChild)!==null;)at=k,k=Lt;for(;;){if(k===t)break e;if(at===r&&++lt===c&&(O=A),at===g&&++St===l&&(Q=A),(Lt=k.nextSibling)!==null)break;k=at,at=k.parentNode}k=Lt}r=O===-1||Q===-1?null:{start:O,end:Q}}else r=null}r=r||{start:0,end:0}}else r=null;for(Kh={focusedElem:t,selectionRange:r},Gr=!1,a=(a&335544064)===a,bn=n,n=a?9270:1024;bn!==null;){if(t=bn,a&&(r=t.deletions,r!==null))for(c=0;c<r.length;c++)a&&Sh(r[c]);if(t.alternate===null&&(t.flags&2)!==0)a&&Tg(t),Au(a);else{if(t.tag===22){if(r=t.alternate,t.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&Sh(r),Au(a);continue}else if(r!==null&&r.memoizedState!==null){a&&Tg(t),Au(a);continue}}r=t.child,(t.subtreeFlags&n)!==0&&r!==null?(r.return=t,bn=r):(a&&Rg(t),Au(a))}}ai=null}function Au(t){for(;bn!==null;){var n=bn,a=t,r=n.alternate,l=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&r!==null){a=void 0,l=r.memoizedProps,r=r.memoizedState;var c=n.stateNode;try{var g=Bs(n.type,l);a=c.getSnapshotBeforeUpdate(g,r),c.__reactInternalSnapshotBeforeUpdate=a}catch(A){Xe(n,n.return,A)}}break;case 3:if((l&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)nd(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":nd(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=ma(r.memoizedProps,r.stateNode),l=n.memoizedProps,l=ga(l.default,l.update),l!=="none"&&Er(r,a,l,r.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,bn=r;break}bn=n.return}}function Ug(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:ta(t,a),r&4&&Wo(5,a);break;case 1:if(ta(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(g){Xe(a,a.return,g)}else{var l=Bs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(l,n,t.__reactInternalSnapshotBeforeUpdate)}catch(g){Xe(a,a.return,g)}}r&64&&Sg(a),r&512&&Ki(a,a.return);break;case 3:if(ta(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{l0(t,n)}catch(g){Xe(a,a.return,g)}}break;case 27:n===null&&r&4&&Eg(a);case 26:case 5:ta(t,a),n===null&&r&4&&dh(a),r&512&&Ki(a,a.return);break;case 12:ta(t,a);break;case 31:ta(t,a),r&4&&Pg(t,a);break;case 13:ta(t,a),r&4&&Ig(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=zy.bind(null,a),vM(t,a))));break;case 22:if(r=a.memoizedState!==null||Tn,!r){var c=n!==null&&n.memoizedState!==null||Fe;n=Tn,l=Fe,Tn=r,(Fe=c)&&!l?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),Li(t,a,r)):ta(t,a),Tn=n,Fe=l}break;case 30:ta(t,a),r&512&&Ki(a,a.return);break;case 7:r&512&&Ki(a,a.return);default:ta(t,a)}}function Th(t,n){for(t=t.child;t!==null;)Ng(t,n),t=t.sibling}function Ng(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var l=t.stateNode,c=t.memoizedProps.style,g=c!=null&&c.hasOwnProperty("display")?c.display:null;l.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(O){Xe(t,t.return,O)}bh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,Se=!0}catch(O){Xe(t,t.return,O)}break;case 18:try{var A=t.stateNode;n?T_(A,!0):T_(t.stateNode,!1)}catch(O){Xe(t,t.return,O)}break;case 22:case 23:t.memoizedState===null&&Th(t,n);break;default:Th(t,n)}}function bh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,r=n;switch(a.tag){case 4:Ng(a,r);break t;case 22:a.memoizedState===null&&bh(a,r);break t;default:bh(a,r)}}t=t.sibling}}function Lg(t){var n=t.alternate;n!==null&&(t.alternate=null,Lg(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Zt(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var en=null,Zn=!1;function Ui(t,n,a){for(a=a.child;a!==null;)Og(t,n,a),a=a.sibling}function Og(t,n,a){if(Ht&&typeof Ht.onCommitFiberUnmount=="function")try{Ht.onCommitFiberUnmount(Jt,a)}catch{}switch(a.tag){case 26:Fe||Un(a,n),Ui(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Fe&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Fe||Un(a,n),Yo(a);var r=en,l=Zn;rs(a.type)&&(en=a.stateNode,Zn=!1),Ui(t,n,a),B_(a.stateNode,a.type,a.memoizedProps),en=r,Zn=l;break;case 5:Fe||Un(a,n),Yo(a);case 6:if(a.tag===6&&Yo(a),r=en,l=Zn,en=null,Ui(t,n,a),en=r,Zn=l,en!==null)if(Zn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(a.stateNode),Se=!0}catch(c){Xe(a,n,c)}else try{en.removeChild(a.stateNode),Se=!0}catch(c){Xe(a,n,c)}break;case 18:en!==null&&(Zn?(t=en,E_(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Vr(t)):E_(en,a.stateNode));break;case 4:r=en,l=Zn,en=a.stateNode.containerInfo,Zn=!0,Ui(t,n,a),en=r,Zn=l;break;case 0:case 11:case 14:case 15:$a(2,a,n),Fe||$a(4,a,n),Ui(t,n,a);break;case 1:Fe||(Un(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&xg(a,n,r)),Ui(t,n,a);break;case 21:Ui(t,n,a);break;case 22:Fe=(r=Fe)||a.memoizedState!==null,Ui(t,n,a),Fe=r;break;case 30:Un(a,n),Ui(t,n,a);break;case 7:Fe||Un(a,n),Ui(t,n,a);break;default:Ui(t,n,a)}}function Pg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Vr(t)}catch(a){Xe(n,n.return,a)}}}function Ig(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Vr(t)}catch(a){Xe(n,n.return,a)}}function Ay(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Dg),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Dg),n;default:throw Error(s(435,t.tag))}}function Ru(t,n){var a=Ay(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var l=By.bind(null,t,r);r.then(l,l)}})}function Gn(t,n,a){var r=n.deletions;if(r!==null)for(var l=0;l<r.length;l++){var c=r[l],g=t,A=n,O=A;t:for(;O!==null;){switch(O.tag){case 27:if(rs(O.type)){en=O.stateNode,Zn=!1;break t}break;case 5:en=O.stateNode,Zn=!1;break t;case 3:case 4:en=O.stateNode.containerInfo,Zn=!0;break t}O=O.return}if(en===null)throw Error(s(160));Og(g,A,c),en=null,Zn=!1,g=c.alternate,g!==null&&(g.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)zg(n,t,a),n=n.sibling}var Ni=null;function zg(t,n,a){var r=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(l&4&&(r=t.updateQueue,r=r!==null?r.events:null,r!==null))for(var c=0;c<r.length;c++){var g=r[c];g.ref.impl=g.nextImpl}Gn(n,t,a),Vn(t),l&4&&($a(3,t,t.return),Wo(3,t),$a(5,t,t.return));break;case 1:Gn(n,t,a),Vn(t),l&512&&(Fe||r===null||Un(r,r.return)),l&64&&Tn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(c=Ni,Gn(n,t,a),Vn(t),l&512&&(Fe||r===null||Un(r,r.return)),l&4)if(l=r!==null?r.memoizedState:null,a=t.memoizedState,r===null)if(a===null)if(t.stateNode===null)if(Tn)t.stateNode=x_(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,l=c.ownerDocument||c;e:switch(n){case"title":r=l.getElementsByTagName("title")[0],(!r||r[Nt]||r[b]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=l.createElement(n),l.head.insertBefore(r,l.querySelector("head > title"))),Nn(r,n,a),r[b]=t,ve(r),n=r;break t;case"link":if(c=X_("link","href",l).get(n+(a.href||""))){for(g=0;g<c.length;g++)if(r=c[g],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(g,1);break e}}r=l.createElement(n),Nn(r,n,a),l.head.appendChild(r);break;case"meta":if(c=X_("meta","content",l).get(n+(a.content||""))){for(g=0;g<c.length;g++)if(r=c[g],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(g,1);break e}}r=l.createElement(n),Nn(r,n,a),l.head.appendChild(r);break;default:throw Error(s(468,n))}r[b]=t,ve(r),n=r}t.stateNode=n}else Tn||ud(c,t.type,t.stateNode);else t.stateNode=k_(c,a,t.memoizedProps);else l!==a?(l===null?(n=r.stateNode,n===null||Fe||n.parentNode.removeChild(n)):l.count--,a===null?Tn||ud(c,t.type,t.stateNode):k_(c,a,t.memoizedProps)):a===null&&t.stateNode!==null&&ph(t,t.memoizedProps,r.memoizedProps);break;case 27:Gn(n,t,a),Vn(t),l&512&&(Fe||r===null||Un(r,r.return)),r!==null&&l&4&&ph(t,t.memoizedProps,r.memoizedProps);break;case 5:if(c=ji,ji=!1,Gn(n,t,a),ji=c,Vn(t),l&512&&(Fe||r===null||Un(r,r.return)),t.flags&32){n=t.stateNode;try{sr(n,""),Se=!0}catch(lt){Xe(t,t.return,lt)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,ph(t,n,r!==null?r.memoizedProps:n)),l&1024&&(Mh=!0);break;case 6:if(Gn(n,t,a),Vn(t),l&4){if(t.stateNode===null)throw Error(s(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,Se=!0}catch(lt){Xe(t,t.return,lt)}}break;case 3:if(Se=!1,Vu=null,c=Ni,Ni=il(n.containerInfo),Gn(n,t,a),Ni=c,Vn(t),l&4&&r!==null&&r.memoizedState.isDehydrated)try{Vr(n.containerInfo)}catch(lt){Xe(t,t.return,lt)}Mh&&(Mh=!1,Bg(t)),Se=!1;break;case 4:l=ji,ji=Tn,r=Ie(),c=Ni,Ni=il(t.stateNode.containerInfo),Gn(n,t,a),Vn(t),Ni=c,Se&&Zo&&(bu=!0),Se=r,ji=l;break;case 12:Gn(n,t,a),Vn(t);break;case 31:Gn(n,t,a),Vn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ru(t,n)));break;case 13:Gn(n,t,a),Vn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Du=Vt()),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ru(t,n)));break;case 22:c=t.memoizedState!==null,g=r!==null&&r.memoizedState!==null;var A=Tn,O=Fe,Q=ji;Tn=A||c,ji=Q||c,Fe=O||g,Gn(n,t,a),Fe=O,ji=Q,Tn=A,Vn(t),l&8192&&(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,!c||r===null||g||Tn||Fe||(n=g||Fe,a=Tn,r=Fe,Tn=c||Tn,Fe=n,ts(t,2),Tn=a,Fe=r),!c&&ji||Th(t,c)),l&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Ru(t,a))));break;case 19:Gn(n,t,a),Vn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ru(t,n)));break;case 30:l&512&&(Fe||r===null||Un(r,r.return)),l=Ie(),c=Zo,g=(a&335544064)===a,A=t.memoizedProps,Zo=g&&ga(A.default,A.update)!=="none",Gn(n,t,a),Vn(t),g&&r!==null&&Se&&(t.flags|=4),Zo=c,Se=l;break;case 21:break;case 7:l&512&&(Fe||r===null||Un(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=t);default:Gn(n,t,a),Vn(t)}}function Vn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(Mg(r)){a=r;break}r=r.return}r=null;for(var l=t.return;l!==null;){if(hh(l)){var c=l.stateNode;r===null?r=[c]:r.push(c)}if(fh(l))break;l=l.return}var g=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var A=a.stateNode,O=mh(t);yu(t,O,A,g);break;case 5:var Q=a.stateNode;a.flags&32&&(sr(Q,""),a.flags&=-33);var lt=mh(t);yu(t,lt,Q,g);break;case 3:case 4:var St=a.stateNode.containerInfo,k=mh(t);gh(t,k,St,g);break;default:throw Error(s(161))}}catch(at){Xe(t,t.return,at)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function Bg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;Bg(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Gr=!0,n.reset(),Gr=!1),t=t.sibling}}function Tr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)Fg(n,t),n=n.sibling;else wg(n)}function Fg(t,n){var a=t.alternate;if(a===null)_h(t,!1);else switch(t.tag){case 3:if(Eh=$i=!1,bg(),Tr(n,t),!$i&&!bu){if(t=Qi,t!==null)for(var r=0;r<t.length;r+=3){a=t[r];var l=t[r+1];A_(a,t[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+l+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Eh=!0}Qi=null;break;case 5:Tr(n,t);break;case 4:r=$i,$i=!1,Tr(n,t),$i&&(bu=!0),$i=r;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?_h(t,!1):Tr(n,t));break;case 30:r=$i,l=bg(),$i=!1,Tr(n,t),$i&&(t.flags|=4);var c=t.memoizedProps,g=t.stateNode;n=ma(c,g),g=ma(a.memoizedProps,g);var A=ga(c.default,c.update);A==="none"?n=!1:(c=a.memoizedState,a.memoizedState=null,a=t.child,Yn=0,n=yh(t,a,n,g,A,c,!0),Yn!==(c===null?0:c.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Ur(t,t.memoizedProps.onUpdate),Qi=l):l!==null&&(l.push.apply(l,Qi),Qi=l),$i=(t.flags&32)!==0?!0:r;break;default:Tr(n,t)}}function ta(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Ug(t,n.alternate,n),n=n.sibling}function ts(t,n){for(t=t.child;t!==null;){var a=t,r=n;switch(a.tag){case 0:case 11:case 14:case 15:$a(4,a,a.return),ts(a,r);break;case 1:Un(a,a.return);var l=a.stateNode;typeof l.componentWillUnmount=="function"&&xg(a,a.return,l),ts(a,r);break;case 27:(r&2)!==0&&B_(a.stateNode,a.type,a.memoizedProps);case 5:Un(a,a.return),a.tag!==5&&a.tag!==27||Yo(a),ts(a,r);break;case 6:Yo(a);break;case 26:Un(a,a.return),l=a.stateNode,a.memoizedState!==null||l===null||Fe||l.parentNode.removeChild(l),ts(a,r);break;case 22:a.memoizedState===null&&ts(a,r);break;case 30:Un(a,a.return),ts(a,r);break;case 7:Un(a,a.return);default:ts(a,r)}t=t.sibling}}function Li(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,l=t,c=n,g=c.flags,A=(a&1)!==0;switch(c.tag){case 0:case 11:case 15:Li(l,c,a),Wo(4,c);break;case 1:if(Li(l,c,a),r=c,l=r.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(lt){Xe(r,r.return,lt)}if(r=c,l=r.updateQueue,l!==null){var O=r.stateNode;try{var Q=l.shared.hiddenCallbacks;if(Q!==null)for(l.shared.hiddenCallbacks=null,l=0;l<Q.length;l++)o0(Q[l],O)}catch(lt){Xe(r,r.return,lt)}}A&&g&64&&Sg(c),Ki(c,c.return);break;case 27:(a&2)!==0&&Eg(c);case 5:c.tag!==5&&c.tag!==27||yg(c),Li(l,c,a),A&&r===null&&g&4&&dh(c),Ki(c,c.return);break;case 6:yg(c);break;case 26:O=c.stateNode,c.memoizedState!==null||O===null||Tn||ud(il(O.ownerDocument),c.type,O),Li(l,c,a),A&&r===null&&g&4&&dh(c),Ki(c,c.return);break;case 12:Li(l,c,a);break;case 31:Li(l,c,a),A&&g&4&&Pg(l,c);break;case 13:Li(l,c,a),A&&g&4&&Ig(l,c);break;case 22:c.memoizedState===null&&Li(l,c,a),Ki(c,c.return);break;case 30:Li(l,c,a),Ki(c,c.return);break;case 7:Ki(c,c.return);default:Li(l,c,a)}n=n.sibling}}function Ah(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Lo(a))}function Rh(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Lo(t))}function yi(t,n,a,r){var l=(a&335544064)===a;if(n.subtreeFlags&(l?10262:10256))for(n=n.child;n!==null;)Hg(t,n,a,r),n=n.sibling;else l&&Cg(n)}function Hg(t,n,a,r){var l=(a&335544064)===a;l&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Tu(n);var c=n.flags;switch(n.tag){case 0:case 11:case 15:yi(t,n,a,r),c&2048&&Wo(9,n);break;case 1:yi(t,n,a,r);break;case 3:yi(t,n,a,r),l&&Eh&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),c&2048&&(c=null,n.alternate!==null&&(c=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==c&&(n.refCount++,c!=null&&Lo(c)));break;case 12:if(c&2048){yi(t,n,a,r),c=n.stateNode;try{var g=n.memoizedProps,A=g.id,O=g.onPostCommit;typeof O=="function"&&O(A,n.alternate===null?"mount":"update",c.passiveEffectDuration,-0)}catch(Q){Xe(n,n.return,Q)}}else yi(t,n,a,r);break;case 31:yi(t,n,a,r);break;case 13:yi(t,n,a,r);break;case 23:break;case 22:g=n.stateNode,A=n.alternate,n.memoizedState!==null?(l&&A!==null&&A.memoizedState===null&&Tu(A),g._visibility&2?yi(t,n,a,r):Ko(t,n)):(l&&A!==null&&A.memoizedState!==null&&Tu(n),g._visibility&2?yi(t,n,a,r):(g._visibility|=2,br(t,n,a,r,(n.subtreeFlags&10256)!==0||!1))),c&2048&&Ah(A,n);break;case 24:yi(t,n,a,r),c&2048&&Rh(n.alternate,n);break;case 30:l&&(c=n.alternate,c!==null&&(Ji(c.child,!0),Ji(n.child,!0))),yi(t,n,a,r);break;default:yi(t,n,a,r)}}function br(t,n,a,r,l){for(l=l&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=t,g=n,A=a,O=r,Q=g.flags;switch(g.tag){case 0:case 11:case 15:br(c,g,A,O,l),Wo(8,g);break;case 23:break;case 22:var lt=g.stateNode;g.memoizedState!==null?lt._visibility&2?br(c,g,A,O,l):Ko(c,g):(lt._visibility|=2,br(c,g,A,O,l)),l&&Q&2048&&Ah(g.alternate,g);break;case 24:br(c,g,A,O,l),l&&Q&2048&&Rh(g.alternate,g);break;default:br(c,g,A,O,l)}n=n.sibling}}function Ko(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,l=r.flags;switch(r.tag){case 22:Ko(a,r),l&2048&&Ah(r.alternate,r);break;case 24:Ko(a,r),l&2048&&Rh(r.alternate,r);break;default:Ko(a,r)}n=n.sibling}}var Fs=8192;function Hs(t,n,a){if(t.subtreeFlags&Fs)for(t=t.child;t!==null;)Gg(t,n,a),t=t.sibling}function Gg(t,n,a){switch(t.tag){case 26:Hs(t,n,a),t.flags&Fs&&(t.memoizedState!==null?NM(a,Ni,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&Z_(a,t)));break;case 5:Hs(t,n,a),t.flags&Fs&&(t=t.stateNode,(n&335544128)===n&&Z_(a,t));break;case 3:case 4:var r=Ni;Ni=il(t.stateNode.containerInfo),Hs(t,n,a),Ni=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=Fs,Fs=16777216,Hs(t,n,a),Fs=r):Hs(t,n,a));break;case 30:if((t.flags&Fs)!==0&&(r=t.memoizedProps.name,r!=null&&r!=="auto")){var l=t.stateNode;l.paired=null,ai===null&&(ai=new Map),ai.set(r,l)}Hs(t,n,a);break;default:Hs(t,n,a)}}function Vg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Qo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];bn=r,Xg(r,t)}Vg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)kg(t),t=t.sibling}function kg(t){switch(t.tag){case 0:case 11:case 15:Qo(t),t.flags&2048&&$a(9,t,t.return);break;case 3:Qo(t);break;case 12:Qo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Cu(t)):Qo(t);break;default:Qo(t)}}function Cu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];bn=r,Xg(r,t)}Vg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:$a(8,n,n.return),Cu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Cu(n));break;default:Cu(n)}t=t.sibling}}function Xg(t,n){for(;bn!==null;){var a=bn;switch(a.tag){case 0:case 11:case 15:$a(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Lo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,bn=r;else t:for(a=t;bn!==null;){r=bn;var l=r.sibling,c=r.return;if(Lg(r),r===a){bn=null;break t}if(l!==null){l.return=c,bn=l;break t}bn=c}}}var Ry={getCacheForType:function(t){var n=Cn(dn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Cn(dn).controller.signal}},Cy=typeof WeakMap=="function"?WeakMap:Map,ze=0,Qe=null,Te=null,Re=0,ke=0,si=null,es=!1,Ar=!1,Ch=!1,ba=0,ln=0,ns=0,Gs=0,wu=0,ri=0,Rr=0,Jo=null,Kn=null,wh=!1,Du=0,qg=0,Uu=1/0,Nu=null,is=null,an=0,Oi=null,Vs=null,ea=0,Dh=0,Uh=null,Wg=null,Cr=null,wr=null,Dr=null,jo=0,Lu=null;function oi(){return(ze&2)!==0&&Re!==0?Re&-Re:_t.T!==null?Gh():Ul()}function Yg(){if(ri===0)if((Re&536870912)===0||xe){var t=ys;ys<<=1,(ys&3932160)===0&&(ys=262144),ri=t}else ri=536870912;return t=wn.current,t!==null&&(t.flags|=32),ri}function Ur(t,n){if(n!=null){var a=t.stateNode,r=a.ref;r===null&&(r=a.ref=R_(ma(t.memoizedProps,a))),wr===null&&(wr=[]),wr.push(n.bind(null,r))}}function Qn(t,n,a){(t===Qe&&(ke===2||ke===9)||t.cancelPendingCommit!==null)&&(Nr(t,0),as(t,Re,ri,!1)),Xi(t,a),((ze&2)===0||t!==Qe)&&(t===Qe&&((ze&2)===0&&(Gs|=a),ln===4&&as(t,Re,ri,!1)),na(t))}function Zg(t,n,a){if((ze&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Fa(t,n),l=r?Uy(t,n):Lh(t,n,!0),c=r;do{if(l===0){Ar&&!r&&as(t,n,0,!1);break}else{if(a=t.current.alternate,c&&!wy(a)){l=Lh(t,n,!1),c=!1;continue}if(l===2){if(c=n,t.errorRecoveryDisabledLanes&c)var g=0;else g=t.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var A=t;l=Jo;var O=A.current.memoizedState.isDehydrated;if(O&&(Nr(A,g).flags|=256),g=Lh(A,g,!1),g!==2&&g!==6){if(Ch&&!O){A.errorRecoveryDisabledLanes|=c,Gs|=c,l=4;break t}c=Kn,Kn=l,c!==null&&(Kn===null?Kn=c:Kn.push.apply(Kn,c))}l=g}if(c=!1,l!==2)continue}}if(l===1){Nr(t,0),as(t,n,0,!0);break}t:{switch(r=t,c=l,c){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:as(r,n,ri,!es);break t;case 2:Kn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(l=Du+300-Vt(),10<l)){if(as(r,n,ri,!es),Ms(r,0,!0)!==0)break t;ea=n,r.timeoutHandle=jh(Kg.bind(null,r,a,Kn,Nu,wh,n,ri,Gs,Rr,es,c,"Throttled",-0,0),l);break t}Kg(r,a,Kn,Nu,wh,n,ri,Gs,Rr,es,c,null,-0,0)}}break}while(!0);na(t)}function Kg(t,n,a,r,l,c,g,A,O,Q,lt,St,k,at){t.timeoutHandle=-1;var Lt=n.subtreeFlags,Kt=(c&335544064)===c;if(St=null,(Kt||Lt&8192||(Lt&16785408)===16785408)&&(St={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Wi},ai=null,Gg(n,c,St),Kt&&(Lt=St,Kt=t.containerInfo,Kt=(Kt.nodeType===9?Kt:Kt.ownerDocument).__reactViewTransition,Kt!=null&&(Lt.count++,Lt.waitingForViewTransition=!0,Lt=rl.bind(Lt),Kt.finished.then(Lt,Lt))),Lt=(c&62914560)===c?Du-Vt():(c&4194048)===c?qg-Vt():0,Lt=LM(St,Lt),Lt!==null)){ea=c,t.cancelPendingCommit=Lt(i_.bind(null,t,n,c,a,r,l,g,A,O,Q,lt,St,null,k,at)),as(t,c,g,!Q);return}i_(t,n,c,a,r,l,g,A,O,Q,lt,St)}function wy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var l=a[r],c=l.getSnapshot;l=l.value;try{if(!ni(c(),l))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function as(t,n,a,r){n=ki(t,n),n&=~wu,n&=~Gs,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var l=n;0<l;){var c=31-ce(l),g=1<<c;r[c]=-1,l&=~g}a!==0&&Es(t,a,n)}function Ou(){return(ze&6)===0?($o(0),!1):!0}function Nh(){if(Te!==null){if(ke===0)var t=Te.return;else t=Te,Sa=ws=null,Hf(t),vr=null,Io=0,t=Te;for(;t!==null;)vg(t.alternate,t),t=t.return;Te=null}}function Nr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,$y(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ea=0,Nh(),Qe=t,Te=a=_a(t.current,null),Re=n,ke=0,si=null,es=!1,Ar=Fa(t,n),Ch=!1,Rr=ri=wu=Gs=ns=ln=0,Kn=Jo=null,wh=!1,ba=ki(t,n),Vl(),a}function Qg(t,n){de=null,_t.H=du,n===_r||n===$l?(n=i0(),ke=3):n===Rf?(n=i0(),ke=4):ke=n===eh?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,si=n,Te===null&&(ln=1,pu(t,_i(n,t.current)))}function Jg(){var t=wn.current;return t===null?!0:(Re&4194048)===Re?Pn===null:(Re&62914560)===Re||(Re&536870912)!==0?t===Pn:!1}function jg(){var t=_t.H;return _t.H=du,t===null?du:t}function $g(){var t=_t.A;return _t.A=Ry,t}function Pu(){ln=4,es||(Re&4194048)!==Re&&wn.current!==null||(Ar=!0),(ns&134217727)===0&&(Gs&134217727)===0||Qe===null||as(Qe,Re,ri,!1)}function Lh(t,n,a){var r=ze;ze|=2;var l=jg(),c=$g();(Qe!==t||Re!==n)&&(Nu=null,Nr(t,n)),n=!1;var g=ln;t:do try{if(ke!==0&&Te!==null){var A=Te,O=si;switch(ke){case 8:Nh(),g=6;break t;case 3:case 2:case 9:case 6:wn.current===null&&(n=!0);var Q=ke;if(ke=0,si=null,Lr(t,A,O,Q),a&&Ar){g=0;break t}break;default:Q=ke,ke=0,si=null,Lr(t,A,O,Q)}}Dy(),g=ln;break}catch(lt){Qg(t,lt)}while(!0);return n&&t.shellSuspendCounter++,Sa=ws=null,ze=r,_t.H=l,_t.A=c,Te===null&&(Qe=null,Re=0,Vl()),g}function Dy(){for(;Te!==null;)t_(Te)}function Uy(t,n){var a=ze;ze|=2;var r=jg(),l=$g();Qe!==t||Re!==n?(Nu=null,Uu=Vt()+500,Nr(t,n)):Ar=Fa(t,n);t:do try{if(ke!==0&&Te!==null){n=Te;var c=si;e:switch(ke){case 1:ke=0,si=null,Lr(t,n,c,1);break;case 2:case 9:if(e0(c)){ke=0,si=null,e_(n);break}n=function(){ke!==2&&ke!==9||Qe!==t||(ke=7),na(t)},c.then(n,n);break t;case 3:ke=7;break t;case 4:ke=5;break t;case 7:e0(c)?(ke=0,si=null,e_(n)):(ke=0,si=null,Lr(t,n,c,7));break;case 5:var g=null;switch(Te.tag){case 26:g=Te.memoizedState;case 5:case 27:var A=Te;if(g?W_(g):A.stateNode.complete){ke=0,si=null;var O=A.sibling;if(O!==null)Te=O;else{var Q=A.return;Q!==null?(Te=Q,Iu(Q)):Te=null}break e}}ke=0,si=null,Lr(t,n,c,5);break;case 6:ke=0,si=null,Lr(t,n,c,6);break;case 8:Nh(),ln=6;break t;default:throw Error(s(462))}}Ny();break}catch(lt){Qg(t,lt)}while(!0);return Sa=ws=null,_t.H=r,_t.A=l,ze=a,Te!==null?0:(Qe=null,Re=0,Vl(),ln)}function Ny(){for(;Te!==null&&!Pt();)t_(Te)}function t_(t){var n=gg(t.alternate,t,ba);t.memoizedProps=t.pendingProps,n===null?Iu(t):Te=n}function e_(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=ug(a,n,n.pendingProps,n.type,void 0,Re);break;case 11:n=ug(a,n,n.pendingProps,n.type.render,n.ref,Re);break;case 5:Hf(n);var r=n;r===En&&(xe?(Zl(r),r.tag===5&&r.stateNode!=null&&(je=r.stateNode)):(Zl(r),xe=!0));default:vg(a,n),n=Te=Xm(n,ba),n=gg(a,n,ba)}t.memoizedProps=t.pendingProps,n===null?Iu(t):Te=n}function Lr(t,n,a,r){Sa=ws=null,Hf(n),vr=null,Io=0;var l=n.return;try{if(Sy(t,l,n,a,Re)){ln=1,pu(t,_i(a,t.current)),Te=null;return}}catch(c){if(l!==null)throw Te=l,c;ln=1,pu(t,_i(a,t.current)),Te=null;return}n.flags&32768?(xe||r===1?t=!0:Ar||(Re&536870912)!==0?t=!1:(es=t=!0,(r===2||r===9||r===3||r===6)&&(r=wn.current,r!==null&&r.tag===13&&(r.flags|=16384))),n_(n,t)):Iu(n)}function Iu(t){var n=t;do{if((n.flags&32768)!==0){n_(n,es);return}t=n.return;var a=Ey(n.alternate,n,ba);if(a!==null){Te=a;return}if(n=n.sibling,n!==null){Te=n;return}Te=n=t}while(n!==null);ln===0&&(ln=5)}function n_(t,n){do{var a=Ty(t.alternate,t);if(a!==null){a.flags&=32767,Te=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Te=t;return}Te=t=a}while(t!==null);ln=6,Te=null}function i_(t,n,a,r,l,c,g,A,O,Q,lt,St){t.cancelPendingCommit=null;do zu();while(an!==0);if((ze&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));t===Qe&&(Te=Qe=null,Re=0),Vs=n,Oi=t,ea=a,Uh=l,Wg=r,Ly(t,n,a,g,A,O,St)}}function Ly(t,n,a,r,l,c,g){var A=n.lanes|n.childLanes;if(Dh=A,A|=pf,Dl(t,a,A,r,l,c),wr=null,(a&335544064)===a?(Dr=oy(t),r=10262):(Dr=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(t.callbackNode=null,t.callbackPriority=0,Fy(Ct,function(){return zh(),null})):(t.callbackNode=null,t.callbackPriority=0),Mu=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=_t.T,_t.T=null,l=Rt.p,Rt.p=2,c=ze,ze|=4;try{by(t,n,a)}finally{ze=c,Rt.p=l,_t.T=r}}an=1,Mu?Cr=sM(g,t.containerInfo,Dr,Oh,Ph,Py,Ih,zh,Oy):(Oh(),Ph(),Ih())}function Oy(t){if(an!==0){var n=Oi.onRecoverableError;n(t,{componentStack:null})}}function Py(){an===3&&(an=0,Fg(Vs,Oi),an=4)}function Oh(){if(an===1){an=0;var t=Oi,n=Vs,a=ea,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=_t.T,_t.T=null;var l=Rt.p;Rt.p=2;var c=ze;ze|=4;try{Zo=bu=!1,zg(n,t,a),a=Kh;var g=Om(t.containerInfo),A=a.focusedElem,O=a.selectionRange;if(g!==A&&A&&A.ownerDocument&&Lm(A.ownerDocument.documentElement,A)){if(O!==null&&uf(A)){var Q=O.start,lt=O.end;if(lt===void 0&&(lt=Q),"selectionStart"in A)A.selectionStart=Q,A.selectionEnd=Math.min(lt,A.value.length);else{var St=A.ownerDocument||document,k=St&&St.defaultView||window;if(k.getSelection){var at=k.getSelection(),Lt=A.textContent.length,Kt=Math.min(O.start,Lt),pe=O.end===void 0?Kt:Math.min(O.end,Lt);!at.extend&&Kt>pe&&(g=pe,pe=Kt,Kt=g);var Z=Nm(A,Kt),F=Nm(A,pe);if(Z&&F&&(at.rangeCount!==1||at.anchorNode!==Z.node||at.anchorOffset!==Z.offset||at.focusNode!==F.node||at.focusOffset!==F.offset)){var tt=St.createRange();tt.setStart(Z.node,Z.offset),at.removeAllRanges(),Kt>pe?(at.addRange(tt),at.extend(F.node,F.offset)):(tt.setEnd(F.node,F.offset),at.addRange(tt))}}}}for(St=[],at=A;at=at.parentNode;)at.nodeType===1&&St.push({element:at,left:at.scrollLeft,top:at.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<St.length;A++){var vt=St[A];vt.element.scrollLeft=vt.left,vt.element.scrollTop=vt.top}}Gr=!!Zh,Kh=Zh=null}finally{ze=c,Rt.p=l,_t.T=r}}t.current=n,an=2}}function Ph(){if(an===2){an=0;var t=Oi,n=Vs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=_t.T,_t.T=null;var r=Rt.p;Rt.p=2;var l=ze;ze|=4;try{Ug(t,n.alternate,n)}finally{ze=l,Rt.p=r,_t.T=a}}an=3}}function Ih(){if(an===4||an===3){an=0;var t=Cr;Cr=null,Ot();var n=Oi,a=Vs,r=ea,l=Wg,c=(r&335544064)===r?10262:10256;if((a.subtreeFlags&c)!==0||(a.flags&c)!==0?an=5:(an=0,Vs=Oi=null,a_(n,n.pendingLanes)),c=n.pendingLanes,c===0&&(is=null),yo(r),a=a.stateNode,Ht&&typeof Ht.onCommitFiberRoot=="function")try{Ht.onCommitFiberRoot(Jt,a,void 0,(a.current.flags&128)===128)}catch{}if(l!==null){a=_t.T,c=Rt.p,Rt.p=2,_t.T=null;try{for(var g=n.onRecoverableError,A=0;A<l.length;A++){var O=l[A];g(O.value,{componentStack:O.stack})}}finally{_t.T=a,Rt.p=c}}if(l=wr,g=Dr,Dr=null,l!==null&&(wr=null,g===null&&(g=[]),t!==null))for(O=0;O<l.length;O++)a=(0,l[O])(g),a!==void 0&&t.finished.finally(a);(ea&3)!==0&&zu(),na(n),c=n.pendingLanes,(r&261930)!==0&&(c&42)!==0?n===Lu?jo++:(jo=0,Lu=n):(jo=0,Lu=null),$o(0)}}function a_(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Lo(n)))}function zu(){return Cr!==null&&(Cr.skipTransition(),Cr=null),Oh(),Ph(),Ih(),zh()}function zh(){if(an!==5)return!1;var t=Oi,n=Dh;Dh=0;var a=yo(ea),r=_t.T,l=Rt.p;try{Rt.p=32>a?32:a,_t.T=null,a=Uh,Uh=null;var c=Oi,g=ea;if(an=0,Vs=Oi=null,ea=0,(ze&6)!==0)throw Error(s(331));var A=ze;if(ze|=4,kg(c.current),Hg(c,c.current,g,a),ze=A,$o(0,!1),Ht&&typeof Ht.onPostCommitFiberRoot=="function")try{Ht.onPostCommitFiberRoot(Jt,c)}catch{}return!0}finally{Rt.p=l,_t.T=r,a_(t,n)}}function s_(t,n,a){n=_i(a,n),n=th(t.stateNode,n,2),t=Ka(t,n,2),t!==null&&(Xi(t,2),na(t))}function Xe(t,n,a){if(t.tag===3)s_(t,t,a);else for(;n!==null;){if(n.tag===3){s_(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(is===null||!is.has(r))){t=_i(a,t),a=eg(2),r=Ka(n,a,2),r!==null&&(ng(a,r,n,t),Xi(r,2),na(r));break}}n=n.return}}function Bh(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new Cy;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(a)||(Ch=!0,l.add(a),t=Iy.bind(null,t,n,a),n.then(t,t))}function Iy(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Qe===t&&(Re&a)===a&&((ln===4||ln===3&&(Re&62914560)===Re&&300>Vt()-Du)&&(ze&2)===0?Nr(t,0):wu|=a,Rr===Re&&(Rr=0)),na(t)}function r_(t,n){n===0&&(n=_o()),t=As(t,n),t!==null&&(Xi(t,n),na(t))}function zy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),r_(t,a)}function By(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,l=t.memoizedState;l!==null&&(a=l.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),r_(t,a)}function Fy(t,n){return wt(t,n)}var Or=null,Pr=null,Fh=!1,Bu=!1,Hh=!1,ss=0;function na(t){t!==Pr&&t.next===null&&(Pr===null?Or=Pr=t:Pr=Pr.next=t),Bu=!0,Fh||(Fh=!0,Gy())}function $o(t,n){if(!Hh&&Bu){Hh=!0;do for(var a=!1,r=Or;r!==null;){if(t!==0){var l=r.pendingLanes;if(l===0)var c=0;else{var g=r.suspendedLanes,A=r.pingedLanes;c=(1<<31-ce(42|t)+1)-1,c&=l&~(g&~A),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(a=!0,c_(r,c))}else c=Re,c=Ms(r,r===Qe?c:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(c&3)===0||Fa(r,c)||(a=!0,c_(r,c));r=r.next}while(a);Hh=!1}}function Hy(){o_()}function o_(){Bu=Fh=!1;var t=0;ss!==0&&jy()&&(t=ss);for(var n=Vt(),a=null,r=Or;r!==null;){var l=r.next,c=l_(r,n);c===0?(r.next=null,a===null?Or=l:a.next=l,l===null&&(Pr=a)):(a=r,(t!==0||(c&3)!==0)&&(Bu=!0)),r=l}an!==0&&an!==5||$o(t),ss!==0&&(ss=0)}function l_(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,l=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var g=31-ce(c),A=1<<g,O=l[g];O===-1?((A&a)===0||(A&r)!==0)&&(l[g]=go(A,n)):O<=n&&(t.expiredLanes|=A),c&=~A}if(n=Qe,a=Re,a=Ms(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(ke===2||ke===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&jt(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Fa(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&jt(r),yo(a)){case 2:case 8:a=H;break;case 32:a=Ct;break;case 268435456:a=Ut;break;default:a=Ct}return r=u_.bind(null,t),a=wt(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&jt(r),t.callbackPriority=2,t.callbackNode=null,2}function u_(t,n){if(an!==0&&an!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(zu()&&t.callbackNode!==a)return null;var r=Re;return r=Ms(t,t===Qe?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(Zg(t,r,n),l_(t,Vt()),t.callbackNode!=null&&t.callbackNode===a?u_.bind(null,t):null)}function c_(t,n){if(zu())return null;Zg(t,n,!0)}function Gy(){tM(function(){(ze&6)!==0?wt(le,Hy):o_()})}function Gh(){if(ss===0){var t=Ns;t===0&&(t=nr,nr<<=1,(nr&261888)===0&&(nr=256)),ss=t}return ss}function f_(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ol(t)}function Vy(t,n,a,r,l){if(n==="submit"&&a&&a.stateNode===l){var c=f_((l[B]||null).action),g=r.submitter;g&&(n=(n=g[B]||null)?f_(n.formAction):g.getAttribute("formAction"),n!==null&&(c=n,g=null));var A=new Bl("action","action",null,r,l);t.push({event:A,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ss!==0){var O=new FormData(l,g);Kf(a,{pending:!0,data:O,method:l.method,action:c},null,O)}}else typeof c=="function"&&(A.preventDefault(),O=new FormData(l,g),Kf(a,{pending:!0,data:O,method:l.method,action:c},c,O))},currentTarget:l}]})}}for(var Vh=0;Vh<df.length;Vh++){var kh=df[Vh],ky=kh.toLowerCase(),Xy=kh[0].toUpperCase()+kh.slice(1);Di(ky,"on"+Xy)}Di(zm,"onAnimationEnd"),Di(Bm,"onAnimationIteration"),Di(Fm,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di($x,"onTransitionRun"),Di(ty,"onTransitionStart"),Di(ey,"onTransitionCancel"),Di(Hm,"onTransitionEnd"),sn("onMouseEnter",["mouseout","mouseover"]),sn("onMouseLeave",["mouseout","mouseover"]),sn("onPointerEnter",["pointerout","pointerover"]),sn("onPointerLeave",["pointerout","pointerover"]),Bt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Bt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Bt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Bt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Bt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Bt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(tl));function h_(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],l=r.event;r=r.listeners;t:{var c=void 0;if(n)for(var g=r.length-1;0<=g;g--){var A=r[g],O=A.instance,Q=A.currentTarget;if(A=A.listener,O!==c&&l.isPropagationStopped())break t;c=A,l.currentTarget=Q;try{c(l)}catch(lt){Gl(lt)}l.currentTarget=null,c=O}else for(g=0;g<r.length;g++){if(A=r[g],O=A.instance,Q=A.currentTarget,A=A.listener,O!==c&&l.isPropagationStopped())break t;c=A,l.currentTarget=Q;try{c(l)}catch(lt){Gl(lt)}l.currentTarget=null,c=O}}}}function be(t,n){var a=n[nt];a===void 0&&(a=n[nt]=new Set);var r=t+"__bubble";a.has(r)||(d_(n,t,2,!1),a.add(r))}function Xh(t,n,a){var r=0;n&&(r|=4),d_(a,t,r,n)}var Fu="_reactListening"+Math.random().toString(36).slice(2);function qh(t){if(!t[Fu]){t[Fu]=!0,Be.forEach(function(a){a!=="selectionchange"&&(qy.has(a)||Xh(a,!1,t),Xh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Fu]||(n[Fu]=!0,Xh("selectionchange",!1,n))}}function d_(t,n,a,r){switch(nv(n)){case 2:var l=zM;break;case 8:l=BM;break;default:l=fd}a=l.bind(null,n,a,t),l=void 0,!jc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?t.addEventListener(n,a,{capture:!0,passive:l}):t.addEventListener(n,a,!0):l!==void 0?t.addEventListener(n,a,{passive:l}):t.addEventListener(n,a,!1)}function Wh(t,n,a,r,l){var c=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var g=r.tag;if(g===3||g===4){var A=r.stateNode.containerInfo;if(A===l)break;if(g===4)for(g=r.return;g!==null;){var O=g.tag;if((O===3||O===4)&&g.stateNode.containerInfo===l)return;g=g.return}for(;A!==null;){if(g=ae(A),g===null)return;if(O=g.tag,O===5||O===6||O===26||O===27){r=c=g;continue t}A=A.parentNode}}r=r.return}dm(function(){var Q=c,lt=Qc(a),St=[];t:{var k=Gm.get(t);if(k!==void 0){var at=Bl,Lt=t;switch(t){case"keypress":if(Il(a)===0)break t;case"keydown":case"keyup":at=wx;break;case"focusin":Lt="focus",at=nf;break;case"focusout":Lt="blur",at=nf;break;case"beforeblur":case"afterblur":at=nf;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":at=gm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":at=_x;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":at=Ox;break;case zm:case Bm:case Fm:at=xx;break;case Hm:at=Ix;break;case"scroll":case"scrollend":at=mx;break;case"wheel":at=Bx;break;case"copy":case"cut":case"paste":at=Mx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":at=vm;break;case"submit":at=Nx;break;case"toggle":case"beforetoggle":at=Hx}var Kt=(n&4)!==0,pe=!Kt&&(t==="scroll"||t==="scrollend"),Z=Kt?k!==null?k+"Capture":null:k;Kt=[];for(var F=Q,tt;F!==null;){var vt=F;if(tt=vt.stateNode,vt=vt.tag,vt!==5&&vt!==26&&vt!==27||tt===null||Z===null||(vt=Mo(F,Z),vt!=null&&Kt.push(el(F,vt,tt))),pe)break;F=F.return}0<Kt.length&&(k=new at(k,Lt,null,a,lt),St.push({event:k,listeners:Kt}))}}if((n&7)===0){t:{if(at=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",at&&a!==Kc&&(Lt=a.relatedTarget||a.fromElement)&&(ae(Lt)||Lt[ut]))break t;(k||at)&&(Lt=lt.window===lt?lt:(at=lt.ownerDocument)?at.defaultView||at.parentWindow:window,k?(at=a.relatedTarget||a.toElement,k=Q,at=at?ae(at):null,at!==null&&(pe=f(at),Kt=at.tag,at!==pe||Kt!==5&&Kt!==27&&Kt!==6)&&(at=null)):(k=null,at=Q),k!==at&&(Kt=gm,vt="onMouseLeave",Z="onMouseEnter",F="mouse",(t==="pointerout"||t==="pointerover")&&(Kt=vm,vt="onPointerLeave",Z="onPointerEnter",F="pointer"),pe=k==null?Lt:Xt(k),tt=at==null?Lt:Xt(at),Lt=new Kt(vt,F+"leave",k,a,lt),Lt.target=pe,Lt.relatedTarget=tt,vt=null,ae(lt)===Q&&(Kt=new Kt(Z,F+"enter",at,a,lt),Kt.target=tt,Kt.relatedTarget=pe,vt=Kt),pe=vt,Kt=k&&at?N(k,at,Wy):null,k!==null&&p_(St,Lt,k,Kt,!1),at!==null&&pe!==null&&p_(St,pe,at,Kt,!0)))}t:{if(k=Q?Xt(Q):window,at=k.nodeName&&k.nodeName.toLowerCase(),at==="select"||at==="input"&&k.type==="file")var qt=Am;else if(Tm(k))if(Rm)qt=Qx;else{qt=Zx;var Ce=Yx}else at=k.nodeName,!at||at.toLowerCase()!=="input"||k.type!=="checkbox"&&k.type!=="radio"?Q&&Zc(Q.elementType)&&(qt=Am):qt=Kx;if(qt&&(qt=qt(t,Q))){bm(St,qt,a,lt);break t}Ce&&Ce(t,k,Q)}switch(Ce=Q?Xt(Q):window,t){case"focusin":(Tm(Ce)||Ce.contentEditable==="true")&&(ur=Ce,cf=Q,Do=null);break;case"focusout":Do=cf=ur=null;break;case"mousedown":ff=!0;break;case"contextmenu":case"mouseup":case"dragend":ff=!1,Pm(St,a,lt);break;case"selectionchange":if(jx)break;case"keydown":case"keyup":Pm(St,a,lt)}var $t;if(sf)t:{switch(t){case"compositionstart":var ie="onCompositionStart";break t;case"compositionend":ie="onCompositionEnd";break t;case"compositionupdate":ie="onCompositionUpdate";break t}ie=void 0}else lr?Mm(t,a)&&(ie="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(ie="onCompositionStart");ie&&(Sm&&a.locale!=="ko"&&(lr||ie!=="onCompositionStart"?ie==="onCompositionEnd"&&lr&&($t=pm()):(Ha=lt,$c="value"in Ha?Ha.value:Ha.textContent,lr=!0)),Ce=Hu(Q,ie),0<Ce.length&&(ie=new _m(ie,t,null,a,lt),St.push({event:ie,listeners:Ce}),$t?ie.data=$t:($t=Em(a),$t!==null&&(ie.data=$t)))),($t=Vx?kx(t,a):Xx(t,a))&&(ie=Hu(Q,"onBeforeInput"),0<ie.length&&(Ce=new _m("onBeforeInput","beforeinput",null,a,lt),St.push({event:Ce,listeners:ie}),Ce.data=$t)),Vy(St,t,Q,a,lt)}h_(St,n)})}function el(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Hu(t,n){for(var a=n+"Capture",r=[];t!==null;){var l=t,c=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||c===null||(l=Mo(t,a),l!=null&&r.unshift(el(t,l,c)),l=Mo(t,n),l!=null&&r.push(el(t,l,c))),t.tag===3)return r;t=t.return}return[]}function Wy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function p_(t,n,a,r,l){for(var c=n._reactName,g=[];a!==null&&a!==r;){var A=a,O=A.alternate,Q=A.stateNode;if(A=A.tag,O!==null&&O===r)break;A!==5&&A!==26&&A!==27||Q===null||(O=Q,l?(Q=Mo(a,c),Q!=null&&g.unshift(el(a,Q,O))):l||(Q=Mo(a,c),Q!=null&&g.push(el(a,Q,O)))),a=a.return}g.length!==0&&t.push({event:n,listeners:g})}var Yy=/\r\n?/g,Zy=/\u0000|\uFFFD/g;function m_(t){return(typeof t=="string"?t:""+t).replace(Yy,`
`).replace(Zy,"")}function g_(t,n){return n=m_(n),m_(t)===n}function qe(t,n,a,r,l,c){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||sr(t,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&sr(t,""+r);else return;break;case"className":ei(t,"class",r);break;case"tabIndex":ei(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ei(t,a,r);break;case"style":fm(t,r,c);return;case"data":if(n!=="object"){ei(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ol(r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(a==="formAction"?(n!=="input"&&qe(t,n,"name",l.name,l,null),qe(t,n,"formEncType",l.formEncType,l,null),qe(t,n,"formMethod",l.formMethod,l,null),qe(t,n,"formTarget",l.formTarget,l,null)):(qe(t,n,"encType",l.encType,l,null),qe(t,n,"method",l.method,l,null),qe(t,n,"target",l.target,l,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ol(r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=Wi);return;case"onScroll":r!=null&&be("scroll",t);return;case"onScrollEnd":r!=null&&be("scrollend",t);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(l.children!=null)throw Error(s(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Ol(r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":be("beforetoggle",t),be("toggle",t),Je(t,"popover",r);break;case"xlinkActuate":Ae(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Ae(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Ae(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Ae(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Ae(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Ae(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Ae(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Ae(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Ae(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Je(t,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=dx.get(a)||a,Je(t,a,r);else return}Se=!0}function Yh(t,n,a,r,l,c){switch(a){case"style":fm(t,r,c);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(l.children!=null)throw Error(s(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof r=="string")sr(t,r);else if(typeof r=="number"||typeof r=="bigint")sr(t,""+r);else return;break;case"onScroll":r!=null&&be("scroll",t);return;case"onScrollEnd":r!=null&&be("scrollend",t);return;case"onClick":r!=null&&(t.onclick=Wi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!vn.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),c=a.slice(2,l?a.length-7:void 0),n=t[B]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(c,n,l),typeof r=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(c,r,l);break t}Se=!0,a in t?t[a]=r:r===!0?t.setAttribute(a,""):Je(t,a,r)}return}Se=!0}function Nn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":be("error",t),be("load",t);var r=!1,l=!1,c;for(c in a)if(a.hasOwnProperty(c)){var g=a[c];if(g!=null)switch(c){case"src":r=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:qe(t,n,c,g,a,null)}}l&&qe(t,n,"srcSet",a.srcSet,a,null),r&&qe(t,n,"src",a.src,a,null);return;case"input":be("invalid",t);var A=c=g=l=null,O=null,Q=null;for(r in a)if(a.hasOwnProperty(r)){var lt=a[r];if(lt!=null)switch(r){case"name":l=lt;break;case"type":g=lt;break;case"checked":O=lt;break;case"defaultChecked":Q=lt;break;case"value":c=lt;break;case"defaultValue":A=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,n));break;default:qe(t,n,r,lt,a,null)}}om(t,c,A,O,Q,g,l,!1);return;case"select":be("invalid",t),r=g=c=null;for(l in a)if(a.hasOwnProperty(l)&&(A=a[l],A!=null))switch(l){case"value":c=A;break;case"defaultValue":g=A;break;case"multiple":r=A;default:qe(t,n,l,A,a,null)}n=c,a=g,t.multiple=!!r,n!=null?ar(t,!!r,n,!1):a!=null&&ar(t,!!r,a,!0);return;case"textarea":be("invalid",t),c=l=r=null;for(g in a)if(a.hasOwnProperty(g)&&(A=a[g],A!=null))switch(g){case"value":r=A;break;case"defaultValue":l=A;break;case"children":c=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(91));break;default:qe(t,n,g,A,a,null)}um(t,r,l,c);return;case"option":for(O in a)a.hasOwnProperty(O)&&(r=a[O],r!=null)&&(O==="selected"?t.selected=r&&typeof r!="function"&&typeof r!="symbol":qe(t,n,O,r,a,null));return;case"dialog":be("beforetoggle",t),be("toggle",t),be("cancel",t),be("close",t);break;case"iframe":case"object":be("load",t);break;case"video":case"audio":for(r=0;r<tl.length;r++)be(tl[r],t);break;case"image":be("error",t),be("load",t);break;case"details":be("toggle",t);break;case"embed":case"source":case"link":be("error",t),be("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Q in a)if(a.hasOwnProperty(Q)&&(r=a[Q],r!=null))switch(Q){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:qe(t,n,Q,r,a,null)}return;default:if(Zc(n)){for(lt in a)a.hasOwnProperty(lt)&&(r=a[lt],r!==void 0&&Yh(t,n,lt,r,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(r=a[A],r!=null&&qe(t,n,A,r,a,null))}var Ky={};function Qy(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,c=null,g=null,A=null,O=null,Q=null,lt=null;for(at in a){var St=a[at];if(a.hasOwnProperty(at)&&St!=null)switch(at){case"checked":break;case"value":break;case"defaultValue":O=St;default:r.hasOwnProperty(at)||qe(t,n,at,null,r,St)}}for(var k in r){var at=r[k];if(St=a[k],r.hasOwnProperty(k)&&(at!=null||St!=null))switch(k){case"type":at!==St&&(Se=!0),c=at;break;case"name":at!==St&&(Se=!0),l=at;break;case"checked":at!==St&&(Se=!0),Q=at;break;case"defaultChecked":at!==St&&(Se=!0),lt=at;break;case"value":at!==St&&(Se=!0),g=at;break;case"defaultValue":at!==St&&(Se=!0),A=at;break;case"children":case"dangerouslySetInnerHTML":if(at!=null)throw Error(s(137,n));break;default:at!==St&&qe(t,n,k,at,r,St)}}Wc(t,g,A,O,Q,lt,c,l);return;case"select":at=g=A=k=null;for(c in a)if(O=a[c],a.hasOwnProperty(c)&&O!=null)switch(c){case"value":break;case"multiple":at=O;default:r.hasOwnProperty(c)||qe(t,n,c,null,r,O)}for(l in r)if(c=r[l],O=a[l],r.hasOwnProperty(l)&&(c!=null||O!=null))switch(l){case"value":c!==O&&(Se=!0),k=c;break;case"defaultValue":c!==O&&(Se=!0),A=c;break;case"multiple":c!==O&&(Se=!0),g=c;default:c!==O&&qe(t,n,l,c,r,O)}n=A,a=g,r=at,k!=null?ar(t,!!a,k,!1):!!r!=!!a&&(n!=null?ar(t,!!a,n,!0):ar(t,!!a,a?[]:"",!1));return;case"textarea":at=k=null;for(A in a)if(l=a[A],a.hasOwnProperty(A)&&l!=null&&!r.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:qe(t,n,A,null,r,l)}for(g in r)if(l=r[g],c=a[g],r.hasOwnProperty(g)&&(l!=null||c!=null))switch(g){case"value":l!==c&&(Se=!0),k=l;break;case"defaultValue":l!==c&&(Se=!0),at=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(s(91));break;default:l!==c&&qe(t,n,g,l,r,c)}lm(t,k,at);return;case"option":for(var Lt in a)k=a[Lt],a.hasOwnProperty(Lt)&&k!=null&&!r.hasOwnProperty(Lt)&&(Lt==="selected"?t.selected=!1:qe(t,n,Lt,null,r,k));for(O in r)k=r[O],at=a[O],r.hasOwnProperty(O)&&k!==at&&(k!=null||at!=null)&&(O==="selected"?(k!==at&&(Se=!0),t.selected=k&&typeof k!="function"&&typeof k!="symbol"):qe(t,n,O,k,r,at));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Kt in a)k=a[Kt],a.hasOwnProperty(Kt)&&k!=null&&!r.hasOwnProperty(Kt)&&qe(t,n,Kt,null,r,k);for(Q in r)if(k=r[Q],at=a[Q],r.hasOwnProperty(Q)&&k!==at&&(k!=null||at!=null))switch(Q){case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(s(137,n));break;default:qe(t,n,Q,k,r,at)}return;default:if(Zc(n)){for(var pe in a)k=a[pe],a.hasOwnProperty(pe)&&k!==void 0&&!r.hasOwnProperty(pe)&&Yh(t,n,pe,void 0,r,k);for(lt in r)k=r[lt],at=a[lt],!r.hasOwnProperty(lt)||k===at||k===void 0&&at===void 0||Yh(t,n,lt,k,r,at);return}}for(var Z in a)k=a[Z],a.hasOwnProperty(Z)&&k!=null&&!r.hasOwnProperty(Z)&&qe(t,n,Z,null,r,k);for(St in r)k=r[St],at=a[St],!r.hasOwnProperty(St)||k===at||k==null&&at==null||qe(t,n,St,k,r,at)}function __(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Jy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var l=a[r],c=l.transferSize,g=l.initiatorType,A=l.duration;if(c&&A&&__(g)){for(g=0,A=l.responseEnd,r+=1;r<a.length;r++){var O=a[r],Q=O.startTime;if(Q>A)break;var lt=O.transferSize,St=O.initiatorType;lt&&__(St)&&(O=O.responseEnd,g+=lt*(O<A?1:(A-Q)/(O-Q)))}if(--r,n+=8*(c+g)/(l.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Zh=null,Kh=null;function nl(t){return t.nodeType===9?t:t.ownerDocument}function v_(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function S_(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function x_(t,n,a,r){return a=nl(a).createElement(t),a[b]=r,a[B]=n,Nn(a,t,n),ve(a),a}function Qh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Jh=null;function jy(){var t=window.event;return t&&t.type==="popstate"?t===Jh?!1:(Jh=t,!0):(Jh=null,!1)}var jh=typeof setTimeout=="function"?setTimeout:void 0,$y=typeof clearTimeout=="function"?clearTimeout:void 0,y_=typeof Promise=="function"?Promise:void 0,M_=typeof requestAnimationFrame=="function"?requestAnimationFrame:jh,tM=typeof queueMicrotask=="function"?queueMicrotask:typeof y_<"u"?function(t){return y_.resolve(null).then(t).catch(eM)}:jh;function eM(t){setTimeout(function(){throw t})}function rs(t){return t==="head"}function E_(t,n){var a=n,r=0;do{var l=a.nextSibling;if(t.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(l),Vr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")rd(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,rd(a);for(var c=a.firstChild;c;){var g=c.nextSibling,A=c.nodeName;c[Nt]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&c.rel.toLowerCase()==="stylesheet"||a.removeChild(c),c=g}}else a==="body"&&rd(t.ownerDocument.body);a=l}while(a);Vr(n)}function T_(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function b_(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var r=1;else for(var l=r=0;l<n.length;l++){var c=n[l];0<c.width&&0<c.height&&r++}r===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function A_(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function nM(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function $h(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return nM(n,a,t)}function iM(t){return t.documentElement.clientHeight}function aM(t){this.addEventListener("load",t),this.addEventListener("error",t)}function sM(t,n,a,r,l,c,g,A,O){var Q=n.nodeType===9?n:n.ownerDocument;try{var lt=Q.startViewTransition({update:function(){var k=Q.defaultView,at=k.navigation&&k.navigation.transition,Lt=Q.fonts.status;r();var Kt=[];if(Lt==="loaded"&&(iM(Q),Q.fonts.status==="loading"&&Kt.push(Q.fonts.ready)),Lt=Kt.length,t!==null)for(var pe=t.suspenseyImages,Z=0,F=0;F<pe.length;F++){var tt=pe[F];if(!tt.complete){var vt=tt.getBoundingClientRect();if(0<vt.bottom&&0<vt.right&&vt.top<k.innerHeight&&vt.left<k.innerWidth){if(Z+=Y_(tt),Z>ku){Kt.length=Lt;break}tt=new Promise(aM.bind(tt)),Kt.push(tt)}}}if(0<Kt.length)return k=Promise.race([Promise.all(Kt),new Promise(function(qt){return setTimeout(qt,500)})]).then(l,l),(at?Promise.allSettled([at.finished,k]):k).then(c,c);if(l(),at)return at.finished.then(c,c);c()},types:a});Q.__reactViewTransition=lt;var St=[];return lt.ready.then(function(){for(var k=Q.documentElement.getAnimations({subtree:!0}),at=0;at<k.length;at++){var Lt=k[at],Kt=Lt.effect,pe=Kt.pseudoElement;if(pe!=null&&pe.startsWith("::view-transition")){St.push(Lt),Lt=Kt.getKeyframes();for(var Z=pe=void 0,F=!0,tt=0;tt<Lt.length;tt++){var vt=Lt[tt],qt=vt.width;if(pe===void 0)pe=qt;else if(pe!==qt){F=!1;break}if(qt=vt.height,Z===void 0)Z=qt;else if(Z!==qt){F=!1;break}delete vt.width,delete vt.height,vt.transform==="none"&&delete vt.transform}F&&pe!==void 0&&Z!==void 0&&(Kt.setKeyframes(Lt),F=getComputedStyle(Kt.target,Kt.pseudoElement),F.width!==pe||F.height!==Z)&&(F=Lt[0],F.width=pe,F.height=Z,F=Lt[Lt.length-1],F.width=pe,F.height=Z,Kt.setKeyframes(Lt))}}g()},function(k){Q.__reactViewTransition===lt&&(Q.__reactViewTransition=null);try{typeof k=="object"&&k!==null&&k.name==="InvalidStateError"&&(k.message==="View transition was skipped because document visibility state is hidden."||k.message==="Skipping view transition because document visibility state has become hidden."||k.message==="Skipping view transition because viewport size changed."||k.message==="Transition was aborted because of invalid state")&&(k=null),k!==null&&O(k)}finally{r(),l(),g()}}),lt.finished.finally(function(){for(var k=0;k<St.length;k++)St[k].cancel();Q.__reactViewTransition===lt&&(Q.__reactViewTransition=null),A()}),lt}catch{return r(),l(),g(),null}}function ks(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}ks.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:P({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},ks.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),r=[],l=0;l<a.length;l++){var c=a[l].effect;c!==null&&c.target===t&&c.pseudoElement===n&&r.push(a[l])}return r},ks.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function R_(t){return{name:t,group:new ks("group",t),imagePair:new ks("image-pair",t),old:new ks("old",t),new:new ks("new",t)}}function li(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}li.prototype.addEventListener=function(t,n,a){var r=null,l=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var c=this._eventListeners;if(w_(c,t,n,a)===-1){var g=this,A=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(A=function(O){g.removeEventListener(t,n,a),typeof n=="function"?n.call(this,O):n.handleEvent(O)}),r!==null&&(l=g.removeEventListener.bind(g,t,n,a),r.addEventListener("abort",l,{once:!0}),l=r.removeEventListener.bind(r,"abort",l)),r=Ir(a),c.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:A,cleanup:l}),_(this._fragmentFiber.child,!1,rM,t,A,r)}this._eventListeners=c}};function rM(t,n,a,r){return M(t).addEventListener(n,a,r),!1}li.prototype.removeEventListener=function(t,n,a){var r=this._eventListeners;if(r!==null&&(n=w_(r,t,n,a),n!==-1)){var l=r[n];a=l.attachedListener;var c=l.cleanup;l=Ir(l.optionsOrUseCapture),_(this._fragmentFiber.child,!1,oM,t,a,l),r.splice(n,1),c!==null&&c()}};function oM(t,n,a,r){return M(t).removeEventListener(n,a,r),!1}function Ir(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function C_(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function w_(t,n,a,r){if(t.length===0)return-1;r=C_(r);for(var l=0;l<t.length;l++){var c=t[l];if(c.type===n&&c.listener===a&&C_(c.optionsOrUseCapture)===r)return l}return-1}li.prototype.dispatchEvent=function(t){var n=v(this._fragmentFiber);if(n===null)return!0;n=M(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var l=0;l<a.length;l++){var c=a[l];r.addEventListener(c.type,c.attachedListener,Ir(c.optionsOrUseCapture))}if(n.appendChild(r),t=r.dispatchEvent(t),a)for(l=0;l<a.length;l++)c=a[l],r.removeEventListener(c.type,c.attachedListener,Ir(c.optionsOrUseCapture));return n.removeChild(r),t}return n.dispatchEvent(t)},li.prototype.focus=function(t){_(this._fragmentFiber.child,!0,D_,t,void 0,void 0)};function D_(t,n){return t.tag===6?!1:(t=M(t),SM(t,n))}li.prototype.focusLast=function(t){var n=[];_(this._fragmentFiber.child,!0,td,n,void 0,void 0);for(var a=n.length-1;0<=a&&!D_(n[a],t);a--);};function td(t,n){return n.push(t),!1}li.prototype.blur=function(){var t=v(this._fragmentFiber);t!==null&&(t=M(t),t=nl(t).activeElement,t!==null&&_(this._fragmentFiber.child,!1,lM,t,void 0,void 0))};function lM(t,n){return t.tag===6?!1:(t=M(t),t===n||t.contains(n)?(n.blur(),!0):!1)}li.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),_(this._fragmentFiber.child,!1,uM,t,void 0,void 0)};function uM(t,n){return t.tag===6||(t=M(t),n.observe(t)),!1}li.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),_(this._fragmentFiber.child,!1,cM,t,void 0,void 0);for(var a=n=0;a<Pi.length;a++){var r=Pi[a];r.fragmentInstance===this&&r.observer===t?t.unobserve(r.instance):Pi[n++]=r}Pi.length=n}};function cM(t,n){return t.tag===6||(t=M(t),n.unobserve(t)),!1}var Pi=[],ed=!1;function fM(t,n,a){Pi.push({fragmentInstance:t,observer:n,instance:a}),ed||(ed=!0,xM(function(){ed=!1;var r=Pi;Pi=[];for(var l=0;l<r.length;l++){var c=r[l];c.observer.unobserve(c.instance)}}))}li.prototype.getClientRects=function(){var t=[];return _(this._fragmentFiber.child,!1,hM,t,void 0,void 0),t};function hM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=M(t),n.push.apply(n,t.getClientRects());return!1}li.prototype.getRootNode=function(t){var n=v(this._fragmentFiber);return n===null?this:M(n).getRootNode(t)},li.prototype.compareDocumentPosition=function(t){var n=v(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];_(this._fragmentFiber.child,!1,td,a,void 0,void 0);var r=M(n);if(a.length===0){if(a=r,E(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var l=r=a.compareDocumentPosition(t);return a===t?l=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=R(n)[1],a===null?l=Node.DOCUMENT_POSITION_PRECEDING:(t=M(a).compareDocumentPosition(t),l=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),l|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=M(a[0]),l=M(a[a.length-1]);var c=E(this._fragmentFiber)?n.parentElement:r;if(c==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=c.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,c=c.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY;var g=n.compareDocumentPosition(t),A=l.compareDocumentPosition(t),O=g&Node.DOCUMENT_POSITION_CONTAINED_BY||A&Node.DOCUMENT_POSITION_CONTAINED_BY;return A=r&&c&&g&Node.DOCUMENT_POSITION_FOLLOWING&&A&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===t||c&&l===t||O||A?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===t||!c&&l===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:g,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||dM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function dM(t,n,a,r,l){var c=ae(l);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!c)t:{for(;c!==null;){if(c.tag===7&&(c===n||c.alternate===n)){a=!0;break t}c=c.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(c===null)return c=l.ownerDocument,l===c||l===c.documentElement||l===c.body;t:{for(c=n,n=v(n);c!==null;){if(!(c.tag!==5&&c.tag!==3&&c.tag!==27||c!==n&&c.alternate!==n)){c=!0;break t}c=c.return}c=!1}return c}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!c)&&!(n=c===a)&&(n=N(a,c,U),n===null?n=!1:(_(n,!0,K,c,a),c=x,x=null,n=c!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!c)&&!(n=c===r)&&(n=N(r,c,U),n===null?n=!1:(_(n,!0,C,c,r),c=x,I=x=null,n=c!==null)),n):!1}function U_(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}li.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(s(566));var n=[];_(this._fragmentFiber.child,!1,td,n,void 0,void 0);var a=t!==!1;if(n.length===0){var r=R(this._fragmentFiber);if(r=a?r[1]||r[0]||v(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){t=M(r),U_(t,a);return}if(r=M(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(t);return}r.scrollIntoView(t)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var l=n[r];l.tag===6?(l=M(l),U_(l,a)):M(l).scrollIntoView(t),r+=a?-1:1}};function pM(t,n){return t=M(t),N_(t,n),!1}function N_(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function L_(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var l=a[r];t.addEventListener(l.type,l.attachedListener,Ir(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){for(var g=0,A=0;A<Pi.length;A++){var O=Pi[A];(O.fragmentInstance!==n||O.observer!==c||O.instance!==t)&&(Pi[g++]=O)}Pi.length=g,c.observe(t)}),N_(t,n))}function mM(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var l=a[r];t.removeEventListener(l.type,l.attachedListener,Ir(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){typeof c.rootMargin=="string"?fM(n,c,t):c.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function nd(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":nd(a),Zt(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function gM(t,n,a,r){for(;t.nodeType===1;){var l=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[Nt])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var c=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=Mi(t.nextSibling),t===null)break}return null}function _M(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Mi(t.nextSibling),t===null))return null;return t}function O_(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Mi(t.nextSibling),t===null))return null;return t}function id(t){return t.data==="$?"||t.data==="$~"}function ad(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function vM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function Mi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var sd=null;function P_(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Mi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function I_(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function SM(t,n){function a(){r=!0}if(t.ownerDocument.activeElement===t)return!0;var r=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return r}function xM(t){M_(function(){M_(function(n){return t(n)})})}function z_(t,n,a){switch(n=nl(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function B_(t,n,a){for(var r in a){var l=a[r];a.hasOwnProperty(r)&&l!=null&&qe(t,n,r,null,Ky,l)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Wi&&(t.onclick=null),Zt(t)}function rd(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Zt(t)}var Ei=new Map,F_=new Set;function il(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var Aa=Rt.d;Rt.d={f:yM,r:MM,D:EM,C:TM,L:bM,m:AM,X:CM,S:RM,M:wM};function yM(){var t=Aa.f(),n=Ou();return t||n}function MM(t){var n=fe(t);n!==null&&n.tag===5&&n.type==="form"?G0(n):Aa.r(t)}var zr=typeof document>"u"?null:document;function H_(t,n,a){var r=zr;if(r&&typeof n=="string"&&n){var l=mi(n);l='link[rel="'+t+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),F_.has(l)||(F_.add(l),t={rel:t,crossOrigin:a,href:n},r.querySelector(l)===null&&(n=r.createElement("link"),Nn(n,"link",t),ve(n),r.head.appendChild(n)))}}function EM(t){Aa.D(t),H_("dns-prefetch",t,null)}function TM(t,n){Aa.C(t,n),H_("preconnect",t,n)}function bM(t,n,a){Aa.L(t,n,a);var r=zr;if(r&&t&&n){var l='link[rel="preload"][as="'+mi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+mi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+mi(a.imageSizes)+'"]')):l+='[href="'+mi(t)+'"]';var c=l;switch(n){case"style":c=Br(t);break;case"script":c=Fr(t)}if(!(Ei.has(c)||(t=P({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Ei.set(c,t),r.querySelector(l)!==null||n==="style"&&r.querySelector(al(c))||n==="script"&&r.querySelector(sl(c))))){var g=r.createElement("link");Nn(g,"link",t),n==="style"&&(g[Wt]=!0,g.onload=g.onerror=function(){Ze(g)}),ve(g),r.head.appendChild(g)}}}function AM(t,n){Aa.m(t,n);var a=zr;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",l='link[rel="modulepreload"][as="'+mi(r)+'"][href="'+mi(t)+'"]',c=l;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=Fr(t)}if(!Ei.has(c)&&(t=P({rel:"modulepreload",href:t},n),Ei.set(c,t),a.querySelector(l)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(sl(c)))return}r=a.createElement("link"),Nn(r,"link",t),ve(r),a.head.appendChild(r)}}}function RM(t,n,a){Aa.S(t,n,a);var r=zr;if(r&&t){var l=Ee(r).hoistableStyles,c=Br(t);n=n||"default";var g=l.get(c);if(!g){var A={loading:0,preload:null};if(g=r.querySelector(al(c)))A.loading=5;else{t=P({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Ei.get(c))&&od(t,a);var O=g=r.createElement("link");ve(O),Nn(O,"link",t),O._p=new Promise(function(Q,lt){O.onload=Q,O.onerror=lt}),O.addEventListener("load",function(){A.loading|=1}),O.addEventListener("error",function(){A.loading|=2}),A.loading|=4,Gu(g,n,r)}g={type:"stylesheet",instance:g,count:1,state:A},l.set(c,g)}}}function CM(t,n){Aa.X(t,n);var a=zr;if(a&&t){var r=Ee(a).hoistableScripts,l=Fr(t),c=r.get(l);c||(c=a.querySelector(sl(l)),c||(t=P({src:t,async:!0},n),(n=Ei.get(l))&&ld(t,n),c=a.createElement("script"),ve(c),Nn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},r.set(l,c))}}function wM(t,n){Aa.M(t,n);var a=zr;if(a&&t){var r=Ee(a).hoistableScripts,l=Fr(t),c=r.get(l);c||(c=a.querySelector(sl(l)),c||(t=P({src:t,async:!0,type:"module"},n),(n=Ei.get(l))&&ld(t,n),c=a.createElement("script"),ve(c),Nn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},r.set(l,c))}}function G_(t,n,a,r){var l=(l=Oe.current)?il(l):null;if(!l)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Br(a.href),n=Ee(l).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Br(a.href);var c=Ee(l).hoistableStyles,g=c.get(t);if(g||(l=l.ownerDocument||l,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,g),(c=l.querySelector(al(t)))?c._p||(g.instance=c,g.state.loading=5):(c=Ei.get(t),c||(c={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ei.set(t,c)),DM(l,t,c,g.state))),n&&r===null)throw Error(s(528,""));return g}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Fr(a),n=Ee(l).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Br(t){return'href="'+mi(t)+'"'}function al(t){return'link[rel="stylesheet"]['+t+"]"}function V_(t){return P({},t,{"data-precedence":t.precedence,precedence:null})}function DM(t,n,a,r){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Wt]!==!0){r.loading=1;return}}else n=t.createElement("link"),n[Wt]=!0,n.onload=n.onerror=Ze.bind(null,n),Nn(n,"link",a),ve(n),t.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function Fr(t){return'[src="'+mi(t)+'"]'}function sl(t){return"script[async]"+t}function k_(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+mi(a.href)+'"]');if(r)return n.instance=r,ve(r),r;var l=P({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),ve(r),Nn(r,"style",l),Gu(r,a.precedence,t),n.instance=r;case"stylesheet":l=Br(a.href);var c=t.querySelector(al(l));if(c)return n.state.loading|=4,n.instance=c,ve(c),c;r=V_(a),(l=Ei.get(l))&&od(r,l),c=(t.ownerDocument||t).createElement("link"),ve(c);var g=c;return g._p=new Promise(function(A,O){g.onload=A,g.onerror=O}),Nn(c,"link",r),n.state.loading|=4,Gu(c,a.precedence,t),n.instance=c;case"script":return c=Fr(a.src),(l=t.querySelector(sl(c)))?(n.instance=l,ve(l),l):(r=a,(l=Ei.get(c))&&(r=P({},a),ld(r,l)),t=t.ownerDocument||t,l=t.createElement("script"),ve(l),Nn(l,"link",r),t.head.appendChild(l),n.instance=l);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Gu(r,a.precedence,t));return n.instance}function Gu(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=r.length?r[r.length-1]:null,c=l,g=0;g<r.length;g++){var A=r[g];if(A.dataset.precedence===n)c=A;else if(c!==l)break}c?c.parentNode.insertBefore(t,c.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function od(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function ld(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Vu=null;function X_(t,n,a){if(Vu===null){var r=new Map,l=Vu=new Map;l.set(a,r)}else l=Vu,r=l.get(a),r||(r=new Map,l.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),l=0;l<a.length;l++){var c=a[l];if(!(c[Nt]||c[b]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var g=c.getAttribute(n)||"";g=t+g;var A=r.get(g);A?A.push(c):r.set(g,[c])}}return r}function ud(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function UM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function q_(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function W_(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Y_(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Z_(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=Y_(n),t.suspenseyImages.push(n)),t=OM.bind(t),n.decode().then(t,t))}function NM(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=Br(r.href),c=n.querySelector(al(l));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=rl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=c,ve(c);return}c=n.ownerDocument||n,r=V_(r),(l=Ei.get(l))&&od(r,l),c=c.createElement("link"),ve(c);var g=c;g._p=new Promise(function(A,O){g.onload=A,g.onerror=O}),Nn(c,"link",r),a.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=rl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var ku=0;function LM(t,n){return t.stylesheets&&t.count===0&&qu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&qu(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+n);0<t.imgBytes&&ku===0&&(ku=62500*Jy());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&qu(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>ku?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(l)}}:null}function K_(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)qu(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function rl(){this.count--,K_(this)}function OM(){this.imgCount--,K_(this)}var Xu=null;function qu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xu=new Map,n.forEach(PM,t),Xu=null,rl.call(t))}function PM(t,n){if(!(n.state.loading&4)){var a=Xu.get(t);if(a)var r=a.get(null);else{a=new Map,Xu.set(t,a);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<l.length;c++){var g=l[c];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),r=g)}r&&a.set(null,r)}l=n.instance,g=l.getAttribute("data-precedence"),c=a.get(g)||r,c===r&&a.set(null,l),a.set(g,l),this.count++,r=rl.bind(this),l.addEventListener("load",r),l.addEventListener("error",r),c?c.parentNode.insertBefore(l,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),n.state.loading|=4}}var Hr={$$typeof:$,Provider:null,Consumer:null,_currentValue:Ge,_currentValue2:Ge,_threadCount:0};function IM(t,n,a,r,l,c,g,A,O){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ir(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ir(0),this.hiddenUpdates=ir(null),this.identifierPrefix=r,this.onUncaughtError=l,this.onCaughtError=c,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=O,this.transitionTypes=null,this.incompleteTransitions=new Map}function Q_(t,n,a,r,l,c,g,A,O,Q,lt,St){return t=new IM(t,n,a,g,O,Q,lt,St,A),n=1,c===!0&&(n|=24),c=Wn(3,null,null,n),t.current=c,c.stateNode=t,n=Tf(),n.refCount++,t.pooledCache=n,n.refCount++,c.memoizedState={element:r,isDehydrated:a,cache:n},Cf(c),t}function J_(t){return t?(t=hr,t):hr}function j_(t,n,a,r,l,c){l=J_(l),r.context===null?r.context=l:r.pendingContext=l,r=Za(n),r.payload={element:a},c=c===void 0?null:c,c!==null&&(r.callback=c),a=Ka(t,r,n),a!==null&&(Qn(a,t,n),zo(a,t,n))}function $_(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function cd(t,n){$_(t,n),(t=t.alternate)&&$_(t,n)}function tv(t){if(t.tag===13||t.tag===31){var n=As(t,67108864);n!==null&&Qn(n,t,67108864),cd(t,67108864)}}function ev(t){if(t.tag===13||t.tag===31){var n=oi();n=xo(n);var a=As(t,n);a!==null&&Qn(a,t,n),cd(t,n)}}var Gr=!0;function zM(t,n,a,r){var l=_t.T;_t.T=null;var c=Rt.p;try{Rt.p=2,fd(t,n,a,r)}finally{Rt.p=c,_t.T=l}}function BM(t,n,a,r){var l=_t.T;_t.T=null;var c=Rt.p;try{Rt.p=8,fd(t,n,a,r)}finally{Rt.p=c,_t.T=l}}function fd(t,n,a,r){if(Gr){var l=hd(r);if(l===null)Wh(t,n,r,Wu,a),iv(t,r);else if(HM(l,t,n,a,r))r.stopPropagation();else if(iv(t,r),n&4&&-1<FM.indexOf(t)){for(;l!==null;){var c=fe(l);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var g=ha(c.pendingLanes);if(g!==0){var A=c;for(A.pendingLanes|=2,A.entangledLanes|=2;g;){var O=1<<31-ce(g);A.entanglements[1]|=O,g&=~O}na(c),(ze&6)===0&&(Uu=Vt()+500,$o(0))}}break;case 31:case 13:A=As(c,2),A!==null&&Qn(A,c,2),Ou(),cd(c,2)}if(c=hd(r),c===null&&Wh(t,n,r,Wu,a),c===l)break;l=c}l!==null&&r.stopPropagation()}else Wh(t,n,r,null,a)}}function hd(t){return t=Qc(t),dd(t)}var Wu=null;function dd(t){if(Wu=null,t=ae(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Wu=t,null}function nv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ee()){case le:return 2;case H:return 8;case Ct:case xt:return 32;case Ut:return 268435456;default:return 32}default:return 32}}var pd=!1,os=null,ls=null,us=null,ol=new Map,ll=new Map,cs=[],FM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function iv(t,n){switch(t){case"focusin":case"focusout":os=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":us=null;break;case"pointerover":case"pointerout":ol.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ll.delete(n.pointerId)}}function ul(t,n,a,r,l,c){return t===null||t.nativeEvent!==c?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:c,targetContainers:[l]},n!==null&&(n=fe(n),n!==null&&tv(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),t)}function HM(t,n,a,r,l){switch(n){case"focusin":return os=ul(os,t,n,a,r,l),!0;case"dragenter":return ls=ul(ls,t,n,a,r,l),!0;case"mouseover":return us=ul(us,t,n,a,r,l),!0;case"pointerover":var c=l.pointerId;return ol.set(c,ul(ol.get(c)||null,t,n,a,r,l)),!0;case"gotpointercapture":return c=l.pointerId,ll.set(c,ul(ll.get(c)||null,t,n,a,r,l)),!0}return!1}function av(t){var n=ae(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Nl(t.priority,function(){ev(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,Nl(t.priority,function(){ev(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Yu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=hd(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);Kc=r,a.target.dispatchEvent(r),Kc=null}else return n=fe(a),n!==null&&tv(n),t.blockedOn=a,!1;n.shift()}return!0}function sv(t,n,a){Yu(t)&&a.delete(n)}function GM(){pd=!1,os!==null&&Yu(os)&&(os=null),ls!==null&&Yu(ls)&&(ls=null),us!==null&&Yu(us)&&(us=null),ol.forEach(sv),ll.forEach(sv)}function Zu(t,n){t.blockedOn===n&&(t.blockedOn=null,pd||(pd=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,GM)))}var Ku=null;function rv(t){Ku!==t&&(Ku=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Ku===t&&(Ku=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],l=t[n+2];if(typeof r!="function"){if(dd(r||a)===null)continue;break}var c=fe(a);c!==null&&(t.splice(n,3),n-=3,Kf(c,{pending:!0,data:l,method:a.method,action:r},r,l))}}))}function Vr(t){function n(O){return Zu(O,t)}os!==null&&Zu(os,t),ls!==null&&Zu(ls,t),us!==null&&Zu(us,t),ol.forEach(n),ll.forEach(n);for(var a=0;a<cs.length;a++){var r=cs[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<cs.length&&(a=cs[0],a.blockedOn===null);)av(a),a.blockedOn===null&&cs.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var l=a[r],c=a[r+1],g=l[B]||null;if(typeof c=="function")g||rv(a);else if(g){var A=null;if(c&&c.hasAttribute("formAction")){if(l=c,g=c[B]||null)A=g.formAction;else if(dd(l)!==null)continue}else A=g.action;typeof A=="function"?a[r+1]=A:(a.splice(r,3),r-=3),rv(a)}}}function ov(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(g){return l=g})},focusReset:"manual",scroll:"manual"})}function n(){l!==null&&(l(),l=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),l!==null&&(l(),l=null)}}}function md(t){this._internalRoot=t}Qu.prototype.render=md.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=oi();j_(a,r,t,n,null,null)},Qu.prototype.unmount=md.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;j_(t.current,2,null,t,null,null),Ou(),n[ut]=null}};function Qu(t){this._internalRoot=t}Qu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Ul();t={blockedOn:null,target:t,priority:n};for(var a=0;a<cs.length&&n!==0&&n<cs[a].priority;a++);cs.splice(a,0,t),a===0&&av(t)}};var lv=e.version;if(lv!=="19.3.0")throw Error(s(527,lv,"19.3.0"));Rt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?S(t):null,t=t===null?null:t.stateNode,t};var VM={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:_t,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ju=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ju.isDisabled&&Ju.supportsFiber)try{Jt=Ju.inject(VM),Ht=Ju}catch{}}return fl.createRoot=function(t,n){if(!u(t))throw Error(s(299));var a=!1,r="",l=J0,c=j0,g=$0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(l=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=Q_(t,1,!1,null,null,a,r,null,l,c,g,ov),t[ut]=n.current,qh(t),new md(n)},fl.hydrateRoot=function(t,n,a){if(!u(t))throw Error(s(299));var r=!1,l="",c=J0,g=j0,A=$0,O=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(c=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(O=a.formState)),n=Q_(t,1,!0,n,a??null,r,l,O,c,g,A,ov),n.context=J_(null),a=n.current,r=oi(),r=xo(r),l=Za(r),l.callback=null,Ka(a,l,r),a=r,n.current.lanes=a,Xi(n,a),na(n),t[ut]=n.current,qh(t),new Qu(n)},fl.version="19.3.0",fl}var vv;function jM(){if(vv)return _d.exports;vv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),_d.exports=JM(),_d.exports}var $M=jM(),kr=kp();const Xp="186",oo={ROTATE:0,DOLLY:1,PAN:2},so={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},tE=0,Sv=1,eE=2,Ac=1,nE=2,vl=3,js=0,jn=1,La=2,Oa=0,xl=1,xv=2,yv=3,Mv=4,iE=5,io=100,aE=101,sE=102,rE=103,oE=104,lE=200,uE=201,cE=202,fE=203,SS=204,xS=205,hE=206,dE=207,pE=208,mE=209,gE=210,_E=211,vE=212,SE=213,xE=214,ep=0,np=1,ip=2,El=3,ap=4,sp=5,rp=6,op=7,yS=0,yE=1,ME=2,Gi=0,MS=1,ES=2,TS=3,bS=4,AS=5,RS=6,CS=7,wS=300,$s=301,co=302,Md=303,Ed=304,Bc=306,lp=1e3,Hi=1001,up=1002,On=1003,EE=1004,ju=1005,Rn=1006,Td=1007,Qs=1008,fi=1009,DS=1010,US=1011,Tl=1012,qp=1013,ua=1014,ra=1015,wi=1016,Wp=1017,Yp=1018,bl=1020,NS=35902,LS=35899,OS=1021,PS=1022,Ri=1023,za=1026,Js=1027,IS=1028,Zp=1029,tr=1030,Kp=1031,Qp=1033,Rc=33776,Cc=33777,wc=33778,Dc=33779,cp=35840,fp=35841,hp=35842,dp=35843,pp=36196,mp=37492,gp=37496,_p=37488,vp=37489,Nc=37490,Sp=37491,xp=37808,yp=37809,Mp=37810,Ep=37811,Tp=37812,bp=37813,Ap=37814,Rp=37815,Cp=37816,wp=37817,Dp=37818,Up=37819,Np=37820,Lp=37821,Op=36492,Pp=36494,Ip=36495,zp=36283,Bp=36284,Lc=36285,Fp=36286,TE=3200,Ev=0,bE=1,_s="",bi="srgb",fo="srgb-linear",Oc="linear",We="srgb",bd=7680,AE=519,RE=512,CE=513,wE=514,Jp=515,DE=516,UE=517,jp=518,NE=519,LE=35044,Tv="300 es",oa=2e3,Pc=2001;function OE(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Ic(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function PE(){const o=Ic("canvas");return o.style.display="block",o}const bv={};function Av(...o){const e="THREE."+o.shift();console.log(e,...o)}function zS(o){const e=o[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=o[1];i&&i.isStackTrace?o[0]+=" "+i.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function se(...o){o=zS(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...o)}}function Pe(...o){o=zS(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...o)}}function lo(...o){const e=o.join(" ");e in bv||(bv[e]=!0,se(...o))}function IE(o,e,i){return new Promise(function(s,u){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:u();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:s()}}setTimeout(f,i)})}const zE={[ep]:np,[ip]:rp,[ap]:op,[El]:sp,[np]:ep,[rp]:ip,[op]:ap,[sp]:El};class xs{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const u=s[e];if(u!==void 0){const f=u.indexOf(i);f!==-1&&u.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const u=s.slice(0);for(let f=0,h=u.length;f<h;f++)u[f].call(this,e);e.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Rv=1234567;const yl=Math.PI/180,Al=180/Math.PI;function po(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(In[o&255]+In[o>>8&255]+In[o>>16&255]+In[o>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[i&63|128]+In[i>>8&255]+"-"+In[i>>16&255]+In[i>>24&255]+In[s&255]+In[s>>8&255]+In[s>>16&255]+In[s>>24&255]).toLowerCase()}function ye(o,e,i){return Math.max(e,Math.min(i,o))}function $p(o,e){return(o%e+e)%e}function BE(o,e,i,s,u){return s+(o-e)*(u-s)/(i-e)}function FE(o,e,i){return o!==e?(i-o)/(e-o):0}function Ml(o,e,i){return(1-i)*o+i*e}function HE(o,e,i,s){return Ml(o,e,1-Math.exp(-i*s))}function GE(o,e=1){return e-Math.abs($p(o,e*2)-e)}function VE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*(3-2*o))}function kE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*o*(o*(o*6-15)+10))}function XE(o,e){return o+Math.floor(Math.random()*(e-o+1))}function qE(o,e){return o+Math.random()*(e-o)}function WE(o){return o*(.5-Math.random())}function YE(o){o!==void 0&&(Rv=o);let e=Rv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ZE(o){return o*yl}function KE(o){return o*Al}function QE(o){return o>0&&Number.isInteger(o)&&2**Math.round(Math.log2(o))===o}function JE(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function jE(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function $E(o,e,i,s,u){const f=Math.cos,h=Math.sin,d=f(i/2),p=h(i/2),m=f((e+s)/2),S=h((e+s)/2),_=f((e-s)/2),v=h((e-s)/2),E=f((s-e)/2),R=h((s-e)/2);switch(u){case"XYX":o.set(d*S,p*_,p*v,d*m);break;case"YZY":o.set(p*v,d*S,p*_,d*m);break;case"ZXZ":o.set(p*_,p*v,d*S,d*m);break;case"XZX":o.set(d*S,p*R,p*E,d*m);break;case"YXY":o.set(p*E,d*S,p*R,d*m);break;case"ZYZ":o.set(p*R,p*E,d*S,d*m);break;default:se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+u)}}function ao(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:case Uint8ClampedArray:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ks={DEG2RAD:yl,RAD2DEG:Al,generateUUID:po,clamp:ye,euclideanModulo:$p,mapLinear:BE,inverseLerp:FE,lerp:Ml,damp:HE,pingpong:GE,smoothstep:VE,smootherstep:kE,randInt:XE,randFloat:qE,randFloatSpread:WE,seededRandom:YE,degToRad:ZE,radToDeg:KE,isPowerOfTwo:QE,ceilPowerOfTwo:JE,floorPowerOfTwo:jE,setQuaternionFromProperEuler:$E,normalize:kn,denormalize:ao};class re{static{re.prototype.isVector2=!0}constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,u=e.elements;return this.x=u[0]*i+u[3]*s+u[6],this.y=u[1]*i+u[4]*s+u[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=ye(this.x,e.x,i.x),this.y=ye(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=ye(this.x,e,i),this.y=ye(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ye(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(ye(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),u=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*s-h*u+e.x,this.y=f*u+h*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ss{constructor(e=0,i=0,s=0,u=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=u}static slerpFlat(e,i,s,u,f,h,d){let p=s[u+0],m=s[u+1],S=s[u+2],_=s[u+3],v=f[h+0],E=f[h+1],R=f[h+2],D=f[h+3];if(_!==D||p!==v||m!==E||S!==R){let M=p*v+m*E+S*R+_*D;M<0&&(v=-v,E=-E,R=-R,D=-D,M=-M);let x=1-d;if(M<.9995){const I=Math.acos(M),K=Math.sin(I);x=Math.sin(x*I)/K,d=Math.sin(d*I)/K,p=p*x+v*d,m=m*x+E*d,S=S*x+R*d,_=_*x+D*d}else{p=p*x+v*d,m=m*x+E*d,S=S*x+R*d,_=_*x+D*d;const I=1/Math.sqrt(p*p+m*m+S*S+_*_);p*=I,m*=I,S*=I,_*=I}}e[i]=p,e[i+1]=m,e[i+2]=S,e[i+3]=_}static multiplyQuaternionsFlat(e,i,s,u,f,h){const d=s[u],p=s[u+1],m=s[u+2],S=s[u+3],_=f[h],v=f[h+1],E=f[h+2],R=f[h+3];return e[i]=d*R+S*_+p*E-m*v,e[i+1]=p*R+S*v+m*_-d*E,e[i+2]=m*R+S*E+d*v-p*_,e[i+3]=S*R-d*_-p*v-m*E,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,u){return this._x=e,this._y=i,this._z=s,this._w=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,u=e._y,f=e._z,h=e._order,d=Math.cos,p=Math.sin,m=d(s/2),S=d(u/2),_=d(f/2),v=p(s/2),E=p(u/2),R=p(f/2);switch(h){case"XYZ":this._x=v*S*_+m*E*R,this._y=m*E*_-v*S*R,this._z=m*S*R+v*E*_,this._w=m*S*_-v*E*R;break;case"YXZ":this._x=v*S*_+m*E*R,this._y=m*E*_-v*S*R,this._z=m*S*R-v*E*_,this._w=m*S*_+v*E*R;break;case"ZXY":this._x=v*S*_-m*E*R,this._y=m*E*_+v*S*R,this._z=m*S*R+v*E*_,this._w=m*S*_-v*E*R;break;case"ZYX":this._x=v*S*_-m*E*R,this._y=m*E*_+v*S*R,this._z=m*S*R-v*E*_,this._w=m*S*_+v*E*R;break;case"YZX":this._x=v*S*_+m*E*R,this._y=m*E*_+v*S*R,this._z=m*S*R-v*E*_,this._w=m*S*_-v*E*R;break;case"XZY":this._x=v*S*_-m*E*R,this._y=m*E*_-v*S*R,this._z=m*S*R+v*E*_,this._w=m*S*_+v*E*R;break;default:se("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,u=Math.sin(s);return this._x=e.x*u,this._y=e.y*u,this._z=e.z*u,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],u=i[4],f=i[8],h=i[1],d=i[5],p=i[9],m=i[2],S=i[6],_=i[10],v=s+d+_;if(v>0){const E=.5/Math.sqrt(v+1);this._w=.25/E,this._x=(S-p)*E,this._y=(f-m)*E,this._z=(h-u)*E}else if(s>d&&s>_){const E=2*Math.sqrt(1+s-d-_);this._w=(S-p)/E,this._x=.25*E,this._y=(u+h)/E,this._z=(f+m)/E}else if(d>_){const E=2*Math.sqrt(1+d-s-_);this._w=(f-m)/E,this._x=(u+h)/E,this._y=.25*E,this._z=(p+S)/E}else{const E=2*Math.sqrt(1+_-s-d);this._w=(h-u)/E,this._x=(f+m)/E,this._y=(p+S)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ye(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const u=Math.min(1,i/s);return this.slerp(e,u),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,u=e._y,f=e._z,h=e._w,d=i._x,p=i._y,m=i._z,S=i._w;return this._x=s*S+h*d+u*m-f*p,this._y=u*S+h*p+f*d-s*m,this._z=f*S+h*m+s*p-u*d,this._w=h*S-s*d-u*p-f*m,this._onChangeCallback(),this}slerp(e,i){let s=e._x,u=e._y,f=e._z,h=e._w,d=this.dot(e);d<0&&(s=-s,u=-u,f=-f,h=-h,d=-d);let p=1-i;if(d<.9995){const m=Math.acos(d),S=Math.sin(m);p=Math.sin(p*m)/S,i=Math.sin(i*m)/S,this._x=this._x*p+s*i,this._y=this._y*p+u*i,this._z=this._z*p+f*i,this._w=this._w*p+h*i,this._onChangeCallback()}else this._x=this._x*p+s*i,this._y=this._y*p+u*i,this._z=this._z*p+f*i,this._w=this._w*p+h*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),u=Math.sqrt(1-s),f=Math.sqrt(s);return this.set(u*Math.sin(e),u*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class st{static{st.prototype.isVector3=!0}constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Cv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Cv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[3]*s+f[6]*u,this.y=f[1]*i+f[4]*s+f[7]*u,this.z=f[2]*i+f[5]*s+f[8]*u,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,u=this.z,f=e.elements,h=1/(f[3]*i+f[7]*s+f[11]*u+f[15]);return this.x=(f[0]*i+f[4]*s+f[8]*u+f[12])*h,this.y=(f[1]*i+f[5]*s+f[9]*u+f[13])*h,this.z=(f[2]*i+f[6]*s+f[10]*u+f[14])*h,this}applyQuaternion(e){const i=this.x,s=this.y,u=this.z,f=e.x,h=e.y,d=e.z,p=e.w,m=2*(h*u-d*s),S=2*(d*i-f*u),_=2*(f*s-h*i);return this.x=i+p*m+h*_-d*S,this.y=s+p*S+d*m-f*_,this.z=u+p*_+f*S-h*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*u,this.y=f[1]*i+f[5]*s+f[9]*u,this.z=f[2]*i+f[6]*s+f[10]*u,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=ye(this.x,e.x,i.x),this.y=ye(this.y,e.y,i.y),this.z=ye(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=ye(this.x,e,i),this.y=ye(this.y,e,i),this.z=ye(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ye(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,u=e.y,f=e.z,h=i.x,d=i.y,p=i.z;return this.x=u*p-f*d,this.y=f*h-s*p,this.z=s*d-u*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Ad.copy(this).projectOnVector(e),this.sub(Ad)}reflect(e){return this.sub(Ad.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(ye(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,u=this.z-e.z;return i*i+s*s+u*u}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const u=Math.sin(i)*e;return this.x=u*Math.sin(s),this.y=Math.cos(i)*e,this.z=u*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),u=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=u,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ad=new st,Cv=new Ss;class he{static{he.prototype.isMatrix3=!0}constructor(e,i,s,u,f,h,d,p,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,u,f,h,d,p,m)}set(e,i,s,u,f,h,d,p,m){const S=this.elements;return S[0]=e,S[1]=u,S[2]=d,S[3]=i,S[4]=f,S[5]=p,S[6]=s,S[7]=h,S[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,u=i.elements,f=this.elements,h=s[0],d=s[3],p=s[6],m=s[1],S=s[4],_=s[7],v=s[2],E=s[5],R=s[8],D=u[0],M=u[3],x=u[6],I=u[1],K=u[4],C=u[7],U=u[2],N=u[5],P=u[8];return f[0]=h*D+d*I+p*U,f[3]=h*M+d*K+p*N,f[6]=h*x+d*C+p*P,f[1]=m*D+S*I+_*U,f[4]=m*M+S*K+_*N,f[7]=m*x+S*C+_*P,f[2]=v*D+E*I+R*U,f[5]=v*M+E*K+R*N,f[8]=v*x+E*C+R*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],m=e[7],S=e[8];return i*h*S-i*d*m-s*f*S+s*d*p+u*f*m-u*h*p}invert(){const e=this.elements,i=e[0],s=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],m=e[7],S=e[8],_=S*h-d*m,v=d*p-S*f,E=m*f-h*p,R=i*_+s*v+u*E;if(R===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/R;return e[0]=_*D,e[1]=(u*m-S*s)*D,e[2]=(d*s-u*h)*D,e[3]=v*D,e[4]=(S*i-u*p)*D,e[5]=(u*f-d*i)*D,e[6]=E*D,e[7]=(s*p-m*i)*D,e[8]=(h*i-s*f)*D,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,u,f,h,d){const p=Math.cos(f),m=Math.sin(f);return this.set(s*p,s*m,-s*(p*h+m*d)+h+e,-u*m,u*p,-u*(-m*h+p*d)+d+i,0,0,1),this}scale(e,i){return lo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Rd.makeScale(e,i)),this}rotate(e){return lo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Rd.makeRotation(-e)),this}translate(e,i){return lo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Rd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let u=0;u<9;u++)if(i[u]!==s[u])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rd=new he,wv=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dv=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tT(){const o={enabled:!0,workingColorSpace:fo,spaces:{},convert:function(u,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===We&&(u.r=Pa(u.r),u.g=Pa(u.g),u.b=Pa(u.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(u.applyMatrix3(this.spaces[f].toXYZ),u.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===We&&(u.r=uo(u.r),u.g=uo(u.g),u.b=uo(u.b))),u},workingToColorSpace:function(u,f){return this.convert(u,this.workingColorSpace,f)},colorSpaceToWorking:function(u,f){return this.convert(u,f,this.workingColorSpace)},getPrimaries:function(u){return this.spaces[u].primaries},getTransfer:function(u){return u===_s?Oc:this.spaces[u].transfer},getToneMappingMode:function(u){return this.spaces[u].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(u,f=this.workingColorSpace){return u.fromArray(this.spaces[f].luminanceCoefficients)},define:function(u){Object.assign(this.spaces,u)},_getMatrix:function(u,f,h){return u.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(u){return this.spaces[u].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(u=this.workingColorSpace){return this.spaces[u].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(u,f){return lo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(u,f)},toWorkingColorSpace:function(u,f){return lo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(u,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[fo]:{primaries:e,whitePoint:s,transfer:Oc,toXYZ:wv,fromXYZ:Dv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:bi},outputColorSpaceConfig:{drawingBufferColorSpace:bi}},[bi]:{primaries:e,whitePoint:s,transfer:We,toXYZ:wv,fromXYZ:Dv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:bi}}}),o}const Ue=tT();function Pa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function uo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Xr;class eT{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Xr===void 0&&(Xr=Ic("canvas")),Xr.width=e.width,Xr.height=e.height;const u=Xr.getContext("2d");e instanceof ImageData?u.putImageData(e,0,0):u.drawImage(e,0,0,e.width,e.height),s=Xr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Ic("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const u=s.getImageData(0,0,e.width,e.height),f=u.data;for(let h=0;h<f.length;h++)f[h]=Pa(f[h]/255)*255;return s.putImageData(u,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Pa(i[s]/255)*255):i[s]=Pa(i[s]);return{data:i,width:e.width,height:e.height}}else return se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nT=0;class tm{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:nT++}),this.uuid=po(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},u=this.data;if(u!==null){let f;if(Array.isArray(u)){f=[];for(let h=0,d=u.length;h<d;h++)u[h].isDataTexture?f.push(Cd(u[h].image)):f.push(Cd(u[h]))}else f=Cd(u);s.url=f}return i||(e.images[this.uuid]=s),s}}function Cd(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?eT.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(se("Texture: Unable to serialize Texture."),{})}let iT=0;const wd=new st;class qn extends xs{constructor(e=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,s=Hi,u=Hi,f=Rn,h=Qs,d=Ri,p=fi,m=qn.DEFAULT_ANISOTROPY,S=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=po(),this.name="",this.source=new tm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=u,this.magFilter=f,this.minFilter=h,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=S,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wd).x}get height(){return this.source.getSize(wd).y}get depth(){return this.source.getSize(wd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){se(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const u=this[i];if(u===void 0){se(`Texture.setValues(): property '${i}' does not exist.`);continue}u&&s&&u.isVector2&&s.isVector2||u&&s&&u.isVector3&&s.isVector3||u&&s&&u.isMatrix3&&s.isMatrix3?u.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lp:e.x=e.x-Math.floor(e.x);break;case Hi:e.x=e.x<0?0:1;break;case up:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lp:e.y=e.y-Math.floor(e.y);break;case Hi:e.y=e.y<0?0:1;break;case up:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=wS;qn.DEFAULT_ANISOTROPY=1;class un{static{un.prototype.isVector4=!0}constructor(e=0,i=0,s=0,u=1){this.x=e,this.y=i,this.z=s,this.w=u}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,u){return this.x=e,this.y=i,this.z=s,this.w=u,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,u=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*s+h[8]*u+h[12]*f,this.y=h[1]*i+h[5]*s+h[9]*u+h[13]*f,this.z=h[2]*i+h[6]*s+h[10]*u+h[14]*f,this.w=h[3]*i+h[7]*s+h[11]*u+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,u,f;const p=e.elements,m=p[0],S=p[4],_=p[8],v=p[1],E=p[5],R=p[9],D=p[2],M=p[6],x=p[10];if(Math.abs(S-v)<.01&&Math.abs(_-D)<.01&&Math.abs(R-M)<.01){if(Math.abs(S+v)<.1&&Math.abs(_+D)<.1&&Math.abs(R+M)<.1&&Math.abs(m+E+x-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const K=(m+1)/2,C=(E+1)/2,U=(x+1)/2,N=(S+v)/4,P=(_+D)/4,T=(R+M)/4;return K>C&&K>U?K<.01?(s=0,u=.707106781,f=.707106781):(s=Math.sqrt(K),u=N/s,f=P/s):C>U?C<.01?(s=.707106781,u=0,f=.707106781):(u=Math.sqrt(C),s=N/u,f=T/u):U<.01?(s=.707106781,u=.707106781,f=0):(f=Math.sqrt(U),s=P/f,u=T/f),this.set(s,u,f,i),this}let I=Math.sqrt((M-R)*(M-R)+(_-D)*(_-D)+(v-S)*(v-S));return Math.abs(I)<.001&&(I=1),this.x=(M-R)/I,this.y=(_-D)/I,this.z=(v-S)/I,this.w=Math.acos((m+E+x-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=ye(this.x,e.x,i.x),this.y=ye(this.y,e.y,i.y),this.z=ye(this.z,e.z,i.z),this.w=ye(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=ye(this.x,e,i),this.y=ye(this.y,e,i),this.z=ye(this.z,e,i),this.w=ye(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ye(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class aT extends xs{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new un(0,0,e,i),this.scissorTest=!1,this.viewport=new un(0,0,e,i),this.textures=[];const u={width:e,height:i,depth:s.depth},f=new qn(u),h=s.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let u=0,f=this.textures.length;u<f;u++)this.textures[u].image.width=e,this.textures[u].image.height=i,this.textures[u].image.depth=s,this.textures[u].isData3DTexture!==!0&&(this.textures[u].isArrayTexture=this.textures[u].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const u=Object.assign({},e.textures[i].image);this.textures[i].source=new tm(u)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const i=e.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends aT{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class BS extends qn{constructor(e=null,i=1,s=1,u=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:u},this.magFilter=On,this.minFilter=On,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class sT extends qn{constructor(e=null,i=1,s=1,u=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:u},this.magFilter=On,this.minFilter=On,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class fn{static{fn.prototype.isMatrix4=!0}constructor(e,i,s,u,f,h,d,p,m,S,_,v,E,R,D,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,u,f,h,d,p,m,S,_,v,E,R,D,M)}set(e,i,s,u,f,h,d,p,m,S,_,v,E,R,D,M){const x=this.elements;return x[0]=e,x[4]=i,x[8]=s,x[12]=u,x[1]=f,x[5]=h,x[9]=d,x[13]=p,x[2]=m,x[6]=S,x[10]=_,x[14]=v,x[3]=E,x[7]=R,x[11]=D,x[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fn().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,s=e.elements,u=1/qr.setFromMatrixColumn(e,0).length(),f=1/qr.setFromMatrixColumn(e,1).length(),h=1/qr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*u,i[1]=s[1]*u,i[2]=s[2]*u,i[3]=0,i[4]=s[4]*f,i[5]=s[5]*f,i[6]=s[6]*f,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,u=e.y,f=e.z,h=Math.cos(s),d=Math.sin(s),p=Math.cos(u),m=Math.sin(u),S=Math.cos(f),_=Math.sin(f);if(e.order==="XYZ"){const v=h*S,E=h*_,R=d*S,D=d*_;i[0]=p*S,i[4]=-p*_,i[8]=m,i[1]=E+R*m,i[5]=v-D*m,i[9]=-d*p,i[2]=D-v*m,i[6]=R+E*m,i[10]=h*p}else if(e.order==="YXZ"){const v=p*S,E=p*_,R=m*S,D=m*_;i[0]=v+D*d,i[4]=R*d-E,i[8]=h*m,i[1]=h*_,i[5]=h*S,i[9]=-d,i[2]=E*d-R,i[6]=D+v*d,i[10]=h*p}else if(e.order==="ZXY"){const v=p*S,E=p*_,R=m*S,D=m*_;i[0]=v-D*d,i[4]=-h*_,i[8]=R+E*d,i[1]=E+R*d,i[5]=h*S,i[9]=D-v*d,i[2]=-h*m,i[6]=d,i[10]=h*p}else if(e.order==="ZYX"){const v=h*S,E=h*_,R=d*S,D=d*_;i[0]=p*S,i[4]=R*m-E,i[8]=v*m+D,i[1]=p*_,i[5]=D*m+v,i[9]=E*m-R,i[2]=-m,i[6]=d*p,i[10]=h*p}else if(e.order==="YZX"){const v=h*p,E=h*m,R=d*p,D=d*m;i[0]=p*S,i[4]=D-v*_,i[8]=R*_+E,i[1]=_,i[5]=h*S,i[9]=-d*S,i[2]=-m*S,i[6]=E*_+R,i[10]=v-D*_}else if(e.order==="XZY"){const v=h*p,E=h*m,R=d*p,D=d*m;i[0]=p*S,i[4]=-_,i[8]=m*S,i[1]=v*_+D,i[5]=h*S,i[9]=E*_-R,i[2]=R*_-E,i[6]=d*S,i[10]=D*_+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rT,e,oT)}lookAt(e,i,s){const u=this.elements;return ui.subVectors(e,i),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),hs.crossVectors(s,ui),hs.lengthSq()===0&&(Math.abs(s.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),hs.crossVectors(s,ui)),hs.normalize(),$u.crossVectors(ui,hs),u[0]=hs.x,u[4]=$u.x,u[8]=ui.x,u[1]=hs.y,u[5]=$u.y,u[9]=ui.y,u[2]=hs.z,u[6]=$u.z,u[10]=ui.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,u=i.elements,f=this.elements,h=s[0],d=s[4],p=s[8],m=s[12],S=s[1],_=s[5],v=s[9],E=s[13],R=s[2],D=s[6],M=s[10],x=s[14],I=s[3],K=s[7],C=s[11],U=s[15],N=u[0],P=u[4],T=u[8],L=u[12],V=u[1],W=u[5],et=u[9],ct=u[13],J=u[2],$=u[6],q=u[10],X=u[14],ft=u[3],ot=u[7],dt=u[11],Mt=u[15];return f[0]=h*N+d*V+p*J+m*ft,f[4]=h*P+d*W+p*$+m*ot,f[8]=h*T+d*et+p*q+m*dt,f[12]=h*L+d*ct+p*X+m*Mt,f[1]=S*N+_*V+v*J+E*ft,f[5]=S*P+_*W+v*$+E*ot,f[9]=S*T+_*et+v*q+E*dt,f[13]=S*L+_*ct+v*X+E*Mt,f[2]=R*N+D*V+M*J+x*ft,f[6]=R*P+D*W+M*$+x*ot,f[10]=R*T+D*et+M*q+x*dt,f[14]=R*L+D*ct+M*X+x*Mt,f[3]=I*N+K*V+C*J+U*ft,f[7]=I*P+K*W+C*$+U*ot,f[11]=I*T+K*et+C*q+U*dt,f[15]=I*L+K*ct+C*X+U*Mt,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],u=e[8],f=e[12],h=e[1],d=e[5],p=e[9],m=e[13],S=e[2],_=e[6],v=e[10],E=e[14],R=e[3],D=e[7],M=e[11],x=e[15],I=p*E-m*v,K=d*E-m*_,C=d*v-p*_,U=h*E-m*S,N=h*v-p*S,P=h*_-d*S;return i*(D*I-M*K+x*C)-s*(R*I-M*U+x*N)+u*(R*K-D*U+x*P)-f*(R*C-D*N+M*P)}determinantAffine(){const e=this.elements,i=e[0],s=e[4],u=e[8],f=e[1],h=e[5],d=e[9],p=e[2],m=e[6],S=e[10];return i*(h*S-d*m)-s*(f*S-d*p)+u*(f*m-h*p)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const u=this.elements;return e.isVector3?(u[12]=e.x,u[13]=e.y,u[14]=e.z):(u[12]=e,u[13]=i,u[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],u=e[2],f=e[3],h=e[4],d=e[5],p=e[6],m=e[7],S=e[8],_=e[9],v=e[10],E=e[11],R=e[12],D=e[13],M=e[14],x=e[15],I=i*d-s*h,K=i*p-u*h,C=i*m-f*h,U=s*p-u*d,N=s*m-f*d,P=u*m-f*p,T=S*D-_*R,L=S*M-v*R,V=S*x-E*R,W=_*M-v*D,et=_*x-E*D,ct=v*x-E*M,J=I*ct-K*et+C*W+U*V-N*L+P*T;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/J;return e[0]=(d*ct-p*et+m*W)*$,e[1]=(u*et-s*ct-f*W)*$,e[2]=(D*P-M*N+x*U)*$,e[3]=(v*N-_*P-E*U)*$,e[4]=(p*V-h*ct-m*L)*$,e[5]=(i*ct-u*V+f*L)*$,e[6]=(M*C-R*P-x*K)*$,e[7]=(S*P-v*C+E*K)*$,e[8]=(h*et-d*V+m*T)*$,e[9]=(s*V-i*et-f*T)*$,e[10]=(R*N-D*C+x*I)*$,e[11]=(_*C-S*N-E*I)*$,e[12]=(d*L-h*W-p*T)*$,e[13]=(i*W-s*L+u*T)*$,e[14]=(D*K-R*U-M*I)*$,e[15]=(S*U-_*K+v*I)*$,this}scale(e){const i=this.elements,s=e.x,u=e.y,f=e.z;return i[0]*=s,i[4]*=u,i[8]*=f,i[1]*=s,i[5]*=u,i[9]*=f,i[2]*=s,i[6]*=u,i[10]*=f,i[3]*=s,i[7]*=u,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],u=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,u))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),u=Math.sin(i),f=1-s,h=e.x,d=e.y,p=e.z,m=f*h,S=f*d;return this.set(m*h+s,m*d-u*p,m*p+u*d,0,m*d+u*p,S*d+s,S*p-u*h,0,m*p-u*d,S*p+u*h,f*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,u,f,h){return this.set(1,s,f,0,e,1,h,0,i,u,1,0,0,0,0,1),this}compose(e,i,s){const u=this.elements,f=i._x,h=i._y,d=i._z,p=i._w,m=f+f,S=h+h,_=d+d,v=f*m,E=f*S,R=f*_,D=h*S,M=h*_,x=d*_,I=p*m,K=p*S,C=p*_,U=s.x,N=s.y,P=s.z;return u[0]=(1-(D+x))*U,u[1]=(E+C)*U,u[2]=(R-K)*U,u[3]=0,u[4]=(E-C)*N,u[5]=(1-(v+x))*N,u[6]=(M+I)*N,u[7]=0,u[8]=(R+K)*P,u[9]=(M-I)*P,u[10]=(1-(v+D))*P,u[11]=0,u[12]=e.x,u[13]=e.y,u[14]=e.z,u[15]=1,this}decompose(e,i,s){const u=this.elements;e.x=u[12],e.y=u[13],e.z=u[14];const f=this.determinantAffine();if(f===0)return s.set(1,1,1),i.identity(),this;let h=qr.set(u[0],u[1],u[2]).length();const d=qr.set(u[4],u[5],u[6]).length(),p=qr.set(u[8],u[9],u[10]).length();f<0&&(h=-h),Ii.copy(this);const m=1/h,S=1/d,_=1/p;return Ii.elements[0]*=m,Ii.elements[1]*=m,Ii.elements[2]*=m,Ii.elements[4]*=S,Ii.elements[5]*=S,Ii.elements[6]*=S,Ii.elements[8]*=_,Ii.elements[9]*=_,Ii.elements[10]*=_,i.setFromRotationMatrix(Ii),s.x=h,s.y=d,s.z=p,this}makePerspective(e,i,s,u,f,h,d=oa,p=!1){const m=this.elements,S=2*f/(i-e),_=2*f/(s-u),v=(i+e)/(i-e),E=(s+u)/(s-u);let R,D;if(p)R=f/(h-f),D=h*f/(h-f);else if(d===oa)R=-(h+f)/(h-f),D=-2*h*f/(h-f);else if(d===Pc)R=-h/(h-f),D=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=S,m[4]=0,m[8]=v,m[12]=0,m[1]=0,m[5]=_,m[9]=E,m[13]=0,m[2]=0,m[6]=0,m[10]=R,m[14]=D,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,i,s,u,f,h,d=oa,p=!1){const m=this.elements,S=2/(i-e),_=2/(s-u),v=-(i+e)/(i-e),E=-(s+u)/(s-u);let R,D;if(p)R=1/(h-f),D=h/(h-f);else if(d===oa)R=-2/(h-f),D=-(h+f)/(h-f);else if(d===Pc)R=-1/(h-f),D=-f/(h-f);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=S,m[4]=0,m[8]=0,m[12]=v,m[1]=0,m[5]=_,m[9]=0,m[13]=E,m[2]=0,m[6]=0,m[10]=R,m[14]=D,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let u=0;u<16;u++)if(i[u]!==s[u])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const qr=new st,Ii=new fn,rT=new st(0,0,0),oT=new st(1,1,1),hs=new st,$u=new st,ui=new st,Uv=new fn,Nv=new Ss;class er{constructor(e=0,i=0,s=0,u=er.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=u}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,u=this._order){return this._x=e,this._y=i,this._z=s,this._order=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const u=e.elements,f=u[0],h=u[4],d=u[8],p=u[1],m=u[5],S=u[9],_=u[2],v=u[6],E=u[10];switch(i){case"XYZ":this._y=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-S,E),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(d,E),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,f),this._z=0);break;case"ZXY":this._x=Math.asin(ye(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,E),this._z=Math.atan2(-h,m)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-ye(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,E),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-h,m));break;case"YZX":this._z=Math.asin(ye(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-S,m),this._y=Math.atan2(-_,f)):(this._x=0,this._y=Math.atan2(d,E));break;case"XZY":this._z=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-S,E),this._y=0);break;default:se("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Uv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uv,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Nv.setFromEuler(this),this.setFromQuaternion(Nv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}er.DEFAULT_ORDER="XYZ";class FS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lT=0;const Lv=new st,Wr=new Ss,Ra=new fn,tc=new st,hl=new st,uT=new st,cT=new Ss,Ov=new st(1,0,0),Pv=new st(0,1,0),Iv=new st(0,0,1),zv={type:"added"},fT={type:"removed"},Yr={type:"childadded",child:null},Dd={type:"childremoved",child:null};class hi extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lT++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hi.DEFAULT_UP.clone();const e=new st,i=new er,s=new Ss,u=new st(1,1,1);function f(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(f),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:u},modelViewMatrix:{value:new fn},normalMatrix:{value:new he}}),this.matrix=new fn,this.matrixWorld=new fn,this.matrixAutoUpdate=hi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new FS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Wr.setFromAxisAngle(e,i),this.quaternion.multiply(Wr),this}rotateOnWorldAxis(e,i){return Wr.setFromAxisAngle(e,i),this.quaternion.premultiply(Wr),this}rotateX(e){return this.rotateOnAxis(Ov,e)}rotateY(e){return this.rotateOnAxis(Pv,e)}rotateZ(e){return this.rotateOnAxis(Iv,e)}translateOnAxis(e,i){return Lv.copy(e).applyQuaternion(this.quaternion),this.position.add(Lv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Ov,e)}translateY(e){return this.translateOnAxis(Pv,e)}translateZ(e){return this.translateOnAxis(Iv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ra.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?tc.copy(e):tc.set(e,i,s);const u=this.parent;this.updateWorldMatrix(!0,!1),hl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ra.lookAt(hl,tc,this.up):Ra.lookAt(tc,hl,this.up),this.quaternion.setFromRotationMatrix(Ra),u&&(Ra.extractRotation(u.matrixWorld),Wr.setFromRotationMatrix(Ra),this.quaternion.premultiply(Wr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(Pe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zv),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null):Pe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(fT),Dd.child=e,this.dispatchEvent(Dd),Dd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ra.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ra.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ra),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zv),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,u=this.children.length;s<u;s++){const h=this.children[s].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,e,uT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,cT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const i=this.children;for(let s=0,u=i.length;s<u;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,u=i.length;s<u;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,u=e.z,f=this.matrix.elements;f[12]+=i-f[0]*i-f[4]*s-f[8]*u,f[13]+=s-f[1]*i-f[5]*s-f[9]*u,f[14]+=u-f[2]*i-f[6]*s-f[10]*u}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,u=i.length;s<u;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i,s=!1){const u=this.parent;if(e===!0&&u!==null&&u.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const f=this.children;for(let h=0,d=f.length;h<d;h++)f[h].updateWorldMatrix(!1,!0,s)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const u={};u.uuid=this.uuid,u.type=this.type,u.name=this.name,u.castShadow=this.castShadow,u.receiveShadow=this.receiveShadow,u.visible=this.visible,u.frustumCulled=this.frustumCulled,u.renderOrder=this.renderOrder,u.static=this.static,u.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(u.userData=this.userData),u.layers=this.layers.mask,u.matrix=this.matrix.toArray(),u.up=this.up.toArray(),this.pivot!==null&&(u.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(u.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(u.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(u.type="InstancedMesh",u.count=this.count,u.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(u.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(u.type="BatchedMesh",u.perObjectFrustumCulled=this.perObjectFrustumCulled,u.sortObjects=this.sortObjects,u.drawRanges=this._drawRanges,u.reservedRanges=this._reservedRanges,u.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),u.instanceInfo=this._instanceInfo.map(d=>({...d})),u.availableInstanceIds=this._availableInstanceIds.slice(),u.availableGeometryIds=this._availableGeometryIds.slice(),u.nextIndexStart=this._nextIndexStart,u.nextVertexStart=this._nextVertexStart,u.geometryCount=this._geometryCount,u.maxInstanceCount=this._maxInstanceCount,u.maxVertexCount=this._maxVertexCount,u.maxIndexCount=this._maxIndexCount,u.geometryInitialized=this._geometryInitialized,u.matricesTexture=this._matricesTexture.toJSON(e),u.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(u.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(u.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(u.boundingBox=this.boundingBox.toJSON()));function f(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?u.background=this.background.toJSON():this.background.isTexture&&(u.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(u.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){u.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,S=p.length;m<S;m++){const _=p[m];f(e.shapes,_)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(u.bindMode=this.bindMode,u.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),u.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(f(e.materials,this.material[p]));u.material=d}else u.material=f(e.materials,this.material);if(this.children.length>0){u.children=[];for(let d=0;d<this.children.length;d++)u.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){u.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];u.animations.push(f(e.animations,p))}}if(i){const d=h(e.geometries),p=h(e.materials),m=h(e.textures),S=h(e.images),_=h(e.shapes),v=h(e.skeletons),E=h(e.animations),R=h(e.nodes);d.length>0&&(s.geometries=d),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),S.length>0&&(s.images=S),_.length>0&&(s.shapes=_),v.length>0&&(s.skeletons=v),E.length>0&&(s.animations=E),R.length>0&&(s.nodes=R)}return s.object=u,s;function h(d){const p=[];for(const m in d){const S=d[m];delete S.metadata,p.push(S)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const u=e.children[s];this.add(u.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}hi.DEFAULT_UP=new st(0,1,0);hi.DEFAULT_MATRIX_AUTO_UPDATE=!0;hi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ec extends hi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hT={type:"move"};class Ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ec,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ec,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new st,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new st),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ec,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new st,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new st,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let u=null,f=null,h=null;const d=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){h=!0;for(const D of e.hand.values()){const M=i.getJointPose(D,s),x=this._getHandJoint(m,D);M!==null&&(x.matrix.fromArray(M.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=M.radius),x.visible=M!==null}const S=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],v=S.position.distanceTo(_.position),E=.02,R=.005;m.inputState.pinching&&v>E+R?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&v<=E-R&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,s),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));d!==null&&(u=i.getPose(e.targetRaySpace,s),u===null&&f!==null&&(u=f),u!==null&&(d.matrix.fromArray(u.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,u.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(u.linearVelocity)):d.hasLinearVelocity=!1,u.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(u.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(hT)))}return d!==null&&(d.visible=u!==null),p!==null&&(p.visible=f!==null),m!==null&&(m.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new ec;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const HS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ds={h:0,s:0,l:0},nc={h:0,s:0,l:0};function Nd(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class He{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const u=e;u&&u.isColor?this.copy(u):typeof u=="number"?this.setHex(u):typeof u=="string"&&this.setStyle(u)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=bi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ue.colorSpaceToWorking(this,i),this}setRGB(e,i,s,u=Ue.workingColorSpace){return this.r=e,this.g=i,this.b=s,Ue.colorSpaceToWorking(this,u),this}setHSL(e,i,s,u=Ue.workingColorSpace){if(e=$p(e,1),i=ye(i,0,1),s=ye(s,0,1),i===0)this.r=this.g=this.b=s;else{const f=s<=.5?s*(1+i):s+i-s*i,h=2*s-f;this.r=Nd(h,f,e+1/3),this.g=Nd(h,f,e),this.b=Nd(h,f,e-1/3)}return Ue.colorSpaceToWorking(this,u),this}setStyle(e,i=bi){function s(f){f!==void 0&&parseFloat(f)<1&&se("Color: Alpha component of "+e+" will be ignored.")}let u;if(u=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=u[1],d=u[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:se("Color: Unknown color model "+e)}}else if(u=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=u[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);se("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=bi){const s=HS[e.toLowerCase()];return s!==void 0?this.setHex(s,i):se("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pa(e.r),this.g=Pa(e.g),this.b=Pa(e.b),this}copyLinearToSRGB(e){return this.r=uo(e.r),this.g=uo(e.g),this.b=uo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bi){return Ue.workingToColorSpace(zn.copy(this),e),Math.round(ye(zn.r*255,0,255))*65536+Math.round(ye(zn.g*255,0,255))*256+Math.round(ye(zn.b*255,0,255))}getHexString(e=bi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ue.workingColorSpace){Ue.workingToColorSpace(zn.copy(this),i);const s=zn.r,u=zn.g,f=zn.b,h=Math.max(s,u,f),d=Math.min(s,u,f);let p,m;const S=(d+h)/2;if(d===h)p=0,m=0;else{const _=h-d;switch(m=S<=.5?_/(h+d):_/(2-h-d),h){case s:p=(u-f)/_+(u<f?6:0);break;case u:p=(f-s)/_+2;break;case f:p=(s-u)/_+4;break}p/=6}return e.h=p,e.s=m,e.l=S,e}getRGB(e,i=Ue.workingColorSpace){return Ue.workingToColorSpace(zn.copy(this),i),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=bi){Ue.workingToColorSpace(zn.copy(this),e);const i=zn.r,s=zn.g,u=zn.b;return e!==bi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${u.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(u*255)})`}offsetHSL(e,i,s){return this.getHSL(ds),this.setHSL(ds.h+e,ds.s+i,ds.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ds),e.getHSL(nc);const s=Ml(ds.h,nc.h,i),u=Ml(ds.s,nc.s,i),f=Ml(ds.l,nc.l,i);return this.setHSL(s,u,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,u=this.b,f=e.elements;return this.r=f[0]*i+f[3]*s+f[6]*u,this.g=f[1]*i+f[4]*s+f[7]*u,this.b=f[2]*i+f[5]*s+f[8]*u,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new He;He.NAMES=HS;class dT extends hi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new er,this.environmentIntensity=1,this.environmentRotation=new er,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const zi=new st,Ca=new st,Ld=new st,wa=new st,Zr=new st,Kr=new st,Bv=new st,Od=new st,Pd=new st,Id=new st,zd=new un,Bd=new un,Fd=new un;class Fi{constructor(e=new st,i=new st,s=new st){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,u){u.subVectors(s,i),zi.subVectors(e,i),u.cross(zi);const f=u.lengthSq();return f>0?u.multiplyScalar(1/Math.sqrt(f)):u.set(0,0,0)}static getBarycoord(e,i,s,u,f){zi.subVectors(u,i),Ca.subVectors(s,i),Ld.subVectors(e,i);const h=zi.dot(zi),d=zi.dot(Ca),p=zi.dot(Ld),m=Ca.dot(Ca),S=Ca.dot(Ld),_=h*m-d*d;if(_===0)return f.set(0,0,0),null;const v=1/_,E=(m*p-d*S)*v,R=(h*S-d*p)*v;return f.set(1-E-R,R,E)}static containsPoint(e,i,s,u){return this.getBarycoord(e,i,s,u,wa)===null?!1:wa.x>=0&&wa.y>=0&&wa.x+wa.y<=1}static getInterpolation(e,i,s,u,f,h,d,p){return this.getBarycoord(e,i,s,u,wa)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,wa.x),p.addScaledVector(h,wa.y),p.addScaledVector(d,wa.z),p)}static getInterpolatedAttribute(e,i,s,u,f,h){return zd.setScalar(0),Bd.setScalar(0),Fd.setScalar(0),zd.fromBufferAttribute(e,i),Bd.fromBufferAttribute(e,s),Fd.fromBufferAttribute(e,u),h.setScalar(0),h.addScaledVector(zd,f.x),h.addScaledVector(Bd,f.y),h.addScaledVector(Fd,f.z),h}static isFrontFacing(e,i,s,u){return zi.subVectors(s,i),Ca.subVectors(e,i),zi.cross(Ca).dot(u)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,u){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[u]),this}setFromAttributeAndIndices(e,i,s,u){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,u),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),Ca.subVectors(this.a,this.b),zi.cross(Ca).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Fi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,u,f){return Fi.getInterpolation(e,this.a,this.b,this.c,i,s,u,f)}containsPoint(e){return Fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,u=this.b,f=this.c;let h,d;Zr.subVectors(u,s),Kr.subVectors(f,s),Od.subVectors(e,s);const p=Zr.dot(Od),m=Kr.dot(Od);if(p<=0&&m<=0)return i.copy(s);Pd.subVectors(e,u);const S=Zr.dot(Pd),_=Kr.dot(Pd);if(S>=0&&_<=S)return i.copy(u);const v=p*_-S*m;if(v<=0&&p>=0&&S<=0)return h=p/(p-S),i.copy(s).addScaledVector(Zr,h);Id.subVectors(e,f);const E=Zr.dot(Id),R=Kr.dot(Id);if(R>=0&&E<=R)return i.copy(f);const D=E*m-p*R;if(D<=0&&m>=0&&R<=0)return d=m/(m-R),i.copy(s).addScaledVector(Kr,d);const M=S*R-E*_;if(M<=0&&_-S>=0&&E-R>=0)return Bv.subVectors(f,u),d=(_-S)/(_-S+(E-R)),i.copy(u).addScaledVector(Bv,d);const x=1/(M+D+v);return h=D*x,d=v*x,i.copy(s).addScaledVector(Zr,h).addScaledVector(Kr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Cl{constructor(e=new st(1/0,1/0,1/0),i=new st(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Bi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Bi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Bi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const f=s.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Bi):Bi.fromBufferAttribute(f,h),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ic.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),ic.copy(s.boundingBox)),ic.applyMatrix4(e.matrixWorld),this.union(ic)}const u=e.children;for(let f=0,h=u.length;f<h;f++)this.expandByObject(u[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dl),ac.subVectors(this.max,dl),Qr.subVectors(e.a,dl),Jr.subVectors(e.b,dl),jr.subVectors(e.c,dl),ps.subVectors(Jr,Qr),ms.subVectors(jr,Jr),Xs.subVectors(Qr,jr);let i=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Xs.z,Xs.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Xs.z,0,-Xs.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Xs.y,Xs.x,0];return!Hd(i,Qr,Jr,jr,ac)||(i=[1,0,0,0,1,0,0,0,1],!Hd(i,Qr,Jr,jr,ac))?!1:(sc.crossVectors(ps,ms),i=[sc.x,sc.y,sc.z],Hd(i,Qr,Jr,jr,ac))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Da[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Da[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Da[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Da[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Da[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Da[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Da[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Da[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Da),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Da=[new st,new st,new st,new st,new st,new st,new st,new st],Bi=new st,ic=new Cl,Qr=new st,Jr=new st,jr=new st,ps=new st,ms=new st,Xs=new st,dl=new st,ac=new st,sc=new st,qs=new st;function Hd(o,e,i,s,u){for(let f=0,h=o.length-3;f<=h;f+=3){qs.fromArray(o,f);const d=u.x*Math.abs(qs.x)+u.y*Math.abs(qs.y)+u.z*Math.abs(qs.z),p=e.dot(qs),m=i.dot(qs),S=s.dot(qs);if(Math.max(-Math.max(p,m,S),Math.min(p,m,S))>d)return!1}return!0}const _n=new st,rc=new re;let pT=0;class la extends xs{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=LE,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let u=0,f=this.itemSize;u<f;u++)this.array[e+u]=i.array[s+u];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)rc.fromBufferAttribute(this,i),rc.applyMatrix3(e),this.setXY(i,rc.x,rc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix3(e),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix4(e),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyNormalMatrix(e),this.setXYZ(i,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.transformDirection(e),this.setXYZ(i,_n.x,_n.y,_n.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=ao(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=kn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ao(i,this.array)),i}setX(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ao(i,this.array)),i}setY(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ao(i,this.array)),i}setZ(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ao(i,this.array)),i}setW(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,u){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array),u=kn(u,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=u,this}setXYZW(e,i,s,u,f){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array),u=kn(u,this.array),f=kn(f,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=u,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class GS extends la{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class VS extends la{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Ia extends la{constructor(e,i,s){super(new Float32Array(e),i,s)}}const mT=new Cl,pl=new st,Gd=new st;class em{constructor(e=new st,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):mT.setFromPoints(e).getCenter(s);let u=0;for(let f=0,h=e.length;f<h;f++)u=Math.max(u,s.distanceToSquared(e[f]));return this.radius=Math.sqrt(u),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pl.subVectors(e,this.center);const i=pl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),u=(s-this.radius)*.5;this.center.addScaledVector(pl,u/s),this.radius+=u}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pl.copy(e.center).add(Gd)),this.expandByPoint(pl.copy(e.center).sub(Gd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let gT=0;const Ti=new fn,Vd=new hi,$r=new st,ci=new Cl,ml=new Cl,An=new st;class fa extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gT++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(OE(e)?VS:GS)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const f=new he().getNormalMatrix(e);s.applyNormalMatrix(f),s.needsUpdate=!0}const u=this.attributes.tangent;return u!==void 0&&(u.transformDirection(e),u.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,i,s){return Ti.makeTranslation(e,i,s),this.applyMatrix4(Ti),this}scale(e,i,s){return Ti.makeScale(e,i,s),this.applyMatrix4(Ti),this}lookAt(e){return Vd.lookAt(e),Vd.updateMatrix(),this.applyMatrix4(Vd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($r).negate(),this.translate($r.x,$r.y,$r.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let u=0,f=e.length;u<f;u++){const h=e[u];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Ia(s,3))}else{const s=Math.min(e.length,i.count);for(let u=0;u<s;u++){const f=e[u];i.setXYZ(u,f.x,f.y,f.z||0)}e.length>i.count&&se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new st(-1/0,-1/0,-1/0),new st(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,u=i.length;s<u;s++){const f=i[s];ci.setFromBufferAttribute(f),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new em);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new st,1/0);return}if(e){const s=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];ml.setFromBufferAttribute(d),this.morphTargetsRelative?(An.addVectors(ci.min,ml.min),ci.expandByPoint(An),An.addVectors(ci.max,ml.max),ci.expandByPoint(An)):(ci.expandByPoint(ml.min),ci.expandByPoint(ml.max))}ci.getCenter(s);let u=0;for(let f=0,h=e.count;f<h;f++)An.fromBufferAttribute(e,f),u=Math.max(u,s.distanceToSquared(An));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],p=this.morphTargetsRelative;for(let m=0,S=d.count;m<S;m++)An.fromBufferAttribute(d,m),p&&($r.fromBufferAttribute(e,m),An.add($r)),u=Math.max(u,s.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(u),isNaN(this.boundingSphere.radius)&&Pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,u=i.normal,f=i.uv;let h=this.getAttribute("tangent");(h===void 0||h.count!==s.count)&&(h=new la(new Float32Array(4*s.count),4),this.setAttribute("tangent",h));const d=[],p=[];for(let T=0;T<s.count;T++)d[T]=new st,p[T]=new st;const m=new st,S=new st,_=new st,v=new re,E=new re,R=new re,D=new st,M=new st;function x(T,L,V){m.fromBufferAttribute(s,T),S.fromBufferAttribute(s,L),_.fromBufferAttribute(s,V),v.fromBufferAttribute(f,T),E.fromBufferAttribute(f,L),R.fromBufferAttribute(f,V),S.sub(m),_.sub(m),E.sub(v),R.sub(v);const W=1/(E.x*R.y-R.x*E.y);isFinite(W)&&(D.copy(S).multiplyScalar(R.y).addScaledVector(_,-E.y).multiplyScalar(W),M.copy(_).multiplyScalar(E.x).addScaledVector(S,-R.x).multiplyScalar(W),d[T].add(D),d[L].add(D),d[V].add(D),p[T].add(M),p[L].add(M),p[V].add(M))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let T=0,L=I.length;T<L;++T){const V=I[T],W=V.start,et=V.count;for(let ct=W,J=W+et;ct<J;ct+=3)x(e.getX(ct+0),e.getX(ct+1),e.getX(ct+2))}const K=new st,C=new st,U=new st,N=new st;function P(T){U.fromBufferAttribute(u,T),N.copy(U);const L=d[T];K.copy(L),K.sub(U.multiplyScalar(U.dot(L))).normalize(),C.crossVectors(N,L);const W=C.dot(p[T])<0?-1:1;h.setXYZW(T,K.x,K.y,K.z,W)}for(let T=0,L=I.length;T<L;++T){const V=I[T],W=V.start,et=V.count;for(let ct=W,J=W+et;ct<J;ct+=3)P(e.getX(ct+0)),P(e.getX(ct+1)),P(e.getX(ct+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new la(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let v=0,E=s.count;v<E;v++)s.setXYZ(v,0,0,0);const u=new st,f=new st,h=new st,d=new st,p=new st,m=new st,S=new st,_=new st;if(e)for(let v=0,E=e.count;v<E;v+=3){const R=e.getX(v+0),D=e.getX(v+1),M=e.getX(v+2);u.fromBufferAttribute(i,R),f.fromBufferAttribute(i,D),h.fromBufferAttribute(i,M),S.subVectors(h,f),_.subVectors(u,f),S.cross(_),d.fromBufferAttribute(s,R),p.fromBufferAttribute(s,D),m.fromBufferAttribute(s,M),d.add(S),p.add(S),m.add(S),s.setXYZ(R,d.x,d.y,d.z),s.setXYZ(D,p.x,p.y,p.z),s.setXYZ(M,m.x,m.y,m.z)}else for(let v=0,E=i.count;v<E;v+=3)u.fromBufferAttribute(i,v+0),f.fromBufferAttribute(i,v+1),h.fromBufferAttribute(i,v+2),S.subVectors(h,f),_.subVectors(u,f),S.cross(_),s.setXYZ(v+0,S.x,S.y,S.z),s.setXYZ(v+1,S.x,S.y,S.z),s.setXYZ(v+2,S.x,S.y,S.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)An.fromBufferAttribute(e,i),An.normalize(),e.setXYZ(i,An.x,An.y,An.z)}toNonIndexed(){function e(d,p){const m=d.array,S=d.itemSize,_=d.normalized,v=new m.constructor(p.length*S);let E=0,R=0;for(let D=0,M=p.length;D<M;D++){d.isInterleavedBufferAttribute?E=p[D]*d.data.stride+d.offset:E=p[D]*S;for(let x=0;x<S;x++)v[R++]=m[E++]}return new la(v,S,_)}if(this.index===null)return se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new fa,s=this.index.array,u=this.attributes;for(const d in u){const p=u[d],m=e(p,s);i.setAttribute(d,m)}const f=this.morphAttributes;for(const d in f){const p=[],m=f[d];for(let S=0,_=m.length;S<_;S++){const v=m[S],E=e(v,s);p.push(E)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const m=h[d];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const u={};let f=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],S=[];for(let _=0,v=m.length;_<v;_++){const E=m[_];S.push(E.toJSON(e.data))}S.length>0&&(u[p]=S,f=!0)}f&&(e.data.morphAttributes=u,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const u=e.attributes;for(const m in u){const S=u[m];this.setAttribute(m,S.clone(i))}const f=e.morphAttributes;for(const m in f){const S=[],_=f[m];for(let v=0,E=_.length;v<E;v++)S.push(_[v].clone(i));this.morphAttributes[m]=S}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let m=0,S=h.length;m<S;m++){const _=h[m];this.addGroup(_.start,_.count,_.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kd=new st,_T=new st,vT=new he;class Na{constructor(e=new st(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,u){return this.normal.set(e,i,s),this.constant=u,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const u=kd.subVectors(s,i).cross(_T.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(u,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const u=e.delta(kd),f=this.normal.dot(u);if(f===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const h=-(e.start.dot(this.normal)+this.constant)/f;return s===!0&&(h<0||h>1)?null:i.copy(e.start).addScaledVector(u,h)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||vT.getNormalMatrix(e),u=this.coplanarPoint(kd).applyMatrix4(e),f=this.normal.applyMatrix3(s).normalize();return this.constant=-u.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let ST=0;class Fc extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ST++}),this.uuid=po(),this.name="",this.type="Material",this.blending=xl,this.side=js,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=SS,this.blendDst=xS,this.blendEquation=io,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=El,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=AE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bd,this.stencilZFail=bd,this.stencilZPass=bd,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){se(`Material: parameter '${i}' has value of undefined.`);continue}const u=this[i];if(u===void 0){se(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}u&&u.isColor?u.set(s):u&&u.isVector2&&s&&s.isVector2||u&&u.isEuler&&s&&s.isEuler||u&&u.isVector3&&s&&s.isVector3?u.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(f=>f.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function u(f){const h=[];for(const d in f){const p=f[d];delete p.metadata,h.push(p)}return h}if(i){const f=u(e.textures),h=u(e.images);f.length>0&&(s.textures=f),h.length>0&&(s.images=h)}return s}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new He().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(s=>new Na().fromJSON(s))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new re().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const u=i.length;s=new Array(u);for(let f=0;f!==u;++f)s[f]=i[f].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ua=new st,Xd=new st,oc=new st,lc=new st;class kS{constructor(e=new st,i=new st(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ua)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ua.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ua.copy(this.origin).addScaledVector(this.direction,i),Ua.distanceToSquared(e))}distanceSqToSegment(e,i,s,u){Xd.copy(e).add(i).multiplyScalar(.5),oc.copy(i).sub(e).normalize(),lc.copy(this.origin).sub(Xd);const f=e.distanceTo(i)*.5,h=-this.direction.dot(oc),d=lc.dot(this.direction),p=-lc.dot(oc),m=lc.lengthSq(),S=Math.abs(1-h*h);let _,v,E,R;if(S>0)if(_=h*p-d,v=h*d-p,R=f*S,_>=0)if(v>=-R)if(v<=R){const D=1/S;_*=D,v*=D,E=_*(_+h*v+2*d)+v*(h*_+v+2*p)+m}else v=f,_=Math.max(0,-(h*v+d)),E=-_*_+v*(v+2*p)+m;else v=-f,_=Math.max(0,-(h*v+d)),E=-_*_+v*(v+2*p)+m;else v<=-R?(_=Math.max(0,-(-h*f+d)),v=_>0?-f:Math.min(Math.max(-f,-p),f),E=-_*_+v*(v+2*p)+m):v<=R?(_=0,v=Math.min(Math.max(-f,-p),f),E=v*(v+2*p)+m):(_=Math.max(0,-(h*f+d)),v=_>0?f:Math.min(Math.max(-f,-p),f),E=-_*_+v*(v+2*p)+m);else v=h>0?-f:f,_=Math.max(0,-(h*v+d)),E=-_*_+v*(v+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,_),u&&u.copy(Xd).addScaledVector(oc,v),E}intersectSphere(e,i){if(e.radius<0)return null;Ua.subVectors(e.center,this.origin);const s=Ua.dot(this.direction),u=Ua.dot(Ua)-s*s,f=e.radius*e.radius;if(u>f)return null;const h=Math.sqrt(f-u),d=s-h,p=s+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,u,f,h,d,p;const m=1/this.direction.x,S=1/this.direction.y,_=1/this.direction.z,v=this.origin;return m>=0?(s=(e.min.x-v.x)*m,u=(e.max.x-v.x)*m):(s=(e.max.x-v.x)*m,u=(e.min.x-v.x)*m),S>=0?(f=(e.min.y-v.y)*S,h=(e.max.y-v.y)*S):(f=(e.max.y-v.y)*S,h=(e.min.y-v.y)*S),s>h||f>u||((f>s||isNaN(s))&&(s=f),(h<u||isNaN(u))&&(u=h),_>=0?(d=(e.min.z-v.z)*_,p=(e.max.z-v.z)*_):(d=(e.max.z-v.z)*_,p=(e.min.z-v.z)*_),s>p||d>u)||((d>s||s!==s)&&(s=d),(p<u||u!==u)&&(u=p),u<0)?null:this.at(s>=0?s:u,i)}intersectsBox(e){return this.intersectBox(e,Ua)!==null}intersectTriangle(e,i,s,u,f){const h=this.origin,d=this.direction,p=d.x,m=d.y,S=d.z,_=e.x-h.x,v=e.y-h.y,E=e.z-h.z,R=i.x-h.x,D=i.y-h.y,M=i.z-h.z,x=s.x-h.x,I=s.y-h.y,K=s.z-h.z,C=Math.abs(p),U=Math.abs(m),N=Math.abs(S);let P,T,L,V,W,et,ct,J,$,q,X,ft;if(C>=U&&C>=N?(L=p,et=_,$=R,ft=x,p>=0?(P=m,T=S,V=v,W=E,ct=D,J=M,q=I,X=K):(P=S,T=m,V=E,W=v,ct=M,J=D,q=K,X=I)):U>=N?(L=m,et=v,$=D,ft=I,m>=0?(P=S,T=p,V=E,W=_,ct=M,J=R,q=K,X=x):(P=p,T=S,V=_,W=E,ct=R,J=M,q=x,X=K)):(L=S,et=E,$=M,ft=K,S>=0?(P=p,T=m,V=_,W=v,ct=R,J=D,q=x,X=I):(P=m,T=p,V=v,W=_,ct=D,J=R,q=I,X=x)),L===0)return null;const ot=P/L,dt=T/L,Mt=1/L,Qt=V-ot*et,Yt=W-dt*et,z=ct-ot*$,mt=J-dt*$,At=q-ot*ft,Y=X-dt*ft,ht=At*mt-Y*z,Tt=Qt*Y-Yt*At,It=z*Yt-mt*Qt;if(u){if(ht<0||Tt<0||It<0)return null}else if((ht<0||Tt<0||It<0)&&(ht>0||Tt>0||It>0))return null;const _t=ht+Tt+It;if(_t===0)return null;const Rt=Mt*(ht*et+Tt*$+It*ft);return(_t>0?Rt<0:Rt>0)?null:this.at(Rt/_t,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class XS extends Fc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new er,this.combine=yS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Fv=new fn,Ws=new kS,uc=new em,Hv=new st,cc=new st,fc=new st,hc=new st,qd=new st,dc=new st,Gv=new st,pc=new st;class ca extends hi{constructor(e=new fa,i=new XS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const u=i[s[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=u.length;f<h;f++){const d=u[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const s=this.geometry,u=s.attributes.position,f=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(u,e);const d=this.morphTargetInfluences;if(f&&d){dc.set(0,0,0);for(let p=0,m=f.length;p<m;p++){const S=d[p],_=f[p];S!==0&&(qd.fromBufferAttribute(_,e),h?dc.addScaledVector(qd,S):dc.addScaledVector(qd.sub(i),S))}i.add(dc)}return i}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,u=this.material,f=this.matrixWorld;u!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),uc.copy(s.boundingSphere),uc.applyMatrix4(f),Ws.copy(e.ray).recast(e.near),!(uc.containsPoint(Ws.origin)===!1&&(Ws.intersectSphere(uc,Hv)===null||Ws.origin.distanceToSquared(Hv)>(e.far-e.near)**2))&&(Fv.copy(f).invert(),Ws.copy(e.ray).applyMatrix4(Fv),!(s.boundingBox!==null&&Ws.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Ws)))}_computeIntersections(e,i,s){let u;const f=this.geometry,h=this.material,d=f.index,p=f.attributes.position,m=f.attributes.uv,S=f.attributes.uv1,_=f.attributes.normal,v=f.groups,E=f.drawRange;if(d!==null)if(Array.isArray(h))for(let R=0,D=v.length;R<D;R++){const M=v[R],x=h[M.materialIndex],I=Math.max(M.start,E.start),K=Math.min(d.count,Math.min(M.start+M.count,E.start+E.count));for(let C=I,U=K;C<U;C+=3){const N=d.getX(C),P=d.getX(C+1),T=d.getX(C+2);u=mc(this,x,e,s,m,S,_,N,P,T),u&&(u.faceIndex=Math.floor(C/3),u.face.materialIndex=M.materialIndex,i.push(u))}}else{const R=Math.max(0,E.start),D=Math.min(d.count,E.start+E.count);for(let M=R,x=D;M<x;M+=3){const I=d.getX(M),K=d.getX(M+1),C=d.getX(M+2);u=mc(this,h,e,s,m,S,_,I,K,C),u&&(u.faceIndex=Math.floor(M/3),i.push(u))}}else if(p!==void 0)if(Array.isArray(h))for(let R=0,D=v.length;R<D;R++){const M=v[R],x=h[M.materialIndex],I=Math.max(M.start,E.start),K=Math.min(p.count,Math.min(M.start+M.count,E.start+E.count));for(let C=I,U=K;C<U;C+=3){const N=C,P=C+1,T=C+2;u=mc(this,x,e,s,m,S,_,N,P,T),u&&(u.faceIndex=Math.floor(C/3),u.face.materialIndex=M.materialIndex,i.push(u))}}else{const R=Math.max(0,E.start),D=Math.min(p.count,E.start+E.count);for(let M=R,x=D;M<x;M+=3){const I=M,K=M+1,C=M+2;u=mc(this,h,e,s,m,S,_,I,K,C),u&&(u.faceIndex=Math.floor(M/3),i.push(u))}}}}function xT(o,e,i,s,u,f,h,d){let p;if(e.side===jn?p=s.intersectTriangle(h,f,u,!0,d):p=s.intersectTriangle(u,f,h,e.side===js,d),p===null)return null;pc.copy(d),pc.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(pc);return m<i.near||m>i.far?null:{distance:m,point:pc.clone(),object:o}}function mc(o,e,i,s,u,f,h,d,p,m){o.getVertexPosition(d,cc),o.getVertexPosition(p,fc),o.getVertexPosition(m,hc);const S=xT(o,e,i,s,cc,fc,hc,Gv);if(S){const _=new st;Fi.getBarycoord(Gv,cc,fc,hc,_),u&&(S.uv=Fi.getInterpolatedAttribute(u,d,p,m,_,new re)),f&&(S.uv1=Fi.getInterpolatedAttribute(f,d,p,m,_,new re)),h&&(S.normal=Fi.getInterpolatedAttribute(h,d,p,m,_,new st),S.normal.dot(s.direction)>0&&S.normal.multiplyScalar(-1));const v={a:d,b:p,c:m,normal:new st,materialIndex:0};Fi.getNormal(cc,fc,hc,v.normal),S.face=v,S.barycoord=_}return S}class yT extends qn{constructor(e=null,i=1,s=1,u,f,h,d,p,m=On,S=On,_,v){super(null,h,d,p,m,S,u,f,_,v),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ys=new em,MT=new re(.5,.5),gc=new st;class qS{constructor(e=new Na,i=new Na,s=new Na,u=new Na,f=new Na,h=new Na){this.planes=[e,i,s,u,f,h]}set(e,i,s,u,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(s),d[3].copy(u),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=oa,s=!1){const u=this.planes,f=e.elements,h=f[0],d=f[1],p=f[2],m=f[3],S=f[4],_=f[5],v=f[6],E=f[7],R=f[8],D=f[9],M=f[10],x=f[11],I=f[12],K=f[13],C=f[14],U=f[15];if(u[0].setComponents(m-h,E-S,x-R,U-I).normalize(),u[1].setComponents(m+h,E+S,x+R,U+I).normalize(),u[2].setComponents(m+d,E+_,x+D,U+K).normalize(),u[3].setComponents(m-d,E-_,x-D,U-K).normalize(),s)u[4].setComponents(p,v,M,C).normalize(),u[5].setComponents(m-p,E-v,x-M,U-C).normalize();else if(u[4].setComponents(m-p,E-v,x-M,U-C).normalize(),i===oa)u[5].setComponents(m+p,E+v,x+M,U+C).normalize();else if(i===Pc)u[5].setComponents(p,v,M,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ys.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ys)}intersectsSprite(e){Ys.center.set(0,0,0);const i=MT.distanceTo(e.center);return Ys.radius=.7071067811865476+i,Ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ys)}intersectsSphere(e){const i=this.planes,s=e.center,u=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(s)<u)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const u=i[s];if(gc.x=u.normal.x>0?e.max.x:e.min.x,gc.y=u.normal.y>0?e.max.y:e.min.y,gc.z=u.normal.z>0?e.max.z:e.min.z,u.distanceToPoint(gc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class WS extends qn{constructor(e=[],i=$s,s,u,f,h,d,p,m,S){super(e,i,s,u,f,h,d,p,m,S),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rl extends qn{constructor(e,i,s=ua,u,f,h,d=On,p=On,m,S=za,_=1){if(S!==za&&S!==Js)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:i,depth:_};super(v,u,f,h,d,p,S,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return i.compareFunction=this.compareFunction,i}}class ET extends Rl{constructor(e,i=ua,s=$s,u,f,h=On,d=On,p,m=za){const S={width:e,height:e,depth:1},_=[S,S,S,S,S,S];super(e,e,i,s,u,f,h,d,p,m),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class YS extends qn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class wl extends fa{constructor(e=1,i=1,s=1,u=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:u,heightSegments:f,depthSegments:h};const d=this;u=Math.floor(u),f=Math.floor(f),h=Math.floor(h);const p=[],m=[],S=[],_=[];let v=0,E=0;R("z","y","x",-1,-1,s,i,e,h,f,0),R("z","y","x",1,-1,s,i,-e,h,f,1),R("x","z","y",1,1,e,s,i,u,h,2),R("x","z","y",1,-1,e,s,-i,u,h,3),R("x","y","z",1,-1,e,i,s,u,f,4),R("x","y","z",-1,-1,e,i,-s,u,f,5),this.setIndex(p),this.setAttribute("position",new Ia(m,3)),this.setAttribute("normal",new Ia(S,3)),this.setAttribute("uv",new Ia(_,2));function R(D,M,x,I,K,C,U,N,P,T,L){const V=C/P,W=U/T,et=C/2,ct=U/2,J=N/2,$=P+1,q=T+1;let X=0,ft=0;const ot=new st;for(let dt=0;dt<q;dt++){const Mt=dt*W-ct;for(let Qt=0;Qt<$;Qt++){const Yt=Qt*V-et;ot[D]=Yt*I,ot[M]=Mt*K,ot[x]=J,m.push(ot.x,ot.y,ot.z),ot[D]=0,ot[M]=0,ot[x]=N>0?1:-1,S.push(ot.x,ot.y,ot.z),_.push(Qt/P),_.push(1-dt/T),X+=1}}for(let dt=0;dt<T;dt++)for(let Mt=0;Mt<P;Mt++){const Qt=v+Mt+$*dt,Yt=v+Mt+$*(dt+1),z=v+(Mt+1)+$*(dt+1),mt=v+(Mt+1)+$*dt;p.push(Qt,Yt,mt),p.push(Yt,z,mt),ft+=6}d.addGroup(E,ft,L),E+=ft,v+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Hc extends fa{constructor(e=1,i=1,s=1,u=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:u};const f=e/2,h=i/2,d=Math.floor(s),p=Math.floor(u),m=d+1,S=p+1,_=e/d,v=i/p,E=[],R=[],D=[],M=[];for(let x=0;x<S;x++){const I=x*v-h;for(let K=0;K<m;K++){const C=K*_-f;R.push(C,-I,0),D.push(0,0,1),M.push(K/d),M.push(1-x/p)}}for(let x=0;x<p;x++)for(let I=0;I<d;I++){const K=I+m*x,C=I+m*(x+1),U=I+1+m*(x+1),N=I+1+m*x;E.push(K,C,N),E.push(C,U,N)}this.setIndex(E),this.setAttribute("position",new Ia(R,3)),this.setAttribute("normal",new Ia(D,3)),this.setAttribute("uv",new Ia(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hc(e.width,e.height,e.widthSegments,e.heightSegments)}}function ho(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const u=o[i][s];if(Vv(u))u.isRenderTargetTexture?(se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=u.clone();else if(Array.isArray(u))if(Vv(u[0])){const f=[];for(let h=0,d=u.length;h<d;h++)f[h]=u[h].clone();e[i][s]=f}else e[i][s]=u.slice();else e[i][s]=u}}return e}function Xn(o){const e={};for(let i=0;i<o.length;i++){const s=ho(o[i]);for(const u in s)e[u]=s[u]}return e}function Vv(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function TT(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function ZS(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ue.workingColorSpace}const bT={clone:ho,merge:Xn};var AT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends Fc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AT,this.fragmentShader=RT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=TT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const u in this.uniforms){const h=this.uniforms[u].value;h&&h.isTexture?i.uniforms[u]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[u]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[u]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[u]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[u]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[u]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[u]={type:"m4",value:h.toArray()}:i.uniforms[u]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const u in this.extensions)this.extensions[u]===!0&&(s[u]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const s in e.uniforms){const u=e.uniforms[s];switch(this.uniforms[s]={},u.type){case"t":this.uniforms[s].value=i[u.value]||null;break;case"c":this.uniforms[s].value=new He().setHex(u.value);break;case"v2":this.uniforms[s].value=new re().fromArray(u.value);break;case"v3":this.uniforms[s].value=new st().fromArray(u.value);break;case"v4":this.uniforms[s].value=new un().fromArray(u.value);break;case"m3":this.uniforms[s].value=new he().fromArray(u.value);break;case"m4":this.uniforms[s].value=new fn().fromArray(u.value);break;default:this.uniforms[s].value=u.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class CT extends Vi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class wT extends Fc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=TE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class DT extends Fc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _c=new st,vc=new Ss,ia=new st;class KS extends hi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fn,this.projectionMatrix=new fn,this.projectionMatrixInverse=new fn,this.coordinateSystem=oa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_c,vc,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_c,vc,ia.set(1,1,1)).invert()}updateWorldMatrix(e,i,s=!1){super.updateWorldMatrix(e,i,s),this.matrixWorld.decompose(_c,vc,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_c,vc,ia.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gs=new st,kv=new re,Xv=new re;class Ai extends KS{constructor(e=50,i=1,s=.1,u=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=u,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Al*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Al*2*Math.atan(Math.tan(yl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-e/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(gs.x,gs.y).multiplyScalar(-e/gs.z)}getViewSize(e,i){return this.getViewBounds(e,kv,Xv),i.subVectors(Xv,kv)}setViewOffset(e,i,s,u,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(yl*.5*this.fov)/this.zoom,s=2*i,u=this.aspect*s,f=-.5*u;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,m=h.fullHeight;f+=h.offsetX*u/p,i-=h.offsetY*s/m,u*=h.width/p,s*=h.height/m}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+u,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class nm extends KS{constructor(e=-1,i=1,s=1,u=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=u,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,u,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,u=(this.top+this.bottom)/2;let f=s-e,h=s+e,d=u+i,p=u-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,S=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=m*this.view.offsetX,h=f+m*this.view.width,d-=S*this.view.offsetY,p=d-S*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const to=-90,eo=1;class UT extends hi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const u=new Ai(to,eo,e,i);u.layers=this.layers,this.add(u);const f=new Ai(to,eo,e,i);f.layers=this.layers,this.add(f);const h=new Ai(to,eo,e,i);h.layers=this.layers,this.add(h);const d=new Ai(to,eo,e,i);d.layers=this.layers,this.add(d);const p=new Ai(to,eo,e,i);p.layers=this.layers,this.add(p);const m=new Ai(to,eo,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,u,f,h,d,p]=i;for(const m of i)this.remove(m);if(e===oa)s.up.set(0,1,0),s.lookAt(1,0,0),u.up.set(0,1,0),u.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Pc)s.up.set(0,-1,0),s.lookAt(-1,0,0),u.up.set(0,-1,0),u.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:u}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,p,m,S]=this.children,_=e.getRenderTarget(),v=e.getActiveCubeFace(),E=e.getActiveMipmapLevel(),R=e.xr.enabled;e.xr.enabled=!1;const D=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let M=!1;e.isWebGLRenderer===!0?M=e.state.buffers.depth.getReversed():M=e.reversedDepthBuffer,e.setRenderTarget(s,0,u),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,1,u),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,2,u),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(s,3,u),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(s,4,u),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),s.texture.generateMipmaps=D,e.setRenderTarget(s,5,u),M&&e.autoClear===!1&&e.clearDepth(),e.render(i,S),e.setRenderTarget(_,v,E),e.xr.enabled=R,s.texture.needsPMREMUpdate=!0}}class NT extends Ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class LT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,se("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}class Hp{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(ye(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class QS{static{QS.prototype.isMatrix2=!0}constructor(e,i,s,u){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,u)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,u){const f=this.elements;return f[0]=e,f[2]=i,f[1]=s,f[3]=u,this}}class OT extends xs{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function qv(o,e,i,s){const u=PT(s);switch(i){case OS:return o*e;case IS:return o*e/u.components*u.byteLength;case Zp:return o*e/u.components*u.byteLength;case tr:return o*e*2/u.components*u.byteLength;case Kp:return o*e*2/u.components*u.byteLength;case PS:return o*e*3/u.components*u.byteLength;case Ri:return o*e*4/u.components*u.byteLength;case Qp:return o*e*4/u.components*u.byteLength;case Rc:case Cc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case wc:case Dc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case fp:case dp:return Math.max(o,16)*Math.max(e,8)/4;case cp:case hp:return Math.max(o,8)*Math.max(e,8)/2;case pp:case mp:case _p:case vp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case gp:case Nc:case Sp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case xp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case yp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case Mp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Ep:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Tp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case bp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Ap:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Rp:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Cp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case wp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Dp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Up:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Np:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Lp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Op:case Pp:case Ip:return Math.ceil(o/4)*Math.ceil(e/4)*16;case zp:case Bp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Lc:case Fp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function PT(o){switch(o){case fi:case DS:return{byteLength:1,components:1};case Tl:case US:case wi:return{byteLength:2,components:1};case Wp:case Yp:return{byteLength:2,components:4};case ua:case qp:case ra:return{byteLength:4,components:1};case NS:case LS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xp}}));typeof window<"u"&&(window.__THREE__?se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xp);function JS(){let o=null,e=!1,i=null,s=null;function u(f,h){s=o.requestAnimationFrame(u),i(f,h)}return{start:function(){e!==!0&&i!==null&&o!==null&&(s=o.requestAnimationFrame(u),e=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function IT(o){const e=new WeakMap;function i(d,p){const m=d.array,S=d.usage,_=m.byteLength,v=o.createBuffer();o.bindBuffer(p,v),o.bufferData(p,m,S),d.onUploadCallback();let E;if(m instanceof Float32Array)E=o.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)E=o.HALF_FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?E=o.HALF_FLOAT:E=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)E=o.SHORT;else if(m instanceof Uint32Array)E=o.UNSIGNED_INT;else if(m instanceof Int32Array)E=o.INT;else if(m instanceof Int8Array)E=o.BYTE;else if(m instanceof Uint8Array)E=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)E=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:v,type:E,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,p,m){const S=p.array,_=p.updateRanges;if(o.bindBuffer(m,d),_.length===0)o.bufferSubData(m,0,S);else{_.sort((E,R)=>E.start-R.start);let v=0;for(let E=1;E<_.length;E++){const R=_[v],D=_[E];D.start<=R.start+R.count+1?R.count=Math.max(R.count,D.start+D.count-R.start):(++v,_[v]=D)}_.length=v+1;for(let E=0,R=_.length;E<R;E++){const D=_[E];o.bufferSubData(m,D.start*S.BYTES_PER_ELEMENT,S,D.start,D.count)}p.clearUpdateRanges()}p.onUploadCallback()}function u(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(o.deleteBuffer(p.buffer),e.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const S=e.get(d);(!S||S.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,i(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,d,p),m.version=d.version}}return{get:u,remove:f,update:h}}var zT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,BT=`#ifdef USE_ALPHAHASH
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
#endif`,FT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,HT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,VT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kT=`#ifdef USE_AOMAP
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
#endif`,XT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qT=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,WT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,YT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ZT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,KT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,QT=`#ifdef USE_IRIDESCENCE
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
#endif`,JT=`#ifdef USE_BUMPMAP
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
#endif`,jT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$T=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ib=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ab=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rb=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,ob=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lb=`vec3 transformedNormal = objectNormal;
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
#endif`,ub=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,db="gl_FragColor = linearToOutputTexel( gl_FragColor );",pb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_b=`#ifdef USE_ENVMAP
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
#endif`,vb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tb=`#ifdef USE_GRADIENTMAP
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
}`,bb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ab=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cb=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,wb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Db=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ub=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ob=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,Pb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ib=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fb=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Hb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yb=`#if defined( USE_POINTS_UV )
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
#endif`,Zb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$b=`#ifdef USE_MORPHTARGETS
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
#endif`,t1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,n1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,i1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,r1=`#ifdef USE_NORMALMAP
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
#endif`,o1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,l1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,u1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,c1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,f1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,h1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,d1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,p1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,m1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,g1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,v1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,S1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,x1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,y1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,M1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,E1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,T1=`#ifdef USE_SKINNING
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
#endif`,b1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A1=`#ifdef USE_SKINNING
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
#endif`,R1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,C1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,D1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,U1=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,N1=`#ifdef USE_TRANSMISSION
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
#endif`,L1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const z1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,B1=`uniform sampler2D t2D;
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
}`,F1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k1=`#include <common>
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
}`,X1=`#if DEPTH_PACKING == 3200
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
}`,q1=`#define DISTANCE
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
}`,W1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Y1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Z1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K1=`uniform float scale;
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
}`,Q1=`uniform vec3 diffuse;
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
}`,J1=`#include <common>
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
}`,j1=`uniform vec3 diffuse;
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
}`,$1=`#define LAMBERT
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
}`,tA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,eA=`#define MATCAP
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
}`,nA=`#define MATCAP
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
}`,iA=`#define NORMAL
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
}`,aA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sA=`#define PHONG
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
}`,rA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,oA=`#define STANDARD
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
}`,lA=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,uA=`#define TOON
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
}`,cA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,fA=`uniform float size;
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
}`,hA=`uniform vec3 diffuse;
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
}`,dA=`#include <common>
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
}`,pA=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,mA=`uniform float rotation;
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
}`,gA=`uniform vec3 diffuse;
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
}`,ge={alphahash_fragment:zT,alphahash_pars_fragment:BT,alphamap_fragment:FT,alphamap_pars_fragment:HT,alphatest_fragment:GT,alphatest_pars_fragment:VT,aomap_fragment:kT,aomap_pars_fragment:XT,batching_pars_vertex:qT,batching_vertex:WT,begin_vertex:YT,beginnormal_vertex:ZT,bsdfs:KT,iridescence_fragment:QT,bumpmap_pars_fragment:JT,clipping_planes_fragment:jT,clipping_planes_pars_fragment:$T,clipping_planes_pars_vertex:tb,clipping_planes_vertex:eb,color_fragment:nb,color_pars_fragment:ib,color_pars_vertex:ab,color_vertex:sb,common:rb,cube_uv_reflection_fragment:ob,defaultnormal_vertex:lb,displacementmap_pars_vertex:ub,displacementmap_vertex:cb,emissivemap_fragment:fb,emissivemap_pars_fragment:hb,colorspace_fragment:db,colorspace_pars_fragment:pb,envmap_fragment:mb,envmap_common_pars_fragment:gb,envmap_pars_fragment:_b,envmap_pars_vertex:vb,envmap_physical_pars_fragment:wb,envmap_vertex:Sb,fog_vertex:xb,fog_pars_vertex:yb,fog_fragment:Mb,fog_pars_fragment:Eb,gradientmap_pars_fragment:Tb,lightmap_pars_fragment:bb,lights_lambert_fragment:Ab,lights_lambert_pars_fragment:Rb,lights_pars_begin:Cb,lights_toon_fragment:Db,lights_toon_pars_fragment:Ub,lights_phong_fragment:Nb,lights_phong_pars_fragment:Lb,lights_physical_fragment:Ob,lights_physical_pars_fragment:Pb,lights_fragment_begin:Ib,lights_fragment_maps:zb,lights_fragment_end:Bb,lightprobes_pars_fragment:Fb,logdepthbuf_fragment:Hb,logdepthbuf_pars_fragment:Gb,logdepthbuf_pars_vertex:Vb,logdepthbuf_vertex:kb,map_fragment:Xb,map_pars_fragment:qb,map_particle_fragment:Wb,map_particle_pars_fragment:Yb,metalnessmap_fragment:Zb,metalnessmap_pars_fragment:Kb,morphinstance_vertex:Qb,morphcolor_vertex:Jb,morphnormal_vertex:jb,morphtarget_pars_vertex:$b,morphtarget_vertex:t1,normal_fragment_begin:e1,normal_fragment_maps:n1,normal_pars_fragment:i1,normal_pars_vertex:a1,normal_vertex:s1,normalmap_pars_fragment:r1,clearcoat_normal_fragment_begin:o1,clearcoat_normal_fragment_maps:l1,clearcoat_pars_fragment:u1,iridescence_pars_fragment:c1,opaque_fragment:f1,packing:h1,premultiplied_alpha_fragment:d1,project_vertex:p1,dithering_fragment:m1,dithering_pars_fragment:g1,roughnessmap_fragment:_1,roughnessmap_pars_fragment:v1,shadowmap_pars_fragment:S1,shadowmap_pars_vertex:x1,shadowmap_vertex:y1,shadowmask_pars_fragment:M1,skinbase_vertex:E1,skinning_pars_vertex:T1,skinning_vertex:b1,skinnormal_vertex:A1,specularmap_fragment:R1,specularmap_pars_fragment:C1,tonemapping_fragment:w1,tonemapping_pars_fragment:D1,transmission_fragment:U1,transmission_pars_fragment:N1,uv_pars_fragment:L1,uv_pars_vertex:O1,uv_vertex:P1,worldpos_vertex:I1,background_vert:z1,background_frag:B1,backgroundCube_vert:F1,backgroundCube_frag:H1,cube_vert:G1,cube_frag:V1,depth_vert:k1,depth_frag:X1,distance_vert:q1,distance_frag:W1,equirect_vert:Y1,equirect_frag:Z1,linedashed_vert:K1,linedashed_frag:Q1,meshbasic_vert:J1,meshbasic_frag:j1,meshlambert_vert:$1,meshlambert_frag:tA,meshmatcap_vert:eA,meshmatcap_frag:nA,meshnormal_vert:iA,meshnormal_frag:aA,meshphong_vert:sA,meshphong_frag:rA,meshphysical_vert:oA,meshphysical_frag:lA,meshtoon_vert:uA,meshtoon_frag:cA,points_vert:fA,points_frag:hA,shadow_vert:dA,shadow_frag:pA,sprite_vert:mA,sprite_frag:gA},Ft={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new st},probesMax:{value:new st},probesResolution:{value:new st}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},sa={basic:{uniforms:Xn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Xn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Xn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Xn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Xn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new He(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Xn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Xn([Ft.points,Ft.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Xn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Xn([Ft.common,Ft.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Xn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Xn([Ft.sprite,Ft.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distance:{uniforms:Xn([Ft.common,Ft.displacementmap,{referencePosition:{value:new st},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distance_vert,fragmentShader:ge.distance_frag},shadow:{uniforms:Xn([Ft.lights,Ft.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};sa.physical={uniforms:Xn([sa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};const Sc={r:0,b:0,g:0},_A=new fn,jS=new he;jS.set(-1,0,0,0,1,0,0,0,1);function vA(o,e,i,s,u,f){const h=new He(0);let d=u===!0?0:1,p,m,S=null,_=0,v=null;function E(I){let K=I.isScene===!0?I.background:null;if(K&&K.isTexture){const C=I.backgroundBlurriness>0;K=e.get(K,C)}return K}function R(I){let K=!1;const C=E(I);C===null?M(h,d):C&&C.isColor&&(M(C,1),K=!0);const U=o.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,f):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(o.autoClear||K)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function D(I,K){const C=E(K);C&&(C.isCubeTexture||C.mapping===Bc)?(m===void 0&&(m=new ca(new wl(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:ho(sa.backgroundCube.uniforms),vertexShader:sa.backgroundCube.vertexShader,fragmentShader:sa.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(U,N,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=C,m.material.uniforms.backgroundBlurriness.value=K.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=K.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(_A.makeRotationFromEuler(K.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(jS),m.material.toneMapped=Ue.getTransfer(C.colorSpace)!==We,(S!==C||_!==C.version||v!==o.toneMapping)&&(m.material.needsUpdate=!0,S=C,_=C.version,v=o.toneMapping),m.layers.enableAll(),I.unshift(m,m.geometry,m.material,0,0,null)):C&&C.isTexture&&(p===void 0&&(p=new ca(new Hc(2,2),new Vi({name:"BackgroundMaterial",uniforms:ho(sa.background.uniforms),vertexShader:sa.background.vertexShader,fragmentShader:sa.background.fragmentShader,side:js,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(p)),p.material.uniforms.t2D.value=C,p.material.uniforms.backgroundIntensity.value=K.backgroundIntensity,p.material.toneMapped=Ue.getTransfer(C.colorSpace)!==We,C.matrixAutoUpdate===!0&&C.updateMatrix(),p.material.uniforms.uvTransform.value.copy(C.matrix),(S!==C||_!==C.version||v!==o.toneMapping)&&(p.material.needsUpdate=!0,S=C,_=C.version,v=o.toneMapping),p.layers.enableAll(),I.unshift(p,p.geometry,p.material,0,0,null))}function M(I,K){I.getRGB(Sc,ZS(o)),i.buffers.color.setClear(Sc.r,Sc.g,Sc.b,K,f)}function x(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return h},setClearColor:function(I,K=1){h.set(I),d=K,M(h,d)},getClearAlpha:function(){return d},setClearAlpha:function(I){d=I,M(h,d)},render:R,addToRenderList:D,dispose:x}}function SA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},u=v(null);let f=u,h=!1;function d(W,et,ct,J,$){let q=!1;const X=_(W,J,ct,et);f!==X&&(f=X,m(f.object)),q=E(W,J,ct,$),q&&R(W,J,ct,$),$!==null&&e.update($,o.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,C(W,et,ct,J),$!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function p(){return o.createVertexArray()}function m(W){return o.bindVertexArray(W)}function S(W){return o.deleteVertexArray(W)}function _(W,et,ct,J){const $=J.wireframe===!0;let q=s[et.id];q===void 0&&(q={},s[et.id]=q);const X=W.isInstancedMesh===!0?W.id:0;let ft=q[X];ft===void 0&&(ft={},q[X]=ft);let ot=ft[ct.id];ot===void 0&&(ot={},ft[ct.id]=ot);let dt=ot[$];return dt===void 0&&(dt=v(p()),ot[$]=dt),dt}function v(W){const et=[],ct=[],J=[];for(let $=0;$<i;$++)et[$]=0,ct[$]=0,J[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:et,enabledAttributes:ct,attributeDivisors:J,object:W,attributes:{},index:null}}function E(W,et,ct,J){const $=f.attributes,q=et.attributes;let X=0;const ft=ct.getAttributes();for(const ot in ft)if(ft[ot].location>=0){const Mt=$[ot];let Qt=q[ot];if(Qt===void 0&&(ot==="instanceMatrix"&&W.instanceMatrix&&(Qt=W.instanceMatrix),ot==="instanceColor"&&W.instanceColor&&(Qt=W.instanceColor)),Mt===void 0||Mt.attribute!==Qt||Qt&&Mt.data!==Qt.data)return!0;X++}return f.attributesNum!==X||f.index!==J}function R(W,et,ct,J){const $={},q=et.attributes;let X=0;const ft=ct.getAttributes();for(const ot in ft)if(ft[ot].location>=0){let Mt=q[ot];Mt===void 0&&(ot==="instanceMatrix"&&W.instanceMatrix&&(Mt=W.instanceMatrix),ot==="instanceColor"&&W.instanceColor&&(Mt=W.instanceColor));const Qt={};Qt.attribute=Mt,Mt&&Mt.data&&(Qt.data=Mt.data),$[ot]=Qt,X++}f.attributes=$,f.attributesNum=X,f.index=J}function D(){const W=f.newAttributes;for(let et=0,ct=W.length;et<ct;et++)W[et]=0}function M(W){x(W,0)}function x(W,et){const ct=f.newAttributes,J=f.enabledAttributes,$=f.attributeDivisors;ct[W]=1,J[W]===0&&(o.enableVertexAttribArray(W),J[W]=1),$[W]!==et&&(o.vertexAttribDivisor(W,et),$[W]=et)}function I(){const W=f.newAttributes,et=f.enabledAttributes;for(let ct=0,J=et.length;ct<J;ct++)et[ct]!==W[ct]&&(o.disableVertexAttribArray(ct),et[ct]=0)}function K(W,et,ct,J,$,q,X){X===!0?o.vertexAttribIPointer(W,et,ct,$,q):o.vertexAttribPointer(W,et,ct,J,$,q)}function C(W,et,ct,J){D();const $=J.attributes,q=ct.getAttributes(),X=et.defaultAttributeValues;for(const ft in q){const ot=q[ft];if(ot.location>=0){let dt=$[ft];if(dt===void 0&&(ft==="instanceMatrix"&&W.instanceMatrix&&(dt=W.instanceMatrix),ft==="instanceColor"&&W.instanceColor&&(dt=W.instanceColor)),dt!==void 0){const Mt=dt.normalized,Qt=dt.itemSize,Yt=e.get(dt);if(Yt===void 0)continue;const z=Yt.buffer,mt=Yt.type,At=Yt.bytesPerElement,Y=mt===o.INT||mt===o.UNSIGNED_INT||dt.gpuType===qp;if(dt.isInterleavedBufferAttribute){const ht=dt.data,Tt=ht.stride,It=dt.offset;if(ht.isInstancedInterleavedBuffer){for(let _t=0;_t<ot.locationSize;_t++)x(ot.location+_t,ht.meshPerAttribute);W.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let _t=0;_t<ot.locationSize;_t++)M(ot.location+_t);o.bindBuffer(o.ARRAY_BUFFER,z);for(let _t=0;_t<ot.locationSize;_t++)K(ot.location+_t,Qt/ot.locationSize,mt,Mt,Tt*At,(It+Qt/ot.locationSize*_t)*At,Y)}else{if(dt.isInstancedBufferAttribute){for(let ht=0;ht<ot.locationSize;ht++)x(ot.location+ht,dt.meshPerAttribute);W.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let ht=0;ht<ot.locationSize;ht++)M(ot.location+ht);o.bindBuffer(o.ARRAY_BUFFER,z);for(let ht=0;ht<ot.locationSize;ht++)K(ot.location+ht,Qt/ot.locationSize,mt,Mt,Qt*At,Qt/ot.locationSize*ht*At,Y)}}else if(X!==void 0){const Mt=X[ft];if(Mt!==void 0)switch(Mt.length){case 2:o.vertexAttrib2fv(ot.location,Mt);break;case 3:o.vertexAttrib3fv(ot.location,Mt);break;case 4:o.vertexAttrib4fv(ot.location,Mt);break;default:o.vertexAttrib1fv(ot.location,Mt)}}}}I()}function U(){L();for(const W in s){const et=s[W];for(const ct in et){const J=et[ct];for(const $ in J){const q=J[$];for(const X in q)S(q[X].object),delete q[X];delete J[$]}}delete s[W]}}function N(W){if(s[W.id]===void 0)return;const et=s[W.id];for(const ct in et){const J=et[ct];for(const $ in J){const q=J[$];for(const X in q)S(q[X].object),delete q[X];delete J[$]}}delete s[W.id]}function P(W){for(const et in s){const ct=s[et];for(const J in ct){const $=ct[J];if($[W.id]===void 0)continue;const q=$[W.id];for(const X in q)S(q[X].object),delete q[X];delete $[W.id]}}}function T(W){for(const et in s){const ct=s[et],J=W.isInstancedMesh===!0?W.id:0,$=ct[J];if($!==void 0){for(const q in $){const X=$[q];for(const ft in X)S(X[ft].object),delete X[ft];delete $[q]}delete ct[J],Object.keys(ct).length===0&&delete s[et]}}}function L(){V(),h=!0,f!==u&&(f=u,m(f.object))}function V(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:d,reset:L,resetDefaultState:V,dispose:U,releaseStatesOfGeometry:N,releaseStatesOfObject:T,releaseStatesOfProgram:P,initAttributes:D,enableAttribute:M,disableUnusedAttributes:I}}function xA(o,e,i){let s;function u(p){s=p}function f(p,m){o.drawArrays(s,p,m),i.update(m,s,1)}function h(p,m,S){S!==0&&(o.drawArraysInstanced(s,p,m,S),i.update(m,s,S))}function d(p,m,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,m,0,S);let v=0;for(let E=0;E<S;E++)v+=m[E];i.update(v,s,1)}this.setMode=u,this.render=f,this.renderInstances=h,this.renderMultiDraw=d}function yA(o,e,i,s){let u;function f(){if(u!==void 0)return u;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");u=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else u=0;return u}function h(P){return!(P!==Ri&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const T=P===wi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==fi&&P!==ra&&!T&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE))}function p(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const S=p(m);S!==m&&(se("WebGLRenderer:",m,"not supported, using",S,"instead."),m=S);const _=i.logarithmicDepthBuffer===!0,v=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&v===!1&&se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),R=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=o.getParameter(o.MAX_TEXTURE_SIZE),M=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),x=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),K=o.getParameter(o.MAX_VARYING_VECTORS),C=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),U=o.getParameter(o.MAX_SAMPLES),N=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:E,maxVertexTextures:R,maxTextureSize:D,maxCubemapSize:M,maxAttributes:x,maxVertexUniforms:I,maxVaryings:K,maxFragmentUniforms:C,maxSamples:U,samples:N}}function MA(o){const e=this;let i=null,s=0,u=!1,f=!1;const h=new Na,d=new he,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const E=_.length!==0||v||s!==0||u;return u=v,s=_.length,E},this.beginShadows=function(){f=!0,S(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(_,v){i=S(_,v,0)},this.setState=function(_,v,E){const R=_.clippingPlanes,D=_.clipIntersection,M=_.clipShadows,x=o.get(_);if(!u||R===null||R.length===0||f&&!M)f?S(null):m();else{const I=f?0:s,K=I*4;let C=x.clippingState||null;p.value=C,C=S(R,v,K,E);for(let U=0;U!==K;++U)C[U]=i[U];x.clippingState=C,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=I}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function S(_,v,E,R){const D=_!==null?_.length:0;let M=null;if(D!==0){if(M=p.value,R!==!0||M===null){const x=E+D*4,I=v.matrixWorldInverse;d.getNormalMatrix(I),(M===null||M.length<x)&&(M=new Float32Array(x));for(let K=0,C=E;K!==D;++K,C+=4)h.copy(_[K]).applyMatrix4(I,d),h.normal.toArray(M,C),M[C+3]=h.constant}p.value=M,p.needsUpdate=!0}return e.numPlanes=D,e.numIntersection=0,M}}const ro=4,EA=6,TA=20,bA=256,gl=new nm,Wv=new He;let Wd=null,Yd=0,Zd=0,Kd=!1;const AA=new st,Zs=new st;class Yv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,u=100,f={}){const{size:h=256,position:d=AA}=f;Wd=this._renderer.getRenderTarget(),Yd=this._renderer.getActiveCubeFace(),Zd=this._renderer.getActiveMipmapLevel(),Kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,u,p,d),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wd,Yd,Zd),this._renderer.xr.enabled=Kd,e.scissorTest=!1,no(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===$s||e.mapping===co?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wd=this._renderer.getRenderTarget(),Yd=this._renderer.getActiveCubeFace(),Zd=this._renderer.getActiveMipmapLevel(),Kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:wi,format:Ri,colorSpace:fo,depthBuffer:!1},u=Zv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zv(e,i,s);const{_lodMax:f}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=RA(f)),this._blurMaterial=wA(f,e,i),this._ggxMaterial=CA(f,e,i)}return u}_compileMaterial(e){const i=new ca(new fa,e);this._renderer.compile(i,gl)}_sceneToCubeUV(e,i,s,u,f){const p=new Ai(90,1,i,s),m=[1,-1,1,1,1,1],S=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,E=_.toneMapping;_.getClearColor(Wv),_.toneMapping=Gi,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(u),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ca(new wl,new XS({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,M=D.material;let x=!1;const I=e.background;I?I.isColor&&(M.color.copy(I),e.background=null,x=!0):(M.color.copy(Wv),x=!0);for(let K=0;K<6;K++){const C=K%3;C===0?(p.up.set(0,m[K],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+S[K],f.y,f.z)):C===1?(p.up.set(0,0,m[K]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+S[K],f.z)):(p.up.set(0,m[K],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+S[K]));const U=this._cubeSize;no(u,C*U,K>2?U:0,U,U),_.setRenderTarget(u),x&&_.render(D,p),_.render(e,p)}_.toneMapping=E,_.autoClear=v,e.background=I}_textureToCubeUV(e,i){const s=this._renderer,u=e.mapping===$s||e.mapping===co;u?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kv());const f=u?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=f;const d=f.uniforms;d.envMap.value=e;const p=this._cubeSize;no(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(h,gl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const u=this._lodMeshes.length;for(let f=1;f<u;f++)this._applyGGXFilter(e,f-1,f);i.autoClear=s}_applyGGXFilter(e,i,s){const u=this._renderer,f=this._pingPongRenderTarget,h=this._ggxMaterial,d=this._lodMeshes[s];d.material=h;const p=h.uniforms,m=s/(this._lodMeshes.length-1),S=i/(this._lodMeshes.length-1),_=Math.sqrt(m*m-S*S),v=m*1.25,E=_*v,{_lodMax:R}=this,D=this._sizeLods[s],M=3*D*(s>R-ro?s-R+ro:0),x=4*(this._cubeSize-D);p.envMap.value=e.texture,p.roughness.value=E,p.mipInt.value=R-i,no(f,M,x,3*D,2*D),u.setRenderTarget(f),u.render(d,gl),p.envMap.value=f.texture,p.roughness.value=0,p.mipInt.value=R-s,no(e,M,x,3*D,2*D),u.setRenderTarget(e),u.render(d,gl)}_blur(e,i,s,u){const f=this._pingPongRenderTarget,h=Math.min(u,Math.PI)/Math.SQRT2;this._blurPass(e,f,i,s,h),this._blurPass(f,e,s,s,h)}_blurPass(e,i,s,u,f){const h=this._renderer,d=this._blurMaterial,p=this._lodMeshes[u];p.material=d;const m=d.uniforms;m.envMap.value=e.texture,m.sigma.value=f,m.mipInt.value=this._lodMax-s;const S=this._sizeLods[u],_=3*S*(u>this._lodMax-ro?u-this._lodMax+ro:0),v=4*(this._cubeSize-S);no(i,_,v,3*S,2*S),h.setRenderTarget(i),h.render(p,gl)}}function RA(o){const e=[],i=[];let s=o;const u=o-ro+1+EA;for(let f=0;f<u;f++){const h=Math.pow(2,s);e.push(h);const d=1/(h-2),p=-d,m=1+d,S=[p,p,m,p,m,m,p,p,m,m,p,m],_=6,v=6,E=3,R=new Float32Array(E*v*_),D=new Float32Array(E*v*_);for(let x=0;x<_;x++){const I=x%3*2/3-1,K=x>2?0:-1,C=[I,K,0,I+2/3,K,0,I+2/3,K+1,0,I,K,0,I+2/3,K+1,0,I,K+1,0];R.set(C,E*v*x);for(let U=0;U<v;U++){const N=S[U*2]*2-1,P=S[U*2+1]*2-1;x===0?Zs.set(1,P,N):x===1?Zs.set(-N,1,-P):x===2?Zs.set(-N,P,1):x===3?Zs.set(-1,P,-N):x===4?Zs.set(-N,-1,P):Zs.set(N,P,-1),Zs.toArray(D,(x*v+U)*E)}}const M=new fa;M.setAttribute("position",new la(R,E)),M.setAttribute("outputDirection",new la(D,E)),i.push(new ca(M,null)),s>ro&&s--}return{lodMeshes:i,sizeLods:e}}function Zv(o,e,i){const s=new Ci(o,e,i);return s.texture.mapping=Bc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function no(o,e,i,s,u){o.viewport.set(e,i,s,u),o.scissor.set(e,i,s,u)}function CA(o,e,i){return new Vi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gc(),fragmentShader:`

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

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

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
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function wA(o,e,i){return new Vi({name:"SphericalGaussianBlur",defines:{SAMPLES:TA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Gc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Kv(){return new Vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gc(),fragmentShader:`

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
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Qv(){return new Vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Gc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class $S extends Ci{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},u=[s,s,s,s,s,s];this.texture=new WS(u),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},u=new wl(5,5,5),f=new Vi({name:"CubemapFromEquirect",uniforms:ho(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:jn,blending:Oa});f.uniforms.tEquirect.value=i;const h=new ca(u,f),d=i.minFilter;return i.minFilter===Qs&&(i.minFilter=Rn),new UT(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,s=!0,u=!0){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,s,u);e.setRenderTarget(f)}}function DA(o){let e=new WeakMap,i=new WeakMap,s=null;function u(v,E=!1){return v==null?null:E?h(v):f(v)}function f(v){if(v&&v.isTexture){const E=v.mapping;if(E===Md||E===Ed)if(e.has(v)){const R=e.get(v).texture;return d(R,v.mapping)}else{const R=v.image;if(R&&R.height>0){const D=new $S(R.height);return D.fromEquirectangularTexture(o,v),e.set(v,D),v.addEventListener("dispose",m),d(D.texture,v.mapping)}else return null}}return v}function h(v){if(v&&v.isTexture){const E=v.mapping,R=E===Md||E===Ed,D=E===$s||E===co;if(R||D){let M=i.get(v);const x=M!==void 0?M.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==x)return s===null&&(s=new Yv(o)),M=R?s.fromEquirectangular(v,M):s.fromCubemap(v,M),M.texture.pmremVersion=v.pmremVersion,i.set(v,M),M.texture;if(M!==void 0)return M.texture;{const I=v.image;return R&&I&&I.height>0||D&&I&&p(I)?(s===null&&(s=new Yv(o)),M=R?s.fromEquirectangular(v):s.fromCubemap(v),M.texture.pmremVersion=v.pmremVersion,i.set(v,M),v.addEventListener("dispose",S),M.texture):null}}}return v}function d(v,E){return E===Md?v.mapping=$s:E===Ed&&(v.mapping=co),v}function p(v){let E=0;const R=6;for(let D=0;D<R;D++)v[D]!==void 0&&E++;return E===R}function m(v){const E=v.target;E.removeEventListener("dispose",m);const R=e.get(E);R!==void 0&&(e.delete(E),R.dispose())}function S(v){const E=v.target;E.removeEventListener("dispose",S);const R=i.get(E);R!==void 0&&(i.delete(E),R.dispose())}function _(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:u,dispose:_}}function UA(o){const e={};function i(s){if(e[s]!==void 0)return e[s];const u=o.getExtension(s);return e[s]=u,u}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const u=i(s);return u===null&&lo("WebGLRenderer: "+s+" extension not supported."),u}}}function NA(o,e,i,s){const u={},f=new WeakMap;function h(_){const v=_.target;v.index!==null&&e.remove(v.index);for(const R in v.attributes)e.remove(v.attributes[R]);v.removeEventListener("dispose",h),delete u[v.id];const E=f.get(v);E&&(e.remove(E),f.delete(v)),s.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function d(_,v){return u[v.id]===!0||(v.addEventListener("dispose",h),u[v.id]=!0,i.memory.geometries++),v}function p(_){const v=_.attributes;for(const E in v)e.update(v[E],o.ARRAY_BUFFER)}function m(_){const v=[],E=_.index,R=_.attributes.position;let D=0;if(R===void 0)return;if(E!==null){const I=E.array;D=E.version;for(let K=0,C=I.length;K<C;K+=3){const U=I[K+0],N=I[K+1],P=I[K+2];v.push(U,N,N,P,P,U)}}else{const I=R.array;D=R.version;for(let K=0,C=I.length/3-1;K<C;K+=3){const U=K+0,N=K+1,P=K+2;v.push(U,N,N,P,P,U)}}const M=new(R.count>=65535?VS:GS)(v,1);M.version=D;const x=f.get(_);x&&e.remove(x),f.set(_,M)}function S(_){const v=f.get(_);if(v){const E=_.index;E!==null&&v.version<E.version&&m(_)}else m(_);return f.get(_)}return{get:d,update:p,getWireframeAttribute:S}}function LA(o,e,i){let s;function u(_){s=_}let f,h;function d(_){f=_.type,h=_.bytesPerElement}function p(_,v){o.drawElements(s,v,f,_*h),i.update(v,s,1)}function m(_,v,E){E!==0&&(o.drawElementsInstanced(s,v,f,_*h,E),i.update(v,s,E))}function S(_,v,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,v,0,f,_,0,E);let D=0;for(let M=0;M<E;M++)D+=v[M];i.update(D,s,1)}this.setMode=u,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=S}function OA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:Pe("WebGLInfo: Unknown draw mode:",h);break}}function u(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:u,update:s}}function PA(o,e,i){const s=new WeakMap,u=new un;function f(h,d,p){const m=h.morphTargetInfluences,S=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=S!==void 0?S.length:0;let v=s.get(d);if(v===void 0||v.count!==_){let V=function(){T.dispose(),s.delete(d),d.removeEventListener("dispose",V)};var E=V;v!==void 0&&v.texture.dispose();const R=d.morphAttributes.position!==void 0,D=d.morphAttributes.normal!==void 0,M=d.morphAttributes.color!==void 0,x=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],K=d.morphAttributes.color||[];let C=0;R===!0&&(C=1),D===!0&&(C=2),M===!0&&(C=3);let U=d.attributes.position.count*C,N=1;U>e.maxTextureSize&&(N=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const P=new Float32Array(U*N*4*_),T=new BS(P,U,N,_);T.type=ra,T.needsUpdate=!0;const L=C*4;for(let W=0;W<_;W++){const et=x[W],ct=I[W],J=K[W],$=U*N*4*W;for(let q=0;q<et.count;q++){const X=q*L;R===!0&&(u.fromBufferAttribute(et,q),P[$+X+0]=u.x,P[$+X+1]=u.y,P[$+X+2]=u.z,P[$+X+3]=0),D===!0&&(u.fromBufferAttribute(ct,q),P[$+X+4]=u.x,P[$+X+5]=u.y,P[$+X+6]=u.z,P[$+X+7]=0),M===!0&&(u.fromBufferAttribute(J,q),P[$+X+8]=u.x,P[$+X+9]=u.y,P[$+X+10]=u.z,P[$+X+11]=J.itemSize===4?u.w:1)}}v={count:_,texture:T,size:new re(U,N)},s.set(d,v),d.addEventListener("dispose",V)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let R=0;for(let M=0;M<m.length;M++)R+=m[M];const D=d.morphTargetsRelative?1:1-R;p.getUniforms().setValue(o,"morphTargetBaseInfluence",D),p.getUniforms().setValue(o,"morphTargetInfluences",m)}p.getUniforms().setValue(o,"morphTargetsTexture",v.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",v.size)}return{update:f}}function IA(o,e,i,s,u){let f=new WeakMap;function h(m){const S=u.render.frame,_=m.geometry,v=e.get(m,_);if(f.get(v)!==S&&(e.update(v),f.set(v,S)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),f.get(m)!==S&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),f.set(m,S))),m.isSkinnedMesh){const E=m.skeleton;f.get(E)!==S&&(E.update(),f.set(E,S))}return v}function d(){f=new WeakMap}function p(m){const S=m.target;S.removeEventListener("dispose",p),s.releaseStatesOfObject(S),i.remove(S.instanceMatrix),S.instanceColor!==null&&i.remove(S.instanceColor)}return{update:h,dispose:d}}const zA={[MS]:"LINEAR_TONE_MAPPING",[ES]:"REINHARD_TONE_MAPPING",[TS]:"CINEON_TONE_MAPPING",[bS]:"ACES_FILMIC_TONE_MAPPING",[RS]:"AGX_TONE_MAPPING",[CS]:"NEUTRAL_TONE_MAPPING",[AS]:"CUSTOM_TONE_MAPPING"};function BA(o,e,i,s,u,f){const h=new Ci(e,i,{type:o,depthBuffer:u,stencilBuffer:f,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let d=null,p=null;const m=new fa;m.setAttribute("position",new Ia([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Ia([0,2,0,0,2,0],2));const S=new CT({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new ca(m,S),v=new nm(-1,1,1,-1,0,1);let E=null,R=null,D=!1,M,x=null,I=[],K=!1;this.setSize=function(C,U){h.setSize(C,U),d!==null&&d.setSize(C,U),p!==null&&p.setSize(C,U);for(let N=0;N<I.length;N++){const P=I[N];P.setSize&&P.setSize(C,U)}},this.setEffects=function(C){I=C,K=I.length>0&&I[0].isRenderPass===!0;const U=h.width,N=h.height;I.length>0&&d===null&&(d=new Ci(U,N,{type:wi,depthBuffer:!1,stencilBuffer:!1}),p=new Ci(U,N,{type:wi,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<I.length;P++){const T=I[P];T.setSize&&T.setSize(U,N)}},this.begin=function(C,U){if(D||C.toneMapping===Gi&&I.length===0)return!1;if(x=U,U!==null){const N=U.width,P=U.height;(h.width!==N||h.height!==P)&&this.setSize(N,P)}return K===!1&&C.setRenderTarget(h),M=C.toneMapping,C.toneMapping=Gi,!0},this.hasRenderPass=function(){return K},this.end=function(C,U){C.toneMapping=M,D=!0;let N=h,P=d;for(let T=0;T<I.length;T++){const L=I[T];L.enabled!==!1&&(L.render(C,P,N,U),L.needsSwap!==!1&&(N=P,P=P===d?p:d))}if(E!==C.outputColorSpace||R!==C.toneMapping){E=C.outputColorSpace,R=C.toneMapping,S.defines={},Ue.getTransfer(E)===We&&(S.defines.SRGB_TRANSFER="");const T=zA[R];T&&(S.defines[T]=""),S.needsUpdate=!0}S.uniforms.tDiffuse.value=N.texture,C.setRenderTarget(x),C.render(_,v),x=null,D=!1},this.isCompositing=function(){return D},this.dispose=function(){h.dispose(),d!==null&&d.dispose(),p!==null&&p.dispose(),m.dispose(),S.dispose()}}const tx=new qn,Gp=new Rl(1,1),ex=new BS,nx=new sT,ix=new WS,Jv=[],jv=[],$v=new Float32Array(16),tS=new Float32Array(9),eS=new Float32Array(4);function mo(o,e,i){const s=o[0];if(s<=0||s>0)return o;const u=e*i;let f=Jv[u];if(f===void 0&&(f=new Float32Array(u),Jv[u]=f),e!==0){s.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function yn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function Mn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function Vc(o,e){let i=jv[e];i===void 0&&(i=new Int32Array(e),jv[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function FA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function HA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(yn(i,e))return;o.uniform2fv(this.addr,e),Mn(i,e)}}function GA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(yn(i,e))return;o.uniform3fv(this.addr,e),Mn(i,e)}}function VA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(yn(i,e))return;o.uniform4fv(this.addr,e),Mn(i,e)}}function kA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(yn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),Mn(i,e)}else{if(yn(i,s))return;eS.set(s),o.uniformMatrix2fv(this.addr,!1,eS),Mn(i,s)}}function XA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(yn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),Mn(i,e)}else{if(yn(i,s))return;tS.set(s),o.uniformMatrix3fv(this.addr,!1,tS),Mn(i,s)}}function qA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(yn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),Mn(i,e)}else{if(yn(i,s))return;$v.set(s),o.uniformMatrix4fv(this.addr,!1,$v),Mn(i,s)}}function WA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function YA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(yn(i,e))return;o.uniform2iv(this.addr,e),Mn(i,e)}}function ZA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(yn(i,e))return;o.uniform3iv(this.addr,e),Mn(i,e)}}function KA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(yn(i,e))return;o.uniform4iv(this.addr,e),Mn(i,e)}}function QA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function JA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(yn(i,e))return;o.uniform2uiv(this.addr,e),Mn(i,e)}}function jA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(yn(i,e))return;o.uniform3uiv(this.addr,e),Mn(i,e)}}function $A(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(yn(i,e))return;o.uniform4uiv(this.addr,e),Mn(i,e)}}function tR(o,e,i){const s=this.cache,u=i.allocateTextureUnit();s[0]!==u&&(o.uniform1i(this.addr,u),s[0]=u);let f;this.type===o.SAMPLER_2D_SHADOW?(Gp.compareFunction=i.isReversedDepthBuffer()?jp:Jp,f=Gp):f=tx,i.setTexture2D(e||f,u)}function eR(o,e,i){const s=this.cache,u=i.allocateTextureUnit();s[0]!==u&&(o.uniform1i(this.addr,u),s[0]=u),i.setTexture3D(e||nx,u)}function nR(o,e,i){const s=this.cache,u=i.allocateTextureUnit();s[0]!==u&&(o.uniform1i(this.addr,u),s[0]=u),i.setTextureCube(e||ix,u)}function iR(o,e,i){const s=this.cache,u=i.allocateTextureUnit();s[0]!==u&&(o.uniform1i(this.addr,u),s[0]=u),i.setTexture2DArray(e||ex,u)}function aR(o){switch(o){case 5126:return FA;case 35664:return HA;case 35665:return GA;case 35666:return VA;case 35674:return kA;case 35675:return XA;case 35676:return qA;case 5124:case 35670:return WA;case 35667:case 35671:return YA;case 35668:case 35672:return ZA;case 35669:case 35673:return KA;case 5125:return QA;case 36294:return JA;case 36295:return jA;case 36296:return $A;case 35678:case 36198:case 36298:case 36306:case 35682:return tR;case 35679:case 36299:case 36307:return eR;case 35680:case 36300:case 36308:case 36293:return nR;case 36289:case 36303:case 36311:case 36292:return iR}}function sR(o,e){o.uniform1fv(this.addr,e)}function rR(o,e){const i=mo(e,this.size,2);o.uniform2fv(this.addr,i)}function oR(o,e){const i=mo(e,this.size,3);o.uniform3fv(this.addr,i)}function lR(o,e){const i=mo(e,this.size,4);o.uniform4fv(this.addr,i)}function uR(o,e){const i=mo(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function cR(o,e){const i=mo(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function fR(o,e){const i=mo(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function hR(o,e){o.uniform1iv(this.addr,e)}function dR(o,e){o.uniform2iv(this.addr,e)}function pR(o,e){o.uniform3iv(this.addr,e)}function mR(o,e){o.uniform4iv(this.addr,e)}function gR(o,e){o.uniform1uiv(this.addr,e)}function _R(o,e){o.uniform2uiv(this.addr,e)}function vR(o,e){o.uniform3uiv(this.addr,e)}function SR(o,e){o.uniform4uiv(this.addr,e)}function xR(o,e,i){const s=this.cache,u=e.length,f=Vc(i,u);yn(s,f)||(o.uniform1iv(this.addr,f),Mn(s,f));let h;this.type===o.SAMPLER_2D_SHADOW?h=Gp:h=tx;for(let d=0;d!==u;++d)i.setTexture2D(e[d]||h,f[d])}function yR(o,e,i){const s=this.cache,u=e.length,f=Vc(i,u);yn(s,f)||(o.uniform1iv(this.addr,f),Mn(s,f));for(let h=0;h!==u;++h)i.setTexture3D(e[h]||nx,f[h])}function MR(o,e,i){const s=this.cache,u=e.length,f=Vc(i,u);yn(s,f)||(o.uniform1iv(this.addr,f),Mn(s,f));for(let h=0;h!==u;++h)i.setTextureCube(e[h]||ix,f[h])}function ER(o,e,i){const s=this.cache,u=e.length,f=Vc(i,u);yn(s,f)||(o.uniform1iv(this.addr,f),Mn(s,f));for(let h=0;h!==u;++h)i.setTexture2DArray(e[h]||ex,f[h])}function TR(o){switch(o){case 5126:return sR;case 35664:return rR;case 35665:return oR;case 35666:return lR;case 35674:return uR;case 35675:return cR;case 35676:return fR;case 5124:case 35670:return hR;case 35667:case 35671:return dR;case 35668:case 35672:return pR;case 35669:case 35673:return mR;case 5125:return gR;case 36294:return _R;case 36295:return vR;case 36296:return SR;case 35678:case 36198:case 36298:case 36306:case 35682:return xR;case 35679:case 36299:case 36307:return yR;case 35680:case 36300:case 36308:case 36293:return MR;case 36289:case 36303:case 36311:case 36292:return ER}}class bR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=aR(i.type)}}class AR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=TR(i.type)}}class RR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const u=this.seq;for(let f=0,h=u.length;f!==h;++f){const d=u[f];d.setValue(e,i[d.id],s)}}}const Qd=/(\w+)(\])?(\[|\.)?/g;function nS(o,e){o.seq.push(e),o.map[e.id]=e}function CR(o,e,i){const s=o.name,u=s.length;for(Qd.lastIndex=0;;){const f=Qd.exec(s),h=Qd.lastIndex;let d=f[1];const p=f[2]==="]",m=f[3];if(p&&(d=d|0),m===void 0||m==="["&&h+2===u){nS(i,m===void 0?new bR(d,o,e):new AR(d,o,e));break}else{let _=i.map[d];_===void 0&&(_=new RR(d),nS(i,_)),i=_}}}class Uc{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let h=0;h<s;++h){const d=e.getActiveUniform(i,h),p=e.getUniformLocation(i,d.name);CR(d,p,this)}const u=[],f=[];for(const h of this.seq)h.type===e.SAMPLER_2D_SHADOW||h.type===e.SAMPLER_CUBE_SHADOW||h.type===e.SAMPLER_2D_ARRAY_SHADOW?u.push(h):f.push(h);u.length>0&&(this.seq=u.concat(f))}setValue(e,i,s,u){const f=this.map[i];f!==void 0&&f.setValue(e,s,u)}setOptional(e,i,s){const u=i[s];u!==void 0&&this.setValue(e,s,u)}static upload(e,i,s,u){for(let f=0,h=i.length;f!==h;++f){const d=i[f],p=s[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,u)}}static seqWithValue(e,i){const s=[];for(let u=0,f=e.length;u!==f;++u){const h=e[u];h.id in i&&s.push(h)}return s}}function iS(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const wR=37297;let DR=0;function UR(o,e){const i=o.split(`
`),s=[],u=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=u;h<f;h++){const d=h+1;s.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const aS=new he;function NR(o){Ue._getMatrix(aS,Ue.workingColorSpace,o);const e=`mat3( ${aS.elements.map(i=>i.toFixed(4))} )`;switch(Ue.getTransfer(o)){case Oc:return[e,"LinearTransferOETF"];case We:return[e,"sRGBTransferOETF"];default:return se("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function sS(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),f=(o.getShaderInfoLog(e)||"").trim();if(s&&f==="")return"";const h=/ERROR: 0:(\d+)/.exec(f);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+f+`

`+UR(o.getShaderSource(e),d)}else return f}function LR(o,e){const i=NR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const OR={[MS]:"Linear",[ES]:"Reinhard",[TS]:"Cineon",[bS]:"ACESFilmic",[RS]:"AgX",[CS]:"Neutral",[AS]:"Custom"};function PR(o,e){const i=OR[e];return i===void 0?(se("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const xc=new st;function IR(){Ue.getLuminanceCoefficients(xc);const o=xc.x.toFixed(4),e=xc.y.toFixed(4),i=xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sl).join(`
`)}function BR(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function FR(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let u=0;u<s;u++){const f=o.getActiveAttrib(e,u),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function Sl(o){return o!==""}function rS(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function oS(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const HR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vp(o){return o.replace(HR,VR)}const GR=new Map;function VR(o,e){let i=ge[e];if(i===void 0){const s=GR.get(e);if(s!==void 0)i=ge[s],se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Vp(i)}const kR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lS(o){return o.replace(kR,XR)}function XR(o,e,i,s){let u="";for(let f=parseInt(e);f<parseInt(i);f++)u+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return u}function uS(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}const qR={[Ac]:"SHADOWMAP_TYPE_PCF",[vl]:"SHADOWMAP_TYPE_VSM"};function WR(o){return qR[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const YR={[$s]:"ENVMAP_TYPE_CUBE",[co]:"ENVMAP_TYPE_CUBE",[Bc]:"ENVMAP_TYPE_CUBE_UV"};function ZR(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":YR[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const KR={[co]:"ENVMAP_MODE_REFRACTION"};function QR(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":KR[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const JR={[yS]:"ENVMAP_BLENDING_MULTIPLY",[yE]:"ENVMAP_BLENDING_MIX",[ME]:"ENVMAP_BLENDING_ADD"};function jR(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":JR[o.combine]||"ENVMAP_BLENDING_NONE"}function $R(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function t3(o,e,i,s){const u=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=WR(i),m=ZR(i),S=QR(i),_=jR(i),v=$R(i),E=zR(i),R=BR(f),D=u.createProgram();let M,x,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(Sl).join(`
`),M.length>0&&(M+=`
`),x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(Sl).join(`
`),x.length>0&&(x+=`
`)):(M=[uS(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+S:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sl).join(`
`),x=[uS(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+S:"",i.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Gi?"#define TONE_MAPPING":"",i.toneMapping!==Gi?ge.tonemapping_pars_fragment:"",i.toneMapping!==Gi?PR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ge.colorspace_pars_fragment,LR("linearToOutputTexel",i.outputColorSpace),IR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Sl).join(`
`)),h=Vp(h),h=rS(h,i),h=oS(h,i),d=Vp(d),d=rS(d,i),d=oS(d,i),h=lS(h),d=lS(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,M=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,x=["#define varying in",i.glslVersion===Tv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Tv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const K=I+M+h,C=I+x+d,U=iS(u,u.VERTEX_SHADER,K),N=iS(u,u.FRAGMENT_SHADER,C);u.attachShader(D,U),u.attachShader(D,N),i.index0AttributeName!==void 0?u.bindAttribLocation(D,0,i.index0AttributeName):i.hasPositionAttribute===!0&&u.bindAttribLocation(D,0,"position"),u.linkProgram(D);function P(W){if(o.debug.checkShaderErrors){const et=u.getProgramInfoLog(D)||"",ct=u.getShaderInfoLog(U)||"",J=u.getShaderInfoLog(N)||"",$=et.trim(),q=ct.trim(),X=J.trim();let ft=!0,ot=!0;if(u.getProgramParameter(D,u.LINK_STATUS)===!1)if(ft=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(u,D,U,N);else{const dt=sS(u,U,"vertex"),Mt=sS(u,N,"fragment");Pe("WebGLProgram: Shader Error "+u.getError()+" - VALIDATE_STATUS "+u.getProgramParameter(D,u.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+$+`
`+dt+`
`+Mt)}else $!==""?se("WebGLProgram: Program Info Log:",$):(q===""||X==="")&&(ot=!1);ot&&(W.diagnostics={runnable:ft,programLog:$,vertexShader:{log:q,prefix:M},fragmentShader:{log:X,prefix:x}})}u.deleteShader(U),u.deleteShader(N),T=new Uc(u,D),L=FR(u,D)}let T;this.getUniforms=function(){return T===void 0&&P(this),T};let L;this.getAttributes=function(){return L===void 0&&P(this),L};let V=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=u.getProgramParameter(D,wR)),V},this.destroy=function(){s.releaseStatesOfProgram(this),u.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=DR++,this.cacheKey=e,this.usedTimes=1,this.program=D,this.vertexShader=U,this.fragmentShader=N,this}let e3=0;class n3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,s){const u=this._getShaderCacheForMaterial(e);return u.has(i)===!1&&(u.add(i),i.usedTimes++),u.has(s)===!1&&(u.add(s),s.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new i3(e),i.set(e,s)),s}}class i3{constructor(e){this.id=e3++,this.code=e,this.usedTimes=0}}function a3(o){return o===tr||o===Nc||o===Lc}function s3(o,e,i,s,u,f){const h=new FS,d=new n3,p=new Set,m=[],S=new Map,_=s.logarithmicDepthBuffer;let v=s.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(T){return p.add(T),T===0?"uv":`uv${T}`}function D(T,L,V,W,et,ct){const J=W.fog,$=et.geometry,q=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?W.environment:null,X=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,ft=e.get(T.envMap||q,X),ot=ft&&ft.mapping===Bc?ft.image.height:null,dt=E[T.type];T.precision!==null&&(v=s.getMaxPrecision(T.precision),v!==T.precision&&se("WebGLProgram.getParameters:",T.precision,"not supported, using",v,"instead."));const Mt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Qt=Mt!==void 0?Mt.length:0;let Yt=0;$.morphAttributes.position!==void 0&&(Yt=1),$.morphAttributes.normal!==void 0&&(Yt=2),$.morphAttributes.color!==void 0&&(Yt=3);let z,mt,At,Y;if(dt){const we=sa[dt];z=we.vertexShader,mt=we.fragmentShader}else{z=T.vertexShader,mt=T.fragmentShader;const we=d.getVertexShaderStage(T),ce=d.getFragmentShaderStage(T);d.update(T,we,ce),At=we.id,Y=ce.id}const ht=o.getRenderTarget(),Tt=o.state.buffers.depth.getReversed(),It=et.isInstancedMesh===!0,_t=et.isBatchedMesh===!0,Rt=!!T.map,Ge=!!T.matcap,me=!!ft,_e=!!T.aoMap,Me=!!T.lightMap,te=!!T.bumpMap&&T.wireframe===!1,ne=!!T.normalMap,Ve=!!T.displacementMap,hn=!!T.emissiveMap,Oe=!!T.metalnessMap,tn=!!T.roughnessMap,G=T.anisotropy>0,nn=T.clearcoat>0,Le=T.dispersion>0,w=T.retroreflectivity>0,y=T.iridescence>0,j=T.sheen>0,rt=T.transmission>0,pt=G&&!!T.anisotropyMap,bt=nn&&!!T.clearcoatMap,Dt=nn&&!!T.clearcoatNormalMap,gt=nn&&!!T.clearcoatRoughnessMap,yt=y&&!!T.iridescenceMap,wt=y&&!!T.iridescenceThicknessMap,jt=j&&!!T.sheenColorMap,Pt=j&&!!T.sheenRoughnessMap,Ot=!!T.specularMap,Vt=!!T.specularColorMap,ee=!!T.specularIntensityMap,le=rt&&!!T.transmissionMap,H=rt&&!!T.thicknessMap,Ct=!!T.gradientMap,xt=!!T.alphaMap,Ut=T.alphaTest>0,Gt=!!T.alphaHash,Et=!!T.extensions;let Jt=Gi;T.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Jt=o.toneMapping);const Ht={shaderID:dt,shaderType:T.type,shaderName:T.name,vertexShader:z,fragmentShader:mt,defines:T.defines,customVertexShaderID:At,customFragmentShaderID:Y,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:v,batching:_t,batchingColor:_t&&et._colorsTexture!==null,instancing:It,instancingColor:It&&et.instanceColor!==null,instancingMorph:It&&et.morphTexture!==null,outputColorSpace:ht===null?o.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Ue.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Rt,matcap:Ge,envMap:me,envMapMode:me&&ft.mapping,envMapCubeUVHeight:ot,aoMap:_e,lightMap:Me,bumpMap:te,normalMap:ne,displacementMap:Ve,emissiveMap:hn,normalMapObjectSpace:ne&&T.normalMapType===bE,normalMapTangentSpace:ne&&T.normalMapType===Ev,packedNormalMap:ne&&T.normalMapType===Ev&&a3(T.normalMap.format),metalnessMap:Oe,roughnessMap:tn,anisotropy:G,anisotropyMap:pt,clearcoat:nn,clearcoatMap:bt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:gt,dispersion:Le,retroreflection:w,iridescence:y,iridescenceMap:yt,iridescenceThicknessMap:wt,sheen:j,sheenColorMap:jt,sheenRoughnessMap:Pt,specularMap:Ot,specularColorMap:Vt,specularIntensityMap:ee,transmission:rt,transmissionMap:le,thicknessMap:H,gradientMap:Ct,opaque:T.transparent===!1&&T.blending===xl&&T.alphaToCoverage===!1,alphaMap:xt,alphaTest:Ut,alphaHash:Gt,combine:T.combine,mapUv:Rt&&R(T.map.channel),aoMapUv:_e&&R(T.aoMap.channel),lightMapUv:Me&&R(T.lightMap.channel),bumpMapUv:te&&R(T.bumpMap.channel),normalMapUv:ne&&R(T.normalMap.channel),displacementMapUv:Ve&&R(T.displacementMap.channel),emissiveMapUv:hn&&R(T.emissiveMap.channel),metalnessMapUv:Oe&&R(T.metalnessMap.channel),roughnessMapUv:tn&&R(T.roughnessMap.channel),anisotropyMapUv:pt&&R(T.anisotropyMap.channel),clearcoatMapUv:bt&&R(T.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&R(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&R(T.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&R(T.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&R(T.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&R(T.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&R(T.sheenRoughnessMap.channel),specularMapUv:Ot&&R(T.specularMap.channel),specularColorMapUv:Vt&&R(T.specularColorMap.channel),specularIntensityMapUv:ee&&R(T.specularIntensityMap.channel),transmissionMapUv:le&&R(T.transmissionMap.channel),thicknessMapUv:H&&R(T.thicknessMap.channel),alphaMapUv:xt&&R(T.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(ne||G),vertexNormals:!!$.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:et.isPoints===!0&&!!$.attributes.uv&&(Rt||xt),fog:!!J,useFog:T.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||$.attributes.normal===void 0&&ne===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Tt,skinning:et.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Qt,morphTextureStride:Yt,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:ct.length,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:T.dithering,shadowMapEnabled:o.shadowMap.enabled&&V.length>0,shadowMapType:o.shadowMap.type,toneMapping:Jt,decodeVideoTexture:Rt&&T.map.isVideoTexture===!0&&Ue.getTransfer(T.map.colorSpace)===We,decodeVideoTextureEmissive:hn&&T.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(T.emissiveMap.colorSpace)===We,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===La,flipSided:T.side===jn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Et&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&T.extensions.multiDraw===!0||_t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Ht.vertexUv1s=p.has(1),Ht.vertexUv2s=p.has(2),Ht.vertexUv3s=p.has(3),p.clear(),Ht}function M(T){const L=[];if(T.shaderID?L.push(T.shaderID):(L.push(T.customVertexShaderID),L.push(T.customFragmentShaderID)),T.defines!==void 0)for(const V in T.defines)L.push(V),L.push(T.defines[V]);return T.isRawShaderMaterial===!1&&(x(L,T),I(L,T),L.push(o.outputColorSpace)),L.push(T.customProgramCacheKey),L.join()}function x(T,L){T.push(L.precision),T.push(L.outputColorSpace),T.push(L.envMapMode),T.push(L.envMapCubeUVHeight),T.push(L.mapUv),T.push(L.alphaMapUv),T.push(L.lightMapUv),T.push(L.aoMapUv),T.push(L.bumpMapUv),T.push(L.normalMapUv),T.push(L.displacementMapUv),T.push(L.emissiveMapUv),T.push(L.metalnessMapUv),T.push(L.roughnessMapUv),T.push(L.anisotropyMapUv),T.push(L.clearcoatMapUv),T.push(L.clearcoatNormalMapUv),T.push(L.clearcoatRoughnessMapUv),T.push(L.iridescenceMapUv),T.push(L.iridescenceThicknessMapUv),T.push(L.sheenColorMapUv),T.push(L.sheenRoughnessMapUv),T.push(L.specularMapUv),T.push(L.specularColorMapUv),T.push(L.specularIntensityMapUv),T.push(L.transmissionMapUv),T.push(L.thicknessMapUv),T.push(L.combine),T.push(L.fogExp2),T.push(L.sizeAttenuation),T.push(L.morphTargetsCount),T.push(L.morphAttributeCount),T.push(L.numSunLights),T.push(L.numDirLights),T.push(L.numPointLights),T.push(L.numSpotLights),T.push(L.numSpotLightMaps),T.push(L.numHemiLights),T.push(L.numRectAreaLights),T.push(L.numSunLightShadows),T.push(L.numDirLightShadows),T.push(L.numPointLightShadows),T.push(L.numSpotLightShadows),T.push(L.numSpotLightShadowsWithMaps),T.push(L.numLightProbes),T.push(L.shadowMapType),T.push(L.toneMapping),T.push(L.numClippingPlanes),T.push(L.numClipIntersection),T.push(L.depthPacking)}function I(T,L){h.disableAll(),L.instancing&&h.enable(0),L.instancingColor&&h.enable(1),L.instancingMorph&&h.enable(2),L.matcap&&h.enable(3),L.envMap&&h.enable(4),L.normalMapObjectSpace&&h.enable(5),L.normalMapTangentSpace&&h.enable(6),L.clearcoat&&h.enable(7),L.iridescence&&h.enable(8),L.alphaTest&&h.enable(9),L.vertexColors&&h.enable(10),L.vertexAlphas&&h.enable(11),L.vertexUv1s&&h.enable(12),L.vertexUv2s&&h.enable(13),L.vertexUv3s&&h.enable(14),L.vertexTangents&&h.enable(15),L.anisotropy&&h.enable(16),L.alphaHash&&h.enable(17),L.batching&&h.enable(18),L.dispersion&&h.enable(19),L.retroreflection&&h.enable(24),L.batchingColor&&h.enable(20),L.gradientMap&&h.enable(21),L.packedNormalMap&&h.enable(22),L.vertexNormals&&h.enable(23),T.push(h.mask),h.disableAll(),L.fog&&h.enable(0),L.useFog&&h.enable(1),L.flatShading&&h.enable(2),L.logarithmicDepthBuffer&&h.enable(3),L.reversedDepthBuffer&&h.enable(4),L.skinning&&h.enable(5),L.morphTargets&&h.enable(6),L.morphNormals&&h.enable(7),L.morphColors&&h.enable(8),L.premultipliedAlpha&&h.enable(9),L.shadowMapEnabled&&h.enable(10),L.doubleSided&&h.enable(11),L.flipSided&&h.enable(12),L.useDepthPacking&&h.enable(13),L.dithering&&h.enable(14),L.transmission&&h.enable(15),L.sheen&&h.enable(16),L.opaque&&h.enable(17),L.pointsUvs&&h.enable(18),L.decodeVideoTexture&&h.enable(19),L.decodeVideoTextureEmissive&&h.enable(20),L.alphaToCoverage&&h.enable(21),L.numLightProbeGrids>0&&h.enable(22),L.hasPositionAttribute&&h.enable(23),T.push(h.mask)}function K(T){const L=E[T.type];let V;if(L){const W=sa[L];V=bT.clone(W.uniforms)}else V=T.uniforms;return V}function C(T,L){let V=S.get(L);return V!==void 0?++V.usedTimes:(V=new t3(o,L,T,u),m.push(V),S.set(L,V)),V}function U(T){if(--T.usedTimes===0){const L=m.indexOf(T);m[L]=m[m.length-1],m.pop(),S.delete(T.cacheKey),T.destroy()}}function N(T){d.remove(T)}function P(){d.dispose()}return{getParameters:D,getProgramCacheKey:M,getUniforms:K,acquireProgram:C,releaseProgram:U,releaseShaderCache:N,programs:m,dispose:P}}function r3(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function u(h,d,p){o.get(h)[d]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:s,update:u,dispose:f}}function o3(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.materialVariant!==e.materialVariant?o.materialVariant-e.materialVariant:o.z!==e.z?o.z-e.z:o.id-e.id}function cS(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function fS(){const o=[];let e=0;const i=[],s=[],u=[];function f(){e=0,i.length=0,s.length=0,u.length=0}function h(v){let E=0;return v.isInstancedMesh&&(E+=2),v.isSkinnedMesh&&(E+=1),E}function d(v,E,R,D,M,x){let I=o[e];return I===void 0?(I={id:v.id,object:v,geometry:E,material:R,materialVariant:h(v),groupOrder:D,renderOrder:v.renderOrder,z:M,group:x},o[e]=I):(I.id=v.id,I.object=v,I.geometry=E,I.material=R,I.materialVariant=h(v),I.groupOrder=D,I.renderOrder=v.renderOrder,I.z=M,I.group=x),e++,I}function p(v,E,R,D,M,x,I){I.reversedDepth===!0&&(M=-M);const K=d(v,E,R,D,M,x);R.transmission>0?s.push(K):R.transparent===!0?u.push(K):i.push(K)}function m(v,E,R,D,M,x){const I=d(v,E,R,D,M,x);R.transmission>0?s.unshift(I):R.transparent===!0?u.unshift(I):i.unshift(I)}function S(v,E){i.length>1&&i.sort(v||o3),s.length>1&&s.sort(E||cS),u.length>1&&u.sort(E||cS)}function _(){for(let v=e,E=o.length;v<E;v++){const R=o[v];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:i,transmissive:s,transparent:u,init:f,push:p,unshift:m,finish:_,sort:S}}function l3(){let o=new WeakMap;function e(s,u){const f=o.get(s);let h;return f===void 0?(h=new fS,o.set(s,[h])):u>=f.length?(h=new fS,f.push(h)):h=f[u],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function u3(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={direction:new st,color:new He};break;case"SpotLight":i={position:new st,direction:new st,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new st,color:new He,distance:0,decay:0};break;case"HemisphereLight":i={direction:new st,skyColor:new He,groundColor:new He};break;case"RectAreaLight":i={color:new He,position:new st,halfWidth:new st,halfHeight:new st};break}return o[e.id]=i,i}}}function c3(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let f3=0;function h3(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function d3(o){const e=new u3,i=c3(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new st);const u=new st,f=new fn,h=new fn;function d(m){let S=0,_=0,v=0;for(let et=0;et<9;et++)s.probe[et].set(0,0,0);let E=0,R=0,D=0,M=0,x=0,I=0,K=0,C=0,U=0,N=0,P=0,T=0,L=0,V=0;m.sort(h3);for(let et=0,ct=m.length;et<ct;et++){const J=m[et],$=J.color,q=J.intensity,X=J.distance;let ft=null;if(J.shadow&&J.shadow.map&&(J.shadow.map.texture.format===tr?ft=J.shadow.map.texture:ft=J.shadow.map.depthTexture||J.shadow.map.texture),J.isAmbientLight)S+=$.r*q,_+=$.g*q,v+=$.b*q;else if(J.isLightProbe){for(let ot=0;ot<9;ot++)s.probe[ot].addScaledVector(J.sh.coefficients[ot],q);V++}else if(J.isSunLight){const ot=e.get(J);if(ot.color.copy(J.color).multiplyScalar(J.intensity),J.castShadow){const dt=J.shadow,Mt=i.get(J);Mt.shadowIntensity=dt.intensity,Mt.shadowBias=dt.bias,Mt.shadowNormalBias=dt.normalBias,Mt.shadowRadius=dt.radius,Mt.shadowMapSize.copy(dt.mapSize).multiply(dt.getFrameExtents()),s.sunShadow[R]=Mt,s.sunShadowMap[R]=ft;const Qt=dt.getViewportCount();for(let Yt=0;Yt<Qt;Yt++)s.sunShadowMatrix[D+Yt]=dt.getMatrix(Yt),s.sunShadowCascade[D+Yt]=dt._cascadeData[Yt];D+=Qt,R++}s.sun[E]=ot,E++}else if(J.isDirectionalLight){const ot=e.get(J);if(ot.color.copy(J.color).multiplyScalar(J.intensity),J.castShadow){const dt=J.shadow,Mt=i.get(J);Mt.shadowIntensity=dt.intensity,Mt.shadowBias=dt.bias,Mt.shadowNormalBias=dt.normalBias,Mt.shadowRadius=dt.radius,Mt.shadowMapSize=dt.mapSize,s.directionalShadow[M]=Mt,s.directionalShadowMap[M]=ft,s.directionalShadowMatrix[M]=J.shadow.matrix,U++}s.directional[M]=ot,M++}else if(J.isSpotLight){const ot=e.get(J);ot.position.setFromMatrixPosition(J.matrixWorld),ot.color.copy($).multiplyScalar(q),ot.distance=X,ot.coneCos=Math.cos(J.angle),ot.penumbraCos=Math.cos(J.angle*(1-J.penumbra)),ot.decay=J.decay,s.spot[I]=ot;const dt=J.shadow;if(J.map&&(s.spotLightMap[T]=J.map,T++,dt.updateMatrices(J),J.castShadow&&L++),s.spotLightMatrix[I]=dt.matrix,J.castShadow){const Mt=i.get(J);Mt.shadowIntensity=dt.intensity,Mt.shadowBias=dt.bias,Mt.shadowNormalBias=dt.normalBias,Mt.shadowRadius=dt.radius,Mt.shadowMapSize=dt.mapSize,s.spotShadow[I]=Mt,s.spotShadowMap[I]=ft,P++}I++}else if(J.isRectAreaLight){const ot=e.get(J);ot.color.copy($).multiplyScalar(q),ot.halfWidth.set(J.width*.5,0,0),ot.halfHeight.set(0,J.height*.5,0),s.rectArea[K]=ot,K++}else if(J.isPointLight){const ot=e.get(J);if(ot.color.copy(J.color).multiplyScalar(J.intensity),ot.distance=J.distance,ot.decay=J.decay,J.castShadow){const dt=J.shadow,Mt=i.get(J);Mt.shadowIntensity=dt.intensity,Mt.shadowBias=dt.bias,Mt.shadowNormalBias=dt.normalBias,Mt.shadowRadius=dt.radius,Mt.shadowMapSize=dt.mapSize,Mt.shadowCameraNear=dt.camera.near,Mt.shadowCameraFar=dt.camera.far,s.pointShadow[x]=Mt,s.pointShadowMap[x]=ft,s.pointShadowMatrix[x]=J.shadow.matrix,N++}s.point[x]=ot,x++}else if(J.isHemisphereLight){const ot=e.get(J);ot.skyColor.copy(J.color).multiplyScalar(q),ot.groundColor.copy(J.groundColor).multiplyScalar(q),s.hemi[C]=ot,C++}}K>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ft.LTC_FLOAT_1,s.rectAreaLTC2=Ft.LTC_FLOAT_2):(s.rectAreaLTC1=Ft.LTC_HALF_1,s.rectAreaLTC2=Ft.LTC_HALF_2)),s.ambient[0]=S,s.ambient[1]=_,s.ambient[2]=v;const W=s.hash;(W.sunLength!==E||W.directionalLength!==M||W.pointLength!==x||W.spotLength!==I||W.rectAreaLength!==K||W.hemiLength!==C||W.numSunShadows!==R||W.numDirectionalShadows!==U||W.numPointShadows!==N||W.numSpotShadows!==P||W.numSpotMaps!==T||W.numLightProbes!==V)&&(s.sun.length=E,s.directional.length=M,s.spot.length=I,s.rectArea.length=K,s.point.length=x,s.hemi.length=C,s.sunShadow.length=R,s.sunShadowMap.length=R,s.sunShadowMatrix.length=D,s.sunShadowCascade.length=D,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.directionalShadowMatrix.length=U,s.pointShadow.length=N,s.pointShadowMap.length=N,s.pointShadowMatrix.length=N,s.spotShadow.length=P,s.spotShadowMap.length=P,s.spotLightMatrix.length=P+T-L,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=V,W.sunLength=E,W.directionalLength=M,W.pointLength=x,W.spotLength=I,W.rectAreaLength=K,W.hemiLength=C,W.numSunShadows=R,W.numDirectionalShadows=U,W.numPointShadows=N,W.numSpotShadows=P,W.numSpotMaps=T,W.numLightProbes=V,s.version=f3++)}function p(m,S){let _=0,v=0,E=0,R=0,D=0,M=0;const x=S.matrixWorldInverse;for(let I=0,K=m.length;I<K;I++){const C=m[I];if(C.isSunLight){const U=s.sun[_];U.direction.setFromMatrixPosition(C.matrixWorld),U.direction.transformDirection(x),_++}else if(C.isDirectionalLight){const U=s.directional[v];U.direction.setFromMatrixPosition(C.matrixWorld),u.setFromMatrixPosition(C.target.matrixWorld),U.direction.sub(u),U.direction.transformDirection(x),v++}else if(C.isSpotLight){const U=s.spot[R];U.position.setFromMatrixPosition(C.matrixWorld),U.position.applyMatrix4(x),U.direction.setFromMatrixPosition(C.matrixWorld),u.setFromMatrixPosition(C.target.matrixWorld),U.direction.sub(u),U.direction.transformDirection(x),R++}else if(C.isRectAreaLight){const U=s.rectArea[D];U.position.setFromMatrixPosition(C.matrixWorld),U.position.applyMatrix4(x),h.identity(),f.copy(C.matrixWorld),f.premultiply(x),h.extractRotation(f),U.halfWidth.set(C.width*.5,0,0),U.halfHeight.set(0,C.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),D++}else if(C.isPointLight){const U=s.point[E];U.position.setFromMatrixPosition(C.matrixWorld),U.position.applyMatrix4(x),E++}else if(C.isHemisphereLight){const U=s.hemi[M];U.direction.setFromMatrixPosition(C.matrixWorld),U.direction.transformDirection(x),M++}}}return{setup:d,setupView:p,state:s}}function hS(o){const e=new d3(o),i=[],s=[],u=[];function f(v){_.camera=v,i.length=0,s.length=0,u.length=0}function h(v){i.push(v)}function d(v){s.push(v)}function p(v){u.push(v)}function m(){e.setup(i)}function S(v){e.setupView(i,v)}const _={lightsArray:i,shadowsArray:s,lightProbeGridArray:u,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:f,state:_,setupLights:m,setupLightsView:S,pushLight:h,pushShadow:d,pushLightProbeGrid:p}}function p3(o){let e=new WeakMap;function i(u,f=0){const h=e.get(u);let d;return h===void 0?(d=new hS(o),e.set(u,[d])):f>=h.length?(d=new hS(o),h.push(d)):d=h[f],d}function s(){e=new WeakMap}return{get:i,dispose:s}}const m3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_3=[new st(1,0,0),new st(-1,0,0),new st(0,1,0),new st(0,-1,0),new st(0,0,1),new st(0,0,-1)],v3=[new st(0,-1,0),new st(0,-1,0),new st(0,0,1),new st(0,0,-1),new st(0,-1,0),new st(0,-1,0)],dS=new fn,_l=new st,Jd=new st;function S3(o,e,i){let s=new qS;const u=new re,f=new re,h=new un,d=new wT,p=new DT,m={},S=i.maxTextureSize,_={[js]:jn,[jn]:js,[La]:La},v=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:m3,fragmentShader:g3}),E=v.clone();E.defines.HORIZONTAL_PASS=1;const R=new fa;R.setAttribute("position",new la(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new ca(R,v),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ac;let x=this.type;this.render=function(N,P,T){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||N.length===0)return;this.type===nE&&(se("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ac);const L=o.getRenderTarget(),V=o.getActiveCubeFace(),W=o.getActiveMipmapLevel(),et=o.state;et.setBlending(Oa),et.buffers.depth.getReversed()===!0?et.buffers.color.setClear(0,0,0,0):et.buffers.color.setClear(1,1,1,1),et.buffers.depth.setTest(!0),et.setScissorTest(!1);const ct=x!==this.type;ct&&P.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach($=>$.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,$=N.length;J<$;J++){const q=N[J],X=q.shadow;if(X===void 0){se("WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;u.copy(X.mapSize);const ft=X.getFrameExtents();u.multiply(ft),f.copy(X.mapSize),(u.x>S||u.y>S)&&(u.x>S&&(f.x=Math.floor(S/ft.x),u.x=f.x*ft.x,X.mapSize.x=f.x),u.y>S&&(f.y=Math.floor(S/ft.y),u.y=f.y*ft.y,X.mapSize.y=f.y));const ot=o.state.buffers.depth.getReversed();if(X.camera._reversedDepth=ot,X.map===null||ct===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===vl){if(q.isPointLight){se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Ci(u.x,u.y,{format:tr,type:wi,minFilter:Rn,magFilter:Rn,generateMipmaps:!1}),X.map.texture.name=q.name+".shadowMap",X.map.depthTexture=new Rl(u.x,u.y,ra),X.map.depthTexture.name=q.name+".shadowMapDepth",X.map.depthTexture.format=za,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=On,X.map.depthTexture.magFilter=On}else q.isPointLight?(X.map=new $S(u.x),X.map.depthTexture=new ET(u.x,ua)):(X.map=new Ci(u.x,u.y),X.map.depthTexture=new Rl(u.x,u.y,ua)),X.map.depthTexture.name=q.name+".shadowMap",X.map.depthTexture.format=za,this.type===Ac?(X.map.depthTexture.compareFunction=ot?jp:Jp,X.map.depthTexture.minFilter=Rn,X.map.depthTexture.magFilter=Rn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=On,X.map.depthTexture.magFilter=On);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==u.x||X.map.height!==u.y)&&X.map.setSize(u.x,u.y);const dt=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();q.isPointLight!==!0&&X.updateMatrices(q,T);for(let Mt=0;Mt<dt;Mt++){const Qt=X.getCamera(Mt);if(q.isPointLight){const Yt=X.camera,z=X.matrix,mt=q.distance||Yt.far;mt!==Yt.far&&(Yt.far=mt,Yt.updateProjectionMatrix()),_l.setFromMatrixPosition(q.matrixWorld),Yt.position.copy(_l),Jd.copy(Yt.position),Jd.add(_3[Mt]),Yt.up.copy(v3[Mt]),Yt.lookAt(Jd),Yt.updateMatrixWorld(),z.makeTranslation(-_l.x,-_l.y,-_l.z),dS.multiplyMatrices(Yt.projectionMatrix,Yt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(dS,Yt.coordinateSystem,Yt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)o.setRenderTarget(X.map,Mt),o.clear();else{Mt===0&&(o.setRenderTarget(X.map),o.clear());const Yt=X.getViewport(Mt);h.set(f.x*Yt.x,f.y*Yt.y,f.x*Yt.z,f.y*Yt.w),et.viewport(h)}s=X.getFrustum(Mt),C(P,T,Qt,q,this.type)}X.isPointLightShadow!==!0&&this.type===vl&&I(X,T),X.needsUpdate=!1}x=this.type,M.needsUpdate=!1,o.setRenderTarget(L,V,W)};function I(N,P){const T=e.update(D);v.defines.VSM_SAMPLES!==N.blurSamples&&(v.defines.VSM_SAMPLES=N.blurSamples,E.defines.VSM_SAMPLES=N.blurSamples,v.needsUpdate=!0,E.needsUpdate=!0),N.mapPass===null?N.mapPass=new Ci(u.x,u.y,{format:tr,type:wi}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),v.uniforms.shadow_pass.value=N.map.depthTexture,v.uniforms.resolution.value.set(N.map.width,N.map.height),v.uniforms.radius.value=N.radius,o.setRenderTarget(N.mapPass),o.clear(),o.renderBufferDirect(P,null,T,v,D,null),E.uniforms.shadow_pass.value=N.mapPass.texture,E.uniforms.resolution.value.set(N.map.width,N.map.height),E.uniforms.radius.value=N.radius,o.setRenderTarget(N.map),o.clear(),o.renderBufferDirect(P,null,T,E,D,null)}function K(N,P,T,L){let V=null;const W=T.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(W!==void 0)V=W;else if(V=T.isPointLight===!0?p:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const et=V.uuid,ct=P.uuid;let J=m[et];J===void 0&&(J={},m[et]=J);let $=J[ct];$===void 0&&($=V.clone(),J[ct]=$,P.addEventListener("dispose",U)),V=$}if(V.visible=P.visible,V.wireframe=P.wireframe,L===vl?V.side=P.shadowSide!==null?P.shadowSide:P.side:V.side=P.shadowSide!==null?P.shadowSide:_[P.side],V.alphaMap=P.alphaMap,V.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,V.map=P.map,V.clipShadows=P.clipShadows,V.clippingPlanes=P.clippingPlanes,V.clipIntersection=P.clipIntersection,V.displacementMap=P.displacementMap,V.displacementScale=P.displacementScale,V.displacementBias=P.displacementBias,V.wireframeLinewidth=P.wireframeLinewidth,V.linewidth=P.linewidth,T.isPointLight===!0&&V.isMeshDistanceMaterial===!0){const et=o.properties.get(V);et.light=T}return V}function C(N,P,T,L,V){if(N.visible===!1)return;if(N.layers.test(P.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&V===vl)&&(!N.frustumCulled||N.intersectsFrustum(s))){N.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,N.matrixWorld);const ct=e.update(N),J=N.material;if(Array.isArray(J)){const $=ct.groups;for(let q=0,X=$.length;q<X;q++){const ft=$[q],ot=J[ft.materialIndex];if(ot&&ot.visible){const dt=K(N,ot,L,V);N.onBeforeShadow(o,N,P,T,ct,dt,ft),o.renderBufferDirect(T,null,ct,dt,N,ft),N.onAfterShadow(o,N,P,T,ct,dt,ft)}}}else if(J.visible){const $=K(N,J,L,V);N.onBeforeShadow(o,N,P,T,ct,$,null),o.renderBufferDirect(T,null,ct,$,N,null),N.onAfterShadow(o,N,P,T,ct,$,null)}}const et=N.children;for(let ct=0,J=et.length;ct<J;ct++)C(et[ct],P,T,L,V)}function U(N){N.target.removeEventListener("dispose",U);for(const T in m){const L=m[T],V=N.target.uuid;V in L&&(L[V].dispose(),delete L[V])}}}function x3(o,e){function i(){let H=!1;const Ct=new un;let xt=null;const Ut=new un(0,0,0,0);return{setMask:function(Gt){xt!==Gt&&!H&&(o.colorMask(Gt,Gt,Gt,Gt),xt=Gt)},setLocked:function(Gt){H=Gt},setClear:function(Gt,Et,Jt,Ht,we){we===!0&&(Gt*=Ht,Et*=Ht,Jt*=Ht),Ct.set(Gt,Et,Jt,Ht),Ut.equals(Ct)===!1&&(o.clearColor(Gt,Et,Jt,Ht),Ut.copy(Ct))},reset:function(){H=!1,xt=null,Ut.set(-1,0,0,0)}}}function s(){let H=!1,Ct=!1,xt=null,Ut=null,Gt=null;return{setReversed:function(Et){if(Ct!==Et){const Jt=e.get("EXT_clip_control");Et?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT),Ct=Et;const Ht=Gt;Gt=null,this.setClear(Ht)}},getReversed:function(){return Ct},setTest:function(Et){Et?ht(o.DEPTH_TEST):Tt(o.DEPTH_TEST)},setMask:function(Et){xt!==Et&&!H&&(o.depthMask(Et),xt=Et)},setFunc:function(Et){if(Ct&&(Et=zE[Et]),Ut!==Et){switch(Et){case ep:o.depthFunc(o.NEVER);break;case np:o.depthFunc(o.ALWAYS);break;case ip:o.depthFunc(o.LESS);break;case El:o.depthFunc(o.LEQUAL);break;case ap:o.depthFunc(o.EQUAL);break;case sp:o.depthFunc(o.GEQUAL);break;case rp:o.depthFunc(o.GREATER);break;case op:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Ut=Et}},setLocked:function(Et){H=Et},setClear:function(Et){Gt!==Et&&(Gt=Et,Ct&&(Et=1-Et),o.clearDepth(Et))},reset:function(){H=!1,xt=null,Ut=null,Gt=null,Ct=!1}}}function u(){let H=!1,Ct=null,xt=null,Ut=null,Gt=null,Et=null,Jt=null,Ht=null,we=null;return{setTest:function(ce){H||(ce?ht(o.STENCIL_TEST):Tt(o.STENCIL_TEST))},setMask:function(ce){Ct!==ce&&!H&&(o.stencilMask(ce),Ct=ce)},setFunc:function(ce,$n,di){(xt!==ce||Ut!==$n||Gt!==di)&&(o.stencilFunc(ce,$n,di),xt=ce,Ut=$n,Gt=di)},setOp:function(ce,$n,di){(Et!==ce||Jt!==$n||Ht!==di)&&(o.stencilOp(ce,$n,di),Et=ce,Jt=$n,Ht=di)},setLocked:function(ce){H=ce},setClear:function(ce){we!==ce&&(o.clearStencil(ce),we=ce)},reset:function(){H=!1,Ct=null,xt=null,Ut=null,Gt=null,Et=null,Jt=null,Ht=null,we=null}}}const f=new i,h=new s,d=new u,p=new WeakMap,m=new WeakMap;let S={},_={},v={},E=new WeakMap,R=[],D=null,M=!1,x=null,I=null,K=null,C=null,U=null,N=null,P=null,T=new He(0,0,0),L=0,V=!1,W=null,et=null,ct=null,J=null,$=null;const q=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ft=0;const ot=o.getParameter(o.VERSION);ot.indexOf("WebGL")!==-1?(ft=parseFloat(/^WebGL (\d)/.exec(ot)[1]),X=ft>=1):ot.indexOf("OpenGL ES")!==-1&&(ft=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),X=ft>=2);let dt=null,Mt={};const Qt=o.getParameter(o.SCISSOR_BOX),Yt=o.getParameter(o.VIEWPORT),z=new un().fromArray(Qt),mt=new un().fromArray(Yt);function At(H,Ct,xt,Ut){const Gt=new Uint8Array(4),Et=o.createTexture();o.bindTexture(H,Et),o.texParameteri(H,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(H,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Jt=0;Jt<xt;Jt++)H===o.TEXTURE_3D||H===o.TEXTURE_2D_ARRAY?o.texImage3D(Ct,0,o.RGBA,1,1,Ut,0,o.RGBA,o.UNSIGNED_BYTE,Gt):o.texImage2D(Ct+Jt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Gt);return Et}const Y={};Y[o.TEXTURE_2D]=At(o.TEXTURE_2D,o.TEXTURE_2D,1),Y[o.TEXTURE_CUBE_MAP]=At(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[o.TEXTURE_2D_ARRAY]=At(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Y[o.TEXTURE_3D]=At(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ht(o.DEPTH_TEST),h.setFunc(El),te(!1),ne(Sv),ht(o.CULL_FACE),_e(Oa);function ht(H){S[H]!==!0&&(o.enable(H),S[H]=!0)}function Tt(H){S[H]!==!1&&(o.disable(H),S[H]=!1)}function It(H,Ct){return v[H]!==Ct?(o.bindFramebuffer(H,Ct),v[H]=Ct,H===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=Ct),H===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=Ct),!0):!1}function _t(H,Ct){let xt=R,Ut=!1;if(H){xt=E.get(Ct),xt===void 0&&(xt=[],E.set(Ct,xt));const Gt=H.textures;if(xt.length!==Gt.length||xt[0]!==o.COLOR_ATTACHMENT0){for(let Et=0,Jt=Gt.length;Et<Jt;Et++)xt[Et]=o.COLOR_ATTACHMENT0+Et;xt.length=Gt.length,Ut=!0}}else xt[0]!==o.BACK&&(xt[0]=o.BACK,Ut=!0);Ut&&o.drawBuffers(xt)}function Rt(H){return D!==H?(o.useProgram(H),D=H,!0):!1}const Ge={[io]:o.FUNC_ADD,[aE]:o.FUNC_SUBTRACT,[sE]:o.FUNC_REVERSE_SUBTRACT};Ge[rE]=o.MIN,Ge[oE]=o.MAX;const me={[lE]:o.ZERO,[uE]:o.ONE,[cE]:o.SRC_COLOR,[SS]:o.SRC_ALPHA,[gE]:o.SRC_ALPHA_SATURATE,[pE]:o.DST_COLOR,[hE]:o.DST_ALPHA,[fE]:o.ONE_MINUS_SRC_COLOR,[xS]:o.ONE_MINUS_SRC_ALPHA,[mE]:o.ONE_MINUS_DST_COLOR,[dE]:o.ONE_MINUS_DST_ALPHA,[_E]:o.CONSTANT_COLOR,[vE]:o.ONE_MINUS_CONSTANT_COLOR,[SE]:o.CONSTANT_ALPHA,[xE]:o.ONE_MINUS_CONSTANT_ALPHA};function _e(H,Ct,xt,Ut,Gt,Et,Jt,Ht,we,ce){if(H===Oa){M===!0&&(Tt(o.BLEND),M=!1);return}if(M===!1&&(ht(o.BLEND),M=!0),H!==iE){if(H!==x||ce!==V){if((I!==io||U!==io)&&(o.blendEquation(o.FUNC_ADD),I=io,U=io),ce)switch(H){case xl:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case xv:o.blendFunc(o.ONE,o.ONE);break;case yv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Mv:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:Pe("WebGLState: Invalid blending: ",H);break}else switch(H){case xl:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case xv:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case yv:Pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mv:Pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pe("WebGLState: Invalid blending: ",H);break}K=null,C=null,N=null,P=null,T.set(0,0,0),L=0,x=H,V=ce}return}Gt=Gt||Ct,Et=Et||xt,Jt=Jt||Ut,(Ct!==I||Gt!==U)&&(o.blendEquationSeparate(Ge[Ct],Ge[Gt]),I=Ct,U=Gt),(xt!==K||Ut!==C||Et!==N||Jt!==P)&&(o.blendFuncSeparate(me[xt],me[Ut],me[Et],me[Jt]),K=xt,C=Ut,N=Et,P=Jt),(Ht.equals(T)===!1||we!==L)&&(o.blendColor(Ht.r,Ht.g,Ht.b,we),T.copy(Ht),L=we),x=H,V=!1}function Me(H,Ct){H.side===La?Tt(o.CULL_FACE):ht(o.CULL_FACE);let xt=H.side===jn;Ct&&(xt=!xt),te(xt),H.blending===xl&&H.transparent===!1?_e(Oa):_e(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),h.setFunc(H.depthFunc),h.setTest(H.depthTest),h.setMask(H.depthWrite),f.setMask(H.colorWrite);const Ut=H.stencilWrite;d.setTest(Ut),Ut&&(d.setMask(H.stencilWriteMask),d.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),d.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),hn(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ht(o.SAMPLE_ALPHA_TO_COVERAGE):Tt(o.SAMPLE_ALPHA_TO_COVERAGE)}function te(H){W!==H&&(H?o.frontFace(o.CW):o.frontFace(o.CCW),W=H)}function ne(H){H!==tE?(ht(o.CULL_FACE),H!==et&&(H===Sv?o.cullFace(o.BACK):H===eE?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Tt(o.CULL_FACE),et=H}function Ve(H){H!==ct&&(X&&o.lineWidth(H),ct=H)}function hn(H,Ct,xt){H?(ht(o.POLYGON_OFFSET_FILL),(J!==Ct||$!==xt)&&(J=Ct,$=xt,h.getReversed()&&(Ct=-Ct),o.polygonOffset(Ct,xt))):Tt(o.POLYGON_OFFSET_FILL)}function Oe(H){H?ht(o.SCISSOR_TEST):Tt(o.SCISSOR_TEST)}function tn(H){H===void 0&&(H=o.TEXTURE0+q-1),dt!==H&&(o.activeTexture(H),dt=H)}function G(H,Ct,xt){xt===void 0&&(dt===null?xt=o.TEXTURE0+q-1:xt=dt);let Ut=Mt[xt];Ut===void 0&&(Ut={type:void 0,texture:void 0},Mt[xt]=Ut),(Ut.type!==H||Ut.texture!==Ct)&&(dt!==xt&&(o.activeTexture(xt),dt=xt),o.bindTexture(H,Ct||Y[H]),Ut.type=H,Ut.texture=Ct)}function nn(){const H=Mt[dt];H!==void 0&&H.type!==void 0&&(o.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Le(){try{o.compressedTexImage2D(...arguments)}catch(H){Pe("WebGLState:",H)}}function w(){try{o.compressedTexImage3D(...arguments)}catch(H){Pe("WebGLState:",H)}}function y(){try{o.texSubImage2D(...arguments)}catch(H){Pe("WebGLState:",H)}}function j(){try{o.texSubImage3D(...arguments)}catch(H){Pe("WebGLState:",H)}}function rt(){try{o.compressedTexSubImage2D(...arguments)}catch(H){Pe("WebGLState:",H)}}function pt(){try{o.compressedTexSubImage3D(...arguments)}catch(H){Pe("WebGLState:",H)}}function bt(){try{o.texStorage2D(...arguments)}catch(H){Pe("WebGLState:",H)}}function Dt(){try{o.texStorage3D(...arguments)}catch(H){Pe("WebGLState:",H)}}function gt(){try{o.texImage2D(...arguments)}catch(H){Pe("WebGLState:",H)}}function yt(){try{o.texImage3D(...arguments)}catch(H){Pe("WebGLState:",H)}}function wt(H){return _[H]!==void 0?_[H]:o.getParameter(H)}function jt(H,Ct){_[H]!==Ct&&(o.pixelStorei(H,Ct),_[H]=Ct)}function Pt(H){z.equals(H)===!1&&(o.scissor(H.x,H.y,H.z,H.w),z.copy(H))}function Ot(H){mt.equals(H)===!1&&(o.viewport(H.x,H.y,H.z,H.w),mt.copy(H))}function Vt(H,Ct){let xt=m.get(Ct);xt===void 0&&(xt=new WeakMap,m.set(Ct,xt));let Ut=xt.get(H);Ut===void 0&&(Ut=o.getUniformBlockIndex(Ct,H.name),xt.set(H,Ut))}function ee(H,Ct){const Ut=m.get(Ct).get(H);p.get(Ct)!==Ut&&(o.uniformBlockBinding(Ct,Ut,H.__bindingPointIndex),p.set(Ct,Ut))}function le(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),S={},_={},dt=null,Mt={},v={},E=new WeakMap,R=[],D=null,M=!1,x=null,I=null,K=null,C=null,U=null,N=null,P=null,T=new He(0,0,0),L=0,V=!1,W=null,et=null,ct=null,J=null,$=null,z.set(0,0,o.canvas.width,o.canvas.height),mt.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:ht,disable:Tt,bindFramebuffer:It,drawBuffers:_t,useProgram:Rt,setBlending:_e,setMaterial:Me,setFlipSided:te,setCullFace:ne,setLineWidth:Ve,setPolygonOffset:hn,setScissorTest:Oe,activeTexture:tn,bindTexture:G,unbindTexture:nn,compressedTexImage2D:Le,compressedTexImage3D:w,texImage2D:gt,texImage3D:yt,pixelStorei:jt,getParameter:wt,updateUBOMapping:Vt,uniformBlockBinding:ee,texStorage2D:bt,texStorage3D:Dt,texSubImage2D:y,texSubImage3D:j,compressedTexSubImage2D:rt,compressedTexSubImage3D:pt,scissor:Pt,viewport:Ot,reset:le}}function y3(o,e,i,s,u,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new re,S=new WeakMap,_=new Set;let v;const E=new WeakMap;let R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(w,y){return R?new OffscreenCanvas(w,y):Ic("canvas")}function M(w,y,j){let rt=1;const pt=Le(w);if((pt.width>j||pt.height>j)&&(rt=j/Math.max(pt.width,pt.height)),rt<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const bt=Math.floor(rt*pt.width),Dt=Math.floor(rt*pt.height);v===void 0&&(v=D(bt,Dt));const gt=y?D(bt,Dt):v;return gt.width=bt,gt.height=Dt,gt.getContext("2d").drawImage(w,0,0,bt,Dt),se("WebGLRenderer: Texture has been resized from ("+pt.width+"x"+pt.height+") to ("+bt+"x"+Dt+")."),gt}else return"data"in w&&se("WebGLRenderer: Image in DataTexture is too big ("+pt.width+"x"+pt.height+")."),w;return w}function x(w){return w.generateMipmaps}function I(w){o.generateMipmap(w)}function K(w){return w.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?o.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function C(w,y,j,rt,pt,bt=!1){if(w!==null){if(o[w]!==void 0)return o[w];se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Dt;rt&&(Dt=e.get("EXT_texture_norm16"),Dt||se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let gt=y;if(y===o.RED&&(j===o.FLOAT&&(gt=o.R32F),j===o.HALF_FLOAT&&(gt=o.R16F),j===o.UNSIGNED_BYTE&&(gt=o.R8),j===o.UNSIGNED_SHORT&&Dt&&(gt=Dt.R16_EXT),j===o.SHORT&&Dt&&(gt=Dt.R16_SNORM_EXT)),y===o.RED_INTEGER&&(j===o.UNSIGNED_BYTE&&(gt=o.R8UI),j===o.UNSIGNED_SHORT&&(gt=o.R16UI),j===o.UNSIGNED_INT&&(gt=o.R32UI),j===o.BYTE&&(gt=o.R8I),j===o.SHORT&&(gt=o.R16I),j===o.INT&&(gt=o.R32I)),y===o.RG&&(j===o.FLOAT&&(gt=o.RG32F),j===o.HALF_FLOAT&&(gt=o.RG16F),j===o.UNSIGNED_BYTE&&(gt=o.RG8),j===o.UNSIGNED_SHORT&&Dt&&(gt=Dt.RG16_EXT),j===o.SHORT&&Dt&&(gt=Dt.RG16_SNORM_EXT)),y===o.RG_INTEGER&&(j===o.UNSIGNED_BYTE&&(gt=o.RG8UI),j===o.UNSIGNED_SHORT&&(gt=o.RG16UI),j===o.UNSIGNED_INT&&(gt=o.RG32UI),j===o.BYTE&&(gt=o.RG8I),j===o.SHORT&&(gt=o.RG16I),j===o.INT&&(gt=o.RG32I)),y===o.RGB_INTEGER&&(j===o.UNSIGNED_BYTE&&(gt=o.RGB8UI),j===o.UNSIGNED_SHORT&&(gt=o.RGB16UI),j===o.UNSIGNED_INT&&(gt=o.RGB32UI),j===o.BYTE&&(gt=o.RGB8I),j===o.SHORT&&(gt=o.RGB16I),j===o.INT&&(gt=o.RGB32I)),y===o.RGBA_INTEGER&&(j===o.UNSIGNED_BYTE&&(gt=o.RGBA8UI),j===o.UNSIGNED_SHORT&&(gt=o.RGBA16UI),j===o.UNSIGNED_INT&&(gt=o.RGBA32UI),j===o.BYTE&&(gt=o.RGBA8I),j===o.SHORT&&(gt=o.RGBA16I),j===o.INT&&(gt=o.RGBA32I)),y===o.RGB&&(j===o.UNSIGNED_SHORT&&Dt&&(gt=Dt.RGB16_EXT),j===o.SHORT&&Dt&&(gt=Dt.RGB16_SNORM_EXT),j===o.UNSIGNED_INT_5_9_9_9_REV&&(gt=o.RGB9_E5),j===o.UNSIGNED_INT_10F_11F_11F_REV&&(gt=o.R11F_G11F_B10F)),y===o.RGBA){const yt=bt?Oc:Ue.getTransfer(pt);j===o.FLOAT&&(gt=o.RGBA32F),j===o.HALF_FLOAT&&(gt=o.RGBA16F),j===o.UNSIGNED_BYTE&&(gt=yt===We?o.SRGB8_ALPHA8:o.RGBA8),j===o.UNSIGNED_SHORT&&Dt&&(gt=Dt.RGBA16_EXT),j===o.SHORT&&Dt&&(gt=Dt.RGBA16_SNORM_EXT),j===o.UNSIGNED_SHORT_4_4_4_4&&(gt=o.RGBA4),j===o.UNSIGNED_SHORT_5_5_5_1&&(gt=o.RGB5_A1)}return(gt===o.R16F||gt===o.R32F||gt===o.RG16F||gt===o.RG32F||gt===o.RGBA16F||gt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),gt}function U(w,y){let j;return w?y===null||y===ua||y===bl?j=o.DEPTH24_STENCIL8:y===ra?j=o.DEPTH32F_STENCIL8:y===Tl&&(j=o.DEPTH24_STENCIL8,se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ua||y===bl?j=o.DEPTH_COMPONENT24:y===ra?j=o.DEPTH_COMPONENT32F:y===Tl&&(j=o.DEPTH_COMPONENT16),j}function N(w,y){return x(w)===!0||w.isFramebufferTexture&&w.minFilter!==On&&w.minFilter!==Rn?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function P(w){const y=w.target;y.removeEventListener("dispose",P),L(y),y.isVideoTexture&&S.delete(y),y.isHTMLTexture&&_.delete(y)}function T(w){const y=w.target;y.removeEventListener("dispose",T),W(y)}function L(w){const y=s.get(w);if(y.__webglInit===void 0)return;const j=w.source,rt=E.get(j);if(rt){const pt=rt[y.__cacheKey];pt.usedTimes--,pt.usedTimes===0&&V(w),Object.keys(rt).length===0&&E.delete(j)}s.remove(w)}function V(w){const y=s.get(w);o.deleteTexture(y.__webglTexture);const j=w.source,rt=E.get(j);delete rt[y.__cacheKey],h.memory.textures--}function W(w){const y=s.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),s.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(y.__webglFramebuffer[rt]))for(let pt=0;pt<y.__webglFramebuffer[rt].length;pt++)o.deleteFramebuffer(y.__webglFramebuffer[rt][pt]);else o.deleteFramebuffer(y.__webglFramebuffer[rt]);y.__webglDepthbuffer&&o.deleteRenderbuffer(y.__webglDepthbuffer[rt])}else{if(Array.isArray(y.__webglFramebuffer))for(let rt=0;rt<y.__webglFramebuffer.length;rt++)o.deleteFramebuffer(y.__webglFramebuffer[rt]);else o.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&o.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&o.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let rt=0;rt<y.__webglColorRenderbuffer.length;rt++)y.__webglColorRenderbuffer[rt]&&o.deleteRenderbuffer(y.__webglColorRenderbuffer[rt]);y.__webglDepthRenderbuffer&&o.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const j=w.textures;for(let rt=0,pt=j.length;rt<pt;rt++){const bt=s.get(j[rt]);bt.__webglTexture&&(o.deleteTexture(bt.__webglTexture),h.memory.textures--),s.remove(j[rt])}s.remove(w)}let et=0;function ct(){et=0}function J(){return et}function $(w){et=w}function q(){const w=et;return w>=u.maxTextures&&se("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+u.maxTextures),et+=1,w}function X(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function ft(w,y){const j=s.get(w);if(w.isVideoTexture&&G(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&j.__version!==w.version){const rt=w.image;if(rt===null)se("WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)se("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(j,w,y);return}}else w.isExternalTexture&&(j.__webglTexture=w.sourceTexture?w.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,j.__webglTexture,o.TEXTURE0+y)}function ot(w,y){const j=s.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&j.__version!==w.version){Tt(j,w,y);return}else w.isExternalTexture&&(j.__webglTexture=w.sourceTexture?w.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,j.__webglTexture,o.TEXTURE0+y)}function dt(w,y){const j=s.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&j.__version!==w.version){Tt(j,w,y);return}i.bindTexture(o.TEXTURE_3D,j.__webglTexture,o.TEXTURE0+y)}function Mt(w,y){const j=s.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&j.__version!==w.version){It(j,w,y);return}i.bindTexture(o.TEXTURE_CUBE_MAP,j.__webglTexture,o.TEXTURE0+y)}const Qt={[lp]:o.REPEAT,[Hi]:o.CLAMP_TO_EDGE,[up]:o.MIRRORED_REPEAT},Yt={[On]:o.NEAREST,[EE]:o.NEAREST_MIPMAP_NEAREST,[ju]:o.NEAREST_MIPMAP_LINEAR,[Rn]:o.LINEAR,[Td]:o.LINEAR_MIPMAP_NEAREST,[Qs]:o.LINEAR_MIPMAP_LINEAR},z={[RE]:o.NEVER,[NE]:o.ALWAYS,[CE]:o.LESS,[Jp]:o.LEQUAL,[wE]:o.EQUAL,[jp]:o.GEQUAL,[DE]:o.GREATER,[UE]:o.NOTEQUAL};function mt(w,y){if(y.type===ra&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Rn||y.magFilter===Td||y.magFilter===ju||y.magFilter===Qs||y.minFilter===Rn||y.minFilter===Td||y.minFilter===ju||y.minFilter===Qs)&&se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(w,o.TEXTURE_WRAP_S,Qt[y.wrapS]),o.texParameteri(w,o.TEXTURE_WRAP_T,Qt[y.wrapT]),(w===o.TEXTURE_3D||w===o.TEXTURE_2D_ARRAY)&&o.texParameteri(w,o.TEXTURE_WRAP_R,Qt[y.wrapR]),o.texParameteri(w,o.TEXTURE_MAG_FILTER,Yt[y.magFilter]),o.texParameteri(w,o.TEXTURE_MIN_FILTER,Yt[y.minFilter]),y.compareFunction&&(o.texParameteri(w,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(w,o.TEXTURE_COMPARE_FUNC,z[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===On||y.minFilter!==ju&&y.minFilter!==Qs||y.type===ra&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||s.get(y).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");o.texParameterf(w,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,u.getMaxAnisotropy())),s.get(y).__currentAnisotropy=y.anisotropy}}}function At(w,y){let j=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",P));const rt=y.source;let pt=E.get(rt);pt===void 0&&(pt={},E.set(rt,pt));const bt=X(y);if(bt!==w.__cacheKey){pt[bt]===void 0&&(pt[bt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,j=!0),pt[bt].usedTimes++;const Dt=pt[w.__cacheKey];Dt!==void 0&&(pt[w.__cacheKey].usedTimes--,Dt.usedTimes===0&&V(y)),w.__cacheKey=bt,w.__webglTexture=pt[bt].texture}return j}function Y(w,y,j){return Math.floor(Math.floor(w/j)/y)}function ht(w,y,j,rt){const bt=w.updateRanges;if(bt.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,y.width,y.height,j,rt,y.data);else{bt.sort((jt,Pt)=>jt.start-Pt.start);let Dt=0;for(let jt=1;jt<bt.length;jt++){const Pt=bt[Dt],Ot=bt[jt],Vt=Pt.start+Pt.count,ee=Y(Ot.start,y.width,4),le=Y(Pt.start,y.width,4);Ot.start<=Vt+1&&ee===le&&Y(Ot.start+Ot.count-1,y.width,4)===ee?Pt.count=Math.max(Pt.count,Ot.start+Ot.count-Pt.start):(++Dt,bt[Dt]=Ot)}bt.length=Dt+1;const gt=i.getParameter(o.UNPACK_ROW_LENGTH),yt=i.getParameter(o.UNPACK_SKIP_PIXELS),wt=i.getParameter(o.UNPACK_SKIP_ROWS);i.pixelStorei(o.UNPACK_ROW_LENGTH,y.width);for(let jt=0,Pt=bt.length;jt<Pt;jt++){const Ot=bt[jt],Vt=Math.floor(Ot.start/4),ee=Math.ceil(Ot.count/4),le=Vt%y.width,H=Math.floor(Vt/y.width),Ct=ee,xt=1;i.pixelStorei(o.UNPACK_SKIP_PIXELS,le),i.pixelStorei(o.UNPACK_SKIP_ROWS,H),i.texSubImage2D(o.TEXTURE_2D,0,le,H,Ct,xt,j,rt,y.data)}w.clearUpdateRanges(),i.pixelStorei(o.UNPACK_ROW_LENGTH,gt),i.pixelStorei(o.UNPACK_SKIP_PIXELS,yt),i.pixelStorei(o.UNPACK_SKIP_ROWS,wt)}}function Tt(w,y,j){let rt=o.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(rt=o.TEXTURE_2D_ARRAY),y.isData3DTexture&&(rt=o.TEXTURE_3D);const pt=At(w,y),bt=y.source;i.bindTexture(rt,w.__webglTexture,o.TEXTURE0+j);const Dt=s.get(bt);if(bt.version!==Dt.__version||pt===!0){if(i.activeTexture(o.TEXTURE0+j),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const xt=Ue.getPrimaries(Ue.workingColorSpace),Ut=y.colorSpace===_s?null:Ue.getPrimaries(y.colorSpace),Gt=y.colorSpace===_s||xt===Ut?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt)}i.pixelStorei(o.UNPACK_ALIGNMENT,y.unpackAlignment);let yt=M(y.image,!1,u.maxTextureSize);yt=nn(y,yt);const wt=f.convert(y.format,y.colorSpace),jt=f.convert(y.type);let Pt=C(y.internalFormat,wt,jt,y.normalized,y.colorSpace,y.isVideoTexture);mt(rt,y);let Ot;const Vt=y.mipmaps,ee=y.isVideoTexture!==!0,le=Dt.__version===void 0||pt===!0,H=bt.dataReady,Ct=N(y,yt);if(y.isDepthTexture)Pt=U(y.format===Js,y.type),le&&(ee?i.texStorage2D(o.TEXTURE_2D,1,Pt,yt.width,yt.height):i.texImage2D(o.TEXTURE_2D,0,Pt,yt.width,yt.height,0,wt,jt,null));else if(y.isDataTexture)if(Vt.length>0){ee&&le&&i.texStorage2D(o.TEXTURE_2D,Ct,Pt,Vt[0].width,Vt[0].height);for(let xt=0,Ut=Vt.length;xt<Ut;xt++)Ot=Vt[xt],ee?H&&i.texSubImage2D(o.TEXTURE_2D,xt,0,0,Ot.width,Ot.height,wt,jt,Ot.data):i.texImage2D(o.TEXTURE_2D,xt,Pt,Ot.width,Ot.height,0,wt,jt,Ot.data);y.generateMipmaps=!1}else ee?(le&&i.texStorage2D(o.TEXTURE_2D,Ct,Pt,yt.width,yt.height),H&&ht(y,yt,wt,jt)):i.texImage2D(o.TEXTURE_2D,0,Pt,yt.width,yt.height,0,wt,jt,yt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ee&&le&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ct,Pt,Vt[0].width,Vt[0].height,yt.depth);for(let xt=0,Ut=Vt.length;xt<Ut;xt++)if(Ot=Vt[xt],y.format!==Ri)if(wt!==null)if(ee){if(H)if(y.layerUpdates.size>0){const Gt=qv(Ot.width,Ot.height,y.format,y.type);for(const Et of y.layerUpdates){const Jt=Ot.data.subarray(Et*Gt/Ot.data.BYTES_PER_ELEMENT,(Et+1)*Gt/Ot.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,xt,0,0,Et,Ot.width,Ot.height,1,wt,Jt)}}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,xt,0,0,0,Ot.width,Ot.height,yt.depth,wt,Ot.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,xt,Pt,Ot.width,Ot.height,yt.depth,0,Ot.data,0,0);else se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?H&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,xt,0,0,0,Ot.width,Ot.height,yt.depth,wt,jt,Ot.data):i.texImage3D(o.TEXTURE_2D_ARRAY,xt,Pt,Ot.width,Ot.height,yt.depth,0,wt,jt,Ot.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ee&&le&&i.texStorage2D(o.TEXTURE_2D,Ct,Pt,Vt[0].width,Vt[0].height);for(let xt=0,Ut=Vt.length;xt<Ut;xt++)Ot=Vt[xt],y.format!==Ri?wt!==null?ee?H&&i.compressedTexSubImage2D(o.TEXTURE_2D,xt,0,0,Ot.width,Ot.height,wt,Ot.data):i.compressedTexImage2D(o.TEXTURE_2D,xt,Pt,Ot.width,Ot.height,0,Ot.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?H&&i.texSubImage2D(o.TEXTURE_2D,xt,0,0,Ot.width,Ot.height,wt,jt,Ot.data):i.texImage2D(o.TEXTURE_2D,xt,Pt,Ot.width,Ot.height,0,wt,jt,Ot.data)}else if(y.isDataArrayTexture)if(ee){if(le&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ct,Pt,yt.width,yt.height,yt.depth),H)if(y.layerUpdates.size>0){const xt=qv(yt.width,yt.height,y.format,y.type);for(const Ut of y.layerUpdates){const Gt=yt.data.subarray(Ut*xt/yt.data.BYTES_PER_ELEMENT,(Ut+1)*xt/yt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Ut,yt.width,yt.height,1,wt,jt,Gt)}y.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,yt.width,yt.height,yt.depth,wt,jt,yt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Pt,yt.width,yt.height,yt.depth,0,wt,jt,yt.data);else if(y.isData3DTexture)ee?(le&&i.texStorage3D(o.TEXTURE_3D,Ct,Pt,yt.width,yt.height,yt.depth),H&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,yt.width,yt.height,yt.depth,wt,jt,yt.data)):i.texImage3D(o.TEXTURE_3D,0,Pt,yt.width,yt.height,yt.depth,0,wt,jt,yt.data);else if(y.isFramebufferTexture){if(le)if(ee)i.texStorage2D(o.TEXTURE_2D,Ct,Pt,yt.width,yt.height);else{let xt=yt.width,Ut=yt.height;for(let Gt=0;Gt<Ct;Gt++)i.texImage2D(o.TEXTURE_2D,Gt,Pt,xt,Ut,0,wt,jt,null),xt>>=1,Ut>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in o){const xt=o.canvas;if(xt.hasAttribute("layoutsubtree")||xt.setAttribute("layoutsubtree","true"),yt.parentNode!==xt){xt.appendChild(yt),_.add(y),xt.onpaint=Ut=>{const Gt=Ut.changedElements;for(const Et of _)Gt.includes(Et.image)&&(Et.needsUpdate=!0)},xt.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,yt);else{const Gt=o.RGBA,Et=o.RGBA,Jt=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,Gt,Et,Jt,yt)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(Vt.length>0){if(ee&&le){const xt=Le(Vt[0]);i.texStorage2D(o.TEXTURE_2D,Ct,Pt,xt.width,xt.height)}for(let xt=0,Ut=Vt.length;xt<Ut;xt++)Ot=Vt[xt],ee?H&&i.texSubImage2D(o.TEXTURE_2D,xt,0,0,wt,jt,Ot):i.texImage2D(o.TEXTURE_2D,xt,Pt,wt,jt,Ot);y.generateMipmaps=!1}else if(ee){if(le){const xt=Le(yt);i.texStorage2D(o.TEXTURE_2D,Ct,Pt,xt.width,xt.height)}H&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,wt,jt,yt)}else i.texImage2D(o.TEXTURE_2D,0,Pt,wt,jt,yt);x(y)&&I(rt),Dt.__version=bt.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function It(w,y,j){if(y.image.length!==6)return;const rt=At(w,y),pt=y.source;i.bindTexture(o.TEXTURE_CUBE_MAP,w.__webglTexture,o.TEXTURE0+j);const bt=s.get(pt);if(pt.version!==bt.__version||rt===!0){i.activeTexture(o.TEXTURE0+j);const Dt=Ue.getPrimaries(Ue.workingColorSpace),gt=y.colorSpace===_s?null:Ue.getPrimaries(y.colorSpace),yt=y.colorSpace===_s||Dt===gt?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(o.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const wt=y.isCompressedTexture||y.image[0].isCompressedTexture,jt=y.image[0]&&y.image[0].isDataTexture,Pt=[];for(let Et=0;Et<6;Et++)!wt&&!jt?Pt[Et]=M(y.image[Et],!0,u.maxCubemapSize):Pt[Et]=jt?y.image[Et].image:y.image[Et],Pt[Et]=nn(y,Pt[Et]);const Ot=Pt[0],Vt=f.convert(y.format,y.colorSpace),ee=f.convert(y.type),le=C(y.internalFormat,Vt,ee,y.normalized,y.colorSpace),H=y.isVideoTexture!==!0,Ct=bt.__version===void 0||rt===!0,xt=pt.dataReady;let Ut=N(y,Ot);mt(o.TEXTURE_CUBE_MAP,y);let Gt;if(wt){H&&Ct&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ut,le,Ot.width,Ot.height);for(let Et=0;Et<6;Et++){Gt=Pt[Et].mipmaps;for(let Jt=0;Jt<Gt.length;Jt++){const Ht=Gt[Jt];y.format!==Ri?Vt!==null?H?xt&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,0,0,Ht.width,Ht.height,Vt,Ht.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,le,Ht.width,Ht.height,0,Ht.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?xt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,0,0,Ht.width,Ht.height,Vt,ee,Ht.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,le,Ht.width,Ht.height,0,Vt,ee,Ht.data)}}}else{if(Gt=y.mipmaps,H&&Ct){Gt.length>0&&Ut++;const Et=Le(Pt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ut,le,Et.width,Et.height)}for(let Et=0;Et<6;Et++)if(jt){H?xt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Pt[Et].width,Pt[Et].height,Vt,ee,Pt[Et].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,le,Pt[Et].width,Pt[Et].height,0,Vt,ee,Pt[Et].data);for(let Jt=0;Jt<Gt.length;Jt++){const we=Gt[Jt].image[Et].image;H?xt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,0,0,we.width,we.height,Vt,ee,we.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,le,we.width,we.height,0,Vt,ee,we.data)}}else{H?xt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Vt,ee,Pt[Et]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,le,Vt,ee,Pt[Et]);for(let Jt=0;Jt<Gt.length;Jt++){const Ht=Gt[Jt];H?xt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,0,0,Vt,ee,Ht.image[Et]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,le,Vt,ee,Ht.image[Et])}}}x(y)&&I(o.TEXTURE_CUBE_MAP),bt.__version=pt.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function _t(w,y,j,rt,pt,bt){const Dt=f.convert(j.format,j.colorSpace),gt=f.convert(j.type),yt=C(j.internalFormat,Dt,gt,j.normalized,j.colorSpace),wt=s.get(y),jt=s.get(j);if(jt.__renderTarget=y,!wt.__hasExternalTextures){const Pt=Math.max(1,y.width>>bt),Ot=Math.max(1,y.height>>bt);pt===o.TEXTURE_3D||pt===o.TEXTURE_2D_ARRAY?i.texImage3D(pt,bt,yt,Pt,Ot,y.depth,0,Dt,gt,null):i.texImage2D(pt,bt,yt,Pt,Ot,0,Dt,gt,null)}i.bindFramebuffer(o.FRAMEBUFFER,w),tn(y)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,rt,pt,jt.__webglTexture,0,Oe(y)):(pt===o.TEXTURE_2D||pt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&pt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,rt,pt,jt.__webglTexture,bt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Rt(w,y,j){if(o.bindRenderbuffer(o.RENDERBUFFER,w),y.depthBuffer){const rt=y.depthTexture,pt=rt&&rt.isDepthTexture?rt.type:null,bt=U(y.stencilBuffer,pt),Dt=y.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;tn(y)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Oe(y),bt,y.width,y.height):j?o.renderbufferStorageMultisample(o.RENDERBUFFER,Oe(y),bt,y.width,y.height):o.renderbufferStorage(o.RENDERBUFFER,bt,y.width,y.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Dt,o.RENDERBUFFER,w)}else{const rt=y.textures;for(let pt=0;pt<rt.length;pt++){const bt=rt[pt],Dt=f.convert(bt.format,bt.colorSpace),gt=f.convert(bt.type),yt=C(bt.internalFormat,Dt,gt,bt.normalized,bt.colorSpace);tn(y)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Oe(y),yt,y.width,y.height):j?o.renderbufferStorageMultisample(o.RENDERBUFFER,Oe(y),yt,y.width,y.height):o.renderbufferStorage(o.RENDERBUFFER,yt,y.width,y.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Ge(w,y,j){const rt=y.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(o.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const pt=s.get(y.depthTexture);if(pt.__renderTarget=y,(!pt.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),rt){if(pt.__webglInit===void 0&&(pt.__webglInit=!0,y.depthTexture.addEventListener("dispose",P)),pt.__webglTexture===void 0){pt.__webglTexture=o.createTexture(),i.bindTexture(o.TEXTURE_CUBE_MAP,pt.__webglTexture),mt(o.TEXTURE_CUBE_MAP,y.depthTexture);const wt=f.convert(y.depthTexture.format),jt=f.convert(y.depthTexture.type);let Pt;y.depthTexture.format===za?Pt=o.DEPTH_COMPONENT24:y.depthTexture.format===Js&&(Pt=o.DEPTH24_STENCIL8);for(let Ot=0;Ot<6;Ot++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Ot,0,Pt,y.width,y.height,0,wt,jt,null)}}else ft(y.depthTexture,0);const bt=pt.__webglTexture,Dt=Oe(y),gt=rt?o.TEXTURE_CUBE_MAP_POSITIVE_X+j:o.TEXTURE_2D,yt=y.depthTexture.format===Js?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(y.depthTexture.format===za)tn(y)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,yt,gt,bt,0,Dt):o.framebufferTexture2D(o.FRAMEBUFFER,yt,gt,bt,0);else if(y.depthTexture.format===Js)tn(y)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,yt,gt,bt,0,Dt):o.framebufferTexture2D(o.FRAMEBUFFER,yt,gt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function me(w){const y=s.get(w),j=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const rt=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),rt){const pt=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,rt.removeEventListener("dispose",pt)};rt.addEventListener("dispose",pt),y.__depthDisposeCallback=pt}y.__boundDepthTexture=rt}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(j)for(let rt=0;rt<6;rt++)Ge(y.__webglFramebuffer[rt],w,rt);else{const rt=w.texture.mipmaps;rt&&rt.length>0?Ge(y.__webglFramebuffer[0],w,0):Ge(y.__webglFramebuffer,w,0)}else if(j){y.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(i.bindFramebuffer(o.FRAMEBUFFER,y.__webglFramebuffer[rt]),y.__webglDepthbuffer[rt]===void 0)y.__webglDepthbuffer[rt]=o.createRenderbuffer(),Rt(y.__webglDepthbuffer[rt],w,!1);else{const pt=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,bt=y.__webglDepthbuffer[rt];o.bindRenderbuffer(o.RENDERBUFFER,bt),o.framebufferRenderbuffer(o.FRAMEBUFFER,pt,o.RENDERBUFFER,bt)}}else{const rt=w.texture.mipmaps;if(rt&&rt.length>0?i.bindFramebuffer(o.FRAMEBUFFER,y.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=o.createRenderbuffer(),Rt(y.__webglDepthbuffer,w,!1);else{const pt=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,bt=y.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,bt),o.framebufferRenderbuffer(o.FRAMEBUFFER,pt,o.RENDERBUFFER,bt)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function _e(w,y,j){const rt=s.get(w);y!==void 0&&_t(rt.__webglFramebuffer,w,w.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),j!==void 0&&me(w)}function Me(w){const y=w.texture,j=s.get(w),rt=s.get(y);w.addEventListener("dispose",T);const pt=w.textures,bt=w.isWebGLCubeRenderTarget===!0,Dt=pt.length>1;if(Dt||(rt.__webglTexture===void 0&&(rt.__webglTexture=o.createTexture()),rt.__version=y.version,h.memory.textures++),bt){j.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(y.mipmaps&&y.mipmaps.length>0){j.__webglFramebuffer[gt]=[];for(let yt=0;yt<y.mipmaps.length;yt++)j.__webglFramebuffer[gt][yt]=o.createFramebuffer()}else j.__webglFramebuffer[gt]=o.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){j.__webglFramebuffer=[];for(let gt=0;gt<y.mipmaps.length;gt++)j.__webglFramebuffer[gt]=o.createFramebuffer()}else j.__webglFramebuffer=o.createFramebuffer();if(Dt)for(let gt=0,yt=pt.length;gt<yt;gt++){const wt=s.get(pt[gt]);wt.__webglTexture===void 0&&(wt.__webglTexture=o.createTexture(),h.memory.textures++)}if(w.samples>0&&tn(w)===!1){j.__webglMultisampledFramebuffer=o.createFramebuffer(),j.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let gt=0;gt<pt.length;gt++){const yt=pt[gt];j.__webglColorRenderbuffer[gt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,j.__webglColorRenderbuffer[gt]);const wt=f.convert(yt.format,yt.colorSpace),jt=f.convert(yt.type),Pt=C(yt.internalFormat,wt,jt,yt.normalized,yt.colorSpace,w.isXRRenderTarget===!0),Ot=Oe(w);o.renderbufferStorageMultisample(o.RENDERBUFFER,Ot,Pt,w.width,w.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+gt,o.RENDERBUFFER,j.__webglColorRenderbuffer[gt])}o.bindRenderbuffer(o.RENDERBUFFER,null),w.depthBuffer&&(j.__webglDepthRenderbuffer=o.createRenderbuffer(),Rt(j.__webglDepthRenderbuffer,w,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(bt){i.bindTexture(o.TEXTURE_CUBE_MAP,rt.__webglTexture),mt(o.TEXTURE_CUBE_MAP,y);for(let gt=0;gt<6;gt++)if(y.mipmaps&&y.mipmaps.length>0)for(let yt=0;yt<y.mipmaps.length;yt++)_t(j.__webglFramebuffer[gt][yt],w,y,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,yt);else _t(j.__webglFramebuffer[gt],w,y,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);x(y)&&I(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Dt){for(let gt=0,yt=pt.length;gt<yt;gt++){const wt=pt[gt],jt=s.get(wt);let Pt=o.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Pt=w.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Pt,jt.__webglTexture),mt(Pt,wt),_t(j.__webglFramebuffer,w,wt,o.COLOR_ATTACHMENT0+gt,Pt,0),x(wt)&&I(Pt)}i.unbindTexture()}else{let gt=o.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(gt=w.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(gt,rt.__webglTexture),mt(gt,y),y.mipmaps&&y.mipmaps.length>0)for(let yt=0;yt<y.mipmaps.length;yt++)_t(j.__webglFramebuffer[yt],w,y,o.COLOR_ATTACHMENT0,gt,yt);else _t(j.__webglFramebuffer,w,y,o.COLOR_ATTACHMENT0,gt,0);x(y)&&I(gt),i.unbindTexture()}w.depthBuffer&&me(w)}function te(w){const y=w.textures;for(let j=0,rt=y.length;j<rt;j++){const pt=y[j];if(x(pt)){const bt=K(w),Dt=s.get(pt).__webglTexture;i.bindTexture(bt,Dt),I(bt),i.unbindTexture()}}}const ne=[],Ve=[];function hn(w){if(w.samples>0){if(tn(w)===!1){const y=w.textures,j=w.width,rt=w.height;let pt=o.COLOR_BUFFER_BIT;const bt=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Dt=s.get(w),gt=y.length>1;if(gt)for(let wt=0;wt<y.length;wt++)i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+wt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+wt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const yt=w.texture.mipmaps;yt&&yt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let wt=0;wt<y.length;wt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(pt|=o.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(pt|=o.STENCIL_BUFFER_BIT)),gt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);const jt=s.get(y[wt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,jt,0)}o.blitFramebuffer(0,0,j,rt,0,0,j,rt,pt,o.NEAREST),p===!0&&(ne.length=0,Ve.length=0,ne.push(o.COLOR_ATTACHMENT0+wt),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(ne.push(bt),Ve.push(bt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Ve)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,ne))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),gt)for(let wt=0;wt<y.length;wt++){i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+wt,o.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);const jt=s.get(y[wt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+wt,o.TEXTURE_2D,jt,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&p){const y=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[y])}}}function Oe(w){return Math.min(u.maxSamples,w.samples)}function tn(w){const y=s.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function G(w){const y=h.render.frame;S.get(w)!==y&&(S.set(w,y),w.update())}function nn(w,y){const j=w.colorSpace,rt=w.format,pt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||j!==fo&&j!==_s&&(Ue.getTransfer(j)===We?(rt!==Ri||pt!==fi)&&se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pe("WebGLTextures: Unsupported texture color space:",j)),y}function Le(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(m.width=w.naturalWidth||w.width,m.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(m.width=w.displayWidth,m.height=w.displayHeight):(m.width=w.width,m.height=w.height),m}this.allocateTextureUnit=q,this.resetTextureUnits=ct,this.getTextureUnits=J,this.setTextureUnits=$,this.setTexture2D=ft,this.setTexture2DArray=ot,this.setTexture3D=dt,this.setTextureCube=Mt,this.rebindTextures=_e,this.setupRenderTarget=Me,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=hn,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=tn,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function M3(o,e){function i(s,u=_s){let f;const h=Ue.getTransfer(u);if(s===fi)return o.UNSIGNED_BYTE;if(s===Wp)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Yp)return o.UNSIGNED_SHORT_5_5_5_1;if(s===NS)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===LS)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===DS)return o.BYTE;if(s===US)return o.SHORT;if(s===Tl)return o.UNSIGNED_SHORT;if(s===qp)return o.INT;if(s===ua)return o.UNSIGNED_INT;if(s===ra)return o.FLOAT;if(s===wi)return o.HALF_FLOAT;if(s===OS)return o.ALPHA;if(s===PS)return o.RGB;if(s===Ri)return o.RGBA;if(s===za)return o.DEPTH_COMPONENT;if(s===Js)return o.DEPTH_STENCIL;if(s===IS)return o.RED;if(s===Zp)return o.RED_INTEGER;if(s===tr)return o.RG;if(s===Kp)return o.RG_INTEGER;if(s===Qp)return o.RGBA_INTEGER;if(s===Rc||s===Cc||s===wc||s===Dc)if(h===We)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===Rc)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Cc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===wc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===Rc)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Cc)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===wc)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dc)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===cp||s===fp||s===hp||s===dp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===cp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===fp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===hp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===dp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===pp||s===mp||s===gp||s===_p||s===vp||s===Nc||s===Sp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(s===pp||s===mp)return h===We?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===gp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC;if(s===_p)return f.COMPRESSED_R11_EAC;if(s===vp)return f.COMPRESSED_SIGNED_R11_EAC;if(s===Nc)return f.COMPRESSED_RG11_EAC;if(s===Sp)return f.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===xp||s===yp||s===Mp||s===Ep||s===Tp||s===bp||s===Ap||s===Rp||s===Cp||s===wp||s===Dp||s===Up||s===Np||s===Lp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(s===xp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===yp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Mp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ep)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Tp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===bp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ap)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Rp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Cp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===wp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Dp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Up)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Np)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Lp)return h===We?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Op||s===Pp||s===Ip)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(s===Op)return h===We?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Pp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ip)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===zp||s===Bp||s===Lc||s===Fp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(s===zp)return f.COMPRESSED_RED_RGTC1_EXT;if(s===Bp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Lc)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Fp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===bl?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const E3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T3=`
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

}`;class b3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new YS(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Vi({vertexShader:E3,fragmentShader:T3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ca(new Hc(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A3 extends xs{constructor(e,i){super();const s=this;let u=null,f=1,h=null,d="local-floor",p=1,m=null,S=null,_=null,v=null,E=null,R=null;const D=typeof XRWebGLBinding<"u",M=new b3,x={},I=i.getContextAttributes();let K=null,C=null;const U=[],N=[],P=new re;let T=null,L=null;const V=new Ai;V.viewport=new un;const W=new Ai;W.viewport=new un;const et=[V,W],ct=new NT;let J=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ht=U[Y];return ht===void 0&&(ht=new Ud,U[Y]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(Y){let ht=U[Y];return ht===void 0&&(ht=new Ud,U[Y]=ht),ht.getGripSpace()},this.getHand=function(Y){let ht=U[Y];return ht===void 0&&(ht=new Ud,U[Y]=ht),ht.getHandSpace()};function q(Y){const ht=N.indexOf(Y.inputSource);if(ht===-1)return;const Tt=U[ht];Tt!==void 0&&(Tt.update(Y.inputSource,Y.frame,m||h),Tt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){u.removeEventListener("select",q),u.removeEventListener("selectstart",q),u.removeEventListener("selectend",q),u.removeEventListener("squeeze",q),u.removeEventListener("squeezestart",q),u.removeEventListener("squeezeend",q),u.removeEventListener("end",X),u.removeEventListener("inputsourceschange",ft);for(let Y=0;Y<U.length;Y++){const ht=N[Y];ht!==null&&(N[Y]=null,U[Y].disconnect(ht))}J=null,$=null,M.reset();for(const Y in x)delete x[Y];if(e.setRenderTarget(K),E=null,v=null,_=null,u=null,C=null,At.stop(),s.isPresenting=!1,e.setPixelRatio(T),e.setSize(P.width,P.height,!1),L!==null){const Y=L.camera;Y.fov=L.fov,Y.zoom=L.zoom,Y.updateProjectionMatrix(),L=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){f=Y,s.isPresenting===!0&&se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){d=Y,s.isPresenting===!0&&se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||h},this.setReferenceSpace=function(Y){m=Y},this.getBaseLayer=function(){return v!==null?v:E},this.getBinding=function(){return _===null&&D&&(_=new XRWebGLBinding(u,i)),_},this.getFrame=function(){return R},this.getSession=function(){return u},this.setSession=async function(Y){if(u=Y,u!==null){if(K=e.getRenderTarget(),u.addEventListener("select",q),u.addEventListener("selectstart",q),u.addEventListener("selectend",q),u.addEventListener("squeeze",q),u.addEventListener("squeezestart",q),u.addEventListener("squeezeend",q),u.addEventListener("end",X),u.addEventListener("inputsourceschange",ft),I.xrCompatible!==!0&&await i.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(P),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,It=null,_t=null;I.depth&&(_t=I.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Tt=I.stencil?Js:za,It=I.stencil?bl:ua);const Rt={colorFormat:i.RGBA8,depthFormat:_t,scaleFactor:f};_=this.getBinding(),v=_.createProjectionLayer(Rt),u.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),C=new Ci(v.textureWidth,v.textureHeight,{format:Ri,type:fi,depthTexture:new Rl(v.textureWidth,v.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const Tt={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:f};E=new XRWebGLLayer(u,i,Tt),u.updateRenderState({baseLayer:E}),e.setPixelRatio(1),e.setSize(E.framebufferWidth,E.framebufferHeight,!1),C=new Ci(E.framebufferWidth,E.framebufferHeight,{format:Ri,type:fi,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1,storeMultisampledDepthBuffer:E.ignoreDepthValues===!1,storeMultisampledStencilBuffer:E.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(p),m=null,h=await u.requestReferenceSpace(d),At.setContext(u),At.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(u!==null)return u.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ft(Y){for(let ht=0;ht<Y.removed.length;ht++){const Tt=Y.removed[ht],It=N.indexOf(Tt);It>=0&&(N[It]=null,U[It].disconnect(Tt))}for(let ht=0;ht<Y.added.length;ht++){const Tt=Y.added[ht];let It=N.indexOf(Tt);if(It===-1){for(let Rt=0;Rt<U.length;Rt++)if(Rt>=N.length){N.push(Tt),It=Rt;break}else if(N[Rt]===null){N[Rt]=Tt,It=Rt;break}if(It===-1)break}const _t=U[It];_t&&_t.connect(Tt)}}const ot=new st,dt=new st;function Mt(Y,ht,Tt){ot.setFromMatrixPosition(ht.matrixWorld),dt.setFromMatrixPosition(Tt.matrixWorld);const It=ot.distanceTo(dt),_t=ht.projectionMatrix.elements,Rt=Tt.projectionMatrix.elements,Ge=_t[14]/(_t[10]-1),me=_t[14]/(_t[10]+1),_e=(_t[9]+1)/_t[5],Me=(_t[9]-1)/_t[5],te=(_t[8]-1)/_t[0],ne=(Rt[8]+1)/Rt[0],Ve=Ge*te,hn=Ge*ne,Oe=It/(-te+ne),tn=Oe*-te;if(ht.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(tn),Y.translateZ(Oe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),_t[10]===-1)Y.projectionMatrix.copy(ht.projectionMatrix),Y.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const G=Ge+Oe,nn=me+Oe,Le=Ve-tn,w=hn+(It-tn),y=_e*me/nn*G,j=Me*me/nn*G;Y.projectionMatrix.makePerspective(Le,w,y,j,G,nn),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Qt(Y,ht){ht===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ht.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(u===null)return;let ht=Y.near,Tt=Y.far;M.texture!==null&&(M.depthNear>0&&(ht=M.depthNear),M.depthFar>0&&(Tt=M.depthFar)),ct.near=W.near=V.near=ht,ct.far=W.far=V.far=Tt,(J!==ct.near||$!==ct.far)&&(u.updateRenderState({depthNear:ct.near,depthFar:ct.far}),J=ct.near,$=ct.far),ct.layers.mask=Y.layers.mask|6,V.layers.mask=ct.layers.mask&-5,W.layers.mask=ct.layers.mask&-3;const It=Y.parent,_t=ct.cameras;Qt(ct,It);for(let Rt=0;Rt<_t.length;Rt++)Qt(_t[Rt],It);_t.length===2?Mt(ct,V,W):ct.projectionMatrix.copy(V.projectionMatrix),L===null&&Y.isPerspectiveCamera&&(L={camera:Y,fov:Y.fov,zoom:Y.zoom}),Yt(Y,ct,It)};function Yt(Y,ht,Tt){Tt===null?Y.matrix.copy(ht.matrixWorld):(Y.matrix.copy(Tt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ht.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ht.projectionMatrix),Y.projectionMatrixInverse.copy(ht.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Al*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return ct},this.getFoveation=function(){if(!(v===null&&E===null))return p},this.setFoveation=function(Y){p=Y,v!==null&&(v.fixedFoveation=Y),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=Y)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(ct)},this.getCameraTexture=function(Y){return x[Y]};let z=null;function mt(Y,ht){if(S=ht.getViewerPose(m||h),R=ht,S!==null){const Tt=S.views;E!==null&&(e.setRenderTargetFramebuffer(C,E.framebuffer),e.setRenderTarget(C));let It=!1;Tt.length!==ct.cameras.length&&(ct.cameras.length=0,It=!0);for(let me=0;me<Tt.length;me++){const _e=Tt[me];let Me=null;if(E!==null)Me=E.getViewport(_e);else{const ne=_.getViewSubImage(v,_e);Me=ne.viewport,me===0&&(e.setRenderTargetTextures(C,ne.colorTexture,ne.depthStencilTexture),e.setRenderTarget(C))}let te=et[me];te===void 0&&(te=new Ai,te.layers.enable(me),te.viewport=new un,et[me]=te),te.matrix.fromArray(_e.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(_e.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(Me.x,Me.y,Me.width,Me.height),me===0&&(ct.matrix.copy(te.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale)),It===!0&&ct.cameras.push(te)}const _t=u.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&u.depthUsage=="gpu-optimized"&&D){_=s.getBinding();const me=_.getDepthInformation(Tt[0]);me&&me.isValid&&me.texture&&M.init(me,u.renderState)}if(_t&&_t.includes("camera-access")&&D){e.state.unbindTexture(),_=s.getBinding();for(let me=0;me<Tt.length;me++){const _e=Tt[me].camera;if(_e){let Me=x[_e];Me||(Me=new YS,x[_e]=Me);const te=_.getCameraImage(_e);Me.sourceTexture=te}}}}for(let Tt=0;Tt<U.length;Tt++){const It=N[Tt],_t=U[Tt];It!==null&&_t!==void 0&&_t.update(It,ht,m||h)}z&&z(Y,ht),ht.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ht}),R=null}const At=new JS;At.setAnimationLoop(mt),this.setAnimationLoop=function(Y){z=Y},this.dispose=function(){}}}const R3=new fn,ax=new he;ax.set(-1,0,0,0,1,0,0,0,1);function C3(o,e){function i(M,x){M.matrixAutoUpdate===!0&&M.updateMatrix(),x.value.copy(M.matrix)}function s(M,x){x.color.getRGB(M.fogColor.value,ZS(o)),x.isFog?(M.fogNear.value=x.near,M.fogFar.value=x.far):x.isFogExp2&&(M.fogDensity.value=x.density)}function u(M,x,I,K,C){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?f(M,x):x.isMeshLambertMaterial?(f(M,x),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(f(M,x),_(M,x)):x.isMeshPhongMaterial?(f(M,x),S(M,x),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(f(M,x),v(M,x),x.isMeshPhysicalMaterial&&E(M,x,C)):x.isMeshMatcapMaterial?(f(M,x),R(M,x)):x.isMeshDepthMaterial?f(M,x):x.isMeshDistanceMaterial?(f(M,x),D(M,x)):x.isMeshNormalMaterial?f(M,x):x.isLineBasicMaterial?(h(M,x),x.isLineDashedMaterial&&d(M,x)):x.isPointsMaterial?p(M,x,I,K):x.isSpriteMaterial?m(M,x):x.isShadowMaterial?(M.color.value.copy(x.color),M.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function f(M,x){M.opacity.value=x.opacity,x.color&&M.diffuse.value.copy(x.color),x.emissive&&M.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(M.map.value=x.map,i(x.map,M.mapTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,i(x.alphaMap,M.alphaMapTransform)),x.bumpMap&&(M.bumpMap.value=x.bumpMap,i(x.bumpMap,M.bumpMapTransform),M.bumpScale.value=x.bumpScale,x.side===jn&&(M.bumpScale.value*=-1)),x.normalMap&&(M.normalMap.value=x.normalMap,i(x.normalMap,M.normalMapTransform),M.normalScale.value.copy(x.normalScale),x.side===jn&&M.normalScale.value.negate()),x.displacementMap&&(M.displacementMap.value=x.displacementMap,i(x.displacementMap,M.displacementMapTransform),M.displacementScale.value=x.displacementScale,M.displacementBias.value=x.displacementBias),x.emissiveMap&&(M.emissiveMap.value=x.emissiveMap,i(x.emissiveMap,M.emissiveMapTransform)),x.specularMap&&(M.specularMap.value=x.specularMap,i(x.specularMap,M.specularMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest);const I=e.get(x),K=I.envMap,C=I.envMapRotation;K&&(M.envMap.value=K,M.envMapRotation.value.setFromMatrix4(R3.makeRotationFromEuler(C)).transpose(),K.isCubeTexture&&K.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(ax),M.reflectivity.value=x.reflectivity,M.ior.value=x.ior,M.refractionRatio.value=x.refractionRatio),x.lightMap&&(M.lightMap.value=x.lightMap,M.lightMapIntensity.value=x.lightMapIntensity,i(x.lightMap,M.lightMapTransform)),x.aoMap&&(M.aoMap.value=x.aoMap,M.aoMapIntensity.value=x.aoMapIntensity,i(x.aoMap,M.aoMapTransform))}function h(M,x){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,x.map&&(M.map.value=x.map,i(x.map,M.mapTransform))}function d(M,x){M.dashSize.value=x.dashSize,M.totalSize.value=x.dashSize+x.gapSize,M.scale.value=x.scale}function p(M,x,I,K){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,M.size.value=x.size*I,M.scale.value=K*.5,x.map&&(M.map.value=x.map,i(x.map,M.uvTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,i(x.alphaMap,M.alphaMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest)}function m(M,x){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,M.rotation.value=x.rotation,x.map&&(M.map.value=x.map,i(x.map,M.mapTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,i(x.alphaMap,M.alphaMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest)}function S(M,x){M.specular.value.copy(x.specular),M.shininess.value=Math.max(x.shininess,1e-4)}function _(M,x){x.gradientMap&&(M.gradientMap.value=x.gradientMap)}function v(M,x){M.metalness.value=x.metalness,x.metalnessMap&&(M.metalnessMap.value=x.metalnessMap,i(x.metalnessMap,M.metalnessMapTransform)),M.roughness.value=x.roughness,x.roughnessMap&&(M.roughnessMap.value=x.roughnessMap,i(x.roughnessMap,M.roughnessMapTransform)),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)}function E(M,x,I){M.ior.value=x.ior,x.sheen>0&&(M.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),M.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(M.sheenColorMap.value=x.sheenColorMap,i(x.sheenColorMap,M.sheenColorMapTransform)),x.sheenRoughnessMap&&(M.sheenRoughnessMap.value=x.sheenRoughnessMap,i(x.sheenRoughnessMap,M.sheenRoughnessMapTransform))),x.clearcoat>0&&(M.clearcoat.value=x.clearcoat,M.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(M.clearcoatMap.value=x.clearcoatMap,i(x.clearcoatMap,M.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,i(x.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(M.clearcoatNormalMap.value=x.clearcoatNormalMap,i(x.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===jn&&M.clearcoatNormalScale.value.negate())),x.dispersion>0&&(M.dispersion.value=x.dispersion),x.retroreflectivity>0&&(M.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(M.iridescence.value=x.iridescence,M.iridescenceIOR.value=x.iridescenceIOR,M.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(M.iridescenceMap.value=x.iridescenceMap,i(x.iridescenceMap,M.iridescenceMapTransform)),x.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=x.iridescenceThicknessMap,i(x.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),x.transmission>0&&(M.transmission.value=x.transmission,M.transmissionSamplerMap.value=I.texture,M.transmissionSamplerSize.value.set(I.width,I.height),x.transmissionMap&&(M.transmissionMap.value=x.transmissionMap,i(x.transmissionMap,M.transmissionMapTransform)),M.thickness.value=x.thickness,x.thicknessMap&&(M.thicknessMap.value=x.thicknessMap,i(x.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=x.attenuationDistance,M.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(M.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(M.anisotropyMap.value=x.anisotropyMap,i(x.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=x.specularIntensity,M.specularColor.value.copy(x.specularColor),x.specularColorMap&&(M.specularColorMap.value=x.specularColorMap,i(x.specularColorMap,M.specularColorMapTransform)),x.specularIntensityMap&&(M.specularIntensityMap.value=x.specularIntensityMap,i(x.specularIntensityMap,M.specularIntensityMapTransform))}function R(M,x){x.matcap&&(M.matcap.value=x.matcap)}function D(M,x){const I=e.get(x).light;M.referencePosition.value.setFromMatrixPosition(I.matrixWorld),M.nearDistance.value=I.shadow.camera.near,M.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:u}}function w3(o,e,i,s){let u={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(C,U){const N=U.program;s.uniformBlockBinding(C,N)}function m(C,U){let N=u[C.id];N===void 0&&(M(C),N=S(C),u[C.id]=N,C.addEventListener("dispose",I));const P=U.program;s.updateUBOMapping(C,P);const T=e.render.frame;f[C.id]!==T&&(v(C),f[C.id]=T)}function S(C){const U=_();C.__bindingPointIndex=U;const N=o.createBuffer(),P=C.__size,T=C.usage;return o.bindBuffer(o.UNIFORM_BUFFER,N),o.bufferData(o.UNIFORM_BUFFER,P,T),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,U,N),N}function _(){for(let C=0;C<d;C++)if(h.indexOf(C)===-1)return h.push(C),C;return Pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(C){const U=u[C.id],N=C.uniforms,P=C.__cache;o.bindBuffer(o.UNIFORM_BUFFER,U);for(let T=0,L=N.length;T<L;T++){const V=N[T];if(Array.isArray(V))for(let W=0,et=V.length;W<et;W++)E(V[W],T,W,P);else E(V,T,0,P)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function E(C,U,N,P){if(D(C,U,N,P)===!0){const T=C.__offset,L=C.value;if(Array.isArray(L)){let V=0;for(let W=0;W<L.length;W++){const et=L[W],ct=x(et);R(et,C.__data,V),typeof et!="number"&&typeof et!="boolean"&&!et.isMatrix3&&!ArrayBuffer.isView(et)&&(V+=ct.storage/Float32Array.BYTES_PER_ELEMENT)}}else R(L,C.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,T,C.__data)}}function R(C,U,N){typeof C=="number"||typeof C=="boolean"?U[0]=C:C.isMatrix3?(U[0]=C.elements[0],U[1]=C.elements[1],U[2]=C.elements[2],U[3]=0,U[4]=C.elements[3],U[5]=C.elements[4],U[6]=C.elements[5],U[7]=0,U[8]=C.elements[6],U[9]=C.elements[7],U[10]=C.elements[8],U[11]=0):ArrayBuffer.isView(C)?U.set(new C.constructor(C.buffer,C.byteOffset,U.length)):C.toArray(U,N)}function D(C,U,N,P){const T=C.value,L=U+"_"+N;if(P[L]===void 0)return typeof T=="number"||typeof T=="boolean"?P[L]=T:ArrayBuffer.isView(T)?P[L]=T.slice():P[L]=T.clone(),!0;{const V=P[L];if(typeof T=="number"||typeof T=="boolean"){if(V!==T)return P[L]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(V.equals(T)===!1)return V.copy(T),!0}}return!1}function M(C){const U=C.uniforms;let N=0;const P=16;for(let L=0,V=U.length;L<V;L++){const W=Array.isArray(U[L])?U[L]:[U[L]];for(let et=0,ct=W.length;et<ct;et++){const J=W[et],$=Array.isArray(J.value)?J.value:[J.value];for(let q=0,X=$.length;q<X;q++){const ft=$[q],ot=x(ft),dt=N%P,Mt=dt%ot.boundary,Qt=dt+Mt;N+=Mt,Qt!==0&&P-Qt<ot.storage&&(N+=P-Qt),J.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=N,N+=ot.storage}}}const T=N%P;return T>0&&(N+=P-T),C.__size=N,C.__cache={},this}function x(C){const U={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(U.boundary=4,U.storage=4):C.isVector2?(U.boundary=8,U.storage=8):C.isVector3||C.isColor?(U.boundary=16,U.storage=12):C.isVector4?(U.boundary=16,U.storage=16):C.isMatrix3?(U.boundary=48,U.storage=48):C.isMatrix4?(U.boundary=64,U.storage=64):C.isTexture?se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(U.boundary=16,U.storage=C.byteLength):se("WebGLRenderer: Unsupported uniform value type.",C),U}function I(C){const U=C.target;U.removeEventListener("dispose",I);const N=h.indexOf(U.__bindingPointIndex);h.splice(N,1),o.deleteBuffer(u[U.id]),delete u[U.id],delete f[U.id]}function K(){for(const C in u)o.deleteBuffer(u[C]);h=[],u={},f={}}return{bind:p,update:m,dispose:K}}const D3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let aa=null;function U3(){return aa===null&&(aa=new yT(D3,16,16,tr,wi),aa.name="DFG_LUT",aa.minFilter=Rn,aa.magFilter=Rn,aa.wrapS=Hi,aa.wrapT=Hi,aa.generateMipmaps=!1,aa.needsUpdate=!0),aa}class N3{constructor(e={}){const{canvas:i=PE(),context:s=null,depth:u=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:S="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:E=fi}=e;this.isWebGLRenderer=!0;let R;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");R=s.getContextAttributes().alpha}else R=h;const D=E,M=new Set([Qp,Kp,Zp]),x=new Set([fi,ua,Tl,bl,Wp,Yp]),I=new Uint32Array(4),K=new Int32Array(4),C=new st;let U=null,N=null;const P=[],T=[];let L=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const V=this;let W=!1,et=null,ct=null,J=null,$=null;this._outputColorSpace=bi;let q=0,X=0,ft=null,ot=-1,dt=null;const Mt=new un,Qt=new un;let Yt=null;const z=new He(0);let mt=0,At=i.width,Y=i.height,ht=1,Tt=null,It=null;const _t=new un(0,0,At,Y),Rt=new un(0,0,At,Y);let Ge=!1;const me=new qS;let _e=!1,Me=!1;const te=new fn,ne=new st,Ve=new un,hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function tn(){return ft===null?ht:1}let G=s;function nn(b,B){return i.getContext(b,B)}let Le,w,y,j,rt,pt,bt,Dt,gt,yt,wt,jt,Pt,Ot,Vt,ee,le,H,Ct,xt,Ut,Gt,Et;try{const b={alpha:!0,depth:u,stencil:f,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:S,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Xp}`),i.addEventListener("webglcontextlost",we,!1),i.addEventListener("webglcontextrestored",ce,!1),i.addEventListener("webglcontextcreationerror",$n,!1),G===null){const B="webgl2";if(G=nn(B,b),G===null)throw nn(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(b){throw i.removeEventListener("webglcontextlost",we,!1),i.removeEventListener("webglcontextrestored",ce,!1),i.removeEventListener("webglcontextcreationerror",$n,!1),Pe("WebGLRenderer: "+b.message),b}function Jt(){Le=new UA(G),Le.init(),Ut=new M3(G,Le),w=new yA(G,Le,e,Ut),y=new x3(G,Le),w.reversedDepthBuffer&&v&&y.buffers.depth.setReversed(!0),ct=G.createFramebuffer(),J=G.createFramebuffer(),$=G.createFramebuffer(),j=new OA(G),rt=new r3,pt=new y3(G,Le,y,rt,w,Ut,j),bt=new DA(V),Dt=new IT(G),Gt=new SA(G,Dt),gt=new NA(G,Dt,j,Gt),yt=new IA(G,gt,Dt,Gt,j),H=new PA(G,w,pt),Vt=new MA(rt),wt=new s3(V,bt,Le,w,Gt,Vt),jt=new C3(V,rt),Pt=new l3,Ot=new p3(Le),le=new vA(V,bt,y,yt,R,p),ee=new S3(V,yt,w),Et=new w3(G,j,w,y),Ct=new xA(G,Le,j),xt=new LA(G,Le,j),j.programs=wt.programs,V.capabilities=w,V.extensions=Le,V.properties=rt,V.renderLists=Pt,V.shadowMap=ee,V.state=y,V.info=j}D!==fi&&(L=new BA(D,i.width,i.height,d,u,f));const Ht=new A3(V,G);this.xr=Ht,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const b=Le.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Le.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ht},this.setPixelRatio=function(b){b!==void 0&&(ht=b,this.setSize(At,Y,!1))},this.getSize=function(b){return b.set(At,Y)},this.setSize=function(b,B,ut=!0){if(Ht.isPresenting){se("WebGLRenderer: Can't change size while VR device is presenting.");return}At=b,Y=B,i.width=Math.floor(b*ht),i.height=Math.floor(B*ht),ut===!0&&(i.style.width=b+"px",i.style.height=B+"px"),L!==null&&L.setSize(i.width,i.height),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(At*ht,Y*ht).floor()},this.setDrawingBufferSize=function(b,B,ut){At=b,Y=B,ht=ut,i.width=Math.floor(b*ut),i.height=Math.floor(B*ut),this.setViewport(0,0,b,B)},this.setEffects=function(b){if(D===fi){Pe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let B=0;B<b.length;B++)if(b[B].isOutputPass===!0){se("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(Mt)},this.getViewport=function(b){return b.copy(_t)},this.setViewport=function(b,B,ut,nt){b.isVector4?_t.set(b.x,b.y,b.z,b.w):_t.set(b,B,ut,nt),y.viewport(Mt.copy(_t).multiplyScalar(ht).round())},this.getScissor=function(b){return b.copy(Rt)},this.setScissor=function(b,B,ut,nt){b.isVector4?Rt.set(b.x,b.y,b.z,b.w):Rt.set(b,B,ut,nt),y.scissor(Qt.copy(Rt).multiplyScalar(ht).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(b){y.setScissorTest(Ge=b)},this.setOpaqueSort=function(b){Tt=b},this.setTransparentSort=function(b){It=b},this.getClearColor=function(b){return b.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,ut=!0){let nt=0;if(b){let it=!1;if(ft!==null){const zt=ft.texture.format;it=M.has(zt)}if(it){const zt=ft.texture.type,kt=x.has(zt),Nt=le.getClearColor(),Wt=le.getClearAlpha(),Zt=Nt.r,ae=Nt.g,fe=Nt.b;kt?(I[0]=Zt,I[1]=ae,I[2]=fe,I[3]=Wt,G.clearBufferuiv(G.COLOR,0,I)):(K[0]=Zt,K[1]=ae,K[2]=fe,K[3]=Wt,G.clearBufferiv(G.COLOR,0,K))}else nt|=G.COLOR_BUFFER_BIT}B&&(nt|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(nt|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&G.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),et=b},this.dispose=function(){i.removeEventListener("webglcontextlost",we,!1),i.removeEventListener("webglcontextrestored",ce,!1),i.removeEventListener("webglcontextcreationerror",$n,!1),le.dispose(),Pt.dispose(),Ot.dispose(),rt.dispose(),bt.dispose(),yt.dispose(),Gt.dispose(),Et.dispose(),wt.dispose(),Ht.dispose(),Ht.removeEventListener("sessionstart",Ms),Ht.removeEventListener("sessionend",Fa),ki.stop()};function we(b){b.preventDefault(),Av("WebGLRenderer: Context Lost."),W=!0}function ce(){Av("WebGLRenderer: Context Restored."),W=!1;const b=j.autoReset,B=ee.enabled,ut=ee.autoUpdate,nt=ee.needsUpdate,it=ee.type;Jt(),j.autoReset=b,ee.enabled=B,ee.autoUpdate=ut,ee.needsUpdate=nt,ee.type=it}function $n(b){Pe("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function di(b){const B=b.target;B.removeEventListener("dispose",di),Xc(B)}function Xc(b){nr(b),rt.remove(b)}function nr(b){const B=rt.get(b).programs;B!==void 0&&(B.forEach(function(ut){wt.releaseProgram(ut)}),b.isShaderMaterial&&wt.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,ut,nt,it,zt){B===null&&(B=hn);const kt=it.isMesh&&it.matrixWorld.determinantAffine()<0,Nt=yo(b,B,ut,nt,it);y.setMaterial(nt,kt);let Wt=ut.index,Zt=1;if(nt.wireframe===!0){if(Wt=gt.getWireframeAttribute(ut),Wt===void 0)return;Zt=2}const ae=ut.drawRange,fe=ut.attributes.position;let Xt=ae.start*Zt,Ee=(ae.start+ae.count)*Zt;zt!==null&&(Xt=Math.max(Xt,zt.start*Zt),Ee=Math.min(Ee,(zt.start+zt.count)*Zt)),Wt!==null?(Xt=Math.max(Xt,0),Ee=Math.min(Ee,Wt.count)):fe!=null&&(Xt=Math.max(Xt,0),Ee=Math.min(Ee,fe.count));const ve=Ee-Xt;if(ve<0||ve===1/0)return;Gt.setup(it,nt,Nt,ut,Wt);let Ze,Be=Ct;if(Wt!==null&&(Ze=Dt.get(Wt),Be=xt,Be.setIndex(Ze)),it.isMesh)nt.wireframe===!0?(y.setLineWidth(nt.wireframeLinewidth*tn()),Be.setMode(G.LINES)):Be.setMode(G.TRIANGLES);else if(it.isLine){let vn=nt.linewidth;vn===void 0&&(vn=1),y.setLineWidth(vn*tn()),it.isLineSegments?Be.setMode(G.LINES):it.isLineLoop?Be.setMode(G.LINE_LOOP):Be.setMode(G.LINE_STRIP)}else it.isPoints?Be.setMode(G.POINTS):it.isSprite&&Be.setMode(G.TRIANGLES);if(it.isBatchedMesh)if(Le.get("WEBGL_multi_draw"))Be.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const vn=it._multiDrawStarts,Bt=it._multiDrawCounts,sn=it._multiDrawCount,De=Wt?Dt.get(Wt).bytesPerElement:1,Bn=rt.get(nt).currentProgram.getUniforms();for(let ti=0;ti<sn;ti++)Bn.setValue(G,"_gl_DrawID",ti),Be.render(vn[ti]/De,Bt[ti])}else if(it.isInstancedMesh)Be.renderInstances(Xt,ve,it.count);else if(ut.isInstancedBufferGeometry){const vn=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Bt=Math.min(ut.instanceCount,vn);Be.renderInstances(Xt,ve,Bt)}else Be.render(Xt,ve)};function ys(b,B,ut,nt){et!==null&&b.isNodeMaterial&&et.setObject(nt,b),_e===!0&&Vt.setState(b,ut,!1),b.transparent===!0&&b.side===La&&b.forceSinglePass===!1?(b.side=jn,b.needsUpdate=!0,Es(b,B,nt),b.side=js,b.needsUpdate=!0,Es(b,B,nt),b.side=La):Es(b,B,nt)}this.compile=function(b,B,ut=null){ut===null&&(ut=b),et!==null&&et.renderStart(b,B,ut),N=Ot.get(ut),N.init(B),T.push(N),ut.traverseVisible(function(it){it.isLight&&it.layers.test(B.layers)&&(N.pushLight(it),it.castShadow&&N.pushShadow(it))}),b!==ut&&b.traverseVisible(function(it){it.isLight&&it.layers.test(B.layers)&&(N.pushLight(it),it.castShadow&&N.pushShadow(it))}),N.setupLights(),et!==null&&et.updateLights(N.state.lightsArray),Me=this.localClippingEnabled,_e=Vt.init(this.clippingPlanes,Me),_e===!0&&Vt.setGlobalState(this.clippingPlanes,B),et!==null&&ee.render(N.state.shadowsArray,ut,B);const nt=new Set;return b.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const zt=it.material;if(zt)if(Array.isArray(zt))for(let kt=0;kt<zt.length;kt++){const Nt=zt[kt];ys(Nt,ut,B,it),nt.add(Nt)}else ys(zt,ut,B,it),nt.add(zt)}),N=T.pop(),et!==null&&et.renderEnd(),nt},this.compileAsync=function(b,B,ut=null){const nt=this.compile(b,B,ut);return new Promise(it=>{function zt(){if(nt.forEach(function(kt){const Wt=rt.get(kt).currentProgram;(Wt===void 0||Wt.isReady())&&nt.delete(kt)}),nt.size===0){it(b);return}setTimeout(zt,10)}Le.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let Ba=null;function ha(b){Ba&&Ba(b)}function Ms(){ki.stop()}function Fa(){ki.start()}const ki=new JS;ki.setAnimationLoop(ha),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(b){Ba=b,Ht.setAnimationLoop(b),b===null?ki.stop():ki.start()},Ht.addEventListener("sessionstart",Ms),Ht.addEventListener("sessionend",Fa),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){Pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;et!==null&&et.renderStart(b,B);const ut=Ht.enabled===!0&&Ht.isPresenting===!0,nt=L!==null&&(ft===null||ut)&&L.begin(V,ft);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ht.enabled===!0&&Ht.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(Ht.cameraAutoUpdate===!0&&Ht.updateCamera(B),B=Ht.getCamera()),b.isScene===!0&&b.onBeforeRender(V,b,B,ft),N=Ot.get(b,T.length),N.init(B),N.state.textureUnits=pt.getTextureUnits(),T.push(N),te.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),me.setFromProjectionMatrix(te,oa,B.reversedDepth),Me=this.localClippingEnabled,_e=Vt.init(this.clippingPlanes,Me),U=Pt.get(b,P.length),U.init(),P.push(U),Ht.enabled===!0&&Ht.isPresenting===!0){const kt=V.xr.getDepthSensingMesh();kt!==null&&go(kt,B,-1/0,V.sortObjects)}go(b,B,0,V.sortObjects),U.finish(),et!==null&&et.updateLights(N.state.lightsArray),V.sortObjects===!0&&U.sort(Tt,It),Oe=Ht.enabled===!1||Ht.isPresenting===!1||Ht.hasDepthSensing()===!1,Oe&&le.addToRenderList(U,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),_e===!0&&Vt.beginShadows();const it=N.state.shadowsArray;if(ee.render(it,b,B),_e===!0&&Vt.endShadows(),(nt&&L.hasRenderPass())===!1){const kt=U.opaque,Nt=U.transmissive;if(N.setupLights(),B.isArrayCamera){const Wt=B.cameras;if(Nt.length>0)for(let Zt=0,ae=Wt.length;Zt<ae;Zt++){const fe=Wt[Zt];ir(kt,Nt,b,fe)}Oe&&le.render(b);for(let Zt=0,ae=Wt.length;Zt<ae;Zt++){const fe=Wt[Zt];_o(U,b,fe,fe.viewport)}}else Nt.length>0&&ir(kt,Nt,b,B),Oe&&le.render(b),_o(U,b,B)}ft!==null&&X===0&&(pt.updateMultisampleRenderTarget(ft),pt.updateRenderTargetMipmap(ft)),nt&&L.end(V),b.isScene===!0&&b.onAfterRender(V,b,B),Gt.resetDefaultState(),ot=-1,dt=null,T.pop(),T.length>0?(N=T[T.length-1],pt.setTextureUnits(N.state.textureUnits),_e===!0&&Vt.setGlobalState(V.clippingPlanes,N.state.camera)):N=null,P.pop(),P.length>0?U=P[P.length-1]:U=null,et!==null&&et.renderEnd()};function go(b,B,ut,nt){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)ut=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLightProbeGrid)N.pushLightProbeGrid(b);else if(b.isLight)N.pushLight(b),b.castShadow&&N.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(me)){nt&&Ve.setFromMatrixPosition(b.matrixWorld).applyMatrix4(te);const kt=yt.update(b),Nt=b.material;Nt.visible&&U.push(b,kt,Nt,ut,Ve.z,null,B)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(me))){const kt=yt.update(b),Nt=b.material;if(nt&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ve.copy(b.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),Ve.copy(kt.boundingSphere.center)),Ve.applyMatrix4(b.matrixWorld).applyMatrix4(te)),Array.isArray(Nt)){const Wt=kt.groups;for(let Zt=0,ae=Wt.length;Zt<ae;Zt++){const fe=Wt[Zt],Xt=Nt[fe.materialIndex];Xt&&Xt.visible&&U.push(b,kt,Xt,ut,Ve.z,fe,B)}}else Nt.visible&&U.push(b,kt,Nt,ut,Ve.z,null,B)}}const zt=b.children;for(let kt=0,Nt=zt.length;kt<Nt;kt++)go(zt[kt],B,ut,nt)}function _o(b,B,ut,nt){const{opaque:it,transmissive:zt,transparent:kt}=b;N.setupLightsView(ut),_e===!0&&Vt.setGlobalState(V.clippingPlanes,ut),nt&&y.viewport(Mt.copy(nt)),it.length>0&&Xi(it,B,ut),zt.length>0&&Xi(zt,B,ut),kt.length>0&&Xi(kt,B,ut),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function ir(b,B,ut,nt){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[nt.id]===void 0){const Xt=Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[nt.id]=new Ci(1,1,{generateMipmaps:!0,type:Xt?wi:fi,minFilter:Qs,samples:Math.max(4,w.samples),stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ue.workingColorSpace})}const zt=N.state.transmissionRenderTarget[nt.id],kt=nt.viewport||Mt;zt.setSize(kt.z*V.transmissionResolutionScale,kt.w*V.transmissionResolutionScale);const Nt=V.getRenderTarget(),Wt=V.getActiveCubeFace(),Zt=V.getActiveMipmapLevel();V.setRenderTarget(zt),V.getClearColor(z),mt=V.getClearAlpha(),mt<1&&V.setClearColor(16777215,.5),V.clear(),Oe&&le.render(ut);const ae=V.toneMapping;V.toneMapping=Gi;const fe=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),N.setupLightsView(nt),_e===!0&&Vt.setGlobalState(V.clippingPlanes,nt),Xi(b,ut,nt),pt.updateMultisampleRenderTarget(zt),pt.updateRenderTargetMipmap(zt),Le.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Ee=0,ve=B.length;Ee<ve;Ee++){const Ze=B[Ee],{object:Be,geometry:vn,material:Bt,group:sn}=Ze;if(Bt.side===La&&Be.layers.test(nt.layers)){const De=Bt.side;Bt.side=jn,Bt.needsUpdate=!0,Dl(Be,ut,nt,vn,Bt,sn),Bt.side=De,Bt.needsUpdate=!0,Xt=!0}}Xt===!0&&(pt.updateMultisampleRenderTarget(zt),pt.updateRenderTargetMipmap(zt))}V.setRenderTarget(Nt,Wt,Zt),V.setClearColor(z,mt),fe!==void 0&&(nt.viewport=fe),V.toneMapping=ae}function Xi(b,B,ut){const nt=B.isScene===!0?B.overrideMaterial:null;for(let it=0,zt=b.length;it<zt;it++){const kt=b[it],{object:Nt,geometry:Wt,group:Zt}=kt;let ae=kt.material;ae.allowOverride===!0&&nt!==null&&(ae=nt),Nt.layers.test(ut.layers)&&Dl(Nt,B,ut,Wt,ae,Zt)}}function Dl(b,B,ut,nt,it,zt){et!==null&&it.isNodeMaterial&&et.setObject(b,it),b.onBeforeRender(V,B,ut,nt,it,zt),b.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),it.onBeforeRender(V,B,ut,nt,b,zt),it.transparent===!0&&it.side===La&&it.forceSinglePass===!1?(it.side=jn,it.needsUpdate=!0,V.renderBufferDirect(ut,B,nt,it,b,zt),it.side=js,it.needsUpdate=!0,V.renderBufferDirect(ut,B,nt,it,b,zt),it.side=La):V.renderBufferDirect(ut,B,nt,it,b,zt),b.onAfterRender(V,B,ut,nt,it,zt)}function Es(b,B,ut){B.isScene!==!0&&(B=hn);const nt=rt.get(b),it=N.state.lights,zt=N.state.shadowsArray,kt=it.state.version,Nt=wt.getParameters(b,it.state,zt,B,ut,N.state.lightProbeGridArray),Wt=wt.getProgramCacheKey(Nt);let Zt=nt.programs;nt.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?B.environment:null,nt.fog=B.fog;const ae=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;nt.envMap=bt.get(b.envMap||nt.environment,ae),nt.envMapRotation=nt.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Zt===void 0&&(b.addEventListener("dispose",di),Zt=new Map,nt.programs=Zt);let fe=Zt.get(Wt);if(fe!==void 0){if(nt.currentProgram===fe&&nt.lightsStateVersion===kt)return So(b,Nt),fe}else Nt.uniforms=wt.getUniforms(b),et!==null&&b.isNodeMaterial&&et.build(b,ut,Nt),b.onBeforeCompile(Nt,V),fe=wt.acquireProgram(Nt,Wt),Zt.set(Wt,fe),nt.uniforms=Nt.uniforms;const Xt=nt.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Xt.clippingPlanes=Vt.uniform),So(b,Nt),nt.needsLights=Nl(b),nt.lightsStateVersion=kt,nt.needsLights&&(Xt.ambientLightColor.value=it.state.ambient,Xt.lightProbe.value=it.state.probe,Xt.sunLights.value=it.state.sun,Xt.sunLightShadows.value=it.state.sunShadow,Xt.directionalLights.value=it.state.directional,Xt.directionalLightShadows.value=it.state.directionalShadow,Xt.spotLights.value=it.state.spot,Xt.spotLightShadows.value=it.state.spotShadow,Xt.rectAreaLights.value=it.state.rectArea,Xt.ltc_1.value=it.state.rectAreaLTC1,Xt.ltc_2.value=it.state.rectAreaLTC2,Xt.pointLights.value=it.state.point,Xt.pointLightShadows.value=it.state.pointShadow,Xt.hemisphereLights.value=it.state.hemi,Xt.sunShadowMatrix.value=it.state.sunShadowMatrix,Xt.sunShadowCascade.value=it.state.sunShadowCascade,Xt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,Xt.spotLightMatrix.value=it.state.spotLightMatrix,Xt.spotLightMap.value=it.state.spotLightMap,Xt.pointShadowMatrix.value=it.state.pointShadowMatrix),nt.lightProbeGrid=N.state.lightProbeGridArray.length>0,nt.currentProgram=fe,nt.uniformsList=null,fe}function vo(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=Uc.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function So(b,B){const ut=rt.get(b);ut.outputColorSpace=B.outputColorSpace,ut.batching=B.batching,ut.batchingColor=B.batchingColor,ut.instancing=B.instancing,ut.instancingColor=B.instancingColor,ut.instancingMorph=B.instancingMorph,ut.skinning=B.skinning,ut.morphTargets=B.morphTargets,ut.morphNormals=B.morphNormals,ut.morphColors=B.morphColors,ut.morphTargetsCount=B.morphTargetsCount,ut.numClippingPlanes=B.numClippingPlanes,ut.numIntersection=B.numClipIntersection,ut.vertexAlphas=B.vertexAlphas,ut.vertexTangents=B.vertexTangents,ut.toneMapping=B.toneMapping}function xo(b,B){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;C.setFromMatrixPosition(B.matrixWorld);for(let ut=0,nt=b.length;ut<nt;ut++){const it=b[ut];if(it.texture!==null&&it.boundingBox.containsPoint(C))return it}return null}function yo(b,B,ut,nt,it){B.isScene!==!0&&(B=hn),pt.resetTextureUnits();const zt=B.fog,kt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?B.environment:null,Nt=ft===null?V.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:Ue.workingColorSpace,Wt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,Zt=bt.get(nt.envMap||kt,Wt),ae=nt.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,fe=!!ut.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Xt=!!ut.morphAttributes.position,Ee=!!ut.morphAttributes.normal,ve=!!ut.morphAttributes.color;let Ze=Gi;nt.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(Ze=V.toneMapping);const Be=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,vn=Be!==void 0?Be.length:0,Bt=rt.get(nt),sn=N.state.lights;if(_e===!0&&(Me===!0||b!==dt)){const Ae=b===dt&&nt.id===ot;Vt.setState(nt,b,Ae)}let De=!1;nt.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==sn.state.version||Bt.outputColorSpace!==Nt||it.isBatchedMesh&&Bt.batching===!1||!it.isBatchedMesh&&Bt.batching===!0||it.isBatchedMesh&&Bt.batchingColor===!0&&it._colorsTexture===null||it.isBatchedMesh&&Bt.batchingColor===!1&&it._colorsTexture!==null||it.isInstancedMesh&&Bt.instancing===!1||!it.isInstancedMesh&&Bt.instancing===!0||it.isSkinnedMesh&&Bt.skinning===!1||!it.isSkinnedMesh&&Bt.skinning===!0||it.isInstancedMesh&&Bt.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&Bt.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&Bt.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&Bt.instancingMorph===!1&&it.morphTexture!==null||Bt.envMap!==Zt||nt.fog===!0&&Bt.fog!==zt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==Vt.numPlanes||Bt.numIntersection!==Vt.numIntersection)||Bt.vertexAlphas!==ae||Bt.vertexTangents!==fe||Bt.morphTargets!==Xt||Bt.morphNormals!==Ee||Bt.morphColors!==ve||Bt.toneMapping!==Ze||Bt.morphTargetsCount!==vn||!!Bt.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(De=!0):(De=!0,Bt.__version=nt.version);let Bn=Bt.currentProgram;De===!0&&(Bn=Es(nt,B,it),et&&nt.isNodeMaterial&&et.onUpdateProgram(nt,Bn,Bt));let ti=!1,qi=!1,Se=!1;const Ie=Bn.getUniforms(),Je=Bt.uniforms;if(y.useProgram(Bn.program)&&(ti=!0,qi=!0,Se=!0),nt.id!==ot&&(ot=nt.id,qi=!0),Bt.needsLights){const Ae=xo(N.state.lightProbeGridArray,it);Bt.lightProbeGrid!==Ae&&(Bt.lightProbeGrid=Ae,qi=!0)}if(ti||dt!==b){y.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Ie.setValue(G,"projectionMatrix",b.projectionMatrix),Ie.setValue(G,"viewMatrix",b.matrixWorldInverse);const rn=Ie.map.cameraPosition;rn!==void 0&&rn.setValue(G,ne.setFromMatrixPosition(b.matrixWorld)),w.logarithmicDepthBuffer&&Ie.setValue(G,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Ie.setValue(G,"isOrthographic",b.isOrthographicCamera===!0),dt!==b&&(dt=b,qi=!0,Se=!0)}if(Bt.needsLights&&(sn.state.sunShadowMap.length>0&&Ie.setValue(G,"sunShadowMap",sn.state.sunShadowMap,pt),sn.state.directionalShadowMap.length>0&&Ie.setValue(G,"directionalShadowMap",sn.state.directionalShadowMap,pt),sn.state.spotShadowMap.length>0&&Ie.setValue(G,"spotShadowMap",sn.state.spotShadowMap,pt),sn.state.pointShadowMap.length>0&&Ie.setValue(G,"pointShadowMap",sn.state.pointShadowMap,pt)),it.isSkinnedMesh){Ie.setOptional(G,it,"bindMatrix"),Ie.setOptional(G,it,"bindMatrixInverse");const Ae=it.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),Ie.setValue(G,"boneTexture",Ae.boneTexture,pt))}it.isBatchedMesh&&(Ie.setOptional(G,it,"batchingTexture"),Ie.setValue(G,"batchingTexture",it._matricesTexture,pt),Ie.setOptional(G,it,"batchingIdTexture"),Ie.setValue(G,"batchingIdTexture",it._indirectTexture,pt),Ie.setOptional(G,it,"batchingColorTexture"),it._colorsTexture!==null&&Ie.setValue(G,"batchingColorTexture",it._colorsTexture,pt));const ei=ut.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&H.update(it,ut,Bn),(qi||Bt.receiveShadow!==it.receiveShadow)&&(Bt.receiveShadow=it.receiveShadow,Ie.setValue(G,"receiveShadow",it.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&B.environment!==null&&(Je.envMapIntensity.value=B.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=U3()),qi){if(Ie.setValue(G,"toneMappingExposure",V.toneMappingExposure),Bt.needsLights&&Ul(Je,Se),zt&&nt.fog===!0&&jt.refreshFogUniforms(Je,zt),jt.refreshMaterialUniforms(Je,nt,ht,Y,N.state.transmissionRenderTarget[b.id]),Bt.needsLights&&Bt.lightProbeGrid){const Ae=Bt.lightProbeGrid;Je.probesSH.value=Ae.texture,Je.probesMin.value.copy(Ae.boundingBox.min),Je.probesMax.value.copy(Ae.boundingBox.max),Je.probesResolution.value.copy(Ae.resolution)}Uc.upload(G,vo(Bt),Je,pt)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Uc.upload(G,vo(Bt),Je,pt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Ie.setValue(G,"center",it.center),Ie.setValue(G,"modelViewMatrix",it.modelViewMatrix),Ie.setValue(G,"normalMatrix",it.normalMatrix),Ie.setValue(G,"modelMatrix",it.matrixWorld),nt.uniformsGroups!==void 0){const Ae=nt.uniformsGroups;for(let rn=0,da=Ae.length;rn<da;rn++){const Ll=Ae[rn];Et.update(Ll,Bn),Et.bind(Ll,Bn)}}return Bn}function Ul(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.sunLights.needsUpdate=B,b.sunLightShadows.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function Nl(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ft},this.setRenderTargetTextures=function(b,B,ut){const nt=rt.get(b);nt.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),rt.get(b.texture).__webglTexture=B,rt.get(b.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:ut,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,B){const ut=rt.get(b);ut.__webglFramebuffer=B,ut.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,ut=0){ft=b,q=B,X=ut;let nt=null,it=!1,zt=!1;if(b){const Nt=rt.get(b);if(Nt.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(G.FRAMEBUFFER,Nt.__webglFramebuffer),Mt.copy(b.viewport),Qt.copy(b.scissor),Yt=b.scissorTest,y.viewport(Mt),y.scissor(Qt),y.setScissorTest(Yt),ot=-1;return}else if(Nt.__webglFramebuffer===void 0)pt.setupRenderTarget(b);else if(Nt.__hasExternalTextures)pt.rebindTextures(b,rt.get(b.texture).__webglTexture,rt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ae=b.depthTexture;if(Nt.__boundDepthTexture!==ae){if(ae!==null&&rt.has(ae)&&(b.width!==ae.image.width||b.height!==ae.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");pt.setupDepthRenderbuffer(b)}}const Wt=b.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(zt=!0);const Zt=rt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Zt[B])?nt=Zt[B][ut]:nt=Zt[B],it=!0):b.samples>0&&pt.useMultisampledRTT(b)===!1?nt=rt.get(b).__webglMultisampledFramebuffer:Array.isArray(Zt)?nt=Zt[ut]:nt=Zt,Mt.copy(b.viewport),Qt.copy(b.scissor),Yt=b.scissorTest}else Mt.copy(_t).multiplyScalar(ht).floor(),Qt.copy(Rt).multiplyScalar(ht).floor(),Yt=Ge;if(ut!==0&&(nt=ct),y.bindFramebuffer(G.FRAMEBUFFER,nt)&&y.drawBuffers(b,nt),y.viewport(Mt),y.scissor(Qt),y.setScissorTest(Yt),it){const Nt=rt.get(b.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+B,Nt.__webglTexture,ut)}else if(zt){const Nt=B;for(let Wt=0;Wt<b.textures.length;Wt++){const Zt=rt.get(b.textures[Wt]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Wt,Zt.__webglTexture,ut,Nt)}}else if(b!==null&&ut!==0){const Nt=rt.get(b.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Nt.__webglTexture,ut)}ot=-1};function pi(b){const B=rt.get(b);return(B.__readFormat!==b.format||B.__readType!==b.type)&&(B.__readFormat=b.format,B.__readType=b.type,B.__formatReadable=w.textureFormatReadable(b.format),B.__typeReadable=w.textureTypeReadable(b.type)),B}this.readRenderTargetPixels=function(b,B,ut,nt,it,zt,kt,Nt=0){if(!(b&&b.isWebGLRenderTarget)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Wt=rt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&kt!==void 0&&(Wt=Wt[kt]),Wt){y.bindFramebuffer(G.FRAMEBUFFER,Wt);try{const Zt=b.textures[Nt],ae=Zt.format,fe=Zt.type;b.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Nt);const Xt=pi(Zt);if(Xt.__formatReadable===!1){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Xt.__typeReadable===!1){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-nt&&ut>=0&&ut<=b.height-it&&G.readPixels(B,ut,nt,it,Ut.convert(ae),Ut.convert(fe),zt)}finally{const Zt=ft!==null?rt.get(ft).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,Zt)}}},this.readRenderTargetPixelsAsync=async function(b,B,ut,nt,it,zt,kt,Nt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Wt=rt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&kt!==void 0&&(Wt=Wt[kt]),Wt)if(B>=0&&B<=b.width-nt&&ut>=0&&ut<=b.height-it){y.bindFramebuffer(G.FRAMEBUFFER,Wt);const Zt=b.textures[Nt],ae=Zt.format,fe=Zt.type;b.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Nt);const Xt=pi(Zt);if(Xt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Xt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,Ee),G.bufferData(G.PIXEL_PACK_BUFFER,zt.byteLength,G.STREAM_READ),G.readPixels(B,ut,nt,it,Ut.convert(ae),Ut.convert(fe),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const ve=ft!==null?rt.get(ft).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,ve);const Ze=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await IE(G,Ze,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,Ee),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,zt),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(Ee),G.deleteSync(Ze),zt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,B=null,ut=0){const nt=Math.pow(2,-ut),it=Math.floor(b.image.width*nt),zt=Math.floor(b.image.height*nt),kt=B!==null?B.x:0,Nt=B!==null?B.y:0;pt.setTexture2D(b,0),G.copyTexSubImage2D(G.TEXTURE_2D,ut,0,0,kt,Nt,it,zt),y.unbindTexture()},this.copyTextureToTexture=function(b,B,ut=null,nt=null,it=0,zt=0){let kt,Nt,Wt,Zt,ae,fe,Xt,Ee,ve;const Ze=b.isCompressedTexture?b.mipmaps[zt]:b.image;if(ut!==null)kt=ut.max.x-ut.min.x,Nt=ut.max.y-ut.min.y,Wt=ut.isBox3?ut.max.z-ut.min.z:1,Zt=ut.min.x,ae=ut.min.y,fe=ut.isBox3?ut.min.z:0;else{const Je=Math.pow(2,-it);kt=Math.floor(Ze.width*Je),Nt=Math.floor(Ze.height*Je),b.isDataArrayTexture?Wt=Ze.depth:b.isData3DTexture?Wt=Math.floor(Ze.depth*Je):Wt=1,Zt=0,ae=0,fe=0}nt!==null?(Xt=nt.x,Ee=nt.y,ve=nt.z):(Xt=0,Ee=0,ve=0);const Be=Ut.convert(B.format),vn=Ut.convert(B.type);let Bt;B.isData3DTexture?(pt.setTexture3D(B,0),Bt=G.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(pt.setTexture2DArray(B,0),Bt=G.TEXTURE_2D_ARRAY):(pt.setTexture2D(B,0),Bt=G.TEXTURE_2D),y.activeTexture(G.TEXTURE0),y.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,B.flipY),y.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),y.pixelStorei(G.UNPACK_ALIGNMENT,B.unpackAlignment);const sn=y.getParameter(G.UNPACK_ROW_LENGTH),De=y.getParameter(G.UNPACK_IMAGE_HEIGHT),Bn=y.getParameter(G.UNPACK_SKIP_PIXELS),ti=y.getParameter(G.UNPACK_SKIP_ROWS),qi=y.getParameter(G.UNPACK_SKIP_IMAGES);y.pixelStorei(G.UNPACK_ROW_LENGTH,Ze.width),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Ze.height),y.pixelStorei(G.UNPACK_SKIP_PIXELS,Zt),y.pixelStorei(G.UNPACK_SKIP_ROWS,ae),y.pixelStorei(G.UNPACK_SKIP_IMAGES,fe);const Se=b.isDataArrayTexture||b.isData3DTexture,Ie=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){const Je=rt.get(b),ei=rt.get(B),Ae=rt.get(Je.__renderTarget),rn=rt.get(ei.__renderTarget);y.bindFramebuffer(G.READ_FRAMEBUFFER,Ae.__webglFramebuffer),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,rn.__webglFramebuffer);for(let da=0;da<Wt;da++)Se&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,rt.get(b).__webglTexture,it,fe+da),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,rt.get(B).__webglTexture,zt,ve+da)),G.blitFramebuffer(Zt,ae,kt,Nt,Xt,Ee,kt,Nt,G.DEPTH_BUFFER_BIT,G.NEAREST);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(it!==0||b.isRenderTargetTexture||rt.has(b)){const Je=rt.get(b),ei=rt.get(B);y.bindFramebuffer(G.READ_FRAMEBUFFER,J),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,$);for(let Ae=0;Ae<Wt;Ae++)Se?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Je.__webglTexture,it,fe+Ae):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Je.__webglTexture,it),Ie?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ei.__webglTexture,zt,ve+Ae):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ei.__webglTexture,zt),it!==0?G.blitFramebuffer(Zt,ae,kt,Nt,Xt,Ee,kt,Nt,G.COLOR_BUFFER_BIT,G.NEAREST):Ie?G.copyTexSubImage3D(Bt,zt,Xt,Ee,ve+Ae,Zt,ae,kt,Nt):G.copyTexSubImage2D(Bt,zt,Xt,Ee,Zt,ae,kt,Nt);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Ie?b.isDataTexture||b.isData3DTexture?G.texSubImage3D(Bt,zt,Xt,Ee,ve,kt,Nt,Wt,Be,vn,Ze.data):B.isCompressedArrayTexture?G.compressedTexSubImage3D(Bt,zt,Xt,Ee,ve,kt,Nt,Wt,Be,Ze.data):G.texSubImage3D(Bt,zt,Xt,Ee,ve,kt,Nt,Wt,Be,vn,Ze):b.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,zt,Xt,Ee,kt,Nt,Be,vn,Ze.data):b.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,zt,Xt,Ee,Ze.width,Ze.height,Be,Ze.data):G.texSubImage2D(G.TEXTURE_2D,zt,Xt,Ee,kt,Nt,Be,vn,Ze);y.pixelStorei(G.UNPACK_ROW_LENGTH,sn),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,De),y.pixelStorei(G.UNPACK_SKIP_PIXELS,Bn),y.pixelStorei(G.UNPACK_SKIP_ROWS,ti),y.pixelStorei(G.UNPACK_SKIP_IMAGES,qi),zt===0&&B.generateMipmaps&&G.generateMipmap(Bt),y.unbindTexture()},this.initRenderTarget=function(b){rt.get(b).__webglFramebuffer===void 0&&pt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?pt.setTextureCube(b,0):b.isData3DTexture?pt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?pt.setTexture2DArray(b,0):pt.setTexture2D(b,0),y.unbindTexture()},this.resetState=function(){q=0,X=0,ft=null,y.reset(),Gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ue._getUnpackColorSpace()}}const pS={type:"change"},im={type:"start"},sx={type:"end"},yc=new kS,mS=new Na,L3=Math.cos(70*Ks.DEG2RAD),xn=new st,Jn=2*Math.PI,Ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},jd=1e-6;class O3 extends OT{constructor(e,i=null){super(e,i),this.state=Ye.NONE,this.target=new st,this.cursor=new st,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:oo.ROTATE,MIDDLE:oo.DOLLY,RIGHT:oo.PAN},this.touches={ONE:so.ROTATE,TWO:so.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new st,this._lastQuaternion=new Ss,this._lastTargetPosition=new st,this._quat=new Ss().setFromUnitVectors(e.up,new st(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hp,this._sphericalDelta=new Hp,this._scale=1,this._panOffset=new st,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new st,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=I3.bind(this),this._onPointerDown=P3.bind(this),this._onPointerUp=z3.bind(this),this._onContextMenu=X3.bind(this),this._onMouseWheel=H3.bind(this),this._onKeyDown=G3.bind(this),this._onTouchStart=V3.bind(this),this._onTouchMove=k3.bind(this),this._onMouseDown=B3.bind(this),this._onMouseMove=F3.bind(this),this._interceptControlDown=q3.bind(this),this._interceptControlUp=W3.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ye.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pS),this.update(),this.state=Ye.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;xn.copy(i).sub(this.target),xn.applyQuaternion(this._quat),this._spherical.setFromVector3(xn),this.autoRotate&&this.state===Ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,u=this.maxAzimuthAngle;isFinite(s)&&isFinite(u)&&(s<-Math.PI?s+=Jn:s>Math.PI&&(s-=Jn),u<-Math.PI?u+=Jn:u>Math.PI&&(u-=Jn),s<=u?this._spherical.theta=Math.max(s,Math.min(u,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+u)/2?Math.max(s,this._spherical.theta):Math.min(u,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(xn.setFromSpherical(this._spherical),xn.applyQuaternion(this._quatInverse),i.copy(this.target).add(xn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=xn.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const d=new st(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const m=new st(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),h=xn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(yc.origin.copy(this.object.position),yc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yc.direction))<L3?this.object.lookAt(this.target):(mS.setFromNormalAndCoplanarPoint(this.object.up,this.target),yc.intersectPlane(mS,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>jd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>jd||this._lastTargetPosition.distanceToSquared(this.target)>jd?(this.dispatchEvent(pS),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Jn/60*this.autoRotateSpeed*e:Jn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){xn.setFromMatrixColumn(i,0),xn.multiplyScalar(-e),this._panOffset.add(xn)}_panUp(e,i){this.screenSpacePanning===!0?xn.setFromMatrixColumn(i,1):(xn.setFromMatrixColumn(i,0),xn.crossVectors(this.object.up,xn)),xn.multiplyScalar(e),this._panOffset.add(xn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const u=this.object.position;xn.copy(u).sub(this.target);let f=xn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/s.clientHeight,this.object.matrix),this._panUp(2*i*f/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),u=e-s.left,f=i-s.top,h=s.width,d=s.height;this._mouse.x=u/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Jn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Jn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._rotateStart.set(s,u)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panStart.set(s,u)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(s*s+u*u);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),u=.5*(e.pageX+s.x),f=.5*(e.pageY+s.y);this._rotateEnd.set(u,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Jn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Jn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panEnd.set(s,u)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(s*s+u*u);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new re,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function P3(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function I3(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function z3(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sx),this.state=Ye.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function B3(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case oo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Ye.DOLLY;break;case oo.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ye.ROTATE}break;case oo.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ye.PAN}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(im)}function F3(o){switch(this.state){case Ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function H3(o){this.enabled===!1||this.enableZoom===!1||this.state!==Ye.NONE||(o.preventDefault(),this.dispatchEvent(im),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(sx))}function G3(o){this.enabled!==!1&&this._handleKeyDown(o)}function V3(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case so.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Ye.TOUCH_ROTATE;break;case so.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Ye.TOUCH_PAN;break;default:this.state=Ye.NONE}break;case 2:switch(this.touches.TWO){case so.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Ye.TOUCH_DOLLY_PAN;break;case so.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Ye.TOUCH_DOLLY_ROTATE;break;default:this.state=Ye.NONE}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(im)}function k3(o){switch(this._trackPointer(o),this.state){case Ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Ye.NONE}}function X3(o){this.enabled!==!1&&o.preventDefault()}function q3(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function W3(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const am=[{id:0,name:"赤道",en:"Equator",fov:46,distance:14.5,azimuth:24,polar:72},{id:1,name:"天顶",en:"Zenith",fov:55,distance:22,azimuth:36,polar:8},{id:2,name:"临边",en:"Limb",fov:32,distance:9,azimuth:206,polar:78},{id:3,name:"远眺",en:"Approach",fov:68,distance:36,azimuth:132,polar:54}],vs={standard:{label:"标准",steps:150,crossings:3,stepScale:1.18,scale:.58,dpr:1,bloomPasses:2,bloomTaps:5},high:{label:"高",steps:230,crossings:4,stepScale:.9,scale:.78,dpr:1.35,bloomPasses:4,bloomTaps:9},cinematic:{label:"电影",steps:360,crossings:6,stepScale:.68,scale:1,dpr:1.75,bloomPasses:6,bloomTaps:13}},Mc=["standard","high","cinematic"],$d=[{id:0,name:"最终合成",detail:"测地线辐射、Bloom 与 ACES"},{id:1,name:"光线步进",detail:"步数与终止：视界为红，步数上限为黄，逃逸为热力色"},{id:2,name:"事件视界",detail:"落入视界为白，临界光子轨道附近的逃逸线为青"},{id:3,name:"盘面交次",detail:"沿测地线的盘面穿越阶次：一次红、二次绿、三次蓝"},{id:4,name:"红移 / Doppler",detail:"盘面 g 因子，接近侧偏蓝，远离侧偏红"},{id:5,name:"透镜坐标",detail:"偏折后的出射方向，视界内为黑"},{id:6,name:"星空",detail:"经透镜映射的程序化恒星"},{id:7,name:"银河",detail:"经透镜映射的程序化银河"},{id:8,name:"盘面辐射",detail:"仅吸积盘交点，无天空与后处理"},{id:9,name:"后处理前 HDR",detail:"线性亮度的对数伪色，取 Bloom 与色调映射之前"}],Ec=am[0],rx={fov:Ec.fov,distance:Ec.distance,azimuth:Ec.azimuth,polar:Ec.polar,timeScale:1,diskInner:3.05,diskOuter:12,diskThickness:.2,diskTemperature:8800,diskEmission:1.35,orbitalSpeed:1,turbulence:.58,turbulenceSpeed:.7,starDensity:.78,galaxy:1.15,bloomStrength:.16,bloomThreshold:2.4,exposure:-1.05,vignette:.36,grain:.055,aberration:.14},kc=[{key:"fov",label:"视场角",min:20,max:90,step:.1,digits:1,unit:"°",group:"相机",camera:!0},{key:"distance",label:"相机距离",min:5.5,max:64,step:.1,digits:2,unit:"rs",group:"相机",camera:!0},{key:"azimuth",label:"方位角",min:0,max:360,step:.1,digits:1,unit:"°",group:"相机",camera:!0},{key:"polar",label:"俯仰角",min:4,max:176,step:.1,digits:1,unit:"°",group:"相机",camera:!0},{key:"timeScale",label:"时间倍率",min:0,max:4,step:.01,digits:2,unit:"×",group:"相机"},{key:"diskInner",label:"盘内半径",min:1.7,max:8,step:.01,digits:2,unit:"rs",group:"吸积盘"},{key:"diskOuter",label:"盘外半径",min:5,max:28,step:.05,digits:2,unit:"rs",group:"吸积盘"},{key:"diskThickness",label:"盘半厚度",min:.01,max:1.4,step:.01,digits:2,unit:"rs",group:"吸积盘"},{key:"diskTemperature",label:"盘温度",min:2500,max:14e3,step:10,digits:0,unit:"K",group:"吸积盘"},{key:"diskEmission",label:"盘发射强度",min:.15,max:5,step:.01,digits:2,group:"吸积盘"},{key:"orbitalSpeed",label:"轨道速度",min:0,max:1.75,step:.01,digits:2,unit:"×",group:"吸积盘"},{key:"turbulence",label:"湍流幅度",min:0,max:1,step:.01,digits:2,group:"吸积盘"},{key:"turbulenceSpeed",label:"湍流速度",min:0,max:3,step:.01,digits:2,group:"吸积盘"},{key:"starDensity",label:"恒星密度",min:0,max:1,step:.01,digits:2,group:"背景"},{key:"galaxy",label:"银河亮度",min:0,max:2,step:.01,digits:2,group:"背景"},{key:"bloomStrength",label:"Bloom 强度",min:0,max:2,step:.01,digits:2,group:"画面"},{key:"bloomThreshold",label:"Bloom 阈值",min:.15,max:4,step:.01,digits:2,group:"画面"},{key:"exposure",label:"曝光",min:-2.5,max:2.5,step:.01,digits:2,unit:"EV",group:"画面"},{key:"vignette",label:"暗角",min:0,max:1,step:.01,digits:2,group:"画面"},{key:"grain",label:"胶片颗粒",min:0,max:1,step:.01,digits:2,group:"画面"},{key:"aberration",label:"色散",min:0,max:1,step:.01,digits:2,group:"画面"}];new Set(kc.filter(o=>o.camera).map(o=>o.key));function ox(){return typeof window<"u"&&window.innerWidth<780?"standard":"high"}function lx(){return!(typeof window<"u"&&window.innerWidth<780)}function zc(o){const e=am[o];return{preset:o,playing:!1,params:{fov:e.fov,distance:e.distance,azimuth:e.azimuth,polar:e.polar}}}const Y3=`
varying vec2 vUv;
void main() {
  vec2 p = position.xy;
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`,Z3=`
varying vec2 vUv;

uniform vec2 uResolution;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uFov;
uniform float uTime;
uniform int uMaxSteps;
uniform int uMaxCrossings;
uniform float uStepScale;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskH;
uniform float uTemp;
uniform float uEmit;
uniform float uOrbital;
uniform float uTurbAmp;
uniform float uTurbSpeed;
uniform float uStarDensity;
uniform float uGalaxy;
uniform int uDebug;

// Schwarzschild null geodesics in the areal-radius Cartesian embedding.
// rs = 2M = 1. The spatial orbit equation is
//   d²u/dφ² + u = (3 rs / 2) u²,  u = 1/r.
// Binet's formula turns that into the curvature acceleration
//   d²x/dλ² = -(3 rs / 2) |x × dx/dλ|² x / |x|⁵.
// State per pixel: position x, velocity v = dx/dλ, conserved L² = |x × v|².
// Integrated with RK4. Terminate at the event horizon r <= rs, or when the
// ray is outbound past the escape radius. Disk hits are analytic segment tests
// against the equatorial slab, accumulated front-to-back in path order.
const float RS = 1.0;
const float MASS = 0.5;
const float PHOTON_R = 1.5;
const float ESCAPE_R = 52.0;
const int STEP_CAP = 360;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    sum += amp * vnoise(p);
    p = p * 2.03 + vec2(13.1, 7.7);
    amp *= 0.5;
  }
  return sum;
}

vec3 schwarzschildAcceleration(vec3 x, float h2) {
  float r2 = max(dot(x, x), 1.0e-4);
  float r = sqrt(r2);
  float invR5 = 1.0 / (r2 * r2 * r);
  return (-1.5 * RS * h2 * invR5) * x;
}

void rk4(inout vec3 x, inout vec3 v, float h2, float dt) {
  vec3 a1 = schwarzschildAcceleration(x, h2);
  vec3 v2 = v + 0.5 * dt * a1;
  vec3 x2 = x + 0.5 * dt * v;
  vec3 a2 = schwarzschildAcceleration(x2, h2);
  vec3 v3 = v + 0.5 * dt * a2;
  vec3 x3 = x + 0.5 * dt * v2;
  vec3 a3 = schwarzschildAcceleration(x3, h2);
  vec3 v4 = v + dt * a3;
  vec3 x4 = x + dt * v3;
  vec3 a4 = schwarzschildAcceleration(x4, h2);
  x += (dt / 6.0) * (v + 2.0 * v2 + 2.0 * v3 + v4);
  v += (dt / 6.0) * (a1 + 2.0 * a2 + 2.0 * a3 + a4);
}

float affineStep(float r, float speed) {
  float dt = uStepScale * (0.02 + 0.034 * r);
  float ring = 1.0 - smoothstep(0.12, 1.25, abs(r - PHOTON_R));
  dt *= mix(1.0, 0.58, ring);
  float budget = 0.4 * max(r - RS, 0.055);
  dt = min(dt, budget / max(speed, 0.25));
  return clamp(dt, 0.0045, 0.72);
}

vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  float r;
  float g;
  float b;
  if (t <= 66.0) {
    r = 255.0;
    g = 99.4708025861 * log(t) - 161.1195681661;
  } else {
    r = 329.698727446 * pow(t - 60.0, -0.1332047592);
    g = 288.1221695283 * pow(t - 60.0, -0.0755148492);
  }
  if (t >= 66.0) b = 255.0;
  else if (t <= 19.0) b = 0.0;
  else b = 138.5177312231 * log(t - 10.0) - 305.0447927307;
  return clamp(vec3(r, g, b) / 255.0, 0.0, 1.0);
}

vec3 diskRadiance(vec3 p, vec3 vel, out float gOut) {
  float rho = max(length(p.xz), 0.25);
  float rin = max(uDiskInner, 1.2);
  float rout = max(uDiskOuter, rin + 0.5);
  float temperature = uTemp * pow(rin / rho, 0.75);
  float phi = atan(p.z, p.x);
  float flow = phi - uTime * uTurbSpeed / max(pow(rho, 1.15), 0.45);
  float turb = mix(fbm(vec2(rho * 0.52, flow * 1.65)), fbm(vec2(rho * 1.28 + 4.2, flow * 3.05)), 0.42);
  float modulate = mix(1.0, 0.32 + 1.4 * turb, clamp(uTurbAmp, 0.0, 1.0));
  temperature *= mix(0.7, 1.18, modulate);

  float beta = uOrbital * sqrt(MASS / rho) / sqrt(max(1.0 - RS / rho, 1.0e-3));
  beta = clamp(beta, 0.0, 0.88);
  float gamma = inversesqrt(max(1.0 - beta * beta, 1.0e-4));
  vec3 orbit = vec3(p.z, 0.0, -p.x) / rho;
  vec3 photon = -vel / max(length(vel), 1.0e-4);
  float grav = sqrt(max(1.0 - RS / rho, 0.0));
  float g = grav / (gamma * max(1.0 - beta * dot(orbit, photon), 0.05));
  gOut = g;

  float width = max(0.35, 0.14 * (rout - rin));
  float outer = 1.0 - smoothstep(rout - width, rout, rho);
  float inner = smoothstep(rin, rin + 0.05, rho);
  float energy = pow(max(g, 0.0), 3.0) * pow(max(temperature, 700.0) / 7200.0, 2.35) * uEmit * 0.34 * modulate;
  energy *= outer * inner * mix(0.82, 1.18, clamp(uDiskH / 0.2, 0.0, 2.0));
  return blackbody(clamp(temperature * g, 800.0, 40000.0)) * energy;
}

bool diskIntersection(vec3 a, vec3 b, float halfH, float rin, float rout, out vec3 hit, out float tHit) {
  float y0 = a.y;
  float dy = b.y - y0;
  if (abs(dy) > 1.0e-6) {
    float tRaw = -y0 / dy;
    if (tRaw >= 0.0 && tRaw <= 1.0) {
      vec3 plane = mix(a, b, tRaw);
      float rho = length(plane.xz);
      if (rho >= rin && rho <= rout && abs(plane.y) <= halfH + 1.0e-4) {
        hit = plane;
        tHit = tRaw;
        return true;
      }
    }
  }

  float t0 = 0.0;
  float t1 = 1.0;
  if (abs(dy) > 1.0e-6) {
    float ta = (-halfH - y0) / dy;
    float tb = (halfH - y0) / dy;
    float enter = min(ta, tb);
    float exitT = max(ta, tb);
    if (exitT < 0.0 || enter > 1.0) return false;
    t0 = clamp(enter, 0.0, 1.0);
    t1 = clamp(exitT, 0.0, 1.0);
  } else if (abs(y0) > halfH) {
    return false;
  }
  if (t1 < t0) return false;

  for (int sampleIndex = 0; sampleIndex < 3; sampleIndex++) {
    float t = mix(t0, t1, float(sampleIndex) * 0.5);
    vec3 p = mix(a, b, t);
    float rho = length(p.xz);
    if (rho >= rin && rho <= rout) {
      hit = p;
      tHit = t;
      return true;
    }
  }
  return false;
}

vec3 starLayer(vec3 dir, float scale, float cutoff) {
  vec3 id = floor(dir * scale);
  vec3 f = fract(dir * scale) - 0.5;
  float h = hash13(id);
  if (h < cutoff) return vec3(0.0);
  vec3 jitter = vec3(hash13(id + 1.7), hash13(id + 2.3), hash13(id + 3.1)) - 0.5;
  float dist = length(f - jitter * 0.28);
  float core = pow(1.0 - smoothstep(0.0, 0.2, dist), 1.45);
  float tint = hash13(id + 5.1);
  vec3 color = mix(vec3(0.62, 0.76, 1.0), vec3(1.0, 0.74, 0.5), tint);
  float mag = mix(0.7, 5.5, pow(hash13(id + 8.4), 3.0));
  return color * core * mag;
}

vec3 starField(vec3 dir) {
  float density = clamp(uStarDensity, 0.0, 1.0);
  if (density <= 0.001) return vec3(0.0);
  vec3 stars = starLayer(dir, mix(14.0, 36.0, density), mix(0.972, 0.62, density));
  stars += starLayer(dir, mix(28.0, 70.0, density), mix(0.99, 0.78, density));
  float haze = fbm(dir.xy * 1.8 + dir.yz * 1.3);
  stars += vec3(0.07, 0.09, 0.13) * haze * density;
  return stars;
}

vec3 milkyWay(vec3 dir) {
  float gain = max(uGalaxy, 0.0);
  if (gain <= 0.001) return vec3(0.0);
  vec3 axis = normalize(vec3(0.62, 0.28, 0.73));
  float lat = dot(dir, axis);
  float band = exp(-pow(lat * 3.1, 2.0));
  float wide = exp(-pow(lat * 1.35, 2.0));
  float clouds = fbm(dir.xy * 2.1 + dir.yz * 1.4);
  float dust = fbm(dir.zx * 4.2 + clouds);
  vec3 cool = vec3(0.48, 0.62, 0.95);
  vec3 warm = vec3(0.78, 0.42, 0.2);
  vec3 color = mix(warm, cool, smoothstep(0.15, 0.8, dust));
  color *= band * (0.4 + 1.15 * clouds);
  color += cool * wide * 0.9;
  return color * gain * 1.35;
}

void main() {
  vec2 ndc = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float tanHalf = tan(radians(uFov) * 0.5);
  vec3 forward = normalize(uCamForward);
  vec3 right = normalize(uCamRight);
  vec3 up = normalize(uCamUp);
  vec3 dir = normalize(forward + ndc.x * tanHalf * aspect * right + ndc.y * tanHalf * up);

  vec3 x = uCamPos;
  vec3 v = dir;
  float h2 = dot(cross(x, v), cross(x, v));
  float rin = max(uDiskInner, 1.2);
  float rout = max(uDiskOuter, rin + 0.5);
  float halfH = max(uDiskH, 0.001);
  float rho0 = length(x.xz);
  bool inside = abs(x.y) <= halfH && rho0 >= rin && rho0 <= rout;

  vec3 radiance = vec3(0.0);
  float thru = 1.0;
  int crossings = 0;
  int steps = 0;
  bool horizon = false;
  bool escaped = false;
  float primaryG = 1.0;
  float minR = length(x);

  for (int i = 0; i < STEP_CAP; i++) {
    if (i >= uMaxSteps) break;
    float r = length(x);
    minR = min(minR, r);
    if (r <= RS * 1.012) {
      horizon = true;
      break;
    }
    if (r > ESCAPE_R && dot(x, v) > 0.0) {
      escaped = true;
      break;
    }

    float dt = affineStep(r, length(v));
    vec3 x0 = x;
    vec3 v0 = v;
    rk4(x, v, h2, dt);
    steps = i + 1;
    if (!(x.x == x.x) || !(v.x == v.x)) {
      horizon = true;
      break;
    }

    vec3 hit;
    float tHit;
    bool overlap = diskIntersection(x0, x, halfH, rin, rout, hit, tHit);
    if (overlap && !inside) {
      inside = true;
      crossings += 1;
      if (crossings <= uMaxCrossings) {
        float g;
        vec3 emit = diskRadiance(hit, mix(v0, v, tHit), g);
        if (crossings == 1) primaryG = g;
        radiance += thru * emit;
        thru *= 0.6;
      }
    } else if (!overlap) {
      inside = false;
    }

    if (length(x) <= RS) {
      horizon = true;
      break;
    }
  }

  if (!horizon && !escaped) {
    if (length(x) < 1.85 * RS) horizon = true;
    else escaped = true;
  }

  vec3 skyDir = normalize(v);
  vec3 stars = vec3(0.0);
  vec3 galaxy = vec3(0.0);
  vec3 diskOnly = radiance;
  if (!horizon) {
    stars = starField(skyDir);
    galaxy = milkyWay(skyDir);
    if (escaped) radiance += thru * (stars + galaxy);
  }
  radiance = min(radiance, vec3(18.0));

  vec3 display = radiance;
  if (uDebug == 1) {
    float heat = clamp(float(steps) / float(max(uMaxSteps, 1)), 0.0, 1.0);
    display = mix(vec3(0.03, 0.05, 0.14), vec3(0.95, 0.78, 0.28), heat);
    if (horizon) display = vec3(0.92, 0.1, 0.07);
    else if (!escaped) display = vec3(0.95, 0.78, 0.12);
  } else if (uDebug == 2) {
    display = vec3(0.0);
    if (horizon) display = vec3(1.0);
    else if (minR < PHOTON_R + 0.38) display = vec3(0.12, 0.86, 0.78);
  } else if (uDebug == 3) {
    if (crossings <= 0) display = vec3(0.025);
    else if (crossings == 1) display = vec3(0.92, 0.22, 0.14);
    else if (crossings == 2) display = vec3(0.12, 0.78, 0.38);
    else if (crossings == 3) display = vec3(0.22, 0.46, 0.96);
    else display = vec3(0.96, 0.88, 0.52);
  } else if (uDebug == 4) {
    if (crossings <= 0) display = vec3(0.04, 0.045, 0.05);
    else {
      float g = clamp(primaryG, 0.0, 2.4);
      vec3 rest = vec3(0.78, 0.74, 0.68);
      display = g < 1.0
        ? mix(vec3(0.62, 0.05, 0.04), rest, g)
        : mix(rest, vec3(0.45, 0.74, 1.0), clamp(g - 1.0, 0.0, 1.0));
    }
  } else if (uDebug == 5) {
    display = horizon ? vec3(0.0) : 0.5 + 0.5 * skyDir;
  } else if (uDebug == 6) {
    vec3 s = stars / (1.0 + stars);
    display = horizon ? vec3(0.0) : pow(max(s, 0.0), vec3(0.4545));
  } else if (uDebug == 7) {
    vec3 gcol = galaxy / (1.0 + galaxy);
    display = horizon ? vec3(0.0) : pow(max(gcol, 0.0), vec3(0.4545));
  } else if (uDebug == 8) {
    vec3 disk = diskOnly / (1.0 + diskOnly);
    display = pow(max(disk, 0.0), vec3(0.4545));
  } else if (uDebug == 9) {
    float y = dot(radiance, vec3(0.2126, 0.7152, 0.0722));
    float t = clamp(log(1.0 + y) / log(25.0), 0.0, 1.0);
    display = mix(vec3(0.02, 0.0, 0.05), vec3(0.95, 0.24, 0.06), smoothstep(0.0, 0.48, t));
    display = mix(display, vec3(1.0, 0.93, 0.78), smoothstep(0.48, 1.0, t));
  }

  gl_FragColor = vec4(display, 1.0);
}
`,K3=`
varying vec2 vUv;
uniform sampler2D uScene;
uniform float uExposure;
uniform float uThreshold;

void main() {
  vec3 color = texture2D(uScene, vUv).rgb * exp2(uExposure);
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float weight = smoothstep(uThreshold, uThreshold + 0.5, luma);
  gl_FragColor = vec4(color * weight, 1.0);
}
`,Q3=`
varying vec2 vUv;
uniform sampler2D uImage;
uniform vec2 uResolution;
uniform vec2 uDirection;
uniform int uTaps;

void main() {
  vec2 texel = uDirection / max(uResolution, vec2(1.0));
  vec3 acc = vec3(0.0);
  float wsum = 0.0;
  float sigma = 2.15;
  for (int i = 0; i < 13; i++) {
    if (i >= uTaps) break;
    float offset = float(i) - float(uTaps - 1) * 0.5;
    float w = exp(-0.5 * offset * offset / (sigma * sigma));
    acc += texture2D(uImage, vUv + texel * offset).rgb * w;
    wsum += w;
  }
  gl_FragColor = vec4(acc / max(wsum, 1.0e-4), 1.0);
}
`,J3=`
varying vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec2 uResolution;
uniform int uDebug;
uniform float uExposure;
uniform float uBloomStrength;
uniform float uVignette;
uniform float uGrain;
uniform float uAberration;
uniform float uTime;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 acesTonemap(vec3 x) {
  // Stephen Narkowicz fit of the ACES RRT + ODT.
  x = max(x, 0.0);
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 srgbEncode(vec3 color) {
  color = clamp(color, 0.0, 1.0);
  vec3 low = color * 12.92;
  vec3 high = 1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), color));
}

vec3 sampleHdr(vec2 uv) {
  vec2 coord = clamp(uv, 0.0, 1.0);
  vec3 scene = texture2D(uScene, coord).rgb * exp2(uExposure);
  vec3 bloom = texture2D(uBloom, coord).rgb * uBloomStrength;
  return scene + bloom;
}

void main() {
  if (uDebug != 0) {
    gl_FragColor = vec4(texture2D(uScene, vUv).rgb, 1.0);
    return;
  }

  vec2 radial = vUv - 0.5;
  vec2 offset = radial * uAberration * 0.02;
  vec3 color = vec3(
    sampleHdr(vUv + offset).r,
    sampleHdr(vUv).g,
    sampleHdr(vUv - offset).b
  );
  color = acesTonemap(color);
  vec2 p = vUv * 2.0 - 1.0;
  float radius = length(p * vec2(0.92, 1.0));
  float vig = 1.0 - smoothstep(0.32, 1.28, radius);
  color *= mix(1.0, vig, clamp(uVignette, 0.0, 1.0));
  color = srgbEncode(color);
  float grain = hash21(gl_FragCoord.xy + vec2(uTime * 13.1, uTime * 7.7)) - 0.5;
  color += grain * uGrain * 0.16;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;function j3(o,e){const i=Math.abs(o-e)%360;return Math.min(i,360-i)}function gS(){const o=new fa;return o.setAttribute("position",new la(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),o}function $3(o,e,i){const s=new Ci(o,e,{type:i,format:Ri,minFilter:Rn,magFilter:Rn,wrapS:Hi,wrapT:Hi,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});return s.texture.colorSpace=fo,s}function Tc(o,e){return new Vi({vertexShader:Y3,fragmentShader:o,uniforms:e,depthTest:!1,depthWrite:!1,toneMapped:!1,precision:"highp"})}class tC{constructor(e,i){this.canvas=e,this.store=i,this.ready=!1,this.disposed=!1,this.lost=!1,this.shaderFailed=!1,this.pointerDown=!1,this.wasPlaying=!1,this.azimuth=0,this.polarBase=70,this.simTime=i.getState().time,this.uiAccum=0,this.appliedQuality="",this.clock=new LT,this.spherical=new Hp,this.bufSize=new re,this.camera=new Ai(46,1,.1,200),this.camera.position.set(0,4,14),this.ortho=new nm(-1,1,1,-1,0,1),this.scene=new dT,this.floatType=wi}start(){const e=this.store.getState();this.renderer=new N3({canvas:this.canvas,antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=fo,this.renderer.toneMapping=Gi,this.renderer.setClearColor(0,1),this.renderer.debug.checkShaderErrors=!0,this.renderer.debug.onShaderError=(u,f,h,d)=>{const p=[u.getShaderInfoLog(h),u.getShaderInfoLog(d),u.getProgramInfoLog(f)].filter(Boolean).join(`
`).slice(0,2500);this.shaderFailed=!0,this.store.set({shaderError:p||"Shader failed to compile."},{source:"engine",persist:!1})};const i=this.renderer.getContext(),s=i.getExtension("EXT_color_buffer_half_float")||i.getExtension("EXT_color_buffer_float");this.floatType=s?wi:fi,this.controls=new O3(this.camera,this.canvas),this.controls.target.set(0,0,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enablePan=!1,this.controls.zoomToCursor=!1,this.controls.minDistance=5.5,this.controls.maxDistance=64,this.controls.minPolarAngle=Ks.degToRad(4),this.controls.maxPolarAngle=Ks.degToRad(176),this.controls.rotateSpeed=.55,this.controls.zoomSpeed=.65,this.onControlStart=()=>{this.pointerDown=!0,this.store.set({playing:!1,preset:null},{source:"controls",persist:!1})},this.onControlEnd=()=>{this.pointerDown=!1;const u=this.readCamera();this.store.set({playing:!1,preset:null,params:u},{source:"controls",persist:!0})},this.controls.addEventListener("start",this.onControlStart),this.controls.addEventListener("end",this.onControlEnd),this.onLost=u=>{u.preventDefault(),this.lost=!0,this.store.set({contextLost:!0},{source:"engine",persist:!1})},this.onRestored=()=>{this.shaderFailed=!1,this.rebuildGpu(),this.lost=!1,this.store.set({contextLost:!1,shaderError:""},{source:"engine",persist:!1}),this.resize(!0),this.syncUniforms(),this.renderPipeline(),this.markReady()},this.canvas.addEventListener("webglcontextlost",this.onLost,!1),this.canvas.addEventListener("webglcontextrestored",this.onRestored,!1),this.createMaterials(),this.mesh=new ca(gS(),this.rayMaterial),this.mesh.frustumCulled=!1,this.scene.add(this.mesh),this.unsubscribe=this.store.subscribe((u,f)=>this.onStore(u,f)),this.resizeObserver=new ResizeObserver(()=>this.resize(!1)),this.resizeObserver.observe(this.canvas),this.exposeApi(),this.azimuth=e.params.azimuth,this.polarBase=e.params.polar,this.writeCamera(e.params),this.controls.update(),this.clock.getDelta(),this.resize(!0),this.syncUniforms(),this.renderPipeline(),this.markReady(),this.frame=this.frame.bind(this),this.raf=requestAnimationFrame(this.frame)}createMaterials(){this.rayMaterial=Tc(Z3,{uResolution:{value:new re(2,2)},uCamPos:{value:new st},uCamRight:{value:new st(1,0,0)},uCamUp:{value:new st(0,1,0)},uCamForward:{value:new st(0,0,-1)},uFov:{value:46},uTime:{value:0},uMaxSteps:{value:230},uMaxCrossings:{value:4},uStepScale:{value:.9},uDiskInner:{value:3.05},uDiskOuter:{value:12},uDiskH:{value:.2},uTemp:{value:8800},uEmit:{value:1.35},uOrbital:{value:1},uTurbAmp:{value:.58},uTurbSpeed:{value:.7},uStarDensity:{value:.7},uGalaxy:{value:.85},uDebug:{value:0}}),this.rayMaterial.name="schwarzschild-geodesic",this.rayUniforms=this.rayMaterial.uniforms,this.extractMaterial=Tc(K3,{uScene:{value:null},uExposure:{value:.28},uThreshold:{value:1.2}}),this.extractUniforms=this.extractMaterial.uniforms,this.blurMaterial=Tc(Q3,{uImage:{value:null},uResolution:{value:new re(2,2)},uDirection:{value:new re(1,0)},uTaps:{value:9}}),this.blurUniforms=this.blurMaterial.uniforms,this.compMaterial=Tc(J3,{uScene:{value:null},uBloom:{value:null},uResolution:{value:new re(2,2)},uDebug:{value:0},uExposure:{value:.28},uBloomStrength:{value:.48},uVignette:{value:.36},uGrain:{value:.055},uAberration:{value:.14},uTime:{value:0}}),this.compUniforms=this.compMaterial.uniforms}rebuildGpu(){this.disposeTargets();for(const e of[this.rayMaterial,this.extractMaterial,this.blurMaterial,this.compMaterial])e?.dispose();this.mesh.geometry.dispose(),this.mesh.geometry=gS(),this.createMaterials(),this.mesh.material=this.rayMaterial,this.appliedQuality=""}resize(e){const i=this.canvas.clientWidth||window.innerWidth,s=this.canvas.clientHeight||window.innerHeight;if(i<2||s<2)return;const u=this.store.getState(),f=vs[u.quality]||vs.high,h=i<780,d=Math.min(window.devicePixelRatio||1,h?1.5:2);if(!e&&this.appliedQuality===u.quality&&this.cssW===i&&this.cssH===s&&this.displayDpr===d)return;this.appliedQuality=u.quality,this.cssW=i,this.cssH=s,this.displayDpr=d,this.renderer.setPixelRatio(d),this.renderer.setSize(i,s,!1),this.camera.aspect=i/s,this.camera.updateProjectionMatrix(),this.renderer.getDrawingBufferSize(this.bufSize),this.compUniforms.uResolution.value.copy(this.bufSize);const p=Math.min(window.devicePixelRatio||1,f.dpr);let m=Math.max(2,Math.floor(i*p*f.scale)),S=Math.max(2,Math.floor(s*p*f.scale));const _=h?65e4:14e5,v=m*S;if(v>_){const D=Math.sqrt(_/v);m=Math.max(2,Math.floor(m*D)),S=Math.max(2,Math.floor(S*D))}const E=Math.max(2,Math.floor(m/2)),R=Math.max(2,Math.floor(S/2));this.sceneRT=this.ensureTarget(this.sceneRT,m,S),this.bloomA=this.ensureTarget(this.bloomA,E,R),this.bloomB=this.ensureTarget(this.bloomB,E,R),this.rayUniforms.uResolution.value.set(m,S),this.blurUniforms.uResolution.value.set(E,R),this.extractUniforms.uScene.value=this.sceneRT.texture,this.compUniforms.uScene.value=this.sceneRT.texture,this.compUniforms.uBloom.value=this.bloomA.texture,this.bloomPasses=f.bloomPasses}ensureTarget(e,i,s){return e&&e.width===i&&e.height===s?e:(e&&e.dispose(),$3(i,s,this.floatType))}disposeTargets(){this.sceneRT?.dispose(),this.bloomA?.dispose(),this.bloomB?.dispose(),this.sceneRT=null,this.bloomA=null,this.bloomB=null}writeCamera(e){this.spherical.radius=e.distance,this.spherical.phi=Ks.degToRad(e.polar),this.spherical.theta=Ks.degToRad(e.azimuth),this.camera.position.setFromSpherical(this.spherical),this.camera.lookAt(this.controls?.target??new st),this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.azimuth=e.azimuth}readCamera(){this.spherical.setFromVector3(this.camera.position.clone().sub(this.controls.target));let e=Ks.radToDeg(this.spherical.theta);return e<0&&(e+=360),{distance:this.spherical.radius,azimuth:e,polar:Ks.radToDeg(this.spherical.phi)}}onStore(e,i){this.disposed||(i.syncTime&&(this.simTime=e.time),(i.camera||i.source==="reset")&&(this.writeCamera(e.params),this.polarBase=e.params.polar-Math.sin(this.simTime*.15)*3),e.quality!==this.appliedQuality&&this.resize(!0))}syncUniforms(){const e=this.store.getState(),i=e.params,s=vs[e.quality]||vs.high;this.camera.updateMatrixWorld(!0);const u=this.camera.matrixWorld.elements;this.rayUniforms.uCamPos.value.copy(this.camera.position),this.rayUniforms.uCamRight.value.set(u[0],u[1],u[2]),this.rayUniforms.uCamUp.value.set(u[4],u[5],u[6]),this.rayUniforms.uCamForward.value.set(-u[8],-u[9],-u[10]),this.rayUniforms.uFov.value=i.fov,this.rayUniforms.uTime.value=this.simTime,this.rayUniforms.uMaxSteps.value=s.steps,this.rayUniforms.uMaxCrossings.value=s.crossings,this.rayUniforms.uStepScale.value=s.stepScale,this.rayUniforms.uDiskInner.value=i.diskInner,this.rayUniforms.uDiskOuter.value=i.diskOuter,this.rayUniforms.uDiskH.value=i.diskThickness,this.rayUniforms.uTemp.value=i.diskTemperature,this.rayUniforms.uEmit.value=i.diskEmission,this.rayUniforms.uOrbital.value=i.orbitalSpeed,this.rayUniforms.uTurbAmp.value=i.turbulence,this.rayUniforms.uTurbSpeed.value=i.turbulenceSpeed,this.rayUniforms.uStarDensity.value=i.starDensity,this.rayUniforms.uGalaxy.value=i.galaxy,this.rayUniforms.uDebug.value=e.debug,this.extractUniforms.uExposure.value=i.exposure,this.extractUniforms.uThreshold.value=i.bloomThreshold,this.blurUniforms.uTaps.value=s.bloomTaps,this.bloomPasses=s.bloomPasses,this.compUniforms.uDebug.value=e.debug,this.compUniforms.uExposure.value=i.exposure,this.compUniforms.uBloomStrength.value=i.bloomStrength,this.compUniforms.uVignette.value=i.vignette,this.compUniforms.uGrain.value=i.grain,this.compUniforms.uAberration.value=i.aberration,this.compUniforms.uTime.value=this.simTime}renderPipeline(){if(!this.sceneRT)return;const e=this.store.getState().debug;if(this.mesh.material=this.rayMaterial,this.renderer.setRenderTarget(this.sceneRT),this.renderer.render(this.scene,this.ortho),e===0&&this.bloomA&&this.bloomB){this.mesh.material=this.extractMaterial,this.renderer.setRenderTarget(this.bloomA),this.renderer.render(this.scene,this.ortho);const i=this.bloomPasses||3;for(let s=0;s<i;s+=1)this.blurUniforms.uImage.value=this.bloomA.texture,this.blurUniforms.uDirection.value.set(1,0),this.mesh.material=this.blurMaterial,this.renderer.setRenderTarget(this.bloomB),this.renderer.render(this.scene,this.ortho),this.blurUniforms.uImage.value=this.bloomB.texture,this.blurUniforms.uDirection.value.set(0,1),this.renderer.setRenderTarget(this.bloomA),this.renderer.render(this.scene,this.ortho);this.compUniforms.uBloom.value=this.bloomA.texture}this.mesh.material=this.compMaterial,this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.ortho)}markReady(){this.ready||this.shaderFailed||this.disposed||this.lost||this.sceneRT&&(this.ready=!0,document.documentElement.dataset.gargantuaReady="true")}frame(){if(this.raf=requestAnimationFrame(this.frame),this.disposed||this.lost)return;const e=Math.min(.05,this.clock.getDelta()),i=this.store.getState();i.capture||(this.simTime+=e*i.params.timeScale);const s=i.playing&&!i.capture&&!this.pointerDown;if(s&&!this.wasPlaying&&(this.azimuth=i.params.azimuth,this.polarBase=i.params.polar-Math.sin(this.simTime*.15)*3),s){this.azimuth+=e*8*i.params.timeScale;const u=this.polarBase+Math.sin(this.simTime*.15)*3;this.writeCamera({...i.params,azimuth:this.azimuth,polar:u})}if(this.wasPlaying=s,this.controls.update(),!s){const u=this.readCamera(),f=i.params,h=Math.abs(u.distance-f.distance)>.02||Math.abs(u.polar-f.polar)>.05||j3(u.azimuth,f.azimuth)>.05,d=performance.now();h&&(!this.pointerDown||d-(this.lastHud||0)>60)&&(this.lastHud=d,this.store.set({params:{distance:u.distance,azimuth:u.azimuth,polar:u.polar}},{source:"controls",persist:!this.pointerDown}))}if(this.uiAccum+=e,s&&this.uiAccum>=.1){this.uiAccum=0;const u=this.readCamera();this.store.set({time:this.simTime,params:u},{source:"engine",persist:!1})}else!s&&this.uiAccum>=.2&&(this.uiAccum=0,this.store.set({time:this.simTime},{source:"engine",persist:!1}));this.syncUniforms(),this.renderPipeline(),this.markReady()}snapshot(){const e=this.store.getState();return{ready:this.ready,quality:e.quality,preset:e.preset,debug:e.debug,hud:e.hud?1:0,time:this.simTime,playing:!!e.playing,contextLost:!!e.contextLost,capture:!!e.capture,params:{...e.params}}}setQuality(e){if(this.disposed||typeof e!="string")return null;const i=e.trim().toLowerCase();return vs[i]?(this.store.set({quality:i},{source:"api",persist:!this.store.getState().capture}),this.snapshot()):null}setPreset(e){return this.disposed||!Number.isInteger(e)||e<0||e>3?null:(this.store.set(zc(e),{source:"api",persist:!this.store.getState().capture,camera:!0}),this.snapshot())}setDebug(e){return this.disposed||!Number.isInteger(e)||e<0||e>9?null:(this.store.set({debug:e},{source:"api",persist:!this.store.getState().capture}),this.snapshot())}setTime(e){return this.disposed||typeof e!="number"||!Number.isFinite(e)||e<0?null:(this.simTime=e,this.store.set({time:e},{source:"api",persist:!1,syncTime:!0}),this.snapshot())}exposeApi(){const e=this;window.__GARGANTUA__={get ready(){return e.ready},getState(){return e.snapshot()},setQuality(i){return e.setQuality(i)},setPreset(i){return e.setPreset(i)},setDebug(i){return e.setDebug(i)},setTime(i){return e.setTime(i)}}}dispose(){this.disposed=!0,this.ready=!1,cancelAnimationFrame(this.raf),this.unsubscribe?.(),this.resizeObserver?.disconnect(),this.controls?.removeEventListener("start",this.onControlStart),this.controls?.removeEventListener("end",this.onControlEnd),this.controls?.dispose(),this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored),this.disposeTargets(),this.mesh?.geometry?.dispose();for(const e of[this.rayMaterial,this.extractMaterial,this.blurMaterial,this.compMaterial])e?.dispose();this.renderer?.dispose(),delete document.documentElement.dataset.gargantuaReady,window.__GARGANTUA__&&delete window.__GARGANTUA__}}const ux="gargantua-state-v1",bc=Object.fromEntries(kc.map(o=>[o.key,o]));function tp(o,e,i){return Math.min(i,Math.max(e,o))}function eC(o){let e=o%360;return e<0&&(e+=360),e}function sm(o){const e={...rx};for(const i of kc){const s=Number(o?.[i.key]);Number.isFinite(s)&&(e[i.key]=i.key==="azimuth"?eC(s):tp(s,i.min,i.max))}return e.diskOuter<e.diskInner+.6&&(e.diskOuter=tp(e.diskInner+.6,bc.diskOuter.min,bc.diskOuter.max)),e.diskInner>e.diskOuter-.6&&(e.diskInner=tp(e.diskOuter-.6,bc.diskInner.min,bc.diskInner.max)),e}function cx(){return{quality:ox(),debug:0,hud:lx(),preset:0,playing:!0,capture:!1,time:0,captureTime:0,contextLost:!1,shaderError:"",params:{...rx}}}function _S(o,e,i){if(typeof o!="string"||!/^-?\d+$/.test(o))return null;const s=Number(o);return!Number.isInteger(s)||s<e||s>i?null:s}function nC(){try{const o=localStorage.getItem(ux);if(!o)return null;const e=JSON.parse(o);if(!e||e.v!==1||!e.params)return null;const i=["standard","high","cinematic"].includes(e.quality)?e.quality:null,s=Number.isInteger(e.debug)&&e.debug>=0&&e.debug<=9?e.debug:0,u=e.preset===null?null:Number.isInteger(e.preset)&&e.preset>=0&&e.preset<=3?e.preset:0;return{quality:i,debug:s,hud:!!e.hud,preset:u,playing:!!e.playing,params:sm(e.params)}}catch{return null}}function iC(o,e){if(e.has("quality")){const i=(e.get("quality")||"").trim().toLowerCase();o.quality=["standard","high","cinematic"].includes(i)?i:"high"}if(e.has("preset")){const i=_S(e.get("preset")??"",0,3),s=zc(i===null?0:i);o.preset=s.preset,o.playing=!1,o.params={...o.params,...s.params}}if(e.has("debug")){const i=_S(e.get("debug")??"",0,9);o.debug=i===null?0:i}if(e.has("hud")){const i=e.get("hud");o.hud=i!=="0"}if(e.has("time")){const i=Number(e.get("time"));o.time=Number.isFinite(i)&&i>=0?i:0}}function aC(){const o=new URLSearchParams(window.location.search),e=o.get("capture")==="1",i=cx();if(i.capture=e,!e){const s=nC();s&&(s.quality&&(i.quality=s.quality),i.debug=s.debug,i.hud=s.hud,i.preset=s.preset,i.playing=s.playing,i.params=s.params)}return iC(i,o),(e||o.has("preset"))&&(i.playing=!1),i.captureTime=i.time,i.params=sm(i.params),i}function vS(o){const e={v:1,quality:o.quality,debug:o.debug,hud:o.hud,preset:o.preset,playing:o.playing,params:o.params};try{localStorage.setItem(ux,JSON.stringify(e))}catch{}}function sC(){let o=aC();const e=new Set;let i=0;function s(f){for(const h of e)h(o,f)}function u(){window.clearTimeout(i),i=window.setTimeout(()=>vS(o),160)}return{getState(){return o},set(f,h={}){const d=h.source??"ui",p=h.persist??(d==="ui"||d==="reset"),m=f.params?sm({...o.params,...f.params}):o.params;o={...o,...f,params:m,capture:o.capture,captureTime:o.captureTime},p&&!o.capture&&(d==="reset"?vS(o):u()),s({source:d,syncTime:!!h.syncTime})},reset(){const f=cx();f.capture=o.capture,f.captureTime=o.captureTime,f.time=o.capture?o.captureTime:0,f.contextLost=o.contextLost,f.shaderError=o.shaderError,f.playing=!o.capture,f.quality=ox(),f.hud=lx(),this.set(f,{source:"reset",persist:!0,syncTime:!0})},subscribe(f){return e.add(f),()=>e.delete(f)}}}function rC(o,e){const i=o.digits===0?String(Math.round(e)):Number(e).toFixed(o.digits);return o.unit?`${i} ${o.unit}`:i}function oC(){const o=kr.useRef(null),e=kr.useRef(null);e.current||(e.current=sC());const i=e.current,[s,u]=kr.useState(()=>i.getState());kr.useEffect(()=>i.subscribe(p=>u(p)),[i]),kr.useEffect(()=>{const p=new tC(o.current,i);return p.start(),()=>p.dispose()},[i]),kr.useEffect(()=>{const p=m=>{if(m.repeat)return;const S=m.target;if(S instanceof HTMLElement){const E=S.tagName;if(E==="TEXTAREA"||E==="SELECT"||E==="INPUT"&&S.getAttribute("type")!=="range")return}const _=i.getState();if(m.shiftKey&&/^Digit[1-4]$/.test(m.code)){m.preventDefault();const E=Number(m.code.slice(5))-1;i.set(zc(E),{source:"ui",persist:!0,camera:!0});return}if(!m.shiftKey&&/^Digit[0-9]$/.test(m.code)){m.preventDefault(),i.set({debug:Number(m.code.slice(5))},{source:"ui",persist:!0});return}const v=m.key.toLowerCase();if(m.code==="Space")m.preventDefault(),_.capture||i.set({playing:!_.playing},{source:"ui",persist:!0});else if(v==="h")m.preventDefault(),i.set({hud:!_.hud},{source:"ui",persist:!0});else if(v==="r")m.preventDefault(),i.reset();else if(v==="q"){m.preventDefault();const E=Mc.indexOf(_.quality),R=Mc[(E+1)%Mc.length];i.set({quality:R},{source:"ui",persist:!0})}};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[i]);const f=vs[s.quality]||vs.high,h=$d[s.debug]||$d[0];let d="";return ue.jsxs("div",{className:"app",children:[ue.jsx("canvas",{ref:o,"aria-label":"Schwarzschild black hole raytracer"}),s.hud&&ue.jsxs("aside",{className:"hud","aria-label":"控制面板",children:[ue.jsxs("div",{className:"hud-sticky",children:[ue.jsxs("header",{className:"brand",children:[ue.jsxs("div",{children:[ue.jsx("p",{className:"kicker",children:"Schwarzschild · rs = 2M"}),ue.jsx("h1",{children:"GARGANTUA"})]}),ue.jsx("button",{type:"button",className:"text-button",onClick:()=>i.set({hud:!1},{source:"ui",persist:!0}),children:"收起"})]}),ue.jsxs("div",{className:"status",children:[ue.jsxs("span",{children:["质量 ",f.label]}),ue.jsxs("span",{children:["步进 ",f.steps]}),ue.jsxs("span",{children:["交点 ",f.crossings]}),ue.jsx("span",{children:s.capture?"截图冻结":s.playing?"电影镜头":"手动控制"})]}),ue.jsxs("p",{className:"debug-line",children:["调试 ",h.id," · ",h.name]}),ue.jsx("p",{className:"debug-detail",children:h.detail}),ue.jsx("p",{className:"keys",children:"0–9 调试 · Shift+1–4 预设 · Space 镜头 · H 界面 · R 重置 · Q 质量"}),ue.jsx("div",{className:"preset-row",children:am.map(p=>ue.jsxs("button",{type:"button",className:s.preset===p.id?"preset active":"preset","data-preset":p.id,onClick:()=>i.set(zc(p.id),{source:"ui",persist:!0,camera:!0}),children:[ue.jsx("b",{children:p.id+1}),ue.jsx("span",{children:p.name}),ue.jsx("small",{children:p.en})]},p.id))}),ue.jsx("div",{className:"segmented",role:"radiogroup","aria-label":"质量档",children:Mc.map(p=>ue.jsx("button",{type:"button",role:"radio","aria-checked":s.quality===p,className:s.quality===p?"on":"",onClick:()=>i.set({quality:p},{source:"ui",persist:!0}),children:vs[p].label},p))}),ue.jsxs("div",{className:"actions",children:[ue.jsx("button",{type:"button",disabled:s.capture,onClick:()=>{s.capture||i.set({playing:!s.playing},{source:"ui",persist:!0})},children:s.capture?"截图冻结":s.playing?"暂停镜头":"播放镜头"}),ue.jsx("button",{type:"button",onClick:()=>i.reset(),children:"重置"})]})]}),ue.jsxs("div",{className:"hud-scroll",children:[kc.map(p=>{const m=p.group!==d;return d=p.group,ue.jsxs("label",{className:"field",children:[m&&ue.jsx("span",{className:"group",children:p.group}),ue.jsxs("span",{className:"field-label",children:[ue.jsx("span",{children:p.label}),ue.jsx("span",{children:rC(p,s.params[p.key])})]}),ue.jsx("input",{type:"range",min:p.min,max:p.max,step:p.step,value:s.params[p.key],"aria-label":p.label,onChange:S=>{const _={params:{[p.key]:Number(S.target.value)}};p.camera&&(_.playing=!1,_.preset=null),i.set(_,{source:"ui",persist:!0,camera:!!p.camera})}})]},p.key)}),ue.jsx("div",{className:"debug-grid",role:"group","aria-label":"调试视图",children:$d.map(p=>ue.jsx("button",{type:"button",className:s.debug===p.id?"on":"",title:p.detail,onClick:()=>i.set({debug:p.id},{source:"ui",persist:!0}),children:p.id},p.id))}),ue.jsxs("p",{className:"footnote",children:["t = ",s.time.toFixed(2)," s · 光子球 1.5 rs · ISCO 3 rs"]})]})]}),!s.hud&&!s.capture&&ue.jsx("button",{type:"button",className:"handle",onClick:()=>i.set({hud:!0},{source:"ui",persist:!0}),children:"控制"}),s.contextLost&&ue.jsxs("div",{className:"banner",role:"status",children:[ue.jsx("strong",{children:"WebGL 上下文已丢失"}),ue.jsx("p",{children:"渲染已暂停。上下文恢复后会重建着色器、缓冲和材质，并继续当前场景。"})]}),s.shaderError&&ue.jsxs("div",{className:"banner error",role:"alert",children:[ue.jsx("strong",{children:"着色器编译失败"}),ue.jsx("pre",{children:s.shaderError})]})]})}$M.createRoot(document.getElementById("root")).render(ue.jsx(oC,{}));
